"""Root test configuration + opt-in docs-media recording.

Auto-marks tests whose module imports ``playwright`` with the ``ui`` marker, and
disables Panelini background images session-wide (skips the ~530 KB base64 CSS).

Docs media: a test opts in with ``@pytest.mark.media(role, capture, ...)``. In a
normal run the marker is inert. Run with ``--record-media`` to record each marked
test as a Playwright video and convert it (in ``pytest_sessionfinish``, after the
video is flushed) to a small animated WebP / GIF, a screenshot, or an MP4, written
to ``docs/_static/media/<area>/<slug>/<role>.<ext>``.
"""

from __future__ import annotations

import contextlib
import subprocess
import tempfile
from pathlib import Path

import pytest

from panelini.testing import CURSOR_INIT_JS, assemble_animation, disable_panelini_backgrounds

disable_panelini_backgrounds()

REPO_ROOT = Path(__file__).resolve().parents[1]
DOCS_MEDIA = REPO_ROOT / "docs" / "_static" / "media"
TARGET_FPS = 12
TAIL_HOLD_MS = 1500  # hold the final state so recordings don't end abruptly


def pytest_collection_modifyitems(items):
    seen_modules = {}
    for item in items:
        mod = item.module
        if mod not in seen_modules:
            seen_modules[mod] = any(
                getattr(val, "__module__", "").startswith("playwright") for val in vars(mod).values()
            )
        if seen_modules[mod]:
            item.add_marker(pytest.mark.ui)


# --------------------------------------------------------------------------- #
# Docs-media recording
# --------------------------------------------------------------------------- #


def pytest_addoption(parser):
    group = parser.getgroup("panelini-media")
    group.addoption("--record-media", action="store_true", help="Record docs media from @pytest.mark.media tests.")
    group.addoption("--keep-video", action="store_true", help="Keep the raw Playwright .webm (gitignored).")
    group.addoption(
        "--media-format",
        choices=["webp", "gif"],
        default="webp",
        help="Animation output format (default: webp).",
    )


def pytest_configure(config):
    config.addinivalue_line(
        "markers",
        "media(role, capture='gif', name=None, viewport=None): record docs media. "
        "capture is 'gif'|'video'|'screenshot' with optional timing: '@S' from S to "
        "end, '@S:E' a range, '@:E' up to E; screenshot takes the frame nearest S.",
    )
    config._media_jobs = []
    if config.getoption("--record-media"):
        config._media_video_dir = Path(tempfile.mkdtemp(prefix="panelini_media_"))


def _marker_viewport(item):
    m = item.get_closest_marker("media")
    vp = m.kwargs.get("viewport") if m else None
    w, h = vp or (1280, 720)
    return {"width": int(w), "height": int(h)}


def _install_glide(page, default_steps: int = 24):
    """Record-mode only: make the mouse glide so recorded cursors read well.

    Patches ``mouse.move``/``mouse.click`` (default to multi-step moves) and
    ``Locator.click``/``hover`` (pre-glide to the element centre). Returns a
    callable that restores the class-level patches. Tests need no ``steps=``.
    """
    from playwright.sync_api import Locator

    mouse = page.mouse
    orig_move, orig_click = mouse.move, mouse.click

    def move(x, y, *, steps=None):
        orig_move(x, y, steps=steps or default_steps)

    def click(x, y, **kw):
        move(x, y)
        orig_click(x, y, **kw)

    mouse.move = move
    mouse.click = click

    loc_click, loc_hover = Locator.click, Locator.hover

    def _preglide(locator):
        try:
            box = locator.bounding_box()
        except Exception:
            box = None
        if box:
            move(box["x"] + box["width"] / 2, box["y"] + box["height"] / 2)

    def lclick(self, **kw):
        _preglide(self)
        return loc_click(self, **kw)

    def lhover(self, **kw):
        _preglide(self)
        return loc_hover(self, **kw)

    Locator.click = lclick
    Locator.hover = lhover

    def restore():
        Locator.click = loc_click
        Locator.hover = loc_hover

    return restore


@pytest.fixture
def browser_context_args(browser_context_args, request):
    args = dict(browser_context_args)
    if request.config.getoption("--record-media") and request.node.get_closest_marker("media"):
        vp = _marker_viewport(request.node)
        args["viewport"] = vp
        args["record_video_dir"] = str(request.config._media_video_dir)
        # Match the viewport so the video keeps full resolution (Playwright
        # otherwise scales the video down to fit 800x800).
        args["record_video_size"] = vp
    return args


@pytest.fixture(autouse=True)
def _media_record(request):
    record = request.config.getoption("--record-media")
    media_markers = list(request.node.iter_markers("media"))
    if not record or not media_markers:
        yield
        return
    captures = [(m.args[1] if len(m.args) > 1 else m.kwargs.get("capture", "gif")) for m in media_markers]
    animate = any(not c.startswith("screenshot") for c in captures)

    page = request.getfixturevalue("page")
    restore_glide = None
    if animate:
        # Cursor + glide only for animations; keep screenshots cursor-free.
        page.add_init_script(CURSOR_INIT_JS)
        restore_glide = _install_glide(page)
    try:
        yield
    finally:
        if restore_glide:
            restore_glide()
    if animate:
        with contextlib.suppress(Exception):
            page.wait_for_timeout(TAIL_HOLD_MS)  # hold the final frame
    video_path = None
    try:
        if page.video:
            video_path = page.video.path()
    except Exception:
        video_path = None
    if not video_path:
        return
    markers = [
        {
            "role": (m.args[0] if m.args else m.kwargs.get("role", "overview")),
            "capture": (m.args[1] if len(m.args) > 1 else m.kwargs.get("capture", "gif")),
            "name": m.kwargs.get("name"),
        }
        for m in request.node.iter_markers("media")
    ]
    request.config._media_jobs.append({"video": video_path, "path": str(request.node.path), "markers": markers})


def pytest_sessionfinish(session, exitstatus):
    jobs = getattr(session.config, "_media_jobs", [])
    if not jobs:
        return
    fmt = session.config.getoption("--media-format")
    keep_video = session.config.getoption("--keep-video")
    for job in jobs:
        _emit_job(job, fmt=fmt, keep_video=keep_video)


# --- media helpers --------------------------------------------------------- #


def _sec(raw: str) -> float | None:
    raw = raw.strip().rstrip("s")
    if not raw or raw == "end":
        return None
    return float(raw)


def _is_blank(frame, floor: float = 0.005) -> bool:
    """True if the frame carries almost no ink (a pre-load / partial-render page).

    Uses an absolute non-white pixel count, not a comparison to other frames, so
    it robustly drops leading blank and half-painted frames without guessing about
    content that legitimately grows later in a clip. A rendered dashboard has well
    over ``floor`` of the canvas inked; a blank or barely-painting load frame does
    not.
    """
    from PIL import Image, ImageChops

    grey = Image.fromarray(frame).convert("L")
    ink = ImageChops.invert(grey).point(lambda p: 255 if p > 24 else 0).histogram()[255]
    w, h = grey.size
    return ink < floor * w * h


def _parse_capture(spec: str) -> tuple[str, float | None, float | None]:
    """Parse ``kind[@timing]`` into ``(kind, start, end)`` seconds (None = open).

    Timing forms: ``@S:E`` a range, ``@S:`` from S to the end, ``@:E`` up to E,
    and a bare ``@S`` from S to the end. A single instant is only meaningful for a
    screenshot, which resolves to the frame nearest ``start`` regardless of ``end``;
    a bare ``@S`` never collapses an animation to one frame.
    """
    kind, _, timing = spec.partition("@")
    start = end = None
    if timing:
        a, _, b = timing.partition(":")
        start, end = _sec(a), _sec(b)
    return kind or "gif", start, end


def _media_target(test_path: str, role: str, name: str | None, kind: str, fmt: str) -> Path:
    parts = Path(test_path).resolve().parts
    rel = parts[parts.index("tests") + 1 :]
    area = rel[1] if rel and rel[0] == "panels" else (rel[0] if rel else "misc")
    module = Path(test_path).stem
    module_slug = module[5:] if module.startswith("test_") else module
    slug = name if (role == "feature" and name) else module_slug
    ext = {"screenshot": "png", "video": "mp4"}.get(kind, "gif" if fmt == "gif" else "webp")
    return DOCS_MEDIA / area / f"{slug}_{role}.{ext}"


def _transcode(video: str, out: Path, start: float | None, end: float | None) -> None:
    import imageio_ffmpeg

    out.parent.mkdir(parents=True, exist_ok=True)
    cmd = [imageio_ffmpeg.get_ffmpeg_exe(), "-y", "-i", video]
    if start is not None:
        cmd += ["-ss", str(start)]
    if end is not None:
        cmd += ["-to", str(end)]
    cmd += ["-an", "-c:v", "libx264", "-crf", "30", "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(out)]
    subprocess.run(cmd, check=True, capture_output=True)  # noqa: S603 - fixed argv, bundled ffmpeg


def _emit_job(job: dict, *, fmt: str, keep_video: bool) -> None:
    import os

    from PIL import Image

    video = job["video"]
    if not video or not os.path.exists(video):
        print(f"[media] no video for {job['path']}")
        return

    import imageio

    reader = imageio.get_reader(video)
    src_fps = reader.get_meta_data().get("fps") or 25
    # imageio's bundled stub declares Reader.__iter__ -> Array instead of
    # Iterator[Array], so it fails the Iterable protocol check even though
    # Reader is iterable at runtime (this is how imageio.get_reader() is
    # documented to be used).
    frames = [(i / src_fps, fr) for i, fr in enumerate(reader)]  # ty: ignore[invalid-argument-type]
    reader.close()

    for m in job["markers"]:
        kind, start, end = _parse_capture(m["capture"])
        target = _media_target(job["path"], m["role"], m["name"], kind, fmt)
        window = [(t, fr) for (t, fr) in frames if (start is None or t >= start) and (end is None or t <= end)]
        window = window or frames
        if kind == "screenshot":
            _, fr = min(window, key=lambda tf: abs(tf[0] - start)) if start is not None else window[-1]
            target.parent.mkdir(parents=True, exist_ok=True)
            Image.fromarray(fr).convert("RGB").save(target)
        elif kind == "video":
            _transcode(video, target, start, end)
        else:  # animation (gif/webp)
            seq = window
            while len(seq) > 1 and _is_blank(seq[0][1]):  # drop pre-load blank lead
                seq = seq[1:]
            step = max(1, round(src_fps / TARGET_FPS))
            imgs = [Image.fromarray(fr).convert("RGB") for _, fr in seq[::step]]
            assemble_animation(imgs, target, duration_ms=round(1000 / TARGET_FPS), fmt=fmt)
        size_kb = target.stat().st_size / 1024 if target.exists() else 0
        print(f"[media] {target.relative_to(REPO_ROOT)} ({size_kb:.0f} kB)")

    if keep_video:
        parts = Path(job["path"]).resolve().parts
        rel = parts[parts.index("tests") + 1 :]
        area = rel[1] if rel and rel[0] == "panels" else (rel[0] if rel else "misc")
        dest = DOCS_MEDIA / "_videos" / f"{area}_{Path(job['path']).stem}.webm"
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(Path(video).read_bytes())

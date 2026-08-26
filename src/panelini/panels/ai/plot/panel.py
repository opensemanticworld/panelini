"""PlotPanel: a Panel component that runs user code in an ``llm_sandbox``
container and renders the resulting PNG.

Port of ``migration/agent.py:PlotToolPanel`` minus OSW coupling. OSW-aware
tool methods live in ``tools/plot_tools.py``; they read state from the panel
(``current_python_code``, ``current_input_osw_id``, ``output_file_path``,
``image_panel``) to upload plots on demand.
"""

from __future__ import annotations

import base64
import contextlib
from collections.abc import Callable
from pathlib import Path

import pandas as pd  # type: ignore[import-untyped]
import panel as pn
from llm_sandbox import SandboxSession  # type: ignore[import-untyped]
from PIL import Image

from .utils.sandbox import copy_files_to_sandbox

_EMPTY_PLOT_HTML = (
    '<div style="display:flex;align-items:center;justify-content:center;'
    'height:100%;color:#888;font-style:italic;">No plot yet.</div>'
)

DEFAULT_LIBRARIES: list[str] = ["numpy", "pandas", "matplotlib", "scipy"]
DEFAULT_IMAGE: str = "python:3.12-slim"


class PlotPanel:
    """Sandbox-backed plotting panel driven by an AI chat agent."""

    def __init__(
        self,
        data_path: Path | str | None = None,
        download_dir: Path | str | None = None,
        docker_image: str = DEFAULT_IMAGE,
    ) -> None:
        self.data_path: Path = Path(data_path) if data_path is not None else Path.cwd() / "data"
        self.download_dir: Path = Path(download_dir) if download_dir is not None else self.data_path / "downloads"
        self.docker_image: str = docker_image

        self.df: pd.DataFrame | None = None  # type: ignore[no-any-unimported]
        self.current_python_code: str | None = None
        self.current_input_osw_id: str | None = None
        self.output_file_path: Path | None = None

        self._on_plot_callbacks: list[Callable[[], None]] = []

        self._build_panel()

    def on_plot(self, fn: Callable[[], None]) -> None:
        """Register a zero-arg callback fired after every ``plot_by_code`` call."""
        self._on_plot_callbacks.append(fn)

    def _fire_plot_callbacks(self) -> None:
        for cb in self._on_plot_callbacks:
            with contextlib.suppress(Exception):
                cb()

    def _build_panel(self) -> None:
        self.image_panel = pn.pane.HTML(
            _EMPTY_PLOT_HTML,
            sizing_mode="stretch_both",
            min_height=400,
        )
        self.plot_panel = pn.Row(self.image_panel, sizing_mode="stretch_both")

    @staticmethod
    def _render_png_as_html(png_path: Path) -> str:
        b64 = base64.b64encode(png_path.read_bytes()).decode("ascii")
        return (
            f'<img src="data:image/png;base64,{b64}" '
            'style="max-width:100%;max-height:100%;height:auto;width:auto;'
            'display:block;margin:auto;" />'
        )

    def plot_by_code(
        self,
        code: str,
        file_paths: list[str] | None = None,
        libraries: list[str] | None = None,
    ) -> str:
        """Run ``code`` in a sandbox, expect it to save ``/sandbox/output.png``.

        Returns a success or error message suitable for a tool response.
        """
        libs = list(libraries) if libraries is not None else list(DEFAULT_LIBRARIES)
        return_str: str | None = None
        result: str
        with SandboxSession(lang="python", image=self.docker_image, keep_template=True) as session:
            try:
                filenames: list[str] = []
                if file_paths:
                    filenames = copy_files_to_sandbox(
                        session,
                        file_paths,
                        download_dir=self.download_dir,
                        data_dir=self.data_path,
                    )
                return_str = session.run(code, libs).stdout

                code_path = self.data_path / "plot_codes" / "code.py"
                code_path.parent.mkdir(parents=True, exist_ok=True)
                code_path.write_text(code, encoding="utf-8")

                self.output_file_path = self.data_path / "outputs" / "output.png"
                self.output_file_path.parent.mkdir(parents=True, exist_ok=True)
                session.copy_from_runtime(src="/sandbox/output.png", dest=str(self.output_file_path))
                Image.open(self.output_file_path)

                self.image_panel.object = self._render_png_as_html(self.output_file_path)
                self.plot_panel.clear()
                self.plot_panel.append(self.image_panel)

            except Exception as e:
                if return_str is not None:
                    result = f"Exception during plotting: {e}\nReturned from sandbox: {return_str}"
                else:
                    result = f"Exception during plotting: {e}"
            else:
                self.current_input_osw_id = f"File:{filenames[0]}" if filenames else None
                self.current_python_code = code
                result = f"Image successfully plotted, returned from sandbox: {return_str}"
        self._fire_plot_callbacks()
        return result

    def run_code(
        self,
        code: str,
        lang: str = "python",
        file_paths: list[str] | None = None,
        libraries: list[str] | None = None,
    ) -> str:
        """Run ``code`` in a sandbox and return whatever it prints to stdout."""
        libs = list(libraries) if libraries is not None else list(DEFAULT_LIBRARIES)
        with SandboxSession(lang=lang, image=self.docker_image, keep_template=True) as session:
            try:
                if file_paths:
                    copy_files_to_sandbox(
                        session,
                        file_paths,
                        download_dir=self.download_dir,
                        data_dir=self.data_path,
                    )
                result = session.run(code, libs).stdout

                code_path = self.data_path / "run_codes" / "code.py"
                code_path.parent.mkdir(parents=True, exist_ok=True)
                code_path.write_text(code, encoding="utf-8")

                return str(result)
            except Exception as e:
                return str(e)

    def load_data_from_csv(
        self,
        file_path: str,
        delimiter: str = "\t",
        skip_rows: int = 0,
    ) -> list[str]:
        """Load ``file_path`` into ``self.df`` and return its columns."""
        self.df = pd.read_csv(file_path, delimiter=delimiter, skiprows=skip_rows)
        return list(self.df.columns)

    def __panel__(self) -> pn.Row:
        return self.plot_panel

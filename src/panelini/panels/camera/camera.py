"""Messenger-style camera capture panel."""

from pathlib import Path
from typing import ClassVar

import panel as pn
import param
from panel.custom import AnyWidgetComponent

pn.extension()


class Camera(AnyWidgetComponent):
    """Messenger-style camera capture widget using the getUserMedia API.

    Features:
    - Front / rear camera selection (facing mode or explicit device)
    - Resolution presets (640x480, 1280x720, 1920x1080)
    - Mirror toggle (CSS flip for preview; captured image follows the preview)
    - JPEG / PNG output format with quality control
    - Countdown timer (0, 3, 5, 10 seconds)
    - Zoom slider (if the browser / device supports it)
    - Torch / flash toggle (if the browser / device supports it)
    """

    _esm: ClassVar[str] = """
async function render({ model, el }) {
  // ── State ──────────────────────────────────────────────────────────────────
  let stream = null;
  let countdownTimer = null;

  // ── DOM ────────────────────────────────────────────────────────────────────
  el.innerHTML = `
    <style>
      .cam-wrap * { box-sizing: border-box; }
      .cam-wrap { font-family: system-ui, sans-serif; max-width: 660px; color: #222; }
      .cam-preview-box {
        position: relative; background: #111; border-radius: 10px;
        overflow: hidden; aspect-ratio: 16/9;
      }
      .cam-video { width: 100%; height: 100%; object-fit: cover; display: block; }
      .cam-video.mirrored { transform: scaleX(-1); }
      .cam-countdown-overlay {
        position: absolute; inset: 0; display: flex;
        align-items: center; justify-content: center; pointer-events: none;
      }
      .cam-countdown-num {
        font-size: 5rem; font-weight: 900; color: #fff;
        text-shadow: 0 2px 16px rgba(0,0,0,0.7); opacity: 0;
        transition: opacity .15s;
      }
      .cam-countdown-num.visible { opacity: 1; }
      .cam-controls {
        display: flex; flex-wrap: wrap; gap: 8px;
        padding: 10px 0; align-items: center;
      }
      .cam-select {
        padding: 5px 8px; border-radius: 6px; border: 1px solid #bbb;
        background: #fff; font-size: .85rem; cursor: pointer; max-width: 180px;
      }
      .cam-btn {
        padding: 6px 14px; border-radius: 6px; border: none;
        font-size: .9rem; font-weight: 600; cursor: pointer;
        transition: opacity .15s;
      }
      .cam-btn:disabled { opacity: .45; cursor: not-allowed; }
      .cam-btn-primary  { background: #0d6efd; color: #fff; }
      .cam-btn-secondary{ background: #6c757d; color: #fff; }
      .cam-label { font-size: .82rem; color: #555; display: flex; align-items: center; gap: 4px; }
      .cam-slider-row { display: flex; align-items: center; gap: 6px; font-size: .82rem; color: #555; }
      .cam-slider { width: 80px; }
      .cam-preview-img {
        width: 100%; border-radius: 10px; margin-top: 8px;
        display: none; border: 2px solid #ddd;
      }
      .cam-error { color: #dc3545; padding: 6px 0; font-size: .85rem; }
      .cam-hidden { display: none !important; }
    </style>

    <div class="cam-wrap">
      <div class="cam-preview-box">
        <video class="cam-video" autoplay playsinline muted></video>
        <div class="cam-countdown-overlay">
          <span class="cam-countdown-num"></span>
        </div>
      </div>

      <div class="cam-controls">
        <!-- Device -->
        <select class="cam-select" id="cam-device" title="Camera device"></select>

        <!-- Resolution -->
        <select class="cam-select" id="cam-resolution" title="Resolution">
          <option value="640x480">640 x 480</option>
          <option value="1280x720" selected>1280 x 720 (HD)</option>
          <option value="1920x1080">1920 x 1080 (FHD)</option>
        </select>

        <!-- Format -->
        <select class="cam-select" id="cam-format" title="Image format">
          <option value="jpeg">JPEG</option>
          <option value="png">PNG</option>
        </select>

        <!-- Countdown -->
        <select class="cam-select" id="cam-countdown" title="Countdown timer">
          <option value="0">No timer</option>
          <option value="3">3 s</option>
          <option value="5">5 s</option>
          <option value="10">10 s</option>
        </select>

        <!-- Mirror -->
        <label class="cam-label" title="Mirror preview and captured image">
          <input type="checkbox" id="cam-mirror"> Mirror
        </label>

        <!-- Zoom -->
        <div class="cam-slider-row cam-hidden" id="cam-zoom-row">
          Zoom
          <input type="range" class="cam-slider" id="cam-zoom" min="1" max="5" step="0.1" value="1">
          <span id="cam-zoom-val">1x</span>
        </div>

        <!-- Torch -->
        <label class="cam-label cam-hidden" id="cam-torch-label" title="Torch / flash">
          <input type="checkbox" id="cam-torch"> Torch
        </label>

        <!-- Buttons -->
        <button class="cam-btn cam-btn-primary"   id="cam-snap-btn">📷 Snapshot</button>
        <button class="cam-btn cam-btn-secondary" id="cam-switch-btn">🔄 Flip</button>
      </div>

      <!-- Quality (JPEG only) -->
      <div class="cam-slider-row" id="cam-quality-row" style="padding-bottom:6px">
        Quality
        <input type="range" class="cam-slider" id="cam-quality"
               min="0.1" max="1" step="0.01" value="0.92">
        <span id="cam-quality-val">0.92</span>
      </div>

      <img  class="cam-preview-img" id="cam-preview" alt="Snapshot preview" />
      <div class="cam-error cam-hidden" id="cam-error"></div>
    </div>
  `;

  // ── Element refs ───────────────────────────────────────────────────────────
  const video       = el.querySelector('.cam-video');
  const devSel      = el.querySelector('#cam-device');
  const resSel      = el.querySelector('#cam-resolution');
  const fmtSel      = el.querySelector('#cam-format');
  const cdSel       = el.querySelector('#cam-countdown');
  const mirrorChk   = el.querySelector('#cam-mirror');
  const zoomRow     = el.querySelector('#cam-zoom-row');
  const zoomSlider  = el.querySelector('#cam-zoom');
  const zoomVal     = el.querySelector('#cam-zoom-val');
  const torchLabel  = el.querySelector('#cam-torch-label');
  const torchChk    = el.querySelector('#cam-torch');
  const snapBtn     = el.querySelector('#cam-snap-btn');
  const switchBtn   = el.querySelector('#cam-switch-btn');
  const qualRow     = el.querySelector('#cam-quality-row');
  const qualSlider  = el.querySelector('#cam-quality');
  const qualVal     = el.querySelector('#cam-quality-val');
  const previewImg  = el.querySelector('#cam-preview');
  const cdNum       = el.querySelector('.cam-countdown-num');
  const errDiv      = el.querySelector('#cam-error');

  const RESOLUTIONS = {
    '640x480':   { width: 640,  height: 480  },
    '1280x720':  { width: 1280, height: 720  },
    '1920x1080': { width: 1920, height: 1080 },
  };

  // ── Helpers ────────────────────────────────────────────────────────────────
  function showError(msg)  { errDiv.textContent = msg; errDiv.classList.remove('cam-hidden'); }
  function clearError()    { errDiv.classList.add('cam-hidden'); }
  function setHidden(el, h){ el.classList.toggle('cam-hidden', h); }

  function applyMirror(on) {
    video.classList.toggle('mirrored', on);
  }

  // ── Device enumeration ─────────────────────────────────────────────────────
  async function enumerateDevices() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevs = devices.filter(d => d.kind === 'videoinput');
    const prev = devSel.value;
    devSel.innerHTML = '';
    videoDevs.forEach((d, i) => {
      const opt = document.createElement('option');
      opt.value = d.deviceId;
      opt.text  = d.label || `Camera ${i + 1}`;
      devSel.appendChild(opt);
    });
    if (prev) devSel.value = prev;
  }

  // ── Stream ─────────────────────────────────────────────────────────────────
  async function startStream(deviceId) {
    if (stream) { stream.getTracks().forEach(t => t.stop()); stream = null; }

    const res = RESOLUTIONS[resSel.value] || RESOLUTIONS['1280x720'];
    const facingMode = model.get('facing_mode');

    const videoConstraints = {
      width:  { ideal: res.width  },
      height: { ideal: res.height },
    };
    if (deviceId) {
      videoConstraints.deviceId = { exact: deviceId };
    } else {
      videoConstraints.facingMode = { ideal: facingMode };
    }

    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: false });
      video.srcObject = stream;
      clearError();

      // Enumerate after permission granted (labels now visible)
      await enumerateDevices();
      const track = stream.getVideoTracks()[0];
      const settings = track.getSettings();
      if (settings.deviceId) devSel.value = settings.deviceId;

      // Zoom support
      const caps = track.getCapabilities ? track.getCapabilities() : {};
      if (caps.zoom) {
        zoomSlider.min   = caps.zoom.min;
        zoomSlider.max   = caps.zoom.max;
        zoomSlider.step  = caps.zoom.step || 0.1;
        zoomSlider.value = settings.zoom || caps.zoom.min;
        zoomVal.textContent = parseFloat(zoomSlider.value).toFixed(1) + 'x';
        setHidden(zoomRow, false);
      } else {
        setHidden(zoomRow, true);
      }

      // Torch support
      if (caps.torch) {
        setHidden(torchLabel, false);
        torchChk.checked = false;
      } else {
        setHidden(torchLabel, true);
      }

    } catch (e) {
      showError('Camera error: ' + e.message);
    }
  }

  // ── Snapshot ───────────────────────────────────────────────────────────────
  function captureImage() {
    const canvas = document.createElement('canvas');
    canvas.width  = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');

    if (mirrorChk.checked) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0);

    const fmt     = fmtSel.value;
    const quality = parseFloat(qualSlider.value);
    const dataUrl = canvas.toDataURL(
      fmt === 'jpeg' ? 'image/jpeg' : 'image/png',
      fmt === 'jpeg' ? quality : undefined,
    );

    model.set('value', dataUrl);
    model.save_changes();
    previewImg.src = dataUrl;
    previewImg.style.display = 'block';
  }

  function doSnapshot() {
    const cd = parseInt(cdSel.value, 10);
    if (cd <= 0) { captureImage(); return; }

    snapBtn.disabled = true;
    let remaining = cd;
    cdNum.textContent = remaining;
    cdNum.classList.add('visible');

    countdownTimer = setInterval(() => {
      remaining--;
      if (remaining <= 0) {
        clearInterval(countdownTimer);
        countdownTimer = null;
        cdNum.classList.remove('visible');
        snapBtn.disabled = false;
        captureImage();
      } else {
        cdNum.textContent = remaining;
      }
    }, 1000);
  }

  // ── Event wiring ───────────────────────────────────────────────────────────
  snapBtn.addEventListener('click', doSnapshot);

  switchBtn.addEventListener('click', () => {
    const cur = model.get('facing_mode');
    const next = cur === 'user' ? 'environment' : 'user';
    model.set('facing_mode', next);
    model.save_changes();
    startStream(null);
  });

  devSel.addEventListener('change', () => startStream(devSel.value));

  resSel.addEventListener('change', () => {
    model.set('resolution', resSel.value);
    model.save_changes();
    startStream(devSel.value || null);
  });

  fmtSel.addEventListener('change', () => {
    const isJpeg = fmtSel.value === 'jpeg';
    setHidden(qualRow, !isJpeg);
    model.set('image_format', fmtSel.value);
    model.save_changes();
  });

  cdSel.addEventListener('change', () => {
    model.set('countdown', parseInt(cdSel.value, 10));
    model.save_changes();
  });

  mirrorChk.addEventListener('change', () => {
    applyMirror(mirrorChk.checked);
    model.set('mirror', mirrorChk.checked);
    model.save_changes();
  });

  qualSlider.addEventListener('input', () => {
    qualVal.textContent = parseFloat(qualSlider.value).toFixed(2);
    model.set('quality', parseFloat(qualSlider.value));
    model.save_changes();
  });

  zoomSlider.addEventListener('input', () => {
    const z = parseFloat(zoomSlider.value);
    zoomVal.textContent = z.toFixed(1) + 'x';
    if (stream) {
      const track = stream.getVideoTracks()[0];
      track.applyConstraints({ advanced: [{ zoom: z }] }).catch(() => {});
    }
  });

  torchChk.addEventListener('change', () => {
    if (stream) {
      const track = stream.getVideoTracks()[0];
      track.applyConstraints({ advanced: [{ torch: torchChk.checked }] }).catch(() => {});
    }
  });

  // ── Model → UI sync ────────────────────────────────────────────────────────
  model.on('change:mirror',       () => { mirrorChk.checked = model.get('mirror'); applyMirror(model.get('mirror')); });
  model.on('change:resolution',   () => { resSel.value = model.get('resolution'); });
  model.on('change:image_format', () => { fmtSel.value = model.get('image_format'); setHidden(qualRow, fmtSel.value !== 'jpeg'); });
  model.on('change:quality',      () => { qualSlider.value = model.get('quality'); qualVal.textContent = parseFloat(qualSlider.value).toFixed(2); });
  model.on('change:countdown',    () => { cdSel.value = String(model.get('countdown')); });
  model.on('change:facing_mode',  () => startStream(null));

  // ── Init ───────────────────────────────────────────────────────────────────
  resSel.value    = model.get('resolution');
  fmtSel.value    = model.get('image_format');
  cdSel.value     = String(model.get('countdown'));
  qualSlider.value= model.get('quality');
  qualVal.textContent = parseFloat(model.get('quality')).toFixed(2);
  mirrorChk.checked = model.get('mirror');
  applyMirror(model.get('mirror'));
  setHidden(qualRow, model.get('image_format') !== 'jpeg');

  await startStream(null);

  // ── Cleanup ────────────────────────────────────────────────────────────────
  return () => {
    if (stream)         stream.getTracks().forEach(t => t.stop());
    if (countdownTimer) clearInterval(countdownTimer);
  };
}

export default { render };
"""

    # ── Python params ──────────────────────────────────────────────────────────

    value = param.String(
        default="",
        doc="Last captured image as a base64 data URL (e.g. 'data:image/jpeg;base64,...').",
    )

    facing_mode = param.ObjectSelector(
        default="environment",
        objects=["user", "environment"],
        doc="Preferred camera: 'user' = front, 'environment' = rear.",
    )

    resolution = param.ObjectSelector(
        default="1280x720",
        objects=["640x480", "1280x720", "1920x1080"],
        doc="Target capture resolution (width x height).",
    )

    mirror = param.Boolean(
        default=True,
        doc="Mirror the preview and captured image horizontally.",
    )

    image_format = param.ObjectSelector(
        default="jpeg",
        objects=["jpeg", "png"],
        doc="Output image format.",
    )

    quality = param.Number(
        default=0.92,
        bounds=(0.1, 1.0),
        doc="JPEG compression quality (0.1 - 1.0). Ignored for PNG.",
    )

    countdown = param.Integer(
        default=0,
        bounds=(0, 10),
        doc="Countdown in seconds before the snapshot is taken (0 = immediate).",
    )


if __name__ == "__main__":
    _CERT_DIR = Path(__file__).parents[4] / "data" / "certs"

    cameras = []

    def app():
        camera = Camera()
        cameras.append(camera)
        return pn.Column(camera)

    pn.serve(
        app,
        threaded=True,
        allow_websocket_origin=["*"],
        port=8888,
        ssl_certfile=str(
            _CERT_DIR / "cert.pem"
        ),  ## certificate / https necessary for IOS camera access through browser
        ssl_keyfile=str(_CERT_DIR / "key.pem"),
    )

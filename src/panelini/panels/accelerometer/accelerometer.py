"""Accelerometer panel - reads motion and orientation data from mobile devices."""

from pathlib import Path
from typing import ClassVar

import panel as pn
import param
from panel.custom import AnyWidgetComponent

pn.extension()


class Accelerometer(AnyWidgetComponent):
    """Mobile accelerometer and orientation widget using the DeviceMotion /
    DeviceOrientation browser APIs.

    Features:
    - iOS 13+ permission handling (must be triggered by user gesture)
    - Live bar display for all axes
    - Acceleration (with and without gravity), rotation rate, orientation
    - Configurable push rate to Python (default 5 Hz, to avoid flooding WebSocket)
    - Start / Stop streaming
    """

    _esm: ClassVar[str] = """
function render({ model, el }) {
  // ── State ──────────────────────────────────────────────────────────────────
  let motionHandler      = null;
  let orientationHandler = null;
  let pushTimer          = null;
  let latest             = {};   // most recent reading, pushed at update_interval rate

  // ── DOM ────────────────────────────────────────────────────────────────────
  el.innerHTML = `
    <style>
      .ac-wrap * { box-sizing: border-box; }
      .ac-wrap {
        font-family: system-ui, sans-serif; max-width: 480px; color: #222;
        border: 1px solid #ddd; border-radius: 10px; padding: 14px;
      }
      .ac-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
      .ac-title  { font-weight: 700; font-size: 1rem; flex: 1; }
      .ac-dot    { width: 10px; height: 10px; border-radius: 50%; background: #ccc; flex-shrink: 0; }
      .ac-dot.active { background: #28a745; box-shadow: 0 0 6px #28a745; }

      .ac-btn {
        padding: 5px 14px; border-radius: 6px; border: none;
        font-size: .85rem; font-weight: 600; cursor: pointer;
      }
      .ac-btn-primary   { background: #0d6efd; color: #fff; }
      .ac-btn-warning   { background: #fd7e14; color: #fff; }
      .ac-btn-secondary { background: #6c757d; color: #fff; }
      .ac-btn:disabled  { opacity: .45; cursor: not-allowed; }

      .ac-permission {
        background: #fff3cd; border: 1px solid #ffc107; border-radius: 8px;
        padding: 10px 12px; margin-bottom: 12px; font-size: .85rem;
      }
      .ac-permission p { margin: 0 0 8px; }

      .ac-section { margin-bottom: 14px; }
      .ac-section-title {
        font-size: .78rem; font-weight: 700; text-transform: uppercase;
        letter-spacing: .04em; color: #888; margin-bottom: 6px;
      }

      .ac-row { display: flex; align-items: center; gap: 8px; margin-bottom: 5px; }
      .ac-axis-label {
        width: 24px; font-size: .82rem; font-weight: 700; color: #555; flex-shrink: 0;
      }
      .ac-bar-track {
        flex: 1; height: 10px; background: #eee; border-radius: 5px;
        position: relative; overflow: hidden;
      }
      /* Bipolar bar: origin in center */
      .ac-bar-fill {
        position: absolute; top: 0; height: 100%;
        border-radius: 5px; transition: left .08s, width .08s;
      }
      .ac-val {
        width: 72px; text-align: right; font-size: .82rem;
        font-variant-numeric: tabular-nums; flex-shrink: 0; color: #333;
      }

      .ac-controls {
        display: flex; align-items: center; gap: 8px;
        padding-top: 10px; border-top: 1px solid #eee; flex-wrap: wrap;
      }
      .ac-interval-label { font-size: .82rem; color: #555; }
      .ac-interval-select {
        padding: 4px 6px; border-radius: 5px; border: 1px solid #bbb;
        font-size: .82rem; cursor: pointer;
      }
      .ac-status { font-size: .78rem; color: #888; margin-top: 4px; width: 100%; }
    </style>

    <div class="ac-wrap">
      <div class="ac-header">
        <span class="ac-dot" id="ac-dot"></span>
        <span class="ac-title">Accelerometer</span>
        <button class="ac-btn ac-btn-primary" id="ac-toggle-btn">Start</button>
      </div>

      <!-- iOS permission banner (hidden by default) -->
      <div class="ac-permission" id="ac-permission-box" style="display:none">
        <p>This browser requires explicit permission to access motion sensors.</p>
        <button class="ac-btn ac-btn-warning" id="ac-perm-btn">Grant Permission</button>
      </div>

      <!-- Acceleration (no gravity) -->
      <div class="ac-section" id="ac-sec-accel">
        <div class="ac-section-title">Acceleration (m/s²) — gravity removed</div>
        <div class="ac-row">
          <span class="ac-axis-label" style="color:#e74c3c">X</span>
          <div class="ac-bar-track"><div class="ac-bar-fill" id="bar-ax" style="background:#e74c3c"></div></div>
          <span class="ac-val" id="val-ax">—</span>
        </div>
        <div class="ac-row">
          <span class="ac-axis-label" style="color:#2ecc71">Y</span>
          <div class="ac-bar-track"><div class="ac-bar-fill" id="bar-ay" style="background:#2ecc71"></div></div>
          <span class="ac-val" id="val-ay">—</span>
        </div>
        <div class="ac-row">
          <span class="ac-axis-label" style="color:#3498db">Z</span>
          <div class="ac-bar-track"><div class="ac-bar-fill" id="bar-az" style="background:#3498db"></div></div>
          <span class="ac-val" id="val-az">—</span>
        </div>
      </div>

      <!-- Acceleration including gravity -->
      <div class="ac-section" id="ac-sec-grav">
        <div class="ac-section-title">Acceleration incl. gravity (m/s²)</div>
        <div class="ac-row">
          <span class="ac-axis-label" style="color:#e74c3c">X</span>
          <div class="ac-bar-track"><div class="ac-bar-fill" id="bar-gx" style="background:#e74c3c88"></div></div>
          <span class="ac-val" id="val-gx">—</span>
        </div>
        <div class="ac-row">
          <span class="ac-axis-label" style="color:#2ecc71">Y</span>
          <div class="ac-bar-track"><div class="ac-bar-fill" id="bar-gy" style="background:#2ecc7188"></div></div>
          <span class="ac-val" id="val-gy">—</span>
        </div>
        <div class="ac-row">
          <span class="ac-axis-label" style="color:#3498db">Z</span>
          <div class="ac-bar-track"><div class="ac-bar-fill" id="bar-gz" style="background:#3498db88"></div></div>
          <span class="ac-val" id="val-gz">—</span>
        </div>
      </div>

      <!-- Rotation rate -->
      <div class="ac-section" id="ac-sec-rot">
        <div class="ac-section-title">Rotation rate (°/s)</div>
        <div class="ac-row">
          <span class="ac-axis-label" style="color:#9b59b6">&#945;</span>
          <div class="ac-bar-track"><div class="ac-bar-fill" id="bar-ra" style="background:#9b59b6"></div></div>
          <span class="ac-val" id="val-ra">—</span>
        </div>
        <div class="ac-row">
          <span class="ac-axis-label" style="color:#e67e22">β</span>
          <div class="ac-bar-track"><div class="ac-bar-fill" id="bar-rb" style="background:#e67e22"></div></div>
          <span class="ac-val" id="val-rb">—</span>
        </div>
        <div class="ac-row">
          <span class="ac-axis-label" style="color:#1abc9c">&#947;</span>
          <div class="ac-bar-track"><div class="ac-bar-fill" id="bar-rg" style="background:#1abc9c"></div></div>
          <span class="ac-val" id="val-rg">—</span>
        </div>
      </div>

      <!-- Orientation -->
      <div class="ac-section" id="ac-sec-ori">
        <div class="ac-section-title">Orientation (°) — compass / tilt</div>
        <div class="ac-row">
          <span class="ac-axis-label" style="color:#9b59b6">&#945;</span>
          <div class="ac-bar-track"><div class="ac-bar-fill" id="bar-oa" style="background:#9b59b6"></div></div>
          <span class="ac-val" id="val-oa">—</span>
        </div>
        <div class="ac-row">
          <span class="ac-axis-label" style="color:#e67e22">β</span>
          <div class="ac-bar-track"><div class="ac-bar-fill" id="bar-ob" style="background:#e67e22"></div></div>
          <span class="ac-val" id="val-ob">—</span>
        </div>
        <div class="ac-row">
          <span class="ac-axis-label" style="color:#1abc9c">&#947;</span>
          <div class="ac-bar-track"><div class="ac-bar-fill" id="bar-og" style="background:#1abc9c"></div></div>
          <span class="ac-val" id="val-og">—</span>
        </div>
      </div>

      <div class="ac-controls">
        <span class="ac-interval-label">Push to Python every</span>
        <select class="ac-interval-select" id="ac-interval">
          <option value="100">100 ms (10 Hz)</option>
          <option value="200" selected>200 ms (5 Hz)</option>
          <option value="500">500 ms (2 Hz)</option>
          <option value="1000">1 s (1 Hz)</option>
          <option value="0">Never</option>
        </select>
        <span class="ac-status" id="ac-status">Stopped.</span>
      </div>
    </div>
  `;

  // ── Element refs ───────────────────────────────────────────────────────────
  const dot         = el.querySelector('#ac-dot');
  const toggleBtn   = el.querySelector('#ac-toggle-btn');
  const permBox     = el.querySelector('#ac-permission-box');
  const permBtn     = el.querySelector('#ac-perm-btn');
  const intervalSel = el.querySelector('#ac-interval');
  const statusEl    = el.querySelector('#ac-status');

  // ── Bar helpers ────────────────────────────────────────────────────────────
  // Bipolar bar: value in [-range, +range] → left% and width% from center
  function setBipolarBar(barId, value, range) {
    const bar = el.querySelector('#' + barId);
    if (!bar) return;
    const clamped  = Math.max(-range, Math.min(range, value));
    const pct      = clamped / range;        // -1 … +1
    if (pct >= 0) {
      bar.style.left  = '50%';
      bar.style.width = (pct * 50) + '%';
    } else {
      bar.style.left  = (50 + pct * 50) + '%';
      bar.style.width = (-pct * 50) + '%';
    }
  }

  // Unipolar bar: value in [0, range]
  function setUnipolarBar(barId, value, range) {
    const bar = el.querySelector('#' + barId);
    if (!bar) return;
    const pct = Math.max(0, Math.min(range, value)) / range * 100;
    bar.style.left  = '0%';
    bar.style.width = pct + '%';
  }

  function setVal(id, v, decimals = 2) {
    const el2 = el.querySelector('#' + id);
    if (el2) el2.textContent = v === null || v === undefined ? '—' : v.toFixed(decimals);
  }

  // ── Update display ─────────────────────────────────────────────────────────
  function updateDisplay(reading) {
    const { acceleration: a, accelerationIncludingGravity: g,
            rotationRate: r, orientation: o } = reading;

    // Acceleration (±20 m/s² range)
    if (a) {
      setBipolarBar('bar-ax', a.x, 20); setVal('val-ax', a.x);
      setBipolarBar('bar-ay', a.y, 20); setVal('val-ay', a.y);
      setBipolarBar('bar-az', a.z, 20); setVal('val-az', a.z);
    }
    // Gravity (±20 m/s²)
    if (g) {
      setBipolarBar('bar-gx', g.x, 20); setVal('val-gx', g.x);
      setBipolarBar('bar-gy', g.y, 20); setVal('val-gy', g.y);
      setBipolarBar('bar-gz', g.z, 20); setVal('val-gz', g.z);
    }
    // Rotation rate (±360 °/s)
    if (r) {
      setBipolarBar('bar-ra', r.alpha, 360); setVal('val-ra', r.alpha, 1);
      setBipolarBar('bar-rb', r.beta,  360); setVal('val-rb', r.beta,  1);
      setBipolarBar('bar-rg', r.gamma, 360); setVal('val-rg', r.gamma, 1);
    }
    // Orientation: alpha 0-360 (unipolar), beta ±180, gamma ±90
    if (o) {
      setUnipolarBar('bar-oa', o.alpha, 360); setVal('val-oa', o.alpha, 1);
      setBipolarBar ('bar-ob', o.beta,  180); setVal('val-ob', o.beta,  1);
      setBipolarBar ('bar-og', o.gamma,  90); setVal('val-og', o.gamma, 1);
    }
  }

  // ── Event handlers ─────────────────────────────────────────────────────────
  function onMotion(e) {
    const a  = e.acceleration;
    const g  = e.accelerationIncludingGravity;
    const r  = e.rotationRate;

    latest = {
      ...latest,
      acceleration: a ? { x: a.x, y: a.y, z: a.z } : null,
      accelerationIncludingGravity: g ? { x: g.x, y: g.y, z: g.z } : null,
      rotationRate: r ? { alpha: r.alpha, beta: r.beta, gamma: r.gamma } : null,
      interval: e.interval,
      timestamp: Date.now(),
    };
    updateDisplay(latest);
  }

  function onOrientation(e) {
    latest = {
      ...latest,
      orientation: { alpha: e.alpha, beta: e.beta, gamma: e.gamma },
      timestamp: Date.now(),
    };
    updateDisplay(latest);
  }

  // ── Start / Stop ───────────────────────────────────────────────────────────
  function startListening() {
    motionHandler      = onMotion;
    orientationHandler = onOrientation;
    window.addEventListener('devicemotion',      motionHandler);
    window.addEventListener('deviceorientation', orientationHandler);

    dot.classList.add('active');
    toggleBtn.textContent = 'Stop';
    toggleBtn.classList.replace('ac-btn-primary', 'ac-btn-secondary');
    statusEl.textContent = 'Streaming…';
    model.set('active', true);
    model.save_changes();

    const ms = parseInt(intervalSel.value, 10);
    if (ms > 0) {
      pushTimer = setInterval(() => {
        if (Object.keys(latest).length) {
          model.set('value', latest);
          model.save_changes();
        }
      }, ms);
    }
  }

  function stopListening() {
    if (motionHandler)      window.removeEventListener('devicemotion',      motionHandler);
    if (orientationHandler) window.removeEventListener('deviceorientation', orientationHandler);
    motionHandler = orientationHandler = null;
    if (pushTimer) { clearInterval(pushTimer); pushTimer = null; }

    dot.classList.remove('active');
    toggleBtn.textContent = 'Start';
    toggleBtn.classList.replace('ac-btn-secondary', 'ac-btn-primary');
    statusEl.textContent = 'Stopped.';
    model.set('active', false);
    model.save_changes();
  }

  // ── iOS permission ─────────────────────────────────────────────────────────
  async function requestPermission() {
    try {
      const motRes = await DeviceMotionEvent.requestPermission();
      const oriRes = await DeviceOrientationEvent.requestPermission();
      if (motRes === 'granted' && oriRes === 'granted') {
        permBox.style.display = 'none';
        startListening();
      } else {
        statusEl.textContent = 'Permission denied.';
      }
    } catch (e) {
      statusEl.textContent = 'Permission error: ' + e.message;
    }
  }

  function needsPermission() {
    return typeof DeviceMotionEvent !== 'undefined' &&
           typeof DeviceMotionEvent.requestPermission === 'function';
  }

  // ── Toggle button ──────────────────────────────────────────────────────────
  toggleBtn.addEventListener('click', () => {
    if (model.get('active')) {
      stopListening();
    } else {
      if (needsPermission()) {
        permBox.style.display = 'block';
      } else {
        startListening();
      }
    }
  });

  permBtn.addEventListener('click', requestPermission);

  intervalSel.addEventListener('change', () => {
    const ms = parseInt(intervalSel.value, 10);
    model.set('update_interval', ms);
    model.save_changes();
    if (pushTimer) { clearInterval(pushTimer); pushTimer = null; }
    if (model.get('active') && ms > 0) {
      pushTimer = setInterval(() => {
        if (Object.keys(latest).length) {
          model.set('value', latest);
          model.save_changes();
        }
      }, ms);
    }
  });

  // ── Model → UI sync ────────────────────────────────────────────────────────
  model.on('change:active', () => {
    const a = model.get('active');
    if (a && !motionHandler)       startListening();
    else if (!a && motionHandler)  stopListening();
  });

  model.on('change:update_interval', () => {
    intervalSel.value = String(model.get('update_interval'));
  });

  // ── Init ───────────────────────────────────────────────────────────────────
  intervalSel.value = String(model.get('update_interval'));

  // Warn if no sensor API available (desktop)
  if (typeof DeviceMotionEvent === 'undefined') {
    statusEl.textContent = 'DeviceMotionEvent not available on this device/browser.';
    toggleBtn.disabled = true;
  }

  // ── Cleanup ────────────────────────────────────────────────────────────────
  return () => {
    stopListening();
  };
}

export default { render };
"""

    # ── Python params ──────────────────────────────────────────────────────────

    value = param.Dict(
        default={},
        doc="""Latest sensor reading pushed from the browser. Contains:
        - acceleration: {x, y, z} in m/s² (gravity removed)
        - accelerationIncludingGravity: {x, y, z} in m/s²
        - rotationRate: {alpha, beta, gamma} in °/s
        - orientation: {alpha, beta, gamma} in °
        - interval: native sampling interval in ms
        - timestamp: epoch ms when the reading was captured
        """,
    )

    active = param.Boolean(
        default=False,
        doc="Whether the sensor is currently streaming. Set to True to start, False to stop.",
    )

    update_interval = param.Integer(
        default=200,
        bounds=(0, 5000),
        doc="How often (ms) to push a reading to Python. 0 = never (UI only).",
    )


if __name__ == "__main__":
    _CERT_DIR = Path(__file__).parents[4] / "data" / "certs"

    accels = []

    def app():
        accel = Accelerometer()
        accels.append(accel)

        def on_value(event):
            v = event.new
            if v:
                a = v.get("acceleration") or {}
                print(f"acc  x={a.get('x', 0):+.2f}  y={a.get('y', 0):+.2f}  z={a.get('z', 0):+.2f} m/s²")

        accel.param.watch(on_value, "value")
        return pn.Column(accel)

    pn.serve(
        app,
        threaded=True,
        allow_websocket_origin=["*"],
        port=8889,
        ssl_certfile=str(_CERT_DIR / "cert.pem"),
        ssl_keyfile=str(_CERT_DIR / "key.pem"),
    )

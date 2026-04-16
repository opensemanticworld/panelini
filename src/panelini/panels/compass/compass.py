"""Compass panel - true-north heading from device orientation sensors."""

from pathlib import Path
from typing import ClassVar

import panel as pn
import param
from panel.custom import AnyWidgetComponent

pn.extension()


class Compass(AnyWidgetComponent):
    """Compass widget using DeviceOrientationEvent.

    On iOS Safari: uses webkitCompassHeading (true north, compensated).
    On Android / others: uses the alpha channel (relative, not true north).

    Features:
    - Animated SVG needle compass rose
    - Digital heading display
    - Cardinal direction label
    - True-north vs relative mode indicator
    - iOS permission handling
    - Configurable push rate to Python
    """

    _esm: ClassVar[str] = """
function render({ model, el }) {
  // ── State ──────────────────────────────────────────────────────────────────
  let handler   = null;
  let pushTimer = null;
  let heading   = 0;
  let trueNorth = false;

  const CARDINALS = ['N','NNE','NE','ENE','E','ESE','SE','SSE',
                     'S','SSW','SW','WSW','W','WNW','NW','NNW'];
  function toCardinal(deg) {
    return CARDINALS[Math.round(deg / 22.5) % 16];
  }

  // ── DOM ────────────────────────────────────────────────────────────────────
  el.innerHTML = `
    <style>
      .cp-wrap * { box-sizing: border-box; }
      .cp-wrap {
        font-family: system-ui, sans-serif; max-width: 320px; color: #222;
        border: 1px solid #ddd; border-radius: 10px; padding: 14px;
        text-align: center;
      }
      .cp-header { display:flex; align-items:center; gap:10px; margin-bottom:14px; }
      .cp-title  { font-weight:700; font-size:1rem; flex:1; text-align:left; }
      .cp-dot { width:10px; height:10px; border-radius:50%; background:#ccc; flex-shrink:0; }
      .cp-dot.active { background:#28a745; box-shadow:0 0 6px #28a745; }

      .cp-btn {
        padding:5px 14px; border-radius:6px; border:none;
        font-size:.85rem; font-weight:600; cursor:pointer;
      }
      .cp-btn-primary   { background:#0d6efd; color:#fff; }
      .cp-btn-warning   { background:#fd7e14; color:#fff; }
      .cp-btn-secondary { background:#6c757d; color:#fff; }
      .cp-btn:disabled  { opacity:.45; cursor:not-allowed; }

      .cp-permission {
        background:#fff3cd; border:1px solid #ffc107; border-radius:8px;
        padding:10px 12px; margin-bottom:12px; font-size:.85rem; text-align:left;
      }
      .cp-permission p { margin:0 0 8px; }

      .cp-rose-wrap { position:relative; width:260px; height:260px; margin:0 auto 12px; }
      .cp-svg { width:100%; height:100%; }

      .cp-digital {
        font-size:2.4rem; font-weight:900; letter-spacing:-.02em;
        font-variant-numeric:tabular-nums; line-height:1;
      }
      .cp-cardinal {
        font-size:1.1rem; font-weight:700; color:#888; margin-bottom:10px;
      }
      .cp-badge {
        display:inline-block; font-size:.72rem; font-weight:700;
        padding:2px 8px; border-radius:4px; margin-bottom:12px;
        background:#e8f4fd; color:#0d6efd; border:1px solid #bee3f8;
      }
      .cp-badge.relative { background:#fff3cd; color:#856404; border-color:#ffc107; }

      .cp-controls {
        display:flex; align-items:center; justify-content:center; gap:8px;
        padding-top:10px; border-top:1px solid #eee; flex-wrap:wrap;
      }
      .cp-label  { font-size:.82rem; color:#555; }
      .cp-select {
        padding:4px 6px; border-radius:5px; border:1px solid #bbb;
        font-size:.82rem; cursor:pointer;
      }
      .cp-status { font-size:.78rem; color:#888; margin-top:4px; width:100%; }
    </style>

    <div class="cp-wrap">
      <div class="cp-header">
        <span class="cp-dot" id="cp-dot"></span>
        <span class="cp-title">Compass</span>
        <button class="cp-btn cp-btn-primary" id="cp-toggle">Start</button>
      </div>

      <div class="cp-permission" id="cp-perm-box" style="display:none">
        <p>iOS requires permission to access orientation sensors.</p>
        <button class="cp-btn cp-btn-warning" id="cp-perm-btn">Grant Permission</button>
      </div>

      <!-- SVG compass rose -->
      <div class="cp-rose-wrap">
        <svg class="cp-svg" viewBox="0 0 260 260" id="cp-svg">
          <!-- Static outer ring -->
          <circle cx="130" cy="130" r="124" fill="#f8f9fa" stroke="#ddd" stroke-width="1.5"/>
          <!-- Rotating rose: ticks + cardinal labels + needle all move together -->
          <g id="cp-rose" transform="rotate(0,130,130)">
            <g id="cp-ticks"></g>
            <!-- Cardinal labels -->
            <text x="130" y="22"  text-anchor="middle" font-size="14" font-weight="700" fill="#e74c3c">N</text>
            <text x="238" y="135" text-anchor="middle" font-size="13" font-weight="600" fill="#555">E</text>
            <text x="130" y="248" text-anchor="middle" font-size="13" font-weight="600" fill="#555">S</text>
            <text x="22"  y="135" text-anchor="middle" font-size="13" font-weight="600" fill="#555">W</text>
            <!-- Needle -->
            <polygon points="130,20 124,130 136,130" fill="#e74c3c"/>
            <polygon points="130,240 124,130 136,130" fill="#bbb"/>
          </g>
          <!-- Static center cap -->
          <circle cx="130" cy="130" r="7" fill="#333"/>
          <circle cx="130" cy="130" r="3" fill="#fff"/>
        </svg>
      </div>

      <div class="cp-digital" id="cp-digital">—°</div>
      <div class="cp-cardinal" id="cp-cardinal">—</div>
      <div class="cp-badge" id="cp-badge">True North</div>

      <div class="cp-controls">
        <span class="cp-label">Push every</span>
        <select class="cp-select" id="cp-interval">
          <option value="100">100 ms</option>
          <option value="200" selected>200 ms</option>
          <option value="500">500 ms</option>
          <option value="1000">1 s</option>
          <option value="0">Never</option>
        </select>
        <span class="cp-status" id="cp-status">Stopped.</span>
      </div>
    </div>
  `;

  // ── Build tick marks ───────────────────────────────────────────────────────
  const ticksGroup = el.querySelector('#cp-ticks');
  for (let deg = 0; deg < 360; deg += 5) {
    const isMajor = deg % 10 === 0;
    const r1 = 124, r2 = isMajor ? 110 : 117;
    const rad = (deg - 90) * Math.PI / 180;
    const x1 = 130 + r1 * Math.cos(rad), y1 = 130 + r1 * Math.sin(rad);
    const x2 = 130 + r2 * Math.cos(rad), y2 = 130 + r2 * Math.sin(rad);
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1); line.setAttribute('y1', y1);
    line.setAttribute('x2', x2); line.setAttribute('y2', y2);
    line.setAttribute('stroke', isMajor ? '#999' : '#ccc');
    line.setAttribute('stroke-width', isMajor ? '1.5' : '1');
    ticksGroup.appendChild(line);
  }

  // ── Refs ───────────────────────────────────────────────────────────────────
  const dot       = el.querySelector('#cp-dot');
  const toggleBtn = el.querySelector('#cp-toggle');
  const permBox   = el.querySelector('#cp-perm-box');
  const permBtn   = el.querySelector('#cp-perm-btn');
  const rose      = el.querySelector('#cp-rose');
  const digitalEl = el.querySelector('#cp-digital');
  const cardinalEl= el.querySelector('#cp-cardinal');
  const badgeEl   = el.querySelector('#cp-badge');
  const intervalSel=el.querySelector('#cp-interval');
  const statusEl  = el.querySelector('#cp-status');

  // ── Smooth needle rotation ─────────────────────────────────────────────────
  let displayAngle = 0;
  let targetAngle  = 0;

  function shortestArc(from, to) {
    let d = ((to - from) % 360 + 360) % 360;
    if (d > 180) d -= 360;
    return d;
  }

  function animateNeedle() {
    const diff = shortestArc(displayAngle, targetAngle);
    displayAngle += diff * 0.15;
    // Negate: needle must rotate opposite to heading so it keeps pointing at north.
    // Example: heading=90° (phone faces East) → needle rotates -90° (toward West on
    // the phone screen, which is where north now is).
    rose.setAttribute('transform', `rotate(${-displayAngle},130,130)`);
    requestAnimationFrame(animateNeedle);
  }
  animateNeedle();

  // ── Orientation handler ────────────────────────────────────────────────────
  // Guard flag: once we receive an absolute event we ignore non-absolute ones
  // so the handler is not called twice per sensor tick on Android.
  let gotAbsolute = false;

  function onOrientation(e) {
    // Skip non-absolute events once we know the device supports absolute
    if (gotAbsolute && !e.isTrusted) return;

    let h;
    if (typeof e.webkitCompassHeading === 'number') {
      h = e.webkitCompassHeading;           // iOS — true north
      trueNorth = true;
      gotAbsolute = true;
    } else if (e.absolute && e.alpha !== null) {
      h = (360 - e.alpha) % 360;            // Android absolute
      trueNorth = true;
      gotAbsolute = true;
    } else if (!gotAbsolute && e.alpha !== null) {
      h = (360 - e.alpha) % 360;            // Relative fallback only
      trueNorth = false;
    } else {
      return;
    }

    heading      = h;
    targetAngle  = h;
    digitalEl.textContent = h.toFixed(1) + '°';
    cardinalEl.textContent = toCardinal(h);
    badgeEl.textContent = trueNorth ? 'True North' : 'Relative (no calibration)';
    badgeEl.className = 'cp-badge' + (trueNorth ? '' : ' relative');
  }

  // ── Start / Stop ───────────────────────────────────────────────────────────
  function startListening() {
    handler = onOrientation;
    window.addEventListener('deviceorientationabsolute', handler, true);
    window.addEventListener('deviceorientation',         handler, true);

    dot.classList.add('active');
    toggleBtn.textContent = 'Stop';
    toggleBtn.classList.replace('cp-btn-primary', 'cp-btn-secondary');
    statusEl.textContent = 'Tracking…';
    model.set('active', true);
    model.save_changes();

    const ms = parseInt(intervalSel.value, 10);
    if (ms > 0) {
      pushTimer = setInterval(() => {
        model.set('heading', heading);
        model.save_changes();
      }, ms);
    }
  }

  function stopListening() {
    if (handler) {
      window.removeEventListener('deviceorientationabsolute', handler, true);
      window.removeEventListener('deviceorientation',         handler, true);
      handler = null;
    }
    if (pushTimer) { clearInterval(pushTimer); pushTimer = null; }
    dot.classList.remove('active');
    toggleBtn.textContent = 'Start';
    toggleBtn.classList.replace('cp-btn-secondary', 'cp-btn-primary');
    statusEl.textContent = 'Stopped.';
    model.set('active', false);
    model.save_changes();
  }

  // ── iOS permission ─────────────────────────────────────────────────────────
  function needsPermission() {
    return typeof DeviceOrientationEvent !== 'undefined' &&
           typeof DeviceOrientationEvent.requestPermission === 'function';
  }

  async function requestPermission() {
    try {
      const res = await DeviceOrientationEvent.requestPermission();
      if (res === 'granted') { permBox.style.display = 'none'; startListening(); }
      else { statusEl.textContent = 'Permission denied.'; }
    } catch (e) {
      statusEl.textContent = 'Permission error: ' + e.message;
    }
  }

  // ── Events ─────────────────────────────────────────────────────────────────
  toggleBtn.addEventListener('click', () => {
    if (model.get('active')) {
      stopListening();
    } else {
      if (needsPermission()) { permBox.style.display = 'block'; }
      else { startListening(); }
    }
  });

  permBtn.addEventListener('click', requestPermission);

  intervalSel.addEventListener('change', () => {
    const ms = parseInt(intervalSel.value, 10);
    model.set('update_interval', ms);
    model.save_changes();
    if (pushTimer) { clearInterval(pushTimer); pushTimer = null; }
    if (model.get('active') && ms > 0) {
      pushTimer = setInterval(() => { model.set('heading', heading); model.save_changes(); }, ms);
    }
  });

  model.on('change:active', () => {
    const a = model.get('active');
    if (a && !handler) needsPermission() ? (permBox.style.display = 'block') : startListening();
    else if (!a && handler) stopListening();
  });

  intervalSel.value = String(model.get('update_interval'));

  if (typeof DeviceOrientationEvent === 'undefined') {
    statusEl.textContent = 'DeviceOrientationEvent not available.';
    toggleBtn.disabled = true;
  }

  return () => stopListening();
}

export default { render };
"""

    heading = param.Number(
        default=0.0,
        bounds=(0, 360),
        doc="Latest compass heading in degrees (0 = North, 90 = East). True north on iOS, may be relative on Android.",
    )
    active = param.Boolean(default=False, doc="Whether the compass is tracking.")
    update_interval = param.Integer(
        default=200,
        bounds=(0, 5000),
        doc="How often (ms) to push heading to Python. 0 = never.",
    )


if __name__ == "__main__":
    _CERT_DIR = Path(__file__).parents[4] / "data" / "certs"

    def app():
        compass = Compass()
        compass.param.watch(lambda e: print(f"Heading: {e.new:.1f}°"), "heading")
        return pn.Column(compass)

    pn.serve(
        app,
        threaded=True,
        allow_websocket_origin=["*"],
        port=8892,
        ssl_certfile=str(_CERT_DIR / "cert.pem"),
        ssl_keyfile=str(_CERT_DIR / "key.pem"),
    )

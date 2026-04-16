"""GPS / Geolocation panel - continuous position tracking from mobile devices."""

from pathlib import Path
from typing import ClassVar

import panel as pn
import param
from panel.custom import AnyWidgetComponent

pn.extension()


class GPS(AnyWidgetComponent):
    """Continuous GPS tracking widget using the Geolocation API.

    Features:
    - Continuous watchPosition updates
    - Latitude, longitude, altitude, speed, heading, accuracy
    - High-accuracy mode toggle (uses GPS chip vs network)
    - Configurable push rate to Python
    - Visual accuracy indicator
    """

    _esm: ClassVar[str] = """
function render({ model, el }) {
  // ── State ──────────────────────────────────────────────────────────────────
  let watchId   = null;
  let pushTimer = null;
  let latest    = {};

  // ── DOM ────────────────────────────────────────────────────────────────────
  el.innerHTML = `
    <style>
      .gps-wrap * { box-sizing: border-box; }
      .gps-wrap {
        font-family: system-ui, sans-serif; max-width: 420px; color: #222;
        border: 1px solid #ddd; border-radius: 10px; padding: 14px;
      }
      .gps-header { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
      .gps-title  { font-weight: 700; font-size: 1rem; flex: 1; }
      .gps-dot { width: 10px; height: 10px; border-radius: 50%; background: #ccc; flex-shrink:0; }
      .gps-dot.active { background: #28a745; box-shadow: 0 0 6px #28a745; }

      .gps-btn {
        padding: 5px 14px; border-radius: 6px; border: none;
        font-size: .85rem; font-weight: 600; cursor: pointer;
      }
      .gps-btn-primary   { background: #0d6efd; color: #fff; }
      .gps-btn-secondary { background: #6c757d; color: #fff; }
      .gps-btn:disabled  { opacity: .45; cursor: not-allowed; }

      .gps-grid {
        display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
        margin-bottom: 12px;
      }
      .gps-card {
        background: #f8f9fa; border-radius: 8px; padding: 10px 12px;
      }
      .gps-card-label {
        font-size: .72rem; font-weight: 700; text-transform: uppercase;
        letter-spacing: .04em; color: #888; margin-bottom: 4px;
      }
      .gps-card-value {
        font-size: 1.15rem; font-weight: 700; color: #222;
        font-variant-numeric: tabular-nums;
      }
      .gps-card-unit { font-size: .75rem; color: #888; font-weight: 400; }

      .gps-accuracy-row {
        display: flex; align-items: center; gap: 8px;
        margin-bottom: 12px; font-size: .82rem; color: #555;
      }
      .gps-accuracy-bar-track {
        flex: 1; height: 8px; background: #eee; border-radius: 4px; overflow: hidden;
      }
      .gps-accuracy-bar {
        height: 100%; border-radius: 4px; transition: width .3s, background .3s;
      }

      .gps-controls {
        display: flex; align-items: center; gap: 8px;
        padding-top: 10px; border-top: 1px solid #eee; flex-wrap: wrap;
      }
      .gps-label  { font-size: .82rem; color: #555; display:flex; align-items:center; gap:4px; }
      .gps-select {
        padding: 4px 6px; border-radius: 5px; border: 1px solid #bbb;
        font-size: .82rem; cursor: pointer;
      }
      .gps-status { font-size: .78rem; color: #888; margin-top: 4px; width: 100%; }
      .gps-error  { color: #dc3545; font-size: .82rem; margin-top: 4px; }
    </style>

    <div class="gps-wrap">
      <div class="gps-header">
        <span class="gps-dot" id="gps-dot"></span>
        <span class="gps-title">GPS / Location</span>
        <button class="gps-btn gps-btn-primary" id="gps-toggle">Start</button>
      </div>

      <div class="gps-grid">
        <div class="gps-card">
          <div class="gps-card-label">Latitude</div>
          <div class="gps-card-value" id="gps-lat">—</div>
        </div>
        <div class="gps-card">
          <div class="gps-card-label">Longitude</div>
          <div class="gps-card-value" id="gps-lon">—</div>
        </div>
        <div class="gps-card">
          <div class="gps-card-label">Altitude</div>
          <div class="gps-card-value" id="gps-alt">— <span class="gps-card-unit">m</span></div>
        </div>
        <div class="gps-card">
          <div class="gps-card-label">Speed</div>
          <div class="gps-card-value" id="gps-spd">— <span class="gps-card-unit">km/h</span></div>
        </div>
        <div class="gps-card">
          <div class="gps-card-label">Heading</div>
          <div class="gps-card-value" id="gps-hdg">— <span class="gps-card-unit">°</span></div>
        </div>
        <div class="gps-card">
          <div class="gps-card-label">Alt. Accuracy</div>
          <div class="gps-card-value" id="gps-altacc">— <span class="gps-card-unit">m</span></div>
        </div>
      </div>

      <!-- Accuracy bar -->
      <div class="gps-accuracy-row">
        <span style="width:64px;flex-shrink:0">Accuracy</span>
        <div class="gps-accuracy-bar-track">
          <div class="gps-accuracy-bar" id="gps-acc-bar" style="width:0%;background:#28a745"></div>
        </div>
        <span id="gps-acc-val" style="width:60px;text-align:right">— m</span>
      </div>

      <div class="gps-controls">
        <label class="gps-label">
          <input type="checkbox" id="gps-high-acc" checked> High accuracy
        </label>
        <span class="gps-label">Push every</span>
        <select class="gps-select" id="gps-interval">
          <option value="500">500 ms</option>
          <option value="1000" selected>1 s</option>
          <option value="2000">2 s</option>
          <option value="5000">5 s</option>
          <option value="0">Never</option>
        </select>
        <span class="gps-status" id="gps-status">Stopped.</span>
        <span class="gps-error gps-hidden" id="gps-error"></span>
      </div>
    </div>
  `;

  // ── Refs ───────────────────────────────────────────────────────────────────
  const dot        = el.querySelector('#gps-dot');
  const toggleBtn  = el.querySelector('#gps-toggle');
  const highAccChk = el.querySelector('#gps-high-acc');
  const intervalSel= el.querySelector('#gps-interval');
  const statusEl   = el.querySelector('#gps-status');
  const errorEl    = el.querySelector('#gps-error');
  const accBar     = el.querySelector('#gps-acc-bar');
  const accVal     = el.querySelector('#gps-acc-val');

  function setCard(id, value, decimals = 5) {
    const el2 = el.querySelector('#' + id);
    if (!el2) return;
    if (value === null || value === undefined) { el2.innerHTML = '—'; return; }
    el2.innerHTML = value.toFixed(decimals);
  }

  function fmt(v, dec) { return v === null || v === undefined ? '—' : v.toFixed(dec); }

  // ── Accuracy bar ───────────────────────────────────────────────────────────
  // 0 m = perfect (green), 100 m+ = poor (red)
  function updateAccBar(acc) {
    if (acc === null) { accBar.style.width = '0%'; accVal.textContent = '— m'; return; }
    const pct  = Math.min(acc / 100, 1) * 100;
    const hue  = 120 - (pct / 100) * 120;  // green → red
    accBar.style.width      = pct + '%';
    accBar.style.background = `hsl(${hue},100%,42%)`;
    accVal.textContent      = acc.toFixed(1) + ' m';
  }

  // ── Position callback ──────────────────────────────────────────────────────
  function onPosition(pos) {
    const c = pos.coords;
    latest = {
      latitude:         c.latitude,
      longitude:        c.longitude,
      altitude:         c.altitude,
      speed:            c.speed !== null ? c.speed * 3.6 : null,   // m/s → km/h
      speed_ms:         c.speed,
      heading:          c.heading,
      accuracy:         c.accuracy,
      altitude_accuracy:c.altitudeAccuracy,
      timestamp:        pos.timestamp,
    };

    setCard('gps-lat', c.latitude, 6);
    setCard('gps-lon', c.longitude, 6);

    const altEl = el.querySelector('#gps-alt');
    altEl.innerHTML = fmt(c.altitude, 1) + ' <span class="gps-card-unit">m</span>';

    const spdEl = el.querySelector('#gps-spd');
    spdEl.innerHTML = fmt(latest.speed, 1) + ' <span class="gps-card-unit">km/h</span>';

    const hdgEl = el.querySelector('#gps-hdg');
    hdgEl.innerHTML = fmt(c.heading, 1) + ' <span class="gps-card-unit">°</span>';

    const altAccEl = el.querySelector('#gps-altacc');
    altAccEl.innerHTML = fmt(c.altitudeAccuracy, 1) + ' <span class="gps-card-unit">m</span>';

    updateAccBar(c.accuracy);
    statusEl.textContent = 'Tracking…';
    errorEl.style.display = 'none';
  }

  function onError(err) {
    errorEl.textContent = 'Error: ' + err.message;
    errorEl.style.display = 'block';
    statusEl.textContent = 'Error.';
  }

  // ── Start / Stop ───────────────────────────────────────────────────────────
  function startTracking() {
    if (!navigator.geolocation) {
      errorEl.textContent = 'Geolocation not available.';
      errorEl.style.display = 'block';
      return;
    }
    watchId = navigator.geolocation.watchPosition(onPosition, onError, {
      enableHighAccuracy: highAccChk.checked,
      maximumAge: 0,
      timeout: 10000,
    });
    dot.classList.add('active');
    toggleBtn.textContent = 'Stop';
    toggleBtn.classList.replace('gps-btn-primary', 'gps-btn-secondary');
    model.set('active', true);
    model.save_changes();

    const ms = parseInt(intervalSel.value, 10);
    if (ms > 0) {
      pushTimer = setInterval(() => {
        if (Object.keys(latest).length) { model.set('value', latest); model.save_changes(); }
      }, ms);
    }
  }

  function stopTracking() {
    if (watchId !== null) { navigator.geolocation.clearWatch(watchId); watchId = null; }
    if (pushTimer)        { clearInterval(pushTimer); pushTimer = null; }
    dot.classList.remove('active');
    toggleBtn.textContent = 'Start';
    toggleBtn.classList.replace('gps-btn-secondary', 'gps-btn-primary');
    statusEl.textContent = 'Stopped.';
    model.set('active', false);
    model.save_changes();
  }

  // ── Events ─────────────────────────────────────────────────────────────────
  toggleBtn.addEventListener('click', () => {
    model.get('active') ? stopTracking() : startTracking();
  });

  intervalSel.addEventListener('change', () => {
    const ms = parseInt(intervalSel.value, 10);
    model.set('update_interval', ms);
    model.save_changes();
    if (pushTimer) { clearInterval(pushTimer); pushTimer = null; }
    if (model.get('active') && ms > 0) {
      pushTimer = setInterval(() => {
        if (Object.keys(latest).length) { model.set('value', latest); model.save_changes(); }
      }, ms);
    }
  });

  highAccChk.addEventListener('change', () => {
    model.set('high_accuracy', highAccChk.checked);
    model.save_changes();
    if (model.get('active')) { stopTracking(); startTracking(); }
  });

  model.on('change:active', () => {
    const a = model.get('active');
    if (a && watchId === null) startTracking();
    else if (!a && watchId !== null) stopTracking();
  });

  // ── Init ───────────────────────────────────────────────────────────────────
  intervalSel.value = String(model.get('update_interval'));
  highAccChk.checked = model.get('high_accuracy');

  if (!navigator.geolocation) {
    statusEl.textContent = 'Geolocation API not available.';
    toggleBtn.disabled = true;
  }

  return () => stopTracking();
}

export default { render };
"""

    value = param.Dict(
        default={},
        doc="""Latest GPS fix. Keys: latitude, longitude, altitude (m),
        speed (km/h), speed_ms (m/s), heading (°), accuracy (m),
        altitude_accuracy (m), timestamp (epoch ms).""",
    )
    active = param.Boolean(default=False, doc="Whether position tracking is running.")
    high_accuracy = param.Boolean(
        default=True,
        doc="Use GPS chip (True) vs. network/WiFi positioning (False).",
    )
    update_interval = param.Integer(
        default=1000,
        bounds=(0, 10000),
        doc="How often (ms) to push a fix to Python. 0 = never.",
    )


if __name__ == "__main__":
    import folium

    _CERT_DIR = Path(__file__).parents[4] / "data" / "certs"

    def app():
        gps = GPS()
        map_pane = pn.pane.HTML("<p>Waiting for GPS fix…</p>", sizing_mode="stretch_width", height=400)

        def on_value(event):
            fix = event.new
            if not fix:
                return
            lat = fix.get("latitude")
            lon = fix.get("longitude")
            if lat is None or lon is None:
                return
            print(fix)
            m = folium.Map(location=[lat, lon], zoom_start=16)
            folium.Marker([lat, lon], tooltip=f"{lat:.6f}, {lon:.6f}").add_to(m)
            map_pane.object = m._repr_html_()

        gps.param.watch(on_value, "value")
        return pn.Column(gps, map_pane)

    pn.serve(
        app,
        threaded=True,
        allow_websocket_origin=["*"],
        port=8890,
        ssl_certfile=str(_CERT_DIR / "cert.pem"),
        ssl_keyfile=str(_CERT_DIR / "key.pem"),
    )

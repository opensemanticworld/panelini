"""Audio spectrum analyzer panel - live FFT, dB meter, and audio recording."""

from pathlib import Path
from typing import ClassVar

import panel as pn
import param
from panel.custom import AnyWidgetComponent

pn.extension()


class AudioSpectrum(AnyWidgetComponent):
    """Live microphone spectrum analyzer with recording, using the Web Audio API.

    Features:
    - Real-time FFT frequency bars (canvas)
    - dB level meter with peak hold
    - Peak frequency detection
    - FFT size selector (resolution vs. speed trade-off)
    - Audio recording via MediaRecorder (auto-selects best supported format)
    - Download recorded audio in browser
    - Send recorded audio to Python as base64 data URL
    - Configurable push rate to Python
    """

    _esm: ClassVar[str] = """
function render({ model, el }) {
  // ── State ──────────────────────────────────────────────────────────────────
  let audioCtx      = null;
  let analyser      = null;
  let source        = null;
  let stream        = null;
  let animFrame     = null;
  let pushTimer     = null;
  let peakHold      = -Infinity;
  let peakDecay     = 0;
  let latest        = {};

  // Recording state
  let mediaRecorder   = null;
  let recordedChunks  = [];
  let recInterval     = null;   // duration counter
  let recSeconds      = 0;
  let recMimeType     = '';

  // ── DOM ────────────────────────────────────────────────────────────────────
  el.innerHTML = `
    <style>
      .as-wrap * { box-sizing: border-box; }
      .as-wrap {
        font-family: system-ui, sans-serif; max-width: 480px; color: #222;
        border: 1px solid #ddd; border-radius: 10px; padding: 14px;
      }
      .as-header { display:flex; align-items:center; gap:10px; margin-bottom:12px; }
      .as-title  { font-weight:700; font-size:1rem; flex:1; }
      .as-dot { width:10px; height:10px; border-radius:50%; background:#ccc; flex-shrink:0; }
      .as-dot.active { background:#28a745; box-shadow:0 0 6px #28a745; }

      .as-btn {
        padding:5px 14px; border-radius:6px; border:none;
        font-size:.85rem; font-weight:600; cursor:pointer;
      }
      .as-btn-primary   { background:#0d6efd; color:#fff; }
      .as-btn-secondary { background:#6c757d; color:#fff; }
      .as-btn-danger    { background:#dc3545; color:#fff; }
      .as-btn-success   { background:#28a745; color:#fff; }
      .as-btn:disabled  { opacity:.45; cursor:not-allowed; }

      /* dB meter */
      .as-db-row { display:flex; align-items:center; gap:10px; margin-bottom:10px; }
      .as-db-num {
        font-size:2rem; font-weight:900; width:80px; text-align:right;
        font-variant-numeric:tabular-nums; flex-shrink:0;
      }
      .as-db-track {
        flex:1; height:18px; background:#eee; border-radius:5px;
        position:relative; overflow:hidden;
      }
      .as-db-fill {
        position:absolute; left:0; top:0; height:100%;
        border-radius:5px; transition:width .05s;
      }
      .as-db-peak {
        position:absolute; top:0; width:2px; height:100%;
        background:#333; transition:left .1s;
      }
      .as-db-unit { font-size:.75rem; color:#888; align-self:flex-end; padding-bottom:4px; }

      /* Spectrum canvas */
      .as-canvas {
        width:100%; height:140px; border-radius:8px;
        background:#111; display:block; margin-bottom:10px;
      }

      /* Info row */
      .as-info-row { display:flex; gap:16px; margin-bottom:10px; flex-wrap:wrap; }
      .as-info-item { font-size:.82rem; color:#555; }
      .as-info-val  { font-weight:700; color:#222; }

      /* Recording row */
      .as-rec-row {
        display:flex; align-items:center; gap:8px; flex-wrap:wrap;
        padding:8px 10px; border-radius:8px; background:#f8f9fa;
        border:1px solid #eee; margin-bottom:10px;
      }
      .as-rec-dot {
        width:10px; height:10px; border-radius:50%; background:#ccc; flex-shrink:0;
      }
      .as-rec-dot.recording {
        background:#dc3545;
        animation: as-blink 1s step-start infinite;
      }
      @keyframes as-blink { 50% { opacity:0; } }
      .as-rec-timer {
        font-size:.85rem; font-weight:700; font-variant-numeric:tabular-nums;
        color:#dc3545; width:48px;
      }
      .as-rec-format { font-size:.75rem; color:#aaa; flex:1; }

      /* Controls */
      .as-controls {
        display:flex; align-items:center; gap:8px;
        padding-top:10px; border-top:1px solid #eee; flex-wrap:wrap;
      }
      .as-label  { font-size:.82rem; color:#555; }
      .as-select {
        padding:4px 6px; border-radius:5px; border:1px solid #bbb;
        font-size:.82rem; cursor:pointer;
      }
      .as-status { font-size:.78rem; color:#888; margin-top:4px; width:100%; }
      .as-error  { color:#dc3545; font-size:.82rem; margin-top:4px; }
    </style>

    <div class="as-wrap">
      <div class="as-header">
        <span class="as-dot" id="as-dot"></span>
        <span class="as-title">Audio Spectrum</span>
        <button class="as-btn as-btn-primary" id="as-toggle">Start</button>
      </div>

      <!-- dB meter -->
      <div class="as-db-row">
        <span class="as-db-num" id="as-db-num">—</span>
        <div class="as-db-track">
          <div class="as-db-fill" id="as-db-fill" style="width:0%;background:#28a745"></div>
          <div class="as-db-peak" id="as-db-peak" style="left:0%"></div>
        </div>
        <span class="as-db-unit">dB</span>
      </div>

      <!-- Spectrum canvas -->
      <canvas class="as-canvas" id="as-canvas"></canvas>

      <!-- Info -->
      <div class="as-info-row">
        <div class="as-info-item">Peak freq: <span class="as-info-val" id="as-peak-freq">—</span></div>
        <div class="as-info-item">Sample rate: <span class="as-info-val" id="as-samplerate">—</span></div>
        <div class="as-info-item">FFT bins: <span class="as-info-val" id="as-bins">—</span></div>
      </div>

      <!-- Recording row -->
      <div class="as-rec-row">
        <span class="as-rec-dot" id="as-rec-dot"></span>
        <span class="as-rec-timer" id="as-rec-timer">0:00</span>
        <button class="as-btn as-btn-danger" id="as-rec-btn" disabled>⏺ Record</button>
        <button class="as-btn as-btn-success" id="as-dl-btn" style="display:none">⬇ Download</button>
        <button class="as-btn as-btn-secondary" id="as-send-btn" style="display:none">↑ Send to Python</button>
        <span class="as-rec-format" id="as-rec-format"></span>
      </div>

      <!-- Controls -->
      <div class="as-controls">
        <span class="as-label">FFT size</span>
        <select class="as-select" id="as-fft">
          <option value="512">512 (fast)</option>
          <option value="1024">1024</option>
          <option value="2048" selected>2048 (default)</option>
          <option value="4096">4096 (detailed)</option>
        </select>
        <span class="as-label">Push every</span>
        <select class="as-select" id="as-interval">
          <option value="100">100 ms</option>
          <option value="200" selected>200 ms</option>
          <option value="500">500 ms</option>
          <option value="0">Never</option>
        </select>
        <span class="as-status" id="as-status">Stopped.</span>
        <span class="as-error" id="as-error" style="display:none"></span>
      </div>
    </div>
  `;

  // ── Refs ───────────────────────────────────────────────────────────────────
  const dot        = el.querySelector('#as-dot');
  const toggleBtn  = el.querySelector('#as-toggle');
  const dbNum      = el.querySelector('#as-db-num');
  const dbFill     = el.querySelector('#as-db-fill');
  const dbPeak     = el.querySelector('#as-db-peak');
  const canvas     = el.querySelector('#as-canvas');
  const peakFreqEl = el.querySelector('#as-peak-freq');
  const sampleRateEl=el.querySelector('#as-samplerate');
  const binsEl     = el.querySelector('#as-bins');
  const fftSel     = el.querySelector('#as-fft');
  const intervalSel= el.querySelector('#as-interval');
  const statusEl   = el.querySelector('#as-status');
  const errorEl    = el.querySelector('#as-error');
  const ctx        = canvas.getContext('2d');

  const recDot     = el.querySelector('#as-rec-dot');
  const recTimer   = el.querySelector('#as-rec-timer');
  const recBtn     = el.querySelector('#as-rec-btn');
  const dlBtn      = el.querySelector('#as-dl-btn');
  const sendBtn    = el.querySelector('#as-send-btn');
  const recFormat  = el.querySelector('#as-rec-format');

  // ── dB helpers ─────────────────────────────────────────────────────────────
  const DB_MIN = -90, DB_MAX = 0;
  function dbToPct(db) { return Math.max(0, Math.min(1, (db - DB_MIN) / (DB_MAX - DB_MIN))); }
  function dbToHue(db) { return 120 - dbToPct(db) * 120; }

  // ── Draw loop ──────────────────────────────────────────────────────────────
  let freqData = null;
  let timeData = null;

  function draw() {
    if (!analyser) return;
    animFrame = requestAnimationFrame(draw);

    analyser.getByteFrequencyData(freqData);
    analyser.getByteTimeDomainData(timeData);

    // RMS dB
    let sum = 0;
    for (let i = 0; i < timeData.length; i++) {
      const v = (timeData[i] - 128) / 128;
      sum += v * v;
    }
    const rms = Math.sqrt(sum / timeData.length);
    const db  = rms > 0 ? Math.max(DB_MIN, 20 * Math.log10(rms)) : DB_MIN;

    // Peak hold + decay
    if (db > peakHold) { peakHold = db; peakDecay = 60; }
    else if (peakDecay > 0) { peakDecay--; }
    else { peakHold = Math.max(DB_MIN, peakHold - 0.5); }

    const pct     = dbToPct(db) * 100;
    const peakPct = dbToPct(peakHold) * 100;
    const hue     = dbToHue(db);

    dbNum.textContent       = db.toFixed(1);
    dbFill.style.width      = pct + '%';
    dbFill.style.background = `hsl(${hue},90%,42%)`;
    dbPeak.style.left       = peakPct + '%';

    // Peak frequency
    let maxVal = 0, maxIdx = 0;
    for (let i = 0; i < freqData.length; i++) {
      if (freqData[i] > maxVal) { maxVal = freqData[i]; maxIdx = i; }
    }
    const nyquist = audioCtx.sampleRate / 2;
    const peakHz  = maxIdx * nyquist / freqData.length;
    peakFreqEl.textContent = maxVal > 10 ? peakHz.toFixed(0) + ' Hz' : '—';

    // Spectrum bars
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    const n       = freqData.length;
    const barW    = Math.max(1, W / n - 1);
    const spacing = W / n;
    for (let i = 0; i < n; i++) {
      const v  = freqData[i] / 255;
      const bH = v * H;
      ctx.fillStyle = `hsl(${120 - v * 120},90%,50%)`;
      ctx.fillRect(i * spacing, H - bH, barW, bH);
    }

    latest = { db_level: db, peak_frequency: peakHz };
  }

  // ── Recording helpers ──────────────────────────────────────────────────────
  function getBestMimeType() {
    const candidates = [
      'audio/webm;codecs=opus',
      'audio/ogg;codecs=opus',
      'audio/mp4',
      'audio/webm',
      'audio/ogg',
    ];
    return candidates.find(t => MediaRecorder.isTypeSupported(t)) || '';
  }

  function formatDuration(s) {
    const m = Math.floor(s / 60);
    return `${m}:${String(s % 60).padStart(2, '0')}`;
  }

  // ── MP3 encoding via lamejs (lazy-loaded from CDN) ─────────────────────────
  let _lameReady = false;
  async function ensureLame() {
    if (_lameReady) return;
    await new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/lamejs@1.2.1/lame.min.js';
      s.onload = res;
      s.onerror = () => rej(new Error('Could not load lamejs'));
      document.head.appendChild(s);
    });
    _lameReady = true;
  }

  async function blobToMp3DataUrl(blob) {
    await ensureLame();
    const arrayBuf = await blob.arrayBuffer();
    const audioBuf = await new Promise((res, rej) => {
      const ctx = new AudioContext();
      ctx.decodeAudioData(arrayBuf, buf => { ctx.close(); res(buf); }, rej);
    });
    const numCh = audioBuf.numberOfChannels;
    const sr    = audioBuf.sampleRate;
    const left  = audioBuf.getChannelData(0);
    const right = numCh > 1 ? audioBuf.getChannelData(1) : left;

    function f32ToI16(f32) {
      const out = new Int16Array(f32.length);
      for (let i = 0; i < f32.length; i++) {
        const s = Math.max(-1, Math.min(1, f32[i]));
        out[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
      }
      return out;
    }

    const lI16 = f32ToI16(left);
    const rI16 = f32ToI16(right);
    const enc  = new lamejs.Mp3Encoder(numCh > 1 ? 2 : 1, sr, 128);
    const bufs = [];
    const blk  = 1152;   // lamejs requires multiples of 1152

    for (let i = 0; i < lI16.length; i += blk) {
      const lc  = lI16.subarray(i, i + blk);
      const out = numCh > 1
        ? enc.encodeBuffer(lc, rI16.subarray(i, i + blk))
        : enc.encodeBuffer(lc);
      if (out.length > 0) bufs.push(new Uint8Array(out));
    }
    const tail = enc.flush();
    if (tail.length > 0) bufs.push(new Uint8Array(tail));

    const mp3Blob = new Blob(bufs, { type: 'audio/mpeg' });
    return new Promise((res, rej) => {
      const fr = new FileReader();
      fr.onloadend = () => res(fr.result);
      fr.onerror   = rej;
      fr.readAsDataURL(mp3Blob);
    });
  }

  function startRecording() {
    if (!stream) return;
    recMimeType    = getBestMimeType();
    recordedChunks = [];
    recSeconds     = 0;
    recTimer.textContent = '0:00';

    const options = recMimeType ? { mimeType: recMimeType } : {};
    mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) recordedChunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: recMimeType || 'audio/webm' });

      // Show download + send buttons (both encode to MP3 via lamejs)
      dlBtn.onclick = async () => {
        dlBtn.disabled = true;
        statusEl.textContent = 'Encoding to MP3…';
        try {
          const dataUrl = await blobToMp3DataUrl(blob);
          const a = document.createElement('a');
          a.href     = dataUrl;
          a.download = `recording_${Date.now()}.mp3`;
          a.click();
        } catch (e) {
          errorEl.textContent   = 'MP3 error: ' + e.message;
          errorEl.style.display = 'block';
        } finally {
          dlBtn.disabled = false;
          statusEl.textContent = '';
        }
      };

      sendBtn.onclick = async () => {
        sendBtn.disabled = true;
        statusEl.textContent = 'Encoding to MP3…';
        try {
          const dataUrl = await blobToMp3DataUrl(blob);
          model.set('recorded_audio', dataUrl);   // data:audio/mpeg;base64,...
          model.save_changes();
          statusEl.textContent = 'MP3 sent to Python.';
        } catch (e) {
          errorEl.textContent   = 'MP3 error: ' + e.message;
          errorEl.style.display = 'block';
        } finally {
          sendBtn.disabled = false;
        }
      };

      dlBtn.style.display  = 'inline-block';
      sendBtn.style.display= 'inline-block';
      recFormat.textContent= 'MP3 (128 kbps)';
    };

    mediaRecorder.start(100);   // collect data every 100 ms

    recInterval = setInterval(() => {
      recSeconds++;
      recTimer.textContent = formatDuration(recSeconds);
    }, 1000);

    recDot.classList.add('recording');
    recBtn.textContent = '⏹ Stop';
    recBtn.classList.replace('as-btn-danger', 'as-btn-secondary');
    dlBtn.style.display  = 'none';
    sendBtn.style.display= 'none';
    model.set('recording', true);
    model.save_changes();
  }

  function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop();
    mediaRecorder = null;
    if (recInterval) { clearInterval(recInterval); recInterval = null; }

    recDot.classList.remove('recording');
    recBtn.textContent = '⏺ Record';
    recBtn.classList.replace('as-btn-secondary', 'as-btn-danger');
    model.set('recording', false);
    model.save_changes();
  }

  // ── Mic start / stop ───────────────────────────────────────────────────────
  async function start() {
    try {
      stream   = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioCtx.createAnalyser();
      analyser.fftSize             = parseInt(fftSel.value, 10);
      analyser.smoothingTimeConstant = 0.8;

      source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const bufLen = analyser.frequencyBinCount;
      freqData = new Uint8Array(bufLen);
      timeData = new Uint8Array(analyser.fftSize);

      canvas.width  = canvas.offsetWidth  || 448;
      canvas.height = canvas.offsetHeight || 140;

      sampleRateEl.textContent = audioCtx.sampleRate + ' Hz';
      binsEl.textContent       = bufLen;

      dot.classList.add('active');
      toggleBtn.textContent = 'Stop';
      toggleBtn.classList.replace('as-btn-primary', 'as-btn-secondary');
      statusEl.textContent  = 'Analyzing…';
      errorEl.style.display = 'none';
      recBtn.disabled       = false;
      model.set('active', true);
      model.save_changes();

      draw();

      const ms = parseInt(intervalSel.value, 10);
      if (ms > 0) {
        pushTimer = setInterval(() => {
          if (latest.db_level !== undefined) {
            model.set('value', { ...latest });
            model.save_changes();
          }
        }, ms);
      }
    } catch (e) {
      errorEl.textContent   = 'Microphone error: ' + e.message;
      errorEl.style.display = 'block';
    }
  }

  function stop() {
    stopRecording();
    if (animFrame)  { cancelAnimationFrame(animFrame); animFrame = null; }
    if (pushTimer)  { clearInterval(pushTimer); pushTimer = null; }
    if (source)     { source.disconnect(); source = null; }
    if (audioCtx)   { audioCtx.close(); audioCtx = null; }
    if (stream)     { stream.getTracks().forEach(t => t.stop()); stream = null; }
    analyser = null;

    dot.classList.remove('active');
    toggleBtn.textContent = 'Start';
    toggleBtn.classList.replace('as-btn-secondary', 'as-btn-primary');
    statusEl.textContent  = 'Stopped.';
    recBtn.disabled       = true;
    peakHold = -Infinity;
    dbNum.textContent  = '—';
    dbFill.style.width = '0%';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    model.set('active', false);
    model.save_changes();
  }

  // ── Events ─────────────────────────────────────────────────────────────────
  toggleBtn.addEventListener('click', () => model.get('active') ? stop() : start());

  recBtn.addEventListener('click', () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') stopRecording();
    else startRecording();
  });

  fftSel.addEventListener('change', () => {
    if (analyser) {
      analyser.fftSize = parseInt(fftSel.value, 10);
      const bufLen = analyser.frequencyBinCount;
      freqData = new Uint8Array(bufLen);
      timeData = new Uint8Array(analyser.fftSize);
      binsEl.textContent = bufLen;
    }
  });

  intervalSel.addEventListener('change', () => {
    const ms = parseInt(intervalSel.value, 10);
    model.set('update_interval', ms);
    model.save_changes();
    if (pushTimer) { clearInterval(pushTimer); pushTimer = null; }
    if (model.get('active') && ms > 0) {
      pushTimer = setInterval(() => {
        model.set('value', { ...latest });
        model.save_changes();
      }, ms);
    }
  });

  model.on('change:active', () => {
    const a = model.get('active');
    if (a && !audioCtx) start();
    else if (!a && audioCtx) stop();
  });

  intervalSel.value = String(model.get('update_interval'));

  return () => stop();
}

export default { render };
"""

    value = param.Dict(
        default={},
        doc="Latest audio reading pushed at update_interval rate: "
        "{db_level (float, dBFS), peak_frequency (float, Hz)}.",
    )
    active = param.Boolean(default=False, doc="Whether the microphone is active.")
    recording = param.Boolean(default=False, doc="Whether a recording is in progress.")
    recorded_audio = param.String(
        default="",
        doc="Last completed recording as a base64 data URL "
        "(e.g. 'data:audio/webm;base64,...'). Set when 'Send to Python' is clicked.",
    )
    update_interval = param.Integer(
        default=200,
        bounds=(0, 5000),
        doc="How often (ms) to push a live reading to Python. 0 = never.",
    )
    last_recording_base64 = param.String(
        default="",
        doc="Last completed recording converted to MP3 and stored as a base64 data URL "
        "('data:audio/mpeg;base64,...'). Set automatically when a recording is received.",
    )


if __name__ == "__main__":
    _CERT_DIR = Path(__file__).parents[4] / "data" / "certs"

    def app():
        audio = AudioSpectrum()

        def on_recorded(event):
            if not event.new:
                return
            # Browser already encoded to MP3 via lamejs — store directly
            _, b64 = event.new.split(",", 1)
            audio.last_recording_base64 = event.new
            print(f"MP3 recording received ({len(b64)} base64 chars)")

        audio.param.watch(on_recorded, "recorded_audio")
        return pn.Column(audio)

    pn.serve(
        app,
        threaded=True,
        allow_websocket_origin=["*"],
        port=8891,
        #  ssl_certfile=str(_CERT_DIR / "cert.pem"),
        #  ssl_keyfile=str(_CERT_DIR / "key.pem"),
    )

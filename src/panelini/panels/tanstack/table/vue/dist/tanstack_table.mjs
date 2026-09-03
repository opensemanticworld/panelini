/**
* @vue/shared v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function oi(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const ye = {}, En = [], gt = () => {
}, pa = () => !1, xo = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Ro = (e) => e.startsWith("onUpdate:"), Te = Object.assign, si = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Hf = Object.prototype.hasOwnProperty, ue = (e, t) => Hf.call(e, t), G = Array.isArray, Nt = (e) => xr(e) === "[object Map]", uo = (e) => xr(e) === "[object Set]", fl = (e) => xr(e) === "[object Date]", X = (e) => typeof e == "function", Se = (e) => typeof e == "string", pt = (e) => typeof e == "symbol", pe = (e) => e !== null && typeof e == "object", ha = (e) => (pe(e) || X(e)) && X(e.then) && X(e.catch), va = Object.prototype.toString, xr = (e) => va.call(e), Lf = (e) => xr(e).slice(8, -1), ma = (e) => xr(e) === "[object Object]", ii = (e) => Se(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, ir = /* @__PURE__ */ oi(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Co = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, jf = /-\w/g, tt = Co(
  (e) => e.replace(jf, (t) => t.slice(1).toUpperCase())
), zf = /\B([A-Z])/g, ln = Co(
  (e) => e.replace(zf, "-$1").toLowerCase()
), ya = Co((e) => e.charAt(0).toUpperCase() + e.slice(1)), ys = Co(
  (e) => e ? `on${ya(e)}` : ""
), ft = (e, t) => !Object.is(e, t), ws = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, wa = (e, t, n, r = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: r,
    value: n
  });
}, Kf = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let dl;
const Mo = () => dl || (dl = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function at(e) {
  if (G(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], o = Se(r) ? $f(r) : at(r);
      if (o)
        for (const s in o)
          t[s] = o[s];
    }
    return t;
  } else if (Se(e) || pe(e))
    return e;
}
const Vf = /;(?![^(]*\))/g, Bf = /:([^]+)/, Nf = /\/\*[^]*?\*\//g;
function $f(e) {
  const t = {};
  return e.replace(Nf, "").split(Vf).forEach((n) => {
    if (n) {
      const r = n.split(Bf);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function We(e) {
  let t = "";
  if (Se(e))
    t = e;
  else if (G(e))
    for (let n = 0; n < e.length; n++) {
      const r = We(e[n]);
      r && (t += r + " ");
    }
  else if (pe(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Wf = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Uf = /* @__PURE__ */ oi(Wf);
function ba(e) {
  return !!e || e === "";
}
function qf(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let r = 0; n && r < e.length; r++)
    n = Io(e[r], t[r]);
  return n;
}
function gl(e, t) {
  if (e.size !== t.size) return !1;
  const n = Array.from(t), r = new Uint8Array(n.length);
  for (const o of e) {
    let s = -1;
    for (let l = 0; l < n.length; l++)
      if (!r[l] && Io(o, n[l])) {
        s = l;
        break;
      }
    if (s < 0) return !1;
    r[s] = 1;
  }
  return !0;
}
function Io(e, t) {
  if (e === t) return !0;
  let n = fl(e), r = fl(t);
  if (n || r)
    return n && r ? e.getTime() === t.getTime() : !1;
  if (n = pt(e), r = pt(t), n || r)
    return e === t;
  if (n = G(e), r = G(t), n || r)
    return n && r ? qf(e, t) : !1;
  if (n = pe(e), r = pe(t), n || r) {
    if (!n || !r)
      return !1;
    if (n = Nt(e), r = Nt(t), n || r || (n = uo(e), r = uo(t), n || r))
      return n && r ? gl(e, t) : !1;
    const o = Object.keys(e).length, s = Object.keys(t).length;
    if (o !== s)
      return !1;
    for (const l in e) {
      const u = e.hasOwnProperty(l), c = t.hasOwnProperty(l);
      if (u && !c || !u && c || !Io(e[l], t[l]))
        return !1;
    }
  }
  return String(e) === String(t);
}
const _a = (e) => !!(e && e.__v_isRef === !0), St = (e) => Se(e) ? e : e == null ? "" : G(e) || pe(e) && (e.toString === va || !X(e.toString)) ? _a(e) ? St(e.value) : JSON.stringify(e, Sa, 2) : String(e), Sa = (e, t) => _a(t) ? Sa(e, t.value) : Nt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [r, o], s) => (n[bs(r, s) + " =>"] = o, n),
    {}
  )
} : uo(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => bs(n))
} : pt(t) ? bs(t) : pe(t) && !G(t) && !ma(t) ? String(t) : t, bs = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    pt(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Ie;
class Gf {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && Ie && (Ie.active ? (this.parent = Ie, this.index = (Ie.scopes || (Ie.scopes = [])).push(
      this
    ) - 1) : (this._active = !1, this._warnOnRun = !1));
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, n;
      if (this.scopes) {
        const r = this.scopes.slice();
        for (t = 0, n = r.length; t < n; t++)
          r[t].pause();
      }
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, n;
      if (this.scopes) {
        const o = this.scopes.slice();
        for (t = 0, n = o.length; t < n; t++)
          o[t].resume();
      }
      const r = this.effects.slice();
      for (t = 0, n = r.length; t < n; t++)
        r[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = Ie;
      try {
        return Ie = this, t();
      } finally {
        Ie = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Ie, Ie = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (Ie === this)
        Ie = this.prevScope;
      else {
        let t = Ie;
        for (; t; ) {
          if (t.prevScope === this) {
            t.prevScope = this.prevScope;
            break;
          }
          t = t.prevScope;
        }
      }
      this.prevScope = void 0;
    }
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++)
        this.effects[n].stop();
      for (this.effects.length = 0, n = 0, r = this.cleanups.length; n < r; n++)
        this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        const o = this.scopes.slice();
        for (n = 0, r = o.length; n < r; n++)
          o[n].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const o = this.parent.scopes.pop();
        o && o !== this && (this.parent.scopes[this.index] = o, o.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function xa() {
  return Ie;
}
function Xf(e, t = !1) {
  Ie && Ie.cleanups.push(e);
}
let me;
const _s = /* @__PURE__ */ new WeakSet();
class Ra {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Ie && (Ie.active ? Ie.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, _s.has(this) && (_s.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ma(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, pl(this), Ia(this);
    const t = me, n = nt;
    me = this, nt = !0;
    try {
      return this.fn();
    } finally {
      Ea(this), me = t, nt = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        ui(t);
      this.deps = this.depsTail = void 0, pl(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? _s.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    js(this) && this.run();
  }
  get dirty() {
    return js(this);
  }
}
let Ca = 0, lr, ar;
function Ma(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = ar, ar = e;
    return;
  }
  e.next = lr, lr = e;
}
function li() {
  Ca++;
}
function ai() {
  if (--Ca > 0)
    return;
  if (ar) {
    let t = ar;
    for (ar = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; lr; ) {
    let t = lr;
    for (lr = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (r) {
          e || (e = r);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function Ia(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Ea(e) {
  let t, n = e.depsTail, r = n;
  for (; r; ) {
    const o = r.prevDep;
    r.version === -1 ? (r === n && (n = o), ui(r), Yf(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = o;
  }
  e.deps = t, e.depsTail = n;
}
function js(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Aa(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Aa(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === pr) || (e.globalVersion = pr, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !js(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = me, r = nt;
  me = e, nt = !0;
  try {
    Ia(e);
    const o = e.fn(e._value);
    (t.version === 0 || ft(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    me = n, nt = r, Ea(e), e.flags &= -3;
  }
}
function ui(e, t = !1) {
  const { dep: n, prevSub: r, nextSub: o } = e;
  if (r && (r.nextSub = o, e.prevSub = void 0), o && (o.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
    n.computed.flags &= -5;
    for (let s = n.computed.deps; s; s = s.nextDep)
      ui(s, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Yf(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let nt = !0;
const Oa = [];
function It() {
  Oa.push(nt), nt = !1;
}
function Et() {
  const e = Oa.pop();
  nt = e === void 0 ? !0 : e;
}
function pl(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = me;
    me = void 0;
    try {
      t();
    } finally {
      me = n;
    }
  }
}
let pr = 0;
class Zf {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class ci {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!me || !nt || me === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== me)
      n = this.activeLink = new Zf(me, this), me.deps ? (n.prevDep = me.depsTail, me.depsTail.nextDep = n, me.depsTail = n) : me.deps = me.depsTail = n, ka(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const r = n.nextDep;
      r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = me.depsTail, n.nextDep = void 0, me.depsTail.nextDep = n, me.depsTail = n, me.deps === n && (me.deps = r);
    }
    return n;
  }
  trigger(t) {
    this.version++, pr++, this.notify(t);
  }
  notify(t) {
    li();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      ai();
    }
  }
}
function ka(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let r = t.deps; r; r = r.nextDep)
        ka(r);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const zs = /* @__PURE__ */ new WeakMap(), Qt = /* @__PURE__ */ Symbol(
  ""
), Ks = /* @__PURE__ */ Symbol(
  ""
), hr = /* @__PURE__ */ Symbol(
  ""
);
function Pe(e, t, n) {
  if (nt && me) {
    let r = zs.get(e);
    r || zs.set(e, r = /* @__PURE__ */ new Map());
    let o = r.get(n);
    o || (r.set(n, o = new ci()), o.map = r, o.key = n), o.track();
  }
}
function Ct(e, t, n, r, o, s) {
  const l = zs.get(e);
  if (!l) {
    pr++;
    return;
  }
  const u = (c) => {
    c && c.trigger();
  };
  if (li(), t === "clear")
    l.forEach(u);
  else {
    const c = G(e), d = c && ii(n);
    if (c && n === "length") {
      const g = Number(r);
      l.forEach((h, y) => {
        (y === "length" || y === hr || !pt(y) && y >= g) && u(h);
      });
    } else
      switch ((n !== void 0 || l.has(void 0)) && u(l.get(n)), d && u(l.get(hr)), t) {
        case "add":
          c ? d && u(l.get("length")) : (u(l.get(Qt)), Nt(e) && u(l.get(Ks)));
          break;
        case "delete":
          c || (u(l.get(Qt)), Nt(e) && u(l.get(Ks)));
          break;
        case "set":
          Nt(e) && u(l.get(Qt));
          break;
      }
  }
  ai();
}
function xn(e) {
  const t = /* @__PURE__ */ ae(e);
  return t === e ? t : (Pe(t, "iterate", hr), /* @__PURE__ */ Xe(e) ? t : t.map(rt));
}
function Eo(e) {
  return Pe(e = /* @__PURE__ */ ae(e), "iterate", hr), e;
}
function ut(e, t) {
  return /* @__PURE__ */ At(e) ? Pn(/* @__PURE__ */ en(e) ? rt(t) : t) : rt(t);
}
const Jf = {
  __proto__: null,
  [Symbol.iterator]() {
    return Ss(this, Symbol.iterator, (e) => ut(this, e));
  },
  concat(...e) {
    return xn(this).concat(
      ...e.map((t) => G(t) ? xn(t) : t)
    );
  },
  entries() {
    return Ss(this, "entries", (e) => (e[1] = ut(this, e[1]), e));
  },
  every(e, t) {
    return _t(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return _t(
      this,
      "filter",
      e,
      t,
      (n) => n.map((r) => ut(this, r)),
      arguments
    );
  },
  find(e, t) {
    return _t(
      this,
      "find",
      e,
      t,
      (n) => ut(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return _t(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return _t(
      this,
      "findLast",
      e,
      t,
      (n) => ut(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return _t(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return _t(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return xs(this, "includes", e);
  },
  indexOf(...e) {
    return xs(this, "indexOf", e);
  },
  join(e) {
    return xn(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return xs(this, "lastIndexOf", e);
  },
  map(e, t) {
    return _t(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return er(this, "pop");
  },
  push(...e) {
    return er(this, "push", e);
  },
  reduce(e, ...t) {
    return hl(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return hl(this, "reduceRight", e, t);
  },
  shift() {
    return er(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return _t(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return er(this, "splice", e);
  },
  toReversed() {
    return xn(this).toReversed();
  },
  toSorted(e) {
    return xn(this).toSorted(e);
  },
  toSpliced(...e) {
    return xn(this).toSpliced(...e);
  },
  unshift(...e) {
    return er(this, "unshift", e);
  },
  values() {
    return Ss(this, "values", (e) => ut(this, e));
  }
};
function Ss(e, t, n) {
  const r = Eo(e), o = r[t]();
  return r !== e && !/* @__PURE__ */ Xe(e) && (o._next = o.next, o.next = () => {
    const s = o._next();
    return s.done || (s.value = n(s.value)), s;
  }), o;
}
const Qf = Array.prototype;
function _t(e, t, n, r, o, s) {
  const l = Eo(e), u = l !== e && !/* @__PURE__ */ Xe(e), c = l[t];
  if (c !== Qf[t]) {
    const h = c.apply(e, s);
    return u ? rt(h) : h;
  }
  let d = n;
  l !== e && (u ? d = function(h, y) {
    return n.call(this, ut(e, h), y, e);
  } : n.length > 2 && (d = function(h, y) {
    return n.call(this, h, y, e);
  }));
  const g = c.call(l, d, r);
  return u && o ? o(g) : g;
}
function hl(e, t, n, r) {
  const o = Eo(e), s = o !== e && !/* @__PURE__ */ Xe(e);
  let l = n, u = !1;
  o !== e && (s ? (u = r.length === 0, l = function(d, g, h) {
    return u && (u = !1, d = ut(e, d)), n.call(this, d, ut(e, g), h, e);
  }) : n.length > 3 && (l = function(d, g, h) {
    return n.call(this, d, g, h, e);
  }));
  const c = o[t](l, ...r);
  return u ? ut(e, c) : c;
}
function xs(e, t, n) {
  const r = /* @__PURE__ */ ae(e);
  Pe(r, "iterate", hr);
  const o = r[t](...n);
  return (o === -1 || o === !1) && /* @__PURE__ */ gi(n[0]) ? (n[0] = /* @__PURE__ */ ae(n[0]), r[t](...n)) : o;
}
function er(e, t, n = []) {
  It(), li();
  const r = (/* @__PURE__ */ ae(e))[t].apply(e, n);
  return ai(), Et(), r;
}
const ed = /* @__PURE__ */ oi("__proto__,__v_isRef,__isVue"), Pa = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(pt)
);
function td(e) {
  pt(e) || (e = String(e));
  const t = /* @__PURE__ */ ae(this);
  return Pe(t, "has", e), t.hasOwnProperty(e);
}
class Da {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, r) {
    if (n === "__v_skip") return t.__v_skip;
    const o = this._isReadonly, s = this._isShallow;
    if (n === "__v_isReactive")
      return !o;
    if (n === "__v_isReadonly")
      return o;
    if (n === "__v_isShallow")
      return s;
    if (n === "__v_raw")
      return r === (o ? s ? fd : La : s ? Ha : Fa).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const l = G(t);
    if (!o) {
      let c;
      if (l && (c = Jf[n]))
        return c;
      if (n === "hasOwnProperty")
        return td;
    }
    const u = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ De(t) ? t : r
    );
    if ((pt(n) ? Pa.has(n) : ed(n)) || (o || Pe(t, "get", n), s))
      return u;
    if (/* @__PURE__ */ De(u)) {
      const c = l && ii(n) ? u : u.value;
      return o && pe(c) ? /* @__PURE__ */ Bs(c) : c;
    }
    return pe(u) ? o ? /* @__PURE__ */ Bs(u) : /* @__PURE__ */ Ao(u) : u;
  }
}
class Ta extends Da {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, o) {
    let s = t[n];
    const l = G(t) && ii(n);
    if (!this._isShallow) {
      const d = /* @__PURE__ */ At(s);
      if (!/* @__PURE__ */ Xe(r) && !/* @__PURE__ */ At(r) && (s = /* @__PURE__ */ ae(s), r = /* @__PURE__ */ ae(r)), !l && /* @__PURE__ */ De(s) && !/* @__PURE__ */ De(r))
        return d || (s.value = r), !0;
    }
    const u = l ? Number(n) < t.length : ue(t, n), c = Reflect.set(
      t,
      n,
      r,
      /* @__PURE__ */ De(t) ? t : o
    );
    return t === /* @__PURE__ */ ae(o) && c && (u ? ft(r, s) && Ct(t, "set", n, r) : Ct(t, "add", n, r)), c;
  }
  deleteProperty(t, n) {
    const r = ue(t, n);
    t[n];
    const o = Reflect.deleteProperty(t, n);
    return o && r && Ct(t, "delete", n, void 0), o;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!pt(n) || !Pa.has(n)) && Pe(t, "has", n), r;
  }
  ownKeys(t) {
    return Pe(
      t,
      "iterate",
      G(t) ? "length" : Qt
    ), Reflect.ownKeys(t);
  }
}
class nd extends Da {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const rd = /* @__PURE__ */ new Ta(), od = /* @__PURE__ */ new nd(), sd = /* @__PURE__ */ new Ta(!0);
const Vs = (e) => e, Xr = (e) => Reflect.getPrototypeOf(e);
function id(e, t, n) {
  return function(...r) {
    const o = this.__v_raw, s = /* @__PURE__ */ ae(o), l = Nt(s), u = e === "entries" || e === Symbol.iterator && l, c = e === "keys" && l, d = o[e](...r), g = n ? Vs : t ? Pn : rt;
    return !t && Pe(
      s,
      "iterate",
      c ? Ks : Qt
    ), Te(
      // inheriting all iterator properties
      Object.create(d),
      {
        // iterator protocol
        next() {
          const { value: h, done: y } = d.next();
          return y ? { value: h, done: y } : {
            value: u ? [g(h[0]), g(h[1])] : g(h),
            done: y
          };
        }
      }
    );
  };
}
function Yr(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function ld(e, t) {
  const n = {
    get(o) {
      const s = this.__v_raw, l = /* @__PURE__ */ ae(s), u = /* @__PURE__ */ ae(o);
      e || (ft(o, u) && Pe(l, "get", o), Pe(l, "get", u));
      const { has: c } = Xr(l), d = t ? Vs : e ? Pn : rt;
      if (c.call(l, o))
        return d(s.get(o));
      if (c.call(l, u))
        return d(s.get(u));
      s !== l && s.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && Pe(/* @__PURE__ */ ae(o), "iterate", Qt), o.size;
    },
    has(o) {
      const s = this.__v_raw, l = /* @__PURE__ */ ae(s), u = /* @__PURE__ */ ae(o);
      return e || (ft(o, u) && Pe(l, "has", o), Pe(l, "has", u)), o === u ? s.has(o) : s.has(o) || s.has(u);
    },
    forEach(o, s) {
      const l = this, u = l.__v_raw, c = /* @__PURE__ */ ae(u), d = t ? Vs : e ? Pn : rt;
      return !e && Pe(c, "iterate", Qt), u.forEach((g, h) => o.call(s, d(g), d(h), l));
    }
  };
  return Te(
    n,
    e ? {
      add: Yr("add"),
      set: Yr("set"),
      delete: Yr("delete"),
      clear: Yr("clear")
    } : {
      add(o) {
        const s = /* @__PURE__ */ ae(this), l = Xr(s), u = /* @__PURE__ */ ae(o), c = !t && !/* @__PURE__ */ Xe(o) && !/* @__PURE__ */ At(o) ? u : o;
        return l.has.call(s, c) || ft(o, c) && l.has.call(s, o) || ft(u, c) && l.has.call(s, u) || (s.add(c), Ct(s, "add", c, c)), this;
      },
      set(o, s) {
        !t && !/* @__PURE__ */ Xe(s) && !/* @__PURE__ */ At(s) && (s = /* @__PURE__ */ ae(s));
        const l = /* @__PURE__ */ ae(this), { has: u, get: c } = Xr(l);
        let d = u.call(l, o);
        d || (o = /* @__PURE__ */ ae(o), d = u.call(l, o));
        const g = c.call(l, o);
        return l.set(o, s), d ? ft(s, g) && Ct(l, "set", o, s) : Ct(l, "add", o, s), this;
      },
      delete(o) {
        const s = /* @__PURE__ */ ae(this), { has: l, get: u } = Xr(s);
        let c = l.call(s, o);
        c || (o = /* @__PURE__ */ ae(o), c = l.call(s, o)), u && u.call(s, o);
        const d = s.delete(o);
        return c && Ct(s, "delete", o, void 0), d;
      },
      clear() {
        const o = /* @__PURE__ */ ae(this), s = o.size !== 0, l = o.clear();
        return s && Ct(
          o,
          "clear",
          void 0,
          void 0
        ), l;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((o) => {
    n[o] = id(o, e, t);
  }), n;
}
function fi(e, t) {
  const n = ld(e, t);
  return (r, o, s) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(
    ue(n, o) && o in r ? n : r,
    o,
    s
  );
}
const ad = {
  get: /* @__PURE__ */ fi(!1, !1)
}, ud = {
  get: /* @__PURE__ */ fi(!1, !0)
}, cd = {
  get: /* @__PURE__ */ fi(!0, !1)
};
const Fa = /* @__PURE__ */ new WeakMap(), Ha = /* @__PURE__ */ new WeakMap(), La = /* @__PURE__ */ new WeakMap(), fd = /* @__PURE__ */ new WeakMap();
function dd(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
// @__NO_SIDE_EFFECTS__
function Ao(e) {
  return /* @__PURE__ */ At(e) ? e : di(
    e,
    !1,
    rd,
    ad,
    Fa
  );
}
// @__NO_SIDE_EFFECTS__
function gd(e) {
  return di(
    e,
    !1,
    sd,
    ud,
    Ha
  );
}
// @__NO_SIDE_EFFECTS__
function Bs(e) {
  return di(
    e,
    !0,
    od,
    cd,
    La
  );
}
function di(e, t, n, r, o) {
  if (!pe(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const s = o.get(e);
  if (s)
    return s;
  const l = dd(Lf(e));
  if (l === 0)
    return e;
  const u = new Proxy(
    e,
    l === 2 ? r : n
  );
  return o.set(e, u), u;
}
// @__NO_SIDE_EFFECTS__
function en(e) {
  return /* @__PURE__ */ At(e) ? /* @__PURE__ */ en(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function At(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Xe(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function gi(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function ae(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ ae(t) : e;
}
function pd(e) {
  return !ue(e, "__v_skip") && Object.isExtensible(e) && wa(e, "__v_skip", !0), e;
}
const rt = (e) => pe(e) ? /* @__PURE__ */ Ao(e) : e, Pn = (e) => pe(e) ? /* @__PURE__ */ Bs(e) : e;
// @__NO_SIDE_EFFECTS__
function De(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function re(e) {
  return ja(e, !1);
}
// @__NO_SIDE_EFFECTS__
function hd(e) {
  return ja(e, !0);
}
function ja(e, t) {
  return /* @__PURE__ */ De(e) ? e : new vd(e, t);
}
class vd {
  constructor(t, n) {
    this.dep = new ci(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ ae(t), this._value = n ? t : rt(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, r = this.__v_isShallow || /* @__PURE__ */ Xe(t) || /* @__PURE__ */ At(t);
    t = r ? t : /* @__PURE__ */ ae(t), ft(t, n) && (this._rawValue = t, this._value = r ? t : rt(t), this.dep.trigger());
  }
}
function tn(e) {
  return /* @__PURE__ */ De(e) ? e.value : e;
}
const md = {
  get: (e, t, n) => t === "__v_raw" ? e : tn(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return /* @__PURE__ */ De(o) && !/* @__PURE__ */ De(n) ? (o.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function za(e) {
  return /* @__PURE__ */ en(e) ? e : new Proxy(e, md);
}
class yd {
  constructor(t, n, r) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new ci(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = pr - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    me !== this)
      return Ma(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Aa(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function wd(e, t, n = !1) {
  let r, o;
  return X(e) ? r = e : (r = e.get, o = e.set), new yd(r, o, n);
}
const Zr = {}, co = /* @__PURE__ */ new WeakMap();
let Jt;
function bd(e, t = !1, n = Jt) {
  if (n) {
    let r = co.get(n);
    r || co.set(n, r = []), r.push(e);
  }
}
function _d(e, t, n = ye) {
  const { immediate: r, deep: o, once: s, scheduler: l, augmentJob: u, call: c } = n, d = (_) => o ? _ : /* @__PURE__ */ Xe(_) || o === !1 || o === 0 ? Bt(_, 1) : Bt(_);
  let g, h, y, w, O = !1, x = !1;
  if (/* @__PURE__ */ De(e) ? (h = () => e.value, O = /* @__PURE__ */ Xe(e)) : /* @__PURE__ */ en(e) ? (h = () => d(e), O = !0) : G(e) ? (x = !0, O = e.some((_) => /* @__PURE__ */ en(_) || /* @__PURE__ */ Xe(_)), h = () => e.map((_) => {
    if (/* @__PURE__ */ De(_))
      return _.value;
    if (/* @__PURE__ */ en(_))
      return d(_);
    if (X(_))
      return c ? c(_, 2) : _();
  })) : X(e) ? t ? h = c ? () => c(e, 2) : e : h = () => {
    if (y) {
      It();
      try {
        y();
      } finally {
        Et();
      }
    }
    const _ = Jt;
    Jt = g;
    try {
      return c ? c(e, 3, [w]) : e(w);
    } finally {
      Jt = _;
    }
  } : h = gt, t && o) {
    const _ = h, P = o === !0 ? 1 / 0 : o;
    h = () => Bt(_(), P);
  }
  const A = xa(), K = () => {
    g.stop(), A && A.active && si(A.effects, g);
  };
  if (s && t) {
    const _ = t;
    t = (...P) => {
      const z = _(...P);
      return K(), z;
    };
  }
  let S = x ? new Array(e.length).fill(Zr) : Zr;
  const j = (_) => {
    if (!(!(g.flags & 1) || !g.dirty && !_))
      if (t) {
        const P = g.run();
        if (_ || o || O || (x ? P.some((z, Y) => ft(z, S[Y])) : ft(P, S))) {
          y && y();
          const z = Jt;
          Jt = g;
          try {
            const Y = [
              P,
              // pass undefined as the old value when it's changed for the first time
              S === Zr ? void 0 : x && S[0] === Zr ? [] : S,
              w
            ];
            S = P, c ? c(t, 3, Y) : (
              // @ts-expect-error
              t(...Y)
            );
          } finally {
            Jt = z;
          }
        }
      } else
        g.run();
  };
  return u && u(j), g = new Ra(h), g.scheduler = l ? () => l(j, !1) : j, w = (_) => bd(_, !1, g), y = g.onStop = () => {
    const _ = co.get(g);
    if (_) {
      if (c)
        c(_, 4);
      else
        for (const P of _) P();
      co.delete(g);
    }
  }, t ? r ? j(!0) : S = g.run() : l ? l(j.bind(null, !0), !0) : g.run(), K.pause = g.pause.bind(g), K.resume = g.resume.bind(g), K.stop = K, K;
}
function Bt(e, t = 1 / 0, n) {
  if (t <= 0 || !pe(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ De(e))
    Bt(e.value, t, n);
  else if (G(e))
    for (let r = 0; r < e.length; r++)
      Bt(e[r], t, n);
  else if (uo(e) || Nt(e))
    e.forEach((r) => {
      Bt(r, t, n);
    });
  else if (ma(e)) {
    for (const r in e)
      Bt(e[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, r) && Bt(e[r], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Rr(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (o) {
    Oo(o, t, n);
  }
}
function ot(e, t, n, r) {
  if (X(e)) {
    const o = Rr(e, t, n, r);
    return o && ha(o) && o.catch((s) => {
      Oo(s, t, n);
    }), o;
  }
  if (G(e)) {
    const o = [];
    for (let s = 0; s < e.length; s++)
      o.push(ot(e[s], t, n, r));
    return o;
  }
}
function Oo(e, t, n, r = !0) {
  const o = t ? t.vnode : null, { errorHandler: s, throwUnhandledErrorInProduction: l } = t && t.appContext.config || ye;
  if (t) {
    let u = t.parent;
    const c = t.proxy, d = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; u; ) {
      const g = u.ec;
      if (g) {
        for (let h = 0; h < g.length; h++)
          if (g[h](e, c, d) === !1)
            return;
      }
      u = u.parent;
    }
    if (s) {
      It(), Rr(s, null, 10, [
        e,
        c,
        d
      ]), Et();
      return;
    }
  }
  Sd(e, n, o, r, l);
}
function Sd(e, t, n, r = !0, o = !1) {
  if (o)
    throw e;
  console.error(e);
}
const He = [];
let lt = -1;
const An = [];
let Vt = null, Mn = 0;
const Ka = /* @__PURE__ */ Promise.resolve();
let fo = null;
function Ke(e) {
  const t = fo || Ka;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function xd(e) {
  let t = lt + 1, n = He.length;
  for (; t < n; ) {
    const r = t + n >>> 1, o = He[r], s = vr(o);
    s < e || s === e && o.flags & 2 ? t = r + 1 : n = r;
  }
  return t;
}
function pi(e) {
  if (!(e.flags & 1)) {
    const t = vr(e), n = He[He.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= vr(n) ? He.push(e) : He.splice(xd(t), 0, e), e.flags |= 1, Va();
  }
}
function Va() {
  fo || (fo = Ka.then(Na));
}
function Rd(e) {
  if (!G(e))
    Vt && e.id === -1 ? Vt.splice(Mn + 1, 0, e) : e.flags & 1 || (An.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      An.push(e[t]);
  Va();
}
function vl(e, t, n = lt + 1) {
  for (; n < He.length; n++) {
    const r = He[n];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid)
        continue;
      He.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function Ba(e) {
  if (An.length) {
    const t = [...new Set(An)].sort(
      (n, r) => vr(n) - vr(r)
    );
    if (An.length = 0, Vt) {
      for (let n = 0; n < t.length; n++)
        Vt.push(t[n]);
      return;
    }
    for (Vt = t, Mn = 0; Mn < Vt.length; Mn++) {
      const n = Vt[Mn];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    Vt = null, Mn = 0;
  }
}
const vr = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Na(e) {
  try {
    for (lt = 0; lt < He.length; lt++) {
      const t = He[lt];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Rr(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; lt < He.length; lt++) {
      const t = He[lt];
      t && (t.flags &= -2);
    }
    lt = -1, He.length = 0, Ba(), fo = null, (He.length || An.length) && Na();
  }
}
let dt = null, $a = null;
function go(e) {
  const t = dt;
  return dt = e, $a = e && e.type.__scopeId || null, t;
}
function Cd(e, t = dt, n) {
  if (!t || e._n)
    return e;
  const r = (...o) => {
    r._d && Il(-1);
    const s = go(t), l = nn.length;
    let u;
    try {
      u = e(...o);
    } finally {
      for (let c = nn.length; c > l; c--) pu();
      go(s), r._d && Il(1);
    }
    return u;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function Yt(e, t, n, r) {
  const o = e.dirs, s = t && t.dirs;
  for (let l = 0; l < o.length; l++) {
    const u = o[l];
    s && (u.oldValue = s[l].value);
    let c = u.dir[r];
    c && (It(), ot(c, n, 8, [
      e.el,
      u,
      e,
      t
    ]), Et());
  }
}
function Md(e, t) {
  if (Le) {
    let n = Le.provides;
    const r = Le.parent && Le.parent.provides;
    r === n && (n = Le.provides = Object.create(r)), n[e] = t;
  }
}
function oo(e, t, n = !1) {
  const r = Sg();
  if (r || On) {
    let o = On ? On._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && X(t) ? t.call(r && r.proxy) : t;
  }
}
const Id = /* @__PURE__ */ Symbol.for("v-scx"), Ed = () => oo(Id);
function be(e, t, n) {
  return Wa(e, t, n);
}
function Wa(e, t, n = ye) {
  const { immediate: r, deep: o, flush: s, once: l } = n, u = Te({}, n), c = t && r || !t && s !== "post";
  let d;
  if (wr) {
    if (s === "sync") {
      const w = Ed();
      d = w.__watcherHandles || (w.__watcherHandles = []);
    } else if (!c) {
      const w = () => {
      };
      return w.stop = gt, w.resume = gt, w.pause = gt, w;
    }
  }
  const g = Le;
  u.call = (w, O, x) => ot(w, g, O, x);
  let h = !1;
  s === "post" ? u.scheduler = (w) => {
    Ve(w, g && g.suspense);
  } : s !== "sync" && (h = !0, u.scheduler = (w, O) => {
    O ? w() : pi(w);
  }), u.augmentJob = (w) => {
    t && (w.flags |= 4), h && (w.flags |= 2, g && (w.id = g.uid, w.i = g));
  };
  const y = _d(e, t, u);
  return wr && (d ? d.push(y) : c && y()), y;
}
function Ad(e, t, n) {
  const r = this.proxy, o = Se(e) ? e.includes(".") ? Ua(r, e) : () => r[e] : e.bind(r, r);
  let s;
  X(t) ? s = t : (s = t.handler, n = t);
  const l = Cr(this), u = Wa(o, s.bind(r), n);
  return l(), u;
}
function Ua(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++)
      r = r[n[o]];
    return r;
  };
}
const Od = /* @__PURE__ */ Symbol("_vte"), ko = (e) => e.__isTeleport, Rs = /* @__PURE__ */ Symbol("_leaveCb");
function kd(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== Ot) {
        t = n;
        break;
      }
  }
  return t;
}
function qa(e) {
  if (!vi(e))
    return ko(e.type) && e.children ? kd(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16)
      return n[0];
    if (t & 32 && X(n.default))
      return n.default();
  }
}
function hi(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    hi(
      ko(n.type) && qa(n) || n,
      t
    );
  } else e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Ga(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function ml(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const po = /* @__PURE__ */ new WeakMap();
function ur(e, t, n, r, o = !1) {
  if (G(e)) {
    e.forEach(
      (x, A) => ur(
        x,
        t && (G(t) ? t[A] : t),
        n,
        r,
        o
      )
    );
    return;
  }
  if (cr(r) && !o) {
    r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && ur(e, t, n, r.component.subTree);
    return;
  }
  const s = r.shapeFlag & 4 ? wi(r.component) : r.el, l = o ? null : s, { i: u, r: c } = e, d = t && t.r, g = u.refs === ye ? u.refs = {} : u.refs, h = u.setupState, y = /* @__PURE__ */ ae(h), w = h === ye ? pa : (x) => ml(g, x) ? !1 : ue(y, x), O = (x, A) => !(A && ml(g, A));
  if (d != null && d !== c) {
    if (yl(t), Se(d))
      g[d] = null, w(d) && (h[d] = null);
    else if (/* @__PURE__ */ De(d)) {
      const x = t;
      O(d, x.k) && (d.value = null), x.k && (g[x.k] = null);
    }
  }
  if (X(c))
    Rr(c, u, 12, [l, g]);
  else {
    const x = Se(c), A = /* @__PURE__ */ De(c);
    if (x || A) {
      const K = () => {
        if (e.f) {
          const S = x ? w(c) ? h[c] : g[c] : O() || !e.k ? c.value : g[e.k];
          if (o)
            G(S) && si(S, s);
          else if (G(S))
            S.includes(s) || S.push(s);
          else if (x)
            g[c] = [s], w(c) && (h[c] = g[c]);
          else {
            const j = [s];
            O(c, e.k) && (c.value = j), e.k && (g[e.k] = j);
          }
        } else x ? (g[c] = l, w(c) && (h[c] = l)) : A && (O(c, e.k) && (c.value = l), e.k && (g[e.k] = l));
      };
      if (l) {
        const S = () => {
          K(), po.delete(e);
        };
        S.id = -1, po.set(e, S), Ve(S, n);
      } else
        yl(e), K();
    }
  }
}
function yl(e) {
  const t = po.get(e);
  t && (t.flags |= 8, po.delete(e));
}
Mo().requestIdleCallback;
Mo().cancelIdleCallback;
const cr = (e) => !!e.type.__asyncLoader, vi = (e) => e.type.__isKeepAlive;
function Pd(e, t) {
  Xa(e, "a", t);
}
function Dd(e, t) {
  Xa(e, "da", t);
}
function Xa(e, t, n = Le) {
  const r = e.__wdc || (e.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (Po(t, r, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      vi(o.parent.vnode) && Td(r, t, n, o), o = o.parent;
  }
}
function Td(e, t, n, r) {
  const o = Po(
    t,
    e,
    r,
    !0
    /* prepend */
  );
  Ya(() => {
    si(r[t], o);
  }, n);
}
function Po(e, t, n = Le, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), s = t.__weh || (t.__weh = (...l) => {
      It();
      const u = Cr(n), c = ot(t, n, e, l);
      return u(), Et(), c;
    });
    return r ? o.unshift(s) : o.push(s), s;
  }
}
const Pt = (e) => (t, n = Le) => {
  (!wr || e === "sp") && Po(e, (...r) => t(...r), n);
}, Fd = Pt("bm"), so = Pt("m"), Hd = Pt(
  "bu"
), Ld = Pt("u"), rr = Pt(
  "bum"
), Ya = Pt("um"), jd = Pt(
  "sp"
), zd = Pt("rtg"), Kd = Pt("rtc");
function Vd(e, t = Le) {
  Po("ec", e, t);
}
const Bd = /* @__PURE__ */ Symbol.for("v-ndc");
function Rn(e, t, n, r) {
  let o;
  const s = n, l = G(e);
  if (l || Se(e)) {
    const u = l && /* @__PURE__ */ en(e);
    let c = !1, d = !1;
    u && (c = !/* @__PURE__ */ Xe(e), d = /* @__PURE__ */ At(e), e = Eo(e)), o = new Array(e.length);
    for (let g = 0, h = e.length; g < h; g++)
      o[g] = t(
        c ? d ? Pn(rt(e[g])) : rt(e[g]) : e[g],
        g,
        void 0,
        s
      );
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let u = 0; u < e; u++)
      o[u] = t(u + 1, u, void 0, s);
  } else if (pe(e))
    if (e[Symbol.iterator])
      o = Array.from(
        e,
        (u, c) => t(u, c, void 0, s)
      );
    else {
      const u = Object.keys(e);
      o = new Array(u.length);
      for (let c = 0, d = u.length; c < d; c++) {
        const g = u[c];
        o[c] = t(e[g], g, c, s);
      }
    }
  else
    o = [];
  return o;
}
const Ns = (e) => e ? yu(e) ? wi(e) : Ns(e.parent) : null, fr = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Te(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Ns(e.parent),
    $root: (e) => Ns(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Ja(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      pi(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Ke.bind(e.proxy)),
    $watch: (e) => Ad.bind(e)
  })
), Cs = (e, t) => e !== ye && !e.__isScriptSetup && ue(e, t), Nd = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: r, data: o, props: s, accessCache: l, type: u, appContext: c } = e;
    if (t[0] !== "$") {
      const y = l[t];
      if (y !== void 0)
        switch (y) {
          case 1:
            return r[t];
          case 2:
            return o[t];
          case 4:
            return n[t];
          case 3:
            return s[t];
        }
      else {
        if (Cs(r, t))
          return l[t] = 1, r[t];
        if (o !== ye && ue(o, t))
          return l[t] = 2, o[t];
        if (ue(s, t))
          return l[t] = 3, s[t];
        if (n !== ye && ue(n, t))
          return l[t] = 4, n[t];
        $s && (l[t] = 0);
      }
    }
    const d = fr[t];
    let g, h;
    if (d)
      return t === "$attrs" && Pe(e.attrs, "get", ""), d(e);
    if (
      // css module (injected by vue-loader)
      (g = u.__cssModules) && (g = g[t])
    )
      return g;
    if (n !== ye && ue(n, t))
      return l[t] = 4, n[t];
    if (
      // global properties
      h = c.config.globalProperties, ue(h, t)
    )
      return h[t];
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: o, ctx: s } = e;
    return Cs(o, t) ? (o[t] = n, !0) : r !== ye && ue(r, t) ? (r[t] = n, !0) : ue(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (s[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: o, props: s, type: l }
  }, u) {
    let c;
    return !!(n[u] || e !== ye && u[0] !== "$" && ue(e, u) || Cs(t, u) || ue(s, u) || ue(r, u) || ue(fr, u) || ue(o.config.globalProperties, u) || (c = l.__cssModules) && c[u]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : ue(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function wl(e) {
  return G(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let $s = !0;
function $d(e) {
  const t = Ja(e), n = e.proxy, r = e.ctx;
  $s = !1, t.beforeCreate && bl(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: s,
    methods: l,
    watch: u,
    provide: c,
    inject: d,
    // lifecycle
    created: g,
    beforeMount: h,
    mounted: y,
    beforeUpdate: w,
    updated: O,
    activated: x,
    deactivated: A,
    beforeDestroy: K,
    beforeUnmount: S,
    destroyed: j,
    unmounted: _,
    render: P,
    renderTracked: z,
    renderTriggered: Y,
    errorCaptured: $,
    serverPrefetch: H,
    // public API
    expose: W,
    inheritAttrs: ie,
    // assets
    components: ce,
    directives: te,
    filters: we
  } = t;
  if (d && Wd(d, r, null), l)
    for (const oe in l) {
      const ne = l[oe];
      X(ne) && (r[oe] = ne.bind(n));
    }
  if (o) {
    const oe = o.call(n, n);
    pe(oe) && (e.data = /* @__PURE__ */ Ao(oe));
  }
  if ($s = !0, s)
    for (const oe in s) {
      const ne = s[oe], Ze = X(ne) ? ne.bind(n, n) : X(ne.get) ? ne.get.bind(n, n) : gt, dn = !X(ne) && X(ne.set) ? ne.set.bind(n) : gt, Be = N({
        get: Ze,
        set: dn
      });
      Object.defineProperty(r, oe, {
        enumerable: !0,
        configurable: !0,
        get: () => Be.value,
        set: (ve) => Be.value = ve
      });
    }
  if (u)
    for (const oe in u)
      Za(u[oe], r, n, oe);
  if (c) {
    const oe = X(c) ? c.call(n) : c;
    Reflect.ownKeys(oe).forEach((ne) => {
      Md(ne, oe[ne]);
    });
  }
  g && bl(g, e, "c");
  function fe(oe, ne) {
    G(ne) ? ne.forEach((Ze) => oe(Ze.bind(n))) : ne && oe(ne.bind(n));
  }
  if (fe(Fd, h), fe(so, y), fe(Hd, w), fe(Ld, O), fe(Pd, x), fe(Dd, A), fe(Vd, $), fe(Kd, z), fe(zd, Y), fe(rr, S), fe(Ya, _), fe(jd, H), G(W))
    if (W.length) {
      const oe = e.exposed || (e.exposed = {});
      W.forEach((ne) => {
        Object.defineProperty(oe, ne, {
          get: () => n[ne],
          set: (Ze) => n[ne] = Ze,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  P && e.render === gt && (e.render = P), ie != null && (e.inheritAttrs = ie), ce && (e.components = ce), te && (e.directives = te), H && Ga(e);
}
function Wd(e, t, n = gt) {
  G(e) && (e = Ws(e));
  for (const r in e) {
    const o = e[r];
    let s;
    pe(o) ? "default" in o ? s = oo(
      o.from || r,
      o.default,
      !0
    ) : s = oo(o.from || r) : s = oo(o), /* @__PURE__ */ De(s) ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (l) => s.value = l
    }) : t[r] = s;
  }
}
function bl(e, t, n) {
  ot(
    G(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Za(e, t, n, r) {
  let o = r.includes(".") ? Ua(n, r) : () => n[r];
  if (Se(e)) {
    const s = t[e];
    X(s) && be(o, s);
  } else if (X(e))
    be(o, e.bind(n));
  else if (pe(e))
    if (G(e))
      e.forEach((s) => Za(s, t, n, r));
    else {
      const s = X(e.handler) ? e.handler.bind(n) : t[e.handler];
      X(s) && be(o, s, e);
    }
}
function Ja(e) {
  const t = e.type, { mixins: n, extends: r } = t, {
    mixins: o,
    optionsCache: s,
    config: { optionMergeStrategies: l }
  } = e.appContext, u = s.get(t);
  let c;
  return u ? c = u : !o.length && !n && !r ? c = t : (c = {}, o.length && o.forEach(
    (d) => ho(c, d, l, !0)
  ), ho(c, t, l)), pe(t) && s.set(t, c), c;
}
function ho(e, t, n, r = !1) {
  const { mixins: o, extends: s } = t;
  s && ho(e, s, n, !0), o && o.forEach(
    (l) => ho(e, l, n, !0)
  );
  for (const l in t)
    if (!(r && l === "expose")) {
      const u = Ud[l] || n && n[l];
      e[l] = u ? u(e[l], t[l]) : t[l];
    }
  return e;
}
const Ud = {
  data: _l,
  props: Sl,
  emits: Sl,
  // objects
  methods: or,
  computed: or,
  // lifecycle
  beforeCreate: Fe,
  created: Fe,
  beforeMount: Fe,
  mounted: Fe,
  beforeUpdate: Fe,
  updated: Fe,
  beforeDestroy: Fe,
  beforeUnmount: Fe,
  destroyed: Fe,
  unmounted: Fe,
  activated: Fe,
  deactivated: Fe,
  errorCaptured: Fe,
  serverPrefetch: Fe,
  // assets
  components: or,
  directives: or,
  // watch
  watch: Gd,
  // provide / inject
  provide: _l,
  inject: qd
};
function _l(e, t) {
  return t ? e ? function() {
    return Te(
      X(e) ? e.call(this, this) : e,
      X(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function qd(e, t) {
  return or(Ws(e), Ws(t));
}
function Ws(e) {
  if (G(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Fe(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function or(e, t) {
  return e ? Te(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Sl(e, t) {
  return e ? G(e) && G(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Te(
    /* @__PURE__ */ Object.create(null),
    wl(e),
    wl(t ?? {})
  ) : t;
}
function Gd(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Te(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = Fe(e[r], t[r]);
  return n;
}
function Qa() {
  return {
    app: null,
    config: {
      isNativeTag: pa,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let Xd = 0;
function Yd(e, t) {
  return function(r, o = null) {
    X(r) || (r = Te({}, r)), o != null && !pe(o) && (o = null);
    const s = Qa(), l = /* @__PURE__ */ new WeakSet(), u = [];
    let c = !1;
    const d = s.app = {
      _uid: Xd++,
      _component: r,
      _props: o,
      _container: null,
      _context: s,
      _instance: null,
      version: Eg,
      get config() {
        return s.config;
      },
      set config(g) {
      },
      use(g, ...h) {
        return l.has(g) || (g && X(g.install) ? (l.add(g), g.install(d, ...h)) : X(g) && (l.add(g), g(d, ...h))), d;
      },
      mixin(g) {
        return s.mixins.includes(g) || s.mixins.push(g), d;
      },
      component(g, h) {
        return h ? (s.components[g] = h, d) : s.components[g];
      },
      directive(g, h) {
        return h ? (s.directives[g] = h, d) : s.directives[g];
      },
      mount(g, h, y) {
        if (!c) {
          const w = d._ceVNode || Mt(r, o);
          return w.appContext = s, y === !0 ? y = "svg" : y === !1 && (y = void 0), e(w, g, y), c = !0, d._container = g, g.__vue_app__ = d, wi(w.component);
        }
      },
      onUnmount(g) {
        u.push(g);
      },
      unmount() {
        c && (ot(
          u,
          d._instance,
          16
        ), e(null, d._container), delete d._container.__vue_app__);
      },
      provide(g, h) {
        return s.provides[g] = h, d;
      },
      runWithContext(g) {
        const h = On;
        On = d;
        try {
          return g();
        } finally {
          On = h;
        }
      }
    };
    return d;
  };
}
let On = null;
const Zd = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${tt(t)}Modifiers`] || e[`${ln(t)}Modifiers`];
function Jd(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || ye;
  let o = n;
  const s = t.startsWith("update:"), l = s && Zd(r, t.slice(7));
  l && (l.trim && (o = n.map((g) => Se(g) ? g.trim() : g)), l.number && (o = o.map(Kf)));
  let u, c = r[u = ys(t)] || // also try camelCase event handler (#2249)
  r[u = ys(tt(t))];
  !c && s && (c = r[u = ys(ln(t))]), c && ot(
    c,
    e,
    6,
    o
  );
  const d = r[u + "Once"];
  if (d) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[u])
      return;
    e.emitted[u] = !0, ot(
      d,
      e,
      6,
      o
    );
  }
}
const Qd = /* @__PURE__ */ new WeakMap();
function eu(e, t, n = !1) {
  const r = n ? Qd : t.emitsCache, o = r.get(e);
  if (o !== void 0)
    return o;
  const s = e.emits;
  let l = {}, u = !1;
  if (!X(e)) {
    const c = (d) => {
      const g = eu(d, t, !0);
      g && (u = !0, Te(l, g));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !s && !u ? (pe(e) && r.set(e, null), null) : (G(s) ? s.forEach((c) => l[c] = null) : Te(l, s), pe(e) && r.set(e, l), l);
}
function Do(e, t) {
  return !e || !xo(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), ue(e, t[0].toLowerCase() + t.slice(1)) || ue(e, ln(t)) || ue(e, t));
}
function xl(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: o,
    propsOptions: [s],
    slots: l,
    attrs: u,
    emit: c,
    render: d,
    renderCache: g,
    props: h,
    data: y,
    setupState: w,
    ctx: O,
    inheritAttrs: x
  } = e, A = go(e);
  let K, S;
  try {
    if (n.shapeFlag & 4) {
      const _ = o || r, P = _;
      K = ct(
        d.call(
          P,
          _,
          g,
          h,
          w,
          y,
          O
        )
      ), S = u;
    } else {
      const _ = t;
      K = ct(
        _.length > 1 ? _(
          h,
          { attrs: u, slots: l, emit: c }
        ) : _(
          h,
          null
        )
      ), S = t.props ? u : eg(u);
    }
  } catch (_) {
    nn.length = 0, Oo(_, e, 1), K = Mt(Ot);
  }
  let j = K;
  if (S && x !== !1) {
    const _ = Object.keys(S), { shapeFlag: P } = j;
    _.length && P & 7 && (s && _.some(Ro) && (S = tg(
      S,
      s
    )), j = Dn(j, S, !1, !0));
  }
  if (n.dirs && (j = Dn(j, null, !1, !0), j.dirs = j.dirs ? j.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const _ = ko(j.type) && qa(j) || j;
    hi(_, n.transition);
  }
  return K = j, go(A), K;
}
const eg = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || xo(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, tg = (e, t) => {
  const n = {};
  for (const r in e)
    (!Ro(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
  return n;
};
function ng(e, t, n) {
  const { props: r, children: o, component: s } = e, { props: l, children: u, patchFlag: c } = t, d = s.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return r ? Rl(r, l, d) : !!l;
    if (c & 8) {
      const g = t.dynamicProps;
      for (let h = 0; h < g.length; h++) {
        const y = g[h];
        if (tu(l, r, y) && !Do(d, y))
          return !0;
      }
    }
  } else
    return (o || u) && (!u || !u.$stable) ? !0 : r === l ? !1 : r ? l ? Rl(r, l, d) : !0 : !!l;
  return !1;
}
function Rl(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < r.length; o++) {
    const s = r[o];
    if (tu(t, e, s) && !Do(n, s))
      return !0;
  }
  return !1;
}
function tu(e, t, n) {
  const r = e[n], o = t[n];
  return n === "style" && pe(r) && pe(o) ? !Io(r, o) : r !== o;
}
function rg({ vnode: e, parent: t, suspense: n }, r) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.suspense.vnode.el = o.el = r, e = o), o === e)
      (e = t.vnode).el = r, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = r);
}
const nu = {}, ru = () => Object.create(nu), ou = (e) => Object.getPrototypeOf(e) === nu;
function og(e, t, n, r = !1) {
  const o = {}, s = ru();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), su(e, t, o, s);
  for (const l in e.propsOptions[0])
    l in o || (o[l] = void 0);
  n ? e.props = r ? o : /* @__PURE__ */ gd(o) : e.type.props ? e.props = o : e.props = s, e.attrs = s;
}
function sg(e, t, n, r) {
  const {
    props: o,
    attrs: s,
    vnode: { patchFlag: l }
  } = e, u = /* @__PURE__ */ ae(o), [c] = e.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (r || l > 0) && !(l & 16)
  ) {
    if (l & 8) {
      const g = e.vnode.dynamicProps;
      for (let h = 0; h < g.length; h++) {
        let y = g[h];
        if (Do(e.emitsOptions, y))
          continue;
        const w = t[y];
        if (c)
          if (ue(s, y))
            w !== s[y] && (s[y] = w, d = !0);
          else {
            const O = tt(y);
            o[O] = Us(
              c,
              u,
              O,
              w,
              e,
              !1
            );
          }
        else
          w !== s[y] && (s[y] = w, d = !0);
      }
    }
  } else {
    su(e, t, o, s) && (d = !0);
    let g;
    for (const h in u)
      (!t || // for camelCase
      !ue(t, h) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((g = ln(h)) === h || !ue(t, g))) && (c ? n && // for camelCase
      (n[h] !== void 0 || // for kebab-case
      n[g] !== void 0) && (o[h] = Us(
        c,
        u,
        h,
        void 0,
        e,
        !0
      )) : delete o[h]);
    if (s !== u)
      for (const h in s)
        (!t || !ue(t, h)) && (delete s[h], d = !0);
  }
  d && Ct(e.attrs, "set", "");
}
function su(e, t, n, r) {
  const [o, s] = e.propsOptions;
  let l = !1, u;
  if (t)
    for (let c in t) {
      if (ir(c))
        continue;
      const d = t[c];
      let g;
      o && ue(o, g = tt(c)) ? !s || !s.includes(g) ? n[g] = d : (u || (u = {}))[g] = d : Do(e.emitsOptions, c) || (!(c in r) || d !== r[c]) && (r[c] = d, l = !0);
    }
  if (s) {
    const c = /* @__PURE__ */ ae(n), d = u || ye;
    for (let g = 0; g < s.length; g++) {
      const h = s[g];
      n[h] = Us(
        o,
        c,
        h,
        d[h],
        e,
        !ue(d, h)
      );
    }
  }
  return l;
}
function Us(e, t, n, r, o, s) {
  const l = e[n];
  if (l != null) {
    const u = ue(l, "default");
    if (u && r === void 0) {
      const c = l.default;
      if (l.type !== Function && !l.skipFactory && X(c)) {
        const { propsDefaults: d } = o;
        if (n in d)
          r = d[n];
        else {
          const g = Cr(o);
          r = d[n] = c.call(
            null,
            t
          ), g();
        }
      } else
        r = c;
      o.ce && o.ce._setProp(n, r);
    }
    l[
      0
      /* shouldCast */
    ] && (s && !u ? r = !1 : l[
      1
      /* shouldCastTrue */
    ] && (r === "" || r === ln(n)) && (r = !0));
  }
  return r;
}
const ig = /* @__PURE__ */ new WeakMap();
function iu(e, t, n = !1) {
  const r = n ? ig : t.propsCache, o = r.get(e);
  if (o)
    return o;
  const s = e.props, l = {}, u = [];
  let c = !1;
  if (!X(e)) {
    const g = (h) => {
      c = !0;
      const [y, w] = iu(h, t, !0);
      Te(l, y), w && u.push(...w);
    };
    !n && t.mixins.length && t.mixins.forEach(g), e.extends && g(e.extends), e.mixins && e.mixins.forEach(g);
  }
  if (!s && !c)
    return pe(e) && r.set(e, En), En;
  if (G(s))
    for (let g = 0; g < s.length; g++) {
      const h = tt(s[g]);
      Cl(h) && (l[h] = ye);
    }
  else if (s)
    for (const g in s) {
      const h = tt(g);
      if (Cl(h)) {
        const y = s[g], w = l[h] = G(y) || X(y) ? { type: y } : Te({}, y), O = w.type;
        let x = !1, A = !0;
        if (G(O))
          for (let K = 0; K < O.length; ++K) {
            const S = O[K], j = X(S) && S.name;
            if (j === "Boolean") {
              x = !0;
              break;
            } else j === "String" && (A = !1);
          }
        else
          x = X(O) && O.name === "Boolean";
        w[
          0
          /* shouldCast */
        ] = x, w[
          1
          /* shouldCastTrue */
        ] = A, (x || ue(w, "default")) && u.push(h);
      }
    }
  const d = [l, u];
  return pe(e) && r.set(e, d), d;
}
function Cl(e) {
  return e[0] !== "$" && !ir(e);
}
const mi = (e) => e === "_" || e === "_ctx" || e === "$stable", yi = (e) => G(e) ? e.map(ct) : [ct(e)], lg = (e, t, n) => {
  if (t._n)
    return t;
  const r = Cd((...o) => yi(t(...o)), n);
  return r._c = !1, r;
}, lu = (e, t, n) => {
  const r = e._ctx;
  for (const o in e) {
    if (mi(o)) continue;
    const s = e[o];
    if (X(s))
      t[o] = lg(o, s, r);
    else if (s != null) {
      const l = yi(s);
      t[o] = () => l;
    }
  }
}, au = (e, t) => {
  const n = yi(t);
  e.slots.default = () => n;
}, uu = (e, t, n) => {
  for (const r in t)
    (n || !mi(r)) && (e[r] = t[r]);
}, ag = (e, t, n) => {
  const r = e.slots = ru();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (uu(r, t, n), n && wa(r, "_", o, !0)) : lu(t, r);
  } else t && au(e, t);
}, ug = (e, t, n) => {
  const { vnode: r, slots: o } = e;
  let s = !0, l = ye;
  if (r.shapeFlag & 32) {
    const u = t._;
    u ? n && u === 1 ? s = !1 : uu(o, t, n) : (s = !t.$stable, lu(t, o)), l = t;
  } else t && (au(e, t), l = { default: 1 });
  if (s)
    for (const u in o)
      !mi(u) && l[u] == null && delete o[u];
}, Ve = pg;
function cg(e) {
  return fg(e);
}
function fg(e, t) {
  const n = Mo();
  n.__VUE__ = !0;
  const {
    insert: r,
    remove: o,
    patchProp: s,
    createElement: l,
    createText: u,
    createComment: c,
    setText: d,
    setElementText: g,
    parentNode: h,
    nextSibling: y,
    setScopeId: w = gt,
    insertStaticContent: O
  } = e, x = (p, m, b, E = null, M = null, R = null, T = void 0, D = null, k = !!m.dynamicChildren) => {
    if (p === m)
      return;
    p && !tr(p, m) && (E = Je(p), ve(p, M, R, !0), p = null), m.patchFlag === -2 && (k = !1, m.dynamicChildren = null);
    const { type: C, ref: B, shapeFlag: F } = m;
    switch (C) {
      case To:
        A(p, m, b, E);
        break;
      case Ot:
        K(p, m, b, E);
        break;
      case Is:
        p == null && S(m, b, E, T);
        break;
      case Ee:
        ce(
          p,
          m,
          b,
          E,
          M,
          R,
          T,
          D,
          k
        );
        break;
      default:
        F & 1 ? P(
          p,
          m,
          b,
          E,
          M,
          R,
          T,
          D,
          k
        ) : F & 6 ? te(
          p,
          m,
          b,
          E,
          M,
          R,
          T,
          D,
          k
        ) : (F & 64 || F & 128) && C.process(
          p,
          m,
          b,
          E,
          M,
          R,
          T,
          D,
          k,
          Wt
        );
    }
    B != null && M ? ur(B, p && p.ref, R, m || p, !m) : B == null && p && p.ref != null && ur(p.ref, null, R, p, !0);
  }, A = (p, m, b, E) => {
    if (p == null)
      r(
        m.el = u(m.children),
        b,
        E
      );
    else {
      const M = m.el = p.el;
      m.children !== p.children && d(M, m.children);
    }
  }, K = (p, m, b, E) => {
    p == null ? r(
      m.el = c(m.children || ""),
      b,
      E
    ) : m.el = p.el;
  }, S = (p, m, b, E) => {
    [p.el, p.anchor] = O(
      p.children,
      m,
      b,
      E,
      p.el,
      p.anchor
    );
  }, j = ({ el: p, anchor: m }, b, E) => {
    let M;
    for (; p && p !== m; )
      M = y(p), r(p, b, E), p = M;
    r(m, b, E);
  }, _ = ({ el: p, anchor: m }) => {
    let b;
    for (; p && p !== m; )
      b = y(p), o(p), p = b;
    o(m);
  }, P = (p, m, b, E, M, R, T, D, k) => {
    if (m.type === "svg" ? T = "svg" : m.type === "math" && (T = "mathml"), p == null)
      z(
        m,
        b,
        E,
        M,
        R,
        T,
        D,
        k
      );
    else {
      const C = p.el && p.el._isVueCE ? p.el : null;
      try {
        C && C._beginPatch(), H(
          p,
          m,
          M,
          R,
          T,
          D,
          k
        );
      } finally {
        C && C._endPatch();
      }
    }
  }, z = (p, m, b, E, M, R, T, D) => {
    let k, C;
    const { props: B, shapeFlag: F, transition: V, dirs: U } = p;
    if (k = p.el = l(
      p.type,
      R,
      B && B.is,
      B
    ), F & 8 ? g(k, p.children) : F & 16 && $(
      p.children,
      k,
      null,
      E,
      M,
      Ms(p, R),
      T,
      D
    ), U && Yt(p, null, E, "created"), Y(k, p, p.scopeId, T, E), B) {
      for (const de in B)
        de !== "value" && !ir(de) && s(k, de, null, B[de], R, E);
      "value" in B && s(k, "value", null, B.value, R), (C = B.onVnodeBeforeMount) && it(C, E, p);
    }
    U && Yt(p, null, E, "beforeMount");
    const J = dg(M, V);
    J && V.beforeEnter(k), r(k, m, b), ((C = B && B.onVnodeMounted) || J || U) && Ve(() => {
      try {
        C && it(C, E, p), J && V.enter(k), U && Yt(p, null, E, "mounted");
      } finally {
      }
    }, M);
  }, Y = (p, m, b, E, M) => {
    if (b && w(p, b), E)
      for (let R = 0; R < E.length; R++)
        w(p, E[R]);
    if (M) {
      let R = M.subTree;
      if (m === R || gu(R.type) && (R.ssContent === m || R.ssFallback === m)) {
        const T = M.vnode;
        Y(
          p,
          T,
          T.scopeId,
          T.slotScopeIds,
          M.parent
        );
      }
    }
  }, $ = (p, m, b, E, M, R, T, D, k = 0) => {
    for (let C = k; C < p.length; C++) {
      const B = p[C] = D ? Rt(p[C]) : ct(p[C]);
      x(
        null,
        B,
        m,
        b,
        E,
        M,
        R,
        T,
        D
      );
    }
  }, H = (p, m, b, E, M, R, T) => {
    const D = m.el = p.el;
    let { patchFlag: k, dynamicChildren: C, dirs: B } = m;
    k |= p.patchFlag & 16;
    const F = p.props || ye, V = m.props || ye;
    let U;
    if (b && Zt(b, !1), (U = V.onVnodeBeforeUpdate) && it(U, b, m, p), B && Yt(m, p, b, "beforeUpdate"), b && Zt(b, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    C && (!p.dynamicChildren || p.dynamicChildren.length !== C.length) && (k = 0, T = !1, C = null), (F.innerHTML && V.innerHTML == null || F.textContent && V.textContent == null) && g(D, ""), C ? W(
      p.dynamicChildren,
      C,
      D,
      b,
      E,
      Ms(m, M),
      R
    ) : T || ne(
      p,
      m,
      D,
      null,
      b,
      E,
      Ms(m, M),
      R,
      !1
    ), k > 0) {
      if (k & 16)
        ie(D, F, V, b, M);
      else if (k & 2 && F.class !== V.class && s(D, "class", null, V.class, M), k & 4 && s(D, "style", F.style, V.style, M), k & 8) {
        const J = m.dynamicProps;
        for (let de = 0; de < J.length; de++) {
          const le = J[de], _e = F[le], Ce = V[le];
          (Ce !== _e || le === "value") && s(D, le, _e, Ce, M, b);
        }
      }
      k & 1 && p.children !== m.children && g(D, m.children);
    } else !T && C == null && ie(D, F, V, b, M);
    ((U = V.onVnodeUpdated) || B) && Ve(() => {
      U && it(U, b, m, p), B && Yt(m, p, b, "updated");
    }, E);
  }, W = (p, m, b, E, M, R, T) => {
    for (let D = 0; D < m.length; D++) {
      const k = p[D], C = m[D], B = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        k.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (k.type === Ee || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !tr(k, C) || // - In the case of a component, it could contain anything.
        k.shapeFlag & 198) ? h(k.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          b
        )
      );
      x(
        k,
        C,
        B,
        null,
        E,
        M,
        R,
        T,
        !0
      );
    }
  }, ie = (p, m, b, E, M) => {
    if (m !== b) {
      if (m !== ye)
        for (const R in m)
          !ir(R) && !(R in b) && s(
            p,
            R,
            m[R],
            null,
            M,
            E
          );
      for (const R in b) {
        if (ir(R)) continue;
        const T = b[R], D = m[R];
        T !== D && R !== "value" && s(p, R, D, T, M, E);
      }
      "value" in b && s(p, "value", m.value, b.value, M);
    }
  }, ce = (p, m, b, E, M, R, T, D, k) => {
    const C = m.el = p ? p.el : u(""), B = m.anchor = p ? p.anchor : u("");
    let { patchFlag: F, dynamicChildren: V, slotScopeIds: U } = m;
    U && (D = D ? D.concat(U) : U), p == null ? (r(C, b, E), r(B, b, E), $(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      m.children || [],
      b,
      B,
      M,
      R,
      T,
      D,
      k
    )) : F > 0 && F & 64 && V && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    p.dynamicChildren && p.dynamicChildren.length === V.length ? (W(
      p.dynamicChildren,
      V,
      b,
      M,
      R,
      T,
      D
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (m.key != null || M && m === M.subTree) && cu(
      p,
      m,
      !0
      /* shallow */
    )) : ne(
      p,
      m,
      b,
      B,
      M,
      R,
      T,
      D,
      k
    );
  }, te = (p, m, b, E, M, R, T, D, k) => {
    m.slotScopeIds = D, p == null ? m.shapeFlag & 512 ? M.ctx.activate(
      m,
      b,
      E,
      T,
      k
    ) : we(
      m,
      b,
      E,
      M,
      R,
      T,
      k
    ) : xe(p, m, k);
  }, we = (p, m, b, E, M, R, T) => {
    const D = p.component = _g(
      p,
      E,
      M
    );
    if (vi(p) && (D.ctx.renderer = Wt), xg(D, !1, T), D.asyncDep) {
      if (M && M.registerDep(D, fe, T), !p.el) {
        const k = D.subTree = Mt(Ot);
        K(null, k, m, b), p.placeholder = k.el;
      }
    } else
      fe(
        D,
        p,
        m,
        b,
        M,
        R,
        T
      );
  }, xe = (p, m, b) => {
    const E = m.component = p.component;
    if (ng(p, m, b))
      if (E.asyncDep && !E.asyncResolved) {
        oe(E, m, b);
        return;
      } else
        E.next = m, E.update();
    else
      m.el = p.el, E.vnode = m;
  }, fe = (p, m, b, E, M, R, T) => {
    const D = () => {
      if (p.isMounted) {
        let { next: F, bu: V, u: U, parent: J, vnode: de } = p;
        {
          const Ne = fu(p);
          if (Ne) {
            F && (F.el = de.el, oe(p, F, T)), Ne.asyncDep.then(() => {
              Ve(() => {
                p.isUnmounted || C();
              }, M);
            });
            return;
          }
        }
        let le = F, _e;
        Zt(p, !1), F ? (F.el = de.el, oe(p, F, T)) : F = de, V && ws(V), (_e = F.props && F.props.onVnodeBeforeUpdate) && it(_e, J, F, de), Zt(p, !0);
        const Ce = xl(p), Oe = p.subTree;
        p.subTree = Ce, x(
          Oe,
          Ce,
          // parent may have changed if it's in a teleport
          h(Oe.el),
          // anchor may have changed if it's in a fragment
          Je(Oe),
          p,
          M,
          R
        ), F.el = Ce.el, le === null && rg(p, Ce.el), U && Ve(U, M), (_e = F.props && F.props.onVnodeUpdated) && Ve(
          () => it(_e, J, F, de),
          M
        );
      } else {
        let F;
        const { el: V, props: U } = m, { bm: J, m: de, parent: le, root: _e, type: Ce } = p, Oe = cr(m);
        Zt(p, !1), J && ws(J), !Oe && (F = U && U.onVnodeBeforeMount) && it(F, le, m), Zt(p, !0);
        {
          _e.ce && _e.ce._hasShadowRoot() && _e.ce._injectChildStyle(
            Ce,
            p.parent ? p.parent.type : void 0
          );
          const Ne = p.subTree = xl(p);
          x(
            null,
            Ne,
            b,
            E,
            p,
            M,
            R
          ), m.el = Ne.el;
        }
        if (de && Ve(de, M), !Oe && (F = U && U.onVnodeMounted)) {
          const Ne = m;
          Ve(
            () => it(F, le, Ne),
            M
          );
        }
        (m.shapeFlag & 256 || le && cr(le.vnode) && le.vnode.shapeFlag & 256) && p.a && Ve(p.a, M), p.isMounted = !0, m = b = E = null;
      }
    };
    p.scope.on();
    const k = p.effect = new Ra(D);
    p.scope.off();
    const C = p.update = k.run.bind(k), B = p.job = k.runIfDirty.bind(k);
    B.i = p, B.id = p.uid, k.scheduler = () => pi(B), Zt(p, !0), C();
  }, oe = (p, m, b) => {
    m.component = p;
    const E = p.vnode.props;
    p.vnode = m, p.next = null, sg(p, m.props, E, b), ug(p, m.children, b), It(), vl(p), Et();
  }, ne = (p, m, b, E, M, R, T, D, k = !1) => {
    const C = p && p.children, B = p ? p.shapeFlag : 0, F = m.children, { patchFlag: V, shapeFlag: U } = m;
    if (V > 0) {
      if (V & 128) {
        dn(
          C,
          F,
          b,
          E,
          M,
          R,
          T,
          D,
          k
        );
        return;
      } else if (V & 256) {
        Ze(
          C,
          F,
          b,
          E,
          M,
          R,
          T,
          D,
          k
        );
        return;
      }
    }
    U & 8 ? (B & 16 && Ae(C, M, R), F !== C && g(b, F)) : B & 16 ? U & 16 ? dn(
      C,
      F,
      b,
      E,
      M,
      R,
      T,
      D,
      k
    ) : Ae(C, M, R, !0) : (B & 8 && g(b, ""), U & 16 && $(
      F,
      b,
      E,
      M,
      R,
      T,
      D,
      k
    ));
  }, Ze = (p, m, b, E, M, R, T, D, k) => {
    p = p || En, m = m || En;
    const C = p.length, B = m.length, F = Math.min(C, B);
    let V;
    for (V = 0; V < F; V++) {
      const U = m[V] = k ? Rt(m[V]) : ct(m[V]);
      x(
        p[V],
        U,
        b,
        null,
        M,
        R,
        T,
        D,
        k
      );
    }
    C > B ? Ae(
      p,
      M,
      R,
      !0,
      !1,
      F
    ) : $(
      m,
      b,
      E,
      M,
      R,
      T,
      D,
      k,
      F
    );
  }, dn = (p, m, b, E, M, R, T, D, k) => {
    let C = 0;
    const B = m.length;
    let F = p.length - 1, V = B - 1;
    for (; C <= F && C <= V; ) {
      const U = p[C], J = m[C] = k ? Rt(m[C]) : ct(m[C]);
      if (tr(U, J))
        x(
          U,
          J,
          b,
          null,
          M,
          R,
          T,
          D,
          k
        );
      else
        break;
      C++;
    }
    for (; C <= F && C <= V; ) {
      const U = p[F], J = m[V] = k ? Rt(m[V]) : ct(m[V]);
      if (tr(U, J))
        x(
          U,
          J,
          b,
          null,
          M,
          R,
          T,
          D,
          k
        );
      else
        break;
      F--, V--;
    }
    if (C > F) {
      if (C <= V) {
        const U = V + 1, J = U < B ? m[U].el : E;
        for (; C <= V; )
          x(
            null,
            m[C] = k ? Rt(m[C]) : ct(m[C]),
            b,
            J,
            M,
            R,
            T,
            D,
            k
          ), C++;
      }
    } else if (C > V)
      for (; C <= F; )
        ve(p[C], M, R, !0), C++;
    else {
      const U = C, J = C, de = /* @__PURE__ */ new Map();
      for (C = J; C <= V; C++) {
        const ke = m[C] = k ? Rt(m[C]) : ct(m[C]);
        ke.key != null && de.set(ke.key, C);
      }
      let le, _e = 0;
      const Ce = V - J + 1;
      let Oe = !1, Ne = 0;
      const Tt = new Array(Ce);
      for (C = 0; C < Ce; C++) Tt[C] = 0;
      for (C = U; C <= F; C++) {
        const ke = p[C];
        if (_e >= Ce) {
          ve(ke, M, R, !0);
          continue;
        }
        let qe;
        if (ke.key != null)
          qe = de.get(ke.key);
        else
          for (le = J; le <= V; le++)
            if (Tt[le - J] === 0 && tr(ke, m[le])) {
              qe = le;
              break;
            }
        qe === void 0 ? ve(ke, M, R, !0) : (Tt[qe - J] = C + 1, qe >= Ne ? Ne = qe : Oe = !0, x(
          ke,
          m[qe],
          b,
          null,
          M,
          R,
          T,
          D,
          k
        ), _e++);
      }
      const Hn = Oe ? gg(Tt) : En;
      for (le = Hn.length - 1, C = Ce - 1; C >= 0; C--) {
        const ke = J + C, qe = m[ke], Ln = m[ke + 1], pn = ke + 1 < B ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Ln.el || du(Ln)
        ) : E;
        Tt[C] === 0 ? x(
          null,
          qe,
          b,
          pn,
          M,
          R,
          T,
          D,
          k
        ) : Oe && (le < 0 || C !== Hn[le] ? Be(qe, b, pn, 2) : le--);
      }
    }
  }, Be = (p, m, b, E, M = null) => {
    const { el: R, type: T, transition: D, children: k, shapeFlag: C } = p;
    if (C & 6) {
      Be(p.component.subTree, m, b, E);
      return;
    }
    if (C & 128) {
      p.suspense.move(m, b, E);
      return;
    }
    if (C & 64) {
      T.move(p, m, b, Wt);
      return;
    }
    if (T === Ee) {
      r(R, m, b);
      for (let F = 0; F < k.length; F++)
        Be(k[F], m, b, E);
      r(p.anchor, m, b);
      return;
    }
    if (T === Is) {
      j(p, m, b);
      return;
    }
    if (E !== 2 && C & 1 && D)
      if (E === 0)
        D.persisted && !R[Rs] ? r(R, m, b) : (D.beforeEnter(R), r(R, m, b), Ve(() => D.enter(R), M));
      else {
        const { leave: F, delayLeave: V, afterLeave: U } = D, J = () => {
          p.ctx.isUnmounted ? o(R) : r(R, m, b);
        }, de = () => {
          const le = R._isLeaving || !!R[Rs];
          R._isLeaving && R[Rs](
            !0
            /* cancelled */
          ), D.persisted && !le ? J() : F(R, () => {
            J(), U && U();
          });
        };
        V ? V(R, J, de) : de();
      }
    else
      r(R, m, b);
  }, ve = (p, m, b, E = !1, M = !1) => {
    const {
      type: R,
      props: T,
      ref: D,
      children: k,
      dynamicChildren: C,
      shapeFlag: B,
      patchFlag: F,
      dirs: V,
      cacheIndex: U,
      memo: J
    } = p;
    if (F === -2 && (M = !1), D != null && (It(), ur(D, null, b, p, !0), Et()), U != null && (m.renderCache[U] = void 0), B & 256) {
      m.ctx.deactivate(p);
      return;
    }
    const de = B & 1 && V, le = !cr(p);
    let _e;
    if (le && (_e = T && T.onVnodeBeforeUnmount) && it(_e, m, p), B & 6)
      kr(p.component, b, E);
    else {
      if (B & 128) {
        p.suspense.unmount(b, E);
        return;
      }
      de && Yt(p, null, m, "beforeUnmount"), B & 64 ? p.type.remove(
        p,
        m,
        b,
        Wt,
        E
      ) : C && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !C.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (R !== Ee || F > 0 && F & 64) ? Ae(
        C,
        m,
        b,
        !1,
        !0
      ) : (R === Ee && F & 384 || !M && B & 16) && Ae(k, m, b), E && gn(p);
    }
    const Ce = J != null && U == null;
    (le && (_e = T && T.onVnodeUnmounted) || de || Ce) && Ve(() => {
      _e && it(_e, m, p), de && Yt(p, null, m, "unmounted"), Ce && (p.el = null);
    }, b);
  }, gn = (p) => {
    const { type: m, el: b, anchor: E, transition: M } = p;
    if (m === Ee) {
      $t(b, E);
      return;
    }
    if (m === Is) {
      _(p);
      return;
    }
    const R = () => {
      o(b), M && !M.persisted && M.afterLeave && M.afterLeave();
    };
    if (p.shapeFlag & 1 && M && !M.persisted) {
      const { leave: T, delayLeave: D } = M, k = () => T(b, R);
      D ? D(p.el, R, k) : k();
    } else
      R();
  }, $t = (p, m) => {
    let b;
    for (; p !== m; )
      b = y(p), o(p), p = b;
    o(m);
  }, kr = (p, m, b) => {
    const { bum: E, scope: M, job: R, subTree: T, um: D, m: k, a: C } = p;
    Ml(k), Ml(C), E && ws(E), M.stop(), R && (R.flags |= 8, ve(T, p, m, b)), D && Ve(D, m), Ve(() => {
      p.isUnmounted = !0;
    }, m);
  }, Ae = (p, m, b, E = !1, M = !1, R = 0) => {
    for (let T = R; T < p.length; T++)
      ve(p[T], m, b, E, M);
  }, Je = (p) => {
    if (p.shapeFlag & 6)
      return Je(p.component.subTree);
    if (p.shapeFlag & 128)
      return p.suspense.next();
    const m = y(p.anchor || p.el), b = m && m[Od];
    return b ? y(b) : m;
  };
  let Dt = !1;
  const Pr = (p, m, b) => {
    let E;
    p == null ? m._vnode && (ve(m._vnode, null, null, !0), E = m._vnode.component) : x(
      m._vnode || null,
      p,
      m,
      null,
      null,
      null,
      b
    ), m._vnode = p, Dt || (Dt = !0, vl(E), Ba(), Dt = !1);
  }, Wt = {
    p: x,
    um: ve,
    m: Be,
    r: gn,
    mt: we,
    mc: $,
    pc: ne,
    pbc: W,
    n: Je,
    o: e
  };
  return {
    render: Pr,
    hydrate: void 0,
    createApp: Yd(Pr)
  };
}
function Ms({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Zt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function dg(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function cu(e, t, n = !1) {
  const r = e.children, o = t.children;
  if (G(r) && G(o))
    for (let s = 0; s < r.length; s++) {
      const l = r[s];
      let u = o[s];
      u.shapeFlag & 1 && !u.dynamicChildren && ((u.patchFlag <= 0 || u.patchFlag === 32) && (u = o[s] = Rt(o[s]), u.el = l.el), !n && u.patchFlag !== -2 && cu(l, u)), u.type === To && (u.patchFlag === -1 && (u = o[s] = Rt(u)), u.el = l.el), u.type === Ot && !u.el && (u.el = l.el);
    }
}
function gg(e) {
  const t = e.slice(), n = [0];
  let r, o, s, l, u;
  const c = e.length;
  for (r = 0; r < c; r++) {
    const d = e[r];
    if (d !== 0) {
      if (o = n[n.length - 1], e[o] < d) {
        t[r] = o, n.push(r);
        continue;
      }
      for (s = 0, l = n.length - 1; s < l; )
        u = s + l >> 1, e[n[u]] < d ? s = u + 1 : l = u;
      d < e[n[s]] && (s > 0 && (t[r] = n[s - 1]), n[s] = r);
    }
  }
  for (s = n.length, l = n[s - 1]; s-- > 0; )
    n[s] = l, l = t[l];
  return n;
}
function fu(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : fu(t);
}
function Ml(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function du(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? du(t.subTree) : null;
}
const gu = (e) => e.__isSuspense;
function pg(e, t) {
  t && t.pendingBranch ? G(e) ? t.effects.push(...e) : t.effects.push(e) : Rd(e);
}
const Ee = /* @__PURE__ */ Symbol.for("v-fgt"), To = /* @__PURE__ */ Symbol.for("v-txt"), Ot = /* @__PURE__ */ Symbol.for("v-cmt"), Is = /* @__PURE__ */ Symbol.for("v-stc"), nn = [];
let Ue = null;
function Z(e = !1) {
  nn.push(Ue = e ? null : []);
}
function pu() {
  nn.pop(), Ue = nn[nn.length - 1] || null;
}
let mr = 1;
function Il(e, t = !1) {
  mr += e, e < 0 && Ue && t && (Ue.hasOnce = !0);
}
function hu(e) {
  return e.dynamicChildren = mr > 0 ? Ue || En : null, pu(), mr > 0 && Ue && Ue.push(e), e;
}
function Q(e, t, n, r, o, s) {
  return hu(
    Me(
      e,
      t,
      n,
      r,
      o,
      s,
      !0
    )
  );
}
function hg(e, t, n, r, o) {
  return hu(
    Mt(
      e,
      t,
      n,
      r,
      o,
      !0
    )
  );
}
function vu(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function tr(e, t) {
  return e.type === t.type && e.key === t.key;
}
const mu = ({ key: e }) => e ?? null, io = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? Se(e) || /* @__PURE__ */ De(e) || X(e) ? { i: dt, r: e, k: t, f: !!n } : e : null);
function Me(e, t = null, n = null, r = 0, o = null, s = e === Ee ? 0 : 1, l = !1, u = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && mu(t),
    ref: t && io(t),
    scopeId: $a,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: s,
    patchFlag: r,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: dt
  };
  return u ? (vo(c, n), s & 128 && e.normalize(c)) : n && (c.shapeFlag |= Se(n) ? 8 : 16), mr > 0 && // avoid a block node from tracking itself
  !l && // has current parent block
  Ue && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && Ue.push(c), c;
}
const Mt = vg;
function vg(e, t = null, n = null, r = 0, o = null, s = !1) {
  if ((!e || e === Bd) && (e = Ot), vu(e)) {
    const u = Dn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && vo(u, n), mr > 0 && !s && Ue && (u.shapeFlag & 6 ? Ue[Ue.indexOf(e)] = u : Ue.push(u)), u.patchFlag = -2, u;
  }
  if (Ig(e) && (e = e.__vccOpts), t) {
    t = mg(t);
    let { class: u, style: c } = t;
    u && !Se(u) && (t.class = We(u)), pe(c) && (/* @__PURE__ */ gi(c) && !G(c) && (c = Te({}, c)), t.style = at(c));
  }
  const l = Se(e) ? 1 : gu(e) ? 128 : ko(e) ? 64 : pe(e) ? 4 : X(e) ? 2 : 0;
  return Me(
    e,
    t,
    n,
    r,
    o,
    l,
    s,
    !0
  );
}
function mg(e) {
  return e ? /* @__PURE__ */ gi(e) || ou(e) ? Te({}, e) : e : null;
}
function Dn(e, t, n = !1, r = !1) {
  const { props: o, ref: s, patchFlag: l, children: u, transition: c } = e, d = t ? yg(o || {}, t) : o, g = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && mu(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && s ? G(s) ? s.concat(io(t)) : [s, io(t)] : io(t)
    ) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: u,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Ee ? l === -1 ? 16 : l | 16 : l,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: c,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Dn(e.ssContent),
    ssFallback: e.ssFallback && Dn(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && r && hi(
    g,
    c.clone(g)
  ), g;
}
function qs(e = " ", t = 0) {
  return Mt(To, null, e, t);
}
function et(e = "", t = !1) {
  return t ? (Z(), hg(Ot, null, e)) : Mt(Ot, null, e);
}
function ct(e) {
  return e == null || typeof e == "boolean" ? Mt(Ot) : G(e) ? Mt(
    Ee,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : vu(e) ? Rt(e) : Mt(To, null, String(e));
}
function Rt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Dn(e);
}
function vo(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (G(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), vo(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !ou(t) ? t._ctx = dt : o === 3 && dt && (dt.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (X(t)) {
    if (r & 65) {
      vo(e, { default: t });
      return;
    }
    t = { default: t, _ctx: dt }, n = 32;
  } else
    t = String(t), r & 64 ? (n = 16, t = [qs(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function yg(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === "class")
        t.class !== r.class && (t.class = We([t.class, r.class]));
      else if (o === "style")
        t.style = at([t.style, r.style]);
      else if (xo(o)) {
        const s = t[o], l = r[o];
        l && s !== l && !(G(s) && s.includes(l)) ? t[o] = s ? [].concat(s, l) : l : l == null && s == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !Ro(o) && (t[o] = l);
      } else o !== "" && (t[o] = r[o]);
  }
  return t;
}
function it(e, t, n, r = null) {
  ot(e, t, 7, [
    n,
    r
  ]);
}
const wg = Qa();
let bg = 0;
function _g(e, t, n) {
  const r = e.type, o = (t ? t.appContext : e.appContext) || wg, s = {
    uid: bg++,
    vnode: e,
    type: r,
    parent: t,
    appContext: o,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new Gf(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(o.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: iu(r, o),
    emitsOptions: eu(r, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: ye,
    // inheritAttrs
    inheritAttrs: r.inheritAttrs,
    // state
    ctx: ye,
    data: ye,
    props: ye,
    attrs: ye,
    slots: ye,
    refs: ye,
    setupState: ye,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return s.ctx = { _: s }, s.root = t ? t.root : s, s.emit = Jd.bind(null, s), e.ce && e.ce(s), s;
}
let Le = null;
const Sg = () => Le || dt;
let mo, yr;
{
  const e = Mo(), t = (n, r) => {
    let o;
    return (o = e[n]) || (o = e[n] = []), o.push(r), (s) => {
      o.length > 1 ? o.forEach((l) => l(s)) : o[0](s);
    };
  };
  mo = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Le = n
  ), yr = t(
    "__VUE_SSR_SETTERS__",
    (n) => wr = n
  );
}
const Cr = (e) => {
  const t = Le;
  return mo(e), e.scope.on(), () => {
    e.scope.off(), mo(t);
  };
}, El = () => {
  Le && Le.scope.off(), mo(null);
};
function yu(e) {
  return e.vnode.shapeFlag & 4;
}
let wr = !1;
function xg(e, t = !1, n = !1) {
  t && yr(t);
  const { props: r, children: o } = e.vnode, s = yu(e);
  og(e, r, s, t), ag(e, o, n || t);
  const l = s ? Rg(e, t) : void 0;
  return t && yr(!1), l;
}
function Rg(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Nd);
  const { setup: r } = n;
  if (r) {
    It();
    const o = e.setupContext = r.length > 1 ? Mg(e) : null, s = Cr(e), l = Rr(
      r,
      e,
      0,
      [
        e.props,
        o
      ]
    ), u = ha(l);
    if (Et(), s(), (u || e.sp) && !cr(e) && Ga(e), u) {
      if (l.then(El, El), t)
        return l.then((c) => {
          yr(!0);
          try {
            Al(e, c, t);
          } finally {
            yr(!1);
          }
        }).catch((c) => {
          Oo(c, e, 0);
        });
      e.asyncDep = l;
    } else
      Al(e, l);
  } else
    wu(e);
}
function Al(e, t, n) {
  X(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : pe(t) && (e.setupState = za(t)), wu(e);
}
function wu(e, t, n) {
  const r = e.type;
  e.render || (e.render = r.render || gt);
  {
    const o = Cr(e);
    It();
    try {
      $d(e);
    } finally {
      Et(), o();
    }
  }
}
const Cg = {
  get(e, t) {
    return Pe(e, "get", ""), e[t];
  }
};
function Mg(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Cg),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function wi(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(za(pd(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in fr)
        return fr[n](e);
    },
    has(t, n) {
      return n in t || n in fr;
    }
  })) : e.proxy;
}
function Ig(e) {
  return X(e) && "__vccOpts" in e;
}
const N = (e, t) => /* @__PURE__ */ wd(e, t, wr), Eg = "3.5.42";
/**
* @vue/runtime-dom v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Gs;
const Ol = typeof window < "u" && window.trustedTypes;
if (Ol)
  try {
    Gs = /* @__PURE__ */ Ol.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const bu = Gs ? (e) => Gs.createHTML(e) : (e) => e, Ag = "http://www.w3.org/2000/svg", Og = "http://www.w3.org/1998/Math/MathML", xt = typeof document < "u" ? document : null, kl = xt && /* @__PURE__ */ xt.createElement("template"), kg = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const o = t === "svg" ? xt.createElementNS(Ag, e) : t === "mathml" ? xt.createElementNS(Og, e) : n ? xt.createElement(e, { is: n }) : xt.createElement(e);
    return e === "select" && r && r.multiple != null && o.setAttribute("multiple", r.multiple), o;
  },
  createText: (e) => xt.createTextNode(e),
  createComment: (e) => xt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => xt.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, r, o, s) {
    const l = n ? n.previousSibling : t.lastChild;
    if (o && (o === s || o.nextSibling))
      for (; t.insertBefore(o.cloneNode(!0), n), !(o === s || !(o = o.nextSibling)); )
        ;
    else {
      kl.innerHTML = bu(
        r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e
      );
      const u = kl.content;
      if (r === "svg" || r === "mathml") {
        const c = u.firstChild;
        for (; c.firstChild; )
          u.appendChild(c.firstChild);
        u.removeChild(c);
      }
      t.insertBefore(u, n);
    }
    return [
      // first
      l ? l.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, Pg = /* @__PURE__ */ Symbol("_vtc");
function Dg(e, t, n) {
  const r = e[Pg];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Pl = /* @__PURE__ */ Symbol("_vod"), Tg = /* @__PURE__ */ Symbol("_vsh"), Fg = /* @__PURE__ */ Symbol(""), Hg = /(?:^|;)\s*display\s*:/;
function Lg(e, t, n) {
  const r = e.style, o = Se(n);
  let s = !1;
  if (n && !o) {
    if (t)
      if (Se(t))
        for (const l of t.split(";")) {
          const u = l.slice(0, l.indexOf(":")).trim();
          n[u] == null && sr(r, u, "");
        }
      else
        for (const l in t)
          n[l] == null && sr(r, l, "");
    for (const l in n) {
      l === "display" && (s = !0);
      const u = n[l];
      u != null ? zg(
        e,
        l,
        !Se(t) && t ? t[l] : void 0,
        u
      ) || sr(r, l, u) : sr(r, l, "");
    }
  } else if (o) {
    if (t !== n) {
      const l = r[Fg];
      l && (n += ";" + l), r.cssText = n, s = Hg.test(n);
    }
  } else t && e.removeAttribute("style");
  Pl in e && (e[Pl] = s ? r.display : "", e[Tg] && (r.display = "none"));
}
const Jr = /\s*!important$/;
function sr(e, t, n) {
  if (G(n))
    n.forEach((r) => sr(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--"))
    Jr.test(n) ? e.setProperty(t, n.replace(Jr, ""), "important") : e.setProperty(t, n);
  else {
    const r = jg(e, t);
    Jr.test(n) ? e.setProperty(
      ln(r),
      n.replace(Jr, ""),
      "important"
    ) : e[r] = n;
  }
}
const Dl = ["Webkit", "Moz", "ms"], Es = {};
function jg(e, t) {
  const n = Es[t];
  if (n)
    return n;
  let r = tt(t);
  if (r !== "filter" && r in e)
    return Es[t] = r;
  r = ya(r);
  for (let o = 0; o < Dl.length; o++) {
    const s = Dl[o] + r;
    if (s in e)
      return Es[t] = s;
  }
  return t;
}
function zg(e, t, n, r) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && Se(r) && n === r;
}
const Tl = "http://www.w3.org/1999/xlink";
function Fl(e, t, n, r, o, s = Uf(t)) {
  r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Tl, t.slice(6, t.length)) : e.setAttributeNS(Tl, t, n) : n == null || s && !ba(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    s ? "" : pt(n) ? String(n) : n
  );
}
function Hl(e, t, n, r, o) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? bu(n) : n);
    return;
  }
  const s = e.tagName;
  if (t === "value" && s !== "PROGRESS" && // custom elements may use _value internally
  !s.includes("-")) {
    const u = s === "OPTION" ? e.getAttribute("value") || "" : e.value, c = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (u !== c || !("_value" in e)) && (e.value = c), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let l = !1;
  if (n === "" || n == null) {
    const u = typeof e[t];
    u === "boolean" ? n = ba(n) : n == null && u === "string" ? (n = "", l = !0) : u === "number" && (n = 0, l = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  l && e.removeAttribute(o || t);
}
function Kg(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function Vg(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const Ll = /* @__PURE__ */ Symbol("_vei");
function Bg(e, t, n, r, o = null) {
  const s = e[Ll] || (e[Ll] = {}), l = s[t];
  if (r && l)
    l.value = r;
  else {
    const [u, c] = Wg(t);
    if (r) {
      const d = s[t] = Gg(
        r,
        o
      );
      Kg(e, u, d, c);
    } else l && (Vg(e, u, l, c), s[t] = void 0);
  }
}
const Ng = /(Once|Passive|Capture)$/, $g = /^on:?(?:Once|Passive|Capture)$/;
function Wg(e) {
  let t, n;
  for (; (n = e.match(Ng)) && !$g.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : ln(e.slice(2)), t];
}
let As = 0;
const Ug = /* @__PURE__ */ Promise.resolve(), qg = () => As || (Ug.then(() => As = 0), As = Date.now());
function Gg(e, t) {
  const n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    const o = n.value;
    if (G(o)) {
      const s = r.stopImmediatePropagation;
      r.stopImmediatePropagation = () => {
        s.call(r), r._stopped = !0;
      };
      const l = o.slice(), u = [r];
      for (let c = 0; c < l.length && !r._stopped; c++) {
        const d = l[c];
        d && ot(
          d,
          t,
          5,
          u
        );
      }
    } else
      ot(
        o,
        t,
        5,
        [r]
      );
  };
  return n.value = e, n.attached = qg(), n;
}
const jl = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Xg = (e, t, n, r, o, s) => {
  const l = o === "svg";
  t === "class" ? Dg(e, r, l) : t === "style" ? Lg(e, n, r) : xo(t) ? Ro(t) || Bg(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Yg(e, t, r, l)) ? (Hl(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Fl(e, t, r, l, s, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Zg(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !Se(r))) ? Hl(e, tt(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), Fl(e, t, r, l));
};
function Yg(e, t, n, r) {
  if (r)
    return !!(t === "innerHTML" || t === "textContent" || t in e && jl(t) && X(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return jl(t) && Se(n) ? !1 : t in e;
}
function Zg(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const r = tt(t);
  return Array.isArray(n) ? n.some((o) => tt(o) === r) : Object.keys(n).some((o) => tt(o) === r);
}
const Jg = ["ctrl", "shift", "alt", "meta"], Qg = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => Jg.some((n) => e[`${n}Key`] && !t.includes(n))
}, $e = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), r = t.join(".");
  return n[r] || (n[r] = (o, ...s) => {
    for (let l = 0; l < t.length; l++) {
      const u = Qg[t[l]];
      if (u && u(o, t)) return;
    }
    return e(o, ...s);
  });
}, ep = /* @__PURE__ */ Te({ patchProp: Xg }, kg);
let zl;
function tp() {
  return zl || (zl = cg(ep));
}
const np = (...e) => {
  const t = tp().createApp(...e), { mount: n } = t;
  return t.mount = (r) => {
    const o = op(r);
    if (!o) return;
    const s = t._component;
    !X(s) && !s.render && !s.template && (s.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const l = n(o, !1, rp(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), l;
  }, t;
};
function rp(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function op(e) {
  return Se(e) ? document.querySelector(e) : e;
}
function Qr() {
  return !0;
}
const sp = Symbol("merge-proxy"), lo = Symbol("merge-proxy-sources"), ip = {
  get(e, t, n) {
    return t === sp ? n : t === lo ? e.sources : e.get(t);
  },
  has(e, t) {
    return e.has(t);
  },
  set: Qr,
  deleteProperty: Qr,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: Qr,
      deleteProperty: Qr
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function ao(e) {
  return e && typeof e == "object" && "value" in e ? e.value : e;
}
function Xs(...e) {
  const t = e.flatMap((n) => typeof n == "object" && n !== null && lo in n && Array.isArray(n[lo]) ? n[lo] : [n]);
  return new Proxy({
    sources: t,
    get(n) {
      for (let r = t.length - 1; r >= 0; r--) {
        const o = ao(t[r])[n];
        if (o !== void 0) return o;
      }
    },
    has(n) {
      for (let r = t.length - 1; r >= 0; r--) if (n in ao(t[r])) return !0;
      return !1;
    },
    keys() {
      const n = [];
      for (const r of t) n.push(...Object.keys(ao(r)));
      return [...Array.from(new Set(n))];
    }
  }, ip);
}
function Kl(...e) {
  const t = {};
  for (let n of e)
    if (n = ao(n), !!n)
      for (const r of Reflect.ownKeys(n)) {
        const o = n[r];
        o !== void 0 && (t[r] = o);
      }
  return t;
}
function _u(e) {
  return typeof e == "function" ? e : (t) => {
    var n;
    return (n = e.next) == null ? void 0 : n.call(e, t);
  };
}
function lp(e) {
  return Object.assign(e, {
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: be(e, _u(t), { flush: "sync" }) })
  });
}
function ap(e) {
  return Object.assign(e, {
    set: (t) => {
      e.value = typeof t == "function" ? t(e.value) : t;
    },
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: be(e, _u(t), { flush: "sync" }) })
  });
}
function up() {
  const e = /* @__PURE__ */ new Set();
  return {
    createOptionsStore: !0,
    wrapExternalAtoms: !0,
    addSubscription: (t) => {
      e.add(t);
    },
    unmount: () => {
      e.forEach((t) => t.unsubscribe()), e.clear();
    },
    schedule: (t) => queueMicrotask(() => t()),
    createReadonlyAtom: (t, n) => lp(N(() => t())),
    createWritableAtom: (t, n) => ap(/* @__PURE__ */ hd(t)),
    untrack: (t) => t(),
    batch: (t) => t()
  };
}
function Fo(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function ht(e) {
  if (Array.isArray(e)) return e.map(ht);
  if (e && typeof e == "object") {
    const t = Object.getPrototypeOf(e);
    if (t !== Object.prototype && t !== null) return e;
    const n = t === null ? se() : {}, r = Object.keys(e);
    for (let o = 0; o < r.length; o++) {
      const s = r[o];
      Object.defineProperty(n, s, {
        configurable: !0,
        enumerable: !0,
        value: ht(e[s]),
        writable: !0
      });
    }
    return n;
  }
  return e;
}
function Su(e, t) {
  const n = Object.keys(t), r = e;
  for (let o = 0; o < n.length; o++) {
    const s = n[o];
    !s.startsWith("_memo_") && s !== "_cellsCache" && (r[s] = t[s]);
  }
  return e;
}
function se() {
  return /* @__PURE__ */ Object.create(null);
}
function an(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Mr(e, t) {
  return (n) => {
    var r;
    (((r = t.options.atoms) == null ? void 0 : r[e]) ?? t.baseAtoms[e]).set((o) => Fo(n, o));
  };
}
function Vl(e) {
  if (typeof e != "object" || e === null) return !1;
  if (Array.isArray(e)) return !0;
  const t = Object.getPrototypeOf(e);
  return t === Object.prototype || t === null;
}
function Bl(e) {
  return Reflect.ownKeys(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
const cp = 3;
function fp(e, t) {
  return xu(e, t, cp);
}
function xu(e, t, n) {
  if (Object.is(e, t)) return !0;
  if (n <= 0 || !Vl(e) || !Vl(t) || (Array.isArray(e) || Array.isArray(t)) && (!Array.isArray(e) || !Array.isArray(t) || e.length !== t.length))
    return !1;
  const r = Bl(e), o = Bl(t);
  if (r.length !== o.length) return !1;
  const s = e, l = t;
  for (let u = 0; u < r.length; u++) {
    const c = r[u];
    if (!Object.prototype.propertyIsEnumerable.call(t, c) || !xu(s[c], l[c], n - 1)) return !1;
  }
  return !0;
}
function Ho(e, t, n, r = fp) {
  const o = `on${t.charAt(0).toUpperCase()}${t.slice(1)}Change`, s = e.options[o];
  s && s((l) => {
    const u = Fo(n, l);
    return r(l, u) ? l : u;
  });
}
function dp(e) {
  return e instanceof Function;
}
function gp(e, t) {
  const n = [], r = (o) => {
    o.forEach((s) => {
      n.push(s);
      const l = t(s);
      l.length && r(l);
    });
  };
  return r(e), n;
}
const pp = ({ fn: e, memoDeps: t, onAfterCompare: n, onAfterUpdate: r, onBeforeCompare: o, onBeforeUpdate: s }) => {
  let l = [], u;
  return (d) => {
    o == null || o();
    const g = t == null ? void 0 : t(d);
    let h = !g || g.length !== (l == null ? void 0 : l.length);
    if (!h && g) {
      for (let y = 0; y < g.length; y++) if (g[y] !== l[y]) {
        h = !0;
        break;
      }
    }
    return n == null || n(h), h && (l = g, s == null || s(), u = e(...g ?? []), r == null || r(u)), u;
  };
};
function Ru(e) {
  let t = !1;
  return () => {
    if (!t) {
      t = !0;
      return;
    }
    e();
  };
}
function Ir({ feature: e, fnName: t, objectId: n, onAfterUpdate: r, table: o, ...s }) {
  const l = () => {
    if (!r) return;
    const { schedule: c, untrack: d } = o._reactivity;
    c(() => d(() => r()));
  };
  return pp({
    ...s,
    ...{ onAfterUpdate: () => {
      l();
    } }
  });
}
function Cu(e, t = "_") {
  const [n, r] = e.split(t);
  return {
    fnKey: r,
    fnName: `${n}.${r}`,
    parentName: n
  };
}
function vt(e, t, n) {
  for (const [r, { fn: o, memoDeps: s }] of Object.entries(n)) {
    const { fnKey: l, fnName: u } = Cu(r);
    t[l] = s ? Ir({
      memoDeps: s,
      fn: o,
      fnName: u,
      table: t,
      feature: e
    }) : o;
  }
}
function st(e, t, n, r) {
  for (const [o, { fn: s, memoDeps: l }] of Object.entries(r)) {
    const { fnKey: u, fnName: c } = Cu(o);
    if (l) {
      const d = `_memo_${u}`;
      t[u] = function(...g) {
        if (!this[d]) {
          const h = this;
          this[d] = Ir({
            memoDeps: (y) => l(h, y),
            fn: (...y) => s(h, ...y),
            fnName: c,
            objectId: h.id,
            table: n,
            feature: e
          });
        }
        return this[d](...g);
      };
    } else t[u] = function(...d) {
      return s(this, ...d);
    };
  }
}
function ee(e, t, n, ...r) {
  var o;
  return ((o = e[t]) == null ? void 0 : o.call(e, ...r)) ?? n(e, ...r);
}
function hp(e) {
  return e.row.getValue(e.column.id);
}
function vp(e) {
  return e.getValue() ?? e.table.options.renderFallbackValue;
}
function mp(e) {
  return {
    table: e.table,
    column: e.column,
    row: e.row,
    cell: e,
    getValue: () => e.getValue(),
    renderValue: () => e.renderValue()
  };
}
const yp = { assignCellPrototype: (e, t) => {
  st("coreCellsFeature", e, t, {
    cell_getValue: { fn: (n) => hp(n) },
    cell_renderValue: { fn: (n) => vp(n) },
    cell_getContext: {
      fn: (n) => mp(n),
      memoDeps: (n) => [n]
    }
  });
} };
function wp(e) {
  var t, n;
  if (!e._headerPrototype) {
    e._headerPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignHeaderPrototype) == null || n.call(t, e._headerPrototype, e);
  }
  return e._headerPrototype;
}
function Mu(e, t, n) {
  const r = wp(e), o = Object.create(r);
  o.colSpan = 0, o.column = t, o.depth = n.depth, o.headerGroup = null, o.id = n.id ?? t.id, o.index = n.index, o.isPlaceholder = !!n.isPlaceholder, o.placeholderId = n.placeholderId, o.rowSpan = 0, o.subHeaders = [];
  const s = e._headerInstanceInitFns;
  for (let l = 0; l < s.length; l++) s[l](o);
  return o;
}
function un() {
  return {
    start: [],
    end: []
  };
}
function bp(e) {
  var s;
  const t = e.getAllColumns(), n = e.getAllLeafColumnsById(), { start: r } = ((s = e.atoms.columnPinning) == null ? void 0 : s.get()) ?? un(), o = [];
  for (let l = 0; l < r.length; l++) {
    const u = n[r[l]];
    u && ee(u, "getIsVisible", Ye) && o.push(u);
  }
  return br(t, o, e, "start");
}
function _p(e) {
  var s;
  const t = e.getAllColumns(), n = e.getAllLeafColumnsById(), { end: r } = ((s = e.atoms.columnPinning) == null ? void 0 : s.get()) ?? un(), o = [];
  for (let l = 0; l < r.length; l++) {
    const u = n[r[l]];
    u && ee(u, "getIsVisible", Ye) && o.push(u);
  }
  return br(t, o, e, "end");
}
function Sp(e) {
  var s;
  const t = e.getAllColumns();
  let n = ee(e, "getVisibleLeafColumns", bi);
  const { start: r, end: o } = ((s = e.atoms.columnPinning) == null ? void 0 : s.get()) ?? un();
  if (r.length || o.length) {
    const l = [...r, ...o];
    n = n.filter((u) => !l.includes(u.id));
  }
  return br(t, n, e, "center");
}
function xp(e) {
  var o;
  const { start: t } = ((o = e.atoms.columnPinning) == null ? void 0 : o.get()) ?? un(), n = e.getAllLeafColumnsById(), r = [];
  for (let s = 0; s < t.length; s++) {
    const l = n[t[s]];
    l && r.push(l);
  }
  return r;
}
function Rp(e) {
  var o;
  const { end: t } = ((o = e.atoms.columnPinning) == null ? void 0 : o.get()) ?? un(), n = e.getAllLeafColumnsById(), r = [];
  for (let s = 0; s < t.length; s++) {
    const l = n[t[s]];
    l && r.push(l);
  }
  return r;
}
function Cp(e) {
  var o;
  const { start: t, end: n } = ((o = e.atoms.columnPinning) == null ? void 0 : o.get()) ?? un();
  if (!t.length && !n.length) return e.getAllLeafColumns();
  const r = [...t, ...n];
  return e.getAllLeafColumns().filter((s) => !r.includes(s.id));
}
function Mp(e) {
  return ee(e, "getStartLeafColumns", xp).filter((t) => ee(t, "getIsVisible", Ye));
}
function Ip(e) {
  return ee(e, "getEndLeafColumns", Rp).filter((t) => ee(t, "getIsVisible", Ye));
}
function Ep(e) {
  return ee(e, "getCenterLeafColumns", Cp).filter((t) => ee(t, "getIsVisible", Ye));
}
function eo(e, t) {
  return t ? t === "start" ? ee(e, "getStartVisibleLeafColumns", Mp) : t === "end" ? ee(e, "getEndVisibleLeafColumns", Ip) : ee(e, "getCenterVisibleLeafColumns", Ep) : ee(e, "getVisibleLeafColumns", bi);
}
function Ye(e) {
  var r;
  const t = (r = e.table.atoms.columnVisibility) == null ? void 0 : r.get();
  if (!t) return !0;
  const n = e.columns;
  return n.length ? n.some((o) => ee(o, "getIsVisible", Ye)) : (an(t, e.id) ? t[e.id] : void 0) ?? !0;
}
function bi(e) {
  return e.getAllLeafColumns().filter((t) => ee(t, "getIsVisible", Ye));
}
function Iu(e, t = 1) {
  let n = t;
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    ee(o, "getIsVisible", Ye) && o.columns.length && (n = Math.max(n, Iu(o.columns, t + 1)));
  }
  return n;
}
function Ap(e, t) {
  return e ? `${e}_${t}` : String(t);
}
function Op(e, t, n, r) {
  let o = e ?? "";
  return t && (o = o ? `${o}_${t}` : String(t)), n && (o = o ? `${o}_${n}` : n), r && (o = o ? `${o}_${r}` : r), o;
}
function kp(e, t) {
  let n = 0;
  for (let r = 0; r < e.length; r++) e[r].column === t && n++;
  return n;
}
function Eu(e, t, n, r, o, s) {
  const l = {
    depth: t,
    id: Ap(r, t),
    headers: []
  }, u = [];
  for (let c = 0; c < e.length; c++) {
    if (!(c in e)) continue;
    const d = e[c], g = u[u.length - 1], h = d.column.depth === l.depth;
    let y, w = !1;
    if (h && d.column.parent ? y = d.column.parent : (y = d.column, w = !0), g && g.column === y) g.subHeaders.push(d);
    else {
      const O = Mu(n, y, {
        id: Op(r, t, y.id, d.id),
        isPlaceholder: w,
        placeholderId: w ? String(kp(u, y)) : void 0,
        depth: t,
        index: u.length
      });
      O.subHeaders.push(d), u.push(O);
    }
    l.headers.push(d), d.headerGroup = l;
  }
  for (let c = 0; c < s.length; c++) s[c](l);
  o.push(l), t > 0 && Eu(u, t - 1, n, r, o, s);
}
function Au(e) {
  for (let t = 0; t < e.length; t++) {
    const n = e[t];
    if (!ee(n.column, "getIsVisible", Ye)) continue;
    let r = 0;
    if (n.subHeaders.length) {
      Au(n.subHeaders);
      for (let o = 0; o < n.subHeaders.length; o++) {
        const s = n.subHeaders[o];
        ee(s.column, "getIsVisible", Ye) && (r += s.colSpan);
      }
    } else r = 1;
    if (n.colSpan = r, n.isPlaceholder && n.subHeaders.length === 1 && n.subHeaders[0].column === n.column) {
      let o = 1, s = n.subHeaders[0];
      for (; s; )
        s.rowSpan = 0, o++, s = s.subHeaders.length === 1 && s.subHeaders[0].column === n.column ? s.subHeaders[0] : void 0;
      n.rowSpan = o;
    } else n.rowSpan = 1;
  }
}
function br(e, t, n, r) {
  var c;
  const o = Iu(e), s = [], l = n._headerGroupInstanceInitFns, u = new Array(t.length);
  for (let d = 0; d < t.length; d++)
    d in t && (u[d] = Mu(n, t[d], {
      depth: o,
      index: d
    }));
  return Eu(u, o - 1, n, r, s, l), s.reverse(), Au(((c = s[0]) == null ? void 0 : c.headers) ?? []), s;
}
function Pp(e) {
  var t, n;
  if (!e._columnPrototype) {
    e._columnPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignColumnPrototype) == null || n.call(t, e._columnPrototype, e);
  }
  return e._columnPrototype;
}
function Dp(e, t, n, r) {
  const o = {
    ...e.getDefaultColumnDef(),
    ...t
  }, s = o.accessorKey, l = s === void 0 ? void 0 : String(s), u = o.id ?? (l == null ? void 0 : l.replaceAll(".", "_")) ?? (typeof o.header == "string" ? o.header : void 0);
  let c;
  if (o.accessorFn) c = o.accessorFn;
  else if (s !== void 0) if (typeof s == "string" && s.includes(".")) {
    const y = s.split(".");
    c = (w) => {
      let O = w;
      for (let x = 0; x < y.length; x++) {
        const A = y[x];
        O = O == null ? void 0 : O[A];
      }
      return O;
    };
  } else c = (y) => y[o.accessorKey];
  if (!u)
    throw new Error();
  const d = Pp(e), g = Object.create(d);
  g.accessorFn = c, g.columnDef = o, g.columns = [], g.depth = n, g.id = `${String(u)}`, g.parent = r;
  const h = e._columnInstanceInitFns;
  for (let y = 0; y < h.length; y++) h[y](g);
  return g;
}
function Ou(e) {
  var n;
  const t = (n = e.atoms.columnOrder) == null ? void 0 : n.get();
  return (r) => {
    let o = [];
    if (!(t != null && t.length)) o = r;
    else {
      const s = /* @__PURE__ */ new Map();
      for (let l = 0; l < r.length; l++) {
        const u = r[l];
        s.set(u.id, u);
      }
      for (let l = 0; l < t.length; l++) {
        const u = t[l], c = s.get(u);
        c && (o.push(c), s.delete(u));
      }
      for (let l = 0; l < r.length; l++) {
        const u = r[l];
        s.has(u.id) && o.push(u);
      }
    }
    return Tp(e, o);
  };
}
function Tp(e, t) {
  var u;
  const n = ((u = e.atoms.grouping) == null ? void 0 : u.get()) ?? [], { groupedColumnMode: r } = e.options;
  if (!n.length || !r) return t;
  const o = t.filter((c) => !n.includes(c.id));
  if (r === "remove") return o;
  const s = /* @__PURE__ */ new Map();
  for (let c = 0; c < t.length; c++) {
    const d = t[c];
    s.set(d.id, d);
  }
  const l = [];
  for (let c = 0; c < n.length; c++) {
    const d = s.get(n[c]);
    d && l.push(d);
  }
  return [...l, ...o];
}
function Fp(e) {
  return [e, ...e.columns.flatMap((t) => t.getFlatColumns())];
}
function Hp(e) {
  if (e.columns.length) {
    const t = e.columns.flatMap((n) => n.getLeafColumns());
    return ee(e.table, "getOrderColumns", Ou)(t);
  }
  return [e];
}
function Lp(e) {
  return {
    header: (t) => {
      const n = t.header.column.columnDef;
      return n.accessorKey ? n.accessorKey : n.accessorFn ? n.id : null;
    },
    cell: (t) => {
      var n, r;
      return ((r = (n = t.renderValue()) == null ? void 0 : n.toString) == null ? void 0 : r.call(n)) ?? null;
    },
    ...Object.values(e._features).reduce((t, n) => {
      var r;
      return Object.assign(t, (r = n.getDefaultColumnDef) == null ? void 0 : r.call(n));
    }, {}),
    ...e.options.defaultColumn
  };
}
function ku(e, t, n, r = 0) {
  const o = new Array(t.length);
  for (let s = 0; s < t.length; s++) {
    if (!(s in t)) continue;
    const l = t[s], u = Dp(e, l, r, n), c = l;
    u.columns = c.columns ? ku(e, c.columns, u, r + 1) : [], o[s] = u;
  }
  return o;
}
function jp(e) {
  return ku(e, e.options.columns);
}
function zp(e) {
  return e.getAllColumns().flatMap((t) => t.getFlatColumns());
}
function Kp(e) {
  const t = se(), n = e.getAllFlatColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function Vp(e) {
  const t = e.getAllColumns().flatMap((n) => n.getLeafColumns());
  return ee(e, "getOrderColumns", Ou)(t);
}
function Bp(e) {
  const t = se(), n = e.getAllLeafColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function Np(e, t) {
  return e.getAllFlatColumnsById()[t];
}
const $p = {
  assignColumnPrototype: (e, t) => {
    st("coreColumnsFeature", e, t, {
      column_getFlatColumns: {
        fn: (n) => Fp(n),
        memoDeps: (n) => [n.table.options.columns]
      },
      column_getLeafColumns: {
        fn: (n) => Hp(n),
        memoDeps: (n) => {
          var r, o;
          return [
            (r = n.table.atoms.columnOrder) == null ? void 0 : r.get(),
            (o = n.table.atoms.grouping) == null ? void 0 : o.get(),
            n.table.options.columns,
            n.table.options.groupedColumnMode
          ];
        }
      }
    });
  },
  constructTableAPIs: (e) => {
    vt("coreColumnsFeature", e, {
      table_getDefaultColumnDef: {
        fn: () => Lp(e),
        memoDeps: () => [e.options.defaultColumn]
      },
      table_getAllColumns: {
        fn: () => jp(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumns: {
        fn: () => zp(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumnsById: {
        fn: () => Kp(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllLeafColumns: {
        fn: () => Vp(e),
        memoDeps: () => {
          var t, n;
          return [
            (t = e.atoms.columnOrder) == null ? void 0 : t.get(),
            (n = e.atoms.grouping) == null ? void 0 : n.get(),
            e.options.columns,
            e.options.groupedColumnMode
          ];
        }
      },
      table_getAllLeafColumnsById: {
        fn: () => Bp(e),
        memoDeps: () => [e.getAllLeafColumns()]
      },
      table_getColumn: { fn: (t) => Np(e, t) }
    });
  }
};
function Pu(e, t) {
  for (let n = 0; n < e.subHeaders.length; n++) Pu(e.subHeaders[n], t);
  t.push(e);
}
function Wp(e) {
  const t = [];
  return Pu(e, t), t;
}
function Up(e) {
  return {
    column: e.column,
    header: e,
    table: e.column.table
  };
}
function qp(e) {
  var d;
  const { start: t, end: n } = ((d = e.atoms.columnPinning) == null ? void 0 : d.get()) ?? un(), r = e.getAllColumns(), o = ee(e, "getVisibleLeafColumns", bi);
  if (!t.length && !n.length) return br(r, o, e);
  const s = e.getAllLeafColumnsById(), l = [];
  for (let g = 0; g < t.length; g++) {
    const h = s[t[g]];
    h && ee(h, "getIsVisible", Ye) && l.push(h);
  }
  const u = [];
  for (let g = 0; g < n.length; g++) {
    const h = s[n[g]];
    h && ee(h, "getIsVisible", Ye) && u.push(h);
  }
  const c = o.filter((g) => !t.includes(g.id) && !n.includes(g.id));
  return br(r, [
    ...l,
    ...c,
    ...u
  ], e);
}
function Gp(e) {
  return [...e.getHeaderGroups()].reverse();
}
function Xp(e) {
  const t = e.getHeaderGroups(), n = [];
  for (let r = 0; r < t.length; r++) {
    const o = t[r].headers;
    for (let s = 0; s < o.length; s++) n.push(o[s]);
  }
  return n;
}
function Yp(e) {
  var r;
  const t = ((r = e.getHeaderGroups()[0]) == null ? void 0 : r.headers) ?? [], n = [];
  for (let o = 0; o < t.length; o++) {
    const s = t[o].getLeafHeaders();
    for (let l = 0; l < s.length; l++) n.push(s[l]);
  }
  return n;
}
const Zp = {
  assignHeaderPrototype: (e, t) => {
    st("coreHeadersFeature", e, t, {
      header_getLeafHeaders: {
        fn: (n) => Wp(n),
        memoDeps: (n) => [n.column.table.options.columns]
      },
      header_getContext: {
        fn: (n) => Up(n),
        memoDeps: (n) => [n.column.table.options.columns]
      }
    });
  },
  constructTableAPIs: (e) => {
    vt("coreHeadersFeature", e, {
      table_getHeaderGroups: {
        fn: () => qp(e),
        memoDeps: () => {
          var t, n, r, o;
          return [
            e.options.columns,
            (t = e.atoms.columnOrder) == null ? void 0 : t.get(),
            (n = e.atoms.grouping) == null ? void 0 : n.get(),
            (r = e.atoms.columnPinning) == null ? void 0 : r.get(),
            (o = e.atoms.columnVisibility) == null ? void 0 : o.get(),
            e.options.groupedColumnMode
          ];
        }
      },
      table_getFooterGroups: {
        fn: () => Gp(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getFlatHeaders: {
        fn: () => Xp(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getLeafHeaders: {
        fn: () => Yp(e),
        memoDeps: () => [e.getHeaderGroups()]
      }
    });
  }
};
function Jp(e) {
  var t, n;
  if (!e._rowPrototype) {
    e._rowPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignRowPrototype) == null || n.call(t, e._rowPrototype, e);
  }
  return e._rowPrototype;
}
const Qp = (e, t, n, r, o, s, l) => {
  const u = Jp(e), c = Object.create(u);
  c._displayIndexCache = -1, c._uniqueValuesCache = se(), c._valuesCache = se(), c.depth = o, c.id = t, c.index = r, c.original = n, c.parentId = l, c.subRows = [];
  const d = e._rowInstanceInitFns;
  for (let g = 0; g < d.length; g++) d[g](c);
  return c;
}, eh = /([0-9]+)/gm;
function Tn(e) {
  const t = Object.assign((n, r, o) => {
    let s = n.getValue(o), l = r.getValue(o);
    const u = t.resolveDataValue;
    return u && (s = u(s), l = u(l)), t.sort(s, l, n, r, o);
  }, e);
  return t;
}
const th = Tn({
  resolveDataValue: (e) => Lo(e).toLowerCase(),
  sort: (e, t) => Tu(e, t)
});
Tn({
  resolveDataValue: (e) => Lo(e),
  sort: (e, t) => Tu(e, t)
});
const nh = Tn({
  resolveDataValue: (e) => Lo(e).toLowerCase(),
  sort: (e, t) => _i(e, t)
});
Tn({
  resolveDataValue: (e) => Lo(e),
  sort: (e, t) => _i(e, t)
});
Tn({
  resolveDataValue: (e) => rh(e),
  sort: (e, t) => e > t ? 1 : e < t ? -1 : 0
});
const Du = Tn({ sort: (e, t) => _i(e, t) });
function _i(e, t) {
  return e === t ? 0 : e > t ? 1 : -1;
}
function rh(e) {
  return e instanceof Date ? e.getTime() : e;
}
function Lo(e) {
  return typeof e == "number" ? isNaN(e) || e === 1 / 0 || e === -1 / 0 ? "" : String(e) : typeof e == "string" ? e : "";
}
function Tu(e, t) {
  let n = 0, r = 0;
  const o = e.length, s = t.length;
  for (; n < o && r < s; ) {
    const l = yo(e.charCodeAt(n)), u = yo(t.charCodeAt(r)), c = Ys(e, n, l), d = Ys(t, r, u);
    if (!l && !u) {
      const h = oh(e, n, c, t, r, d);
      if (h) return h;
      n = c, r = d;
      continue;
    }
    if (l !== u) return l ? 1 : -1;
    const g = sh(e, n, c, t, r, d);
    if (g) return g;
    n = c, r = d;
  }
  return $l(e, n) - $l(t, r);
}
function yo(e) {
  return e >= 48 && e <= 57;
}
function Ys(e, t, n) {
  let r = t + 1;
  for (; r < e.length && yo(e.charCodeAt(r)) === n; ) r++;
  return r;
}
function oh(e, t, n, r, o, s) {
  const l = n - t, u = s - o, c = l < u ? l : u;
  for (let d = 0; d < c; d++) {
    const g = e.charCodeAt(t + d), h = r.charCodeAt(o + d);
    if (g > h) return 1;
    if (h > g) return -1;
  }
  return l > u ? 1 : u > l ? -1 : 0;
}
function sh(e, t, n, r, o, s) {
  let l = t;
  for (; l < n && e.charCodeAt(l) === 48; ) l++;
  let u = o;
  for (; u < s && r.charCodeAt(u) === 48; ) u++;
  const c = n - l, d = s - u;
  if (c === 0 && d === 0) return 0;
  if (c <= 15 && d <= 15) {
    const y = Nl(e, l, n), w = Nl(r, u, s);
    return y > w ? 1 : w > y ? -1 : 0;
  }
  const g = parseInt(e.slice(t, n), 10), h = parseInt(r.slice(o, s), 10);
  return g > h ? 1 : h > g ? -1 : 0;
}
function Nl(e, t, n) {
  let r = 0;
  for (let o = t; o < n; o++) r = r * 10 + e.charCodeAt(o) - 48;
  return r;
}
function $l(e, t) {
  let n = 0, r = t;
  for (; r < e.length; )
    n++, r = Ys(e, r, yo(e.charCodeAt(r)));
  return n;
}
function ih() {
  return [];
}
function lh(e, t) {
  Ho(e, "cellSelection", ht(e.initialState.cellSelection) ?? ih());
}
function ah(e) {
  e.atoms.cellSelection && (e.options.autoResetAll ?? e.options.autoResetCellSelection ?? !0) && e._reactivity.schedule(() => lh(e));
}
function uh() {
  return se();
}
function Fu(e) {
  e.atoms.expanded && (e.options.autoResetAll ?? e.options.autoResetExpanded ?? !e.options.manualExpanding) && e._reactivity.schedule(() => Lu(e));
}
function wo(e, t) {
  var n, r;
  (r = (n = e.options).onExpandedChange) == null || r.call(n, t);
}
function Hu(e, t) {
  var r;
  const n = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t ?? !zu(e)) {
    if (n === !0 || !ju(e)) return;
    wo(e, !0);
  } else {
    if (n !== !0 && !Object.keys(n).length) return;
    wo(e, se());
  }
}
function Lu(e, t) {
  const n = e.initialState.expanded;
  Ho(e, "expanded", t ? se() : n === !0 ? !0 : Object.assign(se(), ht(n ?? {})));
}
function ju(e) {
  return e.getPrePaginatedRowModel().flatRows.some((t) => on(t));
}
function ch(e) {
  return (t) => {
    Hu(e);
  };
}
function fh(e) {
  var n;
  const t = ((n = e.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return t === !0 || Object.values(t).some(Boolean);
}
function zu(e) {
  var r;
  const t = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t === !0) return !0;
  if (!Object.keys(t).length) return !1;
  const n = e.getRowModel().flatRows.filter((o) => on(o));
  return !(!n.length || n.some((o) => !jo(o)));
}
function dh(e) {
  var r;
  let t = 0;
  const n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return (n === !0 ? Object.values(e.getRowModel().rowsById).filter((o) => on(o)).map((o) => o.id) : Object.keys(n ?? {})).forEach((o) => {
    const s = o.split(".");
    t = Math.max(t, s.length);
  }), t;
}
function Ku(e, t) {
  var s;
  const n = ((s = e.table.atoms.expanded) == null ? void 0 : s.get()) ?? {}, r = n === !0 || Zs(n, e.id), o = t ?? !r;
  o !== r && (o && !on(e) || wo(e.table, (l) => {
    const u = l === !0 ? !0 : Zs(l, e.id);
    let c = se();
    if (l === !0 ? Object.values(e.table.getRowModel().rowsById).forEach((d) => {
      on(d) && (c[d.id] = !0);
    }) : c = Object.assign(se(), l), !u && o)
      return c[e.id] = !0, c;
    if (u && !o) {
      const d = se(), g = Object.keys(c);
      for (let h = 0; h < g.length; h++) {
        const y = g[h];
        y !== e.id && c[y] && (d[y] = !0);
      }
      return d;
    }
    return l;
  }));
}
function jo(e) {
  var n, r, o;
  const t = ((n = e.table.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return !!(((o = (r = e.table.options).getIsRowExpanded) == null ? void 0 : o.call(r, e)) ?? (t === !0 || Zs(t, e.id)));
}
function Zs(e, t) {
  return !!(e && e !== !0 && an(e, t) && e[t]);
}
function on(e) {
  var t, n;
  return ((n = (t = e.table.options).getRowCanExpand) == null ? void 0 : n.call(t, e)) ?? ((e.table.options.enableExpanding ?? !0) && !!e.subRows.length);
}
function gh(e) {
  let t = !0, n = e;
  for (; t && n.parentId; )
    n = e.table.getRow(n.parentId, !0), t = jo(n);
  return t;
}
function ph(e) {
  const t = on(e);
  return () => {
    t && Ku(e);
  };
}
const Js = 0;
function Vu(e) {
  var t, n;
  if (e.options.autoResetAll ?? e.options.autoResetPageIndex ?? !e.options.manualPagination) {
    if ((((n = (t = e.atoms.pagination) == null ? void 0 : t.get()) == null ? void 0 : n.pageIndex) ?? Js) === Js) return;
    mh(e);
  }
}
function hh(e, t) {
  Ho(e, "pagination", t);
}
function vh(e, t) {
  hh(e, (n) => {
    let r = Fo(t, n.pageIndex);
    const o = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
    return r = Math.max(0, Math.min(r, o)), {
      ...n,
      pageIndex: r
    };
  });
}
function mh(e, t) {
  vh(e, Js);
}
function yh() {
  return [];
}
function zo(e, t) {
  Ho(e, "sorting", t);
}
function Bu(e, t) {
  zo(e, t ? [] : ht(e.initialState.sorting ?? []));
}
function wh(e) {
  e.atoms.sorting && (e.options.autoResetAll ?? e.options.autoResetSorting ?? !1) && Bu(e);
}
function Nu(e) {
  const t = e.table._rowModelFns.sortFns, n = e.table.getFilteredRowModel().flatRows.slice(0, 10);
  let r, o = !1;
  for (let s = 0; s < n.length; s++) {
    const l = n[s].getValue(e.id);
    if (Object.prototype.toString.call(l) === "[object Date]") {
      r = "datetime";
      break;
    }
    if (typeof l == "string" && (o = !0, l.split(eh).length > 1)) {
      r = "alphanumeric";
      break;
    }
  }
  if (!r && o && (r = "text"), r) {
    let s = t == null ? void 0 : t[r];
    if (s || r === "alphanumeric" && (s = t == null ? void 0 : t.text), s) return s;
  }
  return Du;
}
function $u(e) {
  const t = e.table.getFilteredRowModel().flatRows.slice(0, 10);
  for (let n = 0; n < t.length; n++) {
    const r = t[n].getValue(e.id);
    if (r != null)
      return typeof r == "string" ? "asc" : "desc";
  }
  return "desc";
}
function Wu(e) {
  const t = e.table._rowModelFns.sortFns;
  return dp(e.columnDef.sortFn) ? e.columnDef.sortFn : e.columnDef.sortFn === "auto" ? Nu(e) : (t == null ? void 0 : t[e.columnDef.sortFn]) ?? Du;
}
function Uu(e, t, n) {
  const r = Gu(e, n && bo(e)), o = typeof t < "u";
  zo(e.table, (s) => {
    const l = s.findIndex((y) => y.id === e.id), u = l === -1 ? void 0 : s[l];
    let c = [], d;
    const g = o ? t : r === "desc", h = !!(s.length && bo(e) && n);
    return h ? u ? d = "toggle" : d = "add" : u ? d = "toggle" : d = "replace", d === "toggle" && (o || r || (d = "remove")), d === "add" ? (c = [...s, {
      id: e.id,
      desc: g
    }], c.splice(0, c.length - (e.table.options.maxMultiSortColCount ?? Number.MAX_SAFE_INTEGER))) : d === "toggle" ? c = h ? s.map((y) => y.id === e.id ? {
      ...y,
      desc: g
    } : y) : [{
      id: e.id,
      desc: g
    }] : d === "remove" ? c = h ? s.filter((y) => y.id !== e.id) : [] : c = [{
      id: e.id,
      desc: g
    }], c;
  });
}
function qu(e) {
  return e.columnDef.sortDescFirst ?? e.table.options.sortDescFirst ?? $u(e) === "desc" ? "desc" : "asc";
}
function Gu(e, t) {
  const n = qu(e), r = Xu(e);
  return r ? r !== n && (e.table.options.enableSortingRemoval ?? !0) && (!t || (e.table.options.enableMultiRemove ?? !0)) ? !1 : r === "desc" ? "asc" : "desc" : n;
}
function Si(e) {
  return (e.columnDef.enableSorting ?? !0) && (e.table.options.enableSorting ?? !0) && !!e.accessorFn;
}
function bo(e) {
  return e.columnDef.enableMultiSort ?? e.table.options.enableMultiSort ?? !!e.accessorFn;
}
function Xu(e) {
  var n, r;
  const t = (r = (n = e.table.atoms.sorting) == null ? void 0 : n.get()) == null ? void 0 : r.find((o) => o.id === e.id);
  return t ? t.desc ? "desc" : "asc" : !1;
}
function bh(e) {
  var t, n;
  return ((n = (t = e.table.atoms.sorting) == null ? void 0 : t.get()) == null ? void 0 : n.findIndex((r) => r.id === e.id)) ?? -1;
}
function _h(e) {
  zo(e.table, (t) => t.length ? t.filter((n) => n.id !== e.id) : []);
}
function Sh(e) {
  const t = Si(e);
  return (n) => {
    var r, o;
    t && Uu(e, void 0, bo(e) ? (o = (r = e.table.options).isMultiSortEvent) == null ? void 0 : o.call(r, n) : !1);
  };
}
function Yu() {
  return (e) => Ir({
    feature: "coreRowModelsFeature",
    table: e,
    fnName: "table.getCoreRowModel",
    memoDeps: () => [e.options.data],
    fn: () => xh(e, e.options.data),
    onAfterUpdate: Ru(() => {
      Fu(e), Vu(e), wh(e), ah(e);
    })
  });
}
function Zu(e, t, n, r = 0, o) {
  var l;
  const s = [];
  for (let u = 0; u < n.length; u++) {
    const c = n[u], d = Qp(e, e.getRowId(c, u, o), c, u, r, void 0, o == null ? void 0 : o.id);
    t.flatRows.push(d), t.rowsById[d.id] = d, s.push(d), e.options.getSubRows && (d.originalSubRows = e.options.getSubRows(c, u), (l = d.originalSubRows) != null && l.length && (d.subRows = Zu(e, t, d.originalSubRows, r + 1, d)));
  }
  return s;
}
function xh(e, t) {
  const n = {
    rows: [],
    flatRows: [],
    rowsById: se()
  };
  return n.rows = Zu(e, n, t), n;
}
function Rh(e) {
  var t, n;
  return e._rowModels.coreRowModel || (e._rowModels.coreRowModel = ((n = (t = e.options.features).coreRowModel) == null ? void 0 : n.call(t, e)) ?? Yu()(e)), e._rowModels.coreRowModel();
}
function Ch(e) {
  return e.getCoreRowModel();
}
function Mh(e) {
  var t, n;
  return e._rowModels.filteredRowModel || (e._rowModels.filteredRowModel = (n = (t = e.options.features).filteredRowModel) == null ? void 0 : n.call(t, e)), e.options.manualFiltering || !e._rowModels.filteredRowModel ? e.getPreFilteredRowModel() : e._rowModels.filteredRowModel();
}
function Ih(e) {
  return e.getFilteredRowModel();
}
function Eh(e) {
  var t, n;
  return e._rowModels.groupedRowModel || (e._rowModels.groupedRowModel = (n = (t = e.options.features).groupedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualGrouping || !e._rowModels.groupedRowModel ? e.getPreGroupedRowModel() : e._rowModels.groupedRowModel();
}
function Ah(e) {
  return e.getGroupedRowModel();
}
function Oh(e) {
  var t, n;
  return e._rowModels.sortedRowModel || (e._rowModels.sortedRowModel = (n = (t = e.options.features).sortedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualSorting || !e._rowModels.sortedRowModel ? e.getPreSortedRowModel() : e._rowModels.sortedRowModel();
}
function kh(e) {
  return e.getSortedRowModel();
}
function Ph(e) {
  var t, n;
  return e._rowModels.expandedRowModel || (e._rowModels.expandedRowModel = (n = (t = e.options.features).expandedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualExpanding || !e._rowModels.expandedRowModel ? e.getPreExpandedRowModel() : e._rowModels.expandedRowModel();
}
function Dh(e) {
  return e.getExpandedRowModel();
}
function Th(e) {
  var t, n;
  return e._rowModels.paginatedRowModel || (e._rowModels.paginatedRowModel = (n = (t = e.options.features).paginatedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualPagination || !e._rowModels.paginatedRowModel ? e.getPrePaginatedRowModel() : e._rowModels.paginatedRowModel();
}
function Fh(e) {
  return e.getPaginatedRowModel();
}
const Hh = { constructTableAPIs: (e) => {
  vt("coreRowModelsFeature", e, {
    table_getCoreRowModel: { fn: () => Rh(e) },
    table_getPreFilteredRowModel: { fn: () => Ch(e) },
    table_getFilteredRowModel: { fn: () => Mh(e) },
    table_getPreGroupedRowModel: { fn: () => Ih(e) },
    table_getGroupedRowModel: { fn: () => Eh(e) },
    table_getPreSortedRowModel: { fn: () => Ah(e) },
    table_getSortedRowModel: { fn: () => Oh(e) },
    table_getPreExpandedRowModel: { fn: () => kh(e) },
    table_getExpandedRowModel: { fn: () => Ph(e) },
    table_getPrePaginatedRowModel: { fn: () => Dh(e) },
    table_getPaginatedRowModel: { fn: () => Th(e) },
    table_getRowModel: { fn: () => Fh(e) }
  });
} };
function Lh(e) {
  var t, n;
  if (!e._cellPrototype) {
    e._cellPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignCellPrototype) == null || n.call(t, e._cellPrototype, e);
  }
  return e._cellPrototype;
}
function jh(e, t, n) {
  const r = Lh(n), o = Object.create(r);
  o.column = e, o.id = `${t.id}_${e.id}`, o.row = t;
  const s = n._cellInstanceInitFns;
  for (let l = 0; l < s.length; l++) s[l](o);
  return o;
}
function zh(e) {
  const t = e.table.getRowsInDisplayOrder(), n = e._displayIndexCache;
  return t[n] === e ? n : -1;
}
function Kh(e) {
  const t = e.getPrePaginatedRowModel().rows;
  if (e.options.paginateExpandedRows === !1) {
    const n = [], r = (o) => {
      var s;
      o._displayIndexCache = n.length, n.push(o), o.subRows.length && ((s = o.getIsExpanded) != null && s.call(o)) && o.subRows.forEach(r);
    };
    return t.forEach(r), n;
  }
  for (let n = 0; n < t.length; n++) t[n]._displayIndexCache = n;
  return t;
}
function Vh(e, t) {
  if (an(e._valuesCache, t)) return e._valuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return e._valuesCache[t] = n.accessorFn(e.original, e.index), e._valuesCache[t];
}
function Bh(e, t) {
  if (an(e._uniqueValuesCache, t)) return e._uniqueValuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return n.columnDef.getUniqueValues ? (e._uniqueValuesCache[t] = n.columnDef.getUniqueValues(e.original, e.index), e._uniqueValuesCache[t]) : (e._uniqueValuesCache[t] = [e.getValue(t)], e._uniqueValuesCache[t]);
}
function Nh(e, t) {
  return e.getValue(t) ?? e.table.options.renderFallbackValue;
}
function $h(e) {
  return gp(e.subRows, (t) => t.subRows);
}
function Wh(e) {
  const t = e.getCoreRowModel().flatRows;
  let n = 0;
  for (let r = 0; r < t.length; r++) n = Math.max(n, t[r].depth);
  return n;
}
function Uh(e) {
  if (e.parentId)
    return e.table.getCoreRowModel().rowsById[e.parentId] ?? e.table.getRow(e.parentId, !0);
}
function qh(e) {
  const t = [];
  let n = e;
  for (; ; ) {
    const r = n.getParentRow();
    if (!r) break;
    t.push(r), n = r;
  }
  return t.reverse();
}
function Gh(e) {
  const t = e.table.getAllLeafColumns();
  let n = e._cellsCache;
  n || (n = e._cellsCache = /* @__PURE__ */ new WeakMap());
  const r = new Array(t.length);
  for (let o = 0; o < t.length; o++) {
    const s = t[o];
    let l = n.get(s);
    l || (l = jh(s, e, e.table), n.set(s, l)), r[o] = l;
  }
  return r;
}
function Xh(e) {
  const t = se(), n = e.getAllCells();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.column.id] = o;
  }
  return t;
}
function Yh(e, t, n, r) {
  var o, s;
  return ((s = (o = t.options).getRowId) == null ? void 0 : s.call(o, e, n, r)) ?? (r ? `${r.id}.${n}` : String(n));
}
function Zh(e, t, n) {
  let r = (n ? e.getPrePaginatedRowModel() : e.getRowModel()).rowsById[t];
  if (!r && (r = e.getCoreRowModel().rowsById[t], !r))
    throw new Error();
  return r;
}
const Jh = {
  assignRowPrototype: (e, t) => {
    st("coreRowsFeature", e, t, {
      row_getDisplayIndex: { fn: (n) => zh(n) },
      row_getAllCellsByColumnId: {
        fn: (n) => Xh(n),
        memoDeps: (n) => [n.getAllCells()]
      },
      row_getAllCells: {
        fn: (n) => Gh(n),
        memoDeps: (n) => [n.table.getAllLeafColumns()]
      },
      row_getLeafRows: {
        fn: (n) => $h(n),
        memoDeps: (n) => [n.subRows]
      },
      row_getParentRow: { fn: (n) => Uh(n) },
      row_getParentRows: { fn: (n) => qh(n) },
      row_getUniqueValues: { fn: (n, r) => Bh(n, r) },
      row_getValue: { fn: (n, r) => Vh(n, r) },
      row_renderValue: { fn: (n, r) => Nh(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    vt("coreRowsFeature", e, {
      table_getRowsInDisplayOrder: {
        fn: () => Kh(e),
        memoDeps: () => {
          var t;
          return [
            e.getPrePaginatedRowModel().rows,
            e.options.paginateExpandedRows,
            e.options.paginateExpandedRows === !1 ? (t = e.atoms.expanded) == null ? void 0 : t.get() : void 0
          ];
        }
      },
      table_getRowId: { fn: (t, n, r) => Yh(t, e, n, r) },
      table_getRow: { fn: (t, n) => Zh(e, t, n) },
      table_getMaxSubRowDepth: {
        fn: () => Wh(e),
        memoDeps: () => [e.getCoreRowModel()]
      }
    });
  }
};
function Ju(e, t, n = (r, o) => r === o) {
  const r = t === void 0 ? e.options.state : t;
  e._reactivity.batch(() => {
    if (r) for (const o in r) {
      const s = e.baseAtoms[o];
      if (!s) continue;
      const l = r[o], u = l === void 0 ? e.initialState[o] : l;
      n(e._reactivity.untrack(() => s.get()), u) || s.set(() => u);
    }
  });
}
function Qh(e, t, n = (r, o) => r === o) {
  e._reactivity.batch(() => {
    var r, o;
    Ju(e, t, n), (o = (r = e._reactivity).commit) == null || o.call(r);
  });
}
function ev(e) {
  var r, o;
  const t = ht(e.initialState);
  e._reactivity.batch(() => {
    const s = Object.keys(t);
    for (let l = 0; l < s.length; l++) {
      const u = s[l];
      e.baseAtoms[u].set(t[u]);
    }
  });
  const n = Object.values(e._features);
  for (let s = 0; s < n.length; s++) (o = (r = n[s]).resetTableInstanceData) == null || o.call(r, e);
}
function tv(e, t) {
  const { features: n, atoms: r, initialState: o } = e.options;
  if (!e.options.mergeOptions) return {
    ...e.options,
    ...t,
    features: n,
    atoms: r,
    initialState: o
  };
  const s = e.options.mergeOptions(e.options, t), l = { ...Object.getOwnPropertyDescriptors(s) };
  return Object.defineProperties(Object.create(Object.getPrototypeOf(s)), {
    ...l,
    features: {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    },
    atoms: {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    },
    initialState: {
      value: o,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }
  });
}
function nv(e, t, n) {
  const r = tv(e, Fo(t, e.options));
  e.optionsStore ? e.optionsStore.set(() => r) : e.options = r, Qh(e, r.state ?? null);
}
const rv = { constructTableAPIs: (e) => {
  vt("coreTablesFeature", e, {
    table_reset: { fn: () => ev(e) },
    table_setOptions: { fn: (t) => nv(e, t) }
  });
} }, ov = {
  coreCellsFeature: yp,
  coreColumnsFeature: $p,
  coreHeadersFeature: Zp,
  coreRowModelsFeature: Hh,
  coreRowsFeature: Jh,
  coreTablesFeature: rv
};
function sv(e) {
  const t = e;
  return Object.defineProperty(e, "state", { get() {
    return e.get();
  } }), "set" in e && (t.setState = e.set.bind(e)), t;
}
function iv(e, t) {
  if (Object.is(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  if (e instanceof Map && t instanceof Map) {
    if (e.size !== t.size) return !1;
    for (const [r, o] of e) if (!t.has(r) || !Object.is(o, t.get(r))) return !1;
    return !0;
  }
  if (e instanceof Set && t instanceof Set) {
    if (e.size !== t.size) return !1;
    for (const r of e) if (!t.has(r)) return !1;
    return !0;
  }
  if (e instanceof Date && t instanceof Date)
    return e.getTime() === t.getTime();
  const n = Wl(e);
  if (n.length !== Wl(t).length) return !1;
  for (let r = 0; r < n.length; r++) if (!Object.prototype.hasOwnProperty.call(t, n[r]) || !Object.is(e[n[r]], t[n[r]])) return !1;
  return !0;
}
function Wl(e) {
  return Object.keys(e).concat(Object.getOwnPropertySymbols(e));
}
function lv(e, t = {}) {
  return Object.values(e).forEach((n) => {
    var r;
    t = ((r = n.getInitialState) == null ? void 0 : r.call(n, t)) ?? t;
  }), ht(t);
}
function av(e) {
  var z, Y;
  const t = e.features.coreReactivityFeature, { aggregationFns: n, columnMeta: r, coreRowModel: o, expandedRowModel: s, facetedMinMaxValues: l, facetedRowModel: u, facetedUniqueValues: c, filterFns: d, filterMeta: g, filteredRowModel: h, groupedRowModel: y, paginatedRowModel: w, sortFns: O, sortedRowModel: x, tableMeta: A, ...K } = e.features, S = {
    _cellInstanceInitFns: [],
    _columnInstanceInitFns: [],
    _features: {
      ...ov,
      ...K
    },
    _headerGroupInstanceInitFns: [],
    _headerInstanceInitFns: [],
    _reactivity: t,
    _rowInstanceInitFns: [],
    _rowModelFns: {
      aggregationFns: n,
      filterFns: d,
      sortFns: O
    },
    _rowModels: {},
    atoms: {},
    baseAtoms: {}
  }, j = Object.values(S._features), _ = {
    ...j.reduce(($, H) => {
      var W;
      return Object.assign($, (W = H.getDefaultTableOptions) == null ? void 0 : W.call(H, S));
    }, {}),
    ...e
  };
  if (t.wrapExternalAtoms && _.atoms) for (const [$, H] of Object.entries(_.atoms)) {
    const W = H, ie = t.createWritableAtom(W.get(), { debugName: `externalAtom/${$}` });
    _.atoms[$] = ie;
    let ce = !1;
    const te = W.subscribe((xe) => {
      ce || ie.set(xe);
    }), we = ie.subscribe((xe) => {
      ce = !0, W.set(xe), ce = !1;
    });
    t.addSubscription(te), t.addSubscription(we);
  }
  t.createOptionsStore ? (S.optionsStore = t.createWritableAtom(_, { debugName: "table/optionsStore" }), Object.defineProperty(S, "options", {
    configurable: !0,
    enumerable: !0,
    get() {
      return S.optionsStore.get();
    },
    set($) {
      S.optionsStore.set(() => $);
    }
  })) : S.options = _, S.initialState = lv(S._features, S.options.initialState);
  const P = Object.keys(S.initialState);
  for (let $ = 0; $ < P.length; $++) {
    const H = P[$];
    S.baseAtoms[H] = t.createWritableAtom(S.initialState[H], { debugName: `table/baseAtoms/${H}` }), S.atoms[H] = t.createReadonlyAtom(() => {
      var we;
      const W = S.options, ie = (we = W.atoms) == null ? void 0 : we[H], ce = ie ? ie.get() : S.baseAtoms[H].get();
      if (ie) return ce;
      const te = W.state;
      if (te && an(te, H)) {
        const xe = te[H];
        return xe === void 0 ? S.initialState[H] : xe;
      }
      return ce;
    }, { debugName: `table/atoms/${H}` });
  }
  Ju(S), S.store = sv(t.createReadonlyAtom(() => {
    const $ = {};
    for (let H = 0; H < P.length; H++) {
      const W = P[H];
      $[W] = S.atoms[W].get();
    }
    return $;
  }, {
    compare: iv,
    debugName: "table/store"
  }));
  for (let $ = 0; $ < j.length; $++) {
    const H = j[$];
    (z = H.initTableInstanceData) == null || z.call(H, S), H.initCellInstanceData && S._cellInstanceInitFns.push(H.initCellInstanceData.bind(H)), H.initColumnInstanceData && S._columnInstanceInitFns.push(H.initColumnInstanceData.bind(H)), H.initHeaderGroupInstanceData && S._headerGroupInstanceInitFns.push(H.initHeaderGroupInstanceData.bind(H)), H.initHeaderInstanceData && S._headerInstanceInitFns.push(H.initHeaderInstanceData.bind(H)), H.initRowInstanceData && S._rowInstanceInitFns.push(H.initRowInstanceData.bind(H)), (Y = H.constructTableAPIs) == null || Y.call(H, S);
  }
  return S;
}
function uv() {
  return se();
}
function Qu() {
  return {
    size: 150,
    minSize: 20,
    maxSize: Number.MAX_SAFE_INTEGER
  };
}
function Ko(e) {
  var o;
  const t = Qu(), n = (o = e.table.atoms.columnSizing) == null ? void 0 : o.get(), r = n && an(n, e.id) ? n[e.id] : void 0;
  return Math.min(Math.max(e.columnDef.minSize ?? t.minSize, r ?? e.columnDef.size ?? t.size), e.columnDef.maxSize ?? t.maxSize);
}
function to(e) {
  const t = se(), n = se(), r = new Array(e.length);
  let o = 0;
  for (let l = 0; l < e.length; l++) {
    const u = e[l], c = ee(u, "getSize", Ko);
    r[l] = c, t[u.id] = o, o += c;
  }
  let s = 0;
  for (let l = e.length - 1; l >= 0; l--)
    n[e[l].id] = s, s += r[l];
  return {
    starts: t,
    afters: n
  };
}
function xi(e) {
  return {
    all: to(eo(e)),
    center: to(eo(e, "center")),
    start: to(eo(e, "start")),
    end: to(eo(e, "end"))
  };
}
function ec(e) {
  return e === "start" ? "start" : e === "end" ? "end" : e === "center" ? "center" : "all";
}
function cv(e, t) {
  return ee(e.table, "getColumnOffsets", xi)[ec(t)].starts[e.id] ?? 0;
}
function fv(e, t) {
  return ee(e.table, "getColumnOffsets", xi)[ec(t)].afters[e.id] ?? 0;
}
function dv(e) {
  Vo(e.table, (t) => {
    const n = se(), r = Object.keys(t);
    for (let o = 0; o < r.length; o++) {
      const s = r[o];
      s !== e.id && (n[s] = t[s]);
    }
    return n;
  });
}
function tc(e) {
  if (!e.subHeaders.length) return Ko(e.column);
  let t = 0;
  for (let n = 0; n < e.subHeaders.length; n++) t += tc(e.subHeaders[n]);
  return t;
}
function cn(e) {
  return tc(e);
}
function nc(e) {
  var t;
  if (e.index > 0) {
    const n = (t = e.headerGroup) == null ? void 0 : t.headers[e.index - 1];
    if (n) return ee(n, "getStart", nc) + ee(n, "getSize", cn);
  }
  return 0;
}
function Vo(e, t) {
  var n, r;
  (r = (n = e.options).onColumnSizingChange) == null || r.call(n, t);
}
function gv(e, t) {
  Vo(e, t ? se() : Object.assign(se(), ht(e.initialState.columnSizing ?? {})));
}
function pv(e) {
  var t;
  return ((t = e.getHeaderGroups()[0]) == null ? void 0 : t.headers.reduce((n, r) => n + cn(r), 0)) ?? 0;
}
function hv(e) {
  var t;
  return ((t = ee(e, "getStartHeaderGroups", bp)[0]) == null ? void 0 : t.headers.reduce((n, r) => n + cn(r), 0)) ?? 0;
}
function vv(e) {
  var t;
  return ((t = ee(e, "getCenterHeaderGroups", Sp)[0]) == null ? void 0 : t.headers.reduce((n, r) => n + cn(r), 0)) ?? 0;
}
function mv(e) {
  var t;
  return ((t = ee(e, "getEndHeaderGroups", _p)[0]) == null ? void 0 : t.headers.reduce((n, r) => n + cn(r), 0)) ?? 0;
}
function Qs() {
  return {
    startOffset: null,
    startSize: null,
    deltaOffset: null,
    deltaPercentage: null,
    isResizingColumn: !1,
    columnSizingStart: []
  };
}
function rc(e) {
  return (e.columnDef.enableResizing ?? !0) && (e.table.options.enableColumnResizing ?? !0);
}
function yv(e) {
  var t, n;
  return ((n = (t = e.table.atoms.columnResizing) == null ? void 0 : t.get()) == null ? void 0 : n.isResizingColumn) === e.id;
}
function wv(e, t) {
  const n = e.table.getColumn(e.column.id), r = rc(n);
  return (o) => {
    if (!r || Os(o) && o.touches.length > 1)
      return;
    const s = cn(e), l = e.getLeafHeaders().map((P) => [P.column.id, Ko(P.column)]), u = Os(o) ? Math.round(o.touches[0].clientX) : o.clientX, c = se(), d = (P, z) => {
      if (typeof z != "number") return;
      const Y = n.table, $ = Y.options.columnResizeMode === "onChange" || P === "end";
      Y._reactivity.batch(() => {
        dr(Y, (H) => {
          const W = Y.options.columnResizeDirection === "rtl" ? -1 : 1, ie = (z - (H.startOffset ?? 0)) * W, ce = H.startSize ?? 0, te = Math.max(ce > 0 ? ie / ce : 0, -0.999999);
          if ($) {
            const we = H.columnSizingStart;
            for (let xe = 0; xe < we.length; xe++) {
              const fe = we[xe], oe = fe[1];
              c[fe[0]] = Math.round(Math.max(oe > 0 ? oe + oe * te : ie / we.length, 0) * 100) / 100;
            }
          }
          return {
            ...H,
            deltaOffset: ie,
            deltaPercentage: te
          };
        }), $ && Vo(Y, (H) => Object.assign(se(), H, c));
      });
    };
    let g = null, h = !1, y;
    const w = () => {
      h ? (h = !1, d("move", y), g = requestAnimationFrame(w)) : g = null;
    }, O = (P) => {
      if (y = P, typeof requestAnimationFrame != "function") {
        d("move", P);
        return;
      }
      if (g !== null) {
        h = !0;
        return;
      }
      d("move", P), g = requestAnimationFrame(w);
    }, x = (P) => {
      g !== null && (cancelAnimationFrame(g), g = null, h = !1), n.table._reactivity.batch(() => {
        d("end", P ?? y), dr(n.table, (z) => ({
          ...z,
          isResizingColumn: !1,
          startOffset: null,
          startSize: null,
          deltaOffset: null,
          deltaPercentage: null,
          columnSizingStart: []
        }));
      });
    }, A = t || (typeof document < "u" ? document : null), K = {
      moveHandler: (P) => O(P.clientX),
      upHandler: (P) => {
        A == null || A.removeEventListener("mousemove", K.moveHandler), A == null || A.removeEventListener("mouseup", K.upHandler), x(P.clientX);
      }
    }, S = {
      moveHandler: (P) => (P.cancelable && (P.preventDefault(), P.stopPropagation()), O(P.touches[0].clientX), !1),
      upHandler: (P) => {
        var z;
        j(), P.cancelable && (P.preventDefault(), P.stopPropagation()), x((z = P.touches[0]) == null ? void 0 : z.clientX);
      },
      cancelHandler: () => {
        j(), x();
      }
    }, j = () => {
      A == null || A.removeEventListener("touchmove", S.moveHandler), A == null || A.removeEventListener("touchend", S.upHandler), A == null || A.removeEventListener("touchcancel", S.cancelHandler);
    }, _ = _v() ? { passive: !1 } : !1;
    Os(o) ? (A == null || A.addEventListener("touchmove", S.moveHandler, _), A == null || A.addEventListener("touchend", S.upHandler, _), A == null || A.addEventListener("touchcancel", S.cancelHandler, _)) : (A == null || A.addEventListener("mousemove", K.moveHandler, _), A == null || A.addEventListener("mouseup", K.upHandler, _)), dr(n.table, (P) => ({
      ...P,
      startOffset: u,
      startSize: s,
      deltaOffset: 0,
      deltaPercentage: 0,
      columnSizingStart: l,
      isResizingColumn: n.id
    }));
  };
}
function dr(e, t) {
  var n, r;
  (r = (n = e.options).onColumnResizingChange) == null || r.call(n, t);
}
function bv(e, t) {
  dr(e, t ? Qs() : ht(e.initialState.columnResizing ?? Qs()));
}
let no = null;
function _v() {
  if (typeof no == "boolean") return no;
  let e = !1;
  try {
    const t = { get passive() {
      return e = !0, !1;
    } }, n = () => {
    };
    window.addEventListener("test", n, t), window.removeEventListener("test", n);
  } catch {
    e = !1;
  }
  return no = e, no;
}
function Os(e) {
  return e.type === "touchstart";
}
const Sv = {
  getInitialState: (e) => ({
    columnResizing: Qs(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    columnResizeMode: "onEnd",
    columnResizeDirection: "ltr",
    onColumnResizingChange: Mr("columnResizing", e)
  }),
  assignColumnPrototype: (e, t) => {
    st("columnResizingFeature", e, t, {
      column_getCanResize: { fn: (n) => rc(n) },
      column_getIsResizing: { fn: (n) => yv(n) }
    });
  },
  assignHeaderPrototype: (e, t) => {
    st("columnResizingFeature", e, t, { header_getResizeHandler: { fn: (n, r) => wv(n, r) } });
  },
  constructTableAPIs: (e) => {
    vt("columnResizingFeature", e, {
      table_setColumnResizing: { fn: (t) => dr(e, t) },
      table_resetHeaderSizeInfo: { fn: (t) => bv(e, t) }
    });
  }
}, xv = {
  getInitialState: (e) => ({
    columnSizing: uv(),
    ...e
  }),
  getDefaultColumnDef: () => Qu(),
  getDefaultTableOptions: (e) => ({ onColumnSizingChange: Mr("columnSizing", e) }),
  assignColumnPrototype: (e, t) => {
    st("columnSizingFeature", e, t, {
      column_getSize: {
        fn: (n) => Ko(n),
        memoDeps: (n) => {
          var r, o;
          return [t.options.columns, (o = (r = t.atoms.columnSizing) == null ? void 0 : r.get()) == null ? void 0 : o[n.id]];
        }
      },
      column_getStart: { fn: (n, r) => cv(n, r) },
      column_getAfter: { fn: (n, r) => fv(n, r) },
      column_resetSize: { fn: (n) => dv(n) }
    });
  },
  assignHeaderPrototype: (e, t) => {
    st("columnSizingFeature", e, t, {
      header_getSize: {
        fn: (n) => cn(n),
        memoDeps: (n) => {
          var r, o, s;
          return [t.options.columns, n.column.columns.length > 0 ? (r = t.atoms.columnSizing) == null ? void 0 : r.get() : (s = (o = t.atoms.columnSizing) == null ? void 0 : o.get()) == null ? void 0 : s[n.column.id]];
        }
      },
      header_getStart: {
        fn: (n) => nc(n),
        memoDeps: () => {
          var n, r, o, s, l;
          return [
            t.options.columns,
            (n = t.atoms.columnSizing) == null ? void 0 : n.get(),
            (r = t.atoms.columnOrder) == null ? void 0 : r.get(),
            (o = t.atoms.columnPinning) == null ? void 0 : o.get(),
            (s = t.atoms.columnVisibility) == null ? void 0 : s.get(),
            (l = t.atoms.grouping) == null ? void 0 : l.get(),
            t.options.groupedColumnMode
          ];
        }
      }
    });
  },
  constructTableAPIs: (e) => {
    vt("columnSizingFeature", e, {
      table_getColumnOffsets: {
        fn: () => xi(e),
        memoDeps: () => {
          var t, n, r, o, s;
          return [
            e.options.columns,
            (t = e.atoms.columnSizing) == null ? void 0 : t.get(),
            (n = e.atoms.columnOrder) == null ? void 0 : n.get(),
            (r = e.atoms.columnPinning) == null ? void 0 : r.get(),
            (o = e.atoms.columnVisibility) == null ? void 0 : o.get(),
            (s = e.atoms.grouping) == null ? void 0 : s.get(),
            e.options.groupedColumnMode
          ];
        }
      },
      table_setColumnSizing: { fn: (t) => Vo(e, t) },
      table_resetColumnSizing: { fn: (t) => gv(e, t) },
      table_getTotalSize: {
        fn: () => pv(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.columnSizing) == null ? void 0 : t.get(), e.getHeaderGroups()];
        }
      },
      table_getStartTotalSize: {
        fn: () => hv(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.columnSizing) == null ? void 0 : t.get(), e.getHeaderGroups()];
        }
      },
      table_getCenterTotalSize: {
        fn: () => vv(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.columnSizing) == null ? void 0 : t.get(), e.getHeaderGroups()];
        }
      },
      table_getEndTotalSize: {
        fn: () => mv(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.columnSizing) == null ? void 0 : t.get(), e.getHeaderGroups()];
        }
      }
    });
  }
}, Rv = {
  getInitialState: (e) => ({
    expanded: uh(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onExpandedChange: Mr("expanded", e),
    paginateExpandedRows: !0
  }),
  assignRowPrototype: (e, t) => {
    st("rowExpandingFeature", e, t, {
      row_toggleExpanded: { fn: (n, r) => Ku(n, r) },
      row_getIsExpanded: { fn: (n) => jo(n) },
      row_getCanExpand: { fn: (n) => on(n) },
      row_getIsAllParentsExpanded: { fn: (n) => gh(n) },
      row_getToggleExpandedHandler: { fn: (n) => ph(n) }
    });
  },
  constructTableAPIs: (e) => {
    vt("rowExpandingFeature", e, {
      table_autoResetExpanded: { fn: () => Fu(e) },
      table_setExpanded: { fn: (t) => wo(e, t) },
      table_toggleAllRowsExpanded: { fn: (t) => Hu(e, t) },
      table_resetExpanded: { fn: (t) => Lu(e, t) },
      table_getCanSomeRowsExpand: { fn: () => ju(e) },
      table_getToggleAllRowsExpandedHandler: { fn: () => ch(e) },
      table_getIsSomeRowsExpanded: { fn: () => fh(e) },
      table_getIsAllRowsExpanded: { fn: () => zu(e) },
      table_getExpandedDepth: { fn: () => dh(e) }
    });
  }
};
function Cv() {
  return se();
}
function Fn(e, t) {
  var n, r;
  (r = (n = e.options).onRowSelectionChange) == null || r.call(n, t);
}
function Mv(e, t) {
  e._lastSelectedRowId = null, Fn(e, t ? se() : Object.assign(se(), ht(e.initialState.rowSelection ?? {})));
}
function oc(e, t, n) {
  e._lastSelectedRowId = null, Fn(e, (r) => {
    if (t = typeof t < "u" ? t : !ee(e, "getIsAllRowsSelected", lc), n != null && n.deselectAll && !t) return se();
    const o = Object.assign(se(), r), s = e.getPreGroupedRowModel().flatRows;
    if (t) {
      const l = /* @__PURE__ */ new Map();
      s.forEach((u) => {
        _o(u, l) && (o[u.id] = !0);
      });
    } else s.forEach((l) => {
      kt(l) && delete o[l.id];
    });
    return o;
  });
}
function sc(e, t, n) {
  e._lastSelectedRowId = null, Fn(e, (r) => {
    const o = typeof t < "u" ? t : !ee(e, "getIsAllPageRowsSelected", ac);
    if (n != null && n.deselectAll && !o) return se();
    const s = Object.assign(se(), r);
    return e.getRowModel().rows.forEach((l) => {
      No(s, l.id, o, !0, e, !0);
    }), s;
  });
}
function Iv(e) {
  return e.getCoreRowModel();
}
function Ev(e) {
  const t = e.getCoreRowModel();
  return ee(e, "getIsSomeRowsSelected", Bo) ? Mi(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: se()
  };
}
function Av(e) {
  const t = e.getFilteredRowModel();
  return ee(e, "getIsSomeRowsSelected", Bo) ? Mi(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: se()
  };
}
function Ov(e) {
  const t = e.getSortedRowModel();
  return ee(e, "getIsSomeRowsSelected", Bo) ? Mi(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: se()
  };
}
function ic(e) {
  var t;
  return Object.keys(((t = e.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function lc(e) {
  var o;
  const t = e.getFilteredRowModel().flatRows, n = ((o = e.atoms.rowSelection) == null ? void 0 : o.get()) ?? {};
  let r = !!(t.length && Object.keys(n).length);
  if (r) {
    const s = /* @__PURE__ */ new Map();
    t.some((l) => !Er(l, n) && _o(l, s)) && (r = !1);
  }
  return r;
}
function ac(e) {
  var s;
  const t = e.getPaginatedRowModel().flatRows, n = ((s = e.atoms.rowSelection) == null ? void 0 : s.get()) ?? {}, r = /* @__PURE__ */ new Map();
  let o = !1;
  for (let l = 0; l < t.length; l++) {
    const u = t[l];
    if (Er(u, n))
      !o && _o(u, r) && (o = !0);
    else if (_o(u, r)) return !1;
  }
  return o;
}
function Bo(e) {
  return ee(e, "getSelectedRowIds", ic).length > 0;
}
function kv(e) {
  return e.getPaginatedRowModel().flatRows.filter((t) => kt(t)).some((t) => Ri(t) || ee(t, "getIsSomeSelected", cc));
}
function Pv(e) {
  return (t) => {
    oc(e, t.target.checked);
  };
}
function Dv(e) {
  return (t) => {
    sc(e, t.target.checked);
  };
}
function uc(e, t, n) {
  const r = Ri(e);
  Fn(e.table, (o) => {
    t = typeof t < "u" ? t : !r;
    const s = Object.assign(se(), o);
    return No(s, e.id, t, ((n == null ? void 0 : n.selectChildren) ?? !0) && rn(e), e.table), !t && (n != null && n.deselectParents) && fc(s, e), s;
  });
}
function Ri(e) {
  var t;
  return Er(e, ((t = e.table.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function cc(e) {
  return Ii(e) === "some";
}
function Tv(e) {
  return Ii(e) === "all";
}
function kt(e) {
  const t = e.table.options;
  return typeof t.enableRowSelection == "function" ? t.enableRowSelection(e) : t.enableRowSelection ?? !0;
}
function Ci(e) {
  const t = e.table.options;
  return typeof t.enableSubRowSelection == "function" ? t.enableSubRowSelection(e) : t.enableSubRowSelection ?? !0;
}
function rn(e) {
  const t = e.table.options;
  return typeof t.enableMultiRowSelection == "function" ? t.enableMultiRowSelection(e) : t.enableMultiRowSelection ?? !0;
}
function Fv(e, t) {
  const n = kt(e);
  return (r) => {
    var c, d;
    if (!n) return;
    const o = r, s = e.table, l = o.target.checked, u = s._lastSelectedRowId;
    (!(s.options.enableRowRangeSelection !== !1 && u !== null && rn(e) && (((d = (c = s.options).isRowRangeSelectionEvent) == null ? void 0 : d.call(c, r)) ?? !1)) || !Hv(e, u, l, t)) && uc(e, l, t), s._lastSelectedRowId = e.id;
  };
}
function Hv(e, t, n, r) {
  const o = (r == null ? void 0 : r.selectChildren) ?? !0, s = e.table, l = s.getRowsInDisplayOrder(), u = s.getPrePaginatedRowModel().rowsById[t] ?? s.getCoreRowModel().rowsById[t];
  if (!u) return !1;
  const c = u.getDisplayIndex(), d = e.getDisplayIndex(), g = l[c], h = l[d];
  if (c < 0 || d < 0 || c >= l.length || d >= l.length || (g == null ? void 0 : g.id) !== u.id || (h == null ? void 0 : h.id) !== e.id || !rn(u) || !rn(e)) return !1;
  const y = Math.min(c, d), w = Math.max(c, d);
  return Fn(s, (O) => {
    const x = Object.assign(se(), O);
    for (let A = y; A <= w; A++) {
      const K = l[A];
      !kt(K) || !rn(K) || (No(x, K.id, n, o, s), !n && (r != null && r.deselectParents) && fc(x, K));
    }
    return x;
  }), !0;
}
function No(e, t, n, r, o, s) {
  const l = o.getRow(t, !0);
  n ? (rn(l) || Object.keys(e).forEach((u) => delete e[u]), kt(l) && (e[t] = !0)) : (!s || kt(l)) && delete e[t], r && l.subRows.length && Ci(l) && l.subRows.forEach((u) => No(e, u.id, n, r, o, s));
}
function _o(e, t) {
  if (!kt(e)) return !1;
  const n = e.table;
  if (n.options.enableSubRowSelection === !0) return !0;
  const r = e.parentId;
  if (r === void 0) return !0;
  const o = t.get(r);
  if (o !== void 0) return o;
  const s = n.getCoreRowModel().rowsById, l = [];
  let u = !0, c = r;
  for (; c !== void 0; ) {
    const d = t.get(c);
    if (d !== void 0) {
      u = d;
      break;
    }
    l.push(c);
    const g = s[c] ?? n.getRow(c, !0);
    if (!Ci(g)) {
      u = !1;
      break;
    }
    c = g.parentId;
  }
  return l.forEach((d) => t.set(d, u)), u;
}
function fc(e, t) {
  const n = t.table.getCoreRowModel().rowsById;
  let r = t.parentId;
  for (; r !== void 0; )
    delete e[r], r = (n[r] ?? t.table.getRow(r, !0)).parentId;
}
function dc(e, t, n, r) {
  const o = [];
  for (let s = 0; s < e.length; s++) {
    const l = e[s], u = Er(l, t);
    if (u && (n.push(l), r[l.id] = l), l.subRows.length) {
      const c = dc(l.subRows, t, n, r);
      if (u) {
        const d = Object.create(Object.getPrototypeOf(l));
        Su(d, l), d.subRows = c, o.push(d);
      }
    } else u && o.push(l);
  }
  return o;
}
function Mi(e, t) {
  var s;
  const n = [], r = se(), o = ((s = t.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  return {
    rows: dc(e.rows, o, n, r),
    flatRows: n,
    rowsById: r
  };
}
function Er(e, t) {
  return !!(an(t, e.id) && t[e.id]);
}
function Ii(e) {
  var s;
  if (!e.subRows.length) return !1;
  const t = ((s = e.table.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  let n = !1, r = !0, o = !1;
  for (let l = 0; l < e.subRows.length; l++) {
    const u = e.subRows[l];
    if (n && !r) break;
    if (kt(u) && (o = !0, Er(u, t) ? n = !0 : r = !1), u.subRows.length) {
      const c = Ii(u);
      c === "all" ? (n = !0, o = !0) : c === "some" ? (n = !0, r = !1, o = !0) : r = !1;
    }
  }
  return o ? r ? "all" : n ? "some" : !1 : !1;
}
const Lv = {
  initTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  resetTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  getInitialState: (e) => ({
    rowSelection: Cv(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onRowSelectionChange: Mr("rowSelection", e),
    enableRowSelection: !0,
    enableMultiRowSelection: !0,
    enableRowRangeSelection: !0,
    enableSubRowSelection: !0,
    isRowRangeSelectionEvent: (t) => {
      var r;
      const n = t;
      return !!(n.shiftKey || (r = n.nativeEvent) != null && r.shiftKey);
    }
  }),
  assignRowPrototype: (e, t) => {
    st("rowSelectionFeature", e, t, {
      row_toggleSelected: { fn: (n, r, o) => uc(n, r, o) },
      row_getIsSelected: { fn: (n) => Ri(n) },
      row_getIsSomeSelected: {
        fn: (n) => cc(n),
        memoDeps: (n) => {
          var r;
          return [
            n.subRows,
            (r = n.table.atoms.rowSelection) == null ? void 0 : r.get(),
            n.table.options.enableRowSelection
          ];
        }
      },
      row_getIsAllSubRowsSelected: {
        fn: (n) => Tv(n),
        memoDeps: (n) => {
          var r;
          return [
            n.subRows,
            (r = n.table.atoms.rowSelection) == null ? void 0 : r.get(),
            n.table.options.enableRowSelection
          ];
        }
      },
      row_getCanSelect: { fn: (n) => kt(n) },
      row_getCanSelectSubRows: { fn: (n) => Ci(n) },
      row_getCanMultiSelect: { fn: (n) => rn(n) },
      row_getToggleSelectedHandler: { fn: (n, r) => Fv(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    vt("rowSelectionFeature", e, {
      table_setRowSelection: { fn: (t) => Fn(e, t) },
      table_resetRowSelection: { fn: (t) => Mv(e, t) },
      table_toggleAllRowsSelected: { fn: (t, n) => oc(e, t, n) },
      table_toggleAllPageRowsSelected: { fn: (t, n) => sc(e, t, n) },
      table_getPreSelectedRowModel: { fn: () => Iv(e) },
      table_getSelectedRowModel: {
        fn: () => Ev(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getCoreRowModel()];
        }
      },
      table_getFilteredSelectedRowModel: {
        fn: () => Av(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getFilteredRowModel()];
        }
      },
      table_getGroupedSelectedRowModel: {
        fn: () => Ov(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getSortedRowModel()];
        }
      },
      table_getSelectedRowIds: {
        fn: () => ic(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get()];
        }
      },
      table_getIsAllRowsSelected: {
        fn: () => lc(e),
        memoDeps: () => {
          var t;
          return [
            (t = e.atoms.rowSelection) == null ? void 0 : t.get(),
            e.getFilteredRowModel(),
            e.options.enableRowSelection,
            e.options.enableSubRowSelection
          ];
        }
      },
      table_getIsAllPageRowsSelected: {
        fn: () => ac(e),
        memoDeps: () => {
          var t;
          return [
            (t = e.atoms.rowSelection) == null ? void 0 : t.get(),
            e.getPaginatedRowModel(),
            e.options.enableRowSelection,
            e.options.enableSubRowSelection
          ];
        }
      },
      table_getIsSomeRowsSelected: {
        fn: () => Bo(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get()];
        }
      },
      table_getIsSomePageRowsSelected: {
        fn: () => kv(e),
        memoDeps: () => {
          var t;
          return [
            (t = e.atoms.rowSelection) == null ? void 0 : t.get(),
            e.getPaginatedRowModel(),
            e.options.enableRowSelection
          ];
        }
      },
      table_getToggleAllRowsSelectedHandler: { fn: () => Pv(e) },
      table_getToggleAllPageRowsSelectedHandler: { fn: () => Dv(e) }
    });
  }
}, jv = {
  getInitialState(e) {
    return {
      sorting: yh(),
      ...e
    };
  },
  getDefaultColumnDef() {
    return {
      sortFn: "auto",
      sortUndefined: 1
    };
  },
  getDefaultTableOptions(e) {
    return {
      autoResetSorting: !1,
      onSortingChange: Mr("sorting", e),
      isMultiSortEvent: (t) => t.shiftKey
    };
  },
  assignColumnPrototype(e, t) {
    st("rowSortingFeature", e, t, {
      column_getAutoSortFn: { fn: (n) => Nu(n) },
      column_getAutoSortDir: { fn: (n) => $u(n) },
      column_getSortFn: { fn: (n) => Wu(n) },
      column_toggleSorting: { fn: (n, r, o) => Uu(n, r, o) },
      column_getFirstSortDir: { fn: (n) => qu(n) },
      column_getNextSortingOrder: { fn: (n, r) => Gu(n, r) },
      column_getCanSort: { fn: (n) => Si(n) },
      column_getCanMultiSort: { fn: (n) => bo(n) },
      column_getIsSorted: { fn: (n) => Xu(n) },
      column_getSortIndex: { fn: (n) => bh(n) },
      column_clearSorting: { fn: (n) => _h(n) },
      column_getToggleSortingHandler: { fn: (n) => Sh(n) }
    });
  },
  constructTableAPIs(e) {
    vt("rowSortingFeature", e, {
      table_setSorting: { fn: (t) => zo(e, t) },
      table_resetSorting: { fn: (t) => Bu(e, t) }
    });
  }
};
function zv() {
  return (e) => {
    const t = e;
    return Ir({
      feature: "rowExpandingFeature",
      table: t,
      fnName: "table.getExpandedRowModel",
      memoDeps: () => {
        var n;
        return [
          (n = t.atoms.expanded) == null ? void 0 : n.get(),
          t.getPreExpandedRowModel(),
          t.options.paginateExpandedRows,
          t.options.manualPagination
        ];
      },
      fn: () => Kv(t)
    });
  };
}
function Kv(e) {
  var r;
  const t = e.getPreExpandedRowModel(), n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return !t.rows.length || n !== !0 && !Object.keys(n ?? {}).length || !e.options.paginateExpandedRows && !e.options.manualPagination ? t : Vv(t);
}
function Vv(e) {
  const t = [], n = (r) => {
    t.push(r), r.subRows.length && jo(r) && r.subRows.forEach(n);
  };
  return e.rows.forEach(n), {
    rows: t,
    flatRows: e.flatRows,
    rowsById: e.rowsById
  };
}
function Bv() {
  return (e) => {
    const t = e;
    return Ir({
      feature: "rowSortingFeature",
      table: t,
      fnName: "table.getSortedRowModel",
      memoDeps: () => {
        var n;
        return [(n = t.atoms.sorting) == null ? void 0 : n.get(), t.getPreSortedRowModel()];
      },
      fn: () => Nv(t),
      onAfterUpdate: Ru(() => Vu(t))
    });
  };
}
function Nv(e) {
  var c;
  const t = e.getPreSortedRowModel(), n = (c = e.atoms.sorting) == null ? void 0 : c.get();
  if (!t.rows.length || !(n != null && n.length)) return t;
  const r = [], o = n.filter((d) => {
    const g = e.getColumn(d.id);
    return g ? Si(g) : !1;
  });
  if (!o.length) return t;
  const s = [];
  for (let d = 0; d < o.length; d++) {
    const g = o[d], h = e.getColumn(g.id);
    h && s.push({
      id: g.id,
      desc: g.desc,
      sortUndefined: h.columnDef.sortUndefined,
      invertSorting: h.columnDef.invertSorting,
      sortFn: Wu(h)
    });
  }
  const l = (d, g) => {
    for (let h = 0; h < s.length; h++) {
      const y = s[h], w = y.sortUndefined, O = y.desc;
      let x = 0;
      if (w) {
        const A = d.getValue(y.id), K = g.getValue(y.id), S = A === void 0, j = K === void 0;
        if (S && j) continue;
        if (S || j) {
          if (w === "first") return S ? -1 : 1;
          if (w === "last") return S ? 1 : -1;
          x = S ? w : -w;
        }
      }
      if (x === 0 && (x = y.sortFn(d, g, y.id)), x !== 0)
        return O && (x *= -1), y.invertSorting && (x *= -1), x;
    }
    return d.index - g.index;
  }, u = (d) => {
    const g = d.slice();
    g.sort(l);
    let h = !1;
    for (let y = 0; y < g.length; y++) {
      const w = g[y];
      w !== d[y] && (h = !0);
      const O = r.length;
      if (r.push(w), w.subRows.length) {
        const x = u(w.subRows);
        if (x.changed) {
          const A = Object.create(Object.getPrototypeOf(w));
          Su(A, w), A.subRows = x.rows, g[y] = A, r[O] = A, h = !0;
        }
      }
    }
    return {
      rows: g,
      changed: h
    };
  };
  return {
    rows: u(t.rows).rows,
    flatRows: r,
    rowsById: t.rowsById
  };
}
function Ul(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = tn(e[n]);
  return Xs(e, t);
}
function $v(e) {
  return Object.keys(e).map((t) => tn(e[t]));
}
function Wv(e) {
  const t = (u, c) => {
    u.setOptions((d) => Kl(d, Ul(c)));
  }, n = up(), r = Xs(e, { features: {
    coreReactivityFeature: n,
    ...tn(e.features) ?? {}
  } }), o = Xs(Ul(r), { mergeOptions: (u, c) => Kl(u, c) }), s = av(o), l = s;
  return xa() && Xf(() => {
    var u;
    return (u = n.unmount) == null ? void 0 : u.call(n);
  }), be(() => $v(r), () => {
    t(s, r);
  }, { immediate: !0 }), be(() => {
    const u = tn(e.state), c = tn(e.atoms);
    if (!u) return [];
    const d = [];
    for (const g of Object.keys(l.initialState))
      !(g in u) || (c == null ? void 0 : c[g]) !== void 0 || d.push(u[g]);
    return d;
  }, (u) => {
    u.length > 0 && t(s, r);
  }, { immediate: !0 }), l.Subscribe = (u) => u.children(l.atoms), l;
}
function _r(e) {
  "@babel/helpers - typeof";
  return _r = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, _r(e);
}
function Uv(e, t) {
  if (_r(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (_r(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function qv(e) {
  var t = Uv(e, "string");
  return _r(t) == "symbol" ? t : t + "";
}
function Ar(e, t, n) {
  return (t = qv(t)) in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function Gv(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
    if (t.indexOf(r) !== -1) continue;
    n[r] = e[r];
  }
  return n;
}
function Xv(e, t) {
  if (e == null) return {};
  var n, r, o = Gv(e, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    for (r = 0; r < s.length; r++) n = s[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (o[n] = e[n]);
  }
  return o;
}
function gc(e, t) {
  var n = Object.keys(e), r = Object.keys(t);
  return n.length !== r.length ? !1 : n.every(function(o) {
    return Object.is(e[o], t[o]);
  });
}
function Yv() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : gc, t = null;
  return function(n) {
    return t && e(t.value, n) || (t = {
      value: n
    }), t.value;
  };
}
var Zv = ["block"];
function ql(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Gl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ql(Object(n), !0).forEach(function(r) {
      Ar(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ql(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Jv(e) {
  return {
    x: (e.right + e.left) / 2,
    y: (e.bottom + e.top) / 2
  };
}
function ks(e) {
  var t = e.client, n = e.borderBox, r = n.height / 4;
  return t.y <= n.top + r ? "reorder-above" : t.y >= n.bottom - r ? "reorder-below" : "make-child";
}
function Qv(e) {
  var t = e.element, n = e.input, r = e.currentLevel, o = e.indentPerLevel, s = e.mode, l = {
    x: n.clientX,
    y: n.clientY
  }, u = t.getBoundingClientRect();
  if (s === "standard") {
    var c = ks({
      borderBox: u,
      client: l
    });
    return {
      type: c,
      indentPerLevel: o,
      currentLevel: r
    };
  }
  var d = Jv(u);
  if (s === "expanded") {
    var g = ks({
      borderBox: u,
      client: l
    });
    return {
      // Use the "standard" hitbox for "reorder above",
      // The rest of the item is "make-child"
      type: g === "reorder-above" ? g : "make-child",
      indentPerLevel: o,
      currentLevel: r
    };
  }
  var h = o * r;
  if (l.x < u.left + h) {
    if (l.y < d.y)
      return {
        type: "reorder-above",
        indentPerLevel: o,
        currentLevel: r
      };
    var y = (l.x - u.left) / o, w = Math.max(Math.floor(y), 0);
    return {
      type: "reparent",
      desiredLevel: w,
      indentPerLevel: o,
      currentLevel: r
    };
  }
  return {
    type: ks({
      borderBox: u,
      client: l
    }),
    indentPerLevel: o,
    currentLevel: r
  };
}
function pc(e, t) {
  return e.type !== t.type ? !1 : e.type === "instruction-blocked" && t.type === "instruction-blocked" ? pc(e.desired, t.desired) : gc(e, t);
}
var em = Yv(pc);
function tm(e) {
  var t = e.desired, n = e.block;
  if (n != null && n.includes(t.type) && t.type !== "instruction-blocked") {
    var r = {
      type: "instruction-blocked",
      desired: t
    };
    return r;
  }
  return t;
}
function nm(e, t) {
  var n = t.block, r = Xv(t, Zv), o = Qv(r), s = tm({
    desired: o,
    block: n
  }), l = em(s);
  return Gl(Gl({}, e), {}, Ar({}, hc, l));
}
function Xl(e) {
  var t;
  return (t = e[hc]) !== null && t !== void 0 ? t : null;
}
var hc = Symbol("tree-item-instruction");
function $o() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return function() {
    t.forEach(function(o) {
      return o();
    });
  };
}
function rm(e) {
  if (Array.isArray(e)) return e;
}
function om(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r, o, s, l, u = [], c = !0, d = !1;
    try {
      if (s = (n = n.call(e)).next, t !== 0) for (; !(c = (r = s.call(n)).done) && (u.push(r.value), u.length !== t); c = !0) ;
    } catch (g) {
      d = !0, o = g;
    } finally {
      try {
        if (!c && n.return != null && (l = n.return(), Object(l) !== l)) return;
      } finally {
        if (d) throw o;
      }
    }
    return u;
  }
}
function ei(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function vc(e, t) {
  if (e) {
    if (typeof e == "string") return ei(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? ei(e, t) : void 0;
  }
}
function sm() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function mc(e, t) {
  return rm(e) || om(e, t) || vc(e, t) || sm();
}
var Yl = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, sn = {}, Or = {};
Object.defineProperty(Or, "__esModule", { value: !0 });
Or.bind = void 0;
function im(e, t) {
  var n = t.type, r = t.listener, o = t.options;
  return e.addEventListener(n, r, o), function() {
    e.removeEventListener(n, r, o);
  };
}
Or.bind = im;
var Wo = {}, In = Yl && Yl.__assign || function() {
  return In = Object.assign || function(e) {
    for (var t, n = 1, r = arguments.length; n < r; n++) {
      t = arguments[n];
      for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    }
    return e;
  }, In.apply(this, arguments);
};
Object.defineProperty(Wo, "__esModule", { value: !0 });
Wo.bindAll = void 0;
var lm = Or;
function Zl(e) {
  if (!(typeof e > "u"))
    return typeof e == "boolean" ? {
      capture: e
    } : e;
}
function am(e, t) {
  if (t == null)
    return e;
  var n = In(In({}, e), { options: In(In({}, Zl(t)), Zl(e.options)) });
  return n;
}
function um(e, t, n) {
  var r = t.map(function(o) {
    var s = am(o, n);
    return (0, lm.bind)(e, s);
  });
  return function() {
    r.forEach(function(s) {
      return s();
    });
  };
}
Wo.bindAll = um;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.bindAll = e.bind = void 0;
  var t = Or;
  Object.defineProperty(e, "bind", { enumerable: !0, get: function() {
    return t.bind;
  } });
  var n = Wo;
  Object.defineProperty(e, "bindAll", { enumerable: !0, get: function() {
    return n.bindAll;
  } });
})(sn);
var yc = "data-pdnd-honey-pot";
function wc(e) {
  return e instanceof Element && e.hasAttribute(yc);
}
function bc(e) {
  var t = document.elementsFromPoint(e.x, e.y), n = mc(t, 2), r = n[0], o = n[1];
  return r ? wc(r) ? o ?? null : r : null;
}
var cm = 2147483647, fm = {
  inset: "unset",
  border: "none",
  padding: 0,
  margin: 0,
  overflow: "visible",
  color: "inherit",
  background: "transparent",
  width: "auto",
  height: "auto"
};
function fn(e) {
  var t = null;
  return function() {
    if (!t) {
      for (var r = arguments.length, o = new Array(r), s = 0; s < r; s++)
        o[s] = arguments[s];
      var l = e.apply(this, o);
      t = {
        result: l
      };
    }
    return t.result;
  };
}
var Ps = fn(function() {
  return typeof HTMLElement < "u" && typeof HTMLElement.prototype.showPopover == "function";
});
function Jl(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Ql(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Jl(Object(n), !0).forEach(function(r) {
      Ar(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Jl(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
var Sr = 2, ea = Sr / 2;
function dm(e) {
  return {
    x: Math.floor(e.x),
    y: Math.floor(e.y)
  };
}
function gm(e) {
  return {
    x: e.x - ea,
    y: e.y - ea
  };
}
function pm(e) {
  return {
    x: Math.max(e.x, 0),
    y: Math.max(e.y, 0)
  };
}
function hm(e) {
  return {
    x: Math.min(e.x, window.innerWidth - Sr),
    y: Math.min(e.y, window.innerHeight - Sr)
  };
}
function ta(e) {
  var t = e.client, n = hm(pm(gm(dm(t))));
  return DOMRect.fromRect({
    x: n.x,
    y: n.y,
    width: Sr,
    height: Sr
  });
}
function na(e) {
  var t = e.clientRect;
  return {
    left: "".concat(t.left, "px"),
    top: "".concat(t.top, "px"),
    width: "".concat(t.width, "px"),
    height: "".concat(t.height, "px")
  };
}
function vm(e) {
  var t = e.client, n = e.clientRect;
  return (
    // is within horizontal bounds
    t.x >= n.x && t.x <= n.x + n.width && // is within vertical bounds
    t.y >= n.y && t.y <= n.y + n.height
  );
}
function mm(e) {
  var t = e.initial, n = document.createElement("div");
  n.setAttribute(yc, "true"), Ps() && n.setAttribute("popover", "manual");
  var r = ta({
    client: t
  });
  Object.assign(n.style, Ql(Ql({
    position: "fixed"
  }, Ps() ? (
    // needs to come first as it has 'inset: unset' which
    // needs to be overridden by our top / left values
    fm
  ) : {
    // Fallback: using maximum possible z-index so that this element
    // will always be on top of other positioned content.
    zIndex: cm
  }), {}, {
    // Setting a background color explicitly to avoid any inherited styles.
    // Looks like this could be `opacity: 0`, but worried that _might_
    // cause the element to be ignored on some platforms.
    // When debugging, set backgroundColor to something like "red".
    backgroundColor: "transparent",
    // Being explicit to avoid inheriting styles
    padding: 0,
    margin: 0,
    boxSizing: "border-box",
    // We want this element to absorb pointer events,
    // it's kind of the whole point 😉
    pointerEvents: "auto"
  }, na({
    clientRect: r
  }))), document.body.appendChild(n), Ps() && n.showPopover();
  var o = sn.bind(window, {
    type: "pointermove",
    listener: function(l) {
      var u = {
        x: l.clientX,
        y: l.clientY
      };
      r = ta({
        client: u
      }), Object.assign(n.style, na({
        clientRect: r
      }));
    },
    // using capture so we are less likely to be impacted by event stopping
    options: {
      capture: !0
    }
  });
  return function(l) {
    var u = l.current;
    if (o(), vm({
      client: u,
      clientRect: r
    })) {
      n.remove();
      return;
    }
    function c() {
      d(), n.remove();
    }
    var d = sn.bindAll(window, [
      {
        type: "pointerdown",
        listener: c
      },
      {
        type: "pointermove",
        listener: c
      },
      {
        type: "focusin",
        listener: c
      },
      {
        type: "focusout",
        listener: c
      },
      // a 'pointerdown' should happen before 'dragstart', but just being super safe
      {
        type: "dragstart",
        listener: c
      },
      // if the user has dragged something out of the window
      // and then is dragging something back into the window
      // the first events we will see are "dragenter" (and then "dragover").
      // So if we see any of these we need to clear the post drag fix.
      {
        type: "dragenter",
        listener: c
      },
      {
        type: "dragover",
        listener: c
      }
      // Not adding a "wheel" event listener, as "wheel" by itself does not
      // resolve the bug.
    ], {
      // Using `capture` so less likely to be impacted by other code stopping events
      capture: !0
    });
  };
}
function ym() {
  var e = null;
  function t() {
    return e = null, sn.bind(window, {
      type: "pointermove",
      listener: function(o) {
        e = {
          x: o.clientX,
          y: o.clientY
        };
      },
      // listening for pointer move in capture phase
      // so we are less likely to be impacted by events being stopped.
      options: {
        capture: !0
      }
    });
  }
  function n() {
    var r = null;
    return function(s) {
      var l = s.eventName, u = s.payload;
      if (l === "onDragStart") {
        var c = u.location.initial.input, d = e ?? {
          x: c.clientX,
          y: c.clientY
        };
        r = mm({
          initial: d
        });
      }
      if (l === "onDrop") {
        var g, h = u.location.current.input;
        (g = r) === null || g === void 0 || g({
          current: {
            x: h.clientX,
            y: h.clientY
          }
        }), r = null, e = null;
      }
    };
  }
  return {
    bindEvents: t,
    getOnPostDispatch: n
  };
}
function wm(e) {
  if (Array.isArray(e)) return ei(e);
}
function bm(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function _m() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function _c(e) {
  return wm(e) || bm(e) || vc(e) || _m();
}
var Sm = fn(function() {
  return navigator.userAgent.includes("Firefox");
}), Ei = fn(function() {
  var t = navigator, n = t.userAgent;
  return n.includes("AppleWebKit") && !n.includes("Chrome");
});
function xm(e) {
  return "nodeName" in e;
}
function Rm(e) {
  return xm(e) && e.ownerDocument !== document;
}
var ti = {
  isLeavingWindow: Symbol("leaving"),
  isEnteringWindow: Symbol("entering")
};
(function() {
  if (typeof window > "u" || !Ei())
    return;
  function t() {
    return {
      enterCount: 0,
      isOverWindow: !1
    };
  }
  var n = t();
  function r() {
    n = t();
  }
  sn.bindAll(
    window,
    [{
      type: "dragstart",
      listener: function() {
        n.enterCount = 0, n.isOverWindow = !0;
      }
    }, {
      type: "drop",
      listener: r
    }, {
      type: "dragend",
      listener: r
    }, {
      type: "dragenter",
      listener: function(s) {
        !n.isOverWindow && n.enterCount === 0 && (s[ti.isEnteringWindow] = !0), n.isOverWindow = !0, n.enterCount++;
      }
    }, {
      type: "dragleave",
      listener: function(s) {
        n.enterCount--, n.isOverWindow && n.enterCount === 0 && (s[ti.isLeavingWindow] = !0, n.isOverWindow = !1);
      }
    }],
    // using `capture: true` so that adding event listeners
    // in bubble phase will have the correct symbols
    {
      capture: !0
    }
  );
})();
function Cm(e) {
  var t = e.dragLeave;
  return Ei() ? t.hasOwnProperty(ti.isLeavingWindow) : !1;
}
function Mm(e) {
  var t = e.dragLeave, n = t.type, r = t.relatedTarget;
  return n !== "dragleave" ? !1 : Ei() ? Cm({
    dragLeave: t
  }) : r == null ? !0 : Sm() ? Rm(r) : r instanceof HTMLIFrameElement;
}
function Im(e) {
  var t = e.onDragEnd;
  return [
    // ## Detecting drag ending for removed draggables
    //
    // If a draggable element is removed during a drag and the user drops:
    // 1. if over a valid drop target: we get a "drop" event to know the drag is finished
    // 2. if not over a valid drop target (or cancelled): we get nothing
    // The "dragend" event will not fire on the source draggable if it has been
    // removed from the DOM.
    // So we need to figure out if a drag operation has finished by looking at other events
    // We can do this by looking at other events
    // ### First detection: "pointermove" events
    // 1. "pointermove" events cannot fire during a drag and drop operation
    // according to the spec. So if we get a "pointermove" it means that
    // the drag and drop operations has finished. So if we get a "pointermove"
    // we know that the drag is over
    // 2. 🦊😤 Drag and drop operations are _supposed_ to suppress
    // other pointer events. However, firefox will allow a few
    // pointer event to get through after a drag starts.
    // The most I've seen is 3
    {
      type: "pointermove",
      listener: /* @__PURE__ */ function() {
        var n = 0;
        return function() {
          if (n < 20) {
            n++;
            return;
          }
          t();
        };
      }()
    },
    // ### Second detection: "pointerdown" events
    // If we receive this event then we know that a drag operation has finished
    // and potentially another one is about to start.
    // Note: `pointerdown` fires on all browsers / platforms before "dragstart"
    {
      type: "pointerdown",
      listener: t
    }
  ];
}
function gr(e) {
  return {
    altKey: e.altKey,
    button: e.button,
    buttons: e.buttons,
    ctrlKey: e.ctrlKey,
    metaKey: e.metaKey,
    shiftKey: e.shiftKey,
    clientX: e.clientX,
    clientY: e.clientY,
    pageX: e.pageX,
    pageY: e.pageY
  };
}
var Em = function(t) {
  var n = [], r = null, o = function() {
    for (var l = arguments.length, u = new Array(l), c = 0; c < l; c++)
      u[c] = arguments[c];
    n = u, !r && (r = requestAnimationFrame(function() {
      r = null, t.apply(void 0, n);
    }));
  };
  return o.cancel = function() {
    r && (cancelAnimationFrame(r), r = null);
  }, o;
}, Ds = Em(function(e) {
  return e();
}), ro = /* @__PURE__ */ function() {
  var e = null;
  function t(r) {
    var o = requestAnimationFrame(function() {
      e = null, r();
    });
    e = {
      frameId: o,
      fn: r
    };
  }
  function n() {
    e && (cancelAnimationFrame(e.frameId), e.fn(), e = null);
  }
  return {
    schedule: t,
    flush: n
  };
}();
function Am(e) {
  var t = e.source, n = e.initial, r = e.dispatchEvent, o = {
    dropTargets: []
  };
  function s(u) {
    r(u), o = {
      dropTargets: u.payload.location.current.dropTargets
    };
  }
  var l = {
    start: function(c) {
      var d = c.nativeSetDragImage, g = {
        current: n,
        previous: o,
        initial: n
      };
      s({
        eventName: "onGenerateDragPreview",
        payload: {
          source: t,
          location: g,
          nativeSetDragImage: d
        }
      }), ro.schedule(function() {
        s({
          eventName: "onDragStart",
          payload: {
            source: t,
            location: g
          }
        });
      });
    },
    dragUpdate: function(c) {
      var d = c.current;
      ro.flush(), Ds.cancel(), s({
        eventName: "onDropTargetChange",
        payload: {
          source: t,
          location: {
            initial: n,
            previous: o,
            current: d
          }
        }
      });
    },
    drag: function(c) {
      var d = c.current;
      Ds(function() {
        ro.flush();
        var g = {
          initial: n,
          previous: o,
          current: d
        };
        s({
          eventName: "onDrag",
          payload: {
            source: t,
            location: g
          }
        });
      });
    },
    drop: function(c) {
      var d = c.current, g = c.updatedSourcePayload;
      ro.flush(), Ds.cancel(), s({
        eventName: "onDrop",
        payload: {
          source: g ?? t,
          location: {
            current: d,
            previous: o,
            initial: n
          }
        }
      });
    }
  };
  return l;
}
var ni = {
  isActive: !1
};
function Sc() {
  return !ni.isActive;
}
function Om(e) {
  return e.dataTransfer ? e.dataTransfer.setDragImage.bind(e.dataTransfer) : null;
}
function km(e) {
  var t = e.current, n = e.next;
  if (t.length !== n.length)
    return !0;
  for (var r = 0; r < t.length; r++)
    if (t[r].element !== n[r].element)
      return !0;
  return !1;
}
function Pm(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = e.dispatchEvent;
  if (!Sc())
    return;
  var s = Dm({
    event: t,
    dragType: n,
    getDropTargetsOver: r
  });
  ni.isActive = !0;
  var l = {
    current: s
  };
  Ts({
    event: t,
    current: s.dropTargets
  });
  var u = Am({
    source: n.payload,
    dispatchEvent: o,
    initial: s
  });
  function c(w) {
    var O = km({
      current: l.current.dropTargets,
      next: w.dropTargets
    });
    l.current = w, O && u.dragUpdate({
      current: l.current
    });
  }
  function d(w) {
    var O = gr(w), x = wc(w.target) ? bc({
      x: O.clientX,
      y: O.clientY
    }) : w.target, A = r({
      target: x,
      input: O,
      source: n.payload,
      current: l.current.dropTargets
    });
    A.length && (w.preventDefault(), Ts({
      event: w,
      current: A
    })), c({
      dropTargets: A,
      input: O
    });
  }
  function g() {
    l.current.dropTargets.length && c({
      dropTargets: [],
      input: l.current.input
    }), u.drop({
      current: l.current,
      updatedSourcePayload: null
    }), h();
  }
  function h() {
    ni.isActive = !1, y();
  }
  var y = sn.bindAll(
    window,
    [{
      // 👋 Note: we are repurposing the `dragover` event as our `drag` event
      // this is because firefox does not publish pointer coordinates during
      // a `drag` event, but does for every other type of drag event
      // `dragover` fires on all elements that are being dragged over
      // Because we are binding to `window` - our `dragover` is effectively the same as a `drag`
      // 🦊😤
      type: "dragover",
      listener: function(O) {
        d(O), u.drag({
          current: l.current
        });
      }
    }, {
      type: "dragenter",
      listener: d
    }, {
      type: "dragleave",
      listener: function(O) {
        Mm({
          dragLeave: O
        }) && (c({
          input: l.current.input,
          dropTargets: []
        }), n.startedFrom === "external" && g());
      }
    }, {
      // A "drop" can only happen if the browser allowed the drop
      type: "drop",
      listener: function(O) {
        if (l.current = {
          dropTargets: l.current.dropTargets,
          input: gr(O)
        }, !l.current.dropTargets.length) {
          g();
          return;
        }
        O.preventDefault(), Ts({
          event: O,
          current: l.current.dropTargets
        }), u.drop({
          current: l.current,
          // When dropping something native, we need to extract the latest
          // `.items` from the "drop" event as it is now accessible
          updatedSourcePayload: n.type === "external" ? n.getDropPayload(O) : null
        }), h();
      }
    }, {
      // "dragend" fires when on the drag source (eg a draggable element)
      // when the drag is finished.
      // "dragend" will fire after "drop" (if there was a successful drop)
      // "dragend" does not fire if the draggable source has been removed during the drag
      // or for external drag sources (eg files)
      // This "dragend" listener will not fire if there was a successful drop
      // as we will have already removed the event listener
      type: "dragend",
      listener: function(O) {
        l.current = {
          dropTargets: l.current.dropTargets,
          input: gr(O)
        }, g();
      }
    }].concat(_c(Im({
      onDragEnd: g
    }))),
    // Once we have started a managed drag operation it is important that we see / own all drag events
    // We got one adoption bug pop up where some code was stopping (`event.stopPropagation()`)
    // all "drop" events in the bubble phase on the `document.body`.
    // This meant that we never saw the "drop" event.
    {
      capture: !0
    }
  );
  u.start({
    nativeSetDragImage: Om(t)
  });
}
function Ts(e) {
  var t, n = e.event, r = e.current, o = (t = r[0]) === null || t === void 0 ? void 0 : t.dropEffect;
  o != null && n.dataTransfer && (n.dataTransfer.dropEffect = o);
}
function Dm(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = gr(t);
  if (n.startedFrom === "external")
    return {
      input: o,
      dropTargets: []
    };
  var s = r({
    input: o,
    source: n.payload,
    target: t.target,
    current: []
  });
  return {
    input: o,
    dropTargets: s
  };
}
var ra = {
  canStart: Sc,
  start: Pm
}, ri = /* @__PURE__ */ new Map();
function Tm(e) {
  var t = e.typeKey, n = e.mount, r = ri.get(t);
  if (r)
    return r.usageCount++, r;
  var o = {
    typeKey: t,
    unmount: n(),
    usageCount: 1
  };
  return ri.set(t, o), o;
}
function Fm(e) {
  var t = Tm(e);
  return function() {
    t.usageCount--, !(t.usageCount > 0) && (t.unmount(), ri.delete(e.typeKey));
  };
}
function xc(e, t) {
  var n = t.attribute, r = t.value;
  return e.setAttribute(n, r), function() {
    return e.removeAttribute(n);
  };
}
function oa(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function zt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? oa(Object(n), !0).forEach(function(r) {
      Ar(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : oa(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Fs(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = Hm(e)) || t) {
      n && (e = n);
      var r = 0, o = function() {
      };
      return { s: o, n: function() {
        return r >= e.length ? { done: !0 } : { done: !1, value: e[r++] };
      }, e: function(d) {
        throw d;
      }, f: o };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var s, l = !0, u = !1;
  return { s: function() {
    n = n.call(e);
  }, n: function() {
    var d = n.next();
    return l = d.done, d;
  }, e: function(d) {
    u = !0, s = d;
  }, f: function() {
    try {
      l || n.return == null || n.return();
    } finally {
      if (u) throw s;
    }
  } };
}
function Hm(e, t) {
  if (e) {
    if (typeof e == "string") return sa(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? sa(e, t) : void 0;
  }
}
function sa(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Hs(e) {
  return e.slice(0).reverse();
}
function Lm(e) {
  var t = e.typeKey, n = e.defaultDropEffect, r = /* @__PURE__ */ new WeakMap(), o = "data-drop-target-for-".concat(t), s = "[".concat(o, "]");
  function l(w) {
    return r.set(w.element, w), function() {
      return r.delete(w.element);
    };
  }
  function u(w) {
    var O = $o(xc(w.element, {
      attribute: o,
      value: "true"
    }), l(w));
    return fn(O);
  }
  function c(w) {
    var O, x, A, K, S = w.source, j = w.target, _ = w.input, P = w.result, z = P === void 0 ? [] : P;
    if (j == null)
      return z;
    if (!(j instanceof Element))
      return j instanceof Node ? c({
        source: S,
        target: j.parentElement,
        input: _,
        result: z
      }) : z;
    var Y = j.closest(s);
    if (Y == null)
      return z;
    var $ = r.get(Y);
    if ($ == null)
      return z;
    var H = {
      input: _,
      source: S,
      element: $.element
    };
    if ($.canDrop && !$.canDrop(H))
      return c({
        source: S,
        target: $.element.parentElement,
        input: _,
        result: z
      });
    var W = (O = (x = $.getData) === null || x === void 0 ? void 0 : x.call($, H)) !== null && O !== void 0 ? O : {}, ie = (A = (K = $.getDropEffect) === null || K === void 0 ? void 0 : K.call($, H)) !== null && A !== void 0 ? A : n, ce = {
      data: W,
      element: $.element,
      dropEffect: ie,
      // we are collecting _actual_ drop targets, so these are
      // being applied _not_ due to stickiness
      isActiveDueToStickiness: !1
    };
    return c({
      source: S,
      target: $.element.parentElement,
      input: _,
      // Using bubble ordering. Same ordering as `event.getPath()`
      result: [].concat(_c(z), [ce])
    });
  }
  function d(w) {
    var O = w.eventName, x = w.payload, A = Fs(x.location.current.dropTargets), K;
    try {
      for (A.s(); !(K = A.n()).done; ) {
        var S, j = K.value, _ = r.get(j.element), P = zt(zt({}, x), {}, {
          self: j
        });
        _ == null || (S = _[O]) === null || S === void 0 || S.call(
          _,
          // I cannot seem to get the types right here.
          // TS doesn't seem to like that one event can need `nativeSetDragImage`
          // @ts-expect-error
          P
        );
      }
    } catch (z) {
      A.e(z);
    } finally {
      A.f();
    }
  }
  var g = {
    onGenerateDragPreview: d,
    onDrag: d,
    onDragStart: d,
    onDrop: d,
    onDropTargetChange: function(O) {
      var x = O.payload, A = new Set(x.location.current.dropTargets.map(function(oe) {
        return oe.element;
      })), K = /* @__PURE__ */ new Set(), S = Fs(x.location.previous.dropTargets), j;
      try {
        for (S.s(); !(j = S.n()).done; ) {
          var _, P = j.value;
          K.add(P.element);
          var z = r.get(P.element), Y = A.has(P.element), $ = zt(zt({}, x), {}, {
            self: P
          });
          if (z == null || (_ = z.onDropTargetChange) === null || _ === void 0 || _.call(z, $), !Y) {
            var H;
            z == null || (H = z.onDragLeave) === null || H === void 0 || H.call(z, $);
          }
        }
      } catch (oe) {
        S.e(oe);
      } finally {
        S.f();
      }
      var W = Fs(x.location.current.dropTargets), ie;
      try {
        for (W.s(); !(ie = W.n()).done; ) {
          var ce, te, we = ie.value;
          if (!K.has(we.element)) {
            var xe = zt(zt({}, x), {}, {
              self: we
            }), fe = r.get(we.element);
            fe == null || (ce = fe.onDropTargetChange) === null || ce === void 0 || ce.call(fe, xe), fe == null || (te = fe.onDragEnter) === null || te === void 0 || te.call(fe, xe);
          }
        }
      } catch (oe) {
        W.e(oe);
      } finally {
        W.f();
      }
    }
  };
  function h(w) {
    g[w.eventName](w);
  }
  function y(w) {
    var O = w.source, x = w.target, A = w.input, K = w.current, S = c({
      source: O,
      target: x,
      input: A
    });
    if (S.length >= K.length)
      return S;
    for (var j = Hs(K), _ = Hs(S), P = [], z = 0; z < j.length; z++) {
      var Y, $ = j[z], H = _[z];
      if (H != null) {
        P.push(H);
        continue;
      }
      var W = P[z - 1], ie = j[z - 1];
      if ((W == null ? void 0 : W.element) !== (ie == null ? void 0 : ie.element))
        break;
      var ce = r.get($.element);
      if (!ce)
        break;
      var te = {
        input: A,
        source: O,
        element: ce.element
      };
      if (ce.canDrop && !ce.canDrop(te) || !((Y = ce.getIsSticky) !== null && Y !== void 0 && Y.call(ce, te)))
        break;
      P.push(zt(zt({}, $), {}, {
        // making it clear to consumers this drop target is active due to stickiness
        isActiveDueToStickiness: !0
      }));
    }
    return Hs(P);
  }
  return {
    dropTargetForConsumers: u,
    getIsOver: y,
    dispatchEvent: h
  };
}
function jm(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = zm(e)) || t) {
      n && (e = n);
      var r = 0, o = function() {
      };
      return { s: o, n: function() {
        return r >= e.length ? { done: !0 } : { done: !1, value: e[r++] };
      }, e: function(d) {
        throw d;
      }, f: o };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var s, l = !0, u = !1;
  return { s: function() {
    n = n.call(e);
  }, n: function() {
    var d = n.next();
    return l = d.done, d;
  }, e: function(d) {
    u = !0, s = d;
  }, f: function() {
    try {
      l || n.return == null || n.return();
    } finally {
      if (u) throw s;
    }
  } };
}
function zm(e, t) {
  if (e) {
    if (typeof e == "string") return ia(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? ia(e, t) : void 0;
  }
}
function ia(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function la(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Km(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? la(Object(n), !0).forEach(function(r) {
      Ar(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : la(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Vm() {
  var e = /* @__PURE__ */ new Set(), t = null;
  function n(s) {
    t && (!s.canMonitor || s.canMonitor(t.canMonitorArgs)) && t.active.add(s);
  }
  function r(s) {
    var l = Km({}, s);
    e.add(l), n(l);
    function u() {
      e.delete(l), t && t.active.delete(l);
    }
    return fn(u);
  }
  function o(s) {
    var l = s.eventName, u = s.payload;
    if (l === "onGenerateDragPreview") {
      t = {
        canMonitorArgs: {
          initial: u.location.initial,
          source: u.source
        },
        active: /* @__PURE__ */ new Set()
      };
      var c = jm(e), d;
      try {
        for (c.s(); !(d = c.n()).done; ) {
          var g = d.value;
          n(g);
        }
      } catch (A) {
        c.e(A);
      } finally {
        c.f();
      }
    }
    if (t) {
      for (var h = Array.from(t.active), y = 0, w = h; y < w.length; y++) {
        var O = w[y];
        if (t.active.has(O)) {
          var x;
          (x = O[l]) === null || x === void 0 || x.call(O, u);
        }
      }
      l === "onDrop" && (t.active.clear(), t = null);
    }
  }
  return {
    dispatchEvent: o,
    monitorForConsumers: r
  };
}
function Bm(e) {
  var t = e.typeKey, n = e.mount, r = e.dispatchEventToSource, o = e.onPostDispatch, s = e.defaultDropEffect, l = Vm(), u = Lm({
    typeKey: t,
    defaultDropEffect: s
  });
  function c(h) {
    r == null || r(h), u.dispatchEvent(h), l.dispatchEvent(h), o == null || o(h);
  }
  function d(h) {
    var y = h.event, w = h.dragType;
    ra.start({
      event: y,
      dragType: w,
      getDropTargetsOver: u.getIsOver,
      dispatchEvent: c
    });
  }
  function g() {
    function h() {
      var y = {
        canStart: ra.canStart,
        start: d
      };
      return n(y);
    }
    return Fm({
      typeKey: t,
      mount: h
    });
  }
  return {
    registerUsage: g,
    dropTarget: u.dropTargetForConsumers,
    monitor: l.monitorForConsumers
  };
}
var Nm = fn(function() {
  return navigator.userAgent.toLocaleLowerCase().includes("android");
}), $m = "pdnd:android-fallback", aa = "text/plain", Wm = "text/uri-list", Um = "application/vnd.pdnd", So = /* @__PURE__ */ new WeakMap();
function qm(e) {
  return So.set(e.element, e), function() {
    So.delete(e.element);
  };
}
var ua = ym(), Rc = Bm({
  typeKey: "element",
  defaultDropEffect: "move",
  mount: function(t) {
    return $o(ua.bindEvents(), sn.bind(document, {
      type: "dragstart",
      listener: function(r) {
        var o, s, l, u, c, d;
        if (t.canStart(r) && !r.defaultPrevented && r.dataTransfer) {
          var g = r.target;
          if (g instanceof HTMLElement) {
            var h = So.get(g);
            if (h) {
              var y = gr(r), w = {
                element: h.element,
                dragHandle: (o = h.dragHandle) !== null && o !== void 0 ? o : null,
                input: y
              };
              if (h.canDrag && !h.canDrag(w)) {
                r.preventDefault();
                return;
              }
              if (h.dragHandle) {
                var O = bc({
                  x: y.clientX,
                  y: y.clientY
                });
                if (!h.dragHandle.contains(O)) {
                  r.preventDefault();
                  return;
                }
              }
              var x = (s = (l = h.getInitialDataForExternal) === null || l === void 0 ? void 0 : l.call(h, w)) !== null && s !== void 0 ? s : null;
              if (x)
                for (var A = 0, K = Object.entries(x); A < K.length; A++) {
                  var S = mc(K[A], 2), j = S[0], _ = S[1];
                  r.dataTransfer.setData(j, _ ?? "");
                }
              Nm() && !r.dataTransfer.types.includes(aa) && !r.dataTransfer.types.includes(Wm) && r.dataTransfer.setData(aa, $m), r.dataTransfer.setData(Um, "");
              var P = {
                element: h.element,
                dragHandle: (u = h.dragHandle) !== null && u !== void 0 ? u : null,
                data: (c = (d = h.getInitialData) === null || d === void 0 ? void 0 : d.call(h, w)) !== null && c !== void 0 ? c : {}
              }, z = {
                type: "element",
                payload: P,
                startedFrom: "internal"
              };
              t.start({
                event: r,
                dragType: z
              });
            }
          }
        }
      }
    }));
  },
  dispatchEventToSource: function(t) {
    var n, r, o = t.eventName, s = t.payload;
    (n = So.get(s.source.element)) === null || n === void 0 || (r = n[o]) === null || r === void 0 || r.call(
      n,
      // I cannot seem to get the types right here.
      // TS doesn't seem to like that one event can need `nativeSetDragImage`
      // @ts-expect-error
      s
    );
  },
  onPostDispatch: ua.getOnPostDispatch()
}), Gm = Rc.dropTarget;
function Xm(e) {
  var t = $o(
    // making the draggable register the adapter rather than drop targets
    // this is because you *must* have a draggable element to start a drag
    // but you _might_ not have any drop targets immediately
    // (You might create drop targets async)
    Rc.registerUsage(),
    qm(e),
    xc(e.element, {
      attribute: "draggable",
      value: "true"
    })
  );
  return fn(t);
}
const Ls = /* @__PURE__ */ new Map(), kn = "pnl-tst-row";
function Ym(e, t) {
  return $o(
    Xm({
      element: e,
      // Anything outside a row (the header, the empty space below the last row,
      // a row control) is not a drag handle, and returning false cancels the
      // native drag. With several panes that answer has to come from the pane the
      // pointer is over and never from the others, since a neighbour cancelling
      // cancels the drag for everyone.
      canDrag: ({ input: n }) => t.panes.some((r) => r.canDragFrom(n)),
      getInitialData: ({ input: n }) => {
        for (const r of t.panes) {
          const o = r.dragData(n);
          if (o) return o;
        }
        return { type: kn, group: "", sourceId: "", key: null, keys: [] };
      },
      onGenerateDragPreview: ({ location: n, nativeSetDragImage: r }) => {
        if (!r) return;
        const o = n.current.input;
        for (const s of t.panes)
          if (s.preview(o, r)) return;
      },
      onDragStart: ({ source: n }) => {
        for (const r of t.panes)
          r.setDragging(r.id() === n.data.sourceId ? n.data.keys ?? [] : []);
      },
      onDrop: () => {
        for (const n of t.panes)
          n.setDragging([]), n.clearDrop();
      }
    }),
    Gm({
      element: e,
      // Position is deliberately not consulted here. pdnd settles `canDrop` when
      // the pointer enters the element, and the element is the whole layout, so an
      // answer given from the pointer's first position would stand for the rest of
      // the drag. Which pane the pointer is over, and whether that pane accepts
      // the drag at all, is decided in `getData`, which runs on every move.
      canDrop: ({ source: n }) => n.data.type === kn,
      getData: ({ input: n, source: r }) => {
        for (const o of t.panes) {
          const s = o.dropData(n, r.data);
          if (s) return s;
        }
        return { type: kn, key: null, paneId: "" };
      },
      onDrag: ({ self: n }) => {
        const r = n.data.key, o = Xl(n.data);
        for (const s of t.panes)
          s.id() === n.data.paneId && r && o ? s.showDrop(r, o) : s.clearDrop();
      },
      onDragLeave: () => {
        for (const n of t.panes) n.clearDrop();
      },
      onDrop: ({ self: n, source: r, location: o }) => {
        for (const c of t.panes) c.clearDrop();
        const s = t.panes.find((c) => c.id() === n.data.paneId), l = n.data.key, u = Xl(n.data);
        !s || !l || !u || u.type === "instruction-blocked" || s.drop(r.data, l, u, o.current.input);
      }
    })
  );
}
function Zm(e, t) {
  let n = Ls.get(e);
  return n || (n = { panes: [] }, n.cleanup = Ym(e, n), Ls.set(e, n)), n.panes.push(t), () => {
    var r;
    n.panes = n.panes.filter((o) => o !== t), !(n.panes.length > 0) && ((r = n.cleanup) == null || r.call(n), Ls.delete(e));
  };
}
const Jm = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ef5350" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m6 10h-4v8a4 4 0 1 1-4-4 3.96 3.96 0 0 1 2 .555V8h6Z"/></svg>', Qm = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#ff7043" d="M2 2a1 1 0 0 0-1 1v10c0 .554.446 1 1 1h12c.554 0 1-.446 1-1V3a1 1 0 0 0-1-1zm0 3h12v8H2zm1 2 2 2-2 2 1 1 3-3-3-3zm5 3.5V12h5v-1.5z"/></svg>', e0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#7e57c2" d="M20 18h-2v-2h-2v2c0 .193 0 .703 1.254 1.033A3.345 3.345 0 0 1 20 22h2v2h2v-2c0-.388-.562-.851-1.254-1.034C20.356 20.34 20 18.84 20 18m-3.254 2.966C14.356 20.34 14 18.84 14 18h-2v-2h-2v8h2v-2h4v2h2v-2c0-.388-.562-.851-1.254-1.034"/><path fill="#7e57c2" d="M24 4H4v20a4 4 0 0 0 4 4h16.16A3.84 3.84 0 0 0 28 24.16V8a4 4 0 0 0-4-4m2 14h-2v-2h-2v2c0 .193 0 .703 1.254 1.033A3.345 3.345 0 0 1 26 22v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1 2-2h2a2 2 0 0 1 2 2Z"/></svg>', t0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ffca28" d="M16 24c-5.525 0-10-.9-10-2v4c0 1.1 4.475 2 10 2s10-.9 10-2v-4c0 1.1-4.475 2-10 2m0-8c-5.525 0-10-.9-10-2v4c0 1.1 4.475 2 10 2s10-.9 10-2v-4c0 1.1-4.475 2-10 2m0-12C10.477 4 6 4.895 6 6v4c0 1.1 4.475 2 10 2s10-.9 10-2V6c0-1.105-4.477-2-10-2"/></svg>', n0 = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/><path fill="#42a5f5" d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5z"/></svg>', r0 = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m8.668 6h3.6641l-3.6641-3.668v3.668m-4.668-4.668h5.332l4 4v8c0 0.73828-0.59375 1.3359-1.332 1.3359h-8c-0.73828 0-1.332-0.59766-1.332-1.3359v-10.664c0-0.74219 0.59375-1.3359 1.332-1.3359m3.332 1.3359h-3.332v10.664h8v-6h-4.668z" fill="#90a4ae" /></svg>', o0 = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m6.922 3.768-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232" fill="#90a4ae" /></svg>', s0 = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.483 6H4.721a1 1 0 0 0-.949.684L2 12V5h12a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232l-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h11l2.403-5.606A1 1 0 0 0 14.483 6" fill="#90a4ae" /></svg>', i0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#e65100" d="m4 4 2 22 10 2 10-2 2-22Zm19.72 7H11.28l.29 3h11.86l-.802 9.335L15.99 25l-6.635-1.646L8.93 19h3.02l.19 2 3.86.77 3.84-.77.29-4H8.84L8 8h16Z"/></svg>', l0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#26a69a" d="M8.5 6h4l-4-4zM3.875 1H9.5l4 4v8.6c0 .773-.616 1.4-1.375 1.4h-8.25c-.76 0-1.375-.627-1.375-1.4V2.4c0-.777.612-1.4 1.375-1.4M4 13.6h8V8l-2.625 2.8L8 9.4zm1.25-7.7c-.76 0-1.375.627-1.375 1.4s.616 1.4 1.375 1.4c.76 0 1.375-.627 1.375-1.4S6.009 5.9 5.25 5.9"/></svg>', a0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#ffca28" d="M2 2v12h12V2zm6 6h1v4a1.003 1.003 0 0 1-1 1H7a1.003 1.003 0 0 1-1-1v-1h1v1h1zm3 0h2v1h-2v1h1a1.003 1.003 0 0 1 1 1v1a1.003 1.003 0 0 1-1 1h-2v-1h2v-1h-1a1.003 1.003 0 0 1-1-1V9a1.003 1.003 0 0 1 1-1"/></svg>', u0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path fill="#f9a825" d="M560-160v-80h120q17 0 28.5-11.5T720-280v-80q0-38 22-69t58-44v-14q-36-13-58-44t-22-69v-80q0-17-11.5-28.5T680-720H560v-80h120q50 0 85 35t35 85v80q0 17 11.5 28.5T840-560h40v160h-40q-17 0-28.5 11.5T800-360v80q0 50-35 85t-85 35zm-280 0q-50 0-85-35t-35-85v-80q0-17-11.5-28.5T120-400H80v-160h40q17 0 28.5-11.5T160-600v-80q0-50 35-85t85-35h120v80H280q-17 0-28.5 11.5T240-680v80q0 38-22 69t-58 44v14q36 13 58 44t22 69v80q0 17 11.5 28.5T280-240h120v80z"/></svg>', c0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#42a5f5" d="m14 10-4 3.5L6 10H4v12h4v-6l2 2 2-2v6h4V10zm12 6v-6h-4v6h-4l6 8 6-8z"/></svg>', f0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ef5350" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m4.93 10.44c.41.9.93 1.64 1.53 2.15l.41.32c-.87.16-2.07.44-3.34.93l-.11.04.5-1.04c.45-.87.78-1.66 1.01-2.4m6.48 3.81c.18-.18.27-.41.28-.66.03-.2-.02-.39-.12-.55-.29-.47-1.04-.69-2.28-.69l-1.29.07-.87-.58c-.63-.52-1.2-1.43-1.6-2.56l.04-.14c.33-1.33.64-2.94-.02-3.6a.85.85 0 0 0-.61-.24h-.24c-.37 0-.7.39-.79.77-.37 1.33-.15 2.06.22 3.27v.01c-.25.88-.57 1.9-1.08 2.93l-.96 1.8-.89.49c-1.2.75-1.77 1.59-1.88 2.12-.04.19-.02.36.05.54l.03.05.48.31.44.11c.81 0 1.73-.95 2.97-3.07l.18-.07c1.03-.33 2.31-.56 4.03-.75 1.03.51 2.24.74 3 .74.44 0 .74-.11.91-.3m-.41-.71.09.11c-.01.1-.04.11-.09.13h-.04l-.19.02c-.46 0-1.17-.19-1.9-.51.09-.1.13-.1.23-.1 1.4 0 1.8.25 1.9.35M7.83 17c-.65 1.19-1.24 1.85-1.69 2 .05-.38.5-1.04 1.21-1.69zm3.02-6.91c-.23-.9-.24-1.63-.07-2.05l.07-.12.15.05c.17.24.19.56.09 1.1l-.03.16-.16.82z"/></svg>', d0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#e64a19" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zM8 11v2h1v6H8v1h4v-1h-1v-2h2a3 3 0 0 0 3-3 3 3 0 0 0-3-3zm5 2a1 1 0 0 1 1 1 1 1 0 0 1-1 1h-2v-2z"/></svg>', g0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#0288d1" d="M9.86 2A2.86 2.86 0 0 0 7 4.86v1.68h4.29c.39 0 .71.57.71.96H4.86A2.86 2.86 0 0 0 2 10.36v3.781a2.86 2.86 0 0 0 2.86 2.86h1.18v-2.68a2.85 2.85 0 0 1 2.85-2.86h5.25c1.58 0 2.86-1.271 2.86-2.851V4.86A2.86 2.86 0 0 0 14.14 2zm-.72 1.61c.4 0 .72.12.72.71s-.32.891-.72.891c-.39 0-.71-.3-.71-.89s.32-.711.71-.711"/><path fill="#fdd835" d="M17.959 7v2.68a2.85 2.85 0 0 1-2.85 2.859H9.86A2.85 2.85 0 0 0 7 15.389v3.75a2.86 2.86 0 0 0 2.86 2.86h4.28A2.86 2.86 0 0 0 17 19.14v-1.68h-4.291c-.39 0-.709-.57-.709-.96h7.14A2.86 2.86 0 0 0 22 13.64V9.86A2.86 2.86 0 0 0 19.14 7zM8.32 11.513l-.004.004.038-.004zm6.54 7.276c.39 0 .71.3.71.89a.71.71 0 0 1-.71.71c-.4 0-.72-.12-.72-.71s.32-.89.72-.89"/></svg>', p0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#8bc34a" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zm4 7.5h-4v2h1l-2 1.67L10 13h1v-2H7v2h1l3 2.5L8 18H7v2h4v-2h-1l2-1.67L14 18h-1v2h4v-2h-1l-3-2.5 3-2.5h1z"/></svg>', h0 = '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 16 16"><path fill="#0288d1" d="M2 2v12h12V2zm4 6h3v1H8v4H7V9H6zm5 0h2v1h-2v1h1a1.003 1.003 0 0 1 1 1v1a1.003 1.003 0 0 1-1 1h-2v-1h2v-1h-1a1.003 1.003 0 0 1-1-1V9a1.003 1.003 0 0 1 1-1"/></svg>', v0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ff9800" d="m24 6 2 6h-4l-2-6h-3l2 6h-4l-2-6h-3l2 6H8L6 6H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3V6Z"/></svg>', m0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#01579b" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zM7 13l1.5 7h2l1.5-3 1.5 3h2l1.5-7h1v-2h-4v2h1l-.9 4.2L13 15h-2l-1.1 2.2L9 13h1v-2H6v2z"/></svg>', y0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#8bc34a" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m.12 13.5 3.74 3.74 1.42-1.41-2.33-2.33 2.33-2.33-1.42-1.41zm11.16 0-3.74-3.74-1.42 1.41 2.33 2.33-2.33 2.33 1.42 1.41z"/></svg>', w0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ff5252" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2m12 16v-2H9v2zm-4-4v-2H6v2z"/></svg>', b0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#afb42b" d="M14 17h-2v-2h-2v-2h2v2h2m0-6h-2v2h2v2h-2v-2h-2V9h2V7h-2V5h2v2h2m5-4H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2"/></svg>', ca = `<!-- @license lucide-static v1.39.0 - ISC -->
<svg
  class="lucide lucide-arrow-down"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 5v14" />
  <path d="m19 12-7 7-7-7" />
</svg>
`, fa = `<!-- @license lucide-static v1.39.0 - ISC -->
<svg
  class="lucide lucide-arrow-up"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m5 12 7-7 7 7" />
  <path d="M12 19V5" />
</svg>
`, _0 = `<!-- @license lucide-static v1.39.0 - ISC -->
<svg
  class="lucide lucide-chevrons-down"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m7 6 5 5 5-5" />
  <path d="m7 13 5 5 5-5" />
</svg>
`, S0 = `<!-- @license lucide-static v1.39.0 - ISC -->
<svg
  class="lucide lucide-chevrons-up"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m17 11-5-5-5 5" />
  <path d="m17 18-5-5-5 5" />
</svg>
`, x0 = `<!-- @license lucide-static v1.39.0 - ISC -->
<svg
  class="lucide lucide-clipboard-paste"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M11 14h10" />
  <path d="M16 4h2a2 2 0 0 1 2 2v1.344" />
  <path d="m17 18 4-4-4-4" />
  <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113" />
  <rect x="8" y="2" width="8" height="4" rx="1" />
</svg>
`, R0 = `<!-- @license lucide-static v1.39.0 - ISC -->
<svg
  class="lucide lucide-copy"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
</svg>
`, C0 = `<!-- @license lucide-static v1.39.0 - ISC -->
<svg
  class="lucide lucide-file-plus"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
  <path d="M14 2v5a1 1 0 0 0 1 1h5" />
  <path d="M9 15h6" />
  <path d="M12 18v-6" />
</svg>
`, M0 = `<!-- @license lucide-static v1.39.0 - ISC -->
<svg
  class="lucide lucide-folder-plus"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 10v6" />
  <path d="M9 13h6" />
  <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
</svg>
`, I0 = `<!-- @license lucide-static v1.39.0 - ISC -->
<svg
  class="lucide lucide-indent-decrease"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M21 5H11" />
  <path d="M21 12H11" />
  <path d="M21 19H11" />
  <path d="m7 8-4 4 4 4" />
</svg>
`, E0 = `<!-- @license lucide-static v1.39.0 - ISC -->
<svg
  class="lucide lucide-indent-increase"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M21 5H11" />
  <path d="M21 12H11" />
  <path d="M21 19H11" />
  <path d="m3 8 4 4-4 4" />
</svg>
`, A0 = `<!-- @license lucide-static v1.39.0 - ISC -->
<svg
  class="lucide lucide-pencil"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
  <path d="m15 5 4 4" />
</svg>
`, O0 = `<!-- @license lucide-static v1.39.0 - ISC -->
<svg
  class="lucide lucide-redo-2"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m15 14 5-5-5-5" />
  <path d="M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13" />
</svg>
`, k0 = `<!-- @license lucide-static v1.39.0 - ISC -->
<svg
  class="lucide lucide-scissors"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="6" cy="6" r="3" />
  <path d="M8.12 8.12 12 12" />
  <path d="M20 4 8.12 15.88" />
  <circle cx="6" cy="18" r="3" />
  <path d="M14.8 14.8 20 20" />
</svg>
`, P0 = `<!-- @license lucide-static v1.39.0 - ISC -->
<svg
  class="lucide lucide-search"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m21 21-4.34-4.34" />
  <circle cx="11" cy="11" r="8" />
</svg>
`, D0 = `<!-- @license lucide-static v1.39.0 - ISC -->
<svg
  class="lucide lucide-square"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="18" height="18" x="3" y="3" rx="2" />
</svg>
`, T0 = `<!-- @license lucide-static v1.39.0 - ISC -->
<svg
  class="lucide lucide-square-check"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="18" height="18" x="3" y="3" rx="2" />
  <path d="m16 9-5.5 5.5L8 12" />
</svg>
`, F0 = `<!-- @license lucide-static v1.39.0 - ISC -->
<svg
  class="lucide lucide-trash-2"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M10 11v6" />
  <path d="M14 11v6" />
  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
  <path d="M3 6h18" />
  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
</svg>
`, H0 = `<!-- @license lucide-static v1.39.0 - ISC -->
<svg
  class="lucide lucide-undo-2"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M9 14 4 9l5-5" />
  <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" />
</svg>
`, L0 = ["aria-label"], j0 = {
  key: 0,
  class: "pnl-tst-tsep",
  "aria-hidden": "true"
}, z0 = {
  key: 1,
  class: "pnl-tst-search"
}, K0 = ["innerHTML"], V0 = ["value", "aria-label", "placeholder"], B0 = ["aria-label", "aria-keyshortcuts", "aria-disabled", "title", "tabindex", "onClick", "onFocus"], N0 = ["innerHTML"], $0 = {
  key: 1,
  class: "pnl-tst-empty"
}, W0 = ["aria-label", "aria-colcount", "aria-rowcount"], U0 = {
  class: "pnl-tst-hrow",
  role: "row",
  "aria-rowindex": 1
}, q0 = ["aria-colindex", "aria-sort", "aria-keyshortcuts", "tabindex", "onClick", "onFocus", "onKeydown"], G0 = { class: "pnl-tst-hlabel" }, X0 = ["innerHTML"], Y0 = ["onDblclick", "onMousedown", "onTouchstart"], Z0 = ["aria-level", "aria-posinset", "aria-setsize", "aria-rowindex", "aria-expanded", "aria-busy", "aria-selected", "aria-haspopup", "tabindex", "onClick", "onContextmenu", "onFocus"], J0 = ["aria-colindex", "onDblclick"], Q0 = ["onClick"], ey = {
  key: 1,
  class: "pnl-tst-twisty pnl-tst-twisty--leaf",
  "aria-hidden": "true"
}, ty = ["checked", ".indeterminate", "aria-label", "onClick"], ny = ["innerHTML"], ry = ["value", "aria-label", "aria-invalid", "onChange", "onKeydown", "onBlur"], oy = ["value"], sy = ["checked", "aria-label", "aria-invalid", "onChange", "onKeydown", "onBlur"], iy = ["type", "step", "min", "max", "value", "aria-label", "aria-invalid", "onKeydown", "onBlur"], ly = {
  key: 2,
  class: "pnl-tst-value"
}, ay = {
  key: 3,
  class: "pnl-tst-modal"
}, uy = {
  id: "pnl-tst-confirm-message",
  class: "pnl-tst-dialog-message"
}, cy = { class: "pnl-tst-dialog-actions" }, fy = ["aria-label"], dy = {
  key: 0,
  class: "pnl-tst-msep",
  role: "separator"
}, gy = ["aria-keyshortcuts", "aria-disabled", "tabindex", "onClick", "onFocus"], py = ["innerHTML"], hy = { class: "pnl-tst-mlabel" }, vy = {
  key: 0,
  class: "pnl-tst-mkeys",
  "aria-hidden": "true"
}, my = "title", yy = 200, da = 16, ga = 6, wy = 40, nr = "search", Kt = "|", Cn = 4, by = 500, _y = {
  __name: "TanstackTable",
  props: {
    // Python-owned state. The component reads it and never writes it back.
    state: { type: Object, required: !0 },
    // JS to Python channel. Emits intent only, never a mutated tree.
    emitEvent: { type: Function, required: !0 },
    // Two-way, set-semantics sync of the expanded key list.
    setExpandedKeys: { type: Function, required: !0 },
    // Two-way, set-semantics sync of the selected key list.
    setSelectedKeys: { type: Function, required: !0 },
    // Two-way sync of the view filter, written by the toolbar's search box.
    setFilterText: { type: Function, required: !0 },
    // Two-way sync of the row the inline editor is open on.
    setEditingKey: { type: Function, required: !0 },
    // Two-way sync of the column it is open on, "" for the tree column.
    setEditingColumn: { type: Function, required: !0 },
    // Two-way sync of the sort, as a list of {id, desc}.
    setSorting: { type: Function, required: !0 },
    // Two-way sync of the resized column widths, as a map of column id to pixels.
    setColumnWidths: { type: Function, required: !0 }
  },
  setup(e) {
    var al;
    const t = e, n = {
      columnSizingFeature: xv,
      columnResizingFeature: Sv,
      rowExpandingFeature: Rv,
      rowSelectionFeature: Lv,
      rowSortingFeature: jv,
      coreRowModel: Yu(),
      expandedRowModel: zv(),
      sortedRowModel: Bv(),
      sortFns: { alphanumeric: th, text: nh }
    }, r = N(() => (t.state.columns || []).length > 0), o = N(() => r.value && t.state.options.sortable !== !1), s = N(() => t.state.options.sort_folders_first === !0), l = N(() => r.value && t.state.options.resizable !== !1), u = N(
      () => (t.state.columns || []).slice(1).filter((i) => i.editable === !0)
    ), c = N(() => u.value.map((i) => String(i.id)));
    function d(i) {
      return u.value.find((a) => String(a.id) === i) ?? null;
    }
    function g(i) {
      var a;
      return String(((a = d(i)) == null ? void 0 : a.editor) || "text");
    }
    function h(i) {
      var a;
      return (((a = d(i)) == null ? void 0 : a.choices) || []).map((f) => String(f));
    }
    function y(i, a) {
      var v;
      const f = (v = d(i)) == null ? void 0 : v[a];
      return f ?? void 0;
    }
    const w = N(() => {
      const i = t.state.columns || [];
      return i.length === 0 ? [{ id: my, header: "", accessorFn: (a) => a.title }] : i.map((a) => {
        const f = a.field ?? a.id;
        return {
          id: a.id,
          header: a.header ?? a.id,
          // Through the type registry, because a type may carry a column value just as
          // it carries an icon, and because Python reads the same fields the same way
          // when it decides what a search reaches inside a pruned branch.
          accessorFn: (v) => x(v, f),
          enableSorting: a.sortable !== !1,
          enableResizing: a.resizable !== !1,
          // Written only where Python actually declared one, so the rest fall back to
          // TanStack's own defaults (150 wide, no narrower than 20) rather than to a
          // second set of numbers kept here.
          ...O("size", a.width),
          ...O("minSize", a.min_width),
          ...O("maxSize", a.max_width),
          // Only set when asked for, so an ordinary table keeps TanStack's own
          // detection of what a column holds rather than routing through ours.
          ...s.value ? { sortFn: K } : {}
        };
      });
    });
    function O(i, a) {
      return typeof a == "number" && Number.isFinite(a) ? { [i]: a } : {};
    }
    function x(i, a) {
      const f = i == null ? void 0 : i[a];
      if (f !== void 0) return f;
      const v = (t.state.types || {})[i == null ? void 0 : i.type];
      return v && typeof v == "object" ? v[a] : void 0;
    }
    function A(i) {
      return i.subRows.length > 0 || x(i.original, "allow_children") !== !1;
    }
    function K(i, a, f) {
      const v = A(i);
      if (v !== A(a)) {
        const I = we.value.some((L) => L.id === f && L.desc);
        return (v ? -1 : 1) * (I ? -1 : 1);
      }
      return ve.getColumn(f).getAutoSortFn()(i, a, f);
    }
    const S = /* @__PURE__ */ re(j(t.state.expandedKeys));
    function j(i) {
      const a = {};
      for (const f of i || []) a[f] = !0;
      return a;
    }
    function _(i) {
      return i === !0 ? ve.getCoreRowModel().flatRows.filter((a) => a.subRows.length > 0).map((a) => a.id).sort() : Object.keys(i).filter((a) => i[a]).sort();
    }
    const P = {
      audio: Jm,
      console: Qm,
      css: e0,
      database: t0,
      document: n0,
      file: r0,
      folder: o0,
      "folder-open": s0,
      html: i0,
      image: l0,
      javascript: a0,
      json: u0,
      markdown: c0,
      pdf: f0,
      powerpoint: d0,
      python: g0,
      table: p0,
      typescript: h0,
      video: v0,
      word: m0,
      xml: y0,
      yaml: w0,
      zip: b0
    };
    function z(i) {
      return i ? { ...P, ...t.state.icons || {} }[i] ?? null : null;
    }
    function Y(i) {
      const a = x(i.original, "icon");
      return a ? (jn(i) ? z(`${a}-open`) : null) ?? z(a) : null;
    }
    function $(i, a) {
      return i.length !== a.length ? !1 : i.every((f, v) => f === a[v]);
    }
    const H = N(() => t.state.options.select_mode ?? "none"), W = N(() => H.value !== "none"), ie = N(() => H.value === "hierarchy"), ce = N(
      () => W.value && t.state.options.show_checkboxes !== !1
    ), te = /* @__PURE__ */ re(j(t.state.selectedKeys)), we = /* @__PURE__ */ re(xe(t.state.sorting));
    function xe(i) {
      return (i || []).filter((a) => a && a.id).map((a) => ({ id: String(a.id), desc: a.desc === !0 }));
    }
    function fe(i, a) {
      return i.length === a.length && i.every((f, v) => f.id === a[v].id && f.desc === a[v].desc);
    }
    const oe = N(() => o.value && we.value.length > 0), ne = /* @__PURE__ */ re(Ze(t.state.columnWidths));
    function Ze(i) {
      const a = {};
      for (const [f, v] of Object.entries(i || {})) {
        const I = Math.round(Number(v));
        Number.isFinite(I) && I > 0 && (a[f] = I);
      }
      return a;
    }
    function dn(i, a) {
      const f = Object.keys(i);
      return f.length === Object.keys(a).length && f.every((v) => i[v] === a[v]);
    }
    const Be = /* @__PURE__ */ re(null), ve = Wv({
      features: n,
      data: N(() => t.state.view || []),
      columns: w,
      getRowId: (i) => i.key,
      getSubRows: (i) => i.children,
      // TanStack resets `expanded` whenever `data` changes. Python rewrites the
      // whole tree after every move, so leaving that on would collapse the tree on
      // each drop and push an empty `expanded_keys` back. Expansion is owned here.
      autoResetExpanded: !1,
      // The same bargain for the sort: a tree Python rewrote is not a user asking
      // for a different order, and dropping the sort on every move would undo the
      // one thing the header was pressed for.
      autoResetSorting: !1,
      enableRowSelection: W,
      enableMultiRowSelection: N(() => H.value !== "single"),
      enableSubRowSelection: ie,
      enableSorting: o,
      // One column at a time. ARIA asks that `aria-sort` name a single column, and a
      // treegrid sorted on two keys inside every parent is a thing no file manager
      // does and no screen reader can narrate.
      enableMultiSort: !1,
      // Third press clears the sort rather than going back to ascending, so the tree
      // order stays reachable without a separate control.
      enableSortingRemoval: !0,
      // Every column starts ascending. TanStack would otherwise start a numeric
      // column descending, which makes the same gesture mean two different things
      // depending on what a column happens to hold.
      sortDescFirst: !1,
      enableColumnResizing: l,
      // The columns follow the pointer rather than a guide line that commits on
      // release. It costs a render per frame of the drag, which is what a table with
      // every row in the DOM can afford today and what P15 has to look at again.
      columnResizeMode: "onChange",
      state: N(() => ({
        expanded: S.value,
        rowSelection: te.value,
        sorting: we.value,
        columnSizing: ne.value
      })),
      onExpandedChange: (i) => {
        S.value = typeof i == "function" ? i(S.value) : i;
      },
      onRowSelectionChange: (i) => {
        te.value = typeof i == "function" ? i(te.value) : i;
      },
      onSortingChange: (i) => {
        we.value = xe(typeof i == "function" ? i(we.value) : i);
      },
      onColumnSizingChange: (i) => {
        ne.value = Ze(
          typeof i == "function" ? i(ne.value) : i
        );
      }
    });
    function gn(i) {
      if (i.getIsSelected()) return "all";
      if (!ie.value || i.subRows.length === 0) return "none";
      const a = i.subRows.map(gn);
      return a.every((f) => f === "all") ? "all" : a.some((f) => f !== "none") ? "some" : "none";
    }
    be(() => _(te.value), t.setSelectedKeys, { flush: "post" }), be(() => _(S.value), t.setExpandedKeys, { flush: "post" }), be(
      () => t.state.expandedKeys,
      (i) => {
        $(_(S.value), [...i || []].sort()) || (S.value = j(i));
      }
    ), be(
      () => t.state.selectedKeys,
      (i) => {
        $(_(te.value), [...i || []].sort()) || (te.value = j(i));
      }
    ), be(() => we.value, t.setSorting, { flush: "post" }), be(
      () => t.state.sorting,
      (i) => {
        const a = xe(i);
        fe(we.value, a) || (we.value = a);
      }
    ), be(
      () => [ne.value, Be.value],
      ([i, a]) => {
        a || t.setColumnWidths(i);
      },
      { flush: "post" }
    ), be(
      () => t.state.columnWidths,
      (i) => {
        const a = Ze(i);
        dn(ne.value, a) || (ne.value = a);
      }
    ), be(
      () => [t.state.options.expand_all, t.state.view],
      ([i]) => {
        i && ve.toggleAllRowsExpanded(!0);
      },
      { immediate: !0 }
    );
    const $t = /* @__PURE__ */ re(t.state.filterText ?? ""), kr = N(() => $t.value.trim().toLowerCase()), Ae = N(() => kr.value.length > 0);
    let Je = null, Dt = t.state.filterText ?? "";
    be(
      () => t.state.filterText,
      (i) => {
        const a = i ?? "";
        a !== Dt && (Dt = a, $t.value = a);
      }
    );
    function Pr(i) {
      $t.value = i, Je !== null && clearTimeout(Je), Je = setTimeout(() => {
        Je = null, Dt = $t.value, t.setFilterText(Dt);
      }, yy);
    }
    rr(() => {
      Je !== null && clearTimeout(Je);
    });
    function Wt(i) {
      return i.getAllCells().some((a) => String(a.getValue() ?? "").toLowerCase().includes(kr.value));
    }
    const he = N(() => {
      if (!Ae.value) return ve.getRowModel().rows;
      const i = ve.getSortedRowModel().flatRows, a = /* @__PURE__ */ new Set();
      for (const f of i)
        if (Wt(f)) {
          a.add(f.id);
          for (let v = f.getParentRow(); v; v = v.getParentRow()) a.add(v.id);
        }
      return i.filter((f) => a.has(f.id));
    }), p = N(() => {
      var i;
      return ((i = ve.getHeaderGroups()[0]) == null ? void 0 : i.headers) ?? [];
    }), m = N(() => t.state.options.indent_px ?? 16), b = N(() => t.state.options.aria_label ?? "Tree table"), E = N(() => Ae.value ? "No matches" : "No data"), M = N(() => r.value ? 2 : 1), R = N(() => he.value.length + (r.value ? 1 : 0)), T = /* @__PURE__ */ re(!1), D = /* @__PURE__ */ re(null), k = /* @__PURE__ */ new Map();
    function C(i, a) {
      a ? k.set(i, a) : k.delete(i);
    }
    const B = N(() => {
      const i = p.value;
      return i.length === 0 ? null : i.some((f) => f.column.id === D.value) ? D.value : i[0].column.id;
    });
    function F(i) {
      const a = p.value;
      if (a.length === 0) return;
      const f = a[Math.max(0, Math.min(i, a.length - 1))];
      T.value = !0, D.value = f.column.id, Ke(() => {
        var v;
        return (v = k.get(f.column.id)) == null ? void 0 : v.focus();
      });
    }
    function V() {
      const i = p.value;
      F(i.findIndex((a) => a.column.id === B.value));
    }
    function U() {
      T.value = !1, Xo(yn.value);
    }
    function J(i) {
      return o.value && i.column.getCanSort();
    }
    function de(i) {
      if (!J(i)) return;
      const a = i.column.getIsSorted();
      return a === "asc" ? "ascending" : a === "desc" ? "descending" : "none";
    }
    function le(i) {
      if (!J(i)) return null;
      const a = i.column.getIsSorted();
      return a ? a === "asc" ? fa : ca : null;
    }
    function _e(i) {
      J(i) && i.column.toggleSorting();
    }
    function Ce(i) {
      F(p.value.indexOf(i)), _e(i);
    }
    function Oe(i) {
      return l.value && i.column.getCanResize();
    }
    function Ne(i) {
      var v;
      const a = i.column.id;
      if (a in ne.value) return null;
      const f = Math.round(((v = k.get(a)) == null ? void 0 : v.getBoundingClientRect().width) ?? 0);
      return f <= 0 || f === i.column.getSize() ? null : (ne.value = { ...ne.value, [a]: f }, f);
    }
    async function Tt(i, a) {
      if (!Oe(i)) return;
      a.stopPropagation(), Ne(i) !== null && await Ke(), i.getResizeHandler()(a), Be.value = i.column.id;
      const f = () => {
        Be.value = null;
      };
      for (const v of ["mouseup", "touchend", "touchcancel"])
        document.addEventListener(v, f, { once: !0 });
    }
    function Hn(i, a) {
      if (!Oe(i)) return;
      const f = i.column, v = f.columnDef.minSize ?? 20, I = f.columnDef.maxSize ?? Number.MAX_SAFE_INTEGER, L = Ne(i) ?? f.getSize(), ge = Math.min(Math.max(Math.round(L + a), v), I);
      ve.setColumnSizing((q) => ({ ...q, [f.id]: ge }));
    }
    function ke(i) {
      Oe(i) && i.column.resetSize();
    }
    function qe(i, a) {
      const f = p.value, v = Math.max(
        0,
        f.findIndex((I) => I.column.id === B.value)
      );
      if (a.altKey) {
        switch (a.key) {
          case "ArrowLeft":
            Hn(i, -da);
            break;
          case "ArrowRight":
            Hn(i, da);
            break;
          case "Home":
            ke(i);
            break;
          default:
            return;
        }
        a.preventDefault(), a.stopPropagation();
        return;
      }
      switch (a.key) {
        case "ArrowLeft":
          F(v - 1);
          break;
        case "ArrowRight":
          F(v + 1);
          break;
        case "Home":
          F(0);
          break;
        case "End":
          F(f.length - 1);
          break;
        case "ArrowDown":
          U();
          break;
        case "Enter":
        case " ":
          _e(i);
          break;
        default:
          return;
      }
      a.preventDefault(), a.stopPropagation();
    }
    const Ln = N(() => {
      const i = /* @__PURE__ */ new Map();
      for (const a of he.value) {
        const f = a.parentId ?? "", v = i.get(f) ?? [];
        v.push(a.id), i.set(f, v);
      }
      return i;
    });
    function pn(i) {
      return Ln.value.get(i.parentId ?? "") ?? [];
    }
    function Cc(i) {
      return pn(i).indexOf(i.id) + 1;
    }
    function Mc(i) {
      return pn(i).length;
    }
    function Dr(i) {
      return x(i.original, "lazy") === !0;
    }
    function hn(i) {
      return Ae.value ? (Ln.value.get(i.id) ?? []).length > 0 : i.getCanExpand() || Dr(i);
    }
    function jn(i) {
      return Ae.value ? hn(i) : i.getIsExpanded();
    }
    const Ut = /* @__PURE__ */ re(/* @__PURE__ */ new Set());
    function Uo(i) {
      return Ut.value.has(i.id) && Dr(i);
    }
    function qt(i, a) {
      if (a && Dr(i) && !Ut.value.has(i.id) && (Ut.value = new Set(Ut.value).add(i.id), t.emitEvent("lazy_load", { key: i.id })), !Dr(i) || !a || S.value === !0) {
        i.toggleExpanded(a);
        return;
      }
      S.value = { ...S.value, [i.id]: !0 };
    }
    be(he, (i) => {
      if (Ut.value.size === 0) return;
      const a = new Set(i.filter((f) => Uo(f)).map((f) => f.id));
      a.size !== Ut.value.size && (Ut.value = a);
    });
    const Ic = N(() => {
      if (!r.value) return {};
      const i = { "--pnl-tst-total": `${ve.getTotalSize()}px` };
      return p.value.forEach((a, f) => {
        i[`--pnl-tst-w${f}`] = `${a.column.getSize()}px`;
      }), i;
    }), Ec = N(() => {
      const i = p.value[0];
      return i ? i.column.id in ne.value : !1;
    });
    function qo(i) {
      return r.value ? i === 0 && !Ec.value ? { flex: "1 0 var(--pnl-tst-w0)" } : { flex: `0 0 var(--pnl-tst-w${i})` } : { flex: "1 1 0" };
    }
    function Ac(i) {
      return { ...qo(0), paddingInlineStart: `${i.depth * m.value}px` };
    }
    const zn = /* @__PURE__ */ re(null), Ai = /* @__PURE__ */ re(null), Tr = /* @__PURE__ */ re(0), Fr = /* @__PURE__ */ re(null), Kn = /* @__PURE__ */ re(0), Ft = /* @__PURE__ */ re(28);
    function Go() {
      var f;
      const i = zn.value;
      if (!i) return;
      const a = Number.parseFloat(getComputedStyle(i).getPropertyValue("--pnl-tst-row-height"));
      Number.isFinite(a) && a > 0 && (Ft.value = a), Kn.value = ((f = Ai.value) == null ? void 0 : f.offsetHeight) ?? 0, Fr.value = i.clientHeight, Tr.value = i.scrollTop;
    }
    const Oi = N(() => {
      const i = he.value.length;
      if (Fr.value === null) return { start: 0, end: Math.min(i, wy) };
      const a = Math.max(0, Tr.value - Kn.value), f = Math.max(0, Math.floor(a / Ft.value) - ga), v = Math.ceil(Fr.value / Ft.value) + ga * 2 + 1;
      return { start: f, end: Math.min(i, f + v) };
    }), ki = N(() => {
      const i = he.value, { start: a, end: f } = Oi.value, v = i.findIndex((L) => L.id === yn.value), I = [];
      v >= 0 && v < a && I.push({ row: i[v], index: v, held: !0 });
      for (let L = a; L < f; L += 1)
        I.push({ row: i[L], index: L, held: !1 });
      return v >= f && I.push({ row: i[v], index: v, held: !0 }), I;
    });
    function Oc(i) {
      return { position: "absolute", top: `${i * Ft.value}px`, left: "0" };
    }
    const kc = N(() => ({
      height: `${he.value.length * Ft.value}px`,
      paddingTop: `${Oi.value.start * Ft.value}px`
    }));
    function Pc(i) {
      Tr.value = i.currentTarget.scrollTop;
    }
    function Dc(i) {
      const a = zn.value;
      if (!a || Fr.value === null) return;
      const f = he.value.findIndex((L) => L.id === i);
      if (f < 0) return;
      const v = f * Ft.value + Kn.value, I = v + Ft.value;
      v < a.scrollTop + Kn.value ? a.scrollTop = v - Kn.value : I > a.scrollTop + a.clientHeight && (a.scrollTop = I - a.clientHeight), Tr.value = a.scrollTop;
    }
    function Xo(i, a = void 0) {
      i != null && (Dc(i), Ke(() => {
        var f;
        return (f = Vn.get(i)) == null ? void 0 : f.focus(a);
      }));
    }
    let mt = null;
    so(() => {
      Go(), typeof ResizeObserver == "function" && (mt = new ResizeObserver(() => Go()), zn.value && mt.observe(zn.value));
    }), rr(() => {
      mt == null || mt.disconnect(), mt = null;
    });
    function Tc(i) {
      zn.value = i ?? null, mt && (mt.disconnect(), i && (mt.observe(i), Ke(Go)));
    }
    const vn = /* @__PURE__ */ re(null), mn = /* @__PURE__ */ re(!0), Vn = /* @__PURE__ */ new Map();
    function Gt(i) {
      vn.value = i, mn.value = !0, T.value = !1;
    }
    function Fc(i, a) {
      a ? Vn.set(i, a) : Vn.delete(i);
    }
    const yn = N(() => {
      const i = he.value;
      return i.length === 0 ? null : i.some((a) => a.id === vn.value) ? vn.value : i[0].id;
    });
    function je(i) {
      i != null && (Gt(i), Xo(i));
    }
    function Hr(i) {
      const a = he.value;
      a.length !== 0 && je(a[Math.max(0, Math.min(i, a.length - 1))].id);
    }
    function Pi(i, a) {
      const f = he.value;
      if (f.length === 0) return;
      const v = f[Math.max(0, Math.min(i, f.length - 1))], I = (a == null ? void 0 : a.shiftKey) && W.value && H.value !== "single";
      I && yt.value === null && (yt.value = yn.value), je(v.id), I && Di(v, !1);
    }
    function Hc(i) {
      const a = he.value;
      if (a.length === 0) return;
      const f = Math.max(
        0,
        a.findIndex((L) => L.id === yn.value)
      ), v = a[f];
      if (i.ctrlKey || i.metaKey) {
        const L = {
          a: "select-all",
          c: "copy",
          f: nr,
          v: "paste",
          x: "cut",
          z: i.shiftKey ? "redo" : "undo"
        }[i.key.toLowerCase()];
        if (L && Bn(L)) {
          i.preventDefault(), Jo(L);
          return;
        }
      }
      if (i.altKey) {
        const L = {
          ArrowUp: "move-up",
          ArrowDown: "move-down",
          ArrowLeft: "outdent",
          ArrowRight: "indent"
        }[i.key];
        if (L && Bn(L)) {
          i.preventDefault(), Jo(L);
          return;
        }
      }
      if (Wr.value && (i.key === "ContextMenu" || i.key === "F10" && i.shiftKey)) {
        i.preventDefault(), bf(v);
        return;
      }
      const I = {
        Insert: i.shiftKey ? "new-file" : "new-folder",
        F2: "rename",
        Delete: "delete",
        Escape: "clear-selection"
      }[i.key];
      if (I && Bn(I)) {
        i.preventDefault(), Jo(I);
        return;
      }
      switch (i.key) {
        case "ArrowDown":
          i.preventDefault(), Pi(f + 1, i);
          break;
        case "ArrowUp":
          i.preventDefault(), f === 0 && r.value && !i.shiftKey ? V() : Pi(f - 1, i);
          break;
        case "ArrowRight":
          if (i.preventDefault(), !hn(v)) break;
          jn(v) ? Hr(f + 1) : (qt(v, !0), je(v.id));
          break;
        case "ArrowLeft":
          i.preventDefault(), !Ae.value && hn(v) && v.getIsExpanded() ? (qt(v, !1), je(v.id)) : v.parentId && je(v.parentId);
          break;
        case "Home":
          i.preventDefault(), Hr(0);
          break;
        case "End":
          i.preventDefault(), Hr(a.length - 1);
          break;
        case "F2":
          if (c.value.length === 0) break;
          i.preventDefault(), Xt(v.id, c.value[0]);
          break;
        case "Enter":
          i.preventDefault(), c.value.length > 0 ? Xt(v.id, c.value[0]) : t.emitEvent("activate", { key: v.id });
          break;
        case " ":
          if (!W.value) break;
          i.preventDefault(), Li(v);
          break;
      }
    }
    const yt = /* @__PURE__ */ re(null);
    function Lr(i) {
      yt.value = i.id, te.value = {}, i.toggleSelected(!0, { selectChildren: !1 });
    }
    function Di(i, a) {
      const f = he.value, v = f.findIndex((q) => q.id === yt.value), I = f.findIndex((q) => q.id === i.id);
      if (I === -1) return;
      if (v === -1) {
        Lr(i);
        return;
      }
      a || (te.value = {});
      const [L, ge] = v <= I ? [v, I] : [I, v];
      for (let q = L; q <= ge; q += 1)
        f[q].toggleSelected(!0, { selectChildren: !1 });
    }
    const Lc = N(() => t.state.options.toggle_on_click === !0);
    function jc(i) {
      const a = _(te.value);
      return a.length === 1 && a[0] === i.id;
    }
    function Ti() {
      te.value = {}, yt.value = null, mn.value = !1;
    }
    function Fi() {
      _(te.value).length === 0 && (mn.value = !1);
    }
    be(
      () => _(te.value).length > 0,
      (i) => {
        i && (mn.value = !0);
      }
    );
    function zc(i, a) {
      Gt(i.id);
      const f = !!(a != null && a.shiftKey || a != null && a.ctrlKey || a != null && a.metaKey);
      W.value && !f && Lc.value && jc(i) ? Ti() : W.value && H.value !== "single" ? a != null && a.shiftKey ? Di(i, a.ctrlKey || a.metaKey) : a != null && a.ctrlKey || a != null && a.metaKey ? (yt.value = i.id, Bc(i)) : Lr(i) : W.value && Lr(i), t.emitEvent("activate", { key: i.id });
    }
    function Kc(i) {
      Gt(i.id), !Ae.value && qt(i, !i.getIsExpanded());
    }
    function Hi(i) {
      return gn(i) === "all";
    }
    function Vc(i) {
      return gn(i) === "some";
    }
    function Bc(i) {
      Gt(i.id), i.toggleSelected(void 0, { selectChildren: !1 }), Fi();
    }
    function Li(i) {
      Gt(i.id), i.toggleSelected(!Hi(i), {
        selectChildren: ie.value,
        deselectParents: ie.value
      }), Fi();
    }
    function Nc(i) {
      Li(i), je(i.id);
    }
    const Yo = {
      "new-folder": { icon: M0, label: "New folder", keys: "Insert", node: {} },
      "new-file": {
        icon: C0,
        label: "New file",
        keys: "Shift+Insert",
        node: { allow_children: !1 }
      },
      rename: { icon: A0, label: "Rename", keys: "F2" },
      delete: { icon: F0, label: "Delete", keys: "Delete" },
      undo: { icon: H0, label: "Undo", keys: "Control+Z" },
      redo: { icon: O0, label: "Redo", keys: "Control+Shift+Z" },
      cut: { icon: k0, label: "Cut", keys: "Control+X" },
      copy: { icon: R0, label: "Copy", keys: "Control+C" },
      paste: { icon: x0, label: "Paste", keys: "Control+V" },
      "move-up": { icon: fa, label: "Move up", keys: "Alt+ArrowUp" },
      "move-down": { icon: ca, label: "Move down", keys: "Alt+ArrowDown" },
      outdent: { icon: I0, label: "Outdent", keys: "Alt+ArrowLeft" },
      indent: { icon: E0, label: "Indent", keys: "Alt+ArrowRight" },
      "expand-all": { icon: _0, label: "Expand all" },
      "collapse-all": { icon: S0, label: "Collapse all" },
      "select-all": { icon: T0, label: "Select all", keys: "Control+A" },
      "clear-selection": { icon: D0, label: "Clear selection", keys: "Escape" }
    }, $c = [
      "undo",
      "redo",
      Kt,
      "new-folder",
      "new-file",
      "rename",
      "delete",
      Kt,
      "cut",
      "copy",
      "paste",
      Kt,
      "move-up",
      "move-down",
      "outdent",
      "indent",
      Kt,
      "expand-all",
      "collapse-all",
      Kt,
      "select-all",
      "clear-selection",
      nr
    ], Wc = [
      "new-folder",
      "new-file",
      Kt,
      "rename",
      "delete",
      Kt,
      "cut",
      "copy",
      "paste"
    ];
    function ji(i, a) {
      const f = i === !0 ? a : Array.isArray(i) ? i : [], v = [];
      return f.forEach((I, L) => {
        const ge = typeof I == "string" ? {} : I || {}, q = typeof I == "string" ? I : ge.id, ul = `${q}#${L}`;
        if (q === Kt || q === nr) {
          v.push({ uid: ul, id: q });
          return;
        }
        const Qn = Yo[q];
        if (!Qn) return;
        const cl = ge.label ?? Qn.label;
        v.push({
          uid: ul,
          id: q,
          label: cl,
          icon: z(ge.icon) ?? Qn.icon,
          keys: Qn.keys,
          node: { title: cl, ...Qn.node ?? {}, ...ge.node ?? {} }
        });
      }), v;
    }
    const jr = N(() => ji(t.state.options.toolbar, $c)), Zo = N(
      () => ji(t.state.options.menu, Wc).filter((i) => i.id !== nr)
    ), Uc = N(() => jr.value.length > 0), qc = N(() => t.state.options.toolbar_label ?? "Tree actions"), zi = N(() => t.state.options.search_label ?? "Search");
    function Ki(i) {
      return jr.value.find((a) => a.id === i) ?? Zo.value.find((a) => a.id === i) ?? null;
    }
    function Bn(i) {
      return Ki(i) !== null;
    }
    function Jo(i) {
      const a = Ki(i);
      a && ls(a);
    }
    const ze = N(() => he.value.find((i) => i.id === yn.value) ?? null);
    function Gc(i) {
      return he.value.filter((a) => (a.parentId ?? "") === (i.parentId ?? ""));
    }
    function Vi() {
      const i = ze.value;
      if (!i) return [];
      const a = ol(i), f = i.parentId ?? "";
      return a.every((I) => {
        var L;
        return (((L = Sn(I)) == null ? void 0 : L.parentId) ?? "") === f;
      }) ? a : [i.id];
    }
    function Qo() {
      const i = ze.value;
      if (!i) return [];
      if (!W.value || !i.getIsSelected()) return [i.id];
      const a = he.value.filter((f) => f.getIsSelected()).map((f) => f.id);
      return a.length > 0 ? a : [i.id];
    }
    const es = N(() => {
      var i;
      return ((i = t.state.clipboard) == null ? void 0 : i.keys) ?? [];
    }), Xc = N(() => {
      var a;
      const i = new Set(((a = t.state.clipboard) == null ? void 0 : a.mode) === "cut" ? es.value : []);
      return i.size === 0 || he.value.forEach((f) => {
        f.parentId && i.has(f.parentId) && i.add(f.id);
      }), i;
    });
    function Nn(i) {
      const a = ze.value;
      if (!a) return null;
      const f = new Set(Vi()), v = Gc(a), I = v.map((ge, q) => f.has(ge.id) ? q : -1).filter((ge) => ge >= 0);
      if (I.length === 0) return null;
      let L = (i < 0 ? Math.min(...I) : Math.max(...I)) + i;
      for (; L >= 0 && L < v.length && f.has(v[L].id); ) L += i;
      return v[L] ?? null;
    }
    let Ge = null;
    be(
      () => t.state.view,
      () => {
        const i = Ge;
        if (Ge = null, !!i) {
          if (i.editor) {
            Ke(() => {
              var a;
              return (a = Lt.value) == null ? void 0 : a.focus();
            });
            return;
          }
          if (i.key !== void 0) {
            je(i.key);
            return;
          }
          Ke(() => {
            i.index !== void 0 ? Hr(i.index) : i.pasted !== void 0 ? Zc(i.pasted) : Yc(i.added);
          });
        }
      }
    );
    function Yc(i) {
      const a = ve.getCoreRowModel().flatRows.find((f) => !i.has(f.id));
      a && (je(a.id), W.value && (te.value = {}, yt.value = a.id, a.toggleSelected(!0, { selectChildren: !1 })), Bn("rename") && Ke(() => Wn(a.id, !0)));
    }
    function Zc(i) {
      const a = ve.getCoreRowModel().flatRows.filter((I) => !i.has(I.id)), f = new Set(a.map((I) => I.id)), v = a.filter((I) => !f.has(I.parentId ?? ""));
      v.length !== 0 && (je(v[0].id), W.value && (te.value = {}, yt.value = v[0].id, v.forEach((I) => I.toggleSelected(!0, { selectChildren: !1 }))));
    }
    const wt = /* @__PURE__ */ re(null), Re = /* @__PURE__ */ re(""), Ht = /* @__PURE__ */ re(""), Lt = /* @__PURE__ */ re(null), zr = /* @__PURE__ */ re(!1), Qe = /* @__PURE__ */ re(!1), bt = /* @__PURE__ */ re(null), ts = /* @__PURE__ */ re(null), ns = /* @__PURE__ */ re(null), Jc = N(() => t.state.options.extension_warning !== !1);
    function Bi(i) {
      const a = String(i ?? ""), f = a.lastIndexOf(".");
      return f < 0 ? "" : a.slice(f + 1).toLowerCase();
    }
    function Qc(i, a) {
      return Jc.value && x(i, "allow_children") === !1 && Bi(a) !== Bi(i.title ?? "");
    }
    let $n = null;
    function Wn(i, a = !1) {
      const f = Sn(i);
      f && ($n = a ? i : null, Ni(i, "", f.original.title ?? ""));
    }
    function Xt(i, a) {
      const f = Sn(i), v = d(a);
      if (!f || !v) return;
      $n = null;
      const I = Gi(f, a);
      zr.value = I === !0, Ni(i, a, I === !0 || I === !1 ? "" : I);
    }
    function Ni(i, a, f) {
      Qe.value = !1, Ht.value = f, wt.value = i, Re.value = a, t.setEditingKey(i), t.setEditingColumn(a), Ke(() => {
        var v, I, L;
        (v = Lt.value) == null || v.focus(), (L = (I = Lt.value) == null ? void 0 : I.select) == null || L.call(I);
      });
    }
    function Un() {
      $n = null, bt.value = null, wt.value = null, Re.value = "", Qe.value = !1, t.setEditingKey(""), t.setEditingColumn("");
    }
    function $i(i, a) {
      return i === 0 ? "" : String(a.column.id);
    }
    function ef(i, a, f) {
      return wt.value === i.id && Re.value === $i(a, f);
    }
    function Wi(i, a) {
      return i > 0 && c.value.includes(String(a.column.id));
    }
    function tf(i, a, f) {
      Wi(a, f) && Xt(i.id, String(f.column.id));
    }
    function rs(i, a, f) {
      const v = i.original.title ?? i.id;
      if (a === 0) return `Rename ${v}`;
      const I = d(String(f.column.id));
      return `${(I == null ? void 0 : I.header) ?? f.column.id} of ${v}`;
    }
    function nf(i) {
      Ht.value = i, Qe.value = !1;
    }
    function Ui(i, a, f) {
      Qe.value = !1, g(a) === "checkbox" ? zr.value = f === !0 : Ht.value = String(f), qi(i, a);
    }
    function rf(i, a = null) {
      if (bt.value || wt.value !== i.id || Re.value !== "") return;
      const f = Ht.value.trim(), v = f.length > 0 && f !== (i.original.title ?? "");
      if (v && $n !== i.id && Qc(i.original, f)) {
        bt.value = { key: i.id, title: f, previous: i.original.title ?? i.id }, Ke(() => {
          var I;
          return (I = ns.value) == null ? void 0 : I.focus();
        });
        return;
      }
      if (Xi(i, a), !v) {
        a === null && je(i.id);
        return;
      }
      Ge = a === null ? { key: i.id } : { editor: !0 }, t.emitEvent("rename", { key: i.id, title: f });
    }
    function qi(i, a, f = null) {
      if (wt.value !== i.id || Re.value !== a) return;
      const v = g(a) === "checkbox" ? zr.value : Ht.value, I = v !== Gi(i, a);
      if (Xi(i, f), !I) {
        f === null && je(i.id);
        return;
      }
      Ge = f === null ? { key: i.id } : { editor: !0 }, t.emitEvent("edit", { key: i.id, column: a, value: v });
    }
    function Gi(i, a) {
      const f = d(a), v = x(i.original, (f == null ? void 0 : f.field) ?? a);
      return g(a) === "checkbox" ? v === !0 : v == null ? "" : String(v);
    }
    function Xi(i, a) {
      a === null ? Un() : a === "" ? Wn(i.id) : Xt(i.id, a);
    }
    function os(i, a = null) {
      Re.value === "" ? rf(i, a) : qi(i, Re.value, a);
    }
    function ss(i, a, f) {
      wt.value === i.id && Re.value === $i(a, f) && os(i);
    }
    function Yi() {
      const { key: i, title: a } = bt.value;
      bt.value = null, Un(), Ge = { key: i }, t.emitEvent("rename", { key: i, title: a });
    }
    function Zi() {
      bt.value = null, Ke(() => {
        var i, a;
        (i = Lt.value) == null || i.focus(), (a = Lt.value) == null || a.select();
      });
    }
    function of(i) {
      var v;
      const a = i.key;
      if (a === "Escape" || a === "n" || a === "N") {
        i.preventDefault(), Zi();
        return;
      }
      if (a === "y" || a === "Y") {
        i.preventDefault(), Yi();
        return;
      }
      if (a !== "Tab" && a !== "ArrowLeft" && a !== "ArrowRight") return;
      i.preventDefault(), (v = (i.target === ts.value ? ns : ts).value) == null || v.focus();
    }
    function sf(i) {
      if (wt.value !== i.id) return;
      const a = $n === i.id;
      if (Un(), !a) {
        je(i.id);
        return;
      }
      Ge = { index: he.value.findIndex((f) => f.id === i.id) }, t.emitEvent("delete", { key: i.id, keys: [i.id] });
    }
    function lf() {
      return [...Bn("rename") ? [""] : [], ...c.value];
    }
    function af(i, a) {
      const f = lf(), v = f.indexOf(i);
      if (v < 0) return null;
      const I = f[v + a];
      return I === void 0 ? null : I;
    }
    function is(i, a) {
      if (a.key === "Enter")
        a.preventDefault(), os(i);
      else if (a.key === "Escape")
        a.preventDefault(), Re.value === "" ? sf(i) : (Un(), je(i.id));
      else if (a.key === "Tab") {
        const f = af(Re.value, a.shiftKey ? -1 : 1);
        if (f === null) return;
        a.preventDefault(), os(i, f);
      }
    }
    be(
      () => [t.state.editingKey || "", t.state.editingColumn || ""],
      ([i, a]) => {
        i === (wt.value || "") && a === Re.value || (i ? a ? Xt(i, a) : Wn(i) : Un());
      }
    );
    let Ji = ((al = t.state.editError) == null ? void 0 : al.seq) ?? 0;
    be(
      () => t.state.editError,
      (i) => {
        const a = (i == null ? void 0 : i.seq) ?? 0;
        if (!(i != null && i.key) || a === Ji) return;
        Ji = a;
        const f = String(i.column || "");
        d(f) && (Xt(i.key, f), wt.value === i.key && (Ht.value = i.value === void 0 || i.value === null ? "" : String(i.value), Qe.value = !0));
      }
    ), so(() => {
      t.state.editingKey && (t.state.editingColumn ? Xt(t.state.editingKey, t.state.editingColumn) : Wn(t.state.editingKey));
    });
    function Kr(i, a) {
      const f = ze.value;
      !f || !i || (Ge = { key: f.id }, t.emitEvent("move", {
        key: f.id,
        keys: Vi(),
        position: a,
        anchorKey: i.id
      }));
    }
    function uf(i) {
      const a = ze.value, f = a ? x(a.original, "allow_children") === !1 ? "after" : "child" : null;
      a && f === "child" && !Ae.value && qt(a, !0), Ge = { added: new Set(ve.getCoreRowModel().flatRows.map((v) => v.id)) }, t.emitEvent("add", { anchorKey: (a == null ? void 0 : a.id) ?? null, position: f, node: i.node });
    }
    function cf() {
      var a;
      const i = Qo();
      i.length !== 0 && (Ge = { index: he.value.findIndex((f) => {
        var v;
        return f.id === ((v = ze.value) == null ? void 0 : v.id);
      }) }, t.emitEvent("delete", { key: ((a = ze.value) == null ? void 0 : a.id) ?? null, keys: i }));
    }
    function ff(i) {
      Ge = { index: he.value.findIndex((a) => {
        var f;
        return a.id === ((f = ze.value) == null ? void 0 : f.id);
      }) }, t.emitEvent(i, {});
    }
    function df(i) {
      var f;
      const a = Qo();
      a.length !== 0 && t.emitEvent(i, { key: ((f = ze.value) == null ? void 0 : f.id) ?? null, keys: a });
    }
    function gf() {
      var v;
      const i = ze.value, a = i ? x(i.original, "allow_children") === !1 ? "after" : "child" : null;
      i && a === "child" && !Ae.value && qt(i, !0);
      const f = es.value;
      Ge = ((v = t.state.clipboard) == null ? void 0 : v.mode) === "cut" ? { key: f[0] } : { pasted: new Set(ve.getCoreRowModel().flatRows.map((I) => I.id)) }, t.emitEvent("paste", { anchorKey: (i == null ? void 0 : i.id) ?? null, position: a });
    }
    function qn(i) {
      var a;
      switch (i.id) {
        case "new-folder":
        case "new-file":
          return !0;
        case "rename":
          return ze.value !== null;
        case "delete":
        case "cut":
        case "copy":
          return Qo().length > 0;
        case "paste":
          return es.value.length > 0;
        case "undo":
          return t.state.canUndo === !0;
        case "redo":
          return t.state.canRedo === !0;
        case "move-up":
        case "move-down":
          return !oe.value && Nn(i.id === "move-up" ? -1 : 1) !== null;
        case "indent": {
          const f = Nn(-1);
          return f !== null && x(f.original, "allow_children") !== !1;
        }
        case "outdent":
          return !!((a = ze.value) != null && a.parentId);
        case "expand-all":
        case "collapse-all":
          return he.value.length > 0 && !Ae.value;
        case "select-all":
          return he.value.length > 0 && W.value && H.value !== "single";
        case "clear-selection":
          return W.value && _(te.value).length > 0;
        default:
          return !0;
      }
    }
    function Qi(i) {
      return i.keys ? i.keys.replace("Control", "Ctrl") : "";
    }
    function pf(i) {
      return i.keys ? `${i.label} (${Qi(i)})` : i.label;
    }
    function ls(i) {
      var a, f, v, I;
      if (qn(i))
        switch (i.id) {
          case "new-folder":
          case "new-file":
            uf(i);
            break;
          case "rename":
            Wn(ze.value.id);
            break;
          case "delete":
            cf();
            break;
          case "undo":
          case "redo":
            ff(i.id);
            break;
          case "cut":
          case "copy":
            df(i.id);
            break;
          case "paste":
            gf();
            break;
          case "move-up":
            Kr(Nn(-1), "before");
            break;
          case "move-down":
            Kr(Nn(1), "after");
            break;
          case "indent": {
            const L = Nn(-1);
            L && !Ae.value && qt(L, !0), Kr(L, "child");
            break;
          }
          case "outdent":
            Kr(Sn((a = ze.value) == null ? void 0 : a.parentId), "after");
            break;
          case "expand-all":
            ve.toggleAllRowsExpanded(!0);
            break;
          case "collapse-all":
            ve.toggleAllRowsExpanded(!1);
            break;
          case "select-all":
            te.value = Object.fromEntries(he.value.map((L) => [L.id, !0])), yt.value = ((f = he.value[0]) == null ? void 0 : f.id) ?? null;
            break;
          case "clear-selection":
            Ti();
            break;
          case nr:
            (v = as.value) == null || v.focus(), (I = as.value) == null || I.select();
            break;
        }
    }
    const as = /* @__PURE__ */ re(null), us = N(() => jr.value.filter((i) => i.id in Yo)), Vr = /* @__PURE__ */ re(null), cs = /* @__PURE__ */ new Map(), el = N(() => {
      const i = us.value;
      return i.length === 0 ? null : i.some((a) => a.uid === Vr.value) ? Vr.value : i[0].uid;
    });
    function hf(i, a) {
      a ? cs.set(i, a) : cs.delete(i);
    }
    function Br(i) {
      const a = us.value;
      if (a.length === 0) return;
      const f = a[Math.max(0, Math.min(i, a.length - 1))].uid;
      Vr.value = f, Ke(() => {
        var v;
        return (v = cs.get(f)) == null ? void 0 : v.focus();
      });
    }
    function vf(i) {
      const a = us.value, f = Math.max(
        0,
        a.findIndex((v) => v.uid === el.value)
      );
      switch (i.key) {
        case "ArrowRight":
          i.preventDefault(), Br(f + 1);
          break;
        case "ArrowLeft":
          i.preventDefault(), Br(f - 1);
          break;
        case "Home":
          i.preventDefault(), Br(0);
          break;
        case "End":
          i.preventDefault(), Br(a.length - 1);
          break;
      }
    }
    const Gn = /* @__PURE__ */ re(!1), Nr = /* @__PURE__ */ re(null), Xn = /* @__PURE__ */ re({ left: 0, top: 0 }), $r = /* @__PURE__ */ re(null), wn = /* @__PURE__ */ re(0), fs = /* @__PURE__ */ new Map(), Yn = N(() => Zo.value.filter((i) => i.id in Yo)), Wr = N(() => Yn.value.length > 0), mf = N(() => t.state.options.menu_label ?? "Row actions");
    function yf(i, a) {
      a ? fs.set(i, a) : fs.delete(i);
    }
    function tl(i) {
      return Yn.value.findIndex((a) => a.uid === i.uid);
    }
    function nl(i, a, f) {
      if (!Wr.value) return;
      vn.value !== i.id && Gt(i.id), Nr.value = i.id, Xn.value = { left: a, top: f };
      const v = Yn.value.findIndex((I) => qn(I));
      wn.value = Math.max(0, v), Gn.value = !0, Ke(_f);
    }
    function wf(i, a) {
      Wr.value && (a.preventDefault(), W.value && !i.getIsSelected() && Lr(i), nl(i, a.clientX, a.clientY));
    }
    function bf(i) {
      var f;
      const a = (f = Vn.get(i.id)) == null ? void 0 : f.getBoundingClientRect();
      nl(i, a ? a.left + m.value : Cn, a ? a.bottom : Cn);
    }
    function _f() {
      const i = $r.value;
      if (!i) return;
      const a = i.getBoundingClientRect();
      let { left: f, top: v } = Xn.value;
      f + a.width > window.innerWidth - Cn && (f = Math.max(Cn, f - a.width)), v + a.height > window.innerHeight - Cn && (v = Math.max(Cn, v - a.height)), Xn.value = { left: f, top: v }, Zn(wn.value);
    }
    function Zn(i) {
      const a = Yn.value;
      if (a.length === 0) return;
      const f = Math.max(0, Math.min(i, a.length - 1));
      wn.value = f, Ke(() => {
        var v;
        return (v = fs.get(a[f].uid)) == null ? void 0 : v.focus();
      });
    }
    function Ur(i = !0, a = void 0) {
      if (!Gn.value) return;
      const f = Nr.value;
      Gn.value = !1, Nr.value = null, i && f != null && Xo(f, a);
    }
    function Sf(i) {
      if (!qn(i)) return;
      const a = Nr.value;
      Ur(!1), je(a), ls(i);
    }
    function xf(i) {
      const a = wn.value;
      switch (i.key) {
        case "ArrowDown":
          i.preventDefault(), Zn(a + 1);
          break;
        case "ArrowUp":
          i.preventDefault(), Zn(a - 1);
          break;
        case "Home":
          i.preventDefault(), Zn(0);
          break;
        case "End":
          i.preventDefault(), Zn(Yn.value.length - 1);
          break;
        case "Escape":
        case "Tab":
          i.preventDefault(), Ur();
          break;
      }
    }
    function ds(i) {
      $r.value && i.composedPath().includes($r.value) || Ur(!1);
    }
    function bn() {
      Ur(!0, { preventScroll: !0 });
    }
    be(Gn, (i) => {
      i ? (document.addEventListener("pointerdown", ds, !0), window.addEventListener("resize", bn), window.addEventListener("scroll", bn, !0)) : (document.removeEventListener("pointerdown", ds, !0), window.removeEventListener("resize", bn), window.removeEventListener("scroll", bn, !0));
    }), rr(() => {
      document.removeEventListener("pointerdown", ds, !0), window.removeEventListener("resize", bn), window.removeEventListener("scroll", bn, !0);
    });
    const Rf = ["reorder-above", "reorder-below", "make-child", "reparent"], gs = N(() => t.state.options.enable_dnd === !0), ps = N(() => String(t.state.options.transfer_group || "")), _n = N(() => String(t.state.tableId || "")), rl = /* @__PURE__ */ re([]), qr = /* @__PURE__ */ re(null);
    function Sn(i) {
      return he.value.find((a) => a.id === i) ?? null;
    }
    function Cf(i, a) {
      let f = i;
      for (; f; ) {
        if (a.includes(f.id)) return !0;
        f = f.getParentRow();
      }
      return !1;
    }
    function ol(i) {
      if (!W.value || !i.getIsSelected()) return [i.id];
      const a = /* @__PURE__ */ new Set();
      for (let v = i.getParentRow(); v; v = v.getParentRow()) a.add(v.id);
      const f = he.value.filter((v) => v.getIsSelected() && !a.has(v.id)).map((v) => v.id);
      return f.length > 1 ? f : [i.id];
    }
    function Mf(i, a, f) {
      if (!f && Cf(i, a)) return Rf;
      const v = oe.value ? ["reorder-above", "reorder-below"] : [];
      return x(i.original, "allow_children") === !1 && v.push("make-child"), v;
    }
    function If(i) {
      if (hn(i) && jn(i)) return "expanded";
      const a = pn(i);
      return a[a.length - 1] === i.id ? "last-in-group" : "standard";
    }
    let hs = null, Jn = null;
    function vs() {
      Jn && clearTimeout(Jn), Jn = null, hs = null;
    }
    function Ef(i, a) {
      if (hs === i || (vs(), !a || a.type === "instruction-blocked")) return;
      const f = Sn(i);
      !f || !f.getCanExpand() || f.getIsExpanded() || (hs = i, Jn = setTimeout(() => {
        Jn = null;
        const v = Sn(i);
        v && v.getCanExpand() && !v.getIsExpanded() && qt(v, !0);
      }, by));
    }
    function Af() {
      qr.value = null, vs();
    }
    const sl = /* @__PURE__ */ re(null);
    function Of() {
      let i = sl.value;
      if (!i) return null;
      let a = i.getRootNode();
      for (; a.host; )
        i = a.host, a = i.getRootNode();
      return i;
    }
    function Gr(i) {
      for (const { row: a } of ki.value) {
        const f = Vn.get(a.id);
        if (!f) continue;
        const v = f.getBoundingClientRect();
        if (i.clientX >= v.left && i.clientX < v.right && i.clientY >= v.top && i.clientY < v.bottom)
          return { row: a, element: f, rect: v };
      }
      return null;
    }
    function kf(i, a) {
      const f = ".pnl-tst-check, .pnl-tst-twisty, .pnl-tst-edit";
      for (const v of i.element.querySelectorAll(f)) {
        const I = v.getBoundingClientRect();
        if (a.clientX >= I.left && a.clientX < I.right && a.clientY >= I.top && a.clientY < I.bottom)
          return !0;
      }
      return !1;
    }
    const Pf = {
      id: () => _n.value,
      // Anything outside a row (the header, the empty space below the last row) is
      // not a drag handle, and neither is a row control.
      canDragFrom(i) {
        const a = Gr(i);
        return a !== null && !kf(a, i);
      },
      dragData(i) {
        const a = Gr(i);
        return a ? {
          type: kn,
          group: ps.value,
          sourceId: _n.value,
          key: a.row.id,
          keys: ol(a.row)
        } : null;
      },
      // The registered element is the host, so the default preview would be a
      // snapshot of the whole layout. Point it at the row being dragged, offset so
      // the preview stays under the cursor where it was grabbed.
      preview(i, a) {
        const f = Gr(i);
        return f ? (a(f.element, i.clientX - f.rect.left, i.clientY - f.rect.top), !0) : !1;
      },
      setDragging(i) {
        rl.value = i;
      },
      // Our own rows always. Another pane's only when both name the same group, so a
      // table that opted into nothing shows no drop state at all rather than
      // accepting a drag Python is bound to reject.
      dropData(i, a) {
        const f = Gr(i);
        if (!f) return null;
        const v = a.sourceId !== _n.value;
        if (v && !(ps.value && a.group === ps.value))
          return { type: kn, key: null, paneId: _n.value };
        const I = { type: kn, key: f.row.id, paneId: _n.value };
        return nm(I, {
          element: f.element,
          input: i,
          currentLevel: f.row.depth,
          indentPerLevel: m.value,
          mode: If(f.row),
          block: Mf(f.row, a.keys ?? [], v)
        });
      },
      showDrop(i, a) {
        qr.value = { key: i, instruction: a }, Ef(i, a);
      },
      clearDrop: Af,
      drop(i, a, f, v) {
        const I = i.keys ?? [];
        if (I.length === 0) return;
        const L = {
          targetKey: a,
          instruction: f.type,
          desiredLevel: f.desiredLevel ?? f.currentLevel
        };
        if (i.sourceId === _n.value) {
          if (I.includes(a)) return;
          t.emitEvent("move", { key: i.key, keys: I, ...L });
          return;
        }
        Ge = { pasted: new Set(ve.getCoreRowModel().flatRows.map((ge) => ge.id)) }, t.emitEvent("transfer", {
          keys: I,
          sourceId: i.sourceId,
          copy: !!(v != null && v.ctrlKey || v != null && v.altKey),
          ...L
        });
      }
    };
    let jt = null;
    function il() {
      jt == null || jt(), jt = null;
      const i = Of();
      !i || !gs.value || (jt = Zm(i, Pf));
    }
    so(il), be(gs, il), rr(() => {
      vs(), jt == null || jt();
    });
    function ms(i) {
      var a;
      return ((a = qr.value) == null ? void 0 : a.key) === i.id ? qr.value.instruction : null;
    }
    function Df(i) {
      const a = x(i.original, "class");
      return typeof a == "string" ? a : null;
    }
    function Tf(i) {
      const a = ms(i);
      return {
        "pnl-tst-row--draggable": gs.value,
        "pnl-tst-row--dragging": rl.value.includes(i.id),
        "pnl-tst-row--blocked": (a == null ? void 0 : a.type) === "instruction-blocked",
        "pnl-tst-row--child-target": (a == null ? void 0 : a.type) === "make-child"
      };
    }
    function ll(i) {
      const a = ms(i);
      return a ? a.type === "reorder-above" ? "pnl-tst-dropline--above" : a.type === "reorder-below" || a.type === "reparent" ? "pnl-tst-dropline--below" : null : null;
    }
    function Ff(i) {
      const a = ms(i);
      return a ? { insetInlineStart: `${(a.type === "reparent" ? a.desiredLevel : a.currentLevel) * a.indentPerLevel}px` } : null;
    }
    return (i, a) => (Z(), Q("div", {
      ref_key: "rootElement",
      ref: sl,
      class: "pnl-tst"
    }, [
      Uc.value ? (Z(), Q("div", {
        key: 0,
        class: "pnl-tst-toolbar",
        role: "toolbar",
        "aria-orientation": "horizontal",
        "aria-label": qc.value
      }, [
        (Z(!0), Q(Ee, null, Rn(jr.value, (f) => (Z(), Q(Ee, {
          key: f.uid
        }, [
          f.id === "|" ? (Z(), Q("span", j0)) : f.id === "search" ? (Z(), Q("label", z0, [
            Me("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: tn(P0)
            }, null, 8, K0),
            Me("input", {
              ref_for: !0,
              ref: (v) => as.value = v,
              type: "search",
              value: $t.value,
              "aria-label": zi.value,
              placeholder: zi.value,
              onInput: a[0] || (a[0] = (v) => Pr(v.target.value))
            }, null, 40, V0)
          ])) : (Z(), Q("button", {
            key: 2,
            ref_for: !0,
            ref: (v) => hf(f.uid, v),
            type: "button",
            class: "pnl-tst-tbtn",
            "aria-label": f.label,
            "aria-keyshortcuts": f.keys,
            "aria-disabled": !qn(f),
            title: pf(f),
            tabindex: f.uid === el.value ? 0 : -1,
            onClick: (v) => ls(f),
            onFocus: (v) => Vr.value = f.uid,
            onKeydown: vf
          }, [
            Me("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: f.icon
            }, null, 8, N0)
          ], 40, B0))
        ], 64))), 128))
      ], 8, L0)) : et("", !0),
      he.value.length === 0 ? (Z(), Q("div", $0, St(E.value), 1)) : (Z(), Q("div", {
        key: 2,
        ref: Tc,
        class: We(["pnl-tst-grid", { "pnl-tst-grid--resizing": Be.value !== null }]),
        role: "treegrid",
        "aria-label": b.value,
        "aria-colcount": p.value.length,
        "aria-rowcount": R.value,
        style: at(Ic.value),
        onKeydown: Hc,
        onScroll: Pc
      }, [
        r.value ? (Z(), Q("div", {
          key: 0,
          ref_key: "headElement",
          ref: Ai,
          class: "pnl-tst-head",
          role: "rowgroup"
        }, [
          Me("div", U0, [
            (Z(!0), Q(Ee, null, Rn(p.value, (f, v) => (Z(), Q("div", {
              key: f.id,
              ref_for: !0,
              ref: (I) => C(f.column.id, I),
              class: We(["pnl-tst-hcell", { "pnl-tst-hcell--sortable": J(f) }]),
              role: "columnheader",
              "aria-colindex": v + 1,
              "aria-sort": de(f),
              "aria-keyshortcuts": Oe(f) ? "Alt+ArrowLeft Alt+ArrowRight Alt+Home" : void 0,
              tabindex: T.value && f.column.id === B.value ? 0 : -1,
              style: at(qo(v)),
              onClick: (I) => Ce(f),
              onFocus: (I) => D.value = f.column.id,
              onKeydown: (I) => qe(f, I)
            }, [
              Me("span", G0, St(f.column.columnDef.header), 1),
              le(f) ? (Z(), Q("span", {
                key: 0,
                class: "pnl-tst-sortind",
                "aria-hidden": "true",
                innerHTML: le(f)
              }, null, 8, X0)) : et("", !0),
              Oe(f) ? (Z(), Q("span", {
                key: 1,
                class: We(["pnl-tst-resize", { "pnl-tst-resize--active": Be.value === f.column.id }]),
                "aria-hidden": "true",
                onClick: a[1] || (a[1] = $e(() => {
                }, ["stop"])),
                onDblclick: $e((I) => ke(f), ["stop"]),
                onMousedown: (I) => Tt(f, I),
                onTouchstart: (I) => Tt(f, I)
              }, null, 42, Y0)) : et("", !0)
            ], 46, q0))), 128))
          ])
        ], 512)) : et("", !0),
        Me("div", {
          class: "pnl-tst-body",
          role: "rowgroup",
          style: at(kc.value)
        }, [
          (Z(!0), Q(Ee, null, Rn(ki.value, ({ row: f, index: v, held: I }) => (Z(), Q("div", {
            key: f.id,
            ref_for: !0,
            ref: (L) => Fc(f.id, L),
            class: We(["pnl-tst-row", [
              Tf(f),
              Df(f),
              {
                "pnl-tst-row--active": mn.value && f.id === vn.value,
                "pnl-tst-row--quiet": !mn.value && f.id === vn.value,
                "pnl-tst-row--cut": Xc.value.has(f.id)
              }
            ]]),
            style: at(I ? Oc(v) : void 0),
            role: "row",
            "aria-level": f.depth + 1,
            "aria-posinset": Cc(f),
            "aria-setsize": Mc(f),
            "aria-rowindex": v + M.value,
            "aria-expanded": hn(f) ? jn(f) : void 0,
            "aria-busy": Uo(f) ? "true" : void 0,
            "aria-selected": W.value ? f.getIsSelected() : void 0,
            "aria-haspopup": Wr.value ? "menu" : void 0,
            tabindex: !T.value && f.id === yn.value ? 0 : -1,
            onClick: (L) => zc(f, L),
            onContextmenu: (L) => wf(f, L),
            onFocus: (L) => Gt(f.id)
          }, [
            ll(f) ? (Z(), Q("span", {
              key: 0,
              class: We(["pnl-tst-dropline", ll(f)]),
              style: at(Ff(f)),
              "aria-hidden": "true"
            }, null, 6)) : et("", !0),
            (Z(!0), Q(Ee, null, Rn(f.getAllCells(), (L, ge) => (Z(), Q("div", {
              key: L.id,
              class: We(["pnl-tst-cell", {
                "pnl-tst-cell--tree": ge === 0,
                "pnl-tst-cell--editable": Wi(ge, L)
              }]),
              role: "gridcell",
              "aria-colindex": ge + 1,
              style: at(ge === 0 ? Ac(f) : qo(ge)),
              onDblclick: (q) => tf(f, ge, L)
            }, [
              ge === 0 ? (Z(), Q(Ee, { key: 0 }, [
                hn(f) ? (Z(), Q("span", {
                  key: 0,
                  class: We(["pnl-tst-twisty", {
                    "pnl-tst-twisty--open": jn(f),
                    "pnl-tst-twisty--busy": Uo(f)
                  }]),
                  "aria-hidden": "true",
                  onClick: $e((q) => Kc(f), ["stop"])
                }, [...a[9] || (a[9] = [
                  Me("svg", {
                    viewBox: "0 0 16 16",
                    width: "12",
                    height: "12",
                    focusable: "false"
                  }, [
                    Me("path", {
                      d: "M6 3.5 10.5 8 6 12.5",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "1.6"
                    })
                  ], -1)
                ])], 10, Q0)) : (Z(), Q("span", ey)),
                ce.value ? (Z(), Q("input", {
                  key: 2,
                  class: "pnl-tst-check",
                  type: "checkbox",
                  tabindex: "-1",
                  checked: Hi(f),
                  ".indeterminate": Vc(f),
                  "aria-label": `Select ${f.original.title ?? f.id}`,
                  onClick: $e((q) => Nc(f), ["stop"])
                }, null, 40, ty)) : et("", !0),
                Y(f) ? (Z(), Q("span", {
                  key: 3,
                  class: "pnl-tst-icon",
                  "aria-hidden": "true",
                  innerHTML: Y(f)
                }, null, 8, ny)) : et("", !0)
              ], 64)) : et("", !0),
              ef(f, ge, L) ? (Z(), Q(Ee, { key: 1 }, [
                g(Re.value) === "select" ? (Z(), Q("select", {
                  key: 0,
                  ref_for: !0,
                  ref: (q) => Lt.value = q,
                  class: We(["pnl-tst-edit pnl-tst-edit--select", { "pnl-tst-edit--invalid": Qe.value }]),
                  value: Ht.value,
                  "aria-label": rs(f, ge, L),
                  "aria-invalid": Qe.value ? "true" : void 0,
                  onChange: (q) => Ui(f, Re.value, q.target.value),
                  onClick: a[2] || (a[2] = $e(() => {
                  }, ["stop"])),
                  onDblclick: a[3] || (a[3] = $e(() => {
                  }, ["stop"])),
                  onKeydown: $e((q) => is(f, q), ["stop"]),
                  onBlur: (q) => ss(f, ge, L)
                }, [
                  (Z(!0), Q(Ee, null, Rn(h(Re.value), (q) => (Z(), Q("option", {
                    key: q,
                    value: q
                  }, St(q), 9, oy))), 128))
                ], 42, ry)) : g(Re.value) === "checkbox" ? (Z(), Q("input", {
                  key: 1,
                  ref_for: !0,
                  ref: (q) => Lt.value = q,
                  class: We(["pnl-tst-edit pnl-tst-edit--check", { "pnl-tst-edit--invalid": Qe.value }]),
                  type: "checkbox",
                  checked: zr.value,
                  "aria-label": rs(f, ge, L),
                  "aria-invalid": Qe.value ? "true" : void 0,
                  onChange: (q) => Ui(f, Re.value, q.target.checked),
                  onClick: a[4] || (a[4] = $e(() => {
                  }, ["stop"])),
                  onDblclick: a[5] || (a[5] = $e(() => {
                  }, ["stop"])),
                  onKeydown: $e((q) => is(f, q), ["stop"]),
                  onBlur: (q) => ss(f, ge, L)
                }, null, 42, sy)) : (Z(), Q("input", {
                  key: 2,
                  ref_for: !0,
                  ref: (q) => Lt.value = q,
                  class: We(["pnl-tst-edit", { "pnl-tst-edit--invalid": Qe.value }]),
                  type: g(Re.value) === "number" ? "number" : "text",
                  step: y(Re.value, "step"),
                  min: y(Re.value, "min"),
                  max: y(Re.value, "max"),
                  value: Ht.value,
                  "aria-label": rs(f, ge, L),
                  "aria-invalid": Qe.value ? "true" : void 0,
                  onInput: a[6] || (a[6] = (q) => nf(q.target.value)),
                  onClick: a[7] || (a[7] = $e(() => {
                  }, ["stop"])),
                  onDblclick: a[8] || (a[8] = $e(() => {
                  }, ["stop"])),
                  onKeydown: $e((q) => is(f, q), ["stop"]),
                  onBlur: (q) => ss(f, ge, L)
                }, null, 42, iy))
              ], 64)) : (Z(), Q("span", ly, St(L.getValue()), 1))
            ], 46, J0))), 128))
          ], 46, Z0))), 128))
        ], 4)
      ], 46, W0)),
      bt.value ? (Z(), Q("div", ay, [
        Me("div", {
          class: "pnl-tst-dialog",
          role: "alertdialog",
          "aria-modal": "true",
          "aria-label": "Rename",
          "aria-describedby": "pnl-tst-confirm-message",
          onKeydown: of
        }, [
          Me("p", uy, " Rename " + St(bt.value.previous) + " to " + St(bt.value.title) + "? If you change a file name extension, the file might become unusable. ", 1),
          Me("div", cy, [
            Me("button", {
              ref_key: "confirmYesButton",
              ref: ts,
              type: "button",
              class: "pnl-tst-dbtn",
              "aria-keyshortcuts": "Y",
              onClick: Yi
            }, [...a[10] || (a[10] = [
              Me("span", { class: "pnl-tst-dkey" }, "Y", -1),
              qs("es ", -1)
            ])], 512),
            Me("button", {
              ref_key: "confirmNoButton",
              ref: ns,
              type: "button",
              class: "pnl-tst-dbtn",
              "aria-keyshortcuts": "N",
              onClick: Zi
            }, [...a[11] || (a[11] = [
              Me("span", { class: "pnl-tst-dkey" }, "N", -1),
              qs("o ", -1)
            ])], 512)
          ])
        ], 32)
      ])) : et("", !0),
      Gn.value ? (Z(), Q("div", {
        key: 4,
        ref_key: "menuElement",
        ref: $r,
        class: "pnl-tst-menu",
        role: "menu",
        "aria-orientation": "vertical",
        "aria-label": mf.value,
        style: at({ left: `${Xn.value.left}px`, top: `${Xn.value.top}px` }),
        onKeydown: xf
      }, [
        (Z(!0), Q(Ee, null, Rn(Zo.value, (f) => (Z(), Q(Ee, {
          key: f.uid
        }, [
          f.id === "|" ? (Z(), Q("div", dy)) : (Z(), Q("button", {
            key: 1,
            ref_for: !0,
            ref: (v) => yf(f.uid, v),
            type: "button",
            class: "pnl-tst-mitem",
            role: "menuitem",
            "aria-keyshortcuts": f.keys,
            "aria-disabled": !qn(f),
            tabindex: tl(f) === wn.value ? 0 : -1,
            onClick: (v) => Sf(f),
            onFocus: (v) => wn.value = tl(f)
          }, [
            Me("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: f.icon
            }, null, 8, py),
            Me("span", hy, St(f.label), 1),
            f.keys ? (Z(), Q("span", vy, St(Qi(f)), 1)) : et("", !0)
          ], 40, gy))
        ], 64))), 128))
      ], 44, fy)) : et("", !0)
    ], 512));
  }
};
function Sy({ model: e, el: t }) {
  t.style.display = "block", t.style.width = "100%", t.style.height = "100%";
  const n = document.createElement("div");
  n.className = "pnl-tst-root", n.style.height = "100%", t.append(n);
  const r = /* @__PURE__ */ Ao({
    // What this side holds, which is the whole tree unless `options.prune` asked
    // Python to send the opened branches only. The tree Python owns is not on the
    // wire at all, so there is nothing here to mistake for it.
    view: e.get("_view") || [],
    columns: e.get("columns") || [],
    options: e.get("options") || {},
    icons: e.get("icons") || {},
    // A node names a type, the registry says what that type's nodes are like.
    // Read wherever a field is read, never merged into `source`, which is what
    // keeps a tree of a thousand files from carrying the same fields a thousand
    // times over the socket.
    types: e.get("types") || {},
    filterText: e.get("filter_text") || "",
    editingKey: e.get("editing_key") || "",
    // The other half of the editor's address: a key names a row, this names which
    // of its cells, and "" means the tree column, which is the title.
    editingColumn: e.get("editing_column") || "",
    // The last edit Python refused. A refusal changes no tree, so nothing else
    // would ever reach this side to say the value did not land.
    editError: e.get("_edit_error") || {},
    expandedKeys: e.get("expanded_keys") || [],
    selectedKeys: e.get("selected_keys") || [],
    // A view concern like the filter, and bidirectional for the same reason: an
    // application may set a default sort or read back the one the user chose.
    sorting: e.get("sorting") || [],
    // The same again for the widths a user dragged, keyed by column id and
    // holding only the columns somebody actually sized.
    columnWidths: e.get("column_widths") || {},
    // Python owns the history as it owns the tree. The toolbar asks for a step and
    // reads these to know whether there is one, rather than counting its own.
    canUndo: e.get("can_undo") || !1,
    canRedo: e.get("can_redo") || !1,
    // Python holds the clipboard for the same reason it holds the tree: the keys
    // in it have to mean something there. The toolbar reads it to enable paste
    // and the grid reads it to fade the rows waiting to be moved.
    clipboard: e.get("clipboard") || {},
    // Minted once in Python and constant for the life of the table, so there is
    // nothing to listen for. A cross-pane drag carries it, which is how the pane a
    // drop lands in can name the pane the rows came from.
    tableId: e.get("_table_id") || ""
  }), o = 16, s = [];
  let l = 0;
  const u = (_, P) => {
    l += 1, s.push({ seq: l, event_name: _, event_params: P }), s.length > o && s.shift(), e.set("_event_data", { events: [...s], timestamp: Date.now() }), e.save_changes();
  }, c = (_, P) => _.length === P.length && _.every((z, Y) => z === P[Y]), d = (_) => (P) => {
    const z = [...e.get(_) || []].sort();
    c(z, P) || (e.set(_, P), e.save_changes());
  }, g = d("expanded_keys"), h = d("selected_keys"), y = (_) => {
    (e.get("filter_text") || "") !== _ && (e.set("filter_text", _), e.save_changes());
  }, w = (_) => {
    (e.get("editing_key") || "") !== _ && (e.set("editing_key", _), e.save_changes());
  }, O = (_) => {
    (e.get("editing_column") || "") !== _ && (e.set("editing_column", _), e.save_changes());
  }, x = (_, P) => _.length === P.length && _.every((z, Y) => z.id === P[Y].id && !!z.desc == !!P[Y].desc), A = (_) => {
    x(e.get("sorting") || [], _) || (e.set("sorting", _), e.save_changes());
  }, K = (_, P) => {
    const z = Object.keys(_);
    return z.length === Object.keys(P).length && z.every((Y) => _[Y] === P[Y]);
  }, j = np(_y, {
    state: r,
    emitEvent: u,
    setExpandedKeys: g,
    setSelectedKeys: h,
    setFilterText: y,
    setEditingKey: w,
    setEditingColumn: O,
    setSorting: A,
    setColumnWidths: (_) => {
      K(e.get("column_widths") || {}, _) || (e.set("column_widths", _), e.save_changes());
    }
  });
  return j.mount(n), e.on("change:_view", () => {
    r.view = e.get("_view") || [];
  }), e.on("change:columns", () => {
    r.columns = e.get("columns") || [];
  }), e.on("change:options", () => {
    r.options = e.get("options") || {};
  }), e.on("change:icons", () => {
    r.icons = e.get("icons") || {};
  }), e.on("change:types", () => {
    r.types = e.get("types") || {};
  }), e.on("change:filter_text", () => {
    r.filterText = e.get("filter_text") || "";
  }), e.on("change:editing_key", () => {
    r.editingKey = e.get("editing_key") || "";
  }), e.on("change:editing_column", () => {
    r.editingColumn = e.get("editing_column") || "";
  }), e.on("change:_edit_error", () => {
    r.editError = e.get("_edit_error") || {};
  }), e.on("change:expanded_keys", () => {
    r.expandedKeys = e.get("expanded_keys") || [];
  }), e.on("change:selected_keys", () => {
    r.selectedKeys = e.get("selected_keys") || [];
  }), e.on("change:sorting", () => {
    r.sorting = e.get("sorting") || [];
  }), e.on("change:column_widths", () => {
    r.columnWidths = e.get("column_widths") || {};
  }), e.on("change:can_undo", () => {
    r.canUndo = e.get("can_undo") || !1;
  }), e.on("change:can_redo", () => {
    r.canRedo = e.get("can_redo") || !1;
  }), e.on("change:clipboard", () => {
    r.clipboard = e.get("clipboard") || {};
  }), () => {
    j.unmount();
  };
}
export {
  Sy as render
};

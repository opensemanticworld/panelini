/**
* @vue/shared v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function Do(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const le = {}, Jt = [], tt = () => {
}, ai = () => !1, mr = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), yr = (e) => e.startsWith("onUpdate:"), Re = Object.assign, ko = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, ba = Object.prototype.hasOwnProperty, ee = (e, t) => ba.call(e, t), N = Array.isArray, St = (e) => Pn(e) === "[object Map]", ir = (e) => Pn(e) === "[object Set]", us = (e) => Pn(e) === "[object Date]", U = (e) => typeof e == "function", ge = (e) => typeof e == "string", nt = (e) => typeof e == "symbol", re = (e) => e !== null && typeof e == "object", ci = (e) => (re(e) || U(e)) && U(e.then) && U(e.catch), ui = Object.prototype.toString, Pn = (e) => ui.call(e), _a = (e) => Pn(e).slice(8, -1), fi = (e) => Pn(e) === "[object Object]", Fo = (e) => ge(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, vn = /* @__PURE__ */ Do(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), wr = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, xa = /-\w/g, Ne = wr(
  (e) => e.replace(xa, (t) => t.slice(1).toUpperCase())
), Sa = /\B([A-Z])/g, Kt = wr(
  (e) => e.replace(Sa, "-$1").toLowerCase()
), di = wr((e) => e.charAt(0).toUpperCase() + e.slice(1)), Xr = wr(
  (e) => e ? `on${di(e)}` : ""
), Qe = (e, t) => !Object.is(e, t), Jr = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, pi = (e, t, n, r = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: r,
    value: n
  });
}, Ra = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let fs;
const br = () => fs || (fs = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Zt(e) {
  if (N(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], o = ge(r) ? Ea(r) : Zt(r);
      if (o)
        for (const s in o)
          t[s] = o[s];
    }
    return t;
  } else if (ge(e) || re(e))
    return e;
}
const Ca = /;(?![^(]*\))/g, Ma = /:([^]+)/, Ia = /\/\*[^]*?\*\//g;
function Ea(e) {
  const t = {};
  return e.replace(Ia, "").split(Ca).forEach((n) => {
    if (n) {
      const r = n.split(Ma);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function Ot(e) {
  let t = "";
  if (ge(e))
    t = e;
  else if (N(e))
    for (let n = 0; n < e.length; n++) {
      const r = Ot(e[n]);
      r && (t += r + " ");
    }
  else if (re(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Aa = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Oa = /* @__PURE__ */ Do(Aa);
function gi(e) {
  return !!e || e === "";
}
function Pa(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let r = 0; n && r < e.length; r++)
    n = _r(e[r], t[r]);
  return n;
}
function ds(e, t) {
  if (e.size !== t.size) return !1;
  const n = Array.from(t), r = new Uint8Array(n.length);
  for (const o of e) {
    let s = -1;
    for (let i = 0; i < n.length; i++)
      if (!r[i] && _r(o, n[i])) {
        s = i;
        break;
      }
    if (s < 0) return !1;
    r[s] = 1;
  }
  return !0;
}
function _r(e, t) {
  if (e === t) return !0;
  let n = us(e), r = us(t);
  if (n || r)
    return n && r ? e.getTime() === t.getTime() : !1;
  if (n = nt(e), r = nt(t), n || r)
    return e === t;
  if (n = N(e), r = N(t), n || r)
    return n && r ? Pa(e, t) : !1;
  if (n = re(e), r = re(t), n || r) {
    if (!n || !r)
      return !1;
    if (n = St(e), r = St(t), n || r || (n = ir(e), r = ir(t), n || r))
      return n && r ? ds(e, t) : !1;
    const o = Object.keys(e).length, s = Object.keys(t).length;
    if (o !== s)
      return !1;
    for (const i in e) {
      const l = e.hasOwnProperty(i), a = t.hasOwnProperty(i);
      if (l && !a || !l && a || !_r(e[i], t[i]))
        return !1;
    }
  }
  return String(e) === String(t);
}
const hi = (e) => !!(e && e.__v_isRef === !0), tr = (e) => ge(e) ? e : e == null ? "" : N(e) || re(e) && (e.toString === ui || !U(e.toString)) ? hi(e) ? tr(e.value) : JSON.stringify(e, vi, 2) : String(e), vi = (e, t) => hi(t) ? vi(e, t.value) : St(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [r, o], s) => (n[Zr(r, s) + " =>"] = o, n),
    {}
  )
} : ir(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Zr(n))
} : nt(t) ? Zr(t) : re(t) && !N(t) && !fi(t) ? String(t) : t, Zr = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    nt(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let ye;
class Ta {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && ye && (ye.active ? (this.parent = ye, this.index = (ye.scopes || (ye.scopes = [])).push(
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
      const n = ye;
      try {
        return ye = this, t();
      } finally {
        ye = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = ye, ye = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (ye === this)
        ye = this.prevScope;
      else {
        let t = ye;
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
function mi() {
  return ye;
}
function Da(e, t = !1) {
  ye && ye.cleanups.push(e);
}
let ie;
const Qr = /* @__PURE__ */ new WeakSet();
class yi {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, ye && (ye.active ? ye.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Qr.has(this) && (Qr.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || bi(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, ps(this), _i(this);
    const t = ie, n = We;
    ie = this, We = !0;
    try {
      return this.fn();
    } finally {
      xi(this), ie = t, We = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Lo(t);
      this.deps = this.depsTail = void 0, ps(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Qr.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    ho(this) && this.run();
  }
  get dirty() {
    return ho(this);
  }
}
let wi = 0, mn, yn;
function bi(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = yn, yn = e;
    return;
  }
  e.next = mn, mn = e;
}
function Ho() {
  wi++;
}
function jo() {
  if (--wi > 0)
    return;
  if (yn) {
    let t = yn;
    for (yn = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; mn; ) {
    let t = mn;
    for (mn = void 0; t; ) {
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
function _i(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function xi(e) {
  let t, n = e.depsTail, r = n;
  for (; r; ) {
    const o = r.prevDep;
    r.version === -1 ? (r === n && (n = o), Lo(r), ka(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = o;
  }
  e.deps = t, e.depsTail = n;
}
function ho(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Si(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Si(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Sn) || (e.globalVersion = Sn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !ho(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = ie, r = We;
  ie = e, We = !0;
  try {
    _i(e);
    const o = e.fn(e._value);
    (t.version === 0 || Qe(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    ie = n, We = r, xi(e), e.flags &= -3;
  }
}
function Lo(e, t = !1) {
  const { dep: n, prevSub: r, nextSub: o } = e;
  if (r && (r.nextSub = o, e.prevSub = void 0), o && (o.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
    n.computed.flags &= -5;
    for (let s = n.computed.deps; s; s = s.nextDep)
      Lo(s, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function ka(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let We = !0;
const Ri = [];
function ct() {
  Ri.push(We), We = !1;
}
function ut() {
  const e = Ri.pop();
  We = e === void 0 ? !0 : e;
}
function ps(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = ie;
    ie = void 0;
    try {
      t();
    } finally {
      ie = n;
    }
  }
}
let Sn = 0;
class Fa {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Ko {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!ie || !We || ie === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== ie)
      n = this.activeLink = new Fa(ie, this), ie.deps ? (n.prevDep = ie.depsTail, ie.depsTail.nextDep = n, ie.depsTail = n) : ie.deps = ie.depsTail = n, Ci(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const r = n.nextDep;
      r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = ie.depsTail, n.nextDep = void 0, ie.depsTail.nextDep = n, ie.depsTail = n, ie.deps === n && (ie.deps = r);
    }
    return n;
  }
  trigger(t) {
    this.version++, Sn++, this.notify(t);
  }
  notify(t) {
    Ho();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      jo();
    }
  }
}
function Ci(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let r = t.deps; r; r = r.nextDep)
        Ci(r);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const vo = /* @__PURE__ */ new WeakMap(), Pt = /* @__PURE__ */ Symbol(
  ""
), mo = /* @__PURE__ */ Symbol(
  ""
), Rn = /* @__PURE__ */ Symbol(
  ""
);
function xe(e, t, n) {
  if (We && ie) {
    let r = vo.get(e);
    r || vo.set(e, r = /* @__PURE__ */ new Map());
    let o = r.get(n);
    o || (r.set(n, o = new Ko()), o.map = r, o.key = n), o.track();
  }
}
function lt(e, t, n, r, o, s) {
  const i = vo.get(e);
  if (!i) {
    Sn++;
    return;
  }
  const l = (a) => {
    a && a.trigger();
  };
  if (Ho(), t === "clear")
    i.forEach(l);
  else {
    const a = N(e), u = a && Fo(n);
    if (a && n === "length") {
      const f = Number(r);
      i.forEach((h, w) => {
        (w === "length" || w === Rn || !nt(w) && w >= f) && l(h);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && l(i.get(n)), u && l(i.get(Rn)), t) {
        case "add":
          a ? u && l(i.get("length")) : (l(i.get(Pt)), St(e) && l(i.get(mo)));
          break;
        case "delete":
          a || (l(i.get(Pt)), St(e) && l(i.get(mo)));
          break;
        case "set":
          St(e) && l(i.get(Pt));
          break;
      }
  }
  jo();
}
function qt(e) {
  const t = /* @__PURE__ */ Q(e);
  return t === e ? t : (xe(t, "iterate", Rn), /* @__PURE__ */ Be(e) ? t : t.map(Ue));
}
function xr(e) {
  return xe(e = /* @__PURE__ */ Q(e), "iterate", Rn), e;
}
function Je(e, t) {
  return /* @__PURE__ */ ft(e) ? tn(/* @__PURE__ */ Tt(e) ? Ue(t) : t) : Ue(t);
}
const Ha = {
  __proto__: null,
  [Symbol.iterator]() {
    return eo(this, Symbol.iterator, (e) => Je(this, e));
  },
  concat(...e) {
    return qt(this).concat(
      ...e.map((t) => N(t) ? qt(t) : t)
    );
  },
  entries() {
    return eo(this, "entries", (e) => (e[1] = Je(this, e[1]), e));
  },
  every(e, t) {
    return rt(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return rt(
      this,
      "filter",
      e,
      t,
      (n) => n.map((r) => Je(this, r)),
      arguments
    );
  },
  find(e, t) {
    return rt(
      this,
      "find",
      e,
      t,
      (n) => Je(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return rt(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return rt(
      this,
      "findLast",
      e,
      t,
      (n) => Je(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return rt(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return rt(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return to(this, "includes", e);
  },
  indexOf(...e) {
    return to(this, "indexOf", e);
  },
  join(e) {
    return qt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return to(this, "lastIndexOf", e);
  },
  map(e, t) {
    return rt(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return fn(this, "pop");
  },
  push(...e) {
    return fn(this, "push", e);
  },
  reduce(e, ...t) {
    return gs(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return gs(this, "reduceRight", e, t);
  },
  shift() {
    return fn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return rt(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return fn(this, "splice", e);
  },
  toReversed() {
    return qt(this).toReversed();
  },
  toSorted(e) {
    return qt(this).toSorted(e);
  },
  toSpliced(...e) {
    return qt(this).toSpliced(...e);
  },
  unshift(...e) {
    return fn(this, "unshift", e);
  },
  values() {
    return eo(this, "values", (e) => Je(this, e));
  }
};
function eo(e, t, n) {
  const r = xr(e), o = r[t]();
  return r !== e && !/* @__PURE__ */ Be(e) && (o._next = o.next, o.next = () => {
    const s = o._next();
    return s.done || (s.value = n(s.value)), s;
  }), o;
}
const ja = Array.prototype;
function rt(e, t, n, r, o, s) {
  const i = xr(e), l = i !== e && !/* @__PURE__ */ Be(e), a = i[t];
  if (a !== ja[t]) {
    const h = a.apply(e, s);
    return l ? Ue(h) : h;
  }
  let u = n;
  i !== e && (l ? u = function(h, w) {
    return n.call(this, Je(e, h), w, e);
  } : n.length > 2 && (u = function(h, w) {
    return n.call(this, h, w, e);
  }));
  const f = a.call(i, u, r);
  return l && o ? o(f) : f;
}
function gs(e, t, n, r) {
  const o = xr(e), s = o !== e && !/* @__PURE__ */ Be(e);
  let i = n, l = !1;
  o !== e && (s ? (l = r.length === 0, i = function(u, f, h) {
    return l && (l = !1, u = Je(e, u)), n.call(this, u, Je(e, f), h, e);
  }) : n.length > 3 && (i = function(u, f, h) {
    return n.call(this, u, f, h, e);
  }));
  const a = o[t](i, ...r);
  return l ? Je(e, a) : a;
}
function to(e, t, n) {
  const r = /* @__PURE__ */ Q(e);
  xe(r, "iterate", Rn);
  const o = r[t](...n);
  return (o === -1 || o === !1) && /* @__PURE__ */ $o(n[0]) ? (n[0] = /* @__PURE__ */ Q(n[0]), r[t](...n)) : o;
}
function fn(e, t, n = []) {
  ct(), Ho();
  const r = (/* @__PURE__ */ Q(e))[t].apply(e, n);
  return jo(), ut(), r;
}
const La = /* @__PURE__ */ Do("__proto__,__v_isRef,__isVue"), Mi = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(nt)
);
function Ka(e) {
  nt(e) || (e = String(e));
  const t = /* @__PURE__ */ Q(this);
  return xe(t, "has", e), t.hasOwnProperty(e);
}
class Ii {
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
      return r === (o ? s ? Ya : Pi : s ? Oi : Ai).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const i = N(t);
    if (!o) {
      let a;
      if (i && (a = Ha[n]))
        return a;
      if (n === "hasOwnProperty")
        return Ka;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ Se(t) ? t : r
    );
    if ((nt(n) ? Mi.has(n) : La(n)) || (o || xe(t, "get", n), s))
      return l;
    if (/* @__PURE__ */ Se(l)) {
      const a = i && Fo(n) ? l : l.value;
      return o && re(a) ? /* @__PURE__ */ wo(a) : a;
    }
    return re(l) ? o ? /* @__PURE__ */ wo(l) : /* @__PURE__ */ Sr(l) : l;
  }
}
class Ei extends Ii {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, o) {
    let s = t[n];
    const i = N(t) && Fo(n);
    if (!this._isShallow) {
      const u = /* @__PURE__ */ ft(s);
      if (!/* @__PURE__ */ Be(r) && !/* @__PURE__ */ ft(r) && (s = /* @__PURE__ */ Q(s), r = /* @__PURE__ */ Q(r)), !i && /* @__PURE__ */ Se(s) && !/* @__PURE__ */ Se(r))
        return u || (s.value = r), !0;
    }
    const l = i ? Number(n) < t.length : ee(t, n), a = Reflect.set(
      t,
      n,
      r,
      /* @__PURE__ */ Se(t) ? t : o
    );
    return t === /* @__PURE__ */ Q(o) && a && (l ? Qe(r, s) && lt(t, "set", n, r) : lt(t, "add", n, r)), a;
  }
  deleteProperty(t, n) {
    const r = ee(t, n);
    t[n];
    const o = Reflect.deleteProperty(t, n);
    return o && r && lt(t, "delete", n, void 0), o;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!nt(n) || !Mi.has(n)) && xe(t, "has", n), r;
  }
  ownKeys(t) {
    return xe(
      t,
      "iterate",
      N(t) ? "length" : Pt
    ), Reflect.ownKeys(t);
  }
}
class Va extends Ii {
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
const Ba = /* @__PURE__ */ new Ei(), $a = /* @__PURE__ */ new Va(), Na = /* @__PURE__ */ new Ei(!0);
const yo = (e) => e, Un = (e) => Reflect.getPrototypeOf(e);
function Wa(e, t, n) {
  return function(...r) {
    const o = this.__v_raw, s = /* @__PURE__ */ Q(o), i = St(s), l = e === "entries" || e === Symbol.iterator && i, a = e === "keys" && i, u = o[e](...r), f = n ? yo : t ? tn : Ue;
    return !t && xe(
      s,
      "iterate",
      a ? mo : Pt
    ), Re(
      // inheriting all iterator properties
      Object.create(u),
      {
        // iterator protocol
        next() {
          const { value: h, done: w } = u.next();
          return w ? { value: h, done: w } : {
            value: l ? [f(h[0]), f(h[1])] : f(h),
            done: w
          };
        }
      }
    );
  };
}
function qn(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Ua(e, t) {
  const n = {
    get(o) {
      const s = this.__v_raw, i = /* @__PURE__ */ Q(s), l = /* @__PURE__ */ Q(o);
      e || (Qe(o, l) && xe(i, "get", o), xe(i, "get", l));
      const { has: a } = Un(i), u = t ? yo : e ? tn : Ue;
      if (a.call(i, o))
        return u(s.get(o));
      if (a.call(i, l))
        return u(s.get(l));
      s !== i && s.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && xe(/* @__PURE__ */ Q(o), "iterate", Pt), o.size;
    },
    has(o) {
      const s = this.__v_raw, i = /* @__PURE__ */ Q(s), l = /* @__PURE__ */ Q(o);
      return e || (Qe(o, l) && xe(i, "has", o), xe(i, "has", l)), o === l ? s.has(o) : s.has(o) || s.has(l);
    },
    forEach(o, s) {
      const i = this, l = i.__v_raw, a = /* @__PURE__ */ Q(l), u = t ? yo : e ? tn : Ue;
      return !e && xe(a, "iterate", Pt), l.forEach((f, h) => o.call(s, u(f), u(h), i));
    }
  };
  return Re(
    n,
    e ? {
      add: qn("add"),
      set: qn("set"),
      delete: qn("delete"),
      clear: qn("clear")
    } : {
      add(o) {
        const s = /* @__PURE__ */ Q(this), i = Un(s), l = /* @__PURE__ */ Q(o), a = !t && !/* @__PURE__ */ Be(o) && !/* @__PURE__ */ ft(o) ? l : o;
        return i.has.call(s, a) || Qe(o, a) && i.has.call(s, o) || Qe(l, a) && i.has.call(s, l) || (s.add(a), lt(s, "add", a, a)), this;
      },
      set(o, s) {
        !t && !/* @__PURE__ */ Be(s) && !/* @__PURE__ */ ft(s) && (s = /* @__PURE__ */ Q(s));
        const i = /* @__PURE__ */ Q(this), { has: l, get: a } = Un(i);
        let u = l.call(i, o);
        u || (o = /* @__PURE__ */ Q(o), u = l.call(i, o));
        const f = a.call(i, o);
        return i.set(o, s), u ? Qe(s, f) && lt(i, "set", o, s) : lt(i, "add", o, s), this;
      },
      delete(o) {
        const s = /* @__PURE__ */ Q(this), { has: i, get: l } = Un(s);
        let a = i.call(s, o);
        a || (o = /* @__PURE__ */ Q(o), a = i.call(s, o)), l && l.call(s, o);
        const u = s.delete(o);
        return a && lt(s, "delete", o, void 0), u;
      },
      clear() {
        const o = /* @__PURE__ */ Q(this), s = o.size !== 0, i = o.clear();
        return s && lt(
          o,
          "clear",
          void 0,
          void 0
        ), i;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((o) => {
    n[o] = Wa(o, e, t);
  }), n;
}
function Vo(e, t) {
  const n = Ua(e, t);
  return (r, o, s) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(
    ee(n, o) && o in r ? n : r,
    o,
    s
  );
}
const qa = {
  get: /* @__PURE__ */ Vo(!1, !1)
}, za = {
  get: /* @__PURE__ */ Vo(!1, !0)
}, Ga = {
  get: /* @__PURE__ */ Vo(!0, !1)
};
const Ai = /* @__PURE__ */ new WeakMap(), Oi = /* @__PURE__ */ new WeakMap(), Pi = /* @__PURE__ */ new WeakMap(), Ya = /* @__PURE__ */ new WeakMap();
function Xa(e) {
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
function Sr(e) {
  return /* @__PURE__ */ ft(e) ? e : Bo(
    e,
    !1,
    Ba,
    qa,
    Ai
  );
}
// @__NO_SIDE_EFFECTS__
function Ja(e) {
  return Bo(
    e,
    !1,
    Na,
    za,
    Oi
  );
}
// @__NO_SIDE_EFFECTS__
function wo(e) {
  return Bo(
    e,
    !0,
    $a,
    Ga,
    Pi
  );
}
function Bo(e, t, n, r, o) {
  if (!re(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const s = o.get(e);
  if (s)
    return s;
  const i = Xa(_a(e));
  if (i === 0)
    return e;
  const l = new Proxy(
    e,
    i === 2 ? r : n
  );
  return o.set(e, l), l;
}
// @__NO_SIDE_EFFECTS__
function Tt(e) {
  return /* @__PURE__ */ ft(e) ? /* @__PURE__ */ Tt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function ft(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Be(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function $o(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function Q(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ Q(t) : e;
}
function Za(e) {
  return !ee(e, "__v_skip") && Object.isExtensible(e) && pi(e, "__v_skip", !0), e;
}
const Ue = (e) => re(e) ? /* @__PURE__ */ Sr(e) : e, tn = (e) => re(e) ? /* @__PURE__ */ wo(e) : e;
// @__NO_SIDE_EFFECTS__
function Se(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Pe(e) {
  return Ti(e, !1);
}
// @__NO_SIDE_EFFECTS__
function Qa(e) {
  return Ti(e, !0);
}
function Ti(e, t) {
  return /* @__PURE__ */ Se(e) ? e : new ec(e, t);
}
class ec {
  constructor(t, n) {
    this.dep = new Ko(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ Q(t), this._value = n ? t : Ue(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, r = this.__v_isShallow || /* @__PURE__ */ Be(t) || /* @__PURE__ */ ft(t);
    t = r ? t : /* @__PURE__ */ Q(t), Qe(t, n) && (this._rawValue = t, this._value = r ? t : Ue(t), this.dep.trigger());
  }
}
function Dt(e) {
  return /* @__PURE__ */ Se(e) ? e.value : e;
}
const tc = {
  get: (e, t, n) => t === "__v_raw" ? e : Dt(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return /* @__PURE__ */ Se(o) && !/* @__PURE__ */ Se(n) ? (o.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function Di(e) {
  return /* @__PURE__ */ Tt(e) ? e : new Proxy(e, tc);
}
class nc {
  constructor(t, n, r) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Ko(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Sn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    ie !== this)
      return bi(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Si(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function rc(e, t, n = !1) {
  let r, o;
  return U(e) ? r = e : (r = e.get, o = e.set), new nc(r, o, n);
}
const zn = {}, lr = /* @__PURE__ */ new WeakMap();
let At;
function oc(e, t = !1, n = At) {
  if (n) {
    let r = lr.get(n);
    r || lr.set(n, r = []), r.push(e);
  }
}
function sc(e, t, n = le) {
  const { immediate: r, deep: o, once: s, scheduler: i, augmentJob: l, call: a } = n, u = (E) => o ? E : /* @__PURE__ */ Be(E) || o === !1 || o === 0 ? xt(E, 1) : xt(E);
  let f, h, w, y, I = !1, C = !1;
  if (/* @__PURE__ */ Se(e) ? (h = () => e.value, I = /* @__PURE__ */ Be(e)) : /* @__PURE__ */ Tt(e) ? (h = () => u(e), I = !0) : N(e) ? (C = !0, I = e.some((E) => /* @__PURE__ */ Tt(E) || /* @__PURE__ */ Be(E)), h = () => e.map((E) => {
    if (/* @__PURE__ */ Se(E))
      return E.value;
    if (/* @__PURE__ */ Tt(E))
      return u(E);
    if (U(E))
      return a ? a(E, 2) : E();
  })) : U(e) ? t ? h = a ? () => a(e, 2) : e : h = () => {
    if (w) {
      ct();
      try {
        w();
      } finally {
        ut();
      }
    }
    const E = At;
    At = f;
    try {
      return a ? a(e, 3, [y]) : e(y);
    } finally {
      At = E;
    }
  } : h = tt, t && o) {
    const E = h, $ = o === !0 ? 1 / 0 : o;
    h = () => xt(E(), $);
  }
  const T = mi(), F = () => {
    f.stop(), T && T.active && ko(T.effects, f);
  };
  if (s && t) {
    const E = t;
    t = (...$) => {
      const W = E(...$);
      return F(), W;
    };
  }
  let M = C ? new Array(e.length).fill(zn) : zn;
  const L = (E) => {
    if (!(!(f.flags & 1) || !f.dirty && !E))
      if (t) {
        const $ = f.run();
        if (E || o || I || (C ? $.some((W, ue) => Qe(W, M[ue])) : Qe($, M))) {
          w && w();
          const W = At;
          At = f;
          try {
            const ue = [
              $,
              // pass undefined as the old value when it's changed for the first time
              M === zn ? void 0 : C && M[0] === zn ? [] : M,
              y
            ];
            M = $, a ? a(t, 3, ue) : (
              // @ts-expect-error
              t(...ue)
            );
          } finally {
            At = W;
          }
        }
      } else
        f.run();
  };
  return l && l(L), f = new yi(h), f.scheduler = i ? () => i(L, !1) : L, y = (E) => oc(E, !1, f), w = f.onStop = () => {
    const E = lr.get(f);
    if (E) {
      if (a)
        a(E, 4);
      else
        for (const $ of E) $();
      lr.delete(f);
    }
  }, t ? r ? L(!0) : M = f.run() : i ? i(L.bind(null, !0), !0) : f.run(), F.pause = f.pause.bind(f), F.resume = f.resume.bind(f), F.stop = F, F;
}
function xt(e, t = 1 / 0, n) {
  if (t <= 0 || !re(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ Se(e))
    xt(e.value, t, n);
  else if (N(e))
    for (let r = 0; r < e.length; r++)
      xt(e[r], t, n);
  else if (ir(e) || St(e))
    e.forEach((r) => {
      xt(r, t, n);
    });
  else if (fi(e)) {
    for (const r in e)
      xt(e[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, r) && xt(e[r], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Tn(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (o) {
    Rr(o, t, n);
  }
}
function qe(e, t, n, r) {
  if (U(e)) {
    const o = Tn(e, t, n, r);
    return o && ci(o) && o.catch((s) => {
      Rr(s, t, n);
    }), o;
  }
  if (N(e)) {
    const o = [];
    for (let s = 0; s < e.length; s++)
      o.push(qe(e[s], t, n, r));
    return o;
  }
}
function Rr(e, t, n, r = !0) {
  const o = t ? t.vnode : null, { errorHandler: s, throwUnhandledErrorInProduction: i } = t && t.appContext.config || le;
  if (t) {
    let l = t.parent;
    const a = t.proxy, u = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const f = l.ec;
      if (f) {
        for (let h = 0; h < f.length; h++)
          if (f[h](e, a, u) === !1)
            return;
      }
      l = l.parent;
    }
    if (s) {
      ct(), Tn(s, null, 10, [
        e,
        a,
        u
      ]), ut();
      return;
    }
  }
  ic(e, n, o, r, i);
}
function ic(e, t, n, r = !0, o = !1) {
  if (o)
    throw e;
  console.error(e);
}
const Ie = [];
let Xe = -1;
const Qt = [];
let _t = null, Gt = 0;
const ki = /* @__PURE__ */ Promise.resolve();
let ar = null;
function Yt(e) {
  const t = ar || ki;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function lc(e) {
  let t = Xe + 1, n = Ie.length;
  for (; t < n; ) {
    const r = t + n >>> 1, o = Ie[r], s = Cn(o);
    s < e || s === e && o.flags & 2 ? t = r + 1 : n = r;
  }
  return t;
}
function No(e) {
  if (!(e.flags & 1)) {
    const t = Cn(e), n = Ie[Ie.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Cn(n) ? Ie.push(e) : Ie.splice(lc(t), 0, e), e.flags |= 1, Fi();
  }
}
function Fi() {
  ar || (ar = ki.then(ji));
}
function ac(e) {
  if (!N(e))
    _t && e.id === -1 ? _t.splice(Gt + 1, 0, e) : e.flags & 1 || (Qt.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      Qt.push(e[t]);
  Fi();
}
function hs(e, t, n = Xe + 1) {
  for (; n < Ie.length; n++) {
    const r = Ie[n];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid)
        continue;
      Ie.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function Hi(e) {
  if (Qt.length) {
    const t = [...new Set(Qt)].sort(
      (n, r) => Cn(n) - Cn(r)
    );
    if (Qt.length = 0, _t) {
      for (let n = 0; n < t.length; n++)
        _t.push(t[n]);
      return;
    }
    for (_t = t, Gt = 0; Gt < _t.length; Gt++) {
      const n = _t[Gt];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    _t = null, Gt = 0;
  }
}
const Cn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function ji(e) {
  try {
    for (Xe = 0; Xe < Ie.length; Xe++) {
      const t = Ie[Xe];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Tn(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Xe < Ie.length; Xe++) {
      const t = Ie[Xe];
      t && (t.flags &= -2);
    }
    Xe = -1, Ie.length = 0, Hi(), ar = null, (Ie.length || Qt.length) && ji();
  }
}
let et = null, Li = null;
function cr(e) {
  const t = et;
  return et = e, Li = e && e.type.__scopeId || null, t;
}
function cc(e, t = et, n) {
  if (!t || e._n)
    return e;
  const r = (...o) => {
    r._d && Ms(-1);
    const s = cr(t), i = kt.length;
    let l;
    try {
      l = e(...o);
    } finally {
      for (let a = kt.length; a > i; a--) cl();
      cr(s), r._d && Ms(1);
    }
    return l;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function It(e, t, n, r) {
  const o = e.dirs, s = t && t.dirs;
  for (let i = 0; i < o.length; i++) {
    const l = o[i];
    s && (l.oldValue = s[i].value);
    let a = l.dir[r];
    a && (ct(), qe(a, n, 8, [
      e.el,
      l,
      e,
      t
    ]), ut());
  }
}
function uc(e, t) {
  if (Ae) {
    let n = Ae.provides;
    const r = Ae.parent && Ae.parent.provides;
    r === n && (n = Ae.provides = Object.create(r)), n[e] = t;
  }
}
function nr(e, t, n = !1) {
  const r = lu();
  if (r || en) {
    let o = en ? en._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && U(t) ? t.call(r && r.proxy) : t;
  }
}
const fc = /* @__PURE__ */ Symbol.for("v-scx"), dc = () => nr(fc);
function be(e, t, n) {
  return Ki(e, t, n);
}
function Ki(e, t, n = le) {
  const { immediate: r, deep: o, flush: s, once: i } = n, l = Re({}, n), a = t && r || !t && s !== "post";
  let u;
  if (En) {
    if (s === "sync") {
      const y = dc();
      u = y.__watcherHandles || (y.__watcherHandles = []);
    } else if (!a) {
      const y = () => {
      };
      return y.stop = tt, y.resume = tt, y.pause = tt, y;
    }
  }
  const f = Ae;
  l.call = (y, I, C) => qe(y, f, I, C);
  let h = !1;
  s === "post" ? l.scheduler = (y) => {
    Te(y, f && f.suspense);
  } : s !== "sync" && (h = !0, l.scheduler = (y, I) => {
    I ? y() : No(y);
  }), l.augmentJob = (y) => {
    t && (y.flags |= 4), h && (y.flags |= 2, f && (y.id = f.uid, y.i = f));
  };
  const w = sc(e, t, l);
  return En && (u ? u.push(w) : a && w()), w;
}
function pc(e, t, n) {
  const r = this.proxy, o = ge(e) ? e.includes(".") ? Vi(r, e) : () => r[e] : e.bind(r, r);
  let s;
  U(t) ? s = t : (s = t.handler, n = t);
  const i = Dn(this), l = Ki(o, s.bind(r), n);
  return i(), l;
}
function Vi(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++)
      r = r[n[o]];
    return r;
  };
}
const gc = /* @__PURE__ */ Symbol("_vte"), Cr = (e) => e.__isTeleport, no = /* @__PURE__ */ Symbol("_leaveCb");
function hc(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== dt) {
        t = n;
        break;
      }
  }
  return t;
}
function Bi(e) {
  if (!Uo(e))
    return Cr(e.type) && e.children ? hc(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16)
      return n[0];
    if (t & 32 && U(n.default))
      return n.default();
  }
}
function Wo(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    Wo(
      Cr(n.type) && Bi(n) || n,
      t
    );
  } else e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function $i(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function vs(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const ur = /* @__PURE__ */ new WeakMap();
function wn(e, t, n, r, o = !1) {
  if (N(e)) {
    e.forEach(
      (C, T) => wn(
        C,
        t && (N(t) ? t[T] : t),
        n,
        r,
        o
      )
    );
    return;
  }
  if (bn(r) && !o) {
    r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && wn(e, t, n, r.component.subTree);
    return;
  }
  const s = r.shapeFlag & 4 ? Go(r.component) : r.el, i = o ? null : s, { i: l, r: a } = e, u = t && t.r, f = l.refs === le ? l.refs = {} : l.refs, h = l.setupState, w = /* @__PURE__ */ Q(h), y = h === le ? ai : (C) => vs(f, C) ? !1 : ee(w, C), I = (C, T) => !(T && vs(f, T));
  if (u != null && u !== a) {
    if (ms(t), ge(u))
      f[u] = null, y(u) && (h[u] = null);
    else if (/* @__PURE__ */ Se(u)) {
      const C = t;
      I(u, C.k) && (u.value = null), C.k && (f[C.k] = null);
    }
  }
  if (U(a))
    Tn(a, l, 12, [i, f]);
  else {
    const C = ge(a), T = /* @__PURE__ */ Se(a);
    if (C || T) {
      const F = () => {
        if (e.f) {
          const M = C ? y(a) ? h[a] : f[a] : I() || !e.k ? a.value : f[e.k];
          if (o)
            N(M) && ko(M, s);
          else if (N(M))
            M.includes(s) || M.push(s);
          else if (C)
            f[a] = [s], y(a) && (h[a] = f[a]);
          else {
            const L = [s];
            I(a, e.k) && (a.value = L), e.k && (f[e.k] = L);
          }
        } else C ? (f[a] = i, y(a) && (h[a] = i)) : T && (I(a, e.k) && (a.value = i), e.k && (f[e.k] = i));
      };
      if (i) {
        const M = () => {
          F(), ur.delete(e);
        };
        M.id = -1, ur.set(e, M), Te(M, n);
      } else
        ms(e), F();
    }
  }
}
function ms(e) {
  const t = ur.get(e);
  t && (t.flags |= 8, ur.delete(e));
}
br().requestIdleCallback;
br().cancelIdleCallback;
const bn = (e) => !!e.type.__asyncLoader, Uo = (e) => e.type.__isKeepAlive;
function vc(e, t) {
  Ni(e, "a", t);
}
function mc(e, t) {
  Ni(e, "da", t);
}
function Ni(e, t, n = Ae) {
  const r = e.__wdc || (e.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (Mr(t, r, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      Uo(o.parent.vnode) && yc(r, t, n, o), o = o.parent;
  }
}
function yc(e, t, n, r) {
  const o = Mr(
    t,
    e,
    r,
    !0
    /* prepend */
  );
  Ui(() => {
    ko(r[t], o);
  }, n);
}
function Mr(e, t, n = Ae, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), s = t.__weh || (t.__weh = (...i) => {
      ct();
      const l = Dn(n), a = qe(t, n, e, i);
      return l(), ut(), a;
    });
    return r ? o.unshift(s) : o.push(s), s;
  }
}
const gt = (e) => (t, n = Ae) => {
  (!En || e === "sp") && Mr(e, (...r) => t(...r), n);
}, wc = gt("bm"), bo = gt("m"), bc = gt(
  "bu"
), _c = gt("u"), Wi = gt(
  "bum"
), Ui = gt("um"), xc = gt(
  "sp"
), Sc = gt("rtg"), Rc = gt("rtc");
function Cc(e, t = Ae) {
  Mr("ec", e, t);
}
const Mc = /* @__PURE__ */ Symbol.for("v-ndc");
function Gn(e, t, n, r) {
  let o;
  const s = n, i = N(e);
  if (i || ge(e)) {
    const l = i && /* @__PURE__ */ Tt(e);
    let a = !1, u = !1;
    l && (a = !/* @__PURE__ */ Be(e), u = /* @__PURE__ */ ft(e), e = xr(e)), o = new Array(e.length);
    for (let f = 0, h = e.length; f < h; f++)
      o[f] = t(
        a ? u ? tn(Ue(e[f])) : Ue(e[f]) : e[f],
        f,
        void 0,
        s
      );
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let l = 0; l < e; l++)
      o[l] = t(l + 1, l, void 0, s);
  } else if (re(e))
    if (e[Symbol.iterator])
      o = Array.from(
        e,
        (l, a) => t(l, a, void 0, s)
      );
    else {
      const l = Object.keys(e);
      o = new Array(l.length);
      for (let a = 0, u = l.length; a < u; a++) {
        const f = l[a];
        o[a] = t(e[f], f, a, s);
      }
    }
  else
    o = [];
  return o;
}
const _o = (e) => e ? pl(e) ? Go(e) : _o(e.parent) : null, _n = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Re(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => _o(e.parent),
    $root: (e) => _o(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => zi(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      No(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Yt.bind(e.proxy)),
    $watch: (e) => pc.bind(e)
  })
), ro = (e, t) => e !== le && !e.__isScriptSetup && ee(e, t), Ic = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: r, data: o, props: s, accessCache: i, type: l, appContext: a } = e;
    if (t[0] !== "$") {
      const w = i[t];
      if (w !== void 0)
        switch (w) {
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
        if (ro(r, t))
          return i[t] = 1, r[t];
        if (o !== le && ee(o, t))
          return i[t] = 2, o[t];
        if (ee(s, t))
          return i[t] = 3, s[t];
        if (n !== le && ee(n, t))
          return i[t] = 4, n[t];
        xo && (i[t] = 0);
      }
    }
    const u = _n[t];
    let f, h;
    if (u)
      return t === "$attrs" && xe(e.attrs, "get", ""), u(e);
    if (
      // css module (injected by vue-loader)
      (f = l.__cssModules) && (f = f[t])
    )
      return f;
    if (n !== le && ee(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      h = a.config.globalProperties, ee(h, t)
    )
      return h[t];
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: o, ctx: s } = e;
    return ro(o, t) ? (o[t] = n, !0) : r !== le && ee(r, t) ? (r[t] = n, !0) : ee(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (s[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: o, props: s, type: i }
  }, l) {
    let a;
    return !!(n[l] || e !== le && l[0] !== "$" && ee(e, l) || ro(t, l) || ee(s, l) || ee(r, l) || ee(_n, l) || ee(o.config.globalProperties, l) || (a = i.__cssModules) && a[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : ee(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function ys(e) {
  return N(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let xo = !0;
function Ec(e) {
  const t = zi(e), n = e.proxy, r = e.ctx;
  xo = !1, t.beforeCreate && ws(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: s,
    methods: i,
    watch: l,
    provide: a,
    inject: u,
    // lifecycle
    created: f,
    beforeMount: h,
    mounted: w,
    beforeUpdate: y,
    updated: I,
    activated: C,
    deactivated: T,
    beforeDestroy: F,
    beforeUnmount: M,
    destroyed: L,
    unmounted: E,
    render: $,
    renderTracked: W,
    renderTriggered: ue,
    errorCaptured: k,
    serverPrefetch: H,
    // public API
    expose: G,
    inheritAttrs: fe,
    // assets
    components: se,
    directives: ve,
    filters: Oe
  } = t;
  if (u && Ac(u, r, null), i)
    for (const Y in i) {
      const ne = i[Y];
      U(ne) && (r[Y] = ne.bind(n));
    }
  if (o) {
    const Y = o.call(n, n);
    re(Y) && (e.data = /* @__PURE__ */ Sr(Y));
  }
  if (xo = !0, s)
    for (const Y in s) {
      const ne = s[Y], De = U(ne) ? ne.bind(n, n) : U(ne.get) ? ne.get.bind(n, n) : tt, ze = !U(ne) && U(ne.set) ? ne.set.bind(n) : tt, $e = X({
        get: De,
        set: ze
      });
      Object.defineProperty(r, Y, {
        enumerable: !0,
        configurable: !0,
        get: () => $e.value,
        set: (je) => $e.value = je
      });
    }
  if (l)
    for (const Y in l)
      qi(l[Y], r, n, Y);
  if (a) {
    const Y = U(a) ? a.call(n) : a;
    Reflect.ownKeys(Y).forEach((ne) => {
      uc(ne, Y[ne]);
    });
  }
  f && ws(f, e, "c");
  function te(Y, ne) {
    N(ne) ? ne.forEach((De) => Y(De.bind(n))) : ne && Y(ne.bind(n));
  }
  if (te(wc, h), te(bo, w), te(bc, y), te(_c, I), te(vc, C), te(mc, T), te(Cc, k), te(Rc, W), te(Sc, ue), te(Wi, M), te(Ui, E), te(xc, H), N(G))
    if (G.length) {
      const Y = e.exposed || (e.exposed = {});
      G.forEach((ne) => {
        Object.defineProperty(Y, ne, {
          get: () => n[ne],
          set: (De) => n[ne] = De,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  $ && e.render === tt && (e.render = $), fe != null && (e.inheritAttrs = fe), se && (e.components = se), ve && (e.directives = ve), H && $i(e);
}
function Ac(e, t, n = tt) {
  N(e) && (e = So(e));
  for (const r in e) {
    const o = e[r];
    let s;
    re(o) ? "default" in o ? s = nr(
      o.from || r,
      o.default,
      !0
    ) : s = nr(o.from || r) : s = nr(o), /* @__PURE__ */ Se(s) ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (i) => s.value = i
    }) : t[r] = s;
  }
}
function ws(e, t, n) {
  qe(
    N(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function qi(e, t, n, r) {
  let o = r.includes(".") ? Vi(n, r) : () => n[r];
  if (ge(e)) {
    const s = t[e];
    U(s) && be(o, s);
  } else if (U(e))
    be(o, e.bind(n));
  else if (re(e))
    if (N(e))
      e.forEach((s) => qi(s, t, n, r));
    else {
      const s = U(e.handler) ? e.handler.bind(n) : t[e.handler];
      U(s) && be(o, s, e);
    }
}
function zi(e) {
  const t = e.type, { mixins: n, extends: r } = t, {
    mixins: o,
    optionsCache: s,
    config: { optionMergeStrategies: i }
  } = e.appContext, l = s.get(t);
  let a;
  return l ? a = l : !o.length && !n && !r ? a = t : (a = {}, o.length && o.forEach(
    (u) => fr(a, u, i, !0)
  ), fr(a, t, i)), re(t) && s.set(t, a), a;
}
function fr(e, t, n, r = !1) {
  const { mixins: o, extends: s } = t;
  s && fr(e, s, n, !0), o && o.forEach(
    (i) => fr(e, i, n, !0)
  );
  for (const i in t)
    if (!(r && i === "expose")) {
      const l = Oc[i] || n && n[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const Oc = {
  data: bs,
  props: _s,
  emits: _s,
  // objects
  methods: gn,
  computed: gn,
  // lifecycle
  beforeCreate: Me,
  created: Me,
  beforeMount: Me,
  mounted: Me,
  beforeUpdate: Me,
  updated: Me,
  beforeDestroy: Me,
  beforeUnmount: Me,
  destroyed: Me,
  unmounted: Me,
  activated: Me,
  deactivated: Me,
  errorCaptured: Me,
  serverPrefetch: Me,
  // assets
  components: gn,
  directives: gn,
  // watch
  watch: Tc,
  // provide / inject
  provide: bs,
  inject: Pc
};
function bs(e, t) {
  return t ? e ? function() {
    return Re(
      U(e) ? e.call(this, this) : e,
      U(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Pc(e, t) {
  return gn(So(e), So(t));
}
function So(e) {
  if (N(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Me(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function gn(e, t) {
  return e ? Re(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function _s(e, t) {
  return e ? N(e) && N(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Re(
    /* @__PURE__ */ Object.create(null),
    ys(e),
    ys(t ?? {})
  ) : t;
}
function Tc(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Re(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = Me(e[r], t[r]);
  return n;
}
function Gi() {
  return {
    app: null,
    config: {
      isNativeTag: ai,
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
let Dc = 0;
function kc(e, t) {
  return function(r, o = null) {
    U(r) || (r = Re({}, r)), o != null && !re(o) && (o = null);
    const s = Gi(), i = /* @__PURE__ */ new WeakSet(), l = [];
    let a = !1;
    const u = s.app = {
      _uid: Dc++,
      _component: r,
      _props: o,
      _container: null,
      _context: s,
      _instance: null,
      version: pu,
      get config() {
        return s.config;
      },
      set config(f) {
      },
      use(f, ...h) {
        return i.has(f) || (f && U(f.install) ? (i.add(f), f.install(u, ...h)) : U(f) && (i.add(f), f(u, ...h))), u;
      },
      mixin(f) {
        return s.mixins.includes(f) || s.mixins.push(f), u;
      },
      component(f, h) {
        return h ? (s.components[f] = h, u) : s.components[f];
      },
      directive(f, h) {
        return h ? (s.directives[f] = h, u) : s.directives[f];
      },
      mount(f, h, w) {
        if (!a) {
          const y = u._ceVNode || at(r, o);
          return y.appContext = s, w === !0 ? w = "svg" : w === !1 && (w = void 0), e(y, f, w), a = !0, u._container = f, f.__vue_app__ = u, Go(y.component);
        }
      },
      onUnmount(f) {
        l.push(f);
      },
      unmount() {
        a && (qe(
          l,
          u._instance,
          16
        ), e(null, u._container), delete u._container.__vue_app__);
      },
      provide(f, h) {
        return s.provides[f] = h, u;
      },
      runWithContext(f) {
        const h = en;
        en = u;
        try {
          return f();
        } finally {
          en = h;
        }
      }
    };
    return u;
  };
}
let en = null;
const Fc = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Ne(t)}Modifiers`] || e[`${Kt(t)}Modifiers`];
function Hc(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || le;
  let o = n;
  const s = t.startsWith("update:"), i = s && Fc(r, t.slice(7));
  i && (i.trim && (o = n.map((f) => ge(f) ? f.trim() : f)), i.number && (o = o.map(Ra)));
  let l, a = r[l = Xr(t)] || // also try camelCase event handler (#2249)
  r[l = Xr(Ne(t))];
  !a && s && (a = r[l = Xr(Kt(t))]), a && qe(
    a,
    e,
    6,
    o
  );
  const u = r[l + "Once"];
  if (u) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, qe(
      u,
      e,
      6,
      o
    );
  }
}
const jc = /* @__PURE__ */ new WeakMap();
function Yi(e, t, n = !1) {
  const r = n ? jc : t.emitsCache, o = r.get(e);
  if (o !== void 0)
    return o;
  const s = e.emits;
  let i = {}, l = !1;
  if (!U(e)) {
    const a = (u) => {
      const f = Yi(u, t, !0);
      f && (l = !0, Re(i, f));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !s && !l ? (re(e) && r.set(e, null), null) : (N(s) ? s.forEach((a) => i[a] = null) : Re(i, s), re(e) && r.set(e, i), i);
}
function Ir(e, t) {
  return !e || !mr(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), ee(e, t[0].toLowerCase() + t.slice(1)) || ee(e, Kt(t)) || ee(e, t));
}
function xs(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: o,
    propsOptions: [s],
    slots: i,
    attrs: l,
    emit: a,
    render: u,
    renderCache: f,
    props: h,
    data: w,
    setupState: y,
    ctx: I,
    inheritAttrs: C
  } = e, T = cr(e);
  let F, M;
  try {
    if (n.shapeFlag & 4) {
      const E = o || r, $ = E;
      F = Ze(
        u.call(
          $,
          E,
          f,
          h,
          y,
          w,
          I
        )
      ), M = l;
    } else {
      const E = t;
      F = Ze(
        E.length > 1 ? E(
          h,
          { attrs: l, slots: i, emit: a }
        ) : E(
          h,
          null
        )
      ), M = t.props ? l : Lc(l);
    }
  } catch (E) {
    kt.length = 0, Rr(E, e, 1), F = at(dt);
  }
  let L = F;
  if (M && C !== !1) {
    const E = Object.keys(M), { shapeFlag: $ } = L;
    E.length && $ & 7 && (s && E.some(yr) && (M = Kc(
      M,
      s
    )), L = nn(L, M, !1, !0));
  }
  if (n.dirs && (L = nn(L, null, !1, !0), L.dirs = L.dirs ? L.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const E = Cr(L.type) && Bi(L) || L;
    Wo(E, n.transition);
  }
  return F = L, cr(T), F;
}
const Lc = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || mr(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Kc = (e, t) => {
  const n = {};
  for (const r in e)
    (!yr(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
  return n;
};
function Vc(e, t, n) {
  const { props: r, children: o, component: s } = e, { props: i, children: l, patchFlag: a } = t, u = s.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return r ? Ss(r, i, u) : !!i;
    if (a & 8) {
      const f = t.dynamicProps;
      for (let h = 0; h < f.length; h++) {
        const w = f[h];
        if (Xi(i, r, w) && !Ir(u, w))
          return !0;
      }
    }
  } else
    return (o || l) && (!l || !l.$stable) ? !0 : r === i ? !1 : r ? i ? Ss(r, i, u) : !0 : !!i;
  return !1;
}
function Ss(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < r.length; o++) {
    const s = r[o];
    if (Xi(t, e, s) && !Ir(n, s))
      return !0;
  }
  return !1;
}
function Xi(e, t, n) {
  const r = e[n], o = t[n];
  return n === "style" && re(r) && re(o) ? !_r(r, o) : r !== o;
}
function Bc({ vnode: e, parent: t, suspense: n }, r) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.suspense.vnode.el = o.el = r, e = o), o === e)
      (e = t.vnode).el = r, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = r);
}
const Ji = {}, Zi = () => Object.create(Ji), Qi = (e) => Object.getPrototypeOf(e) === Ji;
function $c(e, t, n, r = !1) {
  const o = {}, s = Zi();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), el(e, t, o, s);
  for (const i in e.propsOptions[0])
    i in o || (o[i] = void 0);
  n ? e.props = r ? o : /* @__PURE__ */ Ja(o) : e.type.props ? e.props = o : e.props = s, e.attrs = s;
}
function Nc(e, t, n, r) {
  const {
    props: o,
    attrs: s,
    vnode: { patchFlag: i }
  } = e, l = /* @__PURE__ */ Q(o), [a] = e.propsOptions;
  let u = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (r || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const f = e.vnode.dynamicProps;
      for (let h = 0; h < f.length; h++) {
        let w = f[h];
        if (Ir(e.emitsOptions, w))
          continue;
        const y = t[w];
        if (a)
          if (ee(s, w))
            y !== s[w] && (s[w] = y, u = !0);
          else {
            const I = Ne(w);
            o[I] = Ro(
              a,
              l,
              I,
              y,
              e,
              !1
            );
          }
        else
          y !== s[w] && (s[w] = y, u = !0);
      }
    }
  } else {
    el(e, t, o, s) && (u = !0);
    let f;
    for (const h in l)
      (!t || // for camelCase
      !ee(t, h) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((f = Kt(h)) === h || !ee(t, f))) && (a ? n && // for camelCase
      (n[h] !== void 0 || // for kebab-case
      n[f] !== void 0) && (o[h] = Ro(
        a,
        l,
        h,
        void 0,
        e,
        !0
      )) : delete o[h]);
    if (s !== l)
      for (const h in s)
        (!t || !ee(t, h)) && (delete s[h], u = !0);
  }
  u && lt(e.attrs, "set", "");
}
function el(e, t, n, r) {
  const [o, s] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let a in t) {
      if (vn(a))
        continue;
      const u = t[a];
      let f;
      o && ee(o, f = Ne(a)) ? !s || !s.includes(f) ? n[f] = u : (l || (l = {}))[f] = u : Ir(e.emitsOptions, a) || (!(a in r) || u !== r[a]) && (r[a] = u, i = !0);
    }
  if (s) {
    const a = /* @__PURE__ */ Q(n), u = l || le;
    for (let f = 0; f < s.length; f++) {
      const h = s[f];
      n[h] = Ro(
        o,
        a,
        h,
        u[h],
        e,
        !ee(u, h)
      );
    }
  }
  return i;
}
function Ro(e, t, n, r, o, s) {
  const i = e[n];
  if (i != null) {
    const l = ee(i, "default");
    if (l && r === void 0) {
      const a = i.default;
      if (i.type !== Function && !i.skipFactory && U(a)) {
        const { propsDefaults: u } = o;
        if (n in u)
          r = u[n];
        else {
          const f = Dn(o);
          r = u[n] = a.call(
            null,
            t
          ), f();
        }
      } else
        r = a;
      o.ce && o.ce._setProp(n, r);
    }
    i[
      0
      /* shouldCast */
    ] && (s && !l ? r = !1 : i[
      1
      /* shouldCastTrue */
    ] && (r === "" || r === Kt(n)) && (r = !0));
  }
  return r;
}
const Wc = /* @__PURE__ */ new WeakMap();
function tl(e, t, n = !1) {
  const r = n ? Wc : t.propsCache, o = r.get(e);
  if (o)
    return o;
  const s = e.props, i = {}, l = [];
  let a = !1;
  if (!U(e)) {
    const f = (h) => {
      a = !0;
      const [w, y] = tl(h, t, !0);
      Re(i, w), y && l.push(...y);
    };
    !n && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  if (!s && !a)
    return re(e) && r.set(e, Jt), Jt;
  if (N(s))
    for (let f = 0; f < s.length; f++) {
      const h = Ne(s[f]);
      Rs(h) && (i[h] = le);
    }
  else if (s)
    for (const f in s) {
      const h = Ne(f);
      if (Rs(h)) {
        const w = s[f], y = i[h] = N(w) || U(w) ? { type: w } : Re({}, w), I = y.type;
        let C = !1, T = !0;
        if (N(I))
          for (let F = 0; F < I.length; ++F) {
            const M = I[F], L = U(M) && M.name;
            if (L === "Boolean") {
              C = !0;
              break;
            } else L === "String" && (T = !1);
          }
        else
          C = U(I) && I.name === "Boolean";
        y[
          0
          /* shouldCast */
        ] = C, y[
          1
          /* shouldCastTrue */
        ] = T, (C || ee(y, "default")) && l.push(h);
      }
    }
  const u = [i, l];
  return re(e) && r.set(e, u), u;
}
function Rs(e) {
  return e[0] !== "$" && !vn(e);
}
const qo = (e) => e === "_" || e === "_ctx" || e === "$stable", zo = (e) => N(e) ? e.map(Ze) : [Ze(e)], Uc = (e, t, n) => {
  if (t._n)
    return t;
  const r = cc((...o) => zo(t(...o)), n);
  return r._c = !1, r;
}, nl = (e, t, n) => {
  const r = e._ctx;
  for (const o in e) {
    if (qo(o)) continue;
    const s = e[o];
    if (U(s))
      t[o] = Uc(o, s, r);
    else if (s != null) {
      const i = zo(s);
      t[o] = () => i;
    }
  }
}, rl = (e, t) => {
  const n = zo(t);
  e.slots.default = () => n;
}, ol = (e, t, n) => {
  for (const r in t)
    (n || !qo(r)) && (e[r] = t[r]);
}, qc = (e, t, n) => {
  const r = e.slots = Zi();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (ol(r, t, n), n && pi(r, "_", o, !0)) : nl(t, r);
  } else t && rl(e, t);
}, zc = (e, t, n) => {
  const { vnode: r, slots: o } = e;
  let s = !0, i = le;
  if (r.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? s = !1 : ol(o, t, n) : (s = !t.$stable, nl(t, o)), i = t;
  } else t && (rl(e, t), i = { default: 1 });
  if (s)
    for (const l in o)
      !qo(l) && i[l] == null && delete o[l];
}, Te = Zc;
function Gc(e) {
  return Yc(e);
}
function Yc(e, t) {
  const n = br();
  n.__VUE__ = !0;
  const {
    insert: r,
    remove: o,
    patchProp: s,
    createElement: i,
    createText: l,
    createComment: a,
    setText: u,
    setElementText: f,
    parentNode: h,
    nextSibling: w,
    setScopeId: y = tt,
    insertStaticContent: I
  } = e, C = (p, g, m, R = null, S = null, _ = null, P = void 0, O = null, A = !!g.dynamicChildren) => {
    if (p === g)
      return;
    p && !dn(p, g) && (R = Nt(p), je(p, S, _, !0), p = null), g.patchFlag === -2 && (A = !1, g.dynamicChildren = null);
    const { type: x, ref: K, shapeFlag: D } = g;
    switch (x) {
      case Er:
        T(p, g, m, R);
        break;
      case dt:
        F(p, g, m, R);
        break;
      case so:
        p == null && M(g, m, R, P);
        break;
      case Ee:
        se(
          p,
          g,
          m,
          R,
          S,
          _,
          P,
          O,
          A
        );
        break;
      default:
        D & 1 ? $(
          p,
          g,
          m,
          R,
          S,
          _,
          P,
          O,
          A
        ) : D & 6 ? ve(
          p,
          g,
          m,
          R,
          S,
          _,
          P,
          O,
          A
        ) : (D & 64 || D & 128) && x.process(
          p,
          g,
          m,
          R,
          S,
          _,
          P,
          O,
          A,
          Ge
        );
    }
    K != null && S ? wn(K, p && p.ref, _, g || p, !g) : K == null && p && p.ref != null && wn(p.ref, null, _, p, !0);
  }, T = (p, g, m, R) => {
    if (p == null)
      r(
        g.el = l(g.children),
        m,
        R
      );
    else {
      const S = g.el = p.el;
      g.children !== p.children && u(S, g.children);
    }
  }, F = (p, g, m, R) => {
    p == null ? r(
      g.el = a(g.children || ""),
      m,
      R
    ) : g.el = p.el;
  }, M = (p, g, m, R) => {
    [p.el, p.anchor] = I(
      p.children,
      g,
      m,
      R,
      p.el,
      p.anchor
    );
  }, L = ({ el: p, anchor: g }, m, R) => {
    let S;
    for (; p && p !== g; )
      S = w(p), r(p, m, R), p = S;
    r(g, m, R);
  }, E = ({ el: p, anchor: g }) => {
    let m;
    for (; p && p !== g; )
      m = w(p), o(p), p = m;
    o(g);
  }, $ = (p, g, m, R, S, _, P, O, A) => {
    if (g.type === "svg" ? P = "svg" : g.type === "math" && (P = "mathml"), p == null)
      W(
        g,
        m,
        R,
        S,
        _,
        P,
        O,
        A
      );
    else {
      const x = p.el && p.el._isVueCE ? p.el : null;
      try {
        x && x._beginPatch(), H(
          p,
          g,
          S,
          _,
          P,
          O,
          A
        );
      } finally {
        x && x._endPatch();
      }
    }
  }, W = (p, g, m, R, S, _, P, O) => {
    let A, x;
    const { props: K, shapeFlag: D, transition: j, dirs: B } = p;
    if (A = p.el = i(
      p.type,
      _,
      K && K.is,
      K
    ), D & 8 ? f(A, p.children) : D & 16 && k(
      p.children,
      A,
      null,
      R,
      S,
      oo(p, _),
      P,
      O
    ), B && It(p, null, R, "created"), ue(A, p, p.scopeId, P, R), K) {
      for (const J in K)
        J !== "value" && !vn(J) && s(A, J, null, K[J], _, R);
      "value" in K && s(A, "value", null, K.value, _), (x = K.onVnodeBeforeMount) && Ye(x, R, p);
    }
    B && It(p, null, R, "beforeMount");
    const z = Xc(S, j);
    z && j.beforeEnter(A), r(A, g, m), ((x = K && K.onVnodeMounted) || z || B) && Te(() => {
      try {
        x && Ye(x, R, p), z && j.enter(A), B && It(p, null, R, "mounted");
      } finally {
      }
    }, S);
  }, ue = (p, g, m, R, S) => {
    if (m && y(p, m), R)
      for (let _ = 0; _ < R.length; _++)
        y(p, R[_]);
    if (S) {
      let _ = S.subTree;
      if (g === _ || al(_.type) && (_.ssContent === g || _.ssFallback === g)) {
        const P = S.vnode;
        ue(
          p,
          P,
          P.scopeId,
          P.slotScopeIds,
          S.parent
        );
      }
    }
  }, k = (p, g, m, R, S, _, P, O, A = 0) => {
    for (let x = A; x < p.length; x++) {
      const K = p[x] = O ? it(p[x]) : Ze(p[x]);
      C(
        null,
        K,
        g,
        m,
        R,
        S,
        _,
        P,
        O
      );
    }
  }, H = (p, g, m, R, S, _, P) => {
    const O = g.el = p.el;
    let { patchFlag: A, dynamicChildren: x, dirs: K } = g;
    A |= p.patchFlag & 16;
    const D = p.props || le, j = g.props || le;
    let B;
    if (m && Et(m, !1), (B = j.onVnodeBeforeUpdate) && Ye(B, m, g, p), K && It(g, p, m, "beforeUpdate"), m && Et(m, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    x && (!p.dynamicChildren || p.dynamicChildren.length !== x.length) && (A = 0, P = !1, x = null), (D.innerHTML && j.innerHTML == null || D.textContent && j.textContent == null) && f(O, ""), x ? G(
      p.dynamicChildren,
      x,
      O,
      m,
      R,
      oo(g, S),
      _
    ) : P || ne(
      p,
      g,
      O,
      null,
      m,
      R,
      oo(g, S),
      _,
      !1
    ), A > 0) {
      if (A & 16)
        fe(O, D, j, m, S);
      else if (A & 2 && D.class !== j.class && s(O, "class", null, j.class, S), A & 4 && s(O, "style", D.style, j.style, S), A & 8) {
        const z = g.dynamicProps;
        for (let J = 0; J < z.length; J++) {
          const Z = z[J], ae = D[Z], me = j[Z];
          (me !== ae || Z === "value") && s(O, Z, ae, me, S, m);
        }
      }
      A & 1 && p.children !== g.children && f(O, g.children);
    } else !P && x == null && fe(O, D, j, m, S);
    ((B = j.onVnodeUpdated) || K) && Te(() => {
      B && Ye(B, m, g, p), K && It(g, p, m, "updated");
    }, R);
  }, G = (p, g, m, R, S, _, P) => {
    for (let O = 0; O < g.length; O++) {
      const A = p[O], x = g[O], K = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        A.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (A.type === Ee || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !dn(A, x) || // - In the case of a component, it could contain anything.
        A.shapeFlag & 198) ? h(A.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          m
        )
      );
      C(
        A,
        x,
        K,
        null,
        R,
        S,
        _,
        P,
        !0
      );
    }
  }, fe = (p, g, m, R, S) => {
    if (g !== m) {
      if (g !== le)
        for (const _ in g)
          !vn(_) && !(_ in m) && s(
            p,
            _,
            g[_],
            null,
            S,
            R
          );
      for (const _ in m) {
        if (vn(_)) continue;
        const P = m[_], O = g[_];
        P !== O && _ !== "value" && s(p, _, O, P, S, R);
      }
      "value" in m && s(p, "value", g.value, m.value, S);
    }
  }, se = (p, g, m, R, S, _, P, O, A) => {
    const x = g.el = p ? p.el : l(""), K = g.anchor = p ? p.anchor : l("");
    let { patchFlag: D, dynamicChildren: j, slotScopeIds: B } = g;
    B && (O = O ? O.concat(B) : B), p == null ? (r(x, m, R), r(K, m, R), k(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      g.children || [],
      m,
      K,
      S,
      _,
      P,
      O,
      A
    )) : D > 0 && D & 64 && j && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    p.dynamicChildren && p.dynamicChildren.length === j.length ? (G(
      p.dynamicChildren,
      j,
      m,
      S,
      _,
      P,
      O
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (g.key != null || S && g === S.subTree) && sl(
      p,
      g,
      !0
      /* shallow */
    )) : ne(
      p,
      g,
      m,
      K,
      S,
      _,
      P,
      O,
      A
    );
  }, ve = (p, g, m, R, S, _, P, O, A) => {
    g.slotScopeIds = O, p == null ? g.shapeFlag & 512 ? S.ctx.activate(
      g,
      m,
      R,
      P,
      A
    ) : Oe(
      g,
      m,
      R,
      S,
      _,
      P,
      A
    ) : Ce(p, g, A);
  }, Oe = (p, g, m, R, S, _, P) => {
    const O = p.component = iu(
      p,
      R,
      S
    );
    if (Uo(p) && (O.ctx.renderer = Ge), au(O, !1, P), O.asyncDep) {
      if (S && S.registerDep(O, te, P), !p.el) {
        const A = O.subTree = at(dt);
        F(null, A, g, m), p.placeholder = A.el;
      }
    } else
      te(
        O,
        p,
        g,
        m,
        S,
        _,
        P
      );
  }, Ce = (p, g, m) => {
    const R = g.component = p.component;
    if (Vc(p, g, m))
      if (R.asyncDep && !R.asyncResolved) {
        Y(R, g, m);
        return;
      } else
        R.next = g, R.update();
    else
      g.el = p.el, R.vnode = g;
  }, te = (p, g, m, R, S, _, P) => {
    const O = () => {
      if (p.isMounted) {
        let { next: D, bu: j, u: B, parent: z, vnode: J } = p;
        {
          const Fe = il(p);
          if (Fe) {
            D && (D.el = J.el, Y(p, D, P)), Fe.asyncDep.then(() => {
              Te(() => {
                p.isUnmounted || x();
              }, S);
            });
            return;
          }
        }
        let Z = D, ae;
        Et(p, !1), D ? (D.el = J.el, Y(p, D, P)) : D = J, j && Jr(j), (ae = D.props && D.props.onVnodeBeforeUpdate) && Ye(ae, z, D, J), Et(p, !0);
        const me = xs(p), Ke = p.subTree;
        p.subTree = me, C(
          Ke,
          me,
          // parent may have changed if it's in a teleport
          h(Ke.el),
          // anchor may have changed if it's in a fragment
          Nt(Ke),
          p,
          S,
          _
        ), D.el = me.el, Z === null && Bc(p, me.el), B && Te(B, S), (ae = D.props && D.props.onVnodeUpdated) && Te(
          () => Ye(ae, z, D, J),
          S
        );
      } else {
        let D;
        const { el: j, props: B } = g, { bm: z, m: J, parent: Z, root: ae, type: me } = p, Ke = bn(g);
        Et(p, !1), z && Jr(z), !Ke && (D = B && B.onVnodeBeforeMount) && Ye(D, Z, g), Et(p, !0);
        {
          ae.ce && ae.ce._hasShadowRoot() && ae.ce._injectChildStyle(
            me,
            p.parent ? p.parent.type : void 0
          );
          const Fe = p.subTree = xs(p);
          C(
            null,
            Fe,
            m,
            R,
            p,
            S,
            _
          ), g.el = Fe.el;
        }
        if (J && Te(J, S), !Ke && (D = B && B.onVnodeMounted)) {
          const Fe = g;
          Te(
            () => Ye(D, Z, Fe),
            S
          );
        }
        (g.shapeFlag & 256 || Z && bn(Z.vnode) && Z.vnode.shapeFlag & 256) && p.a && Te(p.a, S), p.isMounted = !0, g = m = R = null;
      }
    };
    p.scope.on();
    const A = p.effect = new yi(O);
    p.scope.off();
    const x = p.update = A.run.bind(A), K = p.job = A.runIfDirty.bind(A);
    K.i = p, K.id = p.uid, A.scheduler = () => No(K), Et(p, !0), x();
  }, Y = (p, g, m) => {
    g.component = p;
    const R = p.vnode.props;
    p.vnode = g, p.next = null, Nc(p, g.props, R, m), zc(p, g.children, m), ct(), hs(p), ut();
  }, ne = (p, g, m, R, S, _, P, O, A = !1) => {
    const x = p && p.children, K = p ? p.shapeFlag : 0, D = g.children, { patchFlag: j, shapeFlag: B } = g;
    if (j > 0) {
      if (j & 128) {
        ze(
          x,
          D,
          m,
          R,
          S,
          _,
          P,
          O,
          A
        );
        return;
      } else if (j & 256) {
        De(
          x,
          D,
          m,
          R,
          S,
          _,
          P,
          O,
          A
        );
        return;
      }
    }
    B & 8 ? (K & 16 && Le(x, S, _), D !== x && f(m, D)) : K & 16 ? B & 16 ? ze(
      x,
      D,
      m,
      R,
      S,
      _,
      P,
      O,
      A
    ) : Le(x, S, _, !0) : (K & 8 && f(m, ""), B & 16 && k(
      D,
      m,
      R,
      S,
      _,
      P,
      O,
      A
    ));
  }, De = (p, g, m, R, S, _, P, O, A) => {
    p = p || Jt, g = g || Jt;
    const x = p.length, K = g.length, D = Math.min(x, K);
    let j;
    for (j = 0; j < D; j++) {
      const B = g[j] = A ? it(g[j]) : Ze(g[j]);
      C(
        p[j],
        B,
        m,
        null,
        S,
        _,
        P,
        O,
        A
      );
    }
    x > K ? Le(
      p,
      S,
      _,
      !0,
      !1,
      D
    ) : k(
      g,
      m,
      R,
      S,
      _,
      P,
      O,
      A,
      D
    );
  }, ze = (p, g, m, R, S, _, P, O, A) => {
    let x = 0;
    const K = g.length;
    let D = p.length - 1, j = K - 1;
    for (; x <= D && x <= j; ) {
      const B = p[x], z = g[x] = A ? it(g[x]) : Ze(g[x]);
      if (dn(B, z))
        C(
          B,
          z,
          m,
          null,
          S,
          _,
          P,
          O,
          A
        );
      else
        break;
      x++;
    }
    for (; x <= D && x <= j; ) {
      const B = p[D], z = g[j] = A ? it(g[j]) : Ze(g[j]);
      if (dn(B, z))
        C(
          B,
          z,
          m,
          null,
          S,
          _,
          P,
          O,
          A
        );
      else
        break;
      D--, j--;
    }
    if (x > D) {
      if (x <= j) {
        const B = j + 1, z = B < K ? g[B].el : R;
        for (; x <= j; )
          C(
            null,
            g[x] = A ? it(g[x]) : Ze(g[x]),
            m,
            z,
            S,
            _,
            P,
            O,
            A
          ), x++;
      }
    } else if (x > j)
      for (; x <= D; )
        je(p[x], S, _, !0), x++;
    else {
      const B = x, z = x, J = /* @__PURE__ */ new Map();
      for (x = z; x <= j; x++) {
        const we = g[x] = A ? it(g[x]) : Ze(g[x]);
        we.key != null && J.set(we.key, x);
      }
      let Z, ae = 0;
      const me = j - z + 1;
      let Ke = !1, Fe = 0;
      const yt = new Array(me);
      for (x = 0; x < me; x++) yt[x] = 0;
      for (x = B; x <= D; x++) {
        const we = p[x];
        if (ae >= me) {
          je(we, S, _, !0);
          continue;
        }
        let pe;
        if (we.key != null)
          pe = J.get(we.key);
        else
          for (Z = z; Z <= j; Z++)
            if (yt[Z - z] === 0 && dn(we, g[Z])) {
              pe = Z;
              break;
            }
        pe === void 0 ? je(we, S, _, !0) : (yt[pe - z] = x + 1, pe >= Fe ? Fe = pe : Ke = !0, C(
          we,
          g[pe],
          m,
          null,
          S,
          _,
          P,
          O,
          A
        ), ae++);
      }
      const Ct = Ke ? Jc(yt) : Jt;
      for (Z = Ct.length - 1, x = me - 1; x >= 0; x--) {
        const we = z + x, pe = g[we], jn = g[we + 1], ln = we + 1 < K ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          jn.el || ll(jn)
        ) : R;
        yt[x] === 0 ? C(
          null,
          pe,
          m,
          ln,
          S,
          _,
          P,
          O,
          A
        ) : Ke && (Z < 0 || x !== Ct[Z] ? $e(pe, m, ln, 2) : Z--);
      }
    }
  }, $e = (p, g, m, R, S = null) => {
    const { el: _, type: P, transition: O, children: A, shapeFlag: x } = p;
    if (x & 6) {
      $e(p.component.subTree, g, m, R);
      return;
    }
    if (x & 128) {
      p.suspense.move(g, m, R);
      return;
    }
    if (x & 64) {
      P.move(p, g, m, Ge);
      return;
    }
    if (P === Ee) {
      r(_, g, m);
      for (let D = 0; D < A.length; D++)
        $e(A[D], g, m, R);
      r(p.anchor, g, m);
      return;
    }
    if (P === so) {
      L(p, g, m);
      return;
    }
    if (R !== 2 && x & 1 && O)
      if (R === 0)
        O.persisted && !_[no] ? r(_, g, m) : (O.beforeEnter(_), r(_, g, m), Te(() => O.enter(_), S));
      else {
        const { leave: D, delayLeave: j, afterLeave: B } = O, z = () => {
          p.ctx.isUnmounted ? o(_) : r(_, g, m);
        }, J = () => {
          const Z = _._isLeaving || !!_[no];
          _._isLeaving && _[no](
            !0
            /* cancelled */
          ), O.persisted && !Z ? z() : D(_, () => {
            z(), B && B();
          });
        };
        j ? j(_, z, J) : J();
      }
    else
      r(_, g, m);
  }, je = (p, g, m, R = !1, S = !1) => {
    const {
      type: _,
      props: P,
      ref: O,
      children: A,
      dynamicChildren: x,
      shapeFlag: K,
      patchFlag: D,
      dirs: j,
      cacheIndex: B,
      memo: z
    } = p;
    if (D === -2 && (S = !1), O != null && (ct(), wn(O, null, m, p, !0), ut()), B != null && (g.renderCache[B] = void 0), K & 256) {
      g.ctx.deactivate(p);
      return;
    }
    const J = K & 1 && j, Z = !bn(p);
    let ae;
    if (Z && (ae = P && P.onVnodeBeforeUnmount) && Ye(ae, g, p), K & 6)
      $t(p.component, m, R);
    else {
      if (K & 128) {
        p.suspense.unmount(m, R);
        return;
      }
      J && It(p, null, g, "beforeUnmount"), K & 64 ? p.type.remove(
        p,
        g,
        m,
        Ge,
        R
      ) : x && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !x.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (_ !== Ee || D > 0 && D & 64) ? Le(
        x,
        g,
        m,
        !1,
        !0
      ) : (_ === Ee && D & 384 || !S && K & 16) && Le(A, g, m), R && ht(p);
    }
    const me = z != null && B == null;
    (Z && (ae = P && P.onVnodeUnmounted) || J || me) && Te(() => {
      ae && Ye(ae, g, p), J && It(p, null, g, "unmounted"), me && (p.el = null);
    }, m);
  }, ht = (p) => {
    const { type: g, el: m, anchor: R, transition: S } = p;
    if (g === Ee) {
      vt(m, R);
      return;
    }
    if (g === so) {
      E(p);
      return;
    }
    const _ = () => {
      o(m), S && !S.persisted && S.afterLeave && S.afterLeave();
    };
    if (p.shapeFlag & 1 && S && !S.persisted) {
      const { leave: P, delayLeave: O } = S, A = () => P(m, _);
      O ? O(p.el, _, A) : A();
    } else
      _();
  }, vt = (p, g) => {
    let m;
    for (; p !== g; )
      m = w(p), o(p), p = m;
    o(g);
  }, $t = (p, g, m) => {
    const { bum: R, scope: S, job: _, subTree: P, um: O, m: A, a: x } = p;
    Cs(A), Cs(x), R && Jr(R), S.stop(), _ && (_.flags |= 8, je(P, p, g, m)), O && Te(O, g), Te(() => {
      p.isUnmounted = !0;
    }, g);
  }, Le = (p, g, m, R = !1, S = !1, _ = 0) => {
    for (let P = _; P < p.length; P++)
      je(p[P], g, m, R, S);
  }, Nt = (p) => {
    if (p.shapeFlag & 6)
      return Nt(p.component.subTree);
    if (p.shapeFlag & 128)
      return p.suspense.next();
    const g = w(p.anchor || p.el), m = g && g[gc];
    return m ? w(m) : g;
  };
  let mt = !1;
  const ke = (p, g, m) => {
    let R;
    p == null ? g._vnode && (je(g._vnode, null, null, !0), R = g._vnode.component) : C(
      g._vnode || null,
      p,
      g,
      null,
      null,
      null,
      m
    ), g._vnode = p, mt || (mt = !0, hs(R), Hi(), mt = !1);
  }, Ge = {
    p: C,
    um: je,
    m: $e,
    r: ht,
    mt: Oe,
    mc: k,
    pc: ne,
    pbc: G,
    n: Nt,
    o: e
  };
  return {
    render: ke,
    hydrate: void 0,
    createApp: kc(ke)
  };
}
function oo({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Et({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Xc(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function sl(e, t, n = !1) {
  const r = e.children, o = t.children;
  if (N(r) && N(o))
    for (let s = 0; s < r.length; s++) {
      const i = r[s];
      let l = o[s];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = o[s] = it(o[s]), l.el = i.el), !n && l.patchFlag !== -2 && sl(i, l)), l.type === Er && (l.patchFlag === -1 && (l = o[s] = it(l)), l.el = i.el), l.type === dt && !l.el && (l.el = i.el);
    }
}
function Jc(e) {
  const t = e.slice(), n = [0];
  let r, o, s, i, l;
  const a = e.length;
  for (r = 0; r < a; r++) {
    const u = e[r];
    if (u !== 0) {
      if (o = n[n.length - 1], e[o] < u) {
        t[r] = o, n.push(r);
        continue;
      }
      for (s = 0, i = n.length - 1; s < i; )
        l = s + i >> 1, e[n[l]] < u ? s = l + 1 : i = l;
      u < e[n[s]] && (s > 0 && (t[r] = n[s - 1]), n[s] = r);
    }
  }
  for (s = n.length, i = n[s - 1]; s-- > 0; )
    n[s] = i, i = t[i];
  return n;
}
function il(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : il(t);
}
function Cs(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function ll(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? ll(t.subTree) : null;
}
const al = (e) => e.__isSuspense;
function Zc(e, t) {
  t && t.pendingBranch ? N(e) ? t.effects.push(...e) : t.effects.push(e) : ac(e);
}
const Ee = /* @__PURE__ */ Symbol.for("v-fgt"), Er = /* @__PURE__ */ Symbol.for("v-txt"), dt = /* @__PURE__ */ Symbol.for("v-cmt"), so = /* @__PURE__ */ Symbol.for("v-stc"), kt = [];
let He = null;
function ce(e = !1) {
  kt.push(He = e ? null : []);
}
function cl() {
  kt.pop(), He = kt[kt.length - 1] || null;
}
let Mn = 1;
function Ms(e, t = !1) {
  Mn += e, e < 0 && He && t && (He.hasOnce = !0);
}
function ul(e) {
  return e.dynamicChildren = Mn > 0 ? He || Jt : null, cl(), Mn > 0 && He && He.push(e), e;
}
function de(e, t, n, r, o, s) {
  return ul(
    ot(
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
function Qc(e, t, n, r, o) {
  return ul(
    at(
      e,
      t,
      n,
      r,
      o,
      !0
    )
  );
}
function fl(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function dn(e, t) {
  return e.type === t.type && e.key === t.key;
}
const dl = ({ key: e }) => e ?? null, rr = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? ge(e) || /* @__PURE__ */ Se(e) || U(e) ? { i: et, r: e, k: t, f: !!n } : e : null);
function ot(e, t = null, n = null, r = 0, o = null, s = e === Ee ? 0 : 1, i = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && dl(t),
    ref: t && rr(t),
    scopeId: Li,
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
    ctx: et
  };
  return l ? (dr(a, n), s & 128 && e.normalize(a)) : n && (a.shapeFlag |= ge(n) ? 8 : 16), Mn > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  He && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && He.push(a), a;
}
const at = eu;
function eu(e, t = null, n = null, r = 0, o = null, s = !1) {
  if ((!e || e === Mc) && (e = dt), fl(e)) {
    const l = nn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && dr(l, n), Mn > 0 && !s && He && (l.shapeFlag & 6 ? He[He.indexOf(e)] = l : He.push(l)), l.patchFlag = -2, l;
  }
  if (du(e) && (e = e.__vccOpts), t) {
    t = tu(t);
    let { class: l, style: a } = t;
    l && !ge(l) && (t.class = Ot(l)), re(a) && (/* @__PURE__ */ $o(a) && !N(a) && (a = Re({}, a)), t.style = Zt(a));
  }
  const i = ge(e) ? 1 : al(e) ? 128 : Cr(e) ? 64 : re(e) ? 4 : U(e) ? 2 : 0;
  return ot(
    e,
    t,
    n,
    r,
    o,
    i,
    s,
    !0
  );
}
function tu(e) {
  return e ? /* @__PURE__ */ $o(e) || Qi(e) ? Re({}, e) : e : null;
}
function nn(e, t, n = !1, r = !1) {
  const { props: o, ref: s, patchFlag: i, children: l, transition: a } = e, u = t ? ru(o || {}, t) : o, f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: u,
    key: u && dl(u),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && s ? N(s) ? s.concat(rr(t)) : [s, rr(t)] : rr(t)
    ) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: l,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Ee ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: a,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && nn(e.ssContent),
    ssFallback: e.ssFallback && nn(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return a && r && Wo(
    f,
    a.clone(f)
  ), f;
}
function nu(e = " ", t = 0) {
  return at(Er, null, e, t);
}
function zt(e = "", t = !1) {
  return t ? (ce(), Qc(dt, null, e)) : at(dt, null, e);
}
function Ze(e) {
  return e == null || typeof e == "boolean" ? at(dt) : N(e) ? at(
    Ee,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : fl(e) ? it(e) : at(Er, null, String(e));
}
function it(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : nn(e);
}
function dr(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (N(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), dr(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !Qi(t) ? t._ctx = et : o === 3 && et && (et.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (U(t)) {
    if (r & 65) {
      dr(e, { default: t });
      return;
    }
    t = { default: t, _ctx: et }, n = 32;
  } else
    t = String(t), r & 64 ? (n = 16, t = [nu(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function ru(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === "class")
        t.class !== r.class && (t.class = Ot([t.class, r.class]));
      else if (o === "style")
        t.style = Zt([t.style, r.style]);
      else if (mr(o)) {
        const s = t[o], i = r[o];
        i && s !== i && !(N(s) && s.includes(i)) ? t[o] = s ? [].concat(s, i) : i : i == null && s == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !yr(o) && (t[o] = i);
      } else o !== "" && (t[o] = r[o]);
  }
  return t;
}
function Ye(e, t, n, r = null) {
  qe(e, t, 7, [
    n,
    r
  ]);
}
const ou = Gi();
let su = 0;
function iu(e, t, n) {
  const r = e.type, o = (t ? t.appContext : e.appContext) || ou, s = {
    uid: su++,
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
    scope: new Ta(
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
    propsOptions: tl(r, o),
    emitsOptions: Yi(r, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: le,
    // inheritAttrs
    inheritAttrs: r.inheritAttrs,
    // state
    ctx: le,
    data: le,
    props: le,
    attrs: le,
    slots: le,
    refs: le,
    setupState: le,
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
  return s.ctx = { _: s }, s.root = t ? t.root : s, s.emit = Hc.bind(null, s), e.ce && e.ce(s), s;
}
let Ae = null;
const lu = () => Ae || et;
let pr, In;
{
  const e = br(), t = (n, r) => {
    let o;
    return (o = e[n]) || (o = e[n] = []), o.push(r), (s) => {
      o.length > 1 ? o.forEach((i) => i(s)) : o[0](s);
    };
  };
  pr = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Ae = n
  ), In = t(
    "__VUE_SSR_SETTERS__",
    (n) => En = n
  );
}
const Dn = (e) => {
  const t = Ae;
  return pr(e), e.scope.on(), () => {
    e.scope.off(), pr(t);
  };
}, Is = () => {
  Ae && Ae.scope.off(), pr(null);
};
function pl(e) {
  return e.vnode.shapeFlag & 4;
}
let En = !1;
function au(e, t = !1, n = !1) {
  t && In(t);
  const { props: r, children: o } = e.vnode, s = pl(e);
  $c(e, r, s, t), qc(e, o, n || t);
  const i = s ? cu(e, t) : void 0;
  return t && In(!1), i;
}
function cu(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Ic);
  const { setup: r } = n;
  if (r) {
    ct();
    const o = e.setupContext = r.length > 1 ? fu(e) : null, s = Dn(e), i = Tn(
      r,
      e,
      0,
      [
        e.props,
        o
      ]
    ), l = ci(i);
    if (ut(), s(), (l || e.sp) && !bn(e) && $i(e), l) {
      if (i.then(Is, Is), t)
        return i.then((a) => {
          In(!0);
          try {
            Es(e, a, t);
          } finally {
            In(!1);
          }
        }).catch((a) => {
          Rr(a, e, 0);
        });
      e.asyncDep = i;
    } else
      Es(e, i);
  } else
    gl(e);
}
function Es(e, t, n) {
  U(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : re(t) && (e.setupState = Di(t)), gl(e);
}
function gl(e, t, n) {
  const r = e.type;
  e.render || (e.render = r.render || tt);
  {
    const o = Dn(e);
    ct();
    try {
      Ec(e);
    } finally {
      ut(), o();
    }
  }
}
const uu = {
  get(e, t) {
    return xe(e, "get", ""), e[t];
  }
};
function fu(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, uu),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Go(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Di(Za(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in _n)
        return _n[n](e);
    },
    has(t, n) {
      return n in t || n in _n;
    }
  })) : e.proxy;
}
function du(e) {
  return U(e) && "__vccOpts" in e;
}
const X = (e, t) => /* @__PURE__ */ rc(e, t, En), pu = "3.5.42";
/**
* @vue/runtime-dom v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Co;
const As = typeof window < "u" && window.trustedTypes;
if (As)
  try {
    Co = /* @__PURE__ */ As.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const hl = Co ? (e) => Co.createHTML(e) : (e) => e, gu = "http://www.w3.org/2000/svg", hu = "http://www.w3.org/1998/Math/MathML", st = typeof document < "u" ? document : null, Os = st && /* @__PURE__ */ st.createElement("template"), vu = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const o = t === "svg" ? st.createElementNS(gu, e) : t === "mathml" ? st.createElementNS(hu, e) : n ? st.createElement(e, { is: n }) : st.createElement(e);
    return e === "select" && r && r.multiple != null && o.setAttribute("multiple", r.multiple), o;
  },
  createText: (e) => st.createTextNode(e),
  createComment: (e) => st.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => st.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, r, o, s) {
    const i = n ? n.previousSibling : t.lastChild;
    if (o && (o === s || o.nextSibling))
      for (; t.insertBefore(o.cloneNode(!0), n), !(o === s || !(o = o.nextSibling)); )
        ;
    else {
      Os.innerHTML = hl(
        r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e
      );
      const l = Os.content;
      if (r === "svg" || r === "mathml") {
        const a = l.firstChild;
        for (; a.firstChild; )
          l.appendChild(a.firstChild);
        l.removeChild(a);
      }
      t.insertBefore(l, n);
    }
    return [
      // first
      i ? i.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, mu = /* @__PURE__ */ Symbol("_vtc");
function yu(e, t, n) {
  const r = e[mu];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Ps = /* @__PURE__ */ Symbol("_vod"), wu = /* @__PURE__ */ Symbol("_vsh"), bu = /* @__PURE__ */ Symbol(""), _u = /(?:^|;)\s*display\s*:/;
function xu(e, t, n) {
  const r = e.style, o = ge(n);
  let s = !1;
  if (n && !o) {
    if (t)
      if (ge(t))
        for (const i of t.split(";")) {
          const l = i.slice(0, i.indexOf(":")).trim();
          n[l] == null && hn(r, l, "");
        }
      else
        for (const i in t)
          n[i] == null && hn(r, i, "");
    for (const i in n) {
      i === "display" && (s = !0);
      const l = n[i];
      l != null ? Ru(
        e,
        i,
        !ge(t) && t ? t[i] : void 0,
        l
      ) || hn(r, i, l) : hn(r, i, "");
    }
  } else if (o) {
    if (t !== n) {
      const i = r[bu];
      i && (n += ";" + i), r.cssText = n, s = _u.test(n);
    }
  } else t && e.removeAttribute("style");
  Ps in e && (e[Ps] = s ? r.display : "", e[wu] && (r.display = "none"));
}
const Yn = /\s*!important$/;
function hn(e, t, n) {
  if (N(n))
    n.forEach((r) => hn(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--"))
    Yn.test(n) ? e.setProperty(t, n.replace(Yn, ""), "important") : e.setProperty(t, n);
  else {
    const r = Su(e, t);
    Yn.test(n) ? e.setProperty(
      Kt(r),
      n.replace(Yn, ""),
      "important"
    ) : e[r] = n;
  }
}
const Ts = ["Webkit", "Moz", "ms"], io = {};
function Su(e, t) {
  const n = io[t];
  if (n)
    return n;
  let r = Ne(t);
  if (r !== "filter" && r in e)
    return io[t] = r;
  r = di(r);
  for (let o = 0; o < Ts.length; o++) {
    const s = Ts[o] + r;
    if (s in e)
      return io[t] = s;
  }
  return t;
}
function Ru(e, t, n, r) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && ge(r) && n === r;
}
const Ds = "http://www.w3.org/1999/xlink";
function ks(e, t, n, r, o, s = Oa(t)) {
  r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Ds, t.slice(6, t.length)) : e.setAttributeNS(Ds, t, n) : n == null || s && !gi(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    s ? "" : nt(n) ? String(n) : n
  );
}
function Fs(e, t, n, r, o) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? hl(n) : n);
    return;
  }
  const s = e.tagName;
  if (t === "value" && s !== "PROGRESS" && // custom elements may use _value internally
  !s.includes("-")) {
    const l = s === "OPTION" ? e.getAttribute("value") || "" : e.value, a = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (l !== a || !("_value" in e)) && (e.value = a), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let i = !1;
  if (n === "" || n == null) {
    const l = typeof e[t];
    l === "boolean" ? n = gi(n) : n == null && l === "string" ? (n = "", i = !0) : l === "number" && (n = 0, i = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  i && e.removeAttribute(o || t);
}
function Cu(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function Mu(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const Hs = /* @__PURE__ */ Symbol("_vei");
function Iu(e, t, n, r, o = null) {
  const s = e[Hs] || (e[Hs] = {}), i = s[t];
  if (r && i)
    i.value = r;
  else {
    const [l, a] = Ou(t);
    if (r) {
      const u = s[t] = Du(
        r,
        o
      );
      Cu(e, l, u, a);
    } else i && (Mu(e, l, i, a), s[t] = void 0);
  }
}
const Eu = /(Once|Passive|Capture)$/, Au = /^on:?(?:Once|Passive|Capture)$/;
function Ou(e) {
  let t, n;
  for (; (n = e.match(Eu)) && !Au.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : Kt(e.slice(2)), t];
}
let lo = 0;
const Pu = /* @__PURE__ */ Promise.resolve(), Tu = () => lo || (Pu.then(() => lo = 0), lo = Date.now());
function Du(e, t) {
  const n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    const o = n.value;
    if (N(o)) {
      const s = r.stopImmediatePropagation;
      r.stopImmediatePropagation = () => {
        s.call(r), r._stopped = !0;
      };
      const i = o.slice(), l = [r];
      for (let a = 0; a < i.length && !r._stopped; a++) {
        const u = i[a];
        u && qe(
          u,
          t,
          5,
          l
        );
      }
    } else
      qe(
        o,
        t,
        5,
        [r]
      );
  };
  return n.value = e, n.attached = Tu(), n;
}
const js = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, ku = (e, t, n, r, o, s) => {
  const i = o === "svg";
  t === "class" ? yu(e, r, i) : t === "style" ? xu(e, n, r) : mr(t) ? yr(t) || Iu(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Fu(e, t, r, i)) ? (Fs(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && ks(e, t, r, i, s, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Hu(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !ge(r))) ? Fs(e, Ne(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), ks(e, t, r, i));
};
function Fu(e, t, n, r) {
  if (r)
    return !!(t === "innerHTML" || t === "textContent" || t in e && js(t) && U(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return js(t) && ge(n) ? !1 : t in e;
}
function Hu(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const r = Ne(t);
  return Array.isArray(n) ? n.some((o) => Ne(o) === r) : Object.keys(n).some((o) => Ne(o) === r);
}
const ju = ["ctrl", "shift", "alt", "meta"], Lu = {
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
  exact: (e, t) => ju.some((n) => e[`${n}Key`] && !t.includes(n))
}, Xn = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), r = t.join(".");
  return n[r] || (n[r] = (o, ...s) => {
    for (let i = 0; i < t.length; i++) {
      const l = Lu[t[i]];
      if (l && l(o, t)) return;
    }
    return e(o, ...s);
  });
}, Ku = /* @__PURE__ */ Re({ patchProp: ku }, vu);
let Ls;
function Vu() {
  return Ls || (Ls = Gc(Ku));
}
const Bu = (...e) => {
  const t = Vu().createApp(...e), { mount: n } = t;
  return t.mount = (r) => {
    const o = Nu(r);
    if (!o) return;
    const s = t._component;
    !U(s) && !s.render && !s.template && (s.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const i = n(o, !1, $u(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), i;
  }, t;
};
function $u(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Nu(e) {
  return ge(e) ? document.querySelector(e) : e;
}
function Jn() {
  return !0;
}
const Wu = Symbol("merge-proxy"), or = Symbol("merge-proxy-sources"), Uu = {
  get(e, t, n) {
    return t === Wu ? n : t === or ? e.sources : e.get(t);
  },
  has(e, t) {
    return e.has(t);
  },
  set: Jn,
  deleteProperty: Jn,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: Jn,
      deleteProperty: Jn
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function sr(e) {
  return e && typeof e == "object" && "value" in e ? e.value : e;
}
function Mo(...e) {
  const t = e.flatMap((n) => typeof n == "object" && n !== null && or in n && Array.isArray(n[or]) ? n[or] : [n]);
  return new Proxy({
    sources: t,
    get(n) {
      for (let r = t.length - 1; r >= 0; r--) {
        const o = sr(t[r])[n];
        if (o !== void 0) return o;
      }
    },
    has(n) {
      for (let r = t.length - 1; r >= 0; r--) if (n in sr(t[r])) return !0;
      return !1;
    },
    keys() {
      const n = [];
      for (const r of t) n.push(...Object.keys(sr(r)));
      return [...Array.from(new Set(n))];
    }
  }, Uu);
}
function Ks(...e) {
  const t = {};
  for (let n of e)
    if (n = sr(n), !!n)
      for (const r of Reflect.ownKeys(n)) {
        const o = n[r];
        o !== void 0 && (t[r] = o);
      }
  return t;
}
function vl(e) {
  return typeof e == "function" ? e : (t) => {
    var n;
    return (n = e.next) == null ? void 0 : n.call(e, t);
  };
}
function qu(e) {
  return Object.assign(e, {
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: be(e, vl(t), { flush: "sync" }) })
  });
}
function zu(e) {
  return Object.assign(e, {
    set: (t) => {
      e.value = typeof t == "function" ? t(e.value) : t;
    },
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: be(e, vl(t), { flush: "sync" }) })
  });
}
function Gu() {
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
    createReadonlyAtom: (t, n) => qu(X(() => t())),
    createWritableAtom: (t, n) => zu(/* @__PURE__ */ Qa(t)),
    untrack: (t) => t(),
    batch: (t) => t()
  };
}
function Ar(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Rt(e) {
  if (Array.isArray(e)) return e.map(Rt);
  if (e && typeof e == "object") {
    const t = Object.getPrototypeOf(e);
    if (t !== Object.prototype && t !== null) return e;
    const n = t === null ? oe() : {}, r = Object.keys(e);
    for (let o = 0; o < r.length; o++) {
      const s = r[o];
      Object.defineProperty(n, s, {
        configurable: !0,
        enumerable: !0,
        value: Rt(e[s]),
        writable: !0
      });
    }
    return n;
  }
  return e;
}
function Yu(e, t) {
  const n = Object.keys(t), r = e;
  for (let o = 0; o < n.length; o++) {
    const s = n[o];
    !s.startsWith("_memo_") && s !== "_cellsCache" && (r[s] = t[s]);
  }
  return e;
}
function oe() {
  return /* @__PURE__ */ Object.create(null);
}
function rn(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function ml(e, t) {
  return (n) => {
    var r;
    (((r = t.options.atoms) == null ? void 0 : r[e]) ?? t.baseAtoms[e]).set((o) => Ar(n, o));
  };
}
function Vs(e) {
  if (typeof e != "object" || e === null) return !1;
  if (Array.isArray(e)) return !0;
  const t = Object.getPrototypeOf(e);
  return t === Object.prototype || t === null;
}
function Bs(e) {
  return Reflect.ownKeys(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
const Xu = 3;
function Ju(e, t) {
  return yl(e, t, Xu);
}
function yl(e, t, n) {
  if (Object.is(e, t)) return !0;
  if (n <= 0 || !Vs(e) || !Vs(t) || (Array.isArray(e) || Array.isArray(t)) && (!Array.isArray(e) || !Array.isArray(t) || e.length !== t.length))
    return !1;
  const r = Bs(e), o = Bs(t);
  if (r.length !== o.length) return !1;
  const s = e, i = t;
  for (let l = 0; l < r.length; l++) {
    const a = r[l];
    if (!Object.prototype.propertyIsEnumerable.call(t, a) || !yl(s[a], i[a], n - 1)) return !1;
  }
  return !0;
}
function Or(e, t, n, r = Ju) {
  const o = `on${t.charAt(0).toUpperCase()}${t.slice(1)}Change`, s = e.options[o];
  s && s((i) => {
    const l = Ar(n, i);
    return r(i, l) ? i : l;
  });
}
function Zu(e, t) {
  const n = [], r = (o) => {
    o.forEach((s) => {
      n.push(s);
      const i = t(s);
      i.length && r(i);
    });
  };
  return r(e), n;
}
const Qu = ({ fn: e, memoDeps: t, onAfterCompare: n, onAfterUpdate: r, onBeforeCompare: o, onBeforeUpdate: s }) => {
  let i = [], l;
  return (u) => {
    o == null || o();
    const f = t == null ? void 0 : t(u);
    let h = !f || f.length !== (i == null ? void 0 : i.length);
    if (!h && f) {
      for (let w = 0; w < f.length; w++) if (f[w] !== i[w]) {
        h = !0;
        break;
      }
    }
    return n == null || n(h), h && (i = f, s == null || s(), l = e(...f ?? []), r == null || r(l)), l;
  };
};
function ef(e) {
  let t = !1;
  return () => {
    if (!t) {
      t = !0;
      return;
    }
    e();
  };
}
function Pr({ feature: e, fnName: t, objectId: n, onAfterUpdate: r, table: o, ...s }) {
  const i = () => {
    if (!r) return;
    const { schedule: a, untrack: u } = o._reactivity;
    a(() => u(() => r()));
  };
  return Qu({
    ...s,
    ...{ onAfterUpdate: () => {
      i();
    } }
  });
}
function wl(e, t = "_") {
  const [n, r] = e.split(t);
  return {
    fnKey: r,
    fnName: `${n}.${r}`,
    parentName: n
  };
}
function Vt(e, t, n) {
  for (const [r, { fn: o, memoDeps: s }] of Object.entries(n)) {
    const { fnKey: i, fnName: l } = wl(r);
    t[i] = s ? Pr({
      memoDeps: s,
      fn: o,
      fnName: l,
      table: t,
      feature: e
    }) : o;
  }
}
function on(e, t, n, r) {
  for (const [o, { fn: s, memoDeps: i }] of Object.entries(r)) {
    const { fnKey: l, fnName: a } = wl(o);
    if (i) {
      const u = `_memo_${l}`;
      t[l] = function(...f) {
        if (!this[u]) {
          const h = this;
          this[u] = Pr({
            memoDeps: (w) => i(h, w),
            fn: (...w) => s(h, ...w),
            fnName: a,
            objectId: h.id,
            table: n,
            feature: e
          });
        }
        return this[u](...f);
      };
    } else t[l] = function(...u) {
      return s(this, ...u);
    };
  }
}
function _e(e, t, n, ...r) {
  var o;
  return ((o = e[t]) == null ? void 0 : o.call(e, ...r)) ?? n(e, ...r);
}
function tf(e) {
  return e.row.getValue(e.column.id);
}
function nf(e) {
  return e.getValue() ?? e.table.options.renderFallbackValue;
}
function rf(e) {
  return {
    table: e.table,
    column: e.column,
    row: e.row,
    cell: e,
    getValue: () => e.getValue(),
    renderValue: () => e.renderValue()
  };
}
const of = { assignCellPrototype: (e, t) => {
  on("coreCellsFeature", e, t, {
    cell_getValue: { fn: (n) => tf(n) },
    cell_renderValue: { fn: (n) => nf(n) },
    cell_getContext: {
      fn: (n) => rf(n),
      memoDeps: (n) => [n]
    }
  });
} };
function sf(e) {
  var t, n;
  if (!e._headerPrototype) {
    e._headerPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignHeaderPrototype) == null || n.call(t, e._headerPrototype, e);
  }
  return e._headerPrototype;
}
function bl(e, t, n) {
  const r = sf(e), o = Object.create(r);
  o.colSpan = 0, o.column = t, o.depth = n.depth, o.headerGroup = null, o.id = n.id ?? t.id, o.index = n.index, o.isPlaceholder = !!n.isPlaceholder, o.placeholderId = n.placeholderId, o.rowSpan = 0, o.subHeaders = [];
  const s = e._headerInstanceInitFns;
  for (let i = 0; i < s.length; i++) s[i](o);
  return o;
}
function lf() {
  return {
    start: [],
    end: []
  };
}
function Ht(e) {
  var r;
  const t = (r = e.table.atoms.columnVisibility) == null ? void 0 : r.get();
  if (!t) return !0;
  const n = e.columns;
  return n.length ? n.some((o) => _e(o, "getIsVisible", Ht)) : (rn(t, e.id) ? t[e.id] : void 0) ?? !0;
}
function af(e) {
  return e.getAllLeafColumns().filter((t) => _e(t, "getIsVisible", Ht));
}
function _l(e, t = 1) {
  let n = t;
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    _e(o, "getIsVisible", Ht) && o.columns.length && (n = Math.max(n, _l(o.columns, t + 1)));
  }
  return n;
}
function cf(e, t) {
  return String(t);
}
function uf(e, t, n, r) {
  let o = e ?? "";
  return t && (o = o ? `${o}_${t}` : String(t)), n && (o = o ? `${o}_${n}` : n), r && (o = o ? `${o}_${r}` : r), o;
}
function ff(e, t) {
  let n = 0;
  for (let r = 0; r < e.length; r++) e[r].column === t && n++;
  return n;
}
function xl(e, t, n, r, o, s) {
  const i = {
    depth: t,
    id: cf(r, t),
    headers: []
  }, l = [];
  for (let a = 0; a < e.length; a++) {
    if (!(a in e)) continue;
    const u = e[a], f = l[l.length - 1], h = u.column.depth === i.depth;
    let w, y = !1;
    if (h && u.column.parent ? w = u.column.parent : (w = u.column, y = !0), f && f.column === w) f.subHeaders.push(u);
    else {
      const I = bl(n, w, {
        id: uf(r, t, w.id, u.id),
        isPlaceholder: y,
        placeholderId: y ? String(ff(l, w)) : void 0,
        depth: t,
        index: l.length
      });
      I.subHeaders.push(u), l.push(I);
    }
    i.headers.push(u), u.headerGroup = i;
  }
  for (let a = 0; a < s.length; a++) s[a](i);
  o.push(i), t > 0 && xl(l, t - 1, n, r, o, s);
}
function Sl(e) {
  for (let t = 0; t < e.length; t++) {
    const n = e[t];
    if (!_e(n.column, "getIsVisible", Ht)) continue;
    let r = 0;
    if (n.subHeaders.length) {
      Sl(n.subHeaders);
      for (let o = 0; o < n.subHeaders.length; o++) {
        const s = n.subHeaders[o];
        _e(s.column, "getIsVisible", Ht) && (r += s.colSpan);
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
function $s(e, t, n, r) {
  var a;
  const o = _l(e), s = [], i = n._headerGroupInstanceInitFns, l = new Array(t.length);
  for (let u = 0; u < t.length; u++)
    u in t && (l[u] = bl(n, t[u], {
      depth: o,
      index: u
    }));
  return xl(l, o - 1, n, r, s, i), s.reverse(), Sl(((a = s[0]) == null ? void 0 : a.headers) ?? []), s;
}
function df(e) {
  var t, n;
  if (!e._columnPrototype) {
    e._columnPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignColumnPrototype) == null || n.call(t, e._columnPrototype, e);
  }
  return e._columnPrototype;
}
function pf(e, t, n, r) {
  const o = {
    ...e.getDefaultColumnDef(),
    ...t
  }, s = o.accessorKey, i = s === void 0 ? void 0 : String(s), l = o.id ?? (i == null ? void 0 : i.replaceAll(".", "_")) ?? (typeof o.header == "string" ? o.header : void 0);
  let a;
  if (o.accessorFn) a = o.accessorFn;
  else if (s !== void 0) if (typeof s == "string" && s.includes(".")) {
    const w = s.split(".");
    a = (y) => {
      let I = y;
      for (let C = 0; C < w.length; C++) {
        const T = w[C];
        I = I == null ? void 0 : I[T];
      }
      return I;
    };
  } else a = (w) => w[o.accessorKey];
  if (!l)
    throw new Error();
  const u = df(e), f = Object.create(u);
  f.accessorFn = a, f.columnDef = o, f.columns = [], f.depth = n, f.id = `${String(l)}`, f.parent = r;
  const h = e._columnInstanceInitFns;
  for (let w = 0; w < h.length; w++) h[w](f);
  return f;
}
function Rl(e) {
  var n;
  const t = (n = e.atoms.columnOrder) == null ? void 0 : n.get();
  return (r) => {
    let o = [];
    if (!(t != null && t.length)) o = r;
    else {
      const s = /* @__PURE__ */ new Map();
      for (let i = 0; i < r.length; i++) {
        const l = r[i];
        s.set(l.id, l);
      }
      for (let i = 0; i < t.length; i++) {
        const l = t[i], a = s.get(l);
        a && (o.push(a), s.delete(l));
      }
      for (let i = 0; i < r.length; i++) {
        const l = r[i];
        s.has(l.id) && o.push(l);
      }
    }
    return gf(e, o);
  };
}
function gf(e, t) {
  var l;
  const n = ((l = e.atoms.grouping) == null ? void 0 : l.get()) ?? [], { groupedColumnMode: r } = e.options;
  if (!n.length || !r) return t;
  const o = t.filter((a) => !n.includes(a.id));
  if (r === "remove") return o;
  const s = /* @__PURE__ */ new Map();
  for (let a = 0; a < t.length; a++) {
    const u = t[a];
    s.set(u.id, u);
  }
  const i = [];
  for (let a = 0; a < n.length; a++) {
    const u = s.get(n[a]);
    u && i.push(u);
  }
  return [...i, ...o];
}
function hf(e) {
  return [e, ...e.columns.flatMap((t) => t.getFlatColumns())];
}
function vf(e) {
  if (e.columns.length) {
    const t = e.columns.flatMap((n) => n.getLeafColumns());
    return _e(e.table, "getOrderColumns", Rl)(t);
  }
  return [e];
}
function mf(e) {
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
function Cl(e, t, n, r = 0) {
  const o = new Array(t.length);
  for (let s = 0; s < t.length; s++) {
    if (!(s in t)) continue;
    const i = t[s], l = pf(e, i, r, n), a = i;
    l.columns = a.columns ? Cl(e, a.columns, l, r + 1) : [], o[s] = l;
  }
  return o;
}
function yf(e) {
  return Cl(e, e.options.columns);
}
function wf(e) {
  return e.getAllColumns().flatMap((t) => t.getFlatColumns());
}
function bf(e) {
  const t = oe(), n = e.getAllFlatColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function _f(e) {
  const t = e.getAllColumns().flatMap((n) => n.getLeafColumns());
  return _e(e, "getOrderColumns", Rl)(t);
}
function xf(e) {
  const t = oe(), n = e.getAllLeafColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function Sf(e, t) {
  return e.getAllFlatColumnsById()[t];
}
const Rf = {
  assignColumnPrototype: (e, t) => {
    on("coreColumnsFeature", e, t, {
      column_getFlatColumns: {
        fn: (n) => hf(n),
        memoDeps: (n) => [n.table.options.columns]
      },
      column_getLeafColumns: {
        fn: (n) => vf(n),
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
    Vt("coreColumnsFeature", e, {
      table_getDefaultColumnDef: {
        fn: () => mf(e),
        memoDeps: () => [e.options.defaultColumn]
      },
      table_getAllColumns: {
        fn: () => yf(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumns: {
        fn: () => wf(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumnsById: {
        fn: () => bf(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllLeafColumns: {
        fn: () => _f(e),
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
        fn: () => xf(e),
        memoDeps: () => [e.getAllLeafColumns()]
      },
      table_getColumn: { fn: (t) => Sf(e, t) }
    });
  }
};
function Ml(e, t) {
  for (let n = 0; n < e.subHeaders.length; n++) Ml(e.subHeaders[n], t);
  t.push(e);
}
function Cf(e) {
  const t = [];
  return Ml(e, t), t;
}
function Mf(e) {
  return {
    column: e.column,
    header: e,
    table: e.column.table
  };
}
function If(e) {
  var u;
  const { start: t, end: n } = ((u = e.atoms.columnPinning) == null ? void 0 : u.get()) ?? lf(), r = e.getAllColumns(), o = _e(e, "getVisibleLeafColumns", af);
  if (!t.length && !n.length) return $s(r, o, e);
  const s = e.getAllLeafColumnsById(), i = [];
  for (let f = 0; f < t.length; f++) {
    const h = s[t[f]];
    h && _e(h, "getIsVisible", Ht) && i.push(h);
  }
  const l = [];
  for (let f = 0; f < n.length; f++) {
    const h = s[n[f]];
    h && _e(h, "getIsVisible", Ht) && l.push(h);
  }
  const a = o.filter((f) => !t.includes(f.id) && !n.includes(f.id));
  return $s(r, [
    ...i,
    ...a,
    ...l
  ], e);
}
function Ef(e) {
  return [...e.getHeaderGroups()].reverse();
}
function Af(e) {
  const t = e.getHeaderGroups(), n = [];
  for (let r = 0; r < t.length; r++) {
    const o = t[r].headers;
    for (let s = 0; s < o.length; s++) n.push(o[s]);
  }
  return n;
}
function Of(e) {
  var r;
  const t = ((r = e.getHeaderGroups()[0]) == null ? void 0 : r.headers) ?? [], n = [];
  for (let o = 0; o < t.length; o++) {
    const s = t[o].getLeafHeaders();
    for (let i = 0; i < s.length; i++) n.push(s[i]);
  }
  return n;
}
const Pf = {
  assignHeaderPrototype: (e, t) => {
    on("coreHeadersFeature", e, t, {
      header_getLeafHeaders: {
        fn: (n) => Cf(n),
        memoDeps: (n) => [n.column.table.options.columns]
      },
      header_getContext: {
        fn: (n) => Mf(n),
        memoDeps: (n) => [n.column.table.options.columns]
      }
    });
  },
  constructTableAPIs: (e) => {
    Vt("coreHeadersFeature", e, {
      table_getHeaderGroups: {
        fn: () => If(e),
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
        fn: () => Ef(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getFlatHeaders: {
        fn: () => Af(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getLeafHeaders: {
        fn: () => Of(e),
        memoDeps: () => [e.getHeaderGroups()]
      }
    });
  }
};
function Tf(e) {
  var t, n;
  if (!e._rowPrototype) {
    e._rowPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignRowPrototype) == null || n.call(t, e._rowPrototype, e);
  }
  return e._rowPrototype;
}
const Df = (e, t, n, r, o, s, i) => {
  const l = Tf(e), a = Object.create(l);
  a._displayIndexCache = -1, a._uniqueValuesCache = oe(), a._valuesCache = oe(), a.depth = o, a.id = t, a.index = r, a.original = n, a.parentId = i, a.subRows = [];
  const u = e._rowInstanceInitFns;
  for (let f = 0; f < u.length; f++) u[f](a);
  return a;
};
function kf() {
  return [];
}
function Ff(e, t) {
  Or(e, "cellSelection", Rt(e.initialState.cellSelection) ?? kf());
}
function Hf(e) {
  e.atoms.cellSelection && (e.options.autoResetAll ?? e.options.autoResetCellSelection ?? !0) && e._reactivity.schedule(() => Ff(e));
}
function jf() {
  return oe();
}
function Il(e) {
  e.atoms.expanded && (e.options.autoResetAll ?? e.options.autoResetExpanded ?? !e.options.manualExpanding) && e._reactivity.schedule(() => Al(e));
}
function gr(e, t) {
  var n, r;
  (r = (n = e.options).onExpandedChange) == null || r.call(n, t);
}
function El(e, t) {
  var r;
  const n = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t ?? !Pl(e)) {
    if (n === !0 || !Ol(e)) return;
    gr(e, !0);
  } else {
    if (n !== !0 && !Object.keys(n).length) return;
    gr(e, oe());
  }
}
function Al(e, t) {
  const n = e.initialState.expanded;
  Or(e, "expanded", t ? oe() : n === !0 ? !0 : Object.assign(oe(), Rt(n ?? {})));
}
function Ol(e) {
  return e.getPrePaginatedRowModel().flatRows.some((t) => jt(t));
}
function Lf(e) {
  return (t) => {
    El(e);
  };
}
function Kf(e) {
  var n;
  const t = ((n = e.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return t === !0 || Object.values(t).some(Boolean);
}
function Pl(e) {
  var r;
  const t = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t === !0) return !0;
  if (!Object.keys(t).length) return !1;
  const n = e.getRowModel().flatRows.filter((o) => jt(o));
  return !(!n.length || n.some((o) => !Tr(o)));
}
function Vf(e) {
  var r;
  let t = 0;
  const n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return (n === !0 ? Object.values(e.getRowModel().rowsById).filter((o) => jt(o)).map((o) => o.id) : Object.keys(n ?? {})).forEach((o) => {
    const s = o.split(".");
    t = Math.max(t, s.length);
  }), t;
}
function Tl(e, t) {
  var s;
  const n = ((s = e.table.atoms.expanded) == null ? void 0 : s.get()) ?? {}, r = n === !0 || Io(n, e.id), o = t ?? !r;
  o !== r && (o && !jt(e) || gr(e.table, (i) => {
    const l = i === !0 ? !0 : Io(i, e.id);
    let a = oe();
    if (i === !0 ? Object.values(e.table.getRowModel().rowsById).forEach((u) => {
      jt(u) && (a[u.id] = !0);
    }) : a = Object.assign(oe(), i), !l && o)
      return a[e.id] = !0, a;
    if (l && !o) {
      const u = oe(), f = Object.keys(a);
      for (let h = 0; h < f.length; h++) {
        const w = f[h];
        w !== e.id && a[w] && (u[w] = !0);
      }
      return u;
    }
    return i;
  }));
}
function Tr(e) {
  var n, r, o;
  const t = ((n = e.table.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return !!(((o = (r = e.table.options).getIsRowExpanded) == null ? void 0 : o.call(r, e)) ?? (t === !0 || Io(t, e.id)));
}
function Io(e, t) {
  return !!(e && e !== !0 && rn(e, t) && e[t]);
}
function jt(e) {
  var t, n;
  return ((n = (t = e.table.options).getRowCanExpand) == null ? void 0 : n.call(t, e)) ?? ((e.table.options.enableExpanding ?? !0) && !!e.subRows.length);
}
function Bf(e) {
  let t = !0, n = e;
  for (; t && n.parentId; )
    n = e.table.getRow(n.parentId, !0), t = Tr(n);
  return t;
}
function $f(e) {
  const t = jt(e);
  return () => {
    t && Tl(e);
  };
}
const Eo = 0;
function Nf(e) {
  var t, n;
  if (e.options.autoResetAll ?? e.options.autoResetPageIndex ?? !e.options.manualPagination) {
    if ((((n = (t = e.atoms.pagination) == null ? void 0 : t.get()) == null ? void 0 : n.pageIndex) ?? Eo) === Eo) return;
    qf(e);
  }
}
function Wf(e, t) {
  Or(e, "pagination", t);
}
function Uf(e, t) {
  Wf(e, (n) => {
    let r = Ar(t, n.pageIndex);
    const o = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
    return r = Math.max(0, Math.min(r, o)), {
      ...n,
      pageIndex: r
    };
  });
}
function qf(e, t) {
  Uf(e, Eo);
}
function zf(e, t) {
  Or(e, "sorting", t);
}
function Gf(e, t) {
  zf(e, Rt(e.initialState.sorting ?? []));
}
function Yf(e) {
  e.atoms.sorting && (e.options.autoResetAll ?? e.options.autoResetSorting ?? !1) && Gf(e);
}
function Dl() {
  return (e) => Pr({
    feature: "coreRowModelsFeature",
    table: e,
    fnName: "table.getCoreRowModel",
    memoDeps: () => [e.options.data],
    fn: () => Xf(e, e.options.data),
    onAfterUpdate: ef(() => {
      Il(e), Nf(e), Yf(e), Hf(e);
    })
  });
}
function kl(e, t, n, r = 0, o) {
  var i;
  const s = [];
  for (let l = 0; l < n.length; l++) {
    const a = n[l], u = Df(e, e.getRowId(a, l, o), a, l, r, void 0, o == null ? void 0 : o.id);
    t.flatRows.push(u), t.rowsById[u.id] = u, s.push(u), e.options.getSubRows && (u.originalSubRows = e.options.getSubRows(a, l), (i = u.originalSubRows) != null && i.length && (u.subRows = kl(e, t, u.originalSubRows, r + 1, u)));
  }
  return s;
}
function Xf(e, t) {
  const n = {
    rows: [],
    flatRows: [],
    rowsById: oe()
  };
  return n.rows = kl(e, n, t), n;
}
function Jf(e) {
  var t, n;
  return e._rowModels.coreRowModel || (e._rowModels.coreRowModel = ((n = (t = e.options.features).coreRowModel) == null ? void 0 : n.call(t, e)) ?? Dl()(e)), e._rowModels.coreRowModel();
}
function Zf(e) {
  return e.getCoreRowModel();
}
function Qf(e) {
  var t, n;
  return e._rowModels.filteredRowModel || (e._rowModels.filteredRowModel = (n = (t = e.options.features).filteredRowModel) == null ? void 0 : n.call(t, e)), e.options.manualFiltering || !e._rowModels.filteredRowModel ? e.getPreFilteredRowModel() : e._rowModels.filteredRowModel();
}
function ed(e) {
  return e.getFilteredRowModel();
}
function td(e) {
  var t, n;
  return e._rowModels.groupedRowModel || (e._rowModels.groupedRowModel = (n = (t = e.options.features).groupedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualGrouping || !e._rowModels.groupedRowModel ? e.getPreGroupedRowModel() : e._rowModels.groupedRowModel();
}
function nd(e) {
  return e.getGroupedRowModel();
}
function rd(e) {
  var t, n;
  return e._rowModels.sortedRowModel || (e._rowModels.sortedRowModel = (n = (t = e.options.features).sortedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualSorting || !e._rowModels.sortedRowModel ? e.getPreSortedRowModel() : e._rowModels.sortedRowModel();
}
function od(e) {
  return e.getSortedRowModel();
}
function sd(e) {
  var t, n;
  return e._rowModels.expandedRowModel || (e._rowModels.expandedRowModel = (n = (t = e.options.features).expandedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualExpanding || !e._rowModels.expandedRowModel ? e.getPreExpandedRowModel() : e._rowModels.expandedRowModel();
}
function id(e) {
  return e.getExpandedRowModel();
}
function ld(e) {
  var t, n;
  return e._rowModels.paginatedRowModel || (e._rowModels.paginatedRowModel = (n = (t = e.options.features).paginatedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualPagination || !e._rowModels.paginatedRowModel ? e.getPrePaginatedRowModel() : e._rowModels.paginatedRowModel();
}
function ad(e) {
  return e.getPaginatedRowModel();
}
const cd = { constructTableAPIs: (e) => {
  Vt("coreRowModelsFeature", e, {
    table_getCoreRowModel: { fn: () => Jf(e) },
    table_getPreFilteredRowModel: { fn: () => Zf(e) },
    table_getFilteredRowModel: { fn: () => Qf(e) },
    table_getPreGroupedRowModel: { fn: () => ed(e) },
    table_getGroupedRowModel: { fn: () => td(e) },
    table_getPreSortedRowModel: { fn: () => nd(e) },
    table_getSortedRowModel: { fn: () => rd(e) },
    table_getPreExpandedRowModel: { fn: () => od(e) },
    table_getExpandedRowModel: { fn: () => sd(e) },
    table_getPrePaginatedRowModel: { fn: () => id(e) },
    table_getPaginatedRowModel: { fn: () => ld(e) },
    table_getRowModel: { fn: () => ad(e) }
  });
} };
function ud(e) {
  var t, n;
  if (!e._cellPrototype) {
    e._cellPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignCellPrototype) == null || n.call(t, e._cellPrototype, e);
  }
  return e._cellPrototype;
}
function fd(e, t, n) {
  const r = ud(n), o = Object.create(r);
  o.column = e, o.id = `${t.id}_${e.id}`, o.row = t;
  const s = n._cellInstanceInitFns;
  for (let i = 0; i < s.length; i++) s[i](o);
  return o;
}
function dd(e) {
  const t = e.table.getRowsInDisplayOrder(), n = e._displayIndexCache;
  return t[n] === e ? n : -1;
}
function pd(e) {
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
function gd(e, t) {
  if (rn(e._valuesCache, t)) return e._valuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return e._valuesCache[t] = n.accessorFn(e.original, e.index), e._valuesCache[t];
}
function hd(e, t) {
  if (rn(e._uniqueValuesCache, t)) return e._uniqueValuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return n.columnDef.getUniqueValues ? (e._uniqueValuesCache[t] = n.columnDef.getUniqueValues(e.original, e.index), e._uniqueValuesCache[t]) : (e._uniqueValuesCache[t] = [e.getValue(t)], e._uniqueValuesCache[t]);
}
function vd(e, t) {
  return e.getValue(t) ?? e.table.options.renderFallbackValue;
}
function md(e) {
  return Zu(e.subRows, (t) => t.subRows);
}
function yd(e) {
  const t = e.getCoreRowModel().flatRows;
  let n = 0;
  for (let r = 0; r < t.length; r++) n = Math.max(n, t[r].depth);
  return n;
}
function wd(e) {
  if (e.parentId)
    return e.table.getCoreRowModel().rowsById[e.parentId] ?? e.table.getRow(e.parentId, !0);
}
function bd(e) {
  const t = [];
  let n = e;
  for (; ; ) {
    const r = n.getParentRow();
    if (!r) break;
    t.push(r), n = r;
  }
  return t.reverse();
}
function _d(e) {
  const t = e.table.getAllLeafColumns();
  let n = e._cellsCache;
  n || (n = e._cellsCache = /* @__PURE__ */ new WeakMap());
  const r = new Array(t.length);
  for (let o = 0; o < t.length; o++) {
    const s = t[o];
    let i = n.get(s);
    i || (i = fd(s, e, e.table), n.set(s, i)), r[o] = i;
  }
  return r;
}
function xd(e) {
  const t = oe(), n = e.getAllCells();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.column.id] = o;
  }
  return t;
}
function Sd(e, t, n, r) {
  var o, s;
  return ((s = (o = t.options).getRowId) == null ? void 0 : s.call(o, e, n, r)) ?? (r ? `${r.id}.${n}` : String(n));
}
function Rd(e, t, n) {
  let r = (n ? e.getPrePaginatedRowModel() : e.getRowModel()).rowsById[t];
  if (!r && (r = e.getCoreRowModel().rowsById[t], !r))
    throw new Error();
  return r;
}
const Cd = {
  assignRowPrototype: (e, t) => {
    on("coreRowsFeature", e, t, {
      row_getDisplayIndex: { fn: (n) => dd(n) },
      row_getAllCellsByColumnId: {
        fn: (n) => xd(n),
        memoDeps: (n) => [n.getAllCells()]
      },
      row_getAllCells: {
        fn: (n) => _d(n),
        memoDeps: (n) => [n.table.getAllLeafColumns()]
      },
      row_getLeafRows: {
        fn: (n) => md(n),
        memoDeps: (n) => [n.subRows]
      },
      row_getParentRow: { fn: (n) => wd(n) },
      row_getParentRows: { fn: (n) => bd(n) },
      row_getUniqueValues: { fn: (n, r) => hd(n, r) },
      row_getValue: { fn: (n, r) => gd(n, r) },
      row_renderValue: { fn: (n, r) => vd(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    Vt("coreRowsFeature", e, {
      table_getRowsInDisplayOrder: {
        fn: () => pd(e),
        memoDeps: () => {
          var t;
          return [
            e.getPrePaginatedRowModel().rows,
            e.options.paginateExpandedRows,
            e.options.paginateExpandedRows === !1 ? (t = e.atoms.expanded) == null ? void 0 : t.get() : void 0
          ];
        }
      },
      table_getRowId: { fn: (t, n, r) => Sd(t, e, n, r) },
      table_getRow: { fn: (t, n) => Rd(e, t, n) },
      table_getMaxSubRowDepth: {
        fn: () => yd(e),
        memoDeps: () => [e.getCoreRowModel()]
      }
    });
  }
};
function Fl(e, t, n = (r, o) => r === o) {
  const r = t === void 0 ? e.options.state : t;
  e._reactivity.batch(() => {
    if (r) for (const o in r) {
      const s = e.baseAtoms[o];
      if (!s) continue;
      const i = r[o], l = i === void 0 ? e.initialState[o] : i;
      n(e._reactivity.untrack(() => s.get()), l) || s.set(() => l);
    }
  });
}
function Md(e, t, n = (r, o) => r === o) {
  e._reactivity.batch(() => {
    var r, o;
    Fl(e, t, n), (o = (r = e._reactivity).commit) == null || o.call(r);
  });
}
function Id(e) {
  var r, o;
  const t = Rt(e.initialState);
  e._reactivity.batch(() => {
    const s = Object.keys(t);
    for (let i = 0; i < s.length; i++) {
      const l = s[i];
      e.baseAtoms[l].set(t[l]);
    }
  });
  const n = Object.values(e._features);
  for (let s = 0; s < n.length; s++) (o = (r = n[s]).resetTableInstanceData) == null || o.call(r, e);
}
function Ed(e, t) {
  const { features: n, atoms: r, initialState: o } = e.options;
  if (!e.options.mergeOptions) return {
    ...e.options,
    ...t,
    features: n,
    atoms: r,
    initialState: o
  };
  const s = e.options.mergeOptions(e.options, t), i = { ...Object.getOwnPropertyDescriptors(s) };
  return Object.defineProperties(Object.create(Object.getPrototypeOf(s)), {
    ...i,
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
function Ad(e, t, n) {
  const r = Ed(e, Ar(t, e.options));
  e.optionsStore ? e.optionsStore.set(() => r) : e.options = r, Md(e, r.state ?? null);
}
const Od = { constructTableAPIs: (e) => {
  Vt("coreTablesFeature", e, {
    table_reset: { fn: () => Id(e) },
    table_setOptions: { fn: (t) => Ad(e, t) }
  });
} }, Pd = {
  coreCellsFeature: of,
  coreColumnsFeature: Rf,
  coreHeadersFeature: Pf,
  coreRowModelsFeature: cd,
  coreRowsFeature: Cd,
  coreTablesFeature: Od
};
function Td(e) {
  const t = e;
  return Object.defineProperty(e, "state", { get() {
    return e.get();
  } }), "set" in e && (t.setState = e.set.bind(e)), t;
}
function Dd(e, t) {
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
  const n = Ns(e);
  if (n.length !== Ns(t).length) return !1;
  for (let r = 0; r < n.length; r++) if (!Object.prototype.hasOwnProperty.call(t, n[r]) || !Object.is(e[n[r]], t[n[r]])) return !1;
  return !0;
}
function Ns(e) {
  return Object.keys(e).concat(Object.getOwnPropertySymbols(e));
}
function kd(e, t = {}) {
  return Object.values(e).forEach((n) => {
    var r;
    t = ((r = n.getInitialState) == null ? void 0 : r.call(n, t)) ?? t;
  }), Rt(t);
}
function Fd(e) {
  var W, ue;
  const t = e.features.coreReactivityFeature, { aggregationFns: n, columnMeta: r, coreRowModel: o, expandedRowModel: s, facetedMinMaxValues: i, facetedRowModel: l, facetedUniqueValues: a, filterFns: u, filterMeta: f, filteredRowModel: h, groupedRowModel: w, paginatedRowModel: y, sortFns: I, sortedRowModel: C, tableMeta: T, ...F } = e.features, M = {
    _cellInstanceInitFns: [],
    _columnInstanceInitFns: [],
    _features: {
      ...Pd,
      ...F
    },
    _headerGroupInstanceInitFns: [],
    _headerInstanceInitFns: [],
    _reactivity: t,
    _rowInstanceInitFns: [],
    _rowModelFns: {
      aggregationFns: n,
      filterFns: u,
      sortFns: I
    },
    _rowModels: {},
    atoms: {},
    baseAtoms: {}
  }, L = Object.values(M._features), E = {
    ...L.reduce((k, H) => {
      var G;
      return Object.assign(k, (G = H.getDefaultTableOptions) == null ? void 0 : G.call(H, M));
    }, {}),
    ...e
  };
  if (t.wrapExternalAtoms && E.atoms) for (const [k, H] of Object.entries(E.atoms)) {
    const G = H, fe = t.createWritableAtom(G.get(), { debugName: `externalAtom/${k}` });
    E.atoms[k] = fe;
    let se = !1;
    const ve = G.subscribe((Ce) => {
      se || fe.set(Ce);
    }), Oe = fe.subscribe((Ce) => {
      se = !0, G.set(Ce), se = !1;
    });
    t.addSubscription(ve), t.addSubscription(Oe);
  }
  t.createOptionsStore ? (M.optionsStore = t.createWritableAtom(E, { debugName: "table/optionsStore" }), Object.defineProperty(M, "options", {
    configurable: !0,
    enumerable: !0,
    get() {
      return M.optionsStore.get();
    },
    set(k) {
      M.optionsStore.set(() => k);
    }
  })) : M.options = E, M.initialState = kd(M._features, M.options.initialState);
  const $ = Object.keys(M.initialState);
  for (let k = 0; k < $.length; k++) {
    const H = $[k];
    M.baseAtoms[H] = t.createWritableAtom(M.initialState[H], { debugName: `table/baseAtoms/${H}` }), M.atoms[H] = t.createReadonlyAtom(() => {
      var Oe;
      const G = M.options, fe = (Oe = G.atoms) == null ? void 0 : Oe[H], se = fe ? fe.get() : M.baseAtoms[H].get();
      if (fe) return se;
      const ve = G.state;
      if (ve && rn(ve, H)) {
        const Ce = ve[H];
        return Ce === void 0 ? M.initialState[H] : Ce;
      }
      return se;
    }, { debugName: `table/atoms/${H}` });
  }
  Fl(M), M.store = Td(t.createReadonlyAtom(() => {
    const k = {};
    for (let H = 0; H < $.length; H++) {
      const G = $[H];
      k[G] = M.atoms[G].get();
    }
    return k;
  }, {
    compare: Dd,
    debugName: "table/store"
  }));
  for (let k = 0; k < L.length; k++) {
    const H = L[k];
    (W = H.initTableInstanceData) == null || W.call(H, M), H.initCellInstanceData && M._cellInstanceInitFns.push(H.initCellInstanceData.bind(H)), H.initColumnInstanceData && M._columnInstanceInitFns.push(H.initColumnInstanceData.bind(H)), H.initHeaderGroupInstanceData && M._headerGroupInstanceInitFns.push(H.initHeaderGroupInstanceData.bind(H)), H.initHeaderInstanceData && M._headerInstanceInitFns.push(H.initHeaderInstanceData.bind(H)), H.initRowInstanceData && M._rowInstanceInitFns.push(H.initRowInstanceData.bind(H)), (ue = H.constructTableAPIs) == null || ue.call(H, M);
  }
  return M;
}
const Hd = {
  getInitialState: (e) => ({
    expanded: jf(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onExpandedChange: ml("expanded", e),
    paginateExpandedRows: !0
  }),
  assignRowPrototype: (e, t) => {
    on("rowExpandingFeature", e, t, {
      row_toggleExpanded: { fn: (n, r) => Tl(n, r) },
      row_getIsExpanded: { fn: (n) => Tr(n) },
      row_getCanExpand: { fn: (n) => jt(n) },
      row_getIsAllParentsExpanded: { fn: (n) => Bf(n) },
      row_getToggleExpandedHandler: { fn: (n) => $f(n) }
    });
  },
  constructTableAPIs: (e) => {
    Vt("rowExpandingFeature", e, {
      table_autoResetExpanded: { fn: () => Il(e) },
      table_setExpanded: { fn: (t) => gr(e, t) },
      table_toggleAllRowsExpanded: { fn: (t) => El(e, t) },
      table_resetExpanded: { fn: (t) => Al(e, t) },
      table_getCanSomeRowsExpand: { fn: () => Ol(e) },
      table_getToggleAllRowsExpandedHandler: { fn: () => Lf(e) },
      table_getIsSomeRowsExpanded: { fn: () => Kf(e) },
      table_getIsAllRowsExpanded: { fn: () => Pl(e) },
      table_getExpandedDepth: { fn: () => Vf(e) }
    });
  }
};
function jd() {
  return oe();
}
function sn(e, t) {
  var n, r;
  (r = (n = e.options).onRowSelectionChange) == null || r.call(n, t);
}
function Ld(e, t) {
  e._lastSelectedRowId = null, sn(e, t ? oe() : Object.assign(oe(), Rt(e.initialState.rowSelection ?? {})));
}
function Hl(e, t, n) {
  e._lastSelectedRowId = null, sn(e, (r) => {
    if (t = typeof t < "u" ? t : !_e(e, "getIsAllRowsSelected", Kl), n != null && n.deselectAll && !t) return oe();
    const o = Object.assign(oe(), r), s = e.getPreGroupedRowModel().flatRows;
    if (t) {
      const i = /* @__PURE__ */ new Map();
      s.forEach((l) => {
        hr(l, i) && (o[l.id] = !0);
      });
    } else s.forEach((i) => {
      pt(i) && delete o[i.id];
    });
    return o;
  });
}
function jl(e, t, n) {
  e._lastSelectedRowId = null, sn(e, (r) => {
    const o = typeof t < "u" ? t : !_e(e, "getIsAllPageRowsSelected", Vl);
    if (n != null && n.deselectAll && !o) return oe();
    const s = Object.assign(oe(), r);
    return e.getRowModel().rows.forEach((i) => {
      kr(s, i.id, o, !0, e, !0);
    }), s;
  });
}
function Kd(e) {
  return e.getCoreRowModel();
}
function Vd(e) {
  const t = e.getCoreRowModel();
  return _e(e, "getIsSomeRowsSelected", Dr) ? Jo(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: oe()
  };
}
function Bd(e) {
  const t = e.getFilteredRowModel();
  return _e(e, "getIsSomeRowsSelected", Dr) ? Jo(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: oe()
  };
}
function $d(e) {
  const t = e.getSortedRowModel();
  return _e(e, "getIsSomeRowsSelected", Dr) ? Jo(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: oe()
  };
}
function Ll(e) {
  var t;
  return Object.keys(((t = e.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function Kl(e) {
  var o;
  const t = e.getFilteredRowModel().flatRows, n = ((o = e.atoms.rowSelection) == null ? void 0 : o.get()) ?? {};
  let r = !!(t.length && Object.keys(n).length);
  if (r) {
    const s = /* @__PURE__ */ new Map();
    t.some((i) => !kn(i, n) && hr(i, s)) && (r = !1);
  }
  return r;
}
function Vl(e) {
  var s;
  const t = e.getPaginatedRowModel().flatRows, n = ((s = e.atoms.rowSelection) == null ? void 0 : s.get()) ?? {}, r = /* @__PURE__ */ new Map();
  let o = !1;
  for (let i = 0; i < t.length; i++) {
    const l = t[i];
    if (kn(l, n))
      !o && hr(l, r) && (o = !0);
    else if (hr(l, r)) return !1;
  }
  return o;
}
function Dr(e) {
  return _e(e, "getSelectedRowIds", Ll).length > 0;
}
function Nd(e) {
  return e.getPaginatedRowModel().flatRows.filter((t) => pt(t)).some((t) => Yo(t) || _e(t, "getIsSomeSelected", $l));
}
function Wd(e) {
  return (t) => {
    Hl(e, t.target.checked);
  };
}
function Ud(e) {
  return (t) => {
    jl(e, t.target.checked);
  };
}
function Bl(e, t, n) {
  const r = Yo(e);
  sn(e.table, (o) => {
    t = typeof t < "u" ? t : !r;
    const s = Object.assign(oe(), o);
    return kr(s, e.id, t, ((n == null ? void 0 : n.selectChildren) ?? !0) && Ft(e), e.table), !t && (n != null && n.deselectParents) && Nl(s, e), s;
  });
}
function Yo(e) {
  var t;
  return kn(e, ((t = e.table.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function $l(e) {
  return Zo(e) === "some";
}
function qd(e) {
  return Zo(e) === "all";
}
function pt(e) {
  const t = e.table.options;
  return typeof t.enableRowSelection == "function" ? t.enableRowSelection(e) : t.enableRowSelection ?? !0;
}
function Xo(e) {
  const t = e.table.options;
  return typeof t.enableSubRowSelection == "function" ? t.enableSubRowSelection(e) : t.enableSubRowSelection ?? !0;
}
function Ft(e) {
  const t = e.table.options;
  return typeof t.enableMultiRowSelection == "function" ? t.enableMultiRowSelection(e) : t.enableMultiRowSelection ?? !0;
}
function zd(e, t) {
  const n = pt(e);
  return (r) => {
    var a, u;
    if (!n) return;
    const o = r, s = e.table, i = o.target.checked, l = s._lastSelectedRowId;
    (!(s.options.enableRowRangeSelection !== !1 && l !== null && Ft(e) && (((u = (a = s.options).isRowRangeSelectionEvent) == null ? void 0 : u.call(a, r)) ?? !1)) || !Gd(e, l, i, t)) && Bl(e, i, t), s._lastSelectedRowId = e.id;
  };
}
function Gd(e, t, n, r) {
  const o = (r == null ? void 0 : r.selectChildren) ?? !0, s = e.table, i = s.getRowsInDisplayOrder(), l = s.getPrePaginatedRowModel().rowsById[t] ?? s.getCoreRowModel().rowsById[t];
  if (!l) return !1;
  const a = l.getDisplayIndex(), u = e.getDisplayIndex(), f = i[a], h = i[u];
  if (a < 0 || u < 0 || a >= i.length || u >= i.length || (f == null ? void 0 : f.id) !== l.id || (h == null ? void 0 : h.id) !== e.id || !Ft(l) || !Ft(e)) return !1;
  const w = Math.min(a, u), y = Math.max(a, u);
  return sn(s, (I) => {
    const C = Object.assign(oe(), I);
    for (let T = w; T <= y; T++) {
      const F = i[T];
      !pt(F) || !Ft(F) || (kr(C, F.id, n, o, s), !n && (r != null && r.deselectParents) && Nl(C, F));
    }
    return C;
  }), !0;
}
function kr(e, t, n, r, o, s) {
  const i = o.getRow(t, !0);
  n ? (Ft(i) || Object.keys(e).forEach((l) => delete e[l]), pt(i) && (e[t] = !0)) : (!s || pt(i)) && delete e[t], r && i.subRows.length && Xo(i) && i.subRows.forEach((l) => kr(e, l.id, n, r, o, s));
}
function hr(e, t) {
  if (!pt(e)) return !1;
  const n = e.table;
  if (n.options.enableSubRowSelection === !0) return !0;
  const r = e.parentId;
  if (r === void 0) return !0;
  const o = t.get(r);
  if (o !== void 0) return o;
  const s = n.getCoreRowModel().rowsById, i = [];
  let l = !0, a = r;
  for (; a !== void 0; ) {
    const u = t.get(a);
    if (u !== void 0) {
      l = u;
      break;
    }
    i.push(a);
    const f = s[a] ?? n.getRow(a, !0);
    if (!Xo(f)) {
      l = !1;
      break;
    }
    a = f.parentId;
  }
  return i.forEach((u) => t.set(u, l)), l;
}
function Nl(e, t) {
  const n = t.table.getCoreRowModel().rowsById;
  let r = t.parentId;
  for (; r !== void 0; )
    delete e[r], r = (n[r] ?? t.table.getRow(r, !0)).parentId;
}
function Wl(e, t, n, r) {
  const o = [];
  for (let s = 0; s < e.length; s++) {
    const i = e[s], l = kn(i, t);
    if (l && (n.push(i), r[i.id] = i), i.subRows.length) {
      const a = Wl(i.subRows, t, n, r);
      if (l) {
        const u = Object.create(Object.getPrototypeOf(i));
        Yu(u, i), u.subRows = a, o.push(u);
      }
    } else l && o.push(i);
  }
  return o;
}
function Jo(e, t) {
  var s;
  const n = [], r = oe(), o = ((s = t.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  return {
    rows: Wl(e.rows, o, n, r),
    flatRows: n,
    rowsById: r
  };
}
function kn(e, t) {
  return !!(rn(t, e.id) && t[e.id]);
}
function Zo(e) {
  var s;
  if (!e.subRows.length) return !1;
  const t = ((s = e.table.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  let n = !1, r = !0, o = !1;
  for (let i = 0; i < e.subRows.length; i++) {
    const l = e.subRows[i];
    if (n && !r) break;
    if (pt(l) && (o = !0, kn(l, t) ? n = !0 : r = !1), l.subRows.length) {
      const a = Zo(l);
      a === "all" ? (n = !0, o = !0) : a === "some" ? (n = !0, r = !1, o = !0) : r = !1;
    }
  }
  return o ? r ? "all" : n ? "some" : !1 : !1;
}
const Yd = {
  initTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  resetTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  getInitialState: (e) => ({
    rowSelection: jd(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onRowSelectionChange: ml("rowSelection", e),
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
    on("rowSelectionFeature", e, t, {
      row_toggleSelected: { fn: (n, r, o) => Bl(n, r, o) },
      row_getIsSelected: { fn: (n) => Yo(n) },
      row_getIsSomeSelected: {
        fn: (n) => $l(n),
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
        fn: (n) => qd(n),
        memoDeps: (n) => {
          var r;
          return [
            n.subRows,
            (r = n.table.atoms.rowSelection) == null ? void 0 : r.get(),
            n.table.options.enableRowSelection
          ];
        }
      },
      row_getCanSelect: { fn: (n) => pt(n) },
      row_getCanSelectSubRows: { fn: (n) => Xo(n) },
      row_getCanMultiSelect: { fn: (n) => Ft(n) },
      row_getToggleSelectedHandler: { fn: (n, r) => zd(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    Vt("rowSelectionFeature", e, {
      table_setRowSelection: { fn: (t) => sn(e, t) },
      table_resetRowSelection: { fn: (t) => Ld(e, t) },
      table_toggleAllRowsSelected: { fn: (t, n) => Hl(e, t, n) },
      table_toggleAllPageRowsSelected: { fn: (t, n) => jl(e, t, n) },
      table_getPreSelectedRowModel: { fn: () => Kd(e) },
      table_getSelectedRowModel: {
        fn: () => Vd(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getCoreRowModel()];
        }
      },
      table_getFilteredSelectedRowModel: {
        fn: () => Bd(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getFilteredRowModel()];
        }
      },
      table_getGroupedSelectedRowModel: {
        fn: () => $d(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getSortedRowModel()];
        }
      },
      table_getSelectedRowIds: {
        fn: () => Ll(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get()];
        }
      },
      table_getIsAllRowsSelected: {
        fn: () => Kl(e),
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
        fn: () => Vl(e),
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
        fn: () => Dr(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get()];
        }
      },
      table_getIsSomePageRowsSelected: {
        fn: () => Nd(e),
        memoDeps: () => {
          var t;
          return [
            (t = e.atoms.rowSelection) == null ? void 0 : t.get(),
            e.getPaginatedRowModel(),
            e.options.enableRowSelection
          ];
        }
      },
      table_getToggleAllRowsSelectedHandler: { fn: () => Wd(e) },
      table_getToggleAllPageRowsSelectedHandler: { fn: () => Ud(e) }
    });
  }
};
function Xd() {
  return (e) => {
    const t = e;
    return Pr({
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
      fn: () => Jd(t)
    });
  };
}
function Jd(e) {
  var r;
  const t = e.getPreExpandedRowModel(), n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return !t.rows.length || n !== !0 && !Object.keys(n ?? {}).length || !e.options.paginateExpandedRows && !e.options.manualPagination ? t : Zd(t);
}
function Zd(e) {
  const t = [], n = (r) => {
    t.push(r), r.subRows.length && Tr(r) && r.subRows.forEach(n);
  };
  return e.rows.forEach(n), {
    rows: t,
    flatRows: e.flatRows,
    rowsById: e.rowsById
  };
}
function Ws(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = Dt(e[n]);
  return Mo(e, t);
}
function Qd(e) {
  return Object.keys(e).map((t) => Dt(e[t]));
}
function ep(e) {
  const t = (l, a) => {
    l.setOptions((u) => Ks(u, Ws(a)));
  }, n = Gu(), r = Mo(e, { features: {
    coreReactivityFeature: n,
    ...Dt(e.features) ?? {}
  } }), o = Mo(Ws(r), { mergeOptions: (l, a) => Ks(l, a) }), s = Fd(o), i = s;
  return mi() && Da(() => {
    var l;
    return (l = n.unmount) == null ? void 0 : l.call(n);
  }), be(() => Qd(r), () => {
    t(s, r);
  }, { immediate: !0 }), be(() => {
    const l = Dt(e.state), a = Dt(e.atoms);
    if (!l) return [];
    const u = [];
    for (const f of Object.keys(i.initialState))
      !(f in l) || (a == null ? void 0 : a[f]) !== void 0 || u.push(l[f]);
    return u;
  }, (l) => {
    l.length > 0 && t(s, r);
  }, { immediate: !0 }), i.Subscribe = (l) => l.children(i.atoms), i;
}
function Fr() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return function() {
    t.forEach(function(o) {
      return o();
    });
  };
}
function tp(e) {
  if (Array.isArray(e)) return e;
}
function np(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r, o, s, i, l = [], a = !0, u = !1;
    try {
      if (s = (n = n.call(e)).next, t !== 0) for (; !(a = (r = s.call(n)).done) && (l.push(r.value), l.length !== t); a = !0) ;
    } catch (f) {
      u = !0, o = f;
    } finally {
      try {
        if (!a && n.return != null && (i = n.return(), Object(i) !== i)) return;
      } finally {
        if (u) throw o;
      }
    }
    return l;
  }
}
function Ao(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Ul(e, t) {
  if (e) {
    if (typeof e == "string") return Ao(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Ao(e, t) : void 0;
  }
}
function rp() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ql(e, t) {
  return tp(e) || np(e, t) || Ul(e, t) || rp();
}
var Us = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Lt = {}, Fn = {};
Object.defineProperty(Fn, "__esModule", { value: !0 });
Fn.bind = void 0;
function op(e, t) {
  var n = t.type, r = t.listener, o = t.options;
  return e.addEventListener(n, r, o), function() {
    e.removeEventListener(n, r, o);
  };
}
Fn.bind = op;
var Hr = {}, Xt = Us && Us.__assign || function() {
  return Xt = Object.assign || function(e) {
    for (var t, n = 1, r = arguments.length; n < r; n++) {
      t = arguments[n];
      for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    }
    return e;
  }, Xt.apply(this, arguments);
};
Object.defineProperty(Hr, "__esModule", { value: !0 });
Hr.bindAll = void 0;
var sp = Fn;
function qs(e) {
  if (!(typeof e > "u"))
    return typeof e == "boolean" ? {
      capture: e
    } : e;
}
function ip(e, t) {
  if (t == null)
    return e;
  var n = Xt(Xt({}, e), { options: Xt(Xt({}, qs(t)), qs(e.options)) });
  return n;
}
function lp(e, t, n) {
  var r = t.map(function(o) {
    var s = ip(o, n);
    return (0, sp.bind)(e, s);
  });
  return function() {
    r.forEach(function(s) {
      return s();
    });
  };
}
Hr.bindAll = lp;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.bindAll = e.bind = void 0;
  var t = Fn;
  Object.defineProperty(e, "bind", { enumerable: !0, get: function() {
    return t.bind;
  } });
  var n = Hr;
  Object.defineProperty(e, "bindAll", { enumerable: !0, get: function() {
    return n.bindAll;
  } });
})(Lt);
var zl = "data-pdnd-honey-pot";
function Gl(e) {
  return e instanceof Element && e.hasAttribute(zl);
}
function Yl(e) {
  var t = document.elementsFromPoint(e.x, e.y), n = ql(t, 2), r = n[0], o = n[1];
  return r ? Gl(r) ? o ?? null : r : null;
}
function An(e) {
  "@babel/helpers - typeof";
  return An = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, An(e);
}
function ap(e, t) {
  if (An(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (An(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function cp(e) {
  var t = ap(e, "string");
  return An(t) == "symbol" ? t : t + "";
}
function Hn(e, t, n) {
  return (t = cp(t)) in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var up = 2147483647, fp = {
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
function Bt(e) {
  var t = null;
  return function() {
    if (!t) {
      for (var r = arguments.length, o = new Array(r), s = 0; s < r; s++)
        o[s] = arguments[s];
      var i = e.apply(this, o);
      t = {
        result: i
      };
    }
    return t.result;
  };
}
var ao = Bt(function() {
  return typeof HTMLElement < "u" && typeof HTMLElement.prototype.showPopover == "function";
});
function zs(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Gs(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? zs(Object(n), !0).forEach(function(r) {
      Hn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : zs(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
var On = 2, Ys = On / 2;
function dp(e) {
  return {
    x: Math.floor(e.x),
    y: Math.floor(e.y)
  };
}
function pp(e) {
  return {
    x: e.x - Ys,
    y: e.y - Ys
  };
}
function gp(e) {
  return {
    x: Math.max(e.x, 0),
    y: Math.max(e.y, 0)
  };
}
function hp(e) {
  return {
    x: Math.min(e.x, window.innerWidth - On),
    y: Math.min(e.y, window.innerHeight - On)
  };
}
function Xs(e) {
  var t = e.client, n = hp(gp(pp(dp(t))));
  return DOMRect.fromRect({
    x: n.x,
    y: n.y,
    width: On,
    height: On
  });
}
function Js(e) {
  var t = e.clientRect;
  return {
    left: "".concat(t.left, "px"),
    top: "".concat(t.top, "px"),
    width: "".concat(t.width, "px"),
    height: "".concat(t.height, "px")
  };
}
function vp(e) {
  var t = e.client, n = e.clientRect;
  return (
    // is within horizontal bounds
    t.x >= n.x && t.x <= n.x + n.width && // is within vertical bounds
    t.y >= n.y && t.y <= n.y + n.height
  );
}
function mp(e) {
  var t = e.initial, n = document.createElement("div");
  n.setAttribute(zl, "true"), ao() && n.setAttribute("popover", "manual");
  var r = Xs({
    client: t
  });
  Object.assign(n.style, Gs(Gs({
    position: "fixed"
  }, ao() ? (
    // needs to come first as it has 'inset: unset' which
    // needs to be overridden by our top / left values
    fp
  ) : {
    // Fallback: using maximum possible z-index so that this element
    // will always be on top of other positioned content.
    zIndex: up
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
  }, Js({
    clientRect: r
  }))), document.body.appendChild(n), ao() && n.showPopover();
  var o = Lt.bind(window, {
    type: "pointermove",
    listener: function(i) {
      var l = {
        x: i.clientX,
        y: i.clientY
      };
      r = Xs({
        client: l
      }), Object.assign(n.style, Js({
        clientRect: r
      }));
    },
    // using capture so we are less likely to be impacted by event stopping
    options: {
      capture: !0
    }
  });
  return function(i) {
    var l = i.current;
    if (o(), vp({
      client: l,
      clientRect: r
    })) {
      n.remove();
      return;
    }
    function a() {
      u(), n.remove();
    }
    var u = Lt.bindAll(window, [
      {
        type: "pointerdown",
        listener: a
      },
      {
        type: "pointermove",
        listener: a
      },
      {
        type: "focusin",
        listener: a
      },
      {
        type: "focusout",
        listener: a
      },
      // a 'pointerdown' should happen before 'dragstart', but just being super safe
      {
        type: "dragstart",
        listener: a
      },
      // if the user has dragged something out of the window
      // and then is dragging something back into the window
      // the first events we will see are "dragenter" (and then "dragover").
      // So if we see any of these we need to clear the post drag fix.
      {
        type: "dragenter",
        listener: a
      },
      {
        type: "dragover",
        listener: a
      }
      // Not adding a "wheel" event listener, as "wheel" by itself does not
      // resolve the bug.
    ], {
      // Using `capture` so less likely to be impacted by other code stopping events
      capture: !0
    });
  };
}
function yp() {
  var e = null;
  function t() {
    return e = null, Lt.bind(window, {
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
      var i = s.eventName, l = s.payload;
      if (i === "onDragStart") {
        var a = l.location.initial.input, u = e ?? {
          x: a.clientX,
          y: a.clientY
        };
        r = mp({
          initial: u
        });
      }
      if (i === "onDrop") {
        var f, h = l.location.current.input;
        (f = r) === null || f === void 0 || f({
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
function wp(e) {
  if (Array.isArray(e)) return Ao(e);
}
function bp(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function _p() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Xl(e) {
  return wp(e) || bp(e) || Ul(e) || _p();
}
var xp = Bt(function() {
  return navigator.userAgent.includes("Firefox");
}), Qo = Bt(function() {
  var t = navigator, n = t.userAgent;
  return n.includes("AppleWebKit") && !n.includes("Chrome");
});
function Sp(e) {
  return "nodeName" in e;
}
function Rp(e) {
  return Sp(e) && e.ownerDocument !== document;
}
var Oo = {
  isLeavingWindow: Symbol("leaving"),
  isEnteringWindow: Symbol("entering")
};
(function() {
  if (typeof window > "u" || !Qo())
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
  Lt.bindAll(
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
        !n.isOverWindow && n.enterCount === 0 && (s[Oo.isEnteringWindow] = !0), n.isOverWindow = !0, n.enterCount++;
      }
    }, {
      type: "dragleave",
      listener: function(s) {
        n.enterCount--, n.isOverWindow && n.enterCount === 0 && (s[Oo.isLeavingWindow] = !0, n.isOverWindow = !1);
      }
    }],
    // using `capture: true` so that adding event listeners
    // in bubble phase will have the correct symbols
    {
      capture: !0
    }
  );
})();
function Cp(e) {
  var t = e.dragLeave;
  return Qo() ? t.hasOwnProperty(Oo.isLeavingWindow) : !1;
}
function Mp(e) {
  var t = e.dragLeave, n = t.type, r = t.relatedTarget;
  return n !== "dragleave" ? !1 : Qo() ? Cp({
    dragLeave: t
  }) : r == null ? !0 : xp() ? Rp(r) : r instanceof HTMLIFrameElement;
}
function Ip(e) {
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
function xn(e) {
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
var Ep = function(t) {
  var n = [], r = null, o = function() {
    for (var i = arguments.length, l = new Array(i), a = 0; a < i; a++)
      l[a] = arguments[a];
    n = l, !r && (r = requestAnimationFrame(function() {
      r = null, t.apply(void 0, n);
    }));
  };
  return o.cancel = function() {
    r && (cancelAnimationFrame(r), r = null);
  }, o;
}, co = Ep(function(e) {
  return e();
}), Zn = /* @__PURE__ */ function() {
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
function Ap(e) {
  var t = e.source, n = e.initial, r = e.dispatchEvent, o = {
    dropTargets: []
  };
  function s(l) {
    r(l), o = {
      dropTargets: l.payload.location.current.dropTargets
    };
  }
  var i = {
    start: function(a) {
      var u = a.nativeSetDragImage, f = {
        current: n,
        previous: o,
        initial: n
      };
      s({
        eventName: "onGenerateDragPreview",
        payload: {
          source: t,
          location: f,
          nativeSetDragImage: u
        }
      }), Zn.schedule(function() {
        s({
          eventName: "onDragStart",
          payload: {
            source: t,
            location: f
          }
        });
      });
    },
    dragUpdate: function(a) {
      var u = a.current;
      Zn.flush(), co.cancel(), s({
        eventName: "onDropTargetChange",
        payload: {
          source: t,
          location: {
            initial: n,
            previous: o,
            current: u
          }
        }
      });
    },
    drag: function(a) {
      var u = a.current;
      co(function() {
        Zn.flush();
        var f = {
          initial: n,
          previous: o,
          current: u
        };
        s({
          eventName: "onDrag",
          payload: {
            source: t,
            location: f
          }
        });
      });
    },
    drop: function(a) {
      var u = a.current, f = a.updatedSourcePayload;
      Zn.flush(), co.cancel(), s({
        eventName: "onDrop",
        payload: {
          source: f ?? t,
          location: {
            current: u,
            previous: o,
            initial: n
          }
        }
      });
    }
  };
  return i;
}
var Po = {
  isActive: !1
};
function Jl() {
  return !Po.isActive;
}
function Op(e) {
  return e.dataTransfer ? e.dataTransfer.setDragImage.bind(e.dataTransfer) : null;
}
function Pp(e) {
  var t = e.current, n = e.next;
  if (t.length !== n.length)
    return !0;
  for (var r = 0; r < t.length; r++)
    if (t[r].element !== n[r].element)
      return !0;
  return !1;
}
function Tp(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = e.dispatchEvent;
  if (!Jl())
    return;
  var s = Dp({
    event: t,
    dragType: n,
    getDropTargetsOver: r
  });
  Po.isActive = !0;
  var i = {
    current: s
  };
  uo({
    event: t,
    current: s.dropTargets
  });
  var l = Ap({
    source: n.payload,
    dispatchEvent: o,
    initial: s
  });
  function a(y) {
    var I = Pp({
      current: i.current.dropTargets,
      next: y.dropTargets
    });
    i.current = y, I && l.dragUpdate({
      current: i.current
    });
  }
  function u(y) {
    var I = xn(y), C = Gl(y.target) ? Yl({
      x: I.clientX,
      y: I.clientY
    }) : y.target, T = r({
      target: C,
      input: I,
      source: n.payload,
      current: i.current.dropTargets
    });
    T.length && (y.preventDefault(), uo({
      event: y,
      current: T
    })), a({
      dropTargets: T,
      input: I
    });
  }
  function f() {
    i.current.dropTargets.length && a({
      dropTargets: [],
      input: i.current.input
    }), l.drop({
      current: i.current,
      updatedSourcePayload: null
    }), h();
  }
  function h() {
    Po.isActive = !1, w();
  }
  var w = Lt.bindAll(
    window,
    [{
      // 👋 Note: we are repurposing the `dragover` event as our `drag` event
      // this is because firefox does not publish pointer coordinates during
      // a `drag` event, but does for every other type of drag event
      // `dragover` fires on all elements that are being dragged over
      // Because we are binding to `window` - our `dragover` is effectively the same as a `drag`
      // 🦊😤
      type: "dragover",
      listener: function(I) {
        u(I), l.drag({
          current: i.current
        });
      }
    }, {
      type: "dragenter",
      listener: u
    }, {
      type: "dragleave",
      listener: function(I) {
        Mp({
          dragLeave: I
        }) && (a({
          input: i.current.input,
          dropTargets: []
        }), n.startedFrom === "external" && f());
      }
    }, {
      // A "drop" can only happen if the browser allowed the drop
      type: "drop",
      listener: function(I) {
        if (i.current = {
          dropTargets: i.current.dropTargets,
          input: xn(I)
        }, !i.current.dropTargets.length) {
          f();
          return;
        }
        I.preventDefault(), uo({
          event: I,
          current: i.current.dropTargets
        }), l.drop({
          current: i.current,
          // When dropping something native, we need to extract the latest
          // `.items` from the "drop" event as it is now accessible
          updatedSourcePayload: n.type === "external" ? n.getDropPayload(I) : null
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
      listener: function(I) {
        i.current = {
          dropTargets: i.current.dropTargets,
          input: xn(I)
        }, f();
      }
    }].concat(Xl(Ip({
      onDragEnd: f
    }))),
    // Once we have started a managed drag operation it is important that we see / own all drag events
    // We got one adoption bug pop up where some code was stopping (`event.stopPropagation()`)
    // all "drop" events in the bubble phase on the `document.body`.
    // This meant that we never saw the "drop" event.
    {
      capture: !0
    }
  );
  l.start({
    nativeSetDragImage: Op(t)
  });
}
function uo(e) {
  var t, n = e.event, r = e.current, o = (t = r[0]) === null || t === void 0 ? void 0 : t.dropEffect;
  o != null && n.dataTransfer && (n.dataTransfer.dropEffect = o);
}
function Dp(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = xn(t);
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
var Zs = {
  canStart: Jl,
  start: Tp
}, To = /* @__PURE__ */ new Map();
function kp(e) {
  var t = e.typeKey, n = e.mount, r = To.get(t);
  if (r)
    return r.usageCount++, r;
  var o = {
    typeKey: t,
    unmount: n(),
    usageCount: 1
  };
  return To.set(t, o), o;
}
function Fp(e) {
  var t = kp(e);
  return function() {
    t.usageCount--, !(t.usageCount > 0) && (t.unmount(), To.delete(e.typeKey));
  };
}
function Zl(e, t) {
  var n = t.attribute, r = t.value;
  return e.setAttribute(n, r), function() {
    return e.removeAttribute(n);
  };
}
function Qs(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function bt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Qs(Object(n), !0).forEach(function(r) {
      Hn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Qs(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function fo(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = Hp(e)) || t) {
      n && (e = n);
      var r = 0, o = function() {
      };
      return { s: o, n: function() {
        return r >= e.length ? { done: !0 } : { done: !1, value: e[r++] };
      }, e: function(u) {
        throw u;
      }, f: o };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var s, i = !0, l = !1;
  return { s: function() {
    n = n.call(e);
  }, n: function() {
    var u = n.next();
    return i = u.done, u;
  }, e: function(u) {
    l = !0, s = u;
  }, f: function() {
    try {
      i || n.return == null || n.return();
    } finally {
      if (l) throw s;
    }
  } };
}
function Hp(e, t) {
  if (e) {
    if (typeof e == "string") return ei(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? ei(e, t) : void 0;
  }
}
function ei(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function po(e) {
  return e.slice(0).reverse();
}
function jp(e) {
  var t = e.typeKey, n = e.defaultDropEffect, r = /* @__PURE__ */ new WeakMap(), o = "data-drop-target-for-".concat(t), s = "[".concat(o, "]");
  function i(y) {
    return r.set(y.element, y), function() {
      return r.delete(y.element);
    };
  }
  function l(y) {
    var I = Fr(Zl(y.element, {
      attribute: o,
      value: "true"
    }), i(y));
    return Bt(I);
  }
  function a(y) {
    var I, C, T, F, M = y.source, L = y.target, E = y.input, $ = y.result, W = $ === void 0 ? [] : $;
    if (L == null)
      return W;
    if (!(L instanceof Element))
      return L instanceof Node ? a({
        source: M,
        target: L.parentElement,
        input: E,
        result: W
      }) : W;
    var ue = L.closest(s);
    if (ue == null)
      return W;
    var k = r.get(ue);
    if (k == null)
      return W;
    var H = {
      input: E,
      source: M,
      element: k.element
    };
    if (k.canDrop && !k.canDrop(H))
      return a({
        source: M,
        target: k.element.parentElement,
        input: E,
        result: W
      });
    var G = (I = (C = k.getData) === null || C === void 0 ? void 0 : C.call(k, H)) !== null && I !== void 0 ? I : {}, fe = (T = (F = k.getDropEffect) === null || F === void 0 ? void 0 : F.call(k, H)) !== null && T !== void 0 ? T : n, se = {
      data: G,
      element: k.element,
      dropEffect: fe,
      // we are collecting _actual_ drop targets, so these are
      // being applied _not_ due to stickiness
      isActiveDueToStickiness: !1
    };
    return a({
      source: M,
      target: k.element.parentElement,
      input: E,
      // Using bubble ordering. Same ordering as `event.getPath()`
      result: [].concat(Xl(W), [se])
    });
  }
  function u(y) {
    var I = y.eventName, C = y.payload, T = fo(C.location.current.dropTargets), F;
    try {
      for (T.s(); !(F = T.n()).done; ) {
        var M, L = F.value, E = r.get(L.element), $ = bt(bt({}, C), {}, {
          self: L
        });
        E == null || (M = E[I]) === null || M === void 0 || M.call(
          E,
          // I cannot seem to get the types right here.
          // TS doesn't seem to like that one event can need `nativeSetDragImage`
          // @ts-expect-error
          $
        );
      }
    } catch (W) {
      T.e(W);
    } finally {
      T.f();
    }
  }
  var f = {
    onGenerateDragPreview: u,
    onDrag: u,
    onDragStart: u,
    onDrop: u,
    onDropTargetChange: function(I) {
      var C = I.payload, T = new Set(C.location.current.dropTargets.map(function(Y) {
        return Y.element;
      })), F = /* @__PURE__ */ new Set(), M = fo(C.location.previous.dropTargets), L;
      try {
        for (M.s(); !(L = M.n()).done; ) {
          var E, $ = L.value;
          F.add($.element);
          var W = r.get($.element), ue = T.has($.element), k = bt(bt({}, C), {}, {
            self: $
          });
          if (W == null || (E = W.onDropTargetChange) === null || E === void 0 || E.call(W, k), !ue) {
            var H;
            W == null || (H = W.onDragLeave) === null || H === void 0 || H.call(W, k);
          }
        }
      } catch (Y) {
        M.e(Y);
      } finally {
        M.f();
      }
      var G = fo(C.location.current.dropTargets), fe;
      try {
        for (G.s(); !(fe = G.n()).done; ) {
          var se, ve, Oe = fe.value;
          if (!F.has(Oe.element)) {
            var Ce = bt(bt({}, C), {}, {
              self: Oe
            }), te = r.get(Oe.element);
            te == null || (se = te.onDropTargetChange) === null || se === void 0 || se.call(te, Ce), te == null || (ve = te.onDragEnter) === null || ve === void 0 || ve.call(te, Ce);
          }
        }
      } catch (Y) {
        G.e(Y);
      } finally {
        G.f();
      }
    }
  };
  function h(y) {
    f[y.eventName](y);
  }
  function w(y) {
    var I = y.source, C = y.target, T = y.input, F = y.current, M = a({
      source: I,
      target: C,
      input: T
    });
    if (M.length >= F.length)
      return M;
    for (var L = po(F), E = po(M), $ = [], W = 0; W < L.length; W++) {
      var ue, k = L[W], H = E[W];
      if (H != null) {
        $.push(H);
        continue;
      }
      var G = $[W - 1], fe = L[W - 1];
      if ((G == null ? void 0 : G.element) !== (fe == null ? void 0 : fe.element))
        break;
      var se = r.get(k.element);
      if (!se)
        break;
      var ve = {
        input: T,
        source: I,
        element: se.element
      };
      if (se.canDrop && !se.canDrop(ve) || !((ue = se.getIsSticky) !== null && ue !== void 0 && ue.call(se, ve)))
        break;
      $.push(bt(bt({}, k), {}, {
        // making it clear to consumers this drop target is active due to stickiness
        isActiveDueToStickiness: !0
      }));
    }
    return po($);
  }
  return {
    dropTargetForConsumers: l,
    getIsOver: w,
    dispatchEvent: h
  };
}
function Lp(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = Kp(e)) || t) {
      n && (e = n);
      var r = 0, o = function() {
      };
      return { s: o, n: function() {
        return r >= e.length ? { done: !0 } : { done: !1, value: e[r++] };
      }, e: function(u) {
        throw u;
      }, f: o };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var s, i = !0, l = !1;
  return { s: function() {
    n = n.call(e);
  }, n: function() {
    var u = n.next();
    return i = u.done, u;
  }, e: function(u) {
    l = !0, s = u;
  }, f: function() {
    try {
      i || n.return == null || n.return();
    } finally {
      if (l) throw s;
    }
  } };
}
function Kp(e, t) {
  if (e) {
    if (typeof e == "string") return ti(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? ti(e, t) : void 0;
  }
}
function ti(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function ni(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Vp(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ni(Object(n), !0).forEach(function(r) {
      Hn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ni(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Bp() {
  var e = /* @__PURE__ */ new Set(), t = null;
  function n(s) {
    t && (!s.canMonitor || s.canMonitor(t.canMonitorArgs)) && t.active.add(s);
  }
  function r(s) {
    var i = Vp({}, s);
    e.add(i), n(i);
    function l() {
      e.delete(i), t && t.active.delete(i);
    }
    return Bt(l);
  }
  function o(s) {
    var i = s.eventName, l = s.payload;
    if (i === "onGenerateDragPreview") {
      t = {
        canMonitorArgs: {
          initial: l.location.initial,
          source: l.source
        },
        active: /* @__PURE__ */ new Set()
      };
      var a = Lp(e), u;
      try {
        for (a.s(); !(u = a.n()).done; ) {
          var f = u.value;
          n(f);
        }
      } catch (T) {
        a.e(T);
      } finally {
        a.f();
      }
    }
    if (t) {
      for (var h = Array.from(t.active), w = 0, y = h; w < y.length; w++) {
        var I = y[w];
        if (t.active.has(I)) {
          var C;
          (C = I[i]) === null || C === void 0 || C.call(I, l);
        }
      }
      i === "onDrop" && (t.active.clear(), t = null);
    }
  }
  return {
    dispatchEvent: o,
    monitorForConsumers: r
  };
}
function $p(e) {
  var t = e.typeKey, n = e.mount, r = e.dispatchEventToSource, o = e.onPostDispatch, s = e.defaultDropEffect, i = Bp(), l = jp({
    typeKey: t,
    defaultDropEffect: s
  });
  function a(h) {
    r == null || r(h), l.dispatchEvent(h), i.dispatchEvent(h), o == null || o(h);
  }
  function u(h) {
    var w = h.event, y = h.dragType;
    Zs.start({
      event: w,
      dragType: y,
      getDropTargetsOver: l.getIsOver,
      dispatchEvent: a
    });
  }
  function f() {
    function h() {
      var w = {
        canStart: Zs.canStart,
        start: u
      };
      return n(w);
    }
    return Fp({
      typeKey: t,
      mount: h
    });
  }
  return {
    registerUsage: f,
    dropTarget: l.dropTargetForConsumers,
    monitor: i.monitorForConsumers
  };
}
var Np = Bt(function() {
  return navigator.userAgent.toLocaleLowerCase().includes("android");
}), Wp = "pdnd:android-fallback", ri = "text/plain", Up = "text/uri-list", qp = "application/vnd.pdnd", vr = /* @__PURE__ */ new WeakMap();
function zp(e) {
  return vr.set(e.element, e), function() {
    vr.delete(e.element);
  };
}
var oi = yp(), Ql = $p({
  typeKey: "element",
  defaultDropEffect: "move",
  mount: function(t) {
    return Fr(oi.bindEvents(), Lt.bind(document, {
      type: "dragstart",
      listener: function(r) {
        var o, s, i, l, a, u;
        if (t.canStart(r) && !r.defaultPrevented && r.dataTransfer) {
          var f = r.target;
          if (f instanceof HTMLElement) {
            var h = vr.get(f);
            if (h) {
              var w = xn(r), y = {
                element: h.element,
                dragHandle: (o = h.dragHandle) !== null && o !== void 0 ? o : null,
                input: w
              };
              if (h.canDrag && !h.canDrag(y)) {
                r.preventDefault();
                return;
              }
              if (h.dragHandle) {
                var I = Yl({
                  x: w.clientX,
                  y: w.clientY
                });
                if (!h.dragHandle.contains(I)) {
                  r.preventDefault();
                  return;
                }
              }
              var C = (s = (i = h.getInitialDataForExternal) === null || i === void 0 ? void 0 : i.call(h, y)) !== null && s !== void 0 ? s : null;
              if (C)
                for (var T = 0, F = Object.entries(C); T < F.length; T++) {
                  var M = ql(F[T], 2), L = M[0], E = M[1];
                  r.dataTransfer.setData(L, E ?? "");
                }
              Np() && !r.dataTransfer.types.includes(ri) && !r.dataTransfer.types.includes(Up) && r.dataTransfer.setData(ri, Wp), r.dataTransfer.setData(qp, "");
              var $ = {
                element: h.element,
                dragHandle: (l = h.dragHandle) !== null && l !== void 0 ? l : null,
                data: (a = (u = h.getInitialData) === null || u === void 0 ? void 0 : u.call(h, y)) !== null && a !== void 0 ? a : {}
              }, W = {
                type: "element",
                payload: $,
                startedFrom: "internal"
              };
              t.start({
                event: r,
                dragType: W
              });
            }
          }
        }
      }
    }));
  },
  dispatchEventToSource: function(t) {
    var n, r, o = t.eventName, s = t.payload;
    (n = vr.get(s.source.element)) === null || n === void 0 || (r = n[o]) === null || r === void 0 || r.call(
      n,
      // I cannot seem to get the types right here.
      // TS doesn't seem to like that one event can need `nativeSetDragImage`
      // @ts-expect-error
      s
    );
  },
  onPostDispatch: oi.getOnPostDispatch()
}), Gp = Ql.dropTarget;
function Yp(e) {
  var t = Fr(
    // making the draggable register the adapter rather than drop targets
    // this is because you *must* have a draggable element to start a drag
    // but you _might_ not have any drop targets immediately
    // (You might create drop targets async)
    Ql.registerUsage(),
    zp(e),
    Zl(e.element, {
      attribute: "draggable",
      value: "true"
    })
  );
  return Bt(t);
}
function Xp(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
    if (t.indexOf(r) !== -1) continue;
    n[r] = e[r];
  }
  return n;
}
function Jp(e, t) {
  if (e == null) return {};
  var n, r, o = Xp(e, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    for (r = 0; r < s.length; r++) n = s[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (o[n] = e[n]);
  }
  return o;
}
function ea(e, t) {
  var n = Object.keys(e), r = Object.keys(t);
  return n.length !== r.length ? !1 : n.every(function(o) {
    return Object.is(e[o], t[o]);
  });
}
function Zp() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ea, t = null;
  return function(n) {
    return t && e(t.value, n) || (t = {
      value: n
    }), t.value;
  };
}
var Qp = ["block"];
function si(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function ii(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? si(Object(n), !0).forEach(function(r) {
      Hn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : si(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function eg(e) {
  return {
    x: (e.right + e.left) / 2,
    y: (e.bottom + e.top) / 2
  };
}
function go(e) {
  var t = e.client, n = e.borderBox, r = n.height / 4;
  return t.y <= n.top + r ? "reorder-above" : t.y >= n.bottom - r ? "reorder-below" : "make-child";
}
function tg(e) {
  var t = e.element, n = e.input, r = e.currentLevel, o = e.indentPerLevel, s = e.mode, i = {
    x: n.clientX,
    y: n.clientY
  }, l = t.getBoundingClientRect();
  if (s === "standard") {
    var a = go({
      borderBox: l,
      client: i
    });
    return {
      type: a,
      indentPerLevel: o,
      currentLevel: r
    };
  }
  var u = eg(l);
  if (s === "expanded") {
    var f = go({
      borderBox: l,
      client: i
    });
    return {
      // Use the "standard" hitbox for "reorder above",
      // The rest of the item is "make-child"
      type: f === "reorder-above" ? f : "make-child",
      indentPerLevel: o,
      currentLevel: r
    };
  }
  var h = o * r;
  if (i.x < l.left + h) {
    if (i.y < u.y)
      return {
        type: "reorder-above",
        indentPerLevel: o,
        currentLevel: r
      };
    var w = (i.x - l.left) / o, y = Math.max(Math.floor(w), 0);
    return {
      type: "reparent",
      desiredLevel: y,
      indentPerLevel: o,
      currentLevel: r
    };
  }
  return {
    type: go({
      borderBox: l,
      client: i
    }),
    indentPerLevel: o,
    currentLevel: r
  };
}
function ta(e, t) {
  return e.type !== t.type ? !1 : e.type === "instruction-blocked" && t.type === "instruction-blocked" ? ta(e.desired, t.desired) : ea(e, t);
}
var ng = Zp(ta);
function rg(e) {
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
function og(e, t) {
  var n = t.block, r = Jp(t, Qp), o = tg(r), s = rg({
    desired: o,
    block: n
  }), i = ng(s);
  return ii(ii({}, e), {}, Hn({}, na, i));
}
function li(e) {
  var t;
  return (t = e[na]) !== null && t !== void 0 ? t : null;
}
var na = Symbol("tree-item-instruction");
const sg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ef5350" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m6 10h-4v8a4 4 0 1 1-4-4 3.96 3.96 0 0 1 2 .555V8h6Z"/></svg>', ig = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#ff7043" d="M2 2a1 1 0 0 0-1 1v10c0 .554.446 1 1 1h12c.554 0 1-.446 1-1V3a1 1 0 0 0-1-1zm0 3h12v8H2zm1 2 2 2-2 2 1 1 3-3-3-3zm5 3.5V12h5v-1.5z"/></svg>', lg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#7e57c2" d="M20 18h-2v-2h-2v2c0 .193 0 .703 1.254 1.033A3.345 3.345 0 0 1 20 22h2v2h2v-2c0-.388-.562-.851-1.254-1.034C20.356 20.34 20 18.84 20 18m-3.254 2.966C14.356 20.34 14 18.84 14 18h-2v-2h-2v8h2v-2h4v2h2v-2c0-.388-.562-.851-1.254-1.034"/><path fill="#7e57c2" d="M24 4H4v20a4 4 0 0 0 4 4h16.16A3.84 3.84 0 0 0 28 24.16V8a4 4 0 0 0-4-4m2 14h-2v-2h-2v2c0 .193 0 .703 1.254 1.033A3.345 3.345 0 0 1 26 22v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1 2-2h2a2 2 0 0 1 2 2Z"/></svg>', ag = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ffca28" d="M16 24c-5.525 0-10-.9-10-2v4c0 1.1 4.475 2 10 2s10-.9 10-2v-4c0 1.1-4.475 2-10 2m0-8c-5.525 0-10-.9-10-2v4c0 1.1 4.475 2 10 2s10-.9 10-2v-4c0 1.1-4.475 2-10 2m0-12C10.477 4 6 4.895 6 6v4c0 1.1 4.475 2 10 2s10-.9 10-2V6c0-1.105-4.477-2-10-2"/></svg>', cg = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/><path fill="#42a5f5" d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5z"/></svg>', ug = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m8.668 6h3.6641l-3.6641-3.668v3.668m-4.668-4.668h5.332l4 4v8c0 0.73828-0.59375 1.3359-1.332 1.3359h-8c-0.73828 0-1.332-0.59766-1.332-1.3359v-10.664c0-0.74219 0.59375-1.3359 1.332-1.3359m3.332 1.3359h-3.332v10.664h8v-6h-4.668z" fill="#90a4ae" /></svg>', fg = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m6.922 3.768-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232" fill="#90a4ae" /></svg>', dg = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.483 6H4.721a1 1 0 0 0-.949.684L2 12V5h12a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232l-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h11l2.403-5.606A1 1 0 0 0 14.483 6" fill="#90a4ae" /></svg>', pg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#e65100" d="m4 4 2 22 10 2 10-2 2-22Zm19.72 7H11.28l.29 3h11.86l-.802 9.335L15.99 25l-6.635-1.646L8.93 19h3.02l.19 2 3.86.77 3.84-.77.29-4H8.84L8 8h16Z"/></svg>', gg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#26a69a" d="M8.5 6h4l-4-4zM3.875 1H9.5l4 4v8.6c0 .773-.616 1.4-1.375 1.4h-8.25c-.76 0-1.375-.627-1.375-1.4V2.4c0-.777.612-1.4 1.375-1.4M4 13.6h8V8l-2.625 2.8L8 9.4zm1.25-7.7c-.76 0-1.375.627-1.375 1.4s.616 1.4 1.375 1.4c.76 0 1.375-.627 1.375-1.4S6.009 5.9 5.25 5.9"/></svg>', hg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#ffca28" d="M2 2v12h12V2zm6 6h1v4a1.003 1.003 0 0 1-1 1H7a1.003 1.003 0 0 1-1-1v-1h1v1h1zm3 0h2v1h-2v1h1a1.003 1.003 0 0 1 1 1v1a1.003 1.003 0 0 1-1 1h-2v-1h2v-1h-1a1.003 1.003 0 0 1-1-1V9a1.003 1.003 0 0 1 1-1"/></svg>', vg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path fill="#f9a825" d="M560-160v-80h120q17 0 28.5-11.5T720-280v-80q0-38 22-69t58-44v-14q-36-13-58-44t-22-69v-80q0-17-11.5-28.5T680-720H560v-80h120q50 0 85 35t35 85v80q0 17 11.5 28.5T840-560h40v160h-40q-17 0-28.5 11.5T800-360v80q0 50-35 85t-85 35zm-280 0q-50 0-85-35t-35-85v-80q0-17-11.5-28.5T120-400H80v-160h40q17 0 28.5-11.5T160-600v-80q0-50 35-85t85-35h120v80H280q-17 0-28.5 11.5T240-680v80q0 38-22 69t-58 44v14q36 13 58 44t22 69v80q0 17 11.5 28.5T280-240h120v80z"/></svg>', mg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#42a5f5" d="m14 10-4 3.5L6 10H4v12h4v-6l2 2 2-2v6h4V10zm12 6v-6h-4v6h-4l6 8 6-8z"/></svg>', yg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ef5350" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m4.93 10.44c.41.9.93 1.64 1.53 2.15l.41.32c-.87.16-2.07.44-3.34.93l-.11.04.5-1.04c.45-.87.78-1.66 1.01-2.4m6.48 3.81c.18-.18.27-.41.28-.66.03-.2-.02-.39-.12-.55-.29-.47-1.04-.69-2.28-.69l-1.29.07-.87-.58c-.63-.52-1.2-1.43-1.6-2.56l.04-.14c.33-1.33.64-2.94-.02-3.6a.85.85 0 0 0-.61-.24h-.24c-.37 0-.7.39-.79.77-.37 1.33-.15 2.06.22 3.27v.01c-.25.88-.57 1.9-1.08 2.93l-.96 1.8-.89.49c-1.2.75-1.77 1.59-1.88 2.12-.04.19-.02.36.05.54l.03.05.48.31.44.11c.81 0 1.73-.95 2.97-3.07l.18-.07c1.03-.33 2.31-.56 4.03-.75 1.03.51 2.24.74 3 .74.44 0 .74-.11.91-.3m-.41-.71.09.11c-.01.1-.04.11-.09.13h-.04l-.19.02c-.46 0-1.17-.19-1.9-.51.09-.1.13-.1.23-.1 1.4 0 1.8.25 1.9.35M7.83 17c-.65 1.19-1.24 1.85-1.69 2 .05-.38.5-1.04 1.21-1.69zm3.02-6.91c-.23-.9-.24-1.63-.07-2.05l.07-.12.15.05c.17.24.19.56.09 1.1l-.03.16-.16.82z"/></svg>', wg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#e64a19" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zM8 11v2h1v6H8v1h4v-1h-1v-2h2a3 3 0 0 0 3-3 3 3 0 0 0-3-3zm5 2a1 1 0 0 1 1 1 1 1 0 0 1-1 1h-2v-2z"/></svg>', bg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#0288d1" d="M9.86 2A2.86 2.86 0 0 0 7 4.86v1.68h4.29c.39 0 .71.57.71.96H4.86A2.86 2.86 0 0 0 2 10.36v3.781a2.86 2.86 0 0 0 2.86 2.86h1.18v-2.68a2.85 2.85 0 0 1 2.85-2.86h5.25c1.58 0 2.86-1.271 2.86-2.851V4.86A2.86 2.86 0 0 0 14.14 2zm-.72 1.61c.4 0 .72.12.72.71s-.32.891-.72.891c-.39 0-.71-.3-.71-.89s.32-.711.71-.711"/><path fill="#fdd835" d="M17.959 7v2.68a2.85 2.85 0 0 1-2.85 2.859H9.86A2.85 2.85 0 0 0 7 15.389v3.75a2.86 2.86 0 0 0 2.86 2.86h4.28A2.86 2.86 0 0 0 17 19.14v-1.68h-4.291c-.39 0-.709-.57-.709-.96h7.14A2.86 2.86 0 0 0 22 13.64V9.86A2.86 2.86 0 0 0 19.14 7zM8.32 11.513l-.004.004.038-.004zm6.54 7.276c.39 0 .71.3.71.89a.71.71 0 0 1-.71.71c-.4 0-.72-.12-.72-.71s.32-.89.72-.89"/></svg>', _g = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#8bc34a" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zm4 7.5h-4v2h1l-2 1.67L10 13h1v-2H7v2h1l3 2.5L8 18H7v2h4v-2h-1l2-1.67L14 18h-1v2h4v-2h-1l-3-2.5 3-2.5h1z"/></svg>', xg = '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 16 16"><path fill="#0288d1" d="M2 2v12h12V2zm4 6h3v1H8v4H7V9H6zm5 0h2v1h-2v1h1a1.003 1.003 0 0 1 1 1v1a1.003 1.003 0 0 1-1 1h-2v-1h2v-1h-1a1.003 1.003 0 0 1-1-1V9a1.003 1.003 0 0 1 1-1"/></svg>', Sg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ff9800" d="m24 6 2 6h-4l-2-6h-3l2 6h-4l-2-6h-3l2 6H8L6 6H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3V6Z"/></svg>', Rg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#01579b" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zM7 13l1.5 7h2l1.5-3 1.5 3h2l1.5-7h1v-2h-4v2h1l-.9 4.2L13 15h-2l-1.1 2.2L9 13h1v-2H6v2z"/></svg>', Cg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#8bc34a" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m.12 13.5 3.74 3.74 1.42-1.41-2.33-2.33 2.33-2.33-1.42-1.41zm11.16 0-3.74-3.74-1.42 1.41 2.33 2.33-2.33 2.33 1.42 1.41z"/></svg>', Mg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ff5252" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2m12 16v-2H9v2zm-4-4v-2H6v2z"/></svg>', Ig = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#afb42b" d="M14 17h-2v-2h-2v-2h2v2h2m0-6h-2v2h2v2h-2v-2h-2V9h2V7h-2V5h2v2h2m5-4H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2"/></svg>', Eg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Ag = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Og = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Pg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Tg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Dg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, kg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Fg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Hg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, jg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Lg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Kg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Vg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Bg = ["aria-label"], $g = {
  key: 0,
  class: "pnl-tst-tsep",
  "aria-hidden": "true"
}, Ng = {
  key: 1,
  class: "pnl-tst-search"
}, Wg = ["innerHTML"], Ug = ["value", "aria-label", "placeholder"], qg = ["aria-label", "aria-keyshortcuts", "aria-disabled", "title", "tabindex", "onClick", "onFocus"], zg = ["innerHTML"], Gg = {
  key: 1,
  class: "pnl-tst-empty"
}, Yg = ["aria-label", "aria-colcount", "aria-rowcount"], Xg = {
  key: 0,
  class: "pnl-tst-head",
  role: "rowgroup"
}, Jg = {
  class: "pnl-tst-hrow",
  role: "row",
  "aria-rowindex": 1
}, Zg = ["aria-colindex"], Qg = {
  class: "pnl-tst-body",
  role: "rowgroup"
}, eh = ["aria-level", "aria-posinset", "aria-setsize", "aria-rowindex", "aria-expanded", "aria-selected", "tabindex", "onClick", "onFocus"], th = ["aria-colindex"], nh = ["onClick"], rh = {
  key: 1,
  class: "pnl-tst-twisty pnl-tst-twisty--leaf",
  "aria-hidden": "true"
}, oh = ["checked", ".indeterminate", "aria-label", "onClick"], sh = ["innerHTML"], ih = ["value", "aria-label", "onKeydown", "onBlur"], lh = {
  key: 2,
  class: "pnl-tst-value"
}, ah = "title", Qn = "search", er = "|", pn = "pnl-tst-row", ch = 500, uh = {
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
    // Two-way sync of the row the inline title editor is open on.
    setEditingKey: { type: Function, required: !0 }
  },
  setup(e) {
    const t = e, n = {
      rowExpandingFeature: Hd,
      rowSelectionFeature: Yd,
      coreRowModel: Dl(),
      expandedRowModel: Xd()
    }, r = X(() => (t.state.columns || []).length > 0), o = X(() => {
      const c = t.state.columns || [];
      return c.length === 0 ? [{ id: ah, header: "", accessorFn: (d) => d.title }] : c.map((d) => {
        const v = d.field ?? d.id;
        return {
          id: d.id,
          header: d.header ?? d.id,
          accessorFn: (b) => b[v],
          meta: { width: d.width }
        };
      });
    }), s = /* @__PURE__ */ Pe(i(t.state.expandedKeys));
    function i(c) {
      const d = {};
      for (const v of c || []) d[v] = !0;
      return d;
    }
    function l(c) {
      return c === !0 ? F.getCoreRowModel().flatRows.filter((d) => d.subRows.length > 0).map((d) => d.id).sort() : Object.keys(c).filter((d) => c[d]).sort();
    }
    const a = {
      audio: sg,
      console: ig,
      css: lg,
      database: ag,
      document: cg,
      file: ug,
      folder: fg,
      "folder-open": dg,
      html: pg,
      image: gg,
      javascript: hg,
      json: vg,
      markdown: mg,
      pdf: yg,
      powerpoint: wg,
      python: bg,
      table: _g,
      typescript: xg,
      video: Sg,
      word: Rg,
      xml: Cg,
      yaml: Mg,
      zip: Ig
    };
    function u(c) {
      return c ? { ...a, ...t.state.icons || {} }[c] ?? null : null;
    }
    function f(c) {
      const d = c.original.icon;
      return d ? (ze(c) ? u(`${d}-open`) : null) ?? u(d) : null;
    }
    function h(c, d) {
      return c.length !== d.length ? !1 : c.every((v, b) => v === d[b]);
    }
    const w = X(() => t.state.options.select_mode ?? "none"), y = X(() => w.value !== "none"), I = X(() => w.value === "hierarchy"), C = X(
      () => y.value && t.state.options.show_checkboxes !== !1
    ), T = /* @__PURE__ */ Pe(i(t.state.selectedKeys)), F = ep({
      features: n,
      data: X(() => t.state.source || []),
      columns: o,
      getRowId: (c) => c.key,
      getSubRows: (c) => c.children,
      // TanStack resets `expanded` whenever `data` changes. Python rewrites the
      // whole tree after every move, so leaving that on would collapse the tree on
      // each drop and push an empty `expanded_keys` back. Expansion is owned here.
      autoResetExpanded: !1,
      enableRowSelection: y,
      enableMultiRowSelection: X(() => w.value !== "single"),
      enableSubRowSelection: I,
      state: X(() => ({ expanded: s.value, rowSelection: T.value })),
      onExpandedChange: (c) => {
        s.value = typeof c == "function" ? c(s.value) : c;
      },
      onRowSelectionChange: (c) => {
        T.value = typeof c == "function" ? c(T.value) : c;
      }
    });
    function M(c) {
      if (c.getIsSelected()) return "all";
      if (!I.value || c.subRows.length === 0) return "none";
      const d = c.subRows.map(M);
      return d.every((v) => v === "all") ? "all" : d.some((v) => v !== "none") ? "some" : "none";
    }
    be(() => l(T.value), t.setSelectedKeys, { flush: "post" }), be(() => l(s.value), t.setExpandedKeys, { flush: "post" }), be(
      () => t.state.expandedKeys,
      (c) => {
        h(l(s.value), [...c || []].sort()) || (s.value = i(c));
      }
    ), be(
      () => t.state.selectedKeys,
      (c) => {
        h(l(T.value), [...c || []].sort()) || (T.value = i(c));
      }
    ), be(
      () => [t.state.options.expand_all, t.state.source],
      ([c]) => {
        c && F.toggleAllRowsExpanded(!0);
      },
      { immediate: !0 }
    );
    const L = X(() => (t.state.filterText ?? "").trim().toLowerCase()), E = X(() => L.value.length > 0), $ = /* @__PURE__ */ Pe(t.state.filterText ?? "");
    be(
      () => t.state.filterText,
      (c) => {
        $.value = c ?? "";
      }
    );
    function W(c) {
      $.value = c, t.setFilterText(c);
    }
    function ue(c) {
      return c.getAllCells().some((d) => String(d.getValue() ?? "").toLowerCase().includes(L.value));
    }
    const k = X(() => {
      if (!E.value) return F.getRowModel().rows;
      const c = /* @__PURE__ */ new Set();
      for (const d of F.getCoreRowModel().flatRows)
        if (ue(d)) {
          c.add(d.id);
          for (let v = d.getParentRow(); v; v = v.getParentRow()) c.add(v.id);
        }
      return F.getCoreRowModel().flatRows.filter((d) => c.has(d.id));
    }), H = X(() => {
      var c;
      return ((c = F.getHeaderGroups()[0]) == null ? void 0 : c.headers) ?? [];
    }), G = X(() => t.state.options.indent_px ?? 16), fe = X(() => t.state.options.aria_label ?? "Tree table"), se = X(() => E.value ? "No matches" : "No data"), ve = X(() => r.value ? 2 : 1), Oe = X(() => k.value.length + (r.value ? 1 : 0)), Ce = X(() => {
      const c = /* @__PURE__ */ new Map();
      for (const d of k.value) {
        const v = d.parentId ?? "", b = c.get(v) ?? [];
        b.push(d.id), c.set(v, b);
      }
      return c;
    });
    function te(c) {
      return Ce.value.get(c.parentId ?? "") ?? [];
    }
    function Y(c) {
      return te(c).indexOf(c.id) + 1;
    }
    function ne(c) {
      return te(c).length;
    }
    function De(c) {
      return E.value ? (Ce.value.get(c.id) ?? []).length > 0 : c.getCanExpand();
    }
    function ze(c) {
      return E.value ? De(c) : c.getIsExpanded();
    }
    function $e(c) {
      var v;
      const d = (v = c.meta) == null ? void 0 : v.width;
      return d ? { flex: `0 0 ${d}px` } : { flex: "1 1 0" };
    }
    function je(c, d) {
      return { ...$e(d), paddingInlineStart: `${c.depth * G.value}px` };
    }
    const ht = /* @__PURE__ */ Pe(null), vt = /* @__PURE__ */ Pe(!0), $t = /* @__PURE__ */ new Map();
    function Le(c) {
      ht.value = c, vt.value = !0;
    }
    function Nt(c, d) {
      d ? $t.set(c, d) : $t.delete(c);
    }
    const mt = X(() => {
      const c = k.value;
      return c.length === 0 ? null : c.some((d) => d.id === ht.value) ? ht.value : c[0].id;
    });
    function ke(c) {
      c != null && (Le(c), Yt(() => {
        var d;
        return (d = $t.get(c)) == null ? void 0 : d.focus();
      }));
    }
    function Ge(c) {
      const d = k.value;
      d.length !== 0 && ke(d[Math.max(0, Math.min(c, d.length - 1))].id);
    }
    function jr(c, d) {
      const v = k.value;
      if (v.length === 0) return;
      const b = v[Math.max(0, Math.min(c, v.length - 1))], V = (d == null ? void 0 : d.shiftKey) && y.value && w.value !== "single";
      V && g.value === null && (g.value = mt.value), ke(b.id), V && R(b, !1);
    }
    function p(c) {
      const d = k.value;
      if (d.length === 0) return;
      const v = Math.max(
        0,
        d.findIndex((q) => q.id === mt.value)
      ), b = d[v];
      if (c.ctrlKey || c.metaKey) {
        const q = { a: "select-all", f: Qn }[c.key.toLowerCase()];
        if (q && Ct(q)) {
          c.preventDefault(), we(q);
          return;
        }
      }
      if (c.altKey) {
        const q = {
          ArrowUp: "move-up",
          ArrowDown: "move-down",
          ArrowLeft: "outdent",
          ArrowRight: "indent"
        }[c.key];
        if (q && Ct(q)) {
          c.preventDefault(), we(q);
          return;
        }
      }
      const V = {
        Insert: c.shiftKey ? "new-file" : "new-folder",
        F2: "rename",
        Delete: "delete",
        Escape: "clear-selection"
      }[c.key];
      if (V && Ct(V)) {
        c.preventDefault(), we(V);
        return;
      }
      switch (c.key) {
        case "ArrowDown":
          c.preventDefault(), jr(v + 1, c);
          break;
        case "ArrowUp":
          c.preventDefault(), jr(v - 1, c);
          break;
        case "ArrowRight":
          if (c.preventDefault(), !De(b)) break;
          ze(b) ? Ge(v + 1) : (b.toggleExpanded(!0), ke(b.id));
          break;
        case "ArrowLeft":
          c.preventDefault(), !E.value && b.getCanExpand() && b.getIsExpanded() ? (b.toggleExpanded(!1), ke(b.id)) : b.parentId && ke(b.parentId);
          break;
        case "Home":
          c.preventDefault(), Ge(0);
          break;
        case "End":
          c.preventDefault(), Ge(d.length - 1);
          break;
        case "Enter":
          c.preventDefault(), t.emitEvent("activate", { key: b.id });
          break;
        case " ":
          if (!y.value) break;
          c.preventDefault(), B(b);
          break;
      }
    }
    const g = /* @__PURE__ */ Pe(null);
    function m(c) {
      g.value = c.id, T.value = {}, c.toggleSelected(!0, { selectChildren: !1 });
    }
    function R(c, d) {
      const v = k.value, b = v.findIndex((Ve) => Ve.id === g.value), V = v.findIndex((Ve) => Ve.id === c.id);
      if (V === -1) return;
      if (b === -1) {
        m(c);
        return;
      }
      d || (T.value = {});
      const [q, he] = b <= V ? [b, V] : [V, b];
      for (let Ve = q; Ve <= he; Ve += 1)
        v[Ve].toggleSelected(!0, { selectChildren: !1 });
    }
    const S = X(() => t.state.options.toggle_on_click === !0);
    function _(c) {
      const d = l(T.value);
      return d.length === 1 && d[0] === c.id;
    }
    function P() {
      T.value = {}, g.value = null, vt.value = !1;
    }
    function O() {
      l(T.value).length === 0 && (vt.value = !1);
    }
    be(
      () => l(T.value).length > 0,
      (c) => {
        c && (vt.value = !0);
      }
    );
    function A(c, d) {
      Le(c.id);
      const v = !!(d != null && d.shiftKey || d != null && d.ctrlKey || d != null && d.metaKey);
      y.value && !v && S.value && _(c) ? P() : y.value && w.value !== "single" ? d != null && d.shiftKey ? R(c, d.ctrlKey || d.metaKey) : d != null && d.ctrlKey || d != null && d.metaKey ? (g.value = c.id, j(c)) : m(c) : y.value && m(c), t.emitEvent("activate", { key: c.id });
    }
    function x(c) {
      Le(c.id), !E.value && c.toggleExpanded();
    }
    function K(c) {
      return M(c) === "all";
    }
    function D(c) {
      return M(c) === "some";
    }
    function j(c) {
      Le(c.id), c.toggleSelected(void 0, { selectChildren: !1 }), O();
    }
    function B(c) {
      Le(c.id), c.toggleSelected(!K(c), {
        selectChildren: I.value,
        deselectParents: I.value
      }), O();
    }
    function z(c) {
      B(c), ke(c.id);
    }
    const J = {
      "new-folder": { icon: Dg, label: "New folder", keys: "Insert", node: {} },
      "new-file": {
        icon: Tg,
        label: "New file",
        keys: "Shift+Insert",
        node: { allow_children: !1 }
      },
      rename: { icon: Hg, label: "Rename", keys: "F2" },
      delete: { icon: Vg, label: "Delete", keys: "Delete" },
      "move-up": { icon: Ag, label: "Move up", keys: "Alt+ArrowUp" },
      "move-down": { icon: Eg, label: "Move down", keys: "Alt+ArrowDown" },
      outdent: { icon: kg, label: "Outdent", keys: "Alt+ArrowLeft" },
      indent: { icon: Fg, label: "Indent", keys: "Alt+ArrowRight" },
      "expand-all": { icon: Og, label: "Expand all" },
      "collapse-all": { icon: Pg, label: "Collapse all" },
      "select-all": { icon: Kg, label: "Select all", keys: "Control+A" },
      "clear-selection": { icon: Lg, label: "Clear selection", keys: "Escape" }
    }, Z = [
      "new-folder",
      "new-file",
      "rename",
      "delete",
      er,
      "move-up",
      "move-down",
      "outdent",
      "indent",
      er,
      "expand-all",
      "collapse-all",
      er,
      "select-all",
      "clear-selection",
      Qn
    ], ae = X(() => {
      const c = t.state.options.toolbar, d = c === !0 ? Z : Array.isArray(c) ? c : [], v = [];
      return d.forEach((b, V) => {
        const q = typeof b == "string" ? {} : b || {}, he = typeof b == "string" ? b : q.id, Ve = `${he}#${V}`;
        if (he === er || he === Qn) {
          v.push({ uid: Ve, id: he });
          return;
        }
        const un = J[he];
        if (!un) return;
        const cs = q.label ?? un.label;
        v.push({
          uid: Ve,
          id: he,
          label: cs,
          icon: u(q.icon) ?? un.icon,
          keys: un.keys,
          node: { title: cs, ...un.node ?? {}, ...q.node ?? {} }
        });
      }), v;
    }), me = X(() => ae.value.length > 0), Ke = X(() => t.state.options.toolbar_label ?? "Tree actions"), Fe = X(() => t.state.options.search_label ?? "Search");
    function yt(c) {
      return ae.value.find((d) => d.id === c) ?? null;
    }
    function Ct(c) {
      return yt(c) !== null;
    }
    function we(c) {
      const d = yt(c);
      d && rs(d);
    }
    const pe = X(() => k.value.find((c) => c.id === mt.value) ?? null);
    function jn(c) {
      return k.value.filter((d) => (d.parentId ?? "") === (c.parentId ?? ""));
    }
    function ln() {
      const c = pe.value;
      if (!c) return [];
      const d = ss(c), v = c.parentId ?? "";
      return d.every((V) => {
        var q;
        return (((q = an(V)) == null ? void 0 : q.parentId) ?? "") === v;
      }) ? d : [c.id];
    }
    function es() {
      const c = pe.value;
      if (!c) return [];
      if (!y.value || !c.getIsSelected()) return [c.id];
      const d = k.value.filter((v) => v.getIsSelected()).map((v) => v.id);
      return d.length > 0 ? d : [c.id];
    }
    function Wt(c) {
      const d = pe.value;
      if (!d) return null;
      const v = new Set(ln()), b = jn(d), V = b.map((he, Ve) => v.has(he.id) ? Ve : -1).filter((he) => he >= 0);
      if (V.length === 0) return null;
      let q = (c < 0 ? Math.min(...V) : Math.max(...V)) + c;
      for (; q >= 0 && q < b.length && v.has(b[q].id); ) q += c;
      return b[q] ?? null;
    }
    let Mt = null;
    be(
      () => t.state.source,
      () => {
        const c = Mt;
        if (Mt = null, !!c) {
          if (c.key !== void 0) {
            ke(c.key);
            return;
          }
          Yt(() => {
            c.index !== void 0 ? Ge(c.index) : ra(c.added);
          });
        }
      }
    );
    function ra(c) {
      const d = F.getCoreRowModel().flatRows.find((v) => !c.has(v.id));
      d && (ke(d.id), y.value && (T.value = {}, g.value = d.id, d.toggleSelected(!0, { selectChildren: !1 })), Ct("rename") && Yt(() => Kn(d.id, !0)));
    }
    const Ut = /* @__PURE__ */ Pe(null), Ln = /* @__PURE__ */ Pe(""), Lr = /* @__PURE__ */ Pe(null);
    let Kr = null;
    function Kn(c, d = !1) {
      const v = an(c);
      v && (Kr = d ? c : null, Ln.value = v.original.title ?? "", Ut.value = c, t.setEditingKey(c), Yt(() => {
        var b, V;
        (b = Lr.value) == null || b.focus(), (V = Lr.value) == null || V.select();
      }));
    }
    function Vr() {
      Kr = null, Ut.value = null, t.setEditingKey("");
    }
    function ts(c) {
      if (Ut.value !== c.id) return;
      const d = Ln.value.trim(), v = d.length > 0 && d !== (c.original.title ?? "");
      if (Vr(), !v) {
        ke(c.id);
        return;
      }
      Mt = { key: c.id }, t.emitEvent("rename", { key: c.id, title: d });
    }
    function oa(c) {
      if (Ut.value !== c.id) return;
      const d = Kr === c.id;
      if (Vr(), !d) {
        ke(c.id);
        return;
      }
      Mt = { index: k.value.findIndex((v) => v.id === c.id) }, t.emitEvent("delete", { key: c.id, keys: [c.id] });
    }
    function sa(c, d) {
      d.key === "Enter" ? (d.preventDefault(), ts(c)) : d.key === "Escape" && (d.preventDefault(), oa(c));
    }
    be(
      () => t.state.editingKey,
      (c) => {
        (c || "") !== (Ut.value || "") && (c ? Kn(c) : Vr());
      }
    ), bo(() => {
      t.state.editingKey && Kn(t.state.editingKey);
    });
    function Vn(c, d) {
      const v = pe.value;
      !v || !c || (Mt = { key: v.id }, t.emitEvent("move", {
        key: v.id,
        keys: ln(),
        position: d,
        anchorKey: c.id
      }));
    }
    function ia(c) {
      const d = pe.value, v = d ? d.original.allow_children === !1 ? "after" : "child" : null;
      d && v === "child" && !E.value && d.toggleExpanded(!0), Mt = { added: new Set(F.getCoreRowModel().flatRows.map((b) => b.id)) }, t.emitEvent("add", { anchorKey: (d == null ? void 0 : d.id) ?? null, position: v, node: c.node });
    }
    function la() {
      var d;
      const c = es();
      c.length !== 0 && (Mt = { index: k.value.findIndex((v) => {
        var b;
        return v.id === ((b = pe.value) == null ? void 0 : b.id);
      }) }, t.emitEvent("delete", { key: ((d = pe.value) == null ? void 0 : d.id) ?? null, keys: c }));
    }
    function ns(c) {
      var d;
      switch (c.id) {
        case "new-folder":
        case "new-file":
          return !0;
        case "rename":
          return pe.value !== null;
        case "delete":
          return es().length > 0;
        case "move-up":
          return Wt(-1) !== null;
        case "move-down":
          return Wt(1) !== null;
        case "indent": {
          const v = Wt(-1);
          return v !== null && v.original.allow_children !== !1;
        }
        case "outdent":
          return !!((d = pe.value) != null && d.parentId);
        case "expand-all":
        case "collapse-all":
          return k.value.length > 0 && !E.value;
        case "select-all":
          return k.value.length > 0 && y.value && w.value !== "single";
        case "clear-selection":
          return y.value && l(T.value).length > 0;
        default:
          return !0;
      }
    }
    function aa(c) {
      return c.keys ? `${c.label} (${c.keys.replace("Control", "Ctrl")})` : c.label;
    }
    function rs(c) {
      var d, v, b, V;
      if (ns(c))
        switch (c.id) {
          case "new-folder":
          case "new-file":
            ia(c);
            break;
          case "rename":
            Kn(pe.value.id);
            break;
          case "delete":
            la();
            break;
          case "move-up":
            Vn(Wt(-1), "before");
            break;
          case "move-down":
            Vn(Wt(1), "after");
            break;
          case "indent": {
            const q = Wt(-1);
            q && !E.value && q.toggleExpanded(!0), Vn(q, "child");
            break;
          }
          case "outdent":
            Vn(an((d = pe.value) == null ? void 0 : d.parentId), "after");
            break;
          case "expand-all":
            F.toggleAllRowsExpanded(!0);
            break;
          case "collapse-all":
            F.toggleAllRowsExpanded(!1);
            break;
          case "select-all":
            T.value = Object.fromEntries(k.value.map((q) => [q.id, !0])), g.value = ((v = k.value[0]) == null ? void 0 : v.id) ?? null;
            break;
          case "clear-selection":
            P();
            break;
          case Qn:
            (b = Br.value) == null || b.focus(), (V = Br.value) == null || V.select();
            break;
        }
    }
    const Br = /* @__PURE__ */ Pe(null), $r = X(() => ae.value.filter((c) => c.id in J)), Bn = /* @__PURE__ */ Pe(null), Nr = /* @__PURE__ */ new Map(), os = X(() => {
      const c = $r.value;
      return c.length === 0 ? null : c.some((d) => d.uid === Bn.value) ? Bn.value : c[0].uid;
    });
    function ca(c, d) {
      d ? Nr.set(c, d) : Nr.delete(c);
    }
    function $n(c) {
      const d = $r.value;
      if (d.length === 0) return;
      const v = d[Math.max(0, Math.min(c, d.length - 1))].uid;
      Bn.value = v, Yt(() => {
        var b;
        return (b = Nr.get(v)) == null ? void 0 : b.focus();
      });
    }
    function ua(c) {
      const d = $r.value, v = Math.max(
        0,
        d.findIndex((b) => b.uid === os.value)
      );
      switch (c.key) {
        case "ArrowRight":
          c.preventDefault(), $n(v + 1);
          break;
        case "ArrowLeft":
          c.preventDefault(), $n(v - 1);
          break;
        case "Home":
          c.preventDefault(), $n(0);
          break;
        case "End":
          c.preventDefault(), $n(d.length - 1);
          break;
      }
    }
    const fa = ["reorder-above", "reorder-below", "make-child", "reparent"], Wr = X(() => t.state.options.enable_dnd === !0), Ur = /* @__PURE__ */ Pe([]), Nn = /* @__PURE__ */ Pe(null);
    function an(c) {
      return k.value.find((d) => d.id === c) ?? null;
    }
    function da(c, d) {
      let v = c;
      for (; v; ) {
        if (d.includes(v.id)) return !0;
        v = v.getParentRow();
      }
      return !1;
    }
    function ss(c) {
      if (!y.value || !c.getIsSelected()) return [c.id];
      const d = /* @__PURE__ */ new Set();
      for (let b = c.getParentRow(); b; b = b.getParentRow()) d.add(b.id);
      const v = k.value.filter((b) => b.getIsSelected() && !d.has(b.id)).map((b) => b.id);
      return v.length > 1 ? v : [c.id];
    }
    function pa(c, d) {
      return da(c, d) ? fa : c.original.allow_children === !1 ? ["make-child"] : [];
    }
    function ga(c) {
      if (De(c) && ze(c)) return "expanded";
      const d = te(c);
      return d[d.length - 1] === c.id ? "last-in-group" : "standard";
    }
    let qr = null, cn = null;
    function zr() {
      cn && clearTimeout(cn), cn = null, qr = null;
    }
    function ha(c, d) {
      if (qr === c || (zr(), !d || d.type === "instruction-blocked")) return;
      const v = an(c);
      !v || !v.getCanExpand() || v.getIsExpanded() || (qr = c, cn = setTimeout(() => {
        cn = null;
        const b = an(c);
        b && b.getCanExpand() && !b.getIsExpanded() && b.toggleExpanded(!0);
      }, ch));
    }
    function Gr() {
      Nn.value = null, zr();
    }
    const is = /* @__PURE__ */ Pe(null);
    function va() {
      let c = is.value;
      if (!c) return null;
      let d = c.getRootNode();
      for (; d.host; )
        c = d.host, d = c.getRootNode();
      return c;
    }
    function Wn(c) {
      for (const d of k.value) {
        const v = $t.get(d.id);
        if (!v) continue;
        const b = v.getBoundingClientRect();
        if (c.clientX >= b.left && c.clientX < b.right && c.clientY >= b.top && c.clientY < b.bottom)
          return { row: d, element: v, rect: b };
      }
      return null;
    }
    function ma(c, d) {
      const v = ".pnl-tst-check, .pnl-tst-twisty, .pnl-tst-edit";
      for (const b of c.element.querySelectorAll(v)) {
        const V = b.getBoundingClientRect();
        if (d.clientX >= V.left && d.clientX < V.right && d.clientY >= V.top && d.clientY < V.bottom)
          return !0;
      }
      return !1;
    }
    let wt = null;
    function ls() {
      wt == null || wt(), wt = null;
      const c = va();
      !c || !Wr.value || (wt = Fr(
        Yp({
          element: c,
          // Anything outside a row (the header, the empty space below the last row)
          // is not a drag handle, and returning false cancels the native drag.
          canDrag: ({ input: d }) => {
            const v = Wn(d);
            return v !== null && !ma(v, d);
          },
          getInitialData: ({ input: d }) => {
            const v = Wn(d);
            return v ? { type: pn, key: v.row.id, keys: ss(v.row) } : { type: pn, key: null, keys: [] };
          },
          onGenerateDragPreview: ({ location: d, nativeSetDragImage: v }) => {
            const b = d.current.input, V = Wn(b);
            !V || !v || v(V.element, b.clientX - V.rect.left, b.clientY - V.rect.top);
          },
          onDragStart: ({ source: d }) => {
            Ur.value = d.data.keys ?? [];
          },
          onDrop: () => {
            Ur.value = [], Gr();
          }
        }),
        Gp({
          element: c,
          canDrop: ({ source: d }) => d.data.type === pn,
          getData: ({ input: d, source: v }) => {
            const b = Wn(d);
            if (!b) return { type: pn, key: null };
            const V = { type: pn, key: b.row.id };
            return og(V, {
              element: b.element,
              input: d,
              currentLevel: b.row.depth,
              indentPerLevel: G.value,
              mode: ga(b.row),
              block: pa(b.row, v.data.keys ?? [])
            });
          },
          onDrag: ({ self: d }) => {
            const v = d.data.key, b = li(d.data);
            Nn.value = v && b ? { key: v, instruction: b } : null, ha(v ?? null, b);
          },
          onDragLeave: Gr,
          onDrop: ({ self: d, source: v }) => {
            Gr();
            const b = d.data.key, V = li(d.data);
            if (!b || !V || V.type === "instruction-blocked") return;
            const q = v.data.keys ?? [];
            q.includes(b) || t.emitEvent("move", {
              key: v.data.key,
              keys: q,
              targetKey: b,
              instruction: V.type,
              desiredLevel: V.desiredLevel ?? V.currentLevel
            });
          }
        })
      ));
    }
    bo(ls), be(Wr, ls), Wi(() => {
      zr(), wt == null || wt();
    });
    function Yr(c) {
      var d;
      return ((d = Nn.value) == null ? void 0 : d.key) === c.id ? Nn.value.instruction : null;
    }
    function ya(c) {
      const d = Yr(c);
      return {
        "pnl-tst-row--draggable": Wr.value,
        "pnl-tst-row--dragging": Ur.value.includes(c.id),
        "pnl-tst-row--blocked": (d == null ? void 0 : d.type) === "instruction-blocked",
        "pnl-tst-row--child-target": (d == null ? void 0 : d.type) === "make-child"
      };
    }
    function as(c) {
      const d = Yr(c);
      return d ? d.type === "reorder-above" ? "pnl-tst-dropline--above" : d.type === "reorder-below" || d.type === "reparent" ? "pnl-tst-dropline--below" : null : null;
    }
    function wa(c) {
      const d = Yr(c);
      return d ? { insetInlineStart: `${(d.type === "reparent" ? d.desiredLevel : d.currentLevel) * d.indentPerLevel}px` } : null;
    }
    return (c, d) => (ce(), de("div", {
      ref_key: "rootElement",
      ref: is,
      class: "pnl-tst"
    }, [
      me.value ? (ce(), de("div", {
        key: 0,
        class: "pnl-tst-toolbar",
        role: "toolbar",
        "aria-orientation": "horizontal",
        "aria-label": Ke.value
      }, [
        (ce(!0), de(Ee, null, Gn(ae.value, (v) => (ce(), de(Ee, {
          key: v.uid
        }, [
          v.id === "|" ? (ce(), de("span", $g)) : v.id === "search" ? (ce(), de("label", Ng, [
            ot("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: Dt(jg)
            }, null, 8, Wg),
            ot("input", {
              ref_for: !0,
              ref: (b) => Br.value = b,
              type: "search",
              value: $.value,
              "aria-label": Fe.value,
              placeholder: Fe.value,
              onInput: d[0] || (d[0] = (b) => W(b.target.value))
            }, null, 40, Ug)
          ])) : (ce(), de("button", {
            key: 2,
            ref_for: !0,
            ref: (b) => ca(v.uid, b),
            type: "button",
            class: "pnl-tst-tbtn",
            "aria-label": v.label,
            "aria-keyshortcuts": v.keys,
            "aria-disabled": !ns(v),
            title: aa(v),
            tabindex: v.uid === os.value ? 0 : -1,
            onClick: (b) => rs(v),
            onFocus: (b) => Bn.value = v.uid,
            onKeydown: ua
          }, [
            ot("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: v.icon
            }, null, 8, zg)
          ], 40, qg))
        ], 64))), 128))
      ], 8, Bg)) : zt("", !0),
      k.value.length === 0 ? (ce(), de("div", Gg, tr(se.value), 1)) : (ce(), de("div", {
        key: 2,
        class: "pnl-tst-grid",
        role: "treegrid",
        "aria-label": fe.value,
        "aria-colcount": H.value.length,
        "aria-rowcount": Oe.value,
        onKeydown: p
      }, [
        r.value ? (ce(), de("div", Xg, [
          ot("div", Jg, [
            (ce(!0), de(Ee, null, Gn(H.value, (v, b) => (ce(), de("div", {
              key: v.id,
              class: "pnl-tst-hcell",
              role: "columnheader",
              "aria-colindex": b + 1,
              style: Zt($e(v.column.columnDef))
            }, tr(v.column.columnDef.header), 13, Zg))), 128))
          ])
        ])) : zt("", !0),
        ot("div", Qg, [
          (ce(!0), de(Ee, null, Gn(k.value, (v, b) => (ce(), de("div", {
            key: v.id,
            ref_for: !0,
            ref: (V) => Nt(v.id, V),
            class: Ot(["pnl-tst-row", [
              ya(v),
              {
                "pnl-tst-row--active": vt.value && v.id === ht.value,
                "pnl-tst-row--quiet": !vt.value && v.id === ht.value
              }
            ]]),
            role: "row",
            "aria-level": v.depth + 1,
            "aria-posinset": Y(v),
            "aria-setsize": ne(v),
            "aria-rowindex": b + ve.value,
            "aria-expanded": De(v) ? ze(v) : void 0,
            "aria-selected": y.value ? v.getIsSelected() : void 0,
            tabindex: v.id === mt.value ? 0 : -1,
            onClick: (V) => A(v, V),
            onFocus: (V) => Le(v.id)
          }, [
            as(v) ? (ce(), de("span", {
              key: 0,
              class: Ot(["pnl-tst-dropline", as(v)]),
              style: Zt(wa(v)),
              "aria-hidden": "true"
            }, null, 6)) : zt("", !0),
            (ce(!0), de(Ee, null, Gn(v.getAllCells(), (V, q) => (ce(), de("div", {
              key: V.id,
              class: Ot(["pnl-tst-cell", { "pnl-tst-cell--tree": q === 0 }]),
              role: "gridcell",
              "aria-colindex": q + 1,
              style: Zt(
                q === 0 ? je(v, V.column.columnDef) : $e(V.column.columnDef)
              )
            }, [
              q === 0 ? (ce(), de(Ee, { key: 0 }, [
                De(v) ? (ce(), de("span", {
                  key: 0,
                  class: Ot(["pnl-tst-twisty", { "pnl-tst-twisty--open": ze(v) }]),
                  "aria-hidden": "true",
                  onClick: Xn((he) => x(v), ["stop"])
                }, [...d[3] || (d[3] = [
                  ot("svg", {
                    viewBox: "0 0 16 16",
                    width: "12",
                    height: "12",
                    focusable: "false"
                  }, [
                    ot("path", {
                      d: "M6 3.5 10.5 8 6 12.5",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "1.6"
                    })
                  ], -1)
                ])], 10, nh)) : (ce(), de("span", rh)),
                C.value ? (ce(), de("input", {
                  key: 2,
                  class: "pnl-tst-check",
                  type: "checkbox",
                  tabindex: "-1",
                  checked: K(v),
                  ".indeterminate": D(v),
                  "aria-label": `Select ${v.original.title ?? v.id}`,
                  onClick: Xn((he) => z(v), ["stop"])
                }, null, 40, oh)) : zt("", !0),
                f(v) ? (ce(), de("span", {
                  key: 3,
                  class: "pnl-tst-icon",
                  "aria-hidden": "true",
                  innerHTML: f(v)
                }, null, 8, sh)) : zt("", !0)
              ], 64)) : zt("", !0),
              q === 0 && Ut.value === v.id ? (ce(), de("input", {
                key: 1,
                ref_for: !0,
                ref: (he) => Lr.value = he,
                class: "pnl-tst-edit",
                type: "text",
                value: Ln.value,
                "aria-label": `Rename ${v.original.title ?? v.id}`,
                onInput: d[1] || (d[1] = (he) => Ln.value = he.target.value),
                onClick: d[2] || (d[2] = Xn(() => {
                }, ["stop"])),
                onKeydown: Xn((he) => sa(v, he), ["stop"]),
                onBlur: (he) => ts(v)
              }, null, 40, ih)) : (ce(), de("span", lh, tr(V.getValue()), 1))
            ], 14, th))), 128))
          ], 42, eh))), 128))
        ])
      ], 40, Yg))
    ], 512));
  }
};
function fh({ model: e, el: t }) {
  t.style.display = "block", t.style.width = "100%", t.style.height = "100%";
  const n = document.createElement("div");
  n.className = "pnl-tst-root", n.style.height = "100%", t.append(n);
  const r = /* @__PURE__ */ Sr({
    source: e.get("source") || [],
    columns: e.get("columns") || [],
    options: e.get("options") || {},
    icons: e.get("icons") || {},
    filterText: e.get("filter_text") || "",
    editingKey: e.get("editing_key") || "",
    expandedKeys: e.get("expanded_keys") || [],
    selectedKeys: e.get("selected_keys") || []
  }), o = 16, s = [];
  let i = 0;
  const l = (C, T) => {
    i += 1, s.push({ seq: i, event_name: C, event_params: T }), s.length > o && s.shift(), e.set("_event_data", { events: [...s], timestamp: Date.now() }), e.save_changes();
  }, a = (C, T) => C.length === T.length && C.every((F, M) => F === T[M]), u = (C) => (T) => {
    const F = [...e.get(C) || []].sort();
    a(F, T) || (e.set(C, T), e.save_changes());
  }, f = u("expanded_keys"), h = u("selected_keys"), I = Bu(uh, {
    state: r,
    emitEvent: l,
    setExpandedKeys: f,
    setSelectedKeys: h,
    setFilterText: (C) => {
      (e.get("filter_text") || "") !== C && (e.set("filter_text", C), e.save_changes());
    },
    setEditingKey: (C) => {
      (e.get("editing_key") || "") !== C && (e.set("editing_key", C), e.save_changes());
    }
  });
  return I.mount(n), e.on("change:source", () => {
    r.source = e.get("source") || [];
  }), e.on("change:columns", () => {
    r.columns = e.get("columns") || [];
  }), e.on("change:options", () => {
    r.options = e.get("options") || {};
  }), e.on("change:icons", () => {
    r.icons = e.get("icons") || {};
  }), e.on("change:filter_text", () => {
    r.filterText = e.get("filter_text") || "";
  }), e.on("change:editing_key", () => {
    r.editingKey = e.get("editing_key") || "";
  }), e.on("change:expanded_keys", () => {
    r.expandedKeys = e.get("expanded_keys") || [];
  }), e.on("change:selected_keys", () => {
    r.selectedKeys = e.get("selected_keys") || [];
  }), () => {
    I.unmount();
  };
}
export {
  fh as render
};

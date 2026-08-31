/**
* @vue/shared v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function Ur(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const ie = {}, Ft = [], We = () => {
}, gs = () => !1, Vn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Nn = (e) => e.startsWith("onUpdate:"), _e = Object.assign, Gr = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, fl = Object.prototype.hasOwnProperty, Z = (e, t) => fl.call(e, t), V = Array.isArray, at = (e) => pn(e) === "[object Map]", In = (e) => pn(e) === "[object Set]", ho = (e) => pn(e) === "[object Date]", W = (e) => typeof e == "function", ue = (e) => typeof e == "string", Ue = (e) => typeof e == "symbol", ee = (e) => e !== null && typeof e == "object", hs = (e) => (ee(e) || W(e)) && W(e.then) && W(e.catch), ms = Object.prototype.toString, pn = (e) => ms.call(e), dl = (e) => pn(e).slice(8, -1), ys = (e) => pn(e) === "[object Object]", qr = (e) => ue(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Jt = /* @__PURE__ */ Ur(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Bn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, pl = /-\w/g, De = Bn(
  (e) => e.replace(pl, (t) => t.slice(1).toUpperCase())
), gl = /\B([A-Z])/g, Et = Bn(
  (e) => e.replace(gl, "-$1").toLowerCase()
), vs = Bn((e) => e.charAt(0).toUpperCase() + e.slice(1)), cr = Bn(
  (e) => e ? `on${vs(e)}` : ""
), Ne = (e, t) => !Object.is(e, t), ar = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, ws = (e, t, n, r = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: r,
    value: n
  });
}, hl = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let mo;
const Wn = () => mo || (mo = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function jt(e) {
  if (V(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], o = ue(r) ? wl(r) : jt(r);
      if (o)
        for (const s in o)
          t[s] = o[s];
    }
    return t;
  } else if (ue(e) || ee(e))
    return e;
}
const ml = /;(?![^(]*\))/g, yl = /:([^]+)/, vl = /\/\*[^]*?\*\//g;
function wl(e) {
  const t = {};
  return e.replace(vl, "").split(ml).forEach((n) => {
    if (n) {
      const r = n.split(yl);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function bt(e) {
  let t = "";
  if (ue(e))
    t = e;
  else if (V(e))
    for (let n = 0; n < e.length; n++) {
      const r = bt(e[n]);
      r && (t += r + " ");
    }
  else if (ee(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const bl = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", _l = /* @__PURE__ */ Ur(bl);
function bs(e) {
  return !!e || e === "";
}
function Sl(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let r = 0; n && r < e.length; r++)
    n = Un(e[r], t[r]);
  return n;
}
function yo(e, t) {
  if (e.size !== t.size) return !1;
  const n = Array.from(t), r = new Uint8Array(n.length);
  for (const o of e) {
    let s = -1;
    for (let i = 0; i < n.length; i++)
      if (!r[i] && Un(o, n[i])) {
        s = i;
        break;
      }
    if (s < 0) return !1;
    r[s] = 1;
  }
  return !0;
}
function Un(e, t) {
  if (e === t) return !0;
  let n = ho(e), r = ho(t);
  if (n || r)
    return n && r ? e.getTime() === t.getTime() : !1;
  if (n = Ue(e), r = Ue(t), n || r)
    return e === t;
  if (n = V(e), r = V(t), n || r)
    return n && r ? Sl(e, t) : !1;
  if (n = ee(e), r = ee(t), n || r) {
    if (!n || !r)
      return !1;
    if (n = at(e), r = at(t), n || r || (n = In(e), r = In(t), n || r))
      return n && r ? yo(e, t) : !1;
    const o = Object.keys(e).length, s = Object.keys(t).length;
    if (o !== s)
      return !1;
    for (const i in e) {
      const l = e.hasOwnProperty(i), c = t.hasOwnProperty(i);
      if (l && !c || !l && c || !Un(e[i], t[i]))
        return !1;
    }
  }
  return String(e) === String(t);
}
const _s = (e) => !!(e && e.__v_isRef === !0), Pr = (e) => ue(e) ? e : e == null ? "" : V(e) || ee(e) && (e.toString === ms || !W(e.toString)) ? _s(e) ? Pr(e.value) : JSON.stringify(e, Ss, 2) : String(e), Ss = (e, t) => _s(t) ? Ss(e, t.value) : at(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [r, o], s) => (n[ur(r, s) + " =>"] = o, n),
    {}
  )
} : In(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => ur(n))
} : Ue(t) ? ur(t) : ee(t) && !V(t) && !ys(t) ? String(t) : t, ur = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Ue(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let pe;
class xl {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && pe && (pe.active ? (this.parent = pe, this.index = (pe.scopes || (pe.scopes = [])).push(
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
      const n = pe;
      try {
        return pe = this, t();
      } finally {
        pe = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = pe, pe = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (pe === this)
        pe = this.prevScope;
      else {
        let t = pe;
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
function xs() {
  return pe;
}
function Rl(e, t = !1) {
  pe && pe.cleanups.push(e);
}
let se;
const fr = /* @__PURE__ */ new WeakSet();
class Rs {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, pe && (pe.active ? pe.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, fr.has(this) && (fr.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ms(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, vo(this), Ps(this);
    const t = se, n = Fe;
    se = this, Fe = !0;
    try {
      return this.fn();
    } finally {
      Es(this), se = t, Fe = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Xr(t);
      this.deps = this.depsTail = void 0, vo(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? fr.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Er(this) && this.run();
  }
  get dirty() {
    return Er(this);
  }
}
let Cs = 0, Zt, Qt;
function Ms(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Qt, Qt = e;
    return;
  }
  e.next = Zt, Zt = e;
}
function zr() {
  Cs++;
}
function Yr() {
  if (--Cs > 0)
    return;
  if (Qt) {
    let t = Qt;
    for (Qt = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; Zt; ) {
    let t = Zt;
    for (Zt = void 0; t; ) {
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
function Ps(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Es(e) {
  let t, n = e.depsTail, r = n;
  for (; r; ) {
    const o = r.prevDep;
    r.version === -1 ? (r === n && (n = o), Xr(r), Cl(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = o;
  }
  e.deps = t, e.depsTail = n;
}
function Er(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Os(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Os(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === on) || (e.globalVersion = on, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Er(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = se, r = Fe;
  se = e, Fe = !0;
  try {
    Ps(e);
    const o = e.fn(e._value);
    (t.version === 0 || Ne(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    se = n, Fe = r, Es(e), e.flags &= -3;
  }
}
function Xr(e, t = !1) {
  const { dep: n, prevSub: r, nextSub: o } = e;
  if (r && (r.nextSub = o, e.prevSub = void 0), o && (o.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
    n.computed.flags &= -5;
    for (let s = n.computed.deps; s; s = s.nextDep)
      Xr(s, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Cl(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let Fe = !0;
const Is = [];
function Ze() {
  Is.push(Fe), Fe = !1;
}
function Qe() {
  const e = Is.pop();
  Fe = e === void 0 ? !0 : e;
}
function vo(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = se;
    se = void 0;
    try {
      t();
    } finally {
      se = n;
    }
  }
}
let on = 0;
class Ml {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Jr {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!se || !Fe || se === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== se)
      n = this.activeLink = new Ml(se, this), se.deps ? (n.prevDep = se.depsTail, se.depsTail.nextDep = n, se.depsTail = n) : se.deps = se.depsTail = n, As(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const r = n.nextDep;
      r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = se.depsTail, n.nextDep = void 0, se.depsTail.nextDep = n, se.depsTail = n, se.deps === n && (se.deps = r);
    }
    return n;
  }
  trigger(t) {
    this.version++, on++, this.notify(t);
  }
  notify(t) {
    zr();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Yr();
    }
  }
}
function As(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let r = t.deps; r; r = r.nextDep)
        As(r);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const Or = /* @__PURE__ */ new WeakMap(), _t = /* @__PURE__ */ Symbol(
  ""
), Ir = /* @__PURE__ */ Symbol(
  ""
), sn = /* @__PURE__ */ Symbol(
  ""
);
function we(e, t, n) {
  if (Fe && se) {
    let r = Or.get(e);
    r || Or.set(e, r = /* @__PURE__ */ new Map());
    let o = r.get(n);
    o || (r.set(n, o = new Jr()), o.map = r, o.key = n), o.track();
  }
}
function Xe(e, t, n, r, o, s) {
  const i = Or.get(e);
  if (!i) {
    on++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if (zr(), t === "clear")
    i.forEach(l);
  else {
    const c = V(e), a = c && qr(n);
    if (c && n === "length") {
      const u = Number(r);
      i.forEach((d, y) => {
        (y === "length" || y === sn || !Ue(y) && y >= u) && l(d);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && l(i.get(n)), a && l(i.get(sn)), t) {
        case "add":
          c ? a && l(i.get("length")) : (l(i.get(_t)), at(e) && l(i.get(Ir)));
          break;
        case "delete":
          c || (l(i.get(_t)), at(e) && l(i.get(Ir)));
          break;
        case "set":
          at(e) && l(i.get(_t));
          break;
      }
  }
  Yr();
}
function At(e) {
  const t = /* @__PURE__ */ J(e);
  return t === e ? t : (we(t, "iterate", sn), /* @__PURE__ */ Ae(e) ? t : t.map(je));
}
function Gn(e) {
  return we(e = /* @__PURE__ */ J(e), "iterate", sn), e;
}
function $e(e, t) {
  return /* @__PURE__ */ et(e) ? Kt(/* @__PURE__ */ St(e) ? je(t) : t) : je(t);
}
const Pl = {
  __proto__: null,
  [Symbol.iterator]() {
    return dr(this, Symbol.iterator, (e) => $e(this, e));
  },
  concat(...e) {
    return At(this).concat(
      ...e.map((t) => V(t) ? At(t) : t)
    );
  },
  entries() {
    return dr(this, "entries", (e) => (e[1] = $e(this, e[1]), e));
  },
  every(e, t) {
    return qe(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return qe(
      this,
      "filter",
      e,
      t,
      (n) => n.map((r) => $e(this, r)),
      arguments
    );
  },
  find(e, t) {
    return qe(
      this,
      "find",
      e,
      t,
      (n) => $e(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return qe(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return qe(
      this,
      "findLast",
      e,
      t,
      (n) => $e(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return qe(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return qe(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return pr(this, "includes", e);
  },
  indexOf(...e) {
    return pr(this, "indexOf", e);
  },
  join(e) {
    return At(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return pr(this, "lastIndexOf", e);
  },
  map(e, t) {
    return qe(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Ut(this, "pop");
  },
  push(...e) {
    return Ut(this, "push", e);
  },
  reduce(e, ...t) {
    return wo(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return wo(this, "reduceRight", e, t);
  },
  shift() {
    return Ut(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return qe(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Ut(this, "splice", e);
  },
  toReversed() {
    return At(this).toReversed();
  },
  toSorted(e) {
    return At(this).toSorted(e);
  },
  toSpliced(...e) {
    return At(this).toSpliced(...e);
  },
  unshift(...e) {
    return Ut(this, "unshift", e);
  },
  values() {
    return dr(this, "values", (e) => $e(this, e));
  }
};
function dr(e, t, n) {
  const r = Gn(e), o = r[t]();
  return r !== e && !/* @__PURE__ */ Ae(e) && (o._next = o.next, o.next = () => {
    const s = o._next();
    return s.done || (s.value = n(s.value)), s;
  }), o;
}
const El = Array.prototype;
function qe(e, t, n, r, o, s) {
  const i = Gn(e), l = i !== e && !/* @__PURE__ */ Ae(e), c = i[t];
  if (c !== El[t]) {
    const d = c.apply(e, s);
    return l ? je(d) : d;
  }
  let a = n;
  i !== e && (l ? a = function(d, y) {
    return n.call(this, $e(e, d), y, e);
  } : n.length > 2 && (a = function(d, y) {
    return n.call(this, d, y, e);
  }));
  const u = c.call(i, a, r);
  return l && o ? o(u) : u;
}
function wo(e, t, n, r) {
  const o = Gn(e), s = o !== e && !/* @__PURE__ */ Ae(e);
  let i = n, l = !1;
  o !== e && (s ? (l = r.length === 0, i = function(a, u, d) {
    return l && (l = !1, a = $e(e, a)), n.call(this, a, $e(e, u), d, e);
  }) : n.length > 3 && (i = function(a, u, d) {
    return n.call(this, a, u, d, e);
  }));
  const c = o[t](i, ...r);
  return l ? $e(e, c) : c;
}
function pr(e, t, n) {
  const r = /* @__PURE__ */ J(e);
  we(r, "iterate", sn);
  const o = r[t](...n);
  return (o === -1 || o === !1) && /* @__PURE__ */ eo(n[0]) ? (n[0] = /* @__PURE__ */ J(n[0]), r[t](...n)) : o;
}
function Ut(e, t, n = []) {
  Ze(), zr();
  const r = (/* @__PURE__ */ J(e))[t].apply(e, n);
  return Yr(), Qe(), r;
}
const Ol = /* @__PURE__ */ Ur("__proto__,__v_isRef,__isVue"), Ts = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Ue)
);
function Il(e) {
  Ue(e) || (e = String(e));
  const t = /* @__PURE__ */ J(this);
  return we(t, "has", e), t.hasOwnProperty(e);
}
class Ds {
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
      return r === (o ? s ? $l : ks : s ? Hs : js).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const i = V(t);
    if (!o) {
      let c;
      if (i && (c = Pl[n]))
        return c;
      if (n === "hasOwnProperty")
        return Il;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ be(t) ? t : r
    );
    if ((Ue(n) ? Ts.has(n) : Ol(n)) || (o || we(t, "get", n), s))
      return l;
    if (/* @__PURE__ */ be(l)) {
      const c = i && qr(n) ? l : l.value;
      return o && ee(c) ? /* @__PURE__ */ Tr(c) : c;
    }
    return ee(l) ? o ? /* @__PURE__ */ Tr(l) : /* @__PURE__ */ qn(l) : l;
  }
}
class Fs extends Ds {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, o) {
    let s = t[n];
    const i = V(t) && qr(n);
    if (!this._isShallow) {
      const a = /* @__PURE__ */ et(s);
      if (!/* @__PURE__ */ Ae(r) && !/* @__PURE__ */ et(r) && (s = /* @__PURE__ */ J(s), r = /* @__PURE__ */ J(r)), !i && /* @__PURE__ */ be(s) && !/* @__PURE__ */ be(r))
        return a || (s.value = r), !0;
    }
    const l = i ? Number(n) < t.length : Z(t, n), c = Reflect.set(
      t,
      n,
      r,
      /* @__PURE__ */ be(t) ? t : o
    );
    return t === /* @__PURE__ */ J(o) && c && (l ? Ne(r, s) && Xe(t, "set", n, r) : Xe(t, "add", n, r)), c;
  }
  deleteProperty(t, n) {
    const r = Z(t, n);
    t[n];
    const o = Reflect.deleteProperty(t, n);
    return o && r && Xe(t, "delete", n, void 0), o;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!Ue(n) || !Ts.has(n)) && we(t, "has", n), r;
  }
  ownKeys(t) {
    return we(
      t,
      "iterate",
      V(t) ? "length" : _t
    ), Reflect.ownKeys(t);
  }
}
class Al extends Ds {
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
const Tl = /* @__PURE__ */ new Fs(), Dl = /* @__PURE__ */ new Al(), Fl = /* @__PURE__ */ new Fs(!0);
const Ar = (e) => e, bn = (e) => Reflect.getPrototypeOf(e);
function jl(e, t, n) {
  return function(...r) {
    const o = this.__v_raw, s = /* @__PURE__ */ J(o), i = at(s), l = e === "entries" || e === Symbol.iterator && i, c = e === "keys" && i, a = o[e](...r), u = n ? Ar : t ? Kt : je;
    return !t && we(
      s,
      "iterate",
      c ? Ir : _t
    ), _e(
      // inheriting all iterator properties
      Object.create(a),
      {
        // iterator protocol
        next() {
          const { value: d, done: y } = a.next();
          return y ? { value: d, done: y } : {
            value: l ? [u(d[0]), u(d[1])] : u(d),
            done: y
          };
        }
      }
    );
  };
}
function _n(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Hl(e, t) {
  const n = {
    get(o) {
      const s = this.__v_raw, i = /* @__PURE__ */ J(s), l = /* @__PURE__ */ J(o);
      e || (Ne(o, l) && we(i, "get", o), we(i, "get", l));
      const { has: c } = bn(i), a = t ? Ar : e ? Kt : je;
      if (c.call(i, o))
        return a(s.get(o));
      if (c.call(i, l))
        return a(s.get(l));
      s !== i && s.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && we(/* @__PURE__ */ J(o), "iterate", _t), o.size;
    },
    has(o) {
      const s = this.__v_raw, i = /* @__PURE__ */ J(s), l = /* @__PURE__ */ J(o);
      return e || (Ne(o, l) && we(i, "has", o), we(i, "has", l)), o === l ? s.has(o) : s.has(o) || s.has(l);
    },
    forEach(o, s) {
      const i = this, l = i.__v_raw, c = /* @__PURE__ */ J(l), a = t ? Ar : e ? Kt : je;
      return !e && we(c, "iterate", _t), l.forEach((u, d) => o.call(s, a(u), a(d), i));
    }
  };
  return _e(
    n,
    e ? {
      add: _n("add"),
      set: _n("set"),
      delete: _n("delete"),
      clear: _n("clear")
    } : {
      add(o) {
        const s = /* @__PURE__ */ J(this), i = bn(s), l = /* @__PURE__ */ J(o), c = !t && !/* @__PURE__ */ Ae(o) && !/* @__PURE__ */ et(o) ? l : o;
        return i.has.call(s, c) || Ne(o, c) && i.has.call(s, o) || Ne(l, c) && i.has.call(s, l) || (s.add(c), Xe(s, "add", c, c)), this;
      },
      set(o, s) {
        !t && !/* @__PURE__ */ Ae(s) && !/* @__PURE__ */ et(s) && (s = /* @__PURE__ */ J(s));
        const i = /* @__PURE__ */ J(this), { has: l, get: c } = bn(i);
        let a = l.call(i, o);
        a || (o = /* @__PURE__ */ J(o), a = l.call(i, o));
        const u = c.call(i, o);
        return i.set(o, s), a ? Ne(s, u) && Xe(i, "set", o, s) : Xe(i, "add", o, s), this;
      },
      delete(o) {
        const s = /* @__PURE__ */ J(this), { has: i, get: l } = bn(s);
        let c = i.call(s, o);
        c || (o = /* @__PURE__ */ J(o), c = i.call(s, o)), l && l.call(s, o);
        const a = s.delete(o);
        return c && Xe(s, "delete", o, void 0), a;
      },
      clear() {
        const o = /* @__PURE__ */ J(this), s = o.size !== 0, i = o.clear();
        return s && Xe(
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
    n[o] = jl(o, e, t);
  }), n;
}
function Zr(e, t) {
  const n = Hl(e, t);
  return (r, o, s) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(
    Z(n, o) && o in r ? n : r,
    o,
    s
  );
}
const kl = {
  get: /* @__PURE__ */ Zr(!1, !1)
}, Ll = {
  get: /* @__PURE__ */ Zr(!1, !0)
}, Kl = {
  get: /* @__PURE__ */ Zr(!0, !1)
};
const js = /* @__PURE__ */ new WeakMap(), Hs = /* @__PURE__ */ new WeakMap(), ks = /* @__PURE__ */ new WeakMap(), $l = /* @__PURE__ */ new WeakMap();
function Vl(e) {
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
function qn(e) {
  return /* @__PURE__ */ et(e) ? e : Qr(
    e,
    !1,
    Tl,
    kl,
    js
  );
}
// @__NO_SIDE_EFFECTS__
function Nl(e) {
  return Qr(
    e,
    !1,
    Fl,
    Ll,
    Hs
  );
}
// @__NO_SIDE_EFFECTS__
function Tr(e) {
  return Qr(
    e,
    !0,
    Dl,
    Kl,
    ks
  );
}
function Qr(e, t, n, r, o) {
  if (!ee(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const s = o.get(e);
  if (s)
    return s;
  const i = Vl(dl(e));
  if (i === 0)
    return e;
  const l = new Proxy(
    e,
    i === 2 ? r : n
  );
  return o.set(e, l), l;
}
// @__NO_SIDE_EFFECTS__
function St(e) {
  return /* @__PURE__ */ et(e) ? /* @__PURE__ */ St(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function et(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Ae(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function eo(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function J(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ J(t) : e;
}
function Bl(e) {
  return !Z(e, "__v_skip") && Object.isExtensible(e) && ws(e, "__v_skip", !0), e;
}
const je = (e) => ee(e) ? /* @__PURE__ */ qn(e) : e, Kt = (e) => ee(e) ? /* @__PURE__ */ Tr(e) : e;
// @__NO_SIDE_EFFECTS__
function be(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function ht(e) {
  return Ls(e, !1);
}
// @__NO_SIDE_EFFECTS__
function Wl(e) {
  return Ls(e, !0);
}
function Ls(e, t) {
  return /* @__PURE__ */ be(e) ? e : new Ul(e, t);
}
class Ul {
  constructor(t, n) {
    this.dep = new Jr(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ J(t), this._value = n ? t : je(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, r = this.__v_isShallow || /* @__PURE__ */ Ae(t) || /* @__PURE__ */ et(t);
    t = r ? t : /* @__PURE__ */ J(t), Ne(t, n) && (this._rawValue = t, this._value = r ? t : je(t), this.dep.trigger());
  }
}
function Ht(e) {
  return /* @__PURE__ */ be(e) ? e.value : e;
}
const Gl = {
  get: (e, t, n) => t === "__v_raw" ? e : Ht(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return /* @__PURE__ */ be(o) && !/* @__PURE__ */ be(n) ? (o.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function Ks(e) {
  return /* @__PURE__ */ St(e) ? e : new Proxy(e, Gl);
}
class ql {
  constructor(t, n, r) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Jr(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = on - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    se !== this)
      return Ms(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Os(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function zl(e, t, n = !1) {
  let r, o;
  return W(e) ? r = e : (r = e.get, o = e.set), new ql(r, o, n);
}
const Sn = {}, An = /* @__PURE__ */ new WeakMap();
let vt;
function Yl(e, t = !1, n = vt) {
  if (n) {
    let r = An.get(n);
    r || An.set(n, r = []), r.push(e);
  }
}
function Xl(e, t, n = ie) {
  const { immediate: r, deep: o, once: s, scheduler: i, augmentJob: l, call: c } = n, a = (I) => o ? I : /* @__PURE__ */ Ae(I) || o === !1 || o === 0 ? ct(I, 1) : ct(I);
  let u, d, y, v, R = !1, C = !1;
  if (/* @__PURE__ */ be(e) ? (d = () => e.value, R = /* @__PURE__ */ Ae(e)) : /* @__PURE__ */ St(e) ? (d = () => a(e), R = !0) : V(e) ? (C = !0, R = e.some((I) => /* @__PURE__ */ St(I) || /* @__PURE__ */ Ae(I)), d = () => e.map((I) => {
    if (/* @__PURE__ */ be(I))
      return I.value;
    if (/* @__PURE__ */ St(I))
      return a(I);
    if (W(I))
      return c ? c(I, 2) : I();
  })) : W(e) ? t ? d = c ? () => c(e, 2) : e : d = () => {
    if (y) {
      Ze();
      try {
        y();
      } finally {
        Qe();
      }
    }
    const I = vt;
    vt = u;
    try {
      return c ? c(e, 3, [v]) : e(v);
    } finally {
      vt = I;
    }
  } : d = We, t && o) {
    const I = d, N = o === !0 ? 1 / 0 : o;
    d = () => ct(I(), N);
  }
  const k = xs(), j = () => {
    u.stop(), k && k.active && Gr(k.effects, u);
  };
  if (s && t) {
    const I = t;
    t = (...N) => {
      const B = I(...N);
      return j(), B;
    };
  }
  let M = C ? new Array(e.length).fill(Sn) : Sn;
  const L = (I) => {
    if (!(!(u.flags & 1) || !u.dirty && !I))
      if (t) {
        const N = u.run();
        if (I || o || R || (C ? N.some((B, le) => Ne(B, M[le])) : Ne(N, M))) {
          y && y();
          const B = vt;
          vt = u;
          try {
            const le = [
              N,
              // pass undefined as the old value when it's changed for the first time
              M === Sn ? void 0 : C && M[0] === Sn ? [] : M,
              v
            ];
            M = N, c ? c(t, 3, le) : (
              // @ts-expect-error
              t(...le)
            );
          } finally {
            vt = B;
          }
        }
      } else
        u.run();
  };
  return l && l(L), u = new Rs(d), u.scheduler = i ? () => i(L, !1) : L, v = (I) => Yl(I, !1, u), y = u.onStop = () => {
    const I = An.get(u);
    if (I) {
      if (c)
        c(I, 4);
      else
        for (const N of I) N();
      An.delete(u);
    }
  }, t ? r ? L(!0) : M = u.run() : i ? i(L.bind(null, !0), !0) : u.run(), j.pause = u.pause.bind(u), j.resume = u.resume.bind(u), j.stop = j, j;
}
function ct(e, t = 1 / 0, n) {
  if (t <= 0 || !ee(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ be(e))
    ct(e.value, t, n);
  else if (V(e))
    for (let r = 0; r < e.length; r++)
      ct(e[r], t, n);
  else if (In(e) || at(e))
    e.forEach((r) => {
      ct(r, t, n);
    });
  else if (ys(e)) {
    for (const r in e)
      ct(e[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, r) && ct(e[r], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function gn(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (o) {
    zn(o, t, n);
  }
}
function He(e, t, n, r) {
  if (W(e)) {
    const o = gn(e, t, n, r);
    return o && hs(o) && o.catch((s) => {
      zn(s, t, n);
    }), o;
  }
  if (V(e)) {
    const o = [];
    for (let s = 0; s < e.length; s++)
      o.push(He(e[s], t, n, r));
    return o;
  }
}
function zn(e, t, n, r = !0) {
  const o = t ? t.vnode : null, { errorHandler: s, throwUnhandledErrorInProduction: i } = t && t.appContext.config || ie;
  if (t) {
    let l = t.parent;
    const c = t.proxy, a = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const u = l.ec;
      if (u) {
        for (let d = 0; d < u.length; d++)
          if (u[d](e, c, a) === !1)
            return;
      }
      l = l.parent;
    }
    if (s) {
      Ze(), gn(s, null, 10, [
        e,
        c,
        a
      ]), Qe();
      return;
    }
  }
  Jl(e, n, o, r, i);
}
function Jl(e, t, n, r = !0, o = !1) {
  if (o)
    throw e;
  console.error(e);
}
const xe = [];
let Ke = -1;
const kt = [];
let lt = null, Tt = 0;
const $s = /* @__PURE__ */ Promise.resolve();
let Tn = null;
function Vs(e) {
  const t = Tn || $s;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Zl(e) {
  let t = Ke + 1, n = xe.length;
  for (; t < n; ) {
    const r = t + n >>> 1, o = xe[r], s = ln(o);
    s < e || s === e && o.flags & 2 ? t = r + 1 : n = r;
  }
  return t;
}
function to(e) {
  if (!(e.flags & 1)) {
    const t = ln(e), n = xe[xe.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= ln(n) ? xe.push(e) : xe.splice(Zl(t), 0, e), e.flags |= 1, Ns();
  }
}
function Ns() {
  Tn || (Tn = $s.then(Ws));
}
function Ql(e) {
  if (!V(e))
    lt && e.id === -1 ? lt.splice(Tt + 1, 0, e) : e.flags & 1 || (kt.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      kt.push(e[t]);
  Ns();
}
function bo(e, t, n = Ke + 1) {
  for (; n < xe.length; n++) {
    const r = xe[n];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid)
        continue;
      xe.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function Bs(e) {
  if (kt.length) {
    const t = [...new Set(kt)].sort(
      (n, r) => ln(n) - ln(r)
    );
    if (kt.length = 0, lt) {
      for (let n = 0; n < t.length; n++)
        lt.push(t[n]);
      return;
    }
    for (lt = t, Tt = 0; Tt < lt.length; Tt++) {
      const n = lt[Tt];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    lt = null, Tt = 0;
  }
}
const ln = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Ws(e) {
  try {
    for (Ke = 0; Ke < xe.length; Ke++) {
      const t = xe[Ke];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), gn(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Ke < xe.length; Ke++) {
      const t = xe[Ke];
      t && (t.flags &= -2);
    }
    Ke = -1, xe.length = 0, Bs(), Tn = null, (xe.length || kt.length) && Ws();
  }
}
let Be = null, Us = null;
function Dn(e) {
  const t = Be;
  return Be = e, Us = e && e.type.__scopeId || null, t;
}
function ec(e, t = Be, n) {
  if (!t || e._n)
    return e;
  const r = (...o) => {
    r._d && Ao(-1);
    const s = Dn(t), i = xt.length;
    let l;
    try {
      l = e(...o);
    } finally {
      for (let c = xt.length; c > i; c--) yi();
      Dn(s), r._d && Ao(1);
    }
    return l;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function mt(e, t, n, r) {
  const o = e.dirs, s = t && t.dirs;
  for (let i = 0; i < o.length; i++) {
    const l = o[i];
    s && (l.oldValue = s[i].value);
    let c = l.dir[r];
    c && (Ze(), He(c, n, 8, [
      e.el,
      l,
      e,
      t
    ]), Qe());
  }
}
function tc(e, t) {
  if (Re) {
    let n = Re.provides;
    const r = Re.parent && Re.parent.provides;
    r === n && (n = Re.provides = Object.create(r)), n[e] = t;
  }
}
function Mn(e, t, n = !1) {
  const r = Zc();
  if (r || Lt) {
    let o = Lt ? Lt._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && W(t) ? t.call(r && r.proxy) : t;
  }
}
const nc = /* @__PURE__ */ Symbol.for("v-scx"), rc = () => Mn(nc);
function Pe(e, t, n) {
  return Gs(e, t, n);
}
function Gs(e, t, n = ie) {
  const { immediate: r, deep: o, flush: s, once: i } = n, l = _e({}, n), c = t && r || !t && s !== "post";
  let a;
  if (un) {
    if (s === "sync") {
      const v = rc();
      a = v.__watcherHandles || (v.__watcherHandles = []);
    } else if (!c) {
      const v = () => {
      };
      return v.stop = We, v.resume = We, v.pause = We, v;
    }
  }
  const u = Re;
  l.call = (v, R, C) => He(v, u, R, C);
  let d = !1;
  s === "post" ? l.scheduler = (v) => {
    Me(v, u && u.suspense);
  } : s !== "sync" && (d = !0, l.scheduler = (v, R) => {
    R ? v() : to(v);
  }), l.augmentJob = (v) => {
    t && (v.flags |= 4), d && (v.flags |= 2, u && (v.id = u.uid, v.i = u));
  };
  const y = Xl(e, t, l);
  return un && (a ? a.push(y) : c && y()), y;
}
function oc(e, t, n) {
  const r = this.proxy, o = ue(e) ? e.includes(".") ? qs(r, e) : () => r[e] : e.bind(r, r);
  let s;
  W(t) ? s = t : (s = t.handler, n = t);
  const i = hn(this), l = Gs(o, s.bind(r), n);
  return i(), l;
}
function qs(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++)
      r = r[n[o]];
    return r;
  };
}
const sc = /* @__PURE__ */ Symbol("_vte"), Yn = (e) => e.__isTeleport, gr = /* @__PURE__ */ Symbol("_leaveCb");
function ic(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== tt) {
        t = n;
        break;
      }
  }
  return t;
}
function zs(e) {
  if (!ro(e))
    return Yn(e.type) && e.children ? ic(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16)
      return n[0];
    if (t & 32 && W(n.default))
      return n.default();
  }
}
function no(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    no(
      Yn(n.type) && zs(n) || n,
      t
    );
  } else e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Ys(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function _o(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const Fn = /* @__PURE__ */ new WeakMap();
function en(e, t, n, r, o = !1) {
  if (V(e)) {
    e.forEach(
      (C, k) => en(
        C,
        t && (V(t) ? t[k] : t),
        n,
        r,
        o
      )
    );
    return;
  }
  if (tn(r) && !o) {
    r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && en(e, t, n, r.component.subTree);
    return;
  }
  const s = r.shapeFlag & 4 ? io(r.component) : r.el, i = o ? null : s, { i: l, r: c } = e, a = t && t.r, u = l.refs === ie ? l.refs = {} : l.refs, d = l.setupState, y = /* @__PURE__ */ J(d), v = d === ie ? gs : (C) => _o(u, C) ? !1 : Z(y, C), R = (C, k) => !(k && _o(u, k));
  if (a != null && a !== c) {
    if (So(t), ue(a))
      u[a] = null, v(a) && (d[a] = null);
    else if (/* @__PURE__ */ be(a)) {
      const C = t;
      R(a, C.k) && (a.value = null), C.k && (u[C.k] = null);
    }
  }
  if (W(c))
    gn(c, l, 12, [i, u]);
  else {
    const C = ue(c), k = /* @__PURE__ */ be(c);
    if (C || k) {
      const j = () => {
        if (e.f) {
          const M = C ? v(c) ? d[c] : u[c] : R() || !e.k ? c.value : u[e.k];
          if (o)
            V(M) && Gr(M, s);
          else if (V(M))
            M.includes(s) || M.push(s);
          else if (C)
            u[c] = [s], v(c) && (d[c] = u[c]);
          else {
            const L = [s];
            R(c, e.k) && (c.value = L), e.k && (u[e.k] = L);
          }
        } else C ? (u[c] = i, v(c) && (d[c] = i)) : k && (R(c, e.k) && (c.value = i), e.k && (u[e.k] = i));
      };
      if (i) {
        const M = () => {
          j(), Fn.delete(e);
        };
        M.id = -1, Fn.set(e, M), Me(M, n);
      } else
        So(e), j();
    }
  }
}
function So(e) {
  const t = Fn.get(e);
  t && (t.flags |= 8, Fn.delete(e));
}
Wn().requestIdleCallback;
Wn().cancelIdleCallback;
const tn = (e) => !!e.type.__asyncLoader, ro = (e) => e.type.__isKeepAlive;
function lc(e, t) {
  Xs(e, "a", t);
}
function cc(e, t) {
  Xs(e, "da", t);
}
function Xs(e, t, n = Re) {
  const r = e.__wdc || (e.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (Xn(t, r, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      ro(o.parent.vnode) && ac(r, t, n, o), o = o.parent;
  }
}
function ac(e, t, n, r) {
  const o = Xn(
    t,
    e,
    r,
    !0
    /* prepend */
  );
  Qs(() => {
    Gr(r[t], o);
  }, n);
}
function Xn(e, t, n = Re, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), s = t.__weh || (t.__weh = (...i) => {
      Ze();
      const l = hn(n), c = He(t, n, e, i);
      return l(), Qe(), c;
    });
    return r ? o.unshift(s) : o.push(s), s;
  }
}
const rt = (e) => (t, n = Re) => {
  (!un || e === "sp") && Xn(e, (...r) => t(...r), n);
}, uc = rt("bm"), Js = rt("m"), fc = rt(
  "bu"
), dc = rt("u"), Zs = rt(
  "bum"
), Qs = rt("um"), pc = rt(
  "sp"
), gc = rt("rtg"), hc = rt("rtc");
function mc(e, t = Re) {
  Xn("ec", e, t);
}
const yc = /* @__PURE__ */ Symbol.for("v-ndc");
function hr(e, t, n, r) {
  let o;
  const s = n, i = V(e);
  if (i || ue(e)) {
    const l = i && /* @__PURE__ */ St(e);
    let c = !1, a = !1;
    l && (c = !/* @__PURE__ */ Ae(e), a = /* @__PURE__ */ et(e), e = Gn(e)), o = new Array(e.length);
    for (let u = 0, d = e.length; u < d; u++)
      o[u] = t(
        c ? a ? Kt(je(e[u])) : je(e[u]) : e[u],
        u,
        void 0,
        s
      );
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let l = 0; l < e; l++)
      o[l] = t(l + 1, l, void 0, s);
  } else if (ee(e))
    if (e[Symbol.iterator])
      o = Array.from(
        e,
        (l, c) => t(l, c, void 0, s)
      );
    else {
      const l = Object.keys(e);
      o = new Array(l.length);
      for (let c = 0, a = l.length; c < a; c++) {
        const u = l[c];
        o[c] = t(e[u], u, c, s);
      }
    }
  else
    o = [];
  return o;
}
const Dr = (e) => e ? _i(e) ? io(e) : Dr(e.parent) : null, nn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ _e(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Dr(e.parent),
    $root: (e) => Dr(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => ti(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      to(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Vs.bind(e.proxy)),
    $watch: (e) => oc.bind(e)
  })
), mr = (e, t) => e !== ie && !e.__isScriptSetup && Z(e, t), vc = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: r, data: o, props: s, accessCache: i, type: l, appContext: c } = e;
    if (t[0] !== "$") {
      const y = i[t];
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
        if (mr(r, t))
          return i[t] = 1, r[t];
        if (o !== ie && Z(o, t))
          return i[t] = 2, o[t];
        if (Z(s, t))
          return i[t] = 3, s[t];
        if (n !== ie && Z(n, t))
          return i[t] = 4, n[t];
        Fr && (i[t] = 0);
      }
    }
    const a = nn[t];
    let u, d;
    if (a)
      return t === "$attrs" && we(e.attrs, "get", ""), a(e);
    if (
      // css module (injected by vue-loader)
      (u = l.__cssModules) && (u = u[t])
    )
      return u;
    if (n !== ie && Z(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      d = c.config.globalProperties, Z(d, t)
    )
      return d[t];
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: o, ctx: s } = e;
    return mr(o, t) ? (o[t] = n, !0) : r !== ie && Z(r, t) ? (r[t] = n, !0) : Z(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (s[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: o, props: s, type: i }
  }, l) {
    let c;
    return !!(n[l] || e !== ie && l[0] !== "$" && Z(e, l) || mr(t, l) || Z(s, l) || Z(r, l) || Z(nn, l) || Z(o.config.globalProperties, l) || (c = i.__cssModules) && c[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : Z(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function xo(e) {
  return V(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let Fr = !0;
function wc(e) {
  const t = ti(e), n = e.proxy, r = e.ctx;
  Fr = !1, t.beforeCreate && Ro(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: s,
    methods: i,
    watch: l,
    provide: c,
    inject: a,
    // lifecycle
    created: u,
    beforeMount: d,
    mounted: y,
    beforeUpdate: v,
    updated: R,
    activated: C,
    deactivated: k,
    beforeDestroy: j,
    beforeUnmount: M,
    destroyed: L,
    unmounted: I,
    render: N,
    renderTracked: B,
    renderTriggered: le,
    errorCaptured: $,
    serverPrefetch: F,
    // public API
    expose: U,
    inheritAttrs: te,
    // assets
    components: oe,
    directives: fe,
    filters: de
  } = t;
  if (a && bc(a, r, null), i)
    for (const Y in i) {
      const z = i[Y];
      W(z) && (r[Y] = z.bind(n));
    }
  if (o) {
    const Y = o.call(n, n);
    ee(Y) && (e.data = /* @__PURE__ */ qn(Y));
  }
  if (Fr = !0, s)
    for (const Y in s) {
      const z = s[Y], Te = W(z) ? z.bind(n, n) : W(z.get) ? z.get.bind(n, n) : We, ft = !W(z) && W(z.set) ? z.set.bind(n) : We, Ge = ge({
        get: Te,
        set: ft
      });
      Object.defineProperty(r, Y, {
        enumerable: !0,
        configurable: !0,
        get: () => Ge.value,
        set: (Ie) => Ge.value = Ie
      });
    }
  if (l)
    for (const Y in l)
      ei(l[Y], r, n, Y);
  if (c) {
    const Y = W(c) ? c.call(n) : c;
    Reflect.ownKeys(Y).forEach((z) => {
      tc(z, Y[z]);
    });
  }
  u && Ro(u, e, "c");
  function ne(Y, z) {
    V(z) ? z.forEach((Te) => Y(Te.bind(n))) : z && Y(z.bind(n));
  }
  if (ne(uc, d), ne(Js, y), ne(fc, v), ne(dc, R), ne(lc, C), ne(cc, k), ne(mc, $), ne(hc, B), ne(gc, le), ne(Zs, M), ne(Qs, I), ne(pc, F), V(U))
    if (U.length) {
      const Y = e.exposed || (e.exposed = {});
      U.forEach((z) => {
        Object.defineProperty(Y, z, {
          get: () => n[z],
          set: (Te) => n[z] = Te,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  N && e.render === We && (e.render = N), te != null && (e.inheritAttrs = te), oe && (e.components = oe), fe && (e.directives = fe), F && Ys(e);
}
function bc(e, t, n = We) {
  V(e) && (e = jr(e));
  for (const r in e) {
    const o = e[r];
    let s;
    ee(o) ? "default" in o ? s = Mn(
      o.from || r,
      o.default,
      !0
    ) : s = Mn(o.from || r) : s = Mn(o), /* @__PURE__ */ be(s) ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (i) => s.value = i
    }) : t[r] = s;
  }
}
function Ro(e, t, n) {
  He(
    V(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function ei(e, t, n, r) {
  let o = r.includes(".") ? qs(n, r) : () => n[r];
  if (ue(e)) {
    const s = t[e];
    W(s) && Pe(o, s);
  } else if (W(e))
    Pe(o, e.bind(n));
  else if (ee(e))
    if (V(e))
      e.forEach((s) => ei(s, t, n, r));
    else {
      const s = W(e.handler) ? e.handler.bind(n) : t[e.handler];
      W(s) && Pe(o, s, e);
    }
}
function ti(e) {
  const t = e.type, { mixins: n, extends: r } = t, {
    mixins: o,
    optionsCache: s,
    config: { optionMergeStrategies: i }
  } = e.appContext, l = s.get(t);
  let c;
  return l ? c = l : !o.length && !n && !r ? c = t : (c = {}, o.length && o.forEach(
    (a) => jn(c, a, i, !0)
  ), jn(c, t, i)), ee(t) && s.set(t, c), c;
}
function jn(e, t, n, r = !1) {
  const { mixins: o, extends: s } = t;
  s && jn(e, s, n, !0), o && o.forEach(
    (i) => jn(e, i, n, !0)
  );
  for (const i in t)
    if (!(r && i === "expose")) {
      const l = _c[i] || n && n[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const _c = {
  data: Co,
  props: Mo,
  emits: Mo,
  // objects
  methods: Yt,
  computed: Yt,
  // lifecycle
  beforeCreate: Se,
  created: Se,
  beforeMount: Se,
  mounted: Se,
  beforeUpdate: Se,
  updated: Se,
  beforeDestroy: Se,
  beforeUnmount: Se,
  destroyed: Se,
  unmounted: Se,
  activated: Se,
  deactivated: Se,
  errorCaptured: Se,
  serverPrefetch: Se,
  // assets
  components: Yt,
  directives: Yt,
  // watch
  watch: xc,
  // provide / inject
  provide: Co,
  inject: Sc
};
function Co(e, t) {
  return t ? e ? function() {
    return _e(
      W(e) ? e.call(this, this) : e,
      W(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Sc(e, t) {
  return Yt(jr(e), jr(t));
}
function jr(e) {
  if (V(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Se(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Yt(e, t) {
  return e ? _e(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Mo(e, t) {
  return e ? V(e) && V(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : _e(
    /* @__PURE__ */ Object.create(null),
    xo(e),
    xo(t ?? {})
  ) : t;
}
function xc(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = _e(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = Se(e[r], t[r]);
  return n;
}
function ni() {
  return {
    app: null,
    config: {
      isNativeTag: gs,
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
let Rc = 0;
function Cc(e, t) {
  return function(r, o = null) {
    W(r) || (r = _e({}, r)), o != null && !ee(o) && (o = null);
    const s = ni(), i = /* @__PURE__ */ new WeakSet(), l = [];
    let c = !1;
    const a = s.app = {
      _uid: Rc++,
      _component: r,
      _props: o,
      _container: null,
      _context: s,
      _instance: null,
      version: oa,
      get config() {
        return s.config;
      },
      set config(u) {
      },
      use(u, ...d) {
        return i.has(u) || (u && W(u.install) ? (i.add(u), u.install(a, ...d)) : W(u) && (i.add(u), u(a, ...d))), a;
      },
      mixin(u) {
        return s.mixins.includes(u) || s.mixins.push(u), a;
      },
      component(u, d) {
        return d ? (s.components[u] = d, a) : s.components[u];
      },
      directive(u, d) {
        return d ? (s.directives[u] = d, a) : s.directives[u];
      },
      mount(u, d, y) {
        if (!c) {
          const v = a._ceVNode || Je(r, o);
          return v.appContext = s, y === !0 ? y = "svg" : y === !1 && (y = void 0), e(v, u, y), c = !0, a._container = u, u.__vue_app__ = a, io(v.component);
        }
      },
      onUnmount(u) {
        l.push(u);
      },
      unmount() {
        c && (He(
          l,
          a._instance,
          16
        ), e(null, a._container), delete a._container.__vue_app__);
      },
      provide(u, d) {
        return s.provides[u] = d, a;
      },
      runWithContext(u) {
        const d = Lt;
        Lt = a;
        try {
          return u();
        } finally {
          Lt = d;
        }
      }
    };
    return a;
  };
}
let Lt = null;
const Mc = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${De(t)}Modifiers`] || e[`${Et(t)}Modifiers`];
function Pc(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || ie;
  let o = n;
  const s = t.startsWith("update:"), i = s && Mc(r, t.slice(7));
  i && (i.trim && (o = n.map((u) => ue(u) ? u.trim() : u)), i.number && (o = o.map(hl)));
  let l, c = r[l = cr(t)] || // also try camelCase event handler (#2249)
  r[l = cr(De(t))];
  !c && s && (c = r[l = cr(Et(t))]), c && He(
    c,
    e,
    6,
    o
  );
  const a = r[l + "Once"];
  if (a) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, He(
      a,
      e,
      6,
      o
    );
  }
}
const Ec = /* @__PURE__ */ new WeakMap();
function ri(e, t, n = !1) {
  const r = n ? Ec : t.emitsCache, o = r.get(e);
  if (o !== void 0)
    return o;
  const s = e.emits;
  let i = {}, l = !1;
  if (!W(e)) {
    const c = (a) => {
      const u = ri(a, t, !0);
      u && (l = !0, _e(i, u));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !s && !l ? (ee(e) && r.set(e, null), null) : (V(s) ? s.forEach((c) => i[c] = null) : _e(i, s), ee(e) && r.set(e, i), i);
}
function Jn(e, t) {
  return !e || !Vn(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), Z(e, t[0].toLowerCase() + t.slice(1)) || Z(e, Et(t)) || Z(e, t));
}
function Po(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: o,
    propsOptions: [s],
    slots: i,
    attrs: l,
    emit: c,
    render: a,
    renderCache: u,
    props: d,
    data: y,
    setupState: v,
    ctx: R,
    inheritAttrs: C
  } = e, k = Dn(e);
  let j, M;
  try {
    if (n.shapeFlag & 4) {
      const I = o || r, N = I;
      j = Ve(
        a.call(
          N,
          I,
          u,
          d,
          v,
          y,
          R
        )
      ), M = l;
    } else {
      const I = t;
      j = Ve(
        I.length > 1 ? I(
          d,
          { attrs: l, slots: i, emit: c }
        ) : I(
          d,
          null
        )
      ), M = t.props ? l : Oc(l);
    }
  } catch (I) {
    xt.length = 0, zn(I, e, 1), j = Je(tt);
  }
  let L = j;
  if (M && C !== !1) {
    const I = Object.keys(M), { shapeFlag: N } = L;
    I.length && N & 7 && (s && I.some(Nn) && (M = Ic(
      M,
      s
    )), L = $t(L, M, !1, !0));
  }
  if (n.dirs && (L = $t(L, null, !1, !0), L.dirs = L.dirs ? L.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const I = Yn(L.type) && zs(L) || L;
    no(I, n.transition);
  }
  return j = L, Dn(k), j;
}
const Oc = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Vn(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Ic = (e, t) => {
  const n = {};
  for (const r in e)
    (!Nn(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
  return n;
};
function Ac(e, t, n) {
  const { props: r, children: o, component: s } = e, { props: i, children: l, patchFlag: c } = t, a = s.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return r ? Eo(r, i, a) : !!i;
    if (c & 8) {
      const u = t.dynamicProps;
      for (let d = 0; d < u.length; d++) {
        const y = u[d];
        if (oi(i, r, y) && !Jn(a, y))
          return !0;
      }
    }
  } else
    return (o || l) && (!l || !l.$stable) ? !0 : r === i ? !1 : r ? i ? Eo(r, i, a) : !0 : !!i;
  return !1;
}
function Eo(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < r.length; o++) {
    const s = r[o];
    if (oi(t, e, s) && !Jn(n, s))
      return !0;
  }
  return !1;
}
function oi(e, t, n) {
  const r = e[n], o = t[n];
  return n === "style" && ee(r) && ee(o) ? !Un(r, o) : r !== o;
}
function Tc({ vnode: e, parent: t, suspense: n }, r) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.suspense.vnode.el = o.el = r, e = o), o === e)
      (e = t.vnode).el = r, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = r);
}
const si = {}, ii = () => Object.create(si), li = (e) => Object.getPrototypeOf(e) === si;
function Dc(e, t, n, r = !1) {
  const o = {}, s = ii();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), ci(e, t, o, s);
  for (const i in e.propsOptions[0])
    i in o || (o[i] = void 0);
  n ? e.props = r ? o : /* @__PURE__ */ Nl(o) : e.type.props ? e.props = o : e.props = s, e.attrs = s;
}
function Fc(e, t, n, r) {
  const {
    props: o,
    attrs: s,
    vnode: { patchFlag: i }
  } = e, l = /* @__PURE__ */ J(o), [c] = e.propsOptions;
  let a = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (r || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const u = e.vnode.dynamicProps;
      for (let d = 0; d < u.length; d++) {
        let y = u[d];
        if (Jn(e.emitsOptions, y))
          continue;
        const v = t[y];
        if (c)
          if (Z(s, y))
            v !== s[y] && (s[y] = v, a = !0);
          else {
            const R = De(y);
            o[R] = Hr(
              c,
              l,
              R,
              v,
              e,
              !1
            );
          }
        else
          v !== s[y] && (s[y] = v, a = !0);
      }
    }
  } else {
    ci(e, t, o, s) && (a = !0);
    let u;
    for (const d in l)
      (!t || // for camelCase
      !Z(t, d) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((u = Et(d)) === d || !Z(t, u))) && (c ? n && // for camelCase
      (n[d] !== void 0 || // for kebab-case
      n[u] !== void 0) && (o[d] = Hr(
        c,
        l,
        d,
        void 0,
        e,
        !0
      )) : delete o[d]);
    if (s !== l)
      for (const d in s)
        (!t || !Z(t, d)) && (delete s[d], a = !0);
  }
  a && Xe(e.attrs, "set", "");
}
function ci(e, t, n, r) {
  const [o, s] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let c in t) {
      if (Jt(c))
        continue;
      const a = t[c];
      let u;
      o && Z(o, u = De(c)) ? !s || !s.includes(u) ? n[u] = a : (l || (l = {}))[u] = a : Jn(e.emitsOptions, c) || (!(c in r) || a !== r[c]) && (r[c] = a, i = !0);
    }
  if (s) {
    const c = /* @__PURE__ */ J(n), a = l || ie;
    for (let u = 0; u < s.length; u++) {
      const d = s[u];
      n[d] = Hr(
        o,
        c,
        d,
        a[d],
        e,
        !Z(a, d)
      );
    }
  }
  return i;
}
function Hr(e, t, n, r, o, s) {
  const i = e[n];
  if (i != null) {
    const l = Z(i, "default");
    if (l && r === void 0) {
      const c = i.default;
      if (i.type !== Function && !i.skipFactory && W(c)) {
        const { propsDefaults: a } = o;
        if (n in a)
          r = a[n];
        else {
          const u = hn(o);
          r = a[n] = c.call(
            null,
            t
          ), u();
        }
      } else
        r = c;
      o.ce && o.ce._setProp(n, r);
    }
    i[
      0
      /* shouldCast */
    ] && (s && !l ? r = !1 : i[
      1
      /* shouldCastTrue */
    ] && (r === "" || r === Et(n)) && (r = !0));
  }
  return r;
}
const jc = /* @__PURE__ */ new WeakMap();
function ai(e, t, n = !1) {
  const r = n ? jc : t.propsCache, o = r.get(e);
  if (o)
    return o;
  const s = e.props, i = {}, l = [];
  let c = !1;
  if (!W(e)) {
    const u = (d) => {
      c = !0;
      const [y, v] = ai(d, t, !0);
      _e(i, y), v && l.push(...v);
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  if (!s && !c)
    return ee(e) && r.set(e, Ft), Ft;
  if (V(s))
    for (let u = 0; u < s.length; u++) {
      const d = De(s[u]);
      Oo(d) && (i[d] = ie);
    }
  else if (s)
    for (const u in s) {
      const d = De(u);
      if (Oo(d)) {
        const y = s[u], v = i[d] = V(y) || W(y) ? { type: y } : _e({}, y), R = v.type;
        let C = !1, k = !0;
        if (V(R))
          for (let j = 0; j < R.length; ++j) {
            const M = R[j], L = W(M) && M.name;
            if (L === "Boolean") {
              C = !0;
              break;
            } else L === "String" && (k = !1);
          }
        else
          C = W(R) && R.name === "Boolean";
        v[
          0
          /* shouldCast */
        ] = C, v[
          1
          /* shouldCastTrue */
        ] = k, (C || Z(v, "default")) && l.push(d);
      }
    }
  const a = [i, l];
  return ee(e) && r.set(e, a), a;
}
function Oo(e) {
  return e[0] !== "$" && !Jt(e);
}
const oo = (e) => e === "_" || e === "_ctx" || e === "$stable", so = (e) => V(e) ? e.map(Ve) : [Ve(e)], Hc = (e, t, n) => {
  if (t._n)
    return t;
  const r = ec((...o) => so(t(...o)), n);
  return r._c = !1, r;
}, ui = (e, t, n) => {
  const r = e._ctx;
  for (const o in e) {
    if (oo(o)) continue;
    const s = e[o];
    if (W(s))
      t[o] = Hc(o, s, r);
    else if (s != null) {
      const i = so(s);
      t[o] = () => i;
    }
  }
}, fi = (e, t) => {
  const n = so(t);
  e.slots.default = () => n;
}, di = (e, t, n) => {
  for (const r in t)
    (n || !oo(r)) && (e[r] = t[r]);
}, kc = (e, t, n) => {
  const r = e.slots = ii();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (di(r, t, n), n && ws(r, "_", o, !0)) : ui(t, r);
  } else t && fi(e, t);
}, Lc = (e, t, n) => {
  const { vnode: r, slots: o } = e;
  let s = !0, i = ie;
  if (r.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? s = !1 : di(o, t, n) : (s = !t.$stable, ui(t, o)), i = t;
  } else t && (fi(e, t), i = { default: 1 });
  if (s)
    for (const l in o)
      !oo(l) && i[l] == null && delete o[l];
}, Me = Bc;
function Kc(e) {
  return $c(e);
}
function $c(e, t) {
  const n = Wn();
  n.__VUE__ = !0;
  const {
    insert: r,
    remove: o,
    patchProp: s,
    createElement: i,
    createText: l,
    createComment: c,
    setText: a,
    setElementText: u,
    parentNode: d,
    nextSibling: y,
    setScopeId: v = We,
    insertStaticContent: R
  } = e, C = (f, p, m, x = null, b = null, _ = null, A = void 0, O = null, P = !!p.dynamicChildren) => {
    if (f === p)
      return;
    f && !Gt(f, p) && (x = ot(f), Ie(f, b, _, !0), f = null), p.patchFlag === -2 && (P = !1, p.dynamicChildren = null);
    const { type: S, ref: H, shapeFlag: T } = p;
    switch (S) {
      case Zn:
        k(f, p, m, x);
        break;
      case tt:
        j(f, p, m, x);
        break;
      case vr:
        f == null && M(p, m, x, A);
        break;
      case Ee:
        oe(
          f,
          p,
          m,
          x,
          b,
          _,
          A,
          O,
          P
        );
        break;
      default:
        T & 1 ? N(
          f,
          p,
          m,
          x,
          b,
          _,
          A,
          O,
          P
        ) : T & 6 ? fe(
          f,
          p,
          m,
          x,
          b,
          _,
          A,
          O,
          P
        ) : (T & 64 || T & 128) && S.process(
          f,
          p,
          m,
          x,
          b,
          _,
          A,
          O,
          P,
          st
        );
    }
    H != null && b ? en(H, f && f.ref, _, p || f, !p) : H == null && f && f.ref != null && en(f.ref, null, _, f, !0);
  }, k = (f, p, m, x) => {
    if (f == null)
      r(
        p.el = l(p.children),
        m,
        x
      );
    else {
      const b = p.el = f.el;
      p.children !== f.children && a(b, p.children);
    }
  }, j = (f, p, m, x) => {
    f == null ? r(
      p.el = c(p.children || ""),
      m,
      x
    ) : p.el = f.el;
  }, M = (f, p, m, x) => {
    [f.el, f.anchor] = R(
      f.children,
      p,
      m,
      x,
      f.el,
      f.anchor
    );
  }, L = ({ el: f, anchor: p }, m, x) => {
    let b;
    for (; f && f !== p; )
      b = y(f), r(f, m, x), f = b;
    r(p, m, x);
  }, I = ({ el: f, anchor: p }) => {
    let m;
    for (; f && f !== p; )
      m = y(f), o(f), f = m;
    o(p);
  }, N = (f, p, m, x, b, _, A, O, P) => {
    if (p.type === "svg" ? A = "svg" : p.type === "math" && (A = "mathml"), f == null)
      B(
        p,
        m,
        x,
        b,
        _,
        A,
        O,
        P
      );
    else {
      const S = f.el && f.el._isVueCE ? f.el : null;
      try {
        S && S._beginPatch(), F(
          f,
          p,
          b,
          _,
          A,
          O,
          P
        );
      } finally {
        S && S._endPatch();
      }
    }
  }, B = (f, p, m, x, b, _, A, O) => {
    let P, S;
    const { props: H, shapeFlag: T, transition: D, dirs: K } = f;
    if (P = f.el = i(
      f.type,
      _,
      H && H.is,
      H
    ), T & 8 ? u(P, f.children) : T & 16 && $(
      f.children,
      P,
      null,
      x,
      b,
      yr(f, _),
      A,
      O
    ), K && mt(f, null, x, "created"), le(P, f, f.scopeId, A, x), H) {
      for (const Q in H)
        Q !== "value" && !Jt(Q) && s(P, Q, null, H[Q], _, x);
      "value" in H && s(P, "value", null, H.value, _), (S = H.onVnodeBeforeMount) && Le(S, x, f);
    }
    K && mt(f, null, x, "beforeMount");
    const G = Vc(b, D);
    G && D.beforeEnter(P), r(P, p, m), ((S = H && H.onVnodeMounted) || G || K) && Me(() => {
      try {
        S && Le(S, x, f), G && D.enter(P), K && mt(f, null, x, "mounted");
      } finally {
      }
    }, b);
  }, le = (f, p, m, x, b) => {
    if (m && v(f, m), x)
      for (let _ = 0; _ < x.length; _++)
        v(f, x[_]);
    if (b) {
      let _ = b.subTree;
      if (p === _ || mi(_.type) && (_.ssContent === p || _.ssFallback === p)) {
        const A = b.vnode;
        le(
          f,
          A,
          A.scopeId,
          A.slotScopeIds,
          b.parent
        );
      }
    }
  }, $ = (f, p, m, x, b, _, A, O, P = 0) => {
    for (let S = P; S < f.length; S++) {
      const H = f[S] = O ? Ye(f[S]) : Ve(f[S]);
      C(
        null,
        H,
        p,
        m,
        x,
        b,
        _,
        A,
        O
      );
    }
  }, F = (f, p, m, x, b, _, A) => {
    const O = p.el = f.el;
    let { patchFlag: P, dynamicChildren: S, dirs: H } = p;
    P |= f.patchFlag & 16;
    const T = f.props || ie, D = p.props || ie;
    let K;
    if (m && yt(m, !1), (K = D.onVnodeBeforeUpdate) && Le(K, m, p, f), H && mt(p, f, m, "beforeUpdate"), m && yt(m, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    S && (!f.dynamicChildren || f.dynamicChildren.length !== S.length) && (P = 0, A = !1, S = null), (T.innerHTML && D.innerHTML == null || T.textContent && D.textContent == null) && u(O, ""), S ? U(
      f.dynamicChildren,
      S,
      O,
      m,
      x,
      yr(p, b),
      _
    ) : A || z(
      f,
      p,
      O,
      null,
      m,
      x,
      yr(p, b),
      _,
      !1
    ), P > 0) {
      if (P & 16)
        te(O, T, D, m, b);
      else if (P & 2 && T.class !== D.class && s(O, "class", null, D.class, b), P & 4 && s(O, "style", T.style, D.style, b), P & 8) {
        const G = p.dynamicProps;
        for (let Q = 0; Q < G.length; Q++) {
          const X = G[Q], ae = T[X], g = D[X];
          (g !== ae || X === "value") && s(O, X, ae, g, b, m);
        }
      }
      P & 1 && f.children !== p.children && u(O, p.children);
    } else !A && S == null && te(O, T, D, m, b);
    ((K = D.onVnodeUpdated) || H) && Me(() => {
      K && Le(K, m, p, f), H && mt(p, f, m, "updated");
    }, x);
  }, U = (f, p, m, x, b, _, A) => {
    for (let O = 0; O < p.length; O++) {
      const P = f[O], S = p[O], H = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        P.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (P.type === Ee || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Gt(P, S) || // - In the case of a component, it could contain anything.
        P.shapeFlag & 198) ? d(P.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          m
        )
      );
      C(
        P,
        S,
        H,
        null,
        x,
        b,
        _,
        A,
        !0
      );
    }
  }, te = (f, p, m, x, b) => {
    if (p !== m) {
      if (p !== ie)
        for (const _ in p)
          !Jt(_) && !(_ in m) && s(
            f,
            _,
            p[_],
            null,
            b,
            x
          );
      for (const _ in m) {
        if (Jt(_)) continue;
        const A = m[_], O = p[_];
        A !== O && _ !== "value" && s(f, _, O, A, b, x);
      }
      "value" in m && s(f, "value", p.value, m.value, b);
    }
  }, oe = (f, p, m, x, b, _, A, O, P) => {
    const S = p.el = f ? f.el : l(""), H = p.anchor = f ? f.anchor : l("");
    let { patchFlag: T, dynamicChildren: D, slotScopeIds: K } = p;
    K && (O = O ? O.concat(K) : K), f == null ? (r(S, m, x), r(H, m, x), $(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      p.children || [],
      m,
      H,
      b,
      _,
      A,
      O,
      P
    )) : T > 0 && T & 64 && D && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    f.dynamicChildren && f.dynamicChildren.length === D.length ? (U(
      f.dynamicChildren,
      D,
      m,
      b,
      _,
      A,
      O
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (p.key != null || b && p === b.subTree) && pi(
      f,
      p,
      !0
      /* shallow */
    )) : z(
      f,
      p,
      m,
      H,
      b,
      _,
      A,
      O,
      P
    );
  }, fe = (f, p, m, x, b, _, A, O, P) => {
    p.slotScopeIds = O, f == null ? p.shapeFlag & 512 ? b.ctx.activate(
      p,
      m,
      x,
      A,
      P
    ) : de(
      p,
      m,
      x,
      b,
      _,
      A,
      P
    ) : ye(f, p, P);
  }, de = (f, p, m, x, b, _, A) => {
    const O = f.component = Jc(
      f,
      x,
      b
    );
    if (ro(f) && (O.ctx.renderer = st), Qc(O, !1, A), O.asyncDep) {
      if (b && b.registerDep(O, ne, A), !f.el) {
        const P = O.subTree = Je(tt);
        j(null, P, p, m), f.placeholder = P.el;
      }
    } else
      ne(
        O,
        f,
        p,
        m,
        b,
        _,
        A
      );
  }, ye = (f, p, m) => {
    const x = p.component = f.component;
    if (Ac(f, p, m))
      if (x.asyncDep && !x.asyncResolved) {
        Y(x, p, m);
        return;
      } else
        x.next = p, x.update();
    else
      p.el = f.el, x.vnode = p;
  }, ne = (f, p, m, x, b, _, A) => {
    const O = () => {
      if (f.isMounted) {
        let { next: T, bu: D, u: K, parent: G, vnode: Q } = f;
        {
          const w = gi(f);
          if (w) {
            T && (T.el = Q.el, Y(f, T, A)), w.asyncDep.then(() => {
              Me(() => {
                f.isUnmounted || S();
              }, b);
            });
            return;
          }
        }
        let X = T, ae;
        yt(f, !1), T ? (T.el = Q.el, Y(f, T, A)) : T = Q, D && ar(D), (ae = T.props && T.props.onVnodeBeforeUpdate) && Le(ae, G, T, Q), yt(f, !0);
        const g = Po(f), h = f.subTree;
        f.subTree = g, C(
          h,
          g,
          // parent may have changed if it's in a teleport
          d(h.el),
          // anchor may have changed if it's in a fragment
          ot(h),
          f,
          b,
          _
        ), T.el = g.el, X === null && Tc(f, g.el), K && Me(K, b), (ae = T.props && T.props.onVnodeUpdated) && Me(
          () => Le(ae, G, T, Q),
          b
        );
      } else {
        let T;
        const { el: D, props: K } = p, { bm: G, m: Q, parent: X, root: ae, type: g } = f, h = tn(p);
        yt(f, !1), G && ar(G), !h && (T = K && K.onVnodeBeforeMount) && Le(T, X, p), yt(f, !0);
        {
          ae.ce && ae.ce._hasShadowRoot() && ae.ce._injectChildStyle(
            g,
            f.parent ? f.parent.type : void 0
          );
          const w = f.subTree = Po(f);
          C(
            null,
            w,
            m,
            x,
            f,
            b,
            _
          ), p.el = w.el;
        }
        if (Q && Me(Q, b), !h && (T = K && K.onVnodeMounted)) {
          const w = p;
          Me(
            () => Le(T, X, w),
            b
          );
        }
        (p.shapeFlag & 256 || X && tn(X.vnode) && X.vnode.shapeFlag & 256) && f.a && Me(f.a, b), f.isMounted = !0, p = m = x = null;
      }
    };
    f.scope.on();
    const P = f.effect = new Rs(O);
    f.scope.off();
    const S = f.update = P.run.bind(P), H = f.job = P.runIfDirty.bind(P);
    H.i = f, H.id = f.uid, P.scheduler = () => to(H), yt(f, !0), S();
  }, Y = (f, p, m) => {
    p.component = f;
    const x = f.vnode.props;
    f.vnode = p, f.next = null, Fc(f, p.props, x, m), Lc(f, p.children, m), Ze(), bo(f), Qe();
  }, z = (f, p, m, x, b, _, A, O, P = !1) => {
    const S = f && f.children, H = f ? f.shapeFlag : 0, T = p.children, { patchFlag: D, shapeFlag: K } = p;
    if (D > 0) {
      if (D & 128) {
        ft(
          S,
          T,
          m,
          x,
          b,
          _,
          A,
          O,
          P
        );
        return;
      } else if (D & 256) {
        Te(
          S,
          T,
          m,
          x,
          b,
          _,
          A,
          O,
          P
        );
        return;
      }
    }
    K & 8 ? (H & 16 && dt(S, b, _), T !== S && u(m, T)) : H & 16 ? K & 16 ? ft(
      S,
      T,
      m,
      x,
      b,
      _,
      A,
      O,
      P
    ) : dt(S, b, _, !0) : (H & 8 && u(m, ""), K & 16 && $(
      T,
      m,
      x,
      b,
      _,
      A,
      O,
      P
    ));
  }, Te = (f, p, m, x, b, _, A, O, P) => {
    f = f || Ft, p = p || Ft;
    const S = f.length, H = p.length, T = Math.min(S, H);
    let D;
    for (D = 0; D < T; D++) {
      const K = p[D] = P ? Ye(p[D]) : Ve(p[D]);
      C(
        f[D],
        K,
        m,
        null,
        b,
        _,
        A,
        O,
        P
      );
    }
    S > H ? dt(
      f,
      b,
      _,
      !0,
      !1,
      T
    ) : $(
      p,
      m,
      x,
      b,
      _,
      A,
      O,
      P,
      T
    );
  }, ft = (f, p, m, x, b, _, A, O, P) => {
    let S = 0;
    const H = p.length;
    let T = f.length - 1, D = H - 1;
    for (; S <= T && S <= D; ) {
      const K = f[S], G = p[S] = P ? Ye(p[S]) : Ve(p[S]);
      if (Gt(K, G))
        C(
          K,
          G,
          m,
          null,
          b,
          _,
          A,
          O,
          P
        );
      else
        break;
      S++;
    }
    for (; S <= T && S <= D; ) {
      const K = f[T], G = p[D] = P ? Ye(p[D]) : Ve(p[D]);
      if (Gt(K, G))
        C(
          K,
          G,
          m,
          null,
          b,
          _,
          A,
          O,
          P
        );
      else
        break;
      T--, D--;
    }
    if (S > T) {
      if (S <= D) {
        const K = D + 1, G = K < H ? p[K].el : x;
        for (; S <= D; )
          C(
            null,
            p[S] = P ? Ye(p[S]) : Ve(p[S]),
            m,
            G,
            b,
            _,
            A,
            O,
            P
          ), S++;
      }
    } else if (S > D)
      for (; S <= T; )
        Ie(f[S], b, _, !0), S++;
    else {
      const K = S, G = S, Q = /* @__PURE__ */ new Map();
      for (S = G; S <= D; S++) {
        const ce = p[S] = P ? Ye(p[S]) : Ve(p[S]);
        ce.key != null && Q.set(ce.key, S);
      }
      let X, ae = 0;
      const g = D - G + 1;
      let h = !1, w = 0;
      const E = new Array(g);
      for (S = 0; S < g; S++) E[S] = 0;
      for (S = K; S <= T; S++) {
        const ce = f[S];
        if (ae >= g) {
          Ie(ce, b, _, !0);
          continue;
        }
        let Ce;
        if (ce.key != null)
          Ce = Q.get(ce.key);
        else
          for (X = G; X <= D; X++)
            if (E[X - G] === 0 && Gt(ce, p[X])) {
              Ce = X;
              break;
            }
        Ce === void 0 ? Ie(ce, b, _, !0) : (E[Ce - G] = S + 1, Ce >= w ? w = Ce : h = !0, C(
          ce,
          p[Ce],
          m,
          null,
          b,
          _,
          A,
          O,
          P
        ), ae++);
      }
      const q = h ? Nc(E) : Ft;
      for (X = q.length - 1, S = g - 1; S >= 0; S--) {
        const ce = G + S, Ce = p[ce], ke = p[ce + 1], go = ce + 1 < H ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          ke.el || hi(ke)
        ) : x;
        E[S] === 0 ? C(
          null,
          Ce,
          m,
          go,
          b,
          _,
          A,
          O,
          P
        ) : h && (X < 0 || S !== q[X] ? Ge(Ce, m, go, 2) : X--);
      }
    }
  }, Ge = (f, p, m, x, b = null) => {
    const { el: _, type: A, transition: O, children: P, shapeFlag: S } = f;
    if (S & 6) {
      Ge(f.component.subTree, p, m, x);
      return;
    }
    if (S & 128) {
      f.suspense.move(p, m, x);
      return;
    }
    if (S & 64) {
      A.move(f, p, m, st);
      return;
    }
    if (A === Ee) {
      r(_, p, m);
      for (let T = 0; T < P.length; T++)
        Ge(P[T], p, m, x);
      r(f.anchor, p, m);
      return;
    }
    if (A === vr) {
      L(f, p, m);
      return;
    }
    if (x !== 2 && S & 1 && O)
      if (x === 0)
        O.persisted && !_[gr] ? r(_, p, m) : (O.beforeEnter(_), r(_, p, m), Me(() => O.enter(_), b));
      else {
        const { leave: T, delayLeave: D, afterLeave: K } = O, G = () => {
          f.ctx.isUnmounted ? o(_) : r(_, p, m);
        }, Q = () => {
          const X = _._isLeaving || !!_[gr];
          _._isLeaving && _[gr](
            !0
            /* cancelled */
          ), O.persisted && !X ? G() : T(_, () => {
            G(), K && K();
          });
        };
        D ? D(_, G, Q) : Q();
      }
    else
      r(_, p, m);
  }, Ie = (f, p, m, x = !1, b = !1) => {
    const {
      type: _,
      props: A,
      ref: O,
      children: P,
      dynamicChildren: S,
      shapeFlag: H,
      patchFlag: T,
      dirs: D,
      cacheIndex: K,
      memo: G
    } = f;
    if (T === -2 && (b = !1), O != null && (Ze(), en(O, null, m, f, !0), Qe()), K != null && (p.renderCache[K] = void 0), H & 256) {
      p.ctx.deactivate(f);
      return;
    }
    const Q = H & 1 && D, X = !tn(f);
    let ae;
    if (X && (ae = A && A.onVnodeBeforeUnmount) && Le(ae, p, f), H & 6)
      lr(f.component, m, x);
    else {
      if (H & 128) {
        f.suspense.unmount(m, x);
        return;
      }
      Q && mt(f, null, p, "beforeUnmount"), H & 64 ? f.type.remove(
        f,
        p,
        m,
        st,
        x
      ) : S && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !S.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (_ !== Ee || T > 0 && T & 64) ? dt(
        S,
        p,
        m,
        !1,
        !0
      ) : (_ === Ee && T & 384 || !b && H & 16) && dt(P, p, m), x && wn(f);
    }
    const g = G != null && K == null;
    (X && (ae = A && A.onVnodeUnmounted) || Q || g) && Me(() => {
      ae && Le(ae, p, f), Q && mt(f, null, p, "unmounted"), g && (f.el = null);
    }, m);
  }, wn = (f) => {
    const { type: p, el: m, anchor: x, transition: b } = f;
    if (p === Ee) {
      Wt(m, x);
      return;
    }
    if (p === vr) {
      I(f);
      return;
    }
    const _ = () => {
      o(m), b && !b.persisted && b.afterLeave && b.afterLeave();
    };
    if (f.shapeFlag & 1 && b && !b.persisted) {
      const { leave: A, delayLeave: O } = b, P = () => A(m, _);
      O ? O(f.el, _, P) : P();
    } else
      _();
  }, Wt = (f, p) => {
    let m;
    for (; f !== p; )
      m = y(f), o(f), f = m;
    o(p);
  }, lr = (f, p, m) => {
    const { bum: x, scope: b, job: _, subTree: A, um: O, m: P, a: S } = f;
    Io(P), Io(S), x && ar(x), b.stop(), _ && (_.flags |= 8, Ie(A, f, p, m)), O && Me(O, p), Me(() => {
      f.isUnmounted = !0;
    }, p);
  }, dt = (f, p, m, x = !1, b = !1, _ = 0) => {
    for (let A = _; A < f.length; A++)
      Ie(f[A], p, m, x, b);
  }, ot = (f) => {
    if (f.shapeFlag & 6)
      return ot(f.component.subTree);
    if (f.shapeFlag & 128)
      return f.suspense.next();
    const p = y(f.anchor || f.el), m = p && p[sc];
    return m ? y(m) : p;
  };
  let pt = !1;
  const gt = (f, p, m) => {
    let x;
    f == null ? p._vnode && (Ie(p._vnode, null, null, !0), x = p._vnode.component) : C(
      p._vnode || null,
      f,
      p,
      null,
      null,
      null,
      m
    ), p._vnode = f, pt || (pt = !0, bo(x), Bs(), pt = !1);
  }, st = {
    p: C,
    um: Ie,
    m: Ge,
    r: wn,
    mt: de,
    mc: $,
    pc: z,
    pbc: U,
    n: ot,
    o: e
  };
  return {
    render: gt,
    hydrate: void 0,
    createApp: Cc(gt)
  };
}
function yr({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function yt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Vc(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function pi(e, t, n = !1) {
  const r = e.children, o = t.children;
  if (V(r) && V(o))
    for (let s = 0; s < r.length; s++) {
      const i = r[s];
      let l = o[s];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = o[s] = Ye(o[s]), l.el = i.el), !n && l.patchFlag !== -2 && pi(i, l)), l.type === Zn && (l.patchFlag === -1 && (l = o[s] = Ye(l)), l.el = i.el), l.type === tt && !l.el && (l.el = i.el);
    }
}
function Nc(e) {
  const t = e.slice(), n = [0];
  let r, o, s, i, l;
  const c = e.length;
  for (r = 0; r < c; r++) {
    const a = e[r];
    if (a !== 0) {
      if (o = n[n.length - 1], e[o] < a) {
        t[r] = o, n.push(r);
        continue;
      }
      for (s = 0, i = n.length - 1; s < i; )
        l = s + i >> 1, e[n[l]] < a ? s = l + 1 : i = l;
      a < e[n[s]] && (s > 0 && (t[r] = n[s - 1]), n[s] = r);
    }
  }
  for (s = n.length, i = n[s - 1]; s-- > 0; )
    n[s] = i, i = t[i];
  return n;
}
function gi(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : gi(t);
}
function Io(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function hi(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? hi(t.subTree) : null;
}
const mi = (e) => e.__isSuspense;
function Bc(e, t) {
  t && t.pendingBranch ? V(e) ? t.effects.push(...e) : t.effects.push(e) : Ql(e);
}
const Ee = /* @__PURE__ */ Symbol.for("v-fgt"), Zn = /* @__PURE__ */ Symbol.for("v-txt"), tt = /* @__PURE__ */ Symbol.for("v-cmt"), vr = /* @__PURE__ */ Symbol.for("v-stc"), xt = [];
let Oe = null;
function he(e = !1) {
  xt.push(Oe = e ? null : []);
}
function yi() {
  xt.pop(), Oe = xt[xt.length - 1] || null;
}
let cn = 1;
function Ao(e, t = !1) {
  cn += e, e < 0 && Oe && t && (Oe.hasOnce = !0);
}
function vi(e) {
  return e.dynamicChildren = cn > 0 ? Oe || Ft : null, yi(), cn > 0 && Oe && Oe.push(e), e;
}
function ve(e, t, n, r, o, s) {
  return vi(
    wt(
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
function Wc(e, t, n, r, o) {
  return vi(
    Je(
      e,
      t,
      n,
      r,
      o,
      !0
    )
  );
}
function wi(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Gt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const bi = ({ key: e }) => e ?? null, Pn = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? ue(e) || /* @__PURE__ */ be(e) || W(e) ? { i: Be, r: e, k: t, f: !!n } : e : null);
function wt(e, t = null, n = null, r = 0, o = null, s = e === Ee ? 0 : 1, i = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && bi(t),
    ref: t && Pn(t),
    scopeId: Us,
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
    ctx: Be
  };
  return l ? (Hn(c, n), s & 128 && e.normalize(c)) : n && (c.shapeFlag |= ue(n) ? 8 : 16), cn > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  Oe && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && Oe.push(c), c;
}
const Je = Uc;
function Uc(e, t = null, n = null, r = 0, o = null, s = !1) {
  if ((!e || e === yc) && (e = tt), wi(e)) {
    const l = $t(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Hn(l, n), cn > 0 && !s && Oe && (l.shapeFlag & 6 ? Oe[Oe.indexOf(e)] = l : Oe.push(l)), l.patchFlag = -2, l;
  }
  if (ra(e) && (e = e.__vccOpts), t) {
    t = Gc(t);
    let { class: l, style: c } = t;
    l && !ue(l) && (t.class = bt(l)), ee(c) && (/* @__PURE__ */ eo(c) && !V(c) && (c = _e({}, c)), t.style = jt(c));
  }
  const i = ue(e) ? 1 : mi(e) ? 128 : Yn(e) ? 64 : ee(e) ? 4 : W(e) ? 2 : 0;
  return wt(
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
function Gc(e) {
  return e ? /* @__PURE__ */ eo(e) || li(e) ? _e({}, e) : e : null;
}
function $t(e, t, n = !1, r = !1) {
  const { props: o, ref: s, patchFlag: i, children: l, transition: c } = e, a = t ? zc(o || {}, t) : o, u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: a,
    key: a && bi(a),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && s ? V(s) ? s.concat(Pn(t)) : [s, Pn(t)] : Pn(t)
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
    transition: c,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && $t(e.ssContent),
    ssFallback: e.ssFallback && $t(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && r && no(
    u,
    c.clone(u)
  ), u;
}
function qc(e = " ", t = 0) {
  return Je(Zn, null, e, t);
}
function qt(e = "", t = !1) {
  return t ? (he(), Wc(tt, null, e)) : Je(tt, null, e);
}
function Ve(e) {
  return e == null || typeof e == "boolean" ? Je(tt) : V(e) ? Je(
    Ee,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : wi(e) ? Ye(e) : Je(Zn, null, String(e));
}
function Ye(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : $t(e);
}
function Hn(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (V(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), Hn(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !li(t) ? t._ctx = Be : o === 3 && Be && (Be.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (W(t)) {
    if (r & 65) {
      Hn(e, { default: t });
      return;
    }
    t = { default: t, _ctx: Be }, n = 32;
  } else
    t = String(t), r & 64 ? (n = 16, t = [qc(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function zc(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === "class")
        t.class !== r.class && (t.class = bt([t.class, r.class]));
      else if (o === "style")
        t.style = jt([t.style, r.style]);
      else if (Vn(o)) {
        const s = t[o], i = r[o];
        i && s !== i && !(V(s) && s.includes(i)) ? t[o] = s ? [].concat(s, i) : i : i == null && s == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !Nn(o) && (t[o] = i);
      } else o !== "" && (t[o] = r[o]);
  }
  return t;
}
function Le(e, t, n, r = null) {
  He(e, t, 7, [
    n,
    r
  ]);
}
const Yc = ni();
let Xc = 0;
function Jc(e, t, n) {
  const r = e.type, o = (t ? t.appContext : e.appContext) || Yc, s = {
    uid: Xc++,
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
    scope: new xl(
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
    propsOptions: ai(r, o),
    emitsOptions: ri(r, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: ie,
    // inheritAttrs
    inheritAttrs: r.inheritAttrs,
    // state
    ctx: ie,
    data: ie,
    props: ie,
    attrs: ie,
    slots: ie,
    refs: ie,
    setupState: ie,
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
  return s.ctx = { _: s }, s.root = t ? t.root : s, s.emit = Pc.bind(null, s), e.ce && e.ce(s), s;
}
let Re = null;
const Zc = () => Re || Be;
let kn, an;
{
  const e = Wn(), t = (n, r) => {
    let o;
    return (o = e[n]) || (o = e[n] = []), o.push(r), (s) => {
      o.length > 1 ? o.forEach((i) => i(s)) : o[0](s);
    };
  };
  kn = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Re = n
  ), an = t(
    "__VUE_SSR_SETTERS__",
    (n) => un = n
  );
}
const hn = (e) => {
  const t = Re;
  return kn(e), e.scope.on(), () => {
    e.scope.off(), kn(t);
  };
}, To = () => {
  Re && Re.scope.off(), kn(null);
};
function _i(e) {
  return e.vnode.shapeFlag & 4;
}
let un = !1;
function Qc(e, t = !1, n = !1) {
  t && an(t);
  const { props: r, children: o } = e.vnode, s = _i(e);
  Dc(e, r, s, t), kc(e, o, n || t);
  const i = s ? ea(e, t) : void 0;
  return t && an(!1), i;
}
function ea(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, vc);
  const { setup: r } = n;
  if (r) {
    Ze();
    const o = e.setupContext = r.length > 1 ? na(e) : null, s = hn(e), i = gn(
      r,
      e,
      0,
      [
        e.props,
        o
      ]
    ), l = hs(i);
    if (Qe(), s(), (l || e.sp) && !tn(e) && Ys(e), l) {
      if (i.then(To, To), t)
        return i.then((c) => {
          an(!0);
          try {
            Do(e, c, t);
          } finally {
            an(!1);
          }
        }).catch((c) => {
          zn(c, e, 0);
        });
      e.asyncDep = i;
    } else
      Do(e, i);
  } else
    Si(e);
}
function Do(e, t, n) {
  W(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ee(t) && (e.setupState = Ks(t)), Si(e);
}
function Si(e, t, n) {
  const r = e.type;
  e.render || (e.render = r.render || We);
  {
    const o = hn(e);
    Ze();
    try {
      wc(e);
    } finally {
      Qe(), o();
    }
  }
}
const ta = {
  get(e, t) {
    return we(e, "get", ""), e[t];
  }
};
function na(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, ta),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function io(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Ks(Bl(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in nn)
        return nn[n](e);
    },
    has(t, n) {
      return n in t || n in nn;
    }
  })) : e.proxy;
}
function ra(e) {
  return W(e) && "__vccOpts" in e;
}
const ge = (e, t) => /* @__PURE__ */ zl(e, t, un), oa = "3.5.42";
/**
* @vue/runtime-dom v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let kr;
const Fo = typeof window < "u" && window.trustedTypes;
if (Fo)
  try {
    kr = /* @__PURE__ */ Fo.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const xi = kr ? (e) => kr.createHTML(e) : (e) => e, sa = "http://www.w3.org/2000/svg", ia = "http://www.w3.org/1998/Math/MathML", ze = typeof document < "u" ? document : null, jo = ze && /* @__PURE__ */ ze.createElement("template"), la = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const o = t === "svg" ? ze.createElementNS(sa, e) : t === "mathml" ? ze.createElementNS(ia, e) : n ? ze.createElement(e, { is: n }) : ze.createElement(e);
    return e === "select" && r && r.multiple != null && o.setAttribute("multiple", r.multiple), o;
  },
  createText: (e) => ze.createTextNode(e),
  createComment: (e) => ze.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => ze.querySelector(e),
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
      jo.innerHTML = xi(
        r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e
      );
      const l = jo.content;
      if (r === "svg" || r === "mathml") {
        const c = l.firstChild;
        for (; c.firstChild; )
          l.appendChild(c.firstChild);
        l.removeChild(c);
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
}, ca = /* @__PURE__ */ Symbol("_vtc");
function aa(e, t, n) {
  const r = e[ca];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Ho = /* @__PURE__ */ Symbol("_vod"), ua = /* @__PURE__ */ Symbol("_vsh"), fa = /* @__PURE__ */ Symbol(""), da = /(?:^|;)\s*display\s*:/;
function pa(e, t, n) {
  const r = e.style, o = ue(n);
  let s = !1;
  if (n && !o) {
    if (t)
      if (ue(t))
        for (const i of t.split(";")) {
          const l = i.slice(0, i.indexOf(":")).trim();
          n[l] == null && Xt(r, l, "");
        }
      else
        for (const i in t)
          n[i] == null && Xt(r, i, "");
    for (const i in n) {
      i === "display" && (s = !0);
      const l = n[i];
      l != null ? ha(
        e,
        i,
        !ue(t) && t ? t[i] : void 0,
        l
      ) || Xt(r, i, l) : Xt(r, i, "");
    }
  } else if (o) {
    if (t !== n) {
      const i = r[fa];
      i && (n += ";" + i), r.cssText = n, s = da.test(n);
    }
  } else t && e.removeAttribute("style");
  Ho in e && (e[Ho] = s ? r.display : "", e[ua] && (r.display = "none"));
}
const xn = /\s*!important$/;
function Xt(e, t, n) {
  if (V(n))
    n.forEach((r) => Xt(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--"))
    xn.test(n) ? e.setProperty(t, n.replace(xn, ""), "important") : e.setProperty(t, n);
  else {
    const r = ga(e, t);
    xn.test(n) ? e.setProperty(
      Et(r),
      n.replace(xn, ""),
      "important"
    ) : e[r] = n;
  }
}
const ko = ["Webkit", "Moz", "ms"], wr = {};
function ga(e, t) {
  const n = wr[t];
  if (n)
    return n;
  let r = De(t);
  if (r !== "filter" && r in e)
    return wr[t] = r;
  r = vs(r);
  for (let o = 0; o < ko.length; o++) {
    const s = ko[o] + r;
    if (s in e)
      return wr[t] = s;
  }
  return t;
}
function ha(e, t, n, r) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && ue(r) && n === r;
}
const Lo = "http://www.w3.org/1999/xlink";
function Ko(e, t, n, r, o, s = _l(t)) {
  r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Lo, t.slice(6, t.length)) : e.setAttributeNS(Lo, t, n) : n == null || s && !bs(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    s ? "" : Ue(n) ? String(n) : n
  );
}
function $o(e, t, n, r, o) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? xi(n) : n);
    return;
  }
  const s = e.tagName;
  if (t === "value" && s !== "PROGRESS" && // custom elements may use _value internally
  !s.includes("-")) {
    const l = s === "OPTION" ? e.getAttribute("value") || "" : e.value, c = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (l !== c || !("_value" in e)) && (e.value = c), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let i = !1;
  if (n === "" || n == null) {
    const l = typeof e[t];
    l === "boolean" ? n = bs(n) : n == null && l === "string" ? (n = "", i = !0) : l === "number" && (n = 0, i = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  i && e.removeAttribute(o || t);
}
function ma(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function ya(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const Vo = /* @__PURE__ */ Symbol("_vei");
function va(e, t, n, r, o = null) {
  const s = e[Vo] || (e[Vo] = {}), i = s[t];
  if (r && i)
    i.value = r;
  else {
    const [l, c] = _a(t);
    if (r) {
      const a = s[t] = Ra(
        r,
        o
      );
      ma(e, l, a, c);
    } else i && (ya(e, l, i, c), s[t] = void 0);
  }
}
const wa = /(Once|Passive|Capture)$/, ba = /^on:?(?:Once|Passive|Capture)$/;
function _a(e) {
  let t, n;
  for (; (n = e.match(wa)) && !ba.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : Et(e.slice(2)), t];
}
let br = 0;
const Sa = /* @__PURE__ */ Promise.resolve(), xa = () => br || (Sa.then(() => br = 0), br = Date.now());
function Ra(e, t) {
  const n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    const o = n.value;
    if (V(o)) {
      const s = r.stopImmediatePropagation;
      r.stopImmediatePropagation = () => {
        s.call(r), r._stopped = !0;
      };
      const i = o.slice(), l = [r];
      for (let c = 0; c < i.length && !r._stopped; c++) {
        const a = i[c];
        a && He(
          a,
          t,
          5,
          l
        );
      }
    } else
      He(
        o,
        t,
        5,
        [r]
      );
  };
  return n.value = e, n.attached = xa(), n;
}
const No = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Ca = (e, t, n, r, o, s) => {
  const i = o === "svg";
  t === "class" ? aa(e, r, i) : t === "style" ? pa(e, n, r) : Vn(t) ? Nn(t) || va(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Ma(e, t, r, i)) ? ($o(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Ko(e, t, r, i, s, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Pa(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !ue(r))) ? $o(e, De(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), Ko(e, t, r, i));
};
function Ma(e, t, n, r) {
  if (r)
    return !!(t === "innerHTML" || t === "textContent" || t in e && No(t) && W(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return No(t) && ue(n) ? !1 : t in e;
}
function Pa(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const r = De(t);
  return Array.isArray(n) ? n.some((o) => De(o) === r) : Object.keys(n).some((o) => De(o) === r);
}
const Ea = ["ctrl", "shift", "alt", "meta"], Oa = {
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
  exact: (e, t) => Ea.some((n) => e[`${n}Key`] && !t.includes(n))
}, Bo = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), r = t.join(".");
  return n[r] || (n[r] = (o, ...s) => {
    for (let i = 0; i < t.length; i++) {
      const l = Oa[t[i]];
      if (l && l(o, t)) return;
    }
    return e(o, ...s);
  });
}, Ia = /* @__PURE__ */ _e({ patchProp: Ca }, la);
let Wo;
function Aa() {
  return Wo || (Wo = Kc(Ia));
}
const Ta = (...e) => {
  const t = Aa().createApp(...e), { mount: n } = t;
  return t.mount = (r) => {
    const o = Fa(r);
    if (!o) return;
    const s = t._component;
    !W(s) && !s.render && !s.template && (s.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const i = n(o, !1, Da(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), i;
  }, t;
};
function Da(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Fa(e) {
  return ue(e) ? document.querySelector(e) : e;
}
function Rn() {
  return !0;
}
const ja = Symbol("merge-proxy"), En = Symbol("merge-proxy-sources"), Ha = {
  get(e, t, n) {
    return t === ja ? n : t === En ? e.sources : e.get(t);
  },
  has(e, t) {
    return e.has(t);
  },
  set: Rn,
  deleteProperty: Rn,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: Rn,
      deleteProperty: Rn
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function On(e) {
  return e && typeof e == "object" && "value" in e ? e.value : e;
}
function Lr(...e) {
  const t = e.flatMap((n) => typeof n == "object" && n !== null && En in n && Array.isArray(n[En]) ? n[En] : [n]);
  return new Proxy({
    sources: t,
    get(n) {
      for (let r = t.length - 1; r >= 0; r--) {
        const o = On(t[r])[n];
        if (o !== void 0) return o;
      }
    },
    has(n) {
      for (let r = t.length - 1; r >= 0; r--) if (n in On(t[r])) return !0;
      return !1;
    },
    keys() {
      const n = [];
      for (const r of t) n.push(...Object.keys(On(r)));
      return [...Array.from(new Set(n))];
    }
  }, Ha);
}
function Uo(...e) {
  const t = {};
  for (let n of e)
    if (n = On(n), !!n)
      for (const r of Reflect.ownKeys(n)) {
        const o = n[r];
        o !== void 0 && (t[r] = o);
      }
  return t;
}
function Ri(e) {
  return typeof e == "function" ? e : (t) => {
    var n;
    return (n = e.next) == null ? void 0 : n.call(e, t);
  };
}
function ka(e) {
  return Object.assign(e, {
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: Pe(e, Ri(t), { flush: "sync" }) })
  });
}
function La(e) {
  return Object.assign(e, {
    set: (t) => {
      e.value = typeof t == "function" ? t(e.value) : t;
    },
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: Pe(e, Ri(t), { flush: "sync" }) })
  });
}
function Ka() {
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
    createReadonlyAtom: (t, n) => ka(ge(() => t())),
    createWritableAtom: (t, n) => La(/* @__PURE__ */ Wl(t)),
    untrack: (t) => t(),
    batch: (t) => t()
  };
}
function Qn(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function ut(e) {
  if (Array.isArray(e)) return e.map(ut);
  if (e && typeof e == "object") {
    const t = Object.getPrototypeOf(e);
    if (t !== Object.prototype && t !== null) return e;
    const n = t === null ? re() : {}, r = Object.keys(e);
    for (let o = 0; o < r.length; o++) {
      const s = r[o];
      Object.defineProperty(n, s, {
        configurable: !0,
        enumerable: !0,
        value: ut(e[s]),
        writable: !0
      });
    }
    return n;
  }
  return e;
}
function $a(e, t) {
  const n = Object.keys(t), r = e;
  for (let o = 0; o < n.length; o++) {
    const s = n[o];
    !s.startsWith("_memo_") && s !== "_cellsCache" && (r[s] = t[s]);
  }
  return e;
}
function re() {
  return /* @__PURE__ */ Object.create(null);
}
function Vt(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Ci(e, t) {
  return (n) => {
    var r;
    (((r = t.options.atoms) == null ? void 0 : r[e]) ?? t.baseAtoms[e]).set((o) => Qn(n, o));
  };
}
function Go(e) {
  if (typeof e != "object" || e === null) return !1;
  if (Array.isArray(e)) return !0;
  const t = Object.getPrototypeOf(e);
  return t === Object.prototype || t === null;
}
function qo(e) {
  return Reflect.ownKeys(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
const Va = 3;
function Na(e, t) {
  return Mi(e, t, Va);
}
function Mi(e, t, n) {
  if (Object.is(e, t)) return !0;
  if (n <= 0 || !Go(e) || !Go(t) || (Array.isArray(e) || Array.isArray(t)) && (!Array.isArray(e) || !Array.isArray(t) || e.length !== t.length))
    return !1;
  const r = qo(e), o = qo(t);
  if (r.length !== o.length) return !1;
  const s = e, i = t;
  for (let l = 0; l < r.length; l++) {
    const c = r[l];
    if (!Object.prototype.propertyIsEnumerable.call(t, c) || !Mi(s[c], i[c], n - 1)) return !1;
  }
  return !0;
}
function er(e, t, n, r = Na) {
  const o = `on${t.charAt(0).toUpperCase()}${t.slice(1)}Change`, s = e.options[o];
  s && s((i) => {
    const l = Qn(n, i);
    return r(i, l) ? i : l;
  });
}
function Ba(e, t) {
  const n = [], r = (o) => {
    o.forEach((s) => {
      n.push(s);
      const i = t(s);
      i.length && r(i);
    });
  };
  return r(e), n;
}
const Wa = ({ fn: e, memoDeps: t, onAfterCompare: n, onAfterUpdate: r, onBeforeCompare: o, onBeforeUpdate: s }) => {
  let i = [], l;
  return (a) => {
    o == null || o();
    const u = t == null ? void 0 : t(a);
    let d = !u || u.length !== (i == null ? void 0 : i.length);
    if (!d && u) {
      for (let y = 0; y < u.length; y++) if (u[y] !== i[y]) {
        d = !0;
        break;
      }
    }
    return n == null || n(d), d && (i = u, s == null || s(), l = e(...u ?? []), r == null || r(l)), l;
  };
};
function Ua(e) {
  let t = !1;
  return () => {
    if (!t) {
      t = !0;
      return;
    }
    e();
  };
}
function tr({ feature: e, fnName: t, objectId: n, onAfterUpdate: r, table: o, ...s }) {
  const i = () => {
    if (!r) return;
    const { schedule: c, untrack: a } = o._reactivity;
    c(() => a(() => r()));
  };
  return Wa({
    ...s,
    ...{ onAfterUpdate: () => {
      i();
    } }
  });
}
function Pi(e, t = "_") {
  const [n, r] = e.split(t);
  return {
    fnKey: r,
    fnName: `${n}.${r}`,
    parentName: n
  };
}
function Ot(e, t, n) {
  for (const [r, { fn: o, memoDeps: s }] of Object.entries(n)) {
    const { fnKey: i, fnName: l } = Pi(r);
    t[i] = s ? tr({
      memoDeps: s,
      fn: o,
      fnName: l,
      table: t,
      feature: e
    }) : o;
  }
}
function Nt(e, t, n, r) {
  for (const [o, { fn: s, memoDeps: i }] of Object.entries(r)) {
    const { fnKey: l, fnName: c } = Pi(o);
    if (i) {
      const a = `_memo_${l}`;
      t[l] = function(...u) {
        if (!this[a]) {
          const d = this;
          this[a] = tr({
            memoDeps: (y) => i(d, y),
            fn: (...y) => s(d, ...y),
            fnName: c,
            objectId: d.id,
            table: n,
            feature: e
          });
        }
        return this[a](...u);
      };
    } else t[l] = function(...a) {
      return s(this, ...a);
    };
  }
}
function me(e, t, n, ...r) {
  var o;
  return ((o = e[t]) == null ? void 0 : o.call(e, ...r)) ?? n(e, ...r);
}
function Ga(e) {
  return e.row.getValue(e.column.id);
}
function qa(e) {
  return e.getValue() ?? e.table.options.renderFallbackValue;
}
function za(e) {
  return {
    table: e.table,
    column: e.column,
    row: e.row,
    cell: e,
    getValue: () => e.getValue(),
    renderValue: () => e.renderValue()
  };
}
const Ya = { assignCellPrototype: (e, t) => {
  Nt("coreCellsFeature", e, t, {
    cell_getValue: { fn: (n) => Ga(n) },
    cell_renderValue: { fn: (n) => qa(n) },
    cell_getContext: {
      fn: (n) => za(n),
      memoDeps: (n) => [n]
    }
  });
} };
function Xa(e) {
  var t, n;
  if (!e._headerPrototype) {
    e._headerPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignHeaderPrototype) == null || n.call(t, e._headerPrototype, e);
  }
  return e._headerPrototype;
}
function Ei(e, t, n) {
  const r = Xa(e), o = Object.create(r);
  o.colSpan = 0, o.column = t, o.depth = n.depth, o.headerGroup = null, o.id = n.id ?? t.id, o.index = n.index, o.isPlaceholder = !!n.isPlaceholder, o.placeholderId = n.placeholderId, o.rowSpan = 0, o.subHeaders = [];
  const s = e._headerInstanceInitFns;
  for (let i = 0; i < s.length; i++) s[i](o);
  return o;
}
function Ja() {
  return {
    start: [],
    end: []
  };
}
function Ct(e) {
  var r;
  const t = (r = e.table.atoms.columnVisibility) == null ? void 0 : r.get();
  if (!t) return !0;
  const n = e.columns;
  return n.length ? n.some((o) => me(o, "getIsVisible", Ct)) : (Vt(t, e.id) ? t[e.id] : void 0) ?? !0;
}
function Za(e) {
  return e.getAllLeafColumns().filter((t) => me(t, "getIsVisible", Ct));
}
function Oi(e, t = 1) {
  let n = t;
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    me(o, "getIsVisible", Ct) && o.columns.length && (n = Math.max(n, Oi(o.columns, t + 1)));
  }
  return n;
}
function Qa(e, t) {
  return String(t);
}
function eu(e, t, n, r) {
  let o = e ?? "";
  return t && (o = o ? `${o}_${t}` : String(t)), n && (o = o ? `${o}_${n}` : n), r && (o = o ? `${o}_${r}` : r), o;
}
function tu(e, t) {
  let n = 0;
  for (let r = 0; r < e.length; r++) e[r].column === t && n++;
  return n;
}
function Ii(e, t, n, r, o, s) {
  const i = {
    depth: t,
    id: Qa(r, t),
    headers: []
  }, l = [];
  for (let c = 0; c < e.length; c++) {
    if (!(c in e)) continue;
    const a = e[c], u = l[l.length - 1], d = a.column.depth === i.depth;
    let y, v = !1;
    if (d && a.column.parent ? y = a.column.parent : (y = a.column, v = !0), u && u.column === y) u.subHeaders.push(a);
    else {
      const R = Ei(n, y, {
        id: eu(r, t, y.id, a.id),
        isPlaceholder: v,
        placeholderId: v ? String(tu(l, y)) : void 0,
        depth: t,
        index: l.length
      });
      R.subHeaders.push(a), l.push(R);
    }
    i.headers.push(a), a.headerGroup = i;
  }
  for (let c = 0; c < s.length; c++) s[c](i);
  o.push(i), t > 0 && Ii(l, t - 1, n, r, o, s);
}
function Ai(e) {
  for (let t = 0; t < e.length; t++) {
    const n = e[t];
    if (!me(n.column, "getIsVisible", Ct)) continue;
    let r = 0;
    if (n.subHeaders.length) {
      Ai(n.subHeaders);
      for (let o = 0; o < n.subHeaders.length; o++) {
        const s = n.subHeaders[o];
        me(s.column, "getIsVisible", Ct) && (r += s.colSpan);
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
function zo(e, t, n, r) {
  var c;
  const o = Oi(e), s = [], i = n._headerGroupInstanceInitFns, l = new Array(t.length);
  for (let a = 0; a < t.length; a++)
    a in t && (l[a] = Ei(n, t[a], {
      depth: o,
      index: a
    }));
  return Ii(l, o - 1, n, r, s, i), s.reverse(), Ai(((c = s[0]) == null ? void 0 : c.headers) ?? []), s;
}
function nu(e) {
  var t, n;
  if (!e._columnPrototype) {
    e._columnPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignColumnPrototype) == null || n.call(t, e._columnPrototype, e);
  }
  return e._columnPrototype;
}
function ru(e, t, n, r) {
  const o = {
    ...e.getDefaultColumnDef(),
    ...t
  }, s = o.accessorKey, i = s === void 0 ? void 0 : String(s), l = o.id ?? (i == null ? void 0 : i.replaceAll(".", "_")) ?? (typeof o.header == "string" ? o.header : void 0);
  let c;
  if (o.accessorFn) c = o.accessorFn;
  else if (s !== void 0) if (typeof s == "string" && s.includes(".")) {
    const y = s.split(".");
    c = (v) => {
      let R = v;
      for (let C = 0; C < y.length; C++) {
        const k = y[C];
        R = R == null ? void 0 : R[k];
      }
      return R;
    };
  } else c = (y) => y[o.accessorKey];
  if (!l)
    throw new Error();
  const a = nu(e), u = Object.create(a);
  u.accessorFn = c, u.columnDef = o, u.columns = [], u.depth = n, u.id = `${String(l)}`, u.parent = r;
  const d = e._columnInstanceInitFns;
  for (let y = 0; y < d.length; y++) d[y](u);
  return u;
}
function Ti(e) {
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
        const l = t[i], c = s.get(l);
        c && (o.push(c), s.delete(l));
      }
      for (let i = 0; i < r.length; i++) {
        const l = r[i];
        s.has(l.id) && o.push(l);
      }
    }
    return ou(e, o);
  };
}
function ou(e, t) {
  var l;
  const n = ((l = e.atoms.grouping) == null ? void 0 : l.get()) ?? [], { groupedColumnMode: r } = e.options;
  if (!n.length || !r) return t;
  const o = t.filter((c) => !n.includes(c.id));
  if (r === "remove") return o;
  const s = /* @__PURE__ */ new Map();
  for (let c = 0; c < t.length; c++) {
    const a = t[c];
    s.set(a.id, a);
  }
  const i = [];
  for (let c = 0; c < n.length; c++) {
    const a = s.get(n[c]);
    a && i.push(a);
  }
  return [...i, ...o];
}
function su(e) {
  return [e, ...e.columns.flatMap((t) => t.getFlatColumns())];
}
function iu(e) {
  if (e.columns.length) {
    const t = e.columns.flatMap((n) => n.getLeafColumns());
    return me(e.table, "getOrderColumns", Ti)(t);
  }
  return [e];
}
function lu(e) {
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
function Di(e, t, n, r = 0) {
  const o = new Array(t.length);
  for (let s = 0; s < t.length; s++) {
    if (!(s in t)) continue;
    const i = t[s], l = ru(e, i, r, n), c = i;
    l.columns = c.columns ? Di(e, c.columns, l, r + 1) : [], o[s] = l;
  }
  return o;
}
function cu(e) {
  return Di(e, e.options.columns);
}
function au(e) {
  return e.getAllColumns().flatMap((t) => t.getFlatColumns());
}
function uu(e) {
  const t = re(), n = e.getAllFlatColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function fu(e) {
  const t = e.getAllColumns().flatMap((n) => n.getLeafColumns());
  return me(e, "getOrderColumns", Ti)(t);
}
function du(e) {
  const t = re(), n = e.getAllLeafColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function pu(e, t) {
  return e.getAllFlatColumnsById()[t];
}
const gu = {
  assignColumnPrototype: (e, t) => {
    Nt("coreColumnsFeature", e, t, {
      column_getFlatColumns: {
        fn: (n) => su(n),
        memoDeps: (n) => [n.table.options.columns]
      },
      column_getLeafColumns: {
        fn: (n) => iu(n),
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
    Ot("coreColumnsFeature", e, {
      table_getDefaultColumnDef: {
        fn: () => lu(e),
        memoDeps: () => [e.options.defaultColumn]
      },
      table_getAllColumns: {
        fn: () => cu(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumns: {
        fn: () => au(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumnsById: {
        fn: () => uu(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllLeafColumns: {
        fn: () => fu(e),
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
        fn: () => du(e),
        memoDeps: () => [e.getAllLeafColumns()]
      },
      table_getColumn: { fn: (t) => pu(e, t) }
    });
  }
};
function Fi(e, t) {
  for (let n = 0; n < e.subHeaders.length; n++) Fi(e.subHeaders[n], t);
  t.push(e);
}
function hu(e) {
  const t = [];
  return Fi(e, t), t;
}
function mu(e) {
  return {
    column: e.column,
    header: e,
    table: e.column.table
  };
}
function yu(e) {
  var a;
  const { start: t, end: n } = ((a = e.atoms.columnPinning) == null ? void 0 : a.get()) ?? Ja(), r = e.getAllColumns(), o = me(e, "getVisibleLeafColumns", Za);
  if (!t.length && !n.length) return zo(r, o, e);
  const s = e.getAllLeafColumnsById(), i = [];
  for (let u = 0; u < t.length; u++) {
    const d = s[t[u]];
    d && me(d, "getIsVisible", Ct) && i.push(d);
  }
  const l = [];
  for (let u = 0; u < n.length; u++) {
    const d = s[n[u]];
    d && me(d, "getIsVisible", Ct) && l.push(d);
  }
  const c = o.filter((u) => !t.includes(u.id) && !n.includes(u.id));
  return zo(r, [
    ...i,
    ...c,
    ...l
  ], e);
}
function vu(e) {
  return [...e.getHeaderGroups()].reverse();
}
function wu(e) {
  const t = e.getHeaderGroups(), n = [];
  for (let r = 0; r < t.length; r++) {
    const o = t[r].headers;
    for (let s = 0; s < o.length; s++) n.push(o[s]);
  }
  return n;
}
function bu(e) {
  var r;
  const t = ((r = e.getHeaderGroups()[0]) == null ? void 0 : r.headers) ?? [], n = [];
  for (let o = 0; o < t.length; o++) {
    const s = t[o].getLeafHeaders();
    for (let i = 0; i < s.length; i++) n.push(s[i]);
  }
  return n;
}
const _u = {
  assignHeaderPrototype: (e, t) => {
    Nt("coreHeadersFeature", e, t, {
      header_getLeafHeaders: {
        fn: (n) => hu(n),
        memoDeps: (n) => [n.column.table.options.columns]
      },
      header_getContext: {
        fn: (n) => mu(n),
        memoDeps: (n) => [n.column.table.options.columns]
      }
    });
  },
  constructTableAPIs: (e) => {
    Ot("coreHeadersFeature", e, {
      table_getHeaderGroups: {
        fn: () => yu(e),
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
        fn: () => vu(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getFlatHeaders: {
        fn: () => wu(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getLeafHeaders: {
        fn: () => bu(e),
        memoDeps: () => [e.getHeaderGroups()]
      }
    });
  }
};
function Su(e) {
  var t, n;
  if (!e._rowPrototype) {
    e._rowPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignRowPrototype) == null || n.call(t, e._rowPrototype, e);
  }
  return e._rowPrototype;
}
const xu = (e, t, n, r, o, s, i) => {
  const l = Su(e), c = Object.create(l);
  c._displayIndexCache = -1, c._uniqueValuesCache = re(), c._valuesCache = re(), c.depth = o, c.id = t, c.index = r, c.original = n, c.parentId = i, c.subRows = [];
  const a = e._rowInstanceInitFns;
  for (let u = 0; u < a.length; u++) a[u](c);
  return c;
};
function Ru() {
  return [];
}
function Cu(e, t) {
  er(e, "cellSelection", ut(e.initialState.cellSelection) ?? Ru());
}
function Mu(e) {
  e.atoms.cellSelection && (e.options.autoResetAll ?? e.options.autoResetCellSelection ?? !0) && e._reactivity.schedule(() => Cu(e));
}
function Pu() {
  return re();
}
function ji(e) {
  e.atoms.expanded && (e.options.autoResetAll ?? e.options.autoResetExpanded ?? !e.options.manualExpanding) && e._reactivity.schedule(() => ki(e));
}
function Ln(e, t) {
  var n, r;
  (r = (n = e.options).onExpandedChange) == null || r.call(n, t);
}
function Hi(e, t) {
  var r;
  const n = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t ?? !Ki(e)) {
    if (n === !0 || !Li(e)) return;
    Ln(e, !0);
  } else {
    if (n !== !0 && !Object.keys(n).length) return;
    Ln(e, re());
  }
}
function ki(e, t) {
  const n = e.initialState.expanded;
  er(e, "expanded", t ? re() : n === !0 ? !0 : Object.assign(re(), ut(n ?? {})));
}
function Li(e) {
  return e.getPrePaginatedRowModel().flatRows.some((t) => Mt(t));
}
function Eu(e) {
  return (t) => {
    Hi(e);
  };
}
function Ou(e) {
  var n;
  const t = ((n = e.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return t === !0 || Object.values(t).some(Boolean);
}
function Ki(e) {
  var r;
  const t = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t === !0) return !0;
  if (!Object.keys(t).length) return !1;
  const n = e.getRowModel().flatRows.filter((o) => Mt(o));
  return !(!n.length || n.some((o) => !nr(o)));
}
function Iu(e) {
  var r;
  let t = 0;
  const n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return (n === !0 ? Object.values(e.getRowModel().rowsById).filter((o) => Mt(o)).map((o) => o.id) : Object.keys(n ?? {})).forEach((o) => {
    const s = o.split(".");
    t = Math.max(t, s.length);
  }), t;
}
function $i(e, t) {
  var s;
  const n = ((s = e.table.atoms.expanded) == null ? void 0 : s.get()) ?? {}, r = n === !0 || Kr(n, e.id), o = t ?? !r;
  o !== r && (o && !Mt(e) || Ln(e.table, (i) => {
    const l = i === !0 ? !0 : Kr(i, e.id);
    let c = re();
    if (i === !0 ? Object.values(e.table.getRowModel().rowsById).forEach((a) => {
      Mt(a) && (c[a.id] = !0);
    }) : c = Object.assign(re(), i), !l && o)
      return c[e.id] = !0, c;
    if (l && !o) {
      const a = re(), u = Object.keys(c);
      for (let d = 0; d < u.length; d++) {
        const y = u[d];
        y !== e.id && c[y] && (a[y] = !0);
      }
      return a;
    }
    return i;
  }));
}
function nr(e) {
  var n, r, o;
  const t = ((n = e.table.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return !!(((o = (r = e.table.options).getIsRowExpanded) == null ? void 0 : o.call(r, e)) ?? (t === !0 || Kr(t, e.id)));
}
function Kr(e, t) {
  return !!(e && e !== !0 && Vt(e, t) && e[t]);
}
function Mt(e) {
  var t, n;
  return ((n = (t = e.table.options).getRowCanExpand) == null ? void 0 : n.call(t, e)) ?? ((e.table.options.enableExpanding ?? !0) && !!e.subRows.length);
}
function Au(e) {
  let t = !0, n = e;
  for (; t && n.parentId; )
    n = e.table.getRow(n.parentId, !0), t = nr(n);
  return t;
}
function Tu(e) {
  const t = Mt(e);
  return () => {
    t && $i(e);
  };
}
const $r = 0;
function Du(e) {
  var t, n;
  if (e.options.autoResetAll ?? e.options.autoResetPageIndex ?? !e.options.manualPagination) {
    if ((((n = (t = e.atoms.pagination) == null ? void 0 : t.get()) == null ? void 0 : n.pageIndex) ?? $r) === $r) return;
    Hu(e);
  }
}
function Fu(e, t) {
  er(e, "pagination", t);
}
function ju(e, t) {
  Fu(e, (n) => {
    let r = Qn(t, n.pageIndex);
    const o = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
    return r = Math.max(0, Math.min(r, o)), {
      ...n,
      pageIndex: r
    };
  });
}
function Hu(e, t) {
  ju(e, $r);
}
function ku(e, t) {
  er(e, "sorting", t);
}
function Lu(e, t) {
  ku(e, ut(e.initialState.sorting ?? []));
}
function Ku(e) {
  e.atoms.sorting && (e.options.autoResetAll ?? e.options.autoResetSorting ?? !1) && Lu(e);
}
function Vi() {
  return (e) => tr({
    feature: "coreRowModelsFeature",
    table: e,
    fnName: "table.getCoreRowModel",
    memoDeps: () => [e.options.data],
    fn: () => $u(e, e.options.data),
    onAfterUpdate: Ua(() => {
      ji(e), Du(e), Ku(e), Mu(e);
    })
  });
}
function Ni(e, t, n, r = 0, o) {
  var i;
  const s = [];
  for (let l = 0; l < n.length; l++) {
    const c = n[l], a = xu(e, e.getRowId(c, l, o), c, l, r, void 0, o == null ? void 0 : o.id);
    t.flatRows.push(a), t.rowsById[a.id] = a, s.push(a), e.options.getSubRows && (a.originalSubRows = e.options.getSubRows(c, l), (i = a.originalSubRows) != null && i.length && (a.subRows = Ni(e, t, a.originalSubRows, r + 1, a)));
  }
  return s;
}
function $u(e, t) {
  const n = {
    rows: [],
    flatRows: [],
    rowsById: re()
  };
  return n.rows = Ni(e, n, t), n;
}
function Vu(e) {
  var t, n;
  return e._rowModels.coreRowModel || (e._rowModels.coreRowModel = ((n = (t = e.options.features).coreRowModel) == null ? void 0 : n.call(t, e)) ?? Vi()(e)), e._rowModels.coreRowModel();
}
function Nu(e) {
  return e.getCoreRowModel();
}
function Bu(e) {
  var t, n;
  return e._rowModels.filteredRowModel || (e._rowModels.filteredRowModel = (n = (t = e.options.features).filteredRowModel) == null ? void 0 : n.call(t, e)), e.options.manualFiltering || !e._rowModels.filteredRowModel ? e.getPreFilteredRowModel() : e._rowModels.filteredRowModel();
}
function Wu(e) {
  return e.getFilteredRowModel();
}
function Uu(e) {
  var t, n;
  return e._rowModels.groupedRowModel || (e._rowModels.groupedRowModel = (n = (t = e.options.features).groupedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualGrouping || !e._rowModels.groupedRowModel ? e.getPreGroupedRowModel() : e._rowModels.groupedRowModel();
}
function Gu(e) {
  return e.getGroupedRowModel();
}
function qu(e) {
  var t, n;
  return e._rowModels.sortedRowModel || (e._rowModels.sortedRowModel = (n = (t = e.options.features).sortedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualSorting || !e._rowModels.sortedRowModel ? e.getPreSortedRowModel() : e._rowModels.sortedRowModel();
}
function zu(e) {
  return e.getSortedRowModel();
}
function Yu(e) {
  var t, n;
  return e._rowModels.expandedRowModel || (e._rowModels.expandedRowModel = (n = (t = e.options.features).expandedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualExpanding || !e._rowModels.expandedRowModel ? e.getPreExpandedRowModel() : e._rowModels.expandedRowModel();
}
function Xu(e) {
  return e.getExpandedRowModel();
}
function Ju(e) {
  var t, n;
  return e._rowModels.paginatedRowModel || (e._rowModels.paginatedRowModel = (n = (t = e.options.features).paginatedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualPagination || !e._rowModels.paginatedRowModel ? e.getPrePaginatedRowModel() : e._rowModels.paginatedRowModel();
}
function Zu(e) {
  return e.getPaginatedRowModel();
}
const Qu = { constructTableAPIs: (e) => {
  Ot("coreRowModelsFeature", e, {
    table_getCoreRowModel: { fn: () => Vu(e) },
    table_getPreFilteredRowModel: { fn: () => Nu(e) },
    table_getFilteredRowModel: { fn: () => Bu(e) },
    table_getPreGroupedRowModel: { fn: () => Wu(e) },
    table_getGroupedRowModel: { fn: () => Uu(e) },
    table_getPreSortedRowModel: { fn: () => Gu(e) },
    table_getSortedRowModel: { fn: () => qu(e) },
    table_getPreExpandedRowModel: { fn: () => zu(e) },
    table_getExpandedRowModel: { fn: () => Yu(e) },
    table_getPrePaginatedRowModel: { fn: () => Xu(e) },
    table_getPaginatedRowModel: { fn: () => Ju(e) },
    table_getRowModel: { fn: () => Zu(e) }
  });
} };
function ef(e) {
  var t, n;
  if (!e._cellPrototype) {
    e._cellPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignCellPrototype) == null || n.call(t, e._cellPrototype, e);
  }
  return e._cellPrototype;
}
function tf(e, t, n) {
  const r = ef(n), o = Object.create(r);
  o.column = e, o.id = `${t.id}_${e.id}`, o.row = t;
  const s = n._cellInstanceInitFns;
  for (let i = 0; i < s.length; i++) s[i](o);
  return o;
}
function nf(e) {
  const t = e.table.getRowsInDisplayOrder(), n = e._displayIndexCache;
  return t[n] === e ? n : -1;
}
function rf(e) {
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
function of(e, t) {
  if (Vt(e._valuesCache, t)) return e._valuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return e._valuesCache[t] = n.accessorFn(e.original, e.index), e._valuesCache[t];
}
function sf(e, t) {
  if (Vt(e._uniqueValuesCache, t)) return e._uniqueValuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return n.columnDef.getUniqueValues ? (e._uniqueValuesCache[t] = n.columnDef.getUniqueValues(e.original, e.index), e._uniqueValuesCache[t]) : (e._uniqueValuesCache[t] = [e.getValue(t)], e._uniqueValuesCache[t]);
}
function lf(e, t) {
  return e.getValue(t) ?? e.table.options.renderFallbackValue;
}
function cf(e) {
  return Ba(e.subRows, (t) => t.subRows);
}
function af(e) {
  const t = e.getCoreRowModel().flatRows;
  let n = 0;
  for (let r = 0; r < t.length; r++) n = Math.max(n, t[r].depth);
  return n;
}
function uf(e) {
  if (e.parentId)
    return e.table.getCoreRowModel().rowsById[e.parentId] ?? e.table.getRow(e.parentId, !0);
}
function ff(e) {
  const t = [];
  let n = e;
  for (; ; ) {
    const r = n.getParentRow();
    if (!r) break;
    t.push(r), n = r;
  }
  return t.reverse();
}
function df(e) {
  const t = e.table.getAllLeafColumns();
  let n = e._cellsCache;
  n || (n = e._cellsCache = /* @__PURE__ */ new WeakMap());
  const r = new Array(t.length);
  for (let o = 0; o < t.length; o++) {
    const s = t[o];
    let i = n.get(s);
    i || (i = tf(s, e, e.table), n.set(s, i)), r[o] = i;
  }
  return r;
}
function pf(e) {
  const t = re(), n = e.getAllCells();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.column.id] = o;
  }
  return t;
}
function gf(e, t, n, r) {
  var o, s;
  return ((s = (o = t.options).getRowId) == null ? void 0 : s.call(o, e, n, r)) ?? (r ? `${r.id}.${n}` : String(n));
}
function hf(e, t, n) {
  let r = (n ? e.getPrePaginatedRowModel() : e.getRowModel()).rowsById[t];
  if (!r && (r = e.getCoreRowModel().rowsById[t], !r))
    throw new Error();
  return r;
}
const mf = {
  assignRowPrototype: (e, t) => {
    Nt("coreRowsFeature", e, t, {
      row_getDisplayIndex: { fn: (n) => nf(n) },
      row_getAllCellsByColumnId: {
        fn: (n) => pf(n),
        memoDeps: (n) => [n.getAllCells()]
      },
      row_getAllCells: {
        fn: (n) => df(n),
        memoDeps: (n) => [n.table.getAllLeafColumns()]
      },
      row_getLeafRows: {
        fn: (n) => cf(n),
        memoDeps: (n) => [n.subRows]
      },
      row_getParentRow: { fn: (n) => uf(n) },
      row_getParentRows: { fn: (n) => ff(n) },
      row_getUniqueValues: { fn: (n, r) => sf(n, r) },
      row_getValue: { fn: (n, r) => of(n, r) },
      row_renderValue: { fn: (n, r) => lf(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    Ot("coreRowsFeature", e, {
      table_getRowsInDisplayOrder: {
        fn: () => rf(e),
        memoDeps: () => {
          var t;
          return [
            e.getPrePaginatedRowModel().rows,
            e.options.paginateExpandedRows,
            e.options.paginateExpandedRows === !1 ? (t = e.atoms.expanded) == null ? void 0 : t.get() : void 0
          ];
        }
      },
      table_getRowId: { fn: (t, n, r) => gf(t, e, n, r) },
      table_getRow: { fn: (t, n) => hf(e, t, n) },
      table_getMaxSubRowDepth: {
        fn: () => af(e),
        memoDeps: () => [e.getCoreRowModel()]
      }
    });
  }
};
function Bi(e, t, n = (r, o) => r === o) {
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
function yf(e, t, n = (r, o) => r === o) {
  e._reactivity.batch(() => {
    var r, o;
    Bi(e, t, n), (o = (r = e._reactivity).commit) == null || o.call(r);
  });
}
function vf(e) {
  var r, o;
  const t = ut(e.initialState);
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
function wf(e, t) {
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
function bf(e, t, n) {
  const r = wf(e, Qn(t, e.options));
  e.optionsStore ? e.optionsStore.set(() => r) : e.options = r, yf(e, r.state ?? null);
}
const _f = { constructTableAPIs: (e) => {
  Ot("coreTablesFeature", e, {
    table_reset: { fn: () => vf(e) },
    table_setOptions: { fn: (t) => bf(e, t) }
  });
} }, Sf = {
  coreCellsFeature: Ya,
  coreColumnsFeature: gu,
  coreHeadersFeature: _u,
  coreRowModelsFeature: Qu,
  coreRowsFeature: mf,
  coreTablesFeature: _f
};
function xf(e) {
  const t = e;
  return Object.defineProperty(e, "state", { get() {
    return e.get();
  } }), "set" in e && (t.setState = e.set.bind(e)), t;
}
function Rf(e, t) {
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
  const n = Yo(e);
  if (n.length !== Yo(t).length) return !1;
  for (let r = 0; r < n.length; r++) if (!Object.prototype.hasOwnProperty.call(t, n[r]) || !Object.is(e[n[r]], t[n[r]])) return !1;
  return !0;
}
function Yo(e) {
  return Object.keys(e).concat(Object.getOwnPropertySymbols(e));
}
function Cf(e, t = {}) {
  return Object.values(e).forEach((n) => {
    var r;
    t = ((r = n.getInitialState) == null ? void 0 : r.call(n, t)) ?? t;
  }), ut(t);
}
function Mf(e) {
  var B, le;
  const t = e.features.coreReactivityFeature, { aggregationFns: n, columnMeta: r, coreRowModel: o, expandedRowModel: s, facetedMinMaxValues: i, facetedRowModel: l, facetedUniqueValues: c, filterFns: a, filterMeta: u, filteredRowModel: d, groupedRowModel: y, paginatedRowModel: v, sortFns: R, sortedRowModel: C, tableMeta: k, ...j } = e.features, M = {
    _cellInstanceInitFns: [],
    _columnInstanceInitFns: [],
    _features: {
      ...Sf,
      ...j
    },
    _headerGroupInstanceInitFns: [],
    _headerInstanceInitFns: [],
    _reactivity: t,
    _rowInstanceInitFns: [],
    _rowModelFns: {
      aggregationFns: n,
      filterFns: a,
      sortFns: R
    },
    _rowModels: {},
    atoms: {},
    baseAtoms: {}
  }, L = Object.values(M._features), I = {
    ...L.reduce(($, F) => {
      var U;
      return Object.assign($, (U = F.getDefaultTableOptions) == null ? void 0 : U.call(F, M));
    }, {}),
    ...e
  };
  if (t.wrapExternalAtoms && I.atoms) for (const [$, F] of Object.entries(I.atoms)) {
    const U = F, te = t.createWritableAtom(U.get(), { debugName: `externalAtom/${$}` });
    I.atoms[$] = te;
    let oe = !1;
    const fe = U.subscribe((ye) => {
      oe || te.set(ye);
    }), de = te.subscribe((ye) => {
      oe = !0, U.set(ye), oe = !1;
    });
    t.addSubscription(fe), t.addSubscription(de);
  }
  t.createOptionsStore ? (M.optionsStore = t.createWritableAtom(I, { debugName: "table/optionsStore" }), Object.defineProperty(M, "options", {
    configurable: !0,
    enumerable: !0,
    get() {
      return M.optionsStore.get();
    },
    set($) {
      M.optionsStore.set(() => $);
    }
  })) : M.options = I, M.initialState = Cf(M._features, M.options.initialState);
  const N = Object.keys(M.initialState);
  for (let $ = 0; $ < N.length; $++) {
    const F = N[$];
    M.baseAtoms[F] = t.createWritableAtom(M.initialState[F], { debugName: `table/baseAtoms/${F}` }), M.atoms[F] = t.createReadonlyAtom(() => {
      var de;
      const U = M.options, te = (de = U.atoms) == null ? void 0 : de[F], oe = te ? te.get() : M.baseAtoms[F].get();
      if (te) return oe;
      const fe = U.state;
      if (fe && Vt(fe, F)) {
        const ye = fe[F];
        return ye === void 0 ? M.initialState[F] : ye;
      }
      return oe;
    }, { debugName: `table/atoms/${F}` });
  }
  Bi(M), M.store = xf(t.createReadonlyAtom(() => {
    const $ = {};
    for (let F = 0; F < N.length; F++) {
      const U = N[F];
      $[U] = M.atoms[U].get();
    }
    return $;
  }, {
    compare: Rf,
    debugName: "table/store"
  }));
  for (let $ = 0; $ < L.length; $++) {
    const F = L[$];
    (B = F.initTableInstanceData) == null || B.call(F, M), F.initCellInstanceData && M._cellInstanceInitFns.push(F.initCellInstanceData.bind(F)), F.initColumnInstanceData && M._columnInstanceInitFns.push(F.initColumnInstanceData.bind(F)), F.initHeaderGroupInstanceData && M._headerGroupInstanceInitFns.push(F.initHeaderGroupInstanceData.bind(F)), F.initHeaderInstanceData && M._headerInstanceInitFns.push(F.initHeaderInstanceData.bind(F)), F.initRowInstanceData && M._rowInstanceInitFns.push(F.initRowInstanceData.bind(F)), (le = F.constructTableAPIs) == null || le.call(F, M);
  }
  return M;
}
const Pf = {
  getInitialState: (e) => ({
    expanded: Pu(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onExpandedChange: Ci("expanded", e),
    paginateExpandedRows: !0
  }),
  assignRowPrototype: (e, t) => {
    Nt("rowExpandingFeature", e, t, {
      row_toggleExpanded: { fn: (n, r) => $i(n, r) },
      row_getIsExpanded: { fn: (n) => nr(n) },
      row_getCanExpand: { fn: (n) => Mt(n) },
      row_getIsAllParentsExpanded: { fn: (n) => Au(n) },
      row_getToggleExpandedHandler: { fn: (n) => Tu(n) }
    });
  },
  constructTableAPIs: (e) => {
    Ot("rowExpandingFeature", e, {
      table_autoResetExpanded: { fn: () => ji(e) },
      table_setExpanded: { fn: (t) => Ln(e, t) },
      table_toggleAllRowsExpanded: { fn: (t) => Hi(e, t) },
      table_resetExpanded: { fn: (t) => ki(e, t) },
      table_getCanSomeRowsExpand: { fn: () => Li(e) },
      table_getToggleAllRowsExpandedHandler: { fn: () => Eu(e) },
      table_getIsSomeRowsExpanded: { fn: () => Ou(e) },
      table_getIsAllRowsExpanded: { fn: () => Ki(e) },
      table_getExpandedDepth: { fn: () => Iu(e) }
    });
  }
};
function Ef() {
  return re();
}
function Bt(e, t) {
  var n, r;
  (r = (n = e.options).onRowSelectionChange) == null || r.call(n, t);
}
function Of(e, t) {
  e._lastSelectedRowId = null, Bt(e, t ? re() : Object.assign(re(), ut(e.initialState.rowSelection ?? {})));
}
function Wi(e, t, n) {
  e._lastSelectedRowId = null, Bt(e, (r) => {
    if (t = typeof t < "u" ? t : !me(e, "getIsAllRowsSelected", qi), n != null && n.deselectAll && !t) return re();
    const o = Object.assign(re(), r), s = e.getPreGroupedRowModel().flatRows;
    if (t) {
      const i = /* @__PURE__ */ new Map();
      s.forEach((l) => {
        Kn(l, i) && (o[l.id] = !0);
      });
    } else s.forEach((i) => {
      nt(i) && delete o[i.id];
    });
    return o;
  });
}
function Ui(e, t, n) {
  e._lastSelectedRowId = null, Bt(e, (r) => {
    const o = typeof t < "u" ? t : !me(e, "getIsAllPageRowsSelected", zi);
    if (n != null && n.deselectAll && !o) return re();
    const s = Object.assign(re(), r);
    return e.getRowModel().rows.forEach((i) => {
      or(s, i.id, o, !0, e, !0);
    }), s;
  });
}
function If(e) {
  return e.getCoreRowModel();
}
function Af(e) {
  const t = e.getCoreRowModel();
  return me(e, "getIsSomeRowsSelected", rr) ? ao(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: re()
  };
}
function Tf(e) {
  const t = e.getFilteredRowModel();
  return me(e, "getIsSomeRowsSelected", rr) ? ao(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: re()
  };
}
function Df(e) {
  const t = e.getSortedRowModel();
  return me(e, "getIsSomeRowsSelected", rr) ? ao(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: re()
  };
}
function Gi(e) {
  var t;
  return Object.keys(((t = e.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function qi(e) {
  var o;
  const t = e.getFilteredRowModel().flatRows, n = ((o = e.atoms.rowSelection) == null ? void 0 : o.get()) ?? {};
  let r = !!(t.length && Object.keys(n).length);
  if (r) {
    const s = /* @__PURE__ */ new Map();
    t.some((i) => !mn(i, n) && Kn(i, s)) && (r = !1);
  }
  return r;
}
function zi(e) {
  var s;
  const t = e.getPaginatedRowModel().flatRows, n = ((s = e.atoms.rowSelection) == null ? void 0 : s.get()) ?? {}, r = /* @__PURE__ */ new Map();
  let o = !1;
  for (let i = 0; i < t.length; i++) {
    const l = t[i];
    if (mn(l, n))
      !o && Kn(l, r) && (o = !0);
    else if (Kn(l, r)) return !1;
  }
  return o;
}
function rr(e) {
  return me(e, "getSelectedRowIds", Gi).length > 0;
}
function Ff(e) {
  return e.getPaginatedRowModel().flatRows.filter((t) => nt(t)).some((t) => lo(t) || me(t, "getIsSomeSelected", Xi));
}
function jf(e) {
  return (t) => {
    Wi(e, t.target.checked);
  };
}
function Hf(e) {
  return (t) => {
    Ui(e, t.target.checked);
  };
}
function Yi(e, t, n) {
  const r = lo(e);
  Bt(e.table, (o) => {
    t = typeof t < "u" ? t : !r;
    const s = Object.assign(re(), o);
    return or(s, e.id, t, ((n == null ? void 0 : n.selectChildren) ?? !0) && Rt(e), e.table), !t && (n != null && n.deselectParents) && Ji(s, e), s;
  });
}
function lo(e) {
  var t;
  return mn(e, ((t = e.table.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function Xi(e) {
  return uo(e) === "some";
}
function kf(e) {
  return uo(e) === "all";
}
function nt(e) {
  const t = e.table.options;
  return typeof t.enableRowSelection == "function" ? t.enableRowSelection(e) : t.enableRowSelection ?? !0;
}
function co(e) {
  const t = e.table.options;
  return typeof t.enableSubRowSelection == "function" ? t.enableSubRowSelection(e) : t.enableSubRowSelection ?? !0;
}
function Rt(e) {
  const t = e.table.options;
  return typeof t.enableMultiRowSelection == "function" ? t.enableMultiRowSelection(e) : t.enableMultiRowSelection ?? !0;
}
function Lf(e, t) {
  const n = nt(e);
  return (r) => {
    var c, a;
    if (!n) return;
    const o = r, s = e.table, i = o.target.checked, l = s._lastSelectedRowId;
    (!(s.options.enableRowRangeSelection !== !1 && l !== null && Rt(e) && (((a = (c = s.options).isRowRangeSelectionEvent) == null ? void 0 : a.call(c, r)) ?? !1)) || !Kf(e, l, i, t)) && Yi(e, i, t), s._lastSelectedRowId = e.id;
  };
}
function Kf(e, t, n, r) {
  const o = (r == null ? void 0 : r.selectChildren) ?? !0, s = e.table, i = s.getRowsInDisplayOrder(), l = s.getPrePaginatedRowModel().rowsById[t] ?? s.getCoreRowModel().rowsById[t];
  if (!l) return !1;
  const c = l.getDisplayIndex(), a = e.getDisplayIndex(), u = i[c], d = i[a];
  if (c < 0 || a < 0 || c >= i.length || a >= i.length || (u == null ? void 0 : u.id) !== l.id || (d == null ? void 0 : d.id) !== e.id || !Rt(l) || !Rt(e)) return !1;
  const y = Math.min(c, a), v = Math.max(c, a);
  return Bt(s, (R) => {
    const C = Object.assign(re(), R);
    for (let k = y; k <= v; k++) {
      const j = i[k];
      !nt(j) || !Rt(j) || (or(C, j.id, n, o, s), !n && (r != null && r.deselectParents) && Ji(C, j));
    }
    return C;
  }), !0;
}
function or(e, t, n, r, o, s) {
  const i = o.getRow(t, !0);
  n ? (Rt(i) || Object.keys(e).forEach((l) => delete e[l]), nt(i) && (e[t] = !0)) : (!s || nt(i)) && delete e[t], r && i.subRows.length && co(i) && i.subRows.forEach((l) => or(e, l.id, n, r, o, s));
}
function Kn(e, t) {
  if (!nt(e)) return !1;
  const n = e.table;
  if (n.options.enableSubRowSelection === !0) return !0;
  const r = e.parentId;
  if (r === void 0) return !0;
  const o = t.get(r);
  if (o !== void 0) return o;
  const s = n.getCoreRowModel().rowsById, i = [];
  let l = !0, c = r;
  for (; c !== void 0; ) {
    const a = t.get(c);
    if (a !== void 0) {
      l = a;
      break;
    }
    i.push(c);
    const u = s[c] ?? n.getRow(c, !0);
    if (!co(u)) {
      l = !1;
      break;
    }
    c = u.parentId;
  }
  return i.forEach((a) => t.set(a, l)), l;
}
function Ji(e, t) {
  const n = t.table.getCoreRowModel().rowsById;
  let r = t.parentId;
  for (; r !== void 0; )
    delete e[r], r = (n[r] ?? t.table.getRow(r, !0)).parentId;
}
function Zi(e, t, n, r) {
  const o = [];
  for (let s = 0; s < e.length; s++) {
    const i = e[s], l = mn(i, t);
    if (l && (n.push(i), r[i.id] = i), i.subRows.length) {
      const c = Zi(i.subRows, t, n, r);
      if (l) {
        const a = Object.create(Object.getPrototypeOf(i));
        $a(a, i), a.subRows = c, o.push(a);
      }
    } else l && o.push(i);
  }
  return o;
}
function ao(e, t) {
  var s;
  const n = [], r = re(), o = ((s = t.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  return {
    rows: Zi(e.rows, o, n, r),
    flatRows: n,
    rowsById: r
  };
}
function mn(e, t) {
  return !!(Vt(t, e.id) && t[e.id]);
}
function uo(e) {
  var s;
  if (!e.subRows.length) return !1;
  const t = ((s = e.table.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  let n = !1, r = !0, o = !1;
  for (let i = 0; i < e.subRows.length; i++) {
    const l = e.subRows[i];
    if (n && !r) break;
    if (nt(l) && (o = !0, mn(l, t) ? n = !0 : r = !1), l.subRows.length) {
      const c = uo(l);
      c === "all" ? (n = !0, o = !0) : c === "some" ? (n = !0, r = !1, o = !0) : r = !1;
    }
  }
  return o ? r ? "all" : n ? "some" : !1 : !1;
}
const $f = {
  initTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  resetTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  getInitialState: (e) => ({
    rowSelection: Ef(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onRowSelectionChange: Ci("rowSelection", e),
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
    Nt("rowSelectionFeature", e, t, {
      row_toggleSelected: { fn: (n, r, o) => Yi(n, r, o) },
      row_getIsSelected: { fn: (n) => lo(n) },
      row_getIsSomeSelected: {
        fn: (n) => Xi(n),
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
        fn: (n) => kf(n),
        memoDeps: (n) => {
          var r;
          return [
            n.subRows,
            (r = n.table.atoms.rowSelection) == null ? void 0 : r.get(),
            n.table.options.enableRowSelection
          ];
        }
      },
      row_getCanSelect: { fn: (n) => nt(n) },
      row_getCanSelectSubRows: { fn: (n) => co(n) },
      row_getCanMultiSelect: { fn: (n) => Rt(n) },
      row_getToggleSelectedHandler: { fn: (n, r) => Lf(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    Ot("rowSelectionFeature", e, {
      table_setRowSelection: { fn: (t) => Bt(e, t) },
      table_resetRowSelection: { fn: (t) => Of(e, t) },
      table_toggleAllRowsSelected: { fn: (t, n) => Wi(e, t, n) },
      table_toggleAllPageRowsSelected: { fn: (t, n) => Ui(e, t, n) },
      table_getPreSelectedRowModel: { fn: () => If(e) },
      table_getSelectedRowModel: {
        fn: () => Af(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getCoreRowModel()];
        }
      },
      table_getFilteredSelectedRowModel: {
        fn: () => Tf(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getFilteredRowModel()];
        }
      },
      table_getGroupedSelectedRowModel: {
        fn: () => Df(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getSortedRowModel()];
        }
      },
      table_getSelectedRowIds: {
        fn: () => Gi(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get()];
        }
      },
      table_getIsAllRowsSelected: {
        fn: () => qi(e),
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
        fn: () => zi(e),
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
        fn: () => rr(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get()];
        }
      },
      table_getIsSomePageRowsSelected: {
        fn: () => Ff(e),
        memoDeps: () => {
          var t;
          return [
            (t = e.atoms.rowSelection) == null ? void 0 : t.get(),
            e.getPaginatedRowModel(),
            e.options.enableRowSelection
          ];
        }
      },
      table_getToggleAllRowsSelectedHandler: { fn: () => jf(e) },
      table_getToggleAllPageRowsSelectedHandler: { fn: () => Hf(e) }
    });
  }
};
function Vf() {
  return (e) => {
    const t = e;
    return tr({
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
      fn: () => Nf(t)
    });
  };
}
function Nf(e) {
  var r;
  const t = e.getPreExpandedRowModel(), n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return !t.rows.length || n !== !0 && !Object.keys(n ?? {}).length || !e.options.paginateExpandedRows && !e.options.manualPagination ? t : Bf(t);
}
function Bf(e) {
  const t = [], n = (r) => {
    t.push(r), r.subRows.length && nr(r) && r.subRows.forEach(n);
  };
  return e.rows.forEach(n), {
    rows: t,
    flatRows: e.flatRows,
    rowsById: e.rowsById
  };
}
function Xo(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = Ht(e[n]);
  return Lr(e, t);
}
function Wf(e) {
  return Object.keys(e).map((t) => Ht(e[t]));
}
function Uf(e) {
  const t = (l, c) => {
    l.setOptions((a) => Uo(a, Xo(c)));
  }, n = Ka(), r = Lr(e, { features: {
    coreReactivityFeature: n,
    ...Ht(e.features) ?? {}
  } }), o = Lr(Xo(r), { mergeOptions: (l, c) => Uo(l, c) }), s = Mf(o), i = s;
  return xs() && Rl(() => {
    var l;
    return (l = n.unmount) == null ? void 0 : l.call(n);
  }), Pe(() => Wf(r), () => {
    t(s, r);
  }, { immediate: !0 }), Pe(() => {
    const l = Ht(e.state), c = Ht(e.atoms);
    if (!l) return [];
    const a = [];
    for (const u of Object.keys(i.initialState))
      !(u in l) || (c == null ? void 0 : c[u]) !== void 0 || a.push(l[u]);
    return a;
  }, (l) => {
    l.length > 0 && t(s, r);
  }, { immediate: !0 }), i.Subscribe = (l) => l.children(i.atoms), i;
}
function sr() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return function() {
    t.forEach(function(o) {
      return o();
    });
  };
}
function Gf(e) {
  if (Array.isArray(e)) return e;
}
function qf(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r, o, s, i, l = [], c = !0, a = !1;
    try {
      if (s = (n = n.call(e)).next, t !== 0) for (; !(c = (r = s.call(n)).done) && (l.push(r.value), l.length !== t); c = !0) ;
    } catch (u) {
      a = !0, o = u;
    } finally {
      try {
        if (!c && n.return != null && (i = n.return(), Object(i) !== i)) return;
      } finally {
        if (a) throw o;
      }
    }
    return l;
  }
}
function Vr(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Qi(e, t) {
  if (e) {
    if (typeof e == "string") return Vr(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Vr(e, t) : void 0;
  }
}
function zf() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function el(e, t) {
  return Gf(e) || qf(e, t) || Qi(e, t) || zf();
}
var Jo = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Pt = {}, yn = {};
Object.defineProperty(yn, "__esModule", { value: !0 });
yn.bind = void 0;
function Yf(e, t) {
  var n = t.type, r = t.listener, o = t.options;
  return e.addEventListener(n, r, o), function() {
    e.removeEventListener(n, r, o);
  };
}
yn.bind = Yf;
var ir = {}, Dt = Jo && Jo.__assign || function() {
  return Dt = Object.assign || function(e) {
    for (var t, n = 1, r = arguments.length; n < r; n++) {
      t = arguments[n];
      for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    }
    return e;
  }, Dt.apply(this, arguments);
};
Object.defineProperty(ir, "__esModule", { value: !0 });
ir.bindAll = void 0;
var Xf = yn;
function Zo(e) {
  if (!(typeof e > "u"))
    return typeof e == "boolean" ? {
      capture: e
    } : e;
}
function Jf(e, t) {
  if (t == null)
    return e;
  var n = Dt(Dt({}, e), { options: Dt(Dt({}, Zo(t)), Zo(e.options)) });
  return n;
}
function Zf(e, t, n) {
  var r = t.map(function(o) {
    var s = Jf(o, n);
    return (0, Xf.bind)(e, s);
  });
  return function() {
    r.forEach(function(s) {
      return s();
    });
  };
}
ir.bindAll = Zf;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.bindAll = e.bind = void 0;
  var t = yn;
  Object.defineProperty(e, "bind", { enumerable: !0, get: function() {
    return t.bind;
  } });
  var n = ir;
  Object.defineProperty(e, "bindAll", { enumerable: !0, get: function() {
    return n.bindAll;
  } });
})(Pt);
var tl = "data-pdnd-honey-pot";
function nl(e) {
  return e instanceof Element && e.hasAttribute(tl);
}
function rl(e) {
  var t = document.elementsFromPoint(e.x, e.y), n = el(t, 2), r = n[0], o = n[1];
  return r ? nl(r) ? o ?? null : r : null;
}
function fn(e) {
  "@babel/helpers - typeof";
  return fn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, fn(e);
}
function Qf(e, t) {
  if (fn(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (fn(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function ed(e) {
  var t = Qf(e, "string");
  return fn(t) == "symbol" ? t : t + "";
}
function vn(e, t, n) {
  return (t = ed(t)) in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var td = 2147483647, nd = {
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
function It(e) {
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
var _r = It(function() {
  return typeof HTMLElement < "u" && typeof HTMLElement.prototype.showPopover == "function";
});
function Qo(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function es(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Qo(Object(n), !0).forEach(function(r) {
      vn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Qo(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
var dn = 2, ts = dn / 2;
function rd(e) {
  return {
    x: Math.floor(e.x),
    y: Math.floor(e.y)
  };
}
function od(e) {
  return {
    x: e.x - ts,
    y: e.y - ts
  };
}
function sd(e) {
  return {
    x: Math.max(e.x, 0),
    y: Math.max(e.y, 0)
  };
}
function id(e) {
  return {
    x: Math.min(e.x, window.innerWidth - dn),
    y: Math.min(e.y, window.innerHeight - dn)
  };
}
function ns(e) {
  var t = e.client, n = id(sd(od(rd(t))));
  return DOMRect.fromRect({
    x: n.x,
    y: n.y,
    width: dn,
    height: dn
  });
}
function rs(e) {
  var t = e.clientRect;
  return {
    left: "".concat(t.left, "px"),
    top: "".concat(t.top, "px"),
    width: "".concat(t.width, "px"),
    height: "".concat(t.height, "px")
  };
}
function ld(e) {
  var t = e.client, n = e.clientRect;
  return (
    // is within horizontal bounds
    t.x >= n.x && t.x <= n.x + n.width && // is within vertical bounds
    t.y >= n.y && t.y <= n.y + n.height
  );
}
function cd(e) {
  var t = e.initial, n = document.createElement("div");
  n.setAttribute(tl, "true"), _r() && n.setAttribute("popover", "manual");
  var r = ns({
    client: t
  });
  Object.assign(n.style, es(es({
    position: "fixed"
  }, _r() ? (
    // needs to come first as it has 'inset: unset' which
    // needs to be overridden by our top / left values
    nd
  ) : {
    // Fallback: using maximum possible z-index so that this element
    // will always be on top of other positioned content.
    zIndex: td
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
  }, rs({
    clientRect: r
  }))), document.body.appendChild(n), _r() && n.showPopover();
  var o = Pt.bind(window, {
    type: "pointermove",
    listener: function(i) {
      var l = {
        x: i.clientX,
        y: i.clientY
      };
      r = ns({
        client: l
      }), Object.assign(n.style, rs({
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
    if (o(), ld({
      client: l,
      clientRect: r
    })) {
      n.remove();
      return;
    }
    function c() {
      a(), n.remove();
    }
    var a = Pt.bindAll(window, [
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
function ad() {
  var e = null;
  function t() {
    return e = null, Pt.bind(window, {
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
        var c = l.location.initial.input, a = e ?? {
          x: c.clientX,
          y: c.clientY
        };
        r = cd({
          initial: a
        });
      }
      if (i === "onDrop") {
        var u, d = l.location.current.input;
        (u = r) === null || u === void 0 || u({
          current: {
            x: d.clientX,
            y: d.clientY
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
function ud(e) {
  if (Array.isArray(e)) return Vr(e);
}
function fd(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function dd() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ol(e) {
  return ud(e) || fd(e) || Qi(e) || dd();
}
var pd = It(function() {
  return navigator.userAgent.includes("Firefox");
}), fo = It(function() {
  var t = navigator, n = t.userAgent;
  return n.includes("AppleWebKit") && !n.includes("Chrome");
});
function gd(e) {
  return "nodeName" in e;
}
function hd(e) {
  return gd(e) && e.ownerDocument !== document;
}
var Nr = {
  isLeavingWindow: Symbol("leaving"),
  isEnteringWindow: Symbol("entering")
};
(function() {
  if (typeof window > "u" || !fo())
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
  Pt.bindAll(
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
        !n.isOverWindow && n.enterCount === 0 && (s[Nr.isEnteringWindow] = !0), n.isOverWindow = !0, n.enterCount++;
      }
    }, {
      type: "dragleave",
      listener: function(s) {
        n.enterCount--, n.isOverWindow && n.enterCount === 0 && (s[Nr.isLeavingWindow] = !0, n.isOverWindow = !1);
      }
    }],
    // using `capture: true` so that adding event listeners
    // in bubble phase will have the correct symbols
    {
      capture: !0
    }
  );
})();
function md(e) {
  var t = e.dragLeave;
  return fo() ? t.hasOwnProperty(Nr.isLeavingWindow) : !1;
}
function yd(e) {
  var t = e.dragLeave, n = t.type, r = t.relatedTarget;
  return n !== "dragleave" ? !1 : fo() ? md({
    dragLeave: t
  }) : r == null ? !0 : pd() ? hd(r) : r instanceof HTMLIFrameElement;
}
function vd(e) {
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
function rn(e) {
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
var wd = function(t) {
  var n = [], r = null, o = function() {
    for (var i = arguments.length, l = new Array(i), c = 0; c < i; c++)
      l[c] = arguments[c];
    n = l, !r && (r = requestAnimationFrame(function() {
      r = null, t.apply(void 0, n);
    }));
  };
  return o.cancel = function() {
    r && (cancelAnimationFrame(r), r = null);
  }, o;
}, Sr = wd(function(e) {
  return e();
}), Cn = /* @__PURE__ */ function() {
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
function bd(e) {
  var t = e.source, n = e.initial, r = e.dispatchEvent, o = {
    dropTargets: []
  };
  function s(l) {
    r(l), o = {
      dropTargets: l.payload.location.current.dropTargets
    };
  }
  var i = {
    start: function(c) {
      var a = c.nativeSetDragImage, u = {
        current: n,
        previous: o,
        initial: n
      };
      s({
        eventName: "onGenerateDragPreview",
        payload: {
          source: t,
          location: u,
          nativeSetDragImage: a
        }
      }), Cn.schedule(function() {
        s({
          eventName: "onDragStart",
          payload: {
            source: t,
            location: u
          }
        });
      });
    },
    dragUpdate: function(c) {
      var a = c.current;
      Cn.flush(), Sr.cancel(), s({
        eventName: "onDropTargetChange",
        payload: {
          source: t,
          location: {
            initial: n,
            previous: o,
            current: a
          }
        }
      });
    },
    drag: function(c) {
      var a = c.current;
      Sr(function() {
        Cn.flush();
        var u = {
          initial: n,
          previous: o,
          current: a
        };
        s({
          eventName: "onDrag",
          payload: {
            source: t,
            location: u
          }
        });
      });
    },
    drop: function(c) {
      var a = c.current, u = c.updatedSourcePayload;
      Cn.flush(), Sr.cancel(), s({
        eventName: "onDrop",
        payload: {
          source: u ?? t,
          location: {
            current: a,
            previous: o,
            initial: n
          }
        }
      });
    }
  };
  return i;
}
var Br = {
  isActive: !1
};
function sl() {
  return !Br.isActive;
}
function _d(e) {
  return e.dataTransfer ? e.dataTransfer.setDragImage.bind(e.dataTransfer) : null;
}
function Sd(e) {
  var t = e.current, n = e.next;
  if (t.length !== n.length)
    return !0;
  for (var r = 0; r < t.length; r++)
    if (t[r].element !== n[r].element)
      return !0;
  return !1;
}
function xd(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = e.dispatchEvent;
  if (!sl())
    return;
  var s = Rd({
    event: t,
    dragType: n,
    getDropTargetsOver: r
  });
  Br.isActive = !0;
  var i = {
    current: s
  };
  xr({
    event: t,
    current: s.dropTargets
  });
  var l = bd({
    source: n.payload,
    dispatchEvent: o,
    initial: s
  });
  function c(v) {
    var R = Sd({
      current: i.current.dropTargets,
      next: v.dropTargets
    });
    i.current = v, R && l.dragUpdate({
      current: i.current
    });
  }
  function a(v) {
    var R = rn(v), C = nl(v.target) ? rl({
      x: R.clientX,
      y: R.clientY
    }) : v.target, k = r({
      target: C,
      input: R,
      source: n.payload,
      current: i.current.dropTargets
    });
    k.length && (v.preventDefault(), xr({
      event: v,
      current: k
    })), c({
      dropTargets: k,
      input: R
    });
  }
  function u() {
    i.current.dropTargets.length && c({
      dropTargets: [],
      input: i.current.input
    }), l.drop({
      current: i.current,
      updatedSourcePayload: null
    }), d();
  }
  function d() {
    Br.isActive = !1, y();
  }
  var y = Pt.bindAll(
    window,
    [{
      // 👋 Note: we are repurposing the `dragover` event as our `drag` event
      // this is because firefox does not publish pointer coordinates during
      // a `drag` event, but does for every other type of drag event
      // `dragover` fires on all elements that are being dragged over
      // Because we are binding to `window` - our `dragover` is effectively the same as a `drag`
      // 🦊😤
      type: "dragover",
      listener: function(R) {
        a(R), l.drag({
          current: i.current
        });
      }
    }, {
      type: "dragenter",
      listener: a
    }, {
      type: "dragleave",
      listener: function(R) {
        yd({
          dragLeave: R
        }) && (c({
          input: i.current.input,
          dropTargets: []
        }), n.startedFrom === "external" && u());
      }
    }, {
      // A "drop" can only happen if the browser allowed the drop
      type: "drop",
      listener: function(R) {
        if (i.current = {
          dropTargets: i.current.dropTargets,
          input: rn(R)
        }, !i.current.dropTargets.length) {
          u();
          return;
        }
        R.preventDefault(), xr({
          event: R,
          current: i.current.dropTargets
        }), l.drop({
          current: i.current,
          // When dropping something native, we need to extract the latest
          // `.items` from the "drop" event as it is now accessible
          updatedSourcePayload: n.type === "external" ? n.getDropPayload(R) : null
        }), d();
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
      listener: function(R) {
        i.current = {
          dropTargets: i.current.dropTargets,
          input: rn(R)
        }, u();
      }
    }].concat(ol(vd({
      onDragEnd: u
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
    nativeSetDragImage: _d(t)
  });
}
function xr(e) {
  var t, n = e.event, r = e.current, o = (t = r[0]) === null || t === void 0 ? void 0 : t.dropEffect;
  o != null && n.dataTransfer && (n.dataTransfer.dropEffect = o);
}
function Rd(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = rn(t);
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
var os = {
  canStart: sl,
  start: xd
}, Wr = /* @__PURE__ */ new Map();
function Cd(e) {
  var t = e.typeKey, n = e.mount, r = Wr.get(t);
  if (r)
    return r.usageCount++, r;
  var o = {
    typeKey: t,
    unmount: n(),
    usageCount: 1
  };
  return Wr.set(t, o), o;
}
function Md(e) {
  var t = Cd(e);
  return function() {
    t.usageCount--, !(t.usageCount > 0) && (t.unmount(), Wr.delete(e.typeKey));
  };
}
function il(e, t) {
  var n = t.attribute, r = t.value;
  return e.setAttribute(n, r), function() {
    return e.removeAttribute(n);
  };
}
function ss(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function it(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ss(Object(n), !0).forEach(function(r) {
      vn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ss(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Rr(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = Pd(e)) || t) {
      n && (e = n);
      var r = 0, o = function() {
      };
      return { s: o, n: function() {
        return r >= e.length ? { done: !0 } : { done: !1, value: e[r++] };
      }, e: function(a) {
        throw a;
      }, f: o };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var s, i = !0, l = !1;
  return { s: function() {
    n = n.call(e);
  }, n: function() {
    var a = n.next();
    return i = a.done, a;
  }, e: function(a) {
    l = !0, s = a;
  }, f: function() {
    try {
      i || n.return == null || n.return();
    } finally {
      if (l) throw s;
    }
  } };
}
function Pd(e, t) {
  if (e) {
    if (typeof e == "string") return is(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? is(e, t) : void 0;
  }
}
function is(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Cr(e) {
  return e.slice(0).reverse();
}
function Ed(e) {
  var t = e.typeKey, n = e.defaultDropEffect, r = /* @__PURE__ */ new WeakMap(), o = "data-drop-target-for-".concat(t), s = "[".concat(o, "]");
  function i(v) {
    return r.set(v.element, v), function() {
      return r.delete(v.element);
    };
  }
  function l(v) {
    var R = sr(il(v.element, {
      attribute: o,
      value: "true"
    }), i(v));
    return It(R);
  }
  function c(v) {
    var R, C, k, j, M = v.source, L = v.target, I = v.input, N = v.result, B = N === void 0 ? [] : N;
    if (L == null)
      return B;
    if (!(L instanceof Element))
      return L instanceof Node ? c({
        source: M,
        target: L.parentElement,
        input: I,
        result: B
      }) : B;
    var le = L.closest(s);
    if (le == null)
      return B;
    var $ = r.get(le);
    if ($ == null)
      return B;
    var F = {
      input: I,
      source: M,
      element: $.element
    };
    if ($.canDrop && !$.canDrop(F))
      return c({
        source: M,
        target: $.element.parentElement,
        input: I,
        result: B
      });
    var U = (R = (C = $.getData) === null || C === void 0 ? void 0 : C.call($, F)) !== null && R !== void 0 ? R : {}, te = (k = (j = $.getDropEffect) === null || j === void 0 ? void 0 : j.call($, F)) !== null && k !== void 0 ? k : n, oe = {
      data: U,
      element: $.element,
      dropEffect: te,
      // we are collecting _actual_ drop targets, so these are
      // being applied _not_ due to stickiness
      isActiveDueToStickiness: !1
    };
    return c({
      source: M,
      target: $.element.parentElement,
      input: I,
      // Using bubble ordering. Same ordering as `event.getPath()`
      result: [].concat(ol(B), [oe])
    });
  }
  function a(v) {
    var R = v.eventName, C = v.payload, k = Rr(C.location.current.dropTargets), j;
    try {
      for (k.s(); !(j = k.n()).done; ) {
        var M, L = j.value, I = r.get(L.element), N = it(it({}, C), {}, {
          self: L
        });
        I == null || (M = I[R]) === null || M === void 0 || M.call(
          I,
          // I cannot seem to get the types right here.
          // TS doesn't seem to like that one event can need `nativeSetDragImage`
          // @ts-expect-error
          N
        );
      }
    } catch (B) {
      k.e(B);
    } finally {
      k.f();
    }
  }
  var u = {
    onGenerateDragPreview: a,
    onDrag: a,
    onDragStart: a,
    onDrop: a,
    onDropTargetChange: function(R) {
      var C = R.payload, k = new Set(C.location.current.dropTargets.map(function(Y) {
        return Y.element;
      })), j = /* @__PURE__ */ new Set(), M = Rr(C.location.previous.dropTargets), L;
      try {
        for (M.s(); !(L = M.n()).done; ) {
          var I, N = L.value;
          j.add(N.element);
          var B = r.get(N.element), le = k.has(N.element), $ = it(it({}, C), {}, {
            self: N
          });
          if (B == null || (I = B.onDropTargetChange) === null || I === void 0 || I.call(B, $), !le) {
            var F;
            B == null || (F = B.onDragLeave) === null || F === void 0 || F.call(B, $);
          }
        }
      } catch (Y) {
        M.e(Y);
      } finally {
        M.f();
      }
      var U = Rr(C.location.current.dropTargets), te;
      try {
        for (U.s(); !(te = U.n()).done; ) {
          var oe, fe, de = te.value;
          if (!j.has(de.element)) {
            var ye = it(it({}, C), {}, {
              self: de
            }), ne = r.get(de.element);
            ne == null || (oe = ne.onDropTargetChange) === null || oe === void 0 || oe.call(ne, ye), ne == null || (fe = ne.onDragEnter) === null || fe === void 0 || fe.call(ne, ye);
          }
        }
      } catch (Y) {
        U.e(Y);
      } finally {
        U.f();
      }
    }
  };
  function d(v) {
    u[v.eventName](v);
  }
  function y(v) {
    var R = v.source, C = v.target, k = v.input, j = v.current, M = c({
      source: R,
      target: C,
      input: k
    });
    if (M.length >= j.length)
      return M;
    for (var L = Cr(j), I = Cr(M), N = [], B = 0; B < L.length; B++) {
      var le, $ = L[B], F = I[B];
      if (F != null) {
        N.push(F);
        continue;
      }
      var U = N[B - 1], te = L[B - 1];
      if ((U == null ? void 0 : U.element) !== (te == null ? void 0 : te.element))
        break;
      var oe = r.get($.element);
      if (!oe)
        break;
      var fe = {
        input: k,
        source: R,
        element: oe.element
      };
      if (oe.canDrop && !oe.canDrop(fe) || !((le = oe.getIsSticky) !== null && le !== void 0 && le.call(oe, fe)))
        break;
      N.push(it(it({}, $), {}, {
        // making it clear to consumers this drop target is active due to stickiness
        isActiveDueToStickiness: !0
      }));
    }
    return Cr(N);
  }
  return {
    dropTargetForConsumers: l,
    getIsOver: y,
    dispatchEvent: d
  };
}
function Od(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = Id(e)) || t) {
      n && (e = n);
      var r = 0, o = function() {
      };
      return { s: o, n: function() {
        return r >= e.length ? { done: !0 } : { done: !1, value: e[r++] };
      }, e: function(a) {
        throw a;
      }, f: o };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var s, i = !0, l = !1;
  return { s: function() {
    n = n.call(e);
  }, n: function() {
    var a = n.next();
    return i = a.done, a;
  }, e: function(a) {
    l = !0, s = a;
  }, f: function() {
    try {
      i || n.return == null || n.return();
    } finally {
      if (l) throw s;
    }
  } };
}
function Id(e, t) {
  if (e) {
    if (typeof e == "string") return ls(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? ls(e, t) : void 0;
  }
}
function ls(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function cs(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Ad(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? cs(Object(n), !0).forEach(function(r) {
      vn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : cs(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Td() {
  var e = /* @__PURE__ */ new Set(), t = null;
  function n(s) {
    t && (!s.canMonitor || s.canMonitor(t.canMonitorArgs)) && t.active.add(s);
  }
  function r(s) {
    var i = Ad({}, s);
    e.add(i), n(i);
    function l() {
      e.delete(i), t && t.active.delete(i);
    }
    return It(l);
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
      var c = Od(e), a;
      try {
        for (c.s(); !(a = c.n()).done; ) {
          var u = a.value;
          n(u);
        }
      } catch (k) {
        c.e(k);
      } finally {
        c.f();
      }
    }
    if (t) {
      for (var d = Array.from(t.active), y = 0, v = d; y < v.length; y++) {
        var R = v[y];
        if (t.active.has(R)) {
          var C;
          (C = R[i]) === null || C === void 0 || C.call(R, l);
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
function Dd(e) {
  var t = e.typeKey, n = e.mount, r = e.dispatchEventToSource, o = e.onPostDispatch, s = e.defaultDropEffect, i = Td(), l = Ed({
    typeKey: t,
    defaultDropEffect: s
  });
  function c(d) {
    r == null || r(d), l.dispatchEvent(d), i.dispatchEvent(d), o == null || o(d);
  }
  function a(d) {
    var y = d.event, v = d.dragType;
    os.start({
      event: y,
      dragType: v,
      getDropTargetsOver: l.getIsOver,
      dispatchEvent: c
    });
  }
  function u() {
    function d() {
      var y = {
        canStart: os.canStart,
        start: a
      };
      return n(y);
    }
    return Md({
      typeKey: t,
      mount: d
    });
  }
  return {
    registerUsage: u,
    dropTarget: l.dropTargetForConsumers,
    monitor: i.monitorForConsumers
  };
}
var Fd = It(function() {
  return navigator.userAgent.toLocaleLowerCase().includes("android");
}), jd = "pdnd:android-fallback", as = "text/plain", Hd = "text/uri-list", kd = "application/vnd.pdnd", $n = /* @__PURE__ */ new WeakMap();
function Ld(e) {
  return $n.set(e.element, e), function() {
    $n.delete(e.element);
  };
}
var us = ad(), ll = Dd({
  typeKey: "element",
  defaultDropEffect: "move",
  mount: function(t) {
    return sr(us.bindEvents(), Pt.bind(document, {
      type: "dragstart",
      listener: function(r) {
        var o, s, i, l, c, a;
        if (t.canStart(r) && !r.defaultPrevented && r.dataTransfer) {
          var u = r.target;
          if (u instanceof HTMLElement) {
            var d = $n.get(u);
            if (d) {
              var y = rn(r), v = {
                element: d.element,
                dragHandle: (o = d.dragHandle) !== null && o !== void 0 ? o : null,
                input: y
              };
              if (d.canDrag && !d.canDrag(v)) {
                r.preventDefault();
                return;
              }
              if (d.dragHandle) {
                var R = rl({
                  x: y.clientX,
                  y: y.clientY
                });
                if (!d.dragHandle.contains(R)) {
                  r.preventDefault();
                  return;
                }
              }
              var C = (s = (i = d.getInitialDataForExternal) === null || i === void 0 ? void 0 : i.call(d, v)) !== null && s !== void 0 ? s : null;
              if (C)
                for (var k = 0, j = Object.entries(C); k < j.length; k++) {
                  var M = el(j[k], 2), L = M[0], I = M[1];
                  r.dataTransfer.setData(L, I ?? "");
                }
              Fd() && !r.dataTransfer.types.includes(as) && !r.dataTransfer.types.includes(Hd) && r.dataTransfer.setData(as, jd), r.dataTransfer.setData(kd, "");
              var N = {
                element: d.element,
                dragHandle: (l = d.dragHandle) !== null && l !== void 0 ? l : null,
                data: (c = (a = d.getInitialData) === null || a === void 0 ? void 0 : a.call(d, v)) !== null && c !== void 0 ? c : {}
              }, B = {
                type: "element",
                payload: N,
                startedFrom: "internal"
              };
              t.start({
                event: r,
                dragType: B
              });
            }
          }
        }
      }
    }));
  },
  dispatchEventToSource: function(t) {
    var n, r, o = t.eventName, s = t.payload;
    (n = $n.get(s.source.element)) === null || n === void 0 || (r = n[o]) === null || r === void 0 || r.call(
      n,
      // I cannot seem to get the types right here.
      // TS doesn't seem to like that one event can need `nativeSetDragImage`
      // @ts-expect-error
      s
    );
  },
  onPostDispatch: us.getOnPostDispatch()
}), Kd = ll.dropTarget;
function $d(e) {
  var t = sr(
    // making the draggable register the adapter rather than drop targets
    // this is because you *must* have a draggable element to start a drag
    // but you _might_ not have any drop targets immediately
    // (You might create drop targets async)
    ll.registerUsage(),
    Ld(e),
    il(e.element, {
      attribute: "draggable",
      value: "true"
    })
  );
  return It(t);
}
function Vd(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
    if (t.indexOf(r) !== -1) continue;
    n[r] = e[r];
  }
  return n;
}
function Nd(e, t) {
  if (e == null) return {};
  var n, r, o = Vd(e, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    for (r = 0; r < s.length; r++) n = s[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (o[n] = e[n]);
  }
  return o;
}
function cl(e, t) {
  var n = Object.keys(e), r = Object.keys(t);
  return n.length !== r.length ? !1 : n.every(function(o) {
    return Object.is(e[o], t[o]);
  });
}
function Bd() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : cl, t = null;
  return function(n) {
    return t && e(t.value, n) || (t = {
      value: n
    }), t.value;
  };
}
var Wd = ["block"];
function fs(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function ds(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? fs(Object(n), !0).forEach(function(r) {
      vn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : fs(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Ud(e) {
  return {
    x: (e.right + e.left) / 2,
    y: (e.bottom + e.top) / 2
  };
}
function Mr(e) {
  var t = e.client, n = e.borderBox, r = n.height / 4;
  return t.y <= n.top + r ? "reorder-above" : t.y >= n.bottom - r ? "reorder-below" : "make-child";
}
function Gd(e) {
  var t = e.element, n = e.input, r = e.currentLevel, o = e.indentPerLevel, s = e.mode, i = {
    x: n.clientX,
    y: n.clientY
  }, l = t.getBoundingClientRect();
  if (s === "standard") {
    var c = Mr({
      borderBox: l,
      client: i
    });
    return {
      type: c,
      indentPerLevel: o,
      currentLevel: r
    };
  }
  var a = Ud(l);
  if (s === "expanded") {
    var u = Mr({
      borderBox: l,
      client: i
    });
    return {
      // Use the "standard" hitbox for "reorder above",
      // The rest of the item is "make-child"
      type: u === "reorder-above" ? u : "make-child",
      indentPerLevel: o,
      currentLevel: r
    };
  }
  var d = o * r;
  if (i.x < l.left + d) {
    if (i.y < a.y)
      return {
        type: "reorder-above",
        indentPerLevel: o,
        currentLevel: r
      };
    var y = (i.x - l.left) / o, v = Math.max(Math.floor(y), 0);
    return {
      type: "reparent",
      desiredLevel: v,
      indentPerLevel: o,
      currentLevel: r
    };
  }
  return {
    type: Mr({
      borderBox: l,
      client: i
    }),
    indentPerLevel: o,
    currentLevel: r
  };
}
function al(e, t) {
  return e.type !== t.type ? !1 : e.type === "instruction-blocked" && t.type === "instruction-blocked" ? al(e.desired, t.desired) : cl(e, t);
}
var qd = Bd(al);
function zd(e) {
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
function Yd(e, t) {
  var n = t.block, r = Nd(t, Wd), o = Gd(r), s = zd({
    desired: o,
    block: n
  }), i = qd(s);
  return ds(ds({}, e), {}, vn({}, ul, i));
}
function ps(e) {
  var t;
  return (t = e[ul]) !== null && t !== void 0 ? t : null;
}
var ul = Symbol("tree-item-instruction");
const Xd = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/><path fill="#42a5f5" d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5z"/></svg>', Jd = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m8.668 6h3.6641l-3.6641-3.668v3.668m-4.668-4.668h5.332l4 4v8c0 0.73828-0.59375 1.3359-1.332 1.3359h-8c-0.73828 0-1.332-0.59766-1.332-1.3359v-10.664c0-0.74219 0.59375-1.3359 1.332-1.3359m3.332 1.3359h-3.332v10.664h8v-6h-4.668z" fill="#90a4ae" /></svg>', Zd = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m6.922 3.768-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232" fill="#90a4ae" /></svg>', Qd = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.483 6H4.721a1 1 0 0 0-.949.684L2 12V5h12a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232l-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h11l2.403-5.606A1 1 0 0 0 14.483 6" fill="#90a4ae" /></svg>', ep = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#26a69a" d="M8.5 6h4l-4-4zM3.875 1H9.5l4 4v8.6c0 .773-.616 1.4-1.375 1.4h-8.25c-.76 0-1.375-.627-1.375-1.4V2.4c0-.777.612-1.4 1.375-1.4M4 13.6h8V8l-2.625 2.8L8 9.4zm1.25-7.7c-.76 0-1.375.627-1.375 1.4s.616 1.4 1.375 1.4c.76 0 1.375-.627 1.375-1.4S6.009 5.9 5.25 5.9"/></svg>', tp = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#42a5f5" d="m14 10-4 3.5L6 10H4v12h4v-6l2 2 2-2v6h4V10zm12 6v-6h-4v6h-4l6 8 6-8z"/></svg>', np = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ef5350" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m4.93 10.44c.41.9.93 1.64 1.53 2.15l.41.32c-.87.16-2.07.44-3.34.93l-.11.04.5-1.04c.45-.87.78-1.66 1.01-2.4m6.48 3.81c.18-.18.27-.41.28-.66.03-.2-.02-.39-.12-.55-.29-.47-1.04-.69-2.28-.69l-1.29.07-.87-.58c-.63-.52-1.2-1.43-1.6-2.56l.04-.14c.33-1.33.64-2.94-.02-3.6a.85.85 0 0 0-.61-.24h-.24c-.37 0-.7.39-.79.77-.37 1.33-.15 2.06.22 3.27v.01c-.25.88-.57 1.9-1.08 2.93l-.96 1.8-.89.49c-1.2.75-1.77 1.59-1.88 2.12-.04.19-.02.36.05.54l.03.05.48.31.44.11c.81 0 1.73-.95 2.97-3.07l.18-.07c1.03-.33 2.31-.56 4.03-.75 1.03.51 2.24.74 3 .74.44 0 .74-.11.91-.3m-.41-.71.09.11c-.01.1-.04.11-.09.13h-.04l-.19.02c-.46 0-1.17-.19-1.9-.51.09-.1.13-.1.23-.1 1.4 0 1.8.25 1.9.35M7.83 17c-.65 1.19-1.24 1.85-1.69 2 .05-.38.5-1.04 1.21-1.69zm3.02-6.91c-.23-.9-.24-1.63-.07-2.05l.07-.12.15.05c.17.24.19.56.09 1.1l-.03.16-.16.82z"/></svg>', rp = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#0288d1" d="M9.86 2A2.86 2.86 0 0 0 7 4.86v1.68h4.29c.39 0 .71.57.71.96H4.86A2.86 2.86 0 0 0 2 10.36v3.781a2.86 2.86 0 0 0 2.86 2.86h1.18v-2.68a2.85 2.85 0 0 1 2.85-2.86h5.25c1.58 0 2.86-1.271 2.86-2.851V4.86A2.86 2.86 0 0 0 14.14 2zm-.72 1.61c.4 0 .72.12.72.71s-.32.891-.72.891c-.39 0-.71-.3-.71-.89s.32-.711.71-.711"/><path fill="#fdd835" d="M17.959 7v2.68a2.85 2.85 0 0 1-2.85 2.859H9.86A2.85 2.85 0 0 0 7 15.389v3.75a2.86 2.86 0 0 0 2.86 2.86h4.28A2.86 2.86 0 0 0 17 19.14v-1.68h-4.291c-.39 0-.709-.57-.709-.96h7.14A2.86 2.86 0 0 0 22 13.64V9.86A2.86 2.86 0 0 0 19.14 7zM8.32 11.513l-.004.004.038-.004zm6.54 7.276c.39 0 .71.3.71.89a.71.71 0 0 1-.71.71c-.4 0-.72-.12-.72-.71s.32-.89.72-.89"/></svg>', op = {
  key: 0,
  class: "pnl-tst-empty"
}, sp = ["aria-label", "aria-colcount", "aria-rowcount"], ip = {
  key: 0,
  class: "pnl-tst-head",
  role: "rowgroup"
}, lp = {
  class: "pnl-tst-hrow",
  role: "row",
  "aria-rowindex": 1
}, cp = ["aria-colindex"], ap = {
  class: "pnl-tst-body",
  role: "rowgroup"
}, up = ["aria-level", "aria-posinset", "aria-setsize", "aria-rowindex", "aria-expanded", "aria-selected", "tabindex", "onClick", "onFocus"], fp = ["aria-colindex"], dp = ["onClick"], pp = {
  key: 1,
  class: "pnl-tst-twisty pnl-tst-twisty--leaf",
  "aria-hidden": "true"
}, gp = ["checked", ".indeterminate", "aria-label", "onClick"], hp = ["innerHTML"], mp = { class: "pnl-tst-value" }, yp = "title", zt = "pnl-tst-row", vp = 500, wp = {
  __name: "TanstackTable",
  props: {
    // Python-owned state. The component reads it and never writes it back.
    state: { type: Object, required: !0 },
    // JS to Python channel. Emits intent only, never a mutated tree.
    emitEvent: { type: Function, required: !0 },
    // Two-way, set-semantics sync of the expanded key list.
    setExpandedKeys: { type: Function, required: !0 },
    // Two-way, set-semantics sync of the selected key list.
    setSelectedKeys: { type: Function, required: !0 }
  },
  setup(e) {
    const t = e, n = {
      rowExpandingFeature: Pf,
      rowSelectionFeature: $f,
      coreRowModel: Vi(),
      expandedRowModel: Vf()
    }, r = ge(() => (t.state.columns || []).length > 0), o = ge(() => {
      const g = t.state.columns || [];
      return g.length === 0 ? [{ id: yp, header: "", accessorFn: (h) => h.title }] : g.map((h) => {
        const w = h.field ?? h.id;
        return {
          id: h.id,
          header: h.header ?? h.id,
          accessorFn: (E) => E[w],
          meta: { width: h.width }
        };
      });
    }), s = /* @__PURE__ */ ht(i(t.state.expandedKeys));
    function i(g) {
      const h = {};
      for (const w of g || []) h[w] = !0;
      return h;
    }
    function l(g) {
      return g === !0 ? C.getCoreRowModel().flatRows.filter((h) => h.subRows.length > 0).map((h) => h.id).sort() : Object.keys(g).filter((h) => g[h]).sort();
    }
    const c = {
      document: Xd,
      file: Jd,
      folder: Zd,
      "folder-open": Qd,
      image: ep,
      markdown: tp,
      pdf: np,
      python: rp
    };
    function a(g) {
      const h = g.original.icon;
      if (!h) return null;
      const w = { ...c, ...t.state.icons || {} };
      return g.getIsExpanded() && w[`${h}-open`] ? w[`${h}-open`] : w[h] ?? null;
    }
    function u(g, h) {
      return g.length !== h.length ? !1 : g.every((w, E) => w === h[E]);
    }
    const d = ge(() => t.state.options.select_mode ?? "none"), y = ge(() => d.value !== "none"), v = ge(() => d.value === "hierarchy"), R = /* @__PURE__ */ ht(i(t.state.selectedKeys)), C = Uf({
      features: n,
      data: ge(() => t.state.source || []),
      columns: o,
      getRowId: (g) => g.key,
      getSubRows: (g) => g.children,
      // TanStack resets `expanded` whenever `data` changes. Python rewrites the
      // whole tree after every move, so leaving that on would collapse the tree on
      // each drop and push an empty `expanded_keys` back. Expansion is owned here.
      autoResetExpanded: !1,
      enableRowSelection: y,
      enableMultiRowSelection: ge(() => d.value !== "single"),
      enableSubRowSelection: v,
      state: ge(() => ({ expanded: s.value, rowSelection: R.value })),
      onExpandedChange: (g) => {
        s.value = typeof g == "function" ? g(s.value) : g;
      },
      onRowSelectionChange: (g) => {
        R.value = typeof g == "function" ? g(R.value) : g;
      }
    });
    function k(g) {
      const h = { ...g }, w = (E) => {
        E.subRows.forEach(w), E.subRows.length !== 0 && (E.subRows.every((q) => h[q.id]) ? h[E.id] = !0 : delete h[E.id]);
      };
      return C.getCoreRowModel().rows.forEach(w), h;
    }
    Pe(() => l(R.value), t.setSelectedKeys, { flush: "post" }), Pe(
      () => [R.value, C.getCoreRowModel().rows],
      () => {
        if (!v.value) return;
        const g = k(R.value);
        u(l(g), l(R.value)) || (R.value = g);
      },
      { immediate: !0, flush: "post" }
    ), Pe(() => l(s.value), t.setExpandedKeys, { flush: "post" }), Pe(
      () => t.state.expandedKeys,
      (g) => {
        u(l(s.value), [...g || []].sort()) || (s.value = i(g));
      }
    ), Pe(
      () => t.state.selectedKeys,
      (g) => {
        u(l(R.value), [...g || []].sort()) || (R.value = i(g));
      }
    ), Pe(
      () => [t.state.options.expand_all, t.state.source],
      ([g]) => {
        g && C.toggleAllRowsExpanded(!0);
      },
      { immediate: !0 }
    );
    const j = ge(() => C.getRowModel().rows), M = ge(() => {
      var g;
      return ((g = C.getHeaderGroups()[0]) == null ? void 0 : g.headers) ?? [];
    }), L = ge(() => t.state.options.indent_px ?? 16), I = ge(() => t.state.options.aria_label ?? "Tree table"), N = ge(() => r.value ? 2 : 1), B = ge(() => j.value.length + (r.value ? 1 : 0));
    function le(g) {
      const h = g.getParentRow();
      return h ? h.subRows.length : C.getCoreRowModel().rows.length;
    }
    function $(g) {
      var w;
      const h = (w = g.meta) == null ? void 0 : w.width;
      return h ? { flex: `0 0 ${h}px` } : { flex: "1 1 0" };
    }
    function F(g, h) {
      return { ...$(h), paddingInlineStart: `${g.depth * L.value}px` };
    }
    const U = /* @__PURE__ */ ht(null), te = /* @__PURE__ */ new Map();
    function oe(g, h) {
      h ? te.set(g, h) : te.delete(g);
    }
    const fe = ge(() => {
      const g = j.value;
      return g.length === 0 ? null : g.some((h) => h.id === U.value) ? U.value : g[0].id;
    });
    function de(g) {
      g != null && (U.value = g, Vs(() => {
        var h;
        return (h = te.get(g)) == null ? void 0 : h.focus();
      }));
    }
    function ye(g) {
      const h = j.value;
      h.length !== 0 && de(h[Math.max(0, Math.min(g, h.length - 1))].id);
    }
    function ne(g, h) {
      const w = j.value;
      if (w.length === 0) return;
      const E = w[Math.max(0, Math.min(g, w.length - 1))], q = (h == null ? void 0 : h.shiftKey) && y.value && d.value !== "single";
      q && z.value === null && (z.value = fe.value), de(E.id), q && ft(E, !1);
    }
    function Y(g) {
      const h = j.value;
      if (h.length === 0) return;
      const w = Math.max(
        0,
        h.findIndex((q) => q.id === fe.value)
      ), E = h[w];
      switch (g.key) {
        case "ArrowDown":
          g.preventDefault(), ne(w + 1, g);
          break;
        case "ArrowUp":
          g.preventDefault(), ne(w - 1, g);
          break;
        case "ArrowRight":
          if (g.preventDefault(), !E.getCanExpand()) break;
          E.getIsExpanded() ? ye(w + 1) : (E.toggleExpanded(!0), de(E.id));
          break;
        case "ArrowLeft":
          g.preventDefault(), E.getCanExpand() && E.getIsExpanded() ? (E.toggleExpanded(!1), de(E.id)) : E.parentId && de(E.parentId);
          break;
        case "Home":
          g.preventDefault(), ye(0);
          break;
        case "End":
          g.preventDefault(), ye(h.length - 1);
          break;
        case "Enter":
          g.preventDefault(), t.emitEvent("activate", { key: E.id });
          break;
        case " ":
          if (!y.value) break;
          g.preventDefault(), Wt(E);
          break;
      }
    }
    const z = /* @__PURE__ */ ht(null);
    function Te(g) {
      z.value = g.id, R.value = {}, g.toggleSelected(!0, { selectChildren: v.value, deselectParents: v.value });
    }
    function ft(g, h) {
      const w = j.value, E = w.findIndex((ke) => ke.id === z.value), q = w.findIndex((ke) => ke.id === g.id);
      if (q === -1) return;
      if (E === -1) {
        Te(g);
        return;
      }
      h || (R.value = {});
      const [ce, Ce] = E <= q ? [E, q] : [q, E];
      for (let ke = ce; ke <= Ce; ke += 1)
        w[ke].toggleSelected(!0, { selectChildren: v.value, deselectParents: v.value });
    }
    function Ge(g, h) {
      U.value = g.id, y.value && d.value !== "single" ? h != null && h.shiftKey ? ft(g, h.ctrlKey || h.metaKey) : h != null && h.ctrlKey || h != null && h.metaKey ? (z.value = g.id, Wt(g)) : Te(g) : y.value && Te(g), t.emitEvent("activate", { key: g.id });
    }
    function Ie(g) {
      U.value = g.id, g.toggleExpanded();
    }
    function wn(g) {
      return !g.getIsSelected() && g.getIsSomeSelected();
    }
    function Wt(g) {
      U.value = g.id, g.toggleSelected(void 0, {
        selectChildren: v.value,
        deselectParents: v.value
      });
    }
    function lr(g) {
      Wt(g), de(g.id);
    }
    const dt = ["reorder-above", "reorder-below", "make-child", "reparent"], ot = ge(() => t.state.options.enable_dnd === !0), pt = /* @__PURE__ */ ht([]), gt = /* @__PURE__ */ ht(null);
    function st(g) {
      return j.value.find((h) => h.id === g) ?? null;
    }
    function po(g, h) {
      let w = g;
      for (; w; ) {
        if (h.includes(w.id)) return !0;
        w = w.getParentRow();
      }
      return !1;
    }
    function f(g) {
      if (!y.value || !g.getIsSelected()) return [g.id];
      const h = /* @__PURE__ */ new Set();
      for (let E = g.getParentRow(); E; E = E.getParentRow()) h.add(E.id);
      const w = j.value.filter((E) => E.getIsSelected() && !h.has(E.id)).map((E) => E.id);
      return w.length > 1 ? w : [g.id];
    }
    function p(g, h) {
      return po(g, h) ? dt : g.original.allow_children === !1 ? ["make-child"] : [];
    }
    function m(g) {
      if (g.getCanExpand() && g.getIsExpanded()) return "expanded";
      const h = g.getParentRow(), w = h ? h.subRows : C.getCoreRowModel().rows;
      return g.index === w.length - 1 ? "last-in-group" : "standard";
    }
    let x = null, b = null;
    function _() {
      b && clearTimeout(b), b = null, x = null;
    }
    function A(g, h) {
      if (x === g || (_(), !h || h.type === "instruction-blocked")) return;
      const w = st(g);
      !w || !w.getCanExpand() || w.getIsExpanded() || (x = g, b = setTimeout(() => {
        b = null;
        const E = st(g);
        E && E.getCanExpand() && !E.getIsExpanded() && E.toggleExpanded(!0);
      }, vp));
    }
    function O() {
      gt.value = null, _();
    }
    const P = /* @__PURE__ */ ht(null);
    function S() {
      let g = P.value;
      if (!g) return null;
      let h = g.getRootNode();
      for (; h.host; )
        g = h.host, h = g.getRootNode();
      return g;
    }
    function H(g) {
      for (const h of j.value) {
        const w = te.get(h.id);
        if (!w) continue;
        const E = w.getBoundingClientRect();
        if (g.clientX >= E.left && g.clientX < E.right && g.clientY >= E.top && g.clientY < E.bottom)
          return { row: h, element: w, rect: E };
      }
      return null;
    }
    function T(g, h) {
      for (const w of g.element.querySelectorAll(".pnl-tst-check, .pnl-tst-twisty")) {
        const E = w.getBoundingClientRect();
        if (h.clientX >= E.left && h.clientX < E.right && h.clientY >= E.top && h.clientY < E.bottom)
          return !0;
      }
      return !1;
    }
    let D = null;
    function K() {
      D == null || D(), D = null;
      const g = S();
      !g || !ot.value || (D = sr(
        $d({
          element: g,
          // Anything outside a row (the header, the empty space below the last row)
          // is not a drag handle, and returning false cancels the native drag.
          canDrag: ({ input: h }) => {
            const w = H(h);
            return w !== null && !T(w, h);
          },
          getInitialData: ({ input: h }) => {
            const w = H(h);
            return w ? { type: zt, key: w.row.id, keys: f(w.row) } : { type: zt, key: null, keys: [] };
          },
          onGenerateDragPreview: ({ location: h, nativeSetDragImage: w }) => {
            const E = h.current.input, q = H(E);
            !q || !w || w(q.element, E.clientX - q.rect.left, E.clientY - q.rect.top);
          },
          onDragStart: ({ source: h }) => {
            pt.value = h.data.keys ?? [];
          },
          onDrop: () => {
            pt.value = [], O();
          }
        }),
        Kd({
          element: g,
          canDrop: ({ source: h }) => h.data.type === zt,
          getData: ({ input: h, source: w }) => {
            const E = H(h);
            if (!E) return { type: zt, key: null };
            const q = { type: zt, key: E.row.id };
            return Yd(q, {
              element: E.element,
              input: h,
              currentLevel: E.row.depth,
              indentPerLevel: L.value,
              mode: m(E.row),
              block: p(E.row, w.data.keys ?? [])
            });
          },
          onDrag: ({ self: h }) => {
            const w = h.data.key, E = ps(h.data);
            gt.value = w && E ? { key: w, instruction: E } : null, A(w ?? null, E);
          },
          onDragLeave: O,
          onDrop: ({ self: h, source: w }) => {
            O();
            const E = h.data.key, q = ps(h.data);
            if (!E || !q || q.type === "instruction-blocked") return;
            const ce = w.data.keys ?? [];
            ce.includes(E) || t.emitEvent("move", {
              key: w.data.key,
              keys: ce,
              targetKey: E,
              instruction: q.type,
              desiredLevel: q.desiredLevel ?? q.currentLevel
            });
          }
        })
      ));
    }
    Js(K), Pe(ot, K), Zs(() => {
      _(), D == null || D();
    });
    function G(g) {
      var h;
      return ((h = gt.value) == null ? void 0 : h.key) === g.id ? gt.value.instruction : null;
    }
    function Q(g) {
      const h = G(g);
      return {
        "pnl-tst-row--draggable": ot.value,
        "pnl-tst-row--dragging": pt.value.includes(g.id),
        "pnl-tst-row--blocked": (h == null ? void 0 : h.type) === "instruction-blocked",
        "pnl-tst-row--child-target": (h == null ? void 0 : h.type) === "make-child"
      };
    }
    function X(g) {
      const h = G(g);
      return h ? h.type === "reorder-above" ? "pnl-tst-dropline--above" : h.type === "reorder-below" || h.type === "reparent" ? "pnl-tst-dropline--below" : null : null;
    }
    function ae(g) {
      const h = G(g);
      return h ? { insetInlineStart: `${(h.type === "reparent" ? h.desiredLevel : h.currentLevel) * h.indentPerLevel}px` } : null;
    }
    return (g, h) => (he(), ve("div", {
      ref_key: "rootElement",
      ref: P,
      class: "pnl-tst"
    }, [
      j.value.length === 0 ? (he(), ve("div", op, "No data")) : (he(), ve("div", {
        key: 1,
        class: "pnl-tst-grid",
        role: "treegrid",
        "aria-label": I.value,
        "aria-colcount": M.value.length,
        "aria-rowcount": B.value,
        onKeydown: Y
      }, [
        r.value ? (he(), ve("div", ip, [
          wt("div", lp, [
            (he(!0), ve(Ee, null, hr(M.value, (w, E) => (he(), ve("div", {
              key: w.id,
              class: "pnl-tst-hcell",
              role: "columnheader",
              "aria-colindex": E + 1,
              style: jt($(w.column.columnDef))
            }, Pr(w.column.columnDef.header), 13, cp))), 128))
          ])
        ])) : qt("", !0),
        wt("div", ap, [
          (he(!0), ve(Ee, null, hr(j.value, (w, E) => (he(), ve("div", {
            key: w.id,
            ref_for: !0,
            ref: (q) => oe(w.id, q),
            class: bt(["pnl-tst-row", [Q(w), { "pnl-tst-row--active": w.id === U.value }]]),
            role: "row",
            "aria-level": w.depth + 1,
            "aria-posinset": w.index + 1,
            "aria-setsize": le(w),
            "aria-rowindex": E + N.value,
            "aria-expanded": w.getCanExpand() ? w.getIsExpanded() : void 0,
            "aria-selected": y.value ? w.getIsSelected() : void 0,
            tabindex: w.id === fe.value ? 0 : -1,
            onClick: (q) => Ge(w, q),
            onFocus: (q) => U.value = w.id
          }, [
            X(w) ? (he(), ve("span", {
              key: 0,
              class: bt(["pnl-tst-dropline", X(w)]),
              style: jt(ae(w)),
              "aria-hidden": "true"
            }, null, 6)) : qt("", !0),
            (he(!0), ve(Ee, null, hr(w.getAllCells(), (q, ce) => (he(), ve("div", {
              key: q.id,
              class: bt(["pnl-tst-cell", { "pnl-tst-cell--tree": ce === 0 }]),
              role: "gridcell",
              "aria-colindex": ce + 1,
              style: jt(
                ce === 0 ? F(w, q.column.columnDef) : $(q.column.columnDef)
              )
            }, [
              ce === 0 ? (he(), ve(Ee, { key: 0 }, [
                w.getCanExpand() ? (he(), ve("span", {
                  key: 0,
                  class: bt(["pnl-tst-twisty", { "pnl-tst-twisty--open": w.getIsExpanded() }]),
                  "aria-hidden": "true",
                  onClick: Bo((Ce) => Ie(w), ["stop"])
                }, [...h[0] || (h[0] = [
                  wt("svg", {
                    viewBox: "0 0 16 16",
                    width: "12",
                    height: "12",
                    focusable: "false"
                  }, [
                    wt("path", {
                      d: "M6 3.5 10.5 8 6 12.5",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "1.6"
                    })
                  ], -1)
                ])], 10, dp)) : (he(), ve("span", pp)),
                y.value ? (he(), ve("input", {
                  key: 2,
                  class: "pnl-tst-check",
                  type: "checkbox",
                  tabindex: "-1",
                  checked: w.getIsSelected(),
                  ".indeterminate": wn(w),
                  "aria-label": `Select ${w.original.title ?? w.id}`,
                  onClick: Bo((Ce) => lr(w), ["stop"])
                }, null, 40, gp)) : qt("", !0),
                a(w) ? (he(), ve("span", {
                  key: 3,
                  class: "pnl-tst-icon",
                  "aria-hidden": "true",
                  innerHTML: a(w)
                }, null, 8, hp)) : qt("", !0)
              ], 64)) : qt("", !0),
              wt("span", mp, Pr(q.getValue()), 1)
            ], 14, fp))), 128))
          ], 42, up))), 128))
        ])
      ], 40, sp))
    ], 512));
  }
};
function bp({ model: e, el: t }) {
  t.style.display = "block", t.style.width = "100%";
  const n = document.createElement("div");
  n.className = "pnl-tst-root", t.append(n);
  const r = /* @__PURE__ */ qn({
    source: e.get("source") || [],
    columns: e.get("columns") || [],
    options: e.get("options") || {},
    icons: e.get("icons") || {},
    expandedKeys: e.get("expanded_keys") || [],
    selectedKeys: e.get("selected_keys") || []
  }), o = (u, d) => {
    e.set("_event_data", {
      event_name: u,
      event_params: d,
      timestamp: Date.now()
    }), e.save_changes();
  }, s = (u, d) => u.length === d.length && u.every((y, v) => y === d[v]), i = (u) => (d) => {
    const y = [...e.get(u) || []].sort();
    s(y, d) || (e.set(u, d), e.save_changes());
  }, l = i("expanded_keys"), c = i("selected_keys"), a = Ta(wp, { state: r, emitEvent: o, setExpandedKeys: l, setSelectedKeys: c });
  return a.mount(n), e.on("change:source", () => {
    r.source = e.get("source") || [];
  }), e.on("change:columns", () => {
    r.columns = e.get("columns") || [];
  }), e.on("change:options", () => {
    r.options = e.get("options") || {};
  }), e.on("change:icons", () => {
    r.icons = e.get("icons") || {};
  }), e.on("change:expanded_keys", () => {
    r.expandedKeys = e.get("expanded_keys") || [];
  }), e.on("change:selected_keys", () => {
    r.selectedKeys = e.get("selected_keys") || [];
  }), () => {
    a.unmount();
  };
}
export {
  bp as render
};

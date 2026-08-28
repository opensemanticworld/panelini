/**
* @vue/shared v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function Ds(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const s of e.split(",")) t[s] = 1;
  return (s) => s in t;
}
const W = {}, et = [], Ce = () => {
}, Rn = () => !1, zt = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Xt = (e) => e.startsWith("onUpdate:"), Q = Object.assign, js = (e, t) => {
  const s = e.indexOf(t);
  s > -1 && e.splice(s, 1);
}, Ur = Object.prototype.hasOwnProperty, D = (e, t) => Ur.call(e, t), P = Array.isArray, Ve = (e) => Et(e) === "[object Map]", Kt = (e) => Et(e) === "[object Set]", sn = (e) => Et(e) === "[object Date]", I = (e) => typeof e == "function", G = (e) => typeof e == "string", Te = (e) => typeof e == "symbol", L = (e) => e !== null && typeof e == "object", Fn = (e) => (L(e) || I(e)) && I(e.then) && I(e.catch), Dn = Object.prototype.toString, Et = (e) => Dn.call(e), Wr = (e) => Et(e).slice(8, -1), jn = (e) => Et(e) === "[object Object]", Hs = (e) => G(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, pt = /* @__PURE__ */ Ds(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Zt = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (s) => t[s] || (t[s] = e(s));
}, Br = /-\w/g, fe = Zt(
  (e) => e.replace(Br, (t) => t.slice(1).toUpperCase())
), qr = /\B([A-Z])/g, Ze = Zt(
  (e) => e.replace(qr, "-$1").toLowerCase()
), Hn = Zt((e) => e.charAt(0).toUpperCase() + e.slice(1)), us = Zt(
  (e) => e ? `on${Hn(e)}` : ""
), Pe = (e, t) => !Object.is(e, t), as = (e, ...t) => {
  for (let s = 0; s < e.length; s++)
    e[s](...t);
}, Nn = (e, t, s, n = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: n,
    value: s
  });
}, Gr = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let nn;
const kt = () => nn || (nn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Qt(e) {
  if (P(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const n = e[s], r = G(n) ? Xr(n) : Qt(n);
      if (r)
        for (const i in r)
          t[i] = r[i];
    }
    return t;
  } else if (G(e) || L(e))
    return e;
}
const Jr = /;(?![^(]*\))/g, Yr = /:([^]+)/, zr = /\/\*[^]*?\*\//g;
function Xr(e) {
  const t = {};
  return e.replace(zr, "").split(Jr).forEach((s) => {
    if (s) {
      const n = s.split(Yr);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function Ns(e) {
  let t = "";
  if (G(e))
    t = e;
  else if (P(e))
    for (let s = 0; s < e.length; s++) {
      const n = Ns(e[s]);
      n && (t += n + " ");
    }
  else if (L(e))
    for (const s in e)
      e[s] && (t += s + " ");
  return t.trim();
}
const Zr = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", kr = /* @__PURE__ */ Ds(Zr);
function $n(e) {
  return !!e || e === "";
}
function Qr(e, t) {
  if (e.length !== t.length) return !1;
  let s = !0;
  for (let n = 0; s && n < e.length; n++)
    s = es(e[n], t[n]);
  return s;
}
function rn(e, t) {
  if (e.size !== t.size) return !1;
  const s = Array.from(t), n = new Uint8Array(s.length);
  for (const r of e) {
    let i = -1;
    for (let o = 0; o < s.length; o++)
      if (!n[o] && es(r, s[o])) {
        i = o;
        break;
      }
    if (i < 0) return !1;
    n[i] = 1;
  }
  return !0;
}
function es(e, t) {
  if (e === t) return !0;
  let s = sn(e), n = sn(t);
  if (s || n)
    return s && n ? e.getTime() === t.getTime() : !1;
  if (s = Te(e), n = Te(t), s || n)
    return e === t;
  if (s = P(e), n = P(t), s || n)
    return s && n ? Qr(e, t) : !1;
  if (s = L(e), n = L(t), s || n) {
    if (!s || !n)
      return !1;
    if (s = Ve(e), n = Ve(t), s || n || (s = Kt(e), n = Kt(t), s || n))
      return s && n ? rn(e, t) : !1;
    const r = Object.keys(e).length, i = Object.keys(t).length;
    if (r !== i)
      return !1;
    for (const o in e) {
      const l = e.hasOwnProperty(o), c = t.hasOwnProperty(o);
      if (l && !c || !l && c || !es(e[o], t[o]))
        return !1;
    }
  }
  return String(e) === String(t);
}
const Ln = (e) => !!(e && e.__v_isRef === !0), Vn = (e) => G(e) ? e : e == null ? "" : P(e) || L(e) && (e.toString === Dn || !I(e.toString)) ? Ln(e) ? Vn(e.value) : JSON.stringify(e, Kn, 2) : String(e), Kn = (e, t) => Ln(t) ? Kn(e, t.value) : Ve(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (s, [n, r], i) => (s[hs(n, i) + " =>"] = r, s),
    {}
  )
} : Kt(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((s) => hs(s))
} : Te(t) ? hs(t) : L(t) && !P(t) && !jn(t) ? String(t) : t, hs = (e, t = "") => {
  var s;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Te(e) ? `Symbol(${(s = e.description) != null ? s : t})` : e
  );
};
/**
* @vue/reactivity v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Z;
class ei {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && Z && (Z.active ? (this.parent = Z, this.index = (Z.scopes || (Z.scopes = [])).push(
      this
    ) - 1) : (this._active = !1, this._warnOnRun = !1));
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, s;
      if (this.scopes) {
        const n = this.scopes.slice();
        for (t = 0, s = n.length; t < s; t++)
          n[t].pause();
      }
      for (t = 0, s = this.effects.length; t < s; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, s;
      if (this.scopes) {
        const r = this.scopes.slice();
        for (t = 0, s = r.length; t < s; t++)
          r[t].resume();
      }
      const n = this.effects.slice();
      for (t = 0, s = n.length; t < s; t++)
        n[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const s = Z;
      try {
        return Z = this, t();
      } finally {
        Z = s;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Z, Z = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (Z === this)
        Z = this.prevScope;
      else {
        let t = Z;
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
      let s, n;
      for (s = 0, n = this.effects.length; s < n; s++)
        this.effects[s].stop();
      for (this.effects.length = 0, s = 0, n = this.cleanups.length; s < n; s++)
        this.cleanups[s]();
      if (this.cleanups.length = 0, this.scopes) {
        const r = this.scopes.slice();
        for (s = 0, n = r.length; s < n; s++)
          r[s].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function ti() {
  return Z;
}
let U;
const ds = /* @__PURE__ */ new WeakSet();
class Un {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Z && (Z.active ? Z.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, ds.has(this) && (ds.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Bn(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, on(this), qn(this);
    const t = U, s = ce;
    U = this, ce = !0;
    try {
      return this.fn();
    } finally {
      Gn(this), U = t, ce = s, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Vs(t);
      this.deps = this.depsTail = void 0, on(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? ds.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    ws(this) && this.run();
  }
  get dirty() {
    return ws(this);
  }
}
let Wn = 0, gt, _t;
function Bn(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = _t, _t = e;
    return;
  }
  e.next = gt, gt = e;
}
function $s() {
  Wn++;
}
function Ls() {
  if (--Wn > 0)
    return;
  if (_t) {
    let t = _t;
    for (_t = void 0; t; ) {
      const s = t.next;
      t.next = void 0, t.flags &= -9, t = s;
    }
  }
  let e;
  for (; gt; ) {
    let t = gt;
    for (gt = void 0; t; ) {
      const s = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (n) {
          e || (e = n);
        }
      t = s;
    }
  }
  if (e) throw e;
}
function qn(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Gn(e) {
  let t, s = e.depsTail, n = s;
  for (; n; ) {
    const r = n.prevDep;
    n.version === -1 ? (n === s && (s = r), Vs(n), si(n)) : t = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = r;
  }
  e.deps = t, e.depsTail = s;
}
function ws(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Jn(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Jn(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === xt) || (e.globalVersion = xt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !ws(e))))
    return;
  e.flags |= 2;
  const t = e.dep, s = U, n = ce;
  U = e, ce = !0;
  try {
    qn(e);
    const r = e.fn(e._value);
    (t.version === 0 || Pe(r, e._value)) && (e.flags |= 128, e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    U = s, ce = n, Gn(e), e.flags &= -3;
  }
}
function Vs(e, t = !1) {
  const { dep: s, prevSub: n, nextSub: r } = e;
  if (n && (n.nextSub = r, e.prevSub = void 0), r && (r.prevSub = n, e.nextSub = void 0), s.subs === e && (s.subs = n, !n && s.computed)) {
    s.computed.flags &= -5;
    for (let i = s.computed.deps; i; i = i.nextDep)
      Vs(i, !0);
  }
  !t && !--s.sc && s.map && s.map.delete(s.key);
}
function si(e) {
  const { prevDep: t, nextDep: s } = e;
  t && (t.nextDep = s, e.prevDep = void 0), s && (s.prevDep = t, e.nextDep = void 0);
}
let ce = !0;
const Yn = [];
function Re() {
  Yn.push(ce), ce = !1;
}
function Fe() {
  const e = Yn.pop();
  ce = e === void 0 ? !0 : e;
}
function on(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const s = U;
    U = void 0;
    try {
      t();
    } finally {
      U = s;
    }
  }
}
let xt = 0;
class ni {
  constructor(t, s) {
    this.sub = t, this.dep = s, this.version = s.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class zn {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!U || !ce || U === this.computed)
      return;
    let s = this.activeLink;
    if (s === void 0 || s.sub !== U)
      s = this.activeLink = new ni(U, this), U.deps ? (s.prevDep = U.depsTail, U.depsTail.nextDep = s, U.depsTail = s) : U.deps = U.depsTail = s, Xn(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const n = s.nextDep;
      n.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = n), s.prevDep = U.depsTail, s.nextDep = void 0, U.depsTail.nextDep = s, U.depsTail = s, U.deps === s && (U.deps = n);
    }
    return s;
  }
  trigger(t) {
    this.version++, xt++, this.notify(t);
  }
  notify(t) {
    $s();
    try {
      for (let s = this.subs; s; s = s.prevSub)
        s.sub.notify() && s.sub.dep.notify();
    } finally {
      Ls();
    }
  }
}
function Xn(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let n = t.deps; n; n = n.nextDep)
        Xn(n);
    }
    const s = e.dep.subs;
    s !== e && (e.prevSub = s, s && (s.nextSub = e)), e.dep.subs = e;
  }
}
const Cs = /* @__PURE__ */ new WeakMap(), Ye = /* @__PURE__ */ Symbol(
  ""
), Ts = /* @__PURE__ */ Symbol(
  ""
), vt = /* @__PURE__ */ Symbol(
  ""
);
function k(e, t, s) {
  if (ce && U) {
    let n = Cs.get(e);
    n || Cs.set(e, n = /* @__PURE__ */ new Map());
    let r = n.get(s);
    r || (n.set(s, r = new zn()), r.map = n, r.key = s), r.track();
  }
}
function Me(e, t, s, n, r, i) {
  const o = Cs.get(e);
  if (!o) {
    xt++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if ($s(), t === "clear")
    o.forEach(l);
  else {
    const c = P(e), h = c && Hs(s);
    if (c && s === "length") {
      const a = Number(n);
      o.forEach((p, w) => {
        (w === "length" || w === vt || !Te(w) && w >= a) && l(p);
      });
    } else
      switch ((s !== void 0 || o.has(void 0)) && l(o.get(s)), h && l(o.get(vt)), t) {
        case "add":
          c ? h && l(o.get("length")) : (l(o.get(Ye)), Ve(e) && l(o.get(Ts)));
          break;
        case "delete":
          c || (l(o.get(Ye)), Ve(e) && l(o.get(Ts)));
          break;
        case "set":
          Ve(e) && l(o.get(Ye));
          break;
      }
  }
  Ls();
}
function ke(e) {
  const t = /* @__PURE__ */ $(e);
  return t === e ? t : (k(t, "iterate", vt), /* @__PURE__ */ ue(e) ? t : t.map(De));
}
function ts(e) {
  return k(e = /* @__PURE__ */ $(e), "iterate", vt), e;
}
function xe(e, t) {
  return /* @__PURE__ */ Ke(e) ? nt(/* @__PURE__ */ ze(e) ? De(t) : t) : De(t);
}
const ri = {
  __proto__: null,
  [Symbol.iterator]() {
    return ps(this, Symbol.iterator, (e) => xe(this, e));
  },
  concat(...e) {
    return ke(this).concat(
      ...e.map((t) => P(t) ? ke(t) : t)
    );
  },
  entries() {
    return ps(this, "entries", (e) => (e[1] = xe(this, e[1]), e));
  },
  every(e, t) {
    return Ee(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Ee(
      this,
      "filter",
      e,
      t,
      (s) => s.map((n) => xe(this, n)),
      arguments
    );
  },
  find(e, t) {
    return Ee(
      this,
      "find",
      e,
      t,
      (s) => xe(this, s),
      arguments
    );
  },
  findIndex(e, t) {
    return Ee(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Ee(
      this,
      "findLast",
      e,
      t,
      (s) => xe(this, s),
      arguments
    );
  },
  findLastIndex(e, t) {
    return Ee(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Ee(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return gs(this, "includes", e);
  },
  indexOf(...e) {
    return gs(this, "indexOf", e);
  },
  join(e) {
    return ke(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return gs(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Ee(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return ct(this, "pop");
  },
  push(...e) {
    return ct(this, "push", e);
  },
  reduce(e, ...t) {
    return ln(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return ln(this, "reduceRight", e, t);
  },
  shift() {
    return ct(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Ee(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return ct(this, "splice", e);
  },
  toReversed() {
    return ke(this).toReversed();
  },
  toSorted(e) {
    return ke(this).toSorted(e);
  },
  toSpliced(...e) {
    return ke(this).toSpliced(...e);
  },
  unshift(...e) {
    return ct(this, "unshift", e);
  },
  values() {
    return ps(this, "values", (e) => xe(this, e));
  }
};
function ps(e, t, s) {
  const n = ts(e), r = n[t]();
  return n !== e && !/* @__PURE__ */ ue(e) && (r._next = r.next, r.next = () => {
    const i = r._next();
    return i.done || (i.value = s(i.value)), i;
  }), r;
}
const ii = Array.prototype;
function Ee(e, t, s, n, r, i) {
  const o = ts(e), l = o !== e && !/* @__PURE__ */ ue(e), c = o[t];
  if (c !== ii[t]) {
    const p = c.apply(e, i);
    return l ? De(p) : p;
  }
  let h = s;
  o !== e && (l ? h = function(p, w) {
    return s.call(this, xe(e, p), w, e);
  } : s.length > 2 && (h = function(p, w) {
    return s.call(this, p, w, e);
  }));
  const a = c.call(o, h, n);
  return l && r ? r(a) : a;
}
function ln(e, t, s, n) {
  const r = ts(e), i = r !== e && !/* @__PURE__ */ ue(e);
  let o = s, l = !1;
  r !== e && (i ? (l = n.length === 0, o = function(h, a, p) {
    return l && (l = !1, h = xe(e, h)), s.call(this, h, xe(e, a), p, e);
  }) : s.length > 3 && (o = function(h, a, p) {
    return s.call(this, h, a, p, e);
  }));
  const c = r[t](o, ...n);
  return l ? xe(e, c) : c;
}
function gs(e, t, s) {
  const n = /* @__PURE__ */ $(e);
  k(n, "iterate", vt);
  const r = n[t](...s);
  return (r === -1 || r === !1) && /* @__PURE__ */ Ws(s[0]) ? (s[0] = /* @__PURE__ */ $(s[0]), n[t](...s)) : r;
}
function ct(e, t, s = []) {
  Re(), $s();
  const n = (/* @__PURE__ */ $(e))[t].apply(e, s);
  return Ls(), Fe(), n;
}
const oi = /* @__PURE__ */ Ds("__proto__,__v_isRef,__isVue"), Zn = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Te)
);
function li(e) {
  Te(e) || (e = String(e));
  const t = /* @__PURE__ */ $(this);
  return k(t, "has", e), t.hasOwnProperty(e);
}
class kn {
  constructor(t = !1, s = !1) {
    this._isReadonly = t, this._isShallow = s;
  }
  get(t, s, n) {
    if (s === "__v_skip") return t.__v_skip;
    const r = this._isReadonly, i = this._isShallow;
    if (s === "__v_isReactive")
      return !r;
    if (s === "__v_isReadonly")
      return r;
    if (s === "__v_isShallow")
      return i;
    if (s === "__v_raw")
      return n === (r ? i ? mi : sr : i ? tr : er).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
    const o = P(t);
    if (!r) {
      let c;
      if (o && (c = ri[s]))
        return c;
      if (s === "hasOwnProperty")
        return li;
    }
    const l = Reflect.get(
      t,
      s,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ re(t) ? t : n
    );
    if ((Te(s) ? Zn.has(s) : oi(s)) || (r || k(t, "get", s), i))
      return l;
    if (/* @__PURE__ */ re(l)) {
      const c = o && Hs(s) ? l : l.value;
      return r && L(c) ? /* @__PURE__ */ Os(c) : c;
    }
    return L(l) ? r ? /* @__PURE__ */ Os(l) : /* @__PURE__ */ ss(l) : l;
  }
}
class Qn extends kn {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, s, n, r) {
    let i = t[s];
    const o = P(t) && Hs(s);
    if (!this._isShallow) {
      const h = /* @__PURE__ */ Ke(i);
      if (!/* @__PURE__ */ ue(n) && !/* @__PURE__ */ Ke(n) && (i = /* @__PURE__ */ $(i), n = /* @__PURE__ */ $(n)), !o && /* @__PURE__ */ re(i) && !/* @__PURE__ */ re(n))
        return h || (i.value = n), !0;
    }
    const l = o ? Number(s) < t.length : D(t, s), c = Reflect.set(
      t,
      s,
      n,
      /* @__PURE__ */ re(t) ? t : r
    );
    return t === /* @__PURE__ */ $(r) && c && (l ? Pe(n, i) && Me(t, "set", s, n) : Me(t, "add", s, n)), c;
  }
  deleteProperty(t, s) {
    const n = D(t, s);
    t[s];
    const r = Reflect.deleteProperty(t, s);
    return r && n && Me(t, "delete", s, void 0), r;
  }
  has(t, s) {
    const n = Reflect.has(t, s);
    return (!Te(s) || !Zn.has(s)) && k(t, "has", s), n;
  }
  ownKeys(t) {
    return k(
      t,
      "iterate",
      P(t) ? "length" : Ye
    ), Reflect.ownKeys(t);
  }
}
class fi extends kn {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, s) {
    return !0;
  }
  deleteProperty(t, s) {
    return !0;
  }
}
const ci = /* @__PURE__ */ new Qn(), ui = /* @__PURE__ */ new fi(), ai = /* @__PURE__ */ new Qn(!0);
const Es = (e) => e, Dt = (e) => Reflect.getPrototypeOf(e);
function hi(e, t, s) {
  return function(...n) {
    const r = this.__v_raw, i = /* @__PURE__ */ $(r), o = Ve(i), l = e === "entries" || e === Symbol.iterator && o, c = e === "keys" && o, h = r[e](...n), a = s ? Es : t ? nt : De;
    return !t && k(
      i,
      "iterate",
      c ? Ts : Ye
    ), Q(
      // inheriting all iterator properties
      Object.create(h),
      {
        // iterator protocol
        next() {
          const { value: p, done: w } = h.next();
          return w ? { value: p, done: w } : {
            value: l ? [a(p[0]), a(p[1])] : a(p),
            done: w
          };
        }
      }
    );
  };
}
function jt(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function di(e, t) {
  const s = {
    get(r) {
      const i = this.__v_raw, o = /* @__PURE__ */ $(i), l = /* @__PURE__ */ $(r);
      e || (Pe(r, l) && k(o, "get", r), k(o, "get", l));
      const { has: c } = Dt(o), h = t ? Es : e ? nt : De;
      if (c.call(o, r))
        return h(i.get(r));
      if (c.call(o, l))
        return h(i.get(l));
      i !== o && i.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && k(/* @__PURE__ */ $(r), "iterate", Ye), r.size;
    },
    has(r) {
      const i = this.__v_raw, o = /* @__PURE__ */ $(i), l = /* @__PURE__ */ $(r);
      return e || (Pe(r, l) && k(o, "has", r), k(o, "has", l)), r === l ? i.has(r) : i.has(r) || i.has(l);
    },
    forEach(r, i) {
      const o = this, l = o.__v_raw, c = /* @__PURE__ */ $(l), h = t ? Es : e ? nt : De;
      return !e && k(c, "iterate", Ye), l.forEach((a, p) => r.call(i, h(a), h(p), o));
    }
  };
  return Q(
    s,
    e ? {
      add: jt("add"),
      set: jt("set"),
      delete: jt("delete"),
      clear: jt("clear")
    } : {
      add(r) {
        const i = /* @__PURE__ */ $(this), o = Dt(i), l = /* @__PURE__ */ $(r), c = !t && !/* @__PURE__ */ ue(r) && !/* @__PURE__ */ Ke(r) ? l : r;
        return o.has.call(i, c) || Pe(r, c) && o.has.call(i, r) || Pe(l, c) && o.has.call(i, l) || (i.add(c), Me(i, "add", c, c)), this;
      },
      set(r, i) {
        !t && !/* @__PURE__ */ ue(i) && !/* @__PURE__ */ Ke(i) && (i = /* @__PURE__ */ $(i));
        const o = /* @__PURE__ */ $(this), { has: l, get: c } = Dt(o);
        let h = l.call(o, r);
        h || (r = /* @__PURE__ */ $(r), h = l.call(o, r));
        const a = c.call(o, r);
        return o.set(r, i), h ? Pe(i, a) && Me(o, "set", r, i) : Me(o, "add", r, i), this;
      },
      delete(r) {
        const i = /* @__PURE__ */ $(this), { has: o, get: l } = Dt(i);
        let c = o.call(i, r);
        c || (r = /* @__PURE__ */ $(r), c = o.call(i, r)), l && l.call(i, r);
        const h = i.delete(r);
        return c && Me(i, "delete", r, void 0), h;
      },
      clear() {
        const r = /* @__PURE__ */ $(this), i = r.size !== 0, o = r.clear();
        return i && Me(
          r,
          "clear",
          void 0,
          void 0
        ), o;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((r) => {
    s[r] = hi(r, e, t);
  }), s;
}
function Ks(e, t) {
  const s = di(e, t);
  return (n, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? n : Reflect.get(
    D(s, r) && r in n ? s : n,
    r,
    i
  );
}
const pi = {
  get: /* @__PURE__ */ Ks(!1, !1)
}, gi = {
  get: /* @__PURE__ */ Ks(!1, !0)
}, _i = {
  get: /* @__PURE__ */ Ks(!0, !1)
};
const er = /* @__PURE__ */ new WeakMap(), tr = /* @__PURE__ */ new WeakMap(), sr = /* @__PURE__ */ new WeakMap(), mi = /* @__PURE__ */ new WeakMap();
function bi(e) {
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
function ss(e) {
  return /* @__PURE__ */ Ke(e) ? e : Us(
    e,
    !1,
    ci,
    pi,
    er
  );
}
// @__NO_SIDE_EFFECTS__
function yi(e) {
  return Us(
    e,
    !1,
    ai,
    gi,
    tr
  );
}
// @__NO_SIDE_EFFECTS__
function Os(e) {
  return Us(
    e,
    !0,
    ui,
    _i,
    sr
  );
}
function Us(e, t, s, n, r) {
  if (!L(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const i = r.get(e);
  if (i)
    return i;
  const o = bi(Wr(e));
  if (o === 0)
    return e;
  const l = new Proxy(
    e,
    o === 2 ? n : s
  );
  return r.set(e, l), l;
}
// @__NO_SIDE_EFFECTS__
function ze(e) {
  return /* @__PURE__ */ Ke(e) ? /* @__PURE__ */ ze(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Ke(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function ue(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Ws(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function $(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ $(t) : e;
}
function xi(e) {
  return !D(e, "__v_skip") && Object.isExtensible(e) && Nn(e, "__v_skip", !0), e;
}
const De = (e) => L(e) ? /* @__PURE__ */ ss(e) : e, nt = (e) => L(e) ? /* @__PURE__ */ Os(e) : e;
// @__NO_SIDE_EFFECTS__
function re(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function vi(e) {
  return /* @__PURE__ */ re(e) ? e.value : e;
}
const Si = {
  get: (e, t, s) => t === "__v_raw" ? e : vi(Reflect.get(e, t, s)),
  set: (e, t, s, n) => {
    const r = e[t];
    return /* @__PURE__ */ re(r) && !/* @__PURE__ */ re(s) ? (r.value = s, !0) : Reflect.set(e, t, s, n);
  }
};
function nr(e) {
  return /* @__PURE__ */ ze(e) ? e : new Proxy(e, Si);
}
class wi {
  constructor(t, s, n) {
    this.fn = t, this.setter = s, this._value = void 0, this.dep = new zn(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = xt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !s, this.isSSR = n;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    U !== this)
      return Bn(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Jn(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function Ci(e, t, s = !1) {
  let n, r;
  return I(e) ? n = e : (n = e.get, r = e.set), new wi(n, r, s);
}
const Ht = {}, Ut = /* @__PURE__ */ new WeakMap();
let Je;
function Ti(e, t = !1, s = Je) {
  if (s) {
    let n = Ut.get(s);
    n || Ut.set(s, n = []), n.push(e);
  }
}
function Ei(e, t, s = W) {
  const { immediate: n, deep: r, once: i, scheduler: o, augmentJob: l, call: c } = s, h = (O) => r ? O : /* @__PURE__ */ ue(O) || r === !1 || r === 0 ? Le(O, 1) : Le(O);
  let a, p, w, C, j = !1, M = !1;
  if (/* @__PURE__ */ re(e) ? (p = () => e.value, j = /* @__PURE__ */ ue(e)) : /* @__PURE__ */ ze(e) ? (p = () => h(e), j = !0) : P(e) ? (M = !0, j = e.some((O) => /* @__PURE__ */ ze(O) || /* @__PURE__ */ ue(O)), p = () => e.map((O) => {
    if (/* @__PURE__ */ re(O))
      return O.value;
    if (/* @__PURE__ */ ze(O))
      return h(O);
    if (I(O))
      return c ? c(O, 2) : O();
  })) : I(e) ? t ? p = c ? () => c(e, 2) : e : p = () => {
    if (w) {
      Re();
      try {
        w();
      } finally {
        Fe();
      }
    }
    const O = Je;
    Je = a;
    try {
      return c ? c(e, 3, [C]) : e(C);
    } finally {
      Je = O;
    }
  } : p = Ce, t && r) {
    const O = p, z = r === !0 ? 1 / 0 : r;
    p = () => Le(O(), z);
  }
  const J = ti(), B = () => {
    a.stop(), J && J.active && js(J.effects, a);
  };
  if (i && t) {
    const O = t;
    t = (...z) => {
      const he = O(...z);
      return B(), he;
    };
  }
  let F = M ? new Array(e.length).fill(Ht) : Ht;
  const H = (O) => {
    if (!(!(a.flags & 1) || !a.dirty && !O))
      if (t) {
        const z = a.run();
        if (O || r || j || (M ? z.some((he, de) => Pe(he, F[de])) : Pe(z, F))) {
          w && w();
          const he = Je;
          Je = a;
          try {
            const de = [
              z,
              // pass undefined as the old value when it's changed for the first time
              F === Ht ? void 0 : M && F[0] === Ht ? [] : F,
              C
            ];
            F = z, c ? c(t, 3, de) : (
              // @ts-expect-error
              t(...de)
            );
          } finally {
            Je = he;
          }
        }
      } else
        a.run();
  };
  return l && l(H), a = new Un(p), a.scheduler = o ? () => o(H, !1) : H, C = (O) => Ti(O, !1, a), w = a.onStop = () => {
    const O = Ut.get(a);
    if (O) {
      if (c)
        c(O, 4);
      else
        for (const z of O) z();
      Ut.delete(a);
    }
  }, t ? n ? H(!0) : F = a.run() : o ? o(H.bind(null, !0), !0) : a.run(), B.pause = a.pause.bind(a), B.resume = a.resume.bind(a), B.stop = B, B;
}
function Le(e, t = 1 / 0, s) {
  if (t <= 0 || !L(e) || e.__v_skip || (s = s || /* @__PURE__ */ new Map(), (s.get(e) || 0) >= t))
    return e;
  if (s.set(e, t), t--, /* @__PURE__ */ re(e))
    Le(e.value, t, s);
  else if (P(e))
    for (let n = 0; n < e.length; n++)
      Le(e[n], t, s);
  else if (Kt(e) || Ve(e))
    e.forEach((n) => {
      Le(n, t, s);
    });
  else if (jn(e)) {
    for (const n in e)
      Le(e[n], t, s);
    for (const n of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, n) && Le(e[n], t, s);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Ot(e, t, s, n) {
  try {
    return n ? e(...n) : e();
  } catch (r) {
    ns(r, t, s);
  }
}
function ae(e, t, s, n) {
  if (I(e)) {
    const r = Ot(e, t, s, n);
    return r && Fn(r) && r.catch((i) => {
      ns(i, t, s);
    }), r;
  }
  if (P(e)) {
    const r = [];
    for (let i = 0; i < e.length; i++)
      r.push(ae(e[i], t, s, n));
    return r;
  }
}
function ns(e, t, s, n = !0) {
  const r = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: o } = t && t.appContext.config || W;
  if (t) {
    let l = t.parent;
    const c = t.proxy, h = `https://vuejs.org/error-reference/#runtime-${s}`;
    for (; l; ) {
      const a = l.ec;
      if (a) {
        for (let p = 0; p < a.length; p++)
          if (a[p](e, c, h) === !1)
            return;
      }
      l = l.parent;
    }
    if (i) {
      Re(), Ot(i, null, 10, [
        e,
        c,
        h
      ]), Fe();
      return;
    }
  }
  Oi(e, s, r, n, o);
}
function Oi(e, t, s, n = !0, r = !1) {
  if (r)
    throw e;
  console.error(e);
}
const se = [];
let ye = -1;
const tt = [];
let $e = null, Qe = 0;
const rr = /* @__PURE__ */ Promise.resolve();
let Wt = null;
function Ai(e) {
  const t = Wt || rr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Pi(e) {
  let t = ye + 1, s = se.length;
  for (; t < s; ) {
    const n = t + s >>> 1, r = se[n], i = St(r);
    i < e || i === e && r.flags & 2 ? t = n + 1 : s = n;
  }
  return t;
}
function Bs(e) {
  if (!(e.flags & 1)) {
    const t = St(e), s = se[se.length - 1];
    !s || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= St(s) ? se.push(e) : se.splice(Pi(t), 0, e), e.flags |= 1, ir();
  }
}
function ir() {
  Wt || (Wt = rr.then(lr));
}
function Mi(e) {
  if (!P(e))
    $e && e.id === -1 ? $e.splice(Qe + 1, 0, e) : e.flags & 1 || (tt.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      tt.push(e[t]);
  ir();
}
function fn(e, t, s = ye + 1) {
  for (; s < se.length; s++) {
    const n = se[s];
    if (n && n.flags & 2) {
      if (e && n.id !== e.uid)
        continue;
      se.splice(s, 1), s--, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
    }
  }
}
function or(e) {
  if (tt.length) {
    const t = [...new Set(tt)].sort(
      (s, n) => St(s) - St(n)
    );
    if (tt.length = 0, $e) {
      for (let s = 0; s < t.length; s++)
        $e.push(t[s]);
      return;
    }
    for ($e = t, Qe = 0; Qe < $e.length; Qe++) {
      const s = $e[Qe];
      s.flags & 4 && (s.flags &= -2), s.flags & 8 || s(), s.flags &= -2;
    }
    $e = null, Qe = 0;
  }
}
const St = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function lr(e) {
  try {
    for (ye = 0; ye < se.length; ye++) {
      const t = se[ye];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Ot(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; ye < se.length; ye++) {
      const t = se[ye];
      t && (t.flags &= -2);
    }
    ye = -1, se.length = 0, or(), Wt = null, (se.length || tt.length) && lr();
  }
}
let we = null, fr = null;
function Bt(e) {
  const t = we;
  return we = e, fr = e && e.type.__scopeId || null, t;
}
function Ii(e, t = we, s) {
  if (!t || e._n)
    return e;
  const n = (...r) => {
    n._d && yn(-1);
    const i = Bt(t), o = Xe.length;
    let l;
    try {
      l = e(...r);
    } finally {
      for (let c = Xe.length; c > o; c--) Rr();
      Bt(i), n._d && yn(1);
    }
    return l;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function qe(e, t, s, n) {
  const r = e.dirs, i = t && t.dirs;
  for (let o = 0; o < r.length; o++) {
    const l = r[o];
    i && (l.oldValue = i[o].value);
    let c = l.dir[n];
    c && (Re(), ae(c, s, 8, [
      e.el,
      l,
      e,
      t
    ]), Fe());
  }
}
function Ri(e, t) {
  if (ne) {
    let s = ne.provides;
    const n = ne.parent && ne.parent.provides;
    n === s && (s = ne.provides = Object.create(n)), s[e] = t;
  }
}
function Lt(e, t, s = !1) {
  const n = Do();
  if (n || st) {
    let r = st ? st._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return s && I(t) ? t.call(n && n.proxy) : t;
  }
}
const Fi = /* @__PURE__ */ Symbol.for("v-scx"), Di = () => Lt(Fi);
function _s(e, t, s) {
  return cr(e, t, s);
}
function cr(e, t, s = W) {
  const { immediate: n, deep: r, flush: i, once: o } = s, l = Q({}, s), c = t && n || !t && i !== "post";
  let h;
  if (Tt) {
    if (i === "sync") {
      const C = Di();
      h = C.__watcherHandles || (C.__watcherHandles = []);
    } else if (!c) {
      const C = () => {
      };
      return C.stop = Ce, C.resume = Ce, C.pause = Ce, C;
    }
  }
  const a = ne;
  l.call = (C, j, M) => ae(C, a, j, M);
  let p = !1;
  i === "post" ? l.scheduler = (C) => {
    ie(C, a && a.suspense);
  } : i !== "sync" && (p = !0, l.scheduler = (C, j) => {
    j ? C() : Bs(C);
  }), l.augmentJob = (C) => {
    t && (C.flags |= 4), p && (C.flags |= 2, a && (C.id = a.uid, C.i = a));
  };
  const w = Ei(e, t, l);
  return Tt && (h ? h.push(w) : c && w()), w;
}
function ji(e, t, s) {
  const n = this.proxy, r = G(e) ? e.includes(".") ? ur(n, e) : () => n[e] : e.bind(n, n);
  let i;
  I(t) ? i = t : (i = t.handler, s = t);
  const o = At(this), l = cr(r, i.bind(n), s);
  return o(), l;
}
function ur(e, t) {
  const s = t.split(".");
  return () => {
    let n = e;
    for (let r = 0; r < s.length && n; r++)
      n = n[s[r]];
    return n;
  };
}
const Hi = /* @__PURE__ */ Symbol("_vte"), rs = (e) => e.__isTeleport, ms = /* @__PURE__ */ Symbol("_leaveCb");
function Ni(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const s of e)
      if (s.type !== je) {
        t = s;
        break;
      }
  }
  return t;
}
function ar(e) {
  if (!Gs(e))
    return rs(e.type) && e.children ? Ni(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: s } = e;
  if (s) {
    if (t & 16)
      return s[0];
    if (t & 32 && I(s.default))
      return s.default();
  }
}
function qs(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const s = e.component.subTree;
    qs(
      rs(s.type) && ar(s) || s,
      t
    );
  } else e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function hr(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function cn(e, t) {
  let s;
  return !!((s = Object.getOwnPropertyDescriptor(e, t)) && !s.configurable);
}
const qt = /* @__PURE__ */ new WeakMap();
function mt(e, t, s, n, r = !1) {
  if (P(e)) {
    e.forEach(
      (M, J) => mt(
        M,
        t && (P(t) ? t[J] : t),
        s,
        n,
        r
      )
    );
    return;
  }
  if (bt(n) && !r) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && mt(e, t, s, n.component.subTree);
    return;
  }
  const i = n.shapeFlag & 4 ? zs(n.component) : n.el, o = r ? null : i, { i: l, r: c } = e, h = t && t.r, a = l.refs === W ? l.refs = {} : l.refs, p = l.setupState, w = /* @__PURE__ */ $(p), C = p === W ? Rn : (M) => cn(a, M) ? !1 : D(w, M), j = (M, J) => !(J && cn(a, J));
  if (h != null && h !== c) {
    if (un(t), G(h))
      a[h] = null, C(h) && (p[h] = null);
    else if (/* @__PURE__ */ re(h)) {
      const M = t;
      j(h, M.k) && (h.value = null), M.k && (a[M.k] = null);
    }
  }
  if (I(c))
    Ot(c, l, 12, [o, a]);
  else {
    const M = G(c), J = /* @__PURE__ */ re(c);
    if (M || J) {
      const B = () => {
        if (e.f) {
          const F = M ? C(c) ? p[c] : a[c] : j() || !e.k ? c.value : a[e.k];
          if (r)
            P(F) && js(F, i);
          else if (P(F))
            F.includes(i) || F.push(i);
          else if (M)
            a[c] = [i], C(c) && (p[c] = a[c]);
          else {
            const H = [i];
            j(c, e.k) && (c.value = H), e.k && (a[e.k] = H);
          }
        } else M ? (a[c] = o, C(c) && (p[c] = o)) : J && (j(c, e.k) && (c.value = o), e.k && (a[e.k] = o));
      };
      if (o) {
        const F = () => {
          B(), qt.delete(e);
        };
        F.id = -1, qt.set(e, F), ie(F, s);
      } else
        un(e), B();
    }
  }
}
function un(e) {
  const t = qt.get(e);
  t && (t.flags |= 8, qt.delete(e));
}
kt().requestIdleCallback;
kt().cancelIdleCallback;
const bt = (e) => !!e.type.__asyncLoader, Gs = (e) => e.type.__isKeepAlive;
function $i(e, t) {
  dr(e, "a", t);
}
function Li(e, t) {
  dr(e, "da", t);
}
function dr(e, t, s = ne) {
  const n = e.__wdc || (e.__wdc = () => {
    let r = s;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (is(t, n, s), s) {
    let r = s.parent;
    for (; r && r.parent; )
      Gs(r.parent.vnode) && Vi(n, t, s, r), r = r.parent;
  }
}
function Vi(e, t, s, n) {
  const r = is(
    t,
    e,
    n,
    !0
    /* prepend */
  );
  pr(() => {
    js(n[t], r);
  }, s);
}
function is(e, t, s = ne, n = !1) {
  if (s) {
    const r = s[e] || (s[e] = []), i = t.__weh || (t.__weh = (...o) => {
      Re();
      const l = At(s), c = ae(t, s, e, o);
      return l(), Fe(), c;
    });
    return n ? r.unshift(i) : r.push(i), i;
  }
}
const He = (e) => (t, s = ne) => {
  (!Tt || e === "sp") && is(e, (...n) => t(...n), s);
}, Ki = He("bm"), Ui = He("m"), Wi = He(
  "bu"
), Bi = He("u"), qi = He(
  "bum"
), pr = He("um"), Gi = He(
  "sp"
), Ji = He("rtg"), Yi = He("rtc");
function zi(e, t = ne) {
  is("ec", e, t);
}
const Xi = /* @__PURE__ */ Symbol.for("v-ndc");
function Zi(e, t, s, n) {
  let r;
  const i = s, o = P(e);
  if (o || G(e)) {
    const l = o && /* @__PURE__ */ ze(e);
    let c = !1, h = !1;
    l && (c = !/* @__PURE__ */ ue(e), h = /* @__PURE__ */ Ke(e), e = ts(e)), r = new Array(e.length);
    for (let a = 0, p = e.length; a < p; a++)
      r[a] = t(
        c ? h ? nt(De(e[a])) : De(e[a]) : e[a],
        a,
        void 0,
        i
      );
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let l = 0; l < e; l++)
      r[l] = t(l + 1, l, void 0, i);
  } else if (L(e))
    if (e[Symbol.iterator])
      r = Array.from(
        e,
        (l, c) => t(l, c, void 0, i)
      );
    else {
      const l = Object.keys(e);
      r = new Array(l.length);
      for (let c = 0, h = l.length; c < h; c++) {
        const a = l[c];
        r[c] = t(e[a], a, c, i);
      }
    }
  else
    r = [];
  return r;
}
const As = (e) => e ? Nr(e) ? zs(e) : As(e.parent) : null, yt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Q(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => As(e.parent),
    $root: (e) => As(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => _r(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Bs(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Ai.bind(e.proxy)),
    $watch: (e) => ji.bind(e)
  })
), bs = (e, t) => e !== W && !e.__isScriptSetup && D(e, t), ki = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: s, setupState: n, data: r, props: i, accessCache: o, type: l, appContext: c } = e;
    if (t[0] !== "$") {
      const w = o[t];
      if (w !== void 0)
        switch (w) {
          case 1:
            return n[t];
          case 2:
            return r[t];
          case 4:
            return s[t];
          case 3:
            return i[t];
        }
      else {
        if (bs(n, t))
          return o[t] = 1, n[t];
        if (r !== W && D(r, t))
          return o[t] = 2, r[t];
        if (D(i, t))
          return o[t] = 3, i[t];
        if (s !== W && D(s, t))
          return o[t] = 4, s[t];
        Ps && (o[t] = 0);
      }
    }
    const h = yt[t];
    let a, p;
    if (h)
      return t === "$attrs" && k(e.attrs, "get", ""), h(e);
    if (
      // css module (injected by vue-loader)
      (a = l.__cssModules) && (a = a[t])
    )
      return a;
    if (s !== W && D(s, t))
      return o[t] = 4, s[t];
    if (
      // global properties
      p = c.config.globalProperties, D(p, t)
    )
      return p[t];
  },
  set({ _: e }, t, s) {
    const { data: n, setupState: r, ctx: i } = e;
    return bs(r, t) ? (r[t] = s, !0) : n !== W && D(n, t) ? (n[t] = s, !0) : D(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = s, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: s, ctx: n, appContext: r, props: i, type: o }
  }, l) {
    let c;
    return !!(s[l] || e !== W && l[0] !== "$" && D(e, l) || bs(t, l) || D(i, l) || D(n, l) || D(yt, l) || D(r.config.globalProperties, l) || (c = o.__cssModules) && c[l]);
  },
  defineProperty(e, t, s) {
    return s.get != null ? e._.accessCache[t] = 0 : D(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
  }
};
function an(e) {
  return P(e) ? e.reduce(
    (t, s) => (t[s] = null, t),
    {}
  ) : e;
}
let Ps = !0;
function Qi(e) {
  const t = _r(e), s = e.proxy, n = e.ctx;
  Ps = !1, t.beforeCreate && hn(t.beforeCreate, e, "bc");
  const {
    // state
    data: r,
    computed: i,
    methods: o,
    watch: l,
    provide: c,
    inject: h,
    // lifecycle
    created: a,
    beforeMount: p,
    mounted: w,
    beforeUpdate: C,
    updated: j,
    activated: M,
    deactivated: J,
    beforeDestroy: B,
    beforeUnmount: F,
    destroyed: H,
    unmounted: O,
    render: z,
    renderTracked: he,
    renderTriggered: de,
    errorCaptured: Ne,
    serverPrefetch: Pt,
    // public API
    expose: Ue,
    inheritAttrs: it,
    // assets
    components: Mt,
    directives: It,
    filters: fs
  } = t;
  if (h && eo(h, n, null), o)
    for (const q in o) {
      const K = o[q];
      I(K) && (n[q] = K.bind(s));
    }
  if (r) {
    const q = r.call(s, s);
    L(q) && (e.data = /* @__PURE__ */ ss(q));
  }
  if (Ps = !0, i)
    for (const q in i) {
      const K = i[q], We = I(K) ? K.bind(s, s) : I(K.get) ? K.get.bind(s, s) : Ce, Rt = !I(K) && I(K.set) ? K.set.bind(s) : Ce, Be = Rs({
        get: We,
        set: Rt
      });
      Object.defineProperty(n, q, {
        enumerable: !0,
        configurable: !0,
        get: () => Be.value,
        set: (pe) => Be.value = pe
      });
    }
  if (l)
    for (const q in l)
      gr(l[q], n, s, q);
  if (c) {
    const q = I(c) ? c.call(s) : c;
    Reflect.ownKeys(q).forEach((K) => {
      Ri(K, q[K]);
    });
  }
  a && hn(a, e, "c");
  function ee(q, K) {
    P(K) ? K.forEach((We) => q(We.bind(s))) : K && q(K.bind(s));
  }
  if (ee(Ki, p), ee(Ui, w), ee(Wi, C), ee(Bi, j), ee($i, M), ee(Li, J), ee(zi, Ne), ee(Yi, he), ee(Ji, de), ee(qi, F), ee(pr, O), ee(Gi, Pt), P(Ue))
    if (Ue.length) {
      const q = e.exposed || (e.exposed = {});
      Ue.forEach((K) => {
        Object.defineProperty(q, K, {
          get: () => s[K],
          set: (We) => s[K] = We,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  z && e.render === Ce && (e.render = z), it != null && (e.inheritAttrs = it), Mt && (e.components = Mt), It && (e.directives = It), Pt && hr(e);
}
function eo(e, t, s = Ce) {
  P(e) && (e = Ms(e));
  for (const n in e) {
    const r = e[n];
    let i;
    L(r) ? "default" in r ? i = Lt(
      r.from || n,
      r.default,
      !0
    ) : i = Lt(r.from || n) : i = Lt(r), /* @__PURE__ */ re(i) ? Object.defineProperty(t, n, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (o) => i.value = o
    }) : t[n] = i;
  }
}
function hn(e, t, s) {
  ae(
    P(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy),
    t,
    s
  );
}
function gr(e, t, s, n) {
  let r = n.includes(".") ? ur(s, n) : () => s[n];
  if (G(e)) {
    const i = t[e];
    I(i) && _s(r, i);
  } else if (I(e))
    _s(r, e.bind(s));
  else if (L(e))
    if (P(e))
      e.forEach((i) => gr(i, t, s, n));
    else {
      const i = I(e.handler) ? e.handler.bind(s) : t[e.handler];
      I(i) && _s(r, i, e);
    }
}
function _r(e) {
  const t = e.type, { mixins: s, extends: n } = t, {
    mixins: r,
    optionsCache: i,
    config: { optionMergeStrategies: o }
  } = e.appContext, l = i.get(t);
  let c;
  return l ? c = l : !r.length && !s && !n ? c = t : (c = {}, r.length && r.forEach(
    (h) => Gt(c, h, o, !0)
  ), Gt(c, t, o)), L(t) && i.set(t, c), c;
}
function Gt(e, t, s, n = !1) {
  const { mixins: r, extends: i } = t;
  i && Gt(e, i, s, !0), r && r.forEach(
    (o) => Gt(e, o, s, !0)
  );
  for (const o in t)
    if (!(n && o === "expose")) {
      const l = to[o] || s && s[o];
      e[o] = l ? l(e[o], t[o]) : t[o];
    }
  return e;
}
const to = {
  data: dn,
  props: pn,
  emits: pn,
  // objects
  methods: at,
  computed: at,
  // lifecycle
  beforeCreate: te,
  created: te,
  beforeMount: te,
  mounted: te,
  beforeUpdate: te,
  updated: te,
  beforeDestroy: te,
  beforeUnmount: te,
  destroyed: te,
  unmounted: te,
  activated: te,
  deactivated: te,
  errorCaptured: te,
  serverPrefetch: te,
  // assets
  components: at,
  directives: at,
  // watch
  watch: no,
  // provide / inject
  provide: dn,
  inject: so
};
function dn(e, t) {
  return t ? e ? function() {
    return Q(
      I(e) ? e.call(this, this) : e,
      I(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function so(e, t) {
  return at(Ms(e), Ms(t));
}
function Ms(e) {
  if (P(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++)
      t[e[s]] = e[s];
    return t;
  }
  return e;
}
function te(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function at(e, t) {
  return e ? Q(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function pn(e, t) {
  return e ? P(e) && P(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Q(
    /* @__PURE__ */ Object.create(null),
    an(e),
    an(t ?? {})
  ) : t;
}
function no(e, t) {
  if (!e) return t;
  if (!t) return e;
  const s = Q(/* @__PURE__ */ Object.create(null), e);
  for (const n in t)
    s[n] = te(e[n], t[n]);
  return s;
}
function mr() {
  return {
    app: null,
    config: {
      isNativeTag: Rn,
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
let ro = 0;
function io(e, t) {
  return function(n, r = null) {
    I(n) || (n = Q({}, n)), r != null && !L(r) && (r = null);
    const i = mr(), o = /* @__PURE__ */ new WeakSet(), l = [];
    let c = !1;
    const h = i.app = {
      _uid: ro++,
      _component: n,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: Vo,
      get config() {
        return i.config;
      },
      set config(a) {
      },
      use(a, ...p) {
        return o.has(a) || (a && I(a.install) ? (o.add(a), a.install(h, ...p)) : I(a) && (o.add(a), a(h, ...p))), h;
      },
      mixin(a) {
        return i.mixins.includes(a) || i.mixins.push(a), h;
      },
      component(a, p) {
        return p ? (i.components[a] = p, h) : i.components[a];
      },
      directive(a, p) {
        return p ? (i.directives[a] = p, h) : i.directives[a];
      },
      mount(a, p, w) {
        if (!c) {
          const C = h._ceVNode || Ie(n, r);
          return C.appContext = i, w === !0 ? w = "svg" : w === !1 && (w = void 0), e(C, a, w), c = !0, h._container = a, a.__vue_app__ = h, zs(C.component);
        }
      },
      onUnmount(a) {
        l.push(a);
      },
      unmount() {
        c && (ae(
          l,
          h._instance,
          16
        ), e(null, h._container), delete h._container.__vue_app__);
      },
      provide(a, p) {
        return i.provides[a] = p, h;
      },
      runWithContext(a) {
        const p = st;
        st = h;
        try {
          return a();
        } finally {
          st = p;
        }
      }
    };
    return h;
  };
}
let st = null;
const oo = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${fe(t)}Modifiers`] || e[`${Ze(t)}Modifiers`];
function lo(e, t, ...s) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || W;
  let r = s;
  const i = t.startsWith("update:"), o = i && oo(n, t.slice(7));
  o && (o.trim && (r = s.map((a) => G(a) ? a.trim() : a)), o.number && (r = r.map(Gr)));
  let l, c = n[l = us(t)] || // also try camelCase event handler (#2249)
  n[l = us(fe(t))];
  !c && i && (c = n[l = us(Ze(t))]), c && ae(
    c,
    e,
    6,
    r
  );
  const h = n[l + "Once"];
  if (h) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, ae(
      h,
      e,
      6,
      r
    );
  }
}
const fo = /* @__PURE__ */ new WeakMap();
function br(e, t, s = !1) {
  const n = s ? fo : t.emitsCache, r = n.get(e);
  if (r !== void 0)
    return r;
  const i = e.emits;
  let o = {}, l = !1;
  if (!I(e)) {
    const c = (h) => {
      const a = br(h, t, !0);
      a && (l = !0, Q(o, a));
    };
    !s && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !i && !l ? (L(e) && n.set(e, null), null) : (P(i) ? i.forEach((c) => o[c] = null) : Q(o, i), L(e) && n.set(e, o), o);
}
function os(e, t) {
  return !e || !zt(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), D(e, t[0].toLowerCase() + t.slice(1)) || D(e, Ze(t)) || D(e, t));
}
function gn(e) {
  const {
    type: t,
    vnode: s,
    proxy: n,
    withProxy: r,
    propsOptions: [i],
    slots: o,
    attrs: l,
    emit: c,
    render: h,
    renderCache: a,
    props: p,
    data: w,
    setupState: C,
    ctx: j,
    inheritAttrs: M
  } = e, J = Bt(e);
  let B, F;
  try {
    if (s.shapeFlag & 4) {
      const O = r || n, z = O;
      B = Se(
        h.call(
          z,
          O,
          a,
          p,
          C,
          w,
          j
        )
      ), F = l;
    } else {
      const O = t;
      B = Se(
        O.length > 1 ? O(
          p,
          { attrs: l, slots: o, emit: c }
        ) : O(
          p,
          null
        )
      ), F = t.props ? l : co(l);
    }
  } catch (O) {
    Xe.length = 0, ns(O, e, 1), B = Ie(je);
  }
  let H = B;
  if (F && M !== !1) {
    const O = Object.keys(F), { shapeFlag: z } = H;
    O.length && z & 7 && (i && O.some(Xt) && (F = uo(
      F,
      i
    )), H = rt(H, F, !1, !0));
  }
  if (s.dirs && (H = rt(H, null, !1, !0), H.dirs = H.dirs ? H.dirs.concat(s.dirs) : s.dirs), s.transition) {
    const O = rs(H.type) && ar(H) || H;
    qs(O, s.transition);
  }
  return B = H, Bt(J), B;
}
const co = (e) => {
  let t;
  for (const s in e)
    (s === "class" || s === "style" || zt(s)) && ((t || (t = {}))[s] = e[s]);
  return t;
}, uo = (e, t) => {
  const s = {};
  for (const n in e)
    (!Xt(n) || !(n.slice(9) in t)) && (s[n] = e[n]);
  return s;
};
function ao(e, t, s) {
  const { props: n, children: r, component: i } = e, { props: o, children: l, patchFlag: c } = t, h = i.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (s && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return n ? _n(n, o, h) : !!o;
    if (c & 8) {
      const a = t.dynamicProps;
      for (let p = 0; p < a.length; p++) {
        const w = a[p];
        if (yr(o, n, w) && !os(h, w))
          return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable) ? !0 : n === o ? !1 : n ? o ? _n(n, o, h) : !0 : !!o;
  return !1;
}
function _n(e, t, s) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < n.length; r++) {
    const i = n[r];
    if (yr(t, e, i) && !os(s, i))
      return !0;
  }
  return !1;
}
function yr(e, t, s) {
  const n = e[s], r = t[s];
  return s === "style" && L(n) && L(r) ? !es(n, r) : n !== r;
}
function ho({ vnode: e, parent: t, suspense: s }, n) {
  for (; t; ) {
    const r = t.subTree;
    if (r.suspense && r.suspense.activeBranch === e && (r.suspense.vnode.el = r.el = n, e = r), r === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
  s && s.activeBranch === e && (s.vnode.el = n);
}
const xr = {}, vr = () => Object.create(xr), Sr = (e) => Object.getPrototypeOf(e) === xr;
function po(e, t, s, n = !1) {
  const r = {}, i = vr();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), wr(e, t, r, i);
  for (const o in e.propsOptions[0])
    o in r || (r[o] = void 0);
  s ? e.props = n ? r : /* @__PURE__ */ yi(r) : e.type.props ? e.props = r : e.props = i, e.attrs = i;
}
function go(e, t, s, n) {
  const {
    props: r,
    attrs: i,
    vnode: { patchFlag: o }
  } = e, l = /* @__PURE__ */ $(r), [c] = e.propsOptions;
  let h = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (n || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const a = e.vnode.dynamicProps;
      for (let p = 0; p < a.length; p++) {
        let w = a[p];
        if (os(e.emitsOptions, w))
          continue;
        const C = t[w];
        if (c)
          if (D(i, w))
            C !== i[w] && (i[w] = C, h = !0);
          else {
            const j = fe(w);
            r[j] = Is(
              c,
              l,
              j,
              C,
              e,
              !1
            );
          }
        else
          C !== i[w] && (i[w] = C, h = !0);
      }
    }
  } else {
    wr(e, t, r, i) && (h = !0);
    let a;
    for (const p in l)
      (!t || // for camelCase
      !D(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((a = Ze(p)) === p || !D(t, a))) && (c ? s && // for camelCase
      (s[p] !== void 0 || // for kebab-case
      s[a] !== void 0) && (r[p] = Is(
        c,
        l,
        p,
        void 0,
        e,
        !0
      )) : delete r[p]);
    if (i !== l)
      for (const p in i)
        (!t || !D(t, p)) && (delete i[p], h = !0);
  }
  h && Me(e.attrs, "set", "");
}
function wr(e, t, s, n) {
  const [r, i] = e.propsOptions;
  let o = !1, l;
  if (t)
    for (let c in t) {
      if (pt(c))
        continue;
      const h = t[c];
      let a;
      r && D(r, a = fe(c)) ? !i || !i.includes(a) ? s[a] = h : (l || (l = {}))[a] = h : os(e.emitsOptions, c) || (!(c in n) || h !== n[c]) && (n[c] = h, o = !0);
    }
  if (i) {
    const c = /* @__PURE__ */ $(s), h = l || W;
    for (let a = 0; a < i.length; a++) {
      const p = i[a];
      s[p] = Is(
        r,
        c,
        p,
        h[p],
        e,
        !D(h, p)
      );
    }
  }
  return o;
}
function Is(e, t, s, n, r, i) {
  const o = e[s];
  if (o != null) {
    const l = D(o, "default");
    if (l && n === void 0) {
      const c = o.default;
      if (o.type !== Function && !o.skipFactory && I(c)) {
        const { propsDefaults: h } = r;
        if (s in h)
          n = h[s];
        else {
          const a = At(r);
          n = h[s] = c.call(
            null,
            t
          ), a();
        }
      } else
        n = c;
      r.ce && r.ce._setProp(s, n);
    }
    o[
      0
      /* shouldCast */
    ] && (i && !l ? n = !1 : o[
      1
      /* shouldCastTrue */
    ] && (n === "" || n === Ze(s)) && (n = !0));
  }
  return n;
}
const _o = /* @__PURE__ */ new WeakMap();
function Cr(e, t, s = !1) {
  const n = s ? _o : t.propsCache, r = n.get(e);
  if (r)
    return r;
  const i = e.props, o = {}, l = [];
  let c = !1;
  if (!I(e)) {
    const a = (p) => {
      c = !0;
      const [w, C] = Cr(p, t, !0);
      Q(o, w), C && l.push(...C);
    };
    !s && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  if (!i && !c)
    return L(e) && n.set(e, et), et;
  if (P(i))
    for (let a = 0; a < i.length; a++) {
      const p = fe(i[a]);
      mn(p) && (o[p] = W);
    }
  else if (i)
    for (const a in i) {
      const p = fe(a);
      if (mn(p)) {
        const w = i[a], C = o[p] = P(w) || I(w) ? { type: w } : Q({}, w), j = C.type;
        let M = !1, J = !0;
        if (P(j))
          for (let B = 0; B < j.length; ++B) {
            const F = j[B], H = I(F) && F.name;
            if (H === "Boolean") {
              M = !0;
              break;
            } else H === "String" && (J = !1);
          }
        else
          M = I(j) && j.name === "Boolean";
        C[
          0
          /* shouldCast */
        ] = M, C[
          1
          /* shouldCastTrue */
        ] = J, (M || D(C, "default")) && l.push(p);
      }
    }
  const h = [o, l];
  return L(e) && n.set(e, h), h;
}
function mn(e) {
  return e[0] !== "$" && !pt(e);
}
const Js = (e) => e === "_" || e === "_ctx" || e === "$stable", Ys = (e) => P(e) ? e.map(Se) : [Se(e)], mo = (e, t, s) => {
  if (t._n)
    return t;
  const n = Ii((...r) => Ys(t(...r)), s);
  return n._c = !1, n;
}, Tr = (e, t, s) => {
  const n = e._ctx;
  for (const r in e) {
    if (Js(r)) continue;
    const i = e[r];
    if (I(i))
      t[r] = mo(r, i, n);
    else if (i != null) {
      const o = Ys(i);
      t[r] = () => o;
    }
  }
}, Er = (e, t) => {
  const s = Ys(t);
  e.slots.default = () => s;
}, Or = (e, t, s) => {
  for (const n in t)
    (s || !Js(n)) && (e[n] = t[n]);
}, bo = (e, t, s) => {
  const n = e.slots = vr();
  if (e.vnode.shapeFlag & 32) {
    const r = t._;
    r ? (Or(n, t, s), s && Nn(n, "_", r, !0)) : Tr(t, n);
  } else t && Er(e, t);
}, yo = (e, t, s) => {
  const { vnode: n, slots: r } = e;
  let i = !0, o = W;
  if (n.shapeFlag & 32) {
    const l = t._;
    l ? s && l === 1 ? i = !1 : Or(r, t, s) : (i = !t.$stable, Tr(t, r)), o = t;
  } else t && (Er(e, t), o = { default: 1 });
  if (i)
    for (const l in r)
      !Js(l) && o[l] == null && delete r[l];
}, ie = Co;
function xo(e) {
  return vo(e);
}
function vo(e, t) {
  const s = kt();
  s.__VUE__ = !0;
  const {
    insert: n,
    remove: r,
    patchProp: i,
    createElement: o,
    createText: l,
    createComment: c,
    setText: h,
    setElementText: a,
    parentNode: p,
    nextSibling: w,
    setScopeId: C = Ce,
    insertStaticContent: j
  } = e, M = (f, u, d, b = null, m = null, g = null, v = void 0, x = null, y = !!u.dynamicChildren) => {
    if (f === u)
      return;
    f && !ut(f, u) && (b = Ft(f), pe(f, m, g, !0), f = null), u.patchFlag === -2 && (y = !1, u.dynamicChildren = null);
    const { type: _, ref: E, shapeFlag: S } = u;
    switch (_) {
      case ls:
        J(f, u, d, b);
        break;
      case je:
        B(f, u, d, b);
        break;
      case xs:
        f == null && F(u, d, b, v);
        break;
      case ve:
        Mt(
          f,
          u,
          d,
          b,
          m,
          g,
          v,
          x,
          y
        );
        break;
      default:
        S & 1 ? z(
          f,
          u,
          d,
          b,
          m,
          g,
          v,
          x,
          y
        ) : S & 6 ? It(
          f,
          u,
          d,
          b,
          m,
          g,
          v,
          x,
          y
        ) : (S & 64 || S & 128) && _.process(
          f,
          u,
          d,
          b,
          m,
          g,
          v,
          x,
          y,
          lt
        );
    }
    E != null && m ? mt(E, f && f.ref, g, u || f, !u) : E == null && f && f.ref != null && mt(f.ref, null, g, f, !0);
  }, J = (f, u, d, b) => {
    if (f == null)
      n(
        u.el = l(u.children),
        d,
        b
      );
    else {
      const m = u.el = f.el;
      u.children !== f.children && h(m, u.children);
    }
  }, B = (f, u, d, b) => {
    f == null ? n(
      u.el = c(u.children || ""),
      d,
      b
    ) : u.el = f.el;
  }, F = (f, u, d, b) => {
    [f.el, f.anchor] = j(
      f.children,
      u,
      d,
      b,
      f.el,
      f.anchor
    );
  }, H = ({ el: f, anchor: u }, d, b) => {
    let m;
    for (; f && f !== u; )
      m = w(f), n(f, d, b), f = m;
    n(u, d, b);
  }, O = ({ el: f, anchor: u }) => {
    let d;
    for (; f && f !== u; )
      d = w(f), r(f), f = d;
    r(u);
  }, z = (f, u, d, b, m, g, v, x, y) => {
    if (u.type === "svg" ? v = "svg" : u.type === "math" && (v = "mathml"), f == null)
      he(
        u,
        d,
        b,
        m,
        g,
        v,
        x,
        y
      );
    else {
      const _ = f.el && f.el._isVueCE ? f.el : null;
      try {
        _ && _._beginPatch(), Pt(
          f,
          u,
          m,
          g,
          v,
          x,
          y
        );
      } finally {
        _ && _._endPatch();
      }
    }
  }, he = (f, u, d, b, m, g, v, x) => {
    let y, _;
    const { props: E, shapeFlag: S, transition: T, dirs: A } = f;
    if (y = f.el = o(
      f.type,
      g,
      E && E.is,
      E
    ), S & 8 ? a(y, f.children) : S & 16 && Ne(
      f.children,
      y,
      null,
      b,
      m,
      ys(f, g),
      v,
      x
    ), A && qe(f, null, b, "created"), de(y, f, f.scopeId, v, b), E) {
      for (const V in E)
        V !== "value" && !pt(V) && i(y, V, null, E[V], g, b);
      "value" in E && i(y, "value", null, E.value, g), (_ = E.onVnodeBeforeMount) && be(_, b, f);
    }
    A && qe(f, null, b, "beforeMount");
    const R = So(m, T);
    R && T.beforeEnter(y), n(y, u, d), ((_ = E && E.onVnodeMounted) || R || A) && ie(() => {
      try {
        _ && be(_, b, f), R && T.enter(y), A && qe(f, null, b, "mounted");
      } finally {
      }
    }, m);
  }, de = (f, u, d, b, m) => {
    if (d && C(f, d), b)
      for (let g = 0; g < b.length; g++)
        C(f, b[g]);
    if (m) {
      let g = m.subTree;
      if (u === g || Ir(g.type) && (g.ssContent === u || g.ssFallback === u)) {
        const v = m.vnode;
        de(
          f,
          v,
          v.scopeId,
          v.slotScopeIds,
          m.parent
        );
      }
    }
  }, Ne = (f, u, d, b, m, g, v, x, y = 0) => {
    for (let _ = y; _ < f.length; _++) {
      const E = f[_] = x ? Ae(f[_]) : Se(f[_]);
      M(
        null,
        E,
        u,
        d,
        b,
        m,
        g,
        v,
        x
      );
    }
  }, Pt = (f, u, d, b, m, g, v) => {
    const x = u.el = f.el;
    let { patchFlag: y, dynamicChildren: _, dirs: E } = u;
    y |= f.patchFlag & 16;
    const S = f.props || W, T = u.props || W;
    let A;
    if (d && Ge(d, !1), (A = T.onVnodeBeforeUpdate) && be(A, d, u, f), E && qe(u, f, d, "beforeUpdate"), d && Ge(d, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    _ && (!f.dynamicChildren || f.dynamicChildren.length !== _.length) && (y = 0, v = !1, _ = null), (S.innerHTML && T.innerHTML == null || S.textContent && T.textContent == null) && a(x, ""), _ ? Ue(
      f.dynamicChildren,
      _,
      x,
      d,
      b,
      ys(u, m),
      g
    ) : v || K(
      f,
      u,
      x,
      null,
      d,
      b,
      ys(u, m),
      g,
      !1
    ), y > 0) {
      if (y & 16)
        it(x, S, T, d, m);
      else if (y & 2 && S.class !== T.class && i(x, "class", null, T.class, m), y & 4 && i(x, "style", S.style, T.style, m), y & 8) {
        const R = u.dynamicProps;
        for (let V = 0; V < R.length; V++) {
          const N = R[V], Y = S[N], X = T[N];
          (X !== Y || N === "value") && i(x, N, Y, X, m, d);
        }
      }
      y & 1 && f.children !== u.children && a(x, u.children);
    } else !v && _ == null && it(x, S, T, d, m);
    ((A = T.onVnodeUpdated) || E) && ie(() => {
      A && be(A, d, u, f), E && qe(u, f, d, "updated");
    }, b);
  }, Ue = (f, u, d, b, m, g, v) => {
    for (let x = 0; x < u.length; x++) {
      const y = f[x], _ = u[x], E = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        y.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (y.type === ve || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !ut(y, _) || // - In the case of a component, it could contain anything.
        y.shapeFlag & 198) ? p(y.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          d
        )
      );
      M(
        y,
        _,
        E,
        null,
        b,
        m,
        g,
        v,
        !0
      );
    }
  }, it = (f, u, d, b, m) => {
    if (u !== d) {
      if (u !== W)
        for (const g in u)
          !pt(g) && !(g in d) && i(
            f,
            g,
            u[g],
            null,
            m,
            b
          );
      for (const g in d) {
        if (pt(g)) continue;
        const v = d[g], x = u[g];
        v !== x && g !== "value" && i(f, g, x, v, m, b);
      }
      "value" in d && i(f, "value", u.value, d.value, m);
    }
  }, Mt = (f, u, d, b, m, g, v, x, y) => {
    const _ = u.el = f ? f.el : l(""), E = u.anchor = f ? f.anchor : l("");
    let { patchFlag: S, dynamicChildren: T, slotScopeIds: A } = u;
    A && (x = x ? x.concat(A) : A), f == null ? (n(_, d, b), n(E, d, b), Ne(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      u.children || [],
      d,
      E,
      m,
      g,
      v,
      x,
      y
    )) : S > 0 && S & 64 && T && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    f.dynamicChildren && f.dynamicChildren.length === T.length ? (Ue(
      f.dynamicChildren,
      T,
      d,
      m,
      g,
      v,
      x
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (u.key != null || m && u === m.subTree) && Ar(
      f,
      u,
      !0
      /* shallow */
    )) : K(
      f,
      u,
      d,
      E,
      m,
      g,
      v,
      x,
      y
    );
  }, It = (f, u, d, b, m, g, v, x, y) => {
    u.slotScopeIds = x, f == null ? u.shapeFlag & 512 ? m.ctx.activate(
      u,
      d,
      b,
      v,
      y
    ) : fs(
      u,
      d,
      b,
      m,
      g,
      v,
      y
    ) : Xs(f, u, y);
  }, fs = (f, u, d, b, m, g, v) => {
    const x = f.component = Fo(
      f,
      b,
      m
    );
    if (Gs(f) && (x.ctx.renderer = lt), jo(x, !1, v), x.asyncDep) {
      if (m && m.registerDep(x, ee, v), !f.el) {
        const y = x.subTree = Ie(je);
        B(null, y, u, d), f.placeholder = y.el;
      }
    } else
      ee(
        x,
        f,
        u,
        d,
        m,
        g,
        v
      );
  }, Xs = (f, u, d) => {
    const b = u.component = f.component;
    if (ao(f, u, d))
      if (b.asyncDep && !b.asyncResolved) {
        q(b, u, d);
        return;
      } else
        b.next = u, b.update();
    else
      u.el = f.el, b.vnode = u;
  }, ee = (f, u, d, b, m, g, v) => {
    const x = () => {
      if (f.isMounted) {
        let { next: S, bu: T, u: A, parent: R, vnode: V } = f;
        {
          const _e = Pr(f);
          if (_e) {
            S && (S.el = V.el, q(f, S, v)), _e.asyncDep.then(() => {
              ie(() => {
                f.isUnmounted || _();
              }, m);
            });
            return;
          }
        }
        let N = S, Y;
        Ge(f, !1), S ? (S.el = V.el, q(f, S, v)) : S = V, T && as(T), (Y = S.props && S.props.onVnodeBeforeUpdate) && be(Y, R, S, V), Ge(f, !0);
        const X = gn(f), ge = f.subTree;
        f.subTree = X, M(
          ge,
          X,
          // parent may have changed if it's in a teleport
          p(ge.el),
          // anchor may have changed if it's in a fragment
          Ft(ge),
          f,
          m,
          g
        ), S.el = X.el, N === null && ho(f, X.el), A && ie(A, m), (Y = S.props && S.props.onVnodeUpdated) && ie(
          () => be(Y, R, S, V),
          m
        );
      } else {
        let S;
        const { el: T, props: A } = u, { bm: R, m: V, parent: N, root: Y, type: X } = f, ge = bt(u);
        Ge(f, !1), R && as(R), !ge && (S = A && A.onVnodeBeforeMount) && be(S, N, u), Ge(f, !0);
        {
          Y.ce && Y.ce._hasShadowRoot() && Y.ce._injectChildStyle(
            X,
            f.parent ? f.parent.type : void 0
          );
          const _e = f.subTree = gn(f);
          M(
            null,
            _e,
            d,
            b,
            f,
            m,
            g
          ), u.el = _e.el;
        }
        if (V && ie(V, m), !ge && (S = A && A.onVnodeMounted)) {
          const _e = u;
          ie(
            () => be(S, N, _e),
            m
          );
        }
        (u.shapeFlag & 256 || N && bt(N.vnode) && N.vnode.shapeFlag & 256) && f.a && ie(f.a, m), f.isMounted = !0, u = d = b = null;
      }
    };
    f.scope.on();
    const y = f.effect = new Un(x);
    f.scope.off();
    const _ = f.update = y.run.bind(y), E = f.job = y.runIfDirty.bind(y);
    E.i = f, E.id = f.uid, y.scheduler = () => Bs(E), Ge(f, !0), _();
  }, q = (f, u, d) => {
    u.component = f;
    const b = f.vnode.props;
    f.vnode = u, f.next = null, go(f, u.props, b, d), yo(f, u.children, d), Re(), fn(f), Fe();
  }, K = (f, u, d, b, m, g, v, x, y = !1) => {
    const _ = f && f.children, E = f ? f.shapeFlag : 0, S = u.children, { patchFlag: T, shapeFlag: A } = u;
    if (T > 0) {
      if (T & 128) {
        Rt(
          _,
          S,
          d,
          b,
          m,
          g,
          v,
          x,
          y
        );
        return;
      } else if (T & 256) {
        We(
          _,
          S,
          d,
          b,
          m,
          g,
          v,
          x,
          y
        );
        return;
      }
    }
    A & 8 ? (E & 16 && ot(_, m, g), S !== _ && a(d, S)) : E & 16 ? A & 16 ? Rt(
      _,
      S,
      d,
      b,
      m,
      g,
      v,
      x,
      y
    ) : ot(_, m, g, !0) : (E & 8 && a(d, ""), A & 16 && Ne(
      S,
      d,
      b,
      m,
      g,
      v,
      x,
      y
    ));
  }, We = (f, u, d, b, m, g, v, x, y) => {
    f = f || et, u = u || et;
    const _ = f.length, E = u.length, S = Math.min(_, E);
    let T;
    for (T = 0; T < S; T++) {
      const A = u[T] = y ? Ae(u[T]) : Se(u[T]);
      M(
        f[T],
        A,
        d,
        null,
        m,
        g,
        v,
        x,
        y
      );
    }
    _ > E ? ot(
      f,
      m,
      g,
      !0,
      !1,
      S
    ) : Ne(
      u,
      d,
      b,
      m,
      g,
      v,
      x,
      y,
      S
    );
  }, Rt = (f, u, d, b, m, g, v, x, y) => {
    let _ = 0;
    const E = u.length;
    let S = f.length - 1, T = E - 1;
    for (; _ <= S && _ <= T; ) {
      const A = f[_], R = u[_] = y ? Ae(u[_]) : Se(u[_]);
      if (ut(A, R))
        M(
          A,
          R,
          d,
          null,
          m,
          g,
          v,
          x,
          y
        );
      else
        break;
      _++;
    }
    for (; _ <= S && _ <= T; ) {
      const A = f[S], R = u[T] = y ? Ae(u[T]) : Se(u[T]);
      if (ut(A, R))
        M(
          A,
          R,
          d,
          null,
          m,
          g,
          v,
          x,
          y
        );
      else
        break;
      S--, T--;
    }
    if (_ > S) {
      if (_ <= T) {
        const A = T + 1, R = A < E ? u[A].el : b;
        for (; _ <= T; )
          M(
            null,
            u[_] = y ? Ae(u[_]) : Se(u[_]),
            d,
            R,
            m,
            g,
            v,
            x,
            y
          ), _++;
      }
    } else if (_ > T)
      for (; _ <= S; )
        pe(f[_], m, g, !0), _++;
    else {
      const A = _, R = _, V = /* @__PURE__ */ new Map();
      for (_ = R; _ <= T; _++) {
        const oe = u[_] = y ? Ae(u[_]) : Se(u[_]);
        oe.key != null && V.set(oe.key, _);
      }
      let N, Y = 0;
      const X = T - R + 1;
      let ge = !1, _e = 0;
      const ft = new Array(X);
      for (_ = 0; _ < X; _++) ft[_] = 0;
      for (_ = A; _ <= S; _++) {
        const oe = f[_];
        if (Y >= X) {
          pe(oe, m, g, !0);
          continue;
        }
        let me;
        if (oe.key != null)
          me = V.get(oe.key);
        else
          for (N = R; N <= T; N++)
            if (ft[N - R] === 0 && ut(oe, u[N])) {
              me = N;
              break;
            }
        me === void 0 ? pe(oe, m, g, !0) : (ft[me - R] = _ + 1, me >= _e ? _e = me : ge = !0, M(
          oe,
          u[me],
          d,
          null,
          m,
          g,
          v,
          x,
          y
        ), Y++);
      }
      const Qs = ge ? wo(ft) : et;
      for (N = Qs.length - 1, _ = X - 1; _ >= 0; _--) {
        const oe = R + _, me = u[oe], en = u[oe + 1], tn = oe + 1 < E ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          en.el || Mr(en)
        ) : b;
        ft[_] === 0 ? M(
          null,
          me,
          d,
          tn,
          m,
          g,
          v,
          x,
          y
        ) : ge && (N < 0 || _ !== Qs[N] ? Be(me, d, tn, 2) : N--);
      }
    }
  }, Be = (f, u, d, b, m = null) => {
    const { el: g, type: v, transition: x, children: y, shapeFlag: _ } = f;
    if (_ & 6) {
      Be(f.component.subTree, u, d, b);
      return;
    }
    if (_ & 128) {
      f.suspense.move(u, d, b);
      return;
    }
    if (_ & 64) {
      v.move(f, u, d, lt);
      return;
    }
    if (v === ve) {
      n(g, u, d);
      for (let S = 0; S < y.length; S++)
        Be(y[S], u, d, b);
      n(f.anchor, u, d);
      return;
    }
    if (v === xs) {
      H(f, u, d);
      return;
    }
    if (b !== 2 && _ & 1 && x)
      if (b === 0)
        x.persisted && !g[ms] ? n(g, u, d) : (x.beforeEnter(g), n(g, u, d), ie(() => x.enter(g), m));
      else {
        const { leave: S, delayLeave: T, afterLeave: A } = x, R = () => {
          f.ctx.isUnmounted ? r(g) : n(g, u, d);
        }, V = () => {
          const N = g._isLeaving || !!g[ms];
          g._isLeaving && g[ms](
            !0
            /* cancelled */
          ), x.persisted && !N ? R() : S(g, () => {
            R(), A && A();
          });
        };
        T ? T(g, R, V) : V();
      }
    else
      n(g, u, d);
  }, pe = (f, u, d, b = !1, m = !1) => {
    const {
      type: g,
      props: v,
      ref: x,
      children: y,
      dynamicChildren: _,
      shapeFlag: E,
      patchFlag: S,
      dirs: T,
      cacheIndex: A,
      memo: R
    } = f;
    if (S === -2 && (m = !1), x != null && (Re(), mt(x, null, d, f, !0), Fe()), A != null && (u.renderCache[A] = void 0), E & 256) {
      u.ctx.deactivate(f);
      return;
    }
    const V = E & 1 && T, N = !bt(f);
    let Y;
    if (N && (Y = v && v.onVnodeBeforeUnmount) && be(Y, u, f), E & 6)
      Kr(f.component, d, b);
    else {
      if (E & 128) {
        f.suspense.unmount(d, b);
        return;
      }
      V && qe(f, null, u, "beforeUnmount"), E & 64 ? f.type.remove(
        f,
        u,
        d,
        lt,
        b
      ) : _ && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !_.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (g !== ve || S > 0 && S & 64) ? ot(
        _,
        u,
        d,
        !1,
        !0
      ) : (g === ve && S & 384 || !m && E & 16) && ot(y, u, d), b && Zs(f);
    }
    const X = R != null && A == null;
    (N && (Y = v && v.onVnodeUnmounted) || V || X) && ie(() => {
      Y && be(Y, u, f), V && qe(f, null, u, "unmounted"), X && (f.el = null);
    }, d);
  }, Zs = (f) => {
    const { type: u, el: d, anchor: b, transition: m } = f;
    if (u === ve) {
      Vr(d, b);
      return;
    }
    if (u === xs) {
      O(f);
      return;
    }
    const g = () => {
      r(d), m && !m.persisted && m.afterLeave && m.afterLeave();
    };
    if (f.shapeFlag & 1 && m && !m.persisted) {
      const { leave: v, delayLeave: x } = m, y = () => v(d, g);
      x ? x(f.el, g, y) : y();
    } else
      g();
  }, Vr = (f, u) => {
    let d;
    for (; f !== u; )
      d = w(f), r(f), f = d;
    r(u);
  }, Kr = (f, u, d) => {
    const { bum: b, scope: m, job: g, subTree: v, um: x, m: y, a: _ } = f;
    bn(y), bn(_), b && as(b), m.stop(), g && (g.flags |= 8, pe(v, f, u, d)), x && ie(x, u), ie(() => {
      f.isUnmounted = !0;
    }, u);
  }, ot = (f, u, d, b = !1, m = !1, g = 0) => {
    for (let v = g; v < f.length; v++)
      pe(f[v], u, d, b, m);
  }, Ft = (f) => {
    if (f.shapeFlag & 6)
      return Ft(f.component.subTree);
    if (f.shapeFlag & 128)
      return f.suspense.next();
    const u = w(f.anchor || f.el), d = u && u[Hi];
    return d ? w(d) : u;
  };
  let cs = !1;
  const ks = (f, u, d) => {
    let b;
    f == null ? u._vnode && (pe(u._vnode, null, null, !0), b = u._vnode.component) : M(
      u._vnode || null,
      f,
      u,
      null,
      null,
      null,
      d
    ), u._vnode = f, cs || (cs = !0, fn(b), or(), cs = !1);
  }, lt = {
    p: M,
    um: pe,
    m: Be,
    r: Zs,
    mt: fs,
    mc: Ne,
    pc: K,
    pbc: Ue,
    n: Ft,
    o: e
  };
  return {
    render: ks,
    hydrate: void 0,
    createApp: io(ks)
  };
}
function ys({ type: e, props: t }, s) {
  return s === "svg" && e === "foreignObject" || s === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : s;
}
function Ge({ effect: e, job: t }, s) {
  s ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function So(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Ar(e, t, s = !1) {
  const n = e.children, r = t.children;
  if (P(n) && P(r))
    for (let i = 0; i < n.length; i++) {
      const o = n[i];
      let l = r[i];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = r[i] = Ae(r[i]), l.el = o.el), !s && l.patchFlag !== -2 && Ar(o, l)), l.type === ls && (l.patchFlag === -1 && (l = r[i] = Ae(l)), l.el = o.el), l.type === je && !l.el && (l.el = o.el);
    }
}
function wo(e) {
  const t = e.slice(), s = [0];
  let n, r, i, o, l;
  const c = e.length;
  for (n = 0; n < c; n++) {
    const h = e[n];
    if (h !== 0) {
      if (r = s[s.length - 1], e[r] < h) {
        t[n] = r, s.push(n);
        continue;
      }
      for (i = 0, o = s.length - 1; i < o; )
        l = i + o >> 1, e[s[l]] < h ? i = l + 1 : o = l;
      h < e[s[i]] && (i > 0 && (t[n] = s[i - 1]), s[i] = n);
    }
  }
  for (i = s.length, o = s[i - 1]; i-- > 0; )
    s[i] = o, o = t[o];
  return s;
}
function Pr(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Pr(t);
}
function bn(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function Mr(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? Mr(t.subTree) : null;
}
const Ir = (e) => e.__isSuspense;
function Co(e, t) {
  t && t.pendingBranch ? P(e) ? t.effects.push(...e) : t.effects.push(e) : Mi(e);
}
const ve = /* @__PURE__ */ Symbol.for("v-fgt"), ls = /* @__PURE__ */ Symbol.for("v-txt"), je = /* @__PURE__ */ Symbol.for("v-cmt"), xs = /* @__PURE__ */ Symbol.for("v-stc"), Xe = [];
let le = null;
function ht(e = !1) {
  Xe.push(le = e ? null : []);
}
function Rr() {
  Xe.pop(), le = Xe[Xe.length - 1] || null;
}
let wt = 1;
function yn(e, t = !1) {
  wt += e, e < 0 && le && t && (le.hasOnce = !0);
}
function Fr(e) {
  return e.dynamicChildren = wt > 0 ? le || et : null, Rr(), wt > 0 && le && le.push(e), e;
}
function Nt(e, t, s, n, r, i) {
  return Fr(
    Hr(
      e,
      t,
      s,
      n,
      r,
      i,
      !0
    )
  );
}
function To(e, t, s, n, r) {
  return Fr(
    Ie(
      e,
      t,
      s,
      n,
      r,
      !0
    )
  );
}
function Dr(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function ut(e, t) {
  return e.type === t.type && e.key === t.key;
}
const jr = ({ key: e }) => e ?? null, Vt = ({
  ref: e,
  ref_key: t,
  ref_for: s
}) => (typeof e == "number" && (e = "" + e), e != null ? G(e) || /* @__PURE__ */ re(e) || I(e) ? { i: we, r: e, k: t, f: !!s } : e : null);
function Hr(e, t = null, s = null, n = 0, r = null, i = e === ve ? 0 : 1, o = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && jr(t),
    ref: t && Vt(t),
    scopeId: fr,
    slotScopeIds: null,
    children: s,
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
    shapeFlag: i,
    patchFlag: n,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: we
  };
  return l ? (Jt(c, s), i & 128 && e.normalize(c)) : s && (c.shapeFlag |= G(s) ? 8 : 16), wt > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  le && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && le.push(c), c;
}
const Ie = Eo;
function Eo(e, t = null, s = null, n = 0, r = null, i = !1) {
  if ((!e || e === Xi) && (e = je), Dr(e)) {
    const l = rt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return s && Jt(l, s), wt > 0 && !i && le && (l.shapeFlag & 6 ? le[le.indexOf(e)] = l : le.push(l)), l.patchFlag = -2, l;
  }
  if (Lo(e) && (e = e.__vccOpts), t) {
    t = Oo(t);
    let { class: l, style: c } = t;
    l && !G(l) && (t.class = Ns(l)), L(c) && (/* @__PURE__ */ Ws(c) && !P(c) && (c = Q({}, c)), t.style = Qt(c));
  }
  const o = G(e) ? 1 : Ir(e) ? 128 : rs(e) ? 64 : L(e) ? 4 : I(e) ? 2 : 0;
  return Hr(
    e,
    t,
    s,
    n,
    r,
    o,
    i,
    !0
  );
}
function Oo(e) {
  return e ? /* @__PURE__ */ Ws(e) || Sr(e) ? Q({}, e) : e : null;
}
function rt(e, t, s = !1, n = !1) {
  const { props: r, ref: i, patchFlag: o, children: l, transition: c } = e, h = t ? Mo(r || {}, t) : r, a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: h,
    key: h && jr(h),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      s && i ? P(i) ? i.concat(Vt(t)) : [i, Vt(t)] : Vt(t)
    ) : i,
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
    patchFlag: t && e.type !== ve ? o === -1 ? 16 : o | 16 : o,
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
    ssContent: e.ssContent && rt(e.ssContent),
    ssFallback: e.ssFallback && rt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && n && qs(
    a,
    c.clone(a)
  ), a;
}
function Ao(e = " ", t = 0) {
  return Ie(ls, null, e, t);
}
function Po(e = "", t = !1) {
  return t ? (ht(), To(je, null, e)) : Ie(je, null, e);
}
function Se(e) {
  return e == null || typeof e == "boolean" ? Ie(je) : P(e) ? Ie(
    ve,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Dr(e) ? Ae(e) : Ie(ls, null, String(e));
}
function Ae(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : rt(e);
}
function Jt(e, t) {
  let s = 0;
  const { shapeFlag: n } = e;
  if (t == null)
    t = null;
  else if (P(t))
    s = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), Jt(e, r()), r._c && (r._d = !0));
      return;
    } else {
      s = 32;
      const r = t._;
      !r && !Sr(t) ? t._ctx = we : r === 3 && we && (we.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (I(t)) {
    if (n & 65) {
      Jt(e, { default: t });
      return;
    }
    t = { default: t, _ctx: we }, s = 32;
  } else
    t = String(t), n & 64 ? (s = 16, t = [Ao(t)]) : s = 8;
  e.children = t, e.shapeFlag |= s;
}
function Mo(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    for (const r in n)
      if (r === "class")
        t.class !== n.class && (t.class = Ns([t.class, n.class]));
      else if (r === "style")
        t.style = Qt([t.style, n.style]);
      else if (zt(r)) {
        const i = t[r], o = n[r];
        o && i !== o && !(P(i) && i.includes(o)) ? t[r] = i ? [].concat(i, o) : o : o == null && i == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !Xt(r) && (t[r] = o);
      } else r !== "" && (t[r] = n[r]);
  }
  return t;
}
function be(e, t, s, n = null) {
  ae(e, t, 7, [
    s,
    n
  ]);
}
const Io = mr();
let Ro = 0;
function Fo(e, t, s) {
  const n = e.type, r = (t ? t.appContext : e.appContext) || Io, i = {
    uid: Ro++,
    vnode: e,
    type: n,
    parent: t,
    appContext: r,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new ei(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(r.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Cr(n, r),
    emitsOptions: br(n, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: W,
    // inheritAttrs
    inheritAttrs: n.inheritAttrs,
    // state
    ctx: W,
    data: W,
    props: W,
    attrs: W,
    slots: W,
    refs: W,
    setupState: W,
    setupContext: null,
    // suspense related
    suspense: s,
    suspenseId: s ? s.pendingId : 0,
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
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = lo.bind(null, i), e.ce && e.ce(i), i;
}
let ne = null;
const Do = () => ne || we;
let Yt, Ct;
{
  const e = kt(), t = (s, n) => {
    let r;
    return (r = e[s]) || (r = e[s] = []), r.push(n), (i) => {
      r.length > 1 ? r.forEach((o) => o(i)) : r[0](i);
    };
  };
  Yt = t(
    "__VUE_INSTANCE_SETTERS__",
    (s) => ne = s
  ), Ct = t(
    "__VUE_SSR_SETTERS__",
    (s) => Tt = s
  );
}
const At = (e) => {
  const t = ne;
  return Yt(e), e.scope.on(), () => {
    e.scope.off(), Yt(t);
  };
}, xn = () => {
  ne && ne.scope.off(), Yt(null);
};
function Nr(e) {
  return e.vnode.shapeFlag & 4;
}
let Tt = !1;
function jo(e, t = !1, s = !1) {
  t && Ct(t);
  const { props: n, children: r } = e.vnode, i = Nr(e);
  po(e, n, i, t), bo(e, r, s || t);
  const o = i ? Ho(e, t) : void 0;
  return t && Ct(!1), o;
}
function Ho(e, t) {
  const s = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, ki);
  const { setup: n } = s;
  if (n) {
    Re();
    const r = e.setupContext = n.length > 1 ? $o(e) : null, i = At(e), o = Ot(
      n,
      e,
      0,
      [
        e.props,
        r
      ]
    ), l = Fn(o);
    if (Fe(), i(), (l || e.sp) && !bt(e) && hr(e), l) {
      if (o.then(xn, xn), t)
        return o.then((c) => {
          Ct(!0);
          try {
            vn(e, c, t);
          } finally {
            Ct(!1);
          }
        }).catch((c) => {
          ns(c, e, 0);
        });
      e.asyncDep = o;
    } else
      vn(e, o);
  } else
    $r(e);
}
function vn(e, t, s) {
  I(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : L(t) && (e.setupState = nr(t)), $r(e);
}
function $r(e, t, s) {
  const n = e.type;
  e.render || (e.render = n.render || Ce);
  {
    const r = At(e);
    Re();
    try {
      Qi(e);
    } finally {
      Fe(), r();
    }
  }
}
const No = {
  get(e, t) {
    return k(e, "get", ""), e[t];
  }
};
function $o(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  return {
    attrs: new Proxy(e.attrs, No),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function zs(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(nr(xi(e.exposed)), {
    get(t, s) {
      if (s in t)
        return t[s];
      if (s in yt)
        return yt[s](e);
    },
    has(t, s) {
      return s in t || s in yt;
    }
  })) : e.proxy;
}
function Lo(e) {
  return I(e) && "__vccOpts" in e;
}
const Rs = (e, t) => /* @__PURE__ */ Ci(e, t, Tt), Vo = "3.5.42";
/**
* @vue/runtime-dom v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Fs;
const Sn = typeof window < "u" && window.trustedTypes;
if (Sn)
  try {
    Fs = /* @__PURE__ */ Sn.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Lr = Fs ? (e) => Fs.createHTML(e) : (e) => e, Ko = "http://www.w3.org/2000/svg", Uo = "http://www.w3.org/1998/Math/MathML", Oe = typeof document < "u" ? document : null, wn = Oe && /* @__PURE__ */ Oe.createElement("template"), Wo = {
  insert: (e, t, s) => {
    t.insertBefore(e, s || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, s, n) => {
    const r = t === "svg" ? Oe.createElementNS(Ko, e) : t === "mathml" ? Oe.createElementNS(Uo, e) : s ? Oe.createElement(e, { is: s }) : Oe.createElement(e);
    return e === "select" && n && n.multiple != null && r.setAttribute("multiple", n.multiple), r;
  },
  createText: (e) => Oe.createTextNode(e),
  createComment: (e) => Oe.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Oe.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, s, n, r, i) {
    const o = s ? s.previousSibling : t.lastChild;
    if (r && (r === i || r.nextSibling))
      for (; t.insertBefore(r.cloneNode(!0), s), !(r === i || !(r = r.nextSibling)); )
        ;
    else {
      wn.innerHTML = Lr(
        n === "svg" ? `<svg>${e}</svg>` : n === "mathml" ? `<math>${e}</math>` : e
      );
      const l = wn.content;
      if (n === "svg" || n === "mathml") {
        const c = l.firstChild;
        for (; c.firstChild; )
          l.appendChild(c.firstChild);
        l.removeChild(c);
      }
      t.insertBefore(l, s);
    }
    return [
      // first
      o ? o.nextSibling : t.firstChild,
      // last
      s ? s.previousSibling : t.lastChild
    ];
  }
}, Bo = /* @__PURE__ */ Symbol("_vtc");
function qo(e, t, s) {
  const n = e[Bo];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : s ? e.setAttribute("class", t) : e.className = t;
}
const Cn = /* @__PURE__ */ Symbol("_vod"), Go = /* @__PURE__ */ Symbol("_vsh"), Jo = /* @__PURE__ */ Symbol(""), Yo = /(?:^|;)\s*display\s*:/;
function zo(e, t, s) {
  const n = e.style, r = G(s);
  let i = !1;
  if (s && !r) {
    if (t)
      if (G(t))
        for (const o of t.split(";")) {
          const l = o.slice(0, o.indexOf(":")).trim();
          s[l] == null && dt(n, l, "");
        }
      else
        for (const o in t)
          s[o] == null && dt(n, o, "");
    for (const o in s) {
      o === "display" && (i = !0);
      const l = s[o];
      l != null ? Zo(
        e,
        o,
        !G(t) && t ? t[o] : void 0,
        l
      ) || dt(n, o, l) : dt(n, o, "");
    }
  } else if (r) {
    if (t !== s) {
      const o = n[Jo];
      o && (s += ";" + o), n.cssText = s, i = Yo.test(s);
    }
  } else t && e.removeAttribute("style");
  Cn in e && (e[Cn] = i ? n.display : "", e[Go] && (n.display = "none"));
}
const $t = /\s*!important$/;
function dt(e, t, s) {
  if (P(s))
    s.forEach((n) => dt(e, t, n));
  else if (s == null && (s = ""), t.startsWith("--"))
    $t.test(s) ? e.setProperty(t, s.replace($t, ""), "important") : e.setProperty(t, s);
  else {
    const n = Xo(e, t);
    $t.test(s) ? e.setProperty(
      Ze(n),
      s.replace($t, ""),
      "important"
    ) : e[n] = s;
  }
}
const Tn = ["Webkit", "Moz", "ms"], vs = {};
function Xo(e, t) {
  const s = vs[t];
  if (s)
    return s;
  let n = fe(t);
  if (n !== "filter" && n in e)
    return vs[t] = n;
  n = Hn(n);
  for (let r = 0; r < Tn.length; r++) {
    const i = Tn[r] + n;
    if (i in e)
      return vs[t] = i;
  }
  return t;
}
function Zo(e, t, s, n) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && G(n) && s === n;
}
const En = "http://www.w3.org/1999/xlink";
function On(e, t, s, n, r, i = kr(t)) {
  n && t.startsWith("xlink:") ? s == null ? e.removeAttributeNS(En, t.slice(6, t.length)) : e.setAttributeNS(En, t, s) : s == null || i && !$n(s) ? e.removeAttribute(t) : e.setAttribute(
    t,
    i ? "" : Te(s) ? String(s) : s
  );
}
function An(e, t, s, n, r) {
  if (t === "innerHTML" || t === "textContent") {
    s != null && (e[t] = t === "innerHTML" ? Lr(s) : s);
    return;
  }
  const i = e.tagName;
  if (t === "value" && i !== "PROGRESS" && // custom elements may use _value internally
  !i.includes("-")) {
    const l = i === "OPTION" ? e.getAttribute("value") || "" : e.value, c = s == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(s);
    (l !== c || !("_value" in e)) && (e.value = c), s == null && e.removeAttribute(t), e._value = s;
    return;
  }
  let o = !1;
  if (s === "" || s == null) {
    const l = typeof e[t];
    l === "boolean" ? s = $n(s) : s == null && l === "string" ? (s = "", o = !0) : l === "number" && (s = 0, o = !0);
  }
  try {
    e[t] = s;
  } catch {
  }
  o && e.removeAttribute(r || t);
}
function ko(e, t, s, n) {
  e.addEventListener(t, s, n);
}
function Qo(e, t, s, n) {
  e.removeEventListener(t, s, n);
}
const Pn = /* @__PURE__ */ Symbol("_vei");
function el(e, t, s, n, r = null) {
  const i = e[Pn] || (e[Pn] = {}), o = i[t];
  if (n && o)
    o.value = n;
  else {
    const [l, c] = nl(t);
    if (n) {
      const h = i[t] = ol(
        n,
        r
      );
      ko(e, l, h, c);
    } else o && (Qo(e, l, o, c), i[t] = void 0);
  }
}
const tl = /(Once|Passive|Capture)$/, sl = /^on:?(?:Once|Passive|Capture)$/;
function nl(e) {
  let t, s;
  for (; (s = e.match(tl)) && !sl.test(e); )
    t || (t = {}), e = e.slice(0, e.length - s[1].length), t[s[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : Ze(e.slice(2)), t];
}
let Ss = 0;
const rl = /* @__PURE__ */ Promise.resolve(), il = () => Ss || (rl.then(() => Ss = 0), Ss = Date.now());
function ol(e, t) {
  const s = (n) => {
    if (!n._vts)
      n._vts = Date.now();
    else if (n._vts <= s.attached)
      return;
    const r = s.value;
    if (P(r)) {
      const i = n.stopImmediatePropagation;
      n.stopImmediatePropagation = () => {
        i.call(n), n._stopped = !0;
      };
      const o = r.slice(), l = [n];
      for (let c = 0; c < o.length && !n._stopped; c++) {
        const h = o[c];
        h && ae(
          h,
          t,
          5,
          l
        );
      }
    } else
      ae(
        r,
        t,
        5,
        [n]
      );
  };
  return s.value = e, s.attached = il(), s;
}
const Mn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, ll = (e, t, s, n, r, i) => {
  const o = r === "svg";
  t === "class" ? qo(e, n, o) : t === "style" ? zo(e, s, n) : zt(t) ? Xt(t) || el(e, t, s, n, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : fl(e, t, n, o)) ? (An(e, t, n), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && On(e, t, n, o, i, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (cl(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !G(n))) ? An(e, fe(t), n, i, t) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), On(e, t, n, o));
};
function fl(e, t, s, n) {
  if (n)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Mn(t) && I(s));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return Mn(t) && G(s) ? !1 : t in e;
}
function cl(e, t) {
  const s = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!s)
    return !1;
  const n = fe(t);
  return Array.isArray(s) ? s.some((r) => fe(r) === n) : Object.keys(s).some((r) => fe(r) === n);
}
const ul = /* @__PURE__ */ Q({ patchProp: ll }, Wo);
let In;
function al() {
  return In || (In = xo(ul));
}
const hl = (...e) => {
  const t = al().createApp(...e), { mount: s } = t;
  return t.mount = (n) => {
    const r = pl(n);
    if (!r) return;
    const i = t._component;
    !I(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
    const o = s(r, !1, dl(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), o;
  }, t;
};
function dl(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function pl(e) {
  return G(e) ? document.querySelector(e) : e;
}
const gl = { class: "pnl-tst" }, _l = {
  key: 0,
  class: "pnl-tst-empty"
}, ml = ["onClick"], bl = {
  __name: "TanstackTable",
  props: {
    // Python-owned state. The component reads it and never writes it back.
    state: { type: Object, required: !0 },
    // JS to Python channel. Emits intent only, never a mutated tree.
    emitEvent: { type: Function, required: !0 }
  },
  setup(e) {
    const t = e;
    function s(i, o, l) {
      for (const c of i || [])
        l.push({ key: c.key, title: c.title, depth: o }), s(c.children, o + 1, l);
      return l;
    }
    const n = Rs(() => s(t.state.source, 0, [])), r = Rs(() => t.state.options.indent_px ?? 16);
    return (i, o) => (ht(), Nt("div", gl, [
      n.value.length === 0 ? (ht(), Nt("div", _l, "No data")) : Po("", !0),
      (ht(!0), Nt(ve, null, Zi(n.value, (l) => (ht(), Nt("div", {
        key: l.key,
        class: "pnl-tst-row",
        style: Qt({ paddingInlineStart: `${l.depth * r.value}px` }),
        onClick: (c) => t.emitEvent("activate", { key: l.key })
      }, Vn(l.title), 13, ml))), 128))
    ]));
  }
};
function xl({ model: e, el: t }) {
  t.style.display = "block", t.style.width = "100%";
  const s = document.createElement("div");
  s.className = "pnl-tst-root", t.append(s);
  const n = /* @__PURE__ */ ss({
    source: e.get("source") || [],
    columns: e.get("columns") || [],
    options: e.get("options") || {}
  }), i = hl(bl, { state: n, emitEvent: (o, l) => {
    e.set("_event_data", {
      event_name: o,
      event_params: l,
      timestamp: Date.now()
    }), e.save_changes();
  } });
  return i.mount(s), e.on("change:source", () => {
    n.source = e.get("source") || [];
  }), e.on("change:columns", () => {
    n.columns = e.get("columns") || [];
  }), e.on("change:options", () => {
    n.options = e.get("options") || {};
  }), () => {
    i.unmount();
  };
}
export {
  xl as render
};

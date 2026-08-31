/**
* @vue/shared v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function Br(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const ee = {}, Tt = [], Ne = () => {
}, gs = () => !1, $n = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Nn = (e) => e.startsWith("onUpdate:"), pe = Object.assign, Ur = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, fl = Object.prototype.hasOwnProperty, G = (e, t) => fl.call(e, t), L = Array.isArray, it = (e) => an(e) === "[object Map]", Mn = (e) => an(e) === "[object Set]", ho = (e) => an(e) === "[object Date]", $ = (e) => typeof e == "function", oe = (e) => typeof e == "string", Ve = (e) => typeof e == "symbol", X = (e) => e !== null && typeof e == "object", hs = (e) => (X(e) || $(e)) && $(e.then) && $(e.catch), ms = Object.prototype.toString, an = (e) => ms.call(e), dl = (e) => an(e).slice(8, -1), ys = (e) => an(e) === "[object Object]", Gr = (e) => oe(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, qt = /* @__PURE__ */ Br(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Vn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, pl = /-\w/g, Oe = Vn(
  (e) => e.replace(pl, (t) => t.slice(1).toUpperCase())
), gl = /\B([A-Z])/g, Rt = Vn(
  (e) => e.replace(gl, "-$1").toLowerCase()
), vs = Vn((e) => e.charAt(0).toUpperCase() + e.slice(1)), lr = Vn(
  (e) => e ? `on${vs(e)}` : ""
), Ke = (e, t) => !Object.is(e, t), cr = (e, ...t) => {
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
function Dt(e) {
  if (L(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], o = oe(r) ? wl(r) : Dt(r);
      if (o)
        for (const s in o)
          t[s] = o[s];
    }
    return t;
  } else if (oe(e) || X(e))
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
function ht(e) {
  let t = "";
  if (oe(e))
    t = e;
  else if (L(e))
    for (let n = 0; n < e.length; n++) {
      const r = ht(e[n]);
      r && (t += r + " ");
    }
  else if (X(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const bl = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", _l = /* @__PURE__ */ Br(bl);
function bs(e) {
  return !!e || e === "";
}
function Sl(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let r = 0; n && r < e.length; r++)
    n = Bn(e[r], t[r]);
  return n;
}
function yo(e, t) {
  if (e.size !== t.size) return !1;
  const n = Array.from(t), r = new Uint8Array(n.length);
  for (const o of e) {
    let s = -1;
    for (let i = 0; i < n.length; i++)
      if (!r[i] && Bn(o, n[i])) {
        s = i;
        break;
      }
    if (s < 0) return !1;
    r[s] = 1;
  }
  return !0;
}
function Bn(e, t) {
  if (e === t) return !0;
  let n = ho(e), r = ho(t);
  if (n || r)
    return n && r ? e.getTime() === t.getTime() : !1;
  if (n = Ve(e), r = Ve(t), n || r)
    return e === t;
  if (n = L(e), r = L(t), n || r)
    return n && r ? Sl(e, t) : !1;
  if (n = X(e), r = X(t), n || r) {
    if (!n || !r)
      return !1;
    if (n = it(e), r = it(t), n || r || (n = Mn(e), r = Mn(t), n || r))
      return n && r ? yo(e, t) : !1;
    const o = Object.keys(e).length, s = Object.keys(t).length;
    if (o !== s)
      return !1;
    for (const i in e) {
      const l = e.hasOwnProperty(i), c = t.hasOwnProperty(i);
      if (l && !c || !l && c || !Bn(e[i], t[i]))
        return !1;
    }
  }
  return String(e) === String(t);
}
const _s = (e) => !!(e && e.__v_isRef === !0), Er = (e) => oe(e) ? e : e == null ? "" : L(e) || X(e) && (e.toString === ms || !$(e.toString)) ? _s(e) ? Er(e.value) : JSON.stringify(e, Ss, 2) : String(e), Ss = (e, t) => _s(t) ? Ss(e, t.value) : it(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [r, o], s) => (n[ar(r, s) + " =>"] = o, n),
    {}
  )
} : Mn(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => ar(n))
} : Ve(t) ? ar(t) : X(t) && !L(t) && !ys(t) ? String(t) : t, ar = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Ve(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let ie;
class Rl {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && ie && (ie.active ? (this.parent = ie, this.index = (ie.scopes || (ie.scopes = [])).push(
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
      const n = ie;
      try {
        return ie = this, t();
      } finally {
        ie = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = ie, ie = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (ie === this)
        ie = this.prevScope;
      else {
        let t = ie;
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
function Rs() {
  return ie;
}
function xl(e, t = !1) {
  ie && ie.cleanups.push(e);
}
let Q;
const ur = /* @__PURE__ */ new WeakSet();
class xs {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, ie && (ie.active ? ie.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, ur.has(this) && (ur.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Es(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, vo(this), Ps(this);
    const t = Q, n = Me;
    Q = this, Me = !0;
    try {
      return this.fn();
    } finally {
      Os(this), Q = t, Me = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        zr(t);
      this.deps = this.depsTail = void 0, vo(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? ur.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Pr(this) && this.run();
  }
  get dirty() {
    return Pr(this);
  }
}
let Cs = 0, Yt, zt;
function Es(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = zt, zt = e;
    return;
  }
  e.next = Yt, Yt = e;
}
function qr() {
  Cs++;
}
function Yr() {
  if (--Cs > 0)
    return;
  if (zt) {
    let t = zt;
    for (zt = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; Yt; ) {
    let t = Yt;
    for (Yt = void 0; t; ) {
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
function Os(e) {
  let t, n = e.depsTail, r = n;
  for (; r; ) {
    const o = r.prevDep;
    r.version === -1 ? (r === n && (n = o), zr(r), Cl(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = o;
  }
  e.deps = t, e.depsTail = n;
}
function Pr(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Ms(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Ms(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === en) || (e.globalVersion = en, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Pr(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = Q, r = Me;
  Q = e, Me = !0;
  try {
    Ps(e);
    const o = e.fn(e._value);
    (t.version === 0 || Ke(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    Q = n, Me = r, Os(e), e.flags &= -3;
  }
}
function zr(e, t = !1) {
  const { dep: n, prevSub: r, nextSub: o } = e;
  if (r && (r.nextSub = o, e.prevSub = void 0), o && (o.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
    n.computed.flags &= -5;
    for (let s = n.computed.deps; s; s = s.nextDep)
      zr(s, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Cl(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let Me = !0;
const Is = [];
function Xe() {
  Is.push(Me), Me = !1;
}
function Je() {
  const e = Is.pop();
  Me = e === void 0 ? !0 : e;
}
function vo(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = Q;
    Q = void 0;
    try {
      t();
    } finally {
      Q = n;
    }
  }
}
let en = 0;
class El {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Xr {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!Q || !Me || Q === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== Q)
      n = this.activeLink = new El(Q, this), Q.deps ? (n.prevDep = Q.depsTail, Q.depsTail.nextDep = n, Q.depsTail = n) : Q.deps = Q.depsTail = n, As(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const r = n.nextDep;
      r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = Q.depsTail, n.nextDep = void 0, Q.depsTail.nextDep = n, Q.depsTail = n, Q.deps === n && (Q.deps = r);
    }
    return n;
  }
  trigger(t) {
    this.version++, en++, this.notify(t);
  }
  notify(t) {
    qr();
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
const Or = /* @__PURE__ */ new WeakMap(), mt = /* @__PURE__ */ Symbol(
  ""
), Mr = /* @__PURE__ */ Symbol(
  ""
), tn = /* @__PURE__ */ Symbol(
  ""
);
function fe(e, t, n) {
  if (Me && Q) {
    let r = Or.get(e);
    r || Or.set(e, r = /* @__PURE__ */ new Map());
    let o = r.get(n);
    o || (r.set(n, o = new Xr()), o.map = r, o.key = n), o.track();
  }
}
function Ye(e, t, n, r, o, s) {
  const i = Or.get(e);
  if (!i) {
    en++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if (qr(), t === "clear")
    i.forEach(l);
  else {
    const c = L(e), a = c && Gr(n);
    if (c && n === "length") {
      const u = Number(r);
      i.forEach((g, v) => {
        (v === "length" || v === tn || !Ve(v) && v >= u) && l(g);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && l(i.get(n)), a && l(i.get(tn)), t) {
        case "add":
          c ? a && l(i.get("length")) : (l(i.get(mt)), it(e) && l(i.get(Mr)));
          break;
        case "delete":
          c || (l(i.get(mt)), it(e) && l(i.get(Mr)));
          break;
        case "set":
          it(e) && l(i.get(mt));
          break;
      }
  }
  Yr();
}
function Ot(e) {
  const t = /* @__PURE__ */ U(e);
  return t === e ? t : (fe(t, "iterate", tn), /* @__PURE__ */ Ee(e) ? t : t.map(Ie));
}
function Un(e) {
  return fe(e = /* @__PURE__ */ U(e), "iterate", tn), e;
}
function ke(e, t) {
  return /* @__PURE__ */ Ze(e) ? kt(/* @__PURE__ */ yt(e) ? Ie(t) : t) : Ie(t);
}
const Pl = {
  __proto__: null,
  [Symbol.iterator]() {
    return fr(this, Symbol.iterator, (e) => ke(this, e));
  },
  concat(...e) {
    return Ot(this).concat(
      ...e.map((t) => L(t) ? Ot(t) : t)
    );
  },
  entries() {
    return fr(this, "entries", (e) => (e[1] = ke(this, e[1]), e));
  },
  every(e, t) {
    return Ue(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Ue(
      this,
      "filter",
      e,
      t,
      (n) => n.map((r) => ke(this, r)),
      arguments
    );
  },
  find(e, t) {
    return Ue(
      this,
      "find",
      e,
      t,
      (n) => ke(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return Ue(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Ue(
      this,
      "findLast",
      e,
      t,
      (n) => ke(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return Ue(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Ue(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return dr(this, "includes", e);
  },
  indexOf(...e) {
    return dr(this, "indexOf", e);
  },
  join(e) {
    return Ot(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return dr(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Ue(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Wt(this, "pop");
  },
  push(...e) {
    return Wt(this, "push", e);
  },
  reduce(e, ...t) {
    return wo(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return wo(this, "reduceRight", e, t);
  },
  shift() {
    return Wt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Ue(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Wt(this, "splice", e);
  },
  toReversed() {
    return Ot(this).toReversed();
  },
  toSorted(e) {
    return Ot(this).toSorted(e);
  },
  toSpliced(...e) {
    return Ot(this).toSpliced(...e);
  },
  unshift(...e) {
    return Wt(this, "unshift", e);
  },
  values() {
    return fr(this, "values", (e) => ke(this, e));
  }
};
function fr(e, t, n) {
  const r = Un(e), o = r[t]();
  return r !== e && !/* @__PURE__ */ Ee(e) && (o._next = o.next, o.next = () => {
    const s = o._next();
    return s.done || (s.value = n(s.value)), s;
  }), o;
}
const Ol = Array.prototype;
function Ue(e, t, n, r, o, s) {
  const i = Un(e), l = i !== e && !/* @__PURE__ */ Ee(e), c = i[t];
  if (c !== Ol[t]) {
    const g = c.apply(e, s);
    return l ? Ie(g) : g;
  }
  let a = n;
  i !== e && (l ? a = function(g, v) {
    return n.call(this, ke(e, g), v, e);
  } : n.length > 2 && (a = function(g, v) {
    return n.call(this, g, v, e);
  }));
  const u = c.call(i, a, r);
  return l && o ? o(u) : u;
}
function wo(e, t, n, r) {
  const o = Un(e), s = o !== e && !/* @__PURE__ */ Ee(e);
  let i = n, l = !1;
  o !== e && (s ? (l = r.length === 0, i = function(a, u, g) {
    return l && (l = !1, a = ke(e, a)), n.call(this, a, ke(e, u), g, e);
  }) : n.length > 3 && (i = function(a, u, g) {
    return n.call(this, a, u, g, e);
  }));
  const c = o[t](i, ...r);
  return l ? ke(e, c) : c;
}
function dr(e, t, n) {
  const r = /* @__PURE__ */ U(e);
  fe(r, "iterate", tn);
  const o = r[t](...n);
  return (o === -1 || o === !1) && /* @__PURE__ */ Qr(n[0]) ? (n[0] = /* @__PURE__ */ U(n[0]), r[t](...n)) : o;
}
function Wt(e, t, n = []) {
  Xe(), qr();
  const r = (/* @__PURE__ */ U(e))[t].apply(e, n);
  return Yr(), Je(), r;
}
const Ml = /* @__PURE__ */ Br("__proto__,__v_isRef,__isVue"), Ts = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Ve)
);
function Il(e) {
  Ve(e) || (e = String(e));
  const t = /* @__PURE__ */ U(this);
  return fe(t, "has", e), t.hasOwnProperty(e);
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
    const i = L(t);
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
      /* @__PURE__ */ de(t) ? t : r
    );
    if ((Ve(n) ? Ts.has(n) : Ml(n)) || (o || fe(t, "get", n), s))
      return l;
    if (/* @__PURE__ */ de(l)) {
      const c = i && Gr(n) ? l : l.value;
      return o && X(c) ? /* @__PURE__ */ Ar(c) : c;
    }
    return X(l) ? o ? /* @__PURE__ */ Ar(l) : /* @__PURE__ */ Gn(l) : l;
  }
}
class Fs extends Ds {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, o) {
    let s = t[n];
    const i = L(t) && Gr(n);
    if (!this._isShallow) {
      const a = /* @__PURE__ */ Ze(s);
      if (!/* @__PURE__ */ Ee(r) && !/* @__PURE__ */ Ze(r) && (s = /* @__PURE__ */ U(s), r = /* @__PURE__ */ U(r)), !i && /* @__PURE__ */ de(s) && !/* @__PURE__ */ de(r))
        return a || (s.value = r), !0;
    }
    const l = i ? Number(n) < t.length : G(t, n), c = Reflect.set(
      t,
      n,
      r,
      /* @__PURE__ */ de(t) ? t : o
    );
    return t === /* @__PURE__ */ U(o) && c && (l ? Ke(r, s) && Ye(t, "set", n, r) : Ye(t, "add", n, r)), c;
  }
  deleteProperty(t, n) {
    const r = G(t, n);
    t[n];
    const o = Reflect.deleteProperty(t, n);
    return o && r && Ye(t, "delete", n, void 0), o;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!Ve(n) || !Ts.has(n)) && fe(t, "has", n), r;
  }
  ownKeys(t) {
    return fe(
      t,
      "iterate",
      L(t) ? "length" : mt
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
const Ir = (e) => e, yn = (e) => Reflect.getPrototypeOf(e);
function jl(e, t, n) {
  return function(...r) {
    const o = this.__v_raw, s = /* @__PURE__ */ U(o), i = it(s), l = e === "entries" || e === Symbol.iterator && i, c = e === "keys" && i, a = o[e](...r), u = n ? Ir : t ? kt : Ie;
    return !t && fe(
      s,
      "iterate",
      c ? Mr : mt
    ), pe(
      // inheriting all iterator properties
      Object.create(a),
      {
        // iterator protocol
        next() {
          const { value: g, done: v } = a.next();
          return v ? { value: g, done: v } : {
            value: l ? [u(g[0]), u(g[1])] : u(g),
            done: v
          };
        }
      }
    );
  };
}
function vn(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Hl(e, t) {
  const n = {
    get(o) {
      const s = this.__v_raw, i = /* @__PURE__ */ U(s), l = /* @__PURE__ */ U(o);
      e || (Ke(o, l) && fe(i, "get", o), fe(i, "get", l));
      const { has: c } = yn(i), a = t ? Ir : e ? kt : Ie;
      if (c.call(i, o))
        return a(s.get(o));
      if (c.call(i, l))
        return a(s.get(l));
      s !== i && s.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && fe(/* @__PURE__ */ U(o), "iterate", mt), o.size;
    },
    has(o) {
      const s = this.__v_raw, i = /* @__PURE__ */ U(s), l = /* @__PURE__ */ U(o);
      return e || (Ke(o, l) && fe(i, "has", o), fe(i, "has", l)), o === l ? s.has(o) : s.has(o) || s.has(l);
    },
    forEach(o, s) {
      const i = this, l = i.__v_raw, c = /* @__PURE__ */ U(l), a = t ? Ir : e ? kt : Ie;
      return !e && fe(c, "iterate", mt), l.forEach((u, g) => o.call(s, a(u), a(g), i));
    }
  };
  return pe(
    n,
    e ? {
      add: vn("add"),
      set: vn("set"),
      delete: vn("delete"),
      clear: vn("clear")
    } : {
      add(o) {
        const s = /* @__PURE__ */ U(this), i = yn(s), l = /* @__PURE__ */ U(o), c = !t && !/* @__PURE__ */ Ee(o) && !/* @__PURE__ */ Ze(o) ? l : o;
        return i.has.call(s, c) || Ke(o, c) && i.has.call(s, o) || Ke(l, c) && i.has.call(s, l) || (s.add(c), Ye(s, "add", c, c)), this;
      },
      set(o, s) {
        !t && !/* @__PURE__ */ Ee(s) && !/* @__PURE__ */ Ze(s) && (s = /* @__PURE__ */ U(s));
        const i = /* @__PURE__ */ U(this), { has: l, get: c } = yn(i);
        let a = l.call(i, o);
        a || (o = /* @__PURE__ */ U(o), a = l.call(i, o));
        const u = c.call(i, o);
        return i.set(o, s), a ? Ke(s, u) && Ye(i, "set", o, s) : Ye(i, "add", o, s), this;
      },
      delete(o) {
        const s = /* @__PURE__ */ U(this), { has: i, get: l } = yn(s);
        let c = i.call(s, o);
        c || (o = /* @__PURE__ */ U(o), c = i.call(s, o)), l && l.call(s, o);
        const a = s.delete(o);
        return c && Ye(s, "delete", o, void 0), a;
      },
      clear() {
        const o = /* @__PURE__ */ U(this), s = o.size !== 0, i = o.clear();
        return s && Ye(
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
function Jr(e, t) {
  const n = Hl(e, t);
  return (r, o, s) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(
    G(n, o) && o in r ? n : r,
    o,
    s
  );
}
const kl = {
  get: /* @__PURE__ */ Jr(!1, !1)
}, Ll = {
  get: /* @__PURE__ */ Jr(!1, !0)
}, Kl = {
  get: /* @__PURE__ */ Jr(!0, !1)
};
const js = /* @__PURE__ */ new WeakMap(), Hs = /* @__PURE__ */ new WeakMap(), ks = /* @__PURE__ */ new WeakMap(), $l = /* @__PURE__ */ new WeakMap();
function Nl(e) {
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
function Gn(e) {
  return /* @__PURE__ */ Ze(e) ? e : Zr(
    e,
    !1,
    Tl,
    kl,
    js
  );
}
// @__NO_SIDE_EFFECTS__
function Vl(e) {
  return Zr(
    e,
    !1,
    Fl,
    Ll,
    Hs
  );
}
// @__NO_SIDE_EFFECTS__
function Ar(e) {
  return Zr(
    e,
    !0,
    Dl,
    Kl,
    ks
  );
}
function Zr(e, t, n, r, o) {
  if (!X(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const s = o.get(e);
  if (s)
    return s;
  const i = Nl(dl(e));
  if (i === 0)
    return e;
  const l = new Proxy(
    e,
    i === 2 ? r : n
  );
  return o.set(e, l), l;
}
// @__NO_SIDE_EFFECTS__
function yt(e) {
  return /* @__PURE__ */ Ze(e) ? /* @__PURE__ */ yt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Ze(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Ee(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Qr(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function U(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ U(t) : e;
}
function Wl(e) {
  return !G(e, "__v_skip") && Object.isExtensible(e) && ws(e, "__v_skip", !0), e;
}
const Ie = (e) => X(e) ? /* @__PURE__ */ Gn(e) : e, kt = (e) => X(e) ? /* @__PURE__ */ Ar(e) : e;
// @__NO_SIDE_EFFECTS__
function de(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Mt(e) {
  return Ls(e, !1);
}
// @__NO_SIDE_EFFECTS__
function Bl(e) {
  return Ls(e, !0);
}
function Ls(e, t) {
  return /* @__PURE__ */ de(e) ? e : new Ul(e, t);
}
class Ul {
  constructor(t, n) {
    this.dep = new Xr(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ U(t), this._value = n ? t : Ie(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, r = this.__v_isShallow || /* @__PURE__ */ Ee(t) || /* @__PURE__ */ Ze(t);
    t = r ? t : /* @__PURE__ */ U(t), Ke(t, n) && (this._rawValue = t, this._value = r ? t : Ie(t), this.dep.trigger());
  }
}
function Ft(e) {
  return /* @__PURE__ */ de(e) ? e.value : e;
}
const Gl = {
  get: (e, t, n) => t === "__v_raw" ? e : Ft(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return /* @__PURE__ */ de(o) && !/* @__PURE__ */ de(n) ? (o.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function Ks(e) {
  return /* @__PURE__ */ yt(e) ? e : new Proxy(e, Gl);
}
class ql {
  constructor(t, n, r) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Xr(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = en - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    Q !== this)
      return Es(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Ms(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function Yl(e, t, n = !1) {
  let r, o;
  return $(e) ? r = e : (r = e.get, o = e.set), new ql(r, o, n);
}
const wn = {}, In = /* @__PURE__ */ new WeakMap();
let pt;
function zl(e, t = !1, n = pt) {
  if (n) {
    let r = In.get(n);
    r || In.set(n, r = []), r.push(e);
  }
}
function Xl(e, t, n = ee) {
  const { immediate: r, deep: o, once: s, scheduler: i, augmentJob: l, call: c } = n, a = (M) => o ? M : /* @__PURE__ */ Ee(M) || o === !1 || o === 0 ? st(M, 1) : st(M);
  let u, g, v, w, O = !1, x = !1;
  if (/* @__PURE__ */ de(e) ? (g = () => e.value, O = /* @__PURE__ */ Ee(e)) : /* @__PURE__ */ yt(e) ? (g = () => a(e), O = !0) : L(e) ? (x = !0, O = e.some((M) => /* @__PURE__ */ yt(M) || /* @__PURE__ */ Ee(M)), g = () => e.map((M) => {
    if (/* @__PURE__ */ de(M))
      return M.value;
    if (/* @__PURE__ */ yt(M))
      return a(M);
    if ($(M))
      return c ? c(M, 2) : M();
  })) : $(e) ? t ? g = c ? () => c(e, 2) : e : g = () => {
    if (v) {
      Xe();
      try {
        v();
      } finally {
        Je();
      }
    }
    const M = pt;
    pt = u;
    try {
      return c ? c(e, 3, [w]) : e(w);
    } finally {
      pt = M;
    }
  } : g = Ne, t && o) {
    const M = g, K = o === !0 ? 1 / 0 : o;
    g = () => st(M(), K);
  }
  const D = Rs(), H = () => {
    u.stop(), D && D.active && Ur(D.effects, u);
  };
  if (s && t) {
    const M = t;
    t = (...K) => {
      const k = M(...K);
      return H(), k;
    };
  }
  let C = x ? new Array(e.length).fill(wn) : wn;
  const F = (M) => {
    if (!(!(u.flags & 1) || !u.dirty && !M))
      if (t) {
        const K = u.run();
        if (M || o || O || (x ? K.some((k, ne) => Ke(k, C[ne])) : Ke(K, C))) {
          v && v();
          const k = pt;
          pt = u;
          try {
            const ne = [
              K,
              // pass undefined as the old value when it's changed for the first time
              C === wn ? void 0 : x && C[0] === wn ? [] : C,
              w
            ];
            C = K, c ? c(t, 3, ne) : (
              // @ts-expect-error
              t(...ne)
            );
          } finally {
            pt = k;
          }
        }
      } else
        u.run();
  };
  return l && l(F), u = new xs(g), u.scheduler = i ? () => i(F, !1) : F, w = (M) => zl(M, !1, u), v = u.onStop = () => {
    const M = In.get(u);
    if (M) {
      if (c)
        c(M, 4);
      else
        for (const K of M) K();
      In.delete(u);
    }
  }, t ? r ? F(!0) : C = u.run() : i ? i(F.bind(null, !0), !0) : u.run(), H.pause = u.pause.bind(u), H.resume = u.resume.bind(u), H.stop = H, H;
}
function st(e, t = 1 / 0, n) {
  if (t <= 0 || !X(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ de(e))
    st(e.value, t, n);
  else if (L(e))
    for (let r = 0; r < e.length; r++)
      st(e[r], t, n);
  else if (Mn(e) || it(e))
    e.forEach((r) => {
      st(r, t, n);
    });
  else if (ys(e)) {
    for (const r in e)
      st(e[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, r) && st(e[r], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function un(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (o) {
    qn(o, t, n);
  }
}
function Ae(e, t, n, r) {
  if ($(e)) {
    const o = un(e, t, n, r);
    return o && hs(o) && o.catch((s) => {
      qn(s, t, n);
    }), o;
  }
  if (L(e)) {
    const o = [];
    for (let s = 0; s < e.length; s++)
      o.push(Ae(e[s], t, n, r));
    return o;
  }
}
function qn(e, t, n, r = !0) {
  const o = t ? t.vnode : null, { errorHandler: s, throwUnhandledErrorInProduction: i } = t && t.appContext.config || ee;
  if (t) {
    let l = t.parent;
    const c = t.proxy, a = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const u = l.ec;
      if (u) {
        for (let g = 0; g < u.length; g++)
          if (u[g](e, c, a) === !1)
            return;
      }
      l = l.parent;
    }
    if (s) {
      Xe(), un(s, null, 10, [
        e,
        c,
        a
      ]), Je();
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
const me = [];
let He = -1;
const jt = [];
let ot = null, It = 0;
const $s = /* @__PURE__ */ Promise.resolve();
let An = null;
function Ns(e) {
  const t = An || $s;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Zl(e) {
  let t = He + 1, n = me.length;
  for (; t < n; ) {
    const r = t + n >>> 1, o = me[r], s = nn(o);
    s < e || s === e && o.flags & 2 ? t = r + 1 : n = r;
  }
  return t;
}
function eo(e) {
  if (!(e.flags & 1)) {
    const t = nn(e), n = me[me.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= nn(n) ? me.push(e) : me.splice(Zl(t), 0, e), e.flags |= 1, Vs();
  }
}
function Vs() {
  An || (An = $s.then(Bs));
}
function Ql(e) {
  if (!L(e))
    ot && e.id === -1 ? ot.splice(It + 1, 0, e) : e.flags & 1 || (jt.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      jt.push(e[t]);
  Vs();
}
function bo(e, t, n = He + 1) {
  for (; n < me.length; n++) {
    const r = me[n];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid)
        continue;
      me.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function Ws(e) {
  if (jt.length) {
    const t = [...new Set(jt)].sort(
      (n, r) => nn(n) - nn(r)
    );
    if (jt.length = 0, ot) {
      for (let n = 0; n < t.length; n++)
        ot.push(t[n]);
      return;
    }
    for (ot = t, It = 0; It < ot.length; It++) {
      const n = ot[It];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    ot = null, It = 0;
  }
}
const nn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Bs(e) {
  try {
    for (He = 0; He < me.length; He++) {
      const t = me[He];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), un(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; He < me.length; He++) {
      const t = me[He];
      t && (t.flags &= -2);
    }
    He = -1, me.length = 0, Ws(), An = null, (me.length || jt.length) && Bs();
  }
}
let $e = null, Us = null;
function Tn(e) {
  const t = $e;
  return $e = e, Us = e && e.type.__scopeId || null, t;
}
function ec(e, t = $e, n) {
  if (!t || e._n)
    return e;
  const r = (...o) => {
    r._d && Ao(-1);
    const s = Tn(t), i = vt.length;
    let l;
    try {
      l = e(...o);
    } finally {
      for (let c = vt.length; c > i; c--) yi();
      Tn(s), r._d && Ao(1);
    }
    return l;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function ft(e, t, n, r) {
  const o = e.dirs, s = t && t.dirs;
  for (let i = 0; i < o.length; i++) {
    const l = o[i];
    s && (l.oldValue = s[i].value);
    let c = l.dir[r];
    c && (Xe(), Ae(c, n, 8, [
      e.el,
      l,
      e,
      t
    ]), Je());
  }
}
function tc(e, t) {
  if (ye) {
    let n = ye.provides;
    const r = ye.parent && ye.parent.provides;
    r === n && (n = ye.provides = Object.create(r)), n[e] = t;
  }
}
function Cn(e, t, n = !1) {
  const r = Zc();
  if (r || Ht) {
    let o = Ht ? Ht._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && $(t) ? t.call(r && r.proxy) : t;
  }
}
const nc = /* @__PURE__ */ Symbol.for("v-scx"), rc = () => Cn(nc);
function Se(e, t, n) {
  return Gs(e, t, n);
}
function Gs(e, t, n = ee) {
  const { immediate: r, deep: o, flush: s, once: i } = n, l = pe({}, n), c = t && r || !t && s !== "post";
  let a;
  if (sn) {
    if (s === "sync") {
      const w = rc();
      a = w.__watcherHandles || (w.__watcherHandles = []);
    } else if (!c) {
      const w = () => {
      };
      return w.stop = Ne, w.resume = Ne, w.pause = Ne, w;
    }
  }
  const u = ye;
  l.call = (w, O, x) => Ae(w, u, O, x);
  let g = !1;
  s === "post" ? l.scheduler = (w) => {
    _e(w, u && u.suspense);
  } : s !== "sync" && (g = !0, l.scheduler = (w, O) => {
    O ? w() : eo(w);
  }), l.augmentJob = (w) => {
    t && (w.flags |= 4), g && (w.flags |= 2, u && (w.id = u.uid, w.i = u));
  };
  const v = Xl(e, t, l);
  return sn && (a ? a.push(v) : c && v()), v;
}
function oc(e, t, n) {
  const r = this.proxy, o = oe(e) ? e.includes(".") ? qs(r, e) : () => r[e] : e.bind(r, r);
  let s;
  $(t) ? s = t : (s = t.handler, n = t);
  const i = fn(this), l = Gs(o, s.bind(r), n);
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
const sc = /* @__PURE__ */ Symbol("_vte"), Yn = (e) => e.__isTeleport, pr = /* @__PURE__ */ Symbol("_leaveCb");
function ic(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== Qe) {
        t = n;
        break;
      }
  }
  return t;
}
function Ys(e) {
  if (!no(e))
    return Yn(e.type) && e.children ? ic(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16)
      return n[0];
    if (t & 32 && $(n.default))
      return n.default();
  }
}
function to(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    to(
      Yn(n.type) && Ys(n) || n,
      t
    );
  } else e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function zs(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function _o(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const Dn = /* @__PURE__ */ new WeakMap();
function Xt(e, t, n, r, o = !1) {
  if (L(e)) {
    e.forEach(
      (x, D) => Xt(
        x,
        t && (L(t) ? t[D] : t),
        n,
        r,
        o
      )
    );
    return;
  }
  if (Jt(r) && !o) {
    r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && Xt(e, t, n, r.component.subTree);
    return;
  }
  const s = r.shapeFlag & 4 ? so(r.component) : r.el, i = o ? null : s, { i: l, r: c } = e, a = t && t.r, u = l.refs === ee ? l.refs = {} : l.refs, g = l.setupState, v = /* @__PURE__ */ U(g), w = g === ee ? gs : (x) => _o(u, x) ? !1 : G(v, x), O = (x, D) => !(D && _o(u, D));
  if (a != null && a !== c) {
    if (So(t), oe(a))
      u[a] = null, w(a) && (g[a] = null);
    else if (/* @__PURE__ */ de(a)) {
      const x = t;
      O(a, x.k) && (a.value = null), x.k && (u[x.k] = null);
    }
  }
  if ($(c))
    un(c, l, 12, [i, u]);
  else {
    const x = oe(c), D = /* @__PURE__ */ de(c);
    if (x || D) {
      const H = () => {
        if (e.f) {
          const C = x ? w(c) ? g[c] : u[c] : O() || !e.k ? c.value : u[e.k];
          if (o)
            L(C) && Ur(C, s);
          else if (L(C))
            C.includes(s) || C.push(s);
          else if (x)
            u[c] = [s], w(c) && (g[c] = u[c]);
          else {
            const F = [s];
            O(c, e.k) && (c.value = F), e.k && (u[e.k] = F);
          }
        } else x ? (u[c] = i, w(c) && (g[c] = i)) : D && (O(c, e.k) && (c.value = i), e.k && (u[e.k] = i));
      };
      if (i) {
        const C = () => {
          H(), Dn.delete(e);
        };
        C.id = -1, Dn.set(e, C), _e(C, n);
      } else
        So(e), H();
    }
  }
}
function So(e) {
  const t = Dn.get(e);
  t && (t.flags |= 8, Dn.delete(e));
}
Wn().requestIdleCallback;
Wn().cancelIdleCallback;
const Jt = (e) => !!e.type.__asyncLoader, no = (e) => e.type.__isKeepAlive;
function lc(e, t) {
  Xs(e, "a", t);
}
function cc(e, t) {
  Xs(e, "da", t);
}
function Xs(e, t, n = ye) {
  const r = e.__wdc || (e.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (zn(t, r, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      no(o.parent.vnode) && ac(r, t, n, o), o = o.parent;
  }
}
function ac(e, t, n, r) {
  const o = zn(
    t,
    e,
    r,
    !0
    /* prepend */
  );
  Qs(() => {
    Ur(r[t], o);
  }, n);
}
function zn(e, t, n = ye, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), s = t.__weh || (t.__weh = (...i) => {
      Xe();
      const l = fn(n), c = Ae(t, n, e, i);
      return l(), Je(), c;
    });
    return r ? o.unshift(s) : o.push(s), s;
  }
}
const tt = (e) => (t, n = ye) => {
  (!sn || e === "sp") && zn(e, (...r) => t(...r), n);
}, uc = tt("bm"), Js = tt("m"), fc = tt(
  "bu"
), dc = tt("u"), Zs = tt(
  "bum"
), Qs = tt("um"), pc = tt(
  "sp"
), gc = tt("rtg"), hc = tt("rtc");
function mc(e, t = ye) {
  zn("ec", e, t);
}
const yc = /* @__PURE__ */ Symbol.for("v-ndc");
function gr(e, t, n, r) {
  let o;
  const s = n, i = L(e);
  if (i || oe(e)) {
    const l = i && /* @__PURE__ */ yt(e);
    let c = !1, a = !1;
    l && (c = !/* @__PURE__ */ Ee(e), a = /* @__PURE__ */ Ze(e), e = Un(e)), o = new Array(e.length);
    for (let u = 0, g = e.length; u < g; u++)
      o[u] = t(
        c ? a ? kt(Ie(e[u])) : Ie(e[u]) : e[u],
        u,
        void 0,
        s
      );
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let l = 0; l < e; l++)
      o[l] = t(l + 1, l, void 0, s);
  } else if (X(e))
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
const Tr = (e) => e ? _i(e) ? so(e) : Tr(e.parent) : null, Zt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ pe(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Tr(e.parent),
    $root: (e) => Tr(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => ti(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      eo(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Ns.bind(e.proxy)),
    $watch: (e) => oc.bind(e)
  })
), hr = (e, t) => e !== ee && !e.__isScriptSetup && G(e, t), vc = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: r, data: o, props: s, accessCache: i, type: l, appContext: c } = e;
    if (t[0] !== "$") {
      const v = i[t];
      if (v !== void 0)
        switch (v) {
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
        if (hr(r, t))
          return i[t] = 1, r[t];
        if (o !== ee && G(o, t))
          return i[t] = 2, o[t];
        if (G(s, t))
          return i[t] = 3, s[t];
        if (n !== ee && G(n, t))
          return i[t] = 4, n[t];
        Dr && (i[t] = 0);
      }
    }
    const a = Zt[t];
    let u, g;
    if (a)
      return t === "$attrs" && fe(e.attrs, "get", ""), a(e);
    if (
      // css module (injected by vue-loader)
      (u = l.__cssModules) && (u = u[t])
    )
      return u;
    if (n !== ee && G(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      g = c.config.globalProperties, G(g, t)
    )
      return g[t];
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: o, ctx: s } = e;
    return hr(o, t) ? (o[t] = n, !0) : r !== ee && G(r, t) ? (r[t] = n, !0) : G(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (s[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: o, props: s, type: i }
  }, l) {
    let c;
    return !!(n[l] || e !== ee && l[0] !== "$" && G(e, l) || hr(t, l) || G(s, l) || G(r, l) || G(Zt, l) || G(o.config.globalProperties, l) || (c = i.__cssModules) && c[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : G(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function Ro(e) {
  return L(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let Dr = !0;
function wc(e) {
  const t = ti(e), n = e.proxy, r = e.ctx;
  Dr = !1, t.beforeCreate && xo(t.beforeCreate, e, "bc");
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
    beforeMount: g,
    mounted: v,
    beforeUpdate: w,
    updated: O,
    activated: x,
    deactivated: D,
    beforeDestroy: H,
    beforeUnmount: C,
    destroyed: F,
    unmounted: M,
    render: K,
    renderTracked: k,
    renderTriggered: ne,
    errorCaptured: j,
    serverPrefetch: T,
    // public API
    expose: V,
    inheritAttrs: te,
    // assets
    components: B,
    directives: re,
    filters: ve
  } = t;
  if (a && bc(a, r, null), i)
    for (const W in i) {
      const q = i[W];
      $(q) && (r[W] = q.bind(n));
    }
  if (o) {
    const W = o.call(n, n);
    X(W) && (e.data = /* @__PURE__ */ Gn(W));
  }
  if (Dr = !0, s)
    for (const W in s) {
      const q = s[W], We = $(q) ? q.bind(n, n) : $(q.get) ? q.get.bind(n, n) : Ne, Et = !$(q) && $(q.set) ? q.set.bind(n) : Ne, Pe = le({
        get: We,
        set: Et
      });
      Object.defineProperty(r, W, {
        enumerable: !0,
        configurable: !0,
        get: () => Pe.value,
        set: (be) => Pe.value = be
      });
    }
  if (l)
    for (const W in l)
      ei(l[W], r, n, W);
  if (c) {
    const W = $(c) ? c.call(n) : c;
    Reflect.ownKeys(W).forEach((q) => {
      tc(q, W[q]);
    });
  }
  u && xo(u, e, "c");
  function Z(W, q) {
    L(q) ? q.forEach((We) => W(We.bind(n))) : q && W(q.bind(n));
  }
  if (Z(uc, g), Z(Js, v), Z(fc, w), Z(dc, O), Z(lc, x), Z(cc, D), Z(mc, j), Z(hc, k), Z(gc, ne), Z(Zs, C), Z(Qs, M), Z(pc, T), L(V))
    if (V.length) {
      const W = e.exposed || (e.exposed = {});
      V.forEach((q) => {
        Object.defineProperty(W, q, {
          get: () => n[q],
          set: (We) => n[q] = We,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  K && e.render === Ne && (e.render = K), te != null && (e.inheritAttrs = te), B && (e.components = B), re && (e.directives = re), T && zs(e);
}
function bc(e, t, n = Ne) {
  L(e) && (e = Fr(e));
  for (const r in e) {
    const o = e[r];
    let s;
    X(o) ? "default" in o ? s = Cn(
      o.from || r,
      o.default,
      !0
    ) : s = Cn(o.from || r) : s = Cn(o), /* @__PURE__ */ de(s) ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (i) => s.value = i
    }) : t[r] = s;
  }
}
function xo(e, t, n) {
  Ae(
    L(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function ei(e, t, n, r) {
  let o = r.includes(".") ? qs(n, r) : () => n[r];
  if (oe(e)) {
    const s = t[e];
    $(s) && Se(o, s);
  } else if ($(e))
    Se(o, e.bind(n));
  else if (X(e))
    if (L(e))
      e.forEach((s) => ei(s, t, n, r));
    else {
      const s = $(e.handler) ? e.handler.bind(n) : t[e.handler];
      $(s) && Se(o, s, e);
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
    (a) => Fn(c, a, i, !0)
  ), Fn(c, t, i)), X(t) && s.set(t, c), c;
}
function Fn(e, t, n, r = !1) {
  const { mixins: o, extends: s } = t;
  s && Fn(e, s, n, !0), o && o.forEach(
    (i) => Fn(e, i, n, !0)
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
  props: Eo,
  emits: Eo,
  // objects
  methods: Ut,
  computed: Ut,
  // lifecycle
  beforeCreate: he,
  created: he,
  beforeMount: he,
  mounted: he,
  beforeUpdate: he,
  updated: he,
  beforeDestroy: he,
  beforeUnmount: he,
  destroyed: he,
  unmounted: he,
  activated: he,
  deactivated: he,
  errorCaptured: he,
  serverPrefetch: he,
  // assets
  components: Ut,
  directives: Ut,
  // watch
  watch: Rc,
  // provide / inject
  provide: Co,
  inject: Sc
};
function Co(e, t) {
  return t ? e ? function() {
    return pe(
      $(e) ? e.call(this, this) : e,
      $(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Sc(e, t) {
  return Ut(Fr(e), Fr(t));
}
function Fr(e) {
  if (L(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function he(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Ut(e, t) {
  return e ? pe(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Eo(e, t) {
  return e ? L(e) && L(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : pe(
    /* @__PURE__ */ Object.create(null),
    Ro(e),
    Ro(t ?? {})
  ) : t;
}
function Rc(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = pe(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = he(e[r], t[r]);
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
let xc = 0;
function Cc(e, t) {
  return function(r, o = null) {
    $(r) || (r = pe({}, r)), o != null && !X(o) && (o = null);
    const s = ni(), i = /* @__PURE__ */ new WeakSet(), l = [];
    let c = !1;
    const a = s.app = {
      _uid: xc++,
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
      use(u, ...g) {
        return i.has(u) || (u && $(u.install) ? (i.add(u), u.install(a, ...g)) : $(u) && (i.add(u), u(a, ...g))), a;
      },
      mixin(u) {
        return s.mixins.includes(u) || s.mixins.push(u), a;
      },
      component(u, g) {
        return g ? (s.components[u] = g, a) : s.components[u];
      },
      directive(u, g) {
        return g ? (s.directives[u] = g, a) : s.directives[u];
      },
      mount(u, g, v) {
        if (!c) {
          const w = a._ceVNode || ze(r, o);
          return w.appContext = s, v === !0 ? v = "svg" : v === !1 && (v = void 0), e(w, u, v), c = !0, a._container = u, u.__vue_app__ = a, so(w.component);
        }
      },
      onUnmount(u) {
        l.push(u);
      },
      unmount() {
        c && (Ae(
          l,
          a._instance,
          16
        ), e(null, a._container), delete a._container.__vue_app__);
      },
      provide(u, g) {
        return s.provides[u] = g, a;
      },
      runWithContext(u) {
        const g = Ht;
        Ht = a;
        try {
          return u();
        } finally {
          Ht = g;
        }
      }
    };
    return a;
  };
}
let Ht = null;
const Ec = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Oe(t)}Modifiers`] || e[`${Rt(t)}Modifiers`];
function Pc(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || ee;
  let o = n;
  const s = t.startsWith("update:"), i = s && Ec(r, t.slice(7));
  i && (i.trim && (o = n.map((u) => oe(u) ? u.trim() : u)), i.number && (o = o.map(hl)));
  let l, c = r[l = lr(t)] || // also try camelCase event handler (#2249)
  r[l = lr(Oe(t))];
  !c && s && (c = r[l = lr(Rt(t))]), c && Ae(
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
    e.emitted[l] = !0, Ae(
      a,
      e,
      6,
      o
    );
  }
}
const Oc = /* @__PURE__ */ new WeakMap();
function ri(e, t, n = !1) {
  const r = n ? Oc : t.emitsCache, o = r.get(e);
  if (o !== void 0)
    return o;
  const s = e.emits;
  let i = {}, l = !1;
  if (!$(e)) {
    const c = (a) => {
      const u = ri(a, t, !0);
      u && (l = !0, pe(i, u));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !s && !l ? (X(e) && r.set(e, null), null) : (L(s) ? s.forEach((c) => i[c] = null) : pe(i, s), X(e) && r.set(e, i), i);
}
function Xn(e, t) {
  return !e || !$n(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), G(e, t[0].toLowerCase() + t.slice(1)) || G(e, Rt(t)) || G(e, t));
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
    props: g,
    data: v,
    setupState: w,
    ctx: O,
    inheritAttrs: x
  } = e, D = Tn(e);
  let H, C;
  try {
    if (n.shapeFlag & 4) {
      const M = o || r, K = M;
      H = Le(
        a.call(
          K,
          M,
          u,
          g,
          w,
          v,
          O
        )
      ), C = l;
    } else {
      const M = t;
      H = Le(
        M.length > 1 ? M(
          g,
          { attrs: l, slots: i, emit: c }
        ) : M(
          g,
          null
        )
      ), C = t.props ? l : Mc(l);
    }
  } catch (M) {
    vt.length = 0, qn(M, e, 1), H = ze(Qe);
  }
  let F = H;
  if (C && x !== !1) {
    const M = Object.keys(C), { shapeFlag: K } = F;
    M.length && K & 7 && (s && M.some(Nn) && (C = Ic(
      C,
      s
    )), F = Lt(F, C, !1, !0));
  }
  if (n.dirs && (F = Lt(F, null, !1, !0), F.dirs = F.dirs ? F.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const M = Yn(F.type) && Ys(F) || F;
    to(M, n.transition);
  }
  return H = F, Tn(D), H;
}
const Mc = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || $n(n)) && ((t || (t = {}))[n] = e[n]);
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
      return r ? Oo(r, i, a) : !!i;
    if (c & 8) {
      const u = t.dynamicProps;
      for (let g = 0; g < u.length; g++) {
        const v = u[g];
        if (oi(i, r, v) && !Xn(a, v))
          return !0;
      }
    }
  } else
    return (o || l) && (!l || !l.$stable) ? !0 : r === i ? !1 : r ? i ? Oo(r, i, a) : !0 : !!i;
  return !1;
}
function Oo(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < r.length; o++) {
    const s = r[o];
    if (oi(t, e, s) && !Xn(n, s))
      return !0;
  }
  return !1;
}
function oi(e, t, n) {
  const r = e[n], o = t[n];
  return n === "style" && X(r) && X(o) ? !Bn(r, o) : r !== o;
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
  n ? e.props = r ? o : /* @__PURE__ */ Vl(o) : e.type.props ? e.props = o : e.props = s, e.attrs = s;
}
function Fc(e, t, n, r) {
  const {
    props: o,
    attrs: s,
    vnode: { patchFlag: i }
  } = e, l = /* @__PURE__ */ U(o), [c] = e.propsOptions;
  let a = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (r || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const u = e.vnode.dynamicProps;
      for (let g = 0; g < u.length; g++) {
        let v = u[g];
        if (Xn(e.emitsOptions, v))
          continue;
        const w = t[v];
        if (c)
          if (G(s, v))
            w !== s[v] && (s[v] = w, a = !0);
          else {
            const O = Oe(v);
            o[O] = jr(
              c,
              l,
              O,
              w,
              e,
              !1
            );
          }
        else
          w !== s[v] && (s[v] = w, a = !0);
      }
    }
  } else {
    ci(e, t, o, s) && (a = !0);
    let u;
    for (const g in l)
      (!t || // for camelCase
      !G(t, g) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((u = Rt(g)) === g || !G(t, u))) && (c ? n && // for camelCase
      (n[g] !== void 0 || // for kebab-case
      n[u] !== void 0) && (o[g] = jr(
        c,
        l,
        g,
        void 0,
        e,
        !0
      )) : delete o[g]);
    if (s !== l)
      for (const g in s)
        (!t || !G(t, g)) && (delete s[g], a = !0);
  }
  a && Ye(e.attrs, "set", "");
}
function ci(e, t, n, r) {
  const [o, s] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let c in t) {
      if (qt(c))
        continue;
      const a = t[c];
      let u;
      o && G(o, u = Oe(c)) ? !s || !s.includes(u) ? n[u] = a : (l || (l = {}))[u] = a : Xn(e.emitsOptions, c) || (!(c in r) || a !== r[c]) && (r[c] = a, i = !0);
    }
  if (s) {
    const c = /* @__PURE__ */ U(n), a = l || ee;
    for (let u = 0; u < s.length; u++) {
      const g = s[u];
      n[g] = jr(
        o,
        c,
        g,
        a[g],
        e,
        !G(a, g)
      );
    }
  }
  return i;
}
function jr(e, t, n, r, o, s) {
  const i = e[n];
  if (i != null) {
    const l = G(i, "default");
    if (l && r === void 0) {
      const c = i.default;
      if (i.type !== Function && !i.skipFactory && $(c)) {
        const { propsDefaults: a } = o;
        if (n in a)
          r = a[n];
        else {
          const u = fn(o);
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
    ] && (r === "" || r === Rt(n)) && (r = !0));
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
  if (!$(e)) {
    const u = (g) => {
      c = !0;
      const [v, w] = ai(g, t, !0);
      pe(i, v), w && l.push(...w);
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  if (!s && !c)
    return X(e) && r.set(e, Tt), Tt;
  if (L(s))
    for (let u = 0; u < s.length; u++) {
      const g = Oe(s[u]);
      Mo(g) && (i[g] = ee);
    }
  else if (s)
    for (const u in s) {
      const g = Oe(u);
      if (Mo(g)) {
        const v = s[u], w = i[g] = L(v) || $(v) ? { type: v } : pe({}, v), O = w.type;
        let x = !1, D = !0;
        if (L(O))
          for (let H = 0; H < O.length; ++H) {
            const C = O[H], F = $(C) && C.name;
            if (F === "Boolean") {
              x = !0;
              break;
            } else F === "String" && (D = !1);
          }
        else
          x = $(O) && O.name === "Boolean";
        w[
          0
          /* shouldCast */
        ] = x, w[
          1
          /* shouldCastTrue */
        ] = D, (x || G(w, "default")) && l.push(g);
      }
    }
  const a = [i, l];
  return X(e) && r.set(e, a), a;
}
function Mo(e) {
  return e[0] !== "$" && !qt(e);
}
const ro = (e) => e === "_" || e === "_ctx" || e === "$stable", oo = (e) => L(e) ? e.map(Le) : [Le(e)], Hc = (e, t, n) => {
  if (t._n)
    return t;
  const r = ec((...o) => oo(t(...o)), n);
  return r._c = !1, r;
}, ui = (e, t, n) => {
  const r = e._ctx;
  for (const o in e) {
    if (ro(o)) continue;
    const s = e[o];
    if ($(s))
      t[o] = Hc(o, s, r);
    else if (s != null) {
      const i = oo(s);
      t[o] = () => i;
    }
  }
}, fi = (e, t) => {
  const n = oo(t);
  e.slots.default = () => n;
}, di = (e, t, n) => {
  for (const r in t)
    (n || !ro(r)) && (e[r] = t[r]);
}, kc = (e, t, n) => {
  const r = e.slots = ii();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (di(r, t, n), n && ws(r, "_", o, !0)) : ui(t, r);
  } else t && fi(e, t);
}, Lc = (e, t, n) => {
  const { vnode: r, slots: o } = e;
  let s = !0, i = ee;
  if (r.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? s = !1 : di(o, t, n) : (s = !t.$stable, ui(t, o)), i = t;
  } else t && (fi(e, t), i = { default: 1 });
  if (s)
    for (const l in o)
      !ro(l) && i[l] == null && delete o[l];
}, _e = Wc;
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
    parentNode: g,
    nextSibling: v,
    setScopeId: w = Ne,
    insertStaticContent: O
  } = e, x = (f, p, y, S = null, R = null, _ = null, I = void 0, P = null, E = !!p.dynamicChildren) => {
    if (f === p)
      return;
    f && !Bt(f, p) && (S = nt(f), be(f, R, _, !0), f = null), p.patchFlag === -2 && (E = !1, p.dynamicChildren = null);
    const { type: d, ref: h, shapeFlag: m } = p;
    switch (d) {
      case Jn:
        D(f, p, y, S);
        break;
      case Qe:
        H(f, p, y, S);
        break;
      case yr:
        f == null && C(p, y, S, I);
        break;
      case xe:
        B(
          f,
          p,
          y,
          S,
          R,
          _,
          I,
          P,
          E
        );
        break;
      default:
        m & 1 ? K(
          f,
          p,
          y,
          S,
          R,
          _,
          I,
          P,
          E
        ) : m & 6 ? re(
          f,
          p,
          y,
          S,
          R,
          _,
          I,
          P,
          E
        ) : (m & 64 || m & 128) && d.process(
          f,
          p,
          y,
          S,
          R,
          _,
          I,
          P,
          E,
          ut
        );
    }
    h != null && R ? Xt(h, f && f.ref, _, p || f, !p) : h == null && f && f.ref != null && Xt(f.ref, null, _, f, !0);
  }, D = (f, p, y, S) => {
    if (f == null)
      r(
        p.el = l(p.children),
        y,
        S
      );
    else {
      const R = p.el = f.el;
      p.children !== f.children && a(R, p.children);
    }
  }, H = (f, p, y, S) => {
    f == null ? r(
      p.el = c(p.children || ""),
      y,
      S
    ) : p.el = f.el;
  }, C = (f, p, y, S) => {
    [f.el, f.anchor] = O(
      f.children,
      p,
      y,
      S,
      f.el,
      f.anchor
    );
  }, F = ({ el: f, anchor: p }, y, S) => {
    let R;
    for (; f && f !== p; )
      R = v(f), r(f, y, S), f = R;
    r(p, y, S);
  }, M = ({ el: f, anchor: p }) => {
    let y;
    for (; f && f !== p; )
      y = v(f), o(f), f = y;
    o(p);
  }, K = (f, p, y, S, R, _, I, P, E) => {
    if (p.type === "svg" ? I = "svg" : p.type === "math" && (I = "mathml"), f == null)
      k(
        p,
        y,
        S,
        R,
        _,
        I,
        P,
        E
      );
    else {
      const d = f.el && f.el._isVueCE ? f.el : null;
      try {
        d && d._beginPatch(), T(
          f,
          p,
          R,
          _,
          I,
          P,
          E
        );
      } finally {
        d && d._endPatch();
      }
    }
  }, k = (f, p, y, S, R, _, I, P) => {
    let E, d;
    const { props: h, shapeFlag: m, transition: b, dirs: A } = f;
    if (E = f.el = i(
      f.type,
      _,
      h && h.is,
      h
    ), m & 8 ? u(E, f.children) : m & 16 && j(
      f.children,
      E,
      null,
      S,
      R,
      mr(f, _),
      I,
      P
    ), A && ft(f, null, S, "created"), ne(E, f, f.scopeId, I, S), h) {
      for (const Y in h)
        Y !== "value" && !qt(Y) && s(E, Y, null, h[Y], _, S);
      "value" in h && s(E, "value", null, h.value, _), (d = h.onVnodeBeforeMount) && je(d, S, f);
    }
    A && ft(f, null, S, "beforeMount");
    const N = Nc(R, b);
    N && b.beforeEnter(E), r(E, p, y), ((d = h && h.onVnodeMounted) || N || A) && _e(() => {
      try {
        d && je(d, S, f), N && b.enter(E), A && ft(f, null, S, "mounted");
      } finally {
      }
    }, R);
  }, ne = (f, p, y, S, R) => {
    if (y && w(f, y), S)
      for (let _ = 0; _ < S.length; _++)
        w(f, S[_]);
    if (R) {
      let _ = R.subTree;
      if (p === _ || mi(_.type) && (_.ssContent === p || _.ssFallback === p)) {
        const I = R.vnode;
        ne(
          f,
          I,
          I.scopeId,
          I.slotScopeIds,
          R.parent
        );
      }
    }
  }, j = (f, p, y, S, R, _, I, P, E = 0) => {
    for (let d = E; d < f.length; d++) {
      const h = f[d] = P ? qe(f[d]) : Le(f[d]);
      x(
        null,
        h,
        p,
        y,
        S,
        R,
        _,
        I,
        P
      );
    }
  }, T = (f, p, y, S, R, _, I) => {
    const P = p.el = f.el;
    let { patchFlag: E, dynamicChildren: d, dirs: h } = p;
    E |= f.patchFlag & 16;
    const m = f.props || ee, b = p.props || ee;
    let A;
    if (y && dt(y, !1), (A = b.onVnodeBeforeUpdate) && je(A, y, p, f), h && ft(p, f, y, "beforeUpdate"), y && dt(y, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    d && (!f.dynamicChildren || f.dynamicChildren.length !== d.length) && (E = 0, I = !1, d = null), (m.innerHTML && b.innerHTML == null || m.textContent && b.textContent == null) && u(P, ""), d ? V(
      f.dynamicChildren,
      d,
      P,
      y,
      S,
      mr(p, R),
      _
    ) : I || q(
      f,
      p,
      P,
      null,
      y,
      S,
      mr(p, R),
      _,
      !1
    ), E > 0) {
      if (E & 16)
        te(P, m, b, y, R);
      else if (E & 2 && m.class !== b.class && s(P, "class", null, b.class, R), E & 4 && s(P, "style", m.style, b.style, R), E & 8) {
        const N = p.dynamicProps;
        for (let Y = 0; Y < N.length; Y++) {
          const z = N[Y], se = m[z], ce = b[z];
          (ce !== se || z === "value") && s(P, z, se, ce, R, y);
        }
      }
      E & 1 && f.children !== p.children && u(P, p.children);
    } else !I && d == null && te(P, m, b, y, R);
    ((A = b.onVnodeUpdated) || h) && _e(() => {
      A && je(A, y, p, f), h && ft(p, f, y, "updated");
    }, S);
  }, V = (f, p, y, S, R, _, I) => {
    for (let P = 0; P < p.length; P++) {
      const E = f[P], d = p[P], h = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        E.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (E.type === xe || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Bt(E, d) || // - In the case of a component, it could contain anything.
        E.shapeFlag & 198) ? g(E.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          y
        )
      );
      x(
        E,
        d,
        h,
        null,
        S,
        R,
        _,
        I,
        !0
      );
    }
  }, te = (f, p, y, S, R) => {
    if (p !== y) {
      if (p !== ee)
        for (const _ in p)
          !qt(_) && !(_ in y) && s(
            f,
            _,
            p[_],
            null,
            R,
            S
          );
      for (const _ in y) {
        if (qt(_)) continue;
        const I = y[_], P = p[_];
        I !== P && _ !== "value" && s(f, _, P, I, R, S);
      }
      "value" in y && s(f, "value", p.value, y.value, R);
    }
  }, B = (f, p, y, S, R, _, I, P, E) => {
    const d = p.el = f ? f.el : l(""), h = p.anchor = f ? f.anchor : l("");
    let { patchFlag: m, dynamicChildren: b, slotScopeIds: A } = p;
    A && (P = P ? P.concat(A) : A), f == null ? (r(d, y, S), r(h, y, S), j(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      p.children || [],
      y,
      h,
      R,
      _,
      I,
      P,
      E
    )) : m > 0 && m & 64 && b && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    f.dynamicChildren && f.dynamicChildren.length === b.length ? (V(
      f.dynamicChildren,
      b,
      y,
      R,
      _,
      I,
      P
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (p.key != null || R && p === R.subTree) && pi(
      f,
      p,
      !0
      /* shallow */
    )) : q(
      f,
      p,
      y,
      h,
      R,
      _,
      I,
      P,
      E
    );
  }, re = (f, p, y, S, R, _, I, P, E) => {
    p.slotScopeIds = P, f == null ? p.shapeFlag & 512 ? R.ctx.activate(
      p,
      y,
      S,
      I,
      E
    ) : ve(
      p,
      y,
      S,
      R,
      _,
      I,
      E
    ) : we(f, p, E);
  }, ve = (f, p, y, S, R, _, I) => {
    const P = f.component = Jc(
      f,
      S,
      R
    );
    if (no(f) && (P.ctx.renderer = ut), Qc(P, !1, I), P.asyncDep) {
      if (R && R.registerDep(P, Z, I), !f.el) {
        const E = P.subTree = ze(Qe);
        H(null, E, p, y), f.placeholder = E.el;
      }
    } else
      Z(
        P,
        f,
        p,
        y,
        R,
        _,
        I
      );
  }, we = (f, p, y) => {
    const S = p.component = f.component;
    if (Ac(f, p, y))
      if (S.asyncDep && !S.asyncResolved) {
        W(S, p, y);
        return;
      } else
        S.next = p, S.update();
    else
      p.el = f.el, S.vnode = p;
  }, Z = (f, p, y, S, R, _, I) => {
    const P = () => {
      if (f.isMounted) {
        let { next: m, bu: b, u: A, parent: N, vnode: Y } = f;
        {
          const De = gi(f);
          if (De) {
            m && (m.el = Y.el, W(f, m, I)), De.asyncDep.then(() => {
              _e(() => {
                f.isUnmounted || d();
              }, R);
            });
            return;
          }
        }
        let z = m, se;
        dt(f, !1), m ? (m.el = Y.el, W(f, m, I)) : m = Y, b && cr(b), (se = m.props && m.props.onVnodeBeforeUpdate) && je(se, N, m, Y), dt(f, !0);
        const ce = Po(f), Te = f.subTree;
        f.subTree = ce, x(
          Te,
          ce,
          // parent may have changed if it's in a teleport
          g(Te.el),
          // anchor may have changed if it's in a fragment
          nt(Te),
          f,
          R,
          _
        ), m.el = ce.el, z === null && Tc(f, ce.el), A && _e(A, R), (se = m.props && m.props.onVnodeUpdated) && _e(
          () => je(se, N, m, Y),
          R
        );
      } else {
        let m;
        const { el: b, props: A } = p, { bm: N, m: Y, parent: z, root: se, type: ce } = f, Te = Jt(p);
        dt(f, !1), N && cr(N), !Te && (m = A && A.onVnodeBeforeMount) && je(m, z, p), dt(f, !0);
        {
          se.ce && se.ce._hasShadowRoot() && se.ce._injectChildStyle(
            ce,
            f.parent ? f.parent.type : void 0
          );
          const De = f.subTree = Po(f);
          x(
            null,
            De,
            y,
            S,
            f,
            R,
            _
          ), p.el = De.el;
        }
        if (Y && _e(Y, R), !Te && (m = A && A.onVnodeMounted)) {
          const De = p;
          _e(
            () => je(m, z, De),
            R
          );
        }
        (p.shapeFlag & 256 || z && Jt(z.vnode) && z.vnode.shapeFlag & 256) && f.a && _e(f.a, R), f.isMounted = !0, p = y = S = null;
      }
    };
    f.scope.on();
    const E = f.effect = new xs(P);
    f.scope.off();
    const d = f.update = E.run.bind(E), h = f.job = E.runIfDirty.bind(E);
    h.i = f, h.id = f.uid, E.scheduler = () => eo(h), dt(f, !0), d();
  }, W = (f, p, y) => {
    p.component = f;
    const S = f.vnode.props;
    f.vnode = p, f.next = null, Fc(f, p.props, S, y), Lc(f, p.children, y), Xe(), bo(f), Je();
  }, q = (f, p, y, S, R, _, I, P, E = !1) => {
    const d = f && f.children, h = f ? f.shapeFlag : 0, m = p.children, { patchFlag: b, shapeFlag: A } = p;
    if (b > 0) {
      if (b & 128) {
        Et(
          d,
          m,
          y,
          S,
          R,
          _,
          I,
          P,
          E
        );
        return;
      } else if (b & 256) {
        We(
          d,
          m,
          y,
          S,
          R,
          _,
          I,
          P,
          E
        );
        return;
      }
    }
    A & 8 ? (h & 16 && at(d, R, _), m !== d && u(y, m)) : h & 16 ? A & 16 ? Et(
      d,
      m,
      y,
      S,
      R,
      _,
      I,
      P,
      E
    ) : at(d, R, _, !0) : (h & 8 && u(y, ""), A & 16 && j(
      m,
      y,
      S,
      R,
      _,
      I,
      P,
      E
    ));
  }, We = (f, p, y, S, R, _, I, P, E) => {
    f = f || Tt, p = p || Tt;
    const d = f.length, h = p.length, m = Math.min(d, h);
    let b;
    for (b = 0; b < m; b++) {
      const A = p[b] = E ? qe(p[b]) : Le(p[b]);
      x(
        f[b],
        A,
        y,
        null,
        R,
        _,
        I,
        P,
        E
      );
    }
    d > h ? at(
      f,
      R,
      _,
      !0,
      !1,
      m
    ) : j(
      p,
      y,
      S,
      R,
      _,
      I,
      P,
      E,
      m
    );
  }, Et = (f, p, y, S, R, _, I, P, E) => {
    let d = 0;
    const h = p.length;
    let m = f.length - 1, b = h - 1;
    for (; d <= m && d <= b; ) {
      const A = f[d], N = p[d] = E ? qe(p[d]) : Le(p[d]);
      if (Bt(A, N))
        x(
          A,
          N,
          y,
          null,
          R,
          _,
          I,
          P,
          E
        );
      else
        break;
      d++;
    }
    for (; d <= m && d <= b; ) {
      const A = f[m], N = p[b] = E ? qe(p[b]) : Le(p[b]);
      if (Bt(A, N))
        x(
          A,
          N,
          y,
          null,
          R,
          _,
          I,
          P,
          E
        );
      else
        break;
      m--, b--;
    }
    if (d > m) {
      if (d <= b) {
        const A = b + 1, N = A < h ? p[A].el : S;
        for (; d <= b; )
          x(
            null,
            p[d] = E ? qe(p[d]) : Le(p[d]),
            y,
            N,
            R,
            _,
            I,
            P,
            E
          ), d++;
      }
    } else if (d > b)
      for (; d <= m; )
        be(f[d], R, _, !0), d++;
    else {
      const A = d, N = d, Y = /* @__PURE__ */ new Map();
      for (d = N; d <= b; d++) {
        const Re = p[d] = E ? qe(p[d]) : Le(p[d]);
        Re.key != null && Y.set(Re.key, d);
      }
      let z, se = 0;
      const ce = b - N + 1;
      let Te = !1, De = 0;
      const Vt = new Array(ce);
      for (d = 0; d < ce; d++) Vt[d] = 0;
      for (d = A; d <= m; d++) {
        const Re = f[d];
        if (se >= ce) {
          be(Re, R, _, !0);
          continue;
        }
        let Fe;
        if (Re.key != null)
          Fe = Y.get(Re.key);
        else
          for (z = N; z <= b; z++)
            if (Vt[z - N] === 0 && Bt(Re, p[z])) {
              Fe = z;
              break;
            }
        Fe === void 0 ? be(Re, R, _, !0) : (Vt[Fe - N] = d + 1, Fe >= De ? De = Fe : Te = !0, x(
          Re,
          p[Fe],
          y,
          null,
          R,
          _,
          I,
          P,
          E
        ), se++);
      }
      const fo = Te ? Vc(Vt) : Tt;
      for (z = fo.length - 1, d = ce - 1; d >= 0; d--) {
        const Re = N + d, Fe = p[Re], po = p[Re + 1], go = Re + 1 < h ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          po.el || hi(po)
        ) : S;
        Vt[d] === 0 ? x(
          null,
          Fe,
          y,
          go,
          R,
          _,
          I,
          P,
          E
        ) : Te && (z < 0 || d !== fo[z] ? Pe(Fe, y, go, 2) : z--);
      }
    }
  }, Pe = (f, p, y, S, R = null) => {
    const { el: _, type: I, transition: P, children: E, shapeFlag: d } = f;
    if (d & 6) {
      Pe(f.component.subTree, p, y, S);
      return;
    }
    if (d & 128) {
      f.suspense.move(p, y, S);
      return;
    }
    if (d & 64) {
      I.move(f, p, y, ut);
      return;
    }
    if (I === xe) {
      r(_, p, y);
      for (let m = 0; m < E.length; m++)
        Pe(E[m], p, y, S);
      r(f.anchor, p, y);
      return;
    }
    if (I === yr) {
      F(f, p, y);
      return;
    }
    if (S !== 2 && d & 1 && P)
      if (S === 0)
        P.persisted && !_[pr] ? r(_, p, y) : (P.beforeEnter(_), r(_, p, y), _e(() => P.enter(_), R));
      else {
        const { leave: m, delayLeave: b, afterLeave: A } = P, N = () => {
          f.ctx.isUnmounted ? o(_) : r(_, p, y);
        }, Y = () => {
          const z = _._isLeaving || !!_[pr];
          _._isLeaving && _[pr](
            !0
            /* cancelled */
          ), P.persisted && !z ? N() : m(_, () => {
            N(), A && A();
          });
        };
        b ? b(_, N, Y) : Y();
      }
    else
      r(_, p, y);
  }, be = (f, p, y, S = !1, R = !1) => {
    const {
      type: _,
      props: I,
      ref: P,
      children: E,
      dynamicChildren: d,
      shapeFlag: h,
      patchFlag: m,
      dirs: b,
      cacheIndex: A,
      memo: N
    } = f;
    if (m === -2 && (R = !1), P != null && (Xe(), Xt(P, null, y, f, !0), Je()), A != null && (p.renderCache[A] = void 0), h & 256) {
      p.ctx.deactivate(f);
      return;
    }
    const Y = h & 1 && b, z = !Jt(f);
    let se;
    if (z && (se = I && I.onVnodeBeforeUnmount) && je(se, p, f), h & 6)
      ir(f.component, y, S);
    else {
      if (h & 128) {
        f.suspense.unmount(y, S);
        return;
      }
      Y && ft(f, null, p, "beforeUnmount"), h & 64 ? f.type.remove(
        f,
        p,
        y,
        ut,
        S
      ) : d && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !d.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (_ !== xe || m > 0 && m & 64) ? at(
        d,
        p,
        y,
        !1,
        !0
      ) : (_ === xe && m & 384 || !R && h & 16) && at(E, p, y), S && ct(f);
    }
    const ce = N != null && A == null;
    (z && (se = I && I.onVnodeUnmounted) || Y || ce) && _e(() => {
      se && je(se, p, f), Y && ft(f, null, p, "unmounted"), ce && (f.el = null);
    }, y);
  }, ct = (f) => {
    const { type: p, el: y, anchor: S, transition: R } = f;
    if (p === xe) {
      hn(y, S);
      return;
    }
    if (p === yr) {
      M(f);
      return;
    }
    const _ = () => {
      o(y), R && !R.persisted && R.afterLeave && R.afterLeave();
    };
    if (f.shapeFlag & 1 && R && !R.persisted) {
      const { leave: I, delayLeave: P } = R, E = () => I(y, _);
      P ? P(f.el, _, E) : E();
    } else
      _();
  }, hn = (f, p) => {
    let y;
    for (; f !== p; )
      y = v(f), o(f), f = y;
    o(p);
  }, ir = (f, p, y) => {
    const { bum: S, scope: R, job: _, subTree: I, um: P, m: E, a: d } = f;
    Io(E), Io(d), S && cr(S), R.stop(), _ && (_.flags |= 8, be(I, f, p, y)), P && _e(P, p), _e(() => {
      f.isUnmounted = !0;
    }, p);
  }, at = (f, p, y, S = !1, R = !1, _ = 0) => {
    for (let I = _; I < f.length; I++)
      be(f[I], p, y, S, R);
  }, nt = (f) => {
    if (f.shapeFlag & 6)
      return nt(f.component.subTree);
    if (f.shapeFlag & 128)
      return f.suspense.next();
    const p = v(f.anchor || f.el), y = p && p[sc];
    return y ? v(y) : p;
  };
  let Be = !1;
  const Pt = (f, p, y) => {
    let S;
    f == null ? p._vnode && (be(p._vnode, null, null, !0), S = p._vnode.component) : x(
      p._vnode || null,
      f,
      p,
      null,
      null,
      null,
      y
    ), p._vnode = f, Be || (Be = !0, bo(S), Ws(), Be = !1);
  }, ut = {
    p: x,
    um: be,
    m: Pe,
    r: ct,
    mt: ve,
    mc: j,
    pc: q,
    pbc: V,
    n: nt,
    o: e
  };
  return {
    render: Pt,
    hydrate: void 0,
    createApp: Cc(Pt)
  };
}
function mr({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function dt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Nc(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function pi(e, t, n = !1) {
  const r = e.children, o = t.children;
  if (L(r) && L(o))
    for (let s = 0; s < r.length; s++) {
      const i = r[s];
      let l = o[s];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = o[s] = qe(o[s]), l.el = i.el), !n && l.patchFlag !== -2 && pi(i, l)), l.type === Jn && (l.patchFlag === -1 && (l = o[s] = qe(l)), l.el = i.el), l.type === Qe && !l.el && (l.el = i.el);
    }
}
function Vc(e) {
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
function Wc(e, t) {
  t && t.pendingBranch ? L(e) ? t.effects.push(...e) : t.effects.push(e) : Ql(e);
}
const xe = /* @__PURE__ */ Symbol.for("v-fgt"), Jn = /* @__PURE__ */ Symbol.for("v-txt"), Qe = /* @__PURE__ */ Symbol.for("v-cmt"), yr = /* @__PURE__ */ Symbol.for("v-stc"), vt = [];
let Ce = null;
function ue(e = !1) {
  vt.push(Ce = e ? null : []);
}
function yi() {
  vt.pop(), Ce = vt[vt.length - 1] || null;
}
let rn = 1;
function Ao(e, t = !1) {
  rn += e, e < 0 && Ce && t && (Ce.hasOnce = !0);
}
function vi(e) {
  return e.dynamicChildren = rn > 0 ? Ce || Tt : null, yi(), rn > 0 && Ce && Ce.push(e), e;
}
function ge(e, t, n, r, o, s) {
  return vi(
    gt(
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
function Bc(e, t, n, r, o) {
  return vi(
    ze(
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
function Bt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const bi = ({ key: e }) => e ?? null, En = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? oe(e) || /* @__PURE__ */ de(e) || $(e) ? { i: $e, r: e, k: t, f: !!n } : e : null);
function gt(e, t = null, n = null, r = 0, o = null, s = e === xe ? 0 : 1, i = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && bi(t),
    ref: t && En(t),
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
    ctx: $e
  };
  return l ? (jn(c, n), s & 128 && e.normalize(c)) : n && (c.shapeFlag |= oe(n) ? 8 : 16), rn > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  Ce && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && Ce.push(c), c;
}
const ze = Uc;
function Uc(e, t = null, n = null, r = 0, o = null, s = !1) {
  if ((!e || e === yc) && (e = Qe), wi(e)) {
    const l = Lt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && jn(l, n), rn > 0 && !s && Ce && (l.shapeFlag & 6 ? Ce[Ce.indexOf(e)] = l : Ce.push(l)), l.patchFlag = -2, l;
  }
  if (ra(e) && (e = e.__vccOpts), t) {
    t = Gc(t);
    let { class: l, style: c } = t;
    l && !oe(l) && (t.class = ht(l)), X(c) && (/* @__PURE__ */ Qr(c) && !L(c) && (c = pe({}, c)), t.style = Dt(c));
  }
  const i = oe(e) ? 1 : mi(e) ? 128 : Yn(e) ? 64 : X(e) ? 4 : $(e) ? 2 : 0;
  return gt(
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
  return e ? /* @__PURE__ */ Qr(e) || li(e) ? pe({}, e) : e : null;
}
function Lt(e, t, n = !1, r = !1) {
  const { props: o, ref: s, patchFlag: i, children: l, transition: c } = e, a = t ? Yc(o || {}, t) : o, u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: a,
    key: a && bi(a),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && s ? L(s) ? s.concat(En(t)) : [s, En(t)] : En(t)
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
    patchFlag: t && e.type !== xe ? i === -1 ? 16 : i | 16 : i,
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
    ssContent: e.ssContent && Lt(e.ssContent),
    ssFallback: e.ssFallback && Lt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && r && to(
    u,
    c.clone(u)
  ), u;
}
function qc(e = " ", t = 0) {
  return ze(Jn, null, e, t);
}
function bn(e = "", t = !1) {
  return t ? (ue(), Bc(Qe, null, e)) : ze(Qe, null, e);
}
function Le(e) {
  return e == null || typeof e == "boolean" ? ze(Qe) : L(e) ? ze(
    xe,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : wi(e) ? qe(e) : ze(Jn, null, String(e));
}
function qe(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Lt(e);
}
function jn(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (L(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), jn(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !li(t) ? t._ctx = $e : o === 3 && $e && ($e.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if ($(t)) {
    if (r & 65) {
      jn(e, { default: t });
      return;
    }
    t = { default: t, _ctx: $e }, n = 32;
  } else
    t = String(t), r & 64 ? (n = 16, t = [qc(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function Yc(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === "class")
        t.class !== r.class && (t.class = ht([t.class, r.class]));
      else if (o === "style")
        t.style = Dt([t.style, r.style]);
      else if ($n(o)) {
        const s = t[o], i = r[o];
        i && s !== i && !(L(s) && s.includes(i)) ? t[o] = s ? [].concat(s, i) : i : i == null && s == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !Nn(o) && (t[o] = i);
      } else o !== "" && (t[o] = r[o]);
  }
  return t;
}
function je(e, t, n, r = null) {
  Ae(e, t, 7, [
    n,
    r
  ]);
}
const zc = ni();
let Xc = 0;
function Jc(e, t, n) {
  const r = e.type, o = (t ? t.appContext : e.appContext) || zc, s = {
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
    scope: new Rl(
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
    propsDefaults: ee,
    // inheritAttrs
    inheritAttrs: r.inheritAttrs,
    // state
    ctx: ee,
    data: ee,
    props: ee,
    attrs: ee,
    slots: ee,
    refs: ee,
    setupState: ee,
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
let ye = null;
const Zc = () => ye || $e;
let Hn, on;
{
  const e = Wn(), t = (n, r) => {
    let o;
    return (o = e[n]) || (o = e[n] = []), o.push(r), (s) => {
      o.length > 1 ? o.forEach((i) => i(s)) : o[0](s);
    };
  };
  Hn = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => ye = n
  ), on = t(
    "__VUE_SSR_SETTERS__",
    (n) => sn = n
  );
}
const fn = (e) => {
  const t = ye;
  return Hn(e), e.scope.on(), () => {
    e.scope.off(), Hn(t);
  };
}, To = () => {
  ye && ye.scope.off(), Hn(null);
};
function _i(e) {
  return e.vnode.shapeFlag & 4;
}
let sn = !1;
function Qc(e, t = !1, n = !1) {
  t && on(t);
  const { props: r, children: o } = e.vnode, s = _i(e);
  Dc(e, r, s, t), kc(e, o, n || t);
  const i = s ? ea(e, t) : void 0;
  return t && on(!1), i;
}
function ea(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, vc);
  const { setup: r } = n;
  if (r) {
    Xe();
    const o = e.setupContext = r.length > 1 ? na(e) : null, s = fn(e), i = un(
      r,
      e,
      0,
      [
        e.props,
        o
      ]
    ), l = hs(i);
    if (Je(), s(), (l || e.sp) && !Jt(e) && zs(e), l) {
      if (i.then(To, To), t)
        return i.then((c) => {
          on(!0);
          try {
            Do(e, c, t);
          } finally {
            on(!1);
          }
        }).catch((c) => {
          qn(c, e, 0);
        });
      e.asyncDep = i;
    } else
      Do(e, i);
  } else
    Si(e);
}
function Do(e, t, n) {
  $(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : X(t) && (e.setupState = Ks(t)), Si(e);
}
function Si(e, t, n) {
  const r = e.type;
  e.render || (e.render = r.render || Ne);
  {
    const o = fn(e);
    Xe();
    try {
      wc(e);
    } finally {
      Je(), o();
    }
  }
}
const ta = {
  get(e, t) {
    return fe(e, "get", ""), e[t];
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
function so(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Ks(Wl(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in Zt)
        return Zt[n](e);
    },
    has(t, n) {
      return n in t || n in Zt;
    }
  })) : e.proxy;
}
function ra(e) {
  return $(e) && "__vccOpts" in e;
}
const le = (e, t) => /* @__PURE__ */ Yl(e, t, sn), oa = "3.5.42";
/**
* @vue/runtime-dom v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Hr;
const Fo = typeof window < "u" && window.trustedTypes;
if (Fo)
  try {
    Hr = /* @__PURE__ */ Fo.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Ri = Hr ? (e) => Hr.createHTML(e) : (e) => e, sa = "http://www.w3.org/2000/svg", ia = "http://www.w3.org/1998/Math/MathML", Ge = typeof document < "u" ? document : null, jo = Ge && /* @__PURE__ */ Ge.createElement("template"), la = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const o = t === "svg" ? Ge.createElementNS(sa, e) : t === "mathml" ? Ge.createElementNS(ia, e) : n ? Ge.createElement(e, { is: n }) : Ge.createElement(e);
    return e === "select" && r && r.multiple != null && o.setAttribute("multiple", r.multiple), o;
  },
  createText: (e) => Ge.createTextNode(e),
  createComment: (e) => Ge.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Ge.querySelector(e),
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
      jo.innerHTML = Ri(
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
  const r = e.style, o = oe(n);
  let s = !1;
  if (n && !o) {
    if (t)
      if (oe(t))
        for (const i of t.split(";")) {
          const l = i.slice(0, i.indexOf(":")).trim();
          n[l] == null && Gt(r, l, "");
        }
      else
        for (const i in t)
          n[i] == null && Gt(r, i, "");
    for (const i in n) {
      i === "display" && (s = !0);
      const l = n[i];
      l != null ? ha(
        e,
        i,
        !oe(t) && t ? t[i] : void 0,
        l
      ) || Gt(r, i, l) : Gt(r, i, "");
    }
  } else if (o) {
    if (t !== n) {
      const i = r[fa];
      i && (n += ";" + i), r.cssText = n, s = da.test(n);
    }
  } else t && e.removeAttribute("style");
  Ho in e && (e[Ho] = s ? r.display : "", e[ua] && (r.display = "none"));
}
const _n = /\s*!important$/;
function Gt(e, t, n) {
  if (L(n))
    n.forEach((r) => Gt(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--"))
    _n.test(n) ? e.setProperty(t, n.replace(_n, ""), "important") : e.setProperty(t, n);
  else {
    const r = ga(e, t);
    _n.test(n) ? e.setProperty(
      Rt(r),
      n.replace(_n, ""),
      "important"
    ) : e[r] = n;
  }
}
const ko = ["Webkit", "Moz", "ms"], vr = {};
function ga(e, t) {
  const n = vr[t];
  if (n)
    return n;
  let r = Oe(t);
  if (r !== "filter" && r in e)
    return vr[t] = r;
  r = vs(r);
  for (let o = 0; o < ko.length; o++) {
    const s = ko[o] + r;
    if (s in e)
      return vr[t] = s;
  }
  return t;
}
function ha(e, t, n, r) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && oe(r) && n === r;
}
const Lo = "http://www.w3.org/1999/xlink";
function Ko(e, t, n, r, o, s = _l(t)) {
  r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Lo, t.slice(6, t.length)) : e.setAttributeNS(Lo, t, n) : n == null || s && !bs(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    s ? "" : Ve(n) ? String(n) : n
  );
}
function $o(e, t, n, r, o) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Ri(n) : n);
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
const No = /* @__PURE__ */ Symbol("_vei");
function va(e, t, n, r, o = null) {
  const s = e[No] || (e[No] = {}), i = s[t];
  if (r && i)
    i.value = r;
  else {
    const [l, c] = _a(t);
    if (r) {
      const a = s[t] = xa(
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
  return [e[2] === ":" ? e.slice(3) : Rt(e.slice(2)), t];
}
let wr = 0;
const Sa = /* @__PURE__ */ Promise.resolve(), Ra = () => wr || (Sa.then(() => wr = 0), wr = Date.now());
function xa(e, t) {
  const n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    const o = n.value;
    if (L(o)) {
      const s = r.stopImmediatePropagation;
      r.stopImmediatePropagation = () => {
        s.call(r), r._stopped = !0;
      };
      const i = o.slice(), l = [r];
      for (let c = 0; c < i.length && !r._stopped; c++) {
        const a = i[c];
        a && Ae(
          a,
          t,
          5,
          l
        );
      }
    } else
      Ae(
        o,
        t,
        5,
        [r]
      );
  };
  return n.value = e, n.attached = Ra(), n;
}
const Vo = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Ca = (e, t, n, r, o, s) => {
  const i = o === "svg";
  t === "class" ? aa(e, r, i) : t === "style" ? pa(e, n, r) : $n(t) ? Nn(t) || va(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Ea(e, t, r, i)) ? ($o(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Ko(e, t, r, i, s, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Pa(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !oe(r))) ? $o(e, Oe(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), Ko(e, t, r, i));
};
function Ea(e, t, n, r) {
  if (r)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Vo(t) && $(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return Vo(t) && oe(n) ? !1 : t in e;
}
function Pa(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const r = Oe(t);
  return Array.isArray(n) ? n.some((o) => Oe(o) === r) : Object.keys(n).some((o) => Oe(o) === r);
}
const Oa = ["ctrl", "shift", "alt", "meta"], Ma = {
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
  exact: (e, t) => Oa.some((n) => e[`${n}Key`] && !t.includes(n))
}, Wo = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), r = t.join(".");
  return n[r] || (n[r] = (o, ...s) => {
    for (let i = 0; i < t.length; i++) {
      const l = Ma[t[i]];
      if (l && l(o, t)) return;
    }
    return e(o, ...s);
  });
}, Ia = /* @__PURE__ */ pe({ patchProp: Ca }, la);
let Bo;
function Aa() {
  return Bo || (Bo = Kc(Ia));
}
const Ta = (...e) => {
  const t = Aa().createApp(...e), { mount: n } = t;
  return t.mount = (r) => {
    const o = Fa(r);
    if (!o) return;
    const s = t._component;
    !$(s) && !s.render && !s.template && (s.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
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
  return oe(e) ? document.querySelector(e) : e;
}
function Sn() {
  return !0;
}
const ja = Symbol("merge-proxy"), Pn = Symbol("merge-proxy-sources"), Ha = {
  get(e, t, n) {
    return t === ja ? n : t === Pn ? e.sources : e.get(t);
  },
  has(e, t) {
    return e.has(t);
  },
  set: Sn,
  deleteProperty: Sn,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: Sn,
      deleteProperty: Sn
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function On(e) {
  return e && typeof e == "object" && "value" in e ? e.value : e;
}
function kr(...e) {
  const t = e.flatMap((n) => typeof n == "object" && n !== null && Pn in n && Array.isArray(n[Pn]) ? n[Pn] : [n]);
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
function xi(e) {
  return typeof e == "function" ? e : (t) => {
    var n;
    return (n = e.next) == null ? void 0 : n.call(e, t);
  };
}
function ka(e) {
  return Object.assign(e, {
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: Se(e, xi(t), { flush: "sync" }) })
  });
}
function La(e) {
  return Object.assign(e, {
    set: (t) => {
      e.value = typeof t == "function" ? t(e.value) : t;
    },
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: Se(e, xi(t), { flush: "sync" }) })
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
    createReadonlyAtom: (t, n) => ka(le(() => t())),
    createWritableAtom: (t, n) => La(/* @__PURE__ */ Bl(t)),
    untrack: (t) => t(),
    batch: (t) => t()
  };
}
function Zn(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function lt(e) {
  if (Array.isArray(e)) return e.map(lt);
  if (e && typeof e == "object") {
    const t = Object.getPrototypeOf(e);
    if (t !== Object.prototype && t !== null) return e;
    const n = t === null ? J() : {}, r = Object.keys(e);
    for (let o = 0; o < r.length; o++) {
      const s = r[o];
      Object.defineProperty(n, s, {
        configurable: !0,
        enumerable: !0,
        value: lt(e[s]),
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
function J() {
  return /* @__PURE__ */ Object.create(null);
}
function Kt(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Ci(e, t) {
  return (n) => {
    var r;
    (((r = t.options.atoms) == null ? void 0 : r[e]) ?? t.baseAtoms[e]).set((o) => Zn(n, o));
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
const Na = 3;
function Va(e, t) {
  return Ei(e, t, Na);
}
function Ei(e, t, n) {
  if (Object.is(e, t)) return !0;
  if (n <= 0 || !Go(e) || !Go(t) || (Array.isArray(e) || Array.isArray(t)) && (!Array.isArray(e) || !Array.isArray(t) || e.length !== t.length))
    return !1;
  const r = qo(e), o = qo(t);
  if (r.length !== o.length) return !1;
  const s = e, i = t;
  for (let l = 0; l < r.length; l++) {
    const c = r[l];
    if (!Object.prototype.propertyIsEnumerable.call(t, c) || !Ei(s[c], i[c], n - 1)) return !1;
  }
  return !0;
}
function Qn(e, t, n, r = Va) {
  const o = `on${t.charAt(0).toUpperCase()}${t.slice(1)}Change`, s = e.options[o];
  s && s((i) => {
    const l = Zn(n, i);
    return r(i, l) ? i : l;
  });
}
function Wa(e, t) {
  const n = [], r = (o) => {
    o.forEach((s) => {
      n.push(s);
      const i = t(s);
      i.length && r(i);
    });
  };
  return r(e), n;
}
const Ba = ({ fn: e, memoDeps: t, onAfterCompare: n, onAfterUpdate: r, onBeforeCompare: o, onBeforeUpdate: s }) => {
  let i = [], l;
  return (a) => {
    o == null || o();
    const u = t == null ? void 0 : t(a);
    let g = !u || u.length !== (i == null ? void 0 : i.length);
    if (!g && u) {
      for (let v = 0; v < u.length; v++) if (u[v] !== i[v]) {
        g = !0;
        break;
      }
    }
    return n == null || n(g), g && (i = u, s == null || s(), l = e(...u ?? []), r == null || r(l)), l;
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
function er({ feature: e, fnName: t, objectId: n, onAfterUpdate: r, table: o, ...s }) {
  const i = () => {
    if (!r) return;
    const { schedule: c, untrack: a } = o._reactivity;
    c(() => a(() => r()));
  };
  return Ba({
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
function xt(e, t, n) {
  for (const [r, { fn: o, memoDeps: s }] of Object.entries(n)) {
    const { fnKey: i, fnName: l } = Pi(r);
    t[i] = s ? er({
      memoDeps: s,
      fn: o,
      fnName: l,
      table: t,
      feature: e
    }) : o;
  }
}
function $t(e, t, n, r) {
  for (const [o, { fn: s, memoDeps: i }] of Object.entries(r)) {
    const { fnKey: l, fnName: c } = Pi(o);
    if (i) {
      const a = `_memo_${l}`;
      t[l] = function(...u) {
        if (!this[a]) {
          const g = this;
          this[a] = er({
            memoDeps: (v) => i(g, v),
            fn: (...v) => s(g, ...v),
            fnName: c,
            objectId: g.id,
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
function ae(e, t, n, ...r) {
  var o;
  return ((o = e[t]) == null ? void 0 : o.call(e, ...r)) ?? n(e, ...r);
}
function Ga(e) {
  return e.row.getValue(e.column.id);
}
function qa(e) {
  return e.getValue() ?? e.table.options.renderFallbackValue;
}
function Ya(e) {
  return {
    table: e.table,
    column: e.column,
    row: e.row,
    cell: e,
    getValue: () => e.getValue(),
    renderValue: () => e.renderValue()
  };
}
const za = { assignCellPrototype: (e, t) => {
  $t("coreCellsFeature", e, t, {
    cell_getValue: { fn: (n) => Ga(n) },
    cell_renderValue: { fn: (n) => qa(n) },
    cell_getContext: {
      fn: (n) => Ya(n),
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
function Oi(e, t, n) {
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
function bt(e) {
  var r;
  const t = (r = e.table.atoms.columnVisibility) == null ? void 0 : r.get();
  if (!t) return !0;
  const n = e.columns;
  return n.length ? n.some((o) => ae(o, "getIsVisible", bt)) : (Kt(t, e.id) ? t[e.id] : void 0) ?? !0;
}
function Za(e) {
  return e.getAllLeafColumns().filter((t) => ae(t, "getIsVisible", bt));
}
function Mi(e, t = 1) {
  let n = t;
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    ae(o, "getIsVisible", bt) && o.columns.length && (n = Math.max(n, Mi(o.columns, t + 1)));
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
    const a = e[c], u = l[l.length - 1], g = a.column.depth === i.depth;
    let v, w = !1;
    if (g && a.column.parent ? v = a.column.parent : (v = a.column, w = !0), u && u.column === v) u.subHeaders.push(a);
    else {
      const O = Oi(n, v, {
        id: eu(r, t, v.id, a.id),
        isPlaceholder: w,
        placeholderId: w ? String(tu(l, v)) : void 0,
        depth: t,
        index: l.length
      });
      O.subHeaders.push(a), l.push(O);
    }
    i.headers.push(a), a.headerGroup = i;
  }
  for (let c = 0; c < s.length; c++) s[c](i);
  o.push(i), t > 0 && Ii(l, t - 1, n, r, o, s);
}
function Ai(e) {
  for (let t = 0; t < e.length; t++) {
    const n = e[t];
    if (!ae(n.column, "getIsVisible", bt)) continue;
    let r = 0;
    if (n.subHeaders.length) {
      Ai(n.subHeaders);
      for (let o = 0; o < n.subHeaders.length; o++) {
        const s = n.subHeaders[o];
        ae(s.column, "getIsVisible", bt) && (r += s.colSpan);
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
function Yo(e, t, n, r) {
  var c;
  const o = Mi(e), s = [], i = n._headerGroupInstanceInitFns, l = new Array(t.length);
  for (let a = 0; a < t.length; a++)
    a in t && (l[a] = Oi(n, t[a], {
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
    const v = s.split(".");
    c = (w) => {
      let O = w;
      for (let x = 0; x < v.length; x++) {
        const D = v[x];
        O = O == null ? void 0 : O[D];
      }
      return O;
    };
  } else c = (v) => v[o.accessorKey];
  if (!l)
    throw new Error();
  const a = nu(e), u = Object.create(a);
  u.accessorFn = c, u.columnDef = o, u.columns = [], u.depth = n, u.id = `${String(l)}`, u.parent = r;
  const g = e._columnInstanceInitFns;
  for (let v = 0; v < g.length; v++) g[v](u);
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
    return ae(e.table, "getOrderColumns", Ti)(t);
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
  const t = J(), n = e.getAllFlatColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function fu(e) {
  const t = e.getAllColumns().flatMap((n) => n.getLeafColumns());
  return ae(e, "getOrderColumns", Ti)(t);
}
function du(e) {
  const t = J(), n = e.getAllLeafColumns();
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
    $t("coreColumnsFeature", e, t, {
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
    xt("coreColumnsFeature", e, {
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
  const { start: t, end: n } = ((a = e.atoms.columnPinning) == null ? void 0 : a.get()) ?? Ja(), r = e.getAllColumns(), o = ae(e, "getVisibleLeafColumns", Za);
  if (!t.length && !n.length) return Yo(r, o, e);
  const s = e.getAllLeafColumnsById(), i = [];
  for (let u = 0; u < t.length; u++) {
    const g = s[t[u]];
    g && ae(g, "getIsVisible", bt) && i.push(g);
  }
  const l = [];
  for (let u = 0; u < n.length; u++) {
    const g = s[n[u]];
    g && ae(g, "getIsVisible", bt) && l.push(g);
  }
  const c = o.filter((u) => !t.includes(u.id) && !n.includes(u.id));
  return Yo(r, [
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
    $t("coreHeadersFeature", e, t, {
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
    xt("coreHeadersFeature", e, {
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
const Ru = (e, t, n, r, o, s, i) => {
  const l = Su(e), c = Object.create(l);
  c._displayIndexCache = -1, c._uniqueValuesCache = J(), c._valuesCache = J(), c.depth = o, c.id = t, c.index = r, c.original = n, c.parentId = i, c.subRows = [];
  const a = e._rowInstanceInitFns;
  for (let u = 0; u < a.length; u++) a[u](c);
  return c;
};
function xu() {
  return [];
}
function Cu(e, t) {
  Qn(e, "cellSelection", lt(e.initialState.cellSelection) ?? xu());
}
function Eu(e) {
  e.atoms.cellSelection && (e.options.autoResetAll ?? e.options.autoResetCellSelection ?? !0) && e._reactivity.schedule(() => Cu(e));
}
function Pu() {
  return J();
}
function ji(e) {
  e.atoms.expanded && (e.options.autoResetAll ?? e.options.autoResetExpanded ?? !e.options.manualExpanding) && e._reactivity.schedule(() => ki(e));
}
function kn(e, t) {
  var n, r;
  (r = (n = e.options).onExpandedChange) == null || r.call(n, t);
}
function Hi(e, t) {
  var r;
  const n = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t ?? !Ki(e)) {
    if (n === !0 || !Li(e)) return;
    kn(e, !0);
  } else {
    if (n !== !0 && !Object.keys(n).length) return;
    kn(e, J());
  }
}
function ki(e, t) {
  const n = e.initialState.expanded;
  Qn(e, "expanded", t ? J() : n === !0 ? !0 : Object.assign(J(), lt(n ?? {})));
}
function Li(e) {
  return e.getPrePaginatedRowModel().flatRows.some((t) => _t(t));
}
function Ou(e) {
  return (t) => {
    Hi(e);
  };
}
function Mu(e) {
  var n;
  const t = ((n = e.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return t === !0 || Object.values(t).some(Boolean);
}
function Ki(e) {
  var r;
  const t = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t === !0) return !0;
  if (!Object.keys(t).length) return !1;
  const n = e.getRowModel().flatRows.filter((o) => _t(o));
  return !(!n.length || n.some((o) => !tr(o)));
}
function Iu(e) {
  var r;
  let t = 0;
  const n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return (n === !0 ? Object.values(e.getRowModel().rowsById).filter((o) => _t(o)).map((o) => o.id) : Object.keys(n ?? {})).forEach((o) => {
    const s = o.split(".");
    t = Math.max(t, s.length);
  }), t;
}
function $i(e, t) {
  var s;
  const n = ((s = e.table.atoms.expanded) == null ? void 0 : s.get()) ?? {}, r = n === !0 || Lr(n, e.id), o = t ?? !r;
  o !== r && (o && !_t(e) || kn(e.table, (i) => {
    const l = i === !0 ? !0 : Lr(i, e.id);
    let c = J();
    if (i === !0 ? Object.values(e.table.getRowModel().rowsById).forEach((a) => {
      _t(a) && (c[a.id] = !0);
    }) : c = Object.assign(J(), i), !l && o)
      return c[e.id] = !0, c;
    if (l && !o) {
      const a = J(), u = Object.keys(c);
      for (let g = 0; g < u.length; g++) {
        const v = u[g];
        v !== e.id && c[v] && (a[v] = !0);
      }
      return a;
    }
    return i;
  }));
}
function tr(e) {
  var n, r, o;
  const t = ((n = e.table.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return !!(((o = (r = e.table.options).getIsRowExpanded) == null ? void 0 : o.call(r, e)) ?? (t === !0 || Lr(t, e.id)));
}
function Lr(e, t) {
  return !!(e && e !== !0 && Kt(e, t) && e[t]);
}
function _t(e) {
  var t, n;
  return ((n = (t = e.table.options).getRowCanExpand) == null ? void 0 : n.call(t, e)) ?? ((e.table.options.enableExpanding ?? !0) && !!e.subRows.length);
}
function Au(e) {
  let t = !0, n = e;
  for (; t && n.parentId; )
    n = e.table.getRow(n.parentId, !0), t = tr(n);
  return t;
}
function Tu(e) {
  const t = _t(e);
  return () => {
    t && $i(e);
  };
}
const Kr = 0;
function Du(e) {
  var t, n;
  if (e.options.autoResetAll ?? e.options.autoResetPageIndex ?? !e.options.manualPagination) {
    if ((((n = (t = e.atoms.pagination) == null ? void 0 : t.get()) == null ? void 0 : n.pageIndex) ?? Kr) === Kr) return;
    Hu(e);
  }
}
function Fu(e, t) {
  Qn(e, "pagination", t);
}
function ju(e, t) {
  Fu(e, (n) => {
    let r = Zn(t, n.pageIndex);
    const o = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
    return r = Math.max(0, Math.min(r, o)), {
      ...n,
      pageIndex: r
    };
  });
}
function Hu(e, t) {
  ju(e, Kr);
}
function ku(e, t) {
  Qn(e, "sorting", t);
}
function Lu(e, t) {
  ku(e, lt(e.initialState.sorting ?? []));
}
function Ku(e) {
  e.atoms.sorting && (e.options.autoResetAll ?? e.options.autoResetSorting ?? !1) && Lu(e);
}
function Ni() {
  return (e) => er({
    feature: "coreRowModelsFeature",
    table: e,
    fnName: "table.getCoreRowModel",
    memoDeps: () => [e.options.data],
    fn: () => $u(e, e.options.data),
    onAfterUpdate: Ua(() => {
      ji(e), Du(e), Ku(e), Eu(e);
    })
  });
}
function Vi(e, t, n, r = 0, o) {
  var i;
  const s = [];
  for (let l = 0; l < n.length; l++) {
    const c = n[l], a = Ru(e, e.getRowId(c, l, o), c, l, r, void 0, o == null ? void 0 : o.id);
    t.flatRows.push(a), t.rowsById[a.id] = a, s.push(a), e.options.getSubRows && (a.originalSubRows = e.options.getSubRows(c, l), (i = a.originalSubRows) != null && i.length && (a.subRows = Vi(e, t, a.originalSubRows, r + 1, a)));
  }
  return s;
}
function $u(e, t) {
  const n = {
    rows: [],
    flatRows: [],
    rowsById: J()
  };
  return n.rows = Vi(e, n, t), n;
}
function Nu(e) {
  var t, n;
  return e._rowModels.coreRowModel || (e._rowModels.coreRowModel = ((n = (t = e.options.features).coreRowModel) == null ? void 0 : n.call(t, e)) ?? Ni()(e)), e._rowModels.coreRowModel();
}
function Vu(e) {
  return e.getCoreRowModel();
}
function Wu(e) {
  var t, n;
  return e._rowModels.filteredRowModel || (e._rowModels.filteredRowModel = (n = (t = e.options.features).filteredRowModel) == null ? void 0 : n.call(t, e)), e.options.manualFiltering || !e._rowModels.filteredRowModel ? e.getPreFilteredRowModel() : e._rowModels.filteredRowModel();
}
function Bu(e) {
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
function Yu(e) {
  return e.getSortedRowModel();
}
function zu(e) {
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
  xt("coreRowModelsFeature", e, {
    table_getCoreRowModel: { fn: () => Nu(e) },
    table_getPreFilteredRowModel: { fn: () => Vu(e) },
    table_getFilteredRowModel: { fn: () => Wu(e) },
    table_getPreGroupedRowModel: { fn: () => Bu(e) },
    table_getGroupedRowModel: { fn: () => Uu(e) },
    table_getPreSortedRowModel: { fn: () => Gu(e) },
    table_getSortedRowModel: { fn: () => qu(e) },
    table_getPreExpandedRowModel: { fn: () => Yu(e) },
    table_getExpandedRowModel: { fn: () => zu(e) },
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
  if (Kt(e._valuesCache, t)) return e._valuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return e._valuesCache[t] = n.accessorFn(e.original, e.index), e._valuesCache[t];
}
function sf(e, t) {
  if (Kt(e._uniqueValuesCache, t)) return e._uniqueValuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return n.columnDef.getUniqueValues ? (e._uniqueValuesCache[t] = n.columnDef.getUniqueValues(e.original, e.index), e._uniqueValuesCache[t]) : (e._uniqueValuesCache[t] = [e.getValue(t)], e._uniqueValuesCache[t]);
}
function lf(e, t) {
  return e.getValue(t) ?? e.table.options.renderFallbackValue;
}
function cf(e) {
  return Wa(e.subRows, (t) => t.subRows);
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
  const t = J(), n = e.getAllCells();
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
    $t("coreRowsFeature", e, t, {
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
    xt("coreRowsFeature", e, {
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
function Wi(e, t, n = (r, o) => r === o) {
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
    Wi(e, t, n), (o = (r = e._reactivity).commit) == null || o.call(r);
  });
}
function vf(e) {
  var r, o;
  const t = lt(e.initialState);
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
  const r = wf(e, Zn(t, e.options));
  e.optionsStore ? e.optionsStore.set(() => r) : e.options = r, yf(e, r.state ?? null);
}
const _f = { constructTableAPIs: (e) => {
  xt("coreTablesFeature", e, {
    table_reset: { fn: () => vf(e) },
    table_setOptions: { fn: (t) => bf(e, t) }
  });
} }, Sf = {
  coreCellsFeature: za,
  coreColumnsFeature: gu,
  coreHeadersFeature: _u,
  coreRowModelsFeature: Qu,
  coreRowsFeature: mf,
  coreTablesFeature: _f
};
function Rf(e) {
  const t = e;
  return Object.defineProperty(e, "state", { get() {
    return e.get();
  } }), "set" in e && (t.setState = e.set.bind(e)), t;
}
function xf(e, t) {
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
  const n = zo(e);
  if (n.length !== zo(t).length) return !1;
  for (let r = 0; r < n.length; r++) if (!Object.prototype.hasOwnProperty.call(t, n[r]) || !Object.is(e[n[r]], t[n[r]])) return !1;
  return !0;
}
function zo(e) {
  return Object.keys(e).concat(Object.getOwnPropertySymbols(e));
}
function Cf(e, t = {}) {
  return Object.values(e).forEach((n) => {
    var r;
    t = ((r = n.getInitialState) == null ? void 0 : r.call(n, t)) ?? t;
  }), lt(t);
}
function Ef(e) {
  var k, ne;
  const t = e.features.coreReactivityFeature, { aggregationFns: n, columnMeta: r, coreRowModel: o, expandedRowModel: s, facetedMinMaxValues: i, facetedRowModel: l, facetedUniqueValues: c, filterFns: a, filterMeta: u, filteredRowModel: g, groupedRowModel: v, paginatedRowModel: w, sortFns: O, sortedRowModel: x, tableMeta: D, ...H } = e.features, C = {
    _cellInstanceInitFns: [],
    _columnInstanceInitFns: [],
    _features: {
      ...Sf,
      ...H
    },
    _headerGroupInstanceInitFns: [],
    _headerInstanceInitFns: [],
    _reactivity: t,
    _rowInstanceInitFns: [],
    _rowModelFns: {
      aggregationFns: n,
      filterFns: a,
      sortFns: O
    },
    _rowModels: {},
    atoms: {},
    baseAtoms: {}
  }, F = Object.values(C._features), M = {
    ...F.reduce((j, T) => {
      var V;
      return Object.assign(j, (V = T.getDefaultTableOptions) == null ? void 0 : V.call(T, C));
    }, {}),
    ...e
  };
  if (t.wrapExternalAtoms && M.atoms) for (const [j, T] of Object.entries(M.atoms)) {
    const V = T, te = t.createWritableAtom(V.get(), { debugName: `externalAtom/${j}` });
    M.atoms[j] = te;
    let B = !1;
    const re = V.subscribe((we) => {
      B || te.set(we);
    }), ve = te.subscribe((we) => {
      B = !0, V.set(we), B = !1;
    });
    t.addSubscription(re), t.addSubscription(ve);
  }
  t.createOptionsStore ? (C.optionsStore = t.createWritableAtom(M, { debugName: "table/optionsStore" }), Object.defineProperty(C, "options", {
    configurable: !0,
    enumerable: !0,
    get() {
      return C.optionsStore.get();
    },
    set(j) {
      C.optionsStore.set(() => j);
    }
  })) : C.options = M, C.initialState = Cf(C._features, C.options.initialState);
  const K = Object.keys(C.initialState);
  for (let j = 0; j < K.length; j++) {
    const T = K[j];
    C.baseAtoms[T] = t.createWritableAtom(C.initialState[T], { debugName: `table/baseAtoms/${T}` }), C.atoms[T] = t.createReadonlyAtom(() => {
      var ve;
      const V = C.options, te = (ve = V.atoms) == null ? void 0 : ve[T], B = te ? te.get() : C.baseAtoms[T].get();
      if (te) return B;
      const re = V.state;
      if (re && Kt(re, T)) {
        const we = re[T];
        return we === void 0 ? C.initialState[T] : we;
      }
      return B;
    }, { debugName: `table/atoms/${T}` });
  }
  Wi(C), C.store = Rf(t.createReadonlyAtom(() => {
    const j = {};
    for (let T = 0; T < K.length; T++) {
      const V = K[T];
      j[V] = C.atoms[V].get();
    }
    return j;
  }, {
    compare: xf,
    debugName: "table/store"
  }));
  for (let j = 0; j < F.length; j++) {
    const T = F[j];
    (k = T.initTableInstanceData) == null || k.call(T, C), T.initCellInstanceData && C._cellInstanceInitFns.push(T.initCellInstanceData.bind(T)), T.initColumnInstanceData && C._columnInstanceInitFns.push(T.initColumnInstanceData.bind(T)), T.initHeaderGroupInstanceData && C._headerGroupInstanceInitFns.push(T.initHeaderGroupInstanceData.bind(T)), T.initHeaderInstanceData && C._headerInstanceInitFns.push(T.initHeaderInstanceData.bind(T)), T.initRowInstanceData && C._rowInstanceInitFns.push(T.initRowInstanceData.bind(T)), (ne = T.constructTableAPIs) == null || ne.call(T, C);
  }
  return C;
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
    $t("rowExpandingFeature", e, t, {
      row_toggleExpanded: { fn: (n, r) => $i(n, r) },
      row_getIsExpanded: { fn: (n) => tr(n) },
      row_getCanExpand: { fn: (n) => _t(n) },
      row_getIsAllParentsExpanded: { fn: (n) => Au(n) },
      row_getToggleExpandedHandler: { fn: (n) => Tu(n) }
    });
  },
  constructTableAPIs: (e) => {
    xt("rowExpandingFeature", e, {
      table_autoResetExpanded: { fn: () => ji(e) },
      table_setExpanded: { fn: (t) => kn(e, t) },
      table_toggleAllRowsExpanded: { fn: (t) => Hi(e, t) },
      table_resetExpanded: { fn: (t) => ki(e, t) },
      table_getCanSomeRowsExpand: { fn: () => Li(e) },
      table_getToggleAllRowsExpandedHandler: { fn: () => Ou(e) },
      table_getIsSomeRowsExpanded: { fn: () => Mu(e) },
      table_getIsAllRowsExpanded: { fn: () => Ki(e) },
      table_getExpandedDepth: { fn: () => Iu(e) }
    });
  }
};
function Of() {
  return J();
}
function Nt(e, t) {
  var n, r;
  (r = (n = e.options).onRowSelectionChange) == null || r.call(n, t);
}
function Mf(e, t) {
  e._lastSelectedRowId = null, Nt(e, t ? J() : Object.assign(J(), lt(e.initialState.rowSelection ?? {})));
}
function Bi(e, t, n) {
  e._lastSelectedRowId = null, Nt(e, (r) => {
    if (t = typeof t < "u" ? t : !ae(e, "getIsAllRowsSelected", qi), n != null && n.deselectAll && !t) return J();
    const o = Object.assign(J(), r), s = e.getPreGroupedRowModel().flatRows;
    if (t) {
      const i = /* @__PURE__ */ new Map();
      s.forEach((l) => {
        Ln(l, i) && (o[l.id] = !0);
      });
    } else s.forEach((i) => {
      et(i) && delete o[i.id];
    });
    return o;
  });
}
function Ui(e, t, n) {
  e._lastSelectedRowId = null, Nt(e, (r) => {
    const o = typeof t < "u" ? t : !ae(e, "getIsAllPageRowsSelected", Yi);
    if (n != null && n.deselectAll && !o) return J();
    const s = Object.assign(J(), r);
    return e.getRowModel().rows.forEach((i) => {
      rr(s, i.id, o, !0, e, !0);
    }), s;
  });
}
function If(e) {
  return e.getCoreRowModel();
}
function Af(e) {
  const t = e.getCoreRowModel();
  return ae(e, "getIsSomeRowsSelected", nr) ? co(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: J()
  };
}
function Tf(e) {
  const t = e.getFilteredRowModel();
  return ae(e, "getIsSomeRowsSelected", nr) ? co(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: J()
  };
}
function Df(e) {
  const t = e.getSortedRowModel();
  return ae(e, "getIsSomeRowsSelected", nr) ? co(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: J()
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
    t.some((i) => !dn(i, n) && Ln(i, s)) && (r = !1);
  }
  return r;
}
function Yi(e) {
  var s;
  const t = e.getPaginatedRowModel().flatRows, n = ((s = e.atoms.rowSelection) == null ? void 0 : s.get()) ?? {}, r = /* @__PURE__ */ new Map();
  let o = !1;
  for (let i = 0; i < t.length; i++) {
    const l = t[i];
    if (dn(l, n))
      !o && Ln(l, r) && (o = !0);
    else if (Ln(l, r)) return !1;
  }
  return o;
}
function nr(e) {
  return ae(e, "getSelectedRowIds", Gi).length > 0;
}
function Ff(e) {
  return e.getPaginatedRowModel().flatRows.filter((t) => et(t)).some((t) => io(t) || ae(t, "getIsSomeSelected", Xi));
}
function jf(e) {
  return (t) => {
    Bi(e, t.target.checked);
  };
}
function Hf(e) {
  return (t) => {
    Ui(e, t.target.checked);
  };
}
function zi(e, t, n) {
  const r = io(e);
  Nt(e.table, (o) => {
    t = typeof t < "u" ? t : !r;
    const s = Object.assign(J(), o);
    return rr(s, e.id, t, ((n == null ? void 0 : n.selectChildren) ?? !0) && wt(e), e.table), !t && (n != null && n.deselectParents) && Ji(s, e), s;
  });
}
function io(e) {
  var t;
  return dn(e, ((t = e.table.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function Xi(e) {
  return ao(e) === "some";
}
function kf(e) {
  return ao(e) === "all";
}
function et(e) {
  const t = e.table.options;
  return typeof t.enableRowSelection == "function" ? t.enableRowSelection(e) : t.enableRowSelection ?? !0;
}
function lo(e) {
  const t = e.table.options;
  return typeof t.enableSubRowSelection == "function" ? t.enableSubRowSelection(e) : t.enableSubRowSelection ?? !0;
}
function wt(e) {
  const t = e.table.options;
  return typeof t.enableMultiRowSelection == "function" ? t.enableMultiRowSelection(e) : t.enableMultiRowSelection ?? !0;
}
function Lf(e, t) {
  const n = et(e);
  return (r) => {
    var c, a;
    if (!n) return;
    const o = r, s = e.table, i = o.target.checked, l = s._lastSelectedRowId;
    (!(s.options.enableRowRangeSelection !== !1 && l !== null && wt(e) && (((a = (c = s.options).isRowRangeSelectionEvent) == null ? void 0 : a.call(c, r)) ?? !1)) || !Kf(e, l, i, t)) && zi(e, i, t), s._lastSelectedRowId = e.id;
  };
}
function Kf(e, t, n, r) {
  const o = (r == null ? void 0 : r.selectChildren) ?? !0, s = e.table, i = s.getRowsInDisplayOrder(), l = s.getPrePaginatedRowModel().rowsById[t] ?? s.getCoreRowModel().rowsById[t];
  if (!l) return !1;
  const c = l.getDisplayIndex(), a = e.getDisplayIndex(), u = i[c], g = i[a];
  if (c < 0 || a < 0 || c >= i.length || a >= i.length || (u == null ? void 0 : u.id) !== l.id || (g == null ? void 0 : g.id) !== e.id || !wt(l) || !wt(e)) return !1;
  const v = Math.min(c, a), w = Math.max(c, a);
  return Nt(s, (O) => {
    const x = Object.assign(J(), O);
    for (let D = v; D <= w; D++) {
      const H = i[D];
      !et(H) || !wt(H) || (rr(x, H.id, n, o, s), !n && (r != null && r.deselectParents) && Ji(x, H));
    }
    return x;
  }), !0;
}
function rr(e, t, n, r, o, s) {
  const i = o.getRow(t, !0);
  n ? (wt(i) || Object.keys(e).forEach((l) => delete e[l]), et(i) && (e[t] = !0)) : (!s || et(i)) && delete e[t], r && i.subRows.length && lo(i) && i.subRows.forEach((l) => rr(e, l.id, n, r, o, s));
}
function Ln(e, t) {
  if (!et(e)) return !1;
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
    if (!lo(u)) {
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
    const i = e[s], l = dn(i, t);
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
function co(e, t) {
  var s;
  const n = [], r = J(), o = ((s = t.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  return {
    rows: Zi(e.rows, o, n, r),
    flatRows: n,
    rowsById: r
  };
}
function dn(e, t) {
  return !!(Kt(t, e.id) && t[e.id]);
}
function ao(e) {
  var s;
  if (!e.subRows.length) return !1;
  const t = ((s = e.table.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  let n = !1, r = !0, o = !1;
  for (let i = 0; i < e.subRows.length; i++) {
    const l = e.subRows[i];
    if (n && !r) break;
    if (et(l) && (o = !0, dn(l, t) ? n = !0 : r = !1), l.subRows.length) {
      const c = ao(l);
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
    rowSelection: Of(),
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
    $t("rowSelectionFeature", e, t, {
      row_toggleSelected: { fn: (n, r, o) => zi(n, r, o) },
      row_getIsSelected: { fn: (n) => io(n) },
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
      row_getCanSelect: { fn: (n) => et(n) },
      row_getCanSelectSubRows: { fn: (n) => lo(n) },
      row_getCanMultiSelect: { fn: (n) => wt(n) },
      row_getToggleSelectedHandler: { fn: (n, r) => Lf(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    xt("rowSelectionFeature", e, {
      table_setRowSelection: { fn: (t) => Nt(e, t) },
      table_resetRowSelection: { fn: (t) => Mf(e, t) },
      table_toggleAllRowsSelected: { fn: (t, n) => Bi(e, t, n) },
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
        fn: () => Yi(e),
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
        fn: () => nr(e),
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
function Nf() {
  return (e) => {
    const t = e;
    return er({
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
      fn: () => Vf(t)
    });
  };
}
function Vf(e) {
  var r;
  const t = e.getPreExpandedRowModel(), n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return !t.rows.length || n !== !0 && !Object.keys(n ?? {}).length || !e.options.paginateExpandedRows && !e.options.manualPagination ? t : Wf(t);
}
function Wf(e) {
  const t = [], n = (r) => {
    t.push(r), r.subRows.length && tr(r) && r.subRows.forEach(n);
  };
  return e.rows.forEach(n), {
    rows: t,
    flatRows: e.flatRows,
    rowsById: e.rowsById
  };
}
function Xo(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = Ft(e[n]);
  return kr(e, t);
}
function Bf(e) {
  return Object.keys(e).map((t) => Ft(e[t]));
}
function Uf(e) {
  const t = (l, c) => {
    l.setOptions((a) => Uo(a, Xo(c)));
  }, n = Ka(), r = kr(e, { features: {
    coreReactivityFeature: n,
    ...Ft(e.features) ?? {}
  } }), o = kr(Xo(r), { mergeOptions: (l, c) => Uo(l, c) }), s = Ef(o), i = s;
  return Rs() && xl(() => {
    var l;
    return (l = n.unmount) == null ? void 0 : l.call(n);
  }), Se(() => Bf(r), () => {
    t(s, r);
  }, { immediate: !0 }), Se(() => {
    const l = Ft(e.state), c = Ft(e.atoms);
    if (!l) return [];
    const a = [];
    for (const u of Object.keys(i.initialState))
      !(u in l) || (c == null ? void 0 : c[u]) !== void 0 || a.push(l[u]);
    return a;
  }, (l) => {
    l.length > 0 && t(s, r);
  }, { immediate: !0 }), i.Subscribe = (l) => l.children(i.atoms), i;
}
function or() {
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
function $r(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Qi(e, t) {
  if (e) {
    if (typeof e == "string") return $r(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? $r(e, t) : void 0;
  }
}
function Yf() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function el(e, t) {
  return Gf(e) || qf(e, t) || Qi(e, t) || Yf();
}
var Jo = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, St = {}, pn = {};
Object.defineProperty(pn, "__esModule", { value: !0 });
pn.bind = void 0;
function zf(e, t) {
  var n = t.type, r = t.listener, o = t.options;
  return e.addEventListener(n, r, o), function() {
    e.removeEventListener(n, r, o);
  };
}
pn.bind = zf;
var sr = {}, At = Jo && Jo.__assign || function() {
  return At = Object.assign || function(e) {
    for (var t, n = 1, r = arguments.length; n < r; n++) {
      t = arguments[n];
      for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    }
    return e;
  }, At.apply(this, arguments);
};
Object.defineProperty(sr, "__esModule", { value: !0 });
sr.bindAll = void 0;
var Xf = pn;
function Zo(e) {
  if (!(typeof e > "u"))
    return typeof e == "boolean" ? {
      capture: e
    } : e;
}
function Jf(e, t) {
  if (t == null)
    return e;
  var n = At(At({}, e), { options: At(At({}, Zo(t)), Zo(e.options)) });
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
sr.bindAll = Zf;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.bindAll = e.bind = void 0;
  var t = pn;
  Object.defineProperty(e, "bind", { enumerable: !0, get: function() {
    return t.bind;
  } });
  var n = sr;
  Object.defineProperty(e, "bindAll", { enumerable: !0, get: function() {
    return n.bindAll;
  } });
})(St);
var tl = "data-pdnd-honey-pot";
function nl(e) {
  return e instanceof Element && e.hasAttribute(tl);
}
function rl(e) {
  var t = document.elementsFromPoint(e.x, e.y), n = el(t, 2), r = n[0], o = n[1];
  return r ? nl(r) ? o ?? null : r : null;
}
function ln(e) {
  "@babel/helpers - typeof";
  return ln = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ln(e);
}
function Qf(e, t) {
  if (ln(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (ln(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function ed(e) {
  var t = Qf(e, "string");
  return ln(t) == "symbol" ? t : t + "";
}
function gn(e, t, n) {
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
function Ct(e) {
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
var br = Ct(function() {
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
      gn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Qo(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
var cn = 2, ts = cn / 2;
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
    x: Math.min(e.x, window.innerWidth - cn),
    y: Math.min(e.y, window.innerHeight - cn)
  };
}
function ns(e) {
  var t = e.client, n = id(sd(od(rd(t))));
  return DOMRect.fromRect({
    x: n.x,
    y: n.y,
    width: cn,
    height: cn
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
  n.setAttribute(tl, "true"), br() && n.setAttribute("popover", "manual");
  var r = ns({
    client: t
  });
  Object.assign(n.style, es(es({
    position: "fixed"
  }, br() ? (
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
  }))), document.body.appendChild(n), br() && n.showPopover();
  var o = St.bind(window, {
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
    var a = St.bindAll(window, [
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
    return e = null, St.bind(window, {
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
        var u, g = l.location.current.input;
        (u = r) === null || u === void 0 || u({
          current: {
            x: g.clientX,
            y: g.clientY
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
  if (Array.isArray(e)) return $r(e);
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
var pd = Ct(function() {
  return navigator.userAgent.includes("Firefox");
}), uo = Ct(function() {
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
  if (typeof window > "u" || !uo())
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
  St.bindAll(
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
  return uo() ? t.hasOwnProperty(Nr.isLeavingWindow) : !1;
}
function yd(e) {
  var t = e.dragLeave, n = t.type, r = t.relatedTarget;
  return n !== "dragleave" ? !1 : uo() ? md({
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
function Qt(e) {
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
}, _r = wd(function(e) {
  return e();
}), Rn = /* @__PURE__ */ function() {
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
      }), Rn.schedule(function() {
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
      Rn.flush(), _r.cancel(), s({
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
      _r(function() {
        Rn.flush();
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
      Rn.flush(), _r.cancel(), s({
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
var Vr = {
  isActive: !1
};
function sl() {
  return !Vr.isActive;
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
function Rd(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = e.dispatchEvent;
  if (!sl())
    return;
  var s = xd({
    event: t,
    dragType: n,
    getDropTargetsOver: r
  });
  Vr.isActive = !0;
  var i = {
    current: s
  };
  Sr({
    event: t,
    current: s.dropTargets
  });
  var l = bd({
    source: n.payload,
    dispatchEvent: o,
    initial: s
  });
  function c(w) {
    var O = Sd({
      current: i.current.dropTargets,
      next: w.dropTargets
    });
    i.current = w, O && l.dragUpdate({
      current: i.current
    });
  }
  function a(w) {
    var O = Qt(w), x = nl(w.target) ? rl({
      x: O.clientX,
      y: O.clientY
    }) : w.target, D = r({
      target: x,
      input: O,
      source: n.payload,
      current: i.current.dropTargets
    });
    D.length && (w.preventDefault(), Sr({
      event: w,
      current: D
    })), c({
      dropTargets: D,
      input: O
    });
  }
  function u() {
    i.current.dropTargets.length && c({
      dropTargets: [],
      input: i.current.input
    }), l.drop({
      current: i.current,
      updatedSourcePayload: null
    }), g();
  }
  function g() {
    Vr.isActive = !1, v();
  }
  var v = St.bindAll(
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
        a(O), l.drag({
          current: i.current
        });
      }
    }, {
      type: "dragenter",
      listener: a
    }, {
      type: "dragleave",
      listener: function(O) {
        yd({
          dragLeave: O
        }) && (c({
          input: i.current.input,
          dropTargets: []
        }), n.startedFrom === "external" && u());
      }
    }, {
      // A "drop" can only happen if the browser allowed the drop
      type: "drop",
      listener: function(O) {
        if (i.current = {
          dropTargets: i.current.dropTargets,
          input: Qt(O)
        }, !i.current.dropTargets.length) {
          u();
          return;
        }
        O.preventDefault(), Sr({
          event: O,
          current: i.current.dropTargets
        }), l.drop({
          current: i.current,
          // When dropping something native, we need to extract the latest
          // `.items` from the "drop" event as it is now accessible
          updatedSourcePayload: n.type === "external" ? n.getDropPayload(O) : null
        }), g();
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
        i.current = {
          dropTargets: i.current.dropTargets,
          input: Qt(O)
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
function Sr(e) {
  var t, n = e.event, r = e.current, o = (t = r[0]) === null || t === void 0 ? void 0 : t.dropEffect;
  o != null && n.dataTransfer && (n.dataTransfer.dropEffect = o);
}
function xd(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = Qt(t);
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
  start: Rd
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
function Ed(e) {
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
function rt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ss(Object(n), !0).forEach(function(r) {
      gn(e, r, n[r]);
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
function xr(e) {
  return e.slice(0).reverse();
}
function Od(e) {
  var t = e.typeKey, n = e.defaultDropEffect, r = /* @__PURE__ */ new WeakMap(), o = "data-drop-target-for-".concat(t), s = "[".concat(o, "]");
  function i(w) {
    return r.set(w.element, w), function() {
      return r.delete(w.element);
    };
  }
  function l(w) {
    var O = or(il(w.element, {
      attribute: o,
      value: "true"
    }), i(w));
    return Ct(O);
  }
  function c(w) {
    var O, x, D, H, C = w.source, F = w.target, M = w.input, K = w.result, k = K === void 0 ? [] : K;
    if (F == null)
      return k;
    if (!(F instanceof Element))
      return F instanceof Node ? c({
        source: C,
        target: F.parentElement,
        input: M,
        result: k
      }) : k;
    var ne = F.closest(s);
    if (ne == null)
      return k;
    var j = r.get(ne);
    if (j == null)
      return k;
    var T = {
      input: M,
      source: C,
      element: j.element
    };
    if (j.canDrop && !j.canDrop(T))
      return c({
        source: C,
        target: j.element.parentElement,
        input: M,
        result: k
      });
    var V = (O = (x = j.getData) === null || x === void 0 ? void 0 : x.call(j, T)) !== null && O !== void 0 ? O : {}, te = (D = (H = j.getDropEffect) === null || H === void 0 ? void 0 : H.call(j, T)) !== null && D !== void 0 ? D : n, B = {
      data: V,
      element: j.element,
      dropEffect: te,
      // we are collecting _actual_ drop targets, so these are
      // being applied _not_ due to stickiness
      isActiveDueToStickiness: !1
    };
    return c({
      source: C,
      target: j.element.parentElement,
      input: M,
      // Using bubble ordering. Same ordering as `event.getPath()`
      result: [].concat(ol(k), [B])
    });
  }
  function a(w) {
    var O = w.eventName, x = w.payload, D = Rr(x.location.current.dropTargets), H;
    try {
      for (D.s(); !(H = D.n()).done; ) {
        var C, F = H.value, M = r.get(F.element), K = rt(rt({}, x), {}, {
          self: F
        });
        M == null || (C = M[O]) === null || C === void 0 || C.call(
          M,
          // I cannot seem to get the types right here.
          // TS doesn't seem to like that one event can need `nativeSetDragImage`
          // @ts-expect-error
          K
        );
      }
    } catch (k) {
      D.e(k);
    } finally {
      D.f();
    }
  }
  var u = {
    onGenerateDragPreview: a,
    onDrag: a,
    onDragStart: a,
    onDrop: a,
    onDropTargetChange: function(O) {
      var x = O.payload, D = new Set(x.location.current.dropTargets.map(function(W) {
        return W.element;
      })), H = /* @__PURE__ */ new Set(), C = Rr(x.location.previous.dropTargets), F;
      try {
        for (C.s(); !(F = C.n()).done; ) {
          var M, K = F.value;
          H.add(K.element);
          var k = r.get(K.element), ne = D.has(K.element), j = rt(rt({}, x), {}, {
            self: K
          });
          if (k == null || (M = k.onDropTargetChange) === null || M === void 0 || M.call(k, j), !ne) {
            var T;
            k == null || (T = k.onDragLeave) === null || T === void 0 || T.call(k, j);
          }
        }
      } catch (W) {
        C.e(W);
      } finally {
        C.f();
      }
      var V = Rr(x.location.current.dropTargets), te;
      try {
        for (V.s(); !(te = V.n()).done; ) {
          var B, re, ve = te.value;
          if (!H.has(ve.element)) {
            var we = rt(rt({}, x), {}, {
              self: ve
            }), Z = r.get(ve.element);
            Z == null || (B = Z.onDropTargetChange) === null || B === void 0 || B.call(Z, we), Z == null || (re = Z.onDragEnter) === null || re === void 0 || re.call(Z, we);
          }
        }
      } catch (W) {
        V.e(W);
      } finally {
        V.f();
      }
    }
  };
  function g(w) {
    u[w.eventName](w);
  }
  function v(w) {
    var O = w.source, x = w.target, D = w.input, H = w.current, C = c({
      source: O,
      target: x,
      input: D
    });
    if (C.length >= H.length)
      return C;
    for (var F = xr(H), M = xr(C), K = [], k = 0; k < F.length; k++) {
      var ne, j = F[k], T = M[k];
      if (T != null) {
        K.push(T);
        continue;
      }
      var V = K[k - 1], te = F[k - 1];
      if ((V == null ? void 0 : V.element) !== (te == null ? void 0 : te.element))
        break;
      var B = r.get(j.element);
      if (!B)
        break;
      var re = {
        input: D,
        source: O,
        element: B.element
      };
      if (B.canDrop && !B.canDrop(re) || !((ne = B.getIsSticky) !== null && ne !== void 0 && ne.call(B, re)))
        break;
      K.push(rt(rt({}, j), {}, {
        // making it clear to consumers this drop target is active due to stickiness
        isActiveDueToStickiness: !0
      }));
    }
    return xr(K);
  }
  return {
    dropTargetForConsumers: l,
    getIsOver: v,
    dispatchEvent: g
  };
}
function Md(e, t) {
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
      gn(e, r, n[r]);
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
    return Ct(l);
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
      var c = Md(e), a;
      try {
        for (c.s(); !(a = c.n()).done; ) {
          var u = a.value;
          n(u);
        }
      } catch (D) {
        c.e(D);
      } finally {
        c.f();
      }
    }
    if (t) {
      for (var g = Array.from(t.active), v = 0, w = g; v < w.length; v++) {
        var O = w[v];
        if (t.active.has(O)) {
          var x;
          (x = O[i]) === null || x === void 0 || x.call(O, l);
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
  var t = e.typeKey, n = e.mount, r = e.dispatchEventToSource, o = e.onPostDispatch, s = e.defaultDropEffect, i = Td(), l = Od({
    typeKey: t,
    defaultDropEffect: s
  });
  function c(g) {
    r == null || r(g), l.dispatchEvent(g), i.dispatchEvent(g), o == null || o(g);
  }
  function a(g) {
    var v = g.event, w = g.dragType;
    os.start({
      event: v,
      dragType: w,
      getDropTargetsOver: l.getIsOver,
      dispatchEvent: c
    });
  }
  function u() {
    function g() {
      var v = {
        canStart: os.canStart,
        start: a
      };
      return n(v);
    }
    return Ed({
      typeKey: t,
      mount: g
    });
  }
  return {
    registerUsage: u,
    dropTarget: l.dropTargetForConsumers,
    monitor: i.monitorForConsumers
  };
}
var Fd = Ct(function() {
  return navigator.userAgent.toLocaleLowerCase().includes("android");
}), jd = "pdnd:android-fallback", as = "text/plain", Hd = "text/uri-list", kd = "application/vnd.pdnd", Kn = /* @__PURE__ */ new WeakMap();
function Ld(e) {
  return Kn.set(e.element, e), function() {
    Kn.delete(e.element);
  };
}
var us = ad(), ll = Dd({
  typeKey: "element",
  defaultDropEffect: "move",
  mount: function(t) {
    return or(us.bindEvents(), St.bind(document, {
      type: "dragstart",
      listener: function(r) {
        var o, s, i, l, c, a;
        if (t.canStart(r) && !r.defaultPrevented && r.dataTransfer) {
          var u = r.target;
          if (u instanceof HTMLElement) {
            var g = Kn.get(u);
            if (g) {
              var v = Qt(r), w = {
                element: g.element,
                dragHandle: (o = g.dragHandle) !== null && o !== void 0 ? o : null,
                input: v
              };
              if (g.canDrag && !g.canDrag(w)) {
                r.preventDefault();
                return;
              }
              if (g.dragHandle) {
                var O = rl({
                  x: v.clientX,
                  y: v.clientY
                });
                if (!g.dragHandle.contains(O)) {
                  r.preventDefault();
                  return;
                }
              }
              var x = (s = (i = g.getInitialDataForExternal) === null || i === void 0 ? void 0 : i.call(g, w)) !== null && s !== void 0 ? s : null;
              if (x)
                for (var D = 0, H = Object.entries(x); D < H.length; D++) {
                  var C = el(H[D], 2), F = C[0], M = C[1];
                  r.dataTransfer.setData(F, M ?? "");
                }
              Fd() && !r.dataTransfer.types.includes(as) && !r.dataTransfer.types.includes(Hd) && r.dataTransfer.setData(as, jd), r.dataTransfer.setData(kd, "");
              var K = {
                element: g.element,
                dragHandle: (l = g.dragHandle) !== null && l !== void 0 ? l : null,
                data: (c = (a = g.getInitialData) === null || a === void 0 ? void 0 : a.call(g, w)) !== null && c !== void 0 ? c : {}
              }, k = {
                type: "element",
                payload: K,
                startedFrom: "internal"
              };
              t.start({
                event: r,
                dragType: k
              });
            }
          }
        }
      }
    }));
  },
  dispatchEventToSource: function(t) {
    var n, r, o = t.eventName, s = t.payload;
    (n = Kn.get(s.source.element)) === null || n === void 0 || (r = n[o]) === null || r === void 0 || r.call(
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
  var t = or(
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
  return Ct(t);
}
function Nd(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
    if (t.indexOf(r) !== -1) continue;
    n[r] = e[r];
  }
  return n;
}
function Vd(e, t) {
  if (e == null) return {};
  var n, r, o = Nd(e, t);
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
function Wd() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : cl, t = null;
  return function(n) {
    return t && e(t.value, n) || (t = {
      value: n
    }), t.value;
  };
}
var Bd = ["block"];
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
      gn(e, r, n[r]);
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
function Cr(e) {
  var t = e.client, n = e.borderBox, r = n.height / 4;
  return t.y <= n.top + r ? "reorder-above" : t.y >= n.bottom - r ? "reorder-below" : "make-child";
}
function Gd(e) {
  var t = e.element, n = e.input, r = e.currentLevel, o = e.indentPerLevel, s = e.mode, i = {
    x: n.clientX,
    y: n.clientY
  }, l = t.getBoundingClientRect();
  if (s === "standard") {
    var c = Cr({
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
    var u = Cr({
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
  var g = o * r;
  if (i.x < l.left + g) {
    if (i.y < a.y)
      return {
        type: "reorder-above",
        indentPerLevel: o,
        currentLevel: r
      };
    var v = (i.x - l.left) / o, w = Math.max(Math.floor(v), 0);
    return {
      type: "reparent",
      desiredLevel: w,
      indentPerLevel: o,
      currentLevel: r
    };
  }
  return {
    type: Cr({
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
var qd = Wd(al);
function Yd(e) {
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
function zd(e, t) {
  var n = t.block, r = Vd(t, Bd), o = Gd(r), s = Yd({
    desired: o,
    block: n
  }), i = qd(s);
  return ds(ds({}, e), {}, gn({}, ul, i));
}
function ps(e) {
  var t;
  return (t = e[ul]) !== null && t !== void 0 ? t : null;
}
var ul = Symbol("tree-item-instruction");
const Xd = {
  key: 0,
  class: "pnl-tst-empty"
}, Jd = ["aria-label", "aria-colcount", "aria-rowcount"], Zd = {
  key: 0,
  class: "pnl-tst-head",
  role: "rowgroup"
}, Qd = {
  class: "pnl-tst-hrow",
  role: "row",
  "aria-rowindex": 1
}, ep = ["aria-colindex"], tp = {
  class: "pnl-tst-body",
  role: "rowgroup"
}, np = ["aria-level", "aria-posinset", "aria-setsize", "aria-rowindex", "aria-expanded", "aria-selected", "tabindex", "onClick", "onFocus"], rp = ["aria-colindex"], op = ["onClick"], sp = {
  key: 1,
  class: "pnl-tst-twisty pnl-tst-twisty--leaf",
  "aria-hidden": "true"
}, ip = ["checked", ".indeterminate", "aria-label", "onClick"], lp = { class: "pnl-tst-value" }, cp = "title", xn = "pnl-tst-row", ap = 500, up = {
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
      coreRowModel: Ni(),
      expandedRowModel: Nf()
    }, r = le(() => (t.state.columns || []).length > 0), o = le(() => {
      const d = t.state.columns || [];
      return d.length === 0 ? [{ id: cp, header: "", accessorFn: (h) => h.title }] : d.map((h) => {
        const m = h.field ?? h.id;
        return {
          id: h.id,
          header: h.header ?? h.id,
          accessorFn: (b) => b[m],
          meta: { width: h.width }
        };
      });
    }), s = /* @__PURE__ */ Mt(i(t.state.expandedKeys));
    function i(d) {
      const h = {};
      for (const m of d || []) h[m] = !0;
      return h;
    }
    function l(d) {
      return d === !0 ? w.getCoreRowModel().flatRows.filter((h) => h.subRows.length > 0).map((h) => h.id).sort() : Object.keys(d).filter((h) => d[h]).sort();
    }
    function c(d, h) {
      return d.length !== h.length ? !1 : d.every((m, b) => m === h[b]);
    }
    const a = le(() => t.state.options.select_mode ?? "none"), u = le(() => a.value !== "none"), g = le(() => a.value === "hierarchy"), v = /* @__PURE__ */ Mt(i(t.state.selectedKeys)), w = Uf({
      features: n,
      data: le(() => t.state.source || []),
      columns: o,
      getRowId: (d) => d.key,
      getSubRows: (d) => d.children,
      // TanStack resets `expanded` whenever `data` changes. Python rewrites the
      // whole tree after every move, so leaving that on would collapse the tree on
      // each drop and push an empty `expanded_keys` back. Expansion is owned here.
      autoResetExpanded: !1,
      enableRowSelection: u,
      enableMultiRowSelection: le(() => a.value !== "single"),
      enableSubRowSelection: g,
      state: le(() => ({ expanded: s.value, rowSelection: v.value })),
      onExpandedChange: (d) => {
        s.value = typeof d == "function" ? d(s.value) : d;
      },
      onRowSelectionChange: (d) => {
        v.value = typeof d == "function" ? d(v.value) : d;
      }
    });
    function O(d) {
      const h = { ...d }, m = (b) => {
        b.subRows.forEach(m), b.subRows.length !== 0 && (b.subRows.every((A) => h[A.id]) ? h[b.id] = !0 : delete h[b.id]);
      };
      return w.getCoreRowModel().rows.forEach(m), h;
    }
    Se(() => l(v.value), t.setSelectedKeys, { flush: "post" }), Se(
      () => [v.value, w.getCoreRowModel().rows],
      () => {
        if (!g.value) return;
        const d = O(v.value);
        c(l(d), l(v.value)) || (v.value = d);
      },
      { immediate: !0, flush: "post" }
    ), Se(() => l(s.value), t.setExpandedKeys, { flush: "post" }), Se(
      () => t.state.expandedKeys,
      (d) => {
        c(l(s.value), [...d || []].sort()) || (s.value = i(d));
      }
    ), Se(
      () => t.state.selectedKeys,
      (d) => {
        c(l(v.value), [...d || []].sort()) || (v.value = i(d));
      }
    ), Se(
      () => [t.state.options.expand_all, t.state.source],
      ([d]) => {
        d && w.toggleAllRowsExpanded(!0);
      },
      { immediate: !0 }
    );
    const x = le(() => w.getRowModel().rows), D = le(() => {
      var d;
      return ((d = w.getHeaderGroups()[0]) == null ? void 0 : d.headers) ?? [];
    }), H = le(() => t.state.options.indent_px ?? 16), C = le(() => t.state.options.aria_label ?? "Tree table"), F = le(() => r.value ? 2 : 1), M = le(() => x.value.length + (r.value ? 1 : 0));
    function K(d) {
      const h = d.getParentRow();
      return h ? h.subRows.length : w.getCoreRowModel().rows.length;
    }
    function k(d) {
      var m;
      const h = (m = d.meta) == null ? void 0 : m.width;
      return h ? { flex: `0 0 ${h}px` } : { flex: "1 1 0" };
    }
    function ne(d, h) {
      return { ...k(h), paddingInlineStart: `${d.depth * H.value}px` };
    }
    const j = /* @__PURE__ */ Mt(null), T = /* @__PURE__ */ new Map();
    function V(d, h) {
      h ? T.set(d, h) : T.delete(d);
    }
    const te = le(() => {
      const d = x.value;
      return d.length === 0 ? null : d.some((h) => h.id === j.value) ? j.value : d[0].id;
    });
    function B(d) {
      d != null && (j.value = d, Ns(() => {
        var h;
        return (h = T.get(d)) == null ? void 0 : h.focus();
      }));
    }
    function re(d) {
      const h = x.value;
      h.length !== 0 && B(h[Math.max(0, Math.min(d, h.length - 1))].id);
    }
    function ve(d) {
      const h = x.value;
      if (h.length === 0) return;
      const m = Math.max(
        0,
        h.findIndex((A) => A.id === te.value)
      ), b = h[m];
      switch (d.key) {
        case "ArrowDown":
          d.preventDefault(), re(m + 1);
          break;
        case "ArrowUp":
          d.preventDefault(), re(m - 1);
          break;
        case "ArrowRight":
          if (d.preventDefault(), !b.getCanExpand()) break;
          b.getIsExpanded() ? re(m + 1) : (b.toggleExpanded(!0), B(b.id));
          break;
        case "ArrowLeft":
          d.preventDefault(), b.getCanExpand() && b.getIsExpanded() ? (b.toggleExpanded(!1), B(b.id)) : b.parentId && B(b.parentId);
          break;
        case "Home":
          d.preventDefault(), re(0);
          break;
        case "End":
          d.preventDefault(), re(h.length - 1);
          break;
        case "Enter":
          d.preventDefault(), t.emitEvent("activate", { key: b.id });
          break;
        case " ":
          if (!u.value) break;
          d.preventDefault(), q(b);
          break;
      }
    }
    function we(d) {
      j.value = d.id, t.emitEvent("activate", { key: d.id });
    }
    function Z(d) {
      j.value = d.id, d.toggleExpanded();
    }
    function W(d) {
      return !d.getIsSelected() && d.getIsSomeSelected();
    }
    function q(d) {
      j.value = d.id, d.toggleSelected(void 0, {
        selectChildren: g.value,
        deselectParents: g.value
      });
    }
    function We(d) {
      q(d), B(d.id);
    }
    const Et = ["reorder-above", "reorder-below", "make-child", "reparent"], Pe = le(() => t.state.options.enable_dnd === !0), be = /* @__PURE__ */ Mt(null), ct = /* @__PURE__ */ Mt(null);
    function hn(d) {
      return x.value.find((h) => h.id === d) ?? null;
    }
    function ir(d, h) {
      let m = d;
      for (; m; ) {
        if (m.id === h) return !0;
        m = m.getParentRow();
      }
      return !1;
    }
    function at(d) {
      if (d.getCanExpand() && d.getIsExpanded()) return "expanded";
      const h = d.getParentRow(), m = h ? h.subRows : w.getCoreRowModel().rows;
      return d.index === m.length - 1 ? "last-in-group" : "standard";
    }
    let nt = null, Be = null;
    function Pt() {
      Be && clearTimeout(Be), Be = null, nt = null;
    }
    function ut(d, h) {
      if (nt === d || (Pt(), !h || h.type === "instruction-blocked")) return;
      const m = hn(d);
      !m || !m.getCanExpand() || m.getIsExpanded() || (nt = d, Be = setTimeout(() => {
        Be = null;
        const b = hn(d);
        b && b.getCanExpand() && !b.getIsExpanded() && b.toggleExpanded(!0);
      }, ap));
    }
    function mn() {
      ct.value = null, Pt();
    }
    const f = /* @__PURE__ */ Mt(null);
    function p() {
      let d = f.value;
      if (!d) return null;
      let h = d.getRootNode();
      for (; h.host; )
        d = h.host, h = d.getRootNode();
      return d;
    }
    function y(d) {
      for (const h of x.value) {
        const m = T.get(h.id);
        if (!m) continue;
        const b = m.getBoundingClientRect();
        if (d.clientX >= b.left && d.clientX < b.right && d.clientY >= b.top && d.clientY < b.bottom)
          return { row: h, element: m, rect: b };
      }
      return null;
    }
    let S = null;
    function R() {
      S == null || S(), S = null;
      const d = p();
      !d || !Pe.value || (S = or(
        $d({
          element: d,
          // Anything outside a row (the header, the empty space below the last row)
          // is not a drag handle, and returning false cancels the native drag.
          canDrag: ({ input: h }) => y(h) !== null,
          getInitialData: ({ input: h }) => {
            var m;
            return { type: xn, key: ((m = y(h)) == null ? void 0 : m.row.id) ?? null };
          },
          onGenerateDragPreview: ({ location: h, nativeSetDragImage: m }) => {
            const b = h.current.input, A = y(b);
            !A || !m || m(A.element, b.clientX - A.rect.left, b.clientY - A.rect.top);
          },
          onDragStart: ({ source: h }) => {
            be.value = h.data.key;
          },
          onDrop: () => {
            be.value = null, mn();
          }
        }),
        Kd({
          element: d,
          canDrop: ({ source: h }) => h.data.type === xn,
          getData: ({ input: h, source: m }) => {
            const b = y(h);
            if (!b) return { type: xn, key: null };
            const A = { type: xn, key: b.row.id }, N = ir(b.row, m.data.key);
            return zd(A, {
              element: b.element,
              input: h,
              currentLevel: b.row.depth,
              indentPerLevel: H.value,
              mode: at(b.row),
              block: N ? Et : []
            });
          },
          onDrag: ({ self: h }) => {
            const m = h.data.key, b = ps(h.data);
            ct.value = m && b ? { key: m, instruction: b } : null, ut(m ?? null, b);
          },
          onDragLeave: mn,
          onDrop: ({ self: h, source: m }) => {
            mn();
            const b = h.data.key, A = ps(h.data);
            !b || !A || A.type === "instruction-blocked" || b !== m.data.key && t.emitEvent("move", {
              key: m.data.key,
              targetKey: b,
              instruction: A.type,
              desiredLevel: A.desiredLevel ?? A.currentLevel
            });
          }
        })
      ));
    }
    Js(R), Se(Pe, R), Zs(() => {
      Pt(), S == null || S();
    });
    function _(d) {
      var h;
      return ((h = ct.value) == null ? void 0 : h.key) === d.id ? ct.value.instruction : null;
    }
    function I(d) {
      const h = _(d);
      return {
        "pnl-tst-row--draggable": Pe.value,
        "pnl-tst-row--dragging": be.value === d.id,
        "pnl-tst-row--blocked": (h == null ? void 0 : h.type) === "instruction-blocked",
        "pnl-tst-row--child-target": (h == null ? void 0 : h.type) === "make-child"
      };
    }
    function P(d) {
      const h = _(d);
      return h ? h.type === "reorder-above" ? "pnl-tst-dropline--above" : h.type === "reorder-below" || h.type === "reparent" ? "pnl-tst-dropline--below" : null : null;
    }
    function E(d) {
      const h = _(d);
      return h ? { insetInlineStart: `${(h.type === "reparent" ? h.desiredLevel : h.currentLevel) * h.indentPerLevel}px` } : null;
    }
    return (d, h) => (ue(), ge("div", {
      ref_key: "rootElement",
      ref: f,
      class: "pnl-tst"
    }, [
      x.value.length === 0 ? (ue(), ge("div", Xd, "No data")) : (ue(), ge("div", {
        key: 1,
        class: "pnl-tst-grid",
        role: "treegrid",
        "aria-label": C.value,
        "aria-colcount": D.value.length,
        "aria-rowcount": M.value,
        onKeydown: ve
      }, [
        r.value ? (ue(), ge("div", Zd, [
          gt("div", Qd, [
            (ue(!0), ge(xe, null, gr(D.value, (m, b) => (ue(), ge("div", {
              key: m.id,
              class: "pnl-tst-hcell",
              role: "columnheader",
              "aria-colindex": b + 1,
              style: Dt(k(m.column.columnDef))
            }, Er(m.column.columnDef.header), 13, ep))), 128))
          ])
        ])) : bn("", !0),
        gt("div", tp, [
          (ue(!0), ge(xe, null, gr(x.value, (m, b) => (ue(), ge("div", {
            key: m.id,
            ref_for: !0,
            ref: (A) => V(m.id, A),
            class: ht(["pnl-tst-row", I(m)]),
            role: "row",
            "aria-level": m.depth + 1,
            "aria-posinset": m.index + 1,
            "aria-setsize": K(m),
            "aria-rowindex": b + F.value,
            "aria-expanded": m.getCanExpand() ? m.getIsExpanded() : void 0,
            "aria-selected": u.value ? m.getIsSelected() : void 0,
            tabindex: m.id === te.value ? 0 : -1,
            onClick: (A) => we(m),
            onFocus: (A) => j.value = m.id
          }, [
            P(m) ? (ue(), ge("span", {
              key: 0,
              class: ht(["pnl-tst-dropline", P(m)]),
              style: Dt(E(m)),
              "aria-hidden": "true"
            }, null, 6)) : bn("", !0),
            (ue(!0), ge(xe, null, gr(m.getAllCells(), (A, N) => (ue(), ge("div", {
              key: A.id,
              class: ht(["pnl-tst-cell", { "pnl-tst-cell--tree": N === 0 }]),
              role: "gridcell",
              "aria-colindex": N + 1,
              style: Dt(
                N === 0 ? ne(m, A.column.columnDef) : k(A.column.columnDef)
              )
            }, [
              N === 0 ? (ue(), ge(xe, { key: 0 }, [
                m.getCanExpand() ? (ue(), ge("span", {
                  key: 0,
                  class: ht(["pnl-tst-twisty", { "pnl-tst-twisty--open": m.getIsExpanded() }]),
                  "aria-hidden": "true",
                  onClick: Wo((Y) => Z(m), ["stop"])
                }, [...h[0] || (h[0] = [
                  gt("svg", {
                    viewBox: "0 0 16 16",
                    width: "12",
                    height: "12",
                    focusable: "false"
                  }, [
                    gt("path", {
                      d: "M6 3.5 10.5 8 6 12.5",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "1.6"
                    })
                  ], -1)
                ])], 10, op)) : (ue(), ge("span", sp)),
                u.value ? (ue(), ge("input", {
                  key: 2,
                  class: "pnl-tst-check",
                  type: "checkbox",
                  tabindex: "-1",
                  checked: m.getIsSelected(),
                  ".indeterminate": W(m),
                  "aria-label": `Select ${m.original.title ?? m.id}`,
                  onClick: Wo((Y) => We(m), ["stop"])
                }, null, 40, ip)) : bn("", !0)
              ], 64)) : bn("", !0),
              gt("span", lp, Er(A.getValue()), 1)
            ], 14, rp))), 128))
          ], 42, np))), 128))
        ])
      ], 40, Jd))
    ], 512));
  }
};
function fp({ model: e, el: t }) {
  t.style.display = "block", t.style.width = "100%";
  const n = document.createElement("div");
  n.className = "pnl-tst-root", t.append(n);
  const r = /* @__PURE__ */ Gn({
    source: e.get("source") || [],
    columns: e.get("columns") || [],
    options: e.get("options") || {},
    expandedKeys: e.get("expanded_keys") || [],
    selectedKeys: e.get("selected_keys") || []
  }), o = (u, g) => {
    e.set("_event_data", {
      event_name: u,
      event_params: g,
      timestamp: Date.now()
    }), e.save_changes();
  }, s = (u, g) => u.length === g.length && u.every((v, w) => v === g[w]), i = (u) => (g) => {
    const v = [...e.get(u) || []].sort();
    s(v, g) || (e.set(u, g), e.save_changes());
  }, l = i("expanded_keys"), c = i("selected_keys"), a = Ta(up, { state: r, emitEvent: o, setExpandedKeys: l, setSelectedKeys: c });
  return a.mount(n), e.on("change:source", () => {
    r.source = e.get("source") || [];
  }), e.on("change:columns", () => {
    r.columns = e.get("columns") || [];
  }), e.on("change:options", () => {
    r.options = e.get("options") || {};
  }), e.on("change:expanded_keys", () => {
    r.expandedKeys = e.get("expanded_keys") || [];
  }), e.on("change:selected_keys", () => {
    r.selectedKeys = e.get("selected_keys") || [];
  }), () => {
    a.unmount();
  };
}
export {
  fp as render
};

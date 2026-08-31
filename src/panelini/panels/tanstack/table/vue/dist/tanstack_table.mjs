/**
* @vue/shared v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function Wr(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const ne = {}, Tt = [], $e = () => {
}, gs = () => !1, Vn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Nn = (e) => e.startsWith("onUpdate:"), me = Object.assign, Ur = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, fl = Object.prototype.hasOwnProperty, z = (e, t) => fl.call(e, t), V = Array.isArray, it = (e) => dn(e) === "[object Map]", In = (e) => dn(e) === "[object Set]", ho = (e) => dn(e) === "[object Date]", W = (e) => typeof e == "function", se = (e) => typeof e == "string", Ve = (e) => typeof e == "symbol", X = (e) => e !== null && typeof e == "object", hs = (e) => (X(e) || W(e)) && W(e.then) && W(e.catch), ms = Object.prototype.toString, dn = (e) => ms.call(e), dl = (e) => dn(e).slice(8, -1), ys = (e) => dn(e) === "[object Object]", Gr = (e) => se(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Xt = /* @__PURE__ */ Wr(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Bn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, pl = /-\w/g, Oe = Bn(
  (e) => e.replace(pl, (t) => t.slice(1).toUpperCase())
), gl = /\B([A-Z])/g, _t = Bn(
  (e) => e.replace(gl, "-$1").toLowerCase()
), vs = Bn((e) => e.charAt(0).toUpperCase() + e.slice(1)), lr = Bn(
  (e) => e ? `on${vs(e)}` : ""
), Le = (e, t) => !Object.is(e, t), cr = (e, ...t) => {
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
  if (V(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], o = se(r) ? wl(r) : Dt(r);
      if (o)
        for (const s in o)
          t[s] = o[s];
    }
    return t;
  } else if (se(e) || X(e))
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
function pt(e) {
  let t = "";
  if (se(e))
    t = e;
  else if (V(e))
    for (let n = 0; n < e.length; n++) {
      const r = pt(e[n]);
      r && (t += r + " ");
    }
  else if (X(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const bl = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", _l = /* @__PURE__ */ Wr(bl);
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
  if (n = Ve(e), r = Ve(t), n || r)
    return e === t;
  if (n = V(e), r = V(t), n || r)
    return n && r ? Sl(e, t) : !1;
  if (n = X(e), r = X(t), n || r) {
    if (!n || !r)
      return !1;
    if (n = it(e), r = it(t), n || r || (n = In(e), r = In(t), n || r))
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
const _s = (e) => !!(e && e.__v_isRef === !0), Mr = (e) => se(e) ? e : e == null ? "" : V(e) || X(e) && (e.toString === ms || !W(e.toString)) ? _s(e) ? Mr(e.value) : JSON.stringify(e, Ss, 2) : String(e), Ss = (e, t) => _s(t) ? Ss(e, t.value) : it(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [r, o], s) => (n[ar(r, s) + " =>"] = o, n),
    {}
  )
} : In(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => ar(n))
} : Ve(t) ? ar(t) : X(t) && !V(t) && !ys(t) ? String(t) : t, ar = (e, t = "") => {
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
let le;
class xl {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && le && (le.active ? (this.parent = le, this.index = (le.scopes || (le.scopes = [])).push(
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
      const n = le;
      try {
        return le = this, t();
      } finally {
        le = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = le, le = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (le === this)
        le = this.prevScope;
      else {
        let t = le;
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
  return le;
}
function Rl(e, t = !1) {
  le && le.cleanups.push(e);
}
let te;
const ur = /* @__PURE__ */ new WeakSet();
class Rs {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, le && (le.active ? le.effects.push(this) : this.flags &= -2);
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
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ms(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, vo(this), Es(this);
    const t = te, n = Pe;
    te = this, Pe = !0;
    try {
      return this.fn();
    } finally {
      Os(this), te = t, Pe = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Yr(t);
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
    Er(this) && this.run();
  }
  get dirty() {
    return Er(this);
  }
}
let Cs = 0, Jt, Zt;
function Ms(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Zt, Zt = e;
    return;
  }
  e.next = Jt, Jt = e;
}
function qr() {
  Cs++;
}
function zr() {
  if (--Cs > 0)
    return;
  if (Zt) {
    let t = Zt;
    for (Zt = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; Jt; ) {
    let t = Jt;
    for (Jt = void 0; t; ) {
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
function Es(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Os(e) {
  let t, n = e.depsTail, r = n;
  for (; r; ) {
    const o = r.prevDep;
    r.version === -1 ? (r === n && (n = o), Yr(r), Cl(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = o;
  }
  e.deps = t, e.depsTail = n;
}
function Er(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Ps(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Ps(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === rn) || (e.globalVersion = rn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Er(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = te, r = Pe;
  te = e, Pe = !0;
  try {
    Es(e);
    const o = e.fn(e._value);
    (t.version === 0 || Le(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    te = n, Pe = r, Os(e), e.flags &= -3;
  }
}
function Yr(e, t = !1) {
  const { dep: n, prevSub: r, nextSub: o } = e;
  if (r && (r.nextSub = o, e.prevSub = void 0), o && (o.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
    n.computed.flags &= -5;
    for (let s = n.computed.deps; s; s = s.nextDep)
      Yr(s, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Cl(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let Pe = !0;
const Is = [];
function Xe() {
  Is.push(Pe), Pe = !1;
}
function Je() {
  const e = Is.pop();
  Pe = e === void 0 ? !0 : e;
}
function vo(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = te;
    te = void 0;
    try {
      t();
    } finally {
      te = n;
    }
  }
}
let rn = 0;
class Ml {
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
    if (!te || !Pe || te === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== te)
      n = this.activeLink = new Ml(te, this), te.deps ? (n.prevDep = te.depsTail, te.depsTail.nextDep = n, te.depsTail = n) : te.deps = te.depsTail = n, As(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const r = n.nextDep;
      r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = te.depsTail, n.nextDep = void 0, te.depsTail.nextDep = n, te.depsTail = n, te.deps === n && (te.deps = r);
    }
    return n;
  }
  trigger(t) {
    this.version++, rn++, this.notify(t);
  }
  notify(t) {
    qr();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      zr();
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
const Or = /* @__PURE__ */ new WeakMap(), gt = /* @__PURE__ */ Symbol(
  ""
), Pr = /* @__PURE__ */ Symbol(
  ""
), on = /* @__PURE__ */ Symbol(
  ""
);
function ge(e, t, n) {
  if (Pe && te) {
    let r = Or.get(e);
    r || Or.set(e, r = /* @__PURE__ */ new Map());
    let o = r.get(n);
    o || (r.set(n, o = new Xr()), o.map = r, o.key = n), o.track();
  }
}
function ze(e, t, n, r, o, s) {
  const i = Or.get(e);
  if (!i) {
    rn++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if (qr(), t === "clear")
    i.forEach(l);
  else {
    const c = V(e), a = c && Gr(n);
    if (c && n === "length") {
      const u = Number(r);
      i.forEach((p, y) => {
        (y === "length" || y === on || !Ve(y) && y >= u) && l(p);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && l(i.get(n)), a && l(i.get(on)), t) {
        case "add":
          c ? a && l(i.get("length")) : (l(i.get(gt)), it(e) && l(i.get(Pr)));
          break;
        case "delete":
          c || (l(i.get(gt)), it(e) && l(i.get(Pr)));
          break;
        case "set":
          it(e) && l(i.get(gt));
          break;
      }
  }
  zr();
}
function Ot(e) {
  const t = /* @__PURE__ */ q(e);
  return t === e ? t : (ge(t, "iterate", on), /* @__PURE__ */ Ee(e) ? t : t.map(Ie));
}
function Gn(e) {
  return ge(e = /* @__PURE__ */ q(e), "iterate", on), e;
}
function He(e, t) {
  return /* @__PURE__ */ Ze(e) ? kt(/* @__PURE__ */ ht(e) ? Ie(t) : t) : Ie(t);
}
const El = {
  __proto__: null,
  [Symbol.iterator]() {
    return fr(this, Symbol.iterator, (e) => He(this, e));
  },
  concat(...e) {
    return Ot(this).concat(
      ...e.map((t) => V(t) ? Ot(t) : t)
    );
  },
  entries() {
    return fr(this, "entries", (e) => (e[1] = He(this, e[1]), e));
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
      (n) => n.map((r) => He(this, r)),
      arguments
    );
  },
  find(e, t) {
    return Ue(
      this,
      "find",
      e,
      t,
      (n) => He(this, n),
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
      (n) => He(this, n),
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
    return Ue(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Ut(this, "splice", e);
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
    return Ut(this, "unshift", e);
  },
  values() {
    return fr(this, "values", (e) => He(this, e));
  }
};
function fr(e, t, n) {
  const r = Gn(e), o = r[t]();
  return r !== e && !/* @__PURE__ */ Ee(e) && (o._next = o.next, o.next = () => {
    const s = o._next();
    return s.done || (s.value = n(s.value)), s;
  }), o;
}
const Ol = Array.prototype;
function Ue(e, t, n, r, o, s) {
  const i = Gn(e), l = i !== e && !/* @__PURE__ */ Ee(e), c = i[t];
  if (c !== Ol[t]) {
    const p = c.apply(e, s);
    return l ? Ie(p) : p;
  }
  let a = n;
  i !== e && (l ? a = function(p, y) {
    return n.call(this, He(e, p), y, e);
  } : n.length > 2 && (a = function(p, y) {
    return n.call(this, p, y, e);
  }));
  const u = c.call(i, a, r);
  return l && o ? o(u) : u;
}
function wo(e, t, n, r) {
  const o = Gn(e), s = o !== e && !/* @__PURE__ */ Ee(e);
  let i = n, l = !1;
  o !== e && (s ? (l = r.length === 0, i = function(a, u, p) {
    return l && (l = !1, a = He(e, a)), n.call(this, a, He(e, u), p, e);
  }) : n.length > 3 && (i = function(a, u, p) {
    return n.call(this, a, u, p, e);
  }));
  const c = o[t](i, ...r);
  return l ? He(e, c) : c;
}
function dr(e, t, n) {
  const r = /* @__PURE__ */ q(e);
  ge(r, "iterate", on);
  const o = r[t](...n);
  return (o === -1 || o === !1) && /* @__PURE__ */ Qr(n[0]) ? (n[0] = /* @__PURE__ */ q(n[0]), r[t](...n)) : o;
}
function Ut(e, t, n = []) {
  Xe(), qr();
  const r = (/* @__PURE__ */ q(e))[t].apply(e, n);
  return zr(), Je(), r;
}
const Pl = /* @__PURE__ */ Wr("__proto__,__v_isRef,__isVue"), Ts = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Ve)
);
function Il(e) {
  Ve(e) || (e = String(e));
  const t = /* @__PURE__ */ q(this);
  return ge(t, "has", e), t.hasOwnProperty(e);
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
      if (i && (c = El[n]))
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
      /* @__PURE__ */ he(t) ? t : r
    );
    if ((Ve(n) ? Ts.has(n) : Pl(n)) || (o || ge(t, "get", n), s))
      return l;
    if (/* @__PURE__ */ he(l)) {
      const c = i && Gr(n) ? l : l.value;
      return o && X(c) ? /* @__PURE__ */ Ar(c) : c;
    }
    return X(l) ? o ? /* @__PURE__ */ Ar(l) : /* @__PURE__ */ qn(l) : l;
  }
}
class Fs extends Ds {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, o) {
    let s = t[n];
    const i = V(t) && Gr(n);
    if (!this._isShallow) {
      const a = /* @__PURE__ */ Ze(s);
      if (!/* @__PURE__ */ Ee(r) && !/* @__PURE__ */ Ze(r) && (s = /* @__PURE__ */ q(s), r = /* @__PURE__ */ q(r)), !i && /* @__PURE__ */ he(s) && !/* @__PURE__ */ he(r))
        return a || (s.value = r), !0;
    }
    const l = i ? Number(n) < t.length : z(t, n), c = Reflect.set(
      t,
      n,
      r,
      /* @__PURE__ */ he(t) ? t : o
    );
    return t === /* @__PURE__ */ q(o) && c && (l ? Le(r, s) && ze(t, "set", n, r) : ze(t, "add", n, r)), c;
  }
  deleteProperty(t, n) {
    const r = z(t, n);
    t[n];
    const o = Reflect.deleteProperty(t, n);
    return o && r && ze(t, "delete", n, void 0), o;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!Ve(n) || !Ts.has(n)) && ge(t, "has", n), r;
  }
  ownKeys(t) {
    return ge(
      t,
      "iterate",
      V(t) ? "length" : gt
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
const Ir = (e) => e, wn = (e) => Reflect.getPrototypeOf(e);
function jl(e, t, n) {
  return function(...r) {
    const o = this.__v_raw, s = /* @__PURE__ */ q(o), i = it(s), l = e === "entries" || e === Symbol.iterator && i, c = e === "keys" && i, a = o[e](...r), u = n ? Ir : t ? kt : Ie;
    return !t && ge(
      s,
      "iterate",
      c ? Pr : gt
    ), me(
      // inheriting all iterator properties
      Object.create(a),
      {
        // iterator protocol
        next() {
          const { value: p, done: y } = a.next();
          return y ? { value: p, done: y } : {
            value: l ? [u(p[0]), u(p[1])] : u(p),
            done: y
          };
        }
      }
    );
  };
}
function bn(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Hl(e, t) {
  const n = {
    get(o) {
      const s = this.__v_raw, i = /* @__PURE__ */ q(s), l = /* @__PURE__ */ q(o);
      e || (Le(o, l) && ge(i, "get", o), ge(i, "get", l));
      const { has: c } = wn(i), a = t ? Ir : e ? kt : Ie;
      if (c.call(i, o))
        return a(s.get(o));
      if (c.call(i, l))
        return a(s.get(l));
      s !== i && s.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && ge(/* @__PURE__ */ q(o), "iterate", gt), o.size;
    },
    has(o) {
      const s = this.__v_raw, i = /* @__PURE__ */ q(s), l = /* @__PURE__ */ q(o);
      return e || (Le(o, l) && ge(i, "has", o), ge(i, "has", l)), o === l ? s.has(o) : s.has(o) || s.has(l);
    },
    forEach(o, s) {
      const i = this, l = i.__v_raw, c = /* @__PURE__ */ q(l), a = t ? Ir : e ? kt : Ie;
      return !e && ge(c, "iterate", gt), l.forEach((u, p) => o.call(s, a(u), a(p), i));
    }
  };
  return me(
    n,
    e ? {
      add: bn("add"),
      set: bn("set"),
      delete: bn("delete"),
      clear: bn("clear")
    } : {
      add(o) {
        const s = /* @__PURE__ */ q(this), i = wn(s), l = /* @__PURE__ */ q(o), c = !t && !/* @__PURE__ */ Ee(o) && !/* @__PURE__ */ Ze(o) ? l : o;
        return i.has.call(s, c) || Le(o, c) && i.has.call(s, o) || Le(l, c) && i.has.call(s, l) || (s.add(c), ze(s, "add", c, c)), this;
      },
      set(o, s) {
        !t && !/* @__PURE__ */ Ee(s) && !/* @__PURE__ */ Ze(s) && (s = /* @__PURE__ */ q(s));
        const i = /* @__PURE__ */ q(this), { has: l, get: c } = wn(i);
        let a = l.call(i, o);
        a || (o = /* @__PURE__ */ q(o), a = l.call(i, o));
        const u = c.call(i, o);
        return i.set(o, s), a ? Le(s, u) && ze(i, "set", o, s) : ze(i, "add", o, s), this;
      },
      delete(o) {
        const s = /* @__PURE__ */ q(this), { has: i, get: l } = wn(s);
        let c = i.call(s, o);
        c || (o = /* @__PURE__ */ q(o), c = i.call(s, o)), l && l.call(s, o);
        const a = s.delete(o);
        return c && ze(s, "delete", o, void 0), a;
      },
      clear() {
        const o = /* @__PURE__ */ q(this), s = o.size !== 0, i = o.clear();
        return s && ze(
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
    z(n, o) && o in r ? n : r,
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
  return /* @__PURE__ */ Ze(e) ? e : Zr(
    e,
    !1,
    Tl,
    kl,
    js
  );
}
// @__NO_SIDE_EFFECTS__
function Nl(e) {
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
function ht(e) {
  return /* @__PURE__ */ Ze(e) ? /* @__PURE__ */ ht(e.__v_raw) : !!(e && e.__v_isReactive);
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
function q(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ q(t) : e;
}
function Bl(e) {
  return !z(e, "__v_skip") && Object.isExtensible(e) && ws(e, "__v_skip", !0), e;
}
const Ie = (e) => X(e) ? /* @__PURE__ */ qn(e) : e, kt = (e) => X(e) ? /* @__PURE__ */ Ar(e) : e;
// @__NO_SIDE_EFFECTS__
function he(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Pt(e) {
  return Ls(e, !1);
}
// @__NO_SIDE_EFFECTS__
function Wl(e) {
  return Ls(e, !0);
}
function Ls(e, t) {
  return /* @__PURE__ */ he(e) ? e : new Ul(e, t);
}
class Ul {
  constructor(t, n) {
    this.dep = new Xr(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ q(t), this._value = n ? t : Ie(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, r = this.__v_isShallow || /* @__PURE__ */ Ee(t) || /* @__PURE__ */ Ze(t);
    t = r ? t : /* @__PURE__ */ q(t), Le(t, n) && (this._rawValue = t, this._value = r ? t : Ie(t), this.dep.trigger());
  }
}
function Ft(e) {
  return /* @__PURE__ */ he(e) ? e.value : e;
}
const Gl = {
  get: (e, t, n) => t === "__v_raw" ? e : Ft(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return /* @__PURE__ */ he(o) && !/* @__PURE__ */ he(n) ? (o.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function Ks(e) {
  return /* @__PURE__ */ ht(e) ? e : new Proxy(e, Gl);
}
class ql {
  constructor(t, n, r) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Xr(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = rn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    te !== this)
      return Ms(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Ps(this), t && (t.version = this.dep.version), this._value;
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
const _n = {}, An = /* @__PURE__ */ new WeakMap();
let ft;
function Yl(e, t = !1, n = ft) {
  if (n) {
    let r = An.get(n);
    r || An.set(n, r = []), r.push(e);
  }
}
function Xl(e, t, n = ne) {
  const { immediate: r, deep: o, once: s, scheduler: i, augmentJob: l, call: c } = n, a = (I) => o ? I : /* @__PURE__ */ Ee(I) || o === !1 || o === 0 ? st(I, 1) : st(I);
  let u, p, y, v, C = !1, E = !1;
  if (/* @__PURE__ */ he(e) ? (p = () => e.value, C = /* @__PURE__ */ Ee(e)) : /* @__PURE__ */ ht(e) ? (p = () => a(e), C = !0) : V(e) ? (E = !0, C = e.some((I) => /* @__PURE__ */ ht(I) || /* @__PURE__ */ Ee(I)), p = () => e.map((I) => {
    if (/* @__PURE__ */ he(I))
      return I.value;
    if (/* @__PURE__ */ ht(I))
      return a(I);
    if (W(I))
      return c ? c(I, 2) : I();
  })) : W(e) ? t ? p = c ? () => c(e, 2) : e : p = () => {
    if (y) {
      Xe();
      try {
        y();
      } finally {
        Je();
      }
    }
    const I = ft;
    ft = u;
    try {
      return c ? c(e, 3, [v]) : e(v);
    } finally {
      ft = I;
    }
  } : p = $e, t && o) {
    const I = p, N = o === !0 ? 1 / 0 : o;
    p = () => st(I(), N);
  }
  const H = xs(), F = () => {
    u.stop(), H && H.active && Ur(H.effects, u);
  };
  if (s && t) {
    const I = t;
    t = (...N) => {
      const B = I(...N);
      return F(), B;
    };
  }
  let O = E ? new Array(e.length).fill(_n) : _n;
  const k = (I) => {
    if (!(!(u.flags & 1) || !u.dirty && !I))
      if (t) {
        const N = u.run();
        if (I || o || C || (E ? N.some((B, re) => Le(B, O[re])) : Le(N, O))) {
          y && y();
          const B = ft;
          ft = u;
          try {
            const re = [
              N,
              // pass undefined as the old value when it's changed for the first time
              O === _n ? void 0 : E && O[0] === _n ? [] : O,
              v
            ];
            O = N, c ? c(t, 3, re) : (
              // @ts-expect-error
              t(...re)
            );
          } finally {
            ft = B;
          }
        }
      } else
        u.run();
  };
  return l && l(k), u = new Rs(p), u.scheduler = i ? () => i(k, !1) : k, v = (I) => Yl(I, !1, u), y = u.onStop = () => {
    const I = An.get(u);
    if (I) {
      if (c)
        c(I, 4);
      else
        for (const N of I) N();
      An.delete(u);
    }
  }, t ? r ? k(!0) : O = u.run() : i ? i(k.bind(null, !0), !0) : u.run(), F.pause = u.pause.bind(u), F.resume = u.resume.bind(u), F.stop = F, F;
}
function st(e, t = 1 / 0, n) {
  if (t <= 0 || !X(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ he(e))
    st(e.value, t, n);
  else if (V(e))
    for (let r = 0; r < e.length; r++)
      st(e[r], t, n);
  else if (In(e) || it(e))
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
function pn(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (o) {
    zn(o, t, n);
  }
}
function Ae(e, t, n, r) {
  if (W(e)) {
    const o = pn(e, t, n, r);
    return o && hs(o) && o.catch((s) => {
      zn(s, t, n);
    }), o;
  }
  if (V(e)) {
    const o = [];
    for (let s = 0; s < e.length; s++)
      o.push(Ae(e[s], t, n, r));
    return o;
  }
}
function zn(e, t, n, r = !0) {
  const o = t ? t.vnode : null, { errorHandler: s, throwUnhandledErrorInProduction: i } = t && t.appContext.config || ne;
  if (t) {
    let l = t.parent;
    const c = t.proxy, a = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const u = l.ec;
      if (u) {
        for (let p = 0; p < u.length; p++)
          if (u[p](e, c, a) === !1)
            return;
      }
      l = l.parent;
    }
    if (s) {
      Xe(), pn(s, null, 10, [
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
const ve = [];
let je = -1;
const jt = [];
let ot = null, It = 0;
const $s = /* @__PURE__ */ Promise.resolve();
let Tn = null;
function Vs(e) {
  const t = Tn || $s;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Zl(e) {
  let t = je + 1, n = ve.length;
  for (; t < n; ) {
    const r = t + n >>> 1, o = ve[r], s = sn(o);
    s < e || s === e && o.flags & 2 ? t = r + 1 : n = r;
  }
  return t;
}
function eo(e) {
  if (!(e.flags & 1)) {
    const t = sn(e), n = ve[ve.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= sn(n) ? ve.push(e) : ve.splice(Zl(t), 0, e), e.flags |= 1, Ns();
  }
}
function Ns() {
  Tn || (Tn = $s.then(Ws));
}
function Ql(e) {
  if (!V(e))
    ot && e.id === -1 ? ot.splice(It + 1, 0, e) : e.flags & 1 || (jt.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      jt.push(e[t]);
  Ns();
}
function bo(e, t, n = je + 1) {
  for (; n < ve.length; n++) {
    const r = ve[n];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid)
        continue;
      ve.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function Bs(e) {
  if (jt.length) {
    const t = [...new Set(jt)].sort(
      (n, r) => sn(n) - sn(r)
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
const sn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Ws(e) {
  try {
    for (je = 0; je < ve.length; je++) {
      const t = ve[je];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), pn(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; je < ve.length; je++) {
      const t = ve[je];
      t && (t.flags &= -2);
    }
    je = -1, ve.length = 0, Bs(), Tn = null, (ve.length || jt.length) && Ws();
  }
}
let Ke = null, Us = null;
function Dn(e) {
  const t = Ke;
  return Ke = e, Us = e && e.type.__scopeId || null, t;
}
function ec(e, t = Ke, n) {
  if (!t || e._n)
    return e;
  const r = (...o) => {
    r._d && Ao(-1);
    const s = Dn(t), i = mt.length;
    let l;
    try {
      l = e(...o);
    } finally {
      for (let c = mt.length; c > i; c--) yi();
      Dn(s), r._d && Ao(1);
    }
    return l;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function at(e, t, n, r) {
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
  if (we) {
    let n = we.provides;
    const r = we.parent && we.parent.provides;
    r === n && (n = we.provides = Object.create(r)), n[e] = t;
  }
}
function Mn(e, t, n = !1) {
  const r = Zc();
  if (r || Ht) {
    let o = Ht ? Ht._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && W(t) ? t.call(r && r.proxy) : t;
  }
}
const nc = /* @__PURE__ */ Symbol.for("v-scx"), rc = () => Mn(nc);
function _e(e, t, n) {
  return Gs(e, t, n);
}
function Gs(e, t, n = ne) {
  const { immediate: r, deep: o, flush: s, once: i } = n, l = me({}, n), c = t && r || !t && s !== "post";
  let a;
  if (an) {
    if (s === "sync") {
      const v = rc();
      a = v.__watcherHandles || (v.__watcherHandles = []);
    } else if (!c) {
      const v = () => {
      };
      return v.stop = $e, v.resume = $e, v.pause = $e, v;
    }
  }
  const u = we;
  l.call = (v, C, E) => Ae(v, u, C, E);
  let p = !1;
  s === "post" ? l.scheduler = (v) => {
    be(v, u && u.suspense);
  } : s !== "sync" && (p = !0, l.scheduler = (v, C) => {
    C ? v() : eo(v);
  }), l.augmentJob = (v) => {
    t && (v.flags |= 4), p && (v.flags |= 2, u && (v.id = u.uid, v.i = u));
  };
  const y = Xl(e, t, l);
  return an && (a ? a.push(y) : c && y()), y;
}
function oc(e, t, n) {
  const r = this.proxy, o = se(e) ? e.includes(".") ? qs(r, e) : () => r[e] : e.bind(r, r);
  let s;
  W(t) ? s = t : (s = t.handler, n = t);
  const i = gn(this), l = Gs(o, s.bind(r), n);
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
function zs(e) {
  if (!no(e))
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
function to(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    to(
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
function Qt(e, t, n, r, o = !1) {
  if (V(e)) {
    e.forEach(
      (E, H) => Qt(
        E,
        t && (V(t) ? t[H] : t),
        n,
        r,
        o
      )
    );
    return;
  }
  if (en(r) && !o) {
    r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && Qt(e, t, n, r.component.subTree);
    return;
  }
  const s = r.shapeFlag & 4 ? so(r.component) : r.el, i = o ? null : s, { i: l, r: c } = e, a = t && t.r, u = l.refs === ne ? l.refs = {} : l.refs, p = l.setupState, y = /* @__PURE__ */ q(p), v = p === ne ? gs : (E) => _o(u, E) ? !1 : z(y, E), C = (E, H) => !(H && _o(u, H));
  if (a != null && a !== c) {
    if (So(t), se(a))
      u[a] = null, v(a) && (p[a] = null);
    else if (/* @__PURE__ */ he(a)) {
      const E = t;
      C(a, E.k) && (a.value = null), E.k && (u[E.k] = null);
    }
  }
  if (W(c))
    pn(c, l, 12, [i, u]);
  else {
    const E = se(c), H = /* @__PURE__ */ he(c);
    if (E || H) {
      const F = () => {
        if (e.f) {
          const O = E ? v(c) ? p[c] : u[c] : C() || !e.k ? c.value : u[e.k];
          if (o)
            V(O) && Ur(O, s);
          else if (V(O))
            O.includes(s) || O.push(s);
          else if (E)
            u[c] = [s], v(c) && (p[c] = u[c]);
          else {
            const k = [s];
            C(c, e.k) && (c.value = k), e.k && (u[e.k] = k);
          }
        } else E ? (u[c] = i, v(c) && (p[c] = i)) : H && (C(c, e.k) && (c.value = i), e.k && (u[e.k] = i));
      };
      if (i) {
        const O = () => {
          F(), Fn.delete(e);
        };
        O.id = -1, Fn.set(e, O), be(O, n);
      } else
        So(e), F();
    }
  }
}
function So(e) {
  const t = Fn.get(e);
  t && (t.flags |= 8, Fn.delete(e));
}
Wn().requestIdleCallback;
Wn().cancelIdleCallback;
const en = (e) => !!e.type.__asyncLoader, no = (e) => e.type.__isKeepAlive;
function lc(e, t) {
  Xs(e, "a", t);
}
function cc(e, t) {
  Xs(e, "da", t);
}
function Xs(e, t, n = we) {
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
      no(o.parent.vnode) && ac(r, t, n, o), o = o.parent;
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
    Ur(r[t], o);
  }, n);
}
function Xn(e, t, n = we, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), s = t.__weh || (t.__weh = (...i) => {
      Xe();
      const l = gn(n), c = Ae(t, n, e, i);
      return l(), Je(), c;
    });
    return r ? o.unshift(s) : o.push(s), s;
  }
}
const tt = (e) => (t, n = we) => {
  (!an || e === "sp") && Xn(e, (...r) => t(...r), n);
}, uc = tt("bm"), Js = tt("m"), fc = tt(
  "bu"
), dc = tt("u"), Zs = tt(
  "bum"
), Qs = tt("um"), pc = tt(
  "sp"
), gc = tt("rtg"), hc = tt("rtc");
function mc(e, t = we) {
  Xn("ec", e, t);
}
const yc = /* @__PURE__ */ Symbol.for("v-ndc");
function gr(e, t, n, r) {
  let o;
  const s = n, i = V(e);
  if (i || se(e)) {
    const l = i && /* @__PURE__ */ ht(e);
    let c = !1, a = !1;
    l && (c = !/* @__PURE__ */ Ee(e), a = /* @__PURE__ */ Ze(e), e = Gn(e)), o = new Array(e.length);
    for (let u = 0, p = e.length; u < p; u++)
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
const Tr = (e) => e ? _i(e) ? so(e) : Tr(e.parent) : null, tn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ me(/* @__PURE__ */ Object.create(null), {
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
    $nextTick: (e) => e.n || (e.n = Vs.bind(e.proxy)),
    $watch: (e) => oc.bind(e)
  })
), hr = (e, t) => e !== ne && !e.__isScriptSetup && z(e, t), vc = {
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
        if (hr(r, t))
          return i[t] = 1, r[t];
        if (o !== ne && z(o, t))
          return i[t] = 2, o[t];
        if (z(s, t))
          return i[t] = 3, s[t];
        if (n !== ne && z(n, t))
          return i[t] = 4, n[t];
        Dr && (i[t] = 0);
      }
    }
    const a = tn[t];
    let u, p;
    if (a)
      return t === "$attrs" && ge(e.attrs, "get", ""), a(e);
    if (
      // css module (injected by vue-loader)
      (u = l.__cssModules) && (u = u[t])
    )
      return u;
    if (n !== ne && z(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      p = c.config.globalProperties, z(p, t)
    )
      return p[t];
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: o, ctx: s } = e;
    return hr(o, t) ? (o[t] = n, !0) : r !== ne && z(r, t) ? (r[t] = n, !0) : z(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (s[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: o, props: s, type: i }
  }, l) {
    let c;
    return !!(n[l] || e !== ne && l[0] !== "$" && z(e, l) || hr(t, l) || z(s, l) || z(r, l) || z(tn, l) || z(o.config.globalProperties, l) || (c = i.__cssModules) && c[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : z(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function xo(e) {
  return V(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let Dr = !0;
function wc(e) {
  const t = ti(e), n = e.proxy, r = e.ctx;
  Dr = !1, t.beforeCreate && Ro(t.beforeCreate, e, "bc");
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
    beforeMount: p,
    mounted: y,
    beforeUpdate: v,
    updated: C,
    activated: E,
    deactivated: H,
    beforeDestroy: F,
    beforeUnmount: O,
    destroyed: k,
    unmounted: I,
    render: N,
    renderTracked: B,
    renderTriggered: re,
    errorCaptured: K,
    serverPrefetch: D,
    // public API
    expose: U,
    inheritAttrs: J,
    // assets
    components: Q,
    directives: ie,
    filters: ce
  } = t;
  if (a && bc(a, r, null), i)
    for (const G in i) {
      const Y = i[G];
      W(Y) && (r[G] = Y.bind(n));
    }
  if (o) {
    const G = o.call(n, n);
    X(G) && (e.data = /* @__PURE__ */ qn(G));
  }
  if (Dr = !0, s)
    for (const G in s) {
      const Y = s[G], Ne = W(Y) ? Y.bind(n, n) : W(Y.get) ? Y.get.bind(n, n) : $e, ct = !W(Y) && W(Y.set) ? Y.set.bind(n) : $e, Be = ue({
        get: Ne,
        set: ct
      });
      Object.defineProperty(r, G, {
        enumerable: !0,
        configurable: !0,
        get: () => Be.value,
        set: (Ce) => Be.value = Ce
      });
    }
  if (l)
    for (const G in l)
      ei(l[G], r, n, G);
  if (c) {
    const G = W(c) ? c.call(n) : c;
    Reflect.ownKeys(G).forEach((Y) => {
      tc(Y, G[Y]);
    });
  }
  u && Ro(u, e, "c");
  function ee(G, Y) {
    V(Y) ? Y.forEach((Ne) => G(Ne.bind(n))) : Y && G(Y.bind(n));
  }
  if (ee(uc, p), ee(Js, y), ee(fc, v), ee(dc, C), ee(lc, E), ee(cc, H), ee(mc, K), ee(hc, B), ee(gc, re), ee(Zs, O), ee(Qs, I), ee(pc, D), V(U))
    if (U.length) {
      const G = e.exposed || (e.exposed = {});
      U.forEach((Y) => {
        Object.defineProperty(G, Y, {
          get: () => n[Y],
          set: (Ne) => n[Y] = Ne,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  N && e.render === $e && (e.render = N), J != null && (e.inheritAttrs = J), Q && (e.components = Q), ie && (e.directives = ie), D && Ys(e);
}
function bc(e, t, n = $e) {
  V(e) && (e = Fr(e));
  for (const r in e) {
    const o = e[r];
    let s;
    X(o) ? "default" in o ? s = Mn(
      o.from || r,
      o.default,
      !0
    ) : s = Mn(o.from || r) : s = Mn(o), /* @__PURE__ */ he(s) ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (i) => s.value = i
    }) : t[r] = s;
  }
}
function Ro(e, t, n) {
  Ae(
    V(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function ei(e, t, n, r) {
  let o = r.includes(".") ? qs(n, r) : () => n[r];
  if (se(e)) {
    const s = t[e];
    W(s) && _e(o, s);
  } else if (W(e))
    _e(o, e.bind(n));
  else if (X(e))
    if (V(e))
      e.forEach((s) => ei(s, t, n, r));
    else {
      const s = W(e.handler) ? e.handler.bind(n) : t[e.handler];
      W(s) && _e(o, s, e);
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
  ), jn(c, t, i)), X(t) && s.set(t, c), c;
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
  methods: zt,
  computed: zt,
  // lifecycle
  beforeCreate: ye,
  created: ye,
  beforeMount: ye,
  mounted: ye,
  beforeUpdate: ye,
  updated: ye,
  beforeDestroy: ye,
  beforeUnmount: ye,
  destroyed: ye,
  unmounted: ye,
  activated: ye,
  deactivated: ye,
  errorCaptured: ye,
  serverPrefetch: ye,
  // assets
  components: zt,
  directives: zt,
  // watch
  watch: xc,
  // provide / inject
  provide: Co,
  inject: Sc
};
function Co(e, t) {
  return t ? e ? function() {
    return me(
      W(e) ? e.call(this, this) : e,
      W(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Sc(e, t) {
  return zt(Fr(e), Fr(t));
}
function Fr(e) {
  if (V(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function ye(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function zt(e, t) {
  return e ? me(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Mo(e, t) {
  return e ? V(e) && V(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : me(
    /* @__PURE__ */ Object.create(null),
    xo(e),
    xo(t ?? {})
  ) : t;
}
function xc(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = me(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = ye(e[r], t[r]);
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
    W(r) || (r = me({}, r)), o != null && !X(o) && (o = null);
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
      use(u, ...p) {
        return i.has(u) || (u && W(u.install) ? (i.add(u), u.install(a, ...p)) : W(u) && (i.add(u), u(a, ...p))), a;
      },
      mixin(u) {
        return s.mixins.includes(u) || s.mixins.push(u), a;
      },
      component(u, p) {
        return p ? (s.components[u] = p, a) : s.components[u];
      },
      directive(u, p) {
        return p ? (s.directives[u] = p, a) : s.directives[u];
      },
      mount(u, p, y) {
        if (!c) {
          const v = a._ceVNode || Ye(r, o);
          return v.appContext = s, y === !0 ? y = "svg" : y === !1 && (y = void 0), e(v, u, y), c = !0, a._container = u, u.__vue_app__ = a, so(v.component);
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
      provide(u, p) {
        return s.provides[u] = p, a;
      },
      runWithContext(u) {
        const p = Ht;
        Ht = a;
        try {
          return u();
        } finally {
          Ht = p;
        }
      }
    };
    return a;
  };
}
let Ht = null;
const Mc = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Oe(t)}Modifiers`] || e[`${_t(t)}Modifiers`];
function Ec(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || ne;
  let o = n;
  const s = t.startsWith("update:"), i = s && Mc(r, t.slice(7));
  i && (i.trim && (o = n.map((u) => se(u) ? u.trim() : u)), i.number && (o = o.map(hl)));
  let l, c = r[l = lr(t)] || // also try camelCase event handler (#2249)
  r[l = lr(Oe(t))];
  !c && s && (c = r[l = lr(_t(t))]), c && Ae(
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
  if (!W(e)) {
    const c = (a) => {
      const u = ri(a, t, !0);
      u && (l = !0, me(i, u));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !s && !l ? (X(e) && r.set(e, null), null) : (V(s) ? s.forEach((c) => i[c] = null) : me(i, s), X(e) && r.set(e, i), i);
}
function Jn(e, t) {
  return !e || !Vn(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), z(e, t[0].toLowerCase() + t.slice(1)) || z(e, _t(t)) || z(e, t));
}
function Eo(e) {
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
    props: p,
    data: y,
    setupState: v,
    ctx: C,
    inheritAttrs: E
  } = e, H = Dn(e);
  let F, O;
  try {
    if (n.shapeFlag & 4) {
      const I = o || r, N = I;
      F = ke(
        a.call(
          N,
          I,
          u,
          p,
          v,
          y,
          C
        )
      ), O = l;
    } else {
      const I = t;
      F = ke(
        I.length > 1 ? I(
          p,
          { attrs: l, slots: i, emit: c }
        ) : I(
          p,
          null
        )
      ), O = t.props ? l : Pc(l);
    }
  } catch (I) {
    mt.length = 0, zn(I, e, 1), F = Ye(Qe);
  }
  let k = F;
  if (O && E !== !1) {
    const I = Object.keys(O), { shapeFlag: N } = k;
    I.length && N & 7 && (s && I.some(Nn) && (O = Ic(
      O,
      s
    )), k = Lt(k, O, !1, !0));
  }
  if (n.dirs && (k = Lt(k, null, !1, !0), k.dirs = k.dirs ? k.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const I = Yn(k.type) && zs(k) || k;
    to(I, n.transition);
  }
  return F = k, Dn(H), F;
}
const Pc = (e) => {
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
      return r ? Oo(r, i, a) : !!i;
    if (c & 8) {
      const u = t.dynamicProps;
      for (let p = 0; p < u.length; p++) {
        const y = u[p];
        if (oi(i, r, y) && !Jn(a, y))
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
    if (oi(t, e, s) && !Jn(n, s))
      return !0;
  }
  return !1;
}
function oi(e, t, n) {
  const r = e[n], o = t[n];
  return n === "style" && X(r) && X(o) ? !Un(r, o) : r !== o;
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
  } = e, l = /* @__PURE__ */ q(o), [c] = e.propsOptions;
  let a = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (r || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const u = e.vnode.dynamicProps;
      for (let p = 0; p < u.length; p++) {
        let y = u[p];
        if (Jn(e.emitsOptions, y))
          continue;
        const v = t[y];
        if (c)
          if (z(s, y))
            v !== s[y] && (s[y] = v, a = !0);
          else {
            const C = Oe(y);
            o[C] = jr(
              c,
              l,
              C,
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
    for (const p in l)
      (!t || // for camelCase
      !z(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((u = _t(p)) === p || !z(t, u))) && (c ? n && // for camelCase
      (n[p] !== void 0 || // for kebab-case
      n[u] !== void 0) && (o[p] = jr(
        c,
        l,
        p,
        void 0,
        e,
        !0
      )) : delete o[p]);
    if (s !== l)
      for (const p in s)
        (!t || !z(t, p)) && (delete s[p], a = !0);
  }
  a && ze(e.attrs, "set", "");
}
function ci(e, t, n, r) {
  const [o, s] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let c in t) {
      if (Xt(c))
        continue;
      const a = t[c];
      let u;
      o && z(o, u = Oe(c)) ? !s || !s.includes(u) ? n[u] = a : (l || (l = {}))[u] = a : Jn(e.emitsOptions, c) || (!(c in r) || a !== r[c]) && (r[c] = a, i = !0);
    }
  if (s) {
    const c = /* @__PURE__ */ q(n), a = l || ne;
    for (let u = 0; u < s.length; u++) {
      const p = s[u];
      n[p] = jr(
        o,
        c,
        p,
        a[p],
        e,
        !z(a, p)
      );
    }
  }
  return i;
}
function jr(e, t, n, r, o, s) {
  const i = e[n];
  if (i != null) {
    const l = z(i, "default");
    if (l && r === void 0) {
      const c = i.default;
      if (i.type !== Function && !i.skipFactory && W(c)) {
        const { propsDefaults: a } = o;
        if (n in a)
          r = a[n];
        else {
          const u = gn(o);
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
    ] && (r === "" || r === _t(n)) && (r = !0));
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
    const u = (p) => {
      c = !0;
      const [y, v] = ai(p, t, !0);
      me(i, y), v && l.push(...v);
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  if (!s && !c)
    return X(e) && r.set(e, Tt), Tt;
  if (V(s))
    for (let u = 0; u < s.length; u++) {
      const p = Oe(s[u]);
      Po(p) && (i[p] = ne);
    }
  else if (s)
    for (const u in s) {
      const p = Oe(u);
      if (Po(p)) {
        const y = s[u], v = i[p] = V(y) || W(y) ? { type: y } : me({}, y), C = v.type;
        let E = !1, H = !0;
        if (V(C))
          for (let F = 0; F < C.length; ++F) {
            const O = C[F], k = W(O) && O.name;
            if (k === "Boolean") {
              E = !0;
              break;
            } else k === "String" && (H = !1);
          }
        else
          E = W(C) && C.name === "Boolean";
        v[
          0
          /* shouldCast */
        ] = E, v[
          1
          /* shouldCastTrue */
        ] = H, (E || z(v, "default")) && l.push(p);
      }
    }
  const a = [i, l];
  return X(e) && r.set(e, a), a;
}
function Po(e) {
  return e[0] !== "$" && !Xt(e);
}
const ro = (e) => e === "_" || e === "_ctx" || e === "$stable", oo = (e) => V(e) ? e.map(ke) : [ke(e)], Hc = (e, t, n) => {
  if (t._n)
    return t;
  const r = ec((...o) => oo(t(...o)), n);
  return r._c = !1, r;
}, ui = (e, t, n) => {
  const r = e._ctx;
  for (const o in e) {
    if (ro(o)) continue;
    const s = e[o];
    if (W(s))
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
  let s = !0, i = ne;
  if (r.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? s = !1 : di(o, t, n) : (s = !t.$stable, ui(t, o)), i = t;
  } else t && (fi(e, t), i = { default: 1 });
  if (s)
    for (const l in o)
      !ro(l) && i[l] == null && delete o[l];
}, be = Bc;
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
    parentNode: p,
    nextSibling: y,
    setScopeId: v = $e,
    insertStaticContent: C
  } = e, E = (f, d, m, x = null, S = null, b = null, A = void 0, M = null, P = !!d.dynamicChildren) => {
    if (f === d)
      return;
    f && !Gt(f, d) && (x = Mt(f), Ce(f, S, b, !0), f = null), d.patchFlag === -2 && (P = !1, d.dynamicChildren = null);
    const { type: _, ref: L, shapeFlag: T } = d;
    switch (_) {
      case Zn:
        H(f, d, m, x);
        break;
      case Qe:
        F(f, d, m, x);
        break;
      case yr:
        f == null && O(d, m, x, A);
        break;
      case xe:
        Q(
          f,
          d,
          m,
          x,
          S,
          b,
          A,
          M,
          P
        );
        break;
      default:
        T & 1 ? N(
          f,
          d,
          m,
          x,
          S,
          b,
          A,
          M,
          P
        ) : T & 6 ? ie(
          f,
          d,
          m,
          x,
          S,
          b,
          A,
          M,
          P
        ) : (T & 64 || T & 128) && _.process(
          f,
          d,
          m,
          x,
          S,
          b,
          A,
          M,
          P,
          We
        );
    }
    L != null && S ? Qt(L, f && f.ref, b, d || f, !d) : L == null && f && f.ref != null && Qt(f.ref, null, b, f, !0);
  }, H = (f, d, m, x) => {
    if (f == null)
      r(
        d.el = l(d.children),
        m,
        x
      );
    else {
      const S = d.el = f.el;
      d.children !== f.children && a(S, d.children);
    }
  }, F = (f, d, m, x) => {
    f == null ? r(
      d.el = c(d.children || ""),
      m,
      x
    ) : d.el = f.el;
  }, O = (f, d, m, x) => {
    [f.el, f.anchor] = C(
      f.children,
      d,
      m,
      x,
      f.el,
      f.anchor
    );
  }, k = ({ el: f, anchor: d }, m, x) => {
    let S;
    for (; f && f !== d; )
      S = y(f), r(f, m, x), f = S;
    r(d, m, x);
  }, I = ({ el: f, anchor: d }) => {
    let m;
    for (; f && f !== d; )
      m = y(f), o(f), f = m;
    o(d);
  }, N = (f, d, m, x, S, b, A, M, P) => {
    if (d.type === "svg" ? A = "svg" : d.type === "math" && (A = "mathml"), f == null)
      B(
        d,
        m,
        x,
        S,
        b,
        A,
        M,
        P
      );
    else {
      const _ = f.el && f.el._isVueCE ? f.el : null;
      try {
        _ && _._beginPatch(), D(
          f,
          d,
          S,
          b,
          A,
          M,
          P
        );
      } finally {
        _ && _._endPatch();
      }
    }
  }, B = (f, d, m, x, S, b, A, M) => {
    let P, _;
    const { props: L, shapeFlag: T, transition: j, dirs: g } = f;
    if (P = f.el = i(
      f.type,
      b,
      L && L.is,
      L
    ), T & 8 ? u(P, f.children) : T & 16 && K(
      f.children,
      P,
      null,
      x,
      S,
      mr(f, b),
      A,
      M
    ), g && at(f, null, x, "created"), re(P, f, f.scopeId, A, x), L) {
      for (const w in L)
        w !== "value" && !Xt(w) && s(P, w, null, L[w], b, x);
      "value" in L && s(P, "value", null, L.value, b), (_ = L.onVnodeBeforeMount) && Fe(_, x, f);
    }
    g && at(f, null, x, "beforeMount");
    const h = Vc(S, j);
    h && j.beforeEnter(P), r(P, d, m), ((_ = L && L.onVnodeMounted) || h || g) && be(() => {
      try {
        _ && Fe(_, x, f), h && j.enter(P), g && at(f, null, x, "mounted");
      } finally {
      }
    }, S);
  }, re = (f, d, m, x, S) => {
    if (m && v(f, m), x)
      for (let b = 0; b < x.length; b++)
        v(f, x[b]);
    if (S) {
      let b = S.subTree;
      if (d === b || mi(b.type) && (b.ssContent === d || b.ssFallback === d)) {
        const A = S.vnode;
        re(
          f,
          A,
          A.scopeId,
          A.slotScopeIds,
          S.parent
        );
      }
    }
  }, K = (f, d, m, x, S, b, A, M, P = 0) => {
    for (let _ = P; _ < f.length; _++) {
      const L = f[_] = M ? qe(f[_]) : ke(f[_]);
      E(
        null,
        L,
        d,
        m,
        x,
        S,
        b,
        A,
        M
      );
    }
  }, D = (f, d, m, x, S, b, A) => {
    const M = d.el = f.el;
    let { patchFlag: P, dynamicChildren: _, dirs: L } = d;
    P |= f.patchFlag & 16;
    const T = f.props || ne, j = d.props || ne;
    let g;
    if (m && ut(m, !1), (g = j.onVnodeBeforeUpdate) && Fe(g, m, d, f), L && at(d, f, m, "beforeUpdate"), m && ut(m, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    _ && (!f.dynamicChildren || f.dynamicChildren.length !== _.length) && (P = 0, A = !1, _ = null), (T.innerHTML && j.innerHTML == null || T.textContent && j.textContent == null) && u(M, ""), _ ? U(
      f.dynamicChildren,
      _,
      M,
      m,
      x,
      mr(d, S),
      b
    ) : A || Y(
      f,
      d,
      M,
      null,
      m,
      x,
      mr(d, S),
      b,
      !1
    ), P > 0) {
      if (P & 16)
        J(M, T, j, m, S);
      else if (P & 2 && T.class !== j.class && s(M, "class", null, j.class, S), P & 4 && s(M, "style", T.style, j.style, S), P & 8) {
        const h = d.dynamicProps;
        for (let w = 0; w < h.length; w++) {
          const R = h[w], $ = T[R], oe = j[R];
          (oe !== $ || R === "value") && s(M, R, $, oe, S, m);
        }
      }
      P & 1 && f.children !== d.children && u(M, d.children);
    } else !A && _ == null && J(M, T, j, m, S);
    ((g = j.onVnodeUpdated) || L) && be(() => {
      g && Fe(g, m, d, f), L && at(d, f, m, "updated");
    }, x);
  }, U = (f, d, m, x, S, b, A) => {
    for (let M = 0; M < d.length; M++) {
      const P = f[M], _ = d[M], L = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        P.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (P.type === xe || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Gt(P, _) || // - In the case of a component, it could contain anything.
        P.shapeFlag & 198) ? p(P.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          m
        )
      );
      E(
        P,
        _,
        L,
        null,
        x,
        S,
        b,
        A,
        !0
      );
    }
  }, J = (f, d, m, x, S) => {
    if (d !== m) {
      if (d !== ne)
        for (const b in d)
          !Xt(b) && !(b in m) && s(
            f,
            b,
            d[b],
            null,
            S,
            x
          );
      for (const b in m) {
        if (Xt(b)) continue;
        const A = m[b], M = d[b];
        A !== M && b !== "value" && s(f, b, M, A, S, x);
      }
      "value" in m && s(f, "value", d.value, m.value, S);
    }
  }, Q = (f, d, m, x, S, b, A, M, P) => {
    const _ = d.el = f ? f.el : l(""), L = d.anchor = f ? f.anchor : l("");
    let { patchFlag: T, dynamicChildren: j, slotScopeIds: g } = d;
    g && (M = M ? M.concat(g) : g), f == null ? (r(_, m, x), r(L, m, x), K(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      d.children || [],
      m,
      L,
      S,
      b,
      A,
      M,
      P
    )) : T > 0 && T & 64 && j && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    f.dynamicChildren && f.dynamicChildren.length === j.length ? (U(
      f.dynamicChildren,
      j,
      m,
      S,
      b,
      A,
      M
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (d.key != null || S && d === S.subTree) && pi(
      f,
      d,
      !0
      /* shallow */
    )) : Y(
      f,
      d,
      m,
      L,
      S,
      b,
      A,
      M,
      P
    );
  }, ie = (f, d, m, x, S, b, A, M, P) => {
    d.slotScopeIds = M, f == null ? d.shapeFlag & 512 ? S.ctx.activate(
      d,
      m,
      x,
      A,
      P
    ) : ce(
      d,
      m,
      x,
      S,
      b,
      A,
      P
    ) : ae(f, d, P);
  }, ce = (f, d, m, x, S, b, A) => {
    const M = f.component = Jc(
      f,
      x,
      S
    );
    if (no(f) && (M.ctx.renderer = We), Qc(M, !1, A), M.asyncDep) {
      if (S && S.registerDep(M, ee, A), !f.el) {
        const P = M.subTree = Ye(Qe);
        F(null, P, d, m), f.placeholder = P.el;
      }
    } else
      ee(
        M,
        f,
        d,
        m,
        S,
        b,
        A
      );
  }, ae = (f, d, m) => {
    const x = d.component = f.component;
    if (Ac(f, d, m))
      if (x.asyncDep && !x.asyncResolved) {
        G(x, d, m);
        return;
      } else
        x.next = d, x.update();
    else
      d.el = f.el, x.vnode = d;
  }, ee = (f, d, m, x, S, b, A) => {
    const M = () => {
      if (f.isMounted) {
        let { next: T, bu: j, u: g, parent: h, vnode: w } = f;
        {
          const Te = gi(f);
          if (Te) {
            T && (T.el = w.el, G(f, T, A)), Te.asyncDep.then(() => {
              be(() => {
                f.isUnmounted || _();
              }, S);
            });
            return;
          }
        }
        let R = T, $;
        ut(f, !1), T ? (T.el = w.el, G(f, T, A)) : T = w, j && cr(j), ($ = T.props && T.props.onVnodeBeforeUpdate) && Fe($, h, T, w), ut(f, !0);
        const oe = Eo(f), Me = f.subTree;
        f.subTree = oe, E(
          Me,
          oe,
          // parent may have changed if it's in a teleport
          p(Me.el),
          // anchor may have changed if it's in a fragment
          Mt(Me),
          f,
          S,
          b
        ), T.el = oe.el, R === null && Tc(f, oe.el), g && be(g, S), ($ = T.props && T.props.onVnodeUpdated) && be(
          () => Fe($, h, T, w),
          S
        );
      } else {
        let T;
        const { el: j, props: g } = d, { bm: h, m: w, parent: R, root: $, type: oe } = f, Me = en(d);
        ut(f, !1), h && cr(h), !Me && (T = g && g.onVnodeBeforeMount) && Fe(T, R, d), ut(f, !0);
        {
          $.ce && $.ce._hasShadowRoot() && $.ce._injectChildStyle(
            oe,
            f.parent ? f.parent.type : void 0
          );
          const Te = f.subTree = Eo(f);
          E(
            null,
            Te,
            m,
            x,
            f,
            S,
            b
          ), d.el = Te.el;
        }
        if (w && be(w, S), !Me && (T = g && g.onVnodeMounted)) {
          const Te = d;
          be(
            () => Fe(T, R, Te),
            S
          );
        }
        (d.shapeFlag & 256 || R && en(R.vnode) && R.vnode.shapeFlag & 256) && f.a && be(f.a, S), f.isMounted = !0, d = m = x = null;
      }
    };
    f.scope.on();
    const P = f.effect = new Rs(M);
    f.scope.off();
    const _ = f.update = P.run.bind(P), L = f.job = P.runIfDirty.bind(P);
    L.i = f, L.id = f.uid, P.scheduler = () => eo(L), ut(f, !0), _();
  }, G = (f, d, m) => {
    d.component = f;
    const x = f.vnode.props;
    f.vnode = d, f.next = null, Fc(f, d.props, x, m), Lc(f, d.children, m), Xe(), bo(f), Je();
  }, Y = (f, d, m, x, S, b, A, M, P = !1) => {
    const _ = f && f.children, L = f ? f.shapeFlag : 0, T = d.children, { patchFlag: j, shapeFlag: g } = d;
    if (j > 0) {
      if (j & 128) {
        ct(
          _,
          T,
          m,
          x,
          S,
          b,
          A,
          M,
          P
        );
        return;
      } else if (j & 256) {
        Ne(
          _,
          T,
          m,
          x,
          S,
          b,
          A,
          M,
          P
        );
        return;
      }
    }
    g & 8 ? (L & 16 && nt(_, S, b), T !== _ && u(m, T)) : L & 16 ? g & 16 ? ct(
      _,
      T,
      m,
      x,
      S,
      b,
      A,
      M,
      P
    ) : nt(_, S, b, !0) : (L & 8 && u(m, ""), g & 16 && K(
      T,
      m,
      x,
      S,
      b,
      A,
      M,
      P
    ));
  }, Ne = (f, d, m, x, S, b, A, M, P) => {
    f = f || Tt, d = d || Tt;
    const _ = f.length, L = d.length, T = Math.min(_, L);
    let j;
    for (j = 0; j < T; j++) {
      const g = d[j] = P ? qe(d[j]) : ke(d[j]);
      E(
        f[j],
        g,
        m,
        null,
        S,
        b,
        A,
        M,
        P
      );
    }
    _ > L ? nt(
      f,
      S,
      b,
      !0,
      !1,
      T
    ) : K(
      d,
      m,
      x,
      S,
      b,
      A,
      M,
      P,
      T
    );
  }, ct = (f, d, m, x, S, b, A, M, P) => {
    let _ = 0;
    const L = d.length;
    let T = f.length - 1, j = L - 1;
    for (; _ <= T && _ <= j; ) {
      const g = f[_], h = d[_] = P ? qe(d[_]) : ke(d[_]);
      if (Gt(g, h))
        E(
          g,
          h,
          m,
          null,
          S,
          b,
          A,
          M,
          P
        );
      else
        break;
      _++;
    }
    for (; _ <= T && _ <= j; ) {
      const g = f[T], h = d[j] = P ? qe(d[j]) : ke(d[j]);
      if (Gt(g, h))
        E(
          g,
          h,
          m,
          null,
          S,
          b,
          A,
          M,
          P
        );
      else
        break;
      T--, j--;
    }
    if (_ > T) {
      if (_ <= j) {
        const g = j + 1, h = g < L ? d[g].el : x;
        for (; _ <= j; )
          E(
            null,
            d[_] = P ? qe(d[_]) : ke(d[_]),
            m,
            h,
            S,
            b,
            A,
            M,
            P
          ), _++;
      }
    } else if (_ > j)
      for (; _ <= T; )
        Ce(f[_], S, b, !0), _++;
    else {
      const g = _, h = _, w = /* @__PURE__ */ new Map();
      for (_ = h; _ <= j; _++) {
        const Se = d[_] = P ? qe(d[_]) : ke(d[_]);
        Se.key != null && w.set(Se.key, _);
      }
      let R, $ = 0;
      const oe = j - h + 1;
      let Me = !1, Te = 0;
      const Wt = new Array(oe);
      for (_ = 0; _ < oe; _++) Wt[_] = 0;
      for (_ = g; _ <= T; _++) {
        const Se = f[_];
        if ($ >= oe) {
          Ce(Se, S, b, !0);
          continue;
        }
        let De;
        if (Se.key != null)
          De = w.get(Se.key);
        else
          for (R = h; R <= j; R++)
            if (Wt[R - h] === 0 && Gt(Se, d[R])) {
              De = R;
              break;
            }
        De === void 0 ? Ce(Se, S, b, !0) : (Wt[De - h] = _ + 1, De >= Te ? Te = De : Me = !0, E(
          Se,
          d[De],
          m,
          null,
          S,
          b,
          A,
          M,
          P
        ), $++);
      }
      const fo = Me ? Nc(Wt) : Tt;
      for (R = fo.length - 1, _ = oe - 1; _ >= 0; _--) {
        const Se = h + _, De = d[Se], po = d[Se + 1], go = Se + 1 < L ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          po.el || hi(po)
        ) : x;
        Wt[_] === 0 ? E(
          null,
          De,
          m,
          go,
          S,
          b,
          A,
          M,
          P
        ) : Me && (R < 0 || _ !== fo[R] ? Be(De, m, go, 2) : R--);
      }
    }
  }, Be = (f, d, m, x, S = null) => {
    const { el: b, type: A, transition: M, children: P, shapeFlag: _ } = f;
    if (_ & 6) {
      Be(f.component.subTree, d, m, x);
      return;
    }
    if (_ & 128) {
      f.suspense.move(d, m, x);
      return;
    }
    if (_ & 64) {
      A.move(f, d, m, We);
      return;
    }
    if (A === xe) {
      r(b, d, m);
      for (let T = 0; T < P.length; T++)
        Be(P[T], d, m, x);
      r(f.anchor, d, m);
      return;
    }
    if (A === yr) {
      k(f, d, m);
      return;
    }
    if (x !== 2 && _ & 1 && M)
      if (x === 0)
        M.persisted && !b[pr] ? r(b, d, m) : (M.beforeEnter(b), r(b, d, m), be(() => M.enter(b), S));
      else {
        const { leave: T, delayLeave: j, afterLeave: g } = M, h = () => {
          f.ctx.isUnmounted ? o(b) : r(b, d, m);
        }, w = () => {
          const R = b._isLeaving || !!b[pr];
          b._isLeaving && b[pr](
            !0
            /* cancelled */
          ), M.persisted && !R ? h() : T(b, () => {
            h(), g && g();
          });
        };
        j ? j(b, h, w) : w();
      }
    else
      r(b, d, m);
  }, Ce = (f, d, m, x = !1, S = !1) => {
    const {
      type: b,
      props: A,
      ref: M,
      children: P,
      dynamicChildren: _,
      shapeFlag: L,
      patchFlag: T,
      dirs: j,
      cacheIndex: g,
      memo: h
    } = f;
    if (T === -2 && (S = !1), M != null && (Xe(), Qt(M, null, m, f, !0), Je()), g != null && (d.renderCache[g] = void 0), L & 256) {
      d.ctx.deactivate(f);
      return;
    }
    const w = L & 1 && j, R = !en(f);
    let $;
    if (R && ($ = A && A.onVnodeBeforeUnmount) && Fe($, d, f), L & 6)
      Ct(f.component, m, x);
    else {
      if (L & 128) {
        f.suspense.unmount(m, x);
        return;
      }
      w && at(f, null, d, "beforeUnmount"), L & 64 ? f.type.remove(
        f,
        d,
        m,
        We,
        x
      ) : _ && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !_.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (b !== xe || T > 0 && T & 64) ? nt(
        _,
        d,
        m,
        !1,
        !0
      ) : (b === xe && T & 384 || !S && L & 16) && nt(P, d, m), x && Rt(f);
    }
    const oe = h != null && g == null;
    (R && ($ = A && A.onVnodeUnmounted) || w || oe) && be(() => {
      $ && Fe($, d, f), w && at(f, null, d, "unmounted"), oe && (f.el = null);
    }, m);
  }, Rt = (f) => {
    const { type: d, el: m, anchor: x, transition: S } = f;
    if (d === xe) {
      Nt(m, x);
      return;
    }
    if (d === yr) {
      I(f);
      return;
    }
    const b = () => {
      o(m), S && !S.persisted && S.afterLeave && S.afterLeave();
    };
    if (f.shapeFlag & 1 && S && !S.persisted) {
      const { leave: A, delayLeave: M } = S, P = () => A(m, b);
      M ? M(f.el, b, P) : P();
    } else
      b();
  }, Nt = (f, d) => {
    let m;
    for (; f !== d; )
      m = y(f), o(f), f = m;
    o(d);
  }, Ct = (f, d, m) => {
    const { bum: x, scope: S, job: b, subTree: A, um: M, m: P, a: _ } = f;
    Io(P), Io(_), x && cr(x), S.stop(), b && (b.flags |= 8, Ce(A, f, d, m)), M && be(M, d), be(() => {
      f.isUnmounted = !0;
    }, d);
  }, nt = (f, d, m, x = !1, S = !1, b = 0) => {
    for (let A = b; A < f.length; A++)
      Ce(f[A], d, m, x, S);
  }, Mt = (f) => {
    if (f.shapeFlag & 6)
      return Mt(f.component.subTree);
    if (f.shapeFlag & 128)
      return f.suspense.next();
    const d = y(f.anchor || f.el), m = d && d[sc];
    return m ? y(m) : d;
  };
  let Bt = !1;
  const vn = (f, d, m) => {
    let x;
    f == null ? d._vnode && (Ce(d._vnode, null, null, !0), x = d._vnode.component) : E(
      d._vnode || null,
      f,
      d,
      null,
      null,
      null,
      m
    ), d._vnode = f, Bt || (Bt = !0, bo(x), Bs(), Bt = !1);
  }, We = {
    p: E,
    um: Ce,
    m: Be,
    r: Rt,
    mt: ce,
    mc: K,
    pc: Y,
    pbc: U,
    n: Mt,
    o: e
  };
  return {
    render: vn,
    hydrate: void 0,
    createApp: Cc(vn)
  };
}
function mr({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function ut({ effect: e, job: t }, n) {
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
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = o[s] = qe(o[s]), l.el = i.el), !n && l.patchFlag !== -2 && pi(i, l)), l.type === Zn && (l.patchFlag === -1 && (l = o[s] = qe(l)), l.el = i.el), l.type === Qe && !l.el && (l.el = i.el);
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
const xe = /* @__PURE__ */ Symbol.for("v-fgt"), Zn = /* @__PURE__ */ Symbol.for("v-txt"), Qe = /* @__PURE__ */ Symbol.for("v-cmt"), yr = /* @__PURE__ */ Symbol.for("v-stc"), mt = [];
let Re = null;
function fe(e = !1) {
  mt.push(Re = e ? null : []);
}
function yi() {
  mt.pop(), Re = mt[mt.length - 1] || null;
}
let ln = 1;
function Ao(e, t = !1) {
  ln += e, e < 0 && Re && t && (Re.hasOnce = !0);
}
function vi(e) {
  return e.dynamicChildren = ln > 0 ? Re || Tt : null, yi(), ln > 0 && Re && Re.push(e), e;
}
function pe(e, t, n, r, o, s) {
  return vi(
    dt(
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
    Ye(
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
const bi = ({ key: e }) => e ?? null, En = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? se(e) || /* @__PURE__ */ he(e) || W(e) ? { i: Ke, r: e, k: t, f: !!n } : e : null);
function dt(e, t = null, n = null, r = 0, o = null, s = e === xe ? 0 : 1, i = !1, l = !1) {
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
    ctx: Ke
  };
  return l ? (Hn(c, n), s & 128 && e.normalize(c)) : n && (c.shapeFlag |= se(n) ? 8 : 16), ln > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  Re && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && Re.push(c), c;
}
const Ye = Uc;
function Uc(e, t = null, n = null, r = 0, o = null, s = !1) {
  if ((!e || e === yc) && (e = Qe), wi(e)) {
    const l = Lt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Hn(l, n), ln > 0 && !s && Re && (l.shapeFlag & 6 ? Re[Re.indexOf(e)] = l : Re.push(l)), l.patchFlag = -2, l;
  }
  if (ra(e) && (e = e.__vccOpts), t) {
    t = Gc(t);
    let { class: l, style: c } = t;
    l && !se(l) && (t.class = pt(l)), X(c) && (/* @__PURE__ */ Qr(c) && !V(c) && (c = me({}, c)), t.style = Dt(c));
  }
  const i = se(e) ? 1 : mi(e) ? 128 : Yn(e) ? 64 : X(e) ? 4 : W(e) ? 2 : 0;
  return dt(
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
  return e ? /* @__PURE__ */ Qr(e) || li(e) ? me({}, e) : e : null;
}
function Lt(e, t, n = !1, r = !1) {
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
      n && s ? V(s) ? s.concat(En(t)) : [s, En(t)] : En(t)
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
  return Ye(Zn, null, e, t);
}
function qt(e = "", t = !1) {
  return t ? (fe(), Wc(Qe, null, e)) : Ye(Qe, null, e);
}
function ke(e) {
  return e == null || typeof e == "boolean" ? Ye(Qe) : V(e) ? Ye(
    xe,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : wi(e) ? qe(e) : Ye(Zn, null, String(e));
}
function qe(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Lt(e);
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
      !o && !li(t) ? t._ctx = Ke : o === 3 && Ke && (Ke.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (W(t)) {
    if (r & 65) {
      Hn(e, { default: t });
      return;
    }
    t = { default: t, _ctx: Ke }, n = 32;
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
        t.class !== r.class && (t.class = pt([t.class, r.class]));
      else if (o === "style")
        t.style = Dt([t.style, r.style]);
      else if (Vn(o)) {
        const s = t[o], i = r[o];
        i && s !== i && !(V(s) && s.includes(i)) ? t[o] = s ? [].concat(s, i) : i : i == null && s == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !Nn(o) && (t[o] = i);
      } else o !== "" && (t[o] = r[o]);
  }
  return t;
}
function Fe(e, t, n, r = null) {
  Ae(e, t, 7, [
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
    propsDefaults: ne,
    // inheritAttrs
    inheritAttrs: r.inheritAttrs,
    // state
    ctx: ne,
    data: ne,
    props: ne,
    attrs: ne,
    slots: ne,
    refs: ne,
    setupState: ne,
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
  return s.ctx = { _: s }, s.root = t ? t.root : s, s.emit = Ec.bind(null, s), e.ce && e.ce(s), s;
}
let we = null;
const Zc = () => we || Ke;
let kn, cn;
{
  const e = Wn(), t = (n, r) => {
    let o;
    return (o = e[n]) || (o = e[n] = []), o.push(r), (s) => {
      o.length > 1 ? o.forEach((i) => i(s)) : o[0](s);
    };
  };
  kn = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => we = n
  ), cn = t(
    "__VUE_SSR_SETTERS__",
    (n) => an = n
  );
}
const gn = (e) => {
  const t = we;
  return kn(e), e.scope.on(), () => {
    e.scope.off(), kn(t);
  };
}, To = () => {
  we && we.scope.off(), kn(null);
};
function _i(e) {
  return e.vnode.shapeFlag & 4;
}
let an = !1;
function Qc(e, t = !1, n = !1) {
  t && cn(t);
  const { props: r, children: o } = e.vnode, s = _i(e);
  Dc(e, r, s, t), kc(e, o, n || t);
  const i = s ? ea(e, t) : void 0;
  return t && cn(!1), i;
}
function ea(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, vc);
  const { setup: r } = n;
  if (r) {
    Xe();
    const o = e.setupContext = r.length > 1 ? na(e) : null, s = gn(e), i = pn(
      r,
      e,
      0,
      [
        e.props,
        o
      ]
    ), l = hs(i);
    if (Je(), s(), (l || e.sp) && !en(e) && Ys(e), l) {
      if (i.then(To, To), t)
        return i.then((c) => {
          cn(!0);
          try {
            Do(e, c, t);
          } finally {
            cn(!1);
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
  W(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : X(t) && (e.setupState = Ks(t)), Si(e);
}
function Si(e, t, n) {
  const r = e.type;
  e.render || (e.render = r.render || $e);
  {
    const o = gn(e);
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
    return ge(e, "get", ""), e[t];
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
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Ks(Bl(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in tn)
        return tn[n](e);
    },
    has(t, n) {
      return n in t || n in tn;
    }
  })) : e.proxy;
}
function ra(e) {
  return W(e) && "__vccOpts" in e;
}
const ue = (e, t) => /* @__PURE__ */ zl(e, t, an), oa = "3.5.42";
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
const xi = Hr ? (e) => Hr.createHTML(e) : (e) => e, sa = "http://www.w3.org/2000/svg", ia = "http://www.w3.org/1998/Math/MathML", Ge = typeof document < "u" ? document : null, jo = Ge && /* @__PURE__ */ Ge.createElement("template"), la = {
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
  const r = e.style, o = se(n);
  let s = !1;
  if (n && !o) {
    if (t)
      if (se(t))
        for (const i of t.split(";")) {
          const l = i.slice(0, i.indexOf(":")).trim();
          n[l] == null && Yt(r, l, "");
        }
      else
        for (const i in t)
          n[i] == null && Yt(r, i, "");
    for (const i in n) {
      i === "display" && (s = !0);
      const l = n[i];
      l != null ? ha(
        e,
        i,
        !se(t) && t ? t[i] : void 0,
        l
      ) || Yt(r, i, l) : Yt(r, i, "");
    }
  } else if (o) {
    if (t !== n) {
      const i = r[fa];
      i && (n += ";" + i), r.cssText = n, s = da.test(n);
    }
  } else t && e.removeAttribute("style");
  Ho in e && (e[Ho] = s ? r.display : "", e[ua] && (r.display = "none"));
}
const Sn = /\s*!important$/;
function Yt(e, t, n) {
  if (V(n))
    n.forEach((r) => Yt(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--"))
    Sn.test(n) ? e.setProperty(t, n.replace(Sn, ""), "important") : e.setProperty(t, n);
  else {
    const r = ga(e, t);
    Sn.test(n) ? e.setProperty(
      _t(r),
      n.replace(Sn, ""),
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
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && se(r) && n === r;
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
  return [e[2] === ":" ? e.slice(3) : _t(e.slice(2)), t];
}
let wr = 0;
const Sa = /* @__PURE__ */ Promise.resolve(), xa = () => wr || (Sa.then(() => wr = 0), wr = Date.now());
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
  return n.value = e, n.attached = xa(), n;
}
const No = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Ca = (e, t, n, r, o, s) => {
  const i = o === "svg";
  t === "class" ? aa(e, r, i) : t === "style" ? pa(e, n, r) : Vn(t) ? Nn(t) || va(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Ma(e, t, r, i)) ? ($o(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Ko(e, t, r, i, s, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Ea(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !se(r))) ? $o(e, Oe(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), Ko(e, t, r, i));
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
  return No(t) && se(n) ? !1 : t in e;
}
function Ea(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const r = Oe(t);
  return Array.isArray(n) ? n.some((o) => Oe(o) === r) : Object.keys(n).some((o) => Oe(o) === r);
}
const Oa = ["ctrl", "shift", "alt", "meta"], Pa = {
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
}, Bo = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), r = t.join(".");
  return n[r] || (n[r] = (o, ...s) => {
    for (let i = 0; i < t.length; i++) {
      const l = Pa[t[i]];
      if (l && l(o, t)) return;
    }
    return e(o, ...s);
  });
}, Ia = /* @__PURE__ */ me({ patchProp: Ca }, la);
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
  return se(e) ? document.querySelector(e) : e;
}
function xn() {
  return !0;
}
const ja = Symbol("merge-proxy"), On = Symbol("merge-proxy-sources"), Ha = {
  get(e, t, n) {
    return t === ja ? n : t === On ? e.sources : e.get(t);
  },
  has(e, t) {
    return e.has(t);
  },
  set: xn,
  deleteProperty: xn,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: xn,
      deleteProperty: xn
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function Pn(e) {
  return e && typeof e == "object" && "value" in e ? e.value : e;
}
function kr(...e) {
  const t = e.flatMap((n) => typeof n == "object" && n !== null && On in n && Array.isArray(n[On]) ? n[On] : [n]);
  return new Proxy({
    sources: t,
    get(n) {
      for (let r = t.length - 1; r >= 0; r--) {
        const o = Pn(t[r])[n];
        if (o !== void 0) return o;
      }
    },
    has(n) {
      for (let r = t.length - 1; r >= 0; r--) if (n in Pn(t[r])) return !0;
      return !1;
    },
    keys() {
      const n = [];
      for (const r of t) n.push(...Object.keys(Pn(r)));
      return [...Array.from(new Set(n))];
    }
  }, Ha);
}
function Uo(...e) {
  const t = {};
  for (let n of e)
    if (n = Pn(n), !!n)
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
    subscribe: (t) => ({ unsubscribe: _e(e, Ri(t), { flush: "sync" }) })
  });
}
function La(e) {
  return Object.assign(e, {
    set: (t) => {
      e.value = typeof t == "function" ? t(e.value) : t;
    },
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: _e(e, Ri(t), { flush: "sync" }) })
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
    createReadonlyAtom: (t, n) => ka(ue(() => t())),
    createWritableAtom: (t, n) => La(/* @__PURE__ */ Wl(t)),
    untrack: (t) => t(),
    batch: (t) => t()
  };
}
function Qn(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function lt(e) {
  if (Array.isArray(e)) return e.map(lt);
  if (e && typeof e == "object") {
    const t = Object.getPrototypeOf(e);
    if (t !== Object.prototype && t !== null) return e;
    const n = t === null ? Z() : {}, r = Object.keys(e);
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
function Z() {
  return /* @__PURE__ */ Object.create(null);
}
function Kt(e, t) {
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
    let p = !u || u.length !== (i == null ? void 0 : i.length);
    if (!p && u) {
      for (let y = 0; y < u.length; y++) if (u[y] !== i[y]) {
        p = !0;
        break;
      }
    }
    return n == null || n(p), p && (i = u, s == null || s(), l = e(...u ?? []), r == null || r(l)), l;
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
function Ei(e, t = "_") {
  const [n, r] = e.split(t);
  return {
    fnKey: r,
    fnName: `${n}.${r}`,
    parentName: n
  };
}
function St(e, t, n) {
  for (const [r, { fn: o, memoDeps: s }] of Object.entries(n)) {
    const { fnKey: i, fnName: l } = Ei(r);
    t[i] = s ? tr({
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
    const { fnKey: l, fnName: c } = Ei(o);
    if (i) {
      const a = `_memo_${l}`;
      t[l] = function(...u) {
        if (!this[a]) {
          const p = this;
          this[a] = tr({
            memoDeps: (y) => i(p, y),
            fn: (...y) => s(p, ...y),
            fnName: c,
            objectId: p.id,
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
function de(e, t, n, ...r) {
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
  $t("coreCellsFeature", e, t, {
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
function vt(e) {
  var r;
  const t = (r = e.table.atoms.columnVisibility) == null ? void 0 : r.get();
  if (!t) return !0;
  const n = e.columns;
  return n.length ? n.some((o) => de(o, "getIsVisible", vt)) : (Kt(t, e.id) ? t[e.id] : void 0) ?? !0;
}
function Za(e) {
  return e.getAllLeafColumns().filter((t) => de(t, "getIsVisible", vt));
}
function Pi(e, t = 1) {
  let n = t;
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    de(o, "getIsVisible", vt) && o.columns.length && (n = Math.max(n, Pi(o.columns, t + 1)));
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
    const a = e[c], u = l[l.length - 1], p = a.column.depth === i.depth;
    let y, v = !1;
    if (p && a.column.parent ? y = a.column.parent : (y = a.column, v = !0), u && u.column === y) u.subHeaders.push(a);
    else {
      const C = Oi(n, y, {
        id: eu(r, t, y.id, a.id),
        isPlaceholder: v,
        placeholderId: v ? String(tu(l, y)) : void 0,
        depth: t,
        index: l.length
      });
      C.subHeaders.push(a), l.push(C);
    }
    i.headers.push(a), a.headerGroup = i;
  }
  for (let c = 0; c < s.length; c++) s[c](i);
  o.push(i), t > 0 && Ii(l, t - 1, n, r, o, s);
}
function Ai(e) {
  for (let t = 0; t < e.length; t++) {
    const n = e[t];
    if (!de(n.column, "getIsVisible", vt)) continue;
    let r = 0;
    if (n.subHeaders.length) {
      Ai(n.subHeaders);
      for (let o = 0; o < n.subHeaders.length; o++) {
        const s = n.subHeaders[o];
        de(s.column, "getIsVisible", vt) && (r += s.colSpan);
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
  const o = Pi(e), s = [], i = n._headerGroupInstanceInitFns, l = new Array(t.length);
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
    const y = s.split(".");
    c = (v) => {
      let C = v;
      for (let E = 0; E < y.length; E++) {
        const H = y[E];
        C = C == null ? void 0 : C[H];
      }
      return C;
    };
  } else c = (y) => y[o.accessorKey];
  if (!l)
    throw new Error();
  const a = nu(e), u = Object.create(a);
  u.accessorFn = c, u.columnDef = o, u.columns = [], u.depth = n, u.id = `${String(l)}`, u.parent = r;
  const p = e._columnInstanceInitFns;
  for (let y = 0; y < p.length; y++) p[y](u);
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
    return de(e.table, "getOrderColumns", Ti)(t);
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
  const t = Z(), n = e.getAllFlatColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function fu(e) {
  const t = e.getAllColumns().flatMap((n) => n.getLeafColumns());
  return de(e, "getOrderColumns", Ti)(t);
}
function du(e) {
  const t = Z(), n = e.getAllLeafColumns();
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
    St("coreColumnsFeature", e, {
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
  const { start: t, end: n } = ((a = e.atoms.columnPinning) == null ? void 0 : a.get()) ?? Ja(), r = e.getAllColumns(), o = de(e, "getVisibleLeafColumns", Za);
  if (!t.length && !n.length) return zo(r, o, e);
  const s = e.getAllLeafColumnsById(), i = [];
  for (let u = 0; u < t.length; u++) {
    const p = s[t[u]];
    p && de(p, "getIsVisible", vt) && i.push(p);
  }
  const l = [];
  for (let u = 0; u < n.length; u++) {
    const p = s[n[u]];
    p && de(p, "getIsVisible", vt) && l.push(p);
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
    St("coreHeadersFeature", e, {
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
  c._displayIndexCache = -1, c._uniqueValuesCache = Z(), c._valuesCache = Z(), c.depth = o, c.id = t, c.index = r, c.original = n, c.parentId = i, c.subRows = [];
  const a = e._rowInstanceInitFns;
  for (let u = 0; u < a.length; u++) a[u](c);
  return c;
};
function Ru() {
  return [];
}
function Cu(e, t) {
  er(e, "cellSelection", lt(e.initialState.cellSelection) ?? Ru());
}
function Mu(e) {
  e.atoms.cellSelection && (e.options.autoResetAll ?? e.options.autoResetCellSelection ?? !0) && e._reactivity.schedule(() => Cu(e));
}
function Eu() {
  return Z();
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
    Ln(e, Z());
  }
}
function ki(e, t) {
  const n = e.initialState.expanded;
  er(e, "expanded", t ? Z() : n === !0 ? !0 : Object.assign(Z(), lt(n ?? {})));
}
function Li(e) {
  return e.getPrePaginatedRowModel().flatRows.some((t) => wt(t));
}
function Ou(e) {
  return (t) => {
    Hi(e);
  };
}
function Pu(e) {
  var n;
  const t = ((n = e.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return t === !0 || Object.values(t).some(Boolean);
}
function Ki(e) {
  var r;
  const t = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t === !0) return !0;
  if (!Object.keys(t).length) return !1;
  const n = e.getRowModel().flatRows.filter((o) => wt(o));
  return !(!n.length || n.some((o) => !nr(o)));
}
function Iu(e) {
  var r;
  let t = 0;
  const n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return (n === !0 ? Object.values(e.getRowModel().rowsById).filter((o) => wt(o)).map((o) => o.id) : Object.keys(n ?? {})).forEach((o) => {
    const s = o.split(".");
    t = Math.max(t, s.length);
  }), t;
}
function $i(e, t) {
  var s;
  const n = ((s = e.table.atoms.expanded) == null ? void 0 : s.get()) ?? {}, r = n === !0 || Lr(n, e.id), o = t ?? !r;
  o !== r && (o && !wt(e) || Ln(e.table, (i) => {
    const l = i === !0 ? !0 : Lr(i, e.id);
    let c = Z();
    if (i === !0 ? Object.values(e.table.getRowModel().rowsById).forEach((a) => {
      wt(a) && (c[a.id] = !0);
    }) : c = Object.assign(Z(), i), !l && o)
      return c[e.id] = !0, c;
    if (l && !o) {
      const a = Z(), u = Object.keys(c);
      for (let p = 0; p < u.length; p++) {
        const y = u[p];
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
  return !!(((o = (r = e.table.options).getIsRowExpanded) == null ? void 0 : o.call(r, e)) ?? (t === !0 || Lr(t, e.id)));
}
function Lr(e, t) {
  return !!(e && e !== !0 && Kt(e, t) && e[t]);
}
function wt(e) {
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
  const t = wt(e);
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
  ju(e, Kr);
}
function ku(e, t) {
  er(e, "sorting", t);
}
function Lu(e, t) {
  ku(e, lt(e.initialState.sorting ?? []));
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
    rowsById: Z()
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
  St("coreRowModelsFeature", e, {
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
  const t = Z(), n = e.getAllCells();
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
    St("coreRowsFeature", e, {
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
  const r = wf(e, Qn(t, e.options));
  e.optionsStore ? e.optionsStore.set(() => r) : e.options = r, yf(e, r.state ?? null);
}
const _f = { constructTableAPIs: (e) => {
  St("coreTablesFeature", e, {
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
  }), lt(t);
}
function Mf(e) {
  var B, re;
  const t = e.features.coreReactivityFeature, { aggregationFns: n, columnMeta: r, coreRowModel: o, expandedRowModel: s, facetedMinMaxValues: i, facetedRowModel: l, facetedUniqueValues: c, filterFns: a, filterMeta: u, filteredRowModel: p, groupedRowModel: y, paginatedRowModel: v, sortFns: C, sortedRowModel: E, tableMeta: H, ...F } = e.features, O = {
    _cellInstanceInitFns: [],
    _columnInstanceInitFns: [],
    _features: {
      ...Sf,
      ...F
    },
    _headerGroupInstanceInitFns: [],
    _headerInstanceInitFns: [],
    _reactivity: t,
    _rowInstanceInitFns: [],
    _rowModelFns: {
      aggregationFns: n,
      filterFns: a,
      sortFns: C
    },
    _rowModels: {},
    atoms: {},
    baseAtoms: {}
  }, k = Object.values(O._features), I = {
    ...k.reduce((K, D) => {
      var U;
      return Object.assign(K, (U = D.getDefaultTableOptions) == null ? void 0 : U.call(D, O));
    }, {}),
    ...e
  };
  if (t.wrapExternalAtoms && I.atoms) for (const [K, D] of Object.entries(I.atoms)) {
    const U = D, J = t.createWritableAtom(U.get(), { debugName: `externalAtom/${K}` });
    I.atoms[K] = J;
    let Q = !1;
    const ie = U.subscribe((ae) => {
      Q || J.set(ae);
    }), ce = J.subscribe((ae) => {
      Q = !0, U.set(ae), Q = !1;
    });
    t.addSubscription(ie), t.addSubscription(ce);
  }
  t.createOptionsStore ? (O.optionsStore = t.createWritableAtom(I, { debugName: "table/optionsStore" }), Object.defineProperty(O, "options", {
    configurable: !0,
    enumerable: !0,
    get() {
      return O.optionsStore.get();
    },
    set(K) {
      O.optionsStore.set(() => K);
    }
  })) : O.options = I, O.initialState = Cf(O._features, O.options.initialState);
  const N = Object.keys(O.initialState);
  for (let K = 0; K < N.length; K++) {
    const D = N[K];
    O.baseAtoms[D] = t.createWritableAtom(O.initialState[D], { debugName: `table/baseAtoms/${D}` }), O.atoms[D] = t.createReadonlyAtom(() => {
      var ce;
      const U = O.options, J = (ce = U.atoms) == null ? void 0 : ce[D], Q = J ? J.get() : O.baseAtoms[D].get();
      if (J) return Q;
      const ie = U.state;
      if (ie && Kt(ie, D)) {
        const ae = ie[D];
        return ae === void 0 ? O.initialState[D] : ae;
      }
      return Q;
    }, { debugName: `table/atoms/${D}` });
  }
  Bi(O), O.store = xf(t.createReadonlyAtom(() => {
    const K = {};
    for (let D = 0; D < N.length; D++) {
      const U = N[D];
      K[U] = O.atoms[U].get();
    }
    return K;
  }, {
    compare: Rf,
    debugName: "table/store"
  }));
  for (let K = 0; K < k.length; K++) {
    const D = k[K];
    (B = D.initTableInstanceData) == null || B.call(D, O), D.initCellInstanceData && O._cellInstanceInitFns.push(D.initCellInstanceData.bind(D)), D.initColumnInstanceData && O._columnInstanceInitFns.push(D.initColumnInstanceData.bind(D)), D.initHeaderGroupInstanceData && O._headerGroupInstanceInitFns.push(D.initHeaderGroupInstanceData.bind(D)), D.initHeaderInstanceData && O._headerInstanceInitFns.push(D.initHeaderInstanceData.bind(D)), D.initRowInstanceData && O._rowInstanceInitFns.push(D.initRowInstanceData.bind(D)), (re = D.constructTableAPIs) == null || re.call(D, O);
  }
  return O;
}
const Ef = {
  getInitialState: (e) => ({
    expanded: Eu(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onExpandedChange: Ci("expanded", e),
    paginateExpandedRows: !0
  }),
  assignRowPrototype: (e, t) => {
    $t("rowExpandingFeature", e, t, {
      row_toggleExpanded: { fn: (n, r) => $i(n, r) },
      row_getIsExpanded: { fn: (n) => nr(n) },
      row_getCanExpand: { fn: (n) => wt(n) },
      row_getIsAllParentsExpanded: { fn: (n) => Au(n) },
      row_getToggleExpandedHandler: { fn: (n) => Tu(n) }
    });
  },
  constructTableAPIs: (e) => {
    St("rowExpandingFeature", e, {
      table_autoResetExpanded: { fn: () => ji(e) },
      table_setExpanded: { fn: (t) => Ln(e, t) },
      table_toggleAllRowsExpanded: { fn: (t) => Hi(e, t) },
      table_resetExpanded: { fn: (t) => ki(e, t) },
      table_getCanSomeRowsExpand: { fn: () => Li(e) },
      table_getToggleAllRowsExpandedHandler: { fn: () => Ou(e) },
      table_getIsSomeRowsExpanded: { fn: () => Pu(e) },
      table_getIsAllRowsExpanded: { fn: () => Ki(e) },
      table_getExpandedDepth: { fn: () => Iu(e) }
    });
  }
};
function Of() {
  return Z();
}
function Vt(e, t) {
  var n, r;
  (r = (n = e.options).onRowSelectionChange) == null || r.call(n, t);
}
function Pf(e, t) {
  e._lastSelectedRowId = null, Vt(e, t ? Z() : Object.assign(Z(), lt(e.initialState.rowSelection ?? {})));
}
function Wi(e, t, n) {
  e._lastSelectedRowId = null, Vt(e, (r) => {
    if (t = typeof t < "u" ? t : !de(e, "getIsAllRowsSelected", qi), n != null && n.deselectAll && !t) return Z();
    const o = Object.assign(Z(), r), s = e.getPreGroupedRowModel().flatRows;
    if (t) {
      const i = /* @__PURE__ */ new Map();
      s.forEach((l) => {
        Kn(l, i) && (o[l.id] = !0);
      });
    } else s.forEach((i) => {
      et(i) && delete o[i.id];
    });
    return o;
  });
}
function Ui(e, t, n) {
  e._lastSelectedRowId = null, Vt(e, (r) => {
    const o = typeof t < "u" ? t : !de(e, "getIsAllPageRowsSelected", zi);
    if (n != null && n.deselectAll && !o) return Z();
    const s = Object.assign(Z(), r);
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
  return de(e, "getIsSomeRowsSelected", rr) ? co(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: Z()
  };
}
function Tf(e) {
  const t = e.getFilteredRowModel();
  return de(e, "getIsSomeRowsSelected", rr) ? co(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: Z()
  };
}
function Df(e) {
  const t = e.getSortedRowModel();
  return de(e, "getIsSomeRowsSelected", rr) ? co(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: Z()
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
    t.some((i) => !hn(i, n) && Kn(i, s)) && (r = !1);
  }
  return r;
}
function zi(e) {
  var s;
  const t = e.getPaginatedRowModel().flatRows, n = ((s = e.atoms.rowSelection) == null ? void 0 : s.get()) ?? {}, r = /* @__PURE__ */ new Map();
  let o = !1;
  for (let i = 0; i < t.length; i++) {
    const l = t[i];
    if (hn(l, n))
      !o && Kn(l, r) && (o = !0);
    else if (Kn(l, r)) return !1;
  }
  return o;
}
function rr(e) {
  return de(e, "getSelectedRowIds", Gi).length > 0;
}
function Ff(e) {
  return e.getPaginatedRowModel().flatRows.filter((t) => et(t)).some((t) => io(t) || de(t, "getIsSomeSelected", Xi));
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
  const r = io(e);
  Vt(e.table, (o) => {
    t = typeof t < "u" ? t : !r;
    const s = Object.assign(Z(), o);
    return or(s, e.id, t, ((n == null ? void 0 : n.selectChildren) ?? !0) && yt(e), e.table), !t && (n != null && n.deselectParents) && Ji(s, e), s;
  });
}
function io(e) {
  var t;
  return hn(e, ((t = e.table.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
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
function yt(e) {
  const t = e.table.options;
  return typeof t.enableMultiRowSelection == "function" ? t.enableMultiRowSelection(e) : t.enableMultiRowSelection ?? !0;
}
function Lf(e, t) {
  const n = et(e);
  return (r) => {
    var c, a;
    if (!n) return;
    const o = r, s = e.table, i = o.target.checked, l = s._lastSelectedRowId;
    (!(s.options.enableRowRangeSelection !== !1 && l !== null && yt(e) && (((a = (c = s.options).isRowRangeSelectionEvent) == null ? void 0 : a.call(c, r)) ?? !1)) || !Kf(e, l, i, t)) && Yi(e, i, t), s._lastSelectedRowId = e.id;
  };
}
function Kf(e, t, n, r) {
  const o = (r == null ? void 0 : r.selectChildren) ?? !0, s = e.table, i = s.getRowsInDisplayOrder(), l = s.getPrePaginatedRowModel().rowsById[t] ?? s.getCoreRowModel().rowsById[t];
  if (!l) return !1;
  const c = l.getDisplayIndex(), a = e.getDisplayIndex(), u = i[c], p = i[a];
  if (c < 0 || a < 0 || c >= i.length || a >= i.length || (u == null ? void 0 : u.id) !== l.id || (p == null ? void 0 : p.id) !== e.id || !yt(l) || !yt(e)) return !1;
  const y = Math.min(c, a), v = Math.max(c, a);
  return Vt(s, (C) => {
    const E = Object.assign(Z(), C);
    for (let H = y; H <= v; H++) {
      const F = i[H];
      !et(F) || !yt(F) || (or(E, F.id, n, o, s), !n && (r != null && r.deselectParents) && Ji(E, F));
    }
    return E;
  }), !0;
}
function or(e, t, n, r, o, s) {
  const i = o.getRow(t, !0);
  n ? (yt(i) || Object.keys(e).forEach((l) => delete e[l]), et(i) && (e[t] = !0)) : (!s || et(i)) && delete e[t], r && i.subRows.length && lo(i) && i.subRows.forEach((l) => or(e, l.id, n, r, o, s));
}
function Kn(e, t) {
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
    const i = e[s], l = hn(i, t);
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
  const n = [], r = Z(), o = ((s = t.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  return {
    rows: Zi(e.rows, o, n, r),
    flatRows: n,
    rowsById: r
  };
}
function hn(e, t) {
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
    if (et(l) && (o = !0, hn(l, t) ? n = !0 : r = !1), l.subRows.length) {
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
      row_toggleSelected: { fn: (n, r, o) => Yi(n, r, o) },
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
      row_getCanMultiSelect: { fn: (n) => yt(n) },
      row_getToggleSelectedHandler: { fn: (n, r) => Lf(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    St("rowSelectionFeature", e, {
      table_setRowSelection: { fn: (t) => Vt(e, t) },
      table_resetRowSelection: { fn: (t) => Pf(e, t) },
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
  for (const n of Object.keys(e)) t[n] = Ft(e[n]);
  return kr(e, t);
}
function Wf(e) {
  return Object.keys(e).map((t) => Ft(e[t]));
}
function Uf(e) {
  const t = (l, c) => {
    l.setOptions((a) => Uo(a, Xo(c)));
  }, n = Ka(), r = kr(e, { features: {
    coreReactivityFeature: n,
    ...Ft(e.features) ?? {}
  } }), o = kr(Xo(r), { mergeOptions: (l, c) => Uo(l, c) }), s = Mf(o), i = s;
  return xs() && Rl(() => {
    var l;
    return (l = n.unmount) == null ? void 0 : l.call(n);
  }), _e(() => Wf(r), () => {
    t(s, r);
  }, { immediate: !0 }), _e(() => {
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
function zf() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function el(e, t) {
  return Gf(e) || qf(e, t) || Qi(e, t) || zf();
}
var Jo = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, bt = {}, mn = {};
Object.defineProperty(mn, "__esModule", { value: !0 });
mn.bind = void 0;
function Yf(e, t) {
  var n = t.type, r = t.listener, o = t.options;
  return e.addEventListener(n, r, o), function() {
    e.removeEventListener(n, r, o);
  };
}
mn.bind = Yf;
var ir = {}, At = Jo && Jo.__assign || function() {
  return At = Object.assign || function(e) {
    for (var t, n = 1, r = arguments.length; n < r; n++) {
      t = arguments[n];
      for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    }
    return e;
  }, At.apply(this, arguments);
};
Object.defineProperty(ir, "__esModule", { value: !0 });
ir.bindAll = void 0;
var Xf = mn;
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
ir.bindAll = Zf;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.bindAll = e.bind = void 0;
  var t = mn;
  Object.defineProperty(e, "bind", { enumerable: !0, get: function() {
    return t.bind;
  } });
  var n = ir;
  Object.defineProperty(e, "bindAll", { enumerable: !0, get: function() {
    return n.bindAll;
  } });
})(bt);
var tl = "data-pdnd-honey-pot";
function nl(e) {
  return e instanceof Element && e.hasAttribute(tl);
}
function rl(e) {
  var t = document.elementsFromPoint(e.x, e.y), n = el(t, 2), r = n[0], o = n[1];
  return r ? nl(r) ? o ?? null : r : null;
}
function un(e) {
  "@babel/helpers - typeof";
  return un = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, un(e);
}
function Qf(e, t) {
  if (un(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (un(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function ed(e) {
  var t = Qf(e, "string");
  return un(t) == "symbol" ? t : t + "";
}
function yn(e, t, n) {
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
function xt(e) {
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
var br = xt(function() {
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
      yn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Qo(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
var fn = 2, ts = fn / 2;
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
    x: Math.min(e.x, window.innerWidth - fn),
    y: Math.min(e.y, window.innerHeight - fn)
  };
}
function ns(e) {
  var t = e.client, n = id(sd(od(rd(t))));
  return DOMRect.fromRect({
    x: n.x,
    y: n.y,
    width: fn,
    height: fn
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
  var o = bt.bind(window, {
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
    var a = bt.bindAll(window, [
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
    return e = null, bt.bind(window, {
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
        var u, p = l.location.current.input;
        (u = r) === null || u === void 0 || u({
          current: {
            x: p.clientX,
            y: p.clientY
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
var pd = xt(function() {
  return navigator.userAgent.includes("Firefox");
}), uo = xt(function() {
  var t = navigator, n = t.userAgent;
  return n.includes("AppleWebKit") && !n.includes("Chrome");
});
function gd(e) {
  return "nodeName" in e;
}
function hd(e) {
  return gd(e) && e.ownerDocument !== document;
}
var Vr = {
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
  bt.bindAll(
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
        !n.isOverWindow && n.enterCount === 0 && (s[Vr.isEnteringWindow] = !0), n.isOverWindow = !0, n.enterCount++;
      }
    }, {
      type: "dragleave",
      listener: function(s) {
        n.enterCount--, n.isOverWindow && n.enterCount === 0 && (s[Vr.isLeavingWindow] = !0, n.isOverWindow = !1);
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
  return uo() ? t.hasOwnProperty(Vr.isLeavingWindow) : !1;
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
function nn(e) {
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
var Nr = {
  isActive: !1
};
function sl() {
  return !Nr.isActive;
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
  Nr.isActive = !0;
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
  function c(v) {
    var C = Sd({
      current: i.current.dropTargets,
      next: v.dropTargets
    });
    i.current = v, C && l.dragUpdate({
      current: i.current
    });
  }
  function a(v) {
    var C = nn(v), E = nl(v.target) ? rl({
      x: C.clientX,
      y: C.clientY
    }) : v.target, H = r({
      target: E,
      input: C,
      source: n.payload,
      current: i.current.dropTargets
    });
    H.length && (v.preventDefault(), Sr({
      event: v,
      current: H
    })), c({
      dropTargets: H,
      input: C
    });
  }
  function u() {
    i.current.dropTargets.length && c({
      dropTargets: [],
      input: i.current.input
    }), l.drop({
      current: i.current,
      updatedSourcePayload: null
    }), p();
  }
  function p() {
    Nr.isActive = !1, y();
  }
  var y = bt.bindAll(
    window,
    [{
      // 👋 Note: we are repurposing the `dragover` event as our `drag` event
      // this is because firefox does not publish pointer coordinates during
      // a `drag` event, but does for every other type of drag event
      // `dragover` fires on all elements that are being dragged over
      // Because we are binding to `window` - our `dragover` is effectively the same as a `drag`
      // 🦊😤
      type: "dragover",
      listener: function(C) {
        a(C), l.drag({
          current: i.current
        });
      }
    }, {
      type: "dragenter",
      listener: a
    }, {
      type: "dragleave",
      listener: function(C) {
        yd({
          dragLeave: C
        }) && (c({
          input: i.current.input,
          dropTargets: []
        }), n.startedFrom === "external" && u());
      }
    }, {
      // A "drop" can only happen if the browser allowed the drop
      type: "drop",
      listener: function(C) {
        if (i.current = {
          dropTargets: i.current.dropTargets,
          input: nn(C)
        }, !i.current.dropTargets.length) {
          u();
          return;
        }
        C.preventDefault(), Sr({
          event: C,
          current: i.current.dropTargets
        }), l.drop({
          current: i.current,
          // When dropping something native, we need to extract the latest
          // `.items` from the "drop" event as it is now accessible
          updatedSourcePayload: n.type === "external" ? n.getDropPayload(C) : null
        }), p();
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
      listener: function(C) {
        i.current = {
          dropTargets: i.current.dropTargets,
          input: nn(C)
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
function Rd(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = nn(t);
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
}, Br = /* @__PURE__ */ new Map();
function Cd(e) {
  var t = e.typeKey, n = e.mount, r = Br.get(t);
  if (r)
    return r.usageCount++, r;
  var o = {
    typeKey: t,
    unmount: n(),
    usageCount: 1
  };
  return Br.set(t, o), o;
}
function Md(e) {
  var t = Cd(e);
  return function() {
    t.usageCount--, !(t.usageCount > 0) && (t.unmount(), Br.delete(e.typeKey));
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
      yn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ss(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function xr(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = Ed(e)) || t) {
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
function Ed(e, t) {
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
function Rr(e) {
  return e.slice(0).reverse();
}
function Od(e) {
  var t = e.typeKey, n = e.defaultDropEffect, r = /* @__PURE__ */ new WeakMap(), o = "data-drop-target-for-".concat(t), s = "[".concat(o, "]");
  function i(v) {
    return r.set(v.element, v), function() {
      return r.delete(v.element);
    };
  }
  function l(v) {
    var C = sr(il(v.element, {
      attribute: o,
      value: "true"
    }), i(v));
    return xt(C);
  }
  function c(v) {
    var C, E, H, F, O = v.source, k = v.target, I = v.input, N = v.result, B = N === void 0 ? [] : N;
    if (k == null)
      return B;
    if (!(k instanceof Element))
      return k instanceof Node ? c({
        source: O,
        target: k.parentElement,
        input: I,
        result: B
      }) : B;
    var re = k.closest(s);
    if (re == null)
      return B;
    var K = r.get(re);
    if (K == null)
      return B;
    var D = {
      input: I,
      source: O,
      element: K.element
    };
    if (K.canDrop && !K.canDrop(D))
      return c({
        source: O,
        target: K.element.parentElement,
        input: I,
        result: B
      });
    var U = (C = (E = K.getData) === null || E === void 0 ? void 0 : E.call(K, D)) !== null && C !== void 0 ? C : {}, J = (H = (F = K.getDropEffect) === null || F === void 0 ? void 0 : F.call(K, D)) !== null && H !== void 0 ? H : n, Q = {
      data: U,
      element: K.element,
      dropEffect: J,
      // we are collecting _actual_ drop targets, so these are
      // being applied _not_ due to stickiness
      isActiveDueToStickiness: !1
    };
    return c({
      source: O,
      target: K.element.parentElement,
      input: I,
      // Using bubble ordering. Same ordering as `event.getPath()`
      result: [].concat(ol(B), [Q])
    });
  }
  function a(v) {
    var C = v.eventName, E = v.payload, H = xr(E.location.current.dropTargets), F;
    try {
      for (H.s(); !(F = H.n()).done; ) {
        var O, k = F.value, I = r.get(k.element), N = rt(rt({}, E), {}, {
          self: k
        });
        I == null || (O = I[C]) === null || O === void 0 || O.call(
          I,
          // I cannot seem to get the types right here.
          // TS doesn't seem to like that one event can need `nativeSetDragImage`
          // @ts-expect-error
          N
        );
      }
    } catch (B) {
      H.e(B);
    } finally {
      H.f();
    }
  }
  var u = {
    onGenerateDragPreview: a,
    onDrag: a,
    onDragStart: a,
    onDrop: a,
    onDropTargetChange: function(C) {
      var E = C.payload, H = new Set(E.location.current.dropTargets.map(function(G) {
        return G.element;
      })), F = /* @__PURE__ */ new Set(), O = xr(E.location.previous.dropTargets), k;
      try {
        for (O.s(); !(k = O.n()).done; ) {
          var I, N = k.value;
          F.add(N.element);
          var B = r.get(N.element), re = H.has(N.element), K = rt(rt({}, E), {}, {
            self: N
          });
          if (B == null || (I = B.onDropTargetChange) === null || I === void 0 || I.call(B, K), !re) {
            var D;
            B == null || (D = B.onDragLeave) === null || D === void 0 || D.call(B, K);
          }
        }
      } catch (G) {
        O.e(G);
      } finally {
        O.f();
      }
      var U = xr(E.location.current.dropTargets), J;
      try {
        for (U.s(); !(J = U.n()).done; ) {
          var Q, ie, ce = J.value;
          if (!F.has(ce.element)) {
            var ae = rt(rt({}, E), {}, {
              self: ce
            }), ee = r.get(ce.element);
            ee == null || (Q = ee.onDropTargetChange) === null || Q === void 0 || Q.call(ee, ae), ee == null || (ie = ee.onDragEnter) === null || ie === void 0 || ie.call(ee, ae);
          }
        }
      } catch (G) {
        U.e(G);
      } finally {
        U.f();
      }
    }
  };
  function p(v) {
    u[v.eventName](v);
  }
  function y(v) {
    var C = v.source, E = v.target, H = v.input, F = v.current, O = c({
      source: C,
      target: E,
      input: H
    });
    if (O.length >= F.length)
      return O;
    for (var k = Rr(F), I = Rr(O), N = [], B = 0; B < k.length; B++) {
      var re, K = k[B], D = I[B];
      if (D != null) {
        N.push(D);
        continue;
      }
      var U = N[B - 1], J = k[B - 1];
      if ((U == null ? void 0 : U.element) !== (J == null ? void 0 : J.element))
        break;
      var Q = r.get(K.element);
      if (!Q)
        break;
      var ie = {
        input: H,
        source: C,
        element: Q.element
      };
      if (Q.canDrop && !Q.canDrop(ie) || !((re = Q.getIsSticky) !== null && re !== void 0 && re.call(Q, ie)))
        break;
      N.push(rt(rt({}, K), {}, {
        // making it clear to consumers this drop target is active due to stickiness
        isActiveDueToStickiness: !0
      }));
    }
    return Rr(N);
  }
  return {
    dropTargetForConsumers: l,
    getIsOver: y,
    dispatchEvent: p
  };
}
function Pd(e, t) {
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
      yn(e, r, n[r]);
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
    return xt(l);
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
      var c = Pd(e), a;
      try {
        for (c.s(); !(a = c.n()).done; ) {
          var u = a.value;
          n(u);
        }
      } catch (H) {
        c.e(H);
      } finally {
        c.f();
      }
    }
    if (t) {
      for (var p = Array.from(t.active), y = 0, v = p; y < v.length; y++) {
        var C = v[y];
        if (t.active.has(C)) {
          var E;
          (E = C[i]) === null || E === void 0 || E.call(C, l);
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
  function c(p) {
    r == null || r(p), l.dispatchEvent(p), i.dispatchEvent(p), o == null || o(p);
  }
  function a(p) {
    var y = p.event, v = p.dragType;
    os.start({
      event: y,
      dragType: v,
      getDropTargetsOver: l.getIsOver,
      dispatchEvent: c
    });
  }
  function u() {
    function p() {
      var y = {
        canStart: os.canStart,
        start: a
      };
      return n(y);
    }
    return Md({
      typeKey: t,
      mount: p
    });
  }
  return {
    registerUsage: u,
    dropTarget: l.dropTargetForConsumers,
    monitor: i.monitorForConsumers
  };
}
var Fd = xt(function() {
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
    return sr(us.bindEvents(), bt.bind(document, {
      type: "dragstart",
      listener: function(r) {
        var o, s, i, l, c, a;
        if (t.canStart(r) && !r.defaultPrevented && r.dataTransfer) {
          var u = r.target;
          if (u instanceof HTMLElement) {
            var p = $n.get(u);
            if (p) {
              var y = nn(r), v = {
                element: p.element,
                dragHandle: (o = p.dragHandle) !== null && o !== void 0 ? o : null,
                input: y
              };
              if (p.canDrag && !p.canDrag(v)) {
                r.preventDefault();
                return;
              }
              if (p.dragHandle) {
                var C = rl({
                  x: y.clientX,
                  y: y.clientY
                });
                if (!p.dragHandle.contains(C)) {
                  r.preventDefault();
                  return;
                }
              }
              var E = (s = (i = p.getInitialDataForExternal) === null || i === void 0 ? void 0 : i.call(p, v)) !== null && s !== void 0 ? s : null;
              if (E)
                for (var H = 0, F = Object.entries(E); H < F.length; H++) {
                  var O = el(F[H], 2), k = O[0], I = O[1];
                  r.dataTransfer.setData(k, I ?? "");
                }
              Fd() && !r.dataTransfer.types.includes(as) && !r.dataTransfer.types.includes(Hd) && r.dataTransfer.setData(as, jd), r.dataTransfer.setData(kd, "");
              var N = {
                element: p.element,
                dragHandle: (l = p.dragHandle) !== null && l !== void 0 ? l : null,
                data: (c = (a = p.getInitialData) === null || a === void 0 ? void 0 : a.call(p, v)) !== null && c !== void 0 ? c : {}
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
  return xt(t);
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
      yn(e, r, n[r]);
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
  var p = o * r;
  if (i.x < l.left + p) {
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
  return ds(ds({}, e), {}, yn({}, ul, i));
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
}, gp = ["checked", ".indeterminate", "aria-label", "onClick"], hp = ["innerHTML"], mp = { class: "pnl-tst-value" }, yp = "title", Cn = "pnl-tst-row", vp = 500, wp = {
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
      rowExpandingFeature: Ef,
      rowSelectionFeature: $f,
      coreRowModel: Vi(),
      expandedRowModel: Vf()
    }, r = ue(() => (t.state.columns || []).length > 0), o = ue(() => {
      const g = t.state.columns || [];
      return g.length === 0 ? [{ id: yp, header: "", accessorFn: (h) => h.title }] : g.map((h) => {
        const w = h.field ?? h.id;
        return {
          id: h.id,
          header: h.header ?? h.id,
          accessorFn: (R) => R[w],
          meta: { width: h.width }
        };
      });
    }), s = /* @__PURE__ */ Pt(i(t.state.expandedKeys));
    function i(g) {
      const h = {};
      for (const w of g || []) h[w] = !0;
      return h;
    }
    function l(g) {
      return g === !0 ? E.getCoreRowModel().flatRows.filter((h) => h.subRows.length > 0).map((h) => h.id).sort() : Object.keys(g).filter((h) => g[h]).sort();
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
      return g.length !== h.length ? !1 : g.every((w, R) => w === h[R]);
    }
    const p = ue(() => t.state.options.select_mode ?? "none"), y = ue(() => p.value !== "none"), v = ue(() => p.value === "hierarchy"), C = /* @__PURE__ */ Pt(i(t.state.selectedKeys)), E = Uf({
      features: n,
      data: ue(() => t.state.source || []),
      columns: o,
      getRowId: (g) => g.key,
      getSubRows: (g) => g.children,
      // TanStack resets `expanded` whenever `data` changes. Python rewrites the
      // whole tree after every move, so leaving that on would collapse the tree on
      // each drop and push an empty `expanded_keys` back. Expansion is owned here.
      autoResetExpanded: !1,
      enableRowSelection: y,
      enableMultiRowSelection: ue(() => p.value !== "single"),
      enableSubRowSelection: v,
      state: ue(() => ({ expanded: s.value, rowSelection: C.value })),
      onExpandedChange: (g) => {
        s.value = typeof g == "function" ? g(s.value) : g;
      },
      onRowSelectionChange: (g) => {
        C.value = typeof g == "function" ? g(C.value) : g;
      }
    });
    function H(g) {
      const h = { ...g }, w = (R) => {
        R.subRows.forEach(w), R.subRows.length !== 0 && (R.subRows.every(($) => h[$.id]) ? h[R.id] = !0 : delete h[R.id]);
      };
      return E.getCoreRowModel().rows.forEach(w), h;
    }
    _e(() => l(C.value), t.setSelectedKeys, { flush: "post" }), _e(
      () => [C.value, E.getCoreRowModel().rows],
      () => {
        if (!v.value) return;
        const g = H(C.value);
        u(l(g), l(C.value)) || (C.value = g);
      },
      { immediate: !0, flush: "post" }
    ), _e(() => l(s.value), t.setExpandedKeys, { flush: "post" }), _e(
      () => t.state.expandedKeys,
      (g) => {
        u(l(s.value), [...g || []].sort()) || (s.value = i(g));
      }
    ), _e(
      () => t.state.selectedKeys,
      (g) => {
        u(l(C.value), [...g || []].sort()) || (C.value = i(g));
      }
    ), _e(
      () => [t.state.options.expand_all, t.state.source],
      ([g]) => {
        g && E.toggleAllRowsExpanded(!0);
      },
      { immediate: !0 }
    );
    const F = ue(() => E.getRowModel().rows), O = ue(() => {
      var g;
      return ((g = E.getHeaderGroups()[0]) == null ? void 0 : g.headers) ?? [];
    }), k = ue(() => t.state.options.indent_px ?? 16), I = ue(() => t.state.options.aria_label ?? "Tree table"), N = ue(() => r.value ? 2 : 1), B = ue(() => F.value.length + (r.value ? 1 : 0));
    function re(g) {
      const h = g.getParentRow();
      return h ? h.subRows.length : E.getCoreRowModel().rows.length;
    }
    function K(g) {
      var w;
      const h = (w = g.meta) == null ? void 0 : w.width;
      return h ? { flex: `0 0 ${h}px` } : { flex: "1 1 0" };
    }
    function D(g, h) {
      return { ...K(h), paddingInlineStart: `${g.depth * k.value}px` };
    }
    const U = /* @__PURE__ */ Pt(null), J = /* @__PURE__ */ new Map();
    function Q(g, h) {
      h ? J.set(g, h) : J.delete(g);
    }
    const ie = ue(() => {
      const g = F.value;
      return g.length === 0 ? null : g.some((h) => h.id === U.value) ? U.value : g[0].id;
    });
    function ce(g) {
      g != null && (U.value = g, Vs(() => {
        var h;
        return (h = J.get(g)) == null ? void 0 : h.focus();
      }));
    }
    function ae(g) {
      const h = F.value;
      h.length !== 0 && ce(h[Math.max(0, Math.min(g, h.length - 1))].id);
    }
    function ee(g) {
      const h = F.value;
      if (h.length === 0) return;
      const w = Math.max(
        0,
        h.findIndex(($) => $.id === ie.value)
      ), R = h[w];
      switch (g.key) {
        case "ArrowDown":
          g.preventDefault(), ae(w + 1);
          break;
        case "ArrowUp":
          g.preventDefault(), ae(w - 1);
          break;
        case "ArrowRight":
          if (g.preventDefault(), !R.getCanExpand()) break;
          R.getIsExpanded() ? ae(w + 1) : (R.toggleExpanded(!0), ce(R.id));
          break;
        case "ArrowLeft":
          g.preventDefault(), R.getCanExpand() && R.getIsExpanded() ? (R.toggleExpanded(!1), ce(R.id)) : R.parentId && ce(R.parentId);
          break;
        case "Home":
          g.preventDefault(), ae(0);
          break;
        case "End":
          g.preventDefault(), ae(h.length - 1);
          break;
        case "Enter":
          g.preventDefault(), t.emitEvent("activate", { key: R.id });
          break;
        case " ":
          if (!y.value) break;
          g.preventDefault(), ct(R);
          break;
      }
    }
    function G(g) {
      U.value = g.id, t.emitEvent("activate", { key: g.id });
    }
    function Y(g) {
      U.value = g.id, g.toggleExpanded();
    }
    function Ne(g) {
      return !g.getIsSelected() && g.getIsSomeSelected();
    }
    function ct(g) {
      U.value = g.id, g.toggleSelected(void 0, {
        selectChildren: v.value,
        deselectParents: v.value
      });
    }
    function Be(g) {
      ct(g), ce(g.id);
    }
    const Ce = ["reorder-above", "reorder-below", "make-child", "reparent"], Rt = ue(() => t.state.options.enable_dnd === !0), Nt = /* @__PURE__ */ Pt(null), Ct = /* @__PURE__ */ Pt(null);
    function nt(g) {
      return F.value.find((h) => h.id === g) ?? null;
    }
    function Mt(g, h) {
      let w = g;
      for (; w; ) {
        if (w.id === h) return !0;
        w = w.getParentRow();
      }
      return !1;
    }
    function Bt(g, h) {
      return Mt(g, h) ? Ce : g.original.allow_children === !1 ? ["make-child"] : [];
    }
    function vn(g) {
      if (g.getCanExpand() && g.getIsExpanded()) return "expanded";
      const h = g.getParentRow(), w = h ? h.subRows : E.getCoreRowModel().rows;
      return g.index === w.length - 1 ? "last-in-group" : "standard";
    }
    let We = null, Et = null;
    function f() {
      Et && clearTimeout(Et), Et = null, We = null;
    }
    function d(g, h) {
      if (We === g || (f(), !h || h.type === "instruction-blocked")) return;
      const w = nt(g);
      !w || !w.getCanExpand() || w.getIsExpanded() || (We = g, Et = setTimeout(() => {
        Et = null;
        const R = nt(g);
        R && R.getCanExpand() && !R.getIsExpanded() && R.toggleExpanded(!0);
      }, vp));
    }
    function m() {
      Ct.value = null, f();
    }
    const x = /* @__PURE__ */ Pt(null);
    function S() {
      let g = x.value;
      if (!g) return null;
      let h = g.getRootNode();
      for (; h.host; )
        g = h.host, h = g.getRootNode();
      return g;
    }
    function b(g) {
      for (const h of F.value) {
        const w = J.get(h.id);
        if (!w) continue;
        const R = w.getBoundingClientRect();
        if (g.clientX >= R.left && g.clientX < R.right && g.clientY >= R.top && g.clientY < R.bottom)
          return { row: h, element: w, rect: R };
      }
      return null;
    }
    function A(g, h) {
      for (const w of g.element.querySelectorAll(".pnl-tst-check, .pnl-tst-twisty")) {
        const R = w.getBoundingClientRect();
        if (h.clientX >= R.left && h.clientX < R.right && h.clientY >= R.top && h.clientY < R.bottom)
          return !0;
      }
      return !1;
    }
    let M = null;
    function P() {
      M == null || M(), M = null;
      const g = S();
      !g || !Rt.value || (M = sr(
        $d({
          element: g,
          // Anything outside a row (the header, the empty space below the last row)
          // is not a drag handle, and returning false cancels the native drag.
          canDrag: ({ input: h }) => {
            const w = b(h);
            return w !== null && !A(w, h);
          },
          getInitialData: ({ input: h }) => {
            var w;
            return { type: Cn, key: ((w = b(h)) == null ? void 0 : w.row.id) ?? null };
          },
          onGenerateDragPreview: ({ location: h, nativeSetDragImage: w }) => {
            const R = h.current.input, $ = b(R);
            !$ || !w || w($.element, R.clientX - $.rect.left, R.clientY - $.rect.top);
          },
          onDragStart: ({ source: h }) => {
            Nt.value = h.data.key;
          },
          onDrop: () => {
            Nt.value = null, m();
          }
        }),
        Kd({
          element: g,
          canDrop: ({ source: h }) => h.data.type === Cn,
          getData: ({ input: h, source: w }) => {
            const R = b(h);
            if (!R) return { type: Cn, key: null };
            const $ = { type: Cn, key: R.row.id };
            return Yd($, {
              element: R.element,
              input: h,
              currentLevel: R.row.depth,
              indentPerLevel: k.value,
              mode: vn(R.row),
              block: Bt(R.row, w.data.key)
            });
          },
          onDrag: ({ self: h }) => {
            const w = h.data.key, R = ps(h.data);
            Ct.value = w && R ? { key: w, instruction: R } : null, d(w ?? null, R);
          },
          onDragLeave: m,
          onDrop: ({ self: h, source: w }) => {
            m();
            const R = h.data.key, $ = ps(h.data);
            !R || !$ || $.type === "instruction-blocked" || R !== w.data.key && t.emitEvent("move", {
              key: w.data.key,
              targetKey: R,
              instruction: $.type,
              desiredLevel: $.desiredLevel ?? $.currentLevel
            });
          }
        })
      ));
    }
    Js(P), _e(Rt, P), Zs(() => {
      f(), M == null || M();
    });
    function _(g) {
      var h;
      return ((h = Ct.value) == null ? void 0 : h.key) === g.id ? Ct.value.instruction : null;
    }
    function L(g) {
      const h = _(g);
      return {
        "pnl-tst-row--draggable": Rt.value,
        "pnl-tst-row--dragging": Nt.value === g.id,
        "pnl-tst-row--blocked": (h == null ? void 0 : h.type) === "instruction-blocked",
        "pnl-tst-row--child-target": (h == null ? void 0 : h.type) === "make-child"
      };
    }
    function T(g) {
      const h = _(g);
      return h ? h.type === "reorder-above" ? "pnl-tst-dropline--above" : h.type === "reorder-below" || h.type === "reparent" ? "pnl-tst-dropline--below" : null : null;
    }
    function j(g) {
      const h = _(g);
      return h ? { insetInlineStart: `${(h.type === "reparent" ? h.desiredLevel : h.currentLevel) * h.indentPerLevel}px` } : null;
    }
    return (g, h) => (fe(), pe("div", {
      ref_key: "rootElement",
      ref: x,
      class: "pnl-tst"
    }, [
      F.value.length === 0 ? (fe(), pe("div", op, "No data")) : (fe(), pe("div", {
        key: 1,
        class: "pnl-tst-grid",
        role: "treegrid",
        "aria-label": I.value,
        "aria-colcount": O.value.length,
        "aria-rowcount": B.value,
        onKeydown: ee
      }, [
        r.value ? (fe(), pe("div", ip, [
          dt("div", lp, [
            (fe(!0), pe(xe, null, gr(O.value, (w, R) => (fe(), pe("div", {
              key: w.id,
              class: "pnl-tst-hcell",
              role: "columnheader",
              "aria-colindex": R + 1,
              style: Dt(K(w.column.columnDef))
            }, Mr(w.column.columnDef.header), 13, cp))), 128))
          ])
        ])) : qt("", !0),
        dt("div", ap, [
          (fe(!0), pe(xe, null, gr(F.value, (w, R) => (fe(), pe("div", {
            key: w.id,
            ref_for: !0,
            ref: ($) => Q(w.id, $),
            class: pt(["pnl-tst-row", [L(w), { "pnl-tst-row--active": w.id === U.value }]]),
            role: "row",
            "aria-level": w.depth + 1,
            "aria-posinset": w.index + 1,
            "aria-setsize": re(w),
            "aria-rowindex": R + N.value,
            "aria-expanded": w.getCanExpand() ? w.getIsExpanded() : void 0,
            "aria-selected": y.value ? w.getIsSelected() : void 0,
            tabindex: w.id === ie.value ? 0 : -1,
            onClick: ($) => G(w),
            onFocus: ($) => U.value = w.id
          }, [
            T(w) ? (fe(), pe("span", {
              key: 0,
              class: pt(["pnl-tst-dropline", T(w)]),
              style: Dt(j(w)),
              "aria-hidden": "true"
            }, null, 6)) : qt("", !0),
            (fe(!0), pe(xe, null, gr(w.getAllCells(), ($, oe) => (fe(), pe("div", {
              key: $.id,
              class: pt(["pnl-tst-cell", { "pnl-tst-cell--tree": oe === 0 }]),
              role: "gridcell",
              "aria-colindex": oe + 1,
              style: Dt(
                oe === 0 ? D(w, $.column.columnDef) : K($.column.columnDef)
              )
            }, [
              oe === 0 ? (fe(), pe(xe, { key: 0 }, [
                w.getCanExpand() ? (fe(), pe("span", {
                  key: 0,
                  class: pt(["pnl-tst-twisty", { "pnl-tst-twisty--open": w.getIsExpanded() }]),
                  "aria-hidden": "true",
                  onClick: Bo((Me) => Y(w), ["stop"])
                }, [...h[0] || (h[0] = [
                  dt("svg", {
                    viewBox: "0 0 16 16",
                    width: "12",
                    height: "12",
                    focusable: "false"
                  }, [
                    dt("path", {
                      d: "M6 3.5 10.5 8 6 12.5",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "1.6"
                    })
                  ], -1)
                ])], 10, dp)) : (fe(), pe("span", pp)),
                y.value ? (fe(), pe("input", {
                  key: 2,
                  class: "pnl-tst-check",
                  type: "checkbox",
                  tabindex: "-1",
                  checked: w.getIsSelected(),
                  ".indeterminate": Ne(w),
                  "aria-label": `Select ${w.original.title ?? w.id}`,
                  onClick: Bo((Me) => Be(w), ["stop"])
                }, null, 40, gp)) : qt("", !0),
                a(w) ? (fe(), pe("span", {
                  key: 3,
                  class: "pnl-tst-icon",
                  "aria-hidden": "true",
                  innerHTML: a(w)
                }, null, 8, hp)) : qt("", !0)
              ], 64)) : qt("", !0),
              dt("span", mp, Mr($.getValue()), 1)
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
  }), o = (u, p) => {
    e.set("_event_data", {
      event_name: u,
      event_params: p,
      timestamp: Date.now()
    }), e.save_changes();
  }, s = (u, p) => u.length === p.length && u.every((y, v) => y === p[v]), i = (u) => (p) => {
    const y = [...e.get(u) || []].sort();
    s(y, p) || (e.set(u, p), e.save_changes());
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

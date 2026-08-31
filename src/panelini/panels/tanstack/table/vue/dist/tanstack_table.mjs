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
const ne = {}, It = [], Ve = () => {
}, gs = () => !1, Ln = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Kn = (e) => e.startsWith("onUpdate:"), pe = Object.assign, Ur = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, fl = Object.prototype.hasOwnProperty, q = (e, t) => fl.call(e, t), L = Array.isArray, ct = (e) => cn(e) === "[object Map]", En = (e) => cn(e) === "[object Set]", ho = (e) => cn(e) === "[object Date]", $ = (e) => typeof e == "function", re = (e) => typeof e == "string", We = (e) => typeof e == "symbol", J = (e) => e !== null && typeof e == "object", hs = (e) => (J(e) || $(e)) && $(e.then) && $(e.catch), ms = Object.prototype.toString, cn = (e) => ms.call(e), dl = (e) => cn(e).slice(8, -1), ys = (e) => cn(e) === "[object Object]", Gr = (e) => re(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Gt = /* @__PURE__ */ Br(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), $n = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, pl = /-\w/g, Oe = $n(
  (e) => e.replace(pl, (t) => t.slice(1).toUpperCase())
), gl = /\B([A-Z])/g, xt = $n(
  (e) => e.replace(gl, "-$1").toLowerCase()
), vs = $n((e) => e.charAt(0).toUpperCase() + e.slice(1)), lr = $n(
  (e) => e ? `on${vs(e)}` : ""
), $e = (e, t) => !Object.is(e, t), cr = (e, ...t) => {
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
const Nn = () => mo || (mo = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function At(e) {
  if (L(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], o = re(r) ? wl(r) : At(r);
      if (o)
        for (const s in o)
          t[s] = o[s];
    }
    return t;
  } else if (re(e) || J(e))
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
  if (re(e))
    t = e;
  else if (L(e))
    for (let n = 0; n < e.length; n++) {
      const r = ht(e[n]);
      r && (t += r + " ");
    }
  else if (J(e))
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
    n = Vn(e[r], t[r]);
  return n;
}
function yo(e, t) {
  if (e.size !== t.size) return !1;
  const n = Array.from(t), r = new Uint8Array(n.length);
  for (const o of e) {
    let s = -1;
    for (let i = 0; i < n.length; i++)
      if (!r[i] && Vn(o, n[i])) {
        s = i;
        break;
      }
    if (s < 0) return !1;
    r[s] = 1;
  }
  return !0;
}
function Vn(e, t) {
  if (e === t) return !0;
  let n = ho(e), r = ho(t);
  if (n || r)
    return n && r ? e.getTime() === t.getTime() : !1;
  if (n = We(e), r = We(t), n || r)
    return e === t;
  if (n = L(e), r = L(t), n || r)
    return n && r ? Sl(e, t) : !1;
  if (n = J(e), r = J(t), n || r) {
    if (!n || !r)
      return !1;
    if (n = ct(e), r = ct(t), n || r || (n = En(e), r = En(t), n || r))
      return n && r ? yo(e, t) : !1;
    const o = Object.keys(e).length, s = Object.keys(t).length;
    if (o !== s)
      return !1;
    for (const i in e) {
      const l = e.hasOwnProperty(i), c = t.hasOwnProperty(i);
      if (l && !c || !l && c || !Vn(e[i], t[i]))
        return !1;
    }
  }
  return String(e) === String(t);
}
const _s = (e) => !!(e && e.__v_isRef === !0), Pr = (e) => re(e) ? e : e == null ? "" : L(e) || J(e) && (e.toString === ms || !$(e.toString)) ? _s(e) ? Pr(e.value) : JSON.stringify(e, Ss, 2) : String(e), Ss = (e, t) => _s(t) ? Ss(e, t.value) : ct(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [r, o], s) => (n[ar(r, s) + " =>"] = o, n),
    {}
  )
} : En(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => ar(n))
} : We(t) ? ar(t) : J(t) && !L(t) && !ys(t) ? String(t) : t, ar = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    We(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let ie;
class xl {
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
function xs() {
  return ie;
}
function Rl(e, t = !1) {
  ie && ie.cleanups.push(e);
}
let te;
const ur = /* @__PURE__ */ new WeakSet();
class Rs {
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
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ps(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, vo(this), Es(this);
    const t = te, n = Me;
    te = this, Me = !0;
    try {
      return this.fn();
    } finally {
      Os(this), te = t, Me = n, this.flags &= -3;
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
    Er(this) && this.run();
  }
  get dirty() {
    return Er(this);
  }
}
let Cs = 0, qt, Yt;
function Ps(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Yt, Yt = e;
    return;
  }
  e.next = qt, qt = e;
}
function qr() {
  Cs++;
}
function Yr() {
  if (--Cs > 0)
    return;
  if (Yt) {
    let t = Yt;
    for (Yt = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; qt; ) {
    let t = qt;
    for (qt = void 0; t; ) {
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
    r.version === -1 ? (r === n && (n = o), zr(r), Cl(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = o;
  }
  e.deps = t, e.depsTail = n;
}
function Er(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Ms(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Ms(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Qt) || (e.globalVersion = Qt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Er(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = te, r = Me;
  te = e, Me = !0;
  try {
    Es(e);
    const o = e.fn(e._value);
    (t.version === 0 || $e(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    te = n, Me = r, Os(e), e.flags &= -3;
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
function Ze() {
  Is.push(Me), Me = !1;
}
function Qe() {
  const e = Is.pop();
  Me = e === void 0 ? !0 : e;
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
let Qt = 0;
class Pl {
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
    if (!te || !Me || te === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== te)
      n = this.activeLink = new Pl(te, this), te.deps ? (n.prevDep = te.depsTail, te.depsTail.nextDep = n, te.depsTail = n) : te.deps = te.depsTail = n, As(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const r = n.nextDep;
      r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = te.depsTail, n.nextDep = void 0, te.depsTail.nextDep = n, te.depsTail = n, te.deps === n && (te.deps = r);
    }
    return n;
  }
  trigger(t) {
    this.version++, Qt++, this.notify(t);
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
), en = /* @__PURE__ */ Symbol(
  ""
);
function fe(e, t, n) {
  if (Me && te) {
    let r = Or.get(e);
    r || Or.set(e, r = /* @__PURE__ */ new Map());
    let o = r.get(n);
    o || (r.set(n, o = new Xr()), o.map = r, o.key = n), o.track();
  }
}
function Xe(e, t, n, r, o, s) {
  const i = Or.get(e);
  if (!i) {
    Qt++;
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
      i.forEach((h, v) => {
        (v === "length" || v === en || !We(v) && v >= u) && l(h);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && l(i.get(n)), a && l(i.get(en)), t) {
        case "add":
          c ? a && l(i.get("length")) : (l(i.get(mt)), ct(e) && l(i.get(Mr)));
          break;
        case "delete":
          c || (l(i.get(mt)), ct(e) && l(i.get(Mr)));
          break;
        case "set":
          ct(e) && l(i.get(mt));
          break;
      }
  }
  Yr();
}
function Pt(e) {
  const t = /* @__PURE__ */ G(e);
  return t === e ? t : (fe(t, "iterate", en), /* @__PURE__ */ Pe(e) ? t : t.map(Ie));
}
function Wn(e) {
  return fe(e = /* @__PURE__ */ G(e), "iterate", en), e;
}
function Le(e, t) {
  return /* @__PURE__ */ et(e) ? jt(/* @__PURE__ */ yt(e) ? Ie(t) : t) : Ie(t);
}
const El = {
  __proto__: null,
  [Symbol.iterator]() {
    return fr(this, Symbol.iterator, (e) => Le(this, e));
  },
  concat(...e) {
    return Pt(this).concat(
      ...e.map((t) => L(t) ? Pt(t) : t)
    );
  },
  entries() {
    return fr(this, "entries", (e) => (e[1] = Le(this, e[1]), e));
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
      (n) => n.map((r) => Le(this, r)),
      arguments
    );
  },
  find(e, t) {
    return qe(
      this,
      "find",
      e,
      t,
      (n) => Le(this, n),
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
      (n) => Le(this, n),
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
    return dr(this, "includes", e);
  },
  indexOf(...e) {
    return dr(this, "indexOf", e);
  },
  join(e) {
    return Pt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return dr(this, "lastIndexOf", e);
  },
  map(e, t) {
    return qe(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Vt(this, "pop");
  },
  push(...e) {
    return Vt(this, "push", e);
  },
  reduce(e, ...t) {
    return wo(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return wo(this, "reduceRight", e, t);
  },
  shift() {
    return Vt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return qe(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Vt(this, "splice", e);
  },
  toReversed() {
    return Pt(this).toReversed();
  },
  toSorted(e) {
    return Pt(this).toSorted(e);
  },
  toSpliced(...e) {
    return Pt(this).toSpliced(...e);
  },
  unshift(...e) {
    return Vt(this, "unshift", e);
  },
  values() {
    return fr(this, "values", (e) => Le(this, e));
  }
};
function fr(e, t, n) {
  const r = Wn(e), o = r[t]();
  return r !== e && !/* @__PURE__ */ Pe(e) && (o._next = o.next, o.next = () => {
    const s = o._next();
    return s.done || (s.value = n(s.value)), s;
  }), o;
}
const Ol = Array.prototype;
function qe(e, t, n, r, o, s) {
  const i = Wn(e), l = i !== e && !/* @__PURE__ */ Pe(e), c = i[t];
  if (c !== Ol[t]) {
    const h = c.apply(e, s);
    return l ? Ie(h) : h;
  }
  let a = n;
  i !== e && (l ? a = function(h, v) {
    return n.call(this, Le(e, h), v, e);
  } : n.length > 2 && (a = function(h, v) {
    return n.call(this, h, v, e);
  }));
  const u = c.call(i, a, r);
  return l && o ? o(u) : u;
}
function wo(e, t, n, r) {
  const o = Wn(e), s = o !== e && !/* @__PURE__ */ Pe(e);
  let i = n, l = !1;
  o !== e && (s ? (l = r.length === 0, i = function(a, u, h) {
    return l && (l = !1, a = Le(e, a)), n.call(this, a, Le(e, u), h, e);
  }) : n.length > 3 && (i = function(a, u, h) {
    return n.call(this, a, u, h, e);
  }));
  const c = o[t](i, ...r);
  return l ? Le(e, c) : c;
}
function dr(e, t, n) {
  const r = /* @__PURE__ */ G(e);
  fe(r, "iterate", en);
  const o = r[t](...n);
  return (o === -1 || o === !1) && /* @__PURE__ */ Qr(n[0]) ? (n[0] = /* @__PURE__ */ G(n[0]), r[t](...n)) : o;
}
function Vt(e, t, n = []) {
  Ze(), qr();
  const r = (/* @__PURE__ */ G(e))[t].apply(e, n);
  return Yr(), Qe(), r;
}
const Ml = /* @__PURE__ */ Br("__proto__,__v_isRef,__isVue"), Ts = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(We)
);
function Il(e) {
  We(e) || (e = String(e));
  const t = /* @__PURE__ */ G(this);
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
      /* @__PURE__ */ de(t) ? t : r
    );
    if ((We(n) ? Ts.has(n) : Ml(n)) || (o || fe(t, "get", n), s))
      return l;
    if (/* @__PURE__ */ de(l)) {
      const c = i && Gr(n) ? l : l.value;
      return o && J(c) ? /* @__PURE__ */ Ar(c) : c;
    }
    return J(l) ? o ? /* @__PURE__ */ Ar(l) : /* @__PURE__ */ Bn(l) : l;
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
      const a = /* @__PURE__ */ et(s);
      if (!/* @__PURE__ */ Pe(r) && !/* @__PURE__ */ et(r) && (s = /* @__PURE__ */ G(s), r = /* @__PURE__ */ G(r)), !i && /* @__PURE__ */ de(s) && !/* @__PURE__ */ de(r))
        return a || (s.value = r), !0;
    }
    const l = i ? Number(n) < t.length : q(t, n), c = Reflect.set(
      t,
      n,
      r,
      /* @__PURE__ */ de(t) ? t : o
    );
    return t === /* @__PURE__ */ G(o) && c && (l ? $e(r, s) && Xe(t, "set", n, r) : Xe(t, "add", n, r)), c;
  }
  deleteProperty(t, n) {
    const r = q(t, n);
    t[n];
    const o = Reflect.deleteProperty(t, n);
    return o && r && Xe(t, "delete", n, void 0), o;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!We(n) || !Ts.has(n)) && fe(t, "has", n), r;
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
const Ir = (e) => e, hn = (e) => Reflect.getPrototypeOf(e);
function jl(e, t, n) {
  return function(...r) {
    const o = this.__v_raw, s = /* @__PURE__ */ G(o), i = ct(s), l = e === "entries" || e === Symbol.iterator && i, c = e === "keys" && i, a = o[e](...r), u = n ? Ir : t ? jt : Ie;
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
          const { value: h, done: v } = a.next();
          return v ? { value: h, done: v } : {
            value: l ? [u(h[0]), u(h[1])] : u(h),
            done: v
          };
        }
      }
    );
  };
}
function mn(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Hl(e, t) {
  const n = {
    get(o) {
      const s = this.__v_raw, i = /* @__PURE__ */ G(s), l = /* @__PURE__ */ G(o);
      e || ($e(o, l) && fe(i, "get", o), fe(i, "get", l));
      const { has: c } = hn(i), a = t ? Ir : e ? jt : Ie;
      if (c.call(i, o))
        return a(s.get(o));
      if (c.call(i, l))
        return a(s.get(l));
      s !== i && s.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && fe(/* @__PURE__ */ G(o), "iterate", mt), o.size;
    },
    has(o) {
      const s = this.__v_raw, i = /* @__PURE__ */ G(s), l = /* @__PURE__ */ G(o);
      return e || ($e(o, l) && fe(i, "has", o), fe(i, "has", l)), o === l ? s.has(o) : s.has(o) || s.has(l);
    },
    forEach(o, s) {
      const i = this, l = i.__v_raw, c = /* @__PURE__ */ G(l), a = t ? Ir : e ? jt : Ie;
      return !e && fe(c, "iterate", mt), l.forEach((u, h) => o.call(s, a(u), a(h), i));
    }
  };
  return pe(
    n,
    e ? {
      add: mn("add"),
      set: mn("set"),
      delete: mn("delete"),
      clear: mn("clear")
    } : {
      add(o) {
        const s = /* @__PURE__ */ G(this), i = hn(s), l = /* @__PURE__ */ G(o), c = !t && !/* @__PURE__ */ Pe(o) && !/* @__PURE__ */ et(o) ? l : o;
        return i.has.call(s, c) || $e(o, c) && i.has.call(s, o) || $e(l, c) && i.has.call(s, l) || (s.add(c), Xe(s, "add", c, c)), this;
      },
      set(o, s) {
        !t && !/* @__PURE__ */ Pe(s) && !/* @__PURE__ */ et(s) && (s = /* @__PURE__ */ G(s));
        const i = /* @__PURE__ */ G(this), { has: l, get: c } = hn(i);
        let a = l.call(i, o);
        a || (o = /* @__PURE__ */ G(o), a = l.call(i, o));
        const u = c.call(i, o);
        return i.set(o, s), a ? $e(s, u) && Xe(i, "set", o, s) : Xe(i, "add", o, s), this;
      },
      delete(o) {
        const s = /* @__PURE__ */ G(this), { has: i, get: l } = hn(s);
        let c = i.call(s, o);
        c || (o = /* @__PURE__ */ G(o), c = i.call(s, o)), l && l.call(s, o);
        const a = s.delete(o);
        return c && Xe(s, "delete", o, void 0), a;
      },
      clear() {
        const o = /* @__PURE__ */ G(this), s = o.size !== 0, i = o.clear();
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
function Jr(e, t) {
  const n = Hl(e, t);
  return (r, o, s) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(
    q(n, o) && o in r ? n : r,
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
function Bn(e) {
  return /* @__PURE__ */ et(e) ? e : Zr(
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
  if (!J(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
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
  return /* @__PURE__ */ et(e) ? /* @__PURE__ */ yt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function et(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Pe(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Qr(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function G(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ G(t) : e;
}
function Wl(e) {
  return !q(e, "__v_skip") && Object.isExtensible(e) && ws(e, "__v_skip", !0), e;
}
const Ie = (e) => J(e) ? /* @__PURE__ */ Bn(e) : e, jt = (e) => J(e) ? /* @__PURE__ */ Ar(e) : e;
// @__NO_SIDE_EFFECTS__
function de(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Et(e) {
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
    this.dep = new Xr(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ G(t), this._value = n ? t : Ie(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, r = this.__v_isShallow || /* @__PURE__ */ Pe(t) || /* @__PURE__ */ et(t);
    t = r ? t : /* @__PURE__ */ G(t), $e(t, n) && (this._rawValue = t, this._value = r ? t : Ie(t), this.dep.trigger());
  }
}
function Tt(e) {
  return /* @__PURE__ */ de(e) ? e.value : e;
}
const Gl = {
  get: (e, t, n) => t === "__v_raw" ? e : Tt(Reflect.get(e, t, n)),
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
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Xr(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Qt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    te !== this)
      return Ps(this, !0), !0;
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
const yn = {}, On = /* @__PURE__ */ new WeakMap();
let pt;
function zl(e, t = !1, n = pt) {
  if (n) {
    let r = On.get(n);
    r || On.set(n, r = []), r.push(e);
  }
}
function Xl(e, t, n = ne) {
  const { immediate: r, deep: o, once: s, scheduler: i, augmentJob: l, call: c } = n, a = (I) => o ? I : /* @__PURE__ */ Pe(I) || o === !1 || o === 0 ? lt(I, 1) : lt(I);
  let u, h, v, w, R = !1, E = !1;
  if (/* @__PURE__ */ de(e) ? (h = () => e.value, R = /* @__PURE__ */ Pe(e)) : /* @__PURE__ */ yt(e) ? (h = () => a(e), R = !0) : L(e) ? (E = !0, R = e.some((I) => /* @__PURE__ */ yt(I) || /* @__PURE__ */ Pe(I)), h = () => e.map((I) => {
    if (/* @__PURE__ */ de(I))
      return I.value;
    if (/* @__PURE__ */ yt(I))
      return a(I);
    if ($(I))
      return c ? c(I, 2) : I();
  })) : $(e) ? t ? h = c ? () => c(e, 2) : e : h = () => {
    if (v) {
      Ze();
      try {
        v();
      } finally {
        Qe();
      }
    }
    const I = pt;
    pt = u;
    try {
      return c ? c(e, 3, [w]) : e(w);
    } finally {
      pt = I;
    }
  } : h = Ve, t && o) {
    const I = h, k = o === !0 ? 1 / 0 : o;
    h = () => lt(I(), k);
  }
  const T = xs(), j = () => {
    u.stop(), T && T.active && Ur(T.effects, u);
  };
  if (s && t) {
    const I = t;
    t = (...k) => {
      const K = I(...k);
      return j(), K;
    };
  }
  let C = E ? new Array(e.length).fill(yn) : yn;
  const F = (I) => {
    if (!(!(u.flags & 1) || !u.dirty && !I))
      if (t) {
        const k = u.run();
        if (I || o || R || (E ? k.some((K, B) => $e(K, C[B])) : $e(k, C))) {
          v && v();
          const K = pt;
          pt = u;
          try {
            const B = [
              k,
              // pass undefined as the old value when it's changed for the first time
              C === yn ? void 0 : E && C[0] === yn ? [] : C,
              w
            ];
            C = k, c ? c(t, 3, B) : (
              // @ts-expect-error
              t(...B)
            );
          } finally {
            pt = K;
          }
        }
      } else
        u.run();
  };
  return l && l(F), u = new Rs(h), u.scheduler = i ? () => i(F, !1) : F, w = (I) => zl(I, !1, u), v = u.onStop = () => {
    const I = On.get(u);
    if (I) {
      if (c)
        c(I, 4);
      else
        for (const k of I) k();
      On.delete(u);
    }
  }, t ? r ? F(!0) : C = u.run() : i ? i(F.bind(null, !0), !0) : u.run(), j.pause = u.pause.bind(u), j.resume = u.resume.bind(u), j.stop = j, j;
}
function lt(e, t = 1 / 0, n) {
  if (t <= 0 || !J(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ de(e))
    lt(e.value, t, n);
  else if (L(e))
    for (let r = 0; r < e.length; r++)
      lt(e[r], t, n);
  else if (En(e) || ct(e))
    e.forEach((r) => {
      lt(r, t, n);
    });
  else if (ys(e)) {
    for (const r in e)
      lt(e[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, r) && lt(e[r], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function an(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (o) {
    Un(o, t, n);
  }
}
function Ae(e, t, n, r) {
  if ($(e)) {
    const o = an(e, t, n, r);
    return o && hs(o) && o.catch((s) => {
      Un(s, t, n);
    }), o;
  }
  if (L(e)) {
    const o = [];
    for (let s = 0; s < e.length; s++)
      o.push(Ae(e[s], t, n, r));
    return o;
  }
}
function Un(e, t, n, r = !0) {
  const o = t ? t.vnode : null, { errorHandler: s, throwUnhandledErrorInProduction: i } = t && t.appContext.config || ne;
  if (t) {
    let l = t.parent;
    const c = t.proxy, a = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const u = l.ec;
      if (u) {
        for (let h = 0; h < u.length; h++)
          if (u[h](e, c, a) === !1)
            return;
      }
      l = l.parent;
    }
    if (s) {
      Ze(), an(s, null, 10, [
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
const ye = [];
let ke = -1;
const Dt = [];
let it = null, Ot = 0;
const $s = /* @__PURE__ */ Promise.resolve();
let Mn = null;
function Ns(e) {
  const t = Mn || $s;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Zl(e) {
  let t = ke + 1, n = ye.length;
  for (; t < n; ) {
    const r = t + n >>> 1, o = ye[r], s = tn(o);
    s < e || s === e && o.flags & 2 ? t = r + 1 : n = r;
  }
  return t;
}
function eo(e) {
  if (!(e.flags & 1)) {
    const t = tn(e), n = ye[ye.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= tn(n) ? ye.push(e) : ye.splice(Zl(t), 0, e), e.flags |= 1, Vs();
  }
}
function Vs() {
  Mn || (Mn = $s.then(Bs));
}
function Ql(e) {
  if (!L(e))
    it && e.id === -1 ? it.splice(Ot + 1, 0, e) : e.flags & 1 || (Dt.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      Dt.push(e[t]);
  Vs();
}
function bo(e, t, n = ke + 1) {
  for (; n < ye.length; n++) {
    const r = ye[n];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid)
        continue;
      ye.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function Ws(e) {
  if (Dt.length) {
    const t = [...new Set(Dt)].sort(
      (n, r) => tn(n) - tn(r)
    );
    if (Dt.length = 0, it) {
      for (let n = 0; n < t.length; n++)
        it.push(t[n]);
      return;
    }
    for (it = t, Ot = 0; Ot < it.length; Ot++) {
      const n = it[Ot];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    it = null, Ot = 0;
  }
}
const tn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Bs(e) {
  try {
    for (ke = 0; ke < ye.length; ke++) {
      const t = ye[ke];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), an(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; ke < ye.length; ke++) {
      const t = ye[ke];
      t && (t.flags &= -2);
    }
    ke = -1, ye.length = 0, Ws(), Mn = null, (ye.length || Dt.length) && Bs();
  }
}
let Ne = null, Us = null;
function In(e) {
  const t = Ne;
  return Ne = e, Us = e && e.type.__scopeId || null, t;
}
function ec(e, t = Ne, n) {
  if (!t || e._n)
    return e;
  const r = (...o) => {
    r._d && Ao(-1);
    const s = In(t), i = vt.length;
    let l;
    try {
      l = e(...o);
    } finally {
      for (let c = vt.length; c > i; c--) yi();
      In(s), r._d && Ao(1);
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
    c && (Ze(), Ae(c, n, 8, [
      e.el,
      l,
      e,
      t
    ]), Qe());
  }
}
function tc(e, t) {
  if (ve) {
    let n = ve.provides;
    const r = ve.parent && ve.parent.provides;
    r === n && (n = ve.provides = Object.create(r)), n[e] = t;
  }
}
function xn(e, t, n = !1) {
  const r = Zc();
  if (r || Ft) {
    let o = Ft ? Ft._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && $(t) ? t.call(r && r.proxy) : t;
  }
}
const nc = /* @__PURE__ */ Symbol.for("v-scx"), rc = () => xn(nc);
function Ce(e, t, n) {
  return Gs(e, t, n);
}
function Gs(e, t, n = ne) {
  const { immediate: r, deep: o, flush: s, once: i } = n, l = pe({}, n), c = t && r || !t && s !== "post";
  let a;
  if (on) {
    if (s === "sync") {
      const w = rc();
      a = w.__watcherHandles || (w.__watcherHandles = []);
    } else if (!c) {
      const w = () => {
      };
      return w.stop = Ve, w.resume = Ve, w.pause = Ve, w;
    }
  }
  const u = ve;
  l.call = (w, R, E) => Ae(w, u, R, E);
  let h = !1;
  s === "post" ? l.scheduler = (w) => {
    _e(w, u && u.suspense);
  } : s !== "sync" && (h = !0, l.scheduler = (w, R) => {
    R ? w() : eo(w);
  }), l.augmentJob = (w) => {
    t && (w.flags |= 4), h && (w.flags |= 2, u && (w.id = u.uid, w.i = u));
  };
  const v = Xl(e, t, l);
  return on && (a ? a.push(v) : c && v()), v;
}
function oc(e, t, n) {
  const r = this.proxy, o = re(e) ? e.includes(".") ? qs(r, e) : () => r[e] : e.bind(r, r);
  let s;
  $(t) ? s = t : (s = t.handler, n = t);
  const i = un(this), l = Gs(o, s.bind(r), n);
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
const sc = /* @__PURE__ */ Symbol("_vte"), Gn = (e) => e.__isTeleport, pr = /* @__PURE__ */ Symbol("_leaveCb");
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
function Ys(e) {
  if (!no(e))
    return Gn(e.type) && e.children ? ic(e.children) : e;
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
      Gn(n.type) && Ys(n) || n,
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
const An = /* @__PURE__ */ new WeakMap();
function zt(e, t, n, r, o = !1) {
  if (L(e)) {
    e.forEach(
      (E, T) => zt(
        E,
        t && (L(t) ? t[T] : t),
        n,
        r,
        o
      )
    );
    return;
  }
  if (Xt(r) && !o) {
    r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && zt(e, t, n, r.component.subTree);
    return;
  }
  const s = r.shapeFlag & 4 ? so(r.component) : r.el, i = o ? null : s, { i: l, r: c } = e, a = t && t.r, u = l.refs === ne ? l.refs = {} : l.refs, h = l.setupState, v = /* @__PURE__ */ G(h), w = h === ne ? gs : (E) => _o(u, E) ? !1 : q(v, E), R = (E, T) => !(T && _o(u, T));
  if (a != null && a !== c) {
    if (So(t), re(a))
      u[a] = null, w(a) && (h[a] = null);
    else if (/* @__PURE__ */ de(a)) {
      const E = t;
      R(a, E.k) && (a.value = null), E.k && (u[E.k] = null);
    }
  }
  if ($(c))
    an(c, l, 12, [i, u]);
  else {
    const E = re(c), T = /* @__PURE__ */ de(c);
    if (E || T) {
      const j = () => {
        if (e.f) {
          const C = E ? w(c) ? h[c] : u[c] : R() || !e.k ? c.value : u[e.k];
          if (o)
            L(C) && Ur(C, s);
          else if (L(C))
            C.includes(s) || C.push(s);
          else if (E)
            u[c] = [s], w(c) && (h[c] = u[c]);
          else {
            const F = [s];
            R(c, e.k) && (c.value = F), e.k && (u[e.k] = F);
          }
        } else E ? (u[c] = i, w(c) && (h[c] = i)) : T && (R(c, e.k) && (c.value = i), e.k && (u[e.k] = i));
      };
      if (i) {
        const C = () => {
          j(), An.delete(e);
        };
        C.id = -1, An.set(e, C), _e(C, n);
      } else
        So(e), j();
    }
  }
}
function So(e) {
  const t = An.get(e);
  t && (t.flags |= 8, An.delete(e));
}
Nn().requestIdleCallback;
Nn().cancelIdleCallback;
const Xt = (e) => !!e.type.__asyncLoader, no = (e) => e.type.__isKeepAlive;
function lc(e, t) {
  Xs(e, "a", t);
}
function cc(e, t) {
  Xs(e, "da", t);
}
function Xs(e, t, n = ve) {
  const r = e.__wdc || (e.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (qn(t, r, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      no(o.parent.vnode) && ac(r, t, n, o), o = o.parent;
  }
}
function ac(e, t, n, r) {
  const o = qn(
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
function qn(e, t, n = ve, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), s = t.__weh || (t.__weh = (...i) => {
      Ze();
      const l = un(n), c = Ae(t, n, e, i);
      return l(), Qe(), c;
    });
    return r ? o.unshift(s) : o.push(s), s;
  }
}
const rt = (e) => (t, n = ve) => {
  (!on || e === "sp") && qn(e, (...r) => t(...r), n);
}, uc = rt("bm"), Js = rt("m"), fc = rt(
  "bu"
), dc = rt("u"), Zs = rt(
  "bum"
), Qs = rt("um"), pc = rt(
  "sp"
), gc = rt("rtg"), hc = rt("rtc");
function mc(e, t = ve) {
  qn("ec", e, t);
}
const yc = /* @__PURE__ */ Symbol.for("v-ndc");
function gr(e, t, n, r) {
  let o;
  const s = n, i = L(e);
  if (i || re(e)) {
    const l = i && /* @__PURE__ */ yt(e);
    let c = !1, a = !1;
    l && (c = !/* @__PURE__ */ Pe(e), a = /* @__PURE__ */ et(e), e = Wn(e)), o = new Array(e.length);
    for (let u = 0, h = e.length; u < h; u++)
      o[u] = t(
        c ? a ? jt(Ie(e[u])) : Ie(e[u]) : e[u],
        u,
        void 0,
        s
      );
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let l = 0; l < e; l++)
      o[l] = t(l + 1, l, void 0, s);
  } else if (J(e))
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
const Tr = (e) => e ? _i(e) ? so(e) : Tr(e.parent) : null, Jt = (
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
), hr = (e, t) => e !== ne && !e.__isScriptSetup && q(e, t), vc = {
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
        if (o !== ne && q(o, t))
          return i[t] = 2, o[t];
        if (q(s, t))
          return i[t] = 3, s[t];
        if (n !== ne && q(n, t))
          return i[t] = 4, n[t];
        Dr && (i[t] = 0);
      }
    }
    const a = Jt[t];
    let u, h;
    if (a)
      return t === "$attrs" && fe(e.attrs, "get", ""), a(e);
    if (
      // css module (injected by vue-loader)
      (u = l.__cssModules) && (u = u[t])
    )
      return u;
    if (n !== ne && q(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      h = c.config.globalProperties, q(h, t)
    )
      return h[t];
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: o, ctx: s } = e;
    return hr(o, t) ? (o[t] = n, !0) : r !== ne && q(r, t) ? (r[t] = n, !0) : q(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (s[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: o, props: s, type: i }
  }, l) {
    let c;
    return !!(n[l] || e !== ne && l[0] !== "$" && q(e, l) || hr(t, l) || q(s, l) || q(r, l) || q(Jt, l) || q(o.config.globalProperties, l) || (c = i.__cssModules) && c[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : q(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function xo(e) {
  return L(e) ? e.reduce(
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
    beforeMount: h,
    mounted: v,
    beforeUpdate: w,
    updated: R,
    activated: E,
    deactivated: T,
    beforeDestroy: j,
    beforeUnmount: C,
    destroyed: F,
    unmounted: I,
    render: k,
    renderTracked: K,
    renderTriggered: B,
    errorCaptured: H,
    serverPrefetch: A,
    // public API
    expose: V,
    inheritAttrs: Y,
    // assets
    components: U,
    directives: se,
    filters: we
  } = t;
  if (a && bc(a, r, null), i)
    for (const W in i) {
      const z = i[W];
      $(z) && (r[W] = z.bind(n));
    }
  if (o) {
    const W = o.call(n, n);
    J(W) && (e.data = /* @__PURE__ */ Bn(W));
  }
  if (Dr = !0, s)
    for (const W in s) {
      const z = s[W], Be = $(z) ? z.bind(n, n) : $(z.get) ? z.get.bind(n, n) : Ve, ot = !$(z) && $(z.set) ? z.set.bind(n) : Ve, Ee = le({
        get: Be,
        set: ot
      });
      Object.defineProperty(r, W, {
        enumerable: !0,
        configurable: !0,
        get: () => Ee.value,
        set: (ge) => Ee.value = ge
      });
    }
  if (l)
    for (const W in l)
      ei(l[W], r, n, W);
  if (c) {
    const W = $(c) ? c.call(n) : c;
    Reflect.ownKeys(W).forEach((z) => {
      tc(z, W[z]);
    });
  }
  u && Ro(u, e, "c");
  function ee(W, z) {
    L(z) ? z.forEach((Be) => W(Be.bind(n))) : z && W(z.bind(n));
  }
  if (ee(uc, h), ee(Js, v), ee(fc, w), ee(dc, R), ee(lc, E), ee(cc, T), ee(mc, H), ee(hc, K), ee(gc, B), ee(Zs, C), ee(Qs, I), ee(pc, A), L(V))
    if (V.length) {
      const W = e.exposed || (e.exposed = {});
      V.forEach((z) => {
        Object.defineProperty(W, z, {
          get: () => n[z],
          set: (Be) => n[z] = Be,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  k && e.render === Ve && (e.render = k), Y != null && (e.inheritAttrs = Y), U && (e.components = U), se && (e.directives = se), A && zs(e);
}
function bc(e, t, n = Ve) {
  L(e) && (e = Fr(e));
  for (const r in e) {
    const o = e[r];
    let s;
    J(o) ? "default" in o ? s = xn(
      o.from || r,
      o.default,
      !0
    ) : s = xn(o.from || r) : s = xn(o), /* @__PURE__ */ de(s) ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (i) => s.value = i
    }) : t[r] = s;
  }
}
function Ro(e, t, n) {
  Ae(
    L(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function ei(e, t, n, r) {
  let o = r.includes(".") ? qs(n, r) : () => n[r];
  if (re(e)) {
    const s = t[e];
    $(s) && Ce(o, s);
  } else if ($(e))
    Ce(o, e.bind(n));
  else if (J(e))
    if (L(e))
      e.forEach((s) => ei(s, t, n, r));
    else {
      const s = $(e.handler) ? e.handler.bind(n) : t[e.handler];
      $(s) && Ce(o, s, e);
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
    (a) => Tn(c, a, i, !0)
  ), Tn(c, t, i)), J(t) && s.set(t, c), c;
}
function Tn(e, t, n, r = !1) {
  const { mixins: o, extends: s } = t;
  s && Tn(e, s, n, !0), o && o.forEach(
    (i) => Tn(e, i, n, !0)
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
  props: Po,
  emits: Po,
  // objects
  methods: Bt,
  computed: Bt,
  // lifecycle
  beforeCreate: me,
  created: me,
  beforeMount: me,
  mounted: me,
  beforeUpdate: me,
  updated: me,
  beforeDestroy: me,
  beforeUnmount: me,
  destroyed: me,
  unmounted: me,
  activated: me,
  deactivated: me,
  errorCaptured: me,
  serverPrefetch: me,
  // assets
  components: Bt,
  directives: Bt,
  // watch
  watch: xc,
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
  return Bt(Fr(e), Fr(t));
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
function me(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Bt(e, t) {
  return e ? pe(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Po(e, t) {
  return e ? L(e) && L(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : pe(
    /* @__PURE__ */ Object.create(null),
    xo(e),
    xo(t ?? {})
  ) : t;
}
function xc(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = pe(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = me(e[r], t[r]);
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
    $(r) || (r = pe({}, r)), o != null && !J(o) && (o = null);
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
      use(u, ...h) {
        return i.has(u) || (u && $(u.install) ? (i.add(u), u.install(a, ...h)) : $(u) && (i.add(u), u(a, ...h))), a;
      },
      mixin(u) {
        return s.mixins.includes(u) || s.mixins.push(u), a;
      },
      component(u, h) {
        return h ? (s.components[u] = h, a) : s.components[u];
      },
      directive(u, h) {
        return h ? (s.directives[u] = h, a) : s.directives[u];
      },
      mount(u, h, v) {
        if (!c) {
          const w = a._ceVNode || Je(r, o);
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
      provide(u, h) {
        return s.provides[u] = h, a;
      },
      runWithContext(u) {
        const h = Ft;
        Ft = a;
        try {
          return u();
        } finally {
          Ft = h;
        }
      }
    };
    return a;
  };
}
let Ft = null;
const Pc = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Oe(t)}Modifiers`] || e[`${xt(t)}Modifiers`];
function Ec(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || ne;
  let o = n;
  const s = t.startsWith("update:"), i = s && Pc(r, t.slice(7));
  i && (i.trim && (o = n.map((u) => re(u) ? u.trim() : u)), i.number && (o = o.map(hl)));
  let l, c = r[l = lr(t)] || // also try camelCase event handler (#2249)
  r[l = lr(Oe(t))];
  !c && s && (c = r[l = lr(xt(t))]), c && Ae(
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
  return !s && !l ? (J(e) && r.set(e, null), null) : (L(s) ? s.forEach((c) => i[c] = null) : pe(i, s), J(e) && r.set(e, i), i);
}
function Yn(e, t) {
  return !e || !Ln(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), q(e, t[0].toLowerCase() + t.slice(1)) || q(e, xt(t)) || q(e, t));
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
    props: h,
    data: v,
    setupState: w,
    ctx: R,
    inheritAttrs: E
  } = e, T = In(e);
  let j, C;
  try {
    if (n.shapeFlag & 4) {
      const I = o || r, k = I;
      j = Ke(
        a.call(
          k,
          I,
          u,
          h,
          w,
          v,
          R
        )
      ), C = l;
    } else {
      const I = t;
      j = Ke(
        I.length > 1 ? I(
          h,
          { attrs: l, slots: i, emit: c }
        ) : I(
          h,
          null
        )
      ), C = t.props ? l : Mc(l);
    }
  } catch (I) {
    vt.length = 0, Un(I, e, 1), j = Je(tt);
  }
  let F = j;
  if (C && E !== !1) {
    const I = Object.keys(C), { shapeFlag: k } = F;
    I.length && k & 7 && (s && I.some(Kn) && (C = Ic(
      C,
      s
    )), F = Ht(F, C, !1, !0));
  }
  if (n.dirs && (F = Ht(F, null, !1, !0), F.dirs = F.dirs ? F.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const I = Gn(F.type) && Ys(F) || F;
    to(I, n.transition);
  }
  return j = F, In(T), j;
}
const Mc = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Ln(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Ic = (e, t) => {
  const n = {};
  for (const r in e)
    (!Kn(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
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
      for (let h = 0; h < u.length; h++) {
        const v = u[h];
        if (oi(i, r, v) && !Yn(a, v))
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
    if (oi(t, e, s) && !Yn(n, s))
      return !0;
  }
  return !1;
}
function oi(e, t, n) {
  const r = e[n], o = t[n];
  return n === "style" && J(r) && J(o) ? !Vn(r, o) : r !== o;
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
  } = e, l = /* @__PURE__ */ G(o), [c] = e.propsOptions;
  let a = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (r || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const u = e.vnode.dynamicProps;
      for (let h = 0; h < u.length; h++) {
        let v = u[h];
        if (Yn(e.emitsOptions, v))
          continue;
        const w = t[v];
        if (c)
          if (q(s, v))
            w !== s[v] && (s[v] = w, a = !0);
          else {
            const R = Oe(v);
            o[R] = jr(
              c,
              l,
              R,
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
    for (const h in l)
      (!t || // for camelCase
      !q(t, h) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((u = xt(h)) === h || !q(t, u))) && (c ? n && // for camelCase
      (n[h] !== void 0 || // for kebab-case
      n[u] !== void 0) && (o[h] = jr(
        c,
        l,
        h,
        void 0,
        e,
        !0
      )) : delete o[h]);
    if (s !== l)
      for (const h in s)
        (!t || !q(t, h)) && (delete s[h], a = !0);
  }
  a && Xe(e.attrs, "set", "");
}
function ci(e, t, n, r) {
  const [o, s] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let c in t) {
      if (Gt(c))
        continue;
      const a = t[c];
      let u;
      o && q(o, u = Oe(c)) ? !s || !s.includes(u) ? n[u] = a : (l || (l = {}))[u] = a : Yn(e.emitsOptions, c) || (!(c in r) || a !== r[c]) && (r[c] = a, i = !0);
    }
  if (s) {
    const c = /* @__PURE__ */ G(n), a = l || ne;
    for (let u = 0; u < s.length; u++) {
      const h = s[u];
      n[h] = jr(
        o,
        c,
        h,
        a[h],
        e,
        !q(a, h)
      );
    }
  }
  return i;
}
function jr(e, t, n, r, o, s) {
  const i = e[n];
  if (i != null) {
    const l = q(i, "default");
    if (l && r === void 0) {
      const c = i.default;
      if (i.type !== Function && !i.skipFactory && $(c)) {
        const { propsDefaults: a } = o;
        if (n in a)
          r = a[n];
        else {
          const u = un(o);
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
    ] && (r === "" || r === xt(n)) && (r = !0));
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
    const u = (h) => {
      c = !0;
      const [v, w] = ai(h, t, !0);
      pe(i, v), w && l.push(...w);
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  if (!s && !c)
    return J(e) && r.set(e, It), It;
  if (L(s))
    for (let u = 0; u < s.length; u++) {
      const h = Oe(s[u]);
      Mo(h) && (i[h] = ne);
    }
  else if (s)
    for (const u in s) {
      const h = Oe(u);
      if (Mo(h)) {
        const v = s[u], w = i[h] = L(v) || $(v) ? { type: v } : pe({}, v), R = w.type;
        let E = !1, T = !0;
        if (L(R))
          for (let j = 0; j < R.length; ++j) {
            const C = R[j], F = $(C) && C.name;
            if (F === "Boolean") {
              E = !0;
              break;
            } else F === "String" && (T = !1);
          }
        else
          E = $(R) && R.name === "Boolean";
        w[
          0
          /* shouldCast */
        ] = E, w[
          1
          /* shouldCastTrue */
        ] = T, (E || q(w, "default")) && l.push(h);
      }
    }
  const a = [i, l];
  return J(e) && r.set(e, a), a;
}
function Mo(e) {
  return e[0] !== "$" && !Gt(e);
}
const ro = (e) => e === "_" || e === "_ctx" || e === "$stable", oo = (e) => L(e) ? e.map(Ke) : [Ke(e)], Hc = (e, t, n) => {
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
  let s = !0, i = ne;
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
  const n = Nn();
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
    parentNode: h,
    nextSibling: v,
    setScopeId: w = Ve,
    insertStaticContent: R
  } = e, E = (f, g, m, x = null, _ = null, S = null, O = void 0, P = null, p = !!g.dynamicChildren) => {
    if (f === g)
      return;
    f && !Wt(f, g) && (x = Te(f), ge(f, _, S, !0), f = null), g.patchFlag === -2 && (p = !1, g.dynamicChildren = null);
    const { type: d, ref: y, shapeFlag: b } = g;
    switch (d) {
      case zn:
        T(f, g, m, x);
        break;
      case tt:
        j(f, g, m, x);
        break;
      case yr:
        f == null && C(g, m, x, O);
        break;
      case xe:
        U(
          f,
          g,
          m,
          x,
          _,
          S,
          O,
          P,
          p
        );
        break;
      default:
        b & 1 ? k(
          f,
          g,
          m,
          x,
          _,
          S,
          O,
          P,
          p
        ) : b & 6 ? se(
          f,
          g,
          m,
          x,
          _,
          S,
          O,
          P,
          p
        ) : (b & 64 || b & 128) && d.process(
          f,
          g,
          m,
          x,
          _,
          S,
          O,
          P,
          p,
          Ge
        );
    }
    y != null && _ ? zt(y, f && f.ref, S, g || f, !g) : y == null && f && f.ref != null && zt(f.ref, null, S, f, !0);
  }, T = (f, g, m, x) => {
    if (f == null)
      r(
        g.el = l(g.children),
        m,
        x
      );
    else {
      const _ = g.el = f.el;
      g.children !== f.children && a(_, g.children);
    }
  }, j = (f, g, m, x) => {
    f == null ? r(
      g.el = c(g.children || ""),
      m,
      x
    ) : g.el = f.el;
  }, C = (f, g, m, x) => {
    [f.el, f.anchor] = R(
      f.children,
      g,
      m,
      x,
      f.el,
      f.anchor
    );
  }, F = ({ el: f, anchor: g }, m, x) => {
    let _;
    for (; f && f !== g; )
      _ = v(f), r(f, m, x), f = _;
    r(g, m, x);
  }, I = ({ el: f, anchor: g }) => {
    let m;
    for (; f && f !== g; )
      m = v(f), o(f), f = m;
    o(g);
  }, k = (f, g, m, x, _, S, O, P, p) => {
    if (g.type === "svg" ? O = "svg" : g.type === "math" && (O = "mathml"), f == null)
      K(
        g,
        m,
        x,
        _,
        S,
        O,
        P,
        p
      );
    else {
      const d = f.el && f.el._isVueCE ? f.el : null;
      try {
        d && d._beginPatch(), A(
          f,
          g,
          _,
          S,
          O,
          P,
          p
        );
      } finally {
        d && d._endPatch();
      }
    }
  }, K = (f, g, m, x, _, S, O, P) => {
    let p, d;
    const { props: y, shapeFlag: b, transition: M, dirs: D } = f;
    if (p = f.el = i(
      f.type,
      S,
      y && y.is,
      y
    ), b & 8 ? u(p, f.children) : b & 16 && H(
      f.children,
      p,
      null,
      x,
      _,
      mr(f, S),
      O,
      P
    ), D && ft(f, null, x, "created"), B(p, f, f.scopeId, O, x), y) {
      for (const Z in y)
        Z !== "value" && !Gt(Z) && s(p, Z, null, y[Z], S, x);
      "value" in y && s(p, "value", null, y.value, S), (d = y.onVnodeBeforeMount) && He(d, x, f);
    }
    D && ft(f, null, x, "beforeMount");
    const N = Nc(_, M);
    N && M.beforeEnter(p), r(p, g, m), ((d = y && y.onVnodeMounted) || N || D) && _e(() => {
      try {
        d && He(d, x, f), N && M.enter(p), D && ft(f, null, x, "mounted");
      } finally {
      }
    }, _);
  }, B = (f, g, m, x, _) => {
    if (m && w(f, m), x)
      for (let S = 0; S < x.length; S++)
        w(f, x[S]);
    if (_) {
      let S = _.subTree;
      if (g === S || mi(S.type) && (S.ssContent === g || S.ssFallback === g)) {
        const O = _.vnode;
        B(
          f,
          O,
          O.scopeId,
          O.slotScopeIds,
          _.parent
        );
      }
    }
  }, H = (f, g, m, x, _, S, O, P, p = 0) => {
    for (let d = p; d < f.length; d++) {
      const y = f[d] = P ? ze(f[d]) : Ke(f[d]);
      E(
        null,
        y,
        g,
        m,
        x,
        _,
        S,
        O,
        P
      );
    }
  }, A = (f, g, m, x, _, S, O) => {
    const P = g.el = f.el;
    let { patchFlag: p, dynamicChildren: d, dirs: y } = g;
    p |= f.patchFlag & 16;
    const b = f.props || ne, M = g.props || ne;
    let D;
    if (m && dt(m, !1), (D = M.onVnodeBeforeUpdate) && He(D, m, g, f), y && ft(g, f, m, "beforeUpdate"), m && dt(m, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    d && (!f.dynamicChildren || f.dynamicChildren.length !== d.length) && (p = 0, O = !1, d = null), (b.innerHTML && M.innerHTML == null || b.textContent && M.textContent == null) && u(P, ""), d ? V(
      f.dynamicChildren,
      d,
      P,
      m,
      x,
      mr(g, _),
      S
    ) : O || z(
      f,
      g,
      P,
      null,
      m,
      x,
      mr(g, _),
      S,
      !1
    ), p > 0) {
      if (p & 16)
        Y(P, b, M, m, _);
      else if (p & 2 && b.class !== M.class && s(P, "class", null, M.class, _), p & 4 && s(P, "style", b.style, M.style, _), p & 8) {
        const N = g.dynamicProps;
        for (let Z = 0; Z < N.length; Z++) {
          const X = N[Z], oe = b[X], ce = M[X];
          (ce !== oe || X === "value") && s(P, X, oe, ce, _, m);
        }
      }
      p & 1 && f.children !== g.children && u(P, g.children);
    } else !O && d == null && Y(P, b, M, m, _);
    ((D = M.onVnodeUpdated) || y) && _e(() => {
      D && He(D, m, g, f), y && ft(g, f, m, "updated");
    }, x);
  }, V = (f, g, m, x, _, S, O) => {
    for (let P = 0; P < g.length; P++) {
      const p = f[P], d = g[P], y = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        p.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (p.type === xe || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Wt(p, d) || // - In the case of a component, it could contain anything.
        p.shapeFlag & 198) ? h(p.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          m
        )
      );
      E(
        p,
        d,
        y,
        null,
        x,
        _,
        S,
        O,
        !0
      );
    }
  }, Y = (f, g, m, x, _) => {
    if (g !== m) {
      if (g !== ne)
        for (const S in g)
          !Gt(S) && !(S in m) && s(
            f,
            S,
            g[S],
            null,
            _,
            x
          );
      for (const S in m) {
        if (Gt(S)) continue;
        const O = m[S], P = g[S];
        O !== P && S !== "value" && s(f, S, P, O, _, x);
      }
      "value" in m && s(f, "value", g.value, m.value, _);
    }
  }, U = (f, g, m, x, _, S, O, P, p) => {
    const d = g.el = f ? f.el : l(""), y = g.anchor = f ? f.anchor : l("");
    let { patchFlag: b, dynamicChildren: M, slotScopeIds: D } = g;
    D && (P = P ? P.concat(D) : D), f == null ? (r(d, m, x), r(y, m, x), H(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      g.children || [],
      m,
      y,
      _,
      S,
      O,
      P,
      p
    )) : b > 0 && b & 64 && M && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    f.dynamicChildren && f.dynamicChildren.length === M.length ? (V(
      f.dynamicChildren,
      M,
      m,
      _,
      S,
      O,
      P
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (g.key != null || _ && g === _.subTree) && pi(
      f,
      g,
      !0
      /* shallow */
    )) : z(
      f,
      g,
      m,
      y,
      _,
      S,
      O,
      P,
      p
    );
  }, se = (f, g, m, x, _, S, O, P, p) => {
    g.slotScopeIds = P, f == null ? g.shapeFlag & 512 ? _.ctx.activate(
      g,
      m,
      x,
      O,
      p
    ) : we(
      g,
      m,
      x,
      _,
      S,
      O,
      p
    ) : be(f, g, p);
  }, we = (f, g, m, x, _, S, O) => {
    const P = f.component = Jc(
      f,
      x,
      _
    );
    if (no(f) && (P.ctx.renderer = Ge), Qc(P, !1, O), P.asyncDep) {
      if (_ && _.registerDep(P, ee, O), !f.el) {
        const p = P.subTree = Je(tt);
        j(null, p, g, m), f.placeholder = p.el;
      }
    } else
      ee(
        P,
        f,
        g,
        m,
        _,
        S,
        O
      );
  }, be = (f, g, m) => {
    const x = g.component = f.component;
    if (Ac(f, g, m))
      if (x.asyncDep && !x.asyncResolved) {
        W(x, g, m);
        return;
      } else
        x.next = g, x.update();
    else
      g.el = f.el, x.vnode = g;
  }, ee = (f, g, m, x, _, S, O) => {
    const P = () => {
      if (f.isMounted) {
        let { next: b, bu: M, u: D, parent: N, vnode: Z } = f;
        {
          const Fe = gi(f);
          if (Fe) {
            b && (b.el = Z.el, W(f, b, O)), Fe.asyncDep.then(() => {
              _e(() => {
                f.isUnmounted || d();
              }, _);
            });
            return;
          }
        }
        let X = b, oe;
        dt(f, !1), b ? (b.el = Z.el, W(f, b, O)) : b = Z, M && cr(M), (oe = b.props && b.props.onVnodeBeforeUpdate) && He(oe, N, b, Z), dt(f, !0);
        const ce = Eo(f), De = f.subTree;
        f.subTree = ce, E(
          De,
          ce,
          // parent may have changed if it's in a teleport
          h(De.el),
          // anchor may have changed if it's in a fragment
          Te(De),
          f,
          _,
          S
        ), b.el = ce.el, X === null && Tc(f, ce.el), D && _e(D, _), (oe = b.props && b.props.onVnodeUpdated) && _e(
          () => He(oe, N, b, Z),
          _
        );
      } else {
        let b;
        const { el: M, props: D } = g, { bm: N, m: Z, parent: X, root: oe, type: ce } = f, De = Xt(g);
        dt(f, !1), N && cr(N), !De && (b = D && D.onVnodeBeforeMount) && He(b, X, g), dt(f, !0);
        {
          oe.ce && oe.ce._hasShadowRoot() && oe.ce._injectChildStyle(
            ce,
            f.parent ? f.parent.type : void 0
          );
          const Fe = f.subTree = Eo(f);
          E(
            null,
            Fe,
            m,
            x,
            f,
            _,
            S
          ), g.el = Fe.el;
        }
        if (Z && _e(Z, _), !De && (b = D && D.onVnodeMounted)) {
          const Fe = g;
          _e(
            () => He(b, X, Fe),
            _
          );
        }
        (g.shapeFlag & 256 || X && Xt(X.vnode) && X.vnode.shapeFlag & 256) && f.a && _e(f.a, _), f.isMounted = !0, g = m = x = null;
      }
    };
    f.scope.on();
    const p = f.effect = new Rs(P);
    f.scope.off();
    const d = f.update = p.run.bind(p), y = f.job = p.runIfDirty.bind(p);
    y.i = f, y.id = f.uid, p.scheduler = () => eo(y), dt(f, !0), d();
  }, W = (f, g, m) => {
    g.component = f;
    const x = f.vnode.props;
    f.vnode = g, f.next = null, Fc(f, g.props, x, m), Lc(f, g.children, m), Ze(), bo(f), Qe();
  }, z = (f, g, m, x, _, S, O, P, p = !1) => {
    const d = f && f.children, y = f ? f.shapeFlag : 0, b = g.children, { patchFlag: M, shapeFlag: D } = g;
    if (M > 0) {
      if (M & 128) {
        ot(
          d,
          b,
          m,
          x,
          _,
          S,
          O,
          P,
          p
        );
        return;
      } else if (M & 256) {
        Be(
          d,
          b,
          m,
          x,
          _,
          S,
          O,
          P,
          p
        );
        return;
      }
    }
    D & 8 ? (y & 16 && Ue(d, _, S), b !== d && u(m, b)) : y & 16 ? D & 16 ? ot(
      d,
      b,
      m,
      x,
      _,
      S,
      O,
      P,
      p
    ) : Ue(d, _, S, !0) : (y & 8 && u(m, ""), D & 16 && H(
      b,
      m,
      x,
      _,
      S,
      O,
      P,
      p
    ));
  }, Be = (f, g, m, x, _, S, O, P, p) => {
    f = f || It, g = g || It;
    const d = f.length, y = g.length, b = Math.min(d, y);
    let M;
    for (M = 0; M < b; M++) {
      const D = g[M] = p ? ze(g[M]) : Ke(g[M]);
      E(
        f[M],
        D,
        m,
        null,
        _,
        S,
        O,
        P,
        p
      );
    }
    d > y ? Ue(
      f,
      _,
      S,
      !0,
      !1,
      b
    ) : H(
      g,
      m,
      x,
      _,
      S,
      O,
      P,
      p,
      b
    );
  }, ot = (f, g, m, x, _, S, O, P, p) => {
    let d = 0;
    const y = g.length;
    let b = f.length - 1, M = y - 1;
    for (; d <= b && d <= M; ) {
      const D = f[d], N = g[d] = p ? ze(g[d]) : Ke(g[d]);
      if (Wt(D, N))
        E(
          D,
          N,
          m,
          null,
          _,
          S,
          O,
          P,
          p
        );
      else
        break;
      d++;
    }
    for (; d <= b && d <= M; ) {
      const D = f[b], N = g[M] = p ? ze(g[M]) : Ke(g[M]);
      if (Wt(D, N))
        E(
          D,
          N,
          m,
          null,
          _,
          S,
          O,
          P,
          p
        );
      else
        break;
      b--, M--;
    }
    if (d > b) {
      if (d <= M) {
        const D = M + 1, N = D < y ? g[D].el : x;
        for (; d <= M; )
          E(
            null,
            g[d] = p ? ze(g[d]) : Ke(g[d]),
            m,
            N,
            _,
            S,
            O,
            P,
            p
          ), d++;
      }
    } else if (d > M)
      for (; d <= b; )
        ge(f[d], _, S, !0), d++;
    else {
      const D = d, N = d, Z = /* @__PURE__ */ new Map();
      for (d = N; d <= M; d++) {
        const Se = g[d] = p ? ze(g[d]) : Ke(g[d]);
        Se.key != null && Z.set(Se.key, d);
      }
      let X, oe = 0;
      const ce = M - N + 1;
      let De = !1, Fe = 0;
      const Nt = new Array(ce);
      for (d = 0; d < ce; d++) Nt[d] = 0;
      for (d = D; d <= b; d++) {
        const Se = f[d];
        if (oe >= ce) {
          ge(Se, _, S, !0);
          continue;
        }
        let je;
        if (Se.key != null)
          je = Z.get(Se.key);
        else
          for (X = N; X <= M; X++)
            if (Nt[X - N] === 0 && Wt(Se, g[X])) {
              je = X;
              break;
            }
        je === void 0 ? ge(Se, _, S, !0) : (Nt[je - N] = d + 1, je >= Fe ? Fe = je : De = !0, E(
          Se,
          g[je],
          m,
          null,
          _,
          S,
          O,
          P,
          p
        ), oe++);
      }
      const fo = De ? Vc(Nt) : It;
      for (X = fo.length - 1, d = ce - 1; d >= 0; d--) {
        const Se = N + d, je = g[Se], po = g[Se + 1], go = Se + 1 < y ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          po.el || hi(po)
        ) : x;
        Nt[d] === 0 ? E(
          null,
          je,
          m,
          go,
          _,
          S,
          O,
          P,
          p
        ) : De && (X < 0 || d !== fo[X] ? Ee(je, m, go, 2) : X--);
      }
    }
  }, Ee = (f, g, m, x, _ = null) => {
    const { el: S, type: O, transition: P, children: p, shapeFlag: d } = f;
    if (d & 6) {
      Ee(f.component.subTree, g, m, x);
      return;
    }
    if (d & 128) {
      f.suspense.move(g, m, x);
      return;
    }
    if (d & 64) {
      O.move(f, g, m, Ge);
      return;
    }
    if (O === xe) {
      r(S, g, m);
      for (let b = 0; b < p.length; b++)
        Ee(p[b], g, m, x);
      r(f.anchor, g, m);
      return;
    }
    if (O === yr) {
      F(f, g, m);
      return;
    }
    if (x !== 2 && d & 1 && P)
      if (x === 0)
        P.persisted && !S[pr] ? r(S, g, m) : (P.beforeEnter(S), r(S, g, m), _e(() => P.enter(S), _));
      else {
        const { leave: b, delayLeave: M, afterLeave: D } = P, N = () => {
          f.ctx.isUnmounted ? o(S) : r(S, g, m);
        }, Z = () => {
          const X = S._isLeaving || !!S[pr];
          S._isLeaving && S[pr](
            !0
            /* cancelled */
          ), P.persisted && !X ? N() : b(S, () => {
            N(), D && D();
          });
        };
        M ? M(S, N, Z) : Z();
      }
    else
      r(S, g, m);
  }, ge = (f, g, m, x = !1, _ = !1) => {
    const {
      type: S,
      props: O,
      ref: P,
      children: p,
      dynamicChildren: d,
      shapeFlag: y,
      patchFlag: b,
      dirs: M,
      cacheIndex: D,
      memo: N
    } = f;
    if (b === -2 && (_ = !1), P != null && (Ze(), zt(P, null, m, f, !0), Qe()), D != null && (g.renderCache[D] = void 0), y & 256) {
      g.ctx.deactivate(f);
      return;
    }
    const Z = y & 1 && M, X = !Xt(f);
    let oe;
    if (X && (oe = O && O.onVnodeBeforeUnmount) && He(oe, g, f), y & 6)
      sr(f.component, m, x);
    else {
      if (y & 128) {
        f.suspense.unmount(m, x);
        return;
      }
      Z && ft(f, null, g, "beforeUnmount"), y & 64 ? f.type.remove(
        f,
        g,
        m,
        Ge,
        x
      ) : d && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !d.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (S !== xe || b > 0 && b & 64) ? Ue(
        d,
        g,
        m,
        !1,
        !0
      ) : (S === xe && b & 384 || !_ && y & 16) && Ue(p, g, m), x && $t(f);
    }
    const ce = N != null && D == null;
    (X && (oe = O && O.onVnodeUnmounted) || Z || ce) && _e(() => {
      oe && He(oe, g, f), Z && ft(f, null, g, "unmounted"), ce && (f.el = null);
    }, m);
  }, $t = (f) => {
    const { type: g, el: m, anchor: x, transition: _ } = f;
    if (g === xe) {
      or(m, x);
      return;
    }
    if (g === yr) {
      I(f);
      return;
    }
    const S = () => {
      o(m), _ && !_.persisted && _.afterLeave && _.afterLeave();
    };
    if (f.shapeFlag & 1 && _ && !_.persisted) {
      const { leave: O, delayLeave: P } = _, p = () => O(m, S);
      P ? P(f.el, S, p) : p();
    } else
      S();
  }, or = (f, g) => {
    let m;
    for (; f !== g; )
      m = v(f), o(f), f = m;
    o(g);
  }, sr = (f, g, m) => {
    const { bum: x, scope: _, job: S, subTree: O, um: P, m: p, a: d } = f;
    Io(p), Io(d), x && cr(x), _.stop(), S && (S.flags |= 8, ge(O, f, g, m)), P && _e(P, g), _e(() => {
      f.isUnmounted = !0;
    }, g);
  }, Ue = (f, g, m, x = !1, _ = !1, S = 0) => {
    for (let O = S; O < f.length; O++)
      ge(f[O], g, m, x, _);
  }, Te = (f) => {
    if (f.shapeFlag & 6)
      return Te(f.component.subTree);
    if (f.shapeFlag & 128)
      return f.suspense.next();
    const g = v(f.anchor || f.el), m = g && g[sc];
    return m ? v(m) : g;
  };
  let ut = !1;
  const gn = (f, g, m) => {
    let x;
    f == null ? g._vnode && (ge(g._vnode, null, null, !0), x = g._vnode.component) : E(
      g._vnode || null,
      f,
      g,
      null,
      null,
      null,
      m
    ), g._vnode = f, ut || (ut = !0, bo(x), Ws(), ut = !1);
  }, Ge = {
    p: E,
    um: ge,
    m: Ee,
    r: $t,
    mt: we,
    mc: H,
    pc: z,
    pbc: V,
    n: Te,
    o: e
  };
  return {
    render: gn,
    hydrate: void 0,
    createApp: Cc(gn)
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
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = o[s] = ze(o[s]), l.el = i.el), !n && l.patchFlag !== -2 && pi(i, l)), l.type === zn && (l.patchFlag === -1 && (l = o[s] = ze(l)), l.el = i.el), l.type === tt && !l.el && (l.el = i.el);
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
const xe = /* @__PURE__ */ Symbol.for("v-fgt"), zn = /* @__PURE__ */ Symbol.for("v-txt"), tt = /* @__PURE__ */ Symbol.for("v-cmt"), yr = /* @__PURE__ */ Symbol.for("v-stc"), vt = [];
let Re = null;
function ue(e = !1) {
  vt.push(Re = e ? null : []);
}
function yi() {
  vt.pop(), Re = vt[vt.length - 1] || null;
}
let nn = 1;
function Ao(e, t = !1) {
  nn += e, e < 0 && Re && t && (Re.hasOnce = !0);
}
function vi(e) {
  return e.dynamicChildren = nn > 0 ? Re || It : null, yi(), nn > 0 && Re && Re.push(e), e;
}
function he(e, t, n, r, o, s) {
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
function Wt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const bi = ({ key: e }) => e ?? null, Rn = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? re(e) || /* @__PURE__ */ de(e) || $(e) ? { i: Ne, r: e, k: t, f: !!n } : e : null);
function gt(e, t = null, n = null, r = 0, o = null, s = e === xe ? 0 : 1, i = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && bi(t),
    ref: t && Rn(t),
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
    ctx: Ne
  };
  return l ? (Dn(c, n), s & 128 && e.normalize(c)) : n && (c.shapeFlag |= re(n) ? 8 : 16), nn > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  Re && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && Re.push(c), c;
}
const Je = Uc;
function Uc(e, t = null, n = null, r = 0, o = null, s = !1) {
  if ((!e || e === yc) && (e = tt), wi(e)) {
    const l = Ht(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Dn(l, n), nn > 0 && !s && Re && (l.shapeFlag & 6 ? Re[Re.indexOf(e)] = l : Re.push(l)), l.patchFlag = -2, l;
  }
  if (ra(e) && (e = e.__vccOpts), t) {
    t = Gc(t);
    let { class: l, style: c } = t;
    l && !re(l) && (t.class = ht(l)), J(c) && (/* @__PURE__ */ Qr(c) && !L(c) && (c = pe({}, c)), t.style = At(c));
  }
  const i = re(e) ? 1 : mi(e) ? 128 : Gn(e) ? 64 : J(e) ? 4 : $(e) ? 2 : 0;
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
function Ht(e, t, n = !1, r = !1) {
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
      n && s ? L(s) ? s.concat(Rn(t)) : [s, Rn(t)] : Rn(t)
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
    ssContent: e.ssContent && Ht(e.ssContent),
    ssFallback: e.ssFallback && Ht(e.ssFallback),
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
  return Je(zn, null, e, t);
}
function vn(e = "", t = !1) {
  return t ? (ue(), Bc(tt, null, e)) : Je(tt, null, e);
}
function Ke(e) {
  return e == null || typeof e == "boolean" ? Je(tt) : L(e) ? Je(
    xe,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : wi(e) ? ze(e) : Je(zn, null, String(e));
}
function ze(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Ht(e);
}
function Dn(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (L(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), Dn(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !li(t) ? t._ctx = Ne : o === 3 && Ne && (Ne.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if ($(t)) {
    if (r & 65) {
      Dn(e, { default: t });
      return;
    }
    t = { default: t, _ctx: Ne }, n = 32;
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
        t.style = At([t.style, r.style]);
      else if (Ln(o)) {
        const s = t[o], i = r[o];
        i && s !== i && !(L(s) && s.includes(i)) ? t[o] = s ? [].concat(s, i) : i : i == null && s == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !Kn(o) && (t[o] = i);
      } else o !== "" && (t[o] = r[o]);
  }
  return t;
}
function He(e, t, n, r = null) {
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
let ve = null;
const Zc = () => ve || Ne;
let Fn, rn;
{
  const e = Nn(), t = (n, r) => {
    let o;
    return (o = e[n]) || (o = e[n] = []), o.push(r), (s) => {
      o.length > 1 ? o.forEach((i) => i(s)) : o[0](s);
    };
  };
  Fn = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => ve = n
  ), rn = t(
    "__VUE_SSR_SETTERS__",
    (n) => on = n
  );
}
const un = (e) => {
  const t = ve;
  return Fn(e), e.scope.on(), () => {
    e.scope.off(), Fn(t);
  };
}, To = () => {
  ve && ve.scope.off(), Fn(null);
};
function _i(e) {
  return e.vnode.shapeFlag & 4;
}
let on = !1;
function Qc(e, t = !1, n = !1) {
  t && rn(t);
  const { props: r, children: o } = e.vnode, s = _i(e);
  Dc(e, r, s, t), kc(e, o, n || t);
  const i = s ? ea(e, t) : void 0;
  return t && rn(!1), i;
}
function ea(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, vc);
  const { setup: r } = n;
  if (r) {
    Ze();
    const o = e.setupContext = r.length > 1 ? na(e) : null, s = un(e), i = an(
      r,
      e,
      0,
      [
        e.props,
        o
      ]
    ), l = hs(i);
    if (Qe(), s(), (l || e.sp) && !Xt(e) && zs(e), l) {
      if (i.then(To, To), t)
        return i.then((c) => {
          rn(!0);
          try {
            Do(e, c, t);
          } finally {
            rn(!1);
          }
        }).catch((c) => {
          Un(c, e, 0);
        });
      e.asyncDep = i;
    } else
      Do(e, i);
  } else
    Si(e);
}
function Do(e, t, n) {
  $(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : J(t) && (e.setupState = Ks(t)), Si(e);
}
function Si(e, t, n) {
  const r = e.type;
  e.render || (e.render = r.render || Ve);
  {
    const o = un(e);
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
      if (n in Jt)
        return Jt[n](e);
    },
    has(t, n) {
      return n in t || n in Jt;
    }
  })) : e.proxy;
}
function ra(e) {
  return $(e) && "__vccOpts" in e;
}
const le = (e, t) => /* @__PURE__ */ Yl(e, t, on), oa = "3.5.42";
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
const xi = Hr ? (e) => Hr.createHTML(e) : (e) => e, sa = "http://www.w3.org/2000/svg", ia = "http://www.w3.org/1998/Math/MathML", Ye = typeof document < "u" ? document : null, jo = Ye && /* @__PURE__ */ Ye.createElement("template"), la = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const o = t === "svg" ? Ye.createElementNS(sa, e) : t === "mathml" ? Ye.createElementNS(ia, e) : n ? Ye.createElement(e, { is: n }) : Ye.createElement(e);
    return e === "select" && r && r.multiple != null && o.setAttribute("multiple", r.multiple), o;
  },
  createText: (e) => Ye.createTextNode(e),
  createComment: (e) => Ye.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Ye.querySelector(e),
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
  const r = e.style, o = re(n);
  let s = !1;
  if (n && !o) {
    if (t)
      if (re(t))
        for (const i of t.split(";")) {
          const l = i.slice(0, i.indexOf(":")).trim();
          n[l] == null && Ut(r, l, "");
        }
      else
        for (const i in t)
          n[i] == null && Ut(r, i, "");
    for (const i in n) {
      i === "display" && (s = !0);
      const l = n[i];
      l != null ? ha(
        e,
        i,
        !re(t) && t ? t[i] : void 0,
        l
      ) || Ut(r, i, l) : Ut(r, i, "");
    }
  } else if (o) {
    if (t !== n) {
      const i = r[fa];
      i && (n += ";" + i), r.cssText = n, s = da.test(n);
    }
  } else t && e.removeAttribute("style");
  Ho in e && (e[Ho] = s ? r.display : "", e[ua] && (r.display = "none"));
}
const wn = /\s*!important$/;
function Ut(e, t, n) {
  if (L(n))
    n.forEach((r) => Ut(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--"))
    wn.test(n) ? e.setProperty(t, n.replace(wn, ""), "important") : e.setProperty(t, n);
  else {
    const r = ga(e, t);
    wn.test(n) ? e.setProperty(
      xt(r),
      n.replace(wn, ""),
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
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && re(r) && n === r;
}
const Lo = "http://www.w3.org/1999/xlink";
function Ko(e, t, n, r, o, s = _l(t)) {
  r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Lo, t.slice(6, t.length)) : e.setAttributeNS(Lo, t, n) : n == null || s && !bs(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    s ? "" : We(n) ? String(n) : n
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
const No = /* @__PURE__ */ Symbol("_vei");
function va(e, t, n, r, o = null) {
  const s = e[No] || (e[No] = {}), i = s[t];
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
  return [e[2] === ":" ? e.slice(3) : xt(e.slice(2)), t];
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
  return n.value = e, n.attached = xa(), n;
}
const Vo = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Ca = (e, t, n, r, o, s) => {
  const i = o === "svg";
  t === "class" ? aa(e, r, i) : t === "style" ? pa(e, n, r) : Ln(t) ? Kn(t) || va(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Pa(e, t, r, i)) ? ($o(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Ko(e, t, r, i, s, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Ea(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !re(r))) ? $o(e, Oe(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), Ko(e, t, r, i));
};
function Pa(e, t, n, r) {
  if (r)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Vo(t) && $(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return Vo(t) && re(n) ? !1 : t in e;
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
  return re(e) ? document.querySelector(e) : e;
}
function bn() {
  return !0;
}
const ja = Symbol("merge-proxy"), Cn = Symbol("merge-proxy-sources"), Ha = {
  get(e, t, n) {
    return t === ja ? n : t === Cn ? e.sources : e.get(t);
  },
  has(e, t) {
    return e.has(t);
  },
  set: bn,
  deleteProperty: bn,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: bn,
      deleteProperty: bn
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
  const t = e.flatMap((n) => typeof n == "object" && n !== null && Cn in n && Array.isArray(n[Cn]) ? n[Cn] : [n]);
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
    subscribe: (t) => ({ unsubscribe: Ce(e, Ri(t), { flush: "sync" }) })
  });
}
function La(e) {
  return Object.assign(e, {
    set: (t) => {
      e.value = typeof t == "function" ? t(e.value) : t;
    },
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: Ce(e, Ri(t), { flush: "sync" }) })
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
function Xn(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function at(e) {
  if (Array.isArray(e)) return e.map(at);
  if (e && typeof e == "object") {
    const t = Object.getPrototypeOf(e);
    if (t !== Object.prototype && t !== null) return e;
    const n = t === null ? Q() : {}, r = Object.keys(e);
    for (let o = 0; o < r.length; o++) {
      const s = r[o];
      Object.defineProperty(n, s, {
        configurable: !0,
        enumerable: !0,
        value: at(e[s]),
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
function Q() {
  return /* @__PURE__ */ Object.create(null);
}
function kt(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Ci(e, t) {
  return (n) => {
    var r;
    (((r = t.options.atoms) == null ? void 0 : r[e]) ?? t.baseAtoms[e]).set((o) => Xn(n, o));
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
  return Pi(e, t, Na);
}
function Pi(e, t, n) {
  if (Object.is(e, t)) return !0;
  if (n <= 0 || !Go(e) || !Go(t) || (Array.isArray(e) || Array.isArray(t)) && (!Array.isArray(e) || !Array.isArray(t) || e.length !== t.length))
    return !1;
  const r = qo(e), o = qo(t);
  if (r.length !== o.length) return !1;
  const s = e, i = t;
  for (let l = 0; l < r.length; l++) {
    const c = r[l];
    if (!Object.prototype.propertyIsEnumerable.call(t, c) || !Pi(s[c], i[c], n - 1)) return !1;
  }
  return !0;
}
function Jn(e, t, n, r = Va) {
  const o = `on${t.charAt(0).toUpperCase()}${t.slice(1)}Change`, s = e.options[o];
  s && s((i) => {
    const l = Xn(n, i);
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
    let h = !u || u.length !== (i == null ? void 0 : i.length);
    if (!h && u) {
      for (let v = 0; v < u.length; v++) if (u[v] !== i[v]) {
        h = !0;
        break;
      }
    }
    return n == null || n(h), h && (i = u, s == null || s(), l = e(...u ?? []), r == null || r(l)), l;
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
function Zn({ feature: e, fnName: t, objectId: n, onAfterUpdate: r, table: o, ...s }) {
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
function Ei(e, t = "_") {
  const [n, r] = e.split(t);
  return {
    fnKey: r,
    fnName: `${n}.${r}`,
    parentName: n
  };
}
function Rt(e, t, n) {
  for (const [r, { fn: o, memoDeps: s }] of Object.entries(n)) {
    const { fnKey: i, fnName: l } = Ei(r);
    t[i] = s ? Zn({
      memoDeps: s,
      fn: o,
      fnName: l,
      table: t,
      feature: e
    }) : o;
  }
}
function Lt(e, t, n, r) {
  for (const [o, { fn: s, memoDeps: i }] of Object.entries(r)) {
    const { fnKey: l, fnName: c } = Ei(o);
    if (i) {
      const a = `_memo_${l}`;
      t[l] = function(...u) {
        if (!this[a]) {
          const h = this;
          this[a] = Zn({
            memoDeps: (v) => i(h, v),
            fn: (...v) => s(h, ...v),
            fnName: c,
            objectId: h.id,
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
  Lt("coreCellsFeature", e, t, {
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
  return n.length ? n.some((o) => ae(o, "getIsVisible", bt)) : (kt(t, e.id) ? t[e.id] : void 0) ?? !0;
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
    const a = e[c], u = l[l.length - 1], h = a.column.depth === i.depth;
    let v, w = !1;
    if (h && a.column.parent ? v = a.column.parent : (v = a.column, w = !0), u && u.column === v) u.subHeaders.push(a);
    else {
      const R = Oi(n, v, {
        id: eu(r, t, v.id, a.id),
        isPlaceholder: w,
        placeholderId: w ? String(tu(l, v)) : void 0,
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
      let R = w;
      for (let E = 0; E < v.length; E++) {
        const T = v[E];
        R = R == null ? void 0 : R[T];
      }
      return R;
    };
  } else c = (v) => v[o.accessorKey];
  if (!l)
    throw new Error();
  const a = nu(e), u = Object.create(a);
  u.accessorFn = c, u.columnDef = o, u.columns = [], u.depth = n, u.id = `${String(l)}`, u.parent = r;
  const h = e._columnInstanceInitFns;
  for (let v = 0; v < h.length; v++) h[v](u);
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
  const t = Q(), n = e.getAllFlatColumns();
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
  const t = Q(), n = e.getAllLeafColumns();
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
    Lt("coreColumnsFeature", e, t, {
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
    Rt("coreColumnsFeature", e, {
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
    const h = s[t[u]];
    h && ae(h, "getIsVisible", bt) && i.push(h);
  }
  const l = [];
  for (let u = 0; u < n.length; u++) {
    const h = s[n[u]];
    h && ae(h, "getIsVisible", bt) && l.push(h);
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
    Lt("coreHeadersFeature", e, t, {
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
    Rt("coreHeadersFeature", e, {
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
  c._displayIndexCache = -1, c._uniqueValuesCache = Q(), c._valuesCache = Q(), c.depth = o, c.id = t, c.index = r, c.original = n, c.parentId = i, c.subRows = [];
  const a = e._rowInstanceInitFns;
  for (let u = 0; u < a.length; u++) a[u](c);
  return c;
};
function Ru() {
  return [];
}
function Cu(e, t) {
  Jn(e, "cellSelection", at(e.initialState.cellSelection) ?? Ru());
}
function Pu(e) {
  e.atoms.cellSelection && (e.options.autoResetAll ?? e.options.autoResetCellSelection ?? !0) && e._reactivity.schedule(() => Cu(e));
}
function Eu() {
  return Q();
}
function ji(e) {
  e.atoms.expanded && (e.options.autoResetAll ?? e.options.autoResetExpanded ?? !e.options.manualExpanding) && e._reactivity.schedule(() => ki(e));
}
function jn(e, t) {
  var n, r;
  (r = (n = e.options).onExpandedChange) == null || r.call(n, t);
}
function Hi(e, t) {
  var r;
  const n = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t ?? !Ki(e)) {
    if (n === !0 || !Li(e)) return;
    jn(e, !0);
  } else {
    if (n !== !0 && !Object.keys(n).length) return;
    jn(e, Q());
  }
}
function ki(e, t) {
  const n = e.initialState.expanded;
  Jn(e, "expanded", t ? Q() : n === !0 ? !0 : Object.assign(Q(), at(n ?? {})));
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
  return !(!n.length || n.some((o) => !Qn(o)));
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
  o !== r && (o && !_t(e) || jn(e.table, (i) => {
    const l = i === !0 ? !0 : Lr(i, e.id);
    let c = Q();
    if (i === !0 ? Object.values(e.table.getRowModel().rowsById).forEach((a) => {
      _t(a) && (c[a.id] = !0);
    }) : c = Object.assign(Q(), i), !l && o)
      return c[e.id] = !0, c;
    if (l && !o) {
      const a = Q(), u = Object.keys(c);
      for (let h = 0; h < u.length; h++) {
        const v = u[h];
        v !== e.id && c[v] && (a[v] = !0);
      }
      return a;
    }
    return i;
  }));
}
function Qn(e) {
  var n, r, o;
  const t = ((n = e.table.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return !!(((o = (r = e.table.options).getIsRowExpanded) == null ? void 0 : o.call(r, e)) ?? (t === !0 || Lr(t, e.id)));
}
function Lr(e, t) {
  return !!(e && e !== !0 && kt(e, t) && e[t]);
}
function _t(e) {
  var t, n;
  return ((n = (t = e.table.options).getRowCanExpand) == null ? void 0 : n.call(t, e)) ?? ((e.table.options.enableExpanding ?? !0) && !!e.subRows.length);
}
function Au(e) {
  let t = !0, n = e;
  for (; t && n.parentId; )
    n = e.table.getRow(n.parentId, !0), t = Qn(n);
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
  Jn(e, "pagination", t);
}
function ju(e, t) {
  Fu(e, (n) => {
    let r = Xn(t, n.pageIndex);
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
  Jn(e, "sorting", t);
}
function Lu(e, t) {
  ku(e, at(e.initialState.sorting ?? []));
}
function Ku(e) {
  e.atoms.sorting && (e.options.autoResetAll ?? e.options.autoResetSorting ?? !1) && Lu(e);
}
function Ni() {
  return (e) => Zn({
    feature: "coreRowModelsFeature",
    table: e,
    fnName: "table.getCoreRowModel",
    memoDeps: () => [e.options.data],
    fn: () => $u(e, e.options.data),
    onAfterUpdate: Ua(() => {
      ji(e), Du(e), Ku(e), Pu(e);
    })
  });
}
function Vi(e, t, n, r = 0, o) {
  var i;
  const s = [];
  for (let l = 0; l < n.length; l++) {
    const c = n[l], a = xu(e, e.getRowId(c, l, o), c, l, r, void 0, o == null ? void 0 : o.id);
    t.flatRows.push(a), t.rowsById[a.id] = a, s.push(a), e.options.getSubRows && (a.originalSubRows = e.options.getSubRows(c, l), (i = a.originalSubRows) != null && i.length && (a.subRows = Vi(e, t, a.originalSubRows, r + 1, a)));
  }
  return s;
}
function $u(e, t) {
  const n = {
    rows: [],
    flatRows: [],
    rowsById: Q()
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
  Rt("coreRowModelsFeature", e, {
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
  if (kt(e._valuesCache, t)) return e._valuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return e._valuesCache[t] = n.accessorFn(e.original, e.index), e._valuesCache[t];
}
function sf(e, t) {
  if (kt(e._uniqueValuesCache, t)) return e._uniqueValuesCache[t];
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
  const t = Q(), n = e.getAllCells();
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
    Lt("coreRowsFeature", e, t, {
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
    Rt("coreRowsFeature", e, {
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
  const t = at(e.initialState);
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
  const r = wf(e, Xn(t, e.options));
  e.optionsStore ? e.optionsStore.set(() => r) : e.options = r, yf(e, r.state ?? null);
}
const _f = { constructTableAPIs: (e) => {
  Rt("coreTablesFeature", e, {
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
  }), at(t);
}
function Pf(e) {
  var K, B;
  const t = e.features.coreReactivityFeature, { aggregationFns: n, columnMeta: r, coreRowModel: o, expandedRowModel: s, facetedMinMaxValues: i, facetedRowModel: l, facetedUniqueValues: c, filterFns: a, filterMeta: u, filteredRowModel: h, groupedRowModel: v, paginatedRowModel: w, sortFns: R, sortedRowModel: E, tableMeta: T, ...j } = e.features, C = {
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
  }, F = Object.values(C._features), I = {
    ...F.reduce((H, A) => {
      var V;
      return Object.assign(H, (V = A.getDefaultTableOptions) == null ? void 0 : V.call(A, C));
    }, {}),
    ...e
  };
  if (t.wrapExternalAtoms && I.atoms) for (const [H, A] of Object.entries(I.atoms)) {
    const V = A, Y = t.createWritableAtom(V.get(), { debugName: `externalAtom/${H}` });
    I.atoms[H] = Y;
    let U = !1;
    const se = V.subscribe((be) => {
      U || Y.set(be);
    }), we = Y.subscribe((be) => {
      U = !0, V.set(be), U = !1;
    });
    t.addSubscription(se), t.addSubscription(we);
  }
  t.createOptionsStore ? (C.optionsStore = t.createWritableAtom(I, { debugName: "table/optionsStore" }), Object.defineProperty(C, "options", {
    configurable: !0,
    enumerable: !0,
    get() {
      return C.optionsStore.get();
    },
    set(H) {
      C.optionsStore.set(() => H);
    }
  })) : C.options = I, C.initialState = Cf(C._features, C.options.initialState);
  const k = Object.keys(C.initialState);
  for (let H = 0; H < k.length; H++) {
    const A = k[H];
    C.baseAtoms[A] = t.createWritableAtom(C.initialState[A], { debugName: `table/baseAtoms/${A}` }), C.atoms[A] = t.createReadonlyAtom(() => {
      var we;
      const V = C.options, Y = (we = V.atoms) == null ? void 0 : we[A], U = Y ? Y.get() : C.baseAtoms[A].get();
      if (Y) return U;
      const se = V.state;
      if (se && kt(se, A)) {
        const be = se[A];
        return be === void 0 ? C.initialState[A] : be;
      }
      return U;
    }, { debugName: `table/atoms/${A}` });
  }
  Wi(C), C.store = xf(t.createReadonlyAtom(() => {
    const H = {};
    for (let A = 0; A < k.length; A++) {
      const V = k[A];
      H[V] = C.atoms[V].get();
    }
    return H;
  }, {
    compare: Rf,
    debugName: "table/store"
  }));
  for (let H = 0; H < F.length; H++) {
    const A = F[H];
    (K = A.initTableInstanceData) == null || K.call(A, C), A.initCellInstanceData && C._cellInstanceInitFns.push(A.initCellInstanceData.bind(A)), A.initColumnInstanceData && C._columnInstanceInitFns.push(A.initColumnInstanceData.bind(A)), A.initHeaderGroupInstanceData && C._headerGroupInstanceInitFns.push(A.initHeaderGroupInstanceData.bind(A)), A.initHeaderInstanceData && C._headerInstanceInitFns.push(A.initHeaderInstanceData.bind(A)), A.initRowInstanceData && C._rowInstanceInitFns.push(A.initRowInstanceData.bind(A)), (B = A.constructTableAPIs) == null || B.call(A, C);
  }
  return C;
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
    Lt("rowExpandingFeature", e, t, {
      row_toggleExpanded: { fn: (n, r) => $i(n, r) },
      row_getIsExpanded: { fn: (n) => Qn(n) },
      row_getCanExpand: { fn: (n) => _t(n) },
      row_getIsAllParentsExpanded: { fn: (n) => Au(n) },
      row_getToggleExpandedHandler: { fn: (n) => Tu(n) }
    });
  },
  constructTableAPIs: (e) => {
    Rt("rowExpandingFeature", e, {
      table_autoResetExpanded: { fn: () => ji(e) },
      table_setExpanded: { fn: (t) => jn(e, t) },
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
  return Q();
}
function Kt(e, t) {
  var n, r;
  (r = (n = e.options).onRowSelectionChange) == null || r.call(n, t);
}
function Mf(e, t) {
  e._lastSelectedRowId = null, Kt(e, t ? Q() : Object.assign(Q(), at(e.initialState.rowSelection ?? {})));
}
function Bi(e, t, n) {
  e._lastSelectedRowId = null, Kt(e, (r) => {
    if (t = typeof t < "u" ? t : !ae(e, "getIsAllRowsSelected", qi), n != null && n.deselectAll && !t) return Q();
    const o = Object.assign(Q(), r), s = e.getPreGroupedRowModel().flatRows;
    if (t) {
      const i = /* @__PURE__ */ new Map();
      s.forEach((l) => {
        Hn(l, i) && (o[l.id] = !0);
      });
    } else s.forEach((i) => {
      nt(i) && delete o[i.id];
    });
    return o;
  });
}
function Ui(e, t, n) {
  e._lastSelectedRowId = null, Kt(e, (r) => {
    const o = typeof t < "u" ? t : !ae(e, "getIsAllPageRowsSelected", Yi);
    if (n != null && n.deselectAll && !o) return Q();
    const s = Object.assign(Q(), r);
    return e.getRowModel().rows.forEach((i) => {
      tr(s, i.id, o, !0, e, !0);
    }), s;
  });
}
function If(e) {
  return e.getCoreRowModel();
}
function Af(e) {
  const t = e.getCoreRowModel();
  return ae(e, "getIsSomeRowsSelected", er) ? co(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: Q()
  };
}
function Tf(e) {
  const t = e.getFilteredRowModel();
  return ae(e, "getIsSomeRowsSelected", er) ? co(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: Q()
  };
}
function Df(e) {
  const t = e.getSortedRowModel();
  return ae(e, "getIsSomeRowsSelected", er) ? co(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: Q()
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
    t.some((i) => !fn(i, n) && Hn(i, s)) && (r = !1);
  }
  return r;
}
function Yi(e) {
  var s;
  const t = e.getPaginatedRowModel().flatRows, n = ((s = e.atoms.rowSelection) == null ? void 0 : s.get()) ?? {}, r = /* @__PURE__ */ new Map();
  let o = !1;
  for (let i = 0; i < t.length; i++) {
    const l = t[i];
    if (fn(l, n))
      !o && Hn(l, r) && (o = !0);
    else if (Hn(l, r)) return !1;
  }
  return o;
}
function er(e) {
  return ae(e, "getSelectedRowIds", Gi).length > 0;
}
function Ff(e) {
  return e.getPaginatedRowModel().flatRows.filter((t) => nt(t)).some((t) => io(t) || ae(t, "getIsSomeSelected", Xi));
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
  Kt(e.table, (o) => {
    t = typeof t < "u" ? t : !r;
    const s = Object.assign(Q(), o);
    return tr(s, e.id, t, ((n == null ? void 0 : n.selectChildren) ?? !0) && wt(e), e.table), !t && (n != null && n.deselectParents) && Ji(s, e), s;
  });
}
function io(e) {
  var t;
  return fn(e, ((t = e.table.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function Xi(e) {
  return ao(e) === "some";
}
function kf(e) {
  return ao(e) === "all";
}
function nt(e) {
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
  const n = nt(e);
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
  const c = l.getDisplayIndex(), a = e.getDisplayIndex(), u = i[c], h = i[a];
  if (c < 0 || a < 0 || c >= i.length || a >= i.length || (u == null ? void 0 : u.id) !== l.id || (h == null ? void 0 : h.id) !== e.id || !wt(l) || !wt(e)) return !1;
  const v = Math.min(c, a), w = Math.max(c, a);
  return Kt(s, (R) => {
    const E = Object.assign(Q(), R);
    for (let T = v; T <= w; T++) {
      const j = i[T];
      !nt(j) || !wt(j) || (tr(E, j.id, n, o, s), !n && (r != null && r.deselectParents) && Ji(E, j));
    }
    return E;
  }), !0;
}
function tr(e, t, n, r, o, s) {
  const i = o.getRow(t, !0);
  n ? (wt(i) || Object.keys(e).forEach((l) => delete e[l]), nt(i) && (e[t] = !0)) : (!s || nt(i)) && delete e[t], r && i.subRows.length && lo(i) && i.subRows.forEach((l) => tr(e, l.id, n, r, o, s));
}
function Hn(e, t) {
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
    const i = e[s], l = fn(i, t);
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
  const n = [], r = Q(), o = ((s = t.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  return {
    rows: Zi(e.rows, o, n, r),
    flatRows: n,
    rowsById: r
  };
}
function fn(e, t) {
  return !!(kt(t, e.id) && t[e.id]);
}
function ao(e) {
  var s;
  if (!e.subRows.length) return !1;
  const t = ((s = e.table.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  let n = !1, r = !0, o = !1;
  for (let i = 0; i < e.subRows.length; i++) {
    const l = e.subRows[i];
    if (n && !r) break;
    if (nt(l) && (o = !0, fn(l, t) ? n = !0 : r = !1), l.subRows.length) {
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
    Lt("rowSelectionFeature", e, t, {
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
      row_getCanSelect: { fn: (n) => nt(n) },
      row_getCanSelectSubRows: { fn: (n) => lo(n) },
      row_getCanMultiSelect: { fn: (n) => wt(n) },
      row_getToggleSelectedHandler: { fn: (n, r) => Lf(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    Rt("rowSelectionFeature", e, {
      table_setRowSelection: { fn: (t) => Kt(e, t) },
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
        fn: () => er(e),
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
    return Zn({
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
    t.push(r), r.subRows.length && Qn(r) && r.subRows.forEach(n);
  };
  return e.rows.forEach(n), {
    rows: t,
    flatRows: e.flatRows,
    rowsById: e.rowsById
  };
}
function Xo(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = Tt(e[n]);
  return kr(e, t);
}
function Bf(e) {
  return Object.keys(e).map((t) => Tt(e[t]));
}
function Uf(e) {
  const t = (l, c) => {
    l.setOptions((a) => Uo(a, Xo(c)));
  }, n = Ka(), r = kr(e, { features: {
    coreReactivityFeature: n,
    ...Tt(e.features) ?? {}
  } }), o = kr(Xo(r), { mergeOptions: (l, c) => Uo(l, c) }), s = Pf(o), i = s;
  return xs() && Rl(() => {
    var l;
    return (l = n.unmount) == null ? void 0 : l.call(n);
  }), Ce(() => Bf(r), () => {
    t(s, r);
  }, { immediate: !0 }), Ce(() => {
    const l = Tt(e.state), c = Tt(e.atoms);
    if (!l) return [];
    const a = [];
    for (const u of Object.keys(i.initialState))
      !(u in l) || (c == null ? void 0 : c[u]) !== void 0 || a.push(l[u]);
    return a;
  }, (l) => {
    l.length > 0 && t(s, r);
  }, { immediate: !0 }), i.Subscribe = (l) => l.children(i.atoms), i;
}
function nr() {
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
var Jo = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, St = {}, dn = {};
Object.defineProperty(dn, "__esModule", { value: !0 });
dn.bind = void 0;
function zf(e, t) {
  var n = t.type, r = t.listener, o = t.options;
  return e.addEventListener(n, r, o), function() {
    e.removeEventListener(n, r, o);
  };
}
dn.bind = zf;
var rr = {}, Mt = Jo && Jo.__assign || function() {
  return Mt = Object.assign || function(e) {
    for (var t, n = 1, r = arguments.length; n < r; n++) {
      t = arguments[n];
      for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    }
    return e;
  }, Mt.apply(this, arguments);
};
Object.defineProperty(rr, "__esModule", { value: !0 });
rr.bindAll = void 0;
var Xf = dn;
function Zo(e) {
  if (!(typeof e > "u"))
    return typeof e == "boolean" ? {
      capture: e
    } : e;
}
function Jf(e, t) {
  if (t == null)
    return e;
  var n = Mt(Mt({}, e), { options: Mt(Mt({}, Zo(t)), Zo(e.options)) });
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
rr.bindAll = Zf;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.bindAll = e.bind = void 0;
  var t = dn;
  Object.defineProperty(e, "bind", { enumerable: !0, get: function() {
    return t.bind;
  } });
  var n = rr;
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
function sn(e) {
  "@babel/helpers - typeof";
  return sn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, sn(e);
}
function Qf(e, t) {
  if (sn(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (sn(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function ed(e) {
  var t = Qf(e, "string");
  return sn(t) == "symbol" ? t : t + "";
}
function pn(e, t, n) {
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
      pn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Qo(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
var ln = 2, ts = ln / 2;
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
    x: Math.min(e.x, window.innerWidth - ln),
    y: Math.min(e.y, window.innerHeight - ln)
  };
}
function ns(e) {
  var t = e.client, n = id(sd(od(rd(t))));
  return DOMRect.fromRect({
    x: n.x,
    y: n.y,
    width: ln,
    height: ln
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
        var u, h = l.location.current.input;
        (u = r) === null || u === void 0 || u({
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
function Zt(e) {
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
}), _n = /* @__PURE__ */ function() {
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
      }), _n.schedule(function() {
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
      _n.flush(), _r.cancel(), s({
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
        _n.flush();
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
      _n.flush(), _r.cancel(), s({
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
function xd(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = e.dispatchEvent;
  if (!sl())
    return;
  var s = Rd({
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
    var R = Sd({
      current: i.current.dropTargets,
      next: w.dropTargets
    });
    i.current = w, R && l.dragUpdate({
      current: i.current
    });
  }
  function a(w) {
    var R = Zt(w), E = nl(w.target) ? rl({
      x: R.clientX,
      y: R.clientY
    }) : w.target, T = r({
      target: E,
      input: R,
      source: n.payload,
      current: i.current.dropTargets
    });
    T.length && (w.preventDefault(), Sr({
      event: w,
      current: T
    })), c({
      dropTargets: T,
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
    }), h();
  }
  function h() {
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
          input: Zt(R)
        }, !i.current.dropTargets.length) {
          u();
          return;
        }
        R.preventDefault(), Sr({
          event: R,
          current: i.current.dropTargets
        }), l.drop({
          current: i.current,
          // When dropping something native, we need to extract the latest
          // `.items` from the "drop" event as it is now accessible
          updatedSourcePayload: n.type === "external" ? n.getDropPayload(R) : null
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
      listener: function(R) {
        i.current = {
          dropTargets: i.current.dropTargets,
          input: Zt(R)
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
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = Zt(t);
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
function Pd(e) {
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
function st(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ss(Object(n), !0).forEach(function(r) {
      pn(e, r, n[r]);
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
  function i(w) {
    return r.set(w.element, w), function() {
      return r.delete(w.element);
    };
  }
  function l(w) {
    var R = nr(il(w.element, {
      attribute: o,
      value: "true"
    }), i(w));
    return Ct(R);
  }
  function c(w) {
    var R, E, T, j, C = w.source, F = w.target, I = w.input, k = w.result, K = k === void 0 ? [] : k;
    if (F == null)
      return K;
    if (!(F instanceof Element))
      return F instanceof Node ? c({
        source: C,
        target: F.parentElement,
        input: I,
        result: K
      }) : K;
    var B = F.closest(s);
    if (B == null)
      return K;
    var H = r.get(B);
    if (H == null)
      return K;
    var A = {
      input: I,
      source: C,
      element: H.element
    };
    if (H.canDrop && !H.canDrop(A))
      return c({
        source: C,
        target: H.element.parentElement,
        input: I,
        result: K
      });
    var V = (R = (E = H.getData) === null || E === void 0 ? void 0 : E.call(H, A)) !== null && R !== void 0 ? R : {}, Y = (T = (j = H.getDropEffect) === null || j === void 0 ? void 0 : j.call(H, A)) !== null && T !== void 0 ? T : n, U = {
      data: V,
      element: H.element,
      dropEffect: Y,
      // we are collecting _actual_ drop targets, so these are
      // being applied _not_ due to stickiness
      isActiveDueToStickiness: !1
    };
    return c({
      source: C,
      target: H.element.parentElement,
      input: I,
      // Using bubble ordering. Same ordering as `event.getPath()`
      result: [].concat(ol(K), [U])
    });
  }
  function a(w) {
    var R = w.eventName, E = w.payload, T = xr(E.location.current.dropTargets), j;
    try {
      for (T.s(); !(j = T.n()).done; ) {
        var C, F = j.value, I = r.get(F.element), k = st(st({}, E), {}, {
          self: F
        });
        I == null || (C = I[R]) === null || C === void 0 || C.call(
          I,
          // I cannot seem to get the types right here.
          // TS doesn't seem to like that one event can need `nativeSetDragImage`
          // @ts-expect-error
          k
        );
      }
    } catch (K) {
      T.e(K);
    } finally {
      T.f();
    }
  }
  var u = {
    onGenerateDragPreview: a,
    onDrag: a,
    onDragStart: a,
    onDrop: a,
    onDropTargetChange: function(R) {
      var E = R.payload, T = new Set(E.location.current.dropTargets.map(function(W) {
        return W.element;
      })), j = /* @__PURE__ */ new Set(), C = xr(E.location.previous.dropTargets), F;
      try {
        for (C.s(); !(F = C.n()).done; ) {
          var I, k = F.value;
          j.add(k.element);
          var K = r.get(k.element), B = T.has(k.element), H = st(st({}, E), {}, {
            self: k
          });
          if (K == null || (I = K.onDropTargetChange) === null || I === void 0 || I.call(K, H), !B) {
            var A;
            K == null || (A = K.onDragLeave) === null || A === void 0 || A.call(K, H);
          }
        }
      } catch (W) {
        C.e(W);
      } finally {
        C.f();
      }
      var V = xr(E.location.current.dropTargets), Y;
      try {
        for (V.s(); !(Y = V.n()).done; ) {
          var U, se, we = Y.value;
          if (!j.has(we.element)) {
            var be = st(st({}, E), {}, {
              self: we
            }), ee = r.get(we.element);
            ee == null || (U = ee.onDropTargetChange) === null || U === void 0 || U.call(ee, be), ee == null || (se = ee.onDragEnter) === null || se === void 0 || se.call(ee, be);
          }
        }
      } catch (W) {
        V.e(W);
      } finally {
        V.f();
      }
    }
  };
  function h(w) {
    u[w.eventName](w);
  }
  function v(w) {
    var R = w.source, E = w.target, T = w.input, j = w.current, C = c({
      source: R,
      target: E,
      input: T
    });
    if (C.length >= j.length)
      return C;
    for (var F = Rr(j), I = Rr(C), k = [], K = 0; K < F.length; K++) {
      var B, H = F[K], A = I[K];
      if (A != null) {
        k.push(A);
        continue;
      }
      var V = k[K - 1], Y = F[K - 1];
      if ((V == null ? void 0 : V.element) !== (Y == null ? void 0 : Y.element))
        break;
      var U = r.get(H.element);
      if (!U)
        break;
      var se = {
        input: T,
        source: R,
        element: U.element
      };
      if (U.canDrop && !U.canDrop(se) || !((B = U.getIsSticky) !== null && B !== void 0 && B.call(U, se)))
        break;
      k.push(st(st({}, H), {}, {
        // making it clear to consumers this drop target is active due to stickiness
        isActiveDueToStickiness: !0
      }));
    }
    return Rr(k);
  }
  return {
    dropTargetForConsumers: l,
    getIsOver: v,
    dispatchEvent: h
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
      pn(e, r, n[r]);
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
      } catch (T) {
        c.e(T);
      } finally {
        c.f();
      }
    }
    if (t) {
      for (var h = Array.from(t.active), v = 0, w = h; v < w.length; v++) {
        var R = w[v];
        if (t.active.has(R)) {
          var E;
          (E = R[i]) === null || E === void 0 || E.call(R, l);
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
  function c(h) {
    r == null || r(h), l.dispatchEvent(h), i.dispatchEvent(h), o == null || o(h);
  }
  function a(h) {
    var v = h.event, w = h.dragType;
    os.start({
      event: v,
      dragType: w,
      getDropTargetsOver: l.getIsOver,
      dispatchEvent: c
    });
  }
  function u() {
    function h() {
      var v = {
        canStart: os.canStart,
        start: a
      };
      return n(v);
    }
    return Pd({
      typeKey: t,
      mount: h
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
}), jd = "pdnd:android-fallback", as = "text/plain", Hd = "text/uri-list", kd = "application/vnd.pdnd", kn = /* @__PURE__ */ new WeakMap();
function Ld(e) {
  return kn.set(e.element, e), function() {
    kn.delete(e.element);
  };
}
var us = ad(), ll = Dd({
  typeKey: "element",
  defaultDropEffect: "move",
  mount: function(t) {
    return nr(us.bindEvents(), St.bind(document, {
      type: "dragstart",
      listener: function(r) {
        var o, s, i, l, c, a;
        if (t.canStart(r) && !r.defaultPrevented && r.dataTransfer) {
          var u = r.target;
          if (u instanceof HTMLElement) {
            var h = kn.get(u);
            if (h) {
              var v = Zt(r), w = {
                element: h.element,
                dragHandle: (o = h.dragHandle) !== null && o !== void 0 ? o : null,
                input: v
              };
              if (h.canDrag && !h.canDrag(w)) {
                r.preventDefault();
                return;
              }
              if (h.dragHandle) {
                var R = rl({
                  x: v.clientX,
                  y: v.clientY
                });
                if (!h.dragHandle.contains(R)) {
                  r.preventDefault();
                  return;
                }
              }
              var E = (s = (i = h.getInitialDataForExternal) === null || i === void 0 ? void 0 : i.call(h, w)) !== null && s !== void 0 ? s : null;
              if (E)
                for (var T = 0, j = Object.entries(E); T < j.length; T++) {
                  var C = el(j[T], 2), F = C[0], I = C[1];
                  r.dataTransfer.setData(F, I ?? "");
                }
              Fd() && !r.dataTransfer.types.includes(as) && !r.dataTransfer.types.includes(Hd) && r.dataTransfer.setData(as, jd), r.dataTransfer.setData(kd, "");
              var k = {
                element: h.element,
                dragHandle: (l = h.dragHandle) !== null && l !== void 0 ? l : null,
                data: (c = (a = h.getInitialData) === null || a === void 0 ? void 0 : a.call(h, w)) !== null && c !== void 0 ? c : {}
              }, K = {
                type: "element",
                payload: k,
                startedFrom: "internal"
              };
              t.start({
                event: r,
                dragType: K
              });
            }
          }
        }
      }
    }));
  },
  dispatchEventToSource: function(t) {
    var n, r, o = t.eventName, s = t.payload;
    (n = kn.get(s.source.element)) === null || n === void 0 || (r = n[o]) === null || r === void 0 || r.call(
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
  var t = nr(
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
      pn(e, r, n[r]);
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
  var h = o * r;
  if (i.x < l.left + h) {
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
  return ds(ds({}, e), {}, pn({}, ul, i));
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
}, ip = ["checked", ".indeterminate", "aria-label", "onClick"], lp = { class: "pnl-tst-value" }, cp = "title", Sn = "pnl-tst-row", ap = 500, up = {
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
      coreRowModel: Ni(),
      expandedRowModel: Nf()
    }, r = le(() => (t.state.columns || []).length > 0), o = le(() => {
      const p = t.state.columns || [];
      return p.length === 0 ? [{ id: cp, header: "", accessorFn: (d) => d.title }] : p.map((d) => {
        const y = d.field ?? d.id;
        return {
          id: d.id,
          header: d.header ?? d.id,
          accessorFn: (b) => b[y],
          meta: { width: d.width }
        };
      });
    }), s = /* @__PURE__ */ Et(i(t.state.expandedKeys));
    function i(p) {
      const d = {};
      for (const y of p || []) d[y] = !0;
      return d;
    }
    function l(p) {
      return p === !0 ? w.getCoreRowModel().flatRows.filter((d) => d.subRows.length > 0).map((d) => d.id).sort() : Object.keys(p).filter((d) => p[d]).sort();
    }
    function c(p, d) {
      return p.length !== d.length ? !1 : p.every((y, b) => y === d[b]);
    }
    const a = le(() => t.state.options.select_mode ?? "none"), u = le(() => a.value !== "none"), h = le(() => a.value === "hierarchy"), v = /* @__PURE__ */ Et(i(t.state.selectedKeys)), w = Uf({
      features: n,
      data: le(() => t.state.source || []),
      columns: o,
      getRowId: (p) => p.key,
      getSubRows: (p) => p.children,
      // TanStack resets `expanded` whenever `data` changes. Python rewrites the
      // whole tree after every move, so leaving that on would collapse the tree on
      // each drop and push an empty `expanded_keys` back. Expansion is owned here.
      autoResetExpanded: !1,
      enableRowSelection: u,
      enableMultiRowSelection: le(() => a.value !== "single"),
      enableSubRowSelection: h,
      state: le(() => ({ expanded: s.value, rowSelection: v.value })),
      onExpandedChange: (p) => {
        s.value = typeof p == "function" ? p(s.value) : p;
      },
      onRowSelectionChange: (p) => {
        v.value = typeof p == "function" ? p(v.value) : p, t.setSelectedKeys(l(v.value));
      }
    });
    Ce(() => l(s.value), t.setExpandedKeys, { flush: "post" }), Ce(
      () => t.state.expandedKeys,
      (p) => {
        c(l(s.value), [...p || []].sort()) || (s.value = i(p));
      }
    ), Ce(
      () => t.state.selectedKeys,
      (p) => {
        c(l(v.value), [...p || []].sort()) || (v.value = i(p));
      }
    ), Ce(
      () => [t.state.options.expand_all, t.state.source],
      ([p]) => {
        p && w.toggleAllRowsExpanded(!0);
      },
      { immediate: !0 }
    );
    const R = le(() => w.getRowModel().rows), E = le(() => {
      var p;
      return ((p = w.getHeaderGroups()[0]) == null ? void 0 : p.headers) ?? [];
    }), T = le(() => t.state.options.indent_px ?? 16), j = le(() => t.state.options.aria_label ?? "Tree table"), C = le(() => r.value ? 2 : 1), F = le(() => R.value.length + (r.value ? 1 : 0));
    function I(p) {
      const d = p.getParentRow();
      return d ? d.subRows.length : w.getCoreRowModel().rows.length;
    }
    function k(p) {
      var y;
      const d = (y = p.meta) == null ? void 0 : y.width;
      return d ? { flex: `0 0 ${d}px` } : { flex: "1 1 0" };
    }
    function K(p, d) {
      return { ...k(d), paddingInlineStart: `${p.depth * T.value}px` };
    }
    const B = /* @__PURE__ */ Et(null), H = /* @__PURE__ */ new Map();
    function A(p, d) {
      d ? H.set(p, d) : H.delete(p);
    }
    const V = le(() => {
      const p = R.value;
      return p.length === 0 ? null : p.some((d) => d.id === B.value) ? B.value : p[0].id;
    });
    function Y(p) {
      p != null && (B.value = p, Ns(() => {
        var d;
        return (d = H.get(p)) == null ? void 0 : d.focus();
      }));
    }
    function U(p) {
      const d = R.value;
      d.length !== 0 && Y(d[Math.max(0, Math.min(p, d.length - 1))].id);
    }
    function se(p) {
      const d = R.value;
      if (d.length === 0) return;
      const y = Math.max(
        0,
        d.findIndex((M) => M.id === V.value)
      ), b = d[y];
      switch (p.key) {
        case "ArrowDown":
          p.preventDefault(), U(y + 1);
          break;
        case "ArrowUp":
          p.preventDefault(), U(y - 1);
          break;
        case "ArrowRight":
          if (p.preventDefault(), !b.getCanExpand()) break;
          b.getIsExpanded() ? U(y + 1) : (b.toggleExpanded(!0), Y(b.id));
          break;
        case "ArrowLeft":
          p.preventDefault(), b.getCanExpand() && b.getIsExpanded() ? (b.toggleExpanded(!1), Y(b.id)) : b.parentId && Y(b.parentId);
          break;
        case "Home":
          p.preventDefault(), U(0);
          break;
        case "End":
          p.preventDefault(), U(d.length - 1);
          break;
        case "Enter":
          p.preventDefault(), t.emitEvent("activate", { key: b.id });
          break;
        case " ":
          if (!u.value) break;
          p.preventDefault(), W(b);
          break;
      }
    }
    function we(p) {
      B.value = p.id, t.emitEvent("activate", { key: p.id });
    }
    function be(p) {
      B.value = p.id, p.toggleExpanded();
    }
    function ee(p) {
      return !p.getIsSelected() && p.getIsSomeSelected();
    }
    function W(p) {
      B.value = p.id, p.toggleSelected(void 0, {
        selectChildren: h.value,
        deselectParents: h.value
      });
    }
    function z(p) {
      W(p), Y(p.id);
    }
    const Be = ["reorder-above", "reorder-below", "make-child", "reparent"], ot = le(() => t.state.options.enable_dnd === !0), Ee = /* @__PURE__ */ Et(null), ge = /* @__PURE__ */ Et(null);
    function $t(p) {
      return R.value.find((d) => d.id === p) ?? null;
    }
    function or(p, d) {
      let y = p;
      for (; y; ) {
        if (y.id === d) return !0;
        y = y.getParentRow();
      }
      return !1;
    }
    function sr(p) {
      if (p.getCanExpand() && p.getIsExpanded()) return "expanded";
      const d = p.getParentRow(), y = d ? d.subRows : w.getCoreRowModel().rows;
      return p.index === y.length - 1 ? "last-in-group" : "standard";
    }
    let Ue = null, Te = null;
    function ut() {
      Te && clearTimeout(Te), Te = null, Ue = null;
    }
    function gn(p, d) {
      if (Ue === p || (ut(), !d || d.type === "instruction-blocked")) return;
      const y = $t(p);
      !y || !y.getCanExpand() || y.getIsExpanded() || (Ue = p, Te = setTimeout(() => {
        Te = null;
        const b = $t(p);
        b && b.getCanExpand() && !b.getIsExpanded() && b.toggleExpanded(!0);
      }, ap));
    }
    function Ge() {
      ge.value = null, ut();
    }
    const ir = /* @__PURE__ */ Et(null);
    function f() {
      let p = ir.value;
      if (!p) return null;
      let d = p.getRootNode();
      for (; d.host; )
        p = d.host, d = p.getRootNode();
      return p;
    }
    function g(p) {
      for (const d of R.value) {
        const y = H.get(d.id);
        if (!y) continue;
        const b = y.getBoundingClientRect();
        if (p.clientX >= b.left && p.clientX < b.right && p.clientY >= b.top && p.clientY < b.bottom)
          return { row: d, element: y, rect: b };
      }
      return null;
    }
    let m = null;
    function x() {
      m == null || m(), m = null;
      const p = f();
      !p || !ot.value || (m = nr(
        $d({
          element: p,
          // Anything outside a row (the header, the empty space below the last row)
          // is not a drag handle, and returning false cancels the native drag.
          canDrag: ({ input: d }) => g(d) !== null,
          getInitialData: ({ input: d }) => {
            var y;
            return { type: Sn, key: ((y = g(d)) == null ? void 0 : y.row.id) ?? null };
          },
          onGenerateDragPreview: ({ location: d, nativeSetDragImage: y }) => {
            const b = d.current.input, M = g(b);
            !M || !y || y(M.element, b.clientX - M.rect.left, b.clientY - M.rect.top);
          },
          onDragStart: ({ source: d }) => {
            Ee.value = d.data.key;
          },
          onDrop: () => {
            Ee.value = null, Ge();
          }
        }),
        Kd({
          element: p,
          canDrop: ({ source: d }) => d.data.type === Sn,
          getData: ({ input: d, source: y }) => {
            const b = g(d);
            if (!b) return { type: Sn, key: null };
            const M = { type: Sn, key: b.row.id }, D = or(b.row, y.data.key);
            return zd(M, {
              element: b.element,
              input: d,
              currentLevel: b.row.depth,
              indentPerLevel: T.value,
              mode: sr(b.row),
              block: D ? Be : []
            });
          },
          onDrag: ({ self: d }) => {
            const y = d.data.key, b = ps(d.data);
            ge.value = y && b ? { key: y, instruction: b } : null, gn(y ?? null, b);
          },
          onDragLeave: Ge,
          onDrop: ({ self: d, source: y }) => {
            Ge();
            const b = d.data.key, M = ps(d.data);
            !b || !M || M.type === "instruction-blocked" || b !== y.data.key && t.emitEvent("move", {
              key: y.data.key,
              targetKey: b,
              instruction: M.type,
              desiredLevel: M.desiredLevel ?? M.currentLevel
            });
          }
        })
      ));
    }
    Js(x), Ce(ot, x), Zs(() => {
      ut(), m == null || m();
    });
    function _(p) {
      var d;
      return ((d = ge.value) == null ? void 0 : d.key) === p.id ? ge.value.instruction : null;
    }
    function S(p) {
      const d = _(p);
      return {
        "pnl-tst-row--draggable": ot.value,
        "pnl-tst-row--dragging": Ee.value === p.id,
        "pnl-tst-row--blocked": (d == null ? void 0 : d.type) === "instruction-blocked",
        "pnl-tst-row--child-target": (d == null ? void 0 : d.type) === "make-child"
      };
    }
    function O(p) {
      const d = _(p);
      return d ? d.type === "reorder-above" ? "pnl-tst-dropline--above" : d.type === "reorder-below" || d.type === "reparent" ? "pnl-tst-dropline--below" : null : null;
    }
    function P(p) {
      const d = _(p);
      return d ? { insetInlineStart: `${(d.type === "reparent" ? d.desiredLevel : d.currentLevel) * d.indentPerLevel}px` } : null;
    }
    return (p, d) => (ue(), he("div", {
      ref_key: "rootElement",
      ref: ir,
      class: "pnl-tst"
    }, [
      R.value.length === 0 ? (ue(), he("div", Xd, "No data")) : (ue(), he("div", {
        key: 1,
        class: "pnl-tst-grid",
        role: "treegrid",
        "aria-label": j.value,
        "aria-colcount": E.value.length,
        "aria-rowcount": F.value,
        onKeydown: se
      }, [
        r.value ? (ue(), he("div", Zd, [
          gt("div", Qd, [
            (ue(!0), he(xe, null, gr(E.value, (y, b) => (ue(), he("div", {
              key: y.id,
              class: "pnl-tst-hcell",
              role: "columnheader",
              "aria-colindex": b + 1,
              style: At(k(y.column.columnDef))
            }, Pr(y.column.columnDef.header), 13, ep))), 128))
          ])
        ])) : vn("", !0),
        gt("div", tp, [
          (ue(!0), he(xe, null, gr(R.value, (y, b) => (ue(), he("div", {
            key: y.id,
            ref_for: !0,
            ref: (M) => A(y.id, M),
            class: ht(["pnl-tst-row", S(y)]),
            role: "row",
            "aria-level": y.depth + 1,
            "aria-posinset": y.index + 1,
            "aria-setsize": I(y),
            "aria-rowindex": b + C.value,
            "aria-expanded": y.getCanExpand() ? y.getIsExpanded() : void 0,
            "aria-selected": u.value ? y.getIsSelected() : void 0,
            tabindex: y.id === V.value ? 0 : -1,
            onClick: (M) => we(y),
            onFocus: (M) => B.value = y.id
          }, [
            O(y) ? (ue(), he("span", {
              key: 0,
              class: ht(["pnl-tst-dropline", O(y)]),
              style: At(P(y)),
              "aria-hidden": "true"
            }, null, 6)) : vn("", !0),
            (ue(!0), he(xe, null, gr(y.getAllCells(), (M, D) => (ue(), he("div", {
              key: M.id,
              class: ht(["pnl-tst-cell", { "pnl-tst-cell--tree": D === 0 }]),
              role: "gridcell",
              "aria-colindex": D + 1,
              style: At(
                D === 0 ? K(y, M.column.columnDef) : k(M.column.columnDef)
              )
            }, [
              D === 0 ? (ue(), he(xe, { key: 0 }, [
                y.getCanExpand() ? (ue(), he("span", {
                  key: 0,
                  class: ht(["pnl-tst-twisty", { "pnl-tst-twisty--open": y.getIsExpanded() }]),
                  "aria-hidden": "true",
                  onClick: Wo((N) => be(y), ["stop"])
                }, [...d[0] || (d[0] = [
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
                ])], 10, op)) : (ue(), he("span", sp)),
                u.value ? (ue(), he("input", {
                  key: 2,
                  class: "pnl-tst-check",
                  type: "checkbox",
                  tabindex: "-1",
                  checked: y.getIsSelected(),
                  ".indeterminate": ee(y),
                  "aria-label": `Select ${y.original.title ?? y.id}`,
                  onClick: Wo((N) => z(y), ["stop"])
                }, null, 40, ip)) : vn("", !0)
              ], 64)) : vn("", !0),
              gt("span", lp, Pr(M.getValue()), 1)
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
  const r = /* @__PURE__ */ Bn({
    source: e.get("source") || [],
    columns: e.get("columns") || [],
    options: e.get("options") || {},
    expandedKeys: e.get("expanded_keys") || [],
    selectedKeys: e.get("selected_keys") || []
  }), o = (u, h) => {
    e.set("_event_data", {
      event_name: u,
      event_params: h,
      timestamp: Date.now()
    }), e.save_changes();
  }, s = (u, h) => u.length === h.length && u.every((v, w) => v === h[w]), i = (u) => (h) => {
    const v = [...e.get(u) || []].sort();
    s(v, h) || (e.set(u, h), e.save_changes());
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

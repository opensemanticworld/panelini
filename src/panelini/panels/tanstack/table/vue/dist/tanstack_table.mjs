/**
* @vue/shared v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function Ws(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const he = {}, vn = [], ft = () => {
}, Gl = () => !1, go = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), po = (e) => e.startsWith("onUpdate:"), Pe = Object.assign, Us = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, uf = Object.prototype.hasOwnProperty, ue = (e, t) => uf.call(e, t), q = Array.isArray, jt = (e) => ur(e) === "[object Map]", Qr = (e) => ur(e) === "[object Set]", Wi = (e) => ur(e) === "[object Date]", X = (e) => typeof e == "function", be = (e) => typeof e == "string", dt = (e) => typeof e == "symbol", de = (e) => e !== null && typeof e == "object", Xl = (e) => (de(e) || X(e)) && X(e.then) && X(e.catch), Yl = Object.prototype.toString, ur = (e) => Yl.call(e), cf = (e) => ur(e).slice(8, -1), Zl = (e) => ur(e) === "[object Object]", qs = (e) => be(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Un = /* @__PURE__ */ Ws(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), ho = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, ff = /-\w/g, Ye = ho(
  (e) => e.replace(ff, (t) => t.slice(1).toUpperCase())
), df = /\B([A-Z])/g, Qt = ho(
  (e) => e.replace(df, "-$1").toLowerCase()
), Jl = ho((e) => e.charAt(0).toUpperCase() + e.slice(1)), ss = ho(
  (e) => e ? `on${Jl(e)}` : ""
), ut = (e, t) => !Object.is(e, t), is = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Ql = (e, t, n, r = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: r,
    value: n
  });
}, gf = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Ui;
const mo = () => Ui || (Ui = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function st(e) {
  if (q(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], o = be(r) ? vf(r) : st(r);
      if (o)
        for (const s in o)
          t[s] = o[s];
    }
    return t;
  } else if (be(e) || de(e))
    return e;
}
const pf = /;(?![^(]*\))/g, hf = /:([^]+)/, mf = /\/\*[^]*?\*\//g;
function vf(e) {
  const t = {};
  return e.replace(mf, "").split(pf).forEach((n) => {
    if (n) {
      const r = n.split(hf);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function it(e) {
  let t = "";
  if (be(e))
    t = e;
  else if (q(e))
    for (let n = 0; n < e.length; n++) {
      const r = it(e[n]);
      r && (t += r + " ");
    }
  else if (de(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const wf = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", yf = /* @__PURE__ */ Ws(wf);
function ea(e) {
  return !!e || e === "";
}
function bf(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let r = 0; n && r < e.length; r++)
    n = vo(e[r], t[r]);
  return n;
}
function qi(e, t) {
  if (e.size !== t.size) return !1;
  const n = Array.from(t), r = new Uint8Array(n.length);
  for (const o of e) {
    let s = -1;
    for (let l = 0; l < n.length; l++)
      if (!r[l] && vo(o, n[l])) {
        s = l;
        break;
      }
    if (s < 0) return !1;
    r[s] = 1;
  }
  return !0;
}
function vo(e, t) {
  if (e === t) return !0;
  let n = Wi(e), r = Wi(t);
  if (n || r)
    return n && r ? e.getTime() === t.getTime() : !1;
  if (n = dt(e), r = dt(t), n || r)
    return e === t;
  if (n = q(e), r = q(t), n || r)
    return n && r ? bf(e, t) : !1;
  if (n = de(e), r = de(t), n || r) {
    if (!n || !r)
      return !1;
    if (n = jt(e), r = jt(t), n || r || (n = Qr(e), r = Qr(t), n || r))
      return n && r ? qi(e, t) : !1;
    const o = Object.keys(e).length, s = Object.keys(t).length;
    if (o !== s)
      return !1;
    for (const l in e) {
      const a = e.hasOwnProperty(l), c = t.hasOwnProperty(l);
      if (a && !c || !a && c || !vo(e[l], t[l]))
        return !1;
    }
  }
  return String(e) === String(t);
}
const ta = (e) => !!(e && e.__v_isRef === !0), Ft = (e) => be(e) ? e : e == null ? "" : q(e) || de(e) && (e.toString === Yl || !X(e.toString)) ? ta(e) ? Ft(e.value) : JSON.stringify(e, na, 2) : String(e), na = (e, t) => ta(t) ? na(e, t.value) : jt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [r, o], s) => (n[ls(r, s) + " =>"] = o, n),
    {}
  )
} : Qr(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => ls(n))
} : dt(t) ? ls(t) : de(t) && !q(t) && !Zl(t) ? String(t) : t, ls = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    dt(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Re;
class _f {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && Re && (Re.active ? (this.parent = Re, this.index = (Re.scopes || (Re.scopes = [])).push(
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
      const n = Re;
      try {
        return Re = this, t();
      } finally {
        Re = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Re, Re = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (Re === this)
        Re = this.prevScope;
      else {
        let t = Re;
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
function ra() {
  return Re;
}
function Sf(e, t = !1) {
  Re && Re.cleanups.push(e);
}
let pe;
const as = /* @__PURE__ */ new WeakSet();
class oa {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Re && (Re.active ? Re.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, as.has(this) && (as.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || ia(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Gi(this), la(this);
    const t = pe, n = Ze;
    pe = this, Ze = !0;
    try {
      return this.fn();
    } finally {
      aa(this), pe = t, Ze = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Ys(t);
      this.deps = this.depsTail = void 0, Gi(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? as.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Cs(this) && this.run();
  }
  get dirty() {
    return Cs(this);
  }
}
let sa = 0, qn, Gn;
function ia(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Gn, Gn = e;
    return;
  }
  e.next = qn, qn = e;
}
function Gs() {
  sa++;
}
function Xs() {
  if (--sa > 0)
    return;
  if (Gn) {
    let t = Gn;
    for (Gn = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; qn; ) {
    let t = qn;
    for (qn = void 0; t; ) {
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
function la(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function aa(e) {
  let t, n = e.depsTail, r = n;
  for (; r; ) {
    const o = r.prevDep;
    r.version === -1 ? (r === n && (n = o), Ys(r), xf(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = o;
  }
  e.deps = t, e.depsTail = n;
}
function Cs(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (ua(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function ua(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === er) || (e.globalVersion = er, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Cs(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = pe, r = Ze;
  pe = e, Ze = !0;
  try {
    la(e);
    const o = e.fn(e._value);
    (t.version === 0 || ut(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    pe = n, Ze = r, aa(e), e.flags &= -3;
  }
}
function Ys(e, t = !1) {
  const { dep: n, prevSub: r, nextSub: o } = e;
  if (r && (r.nextSub = o, e.prevSub = void 0), o && (o.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
    n.computed.flags &= -5;
    for (let s = n.computed.deps; s; s = s.nextDep)
      Ys(s, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function xf(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let Ze = !0;
const ca = [];
function xt() {
  ca.push(Ze), Ze = !1;
}
function Rt() {
  const e = ca.pop();
  Ze = e === void 0 ? !0 : e;
}
function Gi(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = pe;
    pe = void 0;
    try {
      t();
    } finally {
      pe = n;
    }
  }
}
let er = 0;
class Rf {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Zs {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!pe || !Ze || pe === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== pe)
      n = this.activeLink = new Rf(pe, this), pe.deps ? (n.prevDep = pe.depsTail, pe.depsTail.nextDep = n, pe.depsTail = n) : pe.deps = pe.depsTail = n, fa(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const r = n.nextDep;
      r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = pe.depsTail, n.nextDep = void 0, pe.depsTail.nextDep = n, pe.depsTail = n, pe.deps === n && (pe.deps = r);
    }
    return n;
  }
  trigger(t) {
    this.version++, er++, this.notify(t);
  }
  notify(t) {
    Gs();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Xs();
    }
  }
}
function fa(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let r = t.deps; r; r = r.nextDep)
        fa(r);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const Ms = /* @__PURE__ */ new WeakMap(), Ut = /* @__PURE__ */ Symbol(
  ""
), Is = /* @__PURE__ */ Symbol(
  ""
), tr = /* @__PURE__ */ Symbol(
  ""
);
function Ae(e, t, n) {
  if (Ze && pe) {
    let r = Ms.get(e);
    r || Ms.set(e, r = /* @__PURE__ */ new Map());
    let o = r.get(n);
    o || (r.set(n, o = new Zs()), o.map = r, o.key = n), o.track();
  }
}
function _t(e, t, n, r, o, s) {
  const l = Ms.get(e);
  if (!l) {
    er++;
    return;
  }
  const a = (c) => {
    c && c.trigger();
  };
  if (Gs(), t === "clear")
    l.forEach(a);
  else {
    const c = q(e), f = c && qs(n);
    if (c && n === "length") {
      const d = Number(r);
      l.forEach((h, w) => {
        (w === "length" || w === tr || !dt(w) && w >= d) && a(h);
      });
    } else
      switch ((n !== void 0 || l.has(void 0)) && a(l.get(n)), f && a(l.get(tr)), t) {
        case "add":
          c ? f && a(l.get("length")) : (a(l.get(Ut)), jt(e) && a(l.get(Is)));
          break;
        case "delete":
          c || (a(l.get(Ut)), jt(e) && a(l.get(Is)));
          break;
        case "set":
          jt(e) && a(l.get(Ut));
          break;
      }
  }
  Xs();
}
function dn(e) {
  const t = /* @__PURE__ */ ae(e);
  return t === e ? t : (Ae(t, "iterate", tr), /* @__PURE__ */ Ue(e) ? t : t.map(Je));
}
function wo(e) {
  return Ae(e = /* @__PURE__ */ ae(e), "iterate", tr), e;
}
function lt(e, t) {
  return /* @__PURE__ */ Ct(e) ? _n(/* @__PURE__ */ qt(e) ? Je(t) : t) : Je(t);
}
const Cf = {
  __proto__: null,
  [Symbol.iterator]() {
    return us(this, Symbol.iterator, (e) => lt(this, e));
  },
  concat(...e) {
    return dn(this).concat(
      ...e.map((t) => q(t) ? dn(t) : t)
    );
  },
  entries() {
    return us(this, "entries", (e) => (e[1] = lt(this, e[1]), e));
  },
  every(e, t) {
    return wt(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return wt(
      this,
      "filter",
      e,
      t,
      (n) => n.map((r) => lt(this, r)),
      arguments
    );
  },
  find(e, t) {
    return wt(
      this,
      "find",
      e,
      t,
      (n) => lt(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return wt(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return wt(
      this,
      "findLast",
      e,
      t,
      (n) => lt(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return wt(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return wt(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return cs(this, "includes", e);
  },
  indexOf(...e) {
    return cs(this, "indexOf", e);
  },
  join(e) {
    return dn(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return cs(this, "lastIndexOf", e);
  },
  map(e, t) {
    return wt(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return zn(this, "pop");
  },
  push(...e) {
    return zn(this, "push", e);
  },
  reduce(e, ...t) {
    return Xi(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Xi(this, "reduceRight", e, t);
  },
  shift() {
    return zn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return wt(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return zn(this, "splice", e);
  },
  toReversed() {
    return dn(this).toReversed();
  },
  toSorted(e) {
    return dn(this).toSorted(e);
  },
  toSpliced(...e) {
    return dn(this).toSpliced(...e);
  },
  unshift(...e) {
    return zn(this, "unshift", e);
  },
  values() {
    return us(this, "values", (e) => lt(this, e));
  }
};
function us(e, t, n) {
  const r = wo(e), o = r[t]();
  return r !== e && !/* @__PURE__ */ Ue(e) && (o._next = o.next, o.next = () => {
    const s = o._next();
    return s.done || (s.value = n(s.value)), s;
  }), o;
}
const Mf = Array.prototype;
function wt(e, t, n, r, o, s) {
  const l = wo(e), a = l !== e && !/* @__PURE__ */ Ue(e), c = l[t];
  if (c !== Mf[t]) {
    const h = c.apply(e, s);
    return a ? Je(h) : h;
  }
  let f = n;
  l !== e && (a ? f = function(h, w) {
    return n.call(this, lt(e, h), w, e);
  } : n.length > 2 && (f = function(h, w) {
    return n.call(this, h, w, e);
  }));
  const d = c.call(l, f, r);
  return a && o ? o(d) : d;
}
function Xi(e, t, n, r) {
  const o = wo(e), s = o !== e && !/* @__PURE__ */ Ue(e);
  let l = n, a = !1;
  o !== e && (s ? (a = r.length === 0, l = function(f, d, h) {
    return a && (a = !1, f = lt(e, f)), n.call(this, f, lt(e, d), h, e);
  }) : n.length > 3 && (l = function(f, d, h) {
    return n.call(this, f, d, h, e);
  }));
  const c = o[t](l, ...r);
  return a ? lt(e, c) : c;
}
function cs(e, t, n) {
  const r = /* @__PURE__ */ ae(e);
  Ae(r, "iterate", tr);
  const o = r[t](...n);
  return (o === -1 || o === !1) && /* @__PURE__ */ ei(n[0]) ? (n[0] = /* @__PURE__ */ ae(n[0]), r[t](...n)) : o;
}
function zn(e, t, n = []) {
  xt(), Gs();
  const r = (/* @__PURE__ */ ae(e))[t].apply(e, n);
  return Xs(), Rt(), r;
}
const If = /* @__PURE__ */ Ws("__proto__,__v_isRef,__isVue"), da = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(dt)
);
function Ef(e) {
  dt(e) || (e = String(e));
  const t = /* @__PURE__ */ ae(this);
  return Ae(t, "has", e), t.hasOwnProperty(e);
}
class ga {
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
      return r === (o ? s ? jf : va : s ? ma : ha).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const l = q(t);
    if (!o) {
      let c;
      if (l && (c = Cf[n]))
        return c;
      if (n === "hasOwnProperty")
        return Ef;
    }
    const a = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ Oe(t) ? t : r
    );
    if ((dt(n) ? da.has(n) : If(n)) || (o || Ae(t, "get", n), s))
      return a;
    if (/* @__PURE__ */ Oe(a)) {
      const c = l && qs(n) ? a : a.value;
      return o && de(c) ? /* @__PURE__ */ As(c) : c;
    }
    return de(a) ? o ? /* @__PURE__ */ As(a) : /* @__PURE__ */ yo(a) : a;
  }
}
class pa extends ga {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, o) {
    let s = t[n];
    const l = q(t) && qs(n);
    if (!this._isShallow) {
      const f = /* @__PURE__ */ Ct(s);
      if (!/* @__PURE__ */ Ue(r) && !/* @__PURE__ */ Ct(r) && (s = /* @__PURE__ */ ae(s), r = /* @__PURE__ */ ae(r)), !l && /* @__PURE__ */ Oe(s) && !/* @__PURE__ */ Oe(r))
        return f || (s.value = r), !0;
    }
    const a = l ? Number(n) < t.length : ue(t, n), c = Reflect.set(
      t,
      n,
      r,
      /* @__PURE__ */ Oe(t) ? t : o
    );
    return t === /* @__PURE__ */ ae(o) && c && (a ? ut(r, s) && _t(t, "set", n, r) : _t(t, "add", n, r)), c;
  }
  deleteProperty(t, n) {
    const r = ue(t, n);
    t[n];
    const o = Reflect.deleteProperty(t, n);
    return o && r && _t(t, "delete", n, void 0), o;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!dt(n) || !da.has(n)) && Ae(t, "has", n), r;
  }
  ownKeys(t) {
    return Ae(
      t,
      "iterate",
      q(t) ? "length" : Ut
    ), Reflect.ownKeys(t);
  }
}
class Af extends ga {
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
const Of = /* @__PURE__ */ new pa(), Pf = /* @__PURE__ */ new Af(), Df = /* @__PURE__ */ new pa(!0);
const Es = (e) => e, zr = (e) => Reflect.getPrototypeOf(e);
function kf(e, t, n) {
  return function(...r) {
    const o = this.__v_raw, s = /* @__PURE__ */ ae(o), l = jt(s), a = e === "entries" || e === Symbol.iterator && l, c = e === "keys" && l, f = o[e](...r), d = n ? Es : t ? _n : Je;
    return !t && Ae(
      s,
      "iterate",
      c ? Is : Ut
    ), Pe(
      // inheriting all iterator properties
      Object.create(f),
      {
        // iterator protocol
        next() {
          const { value: h, done: w } = f.next();
          return w ? { value: h, done: w } : {
            value: a ? [d(h[0]), d(h[1])] : d(h),
            done: w
          };
        }
      }
    );
  };
}
function Kr(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Tf(e, t) {
  const n = {
    get(o) {
      const s = this.__v_raw, l = /* @__PURE__ */ ae(s), a = /* @__PURE__ */ ae(o);
      e || (ut(o, a) && Ae(l, "get", o), Ae(l, "get", a));
      const { has: c } = zr(l), f = t ? Es : e ? _n : Je;
      if (c.call(l, o))
        return f(s.get(o));
      if (c.call(l, a))
        return f(s.get(a));
      s !== l && s.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && Ae(/* @__PURE__ */ ae(o), "iterate", Ut), o.size;
    },
    has(o) {
      const s = this.__v_raw, l = /* @__PURE__ */ ae(s), a = /* @__PURE__ */ ae(o);
      return e || (ut(o, a) && Ae(l, "has", o), Ae(l, "has", a)), o === a ? s.has(o) : s.has(o) || s.has(a);
    },
    forEach(o, s) {
      const l = this, a = l.__v_raw, c = /* @__PURE__ */ ae(a), f = t ? Es : e ? _n : Je;
      return !e && Ae(c, "iterate", Ut), a.forEach((d, h) => o.call(s, f(d), f(h), l));
    }
  };
  return Pe(
    n,
    e ? {
      add: Kr("add"),
      set: Kr("set"),
      delete: Kr("delete"),
      clear: Kr("clear")
    } : {
      add(o) {
        const s = /* @__PURE__ */ ae(this), l = zr(s), a = /* @__PURE__ */ ae(o), c = !t && !/* @__PURE__ */ Ue(o) && !/* @__PURE__ */ Ct(o) ? a : o;
        return l.has.call(s, c) || ut(o, c) && l.has.call(s, o) || ut(a, c) && l.has.call(s, a) || (s.add(c), _t(s, "add", c, c)), this;
      },
      set(o, s) {
        !t && !/* @__PURE__ */ Ue(s) && !/* @__PURE__ */ Ct(s) && (s = /* @__PURE__ */ ae(s));
        const l = /* @__PURE__ */ ae(this), { has: a, get: c } = zr(l);
        let f = a.call(l, o);
        f || (o = /* @__PURE__ */ ae(o), f = a.call(l, o));
        const d = c.call(l, o);
        return l.set(o, s), f ? ut(s, d) && _t(l, "set", o, s) : _t(l, "add", o, s), this;
      },
      delete(o) {
        const s = /* @__PURE__ */ ae(this), { has: l, get: a } = zr(s);
        let c = l.call(s, o);
        c || (o = /* @__PURE__ */ ae(o), c = l.call(s, o)), a && a.call(s, o);
        const f = s.delete(o);
        return c && _t(s, "delete", o, void 0), f;
      },
      clear() {
        const o = /* @__PURE__ */ ae(this), s = o.size !== 0, l = o.clear();
        return s && _t(
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
    n[o] = kf(o, e, t);
  }), n;
}
function Js(e, t) {
  const n = Tf(e, t);
  return (r, o, s) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(
    ue(n, o) && o in r ? n : r,
    o,
    s
  );
}
const Ff = {
  get: /* @__PURE__ */ Js(!1, !1)
}, Hf = {
  get: /* @__PURE__ */ Js(!1, !0)
}, Lf = {
  get: /* @__PURE__ */ Js(!0, !1)
};
const ha = /* @__PURE__ */ new WeakMap(), ma = /* @__PURE__ */ new WeakMap(), va = /* @__PURE__ */ new WeakMap(), jf = /* @__PURE__ */ new WeakMap();
function zf(e) {
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
function yo(e) {
  return /* @__PURE__ */ Ct(e) ? e : Qs(
    e,
    !1,
    Of,
    Ff,
    ha
  );
}
// @__NO_SIDE_EFFECTS__
function Kf(e) {
  return Qs(
    e,
    !1,
    Df,
    Hf,
    ma
  );
}
// @__NO_SIDE_EFFECTS__
function As(e) {
  return Qs(
    e,
    !0,
    Pf,
    Lf,
    va
  );
}
function Qs(e, t, n, r, o) {
  if (!de(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const s = o.get(e);
  if (s)
    return s;
  const l = zf(cf(e));
  if (l === 0)
    return e;
  const a = new Proxy(
    e,
    l === 2 ? r : n
  );
  return o.set(e, a), a;
}
// @__NO_SIDE_EFFECTS__
function qt(e) {
  return /* @__PURE__ */ Ct(e) ? /* @__PURE__ */ qt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Ct(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Ue(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function ei(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function ae(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ ae(t) : e;
}
function Vf(e) {
  return !ue(e, "__v_skip") && Object.isExtensible(e) && Ql(e, "__v_skip", !0), e;
}
const Je = (e) => de(e) ? /* @__PURE__ */ yo(e) : e, _n = (e) => de(e) ? /* @__PURE__ */ As(e) : e;
// @__NO_SIDE_EFFECTS__
function Oe(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function ne(e) {
  return wa(e, !1);
}
// @__NO_SIDE_EFFECTS__
function Bf(e) {
  return wa(e, !0);
}
function wa(e, t) {
  return /* @__PURE__ */ Oe(e) ? e : new Nf(e, t);
}
class Nf {
  constructor(t, n) {
    this.dep = new Zs(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ ae(t), this._value = n ? t : Je(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, r = this.__v_isShallow || /* @__PURE__ */ Ue(t) || /* @__PURE__ */ Ct(t);
    t = r ? t : /* @__PURE__ */ ae(t), ut(t, n) && (this._rawValue = t, this._value = r ? t : Je(t), this.dep.trigger());
  }
}
function Gt(e) {
  return /* @__PURE__ */ Oe(e) ? e.value : e;
}
const $f = {
  get: (e, t, n) => t === "__v_raw" ? e : Gt(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return /* @__PURE__ */ Oe(o) && !/* @__PURE__ */ Oe(n) ? (o.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function ya(e) {
  return /* @__PURE__ */ qt(e) ? e : new Proxy(e, $f);
}
class Wf {
  constructor(t, n, r) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Zs(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = er - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    pe !== this)
      return ia(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return ua(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function Uf(e, t, n = !1) {
  let r, o;
  return X(e) ? r = e : (r = e.get, o = e.set), new Wf(r, o, n);
}
const Vr = {}, eo = /* @__PURE__ */ new WeakMap();
let Wt;
function qf(e, t = !1, n = Wt) {
  if (n) {
    let r = eo.get(n);
    r || eo.set(n, r = []), r.push(e);
  }
}
function Gf(e, t, n = he) {
  const { immediate: r, deep: o, once: s, scheduler: l, augmentJob: a, call: c } = n, f = (_) => o ? _ : /* @__PURE__ */ Ue(_) || o === !1 || o === 0 ? Lt(_, 1) : Lt(_);
  let d, h, w, y, I = !1, E = !1;
  if (/* @__PURE__ */ Oe(e) ? (h = () => e.value, I = /* @__PURE__ */ Ue(e)) : /* @__PURE__ */ qt(e) ? (h = () => f(e), I = !0) : q(e) ? (E = !0, I = e.some((_) => /* @__PURE__ */ qt(_) || /* @__PURE__ */ Ue(_)), h = () => e.map((_) => {
    if (/* @__PURE__ */ Oe(_))
      return _.value;
    if (/* @__PURE__ */ qt(_))
      return f(_);
    if (X(_))
      return c ? c(_, 2) : _();
  })) : X(e) ? t ? h = c ? () => c(e, 2) : e : h = () => {
    if (w) {
      xt();
      try {
        w();
      } finally {
        Rt();
      }
    }
    const _ = Wt;
    Wt = d;
    try {
      return c ? c(e, 3, [y]) : e(y);
    } finally {
      Wt = _;
    }
  } : h = ft, t && o) {
    const _ = h, D = o === !0 ? 1 / 0 : o;
    h = () => Lt(_(), D);
  }
  const A = ra(), z = () => {
    d.stop(), A && A.active && Us(A.effects, d);
  };
  if (s && t) {
    const _ = t;
    t = (...D) => {
      const j = _(...D);
      return z(), j;
    };
  }
  let C = E ? new Array(e.length).fill(Vr) : Vr;
  const O = (_) => {
    if (!(!(d.flags & 1) || !d.dirty && !_))
      if (t) {
        const D = d.run();
        if (_ || o || I || (E ? D.some((j, U) => ut(j, C[U])) : ut(D, C))) {
          w && w();
          const j = Wt;
          Wt = d;
          try {
            const U = [
              D,
              // pass undefined as the old value when it's changed for the first time
              C === Vr ? void 0 : E && C[0] === Vr ? [] : C,
              y
            ];
            C = D, c ? c(t, 3, U) : (
              // @ts-expect-error
              t(...U)
            );
          } finally {
            Wt = j;
          }
        }
      } else
        d.run();
  };
  return a && a(O), d = new oa(h), d.scheduler = l ? () => l(O, !1) : O, y = (_) => qf(_, !1, d), w = d.onStop = () => {
    const _ = eo.get(d);
    if (_) {
      if (c)
        c(_, 4);
      else
        for (const D of _) D();
      eo.delete(d);
    }
  }, t ? r ? O(!0) : C = d.run() : l ? l(O.bind(null, !0), !0) : d.run(), z.pause = d.pause.bind(d), z.resume = d.resume.bind(d), z.stop = z, z;
}
function Lt(e, t = 1 / 0, n) {
  if (t <= 0 || !de(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ Oe(e))
    Lt(e.value, t, n);
  else if (q(e))
    for (let r = 0; r < e.length; r++)
      Lt(e[r], t, n);
  else if (Qr(e) || jt(e))
    e.forEach((r) => {
      Lt(r, t, n);
    });
  else if (Zl(e)) {
    for (const r in e)
      Lt(e[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, r) && Lt(e[r], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function cr(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (o) {
    bo(o, t, n);
  }
}
function Qe(e, t, n, r) {
  if (X(e)) {
    const o = cr(e, t, n, r);
    return o && Xl(o) && o.catch((s) => {
      bo(s, t, n);
    }), o;
  }
  if (q(e)) {
    const o = [];
    for (let s = 0; s < e.length; s++)
      o.push(Qe(e[s], t, n, r));
    return o;
  }
}
function bo(e, t, n, r = !0) {
  const o = t ? t.vnode : null, { errorHandler: s, throwUnhandledErrorInProduction: l } = t && t.appContext.config || he;
  if (t) {
    let a = t.parent;
    const c = t.proxy, f = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; a; ) {
      const d = a.ec;
      if (d) {
        for (let h = 0; h < d.length; h++)
          if (d[h](e, c, f) === !1)
            return;
      }
      a = a.parent;
    }
    if (s) {
      xt(), cr(s, null, 10, [
        e,
        c,
        f
      ]), Rt();
      return;
    }
  }
  Xf(e, n, o, r, l);
}
function Xf(e, t, n, r = !0, o = !1) {
  if (o)
    throw e;
  console.error(e);
}
const He = [];
let ot = -1;
const wn = [];
let Ht = null, hn = 0;
const ba = /* @__PURE__ */ Promise.resolve();
let to = null;
function Ne(e) {
  const t = to || ba;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Yf(e) {
  let t = ot + 1, n = He.length;
  for (; t < n; ) {
    const r = t + n >>> 1, o = He[r], s = nr(o);
    s < e || s === e && o.flags & 2 ? t = r + 1 : n = r;
  }
  return t;
}
function ti(e) {
  if (!(e.flags & 1)) {
    const t = nr(e), n = He[He.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= nr(n) ? He.push(e) : He.splice(Yf(t), 0, e), e.flags |= 1, _a();
  }
}
function _a() {
  to || (to = ba.then(xa));
}
function Zf(e) {
  if (!q(e))
    Ht && e.id === -1 ? Ht.splice(hn + 1, 0, e) : e.flags & 1 || (wn.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      wn.push(e[t]);
  _a();
}
function Yi(e, t, n = ot + 1) {
  for (; n < He.length; n++) {
    const r = He[n];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid)
        continue;
      He.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function Sa(e) {
  if (wn.length) {
    const t = [...new Set(wn)].sort(
      (n, r) => nr(n) - nr(r)
    );
    if (wn.length = 0, Ht) {
      for (let n = 0; n < t.length; n++)
        Ht.push(t[n]);
      return;
    }
    for (Ht = t, hn = 0; hn < Ht.length; hn++) {
      const n = Ht[hn];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    Ht = null, hn = 0;
  }
}
const nr = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function xa(e) {
  try {
    for (ot = 0; ot < He.length; ot++) {
      const t = He[ot];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), cr(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; ot < He.length; ot++) {
      const t = He[ot];
      t && (t.flags &= -2);
    }
    ot = -1, He.length = 0, Sa(), to = null, (He.length || wn.length) && xa();
  }
}
let ct = null, Ra = null;
function no(e) {
  const t = ct;
  return ct = e, Ra = e && e.type.__scopeId || null, t;
}
function Jf(e, t = ct, n) {
  if (!t || e._n)
    return e;
  const r = (...o) => {
    r._d && ll(-1);
    const s = no(t), l = Xt.length;
    let a;
    try {
      a = e(...o);
    } finally {
      for (let c = Xt.length; c > l; c--) Ga();
      no(s), r._d && ll(1);
    }
    return a;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function Nt(e, t, n, r) {
  const o = e.dirs, s = t && t.dirs;
  for (let l = 0; l < o.length; l++) {
    const a = o[l];
    s && (a.oldValue = s[l].value);
    let c = a.dir[r];
    c && (xt(), Qe(c, n, 8, [
      e.el,
      a,
      e,
      t
    ]), Rt());
  }
}
function Qf(e, t) {
  if (Le) {
    let n = Le.provides;
    const r = Le.parent && Le.parent.provides;
    r === n && (n = Le.provides = Object.create(r)), n[e] = t;
  }
}
function Gr(e, t, n = !1) {
  const r = Xd();
  if (r || yn) {
    let o = yn ? yn._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && X(t) ? t.call(r && r.proxy) : t;
  }
}
const ed = /* @__PURE__ */ Symbol.for("v-scx"), td = () => Gr(ed);
function we(e, t, n) {
  return Ca(e, t, n);
}
function Ca(e, t, n = he) {
  const { immediate: r, deep: o, flush: s, once: l } = n, a = Pe({}, n), c = t && r || !t && s !== "post";
  let f;
  if (sr) {
    if (s === "sync") {
      const y = td();
      f = y.__watcherHandles || (y.__watcherHandles = []);
    } else if (!c) {
      const y = () => {
      };
      return y.stop = ft, y.resume = ft, y.pause = ft, y;
    }
  }
  const d = Le;
  a.call = (y, I, E) => Qe(y, d, I, E);
  let h = !1;
  s === "post" ? a.scheduler = (y) => {
    Ve(y, d && d.suspense);
  } : s !== "sync" && (h = !0, a.scheduler = (y, I) => {
    I ? y() : ti(y);
  }), a.augmentJob = (y) => {
    t && (y.flags |= 4), h && (y.flags |= 2, d && (y.id = d.uid, y.i = d));
  };
  const w = Gf(e, t, a);
  return sr && (f ? f.push(w) : c && w()), w;
}
function nd(e, t, n) {
  const r = this.proxy, o = be(e) ? e.includes(".") ? Ma(r, e) : () => r[e] : e.bind(r, r);
  let s;
  X(t) ? s = t : (s = t.handler, n = t);
  const l = fr(this), a = Ca(o, s.bind(r), n);
  return l(), a;
}
function Ma(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++)
      r = r[n[o]];
    return r;
  };
}
const rd = /* @__PURE__ */ Symbol("_vte"), _o = (e) => e.__isTeleport, fs = /* @__PURE__ */ Symbol("_leaveCb");
function od(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== Mt) {
        t = n;
        break;
      }
  }
  return t;
}
function Ia(e) {
  if (!ri(e))
    return _o(e.type) && e.children ? od(e.children) : e;
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
function ni(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    ni(
      _o(n.type) && Ia(n) || n,
      t
    );
  } else e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Ea(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Zi(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const ro = /* @__PURE__ */ new WeakMap();
function Xn(e, t, n, r, o = !1) {
  if (q(e)) {
    e.forEach(
      (E, A) => Xn(
        E,
        t && (q(t) ? t[A] : t),
        n,
        r,
        o
      )
    );
    return;
  }
  if (Yn(r) && !o) {
    r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && Xn(e, t, n, r.component.subTree);
    return;
  }
  const s = r.shapeFlag & 4 ? ii(r.component) : r.el, l = o ? null : s, { i: a, r: c } = e, f = t && t.r, d = a.refs === he ? a.refs = {} : a.refs, h = a.setupState, w = /* @__PURE__ */ ae(h), y = h === he ? Gl : (E) => Zi(d, E) ? !1 : ue(w, E), I = (E, A) => !(A && Zi(d, A));
  if (f != null && f !== c) {
    if (Ji(t), be(f))
      d[f] = null, y(f) && (h[f] = null);
    else if (/* @__PURE__ */ Oe(f)) {
      const E = t;
      I(f, E.k) && (f.value = null), E.k && (d[E.k] = null);
    }
  }
  if (X(c))
    cr(c, a, 12, [l, d]);
  else {
    const E = be(c), A = /* @__PURE__ */ Oe(c);
    if (E || A) {
      const z = () => {
        if (e.f) {
          const C = E ? y(c) ? h[c] : d[c] : I() || !e.k ? c.value : d[e.k];
          if (o)
            q(C) && Us(C, s);
          else if (q(C))
            C.includes(s) || C.push(s);
          else if (E)
            d[c] = [s], y(c) && (h[c] = d[c]);
          else {
            const O = [s];
            I(c, e.k) && (c.value = O), e.k && (d[e.k] = O);
          }
        } else E ? (d[c] = l, y(c) && (h[c] = l)) : A && (I(c, e.k) && (c.value = l), e.k && (d[e.k] = l));
      };
      if (l) {
        const C = () => {
          z(), ro.delete(e);
        };
        C.id = -1, ro.set(e, C), Ve(C, n);
      } else
        Ji(e), z();
    }
  }
}
function Ji(e) {
  const t = ro.get(e);
  t && (t.flags |= 8, ro.delete(e));
}
mo().requestIdleCallback;
mo().cancelIdleCallback;
const Yn = (e) => !!e.type.__asyncLoader, ri = (e) => e.type.__isKeepAlive;
function sd(e, t) {
  Aa(e, "a", t);
}
function id(e, t) {
  Aa(e, "da", t);
}
function Aa(e, t, n = Le) {
  const r = e.__wdc || (e.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (So(t, r, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      ri(o.parent.vnode) && ld(r, t, n, o), o = o.parent;
  }
}
function ld(e, t, n, r) {
  const o = So(
    t,
    e,
    r,
    !0
    /* prepend */
  );
  Oa(() => {
    Us(r[t], o);
  }, n);
}
function So(e, t, n = Le, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), s = t.__weh || (t.__weh = (...l) => {
      xt();
      const a = fr(n), c = Qe(t, n, e, l);
      return a(), Rt(), c;
    });
    return r ? o.unshift(s) : o.push(s), s;
  }
}
const Et = (e) => (t, n = Le) => {
  (!sr || e === "sp") && So(e, (...r) => t(...r), n);
}, ad = Et("bm"), Xr = Et("m"), ud = Et(
  "bu"
), cd = Et("u"), Nn = Et(
  "bum"
), Oa = Et("um"), fd = Et(
  "sp"
), dd = Et("rtg"), gd = Et("rtc");
function pd(e, t = Le) {
  So("ec", e, t);
}
const hd = /* @__PURE__ */ Symbol.for("v-ndc");
function Kn(e, t, n, r) {
  let o;
  const s = n, l = q(e);
  if (l || be(e)) {
    const a = l && /* @__PURE__ */ qt(e);
    let c = !1, f = !1;
    a && (c = !/* @__PURE__ */ Ue(e), f = /* @__PURE__ */ Ct(e), e = wo(e)), o = new Array(e.length);
    for (let d = 0, h = e.length; d < h; d++)
      o[d] = t(
        c ? f ? _n(Je(e[d])) : Je(e[d]) : e[d],
        d,
        void 0,
        s
      );
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let a = 0; a < e; a++)
      o[a] = t(a + 1, a, void 0, s);
  } else if (de(e))
    if (e[Symbol.iterator])
      o = Array.from(
        e,
        (a, c) => t(a, c, void 0, s)
      );
    else {
      const a = Object.keys(e);
      o = new Array(a.length);
      for (let c = 0, f = a.length; c < f; c++) {
        const d = a[c];
        o[c] = t(e[d], d, c, s);
      }
    }
  else
    o = [];
  return o;
}
const Os = (e) => e ? Ja(e) ? ii(e) : Os(e.parent) : null, Zn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Pe(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Os(e.parent),
    $root: (e) => Os(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Da(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      ti(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Ne.bind(e.proxy)),
    $watch: (e) => nd.bind(e)
  })
), ds = (e, t) => e !== he && !e.__isScriptSetup && ue(e, t), md = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: r, data: o, props: s, accessCache: l, type: a, appContext: c } = e;
    if (t[0] !== "$") {
      const w = l[t];
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
        if (ds(r, t))
          return l[t] = 1, r[t];
        if (o !== he && ue(o, t))
          return l[t] = 2, o[t];
        if (ue(s, t))
          return l[t] = 3, s[t];
        if (n !== he && ue(n, t))
          return l[t] = 4, n[t];
        Ps && (l[t] = 0);
      }
    }
    const f = Zn[t];
    let d, h;
    if (f)
      return t === "$attrs" && Ae(e.attrs, "get", ""), f(e);
    if (
      // css module (injected by vue-loader)
      (d = a.__cssModules) && (d = d[t])
    )
      return d;
    if (n !== he && ue(n, t))
      return l[t] = 4, n[t];
    if (
      // global properties
      h = c.config.globalProperties, ue(h, t)
    )
      return h[t];
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: o, ctx: s } = e;
    return ds(o, t) ? (o[t] = n, !0) : r !== he && ue(r, t) ? (r[t] = n, !0) : ue(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (s[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: o, props: s, type: l }
  }, a) {
    let c;
    return !!(n[a] || e !== he && a[0] !== "$" && ue(e, a) || ds(t, a) || ue(s, a) || ue(r, a) || ue(Zn, a) || ue(o.config.globalProperties, a) || (c = l.__cssModules) && c[a]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : ue(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function Qi(e) {
  return q(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let Ps = !0;
function vd(e) {
  const t = Da(e), n = e.proxy, r = e.ctx;
  Ps = !1, t.beforeCreate && el(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: s,
    methods: l,
    watch: a,
    provide: c,
    inject: f,
    // lifecycle
    created: d,
    beforeMount: h,
    mounted: w,
    beforeUpdate: y,
    updated: I,
    activated: E,
    deactivated: A,
    beforeDestroy: z,
    beforeUnmount: C,
    destroyed: O,
    unmounted: _,
    render: D,
    renderTracked: j,
    renderTriggered: U,
    errorCaptured: K,
    serverPrefetch: L,
    // public API
    expose: ee,
    inheritAttrs: ce,
    // assets
    components: Y,
    directives: me,
    filters: Ce
  } = t;
  if (f && wd(f, r, null), l)
    for (const J in l) {
      const se = l[J];
      X(se) && (r[J] = se.bind(n));
    }
  if (o) {
    const J = o.call(n, n);
    de(J) && (e.data = /* @__PURE__ */ yo(J));
  }
  if (Ps = !0, s)
    for (const J in s) {
      const se = s[J], tt = X(se) ? se.bind(n, n) : X(se.get) ? se.get.bind(n, n) : ft, De = !X(se) && X(se.set) ? se.set.bind(n) : ft, je = W({
        get: tt,
        set: De
      });
      Object.defineProperty(r, J, {
        enumerable: !0,
        configurable: !0,
        get: () => je.value,
        set: (ke) => je.value = ke
      });
    }
  if (a)
    for (const J in a)
      Pa(a[J], r, n, J);
  if (c) {
    const J = X(c) ? c.call(n) : c;
    Reflect.ownKeys(J).forEach((se) => {
      Qf(se, J[se]);
    });
  }
  d && el(d, e, "c");
  function G(J, se) {
    q(se) ? se.forEach((tt) => J(tt.bind(n))) : se && J(se.bind(n));
  }
  if (G(ad, h), G(Xr, w), G(ud, y), G(cd, I), G(sd, E), G(id, A), G(pd, K), G(gd, j), G(dd, U), G(Nn, C), G(Oa, _), G(fd, L), q(ee))
    if (ee.length) {
      const J = e.exposed || (e.exposed = {});
      ee.forEach((se) => {
        Object.defineProperty(J, se, {
          get: () => n[se],
          set: (tt) => n[se] = tt,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  D && e.render === ft && (e.render = D), ce != null && (e.inheritAttrs = ce), Y && (e.components = Y), me && (e.directives = me), L && Ea(e);
}
function wd(e, t, n = ft) {
  q(e) && (e = Ds(e));
  for (const r in e) {
    const o = e[r];
    let s;
    de(o) ? "default" in o ? s = Gr(
      o.from || r,
      o.default,
      !0
    ) : s = Gr(o.from || r) : s = Gr(o), /* @__PURE__ */ Oe(s) ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (l) => s.value = l
    }) : t[r] = s;
  }
}
function el(e, t, n) {
  Qe(
    q(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Pa(e, t, n, r) {
  let o = r.includes(".") ? Ma(n, r) : () => n[r];
  if (be(e)) {
    const s = t[e];
    X(s) && we(o, s);
  } else if (X(e))
    we(o, e.bind(n));
  else if (de(e))
    if (q(e))
      e.forEach((s) => Pa(s, t, n, r));
    else {
      const s = X(e.handler) ? e.handler.bind(n) : t[e.handler];
      X(s) && we(o, s, e);
    }
}
function Da(e) {
  const t = e.type, { mixins: n, extends: r } = t, {
    mixins: o,
    optionsCache: s,
    config: { optionMergeStrategies: l }
  } = e.appContext, a = s.get(t);
  let c;
  return a ? c = a : !o.length && !n && !r ? c = t : (c = {}, o.length && o.forEach(
    (f) => oo(c, f, l, !0)
  ), oo(c, t, l)), de(t) && s.set(t, c), c;
}
function oo(e, t, n, r = !1) {
  const { mixins: o, extends: s } = t;
  s && oo(e, s, n, !0), o && o.forEach(
    (l) => oo(e, l, n, !0)
  );
  for (const l in t)
    if (!(r && l === "expose")) {
      const a = yd[l] || n && n[l];
      e[l] = a ? a(e[l], t[l]) : t[l];
    }
  return e;
}
const yd = {
  data: tl,
  props: nl,
  emits: nl,
  // objects
  methods: $n,
  computed: $n,
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
  components: $n,
  directives: $n,
  // watch
  watch: _d,
  // provide / inject
  provide: tl,
  inject: bd
};
function tl(e, t) {
  return t ? e ? function() {
    return Pe(
      X(e) ? e.call(this, this) : e,
      X(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function bd(e, t) {
  return $n(Ds(e), Ds(t));
}
function Ds(e) {
  if (q(e)) {
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
function $n(e, t) {
  return e ? Pe(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function nl(e, t) {
  return e ? q(e) && q(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Pe(
    /* @__PURE__ */ Object.create(null),
    Qi(e),
    Qi(t ?? {})
  ) : t;
}
function _d(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Pe(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = Fe(e[r], t[r]);
  return n;
}
function ka() {
  return {
    app: null,
    config: {
      isNativeTag: Gl,
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
let Sd = 0;
function xd(e, t) {
  return function(r, o = null) {
    X(r) || (r = Pe({}, r)), o != null && !de(o) && (o = null);
    const s = ka(), l = /* @__PURE__ */ new WeakSet(), a = [];
    let c = !1;
    const f = s.app = {
      _uid: Sd++,
      _component: r,
      _props: o,
      _container: null,
      _context: s,
      _instance: null,
      version: tg,
      get config() {
        return s.config;
      },
      set config(d) {
      },
      use(d, ...h) {
        return l.has(d) || (d && X(d.install) ? (l.add(d), d.install(f, ...h)) : X(d) && (l.add(d), d(f, ...h))), f;
      },
      mixin(d) {
        return s.mixins.includes(d) || s.mixins.push(d), f;
      },
      component(d, h) {
        return h ? (s.components[d] = h, f) : s.components[d];
      },
      directive(d, h) {
        return h ? (s.directives[d] = h, f) : s.directives[d];
      },
      mount(d, h, w) {
        if (!c) {
          const y = f._ceVNode || St(r, o);
          return y.appContext = s, w === !0 ? w = "svg" : w === !1 && (w = void 0), e(y, d, w), c = !0, f._container = d, d.__vue_app__ = f, ii(y.component);
        }
      },
      onUnmount(d) {
        a.push(d);
      },
      unmount() {
        c && (Qe(
          a,
          f._instance,
          16
        ), e(null, f._container), delete f._container.__vue_app__);
      },
      provide(d, h) {
        return s.provides[d] = h, f;
      },
      runWithContext(d) {
        const h = yn;
        yn = f;
        try {
          return d();
        } finally {
          yn = h;
        }
      }
    };
    return f;
  };
}
let yn = null;
const Rd = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Ye(t)}Modifiers`] || e[`${Qt(t)}Modifiers`];
function Cd(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || he;
  let o = n;
  const s = t.startsWith("update:"), l = s && Rd(r, t.slice(7));
  l && (l.trim && (o = n.map((d) => be(d) ? d.trim() : d)), l.number && (o = o.map(gf)));
  let a, c = r[a = ss(t)] || // also try camelCase event handler (#2249)
  r[a = ss(Ye(t))];
  !c && s && (c = r[a = ss(Qt(t))]), c && Qe(
    c,
    e,
    6,
    o
  );
  const f = r[a + "Once"];
  if (f) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[a])
      return;
    e.emitted[a] = !0, Qe(
      f,
      e,
      6,
      o
    );
  }
}
const Md = /* @__PURE__ */ new WeakMap();
function Ta(e, t, n = !1) {
  const r = n ? Md : t.emitsCache, o = r.get(e);
  if (o !== void 0)
    return o;
  const s = e.emits;
  let l = {}, a = !1;
  if (!X(e)) {
    const c = (f) => {
      const d = Ta(f, t, !0);
      d && (a = !0, Pe(l, d));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !s && !a ? (de(e) && r.set(e, null), null) : (q(s) ? s.forEach((c) => l[c] = null) : Pe(l, s), de(e) && r.set(e, l), l);
}
function xo(e, t) {
  return !e || !go(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), ue(e, t[0].toLowerCase() + t.slice(1)) || ue(e, Qt(t)) || ue(e, t));
}
function rl(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: o,
    propsOptions: [s],
    slots: l,
    attrs: a,
    emit: c,
    render: f,
    renderCache: d,
    props: h,
    data: w,
    setupState: y,
    ctx: I,
    inheritAttrs: E
  } = e, A = no(e);
  let z, C;
  try {
    if (n.shapeFlag & 4) {
      const _ = o || r, D = _;
      z = at(
        f.call(
          D,
          _,
          d,
          h,
          y,
          w,
          I
        )
      ), C = a;
    } else {
      const _ = t;
      z = at(
        _.length > 1 ? _(
          h,
          { attrs: a, slots: l, emit: c }
        ) : _(
          h,
          null
        )
      ), C = t.props ? a : Id(a);
    }
  } catch (_) {
    Xt.length = 0, bo(_, e, 1), z = St(Mt);
  }
  let O = z;
  if (C && E !== !1) {
    const _ = Object.keys(C), { shapeFlag: D } = O;
    _.length && D & 7 && (s && _.some(po) && (C = Ed(
      C,
      s
    )), O = Sn(O, C, !1, !0));
  }
  if (n.dirs && (O = Sn(O, null, !1, !0), O.dirs = O.dirs ? O.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const _ = _o(O.type) && Ia(O) || O;
    ni(_, n.transition);
  }
  return z = O, no(A), z;
}
const Id = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || go(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Ed = (e, t) => {
  const n = {};
  for (const r in e)
    (!po(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
  return n;
};
function Ad(e, t, n) {
  const { props: r, children: o, component: s } = e, { props: l, children: a, patchFlag: c } = t, f = s.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return r ? ol(r, l, f) : !!l;
    if (c & 8) {
      const d = t.dynamicProps;
      for (let h = 0; h < d.length; h++) {
        const w = d[h];
        if (Fa(l, r, w) && !xo(f, w))
          return !0;
      }
    }
  } else
    return (o || a) && (!a || !a.$stable) ? !0 : r === l ? !1 : r ? l ? ol(r, l, f) : !0 : !!l;
  return !1;
}
function ol(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < r.length; o++) {
    const s = r[o];
    if (Fa(t, e, s) && !xo(n, s))
      return !0;
  }
  return !1;
}
function Fa(e, t, n) {
  const r = e[n], o = t[n];
  return n === "style" && de(r) && de(o) ? !vo(r, o) : r !== o;
}
function Od({ vnode: e, parent: t, suspense: n }, r) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.suspense.vnode.el = o.el = r, e = o), o === e)
      (e = t.vnode).el = r, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = r);
}
const Ha = {}, La = () => Object.create(Ha), ja = (e) => Object.getPrototypeOf(e) === Ha;
function Pd(e, t, n, r = !1) {
  const o = {}, s = La();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), za(e, t, o, s);
  for (const l in e.propsOptions[0])
    l in o || (o[l] = void 0);
  n ? e.props = r ? o : /* @__PURE__ */ Kf(o) : e.type.props ? e.props = o : e.props = s, e.attrs = s;
}
function Dd(e, t, n, r) {
  const {
    props: o,
    attrs: s,
    vnode: { patchFlag: l }
  } = e, a = /* @__PURE__ */ ae(o), [c] = e.propsOptions;
  let f = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (r || l > 0) && !(l & 16)
  ) {
    if (l & 8) {
      const d = e.vnode.dynamicProps;
      for (let h = 0; h < d.length; h++) {
        let w = d[h];
        if (xo(e.emitsOptions, w))
          continue;
        const y = t[w];
        if (c)
          if (ue(s, w))
            y !== s[w] && (s[w] = y, f = !0);
          else {
            const I = Ye(w);
            o[I] = ks(
              c,
              a,
              I,
              y,
              e,
              !1
            );
          }
        else
          y !== s[w] && (s[w] = y, f = !0);
      }
    }
  } else {
    za(e, t, o, s) && (f = !0);
    let d;
    for (const h in a)
      (!t || // for camelCase
      !ue(t, h) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((d = Qt(h)) === h || !ue(t, d))) && (c ? n && // for camelCase
      (n[h] !== void 0 || // for kebab-case
      n[d] !== void 0) && (o[h] = ks(
        c,
        a,
        h,
        void 0,
        e,
        !0
      )) : delete o[h]);
    if (s !== a)
      for (const h in s)
        (!t || !ue(t, h)) && (delete s[h], f = !0);
  }
  f && _t(e.attrs, "set", "");
}
function za(e, t, n, r) {
  const [o, s] = e.propsOptions;
  let l = !1, a;
  if (t)
    for (let c in t) {
      if (Un(c))
        continue;
      const f = t[c];
      let d;
      o && ue(o, d = Ye(c)) ? !s || !s.includes(d) ? n[d] = f : (a || (a = {}))[d] = f : xo(e.emitsOptions, c) || (!(c in r) || f !== r[c]) && (r[c] = f, l = !0);
    }
  if (s) {
    const c = /* @__PURE__ */ ae(n), f = a || he;
    for (let d = 0; d < s.length; d++) {
      const h = s[d];
      n[h] = ks(
        o,
        c,
        h,
        f[h],
        e,
        !ue(f, h)
      );
    }
  }
  return l;
}
function ks(e, t, n, r, o, s) {
  const l = e[n];
  if (l != null) {
    const a = ue(l, "default");
    if (a && r === void 0) {
      const c = l.default;
      if (l.type !== Function && !l.skipFactory && X(c)) {
        const { propsDefaults: f } = o;
        if (n in f)
          r = f[n];
        else {
          const d = fr(o);
          r = f[n] = c.call(
            null,
            t
          ), d();
        }
      } else
        r = c;
      o.ce && o.ce._setProp(n, r);
    }
    l[
      0
      /* shouldCast */
    ] && (s && !a ? r = !1 : l[
      1
      /* shouldCastTrue */
    ] && (r === "" || r === Qt(n)) && (r = !0));
  }
  return r;
}
const kd = /* @__PURE__ */ new WeakMap();
function Ka(e, t, n = !1) {
  const r = n ? kd : t.propsCache, o = r.get(e);
  if (o)
    return o;
  const s = e.props, l = {}, a = [];
  let c = !1;
  if (!X(e)) {
    const d = (h) => {
      c = !0;
      const [w, y] = Ka(h, t, !0);
      Pe(l, w), y && a.push(...y);
    };
    !n && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  if (!s && !c)
    return de(e) && r.set(e, vn), vn;
  if (q(s))
    for (let d = 0; d < s.length; d++) {
      const h = Ye(s[d]);
      sl(h) && (l[h] = he);
    }
  else if (s)
    for (const d in s) {
      const h = Ye(d);
      if (sl(h)) {
        const w = s[d], y = l[h] = q(w) || X(w) ? { type: w } : Pe({}, w), I = y.type;
        let E = !1, A = !0;
        if (q(I))
          for (let z = 0; z < I.length; ++z) {
            const C = I[z], O = X(C) && C.name;
            if (O === "Boolean") {
              E = !0;
              break;
            } else O === "String" && (A = !1);
          }
        else
          E = X(I) && I.name === "Boolean";
        y[
          0
          /* shouldCast */
        ] = E, y[
          1
          /* shouldCastTrue */
        ] = A, (E || ue(y, "default")) && a.push(h);
      }
    }
  const f = [l, a];
  return de(e) && r.set(e, f), f;
}
function sl(e) {
  return e[0] !== "$" && !Un(e);
}
const oi = (e) => e === "_" || e === "_ctx" || e === "$stable", si = (e) => q(e) ? e.map(at) : [at(e)], Td = (e, t, n) => {
  if (t._n)
    return t;
  const r = Jf((...o) => si(t(...o)), n);
  return r._c = !1, r;
}, Va = (e, t, n) => {
  const r = e._ctx;
  for (const o in e) {
    if (oi(o)) continue;
    const s = e[o];
    if (X(s))
      t[o] = Td(o, s, r);
    else if (s != null) {
      const l = si(s);
      t[o] = () => l;
    }
  }
}, Ba = (e, t) => {
  const n = si(t);
  e.slots.default = () => n;
}, Na = (e, t, n) => {
  for (const r in t)
    (n || !oi(r)) && (e[r] = t[r]);
}, Fd = (e, t, n) => {
  const r = e.slots = La();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (Na(r, t, n), n && Ql(r, "_", o, !0)) : Va(t, r);
  } else t && Ba(e, t);
}, Hd = (e, t, n) => {
  const { vnode: r, slots: o } = e;
  let s = !0, l = he;
  if (r.shapeFlag & 32) {
    const a = t._;
    a ? n && a === 1 ? s = !1 : Na(o, t, n) : (s = !t.$stable, Va(t, o)), l = t;
  } else t && (Ba(e, t), l = { default: 1 });
  if (s)
    for (const a in o)
      !oi(a) && l[a] == null && delete o[a];
}, Ve = Vd;
function Ld(e) {
  return jd(e);
}
function jd(e, t) {
  const n = mo();
  n.__VUE__ = !0;
  const {
    insert: r,
    remove: o,
    patchProp: s,
    createElement: l,
    createText: a,
    createComment: c,
    setText: f,
    setElementText: d,
    parentNode: h,
    nextSibling: w,
    setScopeId: y = ft,
    insertStaticContent: I
  } = e, E = (p, m, b, M = null, x = null, S = null, F = void 0, T = null, P = !!m.dynamicChildren) => {
    if (p === m)
      return;
    p && !Vn(p, m) && (M = At(p), ke(p, x, S, !0), p = null), m.patchFlag === -2 && (P = !1, m.dynamicChildren = null);
    const { type: R, ref: N, shapeFlag: H } = m;
    switch (R) {
      case Ro:
        A(p, m, b, M);
        break;
      case Mt:
        z(p, m, b, M);
        break;
      case ps:
        p == null && C(m, b, M, F);
        break;
      case Ee:
        Y(
          p,
          m,
          b,
          M,
          x,
          S,
          F,
          T,
          P
        );
        break;
      default:
        H & 1 ? D(
          p,
          m,
          b,
          M,
          x,
          S,
          F,
          T,
          P
        ) : H & 6 ? me(
          p,
          m,
          b,
          M,
          x,
          S,
          F,
          T,
          P
        ) : (H & 64 || H & 128) && R.process(
          p,
          m,
          b,
          M,
          x,
          S,
          F,
          T,
          P,
          zt
        );
    }
    N != null && x ? Xn(N, p && p.ref, S, m || p, !m) : N == null && p && p.ref != null && Xn(p.ref, null, S, p, !0);
  }, A = (p, m, b, M) => {
    if (p == null)
      r(
        m.el = a(m.children),
        b,
        M
      );
    else {
      const x = m.el = p.el;
      m.children !== p.children && f(x, m.children);
    }
  }, z = (p, m, b, M) => {
    p == null ? r(
      m.el = c(m.children || ""),
      b,
      M
    ) : m.el = p.el;
  }, C = (p, m, b, M) => {
    [p.el, p.anchor] = I(
      p.children,
      m,
      b,
      M,
      p.el,
      p.anchor
    );
  }, O = ({ el: p, anchor: m }, b, M) => {
    let x;
    for (; p && p !== m; )
      x = w(p), r(p, b, M), p = x;
    r(m, b, M);
  }, _ = ({ el: p, anchor: m }) => {
    let b;
    for (; p && p !== m; )
      b = w(p), o(p), p = b;
    o(m);
  }, D = (p, m, b, M, x, S, F, T, P) => {
    if (m.type === "svg" ? F = "svg" : m.type === "math" && (F = "mathml"), p == null)
      j(
        m,
        b,
        M,
        x,
        S,
        F,
        T,
        P
      );
    else {
      const R = p.el && p.el._isVueCE ? p.el : null;
      try {
        R && R._beginPatch(), L(
          p,
          m,
          x,
          S,
          F,
          T,
          P
        );
      } finally {
        R && R._endPatch();
      }
    }
  }, j = (p, m, b, M, x, S, F, T) => {
    let P, R;
    const { props: N, shapeFlag: H, transition: V, dirs: $ } = p;
    if (P = p.el = l(
      p.type,
      S,
      N && N.is,
      N
    ), H & 8 ? d(P, p.children) : H & 16 && K(
      p.children,
      P,
      null,
      M,
      x,
      gs(p, S),
      F,
      T
    ), $ && Nt(p, null, M, "created"), U(P, p, p.scopeId, F, M), N) {
      for (const le in N)
        le !== "value" && !Un(le) && s(P, le, null, N[le], S, M);
      "value" in N && s(P, "value", null, N.value, S), (R = N.onVnodeBeforeMount) && rt(R, M, p);
    }
    $ && Nt(p, null, M, "beforeMount");
    const Q = zd(x, V);
    Q && V.beforeEnter(P), r(P, m, b), ((R = N && N.onVnodeMounted) || Q || $) && Ve(() => {
      try {
        R && rt(R, M, p), Q && V.enter(P), $ && Nt(p, null, M, "mounted");
      } finally {
      }
    }, x);
  }, U = (p, m, b, M, x) => {
    if (b && y(p, b), M)
      for (let S = 0; S < M.length; S++)
        y(p, M[S]);
    if (x) {
      let S = x.subTree;
      if (m === S || qa(S.type) && (S.ssContent === m || S.ssFallback === m)) {
        const F = x.vnode;
        U(
          p,
          F,
          F.scopeId,
          F.slotScopeIds,
          x.parent
        );
      }
    }
  }, K = (p, m, b, M, x, S, F, T, P = 0) => {
    for (let R = P; R < p.length; R++) {
      const N = p[R] = T ? bt(p[R]) : at(p[R]);
      E(
        null,
        N,
        m,
        b,
        M,
        x,
        S,
        F,
        T
      );
    }
  }, L = (p, m, b, M, x, S, F) => {
    const T = m.el = p.el;
    let { patchFlag: P, dynamicChildren: R, dirs: N } = m;
    P |= p.patchFlag & 16;
    const H = p.props || he, V = m.props || he;
    let $;
    if (b && $t(b, !1), ($ = V.onVnodeBeforeUpdate) && rt($, b, m, p), N && Nt(m, p, b, "beforeUpdate"), b && $t(b, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    R && (!p.dynamicChildren || p.dynamicChildren.length !== R.length) && (P = 0, F = !1, R = null), (H.innerHTML && V.innerHTML == null || H.textContent && V.textContent == null) && d(T, ""), R ? ee(
      p.dynamicChildren,
      R,
      T,
      b,
      M,
      gs(m, x),
      S
    ) : F || se(
      p,
      m,
      T,
      null,
      b,
      M,
      gs(m, x),
      S,
      !1
    ), P > 0) {
      if (P & 16)
        ce(T, H, V, b, x);
      else if (P & 2 && H.class !== V.class && s(T, "class", null, V.class, x), P & 4 && s(T, "style", H.style, V.style, x), P & 8) {
        const Q = m.dynamicProps;
        for (let le = 0; le < Q.length; le++) {
          const ie = Q[le], ve = H[ie], Se = V[ie];
          (Se !== ve || ie === "value") && s(T, ie, ve, Se, x, b);
        }
      }
      P & 1 && p.children !== m.children && d(T, m.children);
    } else !F && R == null && ce(T, H, V, b, x);
    (($ = V.onVnodeUpdated) || N) && Ve(() => {
      $ && rt($, b, m, p), N && Nt(m, p, b, "updated");
    }, M);
  }, ee = (p, m, b, M, x, S, F) => {
    for (let T = 0; T < m.length; T++) {
      const P = p[T], R = m[T], N = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        P.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (P.type === Ee || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Vn(P, R) || // - In the case of a component, it could contain anything.
        P.shapeFlag & 198) ? h(P.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          b
        )
      );
      E(
        P,
        R,
        N,
        null,
        M,
        x,
        S,
        F,
        !0
      );
    }
  }, ce = (p, m, b, M, x) => {
    if (m !== b) {
      if (m !== he)
        for (const S in m)
          !Un(S) && !(S in b) && s(
            p,
            S,
            m[S],
            null,
            x,
            M
          );
      for (const S in b) {
        if (Un(S)) continue;
        const F = b[S], T = m[S];
        F !== T && S !== "value" && s(p, S, T, F, x, M);
      }
      "value" in b && s(p, "value", m.value, b.value, x);
    }
  }, Y = (p, m, b, M, x, S, F, T, P) => {
    const R = m.el = p ? p.el : a(""), N = m.anchor = p ? p.anchor : a("");
    let { patchFlag: H, dynamicChildren: V, slotScopeIds: $ } = m;
    $ && (T = T ? T.concat($) : $), p == null ? (r(R, b, M), r(N, b, M), K(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      m.children || [],
      b,
      N,
      x,
      S,
      F,
      T,
      P
    )) : H > 0 && H & 64 && V && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    p.dynamicChildren && p.dynamicChildren.length === V.length ? (ee(
      p.dynamicChildren,
      V,
      b,
      x,
      S,
      F,
      T
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (m.key != null || x && m === x.subTree) && $a(
      p,
      m,
      !0
      /* shallow */
    )) : se(
      p,
      m,
      b,
      N,
      x,
      S,
      F,
      T,
      P
    );
  }, me = (p, m, b, M, x, S, F, T, P) => {
    m.slotScopeIds = T, p == null ? m.shapeFlag & 512 ? x.ctx.activate(
      m,
      b,
      M,
      F,
      P
    ) : Ce(
      m,
      b,
      M,
      x,
      S,
      F,
      P
    ) : ye(p, m, P);
  }, Ce = (p, m, b, M, x, S, F) => {
    const T = p.component = Gd(
      p,
      M,
      x
    );
    if (ri(p) && (T.ctx.renderer = zt), Yd(T, !1, F), T.asyncDep) {
      if (x && x.registerDep(T, G, F), !p.el) {
        const P = T.subTree = St(Mt);
        z(null, P, m, b), p.placeholder = P.el;
      }
    } else
      G(
        T,
        p,
        m,
        b,
        x,
        S,
        F
      );
  }, ye = (p, m, b) => {
    const M = m.component = p.component;
    if (Ad(p, m, b))
      if (M.asyncDep && !M.asyncResolved) {
        J(M, m, b);
        return;
      } else
        M.next = m, M.update();
    else
      m.el = p.el, M.vnode = m;
  }, G = (p, m, b, M, x, S, F) => {
    const T = () => {
      if (p.isMounted) {
        let { next: H, bu: V, u: $, parent: Q, vnode: le } = p;
        {
          const ze = Wa(p);
          if (ze) {
            H && (H.el = le.el, J(p, H, F)), ze.asyncDep.then(() => {
              Ve(() => {
                p.isUnmounted || R();
              }, x);
            });
            return;
          }
        }
        let ie = H, ve;
        $t(p, !1), H ? (H.el = le.el, J(p, H, F)) : H = le, V && is(V), (ve = H.props && H.props.onVnodeBeforeUpdate) && rt(ve, Q, H, le), $t(p, !0);
        const Se = rl(p), Be = p.subTree;
        p.subTree = Se, E(
          Be,
          Se,
          // parent may have changed if it's in a teleport
          h(Be.el),
          // anchor may have changed if it's in a fragment
          At(Be),
          p,
          x,
          S
        ), H.el = Se.el, ie === null && Od(p, Se.el), $ && Ve($, x), (ve = H.props && H.props.onVnodeUpdated) && Ve(
          () => rt(ve, Q, H, le),
          x
        );
      } else {
        let H;
        const { el: V, props: $ } = m, { bm: Q, m: le, parent: ie, root: ve, type: Se } = p, Be = Yn(m);
        $t(p, !1), Q && is(Q), !Be && (H = $ && $.onVnodeBeforeMount) && rt(H, ie, m), $t(p, !0);
        {
          ve.ce && ve.ce._hasShadowRoot() && ve.ce._injectChildStyle(
            Se,
            p.parent ? p.parent.type : void 0
          );
          const ze = p.subTree = rl(p);
          E(
            null,
            ze,
            b,
            M,
            p,
            x,
            S
          ), m.el = ze.el;
        }
        if (le && Ve(le, x), !Be && (H = $ && $.onVnodeMounted)) {
          const ze = m;
          Ve(
            () => rt(H, ie, ze),
            x
          );
        }
        (m.shapeFlag & 256 || ie && Yn(ie.vnode) && ie.vnode.shapeFlag & 256) && p.a && Ve(p.a, x), p.isMounted = !0, m = b = M = null;
      }
    };
    p.scope.on();
    const P = p.effect = new oa(T);
    p.scope.off();
    const R = p.update = P.run.bind(P), N = p.job = P.runIfDirty.bind(P);
    N.i = p, N.id = p.uid, P.scheduler = () => ti(N), $t(p, !0), R();
  }, J = (p, m, b) => {
    m.component = p;
    const M = p.vnode.props;
    p.vnode = m, p.next = null, Dd(p, m.props, M, b), Hd(p, m.children, b), xt(), Yi(p), Rt();
  }, se = (p, m, b, M, x, S, F, T, P = !1) => {
    const R = p && p.children, N = p ? p.shapeFlag : 0, H = m.children, { patchFlag: V, shapeFlag: $ } = m;
    if (V > 0) {
      if (V & 128) {
        De(
          R,
          H,
          b,
          M,
          x,
          S,
          F,
          T,
          P
        );
        return;
      } else if (V & 256) {
        tt(
          R,
          H,
          b,
          M,
          x,
          S,
          F,
          T,
          P
        );
        return;
      }
    }
    $ & 8 ? (N & 16 && Te(R, x, S), H !== R && d(b, H)) : N & 16 ? $ & 16 ? De(
      R,
      H,
      b,
      M,
      x,
      S,
      F,
      T,
      P
    ) : Te(R, x, S, !0) : (N & 8 && d(b, ""), $ & 16 && K(
      H,
      b,
      M,
      x,
      S,
      F,
      T,
      P
    ));
  }, tt = (p, m, b, M, x, S, F, T, P) => {
    p = p || vn, m = m || vn;
    const R = p.length, N = m.length, H = Math.min(R, N);
    let V;
    for (V = 0; V < H; V++) {
      const $ = m[V] = P ? bt(m[V]) : at(m[V]);
      E(
        p[V],
        $,
        b,
        null,
        x,
        S,
        F,
        T,
        P
      );
    }
    R > N ? Te(
      p,
      x,
      S,
      !0,
      !1,
      H
    ) : K(
      m,
      b,
      M,
      x,
      S,
      F,
      T,
      P,
      H
    );
  }, De = (p, m, b, M, x, S, F, T, P) => {
    let R = 0;
    const N = m.length;
    let H = p.length - 1, V = N - 1;
    for (; R <= H && R <= V; ) {
      const $ = p[R], Q = m[R] = P ? bt(m[R]) : at(m[R]);
      if (Vn($, Q))
        E(
          $,
          Q,
          b,
          null,
          x,
          S,
          F,
          T,
          P
        );
      else
        break;
      R++;
    }
    for (; R <= H && R <= V; ) {
      const $ = p[H], Q = m[V] = P ? bt(m[V]) : at(m[V]);
      if (Vn($, Q))
        E(
          $,
          Q,
          b,
          null,
          x,
          S,
          F,
          T,
          P
        );
      else
        break;
      H--, V--;
    }
    if (R > H) {
      if (R <= V) {
        const $ = V + 1, Q = $ < N ? m[$].el : M;
        for (; R <= V; )
          E(
            null,
            m[R] = P ? bt(m[R]) : at(m[R]),
            b,
            Q,
            x,
            S,
            F,
            T,
            P
          ), R++;
      }
    } else if (R > V)
      for (; R <= H; )
        ke(p[R], x, S, !0), R++;
    else {
      const $ = R, Q = R, le = /* @__PURE__ */ new Map();
      for (R = Q; R <= V; R++) {
        const Me = m[R] = P ? bt(m[R]) : at(m[R]);
        Me.key != null && le.set(Me.key, R);
      }
      let ie, ve = 0;
      const Se = V - Q + 1;
      let Be = !1, ze = 0;
      const Kt = new Array(Se);
      for (R = 0; R < Se; R++) Kt[R] = 0;
      for (R = $; R <= H; R++) {
        const Me = p[R];
        if (ve >= Se) {
          ke(Me, x, S, !0);
          continue;
        }
        let Ie;
        if (Me.key != null)
          Ie = le.get(Me.key);
        else
          for (ie = Q; ie <= V; ie++)
            if (Kt[ie - Q] === 0 && Vn(Me, m[ie])) {
              Ie = ie;
              break;
            }
        Ie === void 0 ? ke(Me, x, S, !0) : (Kt[Ie - Q] = R + 1, Ie >= ze ? ze = Ie : Be = !0, E(
          Me,
          m[Ie],
          b,
          null,
          x,
          S,
          F,
          T,
          P
        ), ve++);
      }
      const yr = Be ? Kd(Kt) : vn;
      for (ie = yr.length - 1, R = Se - 1; R >= 0; R--) {
        const Me = Q + R, Ie = m[Me], Ot = m[Me + 1], nt = Me + 1 < N ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Ot.el || Ua(Ot)
        ) : M;
        Kt[R] === 0 ? E(
          null,
          Ie,
          b,
          nt,
          x,
          S,
          F,
          T,
          P
        ) : Be && (ie < 0 || R !== yr[ie] ? je(Ie, b, nt, 2) : ie--);
      }
    }
  }, je = (p, m, b, M, x = null) => {
    const { el: S, type: F, transition: T, children: P, shapeFlag: R } = p;
    if (R & 6) {
      je(p.component.subTree, m, b, M);
      return;
    }
    if (R & 128) {
      p.suspense.move(m, b, M);
      return;
    }
    if (R & 64) {
      F.move(p, m, b, zt);
      return;
    }
    if (F === Ee) {
      r(S, m, b);
      for (let H = 0; H < P.length; H++)
        je(P[H], m, b, M);
      r(p.anchor, m, b);
      return;
    }
    if (F === ps) {
      O(p, m, b);
      return;
    }
    if (M !== 2 && R & 1 && T)
      if (M === 0)
        T.persisted && !S[fs] ? r(S, m, b) : (T.beforeEnter(S), r(S, m, b), Ve(() => T.enter(S), x));
      else {
        const { leave: H, delayLeave: V, afterLeave: $ } = T, Q = () => {
          p.ctx.isUnmounted ? o(S) : r(S, m, b);
        }, le = () => {
          const ie = S._isLeaving || !!S[fs];
          S._isLeaving && S[fs](
            !0
            /* cancelled */
          ), T.persisted && !ie ? Q() : H(S, () => {
            Q(), $ && $();
          });
        };
        V ? V(S, Q, le) : le();
      }
    else
      r(S, m, b);
  }, ke = (p, m, b, M = !1, x = !1) => {
    const {
      type: S,
      props: F,
      ref: T,
      children: P,
      dynamicChildren: R,
      shapeFlag: N,
      patchFlag: H,
      dirs: V,
      cacheIndex: $,
      memo: Q
    } = p;
    if (H === -2 && (x = !1), T != null && (xt(), Xn(T, null, b, p, !0), Rt()), $ != null && (m.renderCache[$] = void 0), N & 256) {
      m.ctx.deactivate(p);
      return;
    }
    const le = N & 1 && V, ie = !Yn(p);
    let ve;
    if (ie && (ve = F && F.onVnodeBeforeUnmount) && rt(ve, m, p), N & 6)
      fe(p.component, b, M);
    else {
      if (N & 128) {
        p.suspense.unmount(b, M);
        return;
      }
      le && Nt(p, null, m, "beforeUnmount"), N & 64 ? p.type.remove(
        p,
        m,
        b,
        zt,
        M
      ) : R && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !R.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (S !== Ee || H > 0 && H & 64) ? Te(
        R,
        m,
        b,
        !1,
        !0
      ) : (S === Ee && H & 384 || !x && N & 16) && Te(P, m, b), M && vr(p);
    }
    const Se = Q != null && $ == null;
    (ie && (ve = F && F.onVnodeUnmounted) || le || Se) && Ve(() => {
      ve && rt(ve, m, p), le && Nt(p, null, m, "unmounted"), Se && (p.el = null);
    }, b);
  }, vr = (p) => {
    const { type: m, el: b, anchor: M, transition: x } = p;
    if (m === Ee) {
      Ho(b, M);
      return;
    }
    if (m === ps) {
      _(p);
      return;
    }
    const S = () => {
      o(b), x && !x.persisted && x.afterLeave && x.afterLeave();
    };
    if (p.shapeFlag & 1 && x && !x.persisted) {
      const { leave: F, delayLeave: T } = x, P = () => F(b, S);
      T ? T(p.el, S, P) : P();
    } else
      S();
  }, Ho = (p, m) => {
    let b;
    for (; p !== m; )
      b = w(p), o(p), p = b;
    o(m);
  }, fe = (p, m, b) => {
    const { bum: M, scope: x, job: S, subTree: F, um: T, m: P, a: R } = p;
    il(P), il(R), M && is(M), x.stop(), S && (S.flags |= 8, ke(F, p, m, b)), T && Ve(T, m), Ve(() => {
      p.isUnmounted = !0;
    }, m);
  }, Te = (p, m, b, M = !1, x = !1, S = 0) => {
    for (let F = S; F < p.length; F++)
      ke(p[F], m, b, M, x);
  }, At = (p) => {
    if (p.shapeFlag & 6)
      return At(p.component.subTree);
    if (p.shapeFlag & 128)
      return p.suspense.next();
    const m = w(p.anchor || p.el), b = m && m[rd];
    return b ? w(b) : m;
  };
  let Cn = !1;
  const wr = (p, m, b) => {
    let M;
    p == null ? m._vnode && (ke(m._vnode, null, null, !0), M = m._vnode.component) : E(
      m._vnode || null,
      p,
      m,
      null,
      null,
      null,
      b
    ), m._vnode = p, Cn || (Cn = !0, Yi(M), Sa(), Cn = !1);
  }, zt = {
    p: E,
    um: ke,
    m: je,
    r: vr,
    mt: Ce,
    mc: K,
    pc: se,
    pbc: ee,
    n: At,
    o: e
  };
  return {
    render: wr,
    hydrate: void 0,
    createApp: xd(wr)
  };
}
function gs({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function $t({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function zd(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function $a(e, t, n = !1) {
  const r = e.children, o = t.children;
  if (q(r) && q(o))
    for (let s = 0; s < r.length; s++) {
      const l = r[s];
      let a = o[s];
      a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = o[s] = bt(o[s]), a.el = l.el), !n && a.patchFlag !== -2 && $a(l, a)), a.type === Ro && (a.patchFlag === -1 && (a = o[s] = bt(a)), a.el = l.el), a.type === Mt && !a.el && (a.el = l.el);
    }
}
function Kd(e) {
  const t = e.slice(), n = [0];
  let r, o, s, l, a;
  const c = e.length;
  for (r = 0; r < c; r++) {
    const f = e[r];
    if (f !== 0) {
      if (o = n[n.length - 1], e[o] < f) {
        t[r] = o, n.push(r);
        continue;
      }
      for (s = 0, l = n.length - 1; s < l; )
        a = s + l >> 1, e[n[a]] < f ? s = a + 1 : l = a;
      f < e[n[s]] && (s > 0 && (t[r] = n[s - 1]), n[s] = r);
    }
  }
  for (s = n.length, l = n[s - 1]; s-- > 0; )
    n[s] = l, l = t[l];
  return n;
}
function Wa(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Wa(t);
}
function il(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function Ua(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? Ua(t.subTree) : null;
}
const qa = (e) => e.__isSuspense;
function Vd(e, t) {
  t && t.pendingBranch ? q(e) ? t.effects.push(...e) : t.effects.push(e) : Zf(e);
}
const Ee = /* @__PURE__ */ Symbol.for("v-fgt"), Ro = /* @__PURE__ */ Symbol.for("v-txt"), Mt = /* @__PURE__ */ Symbol.for("v-cmt"), ps = /* @__PURE__ */ Symbol.for("v-stc"), Xt = [];
let $e = null;
function re(e = !1) {
  Xt.push($e = e ? null : []);
}
function Ga() {
  Xt.pop(), $e = Xt[Xt.length - 1] || null;
}
let rr = 1;
function ll(e, t = !1) {
  rr += e, e < 0 && $e && t && ($e.hasOnce = !0);
}
function Xa(e) {
  return e.dynamicChildren = rr > 0 ? $e || vn : null, Ga(), rr > 0 && $e && $e.push(e), e;
}
function oe(e, t, n, r, o, s) {
  return Xa(
    xe(
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
function Bd(e, t, n, r, o) {
  return Xa(
    St(
      e,
      t,
      n,
      r,
      o,
      !0
    )
  );
}
function Ya(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Vn(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Za = ({ key: e }) => e ?? null, Yr = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? be(e) || /* @__PURE__ */ Oe(e) || X(e) ? { i: ct, r: e, k: t, f: !!n } : e : null);
function xe(e, t = null, n = null, r = 0, o = null, s = e === Ee ? 0 : 1, l = !1, a = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Za(t),
    ref: t && Yr(t),
    scopeId: Ra,
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
    ctx: ct
  };
  return a ? (so(c, n), s & 128 && e.normalize(c)) : n && (c.shapeFlag |= be(n) ? 8 : 16), rr > 0 && // avoid a block node from tracking itself
  !l && // has current parent block
  $e && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && $e.push(c), c;
}
const St = Nd;
function Nd(e, t = null, n = null, r = 0, o = null, s = !1) {
  if ((!e || e === hd) && (e = Mt), Ya(e)) {
    const a = Sn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && so(a, n), rr > 0 && !s && $e && (a.shapeFlag & 6 ? $e[$e.indexOf(e)] = a : $e.push(a)), a.patchFlag = -2, a;
  }
  if (eg(e) && (e = e.__vccOpts), t) {
    t = $d(t);
    let { class: a, style: c } = t;
    a && !be(a) && (t.class = it(a)), de(c) && (/* @__PURE__ */ ei(c) && !q(c) && (c = Pe({}, c)), t.style = st(c));
  }
  const l = be(e) ? 1 : qa(e) ? 128 : _o(e) ? 64 : de(e) ? 4 : X(e) ? 2 : 0;
  return xe(
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
function $d(e) {
  return e ? /* @__PURE__ */ ei(e) || ja(e) ? Pe({}, e) : e : null;
}
function Sn(e, t, n = !1, r = !1) {
  const { props: o, ref: s, patchFlag: l, children: a, transition: c } = e, f = t ? Wd(o || {}, t) : o, d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && Za(f),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && s ? q(s) ? s.concat(Yr(t)) : [s, Yr(t)] : Yr(t)
    ) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: a,
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
    ssContent: e.ssContent && Sn(e.ssContent),
    ssFallback: e.ssFallback && Sn(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && r && ni(
    d,
    c.clone(d)
  ), d;
}
function Ts(e = " ", t = 0) {
  return St(Ro, null, e, t);
}
function Xe(e = "", t = !1) {
  return t ? (re(), Bd(Mt, null, e)) : St(Mt, null, e);
}
function at(e) {
  return e == null || typeof e == "boolean" ? St(Mt) : q(e) ? St(
    Ee,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Ya(e) ? bt(e) : St(Ro, null, String(e));
}
function bt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Sn(e);
}
function so(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (q(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), so(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !ja(t) ? t._ctx = ct : o === 3 && ct && (ct.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (X(t)) {
    if (r & 65) {
      so(e, { default: t });
      return;
    }
    t = { default: t, _ctx: ct }, n = 32;
  } else
    t = String(t), r & 64 ? (n = 16, t = [Ts(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function Wd(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === "class")
        t.class !== r.class && (t.class = it([t.class, r.class]));
      else if (o === "style")
        t.style = st([t.style, r.style]);
      else if (go(o)) {
        const s = t[o], l = r[o];
        l && s !== l && !(q(s) && s.includes(l)) ? t[o] = s ? [].concat(s, l) : l : l == null && s == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !po(o) && (t[o] = l);
      } else o !== "" && (t[o] = r[o]);
  }
  return t;
}
function rt(e, t, n, r = null) {
  Qe(e, t, 7, [
    n,
    r
  ]);
}
const Ud = ka();
let qd = 0;
function Gd(e, t, n) {
  const r = e.type, o = (t ? t.appContext : e.appContext) || Ud, s = {
    uid: qd++,
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
    scope: new _f(
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
    propsOptions: Ka(r, o),
    emitsOptions: Ta(r, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: he,
    // inheritAttrs
    inheritAttrs: r.inheritAttrs,
    // state
    ctx: he,
    data: he,
    props: he,
    attrs: he,
    slots: he,
    refs: he,
    setupState: he,
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
  return s.ctx = { _: s }, s.root = t ? t.root : s, s.emit = Cd.bind(null, s), e.ce && e.ce(s), s;
}
let Le = null;
const Xd = () => Le || ct;
let io, or;
{
  const e = mo(), t = (n, r) => {
    let o;
    return (o = e[n]) || (o = e[n] = []), o.push(r), (s) => {
      o.length > 1 ? o.forEach((l) => l(s)) : o[0](s);
    };
  };
  io = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Le = n
  ), or = t(
    "__VUE_SSR_SETTERS__",
    (n) => sr = n
  );
}
const fr = (e) => {
  const t = Le;
  return io(e), e.scope.on(), () => {
    e.scope.off(), io(t);
  };
}, al = () => {
  Le && Le.scope.off(), io(null);
};
function Ja(e) {
  return e.vnode.shapeFlag & 4;
}
let sr = !1;
function Yd(e, t = !1, n = !1) {
  t && or(t);
  const { props: r, children: o } = e.vnode, s = Ja(e);
  Pd(e, r, s, t), Fd(e, o, n || t);
  const l = s ? Zd(e, t) : void 0;
  return t && or(!1), l;
}
function Zd(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, md);
  const { setup: r } = n;
  if (r) {
    xt();
    const o = e.setupContext = r.length > 1 ? Qd(e) : null, s = fr(e), l = cr(
      r,
      e,
      0,
      [
        e.props,
        o
      ]
    ), a = Xl(l);
    if (Rt(), s(), (a || e.sp) && !Yn(e) && Ea(e), a) {
      if (l.then(al, al), t)
        return l.then((c) => {
          or(!0);
          try {
            ul(e, c, t);
          } finally {
            or(!1);
          }
        }).catch((c) => {
          bo(c, e, 0);
        });
      e.asyncDep = l;
    } else
      ul(e, l);
  } else
    Qa(e);
}
function ul(e, t, n) {
  X(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : de(t) && (e.setupState = ya(t)), Qa(e);
}
function Qa(e, t, n) {
  const r = e.type;
  e.render || (e.render = r.render || ft);
  {
    const o = fr(e);
    xt();
    try {
      vd(e);
    } finally {
      Rt(), o();
    }
  }
}
const Jd = {
  get(e, t) {
    return Ae(e, "get", ""), e[t];
  }
};
function Qd(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Jd),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function ii(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(ya(Vf(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in Zn)
        return Zn[n](e);
    },
    has(t, n) {
      return n in t || n in Zn;
    }
  })) : e.proxy;
}
function eg(e) {
  return X(e) && "__vccOpts" in e;
}
const W = (e, t) => /* @__PURE__ */ Uf(e, t, sr), tg = "3.5.42";
/**
* @vue/runtime-dom v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Fs;
const cl = typeof window < "u" && window.trustedTypes;
if (cl)
  try {
    Fs = /* @__PURE__ */ cl.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const eu = Fs ? (e) => Fs.createHTML(e) : (e) => e, ng = "http://www.w3.org/2000/svg", rg = "http://www.w3.org/1998/Math/MathML", yt = typeof document < "u" ? document : null, fl = yt && /* @__PURE__ */ yt.createElement("template"), og = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const o = t === "svg" ? yt.createElementNS(ng, e) : t === "mathml" ? yt.createElementNS(rg, e) : n ? yt.createElement(e, { is: n }) : yt.createElement(e);
    return e === "select" && r && r.multiple != null && o.setAttribute("multiple", r.multiple), o;
  },
  createText: (e) => yt.createTextNode(e),
  createComment: (e) => yt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => yt.querySelector(e),
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
      fl.innerHTML = eu(
        r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e
      );
      const a = fl.content;
      if (r === "svg" || r === "mathml") {
        const c = a.firstChild;
        for (; c.firstChild; )
          a.appendChild(c.firstChild);
        a.removeChild(c);
      }
      t.insertBefore(a, n);
    }
    return [
      // first
      l ? l.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, sg = /* @__PURE__ */ Symbol("_vtc");
function ig(e, t, n) {
  const r = e[sg];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const dl = /* @__PURE__ */ Symbol("_vod"), lg = /* @__PURE__ */ Symbol("_vsh"), ag = /* @__PURE__ */ Symbol(""), ug = /(?:^|;)\s*display\s*:/;
function cg(e, t, n) {
  const r = e.style, o = be(n);
  let s = !1;
  if (n && !o) {
    if (t)
      if (be(t))
        for (const l of t.split(";")) {
          const a = l.slice(0, l.indexOf(":")).trim();
          n[a] == null && Wn(r, a, "");
        }
      else
        for (const l in t)
          n[l] == null && Wn(r, l, "");
    for (const l in n) {
      l === "display" && (s = !0);
      const a = n[l];
      a != null ? dg(
        e,
        l,
        !be(t) && t ? t[l] : void 0,
        a
      ) || Wn(r, l, a) : Wn(r, l, "");
    }
  } else if (o) {
    if (t !== n) {
      const l = r[ag];
      l && (n += ";" + l), r.cssText = n, s = ug.test(n);
    }
  } else t && e.removeAttribute("style");
  dl in e && (e[dl] = s ? r.display : "", e[lg] && (r.display = "none"));
}
const Br = /\s*!important$/;
function Wn(e, t, n) {
  if (q(n))
    n.forEach((r) => Wn(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--"))
    Br.test(n) ? e.setProperty(t, n.replace(Br, ""), "important") : e.setProperty(t, n);
  else {
    const r = fg(e, t);
    Br.test(n) ? e.setProperty(
      Qt(r),
      n.replace(Br, ""),
      "important"
    ) : e[r] = n;
  }
}
const gl = ["Webkit", "Moz", "ms"], hs = {};
function fg(e, t) {
  const n = hs[t];
  if (n)
    return n;
  let r = Ye(t);
  if (r !== "filter" && r in e)
    return hs[t] = r;
  r = Jl(r);
  for (let o = 0; o < gl.length; o++) {
    const s = gl[o] + r;
    if (s in e)
      return hs[t] = s;
  }
  return t;
}
function dg(e, t, n, r) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && be(r) && n === r;
}
const pl = "http://www.w3.org/1999/xlink";
function hl(e, t, n, r, o, s = yf(t)) {
  r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(pl, t.slice(6, t.length)) : e.setAttributeNS(pl, t, n) : n == null || s && !ea(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    s ? "" : dt(n) ? String(n) : n
  );
}
function ml(e, t, n, r, o) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? eu(n) : n);
    return;
  }
  const s = e.tagName;
  if (t === "value" && s !== "PROGRESS" && // custom elements may use _value internally
  !s.includes("-")) {
    const a = s === "OPTION" ? e.getAttribute("value") || "" : e.value, c = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (a !== c || !("_value" in e)) && (e.value = c), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let l = !1;
  if (n === "" || n == null) {
    const a = typeof e[t];
    a === "boolean" ? n = ea(n) : n == null && a === "string" ? (n = "", l = !0) : a === "number" && (n = 0, l = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  l && e.removeAttribute(o || t);
}
function gg(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function pg(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const vl = /* @__PURE__ */ Symbol("_vei");
function hg(e, t, n, r, o = null) {
  const s = e[vl] || (e[vl] = {}), l = s[t];
  if (r && l)
    l.value = r;
  else {
    const [a, c] = wg(t);
    if (r) {
      const f = s[t] = _g(
        r,
        o
      );
      gg(e, a, f, c);
    } else l && (pg(e, a, l, c), s[t] = void 0);
  }
}
const mg = /(Once|Passive|Capture)$/, vg = /^on:?(?:Once|Passive|Capture)$/;
function wg(e) {
  let t, n;
  for (; (n = e.match(mg)) && !vg.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : Qt(e.slice(2)), t];
}
let ms = 0;
const yg = /* @__PURE__ */ Promise.resolve(), bg = () => ms || (yg.then(() => ms = 0), ms = Date.now());
function _g(e, t) {
  const n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    const o = n.value;
    if (q(o)) {
      const s = r.stopImmediatePropagation;
      r.stopImmediatePropagation = () => {
        s.call(r), r._stopped = !0;
      };
      const l = o.slice(), a = [r];
      for (let c = 0; c < l.length && !r._stopped; c++) {
        const f = l[c];
        f && Qe(
          f,
          t,
          5,
          a
        );
      }
    } else
      Qe(
        o,
        t,
        5,
        [r]
      );
  };
  return n.value = e, n.attached = bg(), n;
}
const wl = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Sg = (e, t, n, r, o, s) => {
  const l = o === "svg";
  t === "class" ? ig(e, r, l) : t === "style" ? cg(e, n, r) : go(t) ? po(t) || hg(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : xg(e, t, r, l)) ? (ml(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && hl(e, t, r, l, s, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Rg(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !be(r))) ? ml(e, Ye(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), hl(e, t, r, l));
};
function xg(e, t, n, r) {
  if (r)
    return !!(t === "innerHTML" || t === "textContent" || t in e && wl(t) && X(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return wl(t) && be(n) ? !1 : t in e;
}
function Rg(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const r = Ye(t);
  return Array.isArray(n) ? n.some((o) => Ye(o) === r) : Object.keys(n).some((o) => Ye(o) === r);
}
const Cg = ["ctrl", "shift", "alt", "meta"], Mg = {
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
  exact: (e, t) => Cg.some((n) => e[`${n}Key`] && !t.includes(n))
}, gn = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), r = t.join(".");
  return n[r] || (n[r] = (o, ...s) => {
    for (let l = 0; l < t.length; l++) {
      const a = Mg[t[l]];
      if (a && a(o, t)) return;
    }
    return e(o, ...s);
  });
}, Ig = /* @__PURE__ */ Pe({ patchProp: Sg }, og);
let yl;
function Eg() {
  return yl || (yl = Ld(Ig));
}
const Ag = (...e) => {
  const t = Eg().createApp(...e), { mount: n } = t;
  return t.mount = (r) => {
    const o = Pg(r);
    if (!o) return;
    const s = t._component;
    !X(s) && !s.render && !s.template && (s.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const l = n(o, !1, Og(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), l;
  }, t;
};
function Og(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Pg(e) {
  return be(e) ? document.querySelector(e) : e;
}
function Nr() {
  return !0;
}
const Dg = Symbol("merge-proxy"), Zr = Symbol("merge-proxy-sources"), kg = {
  get(e, t, n) {
    return t === Dg ? n : t === Zr ? e.sources : e.get(t);
  },
  has(e, t) {
    return e.has(t);
  },
  set: Nr,
  deleteProperty: Nr,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: Nr,
      deleteProperty: Nr
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function Jr(e) {
  return e && typeof e == "object" && "value" in e ? e.value : e;
}
function Hs(...e) {
  const t = e.flatMap((n) => typeof n == "object" && n !== null && Zr in n && Array.isArray(n[Zr]) ? n[Zr] : [n]);
  return new Proxy({
    sources: t,
    get(n) {
      for (let r = t.length - 1; r >= 0; r--) {
        const o = Jr(t[r])[n];
        if (o !== void 0) return o;
      }
    },
    has(n) {
      for (let r = t.length - 1; r >= 0; r--) if (n in Jr(t[r])) return !0;
      return !1;
    },
    keys() {
      const n = [];
      for (const r of t) n.push(...Object.keys(Jr(r)));
      return [...Array.from(new Set(n))];
    }
  }, kg);
}
function bl(...e) {
  const t = {};
  for (let n of e)
    if (n = Jr(n), !!n)
      for (const r of Reflect.ownKeys(n)) {
        const o = n[r];
        o !== void 0 && (t[r] = o);
      }
  return t;
}
function tu(e) {
  return typeof e == "function" ? e : (t) => {
    var n;
    return (n = e.next) == null ? void 0 : n.call(e, t);
  };
}
function Tg(e) {
  return Object.assign(e, {
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: we(e, tu(t), { flush: "sync" }) })
  });
}
function Fg(e) {
  return Object.assign(e, {
    set: (t) => {
      e.value = typeof t == "function" ? t(e.value) : t;
    },
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: we(e, tu(t), { flush: "sync" }) })
  });
}
function Hg() {
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
    createReadonlyAtom: (t, n) => Tg(W(() => t())),
    createWritableAtom: (t, n) => Fg(/* @__PURE__ */ Bf(t)),
    untrack: (t) => t(),
    batch: (t) => t()
  };
}
function Co(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function gt(e) {
  if (Array.isArray(e)) return e.map(gt);
  if (e && typeof e == "object") {
    const t = Object.getPrototypeOf(e);
    if (t !== Object.prototype && t !== null) return e;
    const n = t === null ? te() : {}, r = Object.keys(e);
    for (let o = 0; o < r.length; o++) {
      const s = r[o];
      Object.defineProperty(n, s, {
        configurable: !0,
        enumerable: !0,
        value: gt(e[s]),
        writable: !0
      });
    }
    return n;
  }
  return e;
}
function nu(e, t) {
  const n = Object.keys(t), r = e;
  for (let o = 0; o < n.length; o++) {
    const s = n[o];
    !s.startsWith("_memo_") && s !== "_cellsCache" && (r[s] = t[s]);
  }
  return e;
}
function te() {
  return /* @__PURE__ */ Object.create(null);
}
function en(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function dr(e, t) {
  return (n) => {
    var r;
    (((r = t.options.atoms) == null ? void 0 : r[e]) ?? t.baseAtoms[e]).set((o) => Co(n, o));
  };
}
function _l(e) {
  if (typeof e != "object" || e === null) return !1;
  if (Array.isArray(e)) return !0;
  const t = Object.getPrototypeOf(e);
  return t === Object.prototype || t === null;
}
function Sl(e) {
  return Reflect.ownKeys(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
const Lg = 3;
function jg(e, t) {
  return ru(e, t, Lg);
}
function ru(e, t, n) {
  if (Object.is(e, t)) return !0;
  if (n <= 0 || !_l(e) || !_l(t) || (Array.isArray(e) || Array.isArray(t)) && (!Array.isArray(e) || !Array.isArray(t) || e.length !== t.length))
    return !1;
  const r = Sl(e), o = Sl(t);
  if (r.length !== o.length) return !1;
  const s = e, l = t;
  for (let a = 0; a < r.length; a++) {
    const c = r[a];
    if (!Object.prototype.propertyIsEnumerable.call(t, c) || !ru(s[c], l[c], n - 1)) return !1;
  }
  return !0;
}
function Mo(e, t, n, r = jg) {
  const o = `on${t.charAt(0).toUpperCase()}${t.slice(1)}Change`, s = e.options[o];
  s && s((l) => {
    const a = Co(n, l);
    return r(l, a) ? l : a;
  });
}
function zg(e) {
  return e instanceof Function;
}
function Kg(e, t) {
  const n = [], r = (o) => {
    o.forEach((s) => {
      n.push(s);
      const l = t(s);
      l.length && r(l);
    });
  };
  return r(e), n;
}
const Vg = ({ fn: e, memoDeps: t, onAfterCompare: n, onAfterUpdate: r, onBeforeCompare: o, onBeforeUpdate: s }) => {
  let l = [], a;
  return (f) => {
    o == null || o();
    const d = t == null ? void 0 : t(f);
    let h = !d || d.length !== (l == null ? void 0 : l.length);
    if (!h && d) {
      for (let w = 0; w < d.length; w++) if (d[w] !== l[w]) {
        h = !0;
        break;
      }
    }
    return n == null || n(h), h && (l = d, s == null || s(), a = e(...d ?? []), r == null || r(a)), a;
  };
};
function ou(e) {
  let t = !1;
  return () => {
    if (!t) {
      t = !0;
      return;
    }
    e();
  };
}
function gr({ feature: e, fnName: t, objectId: n, onAfterUpdate: r, table: o, ...s }) {
  const l = () => {
    if (!r) return;
    const { schedule: c, untrack: f } = o._reactivity;
    c(() => f(() => r()));
  };
  return Vg({
    ...s,
    ...{ onAfterUpdate: () => {
      l();
    } }
  });
}
function su(e, t = "_") {
  const [n, r] = e.split(t);
  return {
    fnKey: r,
    fnName: `${n}.${r}`,
    parentName: n
  };
}
function pt(e, t, n) {
  for (const [r, { fn: o, memoDeps: s }] of Object.entries(n)) {
    const { fnKey: l, fnName: a } = su(r);
    t[l] = s ? gr({
      memoDeps: s,
      fn: o,
      fnName: a,
      table: t,
      feature: e
    }) : o;
  }
}
function et(e, t, n, r) {
  for (const [o, { fn: s, memoDeps: l }] of Object.entries(r)) {
    const { fnKey: a, fnName: c } = su(o);
    if (l) {
      const f = `_memo_${a}`;
      t[a] = function(...d) {
        if (!this[f]) {
          const h = this;
          this[f] = gr({
            memoDeps: (w) => l(h, w),
            fn: (...w) => s(h, ...w),
            fnName: c,
            objectId: h.id,
            table: n,
            feature: e
          });
        }
        return this[f](...d);
      };
    } else t[a] = function(...f) {
      return s(this, ...f);
    };
  }
}
function Z(e, t, n, ...r) {
  var o;
  return ((o = e[t]) == null ? void 0 : o.call(e, ...r)) ?? n(e, ...r);
}
function Bg(e) {
  return e.row.getValue(e.column.id);
}
function Ng(e) {
  return e.getValue() ?? e.table.options.renderFallbackValue;
}
function $g(e) {
  return {
    table: e.table,
    column: e.column,
    row: e.row,
    cell: e,
    getValue: () => e.getValue(),
    renderValue: () => e.renderValue()
  };
}
const Wg = { assignCellPrototype: (e, t) => {
  et("coreCellsFeature", e, t, {
    cell_getValue: { fn: (n) => Bg(n) },
    cell_renderValue: { fn: (n) => Ng(n) },
    cell_getContext: {
      fn: (n) => $g(n),
      memoDeps: (n) => [n]
    }
  });
} };
function Ug(e) {
  var t, n;
  if (!e._headerPrototype) {
    e._headerPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignHeaderPrototype) == null || n.call(t, e._headerPrototype, e);
  }
  return e._headerPrototype;
}
function iu(e, t, n) {
  const r = Ug(e), o = Object.create(r);
  o.colSpan = 0, o.column = t, o.depth = n.depth, o.headerGroup = null, o.id = n.id ?? t.id, o.index = n.index, o.isPlaceholder = !!n.isPlaceholder, o.placeholderId = n.placeholderId, o.rowSpan = 0, o.subHeaders = [];
  const s = e._headerInstanceInitFns;
  for (let l = 0; l < s.length; l++) s[l](o);
  return o;
}
function tn() {
  return {
    start: [],
    end: []
  };
}
function qg(e) {
  var s;
  const t = e.getAllColumns(), n = e.getAllLeafColumnsById(), { start: r } = ((s = e.atoms.columnPinning) == null ? void 0 : s.get()) ?? tn(), o = [];
  for (let l = 0; l < r.length; l++) {
    const a = n[r[l]];
    a && Z(a, "getIsVisible", qe) && o.push(a);
  }
  return ir(t, o, e, "start");
}
function Gg(e) {
  var s;
  const t = e.getAllColumns(), n = e.getAllLeafColumnsById(), { end: r } = ((s = e.atoms.columnPinning) == null ? void 0 : s.get()) ?? tn(), o = [];
  for (let l = 0; l < r.length; l++) {
    const a = n[r[l]];
    a && Z(a, "getIsVisible", qe) && o.push(a);
  }
  return ir(t, o, e, "end");
}
function Xg(e) {
  var s;
  const t = e.getAllColumns();
  let n = Z(e, "getVisibleLeafColumns", li);
  const { start: r, end: o } = ((s = e.atoms.columnPinning) == null ? void 0 : s.get()) ?? tn();
  if (r.length || o.length) {
    const l = [...r, ...o];
    n = n.filter((a) => !l.includes(a.id));
  }
  return ir(t, n, e, "center");
}
function Yg(e) {
  var o;
  const { start: t } = ((o = e.atoms.columnPinning) == null ? void 0 : o.get()) ?? tn(), n = e.getAllLeafColumnsById(), r = [];
  for (let s = 0; s < t.length; s++) {
    const l = n[t[s]];
    l && r.push(l);
  }
  return r;
}
function Zg(e) {
  var o;
  const { end: t } = ((o = e.atoms.columnPinning) == null ? void 0 : o.get()) ?? tn(), n = e.getAllLeafColumnsById(), r = [];
  for (let s = 0; s < t.length; s++) {
    const l = n[t[s]];
    l && r.push(l);
  }
  return r;
}
function Jg(e) {
  var o;
  const { start: t, end: n } = ((o = e.atoms.columnPinning) == null ? void 0 : o.get()) ?? tn();
  if (!t.length && !n.length) return e.getAllLeafColumns();
  const r = [...t, ...n];
  return e.getAllLeafColumns().filter((s) => !r.includes(s.id));
}
function Qg(e) {
  return Z(e, "getStartLeafColumns", Yg).filter((t) => Z(t, "getIsVisible", qe));
}
function ep(e) {
  return Z(e, "getEndLeafColumns", Zg).filter((t) => Z(t, "getIsVisible", qe));
}
function tp(e) {
  return Z(e, "getCenterLeafColumns", Jg).filter((t) => Z(t, "getIsVisible", qe));
}
function $r(e, t) {
  return t ? t === "start" ? Z(e, "getStartVisibleLeafColumns", Qg) : t === "end" ? Z(e, "getEndVisibleLeafColumns", ep) : Z(e, "getCenterVisibleLeafColumns", tp) : Z(e, "getVisibleLeafColumns", li);
}
function qe(e) {
  var r;
  const t = (r = e.table.atoms.columnVisibility) == null ? void 0 : r.get();
  if (!t) return !0;
  const n = e.columns;
  return n.length ? n.some((o) => Z(o, "getIsVisible", qe)) : (en(t, e.id) ? t[e.id] : void 0) ?? !0;
}
function li(e) {
  return e.getAllLeafColumns().filter((t) => Z(t, "getIsVisible", qe));
}
function lu(e, t = 1) {
  let n = t;
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    Z(o, "getIsVisible", qe) && o.columns.length && (n = Math.max(n, lu(o.columns, t + 1)));
  }
  return n;
}
function np(e, t) {
  return e ? `${e}_${t}` : String(t);
}
function rp(e, t, n, r) {
  let o = e ?? "";
  return t && (o = o ? `${o}_${t}` : String(t)), n && (o = o ? `${o}_${n}` : n), r && (o = o ? `${o}_${r}` : r), o;
}
function op(e, t) {
  let n = 0;
  for (let r = 0; r < e.length; r++) e[r].column === t && n++;
  return n;
}
function au(e, t, n, r, o, s) {
  const l = {
    depth: t,
    id: np(r, t),
    headers: []
  }, a = [];
  for (let c = 0; c < e.length; c++) {
    if (!(c in e)) continue;
    const f = e[c], d = a[a.length - 1], h = f.column.depth === l.depth;
    let w, y = !1;
    if (h && f.column.parent ? w = f.column.parent : (w = f.column, y = !0), d && d.column === w) d.subHeaders.push(f);
    else {
      const I = iu(n, w, {
        id: rp(r, t, w.id, f.id),
        isPlaceholder: y,
        placeholderId: y ? String(op(a, w)) : void 0,
        depth: t,
        index: a.length
      });
      I.subHeaders.push(f), a.push(I);
    }
    l.headers.push(f), f.headerGroup = l;
  }
  for (let c = 0; c < s.length; c++) s[c](l);
  o.push(l), t > 0 && au(a, t - 1, n, r, o, s);
}
function uu(e) {
  for (let t = 0; t < e.length; t++) {
    const n = e[t];
    if (!Z(n.column, "getIsVisible", qe)) continue;
    let r = 0;
    if (n.subHeaders.length) {
      uu(n.subHeaders);
      for (let o = 0; o < n.subHeaders.length; o++) {
        const s = n.subHeaders[o];
        Z(s.column, "getIsVisible", qe) && (r += s.colSpan);
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
function ir(e, t, n, r) {
  var c;
  const o = lu(e), s = [], l = n._headerGroupInstanceInitFns, a = new Array(t.length);
  for (let f = 0; f < t.length; f++)
    f in t && (a[f] = iu(n, t[f], {
      depth: o,
      index: f
    }));
  return au(a, o - 1, n, r, s, l), s.reverse(), uu(((c = s[0]) == null ? void 0 : c.headers) ?? []), s;
}
function sp(e) {
  var t, n;
  if (!e._columnPrototype) {
    e._columnPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignColumnPrototype) == null || n.call(t, e._columnPrototype, e);
  }
  return e._columnPrototype;
}
function ip(e, t, n, r) {
  const o = {
    ...e.getDefaultColumnDef(),
    ...t
  }, s = o.accessorKey, l = s === void 0 ? void 0 : String(s), a = o.id ?? (l == null ? void 0 : l.replaceAll(".", "_")) ?? (typeof o.header == "string" ? o.header : void 0);
  let c;
  if (o.accessorFn) c = o.accessorFn;
  else if (s !== void 0) if (typeof s == "string" && s.includes(".")) {
    const w = s.split(".");
    c = (y) => {
      let I = y;
      for (let E = 0; E < w.length; E++) {
        const A = w[E];
        I = I == null ? void 0 : I[A];
      }
      return I;
    };
  } else c = (w) => w[o.accessorKey];
  if (!a)
    throw new Error();
  const f = sp(e), d = Object.create(f);
  d.accessorFn = c, d.columnDef = o, d.columns = [], d.depth = n, d.id = `${String(a)}`, d.parent = r;
  const h = e._columnInstanceInitFns;
  for (let w = 0; w < h.length; w++) h[w](d);
  return d;
}
function cu(e) {
  var n;
  const t = (n = e.atoms.columnOrder) == null ? void 0 : n.get();
  return (r) => {
    let o = [];
    if (!(t != null && t.length)) o = r;
    else {
      const s = /* @__PURE__ */ new Map();
      for (let l = 0; l < r.length; l++) {
        const a = r[l];
        s.set(a.id, a);
      }
      for (let l = 0; l < t.length; l++) {
        const a = t[l], c = s.get(a);
        c && (o.push(c), s.delete(a));
      }
      for (let l = 0; l < r.length; l++) {
        const a = r[l];
        s.has(a.id) && o.push(a);
      }
    }
    return lp(e, o);
  };
}
function lp(e, t) {
  var a;
  const n = ((a = e.atoms.grouping) == null ? void 0 : a.get()) ?? [], { groupedColumnMode: r } = e.options;
  if (!n.length || !r) return t;
  const o = t.filter((c) => !n.includes(c.id));
  if (r === "remove") return o;
  const s = /* @__PURE__ */ new Map();
  for (let c = 0; c < t.length; c++) {
    const f = t[c];
    s.set(f.id, f);
  }
  const l = [];
  for (let c = 0; c < n.length; c++) {
    const f = s.get(n[c]);
    f && l.push(f);
  }
  return [...l, ...o];
}
function ap(e) {
  return [e, ...e.columns.flatMap((t) => t.getFlatColumns())];
}
function up(e) {
  if (e.columns.length) {
    const t = e.columns.flatMap((n) => n.getLeafColumns());
    return Z(e.table, "getOrderColumns", cu)(t);
  }
  return [e];
}
function cp(e) {
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
function fu(e, t, n, r = 0) {
  const o = new Array(t.length);
  for (let s = 0; s < t.length; s++) {
    if (!(s in t)) continue;
    const l = t[s], a = ip(e, l, r, n), c = l;
    a.columns = c.columns ? fu(e, c.columns, a, r + 1) : [], o[s] = a;
  }
  return o;
}
function fp(e) {
  return fu(e, e.options.columns);
}
function dp(e) {
  return e.getAllColumns().flatMap((t) => t.getFlatColumns());
}
function gp(e) {
  const t = te(), n = e.getAllFlatColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function pp(e) {
  const t = e.getAllColumns().flatMap((n) => n.getLeafColumns());
  return Z(e, "getOrderColumns", cu)(t);
}
function hp(e) {
  const t = te(), n = e.getAllLeafColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function mp(e, t) {
  return e.getAllFlatColumnsById()[t];
}
const vp = {
  assignColumnPrototype: (e, t) => {
    et("coreColumnsFeature", e, t, {
      column_getFlatColumns: {
        fn: (n) => ap(n),
        memoDeps: (n) => [n.table.options.columns]
      },
      column_getLeafColumns: {
        fn: (n) => up(n),
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
    pt("coreColumnsFeature", e, {
      table_getDefaultColumnDef: {
        fn: () => cp(e),
        memoDeps: () => [e.options.defaultColumn]
      },
      table_getAllColumns: {
        fn: () => fp(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumns: {
        fn: () => dp(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumnsById: {
        fn: () => gp(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllLeafColumns: {
        fn: () => pp(e),
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
        fn: () => hp(e),
        memoDeps: () => [e.getAllLeafColumns()]
      },
      table_getColumn: { fn: (t) => mp(e, t) }
    });
  }
};
function du(e, t) {
  for (let n = 0; n < e.subHeaders.length; n++) du(e.subHeaders[n], t);
  t.push(e);
}
function wp(e) {
  const t = [];
  return du(e, t), t;
}
function yp(e) {
  return {
    column: e.column,
    header: e,
    table: e.column.table
  };
}
function bp(e) {
  var f;
  const { start: t, end: n } = ((f = e.atoms.columnPinning) == null ? void 0 : f.get()) ?? tn(), r = e.getAllColumns(), o = Z(e, "getVisibleLeafColumns", li);
  if (!t.length && !n.length) return ir(r, o, e);
  const s = e.getAllLeafColumnsById(), l = [];
  for (let d = 0; d < t.length; d++) {
    const h = s[t[d]];
    h && Z(h, "getIsVisible", qe) && l.push(h);
  }
  const a = [];
  for (let d = 0; d < n.length; d++) {
    const h = s[n[d]];
    h && Z(h, "getIsVisible", qe) && a.push(h);
  }
  const c = o.filter((d) => !t.includes(d.id) && !n.includes(d.id));
  return ir(r, [
    ...l,
    ...c,
    ...a
  ], e);
}
function _p(e) {
  return [...e.getHeaderGroups()].reverse();
}
function Sp(e) {
  const t = e.getHeaderGroups(), n = [];
  for (let r = 0; r < t.length; r++) {
    const o = t[r].headers;
    for (let s = 0; s < o.length; s++) n.push(o[s]);
  }
  return n;
}
function xp(e) {
  var r;
  const t = ((r = e.getHeaderGroups()[0]) == null ? void 0 : r.headers) ?? [], n = [];
  for (let o = 0; o < t.length; o++) {
    const s = t[o].getLeafHeaders();
    for (let l = 0; l < s.length; l++) n.push(s[l]);
  }
  return n;
}
const Rp = {
  assignHeaderPrototype: (e, t) => {
    et("coreHeadersFeature", e, t, {
      header_getLeafHeaders: {
        fn: (n) => wp(n),
        memoDeps: (n) => [n.column.table.options.columns]
      },
      header_getContext: {
        fn: (n) => yp(n),
        memoDeps: (n) => [n.column.table.options.columns]
      }
    });
  },
  constructTableAPIs: (e) => {
    pt("coreHeadersFeature", e, {
      table_getHeaderGroups: {
        fn: () => bp(e),
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
        fn: () => _p(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getFlatHeaders: {
        fn: () => Sp(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getLeafHeaders: {
        fn: () => xp(e),
        memoDeps: () => [e.getHeaderGroups()]
      }
    });
  }
};
function Cp(e) {
  var t, n;
  if (!e._rowPrototype) {
    e._rowPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignRowPrototype) == null || n.call(t, e._rowPrototype, e);
  }
  return e._rowPrototype;
}
const Mp = (e, t, n, r, o, s, l) => {
  const a = Cp(e), c = Object.create(a);
  c._displayIndexCache = -1, c._uniqueValuesCache = te(), c._valuesCache = te(), c.depth = o, c.id = t, c.index = r, c.original = n, c.parentId = l, c.subRows = [];
  const f = e._rowInstanceInitFns;
  for (let d = 0; d < f.length; d++) f[d](c);
  return c;
}, Ip = /([0-9]+)/gm;
function xn(e) {
  const t = Object.assign((n, r, o) => {
    let s = n.getValue(o), l = r.getValue(o);
    const a = t.resolveDataValue;
    return a && (s = a(s), l = a(l)), t.sort(s, l, n, r, o);
  }, e);
  return t;
}
const Ep = xn({
  resolveDataValue: (e) => Io(e).toLowerCase(),
  sort: (e, t) => pu(e, t)
});
xn({
  resolveDataValue: (e) => Io(e),
  sort: (e, t) => pu(e, t)
});
const Ap = xn({
  resolveDataValue: (e) => Io(e).toLowerCase(),
  sort: (e, t) => ai(e, t)
});
xn({
  resolveDataValue: (e) => Io(e),
  sort: (e, t) => ai(e, t)
});
xn({
  resolveDataValue: (e) => Op(e),
  sort: (e, t) => e > t ? 1 : e < t ? -1 : 0
});
const gu = xn({ sort: (e, t) => ai(e, t) });
function ai(e, t) {
  return e === t ? 0 : e > t ? 1 : -1;
}
function Op(e) {
  return e instanceof Date ? e.getTime() : e;
}
function Io(e) {
  return typeof e == "number" ? isNaN(e) || e === 1 / 0 || e === -1 / 0 ? "" : String(e) : typeof e == "string" ? e : "";
}
function pu(e, t) {
  let n = 0, r = 0;
  const o = e.length, s = t.length;
  for (; n < o && r < s; ) {
    const l = lo(e.charCodeAt(n)), a = lo(t.charCodeAt(r)), c = Ls(e, n, l), f = Ls(t, r, a);
    if (!l && !a) {
      const h = Pp(e, n, c, t, r, f);
      if (h) return h;
      n = c, r = f;
      continue;
    }
    if (l !== a) return l ? 1 : -1;
    const d = Dp(e, n, c, t, r, f);
    if (d) return d;
    n = c, r = f;
  }
  return Rl(e, n) - Rl(t, r);
}
function lo(e) {
  return e >= 48 && e <= 57;
}
function Ls(e, t, n) {
  let r = t + 1;
  for (; r < e.length && lo(e.charCodeAt(r)) === n; ) r++;
  return r;
}
function Pp(e, t, n, r, o, s) {
  const l = n - t, a = s - o, c = l < a ? l : a;
  for (let f = 0; f < c; f++) {
    const d = e.charCodeAt(t + f), h = r.charCodeAt(o + f);
    if (d > h) return 1;
    if (h > d) return -1;
  }
  return l > a ? 1 : a > l ? -1 : 0;
}
function Dp(e, t, n, r, o, s) {
  let l = t;
  for (; l < n && e.charCodeAt(l) === 48; ) l++;
  let a = o;
  for (; a < s && r.charCodeAt(a) === 48; ) a++;
  const c = n - l, f = s - a;
  if (c === 0 && f === 0) return 0;
  if (c <= 15 && f <= 15) {
    const w = xl(e, l, n), y = xl(r, a, s);
    return w > y ? 1 : y > w ? -1 : 0;
  }
  const d = parseInt(e.slice(t, n), 10), h = parseInt(r.slice(o, s), 10);
  return d > h ? 1 : h > d ? -1 : 0;
}
function xl(e, t, n) {
  let r = 0;
  for (let o = t; o < n; o++) r = r * 10 + e.charCodeAt(o) - 48;
  return r;
}
function Rl(e, t) {
  let n = 0, r = t;
  for (; r < e.length; )
    n++, r = Ls(e, r, lo(e.charCodeAt(r)));
  return n;
}
function kp() {
  return [];
}
function Tp(e, t) {
  Mo(e, "cellSelection", gt(e.initialState.cellSelection) ?? kp());
}
function Fp(e) {
  e.atoms.cellSelection && (e.options.autoResetAll ?? e.options.autoResetCellSelection ?? !0) && e._reactivity.schedule(() => Tp(e));
}
function Hp() {
  return te();
}
function hu(e) {
  e.atoms.expanded && (e.options.autoResetAll ?? e.options.autoResetExpanded ?? !e.options.manualExpanding) && e._reactivity.schedule(() => vu(e));
}
function ao(e, t) {
  var n, r;
  (r = (n = e.options).onExpandedChange) == null || r.call(n, t);
}
function mu(e, t) {
  var r;
  const n = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t ?? !yu(e)) {
    if (n === !0 || !wu(e)) return;
    ao(e, !0);
  } else {
    if (n !== !0 && !Object.keys(n).length) return;
    ao(e, te());
  }
}
function vu(e, t) {
  const n = e.initialState.expanded;
  Mo(e, "expanded", t ? te() : n === !0 ? !0 : Object.assign(te(), gt(n ?? {})));
}
function wu(e) {
  return e.getPrePaginatedRowModel().flatRows.some((t) => Zt(t));
}
function Lp(e) {
  return (t) => {
    mu(e);
  };
}
function jp(e) {
  var n;
  const t = ((n = e.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return t === !0 || Object.values(t).some(Boolean);
}
function yu(e) {
  var r;
  const t = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t === !0) return !0;
  if (!Object.keys(t).length) return !1;
  const n = e.getRowModel().flatRows.filter((o) => Zt(o));
  return !(!n.length || n.some((o) => !Eo(o)));
}
function zp(e) {
  var r;
  let t = 0;
  const n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return (n === !0 ? Object.values(e.getRowModel().rowsById).filter((o) => Zt(o)).map((o) => o.id) : Object.keys(n ?? {})).forEach((o) => {
    const s = o.split(".");
    t = Math.max(t, s.length);
  }), t;
}
function bu(e, t) {
  var s;
  const n = ((s = e.table.atoms.expanded) == null ? void 0 : s.get()) ?? {}, r = n === !0 || js(n, e.id), o = t ?? !r;
  o !== r && (o && !Zt(e) || ao(e.table, (l) => {
    const a = l === !0 ? !0 : js(l, e.id);
    let c = te();
    if (l === !0 ? Object.values(e.table.getRowModel().rowsById).forEach((f) => {
      Zt(f) && (c[f.id] = !0);
    }) : c = Object.assign(te(), l), !a && o)
      return c[e.id] = !0, c;
    if (a && !o) {
      const f = te(), d = Object.keys(c);
      for (let h = 0; h < d.length; h++) {
        const w = d[h];
        w !== e.id && c[w] && (f[w] = !0);
      }
      return f;
    }
    return l;
  }));
}
function Eo(e) {
  var n, r, o;
  const t = ((n = e.table.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return !!(((o = (r = e.table.options).getIsRowExpanded) == null ? void 0 : o.call(r, e)) ?? (t === !0 || js(t, e.id)));
}
function js(e, t) {
  return !!(e && e !== !0 && en(e, t) && e[t]);
}
function Zt(e) {
  var t, n;
  return ((n = (t = e.table.options).getRowCanExpand) == null ? void 0 : n.call(t, e)) ?? ((e.table.options.enableExpanding ?? !0) && !!e.subRows.length);
}
function Kp(e) {
  let t = !0, n = e;
  for (; t && n.parentId; )
    n = e.table.getRow(n.parentId, !0), t = Eo(n);
  return t;
}
function Vp(e) {
  const t = Zt(e);
  return () => {
    t && bu(e);
  };
}
const zs = 0;
function _u(e) {
  var t, n;
  if (e.options.autoResetAll ?? e.options.autoResetPageIndex ?? !e.options.manualPagination) {
    if ((((n = (t = e.atoms.pagination) == null ? void 0 : t.get()) == null ? void 0 : n.pageIndex) ?? zs) === zs) return;
    $p(e);
  }
}
function Bp(e, t) {
  Mo(e, "pagination", t);
}
function Np(e, t) {
  Bp(e, (n) => {
    let r = Co(t, n.pageIndex);
    const o = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
    return r = Math.max(0, Math.min(r, o)), {
      ...n,
      pageIndex: r
    };
  });
}
function $p(e, t) {
  Np(e, zs);
}
function Wp() {
  return [];
}
function Ao(e, t) {
  Mo(e, "sorting", t);
}
function Su(e, t) {
  Ao(e, t ? [] : gt(e.initialState.sorting ?? []));
}
function Up(e) {
  e.atoms.sorting && (e.options.autoResetAll ?? e.options.autoResetSorting ?? !1) && Su(e);
}
function xu(e) {
  const t = e.table._rowModelFns.sortFns, n = e.table.getFilteredRowModel().flatRows.slice(0, 10);
  let r, o = !1;
  for (let s = 0; s < n.length; s++) {
    const l = n[s].getValue(e.id);
    if (Object.prototype.toString.call(l) === "[object Date]") {
      r = "datetime";
      break;
    }
    if (typeof l == "string" && (o = !0, l.split(Ip).length > 1)) {
      r = "alphanumeric";
      break;
    }
  }
  if (!r && o && (r = "text"), r) {
    let s = t == null ? void 0 : t[r];
    if (s || r === "alphanumeric" && (s = t == null ? void 0 : t.text), s) return s;
  }
  return gu;
}
function Ru(e) {
  const t = e.table.getFilteredRowModel().flatRows.slice(0, 10);
  for (let n = 0; n < t.length; n++) {
    const r = t[n].getValue(e.id);
    if (r != null)
      return typeof r == "string" ? "asc" : "desc";
  }
  return "desc";
}
function Cu(e) {
  const t = e.table._rowModelFns.sortFns;
  return zg(e.columnDef.sortFn) ? e.columnDef.sortFn : e.columnDef.sortFn === "auto" ? xu(e) : (t == null ? void 0 : t[e.columnDef.sortFn]) ?? gu;
}
function Mu(e, t, n) {
  const r = Eu(e, n && uo(e)), o = typeof t < "u";
  Ao(e.table, (s) => {
    const l = s.findIndex((w) => w.id === e.id), a = l === -1 ? void 0 : s[l];
    let c = [], f;
    const d = o ? t : r === "desc", h = !!(s.length && uo(e) && n);
    return h ? a ? f = "toggle" : f = "add" : a ? f = "toggle" : f = "replace", f === "toggle" && (o || r || (f = "remove")), f === "add" ? (c = [...s, {
      id: e.id,
      desc: d
    }], c.splice(0, c.length - (e.table.options.maxMultiSortColCount ?? Number.MAX_SAFE_INTEGER))) : f === "toggle" ? c = h ? s.map((w) => w.id === e.id ? {
      ...w,
      desc: d
    } : w) : [{
      id: e.id,
      desc: d
    }] : f === "remove" ? c = h ? s.filter((w) => w.id !== e.id) : [] : c = [{
      id: e.id,
      desc: d
    }], c;
  });
}
function Iu(e) {
  return e.columnDef.sortDescFirst ?? e.table.options.sortDescFirst ?? Ru(e) === "desc" ? "desc" : "asc";
}
function Eu(e, t) {
  const n = Iu(e), r = Au(e);
  return r ? r !== n && (e.table.options.enableSortingRemoval ?? !0) && (!t || (e.table.options.enableMultiRemove ?? !0)) ? !1 : r === "desc" ? "asc" : "desc" : n;
}
function ui(e) {
  return (e.columnDef.enableSorting ?? !0) && (e.table.options.enableSorting ?? !0) && !!e.accessorFn;
}
function uo(e) {
  return e.columnDef.enableMultiSort ?? e.table.options.enableMultiSort ?? !!e.accessorFn;
}
function Au(e) {
  var n, r;
  const t = (r = (n = e.table.atoms.sorting) == null ? void 0 : n.get()) == null ? void 0 : r.find((o) => o.id === e.id);
  return t ? t.desc ? "desc" : "asc" : !1;
}
function qp(e) {
  var t, n;
  return ((n = (t = e.table.atoms.sorting) == null ? void 0 : t.get()) == null ? void 0 : n.findIndex((r) => r.id === e.id)) ?? -1;
}
function Gp(e) {
  Ao(e.table, (t) => t.length ? t.filter((n) => n.id !== e.id) : []);
}
function Xp(e) {
  const t = ui(e);
  return (n) => {
    var r, o;
    t && Mu(e, void 0, uo(e) ? (o = (r = e.table.options).isMultiSortEvent) == null ? void 0 : o.call(r, n) : !1);
  };
}
function Ou() {
  return (e) => gr({
    feature: "coreRowModelsFeature",
    table: e,
    fnName: "table.getCoreRowModel",
    memoDeps: () => [e.options.data],
    fn: () => Yp(e, e.options.data),
    onAfterUpdate: ou(() => {
      hu(e), _u(e), Up(e), Fp(e);
    })
  });
}
function Pu(e, t, n, r = 0, o) {
  var l;
  const s = [];
  for (let a = 0; a < n.length; a++) {
    const c = n[a], f = Mp(e, e.getRowId(c, a, o), c, a, r, void 0, o == null ? void 0 : o.id);
    t.flatRows.push(f), t.rowsById[f.id] = f, s.push(f), e.options.getSubRows && (f.originalSubRows = e.options.getSubRows(c, a), (l = f.originalSubRows) != null && l.length && (f.subRows = Pu(e, t, f.originalSubRows, r + 1, f)));
  }
  return s;
}
function Yp(e, t) {
  const n = {
    rows: [],
    flatRows: [],
    rowsById: te()
  };
  return n.rows = Pu(e, n, t), n;
}
function Zp(e) {
  var t, n;
  return e._rowModels.coreRowModel || (e._rowModels.coreRowModel = ((n = (t = e.options.features).coreRowModel) == null ? void 0 : n.call(t, e)) ?? Ou()(e)), e._rowModels.coreRowModel();
}
function Jp(e) {
  return e.getCoreRowModel();
}
function Qp(e) {
  var t, n;
  return e._rowModels.filteredRowModel || (e._rowModels.filteredRowModel = (n = (t = e.options.features).filteredRowModel) == null ? void 0 : n.call(t, e)), e.options.manualFiltering || !e._rowModels.filteredRowModel ? e.getPreFilteredRowModel() : e._rowModels.filteredRowModel();
}
function eh(e) {
  return e.getFilteredRowModel();
}
function th(e) {
  var t, n;
  return e._rowModels.groupedRowModel || (e._rowModels.groupedRowModel = (n = (t = e.options.features).groupedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualGrouping || !e._rowModels.groupedRowModel ? e.getPreGroupedRowModel() : e._rowModels.groupedRowModel();
}
function nh(e) {
  return e.getGroupedRowModel();
}
function rh(e) {
  var t, n;
  return e._rowModels.sortedRowModel || (e._rowModels.sortedRowModel = (n = (t = e.options.features).sortedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualSorting || !e._rowModels.sortedRowModel ? e.getPreSortedRowModel() : e._rowModels.sortedRowModel();
}
function oh(e) {
  return e.getSortedRowModel();
}
function sh(e) {
  var t, n;
  return e._rowModels.expandedRowModel || (e._rowModels.expandedRowModel = (n = (t = e.options.features).expandedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualExpanding || !e._rowModels.expandedRowModel ? e.getPreExpandedRowModel() : e._rowModels.expandedRowModel();
}
function ih(e) {
  return e.getExpandedRowModel();
}
function lh(e) {
  var t, n;
  return e._rowModels.paginatedRowModel || (e._rowModels.paginatedRowModel = (n = (t = e.options.features).paginatedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualPagination || !e._rowModels.paginatedRowModel ? e.getPrePaginatedRowModel() : e._rowModels.paginatedRowModel();
}
function ah(e) {
  return e.getPaginatedRowModel();
}
const uh = { constructTableAPIs: (e) => {
  pt("coreRowModelsFeature", e, {
    table_getCoreRowModel: { fn: () => Zp(e) },
    table_getPreFilteredRowModel: { fn: () => Jp(e) },
    table_getFilteredRowModel: { fn: () => Qp(e) },
    table_getPreGroupedRowModel: { fn: () => eh(e) },
    table_getGroupedRowModel: { fn: () => th(e) },
    table_getPreSortedRowModel: { fn: () => nh(e) },
    table_getSortedRowModel: { fn: () => rh(e) },
    table_getPreExpandedRowModel: { fn: () => oh(e) },
    table_getExpandedRowModel: { fn: () => sh(e) },
    table_getPrePaginatedRowModel: { fn: () => ih(e) },
    table_getPaginatedRowModel: { fn: () => lh(e) },
    table_getRowModel: { fn: () => ah(e) }
  });
} };
function ch(e) {
  var t, n;
  if (!e._cellPrototype) {
    e._cellPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignCellPrototype) == null || n.call(t, e._cellPrototype, e);
  }
  return e._cellPrototype;
}
function fh(e, t, n) {
  const r = ch(n), o = Object.create(r);
  o.column = e, o.id = `${t.id}_${e.id}`, o.row = t;
  const s = n._cellInstanceInitFns;
  for (let l = 0; l < s.length; l++) s[l](o);
  return o;
}
function dh(e) {
  const t = e.table.getRowsInDisplayOrder(), n = e._displayIndexCache;
  return t[n] === e ? n : -1;
}
function gh(e) {
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
function ph(e, t) {
  if (en(e._valuesCache, t)) return e._valuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return e._valuesCache[t] = n.accessorFn(e.original, e.index), e._valuesCache[t];
}
function hh(e, t) {
  if (en(e._uniqueValuesCache, t)) return e._uniqueValuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return n.columnDef.getUniqueValues ? (e._uniqueValuesCache[t] = n.columnDef.getUniqueValues(e.original, e.index), e._uniqueValuesCache[t]) : (e._uniqueValuesCache[t] = [e.getValue(t)], e._uniqueValuesCache[t]);
}
function mh(e, t) {
  return e.getValue(t) ?? e.table.options.renderFallbackValue;
}
function vh(e) {
  return Kg(e.subRows, (t) => t.subRows);
}
function wh(e) {
  const t = e.getCoreRowModel().flatRows;
  let n = 0;
  for (let r = 0; r < t.length; r++) n = Math.max(n, t[r].depth);
  return n;
}
function yh(e) {
  if (e.parentId)
    return e.table.getCoreRowModel().rowsById[e.parentId] ?? e.table.getRow(e.parentId, !0);
}
function bh(e) {
  const t = [];
  let n = e;
  for (; ; ) {
    const r = n.getParentRow();
    if (!r) break;
    t.push(r), n = r;
  }
  return t.reverse();
}
function _h(e) {
  const t = e.table.getAllLeafColumns();
  let n = e._cellsCache;
  n || (n = e._cellsCache = /* @__PURE__ */ new WeakMap());
  const r = new Array(t.length);
  for (let o = 0; o < t.length; o++) {
    const s = t[o];
    let l = n.get(s);
    l || (l = fh(s, e, e.table), n.set(s, l)), r[o] = l;
  }
  return r;
}
function Sh(e) {
  const t = te(), n = e.getAllCells();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.column.id] = o;
  }
  return t;
}
function xh(e, t, n, r) {
  var o, s;
  return ((s = (o = t.options).getRowId) == null ? void 0 : s.call(o, e, n, r)) ?? (r ? `${r.id}.${n}` : String(n));
}
function Rh(e, t, n) {
  let r = (n ? e.getPrePaginatedRowModel() : e.getRowModel()).rowsById[t];
  if (!r && (r = e.getCoreRowModel().rowsById[t], !r))
    throw new Error();
  return r;
}
const Ch = {
  assignRowPrototype: (e, t) => {
    et("coreRowsFeature", e, t, {
      row_getDisplayIndex: { fn: (n) => dh(n) },
      row_getAllCellsByColumnId: {
        fn: (n) => Sh(n),
        memoDeps: (n) => [n.getAllCells()]
      },
      row_getAllCells: {
        fn: (n) => _h(n),
        memoDeps: (n) => [n.table.getAllLeafColumns()]
      },
      row_getLeafRows: {
        fn: (n) => vh(n),
        memoDeps: (n) => [n.subRows]
      },
      row_getParentRow: { fn: (n) => yh(n) },
      row_getParentRows: { fn: (n) => bh(n) },
      row_getUniqueValues: { fn: (n, r) => hh(n, r) },
      row_getValue: { fn: (n, r) => ph(n, r) },
      row_renderValue: { fn: (n, r) => mh(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    pt("coreRowsFeature", e, {
      table_getRowsInDisplayOrder: {
        fn: () => gh(e),
        memoDeps: () => {
          var t;
          return [
            e.getPrePaginatedRowModel().rows,
            e.options.paginateExpandedRows,
            e.options.paginateExpandedRows === !1 ? (t = e.atoms.expanded) == null ? void 0 : t.get() : void 0
          ];
        }
      },
      table_getRowId: { fn: (t, n, r) => xh(t, e, n, r) },
      table_getRow: { fn: (t, n) => Rh(e, t, n) },
      table_getMaxSubRowDepth: {
        fn: () => wh(e),
        memoDeps: () => [e.getCoreRowModel()]
      }
    });
  }
};
function Du(e, t, n = (r, o) => r === o) {
  const r = t === void 0 ? e.options.state : t;
  e._reactivity.batch(() => {
    if (r) for (const o in r) {
      const s = e.baseAtoms[o];
      if (!s) continue;
      const l = r[o], a = l === void 0 ? e.initialState[o] : l;
      n(e._reactivity.untrack(() => s.get()), a) || s.set(() => a);
    }
  });
}
function Mh(e, t, n = (r, o) => r === o) {
  e._reactivity.batch(() => {
    var r, o;
    Du(e, t, n), (o = (r = e._reactivity).commit) == null || o.call(r);
  });
}
function Ih(e) {
  var r, o;
  const t = gt(e.initialState);
  e._reactivity.batch(() => {
    const s = Object.keys(t);
    for (let l = 0; l < s.length; l++) {
      const a = s[l];
      e.baseAtoms[a].set(t[a]);
    }
  });
  const n = Object.values(e._features);
  for (let s = 0; s < n.length; s++) (o = (r = n[s]).resetTableInstanceData) == null || o.call(r, e);
}
function Eh(e, t) {
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
function Ah(e, t, n) {
  const r = Eh(e, Co(t, e.options));
  e.optionsStore ? e.optionsStore.set(() => r) : e.options = r, Mh(e, r.state ?? null);
}
const Oh = { constructTableAPIs: (e) => {
  pt("coreTablesFeature", e, {
    table_reset: { fn: () => Ih(e) },
    table_setOptions: { fn: (t) => Ah(e, t) }
  });
} }, Ph = {
  coreCellsFeature: Wg,
  coreColumnsFeature: vp,
  coreHeadersFeature: Rp,
  coreRowModelsFeature: uh,
  coreRowsFeature: Ch,
  coreTablesFeature: Oh
};
function Dh(e) {
  const t = e;
  return Object.defineProperty(e, "state", { get() {
    return e.get();
  } }), "set" in e && (t.setState = e.set.bind(e)), t;
}
function kh(e, t) {
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
  const n = Cl(e);
  if (n.length !== Cl(t).length) return !1;
  for (let r = 0; r < n.length; r++) if (!Object.prototype.hasOwnProperty.call(t, n[r]) || !Object.is(e[n[r]], t[n[r]])) return !1;
  return !0;
}
function Cl(e) {
  return Object.keys(e).concat(Object.getOwnPropertySymbols(e));
}
function Th(e, t = {}) {
  return Object.values(e).forEach((n) => {
    var r;
    t = ((r = n.getInitialState) == null ? void 0 : r.call(n, t)) ?? t;
  }), gt(t);
}
function Fh(e) {
  var j, U;
  const t = e.features.coreReactivityFeature, { aggregationFns: n, columnMeta: r, coreRowModel: o, expandedRowModel: s, facetedMinMaxValues: l, facetedRowModel: a, facetedUniqueValues: c, filterFns: f, filterMeta: d, filteredRowModel: h, groupedRowModel: w, paginatedRowModel: y, sortFns: I, sortedRowModel: E, tableMeta: A, ...z } = e.features, C = {
    _cellInstanceInitFns: [],
    _columnInstanceInitFns: [],
    _features: {
      ...Ph,
      ...z
    },
    _headerGroupInstanceInitFns: [],
    _headerInstanceInitFns: [],
    _reactivity: t,
    _rowInstanceInitFns: [],
    _rowModelFns: {
      aggregationFns: n,
      filterFns: f,
      sortFns: I
    },
    _rowModels: {},
    atoms: {},
    baseAtoms: {}
  }, O = Object.values(C._features), _ = {
    ...O.reduce((K, L) => {
      var ee;
      return Object.assign(K, (ee = L.getDefaultTableOptions) == null ? void 0 : ee.call(L, C));
    }, {}),
    ...e
  };
  if (t.wrapExternalAtoms && _.atoms) for (const [K, L] of Object.entries(_.atoms)) {
    const ee = L, ce = t.createWritableAtom(ee.get(), { debugName: `externalAtom/${K}` });
    _.atoms[K] = ce;
    let Y = !1;
    const me = ee.subscribe((ye) => {
      Y || ce.set(ye);
    }), Ce = ce.subscribe((ye) => {
      Y = !0, ee.set(ye), Y = !1;
    });
    t.addSubscription(me), t.addSubscription(Ce);
  }
  t.createOptionsStore ? (C.optionsStore = t.createWritableAtom(_, { debugName: "table/optionsStore" }), Object.defineProperty(C, "options", {
    configurable: !0,
    enumerable: !0,
    get() {
      return C.optionsStore.get();
    },
    set(K) {
      C.optionsStore.set(() => K);
    }
  })) : C.options = _, C.initialState = Th(C._features, C.options.initialState);
  const D = Object.keys(C.initialState);
  for (let K = 0; K < D.length; K++) {
    const L = D[K];
    C.baseAtoms[L] = t.createWritableAtom(C.initialState[L], { debugName: `table/baseAtoms/${L}` }), C.atoms[L] = t.createReadonlyAtom(() => {
      var Ce;
      const ee = C.options, ce = (Ce = ee.atoms) == null ? void 0 : Ce[L], Y = ce ? ce.get() : C.baseAtoms[L].get();
      if (ce) return Y;
      const me = ee.state;
      if (me && en(me, L)) {
        const ye = me[L];
        return ye === void 0 ? C.initialState[L] : ye;
      }
      return Y;
    }, { debugName: `table/atoms/${L}` });
  }
  Du(C), C.store = Dh(t.createReadonlyAtom(() => {
    const K = {};
    for (let L = 0; L < D.length; L++) {
      const ee = D[L];
      K[ee] = C.atoms[ee].get();
    }
    return K;
  }, {
    compare: kh,
    debugName: "table/store"
  }));
  for (let K = 0; K < O.length; K++) {
    const L = O[K];
    (j = L.initTableInstanceData) == null || j.call(L, C), L.initCellInstanceData && C._cellInstanceInitFns.push(L.initCellInstanceData.bind(L)), L.initColumnInstanceData && C._columnInstanceInitFns.push(L.initColumnInstanceData.bind(L)), L.initHeaderGroupInstanceData && C._headerGroupInstanceInitFns.push(L.initHeaderGroupInstanceData.bind(L)), L.initHeaderInstanceData && C._headerInstanceInitFns.push(L.initHeaderInstanceData.bind(L)), L.initRowInstanceData && C._rowInstanceInitFns.push(L.initRowInstanceData.bind(L)), (U = L.constructTableAPIs) == null || U.call(L, C);
  }
  return C;
}
function Hh() {
  return te();
}
function ku() {
  return {
    size: 150,
    minSize: 20,
    maxSize: Number.MAX_SAFE_INTEGER
  };
}
function Oo(e) {
  var o;
  const t = ku(), n = (o = e.table.atoms.columnSizing) == null ? void 0 : o.get(), r = n && en(n, e.id) ? n[e.id] : void 0;
  return Math.min(Math.max(e.columnDef.minSize ?? t.minSize, r ?? e.columnDef.size ?? t.size), e.columnDef.maxSize ?? t.maxSize);
}
function Wr(e) {
  const t = te(), n = te(), r = new Array(e.length);
  let o = 0;
  for (let l = 0; l < e.length; l++) {
    const a = e[l], c = Z(a, "getSize", Oo);
    r[l] = c, t[a.id] = o, o += c;
  }
  let s = 0;
  for (let l = e.length - 1; l >= 0; l--)
    n[e[l].id] = s, s += r[l];
  return {
    starts: t,
    afters: n
  };
}
function ci(e) {
  return {
    all: Wr($r(e)),
    center: Wr($r(e, "center")),
    start: Wr($r(e, "start")),
    end: Wr($r(e, "end"))
  };
}
function Tu(e) {
  return e === "start" ? "start" : e === "end" ? "end" : e === "center" ? "center" : "all";
}
function Lh(e, t) {
  return Z(e.table, "getColumnOffsets", ci)[Tu(t)].starts[e.id] ?? 0;
}
function jh(e, t) {
  return Z(e.table, "getColumnOffsets", ci)[Tu(t)].afters[e.id] ?? 0;
}
function zh(e) {
  Po(e.table, (t) => {
    const n = te(), r = Object.keys(t);
    for (let o = 0; o < r.length; o++) {
      const s = r[o];
      s !== e.id && (n[s] = t[s]);
    }
    return n;
  });
}
function Fu(e) {
  if (!e.subHeaders.length) return Oo(e.column);
  let t = 0;
  for (let n = 0; n < e.subHeaders.length; n++) t += Fu(e.subHeaders[n]);
  return t;
}
function nn(e) {
  return Fu(e);
}
function Hu(e) {
  var t;
  if (e.index > 0) {
    const n = (t = e.headerGroup) == null ? void 0 : t.headers[e.index - 1];
    if (n) return Z(n, "getStart", Hu) + Z(n, "getSize", nn);
  }
  return 0;
}
function Po(e, t) {
  var n, r;
  (r = (n = e.options).onColumnSizingChange) == null || r.call(n, t);
}
function Kh(e, t) {
  Po(e, t ? te() : Object.assign(te(), gt(e.initialState.columnSizing ?? {})));
}
function Vh(e) {
  var t;
  return ((t = e.getHeaderGroups()[0]) == null ? void 0 : t.headers.reduce((n, r) => n + nn(r), 0)) ?? 0;
}
function Bh(e) {
  var t;
  return ((t = Z(e, "getStartHeaderGroups", qg)[0]) == null ? void 0 : t.headers.reduce((n, r) => n + nn(r), 0)) ?? 0;
}
function Nh(e) {
  var t;
  return ((t = Z(e, "getCenterHeaderGroups", Xg)[0]) == null ? void 0 : t.headers.reduce((n, r) => n + nn(r), 0)) ?? 0;
}
function $h(e) {
  var t;
  return ((t = Z(e, "getEndHeaderGroups", Gg)[0]) == null ? void 0 : t.headers.reduce((n, r) => n + nn(r), 0)) ?? 0;
}
function Ks() {
  return {
    startOffset: null,
    startSize: null,
    deltaOffset: null,
    deltaPercentage: null,
    isResizingColumn: !1,
    columnSizingStart: []
  };
}
function Lu(e) {
  return (e.columnDef.enableResizing ?? !0) && (e.table.options.enableColumnResizing ?? !0);
}
function Wh(e) {
  var t, n;
  return ((n = (t = e.table.atoms.columnResizing) == null ? void 0 : t.get()) == null ? void 0 : n.isResizingColumn) === e.id;
}
function Uh(e, t) {
  const n = e.table.getColumn(e.column.id), r = Lu(n);
  return (o) => {
    if (!r || vs(o) && o.touches.length > 1)
      return;
    const s = nn(e), l = e.getLeafHeaders().map((D) => [D.column.id, Oo(D.column)]), a = vs(o) ? Math.round(o.touches[0].clientX) : o.clientX, c = te(), f = (D, j) => {
      if (typeof j != "number") return;
      const U = n.table, K = U.options.columnResizeMode === "onChange" || D === "end";
      U._reactivity.batch(() => {
        Jn(U, (L) => {
          const ee = U.options.columnResizeDirection === "rtl" ? -1 : 1, ce = (j - (L.startOffset ?? 0)) * ee, Y = L.startSize ?? 0, me = Math.max(Y > 0 ? ce / Y : 0, -0.999999);
          if (K) {
            const Ce = L.columnSizingStart;
            for (let ye = 0; ye < Ce.length; ye++) {
              const G = Ce[ye], J = G[1];
              c[G[0]] = Math.round(Math.max(J > 0 ? J + J * me : ce / Ce.length, 0) * 100) / 100;
            }
          }
          return {
            ...L,
            deltaOffset: ce,
            deltaPercentage: me
          };
        }), K && Po(U, (L) => Object.assign(te(), L, c));
      });
    };
    let d = null, h = !1, w;
    const y = () => {
      h ? (h = !1, f("move", w), d = requestAnimationFrame(y)) : d = null;
    }, I = (D) => {
      if (w = D, typeof requestAnimationFrame != "function") {
        f("move", D);
        return;
      }
      if (d !== null) {
        h = !0;
        return;
      }
      f("move", D), d = requestAnimationFrame(y);
    }, E = (D) => {
      d !== null && (cancelAnimationFrame(d), d = null, h = !1), n.table._reactivity.batch(() => {
        f("end", D ?? w), Jn(n.table, (j) => ({
          ...j,
          isResizingColumn: !1,
          startOffset: null,
          startSize: null,
          deltaOffset: null,
          deltaPercentage: null,
          columnSizingStart: []
        }));
      });
    }, A = t || (typeof document < "u" ? document : null), z = {
      moveHandler: (D) => I(D.clientX),
      upHandler: (D) => {
        A == null || A.removeEventListener("mousemove", z.moveHandler), A == null || A.removeEventListener("mouseup", z.upHandler), E(D.clientX);
      }
    }, C = {
      moveHandler: (D) => (D.cancelable && (D.preventDefault(), D.stopPropagation()), I(D.touches[0].clientX), !1),
      upHandler: (D) => {
        var j;
        O(), D.cancelable && (D.preventDefault(), D.stopPropagation()), E((j = D.touches[0]) == null ? void 0 : j.clientX);
      },
      cancelHandler: () => {
        O(), E();
      }
    }, O = () => {
      A == null || A.removeEventListener("touchmove", C.moveHandler), A == null || A.removeEventListener("touchend", C.upHandler), A == null || A.removeEventListener("touchcancel", C.cancelHandler);
    }, _ = Gh() ? { passive: !1 } : !1;
    vs(o) ? (A == null || A.addEventListener("touchmove", C.moveHandler, _), A == null || A.addEventListener("touchend", C.upHandler, _), A == null || A.addEventListener("touchcancel", C.cancelHandler, _)) : (A == null || A.addEventListener("mousemove", z.moveHandler, _), A == null || A.addEventListener("mouseup", z.upHandler, _)), Jn(n.table, (D) => ({
      ...D,
      startOffset: a,
      startSize: s,
      deltaOffset: 0,
      deltaPercentage: 0,
      columnSizingStart: l,
      isResizingColumn: n.id
    }));
  };
}
function Jn(e, t) {
  var n, r;
  (r = (n = e.options).onColumnResizingChange) == null || r.call(n, t);
}
function qh(e, t) {
  Jn(e, t ? Ks() : gt(e.initialState.columnResizing ?? Ks()));
}
let Ur = null;
function Gh() {
  if (typeof Ur == "boolean") return Ur;
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
  return Ur = e, Ur;
}
function vs(e) {
  return e.type === "touchstart";
}
const Xh = {
  getInitialState: (e) => ({
    columnResizing: Ks(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    columnResizeMode: "onEnd",
    columnResizeDirection: "ltr",
    onColumnResizingChange: dr("columnResizing", e)
  }),
  assignColumnPrototype: (e, t) => {
    et("columnResizingFeature", e, t, {
      column_getCanResize: { fn: (n) => Lu(n) },
      column_getIsResizing: { fn: (n) => Wh(n) }
    });
  },
  assignHeaderPrototype: (e, t) => {
    et("columnResizingFeature", e, t, { header_getResizeHandler: { fn: (n, r) => Uh(n, r) } });
  },
  constructTableAPIs: (e) => {
    pt("columnResizingFeature", e, {
      table_setColumnResizing: { fn: (t) => Jn(e, t) },
      table_resetHeaderSizeInfo: { fn: (t) => qh(e, t) }
    });
  }
}, Yh = {
  getInitialState: (e) => ({
    columnSizing: Hh(),
    ...e
  }),
  getDefaultColumnDef: () => ku(),
  getDefaultTableOptions: (e) => ({ onColumnSizingChange: dr("columnSizing", e) }),
  assignColumnPrototype: (e, t) => {
    et("columnSizingFeature", e, t, {
      column_getSize: {
        fn: (n) => Oo(n),
        memoDeps: (n) => {
          var r, o;
          return [t.options.columns, (o = (r = t.atoms.columnSizing) == null ? void 0 : r.get()) == null ? void 0 : o[n.id]];
        }
      },
      column_getStart: { fn: (n, r) => Lh(n, r) },
      column_getAfter: { fn: (n, r) => jh(n, r) },
      column_resetSize: { fn: (n) => zh(n) }
    });
  },
  assignHeaderPrototype: (e, t) => {
    et("columnSizingFeature", e, t, {
      header_getSize: {
        fn: (n) => nn(n),
        memoDeps: (n) => {
          var r, o, s;
          return [t.options.columns, n.column.columns.length > 0 ? (r = t.atoms.columnSizing) == null ? void 0 : r.get() : (s = (o = t.atoms.columnSizing) == null ? void 0 : o.get()) == null ? void 0 : s[n.column.id]];
        }
      },
      header_getStart: {
        fn: (n) => Hu(n),
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
    pt("columnSizingFeature", e, {
      table_getColumnOffsets: {
        fn: () => ci(e),
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
      table_setColumnSizing: { fn: (t) => Po(e, t) },
      table_resetColumnSizing: { fn: (t) => Kh(e, t) },
      table_getTotalSize: {
        fn: () => Vh(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.columnSizing) == null ? void 0 : t.get(), e.getHeaderGroups()];
        }
      },
      table_getStartTotalSize: {
        fn: () => Bh(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.columnSizing) == null ? void 0 : t.get(), e.getHeaderGroups()];
        }
      },
      table_getCenterTotalSize: {
        fn: () => Nh(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.columnSizing) == null ? void 0 : t.get(), e.getHeaderGroups()];
        }
      },
      table_getEndTotalSize: {
        fn: () => $h(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.columnSizing) == null ? void 0 : t.get(), e.getHeaderGroups()];
        }
      }
    });
  }
}, Zh = {
  getInitialState: (e) => ({
    expanded: Hp(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onExpandedChange: dr("expanded", e),
    paginateExpandedRows: !0
  }),
  assignRowPrototype: (e, t) => {
    et("rowExpandingFeature", e, t, {
      row_toggleExpanded: { fn: (n, r) => bu(n, r) },
      row_getIsExpanded: { fn: (n) => Eo(n) },
      row_getCanExpand: { fn: (n) => Zt(n) },
      row_getIsAllParentsExpanded: { fn: (n) => Kp(n) },
      row_getToggleExpandedHandler: { fn: (n) => Vp(n) }
    });
  },
  constructTableAPIs: (e) => {
    pt("rowExpandingFeature", e, {
      table_autoResetExpanded: { fn: () => hu(e) },
      table_setExpanded: { fn: (t) => ao(e, t) },
      table_toggleAllRowsExpanded: { fn: (t) => mu(e, t) },
      table_resetExpanded: { fn: (t) => vu(e, t) },
      table_getCanSomeRowsExpand: { fn: () => wu(e) },
      table_getToggleAllRowsExpandedHandler: { fn: () => Lp(e) },
      table_getIsSomeRowsExpanded: { fn: () => jp(e) },
      table_getIsAllRowsExpanded: { fn: () => yu(e) },
      table_getExpandedDepth: { fn: () => zp(e) }
    });
  }
};
function Jh() {
  return te();
}
function Rn(e, t) {
  var n, r;
  (r = (n = e.options).onRowSelectionChange) == null || r.call(n, t);
}
function Qh(e, t) {
  e._lastSelectedRowId = null, Rn(e, t ? te() : Object.assign(te(), gt(e.initialState.rowSelection ?? {})));
}
function ju(e, t, n) {
  e._lastSelectedRowId = null, Rn(e, (r) => {
    if (t = typeof t < "u" ? t : !Z(e, "getIsAllRowsSelected", Vu), n != null && n.deselectAll && !t) return te();
    const o = Object.assign(te(), r), s = e.getPreGroupedRowModel().flatRows;
    if (t) {
      const l = /* @__PURE__ */ new Map();
      s.forEach((a) => {
        co(a, l) && (o[a.id] = !0);
      });
    } else s.forEach((l) => {
      It(l) && delete o[l.id];
    });
    return o;
  });
}
function zu(e, t, n) {
  e._lastSelectedRowId = null, Rn(e, (r) => {
    const o = typeof t < "u" ? t : !Z(e, "getIsAllPageRowsSelected", Bu);
    if (n != null && n.deselectAll && !o) return te();
    const s = Object.assign(te(), r);
    return e.getRowModel().rows.forEach((l) => {
      ko(s, l.id, o, !0, e, !0);
    }), s;
  });
}
function em(e) {
  return e.getCoreRowModel();
}
function tm(e) {
  const t = e.getCoreRowModel();
  return Z(e, "getIsSomeRowsSelected", Do) ? gi(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: te()
  };
}
function nm(e) {
  const t = e.getFilteredRowModel();
  return Z(e, "getIsSomeRowsSelected", Do) ? gi(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: te()
  };
}
function rm(e) {
  const t = e.getSortedRowModel();
  return Z(e, "getIsSomeRowsSelected", Do) ? gi(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: te()
  };
}
function Ku(e) {
  var t;
  return Object.keys(((t = e.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function Vu(e) {
  var o;
  const t = e.getFilteredRowModel().flatRows, n = ((o = e.atoms.rowSelection) == null ? void 0 : o.get()) ?? {};
  let r = !!(t.length && Object.keys(n).length);
  if (r) {
    const s = /* @__PURE__ */ new Map();
    t.some((l) => !pr(l, n) && co(l, s)) && (r = !1);
  }
  return r;
}
function Bu(e) {
  var s;
  const t = e.getPaginatedRowModel().flatRows, n = ((s = e.atoms.rowSelection) == null ? void 0 : s.get()) ?? {}, r = /* @__PURE__ */ new Map();
  let o = !1;
  for (let l = 0; l < t.length; l++) {
    const a = t[l];
    if (pr(a, n))
      !o && co(a, r) && (o = !0);
    else if (co(a, r)) return !1;
  }
  return o;
}
function Do(e) {
  return Z(e, "getSelectedRowIds", Ku).length > 0;
}
function om(e) {
  return e.getPaginatedRowModel().flatRows.filter((t) => It(t)).some((t) => fi(t) || Z(t, "getIsSomeSelected", $u));
}
function sm(e) {
  return (t) => {
    ju(e, t.target.checked);
  };
}
function im(e) {
  return (t) => {
    zu(e, t.target.checked);
  };
}
function Nu(e, t, n) {
  const r = fi(e);
  Rn(e.table, (o) => {
    t = typeof t < "u" ? t : !r;
    const s = Object.assign(te(), o);
    return ko(s, e.id, t, ((n == null ? void 0 : n.selectChildren) ?? !0) && Yt(e), e.table), !t && (n != null && n.deselectParents) && Wu(s, e), s;
  });
}
function fi(e) {
  var t;
  return pr(e, ((t = e.table.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function $u(e) {
  return pi(e) === "some";
}
function lm(e) {
  return pi(e) === "all";
}
function It(e) {
  const t = e.table.options;
  return typeof t.enableRowSelection == "function" ? t.enableRowSelection(e) : t.enableRowSelection ?? !0;
}
function di(e) {
  const t = e.table.options;
  return typeof t.enableSubRowSelection == "function" ? t.enableSubRowSelection(e) : t.enableSubRowSelection ?? !0;
}
function Yt(e) {
  const t = e.table.options;
  return typeof t.enableMultiRowSelection == "function" ? t.enableMultiRowSelection(e) : t.enableMultiRowSelection ?? !0;
}
function am(e, t) {
  const n = It(e);
  return (r) => {
    var c, f;
    if (!n) return;
    const o = r, s = e.table, l = o.target.checked, a = s._lastSelectedRowId;
    (!(s.options.enableRowRangeSelection !== !1 && a !== null && Yt(e) && (((f = (c = s.options).isRowRangeSelectionEvent) == null ? void 0 : f.call(c, r)) ?? !1)) || !um(e, a, l, t)) && Nu(e, l, t), s._lastSelectedRowId = e.id;
  };
}
function um(e, t, n, r) {
  const o = (r == null ? void 0 : r.selectChildren) ?? !0, s = e.table, l = s.getRowsInDisplayOrder(), a = s.getPrePaginatedRowModel().rowsById[t] ?? s.getCoreRowModel().rowsById[t];
  if (!a) return !1;
  const c = a.getDisplayIndex(), f = e.getDisplayIndex(), d = l[c], h = l[f];
  if (c < 0 || f < 0 || c >= l.length || f >= l.length || (d == null ? void 0 : d.id) !== a.id || (h == null ? void 0 : h.id) !== e.id || !Yt(a) || !Yt(e)) return !1;
  const w = Math.min(c, f), y = Math.max(c, f);
  return Rn(s, (I) => {
    const E = Object.assign(te(), I);
    for (let A = w; A <= y; A++) {
      const z = l[A];
      !It(z) || !Yt(z) || (ko(E, z.id, n, o, s), !n && (r != null && r.deselectParents) && Wu(E, z));
    }
    return E;
  }), !0;
}
function ko(e, t, n, r, o, s) {
  const l = o.getRow(t, !0);
  n ? (Yt(l) || Object.keys(e).forEach((a) => delete e[a]), It(l) && (e[t] = !0)) : (!s || It(l)) && delete e[t], r && l.subRows.length && di(l) && l.subRows.forEach((a) => ko(e, a.id, n, r, o, s));
}
function co(e, t) {
  if (!It(e)) return !1;
  const n = e.table;
  if (n.options.enableSubRowSelection === !0) return !0;
  const r = e.parentId;
  if (r === void 0) return !0;
  const o = t.get(r);
  if (o !== void 0) return o;
  const s = n.getCoreRowModel().rowsById, l = [];
  let a = !0, c = r;
  for (; c !== void 0; ) {
    const f = t.get(c);
    if (f !== void 0) {
      a = f;
      break;
    }
    l.push(c);
    const d = s[c] ?? n.getRow(c, !0);
    if (!di(d)) {
      a = !1;
      break;
    }
    c = d.parentId;
  }
  return l.forEach((f) => t.set(f, a)), a;
}
function Wu(e, t) {
  const n = t.table.getCoreRowModel().rowsById;
  let r = t.parentId;
  for (; r !== void 0; )
    delete e[r], r = (n[r] ?? t.table.getRow(r, !0)).parentId;
}
function Uu(e, t, n, r) {
  const o = [];
  for (let s = 0; s < e.length; s++) {
    const l = e[s], a = pr(l, t);
    if (a && (n.push(l), r[l.id] = l), l.subRows.length) {
      const c = Uu(l.subRows, t, n, r);
      if (a) {
        const f = Object.create(Object.getPrototypeOf(l));
        nu(f, l), f.subRows = c, o.push(f);
      }
    } else a && o.push(l);
  }
  return o;
}
function gi(e, t) {
  var s;
  const n = [], r = te(), o = ((s = t.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  return {
    rows: Uu(e.rows, o, n, r),
    flatRows: n,
    rowsById: r
  };
}
function pr(e, t) {
  return !!(en(t, e.id) && t[e.id]);
}
function pi(e) {
  var s;
  if (!e.subRows.length) return !1;
  const t = ((s = e.table.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  let n = !1, r = !0, o = !1;
  for (let l = 0; l < e.subRows.length; l++) {
    const a = e.subRows[l];
    if (n && !r) break;
    if (It(a) && (o = !0, pr(a, t) ? n = !0 : r = !1), a.subRows.length) {
      const c = pi(a);
      c === "all" ? (n = !0, o = !0) : c === "some" ? (n = !0, r = !1, o = !0) : r = !1;
    }
  }
  return o ? r ? "all" : n ? "some" : !1 : !1;
}
const cm = {
  initTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  resetTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  getInitialState: (e) => ({
    rowSelection: Jh(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onRowSelectionChange: dr("rowSelection", e),
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
    et("rowSelectionFeature", e, t, {
      row_toggleSelected: { fn: (n, r, o) => Nu(n, r, o) },
      row_getIsSelected: { fn: (n) => fi(n) },
      row_getIsSomeSelected: {
        fn: (n) => $u(n),
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
        fn: (n) => lm(n),
        memoDeps: (n) => {
          var r;
          return [
            n.subRows,
            (r = n.table.atoms.rowSelection) == null ? void 0 : r.get(),
            n.table.options.enableRowSelection
          ];
        }
      },
      row_getCanSelect: { fn: (n) => It(n) },
      row_getCanSelectSubRows: { fn: (n) => di(n) },
      row_getCanMultiSelect: { fn: (n) => Yt(n) },
      row_getToggleSelectedHandler: { fn: (n, r) => am(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    pt("rowSelectionFeature", e, {
      table_setRowSelection: { fn: (t) => Rn(e, t) },
      table_resetRowSelection: { fn: (t) => Qh(e, t) },
      table_toggleAllRowsSelected: { fn: (t, n) => ju(e, t, n) },
      table_toggleAllPageRowsSelected: { fn: (t, n) => zu(e, t, n) },
      table_getPreSelectedRowModel: { fn: () => em(e) },
      table_getSelectedRowModel: {
        fn: () => tm(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getCoreRowModel()];
        }
      },
      table_getFilteredSelectedRowModel: {
        fn: () => nm(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getFilteredRowModel()];
        }
      },
      table_getGroupedSelectedRowModel: {
        fn: () => rm(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getSortedRowModel()];
        }
      },
      table_getSelectedRowIds: {
        fn: () => Ku(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get()];
        }
      },
      table_getIsAllRowsSelected: {
        fn: () => Vu(e),
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
        fn: () => Bu(e),
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
        fn: () => Do(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get()];
        }
      },
      table_getIsSomePageRowsSelected: {
        fn: () => om(e),
        memoDeps: () => {
          var t;
          return [
            (t = e.atoms.rowSelection) == null ? void 0 : t.get(),
            e.getPaginatedRowModel(),
            e.options.enableRowSelection
          ];
        }
      },
      table_getToggleAllRowsSelectedHandler: { fn: () => sm(e) },
      table_getToggleAllPageRowsSelectedHandler: { fn: () => im(e) }
    });
  }
}, fm = {
  getInitialState(e) {
    return {
      sorting: Wp(),
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
      onSortingChange: dr("sorting", e),
      isMultiSortEvent: (t) => t.shiftKey
    };
  },
  assignColumnPrototype(e, t) {
    et("rowSortingFeature", e, t, {
      column_getAutoSortFn: { fn: (n) => xu(n) },
      column_getAutoSortDir: { fn: (n) => Ru(n) },
      column_getSortFn: { fn: (n) => Cu(n) },
      column_toggleSorting: { fn: (n, r, o) => Mu(n, r, o) },
      column_getFirstSortDir: { fn: (n) => Iu(n) },
      column_getNextSortingOrder: { fn: (n, r) => Eu(n, r) },
      column_getCanSort: { fn: (n) => ui(n) },
      column_getCanMultiSort: { fn: (n) => uo(n) },
      column_getIsSorted: { fn: (n) => Au(n) },
      column_getSortIndex: { fn: (n) => qp(n) },
      column_clearSorting: { fn: (n) => Gp(n) },
      column_getToggleSortingHandler: { fn: (n) => Xp(n) }
    });
  },
  constructTableAPIs(e) {
    pt("rowSortingFeature", e, {
      table_setSorting: { fn: (t) => Ao(e, t) },
      table_resetSorting: { fn: (t) => Su(e, t) }
    });
  }
};
function dm() {
  return (e) => {
    const t = e;
    return gr({
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
      fn: () => gm(t)
    });
  };
}
function gm(e) {
  var r;
  const t = e.getPreExpandedRowModel(), n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return !t.rows.length || n !== !0 && !Object.keys(n ?? {}).length || !e.options.paginateExpandedRows && !e.options.manualPagination ? t : pm(t);
}
function pm(e) {
  const t = [], n = (r) => {
    t.push(r), r.subRows.length && Eo(r) && r.subRows.forEach(n);
  };
  return e.rows.forEach(n), {
    rows: t,
    flatRows: e.flatRows,
    rowsById: e.rowsById
  };
}
function hm() {
  return (e) => {
    const t = e;
    return gr({
      feature: "rowSortingFeature",
      table: t,
      fnName: "table.getSortedRowModel",
      memoDeps: () => {
        var n;
        return [(n = t.atoms.sorting) == null ? void 0 : n.get(), t.getPreSortedRowModel()];
      },
      fn: () => mm(t),
      onAfterUpdate: ou(() => _u(t))
    });
  };
}
function mm(e) {
  var c;
  const t = e.getPreSortedRowModel(), n = (c = e.atoms.sorting) == null ? void 0 : c.get();
  if (!t.rows.length || !(n != null && n.length)) return t;
  const r = [], o = n.filter((f) => {
    const d = e.getColumn(f.id);
    return d ? ui(d) : !1;
  });
  if (!o.length) return t;
  const s = [];
  for (let f = 0; f < o.length; f++) {
    const d = o[f], h = e.getColumn(d.id);
    h && s.push({
      id: d.id,
      desc: d.desc,
      sortUndefined: h.columnDef.sortUndefined,
      invertSorting: h.columnDef.invertSorting,
      sortFn: Cu(h)
    });
  }
  const l = (f, d) => {
    for (let h = 0; h < s.length; h++) {
      const w = s[h], y = w.sortUndefined, I = w.desc;
      let E = 0;
      if (y) {
        const A = f.getValue(w.id), z = d.getValue(w.id), C = A === void 0, O = z === void 0;
        if (C && O) continue;
        if (C || O) {
          if (y === "first") return C ? -1 : 1;
          if (y === "last") return C ? 1 : -1;
          E = C ? y : -y;
        }
      }
      if (E === 0 && (E = w.sortFn(f, d, w.id)), E !== 0)
        return I && (E *= -1), w.invertSorting && (E *= -1), E;
    }
    return f.index - d.index;
  }, a = (f) => {
    const d = f.slice();
    d.sort(l);
    let h = !1;
    for (let w = 0; w < d.length; w++) {
      const y = d[w];
      y !== f[w] && (h = !0);
      const I = r.length;
      if (r.push(y), y.subRows.length) {
        const E = a(y.subRows);
        if (E.changed) {
          const A = Object.create(Object.getPrototypeOf(y));
          nu(A, y), A.subRows = E.rows, d[w] = A, r[I] = A, h = !0;
        }
      }
    }
    return {
      rows: d,
      changed: h
    };
  };
  return {
    rows: a(t.rows).rows,
    flatRows: r,
    rowsById: t.rowsById
  };
}
function Ml(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = Gt(e[n]);
  return Hs(e, t);
}
function vm(e) {
  return Object.keys(e).map((t) => Gt(e[t]));
}
function wm(e) {
  const t = (a, c) => {
    a.setOptions((f) => bl(f, Ml(c)));
  }, n = Hg(), r = Hs(e, { features: {
    coreReactivityFeature: n,
    ...Gt(e.features) ?? {}
  } }), o = Hs(Ml(r), { mergeOptions: (a, c) => bl(a, c) }), s = Fh(o), l = s;
  return ra() && Sf(() => {
    var a;
    return (a = n.unmount) == null ? void 0 : a.call(n);
  }), we(() => vm(r), () => {
    t(s, r);
  }, { immediate: !0 }), we(() => {
    const a = Gt(e.state), c = Gt(e.atoms);
    if (!a) return [];
    const f = [];
    for (const d of Object.keys(l.initialState))
      !(d in a) || (c == null ? void 0 : c[d]) !== void 0 || f.push(a[d]);
    return f;
  }, (a) => {
    a.length > 0 && t(s, r);
  }, { immediate: !0 }), l.Subscribe = (a) => a.children(l.atoms), l;
}
function lr(e) {
  "@babel/helpers - typeof";
  return lr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, lr(e);
}
function ym(e, t) {
  if (lr(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (lr(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function bm(e) {
  var t = ym(e, "string");
  return lr(t) == "symbol" ? t : t + "";
}
function hr(e, t, n) {
  return (t = bm(t)) in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function _m(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
    if (t.indexOf(r) !== -1) continue;
    n[r] = e[r];
  }
  return n;
}
function Sm(e, t) {
  if (e == null) return {};
  var n, r, o = _m(e, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    for (r = 0; r < s.length; r++) n = s[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (o[n] = e[n]);
  }
  return o;
}
function qu(e, t) {
  var n = Object.keys(e), r = Object.keys(t);
  return n.length !== r.length ? !1 : n.every(function(o) {
    return Object.is(e[o], t[o]);
  });
}
function xm() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : qu, t = null;
  return function(n) {
    return t && e(t.value, n) || (t = {
      value: n
    }), t.value;
  };
}
var Rm = ["block"];
function Il(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function El(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Il(Object(n), !0).forEach(function(r) {
      hr(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Il(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Cm(e) {
  return {
    x: (e.right + e.left) / 2,
    y: (e.bottom + e.top) / 2
  };
}
function ws(e) {
  var t = e.client, n = e.borderBox, r = n.height / 4;
  return t.y <= n.top + r ? "reorder-above" : t.y >= n.bottom - r ? "reorder-below" : "make-child";
}
function Mm(e) {
  var t = e.element, n = e.input, r = e.currentLevel, o = e.indentPerLevel, s = e.mode, l = {
    x: n.clientX,
    y: n.clientY
  }, a = t.getBoundingClientRect();
  if (s === "standard") {
    var c = ws({
      borderBox: a,
      client: l
    });
    return {
      type: c,
      indentPerLevel: o,
      currentLevel: r
    };
  }
  var f = Cm(a);
  if (s === "expanded") {
    var d = ws({
      borderBox: a,
      client: l
    });
    return {
      // Use the "standard" hitbox for "reorder above",
      // The rest of the item is "make-child"
      type: d === "reorder-above" ? d : "make-child",
      indentPerLevel: o,
      currentLevel: r
    };
  }
  var h = o * r;
  if (l.x < a.left + h) {
    if (l.y < f.y)
      return {
        type: "reorder-above",
        indentPerLevel: o,
        currentLevel: r
      };
    var w = (l.x - a.left) / o, y = Math.max(Math.floor(w), 0);
    return {
      type: "reparent",
      desiredLevel: y,
      indentPerLevel: o,
      currentLevel: r
    };
  }
  return {
    type: ws({
      borderBox: a,
      client: l
    }),
    indentPerLevel: o,
    currentLevel: r
  };
}
function Gu(e, t) {
  return e.type !== t.type ? !1 : e.type === "instruction-blocked" && t.type === "instruction-blocked" ? Gu(e.desired, t.desired) : qu(e, t);
}
var Im = xm(Gu);
function Em(e) {
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
function Am(e, t) {
  var n = t.block, r = Sm(t, Rm), o = Mm(r), s = Em({
    desired: o,
    block: n
  }), l = Im(s);
  return El(El({}, e), {}, hr({}, Xu, l));
}
function Al(e) {
  var t;
  return (t = e[Xu]) !== null && t !== void 0 ? t : null;
}
var Xu = Symbol("tree-item-instruction");
function To() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return function() {
    t.forEach(function(o) {
      return o();
    });
  };
}
function Om(e) {
  if (Array.isArray(e)) return e;
}
function Pm(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r, o, s, l, a = [], c = !0, f = !1;
    try {
      if (s = (n = n.call(e)).next, t !== 0) for (; !(c = (r = s.call(n)).done) && (a.push(r.value), a.length !== t); c = !0) ;
    } catch (d) {
      f = !0, o = d;
    } finally {
      try {
        if (!c && n.return != null && (l = n.return(), Object(l) !== l)) return;
      } finally {
        if (f) throw o;
      }
    }
    return a;
  }
}
function Vs(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Yu(e, t) {
  if (e) {
    if (typeof e == "string") return Vs(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Vs(e, t) : void 0;
  }
}
function Dm() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Zu(e, t) {
  return Om(e) || Pm(e, t) || Yu(e, t) || Dm();
}
var Ol = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Jt = {}, mr = {};
Object.defineProperty(mr, "__esModule", { value: !0 });
mr.bind = void 0;
function km(e, t) {
  var n = t.type, r = t.listener, o = t.options;
  return e.addEventListener(n, r, o), function() {
    e.removeEventListener(n, r, o);
  };
}
mr.bind = km;
var Fo = {}, mn = Ol && Ol.__assign || function() {
  return mn = Object.assign || function(e) {
    for (var t, n = 1, r = arguments.length; n < r; n++) {
      t = arguments[n];
      for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    }
    return e;
  }, mn.apply(this, arguments);
};
Object.defineProperty(Fo, "__esModule", { value: !0 });
Fo.bindAll = void 0;
var Tm = mr;
function Pl(e) {
  if (!(typeof e > "u"))
    return typeof e == "boolean" ? {
      capture: e
    } : e;
}
function Fm(e, t) {
  if (t == null)
    return e;
  var n = mn(mn({}, e), { options: mn(mn({}, Pl(t)), Pl(e.options)) });
  return n;
}
function Hm(e, t, n) {
  var r = t.map(function(o) {
    var s = Fm(o, n);
    return (0, Tm.bind)(e, s);
  });
  return function() {
    r.forEach(function(s) {
      return s();
    });
  };
}
Fo.bindAll = Hm;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.bindAll = e.bind = void 0;
  var t = mr;
  Object.defineProperty(e, "bind", { enumerable: !0, get: function() {
    return t.bind;
  } });
  var n = Fo;
  Object.defineProperty(e, "bindAll", { enumerable: !0, get: function() {
    return n.bindAll;
  } });
})(Jt);
var Ju = "data-pdnd-honey-pot";
function Qu(e) {
  return e instanceof Element && e.hasAttribute(Ju);
}
function ec(e) {
  var t = document.elementsFromPoint(e.x, e.y), n = Zu(t, 2), r = n[0], o = n[1];
  return r ? Qu(r) ? o ?? null : r : null;
}
var Lm = 2147483647, jm = {
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
function rn(e) {
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
var ys = rn(function() {
  return typeof HTMLElement < "u" && typeof HTMLElement.prototype.showPopover == "function";
});
function Dl(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function kl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Dl(Object(n), !0).forEach(function(r) {
      hr(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Dl(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
var ar = 2, Tl = ar / 2;
function zm(e) {
  return {
    x: Math.floor(e.x),
    y: Math.floor(e.y)
  };
}
function Km(e) {
  return {
    x: e.x - Tl,
    y: e.y - Tl
  };
}
function Vm(e) {
  return {
    x: Math.max(e.x, 0),
    y: Math.max(e.y, 0)
  };
}
function Bm(e) {
  return {
    x: Math.min(e.x, window.innerWidth - ar),
    y: Math.min(e.y, window.innerHeight - ar)
  };
}
function Fl(e) {
  var t = e.client, n = Bm(Vm(Km(zm(t))));
  return DOMRect.fromRect({
    x: n.x,
    y: n.y,
    width: ar,
    height: ar
  });
}
function Hl(e) {
  var t = e.clientRect;
  return {
    left: "".concat(t.left, "px"),
    top: "".concat(t.top, "px"),
    width: "".concat(t.width, "px"),
    height: "".concat(t.height, "px")
  };
}
function Nm(e) {
  var t = e.client, n = e.clientRect;
  return (
    // is within horizontal bounds
    t.x >= n.x && t.x <= n.x + n.width && // is within vertical bounds
    t.y >= n.y && t.y <= n.y + n.height
  );
}
function $m(e) {
  var t = e.initial, n = document.createElement("div");
  n.setAttribute(Ju, "true"), ys() && n.setAttribute("popover", "manual");
  var r = Fl({
    client: t
  });
  Object.assign(n.style, kl(kl({
    position: "fixed"
  }, ys() ? (
    // needs to come first as it has 'inset: unset' which
    // needs to be overridden by our top / left values
    jm
  ) : {
    // Fallback: using maximum possible z-index so that this element
    // will always be on top of other positioned content.
    zIndex: Lm
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
  }, Hl({
    clientRect: r
  }))), document.body.appendChild(n), ys() && n.showPopover();
  var o = Jt.bind(window, {
    type: "pointermove",
    listener: function(l) {
      var a = {
        x: l.clientX,
        y: l.clientY
      };
      r = Fl({
        client: a
      }), Object.assign(n.style, Hl({
        clientRect: r
      }));
    },
    // using capture so we are less likely to be impacted by event stopping
    options: {
      capture: !0
    }
  });
  return function(l) {
    var a = l.current;
    if (o(), Nm({
      client: a,
      clientRect: r
    })) {
      n.remove();
      return;
    }
    function c() {
      f(), n.remove();
    }
    var f = Jt.bindAll(window, [
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
function Wm() {
  var e = null;
  function t() {
    return e = null, Jt.bind(window, {
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
      var l = s.eventName, a = s.payload;
      if (l === "onDragStart") {
        var c = a.location.initial.input, f = e ?? {
          x: c.clientX,
          y: c.clientY
        };
        r = $m({
          initial: f
        });
      }
      if (l === "onDrop") {
        var d, h = a.location.current.input;
        (d = r) === null || d === void 0 || d({
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
function Um(e) {
  if (Array.isArray(e)) return Vs(e);
}
function qm(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function Gm() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function tc(e) {
  return Um(e) || qm(e) || Yu(e) || Gm();
}
var Xm = rn(function() {
  return navigator.userAgent.includes("Firefox");
}), hi = rn(function() {
  var t = navigator, n = t.userAgent;
  return n.includes("AppleWebKit") && !n.includes("Chrome");
});
function Ym(e) {
  return "nodeName" in e;
}
function Zm(e) {
  return Ym(e) && e.ownerDocument !== document;
}
var Bs = {
  isLeavingWindow: Symbol("leaving"),
  isEnteringWindow: Symbol("entering")
};
(function() {
  if (typeof window > "u" || !hi())
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
  Jt.bindAll(
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
        !n.isOverWindow && n.enterCount === 0 && (s[Bs.isEnteringWindow] = !0), n.isOverWindow = !0, n.enterCount++;
      }
    }, {
      type: "dragleave",
      listener: function(s) {
        n.enterCount--, n.isOverWindow && n.enterCount === 0 && (s[Bs.isLeavingWindow] = !0, n.isOverWindow = !1);
      }
    }],
    // using `capture: true` so that adding event listeners
    // in bubble phase will have the correct symbols
    {
      capture: !0
    }
  );
})();
function Jm(e) {
  var t = e.dragLeave;
  return hi() ? t.hasOwnProperty(Bs.isLeavingWindow) : !1;
}
function Qm(e) {
  var t = e.dragLeave, n = t.type, r = t.relatedTarget;
  return n !== "dragleave" ? !1 : hi() ? Jm({
    dragLeave: t
  }) : r == null ? !0 : Xm() ? Zm(r) : r instanceof HTMLIFrameElement;
}
function ev(e) {
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
function Qn(e) {
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
var tv = function(t) {
  var n = [], r = null, o = function() {
    for (var l = arguments.length, a = new Array(l), c = 0; c < l; c++)
      a[c] = arguments[c];
    n = a, !r && (r = requestAnimationFrame(function() {
      r = null, t.apply(void 0, n);
    }));
  };
  return o.cancel = function() {
    r && (cancelAnimationFrame(r), r = null);
  }, o;
}, bs = tv(function(e) {
  return e();
}), qr = /* @__PURE__ */ function() {
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
function nv(e) {
  var t = e.source, n = e.initial, r = e.dispatchEvent, o = {
    dropTargets: []
  };
  function s(a) {
    r(a), o = {
      dropTargets: a.payload.location.current.dropTargets
    };
  }
  var l = {
    start: function(c) {
      var f = c.nativeSetDragImage, d = {
        current: n,
        previous: o,
        initial: n
      };
      s({
        eventName: "onGenerateDragPreview",
        payload: {
          source: t,
          location: d,
          nativeSetDragImage: f
        }
      }), qr.schedule(function() {
        s({
          eventName: "onDragStart",
          payload: {
            source: t,
            location: d
          }
        });
      });
    },
    dragUpdate: function(c) {
      var f = c.current;
      qr.flush(), bs.cancel(), s({
        eventName: "onDropTargetChange",
        payload: {
          source: t,
          location: {
            initial: n,
            previous: o,
            current: f
          }
        }
      });
    },
    drag: function(c) {
      var f = c.current;
      bs(function() {
        qr.flush();
        var d = {
          initial: n,
          previous: o,
          current: f
        };
        s({
          eventName: "onDrag",
          payload: {
            source: t,
            location: d
          }
        });
      });
    },
    drop: function(c) {
      var f = c.current, d = c.updatedSourcePayload;
      qr.flush(), bs.cancel(), s({
        eventName: "onDrop",
        payload: {
          source: d ?? t,
          location: {
            current: f,
            previous: o,
            initial: n
          }
        }
      });
    }
  };
  return l;
}
var Ns = {
  isActive: !1
};
function nc() {
  return !Ns.isActive;
}
function rv(e) {
  return e.dataTransfer ? e.dataTransfer.setDragImage.bind(e.dataTransfer) : null;
}
function ov(e) {
  var t = e.current, n = e.next;
  if (t.length !== n.length)
    return !0;
  for (var r = 0; r < t.length; r++)
    if (t[r].element !== n[r].element)
      return !0;
  return !1;
}
function sv(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = e.dispatchEvent;
  if (!nc())
    return;
  var s = iv({
    event: t,
    dragType: n,
    getDropTargetsOver: r
  });
  Ns.isActive = !0;
  var l = {
    current: s
  };
  _s({
    event: t,
    current: s.dropTargets
  });
  var a = nv({
    source: n.payload,
    dispatchEvent: o,
    initial: s
  });
  function c(y) {
    var I = ov({
      current: l.current.dropTargets,
      next: y.dropTargets
    });
    l.current = y, I && a.dragUpdate({
      current: l.current
    });
  }
  function f(y) {
    var I = Qn(y), E = Qu(y.target) ? ec({
      x: I.clientX,
      y: I.clientY
    }) : y.target, A = r({
      target: E,
      input: I,
      source: n.payload,
      current: l.current.dropTargets
    });
    A.length && (y.preventDefault(), _s({
      event: y,
      current: A
    })), c({
      dropTargets: A,
      input: I
    });
  }
  function d() {
    l.current.dropTargets.length && c({
      dropTargets: [],
      input: l.current.input
    }), a.drop({
      current: l.current,
      updatedSourcePayload: null
    }), h();
  }
  function h() {
    Ns.isActive = !1, w();
  }
  var w = Jt.bindAll(
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
        f(I), a.drag({
          current: l.current
        });
      }
    }, {
      type: "dragenter",
      listener: f
    }, {
      type: "dragleave",
      listener: function(I) {
        Qm({
          dragLeave: I
        }) && (c({
          input: l.current.input,
          dropTargets: []
        }), n.startedFrom === "external" && d());
      }
    }, {
      // A "drop" can only happen if the browser allowed the drop
      type: "drop",
      listener: function(I) {
        if (l.current = {
          dropTargets: l.current.dropTargets,
          input: Qn(I)
        }, !l.current.dropTargets.length) {
          d();
          return;
        }
        I.preventDefault(), _s({
          event: I,
          current: l.current.dropTargets
        }), a.drop({
          current: l.current,
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
        l.current = {
          dropTargets: l.current.dropTargets,
          input: Qn(I)
        }, d();
      }
    }].concat(tc(ev({
      onDragEnd: d
    }))),
    // Once we have started a managed drag operation it is important that we see / own all drag events
    // We got one adoption bug pop up where some code was stopping (`event.stopPropagation()`)
    // all "drop" events in the bubble phase on the `document.body`.
    // This meant that we never saw the "drop" event.
    {
      capture: !0
    }
  );
  a.start({
    nativeSetDragImage: rv(t)
  });
}
function _s(e) {
  var t, n = e.event, r = e.current, o = (t = r[0]) === null || t === void 0 ? void 0 : t.dropEffect;
  o != null && n.dataTransfer && (n.dataTransfer.dropEffect = o);
}
function iv(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = Qn(t);
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
var Ll = {
  canStart: nc,
  start: sv
}, $s = /* @__PURE__ */ new Map();
function lv(e) {
  var t = e.typeKey, n = e.mount, r = $s.get(t);
  if (r)
    return r.usageCount++, r;
  var o = {
    typeKey: t,
    unmount: n(),
    usageCount: 1
  };
  return $s.set(t, o), o;
}
function av(e) {
  var t = lv(e);
  return function() {
    t.usageCount--, !(t.usageCount > 0) && (t.unmount(), $s.delete(e.typeKey));
  };
}
function rc(e, t) {
  var n = t.attribute, r = t.value;
  return e.setAttribute(n, r), function() {
    return e.removeAttribute(n);
  };
}
function jl(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function kt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? jl(Object(n), !0).forEach(function(r) {
      hr(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : jl(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Ss(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = uv(e)) || t) {
      n && (e = n);
      var r = 0, o = function() {
      };
      return { s: o, n: function() {
        return r >= e.length ? { done: !0 } : { done: !1, value: e[r++] };
      }, e: function(f) {
        throw f;
      }, f: o };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var s, l = !0, a = !1;
  return { s: function() {
    n = n.call(e);
  }, n: function() {
    var f = n.next();
    return l = f.done, f;
  }, e: function(f) {
    a = !0, s = f;
  }, f: function() {
    try {
      l || n.return == null || n.return();
    } finally {
      if (a) throw s;
    }
  } };
}
function uv(e, t) {
  if (e) {
    if (typeof e == "string") return zl(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? zl(e, t) : void 0;
  }
}
function zl(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function xs(e) {
  return e.slice(0).reverse();
}
function cv(e) {
  var t = e.typeKey, n = e.defaultDropEffect, r = /* @__PURE__ */ new WeakMap(), o = "data-drop-target-for-".concat(t), s = "[".concat(o, "]");
  function l(y) {
    return r.set(y.element, y), function() {
      return r.delete(y.element);
    };
  }
  function a(y) {
    var I = To(rc(y.element, {
      attribute: o,
      value: "true"
    }), l(y));
    return rn(I);
  }
  function c(y) {
    var I, E, A, z, C = y.source, O = y.target, _ = y.input, D = y.result, j = D === void 0 ? [] : D;
    if (O == null)
      return j;
    if (!(O instanceof Element))
      return O instanceof Node ? c({
        source: C,
        target: O.parentElement,
        input: _,
        result: j
      }) : j;
    var U = O.closest(s);
    if (U == null)
      return j;
    var K = r.get(U);
    if (K == null)
      return j;
    var L = {
      input: _,
      source: C,
      element: K.element
    };
    if (K.canDrop && !K.canDrop(L))
      return c({
        source: C,
        target: K.element.parentElement,
        input: _,
        result: j
      });
    var ee = (I = (E = K.getData) === null || E === void 0 ? void 0 : E.call(K, L)) !== null && I !== void 0 ? I : {}, ce = (A = (z = K.getDropEffect) === null || z === void 0 ? void 0 : z.call(K, L)) !== null && A !== void 0 ? A : n, Y = {
      data: ee,
      element: K.element,
      dropEffect: ce,
      // we are collecting _actual_ drop targets, so these are
      // being applied _not_ due to stickiness
      isActiveDueToStickiness: !1
    };
    return c({
      source: C,
      target: K.element.parentElement,
      input: _,
      // Using bubble ordering. Same ordering as `event.getPath()`
      result: [].concat(tc(j), [Y])
    });
  }
  function f(y) {
    var I = y.eventName, E = y.payload, A = Ss(E.location.current.dropTargets), z;
    try {
      for (A.s(); !(z = A.n()).done; ) {
        var C, O = z.value, _ = r.get(O.element), D = kt(kt({}, E), {}, {
          self: O
        });
        _ == null || (C = _[I]) === null || C === void 0 || C.call(
          _,
          // I cannot seem to get the types right here.
          // TS doesn't seem to like that one event can need `nativeSetDragImage`
          // @ts-expect-error
          D
        );
      }
    } catch (j) {
      A.e(j);
    } finally {
      A.f();
    }
  }
  var d = {
    onGenerateDragPreview: f,
    onDrag: f,
    onDragStart: f,
    onDrop: f,
    onDropTargetChange: function(I) {
      var E = I.payload, A = new Set(E.location.current.dropTargets.map(function(J) {
        return J.element;
      })), z = /* @__PURE__ */ new Set(), C = Ss(E.location.previous.dropTargets), O;
      try {
        for (C.s(); !(O = C.n()).done; ) {
          var _, D = O.value;
          z.add(D.element);
          var j = r.get(D.element), U = A.has(D.element), K = kt(kt({}, E), {}, {
            self: D
          });
          if (j == null || (_ = j.onDropTargetChange) === null || _ === void 0 || _.call(j, K), !U) {
            var L;
            j == null || (L = j.onDragLeave) === null || L === void 0 || L.call(j, K);
          }
        }
      } catch (J) {
        C.e(J);
      } finally {
        C.f();
      }
      var ee = Ss(E.location.current.dropTargets), ce;
      try {
        for (ee.s(); !(ce = ee.n()).done; ) {
          var Y, me, Ce = ce.value;
          if (!z.has(Ce.element)) {
            var ye = kt(kt({}, E), {}, {
              self: Ce
            }), G = r.get(Ce.element);
            G == null || (Y = G.onDropTargetChange) === null || Y === void 0 || Y.call(G, ye), G == null || (me = G.onDragEnter) === null || me === void 0 || me.call(G, ye);
          }
        }
      } catch (J) {
        ee.e(J);
      } finally {
        ee.f();
      }
    }
  };
  function h(y) {
    d[y.eventName](y);
  }
  function w(y) {
    var I = y.source, E = y.target, A = y.input, z = y.current, C = c({
      source: I,
      target: E,
      input: A
    });
    if (C.length >= z.length)
      return C;
    for (var O = xs(z), _ = xs(C), D = [], j = 0; j < O.length; j++) {
      var U, K = O[j], L = _[j];
      if (L != null) {
        D.push(L);
        continue;
      }
      var ee = D[j - 1], ce = O[j - 1];
      if ((ee == null ? void 0 : ee.element) !== (ce == null ? void 0 : ce.element))
        break;
      var Y = r.get(K.element);
      if (!Y)
        break;
      var me = {
        input: A,
        source: I,
        element: Y.element
      };
      if (Y.canDrop && !Y.canDrop(me) || !((U = Y.getIsSticky) !== null && U !== void 0 && U.call(Y, me)))
        break;
      D.push(kt(kt({}, K), {}, {
        // making it clear to consumers this drop target is active due to stickiness
        isActiveDueToStickiness: !0
      }));
    }
    return xs(D);
  }
  return {
    dropTargetForConsumers: a,
    getIsOver: w,
    dispatchEvent: h
  };
}
function fv(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = dv(e)) || t) {
      n && (e = n);
      var r = 0, o = function() {
      };
      return { s: o, n: function() {
        return r >= e.length ? { done: !0 } : { done: !1, value: e[r++] };
      }, e: function(f) {
        throw f;
      }, f: o };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var s, l = !0, a = !1;
  return { s: function() {
    n = n.call(e);
  }, n: function() {
    var f = n.next();
    return l = f.done, f;
  }, e: function(f) {
    a = !0, s = f;
  }, f: function() {
    try {
      l || n.return == null || n.return();
    } finally {
      if (a) throw s;
    }
  } };
}
function dv(e, t) {
  if (e) {
    if (typeof e == "string") return Kl(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Kl(e, t) : void 0;
  }
}
function Kl(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Vl(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function gv(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Vl(Object(n), !0).forEach(function(r) {
      hr(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Vl(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function pv() {
  var e = /* @__PURE__ */ new Set(), t = null;
  function n(s) {
    t && (!s.canMonitor || s.canMonitor(t.canMonitorArgs)) && t.active.add(s);
  }
  function r(s) {
    var l = gv({}, s);
    e.add(l), n(l);
    function a() {
      e.delete(l), t && t.active.delete(l);
    }
    return rn(a);
  }
  function o(s) {
    var l = s.eventName, a = s.payload;
    if (l === "onGenerateDragPreview") {
      t = {
        canMonitorArgs: {
          initial: a.location.initial,
          source: a.source
        },
        active: /* @__PURE__ */ new Set()
      };
      var c = fv(e), f;
      try {
        for (c.s(); !(f = c.n()).done; ) {
          var d = f.value;
          n(d);
        }
      } catch (A) {
        c.e(A);
      } finally {
        c.f();
      }
    }
    if (t) {
      for (var h = Array.from(t.active), w = 0, y = h; w < y.length; w++) {
        var I = y[w];
        if (t.active.has(I)) {
          var E;
          (E = I[l]) === null || E === void 0 || E.call(I, a);
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
function hv(e) {
  var t = e.typeKey, n = e.mount, r = e.dispatchEventToSource, o = e.onPostDispatch, s = e.defaultDropEffect, l = pv(), a = cv({
    typeKey: t,
    defaultDropEffect: s
  });
  function c(h) {
    r == null || r(h), a.dispatchEvent(h), l.dispatchEvent(h), o == null || o(h);
  }
  function f(h) {
    var w = h.event, y = h.dragType;
    Ll.start({
      event: w,
      dragType: y,
      getDropTargetsOver: a.getIsOver,
      dispatchEvent: c
    });
  }
  function d() {
    function h() {
      var w = {
        canStart: Ll.canStart,
        start: f
      };
      return n(w);
    }
    return av({
      typeKey: t,
      mount: h
    });
  }
  return {
    registerUsage: d,
    dropTarget: a.dropTargetForConsumers,
    monitor: l.monitorForConsumers
  };
}
var mv = rn(function() {
  return navigator.userAgent.toLocaleLowerCase().includes("android");
}), vv = "pdnd:android-fallback", Bl = "text/plain", wv = "text/uri-list", yv = "application/vnd.pdnd", fo = /* @__PURE__ */ new WeakMap();
function bv(e) {
  return fo.set(e.element, e), function() {
    fo.delete(e.element);
  };
}
var Nl = Wm(), oc = hv({
  typeKey: "element",
  defaultDropEffect: "move",
  mount: function(t) {
    return To(Nl.bindEvents(), Jt.bind(document, {
      type: "dragstart",
      listener: function(r) {
        var o, s, l, a, c, f;
        if (t.canStart(r) && !r.defaultPrevented && r.dataTransfer) {
          var d = r.target;
          if (d instanceof HTMLElement) {
            var h = fo.get(d);
            if (h) {
              var w = Qn(r), y = {
                element: h.element,
                dragHandle: (o = h.dragHandle) !== null && o !== void 0 ? o : null,
                input: w
              };
              if (h.canDrag && !h.canDrag(y)) {
                r.preventDefault();
                return;
              }
              if (h.dragHandle) {
                var I = ec({
                  x: w.clientX,
                  y: w.clientY
                });
                if (!h.dragHandle.contains(I)) {
                  r.preventDefault();
                  return;
                }
              }
              var E = (s = (l = h.getInitialDataForExternal) === null || l === void 0 ? void 0 : l.call(h, y)) !== null && s !== void 0 ? s : null;
              if (E)
                for (var A = 0, z = Object.entries(E); A < z.length; A++) {
                  var C = Zu(z[A], 2), O = C[0], _ = C[1];
                  r.dataTransfer.setData(O, _ ?? "");
                }
              mv() && !r.dataTransfer.types.includes(Bl) && !r.dataTransfer.types.includes(wv) && r.dataTransfer.setData(Bl, vv), r.dataTransfer.setData(yv, "");
              var D = {
                element: h.element,
                dragHandle: (a = h.dragHandle) !== null && a !== void 0 ? a : null,
                data: (c = (f = h.getInitialData) === null || f === void 0 ? void 0 : f.call(h, y)) !== null && c !== void 0 ? c : {}
              }, j = {
                type: "element",
                payload: D,
                startedFrom: "internal"
              };
              t.start({
                event: r,
                dragType: j
              });
            }
          }
        }
      }
    }));
  },
  dispatchEventToSource: function(t) {
    var n, r, o = t.eventName, s = t.payload;
    (n = fo.get(s.source.element)) === null || n === void 0 || (r = n[o]) === null || r === void 0 || r.call(
      n,
      // I cannot seem to get the types right here.
      // TS doesn't seem to like that one event can need `nativeSetDragImage`
      // @ts-expect-error
      s
    );
  },
  onPostDispatch: Nl.getOnPostDispatch()
}), _v = oc.dropTarget;
function Sv(e) {
  var t = To(
    // making the draggable register the adapter rather than drop targets
    // this is because you *must* have a draggable element to start a drag
    // but you _might_ not have any drop targets immediately
    // (You might create drop targets async)
    oc.registerUsage(),
    bv(e),
    rc(e.element, {
      attribute: "draggable",
      value: "true"
    })
  );
  return rn(t);
}
const Rs = /* @__PURE__ */ new Map(), bn = "pnl-tst-row";
function xv(e, t) {
  return To(
    Sv({
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
        return { type: bn, group: "", sourceId: "", key: null, keys: [] };
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
    _v({
      element: e,
      // Position is deliberately not consulted here. pdnd settles `canDrop` when
      // the pointer enters the element, and the element is the whole layout, so an
      // answer given from the pointer's first position would stand for the rest of
      // the drag. Which pane the pointer is over, and whether that pane accepts
      // the drag at all, is decided in `getData`, which runs on every move.
      canDrop: ({ source: n }) => n.data.type === bn,
      getData: ({ input: n, source: r }) => {
        for (const o of t.panes) {
          const s = o.dropData(n, r.data);
          if (s) return s;
        }
        return { type: bn, key: null, paneId: "" };
      },
      onDrag: ({ self: n }) => {
        const r = n.data.key, o = Al(n.data);
        for (const s of t.panes)
          s.id() === n.data.paneId && r && o ? s.showDrop(r, o) : s.clearDrop();
      },
      onDragLeave: () => {
        for (const n of t.panes) n.clearDrop();
      },
      onDrop: ({ self: n, source: r, location: o }) => {
        for (const c of t.panes) c.clearDrop();
        const s = t.panes.find((c) => c.id() === n.data.paneId), l = n.data.key, a = Al(n.data);
        !s || !l || !a || a.type === "instruction-blocked" || s.drop(r.data, l, a, o.current.input);
      }
    })
  );
}
function Rv(e, t) {
  let n = Rs.get(e);
  return n || (n = { panes: [] }, n.cleanup = xv(e, n), Rs.set(e, n)), n.panes.push(t), () => {
    var r;
    n.panes = n.panes.filter((o) => o !== t), !(n.panes.length > 0) && ((r = n.cleanup) == null || r.call(n), Rs.delete(e));
  };
}
const Cv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ef5350" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m6 10h-4v8a4 4 0 1 1-4-4 3.96 3.96 0 0 1 2 .555V8h6Z"/></svg>', Mv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#ff7043" d="M2 2a1 1 0 0 0-1 1v10c0 .554.446 1 1 1h12c.554 0 1-.446 1-1V3a1 1 0 0 0-1-1zm0 3h12v8H2zm1 2 2 2-2 2 1 1 3-3-3-3zm5 3.5V12h5v-1.5z"/></svg>', Iv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#7e57c2" d="M20 18h-2v-2h-2v2c0 .193 0 .703 1.254 1.033A3.345 3.345 0 0 1 20 22h2v2h2v-2c0-.388-.562-.851-1.254-1.034C20.356 20.34 20 18.84 20 18m-3.254 2.966C14.356 20.34 14 18.84 14 18h-2v-2h-2v8h2v-2h4v2h2v-2c0-.388-.562-.851-1.254-1.034"/><path fill="#7e57c2" d="M24 4H4v20a4 4 0 0 0 4 4h16.16A3.84 3.84 0 0 0 28 24.16V8a4 4 0 0 0-4-4m2 14h-2v-2h-2v2c0 .193 0 .703 1.254 1.033A3.345 3.345 0 0 1 26 22v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1 2-2h2a2 2 0 0 1 2 2Z"/></svg>', Ev = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ffca28" d="M16 24c-5.525 0-10-.9-10-2v4c0 1.1 4.475 2 10 2s10-.9 10-2v-4c0 1.1-4.475 2-10 2m0-8c-5.525 0-10-.9-10-2v4c0 1.1 4.475 2 10 2s10-.9 10-2v-4c0 1.1-4.475 2-10 2m0-12C10.477 4 6 4.895 6 6v4c0 1.1 4.475 2 10 2s10-.9 10-2V6c0-1.105-4.477-2-10-2"/></svg>', Av = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/><path fill="#42a5f5" d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5z"/></svg>', Ov = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m8.668 6h3.6641l-3.6641-3.668v3.668m-4.668-4.668h5.332l4 4v8c0 0.73828-0.59375 1.3359-1.332 1.3359h-8c-0.73828 0-1.332-0.59766-1.332-1.3359v-10.664c0-0.74219 0.59375-1.3359 1.332-1.3359m3.332 1.3359h-3.332v10.664h8v-6h-4.668z" fill="#90a4ae" /></svg>', Pv = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m6.922 3.768-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232" fill="#90a4ae" /></svg>', Dv = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.483 6H4.721a1 1 0 0 0-.949.684L2 12V5h12a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232l-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h11l2.403-5.606A1 1 0 0 0 14.483 6" fill="#90a4ae" /></svg>', kv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#e65100" d="m4 4 2 22 10 2 10-2 2-22Zm19.72 7H11.28l.29 3h11.86l-.802 9.335L15.99 25l-6.635-1.646L8.93 19h3.02l.19 2 3.86.77 3.84-.77.29-4H8.84L8 8h16Z"/></svg>', Tv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#26a69a" d="M8.5 6h4l-4-4zM3.875 1H9.5l4 4v8.6c0 .773-.616 1.4-1.375 1.4h-8.25c-.76 0-1.375-.627-1.375-1.4V2.4c0-.777.612-1.4 1.375-1.4M4 13.6h8V8l-2.625 2.8L8 9.4zm1.25-7.7c-.76 0-1.375.627-1.375 1.4s.616 1.4 1.375 1.4c.76 0 1.375-.627 1.375-1.4S6.009 5.9 5.25 5.9"/></svg>', Fv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#ffca28" d="M2 2v12h12V2zm6 6h1v4a1.003 1.003 0 0 1-1 1H7a1.003 1.003 0 0 1-1-1v-1h1v1h1zm3 0h2v1h-2v1h1a1.003 1.003 0 0 1 1 1v1a1.003 1.003 0 0 1-1 1h-2v-1h2v-1h-1a1.003 1.003 0 0 1-1-1V9a1.003 1.003 0 0 1 1-1"/></svg>', Hv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path fill="#f9a825" d="M560-160v-80h120q17 0 28.5-11.5T720-280v-80q0-38 22-69t58-44v-14q-36-13-58-44t-22-69v-80q0-17-11.5-28.5T680-720H560v-80h120q50 0 85 35t35 85v80q0 17 11.5 28.5T840-560h40v160h-40q-17 0-28.5 11.5T800-360v80q0 50-35 85t-85 35zm-280 0q-50 0-85-35t-35-85v-80q0-17-11.5-28.5T120-400H80v-160h40q17 0 28.5-11.5T160-600v-80q0-50 35-85t85-35h120v80H280q-17 0-28.5 11.5T240-680v80q0 38-22 69t-58 44v14q36 13 58 44t22 69v80q0 17 11.5 28.5T280-240h120v80z"/></svg>', Lv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#42a5f5" d="m14 10-4 3.5L6 10H4v12h4v-6l2 2 2-2v6h4V10zm12 6v-6h-4v6h-4l6 8 6-8z"/></svg>', jv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ef5350" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m4.93 10.44c.41.9.93 1.64 1.53 2.15l.41.32c-.87.16-2.07.44-3.34.93l-.11.04.5-1.04c.45-.87.78-1.66 1.01-2.4m6.48 3.81c.18-.18.27-.41.28-.66.03-.2-.02-.39-.12-.55-.29-.47-1.04-.69-2.28-.69l-1.29.07-.87-.58c-.63-.52-1.2-1.43-1.6-2.56l.04-.14c.33-1.33.64-2.94-.02-3.6a.85.85 0 0 0-.61-.24h-.24c-.37 0-.7.39-.79.77-.37 1.33-.15 2.06.22 3.27v.01c-.25.88-.57 1.9-1.08 2.93l-.96 1.8-.89.49c-1.2.75-1.77 1.59-1.88 2.12-.04.19-.02.36.05.54l.03.05.48.31.44.11c.81 0 1.73-.95 2.97-3.07l.18-.07c1.03-.33 2.31-.56 4.03-.75 1.03.51 2.24.74 3 .74.44 0 .74-.11.91-.3m-.41-.71.09.11c-.01.1-.04.11-.09.13h-.04l-.19.02c-.46 0-1.17-.19-1.9-.51.09-.1.13-.1.23-.1 1.4 0 1.8.25 1.9.35M7.83 17c-.65 1.19-1.24 1.85-1.69 2 .05-.38.5-1.04 1.21-1.69zm3.02-6.91c-.23-.9-.24-1.63-.07-2.05l.07-.12.15.05c.17.24.19.56.09 1.1l-.03.16-.16.82z"/></svg>', zv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#e64a19" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zM8 11v2h1v6H8v1h4v-1h-1v-2h2a3 3 0 0 0 3-3 3 3 0 0 0-3-3zm5 2a1 1 0 0 1 1 1 1 1 0 0 1-1 1h-2v-2z"/></svg>', Kv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#0288d1" d="M9.86 2A2.86 2.86 0 0 0 7 4.86v1.68h4.29c.39 0 .71.57.71.96H4.86A2.86 2.86 0 0 0 2 10.36v3.781a2.86 2.86 0 0 0 2.86 2.86h1.18v-2.68a2.85 2.85 0 0 1 2.85-2.86h5.25c1.58 0 2.86-1.271 2.86-2.851V4.86A2.86 2.86 0 0 0 14.14 2zm-.72 1.61c.4 0 .72.12.72.71s-.32.891-.72.891c-.39 0-.71-.3-.71-.89s.32-.711.71-.711"/><path fill="#fdd835" d="M17.959 7v2.68a2.85 2.85 0 0 1-2.85 2.859H9.86A2.85 2.85 0 0 0 7 15.389v3.75a2.86 2.86 0 0 0 2.86 2.86h4.28A2.86 2.86 0 0 0 17 19.14v-1.68h-4.291c-.39 0-.709-.57-.709-.96h7.14A2.86 2.86 0 0 0 22 13.64V9.86A2.86 2.86 0 0 0 19.14 7zM8.32 11.513l-.004.004.038-.004zm6.54 7.276c.39 0 .71.3.71.89a.71.71 0 0 1-.71.71c-.4 0-.72-.12-.72-.71s.32-.89.72-.89"/></svg>', Vv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#8bc34a" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zm4 7.5h-4v2h1l-2 1.67L10 13h1v-2H7v2h1l3 2.5L8 18H7v2h4v-2h-1l2-1.67L14 18h-1v2h4v-2h-1l-3-2.5 3-2.5h1z"/></svg>', Bv = '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 16 16"><path fill="#0288d1" d="M2 2v12h12V2zm4 6h3v1H8v4H7V9H6zm5 0h2v1h-2v1h1a1.003 1.003 0 0 1 1 1v1a1.003 1.003 0 0 1-1 1h-2v-1h2v-1h-1a1.003 1.003 0 0 1-1-1V9a1.003 1.003 0 0 1 1-1"/></svg>', Nv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ff9800" d="m24 6 2 6h-4l-2-6h-3l2 6h-4l-2-6h-3l2 6H8L6 6H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3V6Z"/></svg>', $v = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#01579b" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zM7 13l1.5 7h2l1.5-3 1.5 3h2l1.5-7h1v-2h-4v2h1l-.9 4.2L13 15h-2l-1.1 2.2L9 13h1v-2H6v2z"/></svg>', Wv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#8bc34a" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m.12 13.5 3.74 3.74 1.42-1.41-2.33-2.33 2.33-2.33-1.42-1.41zm11.16 0-3.74-3.74-1.42 1.41 2.33 2.33-2.33 2.33 1.42 1.41z"/></svg>', Uv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ff5252" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2m12 16v-2H9v2zm-4-4v-2H6v2z"/></svg>', qv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#afb42b" d="M14 17h-2v-2h-2v-2h2v2h2m0-6h-2v2h2v2h-2v-2h-2V9h2V7h-2V5h2v2h2m5-4H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2"/></svg>', $l = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, Wl = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, Gv = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, Xv = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, Yv = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, Zv = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, Jv = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, Qv = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, e0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, t0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, n0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, r0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, o0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, s0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, i0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, l0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, a0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, u0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, c0 = ["aria-label"], f0 = {
  key: 0,
  class: "pnl-tst-tsep",
  "aria-hidden": "true"
}, d0 = {
  key: 1,
  class: "pnl-tst-search"
}, g0 = ["innerHTML"], p0 = ["value", "aria-label", "placeholder"], h0 = ["aria-label", "aria-keyshortcuts", "aria-disabled", "title", "tabindex", "onClick", "onFocus"], m0 = ["innerHTML"], v0 = {
  key: 1,
  class: "pnl-tst-empty"
}, w0 = ["aria-label", "aria-colcount", "aria-rowcount"], y0 = {
  class: "pnl-tst-hrow",
  role: "row",
  "aria-rowindex": 1
}, b0 = ["aria-colindex", "aria-sort", "aria-keyshortcuts", "tabindex", "onClick", "onFocus", "onKeydown"], _0 = { class: "pnl-tst-hlabel" }, S0 = ["innerHTML"], x0 = ["onDblclick", "onMousedown", "onTouchstart"], R0 = ["aria-level", "aria-posinset", "aria-setsize", "aria-rowindex", "aria-expanded", "aria-busy", "aria-selected", "aria-haspopup", "tabindex", "onClick", "onContextmenu", "onFocus"], C0 = ["aria-colindex"], M0 = ["onClick"], I0 = {
  key: 1,
  class: "pnl-tst-twisty pnl-tst-twisty--leaf",
  "aria-hidden": "true"
}, E0 = ["checked", ".indeterminate", "aria-label", "onClick"], A0 = ["innerHTML"], O0 = ["value", "aria-label", "onKeydown", "onBlur"], P0 = {
  key: 2,
  class: "pnl-tst-value"
}, D0 = {
  key: 3,
  class: "pnl-tst-modal"
}, k0 = {
  id: "pnl-tst-confirm-message",
  class: "pnl-tst-dialog-message"
}, T0 = { class: "pnl-tst-dialog-actions" }, F0 = ["aria-label"], H0 = {
  key: 0,
  class: "pnl-tst-msep",
  role: "separator"
}, L0 = ["aria-keyshortcuts", "aria-disabled", "tabindex", "onClick", "onFocus"], j0 = ["innerHTML"], z0 = { class: "pnl-tst-mlabel" }, K0 = {
  key: 0,
  class: "pnl-tst-mkeys",
  "aria-hidden": "true"
}, V0 = "title", B0 = 200, Ul = 16, ql = 6, N0 = 40, Bn = "search", Tt = "|", pn = 4, $0 = 500, W0 = {
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
    setEditingKey: { type: Function, required: !0 },
    // Two-way sync of the sort, as a list of {id, desc}.
    setSorting: { type: Function, required: !0 },
    // Two-way sync of the resized column widths, as a map of column id to pixels.
    setColumnWidths: { type: Function, required: !0 }
  },
  setup(e) {
    const t = e, n = {
      columnSizingFeature: Yh,
      columnResizingFeature: Xh,
      rowExpandingFeature: Zh,
      rowSelectionFeature: cm,
      rowSortingFeature: fm,
      coreRowModel: Ou(),
      expandedRowModel: dm(),
      sortedRowModel: hm(),
      sortFns: { alphanumeric: Ep, text: Ap }
    }, r = W(() => (t.state.columns || []).length > 0), o = W(() => r.value && t.state.options.sortable !== !1), s = W(() => t.state.options.sort_folders_first === !0), l = W(() => r.value && t.state.options.resizable !== !1), a = W(() => {
      const i = t.state.columns || [];
      return i.length === 0 ? [{ id: V0, header: "", accessorFn: (u) => u.title }] : i.map((u) => {
        const g = u.field ?? u.id;
        return {
          id: u.id,
          header: u.header ?? u.id,
          // Through the type registry, because a type may carry a column value just as
          // it carries an icon, and because Python reads the same fields the same way
          // when it decides what a search reaches inside a pruned branch.
          accessorFn: (v) => f(v, g),
          enableSorting: u.sortable !== !1,
          enableResizing: u.resizable !== !1,
          // Written only where Python actually declared one, so the rest fall back to
          // TanStack's own defaults (150 wide, no narrower than 20) rather than to a
          // second set of numbers kept here.
          ...c("size", u.width),
          ...c("minSize", u.min_width),
          ...c("maxSize", u.max_width),
          // Only set when asked for, so an ordinary table keeps TanStack's own
          // detection of what a column holds rather than routing through ours.
          ...s.value ? { sortFn: h } : {}
        };
      });
    });
    function c(i, u) {
      return typeof u == "number" && Number.isFinite(u) ? { [i]: u } : {};
    }
    function f(i, u) {
      const g = i == null ? void 0 : i[u];
      if (g !== void 0) return g;
      const v = (t.state.types || {})[i == null ? void 0 : i.type];
      return v && typeof v == "object" ? v[u] : void 0;
    }
    function d(i) {
      return i.subRows.length > 0 || f(i.original, "allow_children") !== !1;
    }
    function h(i, u, g) {
      const v = d(i);
      if (v !== d(u)) {
        const k = K.value.some((B) => B.id === g && B.desc);
        return (v ? -1 : 1) * (k ? -1 : 1);
      }
      return G.getColumn(g).getAutoSortFn()(i, u, g);
    }
    const w = /* @__PURE__ */ ne(y(t.state.expandedKeys));
    function y(i) {
      const u = {};
      for (const g of i || []) u[g] = !0;
      return u;
    }
    function I(i) {
      return i === !0 ? G.getCoreRowModel().flatRows.filter((u) => u.subRows.length > 0).map((u) => u.id).sort() : Object.keys(i).filter((u) => i[u]).sort();
    }
    const E = {
      audio: Cv,
      console: Mv,
      css: Iv,
      database: Ev,
      document: Av,
      file: Ov,
      folder: Pv,
      "folder-open": Dv,
      html: kv,
      image: Tv,
      javascript: Fv,
      json: Hv,
      markdown: Lv,
      pdf: jv,
      powerpoint: zv,
      python: Kv,
      table: Vv,
      typescript: Bv,
      video: Nv,
      word: $v,
      xml: Wv,
      yaml: Uv,
      zip: qv
    };
    function A(i) {
      return i ? { ...E, ...t.state.icons || {} }[i] ?? null : null;
    }
    function z(i) {
      const u = f(i.original, "icon");
      return u ? (Ot(i) ? A(`${u}-open`) : null) ?? A(u) : null;
    }
    function C(i, u) {
      return i.length !== u.length ? !1 : i.every((g, v) => g === u[v]);
    }
    const O = W(() => t.state.options.select_mode ?? "none"), _ = W(() => O.value !== "none"), D = W(() => O.value === "hierarchy"), j = W(
      () => _.value && t.state.options.show_checkboxes !== !1
    ), U = /* @__PURE__ */ ne(y(t.state.selectedKeys)), K = /* @__PURE__ */ ne(L(t.state.sorting));
    function L(i) {
      return (i || []).filter((u) => u && u.id).map((u) => ({ id: String(u.id), desc: u.desc === !0 }));
    }
    function ee(i, u) {
      return i.length === u.length && i.every((g, v) => g.id === u[v].id && g.desc === u[v].desc);
    }
    const ce = W(() => o.value && K.value.length > 0), Y = /* @__PURE__ */ ne(me(t.state.columnWidths));
    function me(i) {
      const u = {};
      for (const [g, v] of Object.entries(i || {})) {
        const k = Math.round(Number(v));
        Number.isFinite(k) && k > 0 && (u[g] = k);
      }
      return u;
    }
    function Ce(i, u) {
      const g = Object.keys(i);
      return g.length === Object.keys(u).length && g.every((v) => i[v] === u[v]);
    }
    const ye = /* @__PURE__ */ ne(null), G = wm({
      features: n,
      data: W(() => t.state.view || []),
      columns: a,
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
      enableRowSelection: _,
      enableMultiRowSelection: W(() => O.value !== "single"),
      enableSubRowSelection: D,
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
      state: W(() => ({
        expanded: w.value,
        rowSelection: U.value,
        sorting: K.value,
        columnSizing: Y.value
      })),
      onExpandedChange: (i) => {
        w.value = typeof i == "function" ? i(w.value) : i;
      },
      onRowSelectionChange: (i) => {
        U.value = typeof i == "function" ? i(U.value) : i;
      },
      onSortingChange: (i) => {
        K.value = L(typeof i == "function" ? i(K.value) : i);
      },
      onColumnSizingChange: (i) => {
        Y.value = me(
          typeof i == "function" ? i(Y.value) : i
        );
      }
    });
    function J(i) {
      if (i.getIsSelected()) return "all";
      if (!D.value || i.subRows.length === 0) return "none";
      const u = i.subRows.map(J);
      return u.every((g) => g === "all") ? "all" : u.some((g) => g !== "none") ? "some" : "none";
    }
    we(() => I(U.value), t.setSelectedKeys, { flush: "post" }), we(() => I(w.value), t.setExpandedKeys, { flush: "post" }), we(
      () => t.state.expandedKeys,
      (i) => {
        C(I(w.value), [...i || []].sort()) || (w.value = y(i));
      }
    ), we(
      () => t.state.selectedKeys,
      (i) => {
        C(I(U.value), [...i || []].sort()) || (U.value = y(i));
      }
    ), we(() => K.value, t.setSorting, { flush: "post" }), we(
      () => t.state.sorting,
      (i) => {
        const u = L(i);
        ee(K.value, u) || (K.value = u);
      }
    ), we(
      () => [Y.value, ye.value],
      ([i, u]) => {
        u || t.setColumnWidths(i);
      },
      { flush: "post" }
    ), we(
      () => t.state.columnWidths,
      (i) => {
        const u = me(i);
        Ce(Y.value, u) || (Y.value = u);
      }
    ), we(
      () => [t.state.options.expand_all, t.state.view],
      ([i]) => {
        i && G.toggleAllRowsExpanded(!0);
      },
      { immediate: !0 }
    );
    const se = /* @__PURE__ */ ne(t.state.filterText ?? ""), tt = W(() => se.value.trim().toLowerCase()), De = W(() => tt.value.length > 0);
    let je = null, ke = t.state.filterText ?? "";
    we(
      () => t.state.filterText,
      (i) => {
        const u = i ?? "";
        u !== ke && (ke = u, se.value = u);
      }
    );
    function vr(i) {
      se.value = i, je !== null && clearTimeout(je), je = setTimeout(() => {
        je = null, ke = se.value, t.setFilterText(ke);
      }, B0);
    }
    Nn(() => {
      je !== null && clearTimeout(je);
    });
    function Ho(i) {
      return i.getAllCells().some((u) => String(u.getValue() ?? "").toLowerCase().includes(tt.value));
    }
    const fe = W(() => {
      if (!De.value) return G.getRowModel().rows;
      const i = G.getSortedRowModel().flatRows, u = /* @__PURE__ */ new Set();
      for (const g of i)
        if (Ho(g)) {
          u.add(g.id);
          for (let v = g.getParentRow(); v; v = v.getParentRow()) u.add(v.id);
        }
      return i.filter((g) => u.has(g.id));
    }), Te = W(() => {
      var i;
      return ((i = G.getHeaderGroups()[0]) == null ? void 0 : i.headers) ?? [];
    }), At = W(() => t.state.options.indent_px ?? 16), Cn = W(() => t.state.options.aria_label ?? "Tree table"), wr = W(() => De.value ? "No matches" : "No data"), zt = W(() => r.value ? 2 : 1), mi = W(() => fe.value.length + (r.value ? 1 : 0)), p = /* @__PURE__ */ ne(!1), m = /* @__PURE__ */ ne(null), b = /* @__PURE__ */ new Map();
    function M(i, u) {
      u ? b.set(i, u) : b.delete(i);
    }
    const x = W(() => {
      const i = Te.value;
      return i.length === 0 ? null : i.some((g) => g.column.id === m.value) ? m.value : i[0].column.id;
    });
    function S(i) {
      const u = Te.value;
      if (u.length === 0) return;
      const g = u[Math.max(0, Math.min(i, u.length - 1))];
      p.value = !0, m.value = g.column.id, Ne(() => {
        var v;
        return (v = b.get(g.column.id)) == null ? void 0 : v.focus();
      });
    }
    function F() {
      const i = Te.value;
      S(i.findIndex((u) => u.column.id === x.value));
    }
    function T() {
      p.value = !1, Ko(ln.value);
    }
    function P(i) {
      return o.value && i.column.getCanSort();
    }
    function R(i) {
      if (!P(i)) return;
      const u = i.column.getIsSorted();
      return u === "asc" ? "ascending" : u === "desc" ? "descending" : "none";
    }
    function N(i) {
      if (!P(i)) return null;
      const u = i.column.getIsSorted();
      return u ? u === "asc" ? Wl : $l : null;
    }
    function H(i) {
      P(i) && i.column.toggleSorting();
    }
    function V(i) {
      S(Te.value.indexOf(i)), H(i);
    }
    function $(i) {
      return l.value && i.column.getCanResize();
    }
    function Q(i) {
      var v;
      const u = i.column.id;
      if (u in Y.value) return null;
      const g = Math.round(((v = b.get(u)) == null ? void 0 : v.getBoundingClientRect().width) ?? 0);
      return g <= 0 || g === i.column.getSize() ? null : (Y.value = { ...Y.value, [u]: g }, g);
    }
    async function le(i, u) {
      if (!$(i)) return;
      u.stopPropagation(), Q(i) !== null && await Ne(), i.getResizeHandler()(u), ye.value = i.column.id;
      const g = () => {
        ye.value = null;
      };
      for (const v of ["mouseup", "touchend", "touchcancel"])
        document.addEventListener(v, g, { once: !0 });
    }
    function ie(i, u) {
      if (!$(i)) return;
      const g = i.column, v = g.columnDef.minSize ?? 20, k = g.columnDef.maxSize ?? Number.MAX_SAFE_INTEGER, B = Q(i) ?? g.getSize(), _e = Math.min(Math.max(Math.round(B + u), v), k);
      G.setColumnSizing((ge) => ({ ...ge, [g.id]: _e }));
    }
    function ve(i) {
      $(i) && i.column.resetSize();
    }
    function Se(i, u) {
      const g = Te.value, v = Math.max(
        0,
        g.findIndex((k) => k.column.id === x.value)
      );
      if (u.altKey) {
        switch (u.key) {
          case "ArrowLeft":
            ie(i, -Ul);
            break;
          case "ArrowRight":
            ie(i, Ul);
            break;
          case "Home":
            ve(i);
            break;
          default:
            return;
        }
        u.preventDefault(), u.stopPropagation();
        return;
      }
      switch (u.key) {
        case "ArrowLeft":
          S(v - 1);
          break;
        case "ArrowRight":
          S(v + 1);
          break;
        case "Home":
          S(0);
          break;
        case "End":
          S(g.length - 1);
          break;
        case "ArrowDown":
          T();
          break;
        case "Enter":
        case " ":
          H(i);
          break;
        default:
          return;
      }
      u.preventDefault(), u.stopPropagation();
    }
    const Be = W(() => {
      const i = /* @__PURE__ */ new Map();
      for (const u of fe.value) {
        const g = u.parentId ?? "", v = i.get(g) ?? [];
        v.push(u.id), i.set(g, v);
      }
      return i;
    });
    function ze(i) {
      return Be.value.get(i.parentId ?? "") ?? [];
    }
    function Kt(i) {
      return ze(i).indexOf(i.id) + 1;
    }
    function yr(i) {
      return ze(i).length;
    }
    function Me(i) {
      return f(i.original, "lazy") === !0;
    }
    function Ie(i) {
      return De.value ? (Be.value.get(i.id) ?? []).length > 0 : i.getCanExpand() || Me(i);
    }
    function Ot(i) {
      return De.value ? Ie(i) : i.getIsExpanded();
    }
    const nt = /* @__PURE__ */ ne(/* @__PURE__ */ new Set());
    function Lo(i) {
      return nt.value.has(i.id) && Me(i);
    }
    function Vt(i, u) {
      if (u && Me(i) && !nt.value.has(i.id) && (nt.value = new Set(nt.value).add(i.id), t.emitEvent("lazy_load", { key: i.id })), !Me(i) || !u || w.value === !0) {
        i.toggleExpanded(u);
        return;
      }
      w.value = { ...w.value, [i.id]: !0 };
    }
    we(fe, (i) => {
      if (nt.value.size === 0) return;
      const u = new Set(i.filter((g) => Lo(g)).map((g) => g.id));
      u.size !== nt.value.size && (nt.value = u);
    });
    const sc = W(() => {
      if (!r.value) return {};
      const i = { "--pnl-tst-total": `${G.getTotalSize()}px` };
      return Te.value.forEach((u, g) => {
        i[`--pnl-tst-w${g}`] = `${u.column.getSize()}px`;
      }), i;
    }), ic = W(() => {
      const i = Te.value[0];
      return i ? i.column.id in Y.value : !1;
    });
    function jo(i) {
      return r.value ? i === 0 && !ic.value ? { flex: "1 0 var(--pnl-tst-w0)" } : { flex: `0 0 var(--pnl-tst-w${i})` } : { flex: "1 1 0" };
    }
    function lc(i) {
      return { ...jo(0), paddingInlineStart: `${i.depth * At.value}px` };
    }
    const Mn = /* @__PURE__ */ ne(null), vi = /* @__PURE__ */ ne(null), br = /* @__PURE__ */ ne(0), _r = /* @__PURE__ */ ne(null), In = /* @__PURE__ */ ne(0), Pt = /* @__PURE__ */ ne(28);
    function zo() {
      var g;
      const i = Mn.value;
      if (!i) return;
      const u = Number.parseFloat(getComputedStyle(i).getPropertyValue("--pnl-tst-row-height"));
      Number.isFinite(u) && u > 0 && (Pt.value = u), In.value = ((g = vi.value) == null ? void 0 : g.offsetHeight) ?? 0, _r.value = i.clientHeight, br.value = i.scrollTop;
    }
    const wi = W(() => {
      const i = fe.value.length;
      if (_r.value === null) return { start: 0, end: Math.min(i, N0) };
      const u = Math.max(0, br.value - In.value), g = Math.max(0, Math.floor(u / Pt.value) - ql), v = Math.ceil(_r.value / Pt.value) + ql * 2 + 1;
      return { start: g, end: Math.min(i, g + v) };
    }), yi = W(() => {
      const i = fe.value, { start: u, end: g } = wi.value, v = i.findIndex((B) => B.id === ln.value), k = [];
      v >= 0 && v < u && k.push({ row: i[v], index: v, held: !0 });
      for (let B = u; B < g; B += 1)
        k.push({ row: i[B], index: B, held: !1 });
      return v >= g && k.push({ row: i[v], index: v, held: !0 }), k;
    });
    function ac(i) {
      return { position: "absolute", top: `${i * Pt.value}px`, left: "0" };
    }
    const uc = W(() => ({
      height: `${fe.value.length * Pt.value}px`,
      paddingTop: `${wi.value.start * Pt.value}px`
    }));
    function cc(i) {
      br.value = i.currentTarget.scrollTop;
    }
    function fc(i) {
      const u = Mn.value;
      if (!u || _r.value === null) return;
      const g = fe.value.findIndex((B) => B.id === i);
      if (g < 0) return;
      const v = g * Pt.value + In.value, k = v + Pt.value;
      v < u.scrollTop + In.value ? u.scrollTop = v - In.value : k > u.scrollTop + u.clientHeight && (u.scrollTop = k - u.clientHeight), br.value = u.scrollTop;
    }
    function Ko(i, u = void 0) {
      i != null && (fc(i), Ne(() => {
        var g;
        return (g = En.get(i)) == null ? void 0 : g.focus(u);
      }));
    }
    let ht = null;
    Xr(() => {
      zo(), typeof ResizeObserver == "function" && (ht = new ResizeObserver(() => zo()), Mn.value && ht.observe(Mn.value));
    }), Nn(() => {
      ht == null || ht.disconnect(), ht = null;
    });
    function dc(i) {
      Mn.value = i ?? null, ht && (ht.disconnect(), i && (ht.observe(i), Ne(zo)));
    }
    const on = /* @__PURE__ */ ne(null), sn = /* @__PURE__ */ ne(!0), En = /* @__PURE__ */ new Map();
    function Bt(i) {
      on.value = i, sn.value = !0, p.value = !1;
    }
    function gc(i, u) {
      u ? En.set(i, u) : En.delete(i);
    }
    const ln = W(() => {
      const i = fe.value;
      return i.length === 0 ? null : i.some((u) => u.id === on.value) ? on.value : i[0].id;
    });
    function We(i) {
      i != null && (Bt(i), Ko(i));
    }
    function Sr(i) {
      const u = fe.value;
      u.length !== 0 && We(u[Math.max(0, Math.min(i, u.length - 1))].id);
    }
    function bi(i, u) {
      const g = fe.value;
      if (g.length === 0) return;
      const v = g[Math.max(0, Math.min(i, g.length - 1))], k = (u == null ? void 0 : u.shiftKey) && _.value && O.value !== "single";
      k && mt.value === null && (mt.value = ln.value), We(v.id), k && _i(v, !1);
    }
    function pc(i) {
      const u = fe.value;
      if (u.length === 0) return;
      const g = Math.max(
        0,
        u.findIndex((B) => B.id === ln.value)
      ), v = u[g];
      if (i.ctrlKey || i.metaKey) {
        const B = {
          a: "select-all",
          c: "copy",
          f: Bn,
          v: "paste",
          x: "cut",
          z: i.shiftKey ? "redo" : "undo"
        }[i.key.toLowerCase()];
        if (B && Cr(B)) {
          i.preventDefault(), No(B);
          return;
        }
      }
      if (i.altKey) {
        const B = {
          ArrowUp: "move-up",
          ArrowDown: "move-down",
          ArrowLeft: "outdent",
          ArrowRight: "indent"
        }[i.key];
        if (B && Cr(B)) {
          i.preventDefault(), No(B);
          return;
        }
      }
      if (Fr.value && (i.key === "ContextMenu" || i.key === "F10" && i.shiftKey)) {
        i.preventDefault(), Uc(v);
        return;
      }
      const k = {
        Insert: i.shiftKey ? "new-file" : "new-folder",
        F2: "rename",
        Delete: "delete",
        Escape: "clear-selection"
      }[i.key];
      if (k && Cr(k)) {
        i.preventDefault(), No(k);
        return;
      }
      switch (i.key) {
        case "ArrowDown":
          i.preventDefault(), bi(g + 1, i);
          break;
        case "ArrowUp":
          i.preventDefault(), g === 0 && r.value && !i.shiftKey ? F() : bi(g - 1, i);
          break;
        case "ArrowRight":
          if (i.preventDefault(), !Ie(v)) break;
          Ot(v) ? Sr(g + 1) : (Vt(v, !0), We(v.id));
          break;
        case "ArrowLeft":
          i.preventDefault(), !De.value && Ie(v) && v.getIsExpanded() ? (Vt(v, !1), We(v.id)) : v.parentId && We(v.parentId);
          break;
        case "Home":
          i.preventDefault(), Sr(0);
          break;
        case "End":
          i.preventDefault(), Sr(u.length - 1);
          break;
        case "Enter":
          i.preventDefault(), t.emitEvent("activate", { key: v.id });
          break;
        case " ":
          if (!_.value) break;
          i.preventDefault(), Ci(v);
          break;
      }
    }
    const mt = /* @__PURE__ */ ne(null);
    function xr(i) {
      mt.value = i.id, U.value = {}, i.toggleSelected(!0, { selectChildren: !1 });
    }
    function _i(i, u) {
      const g = fe.value, v = g.findIndex((ge) => ge.id === mt.value), k = g.findIndex((ge) => ge.id === i.id);
      if (k === -1) return;
      if (v === -1) {
        xr(i);
        return;
      }
      u || (U.value = {});
      const [B, _e] = v <= k ? [v, k] : [k, v];
      for (let ge = B; ge <= _e; ge += 1)
        g[ge].toggleSelected(!0, { selectChildren: !1 });
    }
    const hc = W(() => t.state.options.toggle_on_click === !0);
    function mc(i) {
      const u = I(U.value);
      return u.length === 1 && u[0] === i.id;
    }
    function Si() {
      U.value = {}, mt.value = null, sn.value = !1;
    }
    function xi() {
      I(U.value).length === 0 && (sn.value = !1);
    }
    we(
      () => I(U.value).length > 0,
      (i) => {
        i && (sn.value = !0);
      }
    );
    function vc(i, u) {
      Bt(i.id);
      const g = !!(u != null && u.shiftKey || u != null && u.ctrlKey || u != null && u.metaKey);
      _.value && !g && hc.value && mc(i) ? Si() : _.value && O.value !== "single" ? u != null && u.shiftKey ? _i(i, u.ctrlKey || u.metaKey) : u != null && u.ctrlKey || u != null && u.metaKey ? (mt.value = i.id, bc(i)) : xr(i) : _.value && xr(i), t.emitEvent("activate", { key: i.id });
    }
    function wc(i) {
      Bt(i.id), !De.value && Vt(i, !i.getIsExpanded());
    }
    function Ri(i) {
      return J(i) === "all";
    }
    function yc(i) {
      return J(i) === "some";
    }
    function bc(i) {
      Bt(i.id), i.toggleSelected(void 0, { selectChildren: !1 }), xi();
    }
    function Ci(i) {
      Bt(i.id), i.toggleSelected(!Ri(i), {
        selectChildren: D.value,
        deselectParents: D.value
      }), xi();
    }
    function _c(i) {
      Ci(i), We(i.id);
    }
    const Vo = {
      "new-folder": { icon: Qv, label: "New folder", keys: "Insert", node: {} },
      "new-file": {
        icon: Jv,
        label: "New file",
        keys: "Shift+Insert",
        node: { allow_children: !1 }
      },
      rename: { icon: n0, label: "Rename", keys: "F2" },
      delete: { icon: a0, label: "Delete", keys: "Delete" },
      undo: { icon: u0, label: "Undo", keys: "Control+Z" },
      redo: { icon: r0, label: "Redo", keys: "Control+Shift+Z" },
      cut: { icon: o0, label: "Cut", keys: "Control+X" },
      copy: { icon: Zv, label: "Copy", keys: "Control+C" },
      paste: { icon: Yv, label: "Paste", keys: "Control+V" },
      "move-up": { icon: Wl, label: "Move up", keys: "Alt+ArrowUp" },
      "move-down": { icon: $l, label: "Move down", keys: "Alt+ArrowDown" },
      outdent: { icon: e0, label: "Outdent", keys: "Alt+ArrowLeft" },
      indent: { icon: t0, label: "Indent", keys: "Alt+ArrowRight" },
      "expand-all": { icon: Gv, label: "Expand all" },
      "collapse-all": { icon: Xv, label: "Collapse all" },
      "select-all": { icon: l0, label: "Select all", keys: "Control+A" },
      "clear-selection": { icon: i0, label: "Clear selection", keys: "Escape" }
    }, Sc = [
      "undo",
      "redo",
      Tt,
      "new-folder",
      "new-file",
      "rename",
      "delete",
      Tt,
      "cut",
      "copy",
      "paste",
      Tt,
      "move-up",
      "move-down",
      "outdent",
      "indent",
      Tt,
      "expand-all",
      "collapse-all",
      Tt,
      "select-all",
      "clear-selection",
      Bn
    ], xc = [
      "new-folder",
      "new-file",
      Tt,
      "rename",
      "delete",
      Tt,
      "cut",
      "copy",
      "paste"
    ];
    function Mi(i, u) {
      const g = i === !0 ? u : Array.isArray(i) ? i : [], v = [];
      return g.forEach((k, B) => {
        const _e = typeof k == "string" ? {} : k || {}, ge = typeof k == "string" ? k : _e.id, Ni = `${ge}#${B}`;
        if (ge === Tt || ge === Bn) {
          v.push({ uid: Ni, id: ge });
          return;
        }
        const jn = Vo[ge];
        if (!jn) return;
        const $i = _e.label ?? jn.label;
        v.push({
          uid: Ni,
          id: ge,
          label: $i,
          icon: A(_e.icon) ?? jn.icon,
          keys: jn.keys,
          node: { title: $i, ...jn.node ?? {}, ..._e.node ?? {} }
        });
      }), v;
    }
    const Rr = W(() => Mi(t.state.options.toolbar, Sc)), Bo = W(
      () => Mi(t.state.options.menu, xc).filter((i) => i.id !== Bn)
    ), Rc = W(() => Rr.value.length > 0), Cc = W(() => t.state.options.toolbar_label ?? "Tree actions"), Ii = W(() => t.state.options.search_label ?? "Search");
    function Ei(i) {
      return Rr.value.find((u) => u.id === i) ?? Bo.value.find((u) => u.id === i) ?? null;
    }
    function Cr(i) {
      return Ei(i) !== null;
    }
    function No(i) {
      const u = Ei(i);
      u && Go(u);
    }
    const Ke = W(() => fe.value.find((i) => i.id === ln.value) ?? null);
    function Mc(i) {
      return fe.value.filter((u) => (u.parentId ?? "") === (i.parentId ?? ""));
    }
    function Ai() {
      const i = Ke.value;
      if (!i) return [];
      const u = zi(i), g = i.parentId ?? "";
      return u.every((k) => {
        var B;
        return (((B = Hn(k)) == null ? void 0 : B.parentId) ?? "") === g;
      }) ? u : [i.id];
    }
    function $o() {
      const i = Ke.value;
      if (!i) return [];
      if (!_.value || !i.getIsSelected()) return [i.id];
      const u = fe.value.filter((g) => g.getIsSelected()).map((g) => g.id);
      return u.length > 0 ? u : [i.id];
    }
    const Wo = W(() => {
      var i;
      return ((i = t.state.clipboard) == null ? void 0 : i.keys) ?? [];
    }), Ic = W(() => {
      var u;
      const i = new Set(((u = t.state.clipboard) == null ? void 0 : u.mode) === "cut" ? Wo.value : []);
      return i.size === 0 || fe.value.forEach((g) => {
        g.parentId && i.has(g.parentId) && i.add(g.id);
      }), i;
    });
    function An(i) {
      const u = Ke.value;
      if (!u) return null;
      const g = new Set(Ai()), v = Mc(u), k = v.map((_e, ge) => g.has(_e.id) ? ge : -1).filter((_e) => _e >= 0);
      if (k.length === 0) return null;
      let B = (i < 0 ? Math.min(...k) : Math.max(...k)) + i;
      for (; B >= 0 && B < v.length && g.has(v[B].id); ) B += i;
      return v[B] ?? null;
    }
    let Ge = null;
    we(
      () => t.state.view,
      () => {
        const i = Ge;
        if (Ge = null, !!i) {
          if (i.key !== void 0) {
            We(i.key);
            return;
          }
          Ne(() => {
            i.index !== void 0 ? Sr(i.index) : i.pasted !== void 0 ? Ac(i.pasted) : Ec(i.added);
          });
        }
      }
    );
    function Ec(i) {
      const u = G.getCoreRowModel().flatRows.find((g) => !i.has(g.id));
      u && (We(u.id), _.value && (U.value = {}, mt.value = u.id, u.toggleSelected(!0, { selectChildren: !1 })), Cr("rename") && Ne(() => Er(u.id, !0)));
    }
    function Ac(i) {
      const u = G.getCoreRowModel().flatRows.filter((k) => !i.has(k.id)), g = new Set(u.map((k) => k.id)), v = u.filter((k) => !g.has(k.parentId ?? ""));
      v.length !== 0 && (We(v[0].id), _.value && (U.value = {}, mt.value = v[0].id, v.forEach((k) => k.toggleSelected(!0, { selectChildren: !1 }))));
    }
    const an = /* @__PURE__ */ ne(null), Mr = /* @__PURE__ */ ne(""), On = /* @__PURE__ */ ne(null), vt = /* @__PURE__ */ ne(null), Uo = /* @__PURE__ */ ne(null), qo = /* @__PURE__ */ ne(null), Oc = W(() => t.state.options.extension_warning !== !1);
    function Oi(i) {
      const u = String(i ?? ""), g = u.lastIndexOf(".");
      return g < 0 ? "" : u.slice(g + 1).toLowerCase();
    }
    function Pc(i, u) {
      return Oc.value && f(i, "allow_children") === !1 && Oi(u) !== Oi(i.title ?? "");
    }
    let Ir = null;
    function Er(i, u = !1) {
      const g = Hn(i);
      g && (Ir = u ? i : null, Mr.value = g.original.title ?? "", an.value = i, t.setEditingKey(i), Ne(() => {
        var v, k;
        (v = On.value) == null || v.focus(), (k = On.value) == null || k.select();
      }));
    }
    function Ar() {
      Ir = null, vt.value = null, an.value = null, t.setEditingKey("");
    }
    function Pi(i) {
      if (vt.value || an.value !== i.id) return;
      const u = Mr.value.trim(), g = u.length > 0 && u !== (i.original.title ?? "");
      if (g && Ir !== i.id && Pc(i.original, u)) {
        vt.value = { key: i.id, title: u, previous: i.original.title ?? i.id }, Ne(() => {
          var v;
          return (v = qo.value) == null ? void 0 : v.focus();
        });
        return;
      }
      if (Ar(), !g) {
        We(i.id);
        return;
      }
      Ge = { key: i.id }, t.emitEvent("rename", { key: i.id, title: u });
    }
    function Di() {
      const { key: i, title: u } = vt.value;
      vt.value = null, Ar(), Ge = { key: i }, t.emitEvent("rename", { key: i, title: u });
    }
    function ki() {
      vt.value = null, Ne(() => {
        var i, u;
        (i = On.value) == null || i.focus(), (u = On.value) == null || u.select();
      });
    }
    function Dc(i) {
      var v;
      const u = i.key;
      if (u === "Escape" || u === "n" || u === "N") {
        i.preventDefault(), ki();
        return;
      }
      if (u === "y" || u === "Y") {
        i.preventDefault(), Di();
        return;
      }
      if (u !== "Tab" && u !== "ArrowLeft" && u !== "ArrowRight") return;
      i.preventDefault(), (v = (i.target === Uo.value ? qo : Uo).value) == null || v.focus();
    }
    function kc(i) {
      if (an.value !== i.id) return;
      const u = Ir === i.id;
      if (Ar(), !u) {
        We(i.id);
        return;
      }
      Ge = { index: fe.value.findIndex((g) => g.id === i.id) }, t.emitEvent("delete", { key: i.id, keys: [i.id] });
    }
    function Tc(i, u) {
      u.key === "Enter" ? (u.preventDefault(), Pi(i)) : u.key === "Escape" && (u.preventDefault(), kc(i));
    }
    we(
      () => t.state.editingKey,
      (i) => {
        (i || "") !== (an.value || "") && (i ? Er(i) : Ar());
      }
    ), Xr(() => {
      t.state.editingKey && Er(t.state.editingKey);
    });
    function Or(i, u) {
      const g = Ke.value;
      !g || !i || (Ge = { key: g.id }, t.emitEvent("move", {
        key: g.id,
        keys: Ai(),
        position: u,
        anchorKey: i.id
      }));
    }
    function Fc(i) {
      const u = Ke.value, g = u ? f(u.original, "allow_children") === !1 ? "after" : "child" : null;
      u && g === "child" && !De.value && Vt(u, !0), Ge = { added: new Set(G.getCoreRowModel().flatRows.map((v) => v.id)) }, t.emitEvent("add", { anchorKey: (u == null ? void 0 : u.id) ?? null, position: g, node: i.node });
    }
    function Hc() {
      var u;
      const i = $o();
      i.length !== 0 && (Ge = { index: fe.value.findIndex((g) => {
        var v;
        return g.id === ((v = Ke.value) == null ? void 0 : v.id);
      }) }, t.emitEvent("delete", { key: ((u = Ke.value) == null ? void 0 : u.id) ?? null, keys: i }));
    }
    function Lc(i) {
      Ge = { index: fe.value.findIndex((u) => {
        var g;
        return u.id === ((g = Ke.value) == null ? void 0 : g.id);
      }) }, t.emitEvent(i, {});
    }
    function jc(i) {
      var g;
      const u = $o();
      u.length !== 0 && t.emitEvent(i, { key: ((g = Ke.value) == null ? void 0 : g.id) ?? null, keys: u });
    }
    function zc() {
      var v;
      const i = Ke.value, u = i ? f(i.original, "allow_children") === !1 ? "after" : "child" : null;
      i && u === "child" && !De.value && Vt(i, !0);
      const g = Wo.value;
      Ge = ((v = t.state.clipboard) == null ? void 0 : v.mode) === "cut" ? { key: g[0] } : { pasted: new Set(G.getCoreRowModel().flatRows.map((k) => k.id)) }, t.emitEvent("paste", { anchorKey: (i == null ? void 0 : i.id) ?? null, position: u });
    }
    function Pn(i) {
      var u;
      switch (i.id) {
        case "new-folder":
        case "new-file":
          return !0;
        case "rename":
          return Ke.value !== null;
        case "delete":
        case "cut":
        case "copy":
          return $o().length > 0;
        case "paste":
          return Wo.value.length > 0;
        case "undo":
          return t.state.canUndo === !0;
        case "redo":
          return t.state.canRedo === !0;
        case "move-up":
        case "move-down":
          return !ce.value && An(i.id === "move-up" ? -1 : 1) !== null;
        case "indent": {
          const g = An(-1);
          return g !== null && f(g.original, "allow_children") !== !1;
        }
        case "outdent":
          return !!((u = Ke.value) != null && u.parentId);
        case "expand-all":
        case "collapse-all":
          return fe.value.length > 0 && !De.value;
        case "select-all":
          return fe.value.length > 0 && _.value && O.value !== "single";
        case "clear-selection":
          return _.value && I(U.value).length > 0;
        default:
          return !0;
      }
    }
    function Ti(i) {
      return i.keys ? i.keys.replace("Control", "Ctrl") : "";
    }
    function Kc(i) {
      return i.keys ? `${i.label} (${Ti(i)})` : i.label;
    }
    function Go(i) {
      var u, g, v, k;
      if (Pn(i))
        switch (i.id) {
          case "new-folder":
          case "new-file":
            Fc(i);
            break;
          case "rename":
            Er(Ke.value.id);
            break;
          case "delete":
            Hc();
            break;
          case "undo":
          case "redo":
            Lc(i.id);
            break;
          case "cut":
          case "copy":
            jc(i.id);
            break;
          case "paste":
            zc();
            break;
          case "move-up":
            Or(An(-1), "before");
            break;
          case "move-down":
            Or(An(1), "after");
            break;
          case "indent": {
            const B = An(-1);
            B && !De.value && Vt(B, !0), Or(B, "child");
            break;
          }
          case "outdent":
            Or(Hn((u = Ke.value) == null ? void 0 : u.parentId), "after");
            break;
          case "expand-all":
            G.toggleAllRowsExpanded(!0);
            break;
          case "collapse-all":
            G.toggleAllRowsExpanded(!1);
            break;
          case "select-all":
            U.value = Object.fromEntries(fe.value.map((B) => [B.id, !0])), mt.value = ((g = fe.value[0]) == null ? void 0 : g.id) ?? null;
            break;
          case "clear-selection":
            Si();
            break;
          case Bn:
            (v = Xo.value) == null || v.focus(), (k = Xo.value) == null || k.select();
            break;
        }
    }
    const Xo = /* @__PURE__ */ ne(null), Yo = W(() => Rr.value.filter((i) => i.id in Vo)), Pr = /* @__PURE__ */ ne(null), Zo = /* @__PURE__ */ new Map(), Fi = W(() => {
      const i = Yo.value;
      return i.length === 0 ? null : i.some((u) => u.uid === Pr.value) ? Pr.value : i[0].uid;
    });
    function Vc(i, u) {
      u ? Zo.set(i, u) : Zo.delete(i);
    }
    function Dr(i) {
      const u = Yo.value;
      if (u.length === 0) return;
      const g = u[Math.max(0, Math.min(i, u.length - 1))].uid;
      Pr.value = g, Ne(() => {
        var v;
        return (v = Zo.get(g)) == null ? void 0 : v.focus();
      });
    }
    function Bc(i) {
      const u = Yo.value, g = Math.max(
        0,
        u.findIndex((v) => v.uid === Fi.value)
      );
      switch (i.key) {
        case "ArrowRight":
          i.preventDefault(), Dr(g + 1);
          break;
        case "ArrowLeft":
          i.preventDefault(), Dr(g - 1);
          break;
        case "Home":
          i.preventDefault(), Dr(0);
          break;
        case "End":
          i.preventDefault(), Dr(u.length - 1);
          break;
      }
    }
    const Dn = /* @__PURE__ */ ne(!1), kr = /* @__PURE__ */ ne(null), kn = /* @__PURE__ */ ne({ left: 0, top: 0 }), Tr = /* @__PURE__ */ ne(null), un = /* @__PURE__ */ ne(0), Jo = /* @__PURE__ */ new Map(), Tn = W(() => Bo.value.filter((i) => i.id in Vo)), Fr = W(() => Tn.value.length > 0), Nc = W(() => t.state.options.menu_label ?? "Row actions");
    function $c(i, u) {
      u ? Jo.set(i, u) : Jo.delete(i);
    }
    function Hi(i) {
      return Tn.value.findIndex((u) => u.uid === i.uid);
    }
    function Li(i, u, g) {
      if (!Fr.value) return;
      on.value !== i.id && Bt(i.id), kr.value = i.id, kn.value = { left: u, top: g };
      const v = Tn.value.findIndex((k) => Pn(k));
      un.value = Math.max(0, v), Dn.value = !0, Ne(qc);
    }
    function Wc(i, u) {
      Fr.value && (u.preventDefault(), _.value && !i.getIsSelected() && xr(i), Li(i, u.clientX, u.clientY));
    }
    function Uc(i) {
      var g;
      const u = (g = En.get(i.id)) == null ? void 0 : g.getBoundingClientRect();
      Li(i, u ? u.left + At.value : pn, u ? u.bottom : pn);
    }
    function qc() {
      const i = Tr.value;
      if (!i) return;
      const u = i.getBoundingClientRect();
      let { left: g, top: v } = kn.value;
      g + u.width > window.innerWidth - pn && (g = Math.max(pn, g - u.width)), v + u.height > window.innerHeight - pn && (v = Math.max(pn, v - u.height)), kn.value = { left: g, top: v }, Fn(un.value);
    }
    function Fn(i) {
      const u = Tn.value;
      if (u.length === 0) return;
      const g = Math.max(0, Math.min(i, u.length - 1));
      un.value = g, Ne(() => {
        var v;
        return (v = Jo.get(u[g].uid)) == null ? void 0 : v.focus();
      });
    }
    function Hr(i = !0, u = void 0) {
      if (!Dn.value) return;
      const g = kr.value;
      Dn.value = !1, kr.value = null, i && g != null && Ko(g, u);
    }
    function Gc(i) {
      if (!Pn(i)) return;
      const u = kr.value;
      Hr(!1), We(u), Go(i);
    }
    function Xc(i) {
      const u = un.value;
      switch (i.key) {
        case "ArrowDown":
          i.preventDefault(), Fn(u + 1);
          break;
        case "ArrowUp":
          i.preventDefault(), Fn(u - 1);
          break;
        case "Home":
          i.preventDefault(), Fn(0);
          break;
        case "End":
          i.preventDefault(), Fn(Tn.value.length - 1);
          break;
        case "Escape":
        case "Tab":
          i.preventDefault(), Hr();
          break;
      }
    }
    function Qo(i) {
      Tr.value && i.composedPath().includes(Tr.value) || Hr(!1);
    }
    function cn() {
      Hr(!0, { preventScroll: !0 });
    }
    we(Dn, (i) => {
      i ? (document.addEventListener("pointerdown", Qo, !0), window.addEventListener("resize", cn), window.addEventListener("scroll", cn, !0)) : (document.removeEventListener("pointerdown", Qo, !0), window.removeEventListener("resize", cn), window.removeEventListener("scroll", cn, !0));
    }), Nn(() => {
      document.removeEventListener("pointerdown", Qo, !0), window.removeEventListener("resize", cn), window.removeEventListener("scroll", cn, !0);
    });
    const Yc = ["reorder-above", "reorder-below", "make-child", "reparent"], es = W(() => t.state.options.enable_dnd === !0), ts = W(() => String(t.state.options.transfer_group || "")), fn = W(() => String(t.state.tableId || "")), ji = /* @__PURE__ */ ne([]), Lr = /* @__PURE__ */ ne(null);
    function Hn(i) {
      return fe.value.find((u) => u.id === i) ?? null;
    }
    function Zc(i, u) {
      let g = i;
      for (; g; ) {
        if (u.includes(g.id)) return !0;
        g = g.getParentRow();
      }
      return !1;
    }
    function zi(i) {
      if (!_.value || !i.getIsSelected()) return [i.id];
      const u = /* @__PURE__ */ new Set();
      for (let v = i.getParentRow(); v; v = v.getParentRow()) u.add(v.id);
      const g = fe.value.filter((v) => v.getIsSelected() && !u.has(v.id)).map((v) => v.id);
      return g.length > 1 ? g : [i.id];
    }
    function Jc(i, u, g) {
      if (!g && Zc(i, u)) return Yc;
      const v = ce.value ? ["reorder-above", "reorder-below"] : [];
      return f(i.original, "allow_children") === !1 && v.push("make-child"), v;
    }
    function Qc(i) {
      if (Ie(i) && Ot(i)) return "expanded";
      const u = ze(i);
      return u[u.length - 1] === i.id ? "last-in-group" : "standard";
    }
    let ns = null, Ln = null;
    function rs() {
      Ln && clearTimeout(Ln), Ln = null, ns = null;
    }
    function ef(i, u) {
      if (ns === i || (rs(), !u || u.type === "instruction-blocked")) return;
      const g = Hn(i);
      !g || !g.getCanExpand() || g.getIsExpanded() || (ns = i, Ln = setTimeout(() => {
        Ln = null;
        const v = Hn(i);
        v && v.getCanExpand() && !v.getIsExpanded() && Vt(v, !0);
      }, $0));
    }
    function tf() {
      Lr.value = null, rs();
    }
    const Ki = /* @__PURE__ */ ne(null);
    function nf() {
      let i = Ki.value;
      if (!i) return null;
      let u = i.getRootNode();
      for (; u.host; )
        i = u.host, u = i.getRootNode();
      return i;
    }
    function jr(i) {
      for (const { row: u } of yi.value) {
        const g = En.get(u.id);
        if (!g) continue;
        const v = g.getBoundingClientRect();
        if (i.clientX >= v.left && i.clientX < v.right && i.clientY >= v.top && i.clientY < v.bottom)
          return { row: u, element: g, rect: v };
      }
      return null;
    }
    function rf(i, u) {
      const g = ".pnl-tst-check, .pnl-tst-twisty, .pnl-tst-edit";
      for (const v of i.element.querySelectorAll(g)) {
        const k = v.getBoundingClientRect();
        if (u.clientX >= k.left && u.clientX < k.right && u.clientY >= k.top && u.clientY < k.bottom)
          return !0;
      }
      return !1;
    }
    const of = {
      id: () => fn.value,
      // Anything outside a row (the header, the empty space below the last row) is
      // not a drag handle, and neither is a row control.
      canDragFrom(i) {
        const u = jr(i);
        return u !== null && !rf(u, i);
      },
      dragData(i) {
        const u = jr(i);
        return u ? {
          type: bn,
          group: ts.value,
          sourceId: fn.value,
          key: u.row.id,
          keys: zi(u.row)
        } : null;
      },
      // The registered element is the host, so the default preview would be a
      // snapshot of the whole layout. Point it at the row being dragged, offset so
      // the preview stays under the cursor where it was grabbed.
      preview(i, u) {
        const g = jr(i);
        return g ? (u(g.element, i.clientX - g.rect.left, i.clientY - g.rect.top), !0) : !1;
      },
      setDragging(i) {
        ji.value = i;
      },
      // Our own rows always. Another pane's only when both name the same group, so a
      // table that opted into nothing shows no drop state at all rather than
      // accepting a drag Python is bound to reject.
      dropData(i, u) {
        const g = jr(i);
        if (!g) return null;
        const v = u.sourceId !== fn.value;
        if (v && !(ts.value && u.group === ts.value))
          return { type: bn, key: null, paneId: fn.value };
        const k = { type: bn, key: g.row.id, paneId: fn.value };
        return Am(k, {
          element: g.element,
          input: i,
          currentLevel: g.row.depth,
          indentPerLevel: At.value,
          mode: Qc(g.row),
          block: Jc(g.row, u.keys ?? [], v)
        });
      },
      showDrop(i, u) {
        Lr.value = { key: i, instruction: u }, ef(i, u);
      },
      clearDrop: tf,
      drop(i, u, g, v) {
        const k = i.keys ?? [];
        if (k.length === 0) return;
        const B = {
          targetKey: u,
          instruction: g.type,
          desiredLevel: g.desiredLevel ?? g.currentLevel
        };
        if (i.sourceId === fn.value) {
          if (k.includes(u)) return;
          t.emitEvent("move", { key: i.key, keys: k, ...B });
          return;
        }
        Ge = { pasted: new Set(G.getCoreRowModel().flatRows.map((_e) => _e.id)) }, t.emitEvent("transfer", {
          keys: k,
          sourceId: i.sourceId,
          copy: !!(v != null && v.ctrlKey || v != null && v.altKey),
          ...B
        });
      }
    };
    let Dt = null;
    function Vi() {
      Dt == null || Dt(), Dt = null;
      const i = nf();
      !i || !es.value || (Dt = Rv(i, of));
    }
    Xr(Vi), we(es, Vi), Nn(() => {
      rs(), Dt == null || Dt();
    });
    function os(i) {
      var u;
      return ((u = Lr.value) == null ? void 0 : u.key) === i.id ? Lr.value.instruction : null;
    }
    function sf(i) {
      const u = f(i.original, "class");
      return typeof u == "string" ? u : null;
    }
    function lf(i) {
      const u = os(i);
      return {
        "pnl-tst-row--draggable": es.value,
        "pnl-tst-row--dragging": ji.value.includes(i.id),
        "pnl-tst-row--blocked": (u == null ? void 0 : u.type) === "instruction-blocked",
        "pnl-tst-row--child-target": (u == null ? void 0 : u.type) === "make-child"
      };
    }
    function Bi(i) {
      const u = os(i);
      return u ? u.type === "reorder-above" ? "pnl-tst-dropline--above" : u.type === "reorder-below" || u.type === "reparent" ? "pnl-tst-dropline--below" : null : null;
    }
    function af(i) {
      const u = os(i);
      return u ? { insetInlineStart: `${(u.type === "reparent" ? u.desiredLevel : u.currentLevel) * u.indentPerLevel}px` } : null;
    }
    return (i, u) => (re(), oe("div", {
      ref_key: "rootElement",
      ref: Ki,
      class: "pnl-tst"
    }, [
      Rc.value ? (re(), oe("div", {
        key: 0,
        class: "pnl-tst-toolbar",
        role: "toolbar",
        "aria-orientation": "horizontal",
        "aria-label": Cc.value
      }, [
        (re(!0), oe(Ee, null, Kn(Rr.value, (g) => (re(), oe(Ee, {
          key: g.uid
        }, [
          g.id === "|" ? (re(), oe("span", f0)) : g.id === "search" ? (re(), oe("label", d0, [
            xe("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: Gt(s0)
            }, null, 8, g0),
            xe("input", {
              ref_for: !0,
              ref: (v) => Xo.value = v,
              type: "search",
              value: se.value,
              "aria-label": Ii.value,
              placeholder: Ii.value,
              onInput: u[0] || (u[0] = (v) => vr(v.target.value))
            }, null, 40, p0)
          ])) : (re(), oe("button", {
            key: 2,
            ref_for: !0,
            ref: (v) => Vc(g.uid, v),
            type: "button",
            class: "pnl-tst-tbtn",
            "aria-label": g.label,
            "aria-keyshortcuts": g.keys,
            "aria-disabled": !Pn(g),
            title: Kc(g),
            tabindex: g.uid === Fi.value ? 0 : -1,
            onClick: (v) => Go(g),
            onFocus: (v) => Pr.value = g.uid,
            onKeydown: Bc
          }, [
            xe("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: g.icon
            }, null, 8, m0)
          ], 40, h0))
        ], 64))), 128))
      ], 8, c0)) : Xe("", !0),
      fe.value.length === 0 ? (re(), oe("div", v0, Ft(wr.value), 1)) : (re(), oe("div", {
        key: 2,
        ref: dc,
        class: it(["pnl-tst-grid", { "pnl-tst-grid--resizing": ye.value !== null }]),
        role: "treegrid",
        "aria-label": Cn.value,
        "aria-colcount": Te.value.length,
        "aria-rowcount": mi.value,
        style: st(sc.value),
        onKeydown: pc,
        onScroll: cc
      }, [
        r.value ? (re(), oe("div", {
          key: 0,
          ref_key: "headElement",
          ref: vi,
          class: "pnl-tst-head",
          role: "rowgroup"
        }, [
          xe("div", y0, [
            (re(!0), oe(Ee, null, Kn(Te.value, (g, v) => (re(), oe("div", {
              key: g.id,
              ref_for: !0,
              ref: (k) => M(g.column.id, k),
              class: it(["pnl-tst-hcell", { "pnl-tst-hcell--sortable": P(g) }]),
              role: "columnheader",
              "aria-colindex": v + 1,
              "aria-sort": R(g),
              "aria-keyshortcuts": $(g) ? "Alt+ArrowLeft Alt+ArrowRight Alt+Home" : void 0,
              tabindex: p.value && g.column.id === x.value ? 0 : -1,
              style: st(jo(v)),
              onClick: (k) => V(g),
              onFocus: (k) => m.value = g.column.id,
              onKeydown: (k) => Se(g, k)
            }, [
              xe("span", _0, Ft(g.column.columnDef.header), 1),
              N(g) ? (re(), oe("span", {
                key: 0,
                class: "pnl-tst-sortind",
                "aria-hidden": "true",
                innerHTML: N(g)
              }, null, 8, S0)) : Xe("", !0),
              $(g) ? (re(), oe("span", {
                key: 1,
                class: it(["pnl-tst-resize", { "pnl-tst-resize--active": ye.value === g.column.id }]),
                "aria-hidden": "true",
                onClick: u[1] || (u[1] = gn(() => {
                }, ["stop"])),
                onDblclick: gn((k) => ve(g), ["stop"]),
                onMousedown: (k) => le(g, k),
                onTouchstart: (k) => le(g, k)
              }, null, 42, x0)) : Xe("", !0)
            ], 46, b0))), 128))
          ])
        ], 512)) : Xe("", !0),
        xe("div", {
          class: "pnl-tst-body",
          role: "rowgroup",
          style: st(uc.value)
        }, [
          (re(!0), oe(Ee, null, Kn(yi.value, ({ row: g, index: v, held: k }) => (re(), oe("div", {
            key: g.id,
            ref_for: !0,
            ref: (B) => gc(g.id, B),
            class: it(["pnl-tst-row", [
              lf(g),
              sf(g),
              {
                "pnl-tst-row--active": sn.value && g.id === on.value,
                "pnl-tst-row--quiet": !sn.value && g.id === on.value,
                "pnl-tst-row--cut": Ic.value.has(g.id)
              }
            ]]),
            style: st(k ? ac(v) : void 0),
            role: "row",
            "aria-level": g.depth + 1,
            "aria-posinset": Kt(g),
            "aria-setsize": yr(g),
            "aria-rowindex": v + zt.value,
            "aria-expanded": Ie(g) ? Ot(g) : void 0,
            "aria-busy": Lo(g) ? "true" : void 0,
            "aria-selected": _.value ? g.getIsSelected() : void 0,
            "aria-haspopup": Fr.value ? "menu" : void 0,
            tabindex: !p.value && g.id === ln.value ? 0 : -1,
            onClick: (B) => vc(g, B),
            onContextmenu: (B) => Wc(g, B),
            onFocus: (B) => Bt(g.id)
          }, [
            Bi(g) ? (re(), oe("span", {
              key: 0,
              class: it(["pnl-tst-dropline", Bi(g)]),
              style: st(af(g)),
              "aria-hidden": "true"
            }, null, 6)) : Xe("", !0),
            (re(!0), oe(Ee, null, Kn(g.getAllCells(), (B, _e) => (re(), oe("div", {
              key: B.id,
              class: it(["pnl-tst-cell", { "pnl-tst-cell--tree": _e === 0 }]),
              role: "gridcell",
              "aria-colindex": _e + 1,
              style: st(_e === 0 ? lc(g) : jo(_e))
            }, [
              _e === 0 ? (re(), oe(Ee, { key: 0 }, [
                Ie(g) ? (re(), oe("span", {
                  key: 0,
                  class: it(["pnl-tst-twisty", {
                    "pnl-tst-twisty--open": Ot(g),
                    "pnl-tst-twisty--busy": Lo(g)
                  }]),
                  "aria-hidden": "true",
                  onClick: gn((ge) => wc(g), ["stop"])
                }, [...u[4] || (u[4] = [
                  xe("svg", {
                    viewBox: "0 0 16 16",
                    width: "12",
                    height: "12",
                    focusable: "false"
                  }, [
                    xe("path", {
                      d: "M6 3.5 10.5 8 6 12.5",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "1.6"
                    })
                  ], -1)
                ])], 10, M0)) : (re(), oe("span", I0)),
                j.value ? (re(), oe("input", {
                  key: 2,
                  class: "pnl-tst-check",
                  type: "checkbox",
                  tabindex: "-1",
                  checked: Ri(g),
                  ".indeterminate": yc(g),
                  "aria-label": `Select ${g.original.title ?? g.id}`,
                  onClick: gn((ge) => _c(g), ["stop"])
                }, null, 40, E0)) : Xe("", !0),
                z(g) ? (re(), oe("span", {
                  key: 3,
                  class: "pnl-tst-icon",
                  "aria-hidden": "true",
                  innerHTML: z(g)
                }, null, 8, A0)) : Xe("", !0)
              ], 64)) : Xe("", !0),
              _e === 0 && an.value === g.id ? (re(), oe("input", {
                key: 1,
                ref_for: !0,
                ref: (ge) => On.value = ge,
                class: "pnl-tst-edit",
                type: "text",
                value: Mr.value,
                "aria-label": `Rename ${g.original.title ?? g.id}`,
                onInput: u[2] || (u[2] = (ge) => Mr.value = ge.target.value),
                onClick: u[3] || (u[3] = gn(() => {
                }, ["stop"])),
                onKeydown: gn((ge) => Tc(g, ge), ["stop"]),
                onBlur: (ge) => Pi(g)
              }, null, 40, O0)) : (re(), oe("span", P0, Ft(B.getValue()), 1))
            ], 14, C0))), 128))
          ], 46, R0))), 128))
        ], 4)
      ], 46, w0)),
      vt.value ? (re(), oe("div", D0, [
        xe("div", {
          class: "pnl-tst-dialog",
          role: "alertdialog",
          "aria-modal": "true",
          "aria-label": "Rename",
          "aria-describedby": "pnl-tst-confirm-message",
          onKeydown: Dc
        }, [
          xe("p", k0, " Rename " + Ft(vt.value.previous) + " to " + Ft(vt.value.title) + "? If you change a file name extension, the file might become unusable. ", 1),
          xe("div", T0, [
            xe("button", {
              ref_key: "confirmYesButton",
              ref: Uo,
              type: "button",
              class: "pnl-tst-dbtn",
              "aria-keyshortcuts": "Y",
              onClick: Di
            }, [...u[5] || (u[5] = [
              xe("span", { class: "pnl-tst-dkey" }, "Y", -1),
              Ts("es ", -1)
            ])], 512),
            xe("button", {
              ref_key: "confirmNoButton",
              ref: qo,
              type: "button",
              class: "pnl-tst-dbtn",
              "aria-keyshortcuts": "N",
              onClick: ki
            }, [...u[6] || (u[6] = [
              xe("span", { class: "pnl-tst-dkey" }, "N", -1),
              Ts("o ", -1)
            ])], 512)
          ])
        ], 32)
      ])) : Xe("", !0),
      Dn.value ? (re(), oe("div", {
        key: 4,
        ref_key: "menuElement",
        ref: Tr,
        class: "pnl-tst-menu",
        role: "menu",
        "aria-orientation": "vertical",
        "aria-label": Nc.value,
        style: st({ left: `${kn.value.left}px`, top: `${kn.value.top}px` }),
        onKeydown: Xc
      }, [
        (re(!0), oe(Ee, null, Kn(Bo.value, (g) => (re(), oe(Ee, {
          key: g.uid
        }, [
          g.id === "|" ? (re(), oe("div", H0)) : (re(), oe("button", {
            key: 1,
            ref_for: !0,
            ref: (v) => $c(g.uid, v),
            type: "button",
            class: "pnl-tst-mitem",
            role: "menuitem",
            "aria-keyshortcuts": g.keys,
            "aria-disabled": !Pn(g),
            tabindex: Hi(g) === un.value ? 0 : -1,
            onClick: (v) => Gc(g),
            onFocus: (v) => un.value = Hi(g)
          }, [
            xe("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: g.icon
            }, null, 8, j0),
            xe("span", z0, Ft(g.label), 1),
            g.keys ? (re(), oe("span", K0, Ft(Ti(g)), 1)) : Xe("", !0)
          ], 40, L0))
        ], 64))), 128))
      ], 44, F0)) : Xe("", !0)
    ], 512));
  }
};
function U0({ model: e, el: t }) {
  t.style.display = "block", t.style.width = "100%", t.style.height = "100%";
  const n = document.createElement("div");
  n.className = "pnl-tst-root", n.style.height = "100%", t.append(n);
  const r = /* @__PURE__ */ yo({
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
  const a = (O, _) => {
    l += 1, s.push({ seq: l, event_name: O, event_params: _ }), s.length > o && s.shift(), e.set("_event_data", { events: [...s], timestamp: Date.now() }), e.save_changes();
  }, c = (O, _) => O.length === _.length && O.every((D, j) => D === _[j]), f = (O) => (_) => {
    const D = [...e.get(O) || []].sort();
    c(D, _) || (e.set(O, _), e.save_changes());
  }, d = f("expanded_keys"), h = f("selected_keys"), w = (O) => {
    (e.get("filter_text") || "") !== O && (e.set("filter_text", O), e.save_changes());
  }, y = (O) => {
    (e.get("editing_key") || "") !== O && (e.set("editing_key", O), e.save_changes());
  }, I = (O, _) => O.length === _.length && O.every((D, j) => D.id === _[j].id && !!D.desc == !!_[j].desc), E = (O) => {
    I(e.get("sorting") || [], O) || (e.set("sorting", O), e.save_changes());
  }, A = (O, _) => {
    const D = Object.keys(O);
    return D.length === Object.keys(_).length && D.every((j) => O[j] === _[j]);
  }, C = Ag(W0, {
    state: r,
    emitEvent: a,
    setExpandedKeys: d,
    setSelectedKeys: h,
    setFilterText: w,
    setEditingKey: y,
    setSorting: E,
    setColumnWidths: (O) => {
      A(e.get("column_widths") || {}, O) || (e.set("column_widths", O), e.save_changes());
    }
  });
  return C.mount(n), e.on("change:_view", () => {
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
    C.unmount();
  };
}
export {
  U0 as render
};

/**
* @vue/shared v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function $s(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const he = {}, wn = [], ft = () => {
}, Ul = () => !1, po = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), ho = (e) => e.startsWith("onUpdate:"), De = Object.assign, Ws = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, lf = Object.prototype.hasOwnProperty, ae = (e, t) => lf.call(e, t), q = Array.isArray, zt = (e) => fr(e) === "[object Map]", eo = (e) => fr(e) === "[object Set]", Ni = (e) => fr(e) === "[object Date]", X = (e) => typeof e == "function", be = (e) => typeof e == "string", dt = (e) => typeof e == "symbol", de = (e) => e !== null && typeof e == "object", ql = (e) => (de(e) || X(e)) && X(e.then) && X(e.catch), Gl = Object.prototype.toString, fr = (e) => Gl.call(e), af = (e) => fr(e).slice(8, -1), Xl = (e) => fr(e) === "[object Object]", Us = (e) => be(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Gn = /* @__PURE__ */ $s(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), mo = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, uf = /-\w/g, Ye = mo(
  (e) => e.replace(uf, (t) => t.slice(1).toUpperCase())
), cf = /\B([A-Z])/g, Jt = mo(
  (e) => e.replace(cf, "-$1").toLowerCase()
), Yl = mo((e) => e.charAt(0).toUpperCase() + e.slice(1)), os = mo(
  (e) => e ? `on${Yl(e)}` : ""
), ut = (e, t) => !Object.is(e, t), ss = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Zl = (e, t, n, r = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: r,
    value: n
  });
}, ff = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let $i;
const vo = () => $i || ($i = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function st(e) {
  if (q(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], o = be(r) ? hf(r) : st(r);
      if (o)
        for (const s in o)
          t[s] = o[s];
    }
    return t;
  } else if (be(e) || de(e))
    return e;
}
const df = /;(?![^(]*\))/g, gf = /:([^]+)/, pf = /\/\*[^]*?\*\//g;
function hf(e) {
  const t = {};
  return e.replace(pf, "").split(df).forEach((n) => {
    if (n) {
      const r = n.split(gf);
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
const mf = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", vf = /* @__PURE__ */ $s(mf);
function Jl(e) {
  return !!e || e === "";
}
function wf(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let r = 0; n && r < e.length; r++)
    n = wo(e[r], t[r]);
  return n;
}
function Wi(e, t) {
  if (e.size !== t.size) return !1;
  const n = Array.from(t), r = new Uint8Array(n.length);
  for (const o of e) {
    let s = -1;
    for (let l = 0; l < n.length; l++)
      if (!r[l] && wo(o, n[l])) {
        s = l;
        break;
      }
    if (s < 0) return !1;
    r[s] = 1;
  }
  return !0;
}
function wo(e, t) {
  if (e === t) return !0;
  let n = Ni(e), r = Ni(t);
  if (n || r)
    return n && r ? e.getTime() === t.getTime() : !1;
  if (n = dt(e), r = dt(t), n || r)
    return e === t;
  if (n = q(e), r = q(t), n || r)
    return n && r ? wf(e, t) : !1;
  if (n = de(e), r = de(t), n || r) {
    if (!n || !r)
      return !1;
    if (n = zt(e), r = zt(t), n || r || (n = eo(e), r = eo(t), n || r))
      return n && r ? Wi(e, t) : !1;
    const o = Object.keys(e).length, s = Object.keys(t).length;
    if (o !== s)
      return !1;
    for (const l in e) {
      const a = e.hasOwnProperty(l), u = t.hasOwnProperty(l);
      if (a && !u || !a && u || !wo(e[l], t[l]))
        return !1;
    }
  }
  return String(e) === String(t);
}
const Ql = (e) => !!(e && e.__v_isRef === !0), Ht = (e) => be(e) ? e : e == null ? "" : q(e) || de(e) && (e.toString === Gl || !X(e.toString)) ? Ql(e) ? Ht(e.value) : JSON.stringify(e, ea, 2) : String(e), ea = (e, t) => Ql(t) ? ea(e, t.value) : zt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [r, o], s) => (n[is(r, s) + " =>"] = o, n),
    {}
  )
} : eo(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => is(n))
} : dt(t) ? is(t) : de(t) && !q(t) && !Xl(t) ? String(t) : t, is = (e, t = "") => {
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
let Ce;
class yf {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && Ce && (Ce.active ? (this.parent = Ce, this.index = (Ce.scopes || (Ce.scopes = [])).push(
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
      const n = Ce;
      try {
        return Ce = this, t();
      } finally {
        Ce = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Ce, Ce = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (Ce === this)
        Ce = this.prevScope;
      else {
        let t = Ce;
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
function ta() {
  return Ce;
}
function bf(e, t = !1) {
  Ce && Ce.cleanups.push(e);
}
let pe;
const ls = /* @__PURE__ */ new WeakSet();
class na {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Ce && (Ce.active ? Ce.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, ls.has(this) && (ls.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || oa(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Ui(this), sa(this);
    const t = pe, n = Ze;
    pe = this, Ze = !0;
    try {
      return this.fn();
    } finally {
      ia(this), pe = t, Ze = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Xs(t);
      this.deps = this.depsTail = void 0, Ui(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? ls.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Rs(this) && this.run();
  }
  get dirty() {
    return Rs(this);
  }
}
let ra = 0, Xn, Yn;
function oa(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Yn, Yn = e;
    return;
  }
  e.next = Xn, Xn = e;
}
function qs() {
  ra++;
}
function Gs() {
  if (--ra > 0)
    return;
  if (Yn) {
    let t = Yn;
    for (Yn = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; Xn; ) {
    let t = Xn;
    for (Xn = void 0; t; ) {
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
function sa(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function ia(e) {
  let t, n = e.depsTail, r = n;
  for (; r; ) {
    const o = r.prevDep;
    r.version === -1 ? (r === n && (n = o), Xs(r), _f(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = o;
  }
  e.deps = t, e.depsTail = n;
}
function Rs(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (la(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function la(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === nr) || (e.globalVersion = nr, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Rs(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = pe, r = Ze;
  pe = e, Ze = !0;
  try {
    sa(e);
    const o = e.fn(e._value);
    (t.version === 0 || ut(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    pe = n, Ze = r, ia(e), e.flags &= -3;
  }
}
function Xs(e, t = !1) {
  const { dep: n, prevSub: r, nextSub: o } = e;
  if (r && (r.nextSub = o, e.prevSub = void 0), o && (o.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
    n.computed.flags &= -5;
    for (let s = n.computed.deps; s; s = s.nextDep)
      Xs(s, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function _f(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let Ze = !0;
const aa = [];
function Ct() {
  aa.push(Ze), Ze = !1;
}
function Mt() {
  const e = aa.pop();
  Ze = e === void 0 ? !0 : e;
}
function Ui(e) {
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
let nr = 0;
class Sf {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Ys {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!pe || !Ze || pe === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== pe)
      n = this.activeLink = new Sf(pe, this), pe.deps ? (n.prevDep = pe.depsTail, pe.depsTail.nextDep = n, pe.depsTail = n) : pe.deps = pe.depsTail = n, ua(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const r = n.nextDep;
      r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = pe.depsTail, n.nextDep = void 0, pe.depsTail.nextDep = n, pe.depsTail = n, pe.deps === n && (pe.deps = r);
    }
    return n;
  }
  trigger(t) {
    this.version++, nr++, this.notify(t);
  }
  notify(t) {
    qs();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Gs();
    }
  }
}
function ua(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let r = t.deps; r; r = r.nextDep)
        ua(r);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const Cs = /* @__PURE__ */ new WeakMap(), Wt = /* @__PURE__ */ Symbol(
  ""
), Ms = /* @__PURE__ */ Symbol(
  ""
), rr = /* @__PURE__ */ Symbol(
  ""
);
function Oe(e, t, n) {
  if (Ze && pe) {
    let r = Cs.get(e);
    r || Cs.set(e, r = /* @__PURE__ */ new Map());
    let o = r.get(n);
    o || (r.set(n, o = new Ys()), o.map = r, o.key = n), o.track();
  }
}
function xt(e, t, n, r, o, s) {
  const l = Cs.get(e);
  if (!l) {
    nr++;
    return;
  }
  const a = (u) => {
    u && u.trigger();
  };
  if (qs(), t === "clear")
    l.forEach(a);
  else {
    const u = q(e), f = u && Us(n);
    if (u && n === "length") {
      const d = Number(r);
      l.forEach((h, w) => {
        (w === "length" || w === rr || !dt(w) && w >= d) && a(h);
      });
    } else
      switch ((n !== void 0 || l.has(void 0)) && a(l.get(n)), f && a(l.get(rr)), t) {
        case "add":
          u ? f && a(l.get("length")) : (a(l.get(Wt)), zt(e) && a(l.get(Ms)));
          break;
        case "delete":
          u || (a(l.get(Wt)), zt(e) && a(l.get(Ms)));
          break;
        case "set":
          zt(e) && a(l.get(Wt));
          break;
      }
  }
  Gs();
}
function gn(e) {
  const t = /* @__PURE__ */ le(e);
  return t === e ? t : (Oe(t, "iterate", rr), /* @__PURE__ */ $e(e) ? t : t.map(Je));
}
function yo(e) {
  return Oe(e = /* @__PURE__ */ le(e), "iterate", rr), e;
}
function lt(e, t) {
  return /* @__PURE__ */ It(e) ? Sn(/* @__PURE__ */ Ut(e) ? Je(t) : t) : Je(t);
}
const xf = {
  __proto__: null,
  [Symbol.iterator]() {
    return as(this, Symbol.iterator, (e) => lt(this, e));
  },
  concat(...e) {
    return gn(this).concat(
      ...e.map((t) => q(t) ? gn(t) : t)
    );
  },
  entries() {
    return as(this, "entries", (e) => (e[1] = lt(this, e[1]), e));
  },
  every(e, t) {
    return bt(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return bt(
      this,
      "filter",
      e,
      t,
      (n) => n.map((r) => lt(this, r)),
      arguments
    );
  },
  find(e, t) {
    return bt(
      this,
      "find",
      e,
      t,
      (n) => lt(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return bt(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return bt(
      this,
      "findLast",
      e,
      t,
      (n) => lt(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return bt(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return bt(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return us(this, "includes", e);
  },
  indexOf(...e) {
    return us(this, "indexOf", e);
  },
  join(e) {
    return gn(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return us(this, "lastIndexOf", e);
  },
  map(e, t) {
    return bt(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Bn(this, "pop");
  },
  push(...e) {
    return Bn(this, "push", e);
  },
  reduce(e, ...t) {
    return qi(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return qi(this, "reduceRight", e, t);
  },
  shift() {
    return Bn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return bt(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Bn(this, "splice", e);
  },
  toReversed() {
    return gn(this).toReversed();
  },
  toSorted(e) {
    return gn(this).toSorted(e);
  },
  toSpliced(...e) {
    return gn(this).toSpliced(...e);
  },
  unshift(...e) {
    return Bn(this, "unshift", e);
  },
  values() {
    return as(this, "values", (e) => lt(this, e));
  }
};
function as(e, t, n) {
  const r = yo(e), o = r[t]();
  return r !== e && !/* @__PURE__ */ $e(e) && (o._next = o.next, o.next = () => {
    const s = o._next();
    return s.done || (s.value = n(s.value)), s;
  }), o;
}
const Rf = Array.prototype;
function bt(e, t, n, r, o, s) {
  const l = yo(e), a = l !== e && !/* @__PURE__ */ $e(e), u = l[t];
  if (u !== Rf[t]) {
    const h = u.apply(e, s);
    return a ? Je(h) : h;
  }
  let f = n;
  l !== e && (a ? f = function(h, w) {
    return n.call(this, lt(e, h), w, e);
  } : n.length > 2 && (f = function(h, w) {
    return n.call(this, h, w, e);
  }));
  const d = u.call(l, f, r);
  return a && o ? o(d) : d;
}
function qi(e, t, n, r) {
  const o = yo(e), s = o !== e && !/* @__PURE__ */ $e(e);
  let l = n, a = !1;
  o !== e && (s ? (a = r.length === 0, l = function(f, d, h) {
    return a && (a = !1, f = lt(e, f)), n.call(this, f, lt(e, d), h, e);
  }) : n.length > 3 && (l = function(f, d, h) {
    return n.call(this, f, d, h, e);
  }));
  const u = o[t](l, ...r);
  return a ? lt(e, u) : u;
}
function us(e, t, n) {
  const r = /* @__PURE__ */ le(e);
  Oe(r, "iterate", rr);
  const o = r[t](...n);
  return (o === -1 || o === !1) && /* @__PURE__ */ Qs(n[0]) ? (n[0] = /* @__PURE__ */ le(n[0]), r[t](...n)) : o;
}
function Bn(e, t, n = []) {
  Ct(), qs();
  const r = (/* @__PURE__ */ le(e))[t].apply(e, n);
  return Gs(), Mt(), r;
}
const Cf = /* @__PURE__ */ $s("__proto__,__v_isRef,__isVue"), ca = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(dt)
);
function Mf(e) {
  dt(e) || (e = String(e));
  const t = /* @__PURE__ */ le(this);
  return Oe(t, "has", e), t.hasOwnProperty(e);
}
class fa {
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
      return r === (o ? s ? Hf : ha : s ? pa : ga).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const l = q(t);
    if (!o) {
      let u;
      if (l && (u = xf[n]))
        return u;
      if (n === "hasOwnProperty")
        return Mf;
    }
    const a = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ Pe(t) ? t : r
    );
    if ((dt(n) ? ca.has(n) : Cf(n)) || (o || Oe(t, "get", n), s))
      return a;
    if (/* @__PURE__ */ Pe(a)) {
      const u = l && Us(n) ? a : a.value;
      return o && de(u) ? /* @__PURE__ */ Es(u) : u;
    }
    return de(a) ? o ? /* @__PURE__ */ Es(a) : /* @__PURE__ */ bo(a) : a;
  }
}
class da extends fa {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, o) {
    let s = t[n];
    const l = q(t) && Us(n);
    if (!this._isShallow) {
      const f = /* @__PURE__ */ It(s);
      if (!/* @__PURE__ */ $e(r) && !/* @__PURE__ */ It(r) && (s = /* @__PURE__ */ le(s), r = /* @__PURE__ */ le(r)), !l && /* @__PURE__ */ Pe(s) && !/* @__PURE__ */ Pe(r))
        return f || (s.value = r), !0;
    }
    const a = l ? Number(n) < t.length : ae(t, n), u = Reflect.set(
      t,
      n,
      r,
      /* @__PURE__ */ Pe(t) ? t : o
    );
    return t === /* @__PURE__ */ le(o) && u && (a ? ut(r, s) && xt(t, "set", n, r) : xt(t, "add", n, r)), u;
  }
  deleteProperty(t, n) {
    const r = ae(t, n);
    t[n];
    const o = Reflect.deleteProperty(t, n);
    return o && r && xt(t, "delete", n, void 0), o;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!dt(n) || !ca.has(n)) && Oe(t, "has", n), r;
  }
  ownKeys(t) {
    return Oe(
      t,
      "iterate",
      q(t) ? "length" : Wt
    ), Reflect.ownKeys(t);
  }
}
class If extends fa {
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
const Ef = /* @__PURE__ */ new da(), Af = /* @__PURE__ */ new If(), Of = /* @__PURE__ */ new da(!0);
const Is = (e) => e, zr = (e) => Reflect.getPrototypeOf(e);
function Pf(e, t, n) {
  return function(...r) {
    const o = this.__v_raw, s = /* @__PURE__ */ le(o), l = zt(s), a = e === "entries" || e === Symbol.iterator && l, u = e === "keys" && l, f = o[e](...r), d = n ? Is : t ? Sn : Je;
    return !t && Oe(
      s,
      "iterate",
      u ? Ms : Wt
    ), De(
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
function Df(e, t) {
  const n = {
    get(o) {
      const s = this.__v_raw, l = /* @__PURE__ */ le(s), a = /* @__PURE__ */ le(o);
      e || (ut(o, a) && Oe(l, "get", o), Oe(l, "get", a));
      const { has: u } = zr(l), f = t ? Is : e ? Sn : Je;
      if (u.call(l, o))
        return f(s.get(o));
      if (u.call(l, a))
        return f(s.get(a));
      s !== l && s.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && Oe(/* @__PURE__ */ le(o), "iterate", Wt), o.size;
    },
    has(o) {
      const s = this.__v_raw, l = /* @__PURE__ */ le(s), a = /* @__PURE__ */ le(o);
      return e || (ut(o, a) && Oe(l, "has", o), Oe(l, "has", a)), o === a ? s.has(o) : s.has(o) || s.has(a);
    },
    forEach(o, s) {
      const l = this, a = l.__v_raw, u = /* @__PURE__ */ le(a), f = t ? Is : e ? Sn : Je;
      return !e && Oe(u, "iterate", Wt), a.forEach((d, h) => o.call(s, f(d), f(h), l));
    }
  };
  return De(
    n,
    e ? {
      add: Kr("add"),
      set: Kr("set"),
      delete: Kr("delete"),
      clear: Kr("clear")
    } : {
      add(o) {
        const s = /* @__PURE__ */ le(this), l = zr(s), a = /* @__PURE__ */ le(o), u = !t && !/* @__PURE__ */ $e(o) && !/* @__PURE__ */ It(o) ? a : o;
        return l.has.call(s, u) || ut(o, u) && l.has.call(s, o) || ut(a, u) && l.has.call(s, a) || (s.add(u), xt(s, "add", u, u)), this;
      },
      set(o, s) {
        !t && !/* @__PURE__ */ $e(s) && !/* @__PURE__ */ It(s) && (s = /* @__PURE__ */ le(s));
        const l = /* @__PURE__ */ le(this), { has: a, get: u } = zr(l);
        let f = a.call(l, o);
        f || (o = /* @__PURE__ */ le(o), f = a.call(l, o));
        const d = u.call(l, o);
        return l.set(o, s), f ? ut(s, d) && xt(l, "set", o, s) : xt(l, "add", o, s), this;
      },
      delete(o) {
        const s = /* @__PURE__ */ le(this), { has: l, get: a } = zr(s);
        let u = l.call(s, o);
        u || (o = /* @__PURE__ */ le(o), u = l.call(s, o)), a && a.call(s, o);
        const f = s.delete(o);
        return u && xt(s, "delete", o, void 0), f;
      },
      clear() {
        const o = /* @__PURE__ */ le(this), s = o.size !== 0, l = o.clear();
        return s && xt(
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
    n[o] = Pf(o, e, t);
  }), n;
}
function Zs(e, t) {
  const n = Df(e, t);
  return (r, o, s) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(
    ae(n, o) && o in r ? n : r,
    o,
    s
  );
}
const kf = {
  get: /* @__PURE__ */ Zs(!1, !1)
}, Tf = {
  get: /* @__PURE__ */ Zs(!1, !0)
}, Ff = {
  get: /* @__PURE__ */ Zs(!0, !1)
};
const ga = /* @__PURE__ */ new WeakMap(), pa = /* @__PURE__ */ new WeakMap(), ha = /* @__PURE__ */ new WeakMap(), Hf = /* @__PURE__ */ new WeakMap();
function Lf(e) {
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
function bo(e) {
  return /* @__PURE__ */ It(e) ? e : Js(
    e,
    !1,
    Ef,
    kf,
    ga
  );
}
// @__NO_SIDE_EFFECTS__
function jf(e) {
  return Js(
    e,
    !1,
    Of,
    Tf,
    pa
  );
}
// @__NO_SIDE_EFFECTS__
function Es(e) {
  return Js(
    e,
    !0,
    Af,
    Ff,
    ha
  );
}
function Js(e, t, n, r, o) {
  if (!de(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const s = o.get(e);
  if (s)
    return s;
  const l = Lf(af(e));
  if (l === 0)
    return e;
  const a = new Proxy(
    e,
    l === 2 ? r : n
  );
  return o.set(e, a), a;
}
// @__NO_SIDE_EFFECTS__
function Ut(e) {
  return /* @__PURE__ */ It(e) ? /* @__PURE__ */ Ut(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function It(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function $e(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Qs(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function le(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ le(t) : e;
}
function zf(e) {
  return !ae(e, "__v_skip") && Object.isExtensible(e) && Zl(e, "__v_skip", !0), e;
}
const Je = (e) => de(e) ? /* @__PURE__ */ bo(e) : e, Sn = (e) => de(e) ? /* @__PURE__ */ Es(e) : e;
// @__NO_SIDE_EFFECTS__
function Pe(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function ne(e) {
  return ma(e, !1);
}
// @__NO_SIDE_EFFECTS__
function Kf(e) {
  return ma(e, !0);
}
function ma(e, t) {
  return /* @__PURE__ */ Pe(e) ? e : new Vf(e, t);
}
class Vf {
  constructor(t, n) {
    this.dep = new Ys(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ le(t), this._value = n ? t : Je(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, r = this.__v_isShallow || /* @__PURE__ */ $e(t) || /* @__PURE__ */ It(t);
    t = r ? t : /* @__PURE__ */ le(t), ut(t, n) && (this._rawValue = t, this._value = r ? t : Je(t), this.dep.trigger());
  }
}
function qt(e) {
  return /* @__PURE__ */ Pe(e) ? e.value : e;
}
const Bf = {
  get: (e, t, n) => t === "__v_raw" ? e : qt(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return /* @__PURE__ */ Pe(o) && !/* @__PURE__ */ Pe(n) ? (o.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function va(e) {
  return /* @__PURE__ */ Ut(e) ? e : new Proxy(e, Bf);
}
class Nf {
  constructor(t, n, r) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Ys(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = nr - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    pe !== this)
      return oa(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return la(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function $f(e, t, n = !1) {
  let r, o;
  return X(e) ? r = e : (r = e.get, o = e.set), new Nf(r, o, n);
}
const Vr = {}, to = /* @__PURE__ */ new WeakMap();
let $t;
function Wf(e, t = !1, n = $t) {
  if (n) {
    let r = to.get(n);
    r || to.set(n, r = []), r.push(e);
  }
}
function Uf(e, t, n = he) {
  const { immediate: r, deep: o, once: s, scheduler: l, augmentJob: a, call: u } = n, f = (_) => o ? _ : /* @__PURE__ */ $e(_) || o === !1 || o === 0 ? jt(_, 1) : jt(_);
  let d, h, w, y, I = !1, E = !1;
  if (/* @__PURE__ */ Pe(e) ? (h = () => e.value, I = /* @__PURE__ */ $e(e)) : /* @__PURE__ */ Ut(e) ? (h = () => f(e), I = !0) : q(e) ? (E = !0, I = e.some((_) => /* @__PURE__ */ Ut(_) || /* @__PURE__ */ $e(_)), h = () => e.map((_) => {
    if (/* @__PURE__ */ Pe(_))
      return _.value;
    if (/* @__PURE__ */ Ut(_))
      return f(_);
    if (X(_))
      return u ? u(_, 2) : _();
  })) : X(e) ? t ? h = u ? () => u(e, 2) : e : h = () => {
    if (w) {
      Ct();
      try {
        w();
      } finally {
        Mt();
      }
    }
    const _ = $t;
    $t = d;
    try {
      return u ? u(e, 3, [y]) : e(y);
    } finally {
      $t = _;
    }
  } : h = ft, t && o) {
    const _ = h, D = o === !0 ? 1 / 0 : o;
    h = () => jt(_(), D);
  }
  const A = ta(), z = () => {
    d.stop(), A && A.active && Ws(A.effects, d);
  };
  if (s && t) {
    const _ = t;
    t = (...D) => {
      const j = _(...D);
      return z(), j;
    };
  }
  let M = E ? new Array(e.length).fill(Vr) : Vr;
  const O = (_) => {
    if (!(!(d.flags & 1) || !d.dirty && !_))
      if (t) {
        const D = d.run();
        if (_ || o || I || (E ? D.some((j, U) => ut(j, M[U])) : ut(D, M))) {
          w && w();
          const j = $t;
          $t = d;
          try {
            const U = [
              D,
              // pass undefined as the old value when it's changed for the first time
              M === Vr ? void 0 : E && M[0] === Vr ? [] : M,
              y
            ];
            M = D, u ? u(t, 3, U) : (
              // @ts-expect-error
              t(...U)
            );
          } finally {
            $t = j;
          }
        }
      } else
        d.run();
  };
  return a && a(O), d = new na(h), d.scheduler = l ? () => l(O, !1) : O, y = (_) => Wf(_, !1, d), w = d.onStop = () => {
    const _ = to.get(d);
    if (_) {
      if (u)
        u(_, 4);
      else
        for (const D of _) D();
      to.delete(d);
    }
  }, t ? r ? O(!0) : M = d.run() : l ? l(O.bind(null, !0), !0) : d.run(), z.pause = d.pause.bind(d), z.resume = d.resume.bind(d), z.stop = z, z;
}
function jt(e, t = 1 / 0, n) {
  if (t <= 0 || !de(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ Pe(e))
    jt(e.value, t, n);
  else if (q(e))
    for (let r = 0; r < e.length; r++)
      jt(e[r], t, n);
  else if (eo(e) || zt(e))
    e.forEach((r) => {
      jt(r, t, n);
    });
  else if (Xl(e)) {
    for (const r in e)
      jt(e[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, r) && jt(e[r], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function dr(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (o) {
    _o(o, t, n);
  }
}
function Qe(e, t, n, r) {
  if (X(e)) {
    const o = dr(e, t, n, r);
    return o && ql(o) && o.catch((s) => {
      _o(s, t, n);
    }), o;
  }
  if (q(e)) {
    const o = [];
    for (let s = 0; s < e.length; s++)
      o.push(Qe(e[s], t, n, r));
    return o;
  }
}
function _o(e, t, n, r = !0) {
  const o = t ? t.vnode : null, { errorHandler: s, throwUnhandledErrorInProduction: l } = t && t.appContext.config || he;
  if (t) {
    let a = t.parent;
    const u = t.proxy, f = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; a; ) {
      const d = a.ec;
      if (d) {
        for (let h = 0; h < d.length; h++)
          if (d[h](e, u, f) === !1)
            return;
      }
      a = a.parent;
    }
    if (s) {
      Ct(), dr(s, null, 10, [
        e,
        u,
        f
      ]), Mt();
      return;
    }
  }
  qf(e, n, o, r, l);
}
function qf(e, t, n, r = !0, o = !1) {
  if (o)
    throw e;
  console.error(e);
}
const Te = [];
let ot = -1;
const yn = [];
let Lt = null, mn = 0;
const wa = /* @__PURE__ */ Promise.resolve();
let no = null;
function je(e) {
  const t = no || wa;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Gf(e) {
  let t = ot + 1, n = Te.length;
  for (; t < n; ) {
    const r = t + n >>> 1, o = Te[r], s = or(o);
    s < e || s === e && o.flags & 2 ? t = r + 1 : n = r;
  }
  return t;
}
function ei(e) {
  if (!(e.flags & 1)) {
    const t = or(e), n = Te[Te.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= or(n) ? Te.push(e) : Te.splice(Gf(t), 0, e), e.flags |= 1, ya();
  }
}
function ya() {
  no || (no = wa.then(_a));
}
function Xf(e) {
  if (!q(e))
    Lt && e.id === -1 ? Lt.splice(mn + 1, 0, e) : e.flags & 1 || (yn.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      yn.push(e[t]);
  ya();
}
function Gi(e, t, n = ot + 1) {
  for (; n < Te.length; n++) {
    const r = Te[n];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid)
        continue;
      Te.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function ba(e) {
  if (yn.length) {
    const t = [...new Set(yn)].sort(
      (n, r) => or(n) - or(r)
    );
    if (yn.length = 0, Lt) {
      for (let n = 0; n < t.length; n++)
        Lt.push(t[n]);
      return;
    }
    for (Lt = t, mn = 0; mn < Lt.length; mn++) {
      const n = Lt[mn];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    Lt = null, mn = 0;
  }
}
const or = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function _a(e) {
  try {
    for (ot = 0; ot < Te.length; ot++) {
      const t = Te[ot];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), dr(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; ot < Te.length; ot++) {
      const t = Te[ot];
      t && (t.flags &= -2);
    }
    ot = -1, Te.length = 0, ba(), no = null, (Te.length || yn.length) && _a();
  }
}
let ct = null, Sa = null;
function ro(e) {
  const t = ct;
  return ct = e, Sa = e && e.type.__scopeId || null, t;
}
function Yf(e, t = ct, n) {
  if (!t || e._n)
    return e;
  const r = (...o) => {
    r._d && sl(-1);
    const s = ro(t), l = Gt.length;
    let a;
    try {
      a = e(...o);
    } finally {
      for (let u = Gt.length; u > l; u--) Ua();
      ro(s), r._d && sl(1);
    }
    return a;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function Bt(e, t, n, r) {
  const o = e.dirs, s = t && t.dirs;
  for (let l = 0; l < o.length; l++) {
    const a = o[l];
    s && (a.oldValue = s[l].value);
    let u = a.dir[r];
    u && (Ct(), Qe(u, n, 8, [
      e.el,
      a,
      e,
      t
    ]), Mt());
  }
}
function Zf(e, t) {
  if (Fe) {
    let n = Fe.provides;
    const r = Fe.parent && Fe.parent.provides;
    r === n && (n = Fe.provides = Object.create(r)), n[e] = t;
  }
}
function Gr(e, t, n = !1) {
  const r = qd();
  if (r || bn) {
    let o = bn ? bn._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && X(t) ? t.call(r && r.proxy) : t;
  }
}
const Jf = /* @__PURE__ */ Symbol.for("v-scx"), Qf = () => Gr(Jf);
function we(e, t, n) {
  return xa(e, t, n);
}
function xa(e, t, n = he) {
  const { immediate: r, deep: o, flush: s, once: l } = n, a = De({}, n), u = t && r || !t && s !== "post";
  let f;
  if (lr) {
    if (s === "sync") {
      const y = Qf();
      f = y.__watcherHandles || (y.__watcherHandles = []);
    } else if (!u) {
      const y = () => {
      };
      return y.stop = ft, y.resume = ft, y.pause = ft, y;
    }
  }
  const d = Fe;
  a.call = (y, I, E) => Qe(y, d, I, E);
  let h = !1;
  s === "post" ? a.scheduler = (y) => {
    Le(y, d && d.suspense);
  } : s !== "sync" && (h = !0, a.scheduler = (y, I) => {
    I ? y() : ei(y);
  }), a.augmentJob = (y) => {
    t && (y.flags |= 4), h && (y.flags |= 2, d && (y.id = d.uid, y.i = d));
  };
  const w = Uf(e, t, a);
  return lr && (f ? f.push(w) : u && w()), w;
}
function ed(e, t, n) {
  const r = this.proxy, o = be(e) ? e.includes(".") ? Ra(r, e) : () => r[e] : e.bind(r, r);
  let s;
  X(t) ? s = t : (s = t.handler, n = t);
  const l = gr(this), a = xa(o, s.bind(r), n);
  return l(), a;
}
function Ra(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++)
      r = r[n[o]];
    return r;
  };
}
const td = /* @__PURE__ */ Symbol("_vte"), So = (e) => e.__isTeleport, cs = /* @__PURE__ */ Symbol("_leaveCb");
function nd(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== Et) {
        t = n;
        break;
      }
  }
  return t;
}
function Ca(e) {
  if (!ni(e))
    return So(e.type) && e.children ? nd(e.children) : e;
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
function ti(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    ti(
      So(n.type) && Ca(n) || n,
      t
    );
  } else e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Ma(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Xi(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const oo = /* @__PURE__ */ new WeakMap();
function Zn(e, t, n, r, o = !1) {
  if (q(e)) {
    e.forEach(
      (E, A) => Zn(
        E,
        t && (q(t) ? t[A] : t),
        n,
        r,
        o
      )
    );
    return;
  }
  if (Jn(r) && !o) {
    r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && Zn(e, t, n, r.component.subTree);
    return;
  }
  const s = r.shapeFlag & 4 ? si(r.component) : r.el, l = o ? null : s, { i: a, r: u } = e, f = t && t.r, d = a.refs === he ? a.refs = {} : a.refs, h = a.setupState, w = /* @__PURE__ */ le(h), y = h === he ? Ul : (E) => Xi(d, E) ? !1 : ae(w, E), I = (E, A) => !(A && Xi(d, A));
  if (f != null && f !== u) {
    if (Yi(t), be(f))
      d[f] = null, y(f) && (h[f] = null);
    else if (/* @__PURE__ */ Pe(f)) {
      const E = t;
      I(f, E.k) && (f.value = null), E.k && (d[E.k] = null);
    }
  }
  if (X(u))
    dr(u, a, 12, [l, d]);
  else {
    const E = be(u), A = /* @__PURE__ */ Pe(u);
    if (E || A) {
      const z = () => {
        if (e.f) {
          const M = E ? y(u) ? h[u] : d[u] : I() || !e.k ? u.value : d[e.k];
          if (o)
            q(M) && Ws(M, s);
          else if (q(M))
            M.includes(s) || M.push(s);
          else if (E)
            d[u] = [s], y(u) && (h[u] = d[u]);
          else {
            const O = [s];
            I(u, e.k) && (u.value = O), e.k && (d[e.k] = O);
          }
        } else E ? (d[u] = l, y(u) && (h[u] = l)) : A && (I(u, e.k) && (u.value = l), e.k && (d[e.k] = l));
      };
      if (l) {
        const M = () => {
          z(), oo.delete(e);
        };
        M.id = -1, oo.set(e, M), Le(M, n);
      } else
        Yi(e), z();
    }
  }
}
function Yi(e) {
  const t = oo.get(e);
  t && (t.flags |= 8, oo.delete(e));
}
vo().requestIdleCallback;
vo().cancelIdleCallback;
const Jn = (e) => !!e.type.__asyncLoader, ni = (e) => e.type.__isKeepAlive;
function rd(e, t) {
  Ia(e, "a", t);
}
function od(e, t) {
  Ia(e, "da", t);
}
function Ia(e, t, n = Fe) {
  const r = e.__wdc || (e.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (xo(t, r, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      ni(o.parent.vnode) && sd(r, t, n, o), o = o.parent;
  }
}
function sd(e, t, n, r) {
  const o = xo(
    t,
    e,
    r,
    !0
    /* prepend */
  );
  Ea(() => {
    Ws(r[t], o);
  }, n);
}
function xo(e, t, n = Fe, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), s = t.__weh || (t.__weh = (...l) => {
      Ct();
      const a = gr(n), u = Qe(t, n, e, l);
      return a(), Mt(), u;
    });
    return r ? o.unshift(s) : o.push(s), s;
  }
}
const Ot = (e) => (t, n = Fe) => {
  (!lr || e === "sp") && xo(e, (...r) => t(...r), n);
}, id = Ot("bm"), Xr = Ot("m"), ld = Ot(
  "bu"
), ad = Ot("u"), Yr = Ot(
  "bum"
), Ea = Ot("um"), ud = Ot(
  "sp"
), cd = Ot("rtg"), fd = Ot("rtc");
function dd(e, t = Fe) {
  xo("ec", e, t);
}
const gd = /* @__PURE__ */ Symbol.for("v-ndc");
function Nn(e, t, n, r) {
  let o;
  const s = n, l = q(e);
  if (l || be(e)) {
    const a = l && /* @__PURE__ */ Ut(e);
    let u = !1, f = !1;
    a && (u = !/* @__PURE__ */ $e(e), f = /* @__PURE__ */ It(e), e = yo(e)), o = new Array(e.length);
    for (let d = 0, h = e.length; d < h; d++)
      o[d] = t(
        u ? f ? Sn(Je(e[d])) : Je(e[d]) : e[d],
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
        (a, u) => t(a, u, void 0, s)
      );
    else {
      const a = Object.keys(e);
      o = new Array(a.length);
      for (let u = 0, f = a.length; u < f; u++) {
        const d = a[u];
        o[u] = t(e[d], d, u, s);
      }
    }
  else
    o = [];
  return o;
}
const As = (e) => e ? Ya(e) ? si(e) : As(e.parent) : null, Qn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ De(/* @__PURE__ */ Object.create(null), {
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
    $options: (e) => Oa(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      ei(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = je.bind(e.proxy)),
    $watch: (e) => ed.bind(e)
  })
), fs = (e, t) => e !== he && !e.__isScriptSetup && ae(e, t), pd = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: r, data: o, props: s, accessCache: l, type: a, appContext: u } = e;
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
        if (fs(r, t))
          return l[t] = 1, r[t];
        if (o !== he && ae(o, t))
          return l[t] = 2, o[t];
        if (ae(s, t))
          return l[t] = 3, s[t];
        if (n !== he && ae(n, t))
          return l[t] = 4, n[t];
        Os && (l[t] = 0);
      }
    }
    const f = Qn[t];
    let d, h;
    if (f)
      return t === "$attrs" && Oe(e.attrs, "get", ""), f(e);
    if (
      // css module (injected by vue-loader)
      (d = a.__cssModules) && (d = d[t])
    )
      return d;
    if (n !== he && ae(n, t))
      return l[t] = 4, n[t];
    if (
      // global properties
      h = u.config.globalProperties, ae(h, t)
    )
      return h[t];
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: o, ctx: s } = e;
    return fs(o, t) ? (o[t] = n, !0) : r !== he && ae(r, t) ? (r[t] = n, !0) : ae(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (s[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: o, props: s, type: l }
  }, a) {
    let u;
    return !!(n[a] || e !== he && a[0] !== "$" && ae(e, a) || fs(t, a) || ae(s, a) || ae(r, a) || ae(Qn, a) || ae(o.config.globalProperties, a) || (u = l.__cssModules) && u[a]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : ae(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function Zi(e) {
  return q(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let Os = !0;
function hd(e) {
  const t = Oa(e), n = e.proxy, r = e.ctx;
  Os = !1, t.beforeCreate && Ji(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: s,
    methods: l,
    watch: a,
    provide: u,
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
    beforeUnmount: M,
    destroyed: O,
    unmounted: _,
    render: D,
    renderTracked: j,
    renderTriggered: U,
    errorCaptured: K,
    serverPrefetch: L,
    // public API
    expose: ee,
    inheritAttrs: ue,
    // assets
    components: Y,
    directives: me,
    filters: Me
  } = t;
  if (f && md(f, r, null), l)
    for (const J in l) {
      const ce = l[J];
      X(ce) && (r[J] = ce.bind(n));
    }
  if (o) {
    const J = o.call(n, n);
    de(J) && (e.data = /* @__PURE__ */ bo(J));
  }
  if (Os = !0, s)
    for (const J in s) {
      const ce = s[J], Ie = X(ce) ? ce.bind(n, n) : X(ce.get) ? ce.get.bind(n, n) : ft, Pt = !X(ce) && X(ce.set) ? ce.set.bind(n) : ft, ht = $({
        get: Ie,
        set: Pt
      });
      Object.defineProperty(r, J, {
        enumerable: !0,
        configurable: !0,
        get: () => ht.value,
        set: (Ke) => ht.value = Ke
      });
    }
  if (a)
    for (const J in a)
      Aa(a[J], r, n, J);
  if (u) {
    const J = X(u) ? u.call(n) : u;
    Reflect.ownKeys(J).forEach((ce) => {
      Zf(ce, J[ce]);
    });
  }
  d && Ji(d, e, "c");
  function G(J, ce) {
    q(ce) ? ce.forEach((Ie) => J(Ie.bind(n))) : ce && J(ce.bind(n));
  }
  if (G(id, h), G(Xr, w), G(ld, y), G(ad, I), G(rd, E), G(od, A), G(dd, K), G(fd, j), G(cd, U), G(Yr, M), G(Ea, _), G(ud, L), q(ee))
    if (ee.length) {
      const J = e.exposed || (e.exposed = {});
      ee.forEach((ce) => {
        Object.defineProperty(J, ce, {
          get: () => n[ce],
          set: (Ie) => n[ce] = Ie,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  D && e.render === ft && (e.render = D), ue != null && (e.inheritAttrs = ue), Y && (e.components = Y), me && (e.directives = me), L && Ma(e);
}
function md(e, t, n = ft) {
  q(e) && (e = Ps(e));
  for (const r in e) {
    const o = e[r];
    let s;
    de(o) ? "default" in o ? s = Gr(
      o.from || r,
      o.default,
      !0
    ) : s = Gr(o.from || r) : s = Gr(o), /* @__PURE__ */ Pe(s) ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (l) => s.value = l
    }) : t[r] = s;
  }
}
function Ji(e, t, n) {
  Qe(
    q(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Aa(e, t, n, r) {
  let o = r.includes(".") ? Ra(n, r) : () => n[r];
  if (be(e)) {
    const s = t[e];
    X(s) && we(o, s);
  } else if (X(e))
    we(o, e.bind(n));
  else if (de(e))
    if (q(e))
      e.forEach((s) => Aa(s, t, n, r));
    else {
      const s = X(e.handler) ? e.handler.bind(n) : t[e.handler];
      X(s) && we(o, s, e);
    }
}
function Oa(e) {
  const t = e.type, { mixins: n, extends: r } = t, {
    mixins: o,
    optionsCache: s,
    config: { optionMergeStrategies: l }
  } = e.appContext, a = s.get(t);
  let u;
  return a ? u = a : !o.length && !n && !r ? u = t : (u = {}, o.length && o.forEach(
    (f) => so(u, f, l, !0)
  ), so(u, t, l)), de(t) && s.set(t, u), u;
}
function so(e, t, n, r = !1) {
  const { mixins: o, extends: s } = t;
  s && so(e, s, n, !0), o && o.forEach(
    (l) => so(e, l, n, !0)
  );
  for (const l in t)
    if (!(r && l === "expose")) {
      const a = vd[l] || n && n[l];
      e[l] = a ? a(e[l], t[l]) : t[l];
    }
  return e;
}
const vd = {
  data: Qi,
  props: el,
  emits: el,
  // objects
  methods: Un,
  computed: Un,
  // lifecycle
  beforeCreate: ke,
  created: ke,
  beforeMount: ke,
  mounted: ke,
  beforeUpdate: ke,
  updated: ke,
  beforeDestroy: ke,
  beforeUnmount: ke,
  destroyed: ke,
  unmounted: ke,
  activated: ke,
  deactivated: ke,
  errorCaptured: ke,
  serverPrefetch: ke,
  // assets
  components: Un,
  directives: Un,
  // watch
  watch: yd,
  // provide / inject
  provide: Qi,
  inject: wd
};
function Qi(e, t) {
  return t ? e ? function() {
    return De(
      X(e) ? e.call(this, this) : e,
      X(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function wd(e, t) {
  return Un(Ps(e), Ps(t));
}
function Ps(e) {
  if (q(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function ke(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Un(e, t) {
  return e ? De(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function el(e, t) {
  return e ? q(e) && q(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : De(
    /* @__PURE__ */ Object.create(null),
    Zi(e),
    Zi(t ?? {})
  ) : t;
}
function yd(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = De(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = ke(e[r], t[r]);
  return n;
}
function Pa() {
  return {
    app: null,
    config: {
      isNativeTag: Ul,
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
let bd = 0;
function _d(e, t) {
  return function(r, o = null) {
    X(r) || (r = De({}, r)), o != null && !de(o) && (o = null);
    const s = Pa(), l = /* @__PURE__ */ new WeakSet(), a = [];
    let u = !1;
    const f = s.app = {
      _uid: bd++,
      _component: r,
      _props: o,
      _container: null,
      _context: s,
      _instance: null,
      version: Qd,
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
        if (!u) {
          const y = f._ceVNode || Rt(r, o);
          return y.appContext = s, w === !0 ? w = "svg" : w === !1 && (w = void 0), e(y, d, w), u = !0, f._container = d, d.__vue_app__ = f, si(y.component);
        }
      },
      onUnmount(d) {
        a.push(d);
      },
      unmount() {
        u && (Qe(
          a,
          f._instance,
          16
        ), e(null, f._container), delete f._container.__vue_app__);
      },
      provide(d, h) {
        return s.provides[d] = h, f;
      },
      runWithContext(d) {
        const h = bn;
        bn = f;
        try {
          return d();
        } finally {
          bn = h;
        }
      }
    };
    return f;
  };
}
let bn = null;
const Sd = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Ye(t)}Modifiers`] || e[`${Jt(t)}Modifiers`];
function xd(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || he;
  let o = n;
  const s = t.startsWith("update:"), l = s && Sd(r, t.slice(7));
  l && (l.trim && (o = n.map((d) => be(d) ? d.trim() : d)), l.number && (o = o.map(ff)));
  let a, u = r[a = os(t)] || // also try camelCase event handler (#2249)
  r[a = os(Ye(t))];
  !u && s && (u = r[a = os(Jt(t))]), u && Qe(
    u,
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
const Rd = /* @__PURE__ */ new WeakMap();
function Da(e, t, n = !1) {
  const r = n ? Rd : t.emitsCache, o = r.get(e);
  if (o !== void 0)
    return o;
  const s = e.emits;
  let l = {}, a = !1;
  if (!X(e)) {
    const u = (f) => {
      const d = Da(f, t, !0);
      d && (a = !0, De(l, d));
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  return !s && !a ? (de(e) && r.set(e, null), null) : (q(s) ? s.forEach((u) => l[u] = null) : De(l, s), de(e) && r.set(e, l), l);
}
function Ro(e, t) {
  return !e || !po(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), ae(e, t[0].toLowerCase() + t.slice(1)) || ae(e, Jt(t)) || ae(e, t));
}
function tl(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: o,
    propsOptions: [s],
    slots: l,
    attrs: a,
    emit: u,
    render: f,
    renderCache: d,
    props: h,
    data: w,
    setupState: y,
    ctx: I,
    inheritAttrs: E
  } = e, A = ro(e);
  let z, M;
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
      ), M = a;
    } else {
      const _ = t;
      z = at(
        _.length > 1 ? _(
          h,
          { attrs: a, slots: l, emit: u }
        ) : _(
          h,
          null
        )
      ), M = t.props ? a : Cd(a);
    }
  } catch (_) {
    Gt.length = 0, _o(_, e, 1), z = Rt(Et);
  }
  let O = z;
  if (M && E !== !1) {
    const _ = Object.keys(M), { shapeFlag: D } = O;
    _.length && D & 7 && (s && _.some(ho) && (M = Md(
      M,
      s
    )), O = xn(O, M, !1, !0));
  }
  if (n.dirs && (O = xn(O, null, !1, !0), O.dirs = O.dirs ? O.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const _ = So(O.type) && Ca(O) || O;
    ti(_, n.transition);
  }
  return z = O, ro(A), z;
}
const Cd = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || po(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Md = (e, t) => {
  const n = {};
  for (const r in e)
    (!ho(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
  return n;
};
function Id(e, t, n) {
  const { props: r, children: o, component: s } = e, { props: l, children: a, patchFlag: u } = t, f = s.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && u >= 0) {
    if (u & 1024)
      return !0;
    if (u & 16)
      return r ? nl(r, l, f) : !!l;
    if (u & 8) {
      const d = t.dynamicProps;
      for (let h = 0; h < d.length; h++) {
        const w = d[h];
        if (ka(l, r, w) && !Ro(f, w))
          return !0;
      }
    }
  } else
    return (o || a) && (!a || !a.$stable) ? !0 : r === l ? !1 : r ? l ? nl(r, l, f) : !0 : !!l;
  return !1;
}
function nl(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < r.length; o++) {
    const s = r[o];
    if (ka(t, e, s) && !Ro(n, s))
      return !0;
  }
  return !1;
}
function ka(e, t, n) {
  const r = e[n], o = t[n];
  return n === "style" && de(r) && de(o) ? !wo(r, o) : r !== o;
}
function Ed({ vnode: e, parent: t, suspense: n }, r) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.suspense.vnode.el = o.el = r, e = o), o === e)
      (e = t.vnode).el = r, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = r);
}
const Ta = {}, Fa = () => Object.create(Ta), Ha = (e) => Object.getPrototypeOf(e) === Ta;
function Ad(e, t, n, r = !1) {
  const o = {}, s = Fa();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), La(e, t, o, s);
  for (const l in e.propsOptions[0])
    l in o || (o[l] = void 0);
  n ? e.props = r ? o : /* @__PURE__ */ jf(o) : e.type.props ? e.props = o : e.props = s, e.attrs = s;
}
function Od(e, t, n, r) {
  const {
    props: o,
    attrs: s,
    vnode: { patchFlag: l }
  } = e, a = /* @__PURE__ */ le(o), [u] = e.propsOptions;
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
        if (Ro(e.emitsOptions, w))
          continue;
        const y = t[w];
        if (u)
          if (ae(s, w))
            y !== s[w] && (s[w] = y, f = !0);
          else {
            const I = Ye(w);
            o[I] = Ds(
              u,
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
    La(e, t, o, s) && (f = !0);
    let d;
    for (const h in a)
      (!t || // for camelCase
      !ae(t, h) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((d = Jt(h)) === h || !ae(t, d))) && (u ? n && // for camelCase
      (n[h] !== void 0 || // for kebab-case
      n[d] !== void 0) && (o[h] = Ds(
        u,
        a,
        h,
        void 0,
        e,
        !0
      )) : delete o[h]);
    if (s !== a)
      for (const h in s)
        (!t || !ae(t, h)) && (delete s[h], f = !0);
  }
  f && xt(e.attrs, "set", "");
}
function La(e, t, n, r) {
  const [o, s] = e.propsOptions;
  let l = !1, a;
  if (t)
    for (let u in t) {
      if (Gn(u))
        continue;
      const f = t[u];
      let d;
      o && ae(o, d = Ye(u)) ? !s || !s.includes(d) ? n[d] = f : (a || (a = {}))[d] = f : Ro(e.emitsOptions, u) || (!(u in r) || f !== r[u]) && (r[u] = f, l = !0);
    }
  if (s) {
    const u = /* @__PURE__ */ le(n), f = a || he;
    for (let d = 0; d < s.length; d++) {
      const h = s[d];
      n[h] = Ds(
        o,
        u,
        h,
        f[h],
        e,
        !ae(f, h)
      );
    }
  }
  return l;
}
function Ds(e, t, n, r, o, s) {
  const l = e[n];
  if (l != null) {
    const a = ae(l, "default");
    if (a && r === void 0) {
      const u = l.default;
      if (l.type !== Function && !l.skipFactory && X(u)) {
        const { propsDefaults: f } = o;
        if (n in f)
          r = f[n];
        else {
          const d = gr(o);
          r = f[n] = u.call(
            null,
            t
          ), d();
        }
      } else
        r = u;
      o.ce && o.ce._setProp(n, r);
    }
    l[
      0
      /* shouldCast */
    ] && (s && !a ? r = !1 : l[
      1
      /* shouldCastTrue */
    ] && (r === "" || r === Jt(n)) && (r = !0));
  }
  return r;
}
const Pd = /* @__PURE__ */ new WeakMap();
function ja(e, t, n = !1) {
  const r = n ? Pd : t.propsCache, o = r.get(e);
  if (o)
    return o;
  const s = e.props, l = {}, a = [];
  let u = !1;
  if (!X(e)) {
    const d = (h) => {
      u = !0;
      const [w, y] = ja(h, t, !0);
      De(l, w), y && a.push(...y);
    };
    !n && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  if (!s && !u)
    return de(e) && r.set(e, wn), wn;
  if (q(s))
    for (let d = 0; d < s.length; d++) {
      const h = Ye(s[d]);
      rl(h) && (l[h] = he);
    }
  else if (s)
    for (const d in s) {
      const h = Ye(d);
      if (rl(h)) {
        const w = s[d], y = l[h] = q(w) || X(w) ? { type: w } : De({}, w), I = y.type;
        let E = !1, A = !0;
        if (q(I))
          for (let z = 0; z < I.length; ++z) {
            const M = I[z], O = X(M) && M.name;
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
        ] = A, (E || ae(y, "default")) && a.push(h);
      }
    }
  const f = [l, a];
  return de(e) && r.set(e, f), f;
}
function rl(e) {
  return e[0] !== "$" && !Gn(e);
}
const ri = (e) => e === "_" || e === "_ctx" || e === "$stable", oi = (e) => q(e) ? e.map(at) : [at(e)], Dd = (e, t, n) => {
  if (t._n)
    return t;
  const r = Yf((...o) => oi(t(...o)), n);
  return r._c = !1, r;
}, za = (e, t, n) => {
  const r = e._ctx;
  for (const o in e) {
    if (ri(o)) continue;
    const s = e[o];
    if (X(s))
      t[o] = Dd(o, s, r);
    else if (s != null) {
      const l = oi(s);
      t[o] = () => l;
    }
  }
}, Ka = (e, t) => {
  const n = oi(t);
  e.slots.default = () => n;
}, Va = (e, t, n) => {
  for (const r in t)
    (n || !ri(r)) && (e[r] = t[r]);
}, kd = (e, t, n) => {
  const r = e.slots = Fa();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (Va(r, t, n), n && Zl(r, "_", o, !0)) : za(t, r);
  } else t && Ka(e, t);
}, Td = (e, t, n) => {
  const { vnode: r, slots: o } = e;
  let s = !0, l = he;
  if (r.shapeFlag & 32) {
    const a = t._;
    a ? n && a === 1 ? s = !1 : Va(o, t, n) : (s = !t.$stable, za(t, o)), l = t;
  } else t && (Ka(e, t), l = { default: 1 });
  if (s)
    for (const a in o)
      !ri(a) && l[a] == null && delete o[a];
}, Le = zd;
function Fd(e) {
  return Hd(e);
}
function Hd(e, t) {
  const n = vo();
  n.__VUE__ = !0;
  const {
    insert: r,
    remove: o,
    patchProp: s,
    createElement: l,
    createText: a,
    createComment: u,
    setText: f,
    setElementText: d,
    parentNode: h,
    nextSibling: w,
    setScopeId: y = ft,
    insertStaticContent: I
  } = e, E = (p, m, b, R = null, C = null, S = null, F = void 0, T = null, P = !!m.dynamicChildren) => {
    if (p === m)
      return;
    p && !$n(p, m) && (R = rn(p), Ke(p, C, S, !0), p = null), m.patchFlag === -2 && (P = !1, m.dynamicChildren = null);
    const { type: x, ref: N, shapeFlag: H } = m;
    switch (x) {
      case Co:
        A(p, m, b, R);
        break;
      case Et:
        z(p, m, b, R);
        break;
      case gs:
        p == null && M(m, b, R, F);
        break;
      case Ae:
        Y(
          p,
          m,
          b,
          R,
          C,
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
          R,
          C,
          S,
          F,
          T,
          P
        ) : H & 6 ? me(
          p,
          m,
          b,
          R,
          C,
          S,
          F,
          T,
          P
        ) : (H & 64 || H & 128) && x.process(
          p,
          m,
          b,
          R,
          C,
          S,
          F,
          T,
          P,
          qe
        );
    }
    N != null && C ? Zn(N, p && p.ref, S, m || p, !m) : N == null && p && p.ref != null && Zn(p.ref, null, S, p, !0);
  }, A = (p, m, b, R) => {
    if (p == null)
      r(
        m.el = a(m.children),
        b,
        R
      );
    else {
      const C = m.el = p.el;
      m.children !== p.children && f(C, m.children);
    }
  }, z = (p, m, b, R) => {
    p == null ? r(
      m.el = u(m.children || ""),
      b,
      R
    ) : m.el = p.el;
  }, M = (p, m, b, R) => {
    [p.el, p.anchor] = I(
      p.children,
      m,
      b,
      R,
      p.el,
      p.anchor
    );
  }, O = ({ el: p, anchor: m }, b, R) => {
    let C;
    for (; p && p !== m; )
      C = w(p), r(p, b, R), p = C;
    r(m, b, R);
  }, _ = ({ el: p, anchor: m }) => {
    let b;
    for (; p && p !== m; )
      b = w(p), o(p), p = b;
    o(m);
  }, D = (p, m, b, R, C, S, F, T, P) => {
    if (m.type === "svg" ? F = "svg" : m.type === "math" && (F = "mathml"), p == null)
      j(
        m,
        b,
        R,
        C,
        S,
        F,
        T,
        P
      );
    else {
      const x = p.el && p.el._isVueCE ? p.el : null;
      try {
        x && x._beginPatch(), L(
          p,
          m,
          C,
          S,
          F,
          T,
          P
        );
      } finally {
        x && x._endPatch();
      }
    }
  }, j = (p, m, b, R, C, S, F, T) => {
    let P, x;
    const { props: N, shapeFlag: H, transition: V, dirs: W } = p;
    if (P = p.el = l(
      p.type,
      S,
      N && N.is,
      N
    ), H & 8 ? d(P, p.children) : H & 16 && K(
      p.children,
      P,
      null,
      R,
      C,
      ds(p, S),
      F,
      T
    ), W && Bt(p, null, R, "created"), U(P, p, p.scopeId, F, R), N) {
      for (const se in N)
        se !== "value" && !Gn(se) && s(P, se, null, N[se], S, R);
      "value" in N && s(P, "value", null, N.value, S), (x = N.onVnodeBeforeMount) && rt(x, R, p);
    }
    W && Bt(p, null, R, "beforeMount");
    const Q = Ld(C, V);
    Q && V.beforeEnter(P), r(P, m, b), ((x = N && N.onVnodeMounted) || Q || W) && Le(() => {
      try {
        x && rt(x, R, p), Q && V.enter(P), W && Bt(p, null, R, "mounted");
      } finally {
      }
    }, C);
  }, U = (p, m, b, R, C) => {
    if (b && y(p, b), R)
      for (let S = 0; S < R.length; S++)
        y(p, R[S]);
    if (C) {
      let S = C.subTree;
      if (m === S || Wa(S.type) && (S.ssContent === m || S.ssFallback === m)) {
        const F = C.vnode;
        U(
          p,
          F,
          F.scopeId,
          F.slotScopeIds,
          C.parent
        );
      }
    }
  }, K = (p, m, b, R, C, S, F, T, P = 0) => {
    for (let x = P; x < p.length; x++) {
      const N = p[x] = T ? St(p[x]) : at(p[x]);
      E(
        null,
        N,
        m,
        b,
        R,
        C,
        S,
        F,
        T
      );
    }
  }, L = (p, m, b, R, C, S, F) => {
    const T = m.el = p.el;
    let { patchFlag: P, dynamicChildren: x, dirs: N } = m;
    P |= p.patchFlag & 16;
    const H = p.props || he, V = m.props || he;
    let W;
    if (b && Nt(b, !1), (W = V.onVnodeBeforeUpdate) && rt(W, b, m, p), N && Bt(m, p, b, "beforeUpdate"), b && Nt(b, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    x && (!p.dynamicChildren || p.dynamicChildren.length !== x.length) && (P = 0, F = !1, x = null), (H.innerHTML && V.innerHTML == null || H.textContent && V.textContent == null) && d(T, ""), x ? ee(
      p.dynamicChildren,
      x,
      T,
      b,
      R,
      ds(m, C),
      S
    ) : F || ce(
      p,
      m,
      T,
      null,
      b,
      R,
      ds(m, C),
      S,
      !1
    ), P > 0) {
      if (P & 16)
        ue(T, H, V, b, C);
      else if (P & 2 && H.class !== V.class && s(T, "class", null, V.class, C), P & 4 && s(T, "style", H.style, V.style, C), P & 8) {
        const Q = m.dynamicProps;
        for (let se = 0; se < Q.length; se++) {
          const ie = Q[se], ve = H[ie], _e = V[ie];
          (_e !== ve || ie === "value") && s(T, ie, ve, _e, C, b);
        }
      }
      P & 1 && p.children !== m.children && d(T, m.children);
    } else !F && x == null && ue(T, H, V, b, C);
    ((W = V.onVnodeUpdated) || N) && Le(() => {
      W && rt(W, b, m, p), N && Bt(m, p, b, "updated");
    }, R);
  }, ee = (p, m, b, R, C, S, F) => {
    for (let T = 0; T < m.length; T++) {
      const P = p[T], x = m[T], N = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        P.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (P.type === Ae || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !$n(P, x) || // - In the case of a component, it could contain anything.
        P.shapeFlag & 198) ? h(P.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          b
        )
      );
      E(
        P,
        x,
        N,
        null,
        R,
        C,
        S,
        F,
        !0
      );
    }
  }, ue = (p, m, b, R, C) => {
    if (m !== b) {
      if (m !== he)
        for (const S in m)
          !Gn(S) && !(S in b) && s(
            p,
            S,
            m[S],
            null,
            C,
            R
          );
      for (const S in b) {
        if (Gn(S)) continue;
        const F = b[S], T = m[S];
        F !== T && S !== "value" && s(p, S, T, F, C, R);
      }
      "value" in b && s(p, "value", m.value, b.value, C);
    }
  }, Y = (p, m, b, R, C, S, F, T, P) => {
    const x = m.el = p ? p.el : a(""), N = m.anchor = p ? p.anchor : a("");
    let { patchFlag: H, dynamicChildren: V, slotScopeIds: W } = m;
    W && (T = T ? T.concat(W) : W), p == null ? (r(x, b, R), r(N, b, R), K(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      m.children || [],
      b,
      N,
      C,
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
      C,
      S,
      F,
      T
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (m.key != null || C && m === C.subTree) && Ba(
      p,
      m,
      !0
      /* shallow */
    )) : ce(
      p,
      m,
      b,
      N,
      C,
      S,
      F,
      T,
      P
    );
  }, me = (p, m, b, R, C, S, F, T, P) => {
    m.slotScopeIds = T, p == null ? m.shapeFlag & 512 ? C.ctx.activate(
      m,
      b,
      R,
      F,
      P
    ) : Me(
      m,
      b,
      R,
      C,
      S,
      F,
      P
    ) : ye(p, m, P);
  }, Me = (p, m, b, R, C, S, F) => {
    const T = p.component = Ud(
      p,
      R,
      C
    );
    if (ni(p) && (T.ctx.renderer = qe), Gd(T, !1, F), T.asyncDep) {
      if (C && C.registerDep(T, G, F), !p.el) {
        const P = T.subTree = Rt(Et);
        z(null, P, m, b), p.placeholder = P.el;
      }
    } else
      G(
        T,
        p,
        m,
        b,
        C,
        S,
        F
      );
  }, ye = (p, m, b) => {
    const R = m.component = p.component;
    if (Id(p, m, b))
      if (R.asyncDep && !R.asyncResolved) {
        J(R, m, b);
        return;
      } else
        R.next = m, R.update();
    else
      m.el = p.el, R.vnode = m;
  }, G = (p, m, b, R, C, S, F) => {
    const T = () => {
      if (p.isMounted) {
        let { next: H, bu: V, u: W, parent: Q, vnode: se } = p;
        {
          const Be = Na(p);
          if (Be) {
            H && (H.el = se.el, J(p, H, F)), Be.asyncDep.then(() => {
              Le(() => {
                p.isUnmounted || x();
              }, C);
            });
            return;
          }
        }
        let ie = H, ve;
        Nt(p, !1), H ? (H.el = se.el, J(p, H, F)) : H = se, V && ss(V), (ve = H.props && H.props.onVnodeBeforeUpdate) && rt(ve, Q, H, se), Nt(p, !0);
        const _e = tl(p), Ve = p.subTree;
        p.subTree = _e, E(
          Ve,
          _e,
          // parent may have changed if it's in a teleport
          h(Ve.el),
          // anchor may have changed if it's in a fragment
          rn(Ve),
          p,
          C,
          S
        ), H.el = _e.el, ie === null && Ed(p, _e.el), W && Le(W, C), (ve = H.props && H.props.onVnodeUpdated) && Le(
          () => rt(ve, Q, H, se),
          C
        );
      } else {
        let H;
        const { el: V, props: W } = m, { bm: Q, m: se, parent: ie, root: ve, type: _e } = p, Ve = Jn(m);
        Nt(p, !1), Q && ss(Q), !Ve && (H = W && W.onVnodeBeforeMount) && rt(H, ie, m), Nt(p, !0);
        {
          ve.ce && ve.ce._hasShadowRoot() && ve.ce._injectChildStyle(
            _e,
            p.parent ? p.parent.type : void 0
          );
          const Be = p.subTree = tl(p);
          E(
            null,
            Be,
            b,
            R,
            p,
            C,
            S
          ), m.el = Be.el;
        }
        if (se && Le(se, C), !Ve && (H = W && W.onVnodeMounted)) {
          const Be = m;
          Le(
            () => rt(H, ie, Be),
            C
          );
        }
        (m.shapeFlag & 256 || ie && Jn(ie.vnode) && ie.vnode.shapeFlag & 256) && p.a && Le(p.a, C), p.isMounted = !0, m = b = R = null;
      }
    };
    p.scope.on();
    const P = p.effect = new na(T);
    p.scope.off();
    const x = p.update = P.run.bind(P), N = p.job = P.runIfDirty.bind(P);
    N.i = p, N.id = p.uid, P.scheduler = () => ei(N), Nt(p, !0), x();
  }, J = (p, m, b) => {
    m.component = p;
    const R = p.vnode.props;
    p.vnode = m, p.next = null, Od(p, m.props, R, b), Td(p, m.children, b), Ct(), Gi(p), Mt();
  }, ce = (p, m, b, R, C, S, F, T, P = !1) => {
    const x = p && p.children, N = p ? p.shapeFlag : 0, H = m.children, { patchFlag: V, shapeFlag: W } = m;
    if (V > 0) {
      if (V & 128) {
        Pt(
          x,
          H,
          b,
          R,
          C,
          S,
          F,
          T,
          P
        );
        return;
      } else if (V & 256) {
        Ie(
          x,
          H,
          b,
          R,
          C,
          S,
          F,
          T,
          P
        );
        return;
      }
    }
    W & 8 ? (N & 16 && Kt(x, C, S), H !== x && d(b, H)) : N & 16 ? W & 16 ? Pt(
      x,
      H,
      b,
      R,
      C,
      S,
      F,
      T,
      P
    ) : Kt(x, C, S, !0) : (N & 8 && d(b, ""), W & 16 && K(
      H,
      b,
      R,
      C,
      S,
      F,
      T,
      P
    ));
  }, Ie = (p, m, b, R, C, S, F, T, P) => {
    p = p || wn, m = m || wn;
    const x = p.length, N = m.length, H = Math.min(x, N);
    let V;
    for (V = 0; V < H; V++) {
      const W = m[V] = P ? St(m[V]) : at(m[V]);
      E(
        p[V],
        W,
        b,
        null,
        C,
        S,
        F,
        T,
        P
      );
    }
    x > N ? Kt(
      p,
      C,
      S,
      !0,
      !1,
      H
    ) : K(
      m,
      b,
      R,
      C,
      S,
      F,
      T,
      P,
      H
    );
  }, Pt = (p, m, b, R, C, S, F, T, P) => {
    let x = 0;
    const N = m.length;
    let H = p.length - 1, V = N - 1;
    for (; x <= H && x <= V; ) {
      const W = p[x], Q = m[x] = P ? St(m[x]) : at(m[x]);
      if ($n(W, Q))
        E(
          W,
          Q,
          b,
          null,
          C,
          S,
          F,
          T,
          P
        );
      else
        break;
      x++;
    }
    for (; x <= H && x <= V; ) {
      const W = p[H], Q = m[V] = P ? St(m[V]) : at(m[V]);
      if ($n(W, Q))
        E(
          W,
          Q,
          b,
          null,
          C,
          S,
          F,
          T,
          P
        );
      else
        break;
      H--, V--;
    }
    if (x > H) {
      if (x <= V) {
        const W = V + 1, Q = W < N ? m[W].el : R;
        for (; x <= V; )
          E(
            null,
            m[x] = P ? St(m[x]) : at(m[x]),
            b,
            Q,
            C,
            S,
            F,
            T,
            P
          ), x++;
      }
    } else if (x > V)
      for (; x <= H; )
        Ke(p[x], C, S, !0), x++;
    else {
      const W = x, Q = x, se = /* @__PURE__ */ new Map();
      for (x = Q; x <= V; x++) {
        const xe = m[x] = P ? St(m[x]) : at(m[x]);
        xe.key != null && se.set(xe.key, x);
      }
      let ie, ve = 0;
      const _e = V - Q + 1;
      let Ve = !1, Be = 0;
      const tt = new Array(_e);
      for (x = 0; x < _e; x++) tt[x] = 0;
      for (x = W; x <= H; x++) {
        const xe = p[x];
        if (ve >= _e) {
          Ke(xe, C, S, !0);
          continue;
        }
        let Ee;
        if (xe.key != null)
          Ee = se.get(xe.key);
        else
          for (ie = Q; ie <= V; ie++)
            if (tt[ie - Q] === 0 && $n(xe, m[ie])) {
              Ee = ie;
              break;
            }
        Ee === void 0 ? Ke(xe, C, S, !0) : (tt[Ee - Q] = x + 1, Ee >= Be ? Be = Ee : Ve = !0, E(
          xe,
          m[Ee],
          b,
          null,
          C,
          S,
          F,
          T,
          P
        ), ve++);
      }
      const mt = Ve ? jd(tt) : wn;
      for (ie = mt.length - 1, x = _e - 1; x >= 0; x--) {
        const xe = Q + x, Ee = m[xe], on = m[xe + 1], nt = xe + 1 < N ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          on.el || $a(on)
        ) : R;
        tt[x] === 0 ? E(
          null,
          Ee,
          b,
          nt,
          C,
          S,
          F,
          T,
          P
        ) : Ve && (ie < 0 || x !== mt[ie] ? ht(Ee, b, nt, 2) : ie--);
      }
    }
  }, ht = (p, m, b, R, C = null) => {
    const { el: S, type: F, transition: T, children: P, shapeFlag: x } = p;
    if (x & 6) {
      ht(p.component.subTree, m, b, R);
      return;
    }
    if (x & 128) {
      p.suspense.move(m, b, R);
      return;
    }
    if (x & 64) {
      F.move(p, m, b, qe);
      return;
    }
    if (F === Ae) {
      r(S, m, b);
      for (let H = 0; H < P.length; H++)
        ht(P[H], m, b, R);
      r(p.anchor, m, b);
      return;
    }
    if (F === gs) {
      O(p, m, b);
      return;
    }
    if (R !== 2 && x & 1 && T)
      if (R === 0)
        T.persisted && !S[cs] ? r(S, m, b) : (T.beforeEnter(S), r(S, m, b), Le(() => T.enter(S), C));
      else {
        const { leave: H, delayLeave: V, afterLeave: W } = T, Q = () => {
          p.ctx.isUnmounted ? o(S) : r(S, m, b);
        }, se = () => {
          const ie = S._isLeaving || !!S[cs];
          S._isLeaving && S[cs](
            !0
            /* cancelled */
          ), T.persisted && !ie ? Q() : H(S, () => {
            Q(), W && W();
          });
        };
        V ? V(S, Q, se) : se();
      }
    else
      r(S, m, b);
  }, Ke = (p, m, b, R = !1, C = !1) => {
    const {
      type: S,
      props: F,
      ref: T,
      children: P,
      dynamicChildren: x,
      shapeFlag: N,
      patchFlag: H,
      dirs: V,
      cacheIndex: W,
      memo: Q
    } = p;
    if (H === -2 && (C = !1), T != null && (Ct(), Zn(T, null, b, p, !0), Mt()), W != null && (m.renderCache[W] = void 0), N & 256) {
      m.ctx.deactivate(p);
      return;
    }
    const se = N & 1 && V, ie = !Jn(p);
    let ve;
    if (ie && (ve = F && F.onVnodeBeforeUnmount) && rt(ve, m, p), N & 6)
      Mn(p.component, b, R);
    else {
      if (N & 128) {
        p.suspense.unmount(b, R);
        return;
      }
      se && Bt(p, null, m, "beforeUnmount"), N & 64 ? p.type.remove(
        p,
        m,
        b,
        qe,
        R
      ) : x && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !x.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (S !== Ae || H > 0 && H & 64) ? Kt(
        x,
        m,
        b,
        !1,
        !0
      ) : (S === Ae && H & 384 || !C && N & 16) && Kt(P, m, b), R && fe(p);
    }
    const _e = Q != null && W == null;
    (ie && (ve = F && F.onVnodeUnmounted) || se || _e) && Le(() => {
      ve && rt(ve, m, p), se && Bt(p, null, m, "unmounted"), _e && (p.el = null);
    }, b);
  }, fe = (p) => {
    const { type: m, el: b, anchor: R, transition: C } = p;
    if (m === Ae) {
      Ue(b, R);
      return;
    }
    if (m === gs) {
      _(p);
      return;
    }
    const S = () => {
      o(b), C && !C.persisted && C.afterLeave && C.afterLeave();
    };
    if (p.shapeFlag & 1 && C && !C.persisted) {
      const { leave: F, delayLeave: T } = C, P = () => F(b, S);
      T ? T(p.el, S, P) : P();
    } else
      S();
  }, Ue = (p, m) => {
    let b;
    for (; p !== m; )
      b = w(p), o(p), p = b;
    o(m);
  }, Mn = (p, m, b) => {
    const { bum: R, scope: C, job: S, subTree: F, um: T, m: P, a: x } = p;
    ol(P), ol(x), R && ss(R), C.stop(), S && (S.flags |= 8, Ke(F, p, m, b)), T && Le(T, m), Le(() => {
      p.isUnmounted = !0;
    }, m);
  }, Kt = (p, m, b, R = !1, C = !1, S = 0) => {
    for (let F = S; F < p.length; F++)
      Ke(p[F], m, b, R, C);
  }, rn = (p) => {
    if (p.shapeFlag & 6)
      return rn(p.component.subTree);
    if (p.shapeFlag & 128)
      return p.suspense.next();
    const m = w(p.anchor || p.el), b = m && m[td];
    return b ? w(b) : m;
  };
  let In = !1;
  const yr = (p, m, b) => {
    let R;
    p == null ? m._vnode && (Ke(m._vnode, null, null, !0), R = m._vnode.component) : E(
      m._vnode || null,
      p,
      m,
      null,
      null,
      null,
      b
    ), m._vnode = p, In || (In = !0, Gi(R), ba(), In = !1);
  }, qe = {
    p: E,
    um: Ke,
    m: ht,
    r: fe,
    mt: Me,
    mc: K,
    pc: ce,
    pbc: ee,
    n: rn,
    o: e
  };
  return {
    render: yr,
    hydrate: void 0,
    createApp: _d(yr)
  };
}
function ds({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Nt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Ld(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Ba(e, t, n = !1) {
  const r = e.children, o = t.children;
  if (q(r) && q(o))
    for (let s = 0; s < r.length; s++) {
      const l = r[s];
      let a = o[s];
      a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = o[s] = St(o[s]), a.el = l.el), !n && a.patchFlag !== -2 && Ba(l, a)), a.type === Co && (a.patchFlag === -1 && (a = o[s] = St(a)), a.el = l.el), a.type === Et && !a.el && (a.el = l.el);
    }
}
function jd(e) {
  const t = e.slice(), n = [0];
  let r, o, s, l, a;
  const u = e.length;
  for (r = 0; r < u; r++) {
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
function Na(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Na(t);
}
function ol(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function $a(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? $a(t.subTree) : null;
}
const Wa = (e) => e.__isSuspense;
function zd(e, t) {
  t && t.pendingBranch ? q(e) ? t.effects.push(...e) : t.effects.push(e) : Xf(e);
}
const Ae = /* @__PURE__ */ Symbol.for("v-fgt"), Co = /* @__PURE__ */ Symbol.for("v-txt"), Et = /* @__PURE__ */ Symbol.for("v-cmt"), gs = /* @__PURE__ */ Symbol.for("v-stc"), Gt = [];
let ze = null;
function re(e = !1) {
  Gt.push(ze = e ? null : []);
}
function Ua() {
  Gt.pop(), ze = Gt[Gt.length - 1] || null;
}
let sr = 1;
function sl(e, t = !1) {
  sr += e, e < 0 && ze && t && (ze.hasOnce = !0);
}
function qa(e) {
  return e.dynamicChildren = sr > 0 ? ze || wn : null, Ua(), sr > 0 && ze && ze.push(e), e;
}
function oe(e, t, n, r, o, s) {
  return qa(
    Re(
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
function Kd(e, t, n, r, o) {
  return qa(
    Rt(
      e,
      t,
      n,
      r,
      o,
      !0
    )
  );
}
function Ga(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function $n(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Xa = ({ key: e }) => e ?? null, Zr = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? be(e) || /* @__PURE__ */ Pe(e) || X(e) ? { i: ct, r: e, k: t, f: !!n } : e : null);
function Re(e, t = null, n = null, r = 0, o = null, s = e === Ae ? 0 : 1, l = !1, a = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Xa(t),
    ref: t && Zr(t),
    scopeId: Sa,
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
  return a ? (io(u, n), s & 128 && e.normalize(u)) : n && (u.shapeFlag |= be(n) ? 8 : 16), sr > 0 && // avoid a block node from tracking itself
  !l && // has current parent block
  ze && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (u.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  u.patchFlag !== 32 && ze.push(u), u;
}
const Rt = Vd;
function Vd(e, t = null, n = null, r = 0, o = null, s = !1) {
  if ((!e || e === gd) && (e = Et), Ga(e)) {
    const a = xn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && io(a, n), sr > 0 && !s && ze && (a.shapeFlag & 6 ? ze[ze.indexOf(e)] = a : ze.push(a)), a.patchFlag = -2, a;
  }
  if (Jd(e) && (e = e.__vccOpts), t) {
    t = Bd(t);
    let { class: a, style: u } = t;
    a && !be(a) && (t.class = it(a)), de(u) && (/* @__PURE__ */ Qs(u) && !q(u) && (u = De({}, u)), t.style = st(u));
  }
  const l = be(e) ? 1 : Wa(e) ? 128 : So(e) ? 64 : de(e) ? 4 : X(e) ? 2 : 0;
  return Re(
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
function Bd(e) {
  return e ? /* @__PURE__ */ Qs(e) || Ha(e) ? De({}, e) : e : null;
}
function xn(e, t, n = !1, r = !1) {
  const { props: o, ref: s, patchFlag: l, children: a, transition: u } = e, f = t ? Nd(o || {}, t) : o, d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && Xa(f),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && s ? q(s) ? s.concat(Zr(t)) : [s, Zr(t)] : Zr(t)
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
    patchFlag: t && e.type !== Ae ? l === -1 ? 16 : l | 16 : l,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: u,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && xn(e.ssContent),
    ssFallback: e.ssFallback && xn(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return u && r && ti(
    d,
    u.clone(d)
  ), d;
}
function ks(e = " ", t = 0) {
  return Rt(Co, null, e, t);
}
function Xe(e = "", t = !1) {
  return t ? (re(), Kd(Et, null, e)) : Rt(Et, null, e);
}
function at(e) {
  return e == null || typeof e == "boolean" ? Rt(Et) : q(e) ? Rt(
    Ae,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Ga(e) ? St(e) : Rt(Co, null, String(e));
}
function St(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : xn(e);
}
function io(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (q(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), io(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !Ha(t) ? t._ctx = ct : o === 3 && ct && (ct.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (X(t)) {
    if (r & 65) {
      io(e, { default: t });
      return;
    }
    t = { default: t, _ctx: ct }, n = 32;
  } else
    t = String(t), r & 64 ? (n = 16, t = [ks(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function Nd(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === "class")
        t.class !== r.class && (t.class = it([t.class, r.class]));
      else if (o === "style")
        t.style = st([t.style, r.style]);
      else if (po(o)) {
        const s = t[o], l = r[o];
        l && s !== l && !(q(s) && s.includes(l)) ? t[o] = s ? [].concat(s, l) : l : l == null && s == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !ho(o) && (t[o] = l);
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
const $d = Pa();
let Wd = 0;
function Ud(e, t, n) {
  const r = e.type, o = (t ? t.appContext : e.appContext) || $d, s = {
    uid: Wd++,
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
    scope: new yf(
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
    propsOptions: ja(r, o),
    emitsOptions: Da(r, o),
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
  return s.ctx = { _: s }, s.root = t ? t.root : s, s.emit = xd.bind(null, s), e.ce && e.ce(s), s;
}
let Fe = null;
const qd = () => Fe || ct;
let lo, ir;
{
  const e = vo(), t = (n, r) => {
    let o;
    return (o = e[n]) || (o = e[n] = []), o.push(r), (s) => {
      o.length > 1 ? o.forEach((l) => l(s)) : o[0](s);
    };
  };
  lo = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Fe = n
  ), ir = t(
    "__VUE_SSR_SETTERS__",
    (n) => lr = n
  );
}
const gr = (e) => {
  const t = Fe;
  return lo(e), e.scope.on(), () => {
    e.scope.off(), lo(t);
  };
}, il = () => {
  Fe && Fe.scope.off(), lo(null);
};
function Ya(e) {
  return e.vnode.shapeFlag & 4;
}
let lr = !1;
function Gd(e, t = !1, n = !1) {
  t && ir(t);
  const { props: r, children: o } = e.vnode, s = Ya(e);
  Ad(e, r, s, t), kd(e, o, n || t);
  const l = s ? Xd(e, t) : void 0;
  return t && ir(!1), l;
}
function Xd(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, pd);
  const { setup: r } = n;
  if (r) {
    Ct();
    const o = e.setupContext = r.length > 1 ? Zd(e) : null, s = gr(e), l = dr(
      r,
      e,
      0,
      [
        e.props,
        o
      ]
    ), a = ql(l);
    if (Mt(), s(), (a || e.sp) && !Jn(e) && Ma(e), a) {
      if (l.then(il, il), t)
        return l.then((u) => {
          ir(!0);
          try {
            ll(e, u, t);
          } finally {
            ir(!1);
          }
        }).catch((u) => {
          _o(u, e, 0);
        });
      e.asyncDep = l;
    } else
      ll(e, l);
  } else
    Za(e);
}
function ll(e, t, n) {
  X(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : de(t) && (e.setupState = va(t)), Za(e);
}
function Za(e, t, n) {
  const r = e.type;
  e.render || (e.render = r.render || ft);
  {
    const o = gr(e);
    Ct();
    try {
      hd(e);
    } finally {
      Mt(), o();
    }
  }
}
const Yd = {
  get(e, t) {
    return Oe(e, "get", ""), e[t];
  }
};
function Zd(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Yd),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function si(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(va(zf(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in Qn)
        return Qn[n](e);
    },
    has(t, n) {
      return n in t || n in Qn;
    }
  })) : e.proxy;
}
function Jd(e) {
  return X(e) && "__vccOpts" in e;
}
const $ = (e, t) => /* @__PURE__ */ $f(e, t, lr), Qd = "3.5.42";
/**
* @vue/runtime-dom v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Ts;
const al = typeof window < "u" && window.trustedTypes;
if (al)
  try {
    Ts = /* @__PURE__ */ al.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Ja = Ts ? (e) => Ts.createHTML(e) : (e) => e, eg = "http://www.w3.org/2000/svg", tg = "http://www.w3.org/1998/Math/MathML", _t = typeof document < "u" ? document : null, ul = _t && /* @__PURE__ */ _t.createElement("template"), ng = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const o = t === "svg" ? _t.createElementNS(eg, e) : t === "mathml" ? _t.createElementNS(tg, e) : n ? _t.createElement(e, { is: n }) : _t.createElement(e);
    return e === "select" && r && r.multiple != null && o.setAttribute("multiple", r.multiple), o;
  },
  createText: (e) => _t.createTextNode(e),
  createComment: (e) => _t.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => _t.querySelector(e),
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
      ul.innerHTML = Ja(
        r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e
      );
      const a = ul.content;
      if (r === "svg" || r === "mathml") {
        const u = a.firstChild;
        for (; u.firstChild; )
          a.appendChild(u.firstChild);
        a.removeChild(u);
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
}, rg = /* @__PURE__ */ Symbol("_vtc");
function og(e, t, n) {
  const r = e[rg];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const cl = /* @__PURE__ */ Symbol("_vod"), sg = /* @__PURE__ */ Symbol("_vsh"), ig = /* @__PURE__ */ Symbol(""), lg = /(?:^|;)\s*display\s*:/;
function ag(e, t, n) {
  const r = e.style, o = be(n);
  let s = !1;
  if (n && !o) {
    if (t)
      if (be(t))
        for (const l of t.split(";")) {
          const a = l.slice(0, l.indexOf(":")).trim();
          n[a] == null && qn(r, a, "");
        }
      else
        for (const l in t)
          n[l] == null && qn(r, l, "");
    for (const l in n) {
      l === "display" && (s = !0);
      const a = n[l];
      a != null ? cg(
        e,
        l,
        !be(t) && t ? t[l] : void 0,
        a
      ) || qn(r, l, a) : qn(r, l, "");
    }
  } else if (o) {
    if (t !== n) {
      const l = r[ig];
      l && (n += ";" + l), r.cssText = n, s = lg.test(n);
    }
  } else t && e.removeAttribute("style");
  cl in e && (e[cl] = s ? r.display : "", e[sg] && (r.display = "none"));
}
const Br = /\s*!important$/;
function qn(e, t, n) {
  if (q(n))
    n.forEach((r) => qn(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--"))
    Br.test(n) ? e.setProperty(t, n.replace(Br, ""), "important") : e.setProperty(t, n);
  else {
    const r = ug(e, t);
    Br.test(n) ? e.setProperty(
      Jt(r),
      n.replace(Br, ""),
      "important"
    ) : e[r] = n;
  }
}
const fl = ["Webkit", "Moz", "ms"], ps = {};
function ug(e, t) {
  const n = ps[t];
  if (n)
    return n;
  let r = Ye(t);
  if (r !== "filter" && r in e)
    return ps[t] = r;
  r = Yl(r);
  for (let o = 0; o < fl.length; o++) {
    const s = fl[o] + r;
    if (s in e)
      return ps[t] = s;
  }
  return t;
}
function cg(e, t, n, r) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && be(r) && n === r;
}
const dl = "http://www.w3.org/1999/xlink";
function gl(e, t, n, r, o, s = vf(t)) {
  r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(dl, t.slice(6, t.length)) : e.setAttributeNS(dl, t, n) : n == null || s && !Jl(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    s ? "" : dt(n) ? String(n) : n
  );
}
function pl(e, t, n, r, o) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Ja(n) : n);
    return;
  }
  const s = e.tagName;
  if (t === "value" && s !== "PROGRESS" && // custom elements may use _value internally
  !s.includes("-")) {
    const a = s === "OPTION" ? e.getAttribute("value") || "" : e.value, u = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (a !== u || !("_value" in e)) && (e.value = u), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let l = !1;
  if (n === "" || n == null) {
    const a = typeof e[t];
    a === "boolean" ? n = Jl(n) : n == null && a === "string" ? (n = "", l = !0) : a === "number" && (n = 0, l = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  l && e.removeAttribute(o || t);
}
function fg(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function dg(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const hl = /* @__PURE__ */ Symbol("_vei");
function gg(e, t, n, r, o = null) {
  const s = e[hl] || (e[hl] = {}), l = s[t];
  if (r && l)
    l.value = r;
  else {
    const [a, u] = mg(t);
    if (r) {
      const f = s[t] = yg(
        r,
        o
      );
      fg(e, a, f, u);
    } else l && (dg(e, a, l, u), s[t] = void 0);
  }
}
const pg = /(Once|Passive|Capture)$/, hg = /^on:?(?:Once|Passive|Capture)$/;
function mg(e) {
  let t, n;
  for (; (n = e.match(pg)) && !hg.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : Jt(e.slice(2)), t];
}
let hs = 0;
const vg = /* @__PURE__ */ Promise.resolve(), wg = () => hs || (vg.then(() => hs = 0), hs = Date.now());
function yg(e, t) {
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
      for (let u = 0; u < l.length && !r._stopped; u++) {
        const f = l[u];
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
  return n.value = e, n.attached = wg(), n;
}
const ml = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, bg = (e, t, n, r, o, s) => {
  const l = o === "svg";
  t === "class" ? og(e, r, l) : t === "style" ? ag(e, n, r) : po(t) ? ho(t) || gg(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : _g(e, t, r, l)) ? (pl(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && gl(e, t, r, l, s, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Sg(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !be(r))) ? pl(e, Ye(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), gl(e, t, r, l));
};
function _g(e, t, n, r) {
  if (r)
    return !!(t === "innerHTML" || t === "textContent" || t in e && ml(t) && X(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return ml(t) && be(n) ? !1 : t in e;
}
function Sg(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const r = Ye(t);
  return Array.isArray(n) ? n.some((o) => Ye(o) === r) : Object.keys(n).some((o) => Ye(o) === r);
}
const xg = ["ctrl", "shift", "alt", "meta"], Rg = {
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
  exact: (e, t) => xg.some((n) => e[`${n}Key`] && !t.includes(n))
}, pn = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), r = t.join(".");
  return n[r] || (n[r] = (o, ...s) => {
    for (let l = 0; l < t.length; l++) {
      const a = Rg[t[l]];
      if (a && a(o, t)) return;
    }
    return e(o, ...s);
  });
}, Cg = /* @__PURE__ */ De({ patchProp: bg }, ng);
let vl;
function Mg() {
  return vl || (vl = Fd(Cg));
}
const Ig = (...e) => {
  const t = Mg().createApp(...e), { mount: n } = t;
  return t.mount = (r) => {
    const o = Ag(r);
    if (!o) return;
    const s = t._component;
    !X(s) && !s.render && !s.template && (s.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const l = n(o, !1, Eg(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), l;
  }, t;
};
function Eg(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Ag(e) {
  return be(e) ? document.querySelector(e) : e;
}
function Nr() {
  return !0;
}
const Og = Symbol("merge-proxy"), Jr = Symbol("merge-proxy-sources"), Pg = {
  get(e, t, n) {
    return t === Og ? n : t === Jr ? e.sources : e.get(t);
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
function Qr(e) {
  return e && typeof e == "object" && "value" in e ? e.value : e;
}
function Fs(...e) {
  const t = e.flatMap((n) => typeof n == "object" && n !== null && Jr in n && Array.isArray(n[Jr]) ? n[Jr] : [n]);
  return new Proxy({
    sources: t,
    get(n) {
      for (let r = t.length - 1; r >= 0; r--) {
        const o = Qr(t[r])[n];
        if (o !== void 0) return o;
      }
    },
    has(n) {
      for (let r = t.length - 1; r >= 0; r--) if (n in Qr(t[r])) return !0;
      return !1;
    },
    keys() {
      const n = [];
      for (const r of t) n.push(...Object.keys(Qr(r)));
      return [...Array.from(new Set(n))];
    }
  }, Pg);
}
function wl(...e) {
  const t = {};
  for (let n of e)
    if (n = Qr(n), !!n)
      for (const r of Reflect.ownKeys(n)) {
        const o = n[r];
        o !== void 0 && (t[r] = o);
      }
  return t;
}
function Qa(e) {
  return typeof e == "function" ? e : (t) => {
    var n;
    return (n = e.next) == null ? void 0 : n.call(e, t);
  };
}
function Dg(e) {
  return Object.assign(e, {
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: we(e, Qa(t), { flush: "sync" }) })
  });
}
function kg(e) {
  return Object.assign(e, {
    set: (t) => {
      e.value = typeof t == "function" ? t(e.value) : t;
    },
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: we(e, Qa(t), { flush: "sync" }) })
  });
}
function Tg() {
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
    createReadonlyAtom: (t, n) => Dg($(() => t())),
    createWritableAtom: (t, n) => kg(/* @__PURE__ */ Kf(t)),
    untrack: (t) => t(),
    batch: (t) => t()
  };
}
function Mo(e, t) {
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
function eu(e, t) {
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
function Qt(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function pr(e, t) {
  return (n) => {
    var r;
    (((r = t.options.atoms) == null ? void 0 : r[e]) ?? t.baseAtoms[e]).set((o) => Mo(n, o));
  };
}
function yl(e) {
  if (typeof e != "object" || e === null) return !1;
  if (Array.isArray(e)) return !0;
  const t = Object.getPrototypeOf(e);
  return t === Object.prototype || t === null;
}
function bl(e) {
  return Reflect.ownKeys(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
const Fg = 3;
function Hg(e, t) {
  return tu(e, t, Fg);
}
function tu(e, t, n) {
  if (Object.is(e, t)) return !0;
  if (n <= 0 || !yl(e) || !yl(t) || (Array.isArray(e) || Array.isArray(t)) && (!Array.isArray(e) || !Array.isArray(t) || e.length !== t.length))
    return !1;
  const r = bl(e), o = bl(t);
  if (r.length !== o.length) return !1;
  const s = e, l = t;
  for (let a = 0; a < r.length; a++) {
    const u = r[a];
    if (!Object.prototype.propertyIsEnumerable.call(t, u) || !tu(s[u], l[u], n - 1)) return !1;
  }
  return !0;
}
function Io(e, t, n, r = Hg) {
  const o = `on${t.charAt(0).toUpperCase()}${t.slice(1)}Change`, s = e.options[o];
  s && s((l) => {
    const a = Mo(n, l);
    return r(l, a) ? l : a;
  });
}
function Lg(e) {
  return e instanceof Function;
}
function jg(e, t) {
  const n = [], r = (o) => {
    o.forEach((s) => {
      n.push(s);
      const l = t(s);
      l.length && r(l);
    });
  };
  return r(e), n;
}
const zg = ({ fn: e, memoDeps: t, onAfterCompare: n, onAfterUpdate: r, onBeforeCompare: o, onBeforeUpdate: s }) => {
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
function nu(e) {
  let t = !1;
  return () => {
    if (!t) {
      t = !0;
      return;
    }
    e();
  };
}
function hr({ feature: e, fnName: t, objectId: n, onAfterUpdate: r, table: o, ...s }) {
  const l = () => {
    if (!r) return;
    const { schedule: u, untrack: f } = o._reactivity;
    u(() => f(() => r()));
  };
  return zg({
    ...s,
    ...{ onAfterUpdate: () => {
      l();
    } }
  });
}
function ru(e, t = "_") {
  const [n, r] = e.split(t);
  return {
    fnKey: r,
    fnName: `${n}.${r}`,
    parentName: n
  };
}
function pt(e, t, n) {
  for (const [r, { fn: o, memoDeps: s }] of Object.entries(n)) {
    const { fnKey: l, fnName: a } = ru(r);
    t[l] = s ? hr({
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
    const { fnKey: a, fnName: u } = ru(o);
    if (l) {
      const f = `_memo_${a}`;
      t[a] = function(...d) {
        if (!this[f]) {
          const h = this;
          this[f] = hr({
            memoDeps: (w) => l(h, w),
            fn: (...w) => s(h, ...w),
            fnName: u,
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
function Kg(e) {
  return e.row.getValue(e.column.id);
}
function Vg(e) {
  return e.getValue() ?? e.table.options.renderFallbackValue;
}
function Bg(e) {
  return {
    table: e.table,
    column: e.column,
    row: e.row,
    cell: e,
    getValue: () => e.getValue(),
    renderValue: () => e.renderValue()
  };
}
const Ng = { assignCellPrototype: (e, t) => {
  et("coreCellsFeature", e, t, {
    cell_getValue: { fn: (n) => Kg(n) },
    cell_renderValue: { fn: (n) => Vg(n) },
    cell_getContext: {
      fn: (n) => Bg(n),
      memoDeps: (n) => [n]
    }
  });
} };
function $g(e) {
  var t, n;
  if (!e._headerPrototype) {
    e._headerPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignHeaderPrototype) == null || n.call(t, e._headerPrototype, e);
  }
  return e._headerPrototype;
}
function ou(e, t, n) {
  const r = $g(e), o = Object.create(r);
  o.colSpan = 0, o.column = t, o.depth = n.depth, o.headerGroup = null, o.id = n.id ?? t.id, o.index = n.index, o.isPlaceholder = !!n.isPlaceholder, o.placeholderId = n.placeholderId, o.rowSpan = 0, o.subHeaders = [];
  const s = e._headerInstanceInitFns;
  for (let l = 0; l < s.length; l++) s[l](o);
  return o;
}
function en() {
  return {
    start: [],
    end: []
  };
}
function Wg(e) {
  var s;
  const t = e.getAllColumns(), n = e.getAllLeafColumnsById(), { start: r } = ((s = e.atoms.columnPinning) == null ? void 0 : s.get()) ?? en(), o = [];
  for (let l = 0; l < r.length; l++) {
    const a = n[r[l]];
    a && Z(a, "getIsVisible", We) && o.push(a);
  }
  return ar(t, o, e, "start");
}
function Ug(e) {
  var s;
  const t = e.getAllColumns(), n = e.getAllLeafColumnsById(), { end: r } = ((s = e.atoms.columnPinning) == null ? void 0 : s.get()) ?? en(), o = [];
  for (let l = 0; l < r.length; l++) {
    const a = n[r[l]];
    a && Z(a, "getIsVisible", We) && o.push(a);
  }
  return ar(t, o, e, "end");
}
function qg(e) {
  var s;
  const t = e.getAllColumns();
  let n = Z(e, "getVisibleLeafColumns", ii);
  const { start: r, end: o } = ((s = e.atoms.columnPinning) == null ? void 0 : s.get()) ?? en();
  if (r.length || o.length) {
    const l = [...r, ...o];
    n = n.filter((a) => !l.includes(a.id));
  }
  return ar(t, n, e, "center");
}
function Gg(e) {
  var o;
  const { start: t } = ((o = e.atoms.columnPinning) == null ? void 0 : o.get()) ?? en(), n = e.getAllLeafColumnsById(), r = [];
  for (let s = 0; s < t.length; s++) {
    const l = n[t[s]];
    l && r.push(l);
  }
  return r;
}
function Xg(e) {
  var o;
  const { end: t } = ((o = e.atoms.columnPinning) == null ? void 0 : o.get()) ?? en(), n = e.getAllLeafColumnsById(), r = [];
  for (let s = 0; s < t.length; s++) {
    const l = n[t[s]];
    l && r.push(l);
  }
  return r;
}
function Yg(e) {
  var o;
  const { start: t, end: n } = ((o = e.atoms.columnPinning) == null ? void 0 : o.get()) ?? en();
  if (!t.length && !n.length) return e.getAllLeafColumns();
  const r = [...t, ...n];
  return e.getAllLeafColumns().filter((s) => !r.includes(s.id));
}
function Zg(e) {
  return Z(e, "getStartLeafColumns", Gg).filter((t) => Z(t, "getIsVisible", We));
}
function Jg(e) {
  return Z(e, "getEndLeafColumns", Xg).filter((t) => Z(t, "getIsVisible", We));
}
function Qg(e) {
  return Z(e, "getCenterLeafColumns", Yg).filter((t) => Z(t, "getIsVisible", We));
}
function $r(e, t) {
  return t ? t === "start" ? Z(e, "getStartVisibleLeafColumns", Zg) : t === "end" ? Z(e, "getEndVisibleLeafColumns", Jg) : Z(e, "getCenterVisibleLeafColumns", Qg) : Z(e, "getVisibleLeafColumns", ii);
}
function We(e) {
  var r;
  const t = (r = e.table.atoms.columnVisibility) == null ? void 0 : r.get();
  if (!t) return !0;
  const n = e.columns;
  return n.length ? n.some((o) => Z(o, "getIsVisible", We)) : (Qt(t, e.id) ? t[e.id] : void 0) ?? !0;
}
function ii(e) {
  return e.getAllLeafColumns().filter((t) => Z(t, "getIsVisible", We));
}
function su(e, t = 1) {
  let n = t;
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    Z(o, "getIsVisible", We) && o.columns.length && (n = Math.max(n, su(o.columns, t + 1)));
  }
  return n;
}
function ep(e, t) {
  return e ? `${e}_${t}` : String(t);
}
function tp(e, t, n, r) {
  let o = e ?? "";
  return t && (o = o ? `${o}_${t}` : String(t)), n && (o = o ? `${o}_${n}` : n), r && (o = o ? `${o}_${r}` : r), o;
}
function np(e, t) {
  let n = 0;
  for (let r = 0; r < e.length; r++) e[r].column === t && n++;
  return n;
}
function iu(e, t, n, r, o, s) {
  const l = {
    depth: t,
    id: ep(r, t),
    headers: []
  }, a = [];
  for (let u = 0; u < e.length; u++) {
    if (!(u in e)) continue;
    const f = e[u], d = a[a.length - 1], h = f.column.depth === l.depth;
    let w, y = !1;
    if (h && f.column.parent ? w = f.column.parent : (w = f.column, y = !0), d && d.column === w) d.subHeaders.push(f);
    else {
      const I = ou(n, w, {
        id: tp(r, t, w.id, f.id),
        isPlaceholder: y,
        placeholderId: y ? String(np(a, w)) : void 0,
        depth: t,
        index: a.length
      });
      I.subHeaders.push(f), a.push(I);
    }
    l.headers.push(f), f.headerGroup = l;
  }
  for (let u = 0; u < s.length; u++) s[u](l);
  o.push(l), t > 0 && iu(a, t - 1, n, r, o, s);
}
function lu(e) {
  for (let t = 0; t < e.length; t++) {
    const n = e[t];
    if (!Z(n.column, "getIsVisible", We)) continue;
    let r = 0;
    if (n.subHeaders.length) {
      lu(n.subHeaders);
      for (let o = 0; o < n.subHeaders.length; o++) {
        const s = n.subHeaders[o];
        Z(s.column, "getIsVisible", We) && (r += s.colSpan);
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
function ar(e, t, n, r) {
  var u;
  const o = su(e), s = [], l = n._headerGroupInstanceInitFns, a = new Array(t.length);
  for (let f = 0; f < t.length; f++)
    f in t && (a[f] = ou(n, t[f], {
      depth: o,
      index: f
    }));
  return iu(a, o - 1, n, r, s, l), s.reverse(), lu(((u = s[0]) == null ? void 0 : u.headers) ?? []), s;
}
function rp(e) {
  var t, n;
  if (!e._columnPrototype) {
    e._columnPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignColumnPrototype) == null || n.call(t, e._columnPrototype, e);
  }
  return e._columnPrototype;
}
function op(e, t, n, r) {
  const o = {
    ...e.getDefaultColumnDef(),
    ...t
  }, s = o.accessorKey, l = s === void 0 ? void 0 : String(s), a = o.id ?? (l == null ? void 0 : l.replaceAll(".", "_")) ?? (typeof o.header == "string" ? o.header : void 0);
  let u;
  if (o.accessorFn) u = o.accessorFn;
  else if (s !== void 0) if (typeof s == "string" && s.includes(".")) {
    const w = s.split(".");
    u = (y) => {
      let I = y;
      for (let E = 0; E < w.length; E++) {
        const A = w[E];
        I = I == null ? void 0 : I[A];
      }
      return I;
    };
  } else u = (w) => w[o.accessorKey];
  if (!a)
    throw new Error();
  const f = rp(e), d = Object.create(f);
  d.accessorFn = u, d.columnDef = o, d.columns = [], d.depth = n, d.id = `${String(a)}`, d.parent = r;
  const h = e._columnInstanceInitFns;
  for (let w = 0; w < h.length; w++) h[w](d);
  return d;
}
function au(e) {
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
        const a = t[l], u = s.get(a);
        u && (o.push(u), s.delete(a));
      }
      for (let l = 0; l < r.length; l++) {
        const a = r[l];
        s.has(a.id) && o.push(a);
      }
    }
    return sp(e, o);
  };
}
function sp(e, t) {
  var a;
  const n = ((a = e.atoms.grouping) == null ? void 0 : a.get()) ?? [], { groupedColumnMode: r } = e.options;
  if (!n.length || !r) return t;
  const o = t.filter((u) => !n.includes(u.id));
  if (r === "remove") return o;
  const s = /* @__PURE__ */ new Map();
  for (let u = 0; u < t.length; u++) {
    const f = t[u];
    s.set(f.id, f);
  }
  const l = [];
  for (let u = 0; u < n.length; u++) {
    const f = s.get(n[u]);
    f && l.push(f);
  }
  return [...l, ...o];
}
function ip(e) {
  return [e, ...e.columns.flatMap((t) => t.getFlatColumns())];
}
function lp(e) {
  if (e.columns.length) {
    const t = e.columns.flatMap((n) => n.getLeafColumns());
    return Z(e.table, "getOrderColumns", au)(t);
  }
  return [e];
}
function ap(e) {
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
function uu(e, t, n, r = 0) {
  const o = new Array(t.length);
  for (let s = 0; s < t.length; s++) {
    if (!(s in t)) continue;
    const l = t[s], a = op(e, l, r, n), u = l;
    a.columns = u.columns ? uu(e, u.columns, a, r + 1) : [], o[s] = a;
  }
  return o;
}
function up(e) {
  return uu(e, e.options.columns);
}
function cp(e) {
  return e.getAllColumns().flatMap((t) => t.getFlatColumns());
}
function fp(e) {
  const t = te(), n = e.getAllFlatColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function dp(e) {
  const t = e.getAllColumns().flatMap((n) => n.getLeafColumns());
  return Z(e, "getOrderColumns", au)(t);
}
function gp(e) {
  const t = te(), n = e.getAllLeafColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function pp(e, t) {
  return e.getAllFlatColumnsById()[t];
}
const hp = {
  assignColumnPrototype: (e, t) => {
    et("coreColumnsFeature", e, t, {
      column_getFlatColumns: {
        fn: (n) => ip(n),
        memoDeps: (n) => [n.table.options.columns]
      },
      column_getLeafColumns: {
        fn: (n) => lp(n),
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
        fn: () => ap(e),
        memoDeps: () => [e.options.defaultColumn]
      },
      table_getAllColumns: {
        fn: () => up(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumns: {
        fn: () => cp(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumnsById: {
        fn: () => fp(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllLeafColumns: {
        fn: () => dp(e),
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
        fn: () => gp(e),
        memoDeps: () => [e.getAllLeafColumns()]
      },
      table_getColumn: { fn: (t) => pp(e, t) }
    });
  }
};
function cu(e, t) {
  for (let n = 0; n < e.subHeaders.length; n++) cu(e.subHeaders[n], t);
  t.push(e);
}
function mp(e) {
  const t = [];
  return cu(e, t), t;
}
function vp(e) {
  return {
    column: e.column,
    header: e,
    table: e.column.table
  };
}
function wp(e) {
  var f;
  const { start: t, end: n } = ((f = e.atoms.columnPinning) == null ? void 0 : f.get()) ?? en(), r = e.getAllColumns(), o = Z(e, "getVisibleLeafColumns", ii);
  if (!t.length && !n.length) return ar(r, o, e);
  const s = e.getAllLeafColumnsById(), l = [];
  for (let d = 0; d < t.length; d++) {
    const h = s[t[d]];
    h && Z(h, "getIsVisible", We) && l.push(h);
  }
  const a = [];
  for (let d = 0; d < n.length; d++) {
    const h = s[n[d]];
    h && Z(h, "getIsVisible", We) && a.push(h);
  }
  const u = o.filter((d) => !t.includes(d.id) && !n.includes(d.id));
  return ar(r, [
    ...l,
    ...u,
    ...a
  ], e);
}
function yp(e) {
  return [...e.getHeaderGroups()].reverse();
}
function bp(e) {
  const t = e.getHeaderGroups(), n = [];
  for (let r = 0; r < t.length; r++) {
    const o = t[r].headers;
    for (let s = 0; s < o.length; s++) n.push(o[s]);
  }
  return n;
}
function _p(e) {
  var r;
  const t = ((r = e.getHeaderGroups()[0]) == null ? void 0 : r.headers) ?? [], n = [];
  for (let o = 0; o < t.length; o++) {
    const s = t[o].getLeafHeaders();
    for (let l = 0; l < s.length; l++) n.push(s[l]);
  }
  return n;
}
const Sp = {
  assignHeaderPrototype: (e, t) => {
    et("coreHeadersFeature", e, t, {
      header_getLeafHeaders: {
        fn: (n) => mp(n),
        memoDeps: (n) => [n.column.table.options.columns]
      },
      header_getContext: {
        fn: (n) => vp(n),
        memoDeps: (n) => [n.column.table.options.columns]
      }
    });
  },
  constructTableAPIs: (e) => {
    pt("coreHeadersFeature", e, {
      table_getHeaderGroups: {
        fn: () => wp(e),
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
        fn: () => yp(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getFlatHeaders: {
        fn: () => bp(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getLeafHeaders: {
        fn: () => _p(e),
        memoDeps: () => [e.getHeaderGroups()]
      }
    });
  }
};
function xp(e) {
  var t, n;
  if (!e._rowPrototype) {
    e._rowPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignRowPrototype) == null || n.call(t, e._rowPrototype, e);
  }
  return e._rowPrototype;
}
const Rp = (e, t, n, r, o, s, l) => {
  const a = xp(e), u = Object.create(a);
  u._displayIndexCache = -1, u._uniqueValuesCache = te(), u._valuesCache = te(), u.depth = o, u.id = t, u.index = r, u.original = n, u.parentId = l, u.subRows = [];
  const f = e._rowInstanceInitFns;
  for (let d = 0; d < f.length; d++) f[d](u);
  return u;
}, Cp = /([0-9]+)/gm;
function Rn(e) {
  const t = Object.assign((n, r, o) => {
    let s = n.getValue(o), l = r.getValue(o);
    const a = t.resolveDataValue;
    return a && (s = a(s), l = a(l)), t.sort(s, l, n, r, o);
  }, e);
  return t;
}
const Mp = Rn({
  resolveDataValue: (e) => Eo(e).toLowerCase(),
  sort: (e, t) => du(e, t)
});
Rn({
  resolveDataValue: (e) => Eo(e),
  sort: (e, t) => du(e, t)
});
const Ip = Rn({
  resolveDataValue: (e) => Eo(e).toLowerCase(),
  sort: (e, t) => li(e, t)
});
Rn({
  resolveDataValue: (e) => Eo(e),
  sort: (e, t) => li(e, t)
});
Rn({
  resolveDataValue: (e) => Ep(e),
  sort: (e, t) => e > t ? 1 : e < t ? -1 : 0
});
const fu = Rn({ sort: (e, t) => li(e, t) });
function li(e, t) {
  return e === t ? 0 : e > t ? 1 : -1;
}
function Ep(e) {
  return e instanceof Date ? e.getTime() : e;
}
function Eo(e) {
  return typeof e == "number" ? isNaN(e) || e === 1 / 0 || e === -1 / 0 ? "" : String(e) : typeof e == "string" ? e : "";
}
function du(e, t) {
  let n = 0, r = 0;
  const o = e.length, s = t.length;
  for (; n < o && r < s; ) {
    const l = ao(e.charCodeAt(n)), a = ao(t.charCodeAt(r)), u = Hs(e, n, l), f = Hs(t, r, a);
    if (!l && !a) {
      const h = Ap(e, n, u, t, r, f);
      if (h) return h;
      n = u, r = f;
      continue;
    }
    if (l !== a) return l ? 1 : -1;
    const d = Op(e, n, u, t, r, f);
    if (d) return d;
    n = u, r = f;
  }
  return Sl(e, n) - Sl(t, r);
}
function ao(e) {
  return e >= 48 && e <= 57;
}
function Hs(e, t, n) {
  let r = t + 1;
  for (; r < e.length && ao(e.charCodeAt(r)) === n; ) r++;
  return r;
}
function Ap(e, t, n, r, o, s) {
  const l = n - t, a = s - o, u = l < a ? l : a;
  for (let f = 0; f < u; f++) {
    const d = e.charCodeAt(t + f), h = r.charCodeAt(o + f);
    if (d > h) return 1;
    if (h > d) return -1;
  }
  return l > a ? 1 : a > l ? -1 : 0;
}
function Op(e, t, n, r, o, s) {
  let l = t;
  for (; l < n && e.charCodeAt(l) === 48; ) l++;
  let a = o;
  for (; a < s && r.charCodeAt(a) === 48; ) a++;
  const u = n - l, f = s - a;
  if (u === 0 && f === 0) return 0;
  if (u <= 15 && f <= 15) {
    const w = _l(e, l, n), y = _l(r, a, s);
    return w > y ? 1 : y > w ? -1 : 0;
  }
  const d = parseInt(e.slice(t, n), 10), h = parseInt(r.slice(o, s), 10);
  return d > h ? 1 : h > d ? -1 : 0;
}
function _l(e, t, n) {
  let r = 0;
  for (let o = t; o < n; o++) r = r * 10 + e.charCodeAt(o) - 48;
  return r;
}
function Sl(e, t) {
  let n = 0, r = t;
  for (; r < e.length; )
    n++, r = Hs(e, r, ao(e.charCodeAt(r)));
  return n;
}
function Pp() {
  return [];
}
function Dp(e, t) {
  Io(e, "cellSelection", gt(e.initialState.cellSelection) ?? Pp());
}
function kp(e) {
  e.atoms.cellSelection && (e.options.autoResetAll ?? e.options.autoResetCellSelection ?? !0) && e._reactivity.schedule(() => Dp(e));
}
function Tp() {
  return te();
}
function gu(e) {
  e.atoms.expanded && (e.options.autoResetAll ?? e.options.autoResetExpanded ?? !e.options.manualExpanding) && e._reactivity.schedule(() => hu(e));
}
function uo(e, t) {
  var n, r;
  (r = (n = e.options).onExpandedChange) == null || r.call(n, t);
}
function pu(e, t) {
  var r;
  const n = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t ?? !vu(e)) {
    if (n === !0 || !mu(e)) return;
    uo(e, !0);
  } else {
    if (n !== !0 && !Object.keys(n).length) return;
    uo(e, te());
  }
}
function hu(e, t) {
  const n = e.initialState.expanded;
  Io(e, "expanded", t ? te() : n === !0 ? !0 : Object.assign(te(), gt(n ?? {})));
}
function mu(e) {
  return e.getPrePaginatedRowModel().flatRows.some((t) => Yt(t));
}
function Fp(e) {
  return (t) => {
    pu(e);
  };
}
function Hp(e) {
  var n;
  const t = ((n = e.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return t === !0 || Object.values(t).some(Boolean);
}
function vu(e) {
  var r;
  const t = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t === !0) return !0;
  if (!Object.keys(t).length) return !1;
  const n = e.getRowModel().flatRows.filter((o) => Yt(o));
  return !(!n.length || n.some((o) => !Ao(o)));
}
function Lp(e) {
  var r;
  let t = 0;
  const n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return (n === !0 ? Object.values(e.getRowModel().rowsById).filter((o) => Yt(o)).map((o) => o.id) : Object.keys(n ?? {})).forEach((o) => {
    const s = o.split(".");
    t = Math.max(t, s.length);
  }), t;
}
function wu(e, t) {
  var s;
  const n = ((s = e.table.atoms.expanded) == null ? void 0 : s.get()) ?? {}, r = n === !0 || Ls(n, e.id), o = t ?? !r;
  o !== r && (o && !Yt(e) || uo(e.table, (l) => {
    const a = l === !0 ? !0 : Ls(l, e.id);
    let u = te();
    if (l === !0 ? Object.values(e.table.getRowModel().rowsById).forEach((f) => {
      Yt(f) && (u[f.id] = !0);
    }) : u = Object.assign(te(), l), !a && o)
      return u[e.id] = !0, u;
    if (a && !o) {
      const f = te(), d = Object.keys(u);
      for (let h = 0; h < d.length; h++) {
        const w = d[h];
        w !== e.id && u[w] && (f[w] = !0);
      }
      return f;
    }
    return l;
  }));
}
function Ao(e) {
  var n, r, o;
  const t = ((n = e.table.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return !!(((o = (r = e.table.options).getIsRowExpanded) == null ? void 0 : o.call(r, e)) ?? (t === !0 || Ls(t, e.id)));
}
function Ls(e, t) {
  return !!(e && e !== !0 && Qt(e, t) && e[t]);
}
function Yt(e) {
  var t, n;
  return ((n = (t = e.table.options).getRowCanExpand) == null ? void 0 : n.call(t, e)) ?? ((e.table.options.enableExpanding ?? !0) && !!e.subRows.length);
}
function jp(e) {
  let t = !0, n = e;
  for (; t && n.parentId; )
    n = e.table.getRow(n.parentId, !0), t = Ao(n);
  return t;
}
function zp(e) {
  const t = Yt(e);
  return () => {
    t && wu(e);
  };
}
const js = 0;
function yu(e) {
  var t, n;
  if (e.options.autoResetAll ?? e.options.autoResetPageIndex ?? !e.options.manualPagination) {
    if ((((n = (t = e.atoms.pagination) == null ? void 0 : t.get()) == null ? void 0 : n.pageIndex) ?? js) === js) return;
    Bp(e);
  }
}
function Kp(e, t) {
  Io(e, "pagination", t);
}
function Vp(e, t) {
  Kp(e, (n) => {
    let r = Mo(t, n.pageIndex);
    const o = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
    return r = Math.max(0, Math.min(r, o)), {
      ...n,
      pageIndex: r
    };
  });
}
function Bp(e, t) {
  Vp(e, js);
}
function Np() {
  return [];
}
function Oo(e, t) {
  Io(e, "sorting", t);
}
function bu(e, t) {
  Oo(e, t ? [] : gt(e.initialState.sorting ?? []));
}
function $p(e) {
  e.atoms.sorting && (e.options.autoResetAll ?? e.options.autoResetSorting ?? !1) && bu(e);
}
function _u(e) {
  const t = e.table._rowModelFns.sortFns, n = e.table.getFilteredRowModel().flatRows.slice(0, 10);
  let r, o = !1;
  for (let s = 0; s < n.length; s++) {
    const l = n[s].getValue(e.id);
    if (Object.prototype.toString.call(l) === "[object Date]") {
      r = "datetime";
      break;
    }
    if (typeof l == "string" && (o = !0, l.split(Cp).length > 1)) {
      r = "alphanumeric";
      break;
    }
  }
  if (!r && o && (r = "text"), r) {
    let s = t == null ? void 0 : t[r];
    if (s || r === "alphanumeric" && (s = t == null ? void 0 : t.text), s) return s;
  }
  return fu;
}
function Su(e) {
  const t = e.table.getFilteredRowModel().flatRows.slice(0, 10);
  for (let n = 0; n < t.length; n++) {
    const r = t[n].getValue(e.id);
    if (r != null)
      return typeof r == "string" ? "asc" : "desc";
  }
  return "desc";
}
function xu(e) {
  const t = e.table._rowModelFns.sortFns;
  return Lg(e.columnDef.sortFn) ? e.columnDef.sortFn : e.columnDef.sortFn === "auto" ? _u(e) : (t == null ? void 0 : t[e.columnDef.sortFn]) ?? fu;
}
function Ru(e, t, n) {
  const r = Mu(e, n && co(e)), o = typeof t < "u";
  Oo(e.table, (s) => {
    const l = s.findIndex((w) => w.id === e.id), a = l === -1 ? void 0 : s[l];
    let u = [], f;
    const d = o ? t : r === "desc", h = !!(s.length && co(e) && n);
    return h ? a ? f = "toggle" : f = "add" : a ? f = "toggle" : f = "replace", f === "toggle" && (o || r || (f = "remove")), f === "add" ? (u = [...s, {
      id: e.id,
      desc: d
    }], u.splice(0, u.length - (e.table.options.maxMultiSortColCount ?? Number.MAX_SAFE_INTEGER))) : f === "toggle" ? u = h ? s.map((w) => w.id === e.id ? {
      ...w,
      desc: d
    } : w) : [{
      id: e.id,
      desc: d
    }] : f === "remove" ? u = h ? s.filter((w) => w.id !== e.id) : [] : u = [{
      id: e.id,
      desc: d
    }], u;
  });
}
function Cu(e) {
  return e.columnDef.sortDescFirst ?? e.table.options.sortDescFirst ?? Su(e) === "desc" ? "desc" : "asc";
}
function Mu(e, t) {
  const n = Cu(e), r = Iu(e);
  return r ? r !== n && (e.table.options.enableSortingRemoval ?? !0) && (!t || (e.table.options.enableMultiRemove ?? !0)) ? !1 : r === "desc" ? "asc" : "desc" : n;
}
function ai(e) {
  return (e.columnDef.enableSorting ?? !0) && (e.table.options.enableSorting ?? !0) && !!e.accessorFn;
}
function co(e) {
  return e.columnDef.enableMultiSort ?? e.table.options.enableMultiSort ?? !!e.accessorFn;
}
function Iu(e) {
  var n, r;
  const t = (r = (n = e.table.atoms.sorting) == null ? void 0 : n.get()) == null ? void 0 : r.find((o) => o.id === e.id);
  return t ? t.desc ? "desc" : "asc" : !1;
}
function Wp(e) {
  var t, n;
  return ((n = (t = e.table.atoms.sorting) == null ? void 0 : t.get()) == null ? void 0 : n.findIndex((r) => r.id === e.id)) ?? -1;
}
function Up(e) {
  Oo(e.table, (t) => t.length ? t.filter((n) => n.id !== e.id) : []);
}
function qp(e) {
  const t = ai(e);
  return (n) => {
    var r, o;
    t && Ru(e, void 0, co(e) ? (o = (r = e.table.options).isMultiSortEvent) == null ? void 0 : o.call(r, n) : !1);
  };
}
function Eu() {
  return (e) => hr({
    feature: "coreRowModelsFeature",
    table: e,
    fnName: "table.getCoreRowModel",
    memoDeps: () => [e.options.data],
    fn: () => Gp(e, e.options.data),
    onAfterUpdate: nu(() => {
      gu(e), yu(e), $p(e), kp(e);
    })
  });
}
function Au(e, t, n, r = 0, o) {
  var l;
  const s = [];
  for (let a = 0; a < n.length; a++) {
    const u = n[a], f = Rp(e, e.getRowId(u, a, o), u, a, r, void 0, o == null ? void 0 : o.id);
    t.flatRows.push(f), t.rowsById[f.id] = f, s.push(f), e.options.getSubRows && (f.originalSubRows = e.options.getSubRows(u, a), (l = f.originalSubRows) != null && l.length && (f.subRows = Au(e, t, f.originalSubRows, r + 1, f)));
  }
  return s;
}
function Gp(e, t) {
  const n = {
    rows: [],
    flatRows: [],
    rowsById: te()
  };
  return n.rows = Au(e, n, t), n;
}
function Xp(e) {
  var t, n;
  return e._rowModels.coreRowModel || (e._rowModels.coreRowModel = ((n = (t = e.options.features).coreRowModel) == null ? void 0 : n.call(t, e)) ?? Eu()(e)), e._rowModels.coreRowModel();
}
function Yp(e) {
  return e.getCoreRowModel();
}
function Zp(e) {
  var t, n;
  return e._rowModels.filteredRowModel || (e._rowModels.filteredRowModel = (n = (t = e.options.features).filteredRowModel) == null ? void 0 : n.call(t, e)), e.options.manualFiltering || !e._rowModels.filteredRowModel ? e.getPreFilteredRowModel() : e._rowModels.filteredRowModel();
}
function Jp(e) {
  return e.getFilteredRowModel();
}
function Qp(e) {
  var t, n;
  return e._rowModels.groupedRowModel || (e._rowModels.groupedRowModel = (n = (t = e.options.features).groupedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualGrouping || !e._rowModels.groupedRowModel ? e.getPreGroupedRowModel() : e._rowModels.groupedRowModel();
}
function eh(e) {
  return e.getGroupedRowModel();
}
function th(e) {
  var t, n;
  return e._rowModels.sortedRowModel || (e._rowModels.sortedRowModel = (n = (t = e.options.features).sortedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualSorting || !e._rowModels.sortedRowModel ? e.getPreSortedRowModel() : e._rowModels.sortedRowModel();
}
function nh(e) {
  return e.getSortedRowModel();
}
function rh(e) {
  var t, n;
  return e._rowModels.expandedRowModel || (e._rowModels.expandedRowModel = (n = (t = e.options.features).expandedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualExpanding || !e._rowModels.expandedRowModel ? e.getPreExpandedRowModel() : e._rowModels.expandedRowModel();
}
function oh(e) {
  return e.getExpandedRowModel();
}
function sh(e) {
  var t, n;
  return e._rowModels.paginatedRowModel || (e._rowModels.paginatedRowModel = (n = (t = e.options.features).paginatedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualPagination || !e._rowModels.paginatedRowModel ? e.getPrePaginatedRowModel() : e._rowModels.paginatedRowModel();
}
function ih(e) {
  return e.getPaginatedRowModel();
}
const lh = { constructTableAPIs: (e) => {
  pt("coreRowModelsFeature", e, {
    table_getCoreRowModel: { fn: () => Xp(e) },
    table_getPreFilteredRowModel: { fn: () => Yp(e) },
    table_getFilteredRowModel: { fn: () => Zp(e) },
    table_getPreGroupedRowModel: { fn: () => Jp(e) },
    table_getGroupedRowModel: { fn: () => Qp(e) },
    table_getPreSortedRowModel: { fn: () => eh(e) },
    table_getSortedRowModel: { fn: () => th(e) },
    table_getPreExpandedRowModel: { fn: () => nh(e) },
    table_getExpandedRowModel: { fn: () => rh(e) },
    table_getPrePaginatedRowModel: { fn: () => oh(e) },
    table_getPaginatedRowModel: { fn: () => sh(e) },
    table_getRowModel: { fn: () => ih(e) }
  });
} };
function ah(e) {
  var t, n;
  if (!e._cellPrototype) {
    e._cellPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignCellPrototype) == null || n.call(t, e._cellPrototype, e);
  }
  return e._cellPrototype;
}
function uh(e, t, n) {
  const r = ah(n), o = Object.create(r);
  o.column = e, o.id = `${t.id}_${e.id}`, o.row = t;
  const s = n._cellInstanceInitFns;
  for (let l = 0; l < s.length; l++) s[l](o);
  return o;
}
function ch(e) {
  const t = e.table.getRowsInDisplayOrder(), n = e._displayIndexCache;
  return t[n] === e ? n : -1;
}
function fh(e) {
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
function dh(e, t) {
  if (Qt(e._valuesCache, t)) return e._valuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return e._valuesCache[t] = n.accessorFn(e.original, e.index), e._valuesCache[t];
}
function gh(e, t) {
  if (Qt(e._uniqueValuesCache, t)) return e._uniqueValuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return n.columnDef.getUniqueValues ? (e._uniqueValuesCache[t] = n.columnDef.getUniqueValues(e.original, e.index), e._uniqueValuesCache[t]) : (e._uniqueValuesCache[t] = [e.getValue(t)], e._uniqueValuesCache[t]);
}
function ph(e, t) {
  return e.getValue(t) ?? e.table.options.renderFallbackValue;
}
function hh(e) {
  return jg(e.subRows, (t) => t.subRows);
}
function mh(e) {
  const t = e.getCoreRowModel().flatRows;
  let n = 0;
  for (let r = 0; r < t.length; r++) n = Math.max(n, t[r].depth);
  return n;
}
function vh(e) {
  if (e.parentId)
    return e.table.getCoreRowModel().rowsById[e.parentId] ?? e.table.getRow(e.parentId, !0);
}
function wh(e) {
  const t = [];
  let n = e;
  for (; ; ) {
    const r = n.getParentRow();
    if (!r) break;
    t.push(r), n = r;
  }
  return t.reverse();
}
function yh(e) {
  const t = e.table.getAllLeafColumns();
  let n = e._cellsCache;
  n || (n = e._cellsCache = /* @__PURE__ */ new WeakMap());
  const r = new Array(t.length);
  for (let o = 0; o < t.length; o++) {
    const s = t[o];
    let l = n.get(s);
    l || (l = uh(s, e, e.table), n.set(s, l)), r[o] = l;
  }
  return r;
}
function bh(e) {
  const t = te(), n = e.getAllCells();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.column.id] = o;
  }
  return t;
}
function _h(e, t, n, r) {
  var o, s;
  return ((s = (o = t.options).getRowId) == null ? void 0 : s.call(o, e, n, r)) ?? (r ? `${r.id}.${n}` : String(n));
}
function Sh(e, t, n) {
  let r = (n ? e.getPrePaginatedRowModel() : e.getRowModel()).rowsById[t];
  if (!r && (r = e.getCoreRowModel().rowsById[t], !r))
    throw new Error();
  return r;
}
const xh = {
  assignRowPrototype: (e, t) => {
    et("coreRowsFeature", e, t, {
      row_getDisplayIndex: { fn: (n) => ch(n) },
      row_getAllCellsByColumnId: {
        fn: (n) => bh(n),
        memoDeps: (n) => [n.getAllCells()]
      },
      row_getAllCells: {
        fn: (n) => yh(n),
        memoDeps: (n) => [n.table.getAllLeafColumns()]
      },
      row_getLeafRows: {
        fn: (n) => hh(n),
        memoDeps: (n) => [n.subRows]
      },
      row_getParentRow: { fn: (n) => vh(n) },
      row_getParentRows: { fn: (n) => wh(n) },
      row_getUniqueValues: { fn: (n, r) => gh(n, r) },
      row_getValue: { fn: (n, r) => dh(n, r) },
      row_renderValue: { fn: (n, r) => ph(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    pt("coreRowsFeature", e, {
      table_getRowsInDisplayOrder: {
        fn: () => fh(e),
        memoDeps: () => {
          var t;
          return [
            e.getPrePaginatedRowModel().rows,
            e.options.paginateExpandedRows,
            e.options.paginateExpandedRows === !1 ? (t = e.atoms.expanded) == null ? void 0 : t.get() : void 0
          ];
        }
      },
      table_getRowId: { fn: (t, n, r) => _h(t, e, n, r) },
      table_getRow: { fn: (t, n) => Sh(e, t, n) },
      table_getMaxSubRowDepth: {
        fn: () => mh(e),
        memoDeps: () => [e.getCoreRowModel()]
      }
    });
  }
};
function Ou(e, t, n = (r, o) => r === o) {
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
function Rh(e, t, n = (r, o) => r === o) {
  e._reactivity.batch(() => {
    var r, o;
    Ou(e, t, n), (o = (r = e._reactivity).commit) == null || o.call(r);
  });
}
function Ch(e) {
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
function Mh(e, t) {
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
function Ih(e, t, n) {
  const r = Mh(e, Mo(t, e.options));
  e.optionsStore ? e.optionsStore.set(() => r) : e.options = r, Rh(e, r.state ?? null);
}
const Eh = { constructTableAPIs: (e) => {
  pt("coreTablesFeature", e, {
    table_reset: { fn: () => Ch(e) },
    table_setOptions: { fn: (t) => Ih(e, t) }
  });
} }, Ah = {
  coreCellsFeature: Ng,
  coreColumnsFeature: hp,
  coreHeadersFeature: Sp,
  coreRowModelsFeature: lh,
  coreRowsFeature: xh,
  coreTablesFeature: Eh
};
function Oh(e) {
  const t = e;
  return Object.defineProperty(e, "state", { get() {
    return e.get();
  } }), "set" in e && (t.setState = e.set.bind(e)), t;
}
function Ph(e, t) {
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
  const n = xl(e);
  if (n.length !== xl(t).length) return !1;
  for (let r = 0; r < n.length; r++) if (!Object.prototype.hasOwnProperty.call(t, n[r]) || !Object.is(e[n[r]], t[n[r]])) return !1;
  return !0;
}
function xl(e) {
  return Object.keys(e).concat(Object.getOwnPropertySymbols(e));
}
function Dh(e, t = {}) {
  return Object.values(e).forEach((n) => {
    var r;
    t = ((r = n.getInitialState) == null ? void 0 : r.call(n, t)) ?? t;
  }), gt(t);
}
function kh(e) {
  var j, U;
  const t = e.features.coreReactivityFeature, { aggregationFns: n, columnMeta: r, coreRowModel: o, expandedRowModel: s, facetedMinMaxValues: l, facetedRowModel: a, facetedUniqueValues: u, filterFns: f, filterMeta: d, filteredRowModel: h, groupedRowModel: w, paginatedRowModel: y, sortFns: I, sortedRowModel: E, tableMeta: A, ...z } = e.features, M = {
    _cellInstanceInitFns: [],
    _columnInstanceInitFns: [],
    _features: {
      ...Ah,
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
  }, O = Object.values(M._features), _ = {
    ...O.reduce((K, L) => {
      var ee;
      return Object.assign(K, (ee = L.getDefaultTableOptions) == null ? void 0 : ee.call(L, M));
    }, {}),
    ...e
  };
  if (t.wrapExternalAtoms && _.atoms) for (const [K, L] of Object.entries(_.atoms)) {
    const ee = L, ue = t.createWritableAtom(ee.get(), { debugName: `externalAtom/${K}` });
    _.atoms[K] = ue;
    let Y = !1;
    const me = ee.subscribe((ye) => {
      Y || ue.set(ye);
    }), Me = ue.subscribe((ye) => {
      Y = !0, ee.set(ye), Y = !1;
    });
    t.addSubscription(me), t.addSubscription(Me);
  }
  t.createOptionsStore ? (M.optionsStore = t.createWritableAtom(_, { debugName: "table/optionsStore" }), Object.defineProperty(M, "options", {
    configurable: !0,
    enumerable: !0,
    get() {
      return M.optionsStore.get();
    },
    set(K) {
      M.optionsStore.set(() => K);
    }
  })) : M.options = _, M.initialState = Dh(M._features, M.options.initialState);
  const D = Object.keys(M.initialState);
  for (let K = 0; K < D.length; K++) {
    const L = D[K];
    M.baseAtoms[L] = t.createWritableAtom(M.initialState[L], { debugName: `table/baseAtoms/${L}` }), M.atoms[L] = t.createReadonlyAtom(() => {
      var Me;
      const ee = M.options, ue = (Me = ee.atoms) == null ? void 0 : Me[L], Y = ue ? ue.get() : M.baseAtoms[L].get();
      if (ue) return Y;
      const me = ee.state;
      if (me && Qt(me, L)) {
        const ye = me[L];
        return ye === void 0 ? M.initialState[L] : ye;
      }
      return Y;
    }, { debugName: `table/atoms/${L}` });
  }
  Ou(M), M.store = Oh(t.createReadonlyAtom(() => {
    const K = {};
    for (let L = 0; L < D.length; L++) {
      const ee = D[L];
      K[ee] = M.atoms[ee].get();
    }
    return K;
  }, {
    compare: Ph,
    debugName: "table/store"
  }));
  for (let K = 0; K < O.length; K++) {
    const L = O[K];
    (j = L.initTableInstanceData) == null || j.call(L, M), L.initCellInstanceData && M._cellInstanceInitFns.push(L.initCellInstanceData.bind(L)), L.initColumnInstanceData && M._columnInstanceInitFns.push(L.initColumnInstanceData.bind(L)), L.initHeaderGroupInstanceData && M._headerGroupInstanceInitFns.push(L.initHeaderGroupInstanceData.bind(L)), L.initHeaderInstanceData && M._headerInstanceInitFns.push(L.initHeaderInstanceData.bind(L)), L.initRowInstanceData && M._rowInstanceInitFns.push(L.initRowInstanceData.bind(L)), (U = L.constructTableAPIs) == null || U.call(L, M);
  }
  return M;
}
function Th() {
  return te();
}
function Pu() {
  return {
    size: 150,
    minSize: 20,
    maxSize: Number.MAX_SAFE_INTEGER
  };
}
function Po(e) {
  var o;
  const t = Pu(), n = (o = e.table.atoms.columnSizing) == null ? void 0 : o.get(), r = n && Qt(n, e.id) ? n[e.id] : void 0;
  return Math.min(Math.max(e.columnDef.minSize ?? t.minSize, r ?? e.columnDef.size ?? t.size), e.columnDef.maxSize ?? t.maxSize);
}
function Wr(e) {
  const t = te(), n = te(), r = new Array(e.length);
  let o = 0;
  for (let l = 0; l < e.length; l++) {
    const a = e[l], u = Z(a, "getSize", Po);
    r[l] = u, t[a.id] = o, o += u;
  }
  let s = 0;
  for (let l = e.length - 1; l >= 0; l--)
    n[e[l].id] = s, s += r[l];
  return {
    starts: t,
    afters: n
  };
}
function ui(e) {
  return {
    all: Wr($r(e)),
    center: Wr($r(e, "center")),
    start: Wr($r(e, "start")),
    end: Wr($r(e, "end"))
  };
}
function Du(e) {
  return e === "start" ? "start" : e === "end" ? "end" : e === "center" ? "center" : "all";
}
function Fh(e, t) {
  return Z(e.table, "getColumnOffsets", ui)[Du(t)].starts[e.id] ?? 0;
}
function Hh(e, t) {
  return Z(e.table, "getColumnOffsets", ui)[Du(t)].afters[e.id] ?? 0;
}
function Lh(e) {
  Do(e.table, (t) => {
    const n = te(), r = Object.keys(t);
    for (let o = 0; o < r.length; o++) {
      const s = r[o];
      s !== e.id && (n[s] = t[s]);
    }
    return n;
  });
}
function ku(e) {
  if (!e.subHeaders.length) return Po(e.column);
  let t = 0;
  for (let n = 0; n < e.subHeaders.length; n++) t += ku(e.subHeaders[n]);
  return t;
}
function tn(e) {
  return ku(e);
}
function Tu(e) {
  var t;
  if (e.index > 0) {
    const n = (t = e.headerGroup) == null ? void 0 : t.headers[e.index - 1];
    if (n) return Z(n, "getStart", Tu) + Z(n, "getSize", tn);
  }
  return 0;
}
function Do(e, t) {
  var n, r;
  (r = (n = e.options).onColumnSizingChange) == null || r.call(n, t);
}
function jh(e, t) {
  Do(e, t ? te() : Object.assign(te(), gt(e.initialState.columnSizing ?? {})));
}
function zh(e) {
  var t;
  return ((t = e.getHeaderGroups()[0]) == null ? void 0 : t.headers.reduce((n, r) => n + tn(r), 0)) ?? 0;
}
function Kh(e) {
  var t;
  return ((t = Z(e, "getStartHeaderGroups", Wg)[0]) == null ? void 0 : t.headers.reduce((n, r) => n + tn(r), 0)) ?? 0;
}
function Vh(e) {
  var t;
  return ((t = Z(e, "getCenterHeaderGroups", qg)[0]) == null ? void 0 : t.headers.reduce((n, r) => n + tn(r), 0)) ?? 0;
}
function Bh(e) {
  var t;
  return ((t = Z(e, "getEndHeaderGroups", Ug)[0]) == null ? void 0 : t.headers.reduce((n, r) => n + tn(r), 0)) ?? 0;
}
function zs() {
  return {
    startOffset: null,
    startSize: null,
    deltaOffset: null,
    deltaPercentage: null,
    isResizingColumn: !1,
    columnSizingStart: []
  };
}
function Fu(e) {
  return (e.columnDef.enableResizing ?? !0) && (e.table.options.enableColumnResizing ?? !0);
}
function Nh(e) {
  var t, n;
  return ((n = (t = e.table.atoms.columnResizing) == null ? void 0 : t.get()) == null ? void 0 : n.isResizingColumn) === e.id;
}
function $h(e, t) {
  const n = e.table.getColumn(e.column.id), r = Fu(n);
  return (o) => {
    if (!r || ms(o) && o.touches.length > 1)
      return;
    const s = tn(e), l = e.getLeafHeaders().map((D) => [D.column.id, Po(D.column)]), a = ms(o) ? Math.round(o.touches[0].clientX) : o.clientX, u = te(), f = (D, j) => {
      if (typeof j != "number") return;
      const U = n.table, K = U.options.columnResizeMode === "onChange" || D === "end";
      U._reactivity.batch(() => {
        er(U, (L) => {
          const ee = U.options.columnResizeDirection === "rtl" ? -1 : 1, ue = (j - (L.startOffset ?? 0)) * ee, Y = L.startSize ?? 0, me = Math.max(Y > 0 ? ue / Y : 0, -0.999999);
          if (K) {
            const Me = L.columnSizingStart;
            for (let ye = 0; ye < Me.length; ye++) {
              const G = Me[ye], J = G[1];
              u[G[0]] = Math.round(Math.max(J > 0 ? J + J * me : ue / Me.length, 0) * 100) / 100;
            }
          }
          return {
            ...L,
            deltaOffset: ue,
            deltaPercentage: me
          };
        }), K && Do(U, (L) => Object.assign(te(), L, u));
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
        f("end", D ?? w), er(n.table, (j) => ({
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
    }, M = {
      moveHandler: (D) => (D.cancelable && (D.preventDefault(), D.stopPropagation()), I(D.touches[0].clientX), !1),
      upHandler: (D) => {
        var j;
        O(), D.cancelable && (D.preventDefault(), D.stopPropagation()), E((j = D.touches[0]) == null ? void 0 : j.clientX);
      },
      cancelHandler: () => {
        O(), E();
      }
    }, O = () => {
      A == null || A.removeEventListener("touchmove", M.moveHandler), A == null || A.removeEventListener("touchend", M.upHandler), A == null || A.removeEventListener("touchcancel", M.cancelHandler);
    }, _ = Uh() ? { passive: !1 } : !1;
    ms(o) ? (A == null || A.addEventListener("touchmove", M.moveHandler, _), A == null || A.addEventListener("touchend", M.upHandler, _), A == null || A.addEventListener("touchcancel", M.cancelHandler, _)) : (A == null || A.addEventListener("mousemove", z.moveHandler, _), A == null || A.addEventListener("mouseup", z.upHandler, _)), er(n.table, (D) => ({
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
function er(e, t) {
  var n, r;
  (r = (n = e.options).onColumnResizingChange) == null || r.call(n, t);
}
function Wh(e, t) {
  er(e, t ? zs() : gt(e.initialState.columnResizing ?? zs()));
}
let Ur = null;
function Uh() {
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
function ms(e) {
  return e.type === "touchstart";
}
const qh = {
  getInitialState: (e) => ({
    columnResizing: zs(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    columnResizeMode: "onEnd",
    columnResizeDirection: "ltr",
    onColumnResizingChange: pr("columnResizing", e)
  }),
  assignColumnPrototype: (e, t) => {
    et("columnResizingFeature", e, t, {
      column_getCanResize: { fn: (n) => Fu(n) },
      column_getIsResizing: { fn: (n) => Nh(n) }
    });
  },
  assignHeaderPrototype: (e, t) => {
    et("columnResizingFeature", e, t, { header_getResizeHandler: { fn: (n, r) => $h(n, r) } });
  },
  constructTableAPIs: (e) => {
    pt("columnResizingFeature", e, {
      table_setColumnResizing: { fn: (t) => er(e, t) },
      table_resetHeaderSizeInfo: { fn: (t) => Wh(e, t) }
    });
  }
}, Gh = {
  getInitialState: (e) => ({
    columnSizing: Th(),
    ...e
  }),
  getDefaultColumnDef: () => Pu(),
  getDefaultTableOptions: (e) => ({ onColumnSizingChange: pr("columnSizing", e) }),
  assignColumnPrototype: (e, t) => {
    et("columnSizingFeature", e, t, {
      column_getSize: {
        fn: (n) => Po(n),
        memoDeps: (n) => {
          var r, o;
          return [t.options.columns, (o = (r = t.atoms.columnSizing) == null ? void 0 : r.get()) == null ? void 0 : o[n.id]];
        }
      },
      column_getStart: { fn: (n, r) => Fh(n, r) },
      column_getAfter: { fn: (n, r) => Hh(n, r) },
      column_resetSize: { fn: (n) => Lh(n) }
    });
  },
  assignHeaderPrototype: (e, t) => {
    et("columnSizingFeature", e, t, {
      header_getSize: {
        fn: (n) => tn(n),
        memoDeps: (n) => {
          var r, o, s;
          return [t.options.columns, n.column.columns.length > 0 ? (r = t.atoms.columnSizing) == null ? void 0 : r.get() : (s = (o = t.atoms.columnSizing) == null ? void 0 : o.get()) == null ? void 0 : s[n.column.id]];
        }
      },
      header_getStart: {
        fn: (n) => Tu(n),
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
        fn: () => ui(e),
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
      table_setColumnSizing: { fn: (t) => Do(e, t) },
      table_resetColumnSizing: { fn: (t) => jh(e, t) },
      table_getTotalSize: {
        fn: () => zh(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.columnSizing) == null ? void 0 : t.get(), e.getHeaderGroups()];
        }
      },
      table_getStartTotalSize: {
        fn: () => Kh(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.columnSizing) == null ? void 0 : t.get(), e.getHeaderGroups()];
        }
      },
      table_getCenterTotalSize: {
        fn: () => Vh(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.columnSizing) == null ? void 0 : t.get(), e.getHeaderGroups()];
        }
      },
      table_getEndTotalSize: {
        fn: () => Bh(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.columnSizing) == null ? void 0 : t.get(), e.getHeaderGroups()];
        }
      }
    });
  }
}, Xh = {
  getInitialState: (e) => ({
    expanded: Tp(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onExpandedChange: pr("expanded", e),
    paginateExpandedRows: !0
  }),
  assignRowPrototype: (e, t) => {
    et("rowExpandingFeature", e, t, {
      row_toggleExpanded: { fn: (n, r) => wu(n, r) },
      row_getIsExpanded: { fn: (n) => Ao(n) },
      row_getCanExpand: { fn: (n) => Yt(n) },
      row_getIsAllParentsExpanded: { fn: (n) => jp(n) },
      row_getToggleExpandedHandler: { fn: (n) => zp(n) }
    });
  },
  constructTableAPIs: (e) => {
    pt("rowExpandingFeature", e, {
      table_autoResetExpanded: { fn: () => gu(e) },
      table_setExpanded: { fn: (t) => uo(e, t) },
      table_toggleAllRowsExpanded: { fn: (t) => pu(e, t) },
      table_resetExpanded: { fn: (t) => hu(e, t) },
      table_getCanSomeRowsExpand: { fn: () => mu(e) },
      table_getToggleAllRowsExpandedHandler: { fn: () => Fp(e) },
      table_getIsSomeRowsExpanded: { fn: () => Hp(e) },
      table_getIsAllRowsExpanded: { fn: () => vu(e) },
      table_getExpandedDepth: { fn: () => Lp(e) }
    });
  }
};
function Yh() {
  return te();
}
function Cn(e, t) {
  var n, r;
  (r = (n = e.options).onRowSelectionChange) == null || r.call(n, t);
}
function Zh(e, t) {
  e._lastSelectedRowId = null, Cn(e, t ? te() : Object.assign(te(), gt(e.initialState.rowSelection ?? {})));
}
function Hu(e, t, n) {
  e._lastSelectedRowId = null, Cn(e, (r) => {
    if (t = typeof t < "u" ? t : !Z(e, "getIsAllRowsSelected", zu), n != null && n.deselectAll && !t) return te();
    const o = Object.assign(te(), r), s = e.getPreGroupedRowModel().flatRows;
    if (t) {
      const l = /* @__PURE__ */ new Map();
      s.forEach((a) => {
        fo(a, l) && (o[a.id] = !0);
      });
    } else s.forEach((l) => {
      At(l) && delete o[l.id];
    });
    return o;
  });
}
function Lu(e, t, n) {
  e._lastSelectedRowId = null, Cn(e, (r) => {
    const o = typeof t < "u" ? t : !Z(e, "getIsAllPageRowsSelected", Ku);
    if (n != null && n.deselectAll && !o) return te();
    const s = Object.assign(te(), r);
    return e.getRowModel().rows.forEach((l) => {
      To(s, l.id, o, !0, e, !0);
    }), s;
  });
}
function Jh(e) {
  return e.getCoreRowModel();
}
function Qh(e) {
  const t = e.getCoreRowModel();
  return Z(e, "getIsSomeRowsSelected", ko) ? di(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: te()
  };
}
function em(e) {
  const t = e.getFilteredRowModel();
  return Z(e, "getIsSomeRowsSelected", ko) ? di(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: te()
  };
}
function tm(e) {
  const t = e.getSortedRowModel();
  return Z(e, "getIsSomeRowsSelected", ko) ? di(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: te()
  };
}
function ju(e) {
  var t;
  return Object.keys(((t = e.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function zu(e) {
  var o;
  const t = e.getFilteredRowModel().flatRows, n = ((o = e.atoms.rowSelection) == null ? void 0 : o.get()) ?? {};
  let r = !!(t.length && Object.keys(n).length);
  if (r) {
    const s = /* @__PURE__ */ new Map();
    t.some((l) => !mr(l, n) && fo(l, s)) && (r = !1);
  }
  return r;
}
function Ku(e) {
  var s;
  const t = e.getPaginatedRowModel().flatRows, n = ((s = e.atoms.rowSelection) == null ? void 0 : s.get()) ?? {}, r = /* @__PURE__ */ new Map();
  let o = !1;
  for (let l = 0; l < t.length; l++) {
    const a = t[l];
    if (mr(a, n))
      !o && fo(a, r) && (o = !0);
    else if (fo(a, r)) return !1;
  }
  return o;
}
function ko(e) {
  return Z(e, "getSelectedRowIds", ju).length > 0;
}
function nm(e) {
  return e.getPaginatedRowModel().flatRows.filter((t) => At(t)).some((t) => ci(t) || Z(t, "getIsSomeSelected", Bu));
}
function rm(e) {
  return (t) => {
    Hu(e, t.target.checked);
  };
}
function om(e) {
  return (t) => {
    Lu(e, t.target.checked);
  };
}
function Vu(e, t, n) {
  const r = ci(e);
  Cn(e.table, (o) => {
    t = typeof t < "u" ? t : !r;
    const s = Object.assign(te(), o);
    return To(s, e.id, t, ((n == null ? void 0 : n.selectChildren) ?? !0) && Xt(e), e.table), !t && (n != null && n.deselectParents) && Nu(s, e), s;
  });
}
function ci(e) {
  var t;
  return mr(e, ((t = e.table.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function Bu(e) {
  return gi(e) === "some";
}
function sm(e) {
  return gi(e) === "all";
}
function At(e) {
  const t = e.table.options;
  return typeof t.enableRowSelection == "function" ? t.enableRowSelection(e) : t.enableRowSelection ?? !0;
}
function fi(e) {
  const t = e.table.options;
  return typeof t.enableSubRowSelection == "function" ? t.enableSubRowSelection(e) : t.enableSubRowSelection ?? !0;
}
function Xt(e) {
  const t = e.table.options;
  return typeof t.enableMultiRowSelection == "function" ? t.enableMultiRowSelection(e) : t.enableMultiRowSelection ?? !0;
}
function im(e, t) {
  const n = At(e);
  return (r) => {
    var u, f;
    if (!n) return;
    const o = r, s = e.table, l = o.target.checked, a = s._lastSelectedRowId;
    (!(s.options.enableRowRangeSelection !== !1 && a !== null && Xt(e) && (((f = (u = s.options).isRowRangeSelectionEvent) == null ? void 0 : f.call(u, r)) ?? !1)) || !lm(e, a, l, t)) && Vu(e, l, t), s._lastSelectedRowId = e.id;
  };
}
function lm(e, t, n, r) {
  const o = (r == null ? void 0 : r.selectChildren) ?? !0, s = e.table, l = s.getRowsInDisplayOrder(), a = s.getPrePaginatedRowModel().rowsById[t] ?? s.getCoreRowModel().rowsById[t];
  if (!a) return !1;
  const u = a.getDisplayIndex(), f = e.getDisplayIndex(), d = l[u], h = l[f];
  if (u < 0 || f < 0 || u >= l.length || f >= l.length || (d == null ? void 0 : d.id) !== a.id || (h == null ? void 0 : h.id) !== e.id || !Xt(a) || !Xt(e)) return !1;
  const w = Math.min(u, f), y = Math.max(u, f);
  return Cn(s, (I) => {
    const E = Object.assign(te(), I);
    for (let A = w; A <= y; A++) {
      const z = l[A];
      !At(z) || !Xt(z) || (To(E, z.id, n, o, s), !n && (r != null && r.deselectParents) && Nu(E, z));
    }
    return E;
  }), !0;
}
function To(e, t, n, r, o, s) {
  const l = o.getRow(t, !0);
  n ? (Xt(l) || Object.keys(e).forEach((a) => delete e[a]), At(l) && (e[t] = !0)) : (!s || At(l)) && delete e[t], r && l.subRows.length && fi(l) && l.subRows.forEach((a) => To(e, a.id, n, r, o, s));
}
function fo(e, t) {
  if (!At(e)) return !1;
  const n = e.table;
  if (n.options.enableSubRowSelection === !0) return !0;
  const r = e.parentId;
  if (r === void 0) return !0;
  const o = t.get(r);
  if (o !== void 0) return o;
  const s = n.getCoreRowModel().rowsById, l = [];
  let a = !0, u = r;
  for (; u !== void 0; ) {
    const f = t.get(u);
    if (f !== void 0) {
      a = f;
      break;
    }
    l.push(u);
    const d = s[u] ?? n.getRow(u, !0);
    if (!fi(d)) {
      a = !1;
      break;
    }
    u = d.parentId;
  }
  return l.forEach((f) => t.set(f, a)), a;
}
function Nu(e, t) {
  const n = t.table.getCoreRowModel().rowsById;
  let r = t.parentId;
  for (; r !== void 0; )
    delete e[r], r = (n[r] ?? t.table.getRow(r, !0)).parentId;
}
function $u(e, t, n, r) {
  const o = [];
  for (let s = 0; s < e.length; s++) {
    const l = e[s], a = mr(l, t);
    if (a && (n.push(l), r[l.id] = l), l.subRows.length) {
      const u = $u(l.subRows, t, n, r);
      if (a) {
        const f = Object.create(Object.getPrototypeOf(l));
        eu(f, l), f.subRows = u, o.push(f);
      }
    } else a && o.push(l);
  }
  return o;
}
function di(e, t) {
  var s;
  const n = [], r = te(), o = ((s = t.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  return {
    rows: $u(e.rows, o, n, r),
    flatRows: n,
    rowsById: r
  };
}
function mr(e, t) {
  return !!(Qt(t, e.id) && t[e.id]);
}
function gi(e) {
  var s;
  if (!e.subRows.length) return !1;
  const t = ((s = e.table.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  let n = !1, r = !0, o = !1;
  for (let l = 0; l < e.subRows.length; l++) {
    const a = e.subRows[l];
    if (n && !r) break;
    if (At(a) && (o = !0, mr(a, t) ? n = !0 : r = !1), a.subRows.length) {
      const u = gi(a);
      u === "all" ? (n = !0, o = !0) : u === "some" ? (n = !0, r = !1, o = !0) : r = !1;
    }
  }
  return o ? r ? "all" : n ? "some" : !1 : !1;
}
const am = {
  initTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  resetTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  getInitialState: (e) => ({
    rowSelection: Yh(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onRowSelectionChange: pr("rowSelection", e),
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
      row_toggleSelected: { fn: (n, r, o) => Vu(n, r, o) },
      row_getIsSelected: { fn: (n) => ci(n) },
      row_getIsSomeSelected: {
        fn: (n) => Bu(n),
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
        fn: (n) => sm(n),
        memoDeps: (n) => {
          var r;
          return [
            n.subRows,
            (r = n.table.atoms.rowSelection) == null ? void 0 : r.get(),
            n.table.options.enableRowSelection
          ];
        }
      },
      row_getCanSelect: { fn: (n) => At(n) },
      row_getCanSelectSubRows: { fn: (n) => fi(n) },
      row_getCanMultiSelect: { fn: (n) => Xt(n) },
      row_getToggleSelectedHandler: { fn: (n, r) => im(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    pt("rowSelectionFeature", e, {
      table_setRowSelection: { fn: (t) => Cn(e, t) },
      table_resetRowSelection: { fn: (t) => Zh(e, t) },
      table_toggleAllRowsSelected: { fn: (t, n) => Hu(e, t, n) },
      table_toggleAllPageRowsSelected: { fn: (t, n) => Lu(e, t, n) },
      table_getPreSelectedRowModel: { fn: () => Jh(e) },
      table_getSelectedRowModel: {
        fn: () => Qh(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getCoreRowModel()];
        }
      },
      table_getFilteredSelectedRowModel: {
        fn: () => em(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getFilteredRowModel()];
        }
      },
      table_getGroupedSelectedRowModel: {
        fn: () => tm(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getSortedRowModel()];
        }
      },
      table_getSelectedRowIds: {
        fn: () => ju(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get()];
        }
      },
      table_getIsAllRowsSelected: {
        fn: () => zu(e),
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
        fn: () => Ku(e),
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
        fn: () => ko(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get()];
        }
      },
      table_getIsSomePageRowsSelected: {
        fn: () => nm(e),
        memoDeps: () => {
          var t;
          return [
            (t = e.atoms.rowSelection) == null ? void 0 : t.get(),
            e.getPaginatedRowModel(),
            e.options.enableRowSelection
          ];
        }
      },
      table_getToggleAllRowsSelectedHandler: { fn: () => rm(e) },
      table_getToggleAllPageRowsSelectedHandler: { fn: () => om(e) }
    });
  }
}, um = {
  getInitialState(e) {
    return {
      sorting: Np(),
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
      onSortingChange: pr("sorting", e),
      isMultiSortEvent: (t) => t.shiftKey
    };
  },
  assignColumnPrototype(e, t) {
    et("rowSortingFeature", e, t, {
      column_getAutoSortFn: { fn: (n) => _u(n) },
      column_getAutoSortDir: { fn: (n) => Su(n) },
      column_getSortFn: { fn: (n) => xu(n) },
      column_toggleSorting: { fn: (n, r, o) => Ru(n, r, o) },
      column_getFirstSortDir: { fn: (n) => Cu(n) },
      column_getNextSortingOrder: { fn: (n, r) => Mu(n, r) },
      column_getCanSort: { fn: (n) => ai(n) },
      column_getCanMultiSort: { fn: (n) => co(n) },
      column_getIsSorted: { fn: (n) => Iu(n) },
      column_getSortIndex: { fn: (n) => Wp(n) },
      column_clearSorting: { fn: (n) => Up(n) },
      column_getToggleSortingHandler: { fn: (n) => qp(n) }
    });
  },
  constructTableAPIs(e) {
    pt("rowSortingFeature", e, {
      table_setSorting: { fn: (t) => Oo(e, t) },
      table_resetSorting: { fn: (t) => bu(e, t) }
    });
  }
};
function cm() {
  return (e) => {
    const t = e;
    return hr({
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
      fn: () => fm(t)
    });
  };
}
function fm(e) {
  var r;
  const t = e.getPreExpandedRowModel(), n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return !t.rows.length || n !== !0 && !Object.keys(n ?? {}).length || !e.options.paginateExpandedRows && !e.options.manualPagination ? t : dm(t);
}
function dm(e) {
  const t = [], n = (r) => {
    t.push(r), r.subRows.length && Ao(r) && r.subRows.forEach(n);
  };
  return e.rows.forEach(n), {
    rows: t,
    flatRows: e.flatRows,
    rowsById: e.rowsById
  };
}
function gm() {
  return (e) => {
    const t = e;
    return hr({
      feature: "rowSortingFeature",
      table: t,
      fnName: "table.getSortedRowModel",
      memoDeps: () => {
        var n;
        return [(n = t.atoms.sorting) == null ? void 0 : n.get(), t.getPreSortedRowModel()];
      },
      fn: () => pm(t),
      onAfterUpdate: nu(() => yu(t))
    });
  };
}
function pm(e) {
  var u;
  const t = e.getPreSortedRowModel(), n = (u = e.atoms.sorting) == null ? void 0 : u.get();
  if (!t.rows.length || !(n != null && n.length)) return t;
  const r = [], o = n.filter((f) => {
    const d = e.getColumn(f.id);
    return d ? ai(d) : !1;
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
      sortFn: xu(h)
    });
  }
  const l = (f, d) => {
    for (let h = 0; h < s.length; h++) {
      const w = s[h], y = w.sortUndefined, I = w.desc;
      let E = 0;
      if (y) {
        const A = f.getValue(w.id), z = d.getValue(w.id), M = A === void 0, O = z === void 0;
        if (M && O) continue;
        if (M || O) {
          if (y === "first") return M ? -1 : 1;
          if (y === "last") return M ? 1 : -1;
          E = M ? y : -y;
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
          eu(A, y), A.subRows = E.rows, d[w] = A, r[I] = A, h = !0;
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
function Rl(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = qt(e[n]);
  return Fs(e, t);
}
function hm(e) {
  return Object.keys(e).map((t) => qt(e[t]));
}
function mm(e) {
  const t = (a, u) => {
    a.setOptions((f) => wl(f, Rl(u)));
  }, n = Tg(), r = Fs(e, { features: {
    coreReactivityFeature: n,
    ...qt(e.features) ?? {}
  } }), o = Fs(Rl(r), { mergeOptions: (a, u) => wl(a, u) }), s = kh(o), l = s;
  return ta() && bf(() => {
    var a;
    return (a = n.unmount) == null ? void 0 : a.call(n);
  }), we(() => hm(r), () => {
    t(s, r);
  }, { immediate: !0 }), we(() => {
    const a = qt(e.state), u = qt(e.atoms);
    if (!a) return [];
    const f = [];
    for (const d of Object.keys(l.initialState))
      !(d in a) || (u == null ? void 0 : u[d]) !== void 0 || f.push(a[d]);
    return f;
  }, (a) => {
    a.length > 0 && t(s, r);
  }, { immediate: !0 }), l.Subscribe = (a) => a.children(l.atoms), l;
}
function ur(e) {
  "@babel/helpers - typeof";
  return ur = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ur(e);
}
function vm(e, t) {
  if (ur(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (ur(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function wm(e) {
  var t = vm(e, "string");
  return ur(t) == "symbol" ? t : t + "";
}
function vr(e, t, n) {
  return (t = wm(t)) in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function ym(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
    if (t.indexOf(r) !== -1) continue;
    n[r] = e[r];
  }
  return n;
}
function bm(e, t) {
  if (e == null) return {};
  var n, r, o = ym(e, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    for (r = 0; r < s.length; r++) n = s[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (o[n] = e[n]);
  }
  return o;
}
function Wu(e, t) {
  var n = Object.keys(e), r = Object.keys(t);
  return n.length !== r.length ? !1 : n.every(function(o) {
    return Object.is(e[o], t[o]);
  });
}
function _m() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Wu, t = null;
  return function(n) {
    return t && e(t.value, n) || (t = {
      value: n
    }), t.value;
  };
}
var Sm = ["block"];
function Cl(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Ml(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Cl(Object(n), !0).forEach(function(r) {
      vr(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Cl(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function xm(e) {
  return {
    x: (e.right + e.left) / 2,
    y: (e.bottom + e.top) / 2
  };
}
function vs(e) {
  var t = e.client, n = e.borderBox, r = n.height / 4;
  return t.y <= n.top + r ? "reorder-above" : t.y >= n.bottom - r ? "reorder-below" : "make-child";
}
function Rm(e) {
  var t = e.element, n = e.input, r = e.currentLevel, o = e.indentPerLevel, s = e.mode, l = {
    x: n.clientX,
    y: n.clientY
  }, a = t.getBoundingClientRect();
  if (s === "standard") {
    var u = vs({
      borderBox: a,
      client: l
    });
    return {
      type: u,
      indentPerLevel: o,
      currentLevel: r
    };
  }
  var f = xm(a);
  if (s === "expanded") {
    var d = vs({
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
    type: vs({
      borderBox: a,
      client: l
    }),
    indentPerLevel: o,
    currentLevel: r
  };
}
function Uu(e, t) {
  return e.type !== t.type ? !1 : e.type === "instruction-blocked" && t.type === "instruction-blocked" ? Uu(e.desired, t.desired) : Wu(e, t);
}
var Cm = _m(Uu);
function Mm(e) {
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
function Im(e, t) {
  var n = t.block, r = bm(t, Sm), o = Rm(r), s = Mm({
    desired: o,
    block: n
  }), l = Cm(s);
  return Ml(Ml({}, e), {}, vr({}, qu, l));
}
function Il(e) {
  var t;
  return (t = e[qu]) !== null && t !== void 0 ? t : null;
}
var qu = Symbol("tree-item-instruction");
function Fo() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return function() {
    t.forEach(function(o) {
      return o();
    });
  };
}
function Em(e) {
  if (Array.isArray(e)) return e;
}
function Am(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r, o, s, l, a = [], u = !0, f = !1;
    try {
      if (s = (n = n.call(e)).next, t !== 0) for (; !(u = (r = s.call(n)).done) && (a.push(r.value), a.length !== t); u = !0) ;
    } catch (d) {
      f = !0, o = d;
    } finally {
      try {
        if (!u && n.return != null && (l = n.return(), Object(l) !== l)) return;
      } finally {
        if (f) throw o;
      }
    }
    return a;
  }
}
function Ks(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Gu(e, t) {
  if (e) {
    if (typeof e == "string") return Ks(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Ks(e, t) : void 0;
  }
}
function Om() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Xu(e, t) {
  return Em(e) || Am(e, t) || Gu(e, t) || Om();
}
var El = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Zt = {}, wr = {};
Object.defineProperty(wr, "__esModule", { value: !0 });
wr.bind = void 0;
function Pm(e, t) {
  var n = t.type, r = t.listener, o = t.options;
  return e.addEventListener(n, r, o), function() {
    e.removeEventListener(n, r, o);
  };
}
wr.bind = Pm;
var Ho = {}, vn = El && El.__assign || function() {
  return vn = Object.assign || function(e) {
    for (var t, n = 1, r = arguments.length; n < r; n++) {
      t = arguments[n];
      for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    }
    return e;
  }, vn.apply(this, arguments);
};
Object.defineProperty(Ho, "__esModule", { value: !0 });
Ho.bindAll = void 0;
var Dm = wr;
function Al(e) {
  if (!(typeof e > "u"))
    return typeof e == "boolean" ? {
      capture: e
    } : e;
}
function km(e, t) {
  if (t == null)
    return e;
  var n = vn(vn({}, e), { options: vn(vn({}, Al(t)), Al(e.options)) });
  return n;
}
function Tm(e, t, n) {
  var r = t.map(function(o) {
    var s = km(o, n);
    return (0, Dm.bind)(e, s);
  });
  return function() {
    r.forEach(function(s) {
      return s();
    });
  };
}
Ho.bindAll = Tm;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.bindAll = e.bind = void 0;
  var t = wr;
  Object.defineProperty(e, "bind", { enumerable: !0, get: function() {
    return t.bind;
  } });
  var n = Ho;
  Object.defineProperty(e, "bindAll", { enumerable: !0, get: function() {
    return n.bindAll;
  } });
})(Zt);
var Yu = "data-pdnd-honey-pot";
function Zu(e) {
  return e instanceof Element && e.hasAttribute(Yu);
}
function Ju(e) {
  var t = document.elementsFromPoint(e.x, e.y), n = Xu(t, 2), r = n[0], o = n[1];
  return r ? Zu(r) ? o ?? null : r : null;
}
var Fm = 2147483647, Hm = {
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
function nn(e) {
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
var ws = nn(function() {
  return typeof HTMLElement < "u" && typeof HTMLElement.prototype.showPopover == "function";
});
function Ol(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Pl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ol(Object(n), !0).forEach(function(r) {
      vr(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ol(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
var cr = 2, Dl = cr / 2;
function Lm(e) {
  return {
    x: Math.floor(e.x),
    y: Math.floor(e.y)
  };
}
function jm(e) {
  return {
    x: e.x - Dl,
    y: e.y - Dl
  };
}
function zm(e) {
  return {
    x: Math.max(e.x, 0),
    y: Math.max(e.y, 0)
  };
}
function Km(e) {
  return {
    x: Math.min(e.x, window.innerWidth - cr),
    y: Math.min(e.y, window.innerHeight - cr)
  };
}
function kl(e) {
  var t = e.client, n = Km(zm(jm(Lm(t))));
  return DOMRect.fromRect({
    x: n.x,
    y: n.y,
    width: cr,
    height: cr
  });
}
function Tl(e) {
  var t = e.clientRect;
  return {
    left: "".concat(t.left, "px"),
    top: "".concat(t.top, "px"),
    width: "".concat(t.width, "px"),
    height: "".concat(t.height, "px")
  };
}
function Vm(e) {
  var t = e.client, n = e.clientRect;
  return (
    // is within horizontal bounds
    t.x >= n.x && t.x <= n.x + n.width && // is within vertical bounds
    t.y >= n.y && t.y <= n.y + n.height
  );
}
function Bm(e) {
  var t = e.initial, n = document.createElement("div");
  n.setAttribute(Yu, "true"), ws() && n.setAttribute("popover", "manual");
  var r = kl({
    client: t
  });
  Object.assign(n.style, Pl(Pl({
    position: "fixed"
  }, ws() ? (
    // needs to come first as it has 'inset: unset' which
    // needs to be overridden by our top / left values
    Hm
  ) : {
    // Fallback: using maximum possible z-index so that this element
    // will always be on top of other positioned content.
    zIndex: Fm
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
  }, Tl({
    clientRect: r
  }))), document.body.appendChild(n), ws() && n.showPopover();
  var o = Zt.bind(window, {
    type: "pointermove",
    listener: function(l) {
      var a = {
        x: l.clientX,
        y: l.clientY
      };
      r = kl({
        client: a
      }), Object.assign(n.style, Tl({
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
    if (o(), Vm({
      client: a,
      clientRect: r
    })) {
      n.remove();
      return;
    }
    function u() {
      f(), n.remove();
    }
    var f = Zt.bindAll(window, [
      {
        type: "pointerdown",
        listener: u
      },
      {
        type: "pointermove",
        listener: u
      },
      {
        type: "focusin",
        listener: u
      },
      {
        type: "focusout",
        listener: u
      },
      // a 'pointerdown' should happen before 'dragstart', but just being super safe
      {
        type: "dragstart",
        listener: u
      },
      // if the user has dragged something out of the window
      // and then is dragging something back into the window
      // the first events we will see are "dragenter" (and then "dragover").
      // So if we see any of these we need to clear the post drag fix.
      {
        type: "dragenter",
        listener: u
      },
      {
        type: "dragover",
        listener: u
      }
      // Not adding a "wheel" event listener, as "wheel" by itself does not
      // resolve the bug.
    ], {
      // Using `capture` so less likely to be impacted by other code stopping events
      capture: !0
    });
  };
}
function Nm() {
  var e = null;
  function t() {
    return e = null, Zt.bind(window, {
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
        var u = a.location.initial.input, f = e ?? {
          x: u.clientX,
          y: u.clientY
        };
        r = Bm({
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
function $m(e) {
  if (Array.isArray(e)) return Ks(e);
}
function Wm(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function Um() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Qu(e) {
  return $m(e) || Wm(e) || Gu(e) || Um();
}
var qm = nn(function() {
  return navigator.userAgent.includes("Firefox");
}), pi = nn(function() {
  var t = navigator, n = t.userAgent;
  return n.includes("AppleWebKit") && !n.includes("Chrome");
});
function Gm(e) {
  return "nodeName" in e;
}
function Xm(e) {
  return Gm(e) && e.ownerDocument !== document;
}
var Vs = {
  isLeavingWindow: Symbol("leaving"),
  isEnteringWindow: Symbol("entering")
};
(function() {
  if (typeof window > "u" || !pi())
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
  Zt.bindAll(
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
        !n.isOverWindow && n.enterCount === 0 && (s[Vs.isEnteringWindow] = !0), n.isOverWindow = !0, n.enterCount++;
      }
    }, {
      type: "dragleave",
      listener: function(s) {
        n.enterCount--, n.isOverWindow && n.enterCount === 0 && (s[Vs.isLeavingWindow] = !0, n.isOverWindow = !1);
      }
    }],
    // using `capture: true` so that adding event listeners
    // in bubble phase will have the correct symbols
    {
      capture: !0
    }
  );
})();
function Ym(e) {
  var t = e.dragLeave;
  return pi() ? t.hasOwnProperty(Vs.isLeavingWindow) : !1;
}
function Zm(e) {
  var t = e.dragLeave, n = t.type, r = t.relatedTarget;
  return n !== "dragleave" ? !1 : pi() ? Ym({
    dragLeave: t
  }) : r == null ? !0 : qm() ? Xm(r) : r instanceof HTMLIFrameElement;
}
function Jm(e) {
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
function tr(e) {
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
var Qm = function(t) {
  var n = [], r = null, o = function() {
    for (var l = arguments.length, a = new Array(l), u = 0; u < l; u++)
      a[u] = arguments[u];
    n = a, !r && (r = requestAnimationFrame(function() {
      r = null, t.apply(void 0, n);
    }));
  };
  return o.cancel = function() {
    r && (cancelAnimationFrame(r), r = null);
  }, o;
}, ys = Qm(function(e) {
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
function ev(e) {
  var t = e.source, n = e.initial, r = e.dispatchEvent, o = {
    dropTargets: []
  };
  function s(a) {
    r(a), o = {
      dropTargets: a.payload.location.current.dropTargets
    };
  }
  var l = {
    start: function(u) {
      var f = u.nativeSetDragImage, d = {
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
    dragUpdate: function(u) {
      var f = u.current;
      qr.flush(), ys.cancel(), s({
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
    drag: function(u) {
      var f = u.current;
      ys(function() {
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
    drop: function(u) {
      var f = u.current, d = u.updatedSourcePayload;
      qr.flush(), ys.cancel(), s({
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
var Bs = {
  isActive: !1
};
function ec() {
  return !Bs.isActive;
}
function tv(e) {
  return e.dataTransfer ? e.dataTransfer.setDragImage.bind(e.dataTransfer) : null;
}
function nv(e) {
  var t = e.current, n = e.next;
  if (t.length !== n.length)
    return !0;
  for (var r = 0; r < t.length; r++)
    if (t[r].element !== n[r].element)
      return !0;
  return !1;
}
function rv(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = e.dispatchEvent;
  if (!ec())
    return;
  var s = ov({
    event: t,
    dragType: n,
    getDropTargetsOver: r
  });
  Bs.isActive = !0;
  var l = {
    current: s
  };
  bs({
    event: t,
    current: s.dropTargets
  });
  var a = ev({
    source: n.payload,
    dispatchEvent: o,
    initial: s
  });
  function u(y) {
    var I = nv({
      current: l.current.dropTargets,
      next: y.dropTargets
    });
    l.current = y, I && a.dragUpdate({
      current: l.current
    });
  }
  function f(y) {
    var I = tr(y), E = Zu(y.target) ? Ju({
      x: I.clientX,
      y: I.clientY
    }) : y.target, A = r({
      target: E,
      input: I,
      source: n.payload,
      current: l.current.dropTargets
    });
    A.length && (y.preventDefault(), bs({
      event: y,
      current: A
    })), u({
      dropTargets: A,
      input: I
    });
  }
  function d() {
    l.current.dropTargets.length && u({
      dropTargets: [],
      input: l.current.input
    }), a.drop({
      current: l.current,
      updatedSourcePayload: null
    }), h();
  }
  function h() {
    Bs.isActive = !1, w();
  }
  var w = Zt.bindAll(
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
        Zm({
          dragLeave: I
        }) && (u({
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
          input: tr(I)
        }, !l.current.dropTargets.length) {
          d();
          return;
        }
        I.preventDefault(), bs({
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
          input: tr(I)
        }, d();
      }
    }].concat(Qu(Jm({
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
    nativeSetDragImage: tv(t)
  });
}
function bs(e) {
  var t, n = e.event, r = e.current, o = (t = r[0]) === null || t === void 0 ? void 0 : t.dropEffect;
  o != null && n.dataTransfer && (n.dataTransfer.dropEffect = o);
}
function ov(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = tr(t);
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
var Fl = {
  canStart: ec,
  start: rv
}, Ns = /* @__PURE__ */ new Map();
function sv(e) {
  var t = e.typeKey, n = e.mount, r = Ns.get(t);
  if (r)
    return r.usageCount++, r;
  var o = {
    typeKey: t,
    unmount: n(),
    usageCount: 1
  };
  return Ns.set(t, o), o;
}
function iv(e) {
  var t = sv(e);
  return function() {
    t.usageCount--, !(t.usageCount > 0) && (t.unmount(), Ns.delete(e.typeKey));
  };
}
function tc(e, t) {
  var n = t.attribute, r = t.value;
  return e.setAttribute(n, r), function() {
    return e.removeAttribute(n);
  };
}
function Hl(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Tt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Hl(Object(n), !0).forEach(function(r) {
      vr(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Hl(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function _s(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = lv(e)) || t) {
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
function lv(e, t) {
  if (e) {
    if (typeof e == "string") return Ll(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Ll(e, t) : void 0;
  }
}
function Ll(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Ss(e) {
  return e.slice(0).reverse();
}
function av(e) {
  var t = e.typeKey, n = e.defaultDropEffect, r = /* @__PURE__ */ new WeakMap(), o = "data-drop-target-for-".concat(t), s = "[".concat(o, "]");
  function l(y) {
    return r.set(y.element, y), function() {
      return r.delete(y.element);
    };
  }
  function a(y) {
    var I = Fo(tc(y.element, {
      attribute: o,
      value: "true"
    }), l(y));
    return nn(I);
  }
  function u(y) {
    var I, E, A, z, M = y.source, O = y.target, _ = y.input, D = y.result, j = D === void 0 ? [] : D;
    if (O == null)
      return j;
    if (!(O instanceof Element))
      return O instanceof Node ? u({
        source: M,
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
      source: M,
      element: K.element
    };
    if (K.canDrop && !K.canDrop(L))
      return u({
        source: M,
        target: K.element.parentElement,
        input: _,
        result: j
      });
    var ee = (I = (E = K.getData) === null || E === void 0 ? void 0 : E.call(K, L)) !== null && I !== void 0 ? I : {}, ue = (A = (z = K.getDropEffect) === null || z === void 0 ? void 0 : z.call(K, L)) !== null && A !== void 0 ? A : n, Y = {
      data: ee,
      element: K.element,
      dropEffect: ue,
      // we are collecting _actual_ drop targets, so these are
      // being applied _not_ due to stickiness
      isActiveDueToStickiness: !1
    };
    return u({
      source: M,
      target: K.element.parentElement,
      input: _,
      // Using bubble ordering. Same ordering as `event.getPath()`
      result: [].concat(Qu(j), [Y])
    });
  }
  function f(y) {
    var I = y.eventName, E = y.payload, A = _s(E.location.current.dropTargets), z;
    try {
      for (A.s(); !(z = A.n()).done; ) {
        var M, O = z.value, _ = r.get(O.element), D = Tt(Tt({}, E), {}, {
          self: O
        });
        _ == null || (M = _[I]) === null || M === void 0 || M.call(
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
      })), z = /* @__PURE__ */ new Set(), M = _s(E.location.previous.dropTargets), O;
      try {
        for (M.s(); !(O = M.n()).done; ) {
          var _, D = O.value;
          z.add(D.element);
          var j = r.get(D.element), U = A.has(D.element), K = Tt(Tt({}, E), {}, {
            self: D
          });
          if (j == null || (_ = j.onDropTargetChange) === null || _ === void 0 || _.call(j, K), !U) {
            var L;
            j == null || (L = j.onDragLeave) === null || L === void 0 || L.call(j, K);
          }
        }
      } catch (J) {
        M.e(J);
      } finally {
        M.f();
      }
      var ee = _s(E.location.current.dropTargets), ue;
      try {
        for (ee.s(); !(ue = ee.n()).done; ) {
          var Y, me, Me = ue.value;
          if (!z.has(Me.element)) {
            var ye = Tt(Tt({}, E), {}, {
              self: Me
            }), G = r.get(Me.element);
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
    var I = y.source, E = y.target, A = y.input, z = y.current, M = u({
      source: I,
      target: E,
      input: A
    });
    if (M.length >= z.length)
      return M;
    for (var O = Ss(z), _ = Ss(M), D = [], j = 0; j < O.length; j++) {
      var U, K = O[j], L = _[j];
      if (L != null) {
        D.push(L);
        continue;
      }
      var ee = D[j - 1], ue = O[j - 1];
      if ((ee == null ? void 0 : ee.element) !== (ue == null ? void 0 : ue.element))
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
      D.push(Tt(Tt({}, K), {}, {
        // making it clear to consumers this drop target is active due to stickiness
        isActiveDueToStickiness: !0
      }));
    }
    return Ss(D);
  }
  return {
    dropTargetForConsumers: a,
    getIsOver: w,
    dispatchEvent: h
  };
}
function uv(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = cv(e)) || t) {
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
function cv(e, t) {
  if (e) {
    if (typeof e == "string") return jl(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? jl(e, t) : void 0;
  }
}
function jl(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function zl(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function fv(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? zl(Object(n), !0).forEach(function(r) {
      vr(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : zl(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function dv() {
  var e = /* @__PURE__ */ new Set(), t = null;
  function n(s) {
    t && (!s.canMonitor || s.canMonitor(t.canMonitorArgs)) && t.active.add(s);
  }
  function r(s) {
    var l = fv({}, s);
    e.add(l), n(l);
    function a() {
      e.delete(l), t && t.active.delete(l);
    }
    return nn(a);
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
      var u = uv(e), f;
      try {
        for (u.s(); !(f = u.n()).done; ) {
          var d = f.value;
          n(d);
        }
      } catch (A) {
        u.e(A);
      } finally {
        u.f();
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
function gv(e) {
  var t = e.typeKey, n = e.mount, r = e.dispatchEventToSource, o = e.onPostDispatch, s = e.defaultDropEffect, l = dv(), a = av({
    typeKey: t,
    defaultDropEffect: s
  });
  function u(h) {
    r == null || r(h), a.dispatchEvent(h), l.dispatchEvent(h), o == null || o(h);
  }
  function f(h) {
    var w = h.event, y = h.dragType;
    Fl.start({
      event: w,
      dragType: y,
      getDropTargetsOver: a.getIsOver,
      dispatchEvent: u
    });
  }
  function d() {
    function h() {
      var w = {
        canStart: Fl.canStart,
        start: f
      };
      return n(w);
    }
    return iv({
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
var pv = nn(function() {
  return navigator.userAgent.toLocaleLowerCase().includes("android");
}), hv = "pdnd:android-fallback", Kl = "text/plain", mv = "text/uri-list", vv = "application/vnd.pdnd", go = /* @__PURE__ */ new WeakMap();
function wv(e) {
  return go.set(e.element, e), function() {
    go.delete(e.element);
  };
}
var Vl = Nm(), nc = gv({
  typeKey: "element",
  defaultDropEffect: "move",
  mount: function(t) {
    return Fo(Vl.bindEvents(), Zt.bind(document, {
      type: "dragstart",
      listener: function(r) {
        var o, s, l, a, u, f;
        if (t.canStart(r) && !r.defaultPrevented && r.dataTransfer) {
          var d = r.target;
          if (d instanceof HTMLElement) {
            var h = go.get(d);
            if (h) {
              var w = tr(r), y = {
                element: h.element,
                dragHandle: (o = h.dragHandle) !== null && o !== void 0 ? o : null,
                input: w
              };
              if (h.canDrag && !h.canDrag(y)) {
                r.preventDefault();
                return;
              }
              if (h.dragHandle) {
                var I = Ju({
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
                  var M = Xu(z[A], 2), O = M[0], _ = M[1];
                  r.dataTransfer.setData(O, _ ?? "");
                }
              pv() && !r.dataTransfer.types.includes(Kl) && !r.dataTransfer.types.includes(mv) && r.dataTransfer.setData(Kl, hv), r.dataTransfer.setData(vv, "");
              var D = {
                element: h.element,
                dragHandle: (a = h.dragHandle) !== null && a !== void 0 ? a : null,
                data: (u = (f = h.getInitialData) === null || f === void 0 ? void 0 : f.call(h, y)) !== null && u !== void 0 ? u : {}
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
    (n = go.get(s.source.element)) === null || n === void 0 || (r = n[o]) === null || r === void 0 || r.call(
      n,
      // I cannot seem to get the types right here.
      // TS doesn't seem to like that one event can need `nativeSetDragImage`
      // @ts-expect-error
      s
    );
  },
  onPostDispatch: Vl.getOnPostDispatch()
}), yv = nc.dropTarget;
function bv(e) {
  var t = Fo(
    // making the draggable register the adapter rather than drop targets
    // this is because you *must* have a draggable element to start a drag
    // but you _might_ not have any drop targets immediately
    // (You might create drop targets async)
    nc.registerUsage(),
    wv(e),
    tc(e.element, {
      attribute: "draggable",
      value: "true"
    })
  );
  return nn(t);
}
const xs = /* @__PURE__ */ new Map(), _n = "pnl-tst-row";
function _v(e, t) {
  return Fo(
    bv({
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
        return { type: _n, group: "", sourceId: "", key: null, keys: [] };
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
    yv({
      element: e,
      // Position is deliberately not consulted here. pdnd settles `canDrop` when
      // the pointer enters the element, and the element is the whole layout, so an
      // answer given from the pointer's first position would stand for the rest of
      // the drag. Which pane the pointer is over, and whether that pane accepts
      // the drag at all, is decided in `getData`, which runs on every move.
      canDrop: ({ source: n }) => n.data.type === _n,
      getData: ({ input: n, source: r }) => {
        for (const o of t.panes) {
          const s = o.dropData(n, r.data);
          if (s) return s;
        }
        return { type: _n, key: null, paneId: "" };
      },
      onDrag: ({ self: n }) => {
        const r = n.data.key, o = Il(n.data);
        for (const s of t.panes)
          s.id() === n.data.paneId && r && o ? s.showDrop(r, o) : s.clearDrop();
      },
      onDragLeave: () => {
        for (const n of t.panes) n.clearDrop();
      },
      onDrop: ({ self: n, source: r, location: o }) => {
        for (const u of t.panes) u.clearDrop();
        const s = t.panes.find((u) => u.id() === n.data.paneId), l = n.data.key, a = Il(n.data);
        !s || !l || !a || a.type === "instruction-blocked" || s.drop(r.data, l, a, o.current.input);
      }
    })
  );
}
function Sv(e, t) {
  let n = xs.get(e);
  return n || (n = { panes: [] }, n.cleanup = _v(e, n), xs.set(e, n)), n.panes.push(t), () => {
    var r;
    n.panes = n.panes.filter((o) => o !== t), !(n.panes.length > 0) && ((r = n.cleanup) == null || r.call(n), xs.delete(e));
  };
}
const xv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ef5350" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m6 10h-4v8a4 4 0 1 1-4-4 3.96 3.96 0 0 1 2 .555V8h6Z"/></svg>', Rv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#ff7043" d="M2 2a1 1 0 0 0-1 1v10c0 .554.446 1 1 1h12c.554 0 1-.446 1-1V3a1 1 0 0 0-1-1zm0 3h12v8H2zm1 2 2 2-2 2 1 1 3-3-3-3zm5 3.5V12h5v-1.5z"/></svg>', Cv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#7e57c2" d="M20 18h-2v-2h-2v2c0 .193 0 .703 1.254 1.033A3.345 3.345 0 0 1 20 22h2v2h2v-2c0-.388-.562-.851-1.254-1.034C20.356 20.34 20 18.84 20 18m-3.254 2.966C14.356 20.34 14 18.84 14 18h-2v-2h-2v8h2v-2h4v2h2v-2c0-.388-.562-.851-1.254-1.034"/><path fill="#7e57c2" d="M24 4H4v20a4 4 0 0 0 4 4h16.16A3.84 3.84 0 0 0 28 24.16V8a4 4 0 0 0-4-4m2 14h-2v-2h-2v2c0 .193 0 .703 1.254 1.033A3.345 3.345 0 0 1 26 22v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1 2-2h2a2 2 0 0 1 2 2Z"/></svg>', Mv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ffca28" d="M16 24c-5.525 0-10-.9-10-2v4c0 1.1 4.475 2 10 2s10-.9 10-2v-4c0 1.1-4.475 2-10 2m0-8c-5.525 0-10-.9-10-2v4c0 1.1 4.475 2 10 2s10-.9 10-2v-4c0 1.1-4.475 2-10 2m0-12C10.477 4 6 4.895 6 6v4c0 1.1 4.475 2 10 2s10-.9 10-2V6c0-1.105-4.477-2-10-2"/></svg>', Iv = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/><path fill="#42a5f5" d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5z"/></svg>', Ev = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m8.668 6h3.6641l-3.6641-3.668v3.668m-4.668-4.668h5.332l4 4v8c0 0.73828-0.59375 1.3359-1.332 1.3359h-8c-0.73828 0-1.332-0.59766-1.332-1.3359v-10.664c0-0.74219 0.59375-1.3359 1.332-1.3359m3.332 1.3359h-3.332v10.664h8v-6h-4.668z" fill="#90a4ae" /></svg>', Av = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m6.922 3.768-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232" fill="#90a4ae" /></svg>', Ov = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.483 6H4.721a1 1 0 0 0-.949.684L2 12V5h12a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232l-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h11l2.403-5.606A1 1 0 0 0 14.483 6" fill="#90a4ae" /></svg>', Pv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#e65100" d="m4 4 2 22 10 2 10-2 2-22Zm19.72 7H11.28l.29 3h11.86l-.802 9.335L15.99 25l-6.635-1.646L8.93 19h3.02l.19 2 3.86.77 3.84-.77.29-4H8.84L8 8h16Z"/></svg>', Dv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#26a69a" d="M8.5 6h4l-4-4zM3.875 1H9.5l4 4v8.6c0 .773-.616 1.4-1.375 1.4h-8.25c-.76 0-1.375-.627-1.375-1.4V2.4c0-.777.612-1.4 1.375-1.4M4 13.6h8V8l-2.625 2.8L8 9.4zm1.25-7.7c-.76 0-1.375.627-1.375 1.4s.616 1.4 1.375 1.4c.76 0 1.375-.627 1.375-1.4S6.009 5.9 5.25 5.9"/></svg>', kv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#ffca28" d="M2 2v12h12V2zm6 6h1v4a1.003 1.003 0 0 1-1 1H7a1.003 1.003 0 0 1-1-1v-1h1v1h1zm3 0h2v1h-2v1h1a1.003 1.003 0 0 1 1 1v1a1.003 1.003 0 0 1-1 1h-2v-1h2v-1h-1a1.003 1.003 0 0 1-1-1V9a1.003 1.003 0 0 1 1-1"/></svg>', Tv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path fill="#f9a825" d="M560-160v-80h120q17 0 28.5-11.5T720-280v-80q0-38 22-69t58-44v-14q-36-13-58-44t-22-69v-80q0-17-11.5-28.5T680-720H560v-80h120q50 0 85 35t35 85v80q0 17 11.5 28.5T840-560h40v160h-40q-17 0-28.5 11.5T800-360v80q0 50-35 85t-85 35zm-280 0q-50 0-85-35t-35-85v-80q0-17-11.5-28.5T120-400H80v-160h40q17 0 28.5-11.5T160-600v-80q0-50 35-85t85-35h120v80H280q-17 0-28.5 11.5T240-680v80q0 38-22 69t-58 44v14q36 13 58 44t22 69v80q0 17 11.5 28.5T280-240h120v80z"/></svg>', Fv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#42a5f5" d="m14 10-4 3.5L6 10H4v12h4v-6l2 2 2-2v6h4V10zm12 6v-6h-4v6h-4l6 8 6-8z"/></svg>', Hv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ef5350" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m4.93 10.44c.41.9.93 1.64 1.53 2.15l.41.32c-.87.16-2.07.44-3.34.93l-.11.04.5-1.04c.45-.87.78-1.66 1.01-2.4m6.48 3.81c.18-.18.27-.41.28-.66.03-.2-.02-.39-.12-.55-.29-.47-1.04-.69-2.28-.69l-1.29.07-.87-.58c-.63-.52-1.2-1.43-1.6-2.56l.04-.14c.33-1.33.64-2.94-.02-3.6a.85.85 0 0 0-.61-.24h-.24c-.37 0-.7.39-.79.77-.37 1.33-.15 2.06.22 3.27v.01c-.25.88-.57 1.9-1.08 2.93l-.96 1.8-.89.49c-1.2.75-1.77 1.59-1.88 2.12-.04.19-.02.36.05.54l.03.05.48.31.44.11c.81 0 1.73-.95 2.97-3.07l.18-.07c1.03-.33 2.31-.56 4.03-.75 1.03.51 2.24.74 3 .74.44 0 .74-.11.91-.3m-.41-.71.09.11c-.01.1-.04.11-.09.13h-.04l-.19.02c-.46 0-1.17-.19-1.9-.51.09-.1.13-.1.23-.1 1.4 0 1.8.25 1.9.35M7.83 17c-.65 1.19-1.24 1.85-1.69 2 .05-.38.5-1.04 1.21-1.69zm3.02-6.91c-.23-.9-.24-1.63-.07-2.05l.07-.12.15.05c.17.24.19.56.09 1.1l-.03.16-.16.82z"/></svg>', Lv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#e64a19" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zM8 11v2h1v6H8v1h4v-1h-1v-2h2a3 3 0 0 0 3-3 3 3 0 0 0-3-3zm5 2a1 1 0 0 1 1 1 1 1 0 0 1-1 1h-2v-2z"/></svg>', jv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#0288d1" d="M9.86 2A2.86 2.86 0 0 0 7 4.86v1.68h4.29c.39 0 .71.57.71.96H4.86A2.86 2.86 0 0 0 2 10.36v3.781a2.86 2.86 0 0 0 2.86 2.86h1.18v-2.68a2.85 2.85 0 0 1 2.85-2.86h5.25c1.58 0 2.86-1.271 2.86-2.851V4.86A2.86 2.86 0 0 0 14.14 2zm-.72 1.61c.4 0 .72.12.72.71s-.32.891-.72.891c-.39 0-.71-.3-.71-.89s.32-.711.71-.711"/><path fill="#fdd835" d="M17.959 7v2.68a2.85 2.85 0 0 1-2.85 2.859H9.86A2.85 2.85 0 0 0 7 15.389v3.75a2.86 2.86 0 0 0 2.86 2.86h4.28A2.86 2.86 0 0 0 17 19.14v-1.68h-4.291c-.39 0-.709-.57-.709-.96h7.14A2.86 2.86 0 0 0 22 13.64V9.86A2.86 2.86 0 0 0 19.14 7zM8.32 11.513l-.004.004.038-.004zm6.54 7.276c.39 0 .71.3.71.89a.71.71 0 0 1-.71.71c-.4 0-.72-.12-.72-.71s.32-.89.72-.89"/></svg>', zv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#8bc34a" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zm4 7.5h-4v2h1l-2 1.67L10 13h1v-2H7v2h1l3 2.5L8 18H7v2h4v-2h-1l2-1.67L14 18h-1v2h4v-2h-1l-3-2.5 3-2.5h1z"/></svg>', Kv = '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 16 16"><path fill="#0288d1" d="M2 2v12h12V2zm4 6h3v1H8v4H7V9H6zm5 0h2v1h-2v1h1a1.003 1.003 0 0 1 1 1v1a1.003 1.003 0 0 1-1 1h-2v-1h2v-1h-1a1.003 1.003 0 0 1-1-1V9a1.003 1.003 0 0 1 1-1"/></svg>', Vv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ff9800" d="m24 6 2 6h-4l-2-6h-3l2 6h-4l-2-6h-3l2 6H8L6 6H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3V6Z"/></svg>', Bv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#01579b" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zM7 13l1.5 7h2l1.5-3 1.5 3h2l1.5-7h1v-2h-4v2h1l-.9 4.2L13 15h-2l-1.1 2.2L9 13h1v-2H6v2z"/></svg>', Nv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#8bc34a" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m.12 13.5 3.74 3.74 1.42-1.41-2.33-2.33 2.33-2.33-1.42-1.41zm11.16 0-3.74-3.74-1.42 1.41 2.33 2.33-2.33 2.33 1.42 1.41z"/></svg>', $v = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ff5252" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2m12 16v-2H9v2zm-4-4v-2H6v2z"/></svg>', Wv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#afb42b" d="M14 17h-2v-2h-2v-2h2v2h2m0-6h-2v2h2v2h-2v-2h-2V9h2V7h-2V5h2v2h2m5-4H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2"/></svg>', Bl = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, Nl = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, Uv = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, qv = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, Gv = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, Xv = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, Yv = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, Zv = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, Jv = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, Qv = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, e0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, t0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, n0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, r0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, o0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, s0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, i0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, l0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, a0 = ["aria-label"], u0 = {
  key: 0,
  class: "pnl-tst-tsep",
  "aria-hidden": "true"
}, c0 = {
  key: 1,
  class: "pnl-tst-search"
}, f0 = ["innerHTML"], d0 = ["value", "aria-label", "placeholder"], g0 = ["aria-label", "aria-keyshortcuts", "aria-disabled", "title", "tabindex", "onClick", "onFocus"], p0 = ["innerHTML"], h0 = {
  key: 1,
  class: "pnl-tst-empty"
}, m0 = ["aria-label", "aria-colcount", "aria-rowcount"], v0 = {
  class: "pnl-tst-hrow",
  role: "row",
  "aria-rowindex": 1
}, w0 = ["aria-colindex", "aria-sort", "aria-keyshortcuts", "tabindex", "onClick", "onFocus", "onKeydown"], y0 = { class: "pnl-tst-hlabel" }, b0 = ["innerHTML"], _0 = ["onDblclick", "onMousedown", "onTouchstart"], S0 = ["aria-level", "aria-posinset", "aria-setsize", "aria-rowindex", "aria-expanded", "aria-busy", "aria-selected", "aria-haspopup", "tabindex", "onClick", "onContextmenu", "onFocus"], x0 = ["aria-colindex"], R0 = ["onClick"], C0 = {
  key: 1,
  class: "pnl-tst-twisty pnl-tst-twisty--leaf",
  "aria-hidden": "true"
}, M0 = ["checked", ".indeterminate", "aria-label", "onClick"], I0 = ["innerHTML"], E0 = ["value", "aria-label", "onKeydown", "onBlur"], A0 = {
  key: 2,
  class: "pnl-tst-value"
}, O0 = {
  key: 3,
  class: "pnl-tst-modal"
}, P0 = {
  id: "pnl-tst-confirm-message",
  class: "pnl-tst-dialog-message"
}, D0 = { class: "pnl-tst-dialog-actions" }, k0 = ["aria-label"], T0 = {
  key: 0,
  class: "pnl-tst-msep",
  role: "separator"
}, F0 = ["aria-keyshortcuts", "aria-disabled", "tabindex", "onClick", "onFocus"], H0 = ["innerHTML"], L0 = { class: "pnl-tst-mlabel" }, j0 = {
  key: 0,
  class: "pnl-tst-mkeys",
  "aria-hidden": "true"
}, z0 = "title", $l = 16, Wl = 6, K0 = 40, Wn = "search", Ft = "|", hn = 4, V0 = 500, B0 = {
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
      columnSizingFeature: Gh,
      columnResizingFeature: qh,
      rowExpandingFeature: Xh,
      rowSelectionFeature: am,
      rowSortingFeature: um,
      coreRowModel: Eu(),
      expandedRowModel: cm(),
      sortedRowModel: gm(),
      sortFns: { alphanumeric: Mp, text: Ip }
    }, r = $(() => (t.state.columns || []).length > 0), o = $(() => r.value && t.state.options.sortable !== !1), s = $(() => t.state.options.sort_folders_first === !0), l = $(() => r.value && t.state.options.resizable !== !1), a = $(() => {
      const i = t.state.columns || [];
      return i.length === 0 ? [{ id: z0, header: "", accessorFn: (c) => c.title }] : i.map((c) => {
        const g = c.field ?? c.id;
        return {
          id: c.id,
          header: c.header ?? c.id,
          accessorFn: (v) => v[g],
          enableSorting: c.sortable !== !1,
          enableResizing: c.resizable !== !1,
          // Written only where Python actually declared one, so the rest fall back to
          // TanStack's own defaults (150 wide, no narrower than 20) rather than to a
          // second set of numbers kept here.
          ...u("size", c.width),
          ...u("minSize", c.min_width),
          ...u("maxSize", c.max_width),
          // Only set when asked for, so an ordinary table keeps TanStack's own
          // detection of what a column holds rather than routing through ours.
          ...s.value ? { sortFn: h } : {}
        };
      });
    });
    function u(i, c) {
      return typeof c == "number" && Number.isFinite(c) ? { [i]: c } : {};
    }
    function f(i, c) {
      const g = i == null ? void 0 : i[c];
      if (g !== void 0) return g;
      const v = (t.state.types || {})[i == null ? void 0 : i.type];
      return v && typeof v == "object" ? v[c] : void 0;
    }
    function d(i) {
      return i.subRows.length > 0 || f(i.original, "allow_children") !== !1;
    }
    function h(i, c, g) {
      const v = d(i);
      if (v !== d(c)) {
        const k = K.value.some((B) => B.id === g && B.desc);
        return (v ? -1 : 1) * (k ? -1 : 1);
      }
      return G.getColumn(g).getAutoSortFn()(i, c, g);
    }
    const w = /* @__PURE__ */ ne(y(t.state.expandedKeys));
    function y(i) {
      const c = {};
      for (const g of i || []) c[g] = !0;
      return c;
    }
    function I(i) {
      return i === !0 ? G.getCoreRowModel().flatRows.filter((c) => c.subRows.length > 0).map((c) => c.id).sort() : Object.keys(i).filter((c) => i[c]).sort();
    }
    const E = {
      audio: xv,
      console: Rv,
      css: Cv,
      database: Mv,
      document: Iv,
      file: Ev,
      folder: Av,
      "folder-open": Ov,
      html: Pv,
      image: Dv,
      javascript: kv,
      json: Tv,
      markdown: Fv,
      pdf: Hv,
      powerpoint: Lv,
      python: jv,
      table: zv,
      typescript: Kv,
      video: Vv,
      word: Bv,
      xml: Nv,
      yaml: $v,
      zip: Wv
    };
    function A(i) {
      return i ? { ...E, ...t.state.icons || {} }[i] ?? null : null;
    }
    function z(i) {
      const c = f(i.original, "icon");
      return c ? (xe(i) ? A(`${c}-open`) : null) ?? A(c) : null;
    }
    function M(i, c) {
      return i.length !== c.length ? !1 : i.every((g, v) => g === c[v]);
    }
    const O = $(() => t.state.options.select_mode ?? "none"), _ = $(() => O.value !== "none"), D = $(() => O.value === "hierarchy"), j = $(
      () => _.value && t.state.options.show_checkboxes !== !1
    ), U = /* @__PURE__ */ ne(y(t.state.selectedKeys)), K = /* @__PURE__ */ ne(L(t.state.sorting));
    function L(i) {
      return (i || []).filter((c) => c && c.id).map((c) => ({ id: String(c.id), desc: c.desc === !0 }));
    }
    function ee(i, c) {
      return i.length === c.length && i.every((g, v) => g.id === c[v].id && g.desc === c[v].desc);
    }
    const ue = $(() => o.value && K.value.length > 0), Y = /* @__PURE__ */ ne(me(t.state.columnWidths));
    function me(i) {
      const c = {};
      for (const [g, v] of Object.entries(i || {})) {
        const k = Math.round(Number(v));
        Number.isFinite(k) && k > 0 && (c[g] = k);
      }
      return c;
    }
    function Me(i, c) {
      const g = Object.keys(i);
      return g.length === Object.keys(c).length && g.every((v) => i[v] === c[v]);
    }
    const ye = /* @__PURE__ */ ne(null), G = mm({
      features: n,
      data: $(() => t.state.source || []),
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
      enableMultiRowSelection: $(() => O.value !== "single"),
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
      state: $(() => ({
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
      const c = i.subRows.map(J);
      return c.every((g) => g === "all") ? "all" : c.some((g) => g !== "none") ? "some" : "none";
    }
    we(() => I(U.value), t.setSelectedKeys, { flush: "post" }), we(() => I(w.value), t.setExpandedKeys, { flush: "post" }), we(
      () => t.state.expandedKeys,
      (i) => {
        M(I(w.value), [...i || []].sort()) || (w.value = y(i));
      }
    ), we(
      () => t.state.selectedKeys,
      (i) => {
        M(I(U.value), [...i || []].sort()) || (U.value = y(i));
      }
    ), we(() => K.value, t.setSorting, { flush: "post" }), we(
      () => t.state.sorting,
      (i) => {
        const c = L(i);
        ee(K.value, c) || (K.value = c);
      }
    ), we(
      () => [Y.value, ye.value],
      ([i, c]) => {
        c || t.setColumnWidths(i);
      },
      { flush: "post" }
    ), we(
      () => t.state.columnWidths,
      (i) => {
        const c = me(i);
        Me(Y.value, c) || (Y.value = c);
      }
    ), we(
      () => [t.state.options.expand_all, t.state.source],
      ([i]) => {
        i && G.toggleAllRowsExpanded(!0);
      },
      { immediate: !0 }
    );
    const ce = $(() => (t.state.filterText ?? "").trim().toLowerCase()), Ie = $(() => ce.value.length > 0), Pt = /* @__PURE__ */ ne(t.state.filterText ?? "");
    we(
      () => t.state.filterText,
      (i) => {
        Pt.value = i ?? "";
      }
    );
    function ht(i) {
      Pt.value = i, t.setFilterText(i);
    }
    function Ke(i) {
      return i.getAllCells().some((c) => String(c.getValue() ?? "").toLowerCase().includes(ce.value));
    }
    const fe = $(() => {
      if (!Ie.value) return G.getRowModel().rows;
      const i = G.getSortedRowModel().flatRows, c = /* @__PURE__ */ new Set();
      for (const g of i)
        if (Ke(g)) {
          c.add(g.id);
          for (let v = g.getParentRow(); v; v = v.getParentRow()) c.add(v.id);
        }
      return i.filter((g) => c.has(g.id));
    }), Ue = $(() => {
      var i;
      return ((i = G.getHeaderGroups()[0]) == null ? void 0 : i.headers) ?? [];
    }), Mn = $(() => t.state.options.indent_px ?? 16), Kt = $(() => t.state.options.aria_label ?? "Tree table"), rn = $(() => Ie.value ? "No matches" : "No data"), In = $(() => r.value ? 2 : 1), yr = $(() => fe.value.length + (r.value ? 1 : 0)), qe = /* @__PURE__ */ ne(!1), En = /* @__PURE__ */ ne(null), p = /* @__PURE__ */ new Map();
    function m(i, c) {
      c ? p.set(i, c) : p.delete(i);
    }
    const b = $(() => {
      const i = Ue.value;
      return i.length === 0 ? null : i.some((g) => g.column.id === En.value) ? En.value : i[0].column.id;
    });
    function R(i) {
      const c = Ue.value;
      if (c.length === 0) return;
      const g = c[Math.max(0, Math.min(i, c.length - 1))];
      qe.value = !0, En.value = g.column.id, je(() => {
        var v;
        return (v = p.get(g.column.id)) == null ? void 0 : v.focus();
      });
    }
    function C() {
      const i = Ue.value;
      R(i.findIndex((c) => c.column.id === b.value));
    }
    function S() {
      qe.value = !1, zo(an.value);
    }
    function F(i) {
      return o.value && i.column.getCanSort();
    }
    function T(i) {
      if (!F(i)) return;
      const c = i.column.getIsSorted();
      return c === "asc" ? "ascending" : c === "desc" ? "descending" : "none";
    }
    function P(i) {
      if (!F(i)) return null;
      const c = i.column.getIsSorted();
      return c ? c === "asc" ? Nl : Bl : null;
    }
    function x(i) {
      F(i) && i.column.toggleSorting();
    }
    function N(i) {
      R(Ue.value.indexOf(i)), x(i);
    }
    function H(i) {
      return l.value && i.column.getCanResize();
    }
    function V(i) {
      var v;
      const c = i.column.id;
      if (c in Y.value) return null;
      const g = Math.round(((v = p.get(c)) == null ? void 0 : v.getBoundingClientRect().width) ?? 0);
      return g <= 0 || g === i.column.getSize() ? null : (Y.value = { ...Y.value, [c]: g }, g);
    }
    async function W(i, c) {
      if (!H(i)) return;
      c.stopPropagation(), V(i) !== null && await je(), i.getResizeHandler()(c), ye.value = i.column.id;
      const g = () => {
        ye.value = null;
      };
      for (const v of ["mouseup", "touchend", "touchcancel"])
        document.addEventListener(v, g, { once: !0 });
    }
    function Q(i, c) {
      if (!H(i)) return;
      const g = i.column, v = g.columnDef.minSize ?? 20, k = g.columnDef.maxSize ?? Number.MAX_SAFE_INTEGER, B = V(i) ?? g.getSize(), Se = Math.min(Math.max(Math.round(B + c), v), k);
      G.setColumnSizing((ge) => ({ ...ge, [g.id]: Se }));
    }
    function se(i) {
      H(i) && i.column.resetSize();
    }
    function ie(i, c) {
      const g = Ue.value, v = Math.max(
        0,
        g.findIndex((k) => k.column.id === b.value)
      );
      if (c.altKey) {
        switch (c.key) {
          case "ArrowLeft":
            Q(i, -$l);
            break;
          case "ArrowRight":
            Q(i, $l);
            break;
          case "Home":
            se(i);
            break;
          default:
            return;
        }
        c.preventDefault(), c.stopPropagation();
        return;
      }
      switch (c.key) {
        case "ArrowLeft":
          R(v - 1);
          break;
        case "ArrowRight":
          R(v + 1);
          break;
        case "Home":
          R(0);
          break;
        case "End":
          R(g.length - 1);
          break;
        case "ArrowDown":
          S();
          break;
        case "Enter":
        case " ":
          x(i);
          break;
        default:
          return;
      }
      c.preventDefault(), c.stopPropagation();
    }
    const ve = $(() => {
      const i = /* @__PURE__ */ new Map();
      for (const c of fe.value) {
        const g = c.parentId ?? "", v = i.get(g) ?? [];
        v.push(c.id), i.set(g, v);
      }
      return i;
    });
    function _e(i) {
      return ve.value.get(i.parentId ?? "") ?? [];
    }
    function Ve(i) {
      return _e(i).indexOf(i.id) + 1;
    }
    function Be(i) {
      return _e(i).length;
    }
    function tt(i) {
      return f(i.original, "lazy") === !0;
    }
    function mt(i) {
      return Ie.value ? (ve.value.get(i.id) ?? []).length > 0 : i.getCanExpand() || tt(i);
    }
    function xe(i) {
      return Ie.value ? mt(i) : i.getIsExpanded();
    }
    const Ee = /* @__PURE__ */ ne(/* @__PURE__ */ new Set());
    function on(i) {
      return Ee.value.has(i.id) && tt(i);
    }
    function nt(i, c) {
      if (c && tt(i) && !Ee.value.has(i.id) && (Ee.value = new Set(Ee.value).add(i.id), t.emitEvent("lazy_load", { key: i.id })), !tt(i) || !c || w.value === !0) {
        i.toggleExpanded(c);
        return;
      }
      w.value = { ...w.value, [i.id]: !0 };
    }
    we(fe, (i) => {
      if (Ee.value.size === 0) return;
      const c = new Set(i.filter((g) => on(g)).map((g) => g.id));
      c.size !== Ee.value.size && (Ee.value = c);
    });
    const rc = $(() => {
      if (!r.value) return {};
      const i = { "--pnl-tst-total": `${G.getTotalSize()}px` };
      return Ue.value.forEach((c, g) => {
        i[`--pnl-tst-w${g}`] = `${c.column.getSize()}px`;
      }), i;
    }), oc = $(() => {
      const i = Ue.value[0];
      return i ? i.column.id in Y.value : !1;
    });
    function Lo(i) {
      return r.value ? i === 0 && !oc.value ? { flex: "1 0 var(--pnl-tst-w0)" } : { flex: `0 0 var(--pnl-tst-w${i})` } : { flex: "1 1 0" };
    }
    function sc(i) {
      return { ...Lo(0), paddingInlineStart: `${i.depth * Mn.value}px` };
    }
    const An = /* @__PURE__ */ ne(null), hi = /* @__PURE__ */ ne(null), br = /* @__PURE__ */ ne(0), _r = /* @__PURE__ */ ne(null), On = /* @__PURE__ */ ne(0), Dt = /* @__PURE__ */ ne(28);
    function jo() {
      var g;
      const i = An.value;
      if (!i) return;
      const c = Number.parseFloat(getComputedStyle(i).getPropertyValue("--pnl-tst-row-height"));
      Number.isFinite(c) && c > 0 && (Dt.value = c), On.value = ((g = hi.value) == null ? void 0 : g.offsetHeight) ?? 0, _r.value = i.clientHeight, br.value = i.scrollTop;
    }
    const mi = $(() => {
      const i = fe.value.length;
      if (_r.value === null) return { start: 0, end: Math.min(i, K0) };
      const c = Math.max(0, br.value - On.value), g = Math.max(0, Math.floor(c / Dt.value) - Wl), v = Math.ceil(_r.value / Dt.value) + Wl * 2 + 1;
      return { start: g, end: Math.min(i, g + v) };
    }), vi = $(() => {
      const i = fe.value, { start: c, end: g } = mi.value, v = i.findIndex((B) => B.id === an.value), k = [];
      v >= 0 && v < c && k.push({ row: i[v], index: v, held: !0 });
      for (let B = c; B < g; B += 1)
        k.push({ row: i[B], index: B, held: !1 });
      return v >= g && k.push({ row: i[v], index: v, held: !0 }), k;
    });
    function ic(i) {
      return { position: "absolute", top: `${i * Dt.value}px`, left: "0" };
    }
    const lc = $(() => ({
      height: `${fe.value.length * Dt.value}px`,
      paddingTop: `${mi.value.start * Dt.value}px`
    }));
    function ac(i) {
      br.value = i.currentTarget.scrollTop;
    }
    function uc(i) {
      const c = An.value;
      if (!c || _r.value === null) return;
      const g = fe.value.findIndex((B) => B.id === i);
      if (g < 0) return;
      const v = g * Dt.value + On.value, k = v + Dt.value;
      v < c.scrollTop + On.value ? c.scrollTop = v - On.value : k > c.scrollTop + c.clientHeight && (c.scrollTop = k - c.clientHeight), br.value = c.scrollTop;
    }
    function zo(i, c = void 0) {
      i != null && (uc(i), je(() => {
        var g;
        return (g = Pn.get(i)) == null ? void 0 : g.focus(c);
      }));
    }
    let vt = null;
    Xr(() => {
      jo(), typeof ResizeObserver == "function" && (vt = new ResizeObserver(() => jo()), An.value && vt.observe(An.value));
    }), Yr(() => {
      vt == null || vt.disconnect(), vt = null;
    });
    function cc(i) {
      An.value = i ?? null, vt && (vt.disconnect(), i && (vt.observe(i), je(jo)));
    }
    const sn = /* @__PURE__ */ ne(null), ln = /* @__PURE__ */ ne(!0), Pn = /* @__PURE__ */ new Map();
    function Vt(i) {
      sn.value = i, ln.value = !0, qe.value = !1;
    }
    function fc(i, c) {
      c ? Pn.set(i, c) : Pn.delete(i);
    }
    const an = $(() => {
      const i = fe.value;
      return i.length === 0 ? null : i.some((c) => c.id === sn.value) ? sn.value : i[0].id;
    });
    function Ne(i) {
      i != null && (Vt(i), zo(i));
    }
    function Sr(i) {
      const c = fe.value;
      c.length !== 0 && Ne(c[Math.max(0, Math.min(i, c.length - 1))].id);
    }
    function wi(i, c) {
      const g = fe.value;
      if (g.length === 0) return;
      const v = g[Math.max(0, Math.min(i, g.length - 1))], k = (c == null ? void 0 : c.shiftKey) && _.value && O.value !== "single";
      k && wt.value === null && (wt.value = an.value), Ne(v.id), k && yi(v, !1);
    }
    function dc(i) {
      const c = fe.value;
      if (c.length === 0) return;
      const g = Math.max(
        0,
        c.findIndex((B) => B.id === an.value)
      ), v = c[g];
      if (i.ctrlKey || i.metaKey) {
        const B = {
          a: "select-all",
          c: "copy",
          f: Wn,
          v: "paste",
          x: "cut",
          z: i.shiftKey ? "redo" : "undo"
        }[i.key.toLowerCase()];
        if (B && Cr(B)) {
          i.preventDefault(), Bo(B);
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
          i.preventDefault(), Bo(B);
          return;
        }
      }
      if (Fr.value && (i.key === "ContextMenu" || i.key === "F10" && i.shiftKey)) {
        i.preventDefault(), $c(v);
        return;
      }
      const k = {
        Insert: i.shiftKey ? "new-file" : "new-folder",
        F2: "rename",
        Delete: "delete",
        Escape: "clear-selection"
      }[i.key];
      if (k && Cr(k)) {
        i.preventDefault(), Bo(k);
        return;
      }
      switch (i.key) {
        case "ArrowDown":
          i.preventDefault(), wi(g + 1, i);
          break;
        case "ArrowUp":
          i.preventDefault(), g === 0 && r.value && !i.shiftKey ? C() : wi(g - 1, i);
          break;
        case "ArrowRight":
          if (i.preventDefault(), !mt(v)) break;
          xe(v) ? Sr(g + 1) : (nt(v, !0), Ne(v.id));
          break;
        case "ArrowLeft":
          i.preventDefault(), !Ie.value && mt(v) && v.getIsExpanded() ? (nt(v, !1), Ne(v.id)) : v.parentId && Ne(v.parentId);
          break;
        case "Home":
          i.preventDefault(), Sr(0);
          break;
        case "End":
          i.preventDefault(), Sr(c.length - 1);
          break;
        case "Enter":
          i.preventDefault(), t.emitEvent("activate", { key: v.id });
          break;
        case " ":
          if (!_.value) break;
          i.preventDefault(), xi(v);
          break;
      }
    }
    const wt = /* @__PURE__ */ ne(null);
    function xr(i) {
      wt.value = i.id, U.value = {}, i.toggleSelected(!0, { selectChildren: !1 });
    }
    function yi(i, c) {
      const g = fe.value, v = g.findIndex((ge) => ge.id === wt.value), k = g.findIndex((ge) => ge.id === i.id);
      if (k === -1) return;
      if (v === -1) {
        xr(i);
        return;
      }
      c || (U.value = {});
      const [B, Se] = v <= k ? [v, k] : [k, v];
      for (let ge = B; ge <= Se; ge += 1)
        g[ge].toggleSelected(!0, { selectChildren: !1 });
    }
    const gc = $(() => t.state.options.toggle_on_click === !0);
    function pc(i) {
      const c = I(U.value);
      return c.length === 1 && c[0] === i.id;
    }
    function bi() {
      U.value = {}, wt.value = null, ln.value = !1;
    }
    function _i() {
      I(U.value).length === 0 && (ln.value = !1);
    }
    we(
      () => I(U.value).length > 0,
      (i) => {
        i && (ln.value = !0);
      }
    );
    function hc(i, c) {
      Vt(i.id);
      const g = !!(c != null && c.shiftKey || c != null && c.ctrlKey || c != null && c.metaKey);
      _.value && !g && gc.value && pc(i) ? bi() : _.value && O.value !== "single" ? c != null && c.shiftKey ? yi(i, c.ctrlKey || c.metaKey) : c != null && c.ctrlKey || c != null && c.metaKey ? (wt.value = i.id, wc(i)) : xr(i) : _.value && xr(i), t.emitEvent("activate", { key: i.id });
    }
    function mc(i) {
      Vt(i.id), !Ie.value && nt(i, !i.getIsExpanded());
    }
    function Si(i) {
      return J(i) === "all";
    }
    function vc(i) {
      return J(i) === "some";
    }
    function wc(i) {
      Vt(i.id), i.toggleSelected(void 0, { selectChildren: !1 }), _i();
    }
    function xi(i) {
      Vt(i.id), i.toggleSelected(!Si(i), {
        selectChildren: D.value,
        deselectParents: D.value
      }), _i();
    }
    function yc(i) {
      xi(i), Ne(i.id);
    }
    const Ko = {
      "new-folder": { icon: Zv, label: "New folder", keys: "Insert", node: {} },
      "new-file": {
        icon: Yv,
        label: "New file",
        keys: "Shift+Insert",
        node: { allow_children: !1 }
      },
      rename: { icon: e0, label: "Rename", keys: "F2" },
      delete: { icon: i0, label: "Delete", keys: "Delete" },
      undo: { icon: l0, label: "Undo", keys: "Control+Z" },
      redo: { icon: t0, label: "Redo", keys: "Control+Shift+Z" },
      cut: { icon: n0, label: "Cut", keys: "Control+X" },
      copy: { icon: Xv, label: "Copy", keys: "Control+C" },
      paste: { icon: Gv, label: "Paste", keys: "Control+V" },
      "move-up": { icon: Nl, label: "Move up", keys: "Alt+ArrowUp" },
      "move-down": { icon: Bl, label: "Move down", keys: "Alt+ArrowDown" },
      outdent: { icon: Jv, label: "Outdent", keys: "Alt+ArrowLeft" },
      indent: { icon: Qv, label: "Indent", keys: "Alt+ArrowRight" },
      "expand-all": { icon: Uv, label: "Expand all" },
      "collapse-all": { icon: qv, label: "Collapse all" },
      "select-all": { icon: s0, label: "Select all", keys: "Control+A" },
      "clear-selection": { icon: o0, label: "Clear selection", keys: "Escape" }
    }, bc = [
      "undo",
      "redo",
      Ft,
      "new-folder",
      "new-file",
      "rename",
      "delete",
      Ft,
      "cut",
      "copy",
      "paste",
      Ft,
      "move-up",
      "move-down",
      "outdent",
      "indent",
      Ft,
      "expand-all",
      "collapse-all",
      Ft,
      "select-all",
      "clear-selection",
      Wn
    ], _c = [
      "new-folder",
      "new-file",
      Ft,
      "rename",
      "delete",
      Ft,
      "cut",
      "copy",
      "paste"
    ];
    function Ri(i, c) {
      const g = i === !0 ? c : Array.isArray(i) ? i : [], v = [];
      return g.forEach((k, B) => {
        const Se = typeof k == "string" ? {} : k || {}, ge = typeof k == "string" ? k : Se.id, Vi = `${ge}#${B}`;
        if (ge === Ft || ge === Wn) {
          v.push({ uid: Vi, id: ge });
          return;
        }
        const Vn = Ko[ge];
        if (!Vn) return;
        const Bi = Se.label ?? Vn.label;
        v.push({
          uid: Vi,
          id: ge,
          label: Bi,
          icon: A(Se.icon) ?? Vn.icon,
          keys: Vn.keys,
          node: { title: Bi, ...Vn.node ?? {}, ...Se.node ?? {} }
        });
      }), v;
    }
    const Rr = $(() => Ri(t.state.options.toolbar, bc)), Vo = $(
      () => Ri(t.state.options.menu, _c).filter((i) => i.id !== Wn)
    ), Sc = $(() => Rr.value.length > 0), xc = $(() => t.state.options.toolbar_label ?? "Tree actions"), Ci = $(() => t.state.options.search_label ?? "Search");
    function Mi(i) {
      return Rr.value.find((c) => c.id === i) ?? Vo.value.find((c) => c.id === i) ?? null;
    }
    function Cr(i) {
      return Mi(i) !== null;
    }
    function Bo(i) {
      const c = Mi(i);
      c && qo(c);
    }
    const He = $(() => fe.value.find((i) => i.id === an.value) ?? null);
    function Rc(i) {
      return fe.value.filter((c) => (c.parentId ?? "") === (i.parentId ?? ""));
    }
    function Ii() {
      const i = He.value;
      if (!i) return [];
      const c = Li(i), g = i.parentId ?? "";
      return c.every((k) => {
        var B;
        return (((B = zn(k)) == null ? void 0 : B.parentId) ?? "") === g;
      }) ? c : [i.id];
    }
    function No() {
      const i = He.value;
      if (!i) return [];
      if (!_.value || !i.getIsSelected()) return [i.id];
      const c = fe.value.filter((g) => g.getIsSelected()).map((g) => g.id);
      return c.length > 0 ? c : [i.id];
    }
    const $o = $(() => {
      var i;
      return ((i = t.state.clipboard) == null ? void 0 : i.keys) ?? [];
    }), Cc = $(() => {
      var c;
      const i = new Set(((c = t.state.clipboard) == null ? void 0 : c.mode) === "cut" ? $o.value : []);
      return i.size === 0 || fe.value.forEach((g) => {
        g.parentId && i.has(g.parentId) && i.add(g.id);
      }), i;
    });
    function Dn(i) {
      const c = He.value;
      if (!c) return null;
      const g = new Set(Ii()), v = Rc(c), k = v.map((Se, ge) => g.has(Se.id) ? ge : -1).filter((Se) => Se >= 0);
      if (k.length === 0) return null;
      let B = (i < 0 ? Math.min(...k) : Math.max(...k)) + i;
      for (; B >= 0 && B < v.length && g.has(v[B].id); ) B += i;
      return v[B] ?? null;
    }
    let Ge = null;
    we(
      () => t.state.source,
      () => {
        const i = Ge;
        if (Ge = null, !!i) {
          if (i.key !== void 0) {
            Ne(i.key);
            return;
          }
          je(() => {
            i.index !== void 0 ? Sr(i.index) : i.pasted !== void 0 ? Ic(i.pasted) : Mc(i.added);
          });
        }
      }
    );
    function Mc(i) {
      const c = G.getCoreRowModel().flatRows.find((g) => !i.has(g.id));
      c && (Ne(c.id), _.value && (U.value = {}, wt.value = c.id, c.toggleSelected(!0, { selectChildren: !1 })), Cr("rename") && je(() => Er(c.id, !0)));
    }
    function Ic(i) {
      const c = G.getCoreRowModel().flatRows.filter((k) => !i.has(k.id)), g = new Set(c.map((k) => k.id)), v = c.filter((k) => !g.has(k.parentId ?? ""));
      v.length !== 0 && (Ne(v[0].id), _.value && (U.value = {}, wt.value = v[0].id, v.forEach((k) => k.toggleSelected(!0, { selectChildren: !1 }))));
    }
    const un = /* @__PURE__ */ ne(null), Mr = /* @__PURE__ */ ne(""), kn = /* @__PURE__ */ ne(null), yt = /* @__PURE__ */ ne(null), Wo = /* @__PURE__ */ ne(null), Uo = /* @__PURE__ */ ne(null), Ec = $(() => t.state.options.extension_warning !== !1);
    function Ei(i) {
      const c = String(i ?? ""), g = c.lastIndexOf(".");
      return g < 0 ? "" : c.slice(g + 1).toLowerCase();
    }
    function Ac(i, c) {
      return Ec.value && f(i, "allow_children") === !1 && Ei(c) !== Ei(i.title ?? "");
    }
    let Ir = null;
    function Er(i, c = !1) {
      const g = zn(i);
      g && (Ir = c ? i : null, Mr.value = g.original.title ?? "", un.value = i, t.setEditingKey(i), je(() => {
        var v, k;
        (v = kn.value) == null || v.focus(), (k = kn.value) == null || k.select();
      }));
    }
    function Ar() {
      Ir = null, yt.value = null, un.value = null, t.setEditingKey("");
    }
    function Ai(i) {
      if (yt.value || un.value !== i.id) return;
      const c = Mr.value.trim(), g = c.length > 0 && c !== (i.original.title ?? "");
      if (g && Ir !== i.id && Ac(i.original, c)) {
        yt.value = { key: i.id, title: c, previous: i.original.title ?? i.id }, je(() => {
          var v;
          return (v = Uo.value) == null ? void 0 : v.focus();
        });
        return;
      }
      if (Ar(), !g) {
        Ne(i.id);
        return;
      }
      Ge = { key: i.id }, t.emitEvent("rename", { key: i.id, title: c });
    }
    function Oi() {
      const { key: i, title: c } = yt.value;
      yt.value = null, Ar(), Ge = { key: i }, t.emitEvent("rename", { key: i, title: c });
    }
    function Pi() {
      yt.value = null, je(() => {
        var i, c;
        (i = kn.value) == null || i.focus(), (c = kn.value) == null || c.select();
      });
    }
    function Oc(i) {
      var v;
      const c = i.key;
      if (c === "Escape" || c === "n" || c === "N") {
        i.preventDefault(), Pi();
        return;
      }
      if (c === "y" || c === "Y") {
        i.preventDefault(), Oi();
        return;
      }
      if (c !== "Tab" && c !== "ArrowLeft" && c !== "ArrowRight") return;
      i.preventDefault(), (v = (i.target === Wo.value ? Uo : Wo).value) == null || v.focus();
    }
    function Pc(i) {
      if (un.value !== i.id) return;
      const c = Ir === i.id;
      if (Ar(), !c) {
        Ne(i.id);
        return;
      }
      Ge = { index: fe.value.findIndex((g) => g.id === i.id) }, t.emitEvent("delete", { key: i.id, keys: [i.id] });
    }
    function Dc(i, c) {
      c.key === "Enter" ? (c.preventDefault(), Ai(i)) : c.key === "Escape" && (c.preventDefault(), Pc(i));
    }
    we(
      () => t.state.editingKey,
      (i) => {
        (i || "") !== (un.value || "") && (i ? Er(i) : Ar());
      }
    ), Xr(() => {
      t.state.editingKey && Er(t.state.editingKey);
    });
    function Or(i, c) {
      const g = He.value;
      !g || !i || (Ge = { key: g.id }, t.emitEvent("move", {
        key: g.id,
        keys: Ii(),
        position: c,
        anchorKey: i.id
      }));
    }
    function kc(i) {
      const c = He.value, g = c ? f(c.original, "allow_children") === !1 ? "after" : "child" : null;
      c && g === "child" && !Ie.value && nt(c, !0), Ge = { added: new Set(G.getCoreRowModel().flatRows.map((v) => v.id)) }, t.emitEvent("add", { anchorKey: (c == null ? void 0 : c.id) ?? null, position: g, node: i.node });
    }
    function Tc() {
      var c;
      const i = No();
      i.length !== 0 && (Ge = { index: fe.value.findIndex((g) => {
        var v;
        return g.id === ((v = He.value) == null ? void 0 : v.id);
      }) }, t.emitEvent("delete", { key: ((c = He.value) == null ? void 0 : c.id) ?? null, keys: i }));
    }
    function Fc(i) {
      Ge = { index: fe.value.findIndex((c) => {
        var g;
        return c.id === ((g = He.value) == null ? void 0 : g.id);
      }) }, t.emitEvent(i, {});
    }
    function Hc(i) {
      var g;
      const c = No();
      c.length !== 0 && t.emitEvent(i, { key: ((g = He.value) == null ? void 0 : g.id) ?? null, keys: c });
    }
    function Lc() {
      var v;
      const i = He.value, c = i ? f(i.original, "allow_children") === !1 ? "after" : "child" : null;
      i && c === "child" && !Ie.value && nt(i, !0);
      const g = $o.value;
      Ge = ((v = t.state.clipboard) == null ? void 0 : v.mode) === "cut" ? { key: g[0] } : { pasted: new Set(G.getCoreRowModel().flatRows.map((k) => k.id)) }, t.emitEvent("paste", { anchorKey: (i == null ? void 0 : i.id) ?? null, position: c });
    }
    function Tn(i) {
      var c;
      switch (i.id) {
        case "new-folder":
        case "new-file":
          return !0;
        case "rename":
          return He.value !== null;
        case "delete":
        case "cut":
        case "copy":
          return No().length > 0;
        case "paste":
          return $o.value.length > 0;
        case "undo":
          return t.state.canUndo === !0;
        case "redo":
          return t.state.canRedo === !0;
        case "move-up":
        case "move-down":
          return !ue.value && Dn(i.id === "move-up" ? -1 : 1) !== null;
        case "indent": {
          const g = Dn(-1);
          return g !== null && f(g.original, "allow_children") !== !1;
        }
        case "outdent":
          return !!((c = He.value) != null && c.parentId);
        case "expand-all":
        case "collapse-all":
          return fe.value.length > 0 && !Ie.value;
        case "select-all":
          return fe.value.length > 0 && _.value && O.value !== "single";
        case "clear-selection":
          return _.value && I(U.value).length > 0;
        default:
          return !0;
      }
    }
    function Di(i) {
      return i.keys ? i.keys.replace("Control", "Ctrl") : "";
    }
    function jc(i) {
      return i.keys ? `${i.label} (${Di(i)})` : i.label;
    }
    function qo(i) {
      var c, g, v, k;
      if (Tn(i))
        switch (i.id) {
          case "new-folder":
          case "new-file":
            kc(i);
            break;
          case "rename":
            Er(He.value.id);
            break;
          case "delete":
            Tc();
            break;
          case "undo":
          case "redo":
            Fc(i.id);
            break;
          case "cut":
          case "copy":
            Hc(i.id);
            break;
          case "paste":
            Lc();
            break;
          case "move-up":
            Or(Dn(-1), "before");
            break;
          case "move-down":
            Or(Dn(1), "after");
            break;
          case "indent": {
            const B = Dn(-1);
            B && !Ie.value && nt(B, !0), Or(B, "child");
            break;
          }
          case "outdent":
            Or(zn((c = He.value) == null ? void 0 : c.parentId), "after");
            break;
          case "expand-all":
            G.toggleAllRowsExpanded(!0);
            break;
          case "collapse-all":
            G.toggleAllRowsExpanded(!1);
            break;
          case "select-all":
            U.value = Object.fromEntries(fe.value.map((B) => [B.id, !0])), wt.value = ((g = fe.value[0]) == null ? void 0 : g.id) ?? null;
            break;
          case "clear-selection":
            bi();
            break;
          case Wn:
            (v = Go.value) == null || v.focus(), (k = Go.value) == null || k.select();
            break;
        }
    }
    const Go = /* @__PURE__ */ ne(null), Xo = $(() => Rr.value.filter((i) => i.id in Ko)), Pr = /* @__PURE__ */ ne(null), Yo = /* @__PURE__ */ new Map(), ki = $(() => {
      const i = Xo.value;
      return i.length === 0 ? null : i.some((c) => c.uid === Pr.value) ? Pr.value : i[0].uid;
    });
    function zc(i, c) {
      c ? Yo.set(i, c) : Yo.delete(i);
    }
    function Dr(i) {
      const c = Xo.value;
      if (c.length === 0) return;
      const g = c[Math.max(0, Math.min(i, c.length - 1))].uid;
      Pr.value = g, je(() => {
        var v;
        return (v = Yo.get(g)) == null ? void 0 : v.focus();
      });
    }
    function Kc(i) {
      const c = Xo.value, g = Math.max(
        0,
        c.findIndex((v) => v.uid === ki.value)
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
          i.preventDefault(), Dr(c.length - 1);
          break;
      }
    }
    const Fn = /* @__PURE__ */ ne(!1), kr = /* @__PURE__ */ ne(null), Hn = /* @__PURE__ */ ne({ left: 0, top: 0 }), Tr = /* @__PURE__ */ ne(null), cn = /* @__PURE__ */ ne(0), Zo = /* @__PURE__ */ new Map(), Ln = $(() => Vo.value.filter((i) => i.id in Ko)), Fr = $(() => Ln.value.length > 0), Vc = $(() => t.state.options.menu_label ?? "Row actions");
    function Bc(i, c) {
      c ? Zo.set(i, c) : Zo.delete(i);
    }
    function Ti(i) {
      return Ln.value.findIndex((c) => c.uid === i.uid);
    }
    function Fi(i, c, g) {
      if (!Fr.value) return;
      sn.value !== i.id && Vt(i.id), kr.value = i.id, Hn.value = { left: c, top: g };
      const v = Ln.value.findIndex((k) => Tn(k));
      cn.value = Math.max(0, v), Fn.value = !0, je(Wc);
    }
    function Nc(i, c) {
      Fr.value && (c.preventDefault(), _.value && !i.getIsSelected() && xr(i), Fi(i, c.clientX, c.clientY));
    }
    function $c(i) {
      var g;
      const c = (g = Pn.get(i.id)) == null ? void 0 : g.getBoundingClientRect();
      Fi(i, c ? c.left + Mn.value : hn, c ? c.bottom : hn);
    }
    function Wc() {
      const i = Tr.value;
      if (!i) return;
      const c = i.getBoundingClientRect();
      let { left: g, top: v } = Hn.value;
      g + c.width > window.innerWidth - hn && (g = Math.max(hn, g - c.width)), v + c.height > window.innerHeight - hn && (v = Math.max(hn, v - c.height)), Hn.value = { left: g, top: v }, jn(cn.value);
    }
    function jn(i) {
      const c = Ln.value;
      if (c.length === 0) return;
      const g = Math.max(0, Math.min(i, c.length - 1));
      cn.value = g, je(() => {
        var v;
        return (v = Zo.get(c[g].uid)) == null ? void 0 : v.focus();
      });
    }
    function Hr(i = !0, c = void 0) {
      if (!Fn.value) return;
      const g = kr.value;
      Fn.value = !1, kr.value = null, i && g != null && zo(g, c);
    }
    function Uc(i) {
      if (!Tn(i)) return;
      const c = kr.value;
      Hr(!1), Ne(c), qo(i);
    }
    function qc(i) {
      const c = cn.value;
      switch (i.key) {
        case "ArrowDown":
          i.preventDefault(), jn(c + 1);
          break;
        case "ArrowUp":
          i.preventDefault(), jn(c - 1);
          break;
        case "Home":
          i.preventDefault(), jn(0);
          break;
        case "End":
          i.preventDefault(), jn(Ln.value.length - 1);
          break;
        case "Escape":
        case "Tab":
          i.preventDefault(), Hr();
          break;
      }
    }
    function Jo(i) {
      Tr.value && i.composedPath().includes(Tr.value) || Hr(!1);
    }
    function fn() {
      Hr(!0, { preventScroll: !0 });
    }
    we(Fn, (i) => {
      i ? (document.addEventListener("pointerdown", Jo, !0), window.addEventListener("resize", fn), window.addEventListener("scroll", fn, !0)) : (document.removeEventListener("pointerdown", Jo, !0), window.removeEventListener("resize", fn), window.removeEventListener("scroll", fn, !0));
    }), Yr(() => {
      document.removeEventListener("pointerdown", Jo, !0), window.removeEventListener("resize", fn), window.removeEventListener("scroll", fn, !0);
    });
    const Gc = ["reorder-above", "reorder-below", "make-child", "reparent"], Qo = $(() => t.state.options.enable_dnd === !0), es = $(() => String(t.state.options.transfer_group || "")), dn = $(() => String(t.state.tableId || "")), Hi = /* @__PURE__ */ ne([]), Lr = /* @__PURE__ */ ne(null);
    function zn(i) {
      return fe.value.find((c) => c.id === i) ?? null;
    }
    function Xc(i, c) {
      let g = i;
      for (; g; ) {
        if (c.includes(g.id)) return !0;
        g = g.getParentRow();
      }
      return !1;
    }
    function Li(i) {
      if (!_.value || !i.getIsSelected()) return [i.id];
      const c = /* @__PURE__ */ new Set();
      for (let v = i.getParentRow(); v; v = v.getParentRow()) c.add(v.id);
      const g = fe.value.filter((v) => v.getIsSelected() && !c.has(v.id)).map((v) => v.id);
      return g.length > 1 ? g : [i.id];
    }
    function Yc(i, c, g) {
      if (!g && Xc(i, c)) return Gc;
      const v = ue.value ? ["reorder-above", "reorder-below"] : [];
      return f(i.original, "allow_children") === !1 && v.push("make-child"), v;
    }
    function Zc(i) {
      if (mt(i) && xe(i)) return "expanded";
      const c = _e(i);
      return c[c.length - 1] === i.id ? "last-in-group" : "standard";
    }
    let ts = null, Kn = null;
    function ns() {
      Kn && clearTimeout(Kn), Kn = null, ts = null;
    }
    function Jc(i, c) {
      if (ts === i || (ns(), !c || c.type === "instruction-blocked")) return;
      const g = zn(i);
      !g || !g.getCanExpand() || g.getIsExpanded() || (ts = i, Kn = setTimeout(() => {
        Kn = null;
        const v = zn(i);
        v && v.getCanExpand() && !v.getIsExpanded() && nt(v, !0);
      }, V0));
    }
    function Qc() {
      Lr.value = null, ns();
    }
    const ji = /* @__PURE__ */ ne(null);
    function ef() {
      let i = ji.value;
      if (!i) return null;
      let c = i.getRootNode();
      for (; c.host; )
        i = c.host, c = i.getRootNode();
      return i;
    }
    function jr(i) {
      for (const { row: c } of vi.value) {
        const g = Pn.get(c.id);
        if (!g) continue;
        const v = g.getBoundingClientRect();
        if (i.clientX >= v.left && i.clientX < v.right && i.clientY >= v.top && i.clientY < v.bottom)
          return { row: c, element: g, rect: v };
      }
      return null;
    }
    function tf(i, c) {
      const g = ".pnl-tst-check, .pnl-tst-twisty, .pnl-tst-edit";
      for (const v of i.element.querySelectorAll(g)) {
        const k = v.getBoundingClientRect();
        if (c.clientX >= k.left && c.clientX < k.right && c.clientY >= k.top && c.clientY < k.bottom)
          return !0;
      }
      return !1;
    }
    const nf = {
      id: () => dn.value,
      // Anything outside a row (the header, the empty space below the last row) is
      // not a drag handle, and neither is a row control.
      canDragFrom(i) {
        const c = jr(i);
        return c !== null && !tf(c, i);
      },
      dragData(i) {
        const c = jr(i);
        return c ? {
          type: _n,
          group: es.value,
          sourceId: dn.value,
          key: c.row.id,
          keys: Li(c.row)
        } : null;
      },
      // The registered element is the host, so the default preview would be a
      // snapshot of the whole layout. Point it at the row being dragged, offset so
      // the preview stays under the cursor where it was grabbed.
      preview(i, c) {
        const g = jr(i);
        return g ? (c(g.element, i.clientX - g.rect.left, i.clientY - g.rect.top), !0) : !1;
      },
      setDragging(i) {
        Hi.value = i;
      },
      // Our own rows always. Another pane's only when both name the same group, so a
      // table that opted into nothing shows no drop state at all rather than
      // accepting a drag Python is bound to reject.
      dropData(i, c) {
        const g = jr(i);
        if (!g) return null;
        const v = c.sourceId !== dn.value;
        if (v && !(es.value && c.group === es.value))
          return { type: _n, key: null, paneId: dn.value };
        const k = { type: _n, key: g.row.id, paneId: dn.value };
        return Im(k, {
          element: g.element,
          input: i,
          currentLevel: g.row.depth,
          indentPerLevel: Mn.value,
          mode: Zc(g.row),
          block: Yc(g.row, c.keys ?? [], v)
        });
      },
      showDrop(i, c) {
        Lr.value = { key: i, instruction: c }, Jc(i, c);
      },
      clearDrop: Qc,
      drop(i, c, g, v) {
        const k = i.keys ?? [];
        if (k.length === 0) return;
        const B = {
          targetKey: c,
          instruction: g.type,
          desiredLevel: g.desiredLevel ?? g.currentLevel
        };
        if (i.sourceId === dn.value) {
          if (k.includes(c)) return;
          t.emitEvent("move", { key: i.key, keys: k, ...B });
          return;
        }
        Ge = { pasted: new Set(G.getCoreRowModel().flatRows.map((Se) => Se.id)) }, t.emitEvent("transfer", {
          keys: k,
          sourceId: i.sourceId,
          copy: !!(v != null && v.ctrlKey || v != null && v.altKey),
          ...B
        });
      }
    };
    let kt = null;
    function zi() {
      kt == null || kt(), kt = null;
      const i = ef();
      !i || !Qo.value || (kt = Sv(i, nf));
    }
    Xr(zi), we(Qo, zi), Yr(() => {
      ns(), kt == null || kt();
    });
    function rs(i) {
      var c;
      return ((c = Lr.value) == null ? void 0 : c.key) === i.id ? Lr.value.instruction : null;
    }
    function rf(i) {
      const c = f(i.original, "class");
      return typeof c == "string" ? c : null;
    }
    function of(i) {
      const c = rs(i);
      return {
        "pnl-tst-row--draggable": Qo.value,
        "pnl-tst-row--dragging": Hi.value.includes(i.id),
        "pnl-tst-row--blocked": (c == null ? void 0 : c.type) === "instruction-blocked",
        "pnl-tst-row--child-target": (c == null ? void 0 : c.type) === "make-child"
      };
    }
    function Ki(i) {
      const c = rs(i);
      return c ? c.type === "reorder-above" ? "pnl-tst-dropline--above" : c.type === "reorder-below" || c.type === "reparent" ? "pnl-tst-dropline--below" : null : null;
    }
    function sf(i) {
      const c = rs(i);
      return c ? { insetInlineStart: `${(c.type === "reparent" ? c.desiredLevel : c.currentLevel) * c.indentPerLevel}px` } : null;
    }
    return (i, c) => (re(), oe("div", {
      ref_key: "rootElement",
      ref: ji,
      class: "pnl-tst"
    }, [
      Sc.value ? (re(), oe("div", {
        key: 0,
        class: "pnl-tst-toolbar",
        role: "toolbar",
        "aria-orientation": "horizontal",
        "aria-label": xc.value
      }, [
        (re(!0), oe(Ae, null, Nn(Rr.value, (g) => (re(), oe(Ae, {
          key: g.uid
        }, [
          g.id === "|" ? (re(), oe("span", u0)) : g.id === "search" ? (re(), oe("label", c0, [
            Re("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: qt(r0)
            }, null, 8, f0),
            Re("input", {
              ref_for: !0,
              ref: (v) => Go.value = v,
              type: "search",
              value: Pt.value,
              "aria-label": Ci.value,
              placeholder: Ci.value,
              onInput: c[0] || (c[0] = (v) => ht(v.target.value))
            }, null, 40, d0)
          ])) : (re(), oe("button", {
            key: 2,
            ref_for: !0,
            ref: (v) => zc(g.uid, v),
            type: "button",
            class: "pnl-tst-tbtn",
            "aria-label": g.label,
            "aria-keyshortcuts": g.keys,
            "aria-disabled": !Tn(g),
            title: jc(g),
            tabindex: g.uid === ki.value ? 0 : -1,
            onClick: (v) => qo(g),
            onFocus: (v) => Pr.value = g.uid,
            onKeydown: Kc
          }, [
            Re("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: g.icon
            }, null, 8, p0)
          ], 40, g0))
        ], 64))), 128))
      ], 8, a0)) : Xe("", !0),
      fe.value.length === 0 ? (re(), oe("div", h0, Ht(rn.value), 1)) : (re(), oe("div", {
        key: 2,
        ref: cc,
        class: it(["pnl-tst-grid", { "pnl-tst-grid--resizing": ye.value !== null }]),
        role: "treegrid",
        "aria-label": Kt.value,
        "aria-colcount": Ue.value.length,
        "aria-rowcount": yr.value,
        style: st(rc.value),
        onKeydown: dc,
        onScroll: ac
      }, [
        r.value ? (re(), oe("div", {
          key: 0,
          ref_key: "headElement",
          ref: hi,
          class: "pnl-tst-head",
          role: "rowgroup"
        }, [
          Re("div", v0, [
            (re(!0), oe(Ae, null, Nn(Ue.value, (g, v) => (re(), oe("div", {
              key: g.id,
              ref_for: !0,
              ref: (k) => m(g.column.id, k),
              class: it(["pnl-tst-hcell", { "pnl-tst-hcell--sortable": F(g) }]),
              role: "columnheader",
              "aria-colindex": v + 1,
              "aria-sort": T(g),
              "aria-keyshortcuts": H(g) ? "Alt+ArrowLeft Alt+ArrowRight Alt+Home" : void 0,
              tabindex: qe.value && g.column.id === b.value ? 0 : -1,
              style: st(Lo(v)),
              onClick: (k) => N(g),
              onFocus: (k) => En.value = g.column.id,
              onKeydown: (k) => ie(g, k)
            }, [
              Re("span", y0, Ht(g.column.columnDef.header), 1),
              P(g) ? (re(), oe("span", {
                key: 0,
                class: "pnl-tst-sortind",
                "aria-hidden": "true",
                innerHTML: P(g)
              }, null, 8, b0)) : Xe("", !0),
              H(g) ? (re(), oe("span", {
                key: 1,
                class: it(["pnl-tst-resize", { "pnl-tst-resize--active": ye.value === g.column.id }]),
                "aria-hidden": "true",
                onClick: c[1] || (c[1] = pn(() => {
                }, ["stop"])),
                onDblclick: pn((k) => se(g), ["stop"]),
                onMousedown: (k) => W(g, k),
                onTouchstart: (k) => W(g, k)
              }, null, 42, _0)) : Xe("", !0)
            ], 46, w0))), 128))
          ])
        ], 512)) : Xe("", !0),
        Re("div", {
          class: "pnl-tst-body",
          role: "rowgroup",
          style: st(lc.value)
        }, [
          (re(!0), oe(Ae, null, Nn(vi.value, ({ row: g, index: v, held: k }) => (re(), oe("div", {
            key: g.id,
            ref_for: !0,
            ref: (B) => fc(g.id, B),
            class: it(["pnl-tst-row", [
              of(g),
              rf(g),
              {
                "pnl-tst-row--active": ln.value && g.id === sn.value,
                "pnl-tst-row--quiet": !ln.value && g.id === sn.value,
                "pnl-tst-row--cut": Cc.value.has(g.id)
              }
            ]]),
            style: st(k ? ic(v) : void 0),
            role: "row",
            "aria-level": g.depth + 1,
            "aria-posinset": Ve(g),
            "aria-setsize": Be(g),
            "aria-rowindex": v + In.value,
            "aria-expanded": mt(g) ? xe(g) : void 0,
            "aria-busy": on(g) ? "true" : void 0,
            "aria-selected": _.value ? g.getIsSelected() : void 0,
            "aria-haspopup": Fr.value ? "menu" : void 0,
            tabindex: !qe.value && g.id === an.value ? 0 : -1,
            onClick: (B) => hc(g, B),
            onContextmenu: (B) => Nc(g, B),
            onFocus: (B) => Vt(g.id)
          }, [
            Ki(g) ? (re(), oe("span", {
              key: 0,
              class: it(["pnl-tst-dropline", Ki(g)]),
              style: st(sf(g)),
              "aria-hidden": "true"
            }, null, 6)) : Xe("", !0),
            (re(!0), oe(Ae, null, Nn(g.getAllCells(), (B, Se) => (re(), oe("div", {
              key: B.id,
              class: it(["pnl-tst-cell", { "pnl-tst-cell--tree": Se === 0 }]),
              role: "gridcell",
              "aria-colindex": Se + 1,
              style: st(Se === 0 ? sc(g) : Lo(Se))
            }, [
              Se === 0 ? (re(), oe(Ae, { key: 0 }, [
                mt(g) ? (re(), oe("span", {
                  key: 0,
                  class: it(["pnl-tst-twisty", {
                    "pnl-tst-twisty--open": xe(g),
                    "pnl-tst-twisty--busy": on(g)
                  }]),
                  "aria-hidden": "true",
                  onClick: pn((ge) => mc(g), ["stop"])
                }, [...c[4] || (c[4] = [
                  Re("svg", {
                    viewBox: "0 0 16 16",
                    width: "12",
                    height: "12",
                    focusable: "false"
                  }, [
                    Re("path", {
                      d: "M6 3.5 10.5 8 6 12.5",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "1.6"
                    })
                  ], -1)
                ])], 10, R0)) : (re(), oe("span", C0)),
                j.value ? (re(), oe("input", {
                  key: 2,
                  class: "pnl-tst-check",
                  type: "checkbox",
                  tabindex: "-1",
                  checked: Si(g),
                  ".indeterminate": vc(g),
                  "aria-label": `Select ${g.original.title ?? g.id}`,
                  onClick: pn((ge) => yc(g), ["stop"])
                }, null, 40, M0)) : Xe("", !0),
                z(g) ? (re(), oe("span", {
                  key: 3,
                  class: "pnl-tst-icon",
                  "aria-hidden": "true",
                  innerHTML: z(g)
                }, null, 8, I0)) : Xe("", !0)
              ], 64)) : Xe("", !0),
              Se === 0 && un.value === g.id ? (re(), oe("input", {
                key: 1,
                ref_for: !0,
                ref: (ge) => kn.value = ge,
                class: "pnl-tst-edit",
                type: "text",
                value: Mr.value,
                "aria-label": `Rename ${g.original.title ?? g.id}`,
                onInput: c[2] || (c[2] = (ge) => Mr.value = ge.target.value),
                onClick: c[3] || (c[3] = pn(() => {
                }, ["stop"])),
                onKeydown: pn((ge) => Dc(g, ge), ["stop"]),
                onBlur: (ge) => Ai(g)
              }, null, 40, E0)) : (re(), oe("span", A0, Ht(B.getValue()), 1))
            ], 14, x0))), 128))
          ], 46, S0))), 128))
        ], 4)
      ], 46, m0)),
      yt.value ? (re(), oe("div", O0, [
        Re("div", {
          class: "pnl-tst-dialog",
          role: "alertdialog",
          "aria-modal": "true",
          "aria-label": "Rename",
          "aria-describedby": "pnl-tst-confirm-message",
          onKeydown: Oc
        }, [
          Re("p", P0, " Rename " + Ht(yt.value.previous) + " to " + Ht(yt.value.title) + "? If you change a file name extension, the file might become unusable. ", 1),
          Re("div", D0, [
            Re("button", {
              ref_key: "confirmYesButton",
              ref: Wo,
              type: "button",
              class: "pnl-tst-dbtn",
              "aria-keyshortcuts": "Y",
              onClick: Oi
            }, [...c[5] || (c[5] = [
              Re("span", { class: "pnl-tst-dkey" }, "Y", -1),
              ks("es ", -1)
            ])], 512),
            Re("button", {
              ref_key: "confirmNoButton",
              ref: Uo,
              type: "button",
              class: "pnl-tst-dbtn",
              "aria-keyshortcuts": "N",
              onClick: Pi
            }, [...c[6] || (c[6] = [
              Re("span", { class: "pnl-tst-dkey" }, "N", -1),
              ks("o ", -1)
            ])], 512)
          ])
        ], 32)
      ])) : Xe("", !0),
      Fn.value ? (re(), oe("div", {
        key: 4,
        ref_key: "menuElement",
        ref: Tr,
        class: "pnl-tst-menu",
        role: "menu",
        "aria-orientation": "vertical",
        "aria-label": Vc.value,
        style: st({ left: `${Hn.value.left}px`, top: `${Hn.value.top}px` }),
        onKeydown: qc
      }, [
        (re(!0), oe(Ae, null, Nn(Vo.value, (g) => (re(), oe(Ae, {
          key: g.uid
        }, [
          g.id === "|" ? (re(), oe("div", T0)) : (re(), oe("button", {
            key: 1,
            ref_for: !0,
            ref: (v) => Bc(g.uid, v),
            type: "button",
            class: "pnl-tst-mitem",
            role: "menuitem",
            "aria-keyshortcuts": g.keys,
            "aria-disabled": !Tn(g),
            tabindex: Ti(g) === cn.value ? 0 : -1,
            onClick: (v) => Uc(g),
            onFocus: (v) => cn.value = Ti(g)
          }, [
            Re("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: g.icon
            }, null, 8, H0),
            Re("span", L0, Ht(g.label), 1),
            g.keys ? (re(), oe("span", j0, Ht(Di(g)), 1)) : Xe("", !0)
          ], 40, F0))
        ], 64))), 128))
      ], 44, k0)) : Xe("", !0)
    ], 512));
  }
};
function N0({ model: e, el: t }) {
  t.style.display = "block", t.style.width = "100%", t.style.height = "100%";
  const n = document.createElement("div");
  n.className = "pnl-tst-root", n.style.height = "100%", t.append(n);
  const r = /* @__PURE__ */ bo({
    source: e.get("source") || [],
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
  }, u = (O, _) => O.length === _.length && O.every((D, j) => D === _[j]), f = (O) => (_) => {
    const D = [...e.get(O) || []].sort();
    u(D, _) || (e.set(O, _), e.save_changes());
  }, d = f("expanded_keys"), h = f("selected_keys"), w = (O) => {
    (e.get("filter_text") || "") !== O && (e.set("filter_text", O), e.save_changes());
  }, y = (O) => {
    (e.get("editing_key") || "") !== O && (e.set("editing_key", O), e.save_changes());
  }, I = (O, _) => O.length === _.length && O.every((D, j) => D.id === _[j].id && !!D.desc == !!_[j].desc), E = (O) => {
    I(e.get("sorting") || [], O) || (e.set("sorting", O), e.save_changes());
  }, A = (O, _) => {
    const D = Object.keys(O);
    return D.length === Object.keys(_).length && D.every((j) => O[j] === _[j]);
  }, M = Ig(B0, {
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
  return M.mount(n), e.on("change:source", () => {
    r.source = e.get("source") || [];
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
    M.unmount();
  };
}
export {
  N0 as render
};

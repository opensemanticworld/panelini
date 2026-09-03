/**
* @vue/shared v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function Ns(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const he = {}, vn = [], ct = () => {
}, Wl = () => !1, po = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), ho = (e) => e.startsWith("onUpdate:"), Oe = Object.assign, $s = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, nf = Object.prototype.hasOwnProperty, ae = (e, t) => nf.call(e, t), q = Array.isArray, jt = (e) => cr(e) === "[object Map]", eo = (e) => cr(e) === "[object Set]", Bi = (e) => cr(e) === "[object Date]", X = (e) => typeof e == "function", be = (e) => typeof e == "string", ft = (e) => typeof e == "symbol", de = (e) => e !== null && typeof e == "object", Ul = (e) => (de(e) || X(e)) && X(e.then) && X(e.catch), ql = Object.prototype.toString, cr = (e) => ql.call(e), rf = (e) => cr(e).slice(8, -1), Gl = (e) => cr(e) === "[object Object]", Ws = (e) => be(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, qn = /* @__PURE__ */ Ns(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), mo = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, of = /-\w/g, Ze = mo(
  (e) => e.replace(of, (t) => t.slice(1).toUpperCase())
), sf = /\B([A-Z])/g, Zt = mo(
  (e) => e.replace(sf, "-$1").toLowerCase()
), Xl = mo((e) => e.charAt(0).toUpperCase() + e.slice(1)), rs = mo(
  (e) => e ? `on${Xl(e)}` : ""
), at = (e, t) => !Object.is(e, t), os = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Yl = (e, t, n, r = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: r,
    value: n
  });
}, lf = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Ni;
const vo = () => Ni || (Ni = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function ot(e) {
  if (q(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], o = be(r) ? ff(r) : ot(r);
      if (o)
        for (const s in o)
          t[s] = o[s];
    }
    return t;
  } else if (be(e) || de(e))
    return e;
}
const af = /;(?![^(]*\))/g, uf = /:([^]+)/, cf = /\/\*[^]*?\*\//g;
function ff(e) {
  const t = {};
  return e.replace(cf, "").split(af).forEach((n) => {
    if (n) {
      const r = n.split(uf);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function st(e) {
  let t = "";
  if (be(e))
    t = e;
  else if (q(e))
    for (let n = 0; n < e.length; n++) {
      const r = st(e[n]);
      r && (t += r + " ");
    }
  else if (de(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const df = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", gf = /* @__PURE__ */ Ns(df);
function Zl(e) {
  return !!e || e === "";
}
function pf(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let r = 0; n && r < e.length; r++)
    n = wo(e[r], t[r]);
  return n;
}
function $i(e, t) {
  if (e.size !== t.size) return !1;
  const n = Array.from(t), r = new Uint8Array(n.length);
  for (const o of e) {
    let s = -1;
    for (let i = 0; i < n.length; i++)
      if (!r[i] && wo(o, n[i])) {
        s = i;
        break;
      }
    if (s < 0) return !1;
    r[s] = 1;
  }
  return !0;
}
function wo(e, t) {
  if (e === t) return !0;
  let n = Bi(e), r = Bi(t);
  if (n || r)
    return n && r ? e.getTime() === t.getTime() : !1;
  if (n = ft(e), r = ft(t), n || r)
    return e === t;
  if (n = q(e), r = q(t), n || r)
    return n && r ? pf(e, t) : !1;
  if (n = de(e), r = de(t), n || r) {
    if (!n || !r)
      return !1;
    if (n = jt(e), r = jt(t), n || r || (n = eo(e), r = eo(t), n || r))
      return n && r ? $i(e, t) : !1;
    const o = Object.keys(e).length, s = Object.keys(t).length;
    if (o !== s)
      return !1;
    for (const i in e) {
      const a = e.hasOwnProperty(i), u = t.hasOwnProperty(i);
      if (a && !u || !a && u || !wo(e[i], t[i]))
        return !1;
    }
  }
  return String(e) === String(t);
}
const Jl = (e) => !!(e && e.__v_isRef === !0), Ft = (e) => be(e) ? e : e == null ? "" : q(e) || de(e) && (e.toString === ql || !X(e.toString)) ? Jl(e) ? Ft(e.value) : JSON.stringify(e, Ql, 2) : String(e), Ql = (e, t) => Jl(t) ? Ql(e, t.value) : jt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [r, o], s) => (n[ss(r, s) + " =>"] = o, n),
    {}
  )
} : eo(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => ss(n))
} : ft(t) ? ss(t) : de(t) && !q(t) && !Gl(t) ? String(t) : t, ss = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    ft(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Re;
class hf {
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
function ea() {
  return Re;
}
function mf(e, t = !1) {
  Re && Re.cleanups.push(e);
}
let pe;
const is = /* @__PURE__ */ new WeakSet();
class ta {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Re && (Re.active ? Re.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, is.has(this) && (is.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || ra(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Wi(this), oa(this);
    const t = pe, n = Je;
    pe = this, Je = !0;
    try {
      return this.fn();
    } finally {
      sa(this), pe = t, Je = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Gs(t);
      this.deps = this.depsTail = void 0, Wi(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? is.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    xs(this) && this.run();
  }
  get dirty() {
    return xs(this);
  }
}
let na = 0, Gn, Xn;
function ra(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Xn, Xn = e;
    return;
  }
  e.next = Gn, Gn = e;
}
function Us() {
  na++;
}
function qs() {
  if (--na > 0)
    return;
  if (Xn) {
    let t = Xn;
    for (Xn = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; Gn; ) {
    let t = Gn;
    for (Gn = void 0; t; ) {
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
function oa(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function sa(e) {
  let t, n = e.depsTail, r = n;
  for (; r; ) {
    const o = r.prevDep;
    r.version === -1 ? (r === n && (n = o), Gs(r), vf(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = o;
  }
  e.deps = t, e.depsTail = n;
}
function xs(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (ia(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function ia(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === tr) || (e.globalVersion = tr, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !xs(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = pe, r = Je;
  pe = e, Je = !0;
  try {
    oa(e);
    const o = e.fn(e._value);
    (t.version === 0 || at(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    pe = n, Je = r, sa(e), e.flags &= -3;
  }
}
function Gs(e, t = !1) {
  const { dep: n, prevSub: r, nextSub: o } = e;
  if (r && (r.nextSub = o, e.prevSub = void 0), o && (o.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
    n.computed.flags &= -5;
    for (let s = n.computed.deps; s; s = s.nextDep)
      Gs(s, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function vf(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let Je = !0;
const la = [];
function xt() {
  la.push(Je), Je = !1;
}
function Rt() {
  const e = la.pop();
  Je = e === void 0 ? !0 : e;
}
function Wi(e) {
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
let tr = 0;
class wf {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Xs {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!pe || !Je || pe === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== pe)
      n = this.activeLink = new wf(pe, this), pe.deps ? (n.prevDep = pe.depsTail, pe.depsTail.nextDep = n, pe.depsTail = n) : pe.deps = pe.depsTail = n, aa(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const r = n.nextDep;
      r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = pe.depsTail, n.nextDep = void 0, pe.depsTail.nextDep = n, pe.depsTail = n, pe.deps === n && (pe.deps = r);
    }
    return n;
  }
  trigger(t) {
    this.version++, tr++, this.notify(t);
  }
  notify(t) {
    Us();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      qs();
    }
  }
}
function aa(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let r = t.deps; r; r = r.nextDep)
        aa(r);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const Rs = /* @__PURE__ */ new WeakMap(), $t = /* @__PURE__ */ Symbol(
  ""
), Cs = /* @__PURE__ */ Symbol(
  ""
), nr = /* @__PURE__ */ Symbol(
  ""
);
function Ee(e, t, n) {
  if (Je && pe) {
    let r = Rs.get(e);
    r || Rs.set(e, r = /* @__PURE__ */ new Map());
    let o = r.get(n);
    o || (r.set(n, o = new Xs()), o.map = r, o.key = n), o.track();
  }
}
function _t(e, t, n, r, o, s) {
  const i = Rs.get(e);
  if (!i) {
    tr++;
    return;
  }
  const a = (u) => {
    u && u.trigger();
  };
  if (Us(), t === "clear")
    i.forEach(a);
  else {
    const u = q(e), f = u && Ws(n);
    if (u && n === "length") {
      const d = Number(r);
      i.forEach((h, w) => {
        (w === "length" || w === nr || !ft(w) && w >= d) && a(h);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && a(i.get(n)), f && a(i.get(nr)), t) {
        case "add":
          u ? f && a(i.get("length")) : (a(i.get($t)), jt(e) && a(i.get(Cs)));
          break;
        case "delete":
          u || (a(i.get($t)), jt(e) && a(i.get(Cs)));
          break;
        case "set":
          jt(e) && a(i.get($t));
          break;
      }
  }
  qs();
}
function dn(e) {
  const t = /* @__PURE__ */ le(e);
  return t === e ? t : (Ee(t, "iterate", nr), /* @__PURE__ */ $e(e) ? t : t.map(Qe));
}
function yo(e) {
  return Ee(e = /* @__PURE__ */ le(e), "iterate", nr), e;
}
function it(e, t) {
  return /* @__PURE__ */ Ct(e) ? _n(/* @__PURE__ */ Wt(e) ? Qe(t) : t) : Qe(t);
}
const yf = {
  __proto__: null,
  [Symbol.iterator]() {
    return ls(this, Symbol.iterator, (e) => it(this, e));
  },
  concat(...e) {
    return dn(this).concat(
      ...e.map((t) => q(t) ? dn(t) : t)
    );
  },
  entries() {
    return ls(this, "entries", (e) => (e[1] = it(this, e[1]), e));
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
      (n) => n.map((r) => it(this, r)),
      arguments
    );
  },
  find(e, t) {
    return wt(
      this,
      "find",
      e,
      t,
      (n) => it(this, n),
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
      (n) => it(this, n),
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
    return as(this, "includes", e);
  },
  indexOf(...e) {
    return as(this, "indexOf", e);
  },
  join(e) {
    return dn(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return as(this, "lastIndexOf", e);
  },
  map(e, t) {
    return wt(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Vn(this, "pop");
  },
  push(...e) {
    return Vn(this, "push", e);
  },
  reduce(e, ...t) {
    return Ui(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Ui(this, "reduceRight", e, t);
  },
  shift() {
    return Vn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return wt(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Vn(this, "splice", e);
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
    return Vn(this, "unshift", e);
  },
  values() {
    return ls(this, "values", (e) => it(this, e));
  }
};
function ls(e, t, n) {
  const r = yo(e), o = r[t]();
  return r !== e && !/* @__PURE__ */ $e(e) && (o._next = o.next, o.next = () => {
    const s = o._next();
    return s.done || (s.value = n(s.value)), s;
  }), o;
}
const bf = Array.prototype;
function wt(e, t, n, r, o, s) {
  const i = yo(e), a = i !== e && !/* @__PURE__ */ $e(e), u = i[t];
  if (u !== bf[t]) {
    const h = u.apply(e, s);
    return a ? Qe(h) : h;
  }
  let f = n;
  i !== e && (a ? f = function(h, w) {
    return n.call(this, it(e, h), w, e);
  } : n.length > 2 && (f = function(h, w) {
    return n.call(this, h, w, e);
  }));
  const d = u.call(i, f, r);
  return a && o ? o(d) : d;
}
function Ui(e, t, n, r) {
  const o = yo(e), s = o !== e && !/* @__PURE__ */ $e(e);
  let i = n, a = !1;
  o !== e && (s ? (a = r.length === 0, i = function(f, d, h) {
    return a && (a = !1, f = it(e, f)), n.call(this, f, it(e, d), h, e);
  }) : n.length > 3 && (i = function(f, d, h) {
    return n.call(this, f, d, h, e);
  }));
  const u = o[t](i, ...r);
  return a ? it(e, u) : u;
}
function as(e, t, n) {
  const r = /* @__PURE__ */ le(e);
  Ee(r, "iterate", nr);
  const o = r[t](...n);
  return (o === -1 || o === !1) && /* @__PURE__ */ Js(n[0]) ? (n[0] = /* @__PURE__ */ le(n[0]), r[t](...n)) : o;
}
function Vn(e, t, n = []) {
  xt(), Us();
  const r = (/* @__PURE__ */ le(e))[t].apply(e, n);
  return qs(), Rt(), r;
}
const _f = /* @__PURE__ */ Ns("__proto__,__v_isRef,__isVue"), ua = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(ft)
);
function Sf(e) {
  ft(e) || (e = String(e));
  const t = /* @__PURE__ */ le(this);
  return Ee(t, "has", e), t.hasOwnProperty(e);
}
class ca {
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
      return r === (o ? s ? Df : pa : s ? ga : da).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const i = q(t);
    if (!o) {
      let u;
      if (i && (u = yf[n]))
        return u;
      if (n === "hasOwnProperty")
        return Sf;
    }
    const a = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ Ae(t) ? t : r
    );
    if ((ft(n) ? ua.has(n) : _f(n)) || (o || Ee(t, "get", n), s))
      return a;
    if (/* @__PURE__ */ Ae(a)) {
      const u = i && Ws(n) ? a : a.value;
      return o && de(u) ? /* @__PURE__ */ Is(u) : u;
    }
    return de(a) ? o ? /* @__PURE__ */ Is(a) : /* @__PURE__ */ bo(a) : a;
  }
}
class fa extends ca {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, o) {
    let s = t[n];
    const i = q(t) && Ws(n);
    if (!this._isShallow) {
      const f = /* @__PURE__ */ Ct(s);
      if (!/* @__PURE__ */ $e(r) && !/* @__PURE__ */ Ct(r) && (s = /* @__PURE__ */ le(s), r = /* @__PURE__ */ le(r)), !i && /* @__PURE__ */ Ae(s) && !/* @__PURE__ */ Ae(r))
        return f || (s.value = r), !0;
    }
    const a = i ? Number(n) < t.length : ae(t, n), u = Reflect.set(
      t,
      n,
      r,
      /* @__PURE__ */ Ae(t) ? t : o
    );
    return t === /* @__PURE__ */ le(o) && u && (a ? at(r, s) && _t(t, "set", n, r) : _t(t, "add", n, r)), u;
  }
  deleteProperty(t, n) {
    const r = ae(t, n);
    t[n];
    const o = Reflect.deleteProperty(t, n);
    return o && r && _t(t, "delete", n, void 0), o;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!ft(n) || !ua.has(n)) && Ee(t, "has", n), r;
  }
  ownKeys(t) {
    return Ee(
      t,
      "iterate",
      q(t) ? "length" : $t
    ), Reflect.ownKeys(t);
  }
}
class xf extends ca {
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
const Rf = /* @__PURE__ */ new fa(), Cf = /* @__PURE__ */ new xf(), Mf = /* @__PURE__ */ new fa(!0);
const Ms = (e) => e, zr = (e) => Reflect.getPrototypeOf(e);
function If(e, t, n) {
  return function(...r) {
    const o = this.__v_raw, s = /* @__PURE__ */ le(o), i = jt(s), a = e === "entries" || e === Symbol.iterator && i, u = e === "keys" && i, f = o[e](...r), d = n ? Ms : t ? _n : Qe;
    return !t && Ee(
      s,
      "iterate",
      u ? Cs : $t
    ), Oe(
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
function Ef(e, t) {
  const n = {
    get(o) {
      const s = this.__v_raw, i = /* @__PURE__ */ le(s), a = /* @__PURE__ */ le(o);
      e || (at(o, a) && Ee(i, "get", o), Ee(i, "get", a));
      const { has: u } = zr(i), f = t ? Ms : e ? _n : Qe;
      if (u.call(i, o))
        return f(s.get(o));
      if (u.call(i, a))
        return f(s.get(a));
      s !== i && s.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && Ee(/* @__PURE__ */ le(o), "iterate", $t), o.size;
    },
    has(o) {
      const s = this.__v_raw, i = /* @__PURE__ */ le(s), a = /* @__PURE__ */ le(o);
      return e || (at(o, a) && Ee(i, "has", o), Ee(i, "has", a)), o === a ? s.has(o) : s.has(o) || s.has(a);
    },
    forEach(o, s) {
      const i = this, a = i.__v_raw, u = /* @__PURE__ */ le(a), f = t ? Ms : e ? _n : Qe;
      return !e && Ee(u, "iterate", $t), a.forEach((d, h) => o.call(s, f(d), f(h), i));
    }
  };
  return Oe(
    n,
    e ? {
      add: Kr("add"),
      set: Kr("set"),
      delete: Kr("delete"),
      clear: Kr("clear")
    } : {
      add(o) {
        const s = /* @__PURE__ */ le(this), i = zr(s), a = /* @__PURE__ */ le(o), u = !t && !/* @__PURE__ */ $e(o) && !/* @__PURE__ */ Ct(o) ? a : o;
        return i.has.call(s, u) || at(o, u) && i.has.call(s, o) || at(a, u) && i.has.call(s, a) || (s.add(u), _t(s, "add", u, u)), this;
      },
      set(o, s) {
        !t && !/* @__PURE__ */ $e(s) && !/* @__PURE__ */ Ct(s) && (s = /* @__PURE__ */ le(s));
        const i = /* @__PURE__ */ le(this), { has: a, get: u } = zr(i);
        let f = a.call(i, o);
        f || (o = /* @__PURE__ */ le(o), f = a.call(i, o));
        const d = u.call(i, o);
        return i.set(o, s), f ? at(s, d) && _t(i, "set", o, s) : _t(i, "add", o, s), this;
      },
      delete(o) {
        const s = /* @__PURE__ */ le(this), { has: i, get: a } = zr(s);
        let u = i.call(s, o);
        u || (o = /* @__PURE__ */ le(o), u = i.call(s, o)), a && a.call(s, o);
        const f = s.delete(o);
        return u && _t(s, "delete", o, void 0), f;
      },
      clear() {
        const o = /* @__PURE__ */ le(this), s = o.size !== 0, i = o.clear();
        return s && _t(
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
    n[o] = If(o, e, t);
  }), n;
}
function Ys(e, t) {
  const n = Ef(e, t);
  return (r, o, s) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(
    ae(n, o) && o in r ? n : r,
    o,
    s
  );
}
const Af = {
  get: /* @__PURE__ */ Ys(!1, !1)
}, Of = {
  get: /* @__PURE__ */ Ys(!1, !0)
}, Pf = {
  get: /* @__PURE__ */ Ys(!0, !1)
};
const da = /* @__PURE__ */ new WeakMap(), ga = /* @__PURE__ */ new WeakMap(), pa = /* @__PURE__ */ new WeakMap(), Df = /* @__PURE__ */ new WeakMap();
function kf(e) {
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
  return /* @__PURE__ */ Ct(e) ? e : Zs(
    e,
    !1,
    Rf,
    Af,
    da
  );
}
// @__NO_SIDE_EFFECTS__
function Tf(e) {
  return Zs(
    e,
    !1,
    Mf,
    Of,
    ga
  );
}
// @__NO_SIDE_EFFECTS__
function Is(e) {
  return Zs(
    e,
    !0,
    Cf,
    Pf,
    pa
  );
}
function Zs(e, t, n, r, o) {
  if (!de(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const s = o.get(e);
  if (s)
    return s;
  const i = kf(rf(e));
  if (i === 0)
    return e;
  const a = new Proxy(
    e,
    i === 2 ? r : n
  );
  return o.set(e, a), a;
}
// @__NO_SIDE_EFFECTS__
function Wt(e) {
  return /* @__PURE__ */ Ct(e) ? /* @__PURE__ */ Wt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Ct(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function $e(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Js(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function le(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ le(t) : e;
}
function Ff(e) {
  return !ae(e, "__v_skip") && Object.isExtensible(e) && Yl(e, "__v_skip", !0), e;
}
const Qe = (e) => de(e) ? /* @__PURE__ */ bo(e) : e, _n = (e) => de(e) ? /* @__PURE__ */ Is(e) : e;
// @__NO_SIDE_EFFECTS__
function Ae(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function re(e) {
  return ha(e, !1);
}
// @__NO_SIDE_EFFECTS__
function Hf(e) {
  return ha(e, !0);
}
function ha(e, t) {
  return /* @__PURE__ */ Ae(e) ? e : new Lf(e, t);
}
class Lf {
  constructor(t, n) {
    this.dep = new Xs(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ le(t), this._value = n ? t : Qe(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, r = this.__v_isShallow || /* @__PURE__ */ $e(t) || /* @__PURE__ */ Ct(t);
    t = r ? t : /* @__PURE__ */ le(t), at(t, n) && (this._rawValue = t, this._value = r ? t : Qe(t), this.dep.trigger());
  }
}
function Ut(e) {
  return /* @__PURE__ */ Ae(e) ? e.value : e;
}
const jf = {
  get: (e, t, n) => t === "__v_raw" ? e : Ut(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return /* @__PURE__ */ Ae(o) && !/* @__PURE__ */ Ae(n) ? (o.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function ma(e) {
  return /* @__PURE__ */ Wt(e) ? e : new Proxy(e, jf);
}
class zf {
  constructor(t, n, r) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Xs(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = tr - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    pe !== this)
      return ra(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return ia(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function Kf(e, t, n = !1) {
  let r, o;
  return X(e) ? r = e : (r = e.get, o = e.set), new zf(r, o, n);
}
const Vr = {}, to = /* @__PURE__ */ new WeakMap();
let Nt;
function Vf(e, t = !1, n = Nt) {
  if (n) {
    let r = to.get(n);
    r || to.set(n, r = []), r.push(e);
  }
}
function Bf(e, t, n = he) {
  const { immediate: r, deep: o, once: s, scheduler: i, augmentJob: a, call: u } = n, f = (_) => o ? _ : /* @__PURE__ */ $e(_) || o === !1 || o === 0 ? Lt(_, 1) : Lt(_);
  let d, h, w, y, I = !1, E = !1;
  if (/* @__PURE__ */ Ae(e) ? (h = () => e.value, I = /* @__PURE__ */ $e(e)) : /* @__PURE__ */ Wt(e) ? (h = () => f(e), I = !0) : q(e) ? (E = !0, I = e.some((_) => /* @__PURE__ */ Wt(_) || /* @__PURE__ */ $e(_)), h = () => e.map((_) => {
    if (/* @__PURE__ */ Ae(_))
      return _.value;
    if (/* @__PURE__ */ Wt(_))
      return f(_);
    if (X(_))
      return u ? u(_, 2) : _();
  })) : X(e) ? t ? h = u ? () => u(e, 2) : e : h = () => {
    if (w) {
      xt();
      try {
        w();
      } finally {
        Rt();
      }
    }
    const _ = Nt;
    Nt = d;
    try {
      return u ? u(e, 3, [y]) : e(y);
    } finally {
      Nt = _;
    }
  } : h = ct, t && o) {
    const _ = h, D = o === !0 ? 1 / 0 : o;
    h = () => Lt(_(), D);
  }
  const A = ea(), z = () => {
    d.stop(), A && A.active && $s(A.effects, d);
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
        if (_ || o || I || (E ? D.some((j, U) => at(j, M[U])) : at(D, M))) {
          w && w();
          const j = Nt;
          Nt = d;
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
            Nt = j;
          }
        }
      } else
        d.run();
  };
  return a && a(O), d = new ta(h), d.scheduler = i ? () => i(O, !1) : O, y = (_) => Vf(_, !1, d), w = d.onStop = () => {
    const _ = to.get(d);
    if (_) {
      if (u)
        u(_, 4);
      else
        for (const D of _) D();
      to.delete(d);
    }
  }, t ? r ? O(!0) : M = d.run() : i ? i(O.bind(null, !0), !0) : d.run(), z.pause = d.pause.bind(d), z.resume = d.resume.bind(d), z.stop = z, z;
}
function Lt(e, t = 1 / 0, n) {
  if (t <= 0 || !de(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ Ae(e))
    Lt(e.value, t, n);
  else if (q(e))
    for (let r = 0; r < e.length; r++)
      Lt(e[r], t, n);
  else if (eo(e) || jt(e))
    e.forEach((r) => {
      Lt(r, t, n);
    });
  else if (Gl(e)) {
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
function fr(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (o) {
    _o(o, t, n);
  }
}
function et(e, t, n, r) {
  if (X(e)) {
    const o = fr(e, t, n, r);
    return o && Ul(o) && o.catch((s) => {
      _o(s, t, n);
    }), o;
  }
  if (q(e)) {
    const o = [];
    for (let s = 0; s < e.length; s++)
      o.push(et(e[s], t, n, r));
    return o;
  }
}
function _o(e, t, n, r = !0) {
  const o = t ? t.vnode : null, { errorHandler: s, throwUnhandledErrorInProduction: i } = t && t.appContext.config || he;
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
      xt(), fr(s, null, 10, [
        e,
        u,
        f
      ]), Rt();
      return;
    }
  }
  Nf(e, n, o, r, i);
}
function Nf(e, t, n, r = !0, o = !1) {
  if (o)
    throw e;
  console.error(e);
}
const ke = [];
let rt = -1;
const wn = [];
let Ht = null, hn = 0;
const va = /* @__PURE__ */ Promise.resolve();
let no = null;
function Le(e) {
  const t = no || va;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function $f(e) {
  let t = rt + 1, n = ke.length;
  for (; t < n; ) {
    const r = t + n >>> 1, o = ke[r], s = rr(o);
    s < e || s === e && o.flags & 2 ? t = r + 1 : n = r;
  }
  return t;
}
function Qs(e) {
  if (!(e.flags & 1)) {
    const t = rr(e), n = ke[ke.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= rr(n) ? ke.push(e) : ke.splice($f(t), 0, e), e.flags |= 1, wa();
  }
}
function wa() {
  no || (no = va.then(ba));
}
function Wf(e) {
  if (!q(e))
    Ht && e.id === -1 ? Ht.splice(hn + 1, 0, e) : e.flags & 1 || (wn.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      wn.push(e[t]);
  wa();
}
function qi(e, t, n = rt + 1) {
  for (; n < ke.length; n++) {
    const r = ke[n];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid)
        continue;
      ke.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function ya(e) {
  if (wn.length) {
    const t = [...new Set(wn)].sort(
      (n, r) => rr(n) - rr(r)
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
const rr = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function ba(e) {
  try {
    for (rt = 0; rt < ke.length; rt++) {
      const t = ke[rt];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), fr(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; rt < ke.length; rt++) {
      const t = ke[rt];
      t && (t.flags &= -2);
    }
    rt = -1, ke.length = 0, ya(), no = null, (ke.length || wn.length) && ba();
  }
}
let ut = null, _a = null;
function ro(e) {
  const t = ut;
  return ut = e, _a = e && e.type.__scopeId || null, t;
}
function Uf(e, t = ut, n) {
  if (!t || e._n)
    return e;
  const r = (...o) => {
    r._d && ol(-1);
    const s = ro(t), i = qt.length;
    let a;
    try {
      a = e(...o);
    } finally {
      for (let u = qt.length; u > i; u--) Wa();
      ro(s), r._d && ol(1);
    }
    return a;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function Vt(e, t, n, r) {
  const o = e.dirs, s = t && t.dirs;
  for (let i = 0; i < o.length; i++) {
    const a = o[i];
    s && (a.oldValue = s[i].value);
    let u = a.dir[r];
    u && (xt(), et(u, n, 8, [
      e.el,
      a,
      e,
      t
    ]), Rt());
  }
}
function qf(e, t) {
  if (Te) {
    let n = Te.provides;
    const r = Te.parent && Te.parent.provides;
    r === n && (n = Te.provides = Object.create(r)), n[e] = t;
  }
}
function Gr(e, t, n = !1) {
  const r = Nd();
  if (r || yn) {
    let o = yn ? yn._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && X(t) ? t.call(r && r.proxy) : t;
  }
}
const Gf = /* @__PURE__ */ Symbol.for("v-scx"), Xf = () => Gr(Gf);
function ye(e, t, n) {
  return Sa(e, t, n);
}
function Sa(e, t, n = he) {
  const { immediate: r, deep: o, flush: s, once: i } = n, a = Oe({}, n), u = t && r || !t && s !== "post";
  let f;
  if (ir) {
    if (s === "sync") {
      const y = Xf();
      f = y.__watcherHandles || (y.__watcherHandles = []);
    } else if (!u) {
      const y = () => {
      };
      return y.stop = ct, y.resume = ct, y.pause = ct, y;
    }
  }
  const d = Te;
  a.call = (y, I, E) => et(y, d, I, E);
  let h = !1;
  s === "post" ? a.scheduler = (y) => {
    He(y, d && d.suspense);
  } : s !== "sync" && (h = !0, a.scheduler = (y, I) => {
    I ? y() : Qs(y);
  }), a.augmentJob = (y) => {
    t && (y.flags |= 4), h && (y.flags |= 2, d && (y.id = d.uid, y.i = d));
  };
  const w = Bf(e, t, a);
  return ir && (f ? f.push(w) : u && w()), w;
}
function Yf(e, t, n) {
  const r = this.proxy, o = be(e) ? e.includes(".") ? xa(r, e) : () => r[e] : e.bind(r, r);
  let s;
  X(t) ? s = t : (s = t.handler, n = t);
  const i = dr(this), a = Sa(o, s.bind(r), n);
  return i(), a;
}
function xa(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++)
      r = r[n[o]];
    return r;
  };
}
const Zf = /* @__PURE__ */ Symbol("_vte"), So = (e) => e.__isTeleport, us = /* @__PURE__ */ Symbol("_leaveCb");
function Jf(e) {
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
function Ra(e) {
  if (!ti(e))
    return So(e.type) && e.children ? Jf(e.children) : e;
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
function ei(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    ei(
      So(n.type) && Ra(n) || n,
      t
    );
  } else e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Ca(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Gi(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const oo = /* @__PURE__ */ new WeakMap();
function Yn(e, t, n, r, o = !1) {
  if (q(e)) {
    e.forEach(
      (E, A) => Yn(
        E,
        t && (q(t) ? t[A] : t),
        n,
        r,
        o
      )
    );
    return;
  }
  if (Zn(r) && !o) {
    r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && Yn(e, t, n, r.component.subTree);
    return;
  }
  const s = r.shapeFlag & 4 ? oi(r.component) : r.el, i = o ? null : s, { i: a, r: u } = e, f = t && t.r, d = a.refs === he ? a.refs = {} : a.refs, h = a.setupState, w = /* @__PURE__ */ le(h), y = h === he ? Wl : (E) => Gi(d, E) ? !1 : ae(w, E), I = (E, A) => !(A && Gi(d, A));
  if (f != null && f !== u) {
    if (Xi(t), be(f))
      d[f] = null, y(f) && (h[f] = null);
    else if (/* @__PURE__ */ Ae(f)) {
      const E = t;
      I(f, E.k) && (f.value = null), E.k && (d[E.k] = null);
    }
  }
  if (X(u))
    fr(u, a, 12, [i, d]);
  else {
    const E = be(u), A = /* @__PURE__ */ Ae(u);
    if (E || A) {
      const z = () => {
        if (e.f) {
          const M = E ? y(u) ? h[u] : d[u] : I() || !e.k ? u.value : d[e.k];
          if (o)
            q(M) && $s(M, s);
          else if (q(M))
            M.includes(s) || M.push(s);
          else if (E)
            d[u] = [s], y(u) && (h[u] = d[u]);
          else {
            const O = [s];
            I(u, e.k) && (u.value = O), e.k && (d[e.k] = O);
          }
        } else E ? (d[u] = i, y(u) && (h[u] = i)) : A && (I(u, e.k) && (u.value = i), e.k && (d[e.k] = i));
      };
      if (i) {
        const M = () => {
          z(), oo.delete(e);
        };
        M.id = -1, oo.set(e, M), He(M, n);
      } else
        Xi(e), z();
    }
  }
}
function Xi(e) {
  const t = oo.get(e);
  t && (t.flags |= 8, oo.delete(e));
}
vo().requestIdleCallback;
vo().cancelIdleCallback;
const Zn = (e) => !!e.type.__asyncLoader, ti = (e) => e.type.__isKeepAlive;
function Qf(e, t) {
  Ma(e, "a", t);
}
function ed(e, t) {
  Ma(e, "da", t);
}
function Ma(e, t, n = Te) {
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
      ti(o.parent.vnode) && td(r, t, n, o), o = o.parent;
  }
}
function td(e, t, n, r) {
  const o = xo(
    t,
    e,
    r,
    !0
    /* prepend */
  );
  Ia(() => {
    $s(r[t], o);
  }, n);
}
function xo(e, t, n = Te, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), s = t.__weh || (t.__weh = (...i) => {
      xt();
      const a = dr(n), u = et(t, n, e, i);
      return a(), Rt(), u;
    });
    return r ? o.unshift(s) : o.push(s), s;
  }
}
const Et = (e) => (t, n = Te) => {
  (!ir || e === "sp") && xo(e, (...r) => t(...r), n);
}, nd = Et("bm"), Xr = Et("m"), rd = Et(
  "bu"
), od = Et("u"), Yr = Et(
  "bum"
), Ia = Et("um"), sd = Et(
  "sp"
), id = Et("rtg"), ld = Et("rtc");
function ad(e, t = Te) {
  xo("ec", e, t);
}
const ud = /* @__PURE__ */ Symbol.for("v-ndc");
function Bn(e, t, n, r) {
  let o;
  const s = n, i = q(e);
  if (i || be(e)) {
    const a = i && /* @__PURE__ */ Wt(e);
    let u = !1, f = !1;
    a && (u = !/* @__PURE__ */ $e(e), f = /* @__PURE__ */ Ct(e), e = yo(e)), o = new Array(e.length);
    for (let d = 0, h = e.length; d < h; d++)
      o[d] = t(
        u ? f ? _n(Qe(e[d])) : Qe(e[d]) : e[d],
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
const Es = (e) => e ? Xa(e) ? oi(e) : Es(e.parent) : null, Jn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Oe(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Es(e.parent),
    $root: (e) => Es(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Aa(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Qs(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Le.bind(e.proxy)),
    $watch: (e) => Yf.bind(e)
  })
), cs = (e, t) => e !== he && !e.__isScriptSetup && ae(e, t), cd = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: r, data: o, props: s, accessCache: i, type: a, appContext: u } = e;
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
        if (cs(r, t))
          return i[t] = 1, r[t];
        if (o !== he && ae(o, t))
          return i[t] = 2, o[t];
        if (ae(s, t))
          return i[t] = 3, s[t];
        if (n !== he && ae(n, t))
          return i[t] = 4, n[t];
        As && (i[t] = 0);
      }
    }
    const f = Jn[t];
    let d, h;
    if (f)
      return t === "$attrs" && Ee(e.attrs, "get", ""), f(e);
    if (
      // css module (injected by vue-loader)
      (d = a.__cssModules) && (d = d[t])
    )
      return d;
    if (n !== he && ae(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      h = u.config.globalProperties, ae(h, t)
    )
      return h[t];
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: o, ctx: s } = e;
    return cs(o, t) ? (o[t] = n, !0) : r !== he && ae(r, t) ? (r[t] = n, !0) : ae(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (s[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: o, props: s, type: i }
  }, a) {
    let u;
    return !!(n[a] || e !== he && a[0] !== "$" && ae(e, a) || cs(t, a) || ae(s, a) || ae(r, a) || ae(Jn, a) || ae(o.config.globalProperties, a) || (u = i.__cssModules) && u[a]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : ae(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function Yi(e) {
  return q(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let As = !0;
function fd(e) {
  const t = Aa(e), n = e.proxy, r = e.ctx;
  As = !1, t.beforeCreate && Zi(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: s,
    methods: i,
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
    filters: Ce
  } = t;
  if (f && dd(f, r, null), i)
    for (const J in i) {
      const ce = i[J];
      X(ce) && (r[J] = ce.bind(n));
    }
  if (o) {
    const J = o.call(n, n);
    de(J) && (e.data = /* @__PURE__ */ bo(J));
  }
  if (As = !0, s)
    for (const J in s) {
      const ce = s[J], Me = X(ce) ? ce.bind(n, n) : X(ce.get) ? ce.get.bind(n, n) : ct, At = !X(ce) && X(ce.set) ? ce.set.bind(n) : ct, pt = $({
        get: Me,
        set: At
      });
      Object.defineProperty(r, J, {
        enumerable: !0,
        configurable: !0,
        get: () => pt.value,
        set: (ze) => pt.value = ze
      });
    }
  if (a)
    for (const J in a)
      Ea(a[J], r, n, J);
  if (u) {
    const J = X(u) ? u.call(n) : u;
    Reflect.ownKeys(J).forEach((ce) => {
      qf(ce, J[ce]);
    });
  }
  d && Zi(d, e, "c");
  function G(J, ce) {
    q(ce) ? ce.forEach((Me) => J(Me.bind(n))) : ce && J(ce.bind(n));
  }
  if (G(nd, h), G(Xr, w), G(rd, y), G(od, I), G(Qf, E), G(ed, A), G(ad, K), G(ld, j), G(id, U), G(Yr, M), G(Ia, _), G(sd, L), q(ee))
    if (ee.length) {
      const J = e.exposed || (e.exposed = {});
      ee.forEach((ce) => {
        Object.defineProperty(J, ce, {
          get: () => n[ce],
          set: (Me) => n[ce] = Me,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  D && e.render === ct && (e.render = D), ue != null && (e.inheritAttrs = ue), Y && (e.components = Y), me && (e.directives = me), L && Ca(e);
}
function dd(e, t, n = ct) {
  q(e) && (e = Os(e));
  for (const r in e) {
    const o = e[r];
    let s;
    de(o) ? "default" in o ? s = Gr(
      o.from || r,
      o.default,
      !0
    ) : s = Gr(o.from || r) : s = Gr(o), /* @__PURE__ */ Ae(s) ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (i) => s.value = i
    }) : t[r] = s;
  }
}
function Zi(e, t, n) {
  et(
    q(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Ea(e, t, n, r) {
  let o = r.includes(".") ? xa(n, r) : () => n[r];
  if (be(e)) {
    const s = t[e];
    X(s) && ye(o, s);
  } else if (X(e))
    ye(o, e.bind(n));
  else if (de(e))
    if (q(e))
      e.forEach((s) => Ea(s, t, n, r));
    else {
      const s = X(e.handler) ? e.handler.bind(n) : t[e.handler];
      X(s) && ye(o, s, e);
    }
}
function Aa(e) {
  const t = e.type, { mixins: n, extends: r } = t, {
    mixins: o,
    optionsCache: s,
    config: { optionMergeStrategies: i }
  } = e.appContext, a = s.get(t);
  let u;
  return a ? u = a : !o.length && !n && !r ? u = t : (u = {}, o.length && o.forEach(
    (f) => so(u, f, i, !0)
  ), so(u, t, i)), de(t) && s.set(t, u), u;
}
function so(e, t, n, r = !1) {
  const { mixins: o, extends: s } = t;
  s && so(e, s, n, !0), o && o.forEach(
    (i) => so(e, i, n, !0)
  );
  for (const i in t)
    if (!(r && i === "expose")) {
      const a = gd[i] || n && n[i];
      e[i] = a ? a(e[i], t[i]) : t[i];
    }
  return e;
}
const gd = {
  data: Ji,
  props: Qi,
  emits: Qi,
  // objects
  methods: Wn,
  computed: Wn,
  // lifecycle
  beforeCreate: De,
  created: De,
  beforeMount: De,
  mounted: De,
  beforeUpdate: De,
  updated: De,
  beforeDestroy: De,
  beforeUnmount: De,
  destroyed: De,
  unmounted: De,
  activated: De,
  deactivated: De,
  errorCaptured: De,
  serverPrefetch: De,
  // assets
  components: Wn,
  directives: Wn,
  // watch
  watch: hd,
  // provide / inject
  provide: Ji,
  inject: pd
};
function Ji(e, t) {
  return t ? e ? function() {
    return Oe(
      X(e) ? e.call(this, this) : e,
      X(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function pd(e, t) {
  return Wn(Os(e), Os(t));
}
function Os(e) {
  if (q(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function De(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Wn(e, t) {
  return e ? Oe(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Qi(e, t) {
  return e ? q(e) && q(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Oe(
    /* @__PURE__ */ Object.create(null),
    Yi(e),
    Yi(t ?? {})
  ) : t;
}
function hd(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Oe(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = De(e[r], t[r]);
  return n;
}
function Oa() {
  return {
    app: null,
    config: {
      isNativeTag: Wl,
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
let md = 0;
function vd(e, t) {
  return function(r, o = null) {
    X(r) || (r = Oe({}, r)), o != null && !de(o) && (o = null);
    const s = Oa(), i = /* @__PURE__ */ new WeakSet(), a = [];
    let u = !1;
    const f = s.app = {
      _uid: md++,
      _component: r,
      _props: o,
      _container: null,
      _context: s,
      _instance: null,
      version: Xd,
      get config() {
        return s.config;
      },
      set config(d) {
      },
      use(d, ...h) {
        return i.has(d) || (d && X(d.install) ? (i.add(d), d.install(f, ...h)) : X(d) && (i.add(d), d(f, ...h))), f;
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
          const y = f._ceVNode || St(r, o);
          return y.appContext = s, w === !0 ? w = "svg" : w === !1 && (w = void 0), e(y, d, w), u = !0, f._container = d, d.__vue_app__ = f, oi(y.component);
        }
      },
      onUnmount(d) {
        a.push(d);
      },
      unmount() {
        u && (et(
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
const wd = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Ze(t)}Modifiers`] || e[`${Zt(t)}Modifiers`];
function yd(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || he;
  let o = n;
  const s = t.startsWith("update:"), i = s && wd(r, t.slice(7));
  i && (i.trim && (o = n.map((d) => be(d) ? d.trim() : d)), i.number && (o = o.map(lf)));
  let a, u = r[a = rs(t)] || // also try camelCase event handler (#2249)
  r[a = rs(Ze(t))];
  !u && s && (u = r[a = rs(Zt(t))]), u && et(
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
    e.emitted[a] = !0, et(
      f,
      e,
      6,
      o
    );
  }
}
const bd = /* @__PURE__ */ new WeakMap();
function Pa(e, t, n = !1) {
  const r = n ? bd : t.emitsCache, o = r.get(e);
  if (o !== void 0)
    return o;
  const s = e.emits;
  let i = {}, a = !1;
  if (!X(e)) {
    const u = (f) => {
      const d = Pa(f, t, !0);
      d && (a = !0, Oe(i, d));
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  return !s && !a ? (de(e) && r.set(e, null), null) : (q(s) ? s.forEach((u) => i[u] = null) : Oe(i, s), de(e) && r.set(e, i), i);
}
function Ro(e, t) {
  return !e || !po(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), ae(e, t[0].toLowerCase() + t.slice(1)) || ae(e, Zt(t)) || ae(e, t));
}
function el(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: o,
    propsOptions: [s],
    slots: i,
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
      z = lt(
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
      z = lt(
        _.length > 1 ? _(
          h,
          { attrs: a, slots: i, emit: u }
        ) : _(
          h,
          null
        )
      ), M = t.props ? a : _d(a);
    }
  } catch (_) {
    qt.length = 0, _o(_, e, 1), z = St(Mt);
  }
  let O = z;
  if (M && E !== !1) {
    const _ = Object.keys(M), { shapeFlag: D } = O;
    _.length && D & 7 && (s && _.some(ho) && (M = Sd(
      M,
      s
    )), O = Sn(O, M, !1, !0));
  }
  if (n.dirs && (O = Sn(O, null, !1, !0), O.dirs = O.dirs ? O.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const _ = So(O.type) && Ra(O) || O;
    ei(_, n.transition);
  }
  return z = O, ro(A), z;
}
const _d = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || po(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Sd = (e, t) => {
  const n = {};
  for (const r in e)
    (!ho(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
  return n;
};
function xd(e, t, n) {
  const { props: r, children: o, component: s } = e, { props: i, children: a, patchFlag: u } = t, f = s.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && u >= 0) {
    if (u & 1024)
      return !0;
    if (u & 16)
      return r ? tl(r, i, f) : !!i;
    if (u & 8) {
      const d = t.dynamicProps;
      for (let h = 0; h < d.length; h++) {
        const w = d[h];
        if (Da(i, r, w) && !Ro(f, w))
          return !0;
      }
    }
  } else
    return (o || a) && (!a || !a.$stable) ? !0 : r === i ? !1 : r ? i ? tl(r, i, f) : !0 : !!i;
  return !1;
}
function tl(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < r.length; o++) {
    const s = r[o];
    if (Da(t, e, s) && !Ro(n, s))
      return !0;
  }
  return !1;
}
function Da(e, t, n) {
  const r = e[n], o = t[n];
  return n === "style" && de(r) && de(o) ? !wo(r, o) : r !== o;
}
function Rd({ vnode: e, parent: t, suspense: n }, r) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.suspense.vnode.el = o.el = r, e = o), o === e)
      (e = t.vnode).el = r, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = r);
}
const ka = {}, Ta = () => Object.create(ka), Fa = (e) => Object.getPrototypeOf(e) === ka;
function Cd(e, t, n, r = !1) {
  const o = {}, s = Ta();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Ha(e, t, o, s);
  for (const i in e.propsOptions[0])
    i in o || (o[i] = void 0);
  n ? e.props = r ? o : /* @__PURE__ */ Tf(o) : e.type.props ? e.props = o : e.props = s, e.attrs = s;
}
function Md(e, t, n, r) {
  const {
    props: o,
    attrs: s,
    vnode: { patchFlag: i }
  } = e, a = /* @__PURE__ */ le(o), [u] = e.propsOptions;
  let f = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (r || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
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
            const I = Ze(w);
            o[I] = Ps(
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
    Ha(e, t, o, s) && (f = !0);
    let d;
    for (const h in a)
      (!t || // for camelCase
      !ae(t, h) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((d = Zt(h)) === h || !ae(t, d))) && (u ? n && // for camelCase
      (n[h] !== void 0 || // for kebab-case
      n[d] !== void 0) && (o[h] = Ps(
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
  f && _t(e.attrs, "set", "");
}
function Ha(e, t, n, r) {
  const [o, s] = e.propsOptions;
  let i = !1, a;
  if (t)
    for (let u in t) {
      if (qn(u))
        continue;
      const f = t[u];
      let d;
      o && ae(o, d = Ze(u)) ? !s || !s.includes(d) ? n[d] = f : (a || (a = {}))[d] = f : Ro(e.emitsOptions, u) || (!(u in r) || f !== r[u]) && (r[u] = f, i = !0);
    }
  if (s) {
    const u = /* @__PURE__ */ le(n), f = a || he;
    for (let d = 0; d < s.length; d++) {
      const h = s[d];
      n[h] = Ps(
        o,
        u,
        h,
        f[h],
        e,
        !ae(f, h)
      );
    }
  }
  return i;
}
function Ps(e, t, n, r, o, s) {
  const i = e[n];
  if (i != null) {
    const a = ae(i, "default");
    if (a && r === void 0) {
      const u = i.default;
      if (i.type !== Function && !i.skipFactory && X(u)) {
        const { propsDefaults: f } = o;
        if (n in f)
          r = f[n];
        else {
          const d = dr(o);
          r = f[n] = u.call(
            null,
            t
          ), d();
        }
      } else
        r = u;
      o.ce && o.ce._setProp(n, r);
    }
    i[
      0
      /* shouldCast */
    ] && (s && !a ? r = !1 : i[
      1
      /* shouldCastTrue */
    ] && (r === "" || r === Zt(n)) && (r = !0));
  }
  return r;
}
const Id = /* @__PURE__ */ new WeakMap();
function La(e, t, n = !1) {
  const r = n ? Id : t.propsCache, o = r.get(e);
  if (o)
    return o;
  const s = e.props, i = {}, a = [];
  let u = !1;
  if (!X(e)) {
    const d = (h) => {
      u = !0;
      const [w, y] = La(h, t, !0);
      Oe(i, w), y && a.push(...y);
    };
    !n && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  if (!s && !u)
    return de(e) && r.set(e, vn), vn;
  if (q(s))
    for (let d = 0; d < s.length; d++) {
      const h = Ze(s[d]);
      nl(h) && (i[h] = he);
    }
  else if (s)
    for (const d in s) {
      const h = Ze(d);
      if (nl(h)) {
        const w = s[d], y = i[h] = q(w) || X(w) ? { type: w } : Oe({}, w), I = y.type;
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
  const f = [i, a];
  return de(e) && r.set(e, f), f;
}
function nl(e) {
  return e[0] !== "$" && !qn(e);
}
const ni = (e) => e === "_" || e === "_ctx" || e === "$stable", ri = (e) => q(e) ? e.map(lt) : [lt(e)], Ed = (e, t, n) => {
  if (t._n)
    return t;
  const r = Uf((...o) => ri(t(...o)), n);
  return r._c = !1, r;
}, ja = (e, t, n) => {
  const r = e._ctx;
  for (const o in e) {
    if (ni(o)) continue;
    const s = e[o];
    if (X(s))
      t[o] = Ed(o, s, r);
    else if (s != null) {
      const i = ri(s);
      t[o] = () => i;
    }
  }
}, za = (e, t) => {
  const n = ri(t);
  e.slots.default = () => n;
}, Ka = (e, t, n) => {
  for (const r in t)
    (n || !ni(r)) && (e[r] = t[r]);
}, Ad = (e, t, n) => {
  const r = e.slots = Ta();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (Ka(r, t, n), n && Yl(r, "_", o, !0)) : ja(t, r);
  } else t && za(e, t);
}, Od = (e, t, n) => {
  const { vnode: r, slots: o } = e;
  let s = !0, i = he;
  if (r.shapeFlag & 32) {
    const a = t._;
    a ? n && a === 1 ? s = !1 : Ka(o, t, n) : (s = !t.$stable, ja(t, o)), i = t;
  } else t && (za(e, t), i = { default: 1 });
  if (s)
    for (const a in o)
      !ni(a) && i[a] == null && delete o[a];
}, He = Fd;
function Pd(e) {
  return Dd(e);
}
function Dd(e, t) {
  const n = vo();
  n.__VUE__ = !0;
  const {
    insert: r,
    remove: o,
    patchProp: s,
    createElement: i,
    createText: a,
    createComment: u,
    setText: f,
    setElementText: d,
    parentNode: h,
    nextSibling: w,
    setScopeId: y = ct,
    insertStaticContent: I
  } = e, E = (p, m, b, R = null, C = null, S = null, F = void 0, T = null, P = !!m.dynamicChildren) => {
    if (p === m)
      return;
    p && !Nn(p, m) && (R = nn(p), ze(p, C, S, !0), p = null), m.patchFlag === -2 && (P = !1, m.dynamicChildren = null);
    const { type: x, ref: N, shapeFlag: H } = m;
    switch (x) {
      case Co:
        A(p, m, b, R);
        break;
      case Mt:
        z(p, m, b, R);
        break;
      case ds:
        p == null && M(m, b, R, F);
        break;
      case Ie:
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
    N != null && C ? Yn(N, p && p.ref, S, m || p, !m) : N == null && p && p.ref != null && Yn(p.ref, null, S, p, !0);
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
    if (P = p.el = i(
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
      fs(p, S),
      F,
      T
    ), W && Vt(p, null, R, "created"), U(P, p, p.scopeId, F, R), N) {
      for (const se in N)
        se !== "value" && !qn(se) && s(P, se, null, N[se], S, R);
      "value" in N && s(P, "value", null, N.value, S), (x = N.onVnodeBeforeMount) && nt(x, R, p);
    }
    W && Vt(p, null, R, "beforeMount");
    const Q = kd(C, V);
    Q && V.beforeEnter(P), r(P, m, b), ((x = N && N.onVnodeMounted) || Q || W) && He(() => {
      try {
        x && nt(x, R, p), Q && V.enter(P), W && Vt(p, null, R, "mounted");
      } finally {
      }
    }, C);
  }, U = (p, m, b, R, C) => {
    if (b && y(p, b), R)
      for (let S = 0; S < R.length; S++)
        y(p, R[S]);
    if (C) {
      let S = C.subTree;
      if (m === S || $a(S.type) && (S.ssContent === m || S.ssFallback === m)) {
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
      const N = p[x] = T ? bt(p[x]) : lt(p[x]);
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
    if (b && Bt(b, !1), (W = V.onVnodeBeforeUpdate) && nt(W, b, m, p), N && Vt(m, p, b, "beforeUpdate"), b && Bt(b, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    x && (!p.dynamicChildren || p.dynamicChildren.length !== x.length) && (P = 0, F = !1, x = null), (H.innerHTML && V.innerHTML == null || H.textContent && V.textContent == null) && d(T, ""), x ? ee(
      p.dynamicChildren,
      x,
      T,
      b,
      R,
      fs(m, C),
      S
    ) : F || ce(
      p,
      m,
      T,
      null,
      b,
      R,
      fs(m, C),
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
    ((W = V.onVnodeUpdated) || N) && He(() => {
      W && nt(W, b, m, p), N && Vt(m, p, b, "updated");
    }, R);
  }, ee = (p, m, b, R, C, S, F) => {
    for (let T = 0; T < m.length; T++) {
      const P = p[T], x = m[T], N = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        P.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (P.type === Ie || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Nn(P, x) || // - In the case of a component, it could contain anything.
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
          !qn(S) && !(S in b) && s(
            p,
            S,
            m[S],
            null,
            C,
            R
          );
      for (const S in b) {
        if (qn(S)) continue;
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
    (m.key != null || C && m === C.subTree) && Va(
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
    ) : Ce(
      m,
      b,
      R,
      C,
      S,
      F,
      P
    ) : we(p, m, P);
  }, Ce = (p, m, b, R, C, S, F) => {
    const T = p.component = Bd(
      p,
      R,
      C
    );
    if (ti(p) && (T.ctx.renderer = qe), $d(T, !1, F), T.asyncDep) {
      if (C && C.registerDep(T, G, F), !p.el) {
        const P = T.subTree = St(Mt);
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
  }, we = (p, m, b) => {
    const R = m.component = p.component;
    if (xd(p, m, b))
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
          const Ve = Ba(p);
          if (Ve) {
            H && (H.el = se.el, J(p, H, F)), Ve.asyncDep.then(() => {
              He(() => {
                p.isUnmounted || x();
              }, C);
            });
            return;
          }
        }
        let ie = H, ve;
        Bt(p, !1), H ? (H.el = se.el, J(p, H, F)) : H = se, V && os(V), (ve = H.props && H.props.onVnodeBeforeUpdate) && nt(ve, Q, H, se), Bt(p, !0);
        const _e = el(p), Ke = p.subTree;
        p.subTree = _e, E(
          Ke,
          _e,
          // parent may have changed if it's in a teleport
          h(Ke.el),
          // anchor may have changed if it's in a fragment
          nn(Ke),
          p,
          C,
          S
        ), H.el = _e.el, ie === null && Rd(p, _e.el), W && He(W, C), (ve = H.props && H.props.onVnodeUpdated) && He(
          () => nt(ve, Q, H, se),
          C
        );
      } else {
        let H;
        const { el: V, props: W } = m, { bm: Q, m: se, parent: ie, root: ve, type: _e } = p, Ke = Zn(m);
        Bt(p, !1), Q && os(Q), !Ke && (H = W && W.onVnodeBeforeMount) && nt(H, ie, m), Bt(p, !0);
        {
          ve.ce && ve.ce._hasShadowRoot() && ve.ce._injectChildStyle(
            _e,
            p.parent ? p.parent.type : void 0
          );
          const Ve = p.subTree = el(p);
          E(
            null,
            Ve,
            b,
            R,
            p,
            C,
            S
          ), m.el = Ve.el;
        }
        if (se && He(se, C), !Ke && (H = W && W.onVnodeMounted)) {
          const Ve = m;
          He(
            () => nt(H, ie, Ve),
            C
          );
        }
        (m.shapeFlag & 256 || ie && Zn(ie.vnode) && ie.vnode.shapeFlag & 256) && p.a && He(p.a, C), p.isMounted = !0, m = b = R = null;
      }
    };
    p.scope.on();
    const P = p.effect = new ta(T);
    p.scope.off();
    const x = p.update = P.run.bind(P), N = p.job = P.runIfDirty.bind(P);
    N.i = p, N.id = p.uid, P.scheduler = () => Qs(N), Bt(p, !0), x();
  }, J = (p, m, b) => {
    m.component = p;
    const R = p.vnode.props;
    p.vnode = m, p.next = null, Md(p, m.props, R, b), Od(p, m.children, b), xt(), qi(p), Rt();
  }, ce = (p, m, b, R, C, S, F, T, P = !1) => {
    const x = p && p.children, N = p ? p.shapeFlag : 0, H = m.children, { patchFlag: V, shapeFlag: W } = m;
    if (V > 0) {
      if (V & 128) {
        At(
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
        Me(
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
    W & 8 ? (N & 16 && zt(x, C, S), H !== x && d(b, H)) : N & 16 ? W & 16 ? At(
      x,
      H,
      b,
      R,
      C,
      S,
      F,
      T,
      P
    ) : zt(x, C, S, !0) : (N & 8 && d(b, ""), W & 16 && K(
      H,
      b,
      R,
      C,
      S,
      F,
      T,
      P
    ));
  }, Me = (p, m, b, R, C, S, F, T, P) => {
    p = p || vn, m = m || vn;
    const x = p.length, N = m.length, H = Math.min(x, N);
    let V;
    for (V = 0; V < H; V++) {
      const W = m[V] = P ? bt(m[V]) : lt(m[V]);
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
    x > N ? zt(
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
  }, At = (p, m, b, R, C, S, F, T, P) => {
    let x = 0;
    const N = m.length;
    let H = p.length - 1, V = N - 1;
    for (; x <= H && x <= V; ) {
      const W = p[x], Q = m[x] = P ? bt(m[x]) : lt(m[x]);
      if (Nn(W, Q))
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
      const W = p[H], Q = m[V] = P ? bt(m[V]) : lt(m[V]);
      if (Nn(W, Q))
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
            m[x] = P ? bt(m[x]) : lt(m[x]),
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
        ze(p[x], C, S, !0), x++;
    else {
      const W = x, Q = x, se = /* @__PURE__ */ new Map();
      for (x = Q; x <= V; x++) {
        const Pe = m[x] = P ? bt(m[x]) : lt(m[x]);
        Pe.key != null && se.set(Pe.key, x);
      }
      let ie, ve = 0;
      const _e = V - Q + 1;
      let Ke = !1, Ve = 0;
      const Ge = new Array(_e);
      for (x = 0; x < _e; x++) Ge[x] = 0;
      for (x = W; x <= H; x++) {
        const Pe = p[x];
        if (ve >= _e) {
          ze(Pe, C, S, !0);
          continue;
        }
        let Be;
        if (Pe.key != null)
          Be = se.get(Pe.key);
        else
          for (ie = Q; ie <= V; ie++)
            if (Ge[ie - Q] === 0 && Nn(Pe, m[ie])) {
              Be = ie;
              break;
            }
        Be === void 0 ? ze(Pe, C, S, !0) : (Ge[Be - Q] = x + 1, Be >= Ve ? Ve = Be : Ke = !0, E(
          Pe,
          m[Be],
          b,
          null,
          C,
          S,
          F,
          T,
          P
        ), ve++);
      }
      const Ot = Ke ? Td(Ge) : vn;
      for (ie = Ot.length - 1, x = _e - 1; x >= 0; x--) {
        const Pe = Q + x, Be = m[Pe], rn = m[Pe + 1], yr = Pe + 1 < N ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          rn.el || Na(rn)
        ) : R;
        Ge[x] === 0 ? E(
          null,
          Be,
          b,
          yr,
          C,
          S,
          F,
          T,
          P
        ) : Ke && (ie < 0 || x !== Ot[ie] ? pt(Be, b, yr, 2) : ie--);
      }
    }
  }, pt = (p, m, b, R, C = null) => {
    const { el: S, type: F, transition: T, children: P, shapeFlag: x } = p;
    if (x & 6) {
      pt(p.component.subTree, m, b, R);
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
    if (F === Ie) {
      r(S, m, b);
      for (let H = 0; H < P.length; H++)
        pt(P[H], m, b, R);
      r(p.anchor, m, b);
      return;
    }
    if (F === ds) {
      O(p, m, b);
      return;
    }
    if (R !== 2 && x & 1 && T)
      if (R === 0)
        T.persisted && !S[us] ? r(S, m, b) : (T.beforeEnter(S), r(S, m, b), He(() => T.enter(S), C));
      else {
        const { leave: H, delayLeave: V, afterLeave: W } = T, Q = () => {
          p.ctx.isUnmounted ? o(S) : r(S, m, b);
        }, se = () => {
          const ie = S._isLeaving || !!S[us];
          S._isLeaving && S[us](
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
  }, ze = (p, m, b, R = !1, C = !1) => {
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
    if (H === -2 && (C = !1), T != null && (xt(), Yn(T, null, b, p, !0), Rt()), W != null && (m.renderCache[W] = void 0), N & 256) {
      m.ctx.deactivate(p);
      return;
    }
    const se = N & 1 && V, ie = !Zn(p);
    let ve;
    if (ie && (ve = F && F.onVnodeBeforeUnmount) && nt(ve, m, p), N & 6)
      Cn(p.component, b, R);
    else {
      if (N & 128) {
        p.suspense.unmount(b, R);
        return;
      }
      se && Vt(p, null, m, "beforeUnmount"), N & 64 ? p.type.remove(
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
      (S !== Ie || H > 0 && H & 64) ? zt(
        x,
        m,
        b,
        !1,
        !0
      ) : (S === Ie && H & 384 || !C && N & 16) && zt(P, m, b), R && fe(p);
    }
    const _e = Q != null && W == null;
    (ie && (ve = F && F.onVnodeUnmounted) || se || _e) && He(() => {
      ve && nt(ve, m, p), se && Vt(p, null, m, "unmounted"), _e && (p.el = null);
    }, b);
  }, fe = (p) => {
    const { type: m, el: b, anchor: R, transition: C } = p;
    if (m === Ie) {
      Ue(b, R);
      return;
    }
    if (m === ds) {
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
  }, Cn = (p, m, b) => {
    const { bum: R, scope: C, job: S, subTree: F, um: T, m: P, a: x } = p;
    rl(P), rl(x), R && os(R), C.stop(), S && (S.flags |= 8, ze(F, p, m, b)), T && He(T, m), He(() => {
      p.isUnmounted = !0;
    }, m);
  }, zt = (p, m, b, R = !1, C = !1, S = 0) => {
    for (let F = S; F < p.length; F++)
      ze(p[F], m, b, R, C);
  }, nn = (p) => {
    if (p.shapeFlag & 6)
      return nn(p.component.subTree);
    if (p.shapeFlag & 128)
      return p.suspense.next();
    const m = w(p.anchor || p.el), b = m && m[Zf];
    return b ? w(b) : m;
  };
  let Mn = !1;
  const wr = (p, m, b) => {
    let R;
    p == null ? m._vnode && (ze(m._vnode, null, null, !0), R = m._vnode.component) : E(
      m._vnode || null,
      p,
      m,
      null,
      null,
      null,
      b
    ), m._vnode = p, Mn || (Mn = !0, qi(R), ya(), Mn = !1);
  }, qe = {
    p: E,
    um: ze,
    m: pt,
    r: fe,
    mt: Ce,
    mc: K,
    pc: ce,
    pbc: ee,
    n: nn,
    o: e
  };
  return {
    render: wr,
    hydrate: void 0,
    createApp: vd(wr)
  };
}
function fs({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Bt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function kd(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Va(e, t, n = !1) {
  const r = e.children, o = t.children;
  if (q(r) && q(o))
    for (let s = 0; s < r.length; s++) {
      const i = r[s];
      let a = o[s];
      a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = o[s] = bt(o[s]), a.el = i.el), !n && a.patchFlag !== -2 && Va(i, a)), a.type === Co && (a.patchFlag === -1 && (a = o[s] = bt(a)), a.el = i.el), a.type === Mt && !a.el && (a.el = i.el);
    }
}
function Td(e) {
  const t = e.slice(), n = [0];
  let r, o, s, i, a;
  const u = e.length;
  for (r = 0; r < u; r++) {
    const f = e[r];
    if (f !== 0) {
      if (o = n[n.length - 1], e[o] < f) {
        t[r] = o, n.push(r);
        continue;
      }
      for (s = 0, i = n.length - 1; s < i; )
        a = s + i >> 1, e[n[a]] < f ? s = a + 1 : i = a;
      f < e[n[s]] && (s > 0 && (t[r] = n[s - 1]), n[s] = r);
    }
  }
  for (s = n.length, i = n[s - 1]; s-- > 0; )
    n[s] = i, i = t[i];
  return n;
}
function Ba(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Ba(t);
}
function rl(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function Na(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? Na(t.subTree) : null;
}
const $a = (e) => e.__isSuspense;
function Fd(e, t) {
  t && t.pendingBranch ? q(e) ? t.effects.push(...e) : t.effects.push(e) : Wf(e);
}
const Ie = /* @__PURE__ */ Symbol.for("v-fgt"), Co = /* @__PURE__ */ Symbol.for("v-txt"), Mt = /* @__PURE__ */ Symbol.for("v-cmt"), ds = /* @__PURE__ */ Symbol.for("v-stc"), qt = [];
let je = null;
function ne(e = !1) {
  qt.push(je = e ? null : []);
}
function Wa() {
  qt.pop(), je = qt[qt.length - 1] || null;
}
let or = 1;
function ol(e, t = !1) {
  or += e, e < 0 && je && t && (je.hasOnce = !0);
}
function Ua(e) {
  return e.dynamicChildren = or > 0 ? je || vn : null, Wa(), or > 0 && je && je.push(e), e;
}
function oe(e, t, n, r, o, s) {
  return Ua(
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
function Hd(e, t, n, r, o) {
  return Ua(
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
function qa(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Nn(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Ga = ({ key: e }) => e ?? null, Zr = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? be(e) || /* @__PURE__ */ Ae(e) || X(e) ? { i: ut, r: e, k: t, f: !!n } : e : null);
function xe(e, t = null, n = null, r = 0, o = null, s = e === Ie ? 0 : 1, i = !1, a = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Ga(t),
    ref: t && Zr(t),
    scopeId: _a,
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
    ctx: ut
  };
  return a ? (io(u, n), s & 128 && e.normalize(u)) : n && (u.shapeFlag |= be(n) ? 8 : 16), or > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  je && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (u.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  u.patchFlag !== 32 && je.push(u), u;
}
const St = Ld;
function Ld(e, t = null, n = null, r = 0, o = null, s = !1) {
  if ((!e || e === ud) && (e = Mt), qa(e)) {
    const a = Sn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && io(a, n), or > 0 && !s && je && (a.shapeFlag & 6 ? je[je.indexOf(e)] = a : je.push(a)), a.patchFlag = -2, a;
  }
  if (Gd(e) && (e = e.__vccOpts), t) {
    t = jd(t);
    let { class: a, style: u } = t;
    a && !be(a) && (t.class = st(a)), de(u) && (/* @__PURE__ */ Js(u) && !q(u) && (u = Oe({}, u)), t.style = ot(u));
  }
  const i = be(e) ? 1 : $a(e) ? 128 : So(e) ? 64 : de(e) ? 4 : X(e) ? 2 : 0;
  return xe(
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
function jd(e) {
  return e ? /* @__PURE__ */ Js(e) || Fa(e) ? Oe({}, e) : e : null;
}
function Sn(e, t, n = !1, r = !1) {
  const { props: o, ref: s, patchFlag: i, children: a, transition: u } = e, f = t ? zd(o || {}, t) : o, d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && Ga(f),
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
    patchFlag: t && e.type !== Ie ? i === -1 ? 16 : i | 16 : i,
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
    ssContent: e.ssContent && Sn(e.ssContent),
    ssFallback: e.ssFallback && Sn(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return u && r && ei(
    d,
    u.clone(d)
  ), d;
}
function Ds(e = " ", t = 0) {
  return St(Co, null, e, t);
}
function Ye(e = "", t = !1) {
  return t ? (ne(), Hd(Mt, null, e)) : St(Mt, null, e);
}
function lt(e) {
  return e == null || typeof e == "boolean" ? St(Mt) : q(e) ? St(
    Ie,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : qa(e) ? bt(e) : St(Co, null, String(e));
}
function bt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Sn(e);
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
      !o && !Fa(t) ? t._ctx = ut : o === 3 && ut && (ut.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (X(t)) {
    if (r & 65) {
      io(e, { default: t });
      return;
    }
    t = { default: t, _ctx: ut }, n = 32;
  } else
    t = String(t), r & 64 ? (n = 16, t = [Ds(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function zd(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === "class")
        t.class !== r.class && (t.class = st([t.class, r.class]));
      else if (o === "style")
        t.style = ot([t.style, r.style]);
      else if (po(o)) {
        const s = t[o], i = r[o];
        i && s !== i && !(q(s) && s.includes(i)) ? t[o] = s ? [].concat(s, i) : i : i == null && s == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !ho(o) && (t[o] = i);
      } else o !== "" && (t[o] = r[o]);
  }
  return t;
}
function nt(e, t, n, r = null) {
  et(e, t, 7, [
    n,
    r
  ]);
}
const Kd = Oa();
let Vd = 0;
function Bd(e, t, n) {
  const r = e.type, o = (t ? t.appContext : e.appContext) || Kd, s = {
    uid: Vd++,
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
    scope: new hf(
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
    propsOptions: La(r, o),
    emitsOptions: Pa(r, o),
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
  return s.ctx = { _: s }, s.root = t ? t.root : s, s.emit = yd.bind(null, s), e.ce && e.ce(s), s;
}
let Te = null;
const Nd = () => Te || ut;
let lo, sr;
{
  const e = vo(), t = (n, r) => {
    let o;
    return (o = e[n]) || (o = e[n] = []), o.push(r), (s) => {
      o.length > 1 ? o.forEach((i) => i(s)) : o[0](s);
    };
  };
  lo = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Te = n
  ), sr = t(
    "__VUE_SSR_SETTERS__",
    (n) => ir = n
  );
}
const dr = (e) => {
  const t = Te;
  return lo(e), e.scope.on(), () => {
    e.scope.off(), lo(t);
  };
}, sl = () => {
  Te && Te.scope.off(), lo(null);
};
function Xa(e) {
  return e.vnode.shapeFlag & 4;
}
let ir = !1;
function $d(e, t = !1, n = !1) {
  t && sr(t);
  const { props: r, children: o } = e.vnode, s = Xa(e);
  Cd(e, r, s, t), Ad(e, o, n || t);
  const i = s ? Wd(e, t) : void 0;
  return t && sr(!1), i;
}
function Wd(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, cd);
  const { setup: r } = n;
  if (r) {
    xt();
    const o = e.setupContext = r.length > 1 ? qd(e) : null, s = dr(e), i = fr(
      r,
      e,
      0,
      [
        e.props,
        o
      ]
    ), a = Ul(i);
    if (Rt(), s(), (a || e.sp) && !Zn(e) && Ca(e), a) {
      if (i.then(sl, sl), t)
        return i.then((u) => {
          sr(!0);
          try {
            il(e, u, t);
          } finally {
            sr(!1);
          }
        }).catch((u) => {
          _o(u, e, 0);
        });
      e.asyncDep = i;
    } else
      il(e, i);
  } else
    Ya(e);
}
function il(e, t, n) {
  X(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : de(t) && (e.setupState = ma(t)), Ya(e);
}
function Ya(e, t, n) {
  const r = e.type;
  e.render || (e.render = r.render || ct);
  {
    const o = dr(e);
    xt();
    try {
      fd(e);
    } finally {
      Rt(), o();
    }
  }
}
const Ud = {
  get(e, t) {
    return Ee(e, "get", ""), e[t];
  }
};
function qd(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Ud),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function oi(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(ma(Ff(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in Jn)
        return Jn[n](e);
    },
    has(t, n) {
      return n in t || n in Jn;
    }
  })) : e.proxy;
}
function Gd(e) {
  return X(e) && "__vccOpts" in e;
}
const $ = (e, t) => /* @__PURE__ */ Kf(e, t, ir), Xd = "3.5.42";
/**
* @vue/runtime-dom v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let ks;
const ll = typeof window < "u" && window.trustedTypes;
if (ll)
  try {
    ks = /* @__PURE__ */ ll.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Za = ks ? (e) => ks.createHTML(e) : (e) => e, Yd = "http://www.w3.org/2000/svg", Zd = "http://www.w3.org/1998/Math/MathML", yt = typeof document < "u" ? document : null, al = yt && /* @__PURE__ */ yt.createElement("template"), Jd = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const o = t === "svg" ? yt.createElementNS(Yd, e) : t === "mathml" ? yt.createElementNS(Zd, e) : n ? yt.createElement(e, { is: n }) : yt.createElement(e);
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
    const i = n ? n.previousSibling : t.lastChild;
    if (o && (o === s || o.nextSibling))
      for (; t.insertBefore(o.cloneNode(!0), n), !(o === s || !(o = o.nextSibling)); )
        ;
    else {
      al.innerHTML = Za(
        r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e
      );
      const a = al.content;
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
      i ? i.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, Qd = /* @__PURE__ */ Symbol("_vtc");
function eg(e, t, n) {
  const r = e[Qd];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const ul = /* @__PURE__ */ Symbol("_vod"), tg = /* @__PURE__ */ Symbol("_vsh"), ng = /* @__PURE__ */ Symbol(""), rg = /(?:^|;)\s*display\s*:/;
function og(e, t, n) {
  const r = e.style, o = be(n);
  let s = !1;
  if (n && !o) {
    if (t)
      if (be(t))
        for (const i of t.split(";")) {
          const a = i.slice(0, i.indexOf(":")).trim();
          n[a] == null && Un(r, a, "");
        }
      else
        for (const i in t)
          n[i] == null && Un(r, i, "");
    for (const i in n) {
      i === "display" && (s = !0);
      const a = n[i];
      a != null ? ig(
        e,
        i,
        !be(t) && t ? t[i] : void 0,
        a
      ) || Un(r, i, a) : Un(r, i, "");
    }
  } else if (o) {
    if (t !== n) {
      const i = r[ng];
      i && (n += ";" + i), r.cssText = n, s = rg.test(n);
    }
  } else t && e.removeAttribute("style");
  ul in e && (e[ul] = s ? r.display : "", e[tg] && (r.display = "none"));
}
const Br = /\s*!important$/;
function Un(e, t, n) {
  if (q(n))
    n.forEach((r) => Un(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--"))
    Br.test(n) ? e.setProperty(t, n.replace(Br, ""), "important") : e.setProperty(t, n);
  else {
    const r = sg(e, t);
    Br.test(n) ? e.setProperty(
      Zt(r),
      n.replace(Br, ""),
      "important"
    ) : e[r] = n;
  }
}
const cl = ["Webkit", "Moz", "ms"], gs = {};
function sg(e, t) {
  const n = gs[t];
  if (n)
    return n;
  let r = Ze(t);
  if (r !== "filter" && r in e)
    return gs[t] = r;
  r = Xl(r);
  for (let o = 0; o < cl.length; o++) {
    const s = cl[o] + r;
    if (s in e)
      return gs[t] = s;
  }
  return t;
}
function ig(e, t, n, r) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && be(r) && n === r;
}
const fl = "http://www.w3.org/1999/xlink";
function dl(e, t, n, r, o, s = gf(t)) {
  r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(fl, t.slice(6, t.length)) : e.setAttributeNS(fl, t, n) : n == null || s && !Zl(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    s ? "" : ft(n) ? String(n) : n
  );
}
function gl(e, t, n, r, o) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Za(n) : n);
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
  let i = !1;
  if (n === "" || n == null) {
    const a = typeof e[t];
    a === "boolean" ? n = Zl(n) : n == null && a === "string" ? (n = "", i = !0) : a === "number" && (n = 0, i = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  i && e.removeAttribute(o || t);
}
function lg(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function ag(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const pl = /* @__PURE__ */ Symbol("_vei");
function ug(e, t, n, r, o = null) {
  const s = e[pl] || (e[pl] = {}), i = s[t];
  if (r && i)
    i.value = r;
  else {
    const [a, u] = dg(t);
    if (r) {
      const f = s[t] = hg(
        r,
        o
      );
      lg(e, a, f, u);
    } else i && (ag(e, a, i, u), s[t] = void 0);
  }
}
const cg = /(Once|Passive|Capture)$/, fg = /^on:?(?:Once|Passive|Capture)$/;
function dg(e) {
  let t, n;
  for (; (n = e.match(cg)) && !fg.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : Zt(e.slice(2)), t];
}
let ps = 0;
const gg = /* @__PURE__ */ Promise.resolve(), pg = () => ps || (gg.then(() => ps = 0), ps = Date.now());
function hg(e, t) {
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
      const i = o.slice(), a = [r];
      for (let u = 0; u < i.length && !r._stopped; u++) {
        const f = i[u];
        f && et(
          f,
          t,
          5,
          a
        );
      }
    } else
      et(
        o,
        t,
        5,
        [r]
      );
  };
  return n.value = e, n.attached = pg(), n;
}
const hl = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, mg = (e, t, n, r, o, s) => {
  const i = o === "svg";
  t === "class" ? eg(e, r, i) : t === "style" ? og(e, n, r) : po(t) ? ho(t) || ug(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : vg(e, t, r, i)) ? (gl(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && dl(e, t, r, i, s, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (wg(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !be(r))) ? gl(e, Ze(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), dl(e, t, r, i));
};
function vg(e, t, n, r) {
  if (r)
    return !!(t === "innerHTML" || t === "textContent" || t in e && hl(t) && X(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return hl(t) && be(n) ? !1 : t in e;
}
function wg(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const r = Ze(t);
  return Array.isArray(n) ? n.some((o) => Ze(o) === r) : Object.keys(n).some((o) => Ze(o) === r);
}
const yg = ["ctrl", "shift", "alt", "meta"], bg = {
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
  exact: (e, t) => yg.some((n) => e[`${n}Key`] && !t.includes(n))
}, gn = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), r = t.join(".");
  return n[r] || (n[r] = (o, ...s) => {
    for (let i = 0; i < t.length; i++) {
      const a = bg[t[i]];
      if (a && a(o, t)) return;
    }
    return e(o, ...s);
  });
}, _g = /* @__PURE__ */ Oe({ patchProp: mg }, Jd);
let ml;
function Sg() {
  return ml || (ml = Pd(_g));
}
const xg = (...e) => {
  const t = Sg().createApp(...e), { mount: n } = t;
  return t.mount = (r) => {
    const o = Cg(r);
    if (!o) return;
    const s = t._component;
    !X(s) && !s.render && !s.template && (s.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const i = n(o, !1, Rg(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), i;
  }, t;
};
function Rg(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Cg(e) {
  return be(e) ? document.querySelector(e) : e;
}
function Nr() {
  return !0;
}
const Mg = Symbol("merge-proxy"), Jr = Symbol("merge-proxy-sources"), Ig = {
  get(e, t, n) {
    return t === Mg ? n : t === Jr ? e.sources : e.get(t);
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
function Ts(...e) {
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
  }, Ig);
}
function vl(...e) {
  const t = {};
  for (let n of e)
    if (n = Qr(n), !!n)
      for (const r of Reflect.ownKeys(n)) {
        const o = n[r];
        o !== void 0 && (t[r] = o);
      }
  return t;
}
function Ja(e) {
  return typeof e == "function" ? e : (t) => {
    var n;
    return (n = e.next) == null ? void 0 : n.call(e, t);
  };
}
function Eg(e) {
  return Object.assign(e, {
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: ye(e, Ja(t), { flush: "sync" }) })
  });
}
function Ag(e) {
  return Object.assign(e, {
    set: (t) => {
      e.value = typeof t == "function" ? t(e.value) : t;
    },
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: ye(e, Ja(t), { flush: "sync" }) })
  });
}
function Og() {
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
    createReadonlyAtom: (t, n) => Eg($(() => t())),
    createWritableAtom: (t, n) => Ag(/* @__PURE__ */ Hf(t)),
    untrack: (t) => t(),
    batch: (t) => t()
  };
}
function Mo(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function dt(e) {
  if (Array.isArray(e)) return e.map(dt);
  if (e && typeof e == "object") {
    const t = Object.getPrototypeOf(e);
    if (t !== Object.prototype && t !== null) return e;
    const n = t === null ? te() : {}, r = Object.keys(e);
    for (let o = 0; o < r.length; o++) {
      const s = r[o];
      Object.defineProperty(n, s, {
        configurable: !0,
        enumerable: !0,
        value: dt(e[s]),
        writable: !0
      });
    }
    return n;
  }
  return e;
}
function Qa(e, t) {
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
function Jt(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function gr(e, t) {
  return (n) => {
    var r;
    (((r = t.options.atoms) == null ? void 0 : r[e]) ?? t.baseAtoms[e]).set((o) => Mo(n, o));
  };
}
function wl(e) {
  if (typeof e != "object" || e === null) return !1;
  if (Array.isArray(e)) return !0;
  const t = Object.getPrototypeOf(e);
  return t === Object.prototype || t === null;
}
function yl(e) {
  return Reflect.ownKeys(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
const Pg = 3;
function Dg(e, t) {
  return eu(e, t, Pg);
}
function eu(e, t, n) {
  if (Object.is(e, t)) return !0;
  if (n <= 0 || !wl(e) || !wl(t) || (Array.isArray(e) || Array.isArray(t)) && (!Array.isArray(e) || !Array.isArray(t) || e.length !== t.length))
    return !1;
  const r = yl(e), o = yl(t);
  if (r.length !== o.length) return !1;
  const s = e, i = t;
  for (let a = 0; a < r.length; a++) {
    const u = r[a];
    if (!Object.prototype.propertyIsEnumerable.call(t, u) || !eu(s[u], i[u], n - 1)) return !1;
  }
  return !0;
}
function Io(e, t, n, r = Dg) {
  const o = `on${t.charAt(0).toUpperCase()}${t.slice(1)}Change`, s = e.options[o];
  s && s((i) => {
    const a = Mo(n, i);
    return r(i, a) ? i : a;
  });
}
function kg(e) {
  return e instanceof Function;
}
function Tg(e, t) {
  const n = [], r = (o) => {
    o.forEach((s) => {
      n.push(s);
      const i = t(s);
      i.length && r(i);
    });
  };
  return r(e), n;
}
const Fg = ({ fn: e, memoDeps: t, onAfterCompare: n, onAfterUpdate: r, onBeforeCompare: o, onBeforeUpdate: s }) => {
  let i = [], a;
  return (f) => {
    o == null || o();
    const d = t == null ? void 0 : t(f);
    let h = !d || d.length !== (i == null ? void 0 : i.length);
    if (!h && d) {
      for (let w = 0; w < d.length; w++) if (d[w] !== i[w]) {
        h = !0;
        break;
      }
    }
    return n == null || n(h), h && (i = d, s == null || s(), a = e(...d ?? []), r == null || r(a)), a;
  };
};
function tu(e) {
  let t = !1;
  return () => {
    if (!t) {
      t = !0;
      return;
    }
    e();
  };
}
function pr({ feature: e, fnName: t, objectId: n, onAfterUpdate: r, table: o, ...s }) {
  const i = () => {
    if (!r) return;
    const { schedule: u, untrack: f } = o._reactivity;
    u(() => f(() => r()));
  };
  return Fg({
    ...s,
    ...{ onAfterUpdate: () => {
      i();
    } }
  });
}
function nu(e, t = "_") {
  const [n, r] = e.split(t);
  return {
    fnKey: r,
    fnName: `${n}.${r}`,
    parentName: n
  };
}
function gt(e, t, n) {
  for (const [r, { fn: o, memoDeps: s }] of Object.entries(n)) {
    const { fnKey: i, fnName: a } = nu(r);
    t[i] = s ? pr({
      memoDeps: s,
      fn: o,
      fnName: a,
      table: t,
      feature: e
    }) : o;
  }
}
function tt(e, t, n, r) {
  for (const [o, { fn: s, memoDeps: i }] of Object.entries(r)) {
    const { fnKey: a, fnName: u } = nu(o);
    if (i) {
      const f = `_memo_${a}`;
      t[a] = function(...d) {
        if (!this[f]) {
          const h = this;
          this[f] = pr({
            memoDeps: (w) => i(h, w),
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
function Hg(e) {
  return e.row.getValue(e.column.id);
}
function Lg(e) {
  return e.getValue() ?? e.table.options.renderFallbackValue;
}
function jg(e) {
  return {
    table: e.table,
    column: e.column,
    row: e.row,
    cell: e,
    getValue: () => e.getValue(),
    renderValue: () => e.renderValue()
  };
}
const zg = { assignCellPrototype: (e, t) => {
  tt("coreCellsFeature", e, t, {
    cell_getValue: { fn: (n) => Hg(n) },
    cell_renderValue: { fn: (n) => Lg(n) },
    cell_getContext: {
      fn: (n) => jg(n),
      memoDeps: (n) => [n]
    }
  });
} };
function Kg(e) {
  var t, n;
  if (!e._headerPrototype) {
    e._headerPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignHeaderPrototype) == null || n.call(t, e._headerPrototype, e);
  }
  return e._headerPrototype;
}
function ru(e, t, n) {
  const r = Kg(e), o = Object.create(r);
  o.colSpan = 0, o.column = t, o.depth = n.depth, o.headerGroup = null, o.id = n.id ?? t.id, o.index = n.index, o.isPlaceholder = !!n.isPlaceholder, o.placeholderId = n.placeholderId, o.rowSpan = 0, o.subHeaders = [];
  const s = e._headerInstanceInitFns;
  for (let i = 0; i < s.length; i++) s[i](o);
  return o;
}
function Qt() {
  return {
    start: [],
    end: []
  };
}
function Vg(e) {
  var s;
  const t = e.getAllColumns(), n = e.getAllLeafColumnsById(), { start: r } = ((s = e.atoms.columnPinning) == null ? void 0 : s.get()) ?? Qt(), o = [];
  for (let i = 0; i < r.length; i++) {
    const a = n[r[i]];
    a && Z(a, "getIsVisible", We) && o.push(a);
  }
  return lr(t, o, e, "start");
}
function Bg(e) {
  var s;
  const t = e.getAllColumns(), n = e.getAllLeafColumnsById(), { end: r } = ((s = e.atoms.columnPinning) == null ? void 0 : s.get()) ?? Qt(), o = [];
  for (let i = 0; i < r.length; i++) {
    const a = n[r[i]];
    a && Z(a, "getIsVisible", We) && o.push(a);
  }
  return lr(t, o, e, "end");
}
function Ng(e) {
  var s;
  const t = e.getAllColumns();
  let n = Z(e, "getVisibleLeafColumns", si);
  const { start: r, end: o } = ((s = e.atoms.columnPinning) == null ? void 0 : s.get()) ?? Qt();
  if (r.length || o.length) {
    const i = [...r, ...o];
    n = n.filter((a) => !i.includes(a.id));
  }
  return lr(t, n, e, "center");
}
function $g(e) {
  var o;
  const { start: t } = ((o = e.atoms.columnPinning) == null ? void 0 : o.get()) ?? Qt(), n = e.getAllLeafColumnsById(), r = [];
  for (let s = 0; s < t.length; s++) {
    const i = n[t[s]];
    i && r.push(i);
  }
  return r;
}
function Wg(e) {
  var o;
  const { end: t } = ((o = e.atoms.columnPinning) == null ? void 0 : o.get()) ?? Qt(), n = e.getAllLeafColumnsById(), r = [];
  for (let s = 0; s < t.length; s++) {
    const i = n[t[s]];
    i && r.push(i);
  }
  return r;
}
function Ug(e) {
  var o;
  const { start: t, end: n } = ((o = e.atoms.columnPinning) == null ? void 0 : o.get()) ?? Qt();
  if (!t.length && !n.length) return e.getAllLeafColumns();
  const r = [...t, ...n];
  return e.getAllLeafColumns().filter((s) => !r.includes(s.id));
}
function qg(e) {
  return Z(e, "getStartLeafColumns", $g).filter((t) => Z(t, "getIsVisible", We));
}
function Gg(e) {
  return Z(e, "getEndLeafColumns", Wg).filter((t) => Z(t, "getIsVisible", We));
}
function Xg(e) {
  return Z(e, "getCenterLeafColumns", Ug).filter((t) => Z(t, "getIsVisible", We));
}
function $r(e, t) {
  return t ? t === "start" ? Z(e, "getStartVisibleLeafColumns", qg) : t === "end" ? Z(e, "getEndVisibleLeafColumns", Gg) : Z(e, "getCenterVisibleLeafColumns", Xg) : Z(e, "getVisibleLeafColumns", si);
}
function We(e) {
  var r;
  const t = (r = e.table.atoms.columnVisibility) == null ? void 0 : r.get();
  if (!t) return !0;
  const n = e.columns;
  return n.length ? n.some((o) => Z(o, "getIsVisible", We)) : (Jt(t, e.id) ? t[e.id] : void 0) ?? !0;
}
function si(e) {
  return e.getAllLeafColumns().filter((t) => Z(t, "getIsVisible", We));
}
function ou(e, t = 1) {
  let n = t;
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    Z(o, "getIsVisible", We) && o.columns.length && (n = Math.max(n, ou(o.columns, t + 1)));
  }
  return n;
}
function Yg(e, t) {
  return e ? `${e}_${t}` : String(t);
}
function Zg(e, t, n, r) {
  let o = e ?? "";
  return t && (o = o ? `${o}_${t}` : String(t)), n && (o = o ? `${o}_${n}` : n), r && (o = o ? `${o}_${r}` : r), o;
}
function Jg(e, t) {
  let n = 0;
  for (let r = 0; r < e.length; r++) e[r].column === t && n++;
  return n;
}
function su(e, t, n, r, o, s) {
  const i = {
    depth: t,
    id: Yg(r, t),
    headers: []
  }, a = [];
  for (let u = 0; u < e.length; u++) {
    if (!(u in e)) continue;
    const f = e[u], d = a[a.length - 1], h = f.column.depth === i.depth;
    let w, y = !1;
    if (h && f.column.parent ? w = f.column.parent : (w = f.column, y = !0), d && d.column === w) d.subHeaders.push(f);
    else {
      const I = ru(n, w, {
        id: Zg(r, t, w.id, f.id),
        isPlaceholder: y,
        placeholderId: y ? String(Jg(a, w)) : void 0,
        depth: t,
        index: a.length
      });
      I.subHeaders.push(f), a.push(I);
    }
    i.headers.push(f), f.headerGroup = i;
  }
  for (let u = 0; u < s.length; u++) s[u](i);
  o.push(i), t > 0 && su(a, t - 1, n, r, o, s);
}
function iu(e) {
  for (let t = 0; t < e.length; t++) {
    const n = e[t];
    if (!Z(n.column, "getIsVisible", We)) continue;
    let r = 0;
    if (n.subHeaders.length) {
      iu(n.subHeaders);
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
function lr(e, t, n, r) {
  var u;
  const o = ou(e), s = [], i = n._headerGroupInstanceInitFns, a = new Array(t.length);
  for (let f = 0; f < t.length; f++)
    f in t && (a[f] = ru(n, t[f], {
      depth: o,
      index: f
    }));
  return su(a, o - 1, n, r, s, i), s.reverse(), iu(((u = s[0]) == null ? void 0 : u.headers) ?? []), s;
}
function Qg(e) {
  var t, n;
  if (!e._columnPrototype) {
    e._columnPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignColumnPrototype) == null || n.call(t, e._columnPrototype, e);
  }
  return e._columnPrototype;
}
function ep(e, t, n, r) {
  const o = {
    ...e.getDefaultColumnDef(),
    ...t
  }, s = o.accessorKey, i = s === void 0 ? void 0 : String(s), a = o.id ?? (i == null ? void 0 : i.replaceAll(".", "_")) ?? (typeof o.header == "string" ? o.header : void 0);
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
  const f = Qg(e), d = Object.create(f);
  d.accessorFn = u, d.columnDef = o, d.columns = [], d.depth = n, d.id = `${String(a)}`, d.parent = r;
  const h = e._columnInstanceInitFns;
  for (let w = 0; w < h.length; w++) h[w](d);
  return d;
}
function lu(e) {
  var n;
  const t = (n = e.atoms.columnOrder) == null ? void 0 : n.get();
  return (r) => {
    let o = [];
    if (!(t != null && t.length)) o = r;
    else {
      const s = /* @__PURE__ */ new Map();
      for (let i = 0; i < r.length; i++) {
        const a = r[i];
        s.set(a.id, a);
      }
      for (let i = 0; i < t.length; i++) {
        const a = t[i], u = s.get(a);
        u && (o.push(u), s.delete(a));
      }
      for (let i = 0; i < r.length; i++) {
        const a = r[i];
        s.has(a.id) && o.push(a);
      }
    }
    return tp(e, o);
  };
}
function tp(e, t) {
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
  const i = [];
  for (let u = 0; u < n.length; u++) {
    const f = s.get(n[u]);
    f && i.push(f);
  }
  return [...i, ...o];
}
function np(e) {
  return [e, ...e.columns.flatMap((t) => t.getFlatColumns())];
}
function rp(e) {
  if (e.columns.length) {
    const t = e.columns.flatMap((n) => n.getLeafColumns());
    return Z(e.table, "getOrderColumns", lu)(t);
  }
  return [e];
}
function op(e) {
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
function au(e, t, n, r = 0) {
  const o = new Array(t.length);
  for (let s = 0; s < t.length; s++) {
    if (!(s in t)) continue;
    const i = t[s], a = ep(e, i, r, n), u = i;
    a.columns = u.columns ? au(e, u.columns, a, r + 1) : [], o[s] = a;
  }
  return o;
}
function sp(e) {
  return au(e, e.options.columns);
}
function ip(e) {
  return e.getAllColumns().flatMap((t) => t.getFlatColumns());
}
function lp(e) {
  const t = te(), n = e.getAllFlatColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function ap(e) {
  const t = e.getAllColumns().flatMap((n) => n.getLeafColumns());
  return Z(e, "getOrderColumns", lu)(t);
}
function up(e) {
  const t = te(), n = e.getAllLeafColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function cp(e, t) {
  return e.getAllFlatColumnsById()[t];
}
const fp = {
  assignColumnPrototype: (e, t) => {
    tt("coreColumnsFeature", e, t, {
      column_getFlatColumns: {
        fn: (n) => np(n),
        memoDeps: (n) => [n.table.options.columns]
      },
      column_getLeafColumns: {
        fn: (n) => rp(n),
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
    gt("coreColumnsFeature", e, {
      table_getDefaultColumnDef: {
        fn: () => op(e),
        memoDeps: () => [e.options.defaultColumn]
      },
      table_getAllColumns: {
        fn: () => sp(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumns: {
        fn: () => ip(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumnsById: {
        fn: () => lp(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllLeafColumns: {
        fn: () => ap(e),
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
        fn: () => up(e),
        memoDeps: () => [e.getAllLeafColumns()]
      },
      table_getColumn: { fn: (t) => cp(e, t) }
    });
  }
};
function uu(e, t) {
  for (let n = 0; n < e.subHeaders.length; n++) uu(e.subHeaders[n], t);
  t.push(e);
}
function dp(e) {
  const t = [];
  return uu(e, t), t;
}
function gp(e) {
  return {
    column: e.column,
    header: e,
    table: e.column.table
  };
}
function pp(e) {
  var f;
  const { start: t, end: n } = ((f = e.atoms.columnPinning) == null ? void 0 : f.get()) ?? Qt(), r = e.getAllColumns(), o = Z(e, "getVisibleLeafColumns", si);
  if (!t.length && !n.length) return lr(r, o, e);
  const s = e.getAllLeafColumnsById(), i = [];
  for (let d = 0; d < t.length; d++) {
    const h = s[t[d]];
    h && Z(h, "getIsVisible", We) && i.push(h);
  }
  const a = [];
  for (let d = 0; d < n.length; d++) {
    const h = s[n[d]];
    h && Z(h, "getIsVisible", We) && a.push(h);
  }
  const u = o.filter((d) => !t.includes(d.id) && !n.includes(d.id));
  return lr(r, [
    ...i,
    ...u,
    ...a
  ], e);
}
function hp(e) {
  return [...e.getHeaderGroups()].reverse();
}
function mp(e) {
  const t = e.getHeaderGroups(), n = [];
  for (let r = 0; r < t.length; r++) {
    const o = t[r].headers;
    for (let s = 0; s < o.length; s++) n.push(o[s]);
  }
  return n;
}
function vp(e) {
  var r;
  const t = ((r = e.getHeaderGroups()[0]) == null ? void 0 : r.headers) ?? [], n = [];
  for (let o = 0; o < t.length; o++) {
    const s = t[o].getLeafHeaders();
    for (let i = 0; i < s.length; i++) n.push(s[i]);
  }
  return n;
}
const wp = {
  assignHeaderPrototype: (e, t) => {
    tt("coreHeadersFeature", e, t, {
      header_getLeafHeaders: {
        fn: (n) => dp(n),
        memoDeps: (n) => [n.column.table.options.columns]
      },
      header_getContext: {
        fn: (n) => gp(n),
        memoDeps: (n) => [n.column.table.options.columns]
      }
    });
  },
  constructTableAPIs: (e) => {
    gt("coreHeadersFeature", e, {
      table_getHeaderGroups: {
        fn: () => pp(e),
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
        fn: () => hp(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getFlatHeaders: {
        fn: () => mp(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getLeafHeaders: {
        fn: () => vp(e),
        memoDeps: () => [e.getHeaderGroups()]
      }
    });
  }
};
function yp(e) {
  var t, n;
  if (!e._rowPrototype) {
    e._rowPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignRowPrototype) == null || n.call(t, e._rowPrototype, e);
  }
  return e._rowPrototype;
}
const bp = (e, t, n, r, o, s, i) => {
  const a = yp(e), u = Object.create(a);
  u._displayIndexCache = -1, u._uniqueValuesCache = te(), u._valuesCache = te(), u.depth = o, u.id = t, u.index = r, u.original = n, u.parentId = i, u.subRows = [];
  const f = e._rowInstanceInitFns;
  for (let d = 0; d < f.length; d++) f[d](u);
  return u;
}, _p = /([0-9]+)/gm;
function xn(e) {
  const t = Object.assign((n, r, o) => {
    let s = n.getValue(o), i = r.getValue(o);
    const a = t.resolveDataValue;
    return a && (s = a(s), i = a(i)), t.sort(s, i, n, r, o);
  }, e);
  return t;
}
const Sp = xn({
  resolveDataValue: (e) => Eo(e).toLowerCase(),
  sort: (e, t) => fu(e, t)
});
xn({
  resolveDataValue: (e) => Eo(e),
  sort: (e, t) => fu(e, t)
});
const xp = xn({
  resolveDataValue: (e) => Eo(e).toLowerCase(),
  sort: (e, t) => ii(e, t)
});
xn({
  resolveDataValue: (e) => Eo(e),
  sort: (e, t) => ii(e, t)
});
xn({
  resolveDataValue: (e) => Rp(e),
  sort: (e, t) => e > t ? 1 : e < t ? -1 : 0
});
const cu = xn({ sort: (e, t) => ii(e, t) });
function ii(e, t) {
  return e === t ? 0 : e > t ? 1 : -1;
}
function Rp(e) {
  return e instanceof Date ? e.getTime() : e;
}
function Eo(e) {
  return typeof e == "number" ? isNaN(e) || e === 1 / 0 || e === -1 / 0 ? "" : String(e) : typeof e == "string" ? e : "";
}
function fu(e, t) {
  let n = 0, r = 0;
  const o = e.length, s = t.length;
  for (; n < o && r < s; ) {
    const i = ao(e.charCodeAt(n)), a = ao(t.charCodeAt(r)), u = Fs(e, n, i), f = Fs(t, r, a);
    if (!i && !a) {
      const h = Cp(e, n, u, t, r, f);
      if (h) return h;
      n = u, r = f;
      continue;
    }
    if (i !== a) return i ? 1 : -1;
    const d = Mp(e, n, u, t, r, f);
    if (d) return d;
    n = u, r = f;
  }
  return _l(e, n) - _l(t, r);
}
function ao(e) {
  return e >= 48 && e <= 57;
}
function Fs(e, t, n) {
  let r = t + 1;
  for (; r < e.length && ao(e.charCodeAt(r)) === n; ) r++;
  return r;
}
function Cp(e, t, n, r, o, s) {
  const i = n - t, a = s - o, u = i < a ? i : a;
  for (let f = 0; f < u; f++) {
    const d = e.charCodeAt(t + f), h = r.charCodeAt(o + f);
    if (d > h) return 1;
    if (h > d) return -1;
  }
  return i > a ? 1 : a > i ? -1 : 0;
}
function Mp(e, t, n, r, o, s) {
  let i = t;
  for (; i < n && e.charCodeAt(i) === 48; ) i++;
  let a = o;
  for (; a < s && r.charCodeAt(a) === 48; ) a++;
  const u = n - i, f = s - a;
  if (u === 0 && f === 0) return 0;
  if (u <= 15 && f <= 15) {
    const w = bl(e, i, n), y = bl(r, a, s);
    return w > y ? 1 : y > w ? -1 : 0;
  }
  const d = parseInt(e.slice(t, n), 10), h = parseInt(r.slice(o, s), 10);
  return d > h ? 1 : h > d ? -1 : 0;
}
function bl(e, t, n) {
  let r = 0;
  for (let o = t; o < n; o++) r = r * 10 + e.charCodeAt(o) - 48;
  return r;
}
function _l(e, t) {
  let n = 0, r = t;
  for (; r < e.length; )
    n++, r = Fs(e, r, ao(e.charCodeAt(r)));
  return n;
}
function Ip() {
  return [];
}
function Ep(e, t) {
  Io(e, "cellSelection", dt(e.initialState.cellSelection) ?? Ip());
}
function Ap(e) {
  e.atoms.cellSelection && (e.options.autoResetAll ?? e.options.autoResetCellSelection ?? !0) && e._reactivity.schedule(() => Ep(e));
}
function Op() {
  return te();
}
function du(e) {
  e.atoms.expanded && (e.options.autoResetAll ?? e.options.autoResetExpanded ?? !e.options.manualExpanding) && e._reactivity.schedule(() => pu(e));
}
function uo(e, t) {
  var n, r;
  (r = (n = e.options).onExpandedChange) == null || r.call(n, t);
}
function gu(e, t) {
  var r;
  const n = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t ?? !mu(e)) {
    if (n === !0 || !hu(e)) return;
    uo(e, !0);
  } else {
    if (n !== !0 && !Object.keys(n).length) return;
    uo(e, te());
  }
}
function pu(e, t) {
  const n = e.initialState.expanded;
  Io(e, "expanded", t ? te() : n === !0 ? !0 : Object.assign(te(), dt(n ?? {})));
}
function hu(e) {
  return e.getPrePaginatedRowModel().flatRows.some((t) => Xt(t));
}
function Pp(e) {
  return (t) => {
    gu(e);
  };
}
function Dp(e) {
  var n;
  const t = ((n = e.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return t === !0 || Object.values(t).some(Boolean);
}
function mu(e) {
  var r;
  const t = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t === !0) return !0;
  if (!Object.keys(t).length) return !1;
  const n = e.getRowModel().flatRows.filter((o) => Xt(o));
  return !(!n.length || n.some((o) => !Ao(o)));
}
function kp(e) {
  var r;
  let t = 0;
  const n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return (n === !0 ? Object.values(e.getRowModel().rowsById).filter((o) => Xt(o)).map((o) => o.id) : Object.keys(n ?? {})).forEach((o) => {
    const s = o.split(".");
    t = Math.max(t, s.length);
  }), t;
}
function vu(e, t) {
  var s;
  const n = ((s = e.table.atoms.expanded) == null ? void 0 : s.get()) ?? {}, r = n === !0 || Hs(n, e.id), o = t ?? !r;
  o !== r && (o && !Xt(e) || uo(e.table, (i) => {
    const a = i === !0 ? !0 : Hs(i, e.id);
    let u = te();
    if (i === !0 ? Object.values(e.table.getRowModel().rowsById).forEach((f) => {
      Xt(f) && (u[f.id] = !0);
    }) : u = Object.assign(te(), i), !a && o)
      return u[e.id] = !0, u;
    if (a && !o) {
      const f = te(), d = Object.keys(u);
      for (let h = 0; h < d.length; h++) {
        const w = d[h];
        w !== e.id && u[w] && (f[w] = !0);
      }
      return f;
    }
    return i;
  }));
}
function Ao(e) {
  var n, r, o;
  const t = ((n = e.table.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return !!(((o = (r = e.table.options).getIsRowExpanded) == null ? void 0 : o.call(r, e)) ?? (t === !0 || Hs(t, e.id)));
}
function Hs(e, t) {
  return !!(e && e !== !0 && Jt(e, t) && e[t]);
}
function Xt(e) {
  var t, n;
  return ((n = (t = e.table.options).getRowCanExpand) == null ? void 0 : n.call(t, e)) ?? ((e.table.options.enableExpanding ?? !0) && !!e.subRows.length);
}
function Tp(e) {
  let t = !0, n = e;
  for (; t && n.parentId; )
    n = e.table.getRow(n.parentId, !0), t = Ao(n);
  return t;
}
function Fp(e) {
  const t = Xt(e);
  return () => {
    t && vu(e);
  };
}
const Ls = 0;
function wu(e) {
  var t, n;
  if (e.options.autoResetAll ?? e.options.autoResetPageIndex ?? !e.options.manualPagination) {
    if ((((n = (t = e.atoms.pagination) == null ? void 0 : t.get()) == null ? void 0 : n.pageIndex) ?? Ls) === Ls) return;
    jp(e);
  }
}
function Hp(e, t) {
  Io(e, "pagination", t);
}
function Lp(e, t) {
  Hp(e, (n) => {
    let r = Mo(t, n.pageIndex);
    const o = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
    return r = Math.max(0, Math.min(r, o)), {
      ...n,
      pageIndex: r
    };
  });
}
function jp(e, t) {
  Lp(e, Ls);
}
function zp() {
  return [];
}
function Oo(e, t) {
  Io(e, "sorting", t);
}
function yu(e, t) {
  Oo(e, t ? [] : dt(e.initialState.sorting ?? []));
}
function Kp(e) {
  e.atoms.sorting && (e.options.autoResetAll ?? e.options.autoResetSorting ?? !1) && yu(e);
}
function bu(e) {
  const t = e.table._rowModelFns.sortFns, n = e.table.getFilteredRowModel().flatRows.slice(0, 10);
  let r, o = !1;
  for (let s = 0; s < n.length; s++) {
    const i = n[s].getValue(e.id);
    if (Object.prototype.toString.call(i) === "[object Date]") {
      r = "datetime";
      break;
    }
    if (typeof i == "string" && (o = !0, i.split(_p).length > 1)) {
      r = "alphanumeric";
      break;
    }
  }
  if (!r && o && (r = "text"), r) {
    let s = t == null ? void 0 : t[r];
    if (s || r === "alphanumeric" && (s = t == null ? void 0 : t.text), s) return s;
  }
  return cu;
}
function _u(e) {
  const t = e.table.getFilteredRowModel().flatRows.slice(0, 10);
  for (let n = 0; n < t.length; n++) {
    const r = t[n].getValue(e.id);
    if (r != null)
      return typeof r == "string" ? "asc" : "desc";
  }
  return "desc";
}
function Su(e) {
  const t = e.table._rowModelFns.sortFns;
  return kg(e.columnDef.sortFn) ? e.columnDef.sortFn : e.columnDef.sortFn === "auto" ? bu(e) : (t == null ? void 0 : t[e.columnDef.sortFn]) ?? cu;
}
function xu(e, t, n) {
  const r = Cu(e, n && co(e)), o = typeof t < "u";
  Oo(e.table, (s) => {
    const i = s.findIndex((w) => w.id === e.id), a = i === -1 ? void 0 : s[i];
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
function Ru(e) {
  return e.columnDef.sortDescFirst ?? e.table.options.sortDescFirst ?? _u(e) === "desc" ? "desc" : "asc";
}
function Cu(e, t) {
  const n = Ru(e), r = Mu(e);
  return r ? r !== n && (e.table.options.enableSortingRemoval ?? !0) && (!t || (e.table.options.enableMultiRemove ?? !0)) ? !1 : r === "desc" ? "asc" : "desc" : n;
}
function li(e) {
  return (e.columnDef.enableSorting ?? !0) && (e.table.options.enableSorting ?? !0) && !!e.accessorFn;
}
function co(e) {
  return e.columnDef.enableMultiSort ?? e.table.options.enableMultiSort ?? !!e.accessorFn;
}
function Mu(e) {
  var n, r;
  const t = (r = (n = e.table.atoms.sorting) == null ? void 0 : n.get()) == null ? void 0 : r.find((o) => o.id === e.id);
  return t ? t.desc ? "desc" : "asc" : !1;
}
function Vp(e) {
  var t, n;
  return ((n = (t = e.table.atoms.sorting) == null ? void 0 : t.get()) == null ? void 0 : n.findIndex((r) => r.id === e.id)) ?? -1;
}
function Bp(e) {
  Oo(e.table, (t) => t.length ? t.filter((n) => n.id !== e.id) : []);
}
function Np(e) {
  const t = li(e);
  return (n) => {
    var r, o;
    t && xu(e, void 0, co(e) ? (o = (r = e.table.options).isMultiSortEvent) == null ? void 0 : o.call(r, n) : !1);
  };
}
function Iu() {
  return (e) => pr({
    feature: "coreRowModelsFeature",
    table: e,
    fnName: "table.getCoreRowModel",
    memoDeps: () => [e.options.data],
    fn: () => $p(e, e.options.data),
    onAfterUpdate: tu(() => {
      du(e), wu(e), Kp(e), Ap(e);
    })
  });
}
function Eu(e, t, n, r = 0, o) {
  var i;
  const s = [];
  for (let a = 0; a < n.length; a++) {
    const u = n[a], f = bp(e, e.getRowId(u, a, o), u, a, r, void 0, o == null ? void 0 : o.id);
    t.flatRows.push(f), t.rowsById[f.id] = f, s.push(f), e.options.getSubRows && (f.originalSubRows = e.options.getSubRows(u, a), (i = f.originalSubRows) != null && i.length && (f.subRows = Eu(e, t, f.originalSubRows, r + 1, f)));
  }
  return s;
}
function $p(e, t) {
  const n = {
    rows: [],
    flatRows: [],
    rowsById: te()
  };
  return n.rows = Eu(e, n, t), n;
}
function Wp(e) {
  var t, n;
  return e._rowModels.coreRowModel || (e._rowModels.coreRowModel = ((n = (t = e.options.features).coreRowModel) == null ? void 0 : n.call(t, e)) ?? Iu()(e)), e._rowModels.coreRowModel();
}
function Up(e) {
  return e.getCoreRowModel();
}
function qp(e) {
  var t, n;
  return e._rowModels.filteredRowModel || (e._rowModels.filteredRowModel = (n = (t = e.options.features).filteredRowModel) == null ? void 0 : n.call(t, e)), e.options.manualFiltering || !e._rowModels.filteredRowModel ? e.getPreFilteredRowModel() : e._rowModels.filteredRowModel();
}
function Gp(e) {
  return e.getFilteredRowModel();
}
function Xp(e) {
  var t, n;
  return e._rowModels.groupedRowModel || (e._rowModels.groupedRowModel = (n = (t = e.options.features).groupedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualGrouping || !e._rowModels.groupedRowModel ? e.getPreGroupedRowModel() : e._rowModels.groupedRowModel();
}
function Yp(e) {
  return e.getGroupedRowModel();
}
function Zp(e) {
  var t, n;
  return e._rowModels.sortedRowModel || (e._rowModels.sortedRowModel = (n = (t = e.options.features).sortedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualSorting || !e._rowModels.sortedRowModel ? e.getPreSortedRowModel() : e._rowModels.sortedRowModel();
}
function Jp(e) {
  return e.getSortedRowModel();
}
function Qp(e) {
  var t, n;
  return e._rowModels.expandedRowModel || (e._rowModels.expandedRowModel = (n = (t = e.options.features).expandedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualExpanding || !e._rowModels.expandedRowModel ? e.getPreExpandedRowModel() : e._rowModels.expandedRowModel();
}
function eh(e) {
  return e.getExpandedRowModel();
}
function th(e) {
  var t, n;
  return e._rowModels.paginatedRowModel || (e._rowModels.paginatedRowModel = (n = (t = e.options.features).paginatedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualPagination || !e._rowModels.paginatedRowModel ? e.getPrePaginatedRowModel() : e._rowModels.paginatedRowModel();
}
function nh(e) {
  return e.getPaginatedRowModel();
}
const rh = { constructTableAPIs: (e) => {
  gt("coreRowModelsFeature", e, {
    table_getCoreRowModel: { fn: () => Wp(e) },
    table_getPreFilteredRowModel: { fn: () => Up(e) },
    table_getFilteredRowModel: { fn: () => qp(e) },
    table_getPreGroupedRowModel: { fn: () => Gp(e) },
    table_getGroupedRowModel: { fn: () => Xp(e) },
    table_getPreSortedRowModel: { fn: () => Yp(e) },
    table_getSortedRowModel: { fn: () => Zp(e) },
    table_getPreExpandedRowModel: { fn: () => Jp(e) },
    table_getExpandedRowModel: { fn: () => Qp(e) },
    table_getPrePaginatedRowModel: { fn: () => eh(e) },
    table_getPaginatedRowModel: { fn: () => th(e) },
    table_getRowModel: { fn: () => nh(e) }
  });
} };
function oh(e) {
  var t, n;
  if (!e._cellPrototype) {
    e._cellPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignCellPrototype) == null || n.call(t, e._cellPrototype, e);
  }
  return e._cellPrototype;
}
function sh(e, t, n) {
  const r = oh(n), o = Object.create(r);
  o.column = e, o.id = `${t.id}_${e.id}`, o.row = t;
  const s = n._cellInstanceInitFns;
  for (let i = 0; i < s.length; i++) s[i](o);
  return o;
}
function ih(e) {
  const t = e.table.getRowsInDisplayOrder(), n = e._displayIndexCache;
  return t[n] === e ? n : -1;
}
function lh(e) {
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
function ah(e, t) {
  if (Jt(e._valuesCache, t)) return e._valuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return e._valuesCache[t] = n.accessorFn(e.original, e.index), e._valuesCache[t];
}
function uh(e, t) {
  if (Jt(e._uniqueValuesCache, t)) return e._uniqueValuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return n.columnDef.getUniqueValues ? (e._uniqueValuesCache[t] = n.columnDef.getUniqueValues(e.original, e.index), e._uniqueValuesCache[t]) : (e._uniqueValuesCache[t] = [e.getValue(t)], e._uniqueValuesCache[t]);
}
function ch(e, t) {
  return e.getValue(t) ?? e.table.options.renderFallbackValue;
}
function fh(e) {
  return Tg(e.subRows, (t) => t.subRows);
}
function dh(e) {
  const t = e.getCoreRowModel().flatRows;
  let n = 0;
  for (let r = 0; r < t.length; r++) n = Math.max(n, t[r].depth);
  return n;
}
function gh(e) {
  if (e.parentId)
    return e.table.getCoreRowModel().rowsById[e.parentId] ?? e.table.getRow(e.parentId, !0);
}
function ph(e) {
  const t = [];
  let n = e;
  for (; ; ) {
    const r = n.getParentRow();
    if (!r) break;
    t.push(r), n = r;
  }
  return t.reverse();
}
function hh(e) {
  const t = e.table.getAllLeafColumns();
  let n = e._cellsCache;
  n || (n = e._cellsCache = /* @__PURE__ */ new WeakMap());
  const r = new Array(t.length);
  for (let o = 0; o < t.length; o++) {
    const s = t[o];
    let i = n.get(s);
    i || (i = sh(s, e, e.table), n.set(s, i)), r[o] = i;
  }
  return r;
}
function mh(e) {
  const t = te(), n = e.getAllCells();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.column.id] = o;
  }
  return t;
}
function vh(e, t, n, r) {
  var o, s;
  return ((s = (o = t.options).getRowId) == null ? void 0 : s.call(o, e, n, r)) ?? (r ? `${r.id}.${n}` : String(n));
}
function wh(e, t, n) {
  let r = (n ? e.getPrePaginatedRowModel() : e.getRowModel()).rowsById[t];
  if (!r && (r = e.getCoreRowModel().rowsById[t], !r))
    throw new Error();
  return r;
}
const yh = {
  assignRowPrototype: (e, t) => {
    tt("coreRowsFeature", e, t, {
      row_getDisplayIndex: { fn: (n) => ih(n) },
      row_getAllCellsByColumnId: {
        fn: (n) => mh(n),
        memoDeps: (n) => [n.getAllCells()]
      },
      row_getAllCells: {
        fn: (n) => hh(n),
        memoDeps: (n) => [n.table.getAllLeafColumns()]
      },
      row_getLeafRows: {
        fn: (n) => fh(n),
        memoDeps: (n) => [n.subRows]
      },
      row_getParentRow: { fn: (n) => gh(n) },
      row_getParentRows: { fn: (n) => ph(n) },
      row_getUniqueValues: { fn: (n, r) => uh(n, r) },
      row_getValue: { fn: (n, r) => ah(n, r) },
      row_renderValue: { fn: (n, r) => ch(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    gt("coreRowsFeature", e, {
      table_getRowsInDisplayOrder: {
        fn: () => lh(e),
        memoDeps: () => {
          var t;
          return [
            e.getPrePaginatedRowModel().rows,
            e.options.paginateExpandedRows,
            e.options.paginateExpandedRows === !1 ? (t = e.atoms.expanded) == null ? void 0 : t.get() : void 0
          ];
        }
      },
      table_getRowId: { fn: (t, n, r) => vh(t, e, n, r) },
      table_getRow: { fn: (t, n) => wh(e, t, n) },
      table_getMaxSubRowDepth: {
        fn: () => dh(e),
        memoDeps: () => [e.getCoreRowModel()]
      }
    });
  }
};
function Au(e, t, n = (r, o) => r === o) {
  const r = t === void 0 ? e.options.state : t;
  e._reactivity.batch(() => {
    if (r) for (const o in r) {
      const s = e.baseAtoms[o];
      if (!s) continue;
      const i = r[o], a = i === void 0 ? e.initialState[o] : i;
      n(e._reactivity.untrack(() => s.get()), a) || s.set(() => a);
    }
  });
}
function bh(e, t, n = (r, o) => r === o) {
  e._reactivity.batch(() => {
    var r, o;
    Au(e, t, n), (o = (r = e._reactivity).commit) == null || o.call(r);
  });
}
function _h(e) {
  var r, o;
  const t = dt(e.initialState);
  e._reactivity.batch(() => {
    const s = Object.keys(t);
    for (let i = 0; i < s.length; i++) {
      const a = s[i];
      e.baseAtoms[a].set(t[a]);
    }
  });
  const n = Object.values(e._features);
  for (let s = 0; s < n.length; s++) (o = (r = n[s]).resetTableInstanceData) == null || o.call(r, e);
}
function Sh(e, t) {
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
function xh(e, t, n) {
  const r = Sh(e, Mo(t, e.options));
  e.optionsStore ? e.optionsStore.set(() => r) : e.options = r, bh(e, r.state ?? null);
}
const Rh = { constructTableAPIs: (e) => {
  gt("coreTablesFeature", e, {
    table_reset: { fn: () => _h(e) },
    table_setOptions: { fn: (t) => xh(e, t) }
  });
} }, Ch = {
  coreCellsFeature: zg,
  coreColumnsFeature: fp,
  coreHeadersFeature: wp,
  coreRowModelsFeature: rh,
  coreRowsFeature: yh,
  coreTablesFeature: Rh
};
function Mh(e) {
  const t = e;
  return Object.defineProperty(e, "state", { get() {
    return e.get();
  } }), "set" in e && (t.setState = e.set.bind(e)), t;
}
function Ih(e, t) {
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
  const n = Sl(e);
  if (n.length !== Sl(t).length) return !1;
  for (let r = 0; r < n.length; r++) if (!Object.prototype.hasOwnProperty.call(t, n[r]) || !Object.is(e[n[r]], t[n[r]])) return !1;
  return !0;
}
function Sl(e) {
  return Object.keys(e).concat(Object.getOwnPropertySymbols(e));
}
function Eh(e, t = {}) {
  return Object.values(e).forEach((n) => {
    var r;
    t = ((r = n.getInitialState) == null ? void 0 : r.call(n, t)) ?? t;
  }), dt(t);
}
function Ah(e) {
  var j, U;
  const t = e.features.coreReactivityFeature, { aggregationFns: n, columnMeta: r, coreRowModel: o, expandedRowModel: s, facetedMinMaxValues: i, facetedRowModel: a, facetedUniqueValues: u, filterFns: f, filterMeta: d, filteredRowModel: h, groupedRowModel: w, paginatedRowModel: y, sortFns: I, sortedRowModel: E, tableMeta: A, ...z } = e.features, M = {
    _cellInstanceInitFns: [],
    _columnInstanceInitFns: [],
    _features: {
      ...Ch,
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
    const me = ee.subscribe((we) => {
      Y || ue.set(we);
    }), Ce = ue.subscribe((we) => {
      Y = !0, ee.set(we), Y = !1;
    });
    t.addSubscription(me), t.addSubscription(Ce);
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
  })) : M.options = _, M.initialState = Eh(M._features, M.options.initialState);
  const D = Object.keys(M.initialState);
  for (let K = 0; K < D.length; K++) {
    const L = D[K];
    M.baseAtoms[L] = t.createWritableAtom(M.initialState[L], { debugName: `table/baseAtoms/${L}` }), M.atoms[L] = t.createReadonlyAtom(() => {
      var Ce;
      const ee = M.options, ue = (Ce = ee.atoms) == null ? void 0 : Ce[L], Y = ue ? ue.get() : M.baseAtoms[L].get();
      if (ue) return Y;
      const me = ee.state;
      if (me && Jt(me, L)) {
        const we = me[L];
        return we === void 0 ? M.initialState[L] : we;
      }
      return Y;
    }, { debugName: `table/atoms/${L}` });
  }
  Au(M), M.store = Mh(t.createReadonlyAtom(() => {
    const K = {};
    for (let L = 0; L < D.length; L++) {
      const ee = D[L];
      K[ee] = M.atoms[ee].get();
    }
    return K;
  }, {
    compare: Ih,
    debugName: "table/store"
  }));
  for (let K = 0; K < O.length; K++) {
    const L = O[K];
    (j = L.initTableInstanceData) == null || j.call(L, M), L.initCellInstanceData && M._cellInstanceInitFns.push(L.initCellInstanceData.bind(L)), L.initColumnInstanceData && M._columnInstanceInitFns.push(L.initColumnInstanceData.bind(L)), L.initHeaderGroupInstanceData && M._headerGroupInstanceInitFns.push(L.initHeaderGroupInstanceData.bind(L)), L.initHeaderInstanceData && M._headerInstanceInitFns.push(L.initHeaderInstanceData.bind(L)), L.initRowInstanceData && M._rowInstanceInitFns.push(L.initRowInstanceData.bind(L)), (U = L.constructTableAPIs) == null || U.call(L, M);
  }
  return M;
}
function Oh() {
  return te();
}
function Ou() {
  return {
    size: 150,
    minSize: 20,
    maxSize: Number.MAX_SAFE_INTEGER
  };
}
function Po(e) {
  var o;
  const t = Ou(), n = (o = e.table.atoms.columnSizing) == null ? void 0 : o.get(), r = n && Jt(n, e.id) ? n[e.id] : void 0;
  return Math.min(Math.max(e.columnDef.minSize ?? t.minSize, r ?? e.columnDef.size ?? t.size), e.columnDef.maxSize ?? t.maxSize);
}
function Wr(e) {
  const t = te(), n = te(), r = new Array(e.length);
  let o = 0;
  for (let i = 0; i < e.length; i++) {
    const a = e[i], u = Z(a, "getSize", Po);
    r[i] = u, t[a.id] = o, o += u;
  }
  let s = 0;
  for (let i = e.length - 1; i >= 0; i--)
    n[e[i].id] = s, s += r[i];
  return {
    starts: t,
    afters: n
  };
}
function ai(e) {
  return {
    all: Wr($r(e)),
    center: Wr($r(e, "center")),
    start: Wr($r(e, "start")),
    end: Wr($r(e, "end"))
  };
}
function Pu(e) {
  return e === "start" ? "start" : e === "end" ? "end" : e === "center" ? "center" : "all";
}
function Ph(e, t) {
  return Z(e.table, "getColumnOffsets", ai)[Pu(t)].starts[e.id] ?? 0;
}
function Dh(e, t) {
  return Z(e.table, "getColumnOffsets", ai)[Pu(t)].afters[e.id] ?? 0;
}
function kh(e) {
  Do(e.table, (t) => {
    const n = te(), r = Object.keys(t);
    for (let o = 0; o < r.length; o++) {
      const s = r[o];
      s !== e.id && (n[s] = t[s]);
    }
    return n;
  });
}
function Du(e) {
  if (!e.subHeaders.length) return Po(e.column);
  let t = 0;
  for (let n = 0; n < e.subHeaders.length; n++) t += Du(e.subHeaders[n]);
  return t;
}
function en(e) {
  return Du(e);
}
function ku(e) {
  var t;
  if (e.index > 0) {
    const n = (t = e.headerGroup) == null ? void 0 : t.headers[e.index - 1];
    if (n) return Z(n, "getStart", ku) + Z(n, "getSize", en);
  }
  return 0;
}
function Do(e, t) {
  var n, r;
  (r = (n = e.options).onColumnSizingChange) == null || r.call(n, t);
}
function Th(e, t) {
  Do(e, t ? te() : Object.assign(te(), dt(e.initialState.columnSizing ?? {})));
}
function Fh(e) {
  var t;
  return ((t = e.getHeaderGroups()[0]) == null ? void 0 : t.headers.reduce((n, r) => n + en(r), 0)) ?? 0;
}
function Hh(e) {
  var t;
  return ((t = Z(e, "getStartHeaderGroups", Vg)[0]) == null ? void 0 : t.headers.reduce((n, r) => n + en(r), 0)) ?? 0;
}
function Lh(e) {
  var t;
  return ((t = Z(e, "getCenterHeaderGroups", Ng)[0]) == null ? void 0 : t.headers.reduce((n, r) => n + en(r), 0)) ?? 0;
}
function jh(e) {
  var t;
  return ((t = Z(e, "getEndHeaderGroups", Bg)[0]) == null ? void 0 : t.headers.reduce((n, r) => n + en(r), 0)) ?? 0;
}
function js() {
  return {
    startOffset: null,
    startSize: null,
    deltaOffset: null,
    deltaPercentage: null,
    isResizingColumn: !1,
    columnSizingStart: []
  };
}
function Tu(e) {
  return (e.columnDef.enableResizing ?? !0) && (e.table.options.enableColumnResizing ?? !0);
}
function zh(e) {
  var t, n;
  return ((n = (t = e.table.atoms.columnResizing) == null ? void 0 : t.get()) == null ? void 0 : n.isResizingColumn) === e.id;
}
function Kh(e, t) {
  const n = e.table.getColumn(e.column.id), r = Tu(n);
  return (o) => {
    if (!r || hs(o) && o.touches.length > 1)
      return;
    const s = en(e), i = e.getLeafHeaders().map((D) => [D.column.id, Po(D.column)]), a = hs(o) ? Math.round(o.touches[0].clientX) : o.clientX, u = te(), f = (D, j) => {
      if (typeof j != "number") return;
      const U = n.table, K = U.options.columnResizeMode === "onChange" || D === "end";
      U._reactivity.batch(() => {
        Qn(U, (L) => {
          const ee = U.options.columnResizeDirection === "rtl" ? -1 : 1, ue = (j - (L.startOffset ?? 0)) * ee, Y = L.startSize ?? 0, me = Math.max(Y > 0 ? ue / Y : 0, -0.999999);
          if (K) {
            const Ce = L.columnSizingStart;
            for (let we = 0; we < Ce.length; we++) {
              const G = Ce[we], J = G[1];
              u[G[0]] = Math.round(Math.max(J > 0 ? J + J * me : ue / Ce.length, 0) * 100) / 100;
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
        f("end", D ?? w), Qn(n.table, (j) => ({
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
    }, _ = Bh() ? { passive: !1 } : !1;
    hs(o) ? (A == null || A.addEventListener("touchmove", M.moveHandler, _), A == null || A.addEventListener("touchend", M.upHandler, _), A == null || A.addEventListener("touchcancel", M.cancelHandler, _)) : (A == null || A.addEventListener("mousemove", z.moveHandler, _), A == null || A.addEventListener("mouseup", z.upHandler, _)), Qn(n.table, (D) => ({
      ...D,
      startOffset: a,
      startSize: s,
      deltaOffset: 0,
      deltaPercentage: 0,
      columnSizingStart: i,
      isResizingColumn: n.id
    }));
  };
}
function Qn(e, t) {
  var n, r;
  (r = (n = e.options).onColumnResizingChange) == null || r.call(n, t);
}
function Vh(e, t) {
  Qn(e, t ? js() : dt(e.initialState.columnResizing ?? js()));
}
let Ur = null;
function Bh() {
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
function hs(e) {
  return e.type === "touchstart";
}
const Nh = {
  getInitialState: (e) => ({
    columnResizing: js(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    columnResizeMode: "onEnd",
    columnResizeDirection: "ltr",
    onColumnResizingChange: gr("columnResizing", e)
  }),
  assignColumnPrototype: (e, t) => {
    tt("columnResizingFeature", e, t, {
      column_getCanResize: { fn: (n) => Tu(n) },
      column_getIsResizing: { fn: (n) => zh(n) }
    });
  },
  assignHeaderPrototype: (e, t) => {
    tt("columnResizingFeature", e, t, { header_getResizeHandler: { fn: (n, r) => Kh(n, r) } });
  },
  constructTableAPIs: (e) => {
    gt("columnResizingFeature", e, {
      table_setColumnResizing: { fn: (t) => Qn(e, t) },
      table_resetHeaderSizeInfo: { fn: (t) => Vh(e, t) }
    });
  }
}, $h = {
  getInitialState: (e) => ({
    columnSizing: Oh(),
    ...e
  }),
  getDefaultColumnDef: () => Ou(),
  getDefaultTableOptions: (e) => ({ onColumnSizingChange: gr("columnSizing", e) }),
  assignColumnPrototype: (e, t) => {
    tt("columnSizingFeature", e, t, {
      column_getSize: {
        fn: (n) => Po(n),
        memoDeps: (n) => {
          var r, o;
          return [t.options.columns, (o = (r = t.atoms.columnSizing) == null ? void 0 : r.get()) == null ? void 0 : o[n.id]];
        }
      },
      column_getStart: { fn: (n, r) => Ph(n, r) },
      column_getAfter: { fn: (n, r) => Dh(n, r) },
      column_resetSize: { fn: (n) => kh(n) }
    });
  },
  assignHeaderPrototype: (e, t) => {
    tt("columnSizingFeature", e, t, {
      header_getSize: {
        fn: (n) => en(n),
        memoDeps: (n) => {
          var r, o, s;
          return [t.options.columns, n.column.columns.length > 0 ? (r = t.atoms.columnSizing) == null ? void 0 : r.get() : (s = (o = t.atoms.columnSizing) == null ? void 0 : o.get()) == null ? void 0 : s[n.column.id]];
        }
      },
      header_getStart: {
        fn: (n) => ku(n),
        memoDeps: () => {
          var n, r, o, s, i;
          return [
            t.options.columns,
            (n = t.atoms.columnSizing) == null ? void 0 : n.get(),
            (r = t.atoms.columnOrder) == null ? void 0 : r.get(),
            (o = t.atoms.columnPinning) == null ? void 0 : o.get(),
            (s = t.atoms.columnVisibility) == null ? void 0 : s.get(),
            (i = t.atoms.grouping) == null ? void 0 : i.get(),
            t.options.groupedColumnMode
          ];
        }
      }
    });
  },
  constructTableAPIs: (e) => {
    gt("columnSizingFeature", e, {
      table_getColumnOffsets: {
        fn: () => ai(e),
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
      table_resetColumnSizing: { fn: (t) => Th(e, t) },
      table_getTotalSize: {
        fn: () => Fh(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.columnSizing) == null ? void 0 : t.get(), e.getHeaderGroups()];
        }
      },
      table_getStartTotalSize: {
        fn: () => Hh(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.columnSizing) == null ? void 0 : t.get(), e.getHeaderGroups()];
        }
      },
      table_getCenterTotalSize: {
        fn: () => Lh(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.columnSizing) == null ? void 0 : t.get(), e.getHeaderGroups()];
        }
      },
      table_getEndTotalSize: {
        fn: () => jh(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.columnSizing) == null ? void 0 : t.get(), e.getHeaderGroups()];
        }
      }
    });
  }
}, Wh = {
  getInitialState: (e) => ({
    expanded: Op(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onExpandedChange: gr("expanded", e),
    paginateExpandedRows: !0
  }),
  assignRowPrototype: (e, t) => {
    tt("rowExpandingFeature", e, t, {
      row_toggleExpanded: { fn: (n, r) => vu(n, r) },
      row_getIsExpanded: { fn: (n) => Ao(n) },
      row_getCanExpand: { fn: (n) => Xt(n) },
      row_getIsAllParentsExpanded: { fn: (n) => Tp(n) },
      row_getToggleExpandedHandler: { fn: (n) => Fp(n) }
    });
  },
  constructTableAPIs: (e) => {
    gt("rowExpandingFeature", e, {
      table_autoResetExpanded: { fn: () => du(e) },
      table_setExpanded: { fn: (t) => uo(e, t) },
      table_toggleAllRowsExpanded: { fn: (t) => gu(e, t) },
      table_resetExpanded: { fn: (t) => pu(e, t) },
      table_getCanSomeRowsExpand: { fn: () => hu(e) },
      table_getToggleAllRowsExpandedHandler: { fn: () => Pp(e) },
      table_getIsSomeRowsExpanded: { fn: () => Dp(e) },
      table_getIsAllRowsExpanded: { fn: () => mu(e) },
      table_getExpandedDepth: { fn: () => kp(e) }
    });
  }
};
function Uh() {
  return te();
}
function Rn(e, t) {
  var n, r;
  (r = (n = e.options).onRowSelectionChange) == null || r.call(n, t);
}
function qh(e, t) {
  e._lastSelectedRowId = null, Rn(e, t ? te() : Object.assign(te(), dt(e.initialState.rowSelection ?? {})));
}
function Fu(e, t, n) {
  e._lastSelectedRowId = null, Rn(e, (r) => {
    if (t = typeof t < "u" ? t : !Z(e, "getIsAllRowsSelected", ju), n != null && n.deselectAll && !t) return te();
    const o = Object.assign(te(), r), s = e.getPreGroupedRowModel().flatRows;
    if (t) {
      const i = /* @__PURE__ */ new Map();
      s.forEach((a) => {
        fo(a, i) && (o[a.id] = !0);
      });
    } else s.forEach((i) => {
      It(i) && delete o[i.id];
    });
    return o;
  });
}
function Hu(e, t, n) {
  e._lastSelectedRowId = null, Rn(e, (r) => {
    const o = typeof t < "u" ? t : !Z(e, "getIsAllPageRowsSelected", zu);
    if (n != null && n.deselectAll && !o) return te();
    const s = Object.assign(te(), r);
    return e.getRowModel().rows.forEach((i) => {
      To(s, i.id, o, !0, e, !0);
    }), s;
  });
}
function Gh(e) {
  return e.getCoreRowModel();
}
function Xh(e) {
  const t = e.getCoreRowModel();
  return Z(e, "getIsSomeRowsSelected", ko) ? fi(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: te()
  };
}
function Yh(e) {
  const t = e.getFilteredRowModel();
  return Z(e, "getIsSomeRowsSelected", ko) ? fi(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: te()
  };
}
function Zh(e) {
  const t = e.getSortedRowModel();
  return Z(e, "getIsSomeRowsSelected", ko) ? fi(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: te()
  };
}
function Lu(e) {
  var t;
  return Object.keys(((t = e.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function ju(e) {
  var o;
  const t = e.getFilteredRowModel().flatRows, n = ((o = e.atoms.rowSelection) == null ? void 0 : o.get()) ?? {};
  let r = !!(t.length && Object.keys(n).length);
  if (r) {
    const s = /* @__PURE__ */ new Map();
    t.some((i) => !hr(i, n) && fo(i, s)) && (r = !1);
  }
  return r;
}
function zu(e) {
  var s;
  const t = e.getPaginatedRowModel().flatRows, n = ((s = e.atoms.rowSelection) == null ? void 0 : s.get()) ?? {}, r = /* @__PURE__ */ new Map();
  let o = !1;
  for (let i = 0; i < t.length; i++) {
    const a = t[i];
    if (hr(a, n))
      !o && fo(a, r) && (o = !0);
    else if (fo(a, r)) return !1;
  }
  return o;
}
function ko(e) {
  return Z(e, "getSelectedRowIds", Lu).length > 0;
}
function Jh(e) {
  return e.getPaginatedRowModel().flatRows.filter((t) => It(t)).some((t) => ui(t) || Z(t, "getIsSomeSelected", Vu));
}
function Qh(e) {
  return (t) => {
    Fu(e, t.target.checked);
  };
}
function em(e) {
  return (t) => {
    Hu(e, t.target.checked);
  };
}
function Ku(e, t, n) {
  const r = ui(e);
  Rn(e.table, (o) => {
    t = typeof t < "u" ? t : !r;
    const s = Object.assign(te(), o);
    return To(s, e.id, t, ((n == null ? void 0 : n.selectChildren) ?? !0) && Gt(e), e.table), !t && (n != null && n.deselectParents) && Bu(s, e), s;
  });
}
function ui(e) {
  var t;
  return hr(e, ((t = e.table.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function Vu(e) {
  return di(e) === "some";
}
function tm(e) {
  return di(e) === "all";
}
function It(e) {
  const t = e.table.options;
  return typeof t.enableRowSelection == "function" ? t.enableRowSelection(e) : t.enableRowSelection ?? !0;
}
function ci(e) {
  const t = e.table.options;
  return typeof t.enableSubRowSelection == "function" ? t.enableSubRowSelection(e) : t.enableSubRowSelection ?? !0;
}
function Gt(e) {
  const t = e.table.options;
  return typeof t.enableMultiRowSelection == "function" ? t.enableMultiRowSelection(e) : t.enableMultiRowSelection ?? !0;
}
function nm(e, t) {
  const n = It(e);
  return (r) => {
    var u, f;
    if (!n) return;
    const o = r, s = e.table, i = o.target.checked, a = s._lastSelectedRowId;
    (!(s.options.enableRowRangeSelection !== !1 && a !== null && Gt(e) && (((f = (u = s.options).isRowRangeSelectionEvent) == null ? void 0 : f.call(u, r)) ?? !1)) || !rm(e, a, i, t)) && Ku(e, i, t), s._lastSelectedRowId = e.id;
  };
}
function rm(e, t, n, r) {
  const o = (r == null ? void 0 : r.selectChildren) ?? !0, s = e.table, i = s.getRowsInDisplayOrder(), a = s.getPrePaginatedRowModel().rowsById[t] ?? s.getCoreRowModel().rowsById[t];
  if (!a) return !1;
  const u = a.getDisplayIndex(), f = e.getDisplayIndex(), d = i[u], h = i[f];
  if (u < 0 || f < 0 || u >= i.length || f >= i.length || (d == null ? void 0 : d.id) !== a.id || (h == null ? void 0 : h.id) !== e.id || !Gt(a) || !Gt(e)) return !1;
  const w = Math.min(u, f), y = Math.max(u, f);
  return Rn(s, (I) => {
    const E = Object.assign(te(), I);
    for (let A = w; A <= y; A++) {
      const z = i[A];
      !It(z) || !Gt(z) || (To(E, z.id, n, o, s), !n && (r != null && r.deselectParents) && Bu(E, z));
    }
    return E;
  }), !0;
}
function To(e, t, n, r, o, s) {
  const i = o.getRow(t, !0);
  n ? (Gt(i) || Object.keys(e).forEach((a) => delete e[a]), It(i) && (e[t] = !0)) : (!s || It(i)) && delete e[t], r && i.subRows.length && ci(i) && i.subRows.forEach((a) => To(e, a.id, n, r, o, s));
}
function fo(e, t) {
  if (!It(e)) return !1;
  const n = e.table;
  if (n.options.enableSubRowSelection === !0) return !0;
  const r = e.parentId;
  if (r === void 0) return !0;
  const o = t.get(r);
  if (o !== void 0) return o;
  const s = n.getCoreRowModel().rowsById, i = [];
  let a = !0, u = r;
  for (; u !== void 0; ) {
    const f = t.get(u);
    if (f !== void 0) {
      a = f;
      break;
    }
    i.push(u);
    const d = s[u] ?? n.getRow(u, !0);
    if (!ci(d)) {
      a = !1;
      break;
    }
    u = d.parentId;
  }
  return i.forEach((f) => t.set(f, a)), a;
}
function Bu(e, t) {
  const n = t.table.getCoreRowModel().rowsById;
  let r = t.parentId;
  for (; r !== void 0; )
    delete e[r], r = (n[r] ?? t.table.getRow(r, !0)).parentId;
}
function Nu(e, t, n, r) {
  const o = [];
  for (let s = 0; s < e.length; s++) {
    const i = e[s], a = hr(i, t);
    if (a && (n.push(i), r[i.id] = i), i.subRows.length) {
      const u = Nu(i.subRows, t, n, r);
      if (a) {
        const f = Object.create(Object.getPrototypeOf(i));
        Qa(f, i), f.subRows = u, o.push(f);
      }
    } else a && o.push(i);
  }
  return o;
}
function fi(e, t) {
  var s;
  const n = [], r = te(), o = ((s = t.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  return {
    rows: Nu(e.rows, o, n, r),
    flatRows: n,
    rowsById: r
  };
}
function hr(e, t) {
  return !!(Jt(t, e.id) && t[e.id]);
}
function di(e) {
  var s;
  if (!e.subRows.length) return !1;
  const t = ((s = e.table.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  let n = !1, r = !0, o = !1;
  for (let i = 0; i < e.subRows.length; i++) {
    const a = e.subRows[i];
    if (n && !r) break;
    if (It(a) && (o = !0, hr(a, t) ? n = !0 : r = !1), a.subRows.length) {
      const u = di(a);
      u === "all" ? (n = !0, o = !0) : u === "some" ? (n = !0, r = !1, o = !0) : r = !1;
    }
  }
  return o ? r ? "all" : n ? "some" : !1 : !1;
}
const om = {
  initTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  resetTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  getInitialState: (e) => ({
    rowSelection: Uh(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onRowSelectionChange: gr("rowSelection", e),
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
    tt("rowSelectionFeature", e, t, {
      row_toggleSelected: { fn: (n, r, o) => Ku(n, r, o) },
      row_getIsSelected: { fn: (n) => ui(n) },
      row_getIsSomeSelected: {
        fn: (n) => Vu(n),
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
        fn: (n) => tm(n),
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
      row_getCanSelectSubRows: { fn: (n) => ci(n) },
      row_getCanMultiSelect: { fn: (n) => Gt(n) },
      row_getToggleSelectedHandler: { fn: (n, r) => nm(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    gt("rowSelectionFeature", e, {
      table_setRowSelection: { fn: (t) => Rn(e, t) },
      table_resetRowSelection: { fn: (t) => qh(e, t) },
      table_toggleAllRowsSelected: { fn: (t, n) => Fu(e, t, n) },
      table_toggleAllPageRowsSelected: { fn: (t, n) => Hu(e, t, n) },
      table_getPreSelectedRowModel: { fn: () => Gh(e) },
      table_getSelectedRowModel: {
        fn: () => Xh(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getCoreRowModel()];
        }
      },
      table_getFilteredSelectedRowModel: {
        fn: () => Yh(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getFilteredRowModel()];
        }
      },
      table_getGroupedSelectedRowModel: {
        fn: () => Zh(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getSortedRowModel()];
        }
      },
      table_getSelectedRowIds: {
        fn: () => Lu(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get()];
        }
      },
      table_getIsAllRowsSelected: {
        fn: () => ju(e),
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
        fn: () => zu(e),
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
        fn: () => Jh(e),
        memoDeps: () => {
          var t;
          return [
            (t = e.atoms.rowSelection) == null ? void 0 : t.get(),
            e.getPaginatedRowModel(),
            e.options.enableRowSelection
          ];
        }
      },
      table_getToggleAllRowsSelectedHandler: { fn: () => Qh(e) },
      table_getToggleAllPageRowsSelectedHandler: { fn: () => em(e) }
    });
  }
}, sm = {
  getInitialState(e) {
    return {
      sorting: zp(),
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
      onSortingChange: gr("sorting", e),
      isMultiSortEvent: (t) => t.shiftKey
    };
  },
  assignColumnPrototype(e, t) {
    tt("rowSortingFeature", e, t, {
      column_getAutoSortFn: { fn: (n) => bu(n) },
      column_getAutoSortDir: { fn: (n) => _u(n) },
      column_getSortFn: { fn: (n) => Su(n) },
      column_toggleSorting: { fn: (n, r, o) => xu(n, r, o) },
      column_getFirstSortDir: { fn: (n) => Ru(n) },
      column_getNextSortingOrder: { fn: (n, r) => Cu(n, r) },
      column_getCanSort: { fn: (n) => li(n) },
      column_getCanMultiSort: { fn: (n) => co(n) },
      column_getIsSorted: { fn: (n) => Mu(n) },
      column_getSortIndex: { fn: (n) => Vp(n) },
      column_clearSorting: { fn: (n) => Bp(n) },
      column_getToggleSortingHandler: { fn: (n) => Np(n) }
    });
  },
  constructTableAPIs(e) {
    gt("rowSortingFeature", e, {
      table_setSorting: { fn: (t) => Oo(e, t) },
      table_resetSorting: { fn: (t) => yu(e, t) }
    });
  }
};
function im() {
  return (e) => {
    const t = e;
    return pr({
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
      fn: () => lm(t)
    });
  };
}
function lm(e) {
  var r;
  const t = e.getPreExpandedRowModel(), n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return !t.rows.length || n !== !0 && !Object.keys(n ?? {}).length || !e.options.paginateExpandedRows && !e.options.manualPagination ? t : am(t);
}
function am(e) {
  const t = [], n = (r) => {
    t.push(r), r.subRows.length && Ao(r) && r.subRows.forEach(n);
  };
  return e.rows.forEach(n), {
    rows: t,
    flatRows: e.flatRows,
    rowsById: e.rowsById
  };
}
function um() {
  return (e) => {
    const t = e;
    return pr({
      feature: "rowSortingFeature",
      table: t,
      fnName: "table.getSortedRowModel",
      memoDeps: () => {
        var n;
        return [(n = t.atoms.sorting) == null ? void 0 : n.get(), t.getPreSortedRowModel()];
      },
      fn: () => cm(t),
      onAfterUpdate: tu(() => wu(t))
    });
  };
}
function cm(e) {
  var u;
  const t = e.getPreSortedRowModel(), n = (u = e.atoms.sorting) == null ? void 0 : u.get();
  if (!t.rows.length || !(n != null && n.length)) return t;
  const r = [], o = n.filter((f) => {
    const d = e.getColumn(f.id);
    return d ? li(d) : !1;
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
      sortFn: Su(h)
    });
  }
  const i = (f, d) => {
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
    d.sort(i);
    let h = !1;
    for (let w = 0; w < d.length; w++) {
      const y = d[w];
      y !== f[w] && (h = !0);
      const I = r.length;
      if (r.push(y), y.subRows.length) {
        const E = a(y.subRows);
        if (E.changed) {
          const A = Object.create(Object.getPrototypeOf(y));
          Qa(A, y), A.subRows = E.rows, d[w] = A, r[I] = A, h = !0;
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
function xl(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = Ut(e[n]);
  return Ts(e, t);
}
function fm(e) {
  return Object.keys(e).map((t) => Ut(e[t]));
}
function dm(e) {
  const t = (a, u) => {
    a.setOptions((f) => vl(f, xl(u)));
  }, n = Og(), r = Ts(e, { features: {
    coreReactivityFeature: n,
    ...Ut(e.features) ?? {}
  } }), o = Ts(xl(r), { mergeOptions: (a, u) => vl(a, u) }), s = Ah(o), i = s;
  return ea() && mf(() => {
    var a;
    return (a = n.unmount) == null ? void 0 : a.call(n);
  }), ye(() => fm(r), () => {
    t(s, r);
  }, { immediate: !0 }), ye(() => {
    const a = Ut(e.state), u = Ut(e.atoms);
    if (!a) return [];
    const f = [];
    for (const d of Object.keys(i.initialState))
      !(d in a) || (u == null ? void 0 : u[d]) !== void 0 || f.push(a[d]);
    return f;
  }, (a) => {
    a.length > 0 && t(s, r);
  }, { immediate: !0 }), i.Subscribe = (a) => a.children(i.atoms), i;
}
function ar(e) {
  "@babel/helpers - typeof";
  return ar = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ar(e);
}
function gm(e, t) {
  if (ar(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (ar(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function pm(e) {
  var t = gm(e, "string");
  return ar(t) == "symbol" ? t : t + "";
}
function mr(e, t, n) {
  return (t = pm(t)) in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function hm(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
    if (t.indexOf(r) !== -1) continue;
    n[r] = e[r];
  }
  return n;
}
function mm(e, t) {
  if (e == null) return {};
  var n, r, o = hm(e, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    for (r = 0; r < s.length; r++) n = s[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (o[n] = e[n]);
  }
  return o;
}
function $u(e, t) {
  var n = Object.keys(e), r = Object.keys(t);
  return n.length !== r.length ? !1 : n.every(function(o) {
    return Object.is(e[o], t[o]);
  });
}
function vm() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : $u, t = null;
  return function(n) {
    return t && e(t.value, n) || (t = {
      value: n
    }), t.value;
  };
}
var wm = ["block"];
function Rl(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Cl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Rl(Object(n), !0).forEach(function(r) {
      mr(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Rl(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function ym(e) {
  return {
    x: (e.right + e.left) / 2,
    y: (e.bottom + e.top) / 2
  };
}
function ms(e) {
  var t = e.client, n = e.borderBox, r = n.height / 4;
  return t.y <= n.top + r ? "reorder-above" : t.y >= n.bottom - r ? "reorder-below" : "make-child";
}
function bm(e) {
  var t = e.element, n = e.input, r = e.currentLevel, o = e.indentPerLevel, s = e.mode, i = {
    x: n.clientX,
    y: n.clientY
  }, a = t.getBoundingClientRect();
  if (s === "standard") {
    var u = ms({
      borderBox: a,
      client: i
    });
    return {
      type: u,
      indentPerLevel: o,
      currentLevel: r
    };
  }
  var f = ym(a);
  if (s === "expanded") {
    var d = ms({
      borderBox: a,
      client: i
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
  if (i.x < a.left + h) {
    if (i.y < f.y)
      return {
        type: "reorder-above",
        indentPerLevel: o,
        currentLevel: r
      };
    var w = (i.x - a.left) / o, y = Math.max(Math.floor(w), 0);
    return {
      type: "reparent",
      desiredLevel: y,
      indentPerLevel: o,
      currentLevel: r
    };
  }
  return {
    type: ms({
      borderBox: a,
      client: i
    }),
    indentPerLevel: o,
    currentLevel: r
  };
}
function Wu(e, t) {
  return e.type !== t.type ? !1 : e.type === "instruction-blocked" && t.type === "instruction-blocked" ? Wu(e.desired, t.desired) : $u(e, t);
}
var _m = vm(Wu);
function Sm(e) {
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
function xm(e, t) {
  var n = t.block, r = mm(t, wm), o = bm(r), s = Sm({
    desired: o,
    block: n
  }), i = _m(s);
  return Cl(Cl({}, e), {}, mr({}, Uu, i));
}
function Ml(e) {
  var t;
  return (t = e[Uu]) !== null && t !== void 0 ? t : null;
}
var Uu = Symbol("tree-item-instruction");
function Fo() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return function() {
    t.forEach(function(o) {
      return o();
    });
  };
}
function Rm(e) {
  if (Array.isArray(e)) return e;
}
function Cm(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r, o, s, i, a = [], u = !0, f = !1;
    try {
      if (s = (n = n.call(e)).next, t !== 0) for (; !(u = (r = s.call(n)).done) && (a.push(r.value), a.length !== t); u = !0) ;
    } catch (d) {
      f = !0, o = d;
    } finally {
      try {
        if (!u && n.return != null && (i = n.return(), Object(i) !== i)) return;
      } finally {
        if (f) throw o;
      }
    }
    return a;
  }
}
function zs(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function qu(e, t) {
  if (e) {
    if (typeof e == "string") return zs(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? zs(e, t) : void 0;
  }
}
function Mm() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Gu(e, t) {
  return Rm(e) || Cm(e, t) || qu(e, t) || Mm();
}
var Il = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Yt = {}, vr = {};
Object.defineProperty(vr, "__esModule", { value: !0 });
vr.bind = void 0;
function Im(e, t) {
  var n = t.type, r = t.listener, o = t.options;
  return e.addEventListener(n, r, o), function() {
    e.removeEventListener(n, r, o);
  };
}
vr.bind = Im;
var Ho = {}, mn = Il && Il.__assign || function() {
  return mn = Object.assign || function(e) {
    for (var t, n = 1, r = arguments.length; n < r; n++) {
      t = arguments[n];
      for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    }
    return e;
  }, mn.apply(this, arguments);
};
Object.defineProperty(Ho, "__esModule", { value: !0 });
Ho.bindAll = void 0;
var Em = vr;
function El(e) {
  if (!(typeof e > "u"))
    return typeof e == "boolean" ? {
      capture: e
    } : e;
}
function Am(e, t) {
  if (t == null)
    return e;
  var n = mn(mn({}, e), { options: mn(mn({}, El(t)), El(e.options)) });
  return n;
}
function Om(e, t, n) {
  var r = t.map(function(o) {
    var s = Am(o, n);
    return (0, Em.bind)(e, s);
  });
  return function() {
    r.forEach(function(s) {
      return s();
    });
  };
}
Ho.bindAll = Om;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.bindAll = e.bind = void 0;
  var t = vr;
  Object.defineProperty(e, "bind", { enumerable: !0, get: function() {
    return t.bind;
  } });
  var n = Ho;
  Object.defineProperty(e, "bindAll", { enumerable: !0, get: function() {
    return n.bindAll;
  } });
})(Yt);
var Xu = "data-pdnd-honey-pot";
function Yu(e) {
  return e instanceof Element && e.hasAttribute(Xu);
}
function Zu(e) {
  var t = document.elementsFromPoint(e.x, e.y), n = Gu(t, 2), r = n[0], o = n[1];
  return r ? Yu(r) ? o ?? null : r : null;
}
var Pm = 2147483647, Dm = {
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
function tn(e) {
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
var vs = tn(function() {
  return typeof HTMLElement < "u" && typeof HTMLElement.prototype.showPopover == "function";
});
function Al(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Ol(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Al(Object(n), !0).forEach(function(r) {
      mr(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Al(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
var ur = 2, Pl = ur / 2;
function km(e) {
  return {
    x: Math.floor(e.x),
    y: Math.floor(e.y)
  };
}
function Tm(e) {
  return {
    x: e.x - Pl,
    y: e.y - Pl
  };
}
function Fm(e) {
  return {
    x: Math.max(e.x, 0),
    y: Math.max(e.y, 0)
  };
}
function Hm(e) {
  return {
    x: Math.min(e.x, window.innerWidth - ur),
    y: Math.min(e.y, window.innerHeight - ur)
  };
}
function Dl(e) {
  var t = e.client, n = Hm(Fm(Tm(km(t))));
  return DOMRect.fromRect({
    x: n.x,
    y: n.y,
    width: ur,
    height: ur
  });
}
function kl(e) {
  var t = e.clientRect;
  return {
    left: "".concat(t.left, "px"),
    top: "".concat(t.top, "px"),
    width: "".concat(t.width, "px"),
    height: "".concat(t.height, "px")
  };
}
function Lm(e) {
  var t = e.client, n = e.clientRect;
  return (
    // is within horizontal bounds
    t.x >= n.x && t.x <= n.x + n.width && // is within vertical bounds
    t.y >= n.y && t.y <= n.y + n.height
  );
}
function jm(e) {
  var t = e.initial, n = document.createElement("div");
  n.setAttribute(Xu, "true"), vs() && n.setAttribute("popover", "manual");
  var r = Dl({
    client: t
  });
  Object.assign(n.style, Ol(Ol({
    position: "fixed"
  }, vs() ? (
    // needs to come first as it has 'inset: unset' which
    // needs to be overridden by our top / left values
    Dm
  ) : {
    // Fallback: using maximum possible z-index so that this element
    // will always be on top of other positioned content.
    zIndex: Pm
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
  }, kl({
    clientRect: r
  }))), document.body.appendChild(n), vs() && n.showPopover();
  var o = Yt.bind(window, {
    type: "pointermove",
    listener: function(i) {
      var a = {
        x: i.clientX,
        y: i.clientY
      };
      r = Dl({
        client: a
      }), Object.assign(n.style, kl({
        clientRect: r
      }));
    },
    // using capture so we are less likely to be impacted by event stopping
    options: {
      capture: !0
    }
  });
  return function(i) {
    var a = i.current;
    if (o(), Lm({
      client: a,
      clientRect: r
    })) {
      n.remove();
      return;
    }
    function u() {
      f(), n.remove();
    }
    var f = Yt.bindAll(window, [
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
function zm() {
  var e = null;
  function t() {
    return e = null, Yt.bind(window, {
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
      var i = s.eventName, a = s.payload;
      if (i === "onDragStart") {
        var u = a.location.initial.input, f = e ?? {
          x: u.clientX,
          y: u.clientY
        };
        r = jm({
          initial: f
        });
      }
      if (i === "onDrop") {
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
function Km(e) {
  if (Array.isArray(e)) return zs(e);
}
function Vm(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function Bm() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Ju(e) {
  return Km(e) || Vm(e) || qu(e) || Bm();
}
var Nm = tn(function() {
  return navigator.userAgent.includes("Firefox");
}), gi = tn(function() {
  var t = navigator, n = t.userAgent;
  return n.includes("AppleWebKit") && !n.includes("Chrome");
});
function $m(e) {
  return "nodeName" in e;
}
function Wm(e) {
  return $m(e) && e.ownerDocument !== document;
}
var Ks = {
  isLeavingWindow: Symbol("leaving"),
  isEnteringWindow: Symbol("entering")
};
(function() {
  if (typeof window > "u" || !gi())
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
  Yt.bindAll(
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
        !n.isOverWindow && n.enterCount === 0 && (s[Ks.isEnteringWindow] = !0), n.isOverWindow = !0, n.enterCount++;
      }
    }, {
      type: "dragleave",
      listener: function(s) {
        n.enterCount--, n.isOverWindow && n.enterCount === 0 && (s[Ks.isLeavingWindow] = !0, n.isOverWindow = !1);
      }
    }],
    // using `capture: true` so that adding event listeners
    // in bubble phase will have the correct symbols
    {
      capture: !0
    }
  );
})();
function Um(e) {
  var t = e.dragLeave;
  return gi() ? t.hasOwnProperty(Ks.isLeavingWindow) : !1;
}
function qm(e) {
  var t = e.dragLeave, n = t.type, r = t.relatedTarget;
  return n !== "dragleave" ? !1 : gi() ? Um({
    dragLeave: t
  }) : r == null ? !0 : Nm() ? Wm(r) : r instanceof HTMLIFrameElement;
}
function Gm(e) {
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
function er(e) {
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
var Xm = function(t) {
  var n = [], r = null, o = function() {
    for (var i = arguments.length, a = new Array(i), u = 0; u < i; u++)
      a[u] = arguments[u];
    n = a, !r && (r = requestAnimationFrame(function() {
      r = null, t.apply(void 0, n);
    }));
  };
  return o.cancel = function() {
    r && (cancelAnimationFrame(r), r = null);
  }, o;
}, ws = Xm(function(e) {
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
function Ym(e) {
  var t = e.source, n = e.initial, r = e.dispatchEvent, o = {
    dropTargets: []
  };
  function s(a) {
    r(a), o = {
      dropTargets: a.payload.location.current.dropTargets
    };
  }
  var i = {
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
      qr.flush(), ws.cancel(), s({
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
      ws(function() {
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
      qr.flush(), ws.cancel(), s({
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
  return i;
}
var Vs = {
  isActive: !1
};
function Qu() {
  return !Vs.isActive;
}
function Zm(e) {
  return e.dataTransfer ? e.dataTransfer.setDragImage.bind(e.dataTransfer) : null;
}
function Jm(e) {
  var t = e.current, n = e.next;
  if (t.length !== n.length)
    return !0;
  for (var r = 0; r < t.length; r++)
    if (t[r].element !== n[r].element)
      return !0;
  return !1;
}
function Qm(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = e.dispatchEvent;
  if (!Qu())
    return;
  var s = ev({
    event: t,
    dragType: n,
    getDropTargetsOver: r
  });
  Vs.isActive = !0;
  var i = {
    current: s
  };
  ys({
    event: t,
    current: s.dropTargets
  });
  var a = Ym({
    source: n.payload,
    dispatchEvent: o,
    initial: s
  });
  function u(y) {
    var I = Jm({
      current: i.current.dropTargets,
      next: y.dropTargets
    });
    i.current = y, I && a.dragUpdate({
      current: i.current
    });
  }
  function f(y) {
    var I = er(y), E = Yu(y.target) ? Zu({
      x: I.clientX,
      y: I.clientY
    }) : y.target, A = r({
      target: E,
      input: I,
      source: n.payload,
      current: i.current.dropTargets
    });
    A.length && (y.preventDefault(), ys({
      event: y,
      current: A
    })), u({
      dropTargets: A,
      input: I
    });
  }
  function d() {
    i.current.dropTargets.length && u({
      dropTargets: [],
      input: i.current.input
    }), a.drop({
      current: i.current,
      updatedSourcePayload: null
    }), h();
  }
  function h() {
    Vs.isActive = !1, w();
  }
  var w = Yt.bindAll(
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
          current: i.current
        });
      }
    }, {
      type: "dragenter",
      listener: f
    }, {
      type: "dragleave",
      listener: function(I) {
        qm({
          dragLeave: I
        }) && (u({
          input: i.current.input,
          dropTargets: []
        }), n.startedFrom === "external" && d());
      }
    }, {
      // A "drop" can only happen if the browser allowed the drop
      type: "drop",
      listener: function(I) {
        if (i.current = {
          dropTargets: i.current.dropTargets,
          input: er(I)
        }, !i.current.dropTargets.length) {
          d();
          return;
        }
        I.preventDefault(), ys({
          event: I,
          current: i.current.dropTargets
        }), a.drop({
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
          input: er(I)
        }, d();
      }
    }].concat(Ju(Gm({
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
    nativeSetDragImage: Zm(t)
  });
}
function ys(e) {
  var t, n = e.event, r = e.current, o = (t = r[0]) === null || t === void 0 ? void 0 : t.dropEffect;
  o != null && n.dataTransfer && (n.dataTransfer.dropEffect = o);
}
function ev(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = er(t);
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
var Tl = {
  canStart: Qu,
  start: Qm
}, Bs = /* @__PURE__ */ new Map();
function tv(e) {
  var t = e.typeKey, n = e.mount, r = Bs.get(t);
  if (r)
    return r.usageCount++, r;
  var o = {
    typeKey: t,
    unmount: n(),
    usageCount: 1
  };
  return Bs.set(t, o), o;
}
function nv(e) {
  var t = tv(e);
  return function() {
    t.usageCount--, !(t.usageCount > 0) && (t.unmount(), Bs.delete(e.typeKey));
  };
}
function ec(e, t) {
  var n = t.attribute, r = t.value;
  return e.setAttribute(n, r), function() {
    return e.removeAttribute(n);
  };
}
function Fl(e, t) {
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
    t % 2 ? Fl(Object(n), !0).forEach(function(r) {
      mr(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Fl(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function bs(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = rv(e)) || t) {
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
  var s, i = !0, a = !1;
  return { s: function() {
    n = n.call(e);
  }, n: function() {
    var f = n.next();
    return i = f.done, f;
  }, e: function(f) {
    a = !0, s = f;
  }, f: function() {
    try {
      i || n.return == null || n.return();
    } finally {
      if (a) throw s;
    }
  } };
}
function rv(e, t) {
  if (e) {
    if (typeof e == "string") return Hl(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Hl(e, t) : void 0;
  }
}
function Hl(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function _s(e) {
  return e.slice(0).reverse();
}
function ov(e) {
  var t = e.typeKey, n = e.defaultDropEffect, r = /* @__PURE__ */ new WeakMap(), o = "data-drop-target-for-".concat(t), s = "[".concat(o, "]");
  function i(y) {
    return r.set(y.element, y), function() {
      return r.delete(y.element);
    };
  }
  function a(y) {
    var I = Fo(ec(y.element, {
      attribute: o,
      value: "true"
    }), i(y));
    return tn(I);
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
      result: [].concat(Ju(j), [Y])
    });
  }
  function f(y) {
    var I = y.eventName, E = y.payload, A = bs(E.location.current.dropTargets), z;
    try {
      for (A.s(); !(z = A.n()).done; ) {
        var M, O = z.value, _ = r.get(O.element), D = kt(kt({}, E), {}, {
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
      })), z = /* @__PURE__ */ new Set(), M = bs(E.location.previous.dropTargets), O;
      try {
        for (M.s(); !(O = M.n()).done; ) {
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
        M.e(J);
      } finally {
        M.f();
      }
      var ee = bs(E.location.current.dropTargets), ue;
      try {
        for (ee.s(); !(ue = ee.n()).done; ) {
          var Y, me, Ce = ue.value;
          if (!z.has(Ce.element)) {
            var we = kt(kt({}, E), {}, {
              self: Ce
            }), G = r.get(Ce.element);
            G == null || (Y = G.onDropTargetChange) === null || Y === void 0 || Y.call(G, we), G == null || (me = G.onDragEnter) === null || me === void 0 || me.call(G, we);
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
    for (var O = _s(z), _ = _s(M), D = [], j = 0; j < O.length; j++) {
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
      D.push(kt(kt({}, K), {}, {
        // making it clear to consumers this drop target is active due to stickiness
        isActiveDueToStickiness: !0
      }));
    }
    return _s(D);
  }
  return {
    dropTargetForConsumers: a,
    getIsOver: w,
    dispatchEvent: h
  };
}
function sv(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = iv(e)) || t) {
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
  var s, i = !0, a = !1;
  return { s: function() {
    n = n.call(e);
  }, n: function() {
    var f = n.next();
    return i = f.done, f;
  }, e: function(f) {
    a = !0, s = f;
  }, f: function() {
    try {
      i || n.return == null || n.return();
    } finally {
      if (a) throw s;
    }
  } };
}
function iv(e, t) {
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
function lv(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? jl(Object(n), !0).forEach(function(r) {
      mr(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : jl(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function av() {
  var e = /* @__PURE__ */ new Set(), t = null;
  function n(s) {
    t && (!s.canMonitor || s.canMonitor(t.canMonitorArgs)) && t.active.add(s);
  }
  function r(s) {
    var i = lv({}, s);
    e.add(i), n(i);
    function a() {
      e.delete(i), t && t.active.delete(i);
    }
    return tn(a);
  }
  function o(s) {
    var i = s.eventName, a = s.payload;
    if (i === "onGenerateDragPreview") {
      t = {
        canMonitorArgs: {
          initial: a.location.initial,
          source: a.source
        },
        active: /* @__PURE__ */ new Set()
      };
      var u = sv(e), f;
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
          (E = I[i]) === null || E === void 0 || E.call(I, a);
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
function uv(e) {
  var t = e.typeKey, n = e.mount, r = e.dispatchEventToSource, o = e.onPostDispatch, s = e.defaultDropEffect, i = av(), a = ov({
    typeKey: t,
    defaultDropEffect: s
  });
  function u(h) {
    r == null || r(h), a.dispatchEvent(h), i.dispatchEvent(h), o == null || o(h);
  }
  function f(h) {
    var w = h.event, y = h.dragType;
    Tl.start({
      event: w,
      dragType: y,
      getDropTargetsOver: a.getIsOver,
      dispatchEvent: u
    });
  }
  function d() {
    function h() {
      var w = {
        canStart: Tl.canStart,
        start: f
      };
      return n(w);
    }
    return nv({
      typeKey: t,
      mount: h
    });
  }
  return {
    registerUsage: d,
    dropTarget: a.dropTargetForConsumers,
    monitor: i.monitorForConsumers
  };
}
var cv = tn(function() {
  return navigator.userAgent.toLocaleLowerCase().includes("android");
}), fv = "pdnd:android-fallback", zl = "text/plain", dv = "text/uri-list", gv = "application/vnd.pdnd", go = /* @__PURE__ */ new WeakMap();
function pv(e) {
  return go.set(e.element, e), function() {
    go.delete(e.element);
  };
}
var Kl = zm(), tc = uv({
  typeKey: "element",
  defaultDropEffect: "move",
  mount: function(t) {
    return Fo(Kl.bindEvents(), Yt.bind(document, {
      type: "dragstart",
      listener: function(r) {
        var o, s, i, a, u, f;
        if (t.canStart(r) && !r.defaultPrevented && r.dataTransfer) {
          var d = r.target;
          if (d instanceof HTMLElement) {
            var h = go.get(d);
            if (h) {
              var w = er(r), y = {
                element: h.element,
                dragHandle: (o = h.dragHandle) !== null && o !== void 0 ? o : null,
                input: w
              };
              if (h.canDrag && !h.canDrag(y)) {
                r.preventDefault();
                return;
              }
              if (h.dragHandle) {
                var I = Zu({
                  x: w.clientX,
                  y: w.clientY
                });
                if (!h.dragHandle.contains(I)) {
                  r.preventDefault();
                  return;
                }
              }
              var E = (s = (i = h.getInitialDataForExternal) === null || i === void 0 ? void 0 : i.call(h, y)) !== null && s !== void 0 ? s : null;
              if (E)
                for (var A = 0, z = Object.entries(E); A < z.length; A++) {
                  var M = Gu(z[A], 2), O = M[0], _ = M[1];
                  r.dataTransfer.setData(O, _ ?? "");
                }
              cv() && !r.dataTransfer.types.includes(zl) && !r.dataTransfer.types.includes(dv) && r.dataTransfer.setData(zl, fv), r.dataTransfer.setData(gv, "");
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
  onPostDispatch: Kl.getOnPostDispatch()
}), hv = tc.dropTarget;
function mv(e) {
  var t = Fo(
    // making the draggable register the adapter rather than drop targets
    // this is because you *must* have a draggable element to start a drag
    // but you _might_ not have any drop targets immediately
    // (You might create drop targets async)
    tc.registerUsage(),
    pv(e),
    ec(e.element, {
      attribute: "draggable",
      value: "true"
    })
  );
  return tn(t);
}
const Ss = /* @__PURE__ */ new Map(), bn = "pnl-tst-row";
function vv(e, t) {
  return Fo(
    mv({
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
    hv({
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
        const r = n.data.key, o = Ml(n.data);
        for (const s of t.panes)
          s.id() === n.data.paneId && r && o ? s.showDrop(r, o) : s.clearDrop();
      },
      onDragLeave: () => {
        for (const n of t.panes) n.clearDrop();
      },
      onDrop: ({ self: n, source: r, location: o }) => {
        for (const u of t.panes) u.clearDrop();
        const s = t.panes.find((u) => u.id() === n.data.paneId), i = n.data.key, a = Ml(n.data);
        !s || !i || !a || a.type === "instruction-blocked" || s.drop(r.data, i, a, o.current.input);
      }
    })
  );
}
function wv(e, t) {
  let n = Ss.get(e);
  return n || (n = { panes: [] }, n.cleanup = vv(e, n), Ss.set(e, n)), n.panes.push(t), () => {
    var r;
    n.panes = n.panes.filter((o) => o !== t), !(n.panes.length > 0) && ((r = n.cleanup) == null || r.call(n), Ss.delete(e));
  };
}
const yv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ef5350" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m6 10h-4v8a4 4 0 1 1-4-4 3.96 3.96 0 0 1 2 .555V8h6Z"/></svg>', bv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#ff7043" d="M2 2a1 1 0 0 0-1 1v10c0 .554.446 1 1 1h12c.554 0 1-.446 1-1V3a1 1 0 0 0-1-1zm0 3h12v8H2zm1 2 2 2-2 2 1 1 3-3-3-3zm5 3.5V12h5v-1.5z"/></svg>', _v = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#7e57c2" d="M20 18h-2v-2h-2v2c0 .193 0 .703 1.254 1.033A3.345 3.345 0 0 1 20 22h2v2h2v-2c0-.388-.562-.851-1.254-1.034C20.356 20.34 20 18.84 20 18m-3.254 2.966C14.356 20.34 14 18.84 14 18h-2v-2h-2v8h2v-2h4v2h2v-2c0-.388-.562-.851-1.254-1.034"/><path fill="#7e57c2" d="M24 4H4v20a4 4 0 0 0 4 4h16.16A3.84 3.84 0 0 0 28 24.16V8a4 4 0 0 0-4-4m2 14h-2v-2h-2v2c0 .193 0 .703 1.254 1.033A3.345 3.345 0 0 1 26 22v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1 2-2h2a2 2 0 0 1 2 2Z"/></svg>', Sv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ffca28" d="M16 24c-5.525 0-10-.9-10-2v4c0 1.1 4.475 2 10 2s10-.9 10-2v-4c0 1.1-4.475 2-10 2m0-8c-5.525 0-10-.9-10-2v4c0 1.1 4.475 2 10 2s10-.9 10-2v-4c0 1.1-4.475 2-10 2m0-12C10.477 4 6 4.895 6 6v4c0 1.1 4.475 2 10 2s10-.9 10-2V6c0-1.105-4.477-2-10-2"/></svg>', xv = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/><path fill="#42a5f5" d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5z"/></svg>', Rv = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m8.668 6h3.6641l-3.6641-3.668v3.668m-4.668-4.668h5.332l4 4v8c0 0.73828-0.59375 1.3359-1.332 1.3359h-8c-0.73828 0-1.332-0.59766-1.332-1.3359v-10.664c0-0.74219 0.59375-1.3359 1.332-1.3359m3.332 1.3359h-3.332v10.664h8v-6h-4.668z" fill="#90a4ae" /></svg>', Cv = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m6.922 3.768-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232" fill="#90a4ae" /></svg>', Mv = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.483 6H4.721a1 1 0 0 0-.949.684L2 12V5h12a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232l-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h11l2.403-5.606A1 1 0 0 0 14.483 6" fill="#90a4ae" /></svg>', Iv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#e65100" d="m4 4 2 22 10 2 10-2 2-22Zm19.72 7H11.28l.29 3h11.86l-.802 9.335L15.99 25l-6.635-1.646L8.93 19h3.02l.19 2 3.86.77 3.84-.77.29-4H8.84L8 8h16Z"/></svg>', Ev = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#26a69a" d="M8.5 6h4l-4-4zM3.875 1H9.5l4 4v8.6c0 .773-.616 1.4-1.375 1.4h-8.25c-.76 0-1.375-.627-1.375-1.4V2.4c0-.777.612-1.4 1.375-1.4M4 13.6h8V8l-2.625 2.8L8 9.4zm1.25-7.7c-.76 0-1.375.627-1.375 1.4s.616 1.4 1.375 1.4c.76 0 1.375-.627 1.375-1.4S6.009 5.9 5.25 5.9"/></svg>', Av = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#ffca28" d="M2 2v12h12V2zm6 6h1v4a1.003 1.003 0 0 1-1 1H7a1.003 1.003 0 0 1-1-1v-1h1v1h1zm3 0h2v1h-2v1h1a1.003 1.003 0 0 1 1 1v1a1.003 1.003 0 0 1-1 1h-2v-1h2v-1h-1a1.003 1.003 0 0 1-1-1V9a1.003 1.003 0 0 1 1-1"/></svg>', Ov = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path fill="#f9a825" d="M560-160v-80h120q17 0 28.5-11.5T720-280v-80q0-38 22-69t58-44v-14q-36-13-58-44t-22-69v-80q0-17-11.5-28.5T680-720H560v-80h120q50 0 85 35t35 85v80q0 17 11.5 28.5T840-560h40v160h-40q-17 0-28.5 11.5T800-360v80q0 50-35 85t-85 35zm-280 0q-50 0-85-35t-35-85v-80q0-17-11.5-28.5T120-400H80v-160h40q17 0 28.5-11.5T160-600v-80q0-50 35-85t85-35h120v80H280q-17 0-28.5 11.5T240-680v80q0 38-22 69t-58 44v14q36 13 58 44t22 69v80q0 17 11.5 28.5T280-240h120v80z"/></svg>', Pv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#42a5f5" d="m14 10-4 3.5L6 10H4v12h4v-6l2 2 2-2v6h4V10zm12 6v-6h-4v6h-4l6 8 6-8z"/></svg>', Dv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ef5350" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m4.93 10.44c.41.9.93 1.64 1.53 2.15l.41.32c-.87.16-2.07.44-3.34.93l-.11.04.5-1.04c.45-.87.78-1.66 1.01-2.4m6.48 3.81c.18-.18.27-.41.28-.66.03-.2-.02-.39-.12-.55-.29-.47-1.04-.69-2.28-.69l-1.29.07-.87-.58c-.63-.52-1.2-1.43-1.6-2.56l.04-.14c.33-1.33.64-2.94-.02-3.6a.85.85 0 0 0-.61-.24h-.24c-.37 0-.7.39-.79.77-.37 1.33-.15 2.06.22 3.27v.01c-.25.88-.57 1.9-1.08 2.93l-.96 1.8-.89.49c-1.2.75-1.77 1.59-1.88 2.12-.04.19-.02.36.05.54l.03.05.48.31.44.11c.81 0 1.73-.95 2.97-3.07l.18-.07c1.03-.33 2.31-.56 4.03-.75 1.03.51 2.24.74 3 .74.44 0 .74-.11.91-.3m-.41-.71.09.11c-.01.1-.04.11-.09.13h-.04l-.19.02c-.46 0-1.17-.19-1.9-.51.09-.1.13-.1.23-.1 1.4 0 1.8.25 1.9.35M7.83 17c-.65 1.19-1.24 1.85-1.69 2 .05-.38.5-1.04 1.21-1.69zm3.02-6.91c-.23-.9-.24-1.63-.07-2.05l.07-.12.15.05c.17.24.19.56.09 1.1l-.03.16-.16.82z"/></svg>', kv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#e64a19" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zM8 11v2h1v6H8v1h4v-1h-1v-2h2a3 3 0 0 0 3-3 3 3 0 0 0-3-3zm5 2a1 1 0 0 1 1 1 1 1 0 0 1-1 1h-2v-2z"/></svg>', Tv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#0288d1" d="M9.86 2A2.86 2.86 0 0 0 7 4.86v1.68h4.29c.39 0 .71.57.71.96H4.86A2.86 2.86 0 0 0 2 10.36v3.781a2.86 2.86 0 0 0 2.86 2.86h1.18v-2.68a2.85 2.85 0 0 1 2.85-2.86h5.25c1.58 0 2.86-1.271 2.86-2.851V4.86A2.86 2.86 0 0 0 14.14 2zm-.72 1.61c.4 0 .72.12.72.71s-.32.891-.72.891c-.39 0-.71-.3-.71-.89s.32-.711.71-.711"/><path fill="#fdd835" d="M17.959 7v2.68a2.85 2.85 0 0 1-2.85 2.859H9.86A2.85 2.85 0 0 0 7 15.389v3.75a2.86 2.86 0 0 0 2.86 2.86h4.28A2.86 2.86 0 0 0 17 19.14v-1.68h-4.291c-.39 0-.709-.57-.709-.96h7.14A2.86 2.86 0 0 0 22 13.64V9.86A2.86 2.86 0 0 0 19.14 7zM8.32 11.513l-.004.004.038-.004zm6.54 7.276c.39 0 .71.3.71.89a.71.71 0 0 1-.71.71c-.4 0-.72-.12-.72-.71s.32-.89.72-.89"/></svg>', Fv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#8bc34a" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zm4 7.5h-4v2h1l-2 1.67L10 13h1v-2H7v2h1l3 2.5L8 18H7v2h4v-2h-1l2-1.67L14 18h-1v2h4v-2h-1l-3-2.5 3-2.5h1z"/></svg>', Hv = '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 16 16"><path fill="#0288d1" d="M2 2v12h12V2zm4 6h3v1H8v4H7V9H6zm5 0h2v1h-2v1h1a1.003 1.003 0 0 1 1 1v1a1.003 1.003 0 0 1-1 1h-2v-1h2v-1h-1a1.003 1.003 0 0 1-1-1V9a1.003 1.003 0 0 1 1-1"/></svg>', Lv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ff9800" d="m24 6 2 6h-4l-2-6h-3l2 6h-4l-2-6h-3l2 6H8L6 6H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3V6Z"/></svg>', jv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#01579b" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zM7 13l1.5 7h2l1.5-3 1.5 3h2l1.5-7h1v-2h-4v2h1l-.9 4.2L13 15h-2l-1.1 2.2L9 13h1v-2H6v2z"/></svg>', zv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#8bc34a" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m.12 13.5 3.74 3.74 1.42-1.41-2.33-2.33 2.33-2.33-1.42-1.41zm11.16 0-3.74-3.74-1.42 1.41 2.33 2.33-2.33 2.33 1.42 1.41z"/></svg>', Kv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ff5252" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2m12 16v-2H9v2zm-4-4v-2H6v2z"/></svg>', Vv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#afb42b" d="M14 17h-2v-2h-2v-2h2v2h2m0-6h-2v2h2v2h-2v-2h-2V9h2V7h-2V5h2v2h2m5-4H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2"/></svg>', Vl = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, Bl = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, Bv = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, Nv = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, $v = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, Wv = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, Uv = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, qv = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, Gv = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, Xv = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, Yv = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, Zv = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, Jv = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, Qv = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, e0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, t0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, n0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, r0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, o0 = ["aria-label"], s0 = {
  key: 0,
  class: "pnl-tst-tsep",
  "aria-hidden": "true"
}, i0 = {
  key: 1,
  class: "pnl-tst-search"
}, l0 = ["innerHTML"], a0 = ["value", "aria-label", "placeholder"], u0 = ["aria-label", "aria-keyshortcuts", "aria-disabled", "title", "tabindex", "onClick", "onFocus"], c0 = ["innerHTML"], f0 = {
  key: 1,
  class: "pnl-tst-empty"
}, d0 = ["aria-label", "aria-colcount", "aria-rowcount"], g0 = {
  class: "pnl-tst-hrow",
  role: "row",
  "aria-rowindex": 1
}, p0 = ["aria-colindex", "aria-sort", "aria-keyshortcuts", "tabindex", "onClick", "onFocus", "onKeydown"], h0 = { class: "pnl-tst-hlabel" }, m0 = ["innerHTML"], v0 = ["onDblclick", "onMousedown", "onTouchstart"], w0 = ["aria-level", "aria-posinset", "aria-setsize", "aria-rowindex", "aria-expanded", "aria-selected", "aria-haspopup", "tabindex", "onClick", "onContextmenu", "onFocus"], y0 = ["aria-colindex"], b0 = ["onClick"], _0 = {
  key: 1,
  class: "pnl-tst-twisty pnl-tst-twisty--leaf",
  "aria-hidden": "true"
}, S0 = ["checked", ".indeterminate", "aria-label", "onClick"], x0 = ["innerHTML"], R0 = ["value", "aria-label", "onKeydown", "onBlur"], C0 = {
  key: 2,
  class: "pnl-tst-value"
}, M0 = {
  key: 3,
  class: "pnl-tst-modal"
}, I0 = {
  id: "pnl-tst-confirm-message",
  class: "pnl-tst-dialog-message"
}, E0 = { class: "pnl-tst-dialog-actions" }, A0 = ["aria-label"], O0 = {
  key: 0,
  class: "pnl-tst-msep",
  role: "separator"
}, P0 = ["aria-keyshortcuts", "aria-disabled", "tabindex", "onClick", "onFocus"], D0 = ["innerHTML"], k0 = { class: "pnl-tst-mlabel" }, T0 = {
  key: 0,
  class: "pnl-tst-mkeys",
  "aria-hidden": "true"
}, F0 = "title", Nl = 16, $l = 6, H0 = 40, $n = "search", Tt = "|", pn = 4, L0 = 500, j0 = {
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
      columnSizingFeature: $h,
      columnResizingFeature: Nh,
      rowExpandingFeature: Wh,
      rowSelectionFeature: om,
      rowSortingFeature: sm,
      coreRowModel: Iu(),
      expandedRowModel: im(),
      sortedRowModel: um(),
      sortFns: { alphanumeric: Sp, text: xp }
    }, r = $(() => (t.state.columns || []).length > 0), o = $(() => r.value && t.state.options.sortable !== !1), s = $(() => t.state.options.sort_folders_first === !0), i = $(() => r.value && t.state.options.resizable !== !1), a = $(() => {
      const l = t.state.columns || [];
      return l.length === 0 ? [{ id: F0, header: "", accessorFn: (c) => c.title }] : l.map((c) => {
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
    function u(l, c) {
      return typeof c == "number" && Number.isFinite(c) ? { [l]: c } : {};
    }
    function f(l, c) {
      const g = l == null ? void 0 : l[c];
      if (g !== void 0) return g;
      const v = (t.state.types || {})[l == null ? void 0 : l.type];
      return v && typeof v == "object" ? v[c] : void 0;
    }
    function d(l) {
      return l.subRows.length > 0 || f(l.original, "allow_children") !== !1;
    }
    function h(l, c, g) {
      const v = d(l);
      if (v !== d(c)) {
        const k = K.value.some((B) => B.id === g && B.desc);
        return (v ? -1 : 1) * (k ? -1 : 1);
      }
      return G.getColumn(g).getAutoSortFn()(l, c, g);
    }
    const w = /* @__PURE__ */ re(y(t.state.expandedKeys));
    function y(l) {
      const c = {};
      for (const g of l || []) c[g] = !0;
      return c;
    }
    function I(l) {
      return l === !0 ? G.getCoreRowModel().flatRows.filter((c) => c.subRows.length > 0).map((c) => c.id).sort() : Object.keys(l).filter((c) => l[c]).sort();
    }
    const E = {
      audio: yv,
      console: bv,
      css: _v,
      database: Sv,
      document: xv,
      file: Rv,
      folder: Cv,
      "folder-open": Mv,
      html: Iv,
      image: Ev,
      javascript: Av,
      json: Ov,
      markdown: Pv,
      pdf: Dv,
      powerpoint: kv,
      python: Tv,
      table: Fv,
      typescript: Hv,
      video: Lv,
      word: jv,
      xml: zv,
      yaml: Kv,
      zip: Vv
    };
    function A(l) {
      return l ? { ...E, ...t.state.icons || {} }[l] ?? null : null;
    }
    function z(l) {
      const c = f(l.original, "icon");
      return c ? (Ot(l) ? A(`${c}-open`) : null) ?? A(c) : null;
    }
    function M(l, c) {
      return l.length !== c.length ? !1 : l.every((g, v) => g === c[v]);
    }
    const O = $(() => t.state.options.select_mode ?? "none"), _ = $(() => O.value !== "none"), D = $(() => O.value === "hierarchy"), j = $(
      () => _.value && t.state.options.show_checkboxes !== !1
    ), U = /* @__PURE__ */ re(y(t.state.selectedKeys)), K = /* @__PURE__ */ re(L(t.state.sorting));
    function L(l) {
      return (l || []).filter((c) => c && c.id).map((c) => ({ id: String(c.id), desc: c.desc === !0 }));
    }
    function ee(l, c) {
      return l.length === c.length && l.every((g, v) => g.id === c[v].id && g.desc === c[v].desc);
    }
    const ue = $(() => o.value && K.value.length > 0), Y = /* @__PURE__ */ re(me(t.state.columnWidths));
    function me(l) {
      const c = {};
      for (const [g, v] of Object.entries(l || {})) {
        const k = Math.round(Number(v));
        Number.isFinite(k) && k > 0 && (c[g] = k);
      }
      return c;
    }
    function Ce(l, c) {
      const g = Object.keys(l);
      return g.length === Object.keys(c).length && g.every((v) => l[v] === c[v]);
    }
    const we = /* @__PURE__ */ re(null), G = dm({
      features: n,
      data: $(() => t.state.source || []),
      columns: a,
      getRowId: (l) => l.key,
      getSubRows: (l) => l.children,
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
      enableColumnResizing: i,
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
      onExpandedChange: (l) => {
        w.value = typeof l == "function" ? l(w.value) : l;
      },
      onRowSelectionChange: (l) => {
        U.value = typeof l == "function" ? l(U.value) : l;
      },
      onSortingChange: (l) => {
        K.value = L(typeof l == "function" ? l(K.value) : l);
      },
      onColumnSizingChange: (l) => {
        Y.value = me(
          typeof l == "function" ? l(Y.value) : l
        );
      }
    });
    function J(l) {
      if (l.getIsSelected()) return "all";
      if (!D.value || l.subRows.length === 0) return "none";
      const c = l.subRows.map(J);
      return c.every((g) => g === "all") ? "all" : c.some((g) => g !== "none") ? "some" : "none";
    }
    ye(() => I(U.value), t.setSelectedKeys, { flush: "post" }), ye(() => I(w.value), t.setExpandedKeys, { flush: "post" }), ye(
      () => t.state.expandedKeys,
      (l) => {
        M(I(w.value), [...l || []].sort()) || (w.value = y(l));
      }
    ), ye(
      () => t.state.selectedKeys,
      (l) => {
        M(I(U.value), [...l || []].sort()) || (U.value = y(l));
      }
    ), ye(() => K.value, t.setSorting, { flush: "post" }), ye(
      () => t.state.sorting,
      (l) => {
        const c = L(l);
        ee(K.value, c) || (K.value = c);
      }
    ), ye(
      () => [Y.value, we.value],
      ([l, c]) => {
        c || t.setColumnWidths(l);
      },
      { flush: "post" }
    ), ye(
      () => t.state.columnWidths,
      (l) => {
        const c = me(l);
        Ce(Y.value, c) || (Y.value = c);
      }
    ), ye(
      () => [t.state.options.expand_all, t.state.source],
      ([l]) => {
        l && G.toggleAllRowsExpanded(!0);
      },
      { immediate: !0 }
    );
    const ce = $(() => (t.state.filterText ?? "").trim().toLowerCase()), Me = $(() => ce.value.length > 0), At = /* @__PURE__ */ re(t.state.filterText ?? "");
    ye(
      () => t.state.filterText,
      (l) => {
        At.value = l ?? "";
      }
    );
    function pt(l) {
      At.value = l, t.setFilterText(l);
    }
    function ze(l) {
      return l.getAllCells().some((c) => String(c.getValue() ?? "").toLowerCase().includes(ce.value));
    }
    const fe = $(() => {
      if (!Me.value) return G.getRowModel().rows;
      const l = G.getSortedRowModel().flatRows, c = /* @__PURE__ */ new Set();
      for (const g of l)
        if (ze(g)) {
          c.add(g.id);
          for (let v = g.getParentRow(); v; v = v.getParentRow()) c.add(v.id);
        }
      return l.filter((g) => c.has(g.id));
    }), Ue = $(() => {
      var l;
      return ((l = G.getHeaderGroups()[0]) == null ? void 0 : l.headers) ?? [];
    }), Cn = $(() => t.state.options.indent_px ?? 16), zt = $(() => t.state.options.aria_label ?? "Tree table"), nn = $(() => Me.value ? "No matches" : "No data"), Mn = $(() => r.value ? 2 : 1), wr = $(() => fe.value.length + (r.value ? 1 : 0)), qe = /* @__PURE__ */ re(!1), In = /* @__PURE__ */ re(null), p = /* @__PURE__ */ new Map();
    function m(l, c) {
      c ? p.set(l, c) : p.delete(l);
    }
    const b = $(() => {
      const l = Ue.value;
      return l.length === 0 ? null : l.some((g) => g.column.id === In.value) ? In.value : l[0].column.id;
    });
    function R(l) {
      const c = Ue.value;
      if (c.length === 0) return;
      const g = c[Math.max(0, Math.min(l, c.length - 1))];
      qe.value = !0, In.value = g.column.id, Le(() => {
        var v;
        return (v = p.get(g.column.id)) == null ? void 0 : v.focus();
      });
    }
    function C() {
      const l = Ue.value;
      R(l.findIndex((c) => c.column.id === b.value));
    }
    function S() {
      qe.value = !1, jo(ln.value);
    }
    function F(l) {
      return o.value && l.column.getCanSort();
    }
    function T(l) {
      if (!F(l)) return;
      const c = l.column.getIsSorted();
      return c === "asc" ? "ascending" : c === "desc" ? "descending" : "none";
    }
    function P(l) {
      if (!F(l)) return null;
      const c = l.column.getIsSorted();
      return c ? c === "asc" ? Bl : Vl : null;
    }
    function x(l) {
      F(l) && l.column.toggleSorting();
    }
    function N(l) {
      R(Ue.value.indexOf(l)), x(l);
    }
    function H(l) {
      return i.value && l.column.getCanResize();
    }
    function V(l) {
      var v;
      const c = l.column.id;
      if (c in Y.value) return null;
      const g = Math.round(((v = p.get(c)) == null ? void 0 : v.getBoundingClientRect().width) ?? 0);
      return g <= 0 || g === l.column.getSize() ? null : (Y.value = { ...Y.value, [c]: g }, g);
    }
    async function W(l, c) {
      if (!H(l)) return;
      c.stopPropagation(), V(l) !== null && await Le(), l.getResizeHandler()(c), we.value = l.column.id;
      const g = () => {
        we.value = null;
      };
      for (const v of ["mouseup", "touchend", "touchcancel"])
        document.addEventListener(v, g, { once: !0 });
    }
    function Q(l, c) {
      if (!H(l)) return;
      const g = l.column, v = g.columnDef.minSize ?? 20, k = g.columnDef.maxSize ?? Number.MAX_SAFE_INTEGER, B = V(l) ?? g.getSize(), Se = Math.min(Math.max(Math.round(B + c), v), k);
      G.setColumnSizing((ge) => ({ ...ge, [g.id]: Se }));
    }
    function se(l) {
      H(l) && l.column.resetSize();
    }
    function ie(l, c) {
      const g = Ue.value, v = Math.max(
        0,
        g.findIndex((k) => k.column.id === b.value)
      );
      if (c.altKey) {
        switch (c.key) {
          case "ArrowLeft":
            Q(l, -Nl);
            break;
          case "ArrowRight":
            Q(l, Nl);
            break;
          case "Home":
            se(l);
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
          x(l);
          break;
        default:
          return;
      }
      c.preventDefault(), c.stopPropagation();
    }
    const ve = $(() => {
      const l = /* @__PURE__ */ new Map();
      for (const c of fe.value) {
        const g = c.parentId ?? "", v = l.get(g) ?? [];
        v.push(c.id), l.set(g, v);
      }
      return l;
    });
    function _e(l) {
      return ve.value.get(l.parentId ?? "") ?? [];
    }
    function Ke(l) {
      return _e(l).indexOf(l.id) + 1;
    }
    function Ve(l) {
      return _e(l).length;
    }
    function Ge(l) {
      return Me.value ? (ve.value.get(l.id) ?? []).length > 0 : l.getCanExpand();
    }
    function Ot(l) {
      return Me.value ? Ge(l) : l.getIsExpanded();
    }
    const Pe = $(() => {
      if (!r.value) return {};
      const l = { "--pnl-tst-total": `${G.getTotalSize()}px` };
      return Ue.value.forEach((c, g) => {
        l[`--pnl-tst-w${g}`] = `${c.column.getSize()}px`;
      }), l;
    }), Be = $(() => {
      const l = Ue.value[0];
      return l ? l.column.id in Y.value : !1;
    });
    function rn(l) {
      return r.value ? l === 0 && !Be.value ? { flex: "1 0 var(--pnl-tst-w0)" } : { flex: `0 0 var(--pnl-tst-w${l})` } : { flex: "1 1 0" };
    }
    function yr(l) {
      return { ...rn(0), paddingInlineStart: `${l.depth * Cn.value}px` };
    }
    const En = /* @__PURE__ */ re(null), pi = /* @__PURE__ */ re(null), br = /* @__PURE__ */ re(0), _r = /* @__PURE__ */ re(null), An = /* @__PURE__ */ re(0), Pt = /* @__PURE__ */ re(28);
    function Lo() {
      var g;
      const l = En.value;
      if (!l) return;
      const c = Number.parseFloat(getComputedStyle(l).getPropertyValue("--pnl-tst-row-height"));
      Number.isFinite(c) && c > 0 && (Pt.value = c), An.value = ((g = pi.value) == null ? void 0 : g.offsetHeight) ?? 0, _r.value = l.clientHeight, br.value = l.scrollTop;
    }
    const hi = $(() => {
      const l = fe.value.length;
      if (_r.value === null) return { start: 0, end: Math.min(l, H0) };
      const c = Math.max(0, br.value - An.value), g = Math.max(0, Math.floor(c / Pt.value) - $l), v = Math.ceil(_r.value / Pt.value) + $l * 2 + 1;
      return { start: g, end: Math.min(l, g + v) };
    }), mi = $(() => {
      const l = fe.value, { start: c, end: g } = hi.value, v = l.findIndex((B) => B.id === ln.value), k = [];
      v >= 0 && v < c && k.push({ row: l[v], index: v, held: !0 });
      for (let B = c; B < g; B += 1)
        k.push({ row: l[B], index: B, held: !1 });
      return v >= g && k.push({ row: l[v], index: v, held: !0 }), k;
    });
    function nc(l) {
      return { position: "absolute", top: `${l * Pt.value}px`, left: "0" };
    }
    const rc = $(() => ({
      height: `${fe.value.length * Pt.value}px`,
      paddingTop: `${hi.value.start * Pt.value}px`
    }));
    function oc(l) {
      br.value = l.currentTarget.scrollTop;
    }
    function sc(l) {
      const c = En.value;
      if (!c || _r.value === null) return;
      const g = fe.value.findIndex((B) => B.id === l);
      if (g < 0) return;
      const v = g * Pt.value + An.value, k = v + Pt.value;
      v < c.scrollTop + An.value ? c.scrollTop = v - An.value : k > c.scrollTop + c.clientHeight && (c.scrollTop = k - c.clientHeight), br.value = c.scrollTop;
    }
    function jo(l, c = void 0) {
      l != null && (sc(l), Le(() => {
        var g;
        return (g = On.get(l)) == null ? void 0 : g.focus(c);
      }));
    }
    let ht = null;
    Xr(() => {
      Lo(), typeof ResizeObserver == "function" && (ht = new ResizeObserver(() => Lo()), En.value && ht.observe(En.value));
    }), Yr(() => {
      ht == null || ht.disconnect(), ht = null;
    });
    function ic(l) {
      En.value = l ?? null, ht && (ht.disconnect(), l && (ht.observe(l), Le(Lo)));
    }
    const on = /* @__PURE__ */ re(null), sn = /* @__PURE__ */ re(!0), On = /* @__PURE__ */ new Map();
    function Kt(l) {
      on.value = l, sn.value = !0, qe.value = !1;
    }
    function lc(l, c) {
      c ? On.set(l, c) : On.delete(l);
    }
    const ln = $(() => {
      const l = fe.value;
      return l.length === 0 ? null : l.some((c) => c.id === on.value) ? on.value : l[0].id;
    });
    function Ne(l) {
      l != null && (Kt(l), jo(l));
    }
    function Sr(l) {
      const c = fe.value;
      c.length !== 0 && Ne(c[Math.max(0, Math.min(l, c.length - 1))].id);
    }
    function vi(l, c) {
      const g = fe.value;
      if (g.length === 0) return;
      const v = g[Math.max(0, Math.min(l, g.length - 1))], k = (c == null ? void 0 : c.shiftKey) && _.value && O.value !== "single";
      k && mt.value === null && (mt.value = ln.value), Ne(v.id), k && wi(v, !1);
    }
    function ac(l) {
      const c = fe.value;
      if (c.length === 0) return;
      const g = Math.max(
        0,
        c.findIndex((B) => B.id === ln.value)
      ), v = c[g];
      if (l.ctrlKey || l.metaKey) {
        const B = {
          a: "select-all",
          c: "copy",
          f: $n,
          v: "paste",
          x: "cut",
          z: l.shiftKey ? "redo" : "undo"
        }[l.key.toLowerCase()];
        if (B && Cr(B)) {
          l.preventDefault(), Vo(B);
          return;
        }
      }
      if (l.altKey) {
        const B = {
          ArrowUp: "move-up",
          ArrowDown: "move-down",
          ArrowLeft: "outdent",
          ArrowRight: "indent"
        }[l.key];
        if (B && Cr(B)) {
          l.preventDefault(), Vo(B);
          return;
        }
      }
      if (Fr.value && (l.key === "ContextMenu" || l.key === "F10" && l.shiftKey)) {
        l.preventDefault(), Kc(v);
        return;
      }
      const k = {
        Insert: l.shiftKey ? "new-file" : "new-folder",
        F2: "rename",
        Delete: "delete",
        Escape: "clear-selection"
      }[l.key];
      if (k && Cr(k)) {
        l.preventDefault(), Vo(k);
        return;
      }
      switch (l.key) {
        case "ArrowDown":
          l.preventDefault(), vi(g + 1, l);
          break;
        case "ArrowUp":
          l.preventDefault(), g === 0 && r.value && !l.shiftKey ? C() : vi(g - 1, l);
          break;
        case "ArrowRight":
          if (l.preventDefault(), !Ge(v)) break;
          Ot(v) ? Sr(g + 1) : (v.toggleExpanded(!0), Ne(v.id));
          break;
        case "ArrowLeft":
          l.preventDefault(), !Me.value && v.getCanExpand() && v.getIsExpanded() ? (v.toggleExpanded(!1), Ne(v.id)) : v.parentId && Ne(v.parentId);
          break;
        case "Home":
          l.preventDefault(), Sr(0);
          break;
        case "End":
          l.preventDefault(), Sr(c.length - 1);
          break;
        case "Enter":
          l.preventDefault(), t.emitEvent("activate", { key: v.id });
          break;
        case " ":
          if (!_.value) break;
          l.preventDefault(), Si(v);
          break;
      }
    }
    const mt = /* @__PURE__ */ re(null);
    function xr(l) {
      mt.value = l.id, U.value = {}, l.toggleSelected(!0, { selectChildren: !1 });
    }
    function wi(l, c) {
      const g = fe.value, v = g.findIndex((ge) => ge.id === mt.value), k = g.findIndex((ge) => ge.id === l.id);
      if (k === -1) return;
      if (v === -1) {
        xr(l);
        return;
      }
      c || (U.value = {});
      const [B, Se] = v <= k ? [v, k] : [k, v];
      for (let ge = B; ge <= Se; ge += 1)
        g[ge].toggleSelected(!0, { selectChildren: !1 });
    }
    const uc = $(() => t.state.options.toggle_on_click === !0);
    function cc(l) {
      const c = I(U.value);
      return c.length === 1 && c[0] === l.id;
    }
    function yi() {
      U.value = {}, mt.value = null, sn.value = !1;
    }
    function bi() {
      I(U.value).length === 0 && (sn.value = !1);
    }
    ye(
      () => I(U.value).length > 0,
      (l) => {
        l && (sn.value = !0);
      }
    );
    function fc(l, c) {
      Kt(l.id);
      const g = !!(c != null && c.shiftKey || c != null && c.ctrlKey || c != null && c.metaKey);
      _.value && !g && uc.value && cc(l) ? yi() : _.value && O.value !== "single" ? c != null && c.shiftKey ? wi(l, c.ctrlKey || c.metaKey) : c != null && c.ctrlKey || c != null && c.metaKey ? (mt.value = l.id, pc(l)) : xr(l) : _.value && xr(l), t.emitEvent("activate", { key: l.id });
    }
    function dc(l) {
      Kt(l.id), !Me.value && l.toggleExpanded();
    }
    function _i(l) {
      return J(l) === "all";
    }
    function gc(l) {
      return J(l) === "some";
    }
    function pc(l) {
      Kt(l.id), l.toggleSelected(void 0, { selectChildren: !1 }), bi();
    }
    function Si(l) {
      Kt(l.id), l.toggleSelected(!_i(l), {
        selectChildren: D.value,
        deselectParents: D.value
      }), bi();
    }
    function hc(l) {
      Si(l), Ne(l.id);
    }
    const zo = {
      "new-folder": { icon: qv, label: "New folder", keys: "Insert", node: {} },
      "new-file": {
        icon: Uv,
        label: "New file",
        keys: "Shift+Insert",
        node: { allow_children: !1 }
      },
      rename: { icon: Yv, label: "Rename", keys: "F2" },
      delete: { icon: n0, label: "Delete", keys: "Delete" },
      undo: { icon: r0, label: "Undo", keys: "Control+Z" },
      redo: { icon: Zv, label: "Redo", keys: "Control+Shift+Z" },
      cut: { icon: Jv, label: "Cut", keys: "Control+X" },
      copy: { icon: Wv, label: "Copy", keys: "Control+C" },
      paste: { icon: $v, label: "Paste", keys: "Control+V" },
      "move-up": { icon: Bl, label: "Move up", keys: "Alt+ArrowUp" },
      "move-down": { icon: Vl, label: "Move down", keys: "Alt+ArrowDown" },
      outdent: { icon: Gv, label: "Outdent", keys: "Alt+ArrowLeft" },
      indent: { icon: Xv, label: "Indent", keys: "Alt+ArrowRight" },
      "expand-all": { icon: Bv, label: "Expand all" },
      "collapse-all": { icon: Nv, label: "Collapse all" },
      "select-all": { icon: t0, label: "Select all", keys: "Control+A" },
      "clear-selection": { icon: e0, label: "Clear selection", keys: "Escape" }
    }, mc = [
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
      $n
    ], vc = [
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
    function xi(l, c) {
      const g = l === !0 ? c : Array.isArray(l) ? l : [], v = [];
      return g.forEach((k, B) => {
        const Se = typeof k == "string" ? {} : k || {}, ge = typeof k == "string" ? k : Se.id, Ki = `${ge}#${B}`;
        if (ge === Tt || ge === $n) {
          v.push({ uid: Ki, id: ge });
          return;
        }
        const Kn = zo[ge];
        if (!Kn) return;
        const Vi = Se.label ?? Kn.label;
        v.push({
          uid: Ki,
          id: ge,
          label: Vi,
          icon: A(Se.icon) ?? Kn.icon,
          keys: Kn.keys,
          node: { title: Vi, ...Kn.node ?? {}, ...Se.node ?? {} }
        });
      }), v;
    }
    const Rr = $(() => xi(t.state.options.toolbar, mc)), Ko = $(
      () => xi(t.state.options.menu, vc).filter((l) => l.id !== $n)
    ), wc = $(() => Rr.value.length > 0), yc = $(() => t.state.options.toolbar_label ?? "Tree actions"), Ri = $(() => t.state.options.search_label ?? "Search");
    function Ci(l) {
      return Rr.value.find((c) => c.id === l) ?? Ko.value.find((c) => c.id === l) ?? null;
    }
    function Cr(l) {
      return Ci(l) !== null;
    }
    function Vo(l) {
      const c = Ci(l);
      c && Uo(c);
    }
    const Fe = $(() => fe.value.find((l) => l.id === ln.value) ?? null);
    function bc(l) {
      return fe.value.filter((c) => (c.parentId ?? "") === (l.parentId ?? ""));
    }
    function Mi() {
      const l = Fe.value;
      if (!l) return [];
      const c = Hi(l), g = l.parentId ?? "";
      return c.every((k) => {
        var B;
        return (((B = jn(k)) == null ? void 0 : B.parentId) ?? "") === g;
      }) ? c : [l.id];
    }
    function Bo() {
      const l = Fe.value;
      if (!l) return [];
      if (!_.value || !l.getIsSelected()) return [l.id];
      const c = fe.value.filter((g) => g.getIsSelected()).map((g) => g.id);
      return c.length > 0 ? c : [l.id];
    }
    const No = $(() => {
      var l;
      return ((l = t.state.clipboard) == null ? void 0 : l.keys) ?? [];
    }), _c = $(() => {
      var c;
      const l = new Set(((c = t.state.clipboard) == null ? void 0 : c.mode) === "cut" ? No.value : []);
      return l.size === 0 || fe.value.forEach((g) => {
        g.parentId && l.has(g.parentId) && l.add(g.id);
      }), l;
    });
    function Pn(l) {
      const c = Fe.value;
      if (!c) return null;
      const g = new Set(Mi()), v = bc(c), k = v.map((Se, ge) => g.has(Se.id) ? ge : -1).filter((Se) => Se >= 0);
      if (k.length === 0) return null;
      let B = (l < 0 ? Math.min(...k) : Math.max(...k)) + l;
      for (; B >= 0 && B < v.length && g.has(v[B].id); ) B += l;
      return v[B] ?? null;
    }
    let Xe = null;
    ye(
      () => t.state.source,
      () => {
        const l = Xe;
        if (Xe = null, !!l) {
          if (l.key !== void 0) {
            Ne(l.key);
            return;
          }
          Le(() => {
            l.index !== void 0 ? Sr(l.index) : l.pasted !== void 0 ? xc(l.pasted) : Sc(l.added);
          });
        }
      }
    );
    function Sc(l) {
      const c = G.getCoreRowModel().flatRows.find((g) => !l.has(g.id));
      c && (Ne(c.id), _.value && (U.value = {}, mt.value = c.id, c.toggleSelected(!0, { selectChildren: !1 })), Cr("rename") && Le(() => Er(c.id, !0)));
    }
    function xc(l) {
      const c = G.getCoreRowModel().flatRows.filter((k) => !l.has(k.id)), g = new Set(c.map((k) => k.id)), v = c.filter((k) => !g.has(k.parentId ?? ""));
      v.length !== 0 && (Ne(v[0].id), _.value && (U.value = {}, mt.value = v[0].id, v.forEach((k) => k.toggleSelected(!0, { selectChildren: !1 }))));
    }
    const an = /* @__PURE__ */ re(null), Mr = /* @__PURE__ */ re(""), Dn = /* @__PURE__ */ re(null), vt = /* @__PURE__ */ re(null), $o = /* @__PURE__ */ re(null), Wo = /* @__PURE__ */ re(null), Rc = $(() => t.state.options.extension_warning !== !1);
    function Ii(l) {
      const c = String(l ?? ""), g = c.lastIndexOf(".");
      return g < 0 ? "" : c.slice(g + 1).toLowerCase();
    }
    function Cc(l, c) {
      return Rc.value && f(l, "allow_children") === !1 && Ii(c) !== Ii(l.title ?? "");
    }
    let Ir = null;
    function Er(l, c = !1) {
      const g = jn(l);
      g && (Ir = c ? l : null, Mr.value = g.original.title ?? "", an.value = l, t.setEditingKey(l), Le(() => {
        var v, k;
        (v = Dn.value) == null || v.focus(), (k = Dn.value) == null || k.select();
      }));
    }
    function Ar() {
      Ir = null, vt.value = null, an.value = null, t.setEditingKey("");
    }
    function Ei(l) {
      if (vt.value || an.value !== l.id) return;
      const c = Mr.value.trim(), g = c.length > 0 && c !== (l.original.title ?? "");
      if (g && Ir !== l.id && Cc(l.original, c)) {
        vt.value = { key: l.id, title: c, previous: l.original.title ?? l.id }, Le(() => {
          var v;
          return (v = Wo.value) == null ? void 0 : v.focus();
        });
        return;
      }
      if (Ar(), !g) {
        Ne(l.id);
        return;
      }
      Xe = { key: l.id }, t.emitEvent("rename", { key: l.id, title: c });
    }
    function Ai() {
      const { key: l, title: c } = vt.value;
      vt.value = null, Ar(), Xe = { key: l }, t.emitEvent("rename", { key: l, title: c });
    }
    function Oi() {
      vt.value = null, Le(() => {
        var l, c;
        (l = Dn.value) == null || l.focus(), (c = Dn.value) == null || c.select();
      });
    }
    function Mc(l) {
      var v;
      const c = l.key;
      if (c === "Escape" || c === "n" || c === "N") {
        l.preventDefault(), Oi();
        return;
      }
      if (c === "y" || c === "Y") {
        l.preventDefault(), Ai();
        return;
      }
      if (c !== "Tab" && c !== "ArrowLeft" && c !== "ArrowRight") return;
      l.preventDefault(), (v = (l.target === $o.value ? Wo : $o).value) == null || v.focus();
    }
    function Ic(l) {
      if (an.value !== l.id) return;
      const c = Ir === l.id;
      if (Ar(), !c) {
        Ne(l.id);
        return;
      }
      Xe = { index: fe.value.findIndex((g) => g.id === l.id) }, t.emitEvent("delete", { key: l.id, keys: [l.id] });
    }
    function Ec(l, c) {
      c.key === "Enter" ? (c.preventDefault(), Ei(l)) : c.key === "Escape" && (c.preventDefault(), Ic(l));
    }
    ye(
      () => t.state.editingKey,
      (l) => {
        (l || "") !== (an.value || "") && (l ? Er(l) : Ar());
      }
    ), Xr(() => {
      t.state.editingKey && Er(t.state.editingKey);
    });
    function Or(l, c) {
      const g = Fe.value;
      !g || !l || (Xe = { key: g.id }, t.emitEvent("move", {
        key: g.id,
        keys: Mi(),
        position: c,
        anchorKey: l.id
      }));
    }
    function Ac(l) {
      const c = Fe.value, g = c ? f(c.original, "allow_children") === !1 ? "after" : "child" : null;
      c && g === "child" && !Me.value && c.toggleExpanded(!0), Xe = { added: new Set(G.getCoreRowModel().flatRows.map((v) => v.id)) }, t.emitEvent("add", { anchorKey: (c == null ? void 0 : c.id) ?? null, position: g, node: l.node });
    }
    function Oc() {
      var c;
      const l = Bo();
      l.length !== 0 && (Xe = { index: fe.value.findIndex((g) => {
        var v;
        return g.id === ((v = Fe.value) == null ? void 0 : v.id);
      }) }, t.emitEvent("delete", { key: ((c = Fe.value) == null ? void 0 : c.id) ?? null, keys: l }));
    }
    function Pc(l) {
      Xe = { index: fe.value.findIndex((c) => {
        var g;
        return c.id === ((g = Fe.value) == null ? void 0 : g.id);
      }) }, t.emitEvent(l, {});
    }
    function Dc(l) {
      var g;
      const c = Bo();
      c.length !== 0 && t.emitEvent(l, { key: ((g = Fe.value) == null ? void 0 : g.id) ?? null, keys: c });
    }
    function kc() {
      var v;
      const l = Fe.value, c = l ? f(l.original, "allow_children") === !1 ? "after" : "child" : null;
      l && c === "child" && !Me.value && l.toggleExpanded(!0);
      const g = No.value;
      Xe = ((v = t.state.clipboard) == null ? void 0 : v.mode) === "cut" ? { key: g[0] } : { pasted: new Set(G.getCoreRowModel().flatRows.map((k) => k.id)) }, t.emitEvent("paste", { anchorKey: (l == null ? void 0 : l.id) ?? null, position: c });
    }
    function kn(l) {
      var c;
      switch (l.id) {
        case "new-folder":
        case "new-file":
          return !0;
        case "rename":
          return Fe.value !== null;
        case "delete":
        case "cut":
        case "copy":
          return Bo().length > 0;
        case "paste":
          return No.value.length > 0;
        case "undo":
          return t.state.canUndo === !0;
        case "redo":
          return t.state.canRedo === !0;
        case "move-up":
        case "move-down":
          return !ue.value && Pn(l.id === "move-up" ? -1 : 1) !== null;
        case "indent": {
          const g = Pn(-1);
          return g !== null && f(g.original, "allow_children") !== !1;
        }
        case "outdent":
          return !!((c = Fe.value) != null && c.parentId);
        case "expand-all":
        case "collapse-all":
          return fe.value.length > 0 && !Me.value;
        case "select-all":
          return fe.value.length > 0 && _.value && O.value !== "single";
        case "clear-selection":
          return _.value && I(U.value).length > 0;
        default:
          return !0;
      }
    }
    function Pi(l) {
      return l.keys ? l.keys.replace("Control", "Ctrl") : "";
    }
    function Tc(l) {
      return l.keys ? `${l.label} (${Pi(l)})` : l.label;
    }
    function Uo(l) {
      var c, g, v, k;
      if (kn(l))
        switch (l.id) {
          case "new-folder":
          case "new-file":
            Ac(l);
            break;
          case "rename":
            Er(Fe.value.id);
            break;
          case "delete":
            Oc();
            break;
          case "undo":
          case "redo":
            Pc(l.id);
            break;
          case "cut":
          case "copy":
            Dc(l.id);
            break;
          case "paste":
            kc();
            break;
          case "move-up":
            Or(Pn(-1), "before");
            break;
          case "move-down":
            Or(Pn(1), "after");
            break;
          case "indent": {
            const B = Pn(-1);
            B && !Me.value && B.toggleExpanded(!0), Or(B, "child");
            break;
          }
          case "outdent":
            Or(jn((c = Fe.value) == null ? void 0 : c.parentId), "after");
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
            yi();
            break;
          case $n:
            (v = qo.value) == null || v.focus(), (k = qo.value) == null || k.select();
            break;
        }
    }
    const qo = /* @__PURE__ */ re(null), Go = $(() => Rr.value.filter((l) => l.id in zo)), Pr = /* @__PURE__ */ re(null), Xo = /* @__PURE__ */ new Map(), Di = $(() => {
      const l = Go.value;
      return l.length === 0 ? null : l.some((c) => c.uid === Pr.value) ? Pr.value : l[0].uid;
    });
    function Fc(l, c) {
      c ? Xo.set(l, c) : Xo.delete(l);
    }
    function Dr(l) {
      const c = Go.value;
      if (c.length === 0) return;
      const g = c[Math.max(0, Math.min(l, c.length - 1))].uid;
      Pr.value = g, Le(() => {
        var v;
        return (v = Xo.get(g)) == null ? void 0 : v.focus();
      });
    }
    function Hc(l) {
      const c = Go.value, g = Math.max(
        0,
        c.findIndex((v) => v.uid === Di.value)
      );
      switch (l.key) {
        case "ArrowRight":
          l.preventDefault(), Dr(g + 1);
          break;
        case "ArrowLeft":
          l.preventDefault(), Dr(g - 1);
          break;
        case "Home":
          l.preventDefault(), Dr(0);
          break;
        case "End":
          l.preventDefault(), Dr(c.length - 1);
          break;
      }
    }
    const Tn = /* @__PURE__ */ re(!1), kr = /* @__PURE__ */ re(null), Fn = /* @__PURE__ */ re({ left: 0, top: 0 }), Tr = /* @__PURE__ */ re(null), un = /* @__PURE__ */ re(0), Yo = /* @__PURE__ */ new Map(), Hn = $(() => Ko.value.filter((l) => l.id in zo)), Fr = $(() => Hn.value.length > 0), Lc = $(() => t.state.options.menu_label ?? "Row actions");
    function jc(l, c) {
      c ? Yo.set(l, c) : Yo.delete(l);
    }
    function ki(l) {
      return Hn.value.findIndex((c) => c.uid === l.uid);
    }
    function Ti(l, c, g) {
      if (!Fr.value) return;
      on.value !== l.id && Kt(l.id), kr.value = l.id, Fn.value = { left: c, top: g };
      const v = Hn.value.findIndex((k) => kn(k));
      un.value = Math.max(0, v), Tn.value = !0, Le(Vc);
    }
    function zc(l, c) {
      Fr.value && (c.preventDefault(), _.value && !l.getIsSelected() && xr(l), Ti(l, c.clientX, c.clientY));
    }
    function Kc(l) {
      var g;
      const c = (g = On.get(l.id)) == null ? void 0 : g.getBoundingClientRect();
      Ti(l, c ? c.left + Cn.value : pn, c ? c.bottom : pn);
    }
    function Vc() {
      const l = Tr.value;
      if (!l) return;
      const c = l.getBoundingClientRect();
      let { left: g, top: v } = Fn.value;
      g + c.width > window.innerWidth - pn && (g = Math.max(pn, g - c.width)), v + c.height > window.innerHeight - pn && (v = Math.max(pn, v - c.height)), Fn.value = { left: g, top: v }, Ln(un.value);
    }
    function Ln(l) {
      const c = Hn.value;
      if (c.length === 0) return;
      const g = Math.max(0, Math.min(l, c.length - 1));
      un.value = g, Le(() => {
        var v;
        return (v = Yo.get(c[g].uid)) == null ? void 0 : v.focus();
      });
    }
    function Hr(l = !0, c = void 0) {
      if (!Tn.value) return;
      const g = kr.value;
      Tn.value = !1, kr.value = null, l && g != null && jo(g, c);
    }
    function Bc(l) {
      if (!kn(l)) return;
      const c = kr.value;
      Hr(!1), Ne(c), Uo(l);
    }
    function Nc(l) {
      const c = un.value;
      switch (l.key) {
        case "ArrowDown":
          l.preventDefault(), Ln(c + 1);
          break;
        case "ArrowUp":
          l.preventDefault(), Ln(c - 1);
          break;
        case "Home":
          l.preventDefault(), Ln(0);
          break;
        case "End":
          l.preventDefault(), Ln(Hn.value.length - 1);
          break;
        case "Escape":
        case "Tab":
          l.preventDefault(), Hr();
          break;
      }
    }
    function Zo(l) {
      Tr.value && l.composedPath().includes(Tr.value) || Hr(!1);
    }
    function cn() {
      Hr(!0, { preventScroll: !0 });
    }
    ye(Tn, (l) => {
      l ? (document.addEventListener("pointerdown", Zo, !0), window.addEventListener("resize", cn), window.addEventListener("scroll", cn, !0)) : (document.removeEventListener("pointerdown", Zo, !0), window.removeEventListener("resize", cn), window.removeEventListener("scroll", cn, !0));
    }), Yr(() => {
      document.removeEventListener("pointerdown", Zo, !0), window.removeEventListener("resize", cn), window.removeEventListener("scroll", cn, !0);
    });
    const $c = ["reorder-above", "reorder-below", "make-child", "reparent"], Jo = $(() => t.state.options.enable_dnd === !0), Qo = $(() => String(t.state.options.transfer_group || "")), fn = $(() => String(t.state.tableId || "")), Fi = /* @__PURE__ */ re([]), Lr = /* @__PURE__ */ re(null);
    function jn(l) {
      return fe.value.find((c) => c.id === l) ?? null;
    }
    function Wc(l, c) {
      let g = l;
      for (; g; ) {
        if (c.includes(g.id)) return !0;
        g = g.getParentRow();
      }
      return !1;
    }
    function Hi(l) {
      if (!_.value || !l.getIsSelected()) return [l.id];
      const c = /* @__PURE__ */ new Set();
      for (let v = l.getParentRow(); v; v = v.getParentRow()) c.add(v.id);
      const g = fe.value.filter((v) => v.getIsSelected() && !c.has(v.id)).map((v) => v.id);
      return g.length > 1 ? g : [l.id];
    }
    function Uc(l, c, g) {
      if (!g && Wc(l, c)) return $c;
      const v = ue.value ? ["reorder-above", "reorder-below"] : [];
      return f(l.original, "allow_children") === !1 && v.push("make-child"), v;
    }
    function qc(l) {
      if (Ge(l) && Ot(l)) return "expanded";
      const c = _e(l);
      return c[c.length - 1] === l.id ? "last-in-group" : "standard";
    }
    let es = null, zn = null;
    function ts() {
      zn && clearTimeout(zn), zn = null, es = null;
    }
    function Gc(l, c) {
      if (es === l || (ts(), !c || c.type === "instruction-blocked")) return;
      const g = jn(l);
      !g || !g.getCanExpand() || g.getIsExpanded() || (es = l, zn = setTimeout(() => {
        zn = null;
        const v = jn(l);
        v && v.getCanExpand() && !v.getIsExpanded() && v.toggleExpanded(!0);
      }, L0));
    }
    function Xc() {
      Lr.value = null, ts();
    }
    const Li = /* @__PURE__ */ re(null);
    function Yc() {
      let l = Li.value;
      if (!l) return null;
      let c = l.getRootNode();
      for (; c.host; )
        l = c.host, c = l.getRootNode();
      return l;
    }
    function jr(l) {
      for (const { row: c } of mi.value) {
        const g = On.get(c.id);
        if (!g) continue;
        const v = g.getBoundingClientRect();
        if (l.clientX >= v.left && l.clientX < v.right && l.clientY >= v.top && l.clientY < v.bottom)
          return { row: c, element: g, rect: v };
      }
      return null;
    }
    function Zc(l, c) {
      const g = ".pnl-tst-check, .pnl-tst-twisty, .pnl-tst-edit";
      for (const v of l.element.querySelectorAll(g)) {
        const k = v.getBoundingClientRect();
        if (c.clientX >= k.left && c.clientX < k.right && c.clientY >= k.top && c.clientY < k.bottom)
          return !0;
      }
      return !1;
    }
    const Jc = {
      id: () => fn.value,
      // Anything outside a row (the header, the empty space below the last row) is
      // not a drag handle, and neither is a row control.
      canDragFrom(l) {
        const c = jr(l);
        return c !== null && !Zc(c, l);
      },
      dragData(l) {
        const c = jr(l);
        return c ? {
          type: bn,
          group: Qo.value,
          sourceId: fn.value,
          key: c.row.id,
          keys: Hi(c.row)
        } : null;
      },
      // The registered element is the host, so the default preview would be a
      // snapshot of the whole layout. Point it at the row being dragged, offset so
      // the preview stays under the cursor where it was grabbed.
      preview(l, c) {
        const g = jr(l);
        return g ? (c(g.element, l.clientX - g.rect.left, l.clientY - g.rect.top), !0) : !1;
      },
      setDragging(l) {
        Fi.value = l;
      },
      // Our own rows always. Another pane's only when both name the same group, so a
      // table that opted into nothing shows no drop state at all rather than
      // accepting a drag Python is bound to reject.
      dropData(l, c) {
        const g = jr(l);
        if (!g) return null;
        const v = c.sourceId !== fn.value;
        if (v && !(Qo.value && c.group === Qo.value))
          return { type: bn, key: null, paneId: fn.value };
        const k = { type: bn, key: g.row.id, paneId: fn.value };
        return xm(k, {
          element: g.element,
          input: l,
          currentLevel: g.row.depth,
          indentPerLevel: Cn.value,
          mode: qc(g.row),
          block: Uc(g.row, c.keys ?? [], v)
        });
      },
      showDrop(l, c) {
        Lr.value = { key: l, instruction: c }, Gc(l, c);
      },
      clearDrop: Xc,
      drop(l, c, g, v) {
        const k = l.keys ?? [];
        if (k.length === 0) return;
        const B = {
          targetKey: c,
          instruction: g.type,
          desiredLevel: g.desiredLevel ?? g.currentLevel
        };
        if (l.sourceId === fn.value) {
          if (k.includes(c)) return;
          t.emitEvent("move", { key: l.key, keys: k, ...B });
          return;
        }
        Xe = { pasted: new Set(G.getCoreRowModel().flatRows.map((Se) => Se.id)) }, t.emitEvent("transfer", {
          keys: k,
          sourceId: l.sourceId,
          copy: !!(v != null && v.ctrlKey || v != null && v.altKey),
          ...B
        });
      }
    };
    let Dt = null;
    function ji() {
      Dt == null || Dt(), Dt = null;
      const l = Yc();
      !l || !Jo.value || (Dt = wv(l, Jc));
    }
    Xr(ji), ye(Jo, ji), Yr(() => {
      ts(), Dt == null || Dt();
    });
    function ns(l) {
      var c;
      return ((c = Lr.value) == null ? void 0 : c.key) === l.id ? Lr.value.instruction : null;
    }
    function Qc(l) {
      const c = f(l.original, "class");
      return typeof c == "string" ? c : null;
    }
    function ef(l) {
      const c = ns(l);
      return {
        "pnl-tst-row--draggable": Jo.value,
        "pnl-tst-row--dragging": Fi.value.includes(l.id),
        "pnl-tst-row--blocked": (c == null ? void 0 : c.type) === "instruction-blocked",
        "pnl-tst-row--child-target": (c == null ? void 0 : c.type) === "make-child"
      };
    }
    function zi(l) {
      const c = ns(l);
      return c ? c.type === "reorder-above" ? "pnl-tst-dropline--above" : c.type === "reorder-below" || c.type === "reparent" ? "pnl-tst-dropline--below" : null : null;
    }
    function tf(l) {
      const c = ns(l);
      return c ? { insetInlineStart: `${(c.type === "reparent" ? c.desiredLevel : c.currentLevel) * c.indentPerLevel}px` } : null;
    }
    return (l, c) => (ne(), oe("div", {
      ref_key: "rootElement",
      ref: Li,
      class: "pnl-tst"
    }, [
      wc.value ? (ne(), oe("div", {
        key: 0,
        class: "pnl-tst-toolbar",
        role: "toolbar",
        "aria-orientation": "horizontal",
        "aria-label": yc.value
      }, [
        (ne(!0), oe(Ie, null, Bn(Rr.value, (g) => (ne(), oe(Ie, {
          key: g.uid
        }, [
          g.id === "|" ? (ne(), oe("span", s0)) : g.id === "search" ? (ne(), oe("label", i0, [
            xe("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: Ut(Qv)
            }, null, 8, l0),
            xe("input", {
              ref_for: !0,
              ref: (v) => qo.value = v,
              type: "search",
              value: At.value,
              "aria-label": Ri.value,
              placeholder: Ri.value,
              onInput: c[0] || (c[0] = (v) => pt(v.target.value))
            }, null, 40, a0)
          ])) : (ne(), oe("button", {
            key: 2,
            ref_for: !0,
            ref: (v) => Fc(g.uid, v),
            type: "button",
            class: "pnl-tst-tbtn",
            "aria-label": g.label,
            "aria-keyshortcuts": g.keys,
            "aria-disabled": !kn(g),
            title: Tc(g),
            tabindex: g.uid === Di.value ? 0 : -1,
            onClick: (v) => Uo(g),
            onFocus: (v) => Pr.value = g.uid,
            onKeydown: Hc
          }, [
            xe("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: g.icon
            }, null, 8, c0)
          ], 40, u0))
        ], 64))), 128))
      ], 8, o0)) : Ye("", !0),
      fe.value.length === 0 ? (ne(), oe("div", f0, Ft(nn.value), 1)) : (ne(), oe("div", {
        key: 2,
        ref: ic,
        class: st(["pnl-tst-grid", { "pnl-tst-grid--resizing": we.value !== null }]),
        role: "treegrid",
        "aria-label": zt.value,
        "aria-colcount": Ue.value.length,
        "aria-rowcount": wr.value,
        style: ot(Pe.value),
        onKeydown: ac,
        onScroll: oc
      }, [
        r.value ? (ne(), oe("div", {
          key: 0,
          ref_key: "headElement",
          ref: pi,
          class: "pnl-tst-head",
          role: "rowgroup"
        }, [
          xe("div", g0, [
            (ne(!0), oe(Ie, null, Bn(Ue.value, (g, v) => (ne(), oe("div", {
              key: g.id,
              ref_for: !0,
              ref: (k) => m(g.column.id, k),
              class: st(["pnl-tst-hcell", { "pnl-tst-hcell--sortable": F(g) }]),
              role: "columnheader",
              "aria-colindex": v + 1,
              "aria-sort": T(g),
              "aria-keyshortcuts": H(g) ? "Alt+ArrowLeft Alt+ArrowRight Alt+Home" : void 0,
              tabindex: qe.value && g.column.id === b.value ? 0 : -1,
              style: ot(rn(v)),
              onClick: (k) => N(g),
              onFocus: (k) => In.value = g.column.id,
              onKeydown: (k) => ie(g, k)
            }, [
              xe("span", h0, Ft(g.column.columnDef.header), 1),
              P(g) ? (ne(), oe("span", {
                key: 0,
                class: "pnl-tst-sortind",
                "aria-hidden": "true",
                innerHTML: P(g)
              }, null, 8, m0)) : Ye("", !0),
              H(g) ? (ne(), oe("span", {
                key: 1,
                class: st(["pnl-tst-resize", { "pnl-tst-resize--active": we.value === g.column.id }]),
                "aria-hidden": "true",
                onClick: c[1] || (c[1] = gn(() => {
                }, ["stop"])),
                onDblclick: gn((k) => se(g), ["stop"]),
                onMousedown: (k) => W(g, k),
                onTouchstart: (k) => W(g, k)
              }, null, 42, v0)) : Ye("", !0)
            ], 46, p0))), 128))
          ])
        ], 512)) : Ye("", !0),
        xe("div", {
          class: "pnl-tst-body",
          role: "rowgroup",
          style: ot(rc.value)
        }, [
          (ne(!0), oe(Ie, null, Bn(mi.value, ({ row: g, index: v, held: k }) => (ne(), oe("div", {
            key: g.id,
            ref_for: !0,
            ref: (B) => lc(g.id, B),
            class: st(["pnl-tst-row", [
              ef(g),
              Qc(g),
              {
                "pnl-tst-row--active": sn.value && g.id === on.value,
                "pnl-tst-row--quiet": !sn.value && g.id === on.value,
                "pnl-tst-row--cut": _c.value.has(g.id)
              }
            ]]),
            style: ot(k ? nc(v) : void 0),
            role: "row",
            "aria-level": g.depth + 1,
            "aria-posinset": Ke(g),
            "aria-setsize": Ve(g),
            "aria-rowindex": v + Mn.value,
            "aria-expanded": Ge(g) ? Ot(g) : void 0,
            "aria-selected": _.value ? g.getIsSelected() : void 0,
            "aria-haspopup": Fr.value ? "menu" : void 0,
            tabindex: !qe.value && g.id === ln.value ? 0 : -1,
            onClick: (B) => fc(g, B),
            onContextmenu: (B) => zc(g, B),
            onFocus: (B) => Kt(g.id)
          }, [
            zi(g) ? (ne(), oe("span", {
              key: 0,
              class: st(["pnl-tst-dropline", zi(g)]),
              style: ot(tf(g)),
              "aria-hidden": "true"
            }, null, 6)) : Ye("", !0),
            (ne(!0), oe(Ie, null, Bn(g.getAllCells(), (B, Se) => (ne(), oe("div", {
              key: B.id,
              class: st(["pnl-tst-cell", { "pnl-tst-cell--tree": Se === 0 }]),
              role: "gridcell",
              "aria-colindex": Se + 1,
              style: ot(Se === 0 ? yr(g) : rn(Se))
            }, [
              Se === 0 ? (ne(), oe(Ie, { key: 0 }, [
                Ge(g) ? (ne(), oe("span", {
                  key: 0,
                  class: st(["pnl-tst-twisty", { "pnl-tst-twisty--open": Ot(g) }]),
                  "aria-hidden": "true",
                  onClick: gn((ge) => dc(g), ["stop"])
                }, [...c[4] || (c[4] = [
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
                ])], 10, b0)) : (ne(), oe("span", _0)),
                j.value ? (ne(), oe("input", {
                  key: 2,
                  class: "pnl-tst-check",
                  type: "checkbox",
                  tabindex: "-1",
                  checked: _i(g),
                  ".indeterminate": gc(g),
                  "aria-label": `Select ${g.original.title ?? g.id}`,
                  onClick: gn((ge) => hc(g), ["stop"])
                }, null, 40, S0)) : Ye("", !0),
                z(g) ? (ne(), oe("span", {
                  key: 3,
                  class: "pnl-tst-icon",
                  "aria-hidden": "true",
                  innerHTML: z(g)
                }, null, 8, x0)) : Ye("", !0)
              ], 64)) : Ye("", !0),
              Se === 0 && an.value === g.id ? (ne(), oe("input", {
                key: 1,
                ref_for: !0,
                ref: (ge) => Dn.value = ge,
                class: "pnl-tst-edit",
                type: "text",
                value: Mr.value,
                "aria-label": `Rename ${g.original.title ?? g.id}`,
                onInput: c[2] || (c[2] = (ge) => Mr.value = ge.target.value),
                onClick: c[3] || (c[3] = gn(() => {
                }, ["stop"])),
                onKeydown: gn((ge) => Ec(g, ge), ["stop"]),
                onBlur: (ge) => Ei(g)
              }, null, 40, R0)) : (ne(), oe("span", C0, Ft(B.getValue()), 1))
            ], 14, y0))), 128))
          ], 46, w0))), 128))
        ], 4)
      ], 46, d0)),
      vt.value ? (ne(), oe("div", M0, [
        xe("div", {
          class: "pnl-tst-dialog",
          role: "alertdialog",
          "aria-modal": "true",
          "aria-label": "Rename",
          "aria-describedby": "pnl-tst-confirm-message",
          onKeydown: Mc
        }, [
          xe("p", I0, " Rename " + Ft(vt.value.previous) + " to " + Ft(vt.value.title) + "? If you change a file name extension, the file might become unusable. ", 1),
          xe("div", E0, [
            xe("button", {
              ref_key: "confirmYesButton",
              ref: $o,
              type: "button",
              class: "pnl-tst-dbtn",
              "aria-keyshortcuts": "Y",
              onClick: Ai
            }, [...c[5] || (c[5] = [
              xe("span", { class: "pnl-tst-dkey" }, "Y", -1),
              Ds("es ", -1)
            ])], 512),
            xe("button", {
              ref_key: "confirmNoButton",
              ref: Wo,
              type: "button",
              class: "pnl-tst-dbtn",
              "aria-keyshortcuts": "N",
              onClick: Oi
            }, [...c[6] || (c[6] = [
              xe("span", { class: "pnl-tst-dkey" }, "N", -1),
              Ds("o ", -1)
            ])], 512)
          ])
        ], 32)
      ])) : Ye("", !0),
      Tn.value ? (ne(), oe("div", {
        key: 4,
        ref_key: "menuElement",
        ref: Tr,
        class: "pnl-tst-menu",
        role: "menu",
        "aria-orientation": "vertical",
        "aria-label": Lc.value,
        style: ot({ left: `${Fn.value.left}px`, top: `${Fn.value.top}px` }),
        onKeydown: Nc
      }, [
        (ne(!0), oe(Ie, null, Bn(Ko.value, (g) => (ne(), oe(Ie, {
          key: g.uid
        }, [
          g.id === "|" ? (ne(), oe("div", O0)) : (ne(), oe("button", {
            key: 1,
            ref_for: !0,
            ref: (v) => jc(g.uid, v),
            type: "button",
            class: "pnl-tst-mitem",
            role: "menuitem",
            "aria-keyshortcuts": g.keys,
            "aria-disabled": !kn(g),
            tabindex: ki(g) === un.value ? 0 : -1,
            onClick: (v) => Bc(g),
            onFocus: (v) => un.value = ki(g)
          }, [
            xe("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: g.icon
            }, null, 8, D0),
            xe("span", k0, Ft(g.label), 1),
            g.keys ? (ne(), oe("span", T0, Ft(Pi(g)), 1)) : Ye("", !0)
          ], 40, P0))
        ], 64))), 128))
      ], 44, A0)) : Ye("", !0)
    ], 512));
  }
};
function z0({ model: e, el: t }) {
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
  let i = 0;
  const a = (O, _) => {
    i += 1, s.push({ seq: i, event_name: O, event_params: _ }), s.length > o && s.shift(), e.set("_event_data", { events: [...s], timestamp: Date.now() }), e.save_changes();
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
  }, M = xg(j0, {
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
  z0 as render
};

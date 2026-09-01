/**
* @vue/shared v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function go(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const le = {}, Nt = [], Xe = () => {
}, Ks = () => !1, rr = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), or = (e) => e.startsWith("onUpdate:"), _e = Object.assign, ho = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Wl = Object.prototype.hasOwnProperty, ee = (e, t) => Wl.call(e, t), N = Array.isArray, yt = (e) => _n(e) === "[object Map]", Gn = (e) => _n(e) === "[object Set]", Ko = (e) => _n(e) === "[object Date]", U = (e) => typeof e == "function", de = (e) => typeof e == "string", Je = (e) => typeof e == "symbol", ne = (e) => e !== null && typeof e == "object", $s = (e) => (ne(e) || U(e)) && U(e.then) && U(e.catch), Vs = Object.prototype.toString, _n = (e) => Vs.call(e), Ul = (e) => _n(e).slice(8, -1), Ns = (e) => _n(e) === "[object Object]", mo = (e) => de(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, sn = /* @__PURE__ */ go(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), sr = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Gl = /-\w/g, Le = sr(
  (e) => e.replace(Gl, (t) => t.slice(1).toUpperCase())
), ql = /\B([A-Z])/g, Ft = sr(
  (e) => e.replace(ql, "-$1").toLowerCase()
), Bs = sr((e) => e.charAt(0).toUpperCase() + e.slice(1)), Ar = sr(
  (e) => e ? `on${Bs(e)}` : ""
), ze = (e, t) => !Object.is(e, t), Tr = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Ws = (e, t, n, r = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: r,
    value: n
  });
}, zl = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let $o;
const ir = () => $o || ($o = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Bt(e) {
  if (N(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], o = de(r) ? Zl(r) : Bt(r);
      if (o)
        for (const s in o)
          t[s] = o[s];
    }
    return t;
  } else if (de(e) || ne(e))
    return e;
}
const Yl = /;(?![^(]*\))/g, Xl = /:([^]+)/, Jl = /\/\*[^]*?\*\//g;
function Zl(e) {
  const t = {};
  return e.replace(Jl, "").split(Yl).forEach((n) => {
    if (n) {
      const r = n.split(Xl);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function Ct(e) {
  let t = "";
  if (de(e))
    t = e;
  else if (N(e))
    for (let n = 0; n < e.length; n++) {
      const r = Ct(e[n]);
      r && (t += r + " ");
    }
  else if (ne(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Ql = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", ea = /* @__PURE__ */ go(Ql);
function Us(e) {
  return !!e || e === "";
}
function ta(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let r = 0; n && r < e.length; r++)
    n = lr(e[r], t[r]);
  return n;
}
function Vo(e, t) {
  if (e.size !== t.size) return !1;
  const n = Array.from(t), r = new Uint8Array(n.length);
  for (const o of e) {
    let s = -1;
    for (let i = 0; i < n.length; i++)
      if (!r[i] && lr(o, n[i])) {
        s = i;
        break;
      }
    if (s < 0) return !1;
    r[s] = 1;
  }
  return !0;
}
function lr(e, t) {
  if (e === t) return !0;
  let n = Ko(e), r = Ko(t);
  if (n || r)
    return n && r ? e.getTime() === t.getTime() : !1;
  if (n = Je(e), r = Je(t), n || r)
    return e === t;
  if (n = N(e), r = N(t), n || r)
    return n && r ? ta(e, t) : !1;
  if (n = ne(e), r = ne(t), n || r) {
    if (!n || !r)
      return !1;
    if (n = yt(e), r = yt(t), n || r || (n = Gn(e), r = Gn(t), n || r))
      return n && r ? Vo(e, t) : !1;
    const o = Object.keys(e).length, s = Object.keys(t).length;
    if (o !== s)
      return !1;
    for (const i in e) {
      const l = e.hasOwnProperty(i), a = t.hasOwnProperty(i);
      if (l && !a || !l && a || !lr(e[i], t[i]))
        return !1;
    }
  }
  return String(e) === String(t);
}
const Gs = (e) => !!(e && e.__v_isRef === !0), Vn = (e) => de(e) ? e : e == null ? "" : N(e) || ne(e) && (e.toString === Vs || !U(e.toString)) ? Gs(e) ? Vn(e.value) : JSON.stringify(e, qs, 2) : String(e), qs = (e, t) => Gs(t) ? qs(e, t.value) : yt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [r, o], s) => (n[Dr(r, s) + " =>"] = o, n),
    {}
  )
} : Gn(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Dr(n))
} : Je(t) ? Dr(t) : ne(t) && !N(t) && !Ns(t) ? String(t) : t, Dr = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Je(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let me;
class na {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && me && (me.active ? (this.parent = me, this.index = (me.scopes || (me.scopes = [])).push(
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
      const n = me;
      try {
        return me = this, t();
      } finally {
        me = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = me, me = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (me === this)
        me = this.prevScope;
      else {
        let t = me;
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
function zs() {
  return me;
}
function ra(e, t = !1) {
  me && me.cleanups.push(e);
}
let ie;
const Fr = /* @__PURE__ */ new WeakSet();
class Ys {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, me && (me.active ? me.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Fr.has(this) && (Fr.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Js(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, No(this), Zs(this);
    const t = ie, n = Ke;
    ie = this, Ke = !0;
    try {
      return this.fn();
    } finally {
      Qs(this), ie = t, Ke = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        wo(t);
      this.deps = this.depsTail = void 0, No(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Fr.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Yr(this) && this.run();
  }
  get dirty() {
    return Yr(this);
  }
}
let Xs = 0, ln, an;
function Js(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = an, an = e;
    return;
  }
  e.next = ln, ln = e;
}
function vo() {
  Xs++;
}
function yo() {
  if (--Xs > 0)
    return;
  if (an) {
    let t = an;
    for (an = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; ln; ) {
    let t = ln;
    for (ln = void 0; t; ) {
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
function Zs(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Qs(e) {
  let t, n = e.depsTail, r = n;
  for (; r; ) {
    const o = r.prevDep;
    r.version === -1 ? (r === n && (n = o), wo(r), oa(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = o;
  }
  e.deps = t, e.depsTail = n;
}
function Yr(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (ei(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function ei(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === pn) || (e.globalVersion = pn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Yr(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = ie, r = Ke;
  ie = e, Ke = !0;
  try {
    Zs(e);
    const o = e.fn(e._value);
    (t.version === 0 || ze(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    ie = n, Ke = r, Qs(e), e.flags &= -3;
  }
}
function wo(e, t = !1) {
  const { dep: n, prevSub: r, nextSub: o } = e;
  if (r && (r.nextSub = o, e.prevSub = void 0), o && (o.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
    n.computed.flags &= -5;
    for (let s = n.computed.deps; s; s = s.nextDep)
      wo(s, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function oa(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let Ke = !0;
const ti = [];
function it() {
  ti.push(Ke), Ke = !1;
}
function lt() {
  const e = ti.pop();
  Ke = e === void 0 ? !0 : e;
}
function No(e) {
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
let pn = 0;
class sa {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class bo {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!ie || !Ke || ie === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== ie)
      n = this.activeLink = new sa(ie, this), ie.deps ? (n.prevDep = ie.depsTail, ie.depsTail.nextDep = n, ie.depsTail = n) : ie.deps = ie.depsTail = n, ni(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const r = n.nextDep;
      r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = ie.depsTail, n.nextDep = void 0, ie.depsTail.nextDep = n, ie.depsTail = n, ie.deps === n && (ie.deps = r);
    }
    return n;
  }
  trigger(t) {
    this.version++, pn++, this.notify(t);
  }
  notify(t) {
    vo();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      yo();
    }
  }
}
function ni(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let r = t.deps; r; r = r.nextDep)
        ni(r);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const Xr = /* @__PURE__ */ new WeakMap(), Mt = /* @__PURE__ */ Symbol(
  ""
), Jr = /* @__PURE__ */ Symbol(
  ""
), gn = /* @__PURE__ */ Symbol(
  ""
);
function we(e, t, n) {
  if (Ke && ie) {
    let r = Xr.get(e);
    r || Xr.set(e, r = /* @__PURE__ */ new Map());
    let o = r.get(n);
    o || (r.set(n, o = new bo()), o.map = r, o.key = n), o.track();
  }
}
function ot(e, t, n, r, o, s) {
  const i = Xr.get(e);
  if (!i) {
    pn++;
    return;
  }
  const l = (a) => {
    a && a.trigger();
  };
  if (vo(), t === "clear")
    i.forEach(l);
  else {
    const a = N(e), c = a && mo(n);
    if (a && n === "length") {
      const u = Number(r);
      i.forEach((p, v) => {
        (v === "length" || v === gn || !Je(v) && v >= u) && l(p);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && l(i.get(n)), c && l(i.get(gn)), t) {
        case "add":
          a ? c && l(i.get("length")) : (l(i.get(Mt)), yt(e) && l(i.get(Jr)));
          break;
        case "delete":
          a || (l(i.get(Mt)), yt(e) && l(i.get(Jr)));
          break;
        case "set":
          yt(e) && l(i.get(Mt));
          break;
      }
  }
  yo();
}
function Lt(e) {
  const t = /* @__PURE__ */ Q(e);
  return t === e ? t : (we(t, "iterate", gn), /* @__PURE__ */ He(e) ? t : t.map($e));
}
function ar(e) {
  return we(e = /* @__PURE__ */ Q(e), "iterate", gn), e;
}
function Ge(e, t) {
  return /* @__PURE__ */ at(e) ? Gt(/* @__PURE__ */ Et(e) ? $e(t) : t) : $e(t);
}
const ia = {
  __proto__: null,
  [Symbol.iterator]() {
    return kr(this, Symbol.iterator, (e) => Ge(this, e));
  },
  concat(...e) {
    return Lt(this).concat(
      ...e.map((t) => N(t) ? Lt(t) : t)
    );
  },
  entries() {
    return kr(this, "entries", (e) => (e[1] = Ge(this, e[1]), e));
  },
  every(e, t) {
    return tt(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return tt(
      this,
      "filter",
      e,
      t,
      (n) => n.map((r) => Ge(this, r)),
      arguments
    );
  },
  find(e, t) {
    return tt(
      this,
      "find",
      e,
      t,
      (n) => Ge(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return tt(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return tt(
      this,
      "findLast",
      e,
      t,
      (n) => Ge(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return tt(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return tt(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return jr(this, "includes", e);
  },
  indexOf(...e) {
    return jr(this, "indexOf", e);
  },
  join(e) {
    return Lt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return jr(this, "lastIndexOf", e);
  },
  map(e, t) {
    return tt(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return en(this, "pop");
  },
  push(...e) {
    return en(this, "push", e);
  },
  reduce(e, ...t) {
    return Bo(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Bo(this, "reduceRight", e, t);
  },
  shift() {
    return en(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return tt(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return en(this, "splice", e);
  },
  toReversed() {
    return Lt(this).toReversed();
  },
  toSorted(e) {
    return Lt(this).toSorted(e);
  },
  toSpliced(...e) {
    return Lt(this).toSpliced(...e);
  },
  unshift(...e) {
    return en(this, "unshift", e);
  },
  values() {
    return kr(this, "values", (e) => Ge(this, e));
  }
};
function kr(e, t, n) {
  const r = ar(e), o = r[t]();
  return r !== e && !/* @__PURE__ */ He(e) && (o._next = o.next, o.next = () => {
    const s = o._next();
    return s.done || (s.value = n(s.value)), s;
  }), o;
}
const la = Array.prototype;
function tt(e, t, n, r, o, s) {
  const i = ar(e), l = i !== e && !/* @__PURE__ */ He(e), a = i[t];
  if (a !== la[t]) {
    const p = a.apply(e, s);
    return l ? $e(p) : p;
  }
  let c = n;
  i !== e && (l ? c = function(p, v) {
    return n.call(this, Ge(e, p), v, e);
  } : n.length > 2 && (c = function(p, v) {
    return n.call(this, p, v, e);
  }));
  const u = a.call(i, c, r);
  return l && o ? o(u) : u;
}
function Bo(e, t, n, r) {
  const o = ar(e), s = o !== e && !/* @__PURE__ */ He(e);
  let i = n, l = !1;
  o !== e && (s ? (l = r.length === 0, i = function(c, u, p) {
    return l && (l = !1, c = Ge(e, c)), n.call(this, c, Ge(e, u), p, e);
  }) : n.length > 3 && (i = function(c, u, p) {
    return n.call(this, c, u, p, e);
  }));
  const a = o[t](i, ...r);
  return l ? Ge(e, a) : a;
}
function jr(e, t, n) {
  const r = /* @__PURE__ */ Q(e);
  we(r, "iterate", gn);
  const o = r[t](...n);
  return (o === -1 || o === !1) && /* @__PURE__ */ xo(n[0]) ? (n[0] = /* @__PURE__ */ Q(n[0]), r[t](...n)) : o;
}
function en(e, t, n = []) {
  it(), vo();
  const r = (/* @__PURE__ */ Q(e))[t].apply(e, n);
  return yo(), lt(), r;
}
const aa = /* @__PURE__ */ go("__proto__,__v_isRef,__isVue"), ri = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Je)
);
function ca(e) {
  Je(e) || (e = String(e));
  const t = /* @__PURE__ */ Q(this);
  return we(t, "has", e), t.hasOwnProperty(e);
}
class oi {
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
      return r === (o ? s ? wa : ai : s ? li : ii).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const i = N(t);
    if (!o) {
      let a;
      if (i && (a = ia[n]))
        return a;
      if (n === "hasOwnProperty")
        return ca;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ be(t) ? t : r
    );
    if ((Je(n) ? ri.has(n) : aa(n)) || (o || we(t, "get", n), s))
      return l;
    if (/* @__PURE__ */ be(l)) {
      const a = i && mo(n) ? l : l.value;
      return o && ne(a) ? /* @__PURE__ */ Qr(a) : a;
    }
    return ne(l) ? o ? /* @__PURE__ */ Qr(l) : /* @__PURE__ */ cr(l) : l;
  }
}
class si extends oi {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, o) {
    let s = t[n];
    const i = N(t) && mo(n);
    if (!this._isShallow) {
      const c = /* @__PURE__ */ at(s);
      if (!/* @__PURE__ */ He(r) && !/* @__PURE__ */ at(r) && (s = /* @__PURE__ */ Q(s), r = /* @__PURE__ */ Q(r)), !i && /* @__PURE__ */ be(s) && !/* @__PURE__ */ be(r))
        return c || (s.value = r), !0;
    }
    const l = i ? Number(n) < t.length : ee(t, n), a = Reflect.set(
      t,
      n,
      r,
      /* @__PURE__ */ be(t) ? t : o
    );
    return t === /* @__PURE__ */ Q(o) && a && (l ? ze(r, s) && ot(t, "set", n, r) : ot(t, "add", n, r)), a;
  }
  deleteProperty(t, n) {
    const r = ee(t, n);
    t[n];
    const o = Reflect.deleteProperty(t, n);
    return o && r && ot(t, "delete", n, void 0), o;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!Je(n) || !ri.has(n)) && we(t, "has", n), r;
  }
  ownKeys(t) {
    return we(
      t,
      "iterate",
      N(t) ? "length" : Mt
    ), Reflect.ownKeys(t);
  }
}
class ua extends oi {
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
const fa = /* @__PURE__ */ new si(), da = /* @__PURE__ */ new ua(), pa = /* @__PURE__ */ new si(!0);
const Zr = (e) => e, Dn = (e) => Reflect.getPrototypeOf(e);
function ga(e, t, n) {
  return function(...r) {
    const o = this.__v_raw, s = /* @__PURE__ */ Q(o), i = yt(s), l = e === "entries" || e === Symbol.iterator && i, a = e === "keys" && i, c = o[e](...r), u = n ? Zr : t ? Gt : $e;
    return !t && we(
      s,
      "iterate",
      a ? Jr : Mt
    ), _e(
      // inheriting all iterator properties
      Object.create(c),
      {
        // iterator protocol
        next() {
          const { value: p, done: v } = c.next();
          return v ? { value: p, done: v } : {
            value: l ? [u(p[0]), u(p[1])] : u(p),
            done: v
          };
        }
      }
    );
  };
}
function Fn(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function ha(e, t) {
  const n = {
    get(o) {
      const s = this.__v_raw, i = /* @__PURE__ */ Q(s), l = /* @__PURE__ */ Q(o);
      e || (ze(o, l) && we(i, "get", o), we(i, "get", l));
      const { has: a } = Dn(i), c = t ? Zr : e ? Gt : $e;
      if (a.call(i, o))
        return c(s.get(o));
      if (a.call(i, l))
        return c(s.get(l));
      s !== i && s.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && we(/* @__PURE__ */ Q(o), "iterate", Mt), o.size;
    },
    has(o) {
      const s = this.__v_raw, i = /* @__PURE__ */ Q(s), l = /* @__PURE__ */ Q(o);
      return e || (ze(o, l) && we(i, "has", o), we(i, "has", l)), o === l ? s.has(o) : s.has(o) || s.has(l);
    },
    forEach(o, s) {
      const i = this, l = i.__v_raw, a = /* @__PURE__ */ Q(l), c = t ? Zr : e ? Gt : $e;
      return !e && we(a, "iterate", Mt), l.forEach((u, p) => o.call(s, c(u), c(p), i));
    }
  };
  return _e(
    n,
    e ? {
      add: Fn("add"),
      set: Fn("set"),
      delete: Fn("delete"),
      clear: Fn("clear")
    } : {
      add(o) {
        const s = /* @__PURE__ */ Q(this), i = Dn(s), l = /* @__PURE__ */ Q(o), a = !t && !/* @__PURE__ */ He(o) && !/* @__PURE__ */ at(o) ? l : o;
        return i.has.call(s, a) || ze(o, a) && i.has.call(s, o) || ze(l, a) && i.has.call(s, l) || (s.add(a), ot(s, "add", a, a)), this;
      },
      set(o, s) {
        !t && !/* @__PURE__ */ He(s) && !/* @__PURE__ */ at(s) && (s = /* @__PURE__ */ Q(s));
        const i = /* @__PURE__ */ Q(this), { has: l, get: a } = Dn(i);
        let c = l.call(i, o);
        c || (o = /* @__PURE__ */ Q(o), c = l.call(i, o));
        const u = a.call(i, o);
        return i.set(o, s), c ? ze(s, u) && ot(i, "set", o, s) : ot(i, "add", o, s), this;
      },
      delete(o) {
        const s = /* @__PURE__ */ Q(this), { has: i, get: l } = Dn(s);
        let a = i.call(s, o);
        a || (o = /* @__PURE__ */ Q(o), a = i.call(s, o)), l && l.call(s, o);
        const c = s.delete(o);
        return a && ot(s, "delete", o, void 0), c;
      },
      clear() {
        const o = /* @__PURE__ */ Q(this), s = o.size !== 0, i = o.clear();
        return s && ot(
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
    n[o] = ga(o, e, t);
  }), n;
}
function _o(e, t) {
  const n = ha(e, t);
  return (r, o, s) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(
    ee(n, o) && o in r ? n : r,
    o,
    s
  );
}
const ma = {
  get: /* @__PURE__ */ _o(!1, !1)
}, va = {
  get: /* @__PURE__ */ _o(!1, !0)
}, ya = {
  get: /* @__PURE__ */ _o(!0, !1)
};
const ii = /* @__PURE__ */ new WeakMap(), li = /* @__PURE__ */ new WeakMap(), ai = /* @__PURE__ */ new WeakMap(), wa = /* @__PURE__ */ new WeakMap();
function ba(e) {
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
function cr(e) {
  return /* @__PURE__ */ at(e) ? e : So(
    e,
    !1,
    fa,
    ma,
    ii
  );
}
// @__NO_SIDE_EFFECTS__
function _a(e) {
  return So(
    e,
    !1,
    pa,
    va,
    li
  );
}
// @__NO_SIDE_EFFECTS__
function Qr(e) {
  return So(
    e,
    !0,
    da,
    ya,
    ai
  );
}
function So(e, t, n, r, o) {
  if (!ne(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const s = o.get(e);
  if (s)
    return s;
  const i = ba(Ul(e));
  if (i === 0)
    return e;
  const l = new Proxy(
    e,
    i === 2 ? r : n
  );
  return o.set(e, l), l;
}
// @__NO_SIDE_EFFECTS__
function Et(e) {
  return /* @__PURE__ */ at(e) ? /* @__PURE__ */ Et(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function at(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function He(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function xo(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function Q(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ Q(t) : e;
}
function Sa(e) {
  return !ee(e, "__v_skip") && Object.isExtensible(e) && Ws(e, "__v_skip", !0), e;
}
const $e = (e) => ne(e) ? /* @__PURE__ */ cr(e) : e, Gt = (e) => ne(e) ? /* @__PURE__ */ Qr(e) : e;
// @__NO_SIDE_EFFECTS__
function be(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Ne(e) {
  return ci(e, !1);
}
// @__NO_SIDE_EFFECTS__
function xa(e) {
  return ci(e, !0);
}
function ci(e, t) {
  return /* @__PURE__ */ be(e) ? e : new Ra(e, t);
}
class Ra {
  constructor(t, n) {
    this.dep = new bo(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ Q(t), this._value = n ? t : $e(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, r = this.__v_isShallow || /* @__PURE__ */ He(t) || /* @__PURE__ */ at(t);
    t = r ? t : /* @__PURE__ */ Q(t), ze(t, n) && (this._rawValue = t, this._value = r ? t : $e(t), this.dep.trigger());
  }
}
function It(e) {
  return /* @__PURE__ */ be(e) ? e.value : e;
}
const Ca = {
  get: (e, t, n) => t === "__v_raw" ? e : It(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return /* @__PURE__ */ be(o) && !/* @__PURE__ */ be(n) ? (o.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function ui(e) {
  return /* @__PURE__ */ Et(e) ? e : new Proxy(e, Ca);
}
class Ma {
  constructor(t, n, r) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new bo(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = pn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    ie !== this)
      return Js(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return ei(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function Ea(e, t, n = !1) {
  let r, o;
  return U(e) ? r = e : (r = e.get, o = e.set), new Ma(r, o, n);
}
const kn = {}, qn = /* @__PURE__ */ new WeakMap();
let Rt;
function Ia(e, t = !1, n = Rt) {
  if (n) {
    let r = qn.get(n);
    r || qn.set(n, r = []), r.push(e);
  }
}
function Oa(e, t, n = le) {
  const { immediate: r, deep: o, once: s, scheduler: i, augmentJob: l, call: a } = n, c = (P) => o ? P : /* @__PURE__ */ He(P) || o === !1 || o === 0 ? vt(P, 1) : vt(P);
  let u, p, v, w, I = !1, C = !1;
  if (/* @__PURE__ */ be(e) ? (p = () => e.value, I = /* @__PURE__ */ He(e)) : /* @__PURE__ */ Et(e) ? (p = () => c(e), I = !0) : N(e) ? (C = !0, I = e.some((P) => /* @__PURE__ */ Et(P) || /* @__PURE__ */ He(P)), p = () => e.map((P) => {
    if (/* @__PURE__ */ be(P))
      return P.value;
    if (/* @__PURE__ */ Et(P))
      return c(P);
    if (U(P))
      return a ? a(P, 2) : P();
  })) : U(e) ? t ? p = a ? () => a(e, 2) : e : p = () => {
    if (v) {
      it();
      try {
        v();
      } finally {
        lt();
      }
    }
    const P = Rt;
    Rt = u;
    try {
      return a ? a(e, 3, [w]) : e(w);
    } finally {
      Rt = P;
    }
  } : p = Xe, t && o) {
    const P = p, B = o === !0 ? 1 / 0 : o;
    p = () => vt(P(), B);
  }
  const F = zs(), L = () => {
    u.stop(), F && F.active && ho(F.effects, u);
  };
  if (s && t) {
    const P = t;
    t = (...B) => {
      const W = P(...B);
      return L(), W;
    };
  }
  let M = C ? new Array(e.length).fill(kn) : kn;
  const k = (P) => {
    if (!(!(u.flags & 1) || !u.dirty && !P))
      if (t) {
        const B = u.run();
        if (P || o || I || (C ? B.some((W, G) => ze(W, M[G])) : ze(B, M))) {
          v && v();
          const W = Rt;
          Rt = u;
          try {
            const G = [
              B,
              // pass undefined as the old value when it's changed for the first time
              M === kn ? void 0 : C && M[0] === kn ? [] : M,
              w
            ];
            M = B, a ? a(t, 3, G) : (
              // @ts-expect-error
              t(...G)
            );
          } finally {
            Rt = W;
          }
        }
      } else
        u.run();
  };
  return l && l(k), u = new Ys(p), u.scheduler = i ? () => i(k, !1) : k, w = (P) => Ia(P, !1, u), v = u.onStop = () => {
    const P = qn.get(u);
    if (P) {
      if (a)
        a(P, 4);
      else
        for (const B of P) B();
      qn.delete(u);
    }
  }, t ? r ? k(!0) : M = u.run() : i ? i(k.bind(null, !0), !0) : u.run(), L.pause = u.pause.bind(u), L.resume = u.resume.bind(u), L.stop = L, L;
}
function vt(e, t = 1 / 0, n) {
  if (t <= 0 || !ne(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ be(e))
    vt(e.value, t, n);
  else if (N(e))
    for (let r = 0; r < e.length; r++)
      vt(e[r], t, n);
  else if (Gn(e) || yt(e))
    e.forEach((r) => {
      vt(r, t, n);
    });
  else if (Ns(e)) {
    for (const r in e)
      vt(e[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, r) && vt(e[r], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Sn(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (o) {
    ur(o, t, n);
  }
}
function Ve(e, t, n, r) {
  if (U(e)) {
    const o = Sn(e, t, n, r);
    return o && $s(o) && o.catch((s) => {
      ur(s, t, n);
    }), o;
  }
  if (N(e)) {
    const o = [];
    for (let s = 0; s < e.length; s++)
      o.push(Ve(e[s], t, n, r));
    return o;
  }
}
function ur(e, t, n, r = !0) {
  const o = t ? t.vnode : null, { errorHandler: s, throwUnhandledErrorInProduction: i } = t && t.appContext.config || le;
  if (t) {
    let l = t.parent;
    const a = t.proxy, c = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const u = l.ec;
      if (u) {
        for (let p = 0; p < u.length; p++)
          if (u[p](e, a, c) === !1)
            return;
      }
      l = l.parent;
    }
    if (s) {
      it(), Sn(s, null, 10, [
        e,
        a,
        c
      ]), lt();
      return;
    }
  }
  Pa(e, n, o, r, i);
}
function Pa(e, t, n, r = !0, o = !1) {
  if (o)
    throw e;
  console.error(e);
}
const Ee = [];
let We = -1;
const Wt = [];
let mt = null, $t = 0;
const fi = /* @__PURE__ */ Promise.resolve();
let zn = null;
function eo(e) {
  const t = zn || fi;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Aa(e) {
  let t = We + 1, n = Ee.length;
  for (; t < n; ) {
    const r = t + n >>> 1, o = Ee[r], s = hn(o);
    s < e || s === e && o.flags & 2 ? t = r + 1 : n = r;
  }
  return t;
}
function Ro(e) {
  if (!(e.flags & 1)) {
    const t = hn(e), n = Ee[Ee.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= hn(n) ? Ee.push(e) : Ee.splice(Aa(t), 0, e), e.flags |= 1, di();
  }
}
function di() {
  zn || (zn = fi.then(gi));
}
function Ta(e) {
  if (!N(e))
    mt && e.id === -1 ? mt.splice($t + 1, 0, e) : e.flags & 1 || (Wt.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      Wt.push(e[t]);
  di();
}
function Wo(e, t, n = We + 1) {
  for (; n < Ee.length; n++) {
    const r = Ee[n];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid)
        continue;
      Ee.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function pi(e) {
  if (Wt.length) {
    const t = [...new Set(Wt)].sort(
      (n, r) => hn(n) - hn(r)
    );
    if (Wt.length = 0, mt) {
      for (let n = 0; n < t.length; n++)
        mt.push(t[n]);
      return;
    }
    for (mt = t, $t = 0; $t < mt.length; $t++) {
      const n = mt[$t];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    mt = null, $t = 0;
  }
}
const hn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function gi(e) {
  try {
    for (We = 0; We < Ee.length; We++) {
      const t = Ee[We];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Sn(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; We < Ee.length; We++) {
      const t = Ee[We];
      t && (t.flags &= -2);
    }
    We = -1, Ee.length = 0, pi(), zn = null, (Ee.length || Wt.length) && gi();
  }
}
let Ye = null, hi = null;
function Yn(e) {
  const t = Ye;
  return Ye = e, hi = e && e.type.__scopeId || null, t;
}
function Da(e, t = Ye, n) {
  if (!t || e._n)
    return e;
  const r = (...o) => {
    r._d && ts(-1);
    const s = Yn(t), i = Ot.length;
    let l;
    try {
      l = e(...o);
    } finally {
      for (let a = Ot.length; a > i; a--) Vi();
      Yn(s), r._d && ts(1);
    }
    return l;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function St(e, t, n, r) {
  const o = e.dirs, s = t && t.dirs;
  for (let i = 0; i < o.length; i++) {
    const l = o[i];
    s && (l.oldValue = s[i].value);
    let a = l.dir[r];
    a && (it(), Ve(a, n, 8, [
      e.el,
      l,
      e,
      t
    ]), lt());
  }
}
function Fa(e, t) {
  if (Oe) {
    let n = Oe.provides;
    const r = Oe.parent && Oe.parent.provides;
    r === n && (n = Oe.provides = Object.create(r)), n[e] = t;
  }
}
function Nn(e, t, n = !1) {
  const r = Ac();
  if (r || Ut) {
    let o = Ut ? Ut._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && U(t) ? t.call(r && r.proxy) : t;
  }
}
const ka = /* @__PURE__ */ Symbol.for("v-scx"), ja = () => Nn(ka);
function Te(e, t, n) {
  return mi(e, t, n);
}
function mi(e, t, n = le) {
  const { immediate: r, deep: o, flush: s, once: i } = n, l = _e({}, n), a = t && r || !t && s !== "post";
  let c;
  if (yn) {
    if (s === "sync") {
      const w = ja();
      c = w.__watcherHandles || (w.__watcherHandles = []);
    } else if (!a) {
      const w = () => {
      };
      return w.stop = Xe, w.resume = Xe, w.pause = Xe, w;
    }
  }
  const u = Oe;
  l.call = (w, I, C) => Ve(w, u, I, C);
  let p = !1;
  s === "post" ? l.scheduler = (w) => {
    Ae(w, u && u.suspense);
  } : s !== "sync" && (p = !0, l.scheduler = (w, I) => {
    I ? w() : Ro(w);
  }), l.augmentJob = (w) => {
    t && (w.flags |= 4), p && (w.flags |= 2, u && (w.id = u.uid, w.i = u));
  };
  const v = Oa(e, t, l);
  return yn && (c ? c.push(v) : a && v()), v;
}
function Ha(e, t, n) {
  const r = this.proxy, o = de(e) ? e.includes(".") ? vi(r, e) : () => r[e] : e.bind(r, r);
  let s;
  U(t) ? s = t : (s = t.handler, n = t);
  const i = xn(this), l = mi(o, s.bind(r), n);
  return i(), l;
}
function vi(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++)
      r = r[n[o]];
    return r;
  };
}
const La = /* @__PURE__ */ Symbol("_vte"), fr = (e) => e.__isTeleport, Hr = /* @__PURE__ */ Symbol("_leaveCb");
function Ka(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== ct) {
        t = n;
        break;
      }
  }
  return t;
}
function yi(e) {
  if (!Mo(e))
    return fr(e.type) && e.children ? Ka(e.children) : e;
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
function Co(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    Co(
      fr(n.type) && yi(n) || n,
      t
    );
  } else e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function wi(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Uo(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const Xn = /* @__PURE__ */ new WeakMap();
function cn(e, t, n, r, o = !1) {
  if (N(e)) {
    e.forEach(
      (C, F) => cn(
        C,
        t && (N(t) ? t[F] : t),
        n,
        r,
        o
      )
    );
    return;
  }
  if (un(r) && !o) {
    r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && cn(e, t, n, r.component.subTree);
    return;
  }
  const s = r.shapeFlag & 4 ? Oo(r.component) : r.el, i = o ? null : s, { i: l, r: a } = e, c = t && t.r, u = l.refs === le ? l.refs = {} : l.refs, p = l.setupState, v = /* @__PURE__ */ Q(p), w = p === le ? Ks : (C) => Uo(u, C) ? !1 : ee(v, C), I = (C, F) => !(F && Uo(u, F));
  if (c != null && c !== a) {
    if (Go(t), de(c))
      u[c] = null, w(c) && (p[c] = null);
    else if (/* @__PURE__ */ be(c)) {
      const C = t;
      I(c, C.k) && (c.value = null), C.k && (u[C.k] = null);
    }
  }
  if (U(a))
    Sn(a, l, 12, [i, u]);
  else {
    const C = de(a), F = /* @__PURE__ */ be(a);
    if (C || F) {
      const L = () => {
        if (e.f) {
          const M = C ? w(a) ? p[a] : u[a] : I() || !e.k ? a.value : u[e.k];
          if (o)
            N(M) && ho(M, s);
          else if (N(M))
            M.includes(s) || M.push(s);
          else if (C)
            u[a] = [s], w(a) && (p[a] = u[a]);
          else {
            const k = [s];
            I(a, e.k) && (a.value = k), e.k && (u[e.k] = k);
          }
        } else C ? (u[a] = i, w(a) && (p[a] = i)) : F && (I(a, e.k) && (a.value = i), e.k && (u[e.k] = i));
      };
      if (i) {
        const M = () => {
          L(), Xn.delete(e);
        };
        M.id = -1, Xn.set(e, M), Ae(M, n);
      } else
        Go(e), L();
    }
  }
}
function Go(e) {
  const t = Xn.get(e);
  t && (t.flags |= 8, Xn.delete(e));
}
ir().requestIdleCallback;
ir().cancelIdleCallback;
const un = (e) => !!e.type.__asyncLoader, Mo = (e) => e.type.__isKeepAlive;
function $a(e, t) {
  bi(e, "a", t);
}
function Va(e, t) {
  bi(e, "da", t);
}
function bi(e, t, n = Oe) {
  const r = e.__wdc || (e.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (dr(t, r, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      Mo(o.parent.vnode) && Na(r, t, n, o), o = o.parent;
  }
}
function Na(e, t, n, r) {
  const o = dr(
    t,
    e,
    r,
    !0
    /* prepend */
  );
  xi(() => {
    ho(r[t], o);
  }, n);
}
function dr(e, t, n = Oe, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), s = t.__weh || (t.__weh = (...i) => {
      it();
      const l = xn(n), a = Ve(t, n, e, i);
      return l(), lt(), a;
    });
    return r ? o.unshift(s) : o.push(s), s;
  }
}
const ft = (e) => (t, n = Oe) => {
  (!yn || e === "sp") && dr(e, (...r) => t(...r), n);
}, Ba = ft("bm"), _i = ft("m"), Wa = ft(
  "bu"
), Ua = ft("u"), Si = ft(
  "bum"
), xi = ft("um"), Ga = ft(
  "sp"
), qa = ft("rtg"), za = ft("rtc");
function Ya(e, t = Oe) {
  dr("ec", e, t);
}
const Xa = /* @__PURE__ */ Symbol.for("v-ndc");
function jn(e, t, n, r) {
  let o;
  const s = n, i = N(e);
  if (i || de(e)) {
    const l = i && /* @__PURE__ */ Et(e);
    let a = !1, c = !1;
    l && (a = !/* @__PURE__ */ He(e), c = /* @__PURE__ */ at(e), e = ar(e)), o = new Array(e.length);
    for (let u = 0, p = e.length; u < p; u++)
      o[u] = t(
        a ? c ? Gt($e(e[u])) : $e(e[u]) : e[u],
        u,
        void 0,
        s
      );
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let l = 0; l < e; l++)
      o[l] = t(l + 1, l, void 0, s);
  } else if (ne(e))
    if (e[Symbol.iterator])
      o = Array.from(
        e,
        (l, a) => t(l, a, void 0, s)
      );
    else {
      const l = Object.keys(e);
      o = new Array(l.length);
      for (let a = 0, c = l.length; a < c; a++) {
        const u = l[a];
        o[a] = t(e[u], u, a, s);
      }
    }
  else
    o = [];
  return o;
}
const to = (e) => e ? Ui(e) ? Oo(e) : to(e.parent) : null, fn = (
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
    $parent: (e) => to(e.parent),
    $root: (e) => to(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Ci(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Ro(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = eo.bind(e.proxy)),
    $watch: (e) => Ha.bind(e)
  })
), Lr = (e, t) => e !== le && !e.__isScriptSetup && ee(e, t), Ja = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: r, data: o, props: s, accessCache: i, type: l, appContext: a } = e;
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
        if (Lr(r, t))
          return i[t] = 1, r[t];
        if (o !== le && ee(o, t))
          return i[t] = 2, o[t];
        if (ee(s, t))
          return i[t] = 3, s[t];
        if (n !== le && ee(n, t))
          return i[t] = 4, n[t];
        no && (i[t] = 0);
      }
    }
    const c = fn[t];
    let u, p;
    if (c)
      return t === "$attrs" && we(e.attrs, "get", ""), c(e);
    if (
      // css module (injected by vue-loader)
      (u = l.__cssModules) && (u = u[t])
    )
      return u;
    if (n !== le && ee(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      p = a.config.globalProperties, ee(p, t)
    )
      return p[t];
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: o, ctx: s } = e;
    return Lr(o, t) ? (o[t] = n, !0) : r !== le && ee(r, t) ? (r[t] = n, !0) : ee(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (s[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: o, props: s, type: i }
  }, l) {
    let a;
    return !!(n[l] || e !== le && l[0] !== "$" && ee(e, l) || Lr(t, l) || ee(s, l) || ee(r, l) || ee(fn, l) || ee(o.config.globalProperties, l) || (a = i.__cssModules) && a[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : ee(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function qo(e) {
  return N(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let no = !0;
function Za(e) {
  const t = Ci(e), n = e.proxy, r = e.ctx;
  no = !1, t.beforeCreate && zo(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: s,
    methods: i,
    watch: l,
    provide: a,
    inject: c,
    // lifecycle
    created: u,
    beforeMount: p,
    mounted: v,
    beforeUpdate: w,
    updated: I,
    activated: C,
    deactivated: F,
    beforeDestroy: L,
    beforeUnmount: M,
    destroyed: k,
    unmounted: P,
    render: B,
    renderTracked: W,
    renderTriggered: G,
    errorCaptured: $,
    serverPrefetch: D,
    // public API
    expose: z,
    inheritAttrs: ae,
    // assets
    components: oe,
    directives: he,
    filters: Se
  } = t;
  if (c && Qa(c, r, null), i)
    for (const X in i) {
      const Y = i[X];
      U(Y) && (r[X] = Y.bind(n));
    }
  if (o) {
    const X = o.call(n, n);
    ne(X) && (e.data = /* @__PURE__ */ cr(X));
  }
  if (no = !0, s)
    for (const X in s) {
      const Y = s[X], De = U(Y) ? Y.bind(n, n) : U(Y.get) ? Y.get.bind(n, n) : Xe, dt = !U(Y) && U(Y.set) ? Y.set.bind(n) : Xe, Ze = te({
        get: De,
        set: dt
      });
      Object.defineProperty(r, X, {
        enumerable: !0,
        configurable: !0,
        get: () => Ze.value,
        set: (ge) => Ze.value = ge
      });
    }
  if (l)
    for (const X in l)
      Ri(l[X], r, n, X);
  if (a) {
    const X = U(a) ? a.call(n) : a;
    Reflect.ownKeys(X).forEach((Y) => {
      Fa(Y, X[Y]);
    });
  }
  u && zo(u, e, "c");
  function se(X, Y) {
    N(Y) ? Y.forEach((De) => X(De.bind(n))) : Y && X(Y.bind(n));
  }
  if (se(Ba, p), se(_i, v), se(Wa, w), se(Ua, I), se($a, C), se(Va, F), se(Ya, $), se(za, W), se(qa, G), se(Si, M), se(xi, P), se(Ga, D), N(z))
    if (z.length) {
      const X = e.exposed || (e.exposed = {});
      z.forEach((Y) => {
        Object.defineProperty(X, Y, {
          get: () => n[Y],
          set: (De) => n[Y] = De,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  B && e.render === Xe && (e.render = B), ae != null && (e.inheritAttrs = ae), oe && (e.components = oe), he && (e.directives = he), D && wi(e);
}
function Qa(e, t, n = Xe) {
  N(e) && (e = ro(e));
  for (const r in e) {
    const o = e[r];
    let s;
    ne(o) ? "default" in o ? s = Nn(
      o.from || r,
      o.default,
      !0
    ) : s = Nn(o.from || r) : s = Nn(o), /* @__PURE__ */ be(s) ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (i) => s.value = i
    }) : t[r] = s;
  }
}
function zo(e, t, n) {
  Ve(
    N(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Ri(e, t, n, r) {
  let o = r.includes(".") ? vi(n, r) : () => n[r];
  if (de(e)) {
    const s = t[e];
    U(s) && Te(o, s);
  } else if (U(e))
    Te(o, e.bind(n));
  else if (ne(e))
    if (N(e))
      e.forEach((s) => Ri(s, t, n, r));
    else {
      const s = U(e.handler) ? e.handler.bind(n) : t[e.handler];
      U(s) && Te(o, s, e);
    }
}
function Ci(e) {
  const t = e.type, { mixins: n, extends: r } = t, {
    mixins: o,
    optionsCache: s,
    config: { optionMergeStrategies: i }
  } = e.appContext, l = s.get(t);
  let a;
  return l ? a = l : !o.length && !n && !r ? a = t : (a = {}, o.length && o.forEach(
    (c) => Jn(a, c, i, !0)
  ), Jn(a, t, i)), ne(t) && s.set(t, a), a;
}
function Jn(e, t, n, r = !1) {
  const { mixins: o, extends: s } = t;
  s && Jn(e, s, n, !0), o && o.forEach(
    (i) => Jn(e, i, n, !0)
  );
  for (const i in t)
    if (!(r && i === "expose")) {
      const l = ec[i] || n && n[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const ec = {
  data: Yo,
  props: Xo,
  emits: Xo,
  // objects
  methods: rn,
  computed: rn,
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
  components: rn,
  directives: rn,
  // watch
  watch: nc,
  // provide / inject
  provide: Yo,
  inject: tc
};
function Yo(e, t) {
  return t ? e ? function() {
    return _e(
      U(e) ? e.call(this, this) : e,
      U(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function tc(e, t) {
  return rn(ro(e), ro(t));
}
function ro(e) {
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
function rn(e, t) {
  return e ? _e(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Xo(e, t) {
  return e ? N(e) && N(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : _e(
    /* @__PURE__ */ Object.create(null),
    qo(e),
    qo(t ?? {})
  ) : t;
}
function nc(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = _e(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = Me(e[r], t[r]);
  return n;
}
function Mi() {
  return {
    app: null,
    config: {
      isNativeTag: Ks,
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
let rc = 0;
function oc(e, t) {
  return function(r, o = null) {
    U(r) || (r = _e({}, r)), o != null && !ne(o) && (o = null);
    const s = Mi(), i = /* @__PURE__ */ new WeakSet(), l = [];
    let a = !1;
    const c = s.app = {
      _uid: rc++,
      _component: r,
      _props: o,
      _container: null,
      _context: s,
      _instance: null,
      version: Hc,
      get config() {
        return s.config;
      },
      set config(u) {
      },
      use(u, ...p) {
        return i.has(u) || (u && U(u.install) ? (i.add(u), u.install(c, ...p)) : U(u) && (i.add(u), u(c, ...p))), c;
      },
      mixin(u) {
        return s.mixins.includes(u) || s.mixins.push(u), c;
      },
      component(u, p) {
        return p ? (s.components[u] = p, c) : s.components[u];
      },
      directive(u, p) {
        return p ? (s.directives[u] = p, c) : s.directives[u];
      },
      mount(u, p, v) {
        if (!a) {
          const w = c._ceVNode || st(r, o);
          return w.appContext = s, v === !0 ? v = "svg" : v === !1 && (v = void 0), e(w, u, v), a = !0, c._container = u, u.__vue_app__ = c, Oo(w.component);
        }
      },
      onUnmount(u) {
        l.push(u);
      },
      unmount() {
        a && (Ve(
          l,
          c._instance,
          16
        ), e(null, c._container), delete c._container.__vue_app__);
      },
      provide(u, p) {
        return s.provides[u] = p, c;
      },
      runWithContext(u) {
        const p = Ut;
        Ut = c;
        try {
          return u();
        } finally {
          Ut = p;
        }
      }
    };
    return c;
  };
}
let Ut = null;
const sc = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Le(t)}Modifiers`] || e[`${Ft(t)}Modifiers`];
function ic(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || le;
  let o = n;
  const s = t.startsWith("update:"), i = s && sc(r, t.slice(7));
  i && (i.trim && (o = n.map((u) => de(u) ? u.trim() : u)), i.number && (o = o.map(zl)));
  let l, a = r[l = Ar(t)] || // also try camelCase event handler (#2249)
  r[l = Ar(Le(t))];
  !a && s && (a = r[l = Ar(Ft(t))]), a && Ve(
    a,
    e,
    6,
    o
  );
  const c = r[l + "Once"];
  if (c) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, Ve(
      c,
      e,
      6,
      o
    );
  }
}
const lc = /* @__PURE__ */ new WeakMap();
function Ei(e, t, n = !1) {
  const r = n ? lc : t.emitsCache, o = r.get(e);
  if (o !== void 0)
    return o;
  const s = e.emits;
  let i = {}, l = !1;
  if (!U(e)) {
    const a = (c) => {
      const u = Ei(c, t, !0);
      u && (l = !0, _e(i, u));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !s && !l ? (ne(e) && r.set(e, null), null) : (N(s) ? s.forEach((a) => i[a] = null) : _e(i, s), ne(e) && r.set(e, i), i);
}
function pr(e, t) {
  return !e || !rr(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), ee(e, t[0].toLowerCase() + t.slice(1)) || ee(e, Ft(t)) || ee(e, t));
}
function Jo(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: o,
    propsOptions: [s],
    slots: i,
    attrs: l,
    emit: a,
    render: c,
    renderCache: u,
    props: p,
    data: v,
    setupState: w,
    ctx: I,
    inheritAttrs: C
  } = e, F = Yn(e);
  let L, M;
  try {
    if (n.shapeFlag & 4) {
      const P = o || r, B = P;
      L = qe(
        c.call(
          B,
          P,
          u,
          p,
          w,
          v,
          I
        )
      ), M = l;
    } else {
      const P = t;
      L = qe(
        P.length > 1 ? P(
          p,
          { attrs: l, slots: i, emit: a }
        ) : P(
          p,
          null
        )
      ), M = t.props ? l : ac(l);
    }
  } catch (P) {
    Ot.length = 0, ur(P, e, 1), L = st(ct);
  }
  let k = L;
  if (M && C !== !1) {
    const P = Object.keys(M), { shapeFlag: B } = k;
    P.length && B & 7 && (s && P.some(or) && (M = cc(
      M,
      s
    )), k = qt(k, M, !1, !0));
  }
  if (n.dirs && (k = qt(k, null, !1, !0), k.dirs = k.dirs ? k.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const P = fr(k.type) && yi(k) || k;
    Co(P, n.transition);
  }
  return L = k, Yn(F), L;
}
const ac = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || rr(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, cc = (e, t) => {
  const n = {};
  for (const r in e)
    (!or(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
  return n;
};
function uc(e, t, n) {
  const { props: r, children: o, component: s } = e, { props: i, children: l, patchFlag: a } = t, c = s.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return r ? Zo(r, i, c) : !!i;
    if (a & 8) {
      const u = t.dynamicProps;
      for (let p = 0; p < u.length; p++) {
        const v = u[p];
        if (Ii(i, r, v) && !pr(c, v))
          return !0;
      }
    }
  } else
    return (o || l) && (!l || !l.$stable) ? !0 : r === i ? !1 : r ? i ? Zo(r, i, c) : !0 : !!i;
  return !1;
}
function Zo(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < r.length; o++) {
    const s = r[o];
    if (Ii(t, e, s) && !pr(n, s))
      return !0;
  }
  return !1;
}
function Ii(e, t, n) {
  const r = e[n], o = t[n];
  return n === "style" && ne(r) && ne(o) ? !lr(r, o) : r !== o;
}
function fc({ vnode: e, parent: t, suspense: n }, r) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.suspense.vnode.el = o.el = r, e = o), o === e)
      (e = t.vnode).el = r, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = r);
}
const Oi = {}, Pi = () => Object.create(Oi), Ai = (e) => Object.getPrototypeOf(e) === Oi;
function dc(e, t, n, r = !1) {
  const o = {}, s = Pi();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Ti(e, t, o, s);
  for (const i in e.propsOptions[0])
    i in o || (o[i] = void 0);
  n ? e.props = r ? o : /* @__PURE__ */ _a(o) : e.type.props ? e.props = o : e.props = s, e.attrs = s;
}
function pc(e, t, n, r) {
  const {
    props: o,
    attrs: s,
    vnode: { patchFlag: i }
  } = e, l = /* @__PURE__ */ Q(o), [a] = e.propsOptions;
  let c = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (r || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const u = e.vnode.dynamicProps;
      for (let p = 0; p < u.length; p++) {
        let v = u[p];
        if (pr(e.emitsOptions, v))
          continue;
        const w = t[v];
        if (a)
          if (ee(s, v))
            w !== s[v] && (s[v] = w, c = !0);
          else {
            const I = Le(v);
            o[I] = oo(
              a,
              l,
              I,
              w,
              e,
              !1
            );
          }
        else
          w !== s[v] && (s[v] = w, c = !0);
      }
    }
  } else {
    Ti(e, t, o, s) && (c = !0);
    let u;
    for (const p in l)
      (!t || // for camelCase
      !ee(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((u = Ft(p)) === p || !ee(t, u))) && (a ? n && // for camelCase
      (n[p] !== void 0 || // for kebab-case
      n[u] !== void 0) && (o[p] = oo(
        a,
        l,
        p,
        void 0,
        e,
        !0
      )) : delete o[p]);
    if (s !== l)
      for (const p in s)
        (!t || !ee(t, p)) && (delete s[p], c = !0);
  }
  c && ot(e.attrs, "set", "");
}
function Ti(e, t, n, r) {
  const [o, s] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let a in t) {
      if (sn(a))
        continue;
      const c = t[a];
      let u;
      o && ee(o, u = Le(a)) ? !s || !s.includes(u) ? n[u] = c : (l || (l = {}))[u] = c : pr(e.emitsOptions, a) || (!(a in r) || c !== r[a]) && (r[a] = c, i = !0);
    }
  if (s) {
    const a = /* @__PURE__ */ Q(n), c = l || le;
    for (let u = 0; u < s.length; u++) {
      const p = s[u];
      n[p] = oo(
        o,
        a,
        p,
        c[p],
        e,
        !ee(c, p)
      );
    }
  }
  return i;
}
function oo(e, t, n, r, o, s) {
  const i = e[n];
  if (i != null) {
    const l = ee(i, "default");
    if (l && r === void 0) {
      const a = i.default;
      if (i.type !== Function && !i.skipFactory && U(a)) {
        const { propsDefaults: c } = o;
        if (n in c)
          r = c[n];
        else {
          const u = xn(o);
          r = c[n] = a.call(
            null,
            t
          ), u();
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
    ] && (r === "" || r === Ft(n)) && (r = !0));
  }
  return r;
}
const gc = /* @__PURE__ */ new WeakMap();
function Di(e, t, n = !1) {
  const r = n ? gc : t.propsCache, o = r.get(e);
  if (o)
    return o;
  const s = e.props, i = {}, l = [];
  let a = !1;
  if (!U(e)) {
    const u = (p) => {
      a = !0;
      const [v, w] = Di(p, t, !0);
      _e(i, v), w && l.push(...w);
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  if (!s && !a)
    return ne(e) && r.set(e, Nt), Nt;
  if (N(s))
    for (let u = 0; u < s.length; u++) {
      const p = Le(s[u]);
      Qo(p) && (i[p] = le);
    }
  else if (s)
    for (const u in s) {
      const p = Le(u);
      if (Qo(p)) {
        const v = s[u], w = i[p] = N(v) || U(v) ? { type: v } : _e({}, v), I = w.type;
        let C = !1, F = !0;
        if (N(I))
          for (let L = 0; L < I.length; ++L) {
            const M = I[L], k = U(M) && M.name;
            if (k === "Boolean") {
              C = !0;
              break;
            } else k === "String" && (F = !1);
          }
        else
          C = U(I) && I.name === "Boolean";
        w[
          0
          /* shouldCast */
        ] = C, w[
          1
          /* shouldCastTrue */
        ] = F, (C || ee(w, "default")) && l.push(p);
      }
    }
  const c = [i, l];
  return ne(e) && r.set(e, c), c;
}
function Qo(e) {
  return e[0] !== "$" && !sn(e);
}
const Eo = (e) => e === "_" || e === "_ctx" || e === "$stable", Io = (e) => N(e) ? e.map(qe) : [qe(e)], hc = (e, t, n) => {
  if (t._n)
    return t;
  const r = Da((...o) => Io(t(...o)), n);
  return r._c = !1, r;
}, Fi = (e, t, n) => {
  const r = e._ctx;
  for (const o in e) {
    if (Eo(o)) continue;
    const s = e[o];
    if (U(s))
      t[o] = hc(o, s, r);
    else if (s != null) {
      const i = Io(s);
      t[o] = () => i;
    }
  }
}, ki = (e, t) => {
  const n = Io(t);
  e.slots.default = () => n;
}, ji = (e, t, n) => {
  for (const r in t)
    (n || !Eo(r)) && (e[r] = t[r]);
}, mc = (e, t, n) => {
  const r = e.slots = Pi();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (ji(r, t, n), n && Ws(r, "_", o, !0)) : Fi(t, r);
  } else t && ki(e, t);
}, vc = (e, t, n) => {
  const { vnode: r, slots: o } = e;
  let s = !0, i = le;
  if (r.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? s = !1 : ji(o, t, n) : (s = !t.$stable, Fi(t, o)), i = t;
  } else t && (ki(e, t), i = { default: 1 });
  if (s)
    for (const l in o)
      !Eo(l) && i[l] == null && delete o[l];
}, Ae = Sc;
function yc(e) {
  return wc(e);
}
function wc(e, t) {
  const n = ir();
  n.__VUE__ = !0;
  const {
    insert: r,
    remove: o,
    patchProp: s,
    createElement: i,
    createText: l,
    createComment: a,
    setText: c,
    setElementText: u,
    parentNode: p,
    nextSibling: v,
    setScopeId: w = Xe,
    insertStaticContent: I
  } = e, C = (f, g, y, x = null, S = null, b = null, A = void 0, O = null, R = !!g.dynamicChildren) => {
    if (f === g)
      return;
    f && !tn(f, g) && (x = pt(f), ge(f, S, b, !0), f = null), g.patchFlag === -2 && (R = !1, g.dynamicChildren = null);
    const { type: _, ref: j, shapeFlag: T } = g;
    switch (_) {
      case gr:
        F(f, g, y, x);
        break;
      case ct:
        L(f, g, y, x);
        break;
      case $r:
        f == null && M(g, y, x, A);
        break;
      case Ie:
        oe(
          f,
          g,
          y,
          x,
          S,
          b,
          A,
          O,
          R
        );
        break;
      default:
        T & 1 ? B(
          f,
          g,
          y,
          x,
          S,
          b,
          A,
          O,
          R
        ) : T & 6 ? he(
          f,
          g,
          y,
          x,
          S,
          b,
          A,
          O,
          R
        ) : (T & 64 || T & 128) && _.process(
          f,
          g,
          y,
          x,
          S,
          b,
          A,
          O,
          R,
          Fe
        );
    }
    j != null && S ? cn(j, f && f.ref, b, g || f, !g) : j == null && f && f.ref != null && cn(f.ref, null, b, f, !0);
  }, F = (f, g, y, x) => {
    if (f == null)
      r(
        g.el = l(g.children),
        y,
        x
      );
    else {
      const S = g.el = f.el;
      g.children !== f.children && c(S, g.children);
    }
  }, L = (f, g, y, x) => {
    f == null ? r(
      g.el = a(g.children || ""),
      y,
      x
    ) : g.el = f.el;
  }, M = (f, g, y, x) => {
    [f.el, f.anchor] = I(
      f.children,
      g,
      y,
      x,
      f.el,
      f.anchor
    );
  }, k = ({ el: f, anchor: g }, y, x) => {
    let S;
    for (; f && f !== g; )
      S = v(f), r(f, y, x), f = S;
    r(g, y, x);
  }, P = ({ el: f, anchor: g }) => {
    let y;
    for (; f && f !== g; )
      y = v(f), o(f), f = y;
    o(g);
  }, B = (f, g, y, x, S, b, A, O, R) => {
    if (g.type === "svg" ? A = "svg" : g.type === "math" && (A = "mathml"), f == null)
      W(
        g,
        y,
        x,
        S,
        b,
        A,
        O,
        R
      );
    else {
      const _ = f.el && f.el._isVueCE ? f.el : null;
      try {
        _ && _._beginPatch(), D(
          f,
          g,
          S,
          b,
          A,
          O,
          R
        );
      } finally {
        _ && _._endPatch();
      }
    }
  }, W = (f, g, y, x, S, b, A, O) => {
    let R, _;
    const { props: j, shapeFlag: T, transition: H, dirs: K } = f;
    if (R = f.el = i(
      f.type,
      b,
      j && j.is,
      j
    ), T & 8 ? u(R, f.children) : T & 16 && $(
      f.children,
      R,
      null,
      x,
      S,
      Kr(f, b),
      A,
      O
    ), K && St(f, null, x, "created"), G(R, f, f.scopeId, A, x), j) {
      for (const J in j)
        J !== "value" && !sn(J) && s(R, J, null, j[J], b, x);
      "value" in j && s(R, "value", null, j.value, b), (_ = j.onVnodeBeforeMount) && Be(_, x, f);
    }
    K && St(f, null, x, "beforeMount");
    const q = bc(S, H);
    q && H.beforeEnter(R), r(R, g, y), ((_ = j && j.onVnodeMounted) || q || K) && Ae(() => {
      try {
        _ && Be(_, x, f), q && H.enter(R), K && St(f, null, x, "mounted");
      } finally {
      }
    }, S);
  }, G = (f, g, y, x, S) => {
    if (y && w(f, y), x)
      for (let b = 0; b < x.length; b++)
        w(f, x[b]);
    if (S) {
      let b = S.subTree;
      if (g === b || $i(b.type) && (b.ssContent === g || b.ssFallback === g)) {
        const A = S.vnode;
        G(
          f,
          A,
          A.scopeId,
          A.slotScopeIds,
          S.parent
        );
      }
    }
  }, $ = (f, g, y, x, S, b, A, O, R = 0) => {
    for (let _ = R; _ < f.length; _++) {
      const j = f[_] = O ? rt(f[_]) : qe(f[_]);
      C(
        null,
        j,
        g,
        y,
        x,
        S,
        b,
        A,
        O
      );
    }
  }, D = (f, g, y, x, S, b, A) => {
    const O = g.el = f.el;
    let { patchFlag: R, dynamicChildren: _, dirs: j } = g;
    R |= f.patchFlag & 16;
    const T = f.props || le, H = g.props || le;
    let K;
    if (y && xt(y, !1), (K = H.onVnodeBeforeUpdate) && Be(K, y, g, f), j && St(g, f, y, "beforeUpdate"), y && xt(y, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    _ && (!f.dynamicChildren || f.dynamicChildren.length !== _.length) && (R = 0, A = !1, _ = null), (T.innerHTML && H.innerHTML == null || T.textContent && H.textContent == null) && u(O, ""), _ ? z(
      f.dynamicChildren,
      _,
      O,
      y,
      x,
      Kr(g, S),
      b
    ) : A || Y(
      f,
      g,
      O,
      null,
      y,
      x,
      Kr(g, S),
      b,
      !1
    ), R > 0) {
      if (R & 16)
        ae(O, T, H, y, S);
      else if (R & 2 && T.class !== H.class && s(O, "class", null, H.class, S), R & 4 && s(O, "style", T.style, H.style, S), R & 8) {
        const q = g.dynamicProps;
        for (let J = 0; J < q.length; J++) {
          const Z = q[J], ce = T[Z], pe = H[Z];
          (pe !== ce || Z === "value") && s(O, Z, ce, pe, S, y);
        }
      }
      R & 1 && f.children !== g.children && u(O, g.children);
    } else !A && _ == null && ae(O, T, H, y, S);
    ((K = H.onVnodeUpdated) || j) && Ae(() => {
      K && Be(K, y, g, f), j && St(g, f, y, "updated");
    }, x);
  }, z = (f, g, y, x, S, b, A) => {
    for (let O = 0; O < g.length; O++) {
      const R = f[O], _ = g[O], j = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        R.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (R.type === Ie || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !tn(R, _) || // - In the case of a component, it could contain anything.
        R.shapeFlag & 198) ? p(R.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          y
        )
      );
      C(
        R,
        _,
        j,
        null,
        x,
        S,
        b,
        A,
        !0
      );
    }
  }, ae = (f, g, y, x, S) => {
    if (g !== y) {
      if (g !== le)
        for (const b in g)
          !sn(b) && !(b in y) && s(
            f,
            b,
            g[b],
            null,
            S,
            x
          );
      for (const b in y) {
        if (sn(b)) continue;
        const A = y[b], O = g[b];
        A !== O && b !== "value" && s(f, b, O, A, S, x);
      }
      "value" in y && s(f, "value", g.value, y.value, S);
    }
  }, oe = (f, g, y, x, S, b, A, O, R) => {
    const _ = g.el = f ? f.el : l(""), j = g.anchor = f ? f.anchor : l("");
    let { patchFlag: T, dynamicChildren: H, slotScopeIds: K } = g;
    K && (O = O ? O.concat(K) : K), f == null ? (r(_, y, x), r(j, y, x), $(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      g.children || [],
      y,
      j,
      S,
      b,
      A,
      O,
      R
    )) : T > 0 && T & 64 && H && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    f.dynamicChildren && f.dynamicChildren.length === H.length ? (z(
      f.dynamicChildren,
      H,
      y,
      S,
      b,
      A,
      O
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (g.key != null || S && g === S.subTree) && Hi(
      f,
      g,
      !0
      /* shallow */
    )) : Y(
      f,
      g,
      y,
      j,
      S,
      b,
      A,
      O,
      R
    );
  }, he = (f, g, y, x, S, b, A, O, R) => {
    g.slotScopeIds = O, f == null ? g.shapeFlag & 512 ? S.ctx.activate(
      g,
      y,
      x,
      A,
      R
    ) : Se(
      g,
      y,
      x,
      S,
      b,
      A,
      R
    ) : ye(f, g, R);
  }, Se = (f, g, y, x, S, b, A) => {
    const O = f.component = Pc(
      f,
      x,
      S
    );
    if (Mo(f) && (O.ctx.renderer = Fe), Tc(O, !1, A), O.asyncDep) {
      if (S && S.registerDep(O, se, A), !f.el) {
        const R = O.subTree = st(ct);
        L(null, R, g, y), f.placeholder = R.el;
      }
    } else
      se(
        O,
        f,
        g,
        y,
        S,
        b,
        A
      );
  }, ye = (f, g, y) => {
    const x = g.component = f.component;
    if (uc(f, g, y))
      if (x.asyncDep && !x.asyncResolved) {
        X(x, g, y);
        return;
      } else
        x.next = g, x.update();
    else
      g.el = f.el, x.vnode = g;
  }, se = (f, g, y, x, S, b, A) => {
    const O = () => {
      if (f.isMounted) {
        let { next: T, bu: H, u: K, parent: q, vnode: J } = f;
        {
          const xe = Li(f);
          if (xe) {
            T && (T.el = J.el, X(f, T, A)), xe.asyncDep.then(() => {
              Ae(() => {
                f.isUnmounted || _();
              }, S);
            });
            return;
          }
        }
        let Z = T, ce;
        xt(f, !1), T ? (T.el = J.el, X(f, T, A)) : T = J, H && Tr(H), (ce = T.props && T.props.onVnodeBeforeUpdate) && Be(ce, q, T, J), xt(f, !0);
        const pe = Jo(f), Pe = f.subTree;
        f.subTree = pe, C(
          Pe,
          pe,
          // parent may have changed if it's in a teleport
          p(Pe.el),
          // anchor may have changed if it's in a fragment
          pt(Pe),
          f,
          S,
          b
        ), T.el = pe.el, Z === null && fc(f, pe.el), K && Ae(K, S), (ce = T.props && T.props.onVnodeUpdated) && Ae(
          () => Be(ce, q, T, J),
          S
        );
      } else {
        let T;
        const { el: H, props: K } = g, { bm: q, m: J, parent: Z, root: ce, type: pe } = f, Pe = un(g);
        xt(f, !1), q && Tr(q), !Pe && (T = K && K.onVnodeBeforeMount) && Be(T, Z, g), xt(f, !0);
        {
          ce.ce && ce.ce._hasShadowRoot() && ce.ce._injectChildStyle(
            pe,
            f.parent ? f.parent.type : void 0
          );
          const xe = f.subTree = Jo(f);
          C(
            null,
            xe,
            y,
            x,
            f,
            S,
            b
          ), g.el = xe.el;
        }
        if (J && Ae(J, S), !Pe && (T = K && K.onVnodeMounted)) {
          const xe = g;
          Ae(
            () => Be(T, Z, xe),
            S
          );
        }
        (g.shapeFlag & 256 || Z && un(Z.vnode) && Z.vnode.shapeFlag & 256) && f.a && Ae(f.a, S), f.isMounted = !0, g = y = x = null;
      }
    };
    f.scope.on();
    const R = f.effect = new Ys(O);
    f.scope.off();
    const _ = f.update = R.run.bind(R), j = f.job = R.runIfDirty.bind(R);
    j.i = f, j.id = f.uid, R.scheduler = () => Ro(j), xt(f, !0), _();
  }, X = (f, g, y) => {
    g.component = f;
    const x = f.vnode.props;
    f.vnode = g, f.next = null, pc(f, g.props, x, y), vc(f, g.children, y), it(), Wo(f), lt();
  }, Y = (f, g, y, x, S, b, A, O, R = !1) => {
    const _ = f && f.children, j = f ? f.shapeFlag : 0, T = g.children, { patchFlag: H, shapeFlag: K } = g;
    if (H > 0) {
      if (H & 128) {
        dt(
          _,
          T,
          y,
          x,
          S,
          b,
          A,
          O,
          R
        );
        return;
      } else if (H & 256) {
        De(
          _,
          T,
          y,
          x,
          S,
          b,
          A,
          O,
          R
        );
        return;
      }
    }
    K & 8 ? (j & 16 && je(_, S, b), T !== _ && u(y, T)) : j & 16 ? K & 16 ? dt(
      _,
      T,
      y,
      x,
      S,
      b,
      A,
      O,
      R
    ) : je(_, S, b, !0) : (j & 8 && u(y, ""), K & 16 && $(
      T,
      y,
      x,
      S,
      b,
      A,
      O,
      R
    ));
  }, De = (f, g, y, x, S, b, A, O, R) => {
    f = f || Nt, g = g || Nt;
    const _ = f.length, j = g.length, T = Math.min(_, j);
    let H;
    for (H = 0; H < T; H++) {
      const K = g[H] = R ? rt(g[H]) : qe(g[H]);
      C(
        f[H],
        K,
        y,
        null,
        S,
        b,
        A,
        O,
        R
      );
    }
    _ > j ? je(
      f,
      S,
      b,
      !0,
      !1,
      T
    ) : $(
      g,
      y,
      x,
      S,
      b,
      A,
      O,
      R,
      T
    );
  }, dt = (f, g, y, x, S, b, A, O, R) => {
    let _ = 0;
    const j = g.length;
    let T = f.length - 1, H = j - 1;
    for (; _ <= T && _ <= H; ) {
      const K = f[_], q = g[_] = R ? rt(g[_]) : qe(g[_]);
      if (tn(K, q))
        C(
          K,
          q,
          y,
          null,
          S,
          b,
          A,
          O,
          R
        );
      else
        break;
      _++;
    }
    for (; _ <= T && _ <= H; ) {
      const K = f[T], q = g[H] = R ? rt(g[H]) : qe(g[H]);
      if (tn(K, q))
        C(
          K,
          q,
          y,
          null,
          S,
          b,
          A,
          O,
          R
        );
      else
        break;
      T--, H--;
    }
    if (_ > T) {
      if (_ <= H) {
        const K = H + 1, q = K < j ? g[K].el : x;
        for (; _ <= H; )
          C(
            null,
            g[_] = R ? rt(g[_]) : qe(g[_]),
            y,
            q,
            S,
            b,
            A,
            O,
            R
          ), _++;
      }
    } else if (_ > H)
      for (; _ <= T; )
        ge(f[_], S, b, !0), _++;
    else {
      const K = _, q = _, J = /* @__PURE__ */ new Map();
      for (_ = q; _ <= H; _++) {
        const Re = g[_] = R ? rt(g[_]) : qe(g[_]);
        Re.key != null && J.set(Re.key, _);
      }
      let Z, ce = 0;
      const pe = H - q + 1;
      let Pe = !1, xe = 0;
      const Qe = new Array(pe);
      for (_ = 0; _ < pe; _++) Qe[_] = 0;
      for (_ = K; _ <= T; _++) {
        const Re = f[_];
        if (ce >= pe) {
          ge(Re, S, b, !0);
          continue;
        }
        let Ce;
        if (Re.key != null)
          Ce = J.get(Re.key);
        else
          for (Z = q; Z <= H; Z++)
            if (Qe[Z - q] === 0 && tn(Re, g[Z])) {
              Ce = Z;
              break;
            }
        Ce === void 0 ? ge(Re, S, b, !0) : (Qe[Ce - q] = _ + 1, Ce >= xe ? xe = Ce : Pe = !0, C(
          Re,
          g[Ce],
          y,
          null,
          S,
          b,
          A,
          O,
          R
        ), ce++);
      }
      const Zt = Pe ? _c(Qe) : Nt;
      for (Z = Zt.length - 1, _ = pe - 1; _ >= 0; _--) {
        const Re = q + _, Ce = g[Re], On = g[Re + 1], Pn = Re + 1 < j ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          On.el || Ki(On)
        ) : x;
        Qe[_] === 0 ? C(
          null,
          Ce,
          y,
          Pn,
          S,
          b,
          A,
          O,
          R
        ) : Pe && (Z < 0 || _ !== Zt[Z] ? Ze(Ce, y, Pn, 2) : Z--);
      }
    }
  }, Ze = (f, g, y, x, S = null) => {
    const { el: b, type: A, transition: O, children: R, shapeFlag: _ } = f;
    if (_ & 6) {
      Ze(f.component.subTree, g, y, x);
      return;
    }
    if (_ & 128) {
      f.suspense.move(g, y, x);
      return;
    }
    if (_ & 64) {
      A.move(f, g, y, Fe);
      return;
    }
    if (A === Ie) {
      r(b, g, y);
      for (let T = 0; T < R.length; T++)
        Ze(R[T], g, y, x);
      r(f.anchor, g, y);
      return;
    }
    if (A === $r) {
      k(f, g, y);
      return;
    }
    if (x !== 2 && _ & 1 && O)
      if (x === 0)
        O.persisted && !b[Hr] ? r(b, g, y) : (O.beforeEnter(b), r(b, g, y), Ae(() => O.enter(b), S));
      else {
        const { leave: T, delayLeave: H, afterLeave: K } = O, q = () => {
          f.ctx.isUnmounted ? o(b) : r(b, g, y);
        }, J = () => {
          const Z = b._isLeaving || !!b[Hr];
          b._isLeaving && b[Hr](
            !0
            /* cancelled */
          ), O.persisted && !Z ? q() : T(b, () => {
            q(), K && K();
          });
        };
        H ? H(b, q, J) : J();
      }
    else
      r(b, g, y);
  }, ge = (f, g, y, x = !1, S = !1) => {
    const {
      type: b,
      props: A,
      ref: O,
      children: R,
      dynamicChildren: _,
      shapeFlag: j,
      patchFlag: T,
      dirs: H,
      cacheIndex: K,
      memo: q
    } = f;
    if (T === -2 && (S = !1), O != null && (it(), cn(O, null, y, f, !0), lt()), K != null && (g.renderCache[K] = void 0), j & 256) {
      g.ctx.deactivate(f);
      return;
    }
    const J = j & 1 && H, Z = !un(f);
    let ce;
    if (Z && (ce = A && A.onVnodeBeforeUnmount) && Be(ce, g, f), j & 6)
      Jt(f.component, y, x);
    else {
      if (j & 128) {
        f.suspense.unmount(y, x);
        return;
      }
      J && St(f, null, g, "beforeUnmount"), j & 64 ? f.type.remove(
        f,
        g,
        y,
        Fe,
        x
      ) : _ && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !_.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (b !== Ie || T > 0 && T & 64) ? je(
        _,
        g,
        y,
        !1,
        !0
      ) : (b === Ie && T & 384 || !S && j & 16) && je(R, g, y), x && bt(f);
    }
    const pe = q != null && K == null;
    (Z && (ce = A && A.onVnodeUnmounted) || J || pe) && Ae(() => {
      ce && Be(ce, g, f), J && St(f, null, g, "unmounted"), pe && (f.el = null);
    }, y);
  }, bt = (f) => {
    const { type: g, el: y, anchor: x, transition: S } = f;
    if (g === Ie) {
      xr(y, x);
      return;
    }
    if (g === $r) {
      P(f);
      return;
    }
    const b = () => {
      o(y), S && !S.persisted && S.afterLeave && S.afterLeave();
    };
    if (f.shapeFlag & 1 && S && !S.persisted) {
      const { leave: A, delayLeave: O } = S, R = () => A(y, b);
      O ? O(f.el, b, R) : R();
    } else
      b();
  }, xr = (f, g) => {
    let y;
    for (; f !== g; )
      y = v(f), o(f), f = y;
    o(g);
  }, Jt = (f, g, y) => {
    const { bum: x, scope: S, job: b, subTree: A, um: O, m: R, a: _ } = f;
    es(R), es(_), x && Tr(x), S.stop(), b && (b.flags |= 8, ge(A, f, g, y)), O && Ae(O, g), Ae(() => {
      f.isUnmounted = !0;
    }, g);
  }, je = (f, g, y, x = !1, S = !1, b = 0) => {
    for (let A = b; A < f.length; A++)
      ge(f[A], g, y, x, S);
  }, pt = (f) => {
    if (f.shapeFlag & 6)
      return pt(f.component.subTree);
    if (f.shapeFlag & 128)
      return f.suspense.next();
    const g = v(f.anchor || f.el), y = g && g[La];
    return y ? v(y) : g;
  };
  let Ht = !1;
  const En = (f, g, y) => {
    let x;
    f == null ? g._vnode && (ge(g._vnode, null, null, !0), x = g._vnode.component) : C(
      g._vnode || null,
      f,
      g,
      null,
      null,
      null,
      y
    ), g._vnode = f, Ht || (Ht = !0, Wo(x), pi(), Ht = !1);
  }, Fe = {
    p: C,
    um: ge,
    m: Ze,
    r: bt,
    mt: Se,
    mc: $,
    pc: Y,
    pbc: z,
    n: pt,
    o: e
  };
  return {
    render: En,
    hydrate: void 0,
    createApp: oc(En)
  };
}
function Kr({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function xt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function bc(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Hi(e, t, n = !1) {
  const r = e.children, o = t.children;
  if (N(r) && N(o))
    for (let s = 0; s < r.length; s++) {
      const i = r[s];
      let l = o[s];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = o[s] = rt(o[s]), l.el = i.el), !n && l.patchFlag !== -2 && Hi(i, l)), l.type === gr && (l.patchFlag === -1 && (l = o[s] = rt(l)), l.el = i.el), l.type === ct && !l.el && (l.el = i.el);
    }
}
function _c(e) {
  const t = e.slice(), n = [0];
  let r, o, s, i, l;
  const a = e.length;
  for (r = 0; r < a; r++) {
    const c = e[r];
    if (c !== 0) {
      if (o = n[n.length - 1], e[o] < c) {
        t[r] = o, n.push(r);
        continue;
      }
      for (s = 0, i = n.length - 1; s < i; )
        l = s + i >> 1, e[n[l]] < c ? s = l + 1 : i = l;
      c < e[n[s]] && (s > 0 && (t[r] = n[s - 1]), n[s] = r);
    }
  }
  for (s = n.length, i = n[s - 1]; s-- > 0; )
    n[s] = i, i = t[i];
  return n;
}
function Li(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Li(t);
}
function es(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function Ki(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? Ki(t.subTree) : null;
}
const $i = (e) => e.__isSuspense;
function Sc(e, t) {
  t && t.pendingBranch ? N(e) ? t.effects.push(...e) : t.effects.push(e) : Ta(e);
}
const Ie = /* @__PURE__ */ Symbol.for("v-fgt"), gr = /* @__PURE__ */ Symbol.for("v-txt"), ct = /* @__PURE__ */ Symbol.for("v-cmt"), $r = /* @__PURE__ */ Symbol.for("v-stc"), Ot = [];
let ke = null;
function ue(e = !1) {
  Ot.push(ke = e ? null : []);
}
function Vi() {
  Ot.pop(), ke = Ot[Ot.length - 1] || null;
}
let mn = 1;
function ts(e, t = !1) {
  mn += e, e < 0 && ke && t && (ke.hasOnce = !0);
}
function Ni(e) {
  return e.dynamicChildren = mn > 0 ? ke || Nt : null, Vi(), mn > 0 && ke && ke.push(e), e;
}
function fe(e, t, n, r, o, s) {
  return Ni(
    Ue(
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
function xc(e, t, n, r, o) {
  return Ni(
    st(
      e,
      t,
      n,
      r,
      o,
      !0
    )
  );
}
function Bi(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function tn(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Wi = ({ key: e }) => e ?? null, Bn = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? de(e) || /* @__PURE__ */ be(e) || U(e) ? { i: Ye, r: e, k: t, f: !!n } : e : null);
function Ue(e, t = null, n = null, r = 0, o = null, s = e === Ie ? 0 : 1, i = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Wi(t),
    ref: t && Bn(t),
    scopeId: hi,
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
    ctx: Ye
  };
  return l ? (Zn(a, n), s & 128 && e.normalize(a)) : n && (a.shapeFlag |= de(n) ? 8 : 16), mn > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  ke && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && ke.push(a), a;
}
const st = Rc;
function Rc(e, t = null, n = null, r = 0, o = null, s = !1) {
  if ((!e || e === Xa) && (e = ct), Bi(e)) {
    const l = qt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Zn(l, n), mn > 0 && !s && ke && (l.shapeFlag & 6 ? ke[ke.indexOf(e)] = l : ke.push(l)), l.patchFlag = -2, l;
  }
  if (jc(e) && (e = e.__vccOpts), t) {
    t = Cc(t);
    let { class: l, style: a } = t;
    l && !de(l) && (t.class = Ct(l)), ne(a) && (/* @__PURE__ */ xo(a) && !N(a) && (a = _e({}, a)), t.style = Bt(a));
  }
  const i = de(e) ? 1 : $i(e) ? 128 : fr(e) ? 64 : ne(e) ? 4 : U(e) ? 2 : 0;
  return Ue(
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
function Cc(e) {
  return e ? /* @__PURE__ */ xo(e) || Ai(e) ? _e({}, e) : e : null;
}
function qt(e, t, n = !1, r = !1) {
  const { props: o, ref: s, patchFlag: i, children: l, transition: a } = e, c = t ? Ec(o || {}, t) : o, u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && Wi(c),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && s ? N(s) ? s.concat(Bn(t)) : [s, Bn(t)] : Bn(t)
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
    patchFlag: t && e.type !== Ie ? i === -1 ? 16 : i | 16 : i,
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
    ssContent: e.ssContent && qt(e.ssContent),
    ssFallback: e.ssFallback && qt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return a && r && Co(
    u,
    a.clone(u)
  ), u;
}
function Mc(e = " ", t = 0) {
  return st(gr, null, e, t);
}
function Kt(e = "", t = !1) {
  return t ? (ue(), xc(ct, null, e)) : st(ct, null, e);
}
function qe(e) {
  return e == null || typeof e == "boolean" ? st(ct) : N(e) ? st(
    Ie,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Bi(e) ? rt(e) : st(gr, null, String(e));
}
function rt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : qt(e);
}
function Zn(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (N(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), Zn(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !Ai(t) ? t._ctx = Ye : o === 3 && Ye && (Ye.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (U(t)) {
    if (r & 65) {
      Zn(e, { default: t });
      return;
    }
    t = { default: t, _ctx: Ye }, n = 32;
  } else
    t = String(t), r & 64 ? (n = 16, t = [Mc(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function Ec(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === "class")
        t.class !== r.class && (t.class = Ct([t.class, r.class]));
      else if (o === "style")
        t.style = Bt([t.style, r.style]);
      else if (rr(o)) {
        const s = t[o], i = r[o];
        i && s !== i && !(N(s) && s.includes(i)) ? t[o] = s ? [].concat(s, i) : i : i == null && s == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !or(o) && (t[o] = i);
      } else o !== "" && (t[o] = r[o]);
  }
  return t;
}
function Be(e, t, n, r = null) {
  Ve(e, t, 7, [
    n,
    r
  ]);
}
const Ic = Mi();
let Oc = 0;
function Pc(e, t, n) {
  const r = e.type, o = (t ? t.appContext : e.appContext) || Ic, s = {
    uid: Oc++,
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
    scope: new na(
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
    propsOptions: Di(r, o),
    emitsOptions: Ei(r, o),
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
  return s.ctx = { _: s }, s.root = t ? t.root : s, s.emit = ic.bind(null, s), e.ce && e.ce(s), s;
}
let Oe = null;
const Ac = () => Oe || Ye;
let Qn, vn;
{
  const e = ir(), t = (n, r) => {
    let o;
    return (o = e[n]) || (o = e[n] = []), o.push(r), (s) => {
      o.length > 1 ? o.forEach((i) => i(s)) : o[0](s);
    };
  };
  Qn = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Oe = n
  ), vn = t(
    "__VUE_SSR_SETTERS__",
    (n) => yn = n
  );
}
const xn = (e) => {
  const t = Oe;
  return Qn(e), e.scope.on(), () => {
    e.scope.off(), Qn(t);
  };
}, ns = () => {
  Oe && Oe.scope.off(), Qn(null);
};
function Ui(e) {
  return e.vnode.shapeFlag & 4;
}
let yn = !1;
function Tc(e, t = !1, n = !1) {
  t && vn(t);
  const { props: r, children: o } = e.vnode, s = Ui(e);
  dc(e, r, s, t), mc(e, o, n || t);
  const i = s ? Dc(e, t) : void 0;
  return t && vn(!1), i;
}
function Dc(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Ja);
  const { setup: r } = n;
  if (r) {
    it();
    const o = e.setupContext = r.length > 1 ? kc(e) : null, s = xn(e), i = Sn(
      r,
      e,
      0,
      [
        e.props,
        o
      ]
    ), l = $s(i);
    if (lt(), s(), (l || e.sp) && !un(e) && wi(e), l) {
      if (i.then(ns, ns), t)
        return i.then((a) => {
          vn(!0);
          try {
            rs(e, a, t);
          } finally {
            vn(!1);
          }
        }).catch((a) => {
          ur(a, e, 0);
        });
      e.asyncDep = i;
    } else
      rs(e, i);
  } else
    Gi(e);
}
function rs(e, t, n) {
  U(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ne(t) && (e.setupState = ui(t)), Gi(e);
}
function Gi(e, t, n) {
  const r = e.type;
  e.render || (e.render = r.render || Xe);
  {
    const o = xn(e);
    it();
    try {
      Za(e);
    } finally {
      lt(), o();
    }
  }
}
const Fc = {
  get(e, t) {
    return we(e, "get", ""), e[t];
  }
};
function kc(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Fc),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Oo(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(ui(Sa(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in fn)
        return fn[n](e);
    },
    has(t, n) {
      return n in t || n in fn;
    }
  })) : e.proxy;
}
function jc(e) {
  return U(e) && "__vccOpts" in e;
}
const te = (e, t) => /* @__PURE__ */ Ea(e, t, yn), Hc = "3.5.42";
/**
* @vue/runtime-dom v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let so;
const os = typeof window < "u" && window.trustedTypes;
if (os)
  try {
    so = /* @__PURE__ */ os.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const qi = so ? (e) => so.createHTML(e) : (e) => e, Lc = "http://www.w3.org/2000/svg", Kc = "http://www.w3.org/1998/Math/MathML", nt = typeof document < "u" ? document : null, ss = nt && /* @__PURE__ */ nt.createElement("template"), $c = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const o = t === "svg" ? nt.createElementNS(Lc, e) : t === "mathml" ? nt.createElementNS(Kc, e) : n ? nt.createElement(e, { is: n }) : nt.createElement(e);
    return e === "select" && r && r.multiple != null && o.setAttribute("multiple", r.multiple), o;
  },
  createText: (e) => nt.createTextNode(e),
  createComment: (e) => nt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => nt.querySelector(e),
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
      ss.innerHTML = qi(
        r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e
      );
      const l = ss.content;
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
}, Vc = /* @__PURE__ */ Symbol("_vtc");
function Nc(e, t, n) {
  const r = e[Vc];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const is = /* @__PURE__ */ Symbol("_vod"), Bc = /* @__PURE__ */ Symbol("_vsh"), Wc = /* @__PURE__ */ Symbol(""), Uc = /(?:^|;)\s*display\s*:/;
function Gc(e, t, n) {
  const r = e.style, o = de(n);
  let s = !1;
  if (n && !o) {
    if (t)
      if (de(t))
        for (const i of t.split(";")) {
          const l = i.slice(0, i.indexOf(":")).trim();
          n[l] == null && on(r, l, "");
        }
      else
        for (const i in t)
          n[i] == null && on(r, i, "");
    for (const i in n) {
      i === "display" && (s = !0);
      const l = n[i];
      l != null ? zc(
        e,
        i,
        !de(t) && t ? t[i] : void 0,
        l
      ) || on(r, i, l) : on(r, i, "");
    }
  } else if (o) {
    if (t !== n) {
      const i = r[Wc];
      i && (n += ";" + i), r.cssText = n, s = Uc.test(n);
    }
  } else t && e.removeAttribute("style");
  is in e && (e[is] = s ? r.display : "", e[Bc] && (r.display = "none"));
}
const Hn = /\s*!important$/;
function on(e, t, n) {
  if (N(n))
    n.forEach((r) => on(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--"))
    Hn.test(n) ? e.setProperty(t, n.replace(Hn, ""), "important") : e.setProperty(t, n);
  else {
    const r = qc(e, t);
    Hn.test(n) ? e.setProperty(
      Ft(r),
      n.replace(Hn, ""),
      "important"
    ) : e[r] = n;
  }
}
const ls = ["Webkit", "Moz", "ms"], Vr = {};
function qc(e, t) {
  const n = Vr[t];
  if (n)
    return n;
  let r = Le(t);
  if (r !== "filter" && r in e)
    return Vr[t] = r;
  r = Bs(r);
  for (let o = 0; o < ls.length; o++) {
    const s = ls[o] + r;
    if (s in e)
      return Vr[t] = s;
  }
  return t;
}
function zc(e, t, n, r) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && de(r) && n === r;
}
const as = "http://www.w3.org/1999/xlink";
function cs(e, t, n, r, o, s = ea(t)) {
  r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(as, t.slice(6, t.length)) : e.setAttributeNS(as, t, n) : n == null || s && !Us(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    s ? "" : Je(n) ? String(n) : n
  );
}
function us(e, t, n, r, o) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? qi(n) : n);
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
    l === "boolean" ? n = Us(n) : n == null && l === "string" ? (n = "", i = !0) : l === "number" && (n = 0, i = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  i && e.removeAttribute(o || t);
}
function Yc(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function Xc(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const fs = /* @__PURE__ */ Symbol("_vei");
function Jc(e, t, n, r, o = null) {
  const s = e[fs] || (e[fs] = {}), i = s[t];
  if (r && i)
    i.value = r;
  else {
    const [l, a] = eu(t);
    if (r) {
      const c = s[t] = ru(
        r,
        o
      );
      Yc(e, l, c, a);
    } else i && (Xc(e, l, i, a), s[t] = void 0);
  }
}
const Zc = /(Once|Passive|Capture)$/, Qc = /^on:?(?:Once|Passive|Capture)$/;
function eu(e) {
  let t, n;
  for (; (n = e.match(Zc)) && !Qc.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : Ft(e.slice(2)), t];
}
let Nr = 0;
const tu = /* @__PURE__ */ Promise.resolve(), nu = () => Nr || (tu.then(() => Nr = 0), Nr = Date.now());
function ru(e, t) {
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
        const c = i[a];
        c && Ve(
          c,
          t,
          5,
          l
        );
      }
    } else
      Ve(
        o,
        t,
        5,
        [r]
      );
  };
  return n.value = e, n.attached = nu(), n;
}
const ds = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, ou = (e, t, n, r, o, s) => {
  const i = o === "svg";
  t === "class" ? Nc(e, r, i) : t === "style" ? Gc(e, n, r) : rr(t) ? or(t) || Jc(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : su(e, t, r, i)) ? (us(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && cs(e, t, r, i, s, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (iu(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !de(r))) ? us(e, Le(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), cs(e, t, r, i));
};
function su(e, t, n, r) {
  if (r)
    return !!(t === "innerHTML" || t === "textContent" || t in e && ds(t) && U(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return ds(t) && de(n) ? !1 : t in e;
}
function iu(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const r = Le(t);
  return Array.isArray(n) ? n.some((o) => Le(o) === r) : Object.keys(n).some((o) => Le(o) === r);
}
const lu = ["ctrl", "shift", "alt", "meta"], au = {
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
  exact: (e, t) => lu.some((n) => e[`${n}Key`] && !t.includes(n))
}, ps = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), r = t.join(".");
  return n[r] || (n[r] = (o, ...s) => {
    for (let i = 0; i < t.length; i++) {
      const l = au[t[i]];
      if (l && l(o, t)) return;
    }
    return e(o, ...s);
  });
}, cu = /* @__PURE__ */ _e({ patchProp: ou }, $c);
let gs;
function uu() {
  return gs || (gs = yc(cu));
}
const fu = (...e) => {
  const t = uu().createApp(...e), { mount: n } = t;
  return t.mount = (r) => {
    const o = pu(r);
    if (!o) return;
    const s = t._component;
    !U(s) && !s.render && !s.template && (s.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const i = n(o, !1, du(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), i;
  }, t;
};
function du(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function pu(e) {
  return de(e) ? document.querySelector(e) : e;
}
function Ln() {
  return !0;
}
const gu = Symbol("merge-proxy"), Wn = Symbol("merge-proxy-sources"), hu = {
  get(e, t, n) {
    return t === gu ? n : t === Wn ? e.sources : e.get(t);
  },
  has(e, t) {
    return e.has(t);
  },
  set: Ln,
  deleteProperty: Ln,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: Ln,
      deleteProperty: Ln
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function Un(e) {
  return e && typeof e == "object" && "value" in e ? e.value : e;
}
function io(...e) {
  const t = e.flatMap((n) => typeof n == "object" && n !== null && Wn in n && Array.isArray(n[Wn]) ? n[Wn] : [n]);
  return new Proxy({
    sources: t,
    get(n) {
      for (let r = t.length - 1; r >= 0; r--) {
        const o = Un(t[r])[n];
        if (o !== void 0) return o;
      }
    },
    has(n) {
      for (let r = t.length - 1; r >= 0; r--) if (n in Un(t[r])) return !0;
      return !1;
    },
    keys() {
      const n = [];
      for (const r of t) n.push(...Object.keys(Un(r)));
      return [...Array.from(new Set(n))];
    }
  }, hu);
}
function hs(...e) {
  const t = {};
  for (let n of e)
    if (n = Un(n), !!n)
      for (const r of Reflect.ownKeys(n)) {
        const o = n[r];
        o !== void 0 && (t[r] = o);
      }
  return t;
}
function zi(e) {
  return typeof e == "function" ? e : (t) => {
    var n;
    return (n = e.next) == null ? void 0 : n.call(e, t);
  };
}
function mu(e) {
  return Object.assign(e, {
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: Te(e, zi(t), { flush: "sync" }) })
  });
}
function vu(e) {
  return Object.assign(e, {
    set: (t) => {
      e.value = typeof t == "function" ? t(e.value) : t;
    },
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: Te(e, zi(t), { flush: "sync" }) })
  });
}
function yu() {
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
    createReadonlyAtom: (t, n) => mu(te(() => t())),
    createWritableAtom: (t, n) => vu(/* @__PURE__ */ xa(t)),
    untrack: (t) => t(),
    batch: (t) => t()
  };
}
function hr(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function wt(e) {
  if (Array.isArray(e)) return e.map(wt);
  if (e && typeof e == "object") {
    const t = Object.getPrototypeOf(e);
    if (t !== Object.prototype && t !== null) return e;
    const n = t === null ? re() : {}, r = Object.keys(e);
    for (let o = 0; o < r.length; o++) {
      const s = r[o];
      Object.defineProperty(n, s, {
        configurable: !0,
        enumerable: !0,
        value: wt(e[s]),
        writable: !0
      });
    }
    return n;
  }
  return e;
}
function wu(e, t) {
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
function zt(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Yi(e, t) {
  return (n) => {
    var r;
    (((r = t.options.atoms) == null ? void 0 : r[e]) ?? t.baseAtoms[e]).set((o) => hr(n, o));
  };
}
function ms(e) {
  if (typeof e != "object" || e === null) return !1;
  if (Array.isArray(e)) return !0;
  const t = Object.getPrototypeOf(e);
  return t === Object.prototype || t === null;
}
function vs(e) {
  return Reflect.ownKeys(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
const bu = 3;
function _u(e, t) {
  return Xi(e, t, bu);
}
function Xi(e, t, n) {
  if (Object.is(e, t)) return !0;
  if (n <= 0 || !ms(e) || !ms(t) || (Array.isArray(e) || Array.isArray(t)) && (!Array.isArray(e) || !Array.isArray(t) || e.length !== t.length))
    return !1;
  const r = vs(e), o = vs(t);
  if (r.length !== o.length) return !1;
  const s = e, i = t;
  for (let l = 0; l < r.length; l++) {
    const a = r[l];
    if (!Object.prototype.propertyIsEnumerable.call(t, a) || !Xi(s[a], i[a], n - 1)) return !1;
  }
  return !0;
}
function mr(e, t, n, r = _u) {
  const o = `on${t.charAt(0).toUpperCase()}${t.slice(1)}Change`, s = e.options[o];
  s && s((i) => {
    const l = hr(n, i);
    return r(i, l) ? i : l;
  });
}
function Su(e, t) {
  const n = [], r = (o) => {
    o.forEach((s) => {
      n.push(s);
      const i = t(s);
      i.length && r(i);
    });
  };
  return r(e), n;
}
const xu = ({ fn: e, memoDeps: t, onAfterCompare: n, onAfterUpdate: r, onBeforeCompare: o, onBeforeUpdate: s }) => {
  let i = [], l;
  return (c) => {
    o == null || o();
    const u = t == null ? void 0 : t(c);
    let p = !u || u.length !== (i == null ? void 0 : i.length);
    if (!p && u) {
      for (let v = 0; v < u.length; v++) if (u[v] !== i[v]) {
        p = !0;
        break;
      }
    }
    return n == null || n(p), p && (i = u, s == null || s(), l = e(...u ?? []), r == null || r(l)), l;
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
function vr({ feature: e, fnName: t, objectId: n, onAfterUpdate: r, table: o, ...s }) {
  const i = () => {
    if (!r) return;
    const { schedule: a, untrack: c } = o._reactivity;
    a(() => c(() => r()));
  };
  return xu({
    ...s,
    ...{ onAfterUpdate: () => {
      i();
    } }
  });
}
function Ji(e, t = "_") {
  const [n, r] = e.split(t);
  return {
    fnKey: r,
    fnName: `${n}.${r}`,
    parentName: n
  };
}
function kt(e, t, n) {
  for (const [r, { fn: o, memoDeps: s }] of Object.entries(n)) {
    const { fnKey: i, fnName: l } = Ji(r);
    t[i] = s ? vr({
      memoDeps: s,
      fn: o,
      fnName: l,
      table: t,
      feature: e
    }) : o;
  }
}
function Yt(e, t, n, r) {
  for (const [o, { fn: s, memoDeps: i }] of Object.entries(r)) {
    const { fnKey: l, fnName: a } = Ji(o);
    if (i) {
      const c = `_memo_${l}`;
      t[l] = function(...u) {
        if (!this[c]) {
          const p = this;
          this[c] = vr({
            memoDeps: (v) => i(p, v),
            fn: (...v) => s(p, ...v),
            fnName: a,
            objectId: p.id,
            table: n,
            feature: e
          });
        }
        return this[c](...u);
      };
    } else t[l] = function(...c) {
      return s(this, ...c);
    };
  }
}
function ve(e, t, n, ...r) {
  var o;
  return ((o = e[t]) == null ? void 0 : o.call(e, ...r)) ?? n(e, ...r);
}
function Cu(e) {
  return e.row.getValue(e.column.id);
}
function Mu(e) {
  return e.getValue() ?? e.table.options.renderFallbackValue;
}
function Eu(e) {
  return {
    table: e.table,
    column: e.column,
    row: e.row,
    cell: e,
    getValue: () => e.getValue(),
    renderValue: () => e.renderValue()
  };
}
const Iu = { assignCellPrototype: (e, t) => {
  Yt("coreCellsFeature", e, t, {
    cell_getValue: { fn: (n) => Cu(n) },
    cell_renderValue: { fn: (n) => Mu(n) },
    cell_getContext: {
      fn: (n) => Eu(n),
      memoDeps: (n) => [n]
    }
  });
} };
function Ou(e) {
  var t, n;
  if (!e._headerPrototype) {
    e._headerPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignHeaderPrototype) == null || n.call(t, e._headerPrototype, e);
  }
  return e._headerPrototype;
}
function Zi(e, t, n) {
  const r = Ou(e), o = Object.create(r);
  o.colSpan = 0, o.column = t, o.depth = n.depth, o.headerGroup = null, o.id = n.id ?? t.id, o.index = n.index, o.isPlaceholder = !!n.isPlaceholder, o.placeholderId = n.placeholderId, o.rowSpan = 0, o.subHeaders = [];
  const s = e._headerInstanceInitFns;
  for (let i = 0; i < s.length; i++) s[i](o);
  return o;
}
function Pu() {
  return {
    start: [],
    end: []
  };
}
function At(e) {
  var r;
  const t = (r = e.table.atoms.columnVisibility) == null ? void 0 : r.get();
  if (!t) return !0;
  const n = e.columns;
  return n.length ? n.some((o) => ve(o, "getIsVisible", At)) : (zt(t, e.id) ? t[e.id] : void 0) ?? !0;
}
function Au(e) {
  return e.getAllLeafColumns().filter((t) => ve(t, "getIsVisible", At));
}
function Qi(e, t = 1) {
  let n = t;
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    ve(o, "getIsVisible", At) && o.columns.length && (n = Math.max(n, Qi(o.columns, t + 1)));
  }
  return n;
}
function Tu(e, t) {
  return String(t);
}
function Du(e, t, n, r) {
  let o = e ?? "";
  return t && (o = o ? `${o}_${t}` : String(t)), n && (o = o ? `${o}_${n}` : n), r && (o = o ? `${o}_${r}` : r), o;
}
function Fu(e, t) {
  let n = 0;
  for (let r = 0; r < e.length; r++) e[r].column === t && n++;
  return n;
}
function el(e, t, n, r, o, s) {
  const i = {
    depth: t,
    id: Tu(r, t),
    headers: []
  }, l = [];
  for (let a = 0; a < e.length; a++) {
    if (!(a in e)) continue;
    const c = e[a], u = l[l.length - 1], p = c.column.depth === i.depth;
    let v, w = !1;
    if (p && c.column.parent ? v = c.column.parent : (v = c.column, w = !0), u && u.column === v) u.subHeaders.push(c);
    else {
      const I = Zi(n, v, {
        id: Du(r, t, v.id, c.id),
        isPlaceholder: w,
        placeholderId: w ? String(Fu(l, v)) : void 0,
        depth: t,
        index: l.length
      });
      I.subHeaders.push(c), l.push(I);
    }
    i.headers.push(c), c.headerGroup = i;
  }
  for (let a = 0; a < s.length; a++) s[a](i);
  o.push(i), t > 0 && el(l, t - 1, n, r, o, s);
}
function tl(e) {
  for (let t = 0; t < e.length; t++) {
    const n = e[t];
    if (!ve(n.column, "getIsVisible", At)) continue;
    let r = 0;
    if (n.subHeaders.length) {
      tl(n.subHeaders);
      for (let o = 0; o < n.subHeaders.length; o++) {
        const s = n.subHeaders[o];
        ve(s.column, "getIsVisible", At) && (r += s.colSpan);
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
function ys(e, t, n, r) {
  var a;
  const o = Qi(e), s = [], i = n._headerGroupInstanceInitFns, l = new Array(t.length);
  for (let c = 0; c < t.length; c++)
    c in t && (l[c] = Zi(n, t[c], {
      depth: o,
      index: c
    }));
  return el(l, o - 1, n, r, s, i), s.reverse(), tl(((a = s[0]) == null ? void 0 : a.headers) ?? []), s;
}
function ku(e) {
  var t, n;
  if (!e._columnPrototype) {
    e._columnPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignColumnPrototype) == null || n.call(t, e._columnPrototype, e);
  }
  return e._columnPrototype;
}
function ju(e, t, n, r) {
  const o = {
    ...e.getDefaultColumnDef(),
    ...t
  }, s = o.accessorKey, i = s === void 0 ? void 0 : String(s), l = o.id ?? (i == null ? void 0 : i.replaceAll(".", "_")) ?? (typeof o.header == "string" ? o.header : void 0);
  let a;
  if (o.accessorFn) a = o.accessorFn;
  else if (s !== void 0) if (typeof s == "string" && s.includes(".")) {
    const v = s.split(".");
    a = (w) => {
      let I = w;
      for (let C = 0; C < v.length; C++) {
        const F = v[C];
        I = I == null ? void 0 : I[F];
      }
      return I;
    };
  } else a = (v) => v[o.accessorKey];
  if (!l)
    throw new Error();
  const c = ku(e), u = Object.create(c);
  u.accessorFn = a, u.columnDef = o, u.columns = [], u.depth = n, u.id = `${String(l)}`, u.parent = r;
  const p = e._columnInstanceInitFns;
  for (let v = 0; v < p.length; v++) p[v](u);
  return u;
}
function nl(e) {
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
    return Hu(e, o);
  };
}
function Hu(e, t) {
  var l;
  const n = ((l = e.atoms.grouping) == null ? void 0 : l.get()) ?? [], { groupedColumnMode: r } = e.options;
  if (!n.length || !r) return t;
  const o = t.filter((a) => !n.includes(a.id));
  if (r === "remove") return o;
  const s = /* @__PURE__ */ new Map();
  for (let a = 0; a < t.length; a++) {
    const c = t[a];
    s.set(c.id, c);
  }
  const i = [];
  for (let a = 0; a < n.length; a++) {
    const c = s.get(n[a]);
    c && i.push(c);
  }
  return [...i, ...o];
}
function Lu(e) {
  return [e, ...e.columns.flatMap((t) => t.getFlatColumns())];
}
function Ku(e) {
  if (e.columns.length) {
    const t = e.columns.flatMap((n) => n.getLeafColumns());
    return ve(e.table, "getOrderColumns", nl)(t);
  }
  return [e];
}
function $u(e) {
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
function rl(e, t, n, r = 0) {
  const o = new Array(t.length);
  for (let s = 0; s < t.length; s++) {
    if (!(s in t)) continue;
    const i = t[s], l = ju(e, i, r, n), a = i;
    l.columns = a.columns ? rl(e, a.columns, l, r + 1) : [], o[s] = l;
  }
  return o;
}
function Vu(e) {
  return rl(e, e.options.columns);
}
function Nu(e) {
  return e.getAllColumns().flatMap((t) => t.getFlatColumns());
}
function Bu(e) {
  const t = re(), n = e.getAllFlatColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function Wu(e) {
  const t = e.getAllColumns().flatMap((n) => n.getLeafColumns());
  return ve(e, "getOrderColumns", nl)(t);
}
function Uu(e) {
  const t = re(), n = e.getAllLeafColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function Gu(e, t) {
  return e.getAllFlatColumnsById()[t];
}
const qu = {
  assignColumnPrototype: (e, t) => {
    Yt("coreColumnsFeature", e, t, {
      column_getFlatColumns: {
        fn: (n) => Lu(n),
        memoDeps: (n) => [n.table.options.columns]
      },
      column_getLeafColumns: {
        fn: (n) => Ku(n),
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
    kt("coreColumnsFeature", e, {
      table_getDefaultColumnDef: {
        fn: () => $u(e),
        memoDeps: () => [e.options.defaultColumn]
      },
      table_getAllColumns: {
        fn: () => Vu(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumns: {
        fn: () => Nu(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumnsById: {
        fn: () => Bu(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllLeafColumns: {
        fn: () => Wu(e),
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
        fn: () => Uu(e),
        memoDeps: () => [e.getAllLeafColumns()]
      },
      table_getColumn: { fn: (t) => Gu(e, t) }
    });
  }
};
function ol(e, t) {
  for (let n = 0; n < e.subHeaders.length; n++) ol(e.subHeaders[n], t);
  t.push(e);
}
function zu(e) {
  const t = [];
  return ol(e, t), t;
}
function Yu(e) {
  return {
    column: e.column,
    header: e,
    table: e.column.table
  };
}
function Xu(e) {
  var c;
  const { start: t, end: n } = ((c = e.atoms.columnPinning) == null ? void 0 : c.get()) ?? Pu(), r = e.getAllColumns(), o = ve(e, "getVisibleLeafColumns", Au);
  if (!t.length && !n.length) return ys(r, o, e);
  const s = e.getAllLeafColumnsById(), i = [];
  for (let u = 0; u < t.length; u++) {
    const p = s[t[u]];
    p && ve(p, "getIsVisible", At) && i.push(p);
  }
  const l = [];
  for (let u = 0; u < n.length; u++) {
    const p = s[n[u]];
    p && ve(p, "getIsVisible", At) && l.push(p);
  }
  const a = o.filter((u) => !t.includes(u.id) && !n.includes(u.id));
  return ys(r, [
    ...i,
    ...a,
    ...l
  ], e);
}
function Ju(e) {
  return [...e.getHeaderGroups()].reverse();
}
function Zu(e) {
  const t = e.getHeaderGroups(), n = [];
  for (let r = 0; r < t.length; r++) {
    const o = t[r].headers;
    for (let s = 0; s < o.length; s++) n.push(o[s]);
  }
  return n;
}
function Qu(e) {
  var r;
  const t = ((r = e.getHeaderGroups()[0]) == null ? void 0 : r.headers) ?? [], n = [];
  for (let o = 0; o < t.length; o++) {
    const s = t[o].getLeafHeaders();
    for (let i = 0; i < s.length; i++) n.push(s[i]);
  }
  return n;
}
const ef = {
  assignHeaderPrototype: (e, t) => {
    Yt("coreHeadersFeature", e, t, {
      header_getLeafHeaders: {
        fn: (n) => zu(n),
        memoDeps: (n) => [n.column.table.options.columns]
      },
      header_getContext: {
        fn: (n) => Yu(n),
        memoDeps: (n) => [n.column.table.options.columns]
      }
    });
  },
  constructTableAPIs: (e) => {
    kt("coreHeadersFeature", e, {
      table_getHeaderGroups: {
        fn: () => Xu(e),
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
        fn: () => Ju(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getFlatHeaders: {
        fn: () => Zu(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getLeafHeaders: {
        fn: () => Qu(e),
        memoDeps: () => [e.getHeaderGroups()]
      }
    });
  }
};
function tf(e) {
  var t, n;
  if (!e._rowPrototype) {
    e._rowPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignRowPrototype) == null || n.call(t, e._rowPrototype, e);
  }
  return e._rowPrototype;
}
const nf = (e, t, n, r, o, s, i) => {
  const l = tf(e), a = Object.create(l);
  a._displayIndexCache = -1, a._uniqueValuesCache = re(), a._valuesCache = re(), a.depth = o, a.id = t, a.index = r, a.original = n, a.parentId = i, a.subRows = [];
  const c = e._rowInstanceInitFns;
  for (let u = 0; u < c.length; u++) c[u](a);
  return a;
};
function rf() {
  return [];
}
function of(e, t) {
  mr(e, "cellSelection", wt(e.initialState.cellSelection) ?? rf());
}
function sf(e) {
  e.atoms.cellSelection && (e.options.autoResetAll ?? e.options.autoResetCellSelection ?? !0) && e._reactivity.schedule(() => of(e));
}
function lf() {
  return re();
}
function sl(e) {
  e.atoms.expanded && (e.options.autoResetAll ?? e.options.autoResetExpanded ?? !e.options.manualExpanding) && e._reactivity.schedule(() => ll(e));
}
function er(e, t) {
  var n, r;
  (r = (n = e.options).onExpandedChange) == null || r.call(n, t);
}
function il(e, t) {
  var r;
  const n = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t ?? !cl(e)) {
    if (n === !0 || !al(e)) return;
    er(e, !0);
  } else {
    if (n !== !0 && !Object.keys(n).length) return;
    er(e, re());
  }
}
function ll(e, t) {
  const n = e.initialState.expanded;
  mr(e, "expanded", t ? re() : n === !0 ? !0 : Object.assign(re(), wt(n ?? {})));
}
function al(e) {
  return e.getPrePaginatedRowModel().flatRows.some((t) => Tt(t));
}
function af(e) {
  return (t) => {
    il(e);
  };
}
function cf(e) {
  var n;
  const t = ((n = e.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return t === !0 || Object.values(t).some(Boolean);
}
function cl(e) {
  var r;
  const t = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t === !0) return !0;
  if (!Object.keys(t).length) return !1;
  const n = e.getRowModel().flatRows.filter((o) => Tt(o));
  return !(!n.length || n.some((o) => !yr(o)));
}
function uf(e) {
  var r;
  let t = 0;
  const n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return (n === !0 ? Object.values(e.getRowModel().rowsById).filter((o) => Tt(o)).map((o) => o.id) : Object.keys(n ?? {})).forEach((o) => {
    const s = o.split(".");
    t = Math.max(t, s.length);
  }), t;
}
function ul(e, t) {
  var s;
  const n = ((s = e.table.atoms.expanded) == null ? void 0 : s.get()) ?? {}, r = n === !0 || lo(n, e.id), o = t ?? !r;
  o !== r && (o && !Tt(e) || er(e.table, (i) => {
    const l = i === !0 ? !0 : lo(i, e.id);
    let a = re();
    if (i === !0 ? Object.values(e.table.getRowModel().rowsById).forEach((c) => {
      Tt(c) && (a[c.id] = !0);
    }) : a = Object.assign(re(), i), !l && o)
      return a[e.id] = !0, a;
    if (l && !o) {
      const c = re(), u = Object.keys(a);
      for (let p = 0; p < u.length; p++) {
        const v = u[p];
        v !== e.id && a[v] && (c[v] = !0);
      }
      return c;
    }
    return i;
  }));
}
function yr(e) {
  var n, r, o;
  const t = ((n = e.table.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return !!(((o = (r = e.table.options).getIsRowExpanded) == null ? void 0 : o.call(r, e)) ?? (t === !0 || lo(t, e.id)));
}
function lo(e, t) {
  return !!(e && e !== !0 && zt(e, t) && e[t]);
}
function Tt(e) {
  var t, n;
  return ((n = (t = e.table.options).getRowCanExpand) == null ? void 0 : n.call(t, e)) ?? ((e.table.options.enableExpanding ?? !0) && !!e.subRows.length);
}
function ff(e) {
  let t = !0, n = e;
  for (; t && n.parentId; )
    n = e.table.getRow(n.parentId, !0), t = yr(n);
  return t;
}
function df(e) {
  const t = Tt(e);
  return () => {
    t && ul(e);
  };
}
const ao = 0;
function pf(e) {
  var t, n;
  if (e.options.autoResetAll ?? e.options.autoResetPageIndex ?? !e.options.manualPagination) {
    if ((((n = (t = e.atoms.pagination) == null ? void 0 : t.get()) == null ? void 0 : n.pageIndex) ?? ao) === ao) return;
    mf(e);
  }
}
function gf(e, t) {
  mr(e, "pagination", t);
}
function hf(e, t) {
  gf(e, (n) => {
    let r = hr(t, n.pageIndex);
    const o = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
    return r = Math.max(0, Math.min(r, o)), {
      ...n,
      pageIndex: r
    };
  });
}
function mf(e, t) {
  hf(e, ao);
}
function vf(e, t) {
  mr(e, "sorting", t);
}
function yf(e, t) {
  vf(e, wt(e.initialState.sorting ?? []));
}
function wf(e) {
  e.atoms.sorting && (e.options.autoResetAll ?? e.options.autoResetSorting ?? !1) && yf(e);
}
function fl() {
  return (e) => vr({
    feature: "coreRowModelsFeature",
    table: e,
    fnName: "table.getCoreRowModel",
    memoDeps: () => [e.options.data],
    fn: () => bf(e, e.options.data),
    onAfterUpdate: Ru(() => {
      sl(e), pf(e), wf(e), sf(e);
    })
  });
}
function dl(e, t, n, r = 0, o) {
  var i;
  const s = [];
  for (let l = 0; l < n.length; l++) {
    const a = n[l], c = nf(e, e.getRowId(a, l, o), a, l, r, void 0, o == null ? void 0 : o.id);
    t.flatRows.push(c), t.rowsById[c.id] = c, s.push(c), e.options.getSubRows && (c.originalSubRows = e.options.getSubRows(a, l), (i = c.originalSubRows) != null && i.length && (c.subRows = dl(e, t, c.originalSubRows, r + 1, c)));
  }
  return s;
}
function bf(e, t) {
  const n = {
    rows: [],
    flatRows: [],
    rowsById: re()
  };
  return n.rows = dl(e, n, t), n;
}
function _f(e) {
  var t, n;
  return e._rowModels.coreRowModel || (e._rowModels.coreRowModel = ((n = (t = e.options.features).coreRowModel) == null ? void 0 : n.call(t, e)) ?? fl()(e)), e._rowModels.coreRowModel();
}
function Sf(e) {
  return e.getCoreRowModel();
}
function xf(e) {
  var t, n;
  return e._rowModels.filteredRowModel || (e._rowModels.filteredRowModel = (n = (t = e.options.features).filteredRowModel) == null ? void 0 : n.call(t, e)), e.options.manualFiltering || !e._rowModels.filteredRowModel ? e.getPreFilteredRowModel() : e._rowModels.filteredRowModel();
}
function Rf(e) {
  return e.getFilteredRowModel();
}
function Cf(e) {
  var t, n;
  return e._rowModels.groupedRowModel || (e._rowModels.groupedRowModel = (n = (t = e.options.features).groupedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualGrouping || !e._rowModels.groupedRowModel ? e.getPreGroupedRowModel() : e._rowModels.groupedRowModel();
}
function Mf(e) {
  return e.getGroupedRowModel();
}
function Ef(e) {
  var t, n;
  return e._rowModels.sortedRowModel || (e._rowModels.sortedRowModel = (n = (t = e.options.features).sortedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualSorting || !e._rowModels.sortedRowModel ? e.getPreSortedRowModel() : e._rowModels.sortedRowModel();
}
function If(e) {
  return e.getSortedRowModel();
}
function Of(e) {
  var t, n;
  return e._rowModels.expandedRowModel || (e._rowModels.expandedRowModel = (n = (t = e.options.features).expandedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualExpanding || !e._rowModels.expandedRowModel ? e.getPreExpandedRowModel() : e._rowModels.expandedRowModel();
}
function Pf(e) {
  return e.getExpandedRowModel();
}
function Af(e) {
  var t, n;
  return e._rowModels.paginatedRowModel || (e._rowModels.paginatedRowModel = (n = (t = e.options.features).paginatedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualPagination || !e._rowModels.paginatedRowModel ? e.getPrePaginatedRowModel() : e._rowModels.paginatedRowModel();
}
function Tf(e) {
  return e.getPaginatedRowModel();
}
const Df = { constructTableAPIs: (e) => {
  kt("coreRowModelsFeature", e, {
    table_getCoreRowModel: { fn: () => _f(e) },
    table_getPreFilteredRowModel: { fn: () => Sf(e) },
    table_getFilteredRowModel: { fn: () => xf(e) },
    table_getPreGroupedRowModel: { fn: () => Rf(e) },
    table_getGroupedRowModel: { fn: () => Cf(e) },
    table_getPreSortedRowModel: { fn: () => Mf(e) },
    table_getSortedRowModel: { fn: () => Ef(e) },
    table_getPreExpandedRowModel: { fn: () => If(e) },
    table_getExpandedRowModel: { fn: () => Of(e) },
    table_getPrePaginatedRowModel: { fn: () => Pf(e) },
    table_getPaginatedRowModel: { fn: () => Af(e) },
    table_getRowModel: { fn: () => Tf(e) }
  });
} };
function Ff(e) {
  var t, n;
  if (!e._cellPrototype) {
    e._cellPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignCellPrototype) == null || n.call(t, e._cellPrototype, e);
  }
  return e._cellPrototype;
}
function kf(e, t, n) {
  const r = Ff(n), o = Object.create(r);
  o.column = e, o.id = `${t.id}_${e.id}`, o.row = t;
  const s = n._cellInstanceInitFns;
  for (let i = 0; i < s.length; i++) s[i](o);
  return o;
}
function jf(e) {
  const t = e.table.getRowsInDisplayOrder(), n = e._displayIndexCache;
  return t[n] === e ? n : -1;
}
function Hf(e) {
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
function Lf(e, t) {
  if (zt(e._valuesCache, t)) return e._valuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return e._valuesCache[t] = n.accessorFn(e.original, e.index), e._valuesCache[t];
}
function Kf(e, t) {
  if (zt(e._uniqueValuesCache, t)) return e._uniqueValuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return n.columnDef.getUniqueValues ? (e._uniqueValuesCache[t] = n.columnDef.getUniqueValues(e.original, e.index), e._uniqueValuesCache[t]) : (e._uniqueValuesCache[t] = [e.getValue(t)], e._uniqueValuesCache[t]);
}
function $f(e, t) {
  return e.getValue(t) ?? e.table.options.renderFallbackValue;
}
function Vf(e) {
  return Su(e.subRows, (t) => t.subRows);
}
function Nf(e) {
  const t = e.getCoreRowModel().flatRows;
  let n = 0;
  for (let r = 0; r < t.length; r++) n = Math.max(n, t[r].depth);
  return n;
}
function Bf(e) {
  if (e.parentId)
    return e.table.getCoreRowModel().rowsById[e.parentId] ?? e.table.getRow(e.parentId, !0);
}
function Wf(e) {
  const t = [];
  let n = e;
  for (; ; ) {
    const r = n.getParentRow();
    if (!r) break;
    t.push(r), n = r;
  }
  return t.reverse();
}
function Uf(e) {
  const t = e.table.getAllLeafColumns();
  let n = e._cellsCache;
  n || (n = e._cellsCache = /* @__PURE__ */ new WeakMap());
  const r = new Array(t.length);
  for (let o = 0; o < t.length; o++) {
    const s = t[o];
    let i = n.get(s);
    i || (i = kf(s, e, e.table), n.set(s, i)), r[o] = i;
  }
  return r;
}
function Gf(e) {
  const t = re(), n = e.getAllCells();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.column.id] = o;
  }
  return t;
}
function qf(e, t, n, r) {
  var o, s;
  return ((s = (o = t.options).getRowId) == null ? void 0 : s.call(o, e, n, r)) ?? (r ? `${r.id}.${n}` : String(n));
}
function zf(e, t, n) {
  let r = (n ? e.getPrePaginatedRowModel() : e.getRowModel()).rowsById[t];
  if (!r && (r = e.getCoreRowModel().rowsById[t], !r))
    throw new Error();
  return r;
}
const Yf = {
  assignRowPrototype: (e, t) => {
    Yt("coreRowsFeature", e, t, {
      row_getDisplayIndex: { fn: (n) => jf(n) },
      row_getAllCellsByColumnId: {
        fn: (n) => Gf(n),
        memoDeps: (n) => [n.getAllCells()]
      },
      row_getAllCells: {
        fn: (n) => Uf(n),
        memoDeps: (n) => [n.table.getAllLeafColumns()]
      },
      row_getLeafRows: {
        fn: (n) => Vf(n),
        memoDeps: (n) => [n.subRows]
      },
      row_getParentRow: { fn: (n) => Bf(n) },
      row_getParentRows: { fn: (n) => Wf(n) },
      row_getUniqueValues: { fn: (n, r) => Kf(n, r) },
      row_getValue: { fn: (n, r) => Lf(n, r) },
      row_renderValue: { fn: (n, r) => $f(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    kt("coreRowsFeature", e, {
      table_getRowsInDisplayOrder: {
        fn: () => Hf(e),
        memoDeps: () => {
          var t;
          return [
            e.getPrePaginatedRowModel().rows,
            e.options.paginateExpandedRows,
            e.options.paginateExpandedRows === !1 ? (t = e.atoms.expanded) == null ? void 0 : t.get() : void 0
          ];
        }
      },
      table_getRowId: { fn: (t, n, r) => qf(t, e, n, r) },
      table_getRow: { fn: (t, n) => zf(e, t, n) },
      table_getMaxSubRowDepth: {
        fn: () => Nf(e),
        memoDeps: () => [e.getCoreRowModel()]
      }
    });
  }
};
function pl(e, t, n = (r, o) => r === o) {
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
function Xf(e, t, n = (r, o) => r === o) {
  e._reactivity.batch(() => {
    var r, o;
    pl(e, t, n), (o = (r = e._reactivity).commit) == null || o.call(r);
  });
}
function Jf(e) {
  var r, o;
  const t = wt(e.initialState);
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
function Zf(e, t) {
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
function Qf(e, t, n) {
  const r = Zf(e, hr(t, e.options));
  e.optionsStore ? e.optionsStore.set(() => r) : e.options = r, Xf(e, r.state ?? null);
}
const ed = { constructTableAPIs: (e) => {
  kt("coreTablesFeature", e, {
    table_reset: { fn: () => Jf(e) },
    table_setOptions: { fn: (t) => Qf(e, t) }
  });
} }, td = {
  coreCellsFeature: Iu,
  coreColumnsFeature: qu,
  coreHeadersFeature: ef,
  coreRowModelsFeature: Df,
  coreRowsFeature: Yf,
  coreTablesFeature: ed
};
function nd(e) {
  const t = e;
  return Object.defineProperty(e, "state", { get() {
    return e.get();
  } }), "set" in e && (t.setState = e.set.bind(e)), t;
}
function rd(e, t) {
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
  const n = ws(e);
  if (n.length !== ws(t).length) return !1;
  for (let r = 0; r < n.length; r++) if (!Object.prototype.hasOwnProperty.call(t, n[r]) || !Object.is(e[n[r]], t[n[r]])) return !1;
  return !0;
}
function ws(e) {
  return Object.keys(e).concat(Object.getOwnPropertySymbols(e));
}
function od(e, t = {}) {
  return Object.values(e).forEach((n) => {
    var r;
    t = ((r = n.getInitialState) == null ? void 0 : r.call(n, t)) ?? t;
  }), wt(t);
}
function sd(e) {
  var W, G;
  const t = e.features.coreReactivityFeature, { aggregationFns: n, columnMeta: r, coreRowModel: o, expandedRowModel: s, facetedMinMaxValues: i, facetedRowModel: l, facetedUniqueValues: a, filterFns: c, filterMeta: u, filteredRowModel: p, groupedRowModel: v, paginatedRowModel: w, sortFns: I, sortedRowModel: C, tableMeta: F, ...L } = e.features, M = {
    _cellInstanceInitFns: [],
    _columnInstanceInitFns: [],
    _features: {
      ...td,
      ...L
    },
    _headerGroupInstanceInitFns: [],
    _headerInstanceInitFns: [],
    _reactivity: t,
    _rowInstanceInitFns: [],
    _rowModelFns: {
      aggregationFns: n,
      filterFns: c,
      sortFns: I
    },
    _rowModels: {},
    atoms: {},
    baseAtoms: {}
  }, k = Object.values(M._features), P = {
    ...k.reduce(($, D) => {
      var z;
      return Object.assign($, (z = D.getDefaultTableOptions) == null ? void 0 : z.call(D, M));
    }, {}),
    ...e
  };
  if (t.wrapExternalAtoms && P.atoms) for (const [$, D] of Object.entries(P.atoms)) {
    const z = D, ae = t.createWritableAtom(z.get(), { debugName: `externalAtom/${$}` });
    P.atoms[$] = ae;
    let oe = !1;
    const he = z.subscribe((ye) => {
      oe || ae.set(ye);
    }), Se = ae.subscribe((ye) => {
      oe = !0, z.set(ye), oe = !1;
    });
    t.addSubscription(he), t.addSubscription(Se);
  }
  t.createOptionsStore ? (M.optionsStore = t.createWritableAtom(P, { debugName: "table/optionsStore" }), Object.defineProperty(M, "options", {
    configurable: !0,
    enumerable: !0,
    get() {
      return M.optionsStore.get();
    },
    set($) {
      M.optionsStore.set(() => $);
    }
  })) : M.options = P, M.initialState = od(M._features, M.options.initialState);
  const B = Object.keys(M.initialState);
  for (let $ = 0; $ < B.length; $++) {
    const D = B[$];
    M.baseAtoms[D] = t.createWritableAtom(M.initialState[D], { debugName: `table/baseAtoms/${D}` }), M.atoms[D] = t.createReadonlyAtom(() => {
      var Se;
      const z = M.options, ae = (Se = z.atoms) == null ? void 0 : Se[D], oe = ae ? ae.get() : M.baseAtoms[D].get();
      if (ae) return oe;
      const he = z.state;
      if (he && zt(he, D)) {
        const ye = he[D];
        return ye === void 0 ? M.initialState[D] : ye;
      }
      return oe;
    }, { debugName: `table/atoms/${D}` });
  }
  pl(M), M.store = nd(t.createReadonlyAtom(() => {
    const $ = {};
    for (let D = 0; D < B.length; D++) {
      const z = B[D];
      $[z] = M.atoms[z].get();
    }
    return $;
  }, {
    compare: rd,
    debugName: "table/store"
  }));
  for (let $ = 0; $ < k.length; $++) {
    const D = k[$];
    (W = D.initTableInstanceData) == null || W.call(D, M), D.initCellInstanceData && M._cellInstanceInitFns.push(D.initCellInstanceData.bind(D)), D.initColumnInstanceData && M._columnInstanceInitFns.push(D.initColumnInstanceData.bind(D)), D.initHeaderGroupInstanceData && M._headerGroupInstanceInitFns.push(D.initHeaderGroupInstanceData.bind(D)), D.initHeaderInstanceData && M._headerInstanceInitFns.push(D.initHeaderInstanceData.bind(D)), D.initRowInstanceData && M._rowInstanceInitFns.push(D.initRowInstanceData.bind(D)), (G = D.constructTableAPIs) == null || G.call(D, M);
  }
  return M;
}
const id = {
  getInitialState: (e) => ({
    expanded: lf(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onExpandedChange: Yi("expanded", e),
    paginateExpandedRows: !0
  }),
  assignRowPrototype: (e, t) => {
    Yt("rowExpandingFeature", e, t, {
      row_toggleExpanded: { fn: (n, r) => ul(n, r) },
      row_getIsExpanded: { fn: (n) => yr(n) },
      row_getCanExpand: { fn: (n) => Tt(n) },
      row_getIsAllParentsExpanded: { fn: (n) => ff(n) },
      row_getToggleExpandedHandler: { fn: (n) => df(n) }
    });
  },
  constructTableAPIs: (e) => {
    kt("rowExpandingFeature", e, {
      table_autoResetExpanded: { fn: () => sl(e) },
      table_setExpanded: { fn: (t) => er(e, t) },
      table_toggleAllRowsExpanded: { fn: (t) => il(e, t) },
      table_resetExpanded: { fn: (t) => ll(e, t) },
      table_getCanSomeRowsExpand: { fn: () => al(e) },
      table_getToggleAllRowsExpandedHandler: { fn: () => af(e) },
      table_getIsSomeRowsExpanded: { fn: () => cf(e) },
      table_getIsAllRowsExpanded: { fn: () => cl(e) },
      table_getExpandedDepth: { fn: () => uf(e) }
    });
  }
};
function ld() {
  return re();
}
function Xt(e, t) {
  var n, r;
  (r = (n = e.options).onRowSelectionChange) == null || r.call(n, t);
}
function ad(e, t) {
  e._lastSelectedRowId = null, Xt(e, t ? re() : Object.assign(re(), wt(e.initialState.rowSelection ?? {})));
}
function gl(e, t, n) {
  e._lastSelectedRowId = null, Xt(e, (r) => {
    if (t = typeof t < "u" ? t : !ve(e, "getIsAllRowsSelected", vl), n != null && n.deselectAll && !t) return re();
    const o = Object.assign(re(), r), s = e.getPreGroupedRowModel().flatRows;
    if (t) {
      const i = /* @__PURE__ */ new Map();
      s.forEach((l) => {
        tr(l, i) && (o[l.id] = !0);
      });
    } else s.forEach((i) => {
      ut(i) && delete o[i.id];
    });
    return o;
  });
}
function hl(e, t, n) {
  e._lastSelectedRowId = null, Xt(e, (r) => {
    const o = typeof t < "u" ? t : !ve(e, "getIsAllPageRowsSelected", yl);
    if (n != null && n.deselectAll && !o) return re();
    const s = Object.assign(re(), r);
    return e.getRowModel().rows.forEach((i) => {
      br(s, i.id, o, !0, e, !0);
    }), s;
  });
}
function cd(e) {
  return e.getCoreRowModel();
}
function ud(e) {
  const t = e.getCoreRowModel();
  return ve(e, "getIsSomeRowsSelected", wr) ? To(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: re()
  };
}
function fd(e) {
  const t = e.getFilteredRowModel();
  return ve(e, "getIsSomeRowsSelected", wr) ? To(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: re()
  };
}
function dd(e) {
  const t = e.getSortedRowModel();
  return ve(e, "getIsSomeRowsSelected", wr) ? To(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: re()
  };
}
function ml(e) {
  var t;
  return Object.keys(((t = e.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function vl(e) {
  var o;
  const t = e.getFilteredRowModel().flatRows, n = ((o = e.atoms.rowSelection) == null ? void 0 : o.get()) ?? {};
  let r = !!(t.length && Object.keys(n).length);
  if (r) {
    const s = /* @__PURE__ */ new Map();
    t.some((i) => !Rn(i, n) && tr(i, s)) && (r = !1);
  }
  return r;
}
function yl(e) {
  var s;
  const t = e.getPaginatedRowModel().flatRows, n = ((s = e.atoms.rowSelection) == null ? void 0 : s.get()) ?? {}, r = /* @__PURE__ */ new Map();
  let o = !1;
  for (let i = 0; i < t.length; i++) {
    const l = t[i];
    if (Rn(l, n))
      !o && tr(l, r) && (o = !0);
    else if (tr(l, r)) return !1;
  }
  return o;
}
function wr(e) {
  return ve(e, "getSelectedRowIds", ml).length > 0;
}
function pd(e) {
  return e.getPaginatedRowModel().flatRows.filter((t) => ut(t)).some((t) => Po(t) || ve(t, "getIsSomeSelected", bl));
}
function gd(e) {
  return (t) => {
    gl(e, t.target.checked);
  };
}
function hd(e) {
  return (t) => {
    hl(e, t.target.checked);
  };
}
function wl(e, t, n) {
  const r = Po(e);
  Xt(e.table, (o) => {
    t = typeof t < "u" ? t : !r;
    const s = Object.assign(re(), o);
    return br(s, e.id, t, ((n == null ? void 0 : n.selectChildren) ?? !0) && Pt(e), e.table), !t && (n != null && n.deselectParents) && _l(s, e), s;
  });
}
function Po(e) {
  var t;
  return Rn(e, ((t = e.table.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function bl(e) {
  return Do(e) === "some";
}
function md(e) {
  return Do(e) === "all";
}
function ut(e) {
  const t = e.table.options;
  return typeof t.enableRowSelection == "function" ? t.enableRowSelection(e) : t.enableRowSelection ?? !0;
}
function Ao(e) {
  const t = e.table.options;
  return typeof t.enableSubRowSelection == "function" ? t.enableSubRowSelection(e) : t.enableSubRowSelection ?? !0;
}
function Pt(e) {
  const t = e.table.options;
  return typeof t.enableMultiRowSelection == "function" ? t.enableMultiRowSelection(e) : t.enableMultiRowSelection ?? !0;
}
function vd(e, t) {
  const n = ut(e);
  return (r) => {
    var a, c;
    if (!n) return;
    const o = r, s = e.table, i = o.target.checked, l = s._lastSelectedRowId;
    (!(s.options.enableRowRangeSelection !== !1 && l !== null && Pt(e) && (((c = (a = s.options).isRowRangeSelectionEvent) == null ? void 0 : c.call(a, r)) ?? !1)) || !yd(e, l, i, t)) && wl(e, i, t), s._lastSelectedRowId = e.id;
  };
}
function yd(e, t, n, r) {
  const o = (r == null ? void 0 : r.selectChildren) ?? !0, s = e.table, i = s.getRowsInDisplayOrder(), l = s.getPrePaginatedRowModel().rowsById[t] ?? s.getCoreRowModel().rowsById[t];
  if (!l) return !1;
  const a = l.getDisplayIndex(), c = e.getDisplayIndex(), u = i[a], p = i[c];
  if (a < 0 || c < 0 || a >= i.length || c >= i.length || (u == null ? void 0 : u.id) !== l.id || (p == null ? void 0 : p.id) !== e.id || !Pt(l) || !Pt(e)) return !1;
  const v = Math.min(a, c), w = Math.max(a, c);
  return Xt(s, (I) => {
    const C = Object.assign(re(), I);
    for (let F = v; F <= w; F++) {
      const L = i[F];
      !ut(L) || !Pt(L) || (br(C, L.id, n, o, s), !n && (r != null && r.deselectParents) && _l(C, L));
    }
    return C;
  }), !0;
}
function br(e, t, n, r, o, s) {
  const i = o.getRow(t, !0);
  n ? (Pt(i) || Object.keys(e).forEach((l) => delete e[l]), ut(i) && (e[t] = !0)) : (!s || ut(i)) && delete e[t], r && i.subRows.length && Ao(i) && i.subRows.forEach((l) => br(e, l.id, n, r, o, s));
}
function tr(e, t) {
  if (!ut(e)) return !1;
  const n = e.table;
  if (n.options.enableSubRowSelection === !0) return !0;
  const r = e.parentId;
  if (r === void 0) return !0;
  const o = t.get(r);
  if (o !== void 0) return o;
  const s = n.getCoreRowModel().rowsById, i = [];
  let l = !0, a = r;
  for (; a !== void 0; ) {
    const c = t.get(a);
    if (c !== void 0) {
      l = c;
      break;
    }
    i.push(a);
    const u = s[a] ?? n.getRow(a, !0);
    if (!Ao(u)) {
      l = !1;
      break;
    }
    a = u.parentId;
  }
  return i.forEach((c) => t.set(c, l)), l;
}
function _l(e, t) {
  const n = t.table.getCoreRowModel().rowsById;
  let r = t.parentId;
  for (; r !== void 0; )
    delete e[r], r = (n[r] ?? t.table.getRow(r, !0)).parentId;
}
function Sl(e, t, n, r) {
  const o = [];
  for (let s = 0; s < e.length; s++) {
    const i = e[s], l = Rn(i, t);
    if (l && (n.push(i), r[i.id] = i), i.subRows.length) {
      const a = Sl(i.subRows, t, n, r);
      if (l) {
        const c = Object.create(Object.getPrototypeOf(i));
        wu(c, i), c.subRows = a, o.push(c);
      }
    } else l && o.push(i);
  }
  return o;
}
function To(e, t) {
  var s;
  const n = [], r = re(), o = ((s = t.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  return {
    rows: Sl(e.rows, o, n, r),
    flatRows: n,
    rowsById: r
  };
}
function Rn(e, t) {
  return !!(zt(t, e.id) && t[e.id]);
}
function Do(e) {
  var s;
  if (!e.subRows.length) return !1;
  const t = ((s = e.table.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  let n = !1, r = !0, o = !1;
  for (let i = 0; i < e.subRows.length; i++) {
    const l = e.subRows[i];
    if (n && !r) break;
    if (ut(l) && (o = !0, Rn(l, t) ? n = !0 : r = !1), l.subRows.length) {
      const a = Do(l);
      a === "all" ? (n = !0, o = !0) : a === "some" ? (n = !0, r = !1, o = !0) : r = !1;
    }
  }
  return o ? r ? "all" : n ? "some" : !1 : !1;
}
const wd = {
  initTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  resetTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  getInitialState: (e) => ({
    rowSelection: ld(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onRowSelectionChange: Yi("rowSelection", e),
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
    Yt("rowSelectionFeature", e, t, {
      row_toggleSelected: { fn: (n, r, o) => wl(n, r, o) },
      row_getIsSelected: { fn: (n) => Po(n) },
      row_getIsSomeSelected: {
        fn: (n) => bl(n),
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
        fn: (n) => md(n),
        memoDeps: (n) => {
          var r;
          return [
            n.subRows,
            (r = n.table.atoms.rowSelection) == null ? void 0 : r.get(),
            n.table.options.enableRowSelection
          ];
        }
      },
      row_getCanSelect: { fn: (n) => ut(n) },
      row_getCanSelectSubRows: { fn: (n) => Ao(n) },
      row_getCanMultiSelect: { fn: (n) => Pt(n) },
      row_getToggleSelectedHandler: { fn: (n, r) => vd(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    kt("rowSelectionFeature", e, {
      table_setRowSelection: { fn: (t) => Xt(e, t) },
      table_resetRowSelection: { fn: (t) => ad(e, t) },
      table_toggleAllRowsSelected: { fn: (t, n) => gl(e, t, n) },
      table_toggleAllPageRowsSelected: { fn: (t, n) => hl(e, t, n) },
      table_getPreSelectedRowModel: { fn: () => cd(e) },
      table_getSelectedRowModel: {
        fn: () => ud(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getCoreRowModel()];
        }
      },
      table_getFilteredSelectedRowModel: {
        fn: () => fd(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getFilteredRowModel()];
        }
      },
      table_getGroupedSelectedRowModel: {
        fn: () => dd(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getSortedRowModel()];
        }
      },
      table_getSelectedRowIds: {
        fn: () => ml(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get()];
        }
      },
      table_getIsAllRowsSelected: {
        fn: () => vl(e),
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
        fn: () => yl(e),
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
        fn: () => wr(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get()];
        }
      },
      table_getIsSomePageRowsSelected: {
        fn: () => pd(e),
        memoDeps: () => {
          var t;
          return [
            (t = e.atoms.rowSelection) == null ? void 0 : t.get(),
            e.getPaginatedRowModel(),
            e.options.enableRowSelection
          ];
        }
      },
      table_getToggleAllRowsSelectedHandler: { fn: () => gd(e) },
      table_getToggleAllPageRowsSelectedHandler: { fn: () => hd(e) }
    });
  }
};
function bd() {
  return (e) => {
    const t = e;
    return vr({
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
      fn: () => _d(t)
    });
  };
}
function _d(e) {
  var r;
  const t = e.getPreExpandedRowModel(), n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return !t.rows.length || n !== !0 && !Object.keys(n ?? {}).length || !e.options.paginateExpandedRows && !e.options.manualPagination ? t : Sd(t);
}
function Sd(e) {
  const t = [], n = (r) => {
    t.push(r), r.subRows.length && yr(r) && r.subRows.forEach(n);
  };
  return e.rows.forEach(n), {
    rows: t,
    flatRows: e.flatRows,
    rowsById: e.rowsById
  };
}
function bs(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = It(e[n]);
  return io(e, t);
}
function xd(e) {
  return Object.keys(e).map((t) => It(e[t]));
}
function Rd(e) {
  const t = (l, a) => {
    l.setOptions((c) => hs(c, bs(a)));
  }, n = yu(), r = io(e, { features: {
    coreReactivityFeature: n,
    ...It(e.features) ?? {}
  } }), o = io(bs(r), { mergeOptions: (l, a) => hs(l, a) }), s = sd(o), i = s;
  return zs() && ra(() => {
    var l;
    return (l = n.unmount) == null ? void 0 : l.call(n);
  }), Te(() => xd(r), () => {
    t(s, r);
  }, { immediate: !0 }), Te(() => {
    const l = It(e.state), a = It(e.atoms);
    if (!l) return [];
    const c = [];
    for (const u of Object.keys(i.initialState))
      !(u in l) || (a == null ? void 0 : a[u]) !== void 0 || c.push(l[u]);
    return c;
  }, (l) => {
    l.length > 0 && t(s, r);
  }, { immediate: !0 }), i.Subscribe = (l) => l.children(i.atoms), i;
}
function _r() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return function() {
    t.forEach(function(o) {
      return o();
    });
  };
}
function Cd(e) {
  if (Array.isArray(e)) return e;
}
function Md(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r, o, s, i, l = [], a = !0, c = !1;
    try {
      if (s = (n = n.call(e)).next, t !== 0) for (; !(a = (r = s.call(n)).done) && (l.push(r.value), l.length !== t); a = !0) ;
    } catch (u) {
      c = !0, o = u;
    } finally {
      try {
        if (!a && n.return != null && (i = n.return(), Object(i) !== i)) return;
      } finally {
        if (c) throw o;
      }
    }
    return l;
  }
}
function co(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function xl(e, t) {
  if (e) {
    if (typeof e == "string") return co(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? co(e, t) : void 0;
  }
}
function Ed() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Rl(e, t) {
  return Cd(e) || Md(e, t) || xl(e, t) || Ed();
}
var _s = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Dt = {}, Cn = {};
Object.defineProperty(Cn, "__esModule", { value: !0 });
Cn.bind = void 0;
function Id(e, t) {
  var n = t.type, r = t.listener, o = t.options;
  return e.addEventListener(n, r, o), function() {
    e.removeEventListener(n, r, o);
  };
}
Cn.bind = Id;
var Sr = {}, Vt = _s && _s.__assign || function() {
  return Vt = Object.assign || function(e) {
    for (var t, n = 1, r = arguments.length; n < r; n++) {
      t = arguments[n];
      for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    }
    return e;
  }, Vt.apply(this, arguments);
};
Object.defineProperty(Sr, "__esModule", { value: !0 });
Sr.bindAll = void 0;
var Od = Cn;
function Ss(e) {
  if (!(typeof e > "u"))
    return typeof e == "boolean" ? {
      capture: e
    } : e;
}
function Pd(e, t) {
  if (t == null)
    return e;
  var n = Vt(Vt({}, e), { options: Vt(Vt({}, Ss(t)), Ss(e.options)) });
  return n;
}
function Ad(e, t, n) {
  var r = t.map(function(o) {
    var s = Pd(o, n);
    return (0, Od.bind)(e, s);
  });
  return function() {
    r.forEach(function(s) {
      return s();
    });
  };
}
Sr.bindAll = Ad;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.bindAll = e.bind = void 0;
  var t = Cn;
  Object.defineProperty(e, "bind", { enumerable: !0, get: function() {
    return t.bind;
  } });
  var n = Sr;
  Object.defineProperty(e, "bindAll", { enumerable: !0, get: function() {
    return n.bindAll;
  } });
})(Dt);
var Cl = "data-pdnd-honey-pot";
function Ml(e) {
  return e instanceof Element && e.hasAttribute(Cl);
}
function El(e) {
  var t = document.elementsFromPoint(e.x, e.y), n = Rl(t, 2), r = n[0], o = n[1];
  return r ? Ml(r) ? o ?? null : r : null;
}
function wn(e) {
  "@babel/helpers - typeof";
  return wn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, wn(e);
}
function Td(e, t) {
  if (wn(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (wn(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Dd(e) {
  var t = Td(e, "string");
  return wn(t) == "symbol" ? t : t + "";
}
function Mn(e, t, n) {
  return (t = Dd(t)) in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var Fd = 2147483647, kd = {
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
function jt(e) {
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
var Br = jt(function() {
  return typeof HTMLElement < "u" && typeof HTMLElement.prototype.showPopover == "function";
});
function xs(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Rs(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? xs(Object(n), !0).forEach(function(r) {
      Mn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : xs(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
var bn = 2, Cs = bn / 2;
function jd(e) {
  return {
    x: Math.floor(e.x),
    y: Math.floor(e.y)
  };
}
function Hd(e) {
  return {
    x: e.x - Cs,
    y: e.y - Cs
  };
}
function Ld(e) {
  return {
    x: Math.max(e.x, 0),
    y: Math.max(e.y, 0)
  };
}
function Kd(e) {
  return {
    x: Math.min(e.x, window.innerWidth - bn),
    y: Math.min(e.y, window.innerHeight - bn)
  };
}
function Ms(e) {
  var t = e.client, n = Kd(Ld(Hd(jd(t))));
  return DOMRect.fromRect({
    x: n.x,
    y: n.y,
    width: bn,
    height: bn
  });
}
function Es(e) {
  var t = e.clientRect;
  return {
    left: "".concat(t.left, "px"),
    top: "".concat(t.top, "px"),
    width: "".concat(t.width, "px"),
    height: "".concat(t.height, "px")
  };
}
function $d(e) {
  var t = e.client, n = e.clientRect;
  return (
    // is within horizontal bounds
    t.x >= n.x && t.x <= n.x + n.width && // is within vertical bounds
    t.y >= n.y && t.y <= n.y + n.height
  );
}
function Vd(e) {
  var t = e.initial, n = document.createElement("div");
  n.setAttribute(Cl, "true"), Br() && n.setAttribute("popover", "manual");
  var r = Ms({
    client: t
  });
  Object.assign(n.style, Rs(Rs({
    position: "fixed"
  }, Br() ? (
    // needs to come first as it has 'inset: unset' which
    // needs to be overridden by our top / left values
    kd
  ) : {
    // Fallback: using maximum possible z-index so that this element
    // will always be on top of other positioned content.
    zIndex: Fd
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
  }, Es({
    clientRect: r
  }))), document.body.appendChild(n), Br() && n.showPopover();
  var o = Dt.bind(window, {
    type: "pointermove",
    listener: function(i) {
      var l = {
        x: i.clientX,
        y: i.clientY
      };
      r = Ms({
        client: l
      }), Object.assign(n.style, Es({
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
    if (o(), $d({
      client: l,
      clientRect: r
    })) {
      n.remove();
      return;
    }
    function a() {
      c(), n.remove();
    }
    var c = Dt.bindAll(window, [
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
function Nd() {
  var e = null;
  function t() {
    return e = null, Dt.bind(window, {
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
        var a = l.location.initial.input, c = e ?? {
          x: a.clientX,
          y: a.clientY
        };
        r = Vd({
          initial: c
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
function Bd(e) {
  if (Array.isArray(e)) return co(e);
}
function Wd(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function Ud() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Il(e) {
  return Bd(e) || Wd(e) || xl(e) || Ud();
}
var Gd = jt(function() {
  return navigator.userAgent.includes("Firefox");
}), Fo = jt(function() {
  var t = navigator, n = t.userAgent;
  return n.includes("AppleWebKit") && !n.includes("Chrome");
});
function qd(e) {
  return "nodeName" in e;
}
function zd(e) {
  return qd(e) && e.ownerDocument !== document;
}
var uo = {
  isLeavingWindow: Symbol("leaving"),
  isEnteringWindow: Symbol("entering")
};
(function() {
  if (typeof window > "u" || !Fo())
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
  Dt.bindAll(
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
        !n.isOverWindow && n.enterCount === 0 && (s[uo.isEnteringWindow] = !0), n.isOverWindow = !0, n.enterCount++;
      }
    }, {
      type: "dragleave",
      listener: function(s) {
        n.enterCount--, n.isOverWindow && n.enterCount === 0 && (s[uo.isLeavingWindow] = !0, n.isOverWindow = !1);
      }
    }],
    // using `capture: true` so that adding event listeners
    // in bubble phase will have the correct symbols
    {
      capture: !0
    }
  );
})();
function Yd(e) {
  var t = e.dragLeave;
  return Fo() ? t.hasOwnProperty(uo.isLeavingWindow) : !1;
}
function Xd(e) {
  var t = e.dragLeave, n = t.type, r = t.relatedTarget;
  return n !== "dragleave" ? !1 : Fo() ? Yd({
    dragLeave: t
  }) : r == null ? !0 : Gd() ? zd(r) : r instanceof HTMLIFrameElement;
}
function Jd(e) {
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
function dn(e) {
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
var Zd = function(t) {
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
}, Wr = Zd(function(e) {
  return e();
}), Kn = /* @__PURE__ */ function() {
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
function Qd(e) {
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
      var c = a.nativeSetDragImage, u = {
        current: n,
        previous: o,
        initial: n
      };
      s({
        eventName: "onGenerateDragPreview",
        payload: {
          source: t,
          location: u,
          nativeSetDragImage: c
        }
      }), Kn.schedule(function() {
        s({
          eventName: "onDragStart",
          payload: {
            source: t,
            location: u
          }
        });
      });
    },
    dragUpdate: function(a) {
      var c = a.current;
      Kn.flush(), Wr.cancel(), s({
        eventName: "onDropTargetChange",
        payload: {
          source: t,
          location: {
            initial: n,
            previous: o,
            current: c
          }
        }
      });
    },
    drag: function(a) {
      var c = a.current;
      Wr(function() {
        Kn.flush();
        var u = {
          initial: n,
          previous: o,
          current: c
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
    drop: function(a) {
      var c = a.current, u = a.updatedSourcePayload;
      Kn.flush(), Wr.cancel(), s({
        eventName: "onDrop",
        payload: {
          source: u ?? t,
          location: {
            current: c,
            previous: o,
            initial: n
          }
        }
      });
    }
  };
  return i;
}
var fo = {
  isActive: !1
};
function Ol() {
  return !fo.isActive;
}
function ep(e) {
  return e.dataTransfer ? e.dataTransfer.setDragImage.bind(e.dataTransfer) : null;
}
function tp(e) {
  var t = e.current, n = e.next;
  if (t.length !== n.length)
    return !0;
  for (var r = 0; r < t.length; r++)
    if (t[r].element !== n[r].element)
      return !0;
  return !1;
}
function np(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = e.dispatchEvent;
  if (!Ol())
    return;
  var s = rp({
    event: t,
    dragType: n,
    getDropTargetsOver: r
  });
  fo.isActive = !0;
  var i = {
    current: s
  };
  Ur({
    event: t,
    current: s.dropTargets
  });
  var l = Qd({
    source: n.payload,
    dispatchEvent: o,
    initial: s
  });
  function a(w) {
    var I = tp({
      current: i.current.dropTargets,
      next: w.dropTargets
    });
    i.current = w, I && l.dragUpdate({
      current: i.current
    });
  }
  function c(w) {
    var I = dn(w), C = Ml(w.target) ? El({
      x: I.clientX,
      y: I.clientY
    }) : w.target, F = r({
      target: C,
      input: I,
      source: n.payload,
      current: i.current.dropTargets
    });
    F.length && (w.preventDefault(), Ur({
      event: w,
      current: F
    })), a({
      dropTargets: F,
      input: I
    });
  }
  function u() {
    i.current.dropTargets.length && a({
      dropTargets: [],
      input: i.current.input
    }), l.drop({
      current: i.current,
      updatedSourcePayload: null
    }), p();
  }
  function p() {
    fo.isActive = !1, v();
  }
  var v = Dt.bindAll(
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
        c(I), l.drag({
          current: i.current
        });
      }
    }, {
      type: "dragenter",
      listener: c
    }, {
      type: "dragleave",
      listener: function(I) {
        Xd({
          dragLeave: I
        }) && (a({
          input: i.current.input,
          dropTargets: []
        }), n.startedFrom === "external" && u());
      }
    }, {
      // A "drop" can only happen if the browser allowed the drop
      type: "drop",
      listener: function(I) {
        if (i.current = {
          dropTargets: i.current.dropTargets,
          input: dn(I)
        }, !i.current.dropTargets.length) {
          u();
          return;
        }
        I.preventDefault(), Ur({
          event: I,
          current: i.current.dropTargets
        }), l.drop({
          current: i.current,
          // When dropping something native, we need to extract the latest
          // `.items` from the "drop" event as it is now accessible
          updatedSourcePayload: n.type === "external" ? n.getDropPayload(I) : null
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
      listener: function(I) {
        i.current = {
          dropTargets: i.current.dropTargets,
          input: dn(I)
        }, u();
      }
    }].concat(Il(Jd({
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
    nativeSetDragImage: ep(t)
  });
}
function Ur(e) {
  var t, n = e.event, r = e.current, o = (t = r[0]) === null || t === void 0 ? void 0 : t.dropEffect;
  o != null && n.dataTransfer && (n.dataTransfer.dropEffect = o);
}
function rp(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = dn(t);
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
var Is = {
  canStart: Ol,
  start: np
}, po = /* @__PURE__ */ new Map();
function op(e) {
  var t = e.typeKey, n = e.mount, r = po.get(t);
  if (r)
    return r.usageCount++, r;
  var o = {
    typeKey: t,
    unmount: n(),
    usageCount: 1
  };
  return po.set(t, o), o;
}
function sp(e) {
  var t = op(e);
  return function() {
    t.usageCount--, !(t.usageCount > 0) && (t.unmount(), po.delete(e.typeKey));
  };
}
function Pl(e, t) {
  var n = t.attribute, r = t.value;
  return e.setAttribute(n, r), function() {
    return e.removeAttribute(n);
  };
}
function Os(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function ht(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Os(Object(n), !0).forEach(function(r) {
      Mn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Os(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Gr(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = ip(e)) || t) {
      n && (e = n);
      var r = 0, o = function() {
      };
      return { s: o, n: function() {
        return r >= e.length ? { done: !0 } : { done: !1, value: e[r++] };
      }, e: function(c) {
        throw c;
      }, f: o };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var s, i = !0, l = !1;
  return { s: function() {
    n = n.call(e);
  }, n: function() {
    var c = n.next();
    return i = c.done, c;
  }, e: function(c) {
    l = !0, s = c;
  }, f: function() {
    try {
      i || n.return == null || n.return();
    } finally {
      if (l) throw s;
    }
  } };
}
function ip(e, t) {
  if (e) {
    if (typeof e == "string") return Ps(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Ps(e, t) : void 0;
  }
}
function Ps(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function qr(e) {
  return e.slice(0).reverse();
}
function lp(e) {
  var t = e.typeKey, n = e.defaultDropEffect, r = /* @__PURE__ */ new WeakMap(), o = "data-drop-target-for-".concat(t), s = "[".concat(o, "]");
  function i(w) {
    return r.set(w.element, w), function() {
      return r.delete(w.element);
    };
  }
  function l(w) {
    var I = _r(Pl(w.element, {
      attribute: o,
      value: "true"
    }), i(w));
    return jt(I);
  }
  function a(w) {
    var I, C, F, L, M = w.source, k = w.target, P = w.input, B = w.result, W = B === void 0 ? [] : B;
    if (k == null)
      return W;
    if (!(k instanceof Element))
      return k instanceof Node ? a({
        source: M,
        target: k.parentElement,
        input: P,
        result: W
      }) : W;
    var G = k.closest(s);
    if (G == null)
      return W;
    var $ = r.get(G);
    if ($ == null)
      return W;
    var D = {
      input: P,
      source: M,
      element: $.element
    };
    if ($.canDrop && !$.canDrop(D))
      return a({
        source: M,
        target: $.element.parentElement,
        input: P,
        result: W
      });
    var z = (I = (C = $.getData) === null || C === void 0 ? void 0 : C.call($, D)) !== null && I !== void 0 ? I : {}, ae = (F = (L = $.getDropEffect) === null || L === void 0 ? void 0 : L.call($, D)) !== null && F !== void 0 ? F : n, oe = {
      data: z,
      element: $.element,
      dropEffect: ae,
      // we are collecting _actual_ drop targets, so these are
      // being applied _not_ due to stickiness
      isActiveDueToStickiness: !1
    };
    return a({
      source: M,
      target: $.element.parentElement,
      input: P,
      // Using bubble ordering. Same ordering as `event.getPath()`
      result: [].concat(Il(W), [oe])
    });
  }
  function c(w) {
    var I = w.eventName, C = w.payload, F = Gr(C.location.current.dropTargets), L;
    try {
      for (F.s(); !(L = F.n()).done; ) {
        var M, k = L.value, P = r.get(k.element), B = ht(ht({}, C), {}, {
          self: k
        });
        P == null || (M = P[I]) === null || M === void 0 || M.call(
          P,
          // I cannot seem to get the types right here.
          // TS doesn't seem to like that one event can need `nativeSetDragImage`
          // @ts-expect-error
          B
        );
      }
    } catch (W) {
      F.e(W);
    } finally {
      F.f();
    }
  }
  var u = {
    onGenerateDragPreview: c,
    onDrag: c,
    onDragStart: c,
    onDrop: c,
    onDropTargetChange: function(I) {
      var C = I.payload, F = new Set(C.location.current.dropTargets.map(function(X) {
        return X.element;
      })), L = /* @__PURE__ */ new Set(), M = Gr(C.location.previous.dropTargets), k;
      try {
        for (M.s(); !(k = M.n()).done; ) {
          var P, B = k.value;
          L.add(B.element);
          var W = r.get(B.element), G = F.has(B.element), $ = ht(ht({}, C), {}, {
            self: B
          });
          if (W == null || (P = W.onDropTargetChange) === null || P === void 0 || P.call(W, $), !G) {
            var D;
            W == null || (D = W.onDragLeave) === null || D === void 0 || D.call(W, $);
          }
        }
      } catch (X) {
        M.e(X);
      } finally {
        M.f();
      }
      var z = Gr(C.location.current.dropTargets), ae;
      try {
        for (z.s(); !(ae = z.n()).done; ) {
          var oe, he, Se = ae.value;
          if (!L.has(Se.element)) {
            var ye = ht(ht({}, C), {}, {
              self: Se
            }), se = r.get(Se.element);
            se == null || (oe = se.onDropTargetChange) === null || oe === void 0 || oe.call(se, ye), se == null || (he = se.onDragEnter) === null || he === void 0 || he.call(se, ye);
          }
        }
      } catch (X) {
        z.e(X);
      } finally {
        z.f();
      }
    }
  };
  function p(w) {
    u[w.eventName](w);
  }
  function v(w) {
    var I = w.source, C = w.target, F = w.input, L = w.current, M = a({
      source: I,
      target: C,
      input: F
    });
    if (M.length >= L.length)
      return M;
    for (var k = qr(L), P = qr(M), B = [], W = 0; W < k.length; W++) {
      var G, $ = k[W], D = P[W];
      if (D != null) {
        B.push(D);
        continue;
      }
      var z = B[W - 1], ae = k[W - 1];
      if ((z == null ? void 0 : z.element) !== (ae == null ? void 0 : ae.element))
        break;
      var oe = r.get($.element);
      if (!oe)
        break;
      var he = {
        input: F,
        source: I,
        element: oe.element
      };
      if (oe.canDrop && !oe.canDrop(he) || !((G = oe.getIsSticky) !== null && G !== void 0 && G.call(oe, he)))
        break;
      B.push(ht(ht({}, $), {}, {
        // making it clear to consumers this drop target is active due to stickiness
        isActiveDueToStickiness: !0
      }));
    }
    return qr(B);
  }
  return {
    dropTargetForConsumers: l,
    getIsOver: v,
    dispatchEvent: p
  };
}
function ap(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = cp(e)) || t) {
      n && (e = n);
      var r = 0, o = function() {
      };
      return { s: o, n: function() {
        return r >= e.length ? { done: !0 } : { done: !1, value: e[r++] };
      }, e: function(c) {
        throw c;
      }, f: o };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var s, i = !0, l = !1;
  return { s: function() {
    n = n.call(e);
  }, n: function() {
    var c = n.next();
    return i = c.done, c;
  }, e: function(c) {
    l = !0, s = c;
  }, f: function() {
    try {
      i || n.return == null || n.return();
    } finally {
      if (l) throw s;
    }
  } };
}
function cp(e, t) {
  if (e) {
    if (typeof e == "string") return As(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? As(e, t) : void 0;
  }
}
function As(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Ts(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function up(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ts(Object(n), !0).forEach(function(r) {
      Mn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ts(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function fp() {
  var e = /* @__PURE__ */ new Set(), t = null;
  function n(s) {
    t && (!s.canMonitor || s.canMonitor(t.canMonitorArgs)) && t.active.add(s);
  }
  function r(s) {
    var i = up({}, s);
    e.add(i), n(i);
    function l() {
      e.delete(i), t && t.active.delete(i);
    }
    return jt(l);
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
      var a = ap(e), c;
      try {
        for (a.s(); !(c = a.n()).done; ) {
          var u = c.value;
          n(u);
        }
      } catch (F) {
        a.e(F);
      } finally {
        a.f();
      }
    }
    if (t) {
      for (var p = Array.from(t.active), v = 0, w = p; v < w.length; v++) {
        var I = w[v];
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
function dp(e) {
  var t = e.typeKey, n = e.mount, r = e.dispatchEventToSource, o = e.onPostDispatch, s = e.defaultDropEffect, i = fp(), l = lp({
    typeKey: t,
    defaultDropEffect: s
  });
  function a(p) {
    r == null || r(p), l.dispatchEvent(p), i.dispatchEvent(p), o == null || o(p);
  }
  function c(p) {
    var v = p.event, w = p.dragType;
    Is.start({
      event: v,
      dragType: w,
      getDropTargetsOver: l.getIsOver,
      dispatchEvent: a
    });
  }
  function u() {
    function p() {
      var v = {
        canStart: Is.canStart,
        start: c
      };
      return n(v);
    }
    return sp({
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
var pp = jt(function() {
  return navigator.userAgent.toLocaleLowerCase().includes("android");
}), gp = "pdnd:android-fallback", Ds = "text/plain", hp = "text/uri-list", mp = "application/vnd.pdnd", nr = /* @__PURE__ */ new WeakMap();
function vp(e) {
  return nr.set(e.element, e), function() {
    nr.delete(e.element);
  };
}
var Fs = Nd(), Al = dp({
  typeKey: "element",
  defaultDropEffect: "move",
  mount: function(t) {
    return _r(Fs.bindEvents(), Dt.bind(document, {
      type: "dragstart",
      listener: function(r) {
        var o, s, i, l, a, c;
        if (t.canStart(r) && !r.defaultPrevented && r.dataTransfer) {
          var u = r.target;
          if (u instanceof HTMLElement) {
            var p = nr.get(u);
            if (p) {
              var v = dn(r), w = {
                element: p.element,
                dragHandle: (o = p.dragHandle) !== null && o !== void 0 ? o : null,
                input: v
              };
              if (p.canDrag && !p.canDrag(w)) {
                r.preventDefault();
                return;
              }
              if (p.dragHandle) {
                var I = El({
                  x: v.clientX,
                  y: v.clientY
                });
                if (!p.dragHandle.contains(I)) {
                  r.preventDefault();
                  return;
                }
              }
              var C = (s = (i = p.getInitialDataForExternal) === null || i === void 0 ? void 0 : i.call(p, w)) !== null && s !== void 0 ? s : null;
              if (C)
                for (var F = 0, L = Object.entries(C); F < L.length; F++) {
                  var M = Rl(L[F], 2), k = M[0], P = M[1];
                  r.dataTransfer.setData(k, P ?? "");
                }
              pp() && !r.dataTransfer.types.includes(Ds) && !r.dataTransfer.types.includes(hp) && r.dataTransfer.setData(Ds, gp), r.dataTransfer.setData(mp, "");
              var B = {
                element: p.element,
                dragHandle: (l = p.dragHandle) !== null && l !== void 0 ? l : null,
                data: (a = (c = p.getInitialData) === null || c === void 0 ? void 0 : c.call(p, w)) !== null && a !== void 0 ? a : {}
              }, W = {
                type: "element",
                payload: B,
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
    (n = nr.get(s.source.element)) === null || n === void 0 || (r = n[o]) === null || r === void 0 || r.call(
      n,
      // I cannot seem to get the types right here.
      // TS doesn't seem to like that one event can need `nativeSetDragImage`
      // @ts-expect-error
      s
    );
  },
  onPostDispatch: Fs.getOnPostDispatch()
}), yp = Al.dropTarget;
function wp(e) {
  var t = _r(
    // making the draggable register the adapter rather than drop targets
    // this is because you *must* have a draggable element to start a drag
    // but you _might_ not have any drop targets immediately
    // (You might create drop targets async)
    Al.registerUsage(),
    vp(e),
    Pl(e.element, {
      attribute: "draggable",
      value: "true"
    })
  );
  return jt(t);
}
function bp(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
    if (t.indexOf(r) !== -1) continue;
    n[r] = e[r];
  }
  return n;
}
function _p(e, t) {
  if (e == null) return {};
  var n, r, o = bp(e, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    for (r = 0; r < s.length; r++) n = s[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (o[n] = e[n]);
  }
  return o;
}
function Tl(e, t) {
  var n = Object.keys(e), r = Object.keys(t);
  return n.length !== r.length ? !1 : n.every(function(o) {
    return Object.is(e[o], t[o]);
  });
}
function Sp() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Tl, t = null;
  return function(n) {
    return t && e(t.value, n) || (t = {
      value: n
    }), t.value;
  };
}
var xp = ["block"];
function ks(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function js(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ks(Object(n), !0).forEach(function(r) {
      Mn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ks(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Rp(e) {
  return {
    x: (e.right + e.left) / 2,
    y: (e.bottom + e.top) / 2
  };
}
function zr(e) {
  var t = e.client, n = e.borderBox, r = n.height / 4;
  return t.y <= n.top + r ? "reorder-above" : t.y >= n.bottom - r ? "reorder-below" : "make-child";
}
function Cp(e) {
  var t = e.element, n = e.input, r = e.currentLevel, o = e.indentPerLevel, s = e.mode, i = {
    x: n.clientX,
    y: n.clientY
  }, l = t.getBoundingClientRect();
  if (s === "standard") {
    var a = zr({
      borderBox: l,
      client: i
    });
    return {
      type: a,
      indentPerLevel: o,
      currentLevel: r
    };
  }
  var c = Rp(l);
  if (s === "expanded") {
    var u = zr({
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
    if (i.y < c.y)
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
    type: zr({
      borderBox: l,
      client: i
    }),
    indentPerLevel: o,
    currentLevel: r
  };
}
function Dl(e, t) {
  return e.type !== t.type ? !1 : e.type === "instruction-blocked" && t.type === "instruction-blocked" ? Dl(e.desired, t.desired) : Tl(e, t);
}
var Mp = Sp(Dl);
function Ep(e) {
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
function Ip(e, t) {
  var n = t.block, r = _p(t, xp), o = Cp(r), s = Ep({
    desired: o,
    block: n
  }), i = Mp(s);
  return js(js({}, e), {}, Mn({}, Fl, i));
}
function Hs(e) {
  var t;
  return (t = e[Fl]) !== null && t !== void 0 ? t : null;
}
var Fl = Symbol("tree-item-instruction");
const Op = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/><path fill="#42a5f5" d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5z"/></svg>', Pp = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m8.668 6h3.6641l-3.6641-3.668v3.668m-4.668-4.668h5.332l4 4v8c0 0.73828-0.59375 1.3359-1.332 1.3359h-8c-0.73828 0-1.332-0.59766-1.332-1.3359v-10.664c0-0.74219 0.59375-1.3359 1.332-1.3359m3.332 1.3359h-3.332v10.664h8v-6h-4.668z" fill="#90a4ae" /></svg>', Ap = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m6.922 3.768-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232" fill="#90a4ae" /></svg>', Tp = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.483 6H4.721a1 1 0 0 0-.949.684L2 12V5h12a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232l-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h11l2.403-5.606A1 1 0 0 0 14.483 6" fill="#90a4ae" /></svg>', Dp = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#26a69a" d="M8.5 6h4l-4-4zM3.875 1H9.5l4 4v8.6c0 .773-.616 1.4-1.375 1.4h-8.25c-.76 0-1.375-.627-1.375-1.4V2.4c0-.777.612-1.4 1.375-1.4M4 13.6h8V8l-2.625 2.8L8 9.4zm1.25-7.7c-.76 0-1.375.627-1.375 1.4s.616 1.4 1.375 1.4c.76 0 1.375-.627 1.375-1.4S6.009 5.9 5.25 5.9"/></svg>', Fp = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#42a5f5" d="m14 10-4 3.5L6 10H4v12h4v-6l2 2 2-2v6h4V10zm12 6v-6h-4v6h-4l6 8 6-8z"/></svg>', kp = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ef5350" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m4.93 10.44c.41.9.93 1.64 1.53 2.15l.41.32c-.87.16-2.07.44-3.34.93l-.11.04.5-1.04c.45-.87.78-1.66 1.01-2.4m6.48 3.81c.18-.18.27-.41.28-.66.03-.2-.02-.39-.12-.55-.29-.47-1.04-.69-2.28-.69l-1.29.07-.87-.58c-.63-.52-1.2-1.43-1.6-2.56l.04-.14c.33-1.33.64-2.94-.02-3.6a.85.85 0 0 0-.61-.24h-.24c-.37 0-.7.39-.79.77-.37 1.33-.15 2.06.22 3.27v.01c-.25.88-.57 1.9-1.08 2.93l-.96 1.8-.89.49c-1.2.75-1.77 1.59-1.88 2.12-.04.19-.02.36.05.54l.03.05.48.31.44.11c.81 0 1.73-.95 2.97-3.07l.18-.07c1.03-.33 2.31-.56 4.03-.75 1.03.51 2.24.74 3 .74.44 0 .74-.11.91-.3m-.41-.71.09.11c-.01.1-.04.11-.09.13h-.04l-.19.02c-.46 0-1.17-.19-1.9-.51.09-.1.13-.1.23-.1 1.4 0 1.8.25 1.9.35M7.83 17c-.65 1.19-1.24 1.85-1.69 2 .05-.38.5-1.04 1.21-1.69zm3.02-6.91c-.23-.9-.24-1.63-.07-2.05l.07-.12.15.05c.17.24.19.56.09 1.1l-.03.16-.16.82z"/></svg>', jp = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#0288d1" d="M9.86 2A2.86 2.86 0 0 0 7 4.86v1.68h4.29c.39 0 .71.57.71.96H4.86A2.86 2.86 0 0 0 2 10.36v3.781a2.86 2.86 0 0 0 2.86 2.86h1.18v-2.68a2.85 2.85 0 0 1 2.85-2.86h5.25c1.58 0 2.86-1.271 2.86-2.851V4.86A2.86 2.86 0 0 0 14.14 2zm-.72 1.61c.4 0 .72.12.72.71s-.32.891-.72.891c-.39 0-.71-.3-.71-.89s.32-.711.71-.711"/><path fill="#fdd835" d="M17.959 7v2.68a2.85 2.85 0 0 1-2.85 2.859H9.86A2.85 2.85 0 0 0 7 15.389v3.75a2.86 2.86 0 0 0 2.86 2.86h4.28A2.86 2.86 0 0 0 17 19.14v-1.68h-4.291c-.39 0-.709-.57-.709-.96h7.14A2.86 2.86 0 0 0 22 13.64V9.86A2.86 2.86 0 0 0 19.14 7zM8.32 11.513l-.004.004.038-.004zm6.54 7.276c.39 0 .71.3.71.89a.71.71 0 0 1-.71.71c-.4 0-.72-.12-.72-.71s.32-.89.72-.89"/></svg>', Hp = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Lp = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Kp = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, $p = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Vp = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Np = ["aria-label"], Bp = {
  key: 0,
  class: "pnl-tst-tsep",
  "aria-hidden": "true"
}, Wp = {
  key: 1,
  class: "pnl-tst-search"
}, Up = ["innerHTML"], Gp = ["value", "aria-label", "placeholder"], qp = ["aria-label", "aria-keyshortcuts", "aria-disabled", "title", "tabindex", "onClick", "onFocus"], zp = ["innerHTML"], Yp = {
  key: 1,
  class: "pnl-tst-empty"
}, Xp = ["aria-label", "aria-colcount", "aria-rowcount"], Jp = {
  key: 0,
  class: "pnl-tst-head",
  role: "rowgroup"
}, Zp = {
  class: "pnl-tst-hrow",
  role: "row",
  "aria-rowindex": 1
}, Qp = ["aria-colindex"], eg = {
  class: "pnl-tst-body",
  role: "rowgroup"
}, tg = ["aria-level", "aria-posinset", "aria-setsize", "aria-rowindex", "aria-expanded", "aria-selected", "tabindex", "onClick", "onFocus"], ng = ["aria-colindex"], rg = ["onClick"], og = {
  key: 1,
  class: "pnl-tst-twisty pnl-tst-twisty--leaf",
  "aria-hidden": "true"
}, sg = ["checked", ".indeterminate", "aria-label", "onClick"], ig = ["innerHTML"], lg = { class: "pnl-tst-value" }, ag = "title", $n = "search", Ls = "|", nn = "pnl-tst-row", cg = 500, ug = {
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
    setFilterText: { type: Function, required: !0 }
  },
  setup(e) {
    const t = e, n = {
      rowExpandingFeature: id,
      rowSelectionFeature: wd,
      coreRowModel: fl(),
      expandedRowModel: bd()
    }, r = te(() => (t.state.columns || []).length > 0), o = te(() => {
      const d = t.state.columns || [];
      return d.length === 0 ? [{ id: ag, header: "", accessorFn: (h) => h.title }] : d.map((h) => {
        const m = h.field ?? h.id;
        return {
          id: h.id,
          header: h.header ?? h.id,
          accessorFn: (E) => E[m],
          meta: { width: h.width }
        };
      });
    }), s = /* @__PURE__ */ Ne(i(t.state.expandedKeys));
    function i(d) {
      const h = {};
      for (const m of d || []) h[m] = !0;
      return h;
    }
    function l(d) {
      return d === !0 ? F.getCoreRowModel().flatRows.filter((h) => h.subRows.length > 0).map((h) => h.id).sort() : Object.keys(d).filter((h) => d[h]).sort();
    }
    const a = {
      document: Op,
      file: Pp,
      folder: Ap,
      "folder-open": Tp,
      image: Dp,
      markdown: Fp,
      pdf: kp,
      python: jp
    };
    function c(d) {
      const h = d.original.icon;
      if (!h) return null;
      const m = { ...a, ...t.state.icons || {} };
      return De(d) && m[`${h}-open`] ? m[`${h}-open`] : m[h] ?? null;
    }
    function u(d, h) {
      return d.length !== h.length ? !1 : d.every((m, E) => m === h[E]);
    }
    const p = te(() => t.state.options.select_mode ?? "none"), v = te(() => p.value !== "none"), w = te(() => p.value === "hierarchy"), I = te(
      () => v.value && t.state.options.show_checkboxes !== !1
    ), C = /* @__PURE__ */ Ne(i(t.state.selectedKeys)), F = Rd({
      features: n,
      data: te(() => t.state.source || []),
      columns: o,
      getRowId: (d) => d.key,
      getSubRows: (d) => d.children,
      // TanStack resets `expanded` whenever `data` changes. Python rewrites the
      // whole tree after every move, so leaving that on would collapse the tree on
      // each drop and push an empty `expanded_keys` back. Expansion is owned here.
      autoResetExpanded: !1,
      enableRowSelection: v,
      enableMultiRowSelection: te(() => p.value !== "single"),
      enableSubRowSelection: w,
      state: te(() => ({ expanded: s.value, rowSelection: C.value })),
      onExpandedChange: (d) => {
        s.value = typeof d == "function" ? d(s.value) : d;
      },
      onRowSelectionChange: (d) => {
        C.value = typeof d == "function" ? d(C.value) : d;
      }
    });
    function L(d) {
      if (d.getIsSelected()) return "all";
      if (!w.value || d.subRows.length === 0) return "none";
      const h = d.subRows.map(L);
      return h.every((m) => m === "all") ? "all" : h.some((m) => m !== "none") ? "some" : "none";
    }
    Te(() => l(C.value), t.setSelectedKeys, { flush: "post" }), Te(() => l(s.value), t.setExpandedKeys, { flush: "post" }), Te(
      () => t.state.expandedKeys,
      (d) => {
        u(l(s.value), [...d || []].sort()) || (s.value = i(d));
      }
    ), Te(
      () => t.state.selectedKeys,
      (d) => {
        u(l(C.value), [...d || []].sort()) || (C.value = i(d));
      }
    ), Te(
      () => [t.state.options.expand_all, t.state.source],
      ([d]) => {
        d && F.toggleAllRowsExpanded(!0);
      },
      { immediate: !0 }
    );
    const M = te(() => (t.state.filterText ?? "").trim().toLowerCase()), k = te(() => M.value.length > 0), P = /* @__PURE__ */ Ne(t.state.filterText ?? "");
    Te(
      () => t.state.filterText,
      (d) => {
        P.value = d ?? "";
      }
    );
    function B(d) {
      P.value = d, t.setFilterText(d);
    }
    function W(d) {
      return d.getAllCells().some((h) => String(h.getValue() ?? "").toLowerCase().includes(M.value));
    }
    const G = te(() => {
      if (!k.value) return F.getRowModel().rows;
      const d = /* @__PURE__ */ new Set();
      for (const h of F.getCoreRowModel().flatRows)
        if (W(h)) {
          d.add(h.id);
          for (let m = h.getParentRow(); m; m = m.getParentRow()) d.add(m.id);
        }
      return F.getCoreRowModel().flatRows.filter((h) => d.has(h.id));
    }), $ = te(() => {
      var d;
      return ((d = F.getHeaderGroups()[0]) == null ? void 0 : d.headers) ?? [];
    }), D = te(() => t.state.options.indent_px ?? 16), z = te(() => t.state.options.aria_label ?? "Tree table"), ae = te(() => k.value ? "No matches" : "No data"), oe = te(() => r.value ? 2 : 1), he = te(() => G.value.length + (r.value ? 1 : 0)), Se = te(() => {
      const d = /* @__PURE__ */ new Map();
      for (const h of G.value) {
        const m = h.parentId ?? "", E = d.get(m) ?? [];
        E.push(h.id), d.set(m, E);
      }
      return d;
    });
    function ye(d) {
      return Se.value.get(d.parentId ?? "") ?? [];
    }
    function se(d) {
      return ye(d).indexOf(d.id) + 1;
    }
    function X(d) {
      return ye(d).length;
    }
    function Y(d) {
      return k.value ? (Se.value.get(d.id) ?? []).length > 0 : d.getCanExpand();
    }
    function De(d) {
      return k.value ? Y(d) : d.getIsExpanded();
    }
    function dt(d) {
      var m;
      const h = (m = d.meta) == null ? void 0 : m.width;
      return h ? { flex: `0 0 ${h}px` } : { flex: "1 1 0" };
    }
    function Ze(d, h) {
      return { ...dt(h), paddingInlineStart: `${d.depth * D.value}px` };
    }
    const ge = /* @__PURE__ */ Ne(null), bt = /* @__PURE__ */ new Map();
    function xr(d, h) {
      h ? bt.set(d, h) : bt.delete(d);
    }
    const Jt = te(() => {
      const d = G.value;
      return d.length === 0 ? null : d.some((h) => h.id === ge.value) ? ge.value : d[0].id;
    });
    function je(d) {
      d != null && (ge.value = d, eo(() => {
        var h;
        return (h = bt.get(d)) == null ? void 0 : h.focus();
      }));
    }
    function pt(d) {
      const h = G.value;
      h.length !== 0 && je(h[Math.max(0, Math.min(d, h.length - 1))].id);
    }
    function Ht(d, h) {
      const m = G.value;
      if (m.length === 0) return;
      const E = m[Math.max(0, Math.min(d, m.length - 1))], V = (h == null ? void 0 : h.shiftKey) && v.value && p.value !== "single";
      V && Fe.value === null && (Fe.value = Jt.value), je(E.id), V && f(E, !1);
    }
    function En(d) {
      const h = G.value;
      if (h.length === 0) return;
      const m = Math.max(
        0,
        h.findIndex((V) => V.id === Jt.value)
      ), E = h[m];
      if (d.ctrlKey || d.metaKey) {
        const V = { a: "select-all", f: $n }[d.key.toLowerCase()];
        if (V && q(V)) {
          d.preventDefault(), ce(V);
          return;
        }
      }
      if (d.key === "Escape" && q("clear-selection")) {
        d.preventDefault(), ce("clear-selection");
        return;
      }
      switch (d.key) {
        case "ArrowDown":
          d.preventDefault(), Ht(m + 1, d);
          break;
        case "ArrowUp":
          d.preventDefault(), Ht(m - 1, d);
          break;
        case "ArrowRight":
          if (d.preventDefault(), !Y(E)) break;
          De(E) ? pt(m + 1) : (E.toggleExpanded(!0), je(E.id));
          break;
        case "ArrowLeft":
          d.preventDefault(), !k.value && E.getCanExpand() && E.getIsExpanded() ? (E.toggleExpanded(!1), je(E.id)) : E.parentId && je(E.parentId);
          break;
        case "Home":
          d.preventDefault(), pt(0);
          break;
        case "End":
          d.preventDefault(), pt(h.length - 1);
          break;
        case "Enter":
          d.preventDefault(), t.emitEvent("activate", { key: E.id });
          break;
        case " ":
          if (!v.value) break;
          d.preventDefault(), A(E);
          break;
      }
    }
    const Fe = /* @__PURE__ */ Ne(null);
    function In(d) {
      Fe.value = d.id, C.value = {}, d.toggleSelected(!0, { selectChildren: !1 });
    }
    function f(d, h) {
      const m = G.value, E = m.findIndex((_t) => _t.id === Fe.value), V = m.findIndex((_t) => _t.id === d.id);
      if (V === -1) return;
      if (E === -1) {
        In(d);
        return;
      }
      h || (C.value = {});
      const [et, Pr] = E <= V ? [E, V] : [V, E];
      for (let _t = et; _t <= Pr; _t += 1)
        m[_t].toggleSelected(!0, { selectChildren: !1 });
    }
    function g(d, h) {
      ge.value = d.id, v.value && p.value !== "single" ? h != null && h.shiftKey ? f(d, h.ctrlKey || h.metaKey) : h != null && h.ctrlKey || h != null && h.metaKey ? (Fe.value = d.id, b(d)) : In(d) : v.value && In(d), t.emitEvent("activate", { key: d.id });
    }
    function y(d) {
      ge.value = d.id, !k.value && d.toggleExpanded();
    }
    function x(d) {
      return L(d) === "all";
    }
    function S(d) {
      return L(d) === "some";
    }
    function b(d) {
      ge.value = d.id, d.toggleSelected(void 0, { selectChildren: !1 });
    }
    function A(d) {
      ge.value = d.id, d.toggleSelected(!x(d), {
        selectChildren: w.value,
        deselectParents: w.value
      });
    }
    function O(d) {
      A(d), je(d.id);
    }
    const R = {
      "expand-all": { icon: Hp, label: "Expand all" },
      "collapse-all": { icon: Lp, label: "Collapse all" },
      "select-all": { icon: Vp, label: "Select all", keys: "Control+A" },
      "clear-selection": { icon: $p, label: "Clear selection", keys: "Escape" }
    }, _ = [
      "expand-all",
      "collapse-all",
      Ls,
      "select-all",
      "clear-selection",
      $n
    ], j = te(() => {
      const d = t.state.options.toolbar;
      return (d === !0 ? _ : Array.isArray(d) ? d : []).filter((m) => m === Ls || m === $n || m in R);
    }), T = te(() => j.value.length > 0), H = te(() => t.state.options.toolbar_label ?? "Tree actions"), K = te(() => t.state.options.search_label ?? "Search");
    function q(d) {
      return j.value.includes(d);
    }
    function J(d) {
      switch (d) {
        case "expand-all":
        case "collapse-all":
          return G.value.length > 0 && !k.value;
        case "select-all":
          return G.value.length > 0 && v.value && p.value !== "single";
        case "clear-selection":
          return v.value && l(C.value).length > 0;
        default:
          return !0;
      }
    }
    function Z(d) {
      const h = R[d];
      return h.keys ? `${h.label} (${h.keys.replace("Control", "Ctrl")})` : h.label;
    }
    function ce(d) {
      var h, m, E;
      if (!(!q(d) || !J(d)))
        switch (d) {
          case "expand-all":
            F.toggleAllRowsExpanded(!0);
            break;
          case "collapse-all":
            F.toggleAllRowsExpanded(!1);
            break;
          case "select-all":
            C.value = Object.fromEntries(G.value.map((V) => [V.id, !0])), Fe.value = ((h = G.value[0]) == null ? void 0 : h.id) ?? null;
            break;
          case "clear-selection":
            C.value = {}, Fe.value = null;
            break;
          case $n:
            (m = pe.value) == null || m.focus(), (E = pe.value) == null || E.select();
            break;
        }
    }
    const pe = /* @__PURE__ */ Ne(null), Pe = te(() => j.value.filter((d) => d in R)), xe = /* @__PURE__ */ Ne(null), Qe = /* @__PURE__ */ new Map(), Zt = te(() => {
      const d = Pe.value;
      return d.length === 0 ? null : d.includes(xe.value) ? xe.value : d[0];
    });
    function Re(d, h) {
      h ? Qe.set(d, h) : Qe.delete(d);
    }
    function Ce(d) {
      const h = Pe.value;
      if (h.length === 0) return;
      const m = h[Math.max(0, Math.min(d, h.length - 1))];
      xe.value = m, eo(() => {
        var E;
        return (E = Qe.get(m)) == null ? void 0 : E.focus();
      });
    }
    function On(d) {
      const h = Pe.value, m = Math.max(0, h.indexOf(Zt.value));
      switch (d.key) {
        case "ArrowRight":
          d.preventDefault(), Ce(m + 1);
          break;
        case "ArrowLeft":
          d.preventDefault(), Ce(m - 1);
          break;
        case "Home":
          d.preventDefault(), Ce(0);
          break;
        case "End":
          d.preventDefault(), Ce(h.length - 1);
          break;
      }
    }
    const Pn = ["reorder-above", "reorder-below", "make-child", "reparent"], Rr = te(() => t.state.options.enable_dnd === !0), Cr = /* @__PURE__ */ Ne([]), An = /* @__PURE__ */ Ne(null);
    function ko(d) {
      return G.value.find((h) => h.id === d) ?? null;
    }
    function kl(d, h) {
      let m = d;
      for (; m; ) {
        if (h.includes(m.id)) return !0;
        m = m.getParentRow();
      }
      return !1;
    }
    function jl(d) {
      if (!v.value || !d.getIsSelected()) return [d.id];
      const h = /* @__PURE__ */ new Set();
      for (let E = d.getParentRow(); E; E = E.getParentRow()) h.add(E.id);
      const m = G.value.filter((E) => E.getIsSelected() && !h.has(E.id)).map((E) => E.id);
      return m.length > 1 ? m : [d.id];
    }
    function Hl(d, h) {
      return kl(d, h) ? Pn : d.original.allow_children === !1 ? ["make-child"] : [];
    }
    function Ll(d) {
      if (Y(d) && De(d)) return "expanded";
      const h = ye(d);
      return h[h.length - 1] === d.id ? "last-in-group" : "standard";
    }
    let Mr = null, Qt = null;
    function Er() {
      Qt && clearTimeout(Qt), Qt = null, Mr = null;
    }
    function Kl(d, h) {
      if (Mr === d || (Er(), !h || h.type === "instruction-blocked")) return;
      const m = ko(d);
      !m || !m.getCanExpand() || m.getIsExpanded() || (Mr = d, Qt = setTimeout(() => {
        Qt = null;
        const E = ko(d);
        E && E.getCanExpand() && !E.getIsExpanded() && E.toggleExpanded(!0);
      }, cg));
    }
    function Ir() {
      An.value = null, Er();
    }
    const jo = /* @__PURE__ */ Ne(null);
    function $l() {
      let d = jo.value;
      if (!d) return null;
      let h = d.getRootNode();
      for (; h.host; )
        d = h.host, h = d.getRootNode();
      return d;
    }
    function Tn(d) {
      for (const h of G.value) {
        const m = bt.get(h.id);
        if (!m) continue;
        const E = m.getBoundingClientRect();
        if (d.clientX >= E.left && d.clientX < E.right && d.clientY >= E.top && d.clientY < E.bottom)
          return { row: h, element: m, rect: E };
      }
      return null;
    }
    function Vl(d, h) {
      for (const m of d.element.querySelectorAll(".pnl-tst-check, .pnl-tst-twisty")) {
        const E = m.getBoundingClientRect();
        if (h.clientX >= E.left && h.clientX < E.right && h.clientY >= E.top && h.clientY < E.bottom)
          return !0;
      }
      return !1;
    }
    let gt = null;
    function Ho() {
      gt == null || gt(), gt = null;
      const d = $l();
      !d || !Rr.value || (gt = _r(
        wp({
          element: d,
          // Anything outside a row (the header, the empty space below the last row)
          // is not a drag handle, and returning false cancels the native drag.
          canDrag: ({ input: h }) => {
            const m = Tn(h);
            return m !== null && !Vl(m, h);
          },
          getInitialData: ({ input: h }) => {
            const m = Tn(h);
            return m ? { type: nn, key: m.row.id, keys: jl(m.row) } : { type: nn, key: null, keys: [] };
          },
          onGenerateDragPreview: ({ location: h, nativeSetDragImage: m }) => {
            const E = h.current.input, V = Tn(E);
            !V || !m || m(V.element, E.clientX - V.rect.left, E.clientY - V.rect.top);
          },
          onDragStart: ({ source: h }) => {
            Cr.value = h.data.keys ?? [];
          },
          onDrop: () => {
            Cr.value = [], Ir();
          }
        }),
        yp({
          element: d,
          canDrop: ({ source: h }) => h.data.type === nn,
          getData: ({ input: h, source: m }) => {
            const E = Tn(h);
            if (!E) return { type: nn, key: null };
            const V = { type: nn, key: E.row.id };
            return Ip(V, {
              element: E.element,
              input: h,
              currentLevel: E.row.depth,
              indentPerLevel: D.value,
              mode: Ll(E.row),
              block: Hl(E.row, m.data.keys ?? [])
            });
          },
          onDrag: ({ self: h }) => {
            const m = h.data.key, E = Hs(h.data);
            An.value = m && E ? { key: m, instruction: E } : null, Kl(m ?? null, E);
          },
          onDragLeave: Ir,
          onDrop: ({ self: h, source: m }) => {
            Ir();
            const E = h.data.key, V = Hs(h.data);
            if (!E || !V || V.type === "instruction-blocked") return;
            const et = m.data.keys ?? [];
            et.includes(E) || t.emitEvent("move", {
              key: m.data.key,
              keys: et,
              targetKey: E,
              instruction: V.type,
              desiredLevel: V.desiredLevel ?? V.currentLevel
            });
          }
        })
      ));
    }
    _i(Ho), Te(Rr, Ho), Si(() => {
      Er(), gt == null || gt();
    });
    function Or(d) {
      var h;
      return ((h = An.value) == null ? void 0 : h.key) === d.id ? An.value.instruction : null;
    }
    function Nl(d) {
      const h = Or(d);
      return {
        "pnl-tst-row--draggable": Rr.value,
        "pnl-tst-row--dragging": Cr.value.includes(d.id),
        "pnl-tst-row--blocked": (h == null ? void 0 : h.type) === "instruction-blocked",
        "pnl-tst-row--child-target": (h == null ? void 0 : h.type) === "make-child"
      };
    }
    function Lo(d) {
      const h = Or(d);
      return h ? h.type === "reorder-above" ? "pnl-tst-dropline--above" : h.type === "reorder-below" || h.type === "reparent" ? "pnl-tst-dropline--below" : null : null;
    }
    function Bl(d) {
      const h = Or(d);
      return h ? { insetInlineStart: `${(h.type === "reparent" ? h.desiredLevel : h.currentLevel) * h.indentPerLevel}px` } : null;
    }
    return (d, h) => (ue(), fe("div", {
      ref_key: "rootElement",
      ref: jo,
      class: "pnl-tst"
    }, [
      T.value ? (ue(), fe("div", {
        key: 0,
        class: "pnl-tst-toolbar",
        role: "toolbar",
        "aria-orientation": "horizontal",
        "aria-label": H.value
      }, [
        (ue(!0), fe(Ie, null, jn(j.value, (m, E) => (ue(), fe(Ie, {
          key: `${m}-${E}`
        }, [
          m === "|" ? (ue(), fe("span", Bp)) : m === "search" ? (ue(), fe("label", Wp, [
            Ue("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: It(Kp)
            }, null, 8, Up),
            Ue("input", {
              ref_for: !0,
              ref: (V) => pe.value = V,
              type: "search",
              value: P.value,
              "aria-label": K.value,
              placeholder: K.value,
              onInput: h[0] || (h[0] = (V) => B(V.target.value))
            }, null, 40, Gp)
          ])) : (ue(), fe("button", {
            key: 2,
            ref_for: !0,
            ref: (V) => Re(m, V),
            type: "button",
            class: "pnl-tst-tbtn",
            "aria-label": R[m].label,
            "aria-keyshortcuts": R[m].keys,
            "aria-disabled": !J(m),
            title: Z(m),
            tabindex: m === Zt.value ? 0 : -1,
            onClick: (V) => ce(m),
            onFocus: (V) => xe.value = m,
            onKeydown: On
          }, [
            Ue("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: R[m].icon
            }, null, 8, zp)
          ], 40, qp))
        ], 64))), 128))
      ], 8, Np)) : Kt("", !0),
      G.value.length === 0 ? (ue(), fe("div", Yp, Vn(ae.value), 1)) : (ue(), fe("div", {
        key: 2,
        class: "pnl-tst-grid",
        role: "treegrid",
        "aria-label": z.value,
        "aria-colcount": $.value.length,
        "aria-rowcount": he.value,
        onKeydown: En
      }, [
        r.value ? (ue(), fe("div", Jp, [
          Ue("div", Zp, [
            (ue(!0), fe(Ie, null, jn($.value, (m, E) => (ue(), fe("div", {
              key: m.id,
              class: "pnl-tst-hcell",
              role: "columnheader",
              "aria-colindex": E + 1,
              style: Bt(dt(m.column.columnDef))
            }, Vn(m.column.columnDef.header), 13, Qp))), 128))
          ])
        ])) : Kt("", !0),
        Ue("div", eg, [
          (ue(!0), fe(Ie, null, jn(G.value, (m, E) => (ue(), fe("div", {
            key: m.id,
            ref_for: !0,
            ref: (V) => xr(m.id, V),
            class: Ct(["pnl-tst-row", [Nl(m), { "pnl-tst-row--active": m.id === ge.value }]]),
            role: "row",
            "aria-level": m.depth + 1,
            "aria-posinset": se(m),
            "aria-setsize": X(m),
            "aria-rowindex": E + oe.value,
            "aria-expanded": Y(m) ? De(m) : void 0,
            "aria-selected": v.value ? m.getIsSelected() : void 0,
            tabindex: m.id === Jt.value ? 0 : -1,
            onClick: (V) => g(m, V),
            onFocus: (V) => ge.value = m.id
          }, [
            Lo(m) ? (ue(), fe("span", {
              key: 0,
              class: Ct(["pnl-tst-dropline", Lo(m)]),
              style: Bt(Bl(m)),
              "aria-hidden": "true"
            }, null, 6)) : Kt("", !0),
            (ue(!0), fe(Ie, null, jn(m.getAllCells(), (V, et) => (ue(), fe("div", {
              key: V.id,
              class: Ct(["pnl-tst-cell", { "pnl-tst-cell--tree": et === 0 }]),
              role: "gridcell",
              "aria-colindex": et + 1,
              style: Bt(
                et === 0 ? Ze(m, V.column.columnDef) : dt(V.column.columnDef)
              )
            }, [
              et === 0 ? (ue(), fe(Ie, { key: 0 }, [
                Y(m) ? (ue(), fe("span", {
                  key: 0,
                  class: Ct(["pnl-tst-twisty", { "pnl-tst-twisty--open": De(m) }]),
                  "aria-hidden": "true",
                  onClick: ps((Pr) => y(m), ["stop"])
                }, [...h[1] || (h[1] = [
                  Ue("svg", {
                    viewBox: "0 0 16 16",
                    width: "12",
                    height: "12",
                    focusable: "false"
                  }, [
                    Ue("path", {
                      d: "M6 3.5 10.5 8 6 12.5",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "1.6"
                    })
                  ], -1)
                ])], 10, rg)) : (ue(), fe("span", og)),
                I.value ? (ue(), fe("input", {
                  key: 2,
                  class: "pnl-tst-check",
                  type: "checkbox",
                  tabindex: "-1",
                  checked: x(m),
                  ".indeterminate": S(m),
                  "aria-label": `Select ${m.original.title ?? m.id}`,
                  onClick: ps((Pr) => O(m), ["stop"])
                }, null, 40, sg)) : Kt("", !0),
                c(m) ? (ue(), fe("span", {
                  key: 3,
                  class: "pnl-tst-icon",
                  "aria-hidden": "true",
                  innerHTML: c(m)
                }, null, 8, ig)) : Kt("", !0)
              ], 64)) : Kt("", !0),
              Ue("span", lg, Vn(V.getValue()), 1)
            ], 14, ng))), 128))
          ], 42, tg))), 128))
        ])
      ], 40, Xp))
    ], 512));
  }
};
function fg({ model: e, el: t }) {
  t.style.display = "block", t.style.width = "100%", t.style.height = "100%";
  const n = document.createElement("div");
  n.className = "pnl-tst-root", n.style.height = "100%", t.append(n);
  const r = /* @__PURE__ */ cr({
    source: e.get("source") || [],
    columns: e.get("columns") || [],
    options: e.get("options") || {},
    icons: e.get("icons") || {},
    filterText: e.get("filter_text") || "",
    expandedKeys: e.get("expanded_keys") || [],
    selectedKeys: e.get("selected_keys") || []
  }), o = (p, v) => {
    e.set("_event_data", {
      event_name: p,
      event_params: v,
      timestamp: Date.now()
    }), e.save_changes();
  }, s = (p, v) => p.length === v.length && p.every((w, I) => w === v[I]), i = (p) => (v) => {
    const w = [...e.get(p) || []].sort();
    s(w, v) || (e.set(p, v), e.save_changes());
  }, l = i("expanded_keys"), a = i("selected_keys"), u = fu(ug, {
    state: r,
    emitEvent: o,
    setExpandedKeys: l,
    setSelectedKeys: a,
    setFilterText: (p) => {
      (e.get("filter_text") || "") !== p && (e.set("filter_text", p), e.save_changes());
    }
  });
  return u.mount(n), e.on("change:source", () => {
    r.source = e.get("source") || [];
  }), e.on("change:columns", () => {
    r.columns = e.get("columns") || [];
  }), e.on("change:options", () => {
    r.options = e.get("options") || {};
  }), e.on("change:icons", () => {
    r.icons = e.get("icons") || {};
  }), e.on("change:filter_text", () => {
    r.filterText = e.get("filter_text") || "";
  }), e.on("change:expanded_keys", () => {
    r.expandedKeys = e.get("expanded_keys") || [];
  }), e.on("change:selected_keys", () => {
    r.selectedKeys = e.get("selected_keys") || [];
  }), () => {
    u.unmount();
  };
}
export {
  fg as render
};

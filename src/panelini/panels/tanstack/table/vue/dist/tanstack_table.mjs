/**
* @vue/shared v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function yo(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const le = {}, Gt = [], Je = () => {
}, Bs = () => !1, ir = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), lr = (e) => e.startsWith("onUpdate:"), xe = Object.assign, wo = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Xl = Object.prototype.hasOwnProperty, te = (e, t) => Xl.call(e, t), N = Array.isArray, wt = (e) => xn(e) === "[object Map]", Yn = (e) => xn(e) === "[object Set]", Wo = (e) => xn(e) === "[object Date]", G = (e) => typeof e == "function", ge = (e) => typeof e == "string", Ze = (e) => typeof e == "symbol", ne = (e) => e !== null && typeof e == "object", Ws = (e) => (ne(e) || G(e)) && G(e.then) && G(e.catch), Us = Object.prototype.toString, xn = (e) => Us.call(e), Jl = (e) => xn(e).slice(8, -1), Gs = (e) => xn(e) === "[object Object]", bo = (e) => ge(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, an = /* @__PURE__ */ yo(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), ar = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Zl = /-\w/g, Ke = ar(
  (e) => e.replace(Zl, (t) => t.slice(1).toUpperCase())
), Ql = /\B([A-Z])/g, jt = ar(
  (e) => e.replace(Ql, "-$1").toLowerCase()
), qs = ar((e) => e.charAt(0).toUpperCase() + e.slice(1)), kr = ar(
  (e) => e ? `on${qs(e)}` : ""
), Ye = (e, t) => !Object.is(e, t), Fr = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, zs = (e, t, n, r = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: r,
    value: n
  });
}, ea = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Uo;
const cr = () => Uo || (Uo = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function qt(e) {
  if (N(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], o = ge(r) ? oa(r) : qt(r);
      if (o)
        for (const s in o)
          t[s] = o[s];
    }
    return t;
  } else if (ge(e) || ne(e))
    return e;
}
const ta = /;(?![^(]*\))/g, na = /:([^]+)/, ra = /\/\*[^]*?\*\//g;
function oa(e) {
  const t = {};
  return e.replace(ra, "").split(ta).forEach((n) => {
    if (n) {
      const r = n.split(na);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function It(e) {
  let t = "";
  if (ge(e))
    t = e;
  else if (N(e))
    for (let n = 0; n < e.length; n++) {
      const r = It(e[n]);
      r && (t += r + " ");
    }
  else if (ne(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const sa = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", ia = /* @__PURE__ */ yo(sa);
function Ys(e) {
  return !!e || e === "";
}
function la(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let r = 0; n && r < e.length; r++)
    n = ur(e[r], t[r]);
  return n;
}
function Go(e, t) {
  if (e.size !== t.size) return !1;
  const n = Array.from(t), r = new Uint8Array(n.length);
  for (const o of e) {
    let s = -1;
    for (let i = 0; i < n.length; i++)
      if (!r[i] && ur(o, n[i])) {
        s = i;
        break;
      }
    if (s < 0) return !1;
    r[s] = 1;
  }
  return !0;
}
function ur(e, t) {
  if (e === t) return !0;
  let n = Wo(e), r = Wo(t);
  if (n || r)
    return n && r ? e.getTime() === t.getTime() : !1;
  if (n = Ze(e), r = Ze(t), n || r)
    return e === t;
  if (n = N(e), r = N(t), n || r)
    return n && r ? la(e, t) : !1;
  if (n = ne(e), r = ne(t), n || r) {
    if (!n || !r)
      return !1;
    if (n = wt(e), r = wt(t), n || r || (n = Yn(e), r = Yn(t), n || r))
      return n && r ? Go(e, t) : !1;
    const o = Object.keys(e).length, s = Object.keys(t).length;
    if (o !== s)
      return !1;
    for (const i in e) {
      const l = e.hasOwnProperty(i), a = t.hasOwnProperty(i);
      if (l && !a || !l && a || !ur(e[i], t[i]))
        return !1;
    }
  }
  return String(e) === String(t);
}
const Xs = (e) => !!(e && e.__v_isRef === !0), Wn = (e) => ge(e) ? e : e == null ? "" : N(e) || ne(e) && (e.toString === Us || !G(e.toString)) ? Xs(e) ? Wn(e.value) : JSON.stringify(e, Js, 2) : String(e), Js = (e, t) => Xs(t) ? Js(e, t.value) : wt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [r, o], s) => (n[jr(r, s) + " =>"] = o, n),
    {}
  )
} : Yn(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => jr(n))
} : Ze(t) ? jr(t) : ne(t) && !N(t) && !Gs(t) ? String(t) : t, jr = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Ze(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let ve;
class aa {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && ve && (ve.active ? (this.parent = ve, this.index = (ve.scopes || (ve.scopes = [])).push(
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
      const n = ve;
      try {
        return ve = this, t();
      } finally {
        ve = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = ve, ve = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (ve === this)
        ve = this.prevScope;
      else {
        let t = ve;
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
function Zs() {
  return ve;
}
function ca(e, t = !1) {
  ve && ve.cleanups.push(e);
}
let ie;
const Hr = /* @__PURE__ */ new WeakSet();
class Qs {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, ve && (ve.active ? ve.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Hr.has(this) && (Hr.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || ti(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, qo(this), ni(this);
    const t = ie, n = $e;
    ie = this, $e = !0;
    try {
      return this.fn();
    } finally {
      ri(this), ie = t, $e = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        xo(t);
      this.deps = this.depsTail = void 0, qo(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Hr.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Qr(this) && this.run();
  }
  get dirty() {
    return Qr(this);
  }
}
let ei = 0, cn, un;
function ti(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = un, un = e;
    return;
  }
  e.next = cn, cn = e;
}
function _o() {
  ei++;
}
function So() {
  if (--ei > 0)
    return;
  if (un) {
    let t = un;
    for (un = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; cn; ) {
    let t = cn;
    for (cn = void 0; t; ) {
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
function ni(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function ri(e) {
  let t, n = e.depsTail, r = n;
  for (; r; ) {
    const o = r.prevDep;
    r.version === -1 ? (r === n && (n = o), xo(r), ua(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = o;
  }
  e.deps = t, e.depsTail = n;
}
function Qr(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (oi(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function oi(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === hn) || (e.globalVersion = hn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Qr(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = ie, r = $e;
  ie = e, $e = !0;
  try {
    ni(e);
    const o = e.fn(e._value);
    (t.version === 0 || Ye(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    ie = n, $e = r, ri(e), e.flags &= -3;
  }
}
function xo(e, t = !1) {
  const { dep: n, prevSub: r, nextSub: o } = e;
  if (r && (r.nextSub = o, e.prevSub = void 0), o && (o.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
    n.computed.flags &= -5;
    for (let s = n.computed.deps; s; s = s.nextDep)
      xo(s, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function ua(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let $e = !0;
const si = [];
function it() {
  si.push($e), $e = !1;
}
function lt() {
  const e = si.pop();
  $e = e === void 0 ? !0 : e;
}
function qo(e) {
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
let hn = 0;
class fa {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Ro {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!ie || !$e || ie === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== ie)
      n = this.activeLink = new fa(ie, this), ie.deps ? (n.prevDep = ie.depsTail, ie.depsTail.nextDep = n, ie.depsTail = n) : ie.deps = ie.depsTail = n, ii(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const r = n.nextDep;
      r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = ie.depsTail, n.nextDep = void 0, ie.depsTail.nextDep = n, ie.depsTail = n, ie.deps === n && (ie.deps = r);
    }
    return n;
  }
  trigger(t) {
    this.version++, hn++, this.notify(t);
  }
  notify(t) {
    _o();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      So();
    }
  }
}
function ii(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let r = t.deps; r; r = r.nextDep)
        ii(r);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const eo = /* @__PURE__ */ new WeakMap(), Et = /* @__PURE__ */ Symbol(
  ""
), to = /* @__PURE__ */ Symbol(
  ""
), mn = /* @__PURE__ */ Symbol(
  ""
);
function _e(e, t, n) {
  if ($e && ie) {
    let r = eo.get(e);
    r || eo.set(e, r = /* @__PURE__ */ new Map());
    let o = r.get(n);
    o || (r.set(n, o = new Ro()), o.map = r, o.key = n), o.track();
  }
}
function ot(e, t, n, r, o, s) {
  const i = eo.get(e);
  if (!i) {
    hn++;
    return;
  }
  const l = (a) => {
    a && a.trigger();
  };
  if (_o(), t === "clear")
    i.forEach(l);
  else {
    const a = N(e), c = a && bo(n);
    if (a && n === "length") {
      const u = Number(r);
      i.forEach((p, v) => {
        (v === "length" || v === mn || !Ze(v) && v >= u) && l(p);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && l(i.get(n)), c && l(i.get(mn)), t) {
        case "add":
          a ? c && l(i.get("length")) : (l(i.get(Et)), wt(e) && l(i.get(to)));
          break;
        case "delete":
          a || (l(i.get(Et)), wt(e) && l(i.get(to)));
          break;
        case "set":
          wt(e) && l(i.get(Et));
          break;
      }
  }
  So();
}
function Nt(e) {
  const t = /* @__PURE__ */ ee(e);
  return t === e ? t : (_e(t, "iterate", mn), /* @__PURE__ */ Le(e) ? t : t.map(Ve));
}
function fr(e) {
  return _e(e = /* @__PURE__ */ ee(e), "iterate", mn), e;
}
function qe(e, t) {
  return /* @__PURE__ */ at(e) ? Xt(/* @__PURE__ */ Ot(e) ? Ve(t) : t) : Ve(t);
}
const da = {
  __proto__: null,
  [Symbol.iterator]() {
    return Lr(this, Symbol.iterator, (e) => qe(this, e));
  },
  concat(...e) {
    return Nt(this).concat(
      ...e.map((t) => N(t) ? Nt(t) : t)
    );
  },
  entries() {
    return Lr(this, "entries", (e) => (e[1] = qe(this, e[1]), e));
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
      (n) => n.map((r) => qe(this, r)),
      arguments
    );
  },
  find(e, t) {
    return tt(
      this,
      "find",
      e,
      t,
      (n) => qe(this, n),
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
      (n) => qe(this, n),
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
    return Kr(this, "includes", e);
  },
  indexOf(...e) {
    return Kr(this, "indexOf", e);
  },
  join(e) {
    return Nt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Kr(this, "lastIndexOf", e);
  },
  map(e, t) {
    return tt(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return nn(this, "pop");
  },
  push(...e) {
    return nn(this, "push", e);
  },
  reduce(e, ...t) {
    return zo(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return zo(this, "reduceRight", e, t);
  },
  shift() {
    return nn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return tt(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return nn(this, "splice", e);
  },
  toReversed() {
    return Nt(this).toReversed();
  },
  toSorted(e) {
    return Nt(this).toSorted(e);
  },
  toSpliced(...e) {
    return Nt(this).toSpliced(...e);
  },
  unshift(...e) {
    return nn(this, "unshift", e);
  },
  values() {
    return Lr(this, "values", (e) => qe(this, e));
  }
};
function Lr(e, t, n) {
  const r = fr(e), o = r[t]();
  return r !== e && !/* @__PURE__ */ Le(e) && (o._next = o.next, o.next = () => {
    const s = o._next();
    return s.done || (s.value = n(s.value)), s;
  }), o;
}
const pa = Array.prototype;
function tt(e, t, n, r, o, s) {
  const i = fr(e), l = i !== e && !/* @__PURE__ */ Le(e), a = i[t];
  if (a !== pa[t]) {
    const p = a.apply(e, s);
    return l ? Ve(p) : p;
  }
  let c = n;
  i !== e && (l ? c = function(p, v) {
    return n.call(this, qe(e, p), v, e);
  } : n.length > 2 && (c = function(p, v) {
    return n.call(this, p, v, e);
  }));
  const u = a.call(i, c, r);
  return l && o ? o(u) : u;
}
function zo(e, t, n, r) {
  const o = fr(e), s = o !== e && !/* @__PURE__ */ Le(e);
  let i = n, l = !1;
  o !== e && (s ? (l = r.length === 0, i = function(c, u, p) {
    return l && (l = !1, c = qe(e, c)), n.call(this, c, qe(e, u), p, e);
  }) : n.length > 3 && (i = function(c, u, p) {
    return n.call(this, c, u, p, e);
  }));
  const a = o[t](i, ...r);
  return l ? qe(e, a) : a;
}
function Kr(e, t, n) {
  const r = /* @__PURE__ */ ee(e);
  _e(r, "iterate", mn);
  const o = r[t](...n);
  return (o === -1 || o === !1) && /* @__PURE__ */ Io(n[0]) ? (n[0] = /* @__PURE__ */ ee(n[0]), r[t](...n)) : o;
}
function nn(e, t, n = []) {
  it(), _o();
  const r = (/* @__PURE__ */ ee(e))[t].apply(e, n);
  return So(), lt(), r;
}
const ga = /* @__PURE__ */ yo("__proto__,__v_isRef,__isVue"), li = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Ze)
);
function ha(e) {
  Ze(e) || (e = String(e));
  const t = /* @__PURE__ */ ee(this);
  return _e(t, "has", e), t.hasOwnProperty(e);
}
class ai {
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
      return r === (o ? s ? Ca : di : s ? fi : ui).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const i = N(t);
    if (!o) {
      let a;
      if (i && (a = da[n]))
        return a;
      if (n === "hasOwnProperty")
        return ha;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ Se(t) ? t : r
    );
    if ((Ze(n) ? li.has(n) : ga(n)) || (o || _e(t, "get", n), s))
      return l;
    if (/* @__PURE__ */ Se(l)) {
      const a = i && bo(n) ? l : l.value;
      return o && ne(a) ? /* @__PURE__ */ ro(a) : a;
    }
    return ne(l) ? o ? /* @__PURE__ */ ro(l) : /* @__PURE__ */ dr(l) : l;
  }
}
class ci extends ai {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, o) {
    let s = t[n];
    const i = N(t) && bo(n);
    if (!this._isShallow) {
      const c = /* @__PURE__ */ at(s);
      if (!/* @__PURE__ */ Le(r) && !/* @__PURE__ */ at(r) && (s = /* @__PURE__ */ ee(s), r = /* @__PURE__ */ ee(r)), !i && /* @__PURE__ */ Se(s) && !/* @__PURE__ */ Se(r))
        return c || (s.value = r), !0;
    }
    const l = i ? Number(n) < t.length : te(t, n), a = Reflect.set(
      t,
      n,
      r,
      /* @__PURE__ */ Se(t) ? t : o
    );
    return t === /* @__PURE__ */ ee(o) && a && (l ? Ye(r, s) && ot(t, "set", n, r) : ot(t, "add", n, r)), a;
  }
  deleteProperty(t, n) {
    const r = te(t, n);
    t[n];
    const o = Reflect.deleteProperty(t, n);
    return o && r && ot(t, "delete", n, void 0), o;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!Ze(n) || !li.has(n)) && _e(t, "has", n), r;
  }
  ownKeys(t) {
    return _e(
      t,
      "iterate",
      N(t) ? "length" : Et
    ), Reflect.ownKeys(t);
  }
}
class ma extends ai {
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
const va = /* @__PURE__ */ new ci(), ya = /* @__PURE__ */ new ma(), wa = /* @__PURE__ */ new ci(!0);
const no = (e) => e, jn = (e) => Reflect.getPrototypeOf(e);
function ba(e, t, n) {
  return function(...r) {
    const o = this.__v_raw, s = /* @__PURE__ */ ee(o), i = wt(s), l = e === "entries" || e === Symbol.iterator && i, a = e === "keys" && i, c = o[e](...r), u = n ? no : t ? Xt : Ve;
    return !t && _e(
      s,
      "iterate",
      a ? to : Et
    ), xe(
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
function Hn(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function _a(e, t) {
  const n = {
    get(o) {
      const s = this.__v_raw, i = /* @__PURE__ */ ee(s), l = /* @__PURE__ */ ee(o);
      e || (Ye(o, l) && _e(i, "get", o), _e(i, "get", l));
      const { has: a } = jn(i), c = t ? no : e ? Xt : Ve;
      if (a.call(i, o))
        return c(s.get(o));
      if (a.call(i, l))
        return c(s.get(l));
      s !== i && s.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && _e(/* @__PURE__ */ ee(o), "iterate", Et), o.size;
    },
    has(o) {
      const s = this.__v_raw, i = /* @__PURE__ */ ee(s), l = /* @__PURE__ */ ee(o);
      return e || (Ye(o, l) && _e(i, "has", o), _e(i, "has", l)), o === l ? s.has(o) : s.has(o) || s.has(l);
    },
    forEach(o, s) {
      const i = this, l = i.__v_raw, a = /* @__PURE__ */ ee(l), c = t ? no : e ? Xt : Ve;
      return !e && _e(a, "iterate", Et), l.forEach((u, p) => o.call(s, c(u), c(p), i));
    }
  };
  return xe(
    n,
    e ? {
      add: Hn("add"),
      set: Hn("set"),
      delete: Hn("delete"),
      clear: Hn("clear")
    } : {
      add(o) {
        const s = /* @__PURE__ */ ee(this), i = jn(s), l = /* @__PURE__ */ ee(o), a = !t && !/* @__PURE__ */ Le(o) && !/* @__PURE__ */ at(o) ? l : o;
        return i.has.call(s, a) || Ye(o, a) && i.has.call(s, o) || Ye(l, a) && i.has.call(s, l) || (s.add(a), ot(s, "add", a, a)), this;
      },
      set(o, s) {
        !t && !/* @__PURE__ */ Le(s) && !/* @__PURE__ */ at(s) && (s = /* @__PURE__ */ ee(s));
        const i = /* @__PURE__ */ ee(this), { has: l, get: a } = jn(i);
        let c = l.call(i, o);
        c || (o = /* @__PURE__ */ ee(o), c = l.call(i, o));
        const u = a.call(i, o);
        return i.set(o, s), c ? Ye(s, u) && ot(i, "set", o, s) : ot(i, "add", o, s), this;
      },
      delete(o) {
        const s = /* @__PURE__ */ ee(this), { has: i, get: l } = jn(s);
        let a = i.call(s, o);
        a || (o = /* @__PURE__ */ ee(o), a = i.call(s, o)), l && l.call(s, o);
        const c = s.delete(o);
        return a && ot(s, "delete", o, void 0), c;
      },
      clear() {
        const o = /* @__PURE__ */ ee(this), s = o.size !== 0, i = o.clear();
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
    n[o] = ba(o, e, t);
  }), n;
}
function Co(e, t) {
  const n = _a(e, t);
  return (r, o, s) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(
    te(n, o) && o in r ? n : r,
    o,
    s
  );
}
const Sa = {
  get: /* @__PURE__ */ Co(!1, !1)
}, xa = {
  get: /* @__PURE__ */ Co(!1, !0)
}, Ra = {
  get: /* @__PURE__ */ Co(!0, !1)
};
const ui = /* @__PURE__ */ new WeakMap(), fi = /* @__PURE__ */ new WeakMap(), di = /* @__PURE__ */ new WeakMap(), Ca = /* @__PURE__ */ new WeakMap();
function Ma(e) {
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
function dr(e) {
  return /* @__PURE__ */ at(e) ? e : Mo(
    e,
    !1,
    va,
    Sa,
    ui
  );
}
// @__NO_SIDE_EFFECTS__
function Ia(e) {
  return Mo(
    e,
    !1,
    wa,
    xa,
    fi
  );
}
// @__NO_SIDE_EFFECTS__
function ro(e) {
  return Mo(
    e,
    !0,
    ya,
    Ra,
    di
  );
}
function Mo(e, t, n, r, o) {
  if (!ne(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const s = o.get(e);
  if (s)
    return s;
  const i = Ma(Jl(e));
  if (i === 0)
    return e;
  const l = new Proxy(
    e,
    i === 2 ? r : n
  );
  return o.set(e, l), l;
}
// @__NO_SIDE_EFFECTS__
function Ot(e) {
  return /* @__PURE__ */ at(e) ? /* @__PURE__ */ Ot(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function at(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Le(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Io(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function ee(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ ee(t) : e;
}
function Ea(e) {
  return !te(e, "__v_skip") && Object.isExtensible(e) && zs(e, "__v_skip", !0), e;
}
const Ve = (e) => ne(e) ? /* @__PURE__ */ dr(e) : e, Xt = (e) => ne(e) ? /* @__PURE__ */ ro(e) : e;
// @__NO_SIDE_EFFECTS__
function Se(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Be(e) {
  return pi(e, !1);
}
// @__NO_SIDE_EFFECTS__
function Oa(e) {
  return pi(e, !0);
}
function pi(e, t) {
  return /* @__PURE__ */ Se(e) ? e : new Pa(e, t);
}
class Pa {
  constructor(t, n) {
    this.dep = new Ro(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ ee(t), this._value = n ? t : Ve(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, r = this.__v_isShallow || /* @__PURE__ */ Le(t) || /* @__PURE__ */ at(t);
    t = r ? t : /* @__PURE__ */ ee(t), Ye(t, n) && (this._rawValue = t, this._value = r ? t : Ve(t), this.dep.trigger());
  }
}
function Pt(e) {
  return /* @__PURE__ */ Se(e) ? e.value : e;
}
const Aa = {
  get: (e, t, n) => t === "__v_raw" ? e : Pt(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return /* @__PURE__ */ Se(o) && !/* @__PURE__ */ Se(n) ? (o.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function gi(e) {
  return /* @__PURE__ */ Ot(e) ? e : new Proxy(e, Aa);
}
class Ta {
  constructor(t, n, r) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Ro(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = hn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    ie !== this)
      return ti(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return oi(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function Da(e, t, n = !1) {
  let r, o;
  return G(e) ? r = e : (r = e.get, o = e.set), new Ta(r, o, n);
}
const Ln = {}, Xn = /* @__PURE__ */ new WeakMap();
let Mt;
function ka(e, t = !1, n = Mt) {
  if (n) {
    let r = Xn.get(n);
    r || Xn.set(n, r = []), r.push(e);
  }
}
function Fa(e, t, n = le) {
  const { immediate: r, deep: o, once: s, scheduler: i, augmentJob: l, call: a } = n, c = (P) => o ? P : /* @__PURE__ */ Le(P) || o === !1 || o === 0 ? yt(P, 1) : yt(P);
  let u, p, v, w, E = !1, M = !1;
  if (/* @__PURE__ */ Se(e) ? (p = () => e.value, E = /* @__PURE__ */ Le(e)) : /* @__PURE__ */ Ot(e) ? (p = () => c(e), E = !0) : N(e) ? (M = !0, E = e.some((P) => /* @__PURE__ */ Ot(P) || /* @__PURE__ */ Le(P)), p = () => e.map((P) => {
    if (/* @__PURE__ */ Se(P))
      return P.value;
    if (/* @__PURE__ */ Ot(P))
      return c(P);
    if (G(P))
      return a ? a(P, 2) : P();
  })) : G(e) ? t ? p = a ? () => a(e, 2) : e : p = () => {
    if (v) {
      it();
      try {
        v();
      } finally {
        lt();
      }
    }
    const P = Mt;
    Mt = u;
    try {
      return a ? a(e, 3, [w]) : e(w);
    } finally {
      Mt = P;
    }
  } : p = Je, t && o) {
    const P = p, B = o === !0 ? 1 / 0 : o;
    p = () => yt(P(), B);
  }
  const k = Zs(), K = () => {
    u.stop(), k && k.active && wo(k.effects, u);
  };
  if (s && t) {
    const P = t;
    t = (...B) => {
      const W = P(...B);
      return K(), W;
    };
  }
  let I = M ? new Array(e.length).fill(Ln) : Ln;
  const F = (P) => {
    if (!(!(u.flags & 1) || !u.dirty && !P))
      if (t) {
        const B = u.run();
        if (P || o || E || (M ? B.some((W, U) => Ye(W, I[U])) : Ye(B, I))) {
          v && v();
          const W = Mt;
          Mt = u;
          try {
            const U = [
              B,
              // pass undefined as the old value when it's changed for the first time
              I === Ln ? void 0 : M && I[0] === Ln ? [] : I,
              w
            ];
            I = B, a ? a(t, 3, U) : (
              // @ts-expect-error
              t(...U)
            );
          } finally {
            Mt = W;
          }
        }
      } else
        u.run();
  };
  return l && l(F), u = new Qs(p), u.scheduler = i ? () => i(F, !1) : F, w = (P) => ka(P, !1, u), v = u.onStop = () => {
    const P = Xn.get(u);
    if (P) {
      if (a)
        a(P, 4);
      else
        for (const B of P) B();
      Xn.delete(u);
    }
  }, t ? r ? F(!0) : I = u.run() : i ? i(F.bind(null, !0), !0) : u.run(), K.pause = u.pause.bind(u), K.resume = u.resume.bind(u), K.stop = K, K;
}
function yt(e, t = 1 / 0, n) {
  if (t <= 0 || !ne(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ Se(e))
    yt(e.value, t, n);
  else if (N(e))
    for (let r = 0; r < e.length; r++)
      yt(e[r], t, n);
  else if (Yn(e) || wt(e))
    e.forEach((r) => {
      yt(r, t, n);
    });
  else if (Gs(e)) {
    for (const r in e)
      yt(e[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, r) && yt(e[r], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Rn(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (o) {
    pr(o, t, n);
  }
}
function Ne(e, t, n, r) {
  if (G(e)) {
    const o = Rn(e, t, n, r);
    return o && Ws(o) && o.catch((s) => {
      pr(s, t, n);
    }), o;
  }
  if (N(e)) {
    const o = [];
    for (let s = 0; s < e.length; s++)
      o.push(Ne(e[s], t, n, r));
    return o;
  }
}
function pr(e, t, n, r = !0) {
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
      it(), Rn(s, null, 10, [
        e,
        a,
        c
      ]), lt();
      return;
    }
  }
  ja(e, n, o, r, i);
}
function ja(e, t, n, r = !0, o = !1) {
  if (o)
    throw e;
  console.error(e);
}
const Oe = [];
let Ue = -1;
const zt = [];
let vt = null, Wt = 0;
const hi = /* @__PURE__ */ Promise.resolve();
let Jn = null;
function oo(e) {
  const t = Jn || hi;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ha(e) {
  let t = Ue + 1, n = Oe.length;
  for (; t < n; ) {
    const r = t + n >>> 1, o = Oe[r], s = vn(o);
    s < e || s === e && o.flags & 2 ? t = r + 1 : n = r;
  }
  return t;
}
function Eo(e) {
  if (!(e.flags & 1)) {
    const t = vn(e), n = Oe[Oe.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= vn(n) ? Oe.push(e) : Oe.splice(Ha(t), 0, e), e.flags |= 1, mi();
  }
}
function mi() {
  Jn || (Jn = hi.then(yi));
}
function La(e) {
  if (!N(e))
    vt && e.id === -1 ? vt.splice(Wt + 1, 0, e) : e.flags & 1 || (zt.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      zt.push(e[t]);
  mi();
}
function Yo(e, t, n = Ue + 1) {
  for (; n < Oe.length; n++) {
    const r = Oe[n];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid)
        continue;
      Oe.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function vi(e) {
  if (zt.length) {
    const t = [...new Set(zt)].sort(
      (n, r) => vn(n) - vn(r)
    );
    if (zt.length = 0, vt) {
      for (let n = 0; n < t.length; n++)
        vt.push(t[n]);
      return;
    }
    for (vt = t, Wt = 0; Wt < vt.length; Wt++) {
      const n = vt[Wt];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    vt = null, Wt = 0;
  }
}
const vn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function yi(e) {
  try {
    for (Ue = 0; Ue < Oe.length; Ue++) {
      const t = Oe[Ue];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Rn(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Ue < Oe.length; Ue++) {
      const t = Oe[Ue];
      t && (t.flags &= -2);
    }
    Ue = -1, Oe.length = 0, vi(), Jn = null, (Oe.length || zt.length) && yi();
  }
}
let Xe = null, wi = null;
function Zn(e) {
  const t = Xe;
  return Xe = e, wi = e && e.type.__scopeId || null, t;
}
function Ka(e, t = Xe, n) {
  if (!t || e._n)
    return e;
  const r = (...o) => {
    r._d && is(-1);
    const s = Zn(t), i = At.length;
    let l;
    try {
      l = e(...o);
    } finally {
      for (let a = At.length; a > i; a--) Ui();
      Zn(s), r._d && is(1);
    }
    return l;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function Rt(e, t, n, r) {
  const o = e.dirs, s = t && t.dirs;
  for (let i = 0; i < o.length; i++) {
    const l = o[i];
    s && (l.oldValue = s[i].value);
    let a = l.dir[r];
    a && (it(), Ne(a, n, 8, [
      e.el,
      l,
      e,
      t
    ]), lt());
  }
}
function $a(e, t) {
  if (Ae) {
    let n = Ae.provides;
    const r = Ae.parent && Ae.parent.provides;
    r === n && (n = Ae.provides = Object.create(r)), n[e] = t;
  }
}
function Un(e, t, n = !1) {
  const r = Hc();
  if (r || Yt) {
    let o = Yt ? Yt._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && G(t) ? t.call(r && r.proxy) : t;
  }
}
const Va = /* @__PURE__ */ Symbol.for("v-scx"), Na = () => Un(Va);
function Ee(e, t, n) {
  return bi(e, t, n);
}
function bi(e, t, n = le) {
  const { immediate: r, deep: o, flush: s, once: i } = n, l = xe({}, n), a = t && r || !t && s !== "post";
  let c;
  if (bn) {
    if (s === "sync") {
      const w = Na();
      c = w.__watcherHandles || (w.__watcherHandles = []);
    } else if (!a) {
      const w = () => {
      };
      return w.stop = Je, w.resume = Je, w.pause = Je, w;
    }
  }
  const u = Ae;
  l.call = (w, E, M) => Ne(w, u, E, M);
  let p = !1;
  s === "post" ? l.scheduler = (w) => {
    De(w, u && u.suspense);
  } : s !== "sync" && (p = !0, l.scheduler = (w, E) => {
    E ? w() : Eo(w);
  }), l.augmentJob = (w) => {
    t && (w.flags |= 4), p && (w.flags |= 2, u && (w.id = u.uid, w.i = u));
  };
  const v = Fa(e, t, l);
  return bn && (c ? c.push(v) : a && v()), v;
}
function Ba(e, t, n) {
  const r = this.proxy, o = ge(e) ? e.includes(".") ? _i(r, e) : () => r[e] : e.bind(r, r);
  let s;
  G(t) ? s = t : (s = t.handler, n = t);
  const i = Cn(this), l = bi(o, s.bind(r), n);
  return i(), l;
}
function _i(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++)
      r = r[n[o]];
    return r;
  };
}
const Wa = /* @__PURE__ */ Symbol("_vte"), gr = (e) => e.__isTeleport, $r = /* @__PURE__ */ Symbol("_leaveCb");
function Ua(e) {
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
function Si(e) {
  if (!Po(e))
    return gr(e.type) && e.children ? Ua(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16)
      return n[0];
    if (t & 32 && G(n.default))
      return n.default();
  }
}
function Oo(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    Oo(
      gr(n.type) && Si(n) || n,
      t
    );
  } else e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function xi(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Xo(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const Qn = /* @__PURE__ */ new WeakMap();
function fn(e, t, n, r, o = !1) {
  if (N(e)) {
    e.forEach(
      (M, k) => fn(
        M,
        t && (N(t) ? t[k] : t),
        n,
        r,
        o
      )
    );
    return;
  }
  if (dn(r) && !o) {
    r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && fn(e, t, n, r.component.subTree);
    return;
  }
  const s = r.shapeFlag & 4 ? Do(r.component) : r.el, i = o ? null : s, { i: l, r: a } = e, c = t && t.r, u = l.refs === le ? l.refs = {} : l.refs, p = l.setupState, v = /* @__PURE__ */ ee(p), w = p === le ? Bs : (M) => Xo(u, M) ? !1 : te(v, M), E = (M, k) => !(k && Xo(u, k));
  if (c != null && c !== a) {
    if (Jo(t), ge(c))
      u[c] = null, w(c) && (p[c] = null);
    else if (/* @__PURE__ */ Se(c)) {
      const M = t;
      E(c, M.k) && (c.value = null), M.k && (u[M.k] = null);
    }
  }
  if (G(a))
    Rn(a, l, 12, [i, u]);
  else {
    const M = ge(a), k = /* @__PURE__ */ Se(a);
    if (M || k) {
      const K = () => {
        if (e.f) {
          const I = M ? w(a) ? p[a] : u[a] : E() || !e.k ? a.value : u[e.k];
          if (o)
            N(I) && wo(I, s);
          else if (N(I))
            I.includes(s) || I.push(s);
          else if (M)
            u[a] = [s], w(a) && (p[a] = u[a]);
          else {
            const F = [s];
            E(a, e.k) && (a.value = F), e.k && (u[e.k] = F);
          }
        } else M ? (u[a] = i, w(a) && (p[a] = i)) : k && (E(a, e.k) && (a.value = i), e.k && (u[e.k] = i));
      };
      if (i) {
        const I = () => {
          K(), Qn.delete(e);
        };
        I.id = -1, Qn.set(e, I), De(I, n);
      } else
        Jo(e), K();
    }
  }
}
function Jo(e) {
  const t = Qn.get(e);
  t && (t.flags |= 8, Qn.delete(e));
}
cr().requestIdleCallback;
cr().cancelIdleCallback;
const dn = (e) => !!e.type.__asyncLoader, Po = (e) => e.type.__isKeepAlive;
function Ga(e, t) {
  Ri(e, "a", t);
}
function qa(e, t) {
  Ri(e, "da", t);
}
function Ri(e, t, n = Ae) {
  const r = e.__wdc || (e.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (hr(t, r, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      Po(o.parent.vnode) && za(r, t, n, o), o = o.parent;
  }
}
function za(e, t, n, r) {
  const o = hr(
    t,
    e,
    r,
    !0
    /* prepend */
  );
  Ii(() => {
    wo(r[t], o);
  }, n);
}
function hr(e, t, n = Ae, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), s = t.__weh || (t.__weh = (...i) => {
      it();
      const l = Cn(n), a = Ne(t, n, e, i);
      return l(), lt(), a;
    });
    return r ? o.unshift(s) : o.push(s), s;
  }
}
const ft = (e) => (t, n = Ae) => {
  (!bn || e === "sp") && hr(e, (...r) => t(...r), n);
}, Ya = ft("bm"), Ci = ft("m"), Xa = ft(
  "bu"
), Ja = ft("u"), Mi = ft(
  "bum"
), Ii = ft("um"), Za = ft(
  "sp"
), Qa = ft("rtg"), ec = ft("rtc");
function tc(e, t = Ae) {
  hr("ec", e, t);
}
const nc = /* @__PURE__ */ Symbol.for("v-ndc");
function Kn(e, t, n, r) {
  let o;
  const s = n, i = N(e);
  if (i || ge(e)) {
    const l = i && /* @__PURE__ */ Ot(e);
    let a = !1, c = !1;
    l && (a = !/* @__PURE__ */ Le(e), c = /* @__PURE__ */ at(e), e = fr(e)), o = new Array(e.length);
    for (let u = 0, p = e.length; u < p; u++)
      o[u] = t(
        a ? c ? Xt(Ve(e[u])) : Ve(e[u]) : e[u],
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
const so = (e) => e ? Yi(e) ? Do(e) : so(e.parent) : null, pn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ xe(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => so(e.parent),
    $root: (e) => so(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Oi(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Eo(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = oo.bind(e.proxy)),
    $watch: (e) => Ba.bind(e)
  })
), Vr = (e, t) => e !== le && !e.__isScriptSetup && te(e, t), rc = {
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
        if (Vr(r, t))
          return i[t] = 1, r[t];
        if (o !== le && te(o, t))
          return i[t] = 2, o[t];
        if (te(s, t))
          return i[t] = 3, s[t];
        if (n !== le && te(n, t))
          return i[t] = 4, n[t];
        io && (i[t] = 0);
      }
    }
    const c = pn[t];
    let u, p;
    if (c)
      return t === "$attrs" && _e(e.attrs, "get", ""), c(e);
    if (
      // css module (injected by vue-loader)
      (u = l.__cssModules) && (u = u[t])
    )
      return u;
    if (n !== le && te(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      p = a.config.globalProperties, te(p, t)
    )
      return p[t];
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: o, ctx: s } = e;
    return Vr(o, t) ? (o[t] = n, !0) : r !== le && te(r, t) ? (r[t] = n, !0) : te(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (s[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: o, props: s, type: i }
  }, l) {
    let a;
    return !!(n[l] || e !== le && l[0] !== "$" && te(e, l) || Vr(t, l) || te(s, l) || te(r, l) || te(pn, l) || te(o.config.globalProperties, l) || (a = i.__cssModules) && a[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : te(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function Zo(e) {
  return N(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let io = !0;
function oc(e) {
  const t = Oi(e), n = e.proxy, r = e.ctx;
  io = !1, t.beforeCreate && Qo(t.beforeCreate, e, "bc");
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
    updated: E,
    activated: M,
    deactivated: k,
    beforeDestroy: K,
    beforeUnmount: I,
    destroyed: F,
    unmounted: P,
    render: B,
    renderTracked: W,
    renderTriggered: U,
    errorCaptured: V,
    serverPrefetch: D,
    // public API
    expose: z,
    inheritAttrs: ae,
    // assets
    components: oe,
    directives: me,
    filters: Re
  } = t;
  if (c && sc(c, r, null), i)
    for (const J in i) {
      const X = i[J];
      G(X) && (r[J] = X.bind(n));
    }
  if (o) {
    const J = o.call(n, n);
    ne(J) && (e.data = /* @__PURE__ */ dr(J));
  }
  if (io = !0, s)
    for (const J in s) {
      const X = s[J], ke = G(X) ? X.bind(n, n) : G(X.get) ? X.get.bind(n, n) : Je, dt = !G(X) && G(X.set) ? X.set.bind(n) : Je, Qe = Q({
        get: ke,
        set: dt
      });
      Object.defineProperty(r, J, {
        enumerable: !0,
        configurable: !0,
        get: () => Qe.value,
        set: (he) => Qe.value = he
      });
    }
  if (l)
    for (const J in l)
      Ei(l[J], r, n, J);
  if (a) {
    const J = G(a) ? a.call(n) : a;
    Reflect.ownKeys(J).forEach((X) => {
      $a(X, J[X]);
    });
  }
  u && Qo(u, e, "c");
  function se(J, X) {
    N(X) ? X.forEach((ke) => J(ke.bind(n))) : X && J(X.bind(n));
  }
  if (se(Ya, p), se(Ci, v), se(Xa, w), se(Ja, E), se(Ga, M), se(qa, k), se(tc, V), se(ec, W), se(Qa, U), se(Mi, I), se(Ii, P), se(Za, D), N(z))
    if (z.length) {
      const J = e.exposed || (e.exposed = {});
      z.forEach((X) => {
        Object.defineProperty(J, X, {
          get: () => n[X],
          set: (ke) => n[X] = ke,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  B && e.render === Je && (e.render = B), ae != null && (e.inheritAttrs = ae), oe && (e.components = oe), me && (e.directives = me), D && xi(e);
}
function sc(e, t, n = Je) {
  N(e) && (e = lo(e));
  for (const r in e) {
    const o = e[r];
    let s;
    ne(o) ? "default" in o ? s = Un(
      o.from || r,
      o.default,
      !0
    ) : s = Un(o.from || r) : s = Un(o), /* @__PURE__ */ Se(s) ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (i) => s.value = i
    }) : t[r] = s;
  }
}
function Qo(e, t, n) {
  Ne(
    N(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Ei(e, t, n, r) {
  let o = r.includes(".") ? _i(n, r) : () => n[r];
  if (ge(e)) {
    const s = t[e];
    G(s) && Ee(o, s);
  } else if (G(e))
    Ee(o, e.bind(n));
  else if (ne(e))
    if (N(e))
      e.forEach((s) => Ei(s, t, n, r));
    else {
      const s = G(e.handler) ? e.handler.bind(n) : t[e.handler];
      G(s) && Ee(o, s, e);
    }
}
function Oi(e) {
  const t = e.type, { mixins: n, extends: r } = t, {
    mixins: o,
    optionsCache: s,
    config: { optionMergeStrategies: i }
  } = e.appContext, l = s.get(t);
  let a;
  return l ? a = l : !o.length && !n && !r ? a = t : (a = {}, o.length && o.forEach(
    (c) => er(a, c, i, !0)
  ), er(a, t, i)), ne(t) && s.set(t, a), a;
}
function er(e, t, n, r = !1) {
  const { mixins: o, extends: s } = t;
  s && er(e, s, n, !0), o && o.forEach(
    (i) => er(e, i, n, !0)
  );
  for (const i in t)
    if (!(r && i === "expose")) {
      const l = ic[i] || n && n[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const ic = {
  data: es,
  props: ts,
  emits: ts,
  // objects
  methods: sn,
  computed: sn,
  // lifecycle
  beforeCreate: Ie,
  created: Ie,
  beforeMount: Ie,
  mounted: Ie,
  beforeUpdate: Ie,
  updated: Ie,
  beforeDestroy: Ie,
  beforeUnmount: Ie,
  destroyed: Ie,
  unmounted: Ie,
  activated: Ie,
  deactivated: Ie,
  errorCaptured: Ie,
  serverPrefetch: Ie,
  // assets
  components: sn,
  directives: sn,
  // watch
  watch: ac,
  // provide / inject
  provide: es,
  inject: lc
};
function es(e, t) {
  return t ? e ? function() {
    return xe(
      G(e) ? e.call(this, this) : e,
      G(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function lc(e, t) {
  return sn(lo(e), lo(t));
}
function lo(e) {
  if (N(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Ie(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function sn(e, t) {
  return e ? xe(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function ts(e, t) {
  return e ? N(e) && N(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : xe(
    /* @__PURE__ */ Object.create(null),
    Zo(e),
    Zo(t ?? {})
  ) : t;
}
function ac(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = xe(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = Ie(e[r], t[r]);
  return n;
}
function Pi() {
  return {
    app: null,
    config: {
      isNativeTag: Bs,
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
let cc = 0;
function uc(e, t) {
  return function(r, o = null) {
    G(r) || (r = xe({}, r)), o != null && !ne(o) && (o = null);
    const s = Pi(), i = /* @__PURE__ */ new WeakSet(), l = [];
    let a = !1;
    const c = s.app = {
      _uid: cc++,
      _component: r,
      _props: o,
      _container: null,
      _context: s,
      _instance: null,
      version: Bc,
      get config() {
        return s.config;
      },
      set config(u) {
      },
      use(u, ...p) {
        return i.has(u) || (u && G(u.install) ? (i.add(u), u.install(c, ...p)) : G(u) && (i.add(u), u(c, ...p))), c;
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
          return w.appContext = s, v === !0 ? v = "svg" : v === !1 && (v = void 0), e(w, u, v), a = !0, c._container = u, u.__vue_app__ = c, Do(w.component);
        }
      },
      onUnmount(u) {
        l.push(u);
      },
      unmount() {
        a && (Ne(
          l,
          c._instance,
          16
        ), e(null, c._container), delete c._container.__vue_app__);
      },
      provide(u, p) {
        return s.provides[u] = p, c;
      },
      runWithContext(u) {
        const p = Yt;
        Yt = c;
        try {
          return u();
        } finally {
          Yt = p;
        }
      }
    };
    return c;
  };
}
let Yt = null;
const fc = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Ke(t)}Modifiers`] || e[`${jt(t)}Modifiers`];
function dc(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || le;
  let o = n;
  const s = t.startsWith("update:"), i = s && fc(r, t.slice(7));
  i && (i.trim && (o = n.map((u) => ge(u) ? u.trim() : u)), i.number && (o = o.map(ea)));
  let l, a = r[l = kr(t)] || // also try camelCase event handler (#2249)
  r[l = kr(Ke(t))];
  !a && s && (a = r[l = kr(jt(t))]), a && Ne(
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
    e.emitted[l] = !0, Ne(
      c,
      e,
      6,
      o
    );
  }
}
const pc = /* @__PURE__ */ new WeakMap();
function Ai(e, t, n = !1) {
  const r = n ? pc : t.emitsCache, o = r.get(e);
  if (o !== void 0)
    return o;
  const s = e.emits;
  let i = {}, l = !1;
  if (!G(e)) {
    const a = (c) => {
      const u = Ai(c, t, !0);
      u && (l = !0, xe(i, u));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !s && !l ? (ne(e) && r.set(e, null), null) : (N(s) ? s.forEach((a) => i[a] = null) : xe(i, s), ne(e) && r.set(e, i), i);
}
function mr(e, t) {
  return !e || !ir(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), te(e, t[0].toLowerCase() + t.slice(1)) || te(e, jt(t)) || te(e, t));
}
function ns(e) {
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
    ctx: E,
    inheritAttrs: M
  } = e, k = Zn(e);
  let K, I;
  try {
    if (n.shapeFlag & 4) {
      const P = o || r, B = P;
      K = ze(
        c.call(
          B,
          P,
          u,
          p,
          w,
          v,
          E
        )
      ), I = l;
    } else {
      const P = t;
      K = ze(
        P.length > 1 ? P(
          p,
          { attrs: l, slots: i, emit: a }
        ) : P(
          p,
          null
        )
      ), I = t.props ? l : gc(l);
    }
  } catch (P) {
    At.length = 0, pr(P, e, 1), K = st(ct);
  }
  let F = K;
  if (I && M !== !1) {
    const P = Object.keys(I), { shapeFlag: B } = F;
    P.length && B & 7 && (s && P.some(lr) && (I = hc(
      I,
      s
    )), F = Jt(F, I, !1, !0));
  }
  if (n.dirs && (F = Jt(F, null, !1, !0), F.dirs = F.dirs ? F.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const P = gr(F.type) && Si(F) || F;
    Oo(P, n.transition);
  }
  return K = F, Zn(k), K;
}
const gc = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || ir(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, hc = (e, t) => {
  const n = {};
  for (const r in e)
    (!lr(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
  return n;
};
function mc(e, t, n) {
  const { props: r, children: o, component: s } = e, { props: i, children: l, patchFlag: a } = t, c = s.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return r ? rs(r, i, c) : !!i;
    if (a & 8) {
      const u = t.dynamicProps;
      for (let p = 0; p < u.length; p++) {
        const v = u[p];
        if (Ti(i, r, v) && !mr(c, v))
          return !0;
      }
    }
  } else
    return (o || l) && (!l || !l.$stable) ? !0 : r === i ? !1 : r ? i ? rs(r, i, c) : !0 : !!i;
  return !1;
}
function rs(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < r.length; o++) {
    const s = r[o];
    if (Ti(t, e, s) && !mr(n, s))
      return !0;
  }
  return !1;
}
function Ti(e, t, n) {
  const r = e[n], o = t[n];
  return n === "style" && ne(r) && ne(o) ? !ur(r, o) : r !== o;
}
function vc({ vnode: e, parent: t, suspense: n }, r) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.suspense.vnode.el = o.el = r, e = o), o === e)
      (e = t.vnode).el = r, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = r);
}
const Di = {}, ki = () => Object.create(Di), Fi = (e) => Object.getPrototypeOf(e) === Di;
function yc(e, t, n, r = !1) {
  const o = {}, s = ki();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), ji(e, t, o, s);
  for (const i in e.propsOptions[0])
    i in o || (o[i] = void 0);
  n ? e.props = r ? o : /* @__PURE__ */ Ia(o) : e.type.props ? e.props = o : e.props = s, e.attrs = s;
}
function wc(e, t, n, r) {
  const {
    props: o,
    attrs: s,
    vnode: { patchFlag: i }
  } = e, l = /* @__PURE__ */ ee(o), [a] = e.propsOptions;
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
        if (mr(e.emitsOptions, v))
          continue;
        const w = t[v];
        if (a)
          if (te(s, v))
            w !== s[v] && (s[v] = w, c = !0);
          else {
            const E = Ke(v);
            o[E] = ao(
              a,
              l,
              E,
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
    ji(e, t, o, s) && (c = !0);
    let u;
    for (const p in l)
      (!t || // for camelCase
      !te(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((u = jt(p)) === p || !te(t, u))) && (a ? n && // for camelCase
      (n[p] !== void 0 || // for kebab-case
      n[u] !== void 0) && (o[p] = ao(
        a,
        l,
        p,
        void 0,
        e,
        !0
      )) : delete o[p]);
    if (s !== l)
      for (const p in s)
        (!t || !te(t, p)) && (delete s[p], c = !0);
  }
  c && ot(e.attrs, "set", "");
}
function ji(e, t, n, r) {
  const [o, s] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let a in t) {
      if (an(a))
        continue;
      const c = t[a];
      let u;
      o && te(o, u = Ke(a)) ? !s || !s.includes(u) ? n[u] = c : (l || (l = {}))[u] = c : mr(e.emitsOptions, a) || (!(a in r) || c !== r[a]) && (r[a] = c, i = !0);
    }
  if (s) {
    const a = /* @__PURE__ */ ee(n), c = l || le;
    for (let u = 0; u < s.length; u++) {
      const p = s[u];
      n[p] = ao(
        o,
        a,
        p,
        c[p],
        e,
        !te(c, p)
      );
    }
  }
  return i;
}
function ao(e, t, n, r, o, s) {
  const i = e[n];
  if (i != null) {
    const l = te(i, "default");
    if (l && r === void 0) {
      const a = i.default;
      if (i.type !== Function && !i.skipFactory && G(a)) {
        const { propsDefaults: c } = o;
        if (n in c)
          r = c[n];
        else {
          const u = Cn(o);
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
    ] && (r === "" || r === jt(n)) && (r = !0));
  }
  return r;
}
const bc = /* @__PURE__ */ new WeakMap();
function Hi(e, t, n = !1) {
  const r = n ? bc : t.propsCache, o = r.get(e);
  if (o)
    return o;
  const s = e.props, i = {}, l = [];
  let a = !1;
  if (!G(e)) {
    const u = (p) => {
      a = !0;
      const [v, w] = Hi(p, t, !0);
      xe(i, v), w && l.push(...w);
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  if (!s && !a)
    return ne(e) && r.set(e, Gt), Gt;
  if (N(s))
    for (let u = 0; u < s.length; u++) {
      const p = Ke(s[u]);
      os(p) && (i[p] = le);
    }
  else if (s)
    for (const u in s) {
      const p = Ke(u);
      if (os(p)) {
        const v = s[u], w = i[p] = N(v) || G(v) ? { type: v } : xe({}, v), E = w.type;
        let M = !1, k = !0;
        if (N(E))
          for (let K = 0; K < E.length; ++K) {
            const I = E[K], F = G(I) && I.name;
            if (F === "Boolean") {
              M = !0;
              break;
            } else F === "String" && (k = !1);
          }
        else
          M = G(E) && E.name === "Boolean";
        w[
          0
          /* shouldCast */
        ] = M, w[
          1
          /* shouldCastTrue */
        ] = k, (M || te(w, "default")) && l.push(p);
      }
    }
  const c = [i, l];
  return ne(e) && r.set(e, c), c;
}
function os(e) {
  return e[0] !== "$" && !an(e);
}
const Ao = (e) => e === "_" || e === "_ctx" || e === "$stable", To = (e) => N(e) ? e.map(ze) : [ze(e)], _c = (e, t, n) => {
  if (t._n)
    return t;
  const r = Ka((...o) => To(t(...o)), n);
  return r._c = !1, r;
}, Li = (e, t, n) => {
  const r = e._ctx;
  for (const o in e) {
    if (Ao(o)) continue;
    const s = e[o];
    if (G(s))
      t[o] = _c(o, s, r);
    else if (s != null) {
      const i = To(s);
      t[o] = () => i;
    }
  }
}, Ki = (e, t) => {
  const n = To(t);
  e.slots.default = () => n;
}, $i = (e, t, n) => {
  for (const r in t)
    (n || !Ao(r)) && (e[r] = t[r]);
}, Sc = (e, t, n) => {
  const r = e.slots = ki();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? ($i(r, t, n), n && zs(r, "_", o, !0)) : Li(t, r);
  } else t && Ki(e, t);
}, xc = (e, t, n) => {
  const { vnode: r, slots: o } = e;
  let s = !0, i = le;
  if (r.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? s = !1 : $i(o, t, n) : (s = !t.$stable, Li(t, o)), i = t;
  } else t && (Ki(e, t), i = { default: 1 });
  if (s)
    for (const l in o)
      !Ao(l) && i[l] == null && delete o[l];
}, De = Ec;
function Rc(e) {
  return Cc(e);
}
function Cc(e, t) {
  const n = cr();
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
    setScopeId: w = Je,
    insertStaticContent: E
  } = e, M = (d, g, y, x = null, S = null, b = null, A = void 0, O = null, C = !!g.dynamicChildren) => {
    if (d === g)
      return;
    d && !rn(d, g) && (x = pt(d), he(d, S, b, !0), d = null), g.patchFlag === -2 && (C = !1, g.dynamicChildren = null);
    const { type: _, ref: H, shapeFlag: T } = g;
    switch (_) {
      case vr:
        k(d, g, y, x);
        break;
      case ct:
        K(d, g, y, x);
        break;
      case Br:
        d == null && I(g, y, x, A);
        break;
      case Pe:
        oe(
          d,
          g,
          y,
          x,
          S,
          b,
          A,
          O,
          C
        );
        break;
      default:
        T & 1 ? B(
          d,
          g,
          y,
          x,
          S,
          b,
          A,
          O,
          C
        ) : T & 6 ? me(
          d,
          g,
          y,
          x,
          S,
          b,
          A,
          O,
          C
        ) : (T & 64 || T & 128) && _.process(
          d,
          g,
          y,
          x,
          S,
          b,
          A,
          O,
          C,
          je
        );
    }
    H != null && S ? fn(H, d && d.ref, b, g || d, !g) : H == null && d && d.ref != null && fn(d.ref, null, b, d, !0);
  }, k = (d, g, y, x) => {
    if (d == null)
      r(
        g.el = l(g.children),
        y,
        x
      );
    else {
      const S = g.el = d.el;
      g.children !== d.children && c(S, g.children);
    }
  }, K = (d, g, y, x) => {
    d == null ? r(
      g.el = a(g.children || ""),
      y,
      x
    ) : g.el = d.el;
  }, I = (d, g, y, x) => {
    [d.el, d.anchor] = E(
      d.children,
      g,
      y,
      x,
      d.el,
      d.anchor
    );
  }, F = ({ el: d, anchor: g }, y, x) => {
    let S;
    for (; d && d !== g; )
      S = v(d), r(d, y, x), d = S;
    r(g, y, x);
  }, P = ({ el: d, anchor: g }) => {
    let y;
    for (; d && d !== g; )
      y = v(d), o(d), d = y;
    o(g);
  }, B = (d, g, y, x, S, b, A, O, C) => {
    if (g.type === "svg" ? A = "svg" : g.type === "math" && (A = "mathml"), d == null)
      W(
        g,
        y,
        x,
        S,
        b,
        A,
        O,
        C
      );
    else {
      const _ = d.el && d.el._isVueCE ? d.el : null;
      try {
        _ && _._beginPatch(), D(
          d,
          g,
          S,
          b,
          A,
          O,
          C
        );
      } finally {
        _ && _._endPatch();
      }
    }
  }, W = (d, g, y, x, S, b, A, O) => {
    let C, _;
    const { props: H, shapeFlag: T, transition: L, dirs: $ } = d;
    if (C = d.el = i(
      d.type,
      b,
      H && H.is,
      H
    ), T & 8 ? u(C, d.children) : T & 16 && V(
      d.children,
      C,
      null,
      x,
      S,
      Nr(d, b),
      A,
      O
    ), $ && Rt(d, null, x, "created"), U(C, d, d.scopeId, A, x), H) {
      for (const Y in H)
        Y !== "value" && !an(Y) && s(C, Y, null, H[Y], b, x);
      "value" in H && s(C, "value", null, H.value, b), (_ = H.onVnodeBeforeMount) && We(_, x, d);
    }
    $ && Rt(d, null, x, "beforeMount");
    const q = Mc(S, L);
    q && L.beforeEnter(C), r(C, g, y), ((_ = H && H.onVnodeMounted) || q || $) && De(() => {
      try {
        _ && We(_, x, d), q && L.enter(C), $ && Rt(d, null, x, "mounted");
      } finally {
      }
    }, S);
  }, U = (d, g, y, x, S) => {
    if (y && w(d, y), x)
      for (let b = 0; b < x.length; b++)
        w(d, x[b]);
    if (S) {
      let b = S.subTree;
      if (g === b || Wi(b.type) && (b.ssContent === g || b.ssFallback === g)) {
        const A = S.vnode;
        U(
          d,
          A,
          A.scopeId,
          A.slotScopeIds,
          S.parent
        );
      }
    }
  }, V = (d, g, y, x, S, b, A, O, C = 0) => {
    for (let _ = C; _ < d.length; _++) {
      const H = d[_] = O ? rt(d[_]) : ze(d[_]);
      M(
        null,
        H,
        g,
        y,
        x,
        S,
        b,
        A,
        O
      );
    }
  }, D = (d, g, y, x, S, b, A) => {
    const O = g.el = d.el;
    let { patchFlag: C, dynamicChildren: _, dirs: H } = g;
    C |= d.patchFlag & 16;
    const T = d.props || le, L = g.props || le;
    let $;
    if (y && Ct(y, !1), ($ = L.onVnodeBeforeUpdate) && We($, y, g, d), H && Rt(g, d, y, "beforeUpdate"), y && Ct(y, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    _ && (!d.dynamicChildren || d.dynamicChildren.length !== _.length) && (C = 0, A = !1, _ = null), (T.innerHTML && L.innerHTML == null || T.textContent && L.textContent == null) && u(O, ""), _ ? z(
      d.dynamicChildren,
      _,
      O,
      y,
      x,
      Nr(g, S),
      b
    ) : A || X(
      d,
      g,
      O,
      null,
      y,
      x,
      Nr(g, S),
      b,
      !1
    ), C > 0) {
      if (C & 16)
        ae(O, T, L, y, S);
      else if (C & 2 && T.class !== L.class && s(O, "class", null, L.class, S), C & 4 && s(O, "style", T.style, L.style, S), C & 8) {
        const q = g.dynamicProps;
        for (let Y = 0; Y < q.length; Y++) {
          const Z = q[Y], fe = T[Z], ce = L[Z];
          (ce !== fe || Z === "value") && s(O, Z, fe, ce, S, y);
        }
      }
      C & 1 && d.children !== g.children && u(O, g.children);
    } else !A && _ == null && ae(O, T, L, y, S);
    (($ = L.onVnodeUpdated) || H) && De(() => {
      $ && We($, y, g, d), H && Rt(g, d, y, "updated");
    }, x);
  }, z = (d, g, y, x, S, b, A) => {
    for (let O = 0; O < g.length; O++) {
      const C = d[O], _ = g[O], H = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        C.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (C.type === Pe || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !rn(C, _) || // - In the case of a component, it could contain anything.
        C.shapeFlag & 198) ? p(C.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          y
        )
      );
      M(
        C,
        _,
        H,
        null,
        x,
        S,
        b,
        A,
        !0
      );
    }
  }, ae = (d, g, y, x, S) => {
    if (g !== y) {
      if (g !== le)
        for (const b in g)
          !an(b) && !(b in y) && s(
            d,
            b,
            g[b],
            null,
            S,
            x
          );
      for (const b in y) {
        if (an(b)) continue;
        const A = y[b], O = g[b];
        A !== O && b !== "value" && s(d, b, O, A, S, x);
      }
      "value" in y && s(d, "value", g.value, y.value, S);
    }
  }, oe = (d, g, y, x, S, b, A, O, C) => {
    const _ = g.el = d ? d.el : l(""), H = g.anchor = d ? d.anchor : l("");
    let { patchFlag: T, dynamicChildren: L, slotScopeIds: $ } = g;
    $ && (O = O ? O.concat($) : $), d == null ? (r(_, y, x), r(H, y, x), V(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      g.children || [],
      y,
      H,
      S,
      b,
      A,
      O,
      C
    )) : T > 0 && T & 64 && L && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    d.dynamicChildren && d.dynamicChildren.length === L.length ? (z(
      d.dynamicChildren,
      L,
      y,
      S,
      b,
      A,
      O
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (g.key != null || S && g === S.subTree) && Vi(
      d,
      g,
      !0
      /* shallow */
    )) : X(
      d,
      g,
      y,
      H,
      S,
      b,
      A,
      O,
      C
    );
  }, me = (d, g, y, x, S, b, A, O, C) => {
    g.slotScopeIds = O, d == null ? g.shapeFlag & 512 ? S.ctx.activate(
      g,
      y,
      x,
      A,
      C
    ) : Re(
      g,
      y,
      x,
      S,
      b,
      A,
      C
    ) : be(d, g, C);
  }, Re = (d, g, y, x, S, b, A) => {
    const O = d.component = jc(
      d,
      x,
      S
    );
    if (Po(d) && (O.ctx.renderer = je), Lc(O, !1, A), O.asyncDep) {
      if (S && S.registerDep(O, se, A), !d.el) {
        const C = O.subTree = st(ct);
        K(null, C, g, y), d.placeholder = C.el;
      }
    } else
      se(
        O,
        d,
        g,
        y,
        S,
        b,
        A
      );
  }, be = (d, g, y) => {
    const x = g.component = d.component;
    if (mc(d, g, y))
      if (x.asyncDep && !x.asyncResolved) {
        J(x, g, y);
        return;
      } else
        x.next = g, x.update();
    else
      g.el = d.el, x.vnode = g;
  }, se = (d, g, y, x, S, b, A) => {
    const O = () => {
      if (d.isMounted) {
        let { next: T, bu: L, u: $, parent: q, vnode: Y } = d;
        {
          const Me = Ni(d);
          if (Me) {
            T && (T.el = Y.el, J(d, T, A)), Me.asyncDep.then(() => {
              De(() => {
                d.isUnmounted || _();
              }, S);
            });
            return;
          }
        }
        let Z = T, fe;
        Ct(d, !1), T ? (T.el = Y.el, J(d, T, A)) : T = Y, L && Fr(L), (fe = T.props && T.props.onVnodeBeforeUpdate) && We(fe, q, T, Y), Ct(d, !0);
        const ce = ns(d), Ce = d.subTree;
        d.subTree = ce, M(
          Ce,
          ce,
          // parent may have changed if it's in a teleport
          p(Ce.el),
          // anchor may have changed if it's in a fragment
          pt(Ce),
          d,
          S,
          b
        ), T.el = ce.el, Z === null && vc(d, ce.el), $ && De($, S), (fe = T.props && T.props.onVnodeUpdated) && De(
          () => We(fe, q, T, Y),
          S
        );
      } else {
        let T;
        const { el: L, props: $ } = g, { bm: q, m: Y, parent: Z, root: fe, type: ce } = d, Ce = dn(g);
        Ct(d, !1), q && Fr(q), !Ce && (T = $ && $.onVnodeBeforeMount) && We(T, Z, g), Ct(d, !0);
        {
          fe.ce && fe.ce._hasShadowRoot() && fe.ce._injectChildStyle(
            ce,
            d.parent ? d.parent.type : void 0
          );
          const Me = d.subTree = ns(d);
          M(
            null,
            Me,
            y,
            x,
            d,
            S,
            b
          ), g.el = Me.el;
        }
        if (Y && De(Y, S), !Ce && (T = $ && $.onVnodeMounted)) {
          const Me = g;
          De(
            () => We(T, Z, Me),
            S
          );
        }
        (g.shapeFlag & 256 || Z && dn(Z.vnode) && Z.vnode.shapeFlag & 256) && d.a && De(d.a, S), d.isMounted = !0, g = y = x = null;
      }
    };
    d.scope.on();
    const C = d.effect = new Qs(O);
    d.scope.off();
    const _ = d.update = C.run.bind(C), H = d.job = C.runIfDirty.bind(C);
    H.i = d, H.id = d.uid, C.scheduler = () => Eo(H), Ct(d, !0), _();
  }, J = (d, g, y) => {
    g.component = d;
    const x = d.vnode.props;
    d.vnode = g, d.next = null, wc(d, g.props, x, y), xc(d, g.children, y), it(), Yo(d), lt();
  }, X = (d, g, y, x, S, b, A, O, C = !1) => {
    const _ = d && d.children, H = d ? d.shapeFlag : 0, T = g.children, { patchFlag: L, shapeFlag: $ } = g;
    if (L > 0) {
      if (L & 128) {
        dt(
          _,
          T,
          y,
          x,
          S,
          b,
          A,
          O,
          C
        );
        return;
      } else if (L & 256) {
        ke(
          _,
          T,
          y,
          x,
          S,
          b,
          A,
          O,
          C
        );
        return;
      }
    }
    $ & 8 ? (H & 16 && Fe(_, S, b), T !== _ && u(y, T)) : H & 16 ? $ & 16 ? dt(
      _,
      T,
      y,
      x,
      S,
      b,
      A,
      O,
      C
    ) : Fe(_, S, b, !0) : (H & 8 && u(y, ""), $ & 16 && V(
      T,
      y,
      x,
      S,
      b,
      A,
      O,
      C
    ));
  }, ke = (d, g, y, x, S, b, A, O, C) => {
    d = d || Gt, g = g || Gt;
    const _ = d.length, H = g.length, T = Math.min(_, H);
    let L;
    for (L = 0; L < T; L++) {
      const $ = g[L] = C ? rt(g[L]) : ze(g[L]);
      M(
        d[L],
        $,
        y,
        null,
        S,
        b,
        A,
        O,
        C
      );
    }
    _ > H ? Fe(
      d,
      S,
      b,
      !0,
      !1,
      T
    ) : V(
      g,
      y,
      x,
      S,
      b,
      A,
      O,
      C,
      T
    );
  }, dt = (d, g, y, x, S, b, A, O, C) => {
    let _ = 0;
    const H = g.length;
    let T = d.length - 1, L = H - 1;
    for (; _ <= T && _ <= L; ) {
      const $ = d[_], q = g[_] = C ? rt(g[_]) : ze(g[_]);
      if (rn($, q))
        M(
          $,
          q,
          y,
          null,
          S,
          b,
          A,
          O,
          C
        );
      else
        break;
      _++;
    }
    for (; _ <= T && _ <= L; ) {
      const $ = d[T], q = g[L] = C ? rt(g[L]) : ze(g[L]);
      if (rn($, q))
        M(
          $,
          q,
          y,
          null,
          S,
          b,
          A,
          O,
          C
        );
      else
        break;
      T--, L--;
    }
    if (_ > T) {
      if (_ <= L) {
        const $ = L + 1, q = $ < H ? g[$].el : x;
        for (; _ <= L; )
          M(
            null,
            g[_] = C ? rt(g[_]) : ze(g[_]),
            y,
            q,
            S,
            b,
            A,
            O,
            C
          ), _++;
      }
    } else if (_ > L)
      for (; _ <= T; )
        he(d[_], S, b, !0), _++;
    else {
      const $ = _, q = _, Y = /* @__PURE__ */ new Map();
      for (_ = q; _ <= L; _++) {
        const ye = g[_] = C ? rt(g[_]) : ze(g[_]);
        ye.key != null && Y.set(ye.key, _);
      }
      let Z, fe = 0;
      const ce = L - q + 1;
      let Ce = !1, Me = 0;
      const gt = new Array(ce);
      for (_ = 0; _ < ce; _++) gt[_] = 0;
      for (_ = $; _ <= T; _++) {
        const ye = d[_];
        if (fe >= ce) {
          he(ye, S, b, !0);
          continue;
        }
        let Te;
        if (ye.key != null)
          Te = Y.get(ye.key);
        else
          for (Z = q; Z <= L; Z++)
            if (gt[Z - q] === 0 && rn(ye, g[Z])) {
              Te = Z;
              break;
            }
        Te === void 0 ? he(ye, S, b, !0) : (gt[Te - q] = _ + 1, Te >= Me ? Me = Te : Ce = !0, M(
          ye,
          g[Te],
          y,
          null,
          S,
          b,
          A,
          O,
          C
        ), fe++);
      }
      const An = Ce ? Ic(gt) : Gt;
      for (Z = An.length - 1, _ = ce - 1; _ >= 0; _--) {
        const ye = q + _, Te = g[ye], Vt = g[ye + 1], St = ye + 1 < H ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Vt.el || Bi(Vt)
        ) : x;
        gt[_] === 0 ? M(
          null,
          Te,
          y,
          St,
          S,
          b,
          A,
          O,
          C
        ) : Ce && (Z < 0 || _ !== An[Z] ? Qe(Te, y, St, 2) : Z--);
      }
    }
  }, Qe = (d, g, y, x, S = null) => {
    const { el: b, type: A, transition: O, children: C, shapeFlag: _ } = d;
    if (_ & 6) {
      Qe(d.component.subTree, g, y, x);
      return;
    }
    if (_ & 128) {
      d.suspense.move(g, y, x);
      return;
    }
    if (_ & 64) {
      A.move(d, g, y, je);
      return;
    }
    if (A === Pe) {
      r(b, g, y);
      for (let T = 0; T < C.length; T++)
        Qe(C[T], g, y, x);
      r(d.anchor, g, y);
      return;
    }
    if (A === Br) {
      F(d, g, y);
      return;
    }
    if (x !== 2 && _ & 1 && O)
      if (x === 0)
        O.persisted && !b[$r] ? r(b, g, y) : (O.beforeEnter(b), r(b, g, y), De(() => O.enter(b), S));
      else {
        const { leave: T, delayLeave: L, afterLeave: $ } = O, q = () => {
          d.ctx.isUnmounted ? o(b) : r(b, g, y);
        }, Y = () => {
          const Z = b._isLeaving || !!b[$r];
          b._isLeaving && b[$r](
            !0
            /* cancelled */
          ), O.persisted && !Z ? q() : T(b, () => {
            q(), $ && $();
          });
        };
        L ? L(b, q, Y) : Y();
      }
    else
      r(b, g, y);
  }, he = (d, g, y, x = !1, S = !1) => {
    const {
      type: b,
      props: A,
      ref: O,
      children: C,
      dynamicChildren: _,
      shapeFlag: H,
      patchFlag: T,
      dirs: L,
      cacheIndex: $,
      memo: q
    } = d;
    if (T === -2 && (S = !1), O != null && (it(), fn(O, null, y, d, !0), lt()), $ != null && (g.renderCache[$] = void 0), H & 256) {
      g.ctx.deactivate(d);
      return;
    }
    const Y = H & 1 && L, Z = !dn(d);
    let fe;
    if (Z && (fe = A && A.onVnodeBeforeUnmount) && We(fe, g, d), H & 6)
      Kt(d.component, y, x);
    else {
      if (H & 128) {
        d.suspense.unmount(y, x);
        return;
      }
      Y && Rt(d, null, g, "beforeUnmount"), H & 64 ? d.type.remove(
        d,
        g,
        y,
        je,
        x
      ) : _ && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !_.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (b !== Pe || T > 0 && T & 64) ? Fe(
        _,
        g,
        y,
        !1,
        !0
      ) : (b === Pe && T & 384 || !S && H & 16) && Fe(C, g, y), x && _t(d);
    }
    const ce = q != null && $ == null;
    (Z && (fe = A && A.onVnodeUnmounted) || Y || ce) && De(() => {
      fe && We(fe, g, d), Y && Rt(d, null, g, "unmounted"), ce && (d.el = null);
    }, y);
  }, _t = (d) => {
    const { type: g, el: y, anchor: x, transition: S } = d;
    if (g === Pe) {
      Mr(y, x);
      return;
    }
    if (g === Br) {
      P(d);
      return;
    }
    const b = () => {
      o(y), S && !S.persisted && S.afterLeave && S.afterLeave();
    };
    if (d.shapeFlag & 1 && S && !S.persisted) {
      const { leave: A, delayLeave: O } = S, C = () => A(y, b);
      O ? O(d.el, b, C) : C();
    } else
      b();
  }, Mr = (d, g) => {
    let y;
    for (; d !== g; )
      y = v(d), o(d), d = y;
    o(g);
  }, Kt = (d, g, y) => {
    const { bum: x, scope: S, job: b, subTree: A, um: O, m: C, a: _ } = d;
    ss(C), ss(_), x && Fr(x), S.stop(), b && (b.flags |= 8, he(A, d, g, y)), O && De(O, g), De(() => {
      d.isUnmounted = !0;
    }, g);
  }, Fe = (d, g, y, x = !1, S = !1, b = 0) => {
    for (let A = b; A < d.length; A++)
      he(d[A], g, y, x, S);
  }, pt = (d) => {
    if (d.shapeFlag & 6)
      return pt(d.component.subTree);
    if (d.shapeFlag & 128)
      return d.suspense.next();
    const g = v(d.anchor || d.el), y = g && g[Wa];
    return y ? v(y) : g;
  };
  let $t = !1;
  const On = (d, g, y) => {
    let x;
    d == null ? g._vnode && (he(g._vnode, null, null, !0), x = g._vnode.component) : M(
      g._vnode || null,
      d,
      g,
      null,
      null,
      null,
      y
    ), g._vnode = d, $t || ($t = !0, Yo(x), vi(), $t = !1);
  }, je = {
    p: M,
    um: he,
    m: Qe,
    r: _t,
    mt: Re,
    mc: V,
    pc: X,
    pbc: z,
    n: pt,
    o: e
  };
  return {
    render: On,
    hydrate: void 0,
    createApp: uc(On)
  };
}
function Nr({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Ct({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Mc(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Vi(e, t, n = !1) {
  const r = e.children, o = t.children;
  if (N(r) && N(o))
    for (let s = 0; s < r.length; s++) {
      const i = r[s];
      let l = o[s];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = o[s] = rt(o[s]), l.el = i.el), !n && l.patchFlag !== -2 && Vi(i, l)), l.type === vr && (l.patchFlag === -1 && (l = o[s] = rt(l)), l.el = i.el), l.type === ct && !l.el && (l.el = i.el);
    }
}
function Ic(e) {
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
function Ni(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Ni(t);
}
function ss(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function Bi(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? Bi(t.subTree) : null;
}
const Wi = (e) => e.__isSuspense;
function Ec(e, t) {
  t && t.pendingBranch ? N(e) ? t.effects.push(...e) : t.effects.push(e) : La(e);
}
const Pe = /* @__PURE__ */ Symbol.for("v-fgt"), vr = /* @__PURE__ */ Symbol.for("v-txt"), ct = /* @__PURE__ */ Symbol.for("v-cmt"), Br = /* @__PURE__ */ Symbol.for("v-stc"), At = [];
let He = null;
function de(e = !1) {
  At.push(He = e ? null : []);
}
function Ui() {
  At.pop(), He = At[At.length - 1] || null;
}
let yn = 1;
function is(e, t = !1) {
  yn += e, e < 0 && He && t && (He.hasOnce = !0);
}
function Gi(e) {
  return e.dynamicChildren = yn > 0 ? He || Gt : null, Ui(), yn > 0 && He && He.push(e), e;
}
function pe(e, t, n, r, o, s) {
  return Gi(
    Ge(
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
function Oc(e, t, n, r, o) {
  return Gi(
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
function qi(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function rn(e, t) {
  return e.type === t.type && e.key === t.key;
}
const zi = ({ key: e }) => e ?? null, Gn = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? ge(e) || /* @__PURE__ */ Se(e) || G(e) ? { i: Xe, r: e, k: t, f: !!n } : e : null);
function Ge(e, t = null, n = null, r = 0, o = null, s = e === Pe ? 0 : 1, i = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && zi(t),
    ref: t && Gn(t),
    scopeId: wi,
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
    ctx: Xe
  };
  return l ? (tr(a, n), s & 128 && e.normalize(a)) : n && (a.shapeFlag |= ge(n) ? 8 : 16), yn > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  He && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && He.push(a), a;
}
const st = Pc;
function Pc(e, t = null, n = null, r = 0, o = null, s = !1) {
  if ((!e || e === nc) && (e = ct), qi(e)) {
    const l = Jt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && tr(l, n), yn > 0 && !s && He && (l.shapeFlag & 6 ? He[He.indexOf(e)] = l : He.push(l)), l.patchFlag = -2, l;
  }
  if (Nc(e) && (e = e.__vccOpts), t) {
    t = Ac(t);
    let { class: l, style: a } = t;
    l && !ge(l) && (t.class = It(l)), ne(a) && (/* @__PURE__ */ Io(a) && !N(a) && (a = xe({}, a)), t.style = qt(a));
  }
  const i = ge(e) ? 1 : Wi(e) ? 128 : gr(e) ? 64 : ne(e) ? 4 : G(e) ? 2 : 0;
  return Ge(
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
function Ac(e) {
  return e ? /* @__PURE__ */ Io(e) || Fi(e) ? xe({}, e) : e : null;
}
function Jt(e, t, n = !1, r = !1) {
  const { props: o, ref: s, patchFlag: i, children: l, transition: a } = e, c = t ? Dc(o || {}, t) : o, u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && zi(c),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && s ? N(s) ? s.concat(Gn(t)) : [s, Gn(t)] : Gn(t)
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
    patchFlag: t && e.type !== Pe ? i === -1 ? 16 : i | 16 : i,
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
    ssContent: e.ssContent && Jt(e.ssContent),
    ssFallback: e.ssFallback && Jt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return a && r && Oo(
    u,
    a.clone(u)
  ), u;
}
function Tc(e = " ", t = 0) {
  return st(vr, null, e, t);
}
function Bt(e = "", t = !1) {
  return t ? (de(), Oc(ct, null, e)) : st(ct, null, e);
}
function ze(e) {
  return e == null || typeof e == "boolean" ? st(ct) : N(e) ? st(
    Pe,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : qi(e) ? rt(e) : st(vr, null, String(e));
}
function rt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Jt(e);
}
function tr(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (N(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), tr(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !Fi(t) ? t._ctx = Xe : o === 3 && Xe && (Xe.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (G(t)) {
    if (r & 65) {
      tr(e, { default: t });
      return;
    }
    t = { default: t, _ctx: Xe }, n = 32;
  } else
    t = String(t), r & 64 ? (n = 16, t = [Tc(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function Dc(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === "class")
        t.class !== r.class && (t.class = It([t.class, r.class]));
      else if (o === "style")
        t.style = qt([t.style, r.style]);
      else if (ir(o)) {
        const s = t[o], i = r[o];
        i && s !== i && !(N(s) && s.includes(i)) ? t[o] = s ? [].concat(s, i) : i : i == null && s == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !lr(o) && (t[o] = i);
      } else o !== "" && (t[o] = r[o]);
  }
  return t;
}
function We(e, t, n, r = null) {
  Ne(e, t, 7, [
    n,
    r
  ]);
}
const kc = Pi();
let Fc = 0;
function jc(e, t, n) {
  const r = e.type, o = (t ? t.appContext : e.appContext) || kc, s = {
    uid: Fc++,
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
    scope: new aa(
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
    propsOptions: Hi(r, o),
    emitsOptions: Ai(r, o),
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
  return s.ctx = { _: s }, s.root = t ? t.root : s, s.emit = dc.bind(null, s), e.ce && e.ce(s), s;
}
let Ae = null;
const Hc = () => Ae || Xe;
let nr, wn;
{
  const e = cr(), t = (n, r) => {
    let o;
    return (o = e[n]) || (o = e[n] = []), o.push(r), (s) => {
      o.length > 1 ? o.forEach((i) => i(s)) : o[0](s);
    };
  };
  nr = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Ae = n
  ), wn = t(
    "__VUE_SSR_SETTERS__",
    (n) => bn = n
  );
}
const Cn = (e) => {
  const t = Ae;
  return nr(e), e.scope.on(), () => {
    e.scope.off(), nr(t);
  };
}, ls = () => {
  Ae && Ae.scope.off(), nr(null);
};
function Yi(e) {
  return e.vnode.shapeFlag & 4;
}
let bn = !1;
function Lc(e, t = !1, n = !1) {
  t && wn(t);
  const { props: r, children: o } = e.vnode, s = Yi(e);
  yc(e, r, s, t), Sc(e, o, n || t);
  const i = s ? Kc(e, t) : void 0;
  return t && wn(!1), i;
}
function Kc(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, rc);
  const { setup: r } = n;
  if (r) {
    it();
    const o = e.setupContext = r.length > 1 ? Vc(e) : null, s = Cn(e), i = Rn(
      r,
      e,
      0,
      [
        e.props,
        o
      ]
    ), l = Ws(i);
    if (lt(), s(), (l || e.sp) && !dn(e) && xi(e), l) {
      if (i.then(ls, ls), t)
        return i.then((a) => {
          wn(!0);
          try {
            as(e, a, t);
          } finally {
            wn(!1);
          }
        }).catch((a) => {
          pr(a, e, 0);
        });
      e.asyncDep = i;
    } else
      as(e, i);
  } else
    Xi(e);
}
function as(e, t, n) {
  G(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ne(t) && (e.setupState = gi(t)), Xi(e);
}
function Xi(e, t, n) {
  const r = e.type;
  e.render || (e.render = r.render || Je);
  {
    const o = Cn(e);
    it();
    try {
      oc(e);
    } finally {
      lt(), o();
    }
  }
}
const $c = {
  get(e, t) {
    return _e(e, "get", ""), e[t];
  }
};
function Vc(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, $c),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Do(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(gi(Ea(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in pn)
        return pn[n](e);
    },
    has(t, n) {
      return n in t || n in pn;
    }
  })) : e.proxy;
}
function Nc(e) {
  return G(e) && "__vccOpts" in e;
}
const Q = (e, t) => /* @__PURE__ */ Da(e, t, bn), Bc = "3.5.42";
/**
* @vue/runtime-dom v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let co;
const cs = typeof window < "u" && window.trustedTypes;
if (cs)
  try {
    co = /* @__PURE__ */ cs.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Ji = co ? (e) => co.createHTML(e) : (e) => e, Wc = "http://www.w3.org/2000/svg", Uc = "http://www.w3.org/1998/Math/MathML", nt = typeof document < "u" ? document : null, us = nt && /* @__PURE__ */ nt.createElement("template"), Gc = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const o = t === "svg" ? nt.createElementNS(Wc, e) : t === "mathml" ? nt.createElementNS(Uc, e) : n ? nt.createElement(e, { is: n }) : nt.createElement(e);
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
      us.innerHTML = Ji(
        r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e
      );
      const l = us.content;
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
}, qc = /* @__PURE__ */ Symbol("_vtc");
function zc(e, t, n) {
  const r = e[qc];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const fs = /* @__PURE__ */ Symbol("_vod"), Yc = /* @__PURE__ */ Symbol("_vsh"), Xc = /* @__PURE__ */ Symbol(""), Jc = /(?:^|;)\s*display\s*:/;
function Zc(e, t, n) {
  const r = e.style, o = ge(n);
  let s = !1;
  if (n && !o) {
    if (t)
      if (ge(t))
        for (const i of t.split(";")) {
          const l = i.slice(0, i.indexOf(":")).trim();
          n[l] == null && ln(r, l, "");
        }
      else
        for (const i in t)
          n[i] == null && ln(r, i, "");
    for (const i in n) {
      i === "display" && (s = !0);
      const l = n[i];
      l != null ? eu(
        e,
        i,
        !ge(t) && t ? t[i] : void 0,
        l
      ) || ln(r, i, l) : ln(r, i, "");
    }
  } else if (o) {
    if (t !== n) {
      const i = r[Xc];
      i && (n += ";" + i), r.cssText = n, s = Jc.test(n);
    }
  } else t && e.removeAttribute("style");
  fs in e && (e[fs] = s ? r.display : "", e[Yc] && (r.display = "none"));
}
const $n = /\s*!important$/;
function ln(e, t, n) {
  if (N(n))
    n.forEach((r) => ln(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--"))
    $n.test(n) ? e.setProperty(t, n.replace($n, ""), "important") : e.setProperty(t, n);
  else {
    const r = Qc(e, t);
    $n.test(n) ? e.setProperty(
      jt(r),
      n.replace($n, ""),
      "important"
    ) : e[r] = n;
  }
}
const ds = ["Webkit", "Moz", "ms"], Wr = {};
function Qc(e, t) {
  const n = Wr[t];
  if (n)
    return n;
  let r = Ke(t);
  if (r !== "filter" && r in e)
    return Wr[t] = r;
  r = qs(r);
  for (let o = 0; o < ds.length; o++) {
    const s = ds[o] + r;
    if (s in e)
      return Wr[t] = s;
  }
  return t;
}
function eu(e, t, n, r) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && ge(r) && n === r;
}
const ps = "http://www.w3.org/1999/xlink";
function gs(e, t, n, r, o, s = ia(t)) {
  r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(ps, t.slice(6, t.length)) : e.setAttributeNS(ps, t, n) : n == null || s && !Ys(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    s ? "" : Ze(n) ? String(n) : n
  );
}
function hs(e, t, n, r, o) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Ji(n) : n);
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
    l === "boolean" ? n = Ys(n) : n == null && l === "string" ? (n = "", i = !0) : l === "number" && (n = 0, i = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  i && e.removeAttribute(o || t);
}
function tu(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function nu(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const ms = /* @__PURE__ */ Symbol("_vei");
function ru(e, t, n, r, o = null) {
  const s = e[ms] || (e[ms] = {}), i = s[t];
  if (r && i)
    i.value = r;
  else {
    const [l, a] = iu(t);
    if (r) {
      const c = s[t] = cu(
        r,
        o
      );
      tu(e, l, c, a);
    } else i && (nu(e, l, i, a), s[t] = void 0);
  }
}
const ou = /(Once|Passive|Capture)$/, su = /^on:?(?:Once|Passive|Capture)$/;
function iu(e) {
  let t, n;
  for (; (n = e.match(ou)) && !su.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : jt(e.slice(2)), t];
}
let Ur = 0;
const lu = /* @__PURE__ */ Promise.resolve(), au = () => Ur || (lu.then(() => Ur = 0), Ur = Date.now());
function cu(e, t) {
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
        c && Ne(
          c,
          t,
          5,
          l
        );
      }
    } else
      Ne(
        o,
        t,
        5,
        [r]
      );
  };
  return n.value = e, n.attached = au(), n;
}
const vs = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, uu = (e, t, n, r, o, s) => {
  const i = o === "svg";
  t === "class" ? zc(e, r, i) : t === "style" ? Zc(e, n, r) : ir(t) ? lr(t) || ru(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : fu(e, t, r, i)) ? (hs(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && gs(e, t, r, i, s, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (du(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !ge(r))) ? hs(e, Ke(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), gs(e, t, r, i));
};
function fu(e, t, n, r) {
  if (r)
    return !!(t === "innerHTML" || t === "textContent" || t in e && vs(t) && G(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return vs(t) && ge(n) ? !1 : t in e;
}
function du(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const r = Ke(t);
  return Array.isArray(n) ? n.some((o) => Ke(o) === r) : Object.keys(n).some((o) => Ke(o) === r);
}
const pu = ["ctrl", "shift", "alt", "meta"], gu = {
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
  exact: (e, t) => pu.some((n) => e[`${n}Key`] && !t.includes(n))
}, ys = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), r = t.join(".");
  return n[r] || (n[r] = (o, ...s) => {
    for (let i = 0; i < t.length; i++) {
      const l = gu[t[i]];
      if (l && l(o, t)) return;
    }
    return e(o, ...s);
  });
}, hu = /* @__PURE__ */ xe({ patchProp: uu }, Gc);
let ws;
function mu() {
  return ws || (ws = Rc(hu));
}
const vu = (...e) => {
  const t = mu().createApp(...e), { mount: n } = t;
  return t.mount = (r) => {
    const o = wu(r);
    if (!o) return;
    const s = t._component;
    !G(s) && !s.render && !s.template && (s.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const i = n(o, !1, yu(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), i;
  }, t;
};
function yu(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function wu(e) {
  return ge(e) ? document.querySelector(e) : e;
}
function Vn() {
  return !0;
}
const bu = Symbol("merge-proxy"), qn = Symbol("merge-proxy-sources"), _u = {
  get(e, t, n) {
    return t === bu ? n : t === qn ? e.sources : e.get(t);
  },
  has(e, t) {
    return e.has(t);
  },
  set: Vn,
  deleteProperty: Vn,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: Vn,
      deleteProperty: Vn
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function zn(e) {
  return e && typeof e == "object" && "value" in e ? e.value : e;
}
function uo(...e) {
  const t = e.flatMap((n) => typeof n == "object" && n !== null && qn in n && Array.isArray(n[qn]) ? n[qn] : [n]);
  return new Proxy({
    sources: t,
    get(n) {
      for (let r = t.length - 1; r >= 0; r--) {
        const o = zn(t[r])[n];
        if (o !== void 0) return o;
      }
    },
    has(n) {
      for (let r = t.length - 1; r >= 0; r--) if (n in zn(t[r])) return !0;
      return !1;
    },
    keys() {
      const n = [];
      for (const r of t) n.push(...Object.keys(zn(r)));
      return [...Array.from(new Set(n))];
    }
  }, _u);
}
function bs(...e) {
  const t = {};
  for (let n of e)
    if (n = zn(n), !!n)
      for (const r of Reflect.ownKeys(n)) {
        const o = n[r];
        o !== void 0 && (t[r] = o);
      }
  return t;
}
function Zi(e) {
  return typeof e == "function" ? e : (t) => {
    var n;
    return (n = e.next) == null ? void 0 : n.call(e, t);
  };
}
function Su(e) {
  return Object.assign(e, {
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: Ee(e, Zi(t), { flush: "sync" }) })
  });
}
function xu(e) {
  return Object.assign(e, {
    set: (t) => {
      e.value = typeof t == "function" ? t(e.value) : t;
    },
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: Ee(e, Zi(t), { flush: "sync" }) })
  });
}
function Ru() {
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
    createReadonlyAtom: (t, n) => Su(Q(() => t())),
    createWritableAtom: (t, n) => xu(/* @__PURE__ */ Oa(t)),
    untrack: (t) => t(),
    batch: (t) => t()
  };
}
function yr(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function bt(e) {
  if (Array.isArray(e)) return e.map(bt);
  if (e && typeof e == "object") {
    const t = Object.getPrototypeOf(e);
    if (t !== Object.prototype && t !== null) return e;
    const n = t === null ? re() : {}, r = Object.keys(e);
    for (let o = 0; o < r.length; o++) {
      const s = r[o];
      Object.defineProperty(n, s, {
        configurable: !0,
        enumerable: !0,
        value: bt(e[s]),
        writable: !0
      });
    }
    return n;
  }
  return e;
}
function Cu(e, t) {
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
function Zt(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Qi(e, t) {
  return (n) => {
    var r;
    (((r = t.options.atoms) == null ? void 0 : r[e]) ?? t.baseAtoms[e]).set((o) => yr(n, o));
  };
}
function _s(e) {
  if (typeof e != "object" || e === null) return !1;
  if (Array.isArray(e)) return !0;
  const t = Object.getPrototypeOf(e);
  return t === Object.prototype || t === null;
}
function Ss(e) {
  return Reflect.ownKeys(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
const Mu = 3;
function Iu(e, t) {
  return el(e, t, Mu);
}
function el(e, t, n) {
  if (Object.is(e, t)) return !0;
  if (n <= 0 || !_s(e) || !_s(t) || (Array.isArray(e) || Array.isArray(t)) && (!Array.isArray(e) || !Array.isArray(t) || e.length !== t.length))
    return !1;
  const r = Ss(e), o = Ss(t);
  if (r.length !== o.length) return !1;
  const s = e, i = t;
  for (let l = 0; l < r.length; l++) {
    const a = r[l];
    if (!Object.prototype.propertyIsEnumerable.call(t, a) || !el(s[a], i[a], n - 1)) return !1;
  }
  return !0;
}
function wr(e, t, n, r = Iu) {
  const o = `on${t.charAt(0).toUpperCase()}${t.slice(1)}Change`, s = e.options[o];
  s && s((i) => {
    const l = yr(n, i);
    return r(i, l) ? i : l;
  });
}
function Eu(e, t) {
  const n = [], r = (o) => {
    o.forEach((s) => {
      n.push(s);
      const i = t(s);
      i.length && r(i);
    });
  };
  return r(e), n;
}
const Ou = ({ fn: e, memoDeps: t, onAfterCompare: n, onAfterUpdate: r, onBeforeCompare: o, onBeforeUpdate: s }) => {
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
function Pu(e) {
  let t = !1;
  return () => {
    if (!t) {
      t = !0;
      return;
    }
    e();
  };
}
function br({ feature: e, fnName: t, objectId: n, onAfterUpdate: r, table: o, ...s }) {
  const i = () => {
    if (!r) return;
    const { schedule: a, untrack: c } = o._reactivity;
    a(() => c(() => r()));
  };
  return Ou({
    ...s,
    ...{ onAfterUpdate: () => {
      i();
    } }
  });
}
function tl(e, t = "_") {
  const [n, r] = e.split(t);
  return {
    fnKey: r,
    fnName: `${n}.${r}`,
    parentName: n
  };
}
function Ht(e, t, n) {
  for (const [r, { fn: o, memoDeps: s }] of Object.entries(n)) {
    const { fnKey: i, fnName: l } = tl(r);
    t[i] = s ? br({
      memoDeps: s,
      fn: o,
      fnName: l,
      table: t,
      feature: e
    }) : o;
  }
}
function Qt(e, t, n, r) {
  for (const [o, { fn: s, memoDeps: i }] of Object.entries(r)) {
    const { fnKey: l, fnName: a } = tl(o);
    if (i) {
      const c = `_memo_${l}`;
      t[l] = function(...u) {
        if (!this[c]) {
          const p = this;
          this[c] = br({
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
function we(e, t, n, ...r) {
  var o;
  return ((o = e[t]) == null ? void 0 : o.call(e, ...r)) ?? n(e, ...r);
}
function Au(e) {
  return e.row.getValue(e.column.id);
}
function Tu(e) {
  return e.getValue() ?? e.table.options.renderFallbackValue;
}
function Du(e) {
  return {
    table: e.table,
    column: e.column,
    row: e.row,
    cell: e,
    getValue: () => e.getValue(),
    renderValue: () => e.renderValue()
  };
}
const ku = { assignCellPrototype: (e, t) => {
  Qt("coreCellsFeature", e, t, {
    cell_getValue: { fn: (n) => Au(n) },
    cell_renderValue: { fn: (n) => Tu(n) },
    cell_getContext: {
      fn: (n) => Du(n),
      memoDeps: (n) => [n]
    }
  });
} };
function Fu(e) {
  var t, n;
  if (!e._headerPrototype) {
    e._headerPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignHeaderPrototype) == null || n.call(t, e._headerPrototype, e);
  }
  return e._headerPrototype;
}
function nl(e, t, n) {
  const r = Fu(e), o = Object.create(r);
  o.colSpan = 0, o.column = t, o.depth = n.depth, o.headerGroup = null, o.id = n.id ?? t.id, o.index = n.index, o.isPlaceholder = !!n.isPlaceholder, o.placeholderId = n.placeholderId, o.rowSpan = 0, o.subHeaders = [];
  const s = e._headerInstanceInitFns;
  for (let i = 0; i < s.length; i++) s[i](o);
  return o;
}
function ju() {
  return {
    start: [],
    end: []
  };
}
function Dt(e) {
  var r;
  const t = (r = e.table.atoms.columnVisibility) == null ? void 0 : r.get();
  if (!t) return !0;
  const n = e.columns;
  return n.length ? n.some((o) => we(o, "getIsVisible", Dt)) : (Zt(t, e.id) ? t[e.id] : void 0) ?? !0;
}
function Hu(e) {
  return e.getAllLeafColumns().filter((t) => we(t, "getIsVisible", Dt));
}
function rl(e, t = 1) {
  let n = t;
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    we(o, "getIsVisible", Dt) && o.columns.length && (n = Math.max(n, rl(o.columns, t + 1)));
  }
  return n;
}
function Lu(e, t) {
  return String(t);
}
function Ku(e, t, n, r) {
  let o = e ?? "";
  return t && (o = o ? `${o}_${t}` : String(t)), n && (o = o ? `${o}_${n}` : n), r && (o = o ? `${o}_${r}` : r), o;
}
function $u(e, t) {
  let n = 0;
  for (let r = 0; r < e.length; r++) e[r].column === t && n++;
  return n;
}
function ol(e, t, n, r, o, s) {
  const i = {
    depth: t,
    id: Lu(r, t),
    headers: []
  }, l = [];
  for (let a = 0; a < e.length; a++) {
    if (!(a in e)) continue;
    const c = e[a], u = l[l.length - 1], p = c.column.depth === i.depth;
    let v, w = !1;
    if (p && c.column.parent ? v = c.column.parent : (v = c.column, w = !0), u && u.column === v) u.subHeaders.push(c);
    else {
      const E = nl(n, v, {
        id: Ku(r, t, v.id, c.id),
        isPlaceholder: w,
        placeholderId: w ? String($u(l, v)) : void 0,
        depth: t,
        index: l.length
      });
      E.subHeaders.push(c), l.push(E);
    }
    i.headers.push(c), c.headerGroup = i;
  }
  for (let a = 0; a < s.length; a++) s[a](i);
  o.push(i), t > 0 && ol(l, t - 1, n, r, o, s);
}
function sl(e) {
  for (let t = 0; t < e.length; t++) {
    const n = e[t];
    if (!we(n.column, "getIsVisible", Dt)) continue;
    let r = 0;
    if (n.subHeaders.length) {
      sl(n.subHeaders);
      for (let o = 0; o < n.subHeaders.length; o++) {
        const s = n.subHeaders[o];
        we(s.column, "getIsVisible", Dt) && (r += s.colSpan);
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
function xs(e, t, n, r) {
  var a;
  const o = rl(e), s = [], i = n._headerGroupInstanceInitFns, l = new Array(t.length);
  for (let c = 0; c < t.length; c++)
    c in t && (l[c] = nl(n, t[c], {
      depth: o,
      index: c
    }));
  return ol(l, o - 1, n, r, s, i), s.reverse(), sl(((a = s[0]) == null ? void 0 : a.headers) ?? []), s;
}
function Vu(e) {
  var t, n;
  if (!e._columnPrototype) {
    e._columnPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignColumnPrototype) == null || n.call(t, e._columnPrototype, e);
  }
  return e._columnPrototype;
}
function Nu(e, t, n, r) {
  const o = {
    ...e.getDefaultColumnDef(),
    ...t
  }, s = o.accessorKey, i = s === void 0 ? void 0 : String(s), l = o.id ?? (i == null ? void 0 : i.replaceAll(".", "_")) ?? (typeof o.header == "string" ? o.header : void 0);
  let a;
  if (o.accessorFn) a = o.accessorFn;
  else if (s !== void 0) if (typeof s == "string" && s.includes(".")) {
    const v = s.split(".");
    a = (w) => {
      let E = w;
      for (let M = 0; M < v.length; M++) {
        const k = v[M];
        E = E == null ? void 0 : E[k];
      }
      return E;
    };
  } else a = (v) => v[o.accessorKey];
  if (!l)
    throw new Error();
  const c = Vu(e), u = Object.create(c);
  u.accessorFn = a, u.columnDef = o, u.columns = [], u.depth = n, u.id = `${String(l)}`, u.parent = r;
  const p = e._columnInstanceInitFns;
  for (let v = 0; v < p.length; v++) p[v](u);
  return u;
}
function il(e) {
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
    return Bu(e, o);
  };
}
function Bu(e, t) {
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
function Wu(e) {
  return [e, ...e.columns.flatMap((t) => t.getFlatColumns())];
}
function Uu(e) {
  if (e.columns.length) {
    const t = e.columns.flatMap((n) => n.getLeafColumns());
    return we(e.table, "getOrderColumns", il)(t);
  }
  return [e];
}
function Gu(e) {
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
function ll(e, t, n, r = 0) {
  const o = new Array(t.length);
  for (let s = 0; s < t.length; s++) {
    if (!(s in t)) continue;
    const i = t[s], l = Nu(e, i, r, n), a = i;
    l.columns = a.columns ? ll(e, a.columns, l, r + 1) : [], o[s] = l;
  }
  return o;
}
function qu(e) {
  return ll(e, e.options.columns);
}
function zu(e) {
  return e.getAllColumns().flatMap((t) => t.getFlatColumns());
}
function Yu(e) {
  const t = re(), n = e.getAllFlatColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function Xu(e) {
  const t = e.getAllColumns().flatMap((n) => n.getLeafColumns());
  return we(e, "getOrderColumns", il)(t);
}
function Ju(e) {
  const t = re(), n = e.getAllLeafColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function Zu(e, t) {
  return e.getAllFlatColumnsById()[t];
}
const Qu = {
  assignColumnPrototype: (e, t) => {
    Qt("coreColumnsFeature", e, t, {
      column_getFlatColumns: {
        fn: (n) => Wu(n),
        memoDeps: (n) => [n.table.options.columns]
      },
      column_getLeafColumns: {
        fn: (n) => Uu(n),
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
    Ht("coreColumnsFeature", e, {
      table_getDefaultColumnDef: {
        fn: () => Gu(e),
        memoDeps: () => [e.options.defaultColumn]
      },
      table_getAllColumns: {
        fn: () => qu(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumns: {
        fn: () => zu(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumnsById: {
        fn: () => Yu(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllLeafColumns: {
        fn: () => Xu(e),
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
        fn: () => Ju(e),
        memoDeps: () => [e.getAllLeafColumns()]
      },
      table_getColumn: { fn: (t) => Zu(e, t) }
    });
  }
};
function al(e, t) {
  for (let n = 0; n < e.subHeaders.length; n++) al(e.subHeaders[n], t);
  t.push(e);
}
function ef(e) {
  const t = [];
  return al(e, t), t;
}
function tf(e) {
  return {
    column: e.column,
    header: e,
    table: e.column.table
  };
}
function nf(e) {
  var c;
  const { start: t, end: n } = ((c = e.atoms.columnPinning) == null ? void 0 : c.get()) ?? ju(), r = e.getAllColumns(), o = we(e, "getVisibleLeafColumns", Hu);
  if (!t.length && !n.length) return xs(r, o, e);
  const s = e.getAllLeafColumnsById(), i = [];
  for (let u = 0; u < t.length; u++) {
    const p = s[t[u]];
    p && we(p, "getIsVisible", Dt) && i.push(p);
  }
  const l = [];
  for (let u = 0; u < n.length; u++) {
    const p = s[n[u]];
    p && we(p, "getIsVisible", Dt) && l.push(p);
  }
  const a = o.filter((u) => !t.includes(u.id) && !n.includes(u.id));
  return xs(r, [
    ...i,
    ...a,
    ...l
  ], e);
}
function rf(e) {
  return [...e.getHeaderGroups()].reverse();
}
function of(e) {
  const t = e.getHeaderGroups(), n = [];
  for (let r = 0; r < t.length; r++) {
    const o = t[r].headers;
    for (let s = 0; s < o.length; s++) n.push(o[s]);
  }
  return n;
}
function sf(e) {
  var r;
  const t = ((r = e.getHeaderGroups()[0]) == null ? void 0 : r.headers) ?? [], n = [];
  for (let o = 0; o < t.length; o++) {
    const s = t[o].getLeafHeaders();
    for (let i = 0; i < s.length; i++) n.push(s[i]);
  }
  return n;
}
const lf = {
  assignHeaderPrototype: (e, t) => {
    Qt("coreHeadersFeature", e, t, {
      header_getLeafHeaders: {
        fn: (n) => ef(n),
        memoDeps: (n) => [n.column.table.options.columns]
      },
      header_getContext: {
        fn: (n) => tf(n),
        memoDeps: (n) => [n.column.table.options.columns]
      }
    });
  },
  constructTableAPIs: (e) => {
    Ht("coreHeadersFeature", e, {
      table_getHeaderGroups: {
        fn: () => nf(e),
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
        fn: () => rf(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getFlatHeaders: {
        fn: () => of(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getLeafHeaders: {
        fn: () => sf(e),
        memoDeps: () => [e.getHeaderGroups()]
      }
    });
  }
};
function af(e) {
  var t, n;
  if (!e._rowPrototype) {
    e._rowPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignRowPrototype) == null || n.call(t, e._rowPrototype, e);
  }
  return e._rowPrototype;
}
const cf = (e, t, n, r, o, s, i) => {
  const l = af(e), a = Object.create(l);
  a._displayIndexCache = -1, a._uniqueValuesCache = re(), a._valuesCache = re(), a.depth = o, a.id = t, a.index = r, a.original = n, a.parentId = i, a.subRows = [];
  const c = e._rowInstanceInitFns;
  for (let u = 0; u < c.length; u++) c[u](a);
  return a;
};
function uf() {
  return [];
}
function ff(e, t) {
  wr(e, "cellSelection", bt(e.initialState.cellSelection) ?? uf());
}
function df(e) {
  e.atoms.cellSelection && (e.options.autoResetAll ?? e.options.autoResetCellSelection ?? !0) && e._reactivity.schedule(() => ff(e));
}
function pf() {
  return re();
}
function cl(e) {
  e.atoms.expanded && (e.options.autoResetAll ?? e.options.autoResetExpanded ?? !e.options.manualExpanding) && e._reactivity.schedule(() => fl(e));
}
function rr(e, t) {
  var n, r;
  (r = (n = e.options).onExpandedChange) == null || r.call(n, t);
}
function ul(e, t) {
  var r;
  const n = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t ?? !pl(e)) {
    if (n === !0 || !dl(e)) return;
    rr(e, !0);
  } else {
    if (n !== !0 && !Object.keys(n).length) return;
    rr(e, re());
  }
}
function fl(e, t) {
  const n = e.initialState.expanded;
  wr(e, "expanded", t ? re() : n === !0 ? !0 : Object.assign(re(), bt(n ?? {})));
}
function dl(e) {
  return e.getPrePaginatedRowModel().flatRows.some((t) => kt(t));
}
function gf(e) {
  return (t) => {
    ul(e);
  };
}
function hf(e) {
  var n;
  const t = ((n = e.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return t === !0 || Object.values(t).some(Boolean);
}
function pl(e) {
  var r;
  const t = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t === !0) return !0;
  if (!Object.keys(t).length) return !1;
  const n = e.getRowModel().flatRows.filter((o) => kt(o));
  return !(!n.length || n.some((o) => !_r(o)));
}
function mf(e) {
  var r;
  let t = 0;
  const n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return (n === !0 ? Object.values(e.getRowModel().rowsById).filter((o) => kt(o)).map((o) => o.id) : Object.keys(n ?? {})).forEach((o) => {
    const s = o.split(".");
    t = Math.max(t, s.length);
  }), t;
}
function gl(e, t) {
  var s;
  const n = ((s = e.table.atoms.expanded) == null ? void 0 : s.get()) ?? {}, r = n === !0 || fo(n, e.id), o = t ?? !r;
  o !== r && (o && !kt(e) || rr(e.table, (i) => {
    const l = i === !0 ? !0 : fo(i, e.id);
    let a = re();
    if (i === !0 ? Object.values(e.table.getRowModel().rowsById).forEach((c) => {
      kt(c) && (a[c.id] = !0);
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
function _r(e) {
  var n, r, o;
  const t = ((n = e.table.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return !!(((o = (r = e.table.options).getIsRowExpanded) == null ? void 0 : o.call(r, e)) ?? (t === !0 || fo(t, e.id)));
}
function fo(e, t) {
  return !!(e && e !== !0 && Zt(e, t) && e[t]);
}
function kt(e) {
  var t, n;
  return ((n = (t = e.table.options).getRowCanExpand) == null ? void 0 : n.call(t, e)) ?? ((e.table.options.enableExpanding ?? !0) && !!e.subRows.length);
}
function vf(e) {
  let t = !0, n = e;
  for (; t && n.parentId; )
    n = e.table.getRow(n.parentId, !0), t = _r(n);
  return t;
}
function yf(e) {
  const t = kt(e);
  return () => {
    t && gl(e);
  };
}
const po = 0;
function wf(e) {
  var t, n;
  if (e.options.autoResetAll ?? e.options.autoResetPageIndex ?? !e.options.manualPagination) {
    if ((((n = (t = e.atoms.pagination) == null ? void 0 : t.get()) == null ? void 0 : n.pageIndex) ?? po) === po) return;
    Sf(e);
  }
}
function bf(e, t) {
  wr(e, "pagination", t);
}
function _f(e, t) {
  bf(e, (n) => {
    let r = yr(t, n.pageIndex);
    const o = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
    return r = Math.max(0, Math.min(r, o)), {
      ...n,
      pageIndex: r
    };
  });
}
function Sf(e, t) {
  _f(e, po);
}
function xf(e, t) {
  wr(e, "sorting", t);
}
function Rf(e, t) {
  xf(e, bt(e.initialState.sorting ?? []));
}
function Cf(e) {
  e.atoms.sorting && (e.options.autoResetAll ?? e.options.autoResetSorting ?? !1) && Rf(e);
}
function hl() {
  return (e) => br({
    feature: "coreRowModelsFeature",
    table: e,
    fnName: "table.getCoreRowModel",
    memoDeps: () => [e.options.data],
    fn: () => Mf(e, e.options.data),
    onAfterUpdate: Pu(() => {
      cl(e), wf(e), Cf(e), df(e);
    })
  });
}
function ml(e, t, n, r = 0, o) {
  var i;
  const s = [];
  for (let l = 0; l < n.length; l++) {
    const a = n[l], c = cf(e, e.getRowId(a, l, o), a, l, r, void 0, o == null ? void 0 : o.id);
    t.flatRows.push(c), t.rowsById[c.id] = c, s.push(c), e.options.getSubRows && (c.originalSubRows = e.options.getSubRows(a, l), (i = c.originalSubRows) != null && i.length && (c.subRows = ml(e, t, c.originalSubRows, r + 1, c)));
  }
  return s;
}
function Mf(e, t) {
  const n = {
    rows: [],
    flatRows: [],
    rowsById: re()
  };
  return n.rows = ml(e, n, t), n;
}
function If(e) {
  var t, n;
  return e._rowModels.coreRowModel || (e._rowModels.coreRowModel = ((n = (t = e.options.features).coreRowModel) == null ? void 0 : n.call(t, e)) ?? hl()(e)), e._rowModels.coreRowModel();
}
function Ef(e) {
  return e.getCoreRowModel();
}
function Of(e) {
  var t, n;
  return e._rowModels.filteredRowModel || (e._rowModels.filteredRowModel = (n = (t = e.options.features).filteredRowModel) == null ? void 0 : n.call(t, e)), e.options.manualFiltering || !e._rowModels.filteredRowModel ? e.getPreFilteredRowModel() : e._rowModels.filteredRowModel();
}
function Pf(e) {
  return e.getFilteredRowModel();
}
function Af(e) {
  var t, n;
  return e._rowModels.groupedRowModel || (e._rowModels.groupedRowModel = (n = (t = e.options.features).groupedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualGrouping || !e._rowModels.groupedRowModel ? e.getPreGroupedRowModel() : e._rowModels.groupedRowModel();
}
function Tf(e) {
  return e.getGroupedRowModel();
}
function Df(e) {
  var t, n;
  return e._rowModels.sortedRowModel || (e._rowModels.sortedRowModel = (n = (t = e.options.features).sortedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualSorting || !e._rowModels.sortedRowModel ? e.getPreSortedRowModel() : e._rowModels.sortedRowModel();
}
function kf(e) {
  return e.getSortedRowModel();
}
function Ff(e) {
  var t, n;
  return e._rowModels.expandedRowModel || (e._rowModels.expandedRowModel = (n = (t = e.options.features).expandedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualExpanding || !e._rowModels.expandedRowModel ? e.getPreExpandedRowModel() : e._rowModels.expandedRowModel();
}
function jf(e) {
  return e.getExpandedRowModel();
}
function Hf(e) {
  var t, n;
  return e._rowModels.paginatedRowModel || (e._rowModels.paginatedRowModel = (n = (t = e.options.features).paginatedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualPagination || !e._rowModels.paginatedRowModel ? e.getPrePaginatedRowModel() : e._rowModels.paginatedRowModel();
}
function Lf(e) {
  return e.getPaginatedRowModel();
}
const Kf = { constructTableAPIs: (e) => {
  Ht("coreRowModelsFeature", e, {
    table_getCoreRowModel: { fn: () => If(e) },
    table_getPreFilteredRowModel: { fn: () => Ef(e) },
    table_getFilteredRowModel: { fn: () => Of(e) },
    table_getPreGroupedRowModel: { fn: () => Pf(e) },
    table_getGroupedRowModel: { fn: () => Af(e) },
    table_getPreSortedRowModel: { fn: () => Tf(e) },
    table_getSortedRowModel: { fn: () => Df(e) },
    table_getPreExpandedRowModel: { fn: () => kf(e) },
    table_getExpandedRowModel: { fn: () => Ff(e) },
    table_getPrePaginatedRowModel: { fn: () => jf(e) },
    table_getPaginatedRowModel: { fn: () => Hf(e) },
    table_getRowModel: { fn: () => Lf(e) }
  });
} };
function $f(e) {
  var t, n;
  if (!e._cellPrototype) {
    e._cellPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignCellPrototype) == null || n.call(t, e._cellPrototype, e);
  }
  return e._cellPrototype;
}
function Vf(e, t, n) {
  const r = $f(n), o = Object.create(r);
  o.column = e, o.id = `${t.id}_${e.id}`, o.row = t;
  const s = n._cellInstanceInitFns;
  for (let i = 0; i < s.length; i++) s[i](o);
  return o;
}
function Nf(e) {
  const t = e.table.getRowsInDisplayOrder(), n = e._displayIndexCache;
  return t[n] === e ? n : -1;
}
function Bf(e) {
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
function Wf(e, t) {
  if (Zt(e._valuesCache, t)) return e._valuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return e._valuesCache[t] = n.accessorFn(e.original, e.index), e._valuesCache[t];
}
function Uf(e, t) {
  if (Zt(e._uniqueValuesCache, t)) return e._uniqueValuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return n.columnDef.getUniqueValues ? (e._uniqueValuesCache[t] = n.columnDef.getUniqueValues(e.original, e.index), e._uniqueValuesCache[t]) : (e._uniqueValuesCache[t] = [e.getValue(t)], e._uniqueValuesCache[t]);
}
function Gf(e, t) {
  return e.getValue(t) ?? e.table.options.renderFallbackValue;
}
function qf(e) {
  return Eu(e.subRows, (t) => t.subRows);
}
function zf(e) {
  const t = e.getCoreRowModel().flatRows;
  let n = 0;
  for (let r = 0; r < t.length; r++) n = Math.max(n, t[r].depth);
  return n;
}
function Yf(e) {
  if (e.parentId)
    return e.table.getCoreRowModel().rowsById[e.parentId] ?? e.table.getRow(e.parentId, !0);
}
function Xf(e) {
  const t = [];
  let n = e;
  for (; ; ) {
    const r = n.getParentRow();
    if (!r) break;
    t.push(r), n = r;
  }
  return t.reverse();
}
function Jf(e) {
  const t = e.table.getAllLeafColumns();
  let n = e._cellsCache;
  n || (n = e._cellsCache = /* @__PURE__ */ new WeakMap());
  const r = new Array(t.length);
  for (let o = 0; o < t.length; o++) {
    const s = t[o];
    let i = n.get(s);
    i || (i = Vf(s, e, e.table), n.set(s, i)), r[o] = i;
  }
  return r;
}
function Zf(e) {
  const t = re(), n = e.getAllCells();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.column.id] = o;
  }
  return t;
}
function Qf(e, t, n, r) {
  var o, s;
  return ((s = (o = t.options).getRowId) == null ? void 0 : s.call(o, e, n, r)) ?? (r ? `${r.id}.${n}` : String(n));
}
function ed(e, t, n) {
  let r = (n ? e.getPrePaginatedRowModel() : e.getRowModel()).rowsById[t];
  if (!r && (r = e.getCoreRowModel().rowsById[t], !r))
    throw new Error();
  return r;
}
const td = {
  assignRowPrototype: (e, t) => {
    Qt("coreRowsFeature", e, t, {
      row_getDisplayIndex: { fn: (n) => Nf(n) },
      row_getAllCellsByColumnId: {
        fn: (n) => Zf(n),
        memoDeps: (n) => [n.getAllCells()]
      },
      row_getAllCells: {
        fn: (n) => Jf(n),
        memoDeps: (n) => [n.table.getAllLeafColumns()]
      },
      row_getLeafRows: {
        fn: (n) => qf(n),
        memoDeps: (n) => [n.subRows]
      },
      row_getParentRow: { fn: (n) => Yf(n) },
      row_getParentRows: { fn: (n) => Xf(n) },
      row_getUniqueValues: { fn: (n, r) => Uf(n, r) },
      row_getValue: { fn: (n, r) => Wf(n, r) },
      row_renderValue: { fn: (n, r) => Gf(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    Ht("coreRowsFeature", e, {
      table_getRowsInDisplayOrder: {
        fn: () => Bf(e),
        memoDeps: () => {
          var t;
          return [
            e.getPrePaginatedRowModel().rows,
            e.options.paginateExpandedRows,
            e.options.paginateExpandedRows === !1 ? (t = e.atoms.expanded) == null ? void 0 : t.get() : void 0
          ];
        }
      },
      table_getRowId: { fn: (t, n, r) => Qf(t, e, n, r) },
      table_getRow: { fn: (t, n) => ed(e, t, n) },
      table_getMaxSubRowDepth: {
        fn: () => zf(e),
        memoDeps: () => [e.getCoreRowModel()]
      }
    });
  }
};
function vl(e, t, n = (r, o) => r === o) {
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
function nd(e, t, n = (r, o) => r === o) {
  e._reactivity.batch(() => {
    var r, o;
    vl(e, t, n), (o = (r = e._reactivity).commit) == null || o.call(r);
  });
}
function rd(e) {
  var r, o;
  const t = bt(e.initialState);
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
function od(e, t) {
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
function sd(e, t, n) {
  const r = od(e, yr(t, e.options));
  e.optionsStore ? e.optionsStore.set(() => r) : e.options = r, nd(e, r.state ?? null);
}
const id = { constructTableAPIs: (e) => {
  Ht("coreTablesFeature", e, {
    table_reset: { fn: () => rd(e) },
    table_setOptions: { fn: (t) => sd(e, t) }
  });
} }, ld = {
  coreCellsFeature: ku,
  coreColumnsFeature: Qu,
  coreHeadersFeature: lf,
  coreRowModelsFeature: Kf,
  coreRowsFeature: td,
  coreTablesFeature: id
};
function ad(e) {
  const t = e;
  return Object.defineProperty(e, "state", { get() {
    return e.get();
  } }), "set" in e && (t.setState = e.set.bind(e)), t;
}
function cd(e, t) {
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
  const n = Rs(e);
  if (n.length !== Rs(t).length) return !1;
  for (let r = 0; r < n.length; r++) if (!Object.prototype.hasOwnProperty.call(t, n[r]) || !Object.is(e[n[r]], t[n[r]])) return !1;
  return !0;
}
function Rs(e) {
  return Object.keys(e).concat(Object.getOwnPropertySymbols(e));
}
function ud(e, t = {}) {
  return Object.values(e).forEach((n) => {
    var r;
    t = ((r = n.getInitialState) == null ? void 0 : r.call(n, t)) ?? t;
  }), bt(t);
}
function fd(e) {
  var W, U;
  const t = e.features.coreReactivityFeature, { aggregationFns: n, columnMeta: r, coreRowModel: o, expandedRowModel: s, facetedMinMaxValues: i, facetedRowModel: l, facetedUniqueValues: a, filterFns: c, filterMeta: u, filteredRowModel: p, groupedRowModel: v, paginatedRowModel: w, sortFns: E, sortedRowModel: M, tableMeta: k, ...K } = e.features, I = {
    _cellInstanceInitFns: [],
    _columnInstanceInitFns: [],
    _features: {
      ...ld,
      ...K
    },
    _headerGroupInstanceInitFns: [],
    _headerInstanceInitFns: [],
    _reactivity: t,
    _rowInstanceInitFns: [],
    _rowModelFns: {
      aggregationFns: n,
      filterFns: c,
      sortFns: E
    },
    _rowModels: {},
    atoms: {},
    baseAtoms: {}
  }, F = Object.values(I._features), P = {
    ...F.reduce((V, D) => {
      var z;
      return Object.assign(V, (z = D.getDefaultTableOptions) == null ? void 0 : z.call(D, I));
    }, {}),
    ...e
  };
  if (t.wrapExternalAtoms && P.atoms) for (const [V, D] of Object.entries(P.atoms)) {
    const z = D, ae = t.createWritableAtom(z.get(), { debugName: `externalAtom/${V}` });
    P.atoms[V] = ae;
    let oe = !1;
    const me = z.subscribe((be) => {
      oe || ae.set(be);
    }), Re = ae.subscribe((be) => {
      oe = !0, z.set(be), oe = !1;
    });
    t.addSubscription(me), t.addSubscription(Re);
  }
  t.createOptionsStore ? (I.optionsStore = t.createWritableAtom(P, { debugName: "table/optionsStore" }), Object.defineProperty(I, "options", {
    configurable: !0,
    enumerable: !0,
    get() {
      return I.optionsStore.get();
    },
    set(V) {
      I.optionsStore.set(() => V);
    }
  })) : I.options = P, I.initialState = ud(I._features, I.options.initialState);
  const B = Object.keys(I.initialState);
  for (let V = 0; V < B.length; V++) {
    const D = B[V];
    I.baseAtoms[D] = t.createWritableAtom(I.initialState[D], { debugName: `table/baseAtoms/${D}` }), I.atoms[D] = t.createReadonlyAtom(() => {
      var Re;
      const z = I.options, ae = (Re = z.atoms) == null ? void 0 : Re[D], oe = ae ? ae.get() : I.baseAtoms[D].get();
      if (ae) return oe;
      const me = z.state;
      if (me && Zt(me, D)) {
        const be = me[D];
        return be === void 0 ? I.initialState[D] : be;
      }
      return oe;
    }, { debugName: `table/atoms/${D}` });
  }
  vl(I), I.store = ad(t.createReadonlyAtom(() => {
    const V = {};
    for (let D = 0; D < B.length; D++) {
      const z = B[D];
      V[z] = I.atoms[z].get();
    }
    return V;
  }, {
    compare: cd,
    debugName: "table/store"
  }));
  for (let V = 0; V < F.length; V++) {
    const D = F[V];
    (W = D.initTableInstanceData) == null || W.call(D, I), D.initCellInstanceData && I._cellInstanceInitFns.push(D.initCellInstanceData.bind(D)), D.initColumnInstanceData && I._columnInstanceInitFns.push(D.initColumnInstanceData.bind(D)), D.initHeaderGroupInstanceData && I._headerGroupInstanceInitFns.push(D.initHeaderGroupInstanceData.bind(D)), D.initHeaderInstanceData && I._headerInstanceInitFns.push(D.initHeaderInstanceData.bind(D)), D.initRowInstanceData && I._rowInstanceInitFns.push(D.initRowInstanceData.bind(D)), (U = D.constructTableAPIs) == null || U.call(D, I);
  }
  return I;
}
const dd = {
  getInitialState: (e) => ({
    expanded: pf(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onExpandedChange: Qi("expanded", e),
    paginateExpandedRows: !0
  }),
  assignRowPrototype: (e, t) => {
    Qt("rowExpandingFeature", e, t, {
      row_toggleExpanded: { fn: (n, r) => gl(n, r) },
      row_getIsExpanded: { fn: (n) => _r(n) },
      row_getCanExpand: { fn: (n) => kt(n) },
      row_getIsAllParentsExpanded: { fn: (n) => vf(n) },
      row_getToggleExpandedHandler: { fn: (n) => yf(n) }
    });
  },
  constructTableAPIs: (e) => {
    Ht("rowExpandingFeature", e, {
      table_autoResetExpanded: { fn: () => cl(e) },
      table_setExpanded: { fn: (t) => rr(e, t) },
      table_toggleAllRowsExpanded: { fn: (t) => ul(e, t) },
      table_resetExpanded: { fn: (t) => fl(e, t) },
      table_getCanSomeRowsExpand: { fn: () => dl(e) },
      table_getToggleAllRowsExpandedHandler: { fn: () => gf(e) },
      table_getIsSomeRowsExpanded: { fn: () => hf(e) },
      table_getIsAllRowsExpanded: { fn: () => pl(e) },
      table_getExpandedDepth: { fn: () => mf(e) }
    });
  }
};
function pd() {
  return re();
}
function en(e, t) {
  var n, r;
  (r = (n = e.options).onRowSelectionChange) == null || r.call(n, t);
}
function gd(e, t) {
  e._lastSelectedRowId = null, en(e, t ? re() : Object.assign(re(), bt(e.initialState.rowSelection ?? {})));
}
function yl(e, t, n) {
  e._lastSelectedRowId = null, en(e, (r) => {
    if (t = typeof t < "u" ? t : !we(e, "getIsAllRowsSelected", _l), n != null && n.deselectAll && !t) return re();
    const o = Object.assign(re(), r), s = e.getPreGroupedRowModel().flatRows;
    if (t) {
      const i = /* @__PURE__ */ new Map();
      s.forEach((l) => {
        or(l, i) && (o[l.id] = !0);
      });
    } else s.forEach((i) => {
      ut(i) && delete o[i.id];
    });
    return o;
  });
}
function wl(e, t, n) {
  e._lastSelectedRowId = null, en(e, (r) => {
    const o = typeof t < "u" ? t : !we(e, "getIsAllPageRowsSelected", Sl);
    if (n != null && n.deselectAll && !o) return re();
    const s = Object.assign(re(), r);
    return e.getRowModel().rows.forEach((i) => {
      xr(s, i.id, o, !0, e, !0);
    }), s;
  });
}
function hd(e) {
  return e.getCoreRowModel();
}
function md(e) {
  const t = e.getCoreRowModel();
  return we(e, "getIsSomeRowsSelected", Sr) ? jo(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: re()
  };
}
function vd(e) {
  const t = e.getFilteredRowModel();
  return we(e, "getIsSomeRowsSelected", Sr) ? jo(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: re()
  };
}
function yd(e) {
  const t = e.getSortedRowModel();
  return we(e, "getIsSomeRowsSelected", Sr) ? jo(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: re()
  };
}
function bl(e) {
  var t;
  return Object.keys(((t = e.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function _l(e) {
  var o;
  const t = e.getFilteredRowModel().flatRows, n = ((o = e.atoms.rowSelection) == null ? void 0 : o.get()) ?? {};
  let r = !!(t.length && Object.keys(n).length);
  if (r) {
    const s = /* @__PURE__ */ new Map();
    t.some((i) => !Mn(i, n) && or(i, s)) && (r = !1);
  }
  return r;
}
function Sl(e) {
  var s;
  const t = e.getPaginatedRowModel().flatRows, n = ((s = e.atoms.rowSelection) == null ? void 0 : s.get()) ?? {}, r = /* @__PURE__ */ new Map();
  let o = !1;
  for (let i = 0; i < t.length; i++) {
    const l = t[i];
    if (Mn(l, n))
      !o && or(l, r) && (o = !0);
    else if (or(l, r)) return !1;
  }
  return o;
}
function Sr(e) {
  return we(e, "getSelectedRowIds", bl).length > 0;
}
function wd(e) {
  return e.getPaginatedRowModel().flatRows.filter((t) => ut(t)).some((t) => ko(t) || we(t, "getIsSomeSelected", Rl));
}
function bd(e) {
  return (t) => {
    yl(e, t.target.checked);
  };
}
function _d(e) {
  return (t) => {
    wl(e, t.target.checked);
  };
}
function xl(e, t, n) {
  const r = ko(e);
  en(e.table, (o) => {
    t = typeof t < "u" ? t : !r;
    const s = Object.assign(re(), o);
    return xr(s, e.id, t, ((n == null ? void 0 : n.selectChildren) ?? !0) && Tt(e), e.table), !t && (n != null && n.deselectParents) && Cl(s, e), s;
  });
}
function ko(e) {
  var t;
  return Mn(e, ((t = e.table.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function Rl(e) {
  return Ho(e) === "some";
}
function Sd(e) {
  return Ho(e) === "all";
}
function ut(e) {
  const t = e.table.options;
  return typeof t.enableRowSelection == "function" ? t.enableRowSelection(e) : t.enableRowSelection ?? !0;
}
function Fo(e) {
  const t = e.table.options;
  return typeof t.enableSubRowSelection == "function" ? t.enableSubRowSelection(e) : t.enableSubRowSelection ?? !0;
}
function Tt(e) {
  const t = e.table.options;
  return typeof t.enableMultiRowSelection == "function" ? t.enableMultiRowSelection(e) : t.enableMultiRowSelection ?? !0;
}
function xd(e, t) {
  const n = ut(e);
  return (r) => {
    var a, c;
    if (!n) return;
    const o = r, s = e.table, i = o.target.checked, l = s._lastSelectedRowId;
    (!(s.options.enableRowRangeSelection !== !1 && l !== null && Tt(e) && (((c = (a = s.options).isRowRangeSelectionEvent) == null ? void 0 : c.call(a, r)) ?? !1)) || !Rd(e, l, i, t)) && xl(e, i, t), s._lastSelectedRowId = e.id;
  };
}
function Rd(e, t, n, r) {
  const o = (r == null ? void 0 : r.selectChildren) ?? !0, s = e.table, i = s.getRowsInDisplayOrder(), l = s.getPrePaginatedRowModel().rowsById[t] ?? s.getCoreRowModel().rowsById[t];
  if (!l) return !1;
  const a = l.getDisplayIndex(), c = e.getDisplayIndex(), u = i[a], p = i[c];
  if (a < 0 || c < 0 || a >= i.length || c >= i.length || (u == null ? void 0 : u.id) !== l.id || (p == null ? void 0 : p.id) !== e.id || !Tt(l) || !Tt(e)) return !1;
  const v = Math.min(a, c), w = Math.max(a, c);
  return en(s, (E) => {
    const M = Object.assign(re(), E);
    for (let k = v; k <= w; k++) {
      const K = i[k];
      !ut(K) || !Tt(K) || (xr(M, K.id, n, o, s), !n && (r != null && r.deselectParents) && Cl(M, K));
    }
    return M;
  }), !0;
}
function xr(e, t, n, r, o, s) {
  const i = o.getRow(t, !0);
  n ? (Tt(i) || Object.keys(e).forEach((l) => delete e[l]), ut(i) && (e[t] = !0)) : (!s || ut(i)) && delete e[t], r && i.subRows.length && Fo(i) && i.subRows.forEach((l) => xr(e, l.id, n, r, o, s));
}
function or(e, t) {
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
    if (!Fo(u)) {
      l = !1;
      break;
    }
    a = u.parentId;
  }
  return i.forEach((c) => t.set(c, l)), l;
}
function Cl(e, t) {
  const n = t.table.getCoreRowModel().rowsById;
  let r = t.parentId;
  for (; r !== void 0; )
    delete e[r], r = (n[r] ?? t.table.getRow(r, !0)).parentId;
}
function Ml(e, t, n, r) {
  const o = [];
  for (let s = 0; s < e.length; s++) {
    const i = e[s], l = Mn(i, t);
    if (l && (n.push(i), r[i.id] = i), i.subRows.length) {
      const a = Ml(i.subRows, t, n, r);
      if (l) {
        const c = Object.create(Object.getPrototypeOf(i));
        Cu(c, i), c.subRows = a, o.push(c);
      }
    } else l && o.push(i);
  }
  return o;
}
function jo(e, t) {
  var s;
  const n = [], r = re(), o = ((s = t.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  return {
    rows: Ml(e.rows, o, n, r),
    flatRows: n,
    rowsById: r
  };
}
function Mn(e, t) {
  return !!(Zt(t, e.id) && t[e.id]);
}
function Ho(e) {
  var s;
  if (!e.subRows.length) return !1;
  const t = ((s = e.table.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  let n = !1, r = !0, o = !1;
  for (let i = 0; i < e.subRows.length; i++) {
    const l = e.subRows[i];
    if (n && !r) break;
    if (ut(l) && (o = !0, Mn(l, t) ? n = !0 : r = !1), l.subRows.length) {
      const a = Ho(l);
      a === "all" ? (n = !0, o = !0) : a === "some" ? (n = !0, r = !1, o = !0) : r = !1;
    }
  }
  return o ? r ? "all" : n ? "some" : !1 : !1;
}
const Cd = {
  initTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  resetTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  getInitialState: (e) => ({
    rowSelection: pd(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onRowSelectionChange: Qi("rowSelection", e),
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
    Qt("rowSelectionFeature", e, t, {
      row_toggleSelected: { fn: (n, r, o) => xl(n, r, o) },
      row_getIsSelected: { fn: (n) => ko(n) },
      row_getIsSomeSelected: {
        fn: (n) => Rl(n),
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
        fn: (n) => Sd(n),
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
      row_getCanSelectSubRows: { fn: (n) => Fo(n) },
      row_getCanMultiSelect: { fn: (n) => Tt(n) },
      row_getToggleSelectedHandler: { fn: (n, r) => xd(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    Ht("rowSelectionFeature", e, {
      table_setRowSelection: { fn: (t) => en(e, t) },
      table_resetRowSelection: { fn: (t) => gd(e, t) },
      table_toggleAllRowsSelected: { fn: (t, n) => yl(e, t, n) },
      table_toggleAllPageRowsSelected: { fn: (t, n) => wl(e, t, n) },
      table_getPreSelectedRowModel: { fn: () => hd(e) },
      table_getSelectedRowModel: {
        fn: () => md(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getCoreRowModel()];
        }
      },
      table_getFilteredSelectedRowModel: {
        fn: () => vd(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getFilteredRowModel()];
        }
      },
      table_getGroupedSelectedRowModel: {
        fn: () => yd(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getSortedRowModel()];
        }
      },
      table_getSelectedRowIds: {
        fn: () => bl(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get()];
        }
      },
      table_getIsAllRowsSelected: {
        fn: () => _l(e),
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
        fn: () => Sl(e),
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
        fn: () => Sr(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get()];
        }
      },
      table_getIsSomePageRowsSelected: {
        fn: () => wd(e),
        memoDeps: () => {
          var t;
          return [
            (t = e.atoms.rowSelection) == null ? void 0 : t.get(),
            e.getPaginatedRowModel(),
            e.options.enableRowSelection
          ];
        }
      },
      table_getToggleAllRowsSelectedHandler: { fn: () => bd(e) },
      table_getToggleAllPageRowsSelectedHandler: { fn: () => _d(e) }
    });
  }
};
function Md() {
  return (e) => {
    const t = e;
    return br({
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
      fn: () => Id(t)
    });
  };
}
function Id(e) {
  var r;
  const t = e.getPreExpandedRowModel(), n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return !t.rows.length || n !== !0 && !Object.keys(n ?? {}).length || !e.options.paginateExpandedRows && !e.options.manualPagination ? t : Ed(t);
}
function Ed(e) {
  const t = [], n = (r) => {
    t.push(r), r.subRows.length && _r(r) && r.subRows.forEach(n);
  };
  return e.rows.forEach(n), {
    rows: t,
    flatRows: e.flatRows,
    rowsById: e.rowsById
  };
}
function Cs(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = Pt(e[n]);
  return uo(e, t);
}
function Od(e) {
  return Object.keys(e).map((t) => Pt(e[t]));
}
function Pd(e) {
  const t = (l, a) => {
    l.setOptions((c) => bs(c, Cs(a)));
  }, n = Ru(), r = uo(e, { features: {
    coreReactivityFeature: n,
    ...Pt(e.features) ?? {}
  } }), o = uo(Cs(r), { mergeOptions: (l, a) => bs(l, a) }), s = fd(o), i = s;
  return Zs() && ca(() => {
    var l;
    return (l = n.unmount) == null ? void 0 : l.call(n);
  }), Ee(() => Od(r), () => {
    t(s, r);
  }, { immediate: !0 }), Ee(() => {
    const l = Pt(e.state), a = Pt(e.atoms);
    if (!l) return [];
    const c = [];
    for (const u of Object.keys(i.initialState))
      !(u in l) || (a == null ? void 0 : a[u]) !== void 0 || c.push(l[u]);
    return c;
  }, (l) => {
    l.length > 0 && t(s, r);
  }, { immediate: !0 }), i.Subscribe = (l) => l.children(i.atoms), i;
}
function Rr() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return function() {
    t.forEach(function(o) {
      return o();
    });
  };
}
function Ad(e) {
  if (Array.isArray(e)) return e;
}
function Td(e, t) {
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
function go(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Il(e, t) {
  if (e) {
    if (typeof e == "string") return go(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? go(e, t) : void 0;
  }
}
function Dd() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function El(e, t) {
  return Ad(e) || Td(e, t) || Il(e, t) || Dd();
}
var Ms = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Ft = {}, In = {};
Object.defineProperty(In, "__esModule", { value: !0 });
In.bind = void 0;
function kd(e, t) {
  var n = t.type, r = t.listener, o = t.options;
  return e.addEventListener(n, r, o), function() {
    e.removeEventListener(n, r, o);
  };
}
In.bind = kd;
var Cr = {}, Ut = Ms && Ms.__assign || function() {
  return Ut = Object.assign || function(e) {
    for (var t, n = 1, r = arguments.length; n < r; n++) {
      t = arguments[n];
      for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    }
    return e;
  }, Ut.apply(this, arguments);
};
Object.defineProperty(Cr, "__esModule", { value: !0 });
Cr.bindAll = void 0;
var Fd = In;
function Is(e) {
  if (!(typeof e > "u"))
    return typeof e == "boolean" ? {
      capture: e
    } : e;
}
function jd(e, t) {
  if (t == null)
    return e;
  var n = Ut(Ut({}, e), { options: Ut(Ut({}, Is(t)), Is(e.options)) });
  return n;
}
function Hd(e, t, n) {
  var r = t.map(function(o) {
    var s = jd(o, n);
    return (0, Fd.bind)(e, s);
  });
  return function() {
    r.forEach(function(s) {
      return s();
    });
  };
}
Cr.bindAll = Hd;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.bindAll = e.bind = void 0;
  var t = In;
  Object.defineProperty(e, "bind", { enumerable: !0, get: function() {
    return t.bind;
  } });
  var n = Cr;
  Object.defineProperty(e, "bindAll", { enumerable: !0, get: function() {
    return n.bindAll;
  } });
})(Ft);
var Ol = "data-pdnd-honey-pot";
function Pl(e) {
  return e instanceof Element && e.hasAttribute(Ol);
}
function Al(e) {
  var t = document.elementsFromPoint(e.x, e.y), n = El(t, 2), r = n[0], o = n[1];
  return r ? Pl(r) ? o ?? null : r : null;
}
function _n(e) {
  "@babel/helpers - typeof";
  return _n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, _n(e);
}
function Ld(e, t) {
  if (_n(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (_n(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Kd(e) {
  var t = Ld(e, "string");
  return _n(t) == "symbol" ? t : t + "";
}
function En(e, t, n) {
  return (t = Kd(t)) in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var $d = 2147483647, Vd = {
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
function Lt(e) {
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
var Gr = Lt(function() {
  return typeof HTMLElement < "u" && typeof HTMLElement.prototype.showPopover == "function";
});
function Es(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Os(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Es(Object(n), !0).forEach(function(r) {
      En(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Es(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
var Sn = 2, Ps = Sn / 2;
function Nd(e) {
  return {
    x: Math.floor(e.x),
    y: Math.floor(e.y)
  };
}
function Bd(e) {
  return {
    x: e.x - Ps,
    y: e.y - Ps
  };
}
function Wd(e) {
  return {
    x: Math.max(e.x, 0),
    y: Math.max(e.y, 0)
  };
}
function Ud(e) {
  return {
    x: Math.min(e.x, window.innerWidth - Sn),
    y: Math.min(e.y, window.innerHeight - Sn)
  };
}
function As(e) {
  var t = e.client, n = Ud(Wd(Bd(Nd(t))));
  return DOMRect.fromRect({
    x: n.x,
    y: n.y,
    width: Sn,
    height: Sn
  });
}
function Ts(e) {
  var t = e.clientRect;
  return {
    left: "".concat(t.left, "px"),
    top: "".concat(t.top, "px"),
    width: "".concat(t.width, "px"),
    height: "".concat(t.height, "px")
  };
}
function Gd(e) {
  var t = e.client, n = e.clientRect;
  return (
    // is within horizontal bounds
    t.x >= n.x && t.x <= n.x + n.width && // is within vertical bounds
    t.y >= n.y && t.y <= n.y + n.height
  );
}
function qd(e) {
  var t = e.initial, n = document.createElement("div");
  n.setAttribute(Ol, "true"), Gr() && n.setAttribute("popover", "manual");
  var r = As({
    client: t
  });
  Object.assign(n.style, Os(Os({
    position: "fixed"
  }, Gr() ? (
    // needs to come first as it has 'inset: unset' which
    // needs to be overridden by our top / left values
    Vd
  ) : {
    // Fallback: using maximum possible z-index so that this element
    // will always be on top of other positioned content.
    zIndex: $d
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
  }, Ts({
    clientRect: r
  }))), document.body.appendChild(n), Gr() && n.showPopover();
  var o = Ft.bind(window, {
    type: "pointermove",
    listener: function(i) {
      var l = {
        x: i.clientX,
        y: i.clientY
      };
      r = As({
        client: l
      }), Object.assign(n.style, Ts({
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
    if (o(), Gd({
      client: l,
      clientRect: r
    })) {
      n.remove();
      return;
    }
    function a() {
      c(), n.remove();
    }
    var c = Ft.bindAll(window, [
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
function zd() {
  var e = null;
  function t() {
    return e = null, Ft.bind(window, {
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
        r = qd({
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
function Yd(e) {
  if (Array.isArray(e)) return go(e);
}
function Xd(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function Jd() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Tl(e) {
  return Yd(e) || Xd(e) || Il(e) || Jd();
}
var Zd = Lt(function() {
  return navigator.userAgent.includes("Firefox");
}), Lo = Lt(function() {
  var t = navigator, n = t.userAgent;
  return n.includes("AppleWebKit") && !n.includes("Chrome");
});
function Qd(e) {
  return "nodeName" in e;
}
function ep(e) {
  return Qd(e) && e.ownerDocument !== document;
}
var ho = {
  isLeavingWindow: Symbol("leaving"),
  isEnteringWindow: Symbol("entering")
};
(function() {
  if (typeof window > "u" || !Lo())
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
  Ft.bindAll(
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
        !n.isOverWindow && n.enterCount === 0 && (s[ho.isEnteringWindow] = !0), n.isOverWindow = !0, n.enterCount++;
      }
    }, {
      type: "dragleave",
      listener: function(s) {
        n.enterCount--, n.isOverWindow && n.enterCount === 0 && (s[ho.isLeavingWindow] = !0, n.isOverWindow = !1);
      }
    }],
    // using `capture: true` so that adding event listeners
    // in bubble phase will have the correct symbols
    {
      capture: !0
    }
  );
})();
function tp(e) {
  var t = e.dragLeave;
  return Lo() ? t.hasOwnProperty(ho.isLeavingWindow) : !1;
}
function np(e) {
  var t = e.dragLeave, n = t.type, r = t.relatedTarget;
  return n !== "dragleave" ? !1 : Lo() ? tp({
    dragLeave: t
  }) : r == null ? !0 : Zd() ? ep(r) : r instanceof HTMLIFrameElement;
}
function rp(e) {
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
function gn(e) {
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
var op = function(t) {
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
}, qr = op(function(e) {
  return e();
}), Nn = /* @__PURE__ */ function() {
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
function sp(e) {
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
      }), Nn.schedule(function() {
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
      Nn.flush(), qr.cancel(), s({
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
      qr(function() {
        Nn.flush();
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
      Nn.flush(), qr.cancel(), s({
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
var mo = {
  isActive: !1
};
function Dl() {
  return !mo.isActive;
}
function ip(e) {
  return e.dataTransfer ? e.dataTransfer.setDragImage.bind(e.dataTransfer) : null;
}
function lp(e) {
  var t = e.current, n = e.next;
  if (t.length !== n.length)
    return !0;
  for (var r = 0; r < t.length; r++)
    if (t[r].element !== n[r].element)
      return !0;
  return !1;
}
function ap(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = e.dispatchEvent;
  if (!Dl())
    return;
  var s = cp({
    event: t,
    dragType: n,
    getDropTargetsOver: r
  });
  mo.isActive = !0;
  var i = {
    current: s
  };
  zr({
    event: t,
    current: s.dropTargets
  });
  var l = sp({
    source: n.payload,
    dispatchEvent: o,
    initial: s
  });
  function a(w) {
    var E = lp({
      current: i.current.dropTargets,
      next: w.dropTargets
    });
    i.current = w, E && l.dragUpdate({
      current: i.current
    });
  }
  function c(w) {
    var E = gn(w), M = Pl(w.target) ? Al({
      x: E.clientX,
      y: E.clientY
    }) : w.target, k = r({
      target: M,
      input: E,
      source: n.payload,
      current: i.current.dropTargets
    });
    k.length && (w.preventDefault(), zr({
      event: w,
      current: k
    })), a({
      dropTargets: k,
      input: E
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
    mo.isActive = !1, v();
  }
  var v = Ft.bindAll(
    window,
    [{
      // 👋 Note: we are repurposing the `dragover` event as our `drag` event
      // this is because firefox does not publish pointer coordinates during
      // a `drag` event, but does for every other type of drag event
      // `dragover` fires on all elements that are being dragged over
      // Because we are binding to `window` - our `dragover` is effectively the same as a `drag`
      // 🦊😤
      type: "dragover",
      listener: function(E) {
        c(E), l.drag({
          current: i.current
        });
      }
    }, {
      type: "dragenter",
      listener: c
    }, {
      type: "dragleave",
      listener: function(E) {
        np({
          dragLeave: E
        }) && (a({
          input: i.current.input,
          dropTargets: []
        }), n.startedFrom === "external" && u());
      }
    }, {
      // A "drop" can only happen if the browser allowed the drop
      type: "drop",
      listener: function(E) {
        if (i.current = {
          dropTargets: i.current.dropTargets,
          input: gn(E)
        }, !i.current.dropTargets.length) {
          u();
          return;
        }
        E.preventDefault(), zr({
          event: E,
          current: i.current.dropTargets
        }), l.drop({
          current: i.current,
          // When dropping something native, we need to extract the latest
          // `.items` from the "drop" event as it is now accessible
          updatedSourcePayload: n.type === "external" ? n.getDropPayload(E) : null
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
      listener: function(E) {
        i.current = {
          dropTargets: i.current.dropTargets,
          input: gn(E)
        }, u();
      }
    }].concat(Tl(rp({
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
    nativeSetDragImage: ip(t)
  });
}
function zr(e) {
  var t, n = e.event, r = e.current, o = (t = r[0]) === null || t === void 0 ? void 0 : t.dropEffect;
  o != null && n.dataTransfer && (n.dataTransfer.dropEffect = o);
}
function cp(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = gn(t);
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
var Ds = {
  canStart: Dl,
  start: ap
}, vo = /* @__PURE__ */ new Map();
function up(e) {
  var t = e.typeKey, n = e.mount, r = vo.get(t);
  if (r)
    return r.usageCount++, r;
  var o = {
    typeKey: t,
    unmount: n(),
    usageCount: 1
  };
  return vo.set(t, o), o;
}
function fp(e) {
  var t = up(e);
  return function() {
    t.usageCount--, !(t.usageCount > 0) && (t.unmount(), vo.delete(e.typeKey));
  };
}
function kl(e, t) {
  var n = t.attribute, r = t.value;
  return e.setAttribute(n, r), function() {
    return e.removeAttribute(n);
  };
}
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
function mt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ks(Object(n), !0).forEach(function(r) {
      En(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ks(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Yr(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = dp(e)) || t) {
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
function dp(e, t) {
  if (e) {
    if (typeof e == "string") return Fs(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Fs(e, t) : void 0;
  }
}
function Fs(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Xr(e) {
  return e.slice(0).reverse();
}
function pp(e) {
  var t = e.typeKey, n = e.defaultDropEffect, r = /* @__PURE__ */ new WeakMap(), o = "data-drop-target-for-".concat(t), s = "[".concat(o, "]");
  function i(w) {
    return r.set(w.element, w), function() {
      return r.delete(w.element);
    };
  }
  function l(w) {
    var E = Rr(kl(w.element, {
      attribute: o,
      value: "true"
    }), i(w));
    return Lt(E);
  }
  function a(w) {
    var E, M, k, K, I = w.source, F = w.target, P = w.input, B = w.result, W = B === void 0 ? [] : B;
    if (F == null)
      return W;
    if (!(F instanceof Element))
      return F instanceof Node ? a({
        source: I,
        target: F.parentElement,
        input: P,
        result: W
      }) : W;
    var U = F.closest(s);
    if (U == null)
      return W;
    var V = r.get(U);
    if (V == null)
      return W;
    var D = {
      input: P,
      source: I,
      element: V.element
    };
    if (V.canDrop && !V.canDrop(D))
      return a({
        source: I,
        target: V.element.parentElement,
        input: P,
        result: W
      });
    var z = (E = (M = V.getData) === null || M === void 0 ? void 0 : M.call(V, D)) !== null && E !== void 0 ? E : {}, ae = (k = (K = V.getDropEffect) === null || K === void 0 ? void 0 : K.call(V, D)) !== null && k !== void 0 ? k : n, oe = {
      data: z,
      element: V.element,
      dropEffect: ae,
      // we are collecting _actual_ drop targets, so these are
      // being applied _not_ due to stickiness
      isActiveDueToStickiness: !1
    };
    return a({
      source: I,
      target: V.element.parentElement,
      input: P,
      // Using bubble ordering. Same ordering as `event.getPath()`
      result: [].concat(Tl(W), [oe])
    });
  }
  function c(w) {
    var E = w.eventName, M = w.payload, k = Yr(M.location.current.dropTargets), K;
    try {
      for (k.s(); !(K = k.n()).done; ) {
        var I, F = K.value, P = r.get(F.element), B = mt(mt({}, M), {}, {
          self: F
        });
        P == null || (I = P[E]) === null || I === void 0 || I.call(
          P,
          // I cannot seem to get the types right here.
          // TS doesn't seem to like that one event can need `nativeSetDragImage`
          // @ts-expect-error
          B
        );
      }
    } catch (W) {
      k.e(W);
    } finally {
      k.f();
    }
  }
  var u = {
    onGenerateDragPreview: c,
    onDrag: c,
    onDragStart: c,
    onDrop: c,
    onDropTargetChange: function(E) {
      var M = E.payload, k = new Set(M.location.current.dropTargets.map(function(J) {
        return J.element;
      })), K = /* @__PURE__ */ new Set(), I = Yr(M.location.previous.dropTargets), F;
      try {
        for (I.s(); !(F = I.n()).done; ) {
          var P, B = F.value;
          K.add(B.element);
          var W = r.get(B.element), U = k.has(B.element), V = mt(mt({}, M), {}, {
            self: B
          });
          if (W == null || (P = W.onDropTargetChange) === null || P === void 0 || P.call(W, V), !U) {
            var D;
            W == null || (D = W.onDragLeave) === null || D === void 0 || D.call(W, V);
          }
        }
      } catch (J) {
        I.e(J);
      } finally {
        I.f();
      }
      var z = Yr(M.location.current.dropTargets), ae;
      try {
        for (z.s(); !(ae = z.n()).done; ) {
          var oe, me, Re = ae.value;
          if (!K.has(Re.element)) {
            var be = mt(mt({}, M), {}, {
              self: Re
            }), se = r.get(Re.element);
            se == null || (oe = se.onDropTargetChange) === null || oe === void 0 || oe.call(se, be), se == null || (me = se.onDragEnter) === null || me === void 0 || me.call(se, be);
          }
        }
      } catch (J) {
        z.e(J);
      } finally {
        z.f();
      }
    }
  };
  function p(w) {
    u[w.eventName](w);
  }
  function v(w) {
    var E = w.source, M = w.target, k = w.input, K = w.current, I = a({
      source: E,
      target: M,
      input: k
    });
    if (I.length >= K.length)
      return I;
    for (var F = Xr(K), P = Xr(I), B = [], W = 0; W < F.length; W++) {
      var U, V = F[W], D = P[W];
      if (D != null) {
        B.push(D);
        continue;
      }
      var z = B[W - 1], ae = F[W - 1];
      if ((z == null ? void 0 : z.element) !== (ae == null ? void 0 : ae.element))
        break;
      var oe = r.get(V.element);
      if (!oe)
        break;
      var me = {
        input: k,
        source: E,
        element: oe.element
      };
      if (oe.canDrop && !oe.canDrop(me) || !((U = oe.getIsSticky) !== null && U !== void 0 && U.call(oe, me)))
        break;
      B.push(mt(mt({}, V), {}, {
        // making it clear to consumers this drop target is active due to stickiness
        isActiveDueToStickiness: !0
      }));
    }
    return Xr(B);
  }
  return {
    dropTargetForConsumers: l,
    getIsOver: v,
    dispatchEvent: p
  };
}
function gp(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = hp(e)) || t) {
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
function hp(e, t) {
  if (e) {
    if (typeof e == "string") return js(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? js(e, t) : void 0;
  }
}
function js(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Hs(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function mp(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Hs(Object(n), !0).forEach(function(r) {
      En(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Hs(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function vp() {
  var e = /* @__PURE__ */ new Set(), t = null;
  function n(s) {
    t && (!s.canMonitor || s.canMonitor(t.canMonitorArgs)) && t.active.add(s);
  }
  function r(s) {
    var i = mp({}, s);
    e.add(i), n(i);
    function l() {
      e.delete(i), t && t.active.delete(i);
    }
    return Lt(l);
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
      var a = gp(e), c;
      try {
        for (a.s(); !(c = a.n()).done; ) {
          var u = c.value;
          n(u);
        }
      } catch (k) {
        a.e(k);
      } finally {
        a.f();
      }
    }
    if (t) {
      for (var p = Array.from(t.active), v = 0, w = p; v < w.length; v++) {
        var E = w[v];
        if (t.active.has(E)) {
          var M;
          (M = E[i]) === null || M === void 0 || M.call(E, l);
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
function yp(e) {
  var t = e.typeKey, n = e.mount, r = e.dispatchEventToSource, o = e.onPostDispatch, s = e.defaultDropEffect, i = vp(), l = pp({
    typeKey: t,
    defaultDropEffect: s
  });
  function a(p) {
    r == null || r(p), l.dispatchEvent(p), i.dispatchEvent(p), o == null || o(p);
  }
  function c(p) {
    var v = p.event, w = p.dragType;
    Ds.start({
      event: v,
      dragType: w,
      getDropTargetsOver: l.getIsOver,
      dispatchEvent: a
    });
  }
  function u() {
    function p() {
      var v = {
        canStart: Ds.canStart,
        start: c
      };
      return n(v);
    }
    return fp({
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
var wp = Lt(function() {
  return navigator.userAgent.toLocaleLowerCase().includes("android");
}), bp = "pdnd:android-fallback", Ls = "text/plain", _p = "text/uri-list", Sp = "application/vnd.pdnd", sr = /* @__PURE__ */ new WeakMap();
function xp(e) {
  return sr.set(e.element, e), function() {
    sr.delete(e.element);
  };
}
var Ks = zd(), Fl = yp({
  typeKey: "element",
  defaultDropEffect: "move",
  mount: function(t) {
    return Rr(Ks.bindEvents(), Ft.bind(document, {
      type: "dragstart",
      listener: function(r) {
        var o, s, i, l, a, c;
        if (t.canStart(r) && !r.defaultPrevented && r.dataTransfer) {
          var u = r.target;
          if (u instanceof HTMLElement) {
            var p = sr.get(u);
            if (p) {
              var v = gn(r), w = {
                element: p.element,
                dragHandle: (o = p.dragHandle) !== null && o !== void 0 ? o : null,
                input: v
              };
              if (p.canDrag && !p.canDrag(w)) {
                r.preventDefault();
                return;
              }
              if (p.dragHandle) {
                var E = Al({
                  x: v.clientX,
                  y: v.clientY
                });
                if (!p.dragHandle.contains(E)) {
                  r.preventDefault();
                  return;
                }
              }
              var M = (s = (i = p.getInitialDataForExternal) === null || i === void 0 ? void 0 : i.call(p, w)) !== null && s !== void 0 ? s : null;
              if (M)
                for (var k = 0, K = Object.entries(M); k < K.length; k++) {
                  var I = El(K[k], 2), F = I[0], P = I[1];
                  r.dataTransfer.setData(F, P ?? "");
                }
              wp() && !r.dataTransfer.types.includes(Ls) && !r.dataTransfer.types.includes(_p) && r.dataTransfer.setData(Ls, bp), r.dataTransfer.setData(Sp, "");
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
    (n = sr.get(s.source.element)) === null || n === void 0 || (r = n[o]) === null || r === void 0 || r.call(
      n,
      // I cannot seem to get the types right here.
      // TS doesn't seem to like that one event can need `nativeSetDragImage`
      // @ts-expect-error
      s
    );
  },
  onPostDispatch: Ks.getOnPostDispatch()
}), Rp = Fl.dropTarget;
function Cp(e) {
  var t = Rr(
    // making the draggable register the adapter rather than drop targets
    // this is because you *must* have a draggable element to start a drag
    // but you _might_ not have any drop targets immediately
    // (You might create drop targets async)
    Fl.registerUsage(),
    xp(e),
    kl(e.element, {
      attribute: "draggable",
      value: "true"
    })
  );
  return Lt(t);
}
function Mp(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
    if (t.indexOf(r) !== -1) continue;
    n[r] = e[r];
  }
  return n;
}
function Ip(e, t) {
  if (e == null) return {};
  var n, r, o = Mp(e, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    for (r = 0; r < s.length; r++) n = s[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (o[n] = e[n]);
  }
  return o;
}
function jl(e, t) {
  var n = Object.keys(e), r = Object.keys(t);
  return n.length !== r.length ? !1 : n.every(function(o) {
    return Object.is(e[o], t[o]);
  });
}
function Ep() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : jl, t = null;
  return function(n) {
    return t && e(t.value, n) || (t = {
      value: n
    }), t.value;
  };
}
var Op = ["block"];
function $s(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Vs(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? $s(Object(n), !0).forEach(function(r) {
      En(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : $s(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Pp(e) {
  return {
    x: (e.right + e.left) / 2,
    y: (e.bottom + e.top) / 2
  };
}
function Jr(e) {
  var t = e.client, n = e.borderBox, r = n.height / 4;
  return t.y <= n.top + r ? "reorder-above" : t.y >= n.bottom - r ? "reorder-below" : "make-child";
}
function Ap(e) {
  var t = e.element, n = e.input, r = e.currentLevel, o = e.indentPerLevel, s = e.mode, i = {
    x: n.clientX,
    y: n.clientY
  }, l = t.getBoundingClientRect();
  if (s === "standard") {
    var a = Jr({
      borderBox: l,
      client: i
    });
    return {
      type: a,
      indentPerLevel: o,
      currentLevel: r
    };
  }
  var c = Pp(l);
  if (s === "expanded") {
    var u = Jr({
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
    type: Jr({
      borderBox: l,
      client: i
    }),
    indentPerLevel: o,
    currentLevel: r
  };
}
function Hl(e, t) {
  return e.type !== t.type ? !1 : e.type === "instruction-blocked" && t.type === "instruction-blocked" ? Hl(e.desired, t.desired) : jl(e, t);
}
var Tp = Ep(Hl);
function Dp(e) {
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
function kp(e, t) {
  var n = t.block, r = Ip(t, Op), o = Ap(r), s = Dp({
    desired: o,
    block: n
  }), i = Tp(s);
  return Vs(Vs({}, e), {}, En({}, Ll, i));
}
function Ns(e) {
  var t;
  return (t = e[Ll]) !== null && t !== void 0 ? t : null;
}
var Ll = Symbol("tree-item-instruction");
const Fp = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/><path fill="#42a5f5" d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5z"/></svg>', jp = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m8.668 6h3.6641l-3.6641-3.668v3.668m-4.668-4.668h5.332l4 4v8c0 0.73828-0.59375 1.3359-1.332 1.3359h-8c-0.73828 0-1.332-0.59766-1.332-1.3359v-10.664c0-0.74219 0.59375-1.3359 1.332-1.3359m3.332 1.3359h-3.332v10.664h8v-6h-4.668z" fill="#90a4ae" /></svg>', Hp = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m6.922 3.768-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232" fill="#90a4ae" /></svg>', Lp = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.483 6H4.721a1 1 0 0 0-.949.684L2 12V5h12a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232l-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h11l2.403-5.606A1 1 0 0 0 14.483 6" fill="#90a4ae" /></svg>', Kp = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#26a69a" d="M8.5 6h4l-4-4zM3.875 1H9.5l4 4v8.6c0 .773-.616 1.4-1.375 1.4h-8.25c-.76 0-1.375-.627-1.375-1.4V2.4c0-.777.612-1.4 1.375-1.4M4 13.6h8V8l-2.625 2.8L8 9.4zm1.25-7.7c-.76 0-1.375.627-1.375 1.4s.616 1.4 1.375 1.4c.76 0 1.375-.627 1.375-1.4S6.009 5.9 5.25 5.9"/></svg>', $p = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#42a5f5" d="m14 10-4 3.5L6 10H4v12h4v-6l2 2 2-2v6h4V10zm12 6v-6h-4v6h-4l6 8 6-8z"/></svg>', Vp = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ef5350" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m4.93 10.44c.41.9.93 1.64 1.53 2.15l.41.32c-.87.16-2.07.44-3.34.93l-.11.04.5-1.04c.45-.87.78-1.66 1.01-2.4m6.48 3.81c.18-.18.27-.41.28-.66.03-.2-.02-.39-.12-.55-.29-.47-1.04-.69-2.28-.69l-1.29.07-.87-.58c-.63-.52-1.2-1.43-1.6-2.56l.04-.14c.33-1.33.64-2.94-.02-3.6a.85.85 0 0 0-.61-.24h-.24c-.37 0-.7.39-.79.77-.37 1.33-.15 2.06.22 3.27v.01c-.25.88-.57 1.9-1.08 2.93l-.96 1.8-.89.49c-1.2.75-1.77 1.59-1.88 2.12-.04.19-.02.36.05.54l.03.05.48.31.44.11c.81 0 1.73-.95 2.97-3.07l.18-.07c1.03-.33 2.31-.56 4.03-.75 1.03.51 2.24.74 3 .74.44 0 .74-.11.91-.3m-.41-.71.09.11c-.01.1-.04.11-.09.13h-.04l-.19.02c-.46 0-1.17-.19-1.9-.51.09-.1.13-.1.23-.1 1.4 0 1.8.25 1.9.35M7.83 17c-.65 1.19-1.24 1.85-1.69 2 .05-.38.5-1.04 1.21-1.69zm3.02-6.91c-.23-.9-.24-1.63-.07-2.05l.07-.12.15.05c.17.24.19.56.09 1.1l-.03.16-.16.82z"/></svg>', Np = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#0288d1" d="M9.86 2A2.86 2.86 0 0 0 7 4.86v1.68h4.29c.39 0 .71.57.71.96H4.86A2.86 2.86 0 0 0 2 10.36v3.781a2.86 2.86 0 0 0 2.86 2.86h1.18v-2.68a2.85 2.85 0 0 1 2.85-2.86h5.25c1.58 0 2.86-1.271 2.86-2.851V4.86A2.86 2.86 0 0 0 14.14 2zm-.72 1.61c.4 0 .72.12.72.71s-.32.891-.72.891c-.39 0-.71-.3-.71-.89s.32-.711.71-.711"/><path fill="#fdd835" d="M17.959 7v2.68a2.85 2.85 0 0 1-2.85 2.859H9.86A2.85 2.85 0 0 0 7 15.389v3.75a2.86 2.86 0 0 0 2.86 2.86h4.28A2.86 2.86 0 0 0 17 19.14v-1.68h-4.291c-.39 0-.709-.57-.709-.96h7.14A2.86 2.86 0 0 0 22 13.64V9.86A2.86 2.86 0 0 0 19.14 7zM8.32 11.513l-.004.004.038-.004zm6.54 7.276c.39 0 .71.3.71.89a.71.71 0 0 1-.71.71c-.4 0-.72-.12-.72-.71s.32-.89.72-.89"/></svg>', Bp = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Wp = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Up = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Gp = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, qp = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, zp = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Yp = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Xp = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Jp = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Zp = ["aria-label"], Qp = {
  key: 0,
  class: "pnl-tst-tsep",
  "aria-hidden": "true"
}, eg = {
  key: 1,
  class: "pnl-tst-search"
}, tg = ["innerHTML"], ng = ["value", "aria-label", "placeholder"], rg = ["aria-label", "aria-keyshortcuts", "aria-disabled", "title", "tabindex", "onClick", "onFocus"], og = ["innerHTML"], sg = {
  key: 1,
  class: "pnl-tst-empty"
}, ig = ["aria-label", "aria-colcount", "aria-rowcount"], lg = {
  key: 0,
  class: "pnl-tst-head",
  role: "rowgroup"
}, ag = {
  class: "pnl-tst-hrow",
  role: "row",
  "aria-rowindex": 1
}, cg = ["aria-colindex"], ug = {
  class: "pnl-tst-body",
  role: "rowgroup"
}, fg = ["aria-level", "aria-posinset", "aria-setsize", "aria-rowindex", "aria-expanded", "aria-selected", "tabindex", "onClick", "onFocus"], dg = ["aria-colindex"], pg = ["onClick"], gg = {
  key: 1,
  class: "pnl-tst-twisty pnl-tst-twisty--leaf",
  "aria-hidden": "true"
}, hg = ["checked", ".indeterminate", "aria-label", "onClick"], mg = ["innerHTML"], vg = { class: "pnl-tst-value" }, yg = "title", Bn = "search", Zr = "|", on = "pnl-tst-row", wg = 500, bg = {
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
      rowExpandingFeature: dd,
      rowSelectionFeature: Cd,
      coreRowModel: hl(),
      expandedRowModel: Md()
    }, r = Q(() => (t.state.columns || []).length > 0), o = Q(() => {
      const f = t.state.columns || [];
      return f.length === 0 ? [{ id: yg, header: "", accessorFn: (h) => h.title }] : f.map((h) => {
        const m = h.field ?? h.id;
        return {
          id: h.id,
          header: h.header ?? h.id,
          accessorFn: (R) => R[m],
          meta: { width: h.width }
        };
      });
    }), s = /* @__PURE__ */ Be(i(t.state.expandedKeys));
    function i(f) {
      const h = {};
      for (const m of f || []) h[m] = !0;
      return h;
    }
    function l(f) {
      return f === !0 ? k.getCoreRowModel().flatRows.filter((h) => h.subRows.length > 0).map((h) => h.id).sort() : Object.keys(f).filter((h) => f[h]).sort();
    }
    const a = {
      document: Fp,
      file: jp,
      folder: Hp,
      "folder-open": Lp,
      image: Kp,
      markdown: $p,
      pdf: Vp,
      python: Np
    };
    function c(f) {
      const h = f.original.icon;
      if (!h) return null;
      const m = { ...a, ...t.state.icons || {} };
      return ke(f) && m[`${h}-open`] ? m[`${h}-open`] : m[h] ?? null;
    }
    function u(f, h) {
      return f.length !== h.length ? !1 : f.every((m, R) => m === h[R]);
    }
    const p = Q(() => t.state.options.select_mode ?? "none"), v = Q(() => p.value !== "none"), w = Q(() => p.value === "hierarchy"), E = Q(
      () => v.value && t.state.options.show_checkboxes !== !1
    ), M = /* @__PURE__ */ Be(i(t.state.selectedKeys)), k = Pd({
      features: n,
      data: Q(() => t.state.source || []),
      columns: o,
      getRowId: (f) => f.key,
      getSubRows: (f) => f.children,
      // TanStack resets `expanded` whenever `data` changes. Python rewrites the
      // whole tree after every move, so leaving that on would collapse the tree on
      // each drop and push an empty `expanded_keys` back. Expansion is owned here.
      autoResetExpanded: !1,
      enableRowSelection: v,
      enableMultiRowSelection: Q(() => p.value !== "single"),
      enableSubRowSelection: w,
      state: Q(() => ({ expanded: s.value, rowSelection: M.value })),
      onExpandedChange: (f) => {
        s.value = typeof f == "function" ? f(s.value) : f;
      },
      onRowSelectionChange: (f) => {
        M.value = typeof f == "function" ? f(M.value) : f;
      }
    });
    function K(f) {
      if (f.getIsSelected()) return "all";
      if (!w.value || f.subRows.length === 0) return "none";
      const h = f.subRows.map(K);
      return h.every((m) => m === "all") ? "all" : h.some((m) => m !== "none") ? "some" : "none";
    }
    Ee(() => l(M.value), t.setSelectedKeys, { flush: "post" }), Ee(() => l(s.value), t.setExpandedKeys, { flush: "post" }), Ee(
      () => t.state.expandedKeys,
      (f) => {
        u(l(s.value), [...f || []].sort()) || (s.value = i(f));
      }
    ), Ee(
      () => t.state.selectedKeys,
      (f) => {
        u(l(M.value), [...f || []].sort()) || (M.value = i(f));
      }
    ), Ee(
      () => [t.state.options.expand_all, t.state.source],
      ([f]) => {
        f && k.toggleAllRowsExpanded(!0);
      },
      { immediate: !0 }
    );
    const I = Q(() => (t.state.filterText ?? "").trim().toLowerCase()), F = Q(() => I.value.length > 0), P = /* @__PURE__ */ Be(t.state.filterText ?? "");
    Ee(
      () => t.state.filterText,
      (f) => {
        P.value = f ?? "";
      }
    );
    function B(f) {
      P.value = f, t.setFilterText(f);
    }
    function W(f) {
      return f.getAllCells().some((h) => String(h.getValue() ?? "").toLowerCase().includes(I.value));
    }
    const U = Q(() => {
      if (!F.value) return k.getRowModel().rows;
      const f = /* @__PURE__ */ new Set();
      for (const h of k.getCoreRowModel().flatRows)
        if (W(h)) {
          f.add(h.id);
          for (let m = h.getParentRow(); m; m = m.getParentRow()) f.add(m.id);
        }
      return k.getCoreRowModel().flatRows.filter((h) => f.has(h.id));
    }), V = Q(() => {
      var f;
      return ((f = k.getHeaderGroups()[0]) == null ? void 0 : f.headers) ?? [];
    }), D = Q(() => t.state.options.indent_px ?? 16), z = Q(() => t.state.options.aria_label ?? "Tree table"), ae = Q(() => F.value ? "No matches" : "No data"), oe = Q(() => r.value ? 2 : 1), me = Q(() => U.value.length + (r.value ? 1 : 0)), Re = Q(() => {
      const f = /* @__PURE__ */ new Map();
      for (const h of U.value) {
        const m = h.parentId ?? "", R = f.get(m) ?? [];
        R.push(h.id), f.set(m, R);
      }
      return f;
    });
    function be(f) {
      return Re.value.get(f.parentId ?? "") ?? [];
    }
    function se(f) {
      return be(f).indexOf(f.id) + 1;
    }
    function J(f) {
      return be(f).length;
    }
    function X(f) {
      return F.value ? (Re.value.get(f.id) ?? []).length > 0 : f.getCanExpand();
    }
    function ke(f) {
      return F.value ? X(f) : f.getIsExpanded();
    }
    function dt(f) {
      var m;
      const h = (m = f.meta) == null ? void 0 : m.width;
      return h ? { flex: `0 0 ${h}px` } : { flex: "1 1 0" };
    }
    function Qe(f, h) {
      return { ...dt(h), paddingInlineStart: `${f.depth * D.value}px` };
    }
    const he = /* @__PURE__ */ Be(null), _t = /* @__PURE__ */ new Map();
    function Mr(f, h) {
      h ? _t.set(f, h) : _t.delete(f);
    }
    const Kt = Q(() => {
      const f = U.value;
      return f.length === 0 ? null : f.some((h) => h.id === he.value) ? he.value : f[0].id;
    });
    function Fe(f) {
      f != null && (he.value = f, oo(() => {
        var h;
        return (h = _t.get(f)) == null ? void 0 : h.focus();
      }));
    }
    function pt(f) {
      const h = U.value;
      h.length !== 0 && Fe(h[Math.max(0, Math.min(f, h.length - 1))].id);
    }
    function $t(f, h) {
      const m = U.value;
      if (m.length === 0) return;
      const R = m[Math.max(0, Math.min(f, m.length - 1))], j = (h == null ? void 0 : h.shiftKey) && v.value && p.value !== "single";
      j && je.value === null && (je.value = Kt.value), Fe(R.id), j && d(R, !1);
    }
    function On(f) {
      const h = U.value;
      if (h.length === 0) return;
      const m = Math.max(
        0,
        h.findIndex((j) => j.id === Kt.value)
      ), R = h[m];
      if (f.ctrlKey || f.metaKey) {
        const j = { a: "select-all", f: Bn }[f.key.toLowerCase()];
        if (j && q(j)) {
          f.preventDefault(), ye(j);
          return;
        }
      }
      if (f.altKey) {
        const j = {
          ArrowUp: "move-up",
          ArrowDown: "move-down",
          ArrowLeft: "outdent",
          ArrowRight: "indent"
        }[f.key];
        if (j && q(j)) {
          f.preventDefault(), ye(j);
          return;
        }
      }
      if (f.key === "Escape" && q("clear-selection")) {
        f.preventDefault(), ye("clear-selection");
        return;
      }
      switch (f.key) {
        case "ArrowDown":
          f.preventDefault(), $t(m + 1, f);
          break;
        case "ArrowUp":
          f.preventDefault(), $t(m - 1, f);
          break;
        case "ArrowRight":
          if (f.preventDefault(), !X(R)) break;
          ke(R) ? pt(m + 1) : (R.toggleExpanded(!0), Fe(R.id));
          break;
        case "ArrowLeft":
          f.preventDefault(), !F.value && R.getCanExpand() && R.getIsExpanded() ? (R.toggleExpanded(!1), Fe(R.id)) : R.parentId && Fe(R.parentId);
          break;
        case "Home":
          f.preventDefault(), pt(0);
          break;
        case "End":
          f.preventDefault(), pt(h.length - 1);
          break;
        case "Enter":
          f.preventDefault(), t.emitEvent("activate", { key: R.id });
          break;
        case " ":
          if (!v.value) break;
          f.preventDefault(), A(R);
          break;
      }
    }
    const je = /* @__PURE__ */ Be(null);
    function Pn(f) {
      je.value = f.id, M.value = {}, f.toggleSelected(!0, { selectChildren: !1 });
    }
    function d(f, h) {
      const m = U.value, R = m.findIndex((et) => et.id === je.value), j = m.findIndex((et) => et.id === f.id);
      if (j === -1) return;
      if (R === -1) {
        Pn(f);
        return;
      }
      h || (M.value = {});
      const [ue, xt] = R <= j ? [R, j] : [j, R];
      for (let et = ue; et <= xt; et += 1)
        m[et].toggleSelected(!0, { selectChildren: !1 });
    }
    function g(f, h) {
      he.value = f.id, v.value && p.value !== "single" ? h != null && h.shiftKey ? d(f, h.ctrlKey || h.metaKey) : h != null && h.ctrlKey || h != null && h.metaKey ? (je.value = f.id, b(f)) : Pn(f) : v.value && Pn(f), t.emitEvent("activate", { key: f.id });
    }
    function y(f) {
      he.value = f.id, !F.value && f.toggleExpanded();
    }
    function x(f) {
      return K(f) === "all";
    }
    function S(f) {
      return K(f) === "some";
    }
    function b(f) {
      he.value = f.id, f.toggleSelected(void 0, { selectChildren: !1 });
    }
    function A(f) {
      he.value = f.id, f.toggleSelected(!x(f), {
        selectChildren: w.value,
        deselectParents: w.value
      });
    }
    function O(f) {
      A(f), Fe(f.id);
    }
    const C = {
      "move-up": { icon: Wp, label: "Move up", keys: "Alt+ArrowUp" },
      "move-down": { icon: Bp, label: "Move down", keys: "Alt+ArrowDown" },
      outdent: { icon: qp, label: "Outdent", keys: "Alt+ArrowLeft" },
      indent: { icon: zp, label: "Indent", keys: "Alt+ArrowRight" },
      "expand-all": { icon: Up, label: "Expand all" },
      "collapse-all": { icon: Gp, label: "Collapse all" },
      "select-all": { icon: Jp, label: "Select all", keys: "Control+A" },
      "clear-selection": { icon: Xp, label: "Clear selection", keys: "Escape" }
    }, _ = [
      "move-up",
      "move-down",
      "outdent",
      "indent",
      Zr,
      "expand-all",
      "collapse-all",
      Zr,
      "select-all",
      "clear-selection",
      Bn
    ], H = Q(() => {
      const f = t.state.options.toolbar;
      return (f === !0 ? _ : Array.isArray(f) ? f : []).filter((m) => m === Zr || m === Bn || m in C);
    }), T = Q(() => H.value.length > 0), L = Q(() => t.state.options.toolbar_label ?? "Tree actions"), $ = Q(() => t.state.options.search_label ?? "Search");
    function q(f) {
      return H.value.includes(f);
    }
    const Y = Q(() => U.value.find((f) => f.id === Kt.value) ?? null);
    function Z(f) {
      return U.value.filter((h) => (h.parentId ?? "") === (f.parentId ?? ""));
    }
    function fe() {
      const f = Y.value;
      if (!f) return [];
      const h = $o(f), m = f.parentId ?? "";
      return h.every((j) => {
        var ue;
        return (((ue = kn(j)) == null ? void 0 : ue.parentId) ?? "") === m;
      }) ? h : [f.id];
    }
    function ce(f) {
      const h = Y.value;
      if (!h) return null;
      const m = new Set(fe()), R = Z(h), j = R.map((xt, et) => m.has(xt.id) ? et : -1).filter((xt) => xt >= 0);
      if (j.length === 0) return null;
      let ue = (f < 0 ? Math.min(...j) : Math.max(...j)) + f;
      for (; ue >= 0 && ue < R.length && m.has(R[ue].id); ) ue += f;
      return R[ue] ?? null;
    }
    let Ce = null;
    Ee(
      () => t.state.source,
      () => {
        if (Ce === null) return;
        const f = Ce;
        Ce = null, Fe(f);
      }
    );
    function Me(f, h) {
      const m = Y.value;
      !m || !f || (Ce = m.id, t.emitEvent("move", {
        key: m.id,
        keys: fe(),
        position: h,
        anchorKey: f.id
      }));
    }
    function gt(f) {
      var h;
      switch (f) {
        case "move-up":
          return ce(-1) !== null;
        case "move-down":
          return ce(1) !== null;
        case "indent": {
          const m = ce(-1);
          return m !== null && m.original.allow_children !== !1;
        }
        case "outdent":
          return !!((h = Y.value) != null && h.parentId);
        case "expand-all":
        case "collapse-all":
          return U.value.length > 0 && !F.value;
        case "select-all":
          return U.value.length > 0 && v.value && p.value !== "single";
        case "clear-selection":
          return v.value && l(M.value).length > 0;
        default:
          return !0;
      }
    }
    function An(f) {
      const h = C[f];
      return h.keys ? `${h.label} (${h.keys.replace("Control", "Ctrl")})` : h.label;
    }
    function ye(f) {
      var h, m, R, j;
      if (!(!q(f) || !gt(f)))
        switch (f) {
          case "move-up":
            Me(ce(-1), "before");
            break;
          case "move-down":
            Me(ce(1), "after");
            break;
          case "indent": {
            const ue = ce(-1);
            ue && !F.value && ue.toggleExpanded(!0), Me(ue, "child");
            break;
          }
          case "outdent":
            Me(kn((h = Y.value) == null ? void 0 : h.parentId), "after");
            break;
          case "expand-all":
            k.toggleAllRowsExpanded(!0);
            break;
          case "collapse-all":
            k.toggleAllRowsExpanded(!1);
            break;
          case "select-all":
            M.value = Object.fromEntries(U.value.map((ue) => [ue.id, !0])), je.value = ((m = U.value[0]) == null ? void 0 : m.id) ?? null;
            break;
          case "clear-selection":
            M.value = {}, je.value = null;
            break;
          case Bn:
            (R = Te.value) == null || R.focus(), (j = Te.value) == null || j.select();
            break;
        }
    }
    const Te = /* @__PURE__ */ Be(null), Vt = Q(() => H.value.filter((f) => f in C)), St = /* @__PURE__ */ Be(null), Ir = /* @__PURE__ */ new Map(), Ko = Q(() => {
      const f = Vt.value;
      return f.length === 0 ? null : f.includes(St.value) ? St.value : f[0];
    });
    function Kl(f, h) {
      h ? Ir.set(f, h) : Ir.delete(f);
    }
    function Tn(f) {
      const h = Vt.value;
      if (h.length === 0) return;
      const m = h[Math.max(0, Math.min(f, h.length - 1))];
      St.value = m, oo(() => {
        var R;
        return (R = Ir.get(m)) == null ? void 0 : R.focus();
      });
    }
    function $l(f) {
      const h = Vt.value, m = Math.max(0, h.indexOf(Ko.value));
      switch (f.key) {
        case "ArrowRight":
          f.preventDefault(), Tn(m + 1);
          break;
        case "ArrowLeft":
          f.preventDefault(), Tn(m - 1);
          break;
        case "Home":
          f.preventDefault(), Tn(0);
          break;
        case "End":
          f.preventDefault(), Tn(h.length - 1);
          break;
      }
    }
    const Vl = ["reorder-above", "reorder-below", "make-child", "reparent"], Er = Q(() => t.state.options.enable_dnd === !0), Or = /* @__PURE__ */ Be([]), Dn = /* @__PURE__ */ Be(null);
    function kn(f) {
      return U.value.find((h) => h.id === f) ?? null;
    }
    function Nl(f, h) {
      let m = f;
      for (; m; ) {
        if (h.includes(m.id)) return !0;
        m = m.getParentRow();
      }
      return !1;
    }
    function $o(f) {
      if (!v.value || !f.getIsSelected()) return [f.id];
      const h = /* @__PURE__ */ new Set();
      for (let R = f.getParentRow(); R; R = R.getParentRow()) h.add(R.id);
      const m = U.value.filter((R) => R.getIsSelected() && !h.has(R.id)).map((R) => R.id);
      return m.length > 1 ? m : [f.id];
    }
    function Bl(f, h) {
      return Nl(f, h) ? Vl : f.original.allow_children === !1 ? ["make-child"] : [];
    }
    function Wl(f) {
      if (X(f) && ke(f)) return "expanded";
      const h = be(f);
      return h[h.length - 1] === f.id ? "last-in-group" : "standard";
    }
    let Pr = null, tn = null;
    function Ar() {
      tn && clearTimeout(tn), tn = null, Pr = null;
    }
    function Ul(f, h) {
      if (Pr === f || (Ar(), !h || h.type === "instruction-blocked")) return;
      const m = kn(f);
      !m || !m.getCanExpand() || m.getIsExpanded() || (Pr = f, tn = setTimeout(() => {
        tn = null;
        const R = kn(f);
        R && R.getCanExpand() && !R.getIsExpanded() && R.toggleExpanded(!0);
      }, wg));
    }
    function Tr() {
      Dn.value = null, Ar();
    }
    const Vo = /* @__PURE__ */ Be(null);
    function Gl() {
      let f = Vo.value;
      if (!f) return null;
      let h = f.getRootNode();
      for (; h.host; )
        f = h.host, h = f.getRootNode();
      return f;
    }
    function Fn(f) {
      for (const h of U.value) {
        const m = _t.get(h.id);
        if (!m) continue;
        const R = m.getBoundingClientRect();
        if (f.clientX >= R.left && f.clientX < R.right && f.clientY >= R.top && f.clientY < R.bottom)
          return { row: h, element: m, rect: R };
      }
      return null;
    }
    function ql(f, h) {
      for (const m of f.element.querySelectorAll(".pnl-tst-check, .pnl-tst-twisty")) {
        const R = m.getBoundingClientRect();
        if (h.clientX >= R.left && h.clientX < R.right && h.clientY >= R.top && h.clientY < R.bottom)
          return !0;
      }
      return !1;
    }
    let ht = null;
    function No() {
      ht == null || ht(), ht = null;
      const f = Gl();
      !f || !Er.value || (ht = Rr(
        Cp({
          element: f,
          // Anything outside a row (the header, the empty space below the last row)
          // is not a drag handle, and returning false cancels the native drag.
          canDrag: ({ input: h }) => {
            const m = Fn(h);
            return m !== null && !ql(m, h);
          },
          getInitialData: ({ input: h }) => {
            const m = Fn(h);
            return m ? { type: on, key: m.row.id, keys: $o(m.row) } : { type: on, key: null, keys: [] };
          },
          onGenerateDragPreview: ({ location: h, nativeSetDragImage: m }) => {
            const R = h.current.input, j = Fn(R);
            !j || !m || m(j.element, R.clientX - j.rect.left, R.clientY - j.rect.top);
          },
          onDragStart: ({ source: h }) => {
            Or.value = h.data.keys ?? [];
          },
          onDrop: () => {
            Or.value = [], Tr();
          }
        }),
        Rp({
          element: f,
          canDrop: ({ source: h }) => h.data.type === on,
          getData: ({ input: h, source: m }) => {
            const R = Fn(h);
            if (!R) return { type: on, key: null };
            const j = { type: on, key: R.row.id };
            return kp(j, {
              element: R.element,
              input: h,
              currentLevel: R.row.depth,
              indentPerLevel: D.value,
              mode: Wl(R.row),
              block: Bl(R.row, m.data.keys ?? [])
            });
          },
          onDrag: ({ self: h }) => {
            const m = h.data.key, R = Ns(h.data);
            Dn.value = m && R ? { key: m, instruction: R } : null, Ul(m ?? null, R);
          },
          onDragLeave: Tr,
          onDrop: ({ self: h, source: m }) => {
            Tr();
            const R = h.data.key, j = Ns(h.data);
            if (!R || !j || j.type === "instruction-blocked") return;
            const ue = m.data.keys ?? [];
            ue.includes(R) || t.emitEvent("move", {
              key: m.data.key,
              keys: ue,
              targetKey: R,
              instruction: j.type,
              desiredLevel: j.desiredLevel ?? j.currentLevel
            });
          }
        })
      ));
    }
    Ci(No), Ee(Er, No), Mi(() => {
      Ar(), ht == null || ht();
    });
    function Dr(f) {
      var h;
      return ((h = Dn.value) == null ? void 0 : h.key) === f.id ? Dn.value.instruction : null;
    }
    function zl(f) {
      const h = Dr(f);
      return {
        "pnl-tst-row--draggable": Er.value,
        "pnl-tst-row--dragging": Or.value.includes(f.id),
        "pnl-tst-row--blocked": (h == null ? void 0 : h.type) === "instruction-blocked",
        "pnl-tst-row--child-target": (h == null ? void 0 : h.type) === "make-child"
      };
    }
    function Bo(f) {
      const h = Dr(f);
      return h ? h.type === "reorder-above" ? "pnl-tst-dropline--above" : h.type === "reorder-below" || h.type === "reparent" ? "pnl-tst-dropline--below" : null : null;
    }
    function Yl(f) {
      const h = Dr(f);
      return h ? { insetInlineStart: `${(h.type === "reparent" ? h.desiredLevel : h.currentLevel) * h.indentPerLevel}px` } : null;
    }
    return (f, h) => (de(), pe("div", {
      ref_key: "rootElement",
      ref: Vo,
      class: "pnl-tst"
    }, [
      T.value ? (de(), pe("div", {
        key: 0,
        class: "pnl-tst-toolbar",
        role: "toolbar",
        "aria-orientation": "horizontal",
        "aria-label": L.value
      }, [
        (de(!0), pe(Pe, null, Kn(H.value, (m, R) => (de(), pe(Pe, {
          key: `${m}-${R}`
        }, [
          m === "|" ? (de(), pe("span", Qp)) : m === "search" ? (de(), pe("label", eg, [
            Ge("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: Pt(Yp)
            }, null, 8, tg),
            Ge("input", {
              ref_for: !0,
              ref: (j) => Te.value = j,
              type: "search",
              value: P.value,
              "aria-label": $.value,
              placeholder: $.value,
              onInput: h[0] || (h[0] = (j) => B(j.target.value))
            }, null, 40, ng)
          ])) : (de(), pe("button", {
            key: 2,
            ref_for: !0,
            ref: (j) => Kl(m, j),
            type: "button",
            class: "pnl-tst-tbtn",
            "aria-label": C[m].label,
            "aria-keyshortcuts": C[m].keys,
            "aria-disabled": !gt(m),
            title: An(m),
            tabindex: m === Ko.value ? 0 : -1,
            onClick: (j) => ye(m),
            onFocus: (j) => St.value = m,
            onKeydown: $l
          }, [
            Ge("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: C[m].icon
            }, null, 8, og)
          ], 40, rg))
        ], 64))), 128))
      ], 8, Zp)) : Bt("", !0),
      U.value.length === 0 ? (de(), pe("div", sg, Wn(ae.value), 1)) : (de(), pe("div", {
        key: 2,
        class: "pnl-tst-grid",
        role: "treegrid",
        "aria-label": z.value,
        "aria-colcount": V.value.length,
        "aria-rowcount": me.value,
        onKeydown: On
      }, [
        r.value ? (de(), pe("div", lg, [
          Ge("div", ag, [
            (de(!0), pe(Pe, null, Kn(V.value, (m, R) => (de(), pe("div", {
              key: m.id,
              class: "pnl-tst-hcell",
              role: "columnheader",
              "aria-colindex": R + 1,
              style: qt(dt(m.column.columnDef))
            }, Wn(m.column.columnDef.header), 13, cg))), 128))
          ])
        ])) : Bt("", !0),
        Ge("div", ug, [
          (de(!0), pe(Pe, null, Kn(U.value, (m, R) => (de(), pe("div", {
            key: m.id,
            ref_for: !0,
            ref: (j) => Mr(m.id, j),
            class: It(["pnl-tst-row", [zl(m), { "pnl-tst-row--active": m.id === he.value }]]),
            role: "row",
            "aria-level": m.depth + 1,
            "aria-posinset": se(m),
            "aria-setsize": J(m),
            "aria-rowindex": R + oe.value,
            "aria-expanded": X(m) ? ke(m) : void 0,
            "aria-selected": v.value ? m.getIsSelected() : void 0,
            tabindex: m.id === Kt.value ? 0 : -1,
            onClick: (j) => g(m, j),
            onFocus: (j) => he.value = m.id
          }, [
            Bo(m) ? (de(), pe("span", {
              key: 0,
              class: It(["pnl-tst-dropline", Bo(m)]),
              style: qt(Yl(m)),
              "aria-hidden": "true"
            }, null, 6)) : Bt("", !0),
            (de(!0), pe(Pe, null, Kn(m.getAllCells(), (j, ue) => (de(), pe("div", {
              key: j.id,
              class: It(["pnl-tst-cell", { "pnl-tst-cell--tree": ue === 0 }]),
              role: "gridcell",
              "aria-colindex": ue + 1,
              style: qt(
                ue === 0 ? Qe(m, j.column.columnDef) : dt(j.column.columnDef)
              )
            }, [
              ue === 0 ? (de(), pe(Pe, { key: 0 }, [
                X(m) ? (de(), pe("span", {
                  key: 0,
                  class: It(["pnl-tst-twisty", { "pnl-tst-twisty--open": ke(m) }]),
                  "aria-hidden": "true",
                  onClick: ys((xt) => y(m), ["stop"])
                }, [...h[1] || (h[1] = [
                  Ge("svg", {
                    viewBox: "0 0 16 16",
                    width: "12",
                    height: "12",
                    focusable: "false"
                  }, [
                    Ge("path", {
                      d: "M6 3.5 10.5 8 6 12.5",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "1.6"
                    })
                  ], -1)
                ])], 10, pg)) : (de(), pe("span", gg)),
                E.value ? (de(), pe("input", {
                  key: 2,
                  class: "pnl-tst-check",
                  type: "checkbox",
                  tabindex: "-1",
                  checked: x(m),
                  ".indeterminate": S(m),
                  "aria-label": `Select ${m.original.title ?? m.id}`,
                  onClick: ys((xt) => O(m), ["stop"])
                }, null, 40, hg)) : Bt("", !0),
                c(m) ? (de(), pe("span", {
                  key: 3,
                  class: "pnl-tst-icon",
                  "aria-hidden": "true",
                  innerHTML: c(m)
                }, null, 8, mg)) : Bt("", !0)
              ], 64)) : Bt("", !0),
              Ge("span", vg, Wn(j.getValue()), 1)
            ], 14, dg))), 128))
          ], 42, fg))), 128))
        ])
      ], 40, ig))
    ], 512));
  }
};
function _g({ model: e, el: t }) {
  t.style.display = "block", t.style.width = "100%", t.style.height = "100%";
  const n = document.createElement("div");
  n.className = "pnl-tst-root", n.style.height = "100%", t.append(n);
  const r = /* @__PURE__ */ dr({
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
  }, s = (p, v) => p.length === v.length && p.every((w, E) => w === v[E]), i = (p) => (v) => {
    const w = [...e.get(p) || []].sort();
    s(w, v) || (e.set(p, v), e.save_changes());
  }, l = i("expanded_keys"), a = i("selected_keys"), u = vu(bg, {
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
  _g as render
};

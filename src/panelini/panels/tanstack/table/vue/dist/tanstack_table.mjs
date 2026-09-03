/**
* @vue/shared v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function ks(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const pe = {}, gn = [], ct = () => {
}, Pl = () => !1, ro = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), oo = (e) => e.startsWith("onUpdate:"), De = Object.assign, Ts = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Lu = Object.prototype.hasOwnProperty, ie = (e, t) => Lu.call(e, t), U = Array.isArray, Lt = (e) => or(e) === "[object Map]", $r = (e) => or(e) === "[object Set]", Ai = (e) => or(e) === "[object Date]", X = (e) => typeof e == "function", be = (e) => typeof e == "string", ut = (e) => typeof e == "symbol", ue = (e) => e !== null && typeof e == "object", Dl = (e) => (ue(e) || X(e)) && X(e.then) && X(e.catch), kl = Object.prototype.toString, or = (e) => kl.call(e), ju = (e) => or(e).slice(8, -1), Tl = (e) => or(e) === "[object Object]", Fs = (e) => be(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Vn = /* @__PURE__ */ ks(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), so = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, zu = /-\w/g, Ye = so(
  (e) => e.replace(zu, (t) => t.slice(1).toUpperCase())
), Ku = /\B([A-Z])/g, Zt = so(
  (e) => e.replace(Ku, "-$1").toLowerCase()
), Fl = so((e) => e.charAt(0).toUpperCase() + e.slice(1)), Wo = so(
  (e) => e ? `on${Fl(e)}` : ""
), lt = (e, t) => !Object.is(e, t), Uo = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Hl = (e, t, n, r = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: r,
    value: n
  });
}, Vu = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Oi;
const io = () => Oi || (Oi = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Ft(e) {
  if (U(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], o = be(r) ? Wu(r) : Ft(r);
      if (o)
        for (const s in o)
          t[s] = o[s];
    }
    return t;
  } else if (be(e) || ue(e))
    return e;
}
const Bu = /;(?![^(]*\))/g, Nu = /:([^]+)/, $u = /\/\*[^]*?\*\//g;
function Wu(e) {
  const t = {};
  return e.replace($u, "").split(Bu).forEach((n) => {
    if (n) {
      const r = n.split(Nu);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function ot(e) {
  let t = "";
  if (be(e))
    t = e;
  else if (U(e))
    for (let n = 0; n < e.length; n++) {
      const r = ot(e[n]);
      r && (t += r + " ");
    }
  else if (ue(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Uu = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", qu = /* @__PURE__ */ ks(Uu);
function Ll(e) {
  return !!e || e === "";
}
function Gu(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let r = 0; n && r < e.length; r++)
    n = lo(e[r], t[r]);
  return n;
}
function Pi(e, t) {
  if (e.size !== t.size) return !1;
  const n = Array.from(t), r = new Uint8Array(n.length);
  for (const o of e) {
    let s = -1;
    for (let i = 0; i < n.length; i++)
      if (!r[i] && lo(o, n[i])) {
        s = i;
        break;
      }
    if (s < 0) return !1;
    r[s] = 1;
  }
  return !0;
}
function lo(e, t) {
  if (e === t) return !0;
  let n = Ai(e), r = Ai(t);
  if (n || r)
    return n && r ? e.getTime() === t.getTime() : !1;
  if (n = ut(e), r = ut(t), n || r)
    return e === t;
  if (n = U(e), r = U(t), n || r)
    return n && r ? Gu(e, t) : !1;
  if (n = ue(e), r = ue(t), n || r) {
    if (!n || !r)
      return !1;
    if (n = Lt(e), r = Lt(t), n || r || (n = $r(e), r = $r(t), n || r))
      return n && r ? Pi(e, t) : !1;
    const o = Object.keys(e).length, s = Object.keys(t).length;
    if (o !== s)
      return !1;
    for (const i in e) {
      const a = e.hasOwnProperty(i), c = t.hasOwnProperty(i);
      if (a && !c || !a && c || !lo(e[i], t[i]))
        return !1;
    }
  }
  return String(e) === String(t);
}
const jl = (e) => !!(e && e.__v_isRef === !0), kt = (e) => be(e) ? e : e == null ? "" : U(e) || ue(e) && (e.toString === kl || !X(e.toString)) ? jl(e) ? kt(e.value) : JSON.stringify(e, zl, 2) : String(e), zl = (e, t) => jl(t) ? zl(e, t.value) : Lt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [r, o], s) => (n[qo(r, s) + " =>"] = o, n),
    {}
  )
} : $r(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => qo(n))
} : ut(t) ? qo(t) : ue(t) && !U(t) && !Tl(t) ? String(t) : t, qo = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    ut(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let xe;
class Xu {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && xe && (xe.active ? (this.parent = xe, this.index = (xe.scopes || (xe.scopes = [])).push(
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
      const n = xe;
      try {
        return xe = this, t();
      } finally {
        xe = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = xe, xe = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (xe === this)
        xe = this.prevScope;
      else {
        let t = xe;
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
function Kl() {
  return xe;
}
function Yu(e, t = !1) {
  xe && xe.cleanups.push(e);
}
let ge;
const Go = /* @__PURE__ */ new WeakSet();
class Vl {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, xe && (xe.active ? xe.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Go.has(this) && (Go.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Nl(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Di(this), $l(this);
    const t = ge, n = Ze;
    ge = this, Ze = !0;
    try {
      return this.fn();
    } finally {
      Wl(this), ge = t, Ze = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        js(t);
      this.deps = this.depsTail = void 0, Di(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Go.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    fs(this) && this.run();
  }
  get dirty() {
    return fs(this);
  }
}
let Bl = 0, Bn, Nn;
function Nl(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Nn, Nn = e;
    return;
  }
  e.next = Bn, Bn = e;
}
function Hs() {
  Bl++;
}
function Ls() {
  if (--Bl > 0)
    return;
  if (Nn) {
    let t = Nn;
    for (Nn = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; Bn; ) {
    let t = Bn;
    for (Bn = void 0; t; ) {
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
function $l(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Wl(e) {
  let t, n = e.depsTail, r = n;
  for (; r; ) {
    const o = r.prevDep;
    r.version === -1 ? (r === n && (n = o), js(r), Zu(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = o;
  }
  e.deps = t, e.depsTail = n;
}
function fs(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Ul(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Ul(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Xn) || (e.globalVersion = Xn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !fs(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = ge, r = Ze;
  ge = e, Ze = !0;
  try {
    $l(e);
    const o = e.fn(e._value);
    (t.version === 0 || lt(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    ge = n, Ze = r, Wl(e), e.flags &= -3;
  }
}
function js(e, t = !1) {
  const { dep: n, prevSub: r, nextSub: o } = e;
  if (r && (r.nextSub = o, e.prevSub = void 0), o && (o.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
    n.computed.flags &= -5;
    for (let s = n.computed.deps; s; s = s.nextDep)
      js(s, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Zu(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let Ze = !0;
const ql = [];
function xt() {
  ql.push(Ze), Ze = !1;
}
function Rt() {
  const e = ql.pop();
  Ze = e === void 0 ? !0 : e;
}
function Di(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = ge;
    ge = void 0;
    try {
      t();
    } finally {
      ge = n;
    }
  }
}
let Xn = 0;
class Ju {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class zs {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!ge || !Ze || ge === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== ge)
      n = this.activeLink = new Ju(ge, this), ge.deps ? (n.prevDep = ge.depsTail, ge.depsTail.nextDep = n, ge.depsTail = n) : ge.deps = ge.depsTail = n, Gl(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const r = n.nextDep;
      r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = ge.depsTail, n.nextDep = void 0, ge.depsTail.nextDep = n, ge.depsTail = n, ge.deps === n && (ge.deps = r);
    }
    return n;
  }
  trigger(t) {
    this.version++, Xn++, this.notify(t);
  }
  notify(t) {
    Hs();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Ls();
    }
  }
}
function Gl(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let r = t.deps; r; r = r.nextDep)
        Gl(r);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const ds = /* @__PURE__ */ new WeakMap(), $t = /* @__PURE__ */ Symbol(
  ""
), gs = /* @__PURE__ */ Symbol(
  ""
), Yn = /* @__PURE__ */ Symbol(
  ""
);
function Oe(e, t, n) {
  if (Ze && ge) {
    let r = ds.get(e);
    r || ds.set(e, r = /* @__PURE__ */ new Map());
    let o = r.get(n);
    o || (r.set(n, o = new zs()), o.map = r, o.key = n), o.track();
  }
}
function _t(e, t, n, r, o, s) {
  const i = ds.get(e);
  if (!i) {
    Xn++;
    return;
  }
  const a = (c) => {
    c && c.trigger();
  };
  if (Hs(), t === "clear")
    i.forEach(a);
  else {
    const c = U(e), f = c && Fs(n);
    if (c && n === "length") {
      const d = Number(r);
      i.forEach((h, w) => {
        (w === "length" || w === Yn || !ut(w) && w >= d) && a(h);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && a(i.get(n)), f && a(i.get(Yn)), t) {
        case "add":
          c ? f && a(i.get("length")) : (a(i.get($t)), Lt(e) && a(i.get(gs)));
          break;
        case "delete":
          c || (a(i.get($t)), Lt(e) && a(i.get(gs)));
          break;
        case "set":
          Lt(e) && a(i.get($t));
          break;
      }
  }
  Ls();
}
function an(e) {
  const t = /* @__PURE__ */ se(e);
  return t === e ? t : (Oe(t, "iterate", Yn), /* @__PURE__ */ $e(e) ? t : t.map(Je));
}
function ao(e) {
  return Oe(e = /* @__PURE__ */ se(e), "iterate", Yn), e;
}
function st(e, t) {
  return /* @__PURE__ */ Ct(e) ? vn(/* @__PURE__ */ Wt(e) ? Je(t) : t) : Je(t);
}
const Qu = {
  __proto__: null,
  [Symbol.iterator]() {
    return Xo(this, Symbol.iterator, (e) => st(this, e));
  },
  concat(...e) {
    return an(this).concat(
      ...e.map((t) => U(t) ? an(t) : t)
    );
  },
  entries() {
    return Xo(this, "entries", (e) => (e[1] = st(this, e[1]), e));
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
      (n) => n.map((r) => st(this, r)),
      arguments
    );
  },
  find(e, t) {
    return wt(
      this,
      "find",
      e,
      t,
      (n) => st(this, n),
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
      (n) => st(this, n),
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
    return Yo(this, "includes", e);
  },
  indexOf(...e) {
    return Yo(this, "indexOf", e);
  },
  join(e) {
    return an(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Yo(this, "lastIndexOf", e);
  },
  map(e, t) {
    return wt(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Fn(this, "pop");
  },
  push(...e) {
    return Fn(this, "push", e);
  },
  reduce(e, ...t) {
    return ki(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return ki(this, "reduceRight", e, t);
  },
  shift() {
    return Fn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return wt(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Fn(this, "splice", e);
  },
  toReversed() {
    return an(this).toReversed();
  },
  toSorted(e) {
    return an(this).toSorted(e);
  },
  toSpliced(...e) {
    return an(this).toSpliced(...e);
  },
  unshift(...e) {
    return Fn(this, "unshift", e);
  },
  values() {
    return Xo(this, "values", (e) => st(this, e));
  }
};
function Xo(e, t, n) {
  const r = ao(e), o = r[t]();
  return r !== e && !/* @__PURE__ */ $e(e) && (o._next = o.next, o.next = () => {
    const s = o._next();
    return s.done || (s.value = n(s.value)), s;
  }), o;
}
const ef = Array.prototype;
function wt(e, t, n, r, o, s) {
  const i = ao(e), a = i !== e && !/* @__PURE__ */ $e(e), c = i[t];
  if (c !== ef[t]) {
    const h = c.apply(e, s);
    return a ? Je(h) : h;
  }
  let f = n;
  i !== e && (a ? f = function(h, w) {
    return n.call(this, st(e, h), w, e);
  } : n.length > 2 && (f = function(h, w) {
    return n.call(this, h, w, e);
  }));
  const d = c.call(i, f, r);
  return a && o ? o(d) : d;
}
function ki(e, t, n, r) {
  const o = ao(e), s = o !== e && !/* @__PURE__ */ $e(e);
  let i = n, a = !1;
  o !== e && (s ? (a = r.length === 0, i = function(f, d, h) {
    return a && (a = !1, f = st(e, f)), n.call(this, f, st(e, d), h, e);
  }) : n.length > 3 && (i = function(f, d, h) {
    return n.call(this, f, d, h, e);
  }));
  const c = o[t](i, ...r);
  return a ? st(e, c) : c;
}
function Yo(e, t, n) {
  const r = /* @__PURE__ */ se(e);
  Oe(r, "iterate", Yn);
  const o = r[t](...n);
  return (o === -1 || o === !1) && /* @__PURE__ */ Bs(n[0]) ? (n[0] = /* @__PURE__ */ se(n[0]), r[t](...n)) : o;
}
function Fn(e, t, n = []) {
  xt(), Hs();
  const r = (/* @__PURE__ */ se(e))[t].apply(e, n);
  return Ls(), Rt(), r;
}
const tf = /* @__PURE__ */ ks("__proto__,__v_isRef,__isVue"), Xl = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(ut)
);
function nf(e) {
  ut(e) || (e = String(e));
  const t = /* @__PURE__ */ se(this);
  return Oe(t, "has", e), t.hasOwnProperty(e);
}
class Yl {
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
      return r === (o ? s ? gf : ea : s ? Ql : Jl).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const i = U(t);
    if (!o) {
      let c;
      if (i && (c = Qu[n]))
        return c;
      if (n === "hasOwnProperty")
        return nf;
    }
    const a = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ Pe(t) ? t : r
    );
    if ((ut(n) ? Xl.has(n) : tf(n)) || (o || Oe(t, "get", n), s))
      return a;
    if (/* @__PURE__ */ Pe(a)) {
      const c = i && Fs(n) ? a : a.value;
      return o && ue(c) ? /* @__PURE__ */ hs(c) : c;
    }
    return ue(a) ? o ? /* @__PURE__ */ hs(a) : /* @__PURE__ */ co(a) : a;
  }
}
class Zl extends Yl {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, o) {
    let s = t[n];
    const i = U(t) && Fs(n);
    if (!this._isShallow) {
      const f = /* @__PURE__ */ Ct(s);
      if (!/* @__PURE__ */ $e(r) && !/* @__PURE__ */ Ct(r) && (s = /* @__PURE__ */ se(s), r = /* @__PURE__ */ se(r)), !i && /* @__PURE__ */ Pe(s) && !/* @__PURE__ */ Pe(r))
        return f || (s.value = r), !0;
    }
    const a = i ? Number(n) < t.length : ie(t, n), c = Reflect.set(
      t,
      n,
      r,
      /* @__PURE__ */ Pe(t) ? t : o
    );
    return t === /* @__PURE__ */ se(o) && c && (a ? lt(r, s) && _t(t, "set", n, r) : _t(t, "add", n, r)), c;
  }
  deleteProperty(t, n) {
    const r = ie(t, n);
    t[n];
    const o = Reflect.deleteProperty(t, n);
    return o && r && _t(t, "delete", n, void 0), o;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!ut(n) || !Xl.has(n)) && Oe(t, "has", n), r;
  }
  ownKeys(t) {
    return Oe(
      t,
      "iterate",
      U(t) ? "length" : $t
    ), Reflect.ownKeys(t);
  }
}
class rf extends Yl {
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
const of = /* @__PURE__ */ new Zl(), sf = /* @__PURE__ */ new rf(), lf = /* @__PURE__ */ new Zl(!0);
const ps = (e) => e, Pr = (e) => Reflect.getPrototypeOf(e);
function af(e, t, n) {
  return function(...r) {
    const o = this.__v_raw, s = /* @__PURE__ */ se(o), i = Lt(s), a = e === "entries" || e === Symbol.iterator && i, c = e === "keys" && i, f = o[e](...r), d = n ? ps : t ? vn : Je;
    return !t && Oe(
      s,
      "iterate",
      c ? gs : $t
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
function Dr(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function cf(e, t) {
  const n = {
    get(o) {
      const s = this.__v_raw, i = /* @__PURE__ */ se(s), a = /* @__PURE__ */ se(o);
      e || (lt(o, a) && Oe(i, "get", o), Oe(i, "get", a));
      const { has: c } = Pr(i), f = t ? ps : e ? vn : Je;
      if (c.call(i, o))
        return f(s.get(o));
      if (c.call(i, a))
        return f(s.get(a));
      s !== i && s.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && Oe(/* @__PURE__ */ se(o), "iterate", $t), o.size;
    },
    has(o) {
      const s = this.__v_raw, i = /* @__PURE__ */ se(s), a = /* @__PURE__ */ se(o);
      return e || (lt(o, a) && Oe(i, "has", o), Oe(i, "has", a)), o === a ? s.has(o) : s.has(o) || s.has(a);
    },
    forEach(o, s) {
      const i = this, a = i.__v_raw, c = /* @__PURE__ */ se(a), f = t ? ps : e ? vn : Je;
      return !e && Oe(c, "iterate", $t), a.forEach((d, h) => o.call(s, f(d), f(h), i));
    }
  };
  return De(
    n,
    e ? {
      add: Dr("add"),
      set: Dr("set"),
      delete: Dr("delete"),
      clear: Dr("clear")
    } : {
      add(o) {
        const s = /* @__PURE__ */ se(this), i = Pr(s), a = /* @__PURE__ */ se(o), c = !t && !/* @__PURE__ */ $e(o) && !/* @__PURE__ */ Ct(o) ? a : o;
        return i.has.call(s, c) || lt(o, c) && i.has.call(s, o) || lt(a, c) && i.has.call(s, a) || (s.add(c), _t(s, "add", c, c)), this;
      },
      set(o, s) {
        !t && !/* @__PURE__ */ $e(s) && !/* @__PURE__ */ Ct(s) && (s = /* @__PURE__ */ se(s));
        const i = /* @__PURE__ */ se(this), { has: a, get: c } = Pr(i);
        let f = a.call(i, o);
        f || (o = /* @__PURE__ */ se(o), f = a.call(i, o));
        const d = c.call(i, o);
        return i.set(o, s), f ? lt(s, d) && _t(i, "set", o, s) : _t(i, "add", o, s), this;
      },
      delete(o) {
        const s = /* @__PURE__ */ se(this), { has: i, get: a } = Pr(s);
        let c = i.call(s, o);
        c || (o = /* @__PURE__ */ se(o), c = i.call(s, o)), a && a.call(s, o);
        const f = s.delete(o);
        return c && _t(s, "delete", o, void 0), f;
      },
      clear() {
        const o = /* @__PURE__ */ se(this), s = o.size !== 0, i = o.clear();
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
    n[o] = af(o, e, t);
  }), n;
}
function Ks(e, t) {
  const n = cf(e, t);
  return (r, o, s) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(
    ie(n, o) && o in r ? n : r,
    o,
    s
  );
}
const uf = {
  get: /* @__PURE__ */ Ks(!1, !1)
}, ff = {
  get: /* @__PURE__ */ Ks(!1, !0)
}, df = {
  get: /* @__PURE__ */ Ks(!0, !1)
};
const Jl = /* @__PURE__ */ new WeakMap(), Ql = /* @__PURE__ */ new WeakMap(), ea = /* @__PURE__ */ new WeakMap(), gf = /* @__PURE__ */ new WeakMap();
function pf(e) {
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
function co(e) {
  return /* @__PURE__ */ Ct(e) ? e : Vs(
    e,
    !1,
    of,
    uf,
    Jl
  );
}
// @__NO_SIDE_EFFECTS__
function hf(e) {
  return Vs(
    e,
    !1,
    lf,
    ff,
    Ql
  );
}
// @__NO_SIDE_EFFECTS__
function hs(e) {
  return Vs(
    e,
    !0,
    sf,
    df,
    ea
  );
}
function Vs(e, t, n, r, o) {
  if (!ue(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const s = o.get(e);
  if (s)
    return s;
  const i = pf(ju(e));
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
function Bs(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function se(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ se(t) : e;
}
function mf(e) {
  return !ie(e, "__v_skip") && Object.isExtensible(e) && Hl(e, "__v_skip", !0), e;
}
const Je = (e) => ue(e) ? /* @__PURE__ */ co(e) : e, vn = (e) => ue(e) ? /* @__PURE__ */ hs(e) : e;
// @__NO_SIDE_EFFECTS__
function Pe(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function fe(e) {
  return ta(e, !1);
}
// @__NO_SIDE_EFFECTS__
function vf(e) {
  return ta(e, !0);
}
function ta(e, t) {
  return /* @__PURE__ */ Pe(e) ? e : new wf(e, t);
}
class wf {
  constructor(t, n) {
    this.dep = new zs(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ se(t), this._value = n ? t : Je(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, r = this.__v_isShallow || /* @__PURE__ */ $e(t) || /* @__PURE__ */ Ct(t);
    t = r ? t : /* @__PURE__ */ se(t), lt(t, n) && (this._rawValue = t, this._value = r ? t : Je(t), this.dep.trigger());
  }
}
function Ut(e) {
  return /* @__PURE__ */ Pe(e) ? e.value : e;
}
const yf = {
  get: (e, t, n) => t === "__v_raw" ? e : Ut(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return /* @__PURE__ */ Pe(o) && !/* @__PURE__ */ Pe(n) ? (o.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function na(e) {
  return /* @__PURE__ */ Wt(e) ? e : new Proxy(e, yf);
}
class bf {
  constructor(t, n, r) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new zs(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Xn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    ge !== this)
      return Nl(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Ul(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function _f(e, t, n = !1) {
  let r, o;
  return X(e) ? r = e : (r = e.get, o = e.set), new bf(r, o, n);
}
const kr = {}, Wr = /* @__PURE__ */ new WeakMap();
let Nt;
function Sf(e, t = !1, n = Nt) {
  if (n) {
    let r = Wr.get(n);
    r || Wr.set(n, r = []), r.push(e);
  }
}
function xf(e, t, n = pe) {
  const { immediate: r, deep: o, once: s, scheduler: i, augmentJob: a, call: c } = n, f = (_) => o ? _ : /* @__PURE__ */ $e(_) || o === !1 || o === 0 ? Ht(_, 1) : Ht(_);
  let d, h, w, y, M = !1, E = !1;
  if (/* @__PURE__ */ Pe(e) ? (h = () => e.value, M = /* @__PURE__ */ $e(e)) : /* @__PURE__ */ Wt(e) ? (h = () => f(e), M = !0) : U(e) ? (E = !0, M = e.some((_) => /* @__PURE__ */ Wt(_) || /* @__PURE__ */ $e(_)), h = () => e.map((_) => {
    if (/* @__PURE__ */ Pe(_))
      return _.value;
    if (/* @__PURE__ */ Wt(_))
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
    const _ = Nt;
    Nt = d;
    try {
      return c ? c(e, 3, [y]) : e(y);
    } finally {
      Nt = _;
    }
  } : h = ct, t && o) {
    const _ = h, D = o === !0 ? 1 / 0 : o;
    h = () => Ht(_(), D);
  }
  const A = Kl(), z = () => {
    d.stop(), A && A.active && Ts(A.effects, d);
  };
  if (s && t) {
    const _ = t;
    t = (...D) => {
      const j = _(...D);
      return z(), j;
    };
  }
  let I = E ? new Array(e.length).fill(kr) : kr;
  const O = (_) => {
    if (!(!(d.flags & 1) || !d.dirty && !_))
      if (t) {
        const D = d.run();
        if (_ || o || M || (E ? D.some((j, W) => lt(j, I[W])) : lt(D, I))) {
          w && w();
          const j = Nt;
          Nt = d;
          try {
            const W = [
              D,
              // pass undefined as the old value when it's changed for the first time
              I === kr ? void 0 : E && I[0] === kr ? [] : I,
              y
            ];
            I = D, c ? c(t, 3, W) : (
              // @ts-expect-error
              t(...W)
            );
          } finally {
            Nt = j;
          }
        }
      } else
        d.run();
  };
  return a && a(O), d = new Vl(h), d.scheduler = i ? () => i(O, !1) : O, y = (_) => Sf(_, !1, d), w = d.onStop = () => {
    const _ = Wr.get(d);
    if (_) {
      if (c)
        c(_, 4);
      else
        for (const D of _) D();
      Wr.delete(d);
    }
  }, t ? r ? O(!0) : I = d.run() : i ? i(O.bind(null, !0), !0) : d.run(), z.pause = d.pause.bind(d), z.resume = d.resume.bind(d), z.stop = z, z;
}
function Ht(e, t = 1 / 0, n) {
  if (t <= 0 || !ue(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ Pe(e))
    Ht(e.value, t, n);
  else if (U(e))
    for (let r = 0; r < e.length; r++)
      Ht(e[r], t, n);
  else if ($r(e) || Lt(e))
    e.forEach((r) => {
      Ht(r, t, n);
    });
  else if (Tl(e)) {
    for (const r in e)
      Ht(e[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, r) && Ht(e[r], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function sr(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (o) {
    uo(o, t, n);
  }
}
function Qe(e, t, n, r) {
  if (X(e)) {
    const o = sr(e, t, n, r);
    return o && Dl(o) && o.catch((s) => {
      uo(s, t, n);
    }), o;
  }
  if (U(e)) {
    const o = [];
    for (let s = 0; s < e.length; s++)
      o.push(Qe(e[s], t, n, r));
    return o;
  }
}
function uo(e, t, n, r = !0) {
  const o = t ? t.vnode : null, { errorHandler: s, throwUnhandledErrorInProduction: i } = t && t.appContext.config || pe;
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
      xt(), sr(s, null, 10, [
        e,
        c,
        f
      ]), Rt();
      return;
    }
  }
  Rf(e, n, o, r, i);
}
function Rf(e, t, n, r = !0, o = !1) {
  if (o)
    throw e;
  console.error(e);
}
const Te = [];
let rt = -1;
const pn = [];
let Tt = null, fn = 0;
const ra = /* @__PURE__ */ Promise.resolve();
let Ur = null;
function je(e) {
  const t = Ur || ra;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Cf(e) {
  let t = rt + 1, n = Te.length;
  for (; t < n; ) {
    const r = t + n >>> 1, o = Te[r], s = Zn(o);
    s < e || s === e && o.flags & 2 ? t = r + 1 : n = r;
  }
  return t;
}
function Ns(e) {
  if (!(e.flags & 1)) {
    const t = Zn(e), n = Te[Te.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Zn(n) ? Te.push(e) : Te.splice(Cf(t), 0, e), e.flags |= 1, oa();
  }
}
function oa() {
  Ur || (Ur = ra.then(ia));
}
function If(e) {
  if (!U(e))
    Tt && e.id === -1 ? Tt.splice(fn + 1, 0, e) : e.flags & 1 || (pn.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      pn.push(e[t]);
  oa();
}
function Ti(e, t, n = rt + 1) {
  for (; n < Te.length; n++) {
    const r = Te[n];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid)
        continue;
      Te.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function sa(e) {
  if (pn.length) {
    const t = [...new Set(pn)].sort(
      (n, r) => Zn(n) - Zn(r)
    );
    if (pn.length = 0, Tt) {
      for (let n = 0; n < t.length; n++)
        Tt.push(t[n]);
      return;
    }
    for (Tt = t, fn = 0; fn < Tt.length; fn++) {
      const n = Tt[fn];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    Tt = null, fn = 0;
  }
}
const Zn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function ia(e) {
  try {
    for (rt = 0; rt < Te.length; rt++) {
      const t = Te[rt];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), sr(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; rt < Te.length; rt++) {
      const t = Te[rt];
      t && (t.flags &= -2);
    }
    rt = -1, Te.length = 0, sa(), Ur = null, (Te.length || pn.length) && ia();
  }
}
let at = null, la = null;
function qr(e) {
  const t = at;
  return at = e, la = e && e.type.__scopeId || null, t;
}
function Mf(e, t = at, n) {
  if (!t || e._n)
    return e;
  const r = (...o) => {
    r._d && Wi(-1);
    const s = qr(t), i = qt.length;
    let a;
    try {
      a = e(...o);
    } finally {
      for (let c = qt.length; c > i; c--) Pa();
      qr(s), r._d && Wi(1);
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
    let c = a.dir[r];
    c && (xt(), Qe(c, n, 8, [
      e.el,
      a,
      e,
      t
    ]), Rt());
  }
}
function Ef(e, t) {
  if (Fe) {
    let n = Fe.provides;
    const r = Fe.parent && Fe.parent.provides;
    r === n && (n = Fe.provides = Object.create(r)), n[e] = t;
  }
}
function Kr(e, t, n = !1) {
  const r = Rd();
  if (r || hn) {
    let o = hn ? hn._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && X(t) ? t.call(r && r.proxy) : t;
  }
}
const Af = /* @__PURE__ */ Symbol.for("v-scx"), Of = () => Kr(Af);
function ye(e, t, n) {
  return aa(e, t, n);
}
function aa(e, t, n = pe) {
  const { immediate: r, deep: o, flush: s, once: i } = n, a = De({}, n), c = t && r || !t && s !== "post";
  let f;
  if (er) {
    if (s === "sync") {
      const y = Of();
      f = y.__watcherHandles || (y.__watcherHandles = []);
    } else if (!c) {
      const y = () => {
      };
      return y.stop = ct, y.resume = ct, y.pause = ct, y;
    }
  }
  const d = Fe;
  a.call = (y, M, E) => Qe(y, d, M, E);
  let h = !1;
  s === "post" ? a.scheduler = (y) => {
    Le(y, d && d.suspense);
  } : s !== "sync" && (h = !0, a.scheduler = (y, M) => {
    M ? y() : Ns(y);
  }), a.augmentJob = (y) => {
    t && (y.flags |= 4), h && (y.flags |= 2, d && (y.id = d.uid, y.i = d));
  };
  const w = xf(e, t, a);
  return er && (f ? f.push(w) : c && w()), w;
}
function Pf(e, t, n) {
  const r = this.proxy, o = be(e) ? e.includes(".") ? ca(r, e) : () => r[e] : e.bind(r, r);
  let s;
  X(t) ? s = t : (s = t.handler, n = t);
  const i = ir(this), a = aa(o, s.bind(r), n);
  return i(), a;
}
function ca(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++)
      r = r[n[o]];
    return r;
  };
}
const Df = /* @__PURE__ */ Symbol("_vte"), fo = (e) => e.__isTeleport, Zo = /* @__PURE__ */ Symbol("_leaveCb");
function kf(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== It) {
        t = n;
        break;
      }
  }
  return t;
}
function ua(e) {
  if (!Ws(e))
    return fo(e.type) && e.children ? kf(e.children) : e;
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
function $s(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    $s(
      fo(n.type) && ua(n) || n,
      t
    );
  } else e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function fa(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Fi(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const Gr = /* @__PURE__ */ new WeakMap();
function $n(e, t, n, r, o = !1) {
  if (U(e)) {
    e.forEach(
      (E, A) => $n(
        E,
        t && (U(t) ? t[A] : t),
        n,
        r,
        o
      )
    );
    return;
  }
  if (Wn(r) && !o) {
    r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && $n(e, t, n, r.component.subTree);
    return;
  }
  const s = r.shapeFlag & 4 ? Gs(r.component) : r.el, i = o ? null : s, { i: a, r: c } = e, f = t && t.r, d = a.refs === pe ? a.refs = {} : a.refs, h = a.setupState, w = /* @__PURE__ */ se(h), y = h === pe ? Pl : (E) => Fi(d, E) ? !1 : ie(w, E), M = (E, A) => !(A && Fi(d, A));
  if (f != null && f !== c) {
    if (Hi(t), be(f))
      d[f] = null, y(f) && (h[f] = null);
    else if (/* @__PURE__ */ Pe(f)) {
      const E = t;
      M(f, E.k) && (f.value = null), E.k && (d[E.k] = null);
    }
  }
  if (X(c))
    sr(c, a, 12, [i, d]);
  else {
    const E = be(c), A = /* @__PURE__ */ Pe(c);
    if (E || A) {
      const z = () => {
        if (e.f) {
          const I = E ? y(c) ? h[c] : d[c] : M() || !e.k ? c.value : d[e.k];
          if (o)
            U(I) && Ts(I, s);
          else if (U(I))
            I.includes(s) || I.push(s);
          else if (E)
            d[c] = [s], y(c) && (h[c] = d[c]);
          else {
            const O = [s];
            M(c, e.k) && (c.value = O), e.k && (d[e.k] = O);
          }
        } else E ? (d[c] = i, y(c) && (h[c] = i)) : A && (M(c, e.k) && (c.value = i), e.k && (d[e.k] = i));
      };
      if (i) {
        const I = () => {
          z(), Gr.delete(e);
        };
        I.id = -1, Gr.set(e, I), Le(I, n);
      } else
        Hi(e), z();
    }
  }
}
function Hi(e) {
  const t = Gr.get(e);
  t && (t.flags |= 8, Gr.delete(e));
}
io().requestIdleCallback;
io().cancelIdleCallback;
const Wn = (e) => !!e.type.__asyncLoader, Ws = (e) => e.type.__isKeepAlive;
function Tf(e, t) {
  da(e, "a", t);
}
function Ff(e, t) {
  da(e, "da", t);
}
function da(e, t, n = Fe) {
  const r = e.__wdc || (e.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (go(t, r, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      Ws(o.parent.vnode) && Hf(r, t, n, o), o = o.parent;
  }
}
function Hf(e, t, n, r) {
  const o = go(
    t,
    e,
    r,
    !0
    /* prepend */
  );
  ga(() => {
    Ts(r[t], o);
  }, n);
}
function go(e, t, n = Fe, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), s = t.__weh || (t.__weh = (...i) => {
      xt();
      const a = ir(n), c = Qe(t, n, e, i);
      return a(), Rt(), c;
    });
    return r ? o.unshift(s) : o.push(s), s;
  }
}
const Et = (e) => (t, n = Fe) => {
  (!er || e === "sp") && go(e, (...r) => t(...r), n);
}, Lf = Et("bm"), ms = Et("m"), jf = Et(
  "bu"
), zf = Et("u"), vs = Et(
  "bum"
), ga = Et("um"), Kf = Et(
  "sp"
), Vf = Et("rtg"), Bf = Et("rtc");
function Nf(e, t = Fe) {
  go("ec", e, t);
}
const $f = /* @__PURE__ */ Symbol.for("v-ndc");
function Hn(e, t, n, r) {
  let o;
  const s = n, i = U(e);
  if (i || be(e)) {
    const a = i && /* @__PURE__ */ Wt(e);
    let c = !1, f = !1;
    a && (c = !/* @__PURE__ */ $e(e), f = /* @__PURE__ */ Ct(e), e = ao(e)), o = new Array(e.length);
    for (let d = 0, h = e.length; d < h; d++)
      o[d] = t(
        c ? f ? vn(Je(e[d])) : Je(e[d]) : e[d],
        d,
        void 0,
        s
      );
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let a = 0; a < e; a++)
      o[a] = t(a + 1, a, void 0, s);
  } else if (ue(e))
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
const ws = (e) => e ? Fa(e) ? Gs(e) : ws(e.parent) : null, Un = (
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
    $parent: (e) => ws(e.parent),
    $root: (e) => ws(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => ha(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Ns(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = je.bind(e.proxy)),
    $watch: (e) => Pf.bind(e)
  })
), Jo = (e, t) => e !== pe && !e.__isScriptSetup && ie(e, t), Wf = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: r, data: o, props: s, accessCache: i, type: a, appContext: c } = e;
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
        if (Jo(r, t))
          return i[t] = 1, r[t];
        if (o !== pe && ie(o, t))
          return i[t] = 2, o[t];
        if (ie(s, t))
          return i[t] = 3, s[t];
        if (n !== pe && ie(n, t))
          return i[t] = 4, n[t];
        ys && (i[t] = 0);
      }
    }
    const f = Un[t];
    let d, h;
    if (f)
      return t === "$attrs" && Oe(e.attrs, "get", ""), f(e);
    if (
      // css module (injected by vue-loader)
      (d = a.__cssModules) && (d = d[t])
    )
      return d;
    if (n !== pe && ie(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      h = c.config.globalProperties, ie(h, t)
    )
      return h[t];
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: o, ctx: s } = e;
    return Jo(o, t) ? (o[t] = n, !0) : r !== pe && ie(r, t) ? (r[t] = n, !0) : ie(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (s[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: o, props: s, type: i }
  }, a) {
    let c;
    return !!(n[a] || e !== pe && a[0] !== "$" && ie(e, a) || Jo(t, a) || ie(s, a) || ie(r, a) || ie(Un, a) || ie(o.config.globalProperties, a) || (c = i.__cssModules) && c[a]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : ie(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function Li(e) {
  return U(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let ys = !0;
function Uf(e) {
  const t = ha(e), n = e.proxy, r = e.ctx;
  ys = !1, t.beforeCreate && ji(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: s,
    methods: i,
    watch: a,
    provide: c,
    inject: f,
    // lifecycle
    created: d,
    beforeMount: h,
    mounted: w,
    beforeUpdate: y,
    updated: M,
    activated: E,
    deactivated: A,
    beforeDestroy: z,
    beforeUnmount: I,
    destroyed: O,
    unmounted: _,
    render: D,
    renderTracked: j,
    renderTriggered: W,
    errorCaptured: K,
    serverPrefetch: L,
    // public API
    expose: Q,
    inheritAttrs: le,
    // assets
    components: te,
    directives: he,
    filters: Re
  } = t;
  if (f && qf(f, r, null), i)
    for (const Z in i) {
      const ae = i[Z];
      X(ae) && (r[Z] = ae.bind(n));
    }
  if (o) {
    const Z = o.call(n, n);
    ue(Z) && (e.data = /* @__PURE__ */ co(Z));
  }
  if (ys = !0, s)
    for (const Z in s) {
      const ae = s[Z], Ce = X(ae) ? ae.bind(n, n) : X(ae.get) ? ae.get.bind(n, n) : ct, At = !X(ae) && X(ae.set) ? ae.set.bind(n) : ct, gt = $({
        get: Ce,
        set: At
      });
      Object.defineProperty(r, Z, {
        enumerable: !0,
        configurable: !0,
        get: () => gt.value,
        set: (Ke) => gt.value = Ke
      });
    }
  if (a)
    for (const Z in a)
      pa(a[Z], r, n, Z);
  if (c) {
    const Z = X(c) ? c.call(n) : c;
    Reflect.ownKeys(Z).forEach((ae) => {
      Ef(ae, Z[ae]);
    });
  }
  d && ji(d, e, "c");
  function q(Z, ae) {
    U(ae) ? ae.forEach((Ce) => Z(Ce.bind(n))) : ae && Z(ae.bind(n));
  }
  if (q(Lf, h), q(ms, w), q(jf, y), q(zf, M), q(Tf, E), q(Ff, A), q(Nf, K), q(Bf, j), q(Vf, W), q(vs, I), q(ga, _), q(Kf, L), U(Q))
    if (Q.length) {
      const Z = e.exposed || (e.exposed = {});
      Q.forEach((ae) => {
        Object.defineProperty(Z, ae, {
          get: () => n[ae],
          set: (Ce) => n[ae] = Ce,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  D && e.render === ct && (e.render = D), le != null && (e.inheritAttrs = le), te && (e.components = te), he && (e.directives = he), L && fa(e);
}
function qf(e, t, n = ct) {
  U(e) && (e = bs(e));
  for (const r in e) {
    const o = e[r];
    let s;
    ue(o) ? "default" in o ? s = Kr(
      o.from || r,
      o.default,
      !0
    ) : s = Kr(o.from || r) : s = Kr(o), /* @__PURE__ */ Pe(s) ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (i) => s.value = i
    }) : t[r] = s;
  }
}
function ji(e, t, n) {
  Qe(
    U(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function pa(e, t, n, r) {
  let o = r.includes(".") ? ca(n, r) : () => n[r];
  if (be(e)) {
    const s = t[e];
    X(s) && ye(o, s);
  } else if (X(e))
    ye(o, e.bind(n));
  else if (ue(e))
    if (U(e))
      e.forEach((s) => pa(s, t, n, r));
    else {
      const s = X(e.handler) ? e.handler.bind(n) : t[e.handler];
      X(s) && ye(o, s, e);
    }
}
function ha(e) {
  const t = e.type, { mixins: n, extends: r } = t, {
    mixins: o,
    optionsCache: s,
    config: { optionMergeStrategies: i }
  } = e.appContext, a = s.get(t);
  let c;
  return a ? c = a : !o.length && !n && !r ? c = t : (c = {}, o.length && o.forEach(
    (f) => Xr(c, f, i, !0)
  ), Xr(c, t, i)), ue(t) && s.set(t, c), c;
}
function Xr(e, t, n, r = !1) {
  const { mixins: o, extends: s } = t;
  s && Xr(e, s, n, !0), o && o.forEach(
    (i) => Xr(e, i, n, !0)
  );
  for (const i in t)
    if (!(r && i === "expose")) {
      const a = Gf[i] || n && n[i];
      e[i] = a ? a(e[i], t[i]) : t[i];
    }
  return e;
}
const Gf = {
  data: zi,
  props: Ki,
  emits: Ki,
  // objects
  methods: zn,
  computed: zn,
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
  components: zn,
  directives: zn,
  // watch
  watch: Yf,
  // provide / inject
  provide: zi,
  inject: Xf
};
function zi(e, t) {
  return t ? e ? function() {
    return De(
      X(e) ? e.call(this, this) : e,
      X(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Xf(e, t) {
  return zn(bs(e), bs(t));
}
function bs(e) {
  if (U(e)) {
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
function zn(e, t) {
  return e ? De(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Ki(e, t) {
  return e ? U(e) && U(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : De(
    /* @__PURE__ */ Object.create(null),
    Li(e),
    Li(t ?? {})
  ) : t;
}
function Yf(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = De(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = ke(e[r], t[r]);
  return n;
}
function ma() {
  return {
    app: null,
    config: {
      isNativeTag: Pl,
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
let Zf = 0;
function Jf(e, t) {
  return function(r, o = null) {
    X(r) || (r = De({}, r)), o != null && !ue(o) && (o = null);
    const s = ma(), i = /* @__PURE__ */ new WeakSet(), a = [];
    let c = !1;
    const f = s.app = {
      _uid: Zf++,
      _component: r,
      _props: o,
      _container: null,
      _context: s,
      _instance: null,
      version: Od,
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
        if (!c) {
          const y = f._ceVNode || St(r, o);
          return y.appContext = s, w === !0 ? w = "svg" : w === !1 && (w = void 0), e(y, d, w), c = !0, f._container = d, d.__vue_app__ = f, Gs(y.component);
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
        const h = hn;
        hn = f;
        try {
          return d();
        } finally {
          hn = h;
        }
      }
    };
    return f;
  };
}
let hn = null;
const Qf = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Ye(t)}Modifiers`] || e[`${Zt(t)}Modifiers`];
function ed(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || pe;
  let o = n;
  const s = t.startsWith("update:"), i = s && Qf(r, t.slice(7));
  i && (i.trim && (o = n.map((d) => be(d) ? d.trim() : d)), i.number && (o = o.map(Vu)));
  let a, c = r[a = Wo(t)] || // also try camelCase event handler (#2249)
  r[a = Wo(Ye(t))];
  !c && s && (c = r[a = Wo(Zt(t))]), c && Qe(
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
const td = /* @__PURE__ */ new WeakMap();
function va(e, t, n = !1) {
  const r = n ? td : t.emitsCache, o = r.get(e);
  if (o !== void 0)
    return o;
  const s = e.emits;
  let i = {}, a = !1;
  if (!X(e)) {
    const c = (f) => {
      const d = va(f, t, !0);
      d && (a = !0, De(i, d));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !s && !a ? (ue(e) && r.set(e, null), null) : (U(s) ? s.forEach((c) => i[c] = null) : De(i, s), ue(e) && r.set(e, i), i);
}
function po(e, t) {
  return !e || !ro(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), ie(e, t[0].toLowerCase() + t.slice(1)) || ie(e, Zt(t)) || ie(e, t));
}
function Vi(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: o,
    propsOptions: [s],
    slots: i,
    attrs: a,
    emit: c,
    render: f,
    renderCache: d,
    props: h,
    data: w,
    setupState: y,
    ctx: M,
    inheritAttrs: E
  } = e, A = qr(e);
  let z, I;
  try {
    if (n.shapeFlag & 4) {
      const _ = o || r, D = _;
      z = it(
        f.call(
          D,
          _,
          d,
          h,
          y,
          w,
          M
        )
      ), I = a;
    } else {
      const _ = t;
      z = it(
        _.length > 1 ? _(
          h,
          { attrs: a, slots: i, emit: c }
        ) : _(
          h,
          null
        )
      ), I = t.props ? a : nd(a);
    }
  } catch (_) {
    qt.length = 0, uo(_, e, 1), z = St(It);
  }
  let O = z;
  if (I && E !== !1) {
    const _ = Object.keys(I), { shapeFlag: D } = O;
    _.length && D & 7 && (s && _.some(oo) && (I = rd(
      I,
      s
    )), O = wn(O, I, !1, !0));
  }
  if (n.dirs && (O = wn(O, null, !1, !0), O.dirs = O.dirs ? O.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const _ = fo(O.type) && ua(O) || O;
    $s(_, n.transition);
  }
  return z = O, qr(A), z;
}
const nd = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || ro(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, rd = (e, t) => {
  const n = {};
  for (const r in e)
    (!oo(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
  return n;
};
function od(e, t, n) {
  const { props: r, children: o, component: s } = e, { props: i, children: a, patchFlag: c } = t, f = s.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return r ? Bi(r, i, f) : !!i;
    if (c & 8) {
      const d = t.dynamicProps;
      for (let h = 0; h < d.length; h++) {
        const w = d[h];
        if (wa(i, r, w) && !po(f, w))
          return !0;
      }
    }
  } else
    return (o || a) && (!a || !a.$stable) ? !0 : r === i ? !1 : r ? i ? Bi(r, i, f) : !0 : !!i;
  return !1;
}
function Bi(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < r.length; o++) {
    const s = r[o];
    if (wa(t, e, s) && !po(n, s))
      return !0;
  }
  return !1;
}
function wa(e, t, n) {
  const r = e[n], o = t[n];
  return n === "style" && ue(r) && ue(o) ? !lo(r, o) : r !== o;
}
function sd({ vnode: e, parent: t, suspense: n }, r) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.suspense.vnode.el = o.el = r, e = o), o === e)
      (e = t.vnode).el = r, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = r);
}
const ya = {}, ba = () => Object.create(ya), _a = (e) => Object.getPrototypeOf(e) === ya;
function id(e, t, n, r = !1) {
  const o = {}, s = ba();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Sa(e, t, o, s);
  for (const i in e.propsOptions[0])
    i in o || (o[i] = void 0);
  n ? e.props = r ? o : /* @__PURE__ */ hf(o) : e.type.props ? e.props = o : e.props = s, e.attrs = s;
}
function ld(e, t, n, r) {
  const {
    props: o,
    attrs: s,
    vnode: { patchFlag: i }
  } = e, a = /* @__PURE__ */ se(o), [c] = e.propsOptions;
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
        if (po(e.emitsOptions, w))
          continue;
        const y = t[w];
        if (c)
          if (ie(s, w))
            y !== s[w] && (s[w] = y, f = !0);
          else {
            const M = Ye(w);
            o[M] = _s(
              c,
              a,
              M,
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
    Sa(e, t, o, s) && (f = !0);
    let d;
    for (const h in a)
      (!t || // for camelCase
      !ie(t, h) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((d = Zt(h)) === h || !ie(t, d))) && (c ? n && // for camelCase
      (n[h] !== void 0 || // for kebab-case
      n[d] !== void 0) && (o[h] = _s(
        c,
        a,
        h,
        void 0,
        e,
        !0
      )) : delete o[h]);
    if (s !== a)
      for (const h in s)
        (!t || !ie(t, h)) && (delete s[h], f = !0);
  }
  f && _t(e.attrs, "set", "");
}
function Sa(e, t, n, r) {
  const [o, s] = e.propsOptions;
  let i = !1, a;
  if (t)
    for (let c in t) {
      if (Vn(c))
        continue;
      const f = t[c];
      let d;
      o && ie(o, d = Ye(c)) ? !s || !s.includes(d) ? n[d] = f : (a || (a = {}))[d] = f : po(e.emitsOptions, c) || (!(c in r) || f !== r[c]) && (r[c] = f, i = !0);
    }
  if (s) {
    const c = /* @__PURE__ */ se(n), f = a || pe;
    for (let d = 0; d < s.length; d++) {
      const h = s[d];
      n[h] = _s(
        o,
        c,
        h,
        f[h],
        e,
        !ie(f, h)
      );
    }
  }
  return i;
}
function _s(e, t, n, r, o, s) {
  const i = e[n];
  if (i != null) {
    const a = ie(i, "default");
    if (a && r === void 0) {
      const c = i.default;
      if (i.type !== Function && !i.skipFactory && X(c)) {
        const { propsDefaults: f } = o;
        if (n in f)
          r = f[n];
        else {
          const d = ir(o);
          r = f[n] = c.call(
            null,
            t
          ), d();
        }
      } else
        r = c;
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
const ad = /* @__PURE__ */ new WeakMap();
function xa(e, t, n = !1) {
  const r = n ? ad : t.propsCache, o = r.get(e);
  if (o)
    return o;
  const s = e.props, i = {}, a = [];
  let c = !1;
  if (!X(e)) {
    const d = (h) => {
      c = !0;
      const [w, y] = xa(h, t, !0);
      De(i, w), y && a.push(...y);
    };
    !n && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  if (!s && !c)
    return ue(e) && r.set(e, gn), gn;
  if (U(s))
    for (let d = 0; d < s.length; d++) {
      const h = Ye(s[d]);
      Ni(h) && (i[h] = pe);
    }
  else if (s)
    for (const d in s) {
      const h = Ye(d);
      if (Ni(h)) {
        const w = s[d], y = i[h] = U(w) || X(w) ? { type: w } : De({}, w), M = y.type;
        let E = !1, A = !0;
        if (U(M))
          for (let z = 0; z < M.length; ++z) {
            const I = M[z], O = X(I) && I.name;
            if (O === "Boolean") {
              E = !0;
              break;
            } else O === "String" && (A = !1);
          }
        else
          E = X(M) && M.name === "Boolean";
        y[
          0
          /* shouldCast */
        ] = E, y[
          1
          /* shouldCastTrue */
        ] = A, (E || ie(y, "default")) && a.push(h);
      }
    }
  const f = [i, a];
  return ue(e) && r.set(e, f), f;
}
function Ni(e) {
  return e[0] !== "$" && !Vn(e);
}
const Us = (e) => e === "_" || e === "_ctx" || e === "$stable", qs = (e) => U(e) ? e.map(it) : [it(e)], cd = (e, t, n) => {
  if (t._n)
    return t;
  const r = Mf((...o) => qs(t(...o)), n);
  return r._c = !1, r;
}, Ra = (e, t, n) => {
  const r = e._ctx;
  for (const o in e) {
    if (Us(o)) continue;
    const s = e[o];
    if (X(s))
      t[o] = cd(o, s, r);
    else if (s != null) {
      const i = qs(s);
      t[o] = () => i;
    }
  }
}, Ca = (e, t) => {
  const n = qs(t);
  e.slots.default = () => n;
}, Ia = (e, t, n) => {
  for (const r in t)
    (n || !Us(r)) && (e[r] = t[r]);
}, ud = (e, t, n) => {
  const r = e.slots = ba();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (Ia(r, t, n), n && Hl(r, "_", o, !0)) : Ra(t, r);
  } else t && Ca(e, t);
}, fd = (e, t, n) => {
  const { vnode: r, slots: o } = e;
  let s = !0, i = pe;
  if (r.shapeFlag & 32) {
    const a = t._;
    a ? n && a === 1 ? s = !1 : Ia(o, t, n) : (s = !t.$stable, Ra(t, o)), i = t;
  } else t && (Ca(e, t), i = { default: 1 });
  if (s)
    for (const a in o)
      !Us(a) && i[a] == null && delete o[a];
}, Le = md;
function dd(e) {
  return gd(e);
}
function gd(e, t) {
  const n = io();
  n.__VUE__ = !0;
  const {
    insert: r,
    remove: o,
    patchProp: s,
    createElement: i,
    createText: a,
    createComment: c,
    setText: f,
    setElementText: d,
    parentNode: h,
    nextSibling: w,
    setScopeId: y = ct,
    insertStaticContent: M
  } = e, E = (p, m, b, R = null, C = null, S = null, F = void 0, T = null, P = !!m.dynamicChildren) => {
    if (p === m)
      return;
    p && !Ln(p, m) && (R = nn(p), Ke(p, C, S, !0), p = null), m.patchFlag === -2 && (P = !1, m.dynamicChildren = null);
    const { type: x, ref: B, shapeFlag: H } = m;
    switch (x) {
      case ho:
        A(p, m, b, R);
        break;
      case It:
        z(p, m, b, R);
        break;
      case es:
        p == null && I(m, b, R, F);
        break;
      case Me:
        te(
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
        ) : H & 6 ? he(
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
          Ue
        );
    }
    B != null && C ? $n(B, p && p.ref, S, m || p, !m) : B == null && p && p.ref != null && $n(p.ref, null, S, p, !0);
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
      m.el = c(m.children || ""),
      b,
      R
    ) : m.el = p.el;
  }, I = (p, m, b, R) => {
    [p.el, p.anchor] = M(
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
    const { props: B, shapeFlag: H, transition: V, dirs: N } = p;
    if (P = p.el = i(
      p.type,
      S,
      B && B.is,
      B
    ), H & 8 ? d(P, p.children) : H & 16 && K(
      p.children,
      P,
      null,
      R,
      C,
      Qo(p, S),
      F,
      T
    ), N && Vt(p, null, R, "created"), W(P, p, p.scopeId, F, R), B) {
      for (const ce in B)
        ce !== "value" && !Vn(ce) && s(P, ce, null, B[ce], S, R);
      "value" in B && s(P, "value", null, B.value, S), (x = B.onVnodeBeforeMount) && nt(x, R, p);
    }
    N && Vt(p, null, R, "beforeMount");
    const J = pd(C, V);
    J && V.beforeEnter(P), r(P, m, b), ((x = B && B.onVnodeMounted) || J || N) && Le(() => {
      try {
        x && nt(x, R, p), J && V.enter(P), N && Vt(p, null, R, "mounted");
      } finally {
      }
    }, C);
  }, W = (p, m, b, R, C) => {
    if (b && y(p, b), R)
      for (let S = 0; S < R.length; S++)
        y(p, R[S]);
    if (C) {
      let S = C.subTree;
      if (m === S || Oa(S.type) && (S.ssContent === m || S.ssFallback === m)) {
        const F = C.vnode;
        W(
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
      const B = p[x] = T ? bt(p[x]) : it(p[x]);
      E(
        null,
        B,
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
    let { patchFlag: P, dynamicChildren: x, dirs: B } = m;
    P |= p.patchFlag & 16;
    const H = p.props || pe, V = m.props || pe;
    let N;
    if (b && Bt(b, !1), (N = V.onVnodeBeforeUpdate) && nt(N, b, m, p), B && Vt(m, p, b, "beforeUpdate"), b && Bt(b, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    x && (!p.dynamicChildren || p.dynamicChildren.length !== x.length) && (P = 0, F = !1, x = null), (H.innerHTML && V.innerHTML == null || H.textContent && V.textContent == null) && d(T, ""), x ? Q(
      p.dynamicChildren,
      x,
      T,
      b,
      R,
      Qo(m, C),
      S
    ) : F || ae(
      p,
      m,
      T,
      null,
      b,
      R,
      Qo(m, C),
      S,
      !1
    ), P > 0) {
      if (P & 16)
        le(T, H, V, b, C);
      else if (P & 2 && H.class !== V.class && s(T, "class", null, V.class, C), P & 4 && s(T, "style", H.style, V.style, C), P & 8) {
        const J = m.dynamicProps;
        for (let ce = 0; ce < J.length; ce++) {
          const oe = J[ce], me = H[oe], _e = V[oe];
          (_e !== me || oe === "value") && s(T, oe, me, _e, C, b);
        }
      }
      P & 1 && p.children !== m.children && d(T, m.children);
    } else !F && x == null && le(T, H, V, b, C);
    ((N = V.onVnodeUpdated) || B) && Le(() => {
      N && nt(N, b, m, p), B && Vt(m, p, b, "updated");
    }, R);
  }, Q = (p, m, b, R, C, S, F) => {
    for (let T = 0; T < m.length; T++) {
      const P = p[T], x = m[T], B = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        P.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (P.type === Me || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Ln(P, x) || // - In the case of a component, it could contain anything.
        P.shapeFlag & 198) ? h(P.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          b
        )
      );
      E(
        P,
        x,
        B,
        null,
        R,
        C,
        S,
        F,
        !0
      );
    }
  }, le = (p, m, b, R, C) => {
    if (m !== b) {
      if (m !== pe)
        for (const S in m)
          !Vn(S) && !(S in b) && s(
            p,
            S,
            m[S],
            null,
            C,
            R
          );
      for (const S in b) {
        if (Vn(S)) continue;
        const F = b[S], T = m[S];
        F !== T && S !== "value" && s(p, S, T, F, C, R);
      }
      "value" in b && s(p, "value", m.value, b.value, C);
    }
  }, te = (p, m, b, R, C, S, F, T, P) => {
    const x = m.el = p ? p.el : a(""), B = m.anchor = p ? p.anchor : a("");
    let { patchFlag: H, dynamicChildren: V, slotScopeIds: N } = m;
    N && (T = T ? T.concat(N) : N), p == null ? (r(x, b, R), r(B, b, R), K(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      m.children || [],
      b,
      B,
      C,
      S,
      F,
      T,
      P
    )) : H > 0 && H & 64 && V && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    p.dynamicChildren && p.dynamicChildren.length === V.length ? (Q(
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
    (m.key != null || C && m === C.subTree) && Ma(
      p,
      m,
      !0
      /* shallow */
    )) : ae(
      p,
      m,
      b,
      B,
      C,
      S,
      F,
      T,
      P
    );
  }, he = (p, m, b, R, C, S, F, T, P) => {
    m.slotScopeIds = T, p == null ? m.shapeFlag & 512 ? C.ctx.activate(
      m,
      b,
      R,
      F,
      P
    ) : Re(
      m,
      b,
      R,
      C,
      S,
      F,
      P
    ) : we(p, m, P);
  }, Re = (p, m, b, R, C, S, F) => {
    const T = p.component = xd(
      p,
      R,
      C
    );
    if (Ws(p) && (T.ctx.renderer = Ue), Cd(T, !1, F), T.asyncDep) {
      if (C && C.registerDep(T, q, F), !p.el) {
        const P = T.subTree = St(It);
        z(null, P, m, b), p.placeholder = P.el;
      }
    } else
      q(
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
    if (od(p, m, b))
      if (R.asyncDep && !R.asyncResolved) {
        Z(R, m, b);
        return;
      } else
        R.next = m, R.update();
    else
      m.el = p.el, R.vnode = m;
  }, q = (p, m, b, R, C, S, F) => {
    const T = () => {
      if (p.isMounted) {
        let { next: H, bu: V, u: N, parent: J, vnode: ce } = p;
        {
          const Ee = Ea(p);
          if (Ee) {
            H && (H.el = ce.el, Z(p, H, F)), Ee.asyncDep.then(() => {
              Le(() => {
                p.isUnmounted || x();
              }, C);
            });
            return;
          }
        }
        let oe = H, me;
        Bt(p, !1), H ? (H.el = ce.el, Z(p, H, F)) : H = ce, V && Uo(V), (me = H.props && H.props.onVnodeBeforeUpdate) && nt(me, J, H, ce), Bt(p, !0);
        const _e = Vi(p), Ve = p.subTree;
        p.subTree = _e, E(
          Ve,
          _e,
          // parent may have changed if it's in a teleport
          h(Ve.el),
          // anchor may have changed if it's in a fragment
          nn(Ve),
          p,
          C,
          S
        ), H.el = _e.el, oe === null && sd(p, _e.el), N && Le(N, C), (me = H.props && H.props.onVnodeUpdated) && Le(
          () => nt(me, J, H, ce),
          C
        );
      } else {
        let H;
        const { el: V, props: N } = m, { bm: J, m: ce, parent: oe, root: me, type: _e } = p, Ve = Wn(m);
        Bt(p, !1), J && Uo(J), !Ve && (H = N && N.onVnodeBeforeMount) && nt(H, oe, m), Bt(p, !0);
        {
          me.ce && me.ce._hasShadowRoot() && me.ce._injectChildStyle(
            _e,
            p.parent ? p.parent.type : void 0
          );
          const Ee = p.subTree = Vi(p);
          E(
            null,
            Ee,
            b,
            R,
            p,
            C,
            S
          ), m.el = Ee.el;
        }
        if (ce && Le(ce, C), !Ve && (H = N && N.onVnodeMounted)) {
          const Ee = m;
          Le(
            () => nt(H, oe, Ee),
            C
          );
        }
        (m.shapeFlag & 256 || oe && Wn(oe.vnode) && oe.vnode.shapeFlag & 256) && p.a && Le(p.a, C), p.isMounted = !0, m = b = R = null;
      }
    };
    p.scope.on();
    const P = p.effect = new Vl(T);
    p.scope.off();
    const x = p.update = P.run.bind(P), B = p.job = P.runIfDirty.bind(P);
    B.i = p, B.id = p.uid, P.scheduler = () => Ns(B), Bt(p, !0), x();
  }, Z = (p, m, b) => {
    m.component = p;
    const R = p.vnode.props;
    p.vnode = m, p.next = null, ld(p, m.props, R, b), fd(p, m.children, b), xt(), Ti(p), Rt();
  }, ae = (p, m, b, R, C, S, F, T, P = !1) => {
    const x = p && p.children, B = p ? p.shapeFlag : 0, H = m.children, { patchFlag: V, shapeFlag: N } = m;
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
        Ce(
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
    N & 8 ? (B & 16 && jt(x, C, S), H !== x && d(b, H)) : B & 16 ? N & 16 ? At(
      x,
      H,
      b,
      R,
      C,
      S,
      F,
      T,
      P
    ) : jt(x, C, S, !0) : (B & 8 && d(b, ""), N & 16 && K(
      H,
      b,
      R,
      C,
      S,
      F,
      T,
      P
    ));
  }, Ce = (p, m, b, R, C, S, F, T, P) => {
    p = p || gn, m = m || gn;
    const x = p.length, B = m.length, H = Math.min(x, B);
    let V;
    for (V = 0; V < H; V++) {
      const N = m[V] = P ? bt(m[V]) : it(m[V]);
      E(
        p[V],
        N,
        b,
        null,
        C,
        S,
        F,
        T,
        P
      );
    }
    x > B ? jt(
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
    const B = m.length;
    let H = p.length - 1, V = B - 1;
    for (; x <= H && x <= V; ) {
      const N = p[x], J = m[x] = P ? bt(m[x]) : it(m[x]);
      if (Ln(N, J))
        E(
          N,
          J,
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
      const N = p[H], J = m[V] = P ? bt(m[V]) : it(m[V]);
      if (Ln(N, J))
        E(
          N,
          J,
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
        const N = V + 1, J = N < B ? m[N].el : R;
        for (; x <= V; )
          E(
            null,
            m[x] = P ? bt(m[x]) : it(m[x]),
            b,
            J,
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
      const N = x, J = x, ce = /* @__PURE__ */ new Map();
      for (x = J; x <= V; x++) {
        const Ie = m[x] = P ? bt(m[x]) : it(m[x]);
        Ie.key != null && ce.set(Ie.key, x);
      }
      let oe, me = 0;
      const _e = V - J + 1;
      let Ve = !1, Ee = 0;
      const qe = new Array(_e);
      for (x = 0; x < _e; x++) qe[x] = 0;
      for (x = N; x <= H; x++) {
        const Ie = p[x];
        if (me >= _e) {
          Ke(Ie, C, S, !0);
          continue;
        }
        let Be;
        if (Ie.key != null)
          Be = ce.get(Ie.key);
        else
          for (oe = J; oe <= V; oe++)
            if (qe[oe - J] === 0 && Ln(Ie, m[oe])) {
              Be = oe;
              break;
            }
        Be === void 0 ? Ke(Ie, C, S, !0) : (qe[Be - J] = x + 1, Be >= Ee ? Ee = Be : Ve = !0, E(
          Ie,
          m[Be],
          b,
          null,
          C,
          S,
          F,
          T,
          P
        ), me++);
      }
      const gr = Ve ? hd(qe) : gn;
      for (oe = gr.length - 1, x = _e - 1; x >= 0; x--) {
        const Ie = J + x, Be = m[Ie], pt = m[Ie + 1], ht = Ie + 1 < B ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          pt.el || Aa(pt)
        ) : R;
        qe[x] === 0 ? E(
          null,
          Be,
          b,
          ht,
          C,
          S,
          F,
          T,
          P
        ) : Ve && (oe < 0 || x !== gr[oe] ? gt(Be, b, ht, 2) : oe--);
      }
    }
  }, gt = (p, m, b, R, C = null) => {
    const { el: S, type: F, transition: T, children: P, shapeFlag: x } = p;
    if (x & 6) {
      gt(p.component.subTree, m, b, R);
      return;
    }
    if (x & 128) {
      p.suspense.move(m, b, R);
      return;
    }
    if (x & 64) {
      F.move(p, m, b, Ue);
      return;
    }
    if (F === Me) {
      r(S, m, b);
      for (let H = 0; H < P.length; H++)
        gt(P[H], m, b, R);
      r(p.anchor, m, b);
      return;
    }
    if (F === es) {
      O(p, m, b);
      return;
    }
    if (R !== 2 && x & 1 && T)
      if (R === 0)
        T.persisted && !S[Zo] ? r(S, m, b) : (T.beforeEnter(S), r(S, m, b), Le(() => T.enter(S), C));
      else {
        const { leave: H, delayLeave: V, afterLeave: N } = T, J = () => {
          p.ctx.isUnmounted ? o(S) : r(S, m, b);
        }, ce = () => {
          const oe = S._isLeaving || !!S[Zo];
          S._isLeaving && S[Zo](
            !0
            /* cancelled */
          ), T.persisted && !oe ? J() : H(S, () => {
            J(), N && N();
          });
        };
        V ? V(S, J, ce) : ce();
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
      shapeFlag: B,
      patchFlag: H,
      dirs: V,
      cacheIndex: N,
      memo: J
    } = p;
    if (H === -2 && (C = !1), T != null && (xt(), $n(T, null, b, p, !0), Rt()), N != null && (m.renderCache[N] = void 0), B & 256) {
      m.ctx.deactivate(p);
      return;
    }
    const ce = B & 1 && V, oe = !Wn(p);
    let me;
    if (oe && (me = F && F.onVnodeBeforeUnmount) && nt(me, m, p), B & 6)
      _n(p.component, b, R);
    else {
      if (B & 128) {
        p.suspense.unmount(b, R);
        return;
      }
      ce && Vt(p, null, m, "beforeUnmount"), B & 64 ? p.type.remove(
        p,
        m,
        b,
        Ue,
        R
      ) : x && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !x.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (S !== Me || H > 0 && H & 64) ? jt(
        x,
        m,
        b,
        !1,
        !0
      ) : (S === Me && H & 384 || !C && B & 16) && jt(P, m, b), R && de(p);
    }
    const _e = J != null && N == null;
    (oe && (me = F && F.onVnodeUnmounted) || ce || _e) && Le(() => {
      me && nt(me, m, p), ce && Vt(p, null, m, "unmounted"), _e && (p.el = null);
    }, b);
  }, de = (p) => {
    const { type: m, el: b, anchor: R, transition: C } = p;
    if (m === Me) {
      tt(b, R);
      return;
    }
    if (m === es) {
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
  }, tt = (p, m) => {
    let b;
    for (; p !== m; )
      b = w(p), o(p), p = b;
    o(m);
  }, _n = (p, m, b) => {
    const { bum: R, scope: C, job: S, subTree: F, um: T, m: P, a: x } = p;
    $i(P), $i(x), R && Uo(R), C.stop(), S && (S.flags |= 8, Ke(F, p, m, b)), T && Le(T, m), Le(() => {
      p.isUnmounted = !0;
    }, m);
  }, jt = (p, m, b, R = !1, C = !1, S = 0) => {
    for (let F = S; F < p.length; F++)
      Ke(p[F], m, b, R, C);
  }, nn = (p) => {
    if (p.shapeFlag & 6)
      return nn(p.component.subTree);
    if (p.shapeFlag & 128)
      return p.suspense.next();
    const m = w(p.anchor || p.el), b = m && m[Df];
    return b ? w(b) : m;
  };
  let Sn = !1;
  const dr = (p, m, b) => {
    let R;
    p == null ? m._vnode && (Ke(m._vnode, null, null, !0), R = m._vnode.component) : E(
      m._vnode || null,
      p,
      m,
      null,
      null,
      null,
      b
    ), m._vnode = p, Sn || (Sn = !0, Ti(R), sa(), Sn = !1);
  }, Ue = {
    p: E,
    um: Ke,
    m: gt,
    r: de,
    mt: Re,
    mc: K,
    pc: ae,
    pbc: Q,
    n: nn,
    o: e
  };
  return {
    render: dr,
    hydrate: void 0,
    createApp: Jf(dr)
  };
}
function Qo({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Bt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function pd(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Ma(e, t, n = !1) {
  const r = e.children, o = t.children;
  if (U(r) && U(o))
    for (let s = 0; s < r.length; s++) {
      const i = r[s];
      let a = o[s];
      a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = o[s] = bt(o[s]), a.el = i.el), !n && a.patchFlag !== -2 && Ma(i, a)), a.type === ho && (a.patchFlag === -1 && (a = o[s] = bt(a)), a.el = i.el), a.type === It && !a.el && (a.el = i.el);
    }
}
function hd(e) {
  const t = e.slice(), n = [0];
  let r, o, s, i, a;
  const c = e.length;
  for (r = 0; r < c; r++) {
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
function Ea(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Ea(t);
}
function $i(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function Aa(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? Aa(t.subTree) : null;
}
const Oa = (e) => e.__isSuspense;
function md(e, t) {
  t && t.pendingBranch ? U(e) ? t.effects.push(...e) : t.effects.push(e) : If(e);
}
const Me = /* @__PURE__ */ Symbol.for("v-fgt"), ho = /* @__PURE__ */ Symbol.for("v-txt"), It = /* @__PURE__ */ Symbol.for("v-cmt"), es = /* @__PURE__ */ Symbol.for("v-stc"), qt = [];
let ze = null;
function ne(e = !1) {
  qt.push(ze = e ? null : []);
}
function Pa() {
  qt.pop(), ze = qt[qt.length - 1] || null;
}
let Jn = 1;
function Wi(e, t = !1) {
  Jn += e, e < 0 && ze && t && (ze.hasOnce = !0);
}
function Da(e) {
  return e.dynamicChildren = Jn > 0 ? ze || gn : null, Pa(), Jn > 0 && ze && ze.push(e), e;
}
function re(e, t, n, r, o, s) {
  return Da(
    Se(
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
function vd(e, t, n, r, o) {
  return Da(
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
function ka(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Ln(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Ta = ({ key: e }) => e ?? null, Vr = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? be(e) || /* @__PURE__ */ Pe(e) || X(e) ? { i: at, r: e, k: t, f: !!n } : e : null);
function Se(e, t = null, n = null, r = 0, o = null, s = e === Me ? 0 : 1, i = !1, a = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Ta(t),
    ref: t && Vr(t),
    scopeId: la,
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
    ctx: at
  };
  return a ? (Yr(c, n), s & 128 && e.normalize(c)) : n && (c.shapeFlag |= be(n) ? 8 : 16), Jn > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  ze && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && ze.push(c), c;
}
const St = wd;
function wd(e, t = null, n = null, r = 0, o = null, s = !1) {
  if ((!e || e === $f) && (e = It), ka(e)) {
    const a = wn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Yr(a, n), Jn > 0 && !s && ze && (a.shapeFlag & 6 ? ze[ze.indexOf(e)] = a : ze.push(a)), a.patchFlag = -2, a;
  }
  if (Ad(e) && (e = e.__vccOpts), t) {
    t = yd(t);
    let { class: a, style: c } = t;
    a && !be(a) && (t.class = ot(a)), ue(c) && (/* @__PURE__ */ Bs(c) && !U(c) && (c = De({}, c)), t.style = Ft(c));
  }
  const i = be(e) ? 1 : Oa(e) ? 128 : fo(e) ? 64 : ue(e) ? 4 : X(e) ? 2 : 0;
  return Se(
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
function yd(e) {
  return e ? /* @__PURE__ */ Bs(e) || _a(e) ? De({}, e) : e : null;
}
function wn(e, t, n = !1, r = !1) {
  const { props: o, ref: s, patchFlag: i, children: a, transition: c } = e, f = t ? bd(o || {}, t) : o, d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && Ta(f),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && s ? U(s) ? s.concat(Vr(t)) : [s, Vr(t)] : Vr(t)
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
    patchFlag: t && e.type !== Me ? i === -1 ? 16 : i | 16 : i,
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
    ssContent: e.ssContent && wn(e.ssContent),
    ssFallback: e.ssFallback && wn(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && r && $s(
    d,
    c.clone(d)
  ), d;
}
function Ss(e = " ", t = 0) {
  return St(ho, null, e, t);
}
function Xe(e = "", t = !1) {
  return t ? (ne(), vd(It, null, e)) : St(It, null, e);
}
function it(e) {
  return e == null || typeof e == "boolean" ? St(It) : U(e) ? St(
    Me,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : ka(e) ? bt(e) : St(ho, null, String(e));
}
function bt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : wn(e);
}
function Yr(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (U(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), Yr(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !_a(t) ? t._ctx = at : o === 3 && at && (at.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (X(t)) {
    if (r & 65) {
      Yr(e, { default: t });
      return;
    }
    t = { default: t, _ctx: at }, n = 32;
  } else
    t = String(t), r & 64 ? (n = 16, t = [Ss(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function bd(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === "class")
        t.class !== r.class && (t.class = ot([t.class, r.class]));
      else if (o === "style")
        t.style = Ft([t.style, r.style]);
      else if (ro(o)) {
        const s = t[o], i = r[o];
        i && s !== i && !(U(s) && s.includes(i)) ? t[o] = s ? [].concat(s, i) : i : i == null && s == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !oo(o) && (t[o] = i);
      } else o !== "" && (t[o] = r[o]);
  }
  return t;
}
function nt(e, t, n, r = null) {
  Qe(e, t, 7, [
    n,
    r
  ]);
}
const _d = ma();
let Sd = 0;
function xd(e, t, n) {
  const r = e.type, o = (t ? t.appContext : e.appContext) || _d, s = {
    uid: Sd++,
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
    scope: new Xu(
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
    propsOptions: xa(r, o),
    emitsOptions: va(r, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: pe,
    // inheritAttrs
    inheritAttrs: r.inheritAttrs,
    // state
    ctx: pe,
    data: pe,
    props: pe,
    attrs: pe,
    slots: pe,
    refs: pe,
    setupState: pe,
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
  return s.ctx = { _: s }, s.root = t ? t.root : s, s.emit = ed.bind(null, s), e.ce && e.ce(s), s;
}
let Fe = null;
const Rd = () => Fe || at;
let Zr, Qn;
{
  const e = io(), t = (n, r) => {
    let o;
    return (o = e[n]) || (o = e[n] = []), o.push(r), (s) => {
      o.length > 1 ? o.forEach((i) => i(s)) : o[0](s);
    };
  };
  Zr = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Fe = n
  ), Qn = t(
    "__VUE_SSR_SETTERS__",
    (n) => er = n
  );
}
const ir = (e) => {
  const t = Fe;
  return Zr(e), e.scope.on(), () => {
    e.scope.off(), Zr(t);
  };
}, Ui = () => {
  Fe && Fe.scope.off(), Zr(null);
};
function Fa(e) {
  return e.vnode.shapeFlag & 4;
}
let er = !1;
function Cd(e, t = !1, n = !1) {
  t && Qn(t);
  const { props: r, children: o } = e.vnode, s = Fa(e);
  id(e, r, s, t), ud(e, o, n || t);
  const i = s ? Id(e, t) : void 0;
  return t && Qn(!1), i;
}
function Id(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Wf);
  const { setup: r } = n;
  if (r) {
    xt();
    const o = e.setupContext = r.length > 1 ? Ed(e) : null, s = ir(e), i = sr(
      r,
      e,
      0,
      [
        e.props,
        o
      ]
    ), a = Dl(i);
    if (Rt(), s(), (a || e.sp) && !Wn(e) && fa(e), a) {
      if (i.then(Ui, Ui), t)
        return i.then((c) => {
          Qn(!0);
          try {
            qi(e, c, t);
          } finally {
            Qn(!1);
          }
        }).catch((c) => {
          uo(c, e, 0);
        });
      e.asyncDep = i;
    } else
      qi(e, i);
  } else
    Ha(e);
}
function qi(e, t, n) {
  X(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ue(t) && (e.setupState = na(t)), Ha(e);
}
function Ha(e, t, n) {
  const r = e.type;
  e.render || (e.render = r.render || ct);
  {
    const o = ir(e);
    xt();
    try {
      Uf(e);
    } finally {
      Rt(), o();
    }
  }
}
const Md = {
  get(e, t) {
    return Oe(e, "get", ""), e[t];
  }
};
function Ed(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Md),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Gs(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(na(mf(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in Un)
        return Un[n](e);
    },
    has(t, n) {
      return n in t || n in Un;
    }
  })) : e.proxy;
}
function Ad(e) {
  return X(e) && "__vccOpts" in e;
}
const $ = (e, t) => /* @__PURE__ */ _f(e, t, er), Od = "3.5.42";
/**
* @vue/runtime-dom v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let xs;
const Gi = typeof window < "u" && window.trustedTypes;
if (Gi)
  try {
    xs = /* @__PURE__ */ Gi.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const La = xs ? (e) => xs.createHTML(e) : (e) => e, Pd = "http://www.w3.org/2000/svg", Dd = "http://www.w3.org/1998/Math/MathML", yt = typeof document < "u" ? document : null, Xi = yt && /* @__PURE__ */ yt.createElement("template"), kd = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const o = t === "svg" ? yt.createElementNS(Pd, e) : t === "mathml" ? yt.createElementNS(Dd, e) : n ? yt.createElement(e, { is: n }) : yt.createElement(e);
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
      Xi.innerHTML = La(
        r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e
      );
      const a = Xi.content;
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
      i ? i.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, Td = /* @__PURE__ */ Symbol("_vtc");
function Fd(e, t, n) {
  const r = e[Td];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Yi = /* @__PURE__ */ Symbol("_vod"), Hd = /* @__PURE__ */ Symbol("_vsh"), Ld = /* @__PURE__ */ Symbol(""), jd = /(?:^|;)\s*display\s*:/;
function zd(e, t, n) {
  const r = e.style, o = be(n);
  let s = !1;
  if (n && !o) {
    if (t)
      if (be(t))
        for (const i of t.split(";")) {
          const a = i.slice(0, i.indexOf(":")).trim();
          n[a] == null && Kn(r, a, "");
        }
      else
        for (const i in t)
          n[i] == null && Kn(r, i, "");
    for (const i in n) {
      i === "display" && (s = !0);
      const a = n[i];
      a != null ? Vd(
        e,
        i,
        !be(t) && t ? t[i] : void 0,
        a
      ) || Kn(r, i, a) : Kn(r, i, "");
    }
  } else if (o) {
    if (t !== n) {
      const i = r[Ld];
      i && (n += ";" + i), r.cssText = n, s = jd.test(n);
    }
  } else t && e.removeAttribute("style");
  Yi in e && (e[Yi] = s ? r.display : "", e[Hd] && (r.display = "none"));
}
const Tr = /\s*!important$/;
function Kn(e, t, n) {
  if (U(n))
    n.forEach((r) => Kn(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--"))
    Tr.test(n) ? e.setProperty(t, n.replace(Tr, ""), "important") : e.setProperty(t, n);
  else {
    const r = Kd(e, t);
    Tr.test(n) ? e.setProperty(
      Zt(r),
      n.replace(Tr, ""),
      "important"
    ) : e[r] = n;
  }
}
const Zi = ["Webkit", "Moz", "ms"], ts = {};
function Kd(e, t) {
  const n = ts[t];
  if (n)
    return n;
  let r = Ye(t);
  if (r !== "filter" && r in e)
    return ts[t] = r;
  r = Fl(r);
  for (let o = 0; o < Zi.length; o++) {
    const s = Zi[o] + r;
    if (s in e)
      return ts[t] = s;
  }
  return t;
}
function Vd(e, t, n, r) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && be(r) && n === r;
}
const Ji = "http://www.w3.org/1999/xlink";
function Qi(e, t, n, r, o, s = qu(t)) {
  r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Ji, t.slice(6, t.length)) : e.setAttributeNS(Ji, t, n) : n == null || s && !Ll(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    s ? "" : ut(n) ? String(n) : n
  );
}
function el(e, t, n, r, o) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? La(n) : n);
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
  let i = !1;
  if (n === "" || n == null) {
    const a = typeof e[t];
    a === "boolean" ? n = Ll(n) : n == null && a === "string" ? (n = "", i = !0) : a === "number" && (n = 0, i = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  i && e.removeAttribute(o || t);
}
function Bd(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function Nd(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const tl = /* @__PURE__ */ Symbol("_vei");
function $d(e, t, n, r, o = null) {
  const s = e[tl] || (e[tl] = {}), i = s[t];
  if (r && i)
    i.value = r;
  else {
    const [a, c] = qd(t);
    if (r) {
      const f = s[t] = Yd(
        r,
        o
      );
      Bd(e, a, f, c);
    } else i && (Nd(e, a, i, c), s[t] = void 0);
  }
}
const Wd = /(Once|Passive|Capture)$/, Ud = /^on:?(?:Once|Passive|Capture)$/;
function qd(e) {
  let t, n;
  for (; (n = e.match(Wd)) && !Ud.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : Zt(e.slice(2)), t];
}
let ns = 0;
const Gd = /* @__PURE__ */ Promise.resolve(), Xd = () => ns || (Gd.then(() => ns = 0), ns = Date.now());
function Yd(e, t) {
  const n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    const o = n.value;
    if (U(o)) {
      const s = r.stopImmediatePropagation;
      r.stopImmediatePropagation = () => {
        s.call(r), r._stopped = !0;
      };
      const i = o.slice(), a = [r];
      for (let c = 0; c < i.length && !r._stopped; c++) {
        const f = i[c];
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
  return n.value = e, n.attached = Xd(), n;
}
const nl = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Zd = (e, t, n, r, o, s) => {
  const i = o === "svg";
  t === "class" ? Fd(e, r, i) : t === "style" ? zd(e, n, r) : ro(t) ? oo(t) || $d(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Jd(e, t, r, i)) ? (el(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Qi(e, t, r, i, s, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Qd(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !be(r))) ? el(e, Ye(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), Qi(e, t, r, i));
};
function Jd(e, t, n, r) {
  if (r)
    return !!(t === "innerHTML" || t === "textContent" || t in e && nl(t) && X(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return nl(t) && be(n) ? !1 : t in e;
}
function Qd(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const r = Ye(t);
  return Array.isArray(n) ? n.some((o) => Ye(o) === r) : Object.keys(n).some((o) => Ye(o) === r);
}
const eg = ["ctrl", "shift", "alt", "meta"], tg = {
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
  exact: (e, t) => eg.some((n) => e[`${n}Key`] && !t.includes(n))
}, cn = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), r = t.join(".");
  return n[r] || (n[r] = (o, ...s) => {
    for (let i = 0; i < t.length; i++) {
      const a = tg[t[i]];
      if (a && a(o, t)) return;
    }
    return e(o, ...s);
  });
}, ng = /* @__PURE__ */ De({ patchProp: Zd }, kd);
let rl;
function rg() {
  return rl || (rl = dd(ng));
}
const og = (...e) => {
  const t = rg().createApp(...e), { mount: n } = t;
  return t.mount = (r) => {
    const o = ig(r);
    if (!o) return;
    const s = t._component;
    !X(s) && !s.render && !s.template && (s.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const i = n(o, !1, sg(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), i;
  }, t;
};
function sg(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function ig(e) {
  return be(e) ? document.querySelector(e) : e;
}
function Fr() {
  return !0;
}
const lg = Symbol("merge-proxy"), Br = Symbol("merge-proxy-sources"), ag = {
  get(e, t, n) {
    return t === lg ? n : t === Br ? e.sources : e.get(t);
  },
  has(e, t) {
    return e.has(t);
  },
  set: Fr,
  deleteProperty: Fr,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: Fr,
      deleteProperty: Fr
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function Nr(e) {
  return e && typeof e == "object" && "value" in e ? e.value : e;
}
function Rs(...e) {
  const t = e.flatMap((n) => typeof n == "object" && n !== null && Br in n && Array.isArray(n[Br]) ? n[Br] : [n]);
  return new Proxy({
    sources: t,
    get(n) {
      for (let r = t.length - 1; r >= 0; r--) {
        const o = Nr(t[r])[n];
        if (o !== void 0) return o;
      }
    },
    has(n) {
      for (let r = t.length - 1; r >= 0; r--) if (n in Nr(t[r])) return !0;
      return !1;
    },
    keys() {
      const n = [];
      for (const r of t) n.push(...Object.keys(Nr(r)));
      return [...Array.from(new Set(n))];
    }
  }, ag);
}
function ol(...e) {
  const t = {};
  for (let n of e)
    if (n = Nr(n), !!n)
      for (const r of Reflect.ownKeys(n)) {
        const o = n[r];
        o !== void 0 && (t[r] = o);
      }
  return t;
}
function ja(e) {
  return typeof e == "function" ? e : (t) => {
    var n;
    return (n = e.next) == null ? void 0 : n.call(e, t);
  };
}
function cg(e) {
  return Object.assign(e, {
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: ye(e, ja(t), { flush: "sync" }) })
  });
}
function ug(e) {
  return Object.assign(e, {
    set: (t) => {
      e.value = typeof t == "function" ? t(e.value) : t;
    },
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: ye(e, ja(t), { flush: "sync" }) })
  });
}
function fg() {
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
    createReadonlyAtom: (t, n) => cg($(() => t())),
    createWritableAtom: (t, n) => ug(/* @__PURE__ */ vf(t)),
    untrack: (t) => t(),
    batch: (t) => t()
  };
}
function mo(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function ft(e) {
  if (Array.isArray(e)) return e.map(ft);
  if (e && typeof e == "object") {
    const t = Object.getPrototypeOf(e);
    if (t !== Object.prototype && t !== null) return e;
    const n = t === null ? ee() : {}, r = Object.keys(e);
    for (let o = 0; o < r.length; o++) {
      const s = r[o];
      Object.defineProperty(n, s, {
        configurable: !0,
        enumerable: !0,
        value: ft(e[s]),
        writable: !0
      });
    }
    return n;
  }
  return e;
}
function za(e, t) {
  const n = Object.keys(t), r = e;
  for (let o = 0; o < n.length; o++) {
    const s = n[o];
    !s.startsWith("_memo_") && s !== "_cellsCache" && (r[s] = t[s]);
  }
  return e;
}
function ee() {
  return /* @__PURE__ */ Object.create(null);
}
function Jt(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function lr(e, t) {
  return (n) => {
    var r;
    (((r = t.options.atoms) == null ? void 0 : r[e]) ?? t.baseAtoms[e]).set((o) => mo(n, o));
  };
}
function sl(e) {
  if (typeof e != "object" || e === null) return !1;
  if (Array.isArray(e)) return !0;
  const t = Object.getPrototypeOf(e);
  return t === Object.prototype || t === null;
}
function il(e) {
  return Reflect.ownKeys(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
const dg = 3;
function gg(e, t) {
  return Ka(e, t, dg);
}
function Ka(e, t, n) {
  if (Object.is(e, t)) return !0;
  if (n <= 0 || !sl(e) || !sl(t) || (Array.isArray(e) || Array.isArray(t)) && (!Array.isArray(e) || !Array.isArray(t) || e.length !== t.length))
    return !1;
  const r = il(e), o = il(t);
  if (r.length !== o.length) return !1;
  const s = e, i = t;
  for (let a = 0; a < r.length; a++) {
    const c = r[a];
    if (!Object.prototype.propertyIsEnumerable.call(t, c) || !Ka(s[c], i[c], n - 1)) return !1;
  }
  return !0;
}
function vo(e, t, n, r = gg) {
  const o = `on${t.charAt(0).toUpperCase()}${t.slice(1)}Change`, s = e.options[o];
  s && s((i) => {
    const a = mo(n, i);
    return r(i, a) ? i : a;
  });
}
function pg(e) {
  return e instanceof Function;
}
function hg(e, t) {
  const n = [], r = (o) => {
    o.forEach((s) => {
      n.push(s);
      const i = t(s);
      i.length && r(i);
    });
  };
  return r(e), n;
}
const mg = ({ fn: e, memoDeps: t, onAfterCompare: n, onAfterUpdate: r, onBeforeCompare: o, onBeforeUpdate: s }) => {
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
function Va(e) {
  let t = !1;
  return () => {
    if (!t) {
      t = !0;
      return;
    }
    e();
  };
}
function ar({ feature: e, fnName: t, objectId: n, onAfterUpdate: r, table: o, ...s }) {
  const i = () => {
    if (!r) return;
    const { schedule: c, untrack: f } = o._reactivity;
    c(() => f(() => r()));
  };
  return mg({
    ...s,
    ...{ onAfterUpdate: () => {
      i();
    } }
  });
}
function Ba(e, t = "_") {
  const [n, r] = e.split(t);
  return {
    fnKey: r,
    fnName: `${n}.${r}`,
    parentName: n
  };
}
function dt(e, t, n) {
  for (const [r, { fn: o, memoDeps: s }] of Object.entries(n)) {
    const { fnKey: i, fnName: a } = Ba(r);
    t[i] = s ? ar({
      memoDeps: s,
      fn: o,
      fnName: a,
      table: t,
      feature: e
    }) : o;
  }
}
function et(e, t, n, r) {
  for (const [o, { fn: s, memoDeps: i }] of Object.entries(r)) {
    const { fnKey: a, fnName: c } = Ba(o);
    if (i) {
      const f = `_memo_${a}`;
      t[a] = function(...d) {
        if (!this[f]) {
          const h = this;
          this[f] = ar({
            memoDeps: (w) => i(h, w),
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
function Y(e, t, n, ...r) {
  var o;
  return ((o = e[t]) == null ? void 0 : o.call(e, ...r)) ?? n(e, ...r);
}
function vg(e) {
  return e.row.getValue(e.column.id);
}
function wg(e) {
  return e.getValue() ?? e.table.options.renderFallbackValue;
}
function yg(e) {
  return {
    table: e.table,
    column: e.column,
    row: e.row,
    cell: e,
    getValue: () => e.getValue(),
    renderValue: () => e.renderValue()
  };
}
const bg = { assignCellPrototype: (e, t) => {
  et("coreCellsFeature", e, t, {
    cell_getValue: { fn: (n) => vg(n) },
    cell_renderValue: { fn: (n) => wg(n) },
    cell_getContext: {
      fn: (n) => yg(n),
      memoDeps: (n) => [n]
    }
  });
} };
function _g(e) {
  var t, n;
  if (!e._headerPrototype) {
    e._headerPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignHeaderPrototype) == null || n.call(t, e._headerPrototype, e);
  }
  return e._headerPrototype;
}
function Na(e, t, n) {
  const r = _g(e), o = Object.create(r);
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
function Sg(e) {
  var s;
  const t = e.getAllColumns(), n = e.getAllLeafColumnsById(), { start: r } = ((s = e.atoms.columnPinning) == null ? void 0 : s.get()) ?? Qt(), o = [];
  for (let i = 0; i < r.length; i++) {
    const a = n[r[i]];
    a && Y(a, "getIsVisible", We) && o.push(a);
  }
  return tr(t, o, e, "start");
}
function xg(e) {
  var s;
  const t = e.getAllColumns(), n = e.getAllLeafColumnsById(), { end: r } = ((s = e.atoms.columnPinning) == null ? void 0 : s.get()) ?? Qt(), o = [];
  for (let i = 0; i < r.length; i++) {
    const a = n[r[i]];
    a && Y(a, "getIsVisible", We) && o.push(a);
  }
  return tr(t, o, e, "end");
}
function Rg(e) {
  var s;
  const t = e.getAllColumns();
  let n = Y(e, "getVisibleLeafColumns", Xs);
  const { start: r, end: o } = ((s = e.atoms.columnPinning) == null ? void 0 : s.get()) ?? Qt();
  if (r.length || o.length) {
    const i = [...r, ...o];
    n = n.filter((a) => !i.includes(a.id));
  }
  return tr(t, n, e, "center");
}
function Cg(e) {
  var o;
  const { start: t } = ((o = e.atoms.columnPinning) == null ? void 0 : o.get()) ?? Qt(), n = e.getAllLeafColumnsById(), r = [];
  for (let s = 0; s < t.length; s++) {
    const i = n[t[s]];
    i && r.push(i);
  }
  return r;
}
function Ig(e) {
  var o;
  const { end: t } = ((o = e.atoms.columnPinning) == null ? void 0 : o.get()) ?? Qt(), n = e.getAllLeafColumnsById(), r = [];
  for (let s = 0; s < t.length; s++) {
    const i = n[t[s]];
    i && r.push(i);
  }
  return r;
}
function Mg(e) {
  var o;
  const { start: t, end: n } = ((o = e.atoms.columnPinning) == null ? void 0 : o.get()) ?? Qt();
  if (!t.length && !n.length) return e.getAllLeafColumns();
  const r = [...t, ...n];
  return e.getAllLeafColumns().filter((s) => !r.includes(s.id));
}
function Eg(e) {
  return Y(e, "getStartLeafColumns", Cg).filter((t) => Y(t, "getIsVisible", We));
}
function Ag(e) {
  return Y(e, "getEndLeafColumns", Ig).filter((t) => Y(t, "getIsVisible", We));
}
function Og(e) {
  return Y(e, "getCenterLeafColumns", Mg).filter((t) => Y(t, "getIsVisible", We));
}
function Hr(e, t) {
  return t ? t === "start" ? Y(e, "getStartVisibleLeafColumns", Eg) : t === "end" ? Y(e, "getEndVisibleLeafColumns", Ag) : Y(e, "getCenterVisibleLeafColumns", Og) : Y(e, "getVisibleLeafColumns", Xs);
}
function We(e) {
  var r;
  const t = (r = e.table.atoms.columnVisibility) == null ? void 0 : r.get();
  if (!t) return !0;
  const n = e.columns;
  return n.length ? n.some((o) => Y(o, "getIsVisible", We)) : (Jt(t, e.id) ? t[e.id] : void 0) ?? !0;
}
function Xs(e) {
  return e.getAllLeafColumns().filter((t) => Y(t, "getIsVisible", We));
}
function $a(e, t = 1) {
  let n = t;
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    Y(o, "getIsVisible", We) && o.columns.length && (n = Math.max(n, $a(o.columns, t + 1)));
  }
  return n;
}
function Pg(e, t) {
  return e ? `${e}_${t}` : String(t);
}
function Dg(e, t, n, r) {
  let o = e ?? "";
  return t && (o = o ? `${o}_${t}` : String(t)), n && (o = o ? `${o}_${n}` : n), r && (o = o ? `${o}_${r}` : r), o;
}
function kg(e, t) {
  let n = 0;
  for (let r = 0; r < e.length; r++) e[r].column === t && n++;
  return n;
}
function Wa(e, t, n, r, o, s) {
  const i = {
    depth: t,
    id: Pg(r, t),
    headers: []
  }, a = [];
  for (let c = 0; c < e.length; c++) {
    if (!(c in e)) continue;
    const f = e[c], d = a[a.length - 1], h = f.column.depth === i.depth;
    let w, y = !1;
    if (h && f.column.parent ? w = f.column.parent : (w = f.column, y = !0), d && d.column === w) d.subHeaders.push(f);
    else {
      const M = Na(n, w, {
        id: Dg(r, t, w.id, f.id),
        isPlaceholder: y,
        placeholderId: y ? String(kg(a, w)) : void 0,
        depth: t,
        index: a.length
      });
      M.subHeaders.push(f), a.push(M);
    }
    i.headers.push(f), f.headerGroup = i;
  }
  for (let c = 0; c < s.length; c++) s[c](i);
  o.push(i), t > 0 && Wa(a, t - 1, n, r, o, s);
}
function Ua(e) {
  for (let t = 0; t < e.length; t++) {
    const n = e[t];
    if (!Y(n.column, "getIsVisible", We)) continue;
    let r = 0;
    if (n.subHeaders.length) {
      Ua(n.subHeaders);
      for (let o = 0; o < n.subHeaders.length; o++) {
        const s = n.subHeaders[o];
        Y(s.column, "getIsVisible", We) && (r += s.colSpan);
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
function tr(e, t, n, r) {
  var c;
  const o = $a(e), s = [], i = n._headerGroupInstanceInitFns, a = new Array(t.length);
  for (let f = 0; f < t.length; f++)
    f in t && (a[f] = Na(n, t[f], {
      depth: o,
      index: f
    }));
  return Wa(a, o - 1, n, r, s, i), s.reverse(), Ua(((c = s[0]) == null ? void 0 : c.headers) ?? []), s;
}
function Tg(e) {
  var t, n;
  if (!e._columnPrototype) {
    e._columnPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignColumnPrototype) == null || n.call(t, e._columnPrototype, e);
  }
  return e._columnPrototype;
}
function Fg(e, t, n, r) {
  const o = {
    ...e.getDefaultColumnDef(),
    ...t
  }, s = o.accessorKey, i = s === void 0 ? void 0 : String(s), a = o.id ?? (i == null ? void 0 : i.replaceAll(".", "_")) ?? (typeof o.header == "string" ? o.header : void 0);
  let c;
  if (o.accessorFn) c = o.accessorFn;
  else if (s !== void 0) if (typeof s == "string" && s.includes(".")) {
    const w = s.split(".");
    c = (y) => {
      let M = y;
      for (let E = 0; E < w.length; E++) {
        const A = w[E];
        M = M == null ? void 0 : M[A];
      }
      return M;
    };
  } else c = (w) => w[o.accessorKey];
  if (!a)
    throw new Error();
  const f = Tg(e), d = Object.create(f);
  d.accessorFn = c, d.columnDef = o, d.columns = [], d.depth = n, d.id = `${String(a)}`, d.parent = r;
  const h = e._columnInstanceInitFns;
  for (let w = 0; w < h.length; w++) h[w](d);
  return d;
}
function qa(e) {
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
        const a = t[i], c = s.get(a);
        c && (o.push(c), s.delete(a));
      }
      for (let i = 0; i < r.length; i++) {
        const a = r[i];
        s.has(a.id) && o.push(a);
      }
    }
    return Hg(e, o);
  };
}
function Hg(e, t) {
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
  const i = [];
  for (let c = 0; c < n.length; c++) {
    const f = s.get(n[c]);
    f && i.push(f);
  }
  return [...i, ...o];
}
function Lg(e) {
  return [e, ...e.columns.flatMap((t) => t.getFlatColumns())];
}
function jg(e) {
  if (e.columns.length) {
    const t = e.columns.flatMap((n) => n.getLeafColumns());
    return Y(e.table, "getOrderColumns", qa)(t);
  }
  return [e];
}
function zg(e) {
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
function Ga(e, t, n, r = 0) {
  const o = new Array(t.length);
  for (let s = 0; s < t.length; s++) {
    if (!(s in t)) continue;
    const i = t[s], a = Fg(e, i, r, n), c = i;
    a.columns = c.columns ? Ga(e, c.columns, a, r + 1) : [], o[s] = a;
  }
  return o;
}
function Kg(e) {
  return Ga(e, e.options.columns);
}
function Vg(e) {
  return e.getAllColumns().flatMap((t) => t.getFlatColumns());
}
function Bg(e) {
  const t = ee(), n = e.getAllFlatColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function Ng(e) {
  const t = e.getAllColumns().flatMap((n) => n.getLeafColumns());
  return Y(e, "getOrderColumns", qa)(t);
}
function $g(e) {
  const t = ee(), n = e.getAllLeafColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function Wg(e, t) {
  return e.getAllFlatColumnsById()[t];
}
const Ug = {
  assignColumnPrototype: (e, t) => {
    et("coreColumnsFeature", e, t, {
      column_getFlatColumns: {
        fn: (n) => Lg(n),
        memoDeps: (n) => [n.table.options.columns]
      },
      column_getLeafColumns: {
        fn: (n) => jg(n),
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
    dt("coreColumnsFeature", e, {
      table_getDefaultColumnDef: {
        fn: () => zg(e),
        memoDeps: () => [e.options.defaultColumn]
      },
      table_getAllColumns: {
        fn: () => Kg(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumns: {
        fn: () => Vg(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumnsById: {
        fn: () => Bg(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllLeafColumns: {
        fn: () => Ng(e),
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
        fn: () => $g(e),
        memoDeps: () => [e.getAllLeafColumns()]
      },
      table_getColumn: { fn: (t) => Wg(e, t) }
    });
  }
};
function Xa(e, t) {
  for (let n = 0; n < e.subHeaders.length; n++) Xa(e.subHeaders[n], t);
  t.push(e);
}
function qg(e) {
  const t = [];
  return Xa(e, t), t;
}
function Gg(e) {
  return {
    column: e.column,
    header: e,
    table: e.column.table
  };
}
function Xg(e) {
  var f;
  const { start: t, end: n } = ((f = e.atoms.columnPinning) == null ? void 0 : f.get()) ?? Qt(), r = e.getAllColumns(), o = Y(e, "getVisibleLeafColumns", Xs);
  if (!t.length && !n.length) return tr(r, o, e);
  const s = e.getAllLeafColumnsById(), i = [];
  for (let d = 0; d < t.length; d++) {
    const h = s[t[d]];
    h && Y(h, "getIsVisible", We) && i.push(h);
  }
  const a = [];
  for (let d = 0; d < n.length; d++) {
    const h = s[n[d]];
    h && Y(h, "getIsVisible", We) && a.push(h);
  }
  const c = o.filter((d) => !t.includes(d.id) && !n.includes(d.id));
  return tr(r, [
    ...i,
    ...c,
    ...a
  ], e);
}
function Yg(e) {
  return [...e.getHeaderGroups()].reverse();
}
function Zg(e) {
  const t = e.getHeaderGroups(), n = [];
  for (let r = 0; r < t.length; r++) {
    const o = t[r].headers;
    for (let s = 0; s < o.length; s++) n.push(o[s]);
  }
  return n;
}
function Jg(e) {
  var r;
  const t = ((r = e.getHeaderGroups()[0]) == null ? void 0 : r.headers) ?? [], n = [];
  for (let o = 0; o < t.length; o++) {
    const s = t[o].getLeafHeaders();
    for (let i = 0; i < s.length; i++) n.push(s[i]);
  }
  return n;
}
const Qg = {
  assignHeaderPrototype: (e, t) => {
    et("coreHeadersFeature", e, t, {
      header_getLeafHeaders: {
        fn: (n) => qg(n),
        memoDeps: (n) => [n.column.table.options.columns]
      },
      header_getContext: {
        fn: (n) => Gg(n),
        memoDeps: (n) => [n.column.table.options.columns]
      }
    });
  },
  constructTableAPIs: (e) => {
    dt("coreHeadersFeature", e, {
      table_getHeaderGroups: {
        fn: () => Xg(e),
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
        fn: () => Yg(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getFlatHeaders: {
        fn: () => Zg(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getLeafHeaders: {
        fn: () => Jg(e),
        memoDeps: () => [e.getHeaderGroups()]
      }
    });
  }
};
function ep(e) {
  var t, n;
  if (!e._rowPrototype) {
    e._rowPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignRowPrototype) == null || n.call(t, e._rowPrototype, e);
  }
  return e._rowPrototype;
}
const tp = (e, t, n, r, o, s, i) => {
  const a = ep(e), c = Object.create(a);
  c._displayIndexCache = -1, c._uniqueValuesCache = ee(), c._valuesCache = ee(), c.depth = o, c.id = t, c.index = r, c.original = n, c.parentId = i, c.subRows = [];
  const f = e._rowInstanceInitFns;
  for (let d = 0; d < f.length; d++) f[d](c);
  return c;
}, np = /([0-9]+)/gm;
function yn(e) {
  const t = Object.assign((n, r, o) => {
    let s = n.getValue(o), i = r.getValue(o);
    const a = t.resolveDataValue;
    return a && (s = a(s), i = a(i)), t.sort(s, i, n, r, o);
  }, e);
  return t;
}
const rp = yn({
  resolveDataValue: (e) => wo(e).toLowerCase(),
  sort: (e, t) => Za(e, t)
});
yn({
  resolveDataValue: (e) => wo(e),
  sort: (e, t) => Za(e, t)
});
const op = yn({
  resolveDataValue: (e) => wo(e).toLowerCase(),
  sort: (e, t) => Ys(e, t)
});
yn({
  resolveDataValue: (e) => wo(e),
  sort: (e, t) => Ys(e, t)
});
yn({
  resolveDataValue: (e) => sp(e),
  sort: (e, t) => e > t ? 1 : e < t ? -1 : 0
});
const Ya = yn({ sort: (e, t) => Ys(e, t) });
function Ys(e, t) {
  return e === t ? 0 : e > t ? 1 : -1;
}
function sp(e) {
  return e instanceof Date ? e.getTime() : e;
}
function wo(e) {
  return typeof e == "number" ? isNaN(e) || e === 1 / 0 || e === -1 / 0 ? "" : String(e) : typeof e == "string" ? e : "";
}
function Za(e, t) {
  let n = 0, r = 0;
  const o = e.length, s = t.length;
  for (; n < o && r < s; ) {
    const i = Jr(e.charCodeAt(n)), a = Jr(t.charCodeAt(r)), c = Cs(e, n, i), f = Cs(t, r, a);
    if (!i && !a) {
      const h = ip(e, n, c, t, r, f);
      if (h) return h;
      n = c, r = f;
      continue;
    }
    if (i !== a) return i ? 1 : -1;
    const d = lp(e, n, c, t, r, f);
    if (d) return d;
    n = c, r = f;
  }
  return al(e, n) - al(t, r);
}
function Jr(e) {
  return e >= 48 && e <= 57;
}
function Cs(e, t, n) {
  let r = t + 1;
  for (; r < e.length && Jr(e.charCodeAt(r)) === n; ) r++;
  return r;
}
function ip(e, t, n, r, o, s) {
  const i = n - t, a = s - o, c = i < a ? i : a;
  for (let f = 0; f < c; f++) {
    const d = e.charCodeAt(t + f), h = r.charCodeAt(o + f);
    if (d > h) return 1;
    if (h > d) return -1;
  }
  return i > a ? 1 : a > i ? -1 : 0;
}
function lp(e, t, n, r, o, s) {
  let i = t;
  for (; i < n && e.charCodeAt(i) === 48; ) i++;
  let a = o;
  for (; a < s && r.charCodeAt(a) === 48; ) a++;
  const c = n - i, f = s - a;
  if (c === 0 && f === 0) return 0;
  if (c <= 15 && f <= 15) {
    const w = ll(e, i, n), y = ll(r, a, s);
    return w > y ? 1 : y > w ? -1 : 0;
  }
  const d = parseInt(e.slice(t, n), 10), h = parseInt(r.slice(o, s), 10);
  return d > h ? 1 : h > d ? -1 : 0;
}
function ll(e, t, n) {
  let r = 0;
  for (let o = t; o < n; o++) r = r * 10 + e.charCodeAt(o) - 48;
  return r;
}
function al(e, t) {
  let n = 0, r = t;
  for (; r < e.length; )
    n++, r = Cs(e, r, Jr(e.charCodeAt(r)));
  return n;
}
function ap() {
  return [];
}
function cp(e, t) {
  vo(e, "cellSelection", ft(e.initialState.cellSelection) ?? ap());
}
function up(e) {
  e.atoms.cellSelection && (e.options.autoResetAll ?? e.options.autoResetCellSelection ?? !0) && e._reactivity.schedule(() => cp(e));
}
function fp() {
  return ee();
}
function Ja(e) {
  e.atoms.expanded && (e.options.autoResetAll ?? e.options.autoResetExpanded ?? !e.options.manualExpanding) && e._reactivity.schedule(() => ec(e));
}
function Qr(e, t) {
  var n, r;
  (r = (n = e.options).onExpandedChange) == null || r.call(n, t);
}
function Qa(e, t) {
  var r;
  const n = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t ?? !nc(e)) {
    if (n === !0 || !tc(e)) return;
    Qr(e, !0);
  } else {
    if (n !== !0 && !Object.keys(n).length) return;
    Qr(e, ee());
  }
}
function ec(e, t) {
  const n = e.initialState.expanded;
  vo(e, "expanded", t ? ee() : n === !0 ? !0 : Object.assign(ee(), ft(n ?? {})));
}
function tc(e) {
  return e.getPrePaginatedRowModel().flatRows.some((t) => Xt(t));
}
function dp(e) {
  return (t) => {
    Qa(e);
  };
}
function gp(e) {
  var n;
  const t = ((n = e.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return t === !0 || Object.values(t).some(Boolean);
}
function nc(e) {
  var r;
  const t = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t === !0) return !0;
  if (!Object.keys(t).length) return !1;
  const n = e.getRowModel().flatRows.filter((o) => Xt(o));
  return !(!n.length || n.some((o) => !yo(o)));
}
function pp(e) {
  var r;
  let t = 0;
  const n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return (n === !0 ? Object.values(e.getRowModel().rowsById).filter((o) => Xt(o)).map((o) => o.id) : Object.keys(n ?? {})).forEach((o) => {
    const s = o.split(".");
    t = Math.max(t, s.length);
  }), t;
}
function rc(e, t) {
  var s;
  const n = ((s = e.table.atoms.expanded) == null ? void 0 : s.get()) ?? {}, r = n === !0 || Is(n, e.id), o = t ?? !r;
  o !== r && (o && !Xt(e) || Qr(e.table, (i) => {
    const a = i === !0 ? !0 : Is(i, e.id);
    let c = ee();
    if (i === !0 ? Object.values(e.table.getRowModel().rowsById).forEach((f) => {
      Xt(f) && (c[f.id] = !0);
    }) : c = Object.assign(ee(), i), !a && o)
      return c[e.id] = !0, c;
    if (a && !o) {
      const f = ee(), d = Object.keys(c);
      for (let h = 0; h < d.length; h++) {
        const w = d[h];
        w !== e.id && c[w] && (f[w] = !0);
      }
      return f;
    }
    return i;
  }));
}
function yo(e) {
  var n, r, o;
  const t = ((n = e.table.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return !!(((o = (r = e.table.options).getIsRowExpanded) == null ? void 0 : o.call(r, e)) ?? (t === !0 || Is(t, e.id)));
}
function Is(e, t) {
  return !!(e && e !== !0 && Jt(e, t) && e[t]);
}
function Xt(e) {
  var t, n;
  return ((n = (t = e.table.options).getRowCanExpand) == null ? void 0 : n.call(t, e)) ?? ((e.table.options.enableExpanding ?? !0) && !!e.subRows.length);
}
function hp(e) {
  let t = !0, n = e;
  for (; t && n.parentId; )
    n = e.table.getRow(n.parentId, !0), t = yo(n);
  return t;
}
function mp(e) {
  const t = Xt(e);
  return () => {
    t && rc(e);
  };
}
const Ms = 0;
function oc(e) {
  var t, n;
  if (e.options.autoResetAll ?? e.options.autoResetPageIndex ?? !e.options.manualPagination) {
    if ((((n = (t = e.atoms.pagination) == null ? void 0 : t.get()) == null ? void 0 : n.pageIndex) ?? Ms) === Ms) return;
    yp(e);
  }
}
function vp(e, t) {
  vo(e, "pagination", t);
}
function wp(e, t) {
  vp(e, (n) => {
    let r = mo(t, n.pageIndex);
    const o = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
    return r = Math.max(0, Math.min(r, o)), {
      ...n,
      pageIndex: r
    };
  });
}
function yp(e, t) {
  wp(e, Ms);
}
function bp() {
  return [];
}
function bo(e, t) {
  vo(e, "sorting", t);
}
function sc(e, t) {
  bo(e, t ? [] : ft(e.initialState.sorting ?? []));
}
function _p(e) {
  e.atoms.sorting && (e.options.autoResetAll ?? e.options.autoResetSorting ?? !1) && sc(e);
}
function ic(e) {
  const t = e.table._rowModelFns.sortFns, n = e.table.getFilteredRowModel().flatRows.slice(0, 10);
  let r, o = !1;
  for (let s = 0; s < n.length; s++) {
    const i = n[s].getValue(e.id);
    if (Object.prototype.toString.call(i) === "[object Date]") {
      r = "datetime";
      break;
    }
    if (typeof i == "string" && (o = !0, i.split(np).length > 1)) {
      r = "alphanumeric";
      break;
    }
  }
  if (!r && o && (r = "text"), r) {
    let s = t == null ? void 0 : t[r];
    if (s || r === "alphanumeric" && (s = t == null ? void 0 : t.text), s) return s;
  }
  return Ya;
}
function lc(e) {
  const t = e.table.getFilteredRowModel().flatRows.slice(0, 10);
  for (let n = 0; n < t.length; n++) {
    const r = t[n].getValue(e.id);
    if (r != null)
      return typeof r == "string" ? "asc" : "desc";
  }
  return "desc";
}
function ac(e) {
  const t = e.table._rowModelFns.sortFns;
  return pg(e.columnDef.sortFn) ? e.columnDef.sortFn : e.columnDef.sortFn === "auto" ? ic(e) : (t == null ? void 0 : t[e.columnDef.sortFn]) ?? Ya;
}
function cc(e, t, n) {
  const r = fc(e, n && eo(e)), o = typeof t < "u";
  bo(e.table, (s) => {
    const i = s.findIndex((w) => w.id === e.id), a = i === -1 ? void 0 : s[i];
    let c = [], f;
    const d = o ? t : r === "desc", h = !!(s.length && eo(e) && n);
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
function uc(e) {
  return e.columnDef.sortDescFirst ?? e.table.options.sortDescFirst ?? lc(e) === "desc" ? "desc" : "asc";
}
function fc(e, t) {
  const n = uc(e), r = dc(e);
  return r ? r !== n && (e.table.options.enableSortingRemoval ?? !0) && (!t || (e.table.options.enableMultiRemove ?? !0)) ? !1 : r === "desc" ? "asc" : "desc" : n;
}
function Zs(e) {
  return (e.columnDef.enableSorting ?? !0) && (e.table.options.enableSorting ?? !0) && !!e.accessorFn;
}
function eo(e) {
  return e.columnDef.enableMultiSort ?? e.table.options.enableMultiSort ?? !!e.accessorFn;
}
function dc(e) {
  var n, r;
  const t = (r = (n = e.table.atoms.sorting) == null ? void 0 : n.get()) == null ? void 0 : r.find((o) => o.id === e.id);
  return t ? t.desc ? "desc" : "asc" : !1;
}
function Sp(e) {
  var t, n;
  return ((n = (t = e.table.atoms.sorting) == null ? void 0 : t.get()) == null ? void 0 : n.findIndex((r) => r.id === e.id)) ?? -1;
}
function xp(e) {
  bo(e.table, (t) => t.length ? t.filter((n) => n.id !== e.id) : []);
}
function Rp(e) {
  const t = Zs(e);
  return (n) => {
    var r, o;
    t && cc(e, void 0, eo(e) ? (o = (r = e.table.options).isMultiSortEvent) == null ? void 0 : o.call(r, n) : !1);
  };
}
function gc() {
  return (e) => ar({
    feature: "coreRowModelsFeature",
    table: e,
    fnName: "table.getCoreRowModel",
    memoDeps: () => [e.options.data],
    fn: () => Cp(e, e.options.data),
    onAfterUpdate: Va(() => {
      Ja(e), oc(e), _p(e), up(e);
    })
  });
}
function pc(e, t, n, r = 0, o) {
  var i;
  const s = [];
  for (let a = 0; a < n.length; a++) {
    const c = n[a], f = tp(e, e.getRowId(c, a, o), c, a, r, void 0, o == null ? void 0 : o.id);
    t.flatRows.push(f), t.rowsById[f.id] = f, s.push(f), e.options.getSubRows && (f.originalSubRows = e.options.getSubRows(c, a), (i = f.originalSubRows) != null && i.length && (f.subRows = pc(e, t, f.originalSubRows, r + 1, f)));
  }
  return s;
}
function Cp(e, t) {
  const n = {
    rows: [],
    flatRows: [],
    rowsById: ee()
  };
  return n.rows = pc(e, n, t), n;
}
function Ip(e) {
  var t, n;
  return e._rowModels.coreRowModel || (e._rowModels.coreRowModel = ((n = (t = e.options.features).coreRowModel) == null ? void 0 : n.call(t, e)) ?? gc()(e)), e._rowModels.coreRowModel();
}
function Mp(e) {
  return e.getCoreRowModel();
}
function Ep(e) {
  var t, n;
  return e._rowModels.filteredRowModel || (e._rowModels.filteredRowModel = (n = (t = e.options.features).filteredRowModel) == null ? void 0 : n.call(t, e)), e.options.manualFiltering || !e._rowModels.filteredRowModel ? e.getPreFilteredRowModel() : e._rowModels.filteredRowModel();
}
function Ap(e) {
  return e.getFilteredRowModel();
}
function Op(e) {
  var t, n;
  return e._rowModels.groupedRowModel || (e._rowModels.groupedRowModel = (n = (t = e.options.features).groupedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualGrouping || !e._rowModels.groupedRowModel ? e.getPreGroupedRowModel() : e._rowModels.groupedRowModel();
}
function Pp(e) {
  return e.getGroupedRowModel();
}
function Dp(e) {
  var t, n;
  return e._rowModels.sortedRowModel || (e._rowModels.sortedRowModel = (n = (t = e.options.features).sortedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualSorting || !e._rowModels.sortedRowModel ? e.getPreSortedRowModel() : e._rowModels.sortedRowModel();
}
function kp(e) {
  return e.getSortedRowModel();
}
function Tp(e) {
  var t, n;
  return e._rowModels.expandedRowModel || (e._rowModels.expandedRowModel = (n = (t = e.options.features).expandedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualExpanding || !e._rowModels.expandedRowModel ? e.getPreExpandedRowModel() : e._rowModels.expandedRowModel();
}
function Fp(e) {
  return e.getExpandedRowModel();
}
function Hp(e) {
  var t, n;
  return e._rowModels.paginatedRowModel || (e._rowModels.paginatedRowModel = (n = (t = e.options.features).paginatedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualPagination || !e._rowModels.paginatedRowModel ? e.getPrePaginatedRowModel() : e._rowModels.paginatedRowModel();
}
function Lp(e) {
  return e.getPaginatedRowModel();
}
const jp = { constructTableAPIs: (e) => {
  dt("coreRowModelsFeature", e, {
    table_getCoreRowModel: { fn: () => Ip(e) },
    table_getPreFilteredRowModel: { fn: () => Mp(e) },
    table_getFilteredRowModel: { fn: () => Ep(e) },
    table_getPreGroupedRowModel: { fn: () => Ap(e) },
    table_getGroupedRowModel: { fn: () => Op(e) },
    table_getPreSortedRowModel: { fn: () => Pp(e) },
    table_getSortedRowModel: { fn: () => Dp(e) },
    table_getPreExpandedRowModel: { fn: () => kp(e) },
    table_getExpandedRowModel: { fn: () => Tp(e) },
    table_getPrePaginatedRowModel: { fn: () => Fp(e) },
    table_getPaginatedRowModel: { fn: () => Hp(e) },
    table_getRowModel: { fn: () => Lp(e) }
  });
} };
function zp(e) {
  var t, n;
  if (!e._cellPrototype) {
    e._cellPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignCellPrototype) == null || n.call(t, e._cellPrototype, e);
  }
  return e._cellPrototype;
}
function Kp(e, t, n) {
  const r = zp(n), o = Object.create(r);
  o.column = e, o.id = `${t.id}_${e.id}`, o.row = t;
  const s = n._cellInstanceInitFns;
  for (let i = 0; i < s.length; i++) s[i](o);
  return o;
}
function Vp(e) {
  const t = e.table.getRowsInDisplayOrder(), n = e._displayIndexCache;
  return t[n] === e ? n : -1;
}
function Bp(e) {
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
function Np(e, t) {
  if (Jt(e._valuesCache, t)) return e._valuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return e._valuesCache[t] = n.accessorFn(e.original, e.index), e._valuesCache[t];
}
function $p(e, t) {
  if (Jt(e._uniqueValuesCache, t)) return e._uniqueValuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return n.columnDef.getUniqueValues ? (e._uniqueValuesCache[t] = n.columnDef.getUniqueValues(e.original, e.index), e._uniqueValuesCache[t]) : (e._uniqueValuesCache[t] = [e.getValue(t)], e._uniqueValuesCache[t]);
}
function Wp(e, t) {
  return e.getValue(t) ?? e.table.options.renderFallbackValue;
}
function Up(e) {
  return hg(e.subRows, (t) => t.subRows);
}
function qp(e) {
  const t = e.getCoreRowModel().flatRows;
  let n = 0;
  for (let r = 0; r < t.length; r++) n = Math.max(n, t[r].depth);
  return n;
}
function Gp(e) {
  if (e.parentId)
    return e.table.getCoreRowModel().rowsById[e.parentId] ?? e.table.getRow(e.parentId, !0);
}
function Xp(e) {
  const t = [];
  let n = e;
  for (; ; ) {
    const r = n.getParentRow();
    if (!r) break;
    t.push(r), n = r;
  }
  return t.reverse();
}
function Yp(e) {
  const t = e.table.getAllLeafColumns();
  let n = e._cellsCache;
  n || (n = e._cellsCache = /* @__PURE__ */ new WeakMap());
  const r = new Array(t.length);
  for (let o = 0; o < t.length; o++) {
    const s = t[o];
    let i = n.get(s);
    i || (i = Kp(s, e, e.table), n.set(s, i)), r[o] = i;
  }
  return r;
}
function Zp(e) {
  const t = ee(), n = e.getAllCells();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.column.id] = o;
  }
  return t;
}
function Jp(e, t, n, r) {
  var o, s;
  return ((s = (o = t.options).getRowId) == null ? void 0 : s.call(o, e, n, r)) ?? (r ? `${r.id}.${n}` : String(n));
}
function Qp(e, t, n) {
  let r = (n ? e.getPrePaginatedRowModel() : e.getRowModel()).rowsById[t];
  if (!r && (r = e.getCoreRowModel().rowsById[t], !r))
    throw new Error();
  return r;
}
const eh = {
  assignRowPrototype: (e, t) => {
    et("coreRowsFeature", e, t, {
      row_getDisplayIndex: { fn: (n) => Vp(n) },
      row_getAllCellsByColumnId: {
        fn: (n) => Zp(n),
        memoDeps: (n) => [n.getAllCells()]
      },
      row_getAllCells: {
        fn: (n) => Yp(n),
        memoDeps: (n) => [n.table.getAllLeafColumns()]
      },
      row_getLeafRows: {
        fn: (n) => Up(n),
        memoDeps: (n) => [n.subRows]
      },
      row_getParentRow: { fn: (n) => Gp(n) },
      row_getParentRows: { fn: (n) => Xp(n) },
      row_getUniqueValues: { fn: (n, r) => $p(n, r) },
      row_getValue: { fn: (n, r) => Np(n, r) },
      row_renderValue: { fn: (n, r) => Wp(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    dt("coreRowsFeature", e, {
      table_getRowsInDisplayOrder: {
        fn: () => Bp(e),
        memoDeps: () => {
          var t;
          return [
            e.getPrePaginatedRowModel().rows,
            e.options.paginateExpandedRows,
            e.options.paginateExpandedRows === !1 ? (t = e.atoms.expanded) == null ? void 0 : t.get() : void 0
          ];
        }
      },
      table_getRowId: { fn: (t, n, r) => Jp(t, e, n, r) },
      table_getRow: { fn: (t, n) => Qp(e, t, n) },
      table_getMaxSubRowDepth: {
        fn: () => qp(e),
        memoDeps: () => [e.getCoreRowModel()]
      }
    });
  }
};
function hc(e, t, n = (r, o) => r === o) {
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
function th(e, t, n = (r, o) => r === o) {
  e._reactivity.batch(() => {
    var r, o;
    hc(e, t, n), (o = (r = e._reactivity).commit) == null || o.call(r);
  });
}
function nh(e) {
  var r, o;
  const t = ft(e.initialState);
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
function rh(e, t) {
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
function oh(e, t, n) {
  const r = rh(e, mo(t, e.options));
  e.optionsStore ? e.optionsStore.set(() => r) : e.options = r, th(e, r.state ?? null);
}
const sh = { constructTableAPIs: (e) => {
  dt("coreTablesFeature", e, {
    table_reset: { fn: () => nh(e) },
    table_setOptions: { fn: (t) => oh(e, t) }
  });
} }, ih = {
  coreCellsFeature: bg,
  coreColumnsFeature: Ug,
  coreHeadersFeature: Qg,
  coreRowModelsFeature: jp,
  coreRowsFeature: eh,
  coreTablesFeature: sh
};
function lh(e) {
  const t = e;
  return Object.defineProperty(e, "state", { get() {
    return e.get();
  } }), "set" in e && (t.setState = e.set.bind(e)), t;
}
function ah(e, t) {
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
  const n = cl(e);
  if (n.length !== cl(t).length) return !1;
  for (let r = 0; r < n.length; r++) if (!Object.prototype.hasOwnProperty.call(t, n[r]) || !Object.is(e[n[r]], t[n[r]])) return !1;
  return !0;
}
function cl(e) {
  return Object.keys(e).concat(Object.getOwnPropertySymbols(e));
}
function ch(e, t = {}) {
  return Object.values(e).forEach((n) => {
    var r;
    t = ((r = n.getInitialState) == null ? void 0 : r.call(n, t)) ?? t;
  }), ft(t);
}
function uh(e) {
  var j, W;
  const t = e.features.coreReactivityFeature, { aggregationFns: n, columnMeta: r, coreRowModel: o, expandedRowModel: s, facetedMinMaxValues: i, facetedRowModel: a, facetedUniqueValues: c, filterFns: f, filterMeta: d, filteredRowModel: h, groupedRowModel: w, paginatedRowModel: y, sortFns: M, sortedRowModel: E, tableMeta: A, ...z } = e.features, I = {
    _cellInstanceInitFns: [],
    _columnInstanceInitFns: [],
    _features: {
      ...ih,
      ...z
    },
    _headerGroupInstanceInitFns: [],
    _headerInstanceInitFns: [],
    _reactivity: t,
    _rowInstanceInitFns: [],
    _rowModelFns: {
      aggregationFns: n,
      filterFns: f,
      sortFns: M
    },
    _rowModels: {},
    atoms: {},
    baseAtoms: {}
  }, O = Object.values(I._features), _ = {
    ...O.reduce((K, L) => {
      var Q;
      return Object.assign(K, (Q = L.getDefaultTableOptions) == null ? void 0 : Q.call(L, I));
    }, {}),
    ...e
  };
  if (t.wrapExternalAtoms && _.atoms) for (const [K, L] of Object.entries(_.atoms)) {
    const Q = L, le = t.createWritableAtom(Q.get(), { debugName: `externalAtom/${K}` });
    _.atoms[K] = le;
    let te = !1;
    const he = Q.subscribe((we) => {
      te || le.set(we);
    }), Re = le.subscribe((we) => {
      te = !0, Q.set(we), te = !1;
    });
    t.addSubscription(he), t.addSubscription(Re);
  }
  t.createOptionsStore ? (I.optionsStore = t.createWritableAtom(_, { debugName: "table/optionsStore" }), Object.defineProperty(I, "options", {
    configurable: !0,
    enumerable: !0,
    get() {
      return I.optionsStore.get();
    },
    set(K) {
      I.optionsStore.set(() => K);
    }
  })) : I.options = _, I.initialState = ch(I._features, I.options.initialState);
  const D = Object.keys(I.initialState);
  for (let K = 0; K < D.length; K++) {
    const L = D[K];
    I.baseAtoms[L] = t.createWritableAtom(I.initialState[L], { debugName: `table/baseAtoms/${L}` }), I.atoms[L] = t.createReadonlyAtom(() => {
      var Re;
      const Q = I.options, le = (Re = Q.atoms) == null ? void 0 : Re[L], te = le ? le.get() : I.baseAtoms[L].get();
      if (le) return te;
      const he = Q.state;
      if (he && Jt(he, L)) {
        const we = he[L];
        return we === void 0 ? I.initialState[L] : we;
      }
      return te;
    }, { debugName: `table/atoms/${L}` });
  }
  hc(I), I.store = lh(t.createReadonlyAtom(() => {
    const K = {};
    for (let L = 0; L < D.length; L++) {
      const Q = D[L];
      K[Q] = I.atoms[Q].get();
    }
    return K;
  }, {
    compare: ah,
    debugName: "table/store"
  }));
  for (let K = 0; K < O.length; K++) {
    const L = O[K];
    (j = L.initTableInstanceData) == null || j.call(L, I), L.initCellInstanceData && I._cellInstanceInitFns.push(L.initCellInstanceData.bind(L)), L.initColumnInstanceData && I._columnInstanceInitFns.push(L.initColumnInstanceData.bind(L)), L.initHeaderGroupInstanceData && I._headerGroupInstanceInitFns.push(L.initHeaderGroupInstanceData.bind(L)), L.initHeaderInstanceData && I._headerInstanceInitFns.push(L.initHeaderInstanceData.bind(L)), L.initRowInstanceData && I._rowInstanceInitFns.push(L.initRowInstanceData.bind(L)), (W = L.constructTableAPIs) == null || W.call(L, I);
  }
  return I;
}
function fh() {
  return ee();
}
function mc() {
  return {
    size: 150,
    minSize: 20,
    maxSize: Number.MAX_SAFE_INTEGER
  };
}
function _o(e) {
  var o;
  const t = mc(), n = (o = e.table.atoms.columnSizing) == null ? void 0 : o.get(), r = n && Jt(n, e.id) ? n[e.id] : void 0;
  return Math.min(Math.max(e.columnDef.minSize ?? t.minSize, r ?? e.columnDef.size ?? t.size), e.columnDef.maxSize ?? t.maxSize);
}
function Lr(e) {
  const t = ee(), n = ee(), r = new Array(e.length);
  let o = 0;
  for (let i = 0; i < e.length; i++) {
    const a = e[i], c = Y(a, "getSize", _o);
    r[i] = c, t[a.id] = o, o += c;
  }
  let s = 0;
  for (let i = e.length - 1; i >= 0; i--)
    n[e[i].id] = s, s += r[i];
  return {
    starts: t,
    afters: n
  };
}
function Js(e) {
  return {
    all: Lr(Hr(e)),
    center: Lr(Hr(e, "center")),
    start: Lr(Hr(e, "start")),
    end: Lr(Hr(e, "end"))
  };
}
function vc(e) {
  return e === "start" ? "start" : e === "end" ? "end" : e === "center" ? "center" : "all";
}
function dh(e, t) {
  return Y(e.table, "getColumnOffsets", Js)[vc(t)].starts[e.id] ?? 0;
}
function gh(e, t) {
  return Y(e.table, "getColumnOffsets", Js)[vc(t)].afters[e.id] ?? 0;
}
function ph(e) {
  So(e.table, (t) => {
    const n = ee(), r = Object.keys(t);
    for (let o = 0; o < r.length; o++) {
      const s = r[o];
      s !== e.id && (n[s] = t[s]);
    }
    return n;
  });
}
function wc(e) {
  if (!e.subHeaders.length) return _o(e.column);
  let t = 0;
  for (let n = 0; n < e.subHeaders.length; n++) t += wc(e.subHeaders[n]);
  return t;
}
function en(e) {
  return wc(e);
}
function yc(e) {
  var t;
  if (e.index > 0) {
    const n = (t = e.headerGroup) == null ? void 0 : t.headers[e.index - 1];
    if (n) return Y(n, "getStart", yc) + Y(n, "getSize", en);
  }
  return 0;
}
function So(e, t) {
  var n, r;
  (r = (n = e.options).onColumnSizingChange) == null || r.call(n, t);
}
function hh(e, t) {
  So(e, t ? ee() : Object.assign(ee(), ft(e.initialState.columnSizing ?? {})));
}
function mh(e) {
  var t;
  return ((t = e.getHeaderGroups()[0]) == null ? void 0 : t.headers.reduce((n, r) => n + en(r), 0)) ?? 0;
}
function vh(e) {
  var t;
  return ((t = Y(e, "getStartHeaderGroups", Sg)[0]) == null ? void 0 : t.headers.reduce((n, r) => n + en(r), 0)) ?? 0;
}
function wh(e) {
  var t;
  return ((t = Y(e, "getCenterHeaderGroups", Rg)[0]) == null ? void 0 : t.headers.reduce((n, r) => n + en(r), 0)) ?? 0;
}
function yh(e) {
  var t;
  return ((t = Y(e, "getEndHeaderGroups", xg)[0]) == null ? void 0 : t.headers.reduce((n, r) => n + en(r), 0)) ?? 0;
}
function Es() {
  return {
    startOffset: null,
    startSize: null,
    deltaOffset: null,
    deltaPercentage: null,
    isResizingColumn: !1,
    columnSizingStart: []
  };
}
function bc(e) {
  return (e.columnDef.enableResizing ?? !0) && (e.table.options.enableColumnResizing ?? !0);
}
function bh(e) {
  var t, n;
  return ((n = (t = e.table.atoms.columnResizing) == null ? void 0 : t.get()) == null ? void 0 : n.isResizingColumn) === e.id;
}
function _h(e, t) {
  const n = e.table.getColumn(e.column.id), r = bc(n);
  return (o) => {
    if (!r || rs(o) && o.touches.length > 1)
      return;
    const s = en(e), i = e.getLeafHeaders().map((D) => [D.column.id, _o(D.column)]), a = rs(o) ? Math.round(o.touches[0].clientX) : o.clientX, c = ee(), f = (D, j) => {
      if (typeof j != "number") return;
      const W = n.table, K = W.options.columnResizeMode === "onChange" || D === "end";
      W._reactivity.batch(() => {
        qn(W, (L) => {
          const Q = W.options.columnResizeDirection === "rtl" ? -1 : 1, le = (j - (L.startOffset ?? 0)) * Q, te = L.startSize ?? 0, he = Math.max(te > 0 ? le / te : 0, -0.999999);
          if (K) {
            const Re = L.columnSizingStart;
            for (let we = 0; we < Re.length; we++) {
              const q = Re[we], Z = q[1];
              c[q[0]] = Math.round(Math.max(Z > 0 ? Z + Z * he : le / Re.length, 0) * 100) / 100;
            }
          }
          return {
            ...L,
            deltaOffset: le,
            deltaPercentage: he
          };
        }), K && So(W, (L) => Object.assign(ee(), L, c));
      });
    };
    let d = null, h = !1, w;
    const y = () => {
      h ? (h = !1, f("move", w), d = requestAnimationFrame(y)) : d = null;
    }, M = (D) => {
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
        f("end", D ?? w), qn(n.table, (j) => ({
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
      moveHandler: (D) => M(D.clientX),
      upHandler: (D) => {
        A == null || A.removeEventListener("mousemove", z.moveHandler), A == null || A.removeEventListener("mouseup", z.upHandler), E(D.clientX);
      }
    }, I = {
      moveHandler: (D) => (D.cancelable && (D.preventDefault(), D.stopPropagation()), M(D.touches[0].clientX), !1),
      upHandler: (D) => {
        var j;
        O(), D.cancelable && (D.preventDefault(), D.stopPropagation()), E((j = D.touches[0]) == null ? void 0 : j.clientX);
      },
      cancelHandler: () => {
        O(), E();
      }
    }, O = () => {
      A == null || A.removeEventListener("touchmove", I.moveHandler), A == null || A.removeEventListener("touchend", I.upHandler), A == null || A.removeEventListener("touchcancel", I.cancelHandler);
    }, _ = xh() ? { passive: !1 } : !1;
    rs(o) ? (A == null || A.addEventListener("touchmove", I.moveHandler, _), A == null || A.addEventListener("touchend", I.upHandler, _), A == null || A.addEventListener("touchcancel", I.cancelHandler, _)) : (A == null || A.addEventListener("mousemove", z.moveHandler, _), A == null || A.addEventListener("mouseup", z.upHandler, _)), qn(n.table, (D) => ({
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
function qn(e, t) {
  var n, r;
  (r = (n = e.options).onColumnResizingChange) == null || r.call(n, t);
}
function Sh(e, t) {
  qn(e, t ? Es() : ft(e.initialState.columnResizing ?? Es()));
}
let jr = null;
function xh() {
  if (typeof jr == "boolean") return jr;
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
  return jr = e, jr;
}
function rs(e) {
  return e.type === "touchstart";
}
const Rh = {
  getInitialState: (e) => ({
    columnResizing: Es(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    columnResizeMode: "onEnd",
    columnResizeDirection: "ltr",
    onColumnResizingChange: lr("columnResizing", e)
  }),
  assignColumnPrototype: (e, t) => {
    et("columnResizingFeature", e, t, {
      column_getCanResize: { fn: (n) => bc(n) },
      column_getIsResizing: { fn: (n) => bh(n) }
    });
  },
  assignHeaderPrototype: (e, t) => {
    et("columnResizingFeature", e, t, { header_getResizeHandler: { fn: (n, r) => _h(n, r) } });
  },
  constructTableAPIs: (e) => {
    dt("columnResizingFeature", e, {
      table_setColumnResizing: { fn: (t) => qn(e, t) },
      table_resetHeaderSizeInfo: { fn: (t) => Sh(e, t) }
    });
  }
}, Ch = {
  getInitialState: (e) => ({
    columnSizing: fh(),
    ...e
  }),
  getDefaultColumnDef: () => mc(),
  getDefaultTableOptions: (e) => ({ onColumnSizingChange: lr("columnSizing", e) }),
  assignColumnPrototype: (e, t) => {
    et("columnSizingFeature", e, t, {
      column_getSize: {
        fn: (n) => _o(n),
        memoDeps: (n) => {
          var r, o;
          return [t.options.columns, (o = (r = t.atoms.columnSizing) == null ? void 0 : r.get()) == null ? void 0 : o[n.id]];
        }
      },
      column_getStart: { fn: (n, r) => dh(n, r) },
      column_getAfter: { fn: (n, r) => gh(n, r) },
      column_resetSize: { fn: (n) => ph(n) }
    });
  },
  assignHeaderPrototype: (e, t) => {
    et("columnSizingFeature", e, t, {
      header_getSize: {
        fn: (n) => en(n),
        memoDeps: (n) => {
          var r, o, s;
          return [t.options.columns, n.column.columns.length > 0 ? (r = t.atoms.columnSizing) == null ? void 0 : r.get() : (s = (o = t.atoms.columnSizing) == null ? void 0 : o.get()) == null ? void 0 : s[n.column.id]];
        }
      },
      header_getStart: {
        fn: (n) => yc(n),
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
    dt("columnSizingFeature", e, {
      table_getColumnOffsets: {
        fn: () => Js(e),
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
      table_setColumnSizing: { fn: (t) => So(e, t) },
      table_resetColumnSizing: { fn: (t) => hh(e, t) },
      table_getTotalSize: {
        fn: () => mh(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.columnSizing) == null ? void 0 : t.get(), e.getHeaderGroups()];
        }
      },
      table_getStartTotalSize: {
        fn: () => vh(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.columnSizing) == null ? void 0 : t.get(), e.getHeaderGroups()];
        }
      },
      table_getCenterTotalSize: {
        fn: () => wh(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.columnSizing) == null ? void 0 : t.get(), e.getHeaderGroups()];
        }
      },
      table_getEndTotalSize: {
        fn: () => yh(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.columnSizing) == null ? void 0 : t.get(), e.getHeaderGroups()];
        }
      }
    });
  }
}, Ih = {
  getInitialState: (e) => ({
    expanded: fp(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onExpandedChange: lr("expanded", e),
    paginateExpandedRows: !0
  }),
  assignRowPrototype: (e, t) => {
    et("rowExpandingFeature", e, t, {
      row_toggleExpanded: { fn: (n, r) => rc(n, r) },
      row_getIsExpanded: { fn: (n) => yo(n) },
      row_getCanExpand: { fn: (n) => Xt(n) },
      row_getIsAllParentsExpanded: { fn: (n) => hp(n) },
      row_getToggleExpandedHandler: { fn: (n) => mp(n) }
    });
  },
  constructTableAPIs: (e) => {
    dt("rowExpandingFeature", e, {
      table_autoResetExpanded: { fn: () => Ja(e) },
      table_setExpanded: { fn: (t) => Qr(e, t) },
      table_toggleAllRowsExpanded: { fn: (t) => Qa(e, t) },
      table_resetExpanded: { fn: (t) => ec(e, t) },
      table_getCanSomeRowsExpand: { fn: () => tc(e) },
      table_getToggleAllRowsExpandedHandler: { fn: () => dp(e) },
      table_getIsSomeRowsExpanded: { fn: () => gp(e) },
      table_getIsAllRowsExpanded: { fn: () => nc(e) },
      table_getExpandedDepth: { fn: () => pp(e) }
    });
  }
};
function Mh() {
  return ee();
}
function bn(e, t) {
  var n, r;
  (r = (n = e.options).onRowSelectionChange) == null || r.call(n, t);
}
function Eh(e, t) {
  e._lastSelectedRowId = null, bn(e, t ? ee() : Object.assign(ee(), ft(e.initialState.rowSelection ?? {})));
}
function _c(e, t, n) {
  e._lastSelectedRowId = null, bn(e, (r) => {
    if (t = typeof t < "u" ? t : !Y(e, "getIsAllRowsSelected", Rc), n != null && n.deselectAll && !t) return ee();
    const o = Object.assign(ee(), r), s = e.getPreGroupedRowModel().flatRows;
    if (t) {
      const i = /* @__PURE__ */ new Map();
      s.forEach((a) => {
        to(a, i) && (o[a.id] = !0);
      });
    } else s.forEach((i) => {
      Mt(i) && delete o[i.id];
    });
    return o;
  });
}
function Sc(e, t, n) {
  e._lastSelectedRowId = null, bn(e, (r) => {
    const o = typeof t < "u" ? t : !Y(e, "getIsAllPageRowsSelected", Cc);
    if (n != null && n.deselectAll && !o) return ee();
    const s = Object.assign(ee(), r);
    return e.getRowModel().rows.forEach((i) => {
      Ro(s, i.id, o, !0, e, !0);
    }), s;
  });
}
function Ah(e) {
  return e.getCoreRowModel();
}
function Oh(e) {
  const t = e.getCoreRowModel();
  return Y(e, "getIsSomeRowsSelected", xo) ? ti(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: ee()
  };
}
function Ph(e) {
  const t = e.getFilteredRowModel();
  return Y(e, "getIsSomeRowsSelected", xo) ? ti(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: ee()
  };
}
function Dh(e) {
  const t = e.getSortedRowModel();
  return Y(e, "getIsSomeRowsSelected", xo) ? ti(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: ee()
  };
}
function xc(e) {
  var t;
  return Object.keys(((t = e.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function Rc(e) {
  var o;
  const t = e.getFilteredRowModel().flatRows, n = ((o = e.atoms.rowSelection) == null ? void 0 : o.get()) ?? {};
  let r = !!(t.length && Object.keys(n).length);
  if (r) {
    const s = /* @__PURE__ */ new Map();
    t.some((i) => !cr(i, n) && to(i, s)) && (r = !1);
  }
  return r;
}
function Cc(e) {
  var s;
  const t = e.getPaginatedRowModel().flatRows, n = ((s = e.atoms.rowSelection) == null ? void 0 : s.get()) ?? {}, r = /* @__PURE__ */ new Map();
  let o = !1;
  for (let i = 0; i < t.length; i++) {
    const a = t[i];
    if (cr(a, n))
      !o && to(a, r) && (o = !0);
    else if (to(a, r)) return !1;
  }
  return o;
}
function xo(e) {
  return Y(e, "getSelectedRowIds", xc).length > 0;
}
function kh(e) {
  return e.getPaginatedRowModel().flatRows.filter((t) => Mt(t)).some((t) => Qs(t) || Y(t, "getIsSomeSelected", Mc));
}
function Th(e) {
  return (t) => {
    _c(e, t.target.checked);
  };
}
function Fh(e) {
  return (t) => {
    Sc(e, t.target.checked);
  };
}
function Ic(e, t, n) {
  const r = Qs(e);
  bn(e.table, (o) => {
    t = typeof t < "u" ? t : !r;
    const s = Object.assign(ee(), o);
    return Ro(s, e.id, t, ((n == null ? void 0 : n.selectChildren) ?? !0) && Gt(e), e.table), !t && (n != null && n.deselectParents) && Ec(s, e), s;
  });
}
function Qs(e) {
  var t;
  return cr(e, ((t = e.table.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function Mc(e) {
  return ni(e) === "some";
}
function Hh(e) {
  return ni(e) === "all";
}
function Mt(e) {
  const t = e.table.options;
  return typeof t.enableRowSelection == "function" ? t.enableRowSelection(e) : t.enableRowSelection ?? !0;
}
function ei(e) {
  const t = e.table.options;
  return typeof t.enableSubRowSelection == "function" ? t.enableSubRowSelection(e) : t.enableSubRowSelection ?? !0;
}
function Gt(e) {
  const t = e.table.options;
  return typeof t.enableMultiRowSelection == "function" ? t.enableMultiRowSelection(e) : t.enableMultiRowSelection ?? !0;
}
function Lh(e, t) {
  const n = Mt(e);
  return (r) => {
    var c, f;
    if (!n) return;
    const o = r, s = e.table, i = o.target.checked, a = s._lastSelectedRowId;
    (!(s.options.enableRowRangeSelection !== !1 && a !== null && Gt(e) && (((f = (c = s.options).isRowRangeSelectionEvent) == null ? void 0 : f.call(c, r)) ?? !1)) || !jh(e, a, i, t)) && Ic(e, i, t), s._lastSelectedRowId = e.id;
  };
}
function jh(e, t, n, r) {
  const o = (r == null ? void 0 : r.selectChildren) ?? !0, s = e.table, i = s.getRowsInDisplayOrder(), a = s.getPrePaginatedRowModel().rowsById[t] ?? s.getCoreRowModel().rowsById[t];
  if (!a) return !1;
  const c = a.getDisplayIndex(), f = e.getDisplayIndex(), d = i[c], h = i[f];
  if (c < 0 || f < 0 || c >= i.length || f >= i.length || (d == null ? void 0 : d.id) !== a.id || (h == null ? void 0 : h.id) !== e.id || !Gt(a) || !Gt(e)) return !1;
  const w = Math.min(c, f), y = Math.max(c, f);
  return bn(s, (M) => {
    const E = Object.assign(ee(), M);
    for (let A = w; A <= y; A++) {
      const z = i[A];
      !Mt(z) || !Gt(z) || (Ro(E, z.id, n, o, s), !n && (r != null && r.deselectParents) && Ec(E, z));
    }
    return E;
  }), !0;
}
function Ro(e, t, n, r, o, s) {
  const i = o.getRow(t, !0);
  n ? (Gt(i) || Object.keys(e).forEach((a) => delete e[a]), Mt(i) && (e[t] = !0)) : (!s || Mt(i)) && delete e[t], r && i.subRows.length && ei(i) && i.subRows.forEach((a) => Ro(e, a.id, n, r, o, s));
}
function to(e, t) {
  if (!Mt(e)) return !1;
  const n = e.table;
  if (n.options.enableSubRowSelection === !0) return !0;
  const r = e.parentId;
  if (r === void 0) return !0;
  const o = t.get(r);
  if (o !== void 0) return o;
  const s = n.getCoreRowModel().rowsById, i = [];
  let a = !0, c = r;
  for (; c !== void 0; ) {
    const f = t.get(c);
    if (f !== void 0) {
      a = f;
      break;
    }
    i.push(c);
    const d = s[c] ?? n.getRow(c, !0);
    if (!ei(d)) {
      a = !1;
      break;
    }
    c = d.parentId;
  }
  return i.forEach((f) => t.set(f, a)), a;
}
function Ec(e, t) {
  const n = t.table.getCoreRowModel().rowsById;
  let r = t.parentId;
  for (; r !== void 0; )
    delete e[r], r = (n[r] ?? t.table.getRow(r, !0)).parentId;
}
function Ac(e, t, n, r) {
  const o = [];
  for (let s = 0; s < e.length; s++) {
    const i = e[s], a = cr(i, t);
    if (a && (n.push(i), r[i.id] = i), i.subRows.length) {
      const c = Ac(i.subRows, t, n, r);
      if (a) {
        const f = Object.create(Object.getPrototypeOf(i));
        za(f, i), f.subRows = c, o.push(f);
      }
    } else a && o.push(i);
  }
  return o;
}
function ti(e, t) {
  var s;
  const n = [], r = ee(), o = ((s = t.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  return {
    rows: Ac(e.rows, o, n, r),
    flatRows: n,
    rowsById: r
  };
}
function cr(e, t) {
  return !!(Jt(t, e.id) && t[e.id]);
}
function ni(e) {
  var s;
  if (!e.subRows.length) return !1;
  const t = ((s = e.table.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  let n = !1, r = !0, o = !1;
  for (let i = 0; i < e.subRows.length; i++) {
    const a = e.subRows[i];
    if (n && !r) break;
    if (Mt(a) && (o = !0, cr(a, t) ? n = !0 : r = !1), a.subRows.length) {
      const c = ni(a);
      c === "all" ? (n = !0, o = !0) : c === "some" ? (n = !0, r = !1, o = !0) : r = !1;
    }
  }
  return o ? r ? "all" : n ? "some" : !1 : !1;
}
const zh = {
  initTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  resetTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  getInitialState: (e) => ({
    rowSelection: Mh(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onRowSelectionChange: lr("rowSelection", e),
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
      row_toggleSelected: { fn: (n, r, o) => Ic(n, r, o) },
      row_getIsSelected: { fn: (n) => Qs(n) },
      row_getIsSomeSelected: {
        fn: (n) => Mc(n),
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
        fn: (n) => Hh(n),
        memoDeps: (n) => {
          var r;
          return [
            n.subRows,
            (r = n.table.atoms.rowSelection) == null ? void 0 : r.get(),
            n.table.options.enableRowSelection
          ];
        }
      },
      row_getCanSelect: { fn: (n) => Mt(n) },
      row_getCanSelectSubRows: { fn: (n) => ei(n) },
      row_getCanMultiSelect: { fn: (n) => Gt(n) },
      row_getToggleSelectedHandler: { fn: (n, r) => Lh(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    dt("rowSelectionFeature", e, {
      table_setRowSelection: { fn: (t) => bn(e, t) },
      table_resetRowSelection: { fn: (t) => Eh(e, t) },
      table_toggleAllRowsSelected: { fn: (t, n) => _c(e, t, n) },
      table_toggleAllPageRowsSelected: { fn: (t, n) => Sc(e, t, n) },
      table_getPreSelectedRowModel: { fn: () => Ah(e) },
      table_getSelectedRowModel: {
        fn: () => Oh(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getCoreRowModel()];
        }
      },
      table_getFilteredSelectedRowModel: {
        fn: () => Ph(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getFilteredRowModel()];
        }
      },
      table_getGroupedSelectedRowModel: {
        fn: () => Dh(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getSortedRowModel()];
        }
      },
      table_getSelectedRowIds: {
        fn: () => xc(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get()];
        }
      },
      table_getIsAllRowsSelected: {
        fn: () => Rc(e),
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
        fn: () => Cc(e),
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
        fn: () => xo(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get()];
        }
      },
      table_getIsSomePageRowsSelected: {
        fn: () => kh(e),
        memoDeps: () => {
          var t;
          return [
            (t = e.atoms.rowSelection) == null ? void 0 : t.get(),
            e.getPaginatedRowModel(),
            e.options.enableRowSelection
          ];
        }
      },
      table_getToggleAllRowsSelectedHandler: { fn: () => Th(e) },
      table_getToggleAllPageRowsSelectedHandler: { fn: () => Fh(e) }
    });
  }
}, Kh = {
  getInitialState(e) {
    return {
      sorting: bp(),
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
      onSortingChange: lr("sorting", e),
      isMultiSortEvent: (t) => t.shiftKey
    };
  },
  assignColumnPrototype(e, t) {
    et("rowSortingFeature", e, t, {
      column_getAutoSortFn: { fn: (n) => ic(n) },
      column_getAutoSortDir: { fn: (n) => lc(n) },
      column_getSortFn: { fn: (n) => ac(n) },
      column_toggleSorting: { fn: (n, r, o) => cc(n, r, o) },
      column_getFirstSortDir: { fn: (n) => uc(n) },
      column_getNextSortingOrder: { fn: (n, r) => fc(n, r) },
      column_getCanSort: { fn: (n) => Zs(n) },
      column_getCanMultiSort: { fn: (n) => eo(n) },
      column_getIsSorted: { fn: (n) => dc(n) },
      column_getSortIndex: { fn: (n) => Sp(n) },
      column_clearSorting: { fn: (n) => xp(n) },
      column_getToggleSortingHandler: { fn: (n) => Rp(n) }
    });
  },
  constructTableAPIs(e) {
    dt("rowSortingFeature", e, {
      table_setSorting: { fn: (t) => bo(e, t) },
      table_resetSorting: { fn: (t) => sc(e, t) }
    });
  }
};
function Vh() {
  return (e) => {
    const t = e;
    return ar({
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
      fn: () => Bh(t)
    });
  };
}
function Bh(e) {
  var r;
  const t = e.getPreExpandedRowModel(), n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return !t.rows.length || n !== !0 && !Object.keys(n ?? {}).length || !e.options.paginateExpandedRows && !e.options.manualPagination ? t : Nh(t);
}
function Nh(e) {
  const t = [], n = (r) => {
    t.push(r), r.subRows.length && yo(r) && r.subRows.forEach(n);
  };
  return e.rows.forEach(n), {
    rows: t,
    flatRows: e.flatRows,
    rowsById: e.rowsById
  };
}
function $h() {
  return (e) => {
    const t = e;
    return ar({
      feature: "rowSortingFeature",
      table: t,
      fnName: "table.getSortedRowModel",
      memoDeps: () => {
        var n;
        return [(n = t.atoms.sorting) == null ? void 0 : n.get(), t.getPreSortedRowModel()];
      },
      fn: () => Wh(t),
      onAfterUpdate: Va(() => oc(t))
    });
  };
}
function Wh(e) {
  var c;
  const t = e.getPreSortedRowModel(), n = (c = e.atoms.sorting) == null ? void 0 : c.get();
  if (!t.rows.length || !(n != null && n.length)) return t;
  const r = [], o = n.filter((f) => {
    const d = e.getColumn(f.id);
    return d ? Zs(d) : !1;
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
      sortFn: ac(h)
    });
  }
  const i = (f, d) => {
    for (let h = 0; h < s.length; h++) {
      const w = s[h], y = w.sortUndefined, M = w.desc;
      let E = 0;
      if (y) {
        const A = f.getValue(w.id), z = d.getValue(w.id), I = A === void 0, O = z === void 0;
        if (I && O) continue;
        if (I || O) {
          if (y === "first") return I ? -1 : 1;
          if (y === "last") return I ? 1 : -1;
          E = I ? y : -y;
        }
      }
      if (E === 0 && (E = w.sortFn(f, d, w.id)), E !== 0)
        return M && (E *= -1), w.invertSorting && (E *= -1), E;
    }
    return f.index - d.index;
  }, a = (f) => {
    const d = f.slice();
    d.sort(i);
    let h = !1;
    for (let w = 0; w < d.length; w++) {
      const y = d[w];
      y !== f[w] && (h = !0);
      const M = r.length;
      if (r.push(y), y.subRows.length) {
        const E = a(y.subRows);
        if (E.changed) {
          const A = Object.create(Object.getPrototypeOf(y));
          za(A, y), A.subRows = E.rows, d[w] = A, r[M] = A, h = !0;
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
function ul(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = Ut(e[n]);
  return Rs(e, t);
}
function Uh(e) {
  return Object.keys(e).map((t) => Ut(e[t]));
}
function qh(e) {
  const t = (a, c) => {
    a.setOptions((f) => ol(f, ul(c)));
  }, n = fg(), r = Rs(e, { features: {
    coreReactivityFeature: n,
    ...Ut(e.features) ?? {}
  } }), o = Rs(ul(r), { mergeOptions: (a, c) => ol(a, c) }), s = uh(o), i = s;
  return Kl() && Yu(() => {
    var a;
    return (a = n.unmount) == null ? void 0 : a.call(n);
  }), ye(() => Uh(r), () => {
    t(s, r);
  }, { immediate: !0 }), ye(() => {
    const a = Ut(e.state), c = Ut(e.atoms);
    if (!a) return [];
    const f = [];
    for (const d of Object.keys(i.initialState))
      !(d in a) || (c == null ? void 0 : c[d]) !== void 0 || f.push(a[d]);
    return f;
  }, (a) => {
    a.length > 0 && t(s, r);
  }, { immediate: !0 }), i.Subscribe = (a) => a.children(i.atoms), i;
}
function nr(e) {
  "@babel/helpers - typeof";
  return nr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, nr(e);
}
function Gh(e, t) {
  if (nr(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (nr(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Xh(e) {
  var t = Gh(e, "string");
  return nr(t) == "symbol" ? t : t + "";
}
function ur(e, t, n) {
  return (t = Xh(t)) in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function Yh(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
    if (t.indexOf(r) !== -1) continue;
    n[r] = e[r];
  }
  return n;
}
function Zh(e, t) {
  if (e == null) return {};
  var n, r, o = Yh(e, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    for (r = 0; r < s.length; r++) n = s[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (o[n] = e[n]);
  }
  return o;
}
function Oc(e, t) {
  var n = Object.keys(e), r = Object.keys(t);
  return n.length !== r.length ? !1 : n.every(function(o) {
    return Object.is(e[o], t[o]);
  });
}
function Jh() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Oc, t = null;
  return function(n) {
    return t && e(t.value, n) || (t = {
      value: n
    }), t.value;
  };
}
var Qh = ["block"];
function fl(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function dl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? fl(Object(n), !0).forEach(function(r) {
      ur(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : fl(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function em(e) {
  return {
    x: (e.right + e.left) / 2,
    y: (e.bottom + e.top) / 2
  };
}
function os(e) {
  var t = e.client, n = e.borderBox, r = n.height / 4;
  return t.y <= n.top + r ? "reorder-above" : t.y >= n.bottom - r ? "reorder-below" : "make-child";
}
function tm(e) {
  var t = e.element, n = e.input, r = e.currentLevel, o = e.indentPerLevel, s = e.mode, i = {
    x: n.clientX,
    y: n.clientY
  }, a = t.getBoundingClientRect();
  if (s === "standard") {
    var c = os({
      borderBox: a,
      client: i
    });
    return {
      type: c,
      indentPerLevel: o,
      currentLevel: r
    };
  }
  var f = em(a);
  if (s === "expanded") {
    var d = os({
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
    type: os({
      borderBox: a,
      client: i
    }),
    indentPerLevel: o,
    currentLevel: r
  };
}
function Pc(e, t) {
  return e.type !== t.type ? !1 : e.type === "instruction-blocked" && t.type === "instruction-blocked" ? Pc(e.desired, t.desired) : Oc(e, t);
}
var nm = Jh(Pc);
function rm(e) {
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
function om(e, t) {
  var n = t.block, r = Zh(t, Qh), o = tm(r), s = rm({
    desired: o,
    block: n
  }), i = nm(s);
  return dl(dl({}, e), {}, ur({}, Dc, i));
}
function gl(e) {
  var t;
  return (t = e[Dc]) !== null && t !== void 0 ? t : null;
}
var Dc = Symbol("tree-item-instruction");
function Co() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return function() {
    t.forEach(function(o) {
      return o();
    });
  };
}
function sm(e) {
  if (Array.isArray(e)) return e;
}
function im(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r, o, s, i, a = [], c = !0, f = !1;
    try {
      if (s = (n = n.call(e)).next, t !== 0) for (; !(c = (r = s.call(n)).done) && (a.push(r.value), a.length !== t); c = !0) ;
    } catch (d) {
      f = !0, o = d;
    } finally {
      try {
        if (!c && n.return != null && (i = n.return(), Object(i) !== i)) return;
      } finally {
        if (f) throw o;
      }
    }
    return a;
  }
}
function As(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function kc(e, t) {
  if (e) {
    if (typeof e == "string") return As(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? As(e, t) : void 0;
  }
}
function lm() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Tc(e, t) {
  return sm(e) || im(e, t) || kc(e, t) || lm();
}
var pl = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Yt = {}, fr = {};
Object.defineProperty(fr, "__esModule", { value: !0 });
fr.bind = void 0;
function am(e, t) {
  var n = t.type, r = t.listener, o = t.options;
  return e.addEventListener(n, r, o), function() {
    e.removeEventListener(n, r, o);
  };
}
fr.bind = am;
var Io = {}, dn = pl && pl.__assign || function() {
  return dn = Object.assign || function(e) {
    for (var t, n = 1, r = arguments.length; n < r; n++) {
      t = arguments[n];
      for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    }
    return e;
  }, dn.apply(this, arguments);
};
Object.defineProperty(Io, "__esModule", { value: !0 });
Io.bindAll = void 0;
var cm = fr;
function hl(e) {
  if (!(typeof e > "u"))
    return typeof e == "boolean" ? {
      capture: e
    } : e;
}
function um(e, t) {
  if (t == null)
    return e;
  var n = dn(dn({}, e), { options: dn(dn({}, hl(t)), hl(e.options)) });
  return n;
}
function fm(e, t, n) {
  var r = t.map(function(o) {
    var s = um(o, n);
    return (0, cm.bind)(e, s);
  });
  return function() {
    r.forEach(function(s) {
      return s();
    });
  };
}
Io.bindAll = fm;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.bindAll = e.bind = void 0;
  var t = fr;
  Object.defineProperty(e, "bind", { enumerable: !0, get: function() {
    return t.bind;
  } });
  var n = Io;
  Object.defineProperty(e, "bindAll", { enumerable: !0, get: function() {
    return n.bindAll;
  } });
})(Yt);
var Fc = "data-pdnd-honey-pot";
function Hc(e) {
  return e instanceof Element && e.hasAttribute(Fc);
}
function Lc(e) {
  var t = document.elementsFromPoint(e.x, e.y), n = Tc(t, 2), r = n[0], o = n[1];
  return r ? Hc(r) ? o ?? null : r : null;
}
var dm = 2147483647, gm = {
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
var ss = tn(function() {
  return typeof HTMLElement < "u" && typeof HTMLElement.prototype.showPopover == "function";
});
function ml(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function vl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ml(Object(n), !0).forEach(function(r) {
      ur(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ml(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
var rr = 2, wl = rr / 2;
function pm(e) {
  return {
    x: Math.floor(e.x),
    y: Math.floor(e.y)
  };
}
function hm(e) {
  return {
    x: e.x - wl,
    y: e.y - wl
  };
}
function mm(e) {
  return {
    x: Math.max(e.x, 0),
    y: Math.max(e.y, 0)
  };
}
function vm(e) {
  return {
    x: Math.min(e.x, window.innerWidth - rr),
    y: Math.min(e.y, window.innerHeight - rr)
  };
}
function yl(e) {
  var t = e.client, n = vm(mm(hm(pm(t))));
  return DOMRect.fromRect({
    x: n.x,
    y: n.y,
    width: rr,
    height: rr
  });
}
function bl(e) {
  var t = e.clientRect;
  return {
    left: "".concat(t.left, "px"),
    top: "".concat(t.top, "px"),
    width: "".concat(t.width, "px"),
    height: "".concat(t.height, "px")
  };
}
function wm(e) {
  var t = e.client, n = e.clientRect;
  return (
    // is within horizontal bounds
    t.x >= n.x && t.x <= n.x + n.width && // is within vertical bounds
    t.y >= n.y && t.y <= n.y + n.height
  );
}
function ym(e) {
  var t = e.initial, n = document.createElement("div");
  n.setAttribute(Fc, "true"), ss() && n.setAttribute("popover", "manual");
  var r = yl({
    client: t
  });
  Object.assign(n.style, vl(vl({
    position: "fixed"
  }, ss() ? (
    // needs to come first as it has 'inset: unset' which
    // needs to be overridden by our top / left values
    gm
  ) : {
    // Fallback: using maximum possible z-index so that this element
    // will always be on top of other positioned content.
    zIndex: dm
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
  }, bl({
    clientRect: r
  }))), document.body.appendChild(n), ss() && n.showPopover();
  var o = Yt.bind(window, {
    type: "pointermove",
    listener: function(i) {
      var a = {
        x: i.clientX,
        y: i.clientY
      };
      r = yl({
        client: a
      }), Object.assign(n.style, bl({
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
    if (o(), wm({
      client: a,
      clientRect: r
    })) {
      n.remove();
      return;
    }
    function c() {
      f(), n.remove();
    }
    var f = Yt.bindAll(window, [
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
function bm() {
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
        var c = a.location.initial.input, f = e ?? {
          x: c.clientX,
          y: c.clientY
        };
        r = ym({
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
function _m(e) {
  if (Array.isArray(e)) return As(e);
}
function Sm(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function xm() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function jc(e) {
  return _m(e) || Sm(e) || kc(e) || xm();
}
var Rm = tn(function() {
  return navigator.userAgent.includes("Firefox");
}), ri = tn(function() {
  var t = navigator, n = t.userAgent;
  return n.includes("AppleWebKit") && !n.includes("Chrome");
});
function Cm(e) {
  return "nodeName" in e;
}
function Im(e) {
  return Cm(e) && e.ownerDocument !== document;
}
var Os = {
  isLeavingWindow: Symbol("leaving"),
  isEnteringWindow: Symbol("entering")
};
(function() {
  if (typeof window > "u" || !ri())
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
        !n.isOverWindow && n.enterCount === 0 && (s[Os.isEnteringWindow] = !0), n.isOverWindow = !0, n.enterCount++;
      }
    }, {
      type: "dragleave",
      listener: function(s) {
        n.enterCount--, n.isOverWindow && n.enterCount === 0 && (s[Os.isLeavingWindow] = !0, n.isOverWindow = !1);
      }
    }],
    // using `capture: true` so that adding event listeners
    // in bubble phase will have the correct symbols
    {
      capture: !0
    }
  );
})();
function Mm(e) {
  var t = e.dragLeave;
  return ri() ? t.hasOwnProperty(Os.isLeavingWindow) : !1;
}
function Em(e) {
  var t = e.dragLeave, n = t.type, r = t.relatedTarget;
  return n !== "dragleave" ? !1 : ri() ? Mm({
    dragLeave: t
  }) : r == null ? !0 : Rm() ? Im(r) : r instanceof HTMLIFrameElement;
}
function Am(e) {
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
function Gn(e) {
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
var Om = function(t) {
  var n = [], r = null, o = function() {
    for (var i = arguments.length, a = new Array(i), c = 0; c < i; c++)
      a[c] = arguments[c];
    n = a, !r && (r = requestAnimationFrame(function() {
      r = null, t.apply(void 0, n);
    }));
  };
  return o.cancel = function() {
    r && (cancelAnimationFrame(r), r = null);
  }, o;
}, is = Om(function(e) {
  return e();
}), zr = /* @__PURE__ */ function() {
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
function Pm(e) {
  var t = e.source, n = e.initial, r = e.dispatchEvent, o = {
    dropTargets: []
  };
  function s(a) {
    r(a), o = {
      dropTargets: a.payload.location.current.dropTargets
    };
  }
  var i = {
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
      }), zr.schedule(function() {
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
      zr.flush(), is.cancel(), s({
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
      is(function() {
        zr.flush();
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
      zr.flush(), is.cancel(), s({
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
var Ps = {
  isActive: !1
};
function zc() {
  return !Ps.isActive;
}
function Dm(e) {
  return e.dataTransfer ? e.dataTransfer.setDragImage.bind(e.dataTransfer) : null;
}
function km(e) {
  var t = e.current, n = e.next;
  if (t.length !== n.length)
    return !0;
  for (var r = 0; r < t.length; r++)
    if (t[r].element !== n[r].element)
      return !0;
  return !1;
}
function Tm(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = e.dispatchEvent;
  if (!zc())
    return;
  var s = Fm({
    event: t,
    dragType: n,
    getDropTargetsOver: r
  });
  Ps.isActive = !0;
  var i = {
    current: s
  };
  ls({
    event: t,
    current: s.dropTargets
  });
  var a = Pm({
    source: n.payload,
    dispatchEvent: o,
    initial: s
  });
  function c(y) {
    var M = km({
      current: i.current.dropTargets,
      next: y.dropTargets
    });
    i.current = y, M && a.dragUpdate({
      current: i.current
    });
  }
  function f(y) {
    var M = Gn(y), E = Hc(y.target) ? Lc({
      x: M.clientX,
      y: M.clientY
    }) : y.target, A = r({
      target: E,
      input: M,
      source: n.payload,
      current: i.current.dropTargets
    });
    A.length && (y.preventDefault(), ls({
      event: y,
      current: A
    })), c({
      dropTargets: A,
      input: M
    });
  }
  function d() {
    i.current.dropTargets.length && c({
      dropTargets: [],
      input: i.current.input
    }), a.drop({
      current: i.current,
      updatedSourcePayload: null
    }), h();
  }
  function h() {
    Ps.isActive = !1, w();
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
      listener: function(M) {
        f(M), a.drag({
          current: i.current
        });
      }
    }, {
      type: "dragenter",
      listener: f
    }, {
      type: "dragleave",
      listener: function(M) {
        Em({
          dragLeave: M
        }) && (c({
          input: i.current.input,
          dropTargets: []
        }), n.startedFrom === "external" && d());
      }
    }, {
      // A "drop" can only happen if the browser allowed the drop
      type: "drop",
      listener: function(M) {
        if (i.current = {
          dropTargets: i.current.dropTargets,
          input: Gn(M)
        }, !i.current.dropTargets.length) {
          d();
          return;
        }
        M.preventDefault(), ls({
          event: M,
          current: i.current.dropTargets
        }), a.drop({
          current: i.current,
          // When dropping something native, we need to extract the latest
          // `.items` from the "drop" event as it is now accessible
          updatedSourcePayload: n.type === "external" ? n.getDropPayload(M) : null
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
      listener: function(M) {
        i.current = {
          dropTargets: i.current.dropTargets,
          input: Gn(M)
        }, d();
      }
    }].concat(jc(Am({
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
    nativeSetDragImage: Dm(t)
  });
}
function ls(e) {
  var t, n = e.event, r = e.current, o = (t = r[0]) === null || t === void 0 ? void 0 : t.dropEffect;
  o != null && n.dataTransfer && (n.dataTransfer.dropEffect = o);
}
function Fm(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = Gn(t);
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
var _l = {
  canStart: zc,
  start: Tm
}, Ds = /* @__PURE__ */ new Map();
function Hm(e) {
  var t = e.typeKey, n = e.mount, r = Ds.get(t);
  if (r)
    return r.usageCount++, r;
  var o = {
    typeKey: t,
    unmount: n(),
    usageCount: 1
  };
  return Ds.set(t, o), o;
}
function Lm(e) {
  var t = Hm(e);
  return function() {
    t.usageCount--, !(t.usageCount > 0) && (t.unmount(), Ds.delete(e.typeKey));
  };
}
function Kc(e, t) {
  var n = t.attribute, r = t.value;
  return e.setAttribute(n, r), function() {
    return e.removeAttribute(n);
  };
}
function Sl(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Pt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Sl(Object(n), !0).forEach(function(r) {
      ur(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Sl(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function as(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = jm(e)) || t) {
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
function jm(e, t) {
  if (e) {
    if (typeof e == "string") return xl(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? xl(e, t) : void 0;
  }
}
function xl(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function cs(e) {
  return e.slice(0).reverse();
}
function zm(e) {
  var t = e.typeKey, n = e.defaultDropEffect, r = /* @__PURE__ */ new WeakMap(), o = "data-drop-target-for-".concat(t), s = "[".concat(o, "]");
  function i(y) {
    return r.set(y.element, y), function() {
      return r.delete(y.element);
    };
  }
  function a(y) {
    var M = Co(Kc(y.element, {
      attribute: o,
      value: "true"
    }), i(y));
    return tn(M);
  }
  function c(y) {
    var M, E, A, z, I = y.source, O = y.target, _ = y.input, D = y.result, j = D === void 0 ? [] : D;
    if (O == null)
      return j;
    if (!(O instanceof Element))
      return O instanceof Node ? c({
        source: I,
        target: O.parentElement,
        input: _,
        result: j
      }) : j;
    var W = O.closest(s);
    if (W == null)
      return j;
    var K = r.get(W);
    if (K == null)
      return j;
    var L = {
      input: _,
      source: I,
      element: K.element
    };
    if (K.canDrop && !K.canDrop(L))
      return c({
        source: I,
        target: K.element.parentElement,
        input: _,
        result: j
      });
    var Q = (M = (E = K.getData) === null || E === void 0 ? void 0 : E.call(K, L)) !== null && M !== void 0 ? M : {}, le = (A = (z = K.getDropEffect) === null || z === void 0 ? void 0 : z.call(K, L)) !== null && A !== void 0 ? A : n, te = {
      data: Q,
      element: K.element,
      dropEffect: le,
      // we are collecting _actual_ drop targets, so these are
      // being applied _not_ due to stickiness
      isActiveDueToStickiness: !1
    };
    return c({
      source: I,
      target: K.element.parentElement,
      input: _,
      // Using bubble ordering. Same ordering as `event.getPath()`
      result: [].concat(jc(j), [te])
    });
  }
  function f(y) {
    var M = y.eventName, E = y.payload, A = as(E.location.current.dropTargets), z;
    try {
      for (A.s(); !(z = A.n()).done; ) {
        var I, O = z.value, _ = r.get(O.element), D = Pt(Pt({}, E), {}, {
          self: O
        });
        _ == null || (I = _[M]) === null || I === void 0 || I.call(
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
    onDropTargetChange: function(M) {
      var E = M.payload, A = new Set(E.location.current.dropTargets.map(function(Z) {
        return Z.element;
      })), z = /* @__PURE__ */ new Set(), I = as(E.location.previous.dropTargets), O;
      try {
        for (I.s(); !(O = I.n()).done; ) {
          var _, D = O.value;
          z.add(D.element);
          var j = r.get(D.element), W = A.has(D.element), K = Pt(Pt({}, E), {}, {
            self: D
          });
          if (j == null || (_ = j.onDropTargetChange) === null || _ === void 0 || _.call(j, K), !W) {
            var L;
            j == null || (L = j.onDragLeave) === null || L === void 0 || L.call(j, K);
          }
        }
      } catch (Z) {
        I.e(Z);
      } finally {
        I.f();
      }
      var Q = as(E.location.current.dropTargets), le;
      try {
        for (Q.s(); !(le = Q.n()).done; ) {
          var te, he, Re = le.value;
          if (!z.has(Re.element)) {
            var we = Pt(Pt({}, E), {}, {
              self: Re
            }), q = r.get(Re.element);
            q == null || (te = q.onDropTargetChange) === null || te === void 0 || te.call(q, we), q == null || (he = q.onDragEnter) === null || he === void 0 || he.call(q, we);
          }
        }
      } catch (Z) {
        Q.e(Z);
      } finally {
        Q.f();
      }
    }
  };
  function h(y) {
    d[y.eventName](y);
  }
  function w(y) {
    var M = y.source, E = y.target, A = y.input, z = y.current, I = c({
      source: M,
      target: E,
      input: A
    });
    if (I.length >= z.length)
      return I;
    for (var O = cs(z), _ = cs(I), D = [], j = 0; j < O.length; j++) {
      var W, K = O[j], L = _[j];
      if (L != null) {
        D.push(L);
        continue;
      }
      var Q = D[j - 1], le = O[j - 1];
      if ((Q == null ? void 0 : Q.element) !== (le == null ? void 0 : le.element))
        break;
      var te = r.get(K.element);
      if (!te)
        break;
      var he = {
        input: A,
        source: M,
        element: te.element
      };
      if (te.canDrop && !te.canDrop(he) || !((W = te.getIsSticky) !== null && W !== void 0 && W.call(te, he)))
        break;
      D.push(Pt(Pt({}, K), {}, {
        // making it clear to consumers this drop target is active due to stickiness
        isActiveDueToStickiness: !0
      }));
    }
    return cs(D);
  }
  return {
    dropTargetForConsumers: a,
    getIsOver: w,
    dispatchEvent: h
  };
}
function Km(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = Vm(e)) || t) {
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
function Vm(e, t) {
  if (e) {
    if (typeof e == "string") return Rl(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Rl(e, t) : void 0;
  }
}
function Rl(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
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
function Bm(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Cl(Object(n), !0).forEach(function(r) {
      ur(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Cl(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Nm() {
  var e = /* @__PURE__ */ new Set(), t = null;
  function n(s) {
    t && (!s.canMonitor || s.canMonitor(t.canMonitorArgs)) && t.active.add(s);
  }
  function r(s) {
    var i = Bm({}, s);
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
      var c = Km(e), f;
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
        var M = y[w];
        if (t.active.has(M)) {
          var E;
          (E = M[i]) === null || E === void 0 || E.call(M, a);
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
function $m(e) {
  var t = e.typeKey, n = e.mount, r = e.dispatchEventToSource, o = e.onPostDispatch, s = e.defaultDropEffect, i = Nm(), a = zm({
    typeKey: t,
    defaultDropEffect: s
  });
  function c(h) {
    r == null || r(h), a.dispatchEvent(h), i.dispatchEvent(h), o == null || o(h);
  }
  function f(h) {
    var w = h.event, y = h.dragType;
    _l.start({
      event: w,
      dragType: y,
      getDropTargetsOver: a.getIsOver,
      dispatchEvent: c
    });
  }
  function d() {
    function h() {
      var w = {
        canStart: _l.canStart,
        start: f
      };
      return n(w);
    }
    return Lm({
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
var Wm = tn(function() {
  return navigator.userAgent.toLocaleLowerCase().includes("android");
}), Um = "pdnd:android-fallback", Il = "text/plain", qm = "text/uri-list", Gm = "application/vnd.pdnd", no = /* @__PURE__ */ new WeakMap();
function Xm(e) {
  return no.set(e.element, e), function() {
    no.delete(e.element);
  };
}
var Ml = bm(), Vc = $m({
  typeKey: "element",
  defaultDropEffect: "move",
  mount: function(t) {
    return Co(Ml.bindEvents(), Yt.bind(document, {
      type: "dragstart",
      listener: function(r) {
        var o, s, i, a, c, f;
        if (t.canStart(r) && !r.defaultPrevented && r.dataTransfer) {
          var d = r.target;
          if (d instanceof HTMLElement) {
            var h = no.get(d);
            if (h) {
              var w = Gn(r), y = {
                element: h.element,
                dragHandle: (o = h.dragHandle) !== null && o !== void 0 ? o : null,
                input: w
              };
              if (h.canDrag && !h.canDrag(y)) {
                r.preventDefault();
                return;
              }
              if (h.dragHandle) {
                var M = Lc({
                  x: w.clientX,
                  y: w.clientY
                });
                if (!h.dragHandle.contains(M)) {
                  r.preventDefault();
                  return;
                }
              }
              var E = (s = (i = h.getInitialDataForExternal) === null || i === void 0 ? void 0 : i.call(h, y)) !== null && s !== void 0 ? s : null;
              if (E)
                for (var A = 0, z = Object.entries(E); A < z.length; A++) {
                  var I = Tc(z[A], 2), O = I[0], _ = I[1];
                  r.dataTransfer.setData(O, _ ?? "");
                }
              Wm() && !r.dataTransfer.types.includes(Il) && !r.dataTransfer.types.includes(qm) && r.dataTransfer.setData(Il, Um), r.dataTransfer.setData(Gm, "");
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
    (n = no.get(s.source.element)) === null || n === void 0 || (r = n[o]) === null || r === void 0 || r.call(
      n,
      // I cannot seem to get the types right here.
      // TS doesn't seem to like that one event can need `nativeSetDragImage`
      // @ts-expect-error
      s
    );
  },
  onPostDispatch: Ml.getOnPostDispatch()
}), Ym = Vc.dropTarget;
function Zm(e) {
  var t = Co(
    // making the draggable register the adapter rather than drop targets
    // this is because you *must* have a draggable element to start a drag
    // but you _might_ not have any drop targets immediately
    // (You might create drop targets async)
    Vc.registerUsage(),
    Xm(e),
    Kc(e.element, {
      attribute: "draggable",
      value: "true"
    })
  );
  return tn(t);
}
const us = /* @__PURE__ */ new Map(), mn = "pnl-tst-row";
function Jm(e, t) {
  return Co(
    Zm({
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
        return { type: mn, group: "", sourceId: "", key: null, keys: [] };
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
    Ym({
      element: e,
      // Position is deliberately not consulted here. pdnd settles `canDrop` when
      // the pointer enters the element, and the element is the whole layout, so an
      // answer given from the pointer's first position would stand for the rest of
      // the drag. Which pane the pointer is over, and whether that pane accepts
      // the drag at all, is decided in `getData`, which runs on every move.
      canDrop: ({ source: n }) => n.data.type === mn,
      getData: ({ input: n, source: r }) => {
        for (const o of t.panes) {
          const s = o.dropData(n, r.data);
          if (s) return s;
        }
        return { type: mn, key: null, paneId: "" };
      },
      onDrag: ({ self: n }) => {
        const r = n.data.key, o = gl(n.data);
        for (const s of t.panes)
          s.id() === n.data.paneId && r && o ? s.showDrop(r, o) : s.clearDrop();
      },
      onDragLeave: () => {
        for (const n of t.panes) n.clearDrop();
      },
      onDrop: ({ self: n, source: r, location: o }) => {
        for (const c of t.panes) c.clearDrop();
        const s = t.panes.find((c) => c.id() === n.data.paneId), i = n.data.key, a = gl(n.data);
        !s || !i || !a || a.type === "instruction-blocked" || s.drop(r.data, i, a, o.current.input);
      }
    })
  );
}
function Qm(e, t) {
  let n = us.get(e);
  return n || (n = { panes: [] }, n.cleanup = Jm(e, n), us.set(e, n)), n.panes.push(t), () => {
    var r;
    n.panes = n.panes.filter((o) => o !== t), !(n.panes.length > 0) && ((r = n.cleanup) == null || r.call(n), us.delete(e));
  };
}
const ev = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ef5350" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m6 10h-4v8a4 4 0 1 1-4-4 3.96 3.96 0 0 1 2 .555V8h6Z"/></svg>', tv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#ff7043" d="M2 2a1 1 0 0 0-1 1v10c0 .554.446 1 1 1h12c.554 0 1-.446 1-1V3a1 1 0 0 0-1-1zm0 3h12v8H2zm1 2 2 2-2 2 1 1 3-3-3-3zm5 3.5V12h5v-1.5z"/></svg>', nv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#7e57c2" d="M20 18h-2v-2h-2v2c0 .193 0 .703 1.254 1.033A3.345 3.345 0 0 1 20 22h2v2h2v-2c0-.388-.562-.851-1.254-1.034C20.356 20.34 20 18.84 20 18m-3.254 2.966C14.356 20.34 14 18.84 14 18h-2v-2h-2v8h2v-2h4v2h2v-2c0-.388-.562-.851-1.254-1.034"/><path fill="#7e57c2" d="M24 4H4v20a4 4 0 0 0 4 4h16.16A3.84 3.84 0 0 0 28 24.16V8a4 4 0 0 0-4-4m2 14h-2v-2h-2v2c0 .193 0 .703 1.254 1.033A3.345 3.345 0 0 1 26 22v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1 2-2h2a2 2 0 0 1 2 2Z"/></svg>', rv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ffca28" d="M16 24c-5.525 0-10-.9-10-2v4c0 1.1 4.475 2 10 2s10-.9 10-2v-4c0 1.1-4.475 2-10 2m0-8c-5.525 0-10-.9-10-2v4c0 1.1 4.475 2 10 2s10-.9 10-2v-4c0 1.1-4.475 2-10 2m0-12C10.477 4 6 4.895 6 6v4c0 1.1 4.475 2 10 2s10-.9 10-2V6c0-1.105-4.477-2-10-2"/></svg>', ov = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/><path fill="#42a5f5" d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5z"/></svg>', sv = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m8.668 6h3.6641l-3.6641-3.668v3.668m-4.668-4.668h5.332l4 4v8c0 0.73828-0.59375 1.3359-1.332 1.3359h-8c-0.73828 0-1.332-0.59766-1.332-1.3359v-10.664c0-0.74219 0.59375-1.3359 1.332-1.3359m3.332 1.3359h-3.332v10.664h8v-6h-4.668z" fill="#90a4ae" /></svg>', iv = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m6.922 3.768-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232" fill="#90a4ae" /></svg>', lv = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.483 6H4.721a1 1 0 0 0-.949.684L2 12V5h12a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232l-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h11l2.403-5.606A1 1 0 0 0 14.483 6" fill="#90a4ae" /></svg>', av = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#e65100" d="m4 4 2 22 10 2 10-2 2-22Zm19.72 7H11.28l.29 3h11.86l-.802 9.335L15.99 25l-6.635-1.646L8.93 19h3.02l.19 2 3.86.77 3.84-.77.29-4H8.84L8 8h16Z"/></svg>', cv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#26a69a" d="M8.5 6h4l-4-4zM3.875 1H9.5l4 4v8.6c0 .773-.616 1.4-1.375 1.4h-8.25c-.76 0-1.375-.627-1.375-1.4V2.4c0-.777.612-1.4 1.375-1.4M4 13.6h8V8l-2.625 2.8L8 9.4zm1.25-7.7c-.76 0-1.375.627-1.375 1.4s.616 1.4 1.375 1.4c.76 0 1.375-.627 1.375-1.4S6.009 5.9 5.25 5.9"/></svg>', uv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#ffca28" d="M2 2v12h12V2zm6 6h1v4a1.003 1.003 0 0 1-1 1H7a1.003 1.003 0 0 1-1-1v-1h1v1h1zm3 0h2v1h-2v1h1a1.003 1.003 0 0 1 1 1v1a1.003 1.003 0 0 1-1 1h-2v-1h2v-1h-1a1.003 1.003 0 0 1-1-1V9a1.003 1.003 0 0 1 1-1"/></svg>', fv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path fill="#f9a825" d="M560-160v-80h120q17 0 28.5-11.5T720-280v-80q0-38 22-69t58-44v-14q-36-13-58-44t-22-69v-80q0-17-11.5-28.5T680-720H560v-80h120q50 0 85 35t35 85v80q0 17 11.5 28.5T840-560h40v160h-40q-17 0-28.5 11.5T800-360v80q0 50-35 85t-85 35zm-280 0q-50 0-85-35t-35-85v-80q0-17-11.5-28.5T120-400H80v-160h40q17 0 28.5-11.5T160-600v-80q0-50 35-85t85-35h120v80H280q-17 0-28.5 11.5T240-680v80q0 38-22 69t-58 44v14q36 13 58 44t22 69v80q0 17 11.5 28.5T280-240h120v80z"/></svg>', dv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#42a5f5" d="m14 10-4 3.5L6 10H4v12h4v-6l2 2 2-2v6h4V10zm12 6v-6h-4v6h-4l6 8 6-8z"/></svg>', gv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ef5350" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m4.93 10.44c.41.9.93 1.64 1.53 2.15l.41.32c-.87.16-2.07.44-3.34.93l-.11.04.5-1.04c.45-.87.78-1.66 1.01-2.4m6.48 3.81c.18-.18.27-.41.28-.66.03-.2-.02-.39-.12-.55-.29-.47-1.04-.69-2.28-.69l-1.29.07-.87-.58c-.63-.52-1.2-1.43-1.6-2.56l.04-.14c.33-1.33.64-2.94-.02-3.6a.85.85 0 0 0-.61-.24h-.24c-.37 0-.7.39-.79.77-.37 1.33-.15 2.06.22 3.27v.01c-.25.88-.57 1.9-1.08 2.93l-.96 1.8-.89.49c-1.2.75-1.77 1.59-1.88 2.12-.04.19-.02.36.05.54l.03.05.48.31.44.11c.81 0 1.73-.95 2.97-3.07l.18-.07c1.03-.33 2.31-.56 4.03-.75 1.03.51 2.24.74 3 .74.44 0 .74-.11.91-.3m-.41-.71.09.11c-.01.1-.04.11-.09.13h-.04l-.19.02c-.46 0-1.17-.19-1.9-.51.09-.1.13-.1.23-.1 1.4 0 1.8.25 1.9.35M7.83 17c-.65 1.19-1.24 1.85-1.69 2 .05-.38.5-1.04 1.21-1.69zm3.02-6.91c-.23-.9-.24-1.63-.07-2.05l.07-.12.15.05c.17.24.19.56.09 1.1l-.03.16-.16.82z"/></svg>', pv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#e64a19" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zM8 11v2h1v6H8v1h4v-1h-1v-2h2a3 3 0 0 0 3-3 3 3 0 0 0-3-3zm5 2a1 1 0 0 1 1 1 1 1 0 0 1-1 1h-2v-2z"/></svg>', hv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#0288d1" d="M9.86 2A2.86 2.86 0 0 0 7 4.86v1.68h4.29c.39 0 .71.57.71.96H4.86A2.86 2.86 0 0 0 2 10.36v3.781a2.86 2.86 0 0 0 2.86 2.86h1.18v-2.68a2.85 2.85 0 0 1 2.85-2.86h5.25c1.58 0 2.86-1.271 2.86-2.851V4.86A2.86 2.86 0 0 0 14.14 2zm-.72 1.61c.4 0 .72.12.72.71s-.32.891-.72.891c-.39 0-.71-.3-.71-.89s.32-.711.71-.711"/><path fill="#fdd835" d="M17.959 7v2.68a2.85 2.85 0 0 1-2.85 2.859H9.86A2.85 2.85 0 0 0 7 15.389v3.75a2.86 2.86 0 0 0 2.86 2.86h4.28A2.86 2.86 0 0 0 17 19.14v-1.68h-4.291c-.39 0-.709-.57-.709-.96h7.14A2.86 2.86 0 0 0 22 13.64V9.86A2.86 2.86 0 0 0 19.14 7zM8.32 11.513l-.004.004.038-.004zm6.54 7.276c.39 0 .71.3.71.89a.71.71 0 0 1-.71.71c-.4 0-.72-.12-.72-.71s.32-.89.72-.89"/></svg>', mv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#8bc34a" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zm4 7.5h-4v2h1l-2 1.67L10 13h1v-2H7v2h1l3 2.5L8 18H7v2h4v-2h-1l2-1.67L14 18h-1v2h4v-2h-1l-3-2.5 3-2.5h1z"/></svg>', vv = '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 16 16"><path fill="#0288d1" d="M2 2v12h12V2zm4 6h3v1H8v4H7V9H6zm5 0h2v1h-2v1h1a1.003 1.003 0 0 1 1 1v1a1.003 1.003 0 0 1-1 1h-2v-1h2v-1h-1a1.003 1.003 0 0 1-1-1V9a1.003 1.003 0 0 1 1-1"/></svg>', wv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ff9800" d="m24 6 2 6h-4l-2-6h-3l2 6h-4l-2-6h-3l2 6H8L6 6H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3V6Z"/></svg>', yv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#01579b" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zM7 13l1.5 7h2l1.5-3 1.5 3h2l1.5-7h1v-2h-4v2h1l-.9 4.2L13 15h-2l-1.1 2.2L9 13h1v-2H6v2z"/></svg>', bv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#8bc34a" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m.12 13.5 3.74 3.74 1.42-1.41-2.33-2.33 2.33-2.33-1.42-1.41zm11.16 0-3.74-3.74-1.42 1.41 2.33 2.33-2.33 2.33 1.42 1.41z"/></svg>', _v = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ff5252" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2m12 16v-2H9v2zm-4-4v-2H6v2z"/></svg>', Sv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#afb42b" d="M14 17h-2v-2h-2v-2h2v2h2m0-6h-2v2h2v2h-2v-2h-2V9h2V7h-2V5h2v2h2m5-4H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2"/></svg>', El = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Al = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, xv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Rv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Cv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Iv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Mv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Ev = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Av = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Ov = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Pv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Dv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, kv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Tv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Fv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Hv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Lv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, jv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, zv = ["aria-label"], Kv = {
  key: 0,
  class: "pnl-tst-tsep",
  "aria-hidden": "true"
}, Vv = {
  key: 1,
  class: "pnl-tst-search"
}, Bv = ["innerHTML"], Nv = ["value", "aria-label", "placeholder"], $v = ["aria-label", "aria-keyshortcuts", "aria-disabled", "title", "tabindex", "onClick", "onFocus"], Wv = ["innerHTML"], Uv = {
  key: 1,
  class: "pnl-tst-empty"
}, qv = ["aria-label", "aria-colcount", "aria-rowcount"], Gv = {
  key: 0,
  class: "pnl-tst-head",
  role: "rowgroup"
}, Xv = {
  class: "pnl-tst-hrow",
  role: "row",
  "aria-rowindex": 1
}, Yv = ["aria-colindex", "aria-sort", "aria-keyshortcuts", "tabindex", "onClick", "onFocus", "onKeydown"], Zv = { class: "pnl-tst-hlabel" }, Jv = ["innerHTML"], Qv = ["onDblclick", "onMousedown", "onTouchstart"], e0 = {
  class: "pnl-tst-body",
  role: "rowgroup"
}, t0 = ["aria-level", "aria-posinset", "aria-setsize", "aria-rowindex", "aria-expanded", "aria-selected", "aria-haspopup", "tabindex", "onClick", "onContextmenu", "onFocus"], n0 = ["aria-colindex"], r0 = ["onClick"], o0 = {
  key: 1,
  class: "pnl-tst-twisty pnl-tst-twisty--leaf",
  "aria-hidden": "true"
}, s0 = ["checked", ".indeterminate", "aria-label", "onClick"], i0 = ["innerHTML"], l0 = ["value", "aria-label", "onKeydown", "onBlur"], a0 = {
  key: 2,
  class: "pnl-tst-value"
}, c0 = {
  key: 3,
  class: "pnl-tst-modal"
}, u0 = {
  id: "pnl-tst-confirm-message",
  class: "pnl-tst-dialog-message"
}, f0 = { class: "pnl-tst-dialog-actions" }, d0 = ["aria-label"], g0 = {
  key: 0,
  class: "pnl-tst-msep",
  role: "separator"
}, p0 = ["aria-keyshortcuts", "aria-disabled", "tabindex", "onClick", "onFocus"], h0 = ["innerHTML"], m0 = { class: "pnl-tst-mlabel" }, v0 = {
  key: 0,
  class: "pnl-tst-mkeys",
  "aria-hidden": "true"
}, w0 = "title", Ol = 16, jn = "search", Dt = "|", un = 4, y0 = 500, b0 = {
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
      columnSizingFeature: Ch,
      columnResizingFeature: Rh,
      rowExpandingFeature: Ih,
      rowSelectionFeature: zh,
      rowSortingFeature: Kh,
      coreRowModel: gc(),
      expandedRowModel: Vh(),
      sortedRowModel: $h(),
      sortFns: { alphanumeric: rp, text: op }
    }, r = $(() => (t.state.columns || []).length > 0), o = $(() => r.value && t.state.options.sortable !== !1), s = $(() => t.state.options.sort_folders_first === !0), i = $(() => r.value && t.state.options.resizable !== !1), a = $(() => {
      const l = t.state.columns || [];
      return l.length === 0 ? [{ id: w0, header: "", accessorFn: (u) => u.title }] : l.map((u) => {
        const g = u.field ?? u.id;
        return {
          id: u.id,
          header: u.header ?? u.id,
          accessorFn: (v) => v[g],
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
    function c(l, u) {
      return typeof u == "number" && Number.isFinite(u) ? { [l]: u } : {};
    }
    function f(l, u) {
      const g = l == null ? void 0 : l[u];
      if (g !== void 0) return g;
      const v = (t.state.types || {})[l == null ? void 0 : l.type];
      return v && typeof v == "object" ? v[u] : void 0;
    }
    function d(l) {
      return l.subRows.length > 0 || f(l.original, "allow_children") !== !1;
    }
    function h(l, u, g) {
      const v = d(l);
      if (v !== d(u)) {
        const k = K.value.some((G) => G.id === g && G.desc);
        return (v ? -1 : 1) * (k ? -1 : 1);
      }
      return q.getColumn(g).getAutoSortFn()(l, u, g);
    }
    const w = /* @__PURE__ */ fe(y(t.state.expandedKeys));
    function y(l) {
      const u = {};
      for (const g of l || []) u[g] = !0;
      return u;
    }
    function M(l) {
      return l === !0 ? q.getCoreRowModel().flatRows.filter((u) => u.subRows.length > 0).map((u) => u.id).sort() : Object.keys(l).filter((u) => l[u]).sort();
    }
    const E = {
      audio: ev,
      console: tv,
      css: nv,
      database: rv,
      document: ov,
      file: sv,
      folder: iv,
      "folder-open": lv,
      html: av,
      image: cv,
      javascript: uv,
      json: fv,
      markdown: dv,
      pdf: gv,
      powerpoint: pv,
      python: hv,
      table: mv,
      typescript: vv,
      video: wv,
      word: yv,
      xml: bv,
      yaml: _v,
      zip: Sv
    };
    function A(l) {
      return l ? { ...E, ...t.state.icons || {} }[l] ?? null : null;
    }
    function z(l) {
      const u = f(l.original, "icon");
      return u ? (qe(l) ? A(`${u}-open`) : null) ?? A(u) : null;
    }
    function I(l, u) {
      return l.length !== u.length ? !1 : l.every((g, v) => g === u[v]);
    }
    const O = $(() => t.state.options.select_mode ?? "none"), _ = $(() => O.value !== "none"), D = $(() => O.value === "hierarchy"), j = $(
      () => _.value && t.state.options.show_checkboxes !== !1
    ), W = /* @__PURE__ */ fe(y(t.state.selectedKeys)), K = /* @__PURE__ */ fe(L(t.state.sorting));
    function L(l) {
      return (l || []).filter((u) => u && u.id).map((u) => ({ id: String(u.id), desc: u.desc === !0 }));
    }
    function Q(l, u) {
      return l.length === u.length && l.every((g, v) => g.id === u[v].id && g.desc === u[v].desc);
    }
    const le = $(() => o.value && K.value.length > 0), te = /* @__PURE__ */ fe(he(t.state.columnWidths));
    function he(l) {
      const u = {};
      for (const [g, v] of Object.entries(l || {})) {
        const k = Math.round(Number(v));
        Number.isFinite(k) && k > 0 && (u[g] = k);
      }
      return u;
    }
    function Re(l, u) {
      const g = Object.keys(l);
      return g.length === Object.keys(u).length && g.every((v) => l[v] === u[v]);
    }
    const we = /* @__PURE__ */ fe(null), q = qh({
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
        rowSelection: W.value,
        sorting: K.value,
        columnSizing: te.value
      })),
      onExpandedChange: (l) => {
        w.value = typeof l == "function" ? l(w.value) : l;
      },
      onRowSelectionChange: (l) => {
        W.value = typeof l == "function" ? l(W.value) : l;
      },
      onSortingChange: (l) => {
        K.value = L(typeof l == "function" ? l(K.value) : l);
      },
      onColumnSizingChange: (l) => {
        te.value = he(
          typeof l == "function" ? l(te.value) : l
        );
      }
    });
    function Z(l) {
      if (l.getIsSelected()) return "all";
      if (!D.value || l.subRows.length === 0) return "none";
      const u = l.subRows.map(Z);
      return u.every((g) => g === "all") ? "all" : u.some((g) => g !== "none") ? "some" : "none";
    }
    ye(() => M(W.value), t.setSelectedKeys, { flush: "post" }), ye(() => M(w.value), t.setExpandedKeys, { flush: "post" }), ye(
      () => t.state.expandedKeys,
      (l) => {
        I(M(w.value), [...l || []].sort()) || (w.value = y(l));
      }
    ), ye(
      () => t.state.selectedKeys,
      (l) => {
        I(M(W.value), [...l || []].sort()) || (W.value = y(l));
      }
    ), ye(() => K.value, t.setSorting, { flush: "post" }), ye(
      () => t.state.sorting,
      (l) => {
        const u = L(l);
        Q(K.value, u) || (K.value = u);
      }
    ), ye(
      () => [te.value, we.value],
      ([l, u]) => {
        u || t.setColumnWidths(l);
      },
      { flush: "post" }
    ), ye(
      () => t.state.columnWidths,
      (l) => {
        const u = he(l);
        Re(te.value, u) || (te.value = u);
      }
    ), ye(
      () => [t.state.options.expand_all, t.state.source],
      ([l]) => {
        l && q.toggleAllRowsExpanded(!0);
      },
      { immediate: !0 }
    );
    const ae = $(() => (t.state.filterText ?? "").trim().toLowerCase()), Ce = $(() => ae.value.length > 0), At = /* @__PURE__ */ fe(t.state.filterText ?? "");
    ye(
      () => t.state.filterText,
      (l) => {
        At.value = l ?? "";
      }
    );
    function gt(l) {
      At.value = l, t.setFilterText(l);
    }
    function Ke(l) {
      return l.getAllCells().some((u) => String(u.getValue() ?? "").toLowerCase().includes(ae.value));
    }
    const de = $(() => {
      if (!Ce.value) return q.getRowModel().rows;
      const l = q.getSortedRowModel().flatRows, u = /* @__PURE__ */ new Set();
      for (const g of l)
        if (Ke(g)) {
          u.add(g.id);
          for (let v = g.getParentRow(); v; v = v.getParentRow()) u.add(v.id);
        }
      return l.filter((g) => u.has(g.id));
    }), tt = $(() => {
      var l;
      return ((l = q.getHeaderGroups()[0]) == null ? void 0 : l.headers) ?? [];
    }), _n = $(() => t.state.options.indent_px ?? 16), jt = $(() => t.state.options.aria_label ?? "Tree table"), nn = $(() => Ce.value ? "No matches" : "No data"), Sn = $(() => r.value ? 2 : 1), dr = $(() => de.value.length + (r.value ? 1 : 0)), Ue = /* @__PURE__ */ fe(!1), xn = /* @__PURE__ */ fe(null), p = /* @__PURE__ */ new Map();
    function m(l, u) {
      u ? p.set(l, u) : p.delete(l);
    }
    const b = $(() => {
      const l = tt.value;
      return l.length === 0 ? null : l.some((g) => g.column.id === xn.value) ? xn.value : l[0].column.id;
    });
    function R(l) {
      const u = tt.value;
      if (u.length === 0) return;
      const g = u[Math.max(0, Math.min(l, u.length - 1))];
      Ue.value = !0, xn.value = g.column.id, je(() => {
        var v;
        return (v = p.get(g.column.id)) == null ? void 0 : v.focus();
      });
    }
    function C() {
      const l = tt.value;
      R(l.findIndex((u) => u.column.id === b.value));
    }
    function S() {
      Ue.value = !1, je(() => {
        var l;
        return (l = zt.get(Rn.value)) == null ? void 0 : l.focus();
      });
    }
    function F(l) {
      return o.value && l.column.getCanSort();
    }
    function T(l) {
      if (!F(l)) return;
      const u = l.column.getIsSorted();
      return u === "asc" ? "ascending" : u === "desc" ? "descending" : "none";
    }
    function P(l) {
      if (!F(l)) return null;
      const u = l.column.getIsSorted();
      return u ? u === "asc" ? Al : El : null;
    }
    function x(l) {
      F(l) && l.column.toggleSorting();
    }
    function B(l) {
      R(tt.value.indexOf(l)), x(l);
    }
    function H(l) {
      return i.value && l.column.getCanResize();
    }
    function V(l, u) {
      if (!H(l)) return;
      u.stopPropagation(), l.getResizeHandler()(u), we.value = l.column.id;
      const g = () => {
        we.value = null;
      };
      for (const v of ["mouseup", "touchend", "touchcancel"])
        document.addEventListener(v, g, { once: !0 });
    }
    function N(l, u) {
      if (!H(l)) return;
      const g = l.column, v = g.columnDef.minSize ?? 20, k = g.columnDef.maxSize ?? Number.MAX_SAFE_INTEGER, G = Math.min(Math.max(Math.round(g.getSize() + u), v), k);
      q.setColumnSizing((ve) => ({ ...ve, [g.id]: G }));
    }
    function J(l) {
      H(l) && l.column.resetSize();
    }
    function ce(l, u) {
      const g = tt.value, v = Math.max(
        0,
        g.findIndex((k) => k.column.id === b.value)
      );
      if (u.altKey) {
        switch (u.key) {
          case "ArrowLeft":
            N(l, -Ol);
            break;
          case "ArrowRight":
            N(l, Ol);
            break;
          case "Home":
            J(l);
            break;
          default:
            return;
        }
        u.preventDefault(), u.stopPropagation();
        return;
      }
      switch (u.key) {
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
      u.preventDefault(), u.stopPropagation();
    }
    const oe = $(() => {
      const l = /* @__PURE__ */ new Map();
      for (const u of de.value) {
        const g = u.parentId ?? "", v = l.get(g) ?? [];
        v.push(u.id), l.set(g, v);
      }
      return l;
    });
    function me(l) {
      return oe.value.get(l.parentId ?? "") ?? [];
    }
    function _e(l) {
      return me(l).indexOf(l.id) + 1;
    }
    function Ve(l) {
      return me(l).length;
    }
    function Ee(l) {
      return Ce.value ? (oe.value.get(l.id) ?? []).length > 0 : l.getCanExpand();
    }
    function qe(l) {
      return Ce.value ? Ee(l) : l.getIsExpanded();
    }
    const gr = $(() => {
      if (!r.value) return {};
      const l = { "--pnl-tst-total": `${q.getTotalSize()}px` };
      return tt.value.forEach((u, g) => {
        l[`--pnl-tst-w${g}`] = `${u.column.getSize()}px`;
      }), l;
    });
    function Ie(l) {
      return r.value ? l === 0 ? { flex: "1 0 var(--pnl-tst-w0)" } : { flex: `0 0 var(--pnl-tst-w${l})` } : { flex: "1 1 0" };
    }
    function Be(l) {
      return { ...Ie(0), paddingInlineStart: `${l.depth * _n.value}px` };
    }
    const pt = /* @__PURE__ */ fe(null), ht = /* @__PURE__ */ fe(!0), zt = /* @__PURE__ */ new Map();
    function Kt(l) {
      pt.value = l, ht.value = !0, Ue.value = !1;
    }
    function Bc(l, u) {
      u ? zt.set(l, u) : zt.delete(l);
    }
    const Rn = $(() => {
      const l = de.value;
      return l.length === 0 ? null : l.some((u) => u.id === pt.value) ? pt.value : l[0].id;
    });
    function Ne(l) {
      l != null && (Kt(l), je(() => {
        var u;
        return (u = zt.get(l)) == null ? void 0 : u.focus();
      }));
    }
    function pr(l) {
      const u = de.value;
      u.length !== 0 && Ne(u[Math.max(0, Math.min(l, u.length - 1))].id);
    }
    function oi(l, u) {
      const g = de.value;
      if (g.length === 0) return;
      const v = g[Math.max(0, Math.min(l, g.length - 1))], k = (u == null ? void 0 : u.shiftKey) && _.value && O.value !== "single";
      k && mt.value === null && (mt.value = Rn.value), Ne(v.id), k && si(v, !1);
    }
    function Nc(l) {
      const u = de.value;
      if (u.length === 0) return;
      const g = Math.max(
        0,
        u.findIndex((G) => G.id === Rn.value)
      ), v = u[g];
      if (l.ctrlKey || l.metaKey) {
        const G = {
          a: "select-all",
          c: "copy",
          f: jn,
          v: "paste",
          x: "cut",
          z: l.shiftKey ? "redo" : "undo"
        }[l.key.toLowerCase()];
        if (G && vr(G)) {
          l.preventDefault(), Ao(G);
          return;
        }
      }
      if (l.altKey) {
        const G = {
          ArrowUp: "move-up",
          ArrowDown: "move-down",
          ArrowLeft: "outdent",
          ArrowRight: "indent"
        }[l.key];
        if (G && vr(G)) {
          l.preventDefault(), Ao(G);
          return;
        }
      }
      if (Mr.value && (l.key === "ContextMenu" || l.key === "F10" && l.shiftKey)) {
        l.preventDefault(), _u(v);
        return;
      }
      const k = {
        Insert: l.shiftKey ? "new-file" : "new-folder",
        F2: "rename",
        Delete: "delete",
        Escape: "clear-selection"
      }[l.key];
      if (k && vr(k)) {
        l.preventDefault(), Ao(k);
        return;
      }
      switch (l.key) {
        case "ArrowDown":
          l.preventDefault(), oi(g + 1, l);
          break;
        case "ArrowUp":
          l.preventDefault(), g === 0 && r.value && !l.shiftKey ? C() : oi(g - 1, l);
          break;
        case "ArrowRight":
          if (l.preventDefault(), !Ee(v)) break;
          qe(v) ? pr(g + 1) : (v.toggleExpanded(!0), Ne(v.id));
          break;
        case "ArrowLeft":
          l.preventDefault(), !Ce.value && v.getCanExpand() && v.getIsExpanded() ? (v.toggleExpanded(!1), Ne(v.id)) : v.parentId && Ne(v.parentId);
          break;
        case "Home":
          l.preventDefault(), pr(0);
          break;
        case "End":
          l.preventDefault(), pr(u.length - 1);
          break;
        case "Enter":
          l.preventDefault(), t.emitEvent("activate", { key: v.id });
          break;
        case " ":
          if (!_.value) break;
          l.preventDefault(), ci(v);
          break;
      }
    }
    const mt = /* @__PURE__ */ fe(null);
    function hr(l) {
      mt.value = l.id, W.value = {}, l.toggleSelected(!0, { selectChildren: !1 });
    }
    function si(l, u) {
      const g = de.value, v = g.findIndex((Ae) => Ae.id === mt.value), k = g.findIndex((Ae) => Ae.id === l.id);
      if (k === -1) return;
      if (v === -1) {
        hr(l);
        return;
      }
      u || (W.value = {});
      const [G, ve] = v <= k ? [v, k] : [k, v];
      for (let Ae = G; Ae <= ve; Ae += 1)
        g[Ae].toggleSelected(!0, { selectChildren: !1 });
    }
    const $c = $(() => t.state.options.toggle_on_click === !0);
    function Wc(l) {
      const u = M(W.value);
      return u.length === 1 && u[0] === l.id;
    }
    function ii() {
      W.value = {}, mt.value = null, ht.value = !1;
    }
    function li() {
      M(W.value).length === 0 && (ht.value = !1);
    }
    ye(
      () => M(W.value).length > 0,
      (l) => {
        l && (ht.value = !0);
      }
    );
    function Uc(l, u) {
      Kt(l.id);
      const g = !!(u != null && u.shiftKey || u != null && u.ctrlKey || u != null && u.metaKey);
      _.value && !g && $c.value && Wc(l) ? ii() : _.value && O.value !== "single" ? u != null && u.shiftKey ? si(l, u.ctrlKey || u.metaKey) : u != null && u.ctrlKey || u != null && u.metaKey ? (mt.value = l.id, Xc(l)) : hr(l) : _.value && hr(l), t.emitEvent("activate", { key: l.id });
    }
    function qc(l) {
      Kt(l.id), !Ce.value && l.toggleExpanded();
    }
    function ai(l) {
      return Z(l) === "all";
    }
    function Gc(l) {
      return Z(l) === "some";
    }
    function Xc(l) {
      Kt(l.id), l.toggleSelected(void 0, { selectChildren: !1 }), li();
    }
    function ci(l) {
      Kt(l.id), l.toggleSelected(!ai(l), {
        selectChildren: D.value,
        deselectParents: D.value
      }), li();
    }
    function Yc(l) {
      ci(l), Ne(l.id);
    }
    const Mo = {
      "new-folder": { icon: Ev, label: "New folder", keys: "Insert", node: {} },
      "new-file": {
        icon: Mv,
        label: "New file",
        keys: "Shift+Insert",
        node: { allow_children: !1 }
      },
      rename: { icon: Pv, label: "Rename", keys: "F2" },
      delete: { icon: Lv, label: "Delete", keys: "Delete" },
      undo: { icon: jv, label: "Undo", keys: "Control+Z" },
      redo: { icon: Dv, label: "Redo", keys: "Control+Shift+Z" },
      cut: { icon: kv, label: "Cut", keys: "Control+X" },
      copy: { icon: Iv, label: "Copy", keys: "Control+C" },
      paste: { icon: Cv, label: "Paste", keys: "Control+V" },
      "move-up": { icon: Al, label: "Move up", keys: "Alt+ArrowUp" },
      "move-down": { icon: El, label: "Move down", keys: "Alt+ArrowDown" },
      outdent: { icon: Av, label: "Outdent", keys: "Alt+ArrowLeft" },
      indent: { icon: Ov, label: "Indent", keys: "Alt+ArrowRight" },
      "expand-all": { icon: xv, label: "Expand all" },
      "collapse-all": { icon: Rv, label: "Collapse all" },
      "select-all": { icon: Hv, label: "Select all", keys: "Control+A" },
      "clear-selection": { icon: Fv, label: "Clear selection", keys: "Escape" }
    }, Zc = [
      "undo",
      "redo",
      Dt,
      "new-folder",
      "new-file",
      "rename",
      "delete",
      Dt,
      "cut",
      "copy",
      "paste",
      Dt,
      "move-up",
      "move-down",
      "outdent",
      "indent",
      Dt,
      "expand-all",
      "collapse-all",
      Dt,
      "select-all",
      "clear-selection",
      jn
    ], Jc = [
      "new-folder",
      "new-file",
      Dt,
      "rename",
      "delete",
      Dt,
      "cut",
      "copy",
      "paste"
    ];
    function ui(l, u) {
      const g = l === !0 ? u : Array.isArray(l) ? l : [], v = [];
      return g.forEach((k, G) => {
        const ve = typeof k == "string" ? {} : k || {}, Ae = typeof k == "string" ? k : ve.id, Mi = `${Ae}#${G}`;
        if (Ae === Dt || Ae === jn) {
          v.push({ uid: Mi, id: Ae });
          return;
        }
        const Tn = Mo[Ae];
        if (!Tn) return;
        const Ei = ve.label ?? Tn.label;
        v.push({
          uid: Mi,
          id: Ae,
          label: Ei,
          icon: A(ve.icon) ?? Tn.icon,
          keys: Tn.keys,
          node: { title: Ei, ...Tn.node ?? {}, ...ve.node ?? {} }
        });
      }), v;
    }
    const mr = $(() => ui(t.state.options.toolbar, Zc)), Eo = $(
      () => ui(t.state.options.menu, Jc).filter((l) => l.id !== jn)
    ), Qc = $(() => mr.value.length > 0), eu = $(() => t.state.options.toolbar_label ?? "Tree actions"), fi = $(() => t.state.options.search_label ?? "Search");
    function di(l) {
      return mr.value.find((u) => u.id === l) ?? Eo.value.find((u) => u.id === l) ?? null;
    }
    function vr(l) {
      return di(l) !== null;
    }
    function Ao(l) {
      const u = di(l);
      u && To(u);
    }
    const He = $(() => de.value.find((l) => l.id === Rn.value) ?? null);
    function tu(l) {
      return de.value.filter((u) => (u.parentId ?? "") === (l.parentId ?? ""));
    }
    function gi() {
      const l = He.value;
      if (!l) return [];
      const u = xi(l), g = l.parentId ?? "";
      return u.every((k) => {
        var G;
        return (((G = Dn(k)) == null ? void 0 : G.parentId) ?? "") === g;
      }) ? u : [l.id];
    }
    function Oo() {
      const l = He.value;
      if (!l) return [];
      if (!_.value || !l.getIsSelected()) return [l.id];
      const u = de.value.filter((g) => g.getIsSelected()).map((g) => g.id);
      return u.length > 0 ? u : [l.id];
    }
    const Po = $(() => {
      var l;
      return ((l = t.state.clipboard) == null ? void 0 : l.keys) ?? [];
    }), nu = $(() => {
      var u;
      const l = new Set(((u = t.state.clipboard) == null ? void 0 : u.mode) === "cut" ? Po.value : []);
      return l.size === 0 || de.value.forEach((g) => {
        g.parentId && l.has(g.parentId) && l.add(g.id);
      }), l;
    });
    function Cn(l) {
      const u = He.value;
      if (!u) return null;
      const g = new Set(gi()), v = tu(u), k = v.map((ve, Ae) => g.has(ve.id) ? Ae : -1).filter((ve) => ve >= 0);
      if (k.length === 0) return null;
      let G = (l < 0 ? Math.min(...k) : Math.max(...k)) + l;
      for (; G >= 0 && G < v.length && g.has(v[G].id); ) G += l;
      return v[G] ?? null;
    }
    let Ge = null;
    ye(
      () => t.state.source,
      () => {
        const l = Ge;
        if (Ge = null, !!l) {
          if (l.key !== void 0) {
            Ne(l.key);
            return;
          }
          je(() => {
            l.index !== void 0 ? pr(l.index) : l.pasted !== void 0 ? ou(l.pasted) : ru(l.added);
          });
        }
      }
    );
    function ru(l) {
      const u = q.getCoreRowModel().flatRows.find((g) => !l.has(g.id));
      u && (Ne(u.id), _.value && (W.value = {}, mt.value = u.id, u.toggleSelected(!0, { selectChildren: !1 })), vr("rename") && je(() => br(u.id, !0)));
    }
    function ou(l) {
      const u = q.getCoreRowModel().flatRows.filter((k) => !l.has(k.id)), g = new Set(u.map((k) => k.id)), v = u.filter((k) => !g.has(k.parentId ?? ""));
      v.length !== 0 && (Ne(v[0].id), _.value && (W.value = {}, mt.value = v[0].id, v.forEach((k) => k.toggleSelected(!0, { selectChildren: !1 }))));
    }
    const rn = /* @__PURE__ */ fe(null), wr = /* @__PURE__ */ fe(""), In = /* @__PURE__ */ fe(null), vt = /* @__PURE__ */ fe(null), Do = /* @__PURE__ */ fe(null), ko = /* @__PURE__ */ fe(null), su = $(() => t.state.options.extension_warning !== !1);
    function pi(l) {
      const u = String(l ?? ""), g = u.lastIndexOf(".");
      return g < 0 ? "" : u.slice(g + 1).toLowerCase();
    }
    function iu(l, u) {
      return su.value && f(l, "allow_children") === !1 && pi(u) !== pi(l.title ?? "");
    }
    let yr = null;
    function br(l, u = !1) {
      const g = Dn(l);
      g && (yr = u ? l : null, wr.value = g.original.title ?? "", rn.value = l, t.setEditingKey(l), je(() => {
        var v, k;
        (v = In.value) == null || v.focus(), (k = In.value) == null || k.select();
      }));
    }
    function _r() {
      yr = null, vt.value = null, rn.value = null, t.setEditingKey("");
    }
    function hi(l) {
      if (vt.value || rn.value !== l.id) return;
      const u = wr.value.trim(), g = u.length > 0 && u !== (l.original.title ?? "");
      if (g && yr !== l.id && iu(l.original, u)) {
        vt.value = { key: l.id, title: u, previous: l.original.title ?? l.id }, je(() => {
          var v;
          return (v = ko.value) == null ? void 0 : v.focus();
        });
        return;
      }
      if (_r(), !g) {
        Ne(l.id);
        return;
      }
      Ge = { key: l.id }, t.emitEvent("rename", { key: l.id, title: u });
    }
    function mi() {
      const { key: l, title: u } = vt.value;
      vt.value = null, _r(), Ge = { key: l }, t.emitEvent("rename", { key: l, title: u });
    }
    function vi() {
      vt.value = null, je(() => {
        var l, u;
        (l = In.value) == null || l.focus(), (u = In.value) == null || u.select();
      });
    }
    function lu(l) {
      var v;
      const u = l.key;
      if (u === "Escape" || u === "n" || u === "N") {
        l.preventDefault(), vi();
        return;
      }
      if (u === "y" || u === "Y") {
        l.preventDefault(), mi();
        return;
      }
      if (u !== "Tab" && u !== "ArrowLeft" && u !== "ArrowRight") return;
      l.preventDefault(), (v = (l.target === Do.value ? ko : Do).value) == null || v.focus();
    }
    function au(l) {
      if (rn.value !== l.id) return;
      const u = yr === l.id;
      if (_r(), !u) {
        Ne(l.id);
        return;
      }
      Ge = { index: de.value.findIndex((g) => g.id === l.id) }, t.emitEvent("delete", { key: l.id, keys: [l.id] });
    }
    function cu(l, u) {
      u.key === "Enter" ? (u.preventDefault(), hi(l)) : u.key === "Escape" && (u.preventDefault(), au(l));
    }
    ye(
      () => t.state.editingKey,
      (l) => {
        (l || "") !== (rn.value || "") && (l ? br(l) : _r());
      }
    ), ms(() => {
      t.state.editingKey && br(t.state.editingKey);
    });
    function Sr(l, u) {
      const g = He.value;
      !g || !l || (Ge = { key: g.id }, t.emitEvent("move", {
        key: g.id,
        keys: gi(),
        position: u,
        anchorKey: l.id
      }));
    }
    function uu(l) {
      const u = He.value, g = u ? f(u.original, "allow_children") === !1 ? "after" : "child" : null;
      u && g === "child" && !Ce.value && u.toggleExpanded(!0), Ge = { added: new Set(q.getCoreRowModel().flatRows.map((v) => v.id)) }, t.emitEvent("add", { anchorKey: (u == null ? void 0 : u.id) ?? null, position: g, node: l.node });
    }
    function fu() {
      var u;
      const l = Oo();
      l.length !== 0 && (Ge = { index: de.value.findIndex((g) => {
        var v;
        return g.id === ((v = He.value) == null ? void 0 : v.id);
      }) }, t.emitEvent("delete", { key: ((u = He.value) == null ? void 0 : u.id) ?? null, keys: l }));
    }
    function du(l) {
      Ge = { index: de.value.findIndex((u) => {
        var g;
        return u.id === ((g = He.value) == null ? void 0 : g.id);
      }) }, t.emitEvent(l, {});
    }
    function gu(l) {
      var g;
      const u = Oo();
      u.length !== 0 && t.emitEvent(l, { key: ((g = He.value) == null ? void 0 : g.id) ?? null, keys: u });
    }
    function pu() {
      var v;
      const l = He.value, u = l ? f(l.original, "allow_children") === !1 ? "after" : "child" : null;
      l && u === "child" && !Ce.value && l.toggleExpanded(!0);
      const g = Po.value;
      Ge = ((v = t.state.clipboard) == null ? void 0 : v.mode) === "cut" ? { key: g[0] } : { pasted: new Set(q.getCoreRowModel().flatRows.map((k) => k.id)) }, t.emitEvent("paste", { anchorKey: (l == null ? void 0 : l.id) ?? null, position: u });
    }
    function Mn(l) {
      var u;
      switch (l.id) {
        case "new-folder":
        case "new-file":
          return !0;
        case "rename":
          return He.value !== null;
        case "delete":
        case "cut":
        case "copy":
          return Oo().length > 0;
        case "paste":
          return Po.value.length > 0;
        case "undo":
          return t.state.canUndo === !0;
        case "redo":
          return t.state.canRedo === !0;
        case "move-up":
        case "move-down":
          return !le.value && Cn(l.id === "move-up" ? -1 : 1) !== null;
        case "indent": {
          const g = Cn(-1);
          return g !== null && f(g.original, "allow_children") !== !1;
        }
        case "outdent":
          return !!((u = He.value) != null && u.parentId);
        case "expand-all":
        case "collapse-all":
          return de.value.length > 0 && !Ce.value;
        case "select-all":
          return de.value.length > 0 && _.value && O.value !== "single";
        case "clear-selection":
          return _.value && M(W.value).length > 0;
        default:
          return !0;
      }
    }
    function wi(l) {
      return l.keys ? l.keys.replace("Control", "Ctrl") : "";
    }
    function hu(l) {
      return l.keys ? `${l.label} (${wi(l)})` : l.label;
    }
    function To(l) {
      var u, g, v, k;
      if (Mn(l))
        switch (l.id) {
          case "new-folder":
          case "new-file":
            uu(l);
            break;
          case "rename":
            br(He.value.id);
            break;
          case "delete":
            fu();
            break;
          case "undo":
          case "redo":
            du(l.id);
            break;
          case "cut":
          case "copy":
            gu(l.id);
            break;
          case "paste":
            pu();
            break;
          case "move-up":
            Sr(Cn(-1), "before");
            break;
          case "move-down":
            Sr(Cn(1), "after");
            break;
          case "indent": {
            const G = Cn(-1);
            G && !Ce.value && G.toggleExpanded(!0), Sr(G, "child");
            break;
          }
          case "outdent":
            Sr(Dn((u = He.value) == null ? void 0 : u.parentId), "after");
            break;
          case "expand-all":
            q.toggleAllRowsExpanded(!0);
            break;
          case "collapse-all":
            q.toggleAllRowsExpanded(!1);
            break;
          case "select-all":
            W.value = Object.fromEntries(de.value.map((G) => [G.id, !0])), mt.value = ((g = de.value[0]) == null ? void 0 : g.id) ?? null;
            break;
          case "clear-selection":
            ii();
            break;
          case jn:
            (v = Fo.value) == null || v.focus(), (k = Fo.value) == null || k.select();
            break;
        }
    }
    const Fo = /* @__PURE__ */ fe(null), Ho = $(() => mr.value.filter((l) => l.id in Mo)), xr = /* @__PURE__ */ fe(null), Lo = /* @__PURE__ */ new Map(), yi = $(() => {
      const l = Ho.value;
      return l.length === 0 ? null : l.some((u) => u.uid === xr.value) ? xr.value : l[0].uid;
    });
    function mu(l, u) {
      u ? Lo.set(l, u) : Lo.delete(l);
    }
    function Rr(l) {
      const u = Ho.value;
      if (u.length === 0) return;
      const g = u[Math.max(0, Math.min(l, u.length - 1))].uid;
      xr.value = g, je(() => {
        var v;
        return (v = Lo.get(g)) == null ? void 0 : v.focus();
      });
    }
    function vu(l) {
      const u = Ho.value, g = Math.max(
        0,
        u.findIndex((v) => v.uid === yi.value)
      );
      switch (l.key) {
        case "ArrowRight":
          l.preventDefault(), Rr(g + 1);
          break;
        case "ArrowLeft":
          l.preventDefault(), Rr(g - 1);
          break;
        case "Home":
          l.preventDefault(), Rr(0);
          break;
        case "End":
          l.preventDefault(), Rr(u.length - 1);
          break;
      }
    }
    const En = /* @__PURE__ */ fe(!1), Cr = /* @__PURE__ */ fe(null), An = /* @__PURE__ */ fe({ left: 0, top: 0 }), Ir = /* @__PURE__ */ fe(null), on = /* @__PURE__ */ fe(0), jo = /* @__PURE__ */ new Map(), On = $(() => Eo.value.filter((l) => l.id in Mo)), Mr = $(() => On.value.length > 0), wu = $(() => t.state.options.menu_label ?? "Row actions");
    function yu(l, u) {
      u ? jo.set(l, u) : jo.delete(l);
    }
    function bi(l) {
      return On.value.findIndex((u) => u.uid === l.uid);
    }
    function _i(l, u, g) {
      if (!Mr.value) return;
      pt.value !== l.id && Kt(l.id), Cr.value = l.id, An.value = { left: u, top: g };
      const v = On.value.findIndex((k) => Mn(k));
      on.value = Math.max(0, v), En.value = !0, je(Su);
    }
    function bu(l, u) {
      Mr.value && (u.preventDefault(), _.value && !l.getIsSelected() && hr(l), _i(l, u.clientX, u.clientY));
    }
    function _u(l) {
      var g;
      const u = (g = zt.get(l.id)) == null ? void 0 : g.getBoundingClientRect();
      _i(l, u ? u.left + _n.value : un, u ? u.bottom : un);
    }
    function Su() {
      const l = Ir.value;
      if (!l) return;
      const u = l.getBoundingClientRect();
      let { left: g, top: v } = An.value;
      g + u.width > window.innerWidth - un && (g = Math.max(un, g - u.width)), v + u.height > window.innerHeight - un && (v = Math.max(un, v - u.height)), An.value = { left: g, top: v }, Pn(on.value);
    }
    function Pn(l) {
      const u = On.value;
      if (u.length === 0) return;
      const g = Math.max(0, Math.min(l, u.length - 1));
      on.value = g, je(() => {
        var v;
        return (v = jo.get(u[g].uid)) == null ? void 0 : v.focus();
      });
    }
    function Er(l = !0, u = void 0) {
      if (!En.value) return;
      const g = Cr.value;
      En.value = !1, Cr.value = null, l && g != null && je(() => {
        var v;
        return (v = zt.get(g)) == null ? void 0 : v.focus(u);
      });
    }
    function xu(l) {
      if (!Mn(l)) return;
      const u = Cr.value;
      Er(!1), Ne(u), To(l);
    }
    function Ru(l) {
      const u = on.value;
      switch (l.key) {
        case "ArrowDown":
          l.preventDefault(), Pn(u + 1);
          break;
        case "ArrowUp":
          l.preventDefault(), Pn(u - 1);
          break;
        case "Home":
          l.preventDefault(), Pn(0);
          break;
        case "End":
          l.preventDefault(), Pn(On.value.length - 1);
          break;
        case "Escape":
        case "Tab":
          l.preventDefault(), Er();
          break;
      }
    }
    function zo(l) {
      Ir.value && l.composedPath().includes(Ir.value) || Er(!1);
    }
    function sn() {
      Er(!0, { preventScroll: !0 });
    }
    ye(En, (l) => {
      l ? (document.addEventListener("pointerdown", zo, !0), window.addEventListener("resize", sn), window.addEventListener("scroll", sn, !0)) : (document.removeEventListener("pointerdown", zo, !0), window.removeEventListener("resize", sn), window.removeEventListener("scroll", sn, !0));
    }), vs(() => {
      document.removeEventListener("pointerdown", zo, !0), window.removeEventListener("resize", sn), window.removeEventListener("scroll", sn, !0);
    });
    const Cu = ["reorder-above", "reorder-below", "make-child", "reparent"], Ko = $(() => t.state.options.enable_dnd === !0), Vo = $(() => String(t.state.options.transfer_group || "")), ln = $(() => String(t.state.tableId || "")), Si = /* @__PURE__ */ fe([]), Ar = /* @__PURE__ */ fe(null);
    function Dn(l) {
      return de.value.find((u) => u.id === l) ?? null;
    }
    function Iu(l, u) {
      let g = l;
      for (; g; ) {
        if (u.includes(g.id)) return !0;
        g = g.getParentRow();
      }
      return !1;
    }
    function xi(l) {
      if (!_.value || !l.getIsSelected()) return [l.id];
      const u = /* @__PURE__ */ new Set();
      for (let v = l.getParentRow(); v; v = v.getParentRow()) u.add(v.id);
      const g = de.value.filter((v) => v.getIsSelected() && !u.has(v.id)).map((v) => v.id);
      return g.length > 1 ? g : [l.id];
    }
    function Mu(l, u, g) {
      if (!g && Iu(l, u)) return Cu;
      const v = le.value ? ["reorder-above", "reorder-below"] : [];
      return f(l.original, "allow_children") === !1 && v.push("make-child"), v;
    }
    function Eu(l) {
      if (Ee(l) && qe(l)) return "expanded";
      const u = me(l);
      return u[u.length - 1] === l.id ? "last-in-group" : "standard";
    }
    let Bo = null, kn = null;
    function No() {
      kn && clearTimeout(kn), kn = null, Bo = null;
    }
    function Au(l, u) {
      if (Bo === l || (No(), !u || u.type === "instruction-blocked")) return;
      const g = Dn(l);
      !g || !g.getCanExpand() || g.getIsExpanded() || (Bo = l, kn = setTimeout(() => {
        kn = null;
        const v = Dn(l);
        v && v.getCanExpand() && !v.getIsExpanded() && v.toggleExpanded(!0);
      }, y0));
    }
    function Ou() {
      Ar.value = null, No();
    }
    const Ri = /* @__PURE__ */ fe(null);
    function Pu() {
      let l = Ri.value;
      if (!l) return null;
      let u = l.getRootNode();
      for (; u.host; )
        l = u.host, u = l.getRootNode();
      return l;
    }
    function Or(l) {
      for (const u of de.value) {
        const g = zt.get(u.id);
        if (!g) continue;
        const v = g.getBoundingClientRect();
        if (l.clientX >= v.left && l.clientX < v.right && l.clientY >= v.top && l.clientY < v.bottom)
          return { row: u, element: g, rect: v };
      }
      return null;
    }
    function Du(l, u) {
      const g = ".pnl-tst-check, .pnl-tst-twisty, .pnl-tst-edit";
      for (const v of l.element.querySelectorAll(g)) {
        const k = v.getBoundingClientRect();
        if (u.clientX >= k.left && u.clientX < k.right && u.clientY >= k.top && u.clientY < k.bottom)
          return !0;
      }
      return !1;
    }
    const ku = {
      id: () => ln.value,
      // Anything outside a row (the header, the empty space below the last row) is
      // not a drag handle, and neither is a row control.
      canDragFrom(l) {
        const u = Or(l);
        return u !== null && !Du(u, l);
      },
      dragData(l) {
        const u = Or(l);
        return u ? {
          type: mn,
          group: Vo.value,
          sourceId: ln.value,
          key: u.row.id,
          keys: xi(u.row)
        } : null;
      },
      // The registered element is the host, so the default preview would be a
      // snapshot of the whole layout. Point it at the row being dragged, offset so
      // the preview stays under the cursor where it was grabbed.
      preview(l, u) {
        const g = Or(l);
        return g ? (u(g.element, l.clientX - g.rect.left, l.clientY - g.rect.top), !0) : !1;
      },
      setDragging(l) {
        Si.value = l;
      },
      // Our own rows always. Another pane's only when both name the same group, so a
      // table that opted into nothing shows no drop state at all rather than
      // accepting a drag Python is bound to reject.
      dropData(l, u) {
        const g = Or(l);
        if (!g) return null;
        const v = u.sourceId !== ln.value;
        if (v && !(Vo.value && u.group === Vo.value))
          return { type: mn, key: null, paneId: ln.value };
        const k = { type: mn, key: g.row.id, paneId: ln.value };
        return om(k, {
          element: g.element,
          input: l,
          currentLevel: g.row.depth,
          indentPerLevel: _n.value,
          mode: Eu(g.row),
          block: Mu(g.row, u.keys ?? [], v)
        });
      },
      showDrop(l, u) {
        Ar.value = { key: l, instruction: u }, Au(l, u);
      },
      clearDrop: Ou,
      drop(l, u, g, v) {
        const k = l.keys ?? [];
        if (k.length === 0) return;
        const G = {
          targetKey: u,
          instruction: g.type,
          desiredLevel: g.desiredLevel ?? g.currentLevel
        };
        if (l.sourceId === ln.value) {
          if (k.includes(u)) return;
          t.emitEvent("move", { key: l.key, keys: k, ...G });
          return;
        }
        Ge = { pasted: new Set(q.getCoreRowModel().flatRows.map((ve) => ve.id)) }, t.emitEvent("transfer", {
          keys: k,
          sourceId: l.sourceId,
          copy: !!(v != null && v.ctrlKey || v != null && v.altKey),
          ...G
        });
      }
    };
    let Ot = null;
    function Ci() {
      Ot == null || Ot(), Ot = null;
      const l = Pu();
      !l || !Ko.value || (Ot = Qm(l, ku));
    }
    ms(Ci), ye(Ko, Ci), vs(() => {
      No(), Ot == null || Ot();
    });
    function $o(l) {
      var u;
      return ((u = Ar.value) == null ? void 0 : u.key) === l.id ? Ar.value.instruction : null;
    }
    function Tu(l) {
      const u = f(l.original, "class");
      return typeof u == "string" ? u : null;
    }
    function Fu(l) {
      const u = $o(l);
      return {
        "pnl-tst-row--draggable": Ko.value,
        "pnl-tst-row--dragging": Si.value.includes(l.id),
        "pnl-tst-row--blocked": (u == null ? void 0 : u.type) === "instruction-blocked",
        "pnl-tst-row--child-target": (u == null ? void 0 : u.type) === "make-child"
      };
    }
    function Ii(l) {
      const u = $o(l);
      return u ? u.type === "reorder-above" ? "pnl-tst-dropline--above" : u.type === "reorder-below" || u.type === "reparent" ? "pnl-tst-dropline--below" : null : null;
    }
    function Hu(l) {
      const u = $o(l);
      return u ? { insetInlineStart: `${(u.type === "reparent" ? u.desiredLevel : u.currentLevel) * u.indentPerLevel}px` } : null;
    }
    return (l, u) => (ne(), re("div", {
      ref_key: "rootElement",
      ref: Ri,
      class: "pnl-tst"
    }, [
      Qc.value ? (ne(), re("div", {
        key: 0,
        class: "pnl-tst-toolbar",
        role: "toolbar",
        "aria-orientation": "horizontal",
        "aria-label": eu.value
      }, [
        (ne(!0), re(Me, null, Hn(mr.value, (g) => (ne(), re(Me, {
          key: g.uid
        }, [
          g.id === "|" ? (ne(), re("span", Kv)) : g.id === "search" ? (ne(), re("label", Vv, [
            Se("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: Ut(Tv)
            }, null, 8, Bv),
            Se("input", {
              ref_for: !0,
              ref: (v) => Fo.value = v,
              type: "search",
              value: At.value,
              "aria-label": fi.value,
              placeholder: fi.value,
              onInput: u[0] || (u[0] = (v) => gt(v.target.value))
            }, null, 40, Nv)
          ])) : (ne(), re("button", {
            key: 2,
            ref_for: !0,
            ref: (v) => mu(g.uid, v),
            type: "button",
            class: "pnl-tst-tbtn",
            "aria-label": g.label,
            "aria-keyshortcuts": g.keys,
            "aria-disabled": !Mn(g),
            title: hu(g),
            tabindex: g.uid === yi.value ? 0 : -1,
            onClick: (v) => To(g),
            onFocus: (v) => xr.value = g.uid,
            onKeydown: vu
          }, [
            Se("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: g.icon
            }, null, 8, Wv)
          ], 40, $v))
        ], 64))), 128))
      ], 8, zv)) : Xe("", !0),
      de.value.length === 0 ? (ne(), re("div", Uv, kt(nn.value), 1)) : (ne(), re("div", {
        key: 2,
        class: ot(["pnl-tst-grid", { "pnl-tst-grid--resizing": we.value !== null }]),
        role: "treegrid",
        "aria-label": jt.value,
        "aria-colcount": tt.value.length,
        "aria-rowcount": dr.value,
        style: Ft(gr.value),
        onKeydown: Nc
      }, [
        r.value ? (ne(), re("div", Gv, [
          Se("div", Xv, [
            (ne(!0), re(Me, null, Hn(tt.value, (g, v) => (ne(), re("div", {
              key: g.id,
              ref_for: !0,
              ref: (k) => m(g.column.id, k),
              class: ot(["pnl-tst-hcell", { "pnl-tst-hcell--sortable": F(g) }]),
              role: "columnheader",
              "aria-colindex": v + 1,
              "aria-sort": T(g),
              "aria-keyshortcuts": H(g) ? "Alt+ArrowLeft Alt+ArrowRight Alt+Home" : void 0,
              tabindex: Ue.value && g.column.id === b.value ? 0 : -1,
              style: Ft(Ie(v)),
              onClick: (k) => B(g),
              onFocus: (k) => xn.value = g.column.id,
              onKeydown: (k) => ce(g, k)
            }, [
              Se("span", Zv, kt(g.column.columnDef.header), 1),
              P(g) ? (ne(), re("span", {
                key: 0,
                class: "pnl-tst-sortind",
                "aria-hidden": "true",
                innerHTML: P(g)
              }, null, 8, Jv)) : Xe("", !0),
              H(g) ? (ne(), re("span", {
                key: 1,
                class: ot(["pnl-tst-resize", { "pnl-tst-resize--active": we.value === g.column.id }]),
                "aria-hidden": "true",
                onClick: u[1] || (u[1] = cn(() => {
                }, ["stop"])),
                onDblclick: cn((k) => J(g), ["stop"]),
                onMousedown: (k) => V(g, k),
                onTouchstart: (k) => V(g, k)
              }, null, 42, Qv)) : Xe("", !0)
            ], 46, Yv))), 128))
          ])
        ])) : Xe("", !0),
        Se("div", e0, [
          (ne(!0), re(Me, null, Hn(de.value, (g, v) => (ne(), re("div", {
            key: g.id,
            ref_for: !0,
            ref: (k) => Bc(g.id, k),
            class: ot(["pnl-tst-row", [
              Fu(g),
              Tu(g),
              {
                "pnl-tst-row--active": ht.value && g.id === pt.value,
                "pnl-tst-row--quiet": !ht.value && g.id === pt.value,
                "pnl-tst-row--cut": nu.value.has(g.id)
              }
            ]]),
            role: "row",
            "aria-level": g.depth + 1,
            "aria-posinset": _e(g),
            "aria-setsize": Ve(g),
            "aria-rowindex": v + Sn.value,
            "aria-expanded": Ee(g) ? qe(g) : void 0,
            "aria-selected": _.value ? g.getIsSelected() : void 0,
            "aria-haspopup": Mr.value ? "menu" : void 0,
            tabindex: !Ue.value && g.id === Rn.value ? 0 : -1,
            onClick: (k) => Uc(g, k),
            onContextmenu: (k) => bu(g, k),
            onFocus: (k) => Kt(g.id)
          }, [
            Ii(g) ? (ne(), re("span", {
              key: 0,
              class: ot(["pnl-tst-dropline", Ii(g)]),
              style: Ft(Hu(g)),
              "aria-hidden": "true"
            }, null, 6)) : Xe("", !0),
            (ne(!0), re(Me, null, Hn(g.getAllCells(), (k, G) => (ne(), re("div", {
              key: k.id,
              class: ot(["pnl-tst-cell", { "pnl-tst-cell--tree": G === 0 }]),
              role: "gridcell",
              "aria-colindex": G + 1,
              style: Ft(G === 0 ? Be(g) : Ie(G))
            }, [
              G === 0 ? (ne(), re(Me, { key: 0 }, [
                Ee(g) ? (ne(), re("span", {
                  key: 0,
                  class: ot(["pnl-tst-twisty", { "pnl-tst-twisty--open": qe(g) }]),
                  "aria-hidden": "true",
                  onClick: cn((ve) => qc(g), ["stop"])
                }, [...u[4] || (u[4] = [
                  Se("svg", {
                    viewBox: "0 0 16 16",
                    width: "12",
                    height: "12",
                    focusable: "false"
                  }, [
                    Se("path", {
                      d: "M6 3.5 10.5 8 6 12.5",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "1.6"
                    })
                  ], -1)
                ])], 10, r0)) : (ne(), re("span", o0)),
                j.value ? (ne(), re("input", {
                  key: 2,
                  class: "pnl-tst-check",
                  type: "checkbox",
                  tabindex: "-1",
                  checked: ai(g),
                  ".indeterminate": Gc(g),
                  "aria-label": `Select ${g.original.title ?? g.id}`,
                  onClick: cn((ve) => Yc(g), ["stop"])
                }, null, 40, s0)) : Xe("", !0),
                z(g) ? (ne(), re("span", {
                  key: 3,
                  class: "pnl-tst-icon",
                  "aria-hidden": "true",
                  innerHTML: z(g)
                }, null, 8, i0)) : Xe("", !0)
              ], 64)) : Xe("", !0),
              G === 0 && rn.value === g.id ? (ne(), re("input", {
                key: 1,
                ref_for: !0,
                ref: (ve) => In.value = ve,
                class: "pnl-tst-edit",
                type: "text",
                value: wr.value,
                "aria-label": `Rename ${g.original.title ?? g.id}`,
                onInput: u[2] || (u[2] = (ve) => wr.value = ve.target.value),
                onClick: u[3] || (u[3] = cn(() => {
                }, ["stop"])),
                onKeydown: cn((ve) => cu(g, ve), ["stop"]),
                onBlur: (ve) => hi(g)
              }, null, 40, l0)) : (ne(), re("span", a0, kt(k.getValue()), 1))
            ], 14, n0))), 128))
          ], 42, t0))), 128))
        ])
      ], 46, qv)),
      vt.value ? (ne(), re("div", c0, [
        Se("div", {
          class: "pnl-tst-dialog",
          role: "alertdialog",
          "aria-modal": "true",
          "aria-label": "Rename",
          "aria-describedby": "pnl-tst-confirm-message",
          onKeydown: lu
        }, [
          Se("p", u0, " Rename " + kt(vt.value.previous) + " to " + kt(vt.value.title) + "? If you change a file name extension, the file might become unusable. ", 1),
          Se("div", f0, [
            Se("button", {
              ref_key: "confirmYesButton",
              ref: Do,
              type: "button",
              class: "pnl-tst-dbtn",
              "aria-keyshortcuts": "Y",
              onClick: mi
            }, [...u[5] || (u[5] = [
              Se("span", { class: "pnl-tst-dkey" }, "Y", -1),
              Ss("es ", -1)
            ])], 512),
            Se("button", {
              ref_key: "confirmNoButton",
              ref: ko,
              type: "button",
              class: "pnl-tst-dbtn",
              "aria-keyshortcuts": "N",
              onClick: vi
            }, [...u[6] || (u[6] = [
              Se("span", { class: "pnl-tst-dkey" }, "N", -1),
              Ss("o ", -1)
            ])], 512)
          ])
        ], 32)
      ])) : Xe("", !0),
      En.value ? (ne(), re("div", {
        key: 4,
        ref_key: "menuElement",
        ref: Ir,
        class: "pnl-tst-menu",
        role: "menu",
        "aria-orientation": "vertical",
        "aria-label": wu.value,
        style: Ft({ left: `${An.value.left}px`, top: `${An.value.top}px` }),
        onKeydown: Ru
      }, [
        (ne(!0), re(Me, null, Hn(Eo.value, (g) => (ne(), re(Me, {
          key: g.uid
        }, [
          g.id === "|" ? (ne(), re("div", g0)) : (ne(), re("button", {
            key: 1,
            ref_for: !0,
            ref: (v) => yu(g.uid, v),
            type: "button",
            class: "pnl-tst-mitem",
            role: "menuitem",
            "aria-keyshortcuts": g.keys,
            "aria-disabled": !Mn(g),
            tabindex: bi(g) === on.value ? 0 : -1,
            onClick: (v) => xu(g),
            onFocus: (v) => on.value = bi(g)
          }, [
            Se("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: g.icon
            }, null, 8, h0),
            Se("span", m0, kt(g.label), 1),
            g.keys ? (ne(), re("span", v0, kt(wi(g)), 1)) : Xe("", !0)
          ], 40, p0))
        ], 64))), 128))
      ], 44, d0)) : Xe("", !0)
    ], 512));
  }
};
function _0({ model: e, el: t }) {
  t.style.display = "block", t.style.width = "100%", t.style.height = "100%";
  const n = document.createElement("div");
  n.className = "pnl-tst-root", n.style.height = "100%", t.append(n);
  const r = /* @__PURE__ */ co({
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
  }, c = (O, _) => O.length === _.length && O.every((D, j) => D === _[j]), f = (O) => (_) => {
    const D = [...e.get(O) || []].sort();
    c(D, _) || (e.set(O, _), e.save_changes());
  }, d = f("expanded_keys"), h = f("selected_keys"), w = (O) => {
    (e.get("filter_text") || "") !== O && (e.set("filter_text", O), e.save_changes());
  }, y = (O) => {
    (e.get("editing_key") || "") !== O && (e.set("editing_key", O), e.save_changes());
  }, M = (O, _) => O.length === _.length && O.every((D, j) => D.id === _[j].id && !!D.desc == !!_[j].desc), E = (O) => {
    M(e.get("sorting") || [], O) || (e.set("sorting", O), e.save_changes());
  }, A = (O, _) => {
    const D = Object.keys(O);
    return D.length === Object.keys(_).length && D.every((j) => O[j] === _[j]);
  }, I = og(b0, {
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
  return I.mount(n), e.on("change:source", () => {
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
    I.unmount();
  };
}
export {
  _0 as render
};

/**
* @vue/shared v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function Fs(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const pe = {}, hn = [], ct = () => {
}, kl = () => !1, so = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), io = (e) => e.startsWith("onUpdate:"), Oe = Object.assign, Hs = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, zu = Object.prototype.hasOwnProperty, le = (e, t) => zu.call(e, t), U = Array.isArray, Ht = (e) => ir(e) === "[object Map]", Ur = (e) => ir(e) === "[object Set]", Pi = (e) => ir(e) === "[object Date]", X = (e) => typeof e == "function", be = (e) => typeof e == "string", ut = (e) => typeof e == "symbol", ue = (e) => e !== null && typeof e == "object", Tl = (e) => (ue(e) || X(e)) && X(e.then) && X(e.catch), Fl = Object.prototype.toString, ir = (e) => Fl.call(e), Ku = (e) => ir(e).slice(8, -1), Hl = (e) => ir(e) === "[object Object]", Ls = (e) => be(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Nn = /* @__PURE__ */ Fs(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), lo = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Vu = /-\w/g, Ze = lo(
  (e) => e.replace(Vu, (t) => t.slice(1).toUpperCase())
), Bu = /\B([A-Z])/g, Yt = lo(
  (e) => e.replace(Bu, "-$1").toLowerCase()
), Ll = lo((e) => e.charAt(0).toUpperCase() + e.slice(1)), qo = lo(
  (e) => e ? `on${Ll(e)}` : ""
), lt = (e, t) => !Object.is(e, t), Go = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, jl = (e, t, n, r = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: r,
    value: n
  });
}, Nu = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Di;
const ao = () => Di || (Di = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Tt(e) {
  if (U(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], o = be(r) ? qu(r) : Tt(r);
      if (o)
        for (const s in o)
          t[s] = o[s];
    }
    return t;
  } else if (be(e) || ue(e))
    return e;
}
const $u = /;(?![^(]*\))/g, Wu = /:([^]+)/, Uu = /\/\*[^]*?\*\//g;
function qu(e) {
  const t = {};
  return e.replace(Uu, "").split($u).forEach((n) => {
    if (n) {
      const r = n.split(Wu);
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
const Gu = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Xu = /* @__PURE__ */ Fs(Gu);
function zl(e) {
  return !!e || e === "";
}
function Yu(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let r = 0; n && r < e.length; r++)
    n = co(e[r], t[r]);
  return n;
}
function ki(e, t) {
  if (e.size !== t.size) return !1;
  const n = Array.from(t), r = new Uint8Array(n.length);
  for (const o of e) {
    let s = -1;
    for (let i = 0; i < n.length; i++)
      if (!r[i] && co(o, n[i])) {
        s = i;
        break;
      }
    if (s < 0) return !1;
    r[s] = 1;
  }
  return !0;
}
function co(e, t) {
  if (e === t) return !0;
  let n = Pi(e), r = Pi(t);
  if (n || r)
    return n && r ? e.getTime() === t.getTime() : !1;
  if (n = ut(e), r = ut(t), n || r)
    return e === t;
  if (n = U(e), r = U(t), n || r)
    return n && r ? Yu(e, t) : !1;
  if (n = ue(e), r = ue(t), n || r) {
    if (!n || !r)
      return !1;
    if (n = Ht(e), r = Ht(t), n || r || (n = Ur(e), r = Ur(t), n || r))
      return n && r ? ki(e, t) : !1;
    const o = Object.keys(e).length, s = Object.keys(t).length;
    if (o !== s)
      return !1;
    for (const i in e) {
      const a = e.hasOwnProperty(i), c = t.hasOwnProperty(i);
      if (a && !c || !a && c || !co(e[i], t[i]))
        return !1;
    }
  }
  return String(e) === String(t);
}
const Kl = (e) => !!(e && e.__v_isRef === !0), Dt = (e) => be(e) ? e : e == null ? "" : U(e) || ue(e) && (e.toString === Fl || !X(e.toString)) ? Kl(e) ? Dt(e.value) : JSON.stringify(e, Vl, 2) : String(e), Vl = (e, t) => Kl(t) ? Vl(e, t.value) : Ht(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [r, o], s) => (n[Xo(r, s) + " =>"] = o, n),
    {}
  )
} : Ur(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Xo(n))
} : ut(t) ? Xo(t) : ue(t) && !U(t) && !Hl(t) ? String(t) : t, Xo = (e, t = "") => {
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
class Zu {
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
function Bl() {
  return xe;
}
function Ju(e, t = !1) {
  xe && xe.cleanups.push(e);
}
let ge;
const Yo = /* @__PURE__ */ new WeakSet();
class Nl {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, xe && (xe.active ? xe.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Yo.has(this) && (Yo.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Wl(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Ti(this), Ul(this);
    const t = ge, n = Je;
    ge = this, Je = !0;
    try {
      return this.fn();
    } finally {
      ql(this), ge = t, Je = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Ks(t);
      this.deps = this.depsTail = void 0, Ti(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Yo.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    gs(this) && this.run();
  }
  get dirty() {
    return gs(this);
  }
}
let $l = 0, $n, Wn;
function Wl(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Wn, Wn = e;
    return;
  }
  e.next = $n, $n = e;
}
function js() {
  $l++;
}
function zs() {
  if (--$l > 0)
    return;
  if (Wn) {
    let t = Wn;
    for (Wn = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; $n; ) {
    let t = $n;
    for ($n = void 0; t; ) {
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
function Ul(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function ql(e) {
  let t, n = e.depsTail, r = n;
  for (; r; ) {
    const o = r.prevDep;
    r.version === -1 ? (r === n && (n = o), Ks(r), Qu(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = o;
  }
  e.deps = t, e.depsTail = n;
}
function gs(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Gl(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Gl(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Zn) || (e.globalVersion = Zn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !gs(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = ge, r = Je;
  ge = e, Je = !0;
  try {
    Ul(e);
    const o = e.fn(e._value);
    (t.version === 0 || lt(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    ge = n, Je = r, ql(e), e.flags &= -3;
  }
}
function Ks(e, t = !1) {
  const { dep: n, prevSub: r, nextSub: o } = e;
  if (r && (r.nextSub = o, e.prevSub = void 0), o && (o.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
    n.computed.flags &= -5;
    for (let s = n.computed.deps; s; s = s.nextDep)
      Ks(s, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Qu(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let Je = !0;
const Xl = [];
function _t() {
  Xl.push(Je), Je = !1;
}
function St() {
  const e = Xl.pop();
  Je = e === void 0 ? !0 : e;
}
function Ti(e) {
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
let Zn = 0;
class ef {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Vs {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!ge || !Je || ge === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== ge)
      n = this.activeLink = new ef(ge, this), ge.deps ? (n.prevDep = ge.depsTail, ge.depsTail.nextDep = n, ge.depsTail = n) : ge.deps = ge.depsTail = n, Yl(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const r = n.nextDep;
      r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = ge.depsTail, n.nextDep = void 0, ge.depsTail.nextDep = n, ge.depsTail = n, ge.deps === n && (ge.deps = r);
    }
    return n;
  }
  trigger(t) {
    this.version++, Zn++, this.notify(t);
  }
  notify(t) {
    js();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      zs();
    }
  }
}
function Yl(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let r = t.deps; r; r = r.nextDep)
        Yl(r);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const ps = /* @__PURE__ */ new WeakMap(), Nt = /* @__PURE__ */ Symbol(
  ""
), hs = /* @__PURE__ */ Symbol(
  ""
), Jn = /* @__PURE__ */ Symbol(
  ""
);
function Ee(e, t, n) {
  if (Je && ge) {
    let r = ps.get(e);
    r || ps.set(e, r = /* @__PURE__ */ new Map());
    let o = r.get(n);
    o || (r.set(n, o = new Vs()), o.map = r, o.key = n), o.track();
  }
}
function yt(e, t, n, r, o, s) {
  const i = ps.get(e);
  if (!i) {
    Zn++;
    return;
  }
  const a = (c) => {
    c && c.trigger();
  };
  if (js(), t === "clear")
    i.forEach(a);
  else {
    const c = U(e), f = c && Ls(n);
    if (c && n === "length") {
      const d = Number(r);
      i.forEach((h, w) => {
        (w === "length" || w === Jn || !ut(w) && w >= d) && a(h);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && a(i.get(n)), f && a(i.get(Jn)), t) {
        case "add":
          c ? f && a(i.get("length")) : (a(i.get(Nt)), Ht(e) && a(i.get(hs)));
          break;
        case "delete":
          c || (a(i.get(Nt)), Ht(e) && a(i.get(hs)));
          break;
        case "set":
          Ht(e) && a(i.get(Nt));
          break;
      }
  }
  zs();
}
function un(e) {
  const t = /* @__PURE__ */ ie(e);
  return t === e ? t : (Ee(t, "iterate", Jn), /* @__PURE__ */ $e(e) ? t : t.map(Qe));
}
function uo(e) {
  return Ee(e = /* @__PURE__ */ ie(e), "iterate", Jn), e;
}
function st(e, t) {
  return /* @__PURE__ */ xt(e) ? yn(/* @__PURE__ */ $t(e) ? Qe(t) : t) : Qe(t);
}
const tf = {
  __proto__: null,
  [Symbol.iterator]() {
    return Zo(this, Symbol.iterator, (e) => st(this, e));
  },
  concat(...e) {
    return un(this).concat(
      ...e.map((t) => U(t) ? un(t) : t)
    );
  },
  entries() {
    return Zo(this, "entries", (e) => (e[1] = st(this, e[1]), e));
  },
  every(e, t) {
    return mt(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return mt(
      this,
      "filter",
      e,
      t,
      (n) => n.map((r) => st(this, r)),
      arguments
    );
  },
  find(e, t) {
    return mt(
      this,
      "find",
      e,
      t,
      (n) => st(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return mt(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return mt(
      this,
      "findLast",
      e,
      t,
      (n) => st(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return mt(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return mt(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Jo(this, "includes", e);
  },
  indexOf(...e) {
    return Jo(this, "indexOf", e);
  },
  join(e) {
    return un(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Jo(this, "lastIndexOf", e);
  },
  map(e, t) {
    return mt(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Ln(this, "pop");
  },
  push(...e) {
    return Ln(this, "push", e);
  },
  reduce(e, ...t) {
    return Fi(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Fi(this, "reduceRight", e, t);
  },
  shift() {
    return Ln(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return mt(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Ln(this, "splice", e);
  },
  toReversed() {
    return un(this).toReversed();
  },
  toSorted(e) {
    return un(this).toSorted(e);
  },
  toSpliced(...e) {
    return un(this).toSpliced(...e);
  },
  unshift(...e) {
    return Ln(this, "unshift", e);
  },
  values() {
    return Zo(this, "values", (e) => st(this, e));
  }
};
function Zo(e, t, n) {
  const r = uo(e), o = r[t]();
  return r !== e && !/* @__PURE__ */ $e(e) && (o._next = o.next, o.next = () => {
    const s = o._next();
    return s.done || (s.value = n(s.value)), s;
  }), o;
}
const nf = Array.prototype;
function mt(e, t, n, r, o, s) {
  const i = uo(e), a = i !== e && !/* @__PURE__ */ $e(e), c = i[t];
  if (c !== nf[t]) {
    const h = c.apply(e, s);
    return a ? Qe(h) : h;
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
function Fi(e, t, n, r) {
  const o = uo(e), s = o !== e && !/* @__PURE__ */ $e(e);
  let i = n, a = !1;
  o !== e && (s ? (a = r.length === 0, i = function(f, d, h) {
    return a && (a = !1, f = st(e, f)), n.call(this, f, st(e, d), h, e);
  }) : n.length > 3 && (i = function(f, d, h) {
    return n.call(this, f, d, h, e);
  }));
  const c = o[t](i, ...r);
  return a ? st(e, c) : c;
}
function Jo(e, t, n) {
  const r = /* @__PURE__ */ ie(e);
  Ee(r, "iterate", Jn);
  const o = r[t](...n);
  return (o === -1 || o === !1) && /* @__PURE__ */ $s(n[0]) ? (n[0] = /* @__PURE__ */ ie(n[0]), r[t](...n)) : o;
}
function Ln(e, t, n = []) {
  _t(), js();
  const r = (/* @__PURE__ */ ie(e))[t].apply(e, n);
  return zs(), St(), r;
}
const rf = /* @__PURE__ */ Fs("__proto__,__v_isRef,__isVue"), Zl = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(ut)
);
function of(e) {
  ut(e) || (e = String(e));
  const t = /* @__PURE__ */ ie(this);
  return Ee(t, "has", e), t.hasOwnProperty(e);
}
class Jl {
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
      return r === (o ? s ? hf : na : s ? ta : ea).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const i = U(t);
    if (!o) {
      let c;
      if (i && (c = tf[n]))
        return c;
      if (n === "hasOwnProperty")
        return of;
    }
    const a = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ Ae(t) ? t : r
    );
    if ((ut(n) ? Zl.has(n) : rf(n)) || (o || Ee(t, "get", n), s))
      return a;
    if (/* @__PURE__ */ Ae(a)) {
      const c = i && Ls(n) ? a : a.value;
      return o && ue(c) ? /* @__PURE__ */ vs(c) : c;
    }
    return ue(a) ? o ? /* @__PURE__ */ vs(a) : /* @__PURE__ */ fo(a) : a;
  }
}
class Ql extends Jl {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, o) {
    let s = t[n];
    const i = U(t) && Ls(n);
    if (!this._isShallow) {
      const f = /* @__PURE__ */ xt(s);
      if (!/* @__PURE__ */ $e(r) && !/* @__PURE__ */ xt(r) && (s = /* @__PURE__ */ ie(s), r = /* @__PURE__ */ ie(r)), !i && /* @__PURE__ */ Ae(s) && !/* @__PURE__ */ Ae(r))
        return f || (s.value = r), !0;
    }
    const a = i ? Number(n) < t.length : le(t, n), c = Reflect.set(
      t,
      n,
      r,
      /* @__PURE__ */ Ae(t) ? t : o
    );
    return t === /* @__PURE__ */ ie(o) && c && (a ? lt(r, s) && yt(t, "set", n, r) : yt(t, "add", n, r)), c;
  }
  deleteProperty(t, n) {
    const r = le(t, n);
    t[n];
    const o = Reflect.deleteProperty(t, n);
    return o && r && yt(t, "delete", n, void 0), o;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!ut(n) || !Zl.has(n)) && Ee(t, "has", n), r;
  }
  ownKeys(t) {
    return Ee(
      t,
      "iterate",
      U(t) ? "length" : Nt
    ), Reflect.ownKeys(t);
  }
}
class sf extends Jl {
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
const lf = /* @__PURE__ */ new Ql(), af = /* @__PURE__ */ new sf(), cf = /* @__PURE__ */ new Ql(!0);
const ms = (e) => e, kr = (e) => Reflect.getPrototypeOf(e);
function uf(e, t, n) {
  return function(...r) {
    const o = this.__v_raw, s = /* @__PURE__ */ ie(o), i = Ht(s), a = e === "entries" || e === Symbol.iterator && i, c = e === "keys" && i, f = o[e](...r), d = n ? ms : t ? yn : Qe;
    return !t && Ee(
      s,
      "iterate",
      c ? hs : Nt
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
function Tr(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function ff(e, t) {
  const n = {
    get(o) {
      const s = this.__v_raw, i = /* @__PURE__ */ ie(s), a = /* @__PURE__ */ ie(o);
      e || (lt(o, a) && Ee(i, "get", o), Ee(i, "get", a));
      const { has: c } = kr(i), f = t ? ms : e ? yn : Qe;
      if (c.call(i, o))
        return f(s.get(o));
      if (c.call(i, a))
        return f(s.get(a));
      s !== i && s.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && Ee(/* @__PURE__ */ ie(o), "iterate", Nt), o.size;
    },
    has(o) {
      const s = this.__v_raw, i = /* @__PURE__ */ ie(s), a = /* @__PURE__ */ ie(o);
      return e || (lt(o, a) && Ee(i, "has", o), Ee(i, "has", a)), o === a ? s.has(o) : s.has(o) || s.has(a);
    },
    forEach(o, s) {
      const i = this, a = i.__v_raw, c = /* @__PURE__ */ ie(a), f = t ? ms : e ? yn : Qe;
      return !e && Ee(c, "iterate", Nt), a.forEach((d, h) => o.call(s, f(d), f(h), i));
    }
  };
  return Oe(
    n,
    e ? {
      add: Tr("add"),
      set: Tr("set"),
      delete: Tr("delete"),
      clear: Tr("clear")
    } : {
      add(o) {
        const s = /* @__PURE__ */ ie(this), i = kr(s), a = /* @__PURE__ */ ie(o), c = !t && !/* @__PURE__ */ $e(o) && !/* @__PURE__ */ xt(o) ? a : o;
        return i.has.call(s, c) || lt(o, c) && i.has.call(s, o) || lt(a, c) && i.has.call(s, a) || (s.add(c), yt(s, "add", c, c)), this;
      },
      set(o, s) {
        !t && !/* @__PURE__ */ $e(s) && !/* @__PURE__ */ xt(s) && (s = /* @__PURE__ */ ie(s));
        const i = /* @__PURE__ */ ie(this), { has: a, get: c } = kr(i);
        let f = a.call(i, o);
        f || (o = /* @__PURE__ */ ie(o), f = a.call(i, o));
        const d = c.call(i, o);
        return i.set(o, s), f ? lt(s, d) && yt(i, "set", o, s) : yt(i, "add", o, s), this;
      },
      delete(o) {
        const s = /* @__PURE__ */ ie(this), { has: i, get: a } = kr(s);
        let c = i.call(s, o);
        c || (o = /* @__PURE__ */ ie(o), c = i.call(s, o)), a && a.call(s, o);
        const f = s.delete(o);
        return c && yt(s, "delete", o, void 0), f;
      },
      clear() {
        const o = /* @__PURE__ */ ie(this), s = o.size !== 0, i = o.clear();
        return s && yt(
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
    n[o] = uf(o, e, t);
  }), n;
}
function Bs(e, t) {
  const n = ff(e, t);
  return (r, o, s) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(
    le(n, o) && o in r ? n : r,
    o,
    s
  );
}
const df = {
  get: /* @__PURE__ */ Bs(!1, !1)
}, gf = {
  get: /* @__PURE__ */ Bs(!1, !0)
}, pf = {
  get: /* @__PURE__ */ Bs(!0, !1)
};
const ea = /* @__PURE__ */ new WeakMap(), ta = /* @__PURE__ */ new WeakMap(), na = /* @__PURE__ */ new WeakMap(), hf = /* @__PURE__ */ new WeakMap();
function mf(e) {
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
function fo(e) {
  return /* @__PURE__ */ xt(e) ? e : Ns(
    e,
    !1,
    lf,
    df,
    ea
  );
}
// @__NO_SIDE_EFFECTS__
function vf(e) {
  return Ns(
    e,
    !1,
    cf,
    gf,
    ta
  );
}
// @__NO_SIDE_EFFECTS__
function vs(e) {
  return Ns(
    e,
    !0,
    af,
    pf,
    na
  );
}
function Ns(e, t, n, r, o) {
  if (!ue(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const s = o.get(e);
  if (s)
    return s;
  const i = mf(Ku(e));
  if (i === 0)
    return e;
  const a = new Proxy(
    e,
    i === 2 ? r : n
  );
  return o.set(e, a), a;
}
// @__NO_SIDE_EFFECTS__
function $t(e) {
  return /* @__PURE__ */ xt(e) ? /* @__PURE__ */ $t(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function xt(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function $e(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function $s(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function ie(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ ie(t) : e;
}
function wf(e) {
  return !le(e, "__v_skip") && Object.isExtensible(e) && jl(e, "__v_skip", !0), e;
}
const Qe = (e) => ue(e) ? /* @__PURE__ */ fo(e) : e, yn = (e) => ue(e) ? /* @__PURE__ */ vs(e) : e;
// @__NO_SIDE_EFFECTS__
function Ae(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function fe(e) {
  return ra(e, !1);
}
// @__NO_SIDE_EFFECTS__
function yf(e) {
  return ra(e, !0);
}
function ra(e, t) {
  return /* @__PURE__ */ Ae(e) ? e : new bf(e, t);
}
class bf {
  constructor(t, n) {
    this.dep = new Vs(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ ie(t), this._value = n ? t : Qe(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, r = this.__v_isShallow || /* @__PURE__ */ $e(t) || /* @__PURE__ */ xt(t);
    t = r ? t : /* @__PURE__ */ ie(t), lt(t, n) && (this._rawValue = t, this._value = r ? t : Qe(t), this.dep.trigger());
  }
}
function Wt(e) {
  return /* @__PURE__ */ Ae(e) ? e.value : e;
}
const _f = {
  get: (e, t, n) => t === "__v_raw" ? e : Wt(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return /* @__PURE__ */ Ae(o) && !/* @__PURE__ */ Ae(n) ? (o.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function oa(e) {
  return /* @__PURE__ */ $t(e) ? e : new Proxy(e, _f);
}
class Sf {
  constructor(t, n, r) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Vs(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Zn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    ge !== this)
      return Wl(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Gl(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function xf(e, t, n = !1) {
  let r, o;
  return X(e) ? r = e : (r = e.get, o = e.set), new Sf(r, o, n);
}
const Fr = {}, qr = /* @__PURE__ */ new WeakMap();
let Bt;
function Rf(e, t = !1, n = Bt) {
  if (n) {
    let r = qr.get(n);
    r || qr.set(n, r = []), r.push(e);
  }
}
function Cf(e, t, n = pe) {
  const { immediate: r, deep: o, once: s, scheduler: i, augmentJob: a, call: c } = n, f = (_) => o ? _ : /* @__PURE__ */ $e(_) || o === !1 || o === 0 ? Ft(_, 1) : Ft(_);
  let d, h, w, y, M = !1, E = !1;
  if (/* @__PURE__ */ Ae(e) ? (h = () => e.value, M = /* @__PURE__ */ $e(e)) : /* @__PURE__ */ $t(e) ? (h = () => f(e), M = !0) : U(e) ? (E = !0, M = e.some((_) => /* @__PURE__ */ $t(_) || /* @__PURE__ */ $e(_)), h = () => e.map((_) => {
    if (/* @__PURE__ */ Ae(_))
      return _.value;
    if (/* @__PURE__ */ $t(_))
      return f(_);
    if (X(_))
      return c ? c(_, 2) : _();
  })) : X(e) ? t ? h = c ? () => c(e, 2) : e : h = () => {
    if (w) {
      _t();
      try {
        w();
      } finally {
        St();
      }
    }
    const _ = Bt;
    Bt = d;
    try {
      return c ? c(e, 3, [y]) : e(y);
    } finally {
      Bt = _;
    }
  } : h = ct, t && o) {
    const _ = h, D = o === !0 ? 1 / 0 : o;
    h = () => Ft(_(), D);
  }
  const A = Bl(), z = () => {
    d.stop(), A && A.active && Hs(A.effects, d);
  };
  if (s && t) {
    const _ = t;
    t = (...D) => {
      const j = _(...D);
      return z(), j;
    };
  }
  let I = E ? new Array(e.length).fill(Fr) : Fr;
  const O = (_) => {
    if (!(!(d.flags & 1) || !d.dirty && !_))
      if (t) {
        const D = d.run();
        if (_ || o || M || (E ? D.some((j, W) => lt(j, I[W])) : lt(D, I))) {
          w && w();
          const j = Bt;
          Bt = d;
          try {
            const W = [
              D,
              // pass undefined as the old value when it's changed for the first time
              I === Fr ? void 0 : E && I[0] === Fr ? [] : I,
              y
            ];
            I = D, c ? c(t, 3, W) : (
              // @ts-expect-error
              t(...W)
            );
          } finally {
            Bt = j;
          }
        }
      } else
        d.run();
  };
  return a && a(O), d = new Nl(h), d.scheduler = i ? () => i(O, !1) : O, y = (_) => Rf(_, !1, d), w = d.onStop = () => {
    const _ = qr.get(d);
    if (_) {
      if (c)
        c(_, 4);
      else
        for (const D of _) D();
      qr.delete(d);
    }
  }, t ? r ? O(!0) : I = d.run() : i ? i(O.bind(null, !0), !0) : d.run(), z.pause = d.pause.bind(d), z.resume = d.resume.bind(d), z.stop = z, z;
}
function Ft(e, t = 1 / 0, n) {
  if (t <= 0 || !ue(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ Ae(e))
    Ft(e.value, t, n);
  else if (U(e))
    for (let r = 0; r < e.length; r++)
      Ft(e[r], t, n);
  else if (Ur(e) || Ht(e))
    e.forEach((r) => {
      Ft(r, t, n);
    });
  else if (Hl(e)) {
    for (const r in e)
      Ft(e[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, r) && Ft(e[r], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function lr(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (o) {
    go(o, t, n);
  }
}
function et(e, t, n, r) {
  if (X(e)) {
    const o = lr(e, t, n, r);
    return o && Tl(o) && o.catch((s) => {
      go(s, t, n);
    }), o;
  }
  if (U(e)) {
    const o = [];
    for (let s = 0; s < e.length; s++)
      o.push(et(e[s], t, n, r));
    return o;
  }
}
function go(e, t, n, r = !0) {
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
      _t(), lr(s, null, 10, [
        e,
        c,
        f
      ]), St();
      return;
    }
  }
  If(e, n, o, r, i);
}
function If(e, t, n, r = !0, o = !1) {
  if (o)
    throw e;
  console.error(e);
}
const ke = [];
let rt = -1;
const mn = [];
let kt = null, gn = 0;
const sa = /* @__PURE__ */ Promise.resolve();
let Gr = null;
function He(e) {
  const t = Gr || sa;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Mf(e) {
  let t = rt + 1, n = ke.length;
  for (; t < n; ) {
    const r = t + n >>> 1, o = ke[r], s = Qn(o);
    s < e || s === e && o.flags & 2 ? t = r + 1 : n = r;
  }
  return t;
}
function Ws(e) {
  if (!(e.flags & 1)) {
    const t = Qn(e), n = ke[ke.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Qn(n) ? ke.push(e) : ke.splice(Mf(t), 0, e), e.flags |= 1, ia();
  }
}
function ia() {
  Gr || (Gr = sa.then(aa));
}
function Ef(e) {
  if (!U(e))
    kt && e.id === -1 ? kt.splice(gn + 1, 0, e) : e.flags & 1 || (mn.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      mn.push(e[t]);
  ia();
}
function Hi(e, t, n = rt + 1) {
  for (; n < ke.length; n++) {
    const r = ke[n];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid)
        continue;
      ke.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function la(e) {
  if (mn.length) {
    const t = [...new Set(mn)].sort(
      (n, r) => Qn(n) - Qn(r)
    );
    if (mn.length = 0, kt) {
      for (let n = 0; n < t.length; n++)
        kt.push(t[n]);
      return;
    }
    for (kt = t, gn = 0; gn < kt.length; gn++) {
      const n = kt[gn];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    kt = null, gn = 0;
  }
}
const Qn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function aa(e) {
  try {
    for (rt = 0; rt < ke.length; rt++) {
      const t = ke[rt];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), lr(
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
    rt = -1, ke.length = 0, la(), Gr = null, (ke.length || mn.length) && aa();
  }
}
let at = null, ca = null;
function Xr(e) {
  const t = at;
  return at = e, ca = e && e.type.__scopeId || null, t;
}
function Af(e, t = at, n) {
  if (!t || e._n)
    return e;
  const r = (...o) => {
    r._d && qi(-1);
    const s = Xr(t), i = Ut.length;
    let a;
    try {
      a = e(...o);
    } finally {
      for (let c = Ut.length; c > i; c--) ka();
      Xr(s), r._d && qi(1);
    }
    return a;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function Kt(e, t, n, r) {
  const o = e.dirs, s = t && t.dirs;
  for (let i = 0; i < o.length; i++) {
    const a = o[i];
    s && (a.oldValue = s[i].value);
    let c = a.dir[r];
    c && (_t(), et(c, n, 8, [
      e.el,
      a,
      e,
      t
    ]), St());
  }
}
function Of(e, t) {
  if (Te) {
    let n = Te.provides;
    const r = Te.parent && Te.parent.provides;
    r === n && (n = Te.provides = Object.create(r)), n[e] = t;
  }
}
function Br(e, t, n = !1) {
  const r = Id();
  if (r || vn) {
    let o = vn ? vn._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && X(t) ? t.call(r && r.proxy) : t;
  }
}
const Pf = /* @__PURE__ */ Symbol.for("v-scx"), Df = () => Br(Pf);
function ye(e, t, n) {
  return ua(e, t, n);
}
function ua(e, t, n = pe) {
  const { immediate: r, deep: o, flush: s, once: i } = n, a = Oe({}, n), c = t && r || !t && s !== "post";
  let f;
  if (nr) {
    if (s === "sync") {
      const y = Df();
      f = y.__watcherHandles || (y.__watcherHandles = []);
    } else if (!c) {
      const y = () => {
      };
      return y.stop = ct, y.resume = ct, y.pause = ct, y;
    }
  }
  const d = Te;
  a.call = (y, M, E) => et(y, d, M, E);
  let h = !1;
  s === "post" ? a.scheduler = (y) => {
    Le(y, d && d.suspense);
  } : s !== "sync" && (h = !0, a.scheduler = (y, M) => {
    M ? y() : Ws(y);
  }), a.augmentJob = (y) => {
    t && (y.flags |= 4), h && (y.flags |= 2, d && (y.id = d.uid, y.i = d));
  };
  const w = Cf(e, t, a);
  return nr && (f ? f.push(w) : c && w()), w;
}
function kf(e, t, n) {
  const r = this.proxy, o = be(e) ? e.includes(".") ? fa(r, e) : () => r[e] : e.bind(r, r);
  let s;
  X(t) ? s = t : (s = t.handler, n = t);
  const i = ar(this), a = ua(o, s.bind(r), n);
  return i(), a;
}
function fa(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++)
      r = r[n[o]];
    return r;
  };
}
const Tf = /* @__PURE__ */ Symbol("_vte"), po = (e) => e.__isTeleport, Qo = /* @__PURE__ */ Symbol("_leaveCb");
function Ff(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== Rt) {
        t = n;
        break;
      }
  }
  return t;
}
function da(e) {
  if (!qs(e))
    return po(e.type) && e.children ? Ff(e.children) : e;
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
function Us(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    Us(
      po(n.type) && da(n) || n,
      t
    );
  } else e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function ga(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Li(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const Yr = /* @__PURE__ */ new WeakMap();
function Un(e, t, n, r, o = !1) {
  if (U(e)) {
    e.forEach(
      (E, A) => Un(
        E,
        t && (U(t) ? t[A] : t),
        n,
        r,
        o
      )
    );
    return;
  }
  if (qn(r) && !o) {
    r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && Un(e, t, n, r.component.subTree);
    return;
  }
  const s = r.shapeFlag & 4 ? Ys(r.component) : r.el, i = o ? null : s, { i: a, r: c } = e, f = t && t.r, d = a.refs === pe ? a.refs = {} : a.refs, h = a.setupState, w = /* @__PURE__ */ ie(h), y = h === pe ? kl : (E) => Li(d, E) ? !1 : le(w, E), M = (E, A) => !(A && Li(d, A));
  if (f != null && f !== c) {
    if (ji(t), be(f))
      d[f] = null, y(f) && (h[f] = null);
    else if (/* @__PURE__ */ Ae(f)) {
      const E = t;
      M(f, E.k) && (f.value = null), E.k && (d[E.k] = null);
    }
  }
  if (X(c))
    lr(c, a, 12, [i, d]);
  else {
    const E = be(c), A = /* @__PURE__ */ Ae(c);
    if (E || A) {
      const z = () => {
        if (e.f) {
          const I = E ? y(c) ? h[c] : d[c] : M() || !e.k ? c.value : d[e.k];
          if (o)
            U(I) && Hs(I, s);
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
          z(), Yr.delete(e);
        };
        I.id = -1, Yr.set(e, I), Le(I, n);
      } else
        ji(e), z();
    }
  }
}
function ji(e) {
  const t = Yr.get(e);
  t && (t.flags |= 8, Yr.delete(e));
}
ao().requestIdleCallback;
ao().cancelIdleCallback;
const qn = (e) => !!e.type.__asyncLoader, qs = (e) => e.type.__isKeepAlive;
function Hf(e, t) {
  pa(e, "a", t);
}
function Lf(e, t) {
  pa(e, "da", t);
}
function pa(e, t, n = Te) {
  const r = e.__wdc || (e.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (ho(t, r, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      qs(o.parent.vnode) && jf(r, t, n, o), o = o.parent;
  }
}
function jf(e, t, n, r) {
  const o = ho(
    t,
    e,
    r,
    !0
    /* prepend */
  );
  ha(() => {
    Hs(r[t], o);
  }, n);
}
function ho(e, t, n = Te, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), s = t.__weh || (t.__weh = (...i) => {
      _t();
      const a = ar(n), c = et(t, n, e, i);
      return a(), St(), c;
    });
    return r ? o.unshift(s) : o.push(s), s;
  }
}
const It = (e) => (t, n = Te) => {
  (!nr || e === "sp") && ho(e, (...r) => t(...r), n);
}, zf = It("bm"), ws = It("m"), Kf = It(
  "bu"
), Vf = It("u"), ys = It(
  "bum"
), ha = It("um"), Bf = It(
  "sp"
), Nf = It("rtg"), $f = It("rtc");
function Wf(e, t = Te) {
  ho("ec", e, t);
}
const Uf = /* @__PURE__ */ Symbol.for("v-ndc");
function jn(e, t, n, r) {
  let o;
  const s = n, i = U(e);
  if (i || be(e)) {
    const a = i && /* @__PURE__ */ $t(e);
    let c = !1, f = !1;
    a && (c = !/* @__PURE__ */ $e(e), f = /* @__PURE__ */ xt(e), e = uo(e)), o = new Array(e.length);
    for (let d = 0, h = e.length; d < h; d++)
      o[d] = t(
        c ? f ? yn(Qe(e[d])) : Qe(e[d]) : e[d],
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
const bs = (e) => e ? La(e) ? Ys(e) : bs(e.parent) : null, Gn = (
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
    $parent: (e) => bs(e.parent),
    $root: (e) => bs(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => va(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Ws(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = He.bind(e.proxy)),
    $watch: (e) => kf.bind(e)
  })
), es = (e, t) => e !== pe && !e.__isScriptSetup && le(e, t), qf = {
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
        if (es(r, t))
          return i[t] = 1, r[t];
        if (o !== pe && le(o, t))
          return i[t] = 2, o[t];
        if (le(s, t))
          return i[t] = 3, s[t];
        if (n !== pe && le(n, t))
          return i[t] = 4, n[t];
        _s && (i[t] = 0);
      }
    }
    const f = Gn[t];
    let d, h;
    if (f)
      return t === "$attrs" && Ee(e.attrs, "get", ""), f(e);
    if (
      // css module (injected by vue-loader)
      (d = a.__cssModules) && (d = d[t])
    )
      return d;
    if (n !== pe && le(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      h = c.config.globalProperties, le(h, t)
    )
      return h[t];
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: o, ctx: s } = e;
    return es(o, t) ? (o[t] = n, !0) : r !== pe && le(r, t) ? (r[t] = n, !0) : le(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (s[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: o, props: s, type: i }
  }, a) {
    let c;
    return !!(n[a] || e !== pe && a[0] !== "$" && le(e, a) || es(t, a) || le(s, a) || le(r, a) || le(Gn, a) || le(o.config.globalProperties, a) || (c = i.__cssModules) && c[a]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : le(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function zi(e) {
  return U(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let _s = !0;
function Gf(e) {
  const t = va(e), n = e.proxy, r = e.ctx;
  _s = !1, t.beforeCreate && Ki(t.beforeCreate, e, "bc");
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
    expose: ee,
    inheritAttrs: ae,
    // assets
    components: Y,
    directives: he,
    filters: Re
  } = t;
  if (f && Xf(f, r, null), i)
    for (const J in i) {
      const ce = i[J];
      X(ce) && (r[J] = ce.bind(n));
    }
  if (o) {
    const J = o.call(n, n);
    ue(J) && (e.data = /* @__PURE__ */ fo(J));
  }
  if (_s = !0, s)
    for (const J in s) {
      const ce = s[J], Ce = X(ce) ? ce.bind(n, n) : X(ce.get) ? ce.get.bind(n, n) : ct, Mt = !X(ce) && X(ce.set) ? ce.set.bind(n) : ct, gt = $({
        get: Ce,
        set: Mt
      });
      Object.defineProperty(r, J, {
        enumerable: !0,
        configurable: !0,
        get: () => gt.value,
        set: (ze) => gt.value = ze
      });
    }
  if (a)
    for (const J in a)
      ma(a[J], r, n, J);
  if (c) {
    const J = X(c) ? c.call(n) : c;
    Reflect.ownKeys(J).forEach((ce) => {
      Of(ce, J[ce]);
    });
  }
  d && Ki(d, e, "c");
  function q(J, ce) {
    U(ce) ? ce.forEach((Ce) => J(Ce.bind(n))) : ce && J(ce.bind(n));
  }
  if (q(zf, h), q(ws, w), q(Kf, y), q(Vf, M), q(Hf, E), q(Lf, A), q(Wf, K), q($f, j), q(Nf, W), q(ys, I), q(ha, _), q(Bf, L), U(ee))
    if (ee.length) {
      const J = e.exposed || (e.exposed = {});
      ee.forEach((ce) => {
        Object.defineProperty(J, ce, {
          get: () => n[ce],
          set: (Ce) => n[ce] = Ce,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  D && e.render === ct && (e.render = D), ae != null && (e.inheritAttrs = ae), Y && (e.components = Y), he && (e.directives = he), L && ga(e);
}
function Xf(e, t, n = ct) {
  U(e) && (e = Ss(e));
  for (const r in e) {
    const o = e[r];
    let s;
    ue(o) ? "default" in o ? s = Br(
      o.from || r,
      o.default,
      !0
    ) : s = Br(o.from || r) : s = Br(o), /* @__PURE__ */ Ae(s) ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (i) => s.value = i
    }) : t[r] = s;
  }
}
function Ki(e, t, n) {
  et(
    U(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function ma(e, t, n, r) {
  let o = r.includes(".") ? fa(n, r) : () => n[r];
  if (be(e)) {
    const s = t[e];
    X(s) && ye(o, s);
  } else if (X(e))
    ye(o, e.bind(n));
  else if (ue(e))
    if (U(e))
      e.forEach((s) => ma(s, t, n, r));
    else {
      const s = X(e.handler) ? e.handler.bind(n) : t[e.handler];
      X(s) && ye(o, s, e);
    }
}
function va(e) {
  const t = e.type, { mixins: n, extends: r } = t, {
    mixins: o,
    optionsCache: s,
    config: { optionMergeStrategies: i }
  } = e.appContext, a = s.get(t);
  let c;
  return a ? c = a : !o.length && !n && !r ? c = t : (c = {}, o.length && o.forEach(
    (f) => Zr(c, f, i, !0)
  ), Zr(c, t, i)), ue(t) && s.set(t, c), c;
}
function Zr(e, t, n, r = !1) {
  const { mixins: o, extends: s } = t;
  s && Zr(e, s, n, !0), o && o.forEach(
    (i) => Zr(e, i, n, !0)
  );
  for (const i in t)
    if (!(r && i === "expose")) {
      const a = Yf[i] || n && n[i];
      e[i] = a ? a(e[i], t[i]) : t[i];
    }
  return e;
}
const Yf = {
  data: Vi,
  props: Bi,
  emits: Bi,
  // objects
  methods: Vn,
  computed: Vn,
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
  components: Vn,
  directives: Vn,
  // watch
  watch: Jf,
  // provide / inject
  provide: Vi,
  inject: Zf
};
function Vi(e, t) {
  return t ? e ? function() {
    return Oe(
      X(e) ? e.call(this, this) : e,
      X(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Zf(e, t) {
  return Vn(Ss(e), Ss(t));
}
function Ss(e) {
  if (U(e)) {
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
function Vn(e, t) {
  return e ? Oe(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Bi(e, t) {
  return e ? U(e) && U(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Oe(
    /* @__PURE__ */ Object.create(null),
    zi(e),
    zi(t ?? {})
  ) : t;
}
function Jf(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Oe(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = De(e[r], t[r]);
  return n;
}
function wa() {
  return {
    app: null,
    config: {
      isNativeTag: kl,
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
let Qf = 0;
function ed(e, t) {
  return function(r, o = null) {
    X(r) || (r = Oe({}, r)), o != null && !ue(o) && (o = null);
    const s = wa(), i = /* @__PURE__ */ new WeakSet(), a = [];
    let c = !1;
    const f = s.app = {
      _uid: Qf++,
      _component: r,
      _props: o,
      _container: null,
      _context: s,
      _instance: null,
      version: Dd,
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
          const y = f._ceVNode || bt(r, o);
          return y.appContext = s, w === !0 ? w = "svg" : w === !1 && (w = void 0), e(y, d, w), c = !0, f._container = d, d.__vue_app__ = f, Ys(y.component);
        }
      },
      onUnmount(d) {
        a.push(d);
      },
      unmount() {
        c && (et(
          a,
          f._instance,
          16
        ), e(null, f._container), delete f._container.__vue_app__);
      },
      provide(d, h) {
        return s.provides[d] = h, f;
      },
      runWithContext(d) {
        const h = vn;
        vn = f;
        try {
          return d();
        } finally {
          vn = h;
        }
      }
    };
    return f;
  };
}
let vn = null;
const td = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Ze(t)}Modifiers`] || e[`${Yt(t)}Modifiers`];
function nd(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || pe;
  let o = n;
  const s = t.startsWith("update:"), i = s && td(r, t.slice(7));
  i && (i.trim && (o = n.map((d) => be(d) ? d.trim() : d)), i.number && (o = o.map(Nu)));
  let a, c = r[a = qo(t)] || // also try camelCase event handler (#2249)
  r[a = qo(Ze(t))];
  !c && s && (c = r[a = qo(Yt(t))]), c && et(
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
    e.emitted[a] = !0, et(
      f,
      e,
      6,
      o
    );
  }
}
const rd = /* @__PURE__ */ new WeakMap();
function ya(e, t, n = !1) {
  const r = n ? rd : t.emitsCache, o = r.get(e);
  if (o !== void 0)
    return o;
  const s = e.emits;
  let i = {}, a = !1;
  if (!X(e)) {
    const c = (f) => {
      const d = ya(f, t, !0);
      d && (a = !0, Oe(i, d));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !s && !a ? (ue(e) && r.set(e, null), null) : (U(s) ? s.forEach((c) => i[c] = null) : Oe(i, s), ue(e) && r.set(e, i), i);
}
function mo(e, t) {
  return !e || !so(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), le(e, t[0].toLowerCase() + t.slice(1)) || le(e, Yt(t)) || le(e, t));
}
function Ni(e) {
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
  } = e, A = Xr(e);
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
      ), I = t.props ? a : od(a);
    }
  } catch (_) {
    Ut.length = 0, go(_, e, 1), z = bt(Rt);
  }
  let O = z;
  if (I && E !== !1) {
    const _ = Object.keys(I), { shapeFlag: D } = O;
    _.length && D & 7 && (s && _.some(io) && (I = sd(
      I,
      s
    )), O = bn(O, I, !1, !0));
  }
  if (n.dirs && (O = bn(O, null, !1, !0), O.dirs = O.dirs ? O.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const _ = po(O.type) && da(O) || O;
    Us(_, n.transition);
  }
  return z = O, Xr(A), z;
}
const od = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || so(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, sd = (e, t) => {
  const n = {};
  for (const r in e)
    (!io(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
  return n;
};
function id(e, t, n) {
  const { props: r, children: o, component: s } = e, { props: i, children: a, patchFlag: c } = t, f = s.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return r ? $i(r, i, f) : !!i;
    if (c & 8) {
      const d = t.dynamicProps;
      for (let h = 0; h < d.length; h++) {
        const w = d[h];
        if (ba(i, r, w) && !mo(f, w))
          return !0;
      }
    }
  } else
    return (o || a) && (!a || !a.$stable) ? !0 : r === i ? !1 : r ? i ? $i(r, i, f) : !0 : !!i;
  return !1;
}
function $i(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < r.length; o++) {
    const s = r[o];
    if (ba(t, e, s) && !mo(n, s))
      return !0;
  }
  return !1;
}
function ba(e, t, n) {
  const r = e[n], o = t[n];
  return n === "style" && ue(r) && ue(o) ? !co(r, o) : r !== o;
}
function ld({ vnode: e, parent: t, suspense: n }, r) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.suspense.vnode.el = o.el = r, e = o), o === e)
      (e = t.vnode).el = r, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = r);
}
const _a = {}, Sa = () => Object.create(_a), xa = (e) => Object.getPrototypeOf(e) === _a;
function ad(e, t, n, r = !1) {
  const o = {}, s = Sa();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Ra(e, t, o, s);
  for (const i in e.propsOptions[0])
    i in o || (o[i] = void 0);
  n ? e.props = r ? o : /* @__PURE__ */ vf(o) : e.type.props ? e.props = o : e.props = s, e.attrs = s;
}
function cd(e, t, n, r) {
  const {
    props: o,
    attrs: s,
    vnode: { patchFlag: i }
  } = e, a = /* @__PURE__ */ ie(o), [c] = e.propsOptions;
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
        if (mo(e.emitsOptions, w))
          continue;
        const y = t[w];
        if (c)
          if (le(s, w))
            y !== s[w] && (s[w] = y, f = !0);
          else {
            const M = Ze(w);
            o[M] = xs(
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
    Ra(e, t, o, s) && (f = !0);
    let d;
    for (const h in a)
      (!t || // for camelCase
      !le(t, h) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((d = Yt(h)) === h || !le(t, d))) && (c ? n && // for camelCase
      (n[h] !== void 0 || // for kebab-case
      n[d] !== void 0) && (o[h] = xs(
        c,
        a,
        h,
        void 0,
        e,
        !0
      )) : delete o[h]);
    if (s !== a)
      for (const h in s)
        (!t || !le(t, h)) && (delete s[h], f = !0);
  }
  f && yt(e.attrs, "set", "");
}
function Ra(e, t, n, r) {
  const [o, s] = e.propsOptions;
  let i = !1, a;
  if (t)
    for (let c in t) {
      if (Nn(c))
        continue;
      const f = t[c];
      let d;
      o && le(o, d = Ze(c)) ? !s || !s.includes(d) ? n[d] = f : (a || (a = {}))[d] = f : mo(e.emitsOptions, c) || (!(c in r) || f !== r[c]) && (r[c] = f, i = !0);
    }
  if (s) {
    const c = /* @__PURE__ */ ie(n), f = a || pe;
    for (let d = 0; d < s.length; d++) {
      const h = s[d];
      n[h] = xs(
        o,
        c,
        h,
        f[h],
        e,
        !le(f, h)
      );
    }
  }
  return i;
}
function xs(e, t, n, r, o, s) {
  const i = e[n];
  if (i != null) {
    const a = le(i, "default");
    if (a && r === void 0) {
      const c = i.default;
      if (i.type !== Function && !i.skipFactory && X(c)) {
        const { propsDefaults: f } = o;
        if (n in f)
          r = f[n];
        else {
          const d = ar(o);
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
    ] && (r === "" || r === Yt(n)) && (r = !0));
  }
  return r;
}
const ud = /* @__PURE__ */ new WeakMap();
function Ca(e, t, n = !1) {
  const r = n ? ud : t.propsCache, o = r.get(e);
  if (o)
    return o;
  const s = e.props, i = {}, a = [];
  let c = !1;
  if (!X(e)) {
    const d = (h) => {
      c = !0;
      const [w, y] = Ca(h, t, !0);
      Oe(i, w), y && a.push(...y);
    };
    !n && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  if (!s && !c)
    return ue(e) && r.set(e, hn), hn;
  if (U(s))
    for (let d = 0; d < s.length; d++) {
      const h = Ze(s[d]);
      Wi(h) && (i[h] = pe);
    }
  else if (s)
    for (const d in s) {
      const h = Ze(d);
      if (Wi(h)) {
        const w = s[d], y = i[h] = U(w) || X(w) ? { type: w } : Oe({}, w), M = y.type;
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
        ] = A, (E || le(y, "default")) && a.push(h);
      }
    }
  const f = [i, a];
  return ue(e) && r.set(e, f), f;
}
function Wi(e) {
  return e[0] !== "$" && !Nn(e);
}
const Gs = (e) => e === "_" || e === "_ctx" || e === "$stable", Xs = (e) => U(e) ? e.map(it) : [it(e)], fd = (e, t, n) => {
  if (t._n)
    return t;
  const r = Af((...o) => Xs(t(...o)), n);
  return r._c = !1, r;
}, Ia = (e, t, n) => {
  const r = e._ctx;
  for (const o in e) {
    if (Gs(o)) continue;
    const s = e[o];
    if (X(s))
      t[o] = fd(o, s, r);
    else if (s != null) {
      const i = Xs(s);
      t[o] = () => i;
    }
  }
}, Ma = (e, t) => {
  const n = Xs(t);
  e.slots.default = () => n;
}, Ea = (e, t, n) => {
  for (const r in t)
    (n || !Gs(r)) && (e[r] = t[r]);
}, dd = (e, t, n) => {
  const r = e.slots = Sa();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (Ea(r, t, n), n && jl(r, "_", o, !0)) : Ia(t, r);
  } else t && Ma(e, t);
}, gd = (e, t, n) => {
  const { vnode: r, slots: o } = e;
  let s = !0, i = pe;
  if (r.shapeFlag & 32) {
    const a = t._;
    a ? n && a === 1 ? s = !1 : Ea(o, t, n) : (s = !t.$stable, Ia(t, o)), i = t;
  } else t && (Ma(e, t), i = { default: 1 });
  if (s)
    for (const a in o)
      !Gs(a) && i[a] == null && delete o[a];
}, Le = wd;
function pd(e) {
  return hd(e);
}
function hd(e, t) {
  const n = ao();
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
    p && !zn(p, m) && (R = tn(p), ze(p, C, S, !0), p = null), m.patchFlag === -2 && (P = !1, m.dynamicChildren = null);
    const { type: x, ref: B, shapeFlag: H } = m;
    switch (x) {
      case vo:
        A(p, m, b, R);
        break;
      case Rt:
        z(p, m, b, R);
        break;
      case ns:
        p == null && I(m, b, R, F);
        break;
      case Me:
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
          qe
        );
    }
    B != null && C ? Un(B, p && p.ref, S, m || p, !m) : B == null && p && p.ref != null && Un(p.ref, null, S, p, !0);
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
      ts(p, S),
      F,
      T
    ), N && Kt(p, null, R, "created"), W(P, p, p.scopeId, F, R), B) {
      for (const oe in B)
        oe !== "value" && !Nn(oe) && s(P, oe, null, B[oe], S, R);
      "value" in B && s(P, "value", null, B.value, S), (x = B.onVnodeBeforeMount) && nt(x, R, p);
    }
    N && Kt(p, null, R, "beforeMount");
    const Q = md(C, V);
    Q && V.beforeEnter(P), r(P, m, b), ((x = B && B.onVnodeMounted) || Q || N) && Le(() => {
      try {
        x && nt(x, R, p), Q && V.enter(P), N && Kt(p, null, R, "mounted");
      } finally {
      }
    }, C);
  }, W = (p, m, b, R, C) => {
    if (b && y(p, b), R)
      for (let S = 0; S < R.length; S++)
        y(p, R[S]);
    if (C) {
      let S = C.subTree;
      if (m === S || Da(S.type) && (S.ssContent === m || S.ssFallback === m)) {
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
      const B = p[x] = T ? wt(p[x]) : it(p[x]);
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
    if (b && Vt(b, !1), (N = V.onVnodeBeforeUpdate) && nt(N, b, m, p), B && Kt(m, p, b, "beforeUpdate"), b && Vt(b, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    x && (!p.dynamicChildren || p.dynamicChildren.length !== x.length) && (P = 0, F = !1, x = null), (H.innerHTML && V.innerHTML == null || H.textContent && V.textContent == null) && d(T, ""), x ? ee(
      p.dynamicChildren,
      x,
      T,
      b,
      R,
      ts(m, C),
      S
    ) : F || ce(
      p,
      m,
      T,
      null,
      b,
      R,
      ts(m, C),
      S,
      !1
    ), P > 0) {
      if (P & 16)
        ae(T, H, V, b, C);
      else if (P & 2 && H.class !== V.class && s(T, "class", null, V.class, C), P & 4 && s(T, "style", H.style, V.style, C), P & 8) {
        const Q = m.dynamicProps;
        for (let oe = 0; oe < Q.length; oe++) {
          const se = Q[oe], me = H[se], _e = V[se];
          (_e !== me || se === "value") && s(T, se, me, _e, C, b);
        }
      }
      P & 1 && p.children !== m.children && d(T, m.children);
    } else !F && x == null && ae(T, H, V, b, C);
    ((N = V.onVnodeUpdated) || B) && Le(() => {
      N && nt(N, b, m, p), B && Kt(m, p, b, "updated");
    }, R);
  }, ee = (p, m, b, R, C, S, F) => {
    for (let T = 0; T < m.length; T++) {
      const P = p[T], x = m[T], B = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        P.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (P.type === Me || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !zn(P, x) || // - In the case of a component, it could contain anything.
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
  }, ae = (p, m, b, R, C) => {
    if (m !== b) {
      if (m !== pe)
        for (const S in m)
          !Nn(S) && !(S in b) && s(
            p,
            S,
            m[S],
            null,
            C,
            R
          );
      for (const S in b) {
        if (Nn(S)) continue;
        const F = b[S], T = m[S];
        F !== T && S !== "value" && s(p, S, T, F, C, R);
      }
      "value" in b && s(p, "value", m.value, b.value, C);
    }
  }, Y = (p, m, b, R, C, S, F, T, P) => {
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
    (m.key != null || C && m === C.subTree) && Aa(
      p,
      m,
      !0
      /* shallow */
    )) : ce(
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
    const T = p.component = Cd(
      p,
      R,
      C
    );
    if (qs(p) && (T.ctx.renderer = qe), Md(T, !1, F), T.asyncDep) {
      if (C && C.registerDep(T, q, F), !p.el) {
        const P = T.subTree = bt(Rt);
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
    if (id(p, m, b))
      if (R.asyncDep && !R.asyncResolved) {
        J(R, m, b);
        return;
      } else
        R.next = m, R.update();
    else
      m.el = p.el, R.vnode = m;
  }, q = (p, m, b, R, C, S, F) => {
    const T = () => {
      if (p.isMounted) {
        let { next: H, bu: V, u: N, parent: Q, vnode: oe } = p;
        {
          const Ve = Oa(p);
          if (Ve) {
            H && (H.el = oe.el, J(p, H, F)), Ve.asyncDep.then(() => {
              Le(() => {
                p.isUnmounted || x();
              }, C);
            });
            return;
          }
        }
        let se = H, me;
        Vt(p, !1), H ? (H.el = oe.el, J(p, H, F)) : H = oe, V && Go(V), (me = H.props && H.props.onVnodeBeforeUpdate) && nt(me, Q, H, oe), Vt(p, !0);
        const _e = Ni(p), Ke = p.subTree;
        p.subTree = _e, E(
          Ke,
          _e,
          // parent may have changed if it's in a teleport
          h(Ke.el),
          // anchor may have changed if it's in a fragment
          tn(Ke),
          p,
          C,
          S
        ), H.el = _e.el, se === null && ld(p, _e.el), N && Le(N, C), (me = H.props && H.props.onVnodeUpdated) && Le(
          () => nt(me, Q, H, oe),
          C
        );
      } else {
        let H;
        const { el: V, props: N } = m, { bm: Q, m: oe, parent: se, root: me, type: _e } = p, Ke = qn(m);
        Vt(p, !1), Q && Go(Q), !Ke && (H = N && N.onVnodeBeforeMount) && nt(H, se, m), Vt(p, !0);
        {
          me.ce && me.ce._hasShadowRoot() && me.ce._injectChildStyle(
            _e,
            p.parent ? p.parent.type : void 0
          );
          const Ve = p.subTree = Ni(p);
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
        if (oe && Le(oe, C), !Ke && (H = N && N.onVnodeMounted)) {
          const Ve = m;
          Le(
            () => nt(H, se, Ve),
            C
          );
        }
        (m.shapeFlag & 256 || se && qn(se.vnode) && se.vnode.shapeFlag & 256) && p.a && Le(p.a, C), p.isMounted = !0, m = b = R = null;
      }
    };
    p.scope.on();
    const P = p.effect = new Nl(T);
    p.scope.off();
    const x = p.update = P.run.bind(P), B = p.job = P.runIfDirty.bind(P);
    B.i = p, B.id = p.uid, P.scheduler = () => Ws(B), Vt(p, !0), x();
  }, J = (p, m, b) => {
    m.component = p;
    const R = p.vnode.props;
    p.vnode = m, p.next = null, cd(p, m.props, R, b), gd(p, m.children, b), _t(), Hi(p), St();
  }, ce = (p, m, b, R, C, S, F, T, P = !1) => {
    const x = p && p.children, B = p ? p.shapeFlag : 0, H = m.children, { patchFlag: V, shapeFlag: N } = m;
    if (V > 0) {
      if (V & 128) {
        Mt(
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
    N & 8 ? (B & 16 && Lt(x, C, S), H !== x && d(b, H)) : B & 16 ? N & 16 ? Mt(
      x,
      H,
      b,
      R,
      C,
      S,
      F,
      T,
      P
    ) : Lt(x, C, S, !0) : (B & 8 && d(b, ""), N & 16 && K(
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
    p = p || hn, m = m || hn;
    const x = p.length, B = m.length, H = Math.min(x, B);
    let V;
    for (V = 0; V < H; V++) {
      const N = m[V] = P ? wt(m[V]) : it(m[V]);
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
    x > B ? Lt(
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
  }, Mt = (p, m, b, R, C, S, F, T, P) => {
    let x = 0;
    const B = m.length;
    let H = p.length - 1, V = B - 1;
    for (; x <= H && x <= V; ) {
      const N = p[x], Q = m[x] = P ? wt(m[x]) : it(m[x]);
      if (zn(N, Q))
        E(
          N,
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
      const N = p[H], Q = m[V] = P ? wt(m[V]) : it(m[V]);
      if (zn(N, Q))
        E(
          N,
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
        const N = V + 1, Q = N < B ? m[N].el : R;
        for (; x <= V; )
          E(
            null,
            m[x] = P ? wt(m[x]) : it(m[x]),
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
      const N = x, Q = x, oe = /* @__PURE__ */ new Map();
      for (x = Q; x <= V; x++) {
        const Pe = m[x] = P ? wt(m[x]) : it(m[x]);
        Pe.key != null && oe.set(Pe.key, x);
      }
      let se, me = 0;
      const _e = V - Q + 1;
      let Ke = !1, Ve = 0;
      const Ge = new Array(_e);
      for (x = 0; x < _e; x++) Ge[x] = 0;
      for (x = N; x <= H; x++) {
        const Pe = p[x];
        if (me >= _e) {
          ze(Pe, C, S, !0);
          continue;
        }
        let Be;
        if (Pe.key != null)
          Be = oe.get(Pe.key);
        else
          for (se = Q; se <= V; se++)
            if (Ge[se - Q] === 0 && zn(Pe, m[se])) {
              Be = se;
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
        ), me++);
      }
      const Et = Ke ? vd(Ge) : hn;
      for (se = Et.length - 1, x = _e - 1; x >= 0; x--) {
        const Pe = Q + x, Be = m[Pe], nn = m[Pe + 1], hr = Pe + 1 < B ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          nn.el || Pa(nn)
        ) : R;
        Ge[x] === 0 ? E(
          null,
          Be,
          b,
          hr,
          C,
          S,
          F,
          T,
          P
        ) : Ke && (se < 0 || x !== Et[se] ? gt(Be, b, hr, 2) : se--);
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
      F.move(p, m, b, qe);
      return;
    }
    if (F === Me) {
      r(S, m, b);
      for (let H = 0; H < P.length; H++)
        gt(P[H], m, b, R);
      r(p.anchor, m, b);
      return;
    }
    if (F === ns) {
      O(p, m, b);
      return;
    }
    if (R !== 2 && x & 1 && T)
      if (R === 0)
        T.persisted && !S[Qo] ? r(S, m, b) : (T.beforeEnter(S), r(S, m, b), Le(() => T.enter(S), C));
      else {
        const { leave: H, delayLeave: V, afterLeave: N } = T, Q = () => {
          p.ctx.isUnmounted ? o(S) : r(S, m, b);
        }, oe = () => {
          const se = S._isLeaving || !!S[Qo];
          S._isLeaving && S[Qo](
            !0
            /* cancelled */
          ), T.persisted && !se ? Q() : H(S, () => {
            Q(), N && N();
          });
        };
        V ? V(S, Q, oe) : oe();
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
      shapeFlag: B,
      patchFlag: H,
      dirs: V,
      cacheIndex: N,
      memo: Q
    } = p;
    if (H === -2 && (C = !1), T != null && (_t(), Un(T, null, b, p, !0), St()), N != null && (m.renderCache[N] = void 0), B & 256) {
      m.ctx.deactivate(p);
      return;
    }
    const oe = B & 1 && V, se = !qn(p);
    let me;
    if (se && (me = F && F.onVnodeBeforeUnmount) && nt(me, m, p), B & 6)
      xn(p.component, b, R);
    else {
      if (B & 128) {
        p.suspense.unmount(b, R);
        return;
      }
      oe && Kt(p, null, m, "beforeUnmount"), B & 64 ? p.type.remove(
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
      (S !== Me || H > 0 && H & 64) ? Lt(
        x,
        m,
        b,
        !1,
        !0
      ) : (S === Me && H & 384 || !C && B & 16) && Lt(P, m, b), R && de(p);
    }
    const _e = Q != null && N == null;
    (se && (me = F && F.onVnodeUnmounted) || oe || _e) && Le(() => {
      me && nt(me, m, p), oe && Kt(p, null, m, "unmounted"), _e && (p.el = null);
    }, b);
  }, de = (p) => {
    const { type: m, el: b, anchor: R, transition: C } = p;
    if (m === Me) {
      Ue(b, R);
      return;
    }
    if (m === ns) {
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
  }, xn = (p, m, b) => {
    const { bum: R, scope: C, job: S, subTree: F, um: T, m: P, a: x } = p;
    Ui(P), Ui(x), R && Go(R), C.stop(), S && (S.flags |= 8, ze(F, p, m, b)), T && Le(T, m), Le(() => {
      p.isUnmounted = !0;
    }, m);
  }, Lt = (p, m, b, R = !1, C = !1, S = 0) => {
    for (let F = S; F < p.length; F++)
      ze(p[F], m, b, R, C);
  }, tn = (p) => {
    if (p.shapeFlag & 6)
      return tn(p.component.subTree);
    if (p.shapeFlag & 128)
      return p.suspense.next();
    const m = w(p.anchor || p.el), b = m && m[Tf];
    return b ? w(b) : m;
  };
  let Rn = !1;
  const pr = (p, m, b) => {
    let R;
    p == null ? m._vnode && (ze(m._vnode, null, null, !0), R = m._vnode.component) : E(
      m._vnode || null,
      p,
      m,
      null,
      null,
      null,
      b
    ), m._vnode = p, Rn || (Rn = !0, Hi(R), la(), Rn = !1);
  }, qe = {
    p: E,
    um: ze,
    m: gt,
    r: de,
    mt: Re,
    mc: K,
    pc: ce,
    pbc: ee,
    n: tn,
    o: e
  };
  return {
    render: pr,
    hydrate: void 0,
    createApp: ed(pr)
  };
}
function ts({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Vt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function md(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Aa(e, t, n = !1) {
  const r = e.children, o = t.children;
  if (U(r) && U(o))
    for (let s = 0; s < r.length; s++) {
      const i = r[s];
      let a = o[s];
      a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = o[s] = wt(o[s]), a.el = i.el), !n && a.patchFlag !== -2 && Aa(i, a)), a.type === vo && (a.patchFlag === -1 && (a = o[s] = wt(a)), a.el = i.el), a.type === Rt && !a.el && (a.el = i.el);
    }
}
function vd(e) {
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
function Oa(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Oa(t);
}
function Ui(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function Pa(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? Pa(t.subTree) : null;
}
const Da = (e) => e.__isSuspense;
function wd(e, t) {
  t && t.pendingBranch ? U(e) ? t.effects.push(...e) : t.effects.push(e) : Ef(e);
}
const Me = /* @__PURE__ */ Symbol.for("v-fgt"), vo = /* @__PURE__ */ Symbol.for("v-txt"), Rt = /* @__PURE__ */ Symbol.for("v-cmt"), ns = /* @__PURE__ */ Symbol.for("v-stc"), Ut = [];
let je = null;
function ne(e = !1) {
  Ut.push(je = e ? null : []);
}
function ka() {
  Ut.pop(), je = Ut[Ut.length - 1] || null;
}
let er = 1;
function qi(e, t = !1) {
  er += e, e < 0 && je && t && (je.hasOnce = !0);
}
function Ta(e) {
  return e.dynamicChildren = er > 0 ? je || hn : null, ka(), er > 0 && je && je.push(e), e;
}
function re(e, t, n, r, o, s) {
  return Ta(
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
function yd(e, t, n, r, o) {
  return Ta(
    bt(
      e,
      t,
      n,
      r,
      o,
      !0
    )
  );
}
function Fa(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function zn(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Ha = ({ key: e }) => e ?? null, Nr = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? be(e) || /* @__PURE__ */ Ae(e) || X(e) ? { i: at, r: e, k: t, f: !!n } : e : null);
function Se(e, t = null, n = null, r = 0, o = null, s = e === Me ? 0 : 1, i = !1, a = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Ha(t),
    ref: t && Nr(t),
    scopeId: ca,
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
  return a ? (Jr(c, n), s & 128 && e.normalize(c)) : n && (c.shapeFlag |= be(n) ? 8 : 16), er > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  je && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && je.push(c), c;
}
const bt = bd;
function bd(e, t = null, n = null, r = 0, o = null, s = !1) {
  if ((!e || e === Uf) && (e = Rt), Fa(e)) {
    const a = bn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Jr(a, n), er > 0 && !s && je && (a.shapeFlag & 6 ? je[je.indexOf(e)] = a : je.push(a)), a.patchFlag = -2, a;
  }
  if (Pd(e) && (e = e.__vccOpts), t) {
    t = _d(t);
    let { class: a, style: c } = t;
    a && !be(a) && (t.class = ot(a)), ue(c) && (/* @__PURE__ */ $s(c) && !U(c) && (c = Oe({}, c)), t.style = Tt(c));
  }
  const i = be(e) ? 1 : Da(e) ? 128 : po(e) ? 64 : ue(e) ? 4 : X(e) ? 2 : 0;
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
function _d(e) {
  return e ? /* @__PURE__ */ $s(e) || xa(e) ? Oe({}, e) : e : null;
}
function bn(e, t, n = !1, r = !1) {
  const { props: o, ref: s, patchFlag: i, children: a, transition: c } = e, f = t ? Sd(o || {}, t) : o, d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && Ha(f),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && s ? U(s) ? s.concat(Nr(t)) : [s, Nr(t)] : Nr(t)
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
    ssContent: e.ssContent && bn(e.ssContent),
    ssFallback: e.ssFallback && bn(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && r && Us(
    d,
    c.clone(d)
  ), d;
}
function Rs(e = " ", t = 0) {
  return bt(vo, null, e, t);
}
function Ye(e = "", t = !1) {
  return t ? (ne(), yd(Rt, null, e)) : bt(Rt, null, e);
}
function it(e) {
  return e == null || typeof e == "boolean" ? bt(Rt) : U(e) ? bt(
    Me,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Fa(e) ? wt(e) : bt(vo, null, String(e));
}
function wt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : bn(e);
}
function Jr(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (U(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), Jr(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !xa(t) ? t._ctx = at : o === 3 && at && (at.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (X(t)) {
    if (r & 65) {
      Jr(e, { default: t });
      return;
    }
    t = { default: t, _ctx: at }, n = 32;
  } else
    t = String(t), r & 64 ? (n = 16, t = [Rs(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function Sd(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === "class")
        t.class !== r.class && (t.class = ot([t.class, r.class]));
      else if (o === "style")
        t.style = Tt([t.style, r.style]);
      else if (so(o)) {
        const s = t[o], i = r[o];
        i && s !== i && !(U(s) && s.includes(i)) ? t[o] = s ? [].concat(s, i) : i : i == null && s == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !io(o) && (t[o] = i);
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
const xd = wa();
let Rd = 0;
function Cd(e, t, n) {
  const r = e.type, o = (t ? t.appContext : e.appContext) || xd, s = {
    uid: Rd++,
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
    scope: new Zu(
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
    propsOptions: Ca(r, o),
    emitsOptions: ya(r, o),
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
  return s.ctx = { _: s }, s.root = t ? t.root : s, s.emit = nd.bind(null, s), e.ce && e.ce(s), s;
}
let Te = null;
const Id = () => Te || at;
let Qr, tr;
{
  const e = ao(), t = (n, r) => {
    let o;
    return (o = e[n]) || (o = e[n] = []), o.push(r), (s) => {
      o.length > 1 ? o.forEach((i) => i(s)) : o[0](s);
    };
  };
  Qr = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Te = n
  ), tr = t(
    "__VUE_SSR_SETTERS__",
    (n) => nr = n
  );
}
const ar = (e) => {
  const t = Te;
  return Qr(e), e.scope.on(), () => {
    e.scope.off(), Qr(t);
  };
}, Gi = () => {
  Te && Te.scope.off(), Qr(null);
};
function La(e) {
  return e.vnode.shapeFlag & 4;
}
let nr = !1;
function Md(e, t = !1, n = !1) {
  t && tr(t);
  const { props: r, children: o } = e.vnode, s = La(e);
  ad(e, r, s, t), dd(e, o, n || t);
  const i = s ? Ed(e, t) : void 0;
  return t && tr(!1), i;
}
function Ed(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, qf);
  const { setup: r } = n;
  if (r) {
    _t();
    const o = e.setupContext = r.length > 1 ? Od(e) : null, s = ar(e), i = lr(
      r,
      e,
      0,
      [
        e.props,
        o
      ]
    ), a = Tl(i);
    if (St(), s(), (a || e.sp) && !qn(e) && ga(e), a) {
      if (i.then(Gi, Gi), t)
        return i.then((c) => {
          tr(!0);
          try {
            Xi(e, c, t);
          } finally {
            tr(!1);
          }
        }).catch((c) => {
          go(c, e, 0);
        });
      e.asyncDep = i;
    } else
      Xi(e, i);
  } else
    ja(e);
}
function Xi(e, t, n) {
  X(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ue(t) && (e.setupState = oa(t)), ja(e);
}
function ja(e, t, n) {
  const r = e.type;
  e.render || (e.render = r.render || ct);
  {
    const o = ar(e);
    _t();
    try {
      Gf(e);
    } finally {
      St(), o();
    }
  }
}
const Ad = {
  get(e, t) {
    return Ee(e, "get", ""), e[t];
  }
};
function Od(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Ad),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Ys(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(oa(wf(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in Gn)
        return Gn[n](e);
    },
    has(t, n) {
      return n in t || n in Gn;
    }
  })) : e.proxy;
}
function Pd(e) {
  return X(e) && "__vccOpts" in e;
}
const $ = (e, t) => /* @__PURE__ */ xf(e, t, nr), Dd = "3.5.42";
/**
* @vue/runtime-dom v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Cs;
const Yi = typeof window < "u" && window.trustedTypes;
if (Yi)
  try {
    Cs = /* @__PURE__ */ Yi.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const za = Cs ? (e) => Cs.createHTML(e) : (e) => e, kd = "http://www.w3.org/2000/svg", Td = "http://www.w3.org/1998/Math/MathML", vt = typeof document < "u" ? document : null, Zi = vt && /* @__PURE__ */ vt.createElement("template"), Fd = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const o = t === "svg" ? vt.createElementNS(kd, e) : t === "mathml" ? vt.createElementNS(Td, e) : n ? vt.createElement(e, { is: n }) : vt.createElement(e);
    return e === "select" && r && r.multiple != null && o.setAttribute("multiple", r.multiple), o;
  },
  createText: (e) => vt.createTextNode(e),
  createComment: (e) => vt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => vt.querySelector(e),
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
      Zi.innerHTML = za(
        r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e
      );
      const a = Zi.content;
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
}, Hd = /* @__PURE__ */ Symbol("_vtc");
function Ld(e, t, n) {
  const r = e[Hd];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Ji = /* @__PURE__ */ Symbol("_vod"), jd = /* @__PURE__ */ Symbol("_vsh"), zd = /* @__PURE__ */ Symbol(""), Kd = /(?:^|;)\s*display\s*:/;
function Vd(e, t, n) {
  const r = e.style, o = be(n);
  let s = !1;
  if (n && !o) {
    if (t)
      if (be(t))
        for (const i of t.split(";")) {
          const a = i.slice(0, i.indexOf(":")).trim();
          n[a] == null && Bn(r, a, "");
        }
      else
        for (const i in t)
          n[i] == null && Bn(r, i, "");
    for (const i in n) {
      i === "display" && (s = !0);
      const a = n[i];
      a != null ? Nd(
        e,
        i,
        !be(t) && t ? t[i] : void 0,
        a
      ) || Bn(r, i, a) : Bn(r, i, "");
    }
  } else if (o) {
    if (t !== n) {
      const i = r[zd];
      i && (n += ";" + i), r.cssText = n, s = Kd.test(n);
    }
  } else t && e.removeAttribute("style");
  Ji in e && (e[Ji] = s ? r.display : "", e[jd] && (r.display = "none"));
}
const Hr = /\s*!important$/;
function Bn(e, t, n) {
  if (U(n))
    n.forEach((r) => Bn(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--"))
    Hr.test(n) ? e.setProperty(t, n.replace(Hr, ""), "important") : e.setProperty(t, n);
  else {
    const r = Bd(e, t);
    Hr.test(n) ? e.setProperty(
      Yt(r),
      n.replace(Hr, ""),
      "important"
    ) : e[r] = n;
  }
}
const Qi = ["Webkit", "Moz", "ms"], rs = {};
function Bd(e, t) {
  const n = rs[t];
  if (n)
    return n;
  let r = Ze(t);
  if (r !== "filter" && r in e)
    return rs[t] = r;
  r = Ll(r);
  for (let o = 0; o < Qi.length; o++) {
    const s = Qi[o] + r;
    if (s in e)
      return rs[t] = s;
  }
  return t;
}
function Nd(e, t, n, r) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && be(r) && n === r;
}
const el = "http://www.w3.org/1999/xlink";
function tl(e, t, n, r, o, s = Xu(t)) {
  r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(el, t.slice(6, t.length)) : e.setAttributeNS(el, t, n) : n == null || s && !zl(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    s ? "" : ut(n) ? String(n) : n
  );
}
function nl(e, t, n, r, o) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? za(n) : n);
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
    a === "boolean" ? n = zl(n) : n == null && a === "string" ? (n = "", i = !0) : a === "number" && (n = 0, i = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  i && e.removeAttribute(o || t);
}
function $d(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function Wd(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const rl = /* @__PURE__ */ Symbol("_vei");
function Ud(e, t, n, r, o = null) {
  const s = e[rl] || (e[rl] = {}), i = s[t];
  if (r && i)
    i.value = r;
  else {
    const [a, c] = Xd(t);
    if (r) {
      const f = s[t] = Jd(
        r,
        o
      );
      $d(e, a, f, c);
    } else i && (Wd(e, a, i, c), s[t] = void 0);
  }
}
const qd = /(Once|Passive|Capture)$/, Gd = /^on:?(?:Once|Passive|Capture)$/;
function Xd(e) {
  let t, n;
  for (; (n = e.match(qd)) && !Gd.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : Yt(e.slice(2)), t];
}
let os = 0;
const Yd = /* @__PURE__ */ Promise.resolve(), Zd = () => os || (Yd.then(() => os = 0), os = Date.now());
function Jd(e, t) {
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
  return n.value = e, n.attached = Zd(), n;
}
const ol = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Qd = (e, t, n, r, o, s) => {
  const i = o === "svg";
  t === "class" ? Ld(e, r, i) : t === "style" ? Vd(e, n, r) : so(t) ? io(t) || Ud(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : eg(e, t, r, i)) ? (nl(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && tl(e, t, r, i, s, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (tg(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !be(r))) ? nl(e, Ze(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), tl(e, t, r, i));
};
function eg(e, t, n, r) {
  if (r)
    return !!(t === "innerHTML" || t === "textContent" || t in e && ol(t) && X(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return ol(t) && be(n) ? !1 : t in e;
}
function tg(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const r = Ze(t);
  return Array.isArray(n) ? n.some((o) => Ze(o) === r) : Object.keys(n).some((o) => Ze(o) === r);
}
const ng = ["ctrl", "shift", "alt", "meta"], rg = {
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
  exact: (e, t) => ng.some((n) => e[`${n}Key`] && !t.includes(n))
}, fn = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), r = t.join(".");
  return n[r] || (n[r] = (o, ...s) => {
    for (let i = 0; i < t.length; i++) {
      const a = rg[t[i]];
      if (a && a(o, t)) return;
    }
    return e(o, ...s);
  });
}, og = /* @__PURE__ */ Oe({ patchProp: Qd }, Fd);
let sl;
function sg() {
  return sl || (sl = pd(og));
}
const ig = (...e) => {
  const t = sg().createApp(...e), { mount: n } = t;
  return t.mount = (r) => {
    const o = ag(r);
    if (!o) return;
    const s = t._component;
    !X(s) && !s.render && !s.template && (s.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const i = n(o, !1, lg(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), i;
  }, t;
};
function lg(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function ag(e) {
  return be(e) ? document.querySelector(e) : e;
}
function Lr() {
  return !0;
}
const cg = Symbol("merge-proxy"), $r = Symbol("merge-proxy-sources"), ug = {
  get(e, t, n) {
    return t === cg ? n : t === $r ? e.sources : e.get(t);
  },
  has(e, t) {
    return e.has(t);
  },
  set: Lr,
  deleteProperty: Lr,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: Lr,
      deleteProperty: Lr
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function Wr(e) {
  return e && typeof e == "object" && "value" in e ? e.value : e;
}
function Is(...e) {
  const t = e.flatMap((n) => typeof n == "object" && n !== null && $r in n && Array.isArray(n[$r]) ? n[$r] : [n]);
  return new Proxy({
    sources: t,
    get(n) {
      for (let r = t.length - 1; r >= 0; r--) {
        const o = Wr(t[r])[n];
        if (o !== void 0) return o;
      }
    },
    has(n) {
      for (let r = t.length - 1; r >= 0; r--) if (n in Wr(t[r])) return !0;
      return !1;
    },
    keys() {
      const n = [];
      for (const r of t) n.push(...Object.keys(Wr(r)));
      return [...Array.from(new Set(n))];
    }
  }, ug);
}
function il(...e) {
  const t = {};
  for (let n of e)
    if (n = Wr(n), !!n)
      for (const r of Reflect.ownKeys(n)) {
        const o = n[r];
        o !== void 0 && (t[r] = o);
      }
  return t;
}
function Ka(e) {
  return typeof e == "function" ? e : (t) => {
    var n;
    return (n = e.next) == null ? void 0 : n.call(e, t);
  };
}
function fg(e) {
  return Object.assign(e, {
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: ye(e, Ka(t), { flush: "sync" }) })
  });
}
function dg(e) {
  return Object.assign(e, {
    set: (t) => {
      e.value = typeof t == "function" ? t(e.value) : t;
    },
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: ye(e, Ka(t), { flush: "sync" }) })
  });
}
function gg() {
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
    createReadonlyAtom: (t, n) => fg($(() => t())),
    createWritableAtom: (t, n) => dg(/* @__PURE__ */ yf(t)),
    untrack: (t) => t(),
    batch: (t) => t()
  };
}
function wo(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function ft(e) {
  if (Array.isArray(e)) return e.map(ft);
  if (e && typeof e == "object") {
    const t = Object.getPrototypeOf(e);
    if (t !== Object.prototype && t !== null) return e;
    const n = t === null ? te() : {}, r = Object.keys(e);
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
function Va(e, t) {
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
function Zt(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function cr(e, t) {
  return (n) => {
    var r;
    (((r = t.options.atoms) == null ? void 0 : r[e]) ?? t.baseAtoms[e]).set((o) => wo(n, o));
  };
}
function ll(e) {
  if (typeof e != "object" || e === null) return !1;
  if (Array.isArray(e)) return !0;
  const t = Object.getPrototypeOf(e);
  return t === Object.prototype || t === null;
}
function al(e) {
  return Reflect.ownKeys(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
const pg = 3;
function hg(e, t) {
  return Ba(e, t, pg);
}
function Ba(e, t, n) {
  if (Object.is(e, t)) return !0;
  if (n <= 0 || !ll(e) || !ll(t) || (Array.isArray(e) || Array.isArray(t)) && (!Array.isArray(e) || !Array.isArray(t) || e.length !== t.length))
    return !1;
  const r = al(e), o = al(t);
  if (r.length !== o.length) return !1;
  const s = e, i = t;
  for (let a = 0; a < r.length; a++) {
    const c = r[a];
    if (!Object.prototype.propertyIsEnumerable.call(t, c) || !Ba(s[c], i[c], n - 1)) return !1;
  }
  return !0;
}
function yo(e, t, n, r = hg) {
  const o = `on${t.charAt(0).toUpperCase()}${t.slice(1)}Change`, s = e.options[o];
  s && s((i) => {
    const a = wo(n, i);
    return r(i, a) ? i : a;
  });
}
function mg(e) {
  return e instanceof Function;
}
function vg(e, t) {
  const n = [], r = (o) => {
    o.forEach((s) => {
      n.push(s);
      const i = t(s);
      i.length && r(i);
    });
  };
  return r(e), n;
}
const wg = ({ fn: e, memoDeps: t, onAfterCompare: n, onAfterUpdate: r, onBeforeCompare: o, onBeforeUpdate: s }) => {
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
function Na(e) {
  let t = !1;
  return () => {
    if (!t) {
      t = !0;
      return;
    }
    e();
  };
}
function ur({ feature: e, fnName: t, objectId: n, onAfterUpdate: r, table: o, ...s }) {
  const i = () => {
    if (!r) return;
    const { schedule: c, untrack: f } = o._reactivity;
    c(() => f(() => r()));
  };
  return wg({
    ...s,
    ...{ onAfterUpdate: () => {
      i();
    } }
  });
}
function $a(e, t = "_") {
  const [n, r] = e.split(t);
  return {
    fnKey: r,
    fnName: `${n}.${r}`,
    parentName: n
  };
}
function dt(e, t, n) {
  for (const [r, { fn: o, memoDeps: s }] of Object.entries(n)) {
    const { fnKey: i, fnName: a } = $a(r);
    t[i] = s ? ur({
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
    const { fnKey: a, fnName: c } = $a(o);
    if (i) {
      const f = `_memo_${a}`;
      t[a] = function(...d) {
        if (!this[f]) {
          const h = this;
          this[f] = ur({
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
function Z(e, t, n, ...r) {
  var o;
  return ((o = e[t]) == null ? void 0 : o.call(e, ...r)) ?? n(e, ...r);
}
function yg(e) {
  return e.row.getValue(e.column.id);
}
function bg(e) {
  return e.getValue() ?? e.table.options.renderFallbackValue;
}
function _g(e) {
  return {
    table: e.table,
    column: e.column,
    row: e.row,
    cell: e,
    getValue: () => e.getValue(),
    renderValue: () => e.renderValue()
  };
}
const Sg = { assignCellPrototype: (e, t) => {
  tt("coreCellsFeature", e, t, {
    cell_getValue: { fn: (n) => yg(n) },
    cell_renderValue: { fn: (n) => bg(n) },
    cell_getContext: {
      fn: (n) => _g(n),
      memoDeps: (n) => [n]
    }
  });
} };
function xg(e) {
  var t, n;
  if (!e._headerPrototype) {
    e._headerPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignHeaderPrototype) == null || n.call(t, e._headerPrototype, e);
  }
  return e._headerPrototype;
}
function Wa(e, t, n) {
  const r = xg(e), o = Object.create(r);
  o.colSpan = 0, o.column = t, o.depth = n.depth, o.headerGroup = null, o.id = n.id ?? t.id, o.index = n.index, o.isPlaceholder = !!n.isPlaceholder, o.placeholderId = n.placeholderId, o.rowSpan = 0, o.subHeaders = [];
  const s = e._headerInstanceInitFns;
  for (let i = 0; i < s.length; i++) s[i](o);
  return o;
}
function Jt() {
  return {
    start: [],
    end: []
  };
}
function Rg(e) {
  var s;
  const t = e.getAllColumns(), n = e.getAllLeafColumnsById(), { start: r } = ((s = e.atoms.columnPinning) == null ? void 0 : s.get()) ?? Jt(), o = [];
  for (let i = 0; i < r.length; i++) {
    const a = n[r[i]];
    a && Z(a, "getIsVisible", We) && o.push(a);
  }
  return rr(t, o, e, "start");
}
function Cg(e) {
  var s;
  const t = e.getAllColumns(), n = e.getAllLeafColumnsById(), { end: r } = ((s = e.atoms.columnPinning) == null ? void 0 : s.get()) ?? Jt(), o = [];
  for (let i = 0; i < r.length; i++) {
    const a = n[r[i]];
    a && Z(a, "getIsVisible", We) && o.push(a);
  }
  return rr(t, o, e, "end");
}
function Ig(e) {
  var s;
  const t = e.getAllColumns();
  let n = Z(e, "getVisibleLeafColumns", Zs);
  const { start: r, end: o } = ((s = e.atoms.columnPinning) == null ? void 0 : s.get()) ?? Jt();
  if (r.length || o.length) {
    const i = [...r, ...o];
    n = n.filter((a) => !i.includes(a.id));
  }
  return rr(t, n, e, "center");
}
function Mg(e) {
  var o;
  const { start: t } = ((o = e.atoms.columnPinning) == null ? void 0 : o.get()) ?? Jt(), n = e.getAllLeafColumnsById(), r = [];
  for (let s = 0; s < t.length; s++) {
    const i = n[t[s]];
    i && r.push(i);
  }
  return r;
}
function Eg(e) {
  var o;
  const { end: t } = ((o = e.atoms.columnPinning) == null ? void 0 : o.get()) ?? Jt(), n = e.getAllLeafColumnsById(), r = [];
  for (let s = 0; s < t.length; s++) {
    const i = n[t[s]];
    i && r.push(i);
  }
  return r;
}
function Ag(e) {
  var o;
  const { start: t, end: n } = ((o = e.atoms.columnPinning) == null ? void 0 : o.get()) ?? Jt();
  if (!t.length && !n.length) return e.getAllLeafColumns();
  const r = [...t, ...n];
  return e.getAllLeafColumns().filter((s) => !r.includes(s.id));
}
function Og(e) {
  return Z(e, "getStartLeafColumns", Mg).filter((t) => Z(t, "getIsVisible", We));
}
function Pg(e) {
  return Z(e, "getEndLeafColumns", Eg).filter((t) => Z(t, "getIsVisible", We));
}
function Dg(e) {
  return Z(e, "getCenterLeafColumns", Ag).filter((t) => Z(t, "getIsVisible", We));
}
function jr(e, t) {
  return t ? t === "start" ? Z(e, "getStartVisibleLeafColumns", Og) : t === "end" ? Z(e, "getEndVisibleLeafColumns", Pg) : Z(e, "getCenterVisibleLeafColumns", Dg) : Z(e, "getVisibleLeafColumns", Zs);
}
function We(e) {
  var r;
  const t = (r = e.table.atoms.columnVisibility) == null ? void 0 : r.get();
  if (!t) return !0;
  const n = e.columns;
  return n.length ? n.some((o) => Z(o, "getIsVisible", We)) : (Zt(t, e.id) ? t[e.id] : void 0) ?? !0;
}
function Zs(e) {
  return e.getAllLeafColumns().filter((t) => Z(t, "getIsVisible", We));
}
function Ua(e, t = 1) {
  let n = t;
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    Z(o, "getIsVisible", We) && o.columns.length && (n = Math.max(n, Ua(o.columns, t + 1)));
  }
  return n;
}
function kg(e, t) {
  return e ? `${e}_${t}` : String(t);
}
function Tg(e, t, n, r) {
  let o = e ?? "";
  return t && (o = o ? `${o}_${t}` : String(t)), n && (o = o ? `${o}_${n}` : n), r && (o = o ? `${o}_${r}` : r), o;
}
function Fg(e, t) {
  let n = 0;
  for (let r = 0; r < e.length; r++) e[r].column === t && n++;
  return n;
}
function qa(e, t, n, r, o, s) {
  const i = {
    depth: t,
    id: kg(r, t),
    headers: []
  }, a = [];
  for (let c = 0; c < e.length; c++) {
    if (!(c in e)) continue;
    const f = e[c], d = a[a.length - 1], h = f.column.depth === i.depth;
    let w, y = !1;
    if (h && f.column.parent ? w = f.column.parent : (w = f.column, y = !0), d && d.column === w) d.subHeaders.push(f);
    else {
      const M = Wa(n, w, {
        id: Tg(r, t, w.id, f.id),
        isPlaceholder: y,
        placeholderId: y ? String(Fg(a, w)) : void 0,
        depth: t,
        index: a.length
      });
      M.subHeaders.push(f), a.push(M);
    }
    i.headers.push(f), f.headerGroup = i;
  }
  for (let c = 0; c < s.length; c++) s[c](i);
  o.push(i), t > 0 && qa(a, t - 1, n, r, o, s);
}
function Ga(e) {
  for (let t = 0; t < e.length; t++) {
    const n = e[t];
    if (!Z(n.column, "getIsVisible", We)) continue;
    let r = 0;
    if (n.subHeaders.length) {
      Ga(n.subHeaders);
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
function rr(e, t, n, r) {
  var c;
  const o = Ua(e), s = [], i = n._headerGroupInstanceInitFns, a = new Array(t.length);
  for (let f = 0; f < t.length; f++)
    f in t && (a[f] = Wa(n, t[f], {
      depth: o,
      index: f
    }));
  return qa(a, o - 1, n, r, s, i), s.reverse(), Ga(((c = s[0]) == null ? void 0 : c.headers) ?? []), s;
}
function Hg(e) {
  var t, n;
  if (!e._columnPrototype) {
    e._columnPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignColumnPrototype) == null || n.call(t, e._columnPrototype, e);
  }
  return e._columnPrototype;
}
function Lg(e, t, n, r) {
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
  const f = Hg(e), d = Object.create(f);
  d.accessorFn = c, d.columnDef = o, d.columns = [], d.depth = n, d.id = `${String(a)}`, d.parent = r;
  const h = e._columnInstanceInitFns;
  for (let w = 0; w < h.length; w++) h[w](d);
  return d;
}
function Xa(e) {
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
    return jg(e, o);
  };
}
function jg(e, t) {
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
function zg(e) {
  return [e, ...e.columns.flatMap((t) => t.getFlatColumns())];
}
function Kg(e) {
  if (e.columns.length) {
    const t = e.columns.flatMap((n) => n.getLeafColumns());
    return Z(e.table, "getOrderColumns", Xa)(t);
  }
  return [e];
}
function Vg(e) {
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
function Ya(e, t, n, r = 0) {
  const o = new Array(t.length);
  for (let s = 0; s < t.length; s++) {
    if (!(s in t)) continue;
    const i = t[s], a = Lg(e, i, r, n), c = i;
    a.columns = c.columns ? Ya(e, c.columns, a, r + 1) : [], o[s] = a;
  }
  return o;
}
function Bg(e) {
  return Ya(e, e.options.columns);
}
function Ng(e) {
  return e.getAllColumns().flatMap((t) => t.getFlatColumns());
}
function $g(e) {
  const t = te(), n = e.getAllFlatColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function Wg(e) {
  const t = e.getAllColumns().flatMap((n) => n.getLeafColumns());
  return Z(e, "getOrderColumns", Xa)(t);
}
function Ug(e) {
  const t = te(), n = e.getAllLeafColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function qg(e, t) {
  return e.getAllFlatColumnsById()[t];
}
const Gg = {
  assignColumnPrototype: (e, t) => {
    tt("coreColumnsFeature", e, t, {
      column_getFlatColumns: {
        fn: (n) => zg(n),
        memoDeps: (n) => [n.table.options.columns]
      },
      column_getLeafColumns: {
        fn: (n) => Kg(n),
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
        fn: () => Vg(e),
        memoDeps: () => [e.options.defaultColumn]
      },
      table_getAllColumns: {
        fn: () => Bg(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumns: {
        fn: () => Ng(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumnsById: {
        fn: () => $g(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllLeafColumns: {
        fn: () => Wg(e),
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
        fn: () => Ug(e),
        memoDeps: () => [e.getAllLeafColumns()]
      },
      table_getColumn: { fn: (t) => qg(e, t) }
    });
  }
};
function Za(e, t) {
  for (let n = 0; n < e.subHeaders.length; n++) Za(e.subHeaders[n], t);
  t.push(e);
}
function Xg(e) {
  const t = [];
  return Za(e, t), t;
}
function Yg(e) {
  return {
    column: e.column,
    header: e,
    table: e.column.table
  };
}
function Zg(e) {
  var f;
  const { start: t, end: n } = ((f = e.atoms.columnPinning) == null ? void 0 : f.get()) ?? Jt(), r = e.getAllColumns(), o = Z(e, "getVisibleLeafColumns", Zs);
  if (!t.length && !n.length) return rr(r, o, e);
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
  const c = o.filter((d) => !t.includes(d.id) && !n.includes(d.id));
  return rr(r, [
    ...i,
    ...c,
    ...a
  ], e);
}
function Jg(e) {
  return [...e.getHeaderGroups()].reverse();
}
function Qg(e) {
  const t = e.getHeaderGroups(), n = [];
  for (let r = 0; r < t.length; r++) {
    const o = t[r].headers;
    for (let s = 0; s < o.length; s++) n.push(o[s]);
  }
  return n;
}
function ep(e) {
  var r;
  const t = ((r = e.getHeaderGroups()[0]) == null ? void 0 : r.headers) ?? [], n = [];
  for (let o = 0; o < t.length; o++) {
    const s = t[o].getLeafHeaders();
    for (let i = 0; i < s.length; i++) n.push(s[i]);
  }
  return n;
}
const tp = {
  assignHeaderPrototype: (e, t) => {
    tt("coreHeadersFeature", e, t, {
      header_getLeafHeaders: {
        fn: (n) => Xg(n),
        memoDeps: (n) => [n.column.table.options.columns]
      },
      header_getContext: {
        fn: (n) => Yg(n),
        memoDeps: (n) => [n.column.table.options.columns]
      }
    });
  },
  constructTableAPIs: (e) => {
    dt("coreHeadersFeature", e, {
      table_getHeaderGroups: {
        fn: () => Zg(e),
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
        fn: () => Jg(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getFlatHeaders: {
        fn: () => Qg(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getLeafHeaders: {
        fn: () => ep(e),
        memoDeps: () => [e.getHeaderGroups()]
      }
    });
  }
};
function np(e) {
  var t, n;
  if (!e._rowPrototype) {
    e._rowPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignRowPrototype) == null || n.call(t, e._rowPrototype, e);
  }
  return e._rowPrototype;
}
const rp = (e, t, n, r, o, s, i) => {
  const a = np(e), c = Object.create(a);
  c._displayIndexCache = -1, c._uniqueValuesCache = te(), c._valuesCache = te(), c.depth = o, c.id = t, c.index = r, c.original = n, c.parentId = i, c.subRows = [];
  const f = e._rowInstanceInitFns;
  for (let d = 0; d < f.length; d++) f[d](c);
  return c;
}, op = /([0-9]+)/gm;
function _n(e) {
  const t = Object.assign((n, r, o) => {
    let s = n.getValue(o), i = r.getValue(o);
    const a = t.resolveDataValue;
    return a && (s = a(s), i = a(i)), t.sort(s, i, n, r, o);
  }, e);
  return t;
}
const sp = _n({
  resolveDataValue: (e) => bo(e).toLowerCase(),
  sort: (e, t) => Qa(e, t)
});
_n({
  resolveDataValue: (e) => bo(e),
  sort: (e, t) => Qa(e, t)
});
const ip = _n({
  resolveDataValue: (e) => bo(e).toLowerCase(),
  sort: (e, t) => Js(e, t)
});
_n({
  resolveDataValue: (e) => bo(e),
  sort: (e, t) => Js(e, t)
});
_n({
  resolveDataValue: (e) => lp(e),
  sort: (e, t) => e > t ? 1 : e < t ? -1 : 0
});
const Ja = _n({ sort: (e, t) => Js(e, t) });
function Js(e, t) {
  return e === t ? 0 : e > t ? 1 : -1;
}
function lp(e) {
  return e instanceof Date ? e.getTime() : e;
}
function bo(e) {
  return typeof e == "number" ? isNaN(e) || e === 1 / 0 || e === -1 / 0 ? "" : String(e) : typeof e == "string" ? e : "";
}
function Qa(e, t) {
  let n = 0, r = 0;
  const o = e.length, s = t.length;
  for (; n < o && r < s; ) {
    const i = eo(e.charCodeAt(n)), a = eo(t.charCodeAt(r)), c = Ms(e, n, i), f = Ms(t, r, a);
    if (!i && !a) {
      const h = ap(e, n, c, t, r, f);
      if (h) return h;
      n = c, r = f;
      continue;
    }
    if (i !== a) return i ? 1 : -1;
    const d = cp(e, n, c, t, r, f);
    if (d) return d;
    n = c, r = f;
  }
  return ul(e, n) - ul(t, r);
}
function eo(e) {
  return e >= 48 && e <= 57;
}
function Ms(e, t, n) {
  let r = t + 1;
  for (; r < e.length && eo(e.charCodeAt(r)) === n; ) r++;
  return r;
}
function ap(e, t, n, r, o, s) {
  const i = n - t, a = s - o, c = i < a ? i : a;
  for (let f = 0; f < c; f++) {
    const d = e.charCodeAt(t + f), h = r.charCodeAt(o + f);
    if (d > h) return 1;
    if (h > d) return -1;
  }
  return i > a ? 1 : a > i ? -1 : 0;
}
function cp(e, t, n, r, o, s) {
  let i = t;
  for (; i < n && e.charCodeAt(i) === 48; ) i++;
  let a = o;
  for (; a < s && r.charCodeAt(a) === 48; ) a++;
  const c = n - i, f = s - a;
  if (c === 0 && f === 0) return 0;
  if (c <= 15 && f <= 15) {
    const w = cl(e, i, n), y = cl(r, a, s);
    return w > y ? 1 : y > w ? -1 : 0;
  }
  const d = parseInt(e.slice(t, n), 10), h = parseInt(r.slice(o, s), 10);
  return d > h ? 1 : h > d ? -1 : 0;
}
function cl(e, t, n) {
  let r = 0;
  for (let o = t; o < n; o++) r = r * 10 + e.charCodeAt(o) - 48;
  return r;
}
function ul(e, t) {
  let n = 0, r = t;
  for (; r < e.length; )
    n++, r = Ms(e, r, eo(e.charCodeAt(r)));
  return n;
}
function up() {
  return [];
}
function fp(e, t) {
  yo(e, "cellSelection", ft(e.initialState.cellSelection) ?? up());
}
function dp(e) {
  e.atoms.cellSelection && (e.options.autoResetAll ?? e.options.autoResetCellSelection ?? !0) && e._reactivity.schedule(() => fp(e));
}
function gp() {
  return te();
}
function ec(e) {
  e.atoms.expanded && (e.options.autoResetAll ?? e.options.autoResetExpanded ?? !e.options.manualExpanding) && e._reactivity.schedule(() => nc(e));
}
function to(e, t) {
  var n, r;
  (r = (n = e.options).onExpandedChange) == null || r.call(n, t);
}
function tc(e, t) {
  var r;
  const n = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t ?? !oc(e)) {
    if (n === !0 || !rc(e)) return;
    to(e, !0);
  } else {
    if (n !== !0 && !Object.keys(n).length) return;
    to(e, te());
  }
}
function nc(e, t) {
  const n = e.initialState.expanded;
  yo(e, "expanded", t ? te() : n === !0 ? !0 : Object.assign(te(), ft(n ?? {})));
}
function rc(e) {
  return e.getPrePaginatedRowModel().flatRows.some((t) => Gt(t));
}
function pp(e) {
  return (t) => {
    tc(e);
  };
}
function hp(e) {
  var n;
  const t = ((n = e.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return t === !0 || Object.values(t).some(Boolean);
}
function oc(e) {
  var r;
  const t = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t === !0) return !0;
  if (!Object.keys(t).length) return !1;
  const n = e.getRowModel().flatRows.filter((o) => Gt(o));
  return !(!n.length || n.some((o) => !_o(o)));
}
function mp(e) {
  var r;
  let t = 0;
  const n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return (n === !0 ? Object.values(e.getRowModel().rowsById).filter((o) => Gt(o)).map((o) => o.id) : Object.keys(n ?? {})).forEach((o) => {
    const s = o.split(".");
    t = Math.max(t, s.length);
  }), t;
}
function sc(e, t) {
  var s;
  const n = ((s = e.table.atoms.expanded) == null ? void 0 : s.get()) ?? {}, r = n === !0 || Es(n, e.id), o = t ?? !r;
  o !== r && (o && !Gt(e) || to(e.table, (i) => {
    const a = i === !0 ? !0 : Es(i, e.id);
    let c = te();
    if (i === !0 ? Object.values(e.table.getRowModel().rowsById).forEach((f) => {
      Gt(f) && (c[f.id] = !0);
    }) : c = Object.assign(te(), i), !a && o)
      return c[e.id] = !0, c;
    if (a && !o) {
      const f = te(), d = Object.keys(c);
      for (let h = 0; h < d.length; h++) {
        const w = d[h];
        w !== e.id && c[w] && (f[w] = !0);
      }
      return f;
    }
    return i;
  }));
}
function _o(e) {
  var n, r, o;
  const t = ((n = e.table.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return !!(((o = (r = e.table.options).getIsRowExpanded) == null ? void 0 : o.call(r, e)) ?? (t === !0 || Es(t, e.id)));
}
function Es(e, t) {
  return !!(e && e !== !0 && Zt(e, t) && e[t]);
}
function Gt(e) {
  var t, n;
  return ((n = (t = e.table.options).getRowCanExpand) == null ? void 0 : n.call(t, e)) ?? ((e.table.options.enableExpanding ?? !0) && !!e.subRows.length);
}
function vp(e) {
  let t = !0, n = e;
  for (; t && n.parentId; )
    n = e.table.getRow(n.parentId, !0), t = _o(n);
  return t;
}
function wp(e) {
  const t = Gt(e);
  return () => {
    t && sc(e);
  };
}
const As = 0;
function ic(e) {
  var t, n;
  if (e.options.autoResetAll ?? e.options.autoResetPageIndex ?? !e.options.manualPagination) {
    if ((((n = (t = e.atoms.pagination) == null ? void 0 : t.get()) == null ? void 0 : n.pageIndex) ?? As) === As) return;
    _p(e);
  }
}
function yp(e, t) {
  yo(e, "pagination", t);
}
function bp(e, t) {
  yp(e, (n) => {
    let r = wo(t, n.pageIndex);
    const o = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
    return r = Math.max(0, Math.min(r, o)), {
      ...n,
      pageIndex: r
    };
  });
}
function _p(e, t) {
  bp(e, As);
}
function Sp() {
  return [];
}
function So(e, t) {
  yo(e, "sorting", t);
}
function lc(e, t) {
  So(e, t ? [] : ft(e.initialState.sorting ?? []));
}
function xp(e) {
  e.atoms.sorting && (e.options.autoResetAll ?? e.options.autoResetSorting ?? !1) && lc(e);
}
function ac(e) {
  const t = e.table._rowModelFns.sortFns, n = e.table.getFilteredRowModel().flatRows.slice(0, 10);
  let r, o = !1;
  for (let s = 0; s < n.length; s++) {
    const i = n[s].getValue(e.id);
    if (Object.prototype.toString.call(i) === "[object Date]") {
      r = "datetime";
      break;
    }
    if (typeof i == "string" && (o = !0, i.split(op).length > 1)) {
      r = "alphanumeric";
      break;
    }
  }
  if (!r && o && (r = "text"), r) {
    let s = t == null ? void 0 : t[r];
    if (s || r === "alphanumeric" && (s = t == null ? void 0 : t.text), s) return s;
  }
  return Ja;
}
function cc(e) {
  const t = e.table.getFilteredRowModel().flatRows.slice(0, 10);
  for (let n = 0; n < t.length; n++) {
    const r = t[n].getValue(e.id);
    if (r != null)
      return typeof r == "string" ? "asc" : "desc";
  }
  return "desc";
}
function uc(e) {
  const t = e.table._rowModelFns.sortFns;
  return mg(e.columnDef.sortFn) ? e.columnDef.sortFn : e.columnDef.sortFn === "auto" ? ac(e) : (t == null ? void 0 : t[e.columnDef.sortFn]) ?? Ja;
}
function fc(e, t, n) {
  const r = gc(e, n && no(e)), o = typeof t < "u";
  So(e.table, (s) => {
    const i = s.findIndex((w) => w.id === e.id), a = i === -1 ? void 0 : s[i];
    let c = [], f;
    const d = o ? t : r === "desc", h = !!(s.length && no(e) && n);
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
function dc(e) {
  return e.columnDef.sortDescFirst ?? e.table.options.sortDescFirst ?? cc(e) === "desc" ? "desc" : "asc";
}
function gc(e, t) {
  const n = dc(e), r = pc(e);
  return r ? r !== n && (e.table.options.enableSortingRemoval ?? !0) && (!t || (e.table.options.enableMultiRemove ?? !0)) ? !1 : r === "desc" ? "asc" : "desc" : n;
}
function Qs(e) {
  return (e.columnDef.enableSorting ?? !0) && (e.table.options.enableSorting ?? !0) && !!e.accessorFn;
}
function no(e) {
  return e.columnDef.enableMultiSort ?? e.table.options.enableMultiSort ?? !!e.accessorFn;
}
function pc(e) {
  var n, r;
  const t = (r = (n = e.table.atoms.sorting) == null ? void 0 : n.get()) == null ? void 0 : r.find((o) => o.id === e.id);
  return t ? t.desc ? "desc" : "asc" : !1;
}
function Rp(e) {
  var t, n;
  return ((n = (t = e.table.atoms.sorting) == null ? void 0 : t.get()) == null ? void 0 : n.findIndex((r) => r.id === e.id)) ?? -1;
}
function Cp(e) {
  So(e.table, (t) => t.length ? t.filter((n) => n.id !== e.id) : []);
}
function Ip(e) {
  const t = Qs(e);
  return (n) => {
    var r, o;
    t && fc(e, void 0, no(e) ? (o = (r = e.table.options).isMultiSortEvent) == null ? void 0 : o.call(r, n) : !1);
  };
}
function hc() {
  return (e) => ur({
    feature: "coreRowModelsFeature",
    table: e,
    fnName: "table.getCoreRowModel",
    memoDeps: () => [e.options.data],
    fn: () => Mp(e, e.options.data),
    onAfterUpdate: Na(() => {
      ec(e), ic(e), xp(e), dp(e);
    })
  });
}
function mc(e, t, n, r = 0, o) {
  var i;
  const s = [];
  for (let a = 0; a < n.length; a++) {
    const c = n[a], f = rp(e, e.getRowId(c, a, o), c, a, r, void 0, o == null ? void 0 : o.id);
    t.flatRows.push(f), t.rowsById[f.id] = f, s.push(f), e.options.getSubRows && (f.originalSubRows = e.options.getSubRows(c, a), (i = f.originalSubRows) != null && i.length && (f.subRows = mc(e, t, f.originalSubRows, r + 1, f)));
  }
  return s;
}
function Mp(e, t) {
  const n = {
    rows: [],
    flatRows: [],
    rowsById: te()
  };
  return n.rows = mc(e, n, t), n;
}
function Ep(e) {
  var t, n;
  return e._rowModels.coreRowModel || (e._rowModels.coreRowModel = ((n = (t = e.options.features).coreRowModel) == null ? void 0 : n.call(t, e)) ?? hc()(e)), e._rowModels.coreRowModel();
}
function Ap(e) {
  return e.getCoreRowModel();
}
function Op(e) {
  var t, n;
  return e._rowModels.filteredRowModel || (e._rowModels.filteredRowModel = (n = (t = e.options.features).filteredRowModel) == null ? void 0 : n.call(t, e)), e.options.manualFiltering || !e._rowModels.filteredRowModel ? e.getPreFilteredRowModel() : e._rowModels.filteredRowModel();
}
function Pp(e) {
  return e.getFilteredRowModel();
}
function Dp(e) {
  var t, n;
  return e._rowModels.groupedRowModel || (e._rowModels.groupedRowModel = (n = (t = e.options.features).groupedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualGrouping || !e._rowModels.groupedRowModel ? e.getPreGroupedRowModel() : e._rowModels.groupedRowModel();
}
function kp(e) {
  return e.getGroupedRowModel();
}
function Tp(e) {
  var t, n;
  return e._rowModels.sortedRowModel || (e._rowModels.sortedRowModel = (n = (t = e.options.features).sortedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualSorting || !e._rowModels.sortedRowModel ? e.getPreSortedRowModel() : e._rowModels.sortedRowModel();
}
function Fp(e) {
  return e.getSortedRowModel();
}
function Hp(e) {
  var t, n;
  return e._rowModels.expandedRowModel || (e._rowModels.expandedRowModel = (n = (t = e.options.features).expandedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualExpanding || !e._rowModels.expandedRowModel ? e.getPreExpandedRowModel() : e._rowModels.expandedRowModel();
}
function Lp(e) {
  return e.getExpandedRowModel();
}
function jp(e) {
  var t, n;
  return e._rowModels.paginatedRowModel || (e._rowModels.paginatedRowModel = (n = (t = e.options.features).paginatedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualPagination || !e._rowModels.paginatedRowModel ? e.getPrePaginatedRowModel() : e._rowModels.paginatedRowModel();
}
function zp(e) {
  return e.getPaginatedRowModel();
}
const Kp = { constructTableAPIs: (e) => {
  dt("coreRowModelsFeature", e, {
    table_getCoreRowModel: { fn: () => Ep(e) },
    table_getPreFilteredRowModel: { fn: () => Ap(e) },
    table_getFilteredRowModel: { fn: () => Op(e) },
    table_getPreGroupedRowModel: { fn: () => Pp(e) },
    table_getGroupedRowModel: { fn: () => Dp(e) },
    table_getPreSortedRowModel: { fn: () => kp(e) },
    table_getSortedRowModel: { fn: () => Tp(e) },
    table_getPreExpandedRowModel: { fn: () => Fp(e) },
    table_getExpandedRowModel: { fn: () => Hp(e) },
    table_getPrePaginatedRowModel: { fn: () => Lp(e) },
    table_getPaginatedRowModel: { fn: () => jp(e) },
    table_getRowModel: { fn: () => zp(e) }
  });
} };
function Vp(e) {
  var t, n;
  if (!e._cellPrototype) {
    e._cellPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignCellPrototype) == null || n.call(t, e._cellPrototype, e);
  }
  return e._cellPrototype;
}
function Bp(e, t, n) {
  const r = Vp(n), o = Object.create(r);
  o.column = e, o.id = `${t.id}_${e.id}`, o.row = t;
  const s = n._cellInstanceInitFns;
  for (let i = 0; i < s.length; i++) s[i](o);
  return o;
}
function Np(e) {
  const t = e.table.getRowsInDisplayOrder(), n = e._displayIndexCache;
  return t[n] === e ? n : -1;
}
function $p(e) {
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
function Wp(e, t) {
  if (Zt(e._valuesCache, t)) return e._valuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return e._valuesCache[t] = n.accessorFn(e.original, e.index), e._valuesCache[t];
}
function Up(e, t) {
  if (Zt(e._uniqueValuesCache, t)) return e._uniqueValuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return n.columnDef.getUniqueValues ? (e._uniqueValuesCache[t] = n.columnDef.getUniqueValues(e.original, e.index), e._uniqueValuesCache[t]) : (e._uniqueValuesCache[t] = [e.getValue(t)], e._uniqueValuesCache[t]);
}
function qp(e, t) {
  return e.getValue(t) ?? e.table.options.renderFallbackValue;
}
function Gp(e) {
  return vg(e.subRows, (t) => t.subRows);
}
function Xp(e) {
  const t = e.getCoreRowModel().flatRows;
  let n = 0;
  for (let r = 0; r < t.length; r++) n = Math.max(n, t[r].depth);
  return n;
}
function Yp(e) {
  if (e.parentId)
    return e.table.getCoreRowModel().rowsById[e.parentId] ?? e.table.getRow(e.parentId, !0);
}
function Zp(e) {
  const t = [];
  let n = e;
  for (; ; ) {
    const r = n.getParentRow();
    if (!r) break;
    t.push(r), n = r;
  }
  return t.reverse();
}
function Jp(e) {
  const t = e.table.getAllLeafColumns();
  let n = e._cellsCache;
  n || (n = e._cellsCache = /* @__PURE__ */ new WeakMap());
  const r = new Array(t.length);
  for (let o = 0; o < t.length; o++) {
    const s = t[o];
    let i = n.get(s);
    i || (i = Bp(s, e, e.table), n.set(s, i)), r[o] = i;
  }
  return r;
}
function Qp(e) {
  const t = te(), n = e.getAllCells();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.column.id] = o;
  }
  return t;
}
function eh(e, t, n, r) {
  var o, s;
  return ((s = (o = t.options).getRowId) == null ? void 0 : s.call(o, e, n, r)) ?? (r ? `${r.id}.${n}` : String(n));
}
function th(e, t, n) {
  let r = (n ? e.getPrePaginatedRowModel() : e.getRowModel()).rowsById[t];
  if (!r && (r = e.getCoreRowModel().rowsById[t], !r))
    throw new Error();
  return r;
}
const nh = {
  assignRowPrototype: (e, t) => {
    tt("coreRowsFeature", e, t, {
      row_getDisplayIndex: { fn: (n) => Np(n) },
      row_getAllCellsByColumnId: {
        fn: (n) => Qp(n),
        memoDeps: (n) => [n.getAllCells()]
      },
      row_getAllCells: {
        fn: (n) => Jp(n),
        memoDeps: (n) => [n.table.getAllLeafColumns()]
      },
      row_getLeafRows: {
        fn: (n) => Gp(n),
        memoDeps: (n) => [n.subRows]
      },
      row_getParentRow: { fn: (n) => Yp(n) },
      row_getParentRows: { fn: (n) => Zp(n) },
      row_getUniqueValues: { fn: (n, r) => Up(n, r) },
      row_getValue: { fn: (n, r) => Wp(n, r) },
      row_renderValue: { fn: (n, r) => qp(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    dt("coreRowsFeature", e, {
      table_getRowsInDisplayOrder: {
        fn: () => $p(e),
        memoDeps: () => {
          var t;
          return [
            e.getPrePaginatedRowModel().rows,
            e.options.paginateExpandedRows,
            e.options.paginateExpandedRows === !1 ? (t = e.atoms.expanded) == null ? void 0 : t.get() : void 0
          ];
        }
      },
      table_getRowId: { fn: (t, n, r) => eh(t, e, n, r) },
      table_getRow: { fn: (t, n) => th(e, t, n) },
      table_getMaxSubRowDepth: {
        fn: () => Xp(e),
        memoDeps: () => [e.getCoreRowModel()]
      }
    });
  }
};
function vc(e, t, n = (r, o) => r === o) {
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
function rh(e, t, n = (r, o) => r === o) {
  e._reactivity.batch(() => {
    var r, o;
    vc(e, t, n), (o = (r = e._reactivity).commit) == null || o.call(r);
  });
}
function oh(e) {
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
function sh(e, t) {
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
function ih(e, t, n) {
  const r = sh(e, wo(t, e.options));
  e.optionsStore ? e.optionsStore.set(() => r) : e.options = r, rh(e, r.state ?? null);
}
const lh = { constructTableAPIs: (e) => {
  dt("coreTablesFeature", e, {
    table_reset: { fn: () => oh(e) },
    table_setOptions: { fn: (t) => ih(e, t) }
  });
} }, ah = {
  coreCellsFeature: Sg,
  coreColumnsFeature: Gg,
  coreHeadersFeature: tp,
  coreRowModelsFeature: Kp,
  coreRowsFeature: nh,
  coreTablesFeature: lh
};
function ch(e) {
  const t = e;
  return Object.defineProperty(e, "state", { get() {
    return e.get();
  } }), "set" in e && (t.setState = e.set.bind(e)), t;
}
function uh(e, t) {
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
  const n = fl(e);
  if (n.length !== fl(t).length) return !1;
  for (let r = 0; r < n.length; r++) if (!Object.prototype.hasOwnProperty.call(t, n[r]) || !Object.is(e[n[r]], t[n[r]])) return !1;
  return !0;
}
function fl(e) {
  return Object.keys(e).concat(Object.getOwnPropertySymbols(e));
}
function fh(e, t = {}) {
  return Object.values(e).forEach((n) => {
    var r;
    t = ((r = n.getInitialState) == null ? void 0 : r.call(n, t)) ?? t;
  }), ft(t);
}
function dh(e) {
  var j, W;
  const t = e.features.coreReactivityFeature, { aggregationFns: n, columnMeta: r, coreRowModel: o, expandedRowModel: s, facetedMinMaxValues: i, facetedRowModel: a, facetedUniqueValues: c, filterFns: f, filterMeta: d, filteredRowModel: h, groupedRowModel: w, paginatedRowModel: y, sortFns: M, sortedRowModel: E, tableMeta: A, ...z } = e.features, I = {
    _cellInstanceInitFns: [],
    _columnInstanceInitFns: [],
    _features: {
      ...ah,
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
      var ee;
      return Object.assign(K, (ee = L.getDefaultTableOptions) == null ? void 0 : ee.call(L, I));
    }, {}),
    ...e
  };
  if (t.wrapExternalAtoms && _.atoms) for (const [K, L] of Object.entries(_.atoms)) {
    const ee = L, ae = t.createWritableAtom(ee.get(), { debugName: `externalAtom/${K}` });
    _.atoms[K] = ae;
    let Y = !1;
    const he = ee.subscribe((we) => {
      Y || ae.set(we);
    }), Re = ae.subscribe((we) => {
      Y = !0, ee.set(we), Y = !1;
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
  })) : I.options = _, I.initialState = fh(I._features, I.options.initialState);
  const D = Object.keys(I.initialState);
  for (let K = 0; K < D.length; K++) {
    const L = D[K];
    I.baseAtoms[L] = t.createWritableAtom(I.initialState[L], { debugName: `table/baseAtoms/${L}` }), I.atoms[L] = t.createReadonlyAtom(() => {
      var Re;
      const ee = I.options, ae = (Re = ee.atoms) == null ? void 0 : Re[L], Y = ae ? ae.get() : I.baseAtoms[L].get();
      if (ae) return Y;
      const he = ee.state;
      if (he && Zt(he, L)) {
        const we = he[L];
        return we === void 0 ? I.initialState[L] : we;
      }
      return Y;
    }, { debugName: `table/atoms/${L}` });
  }
  vc(I), I.store = ch(t.createReadonlyAtom(() => {
    const K = {};
    for (let L = 0; L < D.length; L++) {
      const ee = D[L];
      K[ee] = I.atoms[ee].get();
    }
    return K;
  }, {
    compare: uh,
    debugName: "table/store"
  }));
  for (let K = 0; K < O.length; K++) {
    const L = O[K];
    (j = L.initTableInstanceData) == null || j.call(L, I), L.initCellInstanceData && I._cellInstanceInitFns.push(L.initCellInstanceData.bind(L)), L.initColumnInstanceData && I._columnInstanceInitFns.push(L.initColumnInstanceData.bind(L)), L.initHeaderGroupInstanceData && I._headerGroupInstanceInitFns.push(L.initHeaderGroupInstanceData.bind(L)), L.initHeaderInstanceData && I._headerInstanceInitFns.push(L.initHeaderInstanceData.bind(L)), L.initRowInstanceData && I._rowInstanceInitFns.push(L.initRowInstanceData.bind(L)), (W = L.constructTableAPIs) == null || W.call(L, I);
  }
  return I;
}
function gh() {
  return te();
}
function wc() {
  return {
    size: 150,
    minSize: 20,
    maxSize: Number.MAX_SAFE_INTEGER
  };
}
function xo(e) {
  var o;
  const t = wc(), n = (o = e.table.atoms.columnSizing) == null ? void 0 : o.get(), r = n && Zt(n, e.id) ? n[e.id] : void 0;
  return Math.min(Math.max(e.columnDef.minSize ?? t.minSize, r ?? e.columnDef.size ?? t.size), e.columnDef.maxSize ?? t.maxSize);
}
function zr(e) {
  const t = te(), n = te(), r = new Array(e.length);
  let o = 0;
  for (let i = 0; i < e.length; i++) {
    const a = e[i], c = Z(a, "getSize", xo);
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
function ei(e) {
  return {
    all: zr(jr(e)),
    center: zr(jr(e, "center")),
    start: zr(jr(e, "start")),
    end: zr(jr(e, "end"))
  };
}
function yc(e) {
  return e === "start" ? "start" : e === "end" ? "end" : e === "center" ? "center" : "all";
}
function ph(e, t) {
  return Z(e.table, "getColumnOffsets", ei)[yc(t)].starts[e.id] ?? 0;
}
function hh(e, t) {
  return Z(e.table, "getColumnOffsets", ei)[yc(t)].afters[e.id] ?? 0;
}
function mh(e) {
  Ro(e.table, (t) => {
    const n = te(), r = Object.keys(t);
    for (let o = 0; o < r.length; o++) {
      const s = r[o];
      s !== e.id && (n[s] = t[s]);
    }
    return n;
  });
}
function bc(e) {
  if (!e.subHeaders.length) return xo(e.column);
  let t = 0;
  for (let n = 0; n < e.subHeaders.length; n++) t += bc(e.subHeaders[n]);
  return t;
}
function Qt(e) {
  return bc(e);
}
function _c(e) {
  var t;
  if (e.index > 0) {
    const n = (t = e.headerGroup) == null ? void 0 : t.headers[e.index - 1];
    if (n) return Z(n, "getStart", _c) + Z(n, "getSize", Qt);
  }
  return 0;
}
function Ro(e, t) {
  var n, r;
  (r = (n = e.options).onColumnSizingChange) == null || r.call(n, t);
}
function vh(e, t) {
  Ro(e, t ? te() : Object.assign(te(), ft(e.initialState.columnSizing ?? {})));
}
function wh(e) {
  var t;
  return ((t = e.getHeaderGroups()[0]) == null ? void 0 : t.headers.reduce((n, r) => n + Qt(r), 0)) ?? 0;
}
function yh(e) {
  var t;
  return ((t = Z(e, "getStartHeaderGroups", Rg)[0]) == null ? void 0 : t.headers.reduce((n, r) => n + Qt(r), 0)) ?? 0;
}
function bh(e) {
  var t;
  return ((t = Z(e, "getCenterHeaderGroups", Ig)[0]) == null ? void 0 : t.headers.reduce((n, r) => n + Qt(r), 0)) ?? 0;
}
function _h(e) {
  var t;
  return ((t = Z(e, "getEndHeaderGroups", Cg)[0]) == null ? void 0 : t.headers.reduce((n, r) => n + Qt(r), 0)) ?? 0;
}
function Os() {
  return {
    startOffset: null,
    startSize: null,
    deltaOffset: null,
    deltaPercentage: null,
    isResizingColumn: !1,
    columnSizingStart: []
  };
}
function Sc(e) {
  return (e.columnDef.enableResizing ?? !0) && (e.table.options.enableColumnResizing ?? !0);
}
function Sh(e) {
  var t, n;
  return ((n = (t = e.table.atoms.columnResizing) == null ? void 0 : t.get()) == null ? void 0 : n.isResizingColumn) === e.id;
}
function xh(e, t) {
  const n = e.table.getColumn(e.column.id), r = Sc(n);
  return (o) => {
    if (!r || ss(o) && o.touches.length > 1)
      return;
    const s = Qt(e), i = e.getLeafHeaders().map((D) => [D.column.id, xo(D.column)]), a = ss(o) ? Math.round(o.touches[0].clientX) : o.clientX, c = te(), f = (D, j) => {
      if (typeof j != "number") return;
      const W = n.table, K = W.options.columnResizeMode === "onChange" || D === "end";
      W._reactivity.batch(() => {
        Xn(W, (L) => {
          const ee = W.options.columnResizeDirection === "rtl" ? -1 : 1, ae = (j - (L.startOffset ?? 0)) * ee, Y = L.startSize ?? 0, he = Math.max(Y > 0 ? ae / Y : 0, -0.999999);
          if (K) {
            const Re = L.columnSizingStart;
            for (let we = 0; we < Re.length; we++) {
              const q = Re[we], J = q[1];
              c[q[0]] = Math.round(Math.max(J > 0 ? J + J * he : ae / Re.length, 0) * 100) / 100;
            }
          }
          return {
            ...L,
            deltaOffset: ae,
            deltaPercentage: he
          };
        }), K && Ro(W, (L) => Object.assign(te(), L, c));
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
        f("end", D ?? w), Xn(n.table, (j) => ({
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
    }, _ = Ch() ? { passive: !1 } : !1;
    ss(o) ? (A == null || A.addEventListener("touchmove", I.moveHandler, _), A == null || A.addEventListener("touchend", I.upHandler, _), A == null || A.addEventListener("touchcancel", I.cancelHandler, _)) : (A == null || A.addEventListener("mousemove", z.moveHandler, _), A == null || A.addEventListener("mouseup", z.upHandler, _)), Xn(n.table, (D) => ({
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
function Xn(e, t) {
  var n, r;
  (r = (n = e.options).onColumnResizingChange) == null || r.call(n, t);
}
function Rh(e, t) {
  Xn(e, t ? Os() : ft(e.initialState.columnResizing ?? Os()));
}
let Kr = null;
function Ch() {
  if (typeof Kr == "boolean") return Kr;
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
  return Kr = e, Kr;
}
function ss(e) {
  return e.type === "touchstart";
}
const Ih = {
  getInitialState: (e) => ({
    columnResizing: Os(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    columnResizeMode: "onEnd",
    columnResizeDirection: "ltr",
    onColumnResizingChange: cr("columnResizing", e)
  }),
  assignColumnPrototype: (e, t) => {
    tt("columnResizingFeature", e, t, {
      column_getCanResize: { fn: (n) => Sc(n) },
      column_getIsResizing: { fn: (n) => Sh(n) }
    });
  },
  assignHeaderPrototype: (e, t) => {
    tt("columnResizingFeature", e, t, { header_getResizeHandler: { fn: (n, r) => xh(n, r) } });
  },
  constructTableAPIs: (e) => {
    dt("columnResizingFeature", e, {
      table_setColumnResizing: { fn: (t) => Xn(e, t) },
      table_resetHeaderSizeInfo: { fn: (t) => Rh(e, t) }
    });
  }
}, Mh = {
  getInitialState: (e) => ({
    columnSizing: gh(),
    ...e
  }),
  getDefaultColumnDef: () => wc(),
  getDefaultTableOptions: (e) => ({ onColumnSizingChange: cr("columnSizing", e) }),
  assignColumnPrototype: (e, t) => {
    tt("columnSizingFeature", e, t, {
      column_getSize: {
        fn: (n) => xo(n),
        memoDeps: (n) => {
          var r, o;
          return [t.options.columns, (o = (r = t.atoms.columnSizing) == null ? void 0 : r.get()) == null ? void 0 : o[n.id]];
        }
      },
      column_getStart: { fn: (n, r) => ph(n, r) },
      column_getAfter: { fn: (n, r) => hh(n, r) },
      column_resetSize: { fn: (n) => mh(n) }
    });
  },
  assignHeaderPrototype: (e, t) => {
    tt("columnSizingFeature", e, t, {
      header_getSize: {
        fn: (n) => Qt(n),
        memoDeps: (n) => {
          var r, o, s;
          return [t.options.columns, n.column.columns.length > 0 ? (r = t.atoms.columnSizing) == null ? void 0 : r.get() : (s = (o = t.atoms.columnSizing) == null ? void 0 : o.get()) == null ? void 0 : s[n.column.id]];
        }
      },
      header_getStart: {
        fn: (n) => _c(n),
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
        fn: () => ei(e),
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
      table_setColumnSizing: { fn: (t) => Ro(e, t) },
      table_resetColumnSizing: { fn: (t) => vh(e, t) },
      table_getTotalSize: {
        fn: () => wh(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.columnSizing) == null ? void 0 : t.get(), e.getHeaderGroups()];
        }
      },
      table_getStartTotalSize: {
        fn: () => yh(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.columnSizing) == null ? void 0 : t.get(), e.getHeaderGroups()];
        }
      },
      table_getCenterTotalSize: {
        fn: () => bh(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.columnSizing) == null ? void 0 : t.get(), e.getHeaderGroups()];
        }
      },
      table_getEndTotalSize: {
        fn: () => _h(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.columnSizing) == null ? void 0 : t.get(), e.getHeaderGroups()];
        }
      }
    });
  }
}, Eh = {
  getInitialState: (e) => ({
    expanded: gp(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onExpandedChange: cr("expanded", e),
    paginateExpandedRows: !0
  }),
  assignRowPrototype: (e, t) => {
    tt("rowExpandingFeature", e, t, {
      row_toggleExpanded: { fn: (n, r) => sc(n, r) },
      row_getIsExpanded: { fn: (n) => _o(n) },
      row_getCanExpand: { fn: (n) => Gt(n) },
      row_getIsAllParentsExpanded: { fn: (n) => vp(n) },
      row_getToggleExpandedHandler: { fn: (n) => wp(n) }
    });
  },
  constructTableAPIs: (e) => {
    dt("rowExpandingFeature", e, {
      table_autoResetExpanded: { fn: () => ec(e) },
      table_setExpanded: { fn: (t) => to(e, t) },
      table_toggleAllRowsExpanded: { fn: (t) => tc(e, t) },
      table_resetExpanded: { fn: (t) => nc(e, t) },
      table_getCanSomeRowsExpand: { fn: () => rc(e) },
      table_getToggleAllRowsExpandedHandler: { fn: () => pp(e) },
      table_getIsSomeRowsExpanded: { fn: () => hp(e) },
      table_getIsAllRowsExpanded: { fn: () => oc(e) },
      table_getExpandedDepth: { fn: () => mp(e) }
    });
  }
};
function Ah() {
  return te();
}
function Sn(e, t) {
  var n, r;
  (r = (n = e.options).onRowSelectionChange) == null || r.call(n, t);
}
function Oh(e, t) {
  e._lastSelectedRowId = null, Sn(e, t ? te() : Object.assign(te(), ft(e.initialState.rowSelection ?? {})));
}
function xc(e, t, n) {
  e._lastSelectedRowId = null, Sn(e, (r) => {
    if (t = typeof t < "u" ? t : !Z(e, "getIsAllRowsSelected", Ic), n != null && n.deselectAll && !t) return te();
    const o = Object.assign(te(), r), s = e.getPreGroupedRowModel().flatRows;
    if (t) {
      const i = /* @__PURE__ */ new Map();
      s.forEach((a) => {
        ro(a, i) && (o[a.id] = !0);
      });
    } else s.forEach((i) => {
      Ct(i) && delete o[i.id];
    });
    return o;
  });
}
function Rc(e, t, n) {
  e._lastSelectedRowId = null, Sn(e, (r) => {
    const o = typeof t < "u" ? t : !Z(e, "getIsAllPageRowsSelected", Mc);
    if (n != null && n.deselectAll && !o) return te();
    const s = Object.assign(te(), r);
    return e.getRowModel().rows.forEach((i) => {
      Io(s, i.id, o, !0, e, !0);
    }), s;
  });
}
function Ph(e) {
  return e.getCoreRowModel();
}
function Dh(e) {
  const t = e.getCoreRowModel();
  return Z(e, "getIsSomeRowsSelected", Co) ? ri(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: te()
  };
}
function kh(e) {
  const t = e.getFilteredRowModel();
  return Z(e, "getIsSomeRowsSelected", Co) ? ri(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: te()
  };
}
function Th(e) {
  const t = e.getSortedRowModel();
  return Z(e, "getIsSomeRowsSelected", Co) ? ri(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: te()
  };
}
function Cc(e) {
  var t;
  return Object.keys(((t = e.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function Ic(e) {
  var o;
  const t = e.getFilteredRowModel().flatRows, n = ((o = e.atoms.rowSelection) == null ? void 0 : o.get()) ?? {};
  let r = !!(t.length && Object.keys(n).length);
  if (r) {
    const s = /* @__PURE__ */ new Map();
    t.some((i) => !fr(i, n) && ro(i, s)) && (r = !1);
  }
  return r;
}
function Mc(e) {
  var s;
  const t = e.getPaginatedRowModel().flatRows, n = ((s = e.atoms.rowSelection) == null ? void 0 : s.get()) ?? {}, r = /* @__PURE__ */ new Map();
  let o = !1;
  for (let i = 0; i < t.length; i++) {
    const a = t[i];
    if (fr(a, n))
      !o && ro(a, r) && (o = !0);
    else if (ro(a, r)) return !1;
  }
  return o;
}
function Co(e) {
  return Z(e, "getSelectedRowIds", Cc).length > 0;
}
function Fh(e) {
  return e.getPaginatedRowModel().flatRows.filter((t) => Ct(t)).some((t) => ti(t) || Z(t, "getIsSomeSelected", Ac));
}
function Hh(e) {
  return (t) => {
    xc(e, t.target.checked);
  };
}
function Lh(e) {
  return (t) => {
    Rc(e, t.target.checked);
  };
}
function Ec(e, t, n) {
  const r = ti(e);
  Sn(e.table, (o) => {
    t = typeof t < "u" ? t : !r;
    const s = Object.assign(te(), o);
    return Io(s, e.id, t, ((n == null ? void 0 : n.selectChildren) ?? !0) && qt(e), e.table), !t && (n != null && n.deselectParents) && Oc(s, e), s;
  });
}
function ti(e) {
  var t;
  return fr(e, ((t = e.table.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function Ac(e) {
  return oi(e) === "some";
}
function jh(e) {
  return oi(e) === "all";
}
function Ct(e) {
  const t = e.table.options;
  return typeof t.enableRowSelection == "function" ? t.enableRowSelection(e) : t.enableRowSelection ?? !0;
}
function ni(e) {
  const t = e.table.options;
  return typeof t.enableSubRowSelection == "function" ? t.enableSubRowSelection(e) : t.enableSubRowSelection ?? !0;
}
function qt(e) {
  const t = e.table.options;
  return typeof t.enableMultiRowSelection == "function" ? t.enableMultiRowSelection(e) : t.enableMultiRowSelection ?? !0;
}
function zh(e, t) {
  const n = Ct(e);
  return (r) => {
    var c, f;
    if (!n) return;
    const o = r, s = e.table, i = o.target.checked, a = s._lastSelectedRowId;
    (!(s.options.enableRowRangeSelection !== !1 && a !== null && qt(e) && (((f = (c = s.options).isRowRangeSelectionEvent) == null ? void 0 : f.call(c, r)) ?? !1)) || !Kh(e, a, i, t)) && Ec(e, i, t), s._lastSelectedRowId = e.id;
  };
}
function Kh(e, t, n, r) {
  const o = (r == null ? void 0 : r.selectChildren) ?? !0, s = e.table, i = s.getRowsInDisplayOrder(), a = s.getPrePaginatedRowModel().rowsById[t] ?? s.getCoreRowModel().rowsById[t];
  if (!a) return !1;
  const c = a.getDisplayIndex(), f = e.getDisplayIndex(), d = i[c], h = i[f];
  if (c < 0 || f < 0 || c >= i.length || f >= i.length || (d == null ? void 0 : d.id) !== a.id || (h == null ? void 0 : h.id) !== e.id || !qt(a) || !qt(e)) return !1;
  const w = Math.min(c, f), y = Math.max(c, f);
  return Sn(s, (M) => {
    const E = Object.assign(te(), M);
    for (let A = w; A <= y; A++) {
      const z = i[A];
      !Ct(z) || !qt(z) || (Io(E, z.id, n, o, s), !n && (r != null && r.deselectParents) && Oc(E, z));
    }
    return E;
  }), !0;
}
function Io(e, t, n, r, o, s) {
  const i = o.getRow(t, !0);
  n ? (qt(i) || Object.keys(e).forEach((a) => delete e[a]), Ct(i) && (e[t] = !0)) : (!s || Ct(i)) && delete e[t], r && i.subRows.length && ni(i) && i.subRows.forEach((a) => Io(e, a.id, n, r, o, s));
}
function ro(e, t) {
  if (!Ct(e)) return !1;
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
    if (!ni(d)) {
      a = !1;
      break;
    }
    c = d.parentId;
  }
  return i.forEach((f) => t.set(f, a)), a;
}
function Oc(e, t) {
  const n = t.table.getCoreRowModel().rowsById;
  let r = t.parentId;
  for (; r !== void 0; )
    delete e[r], r = (n[r] ?? t.table.getRow(r, !0)).parentId;
}
function Pc(e, t, n, r) {
  const o = [];
  for (let s = 0; s < e.length; s++) {
    const i = e[s], a = fr(i, t);
    if (a && (n.push(i), r[i.id] = i), i.subRows.length) {
      const c = Pc(i.subRows, t, n, r);
      if (a) {
        const f = Object.create(Object.getPrototypeOf(i));
        Va(f, i), f.subRows = c, o.push(f);
      }
    } else a && o.push(i);
  }
  return o;
}
function ri(e, t) {
  var s;
  const n = [], r = te(), o = ((s = t.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  return {
    rows: Pc(e.rows, o, n, r),
    flatRows: n,
    rowsById: r
  };
}
function fr(e, t) {
  return !!(Zt(t, e.id) && t[e.id]);
}
function oi(e) {
  var s;
  if (!e.subRows.length) return !1;
  const t = ((s = e.table.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  let n = !1, r = !0, o = !1;
  for (let i = 0; i < e.subRows.length; i++) {
    const a = e.subRows[i];
    if (n && !r) break;
    if (Ct(a) && (o = !0, fr(a, t) ? n = !0 : r = !1), a.subRows.length) {
      const c = oi(a);
      c === "all" ? (n = !0, o = !0) : c === "some" ? (n = !0, r = !1, o = !0) : r = !1;
    }
  }
  return o ? r ? "all" : n ? "some" : !1 : !1;
}
const Vh = {
  initTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  resetTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  getInitialState: (e) => ({
    rowSelection: Ah(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onRowSelectionChange: cr("rowSelection", e),
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
      row_toggleSelected: { fn: (n, r, o) => Ec(n, r, o) },
      row_getIsSelected: { fn: (n) => ti(n) },
      row_getIsSomeSelected: {
        fn: (n) => Ac(n),
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
        fn: (n) => jh(n),
        memoDeps: (n) => {
          var r;
          return [
            n.subRows,
            (r = n.table.atoms.rowSelection) == null ? void 0 : r.get(),
            n.table.options.enableRowSelection
          ];
        }
      },
      row_getCanSelect: { fn: (n) => Ct(n) },
      row_getCanSelectSubRows: { fn: (n) => ni(n) },
      row_getCanMultiSelect: { fn: (n) => qt(n) },
      row_getToggleSelectedHandler: { fn: (n, r) => zh(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    dt("rowSelectionFeature", e, {
      table_setRowSelection: { fn: (t) => Sn(e, t) },
      table_resetRowSelection: { fn: (t) => Oh(e, t) },
      table_toggleAllRowsSelected: { fn: (t, n) => xc(e, t, n) },
      table_toggleAllPageRowsSelected: { fn: (t, n) => Rc(e, t, n) },
      table_getPreSelectedRowModel: { fn: () => Ph(e) },
      table_getSelectedRowModel: {
        fn: () => Dh(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getCoreRowModel()];
        }
      },
      table_getFilteredSelectedRowModel: {
        fn: () => kh(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getFilteredRowModel()];
        }
      },
      table_getGroupedSelectedRowModel: {
        fn: () => Th(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getSortedRowModel()];
        }
      },
      table_getSelectedRowIds: {
        fn: () => Cc(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get()];
        }
      },
      table_getIsAllRowsSelected: {
        fn: () => Ic(e),
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
        fn: () => Mc(e),
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
        fn: () => Co(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get()];
        }
      },
      table_getIsSomePageRowsSelected: {
        fn: () => Fh(e),
        memoDeps: () => {
          var t;
          return [
            (t = e.atoms.rowSelection) == null ? void 0 : t.get(),
            e.getPaginatedRowModel(),
            e.options.enableRowSelection
          ];
        }
      },
      table_getToggleAllRowsSelectedHandler: { fn: () => Hh(e) },
      table_getToggleAllPageRowsSelectedHandler: { fn: () => Lh(e) }
    });
  }
}, Bh = {
  getInitialState(e) {
    return {
      sorting: Sp(),
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
      onSortingChange: cr("sorting", e),
      isMultiSortEvent: (t) => t.shiftKey
    };
  },
  assignColumnPrototype(e, t) {
    tt("rowSortingFeature", e, t, {
      column_getAutoSortFn: { fn: (n) => ac(n) },
      column_getAutoSortDir: { fn: (n) => cc(n) },
      column_getSortFn: { fn: (n) => uc(n) },
      column_toggleSorting: { fn: (n, r, o) => fc(n, r, o) },
      column_getFirstSortDir: { fn: (n) => dc(n) },
      column_getNextSortingOrder: { fn: (n, r) => gc(n, r) },
      column_getCanSort: { fn: (n) => Qs(n) },
      column_getCanMultiSort: { fn: (n) => no(n) },
      column_getIsSorted: { fn: (n) => pc(n) },
      column_getSortIndex: { fn: (n) => Rp(n) },
      column_clearSorting: { fn: (n) => Cp(n) },
      column_getToggleSortingHandler: { fn: (n) => Ip(n) }
    });
  },
  constructTableAPIs(e) {
    dt("rowSortingFeature", e, {
      table_setSorting: { fn: (t) => So(e, t) },
      table_resetSorting: { fn: (t) => lc(e, t) }
    });
  }
};
function Nh() {
  return (e) => {
    const t = e;
    return ur({
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
      fn: () => $h(t)
    });
  };
}
function $h(e) {
  var r;
  const t = e.getPreExpandedRowModel(), n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return !t.rows.length || n !== !0 && !Object.keys(n ?? {}).length || !e.options.paginateExpandedRows && !e.options.manualPagination ? t : Wh(t);
}
function Wh(e) {
  const t = [], n = (r) => {
    t.push(r), r.subRows.length && _o(r) && r.subRows.forEach(n);
  };
  return e.rows.forEach(n), {
    rows: t,
    flatRows: e.flatRows,
    rowsById: e.rowsById
  };
}
function Uh() {
  return (e) => {
    const t = e;
    return ur({
      feature: "rowSortingFeature",
      table: t,
      fnName: "table.getSortedRowModel",
      memoDeps: () => {
        var n;
        return [(n = t.atoms.sorting) == null ? void 0 : n.get(), t.getPreSortedRowModel()];
      },
      fn: () => qh(t),
      onAfterUpdate: Na(() => ic(t))
    });
  };
}
function qh(e) {
  var c;
  const t = e.getPreSortedRowModel(), n = (c = e.atoms.sorting) == null ? void 0 : c.get();
  if (!t.rows.length || !(n != null && n.length)) return t;
  const r = [], o = n.filter((f) => {
    const d = e.getColumn(f.id);
    return d ? Qs(d) : !1;
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
      sortFn: uc(h)
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
          Va(A, y), A.subRows = E.rows, d[w] = A, r[M] = A, h = !0;
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
function dl(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = Wt(e[n]);
  return Is(e, t);
}
function Gh(e) {
  return Object.keys(e).map((t) => Wt(e[t]));
}
function Xh(e) {
  const t = (a, c) => {
    a.setOptions((f) => il(f, dl(c)));
  }, n = gg(), r = Is(e, { features: {
    coreReactivityFeature: n,
    ...Wt(e.features) ?? {}
  } }), o = Is(dl(r), { mergeOptions: (a, c) => il(a, c) }), s = dh(o), i = s;
  return Bl() && Ju(() => {
    var a;
    return (a = n.unmount) == null ? void 0 : a.call(n);
  }), ye(() => Gh(r), () => {
    t(s, r);
  }, { immediate: !0 }), ye(() => {
    const a = Wt(e.state), c = Wt(e.atoms);
    if (!a) return [];
    const f = [];
    for (const d of Object.keys(i.initialState))
      !(d in a) || (c == null ? void 0 : c[d]) !== void 0 || f.push(a[d]);
    return f;
  }, (a) => {
    a.length > 0 && t(s, r);
  }, { immediate: !0 }), i.Subscribe = (a) => a.children(i.atoms), i;
}
function or(e) {
  "@babel/helpers - typeof";
  return or = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, or(e);
}
function Yh(e, t) {
  if (or(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (or(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Zh(e) {
  var t = Yh(e, "string");
  return or(t) == "symbol" ? t : t + "";
}
function dr(e, t, n) {
  return (t = Zh(t)) in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function Jh(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
    if (t.indexOf(r) !== -1) continue;
    n[r] = e[r];
  }
  return n;
}
function Qh(e, t) {
  if (e == null) return {};
  var n, r, o = Jh(e, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    for (r = 0; r < s.length; r++) n = s[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (o[n] = e[n]);
  }
  return o;
}
function Dc(e, t) {
  var n = Object.keys(e), r = Object.keys(t);
  return n.length !== r.length ? !1 : n.every(function(o) {
    return Object.is(e[o], t[o]);
  });
}
function em() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Dc, t = null;
  return function(n) {
    return t && e(t.value, n) || (t = {
      value: n
    }), t.value;
  };
}
var tm = ["block"];
function gl(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function pl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? gl(Object(n), !0).forEach(function(r) {
      dr(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : gl(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function nm(e) {
  return {
    x: (e.right + e.left) / 2,
    y: (e.bottom + e.top) / 2
  };
}
function is(e) {
  var t = e.client, n = e.borderBox, r = n.height / 4;
  return t.y <= n.top + r ? "reorder-above" : t.y >= n.bottom - r ? "reorder-below" : "make-child";
}
function rm(e) {
  var t = e.element, n = e.input, r = e.currentLevel, o = e.indentPerLevel, s = e.mode, i = {
    x: n.clientX,
    y: n.clientY
  }, a = t.getBoundingClientRect();
  if (s === "standard") {
    var c = is({
      borderBox: a,
      client: i
    });
    return {
      type: c,
      indentPerLevel: o,
      currentLevel: r
    };
  }
  var f = nm(a);
  if (s === "expanded") {
    var d = is({
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
    type: is({
      borderBox: a,
      client: i
    }),
    indentPerLevel: o,
    currentLevel: r
  };
}
function kc(e, t) {
  return e.type !== t.type ? !1 : e.type === "instruction-blocked" && t.type === "instruction-blocked" ? kc(e.desired, t.desired) : Dc(e, t);
}
var om = em(kc);
function sm(e) {
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
function im(e, t) {
  var n = t.block, r = Qh(t, tm), o = rm(r), s = sm({
    desired: o,
    block: n
  }), i = om(s);
  return pl(pl({}, e), {}, dr({}, Tc, i));
}
function hl(e) {
  var t;
  return (t = e[Tc]) !== null && t !== void 0 ? t : null;
}
var Tc = Symbol("tree-item-instruction");
function Mo() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return function() {
    t.forEach(function(o) {
      return o();
    });
  };
}
function lm(e) {
  if (Array.isArray(e)) return e;
}
function am(e, t) {
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
function Ps(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Fc(e, t) {
  if (e) {
    if (typeof e == "string") return Ps(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Ps(e, t) : void 0;
  }
}
function cm() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Hc(e, t) {
  return lm(e) || am(e, t) || Fc(e, t) || cm();
}
var ml = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Xt = {}, gr = {};
Object.defineProperty(gr, "__esModule", { value: !0 });
gr.bind = void 0;
function um(e, t) {
  var n = t.type, r = t.listener, o = t.options;
  return e.addEventListener(n, r, o), function() {
    e.removeEventListener(n, r, o);
  };
}
gr.bind = um;
var Eo = {}, pn = ml && ml.__assign || function() {
  return pn = Object.assign || function(e) {
    for (var t, n = 1, r = arguments.length; n < r; n++) {
      t = arguments[n];
      for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    }
    return e;
  }, pn.apply(this, arguments);
};
Object.defineProperty(Eo, "__esModule", { value: !0 });
Eo.bindAll = void 0;
var fm = gr;
function vl(e) {
  if (!(typeof e > "u"))
    return typeof e == "boolean" ? {
      capture: e
    } : e;
}
function dm(e, t) {
  if (t == null)
    return e;
  var n = pn(pn({}, e), { options: pn(pn({}, vl(t)), vl(e.options)) });
  return n;
}
function gm(e, t, n) {
  var r = t.map(function(o) {
    var s = dm(o, n);
    return (0, fm.bind)(e, s);
  });
  return function() {
    r.forEach(function(s) {
      return s();
    });
  };
}
Eo.bindAll = gm;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.bindAll = e.bind = void 0;
  var t = gr;
  Object.defineProperty(e, "bind", { enumerable: !0, get: function() {
    return t.bind;
  } });
  var n = Eo;
  Object.defineProperty(e, "bindAll", { enumerable: !0, get: function() {
    return n.bindAll;
  } });
})(Xt);
var Lc = "data-pdnd-honey-pot";
function jc(e) {
  return e instanceof Element && e.hasAttribute(Lc);
}
function zc(e) {
  var t = document.elementsFromPoint(e.x, e.y), n = Hc(t, 2), r = n[0], o = n[1];
  return r ? jc(r) ? o ?? null : r : null;
}
var pm = 2147483647, hm = {
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
function en(e) {
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
var ls = en(function() {
  return typeof HTMLElement < "u" && typeof HTMLElement.prototype.showPopover == "function";
});
function wl(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function yl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? wl(Object(n), !0).forEach(function(r) {
      dr(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : wl(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
var sr = 2, bl = sr / 2;
function mm(e) {
  return {
    x: Math.floor(e.x),
    y: Math.floor(e.y)
  };
}
function vm(e) {
  return {
    x: e.x - bl,
    y: e.y - bl
  };
}
function wm(e) {
  return {
    x: Math.max(e.x, 0),
    y: Math.max(e.y, 0)
  };
}
function ym(e) {
  return {
    x: Math.min(e.x, window.innerWidth - sr),
    y: Math.min(e.y, window.innerHeight - sr)
  };
}
function _l(e) {
  var t = e.client, n = ym(wm(vm(mm(t))));
  return DOMRect.fromRect({
    x: n.x,
    y: n.y,
    width: sr,
    height: sr
  });
}
function Sl(e) {
  var t = e.clientRect;
  return {
    left: "".concat(t.left, "px"),
    top: "".concat(t.top, "px"),
    width: "".concat(t.width, "px"),
    height: "".concat(t.height, "px")
  };
}
function bm(e) {
  var t = e.client, n = e.clientRect;
  return (
    // is within horizontal bounds
    t.x >= n.x && t.x <= n.x + n.width && // is within vertical bounds
    t.y >= n.y && t.y <= n.y + n.height
  );
}
function _m(e) {
  var t = e.initial, n = document.createElement("div");
  n.setAttribute(Lc, "true"), ls() && n.setAttribute("popover", "manual");
  var r = _l({
    client: t
  });
  Object.assign(n.style, yl(yl({
    position: "fixed"
  }, ls() ? (
    // needs to come first as it has 'inset: unset' which
    // needs to be overridden by our top / left values
    hm
  ) : {
    // Fallback: using maximum possible z-index so that this element
    // will always be on top of other positioned content.
    zIndex: pm
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
  }, Sl({
    clientRect: r
  }))), document.body.appendChild(n), ls() && n.showPopover();
  var o = Xt.bind(window, {
    type: "pointermove",
    listener: function(i) {
      var a = {
        x: i.clientX,
        y: i.clientY
      };
      r = _l({
        client: a
      }), Object.assign(n.style, Sl({
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
    if (o(), bm({
      client: a,
      clientRect: r
    })) {
      n.remove();
      return;
    }
    function c() {
      f(), n.remove();
    }
    var f = Xt.bindAll(window, [
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
function Sm() {
  var e = null;
  function t() {
    return e = null, Xt.bind(window, {
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
        r = _m({
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
function xm(e) {
  if (Array.isArray(e)) return Ps(e);
}
function Rm(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function Cm() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Kc(e) {
  return xm(e) || Rm(e) || Fc(e) || Cm();
}
var Im = en(function() {
  return navigator.userAgent.includes("Firefox");
}), si = en(function() {
  var t = navigator, n = t.userAgent;
  return n.includes("AppleWebKit") && !n.includes("Chrome");
});
function Mm(e) {
  return "nodeName" in e;
}
function Em(e) {
  return Mm(e) && e.ownerDocument !== document;
}
var Ds = {
  isLeavingWindow: Symbol("leaving"),
  isEnteringWindow: Symbol("entering")
};
(function() {
  if (typeof window > "u" || !si())
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
  Xt.bindAll(
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
        !n.isOverWindow && n.enterCount === 0 && (s[Ds.isEnteringWindow] = !0), n.isOverWindow = !0, n.enterCount++;
      }
    }, {
      type: "dragleave",
      listener: function(s) {
        n.enterCount--, n.isOverWindow && n.enterCount === 0 && (s[Ds.isLeavingWindow] = !0, n.isOverWindow = !1);
      }
    }],
    // using `capture: true` so that adding event listeners
    // in bubble phase will have the correct symbols
    {
      capture: !0
    }
  );
})();
function Am(e) {
  var t = e.dragLeave;
  return si() ? t.hasOwnProperty(Ds.isLeavingWindow) : !1;
}
function Om(e) {
  var t = e.dragLeave, n = t.type, r = t.relatedTarget;
  return n !== "dragleave" ? !1 : si() ? Am({
    dragLeave: t
  }) : r == null ? !0 : Im() ? Em(r) : r instanceof HTMLIFrameElement;
}
function Pm(e) {
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
function Yn(e) {
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
var Dm = function(t) {
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
}, as = Dm(function(e) {
  return e();
}), Vr = /* @__PURE__ */ function() {
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
function km(e) {
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
      }), Vr.schedule(function() {
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
      Vr.flush(), as.cancel(), s({
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
      as(function() {
        Vr.flush();
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
      Vr.flush(), as.cancel(), s({
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
var ks = {
  isActive: !1
};
function Vc() {
  return !ks.isActive;
}
function Tm(e) {
  return e.dataTransfer ? e.dataTransfer.setDragImage.bind(e.dataTransfer) : null;
}
function Fm(e) {
  var t = e.current, n = e.next;
  if (t.length !== n.length)
    return !0;
  for (var r = 0; r < t.length; r++)
    if (t[r].element !== n[r].element)
      return !0;
  return !1;
}
function Hm(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = e.dispatchEvent;
  if (!Vc())
    return;
  var s = Lm({
    event: t,
    dragType: n,
    getDropTargetsOver: r
  });
  ks.isActive = !0;
  var i = {
    current: s
  };
  cs({
    event: t,
    current: s.dropTargets
  });
  var a = km({
    source: n.payload,
    dispatchEvent: o,
    initial: s
  });
  function c(y) {
    var M = Fm({
      current: i.current.dropTargets,
      next: y.dropTargets
    });
    i.current = y, M && a.dragUpdate({
      current: i.current
    });
  }
  function f(y) {
    var M = Yn(y), E = jc(y.target) ? zc({
      x: M.clientX,
      y: M.clientY
    }) : y.target, A = r({
      target: E,
      input: M,
      source: n.payload,
      current: i.current.dropTargets
    });
    A.length && (y.preventDefault(), cs({
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
    ks.isActive = !1, w();
  }
  var w = Xt.bindAll(
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
        Om({
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
          input: Yn(M)
        }, !i.current.dropTargets.length) {
          d();
          return;
        }
        M.preventDefault(), cs({
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
          input: Yn(M)
        }, d();
      }
    }].concat(Kc(Pm({
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
    nativeSetDragImage: Tm(t)
  });
}
function cs(e) {
  var t, n = e.event, r = e.current, o = (t = r[0]) === null || t === void 0 ? void 0 : t.dropEffect;
  o != null && n.dataTransfer && (n.dataTransfer.dropEffect = o);
}
function Lm(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = Yn(t);
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
var xl = {
  canStart: Vc,
  start: Hm
}, Ts = /* @__PURE__ */ new Map();
function jm(e) {
  var t = e.typeKey, n = e.mount, r = Ts.get(t);
  if (r)
    return r.usageCount++, r;
  var o = {
    typeKey: t,
    unmount: n(),
    usageCount: 1
  };
  return Ts.set(t, o), o;
}
function zm(e) {
  var t = jm(e);
  return function() {
    t.usageCount--, !(t.usageCount > 0) && (t.unmount(), Ts.delete(e.typeKey));
  };
}
function Bc(e, t) {
  var n = t.attribute, r = t.value;
  return e.setAttribute(n, r), function() {
    return e.removeAttribute(n);
  };
}
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
function Ot(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Rl(Object(n), !0).forEach(function(r) {
      dr(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Rl(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function us(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = Km(e)) || t) {
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
function Km(e, t) {
  if (e) {
    if (typeof e == "string") return Cl(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Cl(e, t) : void 0;
  }
}
function Cl(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function fs(e) {
  return e.slice(0).reverse();
}
function Vm(e) {
  var t = e.typeKey, n = e.defaultDropEffect, r = /* @__PURE__ */ new WeakMap(), o = "data-drop-target-for-".concat(t), s = "[".concat(o, "]");
  function i(y) {
    return r.set(y.element, y), function() {
      return r.delete(y.element);
    };
  }
  function a(y) {
    var M = Mo(Bc(y.element, {
      attribute: o,
      value: "true"
    }), i(y));
    return en(M);
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
    var ee = (M = (E = K.getData) === null || E === void 0 ? void 0 : E.call(K, L)) !== null && M !== void 0 ? M : {}, ae = (A = (z = K.getDropEffect) === null || z === void 0 ? void 0 : z.call(K, L)) !== null && A !== void 0 ? A : n, Y = {
      data: ee,
      element: K.element,
      dropEffect: ae,
      // we are collecting _actual_ drop targets, so these are
      // being applied _not_ due to stickiness
      isActiveDueToStickiness: !1
    };
    return c({
      source: I,
      target: K.element.parentElement,
      input: _,
      // Using bubble ordering. Same ordering as `event.getPath()`
      result: [].concat(Kc(j), [Y])
    });
  }
  function f(y) {
    var M = y.eventName, E = y.payload, A = us(E.location.current.dropTargets), z;
    try {
      for (A.s(); !(z = A.n()).done; ) {
        var I, O = z.value, _ = r.get(O.element), D = Ot(Ot({}, E), {}, {
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
      var E = M.payload, A = new Set(E.location.current.dropTargets.map(function(J) {
        return J.element;
      })), z = /* @__PURE__ */ new Set(), I = us(E.location.previous.dropTargets), O;
      try {
        for (I.s(); !(O = I.n()).done; ) {
          var _, D = O.value;
          z.add(D.element);
          var j = r.get(D.element), W = A.has(D.element), K = Ot(Ot({}, E), {}, {
            self: D
          });
          if (j == null || (_ = j.onDropTargetChange) === null || _ === void 0 || _.call(j, K), !W) {
            var L;
            j == null || (L = j.onDragLeave) === null || L === void 0 || L.call(j, K);
          }
        }
      } catch (J) {
        I.e(J);
      } finally {
        I.f();
      }
      var ee = us(E.location.current.dropTargets), ae;
      try {
        for (ee.s(); !(ae = ee.n()).done; ) {
          var Y, he, Re = ae.value;
          if (!z.has(Re.element)) {
            var we = Ot(Ot({}, E), {}, {
              self: Re
            }), q = r.get(Re.element);
            q == null || (Y = q.onDropTargetChange) === null || Y === void 0 || Y.call(q, we), q == null || (he = q.onDragEnter) === null || he === void 0 || he.call(q, we);
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
    var M = y.source, E = y.target, A = y.input, z = y.current, I = c({
      source: M,
      target: E,
      input: A
    });
    if (I.length >= z.length)
      return I;
    for (var O = fs(z), _ = fs(I), D = [], j = 0; j < O.length; j++) {
      var W, K = O[j], L = _[j];
      if (L != null) {
        D.push(L);
        continue;
      }
      var ee = D[j - 1], ae = O[j - 1];
      if ((ee == null ? void 0 : ee.element) !== (ae == null ? void 0 : ae.element))
        break;
      var Y = r.get(K.element);
      if (!Y)
        break;
      var he = {
        input: A,
        source: M,
        element: Y.element
      };
      if (Y.canDrop && !Y.canDrop(he) || !((W = Y.getIsSticky) !== null && W !== void 0 && W.call(Y, he)))
        break;
      D.push(Ot(Ot({}, K), {}, {
        // making it clear to consumers this drop target is active due to stickiness
        isActiveDueToStickiness: !0
      }));
    }
    return fs(D);
  }
  return {
    dropTargetForConsumers: a,
    getIsOver: w,
    dispatchEvent: h
  };
}
function Bm(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = Nm(e)) || t) {
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
function Nm(e, t) {
  if (e) {
    if (typeof e == "string") return Il(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Il(e, t) : void 0;
  }
}
function Il(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Ml(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function $m(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ml(Object(n), !0).forEach(function(r) {
      dr(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ml(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Wm() {
  var e = /* @__PURE__ */ new Set(), t = null;
  function n(s) {
    t && (!s.canMonitor || s.canMonitor(t.canMonitorArgs)) && t.active.add(s);
  }
  function r(s) {
    var i = $m({}, s);
    e.add(i), n(i);
    function a() {
      e.delete(i), t && t.active.delete(i);
    }
    return en(a);
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
      var c = Bm(e), f;
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
function Um(e) {
  var t = e.typeKey, n = e.mount, r = e.dispatchEventToSource, o = e.onPostDispatch, s = e.defaultDropEffect, i = Wm(), a = Vm({
    typeKey: t,
    defaultDropEffect: s
  });
  function c(h) {
    r == null || r(h), a.dispatchEvent(h), i.dispatchEvent(h), o == null || o(h);
  }
  function f(h) {
    var w = h.event, y = h.dragType;
    xl.start({
      event: w,
      dragType: y,
      getDropTargetsOver: a.getIsOver,
      dispatchEvent: c
    });
  }
  function d() {
    function h() {
      var w = {
        canStart: xl.canStart,
        start: f
      };
      return n(w);
    }
    return zm({
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
var qm = en(function() {
  return navigator.userAgent.toLocaleLowerCase().includes("android");
}), Gm = "pdnd:android-fallback", El = "text/plain", Xm = "text/uri-list", Ym = "application/vnd.pdnd", oo = /* @__PURE__ */ new WeakMap();
function Zm(e) {
  return oo.set(e.element, e), function() {
    oo.delete(e.element);
  };
}
var Al = Sm(), Nc = Um({
  typeKey: "element",
  defaultDropEffect: "move",
  mount: function(t) {
    return Mo(Al.bindEvents(), Xt.bind(document, {
      type: "dragstart",
      listener: function(r) {
        var o, s, i, a, c, f;
        if (t.canStart(r) && !r.defaultPrevented && r.dataTransfer) {
          var d = r.target;
          if (d instanceof HTMLElement) {
            var h = oo.get(d);
            if (h) {
              var w = Yn(r), y = {
                element: h.element,
                dragHandle: (o = h.dragHandle) !== null && o !== void 0 ? o : null,
                input: w
              };
              if (h.canDrag && !h.canDrag(y)) {
                r.preventDefault();
                return;
              }
              if (h.dragHandle) {
                var M = zc({
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
                  var I = Hc(z[A], 2), O = I[0], _ = I[1];
                  r.dataTransfer.setData(O, _ ?? "");
                }
              qm() && !r.dataTransfer.types.includes(El) && !r.dataTransfer.types.includes(Xm) && r.dataTransfer.setData(El, Gm), r.dataTransfer.setData(Ym, "");
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
    (n = oo.get(s.source.element)) === null || n === void 0 || (r = n[o]) === null || r === void 0 || r.call(
      n,
      // I cannot seem to get the types right here.
      // TS doesn't seem to like that one event can need `nativeSetDragImage`
      // @ts-expect-error
      s
    );
  },
  onPostDispatch: Al.getOnPostDispatch()
}), Jm = Nc.dropTarget;
function Qm(e) {
  var t = Mo(
    // making the draggable register the adapter rather than drop targets
    // this is because you *must* have a draggable element to start a drag
    // but you _might_ not have any drop targets immediately
    // (You might create drop targets async)
    Nc.registerUsage(),
    Zm(e),
    Bc(e.element, {
      attribute: "draggable",
      value: "true"
    })
  );
  return en(t);
}
const ds = /* @__PURE__ */ new Map(), wn = "pnl-tst-row";
function ev(e, t) {
  return Mo(
    Qm({
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
        return { type: wn, group: "", sourceId: "", key: null, keys: [] };
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
    Jm({
      element: e,
      // Position is deliberately not consulted here. pdnd settles `canDrop` when
      // the pointer enters the element, and the element is the whole layout, so an
      // answer given from the pointer's first position would stand for the rest of
      // the drag. Which pane the pointer is over, and whether that pane accepts
      // the drag at all, is decided in `getData`, which runs on every move.
      canDrop: ({ source: n }) => n.data.type === wn,
      getData: ({ input: n, source: r }) => {
        for (const o of t.panes) {
          const s = o.dropData(n, r.data);
          if (s) return s;
        }
        return { type: wn, key: null, paneId: "" };
      },
      onDrag: ({ self: n }) => {
        const r = n.data.key, o = hl(n.data);
        for (const s of t.panes)
          s.id() === n.data.paneId && r && o ? s.showDrop(r, o) : s.clearDrop();
      },
      onDragLeave: () => {
        for (const n of t.panes) n.clearDrop();
      },
      onDrop: ({ self: n, source: r, location: o }) => {
        for (const c of t.panes) c.clearDrop();
        const s = t.panes.find((c) => c.id() === n.data.paneId), i = n.data.key, a = hl(n.data);
        !s || !i || !a || a.type === "instruction-blocked" || s.drop(r.data, i, a, o.current.input);
      }
    })
  );
}
function tv(e, t) {
  let n = ds.get(e);
  return n || (n = { panes: [] }, n.cleanup = ev(e, n), ds.set(e, n)), n.panes.push(t), () => {
    var r;
    n.panes = n.panes.filter((o) => o !== t), !(n.panes.length > 0) && ((r = n.cleanup) == null || r.call(n), ds.delete(e));
  };
}
const nv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ef5350" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m6 10h-4v8a4 4 0 1 1-4-4 3.96 3.96 0 0 1 2 .555V8h6Z"/></svg>', rv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#ff7043" d="M2 2a1 1 0 0 0-1 1v10c0 .554.446 1 1 1h12c.554 0 1-.446 1-1V3a1 1 0 0 0-1-1zm0 3h12v8H2zm1 2 2 2-2 2 1 1 3-3-3-3zm5 3.5V12h5v-1.5z"/></svg>', ov = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#7e57c2" d="M20 18h-2v-2h-2v2c0 .193 0 .703 1.254 1.033A3.345 3.345 0 0 1 20 22h2v2h2v-2c0-.388-.562-.851-1.254-1.034C20.356 20.34 20 18.84 20 18m-3.254 2.966C14.356 20.34 14 18.84 14 18h-2v-2h-2v8h2v-2h4v2h2v-2c0-.388-.562-.851-1.254-1.034"/><path fill="#7e57c2" d="M24 4H4v20a4 4 0 0 0 4 4h16.16A3.84 3.84 0 0 0 28 24.16V8a4 4 0 0 0-4-4m2 14h-2v-2h-2v2c0 .193 0 .703 1.254 1.033A3.345 3.345 0 0 1 26 22v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1 2-2h2a2 2 0 0 1 2 2Z"/></svg>', sv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ffca28" d="M16 24c-5.525 0-10-.9-10-2v4c0 1.1 4.475 2 10 2s10-.9 10-2v-4c0 1.1-4.475 2-10 2m0-8c-5.525 0-10-.9-10-2v4c0 1.1 4.475 2 10 2s10-.9 10-2v-4c0 1.1-4.475 2-10 2m0-12C10.477 4 6 4.895 6 6v4c0 1.1 4.475 2 10 2s10-.9 10-2V6c0-1.105-4.477-2-10-2"/></svg>', iv = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/><path fill="#42a5f5" d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5z"/></svg>', lv = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m8.668 6h3.6641l-3.6641-3.668v3.668m-4.668-4.668h5.332l4 4v8c0 0.73828-0.59375 1.3359-1.332 1.3359h-8c-0.73828 0-1.332-0.59766-1.332-1.3359v-10.664c0-0.74219 0.59375-1.3359 1.332-1.3359m3.332 1.3359h-3.332v10.664h8v-6h-4.668z" fill="#90a4ae" /></svg>', av = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m6.922 3.768-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232" fill="#90a4ae" /></svg>', cv = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.483 6H4.721a1 1 0 0 0-.949.684L2 12V5h12a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232l-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h11l2.403-5.606A1 1 0 0 0 14.483 6" fill="#90a4ae" /></svg>', uv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#e65100" d="m4 4 2 22 10 2 10-2 2-22Zm19.72 7H11.28l.29 3h11.86l-.802 9.335L15.99 25l-6.635-1.646L8.93 19h3.02l.19 2 3.86.77 3.84-.77.29-4H8.84L8 8h16Z"/></svg>', fv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#26a69a" d="M8.5 6h4l-4-4zM3.875 1H9.5l4 4v8.6c0 .773-.616 1.4-1.375 1.4h-8.25c-.76 0-1.375-.627-1.375-1.4V2.4c0-.777.612-1.4 1.375-1.4M4 13.6h8V8l-2.625 2.8L8 9.4zm1.25-7.7c-.76 0-1.375.627-1.375 1.4s.616 1.4 1.375 1.4c.76 0 1.375-.627 1.375-1.4S6.009 5.9 5.25 5.9"/></svg>', dv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#ffca28" d="M2 2v12h12V2zm6 6h1v4a1.003 1.003 0 0 1-1 1H7a1.003 1.003 0 0 1-1-1v-1h1v1h1zm3 0h2v1h-2v1h1a1.003 1.003 0 0 1 1 1v1a1.003 1.003 0 0 1-1 1h-2v-1h2v-1h-1a1.003 1.003 0 0 1-1-1V9a1.003 1.003 0 0 1 1-1"/></svg>', gv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path fill="#f9a825" d="M560-160v-80h120q17 0 28.5-11.5T720-280v-80q0-38 22-69t58-44v-14q-36-13-58-44t-22-69v-80q0-17-11.5-28.5T680-720H560v-80h120q50 0 85 35t35 85v80q0 17 11.5 28.5T840-560h40v160h-40q-17 0-28.5 11.5T800-360v80q0 50-35 85t-85 35zm-280 0q-50 0-85-35t-35-85v-80q0-17-11.5-28.5T120-400H80v-160h40q17 0 28.5-11.5T160-600v-80q0-50 35-85t85-35h120v80H280q-17 0-28.5 11.5T240-680v80q0 38-22 69t-58 44v14q36 13 58 44t22 69v80q0 17 11.5 28.5T280-240h120v80z"/></svg>', pv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#42a5f5" d="m14 10-4 3.5L6 10H4v12h4v-6l2 2 2-2v6h4V10zm12 6v-6h-4v6h-4l6 8 6-8z"/></svg>', hv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ef5350" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m4.93 10.44c.41.9.93 1.64 1.53 2.15l.41.32c-.87.16-2.07.44-3.34.93l-.11.04.5-1.04c.45-.87.78-1.66 1.01-2.4m6.48 3.81c.18-.18.27-.41.28-.66.03-.2-.02-.39-.12-.55-.29-.47-1.04-.69-2.28-.69l-1.29.07-.87-.58c-.63-.52-1.2-1.43-1.6-2.56l.04-.14c.33-1.33.64-2.94-.02-3.6a.85.85 0 0 0-.61-.24h-.24c-.37 0-.7.39-.79.77-.37 1.33-.15 2.06.22 3.27v.01c-.25.88-.57 1.9-1.08 2.93l-.96 1.8-.89.49c-1.2.75-1.77 1.59-1.88 2.12-.04.19-.02.36.05.54l.03.05.48.31.44.11c.81 0 1.73-.95 2.97-3.07l.18-.07c1.03-.33 2.31-.56 4.03-.75 1.03.51 2.24.74 3 .74.44 0 .74-.11.91-.3m-.41-.71.09.11c-.01.1-.04.11-.09.13h-.04l-.19.02c-.46 0-1.17-.19-1.9-.51.09-.1.13-.1.23-.1 1.4 0 1.8.25 1.9.35M7.83 17c-.65 1.19-1.24 1.85-1.69 2 .05-.38.5-1.04 1.21-1.69zm3.02-6.91c-.23-.9-.24-1.63-.07-2.05l.07-.12.15.05c.17.24.19.56.09 1.1l-.03.16-.16.82z"/></svg>', mv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#e64a19" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zM8 11v2h1v6H8v1h4v-1h-1v-2h2a3 3 0 0 0 3-3 3 3 0 0 0-3-3zm5 2a1 1 0 0 1 1 1 1 1 0 0 1-1 1h-2v-2z"/></svg>', vv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#0288d1" d="M9.86 2A2.86 2.86 0 0 0 7 4.86v1.68h4.29c.39 0 .71.57.71.96H4.86A2.86 2.86 0 0 0 2 10.36v3.781a2.86 2.86 0 0 0 2.86 2.86h1.18v-2.68a2.85 2.85 0 0 1 2.85-2.86h5.25c1.58 0 2.86-1.271 2.86-2.851V4.86A2.86 2.86 0 0 0 14.14 2zm-.72 1.61c.4 0 .72.12.72.71s-.32.891-.72.891c-.39 0-.71-.3-.71-.89s.32-.711.71-.711"/><path fill="#fdd835" d="M17.959 7v2.68a2.85 2.85 0 0 1-2.85 2.859H9.86A2.85 2.85 0 0 0 7 15.389v3.75a2.86 2.86 0 0 0 2.86 2.86h4.28A2.86 2.86 0 0 0 17 19.14v-1.68h-4.291c-.39 0-.709-.57-.709-.96h7.14A2.86 2.86 0 0 0 22 13.64V9.86A2.86 2.86 0 0 0 19.14 7zM8.32 11.513l-.004.004.038-.004zm6.54 7.276c.39 0 .71.3.71.89a.71.71 0 0 1-.71.71c-.4 0-.72-.12-.72-.71s.32-.89.72-.89"/></svg>', wv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#8bc34a" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zm4 7.5h-4v2h1l-2 1.67L10 13h1v-2H7v2h1l3 2.5L8 18H7v2h4v-2h-1l2-1.67L14 18h-1v2h4v-2h-1l-3-2.5 3-2.5h1z"/></svg>', yv = '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 16 16"><path fill="#0288d1" d="M2 2v12h12V2zm4 6h3v1H8v4H7V9H6zm5 0h2v1h-2v1h1a1.003 1.003 0 0 1 1 1v1a1.003 1.003 0 0 1-1 1h-2v-1h2v-1h-1a1.003 1.003 0 0 1-1-1V9a1.003 1.003 0 0 1 1-1"/></svg>', bv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ff9800" d="m24 6 2 6h-4l-2-6h-3l2 6h-4l-2-6h-3l2 6H8L6 6H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3V6Z"/></svg>', _v = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#01579b" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zM7 13l1.5 7h2l1.5-3 1.5 3h2l1.5-7h1v-2h-4v2h1l-.9 4.2L13 15h-2l-1.1 2.2L9 13h1v-2H6v2z"/></svg>', Sv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#8bc34a" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m.12 13.5 3.74 3.74 1.42-1.41-2.33-2.33 2.33-2.33-1.42-1.41zm11.16 0-3.74-3.74-1.42 1.41 2.33 2.33-2.33 2.33 1.42 1.41z"/></svg>', xv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ff5252" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2m12 16v-2H9v2zm-4-4v-2H6v2z"/></svg>', Rv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#afb42b" d="M14 17h-2v-2h-2v-2h2v2h2m0-6h-2v2h2v2h-2v-2h-2V9h2V7h-2V5h2v2h2m5-4H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2"/></svg>', Ol = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Pl = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Cv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Iv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Mv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Ev = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Av = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Ov = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Pv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Dv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, kv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Tv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Fv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Hv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Lv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, jv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, zv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Kv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Vv = ["aria-label"], Bv = {
  key: 0,
  class: "pnl-tst-tsep",
  "aria-hidden": "true"
}, Nv = {
  key: 1,
  class: "pnl-tst-search"
}, $v = ["innerHTML"], Wv = ["value", "aria-label", "placeholder"], Uv = ["aria-label", "aria-keyshortcuts", "aria-disabled", "title", "tabindex", "onClick", "onFocus"], qv = ["innerHTML"], Gv = {
  key: 1,
  class: "pnl-tst-empty"
}, Xv = ["aria-label", "aria-colcount", "aria-rowcount"], Yv = {
  key: 0,
  class: "pnl-tst-head",
  role: "rowgroup"
}, Zv = {
  class: "pnl-tst-hrow",
  role: "row",
  "aria-rowindex": 1
}, Jv = ["aria-colindex", "aria-sort", "aria-keyshortcuts", "tabindex", "onClick", "onFocus", "onKeydown"], Qv = { class: "pnl-tst-hlabel" }, e0 = ["innerHTML"], t0 = ["onDblclick", "onMousedown", "onTouchstart"], n0 = {
  class: "pnl-tst-body",
  role: "rowgroup"
}, r0 = ["aria-level", "aria-posinset", "aria-setsize", "aria-rowindex", "aria-expanded", "aria-selected", "aria-haspopup", "tabindex", "onClick", "onContextmenu", "onFocus"], o0 = ["aria-colindex"], s0 = ["onClick"], i0 = {
  key: 1,
  class: "pnl-tst-twisty pnl-tst-twisty--leaf",
  "aria-hidden": "true"
}, l0 = ["checked", ".indeterminate", "aria-label", "onClick"], a0 = ["innerHTML"], c0 = ["value", "aria-label", "onKeydown", "onBlur"], u0 = {
  key: 2,
  class: "pnl-tst-value"
}, f0 = {
  key: 3,
  class: "pnl-tst-modal"
}, d0 = {
  id: "pnl-tst-confirm-message",
  class: "pnl-tst-dialog-message"
}, g0 = { class: "pnl-tst-dialog-actions" }, p0 = ["aria-label"], h0 = {
  key: 0,
  class: "pnl-tst-msep",
  role: "separator"
}, m0 = ["aria-keyshortcuts", "aria-disabled", "tabindex", "onClick", "onFocus"], v0 = ["innerHTML"], w0 = { class: "pnl-tst-mlabel" }, y0 = {
  key: 0,
  class: "pnl-tst-mkeys",
  "aria-hidden": "true"
}, b0 = "title", Dl = 16, Kn = "search", Pt = "|", dn = 4, _0 = 500, S0 = {
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
      columnSizingFeature: Mh,
      columnResizingFeature: Ih,
      rowExpandingFeature: Eh,
      rowSelectionFeature: Vh,
      rowSortingFeature: Bh,
      coreRowModel: hc(),
      expandedRowModel: Nh(),
      sortedRowModel: Uh(),
      sortFns: { alphanumeric: sp, text: ip }
    }, r = $(() => (t.state.columns || []).length > 0), o = $(() => r.value && t.state.options.sortable !== !1), s = $(() => t.state.options.sort_folders_first === !0), i = $(() => r.value && t.state.options.resizable !== !1), a = $(() => {
      const l = t.state.columns || [];
      return l.length === 0 ? [{ id: b0, header: "", accessorFn: (u) => u.title }] : l.map((u) => {
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
      audio: nv,
      console: rv,
      css: ov,
      database: sv,
      document: iv,
      file: lv,
      folder: av,
      "folder-open": cv,
      html: uv,
      image: fv,
      javascript: dv,
      json: gv,
      markdown: pv,
      pdf: hv,
      powerpoint: mv,
      python: vv,
      table: wv,
      typescript: yv,
      video: bv,
      word: _v,
      xml: Sv,
      yaml: xv,
      zip: Rv
    };
    function A(l) {
      return l ? { ...E, ...t.state.icons || {} }[l] ?? null : null;
    }
    function z(l) {
      const u = f(l.original, "icon");
      return u ? (Et(l) ? A(`${u}-open`) : null) ?? A(u) : null;
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
    function ee(l, u) {
      return l.length === u.length && l.every((g, v) => g.id === u[v].id && g.desc === u[v].desc);
    }
    const ae = $(() => o.value && K.value.length > 0), Y = /* @__PURE__ */ fe(he(t.state.columnWidths));
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
    const we = /* @__PURE__ */ fe(null), q = Xh({
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
        columnSizing: Y.value
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
        Y.value = he(
          typeof l == "function" ? l(Y.value) : l
        );
      }
    });
    function J(l) {
      if (l.getIsSelected()) return "all";
      if (!D.value || l.subRows.length === 0) return "none";
      const u = l.subRows.map(J);
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
        ee(K.value, u) || (K.value = u);
      }
    ), ye(
      () => [Y.value, we.value],
      ([l, u]) => {
        u || t.setColumnWidths(l);
      },
      { flush: "post" }
    ), ye(
      () => t.state.columnWidths,
      (l) => {
        const u = he(l);
        Re(Y.value, u) || (Y.value = u);
      }
    ), ye(
      () => [t.state.options.expand_all, t.state.source],
      ([l]) => {
        l && q.toggleAllRowsExpanded(!0);
      },
      { immediate: !0 }
    );
    const ce = $(() => (t.state.filterText ?? "").trim().toLowerCase()), Ce = $(() => ce.value.length > 0), Mt = /* @__PURE__ */ fe(t.state.filterText ?? "");
    ye(
      () => t.state.filterText,
      (l) => {
        Mt.value = l ?? "";
      }
    );
    function gt(l) {
      Mt.value = l, t.setFilterText(l);
    }
    function ze(l) {
      return l.getAllCells().some((u) => String(u.getValue() ?? "").toLowerCase().includes(ce.value));
    }
    const de = $(() => {
      if (!Ce.value) return q.getRowModel().rows;
      const l = q.getSortedRowModel().flatRows, u = /* @__PURE__ */ new Set();
      for (const g of l)
        if (ze(g)) {
          u.add(g.id);
          for (let v = g.getParentRow(); v; v = v.getParentRow()) u.add(v.id);
        }
      return l.filter((g) => u.has(g.id));
    }), Ue = $(() => {
      var l;
      return ((l = q.getHeaderGroups()[0]) == null ? void 0 : l.headers) ?? [];
    }), xn = $(() => t.state.options.indent_px ?? 16), Lt = $(() => t.state.options.aria_label ?? "Tree table"), tn = $(() => Ce.value ? "No matches" : "No data"), Rn = $(() => r.value ? 2 : 1), pr = $(() => de.value.length + (r.value ? 1 : 0)), qe = /* @__PURE__ */ fe(!1), Cn = /* @__PURE__ */ fe(null), p = /* @__PURE__ */ new Map();
    function m(l, u) {
      u ? p.set(l, u) : p.delete(l);
    }
    const b = $(() => {
      const l = Ue.value;
      return l.length === 0 ? null : l.some((g) => g.column.id === Cn.value) ? Cn.value : l[0].column.id;
    });
    function R(l) {
      const u = Ue.value;
      if (u.length === 0) return;
      const g = u[Math.max(0, Math.min(l, u.length - 1))];
      qe.value = !0, Cn.value = g.column.id, He(() => {
        var v;
        return (v = p.get(g.column.id)) == null ? void 0 : v.focus();
      });
    }
    function C() {
      const l = Ue.value;
      R(l.findIndex((u) => u.column.id === b.value));
    }
    function S() {
      qe.value = !1, He(() => {
        var l;
        return (l = jt.get(In.value)) == null ? void 0 : l.focus();
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
      return u ? u === "asc" ? Pl : Ol : null;
    }
    function x(l) {
      F(l) && l.column.toggleSorting();
    }
    function B(l) {
      R(Ue.value.indexOf(l)), x(l);
    }
    function H(l) {
      return i.value && l.column.getCanResize();
    }
    function V(l) {
      var v;
      const u = l.column.id;
      if (u in Y.value) return null;
      const g = Math.round(((v = p.get(u)) == null ? void 0 : v.getBoundingClientRect().width) ?? 0);
      return g <= 0 || g === l.column.getSize() ? null : (Y.value = { ...Y.value, [u]: g }, g);
    }
    async function N(l, u) {
      if (!H(l)) return;
      u.stopPropagation(), V(l) !== null && await He(), l.getResizeHandler()(u), we.value = l.column.id;
      const g = () => {
        we.value = null;
      };
      for (const v of ["mouseup", "touchend", "touchcancel"])
        document.addEventListener(v, g, { once: !0 });
    }
    function Q(l, u) {
      if (!H(l)) return;
      const g = l.column, v = g.columnDef.minSize ?? 20, k = g.columnDef.maxSize ?? Number.MAX_SAFE_INTEGER, G = V(l) ?? g.getSize(), ve = Math.min(Math.max(Math.round(G + u), v), k);
      q.setColumnSizing((Ie) => ({ ...Ie, [g.id]: ve }));
    }
    function oe(l) {
      H(l) && l.column.resetSize();
    }
    function se(l, u) {
      const g = Ue.value, v = Math.max(
        0,
        g.findIndex((k) => k.column.id === b.value)
      );
      if (u.altKey) {
        switch (u.key) {
          case "ArrowLeft":
            Q(l, -Dl);
            break;
          case "ArrowRight":
            Q(l, Dl);
            break;
          case "Home":
            oe(l);
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
    const me = $(() => {
      const l = /* @__PURE__ */ new Map();
      for (const u of de.value) {
        const g = u.parentId ?? "", v = l.get(g) ?? [];
        v.push(u.id), l.set(g, v);
      }
      return l;
    });
    function _e(l) {
      return me.value.get(l.parentId ?? "") ?? [];
    }
    function Ke(l) {
      return _e(l).indexOf(l.id) + 1;
    }
    function Ve(l) {
      return _e(l).length;
    }
    function Ge(l) {
      return Ce.value ? (me.value.get(l.id) ?? []).length > 0 : l.getCanExpand();
    }
    function Et(l) {
      return Ce.value ? Ge(l) : l.getIsExpanded();
    }
    const Pe = $(() => {
      if (!r.value) return {};
      const l = { "--pnl-tst-total": `${q.getTotalSize()}px` };
      return Ue.value.forEach((u, g) => {
        l[`--pnl-tst-w${g}`] = `${u.column.getSize()}px`;
      }), l;
    }), Be = $(() => {
      const l = Ue.value[0];
      return l ? l.column.id in Y.value : !1;
    });
    function nn(l) {
      return r.value ? l === 0 && !Be.value ? { flex: "1 0 var(--pnl-tst-w0)" } : { flex: `0 0 var(--pnl-tst-w${l})` } : { flex: "1 1 0" };
    }
    function hr(l) {
      return { ...nn(0), paddingInlineStart: `${l.depth * xn.value}px` };
    }
    const rn = /* @__PURE__ */ fe(null), on = /* @__PURE__ */ fe(!0), jt = /* @__PURE__ */ new Map();
    function zt(l) {
      rn.value = l, on.value = !0, qe.value = !1;
    }
    function $c(l, u) {
      u ? jt.set(l, u) : jt.delete(l);
    }
    const In = $(() => {
      const l = de.value;
      return l.length === 0 ? null : l.some((u) => u.id === rn.value) ? rn.value : l[0].id;
    });
    function Ne(l) {
      l != null && (zt(l), He(() => {
        var u;
        return (u = jt.get(l)) == null ? void 0 : u.focus();
      }));
    }
    function mr(l) {
      const u = de.value;
      u.length !== 0 && Ne(u[Math.max(0, Math.min(l, u.length - 1))].id);
    }
    function ii(l, u) {
      const g = de.value;
      if (g.length === 0) return;
      const v = g[Math.max(0, Math.min(l, g.length - 1))], k = (u == null ? void 0 : u.shiftKey) && _.value && O.value !== "single";
      k && pt.value === null && (pt.value = In.value), Ne(v.id), k && li(v, !1);
    }
    function Wc(l) {
      const u = de.value;
      if (u.length === 0) return;
      const g = Math.max(
        0,
        u.findIndex((G) => G.id === In.value)
      ), v = u[g];
      if (l.ctrlKey || l.metaKey) {
        const G = {
          a: "select-all",
          c: "copy",
          f: Kn,
          v: "paste",
          x: "cut",
          z: l.shiftKey ? "redo" : "undo"
        }[l.key.toLowerCase()];
        if (G && yr(G)) {
          l.preventDefault(), Po(G);
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
        if (G && yr(G)) {
          l.preventDefault(), Po(G);
          return;
        }
      }
      if (Ar.value && (l.key === "ContextMenu" || l.key === "F10" && l.shiftKey)) {
        l.preventDefault(), xu(v);
        return;
      }
      const k = {
        Insert: l.shiftKey ? "new-file" : "new-folder",
        F2: "rename",
        Delete: "delete",
        Escape: "clear-selection"
      }[l.key];
      if (k && yr(k)) {
        l.preventDefault(), Po(k);
        return;
      }
      switch (l.key) {
        case "ArrowDown":
          l.preventDefault(), ii(g + 1, l);
          break;
        case "ArrowUp":
          l.preventDefault(), g === 0 && r.value && !l.shiftKey ? C() : ii(g - 1, l);
          break;
        case "ArrowRight":
          if (l.preventDefault(), !Ge(v)) break;
          Et(v) ? mr(g + 1) : (v.toggleExpanded(!0), Ne(v.id));
          break;
        case "ArrowLeft":
          l.preventDefault(), !Ce.value && v.getCanExpand() && v.getIsExpanded() ? (v.toggleExpanded(!1), Ne(v.id)) : v.parentId && Ne(v.parentId);
          break;
        case "Home":
          l.preventDefault(), mr(0);
          break;
        case "End":
          l.preventDefault(), mr(u.length - 1);
          break;
        case "Enter":
          l.preventDefault(), t.emitEvent("activate", { key: v.id });
          break;
        case " ":
          if (!_.value) break;
          l.preventDefault(), fi(v);
          break;
      }
    }
    const pt = /* @__PURE__ */ fe(null);
    function vr(l) {
      pt.value = l.id, W.value = {}, l.toggleSelected(!0, { selectChildren: !1 });
    }
    function li(l, u) {
      const g = de.value, v = g.findIndex((Ie) => Ie.id === pt.value), k = g.findIndex((Ie) => Ie.id === l.id);
      if (k === -1) return;
      if (v === -1) {
        vr(l);
        return;
      }
      u || (W.value = {});
      const [G, ve] = v <= k ? [v, k] : [k, v];
      for (let Ie = G; Ie <= ve; Ie += 1)
        g[Ie].toggleSelected(!0, { selectChildren: !1 });
    }
    const Uc = $(() => t.state.options.toggle_on_click === !0);
    function qc(l) {
      const u = M(W.value);
      return u.length === 1 && u[0] === l.id;
    }
    function ai() {
      W.value = {}, pt.value = null, on.value = !1;
    }
    function ci() {
      M(W.value).length === 0 && (on.value = !1);
    }
    ye(
      () => M(W.value).length > 0,
      (l) => {
        l && (on.value = !0);
      }
    );
    function Gc(l, u) {
      zt(l.id);
      const g = !!(u != null && u.shiftKey || u != null && u.ctrlKey || u != null && u.metaKey);
      _.value && !g && Uc.value && qc(l) ? ai() : _.value && O.value !== "single" ? u != null && u.shiftKey ? li(l, u.ctrlKey || u.metaKey) : u != null && u.ctrlKey || u != null && u.metaKey ? (pt.value = l.id, Zc(l)) : vr(l) : _.value && vr(l), t.emitEvent("activate", { key: l.id });
    }
    function Xc(l) {
      zt(l.id), !Ce.value && l.toggleExpanded();
    }
    function ui(l) {
      return J(l) === "all";
    }
    function Yc(l) {
      return J(l) === "some";
    }
    function Zc(l) {
      zt(l.id), l.toggleSelected(void 0, { selectChildren: !1 }), ci();
    }
    function fi(l) {
      zt(l.id), l.toggleSelected(!ui(l), {
        selectChildren: D.value,
        deselectParents: D.value
      }), ci();
    }
    function Jc(l) {
      fi(l), Ne(l.id);
    }
    const Ao = {
      "new-folder": { icon: Ov, label: "New folder", keys: "Insert", node: {} },
      "new-file": {
        icon: Av,
        label: "New file",
        keys: "Shift+Insert",
        node: { allow_children: !1 }
      },
      rename: { icon: kv, label: "Rename", keys: "F2" },
      delete: { icon: zv, label: "Delete", keys: "Delete" },
      undo: { icon: Kv, label: "Undo", keys: "Control+Z" },
      redo: { icon: Tv, label: "Redo", keys: "Control+Shift+Z" },
      cut: { icon: Fv, label: "Cut", keys: "Control+X" },
      copy: { icon: Ev, label: "Copy", keys: "Control+C" },
      paste: { icon: Mv, label: "Paste", keys: "Control+V" },
      "move-up": { icon: Pl, label: "Move up", keys: "Alt+ArrowUp" },
      "move-down": { icon: Ol, label: "Move down", keys: "Alt+ArrowDown" },
      outdent: { icon: Pv, label: "Outdent", keys: "Alt+ArrowLeft" },
      indent: { icon: Dv, label: "Indent", keys: "Alt+ArrowRight" },
      "expand-all": { icon: Cv, label: "Expand all" },
      "collapse-all": { icon: Iv, label: "Collapse all" },
      "select-all": { icon: jv, label: "Select all", keys: "Control+A" },
      "clear-selection": { icon: Lv, label: "Clear selection", keys: "Escape" }
    }, Qc = [
      "undo",
      "redo",
      Pt,
      "new-folder",
      "new-file",
      "rename",
      "delete",
      Pt,
      "cut",
      "copy",
      "paste",
      Pt,
      "move-up",
      "move-down",
      "outdent",
      "indent",
      Pt,
      "expand-all",
      "collapse-all",
      Pt,
      "select-all",
      "clear-selection",
      Kn
    ], eu = [
      "new-folder",
      "new-file",
      Pt,
      "rename",
      "delete",
      Pt,
      "cut",
      "copy",
      "paste"
    ];
    function di(l, u) {
      const g = l === !0 ? u : Array.isArray(l) ? l : [], v = [];
      return g.forEach((k, G) => {
        const ve = typeof k == "string" ? {} : k || {}, Ie = typeof k == "string" ? k : ve.id, Ai = `${Ie}#${G}`;
        if (Ie === Pt || Ie === Kn) {
          v.push({ uid: Ai, id: Ie });
          return;
        }
        const Hn = Ao[Ie];
        if (!Hn) return;
        const Oi = ve.label ?? Hn.label;
        v.push({
          uid: Ai,
          id: Ie,
          label: Oi,
          icon: A(ve.icon) ?? Hn.icon,
          keys: Hn.keys,
          node: { title: Oi, ...Hn.node ?? {}, ...ve.node ?? {} }
        });
      }), v;
    }
    const wr = $(() => di(t.state.options.toolbar, Qc)), Oo = $(
      () => di(t.state.options.menu, eu).filter((l) => l.id !== Kn)
    ), tu = $(() => wr.value.length > 0), nu = $(() => t.state.options.toolbar_label ?? "Tree actions"), gi = $(() => t.state.options.search_label ?? "Search");
    function pi(l) {
      return wr.value.find((u) => u.id === l) ?? Oo.value.find((u) => u.id === l) ?? null;
    }
    function yr(l) {
      return pi(l) !== null;
    }
    function Po(l) {
      const u = pi(l);
      u && Ho(u);
    }
    const Fe = $(() => de.value.find((l) => l.id === In.value) ?? null);
    function ru(l) {
      return de.value.filter((u) => (u.parentId ?? "") === (l.parentId ?? ""));
    }
    function hi() {
      const l = Fe.value;
      if (!l) return [];
      const u = Ci(l), g = l.parentId ?? "";
      return u.every((k) => {
        var G;
        return (((G = Tn(k)) == null ? void 0 : G.parentId) ?? "") === g;
      }) ? u : [l.id];
    }
    function Do() {
      const l = Fe.value;
      if (!l) return [];
      if (!_.value || !l.getIsSelected()) return [l.id];
      const u = de.value.filter((g) => g.getIsSelected()).map((g) => g.id);
      return u.length > 0 ? u : [l.id];
    }
    const ko = $(() => {
      var l;
      return ((l = t.state.clipboard) == null ? void 0 : l.keys) ?? [];
    }), ou = $(() => {
      var u;
      const l = new Set(((u = t.state.clipboard) == null ? void 0 : u.mode) === "cut" ? ko.value : []);
      return l.size === 0 || de.value.forEach((g) => {
        g.parentId && l.has(g.parentId) && l.add(g.id);
      }), l;
    });
    function Mn(l) {
      const u = Fe.value;
      if (!u) return null;
      const g = new Set(hi()), v = ru(u), k = v.map((ve, Ie) => g.has(ve.id) ? Ie : -1).filter((ve) => ve >= 0);
      if (k.length === 0) return null;
      let G = (l < 0 ? Math.min(...k) : Math.max(...k)) + l;
      for (; G >= 0 && G < v.length && g.has(v[G].id); ) G += l;
      return v[G] ?? null;
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
          He(() => {
            l.index !== void 0 ? mr(l.index) : l.pasted !== void 0 ? iu(l.pasted) : su(l.added);
          });
        }
      }
    );
    function su(l) {
      const u = q.getCoreRowModel().flatRows.find((g) => !l.has(g.id));
      u && (Ne(u.id), _.value && (W.value = {}, pt.value = u.id, u.toggleSelected(!0, { selectChildren: !1 })), yr("rename") && He(() => Sr(u.id, !0)));
    }
    function iu(l) {
      const u = q.getCoreRowModel().flatRows.filter((k) => !l.has(k.id)), g = new Set(u.map((k) => k.id)), v = u.filter((k) => !g.has(k.parentId ?? ""));
      v.length !== 0 && (Ne(v[0].id), _.value && (W.value = {}, pt.value = v[0].id, v.forEach((k) => k.toggleSelected(!0, { selectChildren: !1 }))));
    }
    const sn = /* @__PURE__ */ fe(null), br = /* @__PURE__ */ fe(""), En = /* @__PURE__ */ fe(null), ht = /* @__PURE__ */ fe(null), To = /* @__PURE__ */ fe(null), Fo = /* @__PURE__ */ fe(null), lu = $(() => t.state.options.extension_warning !== !1);
    function mi(l) {
      const u = String(l ?? ""), g = u.lastIndexOf(".");
      return g < 0 ? "" : u.slice(g + 1).toLowerCase();
    }
    function au(l, u) {
      return lu.value && f(l, "allow_children") === !1 && mi(u) !== mi(l.title ?? "");
    }
    let _r = null;
    function Sr(l, u = !1) {
      const g = Tn(l);
      g && (_r = u ? l : null, br.value = g.original.title ?? "", sn.value = l, t.setEditingKey(l), He(() => {
        var v, k;
        (v = En.value) == null || v.focus(), (k = En.value) == null || k.select();
      }));
    }
    function xr() {
      _r = null, ht.value = null, sn.value = null, t.setEditingKey("");
    }
    function vi(l) {
      if (ht.value || sn.value !== l.id) return;
      const u = br.value.trim(), g = u.length > 0 && u !== (l.original.title ?? "");
      if (g && _r !== l.id && au(l.original, u)) {
        ht.value = { key: l.id, title: u, previous: l.original.title ?? l.id }, He(() => {
          var v;
          return (v = Fo.value) == null ? void 0 : v.focus();
        });
        return;
      }
      if (xr(), !g) {
        Ne(l.id);
        return;
      }
      Xe = { key: l.id }, t.emitEvent("rename", { key: l.id, title: u });
    }
    function wi() {
      const { key: l, title: u } = ht.value;
      ht.value = null, xr(), Xe = { key: l }, t.emitEvent("rename", { key: l, title: u });
    }
    function yi() {
      ht.value = null, He(() => {
        var l, u;
        (l = En.value) == null || l.focus(), (u = En.value) == null || u.select();
      });
    }
    function cu(l) {
      var v;
      const u = l.key;
      if (u === "Escape" || u === "n" || u === "N") {
        l.preventDefault(), yi();
        return;
      }
      if (u === "y" || u === "Y") {
        l.preventDefault(), wi();
        return;
      }
      if (u !== "Tab" && u !== "ArrowLeft" && u !== "ArrowRight") return;
      l.preventDefault(), (v = (l.target === To.value ? Fo : To).value) == null || v.focus();
    }
    function uu(l) {
      if (sn.value !== l.id) return;
      const u = _r === l.id;
      if (xr(), !u) {
        Ne(l.id);
        return;
      }
      Xe = { index: de.value.findIndex((g) => g.id === l.id) }, t.emitEvent("delete", { key: l.id, keys: [l.id] });
    }
    function fu(l, u) {
      u.key === "Enter" ? (u.preventDefault(), vi(l)) : u.key === "Escape" && (u.preventDefault(), uu(l));
    }
    ye(
      () => t.state.editingKey,
      (l) => {
        (l || "") !== (sn.value || "") && (l ? Sr(l) : xr());
      }
    ), ws(() => {
      t.state.editingKey && Sr(t.state.editingKey);
    });
    function Rr(l, u) {
      const g = Fe.value;
      !g || !l || (Xe = { key: g.id }, t.emitEvent("move", {
        key: g.id,
        keys: hi(),
        position: u,
        anchorKey: l.id
      }));
    }
    function du(l) {
      const u = Fe.value, g = u ? f(u.original, "allow_children") === !1 ? "after" : "child" : null;
      u && g === "child" && !Ce.value && u.toggleExpanded(!0), Xe = { added: new Set(q.getCoreRowModel().flatRows.map((v) => v.id)) }, t.emitEvent("add", { anchorKey: (u == null ? void 0 : u.id) ?? null, position: g, node: l.node });
    }
    function gu() {
      var u;
      const l = Do();
      l.length !== 0 && (Xe = { index: de.value.findIndex((g) => {
        var v;
        return g.id === ((v = Fe.value) == null ? void 0 : v.id);
      }) }, t.emitEvent("delete", { key: ((u = Fe.value) == null ? void 0 : u.id) ?? null, keys: l }));
    }
    function pu(l) {
      Xe = { index: de.value.findIndex((u) => {
        var g;
        return u.id === ((g = Fe.value) == null ? void 0 : g.id);
      }) }, t.emitEvent(l, {});
    }
    function hu(l) {
      var g;
      const u = Do();
      u.length !== 0 && t.emitEvent(l, { key: ((g = Fe.value) == null ? void 0 : g.id) ?? null, keys: u });
    }
    function mu() {
      var v;
      const l = Fe.value, u = l ? f(l.original, "allow_children") === !1 ? "after" : "child" : null;
      l && u === "child" && !Ce.value && l.toggleExpanded(!0);
      const g = ko.value;
      Xe = ((v = t.state.clipboard) == null ? void 0 : v.mode) === "cut" ? { key: g[0] } : { pasted: new Set(q.getCoreRowModel().flatRows.map((k) => k.id)) }, t.emitEvent("paste", { anchorKey: (l == null ? void 0 : l.id) ?? null, position: u });
    }
    function An(l) {
      var u;
      switch (l.id) {
        case "new-folder":
        case "new-file":
          return !0;
        case "rename":
          return Fe.value !== null;
        case "delete":
        case "cut":
        case "copy":
          return Do().length > 0;
        case "paste":
          return ko.value.length > 0;
        case "undo":
          return t.state.canUndo === !0;
        case "redo":
          return t.state.canRedo === !0;
        case "move-up":
        case "move-down":
          return !ae.value && Mn(l.id === "move-up" ? -1 : 1) !== null;
        case "indent": {
          const g = Mn(-1);
          return g !== null && f(g.original, "allow_children") !== !1;
        }
        case "outdent":
          return !!((u = Fe.value) != null && u.parentId);
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
    function bi(l) {
      return l.keys ? l.keys.replace("Control", "Ctrl") : "";
    }
    function vu(l) {
      return l.keys ? `${l.label} (${bi(l)})` : l.label;
    }
    function Ho(l) {
      var u, g, v, k;
      if (An(l))
        switch (l.id) {
          case "new-folder":
          case "new-file":
            du(l);
            break;
          case "rename":
            Sr(Fe.value.id);
            break;
          case "delete":
            gu();
            break;
          case "undo":
          case "redo":
            pu(l.id);
            break;
          case "cut":
          case "copy":
            hu(l.id);
            break;
          case "paste":
            mu();
            break;
          case "move-up":
            Rr(Mn(-1), "before");
            break;
          case "move-down":
            Rr(Mn(1), "after");
            break;
          case "indent": {
            const G = Mn(-1);
            G && !Ce.value && G.toggleExpanded(!0), Rr(G, "child");
            break;
          }
          case "outdent":
            Rr(Tn((u = Fe.value) == null ? void 0 : u.parentId), "after");
            break;
          case "expand-all":
            q.toggleAllRowsExpanded(!0);
            break;
          case "collapse-all":
            q.toggleAllRowsExpanded(!1);
            break;
          case "select-all":
            W.value = Object.fromEntries(de.value.map((G) => [G.id, !0])), pt.value = ((g = de.value[0]) == null ? void 0 : g.id) ?? null;
            break;
          case "clear-selection":
            ai();
            break;
          case Kn:
            (v = Lo.value) == null || v.focus(), (k = Lo.value) == null || k.select();
            break;
        }
    }
    const Lo = /* @__PURE__ */ fe(null), jo = $(() => wr.value.filter((l) => l.id in Ao)), Cr = /* @__PURE__ */ fe(null), zo = /* @__PURE__ */ new Map(), _i = $(() => {
      const l = jo.value;
      return l.length === 0 ? null : l.some((u) => u.uid === Cr.value) ? Cr.value : l[0].uid;
    });
    function wu(l, u) {
      u ? zo.set(l, u) : zo.delete(l);
    }
    function Ir(l) {
      const u = jo.value;
      if (u.length === 0) return;
      const g = u[Math.max(0, Math.min(l, u.length - 1))].uid;
      Cr.value = g, He(() => {
        var v;
        return (v = zo.get(g)) == null ? void 0 : v.focus();
      });
    }
    function yu(l) {
      const u = jo.value, g = Math.max(
        0,
        u.findIndex((v) => v.uid === _i.value)
      );
      switch (l.key) {
        case "ArrowRight":
          l.preventDefault(), Ir(g + 1);
          break;
        case "ArrowLeft":
          l.preventDefault(), Ir(g - 1);
          break;
        case "Home":
          l.preventDefault(), Ir(0);
          break;
        case "End":
          l.preventDefault(), Ir(u.length - 1);
          break;
      }
    }
    const On = /* @__PURE__ */ fe(!1), Mr = /* @__PURE__ */ fe(null), Pn = /* @__PURE__ */ fe({ left: 0, top: 0 }), Er = /* @__PURE__ */ fe(null), ln = /* @__PURE__ */ fe(0), Ko = /* @__PURE__ */ new Map(), Dn = $(() => Oo.value.filter((l) => l.id in Ao)), Ar = $(() => Dn.value.length > 0), bu = $(() => t.state.options.menu_label ?? "Row actions");
    function _u(l, u) {
      u ? Ko.set(l, u) : Ko.delete(l);
    }
    function Si(l) {
      return Dn.value.findIndex((u) => u.uid === l.uid);
    }
    function xi(l, u, g) {
      if (!Ar.value) return;
      rn.value !== l.id && zt(l.id), Mr.value = l.id, Pn.value = { left: u, top: g };
      const v = Dn.value.findIndex((k) => An(k));
      ln.value = Math.max(0, v), On.value = !0, He(Ru);
    }
    function Su(l, u) {
      Ar.value && (u.preventDefault(), _.value && !l.getIsSelected() && vr(l), xi(l, u.clientX, u.clientY));
    }
    function xu(l) {
      var g;
      const u = (g = jt.get(l.id)) == null ? void 0 : g.getBoundingClientRect();
      xi(l, u ? u.left + xn.value : dn, u ? u.bottom : dn);
    }
    function Ru() {
      const l = Er.value;
      if (!l) return;
      const u = l.getBoundingClientRect();
      let { left: g, top: v } = Pn.value;
      g + u.width > window.innerWidth - dn && (g = Math.max(dn, g - u.width)), v + u.height > window.innerHeight - dn && (v = Math.max(dn, v - u.height)), Pn.value = { left: g, top: v }, kn(ln.value);
    }
    function kn(l) {
      const u = Dn.value;
      if (u.length === 0) return;
      const g = Math.max(0, Math.min(l, u.length - 1));
      ln.value = g, He(() => {
        var v;
        return (v = Ko.get(u[g].uid)) == null ? void 0 : v.focus();
      });
    }
    function Or(l = !0, u = void 0) {
      if (!On.value) return;
      const g = Mr.value;
      On.value = !1, Mr.value = null, l && g != null && He(() => {
        var v;
        return (v = jt.get(g)) == null ? void 0 : v.focus(u);
      });
    }
    function Cu(l) {
      if (!An(l)) return;
      const u = Mr.value;
      Or(!1), Ne(u), Ho(l);
    }
    function Iu(l) {
      const u = ln.value;
      switch (l.key) {
        case "ArrowDown":
          l.preventDefault(), kn(u + 1);
          break;
        case "ArrowUp":
          l.preventDefault(), kn(u - 1);
          break;
        case "Home":
          l.preventDefault(), kn(0);
          break;
        case "End":
          l.preventDefault(), kn(Dn.value.length - 1);
          break;
        case "Escape":
        case "Tab":
          l.preventDefault(), Or();
          break;
      }
    }
    function Vo(l) {
      Er.value && l.composedPath().includes(Er.value) || Or(!1);
    }
    function an() {
      Or(!0, { preventScroll: !0 });
    }
    ye(On, (l) => {
      l ? (document.addEventListener("pointerdown", Vo, !0), window.addEventListener("resize", an), window.addEventListener("scroll", an, !0)) : (document.removeEventListener("pointerdown", Vo, !0), window.removeEventListener("resize", an), window.removeEventListener("scroll", an, !0));
    }), ys(() => {
      document.removeEventListener("pointerdown", Vo, !0), window.removeEventListener("resize", an), window.removeEventListener("scroll", an, !0);
    });
    const Mu = ["reorder-above", "reorder-below", "make-child", "reparent"], Bo = $(() => t.state.options.enable_dnd === !0), No = $(() => String(t.state.options.transfer_group || "")), cn = $(() => String(t.state.tableId || "")), Ri = /* @__PURE__ */ fe([]), Pr = /* @__PURE__ */ fe(null);
    function Tn(l) {
      return de.value.find((u) => u.id === l) ?? null;
    }
    function Eu(l, u) {
      let g = l;
      for (; g; ) {
        if (u.includes(g.id)) return !0;
        g = g.getParentRow();
      }
      return !1;
    }
    function Ci(l) {
      if (!_.value || !l.getIsSelected()) return [l.id];
      const u = /* @__PURE__ */ new Set();
      for (let v = l.getParentRow(); v; v = v.getParentRow()) u.add(v.id);
      const g = de.value.filter((v) => v.getIsSelected() && !u.has(v.id)).map((v) => v.id);
      return g.length > 1 ? g : [l.id];
    }
    function Au(l, u, g) {
      if (!g && Eu(l, u)) return Mu;
      const v = ae.value ? ["reorder-above", "reorder-below"] : [];
      return f(l.original, "allow_children") === !1 && v.push("make-child"), v;
    }
    function Ou(l) {
      if (Ge(l) && Et(l)) return "expanded";
      const u = _e(l);
      return u[u.length - 1] === l.id ? "last-in-group" : "standard";
    }
    let $o = null, Fn = null;
    function Wo() {
      Fn && clearTimeout(Fn), Fn = null, $o = null;
    }
    function Pu(l, u) {
      if ($o === l || (Wo(), !u || u.type === "instruction-blocked")) return;
      const g = Tn(l);
      !g || !g.getCanExpand() || g.getIsExpanded() || ($o = l, Fn = setTimeout(() => {
        Fn = null;
        const v = Tn(l);
        v && v.getCanExpand() && !v.getIsExpanded() && v.toggleExpanded(!0);
      }, _0));
    }
    function Du() {
      Pr.value = null, Wo();
    }
    const Ii = /* @__PURE__ */ fe(null);
    function ku() {
      let l = Ii.value;
      if (!l) return null;
      let u = l.getRootNode();
      for (; u.host; )
        l = u.host, u = l.getRootNode();
      return l;
    }
    function Dr(l) {
      for (const u of de.value) {
        const g = jt.get(u.id);
        if (!g) continue;
        const v = g.getBoundingClientRect();
        if (l.clientX >= v.left && l.clientX < v.right && l.clientY >= v.top && l.clientY < v.bottom)
          return { row: u, element: g, rect: v };
      }
      return null;
    }
    function Tu(l, u) {
      const g = ".pnl-tst-check, .pnl-tst-twisty, .pnl-tst-edit";
      for (const v of l.element.querySelectorAll(g)) {
        const k = v.getBoundingClientRect();
        if (u.clientX >= k.left && u.clientX < k.right && u.clientY >= k.top && u.clientY < k.bottom)
          return !0;
      }
      return !1;
    }
    const Fu = {
      id: () => cn.value,
      // Anything outside a row (the header, the empty space below the last row) is
      // not a drag handle, and neither is a row control.
      canDragFrom(l) {
        const u = Dr(l);
        return u !== null && !Tu(u, l);
      },
      dragData(l) {
        const u = Dr(l);
        return u ? {
          type: wn,
          group: No.value,
          sourceId: cn.value,
          key: u.row.id,
          keys: Ci(u.row)
        } : null;
      },
      // The registered element is the host, so the default preview would be a
      // snapshot of the whole layout. Point it at the row being dragged, offset so
      // the preview stays under the cursor where it was grabbed.
      preview(l, u) {
        const g = Dr(l);
        return g ? (u(g.element, l.clientX - g.rect.left, l.clientY - g.rect.top), !0) : !1;
      },
      setDragging(l) {
        Ri.value = l;
      },
      // Our own rows always. Another pane's only when both name the same group, so a
      // table that opted into nothing shows no drop state at all rather than
      // accepting a drag Python is bound to reject.
      dropData(l, u) {
        const g = Dr(l);
        if (!g) return null;
        const v = u.sourceId !== cn.value;
        if (v && !(No.value && u.group === No.value))
          return { type: wn, key: null, paneId: cn.value };
        const k = { type: wn, key: g.row.id, paneId: cn.value };
        return im(k, {
          element: g.element,
          input: l,
          currentLevel: g.row.depth,
          indentPerLevel: xn.value,
          mode: Ou(g.row),
          block: Au(g.row, u.keys ?? [], v)
        });
      },
      showDrop(l, u) {
        Pr.value = { key: l, instruction: u }, Pu(l, u);
      },
      clearDrop: Du,
      drop(l, u, g, v) {
        const k = l.keys ?? [];
        if (k.length === 0) return;
        const G = {
          targetKey: u,
          instruction: g.type,
          desiredLevel: g.desiredLevel ?? g.currentLevel
        };
        if (l.sourceId === cn.value) {
          if (k.includes(u)) return;
          t.emitEvent("move", { key: l.key, keys: k, ...G });
          return;
        }
        Xe = { pasted: new Set(q.getCoreRowModel().flatRows.map((ve) => ve.id)) }, t.emitEvent("transfer", {
          keys: k,
          sourceId: l.sourceId,
          copy: !!(v != null && v.ctrlKey || v != null && v.altKey),
          ...G
        });
      }
    };
    let At = null;
    function Mi() {
      At == null || At(), At = null;
      const l = ku();
      !l || !Bo.value || (At = tv(l, Fu));
    }
    ws(Mi), ye(Bo, Mi), ys(() => {
      Wo(), At == null || At();
    });
    function Uo(l) {
      var u;
      return ((u = Pr.value) == null ? void 0 : u.key) === l.id ? Pr.value.instruction : null;
    }
    function Hu(l) {
      const u = f(l.original, "class");
      return typeof u == "string" ? u : null;
    }
    function Lu(l) {
      const u = Uo(l);
      return {
        "pnl-tst-row--draggable": Bo.value,
        "pnl-tst-row--dragging": Ri.value.includes(l.id),
        "pnl-tst-row--blocked": (u == null ? void 0 : u.type) === "instruction-blocked",
        "pnl-tst-row--child-target": (u == null ? void 0 : u.type) === "make-child"
      };
    }
    function Ei(l) {
      const u = Uo(l);
      return u ? u.type === "reorder-above" ? "pnl-tst-dropline--above" : u.type === "reorder-below" || u.type === "reparent" ? "pnl-tst-dropline--below" : null : null;
    }
    function ju(l) {
      const u = Uo(l);
      return u ? { insetInlineStart: `${(u.type === "reparent" ? u.desiredLevel : u.currentLevel) * u.indentPerLevel}px` } : null;
    }
    return (l, u) => (ne(), re("div", {
      ref_key: "rootElement",
      ref: Ii,
      class: "pnl-tst"
    }, [
      tu.value ? (ne(), re("div", {
        key: 0,
        class: "pnl-tst-toolbar",
        role: "toolbar",
        "aria-orientation": "horizontal",
        "aria-label": nu.value
      }, [
        (ne(!0), re(Me, null, jn(wr.value, (g) => (ne(), re(Me, {
          key: g.uid
        }, [
          g.id === "|" ? (ne(), re("span", Bv)) : g.id === "search" ? (ne(), re("label", Nv, [
            Se("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: Wt(Hv)
            }, null, 8, $v),
            Se("input", {
              ref_for: !0,
              ref: (v) => Lo.value = v,
              type: "search",
              value: Mt.value,
              "aria-label": gi.value,
              placeholder: gi.value,
              onInput: u[0] || (u[0] = (v) => gt(v.target.value))
            }, null, 40, Wv)
          ])) : (ne(), re("button", {
            key: 2,
            ref_for: !0,
            ref: (v) => wu(g.uid, v),
            type: "button",
            class: "pnl-tst-tbtn",
            "aria-label": g.label,
            "aria-keyshortcuts": g.keys,
            "aria-disabled": !An(g),
            title: vu(g),
            tabindex: g.uid === _i.value ? 0 : -1,
            onClick: (v) => Ho(g),
            onFocus: (v) => Cr.value = g.uid,
            onKeydown: yu
          }, [
            Se("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: g.icon
            }, null, 8, qv)
          ], 40, Uv))
        ], 64))), 128))
      ], 8, Vv)) : Ye("", !0),
      de.value.length === 0 ? (ne(), re("div", Gv, Dt(tn.value), 1)) : (ne(), re("div", {
        key: 2,
        class: ot(["pnl-tst-grid", { "pnl-tst-grid--resizing": we.value !== null }]),
        role: "treegrid",
        "aria-label": Lt.value,
        "aria-colcount": Ue.value.length,
        "aria-rowcount": pr.value,
        style: Tt(Pe.value),
        onKeydown: Wc
      }, [
        r.value ? (ne(), re("div", Yv, [
          Se("div", Zv, [
            (ne(!0), re(Me, null, jn(Ue.value, (g, v) => (ne(), re("div", {
              key: g.id,
              ref_for: !0,
              ref: (k) => m(g.column.id, k),
              class: ot(["pnl-tst-hcell", { "pnl-tst-hcell--sortable": F(g) }]),
              role: "columnheader",
              "aria-colindex": v + 1,
              "aria-sort": T(g),
              "aria-keyshortcuts": H(g) ? "Alt+ArrowLeft Alt+ArrowRight Alt+Home" : void 0,
              tabindex: qe.value && g.column.id === b.value ? 0 : -1,
              style: Tt(nn(v)),
              onClick: (k) => B(g),
              onFocus: (k) => Cn.value = g.column.id,
              onKeydown: (k) => se(g, k)
            }, [
              Se("span", Qv, Dt(g.column.columnDef.header), 1),
              P(g) ? (ne(), re("span", {
                key: 0,
                class: "pnl-tst-sortind",
                "aria-hidden": "true",
                innerHTML: P(g)
              }, null, 8, e0)) : Ye("", !0),
              H(g) ? (ne(), re("span", {
                key: 1,
                class: ot(["pnl-tst-resize", { "pnl-tst-resize--active": we.value === g.column.id }]),
                "aria-hidden": "true",
                onClick: u[1] || (u[1] = fn(() => {
                }, ["stop"])),
                onDblclick: fn((k) => oe(g), ["stop"]),
                onMousedown: (k) => N(g, k),
                onTouchstart: (k) => N(g, k)
              }, null, 42, t0)) : Ye("", !0)
            ], 46, Jv))), 128))
          ])
        ])) : Ye("", !0),
        Se("div", n0, [
          (ne(!0), re(Me, null, jn(de.value, (g, v) => (ne(), re("div", {
            key: g.id,
            ref_for: !0,
            ref: (k) => $c(g.id, k),
            class: ot(["pnl-tst-row", [
              Lu(g),
              Hu(g),
              {
                "pnl-tst-row--active": on.value && g.id === rn.value,
                "pnl-tst-row--quiet": !on.value && g.id === rn.value,
                "pnl-tst-row--cut": ou.value.has(g.id)
              }
            ]]),
            role: "row",
            "aria-level": g.depth + 1,
            "aria-posinset": Ke(g),
            "aria-setsize": Ve(g),
            "aria-rowindex": v + Rn.value,
            "aria-expanded": Ge(g) ? Et(g) : void 0,
            "aria-selected": _.value ? g.getIsSelected() : void 0,
            "aria-haspopup": Ar.value ? "menu" : void 0,
            tabindex: !qe.value && g.id === In.value ? 0 : -1,
            onClick: (k) => Gc(g, k),
            onContextmenu: (k) => Su(g, k),
            onFocus: (k) => zt(g.id)
          }, [
            Ei(g) ? (ne(), re("span", {
              key: 0,
              class: ot(["pnl-tst-dropline", Ei(g)]),
              style: Tt(ju(g)),
              "aria-hidden": "true"
            }, null, 6)) : Ye("", !0),
            (ne(!0), re(Me, null, jn(g.getAllCells(), (k, G) => (ne(), re("div", {
              key: k.id,
              class: ot(["pnl-tst-cell", { "pnl-tst-cell--tree": G === 0 }]),
              role: "gridcell",
              "aria-colindex": G + 1,
              style: Tt(G === 0 ? hr(g) : nn(G))
            }, [
              G === 0 ? (ne(), re(Me, { key: 0 }, [
                Ge(g) ? (ne(), re("span", {
                  key: 0,
                  class: ot(["pnl-tst-twisty", { "pnl-tst-twisty--open": Et(g) }]),
                  "aria-hidden": "true",
                  onClick: fn((ve) => Xc(g), ["stop"])
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
                ])], 10, s0)) : (ne(), re("span", i0)),
                j.value ? (ne(), re("input", {
                  key: 2,
                  class: "pnl-tst-check",
                  type: "checkbox",
                  tabindex: "-1",
                  checked: ui(g),
                  ".indeterminate": Yc(g),
                  "aria-label": `Select ${g.original.title ?? g.id}`,
                  onClick: fn((ve) => Jc(g), ["stop"])
                }, null, 40, l0)) : Ye("", !0),
                z(g) ? (ne(), re("span", {
                  key: 3,
                  class: "pnl-tst-icon",
                  "aria-hidden": "true",
                  innerHTML: z(g)
                }, null, 8, a0)) : Ye("", !0)
              ], 64)) : Ye("", !0),
              G === 0 && sn.value === g.id ? (ne(), re("input", {
                key: 1,
                ref_for: !0,
                ref: (ve) => En.value = ve,
                class: "pnl-tst-edit",
                type: "text",
                value: br.value,
                "aria-label": `Rename ${g.original.title ?? g.id}`,
                onInput: u[2] || (u[2] = (ve) => br.value = ve.target.value),
                onClick: u[3] || (u[3] = fn(() => {
                }, ["stop"])),
                onKeydown: fn((ve) => fu(g, ve), ["stop"]),
                onBlur: (ve) => vi(g)
              }, null, 40, c0)) : (ne(), re("span", u0, Dt(k.getValue()), 1))
            ], 14, o0))), 128))
          ], 42, r0))), 128))
        ])
      ], 46, Xv)),
      ht.value ? (ne(), re("div", f0, [
        Se("div", {
          class: "pnl-tst-dialog",
          role: "alertdialog",
          "aria-modal": "true",
          "aria-label": "Rename",
          "aria-describedby": "pnl-tst-confirm-message",
          onKeydown: cu
        }, [
          Se("p", d0, " Rename " + Dt(ht.value.previous) + " to " + Dt(ht.value.title) + "? If you change a file name extension, the file might become unusable. ", 1),
          Se("div", g0, [
            Se("button", {
              ref_key: "confirmYesButton",
              ref: To,
              type: "button",
              class: "pnl-tst-dbtn",
              "aria-keyshortcuts": "Y",
              onClick: wi
            }, [...u[5] || (u[5] = [
              Se("span", { class: "pnl-tst-dkey" }, "Y", -1),
              Rs("es ", -1)
            ])], 512),
            Se("button", {
              ref_key: "confirmNoButton",
              ref: Fo,
              type: "button",
              class: "pnl-tst-dbtn",
              "aria-keyshortcuts": "N",
              onClick: yi
            }, [...u[6] || (u[6] = [
              Se("span", { class: "pnl-tst-dkey" }, "N", -1),
              Rs("o ", -1)
            ])], 512)
          ])
        ], 32)
      ])) : Ye("", !0),
      On.value ? (ne(), re("div", {
        key: 4,
        ref_key: "menuElement",
        ref: Er,
        class: "pnl-tst-menu",
        role: "menu",
        "aria-orientation": "vertical",
        "aria-label": bu.value,
        style: Tt({ left: `${Pn.value.left}px`, top: `${Pn.value.top}px` }),
        onKeydown: Iu
      }, [
        (ne(!0), re(Me, null, jn(Oo.value, (g) => (ne(), re(Me, {
          key: g.uid
        }, [
          g.id === "|" ? (ne(), re("div", h0)) : (ne(), re("button", {
            key: 1,
            ref_for: !0,
            ref: (v) => _u(g.uid, v),
            type: "button",
            class: "pnl-tst-mitem",
            role: "menuitem",
            "aria-keyshortcuts": g.keys,
            "aria-disabled": !An(g),
            tabindex: Si(g) === ln.value ? 0 : -1,
            onClick: (v) => Cu(g),
            onFocus: (v) => ln.value = Si(g)
          }, [
            Se("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: g.icon
            }, null, 8, v0),
            Se("span", w0, Dt(g.label), 1),
            g.keys ? (ne(), re("span", y0, Dt(bi(g)), 1)) : Ye("", !0)
          ], 40, m0))
        ], 64))), 128))
      ], 44, p0)) : Ye("", !0)
    ], 512));
  }
};
function x0({ model: e, el: t }) {
  t.style.display = "block", t.style.width = "100%", t.style.height = "100%";
  const n = document.createElement("div");
  n.className = "pnl-tst-root", n.style.height = "100%", t.append(n);
  const r = /* @__PURE__ */ fo({
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
  }, I = ig(S0, {
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
  x0 as render
};

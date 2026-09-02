/**
* @vue/shared v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function gs(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const ce = {}, rn = [], tt = () => {
}, cl = () => !1, Nr = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), $r = (e) => e.startsWith("onUpdate:"), Ee = Object.assign, hs = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, iu = Object.prototype.hasOwnProperty, se = (e, t) => iu.call(e, t), z = Array.isArray, It = (e) => qn(e) === "[object Map]", Ar = (e) => qn(e) === "[object Set]", li = (e) => qn(e) === "[object Date]", q = (e) => typeof e == "function", me = (e) => typeof e == "string", nt = (e) => typeof e == "symbol", ie = (e) => e !== null && typeof e == "object", ul = (e) => (ie(e) || q(e)) && q(e.then) && q(e.catch), fl = Object.prototype.toString, qn = (e) => fl.call(e), lu = (e) => qn(e).slice(8, -1), dl = (e) => qn(e) === "[object Object]", vs = (e) => me(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Pn = /* @__PURE__ */ gs(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Ur = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, au = /-\w/g, $e = Ur(
  (e) => e.replace(au, (t) => t.slice(1).toUpperCase())
), cu = /\B([A-Z])/g, Ut = Ur(
  (e) => e.replace(cu, "-$1").toLowerCase()
), pl = Ur((e) => e.charAt(0).toUpperCase() + e.slice(1)), Eo = Ur(
  (e) => e ? `on${pl(e)}` : ""
), Qe = (e, t) => !Object.is(e, t), Ao = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, gl = (e, t, n, r = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: r,
    value: n
  });
}, uu = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let ai;
const Wr = () => ai || (ai = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Ft(e) {
  if (z(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], o = me(r) ? gu(r) : Ft(r);
      if (o)
        for (const s in o)
          t[s] = o[s];
    }
    return t;
  } else if (me(e) || ie(e))
    return e;
}
const fu = /;(?![^(]*\))/g, du = /:([^]+)/, pu = /\/\*[^]*?\*\//g;
function gu(e) {
  const t = {};
  return e.replace(pu, "").split(fu).forEach((n) => {
    if (n) {
      const r = n.split(du);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function Ct(e) {
  let t = "";
  if (me(e))
    t = e;
  else if (z(e))
    for (let n = 0; n < e.length; n++) {
      const r = Ct(e[n]);
      r && (t += r + " ");
    }
  else if (ie(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const hu = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", vu = /* @__PURE__ */ gs(hu);
function hl(e) {
  return !!e || e === "";
}
function mu(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let r = 0; n && r < e.length; r++)
    n = zr(e[r], t[r]);
  return n;
}
function ci(e, t) {
  if (e.size !== t.size) return !1;
  const n = Array.from(t), r = new Uint8Array(n.length);
  for (const o of e) {
    let s = -1;
    for (let i = 0; i < n.length; i++)
      if (!r[i] && zr(o, n[i])) {
        s = i;
        break;
      }
    if (s < 0) return !1;
    r[s] = 1;
  }
  return !0;
}
function zr(e, t) {
  if (e === t) return !0;
  let n = li(e), r = li(t);
  if (n || r)
    return n && r ? e.getTime() === t.getTime() : !1;
  if (n = nt(e), r = nt(t), n || r)
    return e === t;
  if (n = z(e), r = z(t), n || r)
    return n && r ? mu(e, t) : !1;
  if (n = ie(e), r = ie(t), n || r) {
    if (!n || !r)
      return !1;
    if (n = It(e), r = It(t), n || r || (n = Ar(e), r = Ar(t), n || r))
      return n && r ? ci(e, t) : !1;
    const o = Object.keys(e).length, s = Object.keys(t).length;
    if (o !== s)
      return !1;
    for (const i in e) {
      const a = e.hasOwnProperty(i), c = t.hasOwnProperty(i);
      if (a && !c || !a && c || !zr(e[i], t[i]))
        return !1;
    }
  }
  return String(e) === String(t);
}
const vl = (e) => !!(e && e.__v_isRef === !0), St = (e) => me(e) ? e : e == null ? "" : z(e) || ie(e) && (e.toString === fl || !q(e.toString)) ? vl(e) ? St(e.value) : JSON.stringify(e, ml, 2) : String(e), ml = (e, t) => vl(t) ? ml(e, t.value) : It(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [r, o], s) => (n[Oo(r, s) + " =>"] = o, n),
    {}
  )
} : Ar(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Oo(n))
} : nt(t) ? Oo(t) : ie(t) && !z(t) && !dl(t) ? String(t) : t, Oo = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    nt(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let xe;
class wu {
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
function wl() {
  return xe;
}
function yu(e, t = !1) {
  xe && xe.cleanups.push(e);
}
let ae;
const Do = /* @__PURE__ */ new WeakSet();
class yl {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, xe && (xe.active ? xe.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Do.has(this) && (Do.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || _l(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, ui(this), xl(this);
    const t = ae, n = Ue;
    ae = this, Ue = !0;
    try {
      return this.fn();
    } finally {
      Sl(this), ae = t, Ue = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        ys(t);
      this.deps = this.depsTail = void 0, ui(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Do.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    qo(this) && this.run();
  }
  get dirty() {
    return qo(this);
  }
}
let bl = 0, kn, Tn;
function _l(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Tn, Tn = e;
    return;
  }
  e.next = kn, kn = e;
}
function ms() {
  bl++;
}
function ws() {
  if (--bl > 0)
    return;
  if (Tn) {
    let t = Tn;
    for (Tn = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; kn; ) {
    let t = kn;
    for (kn = void 0; t; ) {
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
function xl(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Sl(e) {
  let t, n = e.depsTail, r = n;
  for (; r; ) {
    const o = r.prevDep;
    r.version === -1 ? (r === n && (n = o), ys(r), bu(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = o;
  }
  e.deps = t, e.depsTail = n;
}
function qo(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Rl(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Rl(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Kn) || (e.globalVersion = Kn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !qo(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = ae, r = Ue;
  ae = e, Ue = !0;
  try {
    xl(e);
    const o = e.fn(e._value);
    (t.version === 0 || Qe(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    ae = n, Ue = r, Sl(e), e.flags &= -3;
  }
}
function ys(e, t = !1) {
  const { dep: n, prevSub: r, nextSub: o } = e;
  if (r && (r.nextSub = o, e.prevSub = void 0), o && (o.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
    n.computed.flags &= -5;
    for (let s = n.computed.deps; s; s = s.nextDep)
      ys(s, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function bu(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let Ue = !0;
const Cl = [];
function ft() {
  Cl.push(Ue), Ue = !1;
}
function dt() {
  const e = Cl.pop();
  Ue = e === void 0 ? !0 : e;
}
function ui(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = ae;
    ae = void 0;
    try {
      t();
    } finally {
      ae = n;
    }
  }
}
let Kn = 0;
class _u {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class bs {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!ae || !Ue || ae === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== ae)
      n = this.activeLink = new _u(ae, this), ae.deps ? (n.prevDep = ae.depsTail, ae.depsTail.nextDep = n, ae.depsTail = n) : ae.deps = ae.depsTail = n, Ml(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const r = n.nextDep;
      r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = ae.depsTail, n.nextDep = void 0, ae.depsTail.nextDep = n, ae.depsTail = n, ae.deps === n && (ae.deps = r);
    }
    return n;
  }
  trigger(t) {
    this.version++, Kn++, this.notify(t);
  }
  notify(t) {
    ms();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      ws();
    }
  }
}
function Ml(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let r = t.deps; r; r = r.nextDep)
        Ml(r);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const Go = /* @__PURE__ */ new WeakMap(), Ht = /* @__PURE__ */ Symbol(
  ""
), Yo = /* @__PURE__ */ Symbol(
  ""
), Vn = /* @__PURE__ */ Symbol(
  ""
);
function Me(e, t, n) {
  if (Ue && ae) {
    let r = Go.get(e);
    r || Go.set(e, r = /* @__PURE__ */ new Map());
    let o = r.get(n);
    o || (r.set(n, o = new bs()), o.map = r, o.key = n), o.track();
  }
}
function ct(e, t, n, r, o, s) {
  const i = Go.get(e);
  if (!i) {
    Kn++;
    return;
  }
  const a = (c) => {
    c && c.trigger();
  };
  if (ms(), t === "clear")
    i.forEach(a);
  else {
    const c = z(e), f = c && vs(n);
    if (c && n === "length") {
      const d = Number(r);
      i.forEach((h, w) => {
        (w === "length" || w === Vn || !nt(w) && w >= d) && a(h);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && a(i.get(n)), f && a(i.get(Vn)), t) {
        case "add":
          c ? f && a(i.get("length")) : (a(i.get(Ht)), It(e) && a(i.get(Yo)));
          break;
        case "delete":
          c || (a(i.get(Ht)), It(e) && a(i.get(Yo)));
          break;
        case "set":
          It(e) && a(i.get(Ht));
          break;
      }
  }
  ws();
}
function Qt(e) {
  const t = /* @__PURE__ */ oe(e);
  return t === e ? t : (Me(t, "iterate", Vn), /* @__PURE__ */ Be(e) ? t : t.map(We));
}
function qr(e) {
  return Me(e = /* @__PURE__ */ oe(e), "iterate", Vn), e;
}
function Je(e, t) {
  return /* @__PURE__ */ pt(e) ? an(/* @__PURE__ */ jt(e) ? We(t) : t) : We(t);
}
const xu = {
  __proto__: null,
  [Symbol.iterator]() {
    return Po(this, Symbol.iterator, (e) => Je(this, e));
  },
  concat(...e) {
    return Qt(this).concat(
      ...e.map((t) => z(t) ? Qt(t) : t)
    );
  },
  entries() {
    return Po(this, "entries", (e) => (e[1] = Je(this, e[1]), e));
  },
  every(e, t) {
    return it(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return it(
      this,
      "filter",
      e,
      t,
      (n) => n.map((r) => Je(this, r)),
      arguments
    );
  },
  find(e, t) {
    return it(
      this,
      "find",
      e,
      t,
      (n) => Je(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return it(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return it(
      this,
      "findLast",
      e,
      t,
      (n) => Je(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return it(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return it(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return ko(this, "includes", e);
  },
  indexOf(...e) {
    return ko(this, "indexOf", e);
  },
  join(e) {
    return Qt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return ko(this, "lastIndexOf", e);
  },
  map(e, t) {
    return it(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Mn(this, "pop");
  },
  push(...e) {
    return Mn(this, "push", e);
  },
  reduce(e, ...t) {
    return fi(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return fi(this, "reduceRight", e, t);
  },
  shift() {
    return Mn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return it(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Mn(this, "splice", e);
  },
  toReversed() {
    return Qt(this).toReversed();
  },
  toSorted(e) {
    return Qt(this).toSorted(e);
  },
  toSpliced(...e) {
    return Qt(this).toSpliced(...e);
  },
  unshift(...e) {
    return Mn(this, "unshift", e);
  },
  values() {
    return Po(this, "values", (e) => Je(this, e));
  }
};
function Po(e, t, n) {
  const r = qr(e), o = r[t]();
  return r !== e && !/* @__PURE__ */ Be(e) && (o._next = o.next, o.next = () => {
    const s = o._next();
    return s.done || (s.value = n(s.value)), s;
  }), o;
}
const Su = Array.prototype;
function it(e, t, n, r, o, s) {
  const i = qr(e), a = i !== e && !/* @__PURE__ */ Be(e), c = i[t];
  if (c !== Su[t]) {
    const h = c.apply(e, s);
    return a ? We(h) : h;
  }
  let f = n;
  i !== e && (a ? f = function(h, w) {
    return n.call(this, Je(e, h), w, e);
  } : n.length > 2 && (f = function(h, w) {
    return n.call(this, h, w, e);
  }));
  const d = c.call(i, f, r);
  return a && o ? o(d) : d;
}
function fi(e, t, n, r) {
  const o = qr(e), s = o !== e && !/* @__PURE__ */ Be(e);
  let i = n, a = !1;
  o !== e && (s ? (a = r.length === 0, i = function(f, d, h) {
    return a && (a = !1, f = Je(e, f)), n.call(this, f, Je(e, d), h, e);
  }) : n.length > 3 && (i = function(f, d, h) {
    return n.call(this, f, d, h, e);
  }));
  const c = o[t](i, ...r);
  return a ? Je(e, c) : c;
}
function ko(e, t, n) {
  const r = /* @__PURE__ */ oe(e);
  Me(r, "iterate", Vn);
  const o = r[t](...n);
  return (o === -1 || o === !1) && /* @__PURE__ */ Ss(n[0]) ? (n[0] = /* @__PURE__ */ oe(n[0]), r[t](...n)) : o;
}
function Mn(e, t, n = []) {
  ft(), ms();
  const r = (/* @__PURE__ */ oe(e))[t].apply(e, n);
  return ws(), dt(), r;
}
const Ru = /* @__PURE__ */ gs("__proto__,__v_isRef,__isVue"), Il = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(nt)
);
function Cu(e) {
  nt(e) || (e = String(e));
  const t = /* @__PURE__ */ oe(this);
  return Me(t, "has", e), t.hasOwnProperty(e);
}
class El {
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
      return r === (o ? s ? Fu : Pl : s ? Dl : Ol).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const i = z(t);
    if (!o) {
      let c;
      if (i && (c = xu[n]))
        return c;
      if (n === "hasOwnProperty")
        return Cu;
    }
    const a = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ Ie(t) ? t : r
    );
    if ((nt(n) ? Il.has(n) : Ru(n)) || (o || Me(t, "get", n), s))
      return a;
    if (/* @__PURE__ */ Ie(a)) {
      const c = i && vs(n) ? a : a.value;
      return o && ie(c) ? /* @__PURE__ */ Jo(c) : c;
    }
    return ie(a) ? o ? /* @__PURE__ */ Jo(a) : /* @__PURE__ */ Gr(a) : a;
  }
}
class Al extends El {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, o) {
    let s = t[n];
    const i = z(t) && vs(n);
    if (!this._isShallow) {
      const f = /* @__PURE__ */ pt(s);
      if (!/* @__PURE__ */ Be(r) && !/* @__PURE__ */ pt(r) && (s = /* @__PURE__ */ oe(s), r = /* @__PURE__ */ oe(r)), !i && /* @__PURE__ */ Ie(s) && !/* @__PURE__ */ Ie(r))
        return f || (s.value = r), !0;
    }
    const a = i ? Number(n) < t.length : se(t, n), c = Reflect.set(
      t,
      n,
      r,
      /* @__PURE__ */ Ie(t) ? t : o
    );
    return t === /* @__PURE__ */ oe(o) && c && (a ? Qe(r, s) && ct(t, "set", n, r) : ct(t, "add", n, r)), c;
  }
  deleteProperty(t, n) {
    const r = se(t, n);
    t[n];
    const o = Reflect.deleteProperty(t, n);
    return o && r && ct(t, "delete", n, void 0), o;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!nt(n) || !Il.has(n)) && Me(t, "has", n), r;
  }
  ownKeys(t) {
    return Me(
      t,
      "iterate",
      z(t) ? "length" : Ht
    ), Reflect.ownKeys(t);
  }
}
class Mu extends El {
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
const Iu = /* @__PURE__ */ new Al(), Eu = /* @__PURE__ */ new Mu(), Au = /* @__PURE__ */ new Al(!0);
const Xo = (e) => e, wr = (e) => Reflect.getPrototypeOf(e);
function Ou(e, t, n) {
  return function(...r) {
    const o = this.__v_raw, s = /* @__PURE__ */ oe(o), i = It(s), a = e === "entries" || e === Symbol.iterator && i, c = e === "keys" && i, f = o[e](...r), d = n ? Xo : t ? an : We;
    return !t && Me(
      s,
      "iterate",
      c ? Yo : Ht
    ), Ee(
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
function yr(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Du(e, t) {
  const n = {
    get(o) {
      const s = this.__v_raw, i = /* @__PURE__ */ oe(s), a = /* @__PURE__ */ oe(o);
      e || (Qe(o, a) && Me(i, "get", o), Me(i, "get", a));
      const { has: c } = wr(i), f = t ? Xo : e ? an : We;
      if (c.call(i, o))
        return f(s.get(o));
      if (c.call(i, a))
        return f(s.get(a));
      s !== i && s.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && Me(/* @__PURE__ */ oe(o), "iterate", Ht), o.size;
    },
    has(o) {
      const s = this.__v_raw, i = /* @__PURE__ */ oe(s), a = /* @__PURE__ */ oe(o);
      return e || (Qe(o, a) && Me(i, "has", o), Me(i, "has", a)), o === a ? s.has(o) : s.has(o) || s.has(a);
    },
    forEach(o, s) {
      const i = this, a = i.__v_raw, c = /* @__PURE__ */ oe(a), f = t ? Xo : e ? an : We;
      return !e && Me(c, "iterate", Ht), a.forEach((d, h) => o.call(s, f(d), f(h), i));
    }
  };
  return Ee(
    n,
    e ? {
      add: yr("add"),
      set: yr("set"),
      delete: yr("delete"),
      clear: yr("clear")
    } : {
      add(o) {
        const s = /* @__PURE__ */ oe(this), i = wr(s), a = /* @__PURE__ */ oe(o), c = !t && !/* @__PURE__ */ Be(o) && !/* @__PURE__ */ pt(o) ? a : o;
        return i.has.call(s, c) || Qe(o, c) && i.has.call(s, o) || Qe(a, c) && i.has.call(s, a) || (s.add(c), ct(s, "add", c, c)), this;
      },
      set(o, s) {
        !t && !/* @__PURE__ */ Be(s) && !/* @__PURE__ */ pt(s) && (s = /* @__PURE__ */ oe(s));
        const i = /* @__PURE__ */ oe(this), { has: a, get: c } = wr(i);
        let f = a.call(i, o);
        f || (o = /* @__PURE__ */ oe(o), f = a.call(i, o));
        const d = c.call(i, o);
        return i.set(o, s), f ? Qe(s, d) && ct(i, "set", o, s) : ct(i, "add", o, s), this;
      },
      delete(o) {
        const s = /* @__PURE__ */ oe(this), { has: i, get: a } = wr(s);
        let c = i.call(s, o);
        c || (o = /* @__PURE__ */ oe(o), c = i.call(s, o)), a && a.call(s, o);
        const f = s.delete(o);
        return c && ct(s, "delete", o, void 0), f;
      },
      clear() {
        const o = /* @__PURE__ */ oe(this), s = o.size !== 0, i = o.clear();
        return s && ct(
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
    n[o] = Ou(o, e, t);
  }), n;
}
function _s(e, t) {
  const n = Du(e, t);
  return (r, o, s) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(
    se(n, o) && o in r ? n : r,
    o,
    s
  );
}
const Pu = {
  get: /* @__PURE__ */ _s(!1, !1)
}, ku = {
  get: /* @__PURE__ */ _s(!1, !0)
}, Tu = {
  get: /* @__PURE__ */ _s(!0, !1)
};
const Ol = /* @__PURE__ */ new WeakMap(), Dl = /* @__PURE__ */ new WeakMap(), Pl = /* @__PURE__ */ new WeakMap(), Fu = /* @__PURE__ */ new WeakMap();
function Hu(e) {
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
function Gr(e) {
  return /* @__PURE__ */ pt(e) ? e : xs(
    e,
    !1,
    Iu,
    Pu,
    Ol
  );
}
// @__NO_SIDE_EFFECTS__
function ju(e) {
  return xs(
    e,
    !1,
    Au,
    ku,
    Dl
  );
}
// @__NO_SIDE_EFFECTS__
function Jo(e) {
  return xs(
    e,
    !0,
    Eu,
    Tu,
    Pl
  );
}
function xs(e, t, n, r, o) {
  if (!ie(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const s = o.get(e);
  if (s)
    return s;
  const i = Hu(lu(e));
  if (i === 0)
    return e;
  const a = new Proxy(
    e,
    i === 2 ? r : n
  );
  return o.set(e, a), a;
}
// @__NO_SIDE_EFFECTS__
function jt(e) {
  return /* @__PURE__ */ pt(e) ? /* @__PURE__ */ jt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function pt(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Be(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Ss(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function oe(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ oe(t) : e;
}
function Lu(e) {
  return !se(e, "__v_skip") && Object.isExtensible(e) && gl(e, "__v_skip", !0), e;
}
const We = (e) => ie(e) ? /* @__PURE__ */ Gr(e) : e, an = (e) => ie(e) ? /* @__PURE__ */ Jo(e) : e;
// @__NO_SIDE_EFFECTS__
function Ie(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function fe(e) {
  return kl(e, !1);
}
// @__NO_SIDE_EFFECTS__
function Ku(e) {
  return kl(e, !0);
}
function kl(e, t) {
  return /* @__PURE__ */ Ie(e) ? e : new Vu(e, t);
}
class Vu {
  constructor(t, n) {
    this.dep = new bs(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ oe(t), this._value = n ? t : We(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, r = this.__v_isShallow || /* @__PURE__ */ Be(t) || /* @__PURE__ */ pt(t);
    t = r ? t : /* @__PURE__ */ oe(t), Qe(t, n) && (this._rawValue = t, this._value = r ? t : We(t), this.dep.trigger());
  }
}
function Lt(e) {
  return /* @__PURE__ */ Ie(e) ? e.value : e;
}
const Bu = {
  get: (e, t, n) => t === "__v_raw" ? e : Lt(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return /* @__PURE__ */ Ie(o) && !/* @__PURE__ */ Ie(n) ? (o.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function Tl(e) {
  return /* @__PURE__ */ jt(e) ? e : new Proxy(e, Bu);
}
class Nu {
  constructor(t, n, r) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new bs(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Kn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    ae !== this)
      return _l(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Rl(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function $u(e, t, n = !1) {
  let r, o;
  return q(e) ? r = e : (r = e.get, o = e.set), new Nu(r, o, n);
}
const br = {}, Or = /* @__PURE__ */ new WeakMap();
let Tt;
function Uu(e, t = !1, n = Tt) {
  if (n) {
    let r = Or.get(n);
    r || Or.set(n, r = []), r.push(e);
  }
}
function Wu(e, t, n = ce) {
  const { immediate: r, deep: o, once: s, scheduler: i, augmentJob: a, call: c } = n, f = (M) => o ? M : /* @__PURE__ */ Be(M) || o === !1 || o === 0 ? Mt(M, 1) : Mt(M);
  let d, h, w, y, E = !1, I = !1;
  if (/* @__PURE__ */ Ie(e) ? (h = () => e.value, E = /* @__PURE__ */ Be(e)) : /* @__PURE__ */ jt(e) ? (h = () => f(e), E = !0) : z(e) ? (I = !0, E = e.some((M) => /* @__PURE__ */ jt(M) || /* @__PURE__ */ Be(M)), h = () => e.map((M) => {
    if (/* @__PURE__ */ Ie(M))
      return M.value;
    if (/* @__PURE__ */ jt(M))
      return f(M);
    if (q(M))
      return c ? c(M, 2) : M();
  })) : q(e) ? t ? h = c ? () => c(e, 2) : e : h = () => {
    if (w) {
      ft();
      try {
        w();
      } finally {
        dt();
      }
    }
    const M = Tt;
    Tt = d;
    try {
      return c ? c(e, 3, [y]) : e(y);
    } finally {
      Tt = M;
    }
  } : h = tt, t && o) {
    const M = h, B = o === !0 ? 1 / 0 : o;
    h = () => Mt(M(), B);
  }
  const H = wl(), A = () => {
    d.stop(), H && H.active && hs(H.effects, d);
  };
  if (s && t) {
    const M = t;
    t = (...B) => {
      const U = M(...B);
      return A(), U;
    };
  }
  let x = I ? new Array(e.length).fill(br) : br;
  const j = (M) => {
    if (!(!(d.flags & 1) || !d.dirty && !M))
      if (t) {
        const B = d.run();
        if (M || o || E || (I ? B.some((U, de) => Qe(U, x[de])) : Qe(B, x))) {
          w && w();
          const U = Tt;
          Tt = d;
          try {
            const de = [
              B,
              // pass undefined as the old value when it's changed for the first time
              x === br ? void 0 : I && x[0] === br ? [] : x,
              y
            ];
            x = B, c ? c(t, 3, de) : (
              // @ts-expect-error
              t(...de)
            );
          } finally {
            Tt = U;
          }
        }
      } else
        d.run();
  };
  return a && a(j), d = new yl(h), d.scheduler = i ? () => i(j, !1) : j, y = (M) => Uu(M, !1, d), w = d.onStop = () => {
    const M = Or.get(d);
    if (M) {
      if (c)
        c(M, 4);
      else
        for (const B of M) B();
      Or.delete(d);
    }
  }, t ? r ? j(!0) : x = d.run() : i ? i(j.bind(null, !0), !0) : d.run(), A.pause = d.pause.bind(d), A.resume = d.resume.bind(d), A.stop = A, A;
}
function Mt(e, t = 1 / 0, n) {
  if (t <= 0 || !ie(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ Ie(e))
    Mt(e.value, t, n);
  else if (z(e))
    for (let r = 0; r < e.length; r++)
      Mt(e[r], t, n);
  else if (Ar(e) || It(e))
    e.forEach((r) => {
      Mt(r, t, n);
    });
  else if (dl(e)) {
    for (const r in e)
      Mt(e[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, r) && Mt(e[r], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Gn(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (o) {
    Yr(o, t, n);
  }
}
function ze(e, t, n, r) {
  if (q(e)) {
    const o = Gn(e, t, n, r);
    return o && ul(o) && o.catch((s) => {
      Yr(s, t, n);
    }), o;
  }
  if (z(e)) {
    const o = [];
    for (let s = 0; s < e.length; s++)
      o.push(ze(e[s], t, n, r));
    return o;
  }
}
function Yr(e, t, n, r = !0) {
  const o = t ? t.vnode : null, { errorHandler: s, throwUnhandledErrorInProduction: i } = t && t.appContext.config || ce;
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
      ft(), Gn(s, null, 10, [
        e,
        c,
        f
      ]), dt();
      return;
    }
  }
  zu(e, n, o, r, i);
}
function zu(e, t, n, r = !0, o = !1) {
  if (o)
    throw e;
  console.error(e);
}
const Pe = [];
let Xe = -1;
const on = [];
let Rt = null, tn = 0;
const Fl = /* @__PURE__ */ Promise.resolve();
let Dr = null;
function Le(e) {
  const t = Dr || Fl;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function qu(e) {
  let t = Xe + 1, n = Pe.length;
  for (; t < n; ) {
    const r = t + n >>> 1, o = Pe[r], s = Bn(o);
    s < e || s === e && o.flags & 2 ? t = r + 1 : n = r;
  }
  return t;
}
function Rs(e) {
  if (!(e.flags & 1)) {
    const t = Bn(e), n = Pe[Pe.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Bn(n) ? Pe.push(e) : Pe.splice(qu(t), 0, e), e.flags |= 1, Hl();
  }
}
function Hl() {
  Dr || (Dr = Fl.then(Ll));
}
function Gu(e) {
  if (!z(e))
    Rt && e.id === -1 ? Rt.splice(tn + 1, 0, e) : e.flags & 1 || (on.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      on.push(e[t]);
  Hl();
}
function di(e, t, n = Xe + 1) {
  for (; n < Pe.length; n++) {
    const r = Pe[n];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid)
        continue;
      Pe.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function jl(e) {
  if (on.length) {
    const t = [...new Set(on)].sort(
      (n, r) => Bn(n) - Bn(r)
    );
    if (on.length = 0, Rt) {
      for (let n = 0; n < t.length; n++)
        Rt.push(t[n]);
      return;
    }
    for (Rt = t, tn = 0; tn < Rt.length; tn++) {
      const n = Rt[tn];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    Rt = null, tn = 0;
  }
}
const Bn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Ll(e) {
  try {
    for (Xe = 0; Xe < Pe.length; Xe++) {
      const t = Pe[Xe];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Gn(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Xe < Pe.length; Xe++) {
      const t = Pe[Xe];
      t && (t.flags &= -2);
    }
    Xe = -1, Pe.length = 0, jl(), Dr = null, (Pe.length || on.length) && Ll();
  }
}
let et = null, Kl = null;
function Pr(e) {
  const t = et;
  return et = e, Kl = e && e.type.__scopeId || null, t;
}
function Yu(e, t = et, n) {
  if (!t || e._n)
    return e;
  const r = (...o) => {
    r._d && Si(-1);
    const s = Pr(t), i = Kt.length;
    let a;
    try {
      a = e(...o);
    } finally {
      for (let c = Kt.length; c > i; c--) ca();
      Pr(s), r._d && Si(1);
    }
    return a;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function Pt(e, t, n, r) {
  const o = e.dirs, s = t && t.dirs;
  for (let i = 0; i < o.length; i++) {
    const a = o[i];
    s && (a.oldValue = s[i].value);
    let c = a.dir[r];
    c && (ft(), ze(c, n, 8, [
      e.el,
      a,
      e,
      t
    ]), dt());
  }
}
function Xu(e, t) {
  if (ke) {
    let n = ke.provides;
    const r = ke.parent && ke.parent.provides;
    r === n && (n = ke.provides = Object.create(r)), n[e] = t;
  }
}
function Cr(e, t, n = !1) {
  const r = qf();
  if (r || sn) {
    let o = sn ? sn._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && q(t) ? t.call(r && r.proxy) : t;
  }
}
const Ju = /* @__PURE__ */ Symbol.for("v-scx"), Zu = () => Cr(Ju);
function be(e, t, n) {
  return Vl(e, t, n);
}
function Vl(e, t, n = ce) {
  const { immediate: r, deep: o, flush: s, once: i } = n, a = Ee({}, n), c = t && r || !t && s !== "post";
  let f;
  if (Un) {
    if (s === "sync") {
      const y = Zu();
      f = y.__watcherHandles || (y.__watcherHandles = []);
    } else if (!c) {
      const y = () => {
      };
      return y.stop = tt, y.resume = tt, y.pause = tt, y;
    }
  }
  const d = ke;
  a.call = (y, E, I) => ze(y, d, E, I);
  let h = !1;
  s === "post" ? a.scheduler = (y) => {
    je(y, d && d.suspense);
  } : s !== "sync" && (h = !0, a.scheduler = (y, E) => {
    E ? y() : Rs(y);
  }), a.augmentJob = (y) => {
    t && (y.flags |= 4), h && (y.flags |= 2, d && (y.id = d.uid, y.i = d));
  };
  const w = Wu(e, t, a);
  return Un && (f ? f.push(w) : c && w()), w;
}
function Qu(e, t, n) {
  const r = this.proxy, o = me(e) ? e.includes(".") ? Bl(r, e) : () => r[e] : e.bind(r, r);
  let s;
  q(t) ? s = t : (s = t.handler, n = t);
  const i = Yn(this), a = Vl(o, s.bind(r), n);
  return i(), a;
}
function Bl(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++)
      r = r[n[o]];
    return r;
  };
}
const ef = /* @__PURE__ */ Symbol("_vte"), Xr = (e) => e.__isTeleport, To = /* @__PURE__ */ Symbol("_leaveCb");
function tf(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== gt) {
        t = n;
        break;
      }
  }
  return t;
}
function Nl(e) {
  if (!Ms(e))
    return Xr(e.type) && e.children ? tf(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16)
      return n[0];
    if (t & 32 && q(n.default))
      return n.default();
  }
}
function Cs(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    Cs(
      Xr(n.type) && Nl(n) || n,
      t
    );
  } else e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function $l(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function pi(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const kr = /* @__PURE__ */ new WeakMap();
function Fn(e, t, n, r, o = !1) {
  if (z(e)) {
    e.forEach(
      (I, H) => Fn(
        I,
        t && (z(t) ? t[H] : t),
        n,
        r,
        o
      )
    );
    return;
  }
  if (Hn(r) && !o) {
    r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && Fn(e, t, n, r.component.subTree);
    return;
  }
  const s = r.shapeFlag & 4 ? As(r.component) : r.el, i = o ? null : s, { i: a, r: c } = e, f = t && t.r, d = a.refs === ce ? a.refs = {} : a.refs, h = a.setupState, w = /* @__PURE__ */ oe(h), y = h === ce ? cl : (I) => pi(d, I) ? !1 : se(w, I), E = (I, H) => !(H && pi(d, H));
  if (f != null && f !== c) {
    if (gi(t), me(f))
      d[f] = null, y(f) && (h[f] = null);
    else if (/* @__PURE__ */ Ie(f)) {
      const I = t;
      E(f, I.k) && (f.value = null), I.k && (d[I.k] = null);
    }
  }
  if (q(c))
    Gn(c, a, 12, [i, d]);
  else {
    const I = me(c), H = /* @__PURE__ */ Ie(c);
    if (I || H) {
      const A = () => {
        if (e.f) {
          const x = I ? y(c) ? h[c] : d[c] : E() || !e.k ? c.value : d[e.k];
          if (o)
            z(x) && hs(x, s);
          else if (z(x))
            x.includes(s) || x.push(s);
          else if (I)
            d[c] = [s], y(c) && (h[c] = d[c]);
          else {
            const j = [s];
            E(c, e.k) && (c.value = j), e.k && (d[e.k] = j);
          }
        } else I ? (d[c] = i, y(c) && (h[c] = i)) : H && (E(c, e.k) && (c.value = i), e.k && (d[e.k] = i));
      };
      if (i) {
        const x = () => {
          A(), kr.delete(e);
        };
        x.id = -1, kr.set(e, x), je(x, n);
      } else
        gi(e), A();
    }
  }
}
function gi(e) {
  const t = kr.get(e);
  t && (t.flags |= 8, kr.delete(e));
}
Wr().requestIdleCallback;
Wr().cancelIdleCallback;
const Hn = (e) => !!e.type.__asyncLoader, Ms = (e) => e.type.__isKeepAlive;
function nf(e, t) {
  Ul(e, "a", t);
}
function rf(e, t) {
  Ul(e, "da", t);
}
function Ul(e, t, n = ke) {
  const r = e.__wdc || (e.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (Jr(t, r, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      Ms(o.parent.vnode) && of(r, t, n, o), o = o.parent;
  }
}
function of(e, t, n, r) {
  const o = Jr(
    t,
    e,
    r,
    !0
    /* prepend */
  );
  Wl(() => {
    hs(r[t], o);
  }, n);
}
function Jr(e, t, n = ke, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), s = t.__weh || (t.__weh = (...i) => {
      ft();
      const a = Yn(n), c = ze(t, n, e, i);
      return a(), dt(), c;
    });
    return r ? o.unshift(s) : o.push(s), s;
  }
}
const vt = (e) => (t, n = ke) => {
  (!Un || e === "sp") && Jr(e, (...r) => t(...r), n);
}, sf = vt("bm"), Zo = vt("m"), lf = vt(
  "bu"
), af = vt("u"), Qo = vt(
  "bum"
), Wl = vt("um"), cf = vt(
  "sp"
), uf = vt("rtg"), ff = vt("rtc");
function df(e, t = ke) {
  Jr("ec", e, t);
}
const pf = /* @__PURE__ */ Symbol.for("v-ndc");
function In(e, t, n, r) {
  let o;
  const s = n, i = z(e);
  if (i || me(e)) {
    const a = i && /* @__PURE__ */ jt(e);
    let c = !1, f = !1;
    a && (c = !/* @__PURE__ */ Be(e), f = /* @__PURE__ */ pt(e), e = qr(e)), o = new Array(e.length);
    for (let d = 0, h = e.length; d < h; d++)
      o[d] = t(
        c ? f ? an(We(e[d])) : We(e[d]) : e[d],
        d,
        void 0,
        s
      );
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let a = 0; a < e; a++)
      o[a] = t(a + 1, a, void 0, s);
  } else if (ie(e))
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
const es = (e) => e ? pa(e) ? As(e) : es(e.parent) : null, jn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Ee(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => es(e.parent),
    $root: (e) => es(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => ql(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Rs(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Le.bind(e.proxy)),
    $watch: (e) => Qu.bind(e)
  })
), Fo = (e, t) => e !== ce && !e.__isScriptSetup && se(e, t), gf = {
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
        if (Fo(r, t))
          return i[t] = 1, r[t];
        if (o !== ce && se(o, t))
          return i[t] = 2, o[t];
        if (se(s, t))
          return i[t] = 3, s[t];
        if (n !== ce && se(n, t))
          return i[t] = 4, n[t];
        ts && (i[t] = 0);
      }
    }
    const f = jn[t];
    let d, h;
    if (f)
      return t === "$attrs" && Me(e.attrs, "get", ""), f(e);
    if (
      // css module (injected by vue-loader)
      (d = a.__cssModules) && (d = d[t])
    )
      return d;
    if (n !== ce && se(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      h = c.config.globalProperties, se(h, t)
    )
      return h[t];
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: o, ctx: s } = e;
    return Fo(o, t) ? (o[t] = n, !0) : r !== ce && se(r, t) ? (r[t] = n, !0) : se(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (s[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: o, props: s, type: i }
  }, a) {
    let c;
    return !!(n[a] || e !== ce && a[0] !== "$" && se(e, a) || Fo(t, a) || se(s, a) || se(r, a) || se(jn, a) || se(o.config.globalProperties, a) || (c = i.__cssModules) && c[a]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : se(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function hi(e) {
  return z(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let ts = !0;
function hf(e) {
  const t = ql(e), n = e.proxy, r = e.ctx;
  ts = !1, t.beforeCreate && vi(t.beforeCreate, e, "bc");
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
    updated: E,
    activated: I,
    deactivated: H,
    beforeDestroy: A,
    beforeUnmount: x,
    destroyed: j,
    unmounted: M,
    render: B,
    renderTracked: U,
    renderTriggered: de,
    errorCaptured: $,
    serverPrefetch: F,
    // public API
    expose: Z,
    inheritAttrs: ue,
    // assets
    components: Q,
    directives: we,
    filters: Te
  } = t;
  if (f && vf(f, r, null), i)
    for (const X in i) {
      const re = i[X];
      q(re) && (r[X] = re.bind(n));
    }
  if (o) {
    const X = o.call(n, n);
    ie(X) && (e.data = /* @__PURE__ */ Gr(X));
  }
  if (ts = !0, s)
    for (const X in s) {
      const re = s[X], rt = q(re) ? re.bind(n, n) : q(re.get) ? re.get.bind(n, n) : tt, qt = !q(re) && q(re.set) ? re.set.bind(n) : tt, ot = W({
        get: rt,
        set: qt
      });
      Object.defineProperty(r, X, {
        enumerable: !0,
        configurable: !0,
        get: () => ot.value,
        set: (Ve) => ot.value = Ve
      });
    }
  if (a)
    for (const X in a)
      zl(a[X], r, n, X);
  if (c) {
    const X = q(c) ? c.call(n) : c;
    Reflect.ownKeys(X).forEach((re) => {
      Xu(re, X[re]);
    });
  }
  d && vi(d, e, "c");
  function N(X, re) {
    z(re) ? re.forEach((rt) => X(rt.bind(n))) : re && X(re.bind(n));
  }
  if (N(sf, h), N(Zo, w), N(lf, y), N(af, E), N(nf, I), N(rf, H), N(df, $), N(ff, U), N(uf, de), N(Qo, x), N(Wl, M), N(cf, F), z(Z))
    if (Z.length) {
      const X = e.exposed || (e.exposed = {});
      Z.forEach((re) => {
        Object.defineProperty(X, re, {
          get: () => n[re],
          set: (rt) => n[re] = rt,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  B && e.render === tt && (e.render = B), ue != null && (e.inheritAttrs = ue), Q && (e.components = Q), we && (e.directives = we), F && $l(e);
}
function vf(e, t, n = tt) {
  z(e) && (e = ns(e));
  for (const r in e) {
    const o = e[r];
    let s;
    ie(o) ? "default" in o ? s = Cr(
      o.from || r,
      o.default,
      !0
    ) : s = Cr(o.from || r) : s = Cr(o), /* @__PURE__ */ Ie(s) ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (i) => s.value = i
    }) : t[r] = s;
  }
}
function vi(e, t, n) {
  ze(
    z(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function zl(e, t, n, r) {
  let o = r.includes(".") ? Bl(n, r) : () => n[r];
  if (me(e)) {
    const s = t[e];
    q(s) && be(o, s);
  } else if (q(e))
    be(o, e.bind(n));
  else if (ie(e))
    if (z(e))
      e.forEach((s) => zl(s, t, n, r));
    else {
      const s = q(e.handler) ? e.handler.bind(n) : t[e.handler];
      q(s) && be(o, s, e);
    }
}
function ql(e) {
  const t = e.type, { mixins: n, extends: r } = t, {
    mixins: o,
    optionsCache: s,
    config: { optionMergeStrategies: i }
  } = e.appContext, a = s.get(t);
  let c;
  return a ? c = a : !o.length && !n && !r ? c = t : (c = {}, o.length && o.forEach(
    (f) => Tr(c, f, i, !0)
  ), Tr(c, t, i)), ie(t) && s.set(t, c), c;
}
function Tr(e, t, n, r = !1) {
  const { mixins: o, extends: s } = t;
  s && Tr(e, s, n, !0), o && o.forEach(
    (i) => Tr(e, i, n, !0)
  );
  for (const i in t)
    if (!(r && i === "expose")) {
      const a = mf[i] || n && n[i];
      e[i] = a ? a(e[i], t[i]) : t[i];
    }
  return e;
}
const mf = {
  data: mi,
  props: wi,
  emits: wi,
  // objects
  methods: On,
  computed: On,
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
  components: On,
  directives: On,
  // watch
  watch: yf,
  // provide / inject
  provide: mi,
  inject: wf
};
function mi(e, t) {
  return t ? e ? function() {
    return Ee(
      q(e) ? e.call(this, this) : e,
      q(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function wf(e, t) {
  return On(ns(e), ns(t));
}
function ns(e) {
  if (z(e)) {
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
function On(e, t) {
  return e ? Ee(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function wi(e, t) {
  return e ? z(e) && z(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Ee(
    /* @__PURE__ */ Object.create(null),
    hi(e),
    hi(t ?? {})
  ) : t;
}
function yf(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Ee(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = De(e[r], t[r]);
  return n;
}
function Gl() {
  return {
    app: null,
    config: {
      isNativeTag: cl,
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
let bf = 0;
function _f(e, t) {
  return function(r, o = null) {
    q(r) || (r = Ee({}, r)), o != null && !ie(o) && (o = null);
    const s = Gl(), i = /* @__PURE__ */ new WeakSet(), a = [];
    let c = !1;
    const f = s.app = {
      _uid: bf++,
      _component: r,
      _props: o,
      _container: null,
      _context: s,
      _instance: null,
      version: Qf,
      get config() {
        return s.config;
      },
      set config(d) {
      },
      use(d, ...h) {
        return i.has(d) || (d && q(d.install) ? (i.add(d), d.install(f, ...h)) : q(d) && (i.add(d), d(f, ...h))), f;
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
          const y = f._ceVNode || ut(r, o);
          return y.appContext = s, w === !0 ? w = "svg" : w === !1 && (w = void 0), e(y, d, w), c = !0, f._container = d, d.__vue_app__ = f, As(y.component);
        }
      },
      onUnmount(d) {
        a.push(d);
      },
      unmount() {
        c && (ze(
          a,
          f._instance,
          16
        ), e(null, f._container), delete f._container.__vue_app__);
      },
      provide(d, h) {
        return s.provides[d] = h, f;
      },
      runWithContext(d) {
        const h = sn;
        sn = f;
        try {
          return d();
        } finally {
          sn = h;
        }
      }
    };
    return f;
  };
}
let sn = null;
const xf = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${$e(t)}Modifiers`] || e[`${Ut(t)}Modifiers`];
function Sf(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || ce;
  let o = n;
  const s = t.startsWith("update:"), i = s && xf(r, t.slice(7));
  i && (i.trim && (o = n.map((d) => me(d) ? d.trim() : d)), i.number && (o = o.map(uu)));
  let a, c = r[a = Eo(t)] || // also try camelCase event handler (#2249)
  r[a = Eo($e(t))];
  !c && s && (c = r[a = Eo(Ut(t))]), c && ze(
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
    e.emitted[a] = !0, ze(
      f,
      e,
      6,
      o
    );
  }
}
const Rf = /* @__PURE__ */ new WeakMap();
function Yl(e, t, n = !1) {
  const r = n ? Rf : t.emitsCache, o = r.get(e);
  if (o !== void 0)
    return o;
  const s = e.emits;
  let i = {}, a = !1;
  if (!q(e)) {
    const c = (f) => {
      const d = Yl(f, t, !0);
      d && (a = !0, Ee(i, d));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !s && !a ? (ie(e) && r.set(e, null), null) : (z(s) ? s.forEach((c) => i[c] = null) : Ee(i, s), ie(e) && r.set(e, i), i);
}
function Zr(e, t) {
  return !e || !Nr(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), se(e, t[0].toLowerCase() + t.slice(1)) || se(e, Ut(t)) || se(e, t));
}
function yi(e) {
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
    ctx: E,
    inheritAttrs: I
  } = e, H = Pr(e);
  let A, x;
  try {
    if (n.shapeFlag & 4) {
      const M = o || r, B = M;
      A = Ze(
        f.call(
          B,
          M,
          d,
          h,
          y,
          w,
          E
        )
      ), x = a;
    } else {
      const M = t;
      A = Ze(
        M.length > 1 ? M(
          h,
          { attrs: a, slots: i, emit: c }
        ) : M(
          h,
          null
        )
      ), x = t.props ? a : Cf(a);
    }
  } catch (M) {
    Kt.length = 0, Yr(M, e, 1), A = ut(gt);
  }
  let j = A;
  if (x && I !== !1) {
    const M = Object.keys(x), { shapeFlag: B } = j;
    M.length && B & 7 && (s && M.some($r) && (x = Mf(
      x,
      s
    )), j = cn(j, x, !1, !0));
  }
  if (n.dirs && (j = cn(j, null, !1, !0), j.dirs = j.dirs ? j.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const M = Xr(j.type) && Nl(j) || j;
    Cs(M, n.transition);
  }
  return A = j, Pr(H), A;
}
const Cf = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Nr(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Mf = (e, t) => {
  const n = {};
  for (const r in e)
    (!$r(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
  return n;
};
function If(e, t, n) {
  const { props: r, children: o, component: s } = e, { props: i, children: a, patchFlag: c } = t, f = s.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return r ? bi(r, i, f) : !!i;
    if (c & 8) {
      const d = t.dynamicProps;
      for (let h = 0; h < d.length; h++) {
        const w = d[h];
        if (Xl(i, r, w) && !Zr(f, w))
          return !0;
      }
    }
  } else
    return (o || a) && (!a || !a.$stable) ? !0 : r === i ? !1 : r ? i ? bi(r, i, f) : !0 : !!i;
  return !1;
}
function bi(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < r.length; o++) {
    const s = r[o];
    if (Xl(t, e, s) && !Zr(n, s))
      return !0;
  }
  return !1;
}
function Xl(e, t, n) {
  const r = e[n], o = t[n];
  return n === "style" && ie(r) && ie(o) ? !zr(r, o) : r !== o;
}
function Ef({ vnode: e, parent: t, suspense: n }, r) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.suspense.vnode.el = o.el = r, e = o), o === e)
      (e = t.vnode).el = r, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = r);
}
const Jl = {}, Zl = () => Object.create(Jl), Ql = (e) => Object.getPrototypeOf(e) === Jl;
function Af(e, t, n, r = !1) {
  const o = {}, s = Zl();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), ea(e, t, o, s);
  for (const i in e.propsOptions[0])
    i in o || (o[i] = void 0);
  n ? e.props = r ? o : /* @__PURE__ */ ju(o) : e.type.props ? e.props = o : e.props = s, e.attrs = s;
}
function Of(e, t, n, r) {
  const {
    props: o,
    attrs: s,
    vnode: { patchFlag: i }
  } = e, a = /* @__PURE__ */ oe(o), [c] = e.propsOptions;
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
        if (Zr(e.emitsOptions, w))
          continue;
        const y = t[w];
        if (c)
          if (se(s, w))
            y !== s[w] && (s[w] = y, f = !0);
          else {
            const E = $e(w);
            o[E] = rs(
              c,
              a,
              E,
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
    ea(e, t, o, s) && (f = !0);
    let d;
    for (const h in a)
      (!t || // for camelCase
      !se(t, h) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((d = Ut(h)) === h || !se(t, d))) && (c ? n && // for camelCase
      (n[h] !== void 0 || // for kebab-case
      n[d] !== void 0) && (o[h] = rs(
        c,
        a,
        h,
        void 0,
        e,
        !0
      )) : delete o[h]);
    if (s !== a)
      for (const h in s)
        (!t || !se(t, h)) && (delete s[h], f = !0);
  }
  f && ct(e.attrs, "set", "");
}
function ea(e, t, n, r) {
  const [o, s] = e.propsOptions;
  let i = !1, a;
  if (t)
    for (let c in t) {
      if (Pn(c))
        continue;
      const f = t[c];
      let d;
      o && se(o, d = $e(c)) ? !s || !s.includes(d) ? n[d] = f : (a || (a = {}))[d] = f : Zr(e.emitsOptions, c) || (!(c in r) || f !== r[c]) && (r[c] = f, i = !0);
    }
  if (s) {
    const c = /* @__PURE__ */ oe(n), f = a || ce;
    for (let d = 0; d < s.length; d++) {
      const h = s[d];
      n[h] = rs(
        o,
        c,
        h,
        f[h],
        e,
        !se(f, h)
      );
    }
  }
  return i;
}
function rs(e, t, n, r, o, s) {
  const i = e[n];
  if (i != null) {
    const a = se(i, "default");
    if (a && r === void 0) {
      const c = i.default;
      if (i.type !== Function && !i.skipFactory && q(c)) {
        const { propsDefaults: f } = o;
        if (n in f)
          r = f[n];
        else {
          const d = Yn(o);
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
    ] && (r === "" || r === Ut(n)) && (r = !0));
  }
  return r;
}
const Df = /* @__PURE__ */ new WeakMap();
function ta(e, t, n = !1) {
  const r = n ? Df : t.propsCache, o = r.get(e);
  if (o)
    return o;
  const s = e.props, i = {}, a = [];
  let c = !1;
  if (!q(e)) {
    const d = (h) => {
      c = !0;
      const [w, y] = ta(h, t, !0);
      Ee(i, w), y && a.push(...y);
    };
    !n && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  if (!s && !c)
    return ie(e) && r.set(e, rn), rn;
  if (z(s))
    for (let d = 0; d < s.length; d++) {
      const h = $e(s[d]);
      _i(h) && (i[h] = ce);
    }
  else if (s)
    for (const d in s) {
      const h = $e(d);
      if (_i(h)) {
        const w = s[d], y = i[h] = z(w) || q(w) ? { type: w } : Ee({}, w), E = y.type;
        let I = !1, H = !0;
        if (z(E))
          for (let A = 0; A < E.length; ++A) {
            const x = E[A], j = q(x) && x.name;
            if (j === "Boolean") {
              I = !0;
              break;
            } else j === "String" && (H = !1);
          }
        else
          I = q(E) && E.name === "Boolean";
        y[
          0
          /* shouldCast */
        ] = I, y[
          1
          /* shouldCastTrue */
        ] = H, (I || se(y, "default")) && a.push(h);
      }
    }
  const f = [i, a];
  return ie(e) && r.set(e, f), f;
}
function _i(e) {
  return e[0] !== "$" && !Pn(e);
}
const Is = (e) => e === "_" || e === "_ctx" || e === "$stable", Es = (e) => z(e) ? e.map(Ze) : [Ze(e)], Pf = (e, t, n) => {
  if (t._n)
    return t;
  const r = Yu((...o) => Es(t(...o)), n);
  return r._c = !1, r;
}, na = (e, t, n) => {
  const r = e._ctx;
  for (const o in e) {
    if (Is(o)) continue;
    const s = e[o];
    if (q(s))
      t[o] = Pf(o, s, r);
    else if (s != null) {
      const i = Es(s);
      t[o] = () => i;
    }
  }
}, ra = (e, t) => {
  const n = Es(t);
  e.slots.default = () => n;
}, oa = (e, t, n) => {
  for (const r in t)
    (n || !Is(r)) && (e[r] = t[r]);
}, kf = (e, t, n) => {
  const r = e.slots = Zl();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (oa(r, t, n), n && gl(r, "_", o, !0)) : na(t, r);
  } else t && ra(e, t);
}, Tf = (e, t, n) => {
  const { vnode: r, slots: o } = e;
  let s = !0, i = ce;
  if (r.shapeFlag & 32) {
    const a = t._;
    a ? n && a === 1 ? s = !1 : oa(o, t, n) : (s = !t.$stable, na(t, o)), i = t;
  } else t && (ra(e, t), i = { default: 1 });
  if (s)
    for (const a in o)
      !Is(a) && i[a] == null && delete o[a];
}, je = Kf;
function Ff(e) {
  return Hf(e);
}
function Hf(e, t) {
  const n = Wr();
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
    setScopeId: y = tt,
    insertStaticContent: E
  } = e, I = (g, v, b, C = null, R = null, S = null, P = void 0, D = null, O = !!v.dynamicChildren) => {
    if (g === v)
      return;
    g && !En(g, v) && (C = wt(g), Ve(g, R, S, !0), g = null), v.patchFlag === -2 && (O = !1, v.dynamicChildren = null);
    const { type: _, ref: L, shapeFlag: T } = v;
    switch (_) {
      case Qr:
        H(g, v, b, C);
        break;
      case gt:
        A(g, v, b, C);
        break;
      case jo:
        g == null && x(v, b, C, P);
        break;
      case Se:
        Q(
          g,
          v,
          b,
          C,
          R,
          S,
          P,
          D,
          O
        );
        break;
      default:
        T & 1 ? B(
          g,
          v,
          b,
          C,
          R,
          S,
          P,
          D,
          O
        ) : T & 6 ? we(
          g,
          v,
          b,
          C,
          R,
          S,
          P,
          D,
          O
        ) : (T & 64 || T & 128) && _.process(
          g,
          v,
          b,
          C,
          R,
          S,
          P,
          D,
          O,
          Dt
        );
    }
    L != null && R ? Fn(L, g && g.ref, S, v || g, !v) : L == null && g && g.ref != null && Fn(g.ref, null, S, g, !0);
  }, H = (g, v, b, C) => {
    if (g == null)
      r(
        v.el = a(v.children),
        b,
        C
      );
    else {
      const R = v.el = g.el;
      v.children !== g.children && f(R, v.children);
    }
  }, A = (g, v, b, C) => {
    g == null ? r(
      v.el = c(v.children || ""),
      b,
      C
    ) : v.el = g.el;
  }, x = (g, v, b, C) => {
    [g.el, g.anchor] = E(
      g.children,
      v,
      b,
      C,
      g.el,
      g.anchor
    );
  }, j = ({ el: g, anchor: v }, b, C) => {
    let R;
    for (; g && g !== v; )
      R = w(g), r(g, b, C), g = R;
    r(v, b, C);
  }, M = ({ el: g, anchor: v }) => {
    let b;
    for (; g && g !== v; )
      b = w(g), o(g), g = b;
    o(v);
  }, B = (g, v, b, C, R, S, P, D, O) => {
    if (v.type === "svg" ? P = "svg" : v.type === "math" && (P = "mathml"), g == null)
      U(
        v,
        b,
        C,
        R,
        S,
        P,
        D,
        O
      );
    else {
      const _ = g.el && g.el._isVueCE ? g.el : null;
      try {
        _ && _._beginPatch(), F(
          g,
          v,
          R,
          S,
          P,
          D,
          O
        );
      } finally {
        _ && _._endPatch();
      }
    }
  }, U = (g, v, b, C, R, S, P, D) => {
    let O, _;
    const { props: L, shapeFlag: T, transition: K, dirs: V } = g;
    if (O = g.el = i(
      g.type,
      S,
      L && L.is,
      L
    ), T & 8 ? d(O, g.children) : T & 16 && $(
      g.children,
      O,
      null,
      C,
      R,
      Ho(g, S),
      P,
      D
    ), V && Pt(g, null, C, "created"), de(O, g, g.scopeId, P, C), L) {
      for (const ee in L)
        ee !== "value" && !Pn(ee) && s(O, ee, null, L[ee], S, C);
      "value" in L && s(O, "value", null, L.value, S), (_ = L.onVnodeBeforeMount) && Ye(_, C, g);
    }
    V && Pt(g, null, C, "beforeMount");
    const G = jf(R, K);
    G && K.beforeEnter(O), r(O, v, b), ((_ = L && L.onVnodeMounted) || G || V) && je(() => {
      try {
        _ && Ye(_, C, g), G && K.enter(O), V && Pt(g, null, C, "mounted");
      } finally {
      }
    }, R);
  }, de = (g, v, b, C, R) => {
    if (b && y(g, b), C)
      for (let S = 0; S < C.length; S++)
        y(g, C[S]);
    if (R) {
      let S = R.subTree;
      if (v === S || aa(S.type) && (S.ssContent === v || S.ssFallback === v)) {
        const P = R.vnode;
        de(
          g,
          P,
          P.scopeId,
          P.slotScopeIds,
          R.parent
        );
      }
    }
  }, $ = (g, v, b, C, R, S, P, D, O = 0) => {
    for (let _ = O; _ < g.length; _++) {
      const L = g[_] = D ? at(g[_]) : Ze(g[_]);
      I(
        null,
        L,
        v,
        b,
        C,
        R,
        S,
        P,
        D
      );
    }
  }, F = (g, v, b, C, R, S, P) => {
    const D = v.el = g.el;
    let { patchFlag: O, dynamicChildren: _, dirs: L } = v;
    O |= g.patchFlag & 16;
    const T = g.props || ce, K = v.props || ce;
    let V;
    if (b && kt(b, !1), (V = K.onVnodeBeforeUpdate) && Ye(V, b, v, g), L && Pt(v, g, b, "beforeUpdate"), b && kt(b, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    _ && (!g.dynamicChildren || g.dynamicChildren.length !== _.length) && (O = 0, P = !1, _ = null), (T.innerHTML && K.innerHTML == null || T.textContent && K.textContent == null) && d(D, ""), _ ? Z(
      g.dynamicChildren,
      _,
      D,
      b,
      C,
      Ho(v, R),
      S
    ) : P || re(
      g,
      v,
      D,
      null,
      b,
      C,
      Ho(v, R),
      S,
      !1
    ), O > 0) {
      if (O & 16)
        ue(D, T, K, b, R);
      else if (O & 2 && T.class !== K.class && s(D, "class", null, K.class, R), O & 4 && s(D, "style", T.style, K.style, R), O & 8) {
        const G = v.dynamicProps;
        for (let ee = 0; ee < G.length; ee++) {
          const J = G[ee], ve = T[J], pe = K[J];
          (pe !== ve || J === "value") && s(D, J, ve, pe, R, b);
        }
      }
      O & 1 && g.children !== v.children && d(D, v.children);
    } else !P && _ == null && ue(D, T, K, b, R);
    ((V = K.onVnodeUpdated) || L) && je(() => {
      V && Ye(V, b, v, g), L && Pt(v, g, b, "updated");
    }, C);
  }, Z = (g, v, b, C, R, S, P) => {
    for (let D = 0; D < v.length; D++) {
      const O = g[D], _ = v[D], L = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        O.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (O.type === Se || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !En(O, _) || // - In the case of a component, it could contain anything.
        O.shapeFlag & 198) ? h(O.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          b
        )
      );
      I(
        O,
        _,
        L,
        null,
        C,
        R,
        S,
        P,
        !0
      );
    }
  }, ue = (g, v, b, C, R) => {
    if (v !== b) {
      if (v !== ce)
        for (const S in v)
          !Pn(S) && !(S in b) && s(
            g,
            S,
            v[S],
            null,
            R,
            C
          );
      for (const S in b) {
        if (Pn(S)) continue;
        const P = b[S], D = v[S];
        P !== D && S !== "value" && s(g, S, D, P, R, C);
      }
      "value" in b && s(g, "value", v.value, b.value, R);
    }
  }, Q = (g, v, b, C, R, S, P, D, O) => {
    const _ = v.el = g ? g.el : a(""), L = v.anchor = g ? g.anchor : a("");
    let { patchFlag: T, dynamicChildren: K, slotScopeIds: V } = v;
    V && (D = D ? D.concat(V) : V), g == null ? (r(_, b, C), r(L, b, C), $(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      v.children || [],
      b,
      L,
      R,
      S,
      P,
      D,
      O
    )) : T > 0 && T & 64 && K && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    g.dynamicChildren && g.dynamicChildren.length === K.length ? (Z(
      g.dynamicChildren,
      K,
      b,
      R,
      S,
      P,
      D
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (v.key != null || R && v === R.subTree) && sa(
      g,
      v,
      !0
      /* shallow */
    )) : re(
      g,
      v,
      b,
      L,
      R,
      S,
      P,
      D,
      O
    );
  }, we = (g, v, b, C, R, S, P, D, O) => {
    v.slotScopeIds = D, g == null ? v.shapeFlag & 512 ? R.ctx.activate(
      v,
      b,
      C,
      P,
      O
    ) : Te(
      v,
      b,
      C,
      R,
      S,
      P,
      O
    ) : Fe(g, v, O);
  }, Te = (g, v, b, C, R, S, P) => {
    const D = g.component = zf(
      g,
      C,
      R
    );
    if (Ms(g) && (D.ctx.renderer = Dt), Gf(D, !1, P), D.asyncDep) {
      if (R && R.registerDep(D, N, P), !g.el) {
        const O = D.subTree = ut(gt);
        A(null, O, v, b), g.placeholder = O.el;
      }
    } else
      N(
        D,
        g,
        v,
        b,
        R,
        S,
        P
      );
  }, Fe = (g, v, b) => {
    const C = v.component = g.component;
    if (If(g, v, b))
      if (C.asyncDep && !C.asyncResolved) {
        X(C, v, b);
        return;
      } else
        C.next = v, C.update();
    else
      v.el = g.el, C.vnode = v;
  }, N = (g, v, b, C, R, S, P) => {
    const D = () => {
      if (g.isMounted) {
        let { next: T, bu: K, u: V, parent: G, vnode: ee } = g;
        {
          const Ae = ia(g);
          if (Ae) {
            T && (T.el = ee.el, X(g, T, P)), Ae.asyncDep.then(() => {
              je(() => {
                g.isUnmounted || _();
              }, R);
            });
            return;
          }
        }
        let J = T, ve;
        kt(g, !1), T ? (T.el = ee.el, X(g, T, P)) : T = ee, K && Ao(K), (ve = T.props && T.props.onVnodeBeforeUpdate) && Ye(ve, G, T, ee), kt(g, !0);
        const pe = yi(g), ge = g.subTree;
        g.subTree = pe, I(
          ge,
          pe,
          // parent may have changed if it's in a teleport
          h(ge.el),
          // anchor may have changed if it's in a fragment
          wt(ge),
          g,
          R,
          S
        ), T.el = pe.el, J === null && Ef(g, pe.el), V && je(V, R), (ve = T.props && T.props.onVnodeUpdated) && je(
          () => Ye(ve, G, T, ee),
          R
        );
      } else {
        let T;
        const { el: K, props: V } = v, { bm: G, m: ee, parent: J, root: ve, type: pe } = g, ge = Hn(v);
        kt(g, !1), G && Ao(G), !ge && (T = V && V.onVnodeBeforeMount) && Ye(T, J, v), kt(g, !0);
        {
          ve.ce && ve.ce._hasShadowRoot() && ve.ce._injectChildStyle(
            pe,
            g.parent ? g.parent.type : void 0
          );
          const Ae = g.subTree = yi(g);
          I(
            null,
            Ae,
            b,
            C,
            g,
            R,
            S
          ), v.el = Ae.el;
        }
        if (ee && je(ee, R), !ge && (T = V && V.onVnodeMounted)) {
          const Ae = v;
          je(
            () => Ye(T, J, Ae),
            R
          );
        }
        (v.shapeFlag & 256 || J && Hn(J.vnode) && J.vnode.shapeFlag & 256) && g.a && je(g.a, R), g.isMounted = !0, v = b = C = null;
      }
    };
    g.scope.on();
    const O = g.effect = new yl(D);
    g.scope.off();
    const _ = g.update = O.run.bind(O), L = g.job = O.runIfDirty.bind(O);
    L.i = g, L.id = g.uid, O.scheduler = () => Rs(L), kt(g, !0), _();
  }, X = (g, v, b) => {
    v.component = g;
    const C = g.vnode.props;
    g.vnode = v, g.next = null, Of(g, v.props, C, b), Tf(g, v.children, b), ft(), di(g), dt();
  }, re = (g, v, b, C, R, S, P, D, O = !1) => {
    const _ = g && g.children, L = g ? g.shapeFlag : 0, T = v.children, { patchFlag: K, shapeFlag: V } = v;
    if (K > 0) {
      if (K & 128) {
        qt(
          _,
          T,
          b,
          C,
          R,
          S,
          P,
          D,
          O
        );
        return;
      } else if (K & 256) {
        rt(
          _,
          T,
          b,
          C,
          R,
          S,
          P,
          D,
          O
        );
        return;
      }
    }
    V & 8 ? (L & 16 && Ot(_, R, S), T !== _ && d(b, T)) : L & 16 ? V & 16 ? qt(
      _,
      T,
      b,
      C,
      R,
      S,
      P,
      D,
      O
    ) : Ot(_, R, S, !0) : (L & 8 && d(b, ""), V & 16 && $(
      T,
      b,
      C,
      R,
      S,
      P,
      D,
      O
    ));
  }, rt = (g, v, b, C, R, S, P, D, O) => {
    g = g || rn, v = v || rn;
    const _ = g.length, L = v.length, T = Math.min(_, L);
    let K;
    for (K = 0; K < T; K++) {
      const V = v[K] = O ? at(v[K]) : Ze(v[K]);
      I(
        g[K],
        V,
        b,
        null,
        R,
        S,
        P,
        D,
        O
      );
    }
    _ > L ? Ot(
      g,
      R,
      S,
      !0,
      !1,
      T
    ) : $(
      v,
      b,
      C,
      R,
      S,
      P,
      D,
      O,
      T
    );
  }, qt = (g, v, b, C, R, S, P, D, O) => {
    let _ = 0;
    const L = v.length;
    let T = g.length - 1, K = L - 1;
    for (; _ <= T && _ <= K; ) {
      const V = g[_], G = v[_] = O ? at(v[_]) : Ze(v[_]);
      if (En(V, G))
        I(
          V,
          G,
          b,
          null,
          R,
          S,
          P,
          D,
          O
        );
      else
        break;
      _++;
    }
    for (; _ <= T && _ <= K; ) {
      const V = g[T], G = v[K] = O ? at(v[K]) : Ze(v[K]);
      if (En(V, G))
        I(
          V,
          G,
          b,
          null,
          R,
          S,
          P,
          D,
          O
        );
      else
        break;
      T--, K--;
    }
    if (_ > T) {
      if (_ <= K) {
        const V = K + 1, G = V < L ? v[V].el : C;
        for (; _ <= K; )
          I(
            null,
            v[_] = O ? at(v[_]) : Ze(v[_]),
            b,
            G,
            R,
            S,
            P,
            D,
            O
          ), _++;
      }
    } else if (_ > K)
      for (; _ <= T; )
        Ve(g[_], R, S, !0), _++;
    else {
      const V = _, G = _, ee = /* @__PURE__ */ new Map();
      for (_ = G; _ <= K; _++) {
        const he = v[_] = O ? at(v[_]) : Ze(v[_]);
        he.key != null && ee.set(he.key, _);
      }
      let J, ve = 0;
      const pe = K - G + 1;
      let ge = !1, Ae = 0;
      const yt = new Array(pe);
      for (_ = 0; _ < pe; _++) yt[_] = 0;
      for (_ = V; _ <= T; _++) {
        const he = g[_];
        if (ve >= pe) {
          Ve(he, R, S, !0);
          continue;
        }
        let Oe;
        if (he.key != null)
          Oe = ee.get(he.key);
        else
          for (J = G; J <= K; J++)
            if (yt[J - G] === 0 && En(he, v[J])) {
              Oe = J;
              break;
            }
        Oe === void 0 ? Ve(he, R, S, !0) : (yt[Oe - G] = _ + 1, Oe >= Ae ? Ae = Oe : ge = !0, I(
          he,
          v[Oe],
          b,
          null,
          R,
          S,
          P,
          D,
          O
        ), ve++);
      }
      const tr = ge ? Lf(yt) : rn;
      for (J = tr.length - 1, _ = pe - 1; _ >= 0; _--) {
        const he = G + _, Oe = v[he], hn = v[he + 1], nr = he + 1 < L ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          hn.el || la(hn)
        ) : C;
        yt[_] === 0 ? I(
          null,
          Oe,
          b,
          nr,
          R,
          S,
          P,
          D,
          O
        ) : ge && (J < 0 || _ !== tr[J] ? ot(Oe, b, nr, 2) : J--);
      }
    }
  }, ot = (g, v, b, C, R = null) => {
    const { el: S, type: P, transition: D, children: O, shapeFlag: _ } = g;
    if (_ & 6) {
      ot(g.component.subTree, v, b, C);
      return;
    }
    if (_ & 128) {
      g.suspense.move(v, b, C);
      return;
    }
    if (_ & 64) {
      P.move(g, v, b, Dt);
      return;
    }
    if (P === Se) {
      r(S, v, b);
      for (let T = 0; T < O.length; T++)
        ot(O[T], v, b, C);
      r(g.anchor, v, b);
      return;
    }
    if (P === jo) {
      j(g, v, b);
      return;
    }
    if (C !== 2 && _ & 1 && D)
      if (C === 0)
        D.persisted && !S[To] ? r(S, v, b) : (D.beforeEnter(S), r(S, v, b), je(() => D.enter(S), R));
      else {
        const { leave: T, delayLeave: K, afterLeave: V } = D, G = () => {
          g.ctx.isUnmounted ? o(S) : r(S, v, b);
        }, ee = () => {
          const J = S._isLeaving || !!S[To];
          S._isLeaving && S[To](
            !0
            /* cancelled */
          ), D.persisted && !J ? G() : T(S, () => {
            G(), V && V();
          });
        };
        K ? K(S, G, ee) : ee();
      }
    else
      r(S, v, b);
  }, Ve = (g, v, b, C = !1, R = !1) => {
    const {
      type: S,
      props: P,
      ref: D,
      children: O,
      dynamicChildren: _,
      shapeFlag: L,
      patchFlag: T,
      dirs: K,
      cacheIndex: V,
      memo: G
    } = g;
    if (T === -2 && (R = !1), D != null && (ft(), Fn(D, null, b, g, !0), dt()), V != null && (v.renderCache[V] = void 0), L & 256) {
      v.ctx.deactivate(g);
      return;
    }
    const ee = L & 1 && K, J = !Hn(g);
    let ve;
    if (J && (ve = P && P.onVnodeBeforeUnmount) && Ye(ve, v, g), L & 6)
      pn(g.component, b, C);
    else {
      if (L & 128) {
        g.suspense.unmount(b, C);
        return;
      }
      ee && Pt(g, null, v, "beforeUnmount"), L & 64 ? g.type.remove(
        g,
        v,
        b,
        Dt,
        C
      ) : _ && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !_.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (S !== Se || T > 0 && T & 64) ? Ot(
        _,
        v,
        b,
        !1,
        !0
      ) : (S === Se && T & 384 || !R && L & 16) && Ot(O, v, b), C && mt(g);
    }
    const pe = G != null && V == null;
    (J && (ve = P && P.onVnodeUnmounted) || ee || pe) && je(() => {
      ve && Ye(ve, v, g), ee && Pt(g, null, v, "unmounted"), pe && (g.el = null);
    }, b);
  }, mt = (g) => {
    const { type: v, el: b, anchor: C, transition: R } = g;
    if (v === Se) {
      Gt(b, C);
      return;
    }
    if (v === jo) {
      M(g);
      return;
    }
    const S = () => {
      o(b), R && !R.persisted && R.afterLeave && R.afterLeave();
    };
    if (g.shapeFlag & 1 && R && !R.persisted) {
      const { leave: P, delayLeave: D } = R, O = () => P(b, S);
      D ? D(g.el, S, O) : O();
    } else
      S();
  }, Gt = (g, v) => {
    let b;
    for (; g !== v; )
      b = w(g), o(g), g = b;
    o(v);
  }, pn = (g, v, b) => {
    const { bum: C, scope: R, job: S, subTree: P, um: D, m: O, a: _ } = g;
    xi(O), xi(_), C && Ao(C), R.stop(), S && (S.flags |= 8, Ve(P, g, v, b)), D && je(D, v), je(() => {
      g.isUnmounted = !0;
    }, v);
  }, Ot = (g, v, b, C = !1, R = !1, S = 0) => {
    for (let P = S; P < g.length; P++)
      Ve(g[P], v, b, C, R);
  }, wt = (g) => {
    if (g.shapeFlag & 6)
      return wt(g.component.subTree);
    if (g.shapeFlag & 128)
      return g.suspense.next();
    const v = w(g.anchor || g.el), b = v && v[ef];
    return b ? w(b) : v;
  };
  let qe = !1;
  const er = (g, v, b) => {
    let C;
    g == null ? v._vnode && (Ve(v._vnode, null, null, !0), C = v._vnode.component) : I(
      v._vnode || null,
      g,
      v,
      null,
      null,
      null,
      b
    ), v._vnode = g, qe || (qe = !0, di(C), jl(), qe = !1);
  }, Dt = {
    p: I,
    um: Ve,
    m: ot,
    r: mt,
    mt: Te,
    mc: $,
    pc: re,
    pbc: Z,
    n: wt,
    o: e
  };
  return {
    render: er,
    hydrate: void 0,
    createApp: _f(er)
  };
}
function Ho({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function kt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function jf(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function sa(e, t, n = !1) {
  const r = e.children, o = t.children;
  if (z(r) && z(o))
    for (let s = 0; s < r.length; s++) {
      const i = r[s];
      let a = o[s];
      a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = o[s] = at(o[s]), a.el = i.el), !n && a.patchFlag !== -2 && sa(i, a)), a.type === Qr && (a.patchFlag === -1 && (a = o[s] = at(a)), a.el = i.el), a.type === gt && !a.el && (a.el = i.el);
    }
}
function Lf(e) {
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
function ia(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : ia(t);
}
function xi(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function la(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? la(t.subTree) : null;
}
const aa = (e) => e.__isSuspense;
function Kf(e, t) {
  t && t.pendingBranch ? z(e) ? t.effects.push(...e) : t.effects.push(e) : Gu(e);
}
const Se = /* @__PURE__ */ Symbol.for("v-fgt"), Qr = /* @__PURE__ */ Symbol.for("v-txt"), gt = /* @__PURE__ */ Symbol.for("v-cmt"), jo = /* @__PURE__ */ Symbol.for("v-stc"), Kt = [];
let Ke = null;
function te(e = !1) {
  Kt.push(Ke = e ? null : []);
}
function ca() {
  Kt.pop(), Ke = Kt[Kt.length - 1] || null;
}
let Nn = 1;
function Si(e, t = !1) {
  Nn += e, e < 0 && Ke && t && (Ke.hasOnce = !0);
}
function ua(e) {
  return e.dynamicChildren = Nn > 0 ? Ke || rn : null, ca(), Nn > 0 && Ke && Ke.push(e), e;
}
function ne(e, t, n, r, o, s) {
  return ua(
    _e(
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
function Vf(e, t, n, r, o) {
  return ua(
    ut(
      e,
      t,
      n,
      r,
      o,
      !0
    )
  );
}
function fa(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function En(e, t) {
  return e.type === t.type && e.key === t.key;
}
const da = ({ key: e }) => e ?? null, Mr = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? me(e) || /* @__PURE__ */ Ie(e) || q(e) ? { i: et, r: e, k: t, f: !!n } : e : null);
function _e(e, t = null, n = null, r = 0, o = null, s = e === Se ? 0 : 1, i = !1, a = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && da(t),
    ref: t && Mr(t),
    scopeId: Kl,
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
    ctx: et
  };
  return a ? (Fr(c, n), s & 128 && e.normalize(c)) : n && (c.shapeFlag |= me(n) ? 8 : 16), Nn > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  Ke && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && Ke.push(c), c;
}
const ut = Bf;
function Bf(e, t = null, n = null, r = 0, o = null, s = !1) {
  if ((!e || e === pf) && (e = gt), fa(e)) {
    const a = cn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Fr(a, n), Nn > 0 && !s && Ke && (a.shapeFlag & 6 ? Ke[Ke.indexOf(e)] = a : Ke.push(a)), a.patchFlag = -2, a;
  }
  if (Zf(e) && (e = e.__vccOpts), t) {
    t = Nf(t);
    let { class: a, style: c } = t;
    a && !me(a) && (t.class = Ct(a)), ie(c) && (/* @__PURE__ */ Ss(c) && !z(c) && (c = Ee({}, c)), t.style = Ft(c));
  }
  const i = me(e) ? 1 : aa(e) ? 128 : Xr(e) ? 64 : ie(e) ? 4 : q(e) ? 2 : 0;
  return _e(
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
function Nf(e) {
  return e ? /* @__PURE__ */ Ss(e) || Ql(e) ? Ee({}, e) : e : null;
}
function cn(e, t, n = !1, r = !1) {
  const { props: o, ref: s, patchFlag: i, children: a, transition: c } = e, f = t ? $f(o || {}, t) : o, d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && da(f),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && s ? z(s) ? s.concat(Mr(t)) : [s, Mr(t)] : Mr(t)
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
    patchFlag: t && e.type !== Se ? i === -1 ? 16 : i | 16 : i,
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
    ssContent: e.ssContent && cn(e.ssContent),
    ssFallback: e.ssFallback && cn(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && r && Cs(
    d,
    c.clone(d)
  ), d;
}
function os(e = " ", t = 0) {
  return ut(Qr, null, e, t);
}
function Ge(e = "", t = !1) {
  return t ? (te(), Vf(gt, null, e)) : ut(gt, null, e);
}
function Ze(e) {
  return e == null || typeof e == "boolean" ? ut(gt) : z(e) ? ut(
    Se,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : fa(e) ? at(e) : ut(Qr, null, String(e));
}
function at(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : cn(e);
}
function Fr(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (z(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), Fr(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !Ql(t) ? t._ctx = et : o === 3 && et && (et.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (q(t)) {
    if (r & 65) {
      Fr(e, { default: t });
      return;
    }
    t = { default: t, _ctx: et }, n = 32;
  } else
    t = String(t), r & 64 ? (n = 16, t = [os(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function $f(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === "class")
        t.class !== r.class && (t.class = Ct([t.class, r.class]));
      else if (o === "style")
        t.style = Ft([t.style, r.style]);
      else if (Nr(o)) {
        const s = t[o], i = r[o];
        i && s !== i && !(z(s) && s.includes(i)) ? t[o] = s ? [].concat(s, i) : i : i == null && s == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !$r(o) && (t[o] = i);
      } else o !== "" && (t[o] = r[o]);
  }
  return t;
}
function Ye(e, t, n, r = null) {
  ze(e, t, 7, [
    n,
    r
  ]);
}
const Uf = Gl();
let Wf = 0;
function zf(e, t, n) {
  const r = e.type, o = (t ? t.appContext : e.appContext) || Uf, s = {
    uid: Wf++,
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
    scope: new wu(
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
    propsOptions: ta(r, o),
    emitsOptions: Yl(r, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: ce,
    // inheritAttrs
    inheritAttrs: r.inheritAttrs,
    // state
    ctx: ce,
    data: ce,
    props: ce,
    attrs: ce,
    slots: ce,
    refs: ce,
    setupState: ce,
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
  return s.ctx = { _: s }, s.root = t ? t.root : s, s.emit = Sf.bind(null, s), e.ce && e.ce(s), s;
}
let ke = null;
const qf = () => ke || et;
let Hr, $n;
{
  const e = Wr(), t = (n, r) => {
    let o;
    return (o = e[n]) || (o = e[n] = []), o.push(r), (s) => {
      o.length > 1 ? o.forEach((i) => i(s)) : o[0](s);
    };
  };
  Hr = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => ke = n
  ), $n = t(
    "__VUE_SSR_SETTERS__",
    (n) => Un = n
  );
}
const Yn = (e) => {
  const t = ke;
  return Hr(e), e.scope.on(), () => {
    e.scope.off(), Hr(t);
  };
}, Ri = () => {
  ke && ke.scope.off(), Hr(null);
};
function pa(e) {
  return e.vnode.shapeFlag & 4;
}
let Un = !1;
function Gf(e, t = !1, n = !1) {
  t && $n(t);
  const { props: r, children: o } = e.vnode, s = pa(e);
  Af(e, r, s, t), kf(e, o, n || t);
  const i = s ? Yf(e, t) : void 0;
  return t && $n(!1), i;
}
function Yf(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, gf);
  const { setup: r } = n;
  if (r) {
    ft();
    const o = e.setupContext = r.length > 1 ? Jf(e) : null, s = Yn(e), i = Gn(
      r,
      e,
      0,
      [
        e.props,
        o
      ]
    ), a = ul(i);
    if (dt(), s(), (a || e.sp) && !Hn(e) && $l(e), a) {
      if (i.then(Ri, Ri), t)
        return i.then((c) => {
          $n(!0);
          try {
            Ci(e, c, t);
          } finally {
            $n(!1);
          }
        }).catch((c) => {
          Yr(c, e, 0);
        });
      e.asyncDep = i;
    } else
      Ci(e, i);
  } else
    ga(e);
}
function Ci(e, t, n) {
  q(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ie(t) && (e.setupState = Tl(t)), ga(e);
}
function ga(e, t, n) {
  const r = e.type;
  e.render || (e.render = r.render || tt);
  {
    const o = Yn(e);
    ft();
    try {
      hf(e);
    } finally {
      dt(), o();
    }
  }
}
const Xf = {
  get(e, t) {
    return Me(e, "get", ""), e[t];
  }
};
function Jf(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Xf),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function As(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Tl(Lu(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in jn)
        return jn[n](e);
    },
    has(t, n) {
      return n in t || n in jn;
    }
  })) : e.proxy;
}
function Zf(e) {
  return q(e) && "__vccOpts" in e;
}
const W = (e, t) => /* @__PURE__ */ $u(e, t, Un), Qf = "3.5.42";
/**
* @vue/runtime-dom v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let ss;
const Mi = typeof window < "u" && window.trustedTypes;
if (Mi)
  try {
    ss = /* @__PURE__ */ Mi.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const ha = ss ? (e) => ss.createHTML(e) : (e) => e, ed = "http://www.w3.org/2000/svg", td = "http://www.w3.org/1998/Math/MathML", lt = typeof document < "u" ? document : null, Ii = lt && /* @__PURE__ */ lt.createElement("template"), nd = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const o = t === "svg" ? lt.createElementNS(ed, e) : t === "mathml" ? lt.createElementNS(td, e) : n ? lt.createElement(e, { is: n }) : lt.createElement(e);
    return e === "select" && r && r.multiple != null && o.setAttribute("multiple", r.multiple), o;
  },
  createText: (e) => lt.createTextNode(e),
  createComment: (e) => lt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => lt.querySelector(e),
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
      Ii.innerHTML = ha(
        r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e
      );
      const a = Ii.content;
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
}, rd = /* @__PURE__ */ Symbol("_vtc");
function od(e, t, n) {
  const r = e[rd];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Ei = /* @__PURE__ */ Symbol("_vod"), sd = /* @__PURE__ */ Symbol("_vsh"), id = /* @__PURE__ */ Symbol(""), ld = /(?:^|;)\s*display\s*:/;
function ad(e, t, n) {
  const r = e.style, o = me(n);
  let s = !1;
  if (n && !o) {
    if (t)
      if (me(t))
        for (const i of t.split(";")) {
          const a = i.slice(0, i.indexOf(":")).trim();
          n[a] == null && Dn(r, a, "");
        }
      else
        for (const i in t)
          n[i] == null && Dn(r, i, "");
    for (const i in n) {
      i === "display" && (s = !0);
      const a = n[i];
      a != null ? ud(
        e,
        i,
        !me(t) && t ? t[i] : void 0,
        a
      ) || Dn(r, i, a) : Dn(r, i, "");
    }
  } else if (o) {
    if (t !== n) {
      const i = r[id];
      i && (n += ";" + i), r.cssText = n, s = ld.test(n);
    }
  } else t && e.removeAttribute("style");
  Ei in e && (e[Ei] = s ? r.display : "", e[sd] && (r.display = "none"));
}
const _r = /\s*!important$/;
function Dn(e, t, n) {
  if (z(n))
    n.forEach((r) => Dn(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--"))
    _r.test(n) ? e.setProperty(t, n.replace(_r, ""), "important") : e.setProperty(t, n);
  else {
    const r = cd(e, t);
    _r.test(n) ? e.setProperty(
      Ut(r),
      n.replace(_r, ""),
      "important"
    ) : e[r] = n;
  }
}
const Ai = ["Webkit", "Moz", "ms"], Lo = {};
function cd(e, t) {
  const n = Lo[t];
  if (n)
    return n;
  let r = $e(t);
  if (r !== "filter" && r in e)
    return Lo[t] = r;
  r = pl(r);
  for (let o = 0; o < Ai.length; o++) {
    const s = Ai[o] + r;
    if (s in e)
      return Lo[t] = s;
  }
  return t;
}
function ud(e, t, n, r) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && me(r) && n === r;
}
const Oi = "http://www.w3.org/1999/xlink";
function Di(e, t, n, r, o, s = vu(t)) {
  r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Oi, t.slice(6, t.length)) : e.setAttributeNS(Oi, t, n) : n == null || s && !hl(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    s ? "" : nt(n) ? String(n) : n
  );
}
function Pi(e, t, n, r, o) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? ha(n) : n);
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
    a === "boolean" ? n = hl(n) : n == null && a === "string" ? (n = "", i = !0) : a === "number" && (n = 0, i = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  i && e.removeAttribute(o || t);
}
function fd(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function dd(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const ki = /* @__PURE__ */ Symbol("_vei");
function pd(e, t, n, r, o = null) {
  const s = e[ki] || (e[ki] = {}), i = s[t];
  if (r && i)
    i.value = r;
  else {
    const [a, c] = vd(t);
    if (r) {
      const f = s[t] = yd(
        r,
        o
      );
      fd(e, a, f, c);
    } else i && (dd(e, a, i, c), s[t] = void 0);
  }
}
const gd = /(Once|Passive|Capture)$/, hd = /^on:?(?:Once|Passive|Capture)$/;
function vd(e) {
  let t, n;
  for (; (n = e.match(gd)) && !hd.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : Ut(e.slice(2)), t];
}
let Ko = 0;
const md = /* @__PURE__ */ Promise.resolve(), wd = () => Ko || (md.then(() => Ko = 0), Ko = Date.now());
function yd(e, t) {
  const n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    const o = n.value;
    if (z(o)) {
      const s = r.stopImmediatePropagation;
      r.stopImmediatePropagation = () => {
        s.call(r), r._stopped = !0;
      };
      const i = o.slice(), a = [r];
      for (let c = 0; c < i.length && !r._stopped; c++) {
        const f = i[c];
        f && ze(
          f,
          t,
          5,
          a
        );
      }
    } else
      ze(
        o,
        t,
        5,
        [r]
      );
  };
  return n.value = e, n.attached = wd(), n;
}
const Ti = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, bd = (e, t, n, r, o, s) => {
  const i = o === "svg";
  t === "class" ? od(e, r, i) : t === "style" ? ad(e, n, r) : Nr(t) ? $r(t) || pd(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : _d(e, t, r, i)) ? (Pi(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Di(e, t, r, i, s, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (xd(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !me(r))) ? Pi(e, $e(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), Di(e, t, r, i));
};
function _d(e, t, n, r) {
  if (r)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Ti(t) && q(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return Ti(t) && me(n) ? !1 : t in e;
}
function xd(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const r = $e(t);
  return Array.isArray(n) ? n.some((o) => $e(o) === r) : Object.keys(n).some((o) => $e(o) === r);
}
const Sd = ["ctrl", "shift", "alt", "meta"], Rd = {
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
  exact: (e, t) => Sd.some((n) => e[`${n}Key`] && !t.includes(n))
}, xr = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), r = t.join(".");
  return n[r] || (n[r] = (o, ...s) => {
    for (let i = 0; i < t.length; i++) {
      const a = Rd[t[i]];
      if (a && a(o, t)) return;
    }
    return e(o, ...s);
  });
}, Cd = /* @__PURE__ */ Ee({ patchProp: bd }, nd);
let Fi;
function Md() {
  return Fi || (Fi = Ff(Cd));
}
const Id = (...e) => {
  const t = Md().createApp(...e), { mount: n } = t;
  return t.mount = (r) => {
    const o = Ad(r);
    if (!o) return;
    const s = t._component;
    !q(s) && !s.render && !s.template && (s.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const i = n(o, !1, Ed(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), i;
  }, t;
};
function Ed(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Ad(e) {
  return me(e) ? document.querySelector(e) : e;
}
function Sr() {
  return !0;
}
const Od = Symbol("merge-proxy"), Ir = Symbol("merge-proxy-sources"), Dd = {
  get(e, t, n) {
    return t === Od ? n : t === Ir ? e.sources : e.get(t);
  },
  has(e, t) {
    return e.has(t);
  },
  set: Sr,
  deleteProperty: Sr,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: Sr,
      deleteProperty: Sr
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function Er(e) {
  return e && typeof e == "object" && "value" in e ? e.value : e;
}
function is(...e) {
  const t = e.flatMap((n) => typeof n == "object" && n !== null && Ir in n && Array.isArray(n[Ir]) ? n[Ir] : [n]);
  return new Proxy({
    sources: t,
    get(n) {
      for (let r = t.length - 1; r >= 0; r--) {
        const o = Er(t[r])[n];
        if (o !== void 0) return o;
      }
    },
    has(n) {
      for (let r = t.length - 1; r >= 0; r--) if (n in Er(t[r])) return !0;
      return !1;
    },
    keys() {
      const n = [];
      for (const r of t) n.push(...Object.keys(Er(r)));
      return [...Array.from(new Set(n))];
    }
  }, Dd);
}
function Hi(...e) {
  const t = {};
  for (let n of e)
    if (n = Er(n), !!n)
      for (const r of Reflect.ownKeys(n)) {
        const o = n[r];
        o !== void 0 && (t[r] = o);
      }
  return t;
}
function va(e) {
  return typeof e == "function" ? e : (t) => {
    var n;
    return (n = e.next) == null ? void 0 : n.call(e, t);
  };
}
function Pd(e) {
  return Object.assign(e, {
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: be(e, va(t), { flush: "sync" }) })
  });
}
function kd(e) {
  return Object.assign(e, {
    set: (t) => {
      e.value = typeof t == "function" ? t(e.value) : t;
    },
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: be(e, va(t), { flush: "sync" }) })
  });
}
function Td() {
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
    createReadonlyAtom: (t, n) => Pd(W(() => t())),
    createWritableAtom: (t, n) => kd(/* @__PURE__ */ Ku(t)),
    untrack: (t) => t(),
    batch: (t) => t()
  };
}
function eo(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Et(e) {
  if (Array.isArray(e)) return e.map(Et);
  if (e && typeof e == "object") {
    const t = Object.getPrototypeOf(e);
    if (t !== Object.prototype && t !== null) return e;
    const n = t === null ? le() : {}, r = Object.keys(e);
    for (let o = 0; o < r.length; o++) {
      const s = r[o];
      Object.defineProperty(n, s, {
        configurable: !0,
        enumerable: !0,
        value: Et(e[s]),
        writable: !0
      });
    }
    return n;
  }
  return e;
}
function ma(e, t) {
  const n = Object.keys(t), r = e;
  for (let o = 0; o < n.length; o++) {
    const s = n[o];
    !s.startsWith("_memo_") && s !== "_cellsCache" && (r[s] = t[s]);
  }
  return e;
}
function le() {
  return /* @__PURE__ */ Object.create(null);
}
function un(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Os(e, t) {
  return (n) => {
    var r;
    (((r = t.options.atoms) == null ? void 0 : r[e]) ?? t.baseAtoms[e]).set((o) => eo(n, o));
  };
}
function ji(e) {
  if (typeof e != "object" || e === null) return !1;
  if (Array.isArray(e)) return !0;
  const t = Object.getPrototypeOf(e);
  return t === Object.prototype || t === null;
}
function Li(e) {
  return Reflect.ownKeys(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
const Fd = 3;
function Hd(e, t) {
  return wa(e, t, Fd);
}
function wa(e, t, n) {
  if (Object.is(e, t)) return !0;
  if (n <= 0 || !ji(e) || !ji(t) || (Array.isArray(e) || Array.isArray(t)) && (!Array.isArray(e) || !Array.isArray(t) || e.length !== t.length))
    return !1;
  const r = Li(e), o = Li(t);
  if (r.length !== o.length) return !1;
  const s = e, i = t;
  for (let a = 0; a < r.length; a++) {
    const c = r[a];
    if (!Object.prototype.propertyIsEnumerable.call(t, c) || !wa(s[c], i[c], n - 1)) return !1;
  }
  return !0;
}
function to(e, t, n, r = Hd) {
  const o = `on${t.charAt(0).toUpperCase()}${t.slice(1)}Change`, s = e.options[o];
  s && s((i) => {
    const a = eo(n, i);
    return r(i, a) ? i : a;
  });
}
function jd(e) {
  return e instanceof Function;
}
function Ld(e, t) {
  const n = [], r = (o) => {
    o.forEach((s) => {
      n.push(s);
      const i = t(s);
      i.length && r(i);
    });
  };
  return r(e), n;
}
const Kd = ({ fn: e, memoDeps: t, onAfterCompare: n, onAfterUpdate: r, onBeforeCompare: o, onBeforeUpdate: s }) => {
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
function ya(e) {
  let t = !1;
  return () => {
    if (!t) {
      t = !0;
      return;
    }
    e();
  };
}
function Xn({ feature: e, fnName: t, objectId: n, onAfterUpdate: r, table: o, ...s }) {
  const i = () => {
    if (!r) return;
    const { schedule: c, untrack: f } = o._reactivity;
    c(() => f(() => r()));
  };
  return Kd({
    ...s,
    ...{ onAfterUpdate: () => {
      i();
    } }
  });
}
function ba(e, t = "_") {
  const [n, r] = e.split(t);
  return {
    fnKey: r,
    fnName: `${n}.${r}`,
    parentName: n
  };
}
function At(e, t, n) {
  for (const [r, { fn: o, memoDeps: s }] of Object.entries(n)) {
    const { fnKey: i, fnName: a } = ba(r);
    t[i] = s ? Xn({
      memoDeps: s,
      fn: o,
      fnName: a,
      table: t,
      feature: e
    }) : o;
  }
}
function Wt(e, t, n, r) {
  for (const [o, { fn: s, memoDeps: i }] of Object.entries(r)) {
    const { fnKey: a, fnName: c } = ba(o);
    if (i) {
      const f = `_memo_${a}`;
      t[a] = function(...d) {
        if (!this[f]) {
          const h = this;
          this[f] = Xn({
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
function Re(e, t, n, ...r) {
  var o;
  return ((o = e[t]) == null ? void 0 : o.call(e, ...r)) ?? n(e, ...r);
}
function Vd(e) {
  return e.row.getValue(e.column.id);
}
function Bd(e) {
  return e.getValue() ?? e.table.options.renderFallbackValue;
}
function Nd(e) {
  return {
    table: e.table,
    column: e.column,
    row: e.row,
    cell: e,
    getValue: () => e.getValue(),
    renderValue: () => e.renderValue()
  };
}
const $d = { assignCellPrototype: (e, t) => {
  Wt("coreCellsFeature", e, t, {
    cell_getValue: { fn: (n) => Vd(n) },
    cell_renderValue: { fn: (n) => Bd(n) },
    cell_getContext: {
      fn: (n) => Nd(n),
      memoDeps: (n) => [n]
    }
  });
} };
function Ud(e) {
  var t, n;
  if (!e._headerPrototype) {
    e._headerPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignHeaderPrototype) == null || n.call(t, e._headerPrototype, e);
  }
  return e._headerPrototype;
}
function _a(e, t, n) {
  const r = Ud(e), o = Object.create(r);
  o.colSpan = 0, o.column = t, o.depth = n.depth, o.headerGroup = null, o.id = n.id ?? t.id, o.index = n.index, o.isPlaceholder = !!n.isPlaceholder, o.placeholderId = n.placeholderId, o.rowSpan = 0, o.subHeaders = [];
  const s = e._headerInstanceInitFns;
  for (let i = 0; i < s.length; i++) s[i](o);
  return o;
}
function Wd() {
  return {
    start: [],
    end: []
  };
}
function Bt(e) {
  var r;
  const t = (r = e.table.atoms.columnVisibility) == null ? void 0 : r.get();
  if (!t) return !0;
  const n = e.columns;
  return n.length ? n.some((o) => Re(o, "getIsVisible", Bt)) : (un(t, e.id) ? t[e.id] : void 0) ?? !0;
}
function zd(e) {
  return e.getAllLeafColumns().filter((t) => Re(t, "getIsVisible", Bt));
}
function xa(e, t = 1) {
  let n = t;
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    Re(o, "getIsVisible", Bt) && o.columns.length && (n = Math.max(n, xa(o.columns, t + 1)));
  }
  return n;
}
function qd(e, t) {
  return String(t);
}
function Gd(e, t, n, r) {
  let o = e ?? "";
  return t && (o = o ? `${o}_${t}` : String(t)), n && (o = o ? `${o}_${n}` : n), r && (o = o ? `${o}_${r}` : r), o;
}
function Yd(e, t) {
  let n = 0;
  for (let r = 0; r < e.length; r++) e[r].column === t && n++;
  return n;
}
function Sa(e, t, n, r, o, s) {
  const i = {
    depth: t,
    id: qd(r, t),
    headers: []
  }, a = [];
  for (let c = 0; c < e.length; c++) {
    if (!(c in e)) continue;
    const f = e[c], d = a[a.length - 1], h = f.column.depth === i.depth;
    let w, y = !1;
    if (h && f.column.parent ? w = f.column.parent : (w = f.column, y = !0), d && d.column === w) d.subHeaders.push(f);
    else {
      const E = _a(n, w, {
        id: Gd(r, t, w.id, f.id),
        isPlaceholder: y,
        placeholderId: y ? String(Yd(a, w)) : void 0,
        depth: t,
        index: a.length
      });
      E.subHeaders.push(f), a.push(E);
    }
    i.headers.push(f), f.headerGroup = i;
  }
  for (let c = 0; c < s.length; c++) s[c](i);
  o.push(i), t > 0 && Sa(a, t - 1, n, r, o, s);
}
function Ra(e) {
  for (let t = 0; t < e.length; t++) {
    const n = e[t];
    if (!Re(n.column, "getIsVisible", Bt)) continue;
    let r = 0;
    if (n.subHeaders.length) {
      Ra(n.subHeaders);
      for (let o = 0; o < n.subHeaders.length; o++) {
        const s = n.subHeaders[o];
        Re(s.column, "getIsVisible", Bt) && (r += s.colSpan);
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
function Ki(e, t, n, r) {
  var c;
  const o = xa(e), s = [], i = n._headerGroupInstanceInitFns, a = new Array(t.length);
  for (let f = 0; f < t.length; f++)
    f in t && (a[f] = _a(n, t[f], {
      depth: o,
      index: f
    }));
  return Sa(a, o - 1, n, r, s, i), s.reverse(), Ra(((c = s[0]) == null ? void 0 : c.headers) ?? []), s;
}
function Xd(e) {
  var t, n;
  if (!e._columnPrototype) {
    e._columnPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignColumnPrototype) == null || n.call(t, e._columnPrototype, e);
  }
  return e._columnPrototype;
}
function Jd(e, t, n, r) {
  const o = {
    ...e.getDefaultColumnDef(),
    ...t
  }, s = o.accessorKey, i = s === void 0 ? void 0 : String(s), a = o.id ?? (i == null ? void 0 : i.replaceAll(".", "_")) ?? (typeof o.header == "string" ? o.header : void 0);
  let c;
  if (o.accessorFn) c = o.accessorFn;
  else if (s !== void 0) if (typeof s == "string" && s.includes(".")) {
    const w = s.split(".");
    c = (y) => {
      let E = y;
      for (let I = 0; I < w.length; I++) {
        const H = w[I];
        E = E == null ? void 0 : E[H];
      }
      return E;
    };
  } else c = (w) => w[o.accessorKey];
  if (!a)
    throw new Error();
  const f = Xd(e), d = Object.create(f);
  d.accessorFn = c, d.columnDef = o, d.columns = [], d.depth = n, d.id = `${String(a)}`, d.parent = r;
  const h = e._columnInstanceInitFns;
  for (let w = 0; w < h.length; w++) h[w](d);
  return d;
}
function Ca(e) {
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
    return Zd(e, o);
  };
}
function Zd(e, t) {
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
function Qd(e) {
  return [e, ...e.columns.flatMap((t) => t.getFlatColumns())];
}
function ep(e) {
  if (e.columns.length) {
    const t = e.columns.flatMap((n) => n.getLeafColumns());
    return Re(e.table, "getOrderColumns", Ca)(t);
  }
  return [e];
}
function tp(e) {
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
function Ma(e, t, n, r = 0) {
  const o = new Array(t.length);
  for (let s = 0; s < t.length; s++) {
    if (!(s in t)) continue;
    const i = t[s], a = Jd(e, i, r, n), c = i;
    a.columns = c.columns ? Ma(e, c.columns, a, r + 1) : [], o[s] = a;
  }
  return o;
}
function np(e) {
  return Ma(e, e.options.columns);
}
function rp(e) {
  return e.getAllColumns().flatMap((t) => t.getFlatColumns());
}
function op(e) {
  const t = le(), n = e.getAllFlatColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function sp(e) {
  const t = e.getAllColumns().flatMap((n) => n.getLeafColumns());
  return Re(e, "getOrderColumns", Ca)(t);
}
function ip(e) {
  const t = le(), n = e.getAllLeafColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function lp(e, t) {
  return e.getAllFlatColumnsById()[t];
}
const ap = {
  assignColumnPrototype: (e, t) => {
    Wt("coreColumnsFeature", e, t, {
      column_getFlatColumns: {
        fn: (n) => Qd(n),
        memoDeps: (n) => [n.table.options.columns]
      },
      column_getLeafColumns: {
        fn: (n) => ep(n),
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
    At("coreColumnsFeature", e, {
      table_getDefaultColumnDef: {
        fn: () => tp(e),
        memoDeps: () => [e.options.defaultColumn]
      },
      table_getAllColumns: {
        fn: () => np(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumns: {
        fn: () => rp(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumnsById: {
        fn: () => op(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllLeafColumns: {
        fn: () => sp(e),
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
        fn: () => ip(e),
        memoDeps: () => [e.getAllLeafColumns()]
      },
      table_getColumn: { fn: (t) => lp(e, t) }
    });
  }
};
function Ia(e, t) {
  for (let n = 0; n < e.subHeaders.length; n++) Ia(e.subHeaders[n], t);
  t.push(e);
}
function cp(e) {
  const t = [];
  return Ia(e, t), t;
}
function up(e) {
  return {
    column: e.column,
    header: e,
    table: e.column.table
  };
}
function fp(e) {
  var f;
  const { start: t, end: n } = ((f = e.atoms.columnPinning) == null ? void 0 : f.get()) ?? Wd(), r = e.getAllColumns(), o = Re(e, "getVisibleLeafColumns", zd);
  if (!t.length && !n.length) return Ki(r, o, e);
  const s = e.getAllLeafColumnsById(), i = [];
  for (let d = 0; d < t.length; d++) {
    const h = s[t[d]];
    h && Re(h, "getIsVisible", Bt) && i.push(h);
  }
  const a = [];
  for (let d = 0; d < n.length; d++) {
    const h = s[n[d]];
    h && Re(h, "getIsVisible", Bt) && a.push(h);
  }
  const c = o.filter((d) => !t.includes(d.id) && !n.includes(d.id));
  return Ki(r, [
    ...i,
    ...c,
    ...a
  ], e);
}
function dp(e) {
  return [...e.getHeaderGroups()].reverse();
}
function pp(e) {
  const t = e.getHeaderGroups(), n = [];
  for (let r = 0; r < t.length; r++) {
    const o = t[r].headers;
    for (let s = 0; s < o.length; s++) n.push(o[s]);
  }
  return n;
}
function gp(e) {
  var r;
  const t = ((r = e.getHeaderGroups()[0]) == null ? void 0 : r.headers) ?? [], n = [];
  for (let o = 0; o < t.length; o++) {
    const s = t[o].getLeafHeaders();
    for (let i = 0; i < s.length; i++) n.push(s[i]);
  }
  return n;
}
const hp = {
  assignHeaderPrototype: (e, t) => {
    Wt("coreHeadersFeature", e, t, {
      header_getLeafHeaders: {
        fn: (n) => cp(n),
        memoDeps: (n) => [n.column.table.options.columns]
      },
      header_getContext: {
        fn: (n) => up(n),
        memoDeps: (n) => [n.column.table.options.columns]
      }
    });
  },
  constructTableAPIs: (e) => {
    At("coreHeadersFeature", e, {
      table_getHeaderGroups: {
        fn: () => fp(e),
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
        fn: () => dp(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getFlatHeaders: {
        fn: () => pp(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getLeafHeaders: {
        fn: () => gp(e),
        memoDeps: () => [e.getHeaderGroups()]
      }
    });
  }
};
function vp(e) {
  var t, n;
  if (!e._rowPrototype) {
    e._rowPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignRowPrototype) == null || n.call(t, e._rowPrototype, e);
  }
  return e._rowPrototype;
}
const mp = (e, t, n, r, o, s, i) => {
  const a = vp(e), c = Object.create(a);
  c._displayIndexCache = -1, c._uniqueValuesCache = le(), c._valuesCache = le(), c.depth = o, c.id = t, c.index = r, c.original = n, c.parentId = i, c.subRows = [];
  const f = e._rowInstanceInitFns;
  for (let d = 0; d < f.length; d++) f[d](c);
  return c;
}, wp = /([0-9]+)/gm;
function fn(e) {
  const t = Object.assign((n, r, o) => {
    let s = n.getValue(o), i = r.getValue(o);
    const a = t.resolveDataValue;
    return a && (s = a(s), i = a(i)), t.sort(s, i, n, r, o);
  }, e);
  return t;
}
const yp = fn({
  resolveDataValue: (e) => no(e).toLowerCase(),
  sort: (e, t) => Aa(e, t)
});
fn({
  resolveDataValue: (e) => no(e),
  sort: (e, t) => Aa(e, t)
});
const bp = fn({
  resolveDataValue: (e) => no(e).toLowerCase(),
  sort: (e, t) => Ds(e, t)
});
fn({
  resolveDataValue: (e) => no(e),
  sort: (e, t) => Ds(e, t)
});
fn({
  resolveDataValue: (e) => _p(e),
  sort: (e, t) => e > t ? 1 : e < t ? -1 : 0
});
const Ea = fn({ sort: (e, t) => Ds(e, t) });
function Ds(e, t) {
  return e === t ? 0 : e > t ? 1 : -1;
}
function _p(e) {
  return e instanceof Date ? e.getTime() : e;
}
function no(e) {
  return typeof e == "number" ? isNaN(e) || e === 1 / 0 || e === -1 / 0 ? "" : String(e) : typeof e == "string" ? e : "";
}
function Aa(e, t) {
  let n = 0, r = 0;
  const o = e.length, s = t.length;
  for (; n < o && r < s; ) {
    const i = jr(e.charCodeAt(n)), a = jr(t.charCodeAt(r)), c = ls(e, n, i), f = ls(t, r, a);
    if (!i && !a) {
      const h = xp(e, n, c, t, r, f);
      if (h) return h;
      n = c, r = f;
      continue;
    }
    if (i !== a) return i ? 1 : -1;
    const d = Sp(e, n, c, t, r, f);
    if (d) return d;
    n = c, r = f;
  }
  return Bi(e, n) - Bi(t, r);
}
function jr(e) {
  return e >= 48 && e <= 57;
}
function ls(e, t, n) {
  let r = t + 1;
  for (; r < e.length && jr(e.charCodeAt(r)) === n; ) r++;
  return r;
}
function xp(e, t, n, r, o, s) {
  const i = n - t, a = s - o, c = i < a ? i : a;
  for (let f = 0; f < c; f++) {
    const d = e.charCodeAt(t + f), h = r.charCodeAt(o + f);
    if (d > h) return 1;
    if (h > d) return -1;
  }
  return i > a ? 1 : a > i ? -1 : 0;
}
function Sp(e, t, n, r, o, s) {
  let i = t;
  for (; i < n && e.charCodeAt(i) === 48; ) i++;
  let a = o;
  for (; a < s && r.charCodeAt(a) === 48; ) a++;
  const c = n - i, f = s - a;
  if (c === 0 && f === 0) return 0;
  if (c <= 15 && f <= 15) {
    const w = Vi(e, i, n), y = Vi(r, a, s);
    return w > y ? 1 : y > w ? -1 : 0;
  }
  const d = parseInt(e.slice(t, n), 10), h = parseInt(r.slice(o, s), 10);
  return d > h ? 1 : h > d ? -1 : 0;
}
function Vi(e, t, n) {
  let r = 0;
  for (let o = t; o < n; o++) r = r * 10 + e.charCodeAt(o) - 48;
  return r;
}
function Bi(e, t) {
  let n = 0, r = t;
  for (; r < e.length; )
    n++, r = ls(e, r, jr(e.charCodeAt(r)));
  return n;
}
function Rp() {
  return [];
}
function Cp(e, t) {
  to(e, "cellSelection", Et(e.initialState.cellSelection) ?? Rp());
}
function Mp(e) {
  e.atoms.cellSelection && (e.options.autoResetAll ?? e.options.autoResetCellSelection ?? !0) && e._reactivity.schedule(() => Cp(e));
}
function Ip() {
  return le();
}
function Oa(e) {
  e.atoms.expanded && (e.options.autoResetAll ?? e.options.autoResetExpanded ?? !e.options.manualExpanding) && e._reactivity.schedule(() => Pa(e));
}
function Lr(e, t) {
  var n, r;
  (r = (n = e.options).onExpandedChange) == null || r.call(n, t);
}
function Da(e, t) {
  var r;
  const n = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t ?? !Ta(e)) {
    if (n === !0 || !ka(e)) return;
    Lr(e, !0);
  } else {
    if (n !== !0 && !Object.keys(n).length) return;
    Lr(e, le());
  }
}
function Pa(e, t) {
  const n = e.initialState.expanded;
  to(e, "expanded", t ? le() : n === !0 ? !0 : Object.assign(le(), Et(n ?? {})));
}
function ka(e) {
  return e.getPrePaginatedRowModel().flatRows.some((t) => Nt(t));
}
function Ep(e) {
  return (t) => {
    Da(e);
  };
}
function Ap(e) {
  var n;
  const t = ((n = e.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return t === !0 || Object.values(t).some(Boolean);
}
function Ta(e) {
  var r;
  const t = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t === !0) return !0;
  if (!Object.keys(t).length) return !1;
  const n = e.getRowModel().flatRows.filter((o) => Nt(o));
  return !(!n.length || n.some((o) => !ro(o)));
}
function Op(e) {
  var r;
  let t = 0;
  const n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return (n === !0 ? Object.values(e.getRowModel().rowsById).filter((o) => Nt(o)).map((o) => o.id) : Object.keys(n ?? {})).forEach((o) => {
    const s = o.split(".");
    t = Math.max(t, s.length);
  }), t;
}
function Fa(e, t) {
  var s;
  const n = ((s = e.table.atoms.expanded) == null ? void 0 : s.get()) ?? {}, r = n === !0 || as(n, e.id), o = t ?? !r;
  o !== r && (o && !Nt(e) || Lr(e.table, (i) => {
    const a = i === !0 ? !0 : as(i, e.id);
    let c = le();
    if (i === !0 ? Object.values(e.table.getRowModel().rowsById).forEach((f) => {
      Nt(f) && (c[f.id] = !0);
    }) : c = Object.assign(le(), i), !a && o)
      return c[e.id] = !0, c;
    if (a && !o) {
      const f = le(), d = Object.keys(c);
      for (let h = 0; h < d.length; h++) {
        const w = d[h];
        w !== e.id && c[w] && (f[w] = !0);
      }
      return f;
    }
    return i;
  }));
}
function ro(e) {
  var n, r, o;
  const t = ((n = e.table.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return !!(((o = (r = e.table.options).getIsRowExpanded) == null ? void 0 : o.call(r, e)) ?? (t === !0 || as(t, e.id)));
}
function as(e, t) {
  return !!(e && e !== !0 && un(e, t) && e[t]);
}
function Nt(e) {
  var t, n;
  return ((n = (t = e.table.options).getRowCanExpand) == null ? void 0 : n.call(t, e)) ?? ((e.table.options.enableExpanding ?? !0) && !!e.subRows.length);
}
function Dp(e) {
  let t = !0, n = e;
  for (; t && n.parentId; )
    n = e.table.getRow(n.parentId, !0), t = ro(n);
  return t;
}
function Pp(e) {
  const t = Nt(e);
  return () => {
    t && Fa(e);
  };
}
const cs = 0;
function Ha(e) {
  var t, n;
  if (e.options.autoResetAll ?? e.options.autoResetPageIndex ?? !e.options.manualPagination) {
    if ((((n = (t = e.atoms.pagination) == null ? void 0 : t.get()) == null ? void 0 : n.pageIndex) ?? cs) === cs) return;
    Fp(e);
  }
}
function kp(e, t) {
  to(e, "pagination", t);
}
function Tp(e, t) {
  kp(e, (n) => {
    let r = eo(t, n.pageIndex);
    const o = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
    return r = Math.max(0, Math.min(r, o)), {
      ...n,
      pageIndex: r
    };
  });
}
function Fp(e, t) {
  Tp(e, cs);
}
function Hp() {
  return [];
}
function oo(e, t) {
  to(e, "sorting", t);
}
function ja(e, t) {
  oo(e, t ? [] : Et(e.initialState.sorting ?? []));
}
function jp(e) {
  e.atoms.sorting && (e.options.autoResetAll ?? e.options.autoResetSorting ?? !1) && ja(e);
}
function La(e) {
  const t = e.table._rowModelFns.sortFns, n = e.table.getFilteredRowModel().flatRows.slice(0, 10);
  let r, o = !1;
  for (let s = 0; s < n.length; s++) {
    const i = n[s].getValue(e.id);
    if (Object.prototype.toString.call(i) === "[object Date]") {
      r = "datetime";
      break;
    }
    if (typeof i == "string" && (o = !0, i.split(wp).length > 1)) {
      r = "alphanumeric";
      break;
    }
  }
  if (!r && o && (r = "text"), r) {
    let s = t == null ? void 0 : t[r];
    if (s || r === "alphanumeric" && (s = t == null ? void 0 : t.text), s) return s;
  }
  return Ea;
}
function Ka(e) {
  const t = e.table.getFilteredRowModel().flatRows.slice(0, 10);
  for (let n = 0; n < t.length; n++) {
    const r = t[n].getValue(e.id);
    if (r != null)
      return typeof r == "string" ? "asc" : "desc";
  }
  return "desc";
}
function Va(e) {
  const t = e.table._rowModelFns.sortFns;
  return jd(e.columnDef.sortFn) ? e.columnDef.sortFn : e.columnDef.sortFn === "auto" ? La(e) : (t == null ? void 0 : t[e.columnDef.sortFn]) ?? Ea;
}
function Ba(e, t, n) {
  const r = $a(e, n && Kr(e)), o = typeof t < "u";
  oo(e.table, (s) => {
    const i = s.findIndex((w) => w.id === e.id), a = i === -1 ? void 0 : s[i];
    let c = [], f;
    const d = o ? t : r === "desc", h = !!(s.length && Kr(e) && n);
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
function Na(e) {
  return e.columnDef.sortDescFirst ?? e.table.options.sortDescFirst ?? Ka(e) === "desc" ? "desc" : "asc";
}
function $a(e, t) {
  const n = Na(e), r = Ua(e);
  return r ? r !== n && (e.table.options.enableSortingRemoval ?? !0) && (!t || (e.table.options.enableMultiRemove ?? !0)) ? !1 : r === "desc" ? "asc" : "desc" : n;
}
function Ps(e) {
  return (e.columnDef.enableSorting ?? !0) && (e.table.options.enableSorting ?? !0) && !!e.accessorFn;
}
function Kr(e) {
  return e.columnDef.enableMultiSort ?? e.table.options.enableMultiSort ?? !!e.accessorFn;
}
function Ua(e) {
  var n, r;
  const t = (r = (n = e.table.atoms.sorting) == null ? void 0 : n.get()) == null ? void 0 : r.find((o) => o.id === e.id);
  return t ? t.desc ? "desc" : "asc" : !1;
}
function Lp(e) {
  var t, n;
  return ((n = (t = e.table.atoms.sorting) == null ? void 0 : t.get()) == null ? void 0 : n.findIndex((r) => r.id === e.id)) ?? -1;
}
function Kp(e) {
  oo(e.table, (t) => t.length ? t.filter((n) => n.id !== e.id) : []);
}
function Vp(e) {
  const t = Ps(e);
  return (n) => {
    var r, o;
    t && Ba(e, void 0, Kr(e) ? (o = (r = e.table.options).isMultiSortEvent) == null ? void 0 : o.call(r, n) : !1);
  };
}
function Wa() {
  return (e) => Xn({
    feature: "coreRowModelsFeature",
    table: e,
    fnName: "table.getCoreRowModel",
    memoDeps: () => [e.options.data],
    fn: () => Bp(e, e.options.data),
    onAfterUpdate: ya(() => {
      Oa(e), Ha(e), jp(e), Mp(e);
    })
  });
}
function za(e, t, n, r = 0, o) {
  var i;
  const s = [];
  for (let a = 0; a < n.length; a++) {
    const c = n[a], f = mp(e, e.getRowId(c, a, o), c, a, r, void 0, o == null ? void 0 : o.id);
    t.flatRows.push(f), t.rowsById[f.id] = f, s.push(f), e.options.getSubRows && (f.originalSubRows = e.options.getSubRows(c, a), (i = f.originalSubRows) != null && i.length && (f.subRows = za(e, t, f.originalSubRows, r + 1, f)));
  }
  return s;
}
function Bp(e, t) {
  const n = {
    rows: [],
    flatRows: [],
    rowsById: le()
  };
  return n.rows = za(e, n, t), n;
}
function Np(e) {
  var t, n;
  return e._rowModels.coreRowModel || (e._rowModels.coreRowModel = ((n = (t = e.options.features).coreRowModel) == null ? void 0 : n.call(t, e)) ?? Wa()(e)), e._rowModels.coreRowModel();
}
function $p(e) {
  return e.getCoreRowModel();
}
function Up(e) {
  var t, n;
  return e._rowModels.filteredRowModel || (e._rowModels.filteredRowModel = (n = (t = e.options.features).filteredRowModel) == null ? void 0 : n.call(t, e)), e.options.manualFiltering || !e._rowModels.filteredRowModel ? e.getPreFilteredRowModel() : e._rowModels.filteredRowModel();
}
function Wp(e) {
  return e.getFilteredRowModel();
}
function zp(e) {
  var t, n;
  return e._rowModels.groupedRowModel || (e._rowModels.groupedRowModel = (n = (t = e.options.features).groupedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualGrouping || !e._rowModels.groupedRowModel ? e.getPreGroupedRowModel() : e._rowModels.groupedRowModel();
}
function qp(e) {
  return e.getGroupedRowModel();
}
function Gp(e) {
  var t, n;
  return e._rowModels.sortedRowModel || (e._rowModels.sortedRowModel = (n = (t = e.options.features).sortedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualSorting || !e._rowModels.sortedRowModel ? e.getPreSortedRowModel() : e._rowModels.sortedRowModel();
}
function Yp(e) {
  return e.getSortedRowModel();
}
function Xp(e) {
  var t, n;
  return e._rowModels.expandedRowModel || (e._rowModels.expandedRowModel = (n = (t = e.options.features).expandedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualExpanding || !e._rowModels.expandedRowModel ? e.getPreExpandedRowModel() : e._rowModels.expandedRowModel();
}
function Jp(e) {
  return e.getExpandedRowModel();
}
function Zp(e) {
  var t, n;
  return e._rowModels.paginatedRowModel || (e._rowModels.paginatedRowModel = (n = (t = e.options.features).paginatedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualPagination || !e._rowModels.paginatedRowModel ? e.getPrePaginatedRowModel() : e._rowModels.paginatedRowModel();
}
function Qp(e) {
  return e.getPaginatedRowModel();
}
const eg = { constructTableAPIs: (e) => {
  At("coreRowModelsFeature", e, {
    table_getCoreRowModel: { fn: () => Np(e) },
    table_getPreFilteredRowModel: { fn: () => $p(e) },
    table_getFilteredRowModel: { fn: () => Up(e) },
    table_getPreGroupedRowModel: { fn: () => Wp(e) },
    table_getGroupedRowModel: { fn: () => zp(e) },
    table_getPreSortedRowModel: { fn: () => qp(e) },
    table_getSortedRowModel: { fn: () => Gp(e) },
    table_getPreExpandedRowModel: { fn: () => Yp(e) },
    table_getExpandedRowModel: { fn: () => Xp(e) },
    table_getPrePaginatedRowModel: { fn: () => Jp(e) },
    table_getPaginatedRowModel: { fn: () => Zp(e) },
    table_getRowModel: { fn: () => Qp(e) }
  });
} };
function tg(e) {
  var t, n;
  if (!e._cellPrototype) {
    e._cellPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignCellPrototype) == null || n.call(t, e._cellPrototype, e);
  }
  return e._cellPrototype;
}
function ng(e, t, n) {
  const r = tg(n), o = Object.create(r);
  o.column = e, o.id = `${t.id}_${e.id}`, o.row = t;
  const s = n._cellInstanceInitFns;
  for (let i = 0; i < s.length; i++) s[i](o);
  return o;
}
function rg(e) {
  const t = e.table.getRowsInDisplayOrder(), n = e._displayIndexCache;
  return t[n] === e ? n : -1;
}
function og(e) {
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
function sg(e, t) {
  if (un(e._valuesCache, t)) return e._valuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return e._valuesCache[t] = n.accessorFn(e.original, e.index), e._valuesCache[t];
}
function ig(e, t) {
  if (un(e._uniqueValuesCache, t)) return e._uniqueValuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return n.columnDef.getUniqueValues ? (e._uniqueValuesCache[t] = n.columnDef.getUniqueValues(e.original, e.index), e._uniqueValuesCache[t]) : (e._uniqueValuesCache[t] = [e.getValue(t)], e._uniqueValuesCache[t]);
}
function lg(e, t) {
  return e.getValue(t) ?? e.table.options.renderFallbackValue;
}
function ag(e) {
  return Ld(e.subRows, (t) => t.subRows);
}
function cg(e) {
  const t = e.getCoreRowModel().flatRows;
  let n = 0;
  for (let r = 0; r < t.length; r++) n = Math.max(n, t[r].depth);
  return n;
}
function ug(e) {
  if (e.parentId)
    return e.table.getCoreRowModel().rowsById[e.parentId] ?? e.table.getRow(e.parentId, !0);
}
function fg(e) {
  const t = [];
  let n = e;
  for (; ; ) {
    const r = n.getParentRow();
    if (!r) break;
    t.push(r), n = r;
  }
  return t.reverse();
}
function dg(e) {
  const t = e.table.getAllLeafColumns();
  let n = e._cellsCache;
  n || (n = e._cellsCache = /* @__PURE__ */ new WeakMap());
  const r = new Array(t.length);
  for (let o = 0; o < t.length; o++) {
    const s = t[o];
    let i = n.get(s);
    i || (i = ng(s, e, e.table), n.set(s, i)), r[o] = i;
  }
  return r;
}
function pg(e) {
  const t = le(), n = e.getAllCells();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.column.id] = o;
  }
  return t;
}
function gg(e, t, n, r) {
  var o, s;
  return ((s = (o = t.options).getRowId) == null ? void 0 : s.call(o, e, n, r)) ?? (r ? `${r.id}.${n}` : String(n));
}
function hg(e, t, n) {
  let r = (n ? e.getPrePaginatedRowModel() : e.getRowModel()).rowsById[t];
  if (!r && (r = e.getCoreRowModel().rowsById[t], !r))
    throw new Error();
  return r;
}
const vg = {
  assignRowPrototype: (e, t) => {
    Wt("coreRowsFeature", e, t, {
      row_getDisplayIndex: { fn: (n) => rg(n) },
      row_getAllCellsByColumnId: {
        fn: (n) => pg(n),
        memoDeps: (n) => [n.getAllCells()]
      },
      row_getAllCells: {
        fn: (n) => dg(n),
        memoDeps: (n) => [n.table.getAllLeafColumns()]
      },
      row_getLeafRows: {
        fn: (n) => ag(n),
        memoDeps: (n) => [n.subRows]
      },
      row_getParentRow: { fn: (n) => ug(n) },
      row_getParentRows: { fn: (n) => fg(n) },
      row_getUniqueValues: { fn: (n, r) => ig(n, r) },
      row_getValue: { fn: (n, r) => sg(n, r) },
      row_renderValue: { fn: (n, r) => lg(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    At("coreRowsFeature", e, {
      table_getRowsInDisplayOrder: {
        fn: () => og(e),
        memoDeps: () => {
          var t;
          return [
            e.getPrePaginatedRowModel().rows,
            e.options.paginateExpandedRows,
            e.options.paginateExpandedRows === !1 ? (t = e.atoms.expanded) == null ? void 0 : t.get() : void 0
          ];
        }
      },
      table_getRowId: { fn: (t, n, r) => gg(t, e, n, r) },
      table_getRow: { fn: (t, n) => hg(e, t, n) },
      table_getMaxSubRowDepth: {
        fn: () => cg(e),
        memoDeps: () => [e.getCoreRowModel()]
      }
    });
  }
};
function qa(e, t, n = (r, o) => r === o) {
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
function mg(e, t, n = (r, o) => r === o) {
  e._reactivity.batch(() => {
    var r, o;
    qa(e, t, n), (o = (r = e._reactivity).commit) == null || o.call(r);
  });
}
function wg(e) {
  var r, o;
  const t = Et(e.initialState);
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
function yg(e, t) {
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
function bg(e, t, n) {
  const r = yg(e, eo(t, e.options));
  e.optionsStore ? e.optionsStore.set(() => r) : e.options = r, mg(e, r.state ?? null);
}
const _g = { constructTableAPIs: (e) => {
  At("coreTablesFeature", e, {
    table_reset: { fn: () => wg(e) },
    table_setOptions: { fn: (t) => bg(e, t) }
  });
} }, xg = {
  coreCellsFeature: $d,
  coreColumnsFeature: ap,
  coreHeadersFeature: hp,
  coreRowModelsFeature: eg,
  coreRowsFeature: vg,
  coreTablesFeature: _g
};
function Sg(e) {
  const t = e;
  return Object.defineProperty(e, "state", { get() {
    return e.get();
  } }), "set" in e && (t.setState = e.set.bind(e)), t;
}
function Rg(e, t) {
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
  const n = Ni(e);
  if (n.length !== Ni(t).length) return !1;
  for (let r = 0; r < n.length; r++) if (!Object.prototype.hasOwnProperty.call(t, n[r]) || !Object.is(e[n[r]], t[n[r]])) return !1;
  return !0;
}
function Ni(e) {
  return Object.keys(e).concat(Object.getOwnPropertySymbols(e));
}
function Cg(e, t = {}) {
  return Object.values(e).forEach((n) => {
    var r;
    t = ((r = n.getInitialState) == null ? void 0 : r.call(n, t)) ?? t;
  }), Et(t);
}
function Mg(e) {
  var U, de;
  const t = e.features.coreReactivityFeature, { aggregationFns: n, columnMeta: r, coreRowModel: o, expandedRowModel: s, facetedMinMaxValues: i, facetedRowModel: a, facetedUniqueValues: c, filterFns: f, filterMeta: d, filteredRowModel: h, groupedRowModel: w, paginatedRowModel: y, sortFns: E, sortedRowModel: I, tableMeta: H, ...A } = e.features, x = {
    _cellInstanceInitFns: [],
    _columnInstanceInitFns: [],
    _features: {
      ...xg,
      ...A
    },
    _headerGroupInstanceInitFns: [],
    _headerInstanceInitFns: [],
    _reactivity: t,
    _rowInstanceInitFns: [],
    _rowModelFns: {
      aggregationFns: n,
      filterFns: f,
      sortFns: E
    },
    _rowModels: {},
    atoms: {},
    baseAtoms: {}
  }, j = Object.values(x._features), M = {
    ...j.reduce(($, F) => {
      var Z;
      return Object.assign($, (Z = F.getDefaultTableOptions) == null ? void 0 : Z.call(F, x));
    }, {}),
    ...e
  };
  if (t.wrapExternalAtoms && M.atoms) for (const [$, F] of Object.entries(M.atoms)) {
    const Z = F, ue = t.createWritableAtom(Z.get(), { debugName: `externalAtom/${$}` });
    M.atoms[$] = ue;
    let Q = !1;
    const we = Z.subscribe((Fe) => {
      Q || ue.set(Fe);
    }), Te = ue.subscribe((Fe) => {
      Q = !0, Z.set(Fe), Q = !1;
    });
    t.addSubscription(we), t.addSubscription(Te);
  }
  t.createOptionsStore ? (x.optionsStore = t.createWritableAtom(M, { debugName: "table/optionsStore" }), Object.defineProperty(x, "options", {
    configurable: !0,
    enumerable: !0,
    get() {
      return x.optionsStore.get();
    },
    set($) {
      x.optionsStore.set(() => $);
    }
  })) : x.options = M, x.initialState = Cg(x._features, x.options.initialState);
  const B = Object.keys(x.initialState);
  for (let $ = 0; $ < B.length; $++) {
    const F = B[$];
    x.baseAtoms[F] = t.createWritableAtom(x.initialState[F], { debugName: `table/baseAtoms/${F}` }), x.atoms[F] = t.createReadonlyAtom(() => {
      var Te;
      const Z = x.options, ue = (Te = Z.atoms) == null ? void 0 : Te[F], Q = ue ? ue.get() : x.baseAtoms[F].get();
      if (ue) return Q;
      const we = Z.state;
      if (we && un(we, F)) {
        const Fe = we[F];
        return Fe === void 0 ? x.initialState[F] : Fe;
      }
      return Q;
    }, { debugName: `table/atoms/${F}` });
  }
  qa(x), x.store = Sg(t.createReadonlyAtom(() => {
    const $ = {};
    for (let F = 0; F < B.length; F++) {
      const Z = B[F];
      $[Z] = x.atoms[Z].get();
    }
    return $;
  }, {
    compare: Rg,
    debugName: "table/store"
  }));
  for (let $ = 0; $ < j.length; $++) {
    const F = j[$];
    (U = F.initTableInstanceData) == null || U.call(F, x), F.initCellInstanceData && x._cellInstanceInitFns.push(F.initCellInstanceData.bind(F)), F.initColumnInstanceData && x._columnInstanceInitFns.push(F.initColumnInstanceData.bind(F)), F.initHeaderGroupInstanceData && x._headerGroupInstanceInitFns.push(F.initHeaderGroupInstanceData.bind(F)), F.initHeaderInstanceData && x._headerInstanceInitFns.push(F.initHeaderInstanceData.bind(F)), F.initRowInstanceData && x._rowInstanceInitFns.push(F.initRowInstanceData.bind(F)), (de = F.constructTableAPIs) == null || de.call(F, x);
  }
  return x;
}
const Ig = {
  getInitialState: (e) => ({
    expanded: Ip(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onExpandedChange: Os("expanded", e),
    paginateExpandedRows: !0
  }),
  assignRowPrototype: (e, t) => {
    Wt("rowExpandingFeature", e, t, {
      row_toggleExpanded: { fn: (n, r) => Fa(n, r) },
      row_getIsExpanded: { fn: (n) => ro(n) },
      row_getCanExpand: { fn: (n) => Nt(n) },
      row_getIsAllParentsExpanded: { fn: (n) => Dp(n) },
      row_getToggleExpandedHandler: { fn: (n) => Pp(n) }
    });
  },
  constructTableAPIs: (e) => {
    At("rowExpandingFeature", e, {
      table_autoResetExpanded: { fn: () => Oa(e) },
      table_setExpanded: { fn: (t) => Lr(e, t) },
      table_toggleAllRowsExpanded: { fn: (t) => Da(e, t) },
      table_resetExpanded: { fn: (t) => Pa(e, t) },
      table_getCanSomeRowsExpand: { fn: () => ka(e) },
      table_getToggleAllRowsExpandedHandler: { fn: () => Ep(e) },
      table_getIsSomeRowsExpanded: { fn: () => Ap(e) },
      table_getIsAllRowsExpanded: { fn: () => Ta(e) },
      table_getExpandedDepth: { fn: () => Op(e) }
    });
  }
};
function Eg() {
  return le();
}
function dn(e, t) {
  var n, r;
  (r = (n = e.options).onRowSelectionChange) == null || r.call(n, t);
}
function Ag(e, t) {
  e._lastSelectedRowId = null, dn(e, t ? le() : Object.assign(le(), Et(e.initialState.rowSelection ?? {})));
}
function Ga(e, t, n) {
  e._lastSelectedRowId = null, dn(e, (r) => {
    if (t = typeof t < "u" ? t : !Re(e, "getIsAllRowsSelected", Ja), n != null && n.deselectAll && !t) return le();
    const o = Object.assign(le(), r), s = e.getPreGroupedRowModel().flatRows;
    if (t) {
      const i = /* @__PURE__ */ new Map();
      s.forEach((a) => {
        Vr(a, i) && (o[a.id] = !0);
      });
    } else s.forEach((i) => {
      ht(i) && delete o[i.id];
    });
    return o;
  });
}
function Ya(e, t, n) {
  e._lastSelectedRowId = null, dn(e, (r) => {
    const o = typeof t < "u" ? t : !Re(e, "getIsAllPageRowsSelected", Za);
    if (n != null && n.deselectAll && !o) return le();
    const s = Object.assign(le(), r);
    return e.getRowModel().rows.forEach((i) => {
      io(s, i.id, o, !0, e, !0);
    }), s;
  });
}
function Og(e) {
  return e.getCoreRowModel();
}
function Dg(e) {
  const t = e.getCoreRowModel();
  return Re(e, "getIsSomeRowsSelected", so) ? Fs(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: le()
  };
}
function Pg(e) {
  const t = e.getFilteredRowModel();
  return Re(e, "getIsSomeRowsSelected", so) ? Fs(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: le()
  };
}
function kg(e) {
  const t = e.getSortedRowModel();
  return Re(e, "getIsSomeRowsSelected", so) ? Fs(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: le()
  };
}
function Xa(e) {
  var t;
  return Object.keys(((t = e.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function Ja(e) {
  var o;
  const t = e.getFilteredRowModel().flatRows, n = ((o = e.atoms.rowSelection) == null ? void 0 : o.get()) ?? {};
  let r = !!(t.length && Object.keys(n).length);
  if (r) {
    const s = /* @__PURE__ */ new Map();
    t.some((i) => !Jn(i, n) && Vr(i, s)) && (r = !1);
  }
  return r;
}
function Za(e) {
  var s;
  const t = e.getPaginatedRowModel().flatRows, n = ((s = e.atoms.rowSelection) == null ? void 0 : s.get()) ?? {}, r = /* @__PURE__ */ new Map();
  let o = !1;
  for (let i = 0; i < t.length; i++) {
    const a = t[i];
    if (Jn(a, n))
      !o && Vr(a, r) && (o = !0);
    else if (Vr(a, r)) return !1;
  }
  return o;
}
function so(e) {
  return Re(e, "getSelectedRowIds", Xa).length > 0;
}
function Tg(e) {
  return e.getPaginatedRowModel().flatRows.filter((t) => ht(t)).some((t) => ks(t) || Re(t, "getIsSomeSelected", ec));
}
function Fg(e) {
  return (t) => {
    Ga(e, t.target.checked);
  };
}
function Hg(e) {
  return (t) => {
    Ya(e, t.target.checked);
  };
}
function Qa(e, t, n) {
  const r = ks(e);
  dn(e.table, (o) => {
    t = typeof t < "u" ? t : !r;
    const s = Object.assign(le(), o);
    return io(s, e.id, t, ((n == null ? void 0 : n.selectChildren) ?? !0) && Vt(e), e.table), !t && (n != null && n.deselectParents) && tc(s, e), s;
  });
}
function ks(e) {
  var t;
  return Jn(e, ((t = e.table.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function ec(e) {
  return Hs(e) === "some";
}
function jg(e) {
  return Hs(e) === "all";
}
function ht(e) {
  const t = e.table.options;
  return typeof t.enableRowSelection == "function" ? t.enableRowSelection(e) : t.enableRowSelection ?? !0;
}
function Ts(e) {
  const t = e.table.options;
  return typeof t.enableSubRowSelection == "function" ? t.enableSubRowSelection(e) : t.enableSubRowSelection ?? !0;
}
function Vt(e) {
  const t = e.table.options;
  return typeof t.enableMultiRowSelection == "function" ? t.enableMultiRowSelection(e) : t.enableMultiRowSelection ?? !0;
}
function Lg(e, t) {
  const n = ht(e);
  return (r) => {
    var c, f;
    if (!n) return;
    const o = r, s = e.table, i = o.target.checked, a = s._lastSelectedRowId;
    (!(s.options.enableRowRangeSelection !== !1 && a !== null && Vt(e) && (((f = (c = s.options).isRowRangeSelectionEvent) == null ? void 0 : f.call(c, r)) ?? !1)) || !Kg(e, a, i, t)) && Qa(e, i, t), s._lastSelectedRowId = e.id;
  };
}
function Kg(e, t, n, r) {
  const o = (r == null ? void 0 : r.selectChildren) ?? !0, s = e.table, i = s.getRowsInDisplayOrder(), a = s.getPrePaginatedRowModel().rowsById[t] ?? s.getCoreRowModel().rowsById[t];
  if (!a) return !1;
  const c = a.getDisplayIndex(), f = e.getDisplayIndex(), d = i[c], h = i[f];
  if (c < 0 || f < 0 || c >= i.length || f >= i.length || (d == null ? void 0 : d.id) !== a.id || (h == null ? void 0 : h.id) !== e.id || !Vt(a) || !Vt(e)) return !1;
  const w = Math.min(c, f), y = Math.max(c, f);
  return dn(s, (E) => {
    const I = Object.assign(le(), E);
    for (let H = w; H <= y; H++) {
      const A = i[H];
      !ht(A) || !Vt(A) || (io(I, A.id, n, o, s), !n && (r != null && r.deselectParents) && tc(I, A));
    }
    return I;
  }), !0;
}
function io(e, t, n, r, o, s) {
  const i = o.getRow(t, !0);
  n ? (Vt(i) || Object.keys(e).forEach((a) => delete e[a]), ht(i) && (e[t] = !0)) : (!s || ht(i)) && delete e[t], r && i.subRows.length && Ts(i) && i.subRows.forEach((a) => io(e, a.id, n, r, o, s));
}
function Vr(e, t) {
  if (!ht(e)) return !1;
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
    if (!Ts(d)) {
      a = !1;
      break;
    }
    c = d.parentId;
  }
  return i.forEach((f) => t.set(f, a)), a;
}
function tc(e, t) {
  const n = t.table.getCoreRowModel().rowsById;
  let r = t.parentId;
  for (; r !== void 0; )
    delete e[r], r = (n[r] ?? t.table.getRow(r, !0)).parentId;
}
function nc(e, t, n, r) {
  const o = [];
  for (let s = 0; s < e.length; s++) {
    const i = e[s], a = Jn(i, t);
    if (a && (n.push(i), r[i.id] = i), i.subRows.length) {
      const c = nc(i.subRows, t, n, r);
      if (a) {
        const f = Object.create(Object.getPrototypeOf(i));
        ma(f, i), f.subRows = c, o.push(f);
      }
    } else a && o.push(i);
  }
  return o;
}
function Fs(e, t) {
  var s;
  const n = [], r = le(), o = ((s = t.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  return {
    rows: nc(e.rows, o, n, r),
    flatRows: n,
    rowsById: r
  };
}
function Jn(e, t) {
  return !!(un(t, e.id) && t[e.id]);
}
function Hs(e) {
  var s;
  if (!e.subRows.length) return !1;
  const t = ((s = e.table.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  let n = !1, r = !0, o = !1;
  for (let i = 0; i < e.subRows.length; i++) {
    const a = e.subRows[i];
    if (n && !r) break;
    if (ht(a) && (o = !0, Jn(a, t) ? n = !0 : r = !1), a.subRows.length) {
      const c = Hs(a);
      c === "all" ? (n = !0, o = !0) : c === "some" ? (n = !0, r = !1, o = !0) : r = !1;
    }
  }
  return o ? r ? "all" : n ? "some" : !1 : !1;
}
const Vg = {
  initTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  resetTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  getInitialState: (e) => ({
    rowSelection: Eg(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onRowSelectionChange: Os("rowSelection", e),
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
    Wt("rowSelectionFeature", e, t, {
      row_toggleSelected: { fn: (n, r, o) => Qa(n, r, o) },
      row_getIsSelected: { fn: (n) => ks(n) },
      row_getIsSomeSelected: {
        fn: (n) => ec(n),
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
        fn: (n) => jg(n),
        memoDeps: (n) => {
          var r;
          return [
            n.subRows,
            (r = n.table.atoms.rowSelection) == null ? void 0 : r.get(),
            n.table.options.enableRowSelection
          ];
        }
      },
      row_getCanSelect: { fn: (n) => ht(n) },
      row_getCanSelectSubRows: { fn: (n) => Ts(n) },
      row_getCanMultiSelect: { fn: (n) => Vt(n) },
      row_getToggleSelectedHandler: { fn: (n, r) => Lg(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    At("rowSelectionFeature", e, {
      table_setRowSelection: { fn: (t) => dn(e, t) },
      table_resetRowSelection: { fn: (t) => Ag(e, t) },
      table_toggleAllRowsSelected: { fn: (t, n) => Ga(e, t, n) },
      table_toggleAllPageRowsSelected: { fn: (t, n) => Ya(e, t, n) },
      table_getPreSelectedRowModel: { fn: () => Og(e) },
      table_getSelectedRowModel: {
        fn: () => Dg(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getCoreRowModel()];
        }
      },
      table_getFilteredSelectedRowModel: {
        fn: () => Pg(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getFilteredRowModel()];
        }
      },
      table_getGroupedSelectedRowModel: {
        fn: () => kg(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getSortedRowModel()];
        }
      },
      table_getSelectedRowIds: {
        fn: () => Xa(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get()];
        }
      },
      table_getIsAllRowsSelected: {
        fn: () => Ja(e),
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
        fn: () => Za(e),
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
        fn: () => so(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get()];
        }
      },
      table_getIsSomePageRowsSelected: {
        fn: () => Tg(e),
        memoDeps: () => {
          var t;
          return [
            (t = e.atoms.rowSelection) == null ? void 0 : t.get(),
            e.getPaginatedRowModel(),
            e.options.enableRowSelection
          ];
        }
      },
      table_getToggleAllRowsSelectedHandler: { fn: () => Fg(e) },
      table_getToggleAllPageRowsSelectedHandler: { fn: () => Hg(e) }
    });
  }
}, Bg = {
  getInitialState(e) {
    return {
      sorting: Hp(),
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
      onSortingChange: Os("sorting", e),
      isMultiSortEvent: (t) => t.shiftKey
    };
  },
  assignColumnPrototype(e, t) {
    Wt("rowSortingFeature", e, t, {
      column_getAutoSortFn: { fn: (n) => La(n) },
      column_getAutoSortDir: { fn: (n) => Ka(n) },
      column_getSortFn: { fn: (n) => Va(n) },
      column_toggleSorting: { fn: (n, r, o) => Ba(n, r, o) },
      column_getFirstSortDir: { fn: (n) => Na(n) },
      column_getNextSortingOrder: { fn: (n, r) => $a(n, r) },
      column_getCanSort: { fn: (n) => Ps(n) },
      column_getCanMultiSort: { fn: (n) => Kr(n) },
      column_getIsSorted: { fn: (n) => Ua(n) },
      column_getSortIndex: { fn: (n) => Lp(n) },
      column_clearSorting: { fn: (n) => Kp(n) },
      column_getToggleSortingHandler: { fn: (n) => Vp(n) }
    });
  },
  constructTableAPIs(e) {
    At("rowSortingFeature", e, {
      table_setSorting: { fn: (t) => oo(e, t) },
      table_resetSorting: { fn: (t) => ja(e, t) }
    });
  }
};
function Ng() {
  return (e) => {
    const t = e;
    return Xn({
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
      fn: () => $g(t)
    });
  };
}
function $g(e) {
  var r;
  const t = e.getPreExpandedRowModel(), n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return !t.rows.length || n !== !0 && !Object.keys(n ?? {}).length || !e.options.paginateExpandedRows && !e.options.manualPagination ? t : Ug(t);
}
function Ug(e) {
  const t = [], n = (r) => {
    t.push(r), r.subRows.length && ro(r) && r.subRows.forEach(n);
  };
  return e.rows.forEach(n), {
    rows: t,
    flatRows: e.flatRows,
    rowsById: e.rowsById
  };
}
function Wg() {
  return (e) => {
    const t = e;
    return Xn({
      feature: "rowSortingFeature",
      table: t,
      fnName: "table.getSortedRowModel",
      memoDeps: () => {
        var n;
        return [(n = t.atoms.sorting) == null ? void 0 : n.get(), t.getPreSortedRowModel()];
      },
      fn: () => zg(t),
      onAfterUpdate: ya(() => Ha(t))
    });
  };
}
function zg(e) {
  var c;
  const t = e.getPreSortedRowModel(), n = (c = e.atoms.sorting) == null ? void 0 : c.get();
  if (!t.rows.length || !(n != null && n.length)) return t;
  const r = [], o = n.filter((f) => {
    const d = e.getColumn(f.id);
    return d ? Ps(d) : !1;
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
      sortFn: Va(h)
    });
  }
  const i = (f, d) => {
    for (let h = 0; h < s.length; h++) {
      const w = s[h], y = w.sortUndefined, E = w.desc;
      let I = 0;
      if (y) {
        const H = f.getValue(w.id), A = d.getValue(w.id), x = H === void 0, j = A === void 0;
        if (x && j) continue;
        if (x || j) {
          if (y === "first") return x ? -1 : 1;
          if (y === "last") return x ? 1 : -1;
          I = x ? y : -y;
        }
      }
      if (I === 0 && (I = w.sortFn(f, d, w.id)), I !== 0)
        return E && (I *= -1), w.invertSorting && (I *= -1), I;
    }
    return f.index - d.index;
  }, a = (f) => {
    const d = f.slice();
    d.sort(i);
    let h = !1;
    for (let w = 0; w < d.length; w++) {
      const y = d[w];
      y !== f[w] && (h = !0);
      const E = r.length;
      if (r.push(y), y.subRows.length) {
        const I = a(y.subRows);
        if (I.changed) {
          const H = Object.create(Object.getPrototypeOf(y));
          ma(H, y), H.subRows = I.rows, d[w] = H, r[E] = H, h = !0;
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
function $i(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = Lt(e[n]);
  return is(e, t);
}
function qg(e) {
  return Object.keys(e).map((t) => Lt(e[t]));
}
function Gg(e) {
  const t = (a, c) => {
    a.setOptions((f) => Hi(f, $i(c)));
  }, n = Td(), r = is(e, { features: {
    coreReactivityFeature: n,
    ...Lt(e.features) ?? {}
  } }), o = is($i(r), { mergeOptions: (a, c) => Hi(a, c) }), s = Mg(o), i = s;
  return wl() && yu(() => {
    var a;
    return (a = n.unmount) == null ? void 0 : a.call(n);
  }), be(() => qg(r), () => {
    t(s, r);
  }, { immediate: !0 }), be(() => {
    const a = Lt(e.state), c = Lt(e.atoms);
    if (!a) return [];
    const f = [];
    for (const d of Object.keys(i.initialState))
      !(d in a) || (c == null ? void 0 : c[d]) !== void 0 || f.push(a[d]);
    return f;
  }, (a) => {
    a.length > 0 && t(s, r);
  }, { immediate: !0 }), i.Subscribe = (a) => a.children(i.atoms), i;
}
function Wn(e) {
  "@babel/helpers - typeof";
  return Wn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Wn(e);
}
function Yg(e, t) {
  if (Wn(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Wn(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Xg(e) {
  var t = Yg(e, "string");
  return Wn(t) == "symbol" ? t : t + "";
}
function Zn(e, t, n) {
  return (t = Xg(t)) in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function Jg(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
    if (t.indexOf(r) !== -1) continue;
    n[r] = e[r];
  }
  return n;
}
function Zg(e, t) {
  if (e == null) return {};
  var n, r, o = Jg(e, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    for (r = 0; r < s.length; r++) n = s[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (o[n] = e[n]);
  }
  return o;
}
function rc(e, t) {
  var n = Object.keys(e), r = Object.keys(t);
  return n.length !== r.length ? !1 : n.every(function(o) {
    return Object.is(e[o], t[o]);
  });
}
function Qg() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : rc, t = null;
  return function(n) {
    return t && e(t.value, n) || (t = {
      value: n
    }), t.value;
  };
}
var eh = ["block"];
function Ui(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Wi(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ui(Object(n), !0).forEach(function(r) {
      Zn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ui(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function th(e) {
  return {
    x: (e.right + e.left) / 2,
    y: (e.bottom + e.top) / 2
  };
}
function Vo(e) {
  var t = e.client, n = e.borderBox, r = n.height / 4;
  return t.y <= n.top + r ? "reorder-above" : t.y >= n.bottom - r ? "reorder-below" : "make-child";
}
function nh(e) {
  var t = e.element, n = e.input, r = e.currentLevel, o = e.indentPerLevel, s = e.mode, i = {
    x: n.clientX,
    y: n.clientY
  }, a = t.getBoundingClientRect();
  if (s === "standard") {
    var c = Vo({
      borderBox: a,
      client: i
    });
    return {
      type: c,
      indentPerLevel: o,
      currentLevel: r
    };
  }
  var f = th(a);
  if (s === "expanded") {
    var d = Vo({
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
    type: Vo({
      borderBox: a,
      client: i
    }),
    indentPerLevel: o,
    currentLevel: r
  };
}
function oc(e, t) {
  return e.type !== t.type ? !1 : e.type === "instruction-blocked" && t.type === "instruction-blocked" ? oc(e.desired, t.desired) : rc(e, t);
}
var rh = Qg(oc);
function oh(e) {
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
function sh(e, t) {
  var n = t.block, r = Zg(t, eh), o = nh(r), s = oh({
    desired: o,
    block: n
  }), i = rh(s);
  return Wi(Wi({}, e), {}, Zn({}, sc, i));
}
function zi(e) {
  var t;
  return (t = e[sc]) !== null && t !== void 0 ? t : null;
}
var sc = Symbol("tree-item-instruction");
function lo() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return function() {
    t.forEach(function(o) {
      return o();
    });
  };
}
function ih(e) {
  if (Array.isArray(e)) return e;
}
function lh(e, t) {
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
function us(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function ic(e, t) {
  if (e) {
    if (typeof e == "string") return us(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? us(e, t) : void 0;
  }
}
function ah() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function lc(e, t) {
  return ih(e) || lh(e, t) || ic(e, t) || ah();
}
var qi = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, $t = {}, Qn = {};
Object.defineProperty(Qn, "__esModule", { value: !0 });
Qn.bind = void 0;
function ch(e, t) {
  var n = t.type, r = t.listener, o = t.options;
  return e.addEventListener(n, r, o), function() {
    e.removeEventListener(n, r, o);
  };
}
Qn.bind = ch;
var ao = {}, nn = qi && qi.__assign || function() {
  return nn = Object.assign || function(e) {
    for (var t, n = 1, r = arguments.length; n < r; n++) {
      t = arguments[n];
      for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    }
    return e;
  }, nn.apply(this, arguments);
};
Object.defineProperty(ao, "__esModule", { value: !0 });
ao.bindAll = void 0;
var uh = Qn;
function Gi(e) {
  if (!(typeof e > "u"))
    return typeof e == "boolean" ? {
      capture: e
    } : e;
}
function fh(e, t) {
  if (t == null)
    return e;
  var n = nn(nn({}, e), { options: nn(nn({}, Gi(t)), Gi(e.options)) });
  return n;
}
function dh(e, t, n) {
  var r = t.map(function(o) {
    var s = fh(o, n);
    return (0, uh.bind)(e, s);
  });
  return function() {
    r.forEach(function(s) {
      return s();
    });
  };
}
ao.bindAll = dh;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.bindAll = e.bind = void 0;
  var t = Qn;
  Object.defineProperty(e, "bind", { enumerable: !0, get: function() {
    return t.bind;
  } });
  var n = ao;
  Object.defineProperty(e, "bindAll", { enumerable: !0, get: function() {
    return n.bindAll;
  } });
})($t);
var ac = "data-pdnd-honey-pot";
function cc(e) {
  return e instanceof Element && e.hasAttribute(ac);
}
function uc(e) {
  var t = document.elementsFromPoint(e.x, e.y), n = lc(t, 2), r = n[0], o = n[1];
  return r ? cc(r) ? o ?? null : r : null;
}
var ph = 2147483647, gh = {
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
function zt(e) {
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
var Bo = zt(function() {
  return typeof HTMLElement < "u" && typeof HTMLElement.prototype.showPopover == "function";
});
function Yi(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Xi(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Yi(Object(n), !0).forEach(function(r) {
      Zn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Yi(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
var zn = 2, Ji = zn / 2;
function hh(e) {
  return {
    x: Math.floor(e.x),
    y: Math.floor(e.y)
  };
}
function vh(e) {
  return {
    x: e.x - Ji,
    y: e.y - Ji
  };
}
function mh(e) {
  return {
    x: Math.max(e.x, 0),
    y: Math.max(e.y, 0)
  };
}
function wh(e) {
  return {
    x: Math.min(e.x, window.innerWidth - zn),
    y: Math.min(e.y, window.innerHeight - zn)
  };
}
function Zi(e) {
  var t = e.client, n = wh(mh(vh(hh(t))));
  return DOMRect.fromRect({
    x: n.x,
    y: n.y,
    width: zn,
    height: zn
  });
}
function Qi(e) {
  var t = e.clientRect;
  return {
    left: "".concat(t.left, "px"),
    top: "".concat(t.top, "px"),
    width: "".concat(t.width, "px"),
    height: "".concat(t.height, "px")
  };
}
function yh(e) {
  var t = e.client, n = e.clientRect;
  return (
    // is within horizontal bounds
    t.x >= n.x && t.x <= n.x + n.width && // is within vertical bounds
    t.y >= n.y && t.y <= n.y + n.height
  );
}
function bh(e) {
  var t = e.initial, n = document.createElement("div");
  n.setAttribute(ac, "true"), Bo() && n.setAttribute("popover", "manual");
  var r = Zi({
    client: t
  });
  Object.assign(n.style, Xi(Xi({
    position: "fixed"
  }, Bo() ? (
    // needs to come first as it has 'inset: unset' which
    // needs to be overridden by our top / left values
    gh
  ) : {
    // Fallback: using maximum possible z-index so that this element
    // will always be on top of other positioned content.
    zIndex: ph
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
  }, Qi({
    clientRect: r
  }))), document.body.appendChild(n), Bo() && n.showPopover();
  var o = $t.bind(window, {
    type: "pointermove",
    listener: function(i) {
      var a = {
        x: i.clientX,
        y: i.clientY
      };
      r = Zi({
        client: a
      }), Object.assign(n.style, Qi({
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
    if (o(), yh({
      client: a,
      clientRect: r
    })) {
      n.remove();
      return;
    }
    function c() {
      f(), n.remove();
    }
    var f = $t.bindAll(window, [
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
function _h() {
  var e = null;
  function t() {
    return e = null, $t.bind(window, {
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
        r = bh({
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
function xh(e) {
  if (Array.isArray(e)) return us(e);
}
function Sh(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function Rh() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function fc(e) {
  return xh(e) || Sh(e) || ic(e) || Rh();
}
var Ch = zt(function() {
  return navigator.userAgent.includes("Firefox");
}), js = zt(function() {
  var t = navigator, n = t.userAgent;
  return n.includes("AppleWebKit") && !n.includes("Chrome");
});
function Mh(e) {
  return "nodeName" in e;
}
function Ih(e) {
  return Mh(e) && e.ownerDocument !== document;
}
var fs = {
  isLeavingWindow: Symbol("leaving"),
  isEnteringWindow: Symbol("entering")
};
(function() {
  if (typeof window > "u" || !js())
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
  $t.bindAll(
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
        !n.isOverWindow && n.enterCount === 0 && (s[fs.isEnteringWindow] = !0), n.isOverWindow = !0, n.enterCount++;
      }
    }, {
      type: "dragleave",
      listener: function(s) {
        n.enterCount--, n.isOverWindow && n.enterCount === 0 && (s[fs.isLeavingWindow] = !0, n.isOverWindow = !1);
      }
    }],
    // using `capture: true` so that adding event listeners
    // in bubble phase will have the correct symbols
    {
      capture: !0
    }
  );
})();
function Eh(e) {
  var t = e.dragLeave;
  return js() ? t.hasOwnProperty(fs.isLeavingWindow) : !1;
}
function Ah(e) {
  var t = e.dragLeave, n = t.type, r = t.relatedTarget;
  return n !== "dragleave" ? !1 : js() ? Eh({
    dragLeave: t
  }) : r == null ? !0 : Ch() ? Ih(r) : r instanceof HTMLIFrameElement;
}
function Oh(e) {
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
function Ln(e) {
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
var Dh = function(t) {
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
}, No = Dh(function(e) {
  return e();
}), Rr = /* @__PURE__ */ function() {
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
function Ph(e) {
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
      }), Rr.schedule(function() {
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
      Rr.flush(), No.cancel(), s({
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
      No(function() {
        Rr.flush();
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
      Rr.flush(), No.cancel(), s({
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
var ds = {
  isActive: !1
};
function dc() {
  return !ds.isActive;
}
function kh(e) {
  return e.dataTransfer ? e.dataTransfer.setDragImage.bind(e.dataTransfer) : null;
}
function Th(e) {
  var t = e.current, n = e.next;
  if (t.length !== n.length)
    return !0;
  for (var r = 0; r < t.length; r++)
    if (t[r].element !== n[r].element)
      return !0;
  return !1;
}
function Fh(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = e.dispatchEvent;
  if (!dc())
    return;
  var s = Hh({
    event: t,
    dragType: n,
    getDropTargetsOver: r
  });
  ds.isActive = !0;
  var i = {
    current: s
  };
  $o({
    event: t,
    current: s.dropTargets
  });
  var a = Ph({
    source: n.payload,
    dispatchEvent: o,
    initial: s
  });
  function c(y) {
    var E = Th({
      current: i.current.dropTargets,
      next: y.dropTargets
    });
    i.current = y, E && a.dragUpdate({
      current: i.current
    });
  }
  function f(y) {
    var E = Ln(y), I = cc(y.target) ? uc({
      x: E.clientX,
      y: E.clientY
    }) : y.target, H = r({
      target: I,
      input: E,
      source: n.payload,
      current: i.current.dropTargets
    });
    H.length && (y.preventDefault(), $o({
      event: y,
      current: H
    })), c({
      dropTargets: H,
      input: E
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
    ds.isActive = !1, w();
  }
  var w = $t.bindAll(
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
        f(E), a.drag({
          current: i.current
        });
      }
    }, {
      type: "dragenter",
      listener: f
    }, {
      type: "dragleave",
      listener: function(E) {
        Ah({
          dragLeave: E
        }) && (c({
          input: i.current.input,
          dropTargets: []
        }), n.startedFrom === "external" && d());
      }
    }, {
      // A "drop" can only happen if the browser allowed the drop
      type: "drop",
      listener: function(E) {
        if (i.current = {
          dropTargets: i.current.dropTargets,
          input: Ln(E)
        }, !i.current.dropTargets.length) {
          d();
          return;
        }
        E.preventDefault(), $o({
          event: E,
          current: i.current.dropTargets
        }), a.drop({
          current: i.current,
          // When dropping something native, we need to extract the latest
          // `.items` from the "drop" event as it is now accessible
          updatedSourcePayload: n.type === "external" ? n.getDropPayload(E) : null
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
      listener: function(E) {
        i.current = {
          dropTargets: i.current.dropTargets,
          input: Ln(E)
        }, d();
      }
    }].concat(fc(Oh({
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
    nativeSetDragImage: kh(t)
  });
}
function $o(e) {
  var t, n = e.event, r = e.current, o = (t = r[0]) === null || t === void 0 ? void 0 : t.dropEffect;
  o != null && n.dataTransfer && (n.dataTransfer.dropEffect = o);
}
function Hh(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = Ln(t);
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
var el = {
  canStart: dc,
  start: Fh
}, ps = /* @__PURE__ */ new Map();
function jh(e) {
  var t = e.typeKey, n = e.mount, r = ps.get(t);
  if (r)
    return r.usageCount++, r;
  var o = {
    typeKey: t,
    unmount: n(),
    usageCount: 1
  };
  return ps.set(t, o), o;
}
function Lh(e) {
  var t = jh(e);
  return function() {
    t.usageCount--, !(t.usageCount > 0) && (t.unmount(), ps.delete(e.typeKey));
  };
}
function pc(e, t) {
  var n = t.attribute, r = t.value;
  return e.setAttribute(n, r), function() {
    return e.removeAttribute(n);
  };
}
function tl(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function _t(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? tl(Object(n), !0).forEach(function(r) {
      Zn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : tl(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Uo(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = Kh(e)) || t) {
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
function Kh(e, t) {
  if (e) {
    if (typeof e == "string") return nl(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? nl(e, t) : void 0;
  }
}
function nl(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Wo(e) {
  return e.slice(0).reverse();
}
function Vh(e) {
  var t = e.typeKey, n = e.defaultDropEffect, r = /* @__PURE__ */ new WeakMap(), o = "data-drop-target-for-".concat(t), s = "[".concat(o, "]");
  function i(y) {
    return r.set(y.element, y), function() {
      return r.delete(y.element);
    };
  }
  function a(y) {
    var E = lo(pc(y.element, {
      attribute: o,
      value: "true"
    }), i(y));
    return zt(E);
  }
  function c(y) {
    var E, I, H, A, x = y.source, j = y.target, M = y.input, B = y.result, U = B === void 0 ? [] : B;
    if (j == null)
      return U;
    if (!(j instanceof Element))
      return j instanceof Node ? c({
        source: x,
        target: j.parentElement,
        input: M,
        result: U
      }) : U;
    var de = j.closest(s);
    if (de == null)
      return U;
    var $ = r.get(de);
    if ($ == null)
      return U;
    var F = {
      input: M,
      source: x,
      element: $.element
    };
    if ($.canDrop && !$.canDrop(F))
      return c({
        source: x,
        target: $.element.parentElement,
        input: M,
        result: U
      });
    var Z = (E = (I = $.getData) === null || I === void 0 ? void 0 : I.call($, F)) !== null && E !== void 0 ? E : {}, ue = (H = (A = $.getDropEffect) === null || A === void 0 ? void 0 : A.call($, F)) !== null && H !== void 0 ? H : n, Q = {
      data: Z,
      element: $.element,
      dropEffect: ue,
      // we are collecting _actual_ drop targets, so these are
      // being applied _not_ due to stickiness
      isActiveDueToStickiness: !1
    };
    return c({
      source: x,
      target: $.element.parentElement,
      input: M,
      // Using bubble ordering. Same ordering as `event.getPath()`
      result: [].concat(fc(U), [Q])
    });
  }
  function f(y) {
    var E = y.eventName, I = y.payload, H = Uo(I.location.current.dropTargets), A;
    try {
      for (H.s(); !(A = H.n()).done; ) {
        var x, j = A.value, M = r.get(j.element), B = _t(_t({}, I), {}, {
          self: j
        });
        M == null || (x = M[E]) === null || x === void 0 || x.call(
          M,
          // I cannot seem to get the types right here.
          // TS doesn't seem to like that one event can need `nativeSetDragImage`
          // @ts-expect-error
          B
        );
      }
    } catch (U) {
      H.e(U);
    } finally {
      H.f();
    }
  }
  var d = {
    onGenerateDragPreview: f,
    onDrag: f,
    onDragStart: f,
    onDrop: f,
    onDropTargetChange: function(E) {
      var I = E.payload, H = new Set(I.location.current.dropTargets.map(function(X) {
        return X.element;
      })), A = /* @__PURE__ */ new Set(), x = Uo(I.location.previous.dropTargets), j;
      try {
        for (x.s(); !(j = x.n()).done; ) {
          var M, B = j.value;
          A.add(B.element);
          var U = r.get(B.element), de = H.has(B.element), $ = _t(_t({}, I), {}, {
            self: B
          });
          if (U == null || (M = U.onDropTargetChange) === null || M === void 0 || M.call(U, $), !de) {
            var F;
            U == null || (F = U.onDragLeave) === null || F === void 0 || F.call(U, $);
          }
        }
      } catch (X) {
        x.e(X);
      } finally {
        x.f();
      }
      var Z = Uo(I.location.current.dropTargets), ue;
      try {
        for (Z.s(); !(ue = Z.n()).done; ) {
          var Q, we, Te = ue.value;
          if (!A.has(Te.element)) {
            var Fe = _t(_t({}, I), {}, {
              self: Te
            }), N = r.get(Te.element);
            N == null || (Q = N.onDropTargetChange) === null || Q === void 0 || Q.call(N, Fe), N == null || (we = N.onDragEnter) === null || we === void 0 || we.call(N, Fe);
          }
        }
      } catch (X) {
        Z.e(X);
      } finally {
        Z.f();
      }
    }
  };
  function h(y) {
    d[y.eventName](y);
  }
  function w(y) {
    var E = y.source, I = y.target, H = y.input, A = y.current, x = c({
      source: E,
      target: I,
      input: H
    });
    if (x.length >= A.length)
      return x;
    for (var j = Wo(A), M = Wo(x), B = [], U = 0; U < j.length; U++) {
      var de, $ = j[U], F = M[U];
      if (F != null) {
        B.push(F);
        continue;
      }
      var Z = B[U - 1], ue = j[U - 1];
      if ((Z == null ? void 0 : Z.element) !== (ue == null ? void 0 : ue.element))
        break;
      var Q = r.get($.element);
      if (!Q)
        break;
      var we = {
        input: H,
        source: E,
        element: Q.element
      };
      if (Q.canDrop && !Q.canDrop(we) || !((de = Q.getIsSticky) !== null && de !== void 0 && de.call(Q, we)))
        break;
      B.push(_t(_t({}, $), {}, {
        // making it clear to consumers this drop target is active due to stickiness
        isActiveDueToStickiness: !0
      }));
    }
    return Wo(B);
  }
  return {
    dropTargetForConsumers: a,
    getIsOver: w,
    dispatchEvent: h
  };
}
function Bh(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = Nh(e)) || t) {
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
function Nh(e, t) {
  if (e) {
    if (typeof e == "string") return rl(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? rl(e, t) : void 0;
  }
}
function rl(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function ol(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function $h(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ol(Object(n), !0).forEach(function(r) {
      Zn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ol(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Uh() {
  var e = /* @__PURE__ */ new Set(), t = null;
  function n(s) {
    t && (!s.canMonitor || s.canMonitor(t.canMonitorArgs)) && t.active.add(s);
  }
  function r(s) {
    var i = $h({}, s);
    e.add(i), n(i);
    function a() {
      e.delete(i), t && t.active.delete(i);
    }
    return zt(a);
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
      var c = Bh(e), f;
      try {
        for (c.s(); !(f = c.n()).done; ) {
          var d = f.value;
          n(d);
        }
      } catch (H) {
        c.e(H);
      } finally {
        c.f();
      }
    }
    if (t) {
      for (var h = Array.from(t.active), w = 0, y = h; w < y.length; w++) {
        var E = y[w];
        if (t.active.has(E)) {
          var I;
          (I = E[i]) === null || I === void 0 || I.call(E, a);
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
function Wh(e) {
  var t = e.typeKey, n = e.mount, r = e.dispatchEventToSource, o = e.onPostDispatch, s = e.defaultDropEffect, i = Uh(), a = Vh({
    typeKey: t,
    defaultDropEffect: s
  });
  function c(h) {
    r == null || r(h), a.dispatchEvent(h), i.dispatchEvent(h), o == null || o(h);
  }
  function f(h) {
    var w = h.event, y = h.dragType;
    el.start({
      event: w,
      dragType: y,
      getDropTargetsOver: a.getIsOver,
      dispatchEvent: c
    });
  }
  function d() {
    function h() {
      var w = {
        canStart: el.canStart,
        start: f
      };
      return n(w);
    }
    return Lh({
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
var zh = zt(function() {
  return navigator.userAgent.toLocaleLowerCase().includes("android");
}), qh = "pdnd:android-fallback", sl = "text/plain", Gh = "text/uri-list", Yh = "application/vnd.pdnd", Br = /* @__PURE__ */ new WeakMap();
function Xh(e) {
  return Br.set(e.element, e), function() {
    Br.delete(e.element);
  };
}
var il = _h(), gc = Wh({
  typeKey: "element",
  defaultDropEffect: "move",
  mount: function(t) {
    return lo(il.bindEvents(), $t.bind(document, {
      type: "dragstart",
      listener: function(r) {
        var o, s, i, a, c, f;
        if (t.canStart(r) && !r.defaultPrevented && r.dataTransfer) {
          var d = r.target;
          if (d instanceof HTMLElement) {
            var h = Br.get(d);
            if (h) {
              var w = Ln(r), y = {
                element: h.element,
                dragHandle: (o = h.dragHandle) !== null && o !== void 0 ? o : null,
                input: w
              };
              if (h.canDrag && !h.canDrag(y)) {
                r.preventDefault();
                return;
              }
              if (h.dragHandle) {
                var E = uc({
                  x: w.clientX,
                  y: w.clientY
                });
                if (!h.dragHandle.contains(E)) {
                  r.preventDefault();
                  return;
                }
              }
              var I = (s = (i = h.getInitialDataForExternal) === null || i === void 0 ? void 0 : i.call(h, y)) !== null && s !== void 0 ? s : null;
              if (I)
                for (var H = 0, A = Object.entries(I); H < A.length; H++) {
                  var x = lc(A[H], 2), j = x[0], M = x[1];
                  r.dataTransfer.setData(j, M ?? "");
                }
              zh() && !r.dataTransfer.types.includes(sl) && !r.dataTransfer.types.includes(Gh) && r.dataTransfer.setData(sl, qh), r.dataTransfer.setData(Yh, "");
              var B = {
                element: h.element,
                dragHandle: (a = h.dragHandle) !== null && a !== void 0 ? a : null,
                data: (c = (f = h.getInitialData) === null || f === void 0 ? void 0 : f.call(h, y)) !== null && c !== void 0 ? c : {}
              }, U = {
                type: "element",
                payload: B,
                startedFrom: "internal"
              };
              t.start({
                event: r,
                dragType: U
              });
            }
          }
        }
      }
    }));
  },
  dispatchEventToSource: function(t) {
    var n, r, o = t.eventName, s = t.payload;
    (n = Br.get(s.source.element)) === null || n === void 0 || (r = n[o]) === null || r === void 0 || r.call(
      n,
      // I cannot seem to get the types right here.
      // TS doesn't seem to like that one event can need `nativeSetDragImage`
      // @ts-expect-error
      s
    );
  },
  onPostDispatch: il.getOnPostDispatch()
}), Jh = gc.dropTarget;
function Zh(e) {
  var t = lo(
    // making the draggable register the adapter rather than drop targets
    // this is because you *must* have a draggable element to start a drag
    // but you _might_ not have any drop targets immediately
    // (You might create drop targets async)
    gc.registerUsage(),
    Xh(e),
    pc(e.element, {
      attribute: "draggable",
      value: "true"
    })
  );
  return zt(t);
}
const zo = /* @__PURE__ */ new Map(), ln = "pnl-tst-row";
function Qh(e, t) {
  return lo(
    Zh({
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
        return { type: ln, group: "", sourceId: "", key: null, keys: [] };
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
    Jh({
      element: e,
      // Position is deliberately not consulted here. pdnd settles `canDrop` when
      // the pointer enters the element, and the element is the whole layout, so an
      // answer given from the pointer's first position would stand for the rest of
      // the drag. Which pane the pointer is over, and whether that pane accepts
      // the drag at all, is decided in `getData`, which runs on every move.
      canDrop: ({ source: n }) => n.data.type === ln,
      getData: ({ input: n, source: r }) => {
        for (const o of t.panes) {
          const s = o.dropData(n, r.data);
          if (s) return s;
        }
        return { type: ln, key: null, paneId: "" };
      },
      onDrag: ({ self: n }) => {
        const r = n.data.key, o = zi(n.data);
        for (const s of t.panes)
          s.id() === n.data.paneId && r && o ? s.showDrop(r, o) : s.clearDrop();
      },
      onDragLeave: () => {
        for (const n of t.panes) n.clearDrop();
      },
      onDrop: ({ self: n, source: r, location: o }) => {
        for (const c of t.panes) c.clearDrop();
        const s = t.panes.find((c) => c.id() === n.data.paneId), i = n.data.key, a = zi(n.data);
        !s || !i || !a || a.type === "instruction-blocked" || s.drop(r.data, i, a, o.current.input);
      }
    })
  );
}
function ev(e, t) {
  let n = zo.get(e);
  return n || (n = { panes: [] }, n.cleanup = Qh(e, n), zo.set(e, n)), n.panes.push(t), () => {
    var r;
    n.panes = n.panes.filter((o) => o !== t), !(n.panes.length > 0) && ((r = n.cleanup) == null || r.call(n), zo.delete(e));
  };
}
const tv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ef5350" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m6 10h-4v8a4 4 0 1 1-4-4 3.96 3.96 0 0 1 2 .555V8h6Z"/></svg>', nv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#ff7043" d="M2 2a1 1 0 0 0-1 1v10c0 .554.446 1 1 1h12c.554 0 1-.446 1-1V3a1 1 0 0 0-1-1zm0 3h12v8H2zm1 2 2 2-2 2 1 1 3-3-3-3zm5 3.5V12h5v-1.5z"/></svg>', rv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#7e57c2" d="M20 18h-2v-2h-2v2c0 .193 0 .703 1.254 1.033A3.345 3.345 0 0 1 20 22h2v2h2v-2c0-.388-.562-.851-1.254-1.034C20.356 20.34 20 18.84 20 18m-3.254 2.966C14.356 20.34 14 18.84 14 18h-2v-2h-2v8h2v-2h4v2h2v-2c0-.388-.562-.851-1.254-1.034"/><path fill="#7e57c2" d="M24 4H4v20a4 4 0 0 0 4 4h16.16A3.84 3.84 0 0 0 28 24.16V8a4 4 0 0 0-4-4m2 14h-2v-2h-2v2c0 .193 0 .703 1.254 1.033A3.345 3.345 0 0 1 26 22v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1 2-2h2a2 2 0 0 1 2 2Z"/></svg>', ov = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ffca28" d="M16 24c-5.525 0-10-.9-10-2v4c0 1.1 4.475 2 10 2s10-.9 10-2v-4c0 1.1-4.475 2-10 2m0-8c-5.525 0-10-.9-10-2v4c0 1.1 4.475 2 10 2s10-.9 10-2v-4c0 1.1-4.475 2-10 2m0-12C10.477 4 6 4.895 6 6v4c0 1.1 4.475 2 10 2s10-.9 10-2V6c0-1.105-4.477-2-10-2"/></svg>', sv = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/><path fill="#42a5f5" d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5z"/></svg>', iv = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m8.668 6h3.6641l-3.6641-3.668v3.668m-4.668-4.668h5.332l4 4v8c0 0.73828-0.59375 1.3359-1.332 1.3359h-8c-0.73828 0-1.332-0.59766-1.332-1.3359v-10.664c0-0.74219 0.59375-1.3359 1.332-1.3359m3.332 1.3359h-3.332v10.664h8v-6h-4.668z" fill="#90a4ae" /></svg>', lv = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m6.922 3.768-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232" fill="#90a4ae" /></svg>', av = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.483 6H4.721a1 1 0 0 0-.949.684L2 12V5h12a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232l-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h11l2.403-5.606A1 1 0 0 0 14.483 6" fill="#90a4ae" /></svg>', cv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#e65100" d="m4 4 2 22 10 2 10-2 2-22Zm19.72 7H11.28l.29 3h11.86l-.802 9.335L15.99 25l-6.635-1.646L8.93 19h3.02l.19 2 3.86.77 3.84-.77.29-4H8.84L8 8h16Z"/></svg>', uv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#26a69a" d="M8.5 6h4l-4-4zM3.875 1H9.5l4 4v8.6c0 .773-.616 1.4-1.375 1.4h-8.25c-.76 0-1.375-.627-1.375-1.4V2.4c0-.777.612-1.4 1.375-1.4M4 13.6h8V8l-2.625 2.8L8 9.4zm1.25-7.7c-.76 0-1.375.627-1.375 1.4s.616 1.4 1.375 1.4c.76 0 1.375-.627 1.375-1.4S6.009 5.9 5.25 5.9"/></svg>', fv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#ffca28" d="M2 2v12h12V2zm6 6h1v4a1.003 1.003 0 0 1-1 1H7a1.003 1.003 0 0 1-1-1v-1h1v1h1zm3 0h2v1h-2v1h1a1.003 1.003 0 0 1 1 1v1a1.003 1.003 0 0 1-1 1h-2v-1h2v-1h-1a1.003 1.003 0 0 1-1-1V9a1.003 1.003 0 0 1 1-1"/></svg>', dv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path fill="#f9a825" d="M560-160v-80h120q17 0 28.5-11.5T720-280v-80q0-38 22-69t58-44v-14q-36-13-58-44t-22-69v-80q0-17-11.5-28.5T680-720H560v-80h120q50 0 85 35t35 85v80q0 17 11.5 28.5T840-560h40v160h-40q-17 0-28.5 11.5T800-360v80q0 50-35 85t-85 35zm-280 0q-50 0-85-35t-35-85v-80q0-17-11.5-28.5T120-400H80v-160h40q17 0 28.5-11.5T160-600v-80q0-50 35-85t85-35h120v80H280q-17 0-28.5 11.5T240-680v80q0 38-22 69t-58 44v14q36 13 58 44t22 69v80q0 17 11.5 28.5T280-240h120v80z"/></svg>', pv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#42a5f5" d="m14 10-4 3.5L6 10H4v12h4v-6l2 2 2-2v6h4V10zm12 6v-6h-4v6h-4l6 8 6-8z"/></svg>', gv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ef5350" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m4.93 10.44c.41.9.93 1.64 1.53 2.15l.41.32c-.87.16-2.07.44-3.34.93l-.11.04.5-1.04c.45-.87.78-1.66 1.01-2.4m6.48 3.81c.18-.18.27-.41.28-.66.03-.2-.02-.39-.12-.55-.29-.47-1.04-.69-2.28-.69l-1.29.07-.87-.58c-.63-.52-1.2-1.43-1.6-2.56l.04-.14c.33-1.33.64-2.94-.02-3.6a.85.85 0 0 0-.61-.24h-.24c-.37 0-.7.39-.79.77-.37 1.33-.15 2.06.22 3.27v.01c-.25.88-.57 1.9-1.08 2.93l-.96 1.8-.89.49c-1.2.75-1.77 1.59-1.88 2.12-.04.19-.02.36.05.54l.03.05.48.31.44.11c.81 0 1.73-.95 2.97-3.07l.18-.07c1.03-.33 2.31-.56 4.03-.75 1.03.51 2.24.74 3 .74.44 0 .74-.11.91-.3m-.41-.71.09.11c-.01.1-.04.11-.09.13h-.04l-.19.02c-.46 0-1.17-.19-1.9-.51.09-.1.13-.1.23-.1 1.4 0 1.8.25 1.9.35M7.83 17c-.65 1.19-1.24 1.85-1.69 2 .05-.38.5-1.04 1.21-1.69zm3.02-6.91c-.23-.9-.24-1.63-.07-2.05l.07-.12.15.05c.17.24.19.56.09 1.1l-.03.16-.16.82z"/></svg>', hv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#e64a19" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zM8 11v2h1v6H8v1h4v-1h-1v-2h2a3 3 0 0 0 3-3 3 3 0 0 0-3-3zm5 2a1 1 0 0 1 1 1 1 1 0 0 1-1 1h-2v-2z"/></svg>', vv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#0288d1" d="M9.86 2A2.86 2.86 0 0 0 7 4.86v1.68h4.29c.39 0 .71.57.71.96H4.86A2.86 2.86 0 0 0 2 10.36v3.781a2.86 2.86 0 0 0 2.86 2.86h1.18v-2.68a2.85 2.85 0 0 1 2.85-2.86h5.25c1.58 0 2.86-1.271 2.86-2.851V4.86A2.86 2.86 0 0 0 14.14 2zm-.72 1.61c.4 0 .72.12.72.71s-.32.891-.72.891c-.39 0-.71-.3-.71-.89s.32-.711.71-.711"/><path fill="#fdd835" d="M17.959 7v2.68a2.85 2.85 0 0 1-2.85 2.859H9.86A2.85 2.85 0 0 0 7 15.389v3.75a2.86 2.86 0 0 0 2.86 2.86h4.28A2.86 2.86 0 0 0 17 19.14v-1.68h-4.291c-.39 0-.709-.57-.709-.96h7.14A2.86 2.86 0 0 0 22 13.64V9.86A2.86 2.86 0 0 0 19.14 7zM8.32 11.513l-.004.004.038-.004zm6.54 7.276c.39 0 .71.3.71.89a.71.71 0 0 1-.71.71c-.4 0-.72-.12-.72-.71s.32-.89.72-.89"/></svg>', mv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#8bc34a" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zm4 7.5h-4v2h1l-2 1.67L10 13h1v-2H7v2h1l3 2.5L8 18H7v2h4v-2h-1l2-1.67L14 18h-1v2h4v-2h-1l-3-2.5 3-2.5h1z"/></svg>', wv = '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 16 16"><path fill="#0288d1" d="M2 2v12h12V2zm4 6h3v1H8v4H7V9H6zm5 0h2v1h-2v1h1a1.003 1.003 0 0 1 1 1v1a1.003 1.003 0 0 1-1 1h-2v-1h2v-1h-1a1.003 1.003 0 0 1-1-1V9a1.003 1.003 0 0 1 1-1"/></svg>', yv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ff9800" d="m24 6 2 6h-4l-2-6h-3l2 6h-4l-2-6h-3l2 6H8L6 6H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3V6Z"/></svg>', bv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#01579b" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zM7 13l1.5 7h2l1.5-3 1.5 3h2l1.5-7h1v-2h-4v2h1l-.9 4.2L13 15h-2l-1.1 2.2L9 13h1v-2H6v2z"/></svg>', _v = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#8bc34a" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m.12 13.5 3.74 3.74 1.42-1.41-2.33-2.33 2.33-2.33-1.42-1.41zm11.16 0-3.74-3.74-1.42 1.41 2.33 2.33-2.33 2.33 1.42 1.41z"/></svg>', xv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ff5252" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2m12 16v-2H9v2zm-4-4v-2H6v2z"/></svg>', Sv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#afb42b" d="M14 17h-2v-2h-2v-2h2v2h2m0-6h-2v2h2v2h-2v-2h-2V9h2V7h-2V5h2v2h2m5-4H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2"/></svg>', ll = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, al = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Rv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Cv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Ev = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Av = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Ov = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, kv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Tv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Fv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Hv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
}, $v = ["innerHTML"], Uv = ["value", "aria-label", "placeholder"], Wv = ["aria-label", "aria-keyshortcuts", "aria-disabled", "title", "tabindex", "onClick", "onFocus"], zv = ["innerHTML"], qv = {
  key: 1,
  class: "pnl-tst-empty"
}, Gv = ["aria-label", "aria-colcount", "aria-rowcount"], Yv = {
  key: 0,
  class: "pnl-tst-head",
  role: "rowgroup"
}, Xv = {
  class: "pnl-tst-hrow",
  role: "row",
  "aria-rowindex": 1
}, Jv = ["aria-colindex", "aria-sort", "tabindex", "onClick", "onFocus", "onKeydown"], Zv = { class: "pnl-tst-hlabel" }, Qv = ["innerHTML"], e0 = {
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
}, f0 = { class: "pnl-tst-dialog-actions" }, d0 = ["aria-label"], p0 = {
  key: 0,
  class: "pnl-tst-msep",
  role: "separator"
}, g0 = ["aria-keyshortcuts", "aria-disabled", "tabindex", "onClick", "onFocus"], h0 = ["innerHTML"], v0 = { class: "pnl-tst-mlabel" }, m0 = {
  key: 0,
  class: "pnl-tst-mkeys",
  "aria-hidden": "true"
}, w0 = "title", An = "search", xt = "|", en = 4, y0 = 500, b0 = {
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
    setSorting: { type: Function, required: !0 }
  },
  setup(e) {
    const t = e, n = {
      rowExpandingFeature: Ig,
      rowSelectionFeature: Vg,
      rowSortingFeature: Bg,
      coreRowModel: Wa(),
      expandedRowModel: Ng(),
      sortedRowModel: Wg(),
      sortFns: { alphanumeric: yp, text: bp }
    }, r = W(() => (t.state.columns || []).length > 0), o = W(() => r.value && t.state.options.sortable !== !1), s = W(() => t.state.options.sort_folders_first === !0), i = W(() => {
      const l = t.state.columns || [];
      return l.length === 0 ? [{ id: w0, header: "", accessorFn: (u) => u.title }] : l.map((u) => {
        const p = u.field ?? u.id;
        return {
          id: u.id,
          header: u.header ?? u.id,
          accessorFn: (m) => m[p],
          meta: { width: u.width },
          enableSorting: u.sortable !== !1,
          // Only set when asked for, so an ordinary table keeps TanStack's own
          // detection of what a column holds rather than routing through ours.
          ...s.value ? { sortFn: c } : {}
        };
      });
    });
    function a(l) {
      return l.subRows.length > 0 || l.original.allow_children !== !1;
    }
    function c(l, u, p) {
      const m = a(l);
      if (m !== a(u)) {
        const k = B.value.some((Y) => Y.id === p && Y.desc);
        return (m ? -1 : 1) * (k ? -1 : 1);
      }
      return F.getColumn(p).getAutoSortFn()(l, u, p);
    }
    const f = /* @__PURE__ */ fe(d(t.state.expandedKeys));
    function d(l) {
      const u = {};
      for (const p of l || []) u[p] = !0;
      return u;
    }
    function h(l) {
      return l === !0 ? F.getCoreRowModel().flatRows.filter((u) => u.subRows.length > 0).map((u) => u.id).sort() : Object.keys(l).filter((u) => l[u]).sort();
    }
    const w = {
      audio: tv,
      console: nv,
      css: rv,
      database: ov,
      document: sv,
      file: iv,
      folder: lv,
      "folder-open": av,
      html: cv,
      image: uv,
      javascript: fv,
      json: dv,
      markdown: pv,
      pdf: gv,
      powerpoint: hv,
      python: vv,
      table: mv,
      typescript: wv,
      video: yv,
      word: bv,
      xml: _v,
      yaml: xv,
      zip: Sv
    };
    function y(l) {
      return l ? { ...w, ...t.state.icons || {} }[l] ?? null : null;
    }
    function E(l) {
      const u = l.original.icon;
      return u ? (L(l) ? y(`${u}-open`) : null) ?? y(u) : null;
    }
    function I(l, u) {
      return l.length !== u.length ? !1 : l.every((p, m) => p === u[m]);
    }
    const H = W(() => t.state.options.select_mode ?? "none"), A = W(() => H.value !== "none"), x = W(() => H.value === "hierarchy"), j = W(
      () => A.value && t.state.options.show_checkboxes !== !1
    ), M = /* @__PURE__ */ fe(d(t.state.selectedKeys)), B = /* @__PURE__ */ fe(U(t.state.sorting));
    function U(l) {
      return (l || []).filter((u) => u && u.id).map((u) => ({ id: String(u.id), desc: u.desc === !0 }));
    }
    function de(l, u) {
      return l.length === u.length && l.every((p, m) => p.id === u[m].id && p.desc === u[m].desc);
    }
    const $ = W(() => o.value && B.value.length > 0), F = Gg({
      features: n,
      data: W(() => t.state.source || []),
      columns: i,
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
      enableRowSelection: A,
      enableMultiRowSelection: W(() => H.value !== "single"),
      enableSubRowSelection: x,
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
      state: W(() => ({
        expanded: f.value,
        rowSelection: M.value,
        sorting: B.value
      })),
      onExpandedChange: (l) => {
        f.value = typeof l == "function" ? l(f.value) : l;
      },
      onRowSelectionChange: (l) => {
        M.value = typeof l == "function" ? l(M.value) : l;
      },
      onSortingChange: (l) => {
        B.value = U(typeof l == "function" ? l(B.value) : l);
      }
    });
    function Z(l) {
      if (l.getIsSelected()) return "all";
      if (!x.value || l.subRows.length === 0) return "none";
      const u = l.subRows.map(Z);
      return u.every((p) => p === "all") ? "all" : u.some((p) => p !== "none") ? "some" : "none";
    }
    be(() => h(M.value), t.setSelectedKeys, { flush: "post" }), be(() => h(f.value), t.setExpandedKeys, { flush: "post" }), be(
      () => t.state.expandedKeys,
      (l) => {
        I(h(f.value), [...l || []].sort()) || (f.value = d(l));
      }
    ), be(
      () => t.state.selectedKeys,
      (l) => {
        I(h(M.value), [...l || []].sort()) || (M.value = d(l));
      }
    ), be(() => B.value, t.setSorting, { flush: "post" }), be(
      () => t.state.sorting,
      (l) => {
        const u = U(l);
        de(B.value, u) || (B.value = u);
      }
    ), be(
      () => [t.state.options.expand_all, t.state.source],
      ([l]) => {
        l && F.toggleAllRowsExpanded(!0);
      },
      { immediate: !0 }
    );
    const ue = W(() => (t.state.filterText ?? "").trim().toLowerCase()), Q = W(() => ue.value.length > 0), we = /* @__PURE__ */ fe(t.state.filterText ?? "");
    be(
      () => t.state.filterText,
      (l) => {
        we.value = l ?? "";
      }
    );
    function Te(l) {
      we.value = l, t.setFilterText(l);
    }
    function Fe(l) {
      return l.getAllCells().some((u) => String(u.getValue() ?? "").toLowerCase().includes(ue.value));
    }
    const N = W(() => {
      if (!Q.value) return F.getRowModel().rows;
      const l = F.getSortedRowModel().flatRows, u = /* @__PURE__ */ new Set();
      for (const p of l)
        if (Fe(p)) {
          u.add(p.id);
          for (let m = p.getParentRow(); m; m = m.getParentRow()) u.add(m.id);
        }
      return l.filter((p) => u.has(p.id));
    }), X = W(() => {
      var l;
      return ((l = F.getHeaderGroups()[0]) == null ? void 0 : l.headers) ?? [];
    }), re = W(() => t.state.options.indent_px ?? 16), rt = W(() => t.state.options.aria_label ?? "Tree table"), qt = W(() => Q.value ? "No matches" : "No data"), ot = W(() => r.value ? 2 : 1), Ve = W(() => N.value.length + (r.value ? 1 : 0)), mt = /* @__PURE__ */ fe(!1), Gt = /* @__PURE__ */ fe(null), pn = /* @__PURE__ */ new Map();
    function Ot(l, u) {
      u ? pn.set(l, u) : pn.delete(l);
    }
    const wt = W(() => {
      const l = X.value;
      return l.length === 0 ? null : l.some((p) => p.column.id === Gt.value) ? Gt.value : l[0].column.id;
    });
    function qe(l) {
      const u = X.value;
      if (u.length === 0) return;
      const p = u[Math.max(0, Math.min(l, u.length - 1))];
      mt.value = !0, Gt.value = p.column.id, Le(() => {
        var m;
        return (m = pn.get(p.column.id)) == null ? void 0 : m.focus();
      });
    }
    function er() {
      const l = X.value;
      qe(l.findIndex((u) => u.column.id === wt.value));
    }
    function Dt() {
      mt.value = !1, Le(() => {
        var l;
        return (l = ee.get(pe.value)) == null ? void 0 : l.focus();
      });
    }
    function gn(l) {
      return o.value && l.column.getCanSort();
    }
    function g(l) {
      if (!gn(l)) return;
      const u = l.column.getIsSorted();
      return u === "asc" ? "ascending" : u === "desc" ? "descending" : "none";
    }
    function v(l) {
      if (!gn(l)) return null;
      const u = l.column.getIsSorted();
      return u ? u === "asc" ? al : ll : null;
    }
    function b(l) {
      gn(l) && l.column.toggleSorting();
    }
    function C(l) {
      qe(X.value.indexOf(l)), b(l);
    }
    function R(l, u) {
      const p = X.value, m = Math.max(
        0,
        p.findIndex((k) => k.column.id === wt.value)
      );
      switch (u.key) {
        case "ArrowLeft":
          qe(m - 1);
          break;
        case "ArrowRight":
          qe(m + 1);
          break;
        case "Home":
          qe(0);
          break;
        case "End":
          qe(p.length - 1);
          break;
        case "ArrowDown":
          Dt();
          break;
        case "Enter":
        case " ":
          b(l);
          break;
        default:
          return;
      }
      u.preventDefault(), u.stopPropagation();
    }
    const S = W(() => {
      const l = /* @__PURE__ */ new Map();
      for (const u of N.value) {
        const p = u.parentId ?? "", m = l.get(p) ?? [];
        m.push(u.id), l.set(p, m);
      }
      return l;
    });
    function P(l) {
      return S.value.get(l.parentId ?? "") ?? [];
    }
    function D(l) {
      return P(l).indexOf(l.id) + 1;
    }
    function O(l) {
      return P(l).length;
    }
    function _(l) {
      return Q.value ? (S.value.get(l.id) ?? []).length > 0 : l.getCanExpand();
    }
    function L(l) {
      return Q.value ? _(l) : l.getIsExpanded();
    }
    function T(l) {
      var p;
      const u = (p = l.meta) == null ? void 0 : p.width;
      return u ? { flex: `0 0 ${u}px` } : { flex: "1 1 0" };
    }
    function K(l, u) {
      return { ...T(u), paddingInlineStart: `${l.depth * re.value}px` };
    }
    const V = /* @__PURE__ */ fe(null), G = /* @__PURE__ */ fe(!0), ee = /* @__PURE__ */ new Map();
    function J(l) {
      V.value = l, G.value = !0, mt.value = !1;
    }
    function ve(l, u) {
      u ? ee.set(l, u) : ee.delete(l);
    }
    const pe = W(() => {
      const l = N.value;
      return l.length === 0 ? null : l.some((u) => u.id === V.value) ? V.value : l[0].id;
    });
    function ge(l) {
      l != null && (J(l), Le(() => {
        var u;
        return (u = ee.get(l)) == null ? void 0 : u.focus();
      }));
    }
    function Ae(l) {
      const u = N.value;
      u.length !== 0 && ge(u[Math.max(0, Math.min(l, u.length - 1))].id);
    }
    function yt(l, u) {
      const p = N.value;
      if (p.length === 0) return;
      const m = p[Math.max(0, Math.min(l, p.length - 1))], k = (u == null ? void 0 : u.shiftKey) && A.value && H.value !== "single";
      k && he.value === null && (he.value = pe.value), ge(m.id), k && hn(m, !1);
    }
    function tr(l) {
      const u = N.value;
      if (u.length === 0) return;
      const p = Math.max(
        0,
        u.findIndex((Y) => Y.id === pe.value)
      ), m = u[p];
      if (l.ctrlKey || l.metaKey) {
        const Y = {
          a: "select-all",
          c: "copy",
          f: An,
          v: "paste",
          x: "cut",
          z: l.shiftKey ? "redo" : "undo"
        }[l.key.toLowerCase()];
        if (Y && or(Y)) {
          l.preventDefault(), fo(Y);
          return;
        }
      }
      if (l.altKey) {
        const Y = {
          ArrowUp: "move-up",
          ArrowDown: "move-down",
          ArrowLeft: "outdent",
          ArrowRight: "indent"
        }[l.key];
        if (Y && or(Y)) {
          l.preventDefault(), fo(Y);
          return;
        }
      }
      if (gr.value && (l.key === "ContextMenu" || l.key === "F10" && l.shiftKey)) {
        l.preventDefault(), Wc(m);
        return;
      }
      const k = {
        Insert: l.shiftKey ? "new-file" : "new-folder",
        F2: "rename",
        Delete: "delete",
        Escape: "clear-selection"
      }[l.key];
      if (k && or(k)) {
        l.preventDefault(), fo(k);
        return;
      }
      switch (l.key) {
        case "ArrowDown":
          l.preventDefault(), yt(p + 1, l);
          break;
        case "ArrowUp":
          l.preventDefault(), p === 0 && r.value && !l.shiftKey ? er() : yt(p - 1, l);
          break;
        case "ArrowRight":
          if (l.preventDefault(), !_(m)) break;
          L(m) ? Ae(p + 1) : (m.toggleExpanded(!0), ge(m.id));
          break;
        case "ArrowLeft":
          l.preventDefault(), !Q.value && m.getCanExpand() && m.getIsExpanded() ? (m.toggleExpanded(!1), ge(m.id)) : m.parentId && ge(m.parentId);
          break;
        case "Home":
          l.preventDefault(), Ae(0);
          break;
        case "End":
          l.preventDefault(), Ae(u.length - 1);
          break;
        case "Enter":
          l.preventDefault(), t.emitEvent("activate", { key: m.id });
          break;
        case " ":
          if (!A.value) break;
          l.preventDefault(), Bs(m);
          break;
      }
    }
    const he = /* @__PURE__ */ fe(null);
    function Oe(l) {
      he.value = l.id, M.value = {}, l.toggleSelected(!0, { selectChildren: !1 });
    }
    function hn(l, u) {
      const p = N.value, m = p.findIndex((Ce) => Ce.id === he.value), k = p.findIndex((Ce) => Ce.id === l.id);
      if (k === -1) return;
      if (m === -1) {
        Oe(l);
        return;
      }
      u || (M.value = {});
      const [Y, ye] = m <= k ? [m, k] : [k, m];
      for (let Ce = Y; Ce <= ye; Ce += 1)
        p[Ce].toggleSelected(!0, { selectChildren: !1 });
    }
    const nr = W(() => t.state.options.toggle_on_click === !0);
    function hc(l) {
      const u = h(M.value);
      return u.length === 1 && u[0] === l.id;
    }
    function Ls() {
      M.value = {}, he.value = null, G.value = !1;
    }
    function Ks() {
      h(M.value).length === 0 && (G.value = !1);
    }
    be(
      () => h(M.value).length > 0,
      (l) => {
        l && (G.value = !0);
      }
    );
    function vc(l, u) {
      J(l.id);
      const p = !!(u != null && u.shiftKey || u != null && u.ctrlKey || u != null && u.metaKey);
      A.value && !p && nr.value && hc(l) ? Ls() : A.value && H.value !== "single" ? u != null && u.shiftKey ? hn(l, u.ctrlKey || u.metaKey) : u != null && u.ctrlKey || u != null && u.metaKey ? (he.value = l.id, yc(l)) : Oe(l) : A.value && Oe(l), t.emitEvent("activate", { key: l.id });
    }
    function mc(l) {
      J(l.id), !Q.value && l.toggleExpanded();
    }
    function Vs(l) {
      return Z(l) === "all";
    }
    function wc(l) {
      return Z(l) === "some";
    }
    function yc(l) {
      J(l.id), l.toggleSelected(void 0, { selectChildren: !1 }), Ks();
    }
    function Bs(l) {
      J(l.id), l.toggleSelected(!Vs(l), {
        selectChildren: x.value,
        deselectParents: x.value
      }), Ks();
    }
    function bc(l) {
      Bs(l), ge(l.id);
    }
    const co = {
      "new-folder": { icon: Av, label: "New folder", keys: "Insert", node: {} },
      "new-file": {
        icon: Ev,
        label: "New file",
        keys: "Shift+Insert",
        node: { allow_children: !1 }
      },
      rename: { icon: Pv, label: "Rename", keys: "F2" },
      delete: { icon: Lv, label: "Delete", keys: "Delete" },
      undo: { icon: Kv, label: "Undo", keys: "Control+Z" },
      redo: { icon: kv, label: "Redo", keys: "Control+Shift+Z" },
      cut: { icon: Tv, label: "Cut", keys: "Control+X" },
      copy: { icon: Iv, label: "Copy", keys: "Control+C" },
      paste: { icon: Mv, label: "Paste", keys: "Control+V" },
      "move-up": { icon: al, label: "Move up", keys: "Alt+ArrowUp" },
      "move-down": { icon: ll, label: "Move down", keys: "Alt+ArrowDown" },
      outdent: { icon: Ov, label: "Outdent", keys: "Alt+ArrowLeft" },
      indent: { icon: Dv, label: "Indent", keys: "Alt+ArrowRight" },
      "expand-all": { icon: Rv, label: "Expand all" },
      "collapse-all": { icon: Cv, label: "Collapse all" },
      "select-all": { icon: jv, label: "Select all", keys: "Control+A" },
      "clear-selection": { icon: Hv, label: "Clear selection", keys: "Escape" }
    }, _c = [
      "undo",
      "redo",
      xt,
      "new-folder",
      "new-file",
      "rename",
      "delete",
      xt,
      "cut",
      "copy",
      "paste",
      xt,
      "move-up",
      "move-down",
      "outdent",
      "indent",
      xt,
      "expand-all",
      "collapse-all",
      xt,
      "select-all",
      "clear-selection",
      An
    ], xc = [
      "new-folder",
      "new-file",
      xt,
      "rename",
      "delete",
      xt,
      "cut",
      "copy",
      "paste"
    ];
    function Ns(l, u) {
      const p = l === !0 ? u : Array.isArray(l) ? l : [], m = [];
      return p.forEach((k, Y) => {
        const ye = typeof k == "string" ? {} : k || {}, Ce = typeof k == "string" ? k : ye.id, si = `${Ce}#${Y}`;
        if (Ce === xt || Ce === An) {
          m.push({ uid: si, id: Ce });
          return;
        }
        const Cn = co[Ce];
        if (!Cn) return;
        const ii = ye.label ?? Cn.label;
        m.push({
          uid: si,
          id: Ce,
          label: ii,
          icon: y(ye.icon) ?? Cn.icon,
          keys: Cn.keys,
          node: { title: ii, ...Cn.node ?? {}, ...ye.node ?? {} }
        });
      }), m;
    }
    const rr = W(() => Ns(t.state.options.toolbar, _c)), uo = W(
      () => Ns(t.state.options.menu, xc).filter((l) => l.id !== An)
    ), Sc = W(() => rr.value.length > 0), Rc = W(() => t.state.options.toolbar_label ?? "Tree actions"), $s = W(() => t.state.options.search_label ?? "Search");
    function Us(l) {
      return rr.value.find((u) => u.id === l) ?? uo.value.find((u) => u.id === l) ?? null;
    }
    function or(l) {
      return Us(l) !== null;
    }
    function fo(l) {
      const u = Us(l);
      u && mo(u);
    }
    const He = W(() => N.value.find((l) => l.id === pe.value) ?? null);
    function Cc(l) {
      return N.value.filter((u) => (u.parentId ?? "") === (l.parentId ?? ""));
    }
    function Ws() {
      const l = He.value;
      if (!l) return [];
      const u = ti(l), p = l.parentId ?? "";
      return u.every((k) => {
        var Y;
        return (((Y = Sn(k)) == null ? void 0 : Y.parentId) ?? "") === p;
      }) ? u : [l.id];
    }
    function po() {
      const l = He.value;
      if (!l) return [];
      if (!A.value || !l.getIsSelected()) return [l.id];
      const u = N.value.filter((p) => p.getIsSelected()).map((p) => p.id);
      return u.length > 0 ? u : [l.id];
    }
    const go = W(() => {
      var l;
      return ((l = t.state.clipboard) == null ? void 0 : l.keys) ?? [];
    }), Mc = W(() => {
      var u;
      const l = new Set(((u = t.state.clipboard) == null ? void 0 : u.mode) === "cut" ? go.value : []);
      return l.size === 0 || N.value.forEach((p) => {
        p.parentId && l.has(p.parentId) && l.add(p.id);
      }), l;
    });
    function vn(l) {
      const u = He.value;
      if (!u) return null;
      const p = new Set(Ws()), m = Cc(u), k = m.map((ye, Ce) => p.has(ye.id) ? Ce : -1).filter((ye) => ye >= 0);
      if (k.length === 0) return null;
      let Y = (l < 0 ? Math.min(...k) : Math.max(...k)) + l;
      for (; Y >= 0 && Y < m.length && p.has(m[Y].id); ) Y += l;
      return m[Y] ?? null;
    }
    let Ne = null;
    be(
      () => t.state.source,
      () => {
        const l = Ne;
        if (Ne = null, !!l) {
          if (l.key !== void 0) {
            ge(l.key);
            return;
          }
          Le(() => {
            l.index !== void 0 ? Ae(l.index) : l.pasted !== void 0 ? Ec(l.pasted) : Ic(l.added);
          });
        }
      }
    );
    function Ic(l) {
      const u = F.getCoreRowModel().flatRows.find((p) => !l.has(p.id));
      u && (ge(u.id), A.value && (M.value = {}, he.value = u.id, u.toggleSelected(!0, { selectChildren: !1 })), or("rename") && Le(() => lr(u.id, !0)));
    }
    function Ec(l) {
      const u = F.getCoreRowModel().flatRows.filter((k) => !l.has(k.id)), p = new Set(u.map((k) => k.id)), m = u.filter((k) => !p.has(k.parentId ?? ""));
      m.length !== 0 && (ge(m[0].id), A.value && (M.value = {}, he.value = m[0].id, m.forEach((k) => k.toggleSelected(!0, { selectChildren: !1 }))));
    }
    const Yt = /* @__PURE__ */ fe(null), sr = /* @__PURE__ */ fe(""), mn = /* @__PURE__ */ fe(null), st = /* @__PURE__ */ fe(null), ho = /* @__PURE__ */ fe(null), vo = /* @__PURE__ */ fe(null), Ac = W(() => t.state.options.extension_warning !== !1);
    function zs(l) {
      const u = String(l ?? ""), p = u.lastIndexOf(".");
      return p < 0 ? "" : u.slice(p + 1).toLowerCase();
    }
    function Oc(l, u) {
      return Ac.value && l.allow_children === !1 && zs(u) !== zs(l.title ?? "");
    }
    let ir = null;
    function lr(l, u = !1) {
      const p = Sn(l);
      p && (ir = u ? l : null, sr.value = p.original.title ?? "", Yt.value = l, t.setEditingKey(l), Le(() => {
        var m, k;
        (m = mn.value) == null || m.focus(), (k = mn.value) == null || k.select();
      }));
    }
    function ar() {
      ir = null, st.value = null, Yt.value = null, t.setEditingKey("");
    }
    function qs(l) {
      if (st.value || Yt.value !== l.id) return;
      const u = sr.value.trim(), p = u.length > 0 && u !== (l.original.title ?? "");
      if (p && ir !== l.id && Oc(l.original, u)) {
        st.value = { key: l.id, title: u, previous: l.original.title ?? l.id }, Le(() => {
          var m;
          return (m = vo.value) == null ? void 0 : m.focus();
        });
        return;
      }
      if (ar(), !p) {
        ge(l.id);
        return;
      }
      Ne = { key: l.id }, t.emitEvent("rename", { key: l.id, title: u });
    }
    function Gs() {
      const { key: l, title: u } = st.value;
      st.value = null, ar(), Ne = { key: l }, t.emitEvent("rename", { key: l, title: u });
    }
    function Ys() {
      st.value = null, Le(() => {
        var l, u;
        (l = mn.value) == null || l.focus(), (u = mn.value) == null || u.select();
      });
    }
    function Dc(l) {
      var m;
      const u = l.key;
      if (u === "Escape" || u === "n" || u === "N") {
        l.preventDefault(), Ys();
        return;
      }
      if (u === "y" || u === "Y") {
        l.preventDefault(), Gs();
        return;
      }
      if (u !== "Tab" && u !== "ArrowLeft" && u !== "ArrowRight") return;
      l.preventDefault(), (m = (l.target === ho.value ? vo : ho).value) == null || m.focus();
    }
    function Pc(l) {
      if (Yt.value !== l.id) return;
      const u = ir === l.id;
      if (ar(), !u) {
        ge(l.id);
        return;
      }
      Ne = { index: N.value.findIndex((p) => p.id === l.id) }, t.emitEvent("delete", { key: l.id, keys: [l.id] });
    }
    function kc(l, u) {
      u.key === "Enter" ? (u.preventDefault(), qs(l)) : u.key === "Escape" && (u.preventDefault(), Pc(l));
    }
    be(
      () => t.state.editingKey,
      (l) => {
        (l || "") !== (Yt.value || "") && (l ? lr(l) : ar());
      }
    ), Zo(() => {
      t.state.editingKey && lr(t.state.editingKey);
    });
    function cr(l, u) {
      const p = He.value;
      !p || !l || (Ne = { key: p.id }, t.emitEvent("move", {
        key: p.id,
        keys: Ws(),
        position: u,
        anchorKey: l.id
      }));
    }
    function Tc(l) {
      const u = He.value, p = u ? u.original.allow_children === !1 ? "after" : "child" : null;
      u && p === "child" && !Q.value && u.toggleExpanded(!0), Ne = { added: new Set(F.getCoreRowModel().flatRows.map((m) => m.id)) }, t.emitEvent("add", { anchorKey: (u == null ? void 0 : u.id) ?? null, position: p, node: l.node });
    }
    function Fc() {
      var u;
      const l = po();
      l.length !== 0 && (Ne = { index: N.value.findIndex((p) => {
        var m;
        return p.id === ((m = He.value) == null ? void 0 : m.id);
      }) }, t.emitEvent("delete", { key: ((u = He.value) == null ? void 0 : u.id) ?? null, keys: l }));
    }
    function Hc(l) {
      Ne = { index: N.value.findIndex((u) => {
        var p;
        return u.id === ((p = He.value) == null ? void 0 : p.id);
      }) }, t.emitEvent(l, {});
    }
    function jc(l) {
      var p;
      const u = po();
      u.length !== 0 && t.emitEvent(l, { key: ((p = He.value) == null ? void 0 : p.id) ?? null, keys: u });
    }
    function Lc() {
      var m;
      const l = He.value, u = l ? l.original.allow_children === !1 ? "after" : "child" : null;
      l && u === "child" && !Q.value && l.toggleExpanded(!0);
      const p = go.value;
      Ne = ((m = t.state.clipboard) == null ? void 0 : m.mode) === "cut" ? { key: p[0] } : { pasted: new Set(F.getCoreRowModel().flatRows.map((k) => k.id)) }, t.emitEvent("paste", { anchorKey: (l == null ? void 0 : l.id) ?? null, position: u });
    }
    function wn(l) {
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
          return po().length > 0;
        case "paste":
          return go.value.length > 0;
        case "undo":
          return t.state.canUndo === !0;
        case "redo":
          return t.state.canRedo === !0;
        case "move-up":
        case "move-down":
          return !$.value && vn(l.id === "move-up" ? -1 : 1) !== null;
        case "indent": {
          const p = vn(-1);
          return p !== null && p.original.allow_children !== !1;
        }
        case "outdent":
          return !!((u = He.value) != null && u.parentId);
        case "expand-all":
        case "collapse-all":
          return N.value.length > 0 && !Q.value;
        case "select-all":
          return N.value.length > 0 && A.value && H.value !== "single";
        case "clear-selection":
          return A.value && h(M.value).length > 0;
        default:
          return !0;
      }
    }
    function Xs(l) {
      return l.keys ? l.keys.replace("Control", "Ctrl") : "";
    }
    function Kc(l) {
      return l.keys ? `${l.label} (${Xs(l)})` : l.label;
    }
    function mo(l) {
      var u, p, m, k;
      if (wn(l))
        switch (l.id) {
          case "new-folder":
          case "new-file":
            Tc(l);
            break;
          case "rename":
            lr(He.value.id);
            break;
          case "delete":
            Fc();
            break;
          case "undo":
          case "redo":
            Hc(l.id);
            break;
          case "cut":
          case "copy":
            jc(l.id);
            break;
          case "paste":
            Lc();
            break;
          case "move-up":
            cr(vn(-1), "before");
            break;
          case "move-down":
            cr(vn(1), "after");
            break;
          case "indent": {
            const Y = vn(-1);
            Y && !Q.value && Y.toggleExpanded(!0), cr(Y, "child");
            break;
          }
          case "outdent":
            cr(Sn((u = He.value) == null ? void 0 : u.parentId), "after");
            break;
          case "expand-all":
            F.toggleAllRowsExpanded(!0);
            break;
          case "collapse-all":
            F.toggleAllRowsExpanded(!1);
            break;
          case "select-all":
            M.value = Object.fromEntries(N.value.map((Y) => [Y.id, !0])), he.value = ((p = N.value[0]) == null ? void 0 : p.id) ?? null;
            break;
          case "clear-selection":
            Ls();
            break;
          case An:
            (m = wo.value) == null || m.focus(), (k = wo.value) == null || k.select();
            break;
        }
    }
    const wo = /* @__PURE__ */ fe(null), yo = W(() => rr.value.filter((l) => l.id in co)), ur = /* @__PURE__ */ fe(null), bo = /* @__PURE__ */ new Map(), Js = W(() => {
      const l = yo.value;
      return l.length === 0 ? null : l.some((u) => u.uid === ur.value) ? ur.value : l[0].uid;
    });
    function Vc(l, u) {
      u ? bo.set(l, u) : bo.delete(l);
    }
    function fr(l) {
      const u = yo.value;
      if (u.length === 0) return;
      const p = u[Math.max(0, Math.min(l, u.length - 1))].uid;
      ur.value = p, Le(() => {
        var m;
        return (m = bo.get(p)) == null ? void 0 : m.focus();
      });
    }
    function Bc(l) {
      const u = yo.value, p = Math.max(
        0,
        u.findIndex((m) => m.uid === Js.value)
      );
      switch (l.key) {
        case "ArrowRight":
          l.preventDefault(), fr(p + 1);
          break;
        case "ArrowLeft":
          l.preventDefault(), fr(p - 1);
          break;
        case "Home":
          l.preventDefault(), fr(0);
          break;
        case "End":
          l.preventDefault(), fr(u.length - 1);
          break;
      }
    }
    const yn = /* @__PURE__ */ fe(!1), dr = /* @__PURE__ */ fe(null), bn = /* @__PURE__ */ fe({ left: 0, top: 0 }), pr = /* @__PURE__ */ fe(null), Xt = /* @__PURE__ */ fe(0), _o = /* @__PURE__ */ new Map(), _n = W(() => uo.value.filter((l) => l.id in co)), gr = W(() => _n.value.length > 0), Nc = W(() => t.state.options.menu_label ?? "Row actions");
    function $c(l, u) {
      u ? _o.set(l, u) : _o.delete(l);
    }
    function Zs(l) {
      return _n.value.findIndex((u) => u.uid === l.uid);
    }
    function Qs(l, u, p) {
      if (!gr.value) return;
      V.value !== l.id && J(l.id), dr.value = l.id, bn.value = { left: u, top: p };
      const m = _n.value.findIndex((k) => wn(k));
      Xt.value = Math.max(0, m), yn.value = !0, Le(zc);
    }
    function Uc(l, u) {
      gr.value && (u.preventDefault(), A.value && !l.getIsSelected() && Oe(l), Qs(l, u.clientX, u.clientY));
    }
    function Wc(l) {
      var p;
      const u = (p = ee.get(l.id)) == null ? void 0 : p.getBoundingClientRect();
      Qs(l, u ? u.left + re.value : en, u ? u.bottom : en);
    }
    function zc() {
      const l = pr.value;
      if (!l) return;
      const u = l.getBoundingClientRect();
      let { left: p, top: m } = bn.value;
      p + u.width > window.innerWidth - en && (p = Math.max(en, p - u.width)), m + u.height > window.innerHeight - en && (m = Math.max(en, m - u.height)), bn.value = { left: p, top: m }, xn(Xt.value);
    }
    function xn(l) {
      const u = _n.value;
      if (u.length === 0) return;
      const p = Math.max(0, Math.min(l, u.length - 1));
      Xt.value = p, Le(() => {
        var m;
        return (m = _o.get(u[p].uid)) == null ? void 0 : m.focus();
      });
    }
    function hr(l = !0, u = void 0) {
      if (!yn.value) return;
      const p = dr.value;
      yn.value = !1, dr.value = null, l && p != null && Le(() => {
        var m;
        return (m = ee.get(p)) == null ? void 0 : m.focus(u);
      });
    }
    function qc(l) {
      if (!wn(l)) return;
      const u = dr.value;
      hr(!1), ge(u), mo(l);
    }
    function Gc(l) {
      const u = Xt.value;
      switch (l.key) {
        case "ArrowDown":
          l.preventDefault(), xn(u + 1);
          break;
        case "ArrowUp":
          l.preventDefault(), xn(u - 1);
          break;
        case "Home":
          l.preventDefault(), xn(0);
          break;
        case "End":
          l.preventDefault(), xn(_n.value.length - 1);
          break;
        case "Escape":
        case "Tab":
          l.preventDefault(), hr();
          break;
      }
    }
    function xo(l) {
      pr.value && l.composedPath().includes(pr.value) || hr(!1);
    }
    function Jt() {
      hr(!0, { preventScroll: !0 });
    }
    be(yn, (l) => {
      l ? (document.addEventListener("pointerdown", xo, !0), window.addEventListener("resize", Jt), window.addEventListener("scroll", Jt, !0)) : (document.removeEventListener("pointerdown", xo, !0), window.removeEventListener("resize", Jt), window.removeEventListener("scroll", Jt, !0));
    }), Qo(() => {
      document.removeEventListener("pointerdown", xo, !0), window.removeEventListener("resize", Jt), window.removeEventListener("scroll", Jt, !0);
    });
    const Yc = ["reorder-above", "reorder-below", "make-child", "reparent"], So = W(() => t.state.options.enable_dnd === !0), Ro = W(() => String(t.state.options.transfer_group || "")), Zt = W(() => String(t.state.tableId || "")), ei = /* @__PURE__ */ fe([]), vr = /* @__PURE__ */ fe(null);
    function Sn(l) {
      return N.value.find((u) => u.id === l) ?? null;
    }
    function Xc(l, u) {
      let p = l;
      for (; p; ) {
        if (u.includes(p.id)) return !0;
        p = p.getParentRow();
      }
      return !1;
    }
    function ti(l) {
      if (!A.value || !l.getIsSelected()) return [l.id];
      const u = /* @__PURE__ */ new Set();
      for (let m = l.getParentRow(); m; m = m.getParentRow()) u.add(m.id);
      const p = N.value.filter((m) => m.getIsSelected() && !u.has(m.id)).map((m) => m.id);
      return p.length > 1 ? p : [l.id];
    }
    function Jc(l, u, p) {
      if (!p && Xc(l, u)) return Yc;
      const m = $.value ? ["reorder-above", "reorder-below"] : [];
      return l.original.allow_children === !1 && m.push("make-child"), m;
    }
    function Zc(l) {
      if (_(l) && L(l)) return "expanded";
      const u = P(l);
      return u[u.length - 1] === l.id ? "last-in-group" : "standard";
    }
    let Co = null, Rn = null;
    function Mo() {
      Rn && clearTimeout(Rn), Rn = null, Co = null;
    }
    function Qc(l, u) {
      if (Co === l || (Mo(), !u || u.type === "instruction-blocked")) return;
      const p = Sn(l);
      !p || !p.getCanExpand() || p.getIsExpanded() || (Co = l, Rn = setTimeout(() => {
        Rn = null;
        const m = Sn(l);
        m && m.getCanExpand() && !m.getIsExpanded() && m.toggleExpanded(!0);
      }, y0));
    }
    function eu() {
      vr.value = null, Mo();
    }
    const ni = /* @__PURE__ */ fe(null);
    function tu() {
      let l = ni.value;
      if (!l) return null;
      let u = l.getRootNode();
      for (; u.host; )
        l = u.host, u = l.getRootNode();
      return l;
    }
    function mr(l) {
      for (const u of N.value) {
        const p = ee.get(u.id);
        if (!p) continue;
        const m = p.getBoundingClientRect();
        if (l.clientX >= m.left && l.clientX < m.right && l.clientY >= m.top && l.clientY < m.bottom)
          return { row: u, element: p, rect: m };
      }
      return null;
    }
    function nu(l, u) {
      const p = ".pnl-tst-check, .pnl-tst-twisty, .pnl-tst-edit";
      for (const m of l.element.querySelectorAll(p)) {
        const k = m.getBoundingClientRect();
        if (u.clientX >= k.left && u.clientX < k.right && u.clientY >= k.top && u.clientY < k.bottom)
          return !0;
      }
      return !1;
    }
    const ru = {
      id: () => Zt.value,
      // Anything outside a row (the header, the empty space below the last row) is
      // not a drag handle, and neither is a row control.
      canDragFrom(l) {
        const u = mr(l);
        return u !== null && !nu(u, l);
      },
      dragData(l) {
        const u = mr(l);
        return u ? {
          type: ln,
          group: Ro.value,
          sourceId: Zt.value,
          key: u.row.id,
          keys: ti(u.row)
        } : null;
      },
      // The registered element is the host, so the default preview would be a
      // snapshot of the whole layout. Point it at the row being dragged, offset so
      // the preview stays under the cursor where it was grabbed.
      preview(l, u) {
        const p = mr(l);
        return p ? (u(p.element, l.clientX - p.rect.left, l.clientY - p.rect.top), !0) : !1;
      },
      setDragging(l) {
        ei.value = l;
      },
      // Our own rows always. Another pane's only when both name the same group, so a
      // table that opted into nothing shows no drop state at all rather than
      // accepting a drag Python is bound to reject.
      dropData(l, u) {
        const p = mr(l);
        if (!p) return null;
        const m = u.sourceId !== Zt.value;
        if (m && !(Ro.value && u.group === Ro.value))
          return { type: ln, key: null, paneId: Zt.value };
        const k = { type: ln, key: p.row.id, paneId: Zt.value };
        return sh(k, {
          element: p.element,
          input: l,
          currentLevel: p.row.depth,
          indentPerLevel: re.value,
          mode: Zc(p.row),
          block: Jc(p.row, u.keys ?? [], m)
        });
      },
      showDrop(l, u) {
        vr.value = { key: l, instruction: u }, Qc(l, u);
      },
      clearDrop: eu,
      drop(l, u, p, m) {
        const k = l.keys ?? [];
        if (k.length === 0) return;
        const Y = {
          targetKey: u,
          instruction: p.type,
          desiredLevel: p.desiredLevel ?? p.currentLevel
        };
        if (l.sourceId === Zt.value) {
          if (k.includes(u)) return;
          t.emitEvent("move", { key: l.key, keys: k, ...Y });
          return;
        }
        Ne = { pasted: new Set(F.getCoreRowModel().flatRows.map((ye) => ye.id)) }, t.emitEvent("transfer", {
          keys: k,
          sourceId: l.sourceId,
          copy: !!(m != null && m.ctrlKey || m != null && m.altKey),
          ...Y
        });
      }
    };
    let bt = null;
    function ri() {
      bt == null || bt(), bt = null;
      const l = tu();
      !l || !So.value || (bt = ev(l, ru));
    }
    Zo(ri), be(So, ri), Qo(() => {
      Mo(), bt == null || bt();
    });
    function Io(l) {
      var u;
      return ((u = vr.value) == null ? void 0 : u.key) === l.id ? vr.value.instruction : null;
    }
    function ou(l) {
      const u = Io(l);
      return {
        "pnl-tst-row--draggable": So.value,
        "pnl-tst-row--dragging": ei.value.includes(l.id),
        "pnl-tst-row--blocked": (u == null ? void 0 : u.type) === "instruction-blocked",
        "pnl-tst-row--child-target": (u == null ? void 0 : u.type) === "make-child"
      };
    }
    function oi(l) {
      const u = Io(l);
      return u ? u.type === "reorder-above" ? "pnl-tst-dropline--above" : u.type === "reorder-below" || u.type === "reparent" ? "pnl-tst-dropline--below" : null : null;
    }
    function su(l) {
      const u = Io(l);
      return u ? { insetInlineStart: `${(u.type === "reparent" ? u.desiredLevel : u.currentLevel) * u.indentPerLevel}px` } : null;
    }
    return (l, u) => (te(), ne("div", {
      ref_key: "rootElement",
      ref: ni,
      class: "pnl-tst"
    }, [
      Sc.value ? (te(), ne("div", {
        key: 0,
        class: "pnl-tst-toolbar",
        role: "toolbar",
        "aria-orientation": "horizontal",
        "aria-label": Rc.value
      }, [
        (te(!0), ne(Se, null, In(rr.value, (p) => (te(), ne(Se, {
          key: p.uid
        }, [
          p.id === "|" ? (te(), ne("span", Bv)) : p.id === "search" ? (te(), ne("label", Nv, [
            _e("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: Lt(Fv)
            }, null, 8, $v),
            _e("input", {
              ref_for: !0,
              ref: (m) => wo.value = m,
              type: "search",
              value: we.value,
              "aria-label": $s.value,
              placeholder: $s.value,
              onInput: u[0] || (u[0] = (m) => Te(m.target.value))
            }, null, 40, Uv)
          ])) : (te(), ne("button", {
            key: 2,
            ref_for: !0,
            ref: (m) => Vc(p.uid, m),
            type: "button",
            class: "pnl-tst-tbtn",
            "aria-label": p.label,
            "aria-keyshortcuts": p.keys,
            "aria-disabled": !wn(p),
            title: Kc(p),
            tabindex: p.uid === Js.value ? 0 : -1,
            onClick: (m) => mo(p),
            onFocus: (m) => ur.value = p.uid,
            onKeydown: Bc
          }, [
            _e("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: p.icon
            }, null, 8, zv)
          ], 40, Wv))
        ], 64))), 128))
      ], 8, Vv)) : Ge("", !0),
      N.value.length === 0 ? (te(), ne("div", qv, St(qt.value), 1)) : (te(), ne("div", {
        key: 2,
        class: "pnl-tst-grid",
        role: "treegrid",
        "aria-label": rt.value,
        "aria-colcount": X.value.length,
        "aria-rowcount": Ve.value,
        onKeydown: tr
      }, [
        r.value ? (te(), ne("div", Yv, [
          _e("div", Xv, [
            (te(!0), ne(Se, null, In(X.value, (p, m) => (te(), ne("div", {
              key: p.id,
              ref_for: !0,
              ref: (k) => Ot(p.column.id, k),
              class: Ct(["pnl-tst-hcell", { "pnl-tst-hcell--sortable": gn(p) }]),
              role: "columnheader",
              "aria-colindex": m + 1,
              "aria-sort": g(p),
              tabindex: mt.value && p.column.id === wt.value ? 0 : -1,
              style: Ft(T(p.column.columnDef)),
              onClick: (k) => C(p),
              onFocus: (k) => Gt.value = p.column.id,
              onKeydown: (k) => R(p, k)
            }, [
              _e("span", Zv, St(p.column.columnDef.header), 1),
              v(p) ? (te(), ne("span", {
                key: 0,
                class: "pnl-tst-sortind",
                "aria-hidden": "true",
                innerHTML: v(p)
              }, null, 8, Qv)) : Ge("", !0)
            ], 46, Jv))), 128))
          ])
        ])) : Ge("", !0),
        _e("div", e0, [
          (te(!0), ne(Se, null, In(N.value, (p, m) => (te(), ne("div", {
            key: p.id,
            ref_for: !0,
            ref: (k) => ve(p.id, k),
            class: Ct(["pnl-tst-row", [
              ou(p),
              {
                "pnl-tst-row--active": G.value && p.id === V.value,
                "pnl-tst-row--quiet": !G.value && p.id === V.value,
                "pnl-tst-row--cut": Mc.value.has(p.id)
              }
            ]]),
            role: "row",
            "aria-level": p.depth + 1,
            "aria-posinset": D(p),
            "aria-setsize": O(p),
            "aria-rowindex": m + ot.value,
            "aria-expanded": _(p) ? L(p) : void 0,
            "aria-selected": A.value ? p.getIsSelected() : void 0,
            "aria-haspopup": gr.value ? "menu" : void 0,
            tabindex: !mt.value && p.id === pe.value ? 0 : -1,
            onClick: (k) => vc(p, k),
            onContextmenu: (k) => Uc(p, k),
            onFocus: (k) => J(p.id)
          }, [
            oi(p) ? (te(), ne("span", {
              key: 0,
              class: Ct(["pnl-tst-dropline", oi(p)]),
              style: Ft(su(p)),
              "aria-hidden": "true"
            }, null, 6)) : Ge("", !0),
            (te(!0), ne(Se, null, In(p.getAllCells(), (k, Y) => (te(), ne("div", {
              key: k.id,
              class: Ct(["pnl-tst-cell", { "pnl-tst-cell--tree": Y === 0 }]),
              role: "gridcell",
              "aria-colindex": Y + 1,
              style: Ft(
                Y === 0 ? K(p, k.column.columnDef) : T(k.column.columnDef)
              )
            }, [
              Y === 0 ? (te(), ne(Se, { key: 0 }, [
                _(p) ? (te(), ne("span", {
                  key: 0,
                  class: Ct(["pnl-tst-twisty", { "pnl-tst-twisty--open": L(p) }]),
                  "aria-hidden": "true",
                  onClick: xr((ye) => mc(p), ["stop"])
                }, [...u[3] || (u[3] = [
                  _e("svg", {
                    viewBox: "0 0 16 16",
                    width: "12",
                    height: "12",
                    focusable: "false"
                  }, [
                    _e("path", {
                      d: "M6 3.5 10.5 8 6 12.5",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "1.6"
                    })
                  ], -1)
                ])], 10, r0)) : (te(), ne("span", o0)),
                j.value ? (te(), ne("input", {
                  key: 2,
                  class: "pnl-tst-check",
                  type: "checkbox",
                  tabindex: "-1",
                  checked: Vs(p),
                  ".indeterminate": wc(p),
                  "aria-label": `Select ${p.original.title ?? p.id}`,
                  onClick: xr((ye) => bc(p), ["stop"])
                }, null, 40, s0)) : Ge("", !0),
                E(p) ? (te(), ne("span", {
                  key: 3,
                  class: "pnl-tst-icon",
                  "aria-hidden": "true",
                  innerHTML: E(p)
                }, null, 8, i0)) : Ge("", !0)
              ], 64)) : Ge("", !0),
              Y === 0 && Yt.value === p.id ? (te(), ne("input", {
                key: 1,
                ref_for: !0,
                ref: (ye) => mn.value = ye,
                class: "pnl-tst-edit",
                type: "text",
                value: sr.value,
                "aria-label": `Rename ${p.original.title ?? p.id}`,
                onInput: u[1] || (u[1] = (ye) => sr.value = ye.target.value),
                onClick: u[2] || (u[2] = xr(() => {
                }, ["stop"])),
                onKeydown: xr((ye) => kc(p, ye), ["stop"]),
                onBlur: (ye) => qs(p)
              }, null, 40, l0)) : (te(), ne("span", a0, St(k.getValue()), 1))
            ], 14, n0))), 128))
          ], 42, t0))), 128))
        ])
      ], 40, Gv)),
      st.value ? (te(), ne("div", c0, [
        _e("div", {
          class: "pnl-tst-dialog",
          role: "alertdialog",
          "aria-modal": "true",
          "aria-label": "Rename",
          "aria-describedby": "pnl-tst-confirm-message",
          onKeydown: Dc
        }, [
          _e("p", u0, " Rename " + St(st.value.previous) + " to " + St(st.value.title) + "? If you change a file name extension, the file might become unusable. ", 1),
          _e("div", f0, [
            _e("button", {
              ref_key: "confirmYesButton",
              ref: ho,
              type: "button",
              class: "pnl-tst-dbtn",
              "aria-keyshortcuts": "Y",
              onClick: Gs
            }, [...u[4] || (u[4] = [
              _e("span", { class: "pnl-tst-dkey" }, "Y", -1),
              os("es ", -1)
            ])], 512),
            _e("button", {
              ref_key: "confirmNoButton",
              ref: vo,
              type: "button",
              class: "pnl-tst-dbtn",
              "aria-keyshortcuts": "N",
              onClick: Ys
            }, [...u[5] || (u[5] = [
              _e("span", { class: "pnl-tst-dkey" }, "N", -1),
              os("o ", -1)
            ])], 512)
          ])
        ], 32)
      ])) : Ge("", !0),
      yn.value ? (te(), ne("div", {
        key: 4,
        ref_key: "menuElement",
        ref: pr,
        class: "pnl-tst-menu",
        role: "menu",
        "aria-orientation": "vertical",
        "aria-label": Nc.value,
        style: Ft({ left: `${bn.value.left}px`, top: `${bn.value.top}px` }),
        onKeydown: Gc
      }, [
        (te(!0), ne(Se, null, In(uo.value, (p) => (te(), ne(Se, {
          key: p.uid
        }, [
          p.id === "|" ? (te(), ne("div", p0)) : (te(), ne("button", {
            key: 1,
            ref_for: !0,
            ref: (m) => $c(p.uid, m),
            type: "button",
            class: "pnl-tst-mitem",
            role: "menuitem",
            "aria-keyshortcuts": p.keys,
            "aria-disabled": !wn(p),
            tabindex: Zs(p) === Xt.value ? 0 : -1,
            onClick: (m) => qc(p),
            onFocus: (m) => Xt.value = Zs(p)
          }, [
            _e("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: p.icon
            }, null, 8, h0),
            _e("span", v0, St(p.label), 1),
            p.keys ? (te(), ne("span", m0, St(Xs(p)), 1)) : Ge("", !0)
          ], 40, g0))
        ], 64))), 128))
      ], 44, d0)) : Ge("", !0)
    ], 512));
  }
};
function _0({ model: e, el: t }) {
  t.style.display = "block", t.style.width = "100%", t.style.height = "100%";
  const n = document.createElement("div");
  n.className = "pnl-tst-root", n.style.height = "100%", t.append(n);
  const r = /* @__PURE__ */ Gr({
    source: e.get("source") || [],
    columns: e.get("columns") || [],
    options: e.get("options") || {},
    icons: e.get("icons") || {},
    filterText: e.get("filter_text") || "",
    editingKey: e.get("editing_key") || "",
    expandedKeys: e.get("expanded_keys") || [],
    selectedKeys: e.get("selected_keys") || [],
    // A view concern like the filter, and bidirectional for the same reason: an
    // application may set a default sort or read back the one the user chose.
    sorting: e.get("sorting") || [],
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
  const a = (A, x) => {
    i += 1, s.push({ seq: i, event_name: A, event_params: x }), s.length > o && s.shift(), e.set("_event_data", { events: [...s], timestamp: Date.now() }), e.save_changes();
  }, c = (A, x) => A.length === x.length && A.every((j, M) => j === x[M]), f = (A) => (x) => {
    const j = [...e.get(A) || []].sort();
    c(j, x) || (e.set(A, x), e.save_changes());
  }, d = f("expanded_keys"), h = f("selected_keys"), w = (A) => {
    (e.get("filter_text") || "") !== A && (e.set("filter_text", A), e.save_changes());
  }, y = (A) => {
    (e.get("editing_key") || "") !== A && (e.set("editing_key", A), e.save_changes());
  }, E = (A, x) => A.length === x.length && A.every((j, M) => j.id === x[M].id && !!j.desc == !!x[M].desc), H = Id(b0, {
    state: r,
    emitEvent: a,
    setExpandedKeys: d,
    setSelectedKeys: h,
    setFilterText: w,
    setEditingKey: y,
    setSorting: (A) => {
      E(e.get("sorting") || [], A) || (e.set("sorting", A), e.save_changes());
    }
  });
  return H.mount(n), e.on("change:source", () => {
    r.source = e.get("source") || [];
  }), e.on("change:columns", () => {
    r.columns = e.get("columns") || [];
  }), e.on("change:options", () => {
    r.options = e.get("options") || {};
  }), e.on("change:icons", () => {
    r.icons = e.get("icons") || {};
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
  }), e.on("change:can_undo", () => {
    r.canUndo = e.get("can_undo") || !1;
  }), e.on("change:can_redo", () => {
    r.canRedo = e.get("can_redo") || !1;
  }), e.on("change:clipboard", () => {
    r.clipboard = e.get("clipboard") || {};
  }), () => {
    H.unmount();
  };
}
export {
  _0 as render
};

/**
* @vue/shared v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function Co(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const le = {}, Gt = [], nt = () => {
}, ei = () => !1, pr = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), gr = (e) => e.startsWith("onUpdate:"), Se = Object.assign, Mo = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, fa = Object.prototype.hasOwnProperty, Q = (e, t) => fa.call(e, t), N = Array.isArray, St = (e) => En(e) === "[object Map]", nr = (e) => En(e) === "[object Set]", ts = (e) => En(e) === "[object Date]", U = (e) => typeof e == "function", pe = (e) => typeof e == "string", rt = (e) => typeof e == "symbol", re = (e) => e !== null && typeof e == "object", ti = (e) => (re(e) || U(e)) && U(e.then) && U(e.catch), ni = Object.prototype.toString, En = (e) => ni.call(e), da = (e) => En(e).slice(8, -1), ri = (e) => En(e) === "[object Object]", Io = (e) => pe(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, pn = /* @__PURE__ */ Co(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), hr = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, pa = /-\w/g, Ne = hr(
  (e) => e.replace(pa, (t) => t.slice(1).toUpperCase())
), ga = /\B([A-Z])/g, jt = hr(
  (e) => e.replace(ga, "-$1").toLowerCase()
), oi = hr((e) => e.charAt(0).toUpperCase() + e.slice(1)), Nr = hr(
  (e) => e ? `on${oi(e)}` : ""
), et = (e, t) => !Object.is(e, t), Wr = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, si = (e, t, n, r = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: r,
    value: n
  });
}, ha = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let ns;
const vr = () => ns || (ns = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Yt(e) {
  if (N(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], o = pe(r) ? ya(r) : Yt(r);
      if (o)
        for (const s in o)
          t[s] = o[s];
    }
    return t;
  } else if (pe(e) || re(e))
    return e;
}
const va = /;(?![^(]*\))/g, ma = /:([^]+)/, wa = /\/\*[^]*?\*\//g;
function ya(e) {
  const t = {};
  return e.replace(wa, "").split(va).forEach((n) => {
    if (n) {
      const r = n.split(ma);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function Et(e) {
  let t = "";
  if (pe(e))
    t = e;
  else if (N(e))
    for (let n = 0; n < e.length; n++) {
      const r = Et(e[n]);
      r && (t += r + " ");
    }
  else if (re(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const ba = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", _a = /* @__PURE__ */ Co(ba);
function ii(e) {
  return !!e || e === "";
}
function xa(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let r = 0; n && r < e.length; r++)
    n = mr(e[r], t[r]);
  return n;
}
function rs(e, t) {
  if (e.size !== t.size) return !1;
  const n = Array.from(t), r = new Uint8Array(n.length);
  for (const o of e) {
    let s = -1;
    for (let i = 0; i < n.length; i++)
      if (!r[i] && mr(o, n[i])) {
        s = i;
        break;
      }
    if (s < 0) return !1;
    r[s] = 1;
  }
  return !0;
}
function mr(e, t) {
  if (e === t) return !0;
  let n = ts(e), r = ts(t);
  if (n || r)
    return n && r ? e.getTime() === t.getTime() : !1;
  if (n = rt(e), r = rt(t), n || r)
    return e === t;
  if (n = N(e), r = N(t), n || r)
    return n && r ? xa(e, t) : !1;
  if (n = re(e), r = re(t), n || r) {
    if (!n || !r)
      return !1;
    if (n = St(e), r = St(t), n || r || (n = nr(e), r = nr(t), n || r))
      return n && r ? rs(e, t) : !1;
    const o = Object.keys(e).length, s = Object.keys(t).length;
    if (o !== s)
      return !1;
    for (const i in e) {
      const l = e.hasOwnProperty(i), a = t.hasOwnProperty(i);
      if (l && !a || !l && a || !mr(e[i], t[i]))
        return !1;
    }
  }
  return String(e) === String(t);
}
const li = (e) => !!(e && e.__v_isRef === !0), Xn = (e) => pe(e) ? e : e == null ? "" : N(e) || re(e) && (e.toString === ni || !U(e.toString)) ? li(e) ? Xn(e.value) : JSON.stringify(e, ai, 2) : String(e), ai = (e, t) => li(t) ? ai(e, t.value) : St(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [r, o], s) => (n[Ur(r, s) + " =>"] = o, n),
    {}
  )
} : nr(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Ur(n))
} : rt(t) ? Ur(t) : re(t) && !N(t) && !ri(t) ? String(t) : t, Ur = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    rt(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let me;
class Sa {
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
function ci() {
  return me;
}
function Ra(e, t = !1) {
  me && me.cleanups.push(e);
}
let ie;
const zr = /* @__PURE__ */ new WeakSet();
class ui {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, me && (me.active ? me.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, zr.has(this) && (zr.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || di(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, os(this), pi(this);
    const t = ie, n = We;
    ie = this, We = !0;
    try {
      return this.fn();
    } finally {
      gi(this), ie = t, We = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Oo(t);
      this.deps = this.depsTail = void 0, os(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? zr.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    lo(this) && this.run();
  }
  get dirty() {
    return lo(this);
  }
}
let fi = 0, gn, hn;
function di(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = hn, hn = e;
    return;
  }
  e.next = gn, gn = e;
}
function Eo() {
  fi++;
}
function Ao() {
  if (--fi > 0)
    return;
  if (hn) {
    let t = hn;
    for (hn = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; gn; ) {
    let t = gn;
    for (gn = void 0; t; ) {
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
function pi(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function gi(e) {
  let t, n = e.depsTail, r = n;
  for (; r; ) {
    const o = r.prevDep;
    r.version === -1 ? (r === n && (n = o), Oo(r), Ca(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = o;
  }
  e.deps = t, e.depsTail = n;
}
function lo(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (hi(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function hi(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === bn) || (e.globalVersion = bn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !lo(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = ie, r = We;
  ie = e, We = !0;
  try {
    pi(e);
    const o = e.fn(e._value);
    (t.version === 0 || et(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    ie = n, We = r, gi(e), e.flags &= -3;
  }
}
function Oo(e, t = !1) {
  const { dep: n, prevSub: r, nextSub: o } = e;
  if (r && (r.nextSub = o, e.prevSub = void 0), o && (o.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
    n.computed.flags &= -5;
    for (let s = n.computed.deps; s; s = s.nextDep)
      Oo(s, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Ca(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let We = !0;
const vi = [];
function ct() {
  vi.push(We), We = !1;
}
function ut() {
  const e = vi.pop();
  We = e === void 0 ? !0 : e;
}
function os(e) {
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
let bn = 0;
class Ma {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Po {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!ie || !We || ie === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== ie)
      n = this.activeLink = new Ma(ie, this), ie.deps ? (n.prevDep = ie.depsTail, ie.depsTail.nextDep = n, ie.depsTail = n) : ie.deps = ie.depsTail = n, mi(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const r = n.nextDep;
      r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = ie.depsTail, n.nextDep = void 0, ie.depsTail.nextDep = n, ie.depsTail = n, ie.deps === n && (ie.deps = r);
    }
    return n;
  }
  trigger(t) {
    this.version++, bn++, this.notify(t);
  }
  notify(t) {
    Eo();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Ao();
    }
  }
}
function mi(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let r = t.deps; r; r = r.nextDep)
        mi(r);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const ao = /* @__PURE__ */ new WeakMap(), At = /* @__PURE__ */ Symbol(
  ""
), co = /* @__PURE__ */ Symbol(
  ""
), _n = /* @__PURE__ */ Symbol(
  ""
);
function _e(e, t, n) {
  if (We && ie) {
    let r = ao.get(e);
    r || ao.set(e, r = /* @__PURE__ */ new Map());
    let o = r.get(n);
    o || (r.set(n, o = new Po()), o.map = r, o.key = n), o.track();
  }
}
function lt(e, t, n, r, o, s) {
  const i = ao.get(e);
  if (!i) {
    bn++;
    return;
  }
  const l = (a) => {
    a && a.trigger();
  };
  if (Eo(), t === "clear")
    i.forEach(l);
  else {
    const a = N(e), u = a && Io(n);
    if (a && n === "length") {
      const f = Number(r);
      i.forEach((h, y) => {
        (y === "length" || y === _n || !rt(y) && y >= f) && l(h);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && l(i.get(n)), u && l(i.get(_n)), t) {
        case "add":
          a ? u && l(i.get("length")) : (l(i.get(At)), St(e) && l(i.get(co)));
          break;
        case "delete":
          a || (l(i.get(At)), St(e) && l(i.get(co)));
          break;
        case "set":
          St(e) && l(i.get(At));
          break;
      }
  }
  Ao();
}
function Wt(e) {
  const t = /* @__PURE__ */ Z(e);
  return t === e ? t : (_e(t, "iterate", _n), /* @__PURE__ */ Ke(e) ? t : t.map(Ue));
}
function wr(e) {
  return _e(e = /* @__PURE__ */ Z(e), "iterate", _n), e;
}
function Ze(e, t) {
  return /* @__PURE__ */ ft(e) ? Zt(/* @__PURE__ */ Ot(e) ? Ue(t) : t) : Ue(t);
}
const Ia = {
  __proto__: null,
  [Symbol.iterator]() {
    return qr(this, Symbol.iterator, (e) => Ze(this, e));
  },
  concat(...e) {
    return Wt(this).concat(
      ...e.map((t) => N(t) ? Wt(t) : t)
    );
  },
  entries() {
    return qr(this, "entries", (e) => (e[1] = Ze(this, e[1]), e));
  },
  every(e, t) {
    return ot(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return ot(
      this,
      "filter",
      e,
      t,
      (n) => n.map((r) => Ze(this, r)),
      arguments
    );
  },
  find(e, t) {
    return ot(
      this,
      "find",
      e,
      t,
      (n) => Ze(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return ot(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return ot(
      this,
      "findLast",
      e,
      t,
      (n) => Ze(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return ot(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return ot(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Gr(this, "includes", e);
  },
  indexOf(...e) {
    return Gr(this, "indexOf", e);
  },
  join(e) {
    return Wt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Gr(this, "lastIndexOf", e);
  },
  map(e, t) {
    return ot(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return an(this, "pop");
  },
  push(...e) {
    return an(this, "push", e);
  },
  reduce(e, ...t) {
    return ss(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return ss(this, "reduceRight", e, t);
  },
  shift() {
    return an(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return ot(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return an(this, "splice", e);
  },
  toReversed() {
    return Wt(this).toReversed();
  },
  toSorted(e) {
    return Wt(this).toSorted(e);
  },
  toSpliced(...e) {
    return Wt(this).toSpliced(...e);
  },
  unshift(...e) {
    return an(this, "unshift", e);
  },
  values() {
    return qr(this, "values", (e) => Ze(this, e));
  }
};
function qr(e, t, n) {
  const r = wr(e), o = r[t]();
  return r !== e && !/* @__PURE__ */ Ke(e) && (o._next = o.next, o.next = () => {
    const s = o._next();
    return s.done || (s.value = n(s.value)), s;
  }), o;
}
const Ea = Array.prototype;
function ot(e, t, n, r, o, s) {
  const i = wr(e), l = i !== e && !/* @__PURE__ */ Ke(e), a = i[t];
  if (a !== Ea[t]) {
    const h = a.apply(e, s);
    return l ? Ue(h) : h;
  }
  let u = n;
  i !== e && (l ? u = function(h, y) {
    return n.call(this, Ze(e, h), y, e);
  } : n.length > 2 && (u = function(h, y) {
    return n.call(this, h, y, e);
  }));
  const f = a.call(i, u, r);
  return l && o ? o(f) : f;
}
function ss(e, t, n, r) {
  const o = wr(e), s = o !== e && !/* @__PURE__ */ Ke(e);
  let i = n, l = !1;
  o !== e && (s ? (l = r.length === 0, i = function(u, f, h) {
    return l && (l = !1, u = Ze(e, u)), n.call(this, u, Ze(e, f), h, e);
  }) : n.length > 3 && (i = function(u, f, h) {
    return n.call(this, u, f, h, e);
  }));
  const a = o[t](i, ...r);
  return l ? Ze(e, a) : a;
}
function Gr(e, t, n) {
  const r = /* @__PURE__ */ Z(e);
  _e(r, "iterate", _n);
  const o = r[t](...n);
  return (o === -1 || o === !1) && /* @__PURE__ */ ko(n[0]) ? (n[0] = /* @__PURE__ */ Z(n[0]), r[t](...n)) : o;
}
function an(e, t, n = []) {
  ct(), Eo();
  const r = (/* @__PURE__ */ Z(e))[t].apply(e, n);
  return Ao(), ut(), r;
}
const Aa = /* @__PURE__ */ Co("__proto__,__v_isRef,__isVue"), wi = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(rt)
);
function Oa(e) {
  rt(e) || (e = String(e));
  const t = /* @__PURE__ */ Z(this);
  return _e(t, "has", e), t.hasOwnProperty(e);
}
class yi {
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
      return r === (o ? s ? Va : Si : s ? xi : _i).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const i = N(t);
    if (!o) {
      let a;
      if (i && (a = Ia[n]))
        return a;
      if (n === "hasOwnProperty")
        return Oa;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ xe(t) ? t : r
    );
    if ((rt(n) ? wi.has(n) : Aa(n)) || (o || _e(t, "get", n), s))
      return l;
    if (/* @__PURE__ */ xe(l)) {
      const a = i && Io(n) ? l : l.value;
      return o && re(a) ? /* @__PURE__ */ fo(a) : a;
    }
    return re(l) ? o ? /* @__PURE__ */ fo(l) : /* @__PURE__ */ yr(l) : l;
  }
}
class bi extends yi {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, o) {
    let s = t[n];
    const i = N(t) && Io(n);
    if (!this._isShallow) {
      const u = /* @__PURE__ */ ft(s);
      if (!/* @__PURE__ */ Ke(r) && !/* @__PURE__ */ ft(r) && (s = /* @__PURE__ */ Z(s), r = /* @__PURE__ */ Z(r)), !i && /* @__PURE__ */ xe(s) && !/* @__PURE__ */ xe(r))
        return u || (s.value = r), !0;
    }
    const l = i ? Number(n) < t.length : Q(t, n), a = Reflect.set(
      t,
      n,
      r,
      /* @__PURE__ */ xe(t) ? t : o
    );
    return t === /* @__PURE__ */ Z(o) && a && (l ? et(r, s) && lt(t, "set", n, r) : lt(t, "add", n, r)), a;
  }
  deleteProperty(t, n) {
    const r = Q(t, n);
    t[n];
    const o = Reflect.deleteProperty(t, n);
    return o && r && lt(t, "delete", n, void 0), o;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!rt(n) || !wi.has(n)) && _e(t, "has", n), r;
  }
  ownKeys(t) {
    return _e(
      t,
      "iterate",
      N(t) ? "length" : At
    ), Reflect.ownKeys(t);
  }
}
class Pa extends yi {
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
const Ta = /* @__PURE__ */ new bi(), Da = /* @__PURE__ */ new Pa(), ka = /* @__PURE__ */ new bi(!0);
const uo = (e) => e, Bn = (e) => Reflect.getPrototypeOf(e);
function Fa(e, t, n) {
  return function(...r) {
    const o = this.__v_raw, s = /* @__PURE__ */ Z(o), i = St(s), l = e === "entries" || e === Symbol.iterator && i, a = e === "keys" && i, u = o[e](...r), f = n ? uo : t ? Zt : Ue;
    return !t && _e(
      s,
      "iterate",
      a ? co : At
    ), Se(
      // inheriting all iterator properties
      Object.create(u),
      {
        // iterator protocol
        next() {
          const { value: h, done: y } = u.next();
          return y ? { value: h, done: y } : {
            value: l ? [f(h[0]), f(h[1])] : f(h),
            done: y
          };
        }
      }
    );
  };
}
function $n(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Ha(e, t) {
  const n = {
    get(o) {
      const s = this.__v_raw, i = /* @__PURE__ */ Z(s), l = /* @__PURE__ */ Z(o);
      e || (et(o, l) && _e(i, "get", o), _e(i, "get", l));
      const { has: a } = Bn(i), u = t ? uo : e ? Zt : Ue;
      if (a.call(i, o))
        return u(s.get(o));
      if (a.call(i, l))
        return u(s.get(l));
      s !== i && s.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && _e(/* @__PURE__ */ Z(o), "iterate", At), o.size;
    },
    has(o) {
      const s = this.__v_raw, i = /* @__PURE__ */ Z(s), l = /* @__PURE__ */ Z(o);
      return e || (et(o, l) && _e(i, "has", o), _e(i, "has", l)), o === l ? s.has(o) : s.has(o) || s.has(l);
    },
    forEach(o, s) {
      const i = this, l = i.__v_raw, a = /* @__PURE__ */ Z(l), u = t ? uo : e ? Zt : Ue;
      return !e && _e(a, "iterate", At), l.forEach((f, h) => o.call(s, u(f), u(h), i));
    }
  };
  return Se(
    n,
    e ? {
      add: $n("add"),
      set: $n("set"),
      delete: $n("delete"),
      clear: $n("clear")
    } : {
      add(o) {
        const s = /* @__PURE__ */ Z(this), i = Bn(s), l = /* @__PURE__ */ Z(o), a = !t && !/* @__PURE__ */ Ke(o) && !/* @__PURE__ */ ft(o) ? l : o;
        return i.has.call(s, a) || et(o, a) && i.has.call(s, o) || et(l, a) && i.has.call(s, l) || (s.add(a), lt(s, "add", a, a)), this;
      },
      set(o, s) {
        !t && !/* @__PURE__ */ Ke(s) && !/* @__PURE__ */ ft(s) && (s = /* @__PURE__ */ Z(s));
        const i = /* @__PURE__ */ Z(this), { has: l, get: a } = Bn(i);
        let u = l.call(i, o);
        u || (o = /* @__PURE__ */ Z(o), u = l.call(i, o));
        const f = a.call(i, o);
        return i.set(o, s), u ? et(s, f) && lt(i, "set", o, s) : lt(i, "add", o, s), this;
      },
      delete(o) {
        const s = /* @__PURE__ */ Z(this), { has: i, get: l } = Bn(s);
        let a = i.call(s, o);
        a || (o = /* @__PURE__ */ Z(o), a = i.call(s, o)), l && l.call(s, o);
        const u = s.delete(o);
        return a && lt(s, "delete", o, void 0), u;
      },
      clear() {
        const o = /* @__PURE__ */ Z(this), s = o.size !== 0, i = o.clear();
        return s && lt(
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
    n[o] = Fa(o, e, t);
  }), n;
}
function To(e, t) {
  const n = Ha(e, t);
  return (r, o, s) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(
    Q(n, o) && o in r ? n : r,
    o,
    s
  );
}
const ja = {
  get: /* @__PURE__ */ To(!1, !1)
}, La = {
  get: /* @__PURE__ */ To(!1, !0)
}, Ka = {
  get: /* @__PURE__ */ To(!0, !1)
};
const _i = /* @__PURE__ */ new WeakMap(), xi = /* @__PURE__ */ new WeakMap(), Si = /* @__PURE__ */ new WeakMap(), Va = /* @__PURE__ */ new WeakMap();
function Ba(e) {
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
function yr(e) {
  return /* @__PURE__ */ ft(e) ? e : Do(
    e,
    !1,
    Ta,
    ja,
    _i
  );
}
// @__NO_SIDE_EFFECTS__
function $a(e) {
  return Do(
    e,
    !1,
    ka,
    La,
    xi
  );
}
// @__NO_SIDE_EFFECTS__
function fo(e) {
  return Do(
    e,
    !0,
    Da,
    Ka,
    Si
  );
}
function Do(e, t, n, r, o) {
  if (!re(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const s = o.get(e);
  if (s)
    return s;
  const i = Ba(da(e));
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
  return /* @__PURE__ */ ft(e) ? /* @__PURE__ */ Ot(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function ft(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Ke(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function ko(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function Z(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ Z(t) : e;
}
function Na(e) {
  return !Q(e, "__v_skip") && Object.isExtensible(e) && si(e, "__v_skip", !0), e;
}
const Ue = (e) => re(e) ? /* @__PURE__ */ yr(e) : e, Zt = (e) => re(e) ? /* @__PURE__ */ fo(e) : e;
// @__NO_SIDE_EFFECTS__
function xe(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function $e(e) {
  return Ri(e, !1);
}
// @__NO_SIDE_EFFECTS__
function Wa(e) {
  return Ri(e, !0);
}
function Ri(e, t) {
  return /* @__PURE__ */ xe(e) ? e : new Ua(e, t);
}
class Ua {
  constructor(t, n) {
    this.dep = new Po(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ Z(t), this._value = n ? t : Ue(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, r = this.__v_isShallow || /* @__PURE__ */ Ke(t) || /* @__PURE__ */ ft(t);
    t = r ? t : /* @__PURE__ */ Z(t), et(t, n) && (this._rawValue = t, this._value = r ? t : Ue(t), this.dep.trigger());
  }
}
function Pt(e) {
  return /* @__PURE__ */ xe(e) ? e.value : e;
}
const za = {
  get: (e, t, n) => t === "__v_raw" ? e : Pt(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return /* @__PURE__ */ xe(o) && !/* @__PURE__ */ xe(n) ? (o.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function Ci(e) {
  return /* @__PURE__ */ Ot(e) ? e : new Proxy(e, za);
}
class qa {
  constructor(t, n, r) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Po(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = bn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    ie !== this)
      return di(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return hi(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function Ga(e, t, n = !1) {
  let r, o;
  return U(e) ? r = e : (r = e.get, o = e.set), new qa(r, o, n);
}
const Nn = {}, rr = /* @__PURE__ */ new WeakMap();
let It;
function Ya(e, t = !1, n = It) {
  if (n) {
    let r = rr.get(n);
    r || rr.set(n, r = []), r.push(e);
  }
}
function Xa(e, t, n = le) {
  const { immediate: r, deep: o, once: s, scheduler: i, augmentJob: l, call: a } = n, u = (I) => o ? I : /* @__PURE__ */ Ke(I) || o === !1 || o === 0 ? xt(I, 1) : xt(I);
  let f, h, y, w, M = !1, O = !1;
  if (/* @__PURE__ */ xe(e) ? (h = () => e.value, M = /* @__PURE__ */ Ke(e)) : /* @__PURE__ */ Ot(e) ? (h = () => u(e), M = !0) : N(e) ? (O = !0, M = e.some((I) => /* @__PURE__ */ Ot(I) || /* @__PURE__ */ Ke(I)), h = () => e.map((I) => {
    if (/* @__PURE__ */ xe(I))
      return I.value;
    if (/* @__PURE__ */ Ot(I))
      return u(I);
    if (U(I))
      return a ? a(I, 2) : I();
  })) : U(e) ? t ? h = a ? () => a(e, 2) : e : h = () => {
    if (y) {
      ct();
      try {
        y();
      } finally {
        ut();
      }
    }
    const I = It;
    It = f;
    try {
      return a ? a(e, 3, [w]) : e(w);
    } finally {
      It = I;
    }
  } : h = nt, t && o) {
    const I = h, $ = o === !0 ? 1 / 0 : o;
    h = () => xt(I(), $);
  }
  const D = ci(), H = () => {
    f.stop(), D && D.active && Mo(D.effects, f);
  };
  if (s && t) {
    const I = t;
    t = (...$) => {
      const W = I(...$);
      return H(), W;
    };
  }
  let C = O ? new Array(e.length).fill(Nn) : Nn;
  const K = (I) => {
    if (!(!(f.flags & 1) || !f.dirty && !I))
      if (t) {
        const $ = f.run();
        if (I || o || M || (O ? $.some((W, ce) => et(W, C[ce])) : et($, C))) {
          y && y();
          const W = It;
          It = f;
          try {
            const ce = [
              $,
              // pass undefined as the old value when it's changed for the first time
              C === Nn ? void 0 : O && C[0] === Nn ? [] : C,
              w
            ];
            C = $, a ? a(t, 3, ce) : (
              // @ts-expect-error
              t(...ce)
            );
          } finally {
            It = W;
          }
        }
      } else
        f.run();
  };
  return l && l(K), f = new ui(h), f.scheduler = i ? () => i(K, !1) : K, w = (I) => Ya(I, !1, f), y = f.onStop = () => {
    const I = rr.get(f);
    if (I) {
      if (a)
        a(I, 4);
      else
        for (const $ of I) $();
      rr.delete(f);
    }
  }, t ? r ? K(!0) : C = f.run() : i ? i(K.bind(null, !0), !0) : f.run(), H.pause = f.pause.bind(f), H.resume = f.resume.bind(f), H.stop = H, H;
}
function xt(e, t = 1 / 0, n) {
  if (t <= 0 || !re(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ xe(e))
    xt(e.value, t, n);
  else if (N(e))
    for (let r = 0; r < e.length; r++)
      xt(e[r], t, n);
  else if (nr(e) || St(e))
    e.forEach((r) => {
      xt(r, t, n);
    });
  else if (ri(e)) {
    for (const r in e)
      xt(e[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, r) && xt(e[r], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function An(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (o) {
    br(o, t, n);
  }
}
function ze(e, t, n, r) {
  if (U(e)) {
    const o = An(e, t, n, r);
    return o && ti(o) && o.catch((s) => {
      br(s, t, n);
    }), o;
  }
  if (N(e)) {
    const o = [];
    for (let s = 0; s < e.length; s++)
      o.push(ze(e[s], t, n, r));
    return o;
  }
}
function br(e, t, n, r = !0) {
  const o = t ? t.vnode : null, { errorHandler: s, throwUnhandledErrorInProduction: i } = t && t.appContext.config || le;
  if (t) {
    let l = t.parent;
    const a = t.proxy, u = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const f = l.ec;
      if (f) {
        for (let h = 0; h < f.length; h++)
          if (f[h](e, a, u) === !1)
            return;
      }
      l = l.parent;
    }
    if (s) {
      ct(), An(s, null, 10, [
        e,
        a,
        u
      ]), ut();
      return;
    }
  }
  Ja(e, n, o, r, i);
}
function Ja(e, t, n, r = !0, o = !1) {
  if (o)
    throw e;
  console.error(e);
}
const Me = [];
let Xe = -1;
const Xt = [];
let _t = null, zt = 0;
const Mi = /* @__PURE__ */ Promise.resolve();
let or = null;
function Jn(e) {
  const t = or || Mi;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Za(e) {
  let t = Xe + 1, n = Me.length;
  for (; t < n; ) {
    const r = t + n >>> 1, o = Me[r], s = xn(o);
    s < e || s === e && o.flags & 2 ? t = r + 1 : n = r;
  }
  return t;
}
function Fo(e) {
  if (!(e.flags & 1)) {
    const t = xn(e), n = Me[Me.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= xn(n) ? Me.push(e) : Me.splice(Za(t), 0, e), e.flags |= 1, Ii();
  }
}
function Ii() {
  or || (or = Mi.then(Ai));
}
function Qa(e) {
  if (!N(e))
    _t && e.id === -1 ? _t.splice(zt + 1, 0, e) : e.flags & 1 || (Xt.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      Xt.push(e[t]);
  Ii();
}
function is(e, t, n = Xe + 1) {
  for (; n < Me.length; n++) {
    const r = Me[n];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid)
        continue;
      Me.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function Ei(e) {
  if (Xt.length) {
    const t = [...new Set(Xt)].sort(
      (n, r) => xn(n) - xn(r)
    );
    if (Xt.length = 0, _t) {
      for (let n = 0; n < t.length; n++)
        _t.push(t[n]);
      return;
    }
    for (_t = t, zt = 0; zt < _t.length; zt++) {
      const n = _t[zt];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    _t = null, zt = 0;
  }
}
const xn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Ai(e) {
  try {
    for (Xe = 0; Xe < Me.length; Xe++) {
      const t = Me[Xe];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), An(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Xe < Me.length; Xe++) {
      const t = Me[Xe];
      t && (t.flags &= -2);
    }
    Xe = -1, Me.length = 0, Ei(), or = null, (Me.length || Xt.length) && Ai();
  }
}
let tt = null, Oi = null;
function sr(e) {
  const t = tt;
  return tt = e, Oi = e && e.type.__scopeId || null, t;
}
function ec(e, t = tt, n) {
  if (!t || e._n)
    return e;
  const r = (...o) => {
    r._d && ms(-1);
    const s = sr(t), i = Tt.length;
    let l;
    try {
      l = e(...o);
    } finally {
      for (let a = Tt.length; a > i; a--) nl();
      sr(s), r._d && ms(1);
    }
    return l;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function Ct(e, t, n, r) {
  const o = e.dirs, s = t && t.dirs;
  for (let i = 0; i < o.length; i++) {
    const l = o[i];
    s && (l.oldValue = s[i].value);
    let a = l.dir[r];
    a && (ct(), ze(a, n, 8, [
      e.el,
      l,
      e,
      t
    ]), ut());
  }
}
function tc(e, t) {
  if (Ee) {
    let n = Ee.provides;
    const r = Ee.parent && Ee.parent.provides;
    r === n && (n = Ee.provides = Object.create(r)), n[e] = t;
  }
}
function Zn(e, t, n = !1) {
  const r = Zc();
  if (r || Jt) {
    let o = Jt ? Jt._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && U(t) ? t.call(r && r.proxy) : t;
  }
}
const nc = /* @__PURE__ */ Symbol.for("v-scx"), rc = () => Zn(nc);
function be(e, t, n) {
  return Pi(e, t, n);
}
function Pi(e, t, n = le) {
  const { immediate: r, deep: o, flush: s, once: i } = n, l = Se({}, n), a = t && r || !t && s !== "post";
  let u;
  if (Cn) {
    if (s === "sync") {
      const w = rc();
      u = w.__watcherHandles || (w.__watcherHandles = []);
    } else if (!a) {
      const w = () => {
      };
      return w.stop = nt, w.resume = nt, w.pause = nt, w;
    }
  }
  const f = Ee;
  l.call = (w, M, O) => ze(w, f, M, O);
  let h = !1;
  s === "post" ? l.scheduler = (w) => {
    Pe(w, f && f.suspense);
  } : s !== "sync" && (h = !0, l.scheduler = (w, M) => {
    M ? w() : Fo(w);
  }), l.augmentJob = (w) => {
    t && (w.flags |= 4), h && (w.flags |= 2, f && (w.id = f.uid, w.i = f));
  };
  const y = Xa(e, t, l);
  return Cn && (u ? u.push(y) : a && y()), y;
}
function oc(e, t, n) {
  const r = this.proxy, o = pe(e) ? e.includes(".") ? Ti(r, e) : () => r[e] : e.bind(r, r);
  let s;
  U(t) ? s = t : (s = t.handler, n = t);
  const i = On(this), l = Pi(o, s.bind(r), n);
  return i(), l;
}
function Ti(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++)
      r = r[n[o]];
    return r;
  };
}
const sc = /* @__PURE__ */ Symbol("_vte"), _r = (e) => e.__isTeleport, Yr = /* @__PURE__ */ Symbol("_leaveCb");
function ic(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== dt) {
        t = n;
        break;
      }
  }
  return t;
}
function Di(e) {
  if (!jo(e))
    return _r(e.type) && e.children ? ic(e.children) : e;
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
function Ho(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    Ho(
      _r(n.type) && Di(n) || n,
      t
    );
  } else e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function ki(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function ls(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const ir = /* @__PURE__ */ new WeakMap();
function vn(e, t, n, r, o = !1) {
  if (N(e)) {
    e.forEach(
      (O, D) => vn(
        O,
        t && (N(t) ? t[D] : t),
        n,
        r,
        o
      )
    );
    return;
  }
  if (mn(r) && !o) {
    r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && vn(e, t, n, r.component.subTree);
    return;
  }
  const s = r.shapeFlag & 4 ? Vo(r.component) : r.el, i = o ? null : s, { i: l, r: a } = e, u = t && t.r, f = l.refs === le ? l.refs = {} : l.refs, h = l.setupState, y = /* @__PURE__ */ Z(h), w = h === le ? ei : (O) => ls(f, O) ? !1 : Q(y, O), M = (O, D) => !(D && ls(f, D));
  if (u != null && u !== a) {
    if (as(t), pe(u))
      f[u] = null, w(u) && (h[u] = null);
    else if (/* @__PURE__ */ xe(u)) {
      const O = t;
      M(u, O.k) && (u.value = null), O.k && (f[O.k] = null);
    }
  }
  if (U(a))
    An(a, l, 12, [i, f]);
  else {
    const O = pe(a), D = /* @__PURE__ */ xe(a);
    if (O || D) {
      const H = () => {
        if (e.f) {
          const C = O ? w(a) ? h[a] : f[a] : M() || !e.k ? a.value : f[e.k];
          if (o)
            N(C) && Mo(C, s);
          else if (N(C))
            C.includes(s) || C.push(s);
          else if (O)
            f[a] = [s], w(a) && (h[a] = f[a]);
          else {
            const K = [s];
            M(a, e.k) && (a.value = K), e.k && (f[e.k] = K);
          }
        } else O ? (f[a] = i, w(a) && (h[a] = i)) : D && (M(a, e.k) && (a.value = i), e.k && (f[e.k] = i));
      };
      if (i) {
        const C = () => {
          H(), ir.delete(e);
        };
        C.id = -1, ir.set(e, C), Pe(C, n);
      } else
        as(e), H();
    }
  }
}
function as(e) {
  const t = ir.get(e);
  t && (t.flags |= 8, ir.delete(e));
}
vr().requestIdleCallback;
vr().cancelIdleCallback;
const mn = (e) => !!e.type.__asyncLoader, jo = (e) => e.type.__isKeepAlive;
function lc(e, t) {
  Fi(e, "a", t);
}
function ac(e, t) {
  Fi(e, "da", t);
}
function Fi(e, t, n = Ee) {
  const r = e.__wdc || (e.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (xr(t, r, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      jo(o.parent.vnode) && cc(r, t, n, o), o = o.parent;
  }
}
function cc(e, t, n, r) {
  const o = xr(
    t,
    e,
    r,
    !0
    /* prepend */
  );
  Li(() => {
    Mo(r[t], o);
  }, n);
}
function xr(e, t, n = Ee, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), s = t.__weh || (t.__weh = (...i) => {
      ct();
      const l = On(n), a = ze(t, n, e, i);
      return l(), ut(), a;
    });
    return r ? o.unshift(s) : o.push(s), s;
  }
}
const gt = (e) => (t, n = Ee) => {
  (!Cn || e === "sp") && xr(e, (...r) => t(...r), n);
}, uc = gt("bm"), Hi = gt("m"), fc = gt(
  "bu"
), dc = gt("u"), ji = gt(
  "bum"
), Li = gt("um"), pc = gt(
  "sp"
), gc = gt("rtg"), hc = gt("rtc");
function vc(e, t = Ee) {
  xr("ec", e, t);
}
const mc = /* @__PURE__ */ Symbol.for("v-ndc");
function Wn(e, t, n, r) {
  let o;
  const s = n, i = N(e);
  if (i || pe(e)) {
    const l = i && /* @__PURE__ */ Ot(e);
    let a = !1, u = !1;
    l && (a = !/* @__PURE__ */ Ke(e), u = /* @__PURE__ */ ft(e), e = wr(e)), o = new Array(e.length);
    for (let f = 0, h = e.length; f < h; f++)
      o[f] = t(
        a ? u ? Zt(Ue(e[f])) : Ue(e[f]) : e[f],
        f,
        void 0,
        s
      );
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let l = 0; l < e; l++)
      o[l] = t(l + 1, l, void 0, s);
  } else if (re(e))
    if (e[Symbol.iterator])
      o = Array.from(
        e,
        (l, a) => t(l, a, void 0, s)
      );
    else {
      const l = Object.keys(e);
      o = new Array(l.length);
      for (let a = 0, u = l.length; a < u; a++) {
        const f = l[a];
        o[a] = t(e[f], f, a, s);
      }
    }
  else
    o = [];
  return o;
}
const po = (e) => e ? il(e) ? Vo(e) : po(e.parent) : null, wn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Se(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => po(e.parent),
    $root: (e) => po(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Vi(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Fo(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Jn.bind(e.proxy)),
    $watch: (e) => oc.bind(e)
  })
), Xr = (e, t) => e !== le && !e.__isScriptSetup && Q(e, t), wc = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: r, data: o, props: s, accessCache: i, type: l, appContext: a } = e;
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
        if (Xr(r, t))
          return i[t] = 1, r[t];
        if (o !== le && Q(o, t))
          return i[t] = 2, o[t];
        if (Q(s, t))
          return i[t] = 3, s[t];
        if (n !== le && Q(n, t))
          return i[t] = 4, n[t];
        go && (i[t] = 0);
      }
    }
    const u = wn[t];
    let f, h;
    if (u)
      return t === "$attrs" && _e(e.attrs, "get", ""), u(e);
    if (
      // css module (injected by vue-loader)
      (f = l.__cssModules) && (f = f[t])
    )
      return f;
    if (n !== le && Q(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      h = a.config.globalProperties, Q(h, t)
    )
      return h[t];
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: o, ctx: s } = e;
    return Xr(o, t) ? (o[t] = n, !0) : r !== le && Q(r, t) ? (r[t] = n, !0) : Q(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (s[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: o, props: s, type: i }
  }, l) {
    let a;
    return !!(n[l] || e !== le && l[0] !== "$" && Q(e, l) || Xr(t, l) || Q(s, l) || Q(r, l) || Q(wn, l) || Q(o.config.globalProperties, l) || (a = i.__cssModules) && a[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : Q(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function cs(e) {
  return N(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let go = !0;
function yc(e) {
  const t = Vi(e), n = e.proxy, r = e.ctx;
  go = !1, t.beforeCreate && us(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: s,
    methods: i,
    watch: l,
    provide: a,
    inject: u,
    // lifecycle
    created: f,
    beforeMount: h,
    mounted: y,
    beforeUpdate: w,
    updated: M,
    activated: O,
    deactivated: D,
    beforeDestroy: H,
    beforeUnmount: C,
    destroyed: K,
    unmounted: I,
    render: $,
    renderTracked: W,
    renderTriggered: ce,
    errorCaptured: k,
    serverPrefetch: F,
    // public API
    expose: q,
    inheritAttrs: ue,
    // assets
    components: se,
    directives: he,
    filters: Ae
  } = t;
  if (u && bc(u, r, null), i)
    for (const G in i) {
      const ne = i[G];
      U(ne) && (r[G] = ne.bind(n));
    }
  if (o) {
    const G = o.call(n, n);
    re(G) && (e.data = /* @__PURE__ */ yr(G));
  }
  if (go = !0, s)
    for (const G in s) {
      const ne = s[G], Te = U(ne) ? ne.bind(n, n) : U(ne.get) ? ne.get.bind(n, n) : nt, qe = !U(ne) && U(ne.set) ? ne.set.bind(n) : nt, Ve = Y({
        get: Te,
        set: qe
      });
      Object.defineProperty(r, G, {
        enumerable: !0,
        configurable: !0,
        get: () => Ve.value,
        set: (Fe) => Ve.value = Fe
      });
    }
  if (l)
    for (const G in l)
      Ki(l[G], r, n, G);
  if (a) {
    const G = U(a) ? a.call(n) : a;
    Reflect.ownKeys(G).forEach((ne) => {
      tc(ne, G[ne]);
    });
  }
  f && us(f, e, "c");
  function te(G, ne) {
    N(ne) ? ne.forEach((Te) => G(Te.bind(n))) : ne && G(ne.bind(n));
  }
  if (te(uc, h), te(Hi, y), te(fc, w), te(dc, M), te(lc, O), te(ac, D), te(vc, k), te(hc, W), te(gc, ce), te(ji, C), te(Li, I), te(pc, F), N(q))
    if (q.length) {
      const G = e.exposed || (e.exposed = {});
      q.forEach((ne) => {
        Object.defineProperty(G, ne, {
          get: () => n[ne],
          set: (Te) => n[ne] = Te,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  $ && e.render === nt && (e.render = $), ue != null && (e.inheritAttrs = ue), se && (e.components = se), he && (e.directives = he), F && ki(e);
}
function bc(e, t, n = nt) {
  N(e) && (e = ho(e));
  for (const r in e) {
    const o = e[r];
    let s;
    re(o) ? "default" in o ? s = Zn(
      o.from || r,
      o.default,
      !0
    ) : s = Zn(o.from || r) : s = Zn(o), /* @__PURE__ */ xe(s) ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (i) => s.value = i
    }) : t[r] = s;
  }
}
function us(e, t, n) {
  ze(
    N(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Ki(e, t, n, r) {
  let o = r.includes(".") ? Ti(n, r) : () => n[r];
  if (pe(e)) {
    const s = t[e];
    U(s) && be(o, s);
  } else if (U(e))
    be(o, e.bind(n));
  else if (re(e))
    if (N(e))
      e.forEach((s) => Ki(s, t, n, r));
    else {
      const s = U(e.handler) ? e.handler.bind(n) : t[e.handler];
      U(s) && be(o, s, e);
    }
}
function Vi(e) {
  const t = e.type, { mixins: n, extends: r } = t, {
    mixins: o,
    optionsCache: s,
    config: { optionMergeStrategies: i }
  } = e.appContext, l = s.get(t);
  let a;
  return l ? a = l : !o.length && !n && !r ? a = t : (a = {}, o.length && o.forEach(
    (u) => lr(a, u, i, !0)
  ), lr(a, t, i)), re(t) && s.set(t, a), a;
}
function lr(e, t, n, r = !1) {
  const { mixins: o, extends: s } = t;
  s && lr(e, s, n, !0), o && o.forEach(
    (i) => lr(e, i, n, !0)
  );
  for (const i in t)
    if (!(r && i === "expose")) {
      const l = _c[i] || n && n[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const _c = {
  data: fs,
  props: ds,
  emits: ds,
  // objects
  methods: fn,
  computed: fn,
  // lifecycle
  beforeCreate: Ce,
  created: Ce,
  beforeMount: Ce,
  mounted: Ce,
  beforeUpdate: Ce,
  updated: Ce,
  beforeDestroy: Ce,
  beforeUnmount: Ce,
  destroyed: Ce,
  unmounted: Ce,
  activated: Ce,
  deactivated: Ce,
  errorCaptured: Ce,
  serverPrefetch: Ce,
  // assets
  components: fn,
  directives: fn,
  // watch
  watch: Sc,
  // provide / inject
  provide: fs,
  inject: xc
};
function fs(e, t) {
  return t ? e ? function() {
    return Se(
      U(e) ? e.call(this, this) : e,
      U(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function xc(e, t) {
  return fn(ho(e), ho(t));
}
function ho(e) {
  if (N(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Ce(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function fn(e, t) {
  return e ? Se(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function ds(e, t) {
  return e ? N(e) && N(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Se(
    /* @__PURE__ */ Object.create(null),
    cs(e),
    cs(t ?? {})
  ) : t;
}
function Sc(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Se(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = Ce(e[r], t[r]);
  return n;
}
function Bi() {
  return {
    app: null,
    config: {
      isNativeTag: ei,
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
    U(r) || (r = Se({}, r)), o != null && !re(o) && (o = null);
    const s = Bi(), i = /* @__PURE__ */ new WeakSet(), l = [];
    let a = !1;
    const u = s.app = {
      _uid: Rc++,
      _component: r,
      _props: o,
      _container: null,
      _context: s,
      _instance: null,
      version: ou,
      get config() {
        return s.config;
      },
      set config(f) {
      },
      use(f, ...h) {
        return i.has(f) || (f && U(f.install) ? (i.add(f), f.install(u, ...h)) : U(f) && (i.add(f), f(u, ...h))), u;
      },
      mixin(f) {
        return s.mixins.includes(f) || s.mixins.push(f), u;
      },
      component(f, h) {
        return h ? (s.components[f] = h, u) : s.components[f];
      },
      directive(f, h) {
        return h ? (s.directives[f] = h, u) : s.directives[f];
      },
      mount(f, h, y) {
        if (!a) {
          const w = u._ceVNode || at(r, o);
          return w.appContext = s, y === !0 ? y = "svg" : y === !1 && (y = void 0), e(w, f, y), a = !0, u._container = f, f.__vue_app__ = u, Vo(w.component);
        }
      },
      onUnmount(f) {
        l.push(f);
      },
      unmount() {
        a && (ze(
          l,
          u._instance,
          16
        ), e(null, u._container), delete u._container.__vue_app__);
      },
      provide(f, h) {
        return s.provides[f] = h, u;
      },
      runWithContext(f) {
        const h = Jt;
        Jt = u;
        try {
          return f();
        } finally {
          Jt = h;
        }
      }
    };
    return u;
  };
}
let Jt = null;
const Mc = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Ne(t)}Modifiers`] || e[`${jt(t)}Modifiers`];
function Ic(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || le;
  let o = n;
  const s = t.startsWith("update:"), i = s && Mc(r, t.slice(7));
  i && (i.trim && (o = n.map((f) => pe(f) ? f.trim() : f)), i.number && (o = o.map(ha)));
  let l, a = r[l = Nr(t)] || // also try camelCase event handler (#2249)
  r[l = Nr(Ne(t))];
  !a && s && (a = r[l = Nr(jt(t))]), a && ze(
    a,
    e,
    6,
    o
  );
  const u = r[l + "Once"];
  if (u) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, ze(
      u,
      e,
      6,
      o
    );
  }
}
const Ec = /* @__PURE__ */ new WeakMap();
function $i(e, t, n = !1) {
  const r = n ? Ec : t.emitsCache, o = r.get(e);
  if (o !== void 0)
    return o;
  const s = e.emits;
  let i = {}, l = !1;
  if (!U(e)) {
    const a = (u) => {
      const f = $i(u, t, !0);
      f && (l = !0, Se(i, f));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !s && !l ? (re(e) && r.set(e, null), null) : (N(s) ? s.forEach((a) => i[a] = null) : Se(i, s), re(e) && r.set(e, i), i);
}
function Sr(e, t) {
  return !e || !pr(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), Q(e, t[0].toLowerCase() + t.slice(1)) || Q(e, jt(t)) || Q(e, t));
}
function ps(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: o,
    propsOptions: [s],
    slots: i,
    attrs: l,
    emit: a,
    render: u,
    renderCache: f,
    props: h,
    data: y,
    setupState: w,
    ctx: M,
    inheritAttrs: O
  } = e, D = sr(e);
  let H, C;
  try {
    if (n.shapeFlag & 4) {
      const I = o || r, $ = I;
      H = Qe(
        u.call(
          $,
          I,
          f,
          h,
          w,
          y,
          M
        )
      ), C = l;
    } else {
      const I = t;
      H = Qe(
        I.length > 1 ? I(
          h,
          { attrs: l, slots: i, emit: a }
        ) : I(
          h,
          null
        )
      ), C = t.props ? l : Ac(l);
    }
  } catch (I) {
    Tt.length = 0, br(I, e, 1), H = at(dt);
  }
  let K = H;
  if (C && O !== !1) {
    const I = Object.keys(C), { shapeFlag: $ } = K;
    I.length && $ & 7 && (s && I.some(gr) && (C = Oc(
      C,
      s
    )), K = Qt(K, C, !1, !0));
  }
  if (n.dirs && (K = Qt(K, null, !1, !0), K.dirs = K.dirs ? K.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const I = _r(K.type) && Di(K) || K;
    Ho(I, n.transition);
  }
  return H = K, sr(D), H;
}
const Ac = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || pr(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Oc = (e, t) => {
  const n = {};
  for (const r in e)
    (!gr(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
  return n;
};
function Pc(e, t, n) {
  const { props: r, children: o, component: s } = e, { props: i, children: l, patchFlag: a } = t, u = s.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return r ? gs(r, i, u) : !!i;
    if (a & 8) {
      const f = t.dynamicProps;
      for (let h = 0; h < f.length; h++) {
        const y = f[h];
        if (Ni(i, r, y) && !Sr(u, y))
          return !0;
      }
    }
  } else
    return (o || l) && (!l || !l.$stable) ? !0 : r === i ? !1 : r ? i ? gs(r, i, u) : !0 : !!i;
  return !1;
}
function gs(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < r.length; o++) {
    const s = r[o];
    if (Ni(t, e, s) && !Sr(n, s))
      return !0;
  }
  return !1;
}
function Ni(e, t, n) {
  const r = e[n], o = t[n];
  return n === "style" && re(r) && re(o) ? !mr(r, o) : r !== o;
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
const Wi = {}, Ui = () => Object.create(Wi), zi = (e) => Object.getPrototypeOf(e) === Wi;
function Dc(e, t, n, r = !1) {
  const o = {}, s = Ui();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), qi(e, t, o, s);
  for (const i in e.propsOptions[0])
    i in o || (o[i] = void 0);
  n ? e.props = r ? o : /* @__PURE__ */ $a(o) : e.type.props ? e.props = o : e.props = s, e.attrs = s;
}
function kc(e, t, n, r) {
  const {
    props: o,
    attrs: s,
    vnode: { patchFlag: i }
  } = e, l = /* @__PURE__ */ Z(o), [a] = e.propsOptions;
  let u = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (r || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const f = e.vnode.dynamicProps;
      for (let h = 0; h < f.length; h++) {
        let y = f[h];
        if (Sr(e.emitsOptions, y))
          continue;
        const w = t[y];
        if (a)
          if (Q(s, y))
            w !== s[y] && (s[y] = w, u = !0);
          else {
            const M = Ne(y);
            o[M] = vo(
              a,
              l,
              M,
              w,
              e,
              !1
            );
          }
        else
          w !== s[y] && (s[y] = w, u = !0);
      }
    }
  } else {
    qi(e, t, o, s) && (u = !0);
    let f;
    for (const h in l)
      (!t || // for camelCase
      !Q(t, h) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((f = jt(h)) === h || !Q(t, f))) && (a ? n && // for camelCase
      (n[h] !== void 0 || // for kebab-case
      n[f] !== void 0) && (o[h] = vo(
        a,
        l,
        h,
        void 0,
        e,
        !0
      )) : delete o[h]);
    if (s !== l)
      for (const h in s)
        (!t || !Q(t, h)) && (delete s[h], u = !0);
  }
  u && lt(e.attrs, "set", "");
}
function qi(e, t, n, r) {
  const [o, s] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let a in t) {
      if (pn(a))
        continue;
      const u = t[a];
      let f;
      o && Q(o, f = Ne(a)) ? !s || !s.includes(f) ? n[f] = u : (l || (l = {}))[f] = u : Sr(e.emitsOptions, a) || (!(a in r) || u !== r[a]) && (r[a] = u, i = !0);
    }
  if (s) {
    const a = /* @__PURE__ */ Z(n), u = l || le;
    for (let f = 0; f < s.length; f++) {
      const h = s[f];
      n[h] = vo(
        o,
        a,
        h,
        u[h],
        e,
        !Q(u, h)
      );
    }
  }
  return i;
}
function vo(e, t, n, r, o, s) {
  const i = e[n];
  if (i != null) {
    const l = Q(i, "default");
    if (l && r === void 0) {
      const a = i.default;
      if (i.type !== Function && !i.skipFactory && U(a)) {
        const { propsDefaults: u } = o;
        if (n in u)
          r = u[n];
        else {
          const f = On(o);
          r = u[n] = a.call(
            null,
            t
          ), f();
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
const Fc = /* @__PURE__ */ new WeakMap();
function Gi(e, t, n = !1) {
  const r = n ? Fc : t.propsCache, o = r.get(e);
  if (o)
    return o;
  const s = e.props, i = {}, l = [];
  let a = !1;
  if (!U(e)) {
    const f = (h) => {
      a = !0;
      const [y, w] = Gi(h, t, !0);
      Se(i, y), w && l.push(...w);
    };
    !n && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  if (!s && !a)
    return re(e) && r.set(e, Gt), Gt;
  if (N(s))
    for (let f = 0; f < s.length; f++) {
      const h = Ne(s[f]);
      hs(h) && (i[h] = le);
    }
  else if (s)
    for (const f in s) {
      const h = Ne(f);
      if (hs(h)) {
        const y = s[f], w = i[h] = N(y) || U(y) ? { type: y } : Se({}, y), M = w.type;
        let O = !1, D = !0;
        if (N(M))
          for (let H = 0; H < M.length; ++H) {
            const C = M[H], K = U(C) && C.name;
            if (K === "Boolean") {
              O = !0;
              break;
            } else K === "String" && (D = !1);
          }
        else
          O = U(M) && M.name === "Boolean";
        w[
          0
          /* shouldCast */
        ] = O, w[
          1
          /* shouldCastTrue */
        ] = D, (O || Q(w, "default")) && l.push(h);
      }
    }
  const u = [i, l];
  return re(e) && r.set(e, u), u;
}
function hs(e) {
  return e[0] !== "$" && !pn(e);
}
const Lo = (e) => e === "_" || e === "_ctx" || e === "$stable", Ko = (e) => N(e) ? e.map(Qe) : [Qe(e)], Hc = (e, t, n) => {
  if (t._n)
    return t;
  const r = ec((...o) => Ko(t(...o)), n);
  return r._c = !1, r;
}, Yi = (e, t, n) => {
  const r = e._ctx;
  for (const o in e) {
    if (Lo(o)) continue;
    const s = e[o];
    if (U(s))
      t[o] = Hc(o, s, r);
    else if (s != null) {
      const i = Ko(s);
      t[o] = () => i;
    }
  }
}, Xi = (e, t) => {
  const n = Ko(t);
  e.slots.default = () => n;
}, Ji = (e, t, n) => {
  for (const r in t)
    (n || !Lo(r)) && (e[r] = t[r]);
}, jc = (e, t, n) => {
  const r = e.slots = Ui();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (Ji(r, t, n), n && si(r, "_", o, !0)) : Yi(t, r);
  } else t && Xi(e, t);
}, Lc = (e, t, n) => {
  const { vnode: r, slots: o } = e;
  let s = !0, i = le;
  if (r.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? s = !1 : Ji(o, t, n) : (s = !t.$stable, Yi(t, o)), i = t;
  } else t && (Xi(e, t), i = { default: 1 });
  if (s)
    for (const l in o)
      !Lo(l) && i[l] == null && delete o[l];
}, Pe = Nc;
function Kc(e) {
  return Vc(e);
}
function Vc(e, t) {
  const n = vr();
  n.__VUE__ = !0;
  const {
    insert: r,
    remove: o,
    patchProp: s,
    createElement: i,
    createText: l,
    createComment: a,
    setText: u,
    setElementText: f,
    parentNode: h,
    nextSibling: y,
    setScopeId: w = nt,
    insertStaticContent: M
  } = e, O = (d, g, m, R = null, S = null, _ = null, P = void 0, A = null, E = !!g.dynamicChildren) => {
    if (d === g)
      return;
    d && !cn(d, g) && (R = Bt(d), Fe(d, S, _, !0), d = null), g.patchFlag === -2 && (E = !1, g.dynamicChildren = null);
    const { type: x, ref: V, shapeFlag: T } = g;
    switch (x) {
      case Rr:
        D(d, g, m, R);
        break;
      case dt:
        H(d, g, m, R);
        break;
      case Zr:
        d == null && C(g, m, R, P);
        break;
      case Ie:
        se(
          d,
          g,
          m,
          R,
          S,
          _,
          P,
          A,
          E
        );
        break;
      default:
        T & 1 ? $(
          d,
          g,
          m,
          R,
          S,
          _,
          P,
          A,
          E
        ) : T & 6 ? he(
          d,
          g,
          m,
          R,
          S,
          _,
          P,
          A,
          E
        ) : (T & 64 || T & 128) && x.process(
          d,
          g,
          m,
          R,
          S,
          _,
          P,
          A,
          E,
          Ge
        );
    }
    V != null && S ? vn(V, d && d.ref, _, g || d, !g) : V == null && d && d.ref != null && vn(d.ref, null, _, d, !0);
  }, D = (d, g, m, R) => {
    if (d == null)
      r(
        g.el = l(g.children),
        m,
        R
      );
    else {
      const S = g.el = d.el;
      g.children !== d.children && u(S, g.children);
    }
  }, H = (d, g, m, R) => {
    d == null ? r(
      g.el = a(g.children || ""),
      m,
      R
    ) : g.el = d.el;
  }, C = (d, g, m, R) => {
    [d.el, d.anchor] = M(
      d.children,
      g,
      m,
      R,
      d.el,
      d.anchor
    );
  }, K = ({ el: d, anchor: g }, m, R) => {
    let S;
    for (; d && d !== g; )
      S = y(d), r(d, m, R), d = S;
    r(g, m, R);
  }, I = ({ el: d, anchor: g }) => {
    let m;
    for (; d && d !== g; )
      m = y(d), o(d), d = m;
    o(g);
  }, $ = (d, g, m, R, S, _, P, A, E) => {
    if (g.type === "svg" ? P = "svg" : g.type === "math" && (P = "mathml"), d == null)
      W(
        g,
        m,
        R,
        S,
        _,
        P,
        A,
        E
      );
    else {
      const x = d.el && d.el._isVueCE ? d.el : null;
      try {
        x && x._beginPatch(), F(
          d,
          g,
          S,
          _,
          P,
          A,
          E
        );
      } finally {
        x && x._endPatch();
      }
    }
  }, W = (d, g, m, R, S, _, P, A) => {
    let E, x;
    const { props: V, shapeFlag: T, transition: j, dirs: B } = d;
    if (E = d.el = i(
      d.type,
      _,
      V && V.is,
      V
    ), T & 8 ? f(E, d.children) : T & 16 && k(
      d.children,
      E,
      null,
      R,
      S,
      Jr(d, _),
      P,
      A
    ), B && Ct(d, null, R, "created"), ce(E, d, d.scopeId, P, R), V) {
      for (const X in V)
        X !== "value" && !pn(X) && s(E, X, null, V[X], _, R);
      "value" in V && s(E, "value", null, V.value, _), (x = V.onVnodeBeforeMount) && Ye(x, R, d);
    }
    B && Ct(d, null, R, "beforeMount");
    const z = Bc(S, j);
    z && j.beforeEnter(E), r(E, g, m), ((x = V && V.onVnodeMounted) || z || B) && Pe(() => {
      try {
        x && Ye(x, R, d), z && j.enter(E), B && Ct(d, null, R, "mounted");
      } finally {
      }
    }, S);
  }, ce = (d, g, m, R, S) => {
    if (m && w(d, m), R)
      for (let _ = 0; _ < R.length; _++)
        w(d, R[_]);
    if (S) {
      let _ = S.subTree;
      if (g === _ || tl(_.type) && (_.ssContent === g || _.ssFallback === g)) {
        const P = S.vnode;
        ce(
          d,
          P,
          P.scopeId,
          P.slotScopeIds,
          S.parent
        );
      }
    }
  }, k = (d, g, m, R, S, _, P, A, E = 0) => {
    for (let x = E; x < d.length; x++) {
      const V = d[x] = A ? it(d[x]) : Qe(d[x]);
      O(
        null,
        V,
        g,
        m,
        R,
        S,
        _,
        P,
        A
      );
    }
  }, F = (d, g, m, R, S, _, P) => {
    const A = g.el = d.el;
    let { patchFlag: E, dynamicChildren: x, dirs: V } = g;
    E |= d.patchFlag & 16;
    const T = d.props || le, j = g.props || le;
    let B;
    if (m && Mt(m, !1), (B = j.onVnodeBeforeUpdate) && Ye(B, m, g, d), V && Ct(g, d, m, "beforeUpdate"), m && Mt(m, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    x && (!d.dynamicChildren || d.dynamicChildren.length !== x.length) && (E = 0, P = !1, x = null), (T.innerHTML && j.innerHTML == null || T.textContent && j.textContent == null) && f(A, ""), x ? q(
      d.dynamicChildren,
      x,
      A,
      m,
      R,
      Jr(g, S),
      _
    ) : P || ne(
      d,
      g,
      A,
      null,
      m,
      R,
      Jr(g, S),
      _,
      !1
    ), E > 0) {
      if (E & 16)
        ue(A, T, j, m, S);
      else if (E & 2 && T.class !== j.class && s(A, "class", null, j.class, S), E & 4 && s(A, "style", T.style, j.style, S), E & 8) {
        const z = g.dynamicProps;
        for (let X = 0; X < z.length; X++) {
          const J = z[X], ae = T[J], ve = j[J];
          (ve !== ae || J === "value") && s(A, J, ae, ve, S, m);
        }
      }
      E & 1 && d.children !== g.children && f(A, g.children);
    } else !P && x == null && ue(A, T, j, m, S);
    ((B = j.onVnodeUpdated) || V) && Pe(() => {
      B && Ye(B, m, g, d), V && Ct(g, d, m, "updated");
    }, R);
  }, q = (d, g, m, R, S, _, P) => {
    for (let A = 0; A < g.length; A++) {
      const E = d[A], x = g[A], V = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        E.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (E.type === Ie || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !cn(E, x) || // - In the case of a component, it could contain anything.
        E.shapeFlag & 198) ? h(E.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          m
        )
      );
      O(
        E,
        x,
        V,
        null,
        R,
        S,
        _,
        P,
        !0
      );
    }
  }, ue = (d, g, m, R, S) => {
    if (g !== m) {
      if (g !== le)
        for (const _ in g)
          !pn(_) && !(_ in m) && s(
            d,
            _,
            g[_],
            null,
            S,
            R
          );
      for (const _ in m) {
        if (pn(_)) continue;
        const P = m[_], A = g[_];
        P !== A && _ !== "value" && s(d, _, A, P, S, R);
      }
      "value" in m && s(d, "value", g.value, m.value, S);
    }
  }, se = (d, g, m, R, S, _, P, A, E) => {
    const x = g.el = d ? d.el : l(""), V = g.anchor = d ? d.anchor : l("");
    let { patchFlag: T, dynamicChildren: j, slotScopeIds: B } = g;
    B && (A = A ? A.concat(B) : B), d == null ? (r(x, m, R), r(V, m, R), k(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      g.children || [],
      m,
      V,
      S,
      _,
      P,
      A,
      E
    )) : T > 0 && T & 64 && j && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    d.dynamicChildren && d.dynamicChildren.length === j.length ? (q(
      d.dynamicChildren,
      j,
      m,
      S,
      _,
      P,
      A
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (g.key != null || S && g === S.subTree) && Zi(
      d,
      g,
      !0
      /* shallow */
    )) : ne(
      d,
      g,
      m,
      V,
      S,
      _,
      P,
      A,
      E
    );
  }, he = (d, g, m, R, S, _, P, A, E) => {
    g.slotScopeIds = A, d == null ? g.shapeFlag & 512 ? S.ctx.activate(
      g,
      m,
      R,
      P,
      E
    ) : Ae(
      g,
      m,
      R,
      S,
      _,
      P,
      E
    ) : Re(d, g, E);
  }, Ae = (d, g, m, R, S, _, P) => {
    const A = d.component = Jc(
      d,
      R,
      S
    );
    if (jo(d) && (A.ctx.renderer = Ge), Qc(A, !1, P), A.asyncDep) {
      if (S && S.registerDep(A, te, P), !d.el) {
        const E = A.subTree = at(dt);
        H(null, E, g, m), d.placeholder = E.el;
      }
    } else
      te(
        A,
        d,
        g,
        m,
        S,
        _,
        P
      );
  }, Re = (d, g, m) => {
    const R = g.component = d.component;
    if (Pc(d, g, m))
      if (R.asyncDep && !R.asyncResolved) {
        G(R, g, m);
        return;
      } else
        R.next = g, R.update();
    else
      g.el = d.el, R.vnode = g;
  }, te = (d, g, m, R, S, _, P) => {
    const A = () => {
      if (d.isMounted) {
        let { next: T, bu: j, u: B, parent: z, vnode: X } = d;
        {
          const De = Qi(d);
          if (De) {
            T && (T.el = X.el, G(d, T, P)), De.asyncDep.then(() => {
              Pe(() => {
                d.isUnmounted || x();
              }, S);
            });
            return;
          }
        }
        let J = T, ae;
        Mt(d, !1), T ? (T.el = X.el, G(d, T, P)) : T = X, j && Wr(j), (ae = T.props && T.props.onVnodeBeforeUpdate) && Ye(ae, z, T, X), Mt(d, !0);
        const ve = ps(d), je = d.subTree;
        d.subTree = ve, O(
          je,
          ve,
          // parent may have changed if it's in a teleport
          h(je.el),
          // anchor may have changed if it's in a fragment
          Bt(je),
          d,
          S,
          _
        ), T.el = ve.el, J === null && Tc(d, ve.el), B && Pe(B, S), (ae = T.props && T.props.onVnodeUpdated) && Pe(
          () => Ye(ae, z, T, X),
          S
        );
      } else {
        let T;
        const { el: j, props: B } = g, { bm: z, m: X, parent: J, root: ae, type: ve } = d, je = mn(g);
        Mt(d, !1), z && Wr(z), !je && (T = B && B.onVnodeBeforeMount) && Ye(T, J, g), Mt(d, !0);
        {
          ae.ce && ae.ce._hasShadowRoot() && ae.ce._injectChildStyle(
            ve,
            d.parent ? d.parent.type : void 0
          );
          const De = d.subTree = ps(d);
          O(
            null,
            De,
            m,
            R,
            d,
            S,
            _
          ), g.el = De.el;
        }
        if (X && Pe(X, S), !je && (T = B && B.onVnodeMounted)) {
          const De = g;
          Pe(
            () => Ye(T, J, De),
            S
          );
        }
        (g.shapeFlag & 256 || J && mn(J.vnode) && J.vnode.shapeFlag & 256) && d.a && Pe(d.a, S), d.isMounted = !0, g = m = R = null;
      }
    };
    d.scope.on();
    const E = d.effect = new ui(A);
    d.scope.off();
    const x = d.update = E.run.bind(E), V = d.job = E.runIfDirty.bind(E);
    V.i = d, V.id = d.uid, E.scheduler = () => Fo(V), Mt(d, !0), x();
  }, G = (d, g, m) => {
    g.component = d;
    const R = d.vnode.props;
    d.vnode = g, d.next = null, kc(d, g.props, R, m), Lc(d, g.children, m), ct(), is(d), ut();
  }, ne = (d, g, m, R, S, _, P, A, E = !1) => {
    const x = d && d.children, V = d ? d.shapeFlag : 0, T = g.children, { patchFlag: j, shapeFlag: B } = g;
    if (j > 0) {
      if (j & 128) {
        qe(
          x,
          T,
          m,
          R,
          S,
          _,
          P,
          A,
          E
        );
        return;
      } else if (j & 256) {
        Te(
          x,
          T,
          m,
          R,
          S,
          _,
          P,
          A,
          E
        );
        return;
      }
    }
    B & 8 ? (V & 16 && He(x, S, _), T !== x && f(m, T)) : V & 16 ? B & 16 ? qe(
      x,
      T,
      m,
      R,
      S,
      _,
      P,
      A,
      E
    ) : He(x, S, _, !0) : (V & 8 && f(m, ""), B & 16 && k(
      T,
      m,
      R,
      S,
      _,
      P,
      A,
      E
    ));
  }, Te = (d, g, m, R, S, _, P, A, E) => {
    d = d || Gt, g = g || Gt;
    const x = d.length, V = g.length, T = Math.min(x, V);
    let j;
    for (j = 0; j < T; j++) {
      const B = g[j] = E ? it(g[j]) : Qe(g[j]);
      O(
        d[j],
        B,
        m,
        null,
        S,
        _,
        P,
        A,
        E
      );
    }
    x > V ? He(
      d,
      S,
      _,
      !0,
      !1,
      T
    ) : k(
      g,
      m,
      R,
      S,
      _,
      P,
      A,
      E,
      T
    );
  }, qe = (d, g, m, R, S, _, P, A, E) => {
    let x = 0;
    const V = g.length;
    let T = d.length - 1, j = V - 1;
    for (; x <= T && x <= j; ) {
      const B = d[x], z = g[x] = E ? it(g[x]) : Qe(g[x]);
      if (cn(B, z))
        O(
          B,
          z,
          m,
          null,
          S,
          _,
          P,
          A,
          E
        );
      else
        break;
      x++;
    }
    for (; x <= T && x <= j; ) {
      const B = d[T], z = g[j] = E ? it(g[j]) : Qe(g[j]);
      if (cn(B, z))
        O(
          B,
          z,
          m,
          null,
          S,
          _,
          P,
          A,
          E
        );
      else
        break;
      T--, j--;
    }
    if (x > T) {
      if (x <= j) {
        const B = j + 1, z = B < V ? g[B].el : R;
        for (; x <= j; )
          O(
            null,
            g[x] = E ? it(g[x]) : Qe(g[x]),
            m,
            z,
            S,
            _,
            P,
            A,
            E
          ), x++;
      }
    } else if (x > j)
      for (; x <= T; )
        Fe(d[x], S, _, !0), x++;
    else {
      const B = x, z = x, X = /* @__PURE__ */ new Map();
      for (x = z; x <= j; x++) {
        const we = g[x] = E ? it(g[x]) : Qe(g[x]);
        we.key != null && X.set(we.key, x);
      }
      let J, ae = 0;
      const ve = j - z + 1;
      let je = !1, De = 0;
      const wt = new Array(ve);
      for (x = 0; x < ve; x++) wt[x] = 0;
      for (x = B; x <= T; x++) {
        const we = d[x];
        if (ae >= ve) {
          Fe(we, S, _, !0);
          continue;
        }
        let ge;
        if (we.key != null)
          ge = X.get(we.key);
        else
          for (J = z; J <= j; J++)
            if (wt[J - z] === 0 && cn(we, g[J])) {
              ge = J;
              break;
            }
        ge === void 0 ? Fe(we, S, _, !0) : (wt[ge - z] = x + 1, ge >= De ? De = ge : je = !0, O(
          we,
          g[ge],
          m,
          null,
          S,
          _,
          P,
          A,
          E
        ), ae++);
      }
      const $t = je ? $c(wt) : Gt;
      for (J = $t.length - 1, x = ve - 1; x >= 0; x--) {
        const we = z + x, ge = g[we], kn = g[we + 1], rn = we + 1 < V ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          kn.el || el(kn)
        ) : R;
        wt[x] === 0 ? O(
          null,
          ge,
          m,
          rn,
          S,
          _,
          P,
          A,
          E
        ) : je && (J < 0 || x !== $t[J] ? Ve(ge, m, rn, 2) : J--);
      }
    }
  }, Ve = (d, g, m, R, S = null) => {
    const { el: _, type: P, transition: A, children: E, shapeFlag: x } = d;
    if (x & 6) {
      Ve(d.component.subTree, g, m, R);
      return;
    }
    if (x & 128) {
      d.suspense.move(g, m, R);
      return;
    }
    if (x & 64) {
      P.move(d, g, m, Ge);
      return;
    }
    if (P === Ie) {
      r(_, g, m);
      for (let T = 0; T < E.length; T++)
        Ve(E[T], g, m, R);
      r(d.anchor, g, m);
      return;
    }
    if (P === Zr) {
      K(d, g, m);
      return;
    }
    if (R !== 2 && x & 1 && A)
      if (R === 0)
        A.persisted && !_[Yr] ? r(_, g, m) : (A.beforeEnter(_), r(_, g, m), Pe(() => A.enter(_), S));
      else {
        const { leave: T, delayLeave: j, afterLeave: B } = A, z = () => {
          d.ctx.isUnmounted ? o(_) : r(_, g, m);
        }, X = () => {
          const J = _._isLeaving || !!_[Yr];
          _._isLeaving && _[Yr](
            !0
            /* cancelled */
          ), A.persisted && !J ? z() : T(_, () => {
            z(), B && B();
          });
        };
        j ? j(_, z, X) : X();
      }
    else
      r(_, g, m);
  }, Fe = (d, g, m, R = !1, S = !1) => {
    const {
      type: _,
      props: P,
      ref: A,
      children: E,
      dynamicChildren: x,
      shapeFlag: V,
      patchFlag: T,
      dirs: j,
      cacheIndex: B,
      memo: z
    } = d;
    if (T === -2 && (S = !1), A != null && (ct(), vn(A, null, m, d, !0), ut()), B != null && (g.renderCache[B] = void 0), V & 256) {
      g.ctx.deactivate(d);
      return;
    }
    const X = V & 1 && j, J = !mn(d);
    let ae;
    if (J && (ae = P && P.onVnodeBeforeUnmount) && Ye(ae, g, d), V & 6)
      Vt(d.component, m, R);
    else {
      if (V & 128) {
        d.suspense.unmount(m, R);
        return;
      }
      X && Ct(d, null, g, "beforeUnmount"), V & 64 ? d.type.remove(
        d,
        g,
        m,
        Ge,
        R
      ) : x && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !x.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (_ !== Ie || T > 0 && T & 64) ? He(
        x,
        g,
        m,
        !1,
        !0
      ) : (_ === Ie && T & 384 || !S && V & 16) && He(E, g, m), R && ht(d);
    }
    const ve = z != null && B == null;
    (J && (ae = P && P.onVnodeUnmounted) || X || ve) && Pe(() => {
      ae && Ye(ae, g, d), X && Ct(d, null, g, "unmounted"), ve && (d.el = null);
    }, m);
  }, ht = (d) => {
    const { type: g, el: m, anchor: R, transition: S } = d;
    if (g === Ie) {
      vt(m, R);
      return;
    }
    if (g === Zr) {
      I(d);
      return;
    }
    const _ = () => {
      o(m), S && !S.persisted && S.afterLeave && S.afterLeave();
    };
    if (d.shapeFlag & 1 && S && !S.persisted) {
      const { leave: P, delayLeave: A } = S, E = () => P(m, _);
      A ? A(d.el, _, E) : E();
    } else
      _();
  }, vt = (d, g) => {
    let m;
    for (; d !== g; )
      m = y(d), o(d), d = m;
    o(g);
  }, Vt = (d, g, m) => {
    const { bum: R, scope: S, job: _, subTree: P, um: A, m: E, a: x } = d;
    vs(E), vs(x), R && Wr(R), S.stop(), _ && (_.flags |= 8, Fe(P, d, g, m)), A && Pe(A, g), Pe(() => {
      d.isUnmounted = !0;
    }, g);
  }, He = (d, g, m, R = !1, S = !1, _ = 0) => {
    for (let P = _; P < d.length; P++)
      Fe(d[P], g, m, R, S);
  }, Bt = (d) => {
    if (d.shapeFlag & 6)
      return Bt(d.component.subTree);
    if (d.shapeFlag & 128)
      return d.suspense.next();
    const g = y(d.anchor || d.el), m = g && g[sc];
    return m ? y(m) : g;
  };
  let mt = !1;
  const Be = (d, g, m) => {
    let R;
    d == null ? g._vnode && (Fe(g._vnode, null, null, !0), R = g._vnode.component) : O(
      g._vnode || null,
      d,
      g,
      null,
      null,
      null,
      m
    ), g._vnode = d, mt || (mt = !0, is(R), Ei(), mt = !1);
  }, Ge = {
    p: O,
    um: Fe,
    m: Ve,
    r: ht,
    mt: Ae,
    mc: k,
    pc: ne,
    pbc: q,
    n: Bt,
    o: e
  };
  return {
    render: Be,
    hydrate: void 0,
    createApp: Cc(Be)
  };
}
function Jr({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Mt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Bc(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Zi(e, t, n = !1) {
  const r = e.children, o = t.children;
  if (N(r) && N(o))
    for (let s = 0; s < r.length; s++) {
      const i = r[s];
      let l = o[s];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = o[s] = it(o[s]), l.el = i.el), !n && l.patchFlag !== -2 && Zi(i, l)), l.type === Rr && (l.patchFlag === -1 && (l = o[s] = it(l)), l.el = i.el), l.type === dt && !l.el && (l.el = i.el);
    }
}
function $c(e) {
  const t = e.slice(), n = [0];
  let r, o, s, i, l;
  const a = e.length;
  for (r = 0; r < a; r++) {
    const u = e[r];
    if (u !== 0) {
      if (o = n[n.length - 1], e[o] < u) {
        t[r] = o, n.push(r);
        continue;
      }
      for (s = 0, i = n.length - 1; s < i; )
        l = s + i >> 1, e[n[l]] < u ? s = l + 1 : i = l;
      u < e[n[s]] && (s > 0 && (t[r] = n[s - 1]), n[s] = r);
    }
  }
  for (s = n.length, i = n[s - 1]; s-- > 0; )
    n[s] = i, i = t[i];
  return n;
}
function Qi(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Qi(t);
}
function vs(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function el(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? el(t.subTree) : null;
}
const tl = (e) => e.__isSuspense;
function Nc(e, t) {
  t && t.pendingBranch ? N(e) ? t.effects.push(...e) : t.effects.push(e) : Qa(e);
}
const Ie = /* @__PURE__ */ Symbol.for("v-fgt"), Rr = /* @__PURE__ */ Symbol.for("v-txt"), dt = /* @__PURE__ */ Symbol.for("v-cmt"), Zr = /* @__PURE__ */ Symbol.for("v-stc"), Tt = [];
let ke = null;
function fe(e = !1) {
  Tt.push(ke = e ? null : []);
}
function nl() {
  Tt.pop(), ke = Tt[Tt.length - 1] || null;
}
let Sn = 1;
function ms(e, t = !1) {
  Sn += e, e < 0 && ke && t && (ke.hasOnce = !0);
}
function rl(e) {
  return e.dynamicChildren = Sn > 0 ? ke || Gt : null, nl(), Sn > 0 && ke && ke.push(e), e;
}
function de(e, t, n, r, o, s) {
  return rl(
    Je(
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
  return rl(
    at(
      e,
      t,
      n,
      r,
      o,
      !0
    )
  );
}
function ol(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function cn(e, t) {
  return e.type === t.type && e.key === t.key;
}
const sl = ({ key: e }) => e ?? null, Qn = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? pe(e) || /* @__PURE__ */ xe(e) || U(e) ? { i: tt, r: e, k: t, f: !!n } : e : null);
function Je(e, t = null, n = null, r = 0, o = null, s = e === Ie ? 0 : 1, i = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && sl(t),
    ref: t && Qn(t),
    scopeId: Oi,
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
    ctx: tt
  };
  return l ? (ar(a, n), s & 128 && e.normalize(a)) : n && (a.shapeFlag |= pe(n) ? 8 : 16), Sn > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  ke && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && ke.push(a), a;
}
const at = Uc;
function Uc(e, t = null, n = null, r = 0, o = null, s = !1) {
  if ((!e || e === mc) && (e = dt), ol(e)) {
    const l = Qt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && ar(l, n), Sn > 0 && !s && ke && (l.shapeFlag & 6 ? ke[ke.indexOf(e)] = l : ke.push(l)), l.patchFlag = -2, l;
  }
  if (ru(e) && (e = e.__vccOpts), t) {
    t = zc(t);
    let { class: l, style: a } = t;
    l && !pe(l) && (t.class = Et(l)), re(a) && (/* @__PURE__ */ ko(a) && !N(a) && (a = Se({}, a)), t.style = Yt(a));
  }
  const i = pe(e) ? 1 : tl(e) ? 128 : _r(e) ? 64 : re(e) ? 4 : U(e) ? 2 : 0;
  return Je(
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
function zc(e) {
  return e ? /* @__PURE__ */ ko(e) || zi(e) ? Se({}, e) : e : null;
}
function Qt(e, t, n = !1, r = !1) {
  const { props: o, ref: s, patchFlag: i, children: l, transition: a } = e, u = t ? Gc(o || {}, t) : o, f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: u,
    key: u && sl(u),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && s ? N(s) ? s.concat(Qn(t)) : [s, Qn(t)] : Qn(t)
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
    ssContent: e.ssContent && Qt(e.ssContent),
    ssFallback: e.ssFallback && Qt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return a && r && Ho(
    f,
    a.clone(f)
  ), f;
}
function qc(e = " ", t = 0) {
  return at(Rr, null, e, t);
}
function Ut(e = "", t = !1) {
  return t ? (fe(), Wc(dt, null, e)) : at(dt, null, e);
}
function Qe(e) {
  return e == null || typeof e == "boolean" ? at(dt) : N(e) ? at(
    Ie,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : ol(e) ? it(e) : at(Rr, null, String(e));
}
function it(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Qt(e);
}
function ar(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (N(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), ar(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !zi(t) ? t._ctx = tt : o === 3 && tt && (tt.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (U(t)) {
    if (r & 65) {
      ar(e, { default: t });
      return;
    }
    t = { default: t, _ctx: tt }, n = 32;
  } else
    t = String(t), r & 64 ? (n = 16, t = [qc(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function Gc(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === "class")
        t.class !== r.class && (t.class = Et([t.class, r.class]));
      else if (o === "style")
        t.style = Yt([t.style, r.style]);
      else if (pr(o)) {
        const s = t[o], i = r[o];
        i && s !== i && !(N(s) && s.includes(i)) ? t[o] = s ? [].concat(s, i) : i : i == null && s == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !gr(o) && (t[o] = i);
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
const Yc = Bi();
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
    scope: new Sa(
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
    propsOptions: Gi(r, o),
    emitsOptions: $i(r, o),
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
  return s.ctx = { _: s }, s.root = t ? t.root : s, s.emit = Ic.bind(null, s), e.ce && e.ce(s), s;
}
let Ee = null;
const Zc = () => Ee || tt;
let cr, Rn;
{
  const e = vr(), t = (n, r) => {
    let o;
    return (o = e[n]) || (o = e[n] = []), o.push(r), (s) => {
      o.length > 1 ? o.forEach((i) => i(s)) : o[0](s);
    };
  };
  cr = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Ee = n
  ), Rn = t(
    "__VUE_SSR_SETTERS__",
    (n) => Cn = n
  );
}
const On = (e) => {
  const t = Ee;
  return cr(e), e.scope.on(), () => {
    e.scope.off(), cr(t);
  };
}, ws = () => {
  Ee && Ee.scope.off(), cr(null);
};
function il(e) {
  return e.vnode.shapeFlag & 4;
}
let Cn = !1;
function Qc(e, t = !1, n = !1) {
  t && Rn(t);
  const { props: r, children: o } = e.vnode, s = il(e);
  Dc(e, r, s, t), jc(e, o, n || t);
  const i = s ? eu(e, t) : void 0;
  return t && Rn(!1), i;
}
function eu(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, wc);
  const { setup: r } = n;
  if (r) {
    ct();
    const o = e.setupContext = r.length > 1 ? nu(e) : null, s = On(e), i = An(
      r,
      e,
      0,
      [
        e.props,
        o
      ]
    ), l = ti(i);
    if (ut(), s(), (l || e.sp) && !mn(e) && ki(e), l) {
      if (i.then(ws, ws), t)
        return i.then((a) => {
          Rn(!0);
          try {
            ys(e, a, t);
          } finally {
            Rn(!1);
          }
        }).catch((a) => {
          br(a, e, 0);
        });
      e.asyncDep = i;
    } else
      ys(e, i);
  } else
    ll(e);
}
function ys(e, t, n) {
  U(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : re(t) && (e.setupState = Ci(t)), ll(e);
}
function ll(e, t, n) {
  const r = e.type;
  e.render || (e.render = r.render || nt);
  {
    const o = On(e);
    ct();
    try {
      yc(e);
    } finally {
      ut(), o();
    }
  }
}
const tu = {
  get(e, t) {
    return _e(e, "get", ""), e[t];
  }
};
function nu(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, tu),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Vo(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Ci(Na(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in wn)
        return wn[n](e);
    },
    has(t, n) {
      return n in t || n in wn;
    }
  })) : e.proxy;
}
function ru(e) {
  return U(e) && "__vccOpts" in e;
}
const Y = (e, t) => /* @__PURE__ */ Ga(e, t, Cn), ou = "3.5.42";
/**
* @vue/runtime-dom v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let mo;
const bs = typeof window < "u" && window.trustedTypes;
if (bs)
  try {
    mo = /* @__PURE__ */ bs.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const al = mo ? (e) => mo.createHTML(e) : (e) => e, su = "http://www.w3.org/2000/svg", iu = "http://www.w3.org/1998/Math/MathML", st = typeof document < "u" ? document : null, _s = st && /* @__PURE__ */ st.createElement("template"), lu = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const o = t === "svg" ? st.createElementNS(su, e) : t === "mathml" ? st.createElementNS(iu, e) : n ? st.createElement(e, { is: n }) : st.createElement(e);
    return e === "select" && r && r.multiple != null && o.setAttribute("multiple", r.multiple), o;
  },
  createText: (e) => st.createTextNode(e),
  createComment: (e) => st.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => st.querySelector(e),
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
      _s.innerHTML = al(
        r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e
      );
      const l = _s.content;
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
}, au = /* @__PURE__ */ Symbol("_vtc");
function cu(e, t, n) {
  const r = e[au];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const xs = /* @__PURE__ */ Symbol("_vod"), uu = /* @__PURE__ */ Symbol("_vsh"), fu = /* @__PURE__ */ Symbol(""), du = /(?:^|;)\s*display\s*:/;
function pu(e, t, n) {
  const r = e.style, o = pe(n);
  let s = !1;
  if (n && !o) {
    if (t)
      if (pe(t))
        for (const i of t.split(";")) {
          const l = i.slice(0, i.indexOf(":")).trim();
          n[l] == null && dn(r, l, "");
        }
      else
        for (const i in t)
          n[i] == null && dn(r, i, "");
    for (const i in n) {
      i === "display" && (s = !0);
      const l = n[i];
      l != null ? hu(
        e,
        i,
        !pe(t) && t ? t[i] : void 0,
        l
      ) || dn(r, i, l) : dn(r, i, "");
    }
  } else if (o) {
    if (t !== n) {
      const i = r[fu];
      i && (n += ";" + i), r.cssText = n, s = du.test(n);
    }
  } else t && e.removeAttribute("style");
  xs in e && (e[xs] = s ? r.display : "", e[uu] && (r.display = "none"));
}
const Un = /\s*!important$/;
function dn(e, t, n) {
  if (N(n))
    n.forEach((r) => dn(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--"))
    Un.test(n) ? e.setProperty(t, n.replace(Un, ""), "important") : e.setProperty(t, n);
  else {
    const r = gu(e, t);
    Un.test(n) ? e.setProperty(
      jt(r),
      n.replace(Un, ""),
      "important"
    ) : e[r] = n;
  }
}
const Ss = ["Webkit", "Moz", "ms"], Qr = {};
function gu(e, t) {
  const n = Qr[t];
  if (n)
    return n;
  let r = Ne(t);
  if (r !== "filter" && r in e)
    return Qr[t] = r;
  r = oi(r);
  for (let o = 0; o < Ss.length; o++) {
    const s = Ss[o] + r;
    if (s in e)
      return Qr[t] = s;
  }
  return t;
}
function hu(e, t, n, r) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && pe(r) && n === r;
}
const Rs = "http://www.w3.org/1999/xlink";
function Cs(e, t, n, r, o, s = _a(t)) {
  r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Rs, t.slice(6, t.length)) : e.setAttributeNS(Rs, t, n) : n == null || s && !ii(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    s ? "" : rt(n) ? String(n) : n
  );
}
function Ms(e, t, n, r, o) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? al(n) : n);
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
    l === "boolean" ? n = ii(n) : n == null && l === "string" ? (n = "", i = !0) : l === "number" && (n = 0, i = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  i && e.removeAttribute(o || t);
}
function vu(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function mu(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const Is = /* @__PURE__ */ Symbol("_vei");
function wu(e, t, n, r, o = null) {
  const s = e[Is] || (e[Is] = {}), i = s[t];
  if (r && i)
    i.value = r;
  else {
    const [l, a] = _u(t);
    if (r) {
      const u = s[t] = Ru(
        r,
        o
      );
      vu(e, l, u, a);
    } else i && (mu(e, l, i, a), s[t] = void 0);
  }
}
const yu = /(Once|Passive|Capture)$/, bu = /^on:?(?:Once|Passive|Capture)$/;
function _u(e) {
  let t, n;
  for (; (n = e.match(yu)) && !bu.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : jt(e.slice(2)), t];
}
let eo = 0;
const xu = /* @__PURE__ */ Promise.resolve(), Su = () => eo || (xu.then(() => eo = 0), eo = Date.now());
function Ru(e, t) {
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
        const u = i[a];
        u && ze(
          u,
          t,
          5,
          l
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
  return n.value = e, n.attached = Su(), n;
}
const Es = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Cu = (e, t, n, r, o, s) => {
  const i = o === "svg";
  t === "class" ? cu(e, r, i) : t === "style" ? pu(e, n, r) : pr(t) ? gr(t) || wu(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Mu(e, t, r, i)) ? (Ms(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Cs(e, t, r, i, s, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Iu(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !pe(r))) ? Ms(e, Ne(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), Cs(e, t, r, i));
};
function Mu(e, t, n, r) {
  if (r)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Es(t) && U(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return Es(t) && pe(n) ? !1 : t in e;
}
function Iu(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const r = Ne(t);
  return Array.isArray(n) ? n.some((o) => Ne(o) === r) : Object.keys(n).some((o) => Ne(o) === r);
}
const Eu = ["ctrl", "shift", "alt", "meta"], Au = {
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
  exact: (e, t) => Eu.some((n) => e[`${n}Key`] && !t.includes(n))
}, As = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), r = t.join(".");
  return n[r] || (n[r] = (o, ...s) => {
    for (let i = 0; i < t.length; i++) {
      const l = Au[t[i]];
      if (l && l(o, t)) return;
    }
    return e(o, ...s);
  });
}, Ou = /* @__PURE__ */ Se({ patchProp: Cu }, lu);
let Os;
function Pu() {
  return Os || (Os = Kc(Ou));
}
const Tu = (...e) => {
  const t = Pu().createApp(...e), { mount: n } = t;
  return t.mount = (r) => {
    const o = ku(r);
    if (!o) return;
    const s = t._component;
    !U(s) && !s.render && !s.template && (s.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const i = n(o, !1, Du(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), i;
  }, t;
};
function Du(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function ku(e) {
  return pe(e) ? document.querySelector(e) : e;
}
function zn() {
  return !0;
}
const Fu = Symbol("merge-proxy"), er = Symbol("merge-proxy-sources"), Hu = {
  get(e, t, n) {
    return t === Fu ? n : t === er ? e.sources : e.get(t);
  },
  has(e, t) {
    return e.has(t);
  },
  set: zn,
  deleteProperty: zn,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: zn,
      deleteProperty: zn
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function tr(e) {
  return e && typeof e == "object" && "value" in e ? e.value : e;
}
function wo(...e) {
  const t = e.flatMap((n) => typeof n == "object" && n !== null && er in n && Array.isArray(n[er]) ? n[er] : [n]);
  return new Proxy({
    sources: t,
    get(n) {
      for (let r = t.length - 1; r >= 0; r--) {
        const o = tr(t[r])[n];
        if (o !== void 0) return o;
      }
    },
    has(n) {
      for (let r = t.length - 1; r >= 0; r--) if (n in tr(t[r])) return !0;
      return !1;
    },
    keys() {
      const n = [];
      for (const r of t) n.push(...Object.keys(tr(r)));
      return [...Array.from(new Set(n))];
    }
  }, Hu);
}
function Ps(...e) {
  const t = {};
  for (let n of e)
    if (n = tr(n), !!n)
      for (const r of Reflect.ownKeys(n)) {
        const o = n[r];
        o !== void 0 && (t[r] = o);
      }
  return t;
}
function cl(e) {
  return typeof e == "function" ? e : (t) => {
    var n;
    return (n = e.next) == null ? void 0 : n.call(e, t);
  };
}
function ju(e) {
  return Object.assign(e, {
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: be(e, cl(t), { flush: "sync" }) })
  });
}
function Lu(e) {
  return Object.assign(e, {
    set: (t) => {
      e.value = typeof t == "function" ? t(e.value) : t;
    },
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: be(e, cl(t), { flush: "sync" }) })
  });
}
function Ku() {
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
    createReadonlyAtom: (t, n) => ju(Y(() => t())),
    createWritableAtom: (t, n) => Lu(/* @__PURE__ */ Wa(t)),
    untrack: (t) => t(),
    batch: (t) => t()
  };
}
function Cr(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Rt(e) {
  if (Array.isArray(e)) return e.map(Rt);
  if (e && typeof e == "object") {
    const t = Object.getPrototypeOf(e);
    if (t !== Object.prototype && t !== null) return e;
    const n = t === null ? oe() : {}, r = Object.keys(e);
    for (let o = 0; o < r.length; o++) {
      const s = r[o];
      Object.defineProperty(n, s, {
        configurable: !0,
        enumerable: !0,
        value: Rt(e[s]),
        writable: !0
      });
    }
    return n;
  }
  return e;
}
function Vu(e, t) {
  const n = Object.keys(t), r = e;
  for (let o = 0; o < n.length; o++) {
    const s = n[o];
    !s.startsWith("_memo_") && s !== "_cellsCache" && (r[s] = t[s]);
  }
  return e;
}
function oe() {
  return /* @__PURE__ */ Object.create(null);
}
function en(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function ul(e, t) {
  return (n) => {
    var r;
    (((r = t.options.atoms) == null ? void 0 : r[e]) ?? t.baseAtoms[e]).set((o) => Cr(n, o));
  };
}
function Ts(e) {
  if (typeof e != "object" || e === null) return !1;
  if (Array.isArray(e)) return !0;
  const t = Object.getPrototypeOf(e);
  return t === Object.prototype || t === null;
}
function Ds(e) {
  return Reflect.ownKeys(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
const Bu = 3;
function $u(e, t) {
  return fl(e, t, Bu);
}
function fl(e, t, n) {
  if (Object.is(e, t)) return !0;
  if (n <= 0 || !Ts(e) || !Ts(t) || (Array.isArray(e) || Array.isArray(t)) && (!Array.isArray(e) || !Array.isArray(t) || e.length !== t.length))
    return !1;
  const r = Ds(e), o = Ds(t);
  if (r.length !== o.length) return !1;
  const s = e, i = t;
  for (let l = 0; l < r.length; l++) {
    const a = r[l];
    if (!Object.prototype.propertyIsEnumerable.call(t, a) || !fl(s[a], i[a], n - 1)) return !1;
  }
  return !0;
}
function Mr(e, t, n, r = $u) {
  const o = `on${t.charAt(0).toUpperCase()}${t.slice(1)}Change`, s = e.options[o];
  s && s((i) => {
    const l = Cr(n, i);
    return r(i, l) ? i : l;
  });
}
function Nu(e, t) {
  const n = [], r = (o) => {
    o.forEach((s) => {
      n.push(s);
      const i = t(s);
      i.length && r(i);
    });
  };
  return r(e), n;
}
const Wu = ({ fn: e, memoDeps: t, onAfterCompare: n, onAfterUpdate: r, onBeforeCompare: o, onBeforeUpdate: s }) => {
  let i = [], l;
  return (u) => {
    o == null || o();
    const f = t == null ? void 0 : t(u);
    let h = !f || f.length !== (i == null ? void 0 : i.length);
    if (!h && f) {
      for (let y = 0; y < f.length; y++) if (f[y] !== i[y]) {
        h = !0;
        break;
      }
    }
    return n == null || n(h), h && (i = f, s == null || s(), l = e(...f ?? []), r == null || r(l)), l;
  };
};
function Uu(e) {
  let t = !1;
  return () => {
    if (!t) {
      t = !0;
      return;
    }
    e();
  };
}
function Ir({ feature: e, fnName: t, objectId: n, onAfterUpdate: r, table: o, ...s }) {
  const i = () => {
    if (!r) return;
    const { schedule: a, untrack: u } = o._reactivity;
    a(() => u(() => r()));
  };
  return Wu({
    ...s,
    ...{ onAfterUpdate: () => {
      i();
    } }
  });
}
function dl(e, t = "_") {
  const [n, r] = e.split(t);
  return {
    fnKey: r,
    fnName: `${n}.${r}`,
    parentName: n
  };
}
function Lt(e, t, n) {
  for (const [r, { fn: o, memoDeps: s }] of Object.entries(n)) {
    const { fnKey: i, fnName: l } = dl(r);
    t[i] = s ? Ir({
      memoDeps: s,
      fn: o,
      fnName: l,
      table: t,
      feature: e
    }) : o;
  }
}
function tn(e, t, n, r) {
  for (const [o, { fn: s, memoDeps: i }] of Object.entries(r)) {
    const { fnKey: l, fnName: a } = dl(o);
    if (i) {
      const u = `_memo_${l}`;
      t[l] = function(...f) {
        if (!this[u]) {
          const h = this;
          this[u] = Ir({
            memoDeps: (y) => i(h, y),
            fn: (...y) => s(h, ...y),
            fnName: a,
            objectId: h.id,
            table: n,
            feature: e
          });
        }
        return this[u](...f);
      };
    } else t[l] = function(...u) {
      return s(this, ...u);
    };
  }
}
function ye(e, t, n, ...r) {
  var o;
  return ((o = e[t]) == null ? void 0 : o.call(e, ...r)) ?? n(e, ...r);
}
function zu(e) {
  return e.row.getValue(e.column.id);
}
function qu(e) {
  return e.getValue() ?? e.table.options.renderFallbackValue;
}
function Gu(e) {
  return {
    table: e.table,
    column: e.column,
    row: e.row,
    cell: e,
    getValue: () => e.getValue(),
    renderValue: () => e.renderValue()
  };
}
const Yu = { assignCellPrototype: (e, t) => {
  tn("coreCellsFeature", e, t, {
    cell_getValue: { fn: (n) => zu(n) },
    cell_renderValue: { fn: (n) => qu(n) },
    cell_getContext: {
      fn: (n) => Gu(n),
      memoDeps: (n) => [n]
    }
  });
} };
function Xu(e) {
  var t, n;
  if (!e._headerPrototype) {
    e._headerPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignHeaderPrototype) == null || n.call(t, e._headerPrototype, e);
  }
  return e._headerPrototype;
}
function pl(e, t, n) {
  const r = Xu(e), o = Object.create(r);
  o.colSpan = 0, o.column = t, o.depth = n.depth, o.headerGroup = null, o.id = n.id ?? t.id, o.index = n.index, o.isPlaceholder = !!n.isPlaceholder, o.placeholderId = n.placeholderId, o.rowSpan = 0, o.subHeaders = [];
  const s = e._headerInstanceInitFns;
  for (let i = 0; i < s.length; i++) s[i](o);
  return o;
}
function Ju() {
  return {
    start: [],
    end: []
  };
}
function kt(e) {
  var r;
  const t = (r = e.table.atoms.columnVisibility) == null ? void 0 : r.get();
  if (!t) return !0;
  const n = e.columns;
  return n.length ? n.some((o) => ye(o, "getIsVisible", kt)) : (en(t, e.id) ? t[e.id] : void 0) ?? !0;
}
function Zu(e) {
  return e.getAllLeafColumns().filter((t) => ye(t, "getIsVisible", kt));
}
function gl(e, t = 1) {
  let n = t;
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    ye(o, "getIsVisible", kt) && o.columns.length && (n = Math.max(n, gl(o.columns, t + 1)));
  }
  return n;
}
function Qu(e, t) {
  return String(t);
}
function ef(e, t, n, r) {
  let o = e ?? "";
  return t && (o = o ? `${o}_${t}` : String(t)), n && (o = o ? `${o}_${n}` : n), r && (o = o ? `${o}_${r}` : r), o;
}
function tf(e, t) {
  let n = 0;
  for (let r = 0; r < e.length; r++) e[r].column === t && n++;
  return n;
}
function hl(e, t, n, r, o, s) {
  const i = {
    depth: t,
    id: Qu(r, t),
    headers: []
  }, l = [];
  for (let a = 0; a < e.length; a++) {
    if (!(a in e)) continue;
    const u = e[a], f = l[l.length - 1], h = u.column.depth === i.depth;
    let y, w = !1;
    if (h && u.column.parent ? y = u.column.parent : (y = u.column, w = !0), f && f.column === y) f.subHeaders.push(u);
    else {
      const M = pl(n, y, {
        id: ef(r, t, y.id, u.id),
        isPlaceholder: w,
        placeholderId: w ? String(tf(l, y)) : void 0,
        depth: t,
        index: l.length
      });
      M.subHeaders.push(u), l.push(M);
    }
    i.headers.push(u), u.headerGroup = i;
  }
  for (let a = 0; a < s.length; a++) s[a](i);
  o.push(i), t > 0 && hl(l, t - 1, n, r, o, s);
}
function vl(e) {
  for (let t = 0; t < e.length; t++) {
    const n = e[t];
    if (!ye(n.column, "getIsVisible", kt)) continue;
    let r = 0;
    if (n.subHeaders.length) {
      vl(n.subHeaders);
      for (let o = 0; o < n.subHeaders.length; o++) {
        const s = n.subHeaders[o];
        ye(s.column, "getIsVisible", kt) && (r += s.colSpan);
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
function ks(e, t, n, r) {
  var a;
  const o = gl(e), s = [], i = n._headerGroupInstanceInitFns, l = new Array(t.length);
  for (let u = 0; u < t.length; u++)
    u in t && (l[u] = pl(n, t[u], {
      depth: o,
      index: u
    }));
  return hl(l, o - 1, n, r, s, i), s.reverse(), vl(((a = s[0]) == null ? void 0 : a.headers) ?? []), s;
}
function nf(e) {
  var t, n;
  if (!e._columnPrototype) {
    e._columnPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignColumnPrototype) == null || n.call(t, e._columnPrototype, e);
  }
  return e._columnPrototype;
}
function rf(e, t, n, r) {
  const o = {
    ...e.getDefaultColumnDef(),
    ...t
  }, s = o.accessorKey, i = s === void 0 ? void 0 : String(s), l = o.id ?? (i == null ? void 0 : i.replaceAll(".", "_")) ?? (typeof o.header == "string" ? o.header : void 0);
  let a;
  if (o.accessorFn) a = o.accessorFn;
  else if (s !== void 0) if (typeof s == "string" && s.includes(".")) {
    const y = s.split(".");
    a = (w) => {
      let M = w;
      for (let O = 0; O < y.length; O++) {
        const D = y[O];
        M = M == null ? void 0 : M[D];
      }
      return M;
    };
  } else a = (y) => y[o.accessorKey];
  if (!l)
    throw new Error();
  const u = nf(e), f = Object.create(u);
  f.accessorFn = a, f.columnDef = o, f.columns = [], f.depth = n, f.id = `${String(l)}`, f.parent = r;
  const h = e._columnInstanceInitFns;
  for (let y = 0; y < h.length; y++) h[y](f);
  return f;
}
function ml(e) {
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
    return of(e, o);
  };
}
function of(e, t) {
  var l;
  const n = ((l = e.atoms.grouping) == null ? void 0 : l.get()) ?? [], { groupedColumnMode: r } = e.options;
  if (!n.length || !r) return t;
  const o = t.filter((a) => !n.includes(a.id));
  if (r === "remove") return o;
  const s = /* @__PURE__ */ new Map();
  for (let a = 0; a < t.length; a++) {
    const u = t[a];
    s.set(u.id, u);
  }
  const i = [];
  for (let a = 0; a < n.length; a++) {
    const u = s.get(n[a]);
    u && i.push(u);
  }
  return [...i, ...o];
}
function sf(e) {
  return [e, ...e.columns.flatMap((t) => t.getFlatColumns())];
}
function lf(e) {
  if (e.columns.length) {
    const t = e.columns.flatMap((n) => n.getLeafColumns());
    return ye(e.table, "getOrderColumns", ml)(t);
  }
  return [e];
}
function af(e) {
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
function wl(e, t, n, r = 0) {
  const o = new Array(t.length);
  for (let s = 0; s < t.length; s++) {
    if (!(s in t)) continue;
    const i = t[s], l = rf(e, i, r, n), a = i;
    l.columns = a.columns ? wl(e, a.columns, l, r + 1) : [], o[s] = l;
  }
  return o;
}
function cf(e) {
  return wl(e, e.options.columns);
}
function uf(e) {
  return e.getAllColumns().flatMap((t) => t.getFlatColumns());
}
function ff(e) {
  const t = oe(), n = e.getAllFlatColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function df(e) {
  const t = e.getAllColumns().flatMap((n) => n.getLeafColumns());
  return ye(e, "getOrderColumns", ml)(t);
}
function pf(e) {
  const t = oe(), n = e.getAllLeafColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function gf(e, t) {
  return e.getAllFlatColumnsById()[t];
}
const hf = {
  assignColumnPrototype: (e, t) => {
    tn("coreColumnsFeature", e, t, {
      column_getFlatColumns: {
        fn: (n) => sf(n),
        memoDeps: (n) => [n.table.options.columns]
      },
      column_getLeafColumns: {
        fn: (n) => lf(n),
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
    Lt("coreColumnsFeature", e, {
      table_getDefaultColumnDef: {
        fn: () => af(e),
        memoDeps: () => [e.options.defaultColumn]
      },
      table_getAllColumns: {
        fn: () => cf(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumns: {
        fn: () => uf(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumnsById: {
        fn: () => ff(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllLeafColumns: {
        fn: () => df(e),
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
        fn: () => pf(e),
        memoDeps: () => [e.getAllLeafColumns()]
      },
      table_getColumn: { fn: (t) => gf(e, t) }
    });
  }
};
function yl(e, t) {
  for (let n = 0; n < e.subHeaders.length; n++) yl(e.subHeaders[n], t);
  t.push(e);
}
function vf(e) {
  const t = [];
  return yl(e, t), t;
}
function mf(e) {
  return {
    column: e.column,
    header: e,
    table: e.column.table
  };
}
function wf(e) {
  var u;
  const { start: t, end: n } = ((u = e.atoms.columnPinning) == null ? void 0 : u.get()) ?? Ju(), r = e.getAllColumns(), o = ye(e, "getVisibleLeafColumns", Zu);
  if (!t.length && !n.length) return ks(r, o, e);
  const s = e.getAllLeafColumnsById(), i = [];
  for (let f = 0; f < t.length; f++) {
    const h = s[t[f]];
    h && ye(h, "getIsVisible", kt) && i.push(h);
  }
  const l = [];
  for (let f = 0; f < n.length; f++) {
    const h = s[n[f]];
    h && ye(h, "getIsVisible", kt) && l.push(h);
  }
  const a = o.filter((f) => !t.includes(f.id) && !n.includes(f.id));
  return ks(r, [
    ...i,
    ...a,
    ...l
  ], e);
}
function yf(e) {
  return [...e.getHeaderGroups()].reverse();
}
function bf(e) {
  const t = e.getHeaderGroups(), n = [];
  for (let r = 0; r < t.length; r++) {
    const o = t[r].headers;
    for (let s = 0; s < o.length; s++) n.push(o[s]);
  }
  return n;
}
function _f(e) {
  var r;
  const t = ((r = e.getHeaderGroups()[0]) == null ? void 0 : r.headers) ?? [], n = [];
  for (let o = 0; o < t.length; o++) {
    const s = t[o].getLeafHeaders();
    for (let i = 0; i < s.length; i++) n.push(s[i]);
  }
  return n;
}
const xf = {
  assignHeaderPrototype: (e, t) => {
    tn("coreHeadersFeature", e, t, {
      header_getLeafHeaders: {
        fn: (n) => vf(n),
        memoDeps: (n) => [n.column.table.options.columns]
      },
      header_getContext: {
        fn: (n) => mf(n),
        memoDeps: (n) => [n.column.table.options.columns]
      }
    });
  },
  constructTableAPIs: (e) => {
    Lt("coreHeadersFeature", e, {
      table_getHeaderGroups: {
        fn: () => wf(e),
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
        fn: () => yf(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getFlatHeaders: {
        fn: () => bf(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getLeafHeaders: {
        fn: () => _f(e),
        memoDeps: () => [e.getHeaderGroups()]
      }
    });
  }
};
function Sf(e) {
  var t, n;
  if (!e._rowPrototype) {
    e._rowPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignRowPrototype) == null || n.call(t, e._rowPrototype, e);
  }
  return e._rowPrototype;
}
const Rf = (e, t, n, r, o, s, i) => {
  const l = Sf(e), a = Object.create(l);
  a._displayIndexCache = -1, a._uniqueValuesCache = oe(), a._valuesCache = oe(), a.depth = o, a.id = t, a.index = r, a.original = n, a.parentId = i, a.subRows = [];
  const u = e._rowInstanceInitFns;
  for (let f = 0; f < u.length; f++) u[f](a);
  return a;
};
function Cf() {
  return [];
}
function Mf(e, t) {
  Mr(e, "cellSelection", Rt(e.initialState.cellSelection) ?? Cf());
}
function If(e) {
  e.atoms.cellSelection && (e.options.autoResetAll ?? e.options.autoResetCellSelection ?? !0) && e._reactivity.schedule(() => Mf(e));
}
function Ef() {
  return oe();
}
function bl(e) {
  e.atoms.expanded && (e.options.autoResetAll ?? e.options.autoResetExpanded ?? !e.options.manualExpanding) && e._reactivity.schedule(() => xl(e));
}
function ur(e, t) {
  var n, r;
  (r = (n = e.options).onExpandedChange) == null || r.call(n, t);
}
function _l(e, t) {
  var r;
  const n = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t ?? !Rl(e)) {
    if (n === !0 || !Sl(e)) return;
    ur(e, !0);
  } else {
    if (n !== !0 && !Object.keys(n).length) return;
    ur(e, oe());
  }
}
function xl(e, t) {
  const n = e.initialState.expanded;
  Mr(e, "expanded", t ? oe() : n === !0 ? !0 : Object.assign(oe(), Rt(n ?? {})));
}
function Sl(e) {
  return e.getPrePaginatedRowModel().flatRows.some((t) => Ft(t));
}
function Af(e) {
  return (t) => {
    _l(e);
  };
}
function Of(e) {
  var n;
  const t = ((n = e.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return t === !0 || Object.values(t).some(Boolean);
}
function Rl(e) {
  var r;
  const t = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t === !0) return !0;
  if (!Object.keys(t).length) return !1;
  const n = e.getRowModel().flatRows.filter((o) => Ft(o));
  return !(!n.length || n.some((o) => !Er(o)));
}
function Pf(e) {
  var r;
  let t = 0;
  const n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return (n === !0 ? Object.values(e.getRowModel().rowsById).filter((o) => Ft(o)).map((o) => o.id) : Object.keys(n ?? {})).forEach((o) => {
    const s = o.split(".");
    t = Math.max(t, s.length);
  }), t;
}
function Cl(e, t) {
  var s;
  const n = ((s = e.table.atoms.expanded) == null ? void 0 : s.get()) ?? {}, r = n === !0 || yo(n, e.id), o = t ?? !r;
  o !== r && (o && !Ft(e) || ur(e.table, (i) => {
    const l = i === !0 ? !0 : yo(i, e.id);
    let a = oe();
    if (i === !0 ? Object.values(e.table.getRowModel().rowsById).forEach((u) => {
      Ft(u) && (a[u.id] = !0);
    }) : a = Object.assign(oe(), i), !l && o)
      return a[e.id] = !0, a;
    if (l && !o) {
      const u = oe(), f = Object.keys(a);
      for (let h = 0; h < f.length; h++) {
        const y = f[h];
        y !== e.id && a[y] && (u[y] = !0);
      }
      return u;
    }
    return i;
  }));
}
function Er(e) {
  var n, r, o;
  const t = ((n = e.table.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return !!(((o = (r = e.table.options).getIsRowExpanded) == null ? void 0 : o.call(r, e)) ?? (t === !0 || yo(t, e.id)));
}
function yo(e, t) {
  return !!(e && e !== !0 && en(e, t) && e[t]);
}
function Ft(e) {
  var t, n;
  return ((n = (t = e.table.options).getRowCanExpand) == null ? void 0 : n.call(t, e)) ?? ((e.table.options.enableExpanding ?? !0) && !!e.subRows.length);
}
function Tf(e) {
  let t = !0, n = e;
  for (; t && n.parentId; )
    n = e.table.getRow(n.parentId, !0), t = Er(n);
  return t;
}
function Df(e) {
  const t = Ft(e);
  return () => {
    t && Cl(e);
  };
}
const bo = 0;
function kf(e) {
  var t, n;
  if (e.options.autoResetAll ?? e.options.autoResetPageIndex ?? !e.options.manualPagination) {
    if ((((n = (t = e.atoms.pagination) == null ? void 0 : t.get()) == null ? void 0 : n.pageIndex) ?? bo) === bo) return;
    jf(e);
  }
}
function Ff(e, t) {
  Mr(e, "pagination", t);
}
function Hf(e, t) {
  Ff(e, (n) => {
    let r = Cr(t, n.pageIndex);
    const o = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
    return r = Math.max(0, Math.min(r, o)), {
      ...n,
      pageIndex: r
    };
  });
}
function jf(e, t) {
  Hf(e, bo);
}
function Lf(e, t) {
  Mr(e, "sorting", t);
}
function Kf(e, t) {
  Lf(e, Rt(e.initialState.sorting ?? []));
}
function Vf(e) {
  e.atoms.sorting && (e.options.autoResetAll ?? e.options.autoResetSorting ?? !1) && Kf(e);
}
function Ml() {
  return (e) => Ir({
    feature: "coreRowModelsFeature",
    table: e,
    fnName: "table.getCoreRowModel",
    memoDeps: () => [e.options.data],
    fn: () => Bf(e, e.options.data),
    onAfterUpdate: Uu(() => {
      bl(e), kf(e), Vf(e), If(e);
    })
  });
}
function Il(e, t, n, r = 0, o) {
  var i;
  const s = [];
  for (let l = 0; l < n.length; l++) {
    const a = n[l], u = Rf(e, e.getRowId(a, l, o), a, l, r, void 0, o == null ? void 0 : o.id);
    t.flatRows.push(u), t.rowsById[u.id] = u, s.push(u), e.options.getSubRows && (u.originalSubRows = e.options.getSubRows(a, l), (i = u.originalSubRows) != null && i.length && (u.subRows = Il(e, t, u.originalSubRows, r + 1, u)));
  }
  return s;
}
function Bf(e, t) {
  const n = {
    rows: [],
    flatRows: [],
    rowsById: oe()
  };
  return n.rows = Il(e, n, t), n;
}
function $f(e) {
  var t, n;
  return e._rowModels.coreRowModel || (e._rowModels.coreRowModel = ((n = (t = e.options.features).coreRowModel) == null ? void 0 : n.call(t, e)) ?? Ml()(e)), e._rowModels.coreRowModel();
}
function Nf(e) {
  return e.getCoreRowModel();
}
function Wf(e) {
  var t, n;
  return e._rowModels.filteredRowModel || (e._rowModels.filteredRowModel = (n = (t = e.options.features).filteredRowModel) == null ? void 0 : n.call(t, e)), e.options.manualFiltering || !e._rowModels.filteredRowModel ? e.getPreFilteredRowModel() : e._rowModels.filteredRowModel();
}
function Uf(e) {
  return e.getFilteredRowModel();
}
function zf(e) {
  var t, n;
  return e._rowModels.groupedRowModel || (e._rowModels.groupedRowModel = (n = (t = e.options.features).groupedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualGrouping || !e._rowModels.groupedRowModel ? e.getPreGroupedRowModel() : e._rowModels.groupedRowModel();
}
function qf(e) {
  return e.getGroupedRowModel();
}
function Gf(e) {
  var t, n;
  return e._rowModels.sortedRowModel || (e._rowModels.sortedRowModel = (n = (t = e.options.features).sortedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualSorting || !e._rowModels.sortedRowModel ? e.getPreSortedRowModel() : e._rowModels.sortedRowModel();
}
function Yf(e) {
  return e.getSortedRowModel();
}
function Xf(e) {
  var t, n;
  return e._rowModels.expandedRowModel || (e._rowModels.expandedRowModel = (n = (t = e.options.features).expandedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualExpanding || !e._rowModels.expandedRowModel ? e.getPreExpandedRowModel() : e._rowModels.expandedRowModel();
}
function Jf(e) {
  return e.getExpandedRowModel();
}
function Zf(e) {
  var t, n;
  return e._rowModels.paginatedRowModel || (e._rowModels.paginatedRowModel = (n = (t = e.options.features).paginatedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualPagination || !e._rowModels.paginatedRowModel ? e.getPrePaginatedRowModel() : e._rowModels.paginatedRowModel();
}
function Qf(e) {
  return e.getPaginatedRowModel();
}
const ed = { constructTableAPIs: (e) => {
  Lt("coreRowModelsFeature", e, {
    table_getCoreRowModel: { fn: () => $f(e) },
    table_getPreFilteredRowModel: { fn: () => Nf(e) },
    table_getFilteredRowModel: { fn: () => Wf(e) },
    table_getPreGroupedRowModel: { fn: () => Uf(e) },
    table_getGroupedRowModel: { fn: () => zf(e) },
    table_getPreSortedRowModel: { fn: () => qf(e) },
    table_getSortedRowModel: { fn: () => Gf(e) },
    table_getPreExpandedRowModel: { fn: () => Yf(e) },
    table_getExpandedRowModel: { fn: () => Xf(e) },
    table_getPrePaginatedRowModel: { fn: () => Jf(e) },
    table_getPaginatedRowModel: { fn: () => Zf(e) },
    table_getRowModel: { fn: () => Qf(e) }
  });
} };
function td(e) {
  var t, n;
  if (!e._cellPrototype) {
    e._cellPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignCellPrototype) == null || n.call(t, e._cellPrototype, e);
  }
  return e._cellPrototype;
}
function nd(e, t, n) {
  const r = td(n), o = Object.create(r);
  o.column = e, o.id = `${t.id}_${e.id}`, o.row = t;
  const s = n._cellInstanceInitFns;
  for (let i = 0; i < s.length; i++) s[i](o);
  return o;
}
function rd(e) {
  const t = e.table.getRowsInDisplayOrder(), n = e._displayIndexCache;
  return t[n] === e ? n : -1;
}
function od(e) {
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
function sd(e, t) {
  if (en(e._valuesCache, t)) return e._valuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return e._valuesCache[t] = n.accessorFn(e.original, e.index), e._valuesCache[t];
}
function id(e, t) {
  if (en(e._uniqueValuesCache, t)) return e._uniqueValuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return n.columnDef.getUniqueValues ? (e._uniqueValuesCache[t] = n.columnDef.getUniqueValues(e.original, e.index), e._uniqueValuesCache[t]) : (e._uniqueValuesCache[t] = [e.getValue(t)], e._uniqueValuesCache[t]);
}
function ld(e, t) {
  return e.getValue(t) ?? e.table.options.renderFallbackValue;
}
function ad(e) {
  return Nu(e.subRows, (t) => t.subRows);
}
function cd(e) {
  const t = e.getCoreRowModel().flatRows;
  let n = 0;
  for (let r = 0; r < t.length; r++) n = Math.max(n, t[r].depth);
  return n;
}
function ud(e) {
  if (e.parentId)
    return e.table.getCoreRowModel().rowsById[e.parentId] ?? e.table.getRow(e.parentId, !0);
}
function fd(e) {
  const t = [];
  let n = e;
  for (; ; ) {
    const r = n.getParentRow();
    if (!r) break;
    t.push(r), n = r;
  }
  return t.reverse();
}
function dd(e) {
  const t = e.table.getAllLeafColumns();
  let n = e._cellsCache;
  n || (n = e._cellsCache = /* @__PURE__ */ new WeakMap());
  const r = new Array(t.length);
  for (let o = 0; o < t.length; o++) {
    const s = t[o];
    let i = n.get(s);
    i || (i = nd(s, e, e.table), n.set(s, i)), r[o] = i;
  }
  return r;
}
function pd(e) {
  const t = oe(), n = e.getAllCells();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.column.id] = o;
  }
  return t;
}
function gd(e, t, n, r) {
  var o, s;
  return ((s = (o = t.options).getRowId) == null ? void 0 : s.call(o, e, n, r)) ?? (r ? `${r.id}.${n}` : String(n));
}
function hd(e, t, n) {
  let r = (n ? e.getPrePaginatedRowModel() : e.getRowModel()).rowsById[t];
  if (!r && (r = e.getCoreRowModel().rowsById[t], !r))
    throw new Error();
  return r;
}
const vd = {
  assignRowPrototype: (e, t) => {
    tn("coreRowsFeature", e, t, {
      row_getDisplayIndex: { fn: (n) => rd(n) },
      row_getAllCellsByColumnId: {
        fn: (n) => pd(n),
        memoDeps: (n) => [n.getAllCells()]
      },
      row_getAllCells: {
        fn: (n) => dd(n),
        memoDeps: (n) => [n.table.getAllLeafColumns()]
      },
      row_getLeafRows: {
        fn: (n) => ad(n),
        memoDeps: (n) => [n.subRows]
      },
      row_getParentRow: { fn: (n) => ud(n) },
      row_getParentRows: { fn: (n) => fd(n) },
      row_getUniqueValues: { fn: (n, r) => id(n, r) },
      row_getValue: { fn: (n, r) => sd(n, r) },
      row_renderValue: { fn: (n, r) => ld(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    Lt("coreRowsFeature", e, {
      table_getRowsInDisplayOrder: {
        fn: () => od(e),
        memoDeps: () => {
          var t;
          return [
            e.getPrePaginatedRowModel().rows,
            e.options.paginateExpandedRows,
            e.options.paginateExpandedRows === !1 ? (t = e.atoms.expanded) == null ? void 0 : t.get() : void 0
          ];
        }
      },
      table_getRowId: { fn: (t, n, r) => gd(t, e, n, r) },
      table_getRow: { fn: (t, n) => hd(e, t, n) },
      table_getMaxSubRowDepth: {
        fn: () => cd(e),
        memoDeps: () => [e.getCoreRowModel()]
      }
    });
  }
};
function El(e, t, n = (r, o) => r === o) {
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
function md(e, t, n = (r, o) => r === o) {
  e._reactivity.batch(() => {
    var r, o;
    El(e, t, n), (o = (r = e._reactivity).commit) == null || o.call(r);
  });
}
function wd(e) {
  var r, o;
  const t = Rt(e.initialState);
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
function yd(e, t) {
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
function bd(e, t, n) {
  const r = yd(e, Cr(t, e.options));
  e.optionsStore ? e.optionsStore.set(() => r) : e.options = r, md(e, r.state ?? null);
}
const _d = { constructTableAPIs: (e) => {
  Lt("coreTablesFeature", e, {
    table_reset: { fn: () => wd(e) },
    table_setOptions: { fn: (t) => bd(e, t) }
  });
} }, xd = {
  coreCellsFeature: Yu,
  coreColumnsFeature: hf,
  coreHeadersFeature: xf,
  coreRowModelsFeature: ed,
  coreRowsFeature: vd,
  coreTablesFeature: _d
};
function Sd(e) {
  const t = e;
  return Object.defineProperty(e, "state", { get() {
    return e.get();
  } }), "set" in e && (t.setState = e.set.bind(e)), t;
}
function Rd(e, t) {
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
  const n = Fs(e);
  if (n.length !== Fs(t).length) return !1;
  for (let r = 0; r < n.length; r++) if (!Object.prototype.hasOwnProperty.call(t, n[r]) || !Object.is(e[n[r]], t[n[r]])) return !1;
  return !0;
}
function Fs(e) {
  return Object.keys(e).concat(Object.getOwnPropertySymbols(e));
}
function Cd(e, t = {}) {
  return Object.values(e).forEach((n) => {
    var r;
    t = ((r = n.getInitialState) == null ? void 0 : r.call(n, t)) ?? t;
  }), Rt(t);
}
function Md(e) {
  var W, ce;
  const t = e.features.coreReactivityFeature, { aggregationFns: n, columnMeta: r, coreRowModel: o, expandedRowModel: s, facetedMinMaxValues: i, facetedRowModel: l, facetedUniqueValues: a, filterFns: u, filterMeta: f, filteredRowModel: h, groupedRowModel: y, paginatedRowModel: w, sortFns: M, sortedRowModel: O, tableMeta: D, ...H } = e.features, C = {
    _cellInstanceInitFns: [],
    _columnInstanceInitFns: [],
    _features: {
      ...xd,
      ...H
    },
    _headerGroupInstanceInitFns: [],
    _headerInstanceInitFns: [],
    _reactivity: t,
    _rowInstanceInitFns: [],
    _rowModelFns: {
      aggregationFns: n,
      filterFns: u,
      sortFns: M
    },
    _rowModels: {},
    atoms: {},
    baseAtoms: {}
  }, K = Object.values(C._features), I = {
    ...K.reduce((k, F) => {
      var q;
      return Object.assign(k, (q = F.getDefaultTableOptions) == null ? void 0 : q.call(F, C));
    }, {}),
    ...e
  };
  if (t.wrapExternalAtoms && I.atoms) for (const [k, F] of Object.entries(I.atoms)) {
    const q = F, ue = t.createWritableAtom(q.get(), { debugName: `externalAtom/${k}` });
    I.atoms[k] = ue;
    let se = !1;
    const he = q.subscribe((Re) => {
      se || ue.set(Re);
    }), Ae = ue.subscribe((Re) => {
      se = !0, q.set(Re), se = !1;
    });
    t.addSubscription(he), t.addSubscription(Ae);
  }
  t.createOptionsStore ? (C.optionsStore = t.createWritableAtom(I, { debugName: "table/optionsStore" }), Object.defineProperty(C, "options", {
    configurable: !0,
    enumerable: !0,
    get() {
      return C.optionsStore.get();
    },
    set(k) {
      C.optionsStore.set(() => k);
    }
  })) : C.options = I, C.initialState = Cd(C._features, C.options.initialState);
  const $ = Object.keys(C.initialState);
  for (let k = 0; k < $.length; k++) {
    const F = $[k];
    C.baseAtoms[F] = t.createWritableAtom(C.initialState[F], { debugName: `table/baseAtoms/${F}` }), C.atoms[F] = t.createReadonlyAtom(() => {
      var Ae;
      const q = C.options, ue = (Ae = q.atoms) == null ? void 0 : Ae[F], se = ue ? ue.get() : C.baseAtoms[F].get();
      if (ue) return se;
      const he = q.state;
      if (he && en(he, F)) {
        const Re = he[F];
        return Re === void 0 ? C.initialState[F] : Re;
      }
      return se;
    }, { debugName: `table/atoms/${F}` });
  }
  El(C), C.store = Sd(t.createReadonlyAtom(() => {
    const k = {};
    for (let F = 0; F < $.length; F++) {
      const q = $[F];
      k[q] = C.atoms[q].get();
    }
    return k;
  }, {
    compare: Rd,
    debugName: "table/store"
  }));
  for (let k = 0; k < K.length; k++) {
    const F = K[k];
    (W = F.initTableInstanceData) == null || W.call(F, C), F.initCellInstanceData && C._cellInstanceInitFns.push(F.initCellInstanceData.bind(F)), F.initColumnInstanceData && C._columnInstanceInitFns.push(F.initColumnInstanceData.bind(F)), F.initHeaderGroupInstanceData && C._headerGroupInstanceInitFns.push(F.initHeaderGroupInstanceData.bind(F)), F.initHeaderInstanceData && C._headerInstanceInitFns.push(F.initHeaderInstanceData.bind(F)), F.initRowInstanceData && C._rowInstanceInitFns.push(F.initRowInstanceData.bind(F)), (ce = F.constructTableAPIs) == null || ce.call(F, C);
  }
  return C;
}
const Id = {
  getInitialState: (e) => ({
    expanded: Ef(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onExpandedChange: ul("expanded", e),
    paginateExpandedRows: !0
  }),
  assignRowPrototype: (e, t) => {
    tn("rowExpandingFeature", e, t, {
      row_toggleExpanded: { fn: (n, r) => Cl(n, r) },
      row_getIsExpanded: { fn: (n) => Er(n) },
      row_getCanExpand: { fn: (n) => Ft(n) },
      row_getIsAllParentsExpanded: { fn: (n) => Tf(n) },
      row_getToggleExpandedHandler: { fn: (n) => Df(n) }
    });
  },
  constructTableAPIs: (e) => {
    Lt("rowExpandingFeature", e, {
      table_autoResetExpanded: { fn: () => bl(e) },
      table_setExpanded: { fn: (t) => ur(e, t) },
      table_toggleAllRowsExpanded: { fn: (t) => _l(e, t) },
      table_resetExpanded: { fn: (t) => xl(e, t) },
      table_getCanSomeRowsExpand: { fn: () => Sl(e) },
      table_getToggleAllRowsExpandedHandler: { fn: () => Af(e) },
      table_getIsSomeRowsExpanded: { fn: () => Of(e) },
      table_getIsAllRowsExpanded: { fn: () => Rl(e) },
      table_getExpandedDepth: { fn: () => Pf(e) }
    });
  }
};
function Ed() {
  return oe();
}
function nn(e, t) {
  var n, r;
  (r = (n = e.options).onRowSelectionChange) == null || r.call(n, t);
}
function Ad(e, t) {
  e._lastSelectedRowId = null, nn(e, t ? oe() : Object.assign(oe(), Rt(e.initialState.rowSelection ?? {})));
}
function Al(e, t, n) {
  e._lastSelectedRowId = null, nn(e, (r) => {
    if (t = typeof t < "u" ? t : !ye(e, "getIsAllRowsSelected", Tl), n != null && n.deselectAll && !t) return oe();
    const o = Object.assign(oe(), r), s = e.getPreGroupedRowModel().flatRows;
    if (t) {
      const i = /* @__PURE__ */ new Map();
      s.forEach((l) => {
        fr(l, i) && (o[l.id] = !0);
      });
    } else s.forEach((i) => {
      pt(i) && delete o[i.id];
    });
    return o;
  });
}
function Ol(e, t, n) {
  e._lastSelectedRowId = null, nn(e, (r) => {
    const o = typeof t < "u" ? t : !ye(e, "getIsAllPageRowsSelected", Dl);
    if (n != null && n.deselectAll && !o) return oe();
    const s = Object.assign(oe(), r);
    return e.getRowModel().rows.forEach((i) => {
      Or(s, i.id, o, !0, e, !0);
    }), s;
  });
}
function Od(e) {
  return e.getCoreRowModel();
}
function Pd(e) {
  const t = e.getCoreRowModel();
  return ye(e, "getIsSomeRowsSelected", Ar) ? No(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: oe()
  };
}
function Td(e) {
  const t = e.getFilteredRowModel();
  return ye(e, "getIsSomeRowsSelected", Ar) ? No(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: oe()
  };
}
function Dd(e) {
  const t = e.getSortedRowModel();
  return ye(e, "getIsSomeRowsSelected", Ar) ? No(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: oe()
  };
}
function Pl(e) {
  var t;
  return Object.keys(((t = e.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function Tl(e) {
  var o;
  const t = e.getFilteredRowModel().flatRows, n = ((o = e.atoms.rowSelection) == null ? void 0 : o.get()) ?? {};
  let r = !!(t.length && Object.keys(n).length);
  if (r) {
    const s = /* @__PURE__ */ new Map();
    t.some((i) => !Pn(i, n) && fr(i, s)) && (r = !1);
  }
  return r;
}
function Dl(e) {
  var s;
  const t = e.getPaginatedRowModel().flatRows, n = ((s = e.atoms.rowSelection) == null ? void 0 : s.get()) ?? {}, r = /* @__PURE__ */ new Map();
  let o = !1;
  for (let i = 0; i < t.length; i++) {
    const l = t[i];
    if (Pn(l, n))
      !o && fr(l, r) && (o = !0);
    else if (fr(l, r)) return !1;
  }
  return o;
}
function Ar(e) {
  return ye(e, "getSelectedRowIds", Pl).length > 0;
}
function kd(e) {
  return e.getPaginatedRowModel().flatRows.filter((t) => pt(t)).some((t) => Bo(t) || ye(t, "getIsSomeSelected", Fl));
}
function Fd(e) {
  return (t) => {
    Al(e, t.target.checked);
  };
}
function Hd(e) {
  return (t) => {
    Ol(e, t.target.checked);
  };
}
function kl(e, t, n) {
  const r = Bo(e);
  nn(e.table, (o) => {
    t = typeof t < "u" ? t : !r;
    const s = Object.assign(oe(), o);
    return Or(s, e.id, t, ((n == null ? void 0 : n.selectChildren) ?? !0) && Dt(e), e.table), !t && (n != null && n.deselectParents) && Hl(s, e), s;
  });
}
function Bo(e) {
  var t;
  return Pn(e, ((t = e.table.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function Fl(e) {
  return Wo(e) === "some";
}
function jd(e) {
  return Wo(e) === "all";
}
function pt(e) {
  const t = e.table.options;
  return typeof t.enableRowSelection == "function" ? t.enableRowSelection(e) : t.enableRowSelection ?? !0;
}
function $o(e) {
  const t = e.table.options;
  return typeof t.enableSubRowSelection == "function" ? t.enableSubRowSelection(e) : t.enableSubRowSelection ?? !0;
}
function Dt(e) {
  const t = e.table.options;
  return typeof t.enableMultiRowSelection == "function" ? t.enableMultiRowSelection(e) : t.enableMultiRowSelection ?? !0;
}
function Ld(e, t) {
  const n = pt(e);
  return (r) => {
    var a, u;
    if (!n) return;
    const o = r, s = e.table, i = o.target.checked, l = s._lastSelectedRowId;
    (!(s.options.enableRowRangeSelection !== !1 && l !== null && Dt(e) && (((u = (a = s.options).isRowRangeSelectionEvent) == null ? void 0 : u.call(a, r)) ?? !1)) || !Kd(e, l, i, t)) && kl(e, i, t), s._lastSelectedRowId = e.id;
  };
}
function Kd(e, t, n, r) {
  const o = (r == null ? void 0 : r.selectChildren) ?? !0, s = e.table, i = s.getRowsInDisplayOrder(), l = s.getPrePaginatedRowModel().rowsById[t] ?? s.getCoreRowModel().rowsById[t];
  if (!l) return !1;
  const a = l.getDisplayIndex(), u = e.getDisplayIndex(), f = i[a], h = i[u];
  if (a < 0 || u < 0 || a >= i.length || u >= i.length || (f == null ? void 0 : f.id) !== l.id || (h == null ? void 0 : h.id) !== e.id || !Dt(l) || !Dt(e)) return !1;
  const y = Math.min(a, u), w = Math.max(a, u);
  return nn(s, (M) => {
    const O = Object.assign(oe(), M);
    for (let D = y; D <= w; D++) {
      const H = i[D];
      !pt(H) || !Dt(H) || (Or(O, H.id, n, o, s), !n && (r != null && r.deselectParents) && Hl(O, H));
    }
    return O;
  }), !0;
}
function Or(e, t, n, r, o, s) {
  const i = o.getRow(t, !0);
  n ? (Dt(i) || Object.keys(e).forEach((l) => delete e[l]), pt(i) && (e[t] = !0)) : (!s || pt(i)) && delete e[t], r && i.subRows.length && $o(i) && i.subRows.forEach((l) => Or(e, l.id, n, r, o, s));
}
function fr(e, t) {
  if (!pt(e)) return !1;
  const n = e.table;
  if (n.options.enableSubRowSelection === !0) return !0;
  const r = e.parentId;
  if (r === void 0) return !0;
  const o = t.get(r);
  if (o !== void 0) return o;
  const s = n.getCoreRowModel().rowsById, i = [];
  let l = !0, a = r;
  for (; a !== void 0; ) {
    const u = t.get(a);
    if (u !== void 0) {
      l = u;
      break;
    }
    i.push(a);
    const f = s[a] ?? n.getRow(a, !0);
    if (!$o(f)) {
      l = !1;
      break;
    }
    a = f.parentId;
  }
  return i.forEach((u) => t.set(u, l)), l;
}
function Hl(e, t) {
  const n = t.table.getCoreRowModel().rowsById;
  let r = t.parentId;
  for (; r !== void 0; )
    delete e[r], r = (n[r] ?? t.table.getRow(r, !0)).parentId;
}
function jl(e, t, n, r) {
  const o = [];
  for (let s = 0; s < e.length; s++) {
    const i = e[s], l = Pn(i, t);
    if (l && (n.push(i), r[i.id] = i), i.subRows.length) {
      const a = jl(i.subRows, t, n, r);
      if (l) {
        const u = Object.create(Object.getPrototypeOf(i));
        Vu(u, i), u.subRows = a, o.push(u);
      }
    } else l && o.push(i);
  }
  return o;
}
function No(e, t) {
  var s;
  const n = [], r = oe(), o = ((s = t.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  return {
    rows: jl(e.rows, o, n, r),
    flatRows: n,
    rowsById: r
  };
}
function Pn(e, t) {
  return !!(en(t, e.id) && t[e.id]);
}
function Wo(e) {
  var s;
  if (!e.subRows.length) return !1;
  const t = ((s = e.table.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  let n = !1, r = !0, o = !1;
  for (let i = 0; i < e.subRows.length; i++) {
    const l = e.subRows[i];
    if (n && !r) break;
    if (pt(l) && (o = !0, Pn(l, t) ? n = !0 : r = !1), l.subRows.length) {
      const a = Wo(l);
      a === "all" ? (n = !0, o = !0) : a === "some" ? (n = !0, r = !1, o = !0) : r = !1;
    }
  }
  return o ? r ? "all" : n ? "some" : !1 : !1;
}
const Vd = {
  initTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  resetTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  getInitialState: (e) => ({
    rowSelection: Ed(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onRowSelectionChange: ul("rowSelection", e),
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
    tn("rowSelectionFeature", e, t, {
      row_toggleSelected: { fn: (n, r, o) => kl(n, r, o) },
      row_getIsSelected: { fn: (n) => Bo(n) },
      row_getIsSomeSelected: {
        fn: (n) => Fl(n),
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
        fn: (n) => jd(n),
        memoDeps: (n) => {
          var r;
          return [
            n.subRows,
            (r = n.table.atoms.rowSelection) == null ? void 0 : r.get(),
            n.table.options.enableRowSelection
          ];
        }
      },
      row_getCanSelect: { fn: (n) => pt(n) },
      row_getCanSelectSubRows: { fn: (n) => $o(n) },
      row_getCanMultiSelect: { fn: (n) => Dt(n) },
      row_getToggleSelectedHandler: { fn: (n, r) => Ld(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    Lt("rowSelectionFeature", e, {
      table_setRowSelection: { fn: (t) => nn(e, t) },
      table_resetRowSelection: { fn: (t) => Ad(e, t) },
      table_toggleAllRowsSelected: { fn: (t, n) => Al(e, t, n) },
      table_toggleAllPageRowsSelected: { fn: (t, n) => Ol(e, t, n) },
      table_getPreSelectedRowModel: { fn: () => Od(e) },
      table_getSelectedRowModel: {
        fn: () => Pd(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getCoreRowModel()];
        }
      },
      table_getFilteredSelectedRowModel: {
        fn: () => Td(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getFilteredRowModel()];
        }
      },
      table_getGroupedSelectedRowModel: {
        fn: () => Dd(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getSortedRowModel()];
        }
      },
      table_getSelectedRowIds: {
        fn: () => Pl(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get()];
        }
      },
      table_getIsAllRowsSelected: {
        fn: () => Tl(e),
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
        fn: () => Dl(e),
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
        fn: () => Ar(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get()];
        }
      },
      table_getIsSomePageRowsSelected: {
        fn: () => kd(e),
        memoDeps: () => {
          var t;
          return [
            (t = e.atoms.rowSelection) == null ? void 0 : t.get(),
            e.getPaginatedRowModel(),
            e.options.enableRowSelection
          ];
        }
      },
      table_getToggleAllRowsSelectedHandler: { fn: () => Fd(e) },
      table_getToggleAllPageRowsSelectedHandler: { fn: () => Hd(e) }
    });
  }
};
function Bd() {
  return (e) => {
    const t = e;
    return Ir({
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
      fn: () => $d(t)
    });
  };
}
function $d(e) {
  var r;
  const t = e.getPreExpandedRowModel(), n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return !t.rows.length || n !== !0 && !Object.keys(n ?? {}).length || !e.options.paginateExpandedRows && !e.options.manualPagination ? t : Nd(t);
}
function Nd(e) {
  const t = [], n = (r) => {
    t.push(r), r.subRows.length && Er(r) && r.subRows.forEach(n);
  };
  return e.rows.forEach(n), {
    rows: t,
    flatRows: e.flatRows,
    rowsById: e.rowsById
  };
}
function Hs(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = Pt(e[n]);
  return wo(e, t);
}
function Wd(e) {
  return Object.keys(e).map((t) => Pt(e[t]));
}
function Ud(e) {
  const t = (l, a) => {
    l.setOptions((u) => Ps(u, Hs(a)));
  }, n = Ku(), r = wo(e, { features: {
    coreReactivityFeature: n,
    ...Pt(e.features) ?? {}
  } }), o = wo(Hs(r), { mergeOptions: (l, a) => Ps(l, a) }), s = Md(o), i = s;
  return ci() && Ra(() => {
    var l;
    return (l = n.unmount) == null ? void 0 : l.call(n);
  }), be(() => Wd(r), () => {
    t(s, r);
  }, { immediate: !0 }), be(() => {
    const l = Pt(e.state), a = Pt(e.atoms);
    if (!l) return [];
    const u = [];
    for (const f of Object.keys(i.initialState))
      !(f in l) || (a == null ? void 0 : a[f]) !== void 0 || u.push(l[f]);
    return u;
  }, (l) => {
    l.length > 0 && t(s, r);
  }, { immediate: !0 }), i.Subscribe = (l) => l.children(i.atoms), i;
}
function Pr() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return function() {
    t.forEach(function(o) {
      return o();
    });
  };
}
function zd(e) {
  if (Array.isArray(e)) return e;
}
function qd(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r, o, s, i, l = [], a = !0, u = !1;
    try {
      if (s = (n = n.call(e)).next, t !== 0) for (; !(a = (r = s.call(n)).done) && (l.push(r.value), l.length !== t); a = !0) ;
    } catch (f) {
      u = !0, o = f;
    } finally {
      try {
        if (!a && n.return != null && (i = n.return(), Object(i) !== i)) return;
      } finally {
        if (u) throw o;
      }
    }
    return l;
  }
}
function _o(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Ll(e, t) {
  if (e) {
    if (typeof e == "string") return _o(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? _o(e, t) : void 0;
  }
}
function Gd() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Kl(e, t) {
  return zd(e) || qd(e, t) || Ll(e, t) || Gd();
}
var js = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Ht = {}, Tn = {};
Object.defineProperty(Tn, "__esModule", { value: !0 });
Tn.bind = void 0;
function Yd(e, t) {
  var n = t.type, r = t.listener, o = t.options;
  return e.addEventListener(n, r, o), function() {
    e.removeEventListener(n, r, o);
  };
}
Tn.bind = Yd;
var Tr = {}, qt = js && js.__assign || function() {
  return qt = Object.assign || function(e) {
    for (var t, n = 1, r = arguments.length; n < r; n++) {
      t = arguments[n];
      for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    }
    return e;
  }, qt.apply(this, arguments);
};
Object.defineProperty(Tr, "__esModule", { value: !0 });
Tr.bindAll = void 0;
var Xd = Tn;
function Ls(e) {
  if (!(typeof e > "u"))
    return typeof e == "boolean" ? {
      capture: e
    } : e;
}
function Jd(e, t) {
  if (t == null)
    return e;
  var n = qt(qt({}, e), { options: qt(qt({}, Ls(t)), Ls(e.options)) });
  return n;
}
function Zd(e, t, n) {
  var r = t.map(function(o) {
    var s = Jd(o, n);
    return (0, Xd.bind)(e, s);
  });
  return function() {
    r.forEach(function(s) {
      return s();
    });
  };
}
Tr.bindAll = Zd;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.bindAll = e.bind = void 0;
  var t = Tn;
  Object.defineProperty(e, "bind", { enumerable: !0, get: function() {
    return t.bind;
  } });
  var n = Tr;
  Object.defineProperty(e, "bindAll", { enumerable: !0, get: function() {
    return n.bindAll;
  } });
})(Ht);
var Vl = "data-pdnd-honey-pot";
function Bl(e) {
  return e instanceof Element && e.hasAttribute(Vl);
}
function $l(e) {
  var t = document.elementsFromPoint(e.x, e.y), n = Kl(t, 2), r = n[0], o = n[1];
  return r ? Bl(r) ? o ?? null : r : null;
}
function Mn(e) {
  "@babel/helpers - typeof";
  return Mn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Mn(e);
}
function Qd(e, t) {
  if (Mn(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Mn(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function ep(e) {
  var t = Qd(e, "string");
  return Mn(t) == "symbol" ? t : t + "";
}
function Dn(e, t, n) {
  return (t = ep(t)) in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var tp = 2147483647, np = {
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
function Kt(e) {
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
var to = Kt(function() {
  return typeof HTMLElement < "u" && typeof HTMLElement.prototype.showPopover == "function";
});
function Ks(e, t) {
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
    t % 2 ? Ks(Object(n), !0).forEach(function(r) {
      Dn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ks(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
var In = 2, Bs = In / 2;
function rp(e) {
  return {
    x: Math.floor(e.x),
    y: Math.floor(e.y)
  };
}
function op(e) {
  return {
    x: e.x - Bs,
    y: e.y - Bs
  };
}
function sp(e) {
  return {
    x: Math.max(e.x, 0),
    y: Math.max(e.y, 0)
  };
}
function ip(e) {
  return {
    x: Math.min(e.x, window.innerWidth - In),
    y: Math.min(e.y, window.innerHeight - In)
  };
}
function $s(e) {
  var t = e.client, n = ip(sp(op(rp(t))));
  return DOMRect.fromRect({
    x: n.x,
    y: n.y,
    width: In,
    height: In
  });
}
function Ns(e) {
  var t = e.clientRect;
  return {
    left: "".concat(t.left, "px"),
    top: "".concat(t.top, "px"),
    width: "".concat(t.width, "px"),
    height: "".concat(t.height, "px")
  };
}
function lp(e) {
  var t = e.client, n = e.clientRect;
  return (
    // is within horizontal bounds
    t.x >= n.x && t.x <= n.x + n.width && // is within vertical bounds
    t.y >= n.y && t.y <= n.y + n.height
  );
}
function ap(e) {
  var t = e.initial, n = document.createElement("div");
  n.setAttribute(Vl, "true"), to() && n.setAttribute("popover", "manual");
  var r = $s({
    client: t
  });
  Object.assign(n.style, Vs(Vs({
    position: "fixed"
  }, to() ? (
    // needs to come first as it has 'inset: unset' which
    // needs to be overridden by our top / left values
    np
  ) : {
    // Fallback: using maximum possible z-index so that this element
    // will always be on top of other positioned content.
    zIndex: tp
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
  }, Ns({
    clientRect: r
  }))), document.body.appendChild(n), to() && n.showPopover();
  var o = Ht.bind(window, {
    type: "pointermove",
    listener: function(i) {
      var l = {
        x: i.clientX,
        y: i.clientY
      };
      r = $s({
        client: l
      }), Object.assign(n.style, Ns({
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
    if (o(), lp({
      client: l,
      clientRect: r
    })) {
      n.remove();
      return;
    }
    function a() {
      u(), n.remove();
    }
    var u = Ht.bindAll(window, [
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
function cp() {
  var e = null;
  function t() {
    return e = null, Ht.bind(window, {
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
        var a = l.location.initial.input, u = e ?? {
          x: a.clientX,
          y: a.clientY
        };
        r = ap({
          initial: u
        });
      }
      if (i === "onDrop") {
        var f, h = l.location.current.input;
        (f = r) === null || f === void 0 || f({
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
function up(e) {
  if (Array.isArray(e)) return _o(e);
}
function fp(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function dp() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Nl(e) {
  return up(e) || fp(e) || Ll(e) || dp();
}
var pp = Kt(function() {
  return navigator.userAgent.includes("Firefox");
}), Uo = Kt(function() {
  var t = navigator, n = t.userAgent;
  return n.includes("AppleWebKit") && !n.includes("Chrome");
});
function gp(e) {
  return "nodeName" in e;
}
function hp(e) {
  return gp(e) && e.ownerDocument !== document;
}
var xo = {
  isLeavingWindow: Symbol("leaving"),
  isEnteringWindow: Symbol("entering")
};
(function() {
  if (typeof window > "u" || !Uo())
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
  Ht.bindAll(
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
        !n.isOverWindow && n.enterCount === 0 && (s[xo.isEnteringWindow] = !0), n.isOverWindow = !0, n.enterCount++;
      }
    }, {
      type: "dragleave",
      listener: function(s) {
        n.enterCount--, n.isOverWindow && n.enterCount === 0 && (s[xo.isLeavingWindow] = !0, n.isOverWindow = !1);
      }
    }],
    // using `capture: true` so that adding event listeners
    // in bubble phase will have the correct symbols
    {
      capture: !0
    }
  );
})();
function vp(e) {
  var t = e.dragLeave;
  return Uo() ? t.hasOwnProperty(xo.isLeavingWindow) : !1;
}
function mp(e) {
  var t = e.dragLeave, n = t.type, r = t.relatedTarget;
  return n !== "dragleave" ? !1 : Uo() ? vp({
    dragLeave: t
  }) : r == null ? !0 : pp() ? hp(r) : r instanceof HTMLIFrameElement;
}
function wp(e) {
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
function yn(e) {
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
var yp = function(t) {
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
}, no = yp(function(e) {
  return e();
}), qn = /* @__PURE__ */ function() {
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
function bp(e) {
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
      var u = a.nativeSetDragImage, f = {
        current: n,
        previous: o,
        initial: n
      };
      s({
        eventName: "onGenerateDragPreview",
        payload: {
          source: t,
          location: f,
          nativeSetDragImage: u
        }
      }), qn.schedule(function() {
        s({
          eventName: "onDragStart",
          payload: {
            source: t,
            location: f
          }
        });
      });
    },
    dragUpdate: function(a) {
      var u = a.current;
      qn.flush(), no.cancel(), s({
        eventName: "onDropTargetChange",
        payload: {
          source: t,
          location: {
            initial: n,
            previous: o,
            current: u
          }
        }
      });
    },
    drag: function(a) {
      var u = a.current;
      no(function() {
        qn.flush();
        var f = {
          initial: n,
          previous: o,
          current: u
        };
        s({
          eventName: "onDrag",
          payload: {
            source: t,
            location: f
          }
        });
      });
    },
    drop: function(a) {
      var u = a.current, f = a.updatedSourcePayload;
      qn.flush(), no.cancel(), s({
        eventName: "onDrop",
        payload: {
          source: f ?? t,
          location: {
            current: u,
            previous: o,
            initial: n
          }
        }
      });
    }
  };
  return i;
}
var So = {
  isActive: !1
};
function Wl() {
  return !So.isActive;
}
function _p(e) {
  return e.dataTransfer ? e.dataTransfer.setDragImage.bind(e.dataTransfer) : null;
}
function xp(e) {
  var t = e.current, n = e.next;
  if (t.length !== n.length)
    return !0;
  for (var r = 0; r < t.length; r++)
    if (t[r].element !== n[r].element)
      return !0;
  return !1;
}
function Sp(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = e.dispatchEvent;
  if (!Wl())
    return;
  var s = Rp({
    event: t,
    dragType: n,
    getDropTargetsOver: r
  });
  So.isActive = !0;
  var i = {
    current: s
  };
  ro({
    event: t,
    current: s.dropTargets
  });
  var l = bp({
    source: n.payload,
    dispatchEvent: o,
    initial: s
  });
  function a(w) {
    var M = xp({
      current: i.current.dropTargets,
      next: w.dropTargets
    });
    i.current = w, M && l.dragUpdate({
      current: i.current
    });
  }
  function u(w) {
    var M = yn(w), O = Bl(w.target) ? $l({
      x: M.clientX,
      y: M.clientY
    }) : w.target, D = r({
      target: O,
      input: M,
      source: n.payload,
      current: i.current.dropTargets
    });
    D.length && (w.preventDefault(), ro({
      event: w,
      current: D
    })), a({
      dropTargets: D,
      input: M
    });
  }
  function f() {
    i.current.dropTargets.length && a({
      dropTargets: [],
      input: i.current.input
    }), l.drop({
      current: i.current,
      updatedSourcePayload: null
    }), h();
  }
  function h() {
    So.isActive = !1, y();
  }
  var y = Ht.bindAll(
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
        u(M), l.drag({
          current: i.current
        });
      }
    }, {
      type: "dragenter",
      listener: u
    }, {
      type: "dragleave",
      listener: function(M) {
        mp({
          dragLeave: M
        }) && (a({
          input: i.current.input,
          dropTargets: []
        }), n.startedFrom === "external" && f());
      }
    }, {
      // A "drop" can only happen if the browser allowed the drop
      type: "drop",
      listener: function(M) {
        if (i.current = {
          dropTargets: i.current.dropTargets,
          input: yn(M)
        }, !i.current.dropTargets.length) {
          f();
          return;
        }
        M.preventDefault(), ro({
          event: M,
          current: i.current.dropTargets
        }), l.drop({
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
          input: yn(M)
        }, f();
      }
    }].concat(Nl(wp({
      onDragEnd: f
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
    nativeSetDragImage: _p(t)
  });
}
function ro(e) {
  var t, n = e.event, r = e.current, o = (t = r[0]) === null || t === void 0 ? void 0 : t.dropEffect;
  o != null && n.dataTransfer && (n.dataTransfer.dropEffect = o);
}
function Rp(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = yn(t);
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
var Ws = {
  canStart: Wl,
  start: Sp
}, Ro = /* @__PURE__ */ new Map();
function Cp(e) {
  var t = e.typeKey, n = e.mount, r = Ro.get(t);
  if (r)
    return r.usageCount++, r;
  var o = {
    typeKey: t,
    unmount: n(),
    usageCount: 1
  };
  return Ro.set(t, o), o;
}
function Mp(e) {
  var t = Cp(e);
  return function() {
    t.usageCount--, !(t.usageCount > 0) && (t.unmount(), Ro.delete(e.typeKey));
  };
}
function Ul(e, t) {
  var n = t.attribute, r = t.value;
  return e.setAttribute(n, r), function() {
    return e.removeAttribute(n);
  };
}
function Us(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function bt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Us(Object(n), !0).forEach(function(r) {
      Dn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Us(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function oo(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = Ip(e)) || t) {
      n && (e = n);
      var r = 0, o = function() {
      };
      return { s: o, n: function() {
        return r >= e.length ? { done: !0 } : { done: !1, value: e[r++] };
      }, e: function(u) {
        throw u;
      }, f: o };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var s, i = !0, l = !1;
  return { s: function() {
    n = n.call(e);
  }, n: function() {
    var u = n.next();
    return i = u.done, u;
  }, e: function(u) {
    l = !0, s = u;
  }, f: function() {
    try {
      i || n.return == null || n.return();
    } finally {
      if (l) throw s;
    }
  } };
}
function Ip(e, t) {
  if (e) {
    if (typeof e == "string") return zs(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? zs(e, t) : void 0;
  }
}
function zs(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function so(e) {
  return e.slice(0).reverse();
}
function Ep(e) {
  var t = e.typeKey, n = e.defaultDropEffect, r = /* @__PURE__ */ new WeakMap(), o = "data-drop-target-for-".concat(t), s = "[".concat(o, "]");
  function i(w) {
    return r.set(w.element, w), function() {
      return r.delete(w.element);
    };
  }
  function l(w) {
    var M = Pr(Ul(w.element, {
      attribute: o,
      value: "true"
    }), i(w));
    return Kt(M);
  }
  function a(w) {
    var M, O, D, H, C = w.source, K = w.target, I = w.input, $ = w.result, W = $ === void 0 ? [] : $;
    if (K == null)
      return W;
    if (!(K instanceof Element))
      return K instanceof Node ? a({
        source: C,
        target: K.parentElement,
        input: I,
        result: W
      }) : W;
    var ce = K.closest(s);
    if (ce == null)
      return W;
    var k = r.get(ce);
    if (k == null)
      return W;
    var F = {
      input: I,
      source: C,
      element: k.element
    };
    if (k.canDrop && !k.canDrop(F))
      return a({
        source: C,
        target: k.element.parentElement,
        input: I,
        result: W
      });
    var q = (M = (O = k.getData) === null || O === void 0 ? void 0 : O.call(k, F)) !== null && M !== void 0 ? M : {}, ue = (D = (H = k.getDropEffect) === null || H === void 0 ? void 0 : H.call(k, F)) !== null && D !== void 0 ? D : n, se = {
      data: q,
      element: k.element,
      dropEffect: ue,
      // we are collecting _actual_ drop targets, so these are
      // being applied _not_ due to stickiness
      isActiveDueToStickiness: !1
    };
    return a({
      source: C,
      target: k.element.parentElement,
      input: I,
      // Using bubble ordering. Same ordering as `event.getPath()`
      result: [].concat(Nl(W), [se])
    });
  }
  function u(w) {
    var M = w.eventName, O = w.payload, D = oo(O.location.current.dropTargets), H;
    try {
      for (D.s(); !(H = D.n()).done; ) {
        var C, K = H.value, I = r.get(K.element), $ = bt(bt({}, O), {}, {
          self: K
        });
        I == null || (C = I[M]) === null || C === void 0 || C.call(
          I,
          // I cannot seem to get the types right here.
          // TS doesn't seem to like that one event can need `nativeSetDragImage`
          // @ts-expect-error
          $
        );
      }
    } catch (W) {
      D.e(W);
    } finally {
      D.f();
    }
  }
  var f = {
    onGenerateDragPreview: u,
    onDrag: u,
    onDragStart: u,
    onDrop: u,
    onDropTargetChange: function(M) {
      var O = M.payload, D = new Set(O.location.current.dropTargets.map(function(G) {
        return G.element;
      })), H = /* @__PURE__ */ new Set(), C = oo(O.location.previous.dropTargets), K;
      try {
        for (C.s(); !(K = C.n()).done; ) {
          var I, $ = K.value;
          H.add($.element);
          var W = r.get($.element), ce = D.has($.element), k = bt(bt({}, O), {}, {
            self: $
          });
          if (W == null || (I = W.onDropTargetChange) === null || I === void 0 || I.call(W, k), !ce) {
            var F;
            W == null || (F = W.onDragLeave) === null || F === void 0 || F.call(W, k);
          }
        }
      } catch (G) {
        C.e(G);
      } finally {
        C.f();
      }
      var q = oo(O.location.current.dropTargets), ue;
      try {
        for (q.s(); !(ue = q.n()).done; ) {
          var se, he, Ae = ue.value;
          if (!H.has(Ae.element)) {
            var Re = bt(bt({}, O), {}, {
              self: Ae
            }), te = r.get(Ae.element);
            te == null || (se = te.onDropTargetChange) === null || se === void 0 || se.call(te, Re), te == null || (he = te.onDragEnter) === null || he === void 0 || he.call(te, Re);
          }
        }
      } catch (G) {
        q.e(G);
      } finally {
        q.f();
      }
    }
  };
  function h(w) {
    f[w.eventName](w);
  }
  function y(w) {
    var M = w.source, O = w.target, D = w.input, H = w.current, C = a({
      source: M,
      target: O,
      input: D
    });
    if (C.length >= H.length)
      return C;
    for (var K = so(H), I = so(C), $ = [], W = 0; W < K.length; W++) {
      var ce, k = K[W], F = I[W];
      if (F != null) {
        $.push(F);
        continue;
      }
      var q = $[W - 1], ue = K[W - 1];
      if ((q == null ? void 0 : q.element) !== (ue == null ? void 0 : ue.element))
        break;
      var se = r.get(k.element);
      if (!se)
        break;
      var he = {
        input: D,
        source: M,
        element: se.element
      };
      if (se.canDrop && !se.canDrop(he) || !((ce = se.getIsSticky) !== null && ce !== void 0 && ce.call(se, he)))
        break;
      $.push(bt(bt({}, k), {}, {
        // making it clear to consumers this drop target is active due to stickiness
        isActiveDueToStickiness: !0
      }));
    }
    return so($);
  }
  return {
    dropTargetForConsumers: l,
    getIsOver: y,
    dispatchEvent: h
  };
}
function Ap(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = Op(e)) || t) {
      n && (e = n);
      var r = 0, o = function() {
      };
      return { s: o, n: function() {
        return r >= e.length ? { done: !0 } : { done: !1, value: e[r++] };
      }, e: function(u) {
        throw u;
      }, f: o };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var s, i = !0, l = !1;
  return { s: function() {
    n = n.call(e);
  }, n: function() {
    var u = n.next();
    return i = u.done, u;
  }, e: function(u) {
    l = !0, s = u;
  }, f: function() {
    try {
      i || n.return == null || n.return();
    } finally {
      if (l) throw s;
    }
  } };
}
function Op(e, t) {
  if (e) {
    if (typeof e == "string") return qs(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? qs(e, t) : void 0;
  }
}
function qs(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Gs(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Pp(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Gs(Object(n), !0).forEach(function(r) {
      Dn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Gs(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Tp() {
  var e = /* @__PURE__ */ new Set(), t = null;
  function n(s) {
    t && (!s.canMonitor || s.canMonitor(t.canMonitorArgs)) && t.active.add(s);
  }
  function r(s) {
    var i = Pp({}, s);
    e.add(i), n(i);
    function l() {
      e.delete(i), t && t.active.delete(i);
    }
    return Kt(l);
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
      var a = Ap(e), u;
      try {
        for (a.s(); !(u = a.n()).done; ) {
          var f = u.value;
          n(f);
        }
      } catch (D) {
        a.e(D);
      } finally {
        a.f();
      }
    }
    if (t) {
      for (var h = Array.from(t.active), y = 0, w = h; y < w.length; y++) {
        var M = w[y];
        if (t.active.has(M)) {
          var O;
          (O = M[i]) === null || O === void 0 || O.call(M, l);
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
function Dp(e) {
  var t = e.typeKey, n = e.mount, r = e.dispatchEventToSource, o = e.onPostDispatch, s = e.defaultDropEffect, i = Tp(), l = Ep({
    typeKey: t,
    defaultDropEffect: s
  });
  function a(h) {
    r == null || r(h), l.dispatchEvent(h), i.dispatchEvent(h), o == null || o(h);
  }
  function u(h) {
    var y = h.event, w = h.dragType;
    Ws.start({
      event: y,
      dragType: w,
      getDropTargetsOver: l.getIsOver,
      dispatchEvent: a
    });
  }
  function f() {
    function h() {
      var y = {
        canStart: Ws.canStart,
        start: u
      };
      return n(y);
    }
    return Mp({
      typeKey: t,
      mount: h
    });
  }
  return {
    registerUsage: f,
    dropTarget: l.dropTargetForConsumers,
    monitor: i.monitorForConsumers
  };
}
var kp = Kt(function() {
  return navigator.userAgent.toLocaleLowerCase().includes("android");
}), Fp = "pdnd:android-fallback", Ys = "text/plain", Hp = "text/uri-list", jp = "application/vnd.pdnd", dr = /* @__PURE__ */ new WeakMap();
function Lp(e) {
  return dr.set(e.element, e), function() {
    dr.delete(e.element);
  };
}
var Xs = cp(), zl = Dp({
  typeKey: "element",
  defaultDropEffect: "move",
  mount: function(t) {
    return Pr(Xs.bindEvents(), Ht.bind(document, {
      type: "dragstart",
      listener: function(r) {
        var o, s, i, l, a, u;
        if (t.canStart(r) && !r.defaultPrevented && r.dataTransfer) {
          var f = r.target;
          if (f instanceof HTMLElement) {
            var h = dr.get(f);
            if (h) {
              var y = yn(r), w = {
                element: h.element,
                dragHandle: (o = h.dragHandle) !== null && o !== void 0 ? o : null,
                input: y
              };
              if (h.canDrag && !h.canDrag(w)) {
                r.preventDefault();
                return;
              }
              if (h.dragHandle) {
                var M = $l({
                  x: y.clientX,
                  y: y.clientY
                });
                if (!h.dragHandle.contains(M)) {
                  r.preventDefault();
                  return;
                }
              }
              var O = (s = (i = h.getInitialDataForExternal) === null || i === void 0 ? void 0 : i.call(h, w)) !== null && s !== void 0 ? s : null;
              if (O)
                for (var D = 0, H = Object.entries(O); D < H.length; D++) {
                  var C = Kl(H[D], 2), K = C[0], I = C[1];
                  r.dataTransfer.setData(K, I ?? "");
                }
              kp() && !r.dataTransfer.types.includes(Ys) && !r.dataTransfer.types.includes(Hp) && r.dataTransfer.setData(Ys, Fp), r.dataTransfer.setData(jp, "");
              var $ = {
                element: h.element,
                dragHandle: (l = h.dragHandle) !== null && l !== void 0 ? l : null,
                data: (a = (u = h.getInitialData) === null || u === void 0 ? void 0 : u.call(h, w)) !== null && a !== void 0 ? a : {}
              }, W = {
                type: "element",
                payload: $,
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
    (n = dr.get(s.source.element)) === null || n === void 0 || (r = n[o]) === null || r === void 0 || r.call(
      n,
      // I cannot seem to get the types right here.
      // TS doesn't seem to like that one event can need `nativeSetDragImage`
      // @ts-expect-error
      s
    );
  },
  onPostDispatch: Xs.getOnPostDispatch()
}), Kp = zl.dropTarget;
function Vp(e) {
  var t = Pr(
    // making the draggable register the adapter rather than drop targets
    // this is because you *must* have a draggable element to start a drag
    // but you _might_ not have any drop targets immediately
    // (You might create drop targets async)
    zl.registerUsage(),
    Lp(e),
    Ul(e.element, {
      attribute: "draggable",
      value: "true"
    })
  );
  return Kt(t);
}
function Bp(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
    if (t.indexOf(r) !== -1) continue;
    n[r] = e[r];
  }
  return n;
}
function $p(e, t) {
  if (e == null) return {};
  var n, r, o = Bp(e, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    for (r = 0; r < s.length; r++) n = s[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (o[n] = e[n]);
  }
  return o;
}
function ql(e, t) {
  var n = Object.keys(e), r = Object.keys(t);
  return n.length !== r.length ? !1 : n.every(function(o) {
    return Object.is(e[o], t[o]);
  });
}
function Np() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ql, t = null;
  return function(n) {
    return t && e(t.value, n) || (t = {
      value: n
    }), t.value;
  };
}
var Wp = ["block"];
function Js(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Zs(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Js(Object(n), !0).forEach(function(r) {
      Dn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Js(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Up(e) {
  return {
    x: (e.right + e.left) / 2,
    y: (e.bottom + e.top) / 2
  };
}
function io(e) {
  var t = e.client, n = e.borderBox, r = n.height / 4;
  return t.y <= n.top + r ? "reorder-above" : t.y >= n.bottom - r ? "reorder-below" : "make-child";
}
function zp(e) {
  var t = e.element, n = e.input, r = e.currentLevel, o = e.indentPerLevel, s = e.mode, i = {
    x: n.clientX,
    y: n.clientY
  }, l = t.getBoundingClientRect();
  if (s === "standard") {
    var a = io({
      borderBox: l,
      client: i
    });
    return {
      type: a,
      indentPerLevel: o,
      currentLevel: r
    };
  }
  var u = Up(l);
  if (s === "expanded") {
    var f = io({
      borderBox: l,
      client: i
    });
    return {
      // Use the "standard" hitbox for "reorder above",
      // The rest of the item is "make-child"
      type: f === "reorder-above" ? f : "make-child",
      indentPerLevel: o,
      currentLevel: r
    };
  }
  var h = o * r;
  if (i.x < l.left + h) {
    if (i.y < u.y)
      return {
        type: "reorder-above",
        indentPerLevel: o,
        currentLevel: r
      };
    var y = (i.x - l.left) / o, w = Math.max(Math.floor(y), 0);
    return {
      type: "reparent",
      desiredLevel: w,
      indentPerLevel: o,
      currentLevel: r
    };
  }
  return {
    type: io({
      borderBox: l,
      client: i
    }),
    indentPerLevel: o,
    currentLevel: r
  };
}
function Gl(e, t) {
  return e.type !== t.type ? !1 : e.type === "instruction-blocked" && t.type === "instruction-blocked" ? Gl(e.desired, t.desired) : ql(e, t);
}
var qp = Np(Gl);
function Gp(e) {
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
function Yp(e, t) {
  var n = t.block, r = $p(t, Wp), o = zp(r), s = Gp({
    desired: o,
    block: n
  }), i = qp(s);
  return Zs(Zs({}, e), {}, Dn({}, Yl, i));
}
function Qs(e) {
  var t;
  return (t = e[Yl]) !== null && t !== void 0 ? t : null;
}
var Yl = Symbol("tree-item-instruction");
const Xp = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ef5350" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m6 10h-4v8a4 4 0 1 1-4-4 3.96 3.96 0 0 1 2 .555V8h6Z"/></svg>', Jp = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#ff7043" d="M2 2a1 1 0 0 0-1 1v10c0 .554.446 1 1 1h12c.554 0 1-.446 1-1V3a1 1 0 0 0-1-1zm0 3h12v8H2zm1 2 2 2-2 2 1 1 3-3-3-3zm5 3.5V12h5v-1.5z"/></svg>', Zp = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#7e57c2" d="M20 18h-2v-2h-2v2c0 .193 0 .703 1.254 1.033A3.345 3.345 0 0 1 20 22h2v2h2v-2c0-.388-.562-.851-1.254-1.034C20.356 20.34 20 18.84 20 18m-3.254 2.966C14.356 20.34 14 18.84 14 18h-2v-2h-2v8h2v-2h4v2h2v-2c0-.388-.562-.851-1.254-1.034"/><path fill="#7e57c2" d="M24 4H4v20a4 4 0 0 0 4 4h16.16A3.84 3.84 0 0 0 28 24.16V8a4 4 0 0 0-4-4m2 14h-2v-2h-2v2c0 .193 0 .703 1.254 1.033A3.345 3.345 0 0 1 26 22v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1 2-2h2a2 2 0 0 1 2 2Z"/></svg>', Qp = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ffca28" d="M16 24c-5.525 0-10-.9-10-2v4c0 1.1 4.475 2 10 2s10-.9 10-2v-4c0 1.1-4.475 2-10 2m0-8c-5.525 0-10-.9-10-2v4c0 1.1 4.475 2 10 2s10-.9 10-2v-4c0 1.1-4.475 2-10 2m0-12C10.477 4 6 4.895 6 6v4c0 1.1 4.475 2 10 2s10-.9 10-2V6c0-1.105-4.477-2-10-2"/></svg>', eg = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/><path fill="#42a5f5" d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5z"/></svg>', tg = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m8.668 6h3.6641l-3.6641-3.668v3.668m-4.668-4.668h5.332l4 4v8c0 0.73828-0.59375 1.3359-1.332 1.3359h-8c-0.73828 0-1.332-0.59766-1.332-1.3359v-10.664c0-0.74219 0.59375-1.3359 1.332-1.3359m3.332 1.3359h-3.332v10.664h8v-6h-4.668z" fill="#90a4ae" /></svg>', ng = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m6.922 3.768-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232" fill="#90a4ae" /></svg>', rg = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.483 6H4.721a1 1 0 0 0-.949.684L2 12V5h12a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232l-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h11l2.403-5.606A1 1 0 0 0 14.483 6" fill="#90a4ae" /></svg>', og = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#e65100" d="m4 4 2 22 10 2 10-2 2-22Zm19.72 7H11.28l.29 3h11.86l-.802 9.335L15.99 25l-6.635-1.646L8.93 19h3.02l.19 2 3.86.77 3.84-.77.29-4H8.84L8 8h16Z"/></svg>', sg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#26a69a" d="M8.5 6h4l-4-4zM3.875 1H9.5l4 4v8.6c0 .773-.616 1.4-1.375 1.4h-8.25c-.76 0-1.375-.627-1.375-1.4V2.4c0-.777.612-1.4 1.375-1.4M4 13.6h8V8l-2.625 2.8L8 9.4zm1.25-7.7c-.76 0-1.375.627-1.375 1.4s.616 1.4 1.375 1.4c.76 0 1.375-.627 1.375-1.4S6.009 5.9 5.25 5.9"/></svg>', ig = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#ffca28" d="M2 2v12h12V2zm6 6h1v4a1.003 1.003 0 0 1-1 1H7a1.003 1.003 0 0 1-1-1v-1h1v1h1zm3 0h2v1h-2v1h1a1.003 1.003 0 0 1 1 1v1a1.003 1.003 0 0 1-1 1h-2v-1h2v-1h-1a1.003 1.003 0 0 1-1-1V9a1.003 1.003 0 0 1 1-1"/></svg>', lg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path fill="#f9a825" d="M560-160v-80h120q17 0 28.5-11.5T720-280v-80q0-38 22-69t58-44v-14q-36-13-58-44t-22-69v-80q0-17-11.5-28.5T680-720H560v-80h120q50 0 85 35t35 85v80q0 17 11.5 28.5T840-560h40v160h-40q-17 0-28.5 11.5T800-360v80q0 50-35 85t-85 35zm-280 0q-50 0-85-35t-35-85v-80q0-17-11.5-28.5T120-400H80v-160h40q17 0 28.5-11.5T160-600v-80q0-50 35-85t85-35h120v80H280q-17 0-28.5 11.5T240-680v80q0 38-22 69t-58 44v14q36 13 58 44t22 69v80q0 17 11.5 28.5T280-240h120v80z"/></svg>', ag = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#42a5f5" d="m14 10-4 3.5L6 10H4v12h4v-6l2 2 2-2v6h4V10zm12 6v-6h-4v6h-4l6 8 6-8z"/></svg>', cg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ef5350" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m4.93 10.44c.41.9.93 1.64 1.53 2.15l.41.32c-.87.16-2.07.44-3.34.93l-.11.04.5-1.04c.45-.87.78-1.66 1.01-2.4m6.48 3.81c.18-.18.27-.41.28-.66.03-.2-.02-.39-.12-.55-.29-.47-1.04-.69-2.28-.69l-1.29.07-.87-.58c-.63-.52-1.2-1.43-1.6-2.56l.04-.14c.33-1.33.64-2.94-.02-3.6a.85.85 0 0 0-.61-.24h-.24c-.37 0-.7.39-.79.77-.37 1.33-.15 2.06.22 3.27v.01c-.25.88-.57 1.9-1.08 2.93l-.96 1.8-.89.49c-1.2.75-1.77 1.59-1.88 2.12-.04.19-.02.36.05.54l.03.05.48.31.44.11c.81 0 1.73-.95 2.97-3.07l.18-.07c1.03-.33 2.31-.56 4.03-.75 1.03.51 2.24.74 3 .74.44 0 .74-.11.91-.3m-.41-.71.09.11c-.01.1-.04.11-.09.13h-.04l-.19.02c-.46 0-1.17-.19-1.9-.51.09-.1.13-.1.23-.1 1.4 0 1.8.25 1.9.35M7.83 17c-.65 1.19-1.24 1.85-1.69 2 .05-.38.5-1.04 1.21-1.69zm3.02-6.91c-.23-.9-.24-1.63-.07-2.05l.07-.12.15.05c.17.24.19.56.09 1.1l-.03.16-.16.82z"/></svg>', ug = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#e64a19" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zM8 11v2h1v6H8v1h4v-1h-1v-2h2a3 3 0 0 0 3-3 3 3 0 0 0-3-3zm5 2a1 1 0 0 1 1 1 1 1 0 0 1-1 1h-2v-2z"/></svg>', fg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#0288d1" d="M9.86 2A2.86 2.86 0 0 0 7 4.86v1.68h4.29c.39 0 .71.57.71.96H4.86A2.86 2.86 0 0 0 2 10.36v3.781a2.86 2.86 0 0 0 2.86 2.86h1.18v-2.68a2.85 2.85 0 0 1 2.85-2.86h5.25c1.58 0 2.86-1.271 2.86-2.851V4.86A2.86 2.86 0 0 0 14.14 2zm-.72 1.61c.4 0 .72.12.72.71s-.32.891-.72.891c-.39 0-.71-.3-.71-.89s.32-.711.71-.711"/><path fill="#fdd835" d="M17.959 7v2.68a2.85 2.85 0 0 1-2.85 2.859H9.86A2.85 2.85 0 0 0 7 15.389v3.75a2.86 2.86 0 0 0 2.86 2.86h4.28A2.86 2.86 0 0 0 17 19.14v-1.68h-4.291c-.39 0-.709-.57-.709-.96h7.14A2.86 2.86 0 0 0 22 13.64V9.86A2.86 2.86 0 0 0 19.14 7zM8.32 11.513l-.004.004.038-.004zm6.54 7.276c.39 0 .71.3.71.89a.71.71 0 0 1-.71.71c-.4 0-.72-.12-.72-.71s.32-.89.72-.89"/></svg>', dg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#8bc34a" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zm4 7.5h-4v2h1l-2 1.67L10 13h1v-2H7v2h1l3 2.5L8 18H7v2h4v-2h-1l2-1.67L14 18h-1v2h4v-2h-1l-3-2.5 3-2.5h1z"/></svg>', pg = '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 16 16"><path fill="#0288d1" d="M2 2v12h12V2zm4 6h3v1H8v4H7V9H6zm5 0h2v1h-2v1h1a1.003 1.003 0 0 1 1 1v1a1.003 1.003 0 0 1-1 1h-2v-1h2v-1h-1a1.003 1.003 0 0 1-1-1V9a1.003 1.003 0 0 1 1-1"/></svg>', gg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ff9800" d="m24 6 2 6h-4l-2-6h-3l2 6h-4l-2-6h-3l2 6H8L6 6H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3V6Z"/></svg>', hg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#01579b" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zM7 13l1.5 7h2l1.5-3 1.5 3h2l1.5-7h1v-2h-4v2h1l-.9 4.2L13 15h-2l-1.1 2.2L9 13h1v-2H6v2z"/></svg>', vg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#8bc34a" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m.12 13.5 3.74 3.74 1.42-1.41-2.33-2.33 2.33-2.33-1.42-1.41zm11.16 0-3.74-3.74-1.42 1.41 2.33 2.33-2.33 2.33 1.42 1.41z"/></svg>', mg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ff5252" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2m12 16v-2H9v2zm-4-4v-2H6v2z"/></svg>', wg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#afb42b" d="M14 17h-2v-2h-2v-2h2v2h2m0-6h-2v2h2v2h-2v-2h-2V9h2V7h-2V5h2v2h2m5-4H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2"/></svg>', yg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, bg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, _g = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, xg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Sg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Rg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Cg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Mg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Ig = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Eg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Ag = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Og = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Pg = ["aria-label"], Tg = {
  key: 0,
  class: "pnl-tst-tsep",
  "aria-hidden": "true"
}, Dg = {
  key: 1,
  class: "pnl-tst-search"
}, kg = ["innerHTML"], Fg = ["value", "aria-label", "placeholder"], Hg = ["aria-label", "aria-keyshortcuts", "aria-disabled", "title", "tabindex", "onClick", "onFocus"], jg = ["innerHTML"], Lg = {
  key: 1,
  class: "pnl-tst-empty"
}, Kg = ["aria-label", "aria-colcount", "aria-rowcount"], Vg = {
  key: 0,
  class: "pnl-tst-head",
  role: "rowgroup"
}, Bg = {
  class: "pnl-tst-hrow",
  role: "row",
  "aria-rowindex": 1
}, $g = ["aria-colindex"], Ng = {
  class: "pnl-tst-body",
  role: "rowgroup"
}, Wg = ["aria-level", "aria-posinset", "aria-setsize", "aria-rowindex", "aria-expanded", "aria-selected", "tabindex", "onClick", "onFocus"], Ug = ["aria-colindex"], zg = ["onClick"], qg = {
  key: 1,
  class: "pnl-tst-twisty pnl-tst-twisty--leaf",
  "aria-hidden": "true"
}, Gg = ["checked", ".indeterminate", "aria-label", "onClick"], Yg = ["innerHTML"], Xg = { class: "pnl-tst-value" }, Jg = "title", Gn = "search", Yn = "|", un = "pnl-tst-row", Zg = 500, Qg = {
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
      rowExpandingFeature: Id,
      rowSelectionFeature: Vd,
      coreRowModel: Ml(),
      expandedRowModel: Bd()
    }, r = Y(() => (t.state.columns || []).length > 0), o = Y(() => {
      const c = t.state.columns || [];
      return c.length === 0 ? [{ id: Jg, header: "", accessorFn: (p) => p.title }] : c.map((p) => {
        const v = p.field ?? p.id;
        return {
          id: p.id,
          header: p.header ?? p.id,
          accessorFn: (b) => b[v],
          meta: { width: p.width }
        };
      });
    }), s = /* @__PURE__ */ $e(i(t.state.expandedKeys));
    function i(c) {
      const p = {};
      for (const v of c || []) p[v] = !0;
      return p;
    }
    function l(c) {
      return c === !0 ? H.getCoreRowModel().flatRows.filter((p) => p.subRows.length > 0).map((p) => p.id).sort() : Object.keys(c).filter((p) => c[p]).sort();
    }
    const a = {
      audio: Xp,
      console: Jp,
      css: Zp,
      database: Qp,
      document: eg,
      file: tg,
      folder: ng,
      "folder-open": rg,
      html: og,
      image: sg,
      javascript: ig,
      json: lg,
      markdown: ag,
      pdf: cg,
      powerpoint: ug,
      python: fg,
      table: dg,
      typescript: pg,
      video: gg,
      word: hg,
      xml: vg,
      yaml: mg,
      zip: wg
    };
    function u(c) {
      return c ? { ...a, ...t.state.icons || {} }[c] ?? null : null;
    }
    function f(c) {
      const p = c.original.icon;
      return p ? (qe(c) ? u(`${p}-open`) : null) ?? u(p) : null;
    }
    function h(c, p) {
      return c.length !== p.length ? !1 : c.every((v, b) => v === p[b]);
    }
    const y = Y(() => t.state.options.select_mode ?? "none"), w = Y(() => y.value !== "none"), M = Y(() => y.value === "hierarchy"), O = Y(
      () => w.value && t.state.options.show_checkboxes !== !1
    ), D = /* @__PURE__ */ $e(i(t.state.selectedKeys)), H = Ud({
      features: n,
      data: Y(() => t.state.source || []),
      columns: o,
      getRowId: (c) => c.key,
      getSubRows: (c) => c.children,
      // TanStack resets `expanded` whenever `data` changes. Python rewrites the
      // whole tree after every move, so leaving that on would collapse the tree on
      // each drop and push an empty `expanded_keys` back. Expansion is owned here.
      autoResetExpanded: !1,
      enableRowSelection: w,
      enableMultiRowSelection: Y(() => y.value !== "single"),
      enableSubRowSelection: M,
      state: Y(() => ({ expanded: s.value, rowSelection: D.value })),
      onExpandedChange: (c) => {
        s.value = typeof c == "function" ? c(s.value) : c;
      },
      onRowSelectionChange: (c) => {
        D.value = typeof c == "function" ? c(D.value) : c;
      }
    });
    function C(c) {
      if (c.getIsSelected()) return "all";
      if (!M.value || c.subRows.length === 0) return "none";
      const p = c.subRows.map(C);
      return p.every((v) => v === "all") ? "all" : p.some((v) => v !== "none") ? "some" : "none";
    }
    be(() => l(D.value), t.setSelectedKeys, { flush: "post" }), be(() => l(s.value), t.setExpandedKeys, { flush: "post" }), be(
      () => t.state.expandedKeys,
      (c) => {
        h(l(s.value), [...c || []].sort()) || (s.value = i(c));
      }
    ), be(
      () => t.state.selectedKeys,
      (c) => {
        h(l(D.value), [...c || []].sort()) || (D.value = i(c));
      }
    ), be(
      () => [t.state.options.expand_all, t.state.source],
      ([c]) => {
        c && H.toggleAllRowsExpanded(!0);
      },
      { immediate: !0 }
    );
    const K = Y(() => (t.state.filterText ?? "").trim().toLowerCase()), I = Y(() => K.value.length > 0), $ = /* @__PURE__ */ $e(t.state.filterText ?? "");
    be(
      () => t.state.filterText,
      (c) => {
        $.value = c ?? "";
      }
    );
    function W(c) {
      $.value = c, t.setFilterText(c);
    }
    function ce(c) {
      return c.getAllCells().some((p) => String(p.getValue() ?? "").toLowerCase().includes(K.value));
    }
    const k = Y(() => {
      if (!I.value) return H.getRowModel().rows;
      const c = /* @__PURE__ */ new Set();
      for (const p of H.getCoreRowModel().flatRows)
        if (ce(p)) {
          c.add(p.id);
          for (let v = p.getParentRow(); v; v = v.getParentRow()) c.add(v.id);
        }
      return H.getCoreRowModel().flatRows.filter((p) => c.has(p.id));
    }), F = Y(() => {
      var c;
      return ((c = H.getHeaderGroups()[0]) == null ? void 0 : c.headers) ?? [];
    }), q = Y(() => t.state.options.indent_px ?? 16), ue = Y(() => t.state.options.aria_label ?? "Tree table"), se = Y(() => I.value ? "No matches" : "No data"), he = Y(() => r.value ? 2 : 1), Ae = Y(() => k.value.length + (r.value ? 1 : 0)), Re = Y(() => {
      const c = /* @__PURE__ */ new Map();
      for (const p of k.value) {
        const v = p.parentId ?? "", b = c.get(v) ?? [];
        b.push(p.id), c.set(v, b);
      }
      return c;
    });
    function te(c) {
      return Re.value.get(c.parentId ?? "") ?? [];
    }
    function G(c) {
      return te(c).indexOf(c.id) + 1;
    }
    function ne(c) {
      return te(c).length;
    }
    function Te(c) {
      return I.value ? (Re.value.get(c.id) ?? []).length > 0 : c.getCanExpand();
    }
    function qe(c) {
      return I.value ? Te(c) : c.getIsExpanded();
    }
    function Ve(c) {
      var v;
      const p = (v = c.meta) == null ? void 0 : v.width;
      return p ? { flex: `0 0 ${p}px` } : { flex: "1 1 0" };
    }
    function Fe(c, p) {
      return { ...Ve(p), paddingInlineStart: `${c.depth * q.value}px` };
    }
    const ht = /* @__PURE__ */ $e(null), vt = /* @__PURE__ */ $e(!0), Vt = /* @__PURE__ */ new Map();
    function He(c) {
      ht.value = c, vt.value = !0;
    }
    function Bt(c, p) {
      p ? Vt.set(c, p) : Vt.delete(c);
    }
    const mt = Y(() => {
      const c = k.value;
      return c.length === 0 ? null : c.some((p) => p.id === ht.value) ? ht.value : c[0].id;
    });
    function Be(c) {
      c != null && (He(c), Jn(() => {
        var p;
        return (p = Vt.get(c)) == null ? void 0 : p.focus();
      }));
    }
    function Ge(c) {
      const p = k.value;
      p.length !== 0 && Be(p[Math.max(0, Math.min(c, p.length - 1))].id);
    }
    function Dr(c, p) {
      const v = k.value;
      if (v.length === 0) return;
      const b = v[Math.max(0, Math.min(c, v.length - 1))], L = (p == null ? void 0 : p.shiftKey) && w.value && y.value !== "single";
      L && g.value === null && (g.value = mt.value), Be(b.id), L && R(b, !1);
    }
    function d(c) {
      const p = k.value;
      if (p.length === 0) return;
      const v = Math.max(
        0,
        p.findIndex((L) => L.id === mt.value)
      ), b = p[v];
      if (c.ctrlKey || c.metaKey) {
        const L = { a: "select-all", f: Gn }[c.key.toLowerCase()];
        if (L && $t(L)) {
          c.preventDefault(), we(L);
          return;
        }
      }
      if (c.altKey) {
        const L = {
          ArrowUp: "move-up",
          ArrowDown: "move-down",
          ArrowLeft: "outdent",
          ArrowRight: "indent"
        }[c.key];
        if (L && $t(L)) {
          c.preventDefault(), we(L);
          return;
        }
      }
      if (c.key === "Insert" || c.key === "Delete" || c.key === "Escape") {
        const L = c.key === "Insert" ? c.shiftKey ? "new-file" : "new-folder" : c.key === "Delete" ? "delete" : "clear-selection";
        if ($t(L)) {
          c.preventDefault(), we(L);
          return;
        }
      }
      switch (c.key) {
        case "ArrowDown":
          c.preventDefault(), Dr(v + 1, c);
          break;
        case "ArrowUp":
          c.preventDefault(), Dr(v - 1, c);
          break;
        case "ArrowRight":
          if (c.preventDefault(), !Te(b)) break;
          qe(b) ? Ge(v + 1) : (b.toggleExpanded(!0), Be(b.id));
          break;
        case "ArrowLeft":
          c.preventDefault(), !I.value && b.getCanExpand() && b.getIsExpanded() ? (b.toggleExpanded(!1), Be(b.id)) : b.parentId && Be(b.parentId);
          break;
        case "Home":
          c.preventDefault(), Ge(0);
          break;
        case "End":
          c.preventDefault(), Ge(p.length - 1);
          break;
        case "Enter":
          c.preventDefault(), t.emitEvent("activate", { key: b.id });
          break;
        case " ":
          if (!w.value) break;
          c.preventDefault(), B(b);
          break;
      }
    }
    const g = /* @__PURE__ */ $e(null);
    function m(c) {
      g.value = c.id, D.value = {}, c.toggleSelected(!0, { selectChildren: !1 });
    }
    function R(c, p) {
      const v = k.value, b = v.findIndex((Le) => Le.id === g.value), L = v.findIndex((Le) => Le.id === c.id);
      if (L === -1) return;
      if (b === -1) {
        m(c);
        return;
      }
      p || (D.value = {});
      const [ee, Oe] = b <= L ? [b, L] : [L, b];
      for (let Le = ee; Le <= Oe; Le += 1)
        v[Le].toggleSelected(!0, { selectChildren: !1 });
    }
    const S = Y(() => t.state.options.toggle_on_click === !0);
    function _(c) {
      const p = l(D.value);
      return p.length === 1 && p[0] === c.id;
    }
    function P() {
      D.value = {}, g.value = null, vt.value = !1;
    }
    function A() {
      l(D.value).length === 0 && (vt.value = !1);
    }
    be(
      () => l(D.value).length > 0,
      (c) => {
        c && (vt.value = !0);
      }
    );
    function E(c, p) {
      He(c.id);
      const v = !!(p != null && p.shiftKey || p != null && p.ctrlKey || p != null && p.metaKey);
      w.value && !v && S.value && _(c) ? P() : w.value && y.value !== "single" ? p != null && p.shiftKey ? R(c, p.ctrlKey || p.metaKey) : p != null && p.ctrlKey || p != null && p.metaKey ? (g.value = c.id, j(c)) : m(c) : w.value && m(c), t.emitEvent("activate", { key: c.id });
    }
    function x(c) {
      He(c.id), !I.value && c.toggleExpanded();
    }
    function V(c) {
      return C(c) === "all";
    }
    function T(c) {
      return C(c) === "some";
    }
    function j(c) {
      He(c.id), c.toggleSelected(void 0, { selectChildren: !1 }), A();
    }
    function B(c) {
      He(c.id), c.toggleSelected(!V(c), {
        selectChildren: M.value,
        deselectParents: M.value
      }), A();
    }
    function z(c) {
      B(c), Be(c.id);
    }
    const X = {
      "new-folder": { icon: Rg, label: "New folder", keys: "Insert", node: {} },
      "new-file": {
        icon: Sg,
        label: "New file",
        keys: "Shift+Insert",
        node: { allow_children: !1 }
      },
      delete: { icon: Og, label: "Delete", keys: "Delete" },
      "move-up": { icon: bg, label: "Move up", keys: "Alt+ArrowUp" },
      "move-down": { icon: yg, label: "Move down", keys: "Alt+ArrowDown" },
      outdent: { icon: Cg, label: "Outdent", keys: "Alt+ArrowLeft" },
      indent: { icon: Mg, label: "Indent", keys: "Alt+ArrowRight" },
      "expand-all": { icon: _g, label: "Expand all" },
      "collapse-all": { icon: xg, label: "Collapse all" },
      "select-all": { icon: Ag, label: "Select all", keys: "Control+A" },
      "clear-selection": { icon: Eg, label: "Clear selection", keys: "Escape" }
    }, J = [
      "new-folder",
      "new-file",
      "delete",
      Yn,
      "move-up",
      "move-down",
      "outdent",
      "indent",
      Yn,
      "expand-all",
      "collapse-all",
      Yn,
      "select-all",
      "clear-selection",
      Gn
    ], ae = Y(() => {
      const c = t.state.options.toolbar, p = c === !0 ? J : Array.isArray(c) ? c : [], v = [];
      return p.forEach((b, L) => {
        const ee = typeof b == "string" ? {} : b || {}, Oe = typeof b == "string" ? b : ee.id, Le = `${Oe}#${L}`;
        if (Oe === Yn || Oe === Gn) {
          v.push({ uid: Le, id: Oe });
          return;
        }
        const ln = X[Oe];
        if (!ln) return;
        const es = ee.label ?? ln.label;
        v.push({
          uid: Le,
          id: Oe,
          label: es,
          icon: u(ee.icon) ?? ln.icon,
          keys: ln.keys,
          node: { title: es, ...ln.node ?? {}, ...ee.node ?? {} }
        });
      }), v;
    }), ve = Y(() => ae.value.length > 0), je = Y(() => t.state.options.toolbar_label ?? "Tree actions"), De = Y(() => t.state.options.search_label ?? "Search");
    function wt(c) {
      return ae.value.find((p) => p.id === c) ?? null;
    }
    function $t(c) {
      return wt(c) !== null;
    }
    function we(c) {
      const p = wt(c);
      p && Go(p);
    }
    const ge = Y(() => k.value.find((c) => c.id === mt.value) ?? null);
    function kn(c) {
      return k.value.filter((p) => (p.parentId ?? "") === (c.parentId ?? ""));
    }
    function rn() {
      const c = ge.value;
      if (!c) return [];
      const p = Xo(c), v = c.parentId ?? "";
      return p.every((L) => {
        var ee;
        return (((ee = Kn(L)) == null ? void 0 : ee.parentId) ?? "") === v;
      }) ? p : [c.id];
    }
    function zo() {
      const c = ge.value;
      if (!c) return [];
      if (!w.value || !c.getIsSelected()) return [c.id];
      const p = k.value.filter((v) => v.getIsSelected()).map((v) => v.id);
      return p.length > 0 ? p : [c.id];
    }
    function Nt(c) {
      const p = ge.value;
      if (!p) return null;
      const v = new Set(rn()), b = kn(p), L = b.map((Oe, Le) => v.has(Oe.id) ? Le : -1).filter((Oe) => Oe >= 0);
      if (L.length === 0) return null;
      let ee = (c < 0 ? Math.min(...L) : Math.max(...L)) + c;
      for (; ee >= 0 && ee < b.length && v.has(b[ee].id); ) ee += c;
      return b[ee] ?? null;
    }
    let on = null;
    be(
      () => t.state.source,
      () => {
        const c = on;
        if (on = null, !!c) {
          if (c.key !== void 0) {
            Be(c.key);
            return;
          }
          Jn(() => {
            c.index !== void 0 ? Ge(c.index) : Xl(c.added);
          });
        }
      }
    );
    function Xl(c) {
      const p = H.getCoreRowModel().flatRows.find((v) => !c.has(v.id));
      p && (Be(p.id), w.value && (D.value = {}, g.value = p.id, p.toggleSelected(!0, { selectChildren: !1 })));
    }
    function Fn(c, p) {
      const v = ge.value;
      !v || !c || (on = { key: v.id }, t.emitEvent("move", {
        key: v.id,
        keys: rn(),
        position: p,
        anchorKey: c.id
      }));
    }
    function Jl(c) {
      const p = ge.value, v = p ? p.original.allow_children === !1 ? "after" : "child" : null;
      p && v === "child" && !I.value && p.toggleExpanded(!0), on = { added: new Set(H.getCoreRowModel().flatRows.map((b) => b.id)) }, t.emitEvent("add", { anchorKey: (p == null ? void 0 : p.id) ?? null, position: v, node: c.node });
    }
    function Zl() {
      var p;
      const c = zo();
      c.length !== 0 && (on = { index: k.value.findIndex((v) => {
        var b;
        return v.id === ((b = ge.value) == null ? void 0 : b.id);
      }) }, t.emitEvent("delete", { key: ((p = ge.value) == null ? void 0 : p.id) ?? null, keys: c }));
    }
    function qo(c) {
      var p;
      switch (c.id) {
        case "new-folder":
        case "new-file":
          return !0;
        case "delete":
          return zo().length > 0;
        case "move-up":
          return Nt(-1) !== null;
        case "move-down":
          return Nt(1) !== null;
        case "indent": {
          const v = Nt(-1);
          return v !== null && v.original.allow_children !== !1;
        }
        case "outdent":
          return !!((p = ge.value) != null && p.parentId);
        case "expand-all":
        case "collapse-all":
          return k.value.length > 0 && !I.value;
        case "select-all":
          return k.value.length > 0 && w.value && y.value !== "single";
        case "clear-selection":
          return w.value && l(D.value).length > 0;
        default:
          return !0;
      }
    }
    function Ql(c) {
      return c.keys ? `${c.label} (${c.keys.replace("Control", "Ctrl")})` : c.label;
    }
    function Go(c) {
      var p, v, b, L;
      if (qo(c))
        switch (c.id) {
          case "new-folder":
          case "new-file":
            Jl(c);
            break;
          case "delete":
            Zl();
            break;
          case "move-up":
            Fn(Nt(-1), "before");
            break;
          case "move-down":
            Fn(Nt(1), "after");
            break;
          case "indent": {
            const ee = Nt(-1);
            ee && !I.value && ee.toggleExpanded(!0), Fn(ee, "child");
            break;
          }
          case "outdent":
            Fn(Kn((p = ge.value) == null ? void 0 : p.parentId), "after");
            break;
          case "expand-all":
            H.toggleAllRowsExpanded(!0);
            break;
          case "collapse-all":
            H.toggleAllRowsExpanded(!1);
            break;
          case "select-all":
            D.value = Object.fromEntries(k.value.map((ee) => [ee.id, !0])), g.value = ((v = k.value[0]) == null ? void 0 : v.id) ?? null;
            break;
          case "clear-selection":
            P();
            break;
          case Gn:
            (b = kr.value) == null || b.focus(), (L = kr.value) == null || L.select();
            break;
        }
    }
    const kr = /* @__PURE__ */ $e(null), Fr = Y(() => ae.value.filter((c) => c.id in X)), Hn = /* @__PURE__ */ $e(null), Hr = /* @__PURE__ */ new Map(), Yo = Y(() => {
      const c = Fr.value;
      return c.length === 0 ? null : c.some((p) => p.uid === Hn.value) ? Hn.value : c[0].uid;
    });
    function ea(c, p) {
      p ? Hr.set(c, p) : Hr.delete(c);
    }
    function jn(c) {
      const p = Fr.value;
      if (p.length === 0) return;
      const v = p[Math.max(0, Math.min(c, p.length - 1))].uid;
      Hn.value = v, Jn(() => {
        var b;
        return (b = Hr.get(v)) == null ? void 0 : b.focus();
      });
    }
    function ta(c) {
      const p = Fr.value, v = Math.max(
        0,
        p.findIndex((b) => b.uid === Yo.value)
      );
      switch (c.key) {
        case "ArrowRight":
          c.preventDefault(), jn(v + 1);
          break;
        case "ArrowLeft":
          c.preventDefault(), jn(v - 1);
          break;
        case "Home":
          c.preventDefault(), jn(0);
          break;
        case "End":
          c.preventDefault(), jn(p.length - 1);
          break;
      }
    }
    const na = ["reorder-above", "reorder-below", "make-child", "reparent"], jr = Y(() => t.state.options.enable_dnd === !0), Lr = /* @__PURE__ */ $e([]), Ln = /* @__PURE__ */ $e(null);
    function Kn(c) {
      return k.value.find((p) => p.id === c) ?? null;
    }
    function ra(c, p) {
      let v = c;
      for (; v; ) {
        if (p.includes(v.id)) return !0;
        v = v.getParentRow();
      }
      return !1;
    }
    function Xo(c) {
      if (!w.value || !c.getIsSelected()) return [c.id];
      const p = /* @__PURE__ */ new Set();
      for (let b = c.getParentRow(); b; b = b.getParentRow()) p.add(b.id);
      const v = k.value.filter((b) => b.getIsSelected() && !p.has(b.id)).map((b) => b.id);
      return v.length > 1 ? v : [c.id];
    }
    function oa(c, p) {
      return ra(c, p) ? na : c.original.allow_children === !1 ? ["make-child"] : [];
    }
    function sa(c) {
      if (Te(c) && qe(c)) return "expanded";
      const p = te(c);
      return p[p.length - 1] === c.id ? "last-in-group" : "standard";
    }
    let Kr = null, sn = null;
    function Vr() {
      sn && clearTimeout(sn), sn = null, Kr = null;
    }
    function ia(c, p) {
      if (Kr === c || (Vr(), !p || p.type === "instruction-blocked")) return;
      const v = Kn(c);
      !v || !v.getCanExpand() || v.getIsExpanded() || (Kr = c, sn = setTimeout(() => {
        sn = null;
        const b = Kn(c);
        b && b.getCanExpand() && !b.getIsExpanded() && b.toggleExpanded(!0);
      }, Zg));
    }
    function Br() {
      Ln.value = null, Vr();
    }
    const Jo = /* @__PURE__ */ $e(null);
    function la() {
      let c = Jo.value;
      if (!c) return null;
      let p = c.getRootNode();
      for (; p.host; )
        c = p.host, p = c.getRootNode();
      return c;
    }
    function Vn(c) {
      for (const p of k.value) {
        const v = Vt.get(p.id);
        if (!v) continue;
        const b = v.getBoundingClientRect();
        if (c.clientX >= b.left && c.clientX < b.right && c.clientY >= b.top && c.clientY < b.bottom)
          return { row: p, element: v, rect: b };
      }
      return null;
    }
    function aa(c, p) {
      for (const v of c.element.querySelectorAll(".pnl-tst-check, .pnl-tst-twisty")) {
        const b = v.getBoundingClientRect();
        if (p.clientX >= b.left && p.clientX < b.right && p.clientY >= b.top && p.clientY < b.bottom)
          return !0;
      }
      return !1;
    }
    let yt = null;
    function Zo() {
      yt == null || yt(), yt = null;
      const c = la();
      !c || !jr.value || (yt = Pr(
        Vp({
          element: c,
          // Anything outside a row (the header, the empty space below the last row)
          // is not a drag handle, and returning false cancels the native drag.
          canDrag: ({ input: p }) => {
            const v = Vn(p);
            return v !== null && !aa(v, p);
          },
          getInitialData: ({ input: p }) => {
            const v = Vn(p);
            return v ? { type: un, key: v.row.id, keys: Xo(v.row) } : { type: un, key: null, keys: [] };
          },
          onGenerateDragPreview: ({ location: p, nativeSetDragImage: v }) => {
            const b = p.current.input, L = Vn(b);
            !L || !v || v(L.element, b.clientX - L.rect.left, b.clientY - L.rect.top);
          },
          onDragStart: ({ source: p }) => {
            Lr.value = p.data.keys ?? [];
          },
          onDrop: () => {
            Lr.value = [], Br();
          }
        }),
        Kp({
          element: c,
          canDrop: ({ source: p }) => p.data.type === un,
          getData: ({ input: p, source: v }) => {
            const b = Vn(p);
            if (!b) return { type: un, key: null };
            const L = { type: un, key: b.row.id };
            return Yp(L, {
              element: b.element,
              input: p,
              currentLevel: b.row.depth,
              indentPerLevel: q.value,
              mode: sa(b.row),
              block: oa(b.row, v.data.keys ?? [])
            });
          },
          onDrag: ({ self: p }) => {
            const v = p.data.key, b = Qs(p.data);
            Ln.value = v && b ? { key: v, instruction: b } : null, ia(v ?? null, b);
          },
          onDragLeave: Br,
          onDrop: ({ self: p, source: v }) => {
            Br();
            const b = p.data.key, L = Qs(p.data);
            if (!b || !L || L.type === "instruction-blocked") return;
            const ee = v.data.keys ?? [];
            ee.includes(b) || t.emitEvent("move", {
              key: v.data.key,
              keys: ee,
              targetKey: b,
              instruction: L.type,
              desiredLevel: L.desiredLevel ?? L.currentLevel
            });
          }
        })
      ));
    }
    Hi(Zo), be(jr, Zo), ji(() => {
      Vr(), yt == null || yt();
    });
    function $r(c) {
      var p;
      return ((p = Ln.value) == null ? void 0 : p.key) === c.id ? Ln.value.instruction : null;
    }
    function ca(c) {
      const p = $r(c);
      return {
        "pnl-tst-row--draggable": jr.value,
        "pnl-tst-row--dragging": Lr.value.includes(c.id),
        "pnl-tst-row--blocked": (p == null ? void 0 : p.type) === "instruction-blocked",
        "pnl-tst-row--child-target": (p == null ? void 0 : p.type) === "make-child"
      };
    }
    function Qo(c) {
      const p = $r(c);
      return p ? p.type === "reorder-above" ? "pnl-tst-dropline--above" : p.type === "reorder-below" || p.type === "reparent" ? "pnl-tst-dropline--below" : null : null;
    }
    function ua(c) {
      const p = $r(c);
      return p ? { insetInlineStart: `${(p.type === "reparent" ? p.desiredLevel : p.currentLevel) * p.indentPerLevel}px` } : null;
    }
    return (c, p) => (fe(), de("div", {
      ref_key: "rootElement",
      ref: Jo,
      class: "pnl-tst"
    }, [
      ve.value ? (fe(), de("div", {
        key: 0,
        class: "pnl-tst-toolbar",
        role: "toolbar",
        "aria-orientation": "horizontal",
        "aria-label": je.value
      }, [
        (fe(!0), de(Ie, null, Wn(ae.value, (v) => (fe(), de(Ie, {
          key: v.uid
        }, [
          v.id === "|" ? (fe(), de("span", Tg)) : v.id === "search" ? (fe(), de("label", Dg, [
            Je("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: Pt(Ig)
            }, null, 8, kg),
            Je("input", {
              ref_for: !0,
              ref: (b) => kr.value = b,
              type: "search",
              value: $.value,
              "aria-label": De.value,
              placeholder: De.value,
              onInput: p[0] || (p[0] = (b) => W(b.target.value))
            }, null, 40, Fg)
          ])) : (fe(), de("button", {
            key: 2,
            ref_for: !0,
            ref: (b) => ea(v.uid, b),
            type: "button",
            class: "pnl-tst-tbtn",
            "aria-label": v.label,
            "aria-keyshortcuts": v.keys,
            "aria-disabled": !qo(v),
            title: Ql(v),
            tabindex: v.uid === Yo.value ? 0 : -1,
            onClick: (b) => Go(v),
            onFocus: (b) => Hn.value = v.uid,
            onKeydown: ta
          }, [
            Je("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: v.icon
            }, null, 8, jg)
          ], 40, Hg))
        ], 64))), 128))
      ], 8, Pg)) : Ut("", !0),
      k.value.length === 0 ? (fe(), de("div", Lg, Xn(se.value), 1)) : (fe(), de("div", {
        key: 2,
        class: "pnl-tst-grid",
        role: "treegrid",
        "aria-label": ue.value,
        "aria-colcount": F.value.length,
        "aria-rowcount": Ae.value,
        onKeydown: d
      }, [
        r.value ? (fe(), de("div", Vg, [
          Je("div", Bg, [
            (fe(!0), de(Ie, null, Wn(F.value, (v, b) => (fe(), de("div", {
              key: v.id,
              class: "pnl-tst-hcell",
              role: "columnheader",
              "aria-colindex": b + 1,
              style: Yt(Ve(v.column.columnDef))
            }, Xn(v.column.columnDef.header), 13, $g))), 128))
          ])
        ])) : Ut("", !0),
        Je("div", Ng, [
          (fe(!0), de(Ie, null, Wn(k.value, (v, b) => (fe(), de("div", {
            key: v.id,
            ref_for: !0,
            ref: (L) => Bt(v.id, L),
            class: Et(["pnl-tst-row", [
              ca(v),
              {
                "pnl-tst-row--active": vt.value && v.id === ht.value,
                "pnl-tst-row--quiet": !vt.value && v.id === ht.value
              }
            ]]),
            role: "row",
            "aria-level": v.depth + 1,
            "aria-posinset": G(v),
            "aria-setsize": ne(v),
            "aria-rowindex": b + he.value,
            "aria-expanded": Te(v) ? qe(v) : void 0,
            "aria-selected": w.value ? v.getIsSelected() : void 0,
            tabindex: v.id === mt.value ? 0 : -1,
            onClick: (L) => E(v, L),
            onFocus: (L) => He(v.id)
          }, [
            Qo(v) ? (fe(), de("span", {
              key: 0,
              class: Et(["pnl-tst-dropline", Qo(v)]),
              style: Yt(ua(v)),
              "aria-hidden": "true"
            }, null, 6)) : Ut("", !0),
            (fe(!0), de(Ie, null, Wn(v.getAllCells(), (L, ee) => (fe(), de("div", {
              key: L.id,
              class: Et(["pnl-tst-cell", { "pnl-tst-cell--tree": ee === 0 }]),
              role: "gridcell",
              "aria-colindex": ee + 1,
              style: Yt(
                ee === 0 ? Fe(v, L.column.columnDef) : Ve(L.column.columnDef)
              )
            }, [
              ee === 0 ? (fe(), de(Ie, { key: 0 }, [
                Te(v) ? (fe(), de("span", {
                  key: 0,
                  class: Et(["pnl-tst-twisty", { "pnl-tst-twisty--open": qe(v) }]),
                  "aria-hidden": "true",
                  onClick: As((Oe) => x(v), ["stop"])
                }, [...p[1] || (p[1] = [
                  Je("svg", {
                    viewBox: "0 0 16 16",
                    width: "12",
                    height: "12",
                    focusable: "false"
                  }, [
                    Je("path", {
                      d: "M6 3.5 10.5 8 6 12.5",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "1.6"
                    })
                  ], -1)
                ])], 10, zg)) : (fe(), de("span", qg)),
                O.value ? (fe(), de("input", {
                  key: 2,
                  class: "pnl-tst-check",
                  type: "checkbox",
                  tabindex: "-1",
                  checked: V(v),
                  ".indeterminate": T(v),
                  "aria-label": `Select ${v.original.title ?? v.id}`,
                  onClick: As((Oe) => z(v), ["stop"])
                }, null, 40, Gg)) : Ut("", !0),
                f(v) ? (fe(), de("span", {
                  key: 3,
                  class: "pnl-tst-icon",
                  "aria-hidden": "true",
                  innerHTML: f(v)
                }, null, 8, Yg)) : Ut("", !0)
              ], 64)) : Ut("", !0),
              Je("span", Xg, Xn(L.getValue()), 1)
            ], 14, Ug))), 128))
          ], 42, Wg))), 128))
        ])
      ], 40, Kg))
    ], 512));
  }
};
function eh({ model: e, el: t }) {
  t.style.display = "block", t.style.width = "100%", t.style.height = "100%";
  const n = document.createElement("div");
  n.className = "pnl-tst-root", n.style.height = "100%", t.append(n);
  const r = /* @__PURE__ */ yr({
    source: e.get("source") || [],
    columns: e.get("columns") || [],
    options: e.get("options") || {},
    icons: e.get("icons") || {},
    filterText: e.get("filter_text") || "",
    expandedKeys: e.get("expanded_keys") || [],
    selectedKeys: e.get("selected_keys") || []
  }), o = (h, y) => {
    e.set("_event_data", {
      event_name: h,
      event_params: y,
      timestamp: Date.now()
    }), e.save_changes();
  }, s = (h, y) => h.length === y.length && h.every((w, M) => w === y[M]), i = (h) => (y) => {
    const w = [...e.get(h) || []].sort();
    s(w, y) || (e.set(h, y), e.save_changes());
  }, l = i("expanded_keys"), a = i("selected_keys"), f = Tu(Qg, {
    state: r,
    emitEvent: o,
    setExpandedKeys: l,
    setSelectedKeys: a,
    setFilterText: (h) => {
      (e.get("filter_text") || "") !== h && (e.set("filter_text", h), e.save_changes());
    }
  });
  return f.mount(n), e.on("change:source", () => {
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
    f.unmount();
  };
}
export {
  eh as render
};

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
const Q = {}, It = [], Ne = () => {
}, gs = () => !1, kn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Kn = (e) => e.startsWith("onUpdate:"), ge = Object.assign, Ur = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, ul = Object.prototype.hasOwnProperty, q = (e, t) => ul.call(e, t), K = Array.isArray, ct = (e) => an(e) === "[object Map]", Pn = (e) => an(e) === "[object Set]", ho = (e) => an(e) === "[object Date]", $ = (e) => typeof e == "function", re = (e) => typeof e == "string", We = (e) => typeof e == "symbol", J = (e) => e !== null && typeof e == "object", hs = (e) => (J(e) || $(e)) && $(e.then) && $(e.catch), ms = Object.prototype.toString, an = (e) => ms.call(e), fl = (e) => an(e).slice(8, -1), ys = (e) => an(e) === "[object Object]", Gr = (e) => re(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Gt = /* @__PURE__ */ Br(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Ln = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, dl = /-\w/g, Ee = Ln(
  (e) => e.replace(dl, (t) => t.slice(1).toUpperCase())
), pl = /\B([A-Z])/g, xt = Ln(
  (e) => e.replace(pl, "-$1").toLowerCase()
), vs = Ln((e) => e.charAt(0).toUpperCase() + e.slice(1)), ir = Ln(
  (e) => e ? `on${vs(e)}` : ""
), $e = (e, t) => !Object.is(e, t), lr = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, bs = (e, t, n, r = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: r,
    value: n
  });
}, gl = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let mo;
const $n = () => mo || (mo = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function At(e) {
  if (K(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], o = re(r) ? vl(r) : At(r);
      if (o)
        for (const s in o)
          t[s] = o[s];
    }
    return t;
  } else if (re(e) || J(e))
    return e;
}
const hl = /;(?![^(]*\))/g, ml = /:([^]+)/, yl = /\/\*[^]*?\*\//g;
function vl(e) {
  const t = {};
  return e.replace(yl, "").split(hl).forEach((n) => {
    if (n) {
      const r = n.split(ml);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function ht(e) {
  let t = "";
  if (re(e))
    t = e;
  else if (K(e))
    for (let n = 0; n < e.length; n++) {
      const r = ht(e[n]);
      r && (t += r + " ");
    }
  else if (J(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const bl = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", wl = /* @__PURE__ */ Br(bl);
function ws(e) {
  return !!e || e === "";
}
function _l(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let r = 0; n && r < e.length; r++)
    n = Nn(e[r], t[r]);
  return n;
}
function yo(e, t) {
  if (e.size !== t.size) return !1;
  const n = Array.from(t), r = new Uint8Array(n.length);
  for (const o of e) {
    let s = -1;
    for (let i = 0; i < n.length; i++)
      if (!r[i] && Nn(o, n[i])) {
        s = i;
        break;
      }
    if (s < 0) return !1;
    r[s] = 1;
  }
  return !0;
}
function Nn(e, t) {
  if (e === t) return !0;
  let n = ho(e), r = ho(t);
  if (n || r)
    return n && r ? e.getTime() === t.getTime() : !1;
  if (n = We(e), r = We(t), n || r)
    return e === t;
  if (n = K(e), r = K(t), n || r)
    return n && r ? _l(e, t) : !1;
  if (n = J(e), r = J(t), n || r) {
    if (!n || !r)
      return !1;
    if (n = ct(e), r = ct(t), n || r || (n = Pn(e), r = Pn(t), n || r))
      return n && r ? yo(e, t) : !1;
    const o = Object.keys(e).length, s = Object.keys(t).length;
    if (o !== s)
      return !1;
    for (const i in e) {
      const l = e.hasOwnProperty(i), a = t.hasOwnProperty(i);
      if (l && !a || !l && a || !Nn(e[i], t[i]))
        return !1;
    }
  }
  return String(e) === String(t);
}
const _s = (e) => !!(e && e.__v_isRef === !0), Pr = (e) => re(e) ? e : e == null ? "" : K(e) || J(e) && (e.toString === ms || !$(e.toString)) ? _s(e) ? Pr(e.value) : JSON.stringify(e, Ss, 2) : String(e), Ss = (e, t) => _s(t) ? Ss(e, t.value) : ct(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [r, o], s) => (n[ar(r, s) + " =>"] = o, n),
    {}
  )
} : Pn(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => ar(n))
} : We(t) ? ar(t) : J(t) && !K(t) && !ys(t) ? String(t) : t, ar = (e, t = "") => {
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
class Sl {
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
function xl(e, t = !1) {
  ie && ie.cleanups.push(e);
}
let ne;
const cr = /* @__PURE__ */ new WeakSet();
class Rs {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, ie && (ie.active ? ie.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, cr.has(this) && (cr.delete(this), this.trigger()));
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
    this.flags |= 2, vo(this), Os(this);
    const t = ne, n = Me;
    ne = this, Me = !0;
    try {
      return this.fn();
    } finally {
      Es(this), ne = t, Me = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Yr(t);
      this.deps = this.depsTail = void 0, vo(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? cr.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Or(this) && this.run();
  }
  get dirty() {
    return Or(this);
  }
}
let Cs = 0, qt, zt;
function Ps(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = zt, zt = e;
    return;
  }
  e.next = qt, qt = e;
}
function qr() {
  Cs++;
}
function zr() {
  if (--Cs > 0)
    return;
  if (zt) {
    let t = zt;
    for (zt = void 0; t; ) {
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
function Os(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Es(e) {
  let t, n = e.depsTail, r = n;
  for (; r; ) {
    const o = r.prevDep;
    r.version === -1 ? (r === n && (n = o), Yr(r), Rl(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = o;
  }
  e.deps = t, e.depsTail = n;
}
function Or(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Ms(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Ms(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Qt) || (e.globalVersion = Qt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Or(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = ne, r = Me;
  ne = e, Me = !0;
  try {
    Os(e);
    const o = e.fn(e._value);
    (t.version === 0 || $e(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    ne = n, Me = r, Es(e), e.flags &= -3;
  }
}
function Yr(e, t = !1) {
  const { dep: n, prevSub: r, nextSub: o } = e;
  if (r && (r.nextSub = o, e.prevSub = void 0), o && (o.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
    n.computed.flags &= -5;
    for (let s = n.computed.deps; s; s = s.nextDep)
      Yr(s, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Rl(e) {
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
    const n = ne;
    ne = void 0;
    try {
      t();
    } finally {
      ne = n;
    }
  }
}
let Qt = 0;
class Cl {
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
    if (!ne || !Me || ne === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== ne)
      n = this.activeLink = new Cl(ne, this), ne.deps ? (n.prevDep = ne.depsTail, ne.depsTail.nextDep = n, ne.depsTail = n) : ne.deps = ne.depsTail = n, As(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const r = n.nextDep;
      r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = ne.depsTail, n.nextDep = void 0, ne.depsTail.nextDep = n, ne.depsTail = n, ne.deps === n && (ne.deps = r);
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
      zr();
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
const Er = /* @__PURE__ */ new WeakMap(), mt = /* @__PURE__ */ Symbol(
  ""
), Mr = /* @__PURE__ */ Symbol(
  ""
), en = /* @__PURE__ */ Symbol(
  ""
);
function de(e, t, n) {
  if (Me && ne) {
    let r = Er.get(e);
    r || Er.set(e, r = /* @__PURE__ */ new Map());
    let o = r.get(n);
    o || (r.set(n, o = new Xr()), o.map = r, o.key = n), o.track();
  }
}
function Ye(e, t, n, r, o, s) {
  const i = Er.get(e);
  if (!i) {
    Qt++;
    return;
  }
  const l = (a) => {
    a && a.trigger();
  };
  if (qr(), t === "clear")
    i.forEach(l);
  else {
    const a = K(e), c = a && Gr(n);
    if (a && n === "length") {
      const u = Number(r);
      i.forEach((h, v) => {
        (v === "length" || v === en || !We(v) && v >= u) && l(h);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && l(i.get(n)), c && l(i.get(en)), t) {
        case "add":
          a ? c && l(i.get("length")) : (l(i.get(mt)), ct(e) && l(i.get(Mr)));
          break;
        case "delete":
          a || (l(i.get(mt)), ct(e) && l(i.get(Mr)));
          break;
        case "set":
          ct(e) && l(i.get(mt));
          break;
      }
  }
  zr();
}
function Ot(e) {
  const t = /* @__PURE__ */ G(e);
  return t === e ? t : (de(t, "iterate", en), /* @__PURE__ */ Pe(e) ? t : t.map(Ie));
}
function Vn(e) {
  return de(e = /* @__PURE__ */ G(e), "iterate", en), e;
}
function Ke(e, t) {
  return /* @__PURE__ */ et(e) ? jt(/* @__PURE__ */ yt(e) ? Ie(t) : t) : Ie(t);
}
const Pl = {
  __proto__: null,
  [Symbol.iterator]() {
    return ur(this, Symbol.iterator, (e) => Ke(this, e));
  },
  concat(...e) {
    return Ot(this).concat(
      ...e.map((t) => K(t) ? Ot(t) : t)
    );
  },
  entries() {
    return ur(this, "entries", (e) => (e[1] = Ke(this, e[1]), e));
  },
  every(e, t) {
    return Ge(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Ge(
      this,
      "filter",
      e,
      t,
      (n) => n.map((r) => Ke(this, r)),
      arguments
    );
  },
  find(e, t) {
    return Ge(
      this,
      "find",
      e,
      t,
      (n) => Ke(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return Ge(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Ge(
      this,
      "findLast",
      e,
      t,
      (n) => Ke(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return Ge(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Ge(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return fr(this, "includes", e);
  },
  indexOf(...e) {
    return fr(this, "indexOf", e);
  },
  join(e) {
    return Ot(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return fr(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Ge(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Nt(this, "pop");
  },
  push(...e) {
    return Nt(this, "push", e);
  },
  reduce(e, ...t) {
    return bo(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return bo(this, "reduceRight", e, t);
  },
  shift() {
    return Nt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Ge(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Nt(this, "splice", e);
  },
  toReversed() {
    return Ot(this).toReversed();
  },
  toSorted(e) {
    return Ot(this).toSorted(e);
  },
  toSpliced(...e) {
    return Ot(this).toSpliced(...e);
  },
  unshift(...e) {
    return Nt(this, "unshift", e);
  },
  values() {
    return ur(this, "values", (e) => Ke(this, e));
  }
};
function ur(e, t, n) {
  const r = Vn(e), o = r[t]();
  return r !== e && !/* @__PURE__ */ Pe(e) && (o._next = o.next, o.next = () => {
    const s = o._next();
    return s.done || (s.value = n(s.value)), s;
  }), o;
}
const Ol = Array.prototype;
function Ge(e, t, n, r, o, s) {
  const i = Vn(e), l = i !== e && !/* @__PURE__ */ Pe(e), a = i[t];
  if (a !== Ol[t]) {
    const h = a.apply(e, s);
    return l ? Ie(h) : h;
  }
  let c = n;
  i !== e && (l ? c = function(h, v) {
    return n.call(this, Ke(e, h), v, e);
  } : n.length > 2 && (c = function(h, v) {
    return n.call(this, h, v, e);
  }));
  const u = a.call(i, c, r);
  return l && o ? o(u) : u;
}
function bo(e, t, n, r) {
  const o = Vn(e), s = o !== e && !/* @__PURE__ */ Pe(e);
  let i = n, l = !1;
  o !== e && (s ? (l = r.length === 0, i = function(c, u, h) {
    return l && (l = !1, c = Ke(e, c)), n.call(this, c, Ke(e, u), h, e);
  }) : n.length > 3 && (i = function(c, u, h) {
    return n.call(this, c, u, h, e);
  }));
  const a = o[t](i, ...r);
  return l ? Ke(e, a) : a;
}
function fr(e, t, n) {
  const r = /* @__PURE__ */ G(e);
  de(r, "iterate", en);
  const o = r[t](...n);
  return (o === -1 || o === !1) && /* @__PURE__ */ Qr(n[0]) ? (n[0] = /* @__PURE__ */ G(n[0]), r[t](...n)) : o;
}
function Nt(e, t, n = []) {
  Ze(), qr();
  const r = (/* @__PURE__ */ G(e))[t].apply(e, n);
  return zr(), Qe(), r;
}
const El = /* @__PURE__ */ Br("__proto__,__v_isRef,__isVue"), Ts = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(We)
);
function Ml(e) {
  We(e) || (e = String(e));
  const t = /* @__PURE__ */ G(this);
  return de(t, "has", e), t.hasOwnProperty(e);
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
      return r === (o ? s ? Ll : ks : s ? Hs : js).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const i = K(t);
    if (!o) {
      let a;
      if (i && (a = Pl[n]))
        return a;
      if (n === "hasOwnProperty")
        return Ml;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ pe(t) ? t : r
    );
    if ((We(n) ? Ts.has(n) : El(n)) || (o || de(t, "get", n), s))
      return l;
    if (/* @__PURE__ */ pe(l)) {
      const a = i && Gr(n) ? l : l.value;
      return o && J(a) ? /* @__PURE__ */ Ar(a) : a;
    }
    return J(l) ? o ? /* @__PURE__ */ Ar(l) : /* @__PURE__ */ Wn(l) : l;
  }
}
class Fs extends Ds {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, o) {
    let s = t[n];
    const i = K(t) && Gr(n);
    if (!this._isShallow) {
      const c = /* @__PURE__ */ et(s);
      if (!/* @__PURE__ */ Pe(r) && !/* @__PURE__ */ et(r) && (s = /* @__PURE__ */ G(s), r = /* @__PURE__ */ G(r)), !i && /* @__PURE__ */ pe(s) && !/* @__PURE__ */ pe(r))
        return c || (s.value = r), !0;
    }
    const l = i ? Number(n) < t.length : q(t, n), a = Reflect.set(
      t,
      n,
      r,
      /* @__PURE__ */ pe(t) ? t : o
    );
    return t === /* @__PURE__ */ G(o) && a && (l ? $e(r, s) && Ye(t, "set", n, r) : Ye(t, "add", n, r)), a;
  }
  deleteProperty(t, n) {
    const r = q(t, n);
    t[n];
    const o = Reflect.deleteProperty(t, n);
    return o && r && Ye(t, "delete", n, void 0), o;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!We(n) || !Ts.has(n)) && de(t, "has", n), r;
  }
  ownKeys(t) {
    return de(
      t,
      "iterate",
      K(t) ? "length" : mt
    ), Reflect.ownKeys(t);
  }
}
class Il extends Ds {
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
const Al = /* @__PURE__ */ new Fs(), Tl = /* @__PURE__ */ new Il(), Dl = /* @__PURE__ */ new Fs(!0);
const Ir = (e) => e, hn = (e) => Reflect.getPrototypeOf(e);
function Fl(e, t, n) {
  return function(...r) {
    const o = this.__v_raw, s = /* @__PURE__ */ G(o), i = ct(s), l = e === "entries" || e === Symbol.iterator && i, a = e === "keys" && i, c = o[e](...r), u = n ? Ir : t ? jt : Ie;
    return !t && de(
      s,
      "iterate",
      a ? Mr : mt
    ), ge(
      // inheriting all iterator properties
      Object.create(c),
      {
        // iterator protocol
        next() {
          const { value: h, done: v } = c.next();
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
function jl(e, t) {
  const n = {
    get(o) {
      const s = this.__v_raw, i = /* @__PURE__ */ G(s), l = /* @__PURE__ */ G(o);
      e || ($e(o, l) && de(i, "get", o), de(i, "get", l));
      const { has: a } = hn(i), c = t ? Ir : e ? jt : Ie;
      if (a.call(i, o))
        return c(s.get(o));
      if (a.call(i, l))
        return c(s.get(l));
      s !== i && s.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && de(/* @__PURE__ */ G(o), "iterate", mt), o.size;
    },
    has(o) {
      const s = this.__v_raw, i = /* @__PURE__ */ G(s), l = /* @__PURE__ */ G(o);
      return e || ($e(o, l) && de(i, "has", o), de(i, "has", l)), o === l ? s.has(o) : s.has(o) || s.has(l);
    },
    forEach(o, s) {
      const i = this, l = i.__v_raw, a = /* @__PURE__ */ G(l), c = t ? Ir : e ? jt : Ie;
      return !e && de(a, "iterate", mt), l.forEach((u, h) => o.call(s, c(u), c(h), i));
    }
  };
  return ge(
    n,
    e ? {
      add: mn("add"),
      set: mn("set"),
      delete: mn("delete"),
      clear: mn("clear")
    } : {
      add(o) {
        const s = /* @__PURE__ */ G(this), i = hn(s), l = /* @__PURE__ */ G(o), a = !t && !/* @__PURE__ */ Pe(o) && !/* @__PURE__ */ et(o) ? l : o;
        return i.has.call(s, a) || $e(o, a) && i.has.call(s, o) || $e(l, a) && i.has.call(s, l) || (s.add(a), Ye(s, "add", a, a)), this;
      },
      set(o, s) {
        !t && !/* @__PURE__ */ Pe(s) && !/* @__PURE__ */ et(s) && (s = /* @__PURE__ */ G(s));
        const i = /* @__PURE__ */ G(this), { has: l, get: a } = hn(i);
        let c = l.call(i, o);
        c || (o = /* @__PURE__ */ G(o), c = l.call(i, o));
        const u = a.call(i, o);
        return i.set(o, s), c ? $e(s, u) && Ye(i, "set", o, s) : Ye(i, "add", o, s), this;
      },
      delete(o) {
        const s = /* @__PURE__ */ G(this), { has: i, get: l } = hn(s);
        let a = i.call(s, o);
        a || (o = /* @__PURE__ */ G(o), a = i.call(s, o)), l && l.call(s, o);
        const c = s.delete(o);
        return a && Ye(s, "delete", o, void 0), c;
      },
      clear() {
        const o = /* @__PURE__ */ G(this), s = o.size !== 0, i = o.clear();
        return s && Ye(
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
    n[o] = Fl(o, e, t);
  }), n;
}
function Jr(e, t) {
  const n = jl(e, t);
  return (r, o, s) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(
    q(n, o) && o in r ? n : r,
    o,
    s
  );
}
const Hl = {
  get: /* @__PURE__ */ Jr(!1, !1)
}, kl = {
  get: /* @__PURE__ */ Jr(!1, !0)
}, Kl = {
  get: /* @__PURE__ */ Jr(!0, !1)
};
const js = /* @__PURE__ */ new WeakMap(), Hs = /* @__PURE__ */ new WeakMap(), ks = /* @__PURE__ */ new WeakMap(), Ll = /* @__PURE__ */ new WeakMap();
function $l(e) {
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
function Wn(e) {
  return /* @__PURE__ */ et(e) ? e : Zr(
    e,
    !1,
    Al,
    Hl,
    js
  );
}
// @__NO_SIDE_EFFECTS__
function Nl(e) {
  return Zr(
    e,
    !1,
    Dl,
    kl,
    Hs
  );
}
// @__NO_SIDE_EFFECTS__
function Ar(e) {
  return Zr(
    e,
    !0,
    Tl,
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
  const i = $l(fl(e));
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
function Vl(e) {
  return !q(e, "__v_skip") && Object.isExtensible(e) && bs(e, "__v_skip", !0), e;
}
const Ie = (e) => J(e) ? /* @__PURE__ */ Wn(e) : e, jt = (e) => J(e) ? /* @__PURE__ */ Ar(e) : e;
// @__NO_SIDE_EFFECTS__
function pe(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Vt(e) {
  return Ks(e, !1);
}
// @__NO_SIDE_EFFECTS__
function Wl(e) {
  return Ks(e, !0);
}
function Ks(e, t) {
  return /* @__PURE__ */ pe(e) ? e : new Bl(e, t);
}
class Bl {
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
  return /* @__PURE__ */ pe(e) ? e.value : e;
}
const Ul = {
  get: (e, t, n) => t === "__v_raw" ? e : Tt(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return /* @__PURE__ */ pe(o) && !/* @__PURE__ */ pe(n) ? (o.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function Ls(e) {
  return /* @__PURE__ */ yt(e) ? e : new Proxy(e, Ul);
}
class Gl {
  constructor(t, n, r) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Xr(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Qt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    ne !== this)
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
function ql(e, t, n = !1) {
  let r, o;
  return $(e) ? r = e : (r = e.get, o = e.set), new Gl(r, o, n);
}
const yn = {}, On = /* @__PURE__ */ new WeakMap();
let pt;
function zl(e, t = !1, n = pt) {
  if (n) {
    let r = On.get(n);
    r || On.set(n, r = []), r.push(e);
  }
}
function Yl(e, t, n = Q) {
  const { immediate: r, deep: o, once: s, scheduler: i, augmentJob: l, call: a } = n, c = (O) => o ? O : /* @__PURE__ */ Pe(O) || o === !1 || o === 0 ? Xe(O, 1) : Xe(O);
  let u, h, v, b, R = !1, P = !1;
  if (/* @__PURE__ */ pe(e) ? (h = () => e.value, R = /* @__PURE__ */ Pe(e)) : /* @__PURE__ */ yt(e) ? (h = () => c(e), R = !0) : K(e) ? (P = !0, R = e.some((O) => /* @__PURE__ */ yt(O) || /* @__PURE__ */ Pe(O)), h = () => e.map((O) => {
    if (/* @__PURE__ */ pe(O))
      return O.value;
    if (/* @__PURE__ */ yt(O))
      return c(O);
    if ($(O))
      return a ? a(O, 2) : O();
  })) : $(e) ? t ? h = a ? () => a(e, 2) : e : h = () => {
    if (v) {
      Ze();
      try {
        v();
      } finally {
        Qe();
      }
    }
    const O = pt;
    pt = u;
    try {
      return a ? a(e, 3, [b]) : e(b);
    } finally {
      pt = O;
    }
  } : h = Ne, t && o) {
    const O = h, k = o === !0 ? 1 / 0 : o;
    h = () => Xe(O(), k);
  }
  const A = xs(), F = () => {
    u.stop(), A && A.active && Ur(A.effects, u);
  };
  if (s && t) {
    const O = t;
    t = (...k) => {
      const L = O(...k);
      return F(), L;
    };
  }
  let C = P ? new Array(e.length).fill(yn) : yn;
  const D = (O) => {
    if (!(!(u.flags & 1) || !u.dirty && !O))
      if (t) {
        const k = u.run();
        if (O || o || R || (P ? k.some((L, B) => $e(L, C[B])) : $e(k, C))) {
          v && v();
          const L = pt;
          pt = u;
          try {
            const B = [
              k,
              // pass undefined as the old value when it's changed for the first time
              C === yn ? void 0 : P && C[0] === yn ? [] : C,
              b
            ];
            C = k, a ? a(t, 3, B) : (
              // @ts-expect-error
              t(...B)
            );
          } finally {
            pt = L;
          }
        }
      } else
        u.run();
  };
  return l && l(D), u = new Rs(h), u.scheduler = i ? () => i(D, !1) : D, b = (O) => zl(O, !1, u), v = u.onStop = () => {
    const O = On.get(u);
    if (O) {
      if (a)
        a(O, 4);
      else
        for (const k of O) k();
      On.delete(u);
    }
  }, t ? r ? D(!0) : C = u.run() : i ? i(D.bind(null, !0), !0) : u.run(), F.pause = u.pause.bind(u), F.resume = u.resume.bind(u), F.stop = F, F;
}
function Xe(e, t = 1 / 0, n) {
  if (t <= 0 || !J(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ pe(e))
    Xe(e.value, t, n);
  else if (K(e))
    for (let r = 0; r < e.length; r++)
      Xe(e[r], t, n);
  else if (Pn(e) || ct(e))
    e.forEach((r) => {
      Xe(r, t, n);
    });
  else if (ys(e)) {
    for (const r in e)
      Xe(e[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, r) && Xe(e[r], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function cn(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (o) {
    Bn(o, t, n);
  }
}
function Ae(e, t, n, r) {
  if ($(e)) {
    const o = cn(e, t, n, r);
    return o && hs(o) && o.catch((s) => {
      Bn(s, t, n);
    }), o;
  }
  if (K(e)) {
    const o = [];
    for (let s = 0; s < e.length; s++)
      o.push(Ae(e[s], t, n, r));
    return o;
  }
}
function Bn(e, t, n, r = !0) {
  const o = t ? t.vnode : null, { errorHandler: s, throwUnhandledErrorInProduction: i } = t && t.appContext.config || Q;
  if (t) {
    let l = t.parent;
    const a = t.proxy, c = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const u = l.ec;
      if (u) {
        for (let h = 0; h < u.length; h++)
          if (u[h](e, a, c) === !1)
            return;
      }
      l = l.parent;
    }
    if (s) {
      Ze(), cn(s, null, 10, [
        e,
        a,
        c
      ]), Qe();
      return;
    }
  }
  Xl(e, n, o, r, i);
}
function Xl(e, t, n, r = !0, o = !1) {
  if (o)
    throw e;
  console.error(e);
}
const ye = [];
let ke = -1;
const Dt = [];
let at = null, Et = 0;
const $s = /* @__PURE__ */ Promise.resolve();
let En = null;
function Ns(e) {
  const t = En || $s;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Jl(e) {
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
    !(e.flags & 2) && t >= tn(n) ? ye.push(e) : ye.splice(Jl(t), 0, e), e.flags |= 1, Vs();
  }
}
function Vs() {
  En || (En = $s.then(Bs));
}
function Zl(e) {
  if (!K(e))
    at && e.id === -1 ? at.splice(Et + 1, 0, e) : e.flags & 1 || (Dt.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      Dt.push(e[t]);
  Vs();
}
function wo(e, t, n = ke + 1) {
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
    if (Dt.length = 0, at) {
      for (let n = 0; n < t.length; n++)
        at.push(t[n]);
      return;
    }
    for (at = t, Et = 0; Et < at.length; Et++) {
      const n = at[Et];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    at = null, Et = 0;
  }
}
const tn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Bs(e) {
  try {
    for (ke = 0; ke < ye.length; ke++) {
      const t = ye[ke];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), cn(
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
    ke = -1, ye.length = 0, Ws(), En = null, (ye.length || Dt.length) && Bs();
  }
}
let Ce = null, Us = null;
function Mn(e) {
  const t = Ce;
  return Ce = e, Us = e && e.type.__scopeId || null, t;
}
function Ql(e, t = Ce, n) {
  if (!t || e._n)
    return e;
  const r = (...o) => {
    r._d && Ao(-1);
    const s = Mn(t), i = vt.length;
    let l;
    try {
      l = e(...o);
    } finally {
      for (let a = vt.length; a > i; a--) mi();
      Mn(s), r._d && Ao(1);
    }
    return l;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function ea(e, t) {
  if (Ce === null)
    return e;
  const n = Yn(Ce), r = e.dirs || (e.dirs = []);
  for (let o = 0; o < t.length; o++) {
    let [s, i, l, a = Q] = t[o];
    s && ($(s) && (s = {
      mounted: s,
      updated: s
    }), s.deep && Xe(i), r.push({
      dir: s,
      instance: n,
      value: i,
      oldValue: void 0,
      arg: l,
      modifiers: a
    }));
  }
  return e;
}
function ft(e, t, n, r) {
  const o = e.dirs, s = t && t.dirs;
  for (let i = 0; i < o.length; i++) {
    const l = o[i];
    s && (l.oldValue = s[i].value);
    let a = l.dir[r];
    a && (Ze(), Ae(a, n, 8, [
      e.el,
      l,
      e,
      t
    ]), Qe());
  }
}
function ta(e, t) {
  if (ve) {
    let n = ve.provides;
    const r = ve.parent && ve.parent.provides;
    r === n && (n = ve.provides = Object.create(r)), n[e] = t;
  }
}
function Sn(e, t, n = !1) {
  const r = Qa();
  if (r || Ft) {
    let o = Ft ? Ft._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && $(t) ? t.call(r && r.proxy) : t;
  }
}
const na = /* @__PURE__ */ Symbol.for("v-scx"), ra = () => Sn(na);
function Ve(e, t, n) {
  return Gs(e, t, n);
}
function Gs(e, t, n = Q) {
  const { immediate: r, deep: o, flush: s, once: i } = n, l = ge({}, n), a = t && r || !t && s !== "post";
  let c;
  if (on) {
    if (s === "sync") {
      const b = ra();
      c = b.__watcherHandles || (b.__watcherHandles = []);
    } else if (!a) {
      const b = () => {
      };
      return b.stop = Ne, b.resume = Ne, b.pause = Ne, b;
    }
  }
  const u = ve;
  l.call = (b, R, P) => Ae(b, u, R, P);
  let h = !1;
  s === "post" ? l.scheduler = (b) => {
    _e(b, u && u.suspense);
  } : s !== "sync" && (h = !0, l.scheduler = (b, R) => {
    R ? b() : eo(b);
  }), l.augmentJob = (b) => {
    t && (b.flags |= 4), h && (b.flags |= 2, u && (b.id = u.uid, b.i = u));
  };
  const v = Yl(e, t, l);
  return on && (c ? c.push(v) : a && v()), v;
}
function oa(e, t, n) {
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
const sa = /* @__PURE__ */ Symbol("_vte"), Un = (e) => e.__isTeleport, dr = /* @__PURE__ */ Symbol("_leaveCb");
function ia(e) {
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
function zs(e) {
  if (!no(e))
    return Un(e.type) && e.children ? ia(e.children) : e;
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
      Un(n.type) && zs(n) || n,
      t
    );
  } else e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Ys(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function _o(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const In = /* @__PURE__ */ new WeakMap();
function Yt(e, t, n, r, o = !1) {
  if (K(e)) {
    e.forEach(
      (P, A) => Yt(
        P,
        t && (K(t) ? t[A] : t),
        n,
        r,
        o
      )
    );
    return;
  }
  if (Xt(r) && !o) {
    r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && Yt(e, t, n, r.component.subTree);
    return;
  }
  const s = r.shapeFlag & 4 ? Yn(r.component) : r.el, i = o ? null : s, { i: l, r: a } = e, c = t && t.r, u = l.refs === Q ? l.refs = {} : l.refs, h = l.setupState, v = /* @__PURE__ */ G(h), b = h === Q ? gs : (P) => _o(u, P) ? !1 : q(v, P), R = (P, A) => !(A && _o(u, A));
  if (c != null && c !== a) {
    if (So(t), re(c))
      u[c] = null, b(c) && (h[c] = null);
    else if (/* @__PURE__ */ pe(c)) {
      const P = t;
      R(c, P.k) && (c.value = null), P.k && (u[P.k] = null);
    }
  }
  if ($(a))
    cn(a, l, 12, [i, u]);
  else {
    const P = re(a), A = /* @__PURE__ */ pe(a);
    if (P || A) {
      const F = () => {
        if (e.f) {
          const C = P ? b(a) ? h[a] : u[a] : R() || !e.k ? a.value : u[e.k];
          if (o)
            K(C) && Ur(C, s);
          else if (K(C))
            C.includes(s) || C.push(s);
          else if (P)
            u[a] = [s], b(a) && (h[a] = u[a]);
          else {
            const D = [s];
            R(a, e.k) && (a.value = D), e.k && (u[e.k] = D);
          }
        } else P ? (u[a] = i, b(a) && (h[a] = i)) : A && (R(a, e.k) && (a.value = i), e.k && (u[e.k] = i));
      };
      if (i) {
        const C = () => {
          F(), In.delete(e);
        };
        C.id = -1, In.set(e, C), _e(C, n);
      } else
        So(e), F();
    }
  }
}
function So(e) {
  const t = In.get(e);
  t && (t.flags |= 8, In.delete(e));
}
$n().requestIdleCallback;
$n().cancelIdleCallback;
const Xt = (e) => !!e.type.__asyncLoader, no = (e) => e.type.__isKeepAlive;
function la(e, t) {
  Xs(e, "a", t);
}
function aa(e, t) {
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
  if (Gn(t, r, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      no(o.parent.vnode) && ca(r, t, n, o), o = o.parent;
  }
}
function ca(e, t, n, r) {
  const o = Gn(
    t,
    e,
    r,
    !0
    /* prepend */
  );
  Zs(() => {
    Ur(r[t], o);
  }, n);
}
function Gn(e, t, n = ve, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), s = t.__weh || (t.__weh = (...i) => {
      Ze();
      const l = un(n), a = Ae(t, n, e, i);
      return l(), Qe(), a;
    });
    return r ? o.unshift(s) : o.push(s), s;
  }
}
const rt = (e) => (t, n = ve) => {
  (!on || e === "sp") && Gn(e, (...r) => t(...r), n);
}, ua = rt("bm"), fa = rt("m"), da = rt(
  "bu"
), pa = rt("u"), Js = rt(
  "bum"
), Zs = rt("um"), ga = rt(
  "sp"
), ha = rt("rtg"), ma = rt("rtc");
function ya(e, t = ve) {
  Gn("ec", e, t);
}
const va = /* @__PURE__ */ Symbol.for("v-ndc");
function pr(e, t, n, r) {
  let o;
  const s = n, i = K(e);
  if (i || re(e)) {
    const l = i && /* @__PURE__ */ yt(e);
    let a = !1, c = !1;
    l && (a = !/* @__PURE__ */ Pe(e), c = /* @__PURE__ */ et(e), e = Vn(e)), o = new Array(e.length);
    for (let u = 0, h = e.length; u < h; u++)
      o[u] = t(
        a ? c ? jt(Ie(e[u])) : Ie(e[u]) : e[u],
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
const Tr = (e) => e ? wi(e) ? Yn(e) : Tr(e.parent) : null, Jt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ ge(/* @__PURE__ */ Object.create(null), {
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
    $options: (e) => ei(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      eo(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Ns.bind(e.proxy)),
    $watch: (e) => oa.bind(e)
  })
), gr = (e, t) => e !== Q && !e.__isScriptSetup && q(e, t), ba = {
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
        if (gr(r, t))
          return i[t] = 1, r[t];
        if (o !== Q && q(o, t))
          return i[t] = 2, o[t];
        if (q(s, t))
          return i[t] = 3, s[t];
        if (n !== Q && q(n, t))
          return i[t] = 4, n[t];
        Dr && (i[t] = 0);
      }
    }
    const c = Jt[t];
    let u, h;
    if (c)
      return t === "$attrs" && de(e.attrs, "get", ""), c(e);
    if (
      // css module (injected by vue-loader)
      (u = l.__cssModules) && (u = u[t])
    )
      return u;
    if (n !== Q && q(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      h = a.config.globalProperties, q(h, t)
    )
      return h[t];
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: o, ctx: s } = e;
    return gr(o, t) ? (o[t] = n, !0) : r !== Q && q(r, t) ? (r[t] = n, !0) : q(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (s[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: o, props: s, type: i }
  }, l) {
    let a;
    return !!(n[l] || e !== Q && l[0] !== "$" && q(e, l) || gr(t, l) || q(s, l) || q(r, l) || q(Jt, l) || q(o.config.globalProperties, l) || (a = i.__cssModules) && a[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : q(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function xo(e) {
  return K(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let Dr = !0;
function wa(e) {
  const t = ei(e), n = e.proxy, r = e.ctx;
  Dr = !1, t.beforeCreate && Ro(t.beforeCreate, e, "bc");
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
    beforeMount: h,
    mounted: v,
    beforeUpdate: b,
    updated: R,
    activated: P,
    deactivated: A,
    beforeDestroy: F,
    beforeUnmount: C,
    destroyed: D,
    unmounted: O,
    render: k,
    renderTracked: L,
    renderTriggered: B,
    errorCaptured: j,
    serverPrefetch: M,
    // public API
    expose: N,
    inheritAttrs: z,
    // assets
    components: U,
    directives: se,
    filters: be
  } = t;
  if (c && _a(c, r, null), i)
    for (const W in i) {
      const Y = i[W];
      $(Y) && (r[W] = Y.bind(n));
    }
  if (o) {
    const W = o.call(n, n);
    J(W) && (e.data = /* @__PURE__ */ Wn(W));
  }
  if (Dr = !0, s)
    for (const W in s) {
      const Y = s[W], Be = $(Y) ? Y.bind(n, n) : $(Y.get) ? Y.get.bind(n, n) : Ne, ot = !$(Y) && $(Y.set) ? Y.set.bind(n) : Ne, Oe = le({
        get: Be,
        set: ot
      });
      Object.defineProperty(r, W, {
        enumerable: !0,
        configurable: !0,
        get: () => Oe.value,
        set: (ae) => Oe.value = ae
      });
    }
  if (l)
    for (const W in l)
      Qs(l[W], r, n, W);
  if (a) {
    const W = $(a) ? a.call(n) : a;
    Reflect.ownKeys(W).forEach((Y) => {
      ta(Y, W[Y]);
    });
  }
  u && Ro(u, e, "c");
  function te(W, Y) {
    K(Y) ? Y.forEach((Be) => W(Be.bind(n))) : Y && W(Y.bind(n));
  }
  if (te(ua, h), te(fa, v), te(da, b), te(pa, R), te(la, P), te(aa, A), te(ya, j), te(ma, L), te(ha, B), te(Js, C), te(Zs, O), te(ga, M), K(N))
    if (N.length) {
      const W = e.exposed || (e.exposed = {});
      N.forEach((Y) => {
        Object.defineProperty(W, Y, {
          get: () => n[Y],
          set: (Be) => n[Y] = Be,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  k && e.render === Ne && (e.render = k), z != null && (e.inheritAttrs = z), U && (e.components = U), se && (e.directives = se), M && Ys(e);
}
function _a(e, t, n = Ne) {
  K(e) && (e = Fr(e));
  for (const r in e) {
    const o = e[r];
    let s;
    J(o) ? "default" in o ? s = Sn(
      o.from || r,
      o.default,
      !0
    ) : s = Sn(o.from || r) : s = Sn(o), /* @__PURE__ */ pe(s) ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (i) => s.value = i
    }) : t[r] = s;
  }
}
function Ro(e, t, n) {
  Ae(
    K(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Qs(e, t, n, r) {
  let o = r.includes(".") ? qs(n, r) : () => n[r];
  if (re(e)) {
    const s = t[e];
    $(s) && Ve(o, s);
  } else if ($(e))
    Ve(o, e.bind(n));
  else if (J(e))
    if (K(e))
      e.forEach((s) => Qs(s, t, n, r));
    else {
      const s = $(e.handler) ? e.handler.bind(n) : t[e.handler];
      $(s) && Ve(o, s, e);
    }
}
function ei(e) {
  const t = e.type, { mixins: n, extends: r } = t, {
    mixins: o,
    optionsCache: s,
    config: { optionMergeStrategies: i }
  } = e.appContext, l = s.get(t);
  let a;
  return l ? a = l : !o.length && !n && !r ? a = t : (a = {}, o.length && o.forEach(
    (c) => An(a, c, i, !0)
  ), An(a, t, i)), J(t) && s.set(t, a), a;
}
function An(e, t, n, r = !1) {
  const { mixins: o, extends: s } = t;
  s && An(e, s, n, !0), o && o.forEach(
    (i) => An(e, i, n, !0)
  );
  for (const i in t)
    if (!(r && i === "expose")) {
      const l = Sa[i] || n && n[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const Sa = {
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
  watch: Ra,
  // provide / inject
  provide: Co,
  inject: xa
};
function Co(e, t) {
  return t ? e ? function() {
    return ge(
      $(e) ? e.call(this, this) : e,
      $(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function xa(e, t) {
  return Bt(Fr(e), Fr(t));
}
function Fr(e) {
  if (K(e)) {
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
  return e ? ge(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Po(e, t) {
  return e ? K(e) && K(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : ge(
    /* @__PURE__ */ Object.create(null),
    xo(e),
    xo(t ?? {})
  ) : t;
}
function Ra(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = ge(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = me(e[r], t[r]);
  return n;
}
function ti() {
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
let Ca = 0;
function Pa(e, t) {
  return function(r, o = null) {
    $(r) || (r = ge({}, r)), o != null && !J(o) && (o = null);
    const s = ti(), i = /* @__PURE__ */ new WeakSet(), l = [];
    let a = !1;
    const c = s.app = {
      _uid: Ca++,
      _component: r,
      _props: o,
      _container: null,
      _context: s,
      _instance: null,
      version: sc,
      get config() {
        return s.config;
      },
      set config(u) {
      },
      use(u, ...h) {
        return i.has(u) || (u && $(u.install) ? (i.add(u), u.install(c, ...h)) : $(u) && (i.add(u), u(c, ...h))), c;
      },
      mixin(u) {
        return s.mixins.includes(u) || s.mixins.push(u), c;
      },
      component(u, h) {
        return h ? (s.components[u] = h, c) : s.components[u];
      },
      directive(u, h) {
        return h ? (s.directives[u] = h, c) : s.directives[u];
      },
      mount(u, h, v) {
        if (!a) {
          const b = c._ceVNode || Je(r, o);
          return b.appContext = s, v === !0 ? v = "svg" : v === !1 && (v = void 0), e(b, u, v), a = !0, c._container = u, u.__vue_app__ = c, Yn(b.component);
        }
      },
      onUnmount(u) {
        l.push(u);
      },
      unmount() {
        a && (Ae(
          l,
          c._instance,
          16
        ), e(null, c._container), delete c._container.__vue_app__);
      },
      provide(u, h) {
        return s.provides[u] = h, c;
      },
      runWithContext(u) {
        const h = Ft;
        Ft = c;
        try {
          return u();
        } finally {
          Ft = h;
        }
      }
    };
    return c;
  };
}
let Ft = null;
const Oa = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Ee(t)}Modifiers`] || e[`${xt(t)}Modifiers`];
function Ea(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || Q;
  let o = n;
  const s = t.startsWith("update:"), i = s && Oa(r, t.slice(7));
  i && (i.trim && (o = n.map((u) => re(u) ? u.trim() : u)), i.number && (o = o.map(gl)));
  let l, a = r[l = ir(t)] || // also try camelCase event handler (#2249)
  r[l = ir(Ee(t))];
  !a && s && (a = r[l = ir(xt(t))]), a && Ae(
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
    e.emitted[l] = !0, Ae(
      c,
      e,
      6,
      o
    );
  }
}
const Ma = /* @__PURE__ */ new WeakMap();
function ni(e, t, n = !1) {
  const r = n ? Ma : t.emitsCache, o = r.get(e);
  if (o !== void 0)
    return o;
  const s = e.emits;
  let i = {}, l = !1;
  if (!$(e)) {
    const a = (c) => {
      const u = ni(c, t, !0);
      u && (l = !0, ge(i, u));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !s && !l ? (J(e) && r.set(e, null), null) : (K(s) ? s.forEach((a) => i[a] = null) : ge(i, s), J(e) && r.set(e, i), i);
}
function qn(e, t) {
  return !e || !kn(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), q(e, t[0].toLowerCase() + t.slice(1)) || q(e, xt(t)) || q(e, t));
}
function Oo(e) {
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
    props: h,
    data: v,
    setupState: b,
    ctx: R,
    inheritAttrs: P
  } = e, A = Mn(e);
  let F, C;
  try {
    if (n.shapeFlag & 4) {
      const O = o || r, k = O;
      F = Le(
        c.call(
          k,
          O,
          u,
          h,
          b,
          v,
          R
        )
      ), C = l;
    } else {
      const O = t;
      F = Le(
        O.length > 1 ? O(
          h,
          { attrs: l, slots: i, emit: a }
        ) : O(
          h,
          null
        )
      ), C = t.props ? l : Ia(l);
    }
  } catch (O) {
    vt.length = 0, Bn(O, e, 1), F = Je(tt);
  }
  let D = F;
  if (C && P !== !1) {
    const O = Object.keys(C), { shapeFlag: k } = D;
    O.length && k & 7 && (s && O.some(Kn) && (C = Aa(
      C,
      s
    )), D = Ht(D, C, !1, !0));
  }
  if (n.dirs && (D = Ht(D, null, !1, !0), D.dirs = D.dirs ? D.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const O = Un(D.type) && zs(D) || D;
    to(O, n.transition);
  }
  return F = D, Mn(A), F;
}
const Ia = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || kn(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Aa = (e, t) => {
  const n = {};
  for (const r in e)
    (!Kn(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
  return n;
};
function Ta(e, t, n) {
  const { props: r, children: o, component: s } = e, { props: i, children: l, patchFlag: a } = t, c = s.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return r ? Eo(r, i, c) : !!i;
    if (a & 8) {
      const u = t.dynamicProps;
      for (let h = 0; h < u.length; h++) {
        const v = u[h];
        if (ri(i, r, v) && !qn(c, v))
          return !0;
      }
    }
  } else
    return (o || l) && (!l || !l.$stable) ? !0 : r === i ? !1 : r ? i ? Eo(r, i, c) : !0 : !!i;
  return !1;
}
function Eo(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < r.length; o++) {
    const s = r[o];
    if (ri(t, e, s) && !qn(n, s))
      return !0;
  }
  return !1;
}
function ri(e, t, n) {
  const r = e[n], o = t[n];
  return n === "style" && J(r) && J(o) ? !Nn(r, o) : r !== o;
}
function Da({ vnode: e, parent: t, suspense: n }, r) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.suspense.vnode.el = o.el = r, e = o), o === e)
      (e = t.vnode).el = r, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = r);
}
const oi = {}, si = () => Object.create(oi), ii = (e) => Object.getPrototypeOf(e) === oi;
function Fa(e, t, n, r = !1) {
  const o = {}, s = si();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), li(e, t, o, s);
  for (const i in e.propsOptions[0])
    i in o || (o[i] = void 0);
  n ? e.props = r ? o : /* @__PURE__ */ Nl(o) : e.type.props ? e.props = o : e.props = s, e.attrs = s;
}
function ja(e, t, n, r) {
  const {
    props: o,
    attrs: s,
    vnode: { patchFlag: i }
  } = e, l = /* @__PURE__ */ G(o), [a] = e.propsOptions;
  let c = !1;
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
        if (qn(e.emitsOptions, v))
          continue;
        const b = t[v];
        if (a)
          if (q(s, v))
            b !== s[v] && (s[v] = b, c = !0);
          else {
            const R = Ee(v);
            o[R] = jr(
              a,
              l,
              R,
              b,
              e,
              !1
            );
          }
        else
          b !== s[v] && (s[v] = b, c = !0);
      }
    }
  } else {
    li(e, t, o, s) && (c = !0);
    let u;
    for (const h in l)
      (!t || // for camelCase
      !q(t, h) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((u = xt(h)) === h || !q(t, u))) && (a ? n && // for camelCase
      (n[h] !== void 0 || // for kebab-case
      n[u] !== void 0) && (o[h] = jr(
        a,
        l,
        h,
        void 0,
        e,
        !0
      )) : delete o[h]);
    if (s !== l)
      for (const h in s)
        (!t || !q(t, h)) && (delete s[h], c = !0);
  }
  c && Ye(e.attrs, "set", "");
}
function li(e, t, n, r) {
  const [o, s] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let a in t) {
      if (Gt(a))
        continue;
      const c = t[a];
      let u;
      o && q(o, u = Ee(a)) ? !s || !s.includes(u) ? n[u] = c : (l || (l = {}))[u] = c : qn(e.emitsOptions, a) || (!(a in r) || c !== r[a]) && (r[a] = c, i = !0);
    }
  if (s) {
    const a = /* @__PURE__ */ G(n), c = l || Q;
    for (let u = 0; u < s.length; u++) {
      const h = s[u];
      n[h] = jr(
        o,
        a,
        h,
        c[h],
        e,
        !q(c, h)
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
      const a = i.default;
      if (i.type !== Function && !i.skipFactory && $(a)) {
        const { propsDefaults: c } = o;
        if (n in c)
          r = c[n];
        else {
          const u = un(o);
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
    ] && (r === "" || r === xt(n)) && (r = !0));
  }
  return r;
}
const Ha = /* @__PURE__ */ new WeakMap();
function ai(e, t, n = !1) {
  const r = n ? Ha : t.propsCache, o = r.get(e);
  if (o)
    return o;
  const s = e.props, i = {}, l = [];
  let a = !1;
  if (!$(e)) {
    const u = (h) => {
      a = !0;
      const [v, b] = ai(h, t, !0);
      ge(i, v), b && l.push(...b);
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  if (!s && !a)
    return J(e) && r.set(e, It), It;
  if (K(s))
    for (let u = 0; u < s.length; u++) {
      const h = Ee(s[u]);
      Mo(h) && (i[h] = Q);
    }
  else if (s)
    for (const u in s) {
      const h = Ee(u);
      if (Mo(h)) {
        const v = s[u], b = i[h] = K(v) || $(v) ? { type: v } : ge({}, v), R = b.type;
        let P = !1, A = !0;
        if (K(R))
          for (let F = 0; F < R.length; ++F) {
            const C = R[F], D = $(C) && C.name;
            if (D === "Boolean") {
              P = !0;
              break;
            } else D === "String" && (A = !1);
          }
        else
          P = $(R) && R.name === "Boolean";
        b[
          0
          /* shouldCast */
        ] = P, b[
          1
          /* shouldCastTrue */
        ] = A, (P || q(b, "default")) && l.push(h);
      }
    }
  const c = [i, l];
  return J(e) && r.set(e, c), c;
}
function Mo(e) {
  return e[0] !== "$" && !Gt(e);
}
const ro = (e) => e === "_" || e === "_ctx" || e === "$stable", oo = (e) => K(e) ? e.map(Le) : [Le(e)], ka = (e, t, n) => {
  if (t._n)
    return t;
  const r = Ql((...o) => oo(t(...o)), n);
  return r._c = !1, r;
}, ci = (e, t, n) => {
  const r = e._ctx;
  for (const o in e) {
    if (ro(o)) continue;
    const s = e[o];
    if ($(s))
      t[o] = ka(o, s, r);
    else if (s != null) {
      const i = oo(s);
      t[o] = () => i;
    }
  }
}, ui = (e, t) => {
  const n = oo(t);
  e.slots.default = () => n;
}, fi = (e, t, n) => {
  for (const r in t)
    (n || !ro(r)) && (e[r] = t[r]);
}, Ka = (e, t, n) => {
  const r = e.slots = si();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (fi(r, t, n), n && bs(r, "_", o, !0)) : ci(t, r);
  } else t && ui(e, t);
}, La = (e, t, n) => {
  const { vnode: r, slots: o } = e;
  let s = !0, i = Q;
  if (r.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? s = !1 : fi(o, t, n) : (s = !t.$stable, ci(t, o)), i = t;
  } else t && (ui(e, t), i = { default: 1 });
  if (s)
    for (const l in o)
      !ro(l) && i[l] == null && delete o[l];
}, _e = Ba;
function $a(e) {
  return Na(e);
}
function Na(e, t) {
  const n = $n();
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
    parentNode: h,
    nextSibling: v,
    setScopeId: b = Ne,
    insertStaticContent: R
  } = e, P = (f, p, y, x = null, d = null, g = null, m = void 0, w = null, S = !!p.dynamicChildren) => {
    if (f === p)
      return;
    f && !Wt(f, p) && (x = Te(f), ae(f, d, g, !0), f = null), p.patchFlag === -2 && (S = !1, p.dynamicChildren = null);
    const { type: _, ref: I, shapeFlag: E } = p;
    switch (_) {
      case zn:
        A(f, p, y, x);
        break;
      case tt:
        F(f, p, y, x);
        break;
      case mr:
        f == null && C(p, y, x, m);
        break;
      case xe:
        U(
          f,
          p,
          y,
          x,
          d,
          g,
          m,
          w,
          S
        );
        break;
      default:
        E & 1 ? k(
          f,
          p,
          y,
          x,
          d,
          g,
          m,
          w,
          S
        ) : E & 6 ? se(
          f,
          p,
          y,
          x,
          d,
          g,
          m,
          w,
          S
        ) : (E & 64 || E & 128) && _.process(
          f,
          p,
          y,
          x,
          d,
          g,
          m,
          w,
          S,
          it
        );
    }
    I != null && d ? Yt(I, f && f.ref, g, p || f, !p) : I == null && f && f.ref != null && Yt(f.ref, null, g, f, !0);
  }, A = (f, p, y, x) => {
    if (f == null)
      r(
        p.el = l(p.children),
        y,
        x
      );
    else {
      const d = p.el = f.el;
      p.children !== f.children && c(d, p.children);
    }
  }, F = (f, p, y, x) => {
    f == null ? r(
      p.el = a(p.children || ""),
      y,
      x
    ) : p.el = f.el;
  }, C = (f, p, y, x) => {
    [f.el, f.anchor] = R(
      f.children,
      p,
      y,
      x,
      f.el,
      f.anchor
    );
  }, D = ({ el: f, anchor: p }, y, x) => {
    let d;
    for (; f && f !== p; )
      d = v(f), r(f, y, x), f = d;
    r(p, y, x);
  }, O = ({ el: f, anchor: p }) => {
    let y;
    for (; f && f !== p; )
      y = v(f), o(f), f = y;
    o(p);
  }, k = (f, p, y, x, d, g, m, w, S) => {
    if (p.type === "svg" ? m = "svg" : p.type === "math" && (m = "mathml"), f == null)
      L(
        p,
        y,
        x,
        d,
        g,
        m,
        w,
        S
      );
    else {
      const _ = f.el && f.el._isVueCE ? f.el : null;
      try {
        _ && _._beginPatch(), M(
          f,
          p,
          d,
          g,
          m,
          w,
          S
        );
      } finally {
        _ && _._endPatch();
      }
    }
  }, L = (f, p, y, x, d, g, m, w) => {
    let S, _;
    const { props: I, shapeFlag: E, transition: T, dirs: H } = f;
    if (S = f.el = i(
      f.type,
      g,
      I && I.is,
      I
    ), E & 8 ? u(S, f.children) : E & 16 && j(
      f.children,
      S,
      null,
      x,
      d,
      hr(f, g),
      m,
      w
    ), H && ft(f, null, x, "created"), B(S, f, f.scopeId, m, x), I) {
      for (const Z in I)
        Z !== "value" && !Gt(Z) && s(S, Z, null, I[Z], g, x);
      "value" in I && s(S, "value", null, I.value, g), (_ = I.onVnodeBeforeMount) && He(_, x, f);
    }
    H && ft(f, null, x, "beforeMount");
    const V = Va(d, T);
    V && T.beforeEnter(S), r(S, p, y), ((_ = I && I.onVnodeMounted) || V || H) && _e(() => {
      try {
        _ && He(_, x, f), V && T.enter(S), H && ft(f, null, x, "mounted");
      } finally {
      }
    }, d);
  }, B = (f, p, y, x, d) => {
    if (y && b(f, y), x)
      for (let g = 0; g < x.length; g++)
        b(f, x[g]);
    if (d) {
      let g = d.subTree;
      if (p === g || hi(g.type) && (g.ssContent === p || g.ssFallback === p)) {
        const m = d.vnode;
        B(
          f,
          m,
          m.scopeId,
          m.slotScopeIds,
          d.parent
        );
      }
    }
  }, j = (f, p, y, x, d, g, m, w, S = 0) => {
    for (let _ = S; _ < f.length; _++) {
      const I = f[_] = w ? ze(f[_]) : Le(f[_]);
      P(
        null,
        I,
        p,
        y,
        x,
        d,
        g,
        m,
        w
      );
    }
  }, M = (f, p, y, x, d, g, m) => {
    const w = p.el = f.el;
    let { patchFlag: S, dynamicChildren: _, dirs: I } = p;
    S |= f.patchFlag & 16;
    const E = f.props || Q, T = p.props || Q;
    let H;
    if (y && dt(y, !1), (H = T.onVnodeBeforeUpdate) && He(H, y, p, f), I && ft(p, f, y, "beforeUpdate"), y && dt(y, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    _ && (!f.dynamicChildren || f.dynamicChildren.length !== _.length) && (S = 0, m = !1, _ = null), (E.innerHTML && T.innerHTML == null || E.textContent && T.textContent == null) && u(w, ""), _ ? N(
      f.dynamicChildren,
      _,
      w,
      y,
      x,
      hr(p, d),
      g
    ) : m || Y(
      f,
      p,
      w,
      null,
      y,
      x,
      hr(p, d),
      g,
      !1
    ), S > 0) {
      if (S & 16)
        z(w, E, T, y, d);
      else if (S & 2 && E.class !== T.class && s(w, "class", null, T.class, d), S & 4 && s(w, "style", E.style, T.style, d), S & 8) {
        const V = p.dynamicProps;
        for (let Z = 0; Z < V.length; Z++) {
          const X = V[Z], oe = E[X], ce = T[X];
          (ce !== oe || X === "value") && s(w, X, oe, ce, d, y);
        }
      }
      S & 1 && f.children !== p.children && u(w, p.children);
    } else !m && _ == null && z(w, E, T, y, d);
    ((H = T.onVnodeUpdated) || I) && _e(() => {
      H && He(H, y, p, f), I && ft(p, f, y, "updated");
    }, x);
  }, N = (f, p, y, x, d, g, m) => {
    for (let w = 0; w < p.length; w++) {
      const S = f[w], _ = p[w], I = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        S.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (S.type === xe || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Wt(S, _) || // - In the case of a component, it could contain anything.
        S.shapeFlag & 198) ? h(S.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          y
        )
      );
      P(
        S,
        _,
        I,
        null,
        x,
        d,
        g,
        m,
        !0
      );
    }
  }, z = (f, p, y, x, d) => {
    if (p !== y) {
      if (p !== Q)
        for (const g in p)
          !Gt(g) && !(g in y) && s(
            f,
            g,
            p[g],
            null,
            d,
            x
          );
      for (const g in y) {
        if (Gt(g)) continue;
        const m = y[g], w = p[g];
        m !== w && g !== "value" && s(f, g, w, m, d, x);
      }
      "value" in y && s(f, "value", p.value, y.value, d);
    }
  }, U = (f, p, y, x, d, g, m, w, S) => {
    const _ = p.el = f ? f.el : l(""), I = p.anchor = f ? f.anchor : l("");
    let { patchFlag: E, dynamicChildren: T, slotScopeIds: H } = p;
    H && (w = w ? w.concat(H) : H), f == null ? (r(_, y, x), r(I, y, x), j(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      p.children || [],
      y,
      I,
      d,
      g,
      m,
      w,
      S
    )) : E > 0 && E & 64 && T && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    f.dynamicChildren && f.dynamicChildren.length === T.length ? (N(
      f.dynamicChildren,
      T,
      y,
      d,
      g,
      m,
      w
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (p.key != null || d && p === d.subTree) && di(
      f,
      p,
      !0
      /* shallow */
    )) : Y(
      f,
      p,
      y,
      I,
      d,
      g,
      m,
      w,
      S
    );
  }, se = (f, p, y, x, d, g, m, w, S) => {
    p.slotScopeIds = w, f == null ? p.shapeFlag & 512 ? d.ctx.activate(
      p,
      y,
      x,
      m,
      S
    ) : be(
      p,
      y,
      x,
      d,
      g,
      m,
      S
    ) : we(f, p, S);
  }, be = (f, p, y, x, d, g, m) => {
    const w = f.component = Za(
      f,
      x,
      d
    );
    if (no(f) && (w.ctx.renderer = it), ec(w, !1, m), w.asyncDep) {
      if (d && d.registerDep(w, te, m), !f.el) {
        const S = w.subTree = Je(tt);
        F(null, S, p, y), f.placeholder = S.el;
      }
    } else
      te(
        w,
        f,
        p,
        y,
        d,
        g,
        m
      );
  }, we = (f, p, y) => {
    const x = p.component = f.component;
    if (Ta(f, p, y))
      if (x.asyncDep && !x.asyncResolved) {
        W(x, p, y);
        return;
      } else
        x.next = p, x.update();
    else
      p.el = f.el, x.vnode = p;
  }, te = (f, p, y, x, d, g, m) => {
    const w = () => {
      if (f.isMounted) {
        let { next: E, bu: T, u: H, parent: V, vnode: Z } = f;
        {
          const Fe = pi(f);
          if (Fe) {
            E && (E.el = Z.el, W(f, E, m)), Fe.asyncDep.then(() => {
              _e(() => {
                f.isUnmounted || _();
              }, d);
            });
            return;
          }
        }
        let X = E, oe;
        dt(f, !1), E ? (E.el = Z.el, W(f, E, m)) : E = Z, T && lr(T), (oe = E.props && E.props.onVnodeBeforeUpdate) && He(oe, V, E, Z), dt(f, !0);
        const ce = Oo(f), De = f.subTree;
        f.subTree = ce, P(
          De,
          ce,
          // parent may have changed if it's in a teleport
          h(De.el),
          // anchor may have changed if it's in a fragment
          Te(De),
          f,
          d,
          g
        ), E.el = ce.el, X === null && Da(f, ce.el), H && _e(H, d), (oe = E.props && E.props.onVnodeUpdated) && _e(
          () => He(oe, V, E, Z),
          d
        );
      } else {
        let E;
        const { el: T, props: H } = p, { bm: V, m: Z, parent: X, root: oe, type: ce } = f, De = Xt(p);
        dt(f, !1), V && lr(V), !De && (E = H && H.onVnodeBeforeMount) && He(E, X, p), dt(f, !0);
        {
          oe.ce && oe.ce._hasShadowRoot() && oe.ce._injectChildStyle(
            ce,
            f.parent ? f.parent.type : void 0
          );
          const Fe = f.subTree = Oo(f);
          P(
            null,
            Fe,
            y,
            x,
            f,
            d,
            g
          ), p.el = Fe.el;
        }
        if (Z && _e(Z, d), !De && (E = H && H.onVnodeMounted)) {
          const Fe = p;
          _e(
            () => He(E, X, Fe),
            d
          );
        }
        (p.shapeFlag & 256 || X && Xt(X.vnode) && X.vnode.shapeFlag & 256) && f.a && _e(f.a, d), f.isMounted = !0, p = y = x = null;
      }
    };
    f.scope.on();
    const S = f.effect = new Rs(w);
    f.scope.off();
    const _ = f.update = S.run.bind(S), I = f.job = S.runIfDirty.bind(S);
    I.i = f, I.id = f.uid, S.scheduler = () => eo(I), dt(f, !0), _();
  }, W = (f, p, y) => {
    p.component = f;
    const x = f.vnode.props;
    f.vnode = p, f.next = null, ja(f, p.props, x, y), La(f, p.children, y), Ze(), wo(f), Qe();
  }, Y = (f, p, y, x, d, g, m, w, S = !1) => {
    const _ = f && f.children, I = f ? f.shapeFlag : 0, E = p.children, { patchFlag: T, shapeFlag: H } = p;
    if (T > 0) {
      if (T & 128) {
        ot(
          _,
          E,
          y,
          x,
          d,
          g,
          m,
          w,
          S
        );
        return;
      } else if (T & 256) {
        Be(
          _,
          E,
          y,
          x,
          d,
          g,
          m,
          w,
          S
        );
        return;
      }
    }
    H & 8 ? (I & 16 && Ue(_, d, g), E !== _ && u(y, E)) : I & 16 ? H & 16 ? ot(
      _,
      E,
      y,
      x,
      d,
      g,
      m,
      w,
      S
    ) : Ue(_, d, g, !0) : (I & 8 && u(y, ""), H & 16 && j(
      E,
      y,
      x,
      d,
      g,
      m,
      w,
      S
    ));
  }, Be = (f, p, y, x, d, g, m, w, S) => {
    f = f || It, p = p || It;
    const _ = f.length, I = p.length, E = Math.min(_, I);
    let T;
    for (T = 0; T < E; T++) {
      const H = p[T] = S ? ze(p[T]) : Le(p[T]);
      P(
        f[T],
        H,
        y,
        null,
        d,
        g,
        m,
        w,
        S
      );
    }
    _ > I ? Ue(
      f,
      d,
      g,
      !0,
      !1,
      E
    ) : j(
      p,
      y,
      x,
      d,
      g,
      m,
      w,
      S,
      E
    );
  }, ot = (f, p, y, x, d, g, m, w, S) => {
    let _ = 0;
    const I = p.length;
    let E = f.length - 1, T = I - 1;
    for (; _ <= E && _ <= T; ) {
      const H = f[_], V = p[_] = S ? ze(p[_]) : Le(p[_]);
      if (Wt(H, V))
        P(
          H,
          V,
          y,
          null,
          d,
          g,
          m,
          w,
          S
        );
      else
        break;
      _++;
    }
    for (; _ <= E && _ <= T; ) {
      const H = f[E], V = p[T] = S ? ze(p[T]) : Le(p[T]);
      if (Wt(H, V))
        P(
          H,
          V,
          y,
          null,
          d,
          g,
          m,
          w,
          S
        );
      else
        break;
      E--, T--;
    }
    if (_ > E) {
      if (_ <= T) {
        const H = T + 1, V = H < I ? p[H].el : x;
        for (; _ <= T; )
          P(
            null,
            p[_] = S ? ze(p[_]) : Le(p[_]),
            y,
            V,
            d,
            g,
            m,
            w,
            S
          ), _++;
      }
    } else if (_ > T)
      for (; _ <= E; )
        ae(f[_], d, g, !0), _++;
    else {
      const H = _, V = _, Z = /* @__PURE__ */ new Map();
      for (_ = V; _ <= T; _++) {
        const Se = p[_] = S ? ze(p[_]) : Le(p[_]);
        Se.key != null && Z.set(Se.key, _);
      }
      let X, oe = 0;
      const ce = T - V + 1;
      let De = !1, Fe = 0;
      const $t = new Array(ce);
      for (_ = 0; _ < ce; _++) $t[_] = 0;
      for (_ = H; _ <= E; _++) {
        const Se = f[_];
        if (oe >= ce) {
          ae(Se, d, g, !0);
          continue;
        }
        let je;
        if (Se.key != null)
          je = Z.get(Se.key);
        else
          for (X = V; X <= T; X++)
            if ($t[X - V] === 0 && Wt(Se, p[X])) {
              je = X;
              break;
            }
        je === void 0 ? ae(Se, d, g, !0) : ($t[je - V] = _ + 1, je >= Fe ? Fe = je : De = !0, P(
          Se,
          p[je],
          y,
          null,
          d,
          g,
          m,
          w,
          S
        ), oe++);
      }
      const fo = De ? Wa($t) : It;
      for (X = fo.length - 1, _ = ce - 1; _ >= 0; _--) {
        const Se = V + _, je = p[Se], po = p[Se + 1], go = Se + 1 < I ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          po.el || gi(po)
        ) : x;
        $t[_] === 0 ? P(
          null,
          je,
          y,
          go,
          d,
          g,
          m,
          w,
          S
        ) : De && (X < 0 || _ !== fo[X] ? Oe(je, y, go, 2) : X--);
      }
    }
  }, Oe = (f, p, y, x, d = null) => {
    const { el: g, type: m, transition: w, children: S, shapeFlag: _ } = f;
    if (_ & 6) {
      Oe(f.component.subTree, p, y, x);
      return;
    }
    if (_ & 128) {
      f.suspense.move(p, y, x);
      return;
    }
    if (_ & 64) {
      m.move(f, p, y, it);
      return;
    }
    if (m === xe) {
      r(g, p, y);
      for (let E = 0; E < S.length; E++)
        Oe(S[E], p, y, x);
      r(f.anchor, p, y);
      return;
    }
    if (m === mr) {
      D(f, p, y);
      return;
    }
    if (x !== 2 && _ & 1 && w)
      if (x === 0)
        w.persisted && !g[dr] ? r(g, p, y) : (w.beforeEnter(g), r(g, p, y), _e(() => w.enter(g), d));
      else {
        const { leave: E, delayLeave: T, afterLeave: H } = w, V = () => {
          f.ctx.isUnmounted ? o(g) : r(g, p, y);
        }, Z = () => {
          const X = g._isLeaving || !!g[dr];
          g._isLeaving && g[dr](
            !0
            /* cancelled */
          ), w.persisted && !X ? V() : E(g, () => {
            V(), H && H();
          });
        };
        T ? T(g, V, Z) : Z();
      }
    else
      r(g, p, y);
  }, ae = (f, p, y, x = !1, d = !1) => {
    const {
      type: g,
      props: m,
      ref: w,
      children: S,
      dynamicChildren: _,
      shapeFlag: I,
      patchFlag: E,
      dirs: T,
      cacheIndex: H,
      memo: V
    } = f;
    if (E === -2 && (d = !1), w != null && (Ze(), Yt(w, null, y, f, !0), Qe()), H != null && (p.renderCache[H] = void 0), I & 256) {
      p.ctx.deactivate(f);
      return;
    }
    const Z = I & 1 && T, X = !Xt(f);
    let oe;
    if (X && (oe = m && m.onVnodeBeforeUnmount) && He(oe, p, f), I & 6)
      sr(f.component, y, x);
    else {
      if (I & 128) {
        f.suspense.unmount(y, x);
        return;
      }
      Z && ft(f, null, p, "beforeUnmount"), I & 64 ? f.type.remove(
        f,
        p,
        y,
        it,
        x
      ) : _ && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !_.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (g !== xe || E > 0 && E & 64) ? Ue(
        _,
        p,
        y,
        !1,
        !0
      ) : (g === xe && E & 384 || !d && I & 16) && Ue(S, p, y), x && Pt(f);
    }
    const ce = V != null && H == null;
    (X && (oe = m && m.onVnodeUnmounted) || Z || ce) && _e(() => {
      oe && He(oe, p, f), Z && ft(f, null, p, "unmounted"), ce && (f.el = null);
    }, y);
  }, Pt = (f) => {
    const { type: p, el: y, anchor: x, transition: d } = f;
    if (p === xe) {
      or(y, x);
      return;
    }
    if (p === mr) {
      O(f);
      return;
    }
    const g = () => {
      o(y), d && !d.persisted && d.afterLeave && d.afterLeave();
    };
    if (f.shapeFlag & 1 && d && !d.persisted) {
      const { leave: m, delayLeave: w } = d, S = () => m(y, g);
      w ? w(f.el, g, S) : S();
    } else
      g();
  }, or = (f, p) => {
    let y;
    for (; f !== p; )
      y = v(f), o(f), f = y;
    o(p);
  }, sr = (f, p, y) => {
    const { bum: x, scope: d, job: g, subTree: m, um: w, m: S, a: _ } = f;
    Io(S), Io(_), x && lr(x), d.stop(), g && (g.flags |= 8, ae(m, f, p, y)), w && _e(w, p), _e(() => {
      f.isUnmounted = !0;
    }, p);
  }, Ue = (f, p, y, x = !1, d = !1, g = 0) => {
    for (let m = g; m < f.length; m++)
      ae(f[m], p, y, x, d);
  }, Te = (f) => {
    if (f.shapeFlag & 6)
      return Te(f.component.subTree);
    if (f.shapeFlag & 128)
      return f.suspense.next();
    const p = v(f.anchor || f.el), y = p && p[sa];
    return y ? v(y) : p;
  };
  let st = !1;
  const gn = (f, p, y) => {
    let x;
    f == null ? p._vnode && (ae(p._vnode, null, null, !0), x = p._vnode.component) : P(
      p._vnode || null,
      f,
      p,
      null,
      null,
      null,
      y
    ), p._vnode = f, st || (st = !0, wo(x), Ws(), st = !1);
  }, it = {
    p: P,
    um: ae,
    m: Oe,
    r: Pt,
    mt: be,
    mc: j,
    pc: Y,
    pbc: N,
    n: Te,
    o: e
  };
  return {
    render: gn,
    hydrate: void 0,
    createApp: Pa(gn)
  };
}
function hr({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function dt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Va(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function di(e, t, n = !1) {
  const r = e.children, o = t.children;
  if (K(r) && K(o))
    for (let s = 0; s < r.length; s++) {
      const i = r[s];
      let l = o[s];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = o[s] = ze(o[s]), l.el = i.el), !n && l.patchFlag !== -2 && di(i, l)), l.type === zn && (l.patchFlag === -1 && (l = o[s] = ze(l)), l.el = i.el), l.type === tt && !l.el && (l.el = i.el);
    }
}
function Wa(e) {
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
function pi(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : pi(t);
}
function Io(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function gi(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? gi(t.subTree) : null;
}
const hi = (e) => e.__isSuspense;
function Ba(e, t) {
  t && t.pendingBranch ? K(e) ? t.effects.push(...e) : t.effects.push(e) : Zl(e);
}
const xe = /* @__PURE__ */ Symbol.for("v-fgt"), zn = /* @__PURE__ */ Symbol.for("v-txt"), tt = /* @__PURE__ */ Symbol.for("v-cmt"), mr = /* @__PURE__ */ Symbol.for("v-stc"), vt = [];
let Re = null;
function fe(e = !1) {
  vt.push(Re = e ? null : []);
}
function mi() {
  vt.pop(), Re = vt[vt.length - 1] || null;
}
let nn = 1;
function Ao(e, t = !1) {
  nn += e, e < 0 && Re && t && (Re.hasOnce = !0);
}
function yi(e) {
  return e.dynamicChildren = nn > 0 ? Re || It : null, mi(), nn > 0 && Re && Re.push(e), e;
}
function he(e, t, n, r, o, s) {
  return yi(
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
function Ua(e, t, n, r, o) {
  return yi(
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
function vi(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Wt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const bi = ({ key: e }) => e ?? null, xn = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? re(e) || /* @__PURE__ */ pe(e) || $(e) ? { i: Ce, r: e, k: t, f: !!n } : e : null);
function gt(e, t = null, n = null, r = 0, o = null, s = e === xe ? 0 : 1, i = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && bi(t),
    ref: t && xn(t),
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
    ctx: Ce
  };
  return l ? (Tn(a, n), s & 128 && e.normalize(a)) : n && (a.shapeFlag |= re(n) ? 8 : 16), nn > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  Re && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && Re.push(a), a;
}
const Je = Ga;
function Ga(e, t = null, n = null, r = 0, o = null, s = !1) {
  if ((!e || e === va) && (e = tt), vi(e)) {
    const l = Ht(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Tn(l, n), nn > 0 && !s && Re && (l.shapeFlag & 6 ? Re[Re.indexOf(e)] = l : Re.push(l)), l.patchFlag = -2, l;
  }
  if (oc(e) && (e = e.__vccOpts), t) {
    t = qa(t);
    let { class: l, style: a } = t;
    l && !re(l) && (t.class = ht(l)), J(a) && (/* @__PURE__ */ Qr(a) && !K(a) && (a = ge({}, a)), t.style = At(a));
  }
  const i = re(e) ? 1 : hi(e) ? 128 : Un(e) ? 64 : J(e) ? 4 : $(e) ? 2 : 0;
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
function qa(e) {
  return e ? /* @__PURE__ */ Qr(e) || ii(e) ? ge({}, e) : e : null;
}
function Ht(e, t, n = !1, r = !1) {
  const { props: o, ref: s, patchFlag: i, children: l, transition: a } = e, c = t ? Ya(o || {}, t) : o, u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && bi(c),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && s ? K(s) ? s.concat(xn(t)) : [s, xn(t)] : xn(t)
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
    transition: a,
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
  return a && r && to(
    u,
    a.clone(u)
  ), u;
}
function za(e = " ", t = 0) {
  return Je(zn, null, e, t);
}
function vn(e = "", t = !1) {
  return t ? (fe(), Ua(tt, null, e)) : Je(tt, null, e);
}
function Le(e) {
  return e == null || typeof e == "boolean" ? Je(tt) : K(e) ? Je(
    xe,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : vi(e) ? ze(e) : Je(zn, null, String(e));
}
function ze(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Ht(e);
}
function Tn(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (K(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), Tn(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !ii(t) ? t._ctx = Ce : o === 3 && Ce && (Ce.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if ($(t)) {
    if (r & 65) {
      Tn(e, { default: t });
      return;
    }
    t = { default: t, _ctx: Ce }, n = 32;
  } else
    t = String(t), r & 64 ? (n = 16, t = [za(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function Ya(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === "class")
        t.class !== r.class && (t.class = ht([t.class, r.class]));
      else if (o === "style")
        t.style = At([t.style, r.style]);
      else if (kn(o)) {
        const s = t[o], i = r[o];
        i && s !== i && !(K(s) && s.includes(i)) ? t[o] = s ? [].concat(s, i) : i : i == null && s == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
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
const Xa = ti();
let Ja = 0;
function Za(e, t, n) {
  const r = e.type, o = (t ? t.appContext : e.appContext) || Xa, s = {
    uid: Ja++,
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
    scope: new Sl(
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
    emitsOptions: ni(r, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: Q,
    // inheritAttrs
    inheritAttrs: r.inheritAttrs,
    // state
    ctx: Q,
    data: Q,
    props: Q,
    attrs: Q,
    slots: Q,
    refs: Q,
    setupState: Q,
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
  return s.ctx = { _: s }, s.root = t ? t.root : s, s.emit = Ea.bind(null, s), e.ce && e.ce(s), s;
}
let ve = null;
const Qa = () => ve || Ce;
let Dn, rn;
{
  const e = $n(), t = (n, r) => {
    let o;
    return (o = e[n]) || (o = e[n] = []), o.push(r), (s) => {
      o.length > 1 ? o.forEach((i) => i(s)) : o[0](s);
    };
  };
  Dn = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => ve = n
  ), rn = t(
    "__VUE_SSR_SETTERS__",
    (n) => on = n
  );
}
const un = (e) => {
  const t = ve;
  return Dn(e), e.scope.on(), () => {
    e.scope.off(), Dn(t);
  };
}, To = () => {
  ve && ve.scope.off(), Dn(null);
};
function wi(e) {
  return e.vnode.shapeFlag & 4;
}
let on = !1;
function ec(e, t = !1, n = !1) {
  t && rn(t);
  const { props: r, children: o } = e.vnode, s = wi(e);
  Fa(e, r, s, t), Ka(e, o, n || t);
  const i = s ? tc(e, t) : void 0;
  return t && rn(!1), i;
}
function tc(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, ba);
  const { setup: r } = n;
  if (r) {
    Ze();
    const o = e.setupContext = r.length > 1 ? rc(e) : null, s = un(e), i = cn(
      r,
      e,
      0,
      [
        e.props,
        o
      ]
    ), l = hs(i);
    if (Qe(), s(), (l || e.sp) && !Xt(e) && Ys(e), l) {
      if (i.then(To, To), t)
        return i.then((a) => {
          rn(!0);
          try {
            Do(e, a, t);
          } finally {
            rn(!1);
          }
        }).catch((a) => {
          Bn(a, e, 0);
        });
      e.asyncDep = i;
    } else
      Do(e, i);
  } else
    _i(e);
}
function Do(e, t, n) {
  $(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : J(t) && (e.setupState = Ls(t)), _i(e);
}
function _i(e, t, n) {
  const r = e.type;
  e.render || (e.render = r.render || Ne);
  {
    const o = un(e);
    Ze();
    try {
      wa(e);
    } finally {
      Qe(), o();
    }
  }
}
const nc = {
  get(e, t) {
    return de(e, "get", ""), e[t];
  }
};
function rc(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, nc),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Yn(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Ls(Vl(e.exposed)), {
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
function oc(e) {
  return $(e) && "__vccOpts" in e;
}
const le = (e, t) => /* @__PURE__ */ ql(e, t, on), sc = "3.5.42";
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
const Si = Hr ? (e) => Hr.createHTML(e) : (e) => e, ic = "http://www.w3.org/2000/svg", lc = "http://www.w3.org/1998/Math/MathML", qe = typeof document < "u" ? document : null, jo = qe && /* @__PURE__ */ qe.createElement("template"), ac = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const o = t === "svg" ? qe.createElementNS(ic, e) : t === "mathml" ? qe.createElementNS(lc, e) : n ? qe.createElement(e, { is: n }) : qe.createElement(e);
    return e === "select" && r && r.multiple != null && o.setAttribute("multiple", r.multiple), o;
  },
  createText: (e) => qe.createTextNode(e),
  createComment: (e) => qe.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => qe.querySelector(e),
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
      jo.innerHTML = Si(
        r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e
      );
      const l = jo.content;
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
}, cc = /* @__PURE__ */ Symbol("_vtc");
function uc(e, t, n) {
  const r = e[cc];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Ho = /* @__PURE__ */ Symbol("_vod"), fc = /* @__PURE__ */ Symbol("_vsh"), dc = /* @__PURE__ */ Symbol(""), pc = /(?:^|;)\s*display\s*:/;
function gc(e, t, n) {
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
      l != null ? mc(
        e,
        i,
        !re(t) && t ? t[i] : void 0,
        l
      ) || Ut(r, i, l) : Ut(r, i, "");
    }
  } else if (o) {
    if (t !== n) {
      const i = r[dc];
      i && (n += ";" + i), r.cssText = n, s = pc.test(n);
    }
  } else t && e.removeAttribute("style");
  Ho in e && (e[Ho] = s ? r.display : "", e[fc] && (r.display = "none"));
}
const bn = /\s*!important$/;
function Ut(e, t, n) {
  if (K(n))
    n.forEach((r) => Ut(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--"))
    bn.test(n) ? e.setProperty(t, n.replace(bn, ""), "important") : e.setProperty(t, n);
  else {
    const r = hc(e, t);
    bn.test(n) ? e.setProperty(
      xt(r),
      n.replace(bn, ""),
      "important"
    ) : e[r] = n;
  }
}
const ko = ["Webkit", "Moz", "ms"], yr = {};
function hc(e, t) {
  const n = yr[t];
  if (n)
    return n;
  let r = Ee(t);
  if (r !== "filter" && r in e)
    return yr[t] = r;
  r = vs(r);
  for (let o = 0; o < ko.length; o++) {
    const s = ko[o] + r;
    if (s in e)
      return yr[t] = s;
  }
  return t;
}
function mc(e, t, n, r) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && re(r) && n === r;
}
const Ko = "http://www.w3.org/1999/xlink";
function Lo(e, t, n, r, o, s = wl(t)) {
  r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Ko, t.slice(6, t.length)) : e.setAttributeNS(Ko, t, n) : n == null || s && !ws(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    s ? "" : We(n) ? String(n) : n
  );
}
function $o(e, t, n, r, o) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Si(n) : n);
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
    l === "boolean" ? n = ws(n) : n == null && l === "string" ? (n = "", i = !0) : l === "number" && (n = 0, i = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  i && e.removeAttribute(o || t);
}
function yc(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function vc(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const No = /* @__PURE__ */ Symbol("_vei");
function bc(e, t, n, r, o = null) {
  const s = e[No] || (e[No] = {}), i = s[t];
  if (r && i)
    i.value = r;
  else {
    const [l, a] = Sc(t);
    if (r) {
      const c = s[t] = Cc(
        r,
        o
      );
      yc(e, l, c, a);
    } else i && (vc(e, l, i, a), s[t] = void 0);
  }
}
const wc = /(Once|Passive|Capture)$/, _c = /^on:?(?:Once|Passive|Capture)$/;
function Sc(e) {
  let t, n;
  for (; (n = e.match(wc)) && !_c.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : xt(e.slice(2)), t];
}
let vr = 0;
const xc = /* @__PURE__ */ Promise.resolve(), Rc = () => vr || (xc.then(() => vr = 0), vr = Date.now());
function Cc(e, t) {
  const n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    const o = n.value;
    if (K(o)) {
      const s = r.stopImmediatePropagation;
      r.stopImmediatePropagation = () => {
        s.call(r), r._stopped = !0;
      };
      const i = o.slice(), l = [r];
      for (let a = 0; a < i.length && !r._stopped; a++) {
        const c = i[a];
        c && Ae(
          c,
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
  return n.value = e, n.attached = Rc(), n;
}
const Vo = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Pc = (e, t, n, r, o, s) => {
  const i = o === "svg";
  t === "class" ? uc(e, r, i) : t === "style" ? gc(e, n, r) : kn(t) ? Kn(t) || bc(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Oc(e, t, r, i)) ? ($o(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Lo(e, t, r, i, s, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Ec(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !re(r))) ? $o(e, Ee(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), Lo(e, t, r, i));
};
function Oc(e, t, n, r) {
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
function Ec(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const r = Ee(t);
  return Array.isArray(n) ? n.some((o) => Ee(o) === r) : Object.keys(n).some((o) => Ee(o) === r);
}
const Mc = ["ctrl", "shift", "alt", "meta"], Ic = {
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
  exact: (e, t) => Mc.some((n) => e[`${n}Key`] && !t.includes(n))
}, Wo = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), r = t.join(".");
  return n[r] || (n[r] = (o, ...s) => {
    for (let i = 0; i < t.length; i++) {
      const l = Ic[t[i]];
      if (l && l(o, t)) return;
    }
    return e(o, ...s);
  });
}, Ac = /* @__PURE__ */ ge({ patchProp: Pc }, ac);
let Bo;
function Tc() {
  return Bo || (Bo = $a(Ac));
}
const Dc = (...e) => {
  const t = Tc().createApp(...e), { mount: n } = t;
  return t.mount = (r) => {
    const o = jc(r);
    if (!o) return;
    const s = t._component;
    !$(s) && !s.render && !s.template && (s.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const i = n(o, !1, Fc(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), i;
  }, t;
};
function Fc(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function jc(e) {
  return re(e) ? document.querySelector(e) : e;
}
function wn() {
  return !0;
}
const Hc = Symbol("merge-proxy"), Rn = Symbol("merge-proxy-sources"), kc = {
  get(e, t, n) {
    return t === Hc ? n : t === Rn ? e.sources : e.get(t);
  },
  has(e, t) {
    return e.has(t);
  },
  set: wn,
  deleteProperty: wn,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: wn,
      deleteProperty: wn
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function Cn(e) {
  return e && typeof e == "object" && "value" in e ? e.value : e;
}
function kr(...e) {
  const t = e.flatMap((n) => typeof n == "object" && n !== null && Rn in n && Array.isArray(n[Rn]) ? n[Rn] : [n]);
  return new Proxy({
    sources: t,
    get(n) {
      for (let r = t.length - 1; r >= 0; r--) {
        const o = Cn(t[r])[n];
        if (o !== void 0) return o;
      }
    },
    has(n) {
      for (let r = t.length - 1; r >= 0; r--) if (n in Cn(t[r])) return !0;
      return !1;
    },
    keys() {
      const n = [];
      for (const r of t) n.push(...Object.keys(Cn(r)));
      return [...Array.from(new Set(n))];
    }
  }, kc);
}
function Uo(...e) {
  const t = {};
  for (let n of e)
    if (n = Cn(n), !!n)
      for (const r of Reflect.ownKeys(n)) {
        const o = n[r];
        o !== void 0 && (t[r] = o);
      }
  return t;
}
function xi(e) {
  return typeof e == "function" ? e : (t) => {
    var n;
    return (n = e.next) == null ? void 0 : n.call(e, t);
  };
}
function Kc(e) {
  return Object.assign(e, {
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: Ve(e, xi(t), { flush: "sync" }) })
  });
}
function Lc(e) {
  return Object.assign(e, {
    set: (t) => {
      e.value = typeof t == "function" ? t(e.value) : t;
    },
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: Ve(e, xi(t), { flush: "sync" }) })
  });
}
function $c() {
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
    createReadonlyAtom: (t, n) => Kc(le(() => t())),
    createWritableAtom: (t, n) => Lc(/* @__PURE__ */ Wl(t)),
    untrack: (t) => t(),
    batch: (t) => t()
  };
}
function Xn(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function ut(e) {
  if (Array.isArray(e)) return e.map(ut);
  if (e && typeof e == "object") {
    const t = Object.getPrototypeOf(e);
    if (t !== Object.prototype && t !== null) return e;
    const n = t === null ? ee() : {}, r = Object.keys(e);
    for (let o = 0; o < r.length; o++) {
      const s = r[o];
      Object.defineProperty(n, s, {
        configurable: !0,
        enumerable: !0,
        value: ut(e[s]),
        writable: !0
      });
    }
    return n;
  }
  return e;
}
function Nc(e, t) {
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
function kt(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Ri(e, t) {
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
const Vc = 3;
function Wc(e, t) {
  return Ci(e, t, Vc);
}
function Ci(e, t, n) {
  if (Object.is(e, t)) return !0;
  if (n <= 0 || !Go(e) || !Go(t) || (Array.isArray(e) || Array.isArray(t)) && (!Array.isArray(e) || !Array.isArray(t) || e.length !== t.length))
    return !1;
  const r = qo(e), o = qo(t);
  if (r.length !== o.length) return !1;
  const s = e, i = t;
  for (let l = 0; l < r.length; l++) {
    const a = r[l];
    if (!Object.prototype.propertyIsEnumerable.call(t, a) || !Ci(s[a], i[a], n - 1)) return !1;
  }
  return !0;
}
function Jn(e, t, n, r = Wc) {
  const o = `on${t.charAt(0).toUpperCase()}${t.slice(1)}Change`, s = e.options[o];
  s && s((i) => {
    const l = Xn(n, i);
    return r(i, l) ? i : l;
  });
}
function Bc(e, t) {
  const n = [], r = (o) => {
    o.forEach((s) => {
      n.push(s);
      const i = t(s);
      i.length && r(i);
    });
  };
  return r(e), n;
}
const Uc = ({ fn: e, memoDeps: t, onAfterCompare: n, onAfterUpdate: r, onBeforeCompare: o, onBeforeUpdate: s }) => {
  let i = [], l;
  return (c) => {
    o == null || o();
    const u = t == null ? void 0 : t(c);
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
function Gc(e) {
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
    const { schedule: a, untrack: c } = o._reactivity;
    a(() => c(() => r()));
  };
  return Uc({
    ...s,
    ...{ onAfterUpdate: () => {
      i();
    } }
  });
}
function Pi(e, t = "_") {
  const [n, r] = e.split(t);
  return {
    fnKey: r,
    fnName: `${n}.${r}`,
    parentName: n
  };
}
function Rt(e, t, n) {
  for (const [r, { fn: o, memoDeps: s }] of Object.entries(n)) {
    const { fnKey: i, fnName: l } = Pi(r);
    t[i] = s ? Zn({
      memoDeps: s,
      fn: o,
      fnName: l,
      table: t,
      feature: e
    }) : o;
  }
}
function Kt(e, t, n, r) {
  for (const [o, { fn: s, memoDeps: i }] of Object.entries(r)) {
    const { fnKey: l, fnName: a } = Pi(o);
    if (i) {
      const c = `_memo_${l}`;
      t[l] = function(...u) {
        if (!this[c]) {
          const h = this;
          this[c] = Zn({
            memoDeps: (v) => i(h, v),
            fn: (...v) => s(h, ...v),
            fnName: a,
            objectId: h.id,
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
function ue(e, t, n, ...r) {
  var o;
  return ((o = e[t]) == null ? void 0 : o.call(e, ...r)) ?? n(e, ...r);
}
function qc(e) {
  return e.row.getValue(e.column.id);
}
function zc(e) {
  return e.getValue() ?? e.table.options.renderFallbackValue;
}
function Yc(e) {
  return {
    table: e.table,
    column: e.column,
    row: e.row,
    cell: e,
    getValue: () => e.getValue(),
    renderValue: () => e.renderValue()
  };
}
const Xc = { assignCellPrototype: (e, t) => {
  Kt("coreCellsFeature", e, t, {
    cell_getValue: { fn: (n) => qc(n) },
    cell_renderValue: { fn: (n) => zc(n) },
    cell_getContext: {
      fn: (n) => Yc(n),
      memoDeps: (n) => [n]
    }
  });
} };
function Jc(e) {
  var t, n;
  if (!e._headerPrototype) {
    e._headerPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignHeaderPrototype) == null || n.call(t, e._headerPrototype, e);
  }
  return e._headerPrototype;
}
function Oi(e, t, n) {
  const r = Jc(e), o = Object.create(r);
  o.colSpan = 0, o.column = t, o.depth = n.depth, o.headerGroup = null, o.id = n.id ?? t.id, o.index = n.index, o.isPlaceholder = !!n.isPlaceholder, o.placeholderId = n.placeholderId, o.rowSpan = 0, o.subHeaders = [];
  const s = e._headerInstanceInitFns;
  for (let i = 0; i < s.length; i++) s[i](o);
  return o;
}
function Zc() {
  return {
    start: [],
    end: []
  };
}
function wt(e) {
  var r;
  const t = (r = e.table.atoms.columnVisibility) == null ? void 0 : r.get();
  if (!t) return !0;
  const n = e.columns;
  return n.length ? n.some((o) => ue(o, "getIsVisible", wt)) : (kt(t, e.id) ? t[e.id] : void 0) ?? !0;
}
function Qc(e) {
  return e.getAllLeafColumns().filter((t) => ue(t, "getIsVisible", wt));
}
function Ei(e, t = 1) {
  let n = t;
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    ue(o, "getIsVisible", wt) && o.columns.length && (n = Math.max(n, Ei(o.columns, t + 1)));
  }
  return n;
}
function eu(e, t) {
  return String(t);
}
function tu(e, t, n, r) {
  let o = e ?? "";
  return t && (o = o ? `${o}_${t}` : String(t)), n && (o = o ? `${o}_${n}` : n), r && (o = o ? `${o}_${r}` : r), o;
}
function nu(e, t) {
  let n = 0;
  for (let r = 0; r < e.length; r++) e[r].column === t && n++;
  return n;
}
function Mi(e, t, n, r, o, s) {
  const i = {
    depth: t,
    id: eu(r, t),
    headers: []
  }, l = [];
  for (let a = 0; a < e.length; a++) {
    if (!(a in e)) continue;
    const c = e[a], u = l[l.length - 1], h = c.column.depth === i.depth;
    let v, b = !1;
    if (h && c.column.parent ? v = c.column.parent : (v = c.column, b = !0), u && u.column === v) u.subHeaders.push(c);
    else {
      const R = Oi(n, v, {
        id: tu(r, t, v.id, c.id),
        isPlaceholder: b,
        placeholderId: b ? String(nu(l, v)) : void 0,
        depth: t,
        index: l.length
      });
      R.subHeaders.push(c), l.push(R);
    }
    i.headers.push(c), c.headerGroup = i;
  }
  for (let a = 0; a < s.length; a++) s[a](i);
  o.push(i), t > 0 && Mi(l, t - 1, n, r, o, s);
}
function Ii(e) {
  for (let t = 0; t < e.length; t++) {
    const n = e[t];
    if (!ue(n.column, "getIsVisible", wt)) continue;
    let r = 0;
    if (n.subHeaders.length) {
      Ii(n.subHeaders);
      for (let o = 0; o < n.subHeaders.length; o++) {
        const s = n.subHeaders[o];
        ue(s.column, "getIsVisible", wt) && (r += s.colSpan);
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
function zo(e, t, n, r) {
  var a;
  const o = Ei(e), s = [], i = n._headerGroupInstanceInitFns, l = new Array(t.length);
  for (let c = 0; c < t.length; c++)
    c in t && (l[c] = Oi(n, t[c], {
      depth: o,
      index: c
    }));
  return Mi(l, o - 1, n, r, s, i), s.reverse(), Ii(((a = s[0]) == null ? void 0 : a.headers) ?? []), s;
}
function ru(e) {
  var t, n;
  if (!e._columnPrototype) {
    e._columnPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignColumnPrototype) == null || n.call(t, e._columnPrototype, e);
  }
  return e._columnPrototype;
}
function ou(e, t, n, r) {
  const o = {
    ...e.getDefaultColumnDef(),
    ...t
  }, s = o.accessorKey, i = s === void 0 ? void 0 : String(s), l = o.id ?? (i == null ? void 0 : i.replaceAll(".", "_")) ?? (typeof o.header == "string" ? o.header : void 0);
  let a;
  if (o.accessorFn) a = o.accessorFn;
  else if (s !== void 0) if (typeof s == "string" && s.includes(".")) {
    const v = s.split(".");
    a = (b) => {
      let R = b;
      for (let P = 0; P < v.length; P++) {
        const A = v[P];
        R = R == null ? void 0 : R[A];
      }
      return R;
    };
  } else a = (v) => v[o.accessorKey];
  if (!l)
    throw new Error();
  const c = ru(e), u = Object.create(c);
  u.accessorFn = a, u.columnDef = o, u.columns = [], u.depth = n, u.id = `${String(l)}`, u.parent = r;
  const h = e._columnInstanceInitFns;
  for (let v = 0; v < h.length; v++) h[v](u);
  return u;
}
function Ai(e) {
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
    return su(e, o);
  };
}
function su(e, t) {
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
function iu(e) {
  return [e, ...e.columns.flatMap((t) => t.getFlatColumns())];
}
function lu(e) {
  if (e.columns.length) {
    const t = e.columns.flatMap((n) => n.getLeafColumns());
    return ue(e.table, "getOrderColumns", Ai)(t);
  }
  return [e];
}
function au(e) {
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
function Ti(e, t, n, r = 0) {
  const o = new Array(t.length);
  for (let s = 0; s < t.length; s++) {
    if (!(s in t)) continue;
    const i = t[s], l = ou(e, i, r, n), a = i;
    l.columns = a.columns ? Ti(e, a.columns, l, r + 1) : [], o[s] = l;
  }
  return o;
}
function cu(e) {
  return Ti(e, e.options.columns);
}
function uu(e) {
  return e.getAllColumns().flatMap((t) => t.getFlatColumns());
}
function fu(e) {
  const t = ee(), n = e.getAllFlatColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function du(e) {
  const t = e.getAllColumns().flatMap((n) => n.getLeafColumns());
  return ue(e, "getOrderColumns", Ai)(t);
}
function pu(e) {
  const t = ee(), n = e.getAllLeafColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function gu(e, t) {
  return e.getAllFlatColumnsById()[t];
}
const hu = {
  assignColumnPrototype: (e, t) => {
    Kt("coreColumnsFeature", e, t, {
      column_getFlatColumns: {
        fn: (n) => iu(n),
        memoDeps: (n) => [n.table.options.columns]
      },
      column_getLeafColumns: {
        fn: (n) => lu(n),
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
        fn: () => au(e),
        memoDeps: () => [e.options.defaultColumn]
      },
      table_getAllColumns: {
        fn: () => cu(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumns: {
        fn: () => uu(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumnsById: {
        fn: () => fu(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllLeafColumns: {
        fn: () => du(e),
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
        fn: () => pu(e),
        memoDeps: () => [e.getAllLeafColumns()]
      },
      table_getColumn: { fn: (t) => gu(e, t) }
    });
  }
};
function Di(e, t) {
  for (let n = 0; n < e.subHeaders.length; n++) Di(e.subHeaders[n], t);
  t.push(e);
}
function mu(e) {
  const t = [];
  return Di(e, t), t;
}
function yu(e) {
  return {
    column: e.column,
    header: e,
    table: e.column.table
  };
}
function vu(e) {
  var c;
  const { start: t, end: n } = ((c = e.atoms.columnPinning) == null ? void 0 : c.get()) ?? Zc(), r = e.getAllColumns(), o = ue(e, "getVisibleLeafColumns", Qc);
  if (!t.length && !n.length) return zo(r, o, e);
  const s = e.getAllLeafColumnsById(), i = [];
  for (let u = 0; u < t.length; u++) {
    const h = s[t[u]];
    h && ue(h, "getIsVisible", wt) && i.push(h);
  }
  const l = [];
  for (let u = 0; u < n.length; u++) {
    const h = s[n[u]];
    h && ue(h, "getIsVisible", wt) && l.push(h);
  }
  const a = o.filter((u) => !t.includes(u.id) && !n.includes(u.id));
  return zo(r, [
    ...i,
    ...a,
    ...l
  ], e);
}
function bu(e) {
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
function _u(e) {
  var r;
  const t = ((r = e.getHeaderGroups()[0]) == null ? void 0 : r.headers) ?? [], n = [];
  for (let o = 0; o < t.length; o++) {
    const s = t[o].getLeafHeaders();
    for (let i = 0; i < s.length; i++) n.push(s[i]);
  }
  return n;
}
const Su = {
  assignHeaderPrototype: (e, t) => {
    Kt("coreHeadersFeature", e, t, {
      header_getLeafHeaders: {
        fn: (n) => mu(n),
        memoDeps: (n) => [n.column.table.options.columns]
      },
      header_getContext: {
        fn: (n) => yu(n),
        memoDeps: (n) => [n.column.table.options.columns]
      }
    });
  },
  constructTableAPIs: (e) => {
    Rt("coreHeadersFeature", e, {
      table_getHeaderGroups: {
        fn: () => vu(e),
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
        fn: () => bu(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getFlatHeaders: {
        fn: () => wu(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getLeafHeaders: {
        fn: () => _u(e),
        memoDeps: () => [e.getHeaderGroups()]
      }
    });
  }
};
function xu(e) {
  var t, n;
  if (!e._rowPrototype) {
    e._rowPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignRowPrototype) == null || n.call(t, e._rowPrototype, e);
  }
  return e._rowPrototype;
}
const Ru = (e, t, n, r, o, s, i) => {
  const l = xu(e), a = Object.create(l);
  a._displayIndexCache = -1, a._uniqueValuesCache = ee(), a._valuesCache = ee(), a.depth = o, a.id = t, a.index = r, a.original = n, a.parentId = i, a.subRows = [];
  const c = e._rowInstanceInitFns;
  for (let u = 0; u < c.length; u++) c[u](a);
  return a;
};
function Cu() {
  return [];
}
function Pu(e, t) {
  Jn(e, "cellSelection", ut(e.initialState.cellSelection) ?? Cu());
}
function Ou(e) {
  e.atoms.cellSelection && (e.options.autoResetAll ?? e.options.autoResetCellSelection ?? !0) && e._reactivity.schedule(() => Pu(e));
}
function Eu() {
  return ee();
}
function Fi(e) {
  e.atoms.expanded && (e.options.autoResetAll ?? e.options.autoResetExpanded ?? !e.options.manualExpanding) && e._reactivity.schedule(() => Hi(e));
}
function Fn(e, t) {
  var n, r;
  (r = (n = e.options).onExpandedChange) == null || r.call(n, t);
}
function ji(e, t) {
  var r;
  const n = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t ?? !Ki(e)) {
    if (n === !0 || !ki(e)) return;
    Fn(e, !0);
  } else {
    if (n !== !0 && !Object.keys(n).length) return;
    Fn(e, ee());
  }
}
function Hi(e, t) {
  const n = e.initialState.expanded;
  Jn(e, "expanded", t ? ee() : n === !0 ? !0 : Object.assign(ee(), ut(n ?? {})));
}
function ki(e) {
  return e.getPrePaginatedRowModel().flatRows.some((t) => _t(t));
}
function Mu(e) {
  return (t) => {
    ji(e);
  };
}
function Iu(e) {
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
function Au(e) {
  var r;
  let t = 0;
  const n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return (n === !0 ? Object.values(e.getRowModel().rowsById).filter((o) => _t(o)).map((o) => o.id) : Object.keys(n ?? {})).forEach((o) => {
    const s = o.split(".");
    t = Math.max(t, s.length);
  }), t;
}
function Li(e, t) {
  var s;
  const n = ((s = e.table.atoms.expanded) == null ? void 0 : s.get()) ?? {}, r = n === !0 || Kr(n, e.id), o = t ?? !r;
  o !== r && (o && !_t(e) || Fn(e.table, (i) => {
    const l = i === !0 ? !0 : Kr(i, e.id);
    let a = ee();
    if (i === !0 ? Object.values(e.table.getRowModel().rowsById).forEach((c) => {
      _t(c) && (a[c.id] = !0);
    }) : a = Object.assign(ee(), i), !l && o)
      return a[e.id] = !0, a;
    if (l && !o) {
      const c = ee(), u = Object.keys(a);
      for (let h = 0; h < u.length; h++) {
        const v = u[h];
        v !== e.id && a[v] && (c[v] = !0);
      }
      return c;
    }
    return i;
  }));
}
function Qn(e) {
  var n, r, o;
  const t = ((n = e.table.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return !!(((o = (r = e.table.options).getIsRowExpanded) == null ? void 0 : o.call(r, e)) ?? (t === !0 || Kr(t, e.id)));
}
function Kr(e, t) {
  return !!(e && e !== !0 && kt(e, t) && e[t]);
}
function _t(e) {
  var t, n;
  return ((n = (t = e.table.options).getRowCanExpand) == null ? void 0 : n.call(t, e)) ?? ((e.table.options.enableExpanding ?? !0) && !!e.subRows.length);
}
function Tu(e) {
  let t = !0, n = e;
  for (; t && n.parentId; )
    n = e.table.getRow(n.parentId, !0), t = Qn(n);
  return t;
}
function Du(e) {
  const t = _t(e);
  return () => {
    t && Li(e);
  };
}
const Lr = 0;
function Fu(e) {
  var t, n;
  if (e.options.autoResetAll ?? e.options.autoResetPageIndex ?? !e.options.manualPagination) {
    if ((((n = (t = e.atoms.pagination) == null ? void 0 : t.get()) == null ? void 0 : n.pageIndex) ?? Lr) === Lr) return;
    ku(e);
  }
}
function ju(e, t) {
  Jn(e, "pagination", t);
}
function Hu(e, t) {
  ju(e, (n) => {
    let r = Xn(t, n.pageIndex);
    const o = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
    return r = Math.max(0, Math.min(r, o)), {
      ...n,
      pageIndex: r
    };
  });
}
function ku(e, t) {
  Hu(e, Lr);
}
function Ku(e, t) {
  Jn(e, "sorting", t);
}
function Lu(e, t) {
  Ku(e, ut(e.initialState.sorting ?? []));
}
function $u(e) {
  e.atoms.sorting && (e.options.autoResetAll ?? e.options.autoResetSorting ?? !1) && Lu(e);
}
function $i() {
  return (e) => Zn({
    feature: "coreRowModelsFeature",
    table: e,
    fnName: "table.getCoreRowModel",
    memoDeps: () => [e.options.data],
    fn: () => Nu(e, e.options.data),
    onAfterUpdate: Gc(() => {
      Fi(e), Fu(e), $u(e), Ou(e);
    })
  });
}
function Ni(e, t, n, r = 0, o) {
  var i;
  const s = [];
  for (let l = 0; l < n.length; l++) {
    const a = n[l], c = Ru(e, e.getRowId(a, l, o), a, l, r, void 0, o == null ? void 0 : o.id);
    t.flatRows.push(c), t.rowsById[c.id] = c, s.push(c), e.options.getSubRows && (c.originalSubRows = e.options.getSubRows(a, l), (i = c.originalSubRows) != null && i.length && (c.subRows = Ni(e, t, c.originalSubRows, r + 1, c)));
  }
  return s;
}
function Nu(e, t) {
  const n = {
    rows: [],
    flatRows: [],
    rowsById: ee()
  };
  return n.rows = Ni(e, n, t), n;
}
function Vu(e) {
  var t, n;
  return e._rowModels.coreRowModel || (e._rowModels.coreRowModel = ((n = (t = e.options.features).coreRowModel) == null ? void 0 : n.call(t, e)) ?? $i()(e)), e._rowModels.coreRowModel();
}
function Wu(e) {
  return e.getCoreRowModel();
}
function Bu(e) {
  var t, n;
  return e._rowModels.filteredRowModel || (e._rowModels.filteredRowModel = (n = (t = e.options.features).filteredRowModel) == null ? void 0 : n.call(t, e)), e.options.manualFiltering || !e._rowModels.filteredRowModel ? e.getPreFilteredRowModel() : e._rowModels.filteredRowModel();
}
function Uu(e) {
  return e.getFilteredRowModel();
}
function Gu(e) {
  var t, n;
  return e._rowModels.groupedRowModel || (e._rowModels.groupedRowModel = (n = (t = e.options.features).groupedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualGrouping || !e._rowModels.groupedRowModel ? e.getPreGroupedRowModel() : e._rowModels.groupedRowModel();
}
function qu(e) {
  return e.getGroupedRowModel();
}
function zu(e) {
  var t, n;
  return e._rowModels.sortedRowModel || (e._rowModels.sortedRowModel = (n = (t = e.options.features).sortedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualSorting || !e._rowModels.sortedRowModel ? e.getPreSortedRowModel() : e._rowModels.sortedRowModel();
}
function Yu(e) {
  return e.getSortedRowModel();
}
function Xu(e) {
  var t, n;
  return e._rowModels.expandedRowModel || (e._rowModels.expandedRowModel = (n = (t = e.options.features).expandedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualExpanding || !e._rowModels.expandedRowModel ? e.getPreExpandedRowModel() : e._rowModels.expandedRowModel();
}
function Ju(e) {
  return e.getExpandedRowModel();
}
function Zu(e) {
  var t, n;
  return e._rowModels.paginatedRowModel || (e._rowModels.paginatedRowModel = (n = (t = e.options.features).paginatedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualPagination || !e._rowModels.paginatedRowModel ? e.getPrePaginatedRowModel() : e._rowModels.paginatedRowModel();
}
function Qu(e) {
  return e.getPaginatedRowModel();
}
const ef = { constructTableAPIs: (e) => {
  Rt("coreRowModelsFeature", e, {
    table_getCoreRowModel: { fn: () => Vu(e) },
    table_getPreFilteredRowModel: { fn: () => Wu(e) },
    table_getFilteredRowModel: { fn: () => Bu(e) },
    table_getPreGroupedRowModel: { fn: () => Uu(e) },
    table_getGroupedRowModel: { fn: () => Gu(e) },
    table_getPreSortedRowModel: { fn: () => qu(e) },
    table_getSortedRowModel: { fn: () => zu(e) },
    table_getPreExpandedRowModel: { fn: () => Yu(e) },
    table_getExpandedRowModel: { fn: () => Xu(e) },
    table_getPrePaginatedRowModel: { fn: () => Ju(e) },
    table_getPaginatedRowModel: { fn: () => Zu(e) },
    table_getRowModel: { fn: () => Qu(e) }
  });
} };
function tf(e) {
  var t, n;
  if (!e._cellPrototype) {
    e._cellPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignCellPrototype) == null || n.call(t, e._cellPrototype, e);
  }
  return e._cellPrototype;
}
function nf(e, t, n) {
  const r = tf(n), o = Object.create(r);
  o.column = e, o.id = `${t.id}_${e.id}`, o.row = t;
  const s = n._cellInstanceInitFns;
  for (let i = 0; i < s.length; i++) s[i](o);
  return o;
}
function rf(e) {
  const t = e.table.getRowsInDisplayOrder(), n = e._displayIndexCache;
  return t[n] === e ? n : -1;
}
function of(e) {
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
function sf(e, t) {
  if (kt(e._valuesCache, t)) return e._valuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return e._valuesCache[t] = n.accessorFn(e.original, e.index), e._valuesCache[t];
}
function lf(e, t) {
  if (kt(e._uniqueValuesCache, t)) return e._uniqueValuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return n.columnDef.getUniqueValues ? (e._uniqueValuesCache[t] = n.columnDef.getUniqueValues(e.original, e.index), e._uniqueValuesCache[t]) : (e._uniqueValuesCache[t] = [e.getValue(t)], e._uniqueValuesCache[t]);
}
function af(e, t) {
  return e.getValue(t) ?? e.table.options.renderFallbackValue;
}
function cf(e) {
  return Bc(e.subRows, (t) => t.subRows);
}
function uf(e) {
  const t = e.getCoreRowModel().flatRows;
  let n = 0;
  for (let r = 0; r < t.length; r++) n = Math.max(n, t[r].depth);
  return n;
}
function ff(e) {
  if (e.parentId)
    return e.table.getCoreRowModel().rowsById[e.parentId] ?? e.table.getRow(e.parentId, !0);
}
function df(e) {
  const t = [];
  let n = e;
  for (; ; ) {
    const r = n.getParentRow();
    if (!r) break;
    t.push(r), n = r;
  }
  return t.reverse();
}
function pf(e) {
  const t = e.table.getAllLeafColumns();
  let n = e._cellsCache;
  n || (n = e._cellsCache = /* @__PURE__ */ new WeakMap());
  const r = new Array(t.length);
  for (let o = 0; o < t.length; o++) {
    const s = t[o];
    let i = n.get(s);
    i || (i = nf(s, e, e.table), n.set(s, i)), r[o] = i;
  }
  return r;
}
function gf(e) {
  const t = ee(), n = e.getAllCells();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.column.id] = o;
  }
  return t;
}
function hf(e, t, n, r) {
  var o, s;
  return ((s = (o = t.options).getRowId) == null ? void 0 : s.call(o, e, n, r)) ?? (r ? `${r.id}.${n}` : String(n));
}
function mf(e, t, n) {
  let r = (n ? e.getPrePaginatedRowModel() : e.getRowModel()).rowsById[t];
  if (!r && (r = e.getCoreRowModel().rowsById[t], !r))
    throw new Error();
  return r;
}
const yf = {
  assignRowPrototype: (e, t) => {
    Kt("coreRowsFeature", e, t, {
      row_getDisplayIndex: { fn: (n) => rf(n) },
      row_getAllCellsByColumnId: {
        fn: (n) => gf(n),
        memoDeps: (n) => [n.getAllCells()]
      },
      row_getAllCells: {
        fn: (n) => pf(n),
        memoDeps: (n) => [n.table.getAllLeafColumns()]
      },
      row_getLeafRows: {
        fn: (n) => cf(n),
        memoDeps: (n) => [n.subRows]
      },
      row_getParentRow: { fn: (n) => ff(n) },
      row_getParentRows: { fn: (n) => df(n) },
      row_getUniqueValues: { fn: (n, r) => lf(n, r) },
      row_getValue: { fn: (n, r) => sf(n, r) },
      row_renderValue: { fn: (n, r) => af(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    Rt("coreRowsFeature", e, {
      table_getRowsInDisplayOrder: {
        fn: () => of(e),
        memoDeps: () => {
          var t;
          return [
            e.getPrePaginatedRowModel().rows,
            e.options.paginateExpandedRows,
            e.options.paginateExpandedRows === !1 ? (t = e.atoms.expanded) == null ? void 0 : t.get() : void 0
          ];
        }
      },
      table_getRowId: { fn: (t, n, r) => hf(t, e, n, r) },
      table_getRow: { fn: (t, n) => mf(e, t, n) },
      table_getMaxSubRowDepth: {
        fn: () => uf(e),
        memoDeps: () => [e.getCoreRowModel()]
      }
    });
  }
};
function Vi(e, t, n = (r, o) => r === o) {
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
function vf(e, t, n = (r, o) => r === o) {
  e._reactivity.batch(() => {
    var r, o;
    Vi(e, t, n), (o = (r = e._reactivity).commit) == null || o.call(r);
  });
}
function bf(e) {
  var r, o;
  const t = ut(e.initialState);
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
function _f(e, t, n) {
  const r = wf(e, Xn(t, e.options));
  e.optionsStore ? e.optionsStore.set(() => r) : e.options = r, vf(e, r.state ?? null);
}
const Sf = { constructTableAPIs: (e) => {
  Rt("coreTablesFeature", e, {
    table_reset: { fn: () => bf(e) },
    table_setOptions: { fn: (t) => _f(e, t) }
  });
} }, xf = {
  coreCellsFeature: Xc,
  coreColumnsFeature: hu,
  coreHeadersFeature: Su,
  coreRowModelsFeature: ef,
  coreRowsFeature: yf,
  coreTablesFeature: Sf
};
function Rf(e) {
  const t = e;
  return Object.defineProperty(e, "state", { get() {
    return e.get();
  } }), "set" in e && (t.setState = e.set.bind(e)), t;
}
function Cf(e, t) {
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
  const n = Yo(e);
  if (n.length !== Yo(t).length) return !1;
  for (let r = 0; r < n.length; r++) if (!Object.prototype.hasOwnProperty.call(t, n[r]) || !Object.is(e[n[r]], t[n[r]])) return !1;
  return !0;
}
function Yo(e) {
  return Object.keys(e).concat(Object.getOwnPropertySymbols(e));
}
function Pf(e, t = {}) {
  return Object.values(e).forEach((n) => {
    var r;
    t = ((r = n.getInitialState) == null ? void 0 : r.call(n, t)) ?? t;
  }), ut(t);
}
function Of(e) {
  var L, B;
  const t = e.features.coreReactivityFeature, { aggregationFns: n, columnMeta: r, coreRowModel: o, expandedRowModel: s, facetedMinMaxValues: i, facetedRowModel: l, facetedUniqueValues: a, filterFns: c, filterMeta: u, filteredRowModel: h, groupedRowModel: v, paginatedRowModel: b, sortFns: R, sortedRowModel: P, tableMeta: A, ...F } = e.features, C = {
    _cellInstanceInitFns: [],
    _columnInstanceInitFns: [],
    _features: {
      ...xf,
      ...F
    },
    _headerGroupInstanceInitFns: [],
    _headerInstanceInitFns: [],
    _reactivity: t,
    _rowInstanceInitFns: [],
    _rowModelFns: {
      aggregationFns: n,
      filterFns: c,
      sortFns: R
    },
    _rowModels: {},
    atoms: {},
    baseAtoms: {}
  }, D = Object.values(C._features), O = {
    ...D.reduce((j, M) => {
      var N;
      return Object.assign(j, (N = M.getDefaultTableOptions) == null ? void 0 : N.call(M, C));
    }, {}),
    ...e
  };
  if (t.wrapExternalAtoms && O.atoms) for (const [j, M] of Object.entries(O.atoms)) {
    const N = M, z = t.createWritableAtom(N.get(), { debugName: `externalAtom/${j}` });
    O.atoms[j] = z;
    let U = !1;
    const se = N.subscribe((we) => {
      U || z.set(we);
    }), be = z.subscribe((we) => {
      U = !0, N.set(we), U = !1;
    });
    t.addSubscription(se), t.addSubscription(be);
  }
  t.createOptionsStore ? (C.optionsStore = t.createWritableAtom(O, { debugName: "table/optionsStore" }), Object.defineProperty(C, "options", {
    configurable: !0,
    enumerable: !0,
    get() {
      return C.optionsStore.get();
    },
    set(j) {
      C.optionsStore.set(() => j);
    }
  })) : C.options = O, C.initialState = Pf(C._features, C.options.initialState);
  const k = Object.keys(C.initialState);
  for (let j = 0; j < k.length; j++) {
    const M = k[j];
    C.baseAtoms[M] = t.createWritableAtom(C.initialState[M], { debugName: `table/baseAtoms/${M}` }), C.atoms[M] = t.createReadonlyAtom(() => {
      var be;
      const N = C.options, z = (be = N.atoms) == null ? void 0 : be[M], U = z ? z.get() : C.baseAtoms[M].get();
      if (z) return U;
      const se = N.state;
      if (se && kt(se, M)) {
        const we = se[M];
        return we === void 0 ? C.initialState[M] : we;
      }
      return U;
    }, { debugName: `table/atoms/${M}` });
  }
  Vi(C), C.store = Rf(t.createReadonlyAtom(() => {
    const j = {};
    for (let M = 0; M < k.length; M++) {
      const N = k[M];
      j[N] = C.atoms[N].get();
    }
    return j;
  }, {
    compare: Cf,
    debugName: "table/store"
  }));
  for (let j = 0; j < D.length; j++) {
    const M = D[j];
    (L = M.initTableInstanceData) == null || L.call(M, C), M.initCellInstanceData && C._cellInstanceInitFns.push(M.initCellInstanceData.bind(M)), M.initColumnInstanceData && C._columnInstanceInitFns.push(M.initColumnInstanceData.bind(M)), M.initHeaderGroupInstanceData && C._headerGroupInstanceInitFns.push(M.initHeaderGroupInstanceData.bind(M)), M.initHeaderInstanceData && C._headerInstanceInitFns.push(M.initHeaderInstanceData.bind(M)), M.initRowInstanceData && C._rowInstanceInitFns.push(M.initRowInstanceData.bind(M)), (B = M.constructTableAPIs) == null || B.call(M, C);
  }
  return C;
}
const Ef = {
  getInitialState: (e) => ({
    expanded: Eu(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onExpandedChange: Ri("expanded", e),
    paginateExpandedRows: !0
  }),
  assignRowPrototype: (e, t) => {
    Kt("rowExpandingFeature", e, t, {
      row_toggleExpanded: { fn: (n, r) => Li(n, r) },
      row_getIsExpanded: { fn: (n) => Qn(n) },
      row_getCanExpand: { fn: (n) => _t(n) },
      row_getIsAllParentsExpanded: { fn: (n) => Tu(n) },
      row_getToggleExpandedHandler: { fn: (n) => Du(n) }
    });
  },
  constructTableAPIs: (e) => {
    Rt("rowExpandingFeature", e, {
      table_autoResetExpanded: { fn: () => Fi(e) },
      table_setExpanded: { fn: (t) => Fn(e, t) },
      table_toggleAllRowsExpanded: { fn: (t) => ji(e, t) },
      table_resetExpanded: { fn: (t) => Hi(e, t) },
      table_getCanSomeRowsExpand: { fn: () => ki(e) },
      table_getToggleAllRowsExpandedHandler: { fn: () => Mu(e) },
      table_getIsSomeRowsExpanded: { fn: () => Iu(e) },
      table_getIsAllRowsExpanded: { fn: () => Ki(e) },
      table_getExpandedDepth: { fn: () => Au(e) }
    });
  }
};
function Mf() {
  return ee();
}
function Lt(e, t) {
  var n, r;
  (r = (n = e.options).onRowSelectionChange) == null || r.call(n, t);
}
function If(e, t) {
  e._lastSelectedRowId = null, Lt(e, t ? ee() : Object.assign(ee(), ut(e.initialState.rowSelection ?? {})));
}
function Wi(e, t, n) {
  e._lastSelectedRowId = null, Lt(e, (r) => {
    if (t = typeof t < "u" ? t : !ue(e, "getIsAllRowsSelected", Gi), n != null && n.deselectAll && !t) return ee();
    const o = Object.assign(ee(), r), s = e.getPreGroupedRowModel().flatRows;
    if (t) {
      const i = /* @__PURE__ */ new Map();
      s.forEach((l) => {
        jn(l, i) && (o[l.id] = !0);
      });
    } else s.forEach((i) => {
      nt(i) && delete o[i.id];
    });
    return o;
  });
}
function Bi(e, t, n) {
  e._lastSelectedRowId = null, Lt(e, (r) => {
    const o = typeof t < "u" ? t : !ue(e, "getIsAllPageRowsSelected", qi);
    if (n != null && n.deselectAll && !o) return ee();
    const s = Object.assign(ee(), r);
    return e.getRowModel().rows.forEach((i) => {
      tr(s, i.id, o, !0, e, !0);
    }), s;
  });
}
function Af(e) {
  return e.getCoreRowModel();
}
function Tf(e) {
  const t = e.getCoreRowModel();
  return ue(e, "getIsSomeRowsSelected", er) ? lo(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: ee()
  };
}
function Df(e) {
  const t = e.getFilteredRowModel();
  return ue(e, "getIsSomeRowsSelected", er) ? lo(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: ee()
  };
}
function Ff(e) {
  const t = e.getSortedRowModel();
  return ue(e, "getIsSomeRowsSelected", er) ? lo(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: ee()
  };
}
function Ui(e) {
  var t;
  return Object.keys(((t = e.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function Gi(e) {
  var o;
  const t = e.getFilteredRowModel().flatRows, n = ((o = e.atoms.rowSelection) == null ? void 0 : o.get()) ?? {};
  let r = !!(t.length && Object.keys(n).length);
  if (r) {
    const s = /* @__PURE__ */ new Map();
    t.some((i) => !fn(i, n) && jn(i, s)) && (r = !1);
  }
  return r;
}
function qi(e) {
  var s;
  const t = e.getPaginatedRowModel().flatRows, n = ((s = e.atoms.rowSelection) == null ? void 0 : s.get()) ?? {}, r = /* @__PURE__ */ new Map();
  let o = !1;
  for (let i = 0; i < t.length; i++) {
    const l = t[i];
    if (fn(l, n))
      !o && jn(l, r) && (o = !0);
    else if (jn(l, r)) return !1;
  }
  return o;
}
function er(e) {
  return ue(e, "getSelectedRowIds", Ui).length > 0;
}
function jf(e) {
  return e.getPaginatedRowModel().flatRows.filter((t) => nt(t)).some((t) => so(t) || ue(t, "getIsSomeSelected", Yi));
}
function Hf(e) {
  return (t) => {
    Wi(e, t.target.checked);
  };
}
function kf(e) {
  return (t) => {
    Bi(e, t.target.checked);
  };
}
function zi(e, t, n) {
  const r = so(e);
  Lt(e.table, (o) => {
    t = typeof t < "u" ? t : !r;
    const s = Object.assign(ee(), o);
    return tr(s, e.id, t, ((n == null ? void 0 : n.selectChildren) ?? !0) && bt(e), e.table), !t && (n != null && n.deselectParents) && Xi(s, e), s;
  });
}
function so(e) {
  var t;
  return fn(e, ((t = e.table.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function Yi(e) {
  return ao(e) === "some";
}
function Kf(e) {
  return ao(e) === "all";
}
function nt(e) {
  const t = e.table.options;
  return typeof t.enableRowSelection == "function" ? t.enableRowSelection(e) : t.enableRowSelection ?? !0;
}
function io(e) {
  const t = e.table.options;
  return typeof t.enableSubRowSelection == "function" ? t.enableSubRowSelection(e) : t.enableSubRowSelection ?? !0;
}
function bt(e) {
  const t = e.table.options;
  return typeof t.enableMultiRowSelection == "function" ? t.enableMultiRowSelection(e) : t.enableMultiRowSelection ?? !0;
}
function Lf(e, t) {
  const n = nt(e);
  return (r) => {
    var a, c;
    if (!n) return;
    const o = r, s = e.table, i = o.target.checked, l = s._lastSelectedRowId;
    (!(s.options.enableRowRangeSelection !== !1 && l !== null && bt(e) && (((c = (a = s.options).isRowRangeSelectionEvent) == null ? void 0 : c.call(a, r)) ?? !1)) || !$f(e, l, i, t)) && zi(e, i, t), s._lastSelectedRowId = e.id;
  };
}
function $f(e, t, n, r) {
  const o = (r == null ? void 0 : r.selectChildren) ?? !0, s = e.table, i = s.getRowsInDisplayOrder(), l = s.getPrePaginatedRowModel().rowsById[t] ?? s.getCoreRowModel().rowsById[t];
  if (!l) return !1;
  const a = l.getDisplayIndex(), c = e.getDisplayIndex(), u = i[a], h = i[c];
  if (a < 0 || c < 0 || a >= i.length || c >= i.length || (u == null ? void 0 : u.id) !== l.id || (h == null ? void 0 : h.id) !== e.id || !bt(l) || !bt(e)) return !1;
  const v = Math.min(a, c), b = Math.max(a, c);
  return Lt(s, (R) => {
    const P = Object.assign(ee(), R);
    for (let A = v; A <= b; A++) {
      const F = i[A];
      !nt(F) || !bt(F) || (tr(P, F.id, n, o, s), !n && (r != null && r.deselectParents) && Xi(P, F));
    }
    return P;
  }), !0;
}
function tr(e, t, n, r, o, s) {
  const i = o.getRow(t, !0);
  n ? (bt(i) || Object.keys(e).forEach((l) => delete e[l]), nt(i) && (e[t] = !0)) : (!s || nt(i)) && delete e[t], r && i.subRows.length && io(i) && i.subRows.forEach((l) => tr(e, l.id, n, r, o, s));
}
function jn(e, t) {
  if (!nt(e)) return !1;
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
    if (!io(u)) {
      l = !1;
      break;
    }
    a = u.parentId;
  }
  return i.forEach((c) => t.set(c, l)), l;
}
function Xi(e, t) {
  const n = t.table.getCoreRowModel().rowsById;
  let r = t.parentId;
  for (; r !== void 0; )
    delete e[r], r = (n[r] ?? t.table.getRow(r, !0)).parentId;
}
function Ji(e, t, n, r) {
  const o = [];
  for (let s = 0; s < e.length; s++) {
    const i = e[s], l = fn(i, t);
    if (l && (n.push(i), r[i.id] = i), i.subRows.length) {
      const a = Ji(i.subRows, t, n, r);
      if (l) {
        const c = Object.create(Object.getPrototypeOf(i));
        Nc(c, i), c.subRows = a, o.push(c);
      }
    } else l && o.push(i);
  }
  return o;
}
function lo(e, t) {
  var s;
  const n = [], r = ee(), o = ((s = t.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  return {
    rows: Ji(e.rows, o, n, r),
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
      const a = ao(l);
      a === "all" ? (n = !0, o = !0) : a === "some" ? (n = !0, r = !1, o = !0) : r = !1;
    }
  }
  return o ? r ? "all" : n ? "some" : !1 : !1;
}
const Nf = {
  initTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  resetTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  getInitialState: (e) => ({
    rowSelection: Mf(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onRowSelectionChange: Ri("rowSelection", e),
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
    Kt("rowSelectionFeature", e, t, {
      row_toggleSelected: { fn: (n, r, o) => zi(n, r, o) },
      row_getIsSelected: { fn: (n) => so(n) },
      row_getIsSomeSelected: {
        fn: (n) => Yi(n),
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
        fn: (n) => Kf(n),
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
      row_getCanSelectSubRows: { fn: (n) => io(n) },
      row_getCanMultiSelect: { fn: (n) => bt(n) },
      row_getToggleSelectedHandler: { fn: (n, r) => Lf(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    Rt("rowSelectionFeature", e, {
      table_setRowSelection: { fn: (t) => Lt(e, t) },
      table_resetRowSelection: { fn: (t) => If(e, t) },
      table_toggleAllRowsSelected: { fn: (t, n) => Wi(e, t, n) },
      table_toggleAllPageRowsSelected: { fn: (t, n) => Bi(e, t, n) },
      table_getPreSelectedRowModel: { fn: () => Af(e) },
      table_getSelectedRowModel: {
        fn: () => Tf(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getCoreRowModel()];
        }
      },
      table_getFilteredSelectedRowModel: {
        fn: () => Df(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getFilteredRowModel()];
        }
      },
      table_getGroupedSelectedRowModel: {
        fn: () => Ff(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getSortedRowModel()];
        }
      },
      table_getSelectedRowIds: {
        fn: () => Ui(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get()];
        }
      },
      table_getIsAllRowsSelected: {
        fn: () => Gi(e),
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
        fn: () => qi(e),
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
        fn: () => jf(e),
        memoDeps: () => {
          var t;
          return [
            (t = e.atoms.rowSelection) == null ? void 0 : t.get(),
            e.getPaginatedRowModel(),
            e.options.enableRowSelection
          ];
        }
      },
      table_getToggleAllRowsSelectedHandler: { fn: () => Hf(e) },
      table_getToggleAllPageRowsSelectedHandler: { fn: () => kf(e) }
    });
  }
};
function Vf() {
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
      fn: () => Wf(t)
    });
  };
}
function Wf(e) {
  var r;
  const t = e.getPreExpandedRowModel(), n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return !t.rows.length || n !== !0 && !Object.keys(n ?? {}).length || !e.options.paginateExpandedRows && !e.options.manualPagination ? t : Bf(t);
}
function Bf(e) {
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
function Uf(e) {
  return Object.keys(e).map((t) => Tt(e[t]));
}
function Gf(e) {
  const t = (l, a) => {
    l.setOptions((c) => Uo(c, Xo(a)));
  }, n = $c(), r = kr(e, { features: {
    coreReactivityFeature: n,
    ...Tt(e.features) ?? {}
  } }), o = kr(Xo(r), { mergeOptions: (l, a) => Uo(l, a) }), s = Of(o), i = s;
  return xs() && xl(() => {
    var l;
    return (l = n.unmount) == null ? void 0 : l.call(n);
  }), Ve(() => Uf(r), () => {
    t(s, r);
  }, { immediate: !0 }), Ve(() => {
    const l = Tt(e.state), a = Tt(e.atoms);
    if (!l) return [];
    const c = [];
    for (const u of Object.keys(i.initialState))
      !(u in l) || (a == null ? void 0 : a[u]) !== void 0 || c.push(l[u]);
    return c;
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
function qf(e) {
  if (Array.isArray(e)) return e;
}
function zf(e, t) {
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
function $r(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Zi(e, t) {
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
function Qi(e, t) {
  return qf(e) || zf(e, t) || Zi(e, t) || Yf();
}
var Jo = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, St = {}, dn = {};
Object.defineProperty(dn, "__esModule", { value: !0 });
dn.bind = void 0;
function Xf(e, t) {
  var n = t.type, r = t.listener, o = t.options;
  return e.addEventListener(n, r, o), function() {
    e.removeEventListener(n, r, o);
  };
}
dn.bind = Xf;
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
var Jf = dn;
function Zo(e) {
  if (!(typeof e > "u"))
    return typeof e == "boolean" ? {
      capture: e
    } : e;
}
function Zf(e, t) {
  if (t == null)
    return e;
  var n = Mt(Mt({}, e), { options: Mt(Mt({}, Zo(t)), Zo(e.options)) });
  return n;
}
function Qf(e, t, n) {
  var r = t.map(function(o) {
    var s = Zf(o, n);
    return (0, Jf.bind)(e, s);
  });
  return function() {
    r.forEach(function(s) {
      return s();
    });
  };
}
rr.bindAll = Qf;
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
var el = "data-pdnd-honey-pot";
function tl(e) {
  return e instanceof Element && e.hasAttribute(el);
}
function nl(e) {
  var t = document.elementsFromPoint(e.x, e.y), n = Qi(t, 2), r = n[0], o = n[1];
  return r ? tl(r) ? o ?? null : r : null;
}
function sn(e) {
  "@babel/helpers - typeof";
  return sn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, sn(e);
}
function ed(e, t) {
  if (sn(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (sn(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function td(e) {
  var t = ed(e, "string");
  return sn(t) == "symbol" ? t : t + "";
}
function pn(e, t, n) {
  return (t = td(t)) in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var nd = 2147483647, rd = {
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
function od(e) {
  return {
    x: Math.floor(e.x),
    y: Math.floor(e.y)
  };
}
function sd(e) {
  return {
    x: e.x - ts,
    y: e.y - ts
  };
}
function id(e) {
  return {
    x: Math.max(e.x, 0),
    y: Math.max(e.y, 0)
  };
}
function ld(e) {
  return {
    x: Math.min(e.x, window.innerWidth - ln),
    y: Math.min(e.y, window.innerHeight - ln)
  };
}
function ns(e) {
  var t = e.client, n = ld(id(sd(od(t))));
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
function ad(e) {
  var t = e.client, n = e.clientRect;
  return (
    // is within horizontal bounds
    t.x >= n.x && t.x <= n.x + n.width && // is within vertical bounds
    t.y >= n.y && t.y <= n.y + n.height
  );
}
function cd(e) {
  var t = e.initial, n = document.createElement("div");
  n.setAttribute(el, "true"), br() && n.setAttribute("popover", "manual");
  var r = ns({
    client: t
  });
  Object.assign(n.style, es(es({
    position: "fixed"
  }, br() ? (
    // needs to come first as it has 'inset: unset' which
    // needs to be overridden by our top / left values
    rd
  ) : {
    // Fallback: using maximum possible z-index so that this element
    // will always be on top of other positioned content.
    zIndex: nd
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
    if (o(), ad({
      client: l,
      clientRect: r
    })) {
      n.remove();
      return;
    }
    function a() {
      c(), n.remove();
    }
    var c = St.bindAll(window, [
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
function ud() {
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
        var a = l.location.initial.input, c = e ?? {
          x: a.clientX,
          y: a.clientY
        };
        r = cd({
          initial: c
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
function fd(e) {
  if (Array.isArray(e)) return $r(e);
}
function dd(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function pd() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function rl(e) {
  return fd(e) || dd(e) || Zi(e) || pd();
}
var gd = Ct(function() {
  return navigator.userAgent.includes("Firefox");
}), co = Ct(function() {
  var t = navigator, n = t.userAgent;
  return n.includes("AppleWebKit") && !n.includes("Chrome");
});
function hd(e) {
  return "nodeName" in e;
}
function md(e) {
  return hd(e) && e.ownerDocument !== document;
}
var Nr = {
  isLeavingWindow: Symbol("leaving"),
  isEnteringWindow: Symbol("entering")
};
(function() {
  if (typeof window > "u" || !co())
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
function yd(e) {
  var t = e.dragLeave;
  return co() ? t.hasOwnProperty(Nr.isLeavingWindow) : !1;
}
function vd(e) {
  var t = e.dragLeave, n = t.type, r = t.relatedTarget;
  return n !== "dragleave" ? !1 : co() ? yd({
    dragLeave: t
  }) : r == null ? !0 : gd() ? md(r) : r instanceof HTMLIFrameElement;
}
function bd(e) {
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
    for (var i = arguments.length, l = new Array(i), a = 0; a < i; a++)
      l[a] = arguments[a];
    n = l, !r && (r = requestAnimationFrame(function() {
      r = null, t.apply(void 0, n);
    }));
  };
  return o.cancel = function() {
    r && (cancelAnimationFrame(r), r = null);
  }, o;
}, wr = wd(function(e) {
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
function _d(e) {
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
    dragUpdate: function(a) {
      var c = a.current;
      _n.flush(), wr.cancel(), s({
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
      wr(function() {
        _n.flush();
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
      _n.flush(), wr.cancel(), s({
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
var Vr = {
  isActive: !1
};
function ol() {
  return !Vr.isActive;
}
function Sd(e) {
  return e.dataTransfer ? e.dataTransfer.setDragImage.bind(e.dataTransfer) : null;
}
function xd(e) {
  var t = e.current, n = e.next;
  if (t.length !== n.length)
    return !0;
  for (var r = 0; r < t.length; r++)
    if (t[r].element !== n[r].element)
      return !0;
  return !1;
}
function Rd(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = e.dispatchEvent;
  if (!ol())
    return;
  var s = Cd({
    event: t,
    dragType: n,
    getDropTargetsOver: r
  });
  Vr.isActive = !0;
  var i = {
    current: s
  };
  _r({
    event: t,
    current: s.dropTargets
  });
  var l = _d({
    source: n.payload,
    dispatchEvent: o,
    initial: s
  });
  function a(b) {
    var R = xd({
      current: i.current.dropTargets,
      next: b.dropTargets
    });
    i.current = b, R && l.dragUpdate({
      current: i.current
    });
  }
  function c(b) {
    var R = Zt(b), P = tl(b.target) ? nl({
      x: R.clientX,
      y: R.clientY
    }) : b.target, A = r({
      target: P,
      input: R,
      source: n.payload,
      current: i.current.dropTargets
    });
    A.length && (b.preventDefault(), _r({
      event: b,
      current: A
    })), a({
      dropTargets: A,
      input: R
    });
  }
  function u() {
    i.current.dropTargets.length && a({
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
        c(R), l.drag({
          current: i.current
        });
      }
    }, {
      type: "dragenter",
      listener: c
    }, {
      type: "dragleave",
      listener: function(R) {
        vd({
          dragLeave: R
        }) && (a({
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
        R.preventDefault(), _r({
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
    }].concat(rl(bd({
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
    nativeSetDragImage: Sd(t)
  });
}
function _r(e) {
  var t, n = e.event, r = e.current, o = (t = r[0]) === null || t === void 0 ? void 0 : t.dropEffect;
  o != null && n.dataTransfer && (n.dataTransfer.dropEffect = o);
}
function Cd(e) {
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
  canStart: ol,
  start: Rd
}, Wr = /* @__PURE__ */ new Map();
function Pd(e) {
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
function Od(e) {
  var t = Pd(e);
  return function() {
    t.usageCount--, !(t.usageCount > 0) && (t.unmount(), Wr.delete(e.typeKey));
  };
}
function sl(e, t) {
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
function lt(e) {
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
function Sr(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = Ed(e)) || t) {
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
function xr(e) {
  return e.slice(0).reverse();
}
function Md(e) {
  var t = e.typeKey, n = e.defaultDropEffect, r = /* @__PURE__ */ new WeakMap(), o = "data-drop-target-for-".concat(t), s = "[".concat(o, "]");
  function i(b) {
    return r.set(b.element, b), function() {
      return r.delete(b.element);
    };
  }
  function l(b) {
    var R = nr(sl(b.element, {
      attribute: o,
      value: "true"
    }), i(b));
    return Ct(R);
  }
  function a(b) {
    var R, P, A, F, C = b.source, D = b.target, O = b.input, k = b.result, L = k === void 0 ? [] : k;
    if (D == null)
      return L;
    if (!(D instanceof Element))
      return D instanceof Node ? a({
        source: C,
        target: D.parentElement,
        input: O,
        result: L
      }) : L;
    var B = D.closest(s);
    if (B == null)
      return L;
    var j = r.get(B);
    if (j == null)
      return L;
    var M = {
      input: O,
      source: C,
      element: j.element
    };
    if (j.canDrop && !j.canDrop(M))
      return a({
        source: C,
        target: j.element.parentElement,
        input: O,
        result: L
      });
    var N = (R = (P = j.getData) === null || P === void 0 ? void 0 : P.call(j, M)) !== null && R !== void 0 ? R : {}, z = (A = (F = j.getDropEffect) === null || F === void 0 ? void 0 : F.call(j, M)) !== null && A !== void 0 ? A : n, U = {
      data: N,
      element: j.element,
      dropEffect: z,
      // we are collecting _actual_ drop targets, so these are
      // being applied _not_ due to stickiness
      isActiveDueToStickiness: !1
    };
    return a({
      source: C,
      target: j.element.parentElement,
      input: O,
      // Using bubble ordering. Same ordering as `event.getPath()`
      result: [].concat(rl(L), [U])
    });
  }
  function c(b) {
    var R = b.eventName, P = b.payload, A = Sr(P.location.current.dropTargets), F;
    try {
      for (A.s(); !(F = A.n()).done; ) {
        var C, D = F.value, O = r.get(D.element), k = lt(lt({}, P), {}, {
          self: D
        });
        O == null || (C = O[R]) === null || C === void 0 || C.call(
          O,
          // I cannot seem to get the types right here.
          // TS doesn't seem to like that one event can need `nativeSetDragImage`
          // @ts-expect-error
          k
        );
      }
    } catch (L) {
      A.e(L);
    } finally {
      A.f();
    }
  }
  var u = {
    onGenerateDragPreview: c,
    onDrag: c,
    onDragStart: c,
    onDrop: c,
    onDropTargetChange: function(R) {
      var P = R.payload, A = new Set(P.location.current.dropTargets.map(function(W) {
        return W.element;
      })), F = /* @__PURE__ */ new Set(), C = Sr(P.location.previous.dropTargets), D;
      try {
        for (C.s(); !(D = C.n()).done; ) {
          var O, k = D.value;
          F.add(k.element);
          var L = r.get(k.element), B = A.has(k.element), j = lt(lt({}, P), {}, {
            self: k
          });
          if (L == null || (O = L.onDropTargetChange) === null || O === void 0 || O.call(L, j), !B) {
            var M;
            L == null || (M = L.onDragLeave) === null || M === void 0 || M.call(L, j);
          }
        }
      } catch (W) {
        C.e(W);
      } finally {
        C.f();
      }
      var N = Sr(P.location.current.dropTargets), z;
      try {
        for (N.s(); !(z = N.n()).done; ) {
          var U, se, be = z.value;
          if (!F.has(be.element)) {
            var we = lt(lt({}, P), {}, {
              self: be
            }), te = r.get(be.element);
            te == null || (U = te.onDropTargetChange) === null || U === void 0 || U.call(te, we), te == null || (se = te.onDragEnter) === null || se === void 0 || se.call(te, we);
          }
        }
      } catch (W) {
        N.e(W);
      } finally {
        N.f();
      }
    }
  };
  function h(b) {
    u[b.eventName](b);
  }
  function v(b) {
    var R = b.source, P = b.target, A = b.input, F = b.current, C = a({
      source: R,
      target: P,
      input: A
    });
    if (C.length >= F.length)
      return C;
    for (var D = xr(F), O = xr(C), k = [], L = 0; L < D.length; L++) {
      var B, j = D[L], M = O[L];
      if (M != null) {
        k.push(M);
        continue;
      }
      var N = k[L - 1], z = D[L - 1];
      if ((N == null ? void 0 : N.element) !== (z == null ? void 0 : z.element))
        break;
      var U = r.get(j.element);
      if (!U)
        break;
      var se = {
        input: A,
        source: R,
        element: U.element
      };
      if (U.canDrop && !U.canDrop(se) || !((B = U.getIsSticky) !== null && B !== void 0 && B.call(U, se)))
        break;
      k.push(lt(lt({}, j), {}, {
        // making it clear to consumers this drop target is active due to stickiness
        isActiveDueToStickiness: !0
      }));
    }
    return xr(k);
  }
  return {
    dropTargetForConsumers: l,
    getIsOver: v,
    dispatchEvent: h
  };
}
function Id(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = Ad(e)) || t) {
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
function Ad(e, t) {
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
function as(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Td(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? as(Object(n), !0).forEach(function(r) {
      pn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : as(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Dd() {
  var e = /* @__PURE__ */ new Set(), t = null;
  function n(s) {
    t && (!s.canMonitor || s.canMonitor(t.canMonitorArgs)) && t.active.add(s);
  }
  function r(s) {
    var i = Td({}, s);
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
      var a = Id(e), c;
      try {
        for (a.s(); !(c = a.n()).done; ) {
          var u = c.value;
          n(u);
        }
      } catch (A) {
        a.e(A);
      } finally {
        a.f();
      }
    }
    if (t) {
      for (var h = Array.from(t.active), v = 0, b = h; v < b.length; v++) {
        var R = b[v];
        if (t.active.has(R)) {
          var P;
          (P = R[i]) === null || P === void 0 || P.call(R, l);
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
function Fd(e) {
  var t = e.typeKey, n = e.mount, r = e.dispatchEventToSource, o = e.onPostDispatch, s = e.defaultDropEffect, i = Dd(), l = Md({
    typeKey: t,
    defaultDropEffect: s
  });
  function a(h) {
    r == null || r(h), l.dispatchEvent(h), i.dispatchEvent(h), o == null || o(h);
  }
  function c(h) {
    var v = h.event, b = h.dragType;
    os.start({
      event: v,
      dragType: b,
      getDropTargetsOver: l.getIsOver,
      dispatchEvent: a
    });
  }
  function u() {
    function h() {
      var v = {
        canStart: os.canStart,
        start: c
      };
      return n(v);
    }
    return Od({
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
var jd = Ct(function() {
  return navigator.userAgent.toLocaleLowerCase().includes("android");
}), Hd = "pdnd:android-fallback", cs = "text/plain", kd = "text/uri-list", Kd = "application/vnd.pdnd", Hn = /* @__PURE__ */ new WeakMap();
function Ld(e) {
  return Hn.set(e.element, e), function() {
    Hn.delete(e.element);
  };
}
var us = ud(), il = Fd({
  typeKey: "element",
  defaultDropEffect: "move",
  mount: function(t) {
    return nr(us.bindEvents(), St.bind(document, {
      type: "dragstart",
      listener: function(r) {
        var o, s, i, l, a, c;
        if (t.canStart(r) && !r.defaultPrevented && r.dataTransfer) {
          var u = r.target;
          if (u instanceof HTMLElement) {
            var h = Hn.get(u);
            if (h) {
              var v = Zt(r), b = {
                element: h.element,
                dragHandle: (o = h.dragHandle) !== null && o !== void 0 ? o : null,
                input: v
              };
              if (h.canDrag && !h.canDrag(b)) {
                r.preventDefault();
                return;
              }
              if (h.dragHandle) {
                var R = nl({
                  x: v.clientX,
                  y: v.clientY
                });
                if (!h.dragHandle.contains(R)) {
                  r.preventDefault();
                  return;
                }
              }
              var P = (s = (i = h.getInitialDataForExternal) === null || i === void 0 ? void 0 : i.call(h, b)) !== null && s !== void 0 ? s : null;
              if (P)
                for (var A = 0, F = Object.entries(P); A < F.length; A++) {
                  var C = Qi(F[A], 2), D = C[0], O = C[1];
                  r.dataTransfer.setData(D, O ?? "");
                }
              jd() && !r.dataTransfer.types.includes(cs) && !r.dataTransfer.types.includes(kd) && r.dataTransfer.setData(cs, Hd), r.dataTransfer.setData(Kd, "");
              var k = {
                element: h.element,
                dragHandle: (l = h.dragHandle) !== null && l !== void 0 ? l : null,
                data: (a = (c = h.getInitialData) === null || c === void 0 ? void 0 : c.call(h, b)) !== null && a !== void 0 ? a : {}
              }, L = {
                type: "element",
                payload: k,
                startedFrom: "internal"
              };
              t.start({
                event: r,
                dragType: L
              });
            }
          }
        }
      }
    }));
  },
  dispatchEventToSource: function(t) {
    var n, r, o = t.eventName, s = t.payload;
    (n = Hn.get(s.source.element)) === null || n === void 0 || (r = n[o]) === null || r === void 0 || r.call(
      n,
      // I cannot seem to get the types right here.
      // TS doesn't seem to like that one event can need `nativeSetDragImage`
      // @ts-expect-error
      s
    );
  },
  onPostDispatch: us.getOnPostDispatch()
}), $d = il.dropTarget;
function Nd(e) {
  var t = nr(
    // making the draggable register the adapter rather than drop targets
    // this is because you *must* have a draggable element to start a drag
    // but you _might_ not have any drop targets immediately
    // (You might create drop targets async)
    il.registerUsage(),
    Ld(e),
    sl(e.element, {
      attribute: "draggable",
      value: "true"
    })
  );
  return Ct(t);
}
function Vd(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
    if (t.indexOf(r) !== -1) continue;
    n[r] = e[r];
  }
  return n;
}
function Wd(e, t) {
  if (e == null) return {};
  var n, r, o = Vd(e, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    for (r = 0; r < s.length; r++) n = s[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (o[n] = e[n]);
  }
  return o;
}
function ll(e, t) {
  var n = Object.keys(e), r = Object.keys(t);
  return n.length !== r.length ? !1 : n.every(function(o) {
    return Object.is(e[o], t[o]);
  });
}
function Bd() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ll, t = null;
  return function(n) {
    return t && e(t.value, n) || (t = {
      value: n
    }), t.value;
  };
}
var Ud = ["block"];
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
function Gd(e) {
  return {
    x: (e.right + e.left) / 2,
    y: (e.bottom + e.top) / 2
  };
}
function Rr(e) {
  var t = e.client, n = e.borderBox, r = n.height / 4;
  return t.y <= n.top + r ? "reorder-above" : t.y >= n.bottom - r ? "reorder-below" : "make-child";
}
function qd(e) {
  var t = e.element, n = e.input, r = e.currentLevel, o = e.indentPerLevel, s = e.mode, i = {
    x: n.clientX,
    y: n.clientY
  }, l = t.getBoundingClientRect();
  if (s === "standard") {
    var a = Rr({
      borderBox: l,
      client: i
    });
    return {
      type: a,
      indentPerLevel: o,
      currentLevel: r
    };
  }
  var c = Gd(l);
  if (s === "expanded") {
    var u = Rr({
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
    if (i.y < c.y)
      return {
        type: "reorder-above",
        indentPerLevel: o,
        currentLevel: r
      };
    var v = (i.x - l.left) / o, b = Math.max(Math.floor(v), 0);
    return {
      type: "reparent",
      desiredLevel: b,
      indentPerLevel: o,
      currentLevel: r
    };
  }
  return {
    type: Rr({
      borderBox: l,
      client: i
    }),
    indentPerLevel: o,
    currentLevel: r
  };
}
function al(e, t) {
  return e.type !== t.type ? !1 : e.type === "instruction-blocked" && t.type === "instruction-blocked" ? al(e.desired, t.desired) : ll(e, t);
}
var zd = Bd(al);
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
function Xd(e, t) {
  var n = t.block, r = Wd(t, Ud), o = qd(r), s = Yd({
    desired: o,
    block: n
  }), i = zd(s);
  return ds(ds({}, e), {}, pn({}, cl, i));
}
function ps(e) {
  var t;
  return (t = e[cl]) !== null && t !== void 0 ? t : null;
}
var cl = Symbol("tree-item-instruction");
const Jd = { class: "pnl-tst" }, Zd = {
  key: 0,
  class: "pnl-tst-empty"
}, Qd = ["aria-label", "aria-colcount", "aria-rowcount"], ep = {
  key: 0,
  class: "pnl-tst-head",
  role: "rowgroup"
}, tp = {
  class: "pnl-tst-hrow",
  role: "row",
  "aria-rowindex": 1
}, np = ["aria-colindex"], rp = {
  class: "pnl-tst-body",
  role: "rowgroup"
}, op = ["aria-level", "aria-posinset", "aria-setsize", "aria-rowindex", "aria-expanded", "aria-selected", "tabindex", "onClick", "onFocus"], sp = ["aria-colindex"], ip = ["onClick"], lp = {
  key: 1,
  class: "pnl-tst-twisty pnl-tst-twisty--leaf",
  "aria-hidden": "true"
}, ap = ["checked", ".indeterminate", "aria-label", "onClick"], cp = { class: "pnl-tst-value" }, up = "title", Cr = "pnl-tst-row", fp = 500, dp = {
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
      rowSelectionFeature: Nf,
      coreRowModel: $i(),
      expandedRowModel: Vf()
    }, r = le(() => (t.state.columns || []).length > 0), o = le(() => {
      const d = t.state.columns || [];
      return d.length === 0 ? [{ id: up, header: "", accessorFn: (g) => g.title }] : d.map((g) => {
        const m = g.field ?? g.id;
        return {
          id: g.id,
          header: g.header ?? g.id,
          accessorFn: (w) => w[m],
          meta: { width: g.width }
        };
      });
    }), s = /* @__PURE__ */ Vt(i(t.state.expandedKeys));
    function i(d) {
      const g = {};
      for (const m of d || []) g[m] = !0;
      return g;
    }
    function l(d) {
      return d === !0 ? [] : Object.keys(d).filter((g) => d[g]).sort();
    }
    function a(d, g) {
      return d.length !== g.length ? !1 : d.every((m, w) => m === g[w]);
    }
    const c = le(() => t.state.options.select_mode ?? "none"), u = le(() => c.value !== "none"), h = le(() => c.value === "hierarchy"), v = /* @__PURE__ */ Vt(i(t.state.selectedKeys)), b = Gf({
      features: n,
      data: le(() => t.state.source || []),
      columns: o,
      getRowId: (d) => d.key,
      getSubRows: (d) => d.children,
      // TanStack resets `expanded` whenever `data` changes. Python rewrites the
      // whole tree after every move, so leaving that on would collapse the tree on
      // each drop and push an empty `expanded_keys` back. Expansion is owned here.
      autoResetExpanded: !1,
      enableRowSelection: u,
      enableMultiRowSelection: le(() => c.value !== "single"),
      enableSubRowSelection: h,
      state: le(() => ({ expanded: s.value, rowSelection: v.value })),
      onExpandedChange: (d) => {
        s.value = typeof d == "function" ? d(s.value) : d, t.setExpandedKeys(l(s.value));
      },
      onRowSelectionChange: (d) => {
        v.value = typeof d == "function" ? d(v.value) : d, t.setSelectedKeys(l(v.value));
      }
    });
    Ve(
      () => t.state.expandedKeys,
      (d) => {
        a(l(s.value), [...d || []].sort()) || (s.value = i(d));
      }
    ), Ve(
      () => t.state.selectedKeys,
      (d) => {
        a(l(v.value), [...d || []].sort()) || (v.value = i(d));
      }
    ), Ve(
      () => [t.state.options.expand_all, t.state.source],
      ([d]) => {
        d && b.toggleAllRowsExpanded(!0);
      },
      { immediate: !0 }
    );
    const R = le(() => b.getRowModel().rows), P = le(() => {
      var d;
      return ((d = b.getHeaderGroups()[0]) == null ? void 0 : d.headers) ?? [];
    }), A = le(() => t.state.options.indent_px ?? 16), F = le(() => t.state.options.aria_label ?? "Tree table"), C = le(() => r.value ? 2 : 1), D = le(() => R.value.length + (r.value ? 1 : 0));
    function O(d) {
      const g = d.getParentRow();
      return g ? g.subRows.length : b.getCoreRowModel().rows.length;
    }
    function k(d) {
      var m;
      const g = (m = d.meta) == null ? void 0 : m.width;
      return g ? { flex: `0 0 ${g}px` } : { flex: "1 1 0" };
    }
    function L(d, g) {
      return { ...k(g), paddingInlineStart: `${d.depth * A.value}px` };
    }
    const B = /* @__PURE__ */ Vt(null), j = /* @__PURE__ */ new Map();
    function M(d, g) {
      g ? j.set(d, g) : j.delete(d);
    }
    const N = le(() => {
      const d = R.value;
      return d.length === 0 ? null : d.some((g) => g.id === B.value) ? B.value : d[0].id;
    });
    function z(d) {
      d != null && (B.value = d, Ns(() => {
        var g;
        return (g = j.get(d)) == null ? void 0 : g.focus();
      }));
    }
    function U(d) {
      const g = R.value;
      g.length !== 0 && z(g[Math.max(0, Math.min(d, g.length - 1))].id);
    }
    function se(d) {
      const g = R.value;
      if (g.length === 0) return;
      const m = Math.max(
        0,
        g.findIndex((S) => S.id === N.value)
      ), w = g[m];
      switch (d.key) {
        case "ArrowDown":
          d.preventDefault(), U(m + 1);
          break;
        case "ArrowUp":
          d.preventDefault(), U(m - 1);
          break;
        case "ArrowRight":
          if (d.preventDefault(), !w.getCanExpand()) break;
          w.getIsExpanded() ? U(m + 1) : (w.toggleExpanded(!0), z(w.id));
          break;
        case "ArrowLeft":
          d.preventDefault(), w.getCanExpand() && w.getIsExpanded() ? (w.toggleExpanded(!1), z(w.id)) : w.parentId && z(w.parentId);
          break;
        case "Home":
          d.preventDefault(), U(0);
          break;
        case "End":
          d.preventDefault(), U(g.length - 1);
          break;
        case "Enter":
          d.preventDefault(), t.emitEvent("activate", { key: w.id });
          break;
        case " ":
          if (!u.value) break;
          d.preventDefault(), W(w);
          break;
      }
    }
    function be(d) {
      B.value = d.id, t.emitEvent("activate", { key: d.id });
    }
    function we(d) {
      B.value = d.id, d.toggleExpanded();
    }
    function te(d) {
      return !d.getIsSelected() && d.getIsSomeSelected();
    }
    function W(d) {
      B.value = d.id, d.toggleSelected(void 0, {
        selectChildren: h.value,
        deselectParents: h.value
      });
    }
    function Y(d) {
      W(d), z(d.id);
    }
    const Be = ["reorder-above", "reorder-below", "make-child", "reparent"], ot = le(() => t.state.options.enable_dnd === !0), Oe = /* @__PURE__ */ Vt(null), ae = /* @__PURE__ */ Vt(null);
    function Pt(d) {
      return R.value.find((g) => g.id === d) ?? null;
    }
    function or(d, g) {
      let m = d;
      for (; m; ) {
        if (m.id === g) return !0;
        m = m.getParentRow();
      }
      return !1;
    }
    function sr(d) {
      if (d.getCanExpand() && d.getIsExpanded()) return "expanded";
      const g = d.getParentRow(), m = g ? g.subRows : b.getCoreRowModel().rows;
      return d.index === m.length - 1 ? "last-in-group" : "standard";
    }
    let Ue = null, Te = null;
    function st() {
      Te && clearTimeout(Te), Te = null, Ue = null;
    }
    function gn(d, g) {
      if (Ue === d || (st(), !g || g.type === "instruction-blocked")) return;
      const m = Pt(d);
      !m || !m.getCanExpand() || m.getIsExpanded() || (Ue = d, Te = setTimeout(() => {
        Te = null;
        const w = Pt(d);
        w && w.getCanExpand() && !w.getIsExpanded() && w.toggleExpanded(!0);
      }, fp));
    }
    function it() {
      ae.value = null, st();
    }
    const uo = {
      mounted(d, g) {
        d.__tstKey = g.value, d.__tstCleanup = nr(
          Nd({
            element: d,
            canDrag: () => ot.value,
            getInitialData: () => ({ type: Cr, key: d.__tstKey }),
            onDragStart: () => {
              Oe.value = d.__tstKey;
            },
            onDrop: () => {
              Oe.value = null, it();
            }
          }),
          $d({
            element: d,
            canDrop: ({ source: m }) => ot.value && m.data.type === Cr,
            getIsSticky: () => !0,
            getData: ({ input: m, element: w, source: S }) => {
              const _ = { type: Cr, key: d.__tstKey }, I = Pt(d.__tstKey);
              if (!I) return _;
              const E = or(I, S.data.key);
              return Xd(_, {
                element: w,
                input: m,
                currentLevel: I.depth,
                indentPerLevel: A.value,
                mode: sr(I),
                block: E ? Be : []
              });
            },
            onDrag: ({ self: m }) => {
              const w = ps(m.data);
              ae.value = w ? { key: d.__tstKey, instruction: w } : null, gn(d.__tstKey, w);
            },
            onDragLeave: () => {
              var m;
              ((m = ae.value) == null ? void 0 : m.key) === d.__tstKey && (ae.value = null), st();
            },
            onDrop: ({ self: m, source: w }) => {
              it();
              const S = ps(m.data);
              !S || S.type === "instruction-blocked" || d.__tstKey !== w.data.key && t.emitEvent("move", {
                key: w.data.key,
                targetKey: d.__tstKey,
                instruction: S.type,
                desiredLevel: S.desiredLevel ?? S.currentLevel
              });
            }
          })
        );
      },
      updated(d, g) {
        d.__tstKey = g.value;
      },
      unmounted(d) {
        var g;
        (g = d.__tstCleanup) == null || g.call(d), delete d.__tstCleanup, delete d.__tstKey;
      }
    };
    Js(st);
    function f(d) {
      var g;
      return ((g = ae.value) == null ? void 0 : g.key) === d.id ? ae.value.instruction : null;
    }
    function p(d) {
      const g = f(d);
      return {
        "pnl-tst-row--draggable": ot.value,
        "pnl-tst-row--dragging": Oe.value === d.id,
        "pnl-tst-row--blocked": (g == null ? void 0 : g.type) === "instruction-blocked",
        "pnl-tst-row--child-target": (g == null ? void 0 : g.type) === "make-child"
      };
    }
    function y(d) {
      const g = f(d);
      return g ? g.type === "reorder-above" ? "pnl-tst-dropline--above" : g.type === "reorder-below" || g.type === "reparent" ? "pnl-tst-dropline--below" : null : null;
    }
    function x(d) {
      const g = f(d);
      return g ? { insetInlineStart: `${(g.type === "reparent" ? g.desiredLevel : g.currentLevel) * g.indentPerLevel}px` } : null;
    }
    return (d, g) => (fe(), he("div", Jd, [
      R.value.length === 0 ? (fe(), he("div", Zd, "No data")) : (fe(), he("div", {
        key: 1,
        class: "pnl-tst-grid",
        role: "treegrid",
        "aria-label": F.value,
        "aria-colcount": P.value.length,
        "aria-rowcount": D.value,
        onKeydown: se
      }, [
        r.value ? (fe(), he("div", ep, [
          gt("div", tp, [
            (fe(!0), he(xe, null, pr(P.value, (m, w) => (fe(), he("div", {
              key: m.id,
              class: "pnl-tst-hcell",
              role: "columnheader",
              "aria-colindex": w + 1,
              style: At(k(m.column.columnDef))
            }, Pr(m.column.columnDef.header), 13, np))), 128))
          ])
        ])) : vn("", !0),
        gt("div", rp, [
          (fe(!0), he(xe, null, pr(R.value, (m, w) => ea((fe(), he("div", {
            key: m.id,
            ref_for: !0,
            ref: (S) => M(m.id, S),
            class: ht(["pnl-tst-row", p(m)]),
            role: "row",
            "aria-level": m.depth + 1,
            "aria-posinset": m.index + 1,
            "aria-setsize": O(m),
            "aria-rowindex": w + C.value,
            "aria-expanded": m.getCanExpand() ? m.getIsExpanded() : void 0,
            "aria-selected": u.value ? m.getIsSelected() : void 0,
            tabindex: m.id === N.value ? 0 : -1,
            onClick: (S) => be(m),
            onFocus: (S) => B.value = m.id
          }, [
            y(m) ? (fe(), he("span", {
              key: 0,
              class: ht(["pnl-tst-dropline", y(m)]),
              style: At(x(m)),
              "aria-hidden": "true"
            }, null, 6)) : vn("", !0),
            (fe(!0), he(xe, null, pr(m.getAllCells(), (S, _) => (fe(), he("div", {
              key: S.id,
              class: ht(["pnl-tst-cell", { "pnl-tst-cell--tree": _ === 0 }]),
              role: "gridcell",
              "aria-colindex": _ + 1,
              style: At(
                _ === 0 ? L(m, S.column.columnDef) : k(S.column.columnDef)
              )
            }, [
              _ === 0 ? (fe(), he(xe, { key: 0 }, [
                m.getCanExpand() ? (fe(), he("span", {
                  key: 0,
                  class: ht(["pnl-tst-twisty", { "pnl-tst-twisty--open": m.getIsExpanded() }]),
                  "aria-hidden": "true",
                  onClick: Wo((I) => we(m), ["stop"])
                }, [...g[0] || (g[0] = [
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
                ])], 10, ip)) : (fe(), he("span", lp)),
                u.value ? (fe(), he("input", {
                  key: 2,
                  class: "pnl-tst-check",
                  type: "checkbox",
                  tabindex: "-1",
                  checked: m.getIsSelected(),
                  ".indeterminate": te(m),
                  "aria-label": `Select ${m.original.title ?? m.id}`,
                  onClick: Wo((I) => Y(m), ["stop"])
                }, null, 40, ap)) : vn("", !0)
              ], 64)) : vn("", !0),
              gt("span", cp, Pr(S.getValue()), 1)
            ], 14, sp))), 128))
          ], 42, op)), [
            [uo, m.id]
          ])), 128))
        ])
      ], 40, Qd))
    ]));
  }
};
function pp({ model: e, el: t }) {
  t.style.display = "block", t.style.width = "100%";
  const n = document.createElement("div");
  n.className = "pnl-tst-root", t.append(n);
  const r = /* @__PURE__ */ Wn({
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
  }, s = (u, h) => u.length === h.length && u.every((v, b) => v === h[b]), i = (u) => (h) => {
    const v = [...e.get(u) || []].sort();
    s(v, h) || (e.set(u, h), e.save_changes());
  }, l = i("expanded_keys"), a = i("selected_keys"), c = Dc(dp, { state: r, emitEvent: o, setExpandedKeys: l, setSelectedKeys: a });
  return c.mount(n), e.on("change:source", () => {
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
    c.unmount();
  };
}
export {
  pp as render
};

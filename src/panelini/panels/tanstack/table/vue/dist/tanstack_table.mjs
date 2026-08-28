/**
* @vue/shared v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function ls(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const q = {}, mt = [], He = () => {
}, uo = () => !1, mn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), _n = (e) => e.startsWith("onUpdate:"), se = Object.assign, cs = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Lr = Object.prototype.hasOwnProperty, $ = (e, t) => Lr.call(e, t), D = Array.isArray, et = (e) => Ut(e) === "[object Map]", ln = (e) => Ut(e) === "[object Set]", Ps = (e) => Ut(e) === "[object Date]", j = (e) => typeof e == "function", Y = (e) => typeof e == "string", Ve = (e) => typeof e == "symbol", k = (e) => e !== null && typeof e == "object", fo = (e) => (k(e) || j(e)) && j(e.then) && j(e.catch), ao = Object.prototype.toString, Ut = (e) => ao.call(e), $r = (e) => Ut(e).slice(8, -1), po = (e) => Ut(e) === "[object Object]", us = (e) => Y(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, It = /* @__PURE__ */ ls(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), yn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Kr = /-\w/g, xe = yn(
  (e) => e.replace(Kr, (t) => t.slice(1).toUpperCase())
), Nr = /\B([A-Z])/g, dt = yn(
  (e) => e.replace(Nr, "-$1").toLowerCase()
), ho = yn((e) => e.charAt(0).toUpperCase() + e.slice(1)), Fn = yn(
  (e) => e ? `on${ho(e)}` : ""
), Fe = (e, t) => !Object.is(e, t), Dn = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, go = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
}, kr = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Os;
const wn = () => Os || (Os = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function jt(e) {
  if (D(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], o = Y(s) ? Gr(s) : jt(s);
      if (o)
        for (const r in o)
          t[r] = o[r];
    }
    return t;
  } else if (Y(e) || k(e))
    return e;
}
const Wr = /;(?![^(]*\))/g, Ur = /:([^]+)/, Br = /\/\*[^]*?\*\//g;
function Gr(e) {
  const t = {};
  return e.replace(Br, "").split(Wr).forEach((n) => {
    if (n) {
      const s = n.split(Ur);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function Vt(e) {
  let t = "";
  if (Y(e))
    t = e;
  else if (D(e))
    for (let n = 0; n < e.length; n++) {
      const s = Vt(e[n]);
      s && (t += s + " ");
    }
  else if (k(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const qr = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", zr = /* @__PURE__ */ ls(qr);
function mo(e) {
  return !!e || e === "";
}
function Jr(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let s = 0; n && s < e.length; s++)
    n = xn(e[s], t[s]);
  return n;
}
function Is(e, t) {
  if (e.size !== t.size) return !1;
  const n = Array.from(t), s = new Uint8Array(n.length);
  for (const o of e) {
    let r = -1;
    for (let i = 0; i < n.length; i++)
      if (!s[i] && xn(o, n[i])) {
        r = i;
        break;
      }
    if (r < 0) return !1;
    s[r] = 1;
  }
  return !0;
}
function xn(e, t) {
  if (e === t) return !0;
  let n = Ps(e), s = Ps(t);
  if (n || s)
    return n && s ? e.getTime() === t.getTime() : !1;
  if (n = Ve(e), s = Ve(t), n || s)
    return e === t;
  if (n = D(e), s = D(t), n || s)
    return n && s ? Jr(e, t) : !1;
  if (n = k(e), s = k(t), n || s) {
    if (!n || !s)
      return !1;
    if (n = et(e), s = et(t), n || s || (n = ln(e), s = ln(t), n || s))
      return n && s ? Is(e, t) : !1;
    const o = Object.keys(e).length, r = Object.keys(t).length;
    if (o !== r)
      return !1;
    for (const i in e) {
      const l = e.hasOwnProperty(i), c = t.hasOwnProperty(i);
      if (l && !c || !l && c || !xn(e[i], t[i]))
        return !1;
    }
  }
  return String(e) === String(t);
}
const _o = (e) => !!(e && e.__v_isRef === !0), qn = (e) => Y(e) ? e : e == null ? "" : D(e) || k(e) && (e.toString === ao || !j(e.toString)) ? _o(e) ? qn(e.value) : JSON.stringify(e, yo, 2) : String(e), yo = (e, t) => _o(t) ? yo(e, t.value) : et(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, o], r) => (n[Hn(s, r) + " =>"] = o, n),
    {}
  )
} : ln(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Hn(n))
} : Ve(t) ? Hn(t) : k(t) && !D(t) && !po(t) ? String(t) : t, Hn = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Ve(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Q;
class Yr {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && Q && (Q.active ? (this.parent = Q, this.index = (Q.scopes || (Q.scopes = [])).push(
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
        const s = this.scopes.slice();
        for (t = 0, n = s.length; t < n; t++)
          s[t].pause();
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
      const s = this.effects.slice();
      for (t = 0, n = s.length; t < n; t++)
        s[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = Q;
      try {
        return Q = this, t();
      } finally {
        Q = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Q, Q = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (Q === this)
        Q = this.prevScope;
      else {
        let t = Q;
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
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++)
        this.effects[n].stop();
      for (this.effects.length = 0, n = 0, s = this.cleanups.length; n < s; n++)
        this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        const o = this.scopes.slice();
        for (n = 0, s = o.length; n < s; n++)
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
function wo() {
  return Q;
}
function Xr(e, t = !1) {
  Q && Q.cleanups.push(e);
}
let G;
const jn = /* @__PURE__ */ new WeakSet();
class xo {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Q && (Q.active ? Q.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, jn.has(this) && (jn.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ro(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, As(this), Co(this);
    const t = G, n = be;
    G = this, be = !0;
    try {
      return this.fn();
    } finally {
      vo(this), G = t, be = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        ds(t);
      this.deps = this.depsTail = void 0, As(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? jn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    zn(this) && this.run();
  }
  get dirty() {
    return zn(this);
  }
}
let bo = 0, At, Tt;
function Ro(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Tt, Tt = e;
    return;
  }
  e.next = At, At = e;
}
function fs() {
  bo++;
}
function as() {
  if (--bo > 0)
    return;
  if (Tt) {
    let t = Tt;
    for (Tt = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; At; ) {
    let t = At;
    for (At = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (s) {
          e || (e = s);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function Co(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function vo(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const o = s.prevDep;
    s.version === -1 ? (s === n && (n = o), ds(s), Zr(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = o;
  }
  e.deps = t, e.depsTail = n;
}
function zn(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (So(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function So(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Lt) || (e.globalVersion = Lt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !zn(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = G, s = be;
  G = e, be = !0;
  try {
    Co(e);
    const o = e.fn(e._value);
    (t.version === 0 || Fe(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    G = n, be = s, vo(e), e.flags &= -3;
  }
}
function ds(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: o } = e;
  if (s && (s.nextSub = o, e.prevSub = void 0), o && (o.prevSub = s, e.nextSub = void 0), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let r = n.computed.deps; r; r = r.nextDep)
      ds(r, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Zr(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let be = !0;
const Mo = [];
function Ge() {
  Mo.push(be), be = !1;
}
function qe() {
  const e = Mo.pop();
  be = e === void 0 ? !0 : e;
}
function As(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = G;
    G = void 0;
    try {
      t();
    } finally {
      G = n;
    }
  }
}
let Lt = 0;
class Qr {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class ps {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!G || !be || G === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== G)
      n = this.activeLink = new Qr(G, this), G.deps ? (n.prevDep = G.depsTail, G.depsTail.nextDep = n, G.depsTail = n) : G.deps = G.depsTail = n, Eo(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = G.depsTail, n.nextDep = void 0, G.depsTail.nextDep = n, G.depsTail = n, G.deps === n && (G.deps = s);
    }
    return n;
  }
  trigger(t) {
    this.version++, Lt++, this.notify(t);
  }
  notify(t) {
    fs();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      as();
    }
  }
}
function Eo(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        Eo(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const Jn = /* @__PURE__ */ new WeakMap(), it = /* @__PURE__ */ Symbol(
  ""
), Yn = /* @__PURE__ */ Symbol(
  ""
), $t = /* @__PURE__ */ Symbol(
  ""
);
function te(e, t, n) {
  if (be && G) {
    let s = Jn.get(e);
    s || Jn.set(e, s = /* @__PURE__ */ new Map());
    let o = s.get(n);
    o || (s.set(n, o = new ps()), o.map = s, o.key = n), o.track();
  }
}
function We(e, t, n, s, o, r) {
  const i = Jn.get(e);
  if (!i) {
    Lt++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if (fs(), t === "clear")
    i.forEach(l);
  else {
    const c = D(e), a = c && us(n);
    if (c && n === "length") {
      const f = Number(s);
      i.forEach((p, w) => {
        (w === "length" || w === $t || !Ve(w) && w >= f) && l(p);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && l(i.get(n)), a && l(i.get($t)), t) {
        case "add":
          c ? a && l(i.get("length")) : (l(i.get(it)), et(e) && l(i.get(Yn)));
          break;
        case "delete":
          c || (l(i.get(it)), et(e) && l(i.get(Yn)));
          break;
        case "set":
          et(e) && l(i.get(it));
          break;
      }
  }
  as();
}
function pt(e) {
  const t = /* @__PURE__ */ L(e);
  return t === e ? t : (te(t, "iterate", $t), /* @__PURE__ */ ye(e) ? t : t.map(Re));
}
function bn(e) {
  return te(e = /* @__PURE__ */ L(e), "iterate", $t), e;
}
function Ae(e, t) {
  return /* @__PURE__ */ ze(e) ? xt(/* @__PURE__ */ lt(e) ? Re(t) : t) : Re(t);
}
const ei = {
  __proto__: null,
  [Symbol.iterator]() {
    return Vn(this, Symbol.iterator, (e) => Ae(this, e));
  },
  concat(...e) {
    return pt(this).concat(
      ...e.map((t) => D(t) ? pt(t) : t)
    );
  },
  entries() {
    return Vn(this, "entries", (e) => (e[1] = Ae(this, e[1]), e));
  },
  every(e, t) {
    return $e(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return $e(
      this,
      "filter",
      e,
      t,
      (n) => n.map((s) => Ae(this, s)),
      arguments
    );
  },
  find(e, t) {
    return $e(
      this,
      "find",
      e,
      t,
      (n) => Ae(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return $e(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return $e(
      this,
      "findLast",
      e,
      t,
      (n) => Ae(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return $e(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return $e(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Ln(this, "includes", e);
  },
  indexOf(...e) {
    return Ln(this, "indexOf", e);
  },
  join(e) {
    return pt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Ln(this, "lastIndexOf", e);
  },
  map(e, t) {
    return $e(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Mt(this, "pop");
  },
  push(...e) {
    return Mt(this, "push", e);
  },
  reduce(e, ...t) {
    return Ts(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Ts(this, "reduceRight", e, t);
  },
  shift() {
    return Mt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return $e(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Mt(this, "splice", e);
  },
  toReversed() {
    return pt(this).toReversed();
  },
  toSorted(e) {
    return pt(this).toSorted(e);
  },
  toSpliced(...e) {
    return pt(this).toSpliced(...e);
  },
  unshift(...e) {
    return Mt(this, "unshift", e);
  },
  values() {
    return Vn(this, "values", (e) => Ae(this, e));
  }
};
function Vn(e, t, n) {
  const s = bn(e), o = s[t]();
  return s !== e && !/* @__PURE__ */ ye(e) && (o._next = o.next, o.next = () => {
    const r = o._next();
    return r.done || (r.value = n(r.value)), r;
  }), o;
}
const ti = Array.prototype;
function $e(e, t, n, s, o, r) {
  const i = bn(e), l = i !== e && !/* @__PURE__ */ ye(e), c = i[t];
  if (c !== ti[t]) {
    const p = c.apply(e, r);
    return l ? Re(p) : p;
  }
  let a = n;
  i !== e && (l ? a = function(p, w) {
    return n.call(this, Ae(e, p), w, e);
  } : n.length > 2 && (a = function(p, w) {
    return n.call(this, p, w, e);
  }));
  const f = c.call(i, a, s);
  return l && o ? o(f) : f;
}
function Ts(e, t, n, s) {
  const o = bn(e), r = o !== e && !/* @__PURE__ */ ye(e);
  let i = n, l = !1;
  o !== e && (r ? (l = s.length === 0, i = function(a, f, p) {
    return l && (l = !1, a = Ae(e, a)), n.call(this, a, Ae(e, f), p, e);
  }) : n.length > 3 && (i = function(a, f, p) {
    return n.call(this, a, f, p, e);
  }));
  const c = o[t](i, ...s);
  return l ? Ae(e, c) : c;
}
function Ln(e, t, n) {
  const s = /* @__PURE__ */ L(e);
  te(s, "iterate", $t);
  const o = s[t](...n);
  return (o === -1 || o === !1) && /* @__PURE__ */ ms(n[0]) ? (n[0] = /* @__PURE__ */ L(n[0]), s[t](...n)) : o;
}
function Mt(e, t, n = []) {
  Ge(), fs();
  const s = (/* @__PURE__ */ L(e))[t].apply(e, n);
  return as(), qe(), s;
}
const ni = /* @__PURE__ */ ls("__proto__,__v_isRef,__isVue"), Po = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Ve)
);
function si(e) {
  Ve(e) || (e = String(e));
  const t = /* @__PURE__ */ L(this);
  return te(t, "has", e), t.hasOwnProperty(e);
}
class Oo {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, s) {
    if (n === "__v_skip") return t.__v_skip;
    const o = this._isReadonly, r = this._isShallow;
    if (n === "__v_isReactive")
      return !o;
    if (n === "__v_isReadonly")
      return o;
    if (n === "__v_isShallow")
      return r;
    if (n === "__v_raw")
      return s === (o ? r ? pi : Fo : r ? To : Ao).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const i = D(t);
    if (!o) {
      let c;
      if (i && (c = ei[n]))
        return c;
      if (n === "hasOwnProperty")
        return si;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ ne(t) ? t : s
    );
    if ((Ve(n) ? Po.has(n) : ni(n)) || (o || te(t, "get", n), r))
      return l;
    if (/* @__PURE__ */ ne(l)) {
      const c = i && us(n) ? l : l.value;
      return o && k(c) ? /* @__PURE__ */ Zn(c) : c;
    }
    return k(l) ? o ? /* @__PURE__ */ Zn(l) : /* @__PURE__ */ Rn(l) : l;
  }
}
class Io extends Oo {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, o) {
    let r = t[n];
    const i = D(t) && us(n);
    if (!this._isShallow) {
      const a = /* @__PURE__ */ ze(r);
      if (!/* @__PURE__ */ ye(s) && !/* @__PURE__ */ ze(s) && (r = /* @__PURE__ */ L(r), s = /* @__PURE__ */ L(s)), !i && /* @__PURE__ */ ne(r) && !/* @__PURE__ */ ne(s))
        return a || (r.value = s), !0;
    }
    const l = i ? Number(n) < t.length : $(t, n), c = Reflect.set(
      t,
      n,
      s,
      /* @__PURE__ */ ne(t) ? t : o
    );
    return t === /* @__PURE__ */ L(o) && c && (l ? Fe(s, r) && We(t, "set", n, s) : We(t, "add", n, s)), c;
  }
  deleteProperty(t, n) {
    const s = $(t, n);
    t[n];
    const o = Reflect.deleteProperty(t, n);
    return o && s && We(t, "delete", n, void 0), o;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!Ve(n) || !Po.has(n)) && te(t, "has", n), s;
  }
  ownKeys(t) {
    return te(
      t,
      "iterate",
      D(t) ? "length" : it
    ), Reflect.ownKeys(t);
  }
}
class oi extends Oo {
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
const ri = /* @__PURE__ */ new Io(), ii = /* @__PURE__ */ new oi(), li = /* @__PURE__ */ new Io(!0);
const Xn = (e) => e, Xt = (e) => Reflect.getPrototypeOf(e);
function ci(e, t, n) {
  return function(...s) {
    const o = this.__v_raw, r = /* @__PURE__ */ L(o), i = et(r), l = e === "entries" || e === Symbol.iterator && i, c = e === "keys" && i, a = o[e](...s), f = n ? Xn : t ? xt : Re;
    return !t && te(
      r,
      "iterate",
      c ? Yn : it
    ), se(
      // inheriting all iterator properties
      Object.create(a),
      {
        // iterator protocol
        next() {
          const { value: p, done: w } = a.next();
          return w ? { value: p, done: w } : {
            value: l ? [f(p[0]), f(p[1])] : f(p),
            done: w
          };
        }
      }
    );
  };
}
function Zt(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function ui(e, t) {
  const n = {
    get(o) {
      const r = this.__v_raw, i = /* @__PURE__ */ L(r), l = /* @__PURE__ */ L(o);
      e || (Fe(o, l) && te(i, "get", o), te(i, "get", l));
      const { has: c } = Xt(i), a = t ? Xn : e ? xt : Re;
      if (c.call(i, o))
        return a(r.get(o));
      if (c.call(i, l))
        return a(r.get(l));
      r !== i && r.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && te(/* @__PURE__ */ L(o), "iterate", it), o.size;
    },
    has(o) {
      const r = this.__v_raw, i = /* @__PURE__ */ L(r), l = /* @__PURE__ */ L(o);
      return e || (Fe(o, l) && te(i, "has", o), te(i, "has", l)), o === l ? r.has(o) : r.has(o) || r.has(l);
    },
    forEach(o, r) {
      const i = this, l = i.__v_raw, c = /* @__PURE__ */ L(l), a = t ? Xn : e ? xt : Re;
      return !e && te(c, "iterate", it), l.forEach((f, p) => o.call(r, a(f), a(p), i));
    }
  };
  return se(
    n,
    e ? {
      add: Zt("add"),
      set: Zt("set"),
      delete: Zt("delete"),
      clear: Zt("clear")
    } : {
      add(o) {
        const r = /* @__PURE__ */ L(this), i = Xt(r), l = /* @__PURE__ */ L(o), c = !t && !/* @__PURE__ */ ye(o) && !/* @__PURE__ */ ze(o) ? l : o;
        return i.has.call(r, c) || Fe(o, c) && i.has.call(r, o) || Fe(l, c) && i.has.call(r, l) || (r.add(c), We(r, "add", c, c)), this;
      },
      set(o, r) {
        !t && !/* @__PURE__ */ ye(r) && !/* @__PURE__ */ ze(r) && (r = /* @__PURE__ */ L(r));
        const i = /* @__PURE__ */ L(this), { has: l, get: c } = Xt(i);
        let a = l.call(i, o);
        a || (o = /* @__PURE__ */ L(o), a = l.call(i, o));
        const f = c.call(i, o);
        return i.set(o, r), a ? Fe(r, f) && We(i, "set", o, r) : We(i, "add", o, r), this;
      },
      delete(o) {
        const r = /* @__PURE__ */ L(this), { has: i, get: l } = Xt(r);
        let c = i.call(r, o);
        c || (o = /* @__PURE__ */ L(o), c = i.call(r, o)), l && l.call(r, o);
        const a = r.delete(o);
        return c && We(r, "delete", o, void 0), a;
      },
      clear() {
        const o = /* @__PURE__ */ L(this), r = o.size !== 0, i = o.clear();
        return r && We(
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
    n[o] = ci(o, e, t);
  }), n;
}
function hs(e, t) {
  const n = ui(e, t);
  return (s, o, r) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? s : Reflect.get(
    $(n, o) && o in s ? n : s,
    o,
    r
  );
}
const fi = {
  get: /* @__PURE__ */ hs(!1, !1)
}, ai = {
  get: /* @__PURE__ */ hs(!1, !0)
}, di = {
  get: /* @__PURE__ */ hs(!0, !1)
};
const Ao = /* @__PURE__ */ new WeakMap(), To = /* @__PURE__ */ new WeakMap(), Fo = /* @__PURE__ */ new WeakMap(), pi = /* @__PURE__ */ new WeakMap();
function hi(e) {
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
function Rn(e) {
  return /* @__PURE__ */ ze(e) ? e : gs(
    e,
    !1,
    ri,
    fi,
    Ao
  );
}
// @__NO_SIDE_EFFECTS__
function gi(e) {
  return gs(
    e,
    !1,
    li,
    ai,
    To
  );
}
// @__NO_SIDE_EFFECTS__
function Zn(e) {
  return gs(
    e,
    !0,
    ii,
    di,
    Fo
  );
}
function gs(e, t, n, s, o) {
  if (!k(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const r = o.get(e);
  if (r)
    return r;
  const i = hi($r(e));
  if (i === 0)
    return e;
  const l = new Proxy(
    e,
    i === 2 ? s : n
  );
  return o.set(e, l), l;
}
// @__NO_SIDE_EFFECTS__
function lt(e) {
  return /* @__PURE__ */ ze(e) ? /* @__PURE__ */ lt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function ze(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function ye(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function ms(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function L(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ L(t) : e;
}
function mi(e) {
  return !$(e, "__v_skip") && Object.isExtensible(e) && go(e, "__v_skip", !0), e;
}
const Re = (e) => k(e) ? /* @__PURE__ */ Rn(e) : e, xt = (e) => k(e) ? /* @__PURE__ */ Zn(e) : e;
// @__NO_SIDE_EFFECTS__
function ne(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function _i(e) {
  return Do(e, !1);
}
// @__NO_SIDE_EFFECTS__
function yi(e) {
  return Do(e, !0);
}
function Do(e, t) {
  return /* @__PURE__ */ ne(e) ? e : new wi(e, t);
}
class wi {
  constructor(t, n) {
    this.dep = new ps(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ L(t), this._value = n ? t : Re(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || /* @__PURE__ */ ye(t) || /* @__PURE__ */ ze(t);
    t = s ? t : /* @__PURE__ */ L(t), Fe(t, n) && (this._rawValue = t, this._value = s ? t : Re(t), this.dep.trigger());
  }
}
function _t(e) {
  return /* @__PURE__ */ ne(e) ? e.value : e;
}
const xi = {
  get: (e, t, n) => t === "__v_raw" ? e : _t(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const o = e[t];
    return /* @__PURE__ */ ne(o) && !/* @__PURE__ */ ne(n) ? (o.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function Ho(e) {
  return /* @__PURE__ */ lt(e) ? e : new Proxy(e, xi);
}
class bi {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new ps(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Lt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    G !== this)
      return Ro(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return So(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function Ri(e, t, n = !1) {
  let s, o;
  return j(e) ? s = e : (s = e.get, o = e.set), new bi(s, o, n);
}
const Qt = {}, cn = /* @__PURE__ */ new WeakMap();
let rt;
function Ci(e, t = !1, n = rt) {
  if (n) {
    let s = cn.get(n);
    s || cn.set(n, s = []), s.push(e);
  }
}
function vi(e, t, n = q) {
  const { immediate: s, deep: o, once: r, scheduler: i, augmentJob: l, call: c } = n, a = (M) => o ? M : /* @__PURE__ */ ye(M) || o === !1 || o === 0 ? Qe(M, 1) : Qe(M);
  let f, p, w, S, H = !1, I = !1;
  if (/* @__PURE__ */ ne(e) ? (p = () => e.value, H = /* @__PURE__ */ ye(e)) : /* @__PURE__ */ lt(e) ? (p = () => a(e), H = !0) : D(e) ? (I = !0, H = e.some((M) => /* @__PURE__ */ lt(M) || /* @__PURE__ */ ye(M)), p = () => e.map((M) => {
    if (/* @__PURE__ */ ne(M))
      return M.value;
    if (/* @__PURE__ */ lt(M))
      return a(M);
    if (j(M))
      return c ? c(M, 2) : M();
  })) : j(e) ? t ? p = c ? () => c(e, 2) : e : p = () => {
    if (w) {
      Ge();
      try {
        w();
      } finally {
        qe();
      }
    }
    const M = rt;
    rt = f;
    try {
      return c ? c(e, 3, [S]) : e(S);
    } finally {
      rt = M;
    }
  } : p = He, t && o) {
    const M = p, K = o === !0 ? 1 / 0 : o;
    p = () => Qe(M(), K);
  }
  const z = wo(), E = () => {
    f.stop(), z && z.active && cs(z.effects, f);
  };
  if (r && t) {
    const M = t;
    t = (...K) => {
      const ce = M(...K);
      return E(), ce;
    };
  }
  let x = I ? new Array(e.length).fill(Qt) : Qt;
  const P = (M) => {
    if (!(!(f.flags & 1) || !f.dirty && !M))
      if (t) {
        const K = f.run();
        if (M || o || H || (I ? K.some((ce, ae) => Fe(ce, x[ae])) : Fe(K, x))) {
          w && w();
          const ce = rt;
          rt = f;
          try {
            const ae = [
              K,
              // pass undefined as the old value when it's changed for the first time
              x === Qt ? void 0 : I && x[0] === Qt ? [] : x,
              S
            ];
            x = K, c ? c(t, 3, ae) : (
              // @ts-expect-error
              t(...ae)
            );
          } finally {
            rt = ce;
          }
        }
      } else
        f.run();
  };
  return l && l(P), f = new xo(p), f.scheduler = i ? () => i(P, !1) : P, S = (M) => Ci(M, !1, f), w = f.onStop = () => {
    const M = cn.get(f);
    if (M) {
      if (c)
        c(M, 4);
      else
        for (const K of M) K();
      cn.delete(f);
    }
  }, t ? s ? P(!0) : x = f.run() : i ? i(P.bind(null, !0), !0) : f.run(), E.pause = f.pause.bind(f), E.resume = f.resume.bind(f), E.stop = E, E;
}
function Qe(e, t = 1 / 0, n) {
  if (t <= 0 || !k(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ ne(e))
    Qe(e.value, t, n);
  else if (D(e))
    for (let s = 0; s < e.length; s++)
      Qe(e[s], t, n);
  else if (ln(e) || et(e))
    e.forEach((s) => {
      Qe(s, t, n);
    });
  else if (po(e)) {
    for (const s in e)
      Qe(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && Qe(e[s], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Bt(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (o) {
    Cn(o, t, n);
  }
}
function Ce(e, t, n, s) {
  if (j(e)) {
    const o = Bt(e, t, n, s);
    return o && fo(o) && o.catch((r) => {
      Cn(r, t, n);
    }), o;
  }
  if (D(e)) {
    const o = [];
    for (let r = 0; r < e.length; r++)
      o.push(Ce(e[r], t, n, s));
    return o;
  }
}
function Cn(e, t, n, s = !0) {
  const o = t ? t.vnode : null, { errorHandler: r, throwUnhandledErrorInProduction: i } = t && t.appContext.config || q;
  if (t) {
    let l = t.parent;
    const c = t.proxy, a = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const f = l.ec;
      if (f) {
        for (let p = 0; p < f.length; p++)
          if (f[p](e, c, a) === !1)
            return;
      }
      l = l.parent;
    }
    if (r) {
      Ge(), Bt(r, null, 10, [
        e,
        c,
        a
      ]), qe();
      return;
    }
  }
  Si(e, n, o, s, i);
}
function Si(e, t, n, s = !0, o = !1) {
  if (o)
    throw e;
  console.error(e);
}
const ie = [];
let Ie = -1;
const yt = [];
let Ze = null, ht = 0;
const jo = /* @__PURE__ */ Promise.resolve();
let un = null;
function Mi(e) {
  const t = un || jo;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ei(e) {
  let t = Ie + 1, n = ie.length;
  for (; t < n; ) {
    const s = t + n >>> 1, o = ie[s], r = Kt(o);
    r < e || r === e && o.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function _s(e) {
  if (!(e.flags & 1)) {
    const t = Kt(e), n = ie[ie.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Kt(n) ? ie.push(e) : ie.splice(Ei(t), 0, e), e.flags |= 1, Vo();
  }
}
function Vo() {
  un || (un = jo.then($o));
}
function Pi(e) {
  if (!D(e))
    Ze && e.id === -1 ? Ze.splice(ht + 1, 0, e) : e.flags & 1 || (yt.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      yt.push(e[t]);
  Vo();
}
function Fs(e, t, n = Ie + 1) {
  for (; n < ie.length; n++) {
    const s = ie[n];
    if (s && s.flags & 2) {
      if (e && s.id !== e.uid)
        continue;
      ie.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
    }
  }
}
function Lo(e) {
  if (yt.length) {
    const t = [...new Set(yt)].sort(
      (n, s) => Kt(n) - Kt(s)
    );
    if (yt.length = 0, Ze) {
      for (let n = 0; n < t.length; n++)
        Ze.push(t[n]);
      return;
    }
    for (Ze = t, ht = 0; ht < Ze.length; ht++) {
      const n = Ze[ht];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    Ze = null, ht = 0;
  }
}
const Kt = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function $o(e) {
  try {
    for (Ie = 0; Ie < ie.length; Ie++) {
      const t = ie[Ie];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Bt(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Ie < ie.length; Ie++) {
      const t = ie[Ie];
      t && (t.flags &= -2);
    }
    Ie = -1, ie.length = 0, Lo(), un = null, (ie.length || yt.length) && $o();
  }
}
let De = null, Ko = null;
function fn(e) {
  const t = De;
  return De = e, Ko = e && e.type.__scopeId || null, t;
}
function Oi(e, t = De, n) {
  if (!t || e._n)
    return e;
  const s = (...o) => {
    s._d && Us(-1);
    const r = fn(t), i = ct.length;
    let l;
    try {
      l = e(...o);
    } finally {
      for (let c = ct.length; c > i; c--) fr();
      fn(r), s._d && Us(1);
    }
    return l;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function st(e, t, n, s) {
  const o = e.dirs, r = t && t.dirs;
  for (let i = 0; i < o.length; i++) {
    const l = o[i];
    r && (l.oldValue = r[i].value);
    let c = l.dir[s];
    c && (Ge(), Ce(c, n, 8, [
      e.el,
      l,
      e,
      t
    ]), qe());
  }
}
function Ii(e, t) {
  if (le) {
    let n = le.provides;
    const s = le.parent && le.parent.provides;
    s === n && (n = le.provides = Object.create(s)), n[e] = t;
  }
}
function nn(e, t, n = !1) {
  const s = Ol();
  if (s || wt) {
    let o = wt ? wt._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && j(t) ? t.call(s && s.proxy) : t;
  }
}
const Ai = /* @__PURE__ */ Symbol.for("v-scx"), Ti = () => nn(Ai);
function Ue(e, t, n) {
  return No(e, t, n);
}
function No(e, t, n = q) {
  const { immediate: s, deep: o, flush: r, once: i } = n, l = se({}, n), c = t && s || !t && r !== "post";
  let a;
  if (Wt) {
    if (r === "sync") {
      const S = Ti();
      a = S.__watcherHandles || (S.__watcherHandles = []);
    } else if (!c) {
      const S = () => {
      };
      return S.stop = He, S.resume = He, S.pause = He, S;
    }
  }
  const f = le;
  l.call = (S, H, I) => Ce(S, f, H, I);
  let p = !1;
  r === "post" ? l.scheduler = (S) => {
    ue(S, f && f.suspense);
  } : r !== "sync" && (p = !0, l.scheduler = (S, H) => {
    H ? S() : _s(S);
  }), l.augmentJob = (S) => {
    t && (S.flags |= 4), p && (S.flags |= 2, f && (S.id = f.uid, S.i = f));
  };
  const w = vi(e, t, l);
  return Wt && (a ? a.push(w) : c && w()), w;
}
function Fi(e, t, n) {
  const s = this.proxy, o = Y(e) ? e.includes(".") ? ko(s, e) : () => s[e] : e.bind(s, s);
  let r;
  j(t) ? r = t : (r = t.handler, n = t);
  const i = Gt(this), l = No(o, r.bind(s), n);
  return i(), l;
}
function ko(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let o = 0; o < n.length && s; o++)
      s = s[n[o]];
    return s;
  };
}
const Di = /* @__PURE__ */ Symbol("_vte"), vn = (e) => e.__isTeleport, $n = /* @__PURE__ */ Symbol("_leaveCb");
function Hi(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== Je) {
        t = n;
        break;
      }
  }
  return t;
}
function Wo(e) {
  if (!ws(e))
    return vn(e.type) && e.children ? Hi(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16)
      return n[0];
    if (t & 32 && j(n.default))
      return n.default();
  }
}
function ys(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    ys(
      vn(n.type) && Wo(n) || n,
      t
    );
  } else e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Uo(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Ds(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const an = /* @__PURE__ */ new WeakMap();
function Ft(e, t, n, s, o = !1) {
  if (D(e)) {
    e.forEach(
      (I, z) => Ft(
        I,
        t && (D(t) ? t[z] : t),
        n,
        s,
        o
      )
    );
    return;
  }
  if (Dt(s) && !o) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && Ft(e, t, n, s.component.subTree);
    return;
  }
  const r = s.shapeFlag & 4 ? Rs(s.component) : s.el, i = o ? null : r, { i: l, r: c } = e, a = t && t.r, f = l.refs === q ? l.refs = {} : l.refs, p = l.setupState, w = /* @__PURE__ */ L(p), S = p === q ? uo : (I) => Ds(f, I) ? !1 : $(w, I), H = (I, z) => !(z && Ds(f, z));
  if (a != null && a !== c) {
    if (Hs(t), Y(a))
      f[a] = null, S(a) && (p[a] = null);
    else if (/* @__PURE__ */ ne(a)) {
      const I = t;
      H(a, I.k) && (a.value = null), I.k && (f[I.k] = null);
    }
  }
  if (j(c))
    Bt(c, l, 12, [i, f]);
  else {
    const I = Y(c), z = /* @__PURE__ */ ne(c);
    if (I || z) {
      const E = () => {
        if (e.f) {
          const x = I ? S(c) ? p[c] : f[c] : H() || !e.k ? c.value : f[e.k];
          if (o)
            D(x) && cs(x, r);
          else if (D(x))
            x.includes(r) || x.push(r);
          else if (I)
            f[c] = [r], S(c) && (p[c] = f[c]);
          else {
            const P = [r];
            H(c, e.k) && (c.value = P), e.k && (f[e.k] = P);
          }
        } else I ? (f[c] = i, S(c) && (p[c] = i)) : z && (H(c, e.k) && (c.value = i), e.k && (f[e.k] = i));
      };
      if (i) {
        const x = () => {
          E(), an.delete(e);
        };
        x.id = -1, an.set(e, x), ue(x, n);
      } else
        Hs(e), E();
    }
  }
}
function Hs(e) {
  const t = an.get(e);
  t && (t.flags |= 8, an.delete(e));
}
wn().requestIdleCallback;
wn().cancelIdleCallback;
const Dt = (e) => !!e.type.__asyncLoader, ws = (e) => e.type.__isKeepAlive;
function ji(e, t) {
  Bo(e, "a", t);
}
function Vi(e, t) {
  Bo(e, "da", t);
}
function Bo(e, t, n = le) {
  const s = e.__wdc || (e.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (Sn(t, s, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      ws(o.parent.vnode) && Li(s, t, n, o), o = o.parent;
  }
}
function Li(e, t, n, s) {
  const o = Sn(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  Go(() => {
    cs(s[t], o);
  }, n);
}
function Sn(e, t, n = le, s = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...i) => {
      Ge();
      const l = Gt(n), c = Ce(t, n, e, i);
      return l(), qe(), c;
    });
    return s ? o.unshift(r) : o.push(r), r;
  }
}
const Ye = (e) => (t, n = le) => {
  (!Wt || e === "sp") && Sn(e, (...s) => t(...s), n);
}, $i = Ye("bm"), Ki = Ye("m"), Ni = Ye(
  "bu"
), ki = Ye("u"), Wi = Ye(
  "bum"
), Go = Ye("um"), Ui = Ye(
  "sp"
), Bi = Ye("rtg"), Gi = Ye("rtc");
function qi(e, t = le) {
  Sn("ec", e, t);
}
const zi = /* @__PURE__ */ Symbol.for("v-ndc");
function Kn(e, t, n, s) {
  let o;
  const r = n, i = D(e);
  if (i || Y(e)) {
    const l = i && /* @__PURE__ */ lt(e);
    let c = !1, a = !1;
    l && (c = !/* @__PURE__ */ ye(e), a = /* @__PURE__ */ ze(e), e = bn(e)), o = new Array(e.length);
    for (let f = 0, p = e.length; f < p; f++)
      o[f] = t(
        c ? a ? xt(Re(e[f])) : Re(e[f]) : e[f],
        f,
        void 0,
        r
      );
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let l = 0; l < e; l++)
      o[l] = t(l + 1, l, void 0, r);
  } else if (k(e))
    if (e[Symbol.iterator])
      o = Array.from(
        e,
        (l, c) => t(l, c, void 0, r)
      );
    else {
      const l = Object.keys(e);
      o = new Array(l.length);
      for (let c = 0, a = l.length; c < a; c++) {
        const f = l[c];
        o[c] = t(e[f], f, c, r);
      }
    }
  else
    o = [];
  return o;
}
const Qn = (e) => e ? hr(e) ? Rs(e) : Qn(e.parent) : null, Ht = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ se(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Qn(e.parent),
    $root: (e) => Qn(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => zo(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      _s(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Mi.bind(e.proxy)),
    $watch: (e) => Fi.bind(e)
  })
), Nn = (e, t) => e !== q && !e.__isScriptSetup && $(e, t), Ji = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: o, props: r, accessCache: i, type: l, appContext: c } = e;
    if (t[0] !== "$") {
      const w = i[t];
      if (w !== void 0)
        switch (w) {
          case 1:
            return s[t];
          case 2:
            return o[t];
          case 4:
            return n[t];
          case 3:
            return r[t];
        }
      else {
        if (Nn(s, t))
          return i[t] = 1, s[t];
        if (o !== q && $(o, t))
          return i[t] = 2, o[t];
        if ($(r, t))
          return i[t] = 3, r[t];
        if (n !== q && $(n, t))
          return i[t] = 4, n[t];
        es && (i[t] = 0);
      }
    }
    const a = Ht[t];
    let f, p;
    if (a)
      return t === "$attrs" && te(e.attrs, "get", ""), a(e);
    if (
      // css module (injected by vue-loader)
      (f = l.__cssModules) && (f = f[t])
    )
      return f;
    if (n !== q && $(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      p = c.config.globalProperties, $(p, t)
    )
      return p[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: o, ctx: r } = e;
    return Nn(o, t) ? (o[t] = n, !0) : s !== q && $(s, t) ? (s[t] = n, !0) : $(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (r[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: o, props: r, type: i }
  }, l) {
    let c;
    return !!(n[l] || e !== q && l[0] !== "$" && $(e, l) || Nn(t, l) || $(r, l) || $(s, l) || $(Ht, l) || $(o.config.globalProperties, l) || (c = i.__cssModules) && c[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : $(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function js(e) {
  return D(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let es = !0;
function Yi(e) {
  const t = zo(e), n = e.proxy, s = e.ctx;
  es = !1, t.beforeCreate && Vs(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: r,
    methods: i,
    watch: l,
    provide: c,
    inject: a,
    // lifecycle
    created: f,
    beforeMount: p,
    mounted: w,
    beforeUpdate: S,
    updated: H,
    activated: I,
    deactivated: z,
    beforeDestroy: E,
    beforeUnmount: x,
    destroyed: P,
    unmounted: M,
    render: K,
    renderTracked: ce,
    renderTriggered: ae,
    errorCaptured: U,
    serverPrefetch: T,
    // public API
    expose: X,
    inheritAttrs: de,
    // assets
    components: we,
    directives: ve,
    filters: Xe
  } = t;
  if (a && Xi(a, s, null), i)
    for (const J in i) {
      const B = i[J];
      j(B) && (s[J] = B.bind(n));
    }
  if (o) {
    const J = o.call(n, n);
    k(J) && (e.data = /* @__PURE__ */ Rn(J));
  }
  if (es = !0, r)
    for (const J in r) {
      const B = r[J], tt = j(B) ? B.bind(n, n) : j(B.get) ? B.get.bind(n, n) : He, Jt = !j(B) && j(B.set) ? B.set.bind(n) : He, nt = Ke({
        get: tt,
        set: Jt
      });
      Object.defineProperty(s, J, {
        enumerable: !0,
        configurable: !0,
        get: () => nt.value,
        set: (Se) => nt.value = Se
      });
    }
  if (l)
    for (const J in l)
      qo(l[J], s, n, J);
  if (c) {
    const J = j(c) ? c.call(n) : c;
    Reflect.ownKeys(J).forEach((B) => {
      Ii(B, J[B]);
    });
  }
  f && Vs(f, e, "c");
  function oe(J, B) {
    D(B) ? B.forEach((tt) => J(tt.bind(n))) : B && J(B.bind(n));
  }
  if (oe($i, p), oe(Ki, w), oe(Ni, S), oe(ki, H), oe(ji, I), oe(Vi, z), oe(qi, U), oe(Gi, ce), oe(Bi, ae), oe(Wi, x), oe(Go, M), oe(Ui, T), D(X))
    if (X.length) {
      const J = e.exposed || (e.exposed = {});
      X.forEach((B) => {
        Object.defineProperty(J, B, {
          get: () => n[B],
          set: (tt) => n[B] = tt,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  K && e.render === He && (e.render = K), de != null && (e.inheritAttrs = de), we && (e.components = we), ve && (e.directives = ve), T && Uo(e);
}
function Xi(e, t, n = He) {
  D(e) && (e = ts(e));
  for (const s in e) {
    const o = e[s];
    let r;
    k(o) ? "default" in o ? r = nn(
      o.from || s,
      o.default,
      !0
    ) : r = nn(o.from || s) : r = nn(o), /* @__PURE__ */ ne(r) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => r.value,
      set: (i) => r.value = i
    }) : t[s] = r;
  }
}
function Vs(e, t, n) {
  Ce(
    D(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function qo(e, t, n, s) {
  let o = s.includes(".") ? ko(n, s) : () => n[s];
  if (Y(e)) {
    const r = t[e];
    j(r) && Ue(o, r);
  } else if (j(e))
    Ue(o, e.bind(n));
  else if (k(e))
    if (D(e))
      e.forEach((r) => qo(r, t, n, s));
    else {
      const r = j(e.handler) ? e.handler.bind(n) : t[e.handler];
      j(r) && Ue(o, r, e);
    }
}
function zo(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: o,
    optionsCache: r,
    config: { optionMergeStrategies: i }
  } = e.appContext, l = r.get(t);
  let c;
  return l ? c = l : !o.length && !n && !s ? c = t : (c = {}, o.length && o.forEach(
    (a) => dn(c, a, i, !0)
  ), dn(c, t, i)), k(t) && r.set(t, c), c;
}
function dn(e, t, n, s = !1) {
  const { mixins: o, extends: r } = t;
  r && dn(e, r, n, !0), o && o.forEach(
    (i) => dn(e, i, n, !0)
  );
  for (const i in t)
    if (!(s && i === "expose")) {
      const l = Zi[i] || n && n[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const Zi = {
  data: Ls,
  props: $s,
  emits: $s,
  // objects
  methods: Pt,
  computed: Pt,
  // lifecycle
  beforeCreate: re,
  created: re,
  beforeMount: re,
  mounted: re,
  beforeUpdate: re,
  updated: re,
  beforeDestroy: re,
  beforeUnmount: re,
  destroyed: re,
  unmounted: re,
  activated: re,
  deactivated: re,
  errorCaptured: re,
  serverPrefetch: re,
  // assets
  components: Pt,
  directives: Pt,
  // watch
  watch: el,
  // provide / inject
  provide: Ls,
  inject: Qi
};
function Ls(e, t) {
  return t ? e ? function() {
    return se(
      j(e) ? e.call(this, this) : e,
      j(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Qi(e, t) {
  return Pt(ts(e), ts(t));
}
function ts(e) {
  if (D(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function re(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Pt(e, t) {
  return e ? se(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function $s(e, t) {
  return e ? D(e) && D(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : se(
    /* @__PURE__ */ Object.create(null),
    js(e),
    js(t ?? {})
  ) : t;
}
function el(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = se(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = re(e[s], t[s]);
  return n;
}
function Jo() {
  return {
    app: null,
    config: {
      isNativeTag: uo,
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
let tl = 0;
function nl(e, t) {
  return function(s, o = null) {
    j(s) || (s = se({}, s)), o != null && !k(o) && (o = null);
    const r = Jo(), i = /* @__PURE__ */ new WeakSet(), l = [];
    let c = !1;
    const a = r.app = {
      _uid: tl++,
      _component: s,
      _props: o,
      _container: null,
      _context: r,
      _instance: null,
      version: Hl,
      get config() {
        return r.config;
      },
      set config(f) {
      },
      use(f, ...p) {
        return i.has(f) || (f && j(f.install) ? (i.add(f), f.install(a, ...p)) : j(f) && (i.add(f), f(a, ...p))), a;
      },
      mixin(f) {
        return r.mixins.includes(f) || r.mixins.push(f), a;
      },
      component(f, p) {
        return p ? (r.components[f] = p, a) : r.components[f];
      },
      directive(f, p) {
        return p ? (r.directives[f] = p, a) : r.directives[f];
      },
      mount(f, p, w) {
        if (!c) {
          const S = a._ceVNode || Be(s, o);
          return S.appContext = r, w === !0 ? w = "svg" : w === !1 && (w = void 0), e(S, f, w), c = !0, a._container = f, f.__vue_app__ = a, Rs(S.component);
        }
      },
      onUnmount(f) {
        l.push(f);
      },
      unmount() {
        c && (Ce(
          l,
          a._instance,
          16
        ), e(null, a._container), delete a._container.__vue_app__);
      },
      provide(f, p) {
        return r.provides[f] = p, a;
      },
      runWithContext(f) {
        const p = wt;
        wt = a;
        try {
          return f();
        } finally {
          wt = p;
        }
      }
    };
    return a;
  };
}
let wt = null;
const sl = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${xe(t)}Modifiers`] || e[`${dt(t)}Modifiers`];
function ol(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || q;
  let o = n;
  const r = t.startsWith("update:"), i = r && sl(s, t.slice(7));
  i && (i.trim && (o = n.map((f) => Y(f) ? f.trim() : f)), i.number && (o = o.map(kr)));
  let l, c = s[l = Fn(t)] || // also try camelCase event handler (#2249)
  s[l = Fn(xe(t))];
  !c && r && (c = s[l = Fn(dt(t))]), c && Ce(
    c,
    e,
    6,
    o
  );
  const a = s[l + "Once"];
  if (a) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, Ce(
      a,
      e,
      6,
      o
    );
  }
}
const rl = /* @__PURE__ */ new WeakMap();
function Yo(e, t, n = !1) {
  const s = n ? rl : t.emitsCache, o = s.get(e);
  if (o !== void 0)
    return o;
  const r = e.emits;
  let i = {}, l = !1;
  if (!j(e)) {
    const c = (a) => {
      const f = Yo(a, t, !0);
      f && (l = !0, se(i, f));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !r && !l ? (k(e) && s.set(e, null), null) : (D(r) ? r.forEach((c) => i[c] = null) : se(i, r), k(e) && s.set(e, i), i);
}
function Mn(e, t) {
  return !e || !mn(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), $(e, t[0].toLowerCase() + t.slice(1)) || $(e, dt(t)) || $(e, t));
}
function Ks(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: o,
    propsOptions: [r],
    slots: i,
    attrs: l,
    emit: c,
    render: a,
    renderCache: f,
    props: p,
    data: w,
    setupState: S,
    ctx: H,
    inheritAttrs: I
  } = e, z = fn(e);
  let E, x;
  try {
    if (n.shapeFlag & 4) {
      const M = o || s, K = M;
      E = Te(
        a.call(
          K,
          M,
          f,
          p,
          S,
          w,
          H
        )
      ), x = l;
    } else {
      const M = t;
      E = Te(
        M.length > 1 ? M(
          p,
          { attrs: l, slots: i, emit: c }
        ) : M(
          p,
          null
        )
      ), x = t.props ? l : il(l);
    }
  } catch (M) {
    ct.length = 0, Cn(M, e, 1), E = Be(Je);
  }
  let P = E;
  if (x && I !== !1) {
    const M = Object.keys(x), { shapeFlag: K } = P;
    M.length && K & 7 && (r && M.some(_n) && (x = ll(
      x,
      r
    )), P = bt(P, x, !1, !0));
  }
  if (n.dirs && (P = bt(P, null, !1, !0), P.dirs = P.dirs ? P.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const M = vn(P.type) && Wo(P) || P;
    ys(M, n.transition);
  }
  return E = P, fn(z), E;
}
const il = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || mn(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, ll = (e, t) => {
  const n = {};
  for (const s in e)
    (!_n(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function cl(e, t, n) {
  const { props: s, children: o, component: r } = e, { props: i, children: l, patchFlag: c } = t, a = r.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return s ? Ns(s, i, a) : !!i;
    if (c & 8) {
      const f = t.dynamicProps;
      for (let p = 0; p < f.length; p++) {
        const w = f[p];
        if (Xo(i, s, w) && !Mn(a, w))
          return !0;
      }
    }
  } else
    return (o || l) && (!l || !l.$stable) ? !0 : s === i ? !1 : s ? i ? Ns(s, i, a) : !0 : !!i;
  return !1;
}
function Ns(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < s.length; o++) {
    const r = s[o];
    if (Xo(t, e, r) && !Mn(n, r))
      return !0;
  }
  return !1;
}
function Xo(e, t, n) {
  const s = e[n], o = t[n];
  return n === "style" && k(s) && k(o) ? !xn(s, o) : s !== o;
}
function ul({ vnode: e, parent: t, suspense: n }, s) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.suspense.vnode.el = o.el = s, e = o), o === e)
      (e = t.vnode).el = s, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = s);
}
const Zo = {}, Qo = () => Object.create(Zo), er = (e) => Object.getPrototypeOf(e) === Zo;
function fl(e, t, n, s = !1) {
  const o = {}, r = Qo();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), tr(e, t, o, r);
  for (const i in e.propsOptions[0])
    i in o || (o[i] = void 0);
  n ? e.props = s ? o : /* @__PURE__ */ gi(o) : e.type.props ? e.props = o : e.props = r, e.attrs = r;
}
function al(e, t, n, s) {
  const {
    props: o,
    attrs: r,
    vnode: { patchFlag: i }
  } = e, l = /* @__PURE__ */ L(o), [c] = e.propsOptions;
  let a = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (s || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const f = e.vnode.dynamicProps;
      for (let p = 0; p < f.length; p++) {
        let w = f[p];
        if (Mn(e.emitsOptions, w))
          continue;
        const S = t[w];
        if (c)
          if ($(r, w))
            S !== r[w] && (r[w] = S, a = !0);
          else {
            const H = xe(w);
            o[H] = ns(
              c,
              l,
              H,
              S,
              e,
              !1
            );
          }
        else
          S !== r[w] && (r[w] = S, a = !0);
      }
    }
  } else {
    tr(e, t, o, r) && (a = !0);
    let f;
    for (const p in l)
      (!t || // for camelCase
      !$(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((f = dt(p)) === p || !$(t, f))) && (c ? n && // for camelCase
      (n[p] !== void 0 || // for kebab-case
      n[f] !== void 0) && (o[p] = ns(
        c,
        l,
        p,
        void 0,
        e,
        !0
      )) : delete o[p]);
    if (r !== l)
      for (const p in r)
        (!t || !$(t, p)) && (delete r[p], a = !0);
  }
  a && We(e.attrs, "set", "");
}
function tr(e, t, n, s) {
  const [o, r] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let c in t) {
      if (It(c))
        continue;
      const a = t[c];
      let f;
      o && $(o, f = xe(c)) ? !r || !r.includes(f) ? n[f] = a : (l || (l = {}))[f] = a : Mn(e.emitsOptions, c) || (!(c in s) || a !== s[c]) && (s[c] = a, i = !0);
    }
  if (r) {
    const c = /* @__PURE__ */ L(n), a = l || q;
    for (let f = 0; f < r.length; f++) {
      const p = r[f];
      n[p] = ns(
        o,
        c,
        p,
        a[p],
        e,
        !$(a, p)
      );
    }
  }
  return i;
}
function ns(e, t, n, s, o, r) {
  const i = e[n];
  if (i != null) {
    const l = $(i, "default");
    if (l && s === void 0) {
      const c = i.default;
      if (i.type !== Function && !i.skipFactory && j(c)) {
        const { propsDefaults: a } = o;
        if (n in a)
          s = a[n];
        else {
          const f = Gt(o);
          s = a[n] = c.call(
            null,
            t
          ), f();
        }
      } else
        s = c;
      o.ce && o.ce._setProp(n, s);
    }
    i[
      0
      /* shouldCast */
    ] && (r && !l ? s = !1 : i[
      1
      /* shouldCastTrue */
    ] && (s === "" || s === dt(n)) && (s = !0));
  }
  return s;
}
const dl = /* @__PURE__ */ new WeakMap();
function nr(e, t, n = !1) {
  const s = n ? dl : t.propsCache, o = s.get(e);
  if (o)
    return o;
  const r = e.props, i = {}, l = [];
  let c = !1;
  if (!j(e)) {
    const f = (p) => {
      c = !0;
      const [w, S] = nr(p, t, !0);
      se(i, w), S && l.push(...S);
    };
    !n && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  if (!r && !c)
    return k(e) && s.set(e, mt), mt;
  if (D(r))
    for (let f = 0; f < r.length; f++) {
      const p = xe(r[f]);
      ks(p) && (i[p] = q);
    }
  else if (r)
    for (const f in r) {
      const p = xe(f);
      if (ks(p)) {
        const w = r[f], S = i[p] = D(w) || j(w) ? { type: w } : se({}, w), H = S.type;
        let I = !1, z = !0;
        if (D(H))
          for (let E = 0; E < H.length; ++E) {
            const x = H[E], P = j(x) && x.name;
            if (P === "Boolean") {
              I = !0;
              break;
            } else P === "String" && (z = !1);
          }
        else
          I = j(H) && H.name === "Boolean";
        S[
          0
          /* shouldCast */
        ] = I, S[
          1
          /* shouldCastTrue */
        ] = z, (I || $(S, "default")) && l.push(p);
      }
    }
  const a = [i, l];
  return k(e) && s.set(e, a), a;
}
function ks(e) {
  return e[0] !== "$" && !It(e);
}
const xs = (e) => e === "_" || e === "_ctx" || e === "$stable", bs = (e) => D(e) ? e.map(Te) : [Te(e)], pl = (e, t, n) => {
  if (t._n)
    return t;
  const s = Oi((...o) => bs(t(...o)), n);
  return s._c = !1, s;
}, sr = (e, t, n) => {
  const s = e._ctx;
  for (const o in e) {
    if (xs(o)) continue;
    const r = e[o];
    if (j(r))
      t[o] = pl(o, r, s);
    else if (r != null) {
      const i = bs(r);
      t[o] = () => i;
    }
  }
}, or = (e, t) => {
  const n = bs(t);
  e.slots.default = () => n;
}, rr = (e, t, n) => {
  for (const s in t)
    (n || !xs(s)) && (e[s] = t[s]);
}, hl = (e, t, n) => {
  const s = e.slots = Qo();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (rr(s, t, n), n && go(s, "_", o, !0)) : sr(t, s);
  } else t && or(e, t);
}, gl = (e, t, n) => {
  const { vnode: s, slots: o } = e;
  let r = !0, i = q;
  if (s.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? r = !1 : rr(o, t, n) : (r = !t.$stable, sr(t, o)), i = t;
  } else t && (or(e, t), i = { default: 1 });
  if (r)
    for (const l in o)
      !xs(l) && i[l] == null && delete o[l];
}, ue = xl;
function ml(e) {
  return _l(e);
}
function _l(e, t) {
  const n = wn();
  n.__VUE__ = !0;
  const {
    insert: s,
    remove: o,
    patchProp: r,
    createElement: i,
    createText: l,
    createComment: c,
    setText: a,
    setElementText: f,
    parentNode: p,
    nextSibling: w,
    setScopeId: S = He,
    insertStaticContent: H
  } = e, I = (u, d, h, y = null, _ = null, g = null, C = void 0, R = null, b = !!d.dynamicChildren) => {
    if (u === d)
      return;
    u && !Et(u, d) && (y = Yt(u), Se(u, _, g, !0), u = null), d.patchFlag === -2 && (b = !1, d.dynamicChildren = null);
    const { type: m, ref: A, shapeFlag: v } = d;
    switch (m) {
      case En:
        z(u, d, h, y);
        break;
      case Je:
        E(u, d, h, y);
        break;
      case Wn:
        u == null && x(d, h, y, C);
        break;
      case ge:
        we(
          u,
          d,
          h,
          y,
          _,
          g,
          C,
          R,
          b
        );
        break;
      default:
        v & 1 ? K(
          u,
          d,
          h,
          y,
          _,
          g,
          C,
          R,
          b
        ) : v & 6 ? ve(
          u,
          d,
          h,
          y,
          _,
          g,
          C,
          R,
          b
        ) : (v & 64 || v & 128) && m.process(
          u,
          d,
          h,
          y,
          _,
          g,
          C,
          R,
          b,
          vt
        );
    }
    A != null && _ ? Ft(A, u && u.ref, g, d || u, !d) : A == null && u && u.ref != null && Ft(u.ref, null, g, u, !0);
  }, z = (u, d, h, y) => {
    if (u == null)
      s(
        d.el = l(d.children),
        h,
        y
      );
    else {
      const _ = d.el = u.el;
      d.children !== u.children && a(_, d.children);
    }
  }, E = (u, d, h, y) => {
    u == null ? s(
      d.el = c(d.children || ""),
      h,
      y
    ) : d.el = u.el;
  }, x = (u, d, h, y) => {
    [u.el, u.anchor] = H(
      u.children,
      d,
      h,
      y,
      u.el,
      u.anchor
    );
  }, P = ({ el: u, anchor: d }, h, y) => {
    let _;
    for (; u && u !== d; )
      _ = w(u), s(u, h, y), u = _;
    s(d, h, y);
  }, M = ({ el: u, anchor: d }) => {
    let h;
    for (; u && u !== d; )
      h = w(u), o(u), u = h;
    o(d);
  }, K = (u, d, h, y, _, g, C, R, b) => {
    if (d.type === "svg" ? C = "svg" : d.type === "math" && (C = "mathml"), u == null)
      ce(
        d,
        h,
        y,
        _,
        g,
        C,
        R,
        b
      );
    else {
      const m = u.el && u.el._isVueCE ? u.el : null;
      try {
        m && m._beginPatch(), T(
          u,
          d,
          _,
          g,
          C,
          R,
          b
        );
      } finally {
        m && m._endPatch();
      }
    }
  }, ce = (u, d, h, y, _, g, C, R) => {
    let b, m;
    const { props: A, shapeFlag: v, transition: O, dirs: F } = u;
    if (b = u.el = i(
      u.type,
      g,
      A && A.is,
      A
    ), v & 8 ? f(b, u.children) : v & 16 && U(
      u.children,
      b,
      null,
      y,
      _,
      kn(u, g),
      C,
      R
    ), F && st(u, null, y, "created"), ae(b, u, u.scopeId, C, y), A) {
      for (const W in A)
        W !== "value" && !It(W) && r(b, W, null, A[W], g, y);
      "value" in A && r(b, "value", null, A.value, g), (m = A.onVnodeBeforeMount) && Oe(m, y, u);
    }
    F && st(u, null, y, "beforeMount");
    const V = yl(_, O);
    V && O.beforeEnter(b), s(b, d, h), ((m = A && A.onVnodeMounted) || V || F) && ue(() => {
      try {
        m && Oe(m, y, u), V && O.enter(b), F && st(u, null, y, "mounted");
      } finally {
      }
    }, _);
  }, ae = (u, d, h, y, _) => {
    if (h && S(u, h), y)
      for (let g = 0; g < y.length; g++)
        S(u, y[g]);
    if (_) {
      let g = _.subTree;
      if (d === g || ur(g.type) && (g.ssContent === d || g.ssFallback === d)) {
        const C = _.vnode;
        ae(
          u,
          C,
          C.scopeId,
          C.slotScopeIds,
          _.parent
        );
      }
    }
  }, U = (u, d, h, y, _, g, C, R, b = 0) => {
    for (let m = b; m < u.length; m++) {
      const A = u[m] = R ? ke(u[m]) : Te(u[m]);
      I(
        null,
        A,
        d,
        h,
        y,
        _,
        g,
        C,
        R
      );
    }
  }, T = (u, d, h, y, _, g, C) => {
    const R = d.el = u.el;
    let { patchFlag: b, dynamicChildren: m, dirs: A } = d;
    b |= u.patchFlag & 16;
    const v = u.props || q, O = d.props || q;
    let F;
    if (h && ot(h, !1), (F = O.onVnodeBeforeUpdate) && Oe(F, h, d, u), A && st(d, u, h, "beforeUpdate"), h && ot(h, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    m && (!u.dynamicChildren || u.dynamicChildren.length !== m.length) && (b = 0, C = !1, m = null), (v.innerHTML && O.innerHTML == null || v.textContent && O.textContent == null) && f(R, ""), m ? X(
      u.dynamicChildren,
      m,
      R,
      h,
      y,
      kn(d, _),
      g
    ) : C || B(
      u,
      d,
      R,
      null,
      h,
      y,
      kn(d, _),
      g,
      !1
    ), b > 0) {
      if (b & 16)
        de(R, v, O, h, _);
      else if (b & 2 && v.class !== O.class && r(R, "class", null, O.class, _), b & 4 && r(R, "style", v.style, O.style, _), b & 8) {
        const V = d.dynamicProps;
        for (let W = 0; W < V.length; W++) {
          const N = V[W], Z = v[N], ee = O[N];
          (ee !== Z || N === "value") && r(R, N, Z, ee, _, h);
        }
      }
      b & 1 && u.children !== d.children && f(R, d.children);
    } else !C && m == null && de(R, v, O, h, _);
    ((F = O.onVnodeUpdated) || A) && ue(() => {
      F && Oe(F, h, d, u), A && st(d, u, h, "updated");
    }, y);
  }, X = (u, d, h, y, _, g, C) => {
    for (let R = 0; R < d.length; R++) {
      const b = u[R], m = d[R], A = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        b.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (b.type === ge || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Et(b, m) || // - In the case of a component, it could contain anything.
        b.shapeFlag & 198) ? p(b.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          h
        )
      );
      I(
        b,
        m,
        A,
        null,
        y,
        _,
        g,
        C,
        !0
      );
    }
  }, de = (u, d, h, y, _) => {
    if (d !== h) {
      if (d !== q)
        for (const g in d)
          !It(g) && !(g in h) && r(
            u,
            g,
            d[g],
            null,
            _,
            y
          );
      for (const g in h) {
        if (It(g)) continue;
        const C = h[g], R = d[g];
        C !== R && g !== "value" && r(u, g, R, C, _, y);
      }
      "value" in h && r(u, "value", d.value, h.value, _);
    }
  }, we = (u, d, h, y, _, g, C, R, b) => {
    const m = d.el = u ? u.el : l(""), A = d.anchor = u ? u.anchor : l("");
    let { patchFlag: v, dynamicChildren: O, slotScopeIds: F } = d;
    F && (R = R ? R.concat(F) : F), u == null ? (s(m, h, y), s(A, h, y), U(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      d.children || [],
      h,
      A,
      _,
      g,
      C,
      R,
      b
    )) : v > 0 && v & 64 && O && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    u.dynamicChildren && u.dynamicChildren.length === O.length ? (X(
      u.dynamicChildren,
      O,
      h,
      _,
      g,
      C,
      R
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (d.key != null || _ && d === _.subTree) && ir(
      u,
      d,
      !0
      /* shallow */
    )) : B(
      u,
      d,
      h,
      A,
      _,
      g,
      C,
      R,
      b
    );
  }, ve = (u, d, h, y, _, g, C, R, b) => {
    d.slotScopeIds = R, u == null ? d.shapeFlag & 512 ? _.ctx.activate(
      d,
      h,
      y,
      C,
      b
    ) : Xe(
      d,
      h,
      y,
      _,
      g,
      C,
      b
    ) : Le(u, d, b);
  }, Xe = (u, d, h, y, _, g, C) => {
    const R = u.component = Pl(
      u,
      y,
      _
    );
    if (ws(u) && (R.ctx.renderer = vt), Il(R, !1, C), R.asyncDep) {
      if (_ && _.registerDep(R, oe, C), !u.el) {
        const b = R.subTree = Be(Je);
        E(null, b, d, h), u.placeholder = b.el;
      }
    } else
      oe(
        R,
        u,
        d,
        h,
        _,
        g,
        C
      );
  }, Le = (u, d, h) => {
    const y = d.component = u.component;
    if (cl(u, d, h))
      if (y.asyncDep && !y.asyncResolved) {
        J(y, d, h);
        return;
      } else
        y.next = d, y.update();
    else
      d.el = u.el, y.vnode = d;
  }, oe = (u, d, h, y, _, g, C) => {
    const R = () => {
      if (u.isMounted) {
        let { next: v, bu: O, u: F, parent: V, vnode: W } = u;
        {
          const Ee = lr(u);
          if (Ee) {
            v && (v.el = W.el, J(u, v, C)), Ee.asyncDep.then(() => {
              ue(() => {
                u.isUnmounted || m();
              }, _);
            });
            return;
          }
        }
        let N = v, Z;
        ot(u, !1), v ? (v.el = W.el, J(u, v, C)) : v = W, O && Dn(O), (Z = v.props && v.props.onVnodeBeforeUpdate) && Oe(Z, V, v, W), ot(u, !0);
        const ee = Ks(u), Me = u.subTree;
        u.subTree = ee, I(
          Me,
          ee,
          // parent may have changed if it's in a teleport
          p(Me.el),
          // anchor may have changed if it's in a fragment
          Yt(Me),
          u,
          _,
          g
        ), v.el = ee.el, N === null && ul(u, ee.el), F && ue(F, _), (Z = v.props && v.props.onVnodeUpdated) && ue(
          () => Oe(Z, V, v, W),
          _
        );
      } else {
        let v;
        const { el: O, props: F } = d, { bm: V, m: W, parent: N, root: Z, type: ee } = u, Me = Dt(d);
        ot(u, !1), V && Dn(V), !Me && (v = F && F.onVnodeBeforeMount) && Oe(v, N, d), ot(u, !0);
        {
          Z.ce && Z.ce._hasShadowRoot() && Z.ce._injectChildStyle(
            ee,
            u.parent ? u.parent.type : void 0
          );
          const Ee = u.subTree = Ks(u);
          I(
            null,
            Ee,
            h,
            y,
            u,
            _,
            g
          ), d.el = Ee.el;
        }
        if (W && ue(W, _), !Me && (v = F && F.onVnodeMounted)) {
          const Ee = d;
          ue(
            () => Oe(v, N, Ee),
            _
          );
        }
        (d.shapeFlag & 256 || N && Dt(N.vnode) && N.vnode.shapeFlag & 256) && u.a && ue(u.a, _), u.isMounted = !0, d = h = y = null;
      }
    };
    u.scope.on();
    const b = u.effect = new xo(R);
    u.scope.off();
    const m = u.update = b.run.bind(b), A = u.job = b.runIfDirty.bind(b);
    A.i = u, A.id = u.uid, b.scheduler = () => _s(A), ot(u, !0), m();
  }, J = (u, d, h) => {
    d.component = u;
    const y = u.vnode.props;
    u.vnode = d, u.next = null, al(u, d.props, y, h), gl(u, d.children, h), Ge(), Fs(u), qe();
  }, B = (u, d, h, y, _, g, C, R, b = !1) => {
    const m = u && u.children, A = u ? u.shapeFlag : 0, v = d.children, { patchFlag: O, shapeFlag: F } = d;
    if (O > 0) {
      if (O & 128) {
        Jt(
          m,
          v,
          h,
          y,
          _,
          g,
          C,
          R,
          b
        );
        return;
      } else if (O & 256) {
        tt(
          m,
          v,
          h,
          y,
          _,
          g,
          C,
          R,
          b
        );
        return;
      }
    }
    F & 8 ? (A & 16 && Ct(m, _, g), v !== m && f(h, v)) : A & 16 ? F & 16 ? Jt(
      m,
      v,
      h,
      y,
      _,
      g,
      C,
      R,
      b
    ) : Ct(m, _, g, !0) : (A & 8 && f(h, ""), F & 16 && U(
      v,
      h,
      y,
      _,
      g,
      C,
      R,
      b
    ));
  }, tt = (u, d, h, y, _, g, C, R, b) => {
    u = u || mt, d = d || mt;
    const m = u.length, A = d.length, v = Math.min(m, A);
    let O;
    for (O = 0; O < v; O++) {
      const F = d[O] = b ? ke(d[O]) : Te(d[O]);
      I(
        u[O],
        F,
        h,
        null,
        _,
        g,
        C,
        R,
        b
      );
    }
    m > A ? Ct(
      u,
      _,
      g,
      !0,
      !1,
      v
    ) : U(
      d,
      h,
      y,
      _,
      g,
      C,
      R,
      b,
      v
    );
  }, Jt = (u, d, h, y, _, g, C, R, b) => {
    let m = 0;
    const A = d.length;
    let v = u.length - 1, O = A - 1;
    for (; m <= v && m <= O; ) {
      const F = u[m], V = d[m] = b ? ke(d[m]) : Te(d[m]);
      if (Et(F, V))
        I(
          F,
          V,
          h,
          null,
          _,
          g,
          C,
          R,
          b
        );
      else
        break;
      m++;
    }
    for (; m <= v && m <= O; ) {
      const F = u[v], V = d[O] = b ? ke(d[O]) : Te(d[O]);
      if (Et(F, V))
        I(
          F,
          V,
          h,
          null,
          _,
          g,
          C,
          R,
          b
        );
      else
        break;
      v--, O--;
    }
    if (m > v) {
      if (m <= O) {
        const F = O + 1, V = F < A ? d[F].el : y;
        for (; m <= O; )
          I(
            null,
            d[m] = b ? ke(d[m]) : Te(d[m]),
            h,
            V,
            _,
            g,
            C,
            R,
            b
          ), m++;
      }
    } else if (m > O)
      for (; m <= v; )
        Se(u[m], _, g, !0), m++;
    else {
      const F = m, V = m, W = /* @__PURE__ */ new Map();
      for (m = V; m <= O; m++) {
        const pe = d[m] = b ? ke(d[m]) : Te(d[m]);
        pe.key != null && W.set(pe.key, m);
      }
      let N, Z = 0;
      const ee = O - V + 1;
      let Me = !1, Ee = 0;
      const St = new Array(ee);
      for (m = 0; m < ee; m++) St[m] = 0;
      for (m = F; m <= v; m++) {
        const pe = u[m];
        if (Z >= ee) {
          Se(pe, _, g, !0);
          continue;
        }
        let Pe;
        if (pe.key != null)
          Pe = W.get(pe.key);
        else
          for (N = V; N <= O; N++)
            if (St[N - V] === 0 && Et(pe, d[N])) {
              Pe = N;
              break;
            }
        Pe === void 0 ? Se(pe, _, g, !0) : (St[Pe - V] = m + 1, Pe >= Ee ? Ee = Pe : Me = !0, I(
          pe,
          d[Pe],
          h,
          null,
          _,
          g,
          C,
          R,
          b
        ), Z++);
      }
      const Ss = Me ? wl(St) : mt;
      for (N = Ss.length - 1, m = ee - 1; m >= 0; m--) {
        const pe = V + m, Pe = d[pe], Ms = d[pe + 1], Es = pe + 1 < A ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Ms.el || cr(Ms)
        ) : y;
        St[m] === 0 ? I(
          null,
          Pe,
          h,
          Es,
          _,
          g,
          C,
          R,
          b
        ) : Me && (N < 0 || m !== Ss[N] ? nt(Pe, h, Es, 2) : N--);
      }
    }
  }, nt = (u, d, h, y, _ = null) => {
    const { el: g, type: C, transition: R, children: b, shapeFlag: m } = u;
    if (m & 6) {
      nt(u.component.subTree, d, h, y);
      return;
    }
    if (m & 128) {
      u.suspense.move(d, h, y);
      return;
    }
    if (m & 64) {
      C.move(u, d, h, vt);
      return;
    }
    if (C === ge) {
      s(g, d, h);
      for (let v = 0; v < b.length; v++)
        nt(b[v], d, h, y);
      s(u.anchor, d, h);
      return;
    }
    if (C === Wn) {
      P(u, d, h);
      return;
    }
    if (y !== 2 && m & 1 && R)
      if (y === 0)
        R.persisted && !g[$n] ? s(g, d, h) : (R.beforeEnter(g), s(g, d, h), ue(() => R.enter(g), _));
      else {
        const { leave: v, delayLeave: O, afterLeave: F } = R, V = () => {
          u.ctx.isUnmounted ? o(g) : s(g, d, h);
        }, W = () => {
          const N = g._isLeaving || !!g[$n];
          g._isLeaving && g[$n](
            !0
            /* cancelled */
          ), R.persisted && !N ? V() : v(g, () => {
            V(), F && F();
          });
        };
        O ? O(g, V, W) : W();
      }
    else
      s(g, d, h);
  }, Se = (u, d, h, y = !1, _ = !1) => {
    const {
      type: g,
      props: C,
      ref: R,
      children: b,
      dynamicChildren: m,
      shapeFlag: A,
      patchFlag: v,
      dirs: O,
      cacheIndex: F,
      memo: V
    } = u;
    if (v === -2 && (_ = !1), R != null && (Ge(), Ft(R, null, h, u, !0), qe()), F != null && (d.renderCache[F] = void 0), A & 256) {
      d.ctx.deactivate(u);
      return;
    }
    const W = A & 1 && O, N = !Dt(u);
    let Z;
    if (N && (Z = C && C.onVnodeBeforeUnmount) && Oe(Z, d, u), A & 6)
      Vr(u.component, h, y);
    else {
      if (A & 128) {
        u.suspense.unmount(h, y);
        return;
      }
      W && st(u, null, d, "beforeUnmount"), A & 64 ? u.type.remove(
        u,
        d,
        h,
        vt,
        y
      ) : m && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !m.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (g !== ge || v > 0 && v & 64) ? Ct(
        m,
        d,
        h,
        !1,
        !0
      ) : (g === ge && v & 384 || !_ && A & 16) && Ct(b, d, h), y && Cs(u);
    }
    const ee = V != null && F == null;
    (N && (Z = C && C.onVnodeUnmounted) || W || ee) && ue(() => {
      Z && Oe(Z, d, u), W && st(u, null, d, "unmounted"), ee && (u.el = null);
    }, h);
  }, Cs = (u) => {
    const { type: d, el: h, anchor: y, transition: _ } = u;
    if (d === ge) {
      jr(h, y);
      return;
    }
    if (d === Wn) {
      M(u);
      return;
    }
    const g = () => {
      o(h), _ && !_.persisted && _.afterLeave && _.afterLeave();
    };
    if (u.shapeFlag & 1 && _ && !_.persisted) {
      const { leave: C, delayLeave: R } = _, b = () => C(h, g);
      R ? R(u.el, g, b) : b();
    } else
      g();
  }, jr = (u, d) => {
    let h;
    for (; u !== d; )
      h = w(u), o(u), u = h;
    o(d);
  }, Vr = (u, d, h) => {
    const { bum: y, scope: _, job: g, subTree: C, um: R, m: b, a: m } = u;
    Ws(b), Ws(m), y && Dn(y), _.stop(), g && (g.flags |= 8, Se(C, u, d, h)), R && ue(R, d), ue(() => {
      u.isUnmounted = !0;
    }, d);
  }, Ct = (u, d, h, y = !1, _ = !1, g = 0) => {
    for (let C = g; C < u.length; C++)
      Se(u[C], d, h, y, _);
  }, Yt = (u) => {
    if (u.shapeFlag & 6)
      return Yt(u.component.subTree);
    if (u.shapeFlag & 128)
      return u.suspense.next();
    const d = w(u.anchor || u.el), h = d && d[Di];
    return h ? w(h) : d;
  };
  let Tn = !1;
  const vs = (u, d, h) => {
    let y;
    u == null ? d._vnode && (Se(d._vnode, null, null, !0), y = d._vnode.component) : I(
      d._vnode || null,
      u,
      d,
      null,
      null,
      null,
      h
    ), d._vnode = u, Tn || (Tn = !0, Fs(y), Lo(), Tn = !1);
  }, vt = {
    p: I,
    um: Se,
    m: nt,
    r: Cs,
    mt: Xe,
    mc: U,
    pc: B,
    pbc: X,
    n: Yt,
    o: e
  };
  return {
    render: vs,
    hydrate: void 0,
    createApp: nl(vs)
  };
}
function kn({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function ot({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function yl(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function ir(e, t, n = !1) {
  const s = e.children, o = t.children;
  if (D(s) && D(o))
    for (let r = 0; r < s.length; r++) {
      const i = s[r];
      let l = o[r];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = o[r] = ke(o[r]), l.el = i.el), !n && l.patchFlag !== -2 && ir(i, l)), l.type === En && (l.patchFlag === -1 && (l = o[r] = ke(l)), l.el = i.el), l.type === Je && !l.el && (l.el = i.el);
    }
}
function wl(e) {
  const t = e.slice(), n = [0];
  let s, o, r, i, l;
  const c = e.length;
  for (s = 0; s < c; s++) {
    const a = e[s];
    if (a !== 0) {
      if (o = n[n.length - 1], e[o] < a) {
        t[s] = o, n.push(s);
        continue;
      }
      for (r = 0, i = n.length - 1; r < i; )
        l = r + i >> 1, e[n[l]] < a ? r = l + 1 : i = l;
      a < e[n[r]] && (r > 0 && (t[s] = n[r - 1]), n[r] = s);
    }
  }
  for (r = n.length, i = n[r - 1]; r-- > 0; )
    n[r] = i, i = t[i];
  return n;
}
function lr(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : lr(t);
}
function Ws(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function cr(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? cr(t.subTree) : null;
}
const ur = (e) => e.__isSuspense;
function xl(e, t) {
  t && t.pendingBranch ? D(e) ? t.effects.push(...e) : t.effects.push(e) : Pi(e);
}
const ge = /* @__PURE__ */ Symbol.for("v-fgt"), En = /* @__PURE__ */ Symbol.for("v-txt"), Je = /* @__PURE__ */ Symbol.for("v-cmt"), Wn = /* @__PURE__ */ Symbol.for("v-stc"), ct = [];
let me = null;
function he(e = !1) {
  ct.push(me = e ? null : []);
}
function fr() {
  ct.pop(), me = ct[ct.length - 1] || null;
}
let Nt = 1;
function Us(e, t = !1) {
  Nt += e, e < 0 && me && t && (me.hasOnce = !0);
}
function ar(e) {
  return e.dynamicChildren = Nt > 0 ? me || mt : null, fr(), Nt > 0 && me && me.push(e), e;
}
function _e(e, t, n, s, o, r) {
  return ar(
    gt(
      e,
      t,
      n,
      s,
      o,
      r,
      !0
    )
  );
}
function bl(e, t, n, s, o) {
  return ar(
    Be(
      e,
      t,
      n,
      s,
      o,
      !0
    )
  );
}
function dr(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Et(e, t) {
  return e.type === t.type && e.key === t.key;
}
const pr = ({ key: e }) => e ?? null, sn = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? Y(e) || /* @__PURE__ */ ne(e) || j(e) ? { i: De, r: e, k: t, f: !!n } : e : null);
function gt(e, t = null, n = null, s = 0, o = null, r = e === ge ? 0 : 1, i = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && pr(t),
    ref: t && sn(t),
    scopeId: Ko,
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
    shapeFlag: r,
    patchFlag: s,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: De
  };
  return l ? (pn(c, n), r & 128 && e.normalize(c)) : n && (c.shapeFlag |= Y(n) ? 8 : 16), Nt > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  me && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && me.push(c), c;
}
const Be = Rl;
function Rl(e, t = null, n = null, s = 0, o = null, r = !1) {
  if ((!e || e === zi) && (e = Je), dr(e)) {
    const l = bt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && pn(l, n), Nt > 0 && !r && me && (l.shapeFlag & 6 ? me[me.indexOf(e)] = l : me.push(l)), l.patchFlag = -2, l;
  }
  if (Dl(e) && (e = e.__vccOpts), t) {
    t = Cl(t);
    let { class: l, style: c } = t;
    l && !Y(l) && (t.class = Vt(l)), k(c) && (/* @__PURE__ */ ms(c) && !D(c) && (c = se({}, c)), t.style = jt(c));
  }
  const i = Y(e) ? 1 : ur(e) ? 128 : vn(e) ? 64 : k(e) ? 4 : j(e) ? 2 : 0;
  return gt(
    e,
    t,
    n,
    s,
    o,
    i,
    r,
    !0
  );
}
function Cl(e) {
  return e ? /* @__PURE__ */ ms(e) || er(e) ? se({}, e) : e : null;
}
function bt(e, t, n = !1, s = !1) {
  const { props: o, ref: r, patchFlag: i, children: l, transition: c } = e, a = t ? Sl(o || {}, t) : o, f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: a,
    key: a && pr(a),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? D(r) ? r.concat(sn(t)) : [r, sn(t)] : sn(t)
    ) : r,
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
    patchFlag: t && e.type !== ge ? i === -1 ? 16 : i | 16 : i,
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
    ssContent: e.ssContent && bt(e.ssContent),
    ssFallback: e.ssFallback && bt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && s && ys(
    f,
    c.clone(f)
  ), f;
}
function vl(e = " ", t = 0) {
  return Be(En, null, e, t);
}
function Un(e = "", t = !1) {
  return t ? (he(), bl(Je, null, e)) : Be(Je, null, e);
}
function Te(e) {
  return e == null || typeof e == "boolean" ? Be(Je) : D(e) ? Be(
    ge,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : dr(e) ? ke(e) : Be(En, null, String(e));
}
function ke(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : bt(e);
}
function pn(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (D(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), pn(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !er(t) ? t._ctx = De : o === 3 && De && (De.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (j(t)) {
    if (s & 65) {
      pn(e, { default: t });
      return;
    }
    t = { default: t, _ctx: De }, n = 32;
  } else
    t = String(t), s & 64 ? (n = 16, t = [vl(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function Sl(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const o in s)
      if (o === "class")
        t.class !== s.class && (t.class = Vt([t.class, s.class]));
      else if (o === "style")
        t.style = jt([t.style, s.style]);
      else if (mn(o)) {
        const r = t[o], i = s[o];
        i && r !== i && !(D(r) && r.includes(i)) ? t[o] = r ? [].concat(r, i) : i : i == null && r == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !_n(o) && (t[o] = i);
      } else o !== "" && (t[o] = s[o]);
  }
  return t;
}
function Oe(e, t, n, s = null) {
  Ce(e, t, 7, [
    n,
    s
  ]);
}
const Ml = Jo();
let El = 0;
function Pl(e, t, n) {
  const s = e.type, o = (t ? t.appContext : e.appContext) || Ml, r = {
    uid: El++,
    vnode: e,
    type: s,
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
    scope: new Yr(
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
    propsOptions: nr(s, o),
    emitsOptions: Yo(s, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: q,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: q,
    data: q,
    props: q,
    attrs: q,
    slots: q,
    refs: q,
    setupState: q,
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
  return r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = ol.bind(null, r), e.ce && e.ce(r), r;
}
let le = null;
const Ol = () => le || De;
let hn, kt;
{
  const e = wn(), t = (n, s) => {
    let o;
    return (o = e[n]) || (o = e[n] = []), o.push(s), (r) => {
      o.length > 1 ? o.forEach((i) => i(r)) : o[0](r);
    };
  };
  hn = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => le = n
  ), kt = t(
    "__VUE_SSR_SETTERS__",
    (n) => Wt = n
  );
}
const Gt = (e) => {
  const t = le;
  return hn(e), e.scope.on(), () => {
    e.scope.off(), hn(t);
  };
}, Bs = () => {
  le && le.scope.off(), hn(null);
};
function hr(e) {
  return e.vnode.shapeFlag & 4;
}
let Wt = !1;
function Il(e, t = !1, n = !1) {
  t && kt(t);
  const { props: s, children: o } = e.vnode, r = hr(e);
  fl(e, s, r, t), hl(e, o, n || t);
  const i = r ? Al(e, t) : void 0;
  return t && kt(!1), i;
}
function Al(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Ji);
  const { setup: s } = n;
  if (s) {
    Ge();
    const o = e.setupContext = s.length > 1 ? Fl(e) : null, r = Gt(e), i = Bt(
      s,
      e,
      0,
      [
        e.props,
        o
      ]
    ), l = fo(i);
    if (qe(), r(), (l || e.sp) && !Dt(e) && Uo(e), l) {
      if (i.then(Bs, Bs), t)
        return i.then((c) => {
          kt(!0);
          try {
            Gs(e, c, t);
          } finally {
            kt(!1);
          }
        }).catch((c) => {
          Cn(c, e, 0);
        });
      e.asyncDep = i;
    } else
      Gs(e, i);
  } else
    gr(e);
}
function Gs(e, t, n) {
  j(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : k(t) && (e.setupState = Ho(t)), gr(e);
}
function gr(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || He);
  {
    const o = Gt(e);
    Ge();
    try {
      Yi(e);
    } finally {
      qe(), o();
    }
  }
}
const Tl = {
  get(e, t) {
    return te(e, "get", ""), e[t];
  }
};
function Fl(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Tl),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Rs(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Ho(mi(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in Ht)
        return Ht[n](e);
    },
    has(t, n) {
      return n in t || n in Ht;
    }
  })) : e.proxy;
}
function Dl(e) {
  return j(e) && "__vccOpts" in e;
}
const Ke = (e, t) => /* @__PURE__ */ Ri(e, t, Wt), Hl = "3.5.42";
/**
* @vue/runtime-dom v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let ss;
const qs = typeof window < "u" && window.trustedTypes;
if (qs)
  try {
    ss = /* @__PURE__ */ qs.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const mr = ss ? (e) => ss.createHTML(e) : (e) => e, jl = "http://www.w3.org/2000/svg", Vl = "http://www.w3.org/1998/Math/MathML", Ne = typeof document < "u" ? document : null, zs = Ne && /* @__PURE__ */ Ne.createElement("template"), Ll = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const o = t === "svg" ? Ne.createElementNS(jl, e) : t === "mathml" ? Ne.createElementNS(Vl, e) : n ? Ne.createElement(e, { is: n }) : Ne.createElement(e);
    return e === "select" && s && s.multiple != null && o.setAttribute("multiple", s.multiple), o;
  },
  createText: (e) => Ne.createTextNode(e),
  createComment: (e) => Ne.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Ne.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, s, o, r) {
    const i = n ? n.previousSibling : t.lastChild;
    if (o && (o === r || o.nextSibling))
      for (; t.insertBefore(o.cloneNode(!0), n), !(o === r || !(o = o.nextSibling)); )
        ;
    else {
      zs.innerHTML = mr(
        s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e
      );
      const l = zs.content;
      if (s === "svg" || s === "mathml") {
        const c = l.firstChild;
        for (; c.firstChild; )
          l.appendChild(c.firstChild);
        l.removeChild(c);
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
}, $l = /* @__PURE__ */ Symbol("_vtc");
function Kl(e, t, n) {
  const s = e[$l];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Js = /* @__PURE__ */ Symbol("_vod"), Nl = /* @__PURE__ */ Symbol("_vsh"), kl = /* @__PURE__ */ Symbol(""), Wl = /(?:^|;)\s*display\s*:/;
function Ul(e, t, n) {
  const s = e.style, o = Y(n);
  let r = !1;
  if (n && !o) {
    if (t)
      if (Y(t))
        for (const i of t.split(";")) {
          const l = i.slice(0, i.indexOf(":")).trim();
          n[l] == null && Ot(s, l, "");
        }
      else
        for (const i in t)
          n[i] == null && Ot(s, i, "");
    for (const i in n) {
      i === "display" && (r = !0);
      const l = n[i];
      l != null ? Gl(
        e,
        i,
        !Y(t) && t ? t[i] : void 0,
        l
      ) || Ot(s, i, l) : Ot(s, i, "");
    }
  } else if (o) {
    if (t !== n) {
      const i = s[kl];
      i && (n += ";" + i), s.cssText = n, r = Wl.test(n);
    }
  } else t && e.removeAttribute("style");
  Js in e && (e[Js] = r ? s.display : "", e[Nl] && (s.display = "none"));
}
const en = /\s*!important$/;
function Ot(e, t, n) {
  if (D(n))
    n.forEach((s) => Ot(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    en.test(n) ? e.setProperty(t, n.replace(en, ""), "important") : e.setProperty(t, n);
  else {
    const s = Bl(e, t);
    en.test(n) ? e.setProperty(
      dt(s),
      n.replace(en, ""),
      "important"
    ) : e[s] = n;
  }
}
const Ys = ["Webkit", "Moz", "ms"], Bn = {};
function Bl(e, t) {
  const n = Bn[t];
  if (n)
    return n;
  let s = xe(t);
  if (s !== "filter" && s in e)
    return Bn[t] = s;
  s = ho(s);
  for (let o = 0; o < Ys.length; o++) {
    const r = Ys[o] + s;
    if (r in e)
      return Bn[t] = r;
  }
  return t;
}
function Gl(e, t, n, s) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && Y(s) && n === s;
}
const Xs = "http://www.w3.org/1999/xlink";
function Zs(e, t, n, s, o, r = zr(t)) {
  s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Xs, t.slice(6, t.length)) : e.setAttributeNS(Xs, t, n) : n == null || r && !mo(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    r ? "" : Ve(n) ? String(n) : n
  );
}
function Qs(e, t, n, s, o) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? mr(n) : n);
    return;
  }
  const r = e.tagName;
  if (t === "value" && r !== "PROGRESS" && // custom elements may use _value internally
  !r.includes("-")) {
    const l = r === "OPTION" ? e.getAttribute("value") || "" : e.value, c = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (l !== c || !("_value" in e)) && (e.value = c), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let i = !1;
  if (n === "" || n == null) {
    const l = typeof e[t];
    l === "boolean" ? n = mo(n) : n == null && l === "string" ? (n = "", i = !0) : l === "number" && (n = 0, i = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  i && e.removeAttribute(o || t);
}
function ql(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function zl(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const eo = /* @__PURE__ */ Symbol("_vei");
function Jl(e, t, n, s, o = null) {
  const r = e[eo] || (e[eo] = {}), i = r[t];
  if (s && i)
    i.value = s;
  else {
    const [l, c] = Zl(t);
    if (s) {
      const a = r[t] = tc(
        s,
        o
      );
      ql(e, l, a, c);
    } else i && (zl(e, l, i, c), r[t] = void 0);
  }
}
const Yl = /(Once|Passive|Capture)$/, Xl = /^on:?(?:Once|Passive|Capture)$/;
function Zl(e) {
  let t, n;
  for (; (n = e.match(Yl)) && !Xl.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : dt(e.slice(2)), t];
}
let Gn = 0;
const Ql = /* @__PURE__ */ Promise.resolve(), ec = () => Gn || (Ql.then(() => Gn = 0), Gn = Date.now());
function tc(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    const o = n.value;
    if (D(o)) {
      const r = s.stopImmediatePropagation;
      s.stopImmediatePropagation = () => {
        r.call(s), s._stopped = !0;
      };
      const i = o.slice(), l = [s];
      for (let c = 0; c < i.length && !s._stopped; c++) {
        const a = i[c];
        a && Ce(
          a,
          t,
          5,
          l
        );
      }
    } else
      Ce(
        o,
        t,
        5,
        [s]
      );
  };
  return n.value = e, n.attached = ec(), n;
}
const to = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, nc = (e, t, n, s, o, r) => {
  const i = o === "svg";
  t === "class" ? Kl(e, s, i) : t === "style" ? Ul(e, n, s) : mn(t) ? _n(t) || Jl(e, t, n, s, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : sc(e, t, s, i)) ? (Qs(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Zs(e, t, s, i, r, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (oc(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !Y(s))) ? Qs(e, xe(t), s, r, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), Zs(e, t, s, i));
};
function sc(e, t, n, s) {
  if (s)
    return !!(t === "innerHTML" || t === "textContent" || t in e && to(t) && j(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return to(t) && Y(n) ? !1 : t in e;
}
function oc(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const s = xe(t);
  return Array.isArray(n) ? n.some((o) => xe(o) === s) : Object.keys(n).some((o) => xe(o) === s);
}
const rc = ["ctrl", "shift", "alt", "meta"], ic = {
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
  exact: (e, t) => rc.some((n) => e[`${n}Key`] && !t.includes(n))
}, lc = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), s = t.join(".");
  return n[s] || (n[s] = (o, ...r) => {
    for (let i = 0; i < t.length; i++) {
      const l = ic[t[i]];
      if (l && l(o, t)) return;
    }
    return e(o, ...r);
  });
}, cc = /* @__PURE__ */ se({ patchProp: nc }, Ll);
let no;
function uc() {
  return no || (no = ml(cc));
}
const fc = (...e) => {
  const t = uc().createApp(...e), { mount: n } = t;
  return t.mount = (s) => {
    const o = dc(s);
    if (!o) return;
    const r = t._component;
    !j(r) && !r.render && !r.template && (r.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const i = n(o, !1, ac(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), i;
  }, t;
};
function ac(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function dc(e) {
  return Y(e) ? document.querySelector(e) : e;
}
function tn() {
  return !0;
}
const pc = Symbol("merge-proxy"), on = Symbol("merge-proxy-sources"), hc = {
  get(e, t, n) {
    return t === pc ? n : t === on ? e.sources : e.get(t);
  },
  has(e, t) {
    return e.has(t);
  },
  set: tn,
  deleteProperty: tn,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: tn,
      deleteProperty: tn
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function rn(e) {
  return e && typeof e == "object" && "value" in e ? e.value : e;
}
function os(...e) {
  const t = e.flatMap((n) => typeof n == "object" && n !== null && on in n && Array.isArray(n[on]) ? n[on] : [n]);
  return new Proxy({
    sources: t,
    get(n) {
      for (let s = t.length - 1; s >= 0; s--) {
        const o = rn(t[s])[n];
        if (o !== void 0) return o;
      }
    },
    has(n) {
      for (let s = t.length - 1; s >= 0; s--) if (n in rn(t[s])) return !0;
      return !1;
    },
    keys() {
      const n = [];
      for (const s of t) n.push(...Object.keys(rn(s)));
      return [...Array.from(new Set(n))];
    }
  }, hc);
}
function so(...e) {
  const t = {};
  for (let n of e)
    if (n = rn(n), !!n)
      for (const s of Reflect.ownKeys(n)) {
        const o = n[s];
        o !== void 0 && (t[s] = o);
      }
  return t;
}
function _r(e) {
  return typeof e == "function" ? e : (t) => {
    var n;
    return (n = e.next) == null ? void 0 : n.call(e, t);
  };
}
function gc(e) {
  return Object.assign(e, {
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: Ue(e, _r(t), { flush: "sync" }) })
  });
}
function mc(e) {
  return Object.assign(e, {
    set: (t) => {
      e.value = typeof t == "function" ? t(e.value) : t;
    },
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: Ue(e, _r(t), { flush: "sync" }) })
  });
}
function _c() {
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
    createReadonlyAtom: (t, n) => gc(Ke(() => t())),
    createWritableAtom: (t, n) => mc(/* @__PURE__ */ yi(t)),
    untrack: (t) => t(),
    batch: (t) => t()
  };
}
function Pn(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function ut(e) {
  if (Array.isArray(e)) return e.map(ut);
  if (e && typeof e == "object") {
    const t = Object.getPrototypeOf(e);
    if (t !== Object.prototype && t !== null) return e;
    const n = t === null ? fe() : {}, s = Object.keys(e);
    for (let o = 0; o < s.length; o++) {
      const r = s[o];
      Object.defineProperty(n, r, {
        configurable: !0,
        enumerable: !0,
        value: ut(e[r]),
        writable: !0
      });
    }
    return n;
  }
  return e;
}
function fe() {
  return /* @__PURE__ */ Object.create(null);
}
function qt(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function yc(e, t) {
  return (n) => {
    var s;
    (((s = t.options.atoms) == null ? void 0 : s[e]) ?? t.baseAtoms[e]).set((o) => Pn(n, o));
  };
}
function oo(e) {
  if (typeof e != "object" || e === null) return !1;
  if (Array.isArray(e)) return !0;
  const t = Object.getPrototypeOf(e);
  return t === Object.prototype || t === null;
}
function ro(e) {
  return Reflect.ownKeys(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
const wc = 3;
function xc(e, t) {
  return yr(e, t, wc);
}
function yr(e, t, n) {
  if (Object.is(e, t)) return !0;
  if (n <= 0 || !oo(e) || !oo(t) || (Array.isArray(e) || Array.isArray(t)) && (!Array.isArray(e) || !Array.isArray(t) || e.length !== t.length))
    return !1;
  const s = ro(e), o = ro(t);
  if (s.length !== o.length) return !1;
  const r = e, i = t;
  for (let l = 0; l < s.length; l++) {
    const c = s[l];
    if (!Object.prototype.propertyIsEnumerable.call(t, c) || !yr(r[c], i[c], n - 1)) return !1;
  }
  return !0;
}
function On(e, t, n, s = xc) {
  const o = `on${t.charAt(0).toUpperCase()}${t.slice(1)}Change`, r = e.options[o];
  r && r((i) => {
    const l = Pn(n, i);
    return s(i, l) ? i : l;
  });
}
function bc(e, t) {
  const n = [], s = (o) => {
    o.forEach((r) => {
      n.push(r);
      const i = t(r);
      i.length && s(i);
    });
  };
  return s(e), n;
}
const Rc = ({ fn: e, memoDeps: t, onAfterCompare: n, onAfterUpdate: s, onBeforeCompare: o, onBeforeUpdate: r }) => {
  let i = [], l;
  return (a) => {
    o == null || o();
    const f = t == null ? void 0 : t(a);
    let p = !f || f.length !== (i == null ? void 0 : i.length);
    if (!p && f) {
      for (let w = 0; w < f.length; w++) if (f[w] !== i[w]) {
        p = !0;
        break;
      }
    }
    return n == null || n(p), p && (i = f, r == null || r(), l = e(...f ?? []), s == null || s(l)), l;
  };
};
function Cc(e) {
  let t = !1;
  return () => {
    if (!t) {
      t = !0;
      return;
    }
    e();
  };
}
function In({ feature: e, fnName: t, objectId: n, onAfterUpdate: s, table: o, ...r }) {
  const i = () => {
    if (!s) return;
    const { schedule: c, untrack: a } = o._reactivity;
    c(() => a(() => s()));
  };
  return Rc({
    ...r,
    ...{ onAfterUpdate: () => {
      i();
    } }
  });
}
function wr(e, t = "_") {
  const [n, s] = e.split(t);
  return {
    fnKey: s,
    fnName: `${n}.${s}`,
    parentName: n
  };
}
function Rt(e, t, n) {
  for (const [s, { fn: o, memoDeps: r }] of Object.entries(n)) {
    const { fnKey: i, fnName: l } = wr(s);
    t[i] = r ? In({
      memoDeps: r,
      fn: o,
      fnName: l,
      table: t,
      feature: e
    }) : o;
  }
}
function zt(e, t, n, s) {
  for (const [o, { fn: r, memoDeps: i }] of Object.entries(s)) {
    const { fnKey: l, fnName: c } = wr(o);
    if (i) {
      const a = `_memo_${l}`;
      t[l] = function(...f) {
        if (!this[a]) {
          const p = this;
          this[a] = In({
            memoDeps: (w) => i(p, w),
            fn: (...w) => r(p, ...w),
            fnName: c,
            objectId: p.id,
            table: n,
            feature: e
          });
        }
        return this[a](...f);
      };
    } else t[l] = function(...a) {
      return r(this, ...a);
    };
  }
}
function je(e, t, n, ...s) {
  var o;
  return ((o = e[t]) == null ? void 0 : o.call(e, ...s)) ?? n(e, ...s);
}
function vc(e) {
  return e.row.getValue(e.column.id);
}
function Sc(e) {
  return e.getValue() ?? e.table.options.renderFallbackValue;
}
function Mc(e) {
  return {
    table: e.table,
    column: e.column,
    row: e.row,
    cell: e,
    getValue: () => e.getValue(),
    renderValue: () => e.renderValue()
  };
}
const Ec = { assignCellPrototype: (e, t) => {
  zt("coreCellsFeature", e, t, {
    cell_getValue: { fn: (n) => vc(n) },
    cell_renderValue: { fn: (n) => Sc(n) },
    cell_getContext: {
      fn: (n) => Mc(n),
      memoDeps: (n) => [n]
    }
  });
} };
function Pc(e) {
  var t, n;
  if (!e._headerPrototype) {
    e._headerPrototype = { table: e };
    const s = Object.values(e._features);
    for (let o = 0; o < s.length; o++) (n = (t = s[o]).assignHeaderPrototype) == null || n.call(t, e._headerPrototype, e);
  }
  return e._headerPrototype;
}
function xr(e, t, n) {
  const s = Pc(e), o = Object.create(s);
  o.colSpan = 0, o.column = t, o.depth = n.depth, o.headerGroup = null, o.id = n.id ?? t.id, o.index = n.index, o.isPlaceholder = !!n.isPlaceholder, o.placeholderId = n.placeholderId, o.rowSpan = 0, o.subHeaders = [];
  const r = e._headerInstanceInitFns;
  for (let i = 0; i < r.length; i++) r[i](o);
  return o;
}
function Oc() {
  return {
    start: [],
    end: []
  };
}
function ft(e) {
  var s;
  const t = (s = e.table.atoms.columnVisibility) == null ? void 0 : s.get();
  if (!t) return !0;
  const n = e.columns;
  return n.length ? n.some((o) => je(o, "getIsVisible", ft)) : (qt(t, e.id) ? t[e.id] : void 0) ?? !0;
}
function Ic(e) {
  return e.getAllLeafColumns().filter((t) => je(t, "getIsVisible", ft));
}
function br(e, t = 1) {
  let n = t;
  for (let s = 0; s < e.length; s++) {
    const o = e[s];
    je(o, "getIsVisible", ft) && o.columns.length && (n = Math.max(n, br(o.columns, t + 1)));
  }
  return n;
}
function Ac(e, t) {
  return String(t);
}
function Tc(e, t, n, s) {
  let o = e ?? "";
  return t && (o = o ? `${o}_${t}` : String(t)), n && (o = o ? `${o}_${n}` : n), s && (o = o ? `${o}_${s}` : s), o;
}
function Fc(e, t) {
  let n = 0;
  for (let s = 0; s < e.length; s++) e[s].column === t && n++;
  return n;
}
function Rr(e, t, n, s, o, r) {
  const i = {
    depth: t,
    id: Ac(s, t),
    headers: []
  }, l = [];
  for (let c = 0; c < e.length; c++) {
    if (!(c in e)) continue;
    const a = e[c], f = l[l.length - 1], p = a.column.depth === i.depth;
    let w, S = !1;
    if (p && a.column.parent ? w = a.column.parent : (w = a.column, S = !0), f && f.column === w) f.subHeaders.push(a);
    else {
      const H = xr(n, w, {
        id: Tc(s, t, w.id, a.id),
        isPlaceholder: S,
        placeholderId: S ? String(Fc(l, w)) : void 0,
        depth: t,
        index: l.length
      });
      H.subHeaders.push(a), l.push(H);
    }
    i.headers.push(a), a.headerGroup = i;
  }
  for (let c = 0; c < r.length; c++) r[c](i);
  o.push(i), t > 0 && Rr(l, t - 1, n, s, o, r);
}
function Cr(e) {
  for (let t = 0; t < e.length; t++) {
    const n = e[t];
    if (!je(n.column, "getIsVisible", ft)) continue;
    let s = 0;
    if (n.subHeaders.length) {
      Cr(n.subHeaders);
      for (let o = 0; o < n.subHeaders.length; o++) {
        const r = n.subHeaders[o];
        je(r.column, "getIsVisible", ft) && (s += r.colSpan);
      }
    } else s = 1;
    if (n.colSpan = s, n.isPlaceholder && n.subHeaders.length === 1 && n.subHeaders[0].column === n.column) {
      let o = 1, r = n.subHeaders[0];
      for (; r; )
        r.rowSpan = 0, o++, r = r.subHeaders.length === 1 && r.subHeaders[0].column === n.column ? r.subHeaders[0] : void 0;
      n.rowSpan = o;
    } else n.rowSpan = 1;
  }
}
function io(e, t, n, s) {
  var c;
  const o = br(e), r = [], i = n._headerGroupInstanceInitFns, l = new Array(t.length);
  for (let a = 0; a < t.length; a++)
    a in t && (l[a] = xr(n, t[a], {
      depth: o,
      index: a
    }));
  return Rr(l, o - 1, n, s, r, i), r.reverse(), Cr(((c = r[0]) == null ? void 0 : c.headers) ?? []), r;
}
function Dc(e) {
  var t, n;
  if (!e._columnPrototype) {
    e._columnPrototype = { table: e };
    const s = Object.values(e._features);
    for (let o = 0; o < s.length; o++) (n = (t = s[o]).assignColumnPrototype) == null || n.call(t, e._columnPrototype, e);
  }
  return e._columnPrototype;
}
function Hc(e, t, n, s) {
  const o = {
    ...e.getDefaultColumnDef(),
    ...t
  }, r = o.accessorKey, i = r === void 0 ? void 0 : String(r), l = o.id ?? (i == null ? void 0 : i.replaceAll(".", "_")) ?? (typeof o.header == "string" ? o.header : void 0);
  let c;
  if (o.accessorFn) c = o.accessorFn;
  else if (r !== void 0) if (typeof r == "string" && r.includes(".")) {
    const w = r.split(".");
    c = (S) => {
      let H = S;
      for (let I = 0; I < w.length; I++) {
        const z = w[I];
        H = H == null ? void 0 : H[z];
      }
      return H;
    };
  } else c = (w) => w[o.accessorKey];
  if (!l)
    throw new Error();
  const a = Dc(e), f = Object.create(a);
  f.accessorFn = c, f.columnDef = o, f.columns = [], f.depth = n, f.id = `${String(l)}`, f.parent = s;
  const p = e._columnInstanceInitFns;
  for (let w = 0; w < p.length; w++) p[w](f);
  return f;
}
function vr(e) {
  var n;
  const t = (n = e.atoms.columnOrder) == null ? void 0 : n.get();
  return (s) => {
    let o = [];
    if (!(t != null && t.length)) o = s;
    else {
      const r = /* @__PURE__ */ new Map();
      for (let i = 0; i < s.length; i++) {
        const l = s[i];
        r.set(l.id, l);
      }
      for (let i = 0; i < t.length; i++) {
        const l = t[i], c = r.get(l);
        c && (o.push(c), r.delete(l));
      }
      for (let i = 0; i < s.length; i++) {
        const l = s[i];
        r.has(l.id) && o.push(l);
      }
    }
    return jc(e, o);
  };
}
function jc(e, t) {
  var l;
  const n = ((l = e.atoms.grouping) == null ? void 0 : l.get()) ?? [], { groupedColumnMode: s } = e.options;
  if (!n.length || !s) return t;
  const o = t.filter((c) => !n.includes(c.id));
  if (s === "remove") return o;
  const r = /* @__PURE__ */ new Map();
  for (let c = 0; c < t.length; c++) {
    const a = t[c];
    r.set(a.id, a);
  }
  const i = [];
  for (let c = 0; c < n.length; c++) {
    const a = r.get(n[c]);
    a && i.push(a);
  }
  return [...i, ...o];
}
function Vc(e) {
  return [e, ...e.columns.flatMap((t) => t.getFlatColumns())];
}
function Lc(e) {
  if (e.columns.length) {
    const t = e.columns.flatMap((n) => n.getLeafColumns());
    return je(e.table, "getOrderColumns", vr)(t);
  }
  return [e];
}
function $c(e) {
  return {
    header: (t) => {
      const n = t.header.column.columnDef;
      return n.accessorKey ? n.accessorKey : n.accessorFn ? n.id : null;
    },
    cell: (t) => {
      var n, s;
      return ((s = (n = t.renderValue()) == null ? void 0 : n.toString) == null ? void 0 : s.call(n)) ?? null;
    },
    ...Object.values(e._features).reduce((t, n) => {
      var s;
      return Object.assign(t, (s = n.getDefaultColumnDef) == null ? void 0 : s.call(n));
    }, {}),
    ...e.options.defaultColumn
  };
}
function Sr(e, t, n, s = 0) {
  const o = new Array(t.length);
  for (let r = 0; r < t.length; r++) {
    if (!(r in t)) continue;
    const i = t[r], l = Hc(e, i, s, n), c = i;
    l.columns = c.columns ? Sr(e, c.columns, l, s + 1) : [], o[r] = l;
  }
  return o;
}
function Kc(e) {
  return Sr(e, e.options.columns);
}
function Nc(e) {
  return e.getAllColumns().flatMap((t) => t.getFlatColumns());
}
function kc(e) {
  const t = fe(), n = e.getAllFlatColumns();
  for (let s = 0; s < n.length; s++) {
    const o = n[s];
    t[o.id] = o;
  }
  return t;
}
function Wc(e) {
  const t = e.getAllColumns().flatMap((n) => n.getLeafColumns());
  return je(e, "getOrderColumns", vr)(t);
}
function Uc(e) {
  const t = fe(), n = e.getAllLeafColumns();
  for (let s = 0; s < n.length; s++) {
    const o = n[s];
    t[o.id] = o;
  }
  return t;
}
function Bc(e, t) {
  return e.getAllFlatColumnsById()[t];
}
const Gc = {
  assignColumnPrototype: (e, t) => {
    zt("coreColumnsFeature", e, t, {
      column_getFlatColumns: {
        fn: (n) => Vc(n),
        memoDeps: (n) => [n.table.options.columns]
      },
      column_getLeafColumns: {
        fn: (n) => Lc(n),
        memoDeps: (n) => {
          var s, o;
          return [
            (s = n.table.atoms.columnOrder) == null ? void 0 : s.get(),
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
        fn: () => $c(e),
        memoDeps: () => [e.options.defaultColumn]
      },
      table_getAllColumns: {
        fn: () => Kc(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumns: {
        fn: () => Nc(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumnsById: {
        fn: () => kc(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllLeafColumns: {
        fn: () => Wc(e),
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
        fn: () => Uc(e),
        memoDeps: () => [e.getAllLeafColumns()]
      },
      table_getColumn: { fn: (t) => Bc(e, t) }
    });
  }
};
function Mr(e, t) {
  for (let n = 0; n < e.subHeaders.length; n++) Mr(e.subHeaders[n], t);
  t.push(e);
}
function qc(e) {
  const t = [];
  return Mr(e, t), t;
}
function zc(e) {
  return {
    column: e.column,
    header: e,
    table: e.column.table
  };
}
function Jc(e) {
  var a;
  const { start: t, end: n } = ((a = e.atoms.columnPinning) == null ? void 0 : a.get()) ?? Oc(), s = e.getAllColumns(), o = je(e, "getVisibleLeafColumns", Ic);
  if (!t.length && !n.length) return io(s, o, e);
  const r = e.getAllLeafColumnsById(), i = [];
  for (let f = 0; f < t.length; f++) {
    const p = r[t[f]];
    p && je(p, "getIsVisible", ft) && i.push(p);
  }
  const l = [];
  for (let f = 0; f < n.length; f++) {
    const p = r[n[f]];
    p && je(p, "getIsVisible", ft) && l.push(p);
  }
  const c = o.filter((f) => !t.includes(f.id) && !n.includes(f.id));
  return io(s, [
    ...i,
    ...c,
    ...l
  ], e);
}
function Yc(e) {
  return [...e.getHeaderGroups()].reverse();
}
function Xc(e) {
  const t = e.getHeaderGroups(), n = [];
  for (let s = 0; s < t.length; s++) {
    const o = t[s].headers;
    for (let r = 0; r < o.length; r++) n.push(o[r]);
  }
  return n;
}
function Zc(e) {
  var s;
  const t = ((s = e.getHeaderGroups()[0]) == null ? void 0 : s.headers) ?? [], n = [];
  for (let o = 0; o < t.length; o++) {
    const r = t[o].getLeafHeaders();
    for (let i = 0; i < r.length; i++) n.push(r[i]);
  }
  return n;
}
const Qc = {
  assignHeaderPrototype: (e, t) => {
    zt("coreHeadersFeature", e, t, {
      header_getLeafHeaders: {
        fn: (n) => qc(n),
        memoDeps: (n) => [n.column.table.options.columns]
      },
      header_getContext: {
        fn: (n) => zc(n),
        memoDeps: (n) => [n.column.table.options.columns]
      }
    });
  },
  constructTableAPIs: (e) => {
    Rt("coreHeadersFeature", e, {
      table_getHeaderGroups: {
        fn: () => Jc(e),
        memoDeps: () => {
          var t, n, s, o;
          return [
            e.options.columns,
            (t = e.atoms.columnOrder) == null ? void 0 : t.get(),
            (n = e.atoms.grouping) == null ? void 0 : n.get(),
            (s = e.atoms.columnPinning) == null ? void 0 : s.get(),
            (o = e.atoms.columnVisibility) == null ? void 0 : o.get(),
            e.options.groupedColumnMode
          ];
        }
      },
      table_getFooterGroups: {
        fn: () => Yc(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getFlatHeaders: {
        fn: () => Xc(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getLeafHeaders: {
        fn: () => Zc(e),
        memoDeps: () => [e.getHeaderGroups()]
      }
    });
  }
};
function eu(e) {
  var t, n;
  if (!e._rowPrototype) {
    e._rowPrototype = { table: e };
    const s = Object.values(e._features);
    for (let o = 0; o < s.length; o++) (n = (t = s[o]).assignRowPrototype) == null || n.call(t, e._rowPrototype, e);
  }
  return e._rowPrototype;
}
const tu = (e, t, n, s, o, r, i) => {
  const l = eu(e), c = Object.create(l);
  c._displayIndexCache = -1, c._uniqueValuesCache = fe(), c._valuesCache = fe(), c.depth = o, c.id = t, c.index = s, c.original = n, c.parentId = i, c.subRows = [];
  const a = e._rowInstanceInitFns;
  for (let f = 0; f < a.length; f++) a[f](c);
  return c;
};
function nu() {
  return [];
}
function su(e, t) {
  On(e, "cellSelection", ut(e.initialState.cellSelection) ?? nu());
}
function ou(e) {
  e.atoms.cellSelection && (e.options.autoResetAll ?? e.options.autoResetCellSelection ?? !0) && e._reactivity.schedule(() => su(e));
}
function ru() {
  return fe();
}
function Er(e) {
  e.atoms.expanded && (e.options.autoResetAll ?? e.options.autoResetExpanded ?? !e.options.manualExpanding) && e._reactivity.schedule(() => Or(e));
}
function gn(e, t) {
  var n, s;
  (s = (n = e.options).onExpandedChange) == null || s.call(n, t);
}
function Pr(e, t) {
  var s;
  const n = ((s = e.atoms.expanded) == null ? void 0 : s.get()) ?? {};
  if (t ?? !Ar(e)) {
    if (n === !0 || !Ir(e)) return;
    gn(e, !0);
  } else {
    if (n !== !0 && !Object.keys(n).length) return;
    gn(e, fe());
  }
}
function Or(e, t) {
  const n = e.initialState.expanded;
  On(e, "expanded", t ? fe() : n === !0 ? !0 : Object.assign(fe(), ut(n ?? {})));
}
function Ir(e) {
  return e.getPrePaginatedRowModel().flatRows.some((t) => at(t));
}
function iu(e) {
  return (t) => {
    Pr(e);
  };
}
function lu(e) {
  var n;
  const t = ((n = e.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return t === !0 || Object.values(t).some(Boolean);
}
function Ar(e) {
  var s;
  const t = ((s = e.atoms.expanded) == null ? void 0 : s.get()) ?? {};
  if (t === !0) return !0;
  if (!Object.keys(t).length) return !1;
  const n = e.getRowModel().flatRows.filter((o) => at(o));
  return !(!n.length || n.some((o) => !An(o)));
}
function cu(e) {
  var s;
  let t = 0;
  const n = (s = e.atoms.expanded) == null ? void 0 : s.get();
  return (n === !0 ? Object.values(e.getRowModel().rowsById).filter((o) => at(o)).map((o) => o.id) : Object.keys(n ?? {})).forEach((o) => {
    const r = o.split(".");
    t = Math.max(t, r.length);
  }), t;
}
function Tr(e, t) {
  var r;
  const n = ((r = e.table.atoms.expanded) == null ? void 0 : r.get()) ?? {}, s = n === !0 || rs(n, e.id), o = t ?? !s;
  o !== s && (o && !at(e) || gn(e.table, (i) => {
    const l = i === !0 ? !0 : rs(i, e.id);
    let c = fe();
    if (i === !0 ? Object.values(e.table.getRowModel().rowsById).forEach((a) => {
      at(a) && (c[a.id] = !0);
    }) : c = Object.assign(fe(), i), !l && o)
      return c[e.id] = !0, c;
    if (l && !o) {
      const a = fe(), f = Object.keys(c);
      for (let p = 0; p < f.length; p++) {
        const w = f[p];
        w !== e.id && c[w] && (a[w] = !0);
      }
      return a;
    }
    return i;
  }));
}
function An(e) {
  var n, s, o;
  const t = ((n = e.table.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return !!(((o = (s = e.table.options).getIsRowExpanded) == null ? void 0 : o.call(s, e)) ?? (t === !0 || rs(t, e.id)));
}
function rs(e, t) {
  return !!(e && e !== !0 && qt(e, t) && e[t]);
}
function at(e) {
  var t, n;
  return ((n = (t = e.table.options).getRowCanExpand) == null ? void 0 : n.call(t, e)) ?? ((e.table.options.enableExpanding ?? !0) && !!e.subRows.length);
}
function uu(e) {
  let t = !0, n = e;
  for (; t && n.parentId; )
    n = e.table.getRow(n.parentId, !0), t = An(n);
  return t;
}
function fu(e) {
  const t = at(e);
  return () => {
    t && Tr(e);
  };
}
const is = 0;
function au(e) {
  var t, n;
  if (e.options.autoResetAll ?? e.options.autoResetPageIndex ?? !e.options.manualPagination) {
    if ((((n = (t = e.atoms.pagination) == null ? void 0 : t.get()) == null ? void 0 : n.pageIndex) ?? is) === is) return;
    hu(e);
  }
}
function du(e, t) {
  On(e, "pagination", t);
}
function pu(e, t) {
  du(e, (n) => {
    let s = Pn(t, n.pageIndex);
    const o = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
    return s = Math.max(0, Math.min(s, o)), {
      ...n,
      pageIndex: s
    };
  });
}
function hu(e, t) {
  pu(e, is);
}
function gu(e, t) {
  On(e, "sorting", t);
}
function mu(e, t) {
  gu(e, ut(e.initialState.sorting ?? []));
}
function _u(e) {
  e.atoms.sorting && (e.options.autoResetAll ?? e.options.autoResetSorting ?? !1) && mu(e);
}
function Fr() {
  return (e) => In({
    feature: "coreRowModelsFeature",
    table: e,
    fnName: "table.getCoreRowModel",
    memoDeps: () => [e.options.data],
    fn: () => yu(e, e.options.data),
    onAfterUpdate: Cc(() => {
      Er(e), au(e), _u(e), ou(e);
    })
  });
}
function Dr(e, t, n, s = 0, o) {
  var i;
  const r = [];
  for (let l = 0; l < n.length; l++) {
    const c = n[l], a = tu(e, e.getRowId(c, l, o), c, l, s, void 0, o == null ? void 0 : o.id);
    t.flatRows.push(a), t.rowsById[a.id] = a, r.push(a), e.options.getSubRows && (a.originalSubRows = e.options.getSubRows(c, l), (i = a.originalSubRows) != null && i.length && (a.subRows = Dr(e, t, a.originalSubRows, s + 1, a)));
  }
  return r;
}
function yu(e, t) {
  const n = {
    rows: [],
    flatRows: [],
    rowsById: fe()
  };
  return n.rows = Dr(e, n, t), n;
}
function wu(e) {
  var t, n;
  return e._rowModels.coreRowModel || (e._rowModels.coreRowModel = ((n = (t = e.options.features).coreRowModel) == null ? void 0 : n.call(t, e)) ?? Fr()(e)), e._rowModels.coreRowModel();
}
function xu(e) {
  return e.getCoreRowModel();
}
function bu(e) {
  var t, n;
  return e._rowModels.filteredRowModel || (e._rowModels.filteredRowModel = (n = (t = e.options.features).filteredRowModel) == null ? void 0 : n.call(t, e)), e.options.manualFiltering || !e._rowModels.filteredRowModel ? e.getPreFilteredRowModel() : e._rowModels.filteredRowModel();
}
function Ru(e) {
  return e.getFilteredRowModel();
}
function Cu(e) {
  var t, n;
  return e._rowModels.groupedRowModel || (e._rowModels.groupedRowModel = (n = (t = e.options.features).groupedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualGrouping || !e._rowModels.groupedRowModel ? e.getPreGroupedRowModel() : e._rowModels.groupedRowModel();
}
function vu(e) {
  return e.getGroupedRowModel();
}
function Su(e) {
  var t, n;
  return e._rowModels.sortedRowModel || (e._rowModels.sortedRowModel = (n = (t = e.options.features).sortedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualSorting || !e._rowModels.sortedRowModel ? e.getPreSortedRowModel() : e._rowModels.sortedRowModel();
}
function Mu(e) {
  return e.getSortedRowModel();
}
function Eu(e) {
  var t, n;
  return e._rowModels.expandedRowModel || (e._rowModels.expandedRowModel = (n = (t = e.options.features).expandedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualExpanding || !e._rowModels.expandedRowModel ? e.getPreExpandedRowModel() : e._rowModels.expandedRowModel();
}
function Pu(e) {
  return e.getExpandedRowModel();
}
function Ou(e) {
  var t, n;
  return e._rowModels.paginatedRowModel || (e._rowModels.paginatedRowModel = (n = (t = e.options.features).paginatedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualPagination || !e._rowModels.paginatedRowModel ? e.getPrePaginatedRowModel() : e._rowModels.paginatedRowModel();
}
function Iu(e) {
  return e.getPaginatedRowModel();
}
const Au = { constructTableAPIs: (e) => {
  Rt("coreRowModelsFeature", e, {
    table_getCoreRowModel: { fn: () => wu(e) },
    table_getPreFilteredRowModel: { fn: () => xu(e) },
    table_getFilteredRowModel: { fn: () => bu(e) },
    table_getPreGroupedRowModel: { fn: () => Ru(e) },
    table_getGroupedRowModel: { fn: () => Cu(e) },
    table_getPreSortedRowModel: { fn: () => vu(e) },
    table_getSortedRowModel: { fn: () => Su(e) },
    table_getPreExpandedRowModel: { fn: () => Mu(e) },
    table_getExpandedRowModel: { fn: () => Eu(e) },
    table_getPrePaginatedRowModel: { fn: () => Pu(e) },
    table_getPaginatedRowModel: { fn: () => Ou(e) },
    table_getRowModel: { fn: () => Iu(e) }
  });
} };
function Tu(e) {
  var t, n;
  if (!e._cellPrototype) {
    e._cellPrototype = { table: e };
    const s = Object.values(e._features);
    for (let o = 0; o < s.length; o++) (n = (t = s[o]).assignCellPrototype) == null || n.call(t, e._cellPrototype, e);
  }
  return e._cellPrototype;
}
function Fu(e, t, n) {
  const s = Tu(n), o = Object.create(s);
  o.column = e, o.id = `${t.id}_${e.id}`, o.row = t;
  const r = n._cellInstanceInitFns;
  for (let i = 0; i < r.length; i++) r[i](o);
  return o;
}
function Du(e) {
  const t = e.table.getRowsInDisplayOrder(), n = e._displayIndexCache;
  return t[n] === e ? n : -1;
}
function Hu(e) {
  const t = e.getPrePaginatedRowModel().rows;
  if (e.options.paginateExpandedRows === !1) {
    const n = [], s = (o) => {
      var r;
      o._displayIndexCache = n.length, n.push(o), o.subRows.length && ((r = o.getIsExpanded) != null && r.call(o)) && o.subRows.forEach(s);
    };
    return t.forEach(s), n;
  }
  for (let n = 0; n < t.length; n++) t[n]._displayIndexCache = n;
  return t;
}
function ju(e, t) {
  if (qt(e._valuesCache, t)) return e._valuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return e._valuesCache[t] = n.accessorFn(e.original, e.index), e._valuesCache[t];
}
function Vu(e, t) {
  if (qt(e._uniqueValuesCache, t)) return e._uniqueValuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return n.columnDef.getUniqueValues ? (e._uniqueValuesCache[t] = n.columnDef.getUniqueValues(e.original, e.index), e._uniqueValuesCache[t]) : (e._uniqueValuesCache[t] = [e.getValue(t)], e._uniqueValuesCache[t]);
}
function Lu(e, t) {
  return e.getValue(t) ?? e.table.options.renderFallbackValue;
}
function $u(e) {
  return bc(e.subRows, (t) => t.subRows);
}
function Ku(e) {
  const t = e.getCoreRowModel().flatRows;
  let n = 0;
  for (let s = 0; s < t.length; s++) n = Math.max(n, t[s].depth);
  return n;
}
function Nu(e) {
  if (e.parentId)
    return e.table.getCoreRowModel().rowsById[e.parentId] ?? e.table.getRow(e.parentId, !0);
}
function ku(e) {
  const t = [];
  let n = e;
  for (; ; ) {
    const s = n.getParentRow();
    if (!s) break;
    t.push(s), n = s;
  }
  return t.reverse();
}
function Wu(e) {
  const t = e.table.getAllLeafColumns();
  let n = e._cellsCache;
  n || (n = e._cellsCache = /* @__PURE__ */ new WeakMap());
  const s = new Array(t.length);
  for (let o = 0; o < t.length; o++) {
    const r = t[o];
    let i = n.get(r);
    i || (i = Fu(r, e, e.table), n.set(r, i)), s[o] = i;
  }
  return s;
}
function Uu(e) {
  const t = fe(), n = e.getAllCells();
  for (let s = 0; s < n.length; s++) {
    const o = n[s];
    t[o.column.id] = o;
  }
  return t;
}
function Bu(e, t, n, s) {
  var o, r;
  return ((r = (o = t.options).getRowId) == null ? void 0 : r.call(o, e, n, s)) ?? (s ? `${s.id}.${n}` : String(n));
}
function Gu(e, t, n) {
  let s = (n ? e.getPrePaginatedRowModel() : e.getRowModel()).rowsById[t];
  if (!s && (s = e.getCoreRowModel().rowsById[t], !s))
    throw new Error();
  return s;
}
const qu = {
  assignRowPrototype: (e, t) => {
    zt("coreRowsFeature", e, t, {
      row_getDisplayIndex: { fn: (n) => Du(n) },
      row_getAllCellsByColumnId: {
        fn: (n) => Uu(n),
        memoDeps: (n) => [n.getAllCells()]
      },
      row_getAllCells: {
        fn: (n) => Wu(n),
        memoDeps: (n) => [n.table.getAllLeafColumns()]
      },
      row_getLeafRows: {
        fn: (n) => $u(n),
        memoDeps: (n) => [n.subRows]
      },
      row_getParentRow: { fn: (n) => Nu(n) },
      row_getParentRows: { fn: (n) => ku(n) },
      row_getUniqueValues: { fn: (n, s) => Vu(n, s) },
      row_getValue: { fn: (n, s) => ju(n, s) },
      row_renderValue: { fn: (n, s) => Lu(n, s) }
    });
  },
  constructTableAPIs: (e) => {
    Rt("coreRowsFeature", e, {
      table_getRowsInDisplayOrder: {
        fn: () => Hu(e),
        memoDeps: () => {
          var t;
          return [
            e.getPrePaginatedRowModel().rows,
            e.options.paginateExpandedRows,
            e.options.paginateExpandedRows === !1 ? (t = e.atoms.expanded) == null ? void 0 : t.get() : void 0
          ];
        }
      },
      table_getRowId: { fn: (t, n, s) => Bu(t, e, n, s) },
      table_getRow: { fn: (t, n) => Gu(e, t, n) },
      table_getMaxSubRowDepth: {
        fn: () => Ku(e),
        memoDeps: () => [e.getCoreRowModel()]
      }
    });
  }
};
function Hr(e, t, n = (s, o) => s === o) {
  const s = t === void 0 ? e.options.state : t;
  e._reactivity.batch(() => {
    if (s) for (const o in s) {
      const r = e.baseAtoms[o];
      if (!r) continue;
      const i = s[o], l = i === void 0 ? e.initialState[o] : i;
      n(e._reactivity.untrack(() => r.get()), l) || r.set(() => l);
    }
  });
}
function zu(e, t, n = (s, o) => s === o) {
  e._reactivity.batch(() => {
    var s, o;
    Hr(e, t, n), (o = (s = e._reactivity).commit) == null || o.call(s);
  });
}
function Ju(e) {
  var s, o;
  const t = ut(e.initialState);
  e._reactivity.batch(() => {
    const r = Object.keys(t);
    for (let i = 0; i < r.length; i++) {
      const l = r[i];
      e.baseAtoms[l].set(t[l]);
    }
  });
  const n = Object.values(e._features);
  for (let r = 0; r < n.length; r++) (o = (s = n[r]).resetTableInstanceData) == null || o.call(s, e);
}
function Yu(e, t) {
  const { features: n, atoms: s, initialState: o } = e.options;
  if (!e.options.mergeOptions) return {
    ...e.options,
    ...t,
    features: n,
    atoms: s,
    initialState: o
  };
  const r = e.options.mergeOptions(e.options, t), i = { ...Object.getOwnPropertyDescriptors(r) };
  return Object.defineProperties(Object.create(Object.getPrototypeOf(r)), {
    ...i,
    features: {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    },
    atoms: {
      value: s,
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
function Xu(e, t, n) {
  const s = Yu(e, Pn(t, e.options));
  e.optionsStore ? e.optionsStore.set(() => s) : e.options = s, zu(e, s.state ?? null);
}
const Zu = { constructTableAPIs: (e) => {
  Rt("coreTablesFeature", e, {
    table_reset: { fn: () => Ju(e) },
    table_setOptions: { fn: (t) => Xu(e, t) }
  });
} }, Qu = {
  coreCellsFeature: Ec,
  coreColumnsFeature: Gc,
  coreHeadersFeature: Qc,
  coreRowModelsFeature: Au,
  coreRowsFeature: qu,
  coreTablesFeature: Zu
};
function ef(e) {
  const t = e;
  return Object.defineProperty(e, "state", { get() {
    return e.get();
  } }), "set" in e && (t.setState = e.set.bind(e)), t;
}
function tf(e, t) {
  if (Object.is(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  if (e instanceof Map && t instanceof Map) {
    if (e.size !== t.size) return !1;
    for (const [s, o] of e) if (!t.has(s) || !Object.is(o, t.get(s))) return !1;
    return !0;
  }
  if (e instanceof Set && t instanceof Set) {
    if (e.size !== t.size) return !1;
    for (const s of e) if (!t.has(s)) return !1;
    return !0;
  }
  if (e instanceof Date && t instanceof Date)
    return e.getTime() === t.getTime();
  const n = lo(e);
  if (n.length !== lo(t).length) return !1;
  for (let s = 0; s < n.length; s++) if (!Object.prototype.hasOwnProperty.call(t, n[s]) || !Object.is(e[n[s]], t[n[s]])) return !1;
  return !0;
}
function lo(e) {
  return Object.keys(e).concat(Object.getOwnPropertySymbols(e));
}
function nf(e, t = {}) {
  return Object.values(e).forEach((n) => {
    var s;
    t = ((s = n.getInitialState) == null ? void 0 : s.call(n, t)) ?? t;
  }), ut(t);
}
function sf(e) {
  var ce, ae;
  const t = e.features.coreReactivityFeature, { aggregationFns: n, columnMeta: s, coreRowModel: o, expandedRowModel: r, facetedMinMaxValues: i, facetedRowModel: l, facetedUniqueValues: c, filterFns: a, filterMeta: f, filteredRowModel: p, groupedRowModel: w, paginatedRowModel: S, sortFns: H, sortedRowModel: I, tableMeta: z, ...E } = e.features, x = {
    _cellInstanceInitFns: [],
    _columnInstanceInitFns: [],
    _features: {
      ...Qu,
      ...E
    },
    _headerGroupInstanceInitFns: [],
    _headerInstanceInitFns: [],
    _reactivity: t,
    _rowInstanceInitFns: [],
    _rowModelFns: {
      aggregationFns: n,
      filterFns: a,
      sortFns: H
    },
    _rowModels: {},
    atoms: {},
    baseAtoms: {}
  }, P = Object.values(x._features), M = {
    ...P.reduce((U, T) => {
      var X;
      return Object.assign(U, (X = T.getDefaultTableOptions) == null ? void 0 : X.call(T, x));
    }, {}),
    ...e
  };
  if (t.wrapExternalAtoms && M.atoms) for (const [U, T] of Object.entries(M.atoms)) {
    const X = T, de = t.createWritableAtom(X.get(), { debugName: `externalAtom/${U}` });
    M.atoms[U] = de;
    let we = !1;
    const ve = X.subscribe((Le) => {
      we || de.set(Le);
    }), Xe = de.subscribe((Le) => {
      we = !0, X.set(Le), we = !1;
    });
    t.addSubscription(ve), t.addSubscription(Xe);
  }
  t.createOptionsStore ? (x.optionsStore = t.createWritableAtom(M, { debugName: "table/optionsStore" }), Object.defineProperty(x, "options", {
    configurable: !0,
    enumerable: !0,
    get() {
      return x.optionsStore.get();
    },
    set(U) {
      x.optionsStore.set(() => U);
    }
  })) : x.options = M, x.initialState = nf(x._features, x.options.initialState);
  const K = Object.keys(x.initialState);
  for (let U = 0; U < K.length; U++) {
    const T = K[U];
    x.baseAtoms[T] = t.createWritableAtom(x.initialState[T], { debugName: `table/baseAtoms/${T}` }), x.atoms[T] = t.createReadonlyAtom(() => {
      var Xe;
      const X = x.options, de = (Xe = X.atoms) == null ? void 0 : Xe[T], we = de ? de.get() : x.baseAtoms[T].get();
      if (de) return we;
      const ve = X.state;
      if (ve && qt(ve, T)) {
        const Le = ve[T];
        return Le === void 0 ? x.initialState[T] : Le;
      }
      return we;
    }, { debugName: `table/atoms/${T}` });
  }
  Hr(x), x.store = ef(t.createReadonlyAtom(() => {
    const U = {};
    for (let T = 0; T < K.length; T++) {
      const X = K[T];
      U[X] = x.atoms[X].get();
    }
    return U;
  }, {
    compare: tf,
    debugName: "table/store"
  }));
  for (let U = 0; U < P.length; U++) {
    const T = P[U];
    (ce = T.initTableInstanceData) == null || ce.call(T, x), T.initCellInstanceData && x._cellInstanceInitFns.push(T.initCellInstanceData.bind(T)), T.initColumnInstanceData && x._columnInstanceInitFns.push(T.initColumnInstanceData.bind(T)), T.initHeaderGroupInstanceData && x._headerGroupInstanceInitFns.push(T.initHeaderGroupInstanceData.bind(T)), T.initHeaderInstanceData && x._headerInstanceInitFns.push(T.initHeaderInstanceData.bind(T)), T.initRowInstanceData && x._rowInstanceInitFns.push(T.initRowInstanceData.bind(T)), (ae = T.constructTableAPIs) == null || ae.call(T, x);
  }
  return x;
}
const of = {
  getInitialState: (e) => ({
    expanded: ru(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onExpandedChange: yc("expanded", e),
    paginateExpandedRows: !0
  }),
  assignRowPrototype: (e, t) => {
    zt("rowExpandingFeature", e, t, {
      row_toggleExpanded: { fn: (n, s) => Tr(n, s) },
      row_getIsExpanded: { fn: (n) => An(n) },
      row_getCanExpand: { fn: (n) => at(n) },
      row_getIsAllParentsExpanded: { fn: (n) => uu(n) },
      row_getToggleExpandedHandler: { fn: (n) => fu(n) }
    });
  },
  constructTableAPIs: (e) => {
    Rt("rowExpandingFeature", e, {
      table_autoResetExpanded: { fn: () => Er(e) },
      table_setExpanded: { fn: (t) => gn(e, t) },
      table_toggleAllRowsExpanded: { fn: (t) => Pr(e, t) },
      table_resetExpanded: { fn: (t) => Or(e, t) },
      table_getCanSomeRowsExpand: { fn: () => Ir(e) },
      table_getToggleAllRowsExpandedHandler: { fn: () => iu(e) },
      table_getIsSomeRowsExpanded: { fn: () => lu(e) },
      table_getIsAllRowsExpanded: { fn: () => Ar(e) },
      table_getExpandedDepth: { fn: () => cu(e) }
    });
  }
};
function rf() {
  return (e) => {
    const t = e;
    return In({
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
      fn: () => lf(t)
    });
  };
}
function lf(e) {
  var s;
  const t = e.getPreExpandedRowModel(), n = (s = e.atoms.expanded) == null ? void 0 : s.get();
  return !t.rows.length || n !== !0 && !Object.keys(n ?? {}).length || !e.options.paginateExpandedRows && !e.options.manualPagination ? t : cf(t);
}
function cf(e) {
  const t = [], n = (s) => {
    t.push(s), s.subRows.length && An(s) && s.subRows.forEach(n);
  };
  return e.rows.forEach(n), {
    rows: t,
    flatRows: e.flatRows,
    rowsById: e.rowsById
  };
}
function co(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = _t(e[n]);
  return os(e, t);
}
function uf(e) {
  return Object.keys(e).map((t) => _t(e[t]));
}
function ff(e) {
  const t = (l, c) => {
    l.setOptions((a) => so(a, co(c)));
  }, n = _c(), s = os(e, { features: {
    coreReactivityFeature: n,
    ..._t(e.features) ?? {}
  } }), o = os(co(s), { mergeOptions: (l, c) => so(l, c) }), r = sf(o), i = r;
  return wo() && Xr(() => {
    var l;
    return (l = n.unmount) == null ? void 0 : l.call(n);
  }), Ue(() => uf(s), () => {
    t(r, s);
  }, { immediate: !0 }), Ue(() => {
    const l = _t(e.state), c = _t(e.atoms);
    if (!l) return [];
    const a = [];
    for (const f of Object.keys(i.initialState))
      !(f in l) || (c == null ? void 0 : c[f]) !== void 0 || a.push(l[f]);
    return a;
  }, (l) => {
    l.length > 0 && t(r, s);
  }, { immediate: !0 }), i.Subscribe = (l) => l.children(i.atoms), i;
}
const af = { class: "pnl-tst" }, df = {
  key: 0,
  class: "pnl-tst-head"
}, pf = { class: "pnl-tst-body" }, hf = {
  key: 0,
  class: "pnl-tst-empty"
}, gf = ["onClick"], mf = ["onClick"], _f = {
  key: 1,
  class: "pnl-tst-twisty pnl-tst-twisty--leaf"
}, yf = { class: "pnl-tst-value" }, wf = "title", xf = {
  __name: "TanstackTable",
  props: {
    // Python-owned state. The component reads it and never writes it back.
    state: { type: Object, required: !0 },
    // JS to Python channel. Emits intent only, never a mutated tree.
    emitEvent: { type: Function, required: !0 },
    // Two-way, set-semantics sync of the expanded key list.
    setExpandedKeys: { type: Function, required: !0 }
  },
  setup(e) {
    const t = e, n = {
      rowExpandingFeature: of,
      coreRowModel: Fr(),
      expandedRowModel: rf()
    }, s = Ke(() => (t.state.columns || []).length > 0), o = Ke(() => {
      const E = t.state.columns || [];
      return E.length === 0 ? [{ id: wf, header: "", accessorFn: (x) => x.title }] : E.map((x) => {
        const P = x.field ?? x.id;
        return {
          id: x.id,
          header: x.header ?? x.id,
          accessorFn: (M) => M[P],
          meta: { width: x.width }
        };
      });
    }), r = /* @__PURE__ */ _i(i(t.state.expandedKeys));
    function i(E) {
      const x = {};
      for (const P of E || []) x[P] = !0;
      return x;
    }
    function l(E) {
      return E === !0 ? [] : Object.keys(E).filter((x) => E[x]).sort();
    }
    function c(E, x) {
      return E.length !== x.length ? !1 : E.every((P, M) => P === x[M]);
    }
    const a = ff({
      features: n,
      data: Ke(() => t.state.source || []),
      columns: o,
      getRowId: (E) => E.key,
      getSubRows: (E) => E.children,
      state: Ke(() => ({ expanded: r.value })),
      onExpandedChange: (E) => {
        r.value = typeof E == "function" ? E(r.value) : E, t.setExpandedKeys(l(r.value));
      }
    });
    Ue(
      () => t.state.expandedKeys,
      (E) => {
        c(l(r.value), [...E || []].sort()) || (r.value = i(E));
      }
    ), Ue(
      () => [t.state.options.expand_all, t.state.source],
      ([E]) => {
        E && a.toggleAllRowsExpanded(!0);
      },
      { immediate: !0 }
    );
    const f = Ke(() => a.getRowModel().rows), p = Ke(() => {
      var E;
      return ((E = a.getHeaderGroups()[0]) == null ? void 0 : E.headers) ?? [];
    }), w = Ke(() => t.state.options.indent_px ?? 16);
    function S(E) {
      var P;
      const x = (P = E.meta) == null ? void 0 : P.width;
      return x ? { flex: `0 0 ${x}px` } : { flex: "1 1 0" };
    }
    function H(E, x) {
      return { ...S(x), paddingInlineStart: `${E.depth * w.value}px` };
    }
    function I(E) {
      t.emitEvent("activate", { key: E.id });
    }
    function z(E) {
      E.toggleExpanded();
    }
    return (E, x) => (he(), _e("div", af, [
      s.value ? (he(), _e("div", df, [
        (he(!0), _e(ge, null, Kn(p.value, (P) => (he(), _e("div", {
          key: P.id,
          class: "pnl-tst-hcell",
          style: jt(S(P.column.columnDef))
        }, qn(P.column.columnDef.header), 5))), 128))
      ])) : Un("", !0),
      gt("div", pf, [
        f.value.length === 0 ? (he(), _e("div", hf, "No data")) : Un("", !0),
        (he(!0), _e(ge, null, Kn(f.value, (P) => (he(), _e("div", {
          key: P.id,
          class: "pnl-tst-row",
          onClick: (M) => I(P)
        }, [
          (he(!0), _e(ge, null, Kn(P.getAllCells(), (M, K) => (he(), _e("div", {
            key: M.id,
            class: Vt(["pnl-tst-cell", { "pnl-tst-cell--tree": K === 0 }]),
            style: jt(K === 0 ? H(P, M.column.columnDef) : S(M.column.columnDef))
          }, [
            K === 0 ? (he(), _e(ge, { key: 0 }, [
              P.getCanExpand() ? (he(), _e("span", {
                key: 0,
                class: Vt(["pnl-tst-twisty", { "pnl-tst-twisty--open": P.getIsExpanded() }]),
                onClick: lc((ce) => z(P), ["stop"])
              }, [...x[0] || (x[0] = [
                gt("svg", {
                  viewBox: "0 0 16 16",
                  width: "12",
                  height: "12",
                  "aria-hidden": "true",
                  focusable: "false"
                }, [
                  gt("path", {
                    d: "M6 3.5 10.5 8 6 12.5",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "1.6"
                  })
                ], -1)
              ])], 10, mf)) : (he(), _e("span", _f))
            ], 64)) : Un("", !0),
            gt("span", yf, qn(M.getValue()), 1)
          ], 6))), 128))
        ], 8, gf))), 128))
      ])
    ]));
  }
};
function Rf({ model: e, el: t }) {
  t.style.display = "block", t.style.width = "100%";
  const n = document.createElement("div");
  n.className = "pnl-tst-root", t.append(n);
  const s = /* @__PURE__ */ Rn({
    source: e.get("source") || [],
    columns: e.get("columns") || [],
    options: e.get("options") || {},
    expandedKeys: e.get("expanded_keys") || []
  }), o = (c, a) => {
    e.set("_event_data", {
      event_name: c,
      event_params: a,
      timestamp: Date.now()
    }), e.save_changes();
  }, r = (c, a) => c.length === a.length && c.every((f, p) => f === a[p]), l = fc(xf, { state: s, emitEvent: o, setExpandedKeys: (c) => {
    const a = [...e.get("expanded_keys") || []].sort();
    r(a, c) || (e.set("expanded_keys", c), e.save_changes());
  } });
  return l.mount(n), e.on("change:source", () => {
    s.source = e.get("source") || [];
  }), e.on("change:columns", () => {
    s.columns = e.get("columns") || [];
  }), e.on("change:options", () => {
    s.options = e.get("options") || {};
  }), e.on("change:expanded_keys", () => {
    s.expandedKeys = e.get("expanded_keys") || [];
  }), () => {
    l.unmount();
  };
}
export {
  Rf as render
};

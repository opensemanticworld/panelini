/**
* @vue/shared v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function is(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const Q = {}, mt = [], Le = () => {
}, fo = () => !1, mn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), _n = (e) => e.startsWith("onUpdate:"), fe = Object.assign, ls = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Kr = Object.prototype.hasOwnProperty, W = (e, t) => Kr.call(e, t), D = Array.isArray, et = (e) => Ut(e) === "[object Map]", ln = (e) => Ut(e) === "[object Set]", Es = (e) => Ut(e) === "[object Date]", V = (e) => typeof e == "function", ne = (e) => typeof e == "string", Ke = (e) => typeof e == "symbol", q = (e) => e !== null && typeof e == "object", ao = (e) => (q(e) || V(e)) && V(e.then) && V(e.catch), po = Object.prototype.toString, Ut = (e) => po.call(e), Nr = (e) => Ut(e).slice(8, -1), ho = (e) => Ut(e) === "[object Object]", cs = (e) => ne(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Ot = /* @__PURE__ */ is(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), yn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, kr = /-\w/g, Ce = yn(
  (e) => e.replace(kr, (t) => t.slice(1).toUpperCase())
), Wr = /\B([A-Z])/g, pt = yn(
  (e) => e.replace(Wr, "-$1").toLowerCase()
), go = yn((e) => e.charAt(0).toUpperCase() + e.slice(1)), Fn = yn(
  (e) => e ? `on${go(e)}` : ""
), je = (e, t) => !Object.is(e, t), Dn = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, mo = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
}, Ur = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Ps;
const wn = () => Ps || (Ps = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function jt(e) {
  if (D(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], o = ne(s) ? zr(s) : jt(s);
      if (o)
        for (const r in o)
          t[r] = o[r];
    }
    return t;
  } else if (ne(e) || q(e))
    return e;
}
const Br = /;(?![^(]*\))/g, Gr = /:([^]+)/, qr = /\/\*[^]*?\*\//g;
function zr(e) {
  const t = {};
  return e.replace(qr, "").split(Br).forEach((n) => {
    if (n) {
      const s = n.split(Gr);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function Vt(e) {
  let t = "";
  if (ne(e))
    t = e;
  else if (D(e))
    for (let n = 0; n < e.length; n++) {
      const s = Vt(e[n]);
      s && (t += s + " ");
    }
  else if (q(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Jr = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Yr = /* @__PURE__ */ is(Jr);
function _o(e) {
  return !!e || e === "";
}
function Xr(e, t) {
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
  let n = Es(e), s = Es(t);
  if (n || s)
    return n && s ? e.getTime() === t.getTime() : !1;
  if (n = Ke(e), s = Ke(t), n || s)
    return e === t;
  if (n = D(e), s = D(t), n || s)
    return n && s ? Xr(e, t) : !1;
  if (n = q(e), s = q(t), n || s) {
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
const yo = (e) => !!(e && e.__v_isRef === !0), Gn = (e) => ne(e) ? e : e == null ? "" : D(e) || q(e) && (e.toString === po || !V(e.toString)) ? yo(e) ? Gn(e.value) : JSON.stringify(e, wo, 2) : String(e), wo = (e, t) => yo(t) ? wo(e, t.value) : et(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, o], r) => (n[Hn(s, r) + " =>"] = o, n),
    {}
  )
} : ln(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Hn(n))
} : Ke(t) ? Hn(t) : q(t) && !D(t) && !ho(t) ? String(t) : t, Hn = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Ke(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let oe;
class Zr {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && oe && (oe.active ? (this.parent = oe, this.index = (oe.scopes || (oe.scopes = [])).push(
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
      const n = oe;
      try {
        return oe = this, t();
      } finally {
        oe = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = oe, oe = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (oe === this)
        oe = this.prevScope;
      else {
        let t = oe;
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
function xo() {
  return oe;
}
function Qr(e, t = !1) {
  oe && oe.cleanups.push(e);
}
let Z;
const jn = /* @__PURE__ */ new WeakSet();
class bo {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, oe && (oe.active ? oe.effects.push(this) : this.flags &= -2);
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
    this.flags |= 2, Os(this), Co(this);
    const t = Z, n = Se;
    Z = this, Se = !0;
    try {
      return this.fn();
    } finally {
      So(this), Z = t, Se = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        as(t);
      this.deps = this.depsTail = void 0, Os(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? jn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    qn(this) && this.run();
  }
  get dirty() {
    return qn(this);
  }
}
let vo = 0, At, Tt;
function Ro(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Tt, Tt = e;
    return;
  }
  e.next = At, At = e;
}
function us() {
  vo++;
}
function fs() {
  if (--vo > 0)
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
function So(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const o = s.prevDep;
    s.version === -1 ? (s === n && (n = o), as(s), ei(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = o;
  }
  e.deps = t, e.depsTail = n;
}
function qn(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Mo(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Mo(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Lt) || (e.globalVersion = Lt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !qn(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = Z, s = Se;
  Z = e, Se = !0;
  try {
    Co(e);
    const o = e.fn(e._value);
    (t.version === 0 || je(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    Z = n, Se = s, So(e), e.flags &= -3;
  }
}
function as(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: o } = e;
  if (s && (s.nextSub = o, e.prevSub = void 0), o && (o.prevSub = s, e.nextSub = void 0), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let r = n.computed.deps; r; r = r.nextDep)
      as(r, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function ei(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let Se = !0;
const Eo = [];
function qe() {
  Eo.push(Se), Se = !1;
}
function ze() {
  const e = Eo.pop();
  Se = e === void 0 ? !0 : e;
}
function Os(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = Z;
    Z = void 0;
    try {
      t();
    } finally {
      Z = n;
    }
  }
}
let Lt = 0;
class ti {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class ds {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!Z || !Se || Z === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== Z)
      n = this.activeLink = new ti(Z, this), Z.deps ? (n.prevDep = Z.depsTail, Z.depsTail.nextDep = n, Z.depsTail = n) : Z.deps = Z.depsTail = n, Po(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = Z.depsTail, n.nextDep = void 0, Z.depsTail.nextDep = n, Z.depsTail = n, Z.deps === n && (Z.deps = s);
    }
    return n;
  }
  trigger(t) {
    this.version++, Lt++, this.notify(t);
  }
  notify(t) {
    us();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      fs();
    }
  }
}
function Po(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        Po(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const zn = /* @__PURE__ */ new WeakMap(), lt = /* @__PURE__ */ Symbol(
  ""
), Jn = /* @__PURE__ */ Symbol(
  ""
), $t = /* @__PURE__ */ Symbol(
  ""
);
function ce(e, t, n) {
  if (Se && Z) {
    let s = zn.get(e);
    s || zn.set(e, s = /* @__PURE__ */ new Map());
    let o = s.get(n);
    o || (s.set(n, o = new ds()), o.map = s, o.key = n), o.track();
  }
}
function Ue(e, t, n, s, o, r) {
  const i = zn.get(e);
  if (!i) {
    Lt++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if (us(), t === "clear")
    i.forEach(l);
  else {
    const c = D(e), a = c && cs(n);
    if (c && n === "length") {
      const f = Number(s);
      i.forEach((p, w) => {
        (w === "length" || w === $t || !Ke(w) && w >= f) && l(p);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && l(i.get(n)), a && l(i.get($t)), t) {
        case "add":
          c ? a && l(i.get("length")) : (l(i.get(lt)), et(e) && l(i.get(Jn)));
          break;
        case "delete":
          c || (l(i.get(lt)), et(e) && l(i.get(Jn)));
          break;
        case "set":
          et(e) && l(i.get(lt));
          break;
      }
  }
  fs();
}
function ht(e) {
  const t = /* @__PURE__ */ k(e);
  return t === e ? t : (ce(t, "iterate", $t), /* @__PURE__ */ Re(e) ? t : t.map(Me));
}
function bn(e) {
  return ce(e = /* @__PURE__ */ k(e), "iterate", $t), e;
}
function De(e, t) {
  return /* @__PURE__ */ Je(e) ? xt(/* @__PURE__ */ ct(e) ? Me(t) : t) : Me(t);
}
const ni = {
  __proto__: null,
  [Symbol.iterator]() {
    return Vn(this, Symbol.iterator, (e) => De(this, e));
  },
  concat(...e) {
    return ht(this).concat(
      ...e.map((t) => D(t) ? ht(t) : t)
    );
  },
  entries() {
    return Vn(this, "entries", (e) => (e[1] = De(this, e[1]), e));
  },
  every(e, t) {
    return Ne(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Ne(
      this,
      "filter",
      e,
      t,
      (n) => n.map((s) => De(this, s)),
      arguments
    );
  },
  find(e, t) {
    return Ne(
      this,
      "find",
      e,
      t,
      (n) => De(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return Ne(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Ne(
      this,
      "findLast",
      e,
      t,
      (n) => De(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return Ne(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Ne(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Ln(this, "includes", e);
  },
  indexOf(...e) {
    return Ln(this, "indexOf", e);
  },
  join(e) {
    return ht(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Ln(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Ne(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Mt(this, "pop");
  },
  push(...e) {
    return Mt(this, "push", e);
  },
  reduce(e, ...t) {
    return As(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return As(this, "reduceRight", e, t);
  },
  shift() {
    return Mt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Ne(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Mt(this, "splice", e);
  },
  toReversed() {
    return ht(this).toReversed();
  },
  toSorted(e) {
    return ht(this).toSorted(e);
  },
  toSpliced(...e) {
    return ht(this).toSpliced(...e);
  },
  unshift(...e) {
    return Mt(this, "unshift", e);
  },
  values() {
    return Vn(this, "values", (e) => De(this, e));
  }
};
function Vn(e, t, n) {
  const s = bn(e), o = s[t]();
  return s !== e && !/* @__PURE__ */ Re(e) && (o._next = o.next, o.next = () => {
    const r = o._next();
    return r.done || (r.value = n(r.value)), r;
  }), o;
}
const si = Array.prototype;
function Ne(e, t, n, s, o, r) {
  const i = bn(e), l = i !== e && !/* @__PURE__ */ Re(e), c = i[t];
  if (c !== si[t]) {
    const p = c.apply(e, r);
    return l ? Me(p) : p;
  }
  let a = n;
  i !== e && (l ? a = function(p, w) {
    return n.call(this, De(e, p), w, e);
  } : n.length > 2 && (a = function(p, w) {
    return n.call(this, p, w, e);
  }));
  const f = c.call(i, a, s);
  return l && o ? o(f) : f;
}
function As(e, t, n, s) {
  const o = bn(e), r = o !== e && !/* @__PURE__ */ Re(e);
  let i = n, l = !1;
  o !== e && (r ? (l = s.length === 0, i = function(a, f, p) {
    return l && (l = !1, a = De(e, a)), n.call(this, a, De(e, f), p, e);
  }) : n.length > 3 && (i = function(a, f, p) {
    return n.call(this, a, f, p, e);
  }));
  const c = o[t](i, ...s);
  return l ? De(e, c) : c;
}
function Ln(e, t, n) {
  const s = /* @__PURE__ */ k(e);
  ce(s, "iterate", $t);
  const o = s[t](...n);
  return (o === -1 || o === !1) && /* @__PURE__ */ gs(n[0]) ? (n[0] = /* @__PURE__ */ k(n[0]), s[t](...n)) : o;
}
function Mt(e, t, n = []) {
  qe(), us();
  const s = (/* @__PURE__ */ k(e))[t].apply(e, n);
  return fs(), ze(), s;
}
const oi = /* @__PURE__ */ is("__proto__,__v_isRef,__isVue"), Io = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Ke)
);
function ri(e) {
  Ke(e) || (e = String(e));
  const t = /* @__PURE__ */ k(this);
  return ce(t, "has", e), t.hasOwnProperty(e);
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
      return s === (o ? r ? gi : Do : r ? Fo : To).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const i = D(t);
    if (!o) {
      let c;
      if (i && (c = ni[n]))
        return c;
      if (n === "hasOwnProperty")
        return ri;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ ue(t) ? t : s
    );
    if ((Ke(n) ? Io.has(n) : oi(n)) || (o || ce(t, "get", n), r))
      return l;
    if (/* @__PURE__ */ ue(l)) {
      const c = i && cs(n) ? l : l.value;
      return o && q(c) ? /* @__PURE__ */ Xn(c) : c;
    }
    return q(l) ? o ? /* @__PURE__ */ Xn(l) : /* @__PURE__ */ vn(l) : l;
  }
}
class Ao extends Oo {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, o) {
    let r = t[n];
    const i = D(t) && cs(n);
    if (!this._isShallow) {
      const a = /* @__PURE__ */ Je(r);
      if (!/* @__PURE__ */ Re(s) && !/* @__PURE__ */ Je(s) && (r = /* @__PURE__ */ k(r), s = /* @__PURE__ */ k(s)), !i && /* @__PURE__ */ ue(r) && !/* @__PURE__ */ ue(s))
        return a || (r.value = s), !0;
    }
    const l = i ? Number(n) < t.length : W(t, n), c = Reflect.set(
      t,
      n,
      s,
      /* @__PURE__ */ ue(t) ? t : o
    );
    return t === /* @__PURE__ */ k(o) && c && (l ? je(s, r) && Ue(t, "set", n, s) : Ue(t, "add", n, s)), c;
  }
  deleteProperty(t, n) {
    const s = W(t, n);
    t[n];
    const o = Reflect.deleteProperty(t, n);
    return o && s && Ue(t, "delete", n, void 0), o;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!Ke(n) || !Io.has(n)) && ce(t, "has", n), s;
  }
  ownKeys(t) {
    return ce(
      t,
      "iterate",
      D(t) ? "length" : lt
    ), Reflect.ownKeys(t);
  }
}
class ii extends Oo {
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
const li = /* @__PURE__ */ new Ao(), ci = /* @__PURE__ */ new ii(), ui = /* @__PURE__ */ new Ao(!0);
const Yn = (e) => e, Xt = (e) => Reflect.getPrototypeOf(e);
function fi(e, t, n) {
  return function(...s) {
    const o = this.__v_raw, r = /* @__PURE__ */ k(o), i = et(r), l = e === "entries" || e === Symbol.iterator && i, c = e === "keys" && i, a = o[e](...s), f = n ? Yn : t ? xt : Me;
    return !t && ce(
      r,
      "iterate",
      c ? Jn : lt
    ), fe(
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
function ai(e, t) {
  const n = {
    get(o) {
      const r = this.__v_raw, i = /* @__PURE__ */ k(r), l = /* @__PURE__ */ k(o);
      e || (je(o, l) && ce(i, "get", o), ce(i, "get", l));
      const { has: c } = Xt(i), a = t ? Yn : e ? xt : Me;
      if (c.call(i, o))
        return a(r.get(o));
      if (c.call(i, l))
        return a(r.get(l));
      r !== i && r.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && ce(/* @__PURE__ */ k(o), "iterate", lt), o.size;
    },
    has(o) {
      const r = this.__v_raw, i = /* @__PURE__ */ k(r), l = /* @__PURE__ */ k(o);
      return e || (je(o, l) && ce(i, "has", o), ce(i, "has", l)), o === l ? r.has(o) : r.has(o) || r.has(l);
    },
    forEach(o, r) {
      const i = this, l = i.__v_raw, c = /* @__PURE__ */ k(l), a = t ? Yn : e ? xt : Me;
      return !e && ce(c, "iterate", lt), l.forEach((f, p) => o.call(r, a(f), a(p), i));
    }
  };
  return fe(
    n,
    e ? {
      add: Zt("add"),
      set: Zt("set"),
      delete: Zt("delete"),
      clear: Zt("clear")
    } : {
      add(o) {
        const r = /* @__PURE__ */ k(this), i = Xt(r), l = /* @__PURE__ */ k(o), c = !t && !/* @__PURE__ */ Re(o) && !/* @__PURE__ */ Je(o) ? l : o;
        return i.has.call(r, c) || je(o, c) && i.has.call(r, o) || je(l, c) && i.has.call(r, l) || (r.add(c), Ue(r, "add", c, c)), this;
      },
      set(o, r) {
        !t && !/* @__PURE__ */ Re(r) && !/* @__PURE__ */ Je(r) && (r = /* @__PURE__ */ k(r));
        const i = /* @__PURE__ */ k(this), { has: l, get: c } = Xt(i);
        let a = l.call(i, o);
        a || (o = /* @__PURE__ */ k(o), a = l.call(i, o));
        const f = c.call(i, o);
        return i.set(o, r), a ? je(r, f) && Ue(i, "set", o, r) : Ue(i, "add", o, r), this;
      },
      delete(o) {
        const r = /* @__PURE__ */ k(this), { has: i, get: l } = Xt(r);
        let c = i.call(r, o);
        c || (o = /* @__PURE__ */ k(o), c = i.call(r, o)), l && l.call(r, o);
        const a = r.delete(o);
        return c && Ue(r, "delete", o, void 0), a;
      },
      clear() {
        const o = /* @__PURE__ */ k(this), r = o.size !== 0, i = o.clear();
        return r && Ue(
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
    n[o] = fi(o, e, t);
  }), n;
}
function ps(e, t) {
  const n = ai(e, t);
  return (s, o, r) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? s : Reflect.get(
    W(n, o) && o in s ? n : s,
    o,
    r
  );
}
const di = {
  get: /* @__PURE__ */ ps(!1, !1)
}, pi = {
  get: /* @__PURE__ */ ps(!1, !0)
}, hi = {
  get: /* @__PURE__ */ ps(!0, !1)
};
const To = /* @__PURE__ */ new WeakMap(), Fo = /* @__PURE__ */ new WeakMap(), Do = /* @__PURE__ */ new WeakMap(), gi = /* @__PURE__ */ new WeakMap();
function mi(e) {
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
function vn(e) {
  return /* @__PURE__ */ Je(e) ? e : hs(
    e,
    !1,
    li,
    di,
    To
  );
}
// @__NO_SIDE_EFFECTS__
function _i(e) {
  return hs(
    e,
    !1,
    ui,
    pi,
    Fo
  );
}
// @__NO_SIDE_EFFECTS__
function Xn(e) {
  return hs(
    e,
    !0,
    ci,
    hi,
    Do
  );
}
function hs(e, t, n, s, o) {
  if (!q(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const r = o.get(e);
  if (r)
    return r;
  const i = mi(Nr(e));
  if (i === 0)
    return e;
  const l = new Proxy(
    e,
    i === 2 ? s : n
  );
  return o.set(e, l), l;
}
// @__NO_SIDE_EFFECTS__
function ct(e) {
  return /* @__PURE__ */ Je(e) ? /* @__PURE__ */ ct(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Je(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Re(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function gs(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function k(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ k(t) : e;
}
function yi(e) {
  return !W(e, "__v_skip") && Object.isExtensible(e) && mo(e, "__v_skip", !0), e;
}
const Me = (e) => q(e) ? /* @__PURE__ */ vn(e) : e, xt = (e) => q(e) ? /* @__PURE__ */ Xn(e) : e;
// @__NO_SIDE_EFFECTS__
function ue(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Ts(e) {
  return Ho(e, !1);
}
// @__NO_SIDE_EFFECTS__
function wi(e) {
  return Ho(e, !0);
}
function Ho(e, t) {
  return /* @__PURE__ */ ue(e) ? e : new xi(e, t);
}
class xi {
  constructor(t, n) {
    this.dep = new ds(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ k(t), this._value = n ? t : Me(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || /* @__PURE__ */ Re(t) || /* @__PURE__ */ Je(t);
    t = s ? t : /* @__PURE__ */ k(t), je(t, n) && (this._rawValue = t, this._value = s ? t : Me(t), this.dep.trigger());
  }
}
function _t(e) {
  return /* @__PURE__ */ ue(e) ? e.value : e;
}
const bi = {
  get: (e, t, n) => t === "__v_raw" ? e : _t(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const o = e[t];
    return /* @__PURE__ */ ue(o) && !/* @__PURE__ */ ue(n) ? (o.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function jo(e) {
  return /* @__PURE__ */ ct(e) ? e : new Proxy(e, bi);
}
class vi {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new ds(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Lt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    Z !== this)
      return Ro(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Mo(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function Ri(e, t, n = !1) {
  let s, o;
  return V(e) ? s = e : (s = e.get, o = e.set), new vi(s, o, n);
}
const Qt = {}, cn = /* @__PURE__ */ new WeakMap();
let rt;
function Ci(e, t = !1, n = rt) {
  if (n) {
    let s = cn.get(n);
    s || cn.set(n, s = []), s.push(e);
  }
}
function Si(e, t, n = Q) {
  const { immediate: s, deep: o, once: r, scheduler: i, augmentJob: l, call: c } = n, a = (E) => o ? E : /* @__PURE__ */ Re(E) || o === !1 || o === 0 ? Qe(E, 1) : Qe(E);
  let f, p, w, S, j = !1, O = !1;
  if (/* @__PURE__ */ ue(e) ? (p = () => e.value, j = /* @__PURE__ */ Re(e)) : /* @__PURE__ */ ct(e) ? (p = () => a(e), j = !0) : D(e) ? (O = !0, j = e.some((E) => /* @__PURE__ */ ct(E) || /* @__PURE__ */ Re(E)), p = () => e.map((E) => {
    if (/* @__PURE__ */ ue(E))
      return E.value;
    if (/* @__PURE__ */ ct(E))
      return a(E);
    if (V(E))
      return c ? c(E, 2) : E();
  })) : V(e) ? t ? p = c ? () => c(e, 2) : e : p = () => {
    if (w) {
      qe();
      try {
        w();
      } finally {
        ze();
      }
    }
    const E = rt;
    rt = f;
    try {
      return c ? c(e, 3, [S]) : e(S);
    } finally {
      rt = E;
    }
  } : p = Le, t && o) {
    const E = p, Y = o === !0 ? 1 / 0 : o;
    p = () => Qe(E(), Y);
  }
  const ee = xo(), N = () => {
    f.stop(), ee && ee.active && ls(ee.effects, f);
  };
  if (r && t) {
    const E = t;
    t = (...Y) => {
      const le = E(...Y);
      return N(), le;
    };
  }
  let M = O ? new Array(e.length).fill(Qt) : Qt;
  const L = (E) => {
    if (!(!(f.flags & 1) || !f.dirty && !E))
      if (t) {
        const Y = f.run();
        if (E || o || j || (O ? Y.some((le, re) => je(le, M[re])) : je(Y, M))) {
          w && w();
          const le = rt;
          rt = f;
          try {
            const re = [
              Y,
              // pass undefined as the old value when it's changed for the first time
              M === Qt ? void 0 : O && M[0] === Qt ? [] : M,
              S
            ];
            M = Y, c ? c(t, 3, re) : (
              // @ts-expect-error
              t(...re)
            );
          } finally {
            rt = le;
          }
        }
      } else
        f.run();
  };
  return l && l(L), f = new bo(p), f.scheduler = i ? () => i(L, !1) : L, S = (E) => Ci(E, !1, f), w = f.onStop = () => {
    const E = cn.get(f);
    if (E) {
      if (c)
        c(E, 4);
      else
        for (const Y of E) Y();
      cn.delete(f);
    }
  }, t ? s ? L(!0) : M = f.run() : i ? i(L.bind(null, !0), !0) : f.run(), N.pause = f.pause.bind(f), N.resume = f.resume.bind(f), N.stop = N, N;
}
function Qe(e, t = 1 / 0, n) {
  if (t <= 0 || !q(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ ue(e))
    Qe(e.value, t, n);
  else if (D(e))
    for (let s = 0; s < e.length; s++)
      Qe(e[s], t, n);
  else if (ln(e) || et(e))
    e.forEach((s) => {
      Qe(s, t, n);
    });
  else if (ho(e)) {
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
    Rn(o, t, n);
  }
}
function Ee(e, t, n, s) {
  if (V(e)) {
    const o = Bt(e, t, n, s);
    return o && ao(o) && o.catch((r) => {
      Rn(r, t, n);
    }), o;
  }
  if (D(e)) {
    const o = [];
    for (let r = 0; r < e.length; r++)
      o.push(Ee(e[r], t, n, s));
    return o;
  }
}
function Rn(e, t, n, s = !0) {
  const o = t ? t.vnode : null, { errorHandler: r, throwUnhandledErrorInProduction: i } = t && t.appContext.config || Q;
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
      qe(), Bt(r, null, 10, [
        e,
        c,
        a
      ]), ze();
      return;
    }
  }
  Mi(e, n, o, s, i);
}
function Mi(e, t, n, s = !0, o = !1) {
  if (o)
    throw e;
  console.error(e);
}
const pe = [];
let Fe = -1;
const yt = [];
let Ze = null, gt = 0;
const Vo = /* @__PURE__ */ Promise.resolve();
let un = null;
function Lo(e) {
  const t = un || Vo;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ei(e) {
  let t = Fe + 1, n = pe.length;
  for (; t < n; ) {
    const s = t + n >>> 1, o = pe[s], r = Kt(o);
    r < e || r === e && o.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function ms(e) {
  if (!(e.flags & 1)) {
    const t = Kt(e), n = pe[pe.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Kt(n) ? pe.push(e) : pe.splice(Ei(t), 0, e), e.flags |= 1, $o();
  }
}
function $o() {
  un || (un = Vo.then(No));
}
function Pi(e) {
  if (!D(e))
    Ze && e.id === -1 ? Ze.splice(gt + 1, 0, e) : e.flags & 1 || (yt.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      yt.push(e[t]);
  $o();
}
function Fs(e, t, n = Fe + 1) {
  for (; n < pe.length; n++) {
    const s = pe[n];
    if (s && s.flags & 2) {
      if (e && s.id !== e.uid)
        continue;
      pe.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
    }
  }
}
function Ko(e) {
  if (yt.length) {
    const t = [...new Set(yt)].sort(
      (n, s) => Kt(n) - Kt(s)
    );
    if (yt.length = 0, Ze) {
      for (let n = 0; n < t.length; n++)
        Ze.push(t[n]);
      return;
    }
    for (Ze = t, gt = 0; gt < Ze.length; gt++) {
      const n = Ze[gt];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    Ze = null, gt = 0;
  }
}
const Kt = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function No(e) {
  try {
    for (Fe = 0; Fe < pe.length; Fe++) {
      const t = pe[Fe];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Bt(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Fe < pe.length; Fe++) {
      const t = pe[Fe];
      t && (t.flags &= -2);
    }
    Fe = -1, pe.length = 0, Ko(), un = null, (pe.length || yt.length) && No();
  }
}
let Ve = null, ko = null;
function fn(e) {
  const t = Ve;
  return Ve = e, ko = e && e.type.__scopeId || null, t;
}
function Ii(e, t = Ve, n) {
  if (!t || e._n)
    return e;
  const s = (...o) => {
    s._d && Us(-1);
    const r = fn(t), i = ut.length;
    let l;
    try {
      l = e(...o);
    } finally {
      for (let c = ut.length; c > i; c--) dr();
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
    c && (qe(), Ee(c, n, 8, [
      e.el,
      l,
      e,
      t
    ]), ze());
  }
}
function Oi(e, t) {
  if (he) {
    let n = he.provides;
    const s = he.parent && he.parent.provides;
    s === n && (n = he.provides = Object.create(s)), n[e] = t;
  }
}
function nn(e, t, n = !1) {
  const s = Il();
  if (s || wt) {
    let o = wt ? wt._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && V(t) ? t.call(s && s.proxy) : t;
  }
}
const Ai = /* @__PURE__ */ Symbol.for("v-scx"), Ti = () => nn(Ai);
function Be(e, t, n) {
  return Wo(e, t, n);
}
function Wo(e, t, n = Q) {
  const { immediate: s, deep: o, flush: r, once: i } = n, l = fe({}, n), c = t && s || !t && r !== "post";
  let a;
  if (Wt) {
    if (r === "sync") {
      const S = Ti();
      a = S.__watcherHandles || (S.__watcherHandles = []);
    } else if (!c) {
      const S = () => {
      };
      return S.stop = Le, S.resume = Le, S.pause = Le, S;
    }
  }
  const f = he;
  l.call = (S, j, O) => Ee(S, f, j, O);
  let p = !1;
  r === "post" ? l.scheduler = (S) => {
    me(S, f && f.suspense);
  } : r !== "sync" && (p = !0, l.scheduler = (S, j) => {
    j ? S() : ms(S);
  }), l.augmentJob = (S) => {
    t && (S.flags |= 4), p && (S.flags |= 2, f && (S.id = f.uid, S.i = f));
  };
  const w = Si(e, t, l);
  return Wt && (a ? a.push(w) : c && w()), w;
}
function Fi(e, t, n) {
  const s = this.proxy, o = ne(e) ? e.includes(".") ? Uo(s, e) : () => s[e] : e.bind(s, s);
  let r;
  V(t) ? r = t : (r = t.handler, n = t);
  const i = Gt(this), l = Wo(o, r.bind(s), n);
  return i(), l;
}
function Uo(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let o = 0; o < n.length && s; o++)
      s = s[n[o]];
    return s;
  };
}
const Di = /* @__PURE__ */ Symbol("_vte"), Cn = (e) => e.__isTeleport, $n = /* @__PURE__ */ Symbol("_leaveCb");
function Hi(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== Ye) {
        t = n;
        break;
      }
  }
  return t;
}
function Bo(e) {
  if (!ys(e))
    return Cn(e.type) && e.children ? Hi(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16)
      return n[0];
    if (t & 32 && V(n.default))
      return n.default();
  }
}
function _s(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    _s(
      Cn(n.type) && Bo(n) || n,
      t
    );
  } else e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Go(e) {
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
      (O, ee) => Ft(
        O,
        t && (D(t) ? t[ee] : t),
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
  const r = s.shapeFlag & 4 ? bs(s.component) : s.el, i = o ? null : r, { i: l, r: c } = e, a = t && t.r, f = l.refs === Q ? l.refs = {} : l.refs, p = l.setupState, w = /* @__PURE__ */ k(p), S = p === Q ? fo : (O) => Ds(f, O) ? !1 : W(w, O), j = (O, ee) => !(ee && Ds(f, ee));
  if (a != null && a !== c) {
    if (Hs(t), ne(a))
      f[a] = null, S(a) && (p[a] = null);
    else if (/* @__PURE__ */ ue(a)) {
      const O = t;
      j(a, O.k) && (a.value = null), O.k && (f[O.k] = null);
    }
  }
  if (V(c))
    Bt(c, l, 12, [i, f]);
  else {
    const O = ne(c), ee = /* @__PURE__ */ ue(c);
    if (O || ee) {
      const N = () => {
        if (e.f) {
          const M = O ? S(c) ? p[c] : f[c] : j() || !e.k ? c.value : f[e.k];
          if (o)
            D(M) && ls(M, r);
          else if (D(M))
            M.includes(r) || M.push(r);
          else if (O)
            f[c] = [r], S(c) && (p[c] = f[c]);
          else {
            const L = [r];
            j(c, e.k) && (c.value = L), e.k && (f[e.k] = L);
          }
        } else O ? (f[c] = i, S(c) && (p[c] = i)) : ee && (j(c, e.k) && (c.value = i), e.k && (f[e.k] = i));
      };
      if (i) {
        const M = () => {
          N(), an.delete(e);
        };
        M.id = -1, an.set(e, M), me(M, n);
      } else
        Hs(e), N();
    }
  }
}
function Hs(e) {
  const t = an.get(e);
  t && (t.flags |= 8, an.delete(e));
}
wn().requestIdleCallback;
wn().cancelIdleCallback;
const Dt = (e) => !!e.type.__asyncLoader, ys = (e) => e.type.__isKeepAlive;
function ji(e, t) {
  qo(e, "a", t);
}
function Vi(e, t) {
  qo(e, "da", t);
}
function qo(e, t, n = he) {
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
      ys(o.parent.vnode) && Li(s, t, n, o), o = o.parent;
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
  zo(() => {
    ls(s[t], o);
  }, n);
}
function Sn(e, t, n = he, s = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...i) => {
      qe();
      const l = Gt(n), c = Ee(t, n, e, i);
      return l(), ze(), c;
    });
    return s ? o.unshift(r) : o.push(r), r;
  }
}
const Xe = (e) => (t, n = he) => {
  (!Wt || e === "sp") && Sn(e, (...s) => t(...s), n);
}, $i = Xe("bm"), Ki = Xe("m"), Ni = Xe(
  "bu"
), ki = Xe("u"), Wi = Xe(
  "bum"
), zo = Xe("um"), Ui = Xe(
  "sp"
), Bi = Xe("rtg"), Gi = Xe("rtc");
function qi(e, t = he) {
  Sn("ec", e, t);
}
const zi = /* @__PURE__ */ Symbol.for("v-ndc");
function Kn(e, t, n, s) {
  let o;
  const r = n, i = D(e);
  if (i || ne(e)) {
    const l = i && /* @__PURE__ */ ct(e);
    let c = !1, a = !1;
    l && (c = !/* @__PURE__ */ Re(e), a = /* @__PURE__ */ Je(e), e = bn(e)), o = new Array(e.length);
    for (let f = 0, p = e.length; f < p; f++)
      o[f] = t(
        c ? a ? xt(Me(e[f])) : Me(e[f]) : e[f],
        f,
        void 0,
        r
      );
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let l = 0; l < e; l++)
      o[l] = t(l + 1, l, void 0, r);
  } else if (q(e))
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
const Zn = (e) => e ? mr(e) ? bs(e) : Zn(e.parent) : null, Ht = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ fe(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Zn(e.parent),
    $root: (e) => Zn(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Yo(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      ms(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Lo.bind(e.proxy)),
    $watch: (e) => Fi.bind(e)
  })
), Nn = (e, t) => e !== Q && !e.__isScriptSetup && W(e, t), Ji = {
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
        if (o !== Q && W(o, t))
          return i[t] = 2, o[t];
        if (W(r, t))
          return i[t] = 3, r[t];
        if (n !== Q && W(n, t))
          return i[t] = 4, n[t];
        Qn && (i[t] = 0);
      }
    }
    const a = Ht[t];
    let f, p;
    if (a)
      return t === "$attrs" && ce(e.attrs, "get", ""), a(e);
    if (
      // css module (injected by vue-loader)
      (f = l.__cssModules) && (f = f[t])
    )
      return f;
    if (n !== Q && W(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      p = c.config.globalProperties, W(p, t)
    )
      return p[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: o, ctx: r } = e;
    return Nn(o, t) ? (o[t] = n, !0) : s !== Q && W(s, t) ? (s[t] = n, !0) : W(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (r[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: o, props: r, type: i }
  }, l) {
    let c;
    return !!(n[l] || e !== Q && l[0] !== "$" && W(e, l) || Nn(t, l) || W(r, l) || W(s, l) || W(Ht, l) || W(o.config.globalProperties, l) || (c = i.__cssModules) && c[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : W(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function js(e) {
  return D(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let Qn = !0;
function Yi(e) {
  const t = Yo(e), n = e.proxy, s = e.ctx;
  Qn = !1, t.beforeCreate && Vs(t.beforeCreate, e, "bc");
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
    updated: j,
    activated: O,
    deactivated: ee,
    beforeDestroy: N,
    beforeUnmount: M,
    destroyed: L,
    unmounted: E,
    render: Y,
    renderTracked: le,
    renderTriggered: re,
    errorCaptured: K,
    serverPrefetch: T,
    // public API
    expose: te,
    inheritAttrs: ae,
    // assets
    components: v,
    directives: P,
    filters: H
  } = t;
  if (a && Xi(a, s, null), i)
    for (const B in i) {
      const z = i[B];
      V(z) && (s[B] = z.bind(n));
    }
  if (o) {
    const B = o.call(n, n);
    q(B) && (e.data = /* @__PURE__ */ vn(B));
  }
  if (Qn = !0, r)
    for (const B in r) {
      const z = r[B], tt = V(z) ? z.bind(n, n) : V(z.get) ? z.get.bind(n, n) : Le, Jt = !V(z) && V(z.set) ? z.set.bind(n) : Le, nt = xe({
        get: tt,
        set: Jt
      });
      Object.defineProperty(s, B, {
        enumerable: !0,
        configurable: !0,
        get: () => nt.value,
        set: (Pe) => nt.value = Pe
      });
    }
  if (l)
    for (const B in l)
      Jo(l[B], s, n, B);
  if (c) {
    const B = V(c) ? c.call(n) : c;
    Reflect.ownKeys(B).forEach((z) => {
      Oi(z, B[z]);
    });
  }
  f && Vs(f, e, "c");
  function X(B, z) {
    D(z) ? z.forEach((tt) => B(tt.bind(n))) : z && B(z.bind(n));
  }
  if (X($i, p), X(Ki, w), X(Ni, S), X(ki, j), X(ji, O), X(Vi, ee), X(qi, K), X(Gi, le), X(Bi, re), X(Wi, M), X(zo, E), X(Ui, T), D(te))
    if (te.length) {
      const B = e.exposed || (e.exposed = {});
      te.forEach((z) => {
        Object.defineProperty(B, z, {
          get: () => n[z],
          set: (tt) => n[z] = tt,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  Y && e.render === Le && (e.render = Y), ae != null && (e.inheritAttrs = ae), v && (e.components = v), P && (e.directives = P), T && Go(e);
}
function Xi(e, t, n = Le) {
  D(e) && (e = es(e));
  for (const s in e) {
    const o = e[s];
    let r;
    q(o) ? "default" in o ? r = nn(
      o.from || s,
      o.default,
      !0
    ) : r = nn(o.from || s) : r = nn(o), /* @__PURE__ */ ue(r) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => r.value,
      set: (i) => r.value = i
    }) : t[s] = r;
  }
}
function Vs(e, t, n) {
  Ee(
    D(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Jo(e, t, n, s) {
  let o = s.includes(".") ? Uo(n, s) : () => n[s];
  if (ne(e)) {
    const r = t[e];
    V(r) && Be(o, r);
  } else if (V(e))
    Be(o, e.bind(n));
  else if (q(e))
    if (D(e))
      e.forEach((r) => Jo(r, t, n, s));
    else {
      const r = V(e.handler) ? e.handler.bind(n) : t[e.handler];
      V(r) && Be(o, r, e);
    }
}
function Yo(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: o,
    optionsCache: r,
    config: { optionMergeStrategies: i }
  } = e.appContext, l = r.get(t);
  let c;
  return l ? c = l : !o.length && !n && !s ? c = t : (c = {}, o.length && o.forEach(
    (a) => dn(c, a, i, !0)
  ), dn(c, t, i)), q(t) && r.set(t, c), c;
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
  beforeCreate: de,
  created: de,
  beforeMount: de,
  mounted: de,
  beforeUpdate: de,
  updated: de,
  beforeDestroy: de,
  beforeUnmount: de,
  destroyed: de,
  unmounted: de,
  activated: de,
  deactivated: de,
  errorCaptured: de,
  serverPrefetch: de,
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
    return fe(
      V(e) ? e.call(this, this) : e,
      V(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Qi(e, t) {
  return Pt(es(e), es(t));
}
function es(e) {
  if (D(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function de(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Pt(e, t) {
  return e ? fe(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function $s(e, t) {
  return e ? D(e) && D(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : fe(
    /* @__PURE__ */ Object.create(null),
    js(e),
    js(t ?? {})
  ) : t;
}
function el(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = fe(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = de(e[s], t[s]);
  return n;
}
function Xo() {
  return {
    app: null,
    config: {
      isNativeTag: fo,
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
    V(s) || (s = fe({}, s)), o != null && !q(o) && (o = null);
    const r = Xo(), i = /* @__PURE__ */ new WeakSet(), l = [];
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
        return i.has(f) || (f && V(f.install) ? (i.add(f), f.install(a, ...p)) : V(f) && (i.add(f), f(a, ...p))), a;
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
          const S = a._ceVNode || Ge(s, o);
          return S.appContext = r, w === !0 ? w = "svg" : w === !1 && (w = void 0), e(S, f, w), c = !0, a._container = f, f.__vue_app__ = a, bs(S.component);
        }
      },
      onUnmount(f) {
        l.push(f);
      },
      unmount() {
        c && (Ee(
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
const sl = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Ce(t)}Modifiers`] || e[`${pt(t)}Modifiers`];
function ol(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || Q;
  let o = n;
  const r = t.startsWith("update:"), i = r && sl(s, t.slice(7));
  i && (i.trim && (o = n.map((f) => ne(f) ? f.trim() : f)), i.number && (o = o.map(Ur)));
  let l, c = s[l = Fn(t)] || // also try camelCase event handler (#2249)
  s[l = Fn(Ce(t))];
  !c && r && (c = s[l = Fn(pt(t))]), c && Ee(
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
    e.emitted[l] = !0, Ee(
      a,
      e,
      6,
      o
    );
  }
}
const rl = /* @__PURE__ */ new WeakMap();
function Zo(e, t, n = !1) {
  const s = n ? rl : t.emitsCache, o = s.get(e);
  if (o !== void 0)
    return o;
  const r = e.emits;
  let i = {}, l = !1;
  if (!V(e)) {
    const c = (a) => {
      const f = Zo(a, t, !0);
      f && (l = !0, fe(i, f));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !r && !l ? (q(e) && s.set(e, null), null) : (D(r) ? r.forEach((c) => i[c] = null) : fe(i, r), q(e) && s.set(e, i), i);
}
function Mn(e, t) {
  return !e || !mn(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), W(e, t[0].toLowerCase() + t.slice(1)) || W(e, pt(t)) || W(e, t));
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
    ctx: j,
    inheritAttrs: O
  } = e, ee = fn(e);
  let N, M;
  try {
    if (n.shapeFlag & 4) {
      const E = o || s, Y = E;
      N = He(
        a.call(
          Y,
          E,
          f,
          p,
          S,
          w,
          j
        )
      ), M = l;
    } else {
      const E = t;
      N = He(
        E.length > 1 ? E(
          p,
          { attrs: l, slots: i, emit: c }
        ) : E(
          p,
          null
        )
      ), M = t.props ? l : il(l);
    }
  } catch (E) {
    ut.length = 0, Rn(E, e, 1), N = Ge(Ye);
  }
  let L = N;
  if (M && O !== !1) {
    const E = Object.keys(M), { shapeFlag: Y } = L;
    E.length && Y & 7 && (r && E.some(_n) && (M = ll(
      M,
      r
    )), L = bt(L, M, !1, !0));
  }
  if (n.dirs && (L = bt(L, null, !1, !0), L.dirs = L.dirs ? L.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const E = Cn(L.type) && Bo(L) || L;
    _s(E, n.transition);
  }
  return N = L, fn(ee), N;
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
        if (Qo(i, s, w) && !Mn(a, w))
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
    if (Qo(t, e, r) && !Mn(n, r))
      return !0;
  }
  return !1;
}
function Qo(e, t, n) {
  const s = e[n], o = t[n];
  return n === "style" && q(s) && q(o) ? !xn(s, o) : s !== o;
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
const er = {}, tr = () => Object.create(er), nr = (e) => Object.getPrototypeOf(e) === er;
function fl(e, t, n, s = !1) {
  const o = {}, r = tr();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), sr(e, t, o, r);
  for (const i in e.propsOptions[0])
    i in o || (o[i] = void 0);
  n ? e.props = s ? o : /* @__PURE__ */ _i(o) : e.type.props ? e.props = o : e.props = r, e.attrs = r;
}
function al(e, t, n, s) {
  const {
    props: o,
    attrs: r,
    vnode: { patchFlag: i }
  } = e, l = /* @__PURE__ */ k(o), [c] = e.propsOptions;
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
          if (W(r, w))
            S !== r[w] && (r[w] = S, a = !0);
          else {
            const j = Ce(w);
            o[j] = ts(
              c,
              l,
              j,
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
    sr(e, t, o, r) && (a = !0);
    let f;
    for (const p in l)
      (!t || // for camelCase
      !W(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((f = pt(p)) === p || !W(t, f))) && (c ? n && // for camelCase
      (n[p] !== void 0 || // for kebab-case
      n[f] !== void 0) && (o[p] = ts(
        c,
        l,
        p,
        void 0,
        e,
        !0
      )) : delete o[p]);
    if (r !== l)
      for (const p in r)
        (!t || !W(t, p)) && (delete r[p], a = !0);
  }
  a && Ue(e.attrs, "set", "");
}
function sr(e, t, n, s) {
  const [o, r] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let c in t) {
      if (Ot(c))
        continue;
      const a = t[c];
      let f;
      o && W(o, f = Ce(c)) ? !r || !r.includes(f) ? n[f] = a : (l || (l = {}))[f] = a : Mn(e.emitsOptions, c) || (!(c in s) || a !== s[c]) && (s[c] = a, i = !0);
    }
  if (r) {
    const c = /* @__PURE__ */ k(n), a = l || Q;
    for (let f = 0; f < r.length; f++) {
      const p = r[f];
      n[p] = ts(
        o,
        c,
        p,
        a[p],
        e,
        !W(a, p)
      );
    }
  }
  return i;
}
function ts(e, t, n, s, o, r) {
  const i = e[n];
  if (i != null) {
    const l = W(i, "default");
    if (l && s === void 0) {
      const c = i.default;
      if (i.type !== Function && !i.skipFactory && V(c)) {
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
    ] && (s === "" || s === pt(n)) && (s = !0));
  }
  return s;
}
const dl = /* @__PURE__ */ new WeakMap();
function or(e, t, n = !1) {
  const s = n ? dl : t.propsCache, o = s.get(e);
  if (o)
    return o;
  const r = e.props, i = {}, l = [];
  let c = !1;
  if (!V(e)) {
    const f = (p) => {
      c = !0;
      const [w, S] = or(p, t, !0);
      fe(i, w), S && l.push(...S);
    };
    !n && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  if (!r && !c)
    return q(e) && s.set(e, mt), mt;
  if (D(r))
    for (let f = 0; f < r.length; f++) {
      const p = Ce(r[f]);
      ks(p) && (i[p] = Q);
    }
  else if (r)
    for (const f in r) {
      const p = Ce(f);
      if (ks(p)) {
        const w = r[f], S = i[p] = D(w) || V(w) ? { type: w } : fe({}, w), j = S.type;
        let O = !1, ee = !0;
        if (D(j))
          for (let N = 0; N < j.length; ++N) {
            const M = j[N], L = V(M) && M.name;
            if (L === "Boolean") {
              O = !0;
              break;
            } else L === "String" && (ee = !1);
          }
        else
          O = V(j) && j.name === "Boolean";
        S[
          0
          /* shouldCast */
        ] = O, S[
          1
          /* shouldCastTrue */
        ] = ee, (O || W(S, "default")) && l.push(p);
      }
    }
  const a = [i, l];
  return q(e) && s.set(e, a), a;
}
function ks(e) {
  return e[0] !== "$" && !Ot(e);
}
const ws = (e) => e === "_" || e === "_ctx" || e === "$stable", xs = (e) => D(e) ? e.map(He) : [He(e)], pl = (e, t, n) => {
  if (t._n)
    return t;
  const s = Ii((...o) => xs(t(...o)), n);
  return s._c = !1, s;
}, rr = (e, t, n) => {
  const s = e._ctx;
  for (const o in e) {
    if (ws(o)) continue;
    const r = e[o];
    if (V(r))
      t[o] = pl(o, r, s);
    else if (r != null) {
      const i = xs(r);
      t[o] = () => i;
    }
  }
}, ir = (e, t) => {
  const n = xs(t);
  e.slots.default = () => n;
}, lr = (e, t, n) => {
  for (const s in t)
    (n || !ws(s)) && (e[s] = t[s]);
}, hl = (e, t, n) => {
  const s = e.slots = tr();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (lr(s, t, n), n && mo(s, "_", o, !0)) : rr(t, s);
  } else t && ir(e, t);
}, gl = (e, t, n) => {
  const { vnode: s, slots: o } = e;
  let r = !0, i = Q;
  if (s.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? r = !1 : lr(o, t, n) : (r = !t.$stable, rr(t, o)), i = t;
  } else t && (ir(e, t), i = { default: 1 });
  if (r)
    for (const l in o)
      !ws(l) && i[l] == null && delete o[l];
}, me = xl;
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
    setScopeId: S = Le,
    insertStaticContent: j
  } = e, O = (u, d, h, y = null, _ = null, g = null, R = void 0, b = null, x = !!d.dynamicChildren) => {
    if (u === d)
      return;
    u && !Et(u, d) && (y = Yt(u), Pe(u, _, g, !0), u = null), d.patchFlag === -2 && (x = !1, d.dynamicChildren = null);
    const { type: m, ref: A, shapeFlag: C } = d;
    switch (m) {
      case En:
        ee(u, d, h, y);
        break;
      case Ye:
        N(u, d, h, y);
        break;
      case Wn:
        u == null && M(d, h, y, R);
        break;
      case be:
        v(
          u,
          d,
          h,
          y,
          _,
          g,
          R,
          b,
          x
        );
        break;
      default:
        C & 1 ? Y(
          u,
          d,
          h,
          y,
          _,
          g,
          R,
          b,
          x
        ) : C & 6 ? P(
          u,
          d,
          h,
          y,
          _,
          g,
          R,
          b,
          x
        ) : (C & 64 || C & 128) && m.process(
          u,
          d,
          h,
          y,
          _,
          g,
          R,
          b,
          x,
          Ct
        );
    }
    A != null && _ ? Ft(A, u && u.ref, g, d || u, !d) : A == null && u && u.ref != null && Ft(u.ref, null, g, u, !0);
  }, ee = (u, d, h, y) => {
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
  }, N = (u, d, h, y) => {
    u == null ? s(
      d.el = c(d.children || ""),
      h,
      y
    ) : d.el = u.el;
  }, M = (u, d, h, y) => {
    [u.el, u.anchor] = j(
      u.children,
      d,
      h,
      y,
      u.el,
      u.anchor
    );
  }, L = ({ el: u, anchor: d }, h, y) => {
    let _;
    for (; u && u !== d; )
      _ = w(u), s(u, h, y), u = _;
    s(d, h, y);
  }, E = ({ el: u, anchor: d }) => {
    let h;
    for (; u && u !== d; )
      h = w(u), o(u), u = h;
    o(d);
  }, Y = (u, d, h, y, _, g, R, b, x) => {
    if (d.type === "svg" ? R = "svg" : d.type === "math" && (R = "mathml"), u == null)
      le(
        d,
        h,
        y,
        _,
        g,
        R,
        b,
        x
      );
    else {
      const m = u.el && u.el._isVueCE ? u.el : null;
      try {
        m && m._beginPatch(), T(
          u,
          d,
          _,
          g,
          R,
          b,
          x
        );
      } finally {
        m && m._endPatch();
      }
    }
  }, le = (u, d, h, y, _, g, R, b) => {
    let x, m;
    const { props: A, shapeFlag: C, transition: I, dirs: F } = u;
    if (x = u.el = i(
      u.type,
      g,
      A && A.is,
      A
    ), C & 8 ? f(x, u.children) : C & 16 && K(
      u.children,
      x,
      null,
      y,
      _,
      kn(u, g),
      R,
      b
    ), F && st(u, null, y, "created"), re(x, u, u.scopeId, R, y), A) {
      for (const J in A)
        J !== "value" && !Ot(J) && r(x, J, null, A[J], g, y);
      "value" in A && r(x, "value", null, A.value, g), (m = A.onVnodeBeforeMount) && Te(m, y, u);
    }
    F && st(u, null, y, "beforeMount");
    const $ = yl(_, I);
    $ && I.beforeEnter(x), s(x, d, h), ((m = A && A.onVnodeMounted) || $ || F) && me(() => {
      try {
        m && Te(m, y, u), $ && I.enter(x), F && st(u, null, y, "mounted");
      } finally {
      }
    }, _);
  }, re = (u, d, h, y, _) => {
    if (h && S(u, h), y)
      for (let g = 0; g < y.length; g++)
        S(u, y[g]);
    if (_) {
      let g = _.subTree;
      if (d === g || ar(g.type) && (g.ssContent === d || g.ssFallback === d)) {
        const R = _.vnode;
        re(
          u,
          R,
          R.scopeId,
          R.slotScopeIds,
          _.parent
        );
      }
    }
  }, K = (u, d, h, y, _, g, R, b, x = 0) => {
    for (let m = x; m < u.length; m++) {
      const A = u[m] = b ? We(u[m]) : He(u[m]);
      O(
        null,
        A,
        d,
        h,
        y,
        _,
        g,
        R,
        b
      );
    }
  }, T = (u, d, h, y, _, g, R) => {
    const b = d.el = u.el;
    let { patchFlag: x, dynamicChildren: m, dirs: A } = d;
    x |= u.patchFlag & 16;
    const C = u.props || Q, I = d.props || Q;
    let F;
    if (h && ot(h, !1), (F = I.onVnodeBeforeUpdate) && Te(F, h, d, u), A && st(d, u, h, "beforeUpdate"), h && ot(h, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    m && (!u.dynamicChildren || u.dynamicChildren.length !== m.length) && (x = 0, R = !1, m = null), (C.innerHTML && I.innerHTML == null || C.textContent && I.textContent == null) && f(b, ""), m ? te(
      u.dynamicChildren,
      m,
      b,
      h,
      y,
      kn(d, _),
      g
    ) : R || z(
      u,
      d,
      b,
      null,
      h,
      y,
      kn(d, _),
      g,
      !1
    ), x > 0) {
      if (x & 16)
        ae(b, C, I, h, _);
      else if (x & 2 && C.class !== I.class && r(b, "class", null, I.class, _), x & 4 && r(b, "style", C.style, I.style, _), x & 8) {
        const $ = d.dynamicProps;
        for (let J = 0; J < $.length; J++) {
          const G = $[J], se = C[G], ie = I[G];
          (ie !== se || G === "value") && r(b, G, se, ie, _, h);
        }
      }
      x & 1 && u.children !== d.children && f(b, d.children);
    } else !R && m == null && ae(b, C, I, h, _);
    ((F = I.onVnodeUpdated) || A) && me(() => {
      F && Te(F, h, d, u), A && st(d, u, h, "updated");
    }, y);
  }, te = (u, d, h, y, _, g, R) => {
    for (let b = 0; b < d.length; b++) {
      const x = u[b], m = d[b], A = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        x.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (x.type === be || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Et(x, m) || // - In the case of a component, it could contain anything.
        x.shapeFlag & 198) ? p(x.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          h
        )
      );
      O(
        x,
        m,
        A,
        null,
        y,
        _,
        g,
        R,
        !0
      );
    }
  }, ae = (u, d, h, y, _) => {
    if (d !== h) {
      if (d !== Q)
        for (const g in d)
          !Ot(g) && !(g in h) && r(
            u,
            g,
            d[g],
            null,
            _,
            y
          );
      for (const g in h) {
        if (Ot(g)) continue;
        const R = h[g], b = d[g];
        R !== b && g !== "value" && r(u, g, b, R, _, y);
      }
      "value" in h && r(u, "value", d.value, h.value, _);
    }
  }, v = (u, d, h, y, _, g, R, b, x) => {
    const m = d.el = u ? u.el : l(""), A = d.anchor = u ? u.anchor : l("");
    let { patchFlag: C, dynamicChildren: I, slotScopeIds: F } = d;
    F && (b = b ? b.concat(F) : F), u == null ? (s(m, h, y), s(A, h, y), K(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      d.children || [],
      h,
      A,
      _,
      g,
      R,
      b,
      x
    )) : C > 0 && C & 64 && I && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    u.dynamicChildren && u.dynamicChildren.length === I.length ? (te(
      u.dynamicChildren,
      I,
      h,
      _,
      g,
      R,
      b
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (d.key != null || _ && d === _.subTree) && cr(
      u,
      d,
      !0
      /* shallow */
    )) : z(
      u,
      d,
      h,
      A,
      _,
      g,
      R,
      b,
      x
    );
  }, P = (u, d, h, y, _, g, R, b, x) => {
    d.slotScopeIds = b, u == null ? d.shapeFlag & 512 ? _.ctx.activate(
      d,
      h,
      y,
      R,
      x
    ) : H(
      d,
      h,
      y,
      _,
      g,
      R,
      x
    ) : U(u, d, x);
  }, H = (u, d, h, y, _, g, R) => {
    const b = u.component = Pl(
      u,
      y,
      _
    );
    if (ys(u) && (b.ctx.renderer = Ct), Ol(b, !1, R), b.asyncDep) {
      if (_ && _.registerDep(b, X, R), !u.el) {
        const x = b.subTree = Ge(Ye);
        N(null, x, d, h), u.placeholder = x.el;
      }
    } else
      X(
        b,
        u,
        d,
        h,
        _,
        g,
        R
      );
  }, U = (u, d, h) => {
    const y = d.component = u.component;
    if (cl(u, d, h))
      if (y.asyncDep && !y.asyncResolved) {
        B(y, d, h);
        return;
      } else
        y.next = d, y.update();
    else
      d.el = u.el, y.vnode = d;
  }, X = (u, d, h, y, _, g, R) => {
    const b = () => {
      if (u.isMounted) {
        let { next: C, bu: I, u: F, parent: $, vnode: J } = u;
        {
          const Oe = ur(u);
          if (Oe) {
            C && (C.el = J.el, B(u, C, R)), Oe.asyncDep.then(() => {
              me(() => {
                u.isUnmounted || m();
              }, _);
            });
            return;
          }
        }
        let G = C, se;
        ot(u, !1), C ? (C.el = J.el, B(u, C, R)) : C = J, I && Dn(I), (se = C.props && C.props.onVnodeBeforeUpdate) && Te(se, $, C, J), ot(u, !0);
        const ie = Ks(u), Ie = u.subTree;
        u.subTree = ie, O(
          Ie,
          ie,
          // parent may have changed if it's in a teleport
          p(Ie.el),
          // anchor may have changed if it's in a fragment
          Yt(Ie),
          u,
          _,
          g
        ), C.el = ie.el, G === null && ul(u, ie.el), F && me(F, _), (se = C.props && C.props.onVnodeUpdated) && me(
          () => Te(se, $, C, J),
          _
        );
      } else {
        let C;
        const { el: I, props: F } = d, { bm: $, m: J, parent: G, root: se, type: ie } = u, Ie = Dt(d);
        ot(u, !1), $ && Dn($), !Ie && (C = F && F.onVnodeBeforeMount) && Te(C, G, d), ot(u, !0);
        {
          se.ce && se.ce._hasShadowRoot() && se.ce._injectChildStyle(
            ie,
            u.parent ? u.parent.type : void 0
          );
          const Oe = u.subTree = Ks(u);
          O(
            null,
            Oe,
            h,
            y,
            u,
            _,
            g
          ), d.el = Oe.el;
        }
        if (J && me(J, _), !Ie && (C = F && F.onVnodeMounted)) {
          const Oe = d;
          me(
            () => Te(C, G, Oe),
            _
          );
        }
        (d.shapeFlag & 256 || G && Dt(G.vnode) && G.vnode.shapeFlag & 256) && u.a && me(u.a, _), u.isMounted = !0, d = h = y = null;
      }
    };
    u.scope.on();
    const x = u.effect = new bo(b);
    u.scope.off();
    const m = u.update = x.run.bind(x), A = u.job = x.runIfDirty.bind(x);
    A.i = u, A.id = u.uid, x.scheduler = () => ms(A), ot(u, !0), m();
  }, B = (u, d, h) => {
    d.component = u;
    const y = u.vnode.props;
    u.vnode = d, u.next = null, al(u, d.props, y, h), gl(u, d.children, h), qe(), Fs(u), ze();
  }, z = (u, d, h, y, _, g, R, b, x = !1) => {
    const m = u && u.children, A = u ? u.shapeFlag : 0, C = d.children, { patchFlag: I, shapeFlag: F } = d;
    if (I > 0) {
      if (I & 128) {
        Jt(
          m,
          C,
          h,
          y,
          _,
          g,
          R,
          b,
          x
        );
        return;
      } else if (I & 256) {
        tt(
          m,
          C,
          h,
          y,
          _,
          g,
          R,
          b,
          x
        );
        return;
      }
    }
    F & 8 ? (A & 16 && Rt(m, _, g), C !== m && f(h, C)) : A & 16 ? F & 16 ? Jt(
      m,
      C,
      h,
      y,
      _,
      g,
      R,
      b,
      x
    ) : Rt(m, _, g, !0) : (A & 8 && f(h, ""), F & 16 && K(
      C,
      h,
      y,
      _,
      g,
      R,
      b,
      x
    ));
  }, tt = (u, d, h, y, _, g, R, b, x) => {
    u = u || mt, d = d || mt;
    const m = u.length, A = d.length, C = Math.min(m, A);
    let I;
    for (I = 0; I < C; I++) {
      const F = d[I] = x ? We(d[I]) : He(d[I]);
      O(
        u[I],
        F,
        h,
        null,
        _,
        g,
        R,
        b,
        x
      );
    }
    m > A ? Rt(
      u,
      _,
      g,
      !0,
      !1,
      C
    ) : K(
      d,
      h,
      y,
      _,
      g,
      R,
      b,
      x,
      C
    );
  }, Jt = (u, d, h, y, _, g, R, b, x) => {
    let m = 0;
    const A = d.length;
    let C = u.length - 1, I = A - 1;
    for (; m <= C && m <= I; ) {
      const F = u[m], $ = d[m] = x ? We(d[m]) : He(d[m]);
      if (Et(F, $))
        O(
          F,
          $,
          h,
          null,
          _,
          g,
          R,
          b,
          x
        );
      else
        break;
      m++;
    }
    for (; m <= C && m <= I; ) {
      const F = u[C], $ = d[I] = x ? We(d[I]) : He(d[I]);
      if (Et(F, $))
        O(
          F,
          $,
          h,
          null,
          _,
          g,
          R,
          b,
          x
        );
      else
        break;
      C--, I--;
    }
    if (m > C) {
      if (m <= I) {
        const F = I + 1, $ = F < A ? d[F].el : y;
        for (; m <= I; )
          O(
            null,
            d[m] = x ? We(d[m]) : He(d[m]),
            h,
            $,
            _,
            g,
            R,
            b,
            x
          ), m++;
      }
    } else if (m > I)
      for (; m <= C; )
        Pe(u[m], _, g, !0), m++;
    else {
      const F = m, $ = m, J = /* @__PURE__ */ new Map();
      for (m = $; m <= I; m++) {
        const ye = d[m] = x ? We(d[m]) : He(d[m]);
        ye.key != null && J.set(ye.key, m);
      }
      let G, se = 0;
      const ie = I - $ + 1;
      let Ie = !1, Oe = 0;
      const St = new Array(ie);
      for (m = 0; m < ie; m++) St[m] = 0;
      for (m = F; m <= C; m++) {
        const ye = u[m];
        if (se >= ie) {
          Pe(ye, _, g, !0);
          continue;
        }
        let Ae;
        if (ye.key != null)
          Ae = J.get(ye.key);
        else
          for (G = $; G <= I; G++)
            if (St[G - $] === 0 && Et(ye, d[G])) {
              Ae = G;
              break;
            }
        Ae === void 0 ? Pe(ye, _, g, !0) : (St[Ae - $] = m + 1, Ae >= Oe ? Oe = Ae : Ie = !0, O(
          ye,
          d[Ae],
          h,
          null,
          _,
          g,
          R,
          b,
          x
        ), se++);
      }
      const Cs = Ie ? wl(St) : mt;
      for (G = Cs.length - 1, m = ie - 1; m >= 0; m--) {
        const ye = $ + m, Ae = d[ye], Ss = d[ye + 1], Ms = ye + 1 < A ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Ss.el || fr(Ss)
        ) : y;
        St[m] === 0 ? O(
          null,
          Ae,
          h,
          Ms,
          _,
          g,
          R,
          b,
          x
        ) : Ie && (G < 0 || m !== Cs[G] ? nt(Ae, h, Ms, 2) : G--);
      }
    }
  }, nt = (u, d, h, y, _ = null) => {
    const { el: g, type: R, transition: b, children: x, shapeFlag: m } = u;
    if (m & 6) {
      nt(u.component.subTree, d, h, y);
      return;
    }
    if (m & 128) {
      u.suspense.move(d, h, y);
      return;
    }
    if (m & 64) {
      R.move(u, d, h, Ct);
      return;
    }
    if (R === be) {
      s(g, d, h);
      for (let C = 0; C < x.length; C++)
        nt(x[C], d, h, y);
      s(u.anchor, d, h);
      return;
    }
    if (R === Wn) {
      L(u, d, h);
      return;
    }
    if (y !== 2 && m & 1 && b)
      if (y === 0)
        b.persisted && !g[$n] ? s(g, d, h) : (b.beforeEnter(g), s(g, d, h), me(() => b.enter(g), _));
      else {
        const { leave: C, delayLeave: I, afterLeave: F } = b, $ = () => {
          u.ctx.isUnmounted ? o(g) : s(g, d, h);
        }, J = () => {
          const G = g._isLeaving || !!g[$n];
          g._isLeaving && g[$n](
            !0
            /* cancelled */
          ), b.persisted && !G ? $() : C(g, () => {
            $(), F && F();
          });
        };
        I ? I(g, $, J) : J();
      }
    else
      s(g, d, h);
  }, Pe = (u, d, h, y = !1, _ = !1) => {
    const {
      type: g,
      props: R,
      ref: b,
      children: x,
      dynamicChildren: m,
      shapeFlag: A,
      patchFlag: C,
      dirs: I,
      cacheIndex: F,
      memo: $
    } = u;
    if (C === -2 && (_ = !1), b != null && (qe(), Ft(b, null, h, u, !0), ze()), F != null && (d.renderCache[F] = void 0), A & 256) {
      d.ctx.deactivate(u);
      return;
    }
    const J = A & 1 && I, G = !Dt(u);
    let se;
    if (G && (se = R && R.onVnodeBeforeUnmount) && Te(se, d, u), A & 6)
      $r(u.component, h, y);
    else {
      if (A & 128) {
        u.suspense.unmount(h, y);
        return;
      }
      J && st(u, null, d, "beforeUnmount"), A & 64 ? u.type.remove(
        u,
        d,
        h,
        Ct,
        y
      ) : m && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !m.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (g !== be || C > 0 && C & 64) ? Rt(
        m,
        d,
        h,
        !1,
        !0
      ) : (g === be && C & 384 || !_ && A & 16) && Rt(x, d, h), y && vs(u);
    }
    const ie = $ != null && F == null;
    (G && (se = R && R.onVnodeUnmounted) || J || ie) && me(() => {
      se && Te(se, d, u), J && st(u, null, d, "unmounted"), ie && (u.el = null);
    }, h);
  }, vs = (u) => {
    const { type: d, el: h, anchor: y, transition: _ } = u;
    if (d === be) {
      Lr(h, y);
      return;
    }
    if (d === Wn) {
      E(u);
      return;
    }
    const g = () => {
      o(h), _ && !_.persisted && _.afterLeave && _.afterLeave();
    };
    if (u.shapeFlag & 1 && _ && !_.persisted) {
      const { leave: R, delayLeave: b } = _, x = () => R(h, g);
      b ? b(u.el, g, x) : x();
    } else
      g();
  }, Lr = (u, d) => {
    let h;
    for (; u !== d; )
      h = w(u), o(u), u = h;
    o(d);
  }, $r = (u, d, h) => {
    const { bum: y, scope: _, job: g, subTree: R, um: b, m: x, a: m } = u;
    Ws(x), Ws(m), y && Dn(y), _.stop(), g && (g.flags |= 8, Pe(R, u, d, h)), b && me(b, d), me(() => {
      u.isUnmounted = !0;
    }, d);
  }, Rt = (u, d, h, y = !1, _ = !1, g = 0) => {
    for (let R = g; R < u.length; R++)
      Pe(u[R], d, h, y, _);
  }, Yt = (u) => {
    if (u.shapeFlag & 6)
      return Yt(u.component.subTree);
    if (u.shapeFlag & 128)
      return u.suspense.next();
    const d = w(u.anchor || u.el), h = d && d[Di];
    return h ? w(h) : d;
  };
  let Tn = !1;
  const Rs = (u, d, h) => {
    let y;
    u == null ? d._vnode && (Pe(d._vnode, null, null, !0), y = d._vnode.component) : O(
      d._vnode || null,
      u,
      d,
      null,
      null,
      null,
      h
    ), d._vnode = u, Tn || (Tn = !0, Fs(y), Ko(), Tn = !1);
  }, Ct = {
    p: O,
    um: Pe,
    m: nt,
    r: vs,
    mt: H,
    mc: K,
    pc: z,
    pbc: te,
    n: Yt,
    o: e
  };
  return {
    render: Rs,
    hydrate: void 0,
    createApp: nl(Rs)
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
function cr(e, t, n = !1) {
  const s = e.children, o = t.children;
  if (D(s) && D(o))
    for (let r = 0; r < s.length; r++) {
      const i = s[r];
      let l = o[r];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = o[r] = We(o[r]), l.el = i.el), !n && l.patchFlag !== -2 && cr(i, l)), l.type === En && (l.patchFlag === -1 && (l = o[r] = We(l)), l.el = i.el), l.type === Ye && !l.el && (l.el = i.el);
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
function ur(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : ur(t);
}
function Ws(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function fr(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? fr(t.subTree) : null;
}
const ar = (e) => e.__isSuspense;
function xl(e, t) {
  t && t.pendingBranch ? D(e) ? t.effects.push(...e) : t.effects.push(e) : Pi(e);
}
const be = /* @__PURE__ */ Symbol.for("v-fgt"), En = /* @__PURE__ */ Symbol.for("v-txt"), Ye = /* @__PURE__ */ Symbol.for("v-cmt"), Wn = /* @__PURE__ */ Symbol.for("v-stc"), ut = [];
let ve = null;
function ge(e = !1) {
  ut.push(ve = e ? null : []);
}
function dr() {
  ut.pop(), ve = ut[ut.length - 1] || null;
}
let Nt = 1;
function Us(e, t = !1) {
  Nt += e, e < 0 && ve && t && (ve.hasOnce = !0);
}
function pr(e) {
  return e.dynamicChildren = Nt > 0 ? ve || mt : null, dr(), Nt > 0 && ve && ve.push(e), e;
}
function we(e, t, n, s, o, r) {
  return pr(
    it(
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
  return pr(
    Ge(
      e,
      t,
      n,
      s,
      o,
      !0
    )
  );
}
function hr(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Et(e, t) {
  return e.type === t.type && e.key === t.key;
}
const gr = ({ key: e }) => e ?? null, sn = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? ne(e) || /* @__PURE__ */ ue(e) || V(e) ? { i: Ve, r: e, k: t, f: !!n } : e : null);
function it(e, t = null, n = null, s = 0, o = null, r = e === be ? 0 : 1, i = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && gr(t),
    ref: t && sn(t),
    scopeId: ko,
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
    ctx: Ve
  };
  return l ? (pn(c, n), r & 128 && e.normalize(c)) : n && (c.shapeFlag |= ne(n) ? 8 : 16), Nt > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  ve && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && ve.push(c), c;
}
const Ge = vl;
function vl(e, t = null, n = null, s = 0, o = null, r = !1) {
  if ((!e || e === zi) && (e = Ye), hr(e)) {
    const l = bt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && pn(l, n), Nt > 0 && !r && ve && (l.shapeFlag & 6 ? ve[ve.indexOf(e)] = l : ve.push(l)), l.patchFlag = -2, l;
  }
  if (Dl(e) && (e = e.__vccOpts), t) {
    t = Rl(t);
    let { class: l, style: c } = t;
    l && !ne(l) && (t.class = Vt(l)), q(c) && (/* @__PURE__ */ gs(c) && !D(c) && (c = fe({}, c)), t.style = jt(c));
  }
  const i = ne(e) ? 1 : ar(e) ? 128 : Cn(e) ? 64 : q(e) ? 4 : V(e) ? 2 : 0;
  return it(
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
function Rl(e) {
  return e ? /* @__PURE__ */ gs(e) || nr(e) ? fe({}, e) : e : null;
}
function bt(e, t, n = !1, s = !1) {
  const { props: o, ref: r, patchFlag: i, children: l, transition: c } = e, a = t ? Sl(o || {}, t) : o, f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: a,
    key: a && gr(a),
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
    patchFlag: t && e.type !== be ? i === -1 ? 16 : i | 16 : i,
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
  return c && s && _s(
    f,
    c.clone(f)
  ), f;
}
function Cl(e = " ", t = 0) {
  return Ge(En, null, e, t);
}
function Bs(e = "", t = !1) {
  return t ? (ge(), bl(Ye, null, e)) : Ge(Ye, null, e);
}
function He(e) {
  return e == null || typeof e == "boolean" ? Ge(Ye) : D(e) ? Ge(
    be,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : hr(e) ? We(e) : Ge(En, null, String(e));
}
function We(e) {
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
      !o && !nr(t) ? t._ctx = Ve : o === 3 && Ve && (Ve.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (V(t)) {
    if (s & 65) {
      pn(e, { default: t });
      return;
    }
    t = { default: t, _ctx: Ve }, n = 32;
  } else
    t = String(t), s & 64 ? (n = 16, t = [Cl(t)]) : n = 8;
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
function Te(e, t, n, s = null) {
  Ee(e, t, 7, [
    n,
    s
  ]);
}
const Ml = Xo();
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
    scope: new Zr(
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
    propsOptions: or(s, o),
    emitsOptions: Zo(s, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: Q,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
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
  return r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = ol.bind(null, r), e.ce && e.ce(r), r;
}
let he = null;
const Il = () => he || Ve;
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
    (n) => he = n
  ), kt = t(
    "__VUE_SSR_SETTERS__",
    (n) => Wt = n
  );
}
const Gt = (e) => {
  const t = he;
  return hn(e), e.scope.on(), () => {
    e.scope.off(), hn(t);
  };
}, Gs = () => {
  he && he.scope.off(), hn(null);
};
function mr(e) {
  return e.vnode.shapeFlag & 4;
}
let Wt = !1;
function Ol(e, t = !1, n = !1) {
  t && kt(t);
  const { props: s, children: o } = e.vnode, r = mr(e);
  fl(e, s, r, t), hl(e, o, n || t);
  const i = r ? Al(e, t) : void 0;
  return t && kt(!1), i;
}
function Al(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Ji);
  const { setup: s } = n;
  if (s) {
    qe();
    const o = e.setupContext = s.length > 1 ? Fl(e) : null, r = Gt(e), i = Bt(
      s,
      e,
      0,
      [
        e.props,
        o
      ]
    ), l = ao(i);
    if (ze(), r(), (l || e.sp) && !Dt(e) && Go(e), l) {
      if (i.then(Gs, Gs), t)
        return i.then((c) => {
          kt(!0);
          try {
            qs(e, c, t);
          } finally {
            kt(!1);
          }
        }).catch((c) => {
          Rn(c, e, 0);
        });
      e.asyncDep = i;
    } else
      qs(e, i);
  } else
    _r(e);
}
function qs(e, t, n) {
  V(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : q(t) && (e.setupState = jo(t)), _r(e);
}
function _r(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || Le);
  {
    const o = Gt(e);
    qe();
    try {
      Yi(e);
    } finally {
      ze(), o();
    }
  }
}
const Tl = {
  get(e, t) {
    return ce(e, "get", ""), e[t];
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
function bs(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(jo(yi(e.exposed)), {
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
  return V(e) && "__vccOpts" in e;
}
const xe = (e, t) => /* @__PURE__ */ Ri(e, t, Wt), Hl = "3.5.42";
/**
* @vue/runtime-dom v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let ns;
const zs = typeof window < "u" && window.trustedTypes;
if (zs)
  try {
    ns = /* @__PURE__ */ zs.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const yr = ns ? (e) => ns.createHTML(e) : (e) => e, jl = "http://www.w3.org/2000/svg", Vl = "http://www.w3.org/1998/Math/MathML", ke = typeof document < "u" ? document : null, Js = ke && /* @__PURE__ */ ke.createElement("template"), Ll = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const o = t === "svg" ? ke.createElementNS(jl, e) : t === "mathml" ? ke.createElementNS(Vl, e) : n ? ke.createElement(e, { is: n }) : ke.createElement(e);
    return e === "select" && s && s.multiple != null && o.setAttribute("multiple", s.multiple), o;
  },
  createText: (e) => ke.createTextNode(e),
  createComment: (e) => ke.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => ke.querySelector(e),
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
      Js.innerHTML = yr(
        s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e
      );
      const l = Js.content;
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
const Ys = /* @__PURE__ */ Symbol("_vod"), Nl = /* @__PURE__ */ Symbol("_vsh"), kl = /* @__PURE__ */ Symbol(""), Wl = /(?:^|;)\s*display\s*:/;
function Ul(e, t, n) {
  const s = e.style, o = ne(n);
  let r = !1;
  if (n && !o) {
    if (t)
      if (ne(t))
        for (const i of t.split(";")) {
          const l = i.slice(0, i.indexOf(":")).trim();
          n[l] == null && It(s, l, "");
        }
      else
        for (const i in t)
          n[i] == null && It(s, i, "");
    for (const i in n) {
      i === "display" && (r = !0);
      const l = n[i];
      l != null ? Gl(
        e,
        i,
        !ne(t) && t ? t[i] : void 0,
        l
      ) || It(s, i, l) : It(s, i, "");
    }
  } else if (o) {
    if (t !== n) {
      const i = s[kl];
      i && (n += ";" + i), s.cssText = n, r = Wl.test(n);
    }
  } else t && e.removeAttribute("style");
  Ys in e && (e[Ys] = r ? s.display : "", e[Nl] && (s.display = "none"));
}
const en = /\s*!important$/;
function It(e, t, n) {
  if (D(n))
    n.forEach((s) => It(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    en.test(n) ? e.setProperty(t, n.replace(en, ""), "important") : e.setProperty(t, n);
  else {
    const s = Bl(e, t);
    en.test(n) ? e.setProperty(
      pt(s),
      n.replace(en, ""),
      "important"
    ) : e[s] = n;
  }
}
const Xs = ["Webkit", "Moz", "ms"], Un = {};
function Bl(e, t) {
  const n = Un[t];
  if (n)
    return n;
  let s = Ce(t);
  if (s !== "filter" && s in e)
    return Un[t] = s;
  s = go(s);
  for (let o = 0; o < Xs.length; o++) {
    const r = Xs[o] + s;
    if (r in e)
      return Un[t] = r;
  }
  return t;
}
function Gl(e, t, n, s) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && ne(s) && n === s;
}
const Zs = "http://www.w3.org/1999/xlink";
function Qs(e, t, n, s, o, r = Yr(t)) {
  s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Zs, t.slice(6, t.length)) : e.setAttributeNS(Zs, t, n) : n == null || r && !_o(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    r ? "" : Ke(n) ? String(n) : n
  );
}
function eo(e, t, n, s, o) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? yr(n) : n);
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
    l === "boolean" ? n = _o(n) : n == null && l === "string" ? (n = "", i = !0) : l === "number" && (n = 0, i = !0);
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
const to = /* @__PURE__ */ Symbol("_vei");
function Jl(e, t, n, s, o = null) {
  const r = e[to] || (e[to] = {}), i = r[t];
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
  return [e[2] === ":" ? e.slice(3) : pt(e.slice(2)), t];
}
let Bn = 0;
const Ql = /* @__PURE__ */ Promise.resolve(), ec = () => Bn || (Ql.then(() => Bn = 0), Bn = Date.now());
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
        a && Ee(
          a,
          t,
          5,
          l
        );
      }
    } else
      Ee(
        o,
        t,
        5,
        [s]
      );
  };
  return n.value = e, n.attached = ec(), n;
}
const no = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, nc = (e, t, n, s, o, r) => {
  const i = o === "svg";
  t === "class" ? Kl(e, s, i) : t === "style" ? Ul(e, n, s) : mn(t) ? _n(t) || Jl(e, t, n, s, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : sc(e, t, s, i)) ? (eo(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Qs(e, t, s, i, r, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (oc(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !ne(s))) ? eo(e, Ce(t), s, r, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), Qs(e, t, s, i));
};
function sc(e, t, n, s) {
  if (s)
    return !!(t === "innerHTML" || t === "textContent" || t in e && no(t) && V(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return no(t) && ne(n) ? !1 : t in e;
}
function oc(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const s = Ce(t);
  return Array.isArray(n) ? n.some((o) => Ce(o) === s) : Object.keys(n).some((o) => Ce(o) === s);
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
}, cc = /* @__PURE__ */ fe({ patchProp: nc }, Ll);
let so;
function uc() {
  return so || (so = ml(cc));
}
const fc = (...e) => {
  const t = uc().createApp(...e), { mount: n } = t;
  return t.mount = (s) => {
    const o = dc(s);
    if (!o) return;
    const r = t._component;
    !V(r) && !r.render && !r.template && (r.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
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
  return ne(e) ? document.querySelector(e) : e;
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
function ss(...e) {
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
function oo(...e) {
  const t = {};
  for (let n of e)
    if (n = rn(n), !!n)
      for (const s of Reflect.ownKeys(n)) {
        const o = n[s];
        o !== void 0 && (t[s] = o);
      }
  return t;
}
function wr(e) {
  return typeof e == "function" ? e : (t) => {
    var n;
    return (n = e.next) == null ? void 0 : n.call(e, t);
  };
}
function gc(e) {
  return Object.assign(e, {
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: Be(e, wr(t), { flush: "sync" }) })
  });
}
function mc(e) {
  return Object.assign(e, {
    set: (t) => {
      e.value = typeof t == "function" ? t(e.value) : t;
    },
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: Be(e, wr(t), { flush: "sync" }) })
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
    createReadonlyAtom: (t, n) => gc(xe(() => t())),
    createWritableAtom: (t, n) => mc(/* @__PURE__ */ wi(t)),
    untrack: (t) => t(),
    batch: (t) => t()
  };
}
function Pn(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function ft(e) {
  if (Array.isArray(e)) return e.map(ft);
  if (e && typeof e == "object") {
    const t = Object.getPrototypeOf(e);
    if (t !== Object.prototype && t !== null) return e;
    const n = t === null ? _e() : {}, s = Object.keys(e);
    for (let o = 0; o < s.length; o++) {
      const r = s[o];
      Object.defineProperty(n, r, {
        configurable: !0,
        enumerable: !0,
        value: ft(e[r]),
        writable: !0
      });
    }
    return n;
  }
  return e;
}
function _e() {
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
function ro(e) {
  if (typeof e != "object" || e === null) return !1;
  if (Array.isArray(e)) return !0;
  const t = Object.getPrototypeOf(e);
  return t === Object.prototype || t === null;
}
function io(e) {
  return Reflect.ownKeys(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
const wc = 3;
function xc(e, t) {
  return xr(e, t, wc);
}
function xr(e, t, n) {
  if (Object.is(e, t)) return !0;
  if (n <= 0 || !ro(e) || !ro(t) || (Array.isArray(e) || Array.isArray(t)) && (!Array.isArray(e) || !Array.isArray(t) || e.length !== t.length))
    return !1;
  const s = io(e), o = io(t);
  if (s.length !== o.length) return !1;
  const r = e, i = t;
  for (let l = 0; l < s.length; l++) {
    const c = s[l];
    if (!Object.prototype.propertyIsEnumerable.call(t, c) || !xr(r[c], i[c], n - 1)) return !1;
  }
  return !0;
}
function In(e, t, n, s = xc) {
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
const vc = ({ fn: e, memoDeps: t, onAfterCompare: n, onAfterUpdate: s, onBeforeCompare: o, onBeforeUpdate: r }) => {
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
function Rc(e) {
  let t = !1;
  return () => {
    if (!t) {
      t = !0;
      return;
    }
    e();
  };
}
function On({ feature: e, fnName: t, objectId: n, onAfterUpdate: s, table: o, ...r }) {
  const i = () => {
    if (!s) return;
    const { schedule: c, untrack: a } = o._reactivity;
    c(() => a(() => s()));
  };
  return vc({
    ...r,
    ...{ onAfterUpdate: () => {
      i();
    } }
  });
}
function br(e, t = "_") {
  const [n, s] = e.split(t);
  return {
    fnKey: s,
    fnName: `${n}.${s}`,
    parentName: n
  };
}
function vt(e, t, n) {
  for (const [s, { fn: o, memoDeps: r }] of Object.entries(n)) {
    const { fnKey: i, fnName: l } = br(s);
    t[i] = r ? On({
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
    const { fnKey: l, fnName: c } = br(o);
    if (i) {
      const a = `_memo_${l}`;
      t[l] = function(...f) {
        if (!this[a]) {
          const p = this;
          this[a] = On({
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
function $e(e, t, n, ...s) {
  var o;
  return ((o = e[t]) == null ? void 0 : o.call(e, ...s)) ?? n(e, ...s);
}
function Cc(e) {
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
    cell_getValue: { fn: (n) => Cc(n) },
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
function vr(e, t, n) {
  const s = Pc(e), o = Object.create(s);
  o.colSpan = 0, o.column = t, o.depth = n.depth, o.headerGroup = null, o.id = n.id ?? t.id, o.index = n.index, o.isPlaceholder = !!n.isPlaceholder, o.placeholderId = n.placeholderId, o.rowSpan = 0, o.subHeaders = [];
  const r = e._headerInstanceInitFns;
  for (let i = 0; i < r.length; i++) r[i](o);
  return o;
}
function Ic() {
  return {
    start: [],
    end: []
  };
}
function at(e) {
  var s;
  const t = (s = e.table.atoms.columnVisibility) == null ? void 0 : s.get();
  if (!t) return !0;
  const n = e.columns;
  return n.length ? n.some((o) => $e(o, "getIsVisible", at)) : (qt(t, e.id) ? t[e.id] : void 0) ?? !0;
}
function Oc(e) {
  return e.getAllLeafColumns().filter((t) => $e(t, "getIsVisible", at));
}
function Rr(e, t = 1) {
  let n = t;
  for (let s = 0; s < e.length; s++) {
    const o = e[s];
    $e(o, "getIsVisible", at) && o.columns.length && (n = Math.max(n, Rr(o.columns, t + 1)));
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
function Cr(e, t, n, s, o, r) {
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
      const j = vr(n, w, {
        id: Tc(s, t, w.id, a.id),
        isPlaceholder: S,
        placeholderId: S ? String(Fc(l, w)) : void 0,
        depth: t,
        index: l.length
      });
      j.subHeaders.push(a), l.push(j);
    }
    i.headers.push(a), a.headerGroup = i;
  }
  for (let c = 0; c < r.length; c++) r[c](i);
  o.push(i), t > 0 && Cr(l, t - 1, n, s, o, r);
}
function Sr(e) {
  for (let t = 0; t < e.length; t++) {
    const n = e[t];
    if (!$e(n.column, "getIsVisible", at)) continue;
    let s = 0;
    if (n.subHeaders.length) {
      Sr(n.subHeaders);
      for (let o = 0; o < n.subHeaders.length; o++) {
        const r = n.subHeaders[o];
        $e(r.column, "getIsVisible", at) && (s += r.colSpan);
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
function lo(e, t, n, s) {
  var c;
  const o = Rr(e), r = [], i = n._headerGroupInstanceInitFns, l = new Array(t.length);
  for (let a = 0; a < t.length; a++)
    a in t && (l[a] = vr(n, t[a], {
      depth: o,
      index: a
    }));
  return Cr(l, o - 1, n, s, r, i), r.reverse(), Sr(((c = r[0]) == null ? void 0 : c.headers) ?? []), r;
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
      let j = S;
      for (let O = 0; O < w.length; O++) {
        const ee = w[O];
        j = j == null ? void 0 : j[ee];
      }
      return j;
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
function Mr(e) {
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
    return $e(e.table, "getOrderColumns", Mr)(t);
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
function Er(e, t, n, s = 0) {
  const o = new Array(t.length);
  for (let r = 0; r < t.length; r++) {
    if (!(r in t)) continue;
    const i = t[r], l = Hc(e, i, s, n), c = i;
    l.columns = c.columns ? Er(e, c.columns, l, s + 1) : [], o[r] = l;
  }
  return o;
}
function Kc(e) {
  return Er(e, e.options.columns);
}
function Nc(e) {
  return e.getAllColumns().flatMap((t) => t.getFlatColumns());
}
function kc(e) {
  const t = _e(), n = e.getAllFlatColumns();
  for (let s = 0; s < n.length; s++) {
    const o = n[s];
    t[o.id] = o;
  }
  return t;
}
function Wc(e) {
  const t = e.getAllColumns().flatMap((n) => n.getLeafColumns());
  return $e(e, "getOrderColumns", Mr)(t);
}
function Uc(e) {
  const t = _e(), n = e.getAllLeafColumns();
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
    vt("coreColumnsFeature", e, {
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
function Pr(e, t) {
  for (let n = 0; n < e.subHeaders.length; n++) Pr(e.subHeaders[n], t);
  t.push(e);
}
function qc(e) {
  const t = [];
  return Pr(e, t), t;
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
  const { start: t, end: n } = ((a = e.atoms.columnPinning) == null ? void 0 : a.get()) ?? Ic(), s = e.getAllColumns(), o = $e(e, "getVisibleLeafColumns", Oc);
  if (!t.length && !n.length) return lo(s, o, e);
  const r = e.getAllLeafColumnsById(), i = [];
  for (let f = 0; f < t.length; f++) {
    const p = r[t[f]];
    p && $e(p, "getIsVisible", at) && i.push(p);
  }
  const l = [];
  for (let f = 0; f < n.length; f++) {
    const p = r[n[f]];
    p && $e(p, "getIsVisible", at) && l.push(p);
  }
  const c = o.filter((f) => !t.includes(f.id) && !n.includes(f.id));
  return lo(s, [
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
    vt("coreHeadersFeature", e, {
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
  c._displayIndexCache = -1, c._uniqueValuesCache = _e(), c._valuesCache = _e(), c.depth = o, c.id = t, c.index = s, c.original = n, c.parentId = i, c.subRows = [];
  const a = e._rowInstanceInitFns;
  for (let f = 0; f < a.length; f++) a[f](c);
  return c;
};
function nu() {
  return [];
}
function su(e, t) {
  In(e, "cellSelection", ft(e.initialState.cellSelection) ?? nu());
}
function ou(e) {
  e.atoms.cellSelection && (e.options.autoResetAll ?? e.options.autoResetCellSelection ?? !0) && e._reactivity.schedule(() => su(e));
}
function ru() {
  return _e();
}
function Ir(e) {
  e.atoms.expanded && (e.options.autoResetAll ?? e.options.autoResetExpanded ?? !e.options.manualExpanding) && e._reactivity.schedule(() => Ar(e));
}
function gn(e, t) {
  var n, s;
  (s = (n = e.options).onExpandedChange) == null || s.call(n, t);
}
function Or(e, t) {
  var s;
  const n = ((s = e.atoms.expanded) == null ? void 0 : s.get()) ?? {};
  if (t ?? !Fr(e)) {
    if (n === !0 || !Tr(e)) return;
    gn(e, !0);
  } else {
    if (n !== !0 && !Object.keys(n).length) return;
    gn(e, _e());
  }
}
function Ar(e, t) {
  const n = e.initialState.expanded;
  In(e, "expanded", t ? _e() : n === !0 ? !0 : Object.assign(_e(), ft(n ?? {})));
}
function Tr(e) {
  return e.getPrePaginatedRowModel().flatRows.some((t) => dt(t));
}
function iu(e) {
  return (t) => {
    Or(e);
  };
}
function lu(e) {
  var n;
  const t = ((n = e.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return t === !0 || Object.values(t).some(Boolean);
}
function Fr(e) {
  var s;
  const t = ((s = e.atoms.expanded) == null ? void 0 : s.get()) ?? {};
  if (t === !0) return !0;
  if (!Object.keys(t).length) return !1;
  const n = e.getRowModel().flatRows.filter((o) => dt(o));
  return !(!n.length || n.some((o) => !An(o)));
}
function cu(e) {
  var s;
  let t = 0;
  const n = (s = e.atoms.expanded) == null ? void 0 : s.get();
  return (n === !0 ? Object.values(e.getRowModel().rowsById).filter((o) => dt(o)).map((o) => o.id) : Object.keys(n ?? {})).forEach((o) => {
    const r = o.split(".");
    t = Math.max(t, r.length);
  }), t;
}
function Dr(e, t) {
  var r;
  const n = ((r = e.table.atoms.expanded) == null ? void 0 : r.get()) ?? {}, s = n === !0 || os(n, e.id), o = t ?? !s;
  o !== s && (o && !dt(e) || gn(e.table, (i) => {
    const l = i === !0 ? !0 : os(i, e.id);
    let c = _e();
    if (i === !0 ? Object.values(e.table.getRowModel().rowsById).forEach((a) => {
      dt(a) && (c[a.id] = !0);
    }) : c = Object.assign(_e(), i), !l && o)
      return c[e.id] = !0, c;
    if (l && !o) {
      const a = _e(), f = Object.keys(c);
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
  return !!(((o = (s = e.table.options).getIsRowExpanded) == null ? void 0 : o.call(s, e)) ?? (t === !0 || os(t, e.id)));
}
function os(e, t) {
  return !!(e && e !== !0 && qt(e, t) && e[t]);
}
function dt(e) {
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
  const t = dt(e);
  return () => {
    t && Dr(e);
  };
}
const rs = 0;
function au(e) {
  var t, n;
  if (e.options.autoResetAll ?? e.options.autoResetPageIndex ?? !e.options.manualPagination) {
    if ((((n = (t = e.atoms.pagination) == null ? void 0 : t.get()) == null ? void 0 : n.pageIndex) ?? rs) === rs) return;
    hu(e);
  }
}
function du(e, t) {
  In(e, "pagination", t);
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
  pu(e, rs);
}
function gu(e, t) {
  In(e, "sorting", t);
}
function mu(e, t) {
  gu(e, ft(e.initialState.sorting ?? []));
}
function _u(e) {
  e.atoms.sorting && (e.options.autoResetAll ?? e.options.autoResetSorting ?? !1) && mu(e);
}
function Hr() {
  return (e) => On({
    feature: "coreRowModelsFeature",
    table: e,
    fnName: "table.getCoreRowModel",
    memoDeps: () => [e.options.data],
    fn: () => yu(e, e.options.data),
    onAfterUpdate: Rc(() => {
      Ir(e), au(e), _u(e), ou(e);
    })
  });
}
function jr(e, t, n, s = 0, o) {
  var i;
  const r = [];
  for (let l = 0; l < n.length; l++) {
    const c = n[l], a = tu(e, e.getRowId(c, l, o), c, l, s, void 0, o == null ? void 0 : o.id);
    t.flatRows.push(a), t.rowsById[a.id] = a, r.push(a), e.options.getSubRows && (a.originalSubRows = e.options.getSubRows(c, l), (i = a.originalSubRows) != null && i.length && (a.subRows = jr(e, t, a.originalSubRows, s + 1, a)));
  }
  return r;
}
function yu(e, t) {
  const n = {
    rows: [],
    flatRows: [],
    rowsById: _e()
  };
  return n.rows = jr(e, n, t), n;
}
function wu(e) {
  var t, n;
  return e._rowModels.coreRowModel || (e._rowModels.coreRowModel = ((n = (t = e.options.features).coreRowModel) == null ? void 0 : n.call(t, e)) ?? Hr()(e)), e._rowModels.coreRowModel();
}
function xu(e) {
  return e.getCoreRowModel();
}
function bu(e) {
  var t, n;
  return e._rowModels.filteredRowModel || (e._rowModels.filteredRowModel = (n = (t = e.options.features).filteredRowModel) == null ? void 0 : n.call(t, e)), e.options.manualFiltering || !e._rowModels.filteredRowModel ? e.getPreFilteredRowModel() : e._rowModels.filteredRowModel();
}
function vu(e) {
  return e.getFilteredRowModel();
}
function Ru(e) {
  var t, n;
  return e._rowModels.groupedRowModel || (e._rowModels.groupedRowModel = (n = (t = e.options.features).groupedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualGrouping || !e._rowModels.groupedRowModel ? e.getPreGroupedRowModel() : e._rowModels.groupedRowModel();
}
function Cu(e) {
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
function Iu(e) {
  var t, n;
  return e._rowModels.paginatedRowModel || (e._rowModels.paginatedRowModel = (n = (t = e.options.features).paginatedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualPagination || !e._rowModels.paginatedRowModel ? e.getPrePaginatedRowModel() : e._rowModels.paginatedRowModel();
}
function Ou(e) {
  return e.getPaginatedRowModel();
}
const Au = { constructTableAPIs: (e) => {
  vt("coreRowModelsFeature", e, {
    table_getCoreRowModel: { fn: () => wu(e) },
    table_getPreFilteredRowModel: { fn: () => xu(e) },
    table_getFilteredRowModel: { fn: () => bu(e) },
    table_getPreGroupedRowModel: { fn: () => vu(e) },
    table_getGroupedRowModel: { fn: () => Ru(e) },
    table_getPreSortedRowModel: { fn: () => Cu(e) },
    table_getSortedRowModel: { fn: () => Su(e) },
    table_getPreExpandedRowModel: { fn: () => Mu(e) },
    table_getExpandedRowModel: { fn: () => Eu(e) },
    table_getPrePaginatedRowModel: { fn: () => Pu(e) },
    table_getPaginatedRowModel: { fn: () => Iu(e) },
    table_getRowModel: { fn: () => Ou(e) }
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
  const t = _e(), n = e.getAllCells();
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
    vt("coreRowsFeature", e, {
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
function Vr(e, t, n = (s, o) => s === o) {
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
    Vr(e, t, n), (o = (s = e._reactivity).commit) == null || o.call(s);
  });
}
function Ju(e) {
  var s, o;
  const t = ft(e.initialState);
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
  vt("coreTablesFeature", e, {
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
  const n = co(e);
  if (n.length !== co(t).length) return !1;
  for (let s = 0; s < n.length; s++) if (!Object.prototype.hasOwnProperty.call(t, n[s]) || !Object.is(e[n[s]], t[n[s]])) return !1;
  return !0;
}
function co(e) {
  return Object.keys(e).concat(Object.getOwnPropertySymbols(e));
}
function nf(e, t = {}) {
  return Object.values(e).forEach((n) => {
    var s;
    t = ((s = n.getInitialState) == null ? void 0 : s.call(n, t)) ?? t;
  }), ft(t);
}
function sf(e) {
  var le, re;
  const t = e.features.coreReactivityFeature, { aggregationFns: n, columnMeta: s, coreRowModel: o, expandedRowModel: r, facetedMinMaxValues: i, facetedRowModel: l, facetedUniqueValues: c, filterFns: a, filterMeta: f, filteredRowModel: p, groupedRowModel: w, paginatedRowModel: S, sortFns: j, sortedRowModel: O, tableMeta: ee, ...N } = e.features, M = {
    _cellInstanceInitFns: [],
    _columnInstanceInitFns: [],
    _features: {
      ...Qu,
      ...N
    },
    _headerGroupInstanceInitFns: [],
    _headerInstanceInitFns: [],
    _reactivity: t,
    _rowInstanceInitFns: [],
    _rowModelFns: {
      aggregationFns: n,
      filterFns: a,
      sortFns: j
    },
    _rowModels: {},
    atoms: {},
    baseAtoms: {}
  }, L = Object.values(M._features), E = {
    ...L.reduce((K, T) => {
      var te;
      return Object.assign(K, (te = T.getDefaultTableOptions) == null ? void 0 : te.call(T, M));
    }, {}),
    ...e
  };
  if (t.wrapExternalAtoms && E.atoms) for (const [K, T] of Object.entries(E.atoms)) {
    const te = T, ae = t.createWritableAtom(te.get(), { debugName: `externalAtom/${K}` });
    E.atoms[K] = ae;
    let v = !1;
    const P = te.subscribe((U) => {
      v || ae.set(U);
    }), H = ae.subscribe((U) => {
      v = !0, te.set(U), v = !1;
    });
    t.addSubscription(P), t.addSubscription(H);
  }
  t.createOptionsStore ? (M.optionsStore = t.createWritableAtom(E, { debugName: "table/optionsStore" }), Object.defineProperty(M, "options", {
    configurable: !0,
    enumerable: !0,
    get() {
      return M.optionsStore.get();
    },
    set(K) {
      M.optionsStore.set(() => K);
    }
  })) : M.options = E, M.initialState = nf(M._features, M.options.initialState);
  const Y = Object.keys(M.initialState);
  for (let K = 0; K < Y.length; K++) {
    const T = Y[K];
    M.baseAtoms[T] = t.createWritableAtom(M.initialState[T], { debugName: `table/baseAtoms/${T}` }), M.atoms[T] = t.createReadonlyAtom(() => {
      var H;
      const te = M.options, ae = (H = te.atoms) == null ? void 0 : H[T], v = ae ? ae.get() : M.baseAtoms[T].get();
      if (ae) return v;
      const P = te.state;
      if (P && qt(P, T)) {
        const U = P[T];
        return U === void 0 ? M.initialState[T] : U;
      }
      return v;
    }, { debugName: `table/atoms/${T}` });
  }
  Vr(M), M.store = ef(t.createReadonlyAtom(() => {
    const K = {};
    for (let T = 0; T < Y.length; T++) {
      const te = Y[T];
      K[te] = M.atoms[te].get();
    }
    return K;
  }, {
    compare: tf,
    debugName: "table/store"
  }));
  for (let K = 0; K < L.length; K++) {
    const T = L[K];
    (le = T.initTableInstanceData) == null || le.call(T, M), T.initCellInstanceData && M._cellInstanceInitFns.push(T.initCellInstanceData.bind(T)), T.initColumnInstanceData && M._columnInstanceInitFns.push(T.initColumnInstanceData.bind(T)), T.initHeaderGroupInstanceData && M._headerGroupInstanceInitFns.push(T.initHeaderGroupInstanceData.bind(T)), T.initHeaderInstanceData && M._headerInstanceInitFns.push(T.initHeaderInstanceData.bind(T)), T.initRowInstanceData && M._rowInstanceInitFns.push(T.initRowInstanceData.bind(T)), (re = T.constructTableAPIs) == null || re.call(T, M);
  }
  return M;
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
      row_toggleExpanded: { fn: (n, s) => Dr(n, s) },
      row_getIsExpanded: { fn: (n) => An(n) },
      row_getCanExpand: { fn: (n) => dt(n) },
      row_getIsAllParentsExpanded: { fn: (n) => uu(n) },
      row_getToggleExpandedHandler: { fn: (n) => fu(n) }
    });
  },
  constructTableAPIs: (e) => {
    vt("rowExpandingFeature", e, {
      table_autoResetExpanded: { fn: () => Ir(e) },
      table_setExpanded: { fn: (t) => gn(e, t) },
      table_toggleAllRowsExpanded: { fn: (t) => Or(e, t) },
      table_resetExpanded: { fn: (t) => Ar(e, t) },
      table_getCanSomeRowsExpand: { fn: () => Tr(e) },
      table_getToggleAllRowsExpandedHandler: { fn: () => iu(e) },
      table_getIsSomeRowsExpanded: { fn: () => lu(e) },
      table_getIsAllRowsExpanded: { fn: () => Fr(e) },
      table_getExpandedDepth: { fn: () => cu(e) }
    });
  }
};
function rf() {
  return (e) => {
    const t = e;
    return On({
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
function uo(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = _t(e[n]);
  return ss(e, t);
}
function uf(e) {
  return Object.keys(e).map((t) => _t(e[t]));
}
function ff(e) {
  const t = (l, c) => {
    l.setOptions((a) => oo(a, uo(c)));
  }, n = _c(), s = ss(e, { features: {
    coreReactivityFeature: n,
    ..._t(e.features) ?? {}
  } }), o = ss(uo(s), { mergeOptions: (l, c) => oo(l, c) }), r = sf(o), i = r;
  return xo() && Qr(() => {
    var l;
    return (l = n.unmount) == null ? void 0 : l.call(n);
  }), Be(() => uf(s), () => {
    t(r, s);
  }, { immediate: !0 }), Be(() => {
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
  class: "pnl-tst-empty"
}, pf = ["aria-label", "aria-colcount", "aria-rowcount"], hf = {
  key: 0,
  class: "pnl-tst-head",
  role: "rowgroup"
}, gf = {
  class: "pnl-tst-hrow",
  role: "row",
  "aria-rowindex": 1
}, mf = ["aria-colindex"], _f = {
  class: "pnl-tst-body",
  role: "rowgroup"
}, yf = ["aria-level", "aria-posinset", "aria-setsize", "aria-rowindex", "aria-expanded", "tabindex", "onClick", "onFocus"], wf = ["aria-colindex"], xf = ["onClick"], bf = {
  key: 1,
  class: "pnl-tst-twisty pnl-tst-twisty--leaf",
  "aria-hidden": "true"
}, vf = { class: "pnl-tst-value" }, Rf = "title", Cf = {
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
      coreRowModel: Hr(),
      expandedRowModel: rf()
    }, s = xe(() => (t.state.columns || []).length > 0), o = xe(() => {
      const v = t.state.columns || [];
      return v.length === 0 ? [{ id: Rf, header: "", accessorFn: (P) => P.title }] : v.map((P) => {
        const H = P.field ?? P.id;
        return {
          id: P.id,
          header: P.header ?? P.id,
          accessorFn: (U) => U[H],
          meta: { width: P.width }
        };
      });
    }), r = /* @__PURE__ */ Ts(i(t.state.expandedKeys));
    function i(v) {
      const P = {};
      for (const H of v || []) P[H] = !0;
      return P;
    }
    function l(v) {
      return v === !0 ? [] : Object.keys(v).filter((P) => v[P]).sort();
    }
    function c(v, P) {
      return v.length !== P.length ? !1 : v.every((H, U) => H === P[U]);
    }
    const a = ff({
      features: n,
      data: xe(() => t.state.source || []),
      columns: o,
      getRowId: (v) => v.key,
      getSubRows: (v) => v.children,
      state: xe(() => ({ expanded: r.value })),
      onExpandedChange: (v) => {
        r.value = typeof v == "function" ? v(r.value) : v, t.setExpandedKeys(l(r.value));
      }
    });
    Be(
      () => t.state.expandedKeys,
      (v) => {
        c(l(r.value), [...v || []].sort()) || (r.value = i(v));
      }
    ), Be(
      () => [t.state.options.expand_all, t.state.source],
      ([v]) => {
        v && a.toggleAllRowsExpanded(!0);
      },
      { immediate: !0 }
    );
    const f = xe(() => a.getRowModel().rows), p = xe(() => {
      var v;
      return ((v = a.getHeaderGroups()[0]) == null ? void 0 : v.headers) ?? [];
    }), w = xe(() => t.state.options.indent_px ?? 16), S = xe(() => t.state.options.aria_label ?? "Tree table"), j = xe(() => s.value ? 2 : 1), O = xe(() => f.value.length + (s.value ? 1 : 0));
    function ee(v) {
      const P = v.getParentRow();
      return P ? P.subRows.length : a.getCoreRowModel().rows.length;
    }
    function N(v) {
      var H;
      const P = (H = v.meta) == null ? void 0 : H.width;
      return P ? { flex: `0 0 ${P}px` } : { flex: "1 1 0" };
    }
    function M(v, P) {
      return { ...N(P), paddingInlineStart: `${v.depth * w.value}px` };
    }
    const L = /* @__PURE__ */ Ts(null), E = /* @__PURE__ */ new Map();
    function Y(v, P) {
      P ? E.set(v, P) : E.delete(v);
    }
    const le = xe(() => {
      const v = f.value;
      return v.length === 0 ? null : v.some((P) => P.id === L.value) ? L.value : v[0].id;
    });
    function re(v) {
      v != null && (L.value = v, Lo(() => {
        var P;
        return (P = E.get(v)) == null ? void 0 : P.focus();
      }));
    }
    function K(v) {
      const P = f.value;
      P.length !== 0 && re(P[Math.max(0, Math.min(v, P.length - 1))].id);
    }
    function T(v) {
      const P = f.value;
      if (P.length === 0) return;
      const H = Math.max(
        0,
        P.findIndex((X) => X.id === le.value)
      ), U = P[H];
      switch (v.key) {
        case "ArrowDown":
          v.preventDefault(), K(H + 1);
          break;
        case "ArrowUp":
          v.preventDefault(), K(H - 1);
          break;
        case "ArrowRight":
          if (v.preventDefault(), !U.getCanExpand()) break;
          U.getIsExpanded() ? K(H + 1) : (U.toggleExpanded(!0), re(U.id));
          break;
        case "ArrowLeft":
          v.preventDefault(), U.getCanExpand() && U.getIsExpanded() ? (U.toggleExpanded(!1), re(U.id)) : U.parentId && re(U.parentId);
          break;
        case "Home":
          v.preventDefault(), K(0);
          break;
        case "End":
          v.preventDefault(), K(P.length - 1);
          break;
        case "Enter":
          v.preventDefault(), t.emitEvent("activate", { key: U.id });
          break;
      }
    }
    function te(v) {
      L.value = v.id, t.emitEvent("activate", { key: v.id });
    }
    function ae(v) {
      L.value = v.id, v.toggleExpanded();
    }
    return (v, P) => (ge(), we("div", af, [
      f.value.length === 0 ? (ge(), we("div", df, "No data")) : (ge(), we("div", {
        key: 1,
        class: "pnl-tst-grid",
        role: "treegrid",
        "aria-label": S.value,
        "aria-colcount": p.value.length,
        "aria-rowcount": O.value,
        onKeydown: T
      }, [
        s.value ? (ge(), we("div", hf, [
          it("div", gf, [
            (ge(!0), we(be, null, Kn(p.value, (H, U) => (ge(), we("div", {
              key: H.id,
              class: "pnl-tst-hcell",
              role: "columnheader",
              "aria-colindex": U + 1,
              style: jt(N(H.column.columnDef))
            }, Gn(H.column.columnDef.header), 13, mf))), 128))
          ])
        ])) : Bs("", !0),
        it("div", _f, [
          (ge(!0), we(be, null, Kn(f.value, (H, U) => (ge(), we("div", {
            key: H.id,
            ref_for: !0,
            ref: (X) => Y(H.id, X),
            class: "pnl-tst-row",
            role: "row",
            "aria-level": H.depth + 1,
            "aria-posinset": H.index + 1,
            "aria-setsize": ee(H),
            "aria-rowindex": U + j.value,
            "aria-expanded": H.getCanExpand() ? H.getIsExpanded() : void 0,
            tabindex: H.id === le.value ? 0 : -1,
            onClick: (X) => te(H),
            onFocus: (X) => L.value = H.id
          }, [
            (ge(!0), we(be, null, Kn(H.getAllCells(), (X, B) => (ge(), we("div", {
              key: X.id,
              class: Vt(["pnl-tst-cell", { "pnl-tst-cell--tree": B === 0 }]),
              role: "gridcell",
              "aria-colindex": B + 1,
              style: jt(
                B === 0 ? M(H, X.column.columnDef) : N(X.column.columnDef)
              )
            }, [
              B === 0 ? (ge(), we(be, { key: 0 }, [
                H.getCanExpand() ? (ge(), we("span", {
                  key: 0,
                  class: Vt(["pnl-tst-twisty", { "pnl-tst-twisty--open": H.getIsExpanded() }]),
                  "aria-hidden": "true",
                  onClick: lc((z) => ae(H), ["stop"])
                }, [...P[0] || (P[0] = [
                  it("svg", {
                    viewBox: "0 0 16 16",
                    width: "12",
                    height: "12",
                    focusable: "false"
                  }, [
                    it("path", {
                      d: "M6 3.5 10.5 8 6 12.5",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "1.6"
                    })
                  ], -1)
                ])], 10, xf)) : (ge(), we("span", bf))
              ], 64)) : Bs("", !0),
              it("span", vf, Gn(X.getValue()), 1)
            ], 14, wf))), 128))
          ], 40, yf))), 128))
        ])
      ], 40, pf))
    ]));
  }
};
function Mf({ model: e, el: t }) {
  t.style.display = "block", t.style.width = "100%";
  const n = document.createElement("div");
  n.className = "pnl-tst-root", t.append(n);
  const s = /* @__PURE__ */ vn({
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
  }, r = (c, a) => c.length === a.length && c.every((f, p) => f === a[p]), l = fc(Cf, { state: s, emitEvent: o, setExpandedKeys: (c) => {
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
  Mf as render
};

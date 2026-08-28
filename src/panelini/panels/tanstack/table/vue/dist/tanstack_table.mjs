/**
* @vue/shared v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function ws(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const ee = {}, St = [], Be = () => {
}, Co = () => !1, xn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), vn = (e) => e.startsWith("onUpdate:"), ge = Object.assign, ys = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, ci = Object.prototype.hasOwnProperty, W = (e, t) => ci.call(e, t), j = Array.isArray, rt = (e) => Zt(e) === "[object Map]", pn = (e) => Zt(e) === "[object Set]", Ns = (e) => Zt(e) === "[object Date]", k = (e) => typeof e == "function", ne = (e) => typeof e == "string", Ue = (e) => typeof e == "symbol", J = (e) => e !== null && typeof e == "object", Mo = (e) => (J(e) || k(e)) && k(e.then) && k(e.catch), Io = Object.prototype.toString, Zt = (e) => Io.call(e), ui = (e) => Zt(e).slice(8, -1), Eo = (e) => Zt(e) === "[object Object]", bs = (e) => ne(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Vt = /* @__PURE__ */ ws(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Cn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, fi = /-\w/g, Pe = Cn(
  (e) => e.replace(fi, (t) => t.slice(1).toUpperCase())
), ai = /\B([A-Z])/g, _t = Cn(
  (e) => e.replace(ai, "-$1").toLowerCase()
), Po = Cn((e) => e.charAt(0).toUpperCase() + e.slice(1)), Bn = Cn(
  (e) => e ? `on${Po(e)}` : ""
), Le = (e, t) => !Object.is(e, t), Wn = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Oo = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
}, di = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Bs;
const Mn = () => Bs || (Bs = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Wt(e) {
  if (j(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], o = ne(s) ? mi(s) : Wt(s);
      if (o)
        for (const r in o)
          t[r] = o[r];
    }
    return t;
  } else if (ne(e) || J(e))
    return e;
}
const pi = /;(?![^(]*\))/g, gi = /:([^]+)/, hi = /\/\*[^]*?\*\//g;
function mi(e) {
  const t = {};
  return e.replace(hi, "").split(pi).forEach((n) => {
    if (n) {
      const s = n.split(gi);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function Ut(e) {
  let t = "";
  if (ne(e))
    t = e;
  else if (j(e))
    for (let n = 0; n < e.length; n++) {
      const s = Ut(e[n]);
      s && (t += s + " ");
    }
  else if (J(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const _i = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", wi = /* @__PURE__ */ ws(_i);
function Ao(e) {
  return !!e || e === "";
}
function yi(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let s = 0; n && s < e.length; s++)
    n = In(e[s], t[s]);
  return n;
}
function Ws(e, t) {
  if (e.size !== t.size) return !1;
  const n = Array.from(t), s = new Uint8Array(n.length);
  for (const o of e) {
    let r = -1;
    for (let i = 0; i < n.length; i++)
      if (!s[i] && In(o, n[i])) {
        r = i;
        break;
      }
    if (r < 0) return !1;
    s[r] = 1;
  }
  return !0;
}
function In(e, t) {
  if (e === t) return !0;
  let n = Ns(e), s = Ns(t);
  if (n || s)
    return n && s ? e.getTime() === t.getTime() : !1;
  if (n = Ue(e), s = Ue(t), n || s)
    return e === t;
  if (n = j(e), s = j(t), n || s)
    return n && s ? yi(e, t) : !1;
  if (n = J(e), s = J(t), n || s) {
    if (!n || !s)
      return !1;
    if (n = rt(e), s = rt(t), n || s || (n = pn(e), s = pn(t), n || s))
      return n && s ? Ws(e, t) : !1;
    const o = Object.keys(e).length, r = Object.keys(t).length;
    if (o !== r)
      return !1;
    for (const i in e) {
      const l = e.hasOwnProperty(i), c = t.hasOwnProperty(i);
      if (l && !c || !l && c || !In(e[i], t[i]))
        return !1;
    }
  }
  return String(e) === String(t);
}
const Fo = (e) => !!(e && e.__v_isRef === !0), os = (e) => ne(e) ? e : e == null ? "" : j(e) || J(e) && (e.toString === Io || !k(e.toString)) ? Fo(e) ? os(e.value) : JSON.stringify(e, To, 2) : String(e), To = (e, t) => Fo(t) ? To(e, t.value) : rt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, o], r) => (n[Un(s, r) + " =>"] = o, n),
    {}
  )
} : pn(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Un(n))
} : Ue(t) ? Un(t) : J(t) && !j(t) && !Eo(t) ? String(t) : t, Un = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Ue(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let ie;
class bi {
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
function Do() {
  return ie;
}
function Ri(e, t = !1) {
  ie && ie.cleanups.push(e);
}
let Q;
const Gn = /* @__PURE__ */ new WeakSet();
class Ho {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, ie && (ie.active ? ie.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Gn.has(this) && (Gn.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || ko(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Us(this), Vo(this);
    const t = Q, n = Oe;
    Q = this, Oe = !0;
    try {
      return this.fn();
    } finally {
      Ko(this), Q = t, Oe = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        xs(t);
      this.deps = this.depsTail = void 0, Us(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Gn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    rs(this) && this.run();
  }
  get dirty() {
    return rs(this);
  }
}
let jo = 0, Kt, $t;
function ko(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = $t, $t = e;
    return;
  }
  e.next = Kt, Kt = e;
}
function Rs() {
  jo++;
}
function Ss() {
  if (--jo > 0)
    return;
  if ($t) {
    let t = $t;
    for ($t = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; Kt; ) {
    let t = Kt;
    for (Kt = void 0; t; ) {
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
function Vo(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Ko(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const o = s.prevDep;
    s.version === -1 ? (s === n && (n = o), xs(s), Si(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = o;
  }
  e.deps = t, e.depsTail = n;
}
function rs(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && ($o(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function $o(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Gt) || (e.globalVersion = Gt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !rs(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = Q, s = Oe;
  Q = e, Oe = !0;
  try {
    Vo(e);
    const o = e.fn(e._value);
    (t.version === 0 || Le(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    Q = n, Oe = s, Ko(e), e.flags &= -3;
  }
}
function xs(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: o } = e;
  if (s && (s.nextSub = o, e.prevSub = void 0), o && (o.prevSub = s, e.nextSub = void 0), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let r = n.computed.deps; r; r = r.nextDep)
      xs(r, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Si(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let Oe = !0;
const Lo = [];
function Xe() {
  Lo.push(Oe), Oe = !1;
}
function Ze() {
  const e = Lo.pop();
  Oe = e === void 0 ? !0 : e;
}
function Us(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = Q;
    Q = void 0;
    try {
      t();
    } finally {
      Q = n;
    }
  }
}
let Gt = 0;
class xi {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class vs {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!Q || !Oe || Q === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== Q)
      n = this.activeLink = new xi(Q, this), Q.deps ? (n.prevDep = Q.depsTail, Q.depsTail.nextDep = n, Q.depsTail = n) : Q.deps = Q.depsTail = n, No(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = Q.depsTail, n.nextDep = void 0, Q.depsTail.nextDep = n, Q.depsTail = n, Q.deps === n && (Q.deps = s);
    }
    return n;
  }
  trigger(t) {
    this.version++, Gt++, this.notify(t);
  }
  notify(t) {
    Rs();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Ss();
    }
  }
}
function No(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        No(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const is = /* @__PURE__ */ new WeakMap(), at = /* @__PURE__ */ Symbol(
  ""
), ls = /* @__PURE__ */ Symbol(
  ""
), qt = /* @__PURE__ */ Symbol(
  ""
);
function de(e, t, n) {
  if (Oe && Q) {
    let s = is.get(e);
    s || is.set(e, s = /* @__PURE__ */ new Map());
    let o = s.get(n);
    o || (s.set(n, o = new vs()), o.map = s, o.key = n), o.track();
  }
}
function Je(e, t, n, s, o, r) {
  const i = is.get(e);
  if (!i) {
    Gt++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if (Rs(), t === "clear")
    i.forEach(l);
  else {
    const c = j(e), a = c && bs(n);
    if (c && n === "length") {
      const f = Number(s);
      i.forEach((p, h) => {
        (h === "length" || h === qt || !Ue(h) && h >= f) && l(p);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && l(i.get(n)), a && l(i.get(qt)), t) {
        case "add":
          c ? a && l(i.get("length")) : (l(i.get(at)), rt(e) && l(i.get(ls)));
          break;
        case "delete":
          c || (l(i.get(at)), rt(e) && l(i.get(ls)));
          break;
        case "set":
          rt(e) && l(i.get(at));
          break;
      }
  }
  Ss();
}
function bt(e) {
  const t = /* @__PURE__ */ B(e);
  return t === e ? t : (de(t, "iterate", qt), /* @__PURE__ */ Ie(e) ? t : t.map(Ae));
}
function En(e) {
  return de(e = /* @__PURE__ */ B(e), "iterate", qt), e;
}
function Ke(e, t) {
  return /* @__PURE__ */ Qe(e) ? Mt(/* @__PURE__ */ dt(e) ? Ae(t) : t) : Ae(t);
}
const vi = {
  __proto__: null,
  [Symbol.iterator]() {
    return qn(this, Symbol.iterator, (e) => Ke(this, e));
  },
  concat(...e) {
    return bt(this).concat(
      ...e.map((t) => j(t) ? bt(t) : t)
    );
  },
  entries() {
    return qn(this, "entries", (e) => (e[1] = Ke(this, e[1]), e));
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
      (n) => n.map((s) => Ke(this, s)),
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
    return zn(this, "includes", e);
  },
  indexOf(...e) {
    return zn(this, "indexOf", e);
  },
  join(e) {
    return bt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return zn(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Ge(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Dt(this, "pop");
  },
  push(...e) {
    return Dt(this, "push", e);
  },
  reduce(e, ...t) {
    return Gs(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Gs(this, "reduceRight", e, t);
  },
  shift() {
    return Dt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Ge(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Dt(this, "splice", e);
  },
  toReversed() {
    return bt(this).toReversed();
  },
  toSorted(e) {
    return bt(this).toSorted(e);
  },
  toSpliced(...e) {
    return bt(this).toSpliced(...e);
  },
  unshift(...e) {
    return Dt(this, "unshift", e);
  },
  values() {
    return qn(this, "values", (e) => Ke(this, e));
  }
};
function qn(e, t, n) {
  const s = En(e), o = s[t]();
  return s !== e && !/* @__PURE__ */ Ie(e) && (o._next = o.next, o.next = () => {
    const r = o._next();
    return r.done || (r.value = n(r.value)), r;
  }), o;
}
const Ci = Array.prototype;
function Ge(e, t, n, s, o, r) {
  const i = En(e), l = i !== e && !/* @__PURE__ */ Ie(e), c = i[t];
  if (c !== Ci[t]) {
    const p = c.apply(e, r);
    return l ? Ae(p) : p;
  }
  let a = n;
  i !== e && (l ? a = function(p, h) {
    return n.call(this, Ke(e, p), h, e);
  } : n.length > 2 && (a = function(p, h) {
    return n.call(this, p, h, e);
  }));
  const f = c.call(i, a, s);
  return l && o ? o(f) : f;
}
function Gs(e, t, n, s) {
  const o = En(e), r = o !== e && !/* @__PURE__ */ Ie(e);
  let i = n, l = !1;
  o !== e && (r ? (l = s.length === 0, i = function(a, f, p) {
    return l && (l = !1, a = Ke(e, a)), n.call(this, a, Ke(e, f), p, e);
  }) : n.length > 3 && (i = function(a, f, p) {
    return n.call(this, a, f, p, e);
  }));
  const c = o[t](i, ...s);
  return l ? Ke(e, c) : c;
}
function zn(e, t, n) {
  const s = /* @__PURE__ */ B(e);
  de(s, "iterate", qt);
  const o = s[t](...n);
  return (o === -1 || o === !1) && /* @__PURE__ */ Is(n[0]) ? (n[0] = /* @__PURE__ */ B(n[0]), s[t](...n)) : o;
}
function Dt(e, t, n = []) {
  Xe(), Rs();
  const s = (/* @__PURE__ */ B(e))[t].apply(e, n);
  return Ss(), Ze(), s;
}
const Mi = /* @__PURE__ */ ws("__proto__,__v_isRef,__isVue"), Bo = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Ue)
);
function Ii(e) {
  Ue(e) || (e = String(e));
  const t = /* @__PURE__ */ B(this);
  return de(t, "has", e), t.hasOwnProperty(e);
}
class Wo {
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
      return s === (o ? r ? ki : zo : r ? qo : Go).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const i = j(t);
    if (!o) {
      let c;
      if (i && (c = vi[n]))
        return c;
      if (n === "hasOwnProperty")
        return Ii;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ pe(t) ? t : s
    );
    if ((Ue(n) ? Bo.has(n) : Mi(n)) || (o || de(t, "get", n), r))
      return l;
    if (/* @__PURE__ */ pe(l)) {
      const c = i && bs(n) ? l : l.value;
      return o && J(c) ? /* @__PURE__ */ us(c) : c;
    }
    return J(l) ? o ? /* @__PURE__ */ us(l) : /* @__PURE__ */ Pn(l) : l;
  }
}
class Uo extends Wo {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, o) {
    let r = t[n];
    const i = j(t) && bs(n);
    if (!this._isShallow) {
      const a = /* @__PURE__ */ Qe(r);
      if (!/* @__PURE__ */ Ie(s) && !/* @__PURE__ */ Qe(s) && (r = /* @__PURE__ */ B(r), s = /* @__PURE__ */ B(s)), !i && /* @__PURE__ */ pe(r) && !/* @__PURE__ */ pe(s))
        return a || (r.value = s), !0;
    }
    const l = i ? Number(n) < t.length : W(t, n), c = Reflect.set(
      t,
      n,
      s,
      /* @__PURE__ */ pe(t) ? t : o
    );
    return t === /* @__PURE__ */ B(o) && c && (l ? Le(s, r) && Je(t, "set", n, s) : Je(t, "add", n, s)), c;
  }
  deleteProperty(t, n) {
    const s = W(t, n);
    t[n];
    const o = Reflect.deleteProperty(t, n);
    return o && s && Je(t, "delete", n, void 0), o;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!Ue(n) || !Bo.has(n)) && de(t, "has", n), s;
  }
  ownKeys(t) {
    return de(
      t,
      "iterate",
      j(t) ? "length" : at
    ), Reflect.ownKeys(t);
  }
}
class Ei extends Wo {
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
const Pi = /* @__PURE__ */ new Uo(), Oi = /* @__PURE__ */ new Ei(), Ai = /* @__PURE__ */ new Uo(!0);
const cs = (e) => e, sn = (e) => Reflect.getPrototypeOf(e);
function Fi(e, t, n) {
  return function(...s) {
    const o = this.__v_raw, r = /* @__PURE__ */ B(o), i = rt(r), l = e === "entries" || e === Symbol.iterator && i, c = e === "keys" && i, a = o[e](...s), f = n ? cs : t ? Mt : Ae;
    return !t && de(
      r,
      "iterate",
      c ? ls : at
    ), ge(
      // inheriting all iterator properties
      Object.create(a),
      {
        // iterator protocol
        next() {
          const { value: p, done: h } = a.next();
          return h ? { value: p, done: h } : {
            value: l ? [f(p[0]), f(p[1])] : f(p),
            done: h
          };
        }
      }
    );
  };
}
function on(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Ti(e, t) {
  const n = {
    get(o) {
      const r = this.__v_raw, i = /* @__PURE__ */ B(r), l = /* @__PURE__ */ B(o);
      e || (Le(o, l) && de(i, "get", o), de(i, "get", l));
      const { has: c } = sn(i), a = t ? cs : e ? Mt : Ae;
      if (c.call(i, o))
        return a(r.get(o));
      if (c.call(i, l))
        return a(r.get(l));
      r !== i && r.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && de(/* @__PURE__ */ B(o), "iterate", at), o.size;
    },
    has(o) {
      const r = this.__v_raw, i = /* @__PURE__ */ B(r), l = /* @__PURE__ */ B(o);
      return e || (Le(o, l) && de(i, "has", o), de(i, "has", l)), o === l ? r.has(o) : r.has(o) || r.has(l);
    },
    forEach(o, r) {
      const i = this, l = i.__v_raw, c = /* @__PURE__ */ B(l), a = t ? cs : e ? Mt : Ae;
      return !e && de(c, "iterate", at), l.forEach((f, p) => o.call(r, a(f), a(p), i));
    }
  };
  return ge(
    n,
    e ? {
      add: on("add"),
      set: on("set"),
      delete: on("delete"),
      clear: on("clear")
    } : {
      add(o) {
        const r = /* @__PURE__ */ B(this), i = sn(r), l = /* @__PURE__ */ B(o), c = !t && !/* @__PURE__ */ Ie(o) && !/* @__PURE__ */ Qe(o) ? l : o;
        return i.has.call(r, c) || Le(o, c) && i.has.call(r, o) || Le(l, c) && i.has.call(r, l) || (r.add(c), Je(r, "add", c, c)), this;
      },
      set(o, r) {
        !t && !/* @__PURE__ */ Ie(r) && !/* @__PURE__ */ Qe(r) && (r = /* @__PURE__ */ B(r));
        const i = /* @__PURE__ */ B(this), { has: l, get: c } = sn(i);
        let a = l.call(i, o);
        a || (o = /* @__PURE__ */ B(o), a = l.call(i, o));
        const f = c.call(i, o);
        return i.set(o, r), a ? Le(r, f) && Je(i, "set", o, r) : Je(i, "add", o, r), this;
      },
      delete(o) {
        const r = /* @__PURE__ */ B(this), { has: i, get: l } = sn(r);
        let c = i.call(r, o);
        c || (o = /* @__PURE__ */ B(o), c = i.call(r, o)), l && l.call(r, o);
        const a = r.delete(o);
        return c && Je(r, "delete", o, void 0), a;
      },
      clear() {
        const o = /* @__PURE__ */ B(this), r = o.size !== 0, i = o.clear();
        return r && Je(
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
    n[o] = Fi(o, e, t);
  }), n;
}
function Cs(e, t) {
  const n = Ti(e, t);
  return (s, o, r) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? s : Reflect.get(
    W(n, o) && o in s ? n : s,
    o,
    r
  );
}
const Di = {
  get: /* @__PURE__ */ Cs(!1, !1)
}, Hi = {
  get: /* @__PURE__ */ Cs(!1, !0)
}, ji = {
  get: /* @__PURE__ */ Cs(!0, !1)
};
const Go = /* @__PURE__ */ new WeakMap(), qo = /* @__PURE__ */ new WeakMap(), zo = /* @__PURE__ */ new WeakMap(), ki = /* @__PURE__ */ new WeakMap();
function Vi(e) {
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
function Pn(e) {
  return /* @__PURE__ */ Qe(e) ? e : Ms(
    e,
    !1,
    Pi,
    Di,
    Go
  );
}
// @__NO_SIDE_EFFECTS__
function Ki(e) {
  return Ms(
    e,
    !1,
    Ai,
    Hi,
    qo
  );
}
// @__NO_SIDE_EFFECTS__
function us(e) {
  return Ms(
    e,
    !0,
    Oi,
    ji,
    zo
  );
}
function Ms(e, t, n, s, o) {
  if (!J(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const r = o.get(e);
  if (r)
    return r;
  const i = Vi(ui(e));
  if (i === 0)
    return e;
  const l = new Proxy(
    e,
    i === 2 ? s : n
  );
  return o.set(e, l), l;
}
// @__NO_SIDE_EFFECTS__
function dt(e) {
  return /* @__PURE__ */ Qe(e) ? /* @__PURE__ */ dt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Qe(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Ie(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Is(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function B(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ B(t) : e;
}
function $i(e) {
  return !W(e, "__v_skip") && Object.isExtensible(e) && Oo(e, "__v_skip", !0), e;
}
const Ae = (e) => J(e) ? /* @__PURE__ */ Pn(e) : e, Mt = (e) => J(e) ? /* @__PURE__ */ us(e) : e;
// @__NO_SIDE_EFFECTS__
function pe(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Jn(e) {
  return Jo(e, !1);
}
// @__NO_SIDE_EFFECTS__
function Li(e) {
  return Jo(e, !0);
}
function Jo(e, t) {
  return /* @__PURE__ */ pe(e) ? e : new Ni(e, t);
}
class Ni {
  constructor(t, n) {
    this.dep = new vs(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ B(t), this._value = n ? t : Ae(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || /* @__PURE__ */ Ie(t) || /* @__PURE__ */ Qe(t);
    t = s ? t : /* @__PURE__ */ B(t), Le(t, n) && (this._rawValue = t, this._value = s ? t : Ae(t), this.dep.trigger());
  }
}
function xt(e) {
  return /* @__PURE__ */ pe(e) ? e.value : e;
}
const Bi = {
  get: (e, t, n) => t === "__v_raw" ? e : xt(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const o = e[t];
    return /* @__PURE__ */ pe(o) && !/* @__PURE__ */ pe(n) ? (o.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function Yo(e) {
  return /* @__PURE__ */ dt(e) ? e : new Proxy(e, Bi);
}
class Wi {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new vs(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Gt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    Q !== this)
      return ko(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return $o(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function Ui(e, t, n = !1) {
  let s, o;
  return k(e) ? s = e : (s = e.get, o = e.set), new Wi(s, o, n);
}
const rn = {}, gn = /* @__PURE__ */ new WeakMap();
let ut;
function Gi(e, t = !1, n = ut) {
  if (n) {
    let s = gn.get(n);
    s || gn.set(n, s = []), s.push(e);
  }
}
function qi(e, t, n = ee) {
  const { immediate: s, deep: o, once: r, scheduler: i, augmentJob: l, call: c } = n, a = (I) => o ? I : /* @__PURE__ */ Ie(I) || o === !1 || o === 0 ? ot(I, 1) : ot(I);
  let f, p, h, v, T = !1, E = !1;
  if (/* @__PURE__ */ pe(e) ? (p = () => e.value, T = /* @__PURE__ */ Ie(e)) : /* @__PURE__ */ dt(e) ? (p = () => a(e), T = !0) : j(e) ? (E = !0, T = e.some((I) => /* @__PURE__ */ dt(I) || /* @__PURE__ */ Ie(I)), p = () => e.map((I) => {
    if (/* @__PURE__ */ pe(I))
      return I.value;
    if (/* @__PURE__ */ dt(I))
      return a(I);
    if (k(I))
      return c ? c(I, 2) : I();
  })) : k(e) ? t ? p = c ? () => c(e, 2) : e : p = () => {
    if (h) {
      Xe();
      try {
        h();
      } finally {
        Ze();
      }
    }
    const I = ut;
    ut = f;
    try {
      return c ? c(e, 3, [v]) : e(v);
    } finally {
      ut = I;
    }
  } : p = Be, t && o) {
    const I = p, G = o === !0 ? 1 / 0 : o;
    p = () => ot(I(), G);
  }
  const U = Do(), K = () => {
    f.stop(), U && U.active && ys(U.effects, f);
  };
  if (r && t) {
    const I = t;
    t = (...G) => {
      const he = I(...G);
      return K(), he;
    };
  }
  let M = E ? new Array(e.length).fill(rn) : rn;
  const V = (I) => {
    if (!(!(f.flags & 1) || !f.dirty && !I))
      if (t) {
        const G = f.run();
        if (I || o || T || (E ? G.some((he, se) => Le(he, M[se])) : Le(G, M))) {
          h && h();
          const he = ut;
          ut = f;
          try {
            const se = [
              G,
              // pass undefined as the old value when it's changed for the first time
              M === rn ? void 0 : E && M[0] === rn ? [] : M,
              v
            ];
            M = G, c ? c(t, 3, se) : (
              // @ts-expect-error
              t(...se)
            );
          } finally {
            ut = he;
          }
        }
      } else
        f.run();
  };
  return l && l(V), f = new Ho(p), f.scheduler = i ? () => i(V, !1) : V, v = (I) => Gi(I, !1, f), h = f.onStop = () => {
    const I = gn.get(f);
    if (I) {
      if (c)
        c(I, 4);
      else
        for (const G of I) G();
      gn.delete(f);
    }
  }, t ? s ? V(!0) : M = f.run() : i ? i(V.bind(null, !0), !0) : f.run(), K.pause = f.pause.bind(f), K.resume = f.resume.bind(f), K.stop = K, K;
}
function ot(e, t = 1 / 0, n) {
  if (t <= 0 || !J(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ pe(e))
    ot(e.value, t, n);
  else if (j(e))
    for (let s = 0; s < e.length; s++)
      ot(e[s], t, n);
  else if (pn(e) || rt(e))
    e.forEach((s) => {
      ot(s, t, n);
    });
  else if (Eo(e)) {
    for (const s in e)
      ot(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && ot(e[s], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Qt(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (o) {
    On(o, t, n);
  }
}
function Fe(e, t, n, s) {
  if (k(e)) {
    const o = Qt(e, t, n, s);
    return o && Mo(o) && o.catch((r) => {
      On(r, t, n);
    }), o;
  }
  if (j(e)) {
    const o = [];
    for (let r = 0; r < e.length; r++)
      o.push(Fe(e[r], t, n, s));
    return o;
  }
}
function On(e, t, n, s = !0) {
  const o = t ? t.vnode : null, { errorHandler: r, throwUnhandledErrorInProduction: i } = t && t.appContext.config || ee;
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
      Xe(), Qt(r, null, 10, [
        e,
        c,
        a
      ]), Ze();
      return;
    }
  }
  zi(e, n, o, s, i);
}
function zi(e, t, n, s = !0, o = !1) {
  if (o)
    throw e;
  console.error(e);
}
const we = [];
let Ve = -1;
const vt = [];
let st = null, Rt = 0;
const Xo = /* @__PURE__ */ Promise.resolve();
let hn = null;
function Zo(e) {
  const t = hn || Xo;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ji(e) {
  let t = Ve + 1, n = we.length;
  for (; t < n; ) {
    const s = t + n >>> 1, o = we[s], r = zt(o);
    r < e || r === e && o.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function Es(e) {
  if (!(e.flags & 1)) {
    const t = zt(e), n = we[we.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= zt(n) ? we.push(e) : we.splice(Ji(t), 0, e), e.flags |= 1, Qo();
  }
}
function Qo() {
  hn || (hn = Xo.then(tr));
}
function Yi(e) {
  if (!j(e))
    st && e.id === -1 ? st.splice(Rt + 1, 0, e) : e.flags & 1 || (vt.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      vt.push(e[t]);
  Qo();
}
function qs(e, t, n = Ve + 1) {
  for (; n < we.length; n++) {
    const s = we[n];
    if (s && s.flags & 2) {
      if (e && s.id !== e.uid)
        continue;
      we.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
    }
  }
}
function er(e) {
  if (vt.length) {
    const t = [...new Set(vt)].sort(
      (n, s) => zt(n) - zt(s)
    );
    if (vt.length = 0, st) {
      for (let n = 0; n < t.length; n++)
        st.push(t[n]);
      return;
    }
    for (st = t, Rt = 0; Rt < st.length; Rt++) {
      const n = st[Rt];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    st = null, Rt = 0;
  }
}
const zt = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function tr(e) {
  try {
    for (Ve = 0; Ve < we.length; Ve++) {
      const t = we[Ve];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Qt(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Ve < we.length; Ve++) {
      const t = we[Ve];
      t && (t.flags &= -2);
    }
    Ve = -1, we.length = 0, er(), hn = null, (we.length || vt.length) && tr();
  }
}
let Ne = null, nr = null;
function mn(e) {
  const t = Ne;
  return Ne = e, nr = e && e.type.__scopeId || null, t;
}
function Xi(e, t = Ne, n) {
  if (!t || e._n)
    return e;
  const s = (...o) => {
    s._d && oo(-1);
    const r = mn(t), i = pt.length;
    let l;
    try {
      l = e(...o);
    } finally {
      for (let c = pt.length; c > i; c--) Mr();
      mn(r), s._d && oo(1);
    }
    return l;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function lt(e, t, n, s) {
  const o = e.dirs, r = t && t.dirs;
  for (let i = 0; i < o.length; i++) {
    const l = o[i];
    r && (l.oldValue = r[i].value);
    let c = l.dir[s];
    c && (Xe(), Fe(c, n, 8, [
      e.el,
      l,
      e,
      t
    ]), Ze());
  }
}
function Zi(e, t) {
  if (ye) {
    let n = ye.provides;
    const s = ye.parent && ye.parent.provides;
    s === n && (n = ye.provides = Object.create(s)), n[e] = t;
  }
}
function un(e, t, n = !1) {
  const s = Xl();
  if (s || Ct) {
    let o = Ct ? Ct._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && k(t) ? t.call(s && s.proxy) : t;
  }
}
const Qi = /* @__PURE__ */ Symbol.for("v-scx"), el = () => un(Qi);
function We(e, t, n) {
  return sr(e, t, n);
}
function sr(e, t, n = ee) {
  const { immediate: s, deep: o, flush: r, once: i } = n, l = ge({}, n), c = t && s || !t && r !== "post";
  let a;
  if (Xt) {
    if (r === "sync") {
      const v = el();
      a = v.__watcherHandles || (v.__watcherHandles = []);
    } else if (!c) {
      const v = () => {
      };
      return v.stop = Be, v.resume = Be, v.pause = Be, v;
    }
  }
  const f = ye;
  l.call = (v, T, E) => Fe(v, f, T, E);
  let p = !1;
  r === "post" ? l.scheduler = (v) => {
    Re(v, f && f.suspense);
  } : r !== "sync" && (p = !0, l.scheduler = (v, T) => {
    T ? v() : Es(v);
  }), l.augmentJob = (v) => {
    t && (v.flags |= 4), p && (v.flags |= 2, f && (v.id = f.uid, v.i = f));
  };
  const h = qi(e, t, l);
  return Xt && (a ? a.push(h) : c && h()), h;
}
function tl(e, t, n) {
  const s = this.proxy, o = ne(e) ? e.includes(".") ? or(s, e) : () => s[e] : e.bind(s, s);
  let r;
  k(t) ? r = t : (r = t.handler, n = t);
  const i = en(this), l = sr(o, r.bind(s), n);
  return i(), l;
}
function or(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let o = 0; o < n.length && s; o++)
      s = s[n[o]];
    return s;
  };
}
const nl = /* @__PURE__ */ Symbol("_vte"), An = (e) => e.__isTeleport, Yn = /* @__PURE__ */ Symbol("_leaveCb");
function sl(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== et) {
        t = n;
        break;
      }
  }
  return t;
}
function rr(e) {
  if (!Os(e))
    return An(e.type) && e.children ? sl(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16)
      return n[0];
    if (t & 32 && k(n.default))
      return n.default();
  }
}
function Ps(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    Ps(
      An(n.type) && rr(n) || n,
      t
    );
  } else e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function ir(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function zs(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const _n = /* @__PURE__ */ new WeakMap();
function Lt(e, t, n, s, o = !1) {
  if (j(e)) {
    e.forEach(
      (E, U) => Lt(
        E,
        t && (j(t) ? t[U] : t),
        n,
        s,
        o
      )
    );
    return;
  }
  if (Nt(s) && !o) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && Lt(e, t, n, s.component.subTree);
    return;
  }
  const r = s.shapeFlag & 4 ? Ts(s.component) : s.el, i = o ? null : r, { i: l, r: c } = e, a = t && t.r, f = l.refs === ee ? l.refs = {} : l.refs, p = l.setupState, h = /* @__PURE__ */ B(p), v = p === ee ? Co : (E) => zs(f, E) ? !1 : W(h, E), T = (E, U) => !(U && zs(f, U));
  if (a != null && a !== c) {
    if (Js(t), ne(a))
      f[a] = null, v(a) && (p[a] = null);
    else if (/* @__PURE__ */ pe(a)) {
      const E = t;
      T(a, E.k) && (a.value = null), E.k && (f[E.k] = null);
    }
  }
  if (k(c))
    Qt(c, l, 12, [i, f]);
  else {
    const E = ne(c), U = /* @__PURE__ */ pe(c);
    if (E || U) {
      const K = () => {
        if (e.f) {
          const M = E ? v(c) ? p[c] : f[c] : T() || !e.k ? c.value : f[e.k];
          if (o)
            j(M) && ys(M, r);
          else if (j(M))
            M.includes(r) || M.push(r);
          else if (E)
            f[c] = [r], v(c) && (p[c] = f[c]);
          else {
            const V = [r];
            T(c, e.k) && (c.value = V), e.k && (f[e.k] = V);
          }
        } else E ? (f[c] = i, v(c) && (p[c] = i)) : U && (T(c, e.k) && (c.value = i), e.k && (f[e.k] = i));
      };
      if (i) {
        const M = () => {
          K(), _n.delete(e);
        };
        M.id = -1, _n.set(e, M), Re(M, n);
      } else
        Js(e), K();
    }
  }
}
function Js(e) {
  const t = _n.get(e);
  t && (t.flags |= 8, _n.delete(e));
}
Mn().requestIdleCallback;
Mn().cancelIdleCallback;
const Nt = (e) => !!e.type.__asyncLoader, Os = (e) => e.type.__isKeepAlive;
function ol(e, t) {
  lr(e, "a", t);
}
function rl(e, t) {
  lr(e, "da", t);
}
function lr(e, t, n = ye) {
  const s = e.__wdc || (e.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (Fn(t, s, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      Os(o.parent.vnode) && il(s, t, n, o), o = o.parent;
  }
}
function il(e, t, n, s) {
  const o = Fn(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  cr(() => {
    ys(s[t], o);
  }, n);
}
function Fn(e, t, n = ye, s = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...i) => {
      Xe();
      const l = en(n), c = Fe(t, n, e, i);
      return l(), Ze(), c;
    });
    return s ? o.unshift(r) : o.push(r), r;
  }
}
const nt = (e) => (t, n = ye) => {
  (!Xt || e === "sp") && Fn(e, (...s) => t(...s), n);
}, ll = nt("bm"), cl = nt("m"), ul = nt(
  "bu"
), fl = nt("u"), al = nt(
  "bum"
), cr = nt("um"), dl = nt(
  "sp"
), pl = nt("rtg"), gl = nt("rtc");
function hl(e, t = ye) {
  Fn("ec", e, t);
}
const ml = /* @__PURE__ */ Symbol.for("v-ndc");
function Xn(e, t, n, s) {
  let o;
  const r = n, i = j(e);
  if (i || ne(e)) {
    const l = i && /* @__PURE__ */ dt(e);
    let c = !1, a = !1;
    l && (c = !/* @__PURE__ */ Ie(e), a = /* @__PURE__ */ Qe(e), e = En(e)), o = new Array(e.length);
    for (let f = 0, p = e.length; f < p; f++)
      o[f] = t(
        c ? a ? Mt(Ae(e[f])) : Ae(e[f]) : e[f],
        f,
        void 0,
        r
      );
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let l = 0; l < e; l++)
      o[l] = t(l + 1, l, void 0, r);
  } else if (J(e))
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
const fs = (e) => e ? Or(e) ? Ts(e) : fs(e.parent) : null, Bt = (
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
    $parent: (e) => fs(e.parent),
    $root: (e) => fs(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => fr(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Es(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Zo.bind(e.proxy)),
    $watch: (e) => tl.bind(e)
  })
), Zn = (e, t) => e !== ee && !e.__isScriptSetup && W(e, t), _l = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: o, props: r, accessCache: i, type: l, appContext: c } = e;
    if (t[0] !== "$") {
      const h = i[t];
      if (h !== void 0)
        switch (h) {
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
        if (Zn(s, t))
          return i[t] = 1, s[t];
        if (o !== ee && W(o, t))
          return i[t] = 2, o[t];
        if (W(r, t))
          return i[t] = 3, r[t];
        if (n !== ee && W(n, t))
          return i[t] = 4, n[t];
        as && (i[t] = 0);
      }
    }
    const a = Bt[t];
    let f, p;
    if (a)
      return t === "$attrs" && de(e.attrs, "get", ""), a(e);
    if (
      // css module (injected by vue-loader)
      (f = l.__cssModules) && (f = f[t])
    )
      return f;
    if (n !== ee && W(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      p = c.config.globalProperties, W(p, t)
    )
      return p[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: o, ctx: r } = e;
    return Zn(o, t) ? (o[t] = n, !0) : s !== ee && W(s, t) ? (s[t] = n, !0) : W(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (r[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: o, props: r, type: i }
  }, l) {
    let c;
    return !!(n[l] || e !== ee && l[0] !== "$" && W(e, l) || Zn(t, l) || W(r, l) || W(s, l) || W(Bt, l) || W(o.config.globalProperties, l) || (c = i.__cssModules) && c[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : W(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function Ys(e) {
  return j(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let as = !0;
function wl(e) {
  const t = fr(e), n = e.proxy, s = e.ctx;
  as = !1, t.beforeCreate && Xs(t.beforeCreate, e, "bc");
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
    mounted: h,
    beforeUpdate: v,
    updated: T,
    activated: E,
    deactivated: U,
    beforeDestroy: K,
    beforeUnmount: M,
    destroyed: V,
    unmounted: I,
    render: G,
    renderTracked: he,
    renderTriggered: se,
    errorCaptured: N,
    serverPrefetch: A,
    // public API
    expose: te,
    inheritAttrs: re,
    // assets
    components: le,
    directives: Me,
    filters: Te
  } = t;
  if (a && yl(a, s, null), i)
    for (const Z in i) {
      const q = i[Z];
      k(q) && (s[Z] = q.bind(n));
    }
  if (o) {
    const Z = o.call(n, n);
    J(Z) && (e.data = /* @__PURE__ */ Pn(Z));
  }
  if (as = !0, r)
    for (const Z in r) {
      const q = r[Z], b = k(q) ? q.bind(n, n) : k(q.get) ? q.get.bind(n, n) : Be, F = !k(q) && k(q.set) ? q.set.bind(n) : Be, D = fe({
        get: b,
        set: F
      });
      Object.defineProperty(s, Z, {
        enumerable: !0,
        configurable: !0,
        get: () => D.value,
        set: (L) => D.value = L
      });
    }
  if (l)
    for (const Z in l)
      ur(l[Z], s, n, Z);
  if (c) {
    const Z = k(c) ? c.call(n) : c;
    Reflect.ownKeys(Z).forEach((q) => {
      Zi(q, Z[q]);
    });
  }
  f && Xs(f, e, "c");
  function ce(Z, q) {
    j(q) ? q.forEach((b) => Z(b.bind(n))) : q && Z(q.bind(n));
  }
  if (ce(ll, p), ce(cl, h), ce(ul, v), ce(fl, T), ce(ol, E), ce(rl, U), ce(hl, N), ce(gl, he), ce(pl, se), ce(al, M), ce(cr, I), ce(dl, A), j(te))
    if (te.length) {
      const Z = e.exposed || (e.exposed = {});
      te.forEach((q) => {
        Object.defineProperty(Z, q, {
          get: () => n[q],
          set: (b) => n[q] = b,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  G && e.render === Be && (e.render = G), re != null && (e.inheritAttrs = re), le && (e.components = le), Me && (e.directives = Me), A && ir(e);
}
function yl(e, t, n = Be) {
  j(e) && (e = ds(e));
  for (const s in e) {
    const o = e[s];
    let r;
    J(o) ? "default" in o ? r = un(
      o.from || s,
      o.default,
      !0
    ) : r = un(o.from || s) : r = un(o), /* @__PURE__ */ pe(r) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => r.value,
      set: (i) => r.value = i
    }) : t[s] = r;
  }
}
function Xs(e, t, n) {
  Fe(
    j(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function ur(e, t, n, s) {
  let o = s.includes(".") ? or(n, s) : () => n[s];
  if (ne(e)) {
    const r = t[e];
    k(r) && We(o, r);
  } else if (k(e))
    We(o, e.bind(n));
  else if (J(e))
    if (j(e))
      e.forEach((r) => ur(r, t, n, s));
    else {
      const r = k(e.handler) ? e.handler.bind(n) : t[e.handler];
      k(r) && We(o, r, e);
    }
}
function fr(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: o,
    optionsCache: r,
    config: { optionMergeStrategies: i }
  } = e.appContext, l = r.get(t);
  let c;
  return l ? c = l : !o.length && !n && !s ? c = t : (c = {}, o.length && o.forEach(
    (a) => wn(c, a, i, !0)
  ), wn(c, t, i)), J(t) && r.set(t, c), c;
}
function wn(e, t, n, s = !1) {
  const { mixins: o, extends: r } = t;
  r && wn(e, r, n, !0), o && o.forEach(
    (i) => wn(e, i, n, !0)
  );
  for (const i in t)
    if (!(s && i === "expose")) {
      const l = bl[i] || n && n[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const bl = {
  data: Zs,
  props: Qs,
  emits: Qs,
  // objects
  methods: jt,
  computed: jt,
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
  components: jt,
  directives: jt,
  // watch
  watch: Sl,
  // provide / inject
  provide: Zs,
  inject: Rl
};
function Zs(e, t) {
  return t ? e ? function() {
    return ge(
      k(e) ? e.call(this, this) : e,
      k(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Rl(e, t) {
  return jt(ds(e), ds(t));
}
function ds(e) {
  if (j(e)) {
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
function jt(e, t) {
  return e ? ge(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Qs(e, t) {
  return e ? j(e) && j(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : ge(
    /* @__PURE__ */ Object.create(null),
    Ys(e),
    Ys(t ?? {})
  ) : t;
}
function Sl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = ge(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = me(e[s], t[s]);
  return n;
}
function ar() {
  return {
    app: null,
    config: {
      isNativeTag: Co,
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
let xl = 0;
function vl(e, t) {
  return function(s, o = null) {
    k(s) || (s = ge({}, s)), o != null && !J(o) && (o = null);
    const r = ar(), i = /* @__PURE__ */ new WeakSet(), l = [];
    let c = !1;
    const a = r.app = {
      _uid: xl++,
      _component: s,
      _props: o,
      _container: null,
      _context: r,
      _instance: null,
      version: sc,
      get config() {
        return r.config;
      },
      set config(f) {
      },
      use(f, ...p) {
        return i.has(f) || (f && k(f.install) ? (i.add(f), f.install(a, ...p)) : k(f) && (i.add(f), f(a, ...p))), a;
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
      mount(f, p, h) {
        if (!c) {
          const v = a._ceVNode || Ye(s, o);
          return v.appContext = r, h === !0 ? h = "svg" : h === !1 && (h = void 0), e(v, f, h), c = !0, a._container = f, f.__vue_app__ = a, Ts(v.component);
        }
      },
      onUnmount(f) {
        l.push(f);
      },
      unmount() {
        c && (Fe(
          l,
          a._instance,
          16
        ), e(null, a._container), delete a._container.__vue_app__);
      },
      provide(f, p) {
        return r.provides[f] = p, a;
      },
      runWithContext(f) {
        const p = Ct;
        Ct = a;
        try {
          return f();
        } finally {
          Ct = p;
        }
      }
    };
    return a;
  };
}
let Ct = null;
const Cl = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Pe(t)}Modifiers`] || e[`${_t(t)}Modifiers`];
function Ml(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || ee;
  let o = n;
  const r = t.startsWith("update:"), i = r && Cl(s, t.slice(7));
  i && (i.trim && (o = n.map((f) => ne(f) ? f.trim() : f)), i.number && (o = o.map(di)));
  let l, c = s[l = Bn(t)] || // also try camelCase event handler (#2249)
  s[l = Bn(Pe(t))];
  !c && r && (c = s[l = Bn(_t(t))]), c && Fe(
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
    e.emitted[l] = !0, Fe(
      a,
      e,
      6,
      o
    );
  }
}
const Il = /* @__PURE__ */ new WeakMap();
function dr(e, t, n = !1) {
  const s = n ? Il : t.emitsCache, o = s.get(e);
  if (o !== void 0)
    return o;
  const r = e.emits;
  let i = {}, l = !1;
  if (!k(e)) {
    const c = (a) => {
      const f = dr(a, t, !0);
      f && (l = !0, ge(i, f));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !r && !l ? (J(e) && s.set(e, null), null) : (j(r) ? r.forEach((c) => i[c] = null) : ge(i, r), J(e) && s.set(e, i), i);
}
function Tn(e, t) {
  return !e || !xn(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), W(e, t[0].toLowerCase() + t.slice(1)) || W(e, _t(t)) || W(e, t));
}
function eo(e) {
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
    data: h,
    setupState: v,
    ctx: T,
    inheritAttrs: E
  } = e, U = mn(e);
  let K, M;
  try {
    if (n.shapeFlag & 4) {
      const I = o || s, G = I;
      K = $e(
        a.call(
          G,
          I,
          f,
          p,
          v,
          h,
          T
        )
      ), M = l;
    } else {
      const I = t;
      K = $e(
        I.length > 1 ? I(
          p,
          { attrs: l, slots: i, emit: c }
        ) : I(
          p,
          null
        )
      ), M = t.props ? l : El(l);
    }
  } catch (I) {
    pt.length = 0, On(I, e, 1), K = Ye(et);
  }
  let V = K;
  if (M && E !== !1) {
    const I = Object.keys(M), { shapeFlag: G } = V;
    I.length && G & 7 && (r && I.some(vn) && (M = Pl(
      M,
      r
    )), V = It(V, M, !1, !0));
  }
  if (n.dirs && (V = It(V, null, !1, !0), V.dirs = V.dirs ? V.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const I = An(V.type) && rr(V) || V;
    Ps(I, n.transition);
  }
  return K = V, mn(U), K;
}
const El = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || xn(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Pl = (e, t) => {
  const n = {};
  for (const s in e)
    (!vn(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function Ol(e, t, n) {
  const { props: s, children: o, component: r } = e, { props: i, children: l, patchFlag: c } = t, a = r.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return s ? to(s, i, a) : !!i;
    if (c & 8) {
      const f = t.dynamicProps;
      for (let p = 0; p < f.length; p++) {
        const h = f[p];
        if (pr(i, s, h) && !Tn(a, h))
          return !0;
      }
    }
  } else
    return (o || l) && (!l || !l.$stable) ? !0 : s === i ? !1 : s ? i ? to(s, i, a) : !0 : !!i;
  return !1;
}
function to(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < s.length; o++) {
    const r = s[o];
    if (pr(t, e, r) && !Tn(n, r))
      return !0;
  }
  return !1;
}
function pr(e, t, n) {
  const s = e[n], o = t[n];
  return n === "style" && J(s) && J(o) ? !In(s, o) : s !== o;
}
function Al({ vnode: e, parent: t, suspense: n }, s) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.suspense.vnode.el = o.el = s, e = o), o === e)
      (e = t.vnode).el = s, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = s);
}
const gr = {}, hr = () => Object.create(gr), mr = (e) => Object.getPrototypeOf(e) === gr;
function Fl(e, t, n, s = !1) {
  const o = {}, r = hr();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), _r(e, t, o, r);
  for (const i in e.propsOptions[0])
    i in o || (o[i] = void 0);
  n ? e.props = s ? o : /* @__PURE__ */ Ki(o) : e.type.props ? e.props = o : e.props = r, e.attrs = r;
}
function Tl(e, t, n, s) {
  const {
    props: o,
    attrs: r,
    vnode: { patchFlag: i }
  } = e, l = /* @__PURE__ */ B(o), [c] = e.propsOptions;
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
        let h = f[p];
        if (Tn(e.emitsOptions, h))
          continue;
        const v = t[h];
        if (c)
          if (W(r, h))
            v !== r[h] && (r[h] = v, a = !0);
          else {
            const T = Pe(h);
            o[T] = ps(
              c,
              l,
              T,
              v,
              e,
              !1
            );
          }
        else
          v !== r[h] && (r[h] = v, a = !0);
      }
    }
  } else {
    _r(e, t, o, r) && (a = !0);
    let f;
    for (const p in l)
      (!t || // for camelCase
      !W(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((f = _t(p)) === p || !W(t, f))) && (c ? n && // for camelCase
      (n[p] !== void 0 || // for kebab-case
      n[f] !== void 0) && (o[p] = ps(
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
  a && Je(e.attrs, "set", "");
}
function _r(e, t, n, s) {
  const [o, r] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let c in t) {
      if (Vt(c))
        continue;
      const a = t[c];
      let f;
      o && W(o, f = Pe(c)) ? !r || !r.includes(f) ? n[f] = a : (l || (l = {}))[f] = a : Tn(e.emitsOptions, c) || (!(c in s) || a !== s[c]) && (s[c] = a, i = !0);
    }
  if (r) {
    const c = /* @__PURE__ */ B(n), a = l || ee;
    for (let f = 0; f < r.length; f++) {
      const p = r[f];
      n[p] = ps(
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
function ps(e, t, n, s, o, r) {
  const i = e[n];
  if (i != null) {
    const l = W(i, "default");
    if (l && s === void 0) {
      const c = i.default;
      if (i.type !== Function && !i.skipFactory && k(c)) {
        const { propsDefaults: a } = o;
        if (n in a)
          s = a[n];
        else {
          const f = en(o);
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
    ] && (s === "" || s === _t(n)) && (s = !0));
  }
  return s;
}
const Dl = /* @__PURE__ */ new WeakMap();
function wr(e, t, n = !1) {
  const s = n ? Dl : t.propsCache, o = s.get(e);
  if (o)
    return o;
  const r = e.props, i = {}, l = [];
  let c = !1;
  if (!k(e)) {
    const f = (p) => {
      c = !0;
      const [h, v] = wr(p, t, !0);
      ge(i, h), v && l.push(...v);
    };
    !n && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  if (!r && !c)
    return J(e) && s.set(e, St), St;
  if (j(r))
    for (let f = 0; f < r.length; f++) {
      const p = Pe(r[f]);
      no(p) && (i[p] = ee);
    }
  else if (r)
    for (const f in r) {
      const p = Pe(f);
      if (no(p)) {
        const h = r[f], v = i[p] = j(h) || k(h) ? { type: h } : ge({}, h), T = v.type;
        let E = !1, U = !0;
        if (j(T))
          for (let K = 0; K < T.length; ++K) {
            const M = T[K], V = k(M) && M.name;
            if (V === "Boolean") {
              E = !0;
              break;
            } else V === "String" && (U = !1);
          }
        else
          E = k(T) && T.name === "Boolean";
        v[
          0
          /* shouldCast */
        ] = E, v[
          1
          /* shouldCastTrue */
        ] = U, (E || W(v, "default")) && l.push(p);
      }
    }
  const a = [i, l];
  return J(e) && s.set(e, a), a;
}
function no(e) {
  return e[0] !== "$" && !Vt(e);
}
const As = (e) => e === "_" || e === "_ctx" || e === "$stable", Fs = (e) => j(e) ? e.map($e) : [$e(e)], Hl = (e, t, n) => {
  if (t._n)
    return t;
  const s = Xi((...o) => Fs(t(...o)), n);
  return s._c = !1, s;
}, yr = (e, t, n) => {
  const s = e._ctx;
  for (const o in e) {
    if (As(o)) continue;
    const r = e[o];
    if (k(r))
      t[o] = Hl(o, r, s);
    else if (r != null) {
      const i = Fs(r);
      t[o] = () => i;
    }
  }
}, br = (e, t) => {
  const n = Fs(t);
  e.slots.default = () => n;
}, Rr = (e, t, n) => {
  for (const s in t)
    (n || !As(s)) && (e[s] = t[s]);
}, jl = (e, t, n) => {
  const s = e.slots = hr();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (Rr(s, t, n), n && Oo(s, "_", o, !0)) : yr(t, s);
  } else t && br(e, t);
}, kl = (e, t, n) => {
  const { vnode: s, slots: o } = e;
  let r = !0, i = ee;
  if (s.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? r = !1 : Rr(o, t, n) : (r = !t.$stable, yr(t, o)), i = t;
  } else t && (br(e, t), i = { default: 1 });
  if (r)
    for (const l in o)
      !As(l) && i[l] == null && delete o[l];
}, Re = Nl;
function Vl(e) {
  return Kl(e);
}
function Kl(e, t) {
  const n = Mn();
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
    nextSibling: h,
    setScopeId: v = Be,
    insertStaticContent: T
  } = e, E = (u, d, g, y = null, w = null, m = null, x = void 0, S = null, R = !!d.dynamicChildren) => {
    if (u === d)
      return;
    u && !Ht(u, d) && (y = nn(u), L(u, w, m, !0), u = null), d.patchFlag === -2 && (R = !1, d.dynamicChildren = null);
    const { type: _, ref: O, shapeFlag: C } = d;
    switch (_) {
      case Dn:
        U(u, d, g, y);
        break;
      case et:
        K(u, d, g, y);
        break;
      case es:
        u == null && M(d, g, y, x);
        break;
      case ve:
        le(
          u,
          d,
          g,
          y,
          w,
          m,
          x,
          S,
          R
        );
        break;
      default:
        C & 1 ? G(
          u,
          d,
          g,
          y,
          w,
          m,
          x,
          S,
          R
        ) : C & 6 ? Me(
          u,
          d,
          g,
          y,
          w,
          m,
          x,
          S,
          R
        ) : (C & 64 || C & 128) && _.process(
          u,
          d,
          g,
          y,
          w,
          m,
          x,
          S,
          R,
          Ft
        );
    }
    O != null && w ? Lt(O, u && u.ref, m, d || u, !d) : O == null && u && u.ref != null && Lt(u.ref, null, m, u, !0);
  }, U = (u, d, g, y) => {
    if (u == null)
      s(
        d.el = l(d.children),
        g,
        y
      );
    else {
      const w = d.el = u.el;
      d.children !== u.children && a(w, d.children);
    }
  }, K = (u, d, g, y) => {
    u == null ? s(
      d.el = c(d.children || ""),
      g,
      y
    ) : d.el = u.el;
  }, M = (u, d, g, y) => {
    [u.el, u.anchor] = T(
      u.children,
      d,
      g,
      y,
      u.el,
      u.anchor
    );
  }, V = ({ el: u, anchor: d }, g, y) => {
    let w;
    for (; u && u !== d; )
      w = h(u), s(u, g, y), u = w;
    s(d, g, y);
  }, I = ({ el: u, anchor: d }) => {
    let g;
    for (; u && u !== d; )
      g = h(u), o(u), u = g;
    o(d);
  }, G = (u, d, g, y, w, m, x, S, R) => {
    if (d.type === "svg" ? x = "svg" : d.type === "math" && (x = "mathml"), u == null)
      he(
        d,
        g,
        y,
        w,
        m,
        x,
        S,
        R
      );
    else {
      const _ = u.el && u.el._isVueCE ? u.el : null;
      try {
        _ && _._beginPatch(), A(
          u,
          d,
          w,
          m,
          x,
          S,
          R
        );
      } finally {
        _ && _._endPatch();
      }
    }
  }, he = (u, d, g, y, w, m, x, S) => {
    let R, _;
    const { props: O, shapeFlag: C, transition: P, dirs: H } = u;
    if (R = u.el = i(
      u.type,
      m,
      O && O.is,
      O
    ), C & 8 ? f(R, u.children) : C & 16 && N(
      u.children,
      R,
      null,
      y,
      w,
      Qn(u, m),
      x,
      S
    ), H && lt(u, null, y, "created"), se(R, u, u.scopeId, x, y), O) {
      for (const Y in O)
        Y !== "value" && !Vt(Y) && r(R, Y, null, O[Y], m, y);
      "value" in O && r(R, "value", null, O.value, m), (_ = O.onVnodeBeforeMount) && ke(_, y, u);
    }
    H && lt(u, null, y, "beforeMount");
    const $ = $l(w, P);
    $ && P.beforeEnter(R), s(R, d, g), ((_ = O && O.onVnodeMounted) || $ || H) && Re(() => {
      try {
        _ && ke(_, y, u), $ && P.enter(R), H && lt(u, null, y, "mounted");
      } finally {
      }
    }, w);
  }, se = (u, d, g, y, w) => {
    if (g && v(u, g), y)
      for (let m = 0; m < y.length; m++)
        v(u, y[m]);
    if (w) {
      let m = w.subTree;
      if (d === m || Cr(m.type) && (m.ssContent === d || m.ssFallback === d)) {
        const x = w.vnode;
        se(
          u,
          x,
          x.scopeId,
          x.slotScopeIds,
          w.parent
        );
      }
    }
  }, N = (u, d, g, y, w, m, x, S, R = 0) => {
    for (let _ = R; _ < u.length; _++) {
      const O = u[_] = S ? ze(u[_]) : $e(u[_]);
      E(
        null,
        O,
        d,
        g,
        y,
        w,
        m,
        x,
        S
      );
    }
  }, A = (u, d, g, y, w, m, x) => {
    const S = d.el = u.el;
    let { patchFlag: R, dynamicChildren: _, dirs: O } = d;
    R |= u.patchFlag & 16;
    const C = u.props || ee, P = d.props || ee;
    let H;
    if (g && ct(g, !1), (H = P.onVnodeBeforeUpdate) && ke(H, g, d, u), O && lt(d, u, g, "beforeUpdate"), g && ct(g, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    _ && (!u.dynamicChildren || u.dynamicChildren.length !== _.length) && (R = 0, x = !1, _ = null), (C.innerHTML && P.innerHTML == null || C.textContent && P.textContent == null) && f(S, ""), _ ? te(
      u.dynamicChildren,
      _,
      S,
      g,
      y,
      Qn(d, w),
      m
    ) : x || q(
      u,
      d,
      S,
      null,
      g,
      y,
      Qn(d, w),
      m,
      !1
    ), R > 0) {
      if (R & 16)
        re(S, C, P, g, w);
      else if (R & 2 && C.class !== P.class && r(S, "class", null, P.class, w), R & 4 && r(S, "style", C.style, P.style, w), R & 8) {
        const $ = d.dynamicProps;
        for (let Y = 0; Y < $.length; Y++) {
          const z = $[Y], oe = C[z], ue = P[z];
          (ue !== oe || z === "value") && r(S, z, oe, ue, w, g);
        }
      }
      R & 1 && u.children !== d.children && f(S, d.children);
    } else !x && _ == null && re(S, C, P, g, w);
    ((H = P.onVnodeUpdated) || O) && Re(() => {
      H && ke(H, g, d, u), O && lt(d, u, g, "updated");
    }, y);
  }, te = (u, d, g, y, w, m, x) => {
    for (let S = 0; S < d.length; S++) {
      const R = u[S], _ = d[S], O = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        R.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (R.type === ve || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Ht(R, _) || // - In the case of a component, it could contain anything.
        R.shapeFlag & 198) ? p(R.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          g
        )
      );
      E(
        R,
        _,
        O,
        null,
        y,
        w,
        m,
        x,
        !0
      );
    }
  }, re = (u, d, g, y, w) => {
    if (d !== g) {
      if (d !== ee)
        for (const m in d)
          !Vt(m) && !(m in g) && r(
            u,
            m,
            d[m],
            null,
            w,
            y
          );
      for (const m in g) {
        if (Vt(m)) continue;
        const x = g[m], S = d[m];
        x !== S && m !== "value" && r(u, m, S, x, w, y);
      }
      "value" in g && r(u, "value", d.value, g.value, w);
    }
  }, le = (u, d, g, y, w, m, x, S, R) => {
    const _ = d.el = u ? u.el : l(""), O = d.anchor = u ? u.anchor : l("");
    let { patchFlag: C, dynamicChildren: P, slotScopeIds: H } = d;
    H && (S = S ? S.concat(H) : H), u == null ? (s(_, g, y), s(O, g, y), N(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      d.children || [],
      g,
      O,
      w,
      m,
      x,
      S,
      R
    )) : C > 0 && C & 64 && P && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    u.dynamicChildren && u.dynamicChildren.length === P.length ? (te(
      u.dynamicChildren,
      P,
      g,
      w,
      m,
      x,
      S
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (d.key != null || w && d === w.subTree) && Sr(
      u,
      d,
      !0
      /* shallow */
    )) : q(
      u,
      d,
      g,
      O,
      w,
      m,
      x,
      S,
      R
    );
  }, Me = (u, d, g, y, w, m, x, S, R) => {
    d.slotScopeIds = S, u == null ? d.shapeFlag & 512 ? w.ctx.activate(
      d,
      g,
      y,
      x,
      R
    ) : Te(
      d,
      g,
      y,
      w,
      m,
      x,
      R
    ) : Ee(u, d, R);
  }, Te = (u, d, g, y, w, m, x) => {
    const S = u.component = Yl(
      u,
      y,
      w
    );
    if (Os(u) && (S.ctx.renderer = Ft), Zl(S, !1, x), S.asyncDep) {
      if (w && w.registerDep(S, ce, x), !u.el) {
        const R = S.subTree = Ye(et);
        K(null, R, d, g), u.placeholder = R.el;
      }
    } else
      ce(
        S,
        u,
        d,
        g,
        w,
        m,
        x
      );
  }, Ee = (u, d, g) => {
    const y = d.component = u.component;
    if (Ol(u, d, g))
      if (y.asyncDep && !y.asyncResolved) {
        Z(y, d, g);
        return;
      } else
        y.next = d, y.update();
    else
      d.el = u.el, y.vnode = d;
  }, ce = (u, d, g, y, w, m, x) => {
    const S = () => {
      if (u.isMounted) {
        let { next: C, bu: P, u: H, parent: $, vnode: Y } = u;
        {
          const He = xr(u);
          if (He) {
            C && (C.el = Y.el, Z(u, C, x)), He.asyncDep.then(() => {
              Re(() => {
                u.isUnmounted || _();
              }, w);
            });
            return;
          }
        }
        let z = C, oe;
        ct(u, !1), C ? (C.el = Y.el, Z(u, C, x)) : C = Y, P && Wn(P), (oe = C.props && C.props.onVnodeBeforeUpdate) && ke(oe, $, C, Y), ct(u, !0);
        const ue = eo(u), De = u.subTree;
        u.subTree = ue, E(
          De,
          ue,
          // parent may have changed if it's in a teleport
          p(De.el),
          // anchor may have changed if it's in a fragment
          nn(De),
          u,
          w,
          m
        ), C.el = ue.el, z === null && Al(u, ue.el), H && Re(H, w), (oe = C.props && C.props.onVnodeUpdated) && Re(
          () => ke(oe, $, C, Y),
          w
        );
      } else {
        let C;
        const { el: P, props: H } = d, { bm: $, m: Y, parent: z, root: oe, type: ue } = u, De = Nt(d);
        ct(u, !1), $ && Wn($), !De && (C = H && H.onVnodeBeforeMount) && ke(C, z, d), ct(u, !0);
        {
          oe.ce && oe.ce._hasShadowRoot() && oe.ce._injectChildStyle(
            ue,
            u.parent ? u.parent.type : void 0
          );
          const He = u.subTree = eo(u);
          E(
            null,
            He,
            g,
            y,
            u,
            w,
            m
          ), d.el = He.el;
        }
        if (Y && Re(Y, w), !De && (C = H && H.onVnodeMounted)) {
          const He = d;
          Re(
            () => ke(C, z, He),
            w
          );
        }
        (d.shapeFlag & 256 || z && Nt(z.vnode) && z.vnode.shapeFlag & 256) && u.a && Re(u.a, w), u.isMounted = !0, d = g = y = null;
      }
    };
    u.scope.on();
    const R = u.effect = new Ho(S);
    u.scope.off();
    const _ = u.update = R.run.bind(R), O = u.job = R.runIfDirty.bind(R);
    O.i = u, O.id = u.uid, R.scheduler = () => Es(O), ct(u, !0), _();
  }, Z = (u, d, g) => {
    d.component = u;
    const y = u.vnode.props;
    u.vnode = d, u.next = null, Tl(u, d.props, y, g), kl(u, d.children, g), Xe(), qs(u), Ze();
  }, q = (u, d, g, y, w, m, x, S, R = !1) => {
    const _ = u && u.children, O = u ? u.shapeFlag : 0, C = d.children, { patchFlag: P, shapeFlag: H } = d;
    if (P > 0) {
      if (P & 128) {
        F(
          _,
          C,
          g,
          y,
          w,
          m,
          x,
          S,
          R
        );
        return;
      } else if (P & 256) {
        b(
          _,
          C,
          g,
          y,
          w,
          m,
          x,
          S,
          R
        );
        return;
      }
    }
    H & 8 ? (O & 16 && At(_, w, m), C !== _ && f(g, C)) : O & 16 ? H & 16 ? F(
      _,
      C,
      g,
      y,
      w,
      m,
      x,
      S,
      R
    ) : At(_, w, m, !0) : (O & 8 && f(g, ""), H & 16 && N(
      C,
      g,
      y,
      w,
      m,
      x,
      S,
      R
    ));
  }, b = (u, d, g, y, w, m, x, S, R) => {
    u = u || St, d = d || St;
    const _ = u.length, O = d.length, C = Math.min(_, O);
    let P;
    for (P = 0; P < C; P++) {
      const H = d[P] = R ? ze(d[P]) : $e(d[P]);
      E(
        u[P],
        H,
        g,
        null,
        w,
        m,
        x,
        S,
        R
      );
    }
    _ > O ? At(
      u,
      w,
      m,
      !0,
      !1,
      C
    ) : N(
      d,
      g,
      y,
      w,
      m,
      x,
      S,
      R,
      C
    );
  }, F = (u, d, g, y, w, m, x, S, R) => {
    let _ = 0;
    const O = d.length;
    let C = u.length - 1, P = O - 1;
    for (; _ <= C && _ <= P; ) {
      const H = u[_], $ = d[_] = R ? ze(d[_]) : $e(d[_]);
      if (Ht(H, $))
        E(
          H,
          $,
          g,
          null,
          w,
          m,
          x,
          S,
          R
        );
      else
        break;
      _++;
    }
    for (; _ <= C && _ <= P; ) {
      const H = u[C], $ = d[P] = R ? ze(d[P]) : $e(d[P]);
      if (Ht(H, $))
        E(
          H,
          $,
          g,
          null,
          w,
          m,
          x,
          S,
          R
        );
      else
        break;
      C--, P--;
    }
    if (_ > C) {
      if (_ <= P) {
        const H = P + 1, $ = H < O ? d[H].el : y;
        for (; _ <= P; )
          E(
            null,
            d[_] = R ? ze(d[_]) : $e(d[_]),
            g,
            $,
            w,
            m,
            x,
            S,
            R
          ), _++;
      }
    } else if (_ > P)
      for (; _ <= C; )
        L(u[_], w, m, !0), _++;
    else {
      const H = _, $ = _, Y = /* @__PURE__ */ new Map();
      for (_ = $; _ <= P; _++) {
        const xe = d[_] = R ? ze(d[_]) : $e(d[_]);
        xe.key != null && Y.set(xe.key, _);
      }
      let z, oe = 0;
      const ue = P - $ + 1;
      let De = !1, He = 0;
      const Tt = new Array(ue);
      for (_ = 0; _ < ue; _++) Tt[_] = 0;
      for (_ = H; _ <= C; _++) {
        const xe = u[_];
        if (oe >= ue) {
          L(xe, w, m, !0);
          continue;
        }
        let je;
        if (xe.key != null)
          je = Y.get(xe.key);
        else
          for (z = $; z <= P; z++)
            if (Tt[z - $] === 0 && Ht(xe, d[z])) {
              je = z;
              break;
            }
        je === void 0 ? L(xe, w, m, !0) : (Tt[je - $] = _ + 1, je >= He ? He = je : De = !0, E(
          xe,
          d[je],
          g,
          null,
          w,
          m,
          x,
          S,
          R
        ), oe++);
      }
      const Ks = De ? Ll(Tt) : St;
      for (z = Ks.length - 1, _ = ue - 1; _ >= 0; _--) {
        const xe = $ + _, je = d[xe], $s = d[xe + 1], Ls = xe + 1 < O ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          $s.el || vr($s)
        ) : y;
        Tt[_] === 0 ? E(
          null,
          je,
          g,
          Ls,
          w,
          m,
          x,
          S,
          R
        ) : De && (z < 0 || _ !== Ks[z] ? D(je, g, Ls, 2) : z--);
      }
    }
  }, D = (u, d, g, y, w = null) => {
    const { el: m, type: x, transition: S, children: R, shapeFlag: _ } = u;
    if (_ & 6) {
      D(u.component.subTree, d, g, y);
      return;
    }
    if (_ & 128) {
      u.suspense.move(d, g, y);
      return;
    }
    if (_ & 64) {
      x.move(u, d, g, Ft);
      return;
    }
    if (x === ve) {
      s(m, d, g);
      for (let C = 0; C < R.length; C++)
        D(R[C], d, g, y);
      s(u.anchor, d, g);
      return;
    }
    if (x === es) {
      V(u, d, g);
      return;
    }
    if (y !== 2 && _ & 1 && S)
      if (y === 0)
        S.persisted && !m[Yn] ? s(m, d, g) : (S.beforeEnter(m), s(m, d, g), Re(() => S.enter(m), w));
      else {
        const { leave: C, delayLeave: P, afterLeave: H } = S, $ = () => {
          u.ctx.isUnmounted ? o(m) : s(m, d, g);
        }, Y = () => {
          const z = m._isLeaving || !!m[Yn];
          m._isLeaving && m[Yn](
            !0
            /* cancelled */
          ), S.persisted && !z ? $() : C(m, () => {
            $(), H && H();
          });
        };
        P ? P(m, $, Y) : Y();
      }
    else
      s(m, d, g);
  }, L = (u, d, g, y = !1, w = !1) => {
    const {
      type: m,
      props: x,
      ref: S,
      children: R,
      dynamicChildren: _,
      shapeFlag: O,
      patchFlag: C,
      dirs: P,
      cacheIndex: H,
      memo: $
    } = u;
    if (C === -2 && (w = !1), S != null && (Xe(), Lt(S, null, g, u, !0), Ze()), H != null && (d.renderCache[H] = void 0), O & 256) {
      d.ctx.deactivate(u);
      return;
    }
    const Y = O & 1 && P, z = !Nt(u);
    let oe;
    if (z && (oe = x && x.onVnodeBeforeUnmount) && ke(oe, d, u), O & 6)
      Ln(u.component, g, y);
    else {
      if (O & 128) {
        u.suspense.unmount(g, y);
        return;
      }
      Y && lt(u, null, d, "beforeUnmount"), O & 64 ? u.type.remove(
        u,
        d,
        g,
        Ft,
        y
      ) : _ && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !_.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (m !== ve || C > 0 && C & 64) ? At(
        _,
        d,
        g,
        !1,
        !0
      ) : (m === ve && C & 384 || !w && O & 16) && At(R, d, g), y && Se(u);
    }
    const ue = $ != null && H == null;
    (z && (oe = x && x.onVnodeUnmounted) || Y || ue) && Re(() => {
      oe && ke(oe, d, u), Y && lt(u, null, d, "unmounted"), ue && (u.el = null);
    }, g);
  }, Se = (u) => {
    const { type: d, el: g, anchor: y, transition: w } = u;
    if (d === ve) {
      yt(g, y);
      return;
    }
    if (d === es) {
      I(u);
      return;
    }
    const m = () => {
      o(g), w && !w.persisted && w.afterLeave && w.afterLeave();
    };
    if (u.shapeFlag & 1 && w && !w.persisted) {
      const { leave: x, delayLeave: S } = w, R = () => x(g, m);
      S ? S(u.el, m, R) : R();
    } else
      m();
  }, yt = (u, d) => {
    let g;
    for (; u !== d; )
      g = h(u), o(u), u = g;
    o(d);
  }, Ln = (u, d, g) => {
    const { bum: y, scope: w, job: m, subTree: x, um: S, m: R, a: _ } = u;
    so(R), so(_), y && Wn(y), w.stop(), m && (m.flags |= 8, L(x, u, d, g)), S && Re(S, d), Re(() => {
      u.isUnmounted = !0;
    }, d);
  }, At = (u, d, g, y = !1, w = !1, m = 0) => {
    for (let x = m; x < u.length; x++)
      L(u[x], d, g, y, w);
  }, nn = (u) => {
    if (u.shapeFlag & 6)
      return nn(u.component.subTree);
    if (u.shapeFlag & 128)
      return u.suspense.next();
    const d = h(u.anchor || u.el), g = d && d[nl];
    return g ? h(g) : d;
  };
  let Nn = !1;
  const Vs = (u, d, g) => {
    let y;
    u == null ? d._vnode && (L(d._vnode, null, null, !0), y = d._vnode.component) : E(
      d._vnode || null,
      u,
      d,
      null,
      null,
      null,
      g
    ), d._vnode = u, Nn || (Nn = !0, qs(y), er(), Nn = !1);
  }, Ft = {
    p: E,
    um: L,
    m: D,
    r: Se,
    mt: Te,
    mc: N,
    pc: q,
    pbc: te,
    n: nn,
    o: e
  };
  return {
    render: Vs,
    hydrate: void 0,
    createApp: vl(Vs)
  };
}
function Qn({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function ct({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function $l(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Sr(e, t, n = !1) {
  const s = e.children, o = t.children;
  if (j(s) && j(o))
    for (let r = 0; r < s.length; r++) {
      const i = s[r];
      let l = o[r];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = o[r] = ze(o[r]), l.el = i.el), !n && l.patchFlag !== -2 && Sr(i, l)), l.type === Dn && (l.patchFlag === -1 && (l = o[r] = ze(l)), l.el = i.el), l.type === et && !l.el && (l.el = i.el);
    }
}
function Ll(e) {
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
function xr(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : xr(t);
}
function so(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function vr(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? vr(t.subTree) : null;
}
const Cr = (e) => e.__isSuspense;
function Nl(e, t) {
  t && t.pendingBranch ? j(e) ? t.effects.push(...e) : t.effects.push(e) : Yi(e);
}
const ve = /* @__PURE__ */ Symbol.for("v-fgt"), Dn = /* @__PURE__ */ Symbol.for("v-txt"), et = /* @__PURE__ */ Symbol.for("v-cmt"), es = /* @__PURE__ */ Symbol.for("v-stc"), pt = [];
let Ce = null;
function _e(e = !1) {
  pt.push(Ce = e ? null : []);
}
function Mr() {
  pt.pop(), Ce = pt[pt.length - 1] || null;
}
let Jt = 1;
function oo(e, t = !1) {
  Jt += e, e < 0 && Ce && t && (Ce.hasOnce = !0);
}
function Ir(e) {
  return e.dynamicChildren = Jt > 0 ? Ce || St : null, Mr(), Jt > 0 && Ce && Ce.push(e), e;
}
function be(e, t, n, s, o, r) {
  return Ir(
    ft(
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
function Bl(e, t, n, s, o) {
  return Ir(
    Ye(
      e,
      t,
      n,
      s,
      o,
      !0
    )
  );
}
function Er(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Ht(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Pr = ({ key: e }) => e ?? null, fn = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? ne(e) || /* @__PURE__ */ pe(e) || k(e) ? { i: Ne, r: e, k: t, f: !!n } : e : null);
function ft(e, t = null, n = null, s = 0, o = null, r = e === ve ? 0 : 1, i = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Pr(t),
    ref: t && fn(t),
    scopeId: nr,
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
    ctx: Ne
  };
  return l ? (yn(c, n), r & 128 && e.normalize(c)) : n && (c.shapeFlag |= ne(n) ? 8 : 16), Jt > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  Ce && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && Ce.push(c), c;
}
const Ye = Wl;
function Wl(e, t = null, n = null, s = 0, o = null, r = !1) {
  if ((!e || e === ml) && (e = et), Er(e)) {
    const l = It(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && yn(l, n), Jt > 0 && !r && Ce && (l.shapeFlag & 6 ? Ce[Ce.indexOf(e)] = l : Ce.push(l)), l.patchFlag = -2, l;
  }
  if (nc(e) && (e = e.__vccOpts), t) {
    t = Ul(t);
    let { class: l, style: c } = t;
    l && !ne(l) && (t.class = Ut(l)), J(c) && (/* @__PURE__ */ Is(c) && !j(c) && (c = ge({}, c)), t.style = Wt(c));
  }
  const i = ne(e) ? 1 : Cr(e) ? 128 : An(e) ? 64 : J(e) ? 4 : k(e) ? 2 : 0;
  return ft(
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
function Ul(e) {
  return e ? /* @__PURE__ */ Is(e) || mr(e) ? ge({}, e) : e : null;
}
function It(e, t, n = !1, s = !1) {
  const { props: o, ref: r, patchFlag: i, children: l, transition: c } = e, a = t ? ql(o || {}, t) : o, f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: a,
    key: a && Pr(a),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? j(r) ? r.concat(fn(t)) : [r, fn(t)] : fn(t)
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
    patchFlag: t && e.type !== ve ? i === -1 ? 16 : i | 16 : i,
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
    ssContent: e.ssContent && It(e.ssContent),
    ssFallback: e.ssFallback && It(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && s && Ps(
    f,
    c.clone(f)
  ), f;
}
function Gl(e = " ", t = 0) {
  return Ye(Dn, null, e, t);
}
function ts(e = "", t = !1) {
  return t ? (_e(), Bl(et, null, e)) : Ye(et, null, e);
}
function $e(e) {
  return e == null || typeof e == "boolean" ? Ye(et) : j(e) ? Ye(
    ve,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Er(e) ? ze(e) : Ye(Dn, null, String(e));
}
function ze(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : It(e);
}
function yn(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (j(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), yn(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !mr(t) ? t._ctx = Ne : o === 3 && Ne && (Ne.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (k(t)) {
    if (s & 65) {
      yn(e, { default: t });
      return;
    }
    t = { default: t, _ctx: Ne }, n = 32;
  } else
    t = String(t), s & 64 ? (n = 16, t = [Gl(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function ql(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const o in s)
      if (o === "class")
        t.class !== s.class && (t.class = Ut([t.class, s.class]));
      else if (o === "style")
        t.style = Wt([t.style, s.style]);
      else if (xn(o)) {
        const r = t[o], i = s[o];
        i && r !== i && !(j(r) && r.includes(i)) ? t[o] = r ? [].concat(r, i) : i : i == null && r == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !vn(o) && (t[o] = i);
      } else o !== "" && (t[o] = s[o]);
  }
  return t;
}
function ke(e, t, n, s = null) {
  Fe(e, t, 7, [
    n,
    s
  ]);
}
const zl = ar();
let Jl = 0;
function Yl(e, t, n) {
  const s = e.type, o = (t ? t.appContext : e.appContext) || zl, r = {
    uid: Jl++,
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
    scope: new bi(
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
    propsOptions: wr(s, o),
    emitsOptions: dr(s, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: ee,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: ee,
    data: ee,
    props: ee,
    attrs: ee,
    slots: ee,
    refs: ee,
    setupState: ee,
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
  return r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = Ml.bind(null, r), e.ce && e.ce(r), r;
}
let ye = null;
const Xl = () => ye || Ne;
let bn, Yt;
{
  const e = Mn(), t = (n, s) => {
    let o;
    return (o = e[n]) || (o = e[n] = []), o.push(s), (r) => {
      o.length > 1 ? o.forEach((i) => i(r)) : o[0](r);
    };
  };
  bn = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => ye = n
  ), Yt = t(
    "__VUE_SSR_SETTERS__",
    (n) => Xt = n
  );
}
const en = (e) => {
  const t = ye;
  return bn(e), e.scope.on(), () => {
    e.scope.off(), bn(t);
  };
}, ro = () => {
  ye && ye.scope.off(), bn(null);
};
function Or(e) {
  return e.vnode.shapeFlag & 4;
}
let Xt = !1;
function Zl(e, t = !1, n = !1) {
  t && Yt(t);
  const { props: s, children: o } = e.vnode, r = Or(e);
  Fl(e, s, r, t), jl(e, o, n || t);
  const i = r ? Ql(e, t) : void 0;
  return t && Yt(!1), i;
}
function Ql(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, _l);
  const { setup: s } = n;
  if (s) {
    Xe();
    const o = e.setupContext = s.length > 1 ? tc(e) : null, r = en(e), i = Qt(
      s,
      e,
      0,
      [
        e.props,
        o
      ]
    ), l = Mo(i);
    if (Ze(), r(), (l || e.sp) && !Nt(e) && ir(e), l) {
      if (i.then(ro, ro), t)
        return i.then((c) => {
          Yt(!0);
          try {
            io(e, c, t);
          } finally {
            Yt(!1);
          }
        }).catch((c) => {
          On(c, e, 0);
        });
      e.asyncDep = i;
    } else
      io(e, i);
  } else
    Ar(e);
}
function io(e, t, n) {
  k(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : J(t) && (e.setupState = Yo(t)), Ar(e);
}
function Ar(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || Be);
  {
    const o = en(e);
    Xe();
    try {
      wl(e);
    } finally {
      Ze(), o();
    }
  }
}
const ec = {
  get(e, t) {
    return de(e, "get", ""), e[t];
  }
};
function tc(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, ec),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Ts(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Yo($i(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in Bt)
        return Bt[n](e);
    },
    has(t, n) {
      return n in t || n in Bt;
    }
  })) : e.proxy;
}
function nc(e) {
  return k(e) && "__vccOpts" in e;
}
const fe = (e, t) => /* @__PURE__ */ Ui(e, t, Xt), sc = "3.5.42";
/**
* @vue/runtime-dom v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let gs;
const lo = typeof window < "u" && window.trustedTypes;
if (lo)
  try {
    gs = /* @__PURE__ */ lo.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Fr = gs ? (e) => gs.createHTML(e) : (e) => e, oc = "http://www.w3.org/2000/svg", rc = "http://www.w3.org/1998/Math/MathML", qe = typeof document < "u" ? document : null, co = qe && /* @__PURE__ */ qe.createElement("template"), ic = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const o = t === "svg" ? qe.createElementNS(oc, e) : t === "mathml" ? qe.createElementNS(rc, e) : n ? qe.createElement(e, { is: n }) : qe.createElement(e);
    return e === "select" && s && s.multiple != null && o.setAttribute("multiple", s.multiple), o;
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
  insertStaticContent(e, t, n, s, o, r) {
    const i = n ? n.previousSibling : t.lastChild;
    if (o && (o === r || o.nextSibling))
      for (; t.insertBefore(o.cloneNode(!0), n), !(o === r || !(o = o.nextSibling)); )
        ;
    else {
      co.innerHTML = Fr(
        s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e
      );
      const l = co.content;
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
}, lc = /* @__PURE__ */ Symbol("_vtc");
function cc(e, t, n) {
  const s = e[lc];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const uo = /* @__PURE__ */ Symbol("_vod"), uc = /* @__PURE__ */ Symbol("_vsh"), fc = /* @__PURE__ */ Symbol(""), ac = /(?:^|;)\s*display\s*:/;
function dc(e, t, n) {
  const s = e.style, o = ne(n);
  let r = !1;
  if (n && !o) {
    if (t)
      if (ne(t))
        for (const i of t.split(";")) {
          const l = i.slice(0, i.indexOf(":")).trim();
          n[l] == null && kt(s, l, "");
        }
      else
        for (const i in t)
          n[i] == null && kt(s, i, "");
    for (const i in n) {
      i === "display" && (r = !0);
      const l = n[i];
      l != null ? gc(
        e,
        i,
        !ne(t) && t ? t[i] : void 0,
        l
      ) || kt(s, i, l) : kt(s, i, "");
    }
  } else if (o) {
    if (t !== n) {
      const i = s[fc];
      i && (n += ";" + i), s.cssText = n, r = ac.test(n);
    }
  } else t && e.removeAttribute("style");
  uo in e && (e[uo] = r ? s.display : "", e[uc] && (s.display = "none"));
}
const ln = /\s*!important$/;
function kt(e, t, n) {
  if (j(n))
    n.forEach((s) => kt(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    ln.test(n) ? e.setProperty(t, n.replace(ln, ""), "important") : e.setProperty(t, n);
  else {
    const s = pc(e, t);
    ln.test(n) ? e.setProperty(
      _t(s),
      n.replace(ln, ""),
      "important"
    ) : e[s] = n;
  }
}
const fo = ["Webkit", "Moz", "ms"], ns = {};
function pc(e, t) {
  const n = ns[t];
  if (n)
    return n;
  let s = Pe(t);
  if (s !== "filter" && s in e)
    return ns[t] = s;
  s = Po(s);
  for (let o = 0; o < fo.length; o++) {
    const r = fo[o] + s;
    if (r in e)
      return ns[t] = r;
  }
  return t;
}
function gc(e, t, n, s) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && ne(s) && n === s;
}
const ao = "http://www.w3.org/1999/xlink";
function po(e, t, n, s, o, r = wi(t)) {
  s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(ao, t.slice(6, t.length)) : e.setAttributeNS(ao, t, n) : n == null || r && !Ao(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    r ? "" : Ue(n) ? String(n) : n
  );
}
function go(e, t, n, s, o) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Fr(n) : n);
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
    l === "boolean" ? n = Ao(n) : n == null && l === "string" ? (n = "", i = !0) : l === "number" && (n = 0, i = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  i && e.removeAttribute(o || t);
}
function hc(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function mc(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const ho = /* @__PURE__ */ Symbol("_vei");
function _c(e, t, n, s, o = null) {
  const r = e[ho] || (e[ho] = {}), i = r[t];
  if (s && i)
    i.value = s;
  else {
    const [l, c] = bc(t);
    if (s) {
      const a = r[t] = xc(
        s,
        o
      );
      hc(e, l, a, c);
    } else i && (mc(e, l, i, c), r[t] = void 0);
  }
}
const wc = /(Once|Passive|Capture)$/, yc = /^on:?(?:Once|Passive|Capture)$/;
function bc(e) {
  let t, n;
  for (; (n = e.match(wc)) && !yc.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : _t(e.slice(2)), t];
}
let ss = 0;
const Rc = /* @__PURE__ */ Promise.resolve(), Sc = () => ss || (Rc.then(() => ss = 0), ss = Date.now());
function xc(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    const o = n.value;
    if (j(o)) {
      const r = s.stopImmediatePropagation;
      s.stopImmediatePropagation = () => {
        r.call(s), s._stopped = !0;
      };
      const i = o.slice(), l = [s];
      for (let c = 0; c < i.length && !s._stopped; c++) {
        const a = i[c];
        a && Fe(
          a,
          t,
          5,
          l
        );
      }
    } else
      Fe(
        o,
        t,
        5,
        [s]
      );
  };
  return n.value = e, n.attached = Sc(), n;
}
const mo = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, vc = (e, t, n, s, o, r) => {
  const i = o === "svg";
  t === "class" ? cc(e, s, i) : t === "style" ? dc(e, n, s) : xn(t) ? vn(t) || _c(e, t, n, s, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Cc(e, t, s, i)) ? (go(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && po(e, t, s, i, r, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Mc(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !ne(s))) ? go(e, Pe(t), s, r, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), po(e, t, s, i));
};
function Cc(e, t, n, s) {
  if (s)
    return !!(t === "innerHTML" || t === "textContent" || t in e && mo(t) && k(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return mo(t) && ne(n) ? !1 : t in e;
}
function Mc(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const s = Pe(t);
  return Array.isArray(n) ? n.some((o) => Pe(o) === s) : Object.keys(n).some((o) => Pe(o) === s);
}
const Ic = ["ctrl", "shift", "alt", "meta"], Ec = {
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
  exact: (e, t) => Ic.some((n) => e[`${n}Key`] && !t.includes(n))
}, _o = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), s = t.join(".");
  return n[s] || (n[s] = (o, ...r) => {
    for (let i = 0; i < t.length; i++) {
      const l = Ec[t[i]];
      if (l && l(o, t)) return;
    }
    return e(o, ...r);
  });
}, Pc = /* @__PURE__ */ ge({ patchProp: vc }, ic);
let wo;
function Oc() {
  return wo || (wo = Vl(Pc));
}
const Ac = (...e) => {
  const t = Oc().createApp(...e), { mount: n } = t;
  return t.mount = (s) => {
    const o = Tc(s);
    if (!o) return;
    const r = t._component;
    !k(r) && !r.render && !r.template && (r.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
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
function Tc(e) {
  return ne(e) ? document.querySelector(e) : e;
}
function cn() {
  return !0;
}
const Dc = Symbol("merge-proxy"), an = Symbol("merge-proxy-sources"), Hc = {
  get(e, t, n) {
    return t === Dc ? n : t === an ? e.sources : e.get(t);
  },
  has(e, t) {
    return e.has(t);
  },
  set: cn,
  deleteProperty: cn,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: cn,
      deleteProperty: cn
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function dn(e) {
  return e && typeof e == "object" && "value" in e ? e.value : e;
}
function hs(...e) {
  const t = e.flatMap((n) => typeof n == "object" && n !== null && an in n && Array.isArray(n[an]) ? n[an] : [n]);
  return new Proxy({
    sources: t,
    get(n) {
      for (let s = t.length - 1; s >= 0; s--) {
        const o = dn(t[s])[n];
        if (o !== void 0) return o;
      }
    },
    has(n) {
      for (let s = t.length - 1; s >= 0; s--) if (n in dn(t[s])) return !0;
      return !1;
    },
    keys() {
      const n = [];
      for (const s of t) n.push(...Object.keys(dn(s)));
      return [...Array.from(new Set(n))];
    }
  }, Hc);
}
function yo(...e) {
  const t = {};
  for (let n of e)
    if (n = dn(n), !!n)
      for (const s of Reflect.ownKeys(n)) {
        const o = n[s];
        o !== void 0 && (t[s] = o);
      }
  return t;
}
function Tr(e) {
  return typeof e == "function" ? e : (t) => {
    var n;
    return (n = e.next) == null ? void 0 : n.call(e, t);
  };
}
function jc(e) {
  return Object.assign(e, {
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: We(e, Tr(t), { flush: "sync" }) })
  });
}
function kc(e) {
  return Object.assign(e, {
    set: (t) => {
      e.value = typeof t == "function" ? t(e.value) : t;
    },
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: We(e, Tr(t), { flush: "sync" }) })
  });
}
function Vc() {
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
    createReadonlyAtom: (t, n) => jc(fe(() => t())),
    createWritableAtom: (t, n) => kc(/* @__PURE__ */ Li(t)),
    untrack: (t) => t(),
    batch: (t) => t()
  };
}
function Hn(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function it(e) {
  if (Array.isArray(e)) return e.map(it);
  if (e && typeof e == "object") {
    const t = Object.getPrototypeOf(e);
    if (t !== Object.prototype && t !== null) return e;
    const n = t === null ? X() : {}, s = Object.keys(e);
    for (let o = 0; o < s.length; o++) {
      const r = s[o];
      Object.defineProperty(n, r, {
        configurable: !0,
        enumerable: !0,
        value: it(e[r]),
        writable: !0
      });
    }
    return n;
  }
  return e;
}
function Kc(e, t) {
  const n = Object.keys(t), s = e;
  for (let o = 0; o < n.length; o++) {
    const r = n[o];
    !r.startsWith("_memo_") && r !== "_cellsCache" && (s[r] = t[r]);
  }
  return e;
}
function X() {
  return /* @__PURE__ */ Object.create(null);
}
function Et(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Dr(e, t) {
  return (n) => {
    var s;
    (((s = t.options.atoms) == null ? void 0 : s[e]) ?? t.baseAtoms[e]).set((o) => Hn(n, o));
  };
}
function bo(e) {
  if (typeof e != "object" || e === null) return !1;
  if (Array.isArray(e)) return !0;
  const t = Object.getPrototypeOf(e);
  return t === Object.prototype || t === null;
}
function Ro(e) {
  return Reflect.ownKeys(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
const $c = 3;
function Lc(e, t) {
  return Hr(e, t, $c);
}
function Hr(e, t, n) {
  if (Object.is(e, t)) return !0;
  if (n <= 0 || !bo(e) || !bo(t) || (Array.isArray(e) || Array.isArray(t)) && (!Array.isArray(e) || !Array.isArray(t) || e.length !== t.length))
    return !1;
  const s = Ro(e), o = Ro(t);
  if (s.length !== o.length) return !1;
  const r = e, i = t;
  for (let l = 0; l < s.length; l++) {
    const c = s[l];
    if (!Object.prototype.propertyIsEnumerable.call(t, c) || !Hr(r[c], i[c], n - 1)) return !1;
  }
  return !0;
}
function jn(e, t, n, s = Lc) {
  const o = `on${t.charAt(0).toUpperCase()}${t.slice(1)}Change`, r = e.options[o];
  r && r((i) => {
    const l = Hn(n, i);
    return s(i, l) ? i : l;
  });
}
function Nc(e, t) {
  const n = [], s = (o) => {
    o.forEach((r) => {
      n.push(r);
      const i = t(r);
      i.length && s(i);
    });
  };
  return s(e), n;
}
const Bc = ({ fn: e, memoDeps: t, onAfterCompare: n, onAfterUpdate: s, onBeforeCompare: o, onBeforeUpdate: r }) => {
  let i = [], l;
  return (a) => {
    o == null || o();
    const f = t == null ? void 0 : t(a);
    let p = !f || f.length !== (i == null ? void 0 : i.length);
    if (!p && f) {
      for (let h = 0; h < f.length; h++) if (f[h] !== i[h]) {
        p = !0;
        break;
      }
    }
    return n == null || n(p), p && (i = f, r == null || r(), l = e(...f ?? []), s == null || s(l)), l;
  };
};
function Wc(e) {
  let t = !1;
  return () => {
    if (!t) {
      t = !0;
      return;
    }
    e();
  };
}
function kn({ feature: e, fnName: t, objectId: n, onAfterUpdate: s, table: o, ...r }) {
  const i = () => {
    if (!s) return;
    const { schedule: c, untrack: a } = o._reactivity;
    c(() => a(() => s()));
  };
  return Bc({
    ...r,
    ...{ onAfterUpdate: () => {
      i();
    } }
  });
}
function jr(e, t = "_") {
  const [n, s] = e.split(t);
  return {
    fnKey: s,
    fnName: `${n}.${s}`,
    parentName: n
  };
}
function wt(e, t, n) {
  for (const [s, { fn: o, memoDeps: r }] of Object.entries(n)) {
    const { fnKey: i, fnName: l } = jr(s);
    t[i] = r ? kn({
      memoDeps: r,
      fn: o,
      fnName: l,
      table: t,
      feature: e
    }) : o;
  }
}
function Pt(e, t, n, s) {
  for (const [o, { fn: r, memoDeps: i }] of Object.entries(s)) {
    const { fnKey: l, fnName: c } = jr(o);
    if (i) {
      const a = `_memo_${l}`;
      t[l] = function(...f) {
        if (!this[a]) {
          const p = this;
          this[a] = kn({
            memoDeps: (h) => i(p, h),
            fn: (...h) => r(p, ...h),
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
function ae(e, t, n, ...s) {
  var o;
  return ((o = e[t]) == null ? void 0 : o.call(e, ...s)) ?? n(e, ...s);
}
function Uc(e) {
  return e.row.getValue(e.column.id);
}
function Gc(e) {
  return e.getValue() ?? e.table.options.renderFallbackValue;
}
function qc(e) {
  return {
    table: e.table,
    column: e.column,
    row: e.row,
    cell: e,
    getValue: () => e.getValue(),
    renderValue: () => e.renderValue()
  };
}
const zc = { assignCellPrototype: (e, t) => {
  Pt("coreCellsFeature", e, t, {
    cell_getValue: { fn: (n) => Uc(n) },
    cell_renderValue: { fn: (n) => Gc(n) },
    cell_getContext: {
      fn: (n) => qc(n),
      memoDeps: (n) => [n]
    }
  });
} };
function Jc(e) {
  var t, n;
  if (!e._headerPrototype) {
    e._headerPrototype = { table: e };
    const s = Object.values(e._features);
    for (let o = 0; o < s.length; o++) (n = (t = s[o]).assignHeaderPrototype) == null || n.call(t, e._headerPrototype, e);
  }
  return e._headerPrototype;
}
function kr(e, t, n) {
  const s = Jc(e), o = Object.create(s);
  o.colSpan = 0, o.column = t, o.depth = n.depth, o.headerGroup = null, o.id = n.id ?? t.id, o.index = n.index, o.isPlaceholder = !!n.isPlaceholder, o.placeholderId = n.placeholderId, o.rowSpan = 0, o.subHeaders = [];
  const r = e._headerInstanceInitFns;
  for (let i = 0; i < r.length; i++) r[i](o);
  return o;
}
function Yc() {
  return {
    start: [],
    end: []
  };
}
function ht(e) {
  var s;
  const t = (s = e.table.atoms.columnVisibility) == null ? void 0 : s.get();
  if (!t) return !0;
  const n = e.columns;
  return n.length ? n.some((o) => ae(o, "getIsVisible", ht)) : (Et(t, e.id) ? t[e.id] : void 0) ?? !0;
}
function Xc(e) {
  return e.getAllLeafColumns().filter((t) => ae(t, "getIsVisible", ht));
}
function Vr(e, t = 1) {
  let n = t;
  for (let s = 0; s < e.length; s++) {
    const o = e[s];
    ae(o, "getIsVisible", ht) && o.columns.length && (n = Math.max(n, Vr(o.columns, t + 1)));
  }
  return n;
}
function Zc(e, t) {
  return String(t);
}
function Qc(e, t, n, s) {
  let o = e ?? "";
  return t && (o = o ? `${o}_${t}` : String(t)), n && (o = o ? `${o}_${n}` : n), s && (o = o ? `${o}_${s}` : s), o;
}
function eu(e, t) {
  let n = 0;
  for (let s = 0; s < e.length; s++) e[s].column === t && n++;
  return n;
}
function Kr(e, t, n, s, o, r) {
  const i = {
    depth: t,
    id: Zc(s, t),
    headers: []
  }, l = [];
  for (let c = 0; c < e.length; c++) {
    if (!(c in e)) continue;
    const a = e[c], f = l[l.length - 1], p = a.column.depth === i.depth;
    let h, v = !1;
    if (p && a.column.parent ? h = a.column.parent : (h = a.column, v = !0), f && f.column === h) f.subHeaders.push(a);
    else {
      const T = kr(n, h, {
        id: Qc(s, t, h.id, a.id),
        isPlaceholder: v,
        placeholderId: v ? String(eu(l, h)) : void 0,
        depth: t,
        index: l.length
      });
      T.subHeaders.push(a), l.push(T);
    }
    i.headers.push(a), a.headerGroup = i;
  }
  for (let c = 0; c < r.length; c++) r[c](i);
  o.push(i), t > 0 && Kr(l, t - 1, n, s, o, r);
}
function $r(e) {
  for (let t = 0; t < e.length; t++) {
    const n = e[t];
    if (!ae(n.column, "getIsVisible", ht)) continue;
    let s = 0;
    if (n.subHeaders.length) {
      $r(n.subHeaders);
      for (let o = 0; o < n.subHeaders.length; o++) {
        const r = n.subHeaders[o];
        ae(r.column, "getIsVisible", ht) && (s += r.colSpan);
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
function So(e, t, n, s) {
  var c;
  const o = Vr(e), r = [], i = n._headerGroupInstanceInitFns, l = new Array(t.length);
  for (let a = 0; a < t.length; a++)
    a in t && (l[a] = kr(n, t[a], {
      depth: o,
      index: a
    }));
  return Kr(l, o - 1, n, s, r, i), r.reverse(), $r(((c = r[0]) == null ? void 0 : c.headers) ?? []), r;
}
function tu(e) {
  var t, n;
  if (!e._columnPrototype) {
    e._columnPrototype = { table: e };
    const s = Object.values(e._features);
    for (let o = 0; o < s.length; o++) (n = (t = s[o]).assignColumnPrototype) == null || n.call(t, e._columnPrototype, e);
  }
  return e._columnPrototype;
}
function nu(e, t, n, s) {
  const o = {
    ...e.getDefaultColumnDef(),
    ...t
  }, r = o.accessorKey, i = r === void 0 ? void 0 : String(r), l = o.id ?? (i == null ? void 0 : i.replaceAll(".", "_")) ?? (typeof o.header == "string" ? o.header : void 0);
  let c;
  if (o.accessorFn) c = o.accessorFn;
  else if (r !== void 0) if (typeof r == "string" && r.includes(".")) {
    const h = r.split(".");
    c = (v) => {
      let T = v;
      for (let E = 0; E < h.length; E++) {
        const U = h[E];
        T = T == null ? void 0 : T[U];
      }
      return T;
    };
  } else c = (h) => h[o.accessorKey];
  if (!l)
    throw new Error();
  const a = tu(e), f = Object.create(a);
  f.accessorFn = c, f.columnDef = o, f.columns = [], f.depth = n, f.id = `${String(l)}`, f.parent = s;
  const p = e._columnInstanceInitFns;
  for (let h = 0; h < p.length; h++) p[h](f);
  return f;
}
function Lr(e) {
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
    return su(e, o);
  };
}
function su(e, t) {
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
function ou(e) {
  return [e, ...e.columns.flatMap((t) => t.getFlatColumns())];
}
function ru(e) {
  if (e.columns.length) {
    const t = e.columns.flatMap((n) => n.getLeafColumns());
    return ae(e.table, "getOrderColumns", Lr)(t);
  }
  return [e];
}
function iu(e) {
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
function Nr(e, t, n, s = 0) {
  const o = new Array(t.length);
  for (let r = 0; r < t.length; r++) {
    if (!(r in t)) continue;
    const i = t[r], l = nu(e, i, s, n), c = i;
    l.columns = c.columns ? Nr(e, c.columns, l, s + 1) : [], o[r] = l;
  }
  return o;
}
function lu(e) {
  return Nr(e, e.options.columns);
}
function cu(e) {
  return e.getAllColumns().flatMap((t) => t.getFlatColumns());
}
function uu(e) {
  const t = X(), n = e.getAllFlatColumns();
  for (let s = 0; s < n.length; s++) {
    const o = n[s];
    t[o.id] = o;
  }
  return t;
}
function fu(e) {
  const t = e.getAllColumns().flatMap((n) => n.getLeafColumns());
  return ae(e, "getOrderColumns", Lr)(t);
}
function au(e) {
  const t = X(), n = e.getAllLeafColumns();
  for (let s = 0; s < n.length; s++) {
    const o = n[s];
    t[o.id] = o;
  }
  return t;
}
function du(e, t) {
  return e.getAllFlatColumnsById()[t];
}
const pu = {
  assignColumnPrototype: (e, t) => {
    Pt("coreColumnsFeature", e, t, {
      column_getFlatColumns: {
        fn: (n) => ou(n),
        memoDeps: (n) => [n.table.options.columns]
      },
      column_getLeafColumns: {
        fn: (n) => ru(n),
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
    wt("coreColumnsFeature", e, {
      table_getDefaultColumnDef: {
        fn: () => iu(e),
        memoDeps: () => [e.options.defaultColumn]
      },
      table_getAllColumns: {
        fn: () => lu(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumns: {
        fn: () => cu(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumnsById: {
        fn: () => uu(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllLeafColumns: {
        fn: () => fu(e),
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
        fn: () => au(e),
        memoDeps: () => [e.getAllLeafColumns()]
      },
      table_getColumn: { fn: (t) => du(e, t) }
    });
  }
};
function Br(e, t) {
  for (let n = 0; n < e.subHeaders.length; n++) Br(e.subHeaders[n], t);
  t.push(e);
}
function gu(e) {
  const t = [];
  return Br(e, t), t;
}
function hu(e) {
  return {
    column: e.column,
    header: e,
    table: e.column.table
  };
}
function mu(e) {
  var a;
  const { start: t, end: n } = ((a = e.atoms.columnPinning) == null ? void 0 : a.get()) ?? Yc(), s = e.getAllColumns(), o = ae(e, "getVisibleLeafColumns", Xc);
  if (!t.length && !n.length) return So(s, o, e);
  const r = e.getAllLeafColumnsById(), i = [];
  for (let f = 0; f < t.length; f++) {
    const p = r[t[f]];
    p && ae(p, "getIsVisible", ht) && i.push(p);
  }
  const l = [];
  for (let f = 0; f < n.length; f++) {
    const p = r[n[f]];
    p && ae(p, "getIsVisible", ht) && l.push(p);
  }
  const c = o.filter((f) => !t.includes(f.id) && !n.includes(f.id));
  return So(s, [
    ...i,
    ...c,
    ...l
  ], e);
}
function _u(e) {
  return [...e.getHeaderGroups()].reverse();
}
function wu(e) {
  const t = e.getHeaderGroups(), n = [];
  for (let s = 0; s < t.length; s++) {
    const o = t[s].headers;
    for (let r = 0; r < o.length; r++) n.push(o[r]);
  }
  return n;
}
function yu(e) {
  var s;
  const t = ((s = e.getHeaderGroups()[0]) == null ? void 0 : s.headers) ?? [], n = [];
  for (let o = 0; o < t.length; o++) {
    const r = t[o].getLeafHeaders();
    for (let i = 0; i < r.length; i++) n.push(r[i]);
  }
  return n;
}
const bu = {
  assignHeaderPrototype: (e, t) => {
    Pt("coreHeadersFeature", e, t, {
      header_getLeafHeaders: {
        fn: (n) => gu(n),
        memoDeps: (n) => [n.column.table.options.columns]
      },
      header_getContext: {
        fn: (n) => hu(n),
        memoDeps: (n) => [n.column.table.options.columns]
      }
    });
  },
  constructTableAPIs: (e) => {
    wt("coreHeadersFeature", e, {
      table_getHeaderGroups: {
        fn: () => mu(e),
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
        fn: () => _u(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getFlatHeaders: {
        fn: () => wu(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getLeafHeaders: {
        fn: () => yu(e),
        memoDeps: () => [e.getHeaderGroups()]
      }
    });
  }
};
function Ru(e) {
  var t, n;
  if (!e._rowPrototype) {
    e._rowPrototype = { table: e };
    const s = Object.values(e._features);
    for (let o = 0; o < s.length; o++) (n = (t = s[o]).assignRowPrototype) == null || n.call(t, e._rowPrototype, e);
  }
  return e._rowPrototype;
}
const Su = (e, t, n, s, o, r, i) => {
  const l = Ru(e), c = Object.create(l);
  c._displayIndexCache = -1, c._uniqueValuesCache = X(), c._valuesCache = X(), c.depth = o, c.id = t, c.index = s, c.original = n, c.parentId = i, c.subRows = [];
  const a = e._rowInstanceInitFns;
  for (let f = 0; f < a.length; f++) a[f](c);
  return c;
};
function xu() {
  return [];
}
function vu(e, t) {
  jn(e, "cellSelection", it(e.initialState.cellSelection) ?? xu());
}
function Cu(e) {
  e.atoms.cellSelection && (e.options.autoResetAll ?? e.options.autoResetCellSelection ?? !0) && e._reactivity.schedule(() => vu(e));
}
function Mu() {
  return X();
}
function Wr(e) {
  e.atoms.expanded && (e.options.autoResetAll ?? e.options.autoResetExpanded ?? !e.options.manualExpanding) && e._reactivity.schedule(() => Gr(e));
}
function Rn(e, t) {
  var n, s;
  (s = (n = e.options).onExpandedChange) == null || s.call(n, t);
}
function Ur(e, t) {
  var s;
  const n = ((s = e.atoms.expanded) == null ? void 0 : s.get()) ?? {};
  if (t ?? !zr(e)) {
    if (n === !0 || !qr(e)) return;
    Rn(e, !0);
  } else {
    if (n !== !0 && !Object.keys(n).length) return;
    Rn(e, X());
  }
}
function Gr(e, t) {
  const n = e.initialState.expanded;
  jn(e, "expanded", t ? X() : n === !0 ? !0 : Object.assign(X(), it(n ?? {})));
}
function qr(e) {
  return e.getPrePaginatedRowModel().flatRows.some((t) => mt(t));
}
function Iu(e) {
  return (t) => {
    Ur(e);
  };
}
function Eu(e) {
  var n;
  const t = ((n = e.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return t === !0 || Object.values(t).some(Boolean);
}
function zr(e) {
  var s;
  const t = ((s = e.atoms.expanded) == null ? void 0 : s.get()) ?? {};
  if (t === !0) return !0;
  if (!Object.keys(t).length) return !1;
  const n = e.getRowModel().flatRows.filter((o) => mt(o));
  return !(!n.length || n.some((o) => !Vn(o)));
}
function Pu(e) {
  var s;
  let t = 0;
  const n = (s = e.atoms.expanded) == null ? void 0 : s.get();
  return (n === !0 ? Object.values(e.getRowModel().rowsById).filter((o) => mt(o)).map((o) => o.id) : Object.keys(n ?? {})).forEach((o) => {
    const r = o.split(".");
    t = Math.max(t, r.length);
  }), t;
}
function Jr(e, t) {
  var r;
  const n = ((r = e.table.atoms.expanded) == null ? void 0 : r.get()) ?? {}, s = n === !0 || ms(n, e.id), o = t ?? !s;
  o !== s && (o && !mt(e) || Rn(e.table, (i) => {
    const l = i === !0 ? !0 : ms(i, e.id);
    let c = X();
    if (i === !0 ? Object.values(e.table.getRowModel().rowsById).forEach((a) => {
      mt(a) && (c[a.id] = !0);
    }) : c = Object.assign(X(), i), !l && o)
      return c[e.id] = !0, c;
    if (l && !o) {
      const a = X(), f = Object.keys(c);
      for (let p = 0; p < f.length; p++) {
        const h = f[p];
        h !== e.id && c[h] && (a[h] = !0);
      }
      return a;
    }
    return i;
  }));
}
function Vn(e) {
  var n, s, o;
  const t = ((n = e.table.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return !!(((o = (s = e.table.options).getIsRowExpanded) == null ? void 0 : o.call(s, e)) ?? (t === !0 || ms(t, e.id)));
}
function ms(e, t) {
  return !!(e && e !== !0 && Et(e, t) && e[t]);
}
function mt(e) {
  var t, n;
  return ((n = (t = e.table.options).getRowCanExpand) == null ? void 0 : n.call(t, e)) ?? ((e.table.options.enableExpanding ?? !0) && !!e.subRows.length);
}
function Ou(e) {
  let t = !0, n = e;
  for (; t && n.parentId; )
    n = e.table.getRow(n.parentId, !0), t = Vn(n);
  return t;
}
function Au(e) {
  const t = mt(e);
  return () => {
    t && Jr(e);
  };
}
const _s = 0;
function Fu(e) {
  var t, n;
  if (e.options.autoResetAll ?? e.options.autoResetPageIndex ?? !e.options.manualPagination) {
    if ((((n = (t = e.atoms.pagination) == null ? void 0 : t.get()) == null ? void 0 : n.pageIndex) ?? _s) === _s) return;
    Hu(e);
  }
}
function Tu(e, t) {
  jn(e, "pagination", t);
}
function Du(e, t) {
  Tu(e, (n) => {
    let s = Hn(t, n.pageIndex);
    const o = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
    return s = Math.max(0, Math.min(s, o)), {
      ...n,
      pageIndex: s
    };
  });
}
function Hu(e, t) {
  Du(e, _s);
}
function ju(e, t) {
  jn(e, "sorting", t);
}
function ku(e, t) {
  ju(e, it(e.initialState.sorting ?? []));
}
function Vu(e) {
  e.atoms.sorting && (e.options.autoResetAll ?? e.options.autoResetSorting ?? !1) && ku(e);
}
function Yr() {
  return (e) => kn({
    feature: "coreRowModelsFeature",
    table: e,
    fnName: "table.getCoreRowModel",
    memoDeps: () => [e.options.data],
    fn: () => Ku(e, e.options.data),
    onAfterUpdate: Wc(() => {
      Wr(e), Fu(e), Vu(e), Cu(e);
    })
  });
}
function Xr(e, t, n, s = 0, o) {
  var i;
  const r = [];
  for (let l = 0; l < n.length; l++) {
    const c = n[l], a = Su(e, e.getRowId(c, l, o), c, l, s, void 0, o == null ? void 0 : o.id);
    t.flatRows.push(a), t.rowsById[a.id] = a, r.push(a), e.options.getSubRows && (a.originalSubRows = e.options.getSubRows(c, l), (i = a.originalSubRows) != null && i.length && (a.subRows = Xr(e, t, a.originalSubRows, s + 1, a)));
  }
  return r;
}
function Ku(e, t) {
  const n = {
    rows: [],
    flatRows: [],
    rowsById: X()
  };
  return n.rows = Xr(e, n, t), n;
}
function $u(e) {
  var t, n;
  return e._rowModels.coreRowModel || (e._rowModels.coreRowModel = ((n = (t = e.options.features).coreRowModel) == null ? void 0 : n.call(t, e)) ?? Yr()(e)), e._rowModels.coreRowModel();
}
function Lu(e) {
  return e.getCoreRowModel();
}
function Nu(e) {
  var t, n;
  return e._rowModels.filteredRowModel || (e._rowModels.filteredRowModel = (n = (t = e.options.features).filteredRowModel) == null ? void 0 : n.call(t, e)), e.options.manualFiltering || !e._rowModels.filteredRowModel ? e.getPreFilteredRowModel() : e._rowModels.filteredRowModel();
}
function Bu(e) {
  return e.getFilteredRowModel();
}
function Wu(e) {
  var t, n;
  return e._rowModels.groupedRowModel || (e._rowModels.groupedRowModel = (n = (t = e.options.features).groupedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualGrouping || !e._rowModels.groupedRowModel ? e.getPreGroupedRowModel() : e._rowModels.groupedRowModel();
}
function Uu(e) {
  return e.getGroupedRowModel();
}
function Gu(e) {
  var t, n;
  return e._rowModels.sortedRowModel || (e._rowModels.sortedRowModel = (n = (t = e.options.features).sortedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualSorting || !e._rowModels.sortedRowModel ? e.getPreSortedRowModel() : e._rowModels.sortedRowModel();
}
function qu(e) {
  return e.getSortedRowModel();
}
function zu(e) {
  var t, n;
  return e._rowModels.expandedRowModel || (e._rowModels.expandedRowModel = (n = (t = e.options.features).expandedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualExpanding || !e._rowModels.expandedRowModel ? e.getPreExpandedRowModel() : e._rowModels.expandedRowModel();
}
function Ju(e) {
  return e.getExpandedRowModel();
}
function Yu(e) {
  var t, n;
  return e._rowModels.paginatedRowModel || (e._rowModels.paginatedRowModel = (n = (t = e.options.features).paginatedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualPagination || !e._rowModels.paginatedRowModel ? e.getPrePaginatedRowModel() : e._rowModels.paginatedRowModel();
}
function Xu(e) {
  return e.getPaginatedRowModel();
}
const Zu = { constructTableAPIs: (e) => {
  wt("coreRowModelsFeature", e, {
    table_getCoreRowModel: { fn: () => $u(e) },
    table_getPreFilteredRowModel: { fn: () => Lu(e) },
    table_getFilteredRowModel: { fn: () => Nu(e) },
    table_getPreGroupedRowModel: { fn: () => Bu(e) },
    table_getGroupedRowModel: { fn: () => Wu(e) },
    table_getPreSortedRowModel: { fn: () => Uu(e) },
    table_getSortedRowModel: { fn: () => Gu(e) },
    table_getPreExpandedRowModel: { fn: () => qu(e) },
    table_getExpandedRowModel: { fn: () => zu(e) },
    table_getPrePaginatedRowModel: { fn: () => Ju(e) },
    table_getPaginatedRowModel: { fn: () => Yu(e) },
    table_getRowModel: { fn: () => Xu(e) }
  });
} };
function Qu(e) {
  var t, n;
  if (!e._cellPrototype) {
    e._cellPrototype = { table: e };
    const s = Object.values(e._features);
    for (let o = 0; o < s.length; o++) (n = (t = s[o]).assignCellPrototype) == null || n.call(t, e._cellPrototype, e);
  }
  return e._cellPrototype;
}
function ef(e, t, n) {
  const s = Qu(n), o = Object.create(s);
  o.column = e, o.id = `${t.id}_${e.id}`, o.row = t;
  const r = n._cellInstanceInitFns;
  for (let i = 0; i < r.length; i++) r[i](o);
  return o;
}
function tf(e) {
  const t = e.table.getRowsInDisplayOrder(), n = e._displayIndexCache;
  return t[n] === e ? n : -1;
}
function nf(e) {
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
function sf(e, t) {
  if (Et(e._valuesCache, t)) return e._valuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return e._valuesCache[t] = n.accessorFn(e.original, e.index), e._valuesCache[t];
}
function of(e, t) {
  if (Et(e._uniqueValuesCache, t)) return e._uniqueValuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return n.columnDef.getUniqueValues ? (e._uniqueValuesCache[t] = n.columnDef.getUniqueValues(e.original, e.index), e._uniqueValuesCache[t]) : (e._uniqueValuesCache[t] = [e.getValue(t)], e._uniqueValuesCache[t]);
}
function rf(e, t) {
  return e.getValue(t) ?? e.table.options.renderFallbackValue;
}
function lf(e) {
  return Nc(e.subRows, (t) => t.subRows);
}
function cf(e) {
  const t = e.getCoreRowModel().flatRows;
  let n = 0;
  for (let s = 0; s < t.length; s++) n = Math.max(n, t[s].depth);
  return n;
}
function uf(e) {
  if (e.parentId)
    return e.table.getCoreRowModel().rowsById[e.parentId] ?? e.table.getRow(e.parentId, !0);
}
function ff(e) {
  const t = [];
  let n = e;
  for (; ; ) {
    const s = n.getParentRow();
    if (!s) break;
    t.push(s), n = s;
  }
  return t.reverse();
}
function af(e) {
  const t = e.table.getAllLeafColumns();
  let n = e._cellsCache;
  n || (n = e._cellsCache = /* @__PURE__ */ new WeakMap());
  const s = new Array(t.length);
  for (let o = 0; o < t.length; o++) {
    const r = t[o];
    let i = n.get(r);
    i || (i = ef(r, e, e.table), n.set(r, i)), s[o] = i;
  }
  return s;
}
function df(e) {
  const t = X(), n = e.getAllCells();
  for (let s = 0; s < n.length; s++) {
    const o = n[s];
    t[o.column.id] = o;
  }
  return t;
}
function pf(e, t, n, s) {
  var o, r;
  return ((r = (o = t.options).getRowId) == null ? void 0 : r.call(o, e, n, s)) ?? (s ? `${s.id}.${n}` : String(n));
}
function gf(e, t, n) {
  let s = (n ? e.getPrePaginatedRowModel() : e.getRowModel()).rowsById[t];
  if (!s && (s = e.getCoreRowModel().rowsById[t], !s))
    throw new Error();
  return s;
}
const hf = {
  assignRowPrototype: (e, t) => {
    Pt("coreRowsFeature", e, t, {
      row_getDisplayIndex: { fn: (n) => tf(n) },
      row_getAllCellsByColumnId: {
        fn: (n) => df(n),
        memoDeps: (n) => [n.getAllCells()]
      },
      row_getAllCells: {
        fn: (n) => af(n),
        memoDeps: (n) => [n.table.getAllLeafColumns()]
      },
      row_getLeafRows: {
        fn: (n) => lf(n),
        memoDeps: (n) => [n.subRows]
      },
      row_getParentRow: { fn: (n) => uf(n) },
      row_getParentRows: { fn: (n) => ff(n) },
      row_getUniqueValues: { fn: (n, s) => of(n, s) },
      row_getValue: { fn: (n, s) => sf(n, s) },
      row_renderValue: { fn: (n, s) => rf(n, s) }
    });
  },
  constructTableAPIs: (e) => {
    wt("coreRowsFeature", e, {
      table_getRowsInDisplayOrder: {
        fn: () => nf(e),
        memoDeps: () => {
          var t;
          return [
            e.getPrePaginatedRowModel().rows,
            e.options.paginateExpandedRows,
            e.options.paginateExpandedRows === !1 ? (t = e.atoms.expanded) == null ? void 0 : t.get() : void 0
          ];
        }
      },
      table_getRowId: { fn: (t, n, s) => pf(t, e, n, s) },
      table_getRow: { fn: (t, n) => gf(e, t, n) },
      table_getMaxSubRowDepth: {
        fn: () => cf(e),
        memoDeps: () => [e.getCoreRowModel()]
      }
    });
  }
};
function Zr(e, t, n = (s, o) => s === o) {
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
function mf(e, t, n = (s, o) => s === o) {
  e._reactivity.batch(() => {
    var s, o;
    Zr(e, t, n), (o = (s = e._reactivity).commit) == null || o.call(s);
  });
}
function _f(e) {
  var s, o;
  const t = it(e.initialState);
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
function wf(e, t) {
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
function yf(e, t, n) {
  const s = wf(e, Hn(t, e.options));
  e.optionsStore ? e.optionsStore.set(() => s) : e.options = s, mf(e, s.state ?? null);
}
const bf = { constructTableAPIs: (e) => {
  wt("coreTablesFeature", e, {
    table_reset: { fn: () => _f(e) },
    table_setOptions: { fn: (t) => yf(e, t) }
  });
} }, Rf = {
  coreCellsFeature: zc,
  coreColumnsFeature: pu,
  coreHeadersFeature: bu,
  coreRowModelsFeature: Zu,
  coreRowsFeature: hf,
  coreTablesFeature: bf
};
function Sf(e) {
  const t = e;
  return Object.defineProperty(e, "state", { get() {
    return e.get();
  } }), "set" in e && (t.setState = e.set.bind(e)), t;
}
function xf(e, t) {
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
  const n = xo(e);
  if (n.length !== xo(t).length) return !1;
  for (let s = 0; s < n.length; s++) if (!Object.prototype.hasOwnProperty.call(t, n[s]) || !Object.is(e[n[s]], t[n[s]])) return !1;
  return !0;
}
function xo(e) {
  return Object.keys(e).concat(Object.getOwnPropertySymbols(e));
}
function vf(e, t = {}) {
  return Object.values(e).forEach((n) => {
    var s;
    t = ((s = n.getInitialState) == null ? void 0 : s.call(n, t)) ?? t;
  }), it(t);
}
function Cf(e) {
  var he, se;
  const t = e.features.coreReactivityFeature, { aggregationFns: n, columnMeta: s, coreRowModel: o, expandedRowModel: r, facetedMinMaxValues: i, facetedRowModel: l, facetedUniqueValues: c, filterFns: a, filterMeta: f, filteredRowModel: p, groupedRowModel: h, paginatedRowModel: v, sortFns: T, sortedRowModel: E, tableMeta: U, ...K } = e.features, M = {
    _cellInstanceInitFns: [],
    _columnInstanceInitFns: [],
    _features: {
      ...Rf,
      ...K
    },
    _headerGroupInstanceInitFns: [],
    _headerInstanceInitFns: [],
    _reactivity: t,
    _rowInstanceInitFns: [],
    _rowModelFns: {
      aggregationFns: n,
      filterFns: a,
      sortFns: T
    },
    _rowModels: {},
    atoms: {},
    baseAtoms: {}
  }, V = Object.values(M._features), I = {
    ...V.reduce((N, A) => {
      var te;
      return Object.assign(N, (te = A.getDefaultTableOptions) == null ? void 0 : te.call(A, M));
    }, {}),
    ...e
  };
  if (t.wrapExternalAtoms && I.atoms) for (const [N, A] of Object.entries(I.atoms)) {
    const te = A, re = t.createWritableAtom(te.get(), { debugName: `externalAtom/${N}` });
    I.atoms[N] = re;
    let le = !1;
    const Me = te.subscribe((Ee) => {
      le || re.set(Ee);
    }), Te = re.subscribe((Ee) => {
      le = !0, te.set(Ee), le = !1;
    });
    t.addSubscription(Me), t.addSubscription(Te);
  }
  t.createOptionsStore ? (M.optionsStore = t.createWritableAtom(I, { debugName: "table/optionsStore" }), Object.defineProperty(M, "options", {
    configurable: !0,
    enumerable: !0,
    get() {
      return M.optionsStore.get();
    },
    set(N) {
      M.optionsStore.set(() => N);
    }
  })) : M.options = I, M.initialState = vf(M._features, M.options.initialState);
  const G = Object.keys(M.initialState);
  for (let N = 0; N < G.length; N++) {
    const A = G[N];
    M.baseAtoms[A] = t.createWritableAtom(M.initialState[A], { debugName: `table/baseAtoms/${A}` }), M.atoms[A] = t.createReadonlyAtom(() => {
      var Te;
      const te = M.options, re = (Te = te.atoms) == null ? void 0 : Te[A], le = re ? re.get() : M.baseAtoms[A].get();
      if (re) return le;
      const Me = te.state;
      if (Me && Et(Me, A)) {
        const Ee = Me[A];
        return Ee === void 0 ? M.initialState[A] : Ee;
      }
      return le;
    }, { debugName: `table/atoms/${A}` });
  }
  Zr(M), M.store = Sf(t.createReadonlyAtom(() => {
    const N = {};
    for (let A = 0; A < G.length; A++) {
      const te = G[A];
      N[te] = M.atoms[te].get();
    }
    return N;
  }, {
    compare: xf,
    debugName: "table/store"
  }));
  for (let N = 0; N < V.length; N++) {
    const A = V[N];
    (he = A.initTableInstanceData) == null || he.call(A, M), A.initCellInstanceData && M._cellInstanceInitFns.push(A.initCellInstanceData.bind(A)), A.initColumnInstanceData && M._columnInstanceInitFns.push(A.initColumnInstanceData.bind(A)), A.initHeaderGroupInstanceData && M._headerGroupInstanceInitFns.push(A.initHeaderGroupInstanceData.bind(A)), A.initHeaderInstanceData && M._headerInstanceInitFns.push(A.initHeaderInstanceData.bind(A)), A.initRowInstanceData && M._rowInstanceInitFns.push(A.initRowInstanceData.bind(A)), (se = A.constructTableAPIs) == null || se.call(A, M);
  }
  return M;
}
const Mf = {
  getInitialState: (e) => ({
    expanded: Mu(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onExpandedChange: Dr("expanded", e),
    paginateExpandedRows: !0
  }),
  assignRowPrototype: (e, t) => {
    Pt("rowExpandingFeature", e, t, {
      row_toggleExpanded: { fn: (n, s) => Jr(n, s) },
      row_getIsExpanded: { fn: (n) => Vn(n) },
      row_getCanExpand: { fn: (n) => mt(n) },
      row_getIsAllParentsExpanded: { fn: (n) => Ou(n) },
      row_getToggleExpandedHandler: { fn: (n) => Au(n) }
    });
  },
  constructTableAPIs: (e) => {
    wt("rowExpandingFeature", e, {
      table_autoResetExpanded: { fn: () => Wr(e) },
      table_setExpanded: { fn: (t) => Rn(e, t) },
      table_toggleAllRowsExpanded: { fn: (t) => Ur(e, t) },
      table_resetExpanded: { fn: (t) => Gr(e, t) },
      table_getCanSomeRowsExpand: { fn: () => qr(e) },
      table_getToggleAllRowsExpandedHandler: { fn: () => Iu(e) },
      table_getIsSomeRowsExpanded: { fn: () => Eu(e) },
      table_getIsAllRowsExpanded: { fn: () => zr(e) },
      table_getExpandedDepth: { fn: () => Pu(e) }
    });
  }
};
function If() {
  return X();
}
function Ot(e, t) {
  var n, s;
  (s = (n = e.options).onRowSelectionChange) == null || s.call(n, t);
}
function Ef(e, t) {
  e._lastSelectedRowId = null, Ot(e, t ? X() : Object.assign(X(), it(e.initialState.rowSelection ?? {})));
}
function Qr(e, t, n) {
  e._lastSelectedRowId = null, Ot(e, (s) => {
    if (t = typeof t < "u" ? t : !ae(e, "getIsAllRowsSelected", ni), n != null && n.deselectAll && !t) return X();
    const o = Object.assign(X(), s), r = e.getPreGroupedRowModel().flatRows;
    if (t) {
      const i = /* @__PURE__ */ new Map();
      r.forEach((l) => {
        Sn(l, i) && (o[l.id] = !0);
      });
    } else r.forEach((i) => {
      tt(i) && delete o[i.id];
    });
    return o;
  });
}
function ei(e, t, n) {
  e._lastSelectedRowId = null, Ot(e, (s) => {
    const o = typeof t < "u" ? t : !ae(e, "getIsAllPageRowsSelected", si);
    if (n != null && n.deselectAll && !o) return X();
    const r = Object.assign(X(), s);
    return e.getRowModel().rows.forEach((i) => {
      $n(r, i.id, o, !0, e, !0);
    }), r;
  });
}
function Pf(e) {
  return e.getCoreRowModel();
}
function Of(e) {
  const t = e.getCoreRowModel();
  return ae(e, "getIsSomeRowsSelected", Kn) ? js(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: X()
  };
}
function Af(e) {
  const t = e.getFilteredRowModel();
  return ae(e, "getIsSomeRowsSelected", Kn) ? js(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: X()
  };
}
function Ff(e) {
  const t = e.getSortedRowModel();
  return ae(e, "getIsSomeRowsSelected", Kn) ? js(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: X()
  };
}
function ti(e) {
  var t;
  return Object.keys(((t = e.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function ni(e) {
  var o;
  const t = e.getFilteredRowModel().flatRows, n = ((o = e.atoms.rowSelection) == null ? void 0 : o.get()) ?? {};
  let s = !!(t.length && Object.keys(n).length);
  if (s) {
    const r = /* @__PURE__ */ new Map();
    t.some((i) => !tn(i, n) && Sn(i, r)) && (s = !1);
  }
  return s;
}
function si(e) {
  var r;
  const t = e.getPaginatedRowModel().flatRows, n = ((r = e.atoms.rowSelection) == null ? void 0 : r.get()) ?? {}, s = /* @__PURE__ */ new Map();
  let o = !1;
  for (let i = 0; i < t.length; i++) {
    const l = t[i];
    if (tn(l, n))
      !o && Sn(l, s) && (o = !0);
    else if (Sn(l, s)) return !1;
  }
  return o;
}
function Kn(e) {
  return ae(e, "getSelectedRowIds", ti).length > 0;
}
function Tf(e) {
  return e.getPaginatedRowModel().flatRows.filter((t) => tt(t)).some((t) => Ds(t) || ae(t, "getIsSomeSelected", ri));
}
function Df(e) {
  return (t) => {
    Qr(e, t.target.checked);
  };
}
function Hf(e) {
  return (t) => {
    ei(e, t.target.checked);
  };
}
function oi(e, t, n) {
  const s = Ds(e);
  Ot(e.table, (o) => {
    t = typeof t < "u" ? t : !s;
    const r = Object.assign(X(), o);
    return $n(r, e.id, t, ((n == null ? void 0 : n.selectChildren) ?? !0) && gt(e), e.table), !t && (n != null && n.deselectParents) && ii(r, e), r;
  });
}
function Ds(e) {
  var t;
  return tn(e, ((t = e.table.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function ri(e) {
  return ks(e) === "some";
}
function jf(e) {
  return ks(e) === "all";
}
function tt(e) {
  const t = e.table.options;
  return typeof t.enableRowSelection == "function" ? t.enableRowSelection(e) : t.enableRowSelection ?? !0;
}
function Hs(e) {
  const t = e.table.options;
  return typeof t.enableSubRowSelection == "function" ? t.enableSubRowSelection(e) : t.enableSubRowSelection ?? !0;
}
function gt(e) {
  const t = e.table.options;
  return typeof t.enableMultiRowSelection == "function" ? t.enableMultiRowSelection(e) : t.enableMultiRowSelection ?? !0;
}
function kf(e, t) {
  const n = tt(e);
  return (s) => {
    var c, a;
    if (!n) return;
    const o = s, r = e.table, i = o.target.checked, l = r._lastSelectedRowId;
    (!(r.options.enableRowRangeSelection !== !1 && l !== null && gt(e) && (((a = (c = r.options).isRowRangeSelectionEvent) == null ? void 0 : a.call(c, s)) ?? !1)) || !Vf(e, l, i, t)) && oi(e, i, t), r._lastSelectedRowId = e.id;
  };
}
function Vf(e, t, n, s) {
  const o = (s == null ? void 0 : s.selectChildren) ?? !0, r = e.table, i = r.getRowsInDisplayOrder(), l = r.getPrePaginatedRowModel().rowsById[t] ?? r.getCoreRowModel().rowsById[t];
  if (!l) return !1;
  const c = l.getDisplayIndex(), a = e.getDisplayIndex(), f = i[c], p = i[a];
  if (c < 0 || a < 0 || c >= i.length || a >= i.length || (f == null ? void 0 : f.id) !== l.id || (p == null ? void 0 : p.id) !== e.id || !gt(l) || !gt(e)) return !1;
  const h = Math.min(c, a), v = Math.max(c, a);
  return Ot(r, (T) => {
    const E = Object.assign(X(), T);
    for (let U = h; U <= v; U++) {
      const K = i[U];
      !tt(K) || !gt(K) || ($n(E, K.id, n, o, r), !n && (s != null && s.deselectParents) && ii(E, K));
    }
    return E;
  }), !0;
}
function $n(e, t, n, s, o, r) {
  const i = o.getRow(t, !0);
  n ? (gt(i) || Object.keys(e).forEach((l) => delete e[l]), tt(i) && (e[t] = !0)) : (!r || tt(i)) && delete e[t], s && i.subRows.length && Hs(i) && i.subRows.forEach((l) => $n(e, l.id, n, s, o, r));
}
function Sn(e, t) {
  if (!tt(e)) return !1;
  const n = e.table;
  if (n.options.enableSubRowSelection === !0) return !0;
  const s = e.parentId;
  if (s === void 0) return !0;
  const o = t.get(s);
  if (o !== void 0) return o;
  const r = n.getCoreRowModel().rowsById, i = [];
  let l = !0, c = s;
  for (; c !== void 0; ) {
    const a = t.get(c);
    if (a !== void 0) {
      l = a;
      break;
    }
    i.push(c);
    const f = r[c] ?? n.getRow(c, !0);
    if (!Hs(f)) {
      l = !1;
      break;
    }
    c = f.parentId;
  }
  return i.forEach((a) => t.set(a, l)), l;
}
function ii(e, t) {
  const n = t.table.getCoreRowModel().rowsById;
  let s = t.parentId;
  for (; s !== void 0; )
    delete e[s], s = (n[s] ?? t.table.getRow(s, !0)).parentId;
}
function li(e, t, n, s) {
  const o = [];
  for (let r = 0; r < e.length; r++) {
    const i = e[r], l = tn(i, t);
    if (l && (n.push(i), s[i.id] = i), i.subRows.length) {
      const c = li(i.subRows, t, n, s);
      if (l) {
        const a = Object.create(Object.getPrototypeOf(i));
        Kc(a, i), a.subRows = c, o.push(a);
      }
    } else l && o.push(i);
  }
  return o;
}
function js(e, t) {
  var r;
  const n = [], s = X(), o = ((r = t.atoms.rowSelection) == null ? void 0 : r.get()) ?? {};
  return {
    rows: li(e.rows, o, n, s),
    flatRows: n,
    rowsById: s
  };
}
function tn(e, t) {
  return !!(Et(t, e.id) && t[e.id]);
}
function ks(e) {
  var r;
  if (!e.subRows.length) return !1;
  const t = ((r = e.table.atoms.rowSelection) == null ? void 0 : r.get()) ?? {};
  let n = !1, s = !0, o = !1;
  for (let i = 0; i < e.subRows.length; i++) {
    const l = e.subRows[i];
    if (n && !s) break;
    if (tt(l) && (o = !0, tn(l, t) ? n = !0 : s = !1), l.subRows.length) {
      const c = ks(l);
      c === "all" ? (n = !0, o = !0) : c === "some" ? (n = !0, s = !1, o = !0) : s = !1;
    }
  }
  return o ? s ? "all" : n ? "some" : !1 : !1;
}
const Kf = {
  initTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  resetTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  getInitialState: (e) => ({
    rowSelection: If(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onRowSelectionChange: Dr("rowSelection", e),
    enableRowSelection: !0,
    enableMultiRowSelection: !0,
    enableRowRangeSelection: !0,
    enableSubRowSelection: !0,
    isRowRangeSelectionEvent: (t) => {
      var s;
      const n = t;
      return !!(n.shiftKey || (s = n.nativeEvent) != null && s.shiftKey);
    }
  }),
  assignRowPrototype: (e, t) => {
    Pt("rowSelectionFeature", e, t, {
      row_toggleSelected: { fn: (n, s, o) => oi(n, s, o) },
      row_getIsSelected: { fn: (n) => Ds(n) },
      row_getIsSomeSelected: {
        fn: (n) => ri(n),
        memoDeps: (n) => {
          var s;
          return [
            n.subRows,
            (s = n.table.atoms.rowSelection) == null ? void 0 : s.get(),
            n.table.options.enableRowSelection
          ];
        }
      },
      row_getIsAllSubRowsSelected: {
        fn: (n) => jf(n),
        memoDeps: (n) => {
          var s;
          return [
            n.subRows,
            (s = n.table.atoms.rowSelection) == null ? void 0 : s.get(),
            n.table.options.enableRowSelection
          ];
        }
      },
      row_getCanSelect: { fn: (n) => tt(n) },
      row_getCanSelectSubRows: { fn: (n) => Hs(n) },
      row_getCanMultiSelect: { fn: (n) => gt(n) },
      row_getToggleSelectedHandler: { fn: (n, s) => kf(n, s) }
    });
  },
  constructTableAPIs: (e) => {
    wt("rowSelectionFeature", e, {
      table_setRowSelection: { fn: (t) => Ot(e, t) },
      table_resetRowSelection: { fn: (t) => Ef(e, t) },
      table_toggleAllRowsSelected: { fn: (t, n) => Qr(e, t, n) },
      table_toggleAllPageRowsSelected: { fn: (t, n) => ei(e, t, n) },
      table_getPreSelectedRowModel: { fn: () => Pf(e) },
      table_getSelectedRowModel: {
        fn: () => Of(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getCoreRowModel()];
        }
      },
      table_getFilteredSelectedRowModel: {
        fn: () => Af(e),
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
        fn: () => ti(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get()];
        }
      },
      table_getIsAllRowsSelected: {
        fn: () => ni(e),
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
        fn: () => si(e),
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
        fn: () => Kn(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get()];
        }
      },
      table_getIsSomePageRowsSelected: {
        fn: () => Tf(e),
        memoDeps: () => {
          var t;
          return [
            (t = e.atoms.rowSelection) == null ? void 0 : t.get(),
            e.getPaginatedRowModel(),
            e.options.enableRowSelection
          ];
        }
      },
      table_getToggleAllRowsSelectedHandler: { fn: () => Df(e) },
      table_getToggleAllPageRowsSelectedHandler: { fn: () => Hf(e) }
    });
  }
};
function $f() {
  return (e) => {
    const t = e;
    return kn({
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
      fn: () => Lf(t)
    });
  };
}
function Lf(e) {
  var s;
  const t = e.getPreExpandedRowModel(), n = (s = e.atoms.expanded) == null ? void 0 : s.get();
  return !t.rows.length || n !== !0 && !Object.keys(n ?? {}).length || !e.options.paginateExpandedRows && !e.options.manualPagination ? t : Nf(t);
}
function Nf(e) {
  const t = [], n = (s) => {
    t.push(s), s.subRows.length && Vn(s) && s.subRows.forEach(n);
  };
  return e.rows.forEach(n), {
    rows: t,
    flatRows: e.flatRows,
    rowsById: e.rowsById
  };
}
function vo(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = xt(e[n]);
  return hs(e, t);
}
function Bf(e) {
  return Object.keys(e).map((t) => xt(e[t]));
}
function Wf(e) {
  const t = (l, c) => {
    l.setOptions((a) => yo(a, vo(c)));
  }, n = Vc(), s = hs(e, { features: {
    coreReactivityFeature: n,
    ...xt(e.features) ?? {}
  } }), o = hs(vo(s), { mergeOptions: (l, c) => yo(l, c) }), r = Cf(o), i = r;
  return Do() && Ri(() => {
    var l;
    return (l = n.unmount) == null ? void 0 : l.call(n);
  }), We(() => Bf(s), () => {
    t(r, s);
  }, { immediate: !0 }), We(() => {
    const l = xt(e.state), c = xt(e.atoms);
    if (!l) return [];
    const a = [];
    for (const f of Object.keys(i.initialState))
      !(f in l) || (c == null ? void 0 : c[f]) !== void 0 || a.push(l[f]);
    return a;
  }, (l) => {
    l.length > 0 && t(r, s);
  }, { immediate: !0 }), i.Subscribe = (l) => l.children(i.atoms), i;
}
const Uf = { class: "pnl-tst" }, Gf = {
  key: 0,
  class: "pnl-tst-empty"
}, qf = ["aria-label", "aria-colcount", "aria-rowcount"], zf = {
  key: 0,
  class: "pnl-tst-head",
  role: "rowgroup"
}, Jf = {
  class: "pnl-tst-hrow",
  role: "row",
  "aria-rowindex": 1
}, Yf = ["aria-colindex"], Xf = {
  class: "pnl-tst-body",
  role: "rowgroup"
}, Zf = ["aria-level", "aria-posinset", "aria-setsize", "aria-rowindex", "aria-expanded", "aria-selected", "tabindex", "onClick", "onFocus"], Qf = ["aria-colindex"], ea = ["onClick"], ta = {
  key: 1,
  class: "pnl-tst-twisty pnl-tst-twisty--leaf",
  "aria-hidden": "true"
}, na = ["checked", ".indeterminate", "aria-label", "onClick"], sa = { class: "pnl-tst-value" }, oa = "title", ra = {
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
      rowExpandingFeature: Mf,
      rowSelectionFeature: Kf,
      coreRowModel: Yr(),
      expandedRowModel: $f()
    }, s = fe(() => (t.state.columns || []).length > 0), o = fe(() => {
      const b = t.state.columns || [];
      return b.length === 0 ? [{ id: oa, header: "", accessorFn: (F) => F.title }] : b.map((F) => {
        const D = F.field ?? F.id;
        return {
          id: F.id,
          header: F.header ?? F.id,
          accessorFn: (L) => L[D],
          meta: { width: F.width }
        };
      });
    }), r = /* @__PURE__ */ Jn(i(t.state.expandedKeys));
    function i(b) {
      const F = {};
      for (const D of b || []) F[D] = !0;
      return F;
    }
    function l(b) {
      return b === !0 ? [] : Object.keys(b).filter((F) => b[F]).sort();
    }
    function c(b, F) {
      return b.length !== F.length ? !1 : b.every((D, L) => D === F[L]);
    }
    const a = fe(() => t.state.options.select_mode ?? "none"), f = fe(() => a.value !== "none"), p = fe(() => a.value === "hierarchy"), h = /* @__PURE__ */ Jn(i(t.state.selectedKeys)), v = Wf({
      features: n,
      data: fe(() => t.state.source || []),
      columns: o,
      getRowId: (b) => b.key,
      getSubRows: (b) => b.children,
      enableRowSelection: f,
      enableMultiRowSelection: fe(() => a.value !== "single"),
      enableSubRowSelection: p,
      state: fe(() => ({ expanded: r.value, rowSelection: h.value })),
      onExpandedChange: (b) => {
        r.value = typeof b == "function" ? b(r.value) : b, t.setExpandedKeys(l(r.value));
      },
      onRowSelectionChange: (b) => {
        h.value = typeof b == "function" ? b(h.value) : b, t.setSelectedKeys(l(h.value));
      }
    });
    We(
      () => t.state.expandedKeys,
      (b) => {
        c(l(r.value), [...b || []].sort()) || (r.value = i(b));
      }
    ), We(
      () => t.state.selectedKeys,
      (b) => {
        c(l(h.value), [...b || []].sort()) || (h.value = i(b));
      }
    ), We(
      () => [t.state.options.expand_all, t.state.source],
      ([b]) => {
        b && v.toggleAllRowsExpanded(!0);
      },
      { immediate: !0 }
    );
    const T = fe(() => v.getRowModel().rows), E = fe(() => {
      var b;
      return ((b = v.getHeaderGroups()[0]) == null ? void 0 : b.headers) ?? [];
    }), U = fe(() => t.state.options.indent_px ?? 16), K = fe(() => t.state.options.aria_label ?? "Tree table"), M = fe(() => s.value ? 2 : 1), V = fe(() => T.value.length + (s.value ? 1 : 0));
    function I(b) {
      const F = b.getParentRow();
      return F ? F.subRows.length : v.getCoreRowModel().rows.length;
    }
    function G(b) {
      var D;
      const F = (D = b.meta) == null ? void 0 : D.width;
      return F ? { flex: `0 0 ${F}px` } : { flex: "1 1 0" };
    }
    function he(b, F) {
      return { ...G(F), paddingInlineStart: `${b.depth * U.value}px` };
    }
    const se = /* @__PURE__ */ Jn(null), N = /* @__PURE__ */ new Map();
    function A(b, F) {
      F ? N.set(b, F) : N.delete(b);
    }
    const te = fe(() => {
      const b = T.value;
      return b.length === 0 ? null : b.some((F) => F.id === se.value) ? se.value : b[0].id;
    });
    function re(b) {
      b != null && (se.value = b, Zo(() => {
        var F;
        return (F = N.get(b)) == null ? void 0 : F.focus();
      }));
    }
    function le(b) {
      const F = T.value;
      F.length !== 0 && re(F[Math.max(0, Math.min(b, F.length - 1))].id);
    }
    function Me(b) {
      const F = T.value;
      if (F.length === 0) return;
      const D = Math.max(
        0,
        F.findIndex((Se) => Se.id === te.value)
      ), L = F[D];
      switch (b.key) {
        case "ArrowDown":
          b.preventDefault(), le(D + 1);
          break;
        case "ArrowUp":
          b.preventDefault(), le(D - 1);
          break;
        case "ArrowRight":
          if (b.preventDefault(), !L.getCanExpand()) break;
          L.getIsExpanded() ? le(D + 1) : (L.toggleExpanded(!0), re(L.id));
          break;
        case "ArrowLeft":
          b.preventDefault(), L.getCanExpand() && L.getIsExpanded() ? (L.toggleExpanded(!1), re(L.id)) : L.parentId && re(L.parentId);
          break;
        case "Home":
          b.preventDefault(), le(0);
          break;
        case "End":
          b.preventDefault(), le(F.length - 1);
          break;
        case "Enter":
          b.preventDefault(), t.emitEvent("activate", { key: L.id });
          break;
        case " ":
          if (!f.value) break;
          b.preventDefault(), Z(L);
          break;
      }
    }
    function Te(b) {
      se.value = b.id, t.emitEvent("activate", { key: b.id });
    }
    function Ee(b) {
      se.value = b.id, b.toggleExpanded();
    }
    function ce(b) {
      return !b.getIsSelected() && b.getIsSomeSelected();
    }
    function Z(b) {
      se.value = b.id, b.toggleSelected(void 0, {
        selectChildren: p.value,
        deselectParents: p.value
      });
    }
    function q(b) {
      Z(b), re(b.id);
    }
    return (b, F) => (_e(), be("div", Uf, [
      T.value.length === 0 ? (_e(), be("div", Gf, "No data")) : (_e(), be("div", {
        key: 1,
        class: "pnl-tst-grid",
        role: "treegrid",
        "aria-label": K.value,
        "aria-colcount": E.value.length,
        "aria-rowcount": V.value,
        onKeydown: Me
      }, [
        s.value ? (_e(), be("div", zf, [
          ft("div", Jf, [
            (_e(!0), be(ve, null, Xn(E.value, (D, L) => (_e(), be("div", {
              key: D.id,
              class: "pnl-tst-hcell",
              role: "columnheader",
              "aria-colindex": L + 1,
              style: Wt(G(D.column.columnDef))
            }, os(D.column.columnDef.header), 13, Yf))), 128))
          ])
        ])) : ts("", !0),
        ft("div", Xf, [
          (_e(!0), be(ve, null, Xn(T.value, (D, L) => (_e(), be("div", {
            key: D.id,
            ref_for: !0,
            ref: (Se) => A(D.id, Se),
            class: "pnl-tst-row",
            role: "row",
            "aria-level": D.depth + 1,
            "aria-posinset": D.index + 1,
            "aria-setsize": I(D),
            "aria-rowindex": L + M.value,
            "aria-expanded": D.getCanExpand() ? D.getIsExpanded() : void 0,
            "aria-selected": f.value ? D.getIsSelected() : void 0,
            tabindex: D.id === te.value ? 0 : -1,
            onClick: (Se) => Te(D),
            onFocus: (Se) => se.value = D.id
          }, [
            (_e(!0), be(ve, null, Xn(D.getAllCells(), (Se, yt) => (_e(), be("div", {
              key: Se.id,
              class: Ut(["pnl-tst-cell", { "pnl-tst-cell--tree": yt === 0 }]),
              role: "gridcell",
              "aria-colindex": yt + 1,
              style: Wt(
                yt === 0 ? he(D, Se.column.columnDef) : G(Se.column.columnDef)
              )
            }, [
              yt === 0 ? (_e(), be(ve, { key: 0 }, [
                D.getCanExpand() ? (_e(), be("span", {
                  key: 0,
                  class: Ut(["pnl-tst-twisty", { "pnl-tst-twisty--open": D.getIsExpanded() }]),
                  "aria-hidden": "true",
                  onClick: _o((Ln) => Ee(D), ["stop"])
                }, [...F[0] || (F[0] = [
                  ft("svg", {
                    viewBox: "0 0 16 16",
                    width: "12",
                    height: "12",
                    focusable: "false"
                  }, [
                    ft("path", {
                      d: "M6 3.5 10.5 8 6 12.5",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "1.6"
                    })
                  ], -1)
                ])], 10, ea)) : (_e(), be("span", ta)),
                f.value ? (_e(), be("input", {
                  key: 2,
                  class: "pnl-tst-check",
                  type: "checkbox",
                  tabindex: "-1",
                  checked: D.getIsSelected(),
                  ".indeterminate": ce(D),
                  "aria-label": `Select ${D.original.title ?? D.id}`,
                  onClick: _o((Ln) => q(D), ["stop"])
                }, null, 40, na)) : ts("", !0)
              ], 64)) : ts("", !0),
              ft("span", sa, os(Se.getValue()), 1)
            ], 14, Qf))), 128))
          ], 40, Zf))), 128))
        ])
      ], 40, qf))
    ]));
  }
};
function la({ model: e, el: t }) {
  t.style.display = "block", t.style.width = "100%";
  const n = document.createElement("div");
  n.className = "pnl-tst-root", t.append(n);
  const s = /* @__PURE__ */ Pn({
    source: e.get("source") || [],
    columns: e.get("columns") || [],
    options: e.get("options") || {},
    expandedKeys: e.get("expanded_keys") || [],
    selectedKeys: e.get("selected_keys") || []
  }), o = (f, p) => {
    e.set("_event_data", {
      event_name: f,
      event_params: p,
      timestamp: Date.now()
    }), e.save_changes();
  }, r = (f, p) => f.length === p.length && f.every((h, v) => h === p[v]), i = (f) => (p) => {
    const h = [...e.get(f) || []].sort();
    r(h, p) || (e.set(f, p), e.save_changes());
  }, l = i("expanded_keys"), c = i("selected_keys"), a = Ac(ra, { state: s, emitEvent: o, setExpandedKeys: l, setSelectedKeys: c });
  return a.mount(n), e.on("change:source", () => {
    s.source = e.get("source") || [];
  }), e.on("change:columns", () => {
    s.columns = e.get("columns") || [];
  }), e.on("change:options", () => {
    s.options = e.get("options") || {};
  }), e.on("change:expanded_keys", () => {
    s.expandedKeys = e.get("expanded_keys") || [];
  }), e.on("change:selected_keys", () => {
    s.selectedKeys = e.get("selected_keys") || [];
  }), () => {
    a.unmount();
  };
}
export {
  la as render
};

/**
* @vue/shared v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function jo(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const ae = {}, Qt = [], nt = () => {
}, hi = () => !1, _r = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), xr = (e) => e.startsWith("onUpdate:"), Me = Object.assign, Lo = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Oa = Object.prototype.hasOwnProperty, ee = (e, t) => Oa.call(e, t), N = Array.isArray, Mt = (e) => kn(e) === "[object Map]", ur = (e) => kn(e) === "[object Set]", ms = (e) => kn(e) === "[object Date]", U = (e) => typeof e == "function", ge = (e) => typeof e == "string", rt = (e) => typeof e == "symbol", re = (e) => e !== null && typeof e == "object", vi = (e) => (re(e) || U(e)) && U(e.then) && U(e.catch), mi = Object.prototype.toString, kn = (e) => mi.call(e), Pa = (e) => kn(e).slice(8, -1), yi = (e) => kn(e) === "[object Object]", Ko = (e) => ge(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, wn = /* @__PURE__ */ jo(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Sr = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Ta = /-\w/g, We = Sr(
  (e) => e.replace(Ta, (t) => t.slice(1).toUpperCase())
), Da = /\B([A-Z])/g, $t = Sr(
  (e) => e.replace(Da, "-$1").toLowerCase()
), wi = Sr((e) => e.charAt(0).toUpperCase() + e.slice(1)), Qr = Sr(
  (e) => e ? `on${wi(e)}` : ""
), et = (e, t) => !Object.is(e, t), eo = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, bi = (e, t, n, r = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: r,
    value: n
  });
}, ka = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let ys;
const Rr = () => ys || (ys = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function en(e) {
  if (N(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], o = ge(r) ? La(r) : en(r);
      if (o)
        for (const s in o)
          t[s] = o[s];
    }
    return t;
  } else if (ge(e) || re(e))
    return e;
}
const Fa = /;(?![^(]*\))/g, Ha = /:([^]+)/, ja = /\/\*[^]*?\*\//g;
function La(e) {
  const t = {};
  return e.replace(ja, "").split(Fa).forEach((n) => {
    if (n) {
      const r = n.split(Ha);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function Dt(e) {
  let t = "";
  if (ge(e))
    t = e;
  else if (N(e))
    for (let n = 0; n < e.length; n++) {
      const r = Dt(e[n]);
      r && (t += r + " ");
    }
  else if (re(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Ka = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Va = /* @__PURE__ */ jo(Ka);
function _i(e) {
  return !!e || e === "";
}
function Ba(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let r = 0; n && r < e.length; r++)
    n = Cr(e[r], t[r]);
  return n;
}
function ws(e, t) {
  if (e.size !== t.size) return !1;
  const n = Array.from(t), r = new Uint8Array(n.length);
  for (const o of e) {
    let s = -1;
    for (let i = 0; i < n.length; i++)
      if (!r[i] && Cr(o, n[i])) {
        s = i;
        break;
      }
    if (s < 0) return !1;
    r[s] = 1;
  }
  return !0;
}
function Cr(e, t) {
  if (e === t) return !0;
  let n = ms(e), r = ms(t);
  if (n || r)
    return n && r ? e.getTime() === t.getTime() : !1;
  if (n = rt(e), r = rt(t), n || r)
    return e === t;
  if (n = N(e), r = N(t), n || r)
    return n && r ? Ba(e, t) : !1;
  if (n = re(e), r = re(t), n || r) {
    if (!n || !r)
      return !1;
    if (n = Mt(e), r = Mt(t), n || r || (n = ur(e), r = ur(t), n || r))
      return n && r ? ws(e, t) : !1;
    const o = Object.keys(e).length, s = Object.keys(t).length;
    if (o !== s)
      return !1;
    for (const i in e) {
      const l = e.hasOwnProperty(i), a = t.hasOwnProperty(i);
      if (l && !a || !l && a || !Cr(e[i], t[i]))
        return !1;
    }
  }
  return String(e) === String(t);
}
const xi = (e) => !!(e && e.__v_isRef === !0), Xt = (e) => ge(e) ? e : e == null ? "" : N(e) || re(e) && (e.toString === mi || !U(e.toString)) ? xi(e) ? Xt(e.value) : JSON.stringify(e, Si, 2) : String(e), Si = (e, t) => xi(t) ? Si(e, t.value) : Mt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [r, o], s) => (n[to(r, s) + " =>"] = o, n),
    {}
  )
} : ur(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => to(n))
} : rt(t) ? to(t) : re(t) && !N(t) && !yi(t) ? String(t) : t, to = (e, t = "") => {
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
let ye;
class $a {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && ye && (ye.active ? (this.parent = ye, this.index = (ye.scopes || (ye.scopes = [])).push(
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
      const n = ye;
      try {
        return ye = this, t();
      } finally {
        ye = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = ye, ye = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (ye === this)
        ye = this.prevScope;
      else {
        let t = ye;
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
function Ri() {
  return ye;
}
function Na(e, t = !1) {
  ye && ye.cleanups.push(e);
}
let le;
const no = /* @__PURE__ */ new WeakSet();
class Ci {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, ye && (ye.active ? ye.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, no.has(this) && (no.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ii(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, bs(this), Ei(this);
    const t = le, n = Ue;
    le = this, Ue = !0;
    try {
      return this.fn();
    } finally {
      Ai(this), le = t, Ue = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        $o(t);
      this.deps = this.depsTail = void 0, bs(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? no.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    yo(this) && this.run();
  }
  get dirty() {
    return yo(this);
  }
}
let Mi = 0, bn, _n;
function Ii(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = _n, _n = e;
    return;
  }
  e.next = bn, bn = e;
}
function Vo() {
  Mi++;
}
function Bo() {
  if (--Mi > 0)
    return;
  if (_n) {
    let t = _n;
    for (_n = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; bn; ) {
    let t = bn;
    for (bn = void 0; t; ) {
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
function Ei(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Ai(e) {
  let t, n = e.depsTail, r = n;
  for (; r; ) {
    const o = r.prevDep;
    r.version === -1 ? (r === n && (n = o), $o(r), Wa(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = o;
  }
  e.deps = t, e.depsTail = n;
}
function yo(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Oi(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Oi(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Mn) || (e.globalVersion = Mn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !yo(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = le, r = Ue;
  le = e, Ue = !0;
  try {
    Ei(e);
    const o = e.fn(e._value);
    (t.version === 0 || et(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    le = n, Ue = r, Ai(e), e.flags &= -3;
  }
}
function $o(e, t = !1) {
  const { dep: n, prevSub: r, nextSub: o } = e;
  if (r && (r.nextSub = o, e.prevSub = void 0), o && (o.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
    n.computed.flags &= -5;
    for (let s = n.computed.deps; s; s = s.nextDep)
      $o(s, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Wa(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let Ue = !0;
const Pi = [];
function ut() {
  Pi.push(Ue), Ue = !1;
}
function ft() {
  const e = Pi.pop();
  Ue = e === void 0 ? !0 : e;
}
function bs(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = le;
    le = void 0;
    try {
      t();
    } finally {
      le = n;
    }
  }
}
let Mn = 0;
class Ua {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class No {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!le || !Ue || le === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== le)
      n = this.activeLink = new Ua(le, this), le.deps ? (n.prevDep = le.depsTail, le.depsTail.nextDep = n, le.depsTail = n) : le.deps = le.depsTail = n, Ti(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const r = n.nextDep;
      r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = le.depsTail, n.nextDep = void 0, le.depsTail.nextDep = n, le.depsTail = n, le.deps === n && (le.deps = r);
    }
    return n;
  }
  trigger(t) {
    this.version++, Mn++, this.notify(t);
  }
  notify(t) {
    Vo();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Bo();
    }
  }
}
function Ti(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let r = t.deps; r; r = r.nextDep)
        Ti(r);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const wo = /* @__PURE__ */ new WeakMap(), kt = /* @__PURE__ */ Symbol(
  ""
), bo = /* @__PURE__ */ Symbol(
  ""
), In = /* @__PURE__ */ Symbol(
  ""
);
function Re(e, t, n) {
  if (Ue && le) {
    let r = wo.get(e);
    r || wo.set(e, r = /* @__PURE__ */ new Map());
    let o = r.get(n);
    o || (r.set(n, o = new No()), o.map = r, o.key = n), o.track();
  }
}
function at(e, t, n, r, o, s) {
  const i = wo.get(e);
  if (!i) {
    Mn++;
    return;
  }
  const l = (a) => {
    a && a.trigger();
  };
  if (Vo(), t === "clear")
    i.forEach(l);
  else {
    const a = N(e), u = a && Ko(n);
    if (a && n === "length") {
      const d = Number(r);
      i.forEach((h, w) => {
        (w === "length" || w === In || !rt(w) && w >= d) && l(h);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && l(i.get(n)), u && l(i.get(In)), t) {
        case "add":
          a ? u && l(i.get("length")) : (l(i.get(kt)), Mt(e) && l(i.get(bo)));
          break;
        case "delete":
          a || (l(i.get(kt)), Mt(e) && l(i.get(bo)));
          break;
        case "set":
          Mt(e) && l(i.get(kt));
          break;
      }
  }
  Bo();
}
function Yt(e) {
  const t = /* @__PURE__ */ Q(e);
  return t === e ? t : (Re(t, "iterate", In), /* @__PURE__ */ $e(e) ? t : t.map(qe));
}
function Mr(e) {
  return Re(e = /* @__PURE__ */ Q(e), "iterate", In), e;
}
function Ze(e, t) {
  return /* @__PURE__ */ dt(e) ? rn(/* @__PURE__ */ Ft(e) ? qe(t) : t) : qe(t);
}
const qa = {
  __proto__: null,
  [Symbol.iterator]() {
    return ro(this, Symbol.iterator, (e) => Ze(this, e));
  },
  concat(...e) {
    return Yt(this).concat(
      ...e.map((t) => N(t) ? Yt(t) : t)
    );
  },
  entries() {
    return ro(this, "entries", (e) => (e[1] = Ze(this, e[1]), e));
  },
  every(e, t) {
    return st(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return st(
      this,
      "filter",
      e,
      t,
      (n) => n.map((r) => Ze(this, r)),
      arguments
    );
  },
  find(e, t) {
    return st(
      this,
      "find",
      e,
      t,
      (n) => Ze(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return st(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return st(
      this,
      "findLast",
      e,
      t,
      (n) => Ze(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return st(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return st(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return oo(this, "includes", e);
  },
  indexOf(...e) {
    return oo(this, "indexOf", e);
  },
  join(e) {
    return Yt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return oo(this, "lastIndexOf", e);
  },
  map(e, t) {
    return st(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return gn(this, "pop");
  },
  push(...e) {
    return gn(this, "push", e);
  },
  reduce(e, ...t) {
    return _s(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return _s(this, "reduceRight", e, t);
  },
  shift() {
    return gn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return st(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return gn(this, "splice", e);
  },
  toReversed() {
    return Yt(this).toReversed();
  },
  toSorted(e) {
    return Yt(this).toSorted(e);
  },
  toSpliced(...e) {
    return Yt(this).toSpliced(...e);
  },
  unshift(...e) {
    return gn(this, "unshift", e);
  },
  values() {
    return ro(this, "values", (e) => Ze(this, e));
  }
};
function ro(e, t, n) {
  const r = Mr(e), o = r[t]();
  return r !== e && !/* @__PURE__ */ $e(e) && (o._next = o.next, o.next = () => {
    const s = o._next();
    return s.done || (s.value = n(s.value)), s;
  }), o;
}
const za = Array.prototype;
function st(e, t, n, r, o, s) {
  const i = Mr(e), l = i !== e && !/* @__PURE__ */ $e(e), a = i[t];
  if (a !== za[t]) {
    const h = a.apply(e, s);
    return l ? qe(h) : h;
  }
  let u = n;
  i !== e && (l ? u = function(h, w) {
    return n.call(this, Ze(e, h), w, e);
  } : n.length > 2 && (u = function(h, w) {
    return n.call(this, h, w, e);
  }));
  const d = a.call(i, u, r);
  return l && o ? o(d) : d;
}
function _s(e, t, n, r) {
  const o = Mr(e), s = o !== e && !/* @__PURE__ */ $e(e);
  let i = n, l = !1;
  o !== e && (s ? (l = r.length === 0, i = function(u, d, h) {
    return l && (l = !1, u = Ze(e, u)), n.call(this, u, Ze(e, d), h, e);
  }) : n.length > 3 && (i = function(u, d, h) {
    return n.call(this, u, d, h, e);
  }));
  const a = o[t](i, ...r);
  return l ? Ze(e, a) : a;
}
function oo(e, t, n) {
  const r = /* @__PURE__ */ Q(e);
  Re(r, "iterate", In);
  const o = r[t](...n);
  return (o === -1 || o === !1) && /* @__PURE__ */ qo(n[0]) ? (n[0] = /* @__PURE__ */ Q(n[0]), r[t](...n)) : o;
}
function gn(e, t, n = []) {
  ut(), Vo();
  const r = (/* @__PURE__ */ Q(e))[t].apply(e, n);
  return Bo(), ft(), r;
}
const Ga = /* @__PURE__ */ jo("__proto__,__v_isRef,__isVue"), Di = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(rt)
);
function Ya(e) {
  rt(e) || (e = String(e));
  const t = /* @__PURE__ */ Q(this);
  return Re(t, "has", e), t.hasOwnProperty(e);
}
class ki {
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
      return r === (o ? s ? sc : Li : s ? ji : Hi).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const i = N(t);
    if (!o) {
      let a;
      if (i && (a = qa[n]))
        return a;
      if (n === "hasOwnProperty")
        return Ya;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ Ce(t) ? t : r
    );
    if ((rt(n) ? Di.has(n) : Ga(n)) || (o || Re(t, "get", n), s))
      return l;
    if (/* @__PURE__ */ Ce(l)) {
      const a = i && Ko(n) ? l : l.value;
      return o && re(a) ? /* @__PURE__ */ xo(a) : a;
    }
    return re(l) ? o ? /* @__PURE__ */ xo(l) : /* @__PURE__ */ Ir(l) : l;
  }
}
class Fi extends ki {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, o) {
    let s = t[n];
    const i = N(t) && Ko(n);
    if (!this._isShallow) {
      const u = /* @__PURE__ */ dt(s);
      if (!/* @__PURE__ */ $e(r) && !/* @__PURE__ */ dt(r) && (s = /* @__PURE__ */ Q(s), r = /* @__PURE__ */ Q(r)), !i && /* @__PURE__ */ Ce(s) && !/* @__PURE__ */ Ce(r))
        return u || (s.value = r), !0;
    }
    const l = i ? Number(n) < t.length : ee(t, n), a = Reflect.set(
      t,
      n,
      r,
      /* @__PURE__ */ Ce(t) ? t : o
    );
    return t === /* @__PURE__ */ Q(o) && a && (l ? et(r, s) && at(t, "set", n, r) : at(t, "add", n, r)), a;
  }
  deleteProperty(t, n) {
    const r = ee(t, n);
    t[n];
    const o = Reflect.deleteProperty(t, n);
    return o && r && at(t, "delete", n, void 0), o;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!rt(n) || !Di.has(n)) && Re(t, "has", n), r;
  }
  ownKeys(t) {
    return Re(
      t,
      "iterate",
      N(t) ? "length" : kt
    ), Reflect.ownKeys(t);
  }
}
class Xa extends ki {
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
const Ja = /* @__PURE__ */ new Fi(), Za = /* @__PURE__ */ new Xa(), Qa = /* @__PURE__ */ new Fi(!0);
const _o = (e) => e, Xn = (e) => Reflect.getPrototypeOf(e);
function ec(e, t, n) {
  return function(...r) {
    const o = this.__v_raw, s = /* @__PURE__ */ Q(o), i = Mt(s), l = e === "entries" || e === Symbol.iterator && i, a = e === "keys" && i, u = o[e](...r), d = n ? _o : t ? rn : qe;
    return !t && Re(
      s,
      "iterate",
      a ? bo : kt
    ), Me(
      // inheriting all iterator properties
      Object.create(u),
      {
        // iterator protocol
        next() {
          const { value: h, done: w } = u.next();
          return w ? { value: h, done: w } : {
            value: l ? [d(h[0]), d(h[1])] : d(h),
            done: w
          };
        }
      }
    );
  };
}
function Jn(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function tc(e, t) {
  const n = {
    get(o) {
      const s = this.__v_raw, i = /* @__PURE__ */ Q(s), l = /* @__PURE__ */ Q(o);
      e || (et(o, l) && Re(i, "get", o), Re(i, "get", l));
      const { has: a } = Xn(i), u = t ? _o : e ? rn : qe;
      if (a.call(i, o))
        return u(s.get(o));
      if (a.call(i, l))
        return u(s.get(l));
      s !== i && s.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && Re(/* @__PURE__ */ Q(o), "iterate", kt), o.size;
    },
    has(o) {
      const s = this.__v_raw, i = /* @__PURE__ */ Q(s), l = /* @__PURE__ */ Q(o);
      return e || (et(o, l) && Re(i, "has", o), Re(i, "has", l)), o === l ? s.has(o) : s.has(o) || s.has(l);
    },
    forEach(o, s) {
      const i = this, l = i.__v_raw, a = /* @__PURE__ */ Q(l), u = t ? _o : e ? rn : qe;
      return !e && Re(a, "iterate", kt), l.forEach((d, h) => o.call(s, u(d), u(h), i));
    }
  };
  return Me(
    n,
    e ? {
      add: Jn("add"),
      set: Jn("set"),
      delete: Jn("delete"),
      clear: Jn("clear")
    } : {
      add(o) {
        const s = /* @__PURE__ */ Q(this), i = Xn(s), l = /* @__PURE__ */ Q(o), a = !t && !/* @__PURE__ */ $e(o) && !/* @__PURE__ */ dt(o) ? l : o;
        return i.has.call(s, a) || et(o, a) && i.has.call(s, o) || et(l, a) && i.has.call(s, l) || (s.add(a), at(s, "add", a, a)), this;
      },
      set(o, s) {
        !t && !/* @__PURE__ */ $e(s) && !/* @__PURE__ */ dt(s) && (s = /* @__PURE__ */ Q(s));
        const i = /* @__PURE__ */ Q(this), { has: l, get: a } = Xn(i);
        let u = l.call(i, o);
        u || (o = /* @__PURE__ */ Q(o), u = l.call(i, o));
        const d = a.call(i, o);
        return i.set(o, s), u ? et(s, d) && at(i, "set", o, s) : at(i, "add", o, s), this;
      },
      delete(o) {
        const s = /* @__PURE__ */ Q(this), { has: i, get: l } = Xn(s);
        let a = i.call(s, o);
        a || (o = /* @__PURE__ */ Q(o), a = i.call(s, o)), l && l.call(s, o);
        const u = s.delete(o);
        return a && at(s, "delete", o, void 0), u;
      },
      clear() {
        const o = /* @__PURE__ */ Q(this), s = o.size !== 0, i = o.clear();
        return s && at(
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
    n[o] = ec(o, e, t);
  }), n;
}
function Wo(e, t) {
  const n = tc(e, t);
  return (r, o, s) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(
    ee(n, o) && o in r ? n : r,
    o,
    s
  );
}
const nc = {
  get: /* @__PURE__ */ Wo(!1, !1)
}, rc = {
  get: /* @__PURE__ */ Wo(!1, !0)
}, oc = {
  get: /* @__PURE__ */ Wo(!0, !1)
};
const Hi = /* @__PURE__ */ new WeakMap(), ji = /* @__PURE__ */ new WeakMap(), Li = /* @__PURE__ */ new WeakMap(), sc = /* @__PURE__ */ new WeakMap();
function ic(e) {
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
function Ir(e) {
  return /* @__PURE__ */ dt(e) ? e : Uo(
    e,
    !1,
    Ja,
    nc,
    Hi
  );
}
// @__NO_SIDE_EFFECTS__
function lc(e) {
  return Uo(
    e,
    !1,
    Qa,
    rc,
    ji
  );
}
// @__NO_SIDE_EFFECTS__
function xo(e) {
  return Uo(
    e,
    !0,
    Za,
    oc,
    Li
  );
}
function Uo(e, t, n, r, o) {
  if (!re(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const s = o.get(e);
  if (s)
    return s;
  const i = ic(Pa(e));
  if (i === 0)
    return e;
  const l = new Proxy(
    e,
    i === 2 ? r : n
  );
  return o.set(e, l), l;
}
// @__NO_SIDE_EFFECTS__
function Ft(e) {
  return /* @__PURE__ */ dt(e) ? /* @__PURE__ */ Ft(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function dt(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function $e(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function qo(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function Q(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ Q(t) : e;
}
function ac(e) {
  return !ee(e, "__v_skip") && Object.isExtensible(e) && bi(e, "__v_skip", !0), e;
}
const qe = (e) => re(e) ? /* @__PURE__ */ Ir(e) : e, rn = (e) => re(e) ? /* @__PURE__ */ xo(e) : e;
// @__NO_SIDE_EFFECTS__
function Ce(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function be(e) {
  return Ki(e, !1);
}
// @__NO_SIDE_EFFECTS__
function cc(e) {
  return Ki(e, !0);
}
function Ki(e, t) {
  return /* @__PURE__ */ Ce(e) ? e : new uc(e, t);
}
class uc {
  constructor(t, n) {
    this.dep = new No(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ Q(t), this._value = n ? t : qe(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, r = this.__v_isShallow || /* @__PURE__ */ $e(t) || /* @__PURE__ */ dt(t);
    t = r ? t : /* @__PURE__ */ Q(t), et(t, n) && (this._rawValue = t, this._value = r ? t : qe(t), this.dep.trigger());
  }
}
function Ht(e) {
  return /* @__PURE__ */ Ce(e) ? e.value : e;
}
const fc = {
  get: (e, t, n) => t === "__v_raw" ? e : Ht(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return /* @__PURE__ */ Ce(o) && !/* @__PURE__ */ Ce(n) ? (o.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function Vi(e) {
  return /* @__PURE__ */ Ft(e) ? e : new Proxy(e, fc);
}
class dc {
  constructor(t, n, r) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new No(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Mn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    le !== this)
      return Ii(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Oi(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function pc(e, t, n = !1) {
  let r, o;
  return U(e) ? r = e : (r = e.get, o = e.set), new dc(r, o, n);
}
const Zn = {}, fr = /* @__PURE__ */ new WeakMap();
let Tt;
function gc(e, t = !1, n = Tt) {
  if (n) {
    let r = fr.get(n);
    r || fr.set(n, r = []), r.push(e);
  }
}
function hc(e, t, n = ae) {
  const { immediate: r, deep: o, once: s, scheduler: i, augmentJob: l, call: a } = n, u = (E) => o ? E : /* @__PURE__ */ $e(E) || o === !1 || o === 0 ? Ct(E, 1) : Ct(E);
  let d, h, w, y, I = !1, C = !1;
  if (/* @__PURE__ */ Ce(e) ? (h = () => e.value, I = /* @__PURE__ */ $e(e)) : /* @__PURE__ */ Ft(e) ? (h = () => u(e), I = !0) : N(e) ? (C = !0, I = e.some((E) => /* @__PURE__ */ Ft(E) || /* @__PURE__ */ $e(E)), h = () => e.map((E) => {
    if (/* @__PURE__ */ Ce(E))
      return E.value;
    if (/* @__PURE__ */ Ft(E))
      return u(E);
    if (U(E))
      return a ? a(E, 2) : E();
  })) : U(e) ? t ? h = a ? () => a(e, 2) : e : h = () => {
    if (w) {
      ut();
      try {
        w();
      } finally {
        ft();
      }
    }
    const E = Tt;
    Tt = d;
    try {
      return a ? a(e, 3, [y]) : e(y);
    } finally {
      Tt = E;
    }
  } : h = nt, t && o) {
    const E = h, $ = o === !0 ? 1 / 0 : o;
    h = () => Ct(E(), $);
  }
  const T = Ri(), F = () => {
    d.stop(), T && T.active && Lo(T.effects, d);
  };
  if (s && t) {
    const E = t;
    t = (...$) => {
      const W = E(...$);
      return F(), W;
    };
  }
  let M = C ? new Array(e.length).fill(Zn) : Zn;
  const L = (E) => {
    if (!(!(d.flags & 1) || !d.dirty && !E))
      if (t) {
        const $ = d.run();
        if (E || o || I || (C ? $.some((W, fe) => et(W, M[fe])) : et($, M))) {
          w && w();
          const W = Tt;
          Tt = d;
          try {
            const fe = [
              $,
              // pass undefined as the old value when it's changed for the first time
              M === Zn ? void 0 : C && M[0] === Zn ? [] : M,
              y
            ];
            M = $, a ? a(t, 3, fe) : (
              // @ts-expect-error
              t(...fe)
            );
          } finally {
            Tt = W;
          }
        }
      } else
        d.run();
  };
  return l && l(L), d = new Ci(h), d.scheduler = i ? () => i(L, !1) : L, y = (E) => gc(E, !1, d), w = d.onStop = () => {
    const E = fr.get(d);
    if (E) {
      if (a)
        a(E, 4);
      else
        for (const $ of E) $();
      fr.delete(d);
    }
  }, t ? r ? L(!0) : M = d.run() : i ? i(L.bind(null, !0), !0) : d.run(), F.pause = d.pause.bind(d), F.resume = d.resume.bind(d), F.stop = F, F;
}
function Ct(e, t = 1 / 0, n) {
  if (t <= 0 || !re(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ Ce(e))
    Ct(e.value, t, n);
  else if (N(e))
    for (let r = 0; r < e.length; r++)
      Ct(e[r], t, n);
  else if (ur(e) || Mt(e))
    e.forEach((r) => {
      Ct(r, t, n);
    });
  else if (yi(e)) {
    for (const r in e)
      Ct(e[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, r) && Ct(e[r], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Fn(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (o) {
    Er(o, t, n);
  }
}
function ze(e, t, n, r) {
  if (U(e)) {
    const o = Fn(e, t, n, r);
    return o && vi(o) && o.catch((s) => {
      Er(s, t, n);
    }), o;
  }
  if (N(e)) {
    const o = [];
    for (let s = 0; s < e.length; s++)
      o.push(ze(e[s], t, n, r));
    return o;
  }
}
function Er(e, t, n, r = !0) {
  const o = t ? t.vnode : null, { errorHandler: s, throwUnhandledErrorInProduction: i } = t && t.appContext.config || ae;
  if (t) {
    let l = t.parent;
    const a = t.proxy, u = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const d = l.ec;
      if (d) {
        for (let h = 0; h < d.length; h++)
          if (d[h](e, a, u) === !1)
            return;
      }
      l = l.parent;
    }
    if (s) {
      ut(), Fn(s, null, 10, [
        e,
        a,
        u
      ]), ft();
      return;
    }
  }
  vc(e, n, o, r, i);
}
function vc(e, t, n, r = !0, o = !1) {
  if (o)
    throw e;
  console.error(e);
}
const Ae = [];
let Je = -1;
const tn = [];
let Rt = null, Jt = 0;
const Bi = /* @__PURE__ */ Promise.resolve();
let dr = null;
function St(e) {
  const t = dr || Bi;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function mc(e) {
  let t = Je + 1, n = Ae.length;
  for (; t < n; ) {
    const r = t + n >>> 1, o = Ae[r], s = En(o);
    s < e || s === e && o.flags & 2 ? t = r + 1 : n = r;
  }
  return t;
}
function zo(e) {
  if (!(e.flags & 1)) {
    const t = En(e), n = Ae[Ae.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= En(n) ? Ae.push(e) : Ae.splice(mc(t), 0, e), e.flags |= 1, $i();
  }
}
function $i() {
  dr || (dr = Bi.then(Wi));
}
function yc(e) {
  if (!N(e))
    Rt && e.id === -1 ? Rt.splice(Jt + 1, 0, e) : e.flags & 1 || (tn.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      tn.push(e[t]);
  $i();
}
function xs(e, t, n = Je + 1) {
  for (; n < Ae.length; n++) {
    const r = Ae[n];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid)
        continue;
      Ae.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function Ni(e) {
  if (tn.length) {
    const t = [...new Set(tn)].sort(
      (n, r) => En(n) - En(r)
    );
    if (tn.length = 0, Rt) {
      for (let n = 0; n < t.length; n++)
        Rt.push(t[n]);
      return;
    }
    for (Rt = t, Jt = 0; Jt < Rt.length; Jt++) {
      const n = Rt[Jt];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    Rt = null, Jt = 0;
  }
}
const En = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Wi(e) {
  try {
    for (Je = 0; Je < Ae.length; Je++) {
      const t = Ae[Je];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Fn(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Je < Ae.length; Je++) {
      const t = Ae[Je];
      t && (t.flags &= -2);
    }
    Je = -1, Ae.length = 0, Ni(), dr = null, (Ae.length || tn.length) && Wi();
  }
}
let tt = null, Ui = null;
function pr(e) {
  const t = tt;
  return tt = e, Ui = e && e.type.__scopeId || null, t;
}
function wc(e, t = tt, n) {
  if (!t || e._n)
    return e;
  const r = (...o) => {
    r._d && Ds(-1);
    const s = pr(t), i = jt.length;
    let l;
    try {
      l = e(...o);
    } finally {
      for (let a = jt.length; a > i; a--) vl();
      pr(s), r._d && Ds(1);
    }
    return l;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function At(e, t, n, r) {
  const o = e.dirs, s = t && t.dirs;
  for (let i = 0; i < o.length; i++) {
    const l = o[i];
    s && (l.oldValue = s[i].value);
    let a = l.dir[r];
    a && (ut(), ze(a, n, 8, [
      e.el,
      l,
      e,
      t
    ]), ft());
  }
}
function bc(e, t) {
  if (Pe) {
    let n = Pe.provides;
    const r = Pe.parent && Pe.parent.provides;
    r === n && (n = Pe.provides = Object.create(r)), n[e] = t;
  }
}
function ir(e, t, n = !1) {
  const r = vu();
  if (r || nn) {
    let o = nn ? nn._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && U(t) ? t.call(r && r.proxy) : t;
  }
}
const _c = /* @__PURE__ */ Symbol.for("v-scx"), xc = () => ir(_c);
function _e(e, t, n) {
  return qi(e, t, n);
}
function qi(e, t, n = ae) {
  const { immediate: r, deep: o, flush: s, once: i } = n, l = Me({}, n), a = t && r || !t && s !== "post";
  let u;
  if (Pn) {
    if (s === "sync") {
      const y = xc();
      u = y.__watcherHandles || (y.__watcherHandles = []);
    } else if (!a) {
      const y = () => {
      };
      return y.stop = nt, y.resume = nt, y.pause = nt, y;
    }
  }
  const d = Pe;
  l.call = (y, I, C) => ze(y, d, I, C);
  let h = !1;
  s === "post" ? l.scheduler = (y) => {
    De(y, d && d.suspense);
  } : s !== "sync" && (h = !0, l.scheduler = (y, I) => {
    I ? y() : zo(y);
  }), l.augmentJob = (y) => {
    t && (y.flags |= 4), h && (y.flags |= 2, d && (y.id = d.uid, y.i = d));
  };
  const w = hc(e, t, l);
  return Pn && (u ? u.push(w) : a && w()), w;
}
function Sc(e, t, n) {
  const r = this.proxy, o = ge(e) ? e.includes(".") ? zi(r, e) : () => r[e] : e.bind(r, r);
  let s;
  U(t) ? s = t : (s = t.handler, n = t);
  const i = Hn(this), l = qi(o, s.bind(r), n);
  return i(), l;
}
function zi(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++)
      r = r[n[o]];
    return r;
  };
}
const Rc = /* @__PURE__ */ Symbol("_vte"), Ar = (e) => e.__isTeleport, so = /* @__PURE__ */ Symbol("_leaveCb");
function Cc(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== pt) {
        t = n;
        break;
      }
  }
  return t;
}
function Gi(e) {
  if (!Yo(e))
    return Ar(e.type) && e.children ? Cc(e.children) : e;
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
function Go(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    Go(
      Ar(n.type) && Gi(n) || n,
      t
    );
  } else e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Yi(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Ss(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const gr = /* @__PURE__ */ new WeakMap();
function xn(e, t, n, r, o = !1) {
  if (N(e)) {
    e.forEach(
      (C, T) => xn(
        C,
        t && (N(t) ? t[T] : t),
        n,
        r,
        o
      )
    );
    return;
  }
  if (Sn(r) && !o) {
    r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && xn(e, t, n, r.component.subTree);
    return;
  }
  const s = r.shapeFlag & 4 ? Zo(r.component) : r.el, i = o ? null : s, { i: l, r: a } = e, u = t && t.r, d = l.refs === ae ? l.refs = {} : l.refs, h = l.setupState, w = /* @__PURE__ */ Q(h), y = h === ae ? hi : (C) => Ss(d, C) ? !1 : ee(w, C), I = (C, T) => !(T && Ss(d, T));
  if (u != null && u !== a) {
    if (Rs(t), ge(u))
      d[u] = null, y(u) && (h[u] = null);
    else if (/* @__PURE__ */ Ce(u)) {
      const C = t;
      I(u, C.k) && (u.value = null), C.k && (d[C.k] = null);
    }
  }
  if (U(a))
    Fn(a, l, 12, [i, d]);
  else {
    const C = ge(a), T = /* @__PURE__ */ Ce(a);
    if (C || T) {
      const F = () => {
        if (e.f) {
          const M = C ? y(a) ? h[a] : d[a] : I() || !e.k ? a.value : d[e.k];
          if (o)
            N(M) && Lo(M, s);
          else if (N(M))
            M.includes(s) || M.push(s);
          else if (C)
            d[a] = [s], y(a) && (h[a] = d[a]);
          else {
            const L = [s];
            I(a, e.k) && (a.value = L), e.k && (d[e.k] = L);
          }
        } else C ? (d[a] = i, y(a) && (h[a] = i)) : T && (I(a, e.k) && (a.value = i), e.k && (d[e.k] = i));
      };
      if (i) {
        const M = () => {
          F(), gr.delete(e);
        };
        M.id = -1, gr.set(e, M), De(M, n);
      } else
        Rs(e), F();
    }
  }
}
function Rs(e) {
  const t = gr.get(e);
  t && (t.flags |= 8, gr.delete(e));
}
Rr().requestIdleCallback;
Rr().cancelIdleCallback;
const Sn = (e) => !!e.type.__asyncLoader, Yo = (e) => e.type.__isKeepAlive;
function Mc(e, t) {
  Xi(e, "a", t);
}
function Ic(e, t) {
  Xi(e, "da", t);
}
function Xi(e, t, n = Pe) {
  const r = e.__wdc || (e.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (Or(t, r, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      Yo(o.parent.vnode) && Ec(r, t, n, o), o = o.parent;
  }
}
function Ec(e, t, n, r) {
  const o = Or(
    t,
    e,
    r,
    !0
    /* prepend */
  );
  Zi(() => {
    Lo(r[t], o);
  }, n);
}
function Or(e, t, n = Pe, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), s = t.__weh || (t.__weh = (...i) => {
      ut();
      const l = Hn(n), a = ze(t, n, e, i);
      return l(), ft(), a;
    });
    return r ? o.unshift(s) : o.push(s), s;
  }
}
const ht = (e) => (t, n = Pe) => {
  (!Pn || e === "sp") && Or(e, (...r) => t(...r), n);
}, Ac = ht("bm"), So = ht("m"), Oc = ht(
  "bu"
), Pc = ht("u"), Ji = ht(
  "bum"
), Zi = ht("um"), Tc = ht(
  "sp"
), Dc = ht("rtg"), kc = ht("rtc");
function Fc(e, t = Pe) {
  Or("ec", e, t);
}
const Hc = /* @__PURE__ */ Symbol.for("v-ndc");
function Qn(e, t, n, r) {
  let o;
  const s = n, i = N(e);
  if (i || ge(e)) {
    const l = i && /* @__PURE__ */ Ft(e);
    let a = !1, u = !1;
    l && (a = !/* @__PURE__ */ $e(e), u = /* @__PURE__ */ dt(e), e = Mr(e)), o = new Array(e.length);
    for (let d = 0, h = e.length; d < h; d++)
      o[d] = t(
        a ? u ? rn(qe(e[d])) : qe(e[d]) : e[d],
        d,
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
        const d = l[a];
        o[a] = t(e[d], d, a, s);
      }
    }
  else
    o = [];
  return o;
}
const Ro = (e) => e ? bl(e) ? Zo(e) : Ro(e.parent) : null, Rn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Me(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Ro(e.parent),
    $root: (e) => Ro(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => el(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      zo(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = St.bind(e.proxy)),
    $watch: (e) => Sc.bind(e)
  })
), io = (e, t) => e !== ae && !e.__isScriptSetup && ee(e, t), jc = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: r, data: o, props: s, accessCache: i, type: l, appContext: a } = e;
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
        if (io(r, t))
          return i[t] = 1, r[t];
        if (o !== ae && ee(o, t))
          return i[t] = 2, o[t];
        if (ee(s, t))
          return i[t] = 3, s[t];
        if (n !== ae && ee(n, t))
          return i[t] = 4, n[t];
        Co && (i[t] = 0);
      }
    }
    const u = Rn[t];
    let d, h;
    if (u)
      return t === "$attrs" && Re(e.attrs, "get", ""), u(e);
    if (
      // css module (injected by vue-loader)
      (d = l.__cssModules) && (d = d[t])
    )
      return d;
    if (n !== ae && ee(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      h = a.config.globalProperties, ee(h, t)
    )
      return h[t];
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: o, ctx: s } = e;
    return io(o, t) ? (o[t] = n, !0) : r !== ae && ee(r, t) ? (r[t] = n, !0) : ee(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (s[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: o, props: s, type: i }
  }, l) {
    let a;
    return !!(n[l] || e !== ae && l[0] !== "$" && ee(e, l) || io(t, l) || ee(s, l) || ee(r, l) || ee(Rn, l) || ee(o.config.globalProperties, l) || (a = i.__cssModules) && a[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : ee(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function Cs(e) {
  return N(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let Co = !0;
function Lc(e) {
  const t = el(e), n = e.proxy, r = e.ctx;
  Co = !1, t.beforeCreate && Ms(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: s,
    methods: i,
    watch: l,
    provide: a,
    inject: u,
    // lifecycle
    created: d,
    beforeMount: h,
    mounted: w,
    beforeUpdate: y,
    updated: I,
    activated: C,
    deactivated: T,
    beforeDestroy: F,
    beforeUnmount: M,
    destroyed: L,
    unmounted: E,
    render: $,
    renderTracked: W,
    renderTriggered: fe,
    errorCaptured: k,
    serverPrefetch: H,
    // public API
    expose: G,
    inheritAttrs: de,
    // assets
    components: se,
    directives: ve,
    filters: Te
  } = t;
  if (u && Kc(u, r, null), i)
    for (const X in i) {
      const ne = i[X];
      U(ne) && (r[X] = ne.bind(n));
    }
  if (o) {
    const X = o.call(n, n);
    re(X) && (e.data = /* @__PURE__ */ Ir(X));
  }
  if (Co = !0, s)
    for (const X in s) {
      const ne = s[X], ke = U(ne) ? ne.bind(n, n) : U(ne.get) ? ne.get.bind(n, n) : nt, Ge = !U(ne) && U(ne.set) ? ne.set.bind(n) : nt, Ne = Y({
        get: ke,
        set: Ge
      });
      Object.defineProperty(r, X, {
        enumerable: !0,
        configurable: !0,
        get: () => Ne.value,
        set: (Le) => Ne.value = Le
      });
    }
  if (l)
    for (const X in l)
      Qi(l[X], r, n, X);
  if (a) {
    const X = U(a) ? a.call(n) : a;
    Reflect.ownKeys(X).forEach((ne) => {
      bc(ne, X[ne]);
    });
  }
  d && Ms(d, e, "c");
  function te(X, ne) {
    N(ne) ? ne.forEach((ke) => X(ke.bind(n))) : ne && X(ne.bind(n));
  }
  if (te(Ac, h), te(So, w), te(Oc, y), te(Pc, I), te(Mc, C), te(Ic, T), te(Fc, k), te(kc, W), te(Dc, fe), te(Ji, M), te(Zi, E), te(Tc, H), N(G))
    if (G.length) {
      const X = e.exposed || (e.exposed = {});
      G.forEach((ne) => {
        Object.defineProperty(X, ne, {
          get: () => n[ne],
          set: (ke) => n[ne] = ke,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  $ && e.render === nt && (e.render = $), de != null && (e.inheritAttrs = de), se && (e.components = se), ve && (e.directives = ve), H && Yi(e);
}
function Kc(e, t, n = nt) {
  N(e) && (e = Mo(e));
  for (const r in e) {
    const o = e[r];
    let s;
    re(o) ? "default" in o ? s = ir(
      o.from || r,
      o.default,
      !0
    ) : s = ir(o.from || r) : s = ir(o), /* @__PURE__ */ Ce(s) ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (i) => s.value = i
    }) : t[r] = s;
  }
}
function Ms(e, t, n) {
  ze(
    N(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Qi(e, t, n, r) {
  let o = r.includes(".") ? zi(n, r) : () => n[r];
  if (ge(e)) {
    const s = t[e];
    U(s) && _e(o, s);
  } else if (U(e))
    _e(o, e.bind(n));
  else if (re(e))
    if (N(e))
      e.forEach((s) => Qi(s, t, n, r));
    else {
      const s = U(e.handler) ? e.handler.bind(n) : t[e.handler];
      U(s) && _e(o, s, e);
    }
}
function el(e) {
  const t = e.type, { mixins: n, extends: r } = t, {
    mixins: o,
    optionsCache: s,
    config: { optionMergeStrategies: i }
  } = e.appContext, l = s.get(t);
  let a;
  return l ? a = l : !o.length && !n && !r ? a = t : (a = {}, o.length && o.forEach(
    (u) => hr(a, u, i, !0)
  ), hr(a, t, i)), re(t) && s.set(t, a), a;
}
function hr(e, t, n, r = !1) {
  const { mixins: o, extends: s } = t;
  s && hr(e, s, n, !0), o && o.forEach(
    (i) => hr(e, i, n, !0)
  );
  for (const i in t)
    if (!(r && i === "expose")) {
      const l = Vc[i] || n && n[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const Vc = {
  data: Is,
  props: Es,
  emits: Es,
  // objects
  methods: mn,
  computed: mn,
  // lifecycle
  beforeCreate: Ee,
  created: Ee,
  beforeMount: Ee,
  mounted: Ee,
  beforeUpdate: Ee,
  updated: Ee,
  beforeDestroy: Ee,
  beforeUnmount: Ee,
  destroyed: Ee,
  unmounted: Ee,
  activated: Ee,
  deactivated: Ee,
  errorCaptured: Ee,
  serverPrefetch: Ee,
  // assets
  components: mn,
  directives: mn,
  // watch
  watch: $c,
  // provide / inject
  provide: Is,
  inject: Bc
};
function Is(e, t) {
  return t ? e ? function() {
    return Me(
      U(e) ? e.call(this, this) : e,
      U(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Bc(e, t) {
  return mn(Mo(e), Mo(t));
}
function Mo(e) {
  if (N(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Ee(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function mn(e, t) {
  return e ? Me(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Es(e, t) {
  return e ? N(e) && N(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Me(
    /* @__PURE__ */ Object.create(null),
    Cs(e),
    Cs(t ?? {})
  ) : t;
}
function $c(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Me(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = Ee(e[r], t[r]);
  return n;
}
function tl() {
  return {
    app: null,
    config: {
      isNativeTag: hi,
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
let Nc = 0;
function Wc(e, t) {
  return function(r, o = null) {
    U(r) || (r = Me({}, r)), o != null && !re(o) && (o = null);
    const s = tl(), i = /* @__PURE__ */ new WeakSet(), l = [];
    let a = !1;
    const u = s.app = {
      _uid: Nc++,
      _component: r,
      _props: o,
      _container: null,
      _context: s,
      _instance: null,
      version: xu,
      get config() {
        return s.config;
      },
      set config(d) {
      },
      use(d, ...h) {
        return i.has(d) || (d && U(d.install) ? (i.add(d), d.install(u, ...h)) : U(d) && (i.add(d), d(u, ...h))), u;
      },
      mixin(d) {
        return s.mixins.includes(d) || s.mixins.push(d), u;
      },
      component(d, h) {
        return h ? (s.components[d] = h, u) : s.components[d];
      },
      directive(d, h) {
        return h ? (s.directives[d] = h, u) : s.directives[d];
      },
      mount(d, h, w) {
        if (!a) {
          const y = u._ceVNode || ct(r, o);
          return y.appContext = s, w === !0 ? w = "svg" : w === !1 && (w = void 0), e(y, d, w), a = !0, u._container = d, d.__vue_app__ = u, Zo(y.component);
        }
      },
      onUnmount(d) {
        l.push(d);
      },
      unmount() {
        a && (ze(
          l,
          u._instance,
          16
        ), e(null, u._container), delete u._container.__vue_app__);
      },
      provide(d, h) {
        return s.provides[d] = h, u;
      },
      runWithContext(d) {
        const h = nn;
        nn = u;
        try {
          return d();
        } finally {
          nn = h;
        }
      }
    };
    return u;
  };
}
let nn = null;
const Uc = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${We(t)}Modifiers`] || e[`${$t(t)}Modifiers`];
function qc(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || ae;
  let o = n;
  const s = t.startsWith("update:"), i = s && Uc(r, t.slice(7));
  i && (i.trim && (o = n.map((d) => ge(d) ? d.trim() : d)), i.number && (o = o.map(ka)));
  let l, a = r[l = Qr(t)] || // also try camelCase event handler (#2249)
  r[l = Qr(We(t))];
  !a && s && (a = r[l = Qr($t(t))]), a && ze(
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
const zc = /* @__PURE__ */ new WeakMap();
function nl(e, t, n = !1) {
  const r = n ? zc : t.emitsCache, o = r.get(e);
  if (o !== void 0)
    return o;
  const s = e.emits;
  let i = {}, l = !1;
  if (!U(e)) {
    const a = (u) => {
      const d = nl(u, t, !0);
      d && (l = !0, Me(i, d));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !s && !l ? (re(e) && r.set(e, null), null) : (N(s) ? s.forEach((a) => i[a] = null) : Me(i, s), re(e) && r.set(e, i), i);
}
function Pr(e, t) {
  return !e || !_r(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), ee(e, t[0].toLowerCase() + t.slice(1)) || ee(e, $t(t)) || ee(e, t));
}
function As(e) {
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
    renderCache: d,
    props: h,
    data: w,
    setupState: y,
    ctx: I,
    inheritAttrs: C
  } = e, T = pr(e);
  let F, M;
  try {
    if (n.shapeFlag & 4) {
      const E = o || r, $ = E;
      F = Qe(
        u.call(
          $,
          E,
          d,
          h,
          y,
          w,
          I
        )
      ), M = l;
    } else {
      const E = t;
      F = Qe(
        E.length > 1 ? E(
          h,
          { attrs: l, slots: i, emit: a }
        ) : E(
          h,
          null
        )
      ), M = t.props ? l : Gc(l);
    }
  } catch (E) {
    jt.length = 0, Er(E, e, 1), F = ct(pt);
  }
  let L = F;
  if (M && C !== !1) {
    const E = Object.keys(M), { shapeFlag: $ } = L;
    E.length && $ & 7 && (s && E.some(xr) && (M = Yc(
      M,
      s
    )), L = on(L, M, !1, !0));
  }
  if (n.dirs && (L = on(L, null, !1, !0), L.dirs = L.dirs ? L.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const E = Ar(L.type) && Gi(L) || L;
    Go(E, n.transition);
  }
  return F = L, pr(T), F;
}
const Gc = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || _r(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Yc = (e, t) => {
  const n = {};
  for (const r in e)
    (!xr(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
  return n;
};
function Xc(e, t, n) {
  const { props: r, children: o, component: s } = e, { props: i, children: l, patchFlag: a } = t, u = s.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return r ? Os(r, i, u) : !!i;
    if (a & 8) {
      const d = t.dynamicProps;
      for (let h = 0; h < d.length; h++) {
        const w = d[h];
        if (rl(i, r, w) && !Pr(u, w))
          return !0;
      }
    }
  } else
    return (o || l) && (!l || !l.$stable) ? !0 : r === i ? !1 : r ? i ? Os(r, i, u) : !0 : !!i;
  return !1;
}
function Os(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < r.length; o++) {
    const s = r[o];
    if (rl(t, e, s) && !Pr(n, s))
      return !0;
  }
  return !1;
}
function rl(e, t, n) {
  const r = e[n], o = t[n];
  return n === "style" && re(r) && re(o) ? !Cr(r, o) : r !== o;
}
function Jc({ vnode: e, parent: t, suspense: n }, r) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.suspense.vnode.el = o.el = r, e = o), o === e)
      (e = t.vnode).el = r, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = r);
}
const ol = {}, sl = () => Object.create(ol), il = (e) => Object.getPrototypeOf(e) === ol;
function Zc(e, t, n, r = !1) {
  const o = {}, s = sl();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), ll(e, t, o, s);
  for (const i in e.propsOptions[0])
    i in o || (o[i] = void 0);
  n ? e.props = r ? o : /* @__PURE__ */ lc(o) : e.type.props ? e.props = o : e.props = s, e.attrs = s;
}
function Qc(e, t, n, r) {
  const {
    props: o,
    attrs: s,
    vnode: { patchFlag: i }
  } = e, l = /* @__PURE__ */ Q(o), [a] = e.propsOptions;
  let u = !1;
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
        if (Pr(e.emitsOptions, w))
          continue;
        const y = t[w];
        if (a)
          if (ee(s, w))
            y !== s[w] && (s[w] = y, u = !0);
          else {
            const I = We(w);
            o[I] = Io(
              a,
              l,
              I,
              y,
              e,
              !1
            );
          }
        else
          y !== s[w] && (s[w] = y, u = !0);
      }
    }
  } else {
    ll(e, t, o, s) && (u = !0);
    let d;
    for (const h in l)
      (!t || // for camelCase
      !ee(t, h) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((d = $t(h)) === h || !ee(t, d))) && (a ? n && // for camelCase
      (n[h] !== void 0 || // for kebab-case
      n[d] !== void 0) && (o[h] = Io(
        a,
        l,
        h,
        void 0,
        e,
        !0
      )) : delete o[h]);
    if (s !== l)
      for (const h in s)
        (!t || !ee(t, h)) && (delete s[h], u = !0);
  }
  u && at(e.attrs, "set", "");
}
function ll(e, t, n, r) {
  const [o, s] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let a in t) {
      if (wn(a))
        continue;
      const u = t[a];
      let d;
      o && ee(o, d = We(a)) ? !s || !s.includes(d) ? n[d] = u : (l || (l = {}))[d] = u : Pr(e.emitsOptions, a) || (!(a in r) || u !== r[a]) && (r[a] = u, i = !0);
    }
  if (s) {
    const a = /* @__PURE__ */ Q(n), u = l || ae;
    for (let d = 0; d < s.length; d++) {
      const h = s[d];
      n[h] = Io(
        o,
        a,
        h,
        u[h],
        e,
        !ee(u, h)
      );
    }
  }
  return i;
}
function Io(e, t, n, r, o, s) {
  const i = e[n];
  if (i != null) {
    const l = ee(i, "default");
    if (l && r === void 0) {
      const a = i.default;
      if (i.type !== Function && !i.skipFactory && U(a)) {
        const { propsDefaults: u } = o;
        if (n in u)
          r = u[n];
        else {
          const d = Hn(o);
          r = u[n] = a.call(
            null,
            t
          ), d();
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
    ] && (r === "" || r === $t(n)) && (r = !0));
  }
  return r;
}
const eu = /* @__PURE__ */ new WeakMap();
function al(e, t, n = !1) {
  const r = n ? eu : t.propsCache, o = r.get(e);
  if (o)
    return o;
  const s = e.props, i = {}, l = [];
  let a = !1;
  if (!U(e)) {
    const d = (h) => {
      a = !0;
      const [w, y] = al(h, t, !0);
      Me(i, w), y && l.push(...y);
    };
    !n && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  if (!s && !a)
    return re(e) && r.set(e, Qt), Qt;
  if (N(s))
    for (let d = 0; d < s.length; d++) {
      const h = We(s[d]);
      Ps(h) && (i[h] = ae);
    }
  else if (s)
    for (const d in s) {
      const h = We(d);
      if (Ps(h)) {
        const w = s[d], y = i[h] = N(w) || U(w) ? { type: w } : Me({}, w), I = y.type;
        let C = !1, T = !0;
        if (N(I))
          for (let F = 0; F < I.length; ++F) {
            const M = I[F], L = U(M) && M.name;
            if (L === "Boolean") {
              C = !0;
              break;
            } else L === "String" && (T = !1);
          }
        else
          C = U(I) && I.name === "Boolean";
        y[
          0
          /* shouldCast */
        ] = C, y[
          1
          /* shouldCastTrue */
        ] = T, (C || ee(y, "default")) && l.push(h);
      }
    }
  const u = [i, l];
  return re(e) && r.set(e, u), u;
}
function Ps(e) {
  return e[0] !== "$" && !wn(e);
}
const Xo = (e) => e === "_" || e === "_ctx" || e === "$stable", Jo = (e) => N(e) ? e.map(Qe) : [Qe(e)], tu = (e, t, n) => {
  if (t._n)
    return t;
  const r = wc((...o) => Jo(t(...o)), n);
  return r._c = !1, r;
}, cl = (e, t, n) => {
  const r = e._ctx;
  for (const o in e) {
    if (Xo(o)) continue;
    const s = e[o];
    if (U(s))
      t[o] = tu(o, s, r);
    else if (s != null) {
      const i = Jo(s);
      t[o] = () => i;
    }
  }
}, ul = (e, t) => {
  const n = Jo(t);
  e.slots.default = () => n;
}, fl = (e, t, n) => {
  for (const r in t)
    (n || !Xo(r)) && (e[r] = t[r]);
}, nu = (e, t, n) => {
  const r = e.slots = sl();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (fl(r, t, n), n && bi(r, "_", o, !0)) : cl(t, r);
  } else t && ul(e, t);
}, ru = (e, t, n) => {
  const { vnode: r, slots: o } = e;
  let s = !0, i = ae;
  if (r.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? s = !1 : fl(o, t, n) : (s = !t.$stable, cl(t, o)), i = t;
  } else t && (ul(e, t), i = { default: 1 });
  if (s)
    for (const l in o)
      !Xo(l) && i[l] == null && delete o[l];
}, De = au;
function ou(e) {
  return su(e);
}
function su(e, t) {
  const n = Rr();
  n.__VUE__ = !0;
  const {
    insert: r,
    remove: o,
    patchProp: s,
    createElement: i,
    createText: l,
    createComment: a,
    setText: u,
    setElementText: d,
    parentNode: h,
    nextSibling: w,
    setScopeId: y = nt,
    insertStaticContent: I
  } = e, C = (p, g, m, R = null, S = null, _ = null, P = void 0, O = null, A = !!g.dynamicChildren) => {
    if (p === g)
      return;
    p && !hn(p, g) && (R = qt(p), Le(p, S, _, !0), p = null), g.patchFlag === -2 && (A = !1, g.dynamicChildren = null);
    const { type: x, ref: K, shapeFlag: D } = g;
    switch (x) {
      case Tr:
        T(p, g, m, R);
        break;
      case pt:
        F(p, g, m, R);
        break;
      case ao:
        p == null && M(g, m, R, P);
        break;
      case Oe:
        se(
          p,
          g,
          m,
          R,
          S,
          _,
          P,
          O,
          A
        );
        break;
      default:
        D & 1 ? $(
          p,
          g,
          m,
          R,
          S,
          _,
          P,
          O,
          A
        ) : D & 6 ? ve(
          p,
          g,
          m,
          R,
          S,
          _,
          P,
          O,
          A
        ) : (D & 64 || D & 128) && x.process(
          p,
          g,
          m,
          R,
          S,
          _,
          P,
          O,
          A,
          Ye
        );
    }
    K != null && S ? xn(K, p && p.ref, _, g || p, !g) : K == null && p && p.ref != null && xn(p.ref, null, _, p, !0);
  }, T = (p, g, m, R) => {
    if (p == null)
      r(
        g.el = l(g.children),
        m,
        R
      );
    else {
      const S = g.el = p.el;
      g.children !== p.children && u(S, g.children);
    }
  }, F = (p, g, m, R) => {
    p == null ? r(
      g.el = a(g.children || ""),
      m,
      R
    ) : g.el = p.el;
  }, M = (p, g, m, R) => {
    [p.el, p.anchor] = I(
      p.children,
      g,
      m,
      R,
      p.el,
      p.anchor
    );
  }, L = ({ el: p, anchor: g }, m, R) => {
    let S;
    for (; p && p !== g; )
      S = w(p), r(p, m, R), p = S;
    r(g, m, R);
  }, E = ({ el: p, anchor: g }) => {
    let m;
    for (; p && p !== g; )
      m = w(p), o(p), p = m;
    o(g);
  }, $ = (p, g, m, R, S, _, P, O, A) => {
    if (g.type === "svg" ? P = "svg" : g.type === "math" && (P = "mathml"), p == null)
      W(
        g,
        m,
        R,
        S,
        _,
        P,
        O,
        A
      );
    else {
      const x = p.el && p.el._isVueCE ? p.el : null;
      try {
        x && x._beginPatch(), H(
          p,
          g,
          S,
          _,
          P,
          O,
          A
        );
      } finally {
        x && x._endPatch();
      }
    }
  }, W = (p, g, m, R, S, _, P, O) => {
    let A, x;
    const { props: K, shapeFlag: D, transition: j, dirs: B } = p;
    if (A = p.el = i(
      p.type,
      _,
      K && K.is,
      K
    ), D & 8 ? d(A, p.children) : D & 16 && k(
      p.children,
      A,
      null,
      R,
      S,
      lo(p, _),
      P,
      O
    ), B && At(p, null, R, "created"), fe(A, p, p.scopeId, P, R), K) {
      for (const J in K)
        J !== "value" && !wn(J) && s(A, J, null, K[J], _, R);
      "value" in K && s(A, "value", null, K.value, _), (x = K.onVnodeBeforeMount) && Xe(x, R, p);
    }
    B && At(p, null, R, "beforeMount");
    const z = iu(S, j);
    z && j.beforeEnter(A), r(A, g, m), ((x = K && K.onVnodeMounted) || z || B) && De(() => {
      try {
        x && Xe(x, R, p), z && j.enter(A), B && At(p, null, R, "mounted");
      } finally {
      }
    }, S);
  }, fe = (p, g, m, R, S) => {
    if (m && y(p, m), R)
      for (let _ = 0; _ < R.length; _++)
        y(p, R[_]);
    if (S) {
      let _ = S.subTree;
      if (g === _ || hl(_.type) && (_.ssContent === g || _.ssFallback === g)) {
        const P = S.vnode;
        fe(
          p,
          P,
          P.scopeId,
          P.slotScopeIds,
          S.parent
        );
      }
    }
  }, k = (p, g, m, R, S, _, P, O, A = 0) => {
    for (let x = A; x < p.length; x++) {
      const K = p[x] = O ? lt(p[x]) : Qe(p[x]);
      C(
        null,
        K,
        g,
        m,
        R,
        S,
        _,
        P,
        O
      );
    }
  }, H = (p, g, m, R, S, _, P) => {
    const O = g.el = p.el;
    let { patchFlag: A, dynamicChildren: x, dirs: K } = g;
    A |= p.patchFlag & 16;
    const D = p.props || ae, j = g.props || ae;
    let B;
    if (m && Ot(m, !1), (B = j.onVnodeBeforeUpdate) && Xe(B, m, g, p), K && At(g, p, m, "beforeUpdate"), m && Ot(m, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    x && (!p.dynamicChildren || p.dynamicChildren.length !== x.length) && (A = 0, P = !1, x = null), (D.innerHTML && j.innerHTML == null || D.textContent && j.textContent == null) && d(O, ""), x ? G(
      p.dynamicChildren,
      x,
      O,
      m,
      R,
      lo(g, S),
      _
    ) : P || ne(
      p,
      g,
      O,
      null,
      m,
      R,
      lo(g, S),
      _,
      !1
    ), A > 0) {
      if (A & 16)
        de(O, D, j, m, S);
      else if (A & 2 && D.class !== j.class && s(O, "class", null, j.class, S), A & 4 && s(O, "style", D.style, j.style, S), A & 8) {
        const z = g.dynamicProps;
        for (let J = 0; J < z.length; J++) {
          const Z = z[J], ce = D[Z], me = j[Z];
          (me !== ce || Z === "value") && s(O, Z, ce, me, S, m);
        }
      }
      A & 1 && p.children !== g.children && d(O, g.children);
    } else !P && x == null && de(O, D, j, m, S);
    ((B = j.onVnodeUpdated) || K) && De(() => {
      B && Xe(B, m, g, p), K && At(g, p, m, "updated");
    }, R);
  }, G = (p, g, m, R, S, _, P) => {
    for (let O = 0; O < g.length; O++) {
      const A = p[O], x = g[O], K = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        A.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (A.type === Oe || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !hn(A, x) || // - In the case of a component, it could contain anything.
        A.shapeFlag & 198) ? h(A.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          m
        )
      );
      C(
        A,
        x,
        K,
        null,
        R,
        S,
        _,
        P,
        !0
      );
    }
  }, de = (p, g, m, R, S) => {
    if (g !== m) {
      if (g !== ae)
        for (const _ in g)
          !wn(_) && !(_ in m) && s(
            p,
            _,
            g[_],
            null,
            S,
            R
          );
      for (const _ in m) {
        if (wn(_)) continue;
        const P = m[_], O = g[_];
        P !== O && _ !== "value" && s(p, _, O, P, S, R);
      }
      "value" in m && s(p, "value", g.value, m.value, S);
    }
  }, se = (p, g, m, R, S, _, P, O, A) => {
    const x = g.el = p ? p.el : l(""), K = g.anchor = p ? p.anchor : l("");
    let { patchFlag: D, dynamicChildren: j, slotScopeIds: B } = g;
    B && (O = O ? O.concat(B) : B), p == null ? (r(x, m, R), r(K, m, R), k(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      g.children || [],
      m,
      K,
      S,
      _,
      P,
      O,
      A
    )) : D > 0 && D & 64 && j && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    p.dynamicChildren && p.dynamicChildren.length === j.length ? (G(
      p.dynamicChildren,
      j,
      m,
      S,
      _,
      P,
      O
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (g.key != null || S && g === S.subTree) && dl(
      p,
      g,
      !0
      /* shallow */
    )) : ne(
      p,
      g,
      m,
      K,
      S,
      _,
      P,
      O,
      A
    );
  }, ve = (p, g, m, R, S, _, P, O, A) => {
    g.slotScopeIds = O, p == null ? g.shapeFlag & 512 ? S.ctx.activate(
      g,
      m,
      R,
      P,
      A
    ) : Te(
      g,
      m,
      R,
      S,
      _,
      P,
      A
    ) : Ie(p, g, A);
  }, Te = (p, g, m, R, S, _, P) => {
    const O = p.component = hu(
      p,
      R,
      S
    );
    if (Yo(p) && (O.ctx.renderer = Ye), mu(O, !1, P), O.asyncDep) {
      if (S && S.registerDep(O, te, P), !p.el) {
        const A = O.subTree = ct(pt);
        F(null, A, g, m), p.placeholder = A.el;
      }
    } else
      te(
        O,
        p,
        g,
        m,
        S,
        _,
        P
      );
  }, Ie = (p, g, m) => {
    const R = g.component = p.component;
    if (Xc(p, g, m))
      if (R.asyncDep && !R.asyncResolved) {
        X(R, g, m);
        return;
      } else
        R.next = g, R.update();
    else
      g.el = p.el, R.vnode = g;
  }, te = (p, g, m, R, S, _, P) => {
    const O = () => {
      if (p.isMounted) {
        let { next: D, bu: j, u: B, parent: z, vnode: J } = p;
        {
          const He = pl(p);
          if (He) {
            D && (D.el = J.el, X(p, D, P)), He.asyncDep.then(() => {
              De(() => {
                p.isUnmounted || x();
              }, S);
            });
            return;
          }
        }
        let Z = D, ce;
        Ot(p, !1), D ? (D.el = J.el, X(p, D, P)) : D = J, j && eo(j), (ce = D.props && D.props.onVnodeBeforeUpdate) && Xe(ce, z, D, J), Ot(p, !0);
        const me = As(p), Ve = p.subTree;
        p.subTree = me, C(
          Ve,
          me,
          // parent may have changed if it's in a teleport
          h(Ve.el),
          // anchor may have changed if it's in a fragment
          qt(Ve),
          p,
          S,
          _
        ), D.el = me.el, Z === null && Jc(p, me.el), B && De(B, S), (ce = D.props && D.props.onVnodeUpdated) && De(
          () => Xe(ce, z, D, J),
          S
        );
      } else {
        let D;
        const { el: j, props: B } = g, { bm: z, m: J, parent: Z, root: ce, type: me } = p, Ve = Sn(g);
        Ot(p, !1), z && eo(z), !Ve && (D = B && B.onVnodeBeforeMount) && Xe(D, Z, g), Ot(p, !0);
        {
          ce.ce && ce.ce._hasShadowRoot() && ce.ce._injectChildStyle(
            me,
            p.parent ? p.parent.type : void 0
          );
          const He = p.subTree = As(p);
          C(
            null,
            He,
            m,
            R,
            p,
            S,
            _
          ), g.el = He.el;
        }
        if (J && De(J, S), !Ve && (D = B && B.onVnodeMounted)) {
          const He = g;
          De(
            () => Xe(D, Z, He),
            S
          );
        }
        (g.shapeFlag & 256 || Z && Sn(Z.vnode) && Z.vnode.shapeFlag & 256) && p.a && De(p.a, S), p.isMounted = !0, g = m = R = null;
      }
    };
    p.scope.on();
    const A = p.effect = new Ci(O);
    p.scope.off();
    const x = p.update = A.run.bind(A), K = p.job = A.runIfDirty.bind(A);
    K.i = p, K.id = p.uid, A.scheduler = () => zo(K), Ot(p, !0), x();
  }, X = (p, g, m) => {
    g.component = p;
    const R = p.vnode.props;
    p.vnode = g, p.next = null, Qc(p, g.props, R, m), ru(p, g.children, m), ut(), xs(p), ft();
  }, ne = (p, g, m, R, S, _, P, O, A = !1) => {
    const x = p && p.children, K = p ? p.shapeFlag : 0, D = g.children, { patchFlag: j, shapeFlag: B } = g;
    if (j > 0) {
      if (j & 128) {
        Ge(
          x,
          D,
          m,
          R,
          S,
          _,
          P,
          O,
          A
        );
        return;
      } else if (j & 256) {
        ke(
          x,
          D,
          m,
          R,
          S,
          _,
          P,
          O,
          A
        );
        return;
      }
    }
    B & 8 ? (K & 16 && Ke(x, S, _), D !== x && d(m, D)) : K & 16 ? B & 16 ? Ge(
      x,
      D,
      m,
      R,
      S,
      _,
      P,
      O,
      A
    ) : Ke(x, S, _, !0) : (K & 8 && d(m, ""), B & 16 && k(
      D,
      m,
      R,
      S,
      _,
      P,
      O,
      A
    ));
  }, ke = (p, g, m, R, S, _, P, O, A) => {
    p = p || Qt, g = g || Qt;
    const x = p.length, K = g.length, D = Math.min(x, K);
    let j;
    for (j = 0; j < D; j++) {
      const B = g[j] = A ? lt(g[j]) : Qe(g[j]);
      C(
        p[j],
        B,
        m,
        null,
        S,
        _,
        P,
        O,
        A
      );
    }
    x > K ? Ke(
      p,
      S,
      _,
      !0,
      !1,
      D
    ) : k(
      g,
      m,
      R,
      S,
      _,
      P,
      O,
      A,
      D
    );
  }, Ge = (p, g, m, R, S, _, P, O, A) => {
    let x = 0;
    const K = g.length;
    let D = p.length - 1, j = K - 1;
    for (; x <= D && x <= j; ) {
      const B = p[x], z = g[x] = A ? lt(g[x]) : Qe(g[x]);
      if (hn(B, z))
        C(
          B,
          z,
          m,
          null,
          S,
          _,
          P,
          O,
          A
        );
      else
        break;
      x++;
    }
    for (; x <= D && x <= j; ) {
      const B = p[D], z = g[j] = A ? lt(g[j]) : Qe(g[j]);
      if (hn(B, z))
        C(
          B,
          z,
          m,
          null,
          S,
          _,
          P,
          O,
          A
        );
      else
        break;
      D--, j--;
    }
    if (x > D) {
      if (x <= j) {
        const B = j + 1, z = B < K ? g[B].el : R;
        for (; x <= j; )
          C(
            null,
            g[x] = A ? lt(g[x]) : Qe(g[x]),
            m,
            z,
            S,
            _,
            P,
            O,
            A
          ), x++;
      }
    } else if (x > j)
      for (; x <= D; )
        Le(p[x], S, _, !0), x++;
    else {
      const B = x, z = x, J = /* @__PURE__ */ new Map();
      for (x = z; x <= j; x++) {
        const we = g[x] = A ? lt(g[x]) : Qe(g[x]);
        we.key != null && J.set(we.key, x);
      }
      let Z, ce = 0;
      const me = j - z + 1;
      let Ve = !1, He = 0;
      const wt = new Array(me);
      for (x = 0; x < me; x++) wt[x] = 0;
      for (x = B; x <= D; x++) {
        const we = p[x];
        if (ce >= me) {
          Le(we, S, _, !0);
          continue;
        }
        let pe;
        if (we.key != null)
          pe = J.get(we.key);
        else
          for (Z = z; Z <= j; Z++)
            if (wt[Z - z] === 0 && hn(we, g[Z])) {
              pe = Z;
              break;
            }
        pe === void 0 ? Le(we, S, _, !0) : (wt[pe - z] = x + 1, pe >= He ? He = pe : Ve = !0, C(
          we,
          g[pe],
          m,
          null,
          S,
          _,
          P,
          O,
          A
        ), ce++);
      }
      const Et = Ve ? lu(wt) : Qt;
      for (Z = Et.length - 1, x = me - 1; x >= 0; x--) {
        const we = z + x, pe = g[we], Vn = g[we + 1], cn = we + 1 < K ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Vn.el || gl(Vn)
        ) : R;
        wt[x] === 0 ? C(
          null,
          pe,
          m,
          cn,
          S,
          _,
          P,
          O,
          A
        ) : Ve && (Z < 0 || x !== Et[Z] ? Ne(pe, m, cn, 2) : Z--);
      }
    }
  }, Ne = (p, g, m, R, S = null) => {
    const { el: _, type: P, transition: O, children: A, shapeFlag: x } = p;
    if (x & 6) {
      Ne(p.component.subTree, g, m, R);
      return;
    }
    if (x & 128) {
      p.suspense.move(g, m, R);
      return;
    }
    if (x & 64) {
      P.move(p, g, m, Ye);
      return;
    }
    if (P === Oe) {
      r(_, g, m);
      for (let D = 0; D < A.length; D++)
        Ne(A[D], g, m, R);
      r(p.anchor, g, m);
      return;
    }
    if (P === ao) {
      L(p, g, m);
      return;
    }
    if (R !== 2 && x & 1 && O)
      if (R === 0)
        O.persisted && !_[so] ? r(_, g, m) : (O.beforeEnter(_), r(_, g, m), De(() => O.enter(_), S));
      else {
        const { leave: D, delayLeave: j, afterLeave: B } = O, z = () => {
          p.ctx.isUnmounted ? o(_) : r(_, g, m);
        }, J = () => {
          const Z = _._isLeaving || !!_[so];
          _._isLeaving && _[so](
            !0
            /* cancelled */
          ), O.persisted && !Z ? z() : D(_, () => {
            z(), B && B();
          });
        };
        j ? j(_, z, J) : J();
      }
    else
      r(_, g, m);
  }, Le = (p, g, m, R = !1, S = !1) => {
    const {
      type: _,
      props: P,
      ref: O,
      children: A,
      dynamicChildren: x,
      shapeFlag: K,
      patchFlag: D,
      dirs: j,
      cacheIndex: B,
      memo: z
    } = p;
    if (D === -2 && (S = !1), O != null && (ut(), xn(O, null, m, p, !0), ft()), B != null && (g.renderCache[B] = void 0), K & 256) {
      g.ctx.deactivate(p);
      return;
    }
    const J = K & 1 && j, Z = !Sn(p);
    let ce;
    if (Z && (ce = P && P.onVnodeBeforeUnmount) && Xe(ce, g, p), K & 6)
      Ut(p.component, m, R);
    else {
      if (K & 128) {
        p.suspense.unmount(m, R);
        return;
      }
      J && At(p, null, g, "beforeUnmount"), K & 64 ? p.type.remove(
        p,
        g,
        m,
        Ye,
        R
      ) : x && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !x.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (_ !== Oe || D > 0 && D & 64) ? Ke(
        x,
        g,
        m,
        !1,
        !0
      ) : (_ === Oe && D & 384 || !S && K & 16) && Ke(A, g, m), R && vt(p);
    }
    const me = z != null && B == null;
    (Z && (ce = P && P.onVnodeUnmounted) || J || me) && De(() => {
      ce && Xe(ce, g, p), J && At(p, null, g, "unmounted"), me && (p.el = null);
    }, m);
  }, vt = (p) => {
    const { type: g, el: m, anchor: R, transition: S } = p;
    if (g === Oe) {
      mt(m, R);
      return;
    }
    if (g === ao) {
      E(p);
      return;
    }
    const _ = () => {
      o(m), S && !S.persisted && S.afterLeave && S.afterLeave();
    };
    if (p.shapeFlag & 1 && S && !S.persisted) {
      const { leave: P, delayLeave: O } = S, A = () => P(m, _);
      O ? O(p.el, _, A) : A();
    } else
      _();
  }, mt = (p, g) => {
    let m;
    for (; p !== g; )
      m = w(p), o(p), p = m;
    o(g);
  }, Ut = (p, g, m) => {
    const { bum: R, scope: S, job: _, subTree: P, um: O, m: A, a: x } = p;
    Ts(A), Ts(x), R && eo(R), S.stop(), _ && (_.flags |= 8, Le(P, p, g, m)), O && De(O, g), De(() => {
      p.isUnmounted = !0;
    }, g);
  }, Ke = (p, g, m, R = !1, S = !1, _ = 0) => {
    for (let P = _; P < p.length; P++)
      Le(p[P], g, m, R, S);
  }, qt = (p) => {
    if (p.shapeFlag & 6)
      return qt(p.component.subTree);
    if (p.shapeFlag & 128)
      return p.suspense.next();
    const g = w(p.anchor || p.el), m = g && g[Rc];
    return m ? w(m) : g;
  };
  let yt = !1;
  const Fe = (p, g, m) => {
    let R;
    p == null ? g._vnode && (Le(g._vnode, null, null, !0), R = g._vnode.component) : C(
      g._vnode || null,
      p,
      g,
      null,
      null,
      null,
      m
    ), g._vnode = p, yt || (yt = !0, xs(R), Ni(), yt = !1);
  }, Ye = {
    p: C,
    um: Le,
    m: Ne,
    r: vt,
    mt: Te,
    mc: k,
    pc: ne,
    pbc: G,
    n: qt,
    o: e
  };
  return {
    render: Fe,
    hydrate: void 0,
    createApp: Wc(Fe)
  };
}
function lo({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Ot({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function iu(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function dl(e, t, n = !1) {
  const r = e.children, o = t.children;
  if (N(r) && N(o))
    for (let s = 0; s < r.length; s++) {
      const i = r[s];
      let l = o[s];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = o[s] = lt(o[s]), l.el = i.el), !n && l.patchFlag !== -2 && dl(i, l)), l.type === Tr && (l.patchFlag === -1 && (l = o[s] = lt(l)), l.el = i.el), l.type === pt && !l.el && (l.el = i.el);
    }
}
function lu(e) {
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
function pl(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : pl(t);
}
function Ts(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function gl(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? gl(t.subTree) : null;
}
const hl = (e) => e.__isSuspense;
function au(e, t) {
  t && t.pendingBranch ? N(e) ? t.effects.push(...e) : t.effects.push(e) : yc(e);
}
const Oe = /* @__PURE__ */ Symbol.for("v-fgt"), Tr = /* @__PURE__ */ Symbol.for("v-txt"), pt = /* @__PURE__ */ Symbol.for("v-cmt"), ao = /* @__PURE__ */ Symbol.for("v-stc"), jt = [];
let je = null;
function ie(e = !1) {
  jt.push(je = e ? null : []);
}
function vl() {
  jt.pop(), je = jt[jt.length - 1] || null;
}
let An = 1;
function Ds(e, t = !1) {
  An += e, e < 0 && je && t && (je.hasOnce = !0);
}
function ml(e) {
  return e.dynamicChildren = An > 0 ? je || Qt : null, vl(), An > 0 && je && je.push(e), e;
}
function ue(e, t, n, r, o, s) {
  return ml(
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
function cu(e, t, n, r, o) {
  return ml(
    ct(
      e,
      t,
      n,
      r,
      o,
      !0
    )
  );
}
function yl(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function hn(e, t) {
  return e.type === t.type && e.key === t.key;
}
const wl = ({ key: e }) => e ?? null, lr = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? ge(e) || /* @__PURE__ */ Ce(e) || U(e) ? { i: tt, r: e, k: t, f: !!n } : e : null);
function Se(e, t = null, n = null, r = 0, o = null, s = e === Oe ? 0 : 1, i = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && wl(t),
    ref: t && lr(t),
    scopeId: Ui,
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
  return l ? (vr(a, n), s & 128 && e.normalize(a)) : n && (a.shapeFlag |= ge(n) ? 8 : 16), An > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  je && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && je.push(a), a;
}
const ct = uu;
function uu(e, t = null, n = null, r = 0, o = null, s = !1) {
  if ((!e || e === Hc) && (e = pt), yl(e)) {
    const l = on(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && vr(l, n), An > 0 && !s && je && (l.shapeFlag & 6 ? je[je.indexOf(e)] = l : je.push(l)), l.patchFlag = -2, l;
  }
  if (_u(e) && (e = e.__vccOpts), t) {
    t = fu(t);
    let { class: l, style: a } = t;
    l && !ge(l) && (t.class = Dt(l)), re(a) && (/* @__PURE__ */ qo(a) && !N(a) && (a = Me({}, a)), t.style = en(a));
  }
  const i = ge(e) ? 1 : hl(e) ? 128 : Ar(e) ? 64 : re(e) ? 4 : U(e) ? 2 : 0;
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
function fu(e) {
  return e ? /* @__PURE__ */ qo(e) || il(e) ? Me({}, e) : e : null;
}
function on(e, t, n = !1, r = !1) {
  const { props: o, ref: s, patchFlag: i, children: l, transition: a } = e, u = t ? du(o || {}, t) : o, d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: u,
    key: u && wl(u),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && s ? N(s) ? s.concat(lr(t)) : [s, lr(t)] : lr(t)
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
    patchFlag: t && e.type !== Oe ? i === -1 ? 16 : i | 16 : i,
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
    ssContent: e.ssContent && on(e.ssContent),
    ssFallback: e.ssFallback && on(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return a && r && Go(
    d,
    a.clone(d)
  ), d;
}
function Eo(e = " ", t = 0) {
  return ct(Tr, null, e, t);
}
function Pt(e = "", t = !1) {
  return t ? (ie(), cu(pt, null, e)) : ct(pt, null, e);
}
function Qe(e) {
  return e == null || typeof e == "boolean" ? ct(pt) : N(e) ? ct(
    Oe,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : yl(e) ? lt(e) : ct(Tr, null, String(e));
}
function lt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : on(e);
}
function vr(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (N(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), vr(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !il(t) ? t._ctx = tt : o === 3 && tt && (tt.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (U(t)) {
    if (r & 65) {
      vr(e, { default: t });
      return;
    }
    t = { default: t, _ctx: tt }, n = 32;
  } else
    t = String(t), r & 64 ? (n = 16, t = [Eo(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function du(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === "class")
        t.class !== r.class && (t.class = Dt([t.class, r.class]));
      else if (o === "style")
        t.style = en([t.style, r.style]);
      else if (_r(o)) {
        const s = t[o], i = r[o];
        i && s !== i && !(N(s) && s.includes(i)) ? t[o] = s ? [].concat(s, i) : i : i == null && s == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !xr(o) && (t[o] = i);
      } else o !== "" && (t[o] = r[o]);
  }
  return t;
}
function Xe(e, t, n, r = null) {
  ze(e, t, 7, [
    n,
    r
  ]);
}
const pu = tl();
let gu = 0;
function hu(e, t, n) {
  const r = e.type, o = (t ? t.appContext : e.appContext) || pu, s = {
    uid: gu++,
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
    scope: new $a(
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
    propsOptions: al(r, o),
    emitsOptions: nl(r, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: ae,
    // inheritAttrs
    inheritAttrs: r.inheritAttrs,
    // state
    ctx: ae,
    data: ae,
    props: ae,
    attrs: ae,
    slots: ae,
    refs: ae,
    setupState: ae,
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
  return s.ctx = { _: s }, s.root = t ? t.root : s, s.emit = qc.bind(null, s), e.ce && e.ce(s), s;
}
let Pe = null;
const vu = () => Pe || tt;
let mr, On;
{
  const e = Rr(), t = (n, r) => {
    let o;
    return (o = e[n]) || (o = e[n] = []), o.push(r), (s) => {
      o.length > 1 ? o.forEach((i) => i(s)) : o[0](s);
    };
  };
  mr = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Pe = n
  ), On = t(
    "__VUE_SSR_SETTERS__",
    (n) => Pn = n
  );
}
const Hn = (e) => {
  const t = Pe;
  return mr(e), e.scope.on(), () => {
    e.scope.off(), mr(t);
  };
}, ks = () => {
  Pe && Pe.scope.off(), mr(null);
};
function bl(e) {
  return e.vnode.shapeFlag & 4;
}
let Pn = !1;
function mu(e, t = !1, n = !1) {
  t && On(t);
  const { props: r, children: o } = e.vnode, s = bl(e);
  Zc(e, r, s, t), nu(e, o, n || t);
  const i = s ? yu(e, t) : void 0;
  return t && On(!1), i;
}
function yu(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, jc);
  const { setup: r } = n;
  if (r) {
    ut();
    const o = e.setupContext = r.length > 1 ? bu(e) : null, s = Hn(e), i = Fn(
      r,
      e,
      0,
      [
        e.props,
        o
      ]
    ), l = vi(i);
    if (ft(), s(), (l || e.sp) && !Sn(e) && Yi(e), l) {
      if (i.then(ks, ks), t)
        return i.then((a) => {
          On(!0);
          try {
            Fs(e, a, t);
          } finally {
            On(!1);
          }
        }).catch((a) => {
          Er(a, e, 0);
        });
      e.asyncDep = i;
    } else
      Fs(e, i);
  } else
    _l(e);
}
function Fs(e, t, n) {
  U(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : re(t) && (e.setupState = Vi(t)), _l(e);
}
function _l(e, t, n) {
  const r = e.type;
  e.render || (e.render = r.render || nt);
  {
    const o = Hn(e);
    ut();
    try {
      Lc(e);
    } finally {
      ft(), o();
    }
  }
}
const wu = {
  get(e, t) {
    return Re(e, "get", ""), e[t];
  }
};
function bu(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, wu),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Zo(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Vi(ac(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in Rn)
        return Rn[n](e);
    },
    has(t, n) {
      return n in t || n in Rn;
    }
  })) : e.proxy;
}
function _u(e) {
  return U(e) && "__vccOpts" in e;
}
const Y = (e, t) => /* @__PURE__ */ pc(e, t, Pn), xu = "3.5.42";
/**
* @vue/runtime-dom v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Ao;
const Hs = typeof window < "u" && window.trustedTypes;
if (Hs)
  try {
    Ao = /* @__PURE__ */ Hs.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const xl = Ao ? (e) => Ao.createHTML(e) : (e) => e, Su = "http://www.w3.org/2000/svg", Ru = "http://www.w3.org/1998/Math/MathML", it = typeof document < "u" ? document : null, js = it && /* @__PURE__ */ it.createElement("template"), Cu = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const o = t === "svg" ? it.createElementNS(Su, e) : t === "mathml" ? it.createElementNS(Ru, e) : n ? it.createElement(e, { is: n }) : it.createElement(e);
    return e === "select" && r && r.multiple != null && o.setAttribute("multiple", r.multiple), o;
  },
  createText: (e) => it.createTextNode(e),
  createComment: (e) => it.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => it.querySelector(e),
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
      js.innerHTML = xl(
        r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e
      );
      const l = js.content;
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
}, Mu = /* @__PURE__ */ Symbol("_vtc");
function Iu(e, t, n) {
  const r = e[Mu];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Ls = /* @__PURE__ */ Symbol("_vod"), Eu = /* @__PURE__ */ Symbol("_vsh"), Au = /* @__PURE__ */ Symbol(""), Ou = /(?:^|;)\s*display\s*:/;
function Pu(e, t, n) {
  const r = e.style, o = ge(n);
  let s = !1;
  if (n && !o) {
    if (t)
      if (ge(t))
        for (const i of t.split(";")) {
          const l = i.slice(0, i.indexOf(":")).trim();
          n[l] == null && yn(r, l, "");
        }
      else
        for (const i in t)
          n[i] == null && yn(r, i, "");
    for (const i in n) {
      i === "display" && (s = !0);
      const l = n[i];
      l != null ? Du(
        e,
        i,
        !ge(t) && t ? t[i] : void 0,
        l
      ) || yn(r, i, l) : yn(r, i, "");
    }
  } else if (o) {
    if (t !== n) {
      const i = r[Au];
      i && (n += ";" + i), r.cssText = n, s = Ou.test(n);
    }
  } else t && e.removeAttribute("style");
  Ls in e && (e[Ls] = s ? r.display : "", e[Eu] && (r.display = "none"));
}
const er = /\s*!important$/;
function yn(e, t, n) {
  if (N(n))
    n.forEach((r) => yn(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--"))
    er.test(n) ? e.setProperty(t, n.replace(er, ""), "important") : e.setProperty(t, n);
  else {
    const r = Tu(e, t);
    er.test(n) ? e.setProperty(
      $t(r),
      n.replace(er, ""),
      "important"
    ) : e[r] = n;
  }
}
const Ks = ["Webkit", "Moz", "ms"], co = {};
function Tu(e, t) {
  const n = co[t];
  if (n)
    return n;
  let r = We(t);
  if (r !== "filter" && r in e)
    return co[t] = r;
  r = wi(r);
  for (let o = 0; o < Ks.length; o++) {
    const s = Ks[o] + r;
    if (s in e)
      return co[t] = s;
  }
  return t;
}
function Du(e, t, n, r) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && ge(r) && n === r;
}
const Vs = "http://www.w3.org/1999/xlink";
function Bs(e, t, n, r, o, s = Va(t)) {
  r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Vs, t.slice(6, t.length)) : e.setAttributeNS(Vs, t, n) : n == null || s && !_i(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    s ? "" : rt(n) ? String(n) : n
  );
}
function $s(e, t, n, r, o) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? xl(n) : n);
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
    l === "boolean" ? n = _i(n) : n == null && l === "string" ? (n = "", i = !0) : l === "number" && (n = 0, i = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  i && e.removeAttribute(o || t);
}
function ku(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function Fu(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const Ns = /* @__PURE__ */ Symbol("_vei");
function Hu(e, t, n, r, o = null) {
  const s = e[Ns] || (e[Ns] = {}), i = s[t];
  if (r && i)
    i.value = r;
  else {
    const [l, a] = Ku(t);
    if (r) {
      const u = s[t] = $u(
        r,
        o
      );
      ku(e, l, u, a);
    } else i && (Fu(e, l, i, a), s[t] = void 0);
  }
}
const ju = /(Once|Passive|Capture)$/, Lu = /^on:?(?:Once|Passive|Capture)$/;
function Ku(e) {
  let t, n;
  for (; (n = e.match(ju)) && !Lu.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : $t(e.slice(2)), t];
}
let uo = 0;
const Vu = /* @__PURE__ */ Promise.resolve(), Bu = () => uo || (Vu.then(() => uo = 0), uo = Date.now());
function $u(e, t) {
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
  return n.value = e, n.attached = Bu(), n;
}
const Ws = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Nu = (e, t, n, r, o, s) => {
  const i = o === "svg";
  t === "class" ? Iu(e, r, i) : t === "style" ? Pu(e, n, r) : _r(t) ? xr(t) || Hu(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Wu(e, t, r, i)) ? ($s(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Bs(e, t, r, i, s, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Uu(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !ge(r))) ? $s(e, We(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), Bs(e, t, r, i));
};
function Wu(e, t, n, r) {
  if (r)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Ws(t) && U(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return Ws(t) && ge(n) ? !1 : t in e;
}
function Uu(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const r = We(t);
  return Array.isArray(n) ? n.some((o) => We(o) === r) : Object.keys(n).some((o) => We(o) === r);
}
const qu = ["ctrl", "shift", "alt", "meta"], zu = {
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
  exact: (e, t) => qu.some((n) => e[`${n}Key`] && !t.includes(n))
}, tr = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), r = t.join(".");
  return n[r] || (n[r] = (o, ...s) => {
    for (let i = 0; i < t.length; i++) {
      const l = zu[t[i]];
      if (l && l(o, t)) return;
    }
    return e(o, ...s);
  });
}, Gu = /* @__PURE__ */ Me({ patchProp: Nu }, Cu);
let Us;
function Yu() {
  return Us || (Us = ou(Gu));
}
const Xu = (...e) => {
  const t = Yu().createApp(...e), { mount: n } = t;
  return t.mount = (r) => {
    const o = Zu(r);
    if (!o) return;
    const s = t._component;
    !U(s) && !s.render && !s.template && (s.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const i = n(o, !1, Ju(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), i;
  }, t;
};
function Ju(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Zu(e) {
  return ge(e) ? document.querySelector(e) : e;
}
function nr() {
  return !0;
}
const Qu = Symbol("merge-proxy"), ar = Symbol("merge-proxy-sources"), ef = {
  get(e, t, n) {
    return t === Qu ? n : t === ar ? e.sources : e.get(t);
  },
  has(e, t) {
    return e.has(t);
  },
  set: nr,
  deleteProperty: nr,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: nr,
      deleteProperty: nr
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function cr(e) {
  return e && typeof e == "object" && "value" in e ? e.value : e;
}
function Oo(...e) {
  const t = e.flatMap((n) => typeof n == "object" && n !== null && ar in n && Array.isArray(n[ar]) ? n[ar] : [n]);
  return new Proxy({
    sources: t,
    get(n) {
      for (let r = t.length - 1; r >= 0; r--) {
        const o = cr(t[r])[n];
        if (o !== void 0) return o;
      }
    },
    has(n) {
      for (let r = t.length - 1; r >= 0; r--) if (n in cr(t[r])) return !0;
      return !1;
    },
    keys() {
      const n = [];
      for (const r of t) n.push(...Object.keys(cr(r)));
      return [...Array.from(new Set(n))];
    }
  }, ef);
}
function qs(...e) {
  const t = {};
  for (let n of e)
    if (n = cr(n), !!n)
      for (const r of Reflect.ownKeys(n)) {
        const o = n[r];
        o !== void 0 && (t[r] = o);
      }
  return t;
}
function Sl(e) {
  return typeof e == "function" ? e : (t) => {
    var n;
    return (n = e.next) == null ? void 0 : n.call(e, t);
  };
}
function tf(e) {
  return Object.assign(e, {
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: _e(e, Sl(t), { flush: "sync" }) })
  });
}
function nf(e) {
  return Object.assign(e, {
    set: (t) => {
      e.value = typeof t == "function" ? t(e.value) : t;
    },
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: _e(e, Sl(t), { flush: "sync" }) })
  });
}
function rf() {
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
    createReadonlyAtom: (t, n) => tf(Y(() => t())),
    createWritableAtom: (t, n) => nf(/* @__PURE__ */ cc(t)),
    untrack: (t) => t(),
    batch: (t) => t()
  };
}
function Dr(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function It(e) {
  if (Array.isArray(e)) return e.map(It);
  if (e && typeof e == "object") {
    const t = Object.getPrototypeOf(e);
    if (t !== Object.prototype && t !== null) return e;
    const n = t === null ? oe() : {}, r = Object.keys(e);
    for (let o = 0; o < r.length; o++) {
      const s = r[o];
      Object.defineProperty(n, s, {
        configurable: !0,
        enumerable: !0,
        value: It(e[s]),
        writable: !0
      });
    }
    return n;
  }
  return e;
}
function of(e, t) {
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
function sn(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Rl(e, t) {
  return (n) => {
    var r;
    (((r = t.options.atoms) == null ? void 0 : r[e]) ?? t.baseAtoms[e]).set((o) => Dr(n, o));
  };
}
function zs(e) {
  if (typeof e != "object" || e === null) return !1;
  if (Array.isArray(e)) return !0;
  const t = Object.getPrototypeOf(e);
  return t === Object.prototype || t === null;
}
function Gs(e) {
  return Reflect.ownKeys(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
const sf = 3;
function lf(e, t) {
  return Cl(e, t, sf);
}
function Cl(e, t, n) {
  if (Object.is(e, t)) return !0;
  if (n <= 0 || !zs(e) || !zs(t) || (Array.isArray(e) || Array.isArray(t)) && (!Array.isArray(e) || !Array.isArray(t) || e.length !== t.length))
    return !1;
  const r = Gs(e), o = Gs(t);
  if (r.length !== o.length) return !1;
  const s = e, i = t;
  for (let l = 0; l < r.length; l++) {
    const a = r[l];
    if (!Object.prototype.propertyIsEnumerable.call(t, a) || !Cl(s[a], i[a], n - 1)) return !1;
  }
  return !0;
}
function kr(e, t, n, r = lf) {
  const o = `on${t.charAt(0).toUpperCase()}${t.slice(1)}Change`, s = e.options[o];
  s && s((i) => {
    const l = Dr(n, i);
    return r(i, l) ? i : l;
  });
}
function af(e, t) {
  const n = [], r = (o) => {
    o.forEach((s) => {
      n.push(s);
      const i = t(s);
      i.length && r(i);
    });
  };
  return r(e), n;
}
const cf = ({ fn: e, memoDeps: t, onAfterCompare: n, onAfterUpdate: r, onBeforeCompare: o, onBeforeUpdate: s }) => {
  let i = [], l;
  return (u) => {
    o == null || o();
    const d = t == null ? void 0 : t(u);
    let h = !d || d.length !== (i == null ? void 0 : i.length);
    if (!h && d) {
      for (let w = 0; w < d.length; w++) if (d[w] !== i[w]) {
        h = !0;
        break;
      }
    }
    return n == null || n(h), h && (i = d, s == null || s(), l = e(...d ?? []), r == null || r(l)), l;
  };
};
function uf(e) {
  let t = !1;
  return () => {
    if (!t) {
      t = !0;
      return;
    }
    e();
  };
}
function Fr({ feature: e, fnName: t, objectId: n, onAfterUpdate: r, table: o, ...s }) {
  const i = () => {
    if (!r) return;
    const { schedule: a, untrack: u } = o._reactivity;
    a(() => u(() => r()));
  };
  return cf({
    ...s,
    ...{ onAfterUpdate: () => {
      i();
    } }
  });
}
function Ml(e, t = "_") {
  const [n, r] = e.split(t);
  return {
    fnKey: r,
    fnName: `${n}.${r}`,
    parentName: n
  };
}
function Nt(e, t, n) {
  for (const [r, { fn: o, memoDeps: s }] of Object.entries(n)) {
    const { fnKey: i, fnName: l } = Ml(r);
    t[i] = s ? Fr({
      memoDeps: s,
      fn: o,
      fnName: l,
      table: t,
      feature: e
    }) : o;
  }
}
function ln(e, t, n, r) {
  for (const [o, { fn: s, memoDeps: i }] of Object.entries(r)) {
    const { fnKey: l, fnName: a } = Ml(o);
    if (i) {
      const u = `_memo_${l}`;
      t[l] = function(...d) {
        if (!this[u]) {
          const h = this;
          this[u] = Fr({
            memoDeps: (w) => i(h, w),
            fn: (...w) => s(h, ...w),
            fnName: a,
            objectId: h.id,
            table: n,
            feature: e
          });
        }
        return this[u](...d);
      };
    } else t[l] = function(...u) {
      return s(this, ...u);
    };
  }
}
function xe(e, t, n, ...r) {
  var o;
  return ((o = e[t]) == null ? void 0 : o.call(e, ...r)) ?? n(e, ...r);
}
function ff(e) {
  return e.row.getValue(e.column.id);
}
function df(e) {
  return e.getValue() ?? e.table.options.renderFallbackValue;
}
function pf(e) {
  return {
    table: e.table,
    column: e.column,
    row: e.row,
    cell: e,
    getValue: () => e.getValue(),
    renderValue: () => e.renderValue()
  };
}
const gf = { assignCellPrototype: (e, t) => {
  ln("coreCellsFeature", e, t, {
    cell_getValue: { fn: (n) => ff(n) },
    cell_renderValue: { fn: (n) => df(n) },
    cell_getContext: {
      fn: (n) => pf(n),
      memoDeps: (n) => [n]
    }
  });
} };
function hf(e) {
  var t, n;
  if (!e._headerPrototype) {
    e._headerPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignHeaderPrototype) == null || n.call(t, e._headerPrototype, e);
  }
  return e._headerPrototype;
}
function Il(e, t, n) {
  const r = hf(e), o = Object.create(r);
  o.colSpan = 0, o.column = t, o.depth = n.depth, o.headerGroup = null, o.id = n.id ?? t.id, o.index = n.index, o.isPlaceholder = !!n.isPlaceholder, o.placeholderId = n.placeholderId, o.rowSpan = 0, o.subHeaders = [];
  const s = e._headerInstanceInitFns;
  for (let i = 0; i < s.length; i++) s[i](o);
  return o;
}
function vf() {
  return {
    start: [],
    end: []
  };
}
function Kt(e) {
  var r;
  const t = (r = e.table.atoms.columnVisibility) == null ? void 0 : r.get();
  if (!t) return !0;
  const n = e.columns;
  return n.length ? n.some((o) => xe(o, "getIsVisible", Kt)) : (sn(t, e.id) ? t[e.id] : void 0) ?? !0;
}
function mf(e) {
  return e.getAllLeafColumns().filter((t) => xe(t, "getIsVisible", Kt));
}
function El(e, t = 1) {
  let n = t;
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    xe(o, "getIsVisible", Kt) && o.columns.length && (n = Math.max(n, El(o.columns, t + 1)));
  }
  return n;
}
function yf(e, t) {
  return String(t);
}
function wf(e, t, n, r) {
  let o = e ?? "";
  return t && (o = o ? `${o}_${t}` : String(t)), n && (o = o ? `${o}_${n}` : n), r && (o = o ? `${o}_${r}` : r), o;
}
function bf(e, t) {
  let n = 0;
  for (let r = 0; r < e.length; r++) e[r].column === t && n++;
  return n;
}
function Al(e, t, n, r, o, s) {
  const i = {
    depth: t,
    id: yf(r, t),
    headers: []
  }, l = [];
  for (let a = 0; a < e.length; a++) {
    if (!(a in e)) continue;
    const u = e[a], d = l[l.length - 1], h = u.column.depth === i.depth;
    let w, y = !1;
    if (h && u.column.parent ? w = u.column.parent : (w = u.column, y = !0), d && d.column === w) d.subHeaders.push(u);
    else {
      const I = Il(n, w, {
        id: wf(r, t, w.id, u.id),
        isPlaceholder: y,
        placeholderId: y ? String(bf(l, w)) : void 0,
        depth: t,
        index: l.length
      });
      I.subHeaders.push(u), l.push(I);
    }
    i.headers.push(u), u.headerGroup = i;
  }
  for (let a = 0; a < s.length; a++) s[a](i);
  o.push(i), t > 0 && Al(l, t - 1, n, r, o, s);
}
function Ol(e) {
  for (let t = 0; t < e.length; t++) {
    const n = e[t];
    if (!xe(n.column, "getIsVisible", Kt)) continue;
    let r = 0;
    if (n.subHeaders.length) {
      Ol(n.subHeaders);
      for (let o = 0; o < n.subHeaders.length; o++) {
        const s = n.subHeaders[o];
        xe(s.column, "getIsVisible", Kt) && (r += s.colSpan);
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
function Ys(e, t, n, r) {
  var a;
  const o = El(e), s = [], i = n._headerGroupInstanceInitFns, l = new Array(t.length);
  for (let u = 0; u < t.length; u++)
    u in t && (l[u] = Il(n, t[u], {
      depth: o,
      index: u
    }));
  return Al(l, o - 1, n, r, s, i), s.reverse(), Ol(((a = s[0]) == null ? void 0 : a.headers) ?? []), s;
}
function _f(e) {
  var t, n;
  if (!e._columnPrototype) {
    e._columnPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignColumnPrototype) == null || n.call(t, e._columnPrototype, e);
  }
  return e._columnPrototype;
}
function xf(e, t, n, r) {
  const o = {
    ...e.getDefaultColumnDef(),
    ...t
  }, s = o.accessorKey, i = s === void 0 ? void 0 : String(s), l = o.id ?? (i == null ? void 0 : i.replaceAll(".", "_")) ?? (typeof o.header == "string" ? o.header : void 0);
  let a;
  if (o.accessorFn) a = o.accessorFn;
  else if (s !== void 0) if (typeof s == "string" && s.includes(".")) {
    const w = s.split(".");
    a = (y) => {
      let I = y;
      for (let C = 0; C < w.length; C++) {
        const T = w[C];
        I = I == null ? void 0 : I[T];
      }
      return I;
    };
  } else a = (w) => w[o.accessorKey];
  if (!l)
    throw new Error();
  const u = _f(e), d = Object.create(u);
  d.accessorFn = a, d.columnDef = o, d.columns = [], d.depth = n, d.id = `${String(l)}`, d.parent = r;
  const h = e._columnInstanceInitFns;
  for (let w = 0; w < h.length; w++) h[w](d);
  return d;
}
function Pl(e) {
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
    return Sf(e, o);
  };
}
function Sf(e, t) {
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
function Rf(e) {
  return [e, ...e.columns.flatMap((t) => t.getFlatColumns())];
}
function Cf(e) {
  if (e.columns.length) {
    const t = e.columns.flatMap((n) => n.getLeafColumns());
    return xe(e.table, "getOrderColumns", Pl)(t);
  }
  return [e];
}
function Mf(e) {
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
function Tl(e, t, n, r = 0) {
  const o = new Array(t.length);
  for (let s = 0; s < t.length; s++) {
    if (!(s in t)) continue;
    const i = t[s], l = xf(e, i, r, n), a = i;
    l.columns = a.columns ? Tl(e, a.columns, l, r + 1) : [], o[s] = l;
  }
  return o;
}
function If(e) {
  return Tl(e, e.options.columns);
}
function Ef(e) {
  return e.getAllColumns().flatMap((t) => t.getFlatColumns());
}
function Af(e) {
  const t = oe(), n = e.getAllFlatColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function Of(e) {
  const t = e.getAllColumns().flatMap((n) => n.getLeafColumns());
  return xe(e, "getOrderColumns", Pl)(t);
}
function Pf(e) {
  const t = oe(), n = e.getAllLeafColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function Tf(e, t) {
  return e.getAllFlatColumnsById()[t];
}
const Df = {
  assignColumnPrototype: (e, t) => {
    ln("coreColumnsFeature", e, t, {
      column_getFlatColumns: {
        fn: (n) => Rf(n),
        memoDeps: (n) => [n.table.options.columns]
      },
      column_getLeafColumns: {
        fn: (n) => Cf(n),
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
    Nt("coreColumnsFeature", e, {
      table_getDefaultColumnDef: {
        fn: () => Mf(e),
        memoDeps: () => [e.options.defaultColumn]
      },
      table_getAllColumns: {
        fn: () => If(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumns: {
        fn: () => Ef(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumnsById: {
        fn: () => Af(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllLeafColumns: {
        fn: () => Of(e),
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
        fn: () => Pf(e),
        memoDeps: () => [e.getAllLeafColumns()]
      },
      table_getColumn: { fn: (t) => Tf(e, t) }
    });
  }
};
function Dl(e, t) {
  for (let n = 0; n < e.subHeaders.length; n++) Dl(e.subHeaders[n], t);
  t.push(e);
}
function kf(e) {
  const t = [];
  return Dl(e, t), t;
}
function Ff(e) {
  return {
    column: e.column,
    header: e,
    table: e.column.table
  };
}
function Hf(e) {
  var u;
  const { start: t, end: n } = ((u = e.atoms.columnPinning) == null ? void 0 : u.get()) ?? vf(), r = e.getAllColumns(), o = xe(e, "getVisibleLeafColumns", mf);
  if (!t.length && !n.length) return Ys(r, o, e);
  const s = e.getAllLeafColumnsById(), i = [];
  for (let d = 0; d < t.length; d++) {
    const h = s[t[d]];
    h && xe(h, "getIsVisible", Kt) && i.push(h);
  }
  const l = [];
  for (let d = 0; d < n.length; d++) {
    const h = s[n[d]];
    h && xe(h, "getIsVisible", Kt) && l.push(h);
  }
  const a = o.filter((d) => !t.includes(d.id) && !n.includes(d.id));
  return Ys(r, [
    ...i,
    ...a,
    ...l
  ], e);
}
function jf(e) {
  return [...e.getHeaderGroups()].reverse();
}
function Lf(e) {
  const t = e.getHeaderGroups(), n = [];
  for (let r = 0; r < t.length; r++) {
    const o = t[r].headers;
    for (let s = 0; s < o.length; s++) n.push(o[s]);
  }
  return n;
}
function Kf(e) {
  var r;
  const t = ((r = e.getHeaderGroups()[0]) == null ? void 0 : r.headers) ?? [], n = [];
  for (let o = 0; o < t.length; o++) {
    const s = t[o].getLeafHeaders();
    for (let i = 0; i < s.length; i++) n.push(s[i]);
  }
  return n;
}
const Vf = {
  assignHeaderPrototype: (e, t) => {
    ln("coreHeadersFeature", e, t, {
      header_getLeafHeaders: {
        fn: (n) => kf(n),
        memoDeps: (n) => [n.column.table.options.columns]
      },
      header_getContext: {
        fn: (n) => Ff(n),
        memoDeps: (n) => [n.column.table.options.columns]
      }
    });
  },
  constructTableAPIs: (e) => {
    Nt("coreHeadersFeature", e, {
      table_getHeaderGroups: {
        fn: () => Hf(e),
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
        fn: () => jf(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getFlatHeaders: {
        fn: () => Lf(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getLeafHeaders: {
        fn: () => Kf(e),
        memoDeps: () => [e.getHeaderGroups()]
      }
    });
  }
};
function Bf(e) {
  var t, n;
  if (!e._rowPrototype) {
    e._rowPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignRowPrototype) == null || n.call(t, e._rowPrototype, e);
  }
  return e._rowPrototype;
}
const $f = (e, t, n, r, o, s, i) => {
  const l = Bf(e), a = Object.create(l);
  a._displayIndexCache = -1, a._uniqueValuesCache = oe(), a._valuesCache = oe(), a.depth = o, a.id = t, a.index = r, a.original = n, a.parentId = i, a.subRows = [];
  const u = e._rowInstanceInitFns;
  for (let d = 0; d < u.length; d++) u[d](a);
  return a;
};
function Nf() {
  return [];
}
function Wf(e, t) {
  kr(e, "cellSelection", It(e.initialState.cellSelection) ?? Nf());
}
function Uf(e) {
  e.atoms.cellSelection && (e.options.autoResetAll ?? e.options.autoResetCellSelection ?? !0) && e._reactivity.schedule(() => Wf(e));
}
function qf() {
  return oe();
}
function kl(e) {
  e.atoms.expanded && (e.options.autoResetAll ?? e.options.autoResetExpanded ?? !e.options.manualExpanding) && e._reactivity.schedule(() => Hl(e));
}
function yr(e, t) {
  var n, r;
  (r = (n = e.options).onExpandedChange) == null || r.call(n, t);
}
function Fl(e, t) {
  var r;
  const n = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t ?? !Ll(e)) {
    if (n === !0 || !jl(e)) return;
    yr(e, !0);
  } else {
    if (n !== !0 && !Object.keys(n).length) return;
    yr(e, oe());
  }
}
function Hl(e, t) {
  const n = e.initialState.expanded;
  kr(e, "expanded", t ? oe() : n === !0 ? !0 : Object.assign(oe(), It(n ?? {})));
}
function jl(e) {
  return e.getPrePaginatedRowModel().flatRows.some((t) => Vt(t));
}
function zf(e) {
  return (t) => {
    Fl(e);
  };
}
function Gf(e) {
  var n;
  const t = ((n = e.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return t === !0 || Object.values(t).some(Boolean);
}
function Ll(e) {
  var r;
  const t = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t === !0) return !0;
  if (!Object.keys(t).length) return !1;
  const n = e.getRowModel().flatRows.filter((o) => Vt(o));
  return !(!n.length || n.some((o) => !Hr(o)));
}
function Yf(e) {
  var r;
  let t = 0;
  const n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return (n === !0 ? Object.values(e.getRowModel().rowsById).filter((o) => Vt(o)).map((o) => o.id) : Object.keys(n ?? {})).forEach((o) => {
    const s = o.split(".");
    t = Math.max(t, s.length);
  }), t;
}
function Kl(e, t) {
  var s;
  const n = ((s = e.table.atoms.expanded) == null ? void 0 : s.get()) ?? {}, r = n === !0 || Po(n, e.id), o = t ?? !r;
  o !== r && (o && !Vt(e) || yr(e.table, (i) => {
    const l = i === !0 ? !0 : Po(i, e.id);
    let a = oe();
    if (i === !0 ? Object.values(e.table.getRowModel().rowsById).forEach((u) => {
      Vt(u) && (a[u.id] = !0);
    }) : a = Object.assign(oe(), i), !l && o)
      return a[e.id] = !0, a;
    if (l && !o) {
      const u = oe(), d = Object.keys(a);
      for (let h = 0; h < d.length; h++) {
        const w = d[h];
        w !== e.id && a[w] && (u[w] = !0);
      }
      return u;
    }
    return i;
  }));
}
function Hr(e) {
  var n, r, o;
  const t = ((n = e.table.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return !!(((o = (r = e.table.options).getIsRowExpanded) == null ? void 0 : o.call(r, e)) ?? (t === !0 || Po(t, e.id)));
}
function Po(e, t) {
  return !!(e && e !== !0 && sn(e, t) && e[t]);
}
function Vt(e) {
  var t, n;
  return ((n = (t = e.table.options).getRowCanExpand) == null ? void 0 : n.call(t, e)) ?? ((e.table.options.enableExpanding ?? !0) && !!e.subRows.length);
}
function Xf(e) {
  let t = !0, n = e;
  for (; t && n.parentId; )
    n = e.table.getRow(n.parentId, !0), t = Hr(n);
  return t;
}
function Jf(e) {
  const t = Vt(e);
  return () => {
    t && Kl(e);
  };
}
const To = 0;
function Zf(e) {
  var t, n;
  if (e.options.autoResetAll ?? e.options.autoResetPageIndex ?? !e.options.manualPagination) {
    if ((((n = (t = e.atoms.pagination) == null ? void 0 : t.get()) == null ? void 0 : n.pageIndex) ?? To) === To) return;
    td(e);
  }
}
function Qf(e, t) {
  kr(e, "pagination", t);
}
function ed(e, t) {
  Qf(e, (n) => {
    let r = Dr(t, n.pageIndex);
    const o = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
    return r = Math.max(0, Math.min(r, o)), {
      ...n,
      pageIndex: r
    };
  });
}
function td(e, t) {
  ed(e, To);
}
function nd(e, t) {
  kr(e, "sorting", t);
}
function rd(e, t) {
  nd(e, It(e.initialState.sorting ?? []));
}
function od(e) {
  e.atoms.sorting && (e.options.autoResetAll ?? e.options.autoResetSorting ?? !1) && rd(e);
}
function Vl() {
  return (e) => Fr({
    feature: "coreRowModelsFeature",
    table: e,
    fnName: "table.getCoreRowModel",
    memoDeps: () => [e.options.data],
    fn: () => sd(e, e.options.data),
    onAfterUpdate: uf(() => {
      kl(e), Zf(e), od(e), Uf(e);
    })
  });
}
function Bl(e, t, n, r = 0, o) {
  var i;
  const s = [];
  for (let l = 0; l < n.length; l++) {
    const a = n[l], u = $f(e, e.getRowId(a, l, o), a, l, r, void 0, o == null ? void 0 : o.id);
    t.flatRows.push(u), t.rowsById[u.id] = u, s.push(u), e.options.getSubRows && (u.originalSubRows = e.options.getSubRows(a, l), (i = u.originalSubRows) != null && i.length && (u.subRows = Bl(e, t, u.originalSubRows, r + 1, u)));
  }
  return s;
}
function sd(e, t) {
  const n = {
    rows: [],
    flatRows: [],
    rowsById: oe()
  };
  return n.rows = Bl(e, n, t), n;
}
function id(e) {
  var t, n;
  return e._rowModels.coreRowModel || (e._rowModels.coreRowModel = ((n = (t = e.options.features).coreRowModel) == null ? void 0 : n.call(t, e)) ?? Vl()(e)), e._rowModels.coreRowModel();
}
function ld(e) {
  return e.getCoreRowModel();
}
function ad(e) {
  var t, n;
  return e._rowModels.filteredRowModel || (e._rowModels.filteredRowModel = (n = (t = e.options.features).filteredRowModel) == null ? void 0 : n.call(t, e)), e.options.manualFiltering || !e._rowModels.filteredRowModel ? e.getPreFilteredRowModel() : e._rowModels.filteredRowModel();
}
function cd(e) {
  return e.getFilteredRowModel();
}
function ud(e) {
  var t, n;
  return e._rowModels.groupedRowModel || (e._rowModels.groupedRowModel = (n = (t = e.options.features).groupedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualGrouping || !e._rowModels.groupedRowModel ? e.getPreGroupedRowModel() : e._rowModels.groupedRowModel();
}
function fd(e) {
  return e.getGroupedRowModel();
}
function dd(e) {
  var t, n;
  return e._rowModels.sortedRowModel || (e._rowModels.sortedRowModel = (n = (t = e.options.features).sortedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualSorting || !e._rowModels.sortedRowModel ? e.getPreSortedRowModel() : e._rowModels.sortedRowModel();
}
function pd(e) {
  return e.getSortedRowModel();
}
function gd(e) {
  var t, n;
  return e._rowModels.expandedRowModel || (e._rowModels.expandedRowModel = (n = (t = e.options.features).expandedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualExpanding || !e._rowModels.expandedRowModel ? e.getPreExpandedRowModel() : e._rowModels.expandedRowModel();
}
function hd(e) {
  return e.getExpandedRowModel();
}
function vd(e) {
  var t, n;
  return e._rowModels.paginatedRowModel || (e._rowModels.paginatedRowModel = (n = (t = e.options.features).paginatedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualPagination || !e._rowModels.paginatedRowModel ? e.getPrePaginatedRowModel() : e._rowModels.paginatedRowModel();
}
function md(e) {
  return e.getPaginatedRowModel();
}
const yd = { constructTableAPIs: (e) => {
  Nt("coreRowModelsFeature", e, {
    table_getCoreRowModel: { fn: () => id(e) },
    table_getPreFilteredRowModel: { fn: () => ld(e) },
    table_getFilteredRowModel: { fn: () => ad(e) },
    table_getPreGroupedRowModel: { fn: () => cd(e) },
    table_getGroupedRowModel: { fn: () => ud(e) },
    table_getPreSortedRowModel: { fn: () => fd(e) },
    table_getSortedRowModel: { fn: () => dd(e) },
    table_getPreExpandedRowModel: { fn: () => pd(e) },
    table_getExpandedRowModel: { fn: () => gd(e) },
    table_getPrePaginatedRowModel: { fn: () => hd(e) },
    table_getPaginatedRowModel: { fn: () => vd(e) },
    table_getRowModel: { fn: () => md(e) }
  });
} };
function wd(e) {
  var t, n;
  if (!e._cellPrototype) {
    e._cellPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignCellPrototype) == null || n.call(t, e._cellPrototype, e);
  }
  return e._cellPrototype;
}
function bd(e, t, n) {
  const r = wd(n), o = Object.create(r);
  o.column = e, o.id = `${t.id}_${e.id}`, o.row = t;
  const s = n._cellInstanceInitFns;
  for (let i = 0; i < s.length; i++) s[i](o);
  return o;
}
function _d(e) {
  const t = e.table.getRowsInDisplayOrder(), n = e._displayIndexCache;
  return t[n] === e ? n : -1;
}
function xd(e) {
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
function Sd(e, t) {
  if (sn(e._valuesCache, t)) return e._valuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return e._valuesCache[t] = n.accessorFn(e.original, e.index), e._valuesCache[t];
}
function Rd(e, t) {
  if (sn(e._uniqueValuesCache, t)) return e._uniqueValuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return n.columnDef.getUniqueValues ? (e._uniqueValuesCache[t] = n.columnDef.getUniqueValues(e.original, e.index), e._uniqueValuesCache[t]) : (e._uniqueValuesCache[t] = [e.getValue(t)], e._uniqueValuesCache[t]);
}
function Cd(e, t) {
  return e.getValue(t) ?? e.table.options.renderFallbackValue;
}
function Md(e) {
  return af(e.subRows, (t) => t.subRows);
}
function Id(e) {
  const t = e.getCoreRowModel().flatRows;
  let n = 0;
  for (let r = 0; r < t.length; r++) n = Math.max(n, t[r].depth);
  return n;
}
function Ed(e) {
  if (e.parentId)
    return e.table.getCoreRowModel().rowsById[e.parentId] ?? e.table.getRow(e.parentId, !0);
}
function Ad(e) {
  const t = [];
  let n = e;
  for (; ; ) {
    const r = n.getParentRow();
    if (!r) break;
    t.push(r), n = r;
  }
  return t.reverse();
}
function Od(e) {
  const t = e.table.getAllLeafColumns();
  let n = e._cellsCache;
  n || (n = e._cellsCache = /* @__PURE__ */ new WeakMap());
  const r = new Array(t.length);
  for (let o = 0; o < t.length; o++) {
    const s = t[o];
    let i = n.get(s);
    i || (i = bd(s, e, e.table), n.set(s, i)), r[o] = i;
  }
  return r;
}
function Pd(e) {
  const t = oe(), n = e.getAllCells();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.column.id] = o;
  }
  return t;
}
function Td(e, t, n, r) {
  var o, s;
  return ((s = (o = t.options).getRowId) == null ? void 0 : s.call(o, e, n, r)) ?? (r ? `${r.id}.${n}` : String(n));
}
function Dd(e, t, n) {
  let r = (n ? e.getPrePaginatedRowModel() : e.getRowModel()).rowsById[t];
  if (!r && (r = e.getCoreRowModel().rowsById[t], !r))
    throw new Error();
  return r;
}
const kd = {
  assignRowPrototype: (e, t) => {
    ln("coreRowsFeature", e, t, {
      row_getDisplayIndex: { fn: (n) => _d(n) },
      row_getAllCellsByColumnId: {
        fn: (n) => Pd(n),
        memoDeps: (n) => [n.getAllCells()]
      },
      row_getAllCells: {
        fn: (n) => Od(n),
        memoDeps: (n) => [n.table.getAllLeafColumns()]
      },
      row_getLeafRows: {
        fn: (n) => Md(n),
        memoDeps: (n) => [n.subRows]
      },
      row_getParentRow: { fn: (n) => Ed(n) },
      row_getParentRows: { fn: (n) => Ad(n) },
      row_getUniqueValues: { fn: (n, r) => Rd(n, r) },
      row_getValue: { fn: (n, r) => Sd(n, r) },
      row_renderValue: { fn: (n, r) => Cd(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    Nt("coreRowsFeature", e, {
      table_getRowsInDisplayOrder: {
        fn: () => xd(e),
        memoDeps: () => {
          var t;
          return [
            e.getPrePaginatedRowModel().rows,
            e.options.paginateExpandedRows,
            e.options.paginateExpandedRows === !1 ? (t = e.atoms.expanded) == null ? void 0 : t.get() : void 0
          ];
        }
      },
      table_getRowId: { fn: (t, n, r) => Td(t, e, n, r) },
      table_getRow: { fn: (t, n) => Dd(e, t, n) },
      table_getMaxSubRowDepth: {
        fn: () => Id(e),
        memoDeps: () => [e.getCoreRowModel()]
      }
    });
  }
};
function $l(e, t, n = (r, o) => r === o) {
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
function Fd(e, t, n = (r, o) => r === o) {
  e._reactivity.batch(() => {
    var r, o;
    $l(e, t, n), (o = (r = e._reactivity).commit) == null || o.call(r);
  });
}
function Hd(e) {
  var r, o;
  const t = It(e.initialState);
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
function jd(e, t) {
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
function Ld(e, t, n) {
  const r = jd(e, Dr(t, e.options));
  e.optionsStore ? e.optionsStore.set(() => r) : e.options = r, Fd(e, r.state ?? null);
}
const Kd = { constructTableAPIs: (e) => {
  Nt("coreTablesFeature", e, {
    table_reset: { fn: () => Hd(e) },
    table_setOptions: { fn: (t) => Ld(e, t) }
  });
} }, Vd = {
  coreCellsFeature: gf,
  coreColumnsFeature: Df,
  coreHeadersFeature: Vf,
  coreRowModelsFeature: yd,
  coreRowsFeature: kd,
  coreTablesFeature: Kd
};
function Bd(e) {
  const t = e;
  return Object.defineProperty(e, "state", { get() {
    return e.get();
  } }), "set" in e && (t.setState = e.set.bind(e)), t;
}
function $d(e, t) {
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
  const n = Xs(e);
  if (n.length !== Xs(t).length) return !1;
  for (let r = 0; r < n.length; r++) if (!Object.prototype.hasOwnProperty.call(t, n[r]) || !Object.is(e[n[r]], t[n[r]])) return !1;
  return !0;
}
function Xs(e) {
  return Object.keys(e).concat(Object.getOwnPropertySymbols(e));
}
function Nd(e, t = {}) {
  return Object.values(e).forEach((n) => {
    var r;
    t = ((r = n.getInitialState) == null ? void 0 : r.call(n, t)) ?? t;
  }), It(t);
}
function Wd(e) {
  var W, fe;
  const t = e.features.coreReactivityFeature, { aggregationFns: n, columnMeta: r, coreRowModel: o, expandedRowModel: s, facetedMinMaxValues: i, facetedRowModel: l, facetedUniqueValues: a, filterFns: u, filterMeta: d, filteredRowModel: h, groupedRowModel: w, paginatedRowModel: y, sortFns: I, sortedRowModel: C, tableMeta: T, ...F } = e.features, M = {
    _cellInstanceInitFns: [],
    _columnInstanceInitFns: [],
    _features: {
      ...Vd,
      ...F
    },
    _headerGroupInstanceInitFns: [],
    _headerInstanceInitFns: [],
    _reactivity: t,
    _rowInstanceInitFns: [],
    _rowModelFns: {
      aggregationFns: n,
      filterFns: u,
      sortFns: I
    },
    _rowModels: {},
    atoms: {},
    baseAtoms: {}
  }, L = Object.values(M._features), E = {
    ...L.reduce((k, H) => {
      var G;
      return Object.assign(k, (G = H.getDefaultTableOptions) == null ? void 0 : G.call(H, M));
    }, {}),
    ...e
  };
  if (t.wrapExternalAtoms && E.atoms) for (const [k, H] of Object.entries(E.atoms)) {
    const G = H, de = t.createWritableAtom(G.get(), { debugName: `externalAtom/${k}` });
    E.atoms[k] = de;
    let se = !1;
    const ve = G.subscribe((Ie) => {
      se || de.set(Ie);
    }), Te = de.subscribe((Ie) => {
      se = !0, G.set(Ie), se = !1;
    });
    t.addSubscription(ve), t.addSubscription(Te);
  }
  t.createOptionsStore ? (M.optionsStore = t.createWritableAtom(E, { debugName: "table/optionsStore" }), Object.defineProperty(M, "options", {
    configurable: !0,
    enumerable: !0,
    get() {
      return M.optionsStore.get();
    },
    set(k) {
      M.optionsStore.set(() => k);
    }
  })) : M.options = E, M.initialState = Nd(M._features, M.options.initialState);
  const $ = Object.keys(M.initialState);
  for (let k = 0; k < $.length; k++) {
    const H = $[k];
    M.baseAtoms[H] = t.createWritableAtom(M.initialState[H], { debugName: `table/baseAtoms/${H}` }), M.atoms[H] = t.createReadonlyAtom(() => {
      var Te;
      const G = M.options, de = (Te = G.atoms) == null ? void 0 : Te[H], se = de ? de.get() : M.baseAtoms[H].get();
      if (de) return se;
      const ve = G.state;
      if (ve && sn(ve, H)) {
        const Ie = ve[H];
        return Ie === void 0 ? M.initialState[H] : Ie;
      }
      return se;
    }, { debugName: `table/atoms/${H}` });
  }
  $l(M), M.store = Bd(t.createReadonlyAtom(() => {
    const k = {};
    for (let H = 0; H < $.length; H++) {
      const G = $[H];
      k[G] = M.atoms[G].get();
    }
    return k;
  }, {
    compare: $d,
    debugName: "table/store"
  }));
  for (let k = 0; k < L.length; k++) {
    const H = L[k];
    (W = H.initTableInstanceData) == null || W.call(H, M), H.initCellInstanceData && M._cellInstanceInitFns.push(H.initCellInstanceData.bind(H)), H.initColumnInstanceData && M._columnInstanceInitFns.push(H.initColumnInstanceData.bind(H)), H.initHeaderGroupInstanceData && M._headerGroupInstanceInitFns.push(H.initHeaderGroupInstanceData.bind(H)), H.initHeaderInstanceData && M._headerInstanceInitFns.push(H.initHeaderInstanceData.bind(H)), H.initRowInstanceData && M._rowInstanceInitFns.push(H.initRowInstanceData.bind(H)), (fe = H.constructTableAPIs) == null || fe.call(H, M);
  }
  return M;
}
const Ud = {
  getInitialState: (e) => ({
    expanded: qf(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onExpandedChange: Rl("expanded", e),
    paginateExpandedRows: !0
  }),
  assignRowPrototype: (e, t) => {
    ln("rowExpandingFeature", e, t, {
      row_toggleExpanded: { fn: (n, r) => Kl(n, r) },
      row_getIsExpanded: { fn: (n) => Hr(n) },
      row_getCanExpand: { fn: (n) => Vt(n) },
      row_getIsAllParentsExpanded: { fn: (n) => Xf(n) },
      row_getToggleExpandedHandler: { fn: (n) => Jf(n) }
    });
  },
  constructTableAPIs: (e) => {
    Nt("rowExpandingFeature", e, {
      table_autoResetExpanded: { fn: () => kl(e) },
      table_setExpanded: { fn: (t) => yr(e, t) },
      table_toggleAllRowsExpanded: { fn: (t) => Fl(e, t) },
      table_resetExpanded: { fn: (t) => Hl(e, t) },
      table_getCanSomeRowsExpand: { fn: () => jl(e) },
      table_getToggleAllRowsExpandedHandler: { fn: () => zf(e) },
      table_getIsSomeRowsExpanded: { fn: () => Gf(e) },
      table_getIsAllRowsExpanded: { fn: () => Ll(e) },
      table_getExpandedDepth: { fn: () => Yf(e) }
    });
  }
};
function qd() {
  return oe();
}
function an(e, t) {
  var n, r;
  (r = (n = e.options).onRowSelectionChange) == null || r.call(n, t);
}
function zd(e, t) {
  e._lastSelectedRowId = null, an(e, t ? oe() : Object.assign(oe(), It(e.initialState.rowSelection ?? {})));
}
function Nl(e, t, n) {
  e._lastSelectedRowId = null, an(e, (r) => {
    if (t = typeof t < "u" ? t : !xe(e, "getIsAllRowsSelected", ql), n != null && n.deselectAll && !t) return oe();
    const o = Object.assign(oe(), r), s = e.getPreGroupedRowModel().flatRows;
    if (t) {
      const i = /* @__PURE__ */ new Map();
      s.forEach((l) => {
        wr(l, i) && (o[l.id] = !0);
      });
    } else s.forEach((i) => {
      gt(i) && delete o[i.id];
    });
    return o;
  });
}
function Wl(e, t, n) {
  e._lastSelectedRowId = null, an(e, (r) => {
    const o = typeof t < "u" ? t : !xe(e, "getIsAllPageRowsSelected", zl);
    if (n != null && n.deselectAll && !o) return oe();
    const s = Object.assign(oe(), r);
    return e.getRowModel().rows.forEach((i) => {
      Lr(s, i.id, o, !0, e, !0);
    }), s;
  });
}
function Gd(e) {
  return e.getCoreRowModel();
}
function Yd(e) {
  const t = e.getCoreRowModel();
  return xe(e, "getIsSomeRowsSelected", jr) ? ts(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: oe()
  };
}
function Xd(e) {
  const t = e.getFilteredRowModel();
  return xe(e, "getIsSomeRowsSelected", jr) ? ts(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: oe()
  };
}
function Jd(e) {
  const t = e.getSortedRowModel();
  return xe(e, "getIsSomeRowsSelected", jr) ? ts(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: oe()
  };
}
function Ul(e) {
  var t;
  return Object.keys(((t = e.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function ql(e) {
  var o;
  const t = e.getFilteredRowModel().flatRows, n = ((o = e.atoms.rowSelection) == null ? void 0 : o.get()) ?? {};
  let r = !!(t.length && Object.keys(n).length);
  if (r) {
    const s = /* @__PURE__ */ new Map();
    t.some((i) => !jn(i, n) && wr(i, s)) && (r = !1);
  }
  return r;
}
function zl(e) {
  var s;
  const t = e.getPaginatedRowModel().flatRows, n = ((s = e.atoms.rowSelection) == null ? void 0 : s.get()) ?? {}, r = /* @__PURE__ */ new Map();
  let o = !1;
  for (let i = 0; i < t.length; i++) {
    const l = t[i];
    if (jn(l, n))
      !o && wr(l, r) && (o = !0);
    else if (wr(l, r)) return !1;
  }
  return o;
}
function jr(e) {
  return xe(e, "getSelectedRowIds", Ul).length > 0;
}
function Zd(e) {
  return e.getPaginatedRowModel().flatRows.filter((t) => gt(t)).some((t) => Qo(t) || xe(t, "getIsSomeSelected", Yl));
}
function Qd(e) {
  return (t) => {
    Nl(e, t.target.checked);
  };
}
function ep(e) {
  return (t) => {
    Wl(e, t.target.checked);
  };
}
function Gl(e, t, n) {
  const r = Qo(e);
  an(e.table, (o) => {
    t = typeof t < "u" ? t : !r;
    const s = Object.assign(oe(), o);
    return Lr(s, e.id, t, ((n == null ? void 0 : n.selectChildren) ?? !0) && Lt(e), e.table), !t && (n != null && n.deselectParents) && Xl(s, e), s;
  });
}
function Qo(e) {
  var t;
  return jn(e, ((t = e.table.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function Yl(e) {
  return ns(e) === "some";
}
function tp(e) {
  return ns(e) === "all";
}
function gt(e) {
  const t = e.table.options;
  return typeof t.enableRowSelection == "function" ? t.enableRowSelection(e) : t.enableRowSelection ?? !0;
}
function es(e) {
  const t = e.table.options;
  return typeof t.enableSubRowSelection == "function" ? t.enableSubRowSelection(e) : t.enableSubRowSelection ?? !0;
}
function Lt(e) {
  const t = e.table.options;
  return typeof t.enableMultiRowSelection == "function" ? t.enableMultiRowSelection(e) : t.enableMultiRowSelection ?? !0;
}
function np(e, t) {
  const n = gt(e);
  return (r) => {
    var a, u;
    if (!n) return;
    const o = r, s = e.table, i = o.target.checked, l = s._lastSelectedRowId;
    (!(s.options.enableRowRangeSelection !== !1 && l !== null && Lt(e) && (((u = (a = s.options).isRowRangeSelectionEvent) == null ? void 0 : u.call(a, r)) ?? !1)) || !rp(e, l, i, t)) && Gl(e, i, t), s._lastSelectedRowId = e.id;
  };
}
function rp(e, t, n, r) {
  const o = (r == null ? void 0 : r.selectChildren) ?? !0, s = e.table, i = s.getRowsInDisplayOrder(), l = s.getPrePaginatedRowModel().rowsById[t] ?? s.getCoreRowModel().rowsById[t];
  if (!l) return !1;
  const a = l.getDisplayIndex(), u = e.getDisplayIndex(), d = i[a], h = i[u];
  if (a < 0 || u < 0 || a >= i.length || u >= i.length || (d == null ? void 0 : d.id) !== l.id || (h == null ? void 0 : h.id) !== e.id || !Lt(l) || !Lt(e)) return !1;
  const w = Math.min(a, u), y = Math.max(a, u);
  return an(s, (I) => {
    const C = Object.assign(oe(), I);
    for (let T = w; T <= y; T++) {
      const F = i[T];
      !gt(F) || !Lt(F) || (Lr(C, F.id, n, o, s), !n && (r != null && r.deselectParents) && Xl(C, F));
    }
    return C;
  }), !0;
}
function Lr(e, t, n, r, o, s) {
  const i = o.getRow(t, !0);
  n ? (Lt(i) || Object.keys(e).forEach((l) => delete e[l]), gt(i) && (e[t] = !0)) : (!s || gt(i)) && delete e[t], r && i.subRows.length && es(i) && i.subRows.forEach((l) => Lr(e, l.id, n, r, o, s));
}
function wr(e, t) {
  if (!gt(e)) return !1;
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
    const d = s[a] ?? n.getRow(a, !0);
    if (!es(d)) {
      l = !1;
      break;
    }
    a = d.parentId;
  }
  return i.forEach((u) => t.set(u, l)), l;
}
function Xl(e, t) {
  const n = t.table.getCoreRowModel().rowsById;
  let r = t.parentId;
  for (; r !== void 0; )
    delete e[r], r = (n[r] ?? t.table.getRow(r, !0)).parentId;
}
function Jl(e, t, n, r) {
  const o = [];
  for (let s = 0; s < e.length; s++) {
    const i = e[s], l = jn(i, t);
    if (l && (n.push(i), r[i.id] = i), i.subRows.length) {
      const a = Jl(i.subRows, t, n, r);
      if (l) {
        const u = Object.create(Object.getPrototypeOf(i));
        of(u, i), u.subRows = a, o.push(u);
      }
    } else l && o.push(i);
  }
  return o;
}
function ts(e, t) {
  var s;
  const n = [], r = oe(), o = ((s = t.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  return {
    rows: Jl(e.rows, o, n, r),
    flatRows: n,
    rowsById: r
  };
}
function jn(e, t) {
  return !!(sn(t, e.id) && t[e.id]);
}
function ns(e) {
  var s;
  if (!e.subRows.length) return !1;
  const t = ((s = e.table.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  let n = !1, r = !0, o = !1;
  for (let i = 0; i < e.subRows.length; i++) {
    const l = e.subRows[i];
    if (n && !r) break;
    if (gt(l) && (o = !0, jn(l, t) ? n = !0 : r = !1), l.subRows.length) {
      const a = ns(l);
      a === "all" ? (n = !0, o = !0) : a === "some" ? (n = !0, r = !1, o = !0) : r = !1;
    }
  }
  return o ? r ? "all" : n ? "some" : !1 : !1;
}
const op = {
  initTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  resetTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  getInitialState: (e) => ({
    rowSelection: qd(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onRowSelectionChange: Rl("rowSelection", e),
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
    ln("rowSelectionFeature", e, t, {
      row_toggleSelected: { fn: (n, r, o) => Gl(n, r, o) },
      row_getIsSelected: { fn: (n) => Qo(n) },
      row_getIsSomeSelected: {
        fn: (n) => Yl(n),
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
        fn: (n) => tp(n),
        memoDeps: (n) => {
          var r;
          return [
            n.subRows,
            (r = n.table.atoms.rowSelection) == null ? void 0 : r.get(),
            n.table.options.enableRowSelection
          ];
        }
      },
      row_getCanSelect: { fn: (n) => gt(n) },
      row_getCanSelectSubRows: { fn: (n) => es(n) },
      row_getCanMultiSelect: { fn: (n) => Lt(n) },
      row_getToggleSelectedHandler: { fn: (n, r) => np(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    Nt("rowSelectionFeature", e, {
      table_setRowSelection: { fn: (t) => an(e, t) },
      table_resetRowSelection: { fn: (t) => zd(e, t) },
      table_toggleAllRowsSelected: { fn: (t, n) => Nl(e, t, n) },
      table_toggleAllPageRowsSelected: { fn: (t, n) => Wl(e, t, n) },
      table_getPreSelectedRowModel: { fn: () => Gd(e) },
      table_getSelectedRowModel: {
        fn: () => Yd(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getCoreRowModel()];
        }
      },
      table_getFilteredSelectedRowModel: {
        fn: () => Xd(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getFilteredRowModel()];
        }
      },
      table_getGroupedSelectedRowModel: {
        fn: () => Jd(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getSortedRowModel()];
        }
      },
      table_getSelectedRowIds: {
        fn: () => Ul(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get()];
        }
      },
      table_getIsAllRowsSelected: {
        fn: () => ql(e),
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
        fn: () => zl(e),
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
        fn: () => jr(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get()];
        }
      },
      table_getIsSomePageRowsSelected: {
        fn: () => Zd(e),
        memoDeps: () => {
          var t;
          return [
            (t = e.atoms.rowSelection) == null ? void 0 : t.get(),
            e.getPaginatedRowModel(),
            e.options.enableRowSelection
          ];
        }
      },
      table_getToggleAllRowsSelectedHandler: { fn: () => Qd(e) },
      table_getToggleAllPageRowsSelectedHandler: { fn: () => ep(e) }
    });
  }
};
function sp() {
  return (e) => {
    const t = e;
    return Fr({
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
      fn: () => ip(t)
    });
  };
}
function ip(e) {
  var r;
  const t = e.getPreExpandedRowModel(), n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return !t.rows.length || n !== !0 && !Object.keys(n ?? {}).length || !e.options.paginateExpandedRows && !e.options.manualPagination ? t : lp(t);
}
function lp(e) {
  const t = [], n = (r) => {
    t.push(r), r.subRows.length && Hr(r) && r.subRows.forEach(n);
  };
  return e.rows.forEach(n), {
    rows: t,
    flatRows: e.flatRows,
    rowsById: e.rowsById
  };
}
function Js(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = Ht(e[n]);
  return Oo(e, t);
}
function ap(e) {
  return Object.keys(e).map((t) => Ht(e[t]));
}
function cp(e) {
  const t = (l, a) => {
    l.setOptions((u) => qs(u, Js(a)));
  }, n = rf(), r = Oo(e, { features: {
    coreReactivityFeature: n,
    ...Ht(e.features) ?? {}
  } }), o = Oo(Js(r), { mergeOptions: (l, a) => qs(l, a) }), s = Wd(o), i = s;
  return Ri() && Na(() => {
    var l;
    return (l = n.unmount) == null ? void 0 : l.call(n);
  }), _e(() => ap(r), () => {
    t(s, r);
  }, { immediate: !0 }), _e(() => {
    const l = Ht(e.state), a = Ht(e.atoms);
    if (!l) return [];
    const u = [];
    for (const d of Object.keys(i.initialState))
      !(d in l) || (a == null ? void 0 : a[d]) !== void 0 || u.push(l[d]);
    return u;
  }, (l) => {
    l.length > 0 && t(s, r);
  }, { immediate: !0 }), i.Subscribe = (l) => l.children(i.atoms), i;
}
function Kr() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return function() {
    t.forEach(function(o) {
      return o();
    });
  };
}
function up(e) {
  if (Array.isArray(e)) return e;
}
function fp(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r, o, s, i, l = [], a = !0, u = !1;
    try {
      if (s = (n = n.call(e)).next, t !== 0) for (; !(a = (r = s.call(n)).done) && (l.push(r.value), l.length !== t); a = !0) ;
    } catch (d) {
      u = !0, o = d;
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
function Do(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Zl(e, t) {
  if (e) {
    if (typeof e == "string") return Do(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Do(e, t) : void 0;
  }
}
function dp() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Ql(e, t) {
  return up(e) || fp(e, t) || Zl(e, t) || dp();
}
var Zs = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Bt = {}, Ln = {};
Object.defineProperty(Ln, "__esModule", { value: !0 });
Ln.bind = void 0;
function pp(e, t) {
  var n = t.type, r = t.listener, o = t.options;
  return e.addEventListener(n, r, o), function() {
    e.removeEventListener(n, r, o);
  };
}
Ln.bind = pp;
var Vr = {}, Zt = Zs && Zs.__assign || function() {
  return Zt = Object.assign || function(e) {
    for (var t, n = 1, r = arguments.length; n < r; n++) {
      t = arguments[n];
      for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    }
    return e;
  }, Zt.apply(this, arguments);
};
Object.defineProperty(Vr, "__esModule", { value: !0 });
Vr.bindAll = void 0;
var gp = Ln;
function Qs(e) {
  if (!(typeof e > "u"))
    return typeof e == "boolean" ? {
      capture: e
    } : e;
}
function hp(e, t) {
  if (t == null)
    return e;
  var n = Zt(Zt({}, e), { options: Zt(Zt({}, Qs(t)), Qs(e.options)) });
  return n;
}
function vp(e, t, n) {
  var r = t.map(function(o) {
    var s = hp(o, n);
    return (0, gp.bind)(e, s);
  });
  return function() {
    r.forEach(function(s) {
      return s();
    });
  };
}
Vr.bindAll = vp;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.bindAll = e.bind = void 0;
  var t = Ln;
  Object.defineProperty(e, "bind", { enumerable: !0, get: function() {
    return t.bind;
  } });
  var n = Vr;
  Object.defineProperty(e, "bindAll", { enumerable: !0, get: function() {
    return n.bindAll;
  } });
})(Bt);
var ea = "data-pdnd-honey-pot";
function ta(e) {
  return e instanceof Element && e.hasAttribute(ea);
}
function na(e) {
  var t = document.elementsFromPoint(e.x, e.y), n = Ql(t, 2), r = n[0], o = n[1];
  return r ? ta(r) ? o ?? null : r : null;
}
function Tn(e) {
  "@babel/helpers - typeof";
  return Tn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Tn(e);
}
function mp(e, t) {
  if (Tn(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Tn(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function yp(e) {
  var t = mp(e, "string");
  return Tn(t) == "symbol" ? t : t + "";
}
function Kn(e, t, n) {
  return (t = yp(t)) in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var wp = 2147483647, bp = {
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
function Wt(e) {
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
var fo = Wt(function() {
  return typeof HTMLElement < "u" && typeof HTMLElement.prototype.showPopover == "function";
});
function ei(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function ti(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ei(Object(n), !0).forEach(function(r) {
      Kn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ei(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
var Dn = 2, ni = Dn / 2;
function _p(e) {
  return {
    x: Math.floor(e.x),
    y: Math.floor(e.y)
  };
}
function xp(e) {
  return {
    x: e.x - ni,
    y: e.y - ni
  };
}
function Sp(e) {
  return {
    x: Math.max(e.x, 0),
    y: Math.max(e.y, 0)
  };
}
function Rp(e) {
  return {
    x: Math.min(e.x, window.innerWidth - Dn),
    y: Math.min(e.y, window.innerHeight - Dn)
  };
}
function ri(e) {
  var t = e.client, n = Rp(Sp(xp(_p(t))));
  return DOMRect.fromRect({
    x: n.x,
    y: n.y,
    width: Dn,
    height: Dn
  });
}
function oi(e) {
  var t = e.clientRect;
  return {
    left: "".concat(t.left, "px"),
    top: "".concat(t.top, "px"),
    width: "".concat(t.width, "px"),
    height: "".concat(t.height, "px")
  };
}
function Cp(e) {
  var t = e.client, n = e.clientRect;
  return (
    // is within horizontal bounds
    t.x >= n.x && t.x <= n.x + n.width && // is within vertical bounds
    t.y >= n.y && t.y <= n.y + n.height
  );
}
function Mp(e) {
  var t = e.initial, n = document.createElement("div");
  n.setAttribute(ea, "true"), fo() && n.setAttribute("popover", "manual");
  var r = ri({
    client: t
  });
  Object.assign(n.style, ti(ti({
    position: "fixed"
  }, fo() ? (
    // needs to come first as it has 'inset: unset' which
    // needs to be overridden by our top / left values
    bp
  ) : {
    // Fallback: using maximum possible z-index so that this element
    // will always be on top of other positioned content.
    zIndex: wp
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
  }, oi({
    clientRect: r
  }))), document.body.appendChild(n), fo() && n.showPopover();
  var o = Bt.bind(window, {
    type: "pointermove",
    listener: function(i) {
      var l = {
        x: i.clientX,
        y: i.clientY
      };
      r = ri({
        client: l
      }), Object.assign(n.style, oi({
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
    if (o(), Cp({
      client: l,
      clientRect: r
    })) {
      n.remove();
      return;
    }
    function a() {
      u(), n.remove();
    }
    var u = Bt.bindAll(window, [
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
function Ip() {
  var e = null;
  function t() {
    return e = null, Bt.bind(window, {
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
        r = Mp({
          initial: u
        });
      }
      if (i === "onDrop") {
        var d, h = l.location.current.input;
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
function Ep(e) {
  if (Array.isArray(e)) return Do(e);
}
function Ap(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function Op() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ra(e) {
  return Ep(e) || Ap(e) || Zl(e) || Op();
}
var Pp = Wt(function() {
  return navigator.userAgent.includes("Firefox");
}), rs = Wt(function() {
  var t = navigator, n = t.userAgent;
  return n.includes("AppleWebKit") && !n.includes("Chrome");
});
function Tp(e) {
  return "nodeName" in e;
}
function Dp(e) {
  return Tp(e) && e.ownerDocument !== document;
}
var ko = {
  isLeavingWindow: Symbol("leaving"),
  isEnteringWindow: Symbol("entering")
};
(function() {
  if (typeof window > "u" || !rs())
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
  Bt.bindAll(
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
        !n.isOverWindow && n.enterCount === 0 && (s[ko.isEnteringWindow] = !0), n.isOverWindow = !0, n.enterCount++;
      }
    }, {
      type: "dragleave",
      listener: function(s) {
        n.enterCount--, n.isOverWindow && n.enterCount === 0 && (s[ko.isLeavingWindow] = !0, n.isOverWindow = !1);
      }
    }],
    // using `capture: true` so that adding event listeners
    // in bubble phase will have the correct symbols
    {
      capture: !0
    }
  );
})();
function kp(e) {
  var t = e.dragLeave;
  return rs() ? t.hasOwnProperty(ko.isLeavingWindow) : !1;
}
function Fp(e) {
  var t = e.dragLeave, n = t.type, r = t.relatedTarget;
  return n !== "dragleave" ? !1 : rs() ? kp({
    dragLeave: t
  }) : r == null ? !0 : Pp() ? Dp(r) : r instanceof HTMLIFrameElement;
}
function Hp(e) {
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
function Cn(e) {
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
var jp = function(t) {
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
}, po = jp(function(e) {
  return e();
}), rr = /* @__PURE__ */ function() {
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
function Lp(e) {
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
      var u = a.nativeSetDragImage, d = {
        current: n,
        previous: o,
        initial: n
      };
      s({
        eventName: "onGenerateDragPreview",
        payload: {
          source: t,
          location: d,
          nativeSetDragImage: u
        }
      }), rr.schedule(function() {
        s({
          eventName: "onDragStart",
          payload: {
            source: t,
            location: d
          }
        });
      });
    },
    dragUpdate: function(a) {
      var u = a.current;
      rr.flush(), po.cancel(), s({
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
      po(function() {
        rr.flush();
        var d = {
          initial: n,
          previous: o,
          current: u
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
    drop: function(a) {
      var u = a.current, d = a.updatedSourcePayload;
      rr.flush(), po.cancel(), s({
        eventName: "onDrop",
        payload: {
          source: d ?? t,
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
var Fo = {
  isActive: !1
};
function oa() {
  return !Fo.isActive;
}
function Kp(e) {
  return e.dataTransfer ? e.dataTransfer.setDragImage.bind(e.dataTransfer) : null;
}
function Vp(e) {
  var t = e.current, n = e.next;
  if (t.length !== n.length)
    return !0;
  for (var r = 0; r < t.length; r++)
    if (t[r].element !== n[r].element)
      return !0;
  return !1;
}
function Bp(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = e.dispatchEvent;
  if (!oa())
    return;
  var s = $p({
    event: t,
    dragType: n,
    getDropTargetsOver: r
  });
  Fo.isActive = !0;
  var i = {
    current: s
  };
  go({
    event: t,
    current: s.dropTargets
  });
  var l = Lp({
    source: n.payload,
    dispatchEvent: o,
    initial: s
  });
  function a(y) {
    var I = Vp({
      current: i.current.dropTargets,
      next: y.dropTargets
    });
    i.current = y, I && l.dragUpdate({
      current: i.current
    });
  }
  function u(y) {
    var I = Cn(y), C = ta(y.target) ? na({
      x: I.clientX,
      y: I.clientY
    }) : y.target, T = r({
      target: C,
      input: I,
      source: n.payload,
      current: i.current.dropTargets
    });
    T.length && (y.preventDefault(), go({
      event: y,
      current: T
    })), a({
      dropTargets: T,
      input: I
    });
  }
  function d() {
    i.current.dropTargets.length && a({
      dropTargets: [],
      input: i.current.input
    }), l.drop({
      current: i.current,
      updatedSourcePayload: null
    }), h();
  }
  function h() {
    Fo.isActive = !1, w();
  }
  var w = Bt.bindAll(
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
        u(I), l.drag({
          current: i.current
        });
      }
    }, {
      type: "dragenter",
      listener: u
    }, {
      type: "dragleave",
      listener: function(I) {
        Fp({
          dragLeave: I
        }) && (a({
          input: i.current.input,
          dropTargets: []
        }), n.startedFrom === "external" && d());
      }
    }, {
      // A "drop" can only happen if the browser allowed the drop
      type: "drop",
      listener: function(I) {
        if (i.current = {
          dropTargets: i.current.dropTargets,
          input: Cn(I)
        }, !i.current.dropTargets.length) {
          d();
          return;
        }
        I.preventDefault(), go({
          event: I,
          current: i.current.dropTargets
        }), l.drop({
          current: i.current,
          // When dropping something native, we need to extract the latest
          // `.items` from the "drop" event as it is now accessible
          updatedSourcePayload: n.type === "external" ? n.getDropPayload(I) : null
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
      listener: function(I) {
        i.current = {
          dropTargets: i.current.dropTargets,
          input: Cn(I)
        }, d();
      }
    }].concat(ra(Hp({
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
  l.start({
    nativeSetDragImage: Kp(t)
  });
}
function go(e) {
  var t, n = e.event, r = e.current, o = (t = r[0]) === null || t === void 0 ? void 0 : t.dropEffect;
  o != null && n.dataTransfer && (n.dataTransfer.dropEffect = o);
}
function $p(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = Cn(t);
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
var si = {
  canStart: oa,
  start: Bp
}, Ho = /* @__PURE__ */ new Map();
function Np(e) {
  var t = e.typeKey, n = e.mount, r = Ho.get(t);
  if (r)
    return r.usageCount++, r;
  var o = {
    typeKey: t,
    unmount: n(),
    usageCount: 1
  };
  return Ho.set(t, o), o;
}
function Wp(e) {
  var t = Np(e);
  return function() {
    t.usageCount--, !(t.usageCount > 0) && (t.unmount(), Ho.delete(e.typeKey));
  };
}
function sa(e, t) {
  var n = t.attribute, r = t.value;
  return e.setAttribute(n, r), function() {
    return e.removeAttribute(n);
  };
}
function ii(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function xt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ii(Object(n), !0).forEach(function(r) {
      Kn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ii(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function ho(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = Up(e)) || t) {
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
function Up(e, t) {
  if (e) {
    if (typeof e == "string") return li(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? li(e, t) : void 0;
  }
}
function li(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function vo(e) {
  return e.slice(0).reverse();
}
function qp(e) {
  var t = e.typeKey, n = e.defaultDropEffect, r = /* @__PURE__ */ new WeakMap(), o = "data-drop-target-for-".concat(t), s = "[".concat(o, "]");
  function i(y) {
    return r.set(y.element, y), function() {
      return r.delete(y.element);
    };
  }
  function l(y) {
    var I = Kr(sa(y.element, {
      attribute: o,
      value: "true"
    }), i(y));
    return Wt(I);
  }
  function a(y) {
    var I, C, T, F, M = y.source, L = y.target, E = y.input, $ = y.result, W = $ === void 0 ? [] : $;
    if (L == null)
      return W;
    if (!(L instanceof Element))
      return L instanceof Node ? a({
        source: M,
        target: L.parentElement,
        input: E,
        result: W
      }) : W;
    var fe = L.closest(s);
    if (fe == null)
      return W;
    var k = r.get(fe);
    if (k == null)
      return W;
    var H = {
      input: E,
      source: M,
      element: k.element
    };
    if (k.canDrop && !k.canDrop(H))
      return a({
        source: M,
        target: k.element.parentElement,
        input: E,
        result: W
      });
    var G = (I = (C = k.getData) === null || C === void 0 ? void 0 : C.call(k, H)) !== null && I !== void 0 ? I : {}, de = (T = (F = k.getDropEffect) === null || F === void 0 ? void 0 : F.call(k, H)) !== null && T !== void 0 ? T : n, se = {
      data: G,
      element: k.element,
      dropEffect: de,
      // we are collecting _actual_ drop targets, so these are
      // being applied _not_ due to stickiness
      isActiveDueToStickiness: !1
    };
    return a({
      source: M,
      target: k.element.parentElement,
      input: E,
      // Using bubble ordering. Same ordering as `event.getPath()`
      result: [].concat(ra(W), [se])
    });
  }
  function u(y) {
    var I = y.eventName, C = y.payload, T = ho(C.location.current.dropTargets), F;
    try {
      for (T.s(); !(F = T.n()).done; ) {
        var M, L = F.value, E = r.get(L.element), $ = xt(xt({}, C), {}, {
          self: L
        });
        E == null || (M = E[I]) === null || M === void 0 || M.call(
          E,
          // I cannot seem to get the types right here.
          // TS doesn't seem to like that one event can need `nativeSetDragImage`
          // @ts-expect-error
          $
        );
      }
    } catch (W) {
      T.e(W);
    } finally {
      T.f();
    }
  }
  var d = {
    onGenerateDragPreview: u,
    onDrag: u,
    onDragStart: u,
    onDrop: u,
    onDropTargetChange: function(I) {
      var C = I.payload, T = new Set(C.location.current.dropTargets.map(function(X) {
        return X.element;
      })), F = /* @__PURE__ */ new Set(), M = ho(C.location.previous.dropTargets), L;
      try {
        for (M.s(); !(L = M.n()).done; ) {
          var E, $ = L.value;
          F.add($.element);
          var W = r.get($.element), fe = T.has($.element), k = xt(xt({}, C), {}, {
            self: $
          });
          if (W == null || (E = W.onDropTargetChange) === null || E === void 0 || E.call(W, k), !fe) {
            var H;
            W == null || (H = W.onDragLeave) === null || H === void 0 || H.call(W, k);
          }
        }
      } catch (X) {
        M.e(X);
      } finally {
        M.f();
      }
      var G = ho(C.location.current.dropTargets), de;
      try {
        for (G.s(); !(de = G.n()).done; ) {
          var se, ve, Te = de.value;
          if (!F.has(Te.element)) {
            var Ie = xt(xt({}, C), {}, {
              self: Te
            }), te = r.get(Te.element);
            te == null || (se = te.onDropTargetChange) === null || se === void 0 || se.call(te, Ie), te == null || (ve = te.onDragEnter) === null || ve === void 0 || ve.call(te, Ie);
          }
        }
      } catch (X) {
        G.e(X);
      } finally {
        G.f();
      }
    }
  };
  function h(y) {
    d[y.eventName](y);
  }
  function w(y) {
    var I = y.source, C = y.target, T = y.input, F = y.current, M = a({
      source: I,
      target: C,
      input: T
    });
    if (M.length >= F.length)
      return M;
    for (var L = vo(F), E = vo(M), $ = [], W = 0; W < L.length; W++) {
      var fe, k = L[W], H = E[W];
      if (H != null) {
        $.push(H);
        continue;
      }
      var G = $[W - 1], de = L[W - 1];
      if ((G == null ? void 0 : G.element) !== (de == null ? void 0 : de.element))
        break;
      var se = r.get(k.element);
      if (!se)
        break;
      var ve = {
        input: T,
        source: I,
        element: se.element
      };
      if (se.canDrop && !se.canDrop(ve) || !((fe = se.getIsSticky) !== null && fe !== void 0 && fe.call(se, ve)))
        break;
      $.push(xt(xt({}, k), {}, {
        // making it clear to consumers this drop target is active due to stickiness
        isActiveDueToStickiness: !0
      }));
    }
    return vo($);
  }
  return {
    dropTargetForConsumers: l,
    getIsOver: w,
    dispatchEvent: h
  };
}
function zp(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = Gp(e)) || t) {
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
function Gp(e, t) {
  if (e) {
    if (typeof e == "string") return ai(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? ai(e, t) : void 0;
  }
}
function ai(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function ci(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Yp(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ci(Object(n), !0).forEach(function(r) {
      Kn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ci(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Xp() {
  var e = /* @__PURE__ */ new Set(), t = null;
  function n(s) {
    t && (!s.canMonitor || s.canMonitor(t.canMonitorArgs)) && t.active.add(s);
  }
  function r(s) {
    var i = Yp({}, s);
    e.add(i), n(i);
    function l() {
      e.delete(i), t && t.active.delete(i);
    }
    return Wt(l);
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
      var a = zp(e), u;
      try {
        for (a.s(); !(u = a.n()).done; ) {
          var d = u.value;
          n(d);
        }
      } catch (T) {
        a.e(T);
      } finally {
        a.f();
      }
    }
    if (t) {
      for (var h = Array.from(t.active), w = 0, y = h; w < y.length; w++) {
        var I = y[w];
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
function Jp(e) {
  var t = e.typeKey, n = e.mount, r = e.dispatchEventToSource, o = e.onPostDispatch, s = e.defaultDropEffect, i = Xp(), l = qp({
    typeKey: t,
    defaultDropEffect: s
  });
  function a(h) {
    r == null || r(h), l.dispatchEvent(h), i.dispatchEvent(h), o == null || o(h);
  }
  function u(h) {
    var w = h.event, y = h.dragType;
    si.start({
      event: w,
      dragType: y,
      getDropTargetsOver: l.getIsOver,
      dispatchEvent: a
    });
  }
  function d() {
    function h() {
      var w = {
        canStart: si.canStart,
        start: u
      };
      return n(w);
    }
    return Wp({
      typeKey: t,
      mount: h
    });
  }
  return {
    registerUsage: d,
    dropTarget: l.dropTargetForConsumers,
    monitor: i.monitorForConsumers
  };
}
var Zp = Wt(function() {
  return navigator.userAgent.toLocaleLowerCase().includes("android");
}), Qp = "pdnd:android-fallback", ui = "text/plain", eg = "text/uri-list", tg = "application/vnd.pdnd", br = /* @__PURE__ */ new WeakMap();
function ng(e) {
  return br.set(e.element, e), function() {
    br.delete(e.element);
  };
}
var fi = Ip(), ia = Jp({
  typeKey: "element",
  defaultDropEffect: "move",
  mount: function(t) {
    return Kr(fi.bindEvents(), Bt.bind(document, {
      type: "dragstart",
      listener: function(r) {
        var o, s, i, l, a, u;
        if (t.canStart(r) && !r.defaultPrevented && r.dataTransfer) {
          var d = r.target;
          if (d instanceof HTMLElement) {
            var h = br.get(d);
            if (h) {
              var w = Cn(r), y = {
                element: h.element,
                dragHandle: (o = h.dragHandle) !== null && o !== void 0 ? o : null,
                input: w
              };
              if (h.canDrag && !h.canDrag(y)) {
                r.preventDefault();
                return;
              }
              if (h.dragHandle) {
                var I = na({
                  x: w.clientX,
                  y: w.clientY
                });
                if (!h.dragHandle.contains(I)) {
                  r.preventDefault();
                  return;
                }
              }
              var C = (s = (i = h.getInitialDataForExternal) === null || i === void 0 ? void 0 : i.call(h, y)) !== null && s !== void 0 ? s : null;
              if (C)
                for (var T = 0, F = Object.entries(C); T < F.length; T++) {
                  var M = Ql(F[T], 2), L = M[0], E = M[1];
                  r.dataTransfer.setData(L, E ?? "");
                }
              Zp() && !r.dataTransfer.types.includes(ui) && !r.dataTransfer.types.includes(eg) && r.dataTransfer.setData(ui, Qp), r.dataTransfer.setData(tg, "");
              var $ = {
                element: h.element,
                dragHandle: (l = h.dragHandle) !== null && l !== void 0 ? l : null,
                data: (a = (u = h.getInitialData) === null || u === void 0 ? void 0 : u.call(h, y)) !== null && a !== void 0 ? a : {}
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
    (n = br.get(s.source.element)) === null || n === void 0 || (r = n[o]) === null || r === void 0 || r.call(
      n,
      // I cannot seem to get the types right here.
      // TS doesn't seem to like that one event can need `nativeSetDragImage`
      // @ts-expect-error
      s
    );
  },
  onPostDispatch: fi.getOnPostDispatch()
}), rg = ia.dropTarget;
function og(e) {
  var t = Kr(
    // making the draggable register the adapter rather than drop targets
    // this is because you *must* have a draggable element to start a drag
    // but you _might_ not have any drop targets immediately
    // (You might create drop targets async)
    ia.registerUsage(),
    ng(e),
    sa(e.element, {
      attribute: "draggable",
      value: "true"
    })
  );
  return Wt(t);
}
function sg(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
    if (t.indexOf(r) !== -1) continue;
    n[r] = e[r];
  }
  return n;
}
function ig(e, t) {
  if (e == null) return {};
  var n, r, o = sg(e, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    for (r = 0; r < s.length; r++) n = s[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (o[n] = e[n]);
  }
  return o;
}
function la(e, t) {
  var n = Object.keys(e), r = Object.keys(t);
  return n.length !== r.length ? !1 : n.every(function(o) {
    return Object.is(e[o], t[o]);
  });
}
function lg() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : la, t = null;
  return function(n) {
    return t && e(t.value, n) || (t = {
      value: n
    }), t.value;
  };
}
var ag = ["block"];
function di(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function pi(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? di(Object(n), !0).forEach(function(r) {
      Kn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : di(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function cg(e) {
  return {
    x: (e.right + e.left) / 2,
    y: (e.bottom + e.top) / 2
  };
}
function mo(e) {
  var t = e.client, n = e.borderBox, r = n.height / 4;
  return t.y <= n.top + r ? "reorder-above" : t.y >= n.bottom - r ? "reorder-below" : "make-child";
}
function ug(e) {
  var t = e.element, n = e.input, r = e.currentLevel, o = e.indentPerLevel, s = e.mode, i = {
    x: n.clientX,
    y: n.clientY
  }, l = t.getBoundingClientRect();
  if (s === "standard") {
    var a = mo({
      borderBox: l,
      client: i
    });
    return {
      type: a,
      indentPerLevel: o,
      currentLevel: r
    };
  }
  var u = cg(l);
  if (s === "expanded") {
    var d = mo({
      borderBox: l,
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
  if (i.x < l.left + h) {
    if (i.y < u.y)
      return {
        type: "reorder-above",
        indentPerLevel: o,
        currentLevel: r
      };
    var w = (i.x - l.left) / o, y = Math.max(Math.floor(w), 0);
    return {
      type: "reparent",
      desiredLevel: y,
      indentPerLevel: o,
      currentLevel: r
    };
  }
  return {
    type: mo({
      borderBox: l,
      client: i
    }),
    indentPerLevel: o,
    currentLevel: r
  };
}
function aa(e, t) {
  return e.type !== t.type ? !1 : e.type === "instruction-blocked" && t.type === "instruction-blocked" ? aa(e.desired, t.desired) : la(e, t);
}
var fg = lg(aa);
function dg(e) {
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
function pg(e, t) {
  var n = t.block, r = ig(t, ag), o = ug(r), s = dg({
    desired: o,
    block: n
  }), i = fg(s);
  return pi(pi({}, e), {}, Kn({}, ca, i));
}
function gi(e) {
  var t;
  return (t = e[ca]) !== null && t !== void 0 ? t : null;
}
var ca = Symbol("tree-item-instruction");
const gg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ef5350" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m6 10h-4v8a4 4 0 1 1-4-4 3.96 3.96 0 0 1 2 .555V8h6Z"/></svg>', hg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#ff7043" d="M2 2a1 1 0 0 0-1 1v10c0 .554.446 1 1 1h12c.554 0 1-.446 1-1V3a1 1 0 0 0-1-1zm0 3h12v8H2zm1 2 2 2-2 2 1 1 3-3-3-3zm5 3.5V12h5v-1.5z"/></svg>', vg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#7e57c2" d="M20 18h-2v-2h-2v2c0 .193 0 .703 1.254 1.033A3.345 3.345 0 0 1 20 22h2v2h2v-2c0-.388-.562-.851-1.254-1.034C20.356 20.34 20 18.84 20 18m-3.254 2.966C14.356 20.34 14 18.84 14 18h-2v-2h-2v8h2v-2h4v2h2v-2c0-.388-.562-.851-1.254-1.034"/><path fill="#7e57c2" d="M24 4H4v20a4 4 0 0 0 4 4h16.16A3.84 3.84 0 0 0 28 24.16V8a4 4 0 0 0-4-4m2 14h-2v-2h-2v2c0 .193 0 .703 1.254 1.033A3.345 3.345 0 0 1 26 22v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1 2-2h2a2 2 0 0 1 2 2Z"/></svg>', mg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ffca28" d="M16 24c-5.525 0-10-.9-10-2v4c0 1.1 4.475 2 10 2s10-.9 10-2v-4c0 1.1-4.475 2-10 2m0-8c-5.525 0-10-.9-10-2v4c0 1.1 4.475 2 10 2s10-.9 10-2v-4c0 1.1-4.475 2-10 2m0-12C10.477 4 6 4.895 6 6v4c0 1.1 4.475 2 10 2s10-.9 10-2V6c0-1.105-4.477-2-10-2"/></svg>', yg = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/><path fill="#42a5f5" d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5z"/></svg>', wg = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m8.668 6h3.6641l-3.6641-3.668v3.668m-4.668-4.668h5.332l4 4v8c0 0.73828-0.59375 1.3359-1.332 1.3359h-8c-0.73828 0-1.332-0.59766-1.332-1.3359v-10.664c0-0.74219 0.59375-1.3359 1.332-1.3359m3.332 1.3359h-3.332v10.664h8v-6h-4.668z" fill="#90a4ae" /></svg>', bg = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m6.922 3.768-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232" fill="#90a4ae" /></svg>', _g = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.483 6H4.721a1 1 0 0 0-.949.684L2 12V5h12a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232l-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h11l2.403-5.606A1 1 0 0 0 14.483 6" fill="#90a4ae" /></svg>', xg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#e65100" d="m4 4 2 22 10 2 10-2 2-22Zm19.72 7H11.28l.29 3h11.86l-.802 9.335L15.99 25l-6.635-1.646L8.93 19h3.02l.19 2 3.86.77 3.84-.77.29-4H8.84L8 8h16Z"/></svg>', Sg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#26a69a" d="M8.5 6h4l-4-4zM3.875 1H9.5l4 4v8.6c0 .773-.616 1.4-1.375 1.4h-8.25c-.76 0-1.375-.627-1.375-1.4V2.4c0-.777.612-1.4 1.375-1.4M4 13.6h8V8l-2.625 2.8L8 9.4zm1.25-7.7c-.76 0-1.375.627-1.375 1.4s.616 1.4 1.375 1.4c.76 0 1.375-.627 1.375-1.4S6.009 5.9 5.25 5.9"/></svg>', Rg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#ffca28" d="M2 2v12h12V2zm6 6h1v4a1.003 1.003 0 0 1-1 1H7a1.003 1.003 0 0 1-1-1v-1h1v1h1zm3 0h2v1h-2v1h1a1.003 1.003 0 0 1 1 1v1a1.003 1.003 0 0 1-1 1h-2v-1h2v-1h-1a1.003 1.003 0 0 1-1-1V9a1.003 1.003 0 0 1 1-1"/></svg>', Cg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path fill="#f9a825" d="M560-160v-80h120q17 0 28.5-11.5T720-280v-80q0-38 22-69t58-44v-14q-36-13-58-44t-22-69v-80q0-17-11.5-28.5T680-720H560v-80h120q50 0 85 35t35 85v80q0 17 11.5 28.5T840-560h40v160h-40q-17 0-28.5 11.5T800-360v80q0 50-35 85t-85 35zm-280 0q-50 0-85-35t-35-85v-80q0-17-11.5-28.5T120-400H80v-160h40q17 0 28.5-11.5T160-600v-80q0-50 35-85t85-35h120v80H280q-17 0-28.5 11.5T240-680v80q0 38-22 69t-58 44v14q36 13 58 44t22 69v80q0 17 11.5 28.5T280-240h120v80z"/></svg>', Mg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#42a5f5" d="m14 10-4 3.5L6 10H4v12h4v-6l2 2 2-2v6h4V10zm12 6v-6h-4v6h-4l6 8 6-8z"/></svg>', Ig = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ef5350" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m4.93 10.44c.41.9.93 1.64 1.53 2.15l.41.32c-.87.16-2.07.44-3.34.93l-.11.04.5-1.04c.45-.87.78-1.66 1.01-2.4m6.48 3.81c.18-.18.27-.41.28-.66.03-.2-.02-.39-.12-.55-.29-.47-1.04-.69-2.28-.69l-1.29.07-.87-.58c-.63-.52-1.2-1.43-1.6-2.56l.04-.14c.33-1.33.64-2.94-.02-3.6a.85.85 0 0 0-.61-.24h-.24c-.37 0-.7.39-.79.77-.37 1.33-.15 2.06.22 3.27v.01c-.25.88-.57 1.9-1.08 2.93l-.96 1.8-.89.49c-1.2.75-1.77 1.59-1.88 2.12-.04.19-.02.36.05.54l.03.05.48.31.44.11c.81 0 1.73-.95 2.97-3.07l.18-.07c1.03-.33 2.31-.56 4.03-.75 1.03.51 2.24.74 3 .74.44 0 .74-.11.91-.3m-.41-.71.09.11c-.01.1-.04.11-.09.13h-.04l-.19.02c-.46 0-1.17-.19-1.9-.51.09-.1.13-.1.23-.1 1.4 0 1.8.25 1.9.35M7.83 17c-.65 1.19-1.24 1.85-1.69 2 .05-.38.5-1.04 1.21-1.69zm3.02-6.91c-.23-.9-.24-1.63-.07-2.05l.07-.12.15.05c.17.24.19.56.09 1.1l-.03.16-.16.82z"/></svg>', Eg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#e64a19" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zM8 11v2h1v6H8v1h4v-1h-1v-2h2a3 3 0 0 0 3-3 3 3 0 0 0-3-3zm5 2a1 1 0 0 1 1 1 1 1 0 0 1-1 1h-2v-2z"/></svg>', Ag = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#0288d1" d="M9.86 2A2.86 2.86 0 0 0 7 4.86v1.68h4.29c.39 0 .71.57.71.96H4.86A2.86 2.86 0 0 0 2 10.36v3.781a2.86 2.86 0 0 0 2.86 2.86h1.18v-2.68a2.85 2.85 0 0 1 2.85-2.86h5.25c1.58 0 2.86-1.271 2.86-2.851V4.86A2.86 2.86 0 0 0 14.14 2zm-.72 1.61c.4 0 .72.12.72.71s-.32.891-.72.891c-.39 0-.71-.3-.71-.89s.32-.711.71-.711"/><path fill="#fdd835" d="M17.959 7v2.68a2.85 2.85 0 0 1-2.85 2.859H9.86A2.85 2.85 0 0 0 7 15.389v3.75a2.86 2.86 0 0 0 2.86 2.86h4.28A2.86 2.86 0 0 0 17 19.14v-1.68h-4.291c-.39 0-.709-.57-.709-.96h7.14A2.86 2.86 0 0 0 22 13.64V9.86A2.86 2.86 0 0 0 19.14 7zM8.32 11.513l-.004.004.038-.004zm6.54 7.276c.39 0 .71.3.71.89a.71.71 0 0 1-.71.71c-.4 0-.72-.12-.72-.71s.32-.89.72-.89"/></svg>', Og = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#8bc34a" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zm4 7.5h-4v2h1l-2 1.67L10 13h1v-2H7v2h1l3 2.5L8 18H7v2h4v-2h-1l2-1.67L14 18h-1v2h4v-2h-1l-3-2.5 3-2.5h1z"/></svg>', Pg = '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 16 16"><path fill="#0288d1" d="M2 2v12h12V2zm4 6h3v1H8v4H7V9H6zm5 0h2v1h-2v1h1a1.003 1.003 0 0 1 1 1v1a1.003 1.003 0 0 1-1 1h-2v-1h2v-1h-1a1.003 1.003 0 0 1-1-1V9a1.003 1.003 0 0 1 1-1"/></svg>', Tg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ff9800" d="m24 6 2 6h-4l-2-6h-3l2 6h-4l-2-6h-3l2 6H8L6 6H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3V6Z"/></svg>', Dg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#01579b" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zM7 13l1.5 7h2l1.5-3 1.5 3h2l1.5-7h1v-2h-4v2h1l-.9 4.2L13 15h-2l-1.1 2.2L9 13h1v-2H6v2z"/></svg>', kg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#8bc34a" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m.12 13.5 3.74 3.74 1.42-1.41-2.33-2.33 2.33-2.33-1.42-1.41zm11.16 0-3.74-3.74-1.42 1.41 2.33 2.33-2.33 2.33 1.42 1.41z"/></svg>', Fg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ff5252" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2m12 16v-2H9v2zm-4-4v-2H6v2z"/></svg>', Hg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#afb42b" d="M14 17h-2v-2h-2v-2h2v2h2m0-6h-2v2h2v2h-2v-2h-2V9h2V7h-2V5h2v2h2m5-4H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2"/></svg>', jg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Lg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Kg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Vg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Bg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, $g = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Ng = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Wg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Ug = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, qg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, zg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Gg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Yg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Xg = ["aria-label"], Jg = {
  key: 0,
  class: "pnl-tst-tsep",
  "aria-hidden": "true"
}, Zg = {
  key: 1,
  class: "pnl-tst-search"
}, Qg = ["innerHTML"], eh = ["value", "aria-label", "placeholder"], th = ["aria-label", "aria-keyshortcuts", "aria-disabled", "title", "tabindex", "onClick", "onFocus"], nh = ["innerHTML"], rh = {
  key: 1,
  class: "pnl-tst-empty"
}, oh = ["aria-label", "aria-colcount", "aria-rowcount"], sh = {
  key: 0,
  class: "pnl-tst-head",
  role: "rowgroup"
}, ih = {
  class: "pnl-tst-hrow",
  role: "row",
  "aria-rowindex": 1
}, lh = ["aria-colindex"], ah = {
  class: "pnl-tst-body",
  role: "rowgroup"
}, ch = ["aria-level", "aria-posinset", "aria-setsize", "aria-rowindex", "aria-expanded", "aria-selected", "tabindex", "onClick", "onFocus"], uh = ["aria-colindex"], fh = ["onClick"], dh = {
  key: 1,
  class: "pnl-tst-twisty pnl-tst-twisty--leaf",
  "aria-hidden": "true"
}, ph = ["checked", ".indeterminate", "aria-label", "onClick"], gh = ["innerHTML"], hh = ["value", "aria-label", "onKeydown", "onBlur"], vh = {
  key: 2,
  class: "pnl-tst-value"
}, mh = {
  key: 3,
  class: "pnl-tst-modal"
}, yh = {
  id: "pnl-tst-confirm-message",
  class: "pnl-tst-dialog-message"
}, wh = { class: "pnl-tst-dialog-actions" }, bh = "title", or = "search", sr = "|", vn = "pnl-tst-row", _h = 500, xh = {
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
    setEditingKey: { type: Function, required: !0 }
  },
  setup(e) {
    const t = e, n = {
      rowExpandingFeature: Ud,
      rowSelectionFeature: op,
      coreRowModel: Vl(),
      expandedRowModel: sp()
    }, r = Y(() => (t.state.columns || []).length > 0), o = Y(() => {
      const c = t.state.columns || [];
      return c.length === 0 ? [{ id: bh, header: "", accessorFn: (f) => f.title }] : c.map((f) => {
        const v = f.field ?? f.id;
        return {
          id: f.id,
          header: f.header ?? f.id,
          accessorFn: (b) => b[v],
          meta: { width: f.width }
        };
      });
    }), s = /* @__PURE__ */ be(i(t.state.expandedKeys));
    function i(c) {
      const f = {};
      for (const v of c || []) f[v] = !0;
      return f;
    }
    function l(c) {
      return c === !0 ? F.getCoreRowModel().flatRows.filter((f) => f.subRows.length > 0).map((f) => f.id).sort() : Object.keys(c).filter((f) => c[f]).sort();
    }
    const a = {
      audio: gg,
      console: hg,
      css: vg,
      database: mg,
      document: yg,
      file: wg,
      folder: bg,
      "folder-open": _g,
      html: xg,
      image: Sg,
      javascript: Rg,
      json: Cg,
      markdown: Mg,
      pdf: Ig,
      powerpoint: Eg,
      python: Ag,
      table: Og,
      typescript: Pg,
      video: Tg,
      word: Dg,
      xml: kg,
      yaml: Fg,
      zip: Hg
    };
    function u(c) {
      return c ? { ...a, ...t.state.icons || {} }[c] ?? null : null;
    }
    function d(c) {
      const f = c.original.icon;
      return f ? (Ge(c) ? u(`${f}-open`) : null) ?? u(f) : null;
    }
    function h(c, f) {
      return c.length !== f.length ? !1 : c.every((v, b) => v === f[b]);
    }
    const w = Y(() => t.state.options.select_mode ?? "none"), y = Y(() => w.value !== "none"), I = Y(() => w.value === "hierarchy"), C = Y(
      () => y.value && t.state.options.show_checkboxes !== !1
    ), T = /* @__PURE__ */ be(i(t.state.selectedKeys)), F = cp({
      features: n,
      data: Y(() => t.state.source || []),
      columns: o,
      getRowId: (c) => c.key,
      getSubRows: (c) => c.children,
      // TanStack resets `expanded` whenever `data` changes. Python rewrites the
      // whole tree after every move, so leaving that on would collapse the tree on
      // each drop and push an empty `expanded_keys` back. Expansion is owned here.
      autoResetExpanded: !1,
      enableRowSelection: y,
      enableMultiRowSelection: Y(() => w.value !== "single"),
      enableSubRowSelection: I,
      state: Y(() => ({ expanded: s.value, rowSelection: T.value })),
      onExpandedChange: (c) => {
        s.value = typeof c == "function" ? c(s.value) : c;
      },
      onRowSelectionChange: (c) => {
        T.value = typeof c == "function" ? c(T.value) : c;
      }
    });
    function M(c) {
      if (c.getIsSelected()) return "all";
      if (!I.value || c.subRows.length === 0) return "none";
      const f = c.subRows.map(M);
      return f.every((v) => v === "all") ? "all" : f.some((v) => v !== "none") ? "some" : "none";
    }
    _e(() => l(T.value), t.setSelectedKeys, { flush: "post" }), _e(() => l(s.value), t.setExpandedKeys, { flush: "post" }), _e(
      () => t.state.expandedKeys,
      (c) => {
        h(l(s.value), [...c || []].sort()) || (s.value = i(c));
      }
    ), _e(
      () => t.state.selectedKeys,
      (c) => {
        h(l(T.value), [...c || []].sort()) || (T.value = i(c));
      }
    ), _e(
      () => [t.state.options.expand_all, t.state.source],
      ([c]) => {
        c && F.toggleAllRowsExpanded(!0);
      },
      { immediate: !0 }
    );
    const L = Y(() => (t.state.filterText ?? "").trim().toLowerCase()), E = Y(() => L.value.length > 0), $ = /* @__PURE__ */ be(t.state.filterText ?? "");
    _e(
      () => t.state.filterText,
      (c) => {
        $.value = c ?? "";
      }
    );
    function W(c) {
      $.value = c, t.setFilterText(c);
    }
    function fe(c) {
      return c.getAllCells().some((f) => String(f.getValue() ?? "").toLowerCase().includes(L.value));
    }
    const k = Y(() => {
      if (!E.value) return F.getRowModel().rows;
      const c = /* @__PURE__ */ new Set();
      for (const f of F.getCoreRowModel().flatRows)
        if (fe(f)) {
          c.add(f.id);
          for (let v = f.getParentRow(); v; v = v.getParentRow()) c.add(v.id);
        }
      return F.getCoreRowModel().flatRows.filter((f) => c.has(f.id));
    }), H = Y(() => {
      var c;
      return ((c = F.getHeaderGroups()[0]) == null ? void 0 : c.headers) ?? [];
    }), G = Y(() => t.state.options.indent_px ?? 16), de = Y(() => t.state.options.aria_label ?? "Tree table"), se = Y(() => E.value ? "No matches" : "No data"), ve = Y(() => r.value ? 2 : 1), Te = Y(() => k.value.length + (r.value ? 1 : 0)), Ie = Y(() => {
      const c = /* @__PURE__ */ new Map();
      for (const f of k.value) {
        const v = f.parentId ?? "", b = c.get(v) ?? [];
        b.push(f.id), c.set(v, b);
      }
      return c;
    });
    function te(c) {
      return Ie.value.get(c.parentId ?? "") ?? [];
    }
    function X(c) {
      return te(c).indexOf(c.id) + 1;
    }
    function ne(c) {
      return te(c).length;
    }
    function ke(c) {
      return E.value ? (Ie.value.get(c.id) ?? []).length > 0 : c.getCanExpand();
    }
    function Ge(c) {
      return E.value ? ke(c) : c.getIsExpanded();
    }
    function Ne(c) {
      var v;
      const f = (v = c.meta) == null ? void 0 : v.width;
      return f ? { flex: `0 0 ${f}px` } : { flex: "1 1 0" };
    }
    function Le(c, f) {
      return { ...Ne(f), paddingInlineStart: `${c.depth * G.value}px` };
    }
    const vt = /* @__PURE__ */ be(null), mt = /* @__PURE__ */ be(!0), Ut = /* @__PURE__ */ new Map();
    function Ke(c) {
      vt.value = c, mt.value = !0;
    }
    function qt(c, f) {
      f ? Ut.set(c, f) : Ut.delete(c);
    }
    const yt = Y(() => {
      const c = k.value;
      return c.length === 0 ? null : c.some((f) => f.id === vt.value) ? vt.value : c[0].id;
    });
    function Fe(c) {
      c != null && (Ke(c), St(() => {
        var f;
        return (f = Ut.get(c)) == null ? void 0 : f.focus();
      }));
    }
    function Ye(c) {
      const f = k.value;
      f.length !== 0 && Fe(f[Math.max(0, Math.min(c, f.length - 1))].id);
    }
    function Br(c, f) {
      const v = k.value;
      if (v.length === 0) return;
      const b = v[Math.max(0, Math.min(c, v.length - 1))], V = (f == null ? void 0 : f.shiftKey) && y.value && w.value !== "single";
      V && g.value === null && (g.value = yt.value), Fe(b.id), V && R(b, !1);
    }
    function p(c) {
      const f = k.value;
      if (f.length === 0) return;
      const v = Math.max(
        0,
        f.findIndex((q) => q.id === yt.value)
      ), b = f[v];
      if (c.ctrlKey || c.metaKey) {
        const q = { a: "select-all", f: or }[c.key.toLowerCase()];
        if (q && Et(q)) {
          c.preventDefault(), we(q);
          return;
        }
      }
      if (c.altKey) {
        const q = {
          ArrowUp: "move-up",
          ArrowDown: "move-down",
          ArrowLeft: "outdent",
          ArrowRight: "indent"
        }[c.key];
        if (q && Et(q)) {
          c.preventDefault(), we(q);
          return;
        }
      }
      const V = {
        Insert: c.shiftKey ? "new-file" : "new-folder",
        F2: "rename",
        Delete: "delete",
        Escape: "clear-selection"
      }[c.key];
      if (V && Et(V)) {
        c.preventDefault(), we(V);
        return;
      }
      switch (c.key) {
        case "ArrowDown":
          c.preventDefault(), Br(v + 1, c);
          break;
        case "ArrowUp":
          c.preventDefault(), Br(v - 1, c);
          break;
        case "ArrowRight":
          if (c.preventDefault(), !ke(b)) break;
          Ge(b) ? Ye(v + 1) : (b.toggleExpanded(!0), Fe(b.id));
          break;
        case "ArrowLeft":
          c.preventDefault(), !E.value && b.getCanExpand() && b.getIsExpanded() ? (b.toggleExpanded(!1), Fe(b.id)) : b.parentId && Fe(b.parentId);
          break;
        case "Home":
          c.preventDefault(), Ye(0);
          break;
        case "End":
          c.preventDefault(), Ye(f.length - 1);
          break;
        case "Enter":
          c.preventDefault(), t.emitEvent("activate", { key: b.id });
          break;
        case " ":
          if (!y.value) break;
          c.preventDefault(), B(b);
          break;
      }
    }
    const g = /* @__PURE__ */ be(null);
    function m(c) {
      g.value = c.id, T.value = {}, c.toggleSelected(!0, { selectChildren: !1 });
    }
    function R(c, f) {
      const v = k.value, b = v.findIndex((Be) => Be.id === g.value), V = v.findIndex((Be) => Be.id === c.id);
      if (V === -1) return;
      if (b === -1) {
        m(c);
        return;
      }
      f || (T.value = {});
      const [q, he] = b <= V ? [b, V] : [V, b];
      for (let Be = q; Be <= he; Be += 1)
        v[Be].toggleSelected(!0, { selectChildren: !1 });
    }
    const S = Y(() => t.state.options.toggle_on_click === !0);
    function _(c) {
      const f = l(T.value);
      return f.length === 1 && f[0] === c.id;
    }
    function P() {
      T.value = {}, g.value = null, mt.value = !1;
    }
    function O() {
      l(T.value).length === 0 && (mt.value = !1);
    }
    _e(
      () => l(T.value).length > 0,
      (c) => {
        c && (mt.value = !0);
      }
    );
    function A(c, f) {
      Ke(c.id);
      const v = !!(f != null && f.shiftKey || f != null && f.ctrlKey || f != null && f.metaKey);
      y.value && !v && S.value && _(c) ? P() : y.value && w.value !== "single" ? f != null && f.shiftKey ? R(c, f.ctrlKey || f.metaKey) : f != null && f.ctrlKey || f != null && f.metaKey ? (g.value = c.id, j(c)) : m(c) : y.value && m(c), t.emitEvent("activate", { key: c.id });
    }
    function x(c) {
      Ke(c.id), !E.value && c.toggleExpanded();
    }
    function K(c) {
      return M(c) === "all";
    }
    function D(c) {
      return M(c) === "some";
    }
    function j(c) {
      Ke(c.id), c.toggleSelected(void 0, { selectChildren: !1 }), O();
    }
    function B(c) {
      Ke(c.id), c.toggleSelected(!K(c), {
        selectChildren: I.value,
        deselectParents: I.value
      }), O();
    }
    function z(c) {
      B(c), Fe(c.id);
    }
    const J = {
      "new-folder": { icon: $g, label: "New folder", keys: "Insert", node: {} },
      "new-file": {
        icon: Bg,
        label: "New file",
        keys: "Shift+Insert",
        node: { allow_children: !1 }
      },
      rename: { icon: Ug, label: "Rename", keys: "F2" },
      delete: { icon: Yg, label: "Delete", keys: "Delete" },
      "move-up": { icon: Lg, label: "Move up", keys: "Alt+ArrowUp" },
      "move-down": { icon: jg, label: "Move down", keys: "Alt+ArrowDown" },
      outdent: { icon: Ng, label: "Outdent", keys: "Alt+ArrowLeft" },
      indent: { icon: Wg, label: "Indent", keys: "Alt+ArrowRight" },
      "expand-all": { icon: Kg, label: "Expand all" },
      "collapse-all": { icon: Vg, label: "Collapse all" },
      "select-all": { icon: Gg, label: "Select all", keys: "Control+A" },
      "clear-selection": { icon: zg, label: "Clear selection", keys: "Escape" }
    }, Z = [
      "new-folder",
      "new-file",
      "rename",
      "delete",
      sr,
      "move-up",
      "move-down",
      "outdent",
      "indent",
      sr,
      "expand-all",
      "collapse-all",
      sr,
      "select-all",
      "clear-selection",
      or
    ], ce = Y(() => {
      const c = t.state.options.toolbar, f = c === !0 ? Z : Array.isArray(c) ? c : [], v = [];
      return f.forEach((b, V) => {
        const q = typeof b == "string" ? {} : b || {}, he = typeof b == "string" ? b : q.id, Be = `${he}#${V}`;
        if (he === sr || he === or) {
          v.push({ uid: Be, id: he });
          return;
        }
        const pn = J[he];
        if (!pn) return;
        const vs = q.label ?? pn.label;
        v.push({
          uid: Be,
          id: he,
          label: vs,
          icon: u(q.icon) ?? pn.icon,
          keys: pn.keys,
          node: { title: vs, ...pn.node ?? {}, ...q.node ?? {} }
        });
      }), v;
    }), me = Y(() => ce.value.length > 0), Ve = Y(() => t.state.options.toolbar_label ?? "Tree actions"), He = Y(() => t.state.options.search_label ?? "Search");
    function wt(c) {
      return ce.value.find((f) => f.id === c) ?? null;
    }
    function Et(c) {
      return wt(c) !== null;
    }
    function we(c) {
      const f = wt(c);
      f && us(f);
    }
    const pe = Y(() => k.value.find((c) => c.id === yt.value) ?? null);
    function Vn(c) {
      return k.value.filter((f) => (f.parentId ?? "") === (c.parentId ?? ""));
    }
    function cn() {
      const c = pe.value;
      if (!c) return [];
      const f = ds(c), v = c.parentId ?? "";
      return f.every((V) => {
        var q;
        return (((q = fn(V)) == null ? void 0 : q.parentId) ?? "") === v;
      }) ? f : [c.id];
    }
    function os() {
      const c = pe.value;
      if (!c) return [];
      if (!y.value || !c.getIsSelected()) return [c.id];
      const f = k.value.filter((v) => v.getIsSelected()).map((v) => v.id);
      return f.length > 0 ? f : [c.id];
    }
    function zt(c) {
      const f = pe.value;
      if (!f) return null;
      const v = new Set(cn()), b = Vn(f), V = b.map((he, Be) => v.has(he.id) ? Be : -1).filter((he) => he >= 0);
      if (V.length === 0) return null;
      let q = (c < 0 ? Math.min(...V) : Math.max(...V)) + c;
      for (; q >= 0 && q < b.length && v.has(b[q].id); ) q += c;
      return b[q] ?? null;
    }
    let bt = null;
    _e(
      () => t.state.source,
      () => {
        const c = bt;
        if (bt = null, !!c) {
          if (c.key !== void 0) {
            Fe(c.key);
            return;
          }
          St(() => {
            c.index !== void 0 ? Ye(c.index) : ua(c.added);
          });
        }
      }
    );
    function ua(c) {
      const f = F.getCoreRowModel().flatRows.find((v) => !c.has(v.id));
      f && (Fe(f.id), y.value && (T.value = {}, g.value = f.id, f.toggleSelected(!0, { selectChildren: !1 })), Et("rename") && St(() => Nn(f.id, !0)));
    }
    const Gt = /* @__PURE__ */ be(null), Bn = /* @__PURE__ */ be(""), un = /* @__PURE__ */ be(null), ot = /* @__PURE__ */ be(null), $r = /* @__PURE__ */ be(null), Nr = /* @__PURE__ */ be(null), fa = Y(() => t.state.options.extension_warning !== !1);
    function ss(c) {
      const f = String(c ?? ""), v = f.lastIndexOf(".");
      return v < 0 ? "" : f.slice(v + 1).toLowerCase();
    }
    function da(c, f) {
      return fa.value && c.allow_children === !1 && ss(f) !== ss(c.title ?? "");
    }
    let $n = null;
    function Nn(c, f = !1) {
      const v = fn(c);
      v && ($n = f ? c : null, Bn.value = v.original.title ?? "", Gt.value = c, t.setEditingKey(c), St(() => {
        var b, V;
        (b = un.value) == null || b.focus(), (V = un.value) == null || V.select();
      }));
    }
    function Wn() {
      $n = null, ot.value = null, Gt.value = null, t.setEditingKey("");
    }
    function is(c) {
      if (ot.value || Gt.value !== c.id) return;
      const f = Bn.value.trim(), v = f.length > 0 && f !== (c.original.title ?? "");
      if (v && $n !== c.id && da(c.original, f)) {
        ot.value = { key: c.id, title: f, previous: c.original.title ?? c.id }, St(() => {
          var b;
          return (b = Nr.value) == null ? void 0 : b.focus();
        });
        return;
      }
      if (Wn(), !v) {
        Fe(c.id);
        return;
      }
      bt = { key: c.id }, t.emitEvent("rename", { key: c.id, title: f });
    }
    function ls() {
      const { key: c, title: f } = ot.value;
      ot.value = null, Wn(), bt = { key: c }, t.emitEvent("rename", { key: c, title: f });
    }
    function as() {
      ot.value = null, St(() => {
        var c, f;
        (c = un.value) == null || c.focus(), (f = un.value) == null || f.select();
      });
    }
    function pa(c) {
      var b;
      const f = c.key;
      if (f === "Escape" || f === "n" || f === "N") {
        c.preventDefault(), as();
        return;
      }
      if (f === "y" || f === "Y") {
        c.preventDefault(), ls();
        return;
      }
      if (f !== "Tab" && f !== "ArrowLeft" && f !== "ArrowRight") return;
      c.preventDefault(), (b = (c.target === $r.value ? Nr : $r).value) == null || b.focus();
    }
    function ga(c) {
      if (Gt.value !== c.id) return;
      const f = $n === c.id;
      if (Wn(), !f) {
        Fe(c.id);
        return;
      }
      bt = { index: k.value.findIndex((v) => v.id === c.id) }, t.emitEvent("delete", { key: c.id, keys: [c.id] });
    }
    function ha(c, f) {
      f.key === "Enter" ? (f.preventDefault(), is(c)) : f.key === "Escape" && (f.preventDefault(), ga(c));
    }
    _e(
      () => t.state.editingKey,
      (c) => {
        (c || "") !== (Gt.value || "") && (c ? Nn(c) : Wn());
      }
    ), So(() => {
      t.state.editingKey && Nn(t.state.editingKey);
    });
    function Un(c, f) {
      const v = pe.value;
      !v || !c || (bt = { key: v.id }, t.emitEvent("move", {
        key: v.id,
        keys: cn(),
        position: f,
        anchorKey: c.id
      }));
    }
    function va(c) {
      const f = pe.value, v = f ? f.original.allow_children === !1 ? "after" : "child" : null;
      f && v === "child" && !E.value && f.toggleExpanded(!0), bt = { added: new Set(F.getCoreRowModel().flatRows.map((b) => b.id)) }, t.emitEvent("add", { anchorKey: (f == null ? void 0 : f.id) ?? null, position: v, node: c.node });
    }
    function ma() {
      var f;
      const c = os();
      c.length !== 0 && (bt = { index: k.value.findIndex((v) => {
        var b;
        return v.id === ((b = pe.value) == null ? void 0 : b.id);
      }) }, t.emitEvent("delete", { key: ((f = pe.value) == null ? void 0 : f.id) ?? null, keys: c }));
    }
    function cs(c) {
      var f;
      switch (c.id) {
        case "new-folder":
        case "new-file":
          return !0;
        case "rename":
          return pe.value !== null;
        case "delete":
          return os().length > 0;
        case "move-up":
          return zt(-1) !== null;
        case "move-down":
          return zt(1) !== null;
        case "indent": {
          const v = zt(-1);
          return v !== null && v.original.allow_children !== !1;
        }
        case "outdent":
          return !!((f = pe.value) != null && f.parentId);
        case "expand-all":
        case "collapse-all":
          return k.value.length > 0 && !E.value;
        case "select-all":
          return k.value.length > 0 && y.value && w.value !== "single";
        case "clear-selection":
          return y.value && l(T.value).length > 0;
        default:
          return !0;
      }
    }
    function ya(c) {
      return c.keys ? `${c.label} (${c.keys.replace("Control", "Ctrl")})` : c.label;
    }
    function us(c) {
      var f, v, b, V;
      if (cs(c))
        switch (c.id) {
          case "new-folder":
          case "new-file":
            va(c);
            break;
          case "rename":
            Nn(pe.value.id);
            break;
          case "delete":
            ma();
            break;
          case "move-up":
            Un(zt(-1), "before");
            break;
          case "move-down":
            Un(zt(1), "after");
            break;
          case "indent": {
            const q = zt(-1);
            q && !E.value && q.toggleExpanded(!0), Un(q, "child");
            break;
          }
          case "outdent":
            Un(fn((f = pe.value) == null ? void 0 : f.parentId), "after");
            break;
          case "expand-all":
            F.toggleAllRowsExpanded(!0);
            break;
          case "collapse-all":
            F.toggleAllRowsExpanded(!1);
            break;
          case "select-all":
            T.value = Object.fromEntries(k.value.map((q) => [q.id, !0])), g.value = ((v = k.value[0]) == null ? void 0 : v.id) ?? null;
            break;
          case "clear-selection":
            P();
            break;
          case or:
            (b = Wr.value) == null || b.focus(), (V = Wr.value) == null || V.select();
            break;
        }
    }
    const Wr = /* @__PURE__ */ be(null), Ur = Y(() => ce.value.filter((c) => c.id in J)), qn = /* @__PURE__ */ be(null), qr = /* @__PURE__ */ new Map(), fs = Y(() => {
      const c = Ur.value;
      return c.length === 0 ? null : c.some((f) => f.uid === qn.value) ? qn.value : c[0].uid;
    });
    function wa(c, f) {
      f ? qr.set(c, f) : qr.delete(c);
    }
    function zn(c) {
      const f = Ur.value;
      if (f.length === 0) return;
      const v = f[Math.max(0, Math.min(c, f.length - 1))].uid;
      qn.value = v, St(() => {
        var b;
        return (b = qr.get(v)) == null ? void 0 : b.focus();
      });
    }
    function ba(c) {
      const f = Ur.value, v = Math.max(
        0,
        f.findIndex((b) => b.uid === fs.value)
      );
      switch (c.key) {
        case "ArrowRight":
          c.preventDefault(), zn(v + 1);
          break;
        case "ArrowLeft":
          c.preventDefault(), zn(v - 1);
          break;
        case "Home":
          c.preventDefault(), zn(0);
          break;
        case "End":
          c.preventDefault(), zn(f.length - 1);
          break;
      }
    }
    const _a = ["reorder-above", "reorder-below", "make-child", "reparent"], zr = Y(() => t.state.options.enable_dnd === !0), Gr = /* @__PURE__ */ be([]), Gn = /* @__PURE__ */ be(null);
    function fn(c) {
      return k.value.find((f) => f.id === c) ?? null;
    }
    function xa(c, f) {
      let v = c;
      for (; v; ) {
        if (f.includes(v.id)) return !0;
        v = v.getParentRow();
      }
      return !1;
    }
    function ds(c) {
      if (!y.value || !c.getIsSelected()) return [c.id];
      const f = /* @__PURE__ */ new Set();
      for (let b = c.getParentRow(); b; b = b.getParentRow()) f.add(b.id);
      const v = k.value.filter((b) => b.getIsSelected() && !f.has(b.id)).map((b) => b.id);
      return v.length > 1 ? v : [c.id];
    }
    function Sa(c, f) {
      return xa(c, f) ? _a : c.original.allow_children === !1 ? ["make-child"] : [];
    }
    function Ra(c) {
      if (ke(c) && Ge(c)) return "expanded";
      const f = te(c);
      return f[f.length - 1] === c.id ? "last-in-group" : "standard";
    }
    let Yr = null, dn = null;
    function Xr() {
      dn && clearTimeout(dn), dn = null, Yr = null;
    }
    function Ca(c, f) {
      if (Yr === c || (Xr(), !f || f.type === "instruction-blocked")) return;
      const v = fn(c);
      !v || !v.getCanExpand() || v.getIsExpanded() || (Yr = c, dn = setTimeout(() => {
        dn = null;
        const b = fn(c);
        b && b.getCanExpand() && !b.getIsExpanded() && b.toggleExpanded(!0);
      }, _h));
    }
    function Jr() {
      Gn.value = null, Xr();
    }
    const ps = /* @__PURE__ */ be(null);
    function Ma() {
      let c = ps.value;
      if (!c) return null;
      let f = c.getRootNode();
      for (; f.host; )
        c = f.host, f = c.getRootNode();
      return c;
    }
    function Yn(c) {
      for (const f of k.value) {
        const v = Ut.get(f.id);
        if (!v) continue;
        const b = v.getBoundingClientRect();
        if (c.clientX >= b.left && c.clientX < b.right && c.clientY >= b.top && c.clientY < b.bottom)
          return { row: f, element: v, rect: b };
      }
      return null;
    }
    function Ia(c, f) {
      const v = ".pnl-tst-check, .pnl-tst-twisty, .pnl-tst-edit";
      for (const b of c.element.querySelectorAll(v)) {
        const V = b.getBoundingClientRect();
        if (f.clientX >= V.left && f.clientX < V.right && f.clientY >= V.top && f.clientY < V.bottom)
          return !0;
      }
      return !1;
    }
    let _t = null;
    function gs() {
      _t == null || _t(), _t = null;
      const c = Ma();
      !c || !zr.value || (_t = Kr(
        og({
          element: c,
          // Anything outside a row (the header, the empty space below the last row)
          // is not a drag handle, and returning false cancels the native drag.
          canDrag: ({ input: f }) => {
            const v = Yn(f);
            return v !== null && !Ia(v, f);
          },
          getInitialData: ({ input: f }) => {
            const v = Yn(f);
            return v ? { type: vn, key: v.row.id, keys: ds(v.row) } : { type: vn, key: null, keys: [] };
          },
          onGenerateDragPreview: ({ location: f, nativeSetDragImage: v }) => {
            const b = f.current.input, V = Yn(b);
            !V || !v || v(V.element, b.clientX - V.rect.left, b.clientY - V.rect.top);
          },
          onDragStart: ({ source: f }) => {
            Gr.value = f.data.keys ?? [];
          },
          onDrop: () => {
            Gr.value = [], Jr();
          }
        }),
        rg({
          element: c,
          canDrop: ({ source: f }) => f.data.type === vn,
          getData: ({ input: f, source: v }) => {
            const b = Yn(f);
            if (!b) return { type: vn, key: null };
            const V = { type: vn, key: b.row.id };
            return pg(V, {
              element: b.element,
              input: f,
              currentLevel: b.row.depth,
              indentPerLevel: G.value,
              mode: Ra(b.row),
              block: Sa(b.row, v.data.keys ?? [])
            });
          },
          onDrag: ({ self: f }) => {
            const v = f.data.key, b = gi(f.data);
            Gn.value = v && b ? { key: v, instruction: b } : null, Ca(v ?? null, b);
          },
          onDragLeave: Jr,
          onDrop: ({ self: f, source: v }) => {
            Jr();
            const b = f.data.key, V = gi(f.data);
            if (!b || !V || V.type === "instruction-blocked") return;
            const q = v.data.keys ?? [];
            q.includes(b) || t.emitEvent("move", {
              key: v.data.key,
              keys: q,
              targetKey: b,
              instruction: V.type,
              desiredLevel: V.desiredLevel ?? V.currentLevel
            });
          }
        })
      ));
    }
    So(gs), _e(zr, gs), Ji(() => {
      Xr(), _t == null || _t();
    });
    function Zr(c) {
      var f;
      return ((f = Gn.value) == null ? void 0 : f.key) === c.id ? Gn.value.instruction : null;
    }
    function Ea(c) {
      const f = Zr(c);
      return {
        "pnl-tst-row--draggable": zr.value,
        "pnl-tst-row--dragging": Gr.value.includes(c.id),
        "pnl-tst-row--blocked": (f == null ? void 0 : f.type) === "instruction-blocked",
        "pnl-tst-row--child-target": (f == null ? void 0 : f.type) === "make-child"
      };
    }
    function hs(c) {
      const f = Zr(c);
      return f ? f.type === "reorder-above" ? "pnl-tst-dropline--above" : f.type === "reorder-below" || f.type === "reparent" ? "pnl-tst-dropline--below" : null : null;
    }
    function Aa(c) {
      const f = Zr(c);
      return f ? { insetInlineStart: `${(f.type === "reparent" ? f.desiredLevel : f.currentLevel) * f.indentPerLevel}px` } : null;
    }
    return (c, f) => (ie(), ue("div", {
      ref_key: "rootElement",
      ref: ps,
      class: "pnl-tst"
    }, [
      me.value ? (ie(), ue("div", {
        key: 0,
        class: "pnl-tst-toolbar",
        role: "toolbar",
        "aria-orientation": "horizontal",
        "aria-label": Ve.value
      }, [
        (ie(!0), ue(Oe, null, Qn(ce.value, (v) => (ie(), ue(Oe, {
          key: v.uid
        }, [
          v.id === "|" ? (ie(), ue("span", Jg)) : v.id === "search" ? (ie(), ue("label", Zg, [
            Se("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: Ht(qg)
            }, null, 8, Qg),
            Se("input", {
              ref_for: !0,
              ref: (b) => Wr.value = b,
              type: "search",
              value: $.value,
              "aria-label": He.value,
              placeholder: He.value,
              onInput: f[0] || (f[0] = (b) => W(b.target.value))
            }, null, 40, eh)
          ])) : (ie(), ue("button", {
            key: 2,
            ref_for: !0,
            ref: (b) => wa(v.uid, b),
            type: "button",
            class: "pnl-tst-tbtn",
            "aria-label": v.label,
            "aria-keyshortcuts": v.keys,
            "aria-disabled": !cs(v),
            title: ya(v),
            tabindex: v.uid === fs.value ? 0 : -1,
            onClick: (b) => us(v),
            onFocus: (b) => qn.value = v.uid,
            onKeydown: ba
          }, [
            Se("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: v.icon
            }, null, 8, nh)
          ], 40, th))
        ], 64))), 128))
      ], 8, Xg)) : Pt("", !0),
      k.value.length === 0 ? (ie(), ue("div", rh, Xt(se.value), 1)) : (ie(), ue("div", {
        key: 2,
        class: "pnl-tst-grid",
        role: "treegrid",
        "aria-label": de.value,
        "aria-colcount": H.value.length,
        "aria-rowcount": Te.value,
        onKeydown: p
      }, [
        r.value ? (ie(), ue("div", sh, [
          Se("div", ih, [
            (ie(!0), ue(Oe, null, Qn(H.value, (v, b) => (ie(), ue("div", {
              key: v.id,
              class: "pnl-tst-hcell",
              role: "columnheader",
              "aria-colindex": b + 1,
              style: en(Ne(v.column.columnDef))
            }, Xt(v.column.columnDef.header), 13, lh))), 128))
          ])
        ])) : Pt("", !0),
        Se("div", ah, [
          (ie(!0), ue(Oe, null, Qn(k.value, (v, b) => (ie(), ue("div", {
            key: v.id,
            ref_for: !0,
            ref: (V) => qt(v.id, V),
            class: Dt(["pnl-tst-row", [
              Ea(v),
              {
                "pnl-tst-row--active": mt.value && v.id === vt.value,
                "pnl-tst-row--quiet": !mt.value && v.id === vt.value
              }
            ]]),
            role: "row",
            "aria-level": v.depth + 1,
            "aria-posinset": X(v),
            "aria-setsize": ne(v),
            "aria-rowindex": b + ve.value,
            "aria-expanded": ke(v) ? Ge(v) : void 0,
            "aria-selected": y.value ? v.getIsSelected() : void 0,
            tabindex: v.id === yt.value ? 0 : -1,
            onClick: (V) => A(v, V),
            onFocus: (V) => Ke(v.id)
          }, [
            hs(v) ? (ie(), ue("span", {
              key: 0,
              class: Dt(["pnl-tst-dropline", hs(v)]),
              style: en(Aa(v)),
              "aria-hidden": "true"
            }, null, 6)) : Pt("", !0),
            (ie(!0), ue(Oe, null, Qn(v.getAllCells(), (V, q) => (ie(), ue("div", {
              key: V.id,
              class: Dt(["pnl-tst-cell", { "pnl-tst-cell--tree": q === 0 }]),
              role: "gridcell",
              "aria-colindex": q + 1,
              style: en(
                q === 0 ? Le(v, V.column.columnDef) : Ne(V.column.columnDef)
              )
            }, [
              q === 0 ? (ie(), ue(Oe, { key: 0 }, [
                ke(v) ? (ie(), ue("span", {
                  key: 0,
                  class: Dt(["pnl-tst-twisty", { "pnl-tst-twisty--open": Ge(v) }]),
                  "aria-hidden": "true",
                  onClick: tr((he) => x(v), ["stop"])
                }, [...f[3] || (f[3] = [
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
                ])], 10, fh)) : (ie(), ue("span", dh)),
                C.value ? (ie(), ue("input", {
                  key: 2,
                  class: "pnl-tst-check",
                  type: "checkbox",
                  tabindex: "-1",
                  checked: K(v),
                  ".indeterminate": D(v),
                  "aria-label": `Select ${v.original.title ?? v.id}`,
                  onClick: tr((he) => z(v), ["stop"])
                }, null, 40, ph)) : Pt("", !0),
                d(v) ? (ie(), ue("span", {
                  key: 3,
                  class: "pnl-tst-icon",
                  "aria-hidden": "true",
                  innerHTML: d(v)
                }, null, 8, gh)) : Pt("", !0)
              ], 64)) : Pt("", !0),
              q === 0 && Gt.value === v.id ? (ie(), ue("input", {
                key: 1,
                ref_for: !0,
                ref: (he) => un.value = he,
                class: "pnl-tst-edit",
                type: "text",
                value: Bn.value,
                "aria-label": `Rename ${v.original.title ?? v.id}`,
                onInput: f[1] || (f[1] = (he) => Bn.value = he.target.value),
                onClick: f[2] || (f[2] = tr(() => {
                }, ["stop"])),
                onKeydown: tr((he) => ha(v, he), ["stop"]),
                onBlur: (he) => is(v)
              }, null, 40, hh)) : (ie(), ue("span", vh, Xt(V.getValue()), 1))
            ], 14, uh))), 128))
          ], 42, ch))), 128))
        ])
      ], 40, oh)),
      ot.value ? (ie(), ue("div", mh, [
        Se("div", {
          class: "pnl-tst-dialog",
          role: "alertdialog",
          "aria-modal": "true",
          "aria-label": "Rename",
          "aria-describedby": "pnl-tst-confirm-message",
          onKeydown: pa
        }, [
          Se("p", yh, " Rename " + Xt(ot.value.previous) + " to " + Xt(ot.value.title) + "? If you change a file name extension, the file might become unusable. ", 1),
          Se("div", wh, [
            Se("button", {
              ref_key: "confirmYesButton",
              ref: $r,
              type: "button",
              class: "pnl-tst-dbtn",
              "aria-keyshortcuts": "Y",
              onClick: ls
            }, [...f[4] || (f[4] = [
              Se("span", { class: "pnl-tst-dkey" }, "Y", -1),
              Eo("es ", -1)
            ])], 512),
            Se("button", {
              ref_key: "confirmNoButton",
              ref: Nr,
              type: "button",
              class: "pnl-tst-dbtn",
              "aria-keyshortcuts": "N",
              onClick: as
            }, [...f[5] || (f[5] = [
              Se("span", { class: "pnl-tst-dkey" }, "N", -1),
              Eo("o ", -1)
            ])], 512)
          ])
        ], 32)
      ])) : Pt("", !0)
    ], 512));
  }
};
function Sh({ model: e, el: t }) {
  t.style.display = "block", t.style.width = "100%", t.style.height = "100%";
  const n = document.createElement("div");
  n.className = "pnl-tst-root", n.style.height = "100%", t.append(n);
  const r = /* @__PURE__ */ Ir({
    source: e.get("source") || [],
    columns: e.get("columns") || [],
    options: e.get("options") || {},
    icons: e.get("icons") || {},
    filterText: e.get("filter_text") || "",
    editingKey: e.get("editing_key") || "",
    expandedKeys: e.get("expanded_keys") || [],
    selectedKeys: e.get("selected_keys") || []
  }), o = 16, s = [];
  let i = 0;
  const l = (C, T) => {
    i += 1, s.push({ seq: i, event_name: C, event_params: T }), s.length > o && s.shift(), e.set("_event_data", { events: [...s], timestamp: Date.now() }), e.save_changes();
  }, a = (C, T) => C.length === T.length && C.every((F, M) => F === T[M]), u = (C) => (T) => {
    const F = [...e.get(C) || []].sort();
    a(F, T) || (e.set(C, T), e.save_changes());
  }, d = u("expanded_keys"), h = u("selected_keys"), I = Xu(xh, {
    state: r,
    emitEvent: l,
    setExpandedKeys: d,
    setSelectedKeys: h,
    setFilterText: (C) => {
      (e.get("filter_text") || "") !== C && (e.set("filter_text", C), e.save_changes());
    },
    setEditingKey: (C) => {
      (e.get("editing_key") || "") !== C && (e.set("editing_key", C), e.save_changes());
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
  }), e.on("change:filter_text", () => {
    r.filterText = e.get("filter_text") || "";
  }), e.on("change:editing_key", () => {
    r.editingKey = e.get("editing_key") || "";
  }), e.on("change:expanded_keys", () => {
    r.expandedKeys = e.get("expanded_keys") || [];
  }), e.on("change:selected_keys", () => {
    r.selectedKeys = e.get("selected_keys") || [];
  }), () => {
    I.unmount();
  };
}
export {
  Sh as render
};

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
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), xr = (e) => e.startsWith("onUpdate:"), Ie = Object.assign, Lo = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Pa = Object.prototype.hasOwnProperty, ee = (e, t) => Pa.call(e, t), N = Array.isArray, It = (e) => Fn(e) === "[object Map]", ur = (e) => Fn(e) === "[object Set]", ms = (e) => Fn(e) === "[object Date]", U = (e) => typeof e == "function", ge = (e) => typeof e == "string", rt = (e) => typeof e == "symbol", re = (e) => e !== null && typeof e == "object", vi = (e) => (re(e) || U(e)) && U(e.then) && U(e.catch), mi = Object.prototype.toString, Fn = (e) => mi.call(e), Ta = (e) => Fn(e).slice(8, -1), yi = (e) => Fn(e) === "[object Object]", Ko = (e) => ge(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, bn = /* @__PURE__ */ jo(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Sr = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Da = /-\w/g, We = Sr(
  (e) => e.replace(Da, (t) => t.slice(1).toUpperCase())
), ka = /\B([A-Z])/g, $t = Sr(
  (e) => e.replace(ka, "-$1").toLowerCase()
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
}, Fa = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let ys;
const Rr = () => ys || (ys = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function en(e) {
  if (N(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], o = ge(r) ? Ka(r) : en(r);
      if (o)
        for (const s in o)
          t[s] = o[s];
    }
    return t;
  } else if (ge(e) || re(e))
    return e;
}
const Ha = /;(?![^(]*\))/g, ja = /:([^]+)/, La = /\/\*[^]*?\*\//g;
function Ka(e) {
  const t = {};
  return e.replace(La, "").split(Ha).forEach((n) => {
    if (n) {
      const r = n.split(ja);
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
const Va = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Ba = /* @__PURE__ */ jo(Va);
function _i(e) {
  return !!e || e === "";
}
function $a(e, t) {
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
    return n && r ? $a(e, t) : !1;
  if (n = re(e), r = re(t), n || r) {
    if (!n || !r)
      return !1;
    if (n = It(e), r = It(t), n || r || (n = ur(e), r = ur(t), n || r))
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
const xi = (e) => !!(e && e.__v_isRef === !0), Xt = (e) => ge(e) ? e : e == null ? "" : N(e) || re(e) && (e.toString === mi || !U(e.toString)) ? xi(e) ? Xt(e.value) : JSON.stringify(e, Si, 2) : String(e), Si = (e, t) => xi(t) ? Si(e, t.value) : It(t) ? {
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
class Na {
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
function Wa(e, t = !1) {
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
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Mi(this);
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
let Ii = 0, _n, xn;
function Mi(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = xn, xn = e;
    return;
  }
  e.next = _n, _n = e;
}
function Vo() {
  Ii++;
}
function Bo() {
  if (--Ii > 0)
    return;
  if (xn) {
    let t = xn;
    for (xn = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; _n; ) {
    let t = _n;
    for (_n = void 0; t; ) {
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
    r.version === -1 ? (r === n && (n = o), $o(r), Ua(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = o;
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
function Ua(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let Ue = !0;
const Pi = [];
function ft() {
  Pi.push(Ue), Ue = !1;
}
function dt() {
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
class za {
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
      n = this.activeLink = new za(le, this), le.deps ? (n.prevDep = le.depsTail, le.depsTail.nextDep = n, le.depsTail = n) : le.deps = le.depsTail = n, Ti(n);
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
), En = /* @__PURE__ */ Symbol(
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
function ct(e, t, n, r, o, s) {
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
        (w === "length" || w === En || !rt(w) && w >= d) && l(h);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && l(i.get(n)), u && l(i.get(En)), t) {
        case "add":
          a ? u && l(i.get("length")) : (l(i.get(kt)), It(e) && l(i.get(bo)));
          break;
        case "delete":
          a || (l(i.get(kt)), It(e) && l(i.get(bo)));
          break;
        case "set":
          It(e) && l(i.get(kt));
          break;
      }
  }
  Bo();
}
function Yt(e) {
  const t = /* @__PURE__ */ Q(e);
  return t === e ? t : (Re(t, "iterate", En), /* @__PURE__ */ $e(e) ? t : t.map(ze));
}
function Ir(e) {
  return Re(e = /* @__PURE__ */ Q(e), "iterate", En), e;
}
function Ze(e, t) {
  return /* @__PURE__ */ pt(e) ? rn(/* @__PURE__ */ Ft(e) ? ze(t) : t) : ze(t);
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
    return it(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return it(
      this,
      "filter",
      e,
      t,
      (n) => n.map((r) => Ze(this, r)),
      arguments
    );
  },
  find(e, t) {
    return it(
      this,
      "find",
      e,
      t,
      (n) => Ze(this, n),
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
      (n) => Ze(this, n),
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
    return it(this, "map", e, t, void 0, arguments);
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
    return it(this, "some", e, t, void 0, arguments);
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
  const r = Ir(e), o = r[t]();
  return r !== e && !/* @__PURE__ */ $e(e) && (o._next = o.next, o.next = () => {
    const s = o._next();
    return s.done || (s.value = n(s.value)), s;
  }), o;
}
const Ga = Array.prototype;
function it(e, t, n, r, o, s) {
  const i = Ir(e), l = i !== e && !/* @__PURE__ */ $e(e), a = i[t];
  if (a !== Ga[t]) {
    const h = a.apply(e, s);
    return l ? ze(h) : h;
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
  const o = Ir(e), s = o !== e && !/* @__PURE__ */ $e(e);
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
  Re(r, "iterate", En);
  const o = r[t](...n);
  return (o === -1 || o === !1) && /* @__PURE__ */ zo(n[0]) ? (n[0] = /* @__PURE__ */ Q(n[0]), r[t](...n)) : o;
}
function gn(e, t, n = []) {
  ft(), Vo();
  const r = (/* @__PURE__ */ Q(e))[t].apply(e, n);
  return Bo(), dt(), r;
}
const Ya = /* @__PURE__ */ jo("__proto__,__v_isRef,__isVue"), Di = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(rt)
);
function Xa(e) {
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
      return r === (o ? s ? ic : Li : s ? ji : Hi).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const i = N(t);
    if (!o) {
      let a;
      if (i && (a = qa[n]))
        return a;
      if (n === "hasOwnProperty")
        return Xa;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ Ce(t) ? t : r
    );
    if ((rt(n) ? Di.has(n) : Ya(n)) || (o || Re(t, "get", n), s))
      return l;
    if (/* @__PURE__ */ Ce(l)) {
      const a = i && Ko(n) ? l : l.value;
      return o && re(a) ? /* @__PURE__ */ xo(a) : a;
    }
    return re(l) ? o ? /* @__PURE__ */ xo(l) : /* @__PURE__ */ Mr(l) : l;
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
      const u = /* @__PURE__ */ pt(s);
      if (!/* @__PURE__ */ $e(r) && !/* @__PURE__ */ pt(r) && (s = /* @__PURE__ */ Q(s), r = /* @__PURE__ */ Q(r)), !i && /* @__PURE__ */ Ce(s) && !/* @__PURE__ */ Ce(r))
        return u || (s.value = r), !0;
    }
    const l = i ? Number(n) < t.length : ee(t, n), a = Reflect.set(
      t,
      n,
      r,
      /* @__PURE__ */ Ce(t) ? t : o
    );
    return t === /* @__PURE__ */ Q(o) && a && (l ? et(r, s) && ct(t, "set", n, r) : ct(t, "add", n, r)), a;
  }
  deleteProperty(t, n) {
    const r = ee(t, n);
    t[n];
    const o = Reflect.deleteProperty(t, n);
    return o && r && ct(t, "delete", n, void 0), o;
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
class Ja extends ki {
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
const Za = /* @__PURE__ */ new Fi(), Qa = /* @__PURE__ */ new Ja(), ec = /* @__PURE__ */ new Fi(!0);
const _o = (e) => e, Jn = (e) => Reflect.getPrototypeOf(e);
function tc(e, t, n) {
  return function(...r) {
    const o = this.__v_raw, s = /* @__PURE__ */ Q(o), i = It(s), l = e === "entries" || e === Symbol.iterator && i, a = e === "keys" && i, u = o[e](...r), d = n ? _o : t ? rn : ze;
    return !t && Re(
      s,
      "iterate",
      a ? bo : kt
    ), Ie(
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
function Zn(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function nc(e, t) {
  const n = {
    get(o) {
      const s = this.__v_raw, i = /* @__PURE__ */ Q(s), l = /* @__PURE__ */ Q(o);
      e || (et(o, l) && Re(i, "get", o), Re(i, "get", l));
      const { has: a } = Jn(i), u = t ? _o : e ? rn : ze;
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
      const i = this, l = i.__v_raw, a = /* @__PURE__ */ Q(l), u = t ? _o : e ? rn : ze;
      return !e && Re(a, "iterate", kt), l.forEach((d, h) => o.call(s, u(d), u(h), i));
    }
  };
  return Ie(
    n,
    e ? {
      add: Zn("add"),
      set: Zn("set"),
      delete: Zn("delete"),
      clear: Zn("clear")
    } : {
      add(o) {
        const s = /* @__PURE__ */ Q(this), i = Jn(s), l = /* @__PURE__ */ Q(o), a = !t && !/* @__PURE__ */ $e(o) && !/* @__PURE__ */ pt(o) ? l : o;
        return i.has.call(s, a) || et(o, a) && i.has.call(s, o) || et(l, a) && i.has.call(s, l) || (s.add(a), ct(s, "add", a, a)), this;
      },
      set(o, s) {
        !t && !/* @__PURE__ */ $e(s) && !/* @__PURE__ */ pt(s) && (s = /* @__PURE__ */ Q(s));
        const i = /* @__PURE__ */ Q(this), { has: l, get: a } = Jn(i);
        let u = l.call(i, o);
        u || (o = /* @__PURE__ */ Q(o), u = l.call(i, o));
        const d = a.call(i, o);
        return i.set(o, s), u ? et(s, d) && ct(i, "set", o, s) : ct(i, "add", o, s), this;
      },
      delete(o) {
        const s = /* @__PURE__ */ Q(this), { has: i, get: l } = Jn(s);
        let a = i.call(s, o);
        a || (o = /* @__PURE__ */ Q(o), a = i.call(s, o)), l && l.call(s, o);
        const u = s.delete(o);
        return a && ct(s, "delete", o, void 0), u;
      },
      clear() {
        const o = /* @__PURE__ */ Q(this), s = o.size !== 0, i = o.clear();
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
    n[o] = tc(o, e, t);
  }), n;
}
function Wo(e, t) {
  const n = nc(e, t);
  return (r, o, s) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(
    ee(n, o) && o in r ? n : r,
    o,
    s
  );
}
const rc = {
  get: /* @__PURE__ */ Wo(!1, !1)
}, oc = {
  get: /* @__PURE__ */ Wo(!1, !0)
}, sc = {
  get: /* @__PURE__ */ Wo(!0, !1)
};
const Hi = /* @__PURE__ */ new WeakMap(), ji = /* @__PURE__ */ new WeakMap(), Li = /* @__PURE__ */ new WeakMap(), ic = /* @__PURE__ */ new WeakMap();
function lc(e) {
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
function Mr(e) {
  return /* @__PURE__ */ pt(e) ? e : Uo(
    e,
    !1,
    Za,
    rc,
    Hi
  );
}
// @__NO_SIDE_EFFECTS__
function ac(e) {
  return Uo(
    e,
    !1,
    ec,
    oc,
    ji
  );
}
// @__NO_SIDE_EFFECTS__
function xo(e) {
  return Uo(
    e,
    !0,
    Qa,
    sc,
    Li
  );
}
function Uo(e, t, n, r, o) {
  if (!re(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const s = o.get(e);
  if (s)
    return s;
  const i = lc(Ta(e));
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
  return /* @__PURE__ */ pt(e) ? /* @__PURE__ */ Ft(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function pt(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function $e(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function zo(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function Q(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ Q(t) : e;
}
function cc(e) {
  return !ee(e, "__v_skip") && Object.isExtensible(e) && bi(e, "__v_skip", !0), e;
}
const ze = (e) => re(e) ? /* @__PURE__ */ Mr(e) : e, rn = (e) => re(e) ? /* @__PURE__ */ xo(e) : e;
// @__NO_SIDE_EFFECTS__
function Ce(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function be(e) {
  return Ki(e, !1);
}
// @__NO_SIDE_EFFECTS__
function uc(e) {
  return Ki(e, !0);
}
function Ki(e, t) {
  return /* @__PURE__ */ Ce(e) ? e : new fc(e, t);
}
class fc {
  constructor(t, n) {
    this.dep = new No(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ Q(t), this._value = n ? t : ze(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, r = this.__v_isShallow || /* @__PURE__ */ $e(t) || /* @__PURE__ */ pt(t);
    t = r ? t : /* @__PURE__ */ Q(t), et(t, n) && (this._rawValue = t, this._value = r ? t : ze(t), this.dep.trigger());
  }
}
function Ht(e) {
  return /* @__PURE__ */ Ce(e) ? e.value : e;
}
const dc = {
  get: (e, t, n) => t === "__v_raw" ? e : Ht(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return /* @__PURE__ */ Ce(o) && !/* @__PURE__ */ Ce(n) ? (o.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function Vi(e) {
  return /* @__PURE__ */ Ft(e) ? e : new Proxy(e, dc);
}
class pc {
  constructor(t, n, r) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new No(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Mn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    le !== this)
      return Mi(this, !0), !0;
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
function gc(e, t, n = !1) {
  let r, o;
  return U(e) ? r = e : (r = e.get, o = e.set), new pc(r, o, n);
}
const Qn = {}, fr = /* @__PURE__ */ new WeakMap();
let Tt;
function hc(e, t = !1, n = Tt) {
  if (n) {
    let r = fr.get(n);
    r || fr.set(n, r = []), r.push(e);
  }
}
function vc(e, t, n = ae) {
  const { immediate: r, deep: o, once: s, scheduler: i, augmentJob: l, call: a } = n, u = (E) => o ? E : /* @__PURE__ */ $e(E) || o === !1 || o === 0 ? Ct(E, 1) : Ct(E);
  let d, h, w, y, M = !1, C = !1;
  if (/* @__PURE__ */ Ce(e) ? (h = () => e.value, M = /* @__PURE__ */ $e(e)) : /* @__PURE__ */ Ft(e) ? (h = () => u(e), M = !0) : N(e) ? (C = !0, M = e.some((E) => /* @__PURE__ */ Ft(E) || /* @__PURE__ */ $e(E)), h = () => e.map((E) => {
    if (/* @__PURE__ */ Ce(E))
      return E.value;
    if (/* @__PURE__ */ Ft(E))
      return u(E);
    if (U(E))
      return a ? a(E, 2) : E();
  })) : U(e) ? t ? h = a ? () => a(e, 2) : e : h = () => {
    if (w) {
      ft();
      try {
        w();
      } finally {
        dt();
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
  let I = C ? new Array(e.length).fill(Qn) : Qn;
  const L = (E) => {
    if (!(!(d.flags & 1) || !d.dirty && !E))
      if (t) {
        const $ = d.run();
        if (E || o || M || (C ? $.some((W, fe) => et(W, I[fe])) : et($, I))) {
          w && w();
          const W = Tt;
          Tt = d;
          try {
            const fe = [
              $,
              // pass undefined as the old value when it's changed for the first time
              I === Qn ? void 0 : C && I[0] === Qn ? [] : I,
              y
            ];
            I = $, a ? a(t, 3, fe) : (
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
  return l && l(L), d = new Ci(h), d.scheduler = i ? () => i(L, !1) : L, y = (E) => hc(E, !1, d), w = d.onStop = () => {
    const E = fr.get(d);
    if (E) {
      if (a)
        a(E, 4);
      else
        for (const $ of E) $();
      fr.delete(d);
    }
  }, t ? r ? L(!0) : I = d.run() : i ? i(L.bind(null, !0), !0) : d.run(), F.pause = d.pause.bind(d), F.resume = d.resume.bind(d), F.stop = F, F;
}
function Ct(e, t = 1 / 0, n) {
  if (t <= 0 || !re(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ Ce(e))
    Ct(e.value, t, n);
  else if (N(e))
    for (let r = 0; r < e.length; r++)
      Ct(e[r], t, n);
  else if (ur(e) || It(e))
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
function Hn(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (o) {
    Er(o, t, n);
  }
}
function qe(e, t, n, r) {
  if (U(e)) {
    const o = Hn(e, t, n, r);
    return o && vi(o) && o.catch((s) => {
      Er(s, t, n);
    }), o;
  }
  if (N(e)) {
    const o = [];
    for (let s = 0; s < e.length; s++)
      o.push(qe(e[s], t, n, r));
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
      ft(), Hn(s, null, 10, [
        e,
        a,
        u
      ]), dt();
      return;
    }
  }
  mc(e, n, o, r, i);
}
function mc(e, t, n, r = !0, o = !1) {
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
function yc(e) {
  let t = Je + 1, n = Ae.length;
  for (; t < n; ) {
    const r = t + n >>> 1, o = Ae[r], s = An(o);
    s < e || s === e && o.flags & 2 ? t = r + 1 : n = r;
  }
  return t;
}
function qo(e) {
  if (!(e.flags & 1)) {
    const t = An(e), n = Ae[Ae.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= An(n) ? Ae.push(e) : Ae.splice(yc(t), 0, e), e.flags |= 1, $i();
  }
}
function $i() {
  dr || (dr = Bi.then(Wi));
}
function wc(e) {
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
      (n, r) => An(n) - An(r)
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
const An = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Wi(e) {
  try {
    for (Je = 0; Je < Ae.length; Je++) {
      const t = Ae[Je];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Hn(
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
function bc(e, t = tt, n) {
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
    a && (ft(), qe(a, n, 8, [
      e.el,
      l,
      e,
      t
    ]), dt());
  }
}
function _c(e, t) {
  if (Pe) {
    let n = Pe.provides;
    const r = Pe.parent && Pe.parent.provides;
    r === n && (n = Pe.provides = Object.create(r)), n[e] = t;
  }
}
function ir(e, t, n = !1) {
  const r = mu();
  if (r || nn) {
    let o = nn ? nn._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && U(t) ? t.call(r && r.proxy) : t;
  }
}
const xc = /* @__PURE__ */ Symbol.for("v-scx"), Sc = () => ir(xc);
function _e(e, t, n) {
  return zi(e, t, n);
}
function zi(e, t, n = ae) {
  const { immediate: r, deep: o, flush: s, once: i } = n, l = Ie({}, n), a = t && r || !t && s !== "post";
  let u;
  if (Tn) {
    if (s === "sync") {
      const y = Sc();
      u = y.__watcherHandles || (y.__watcherHandles = []);
    } else if (!a) {
      const y = () => {
      };
      return y.stop = nt, y.resume = nt, y.pause = nt, y;
    }
  }
  const d = Pe;
  l.call = (y, M, C) => qe(y, d, M, C);
  let h = !1;
  s === "post" ? l.scheduler = (y) => {
    De(y, d && d.suspense);
  } : s !== "sync" && (h = !0, l.scheduler = (y, M) => {
    M ? y() : qo(y);
  }), l.augmentJob = (y) => {
    t && (y.flags |= 4), h && (y.flags |= 2, d && (y.id = d.uid, y.i = d));
  };
  const w = vc(e, t, l);
  return Tn && (u ? u.push(w) : a && w()), w;
}
function Rc(e, t, n) {
  const r = this.proxy, o = ge(e) ? e.includes(".") ? qi(r, e) : () => r[e] : e.bind(r, r);
  let s;
  U(t) ? s = t : (s = t.handler, n = t);
  const i = jn(this), l = zi(o, s.bind(r), n);
  return i(), l;
}
function qi(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++)
      r = r[n[o]];
    return r;
  };
}
const Cc = /* @__PURE__ */ Symbol("_vte"), Ar = (e) => e.__isTeleport, so = /* @__PURE__ */ Symbol("_leaveCb");
function Ic(e) {
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
function Gi(e) {
  if (!Yo(e))
    return Ar(e.type) && e.children ? Ic(e.children) : e;
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
function Sn(e, t, n, r, o = !1) {
  if (N(e)) {
    e.forEach(
      (C, T) => Sn(
        C,
        t && (N(t) ? t[T] : t),
        n,
        r,
        o
      )
    );
    return;
  }
  if (Rn(r) && !o) {
    r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && Sn(e, t, n, r.component.subTree);
    return;
  }
  const s = r.shapeFlag & 4 ? Zo(r.component) : r.el, i = o ? null : s, { i: l, r: a } = e, u = t && t.r, d = l.refs === ae ? l.refs = {} : l.refs, h = l.setupState, w = /* @__PURE__ */ Q(h), y = h === ae ? hi : (C) => Ss(d, C) ? !1 : ee(w, C), M = (C, T) => !(T && Ss(d, T));
  if (u != null && u !== a) {
    if (Rs(t), ge(u))
      d[u] = null, y(u) && (h[u] = null);
    else if (/* @__PURE__ */ Ce(u)) {
      const C = t;
      M(u, C.k) && (u.value = null), C.k && (d[C.k] = null);
    }
  }
  if (U(a))
    Hn(a, l, 12, [i, d]);
  else {
    const C = ge(a), T = /* @__PURE__ */ Ce(a);
    if (C || T) {
      const F = () => {
        if (e.f) {
          const I = C ? y(a) ? h[a] : d[a] : M() || !e.k ? a.value : d[e.k];
          if (o)
            N(I) && Lo(I, s);
          else if (N(I))
            I.includes(s) || I.push(s);
          else if (C)
            d[a] = [s], y(a) && (h[a] = d[a]);
          else {
            const L = [s];
            M(a, e.k) && (a.value = L), e.k && (d[e.k] = L);
          }
        } else C ? (d[a] = i, y(a) && (h[a] = i)) : T && (M(a, e.k) && (a.value = i), e.k && (d[e.k] = i));
      };
      if (i) {
        const I = () => {
          F(), gr.delete(e);
        };
        I.id = -1, gr.set(e, I), De(I, n);
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
const Rn = (e) => !!e.type.__asyncLoader, Yo = (e) => e.type.__isKeepAlive;
function Mc(e, t) {
  Xi(e, "a", t);
}
function Ec(e, t) {
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
      Yo(o.parent.vnode) && Ac(r, t, n, o), o = o.parent;
  }
}
function Ac(e, t, n, r) {
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
      ft();
      const l = jn(n), a = qe(t, n, e, i);
      return l(), dt(), a;
    });
    return r ? o.unshift(s) : o.push(s), s;
  }
}
const vt = (e) => (t, n = Pe) => {
  (!Tn || e === "sp") && Or(e, (...r) => t(...r), n);
}, Oc = vt("bm"), So = vt("m"), Pc = vt(
  "bu"
), Tc = vt("u"), Ji = vt(
  "bum"
), Zi = vt("um"), Dc = vt(
  "sp"
), kc = vt("rtg"), Fc = vt("rtc");
function Hc(e, t = Pe) {
  Or("ec", e, t);
}
const jc = /* @__PURE__ */ Symbol.for("v-ndc");
function er(e, t, n, r) {
  let o;
  const s = n, i = N(e);
  if (i || ge(e)) {
    const l = i && /* @__PURE__ */ Ft(e);
    let a = !1, u = !1;
    l && (a = !/* @__PURE__ */ $e(e), u = /* @__PURE__ */ pt(e), e = Ir(e)), o = new Array(e.length);
    for (let d = 0, h = e.length; d < h; d++)
      o[d] = t(
        a ? u ? rn(ze(e[d])) : ze(e[d]) : e[d],
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
const Ro = (e) => e ? bl(e) ? Zo(e) : Ro(e.parent) : null, Cn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Ie(/* @__PURE__ */ Object.create(null), {
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
      qo(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = St.bind(e.proxy)),
    $watch: (e) => Rc.bind(e)
  })
), io = (e, t) => e !== ae && !e.__isScriptSetup && ee(e, t), Lc = {
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
    const u = Cn[t];
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
    return !!(n[l] || e !== ae && l[0] !== "$" && ee(e, l) || io(t, l) || ee(s, l) || ee(r, l) || ee(Cn, l) || ee(o.config.globalProperties, l) || (a = i.__cssModules) && a[l]);
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
function Kc(e) {
  const t = el(e), n = e.proxy, r = e.ctx;
  Co = !1, t.beforeCreate && Is(t.beforeCreate, e, "bc");
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
    updated: M,
    activated: C,
    deactivated: T,
    beforeDestroy: F,
    beforeUnmount: I,
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
  if (u && Vc(u, r, null), i)
    for (const X in i) {
      const ne = i[X];
      U(ne) && (r[X] = ne.bind(n));
    }
  if (o) {
    const X = o.call(n, n);
    re(X) && (e.data = /* @__PURE__ */ Mr(X));
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
      _c(ne, X[ne]);
    });
  }
  d && Is(d, e, "c");
  function te(X, ne) {
    N(ne) ? ne.forEach((ke) => X(ke.bind(n))) : ne && X(ne.bind(n));
  }
  if (te(Oc, h), te(So, w), te(Pc, y), te(Tc, M), te(Mc, C), te(Ec, T), te(Hc, k), te(Fc, W), te(kc, fe), te(Ji, I), te(Zi, E), te(Dc, H), N(G))
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
function Vc(e, t, n = nt) {
  N(e) && (e = Io(e));
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
function Is(e, t, n) {
  qe(
    N(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Qi(e, t, n, r) {
  let o = r.includes(".") ? qi(n, r) : () => n[r];
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
      const l = Bc[i] || n && n[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const Bc = {
  data: Ms,
  props: Es,
  emits: Es,
  // objects
  methods: yn,
  computed: yn,
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
  components: yn,
  directives: yn,
  // watch
  watch: Nc,
  // provide / inject
  provide: Ms,
  inject: $c
};
function Ms(e, t) {
  return t ? e ? function() {
    return Ie(
      U(e) ? e.call(this, this) : e,
      U(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function $c(e, t) {
  return yn(Io(e), Io(t));
}
function Io(e) {
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
function yn(e, t) {
  return e ? Ie(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Es(e, t) {
  return e ? N(e) && N(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Ie(
    /* @__PURE__ */ Object.create(null),
    Cs(e),
    Cs(t ?? {})
  ) : t;
}
function Nc(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Ie(/* @__PURE__ */ Object.create(null), e);
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
let Wc = 0;
function Uc(e, t) {
  return function(r, o = null) {
    U(r) || (r = Ie({}, r)), o != null && !re(o) && (o = null);
    const s = tl(), i = /* @__PURE__ */ new WeakSet(), l = [];
    let a = !1;
    const u = s.app = {
      _uid: Wc++,
      _component: r,
      _props: o,
      _container: null,
      _context: s,
      _instance: null,
      version: Su,
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
          const y = u._ceVNode || ut(r, o);
          return y.appContext = s, w === !0 ? w = "svg" : w === !1 && (w = void 0), e(y, d, w), a = !0, u._container = d, d.__vue_app__ = u, Zo(y.component);
        }
      },
      onUnmount(d) {
        l.push(d);
      },
      unmount() {
        a && (qe(
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
const zc = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${We(t)}Modifiers`] || e[`${$t(t)}Modifiers`];
function qc(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || ae;
  let o = n;
  const s = t.startsWith("update:"), i = s && zc(r, t.slice(7));
  i && (i.trim && (o = n.map((d) => ge(d) ? d.trim() : d)), i.number && (o = o.map(Fa)));
  let l, a = r[l = Qr(t)] || // also try camelCase event handler (#2249)
  r[l = Qr(We(t))];
  !a && s && (a = r[l = Qr($t(t))]), a && qe(
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
    e.emitted[l] = !0, qe(
      u,
      e,
      6,
      o
    );
  }
}
const Gc = /* @__PURE__ */ new WeakMap();
function nl(e, t, n = !1) {
  const r = n ? Gc : t.emitsCache, o = r.get(e);
  if (o !== void 0)
    return o;
  const s = e.emits;
  let i = {}, l = !1;
  if (!U(e)) {
    const a = (u) => {
      const d = nl(u, t, !0);
      d && (l = !0, Ie(i, d));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !s && !l ? (re(e) && r.set(e, null), null) : (N(s) ? s.forEach((a) => i[a] = null) : Ie(i, s), re(e) && r.set(e, i), i);
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
    ctx: M,
    inheritAttrs: C
  } = e, T = pr(e);
  let F, I;
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
          M
        )
      ), I = l;
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
      ), I = t.props ? l : Yc(l);
    }
  } catch (E) {
    jt.length = 0, Er(E, e, 1), F = ut(gt);
  }
  let L = F;
  if (I && C !== !1) {
    const E = Object.keys(I), { shapeFlag: $ } = L;
    E.length && $ & 7 && (s && E.some(xr) && (I = Xc(
      I,
      s
    )), L = on(L, I, !1, !0));
  }
  if (n.dirs && (L = on(L, null, !1, !0), L.dirs = L.dirs ? L.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const E = Ar(L.type) && Gi(L) || L;
    Go(E, n.transition);
  }
  return F = L, pr(T), F;
}
const Yc = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || _r(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Xc = (e, t) => {
  const n = {};
  for (const r in e)
    (!xr(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
  return n;
};
function Jc(e, t, n) {
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
function Zc({ vnode: e, parent: t, suspense: n }, r) {
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
function Qc(e, t, n, r = !1) {
  const o = {}, s = sl();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), ll(e, t, o, s);
  for (const i in e.propsOptions[0])
    i in o || (o[i] = void 0);
  n ? e.props = r ? o : /* @__PURE__ */ ac(o) : e.type.props ? e.props = o : e.props = s, e.attrs = s;
}
function eu(e, t, n, r) {
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
            const M = We(w);
            o[M] = Mo(
              a,
              l,
              M,
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
      n[d] !== void 0) && (o[h] = Mo(
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
  u && ct(e.attrs, "set", "");
}
function ll(e, t, n, r) {
  const [o, s] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let a in t) {
      if (bn(a))
        continue;
      const u = t[a];
      let d;
      o && ee(o, d = We(a)) ? !s || !s.includes(d) ? n[d] = u : (l || (l = {}))[d] = u : Pr(e.emitsOptions, a) || (!(a in r) || u !== r[a]) && (r[a] = u, i = !0);
    }
  if (s) {
    const a = /* @__PURE__ */ Q(n), u = l || ae;
    for (let d = 0; d < s.length; d++) {
      const h = s[d];
      n[h] = Mo(
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
function Mo(e, t, n, r, o, s) {
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
          const d = jn(o);
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
const tu = /* @__PURE__ */ new WeakMap();
function al(e, t, n = !1) {
  const r = n ? tu : t.propsCache, o = r.get(e);
  if (o)
    return o;
  const s = e.props, i = {}, l = [];
  let a = !1;
  if (!U(e)) {
    const d = (h) => {
      a = !0;
      const [w, y] = al(h, t, !0);
      Ie(i, w), y && l.push(...y);
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
        const w = s[d], y = i[h] = N(w) || U(w) ? { type: w } : Ie({}, w), M = y.type;
        let C = !1, T = !0;
        if (N(M))
          for (let F = 0; F < M.length; ++F) {
            const I = M[F], L = U(I) && I.name;
            if (L === "Boolean") {
              C = !0;
              break;
            } else L === "String" && (T = !1);
          }
        else
          C = U(M) && M.name === "Boolean";
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
  return e[0] !== "$" && !bn(e);
}
const Xo = (e) => e === "_" || e === "_ctx" || e === "$stable", Jo = (e) => N(e) ? e.map(Qe) : [Qe(e)], nu = (e, t, n) => {
  if (t._n)
    return t;
  const r = bc((...o) => Jo(t(...o)), n);
  return r._c = !1, r;
}, cl = (e, t, n) => {
  const r = e._ctx;
  for (const o in e) {
    if (Xo(o)) continue;
    const s = e[o];
    if (U(s))
      t[o] = nu(o, s, r);
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
}, ru = (e, t, n) => {
  const r = e.slots = sl();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (fl(r, t, n), n && bi(r, "_", o, !0)) : cl(t, r);
  } else t && ul(e, t);
}, ou = (e, t, n) => {
  const { vnode: r, slots: o } = e;
  let s = !0, i = ae;
  if (r.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? s = !1 : fl(o, t, n) : (s = !t.$stable, cl(t, o)), i = t;
  } else t && (ul(e, t), i = { default: 1 });
  if (s)
    for (const l in o)
      !Xo(l) && i[l] == null && delete o[l];
}, De = cu;
function su(e) {
  return iu(e);
}
function iu(e, t) {
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
    insertStaticContent: M
  } = e, C = (p, g, m, R = null, S = null, _ = null, P = void 0, O = null, A = !!g.dynamicChildren) => {
    if (p === g)
      return;
    p && !hn(p, g) && (R = zt(p), Le(p, S, _, !0), p = null), g.patchFlag === -2 && (A = !1, g.dynamicChildren = null);
    const { type: x, ref: K, shapeFlag: D } = g;
    switch (x) {
      case Tr:
        T(p, g, m, R);
        break;
      case gt:
        F(p, g, m, R);
        break;
      case ao:
        p == null && I(g, m, R, P);
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
    K != null && S ? Sn(K, p && p.ref, _, g || p, !g) : K == null && p && p.ref != null && Sn(p.ref, null, _, p, !0);
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
  }, I = (p, g, m, R) => {
    [p.el, p.anchor] = M(
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
        J !== "value" && !bn(J) && s(A, J, null, K[J], _, R);
      "value" in K && s(A, "value", null, K.value, _), (x = K.onVnodeBeforeMount) && Xe(x, R, p);
    }
    B && At(p, null, R, "beforeMount");
    const q = lu(S, j);
    q && j.beforeEnter(A), r(A, g, m), ((x = K && K.onVnodeMounted) || q || B) && De(() => {
      try {
        x && Xe(x, R, p), q && j.enter(A), B && At(p, null, R, "mounted");
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
      const K = p[x] = O ? at(p[x]) : Qe(p[x]);
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
        const q = g.dynamicProps;
        for (let J = 0; J < q.length; J++) {
          const Z = q[J], ce = D[Z], me = j[Z];
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
          !bn(_) && !(_ in m) && s(
            p,
            _,
            g[_],
            null,
            S,
            R
          );
      for (const _ in m) {
        if (bn(_)) continue;
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
    ) : Me(p, g, A);
  }, Te = (p, g, m, R, S, _, P) => {
    const O = p.component = vu(
      p,
      R,
      S
    );
    if (Yo(p) && (O.ctx.renderer = Ye), yu(O, !1, P), O.asyncDep) {
      if (S && S.registerDep(O, te, P), !p.el) {
        const A = O.subTree = ut(gt);
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
  }, Me = (p, g, m) => {
    const R = g.component = p.component;
    if (Jc(p, g, m))
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
        let { next: D, bu: j, u: B, parent: q, vnode: J } = p;
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
        Ot(p, !1), D ? (D.el = J.el, X(p, D, P)) : D = J, j && eo(j), (ce = D.props && D.props.onVnodeBeforeUpdate) && Xe(ce, q, D, J), Ot(p, !0);
        const me = As(p), Ve = p.subTree;
        p.subTree = me, C(
          Ve,
          me,
          // parent may have changed if it's in a teleport
          h(Ve.el),
          // anchor may have changed if it's in a fragment
          zt(Ve),
          p,
          S,
          _
        ), D.el = me.el, Z === null && Zc(p, me.el), B && De(B, S), (ce = D.props && D.props.onVnodeUpdated) && De(
          () => Xe(ce, q, D, J),
          S
        );
      } else {
        let D;
        const { el: j, props: B } = g, { bm: q, m: J, parent: Z, root: ce, type: me } = p, Ve = Rn(g);
        Ot(p, !1), q && eo(q), !Ve && (D = B && B.onVnodeBeforeMount) && Xe(D, Z, g), Ot(p, !0);
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
        (g.shapeFlag & 256 || Z && Rn(Z.vnode) && Z.vnode.shapeFlag & 256) && p.a && De(p.a, S), p.isMounted = !0, g = m = R = null;
      }
    };
    p.scope.on();
    const A = p.effect = new Ci(O);
    p.scope.off();
    const x = p.update = A.run.bind(A), K = p.job = A.runIfDirty.bind(A);
    K.i = p, K.id = p.uid, A.scheduler = () => qo(K), Ot(p, !0), x();
  }, X = (p, g, m) => {
    g.component = p;
    const R = p.vnode.props;
    p.vnode = g, p.next = null, eu(p, g.props, R, m), ou(p, g.children, m), ft(), xs(p), dt();
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
      const B = g[j] = A ? at(g[j]) : Qe(g[j]);
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
      const B = p[x], q = g[x] = A ? at(g[x]) : Qe(g[x]);
      if (hn(B, q))
        C(
          B,
          q,
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
      const B = p[D], q = g[j] = A ? at(g[j]) : Qe(g[j]);
      if (hn(B, q))
        C(
          B,
          q,
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
        const B = j + 1, q = B < K ? g[B].el : R;
        for (; x <= j; )
          C(
            null,
            g[x] = A ? at(g[x]) : Qe(g[x]),
            m,
            q,
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
      const B = x, q = x, J = /* @__PURE__ */ new Map();
      for (x = q; x <= j; x++) {
        const we = g[x] = A ? at(g[x]) : Qe(g[x]);
        we.key != null && J.set(we.key, x);
      }
      let Z, ce = 0;
      const me = j - q + 1;
      let Ve = !1, He = 0;
      const bt = new Array(me);
      for (x = 0; x < me; x++) bt[x] = 0;
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
          for (Z = q; Z <= j; Z++)
            if (bt[Z - q] === 0 && hn(we, g[Z])) {
              pe = Z;
              break;
            }
        pe === void 0 ? Le(we, S, _, !0) : (bt[pe - q] = x + 1, pe >= He ? He = pe : Ve = !0, C(
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
      const Et = Ve ? au(bt) : Qt;
      for (Z = Et.length - 1, x = me - 1; x >= 0; x--) {
        const we = q + x, pe = g[we], Bn = g[we + 1], cn = we + 1 < K ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Bn.el || gl(Bn)
        ) : R;
        bt[x] === 0 ? C(
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
        const { leave: D, delayLeave: j, afterLeave: B } = O, q = () => {
          p.ctx.isUnmounted ? o(_) : r(_, g, m);
        }, J = () => {
          const Z = _._isLeaving || !!_[so];
          _._isLeaving && _[so](
            !0
            /* cancelled */
          ), O.persisted && !Z ? q() : D(_, () => {
            q(), B && B();
          });
        };
        j ? j(_, q, J) : J();
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
      memo: q
    } = p;
    if (D === -2 && (S = !1), O != null && (ft(), Sn(O, null, m, p, !0), dt()), B != null && (g.renderCache[B] = void 0), K & 256) {
      g.ctx.deactivate(p);
      return;
    }
    const J = K & 1 && j, Z = !Rn(p);
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
      ) : (_ === Oe && D & 384 || !S && K & 16) && Ke(A, g, m), R && mt(p);
    }
    const me = q != null && B == null;
    (Z && (ce = P && P.onVnodeUnmounted) || J || me) && De(() => {
      ce && Xe(ce, g, p), J && At(p, null, g, "unmounted"), me && (p.el = null);
    }, m);
  }, mt = (p) => {
    const { type: g, el: m, anchor: R, transition: S } = p;
    if (g === Oe) {
      yt(m, R);
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
  }, yt = (p, g) => {
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
  }, zt = (p) => {
    if (p.shapeFlag & 6)
      return zt(p.component.subTree);
    if (p.shapeFlag & 128)
      return p.suspense.next();
    const g = w(p.anchor || p.el), m = g && g[Cc];
    return m ? w(m) : g;
  };
  let wt = !1;
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
    ), g._vnode = p, wt || (wt = !0, xs(R), Ni(), wt = !1);
  }, Ye = {
    p: C,
    um: Le,
    m: Ne,
    r: mt,
    mt: Te,
    mc: k,
    pc: ne,
    pbc: G,
    n: zt,
    o: e
  };
  return {
    render: Fe,
    hydrate: void 0,
    createApp: Uc(Fe)
  };
}
function lo({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Ot({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function lu(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function dl(e, t, n = !1) {
  const r = e.children, o = t.children;
  if (N(r) && N(o))
    for (let s = 0; s < r.length; s++) {
      const i = r[s];
      let l = o[s];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = o[s] = at(o[s]), l.el = i.el), !n && l.patchFlag !== -2 && dl(i, l)), l.type === Tr && (l.patchFlag === -1 && (l = o[s] = at(l)), l.el = i.el), l.type === gt && !l.el && (l.el = i.el);
    }
}
function au(e) {
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
function cu(e, t) {
  t && t.pendingBranch ? N(e) ? t.effects.push(...e) : t.effects.push(e) : wc(e);
}
const Oe = /* @__PURE__ */ Symbol.for("v-fgt"), Tr = /* @__PURE__ */ Symbol.for("v-txt"), gt = /* @__PURE__ */ Symbol.for("v-cmt"), ao = /* @__PURE__ */ Symbol.for("v-stc"), jt = [];
let je = null;
function ie(e = !1) {
  jt.push(je = e ? null : []);
}
function vl() {
  jt.pop(), je = jt[jt.length - 1] || null;
}
let On = 1;
function Ds(e, t = !1) {
  On += e, e < 0 && je && t && (je.hasOnce = !0);
}
function ml(e) {
  return e.dynamicChildren = On > 0 ? je || Qt : null, vl(), On > 0 && je && je.push(e), e;
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
function uu(e, t, n, r, o) {
  return ml(
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
  return l ? (vr(a, n), s & 128 && e.normalize(a)) : n && (a.shapeFlag |= ge(n) ? 8 : 16), On > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  je && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && je.push(a), a;
}
const ut = fu;
function fu(e, t = null, n = null, r = 0, o = null, s = !1) {
  if ((!e || e === jc) && (e = gt), yl(e)) {
    const l = on(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && vr(l, n), On > 0 && !s && je && (l.shapeFlag & 6 ? je[je.indexOf(e)] = l : je.push(l)), l.patchFlag = -2, l;
  }
  if (xu(e) && (e = e.__vccOpts), t) {
    t = du(t);
    let { class: l, style: a } = t;
    l && !ge(l) && (t.class = Dt(l)), re(a) && (/* @__PURE__ */ zo(a) && !N(a) && (a = Ie({}, a)), t.style = en(a));
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
function du(e) {
  return e ? /* @__PURE__ */ zo(e) || il(e) ? Ie({}, e) : e : null;
}
function on(e, t, n = !1, r = !1) {
  const { props: o, ref: s, patchFlag: i, children: l, transition: a } = e, u = t ? pu(o || {}, t) : o, d = {
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
  return ut(Tr, null, e, t);
}
function Pt(e = "", t = !1) {
  return t ? (ie(), uu(gt, null, e)) : ut(gt, null, e);
}
function Qe(e) {
  return e == null || typeof e == "boolean" ? ut(gt) : N(e) ? ut(
    Oe,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : yl(e) ? at(e) : ut(Tr, null, String(e));
}
function at(e) {
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
function pu(...e) {
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
  qe(e, t, 7, [
    n,
    r
  ]);
}
const gu = tl();
let hu = 0;
function vu(e, t, n) {
  const r = e.type, o = (t ? t.appContext : e.appContext) || gu, s = {
    uid: hu++,
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
    scope: new Na(
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
const mu = () => Pe || tt;
let mr, Pn;
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
  ), Pn = t(
    "__VUE_SSR_SETTERS__",
    (n) => Tn = n
  );
}
const jn = (e) => {
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
let Tn = !1;
function yu(e, t = !1, n = !1) {
  t && Pn(t);
  const { props: r, children: o } = e.vnode, s = bl(e);
  Qc(e, r, s, t), ru(e, o, n || t);
  const i = s ? wu(e, t) : void 0;
  return t && Pn(!1), i;
}
function wu(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Lc);
  const { setup: r } = n;
  if (r) {
    ft();
    const o = e.setupContext = r.length > 1 ? _u(e) : null, s = jn(e), i = Hn(
      r,
      e,
      0,
      [
        e.props,
        o
      ]
    ), l = vi(i);
    if (dt(), s(), (l || e.sp) && !Rn(e) && Yi(e), l) {
      if (i.then(ks, ks), t)
        return i.then((a) => {
          Pn(!0);
          try {
            Fs(e, a, t);
          } finally {
            Pn(!1);
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
    const o = jn(e);
    ft();
    try {
      Kc(e);
    } finally {
      dt(), o();
    }
  }
}
const bu = {
  get(e, t) {
    return Re(e, "get", ""), e[t];
  }
};
function _u(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, bu),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Zo(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Vi(cc(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in Cn)
        return Cn[n](e);
    },
    has(t, n) {
      return n in t || n in Cn;
    }
  })) : e.proxy;
}
function xu(e) {
  return U(e) && "__vccOpts" in e;
}
const Y = (e, t) => /* @__PURE__ */ gc(e, t, Tn), Su = "3.5.42";
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
const xl = Ao ? (e) => Ao.createHTML(e) : (e) => e, Ru = "http://www.w3.org/2000/svg", Cu = "http://www.w3.org/1998/Math/MathML", lt = typeof document < "u" ? document : null, js = lt && /* @__PURE__ */ lt.createElement("template"), Iu = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const o = t === "svg" ? lt.createElementNS(Ru, e) : t === "mathml" ? lt.createElementNS(Cu, e) : n ? lt.createElement(e, { is: n }) : lt.createElement(e);
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
function Eu(e, t, n) {
  const r = e[Mu];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Ls = /* @__PURE__ */ Symbol("_vod"), Au = /* @__PURE__ */ Symbol("_vsh"), Ou = /* @__PURE__ */ Symbol(""), Pu = /(?:^|;)\s*display\s*:/;
function Tu(e, t, n) {
  const r = e.style, o = ge(n);
  let s = !1;
  if (n && !o) {
    if (t)
      if (ge(t))
        for (const i of t.split(";")) {
          const l = i.slice(0, i.indexOf(":")).trim();
          n[l] == null && wn(r, l, "");
        }
      else
        for (const i in t)
          n[i] == null && wn(r, i, "");
    for (const i in n) {
      i === "display" && (s = !0);
      const l = n[i];
      l != null ? ku(
        e,
        i,
        !ge(t) && t ? t[i] : void 0,
        l
      ) || wn(r, i, l) : wn(r, i, "");
    }
  } else if (o) {
    if (t !== n) {
      const i = r[Ou];
      i && (n += ";" + i), r.cssText = n, s = Pu.test(n);
    }
  } else t && e.removeAttribute("style");
  Ls in e && (e[Ls] = s ? r.display : "", e[Au] && (r.display = "none"));
}
const tr = /\s*!important$/;
function wn(e, t, n) {
  if (N(n))
    n.forEach((r) => wn(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--"))
    tr.test(n) ? e.setProperty(t, n.replace(tr, ""), "important") : e.setProperty(t, n);
  else {
    const r = Du(e, t);
    tr.test(n) ? e.setProperty(
      $t(r),
      n.replace(tr, ""),
      "important"
    ) : e[r] = n;
  }
}
const Ks = ["Webkit", "Moz", "ms"], co = {};
function Du(e, t) {
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
function ku(e, t, n, r) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && ge(r) && n === r;
}
const Vs = "http://www.w3.org/1999/xlink";
function Bs(e, t, n, r, o, s = Ba(t)) {
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
function Fu(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function Hu(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const Ns = /* @__PURE__ */ Symbol("_vei");
function ju(e, t, n, r, o = null) {
  const s = e[Ns] || (e[Ns] = {}), i = s[t];
  if (r && i)
    i.value = r;
  else {
    const [l, a] = Vu(t);
    if (r) {
      const u = s[t] = Nu(
        r,
        o
      );
      Fu(e, l, u, a);
    } else i && (Hu(e, l, i, a), s[t] = void 0);
  }
}
const Lu = /(Once|Passive|Capture)$/, Ku = /^on:?(?:Once|Passive|Capture)$/;
function Vu(e) {
  let t, n;
  for (; (n = e.match(Lu)) && !Ku.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : $t(e.slice(2)), t];
}
let uo = 0;
const Bu = /* @__PURE__ */ Promise.resolve(), $u = () => uo || (Bu.then(() => uo = 0), uo = Date.now());
function Nu(e, t) {
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
        u && qe(
          u,
          t,
          5,
          l
        );
      }
    } else
      qe(
        o,
        t,
        5,
        [r]
      );
  };
  return n.value = e, n.attached = $u(), n;
}
const Ws = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Wu = (e, t, n, r, o, s) => {
  const i = o === "svg";
  t === "class" ? Eu(e, r, i) : t === "style" ? Tu(e, n, r) : _r(t) ? xr(t) || ju(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Uu(e, t, r, i)) ? ($s(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Bs(e, t, r, i, s, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (zu(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !ge(r))) ? $s(e, We(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), Bs(e, t, r, i));
};
function Uu(e, t, n, r) {
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
function zu(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const r = We(t);
  return Array.isArray(n) ? n.some((o) => We(o) === r) : Object.keys(n).some((o) => We(o) === r);
}
const qu = ["ctrl", "shift", "alt", "meta"], Gu = {
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
}, nr = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), r = t.join(".");
  return n[r] || (n[r] = (o, ...s) => {
    for (let i = 0; i < t.length; i++) {
      const l = Gu[t[i]];
      if (l && l(o, t)) return;
    }
    return e(o, ...s);
  });
}, Yu = /* @__PURE__ */ Ie({ patchProp: Wu }, Iu);
let Us;
function Xu() {
  return Us || (Us = su(Yu));
}
const Ju = (...e) => {
  const t = Xu().createApp(...e), { mount: n } = t;
  return t.mount = (r) => {
    const o = Qu(r);
    if (!o) return;
    const s = t._component;
    !U(s) && !s.render && !s.template && (s.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const i = n(o, !1, Zu(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), i;
  }, t;
};
function Zu(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Qu(e) {
  return ge(e) ? document.querySelector(e) : e;
}
function rr() {
  return !0;
}
const ef = Symbol("merge-proxy"), ar = Symbol("merge-proxy-sources"), tf = {
  get(e, t, n) {
    return t === ef ? n : t === ar ? e.sources : e.get(t);
  },
  has(e, t) {
    return e.has(t);
  },
  set: rr,
  deleteProperty: rr,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: rr,
      deleteProperty: rr
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
  }, tf);
}
function zs(...e) {
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
function nf(e) {
  return Object.assign(e, {
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: _e(e, Sl(t), { flush: "sync" }) })
  });
}
function rf(e) {
  return Object.assign(e, {
    set: (t) => {
      e.value = typeof t == "function" ? t(e.value) : t;
    },
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: _e(e, Sl(t), { flush: "sync" }) })
  });
}
function of() {
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
    createReadonlyAtom: (t, n) => nf(Y(() => t())),
    createWritableAtom: (t, n) => rf(/* @__PURE__ */ uc(t)),
    untrack: (t) => t(),
    batch: (t) => t()
  };
}
function Dr(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Mt(e) {
  if (Array.isArray(e)) return e.map(Mt);
  if (e && typeof e == "object") {
    const t = Object.getPrototypeOf(e);
    if (t !== Object.prototype && t !== null) return e;
    const n = t === null ? oe() : {}, r = Object.keys(e);
    for (let o = 0; o < r.length; o++) {
      const s = r[o];
      Object.defineProperty(n, s, {
        configurable: !0,
        enumerable: !0,
        value: Mt(e[s]),
        writable: !0
      });
    }
    return n;
  }
  return e;
}
function sf(e, t) {
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
function qs(e) {
  if (typeof e != "object" || e === null) return !1;
  if (Array.isArray(e)) return !0;
  const t = Object.getPrototypeOf(e);
  return t === Object.prototype || t === null;
}
function Gs(e) {
  return Reflect.ownKeys(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
const lf = 3;
function af(e, t) {
  return Cl(e, t, lf);
}
function Cl(e, t, n) {
  if (Object.is(e, t)) return !0;
  if (n <= 0 || !qs(e) || !qs(t) || (Array.isArray(e) || Array.isArray(t)) && (!Array.isArray(e) || !Array.isArray(t) || e.length !== t.length))
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
function kr(e, t, n, r = af) {
  const o = `on${t.charAt(0).toUpperCase()}${t.slice(1)}Change`, s = e.options[o];
  s && s((i) => {
    const l = Dr(n, i);
    return r(i, l) ? i : l;
  });
}
function cf(e, t) {
  const n = [], r = (o) => {
    o.forEach((s) => {
      n.push(s);
      const i = t(s);
      i.length && r(i);
    });
  };
  return r(e), n;
}
const uf = ({ fn: e, memoDeps: t, onAfterCompare: n, onAfterUpdate: r, onBeforeCompare: o, onBeforeUpdate: s }) => {
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
function ff(e) {
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
  return uf({
    ...s,
    ...{ onAfterUpdate: () => {
      i();
    } }
  });
}
function Il(e, t = "_") {
  const [n, r] = e.split(t);
  return {
    fnKey: r,
    fnName: `${n}.${r}`,
    parentName: n
  };
}
function Nt(e, t, n) {
  for (const [r, { fn: o, memoDeps: s }] of Object.entries(n)) {
    const { fnKey: i, fnName: l } = Il(r);
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
    const { fnKey: l, fnName: a } = Il(o);
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
function df(e) {
  return e.row.getValue(e.column.id);
}
function pf(e) {
  return e.getValue() ?? e.table.options.renderFallbackValue;
}
function gf(e) {
  return {
    table: e.table,
    column: e.column,
    row: e.row,
    cell: e,
    getValue: () => e.getValue(),
    renderValue: () => e.renderValue()
  };
}
const hf = { assignCellPrototype: (e, t) => {
  ln("coreCellsFeature", e, t, {
    cell_getValue: { fn: (n) => df(n) },
    cell_renderValue: { fn: (n) => pf(n) },
    cell_getContext: {
      fn: (n) => gf(n),
      memoDeps: (n) => [n]
    }
  });
} };
function vf(e) {
  var t, n;
  if (!e._headerPrototype) {
    e._headerPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignHeaderPrototype) == null || n.call(t, e._headerPrototype, e);
  }
  return e._headerPrototype;
}
function Ml(e, t, n) {
  const r = vf(e), o = Object.create(r);
  o.colSpan = 0, o.column = t, o.depth = n.depth, o.headerGroup = null, o.id = n.id ?? t.id, o.index = n.index, o.isPlaceholder = !!n.isPlaceholder, o.placeholderId = n.placeholderId, o.rowSpan = 0, o.subHeaders = [];
  const s = e._headerInstanceInitFns;
  for (let i = 0; i < s.length; i++) s[i](o);
  return o;
}
function mf() {
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
function yf(e) {
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
function wf(e, t) {
  return String(t);
}
function bf(e, t, n, r) {
  let o = e ?? "";
  return t && (o = o ? `${o}_${t}` : String(t)), n && (o = o ? `${o}_${n}` : n), r && (o = o ? `${o}_${r}` : r), o;
}
function _f(e, t) {
  let n = 0;
  for (let r = 0; r < e.length; r++) e[r].column === t && n++;
  return n;
}
function Al(e, t, n, r, o, s) {
  const i = {
    depth: t,
    id: wf(r, t),
    headers: []
  }, l = [];
  for (let a = 0; a < e.length; a++) {
    if (!(a in e)) continue;
    const u = e[a], d = l[l.length - 1], h = u.column.depth === i.depth;
    let w, y = !1;
    if (h && u.column.parent ? w = u.column.parent : (w = u.column, y = !0), d && d.column === w) d.subHeaders.push(u);
    else {
      const M = Ml(n, w, {
        id: bf(r, t, w.id, u.id),
        isPlaceholder: y,
        placeholderId: y ? String(_f(l, w)) : void 0,
        depth: t,
        index: l.length
      });
      M.subHeaders.push(u), l.push(M);
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
    u in t && (l[u] = Ml(n, t[u], {
      depth: o,
      index: u
    }));
  return Al(l, o - 1, n, r, s, i), s.reverse(), Ol(((a = s[0]) == null ? void 0 : a.headers) ?? []), s;
}
function xf(e) {
  var t, n;
  if (!e._columnPrototype) {
    e._columnPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignColumnPrototype) == null || n.call(t, e._columnPrototype, e);
  }
  return e._columnPrototype;
}
function Sf(e, t, n, r) {
  const o = {
    ...e.getDefaultColumnDef(),
    ...t
  }, s = o.accessorKey, i = s === void 0 ? void 0 : String(s), l = o.id ?? (i == null ? void 0 : i.replaceAll(".", "_")) ?? (typeof o.header == "string" ? o.header : void 0);
  let a;
  if (o.accessorFn) a = o.accessorFn;
  else if (s !== void 0) if (typeof s == "string" && s.includes(".")) {
    const w = s.split(".");
    a = (y) => {
      let M = y;
      for (let C = 0; C < w.length; C++) {
        const T = w[C];
        M = M == null ? void 0 : M[T];
      }
      return M;
    };
  } else a = (w) => w[o.accessorKey];
  if (!l)
    throw new Error();
  const u = xf(e), d = Object.create(u);
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
    return Rf(e, o);
  };
}
function Rf(e, t) {
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
function Cf(e) {
  return [e, ...e.columns.flatMap((t) => t.getFlatColumns())];
}
function If(e) {
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
    const i = t[s], l = Sf(e, i, r, n), a = i;
    l.columns = a.columns ? Tl(e, a.columns, l, r + 1) : [], o[s] = l;
  }
  return o;
}
function Ef(e) {
  return Tl(e, e.options.columns);
}
function Af(e) {
  return e.getAllColumns().flatMap((t) => t.getFlatColumns());
}
function Of(e) {
  const t = oe(), n = e.getAllFlatColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function Pf(e) {
  const t = e.getAllColumns().flatMap((n) => n.getLeafColumns());
  return xe(e, "getOrderColumns", Pl)(t);
}
function Tf(e) {
  const t = oe(), n = e.getAllLeafColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function Df(e, t) {
  return e.getAllFlatColumnsById()[t];
}
const kf = {
  assignColumnPrototype: (e, t) => {
    ln("coreColumnsFeature", e, t, {
      column_getFlatColumns: {
        fn: (n) => Cf(n),
        memoDeps: (n) => [n.table.options.columns]
      },
      column_getLeafColumns: {
        fn: (n) => If(n),
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
        fn: () => Ef(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumns: {
        fn: () => Af(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumnsById: {
        fn: () => Of(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllLeafColumns: {
        fn: () => Pf(e),
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
        fn: () => Tf(e),
        memoDeps: () => [e.getAllLeafColumns()]
      },
      table_getColumn: { fn: (t) => Df(e, t) }
    });
  }
};
function Dl(e, t) {
  for (let n = 0; n < e.subHeaders.length; n++) Dl(e.subHeaders[n], t);
  t.push(e);
}
function Ff(e) {
  const t = [];
  return Dl(e, t), t;
}
function Hf(e) {
  return {
    column: e.column,
    header: e,
    table: e.column.table
  };
}
function jf(e) {
  var u;
  const { start: t, end: n } = ((u = e.atoms.columnPinning) == null ? void 0 : u.get()) ?? mf(), r = e.getAllColumns(), o = xe(e, "getVisibleLeafColumns", yf);
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
function Lf(e) {
  return [...e.getHeaderGroups()].reverse();
}
function Kf(e) {
  const t = e.getHeaderGroups(), n = [];
  for (let r = 0; r < t.length; r++) {
    const o = t[r].headers;
    for (let s = 0; s < o.length; s++) n.push(o[s]);
  }
  return n;
}
function Vf(e) {
  var r;
  const t = ((r = e.getHeaderGroups()[0]) == null ? void 0 : r.headers) ?? [], n = [];
  for (let o = 0; o < t.length; o++) {
    const s = t[o].getLeafHeaders();
    for (let i = 0; i < s.length; i++) n.push(s[i]);
  }
  return n;
}
const Bf = {
  assignHeaderPrototype: (e, t) => {
    ln("coreHeadersFeature", e, t, {
      header_getLeafHeaders: {
        fn: (n) => Ff(n),
        memoDeps: (n) => [n.column.table.options.columns]
      },
      header_getContext: {
        fn: (n) => Hf(n),
        memoDeps: (n) => [n.column.table.options.columns]
      }
    });
  },
  constructTableAPIs: (e) => {
    Nt("coreHeadersFeature", e, {
      table_getHeaderGroups: {
        fn: () => jf(e),
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
        fn: () => Lf(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getFlatHeaders: {
        fn: () => Kf(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getLeafHeaders: {
        fn: () => Vf(e),
        memoDeps: () => [e.getHeaderGroups()]
      }
    });
  }
};
function $f(e) {
  var t, n;
  if (!e._rowPrototype) {
    e._rowPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignRowPrototype) == null || n.call(t, e._rowPrototype, e);
  }
  return e._rowPrototype;
}
const Nf = (e, t, n, r, o, s, i) => {
  const l = $f(e), a = Object.create(l);
  a._displayIndexCache = -1, a._uniqueValuesCache = oe(), a._valuesCache = oe(), a.depth = o, a.id = t, a.index = r, a.original = n, a.parentId = i, a.subRows = [];
  const u = e._rowInstanceInitFns;
  for (let d = 0; d < u.length; d++) u[d](a);
  return a;
};
function Wf() {
  return [];
}
function Uf(e, t) {
  kr(e, "cellSelection", Mt(e.initialState.cellSelection) ?? Wf());
}
function zf(e) {
  e.atoms.cellSelection && (e.options.autoResetAll ?? e.options.autoResetCellSelection ?? !0) && e._reactivity.schedule(() => Uf(e));
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
  kr(e, "expanded", t ? oe() : n === !0 ? !0 : Object.assign(oe(), Mt(n ?? {})));
}
function jl(e) {
  return e.getPrePaginatedRowModel().flatRows.some((t) => Vt(t));
}
function Gf(e) {
  return (t) => {
    Fl(e);
  };
}
function Yf(e) {
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
function Xf(e) {
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
function Jf(e) {
  let t = !0, n = e;
  for (; t && n.parentId; )
    n = e.table.getRow(n.parentId, !0), t = Hr(n);
  return t;
}
function Zf(e) {
  const t = Vt(e);
  return () => {
    t && Kl(e);
  };
}
const To = 0;
function Qf(e) {
  var t, n;
  if (e.options.autoResetAll ?? e.options.autoResetPageIndex ?? !e.options.manualPagination) {
    if ((((n = (t = e.atoms.pagination) == null ? void 0 : t.get()) == null ? void 0 : n.pageIndex) ?? To) === To) return;
    nd(e);
  }
}
function ed(e, t) {
  kr(e, "pagination", t);
}
function td(e, t) {
  ed(e, (n) => {
    let r = Dr(t, n.pageIndex);
    const o = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
    return r = Math.max(0, Math.min(r, o)), {
      ...n,
      pageIndex: r
    };
  });
}
function nd(e, t) {
  td(e, To);
}
function rd(e, t) {
  kr(e, "sorting", t);
}
function od(e, t) {
  rd(e, Mt(e.initialState.sorting ?? []));
}
function sd(e) {
  e.atoms.sorting && (e.options.autoResetAll ?? e.options.autoResetSorting ?? !1) && od(e);
}
function Vl() {
  return (e) => Fr({
    feature: "coreRowModelsFeature",
    table: e,
    fnName: "table.getCoreRowModel",
    memoDeps: () => [e.options.data],
    fn: () => id(e, e.options.data),
    onAfterUpdate: ff(() => {
      kl(e), Qf(e), sd(e), zf(e);
    })
  });
}
function Bl(e, t, n, r = 0, o) {
  var i;
  const s = [];
  for (let l = 0; l < n.length; l++) {
    const a = n[l], u = Nf(e, e.getRowId(a, l, o), a, l, r, void 0, o == null ? void 0 : o.id);
    t.flatRows.push(u), t.rowsById[u.id] = u, s.push(u), e.options.getSubRows && (u.originalSubRows = e.options.getSubRows(a, l), (i = u.originalSubRows) != null && i.length && (u.subRows = Bl(e, t, u.originalSubRows, r + 1, u)));
  }
  return s;
}
function id(e, t) {
  const n = {
    rows: [],
    flatRows: [],
    rowsById: oe()
  };
  return n.rows = Bl(e, n, t), n;
}
function ld(e) {
  var t, n;
  return e._rowModels.coreRowModel || (e._rowModels.coreRowModel = ((n = (t = e.options.features).coreRowModel) == null ? void 0 : n.call(t, e)) ?? Vl()(e)), e._rowModels.coreRowModel();
}
function ad(e) {
  return e.getCoreRowModel();
}
function cd(e) {
  var t, n;
  return e._rowModels.filteredRowModel || (e._rowModels.filteredRowModel = (n = (t = e.options.features).filteredRowModel) == null ? void 0 : n.call(t, e)), e.options.manualFiltering || !e._rowModels.filteredRowModel ? e.getPreFilteredRowModel() : e._rowModels.filteredRowModel();
}
function ud(e) {
  return e.getFilteredRowModel();
}
function fd(e) {
  var t, n;
  return e._rowModels.groupedRowModel || (e._rowModels.groupedRowModel = (n = (t = e.options.features).groupedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualGrouping || !e._rowModels.groupedRowModel ? e.getPreGroupedRowModel() : e._rowModels.groupedRowModel();
}
function dd(e) {
  return e.getGroupedRowModel();
}
function pd(e) {
  var t, n;
  return e._rowModels.sortedRowModel || (e._rowModels.sortedRowModel = (n = (t = e.options.features).sortedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualSorting || !e._rowModels.sortedRowModel ? e.getPreSortedRowModel() : e._rowModels.sortedRowModel();
}
function gd(e) {
  return e.getSortedRowModel();
}
function hd(e) {
  var t, n;
  return e._rowModels.expandedRowModel || (e._rowModels.expandedRowModel = (n = (t = e.options.features).expandedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualExpanding || !e._rowModels.expandedRowModel ? e.getPreExpandedRowModel() : e._rowModels.expandedRowModel();
}
function vd(e) {
  return e.getExpandedRowModel();
}
function md(e) {
  var t, n;
  return e._rowModels.paginatedRowModel || (e._rowModels.paginatedRowModel = (n = (t = e.options.features).paginatedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualPagination || !e._rowModels.paginatedRowModel ? e.getPrePaginatedRowModel() : e._rowModels.paginatedRowModel();
}
function yd(e) {
  return e.getPaginatedRowModel();
}
const wd = { constructTableAPIs: (e) => {
  Nt("coreRowModelsFeature", e, {
    table_getCoreRowModel: { fn: () => ld(e) },
    table_getPreFilteredRowModel: { fn: () => ad(e) },
    table_getFilteredRowModel: { fn: () => cd(e) },
    table_getPreGroupedRowModel: { fn: () => ud(e) },
    table_getGroupedRowModel: { fn: () => fd(e) },
    table_getPreSortedRowModel: { fn: () => dd(e) },
    table_getSortedRowModel: { fn: () => pd(e) },
    table_getPreExpandedRowModel: { fn: () => gd(e) },
    table_getExpandedRowModel: { fn: () => hd(e) },
    table_getPrePaginatedRowModel: { fn: () => vd(e) },
    table_getPaginatedRowModel: { fn: () => md(e) },
    table_getRowModel: { fn: () => yd(e) }
  });
} };
function bd(e) {
  var t, n;
  if (!e._cellPrototype) {
    e._cellPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignCellPrototype) == null || n.call(t, e._cellPrototype, e);
  }
  return e._cellPrototype;
}
function _d(e, t, n) {
  const r = bd(n), o = Object.create(r);
  o.column = e, o.id = `${t.id}_${e.id}`, o.row = t;
  const s = n._cellInstanceInitFns;
  for (let i = 0; i < s.length; i++) s[i](o);
  return o;
}
function xd(e) {
  const t = e.table.getRowsInDisplayOrder(), n = e._displayIndexCache;
  return t[n] === e ? n : -1;
}
function Sd(e) {
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
function Rd(e, t) {
  if (sn(e._valuesCache, t)) return e._valuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return e._valuesCache[t] = n.accessorFn(e.original, e.index), e._valuesCache[t];
}
function Cd(e, t) {
  if (sn(e._uniqueValuesCache, t)) return e._uniqueValuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return n.columnDef.getUniqueValues ? (e._uniqueValuesCache[t] = n.columnDef.getUniqueValues(e.original, e.index), e._uniqueValuesCache[t]) : (e._uniqueValuesCache[t] = [e.getValue(t)], e._uniqueValuesCache[t]);
}
function Id(e, t) {
  return e.getValue(t) ?? e.table.options.renderFallbackValue;
}
function Md(e) {
  return cf(e.subRows, (t) => t.subRows);
}
function Ed(e) {
  const t = e.getCoreRowModel().flatRows;
  let n = 0;
  for (let r = 0; r < t.length; r++) n = Math.max(n, t[r].depth);
  return n;
}
function Ad(e) {
  if (e.parentId)
    return e.table.getCoreRowModel().rowsById[e.parentId] ?? e.table.getRow(e.parentId, !0);
}
function Od(e) {
  const t = [];
  let n = e;
  for (; ; ) {
    const r = n.getParentRow();
    if (!r) break;
    t.push(r), n = r;
  }
  return t.reverse();
}
function Pd(e) {
  const t = e.table.getAllLeafColumns();
  let n = e._cellsCache;
  n || (n = e._cellsCache = /* @__PURE__ */ new WeakMap());
  const r = new Array(t.length);
  for (let o = 0; o < t.length; o++) {
    const s = t[o];
    let i = n.get(s);
    i || (i = _d(s, e, e.table), n.set(s, i)), r[o] = i;
  }
  return r;
}
function Td(e) {
  const t = oe(), n = e.getAllCells();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.column.id] = o;
  }
  return t;
}
function Dd(e, t, n, r) {
  var o, s;
  return ((s = (o = t.options).getRowId) == null ? void 0 : s.call(o, e, n, r)) ?? (r ? `${r.id}.${n}` : String(n));
}
function kd(e, t, n) {
  let r = (n ? e.getPrePaginatedRowModel() : e.getRowModel()).rowsById[t];
  if (!r && (r = e.getCoreRowModel().rowsById[t], !r))
    throw new Error();
  return r;
}
const Fd = {
  assignRowPrototype: (e, t) => {
    ln("coreRowsFeature", e, t, {
      row_getDisplayIndex: { fn: (n) => xd(n) },
      row_getAllCellsByColumnId: {
        fn: (n) => Td(n),
        memoDeps: (n) => [n.getAllCells()]
      },
      row_getAllCells: {
        fn: (n) => Pd(n),
        memoDeps: (n) => [n.table.getAllLeafColumns()]
      },
      row_getLeafRows: {
        fn: (n) => Md(n),
        memoDeps: (n) => [n.subRows]
      },
      row_getParentRow: { fn: (n) => Ad(n) },
      row_getParentRows: { fn: (n) => Od(n) },
      row_getUniqueValues: { fn: (n, r) => Cd(n, r) },
      row_getValue: { fn: (n, r) => Rd(n, r) },
      row_renderValue: { fn: (n, r) => Id(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    Nt("coreRowsFeature", e, {
      table_getRowsInDisplayOrder: {
        fn: () => Sd(e),
        memoDeps: () => {
          var t;
          return [
            e.getPrePaginatedRowModel().rows,
            e.options.paginateExpandedRows,
            e.options.paginateExpandedRows === !1 ? (t = e.atoms.expanded) == null ? void 0 : t.get() : void 0
          ];
        }
      },
      table_getRowId: { fn: (t, n, r) => Dd(t, e, n, r) },
      table_getRow: { fn: (t, n) => kd(e, t, n) },
      table_getMaxSubRowDepth: {
        fn: () => Ed(e),
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
function Hd(e, t, n = (r, o) => r === o) {
  e._reactivity.batch(() => {
    var r, o;
    $l(e, t, n), (o = (r = e._reactivity).commit) == null || o.call(r);
  });
}
function jd(e) {
  var r, o;
  const t = Mt(e.initialState);
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
function Ld(e, t) {
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
function Kd(e, t, n) {
  const r = Ld(e, Dr(t, e.options));
  e.optionsStore ? e.optionsStore.set(() => r) : e.options = r, Hd(e, r.state ?? null);
}
const Vd = { constructTableAPIs: (e) => {
  Nt("coreTablesFeature", e, {
    table_reset: { fn: () => jd(e) },
    table_setOptions: { fn: (t) => Kd(e, t) }
  });
} }, Bd = {
  coreCellsFeature: hf,
  coreColumnsFeature: kf,
  coreHeadersFeature: Bf,
  coreRowModelsFeature: wd,
  coreRowsFeature: Fd,
  coreTablesFeature: Vd
};
function $d(e) {
  const t = e;
  return Object.defineProperty(e, "state", { get() {
    return e.get();
  } }), "set" in e && (t.setState = e.set.bind(e)), t;
}
function Nd(e, t) {
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
function Wd(e, t = {}) {
  return Object.values(e).forEach((n) => {
    var r;
    t = ((r = n.getInitialState) == null ? void 0 : r.call(n, t)) ?? t;
  }), Mt(t);
}
function Ud(e) {
  var W, fe;
  const t = e.features.coreReactivityFeature, { aggregationFns: n, columnMeta: r, coreRowModel: o, expandedRowModel: s, facetedMinMaxValues: i, facetedRowModel: l, facetedUniqueValues: a, filterFns: u, filterMeta: d, filteredRowModel: h, groupedRowModel: w, paginatedRowModel: y, sortFns: M, sortedRowModel: C, tableMeta: T, ...F } = e.features, I = {
    _cellInstanceInitFns: [],
    _columnInstanceInitFns: [],
    _features: {
      ...Bd,
      ...F
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
  }, L = Object.values(I._features), E = {
    ...L.reduce((k, H) => {
      var G;
      return Object.assign(k, (G = H.getDefaultTableOptions) == null ? void 0 : G.call(H, I));
    }, {}),
    ...e
  };
  if (t.wrapExternalAtoms && E.atoms) for (const [k, H] of Object.entries(E.atoms)) {
    const G = H, de = t.createWritableAtom(G.get(), { debugName: `externalAtom/${k}` });
    E.atoms[k] = de;
    let se = !1;
    const ve = G.subscribe((Me) => {
      se || de.set(Me);
    }), Te = de.subscribe((Me) => {
      se = !0, G.set(Me), se = !1;
    });
    t.addSubscription(ve), t.addSubscription(Te);
  }
  t.createOptionsStore ? (I.optionsStore = t.createWritableAtom(E, { debugName: "table/optionsStore" }), Object.defineProperty(I, "options", {
    configurable: !0,
    enumerable: !0,
    get() {
      return I.optionsStore.get();
    },
    set(k) {
      I.optionsStore.set(() => k);
    }
  })) : I.options = E, I.initialState = Wd(I._features, I.options.initialState);
  const $ = Object.keys(I.initialState);
  for (let k = 0; k < $.length; k++) {
    const H = $[k];
    I.baseAtoms[H] = t.createWritableAtom(I.initialState[H], { debugName: `table/baseAtoms/${H}` }), I.atoms[H] = t.createReadonlyAtom(() => {
      var Te;
      const G = I.options, de = (Te = G.atoms) == null ? void 0 : Te[H], se = de ? de.get() : I.baseAtoms[H].get();
      if (de) return se;
      const ve = G.state;
      if (ve && sn(ve, H)) {
        const Me = ve[H];
        return Me === void 0 ? I.initialState[H] : Me;
      }
      return se;
    }, { debugName: `table/atoms/${H}` });
  }
  $l(I), I.store = $d(t.createReadonlyAtom(() => {
    const k = {};
    for (let H = 0; H < $.length; H++) {
      const G = $[H];
      k[G] = I.atoms[G].get();
    }
    return k;
  }, {
    compare: Nd,
    debugName: "table/store"
  }));
  for (let k = 0; k < L.length; k++) {
    const H = L[k];
    (W = H.initTableInstanceData) == null || W.call(H, I), H.initCellInstanceData && I._cellInstanceInitFns.push(H.initCellInstanceData.bind(H)), H.initColumnInstanceData && I._columnInstanceInitFns.push(H.initColumnInstanceData.bind(H)), H.initHeaderGroupInstanceData && I._headerGroupInstanceInitFns.push(H.initHeaderGroupInstanceData.bind(H)), H.initHeaderInstanceData && I._headerInstanceInitFns.push(H.initHeaderInstanceData.bind(H)), H.initRowInstanceData && I._rowInstanceInitFns.push(H.initRowInstanceData.bind(H)), (fe = H.constructTableAPIs) == null || fe.call(H, I);
  }
  return I;
}
const zd = {
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
      row_getIsAllParentsExpanded: { fn: (n) => Jf(n) },
      row_getToggleExpandedHandler: { fn: (n) => Zf(n) }
    });
  },
  constructTableAPIs: (e) => {
    Nt("rowExpandingFeature", e, {
      table_autoResetExpanded: { fn: () => kl(e) },
      table_setExpanded: { fn: (t) => yr(e, t) },
      table_toggleAllRowsExpanded: { fn: (t) => Fl(e, t) },
      table_resetExpanded: { fn: (t) => Hl(e, t) },
      table_getCanSomeRowsExpand: { fn: () => jl(e) },
      table_getToggleAllRowsExpandedHandler: { fn: () => Gf(e) },
      table_getIsSomeRowsExpanded: { fn: () => Yf(e) },
      table_getIsAllRowsExpanded: { fn: () => Ll(e) },
      table_getExpandedDepth: { fn: () => Xf(e) }
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
function Gd(e, t) {
  e._lastSelectedRowId = null, an(e, t ? oe() : Object.assign(oe(), Mt(e.initialState.rowSelection ?? {})));
}
function Nl(e, t, n) {
  e._lastSelectedRowId = null, an(e, (r) => {
    if (t = typeof t < "u" ? t : !xe(e, "getIsAllRowsSelected", zl), n != null && n.deselectAll && !t) return oe();
    const o = Object.assign(oe(), r), s = e.getPreGroupedRowModel().flatRows;
    if (t) {
      const i = /* @__PURE__ */ new Map();
      s.forEach((l) => {
        wr(l, i) && (o[l.id] = !0);
      });
    } else s.forEach((i) => {
      ht(i) && delete o[i.id];
    });
    return o;
  });
}
function Wl(e, t, n) {
  e._lastSelectedRowId = null, an(e, (r) => {
    const o = typeof t < "u" ? t : !xe(e, "getIsAllPageRowsSelected", ql);
    if (n != null && n.deselectAll && !o) return oe();
    const s = Object.assign(oe(), r);
    return e.getRowModel().rows.forEach((i) => {
      Lr(s, i.id, o, !0, e, !0);
    }), s;
  });
}
function Yd(e) {
  return e.getCoreRowModel();
}
function Xd(e) {
  const t = e.getCoreRowModel();
  return xe(e, "getIsSomeRowsSelected", jr) ? ts(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: oe()
  };
}
function Jd(e) {
  const t = e.getFilteredRowModel();
  return xe(e, "getIsSomeRowsSelected", jr) ? ts(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: oe()
  };
}
function Zd(e) {
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
function zl(e) {
  var o;
  const t = e.getFilteredRowModel().flatRows, n = ((o = e.atoms.rowSelection) == null ? void 0 : o.get()) ?? {};
  let r = !!(t.length && Object.keys(n).length);
  if (r) {
    const s = /* @__PURE__ */ new Map();
    t.some((i) => !Ln(i, n) && wr(i, s)) && (r = !1);
  }
  return r;
}
function ql(e) {
  var s;
  const t = e.getPaginatedRowModel().flatRows, n = ((s = e.atoms.rowSelection) == null ? void 0 : s.get()) ?? {}, r = /* @__PURE__ */ new Map();
  let o = !1;
  for (let i = 0; i < t.length; i++) {
    const l = t[i];
    if (Ln(l, n))
      !o && wr(l, r) && (o = !0);
    else if (wr(l, r)) return !1;
  }
  return o;
}
function jr(e) {
  return xe(e, "getSelectedRowIds", Ul).length > 0;
}
function Qd(e) {
  return e.getPaginatedRowModel().flatRows.filter((t) => ht(t)).some((t) => Qo(t) || xe(t, "getIsSomeSelected", Yl));
}
function ep(e) {
  return (t) => {
    Nl(e, t.target.checked);
  };
}
function tp(e) {
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
  return Ln(e, ((t = e.table.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function Yl(e) {
  return ns(e) === "some";
}
function np(e) {
  return ns(e) === "all";
}
function ht(e) {
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
function rp(e, t) {
  const n = ht(e);
  return (r) => {
    var a, u;
    if (!n) return;
    const o = r, s = e.table, i = o.target.checked, l = s._lastSelectedRowId;
    (!(s.options.enableRowRangeSelection !== !1 && l !== null && Lt(e) && (((u = (a = s.options).isRowRangeSelectionEvent) == null ? void 0 : u.call(a, r)) ?? !1)) || !op(e, l, i, t)) && Gl(e, i, t), s._lastSelectedRowId = e.id;
  };
}
function op(e, t, n, r) {
  const o = (r == null ? void 0 : r.selectChildren) ?? !0, s = e.table, i = s.getRowsInDisplayOrder(), l = s.getPrePaginatedRowModel().rowsById[t] ?? s.getCoreRowModel().rowsById[t];
  if (!l) return !1;
  const a = l.getDisplayIndex(), u = e.getDisplayIndex(), d = i[a], h = i[u];
  if (a < 0 || u < 0 || a >= i.length || u >= i.length || (d == null ? void 0 : d.id) !== l.id || (h == null ? void 0 : h.id) !== e.id || !Lt(l) || !Lt(e)) return !1;
  const w = Math.min(a, u), y = Math.max(a, u);
  return an(s, (M) => {
    const C = Object.assign(oe(), M);
    for (let T = w; T <= y; T++) {
      const F = i[T];
      !ht(F) || !Lt(F) || (Lr(C, F.id, n, o, s), !n && (r != null && r.deselectParents) && Xl(C, F));
    }
    return C;
  }), !0;
}
function Lr(e, t, n, r, o, s) {
  const i = o.getRow(t, !0);
  n ? (Lt(i) || Object.keys(e).forEach((l) => delete e[l]), ht(i) && (e[t] = !0)) : (!s || ht(i)) && delete e[t], r && i.subRows.length && es(i) && i.subRows.forEach((l) => Lr(e, l.id, n, r, o, s));
}
function wr(e, t) {
  if (!ht(e)) return !1;
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
    const i = e[s], l = Ln(i, t);
    if (l && (n.push(i), r[i.id] = i), i.subRows.length) {
      const a = Jl(i.subRows, t, n, r);
      if (l) {
        const u = Object.create(Object.getPrototypeOf(i));
        sf(u, i), u.subRows = a, o.push(u);
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
function Ln(e, t) {
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
    if (ht(l) && (o = !0, Ln(l, t) ? n = !0 : r = !1), l.subRows.length) {
      const a = ns(l);
      a === "all" ? (n = !0, o = !0) : a === "some" ? (n = !0, r = !1, o = !0) : r = !1;
    }
  }
  return o ? r ? "all" : n ? "some" : !1 : !1;
}
const sp = {
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
        fn: (n) => np(n),
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
      row_getCanSelectSubRows: { fn: (n) => es(n) },
      row_getCanMultiSelect: { fn: (n) => Lt(n) },
      row_getToggleSelectedHandler: { fn: (n, r) => rp(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    Nt("rowSelectionFeature", e, {
      table_setRowSelection: { fn: (t) => an(e, t) },
      table_resetRowSelection: { fn: (t) => Gd(e, t) },
      table_toggleAllRowsSelected: { fn: (t, n) => Nl(e, t, n) },
      table_toggleAllPageRowsSelected: { fn: (t, n) => Wl(e, t, n) },
      table_getPreSelectedRowModel: { fn: () => Yd(e) },
      table_getSelectedRowModel: {
        fn: () => Xd(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getCoreRowModel()];
        }
      },
      table_getFilteredSelectedRowModel: {
        fn: () => Jd(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getFilteredRowModel()];
        }
      },
      table_getGroupedSelectedRowModel: {
        fn: () => Zd(e),
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
        fn: () => zl(e),
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
        fn: () => ql(e),
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
        fn: () => Qd(e),
        memoDeps: () => {
          var t;
          return [
            (t = e.atoms.rowSelection) == null ? void 0 : t.get(),
            e.getPaginatedRowModel(),
            e.options.enableRowSelection
          ];
        }
      },
      table_getToggleAllRowsSelectedHandler: { fn: () => ep(e) },
      table_getToggleAllPageRowsSelectedHandler: { fn: () => tp(e) }
    });
  }
};
function ip() {
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
      fn: () => lp(t)
    });
  };
}
function lp(e) {
  var r;
  const t = e.getPreExpandedRowModel(), n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return !t.rows.length || n !== !0 && !Object.keys(n ?? {}).length || !e.options.paginateExpandedRows && !e.options.manualPagination ? t : ap(t);
}
function ap(e) {
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
function cp(e) {
  return Object.keys(e).map((t) => Ht(e[t]));
}
function up(e) {
  const t = (l, a) => {
    l.setOptions((u) => zs(u, Js(a)));
  }, n = of(), r = Oo(e, { features: {
    coreReactivityFeature: n,
    ...Ht(e.features) ?? {}
  } }), o = Oo(Js(r), { mergeOptions: (l, a) => zs(l, a) }), s = Ud(o), i = s;
  return Ri() && Wa(() => {
    var l;
    return (l = n.unmount) == null ? void 0 : l.call(n);
  }), _e(() => cp(r), () => {
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
function fp(e) {
  if (Array.isArray(e)) return e;
}
function dp(e, t) {
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
function pp() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Ql(e, t) {
  return fp(e) || dp(e, t) || Zl(e, t) || pp();
}
var Zs = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Bt = {}, Kn = {};
Object.defineProperty(Kn, "__esModule", { value: !0 });
Kn.bind = void 0;
function gp(e, t) {
  var n = t.type, r = t.listener, o = t.options;
  return e.addEventListener(n, r, o), function() {
    e.removeEventListener(n, r, o);
  };
}
Kn.bind = gp;
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
var hp = Kn;
function Qs(e) {
  if (!(typeof e > "u"))
    return typeof e == "boolean" ? {
      capture: e
    } : e;
}
function vp(e, t) {
  if (t == null)
    return e;
  var n = Zt(Zt({}, e), { options: Zt(Zt({}, Qs(t)), Qs(e.options)) });
  return n;
}
function mp(e, t, n) {
  var r = t.map(function(o) {
    var s = vp(o, n);
    return (0, hp.bind)(e, s);
  });
  return function() {
    r.forEach(function(s) {
      return s();
    });
  };
}
Vr.bindAll = mp;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.bindAll = e.bind = void 0;
  var t = Kn;
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
function Dn(e) {
  "@babel/helpers - typeof";
  return Dn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Dn(e);
}
function yp(e, t) {
  if (Dn(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Dn(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function wp(e) {
  var t = yp(e, "string");
  return Dn(t) == "symbol" ? t : t + "";
}
function Vn(e, t, n) {
  return (t = wp(t)) in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var bp = 2147483647, _p = {
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
      Vn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ei(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
var kn = 2, ni = kn / 2;
function xp(e) {
  return {
    x: Math.floor(e.x),
    y: Math.floor(e.y)
  };
}
function Sp(e) {
  return {
    x: e.x - ni,
    y: e.y - ni
  };
}
function Rp(e) {
  return {
    x: Math.max(e.x, 0),
    y: Math.max(e.y, 0)
  };
}
function Cp(e) {
  return {
    x: Math.min(e.x, window.innerWidth - kn),
    y: Math.min(e.y, window.innerHeight - kn)
  };
}
function ri(e) {
  var t = e.client, n = Cp(Rp(Sp(xp(t))));
  return DOMRect.fromRect({
    x: n.x,
    y: n.y,
    width: kn,
    height: kn
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
function Ip(e) {
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
    _p
  ) : {
    // Fallback: using maximum possible z-index so that this element
    // will always be on top of other positioned content.
    zIndex: bp
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
    if (o(), Ip({
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
function Ep() {
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
function Ap(e) {
  if (Array.isArray(e)) return Do(e);
}
function Op(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function Pp() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ra(e) {
  return Ap(e) || Op(e) || Zl(e) || Pp();
}
var Tp = Wt(function() {
  return navigator.userAgent.includes("Firefox");
}), rs = Wt(function() {
  var t = navigator, n = t.userAgent;
  return n.includes("AppleWebKit") && !n.includes("Chrome");
});
function Dp(e) {
  return "nodeName" in e;
}
function kp(e) {
  return Dp(e) && e.ownerDocument !== document;
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
function Fp(e) {
  var t = e.dragLeave;
  return rs() ? t.hasOwnProperty(ko.isLeavingWindow) : !1;
}
function Hp(e) {
  var t = e.dragLeave, n = t.type, r = t.relatedTarget;
  return n !== "dragleave" ? !1 : rs() ? Fp({
    dragLeave: t
  }) : r == null ? !0 : Tp() ? kp(r) : r instanceof HTMLIFrameElement;
}
function jp(e) {
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
function In(e) {
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
var Lp = function(t) {
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
}, po = Lp(function(e) {
  return e();
}), or = /* @__PURE__ */ function() {
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
function Kp(e) {
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
      }), or.schedule(function() {
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
      or.flush(), po.cancel(), s({
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
        or.flush();
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
      or.flush(), po.cancel(), s({
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
function Vp(e) {
  return e.dataTransfer ? e.dataTransfer.setDragImage.bind(e.dataTransfer) : null;
}
function Bp(e) {
  var t = e.current, n = e.next;
  if (t.length !== n.length)
    return !0;
  for (var r = 0; r < t.length; r++)
    if (t[r].element !== n[r].element)
      return !0;
  return !1;
}
function $p(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = e.dispatchEvent;
  if (!oa())
    return;
  var s = Np({
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
  var l = Kp({
    source: n.payload,
    dispatchEvent: o,
    initial: s
  });
  function a(y) {
    var M = Bp({
      current: i.current.dropTargets,
      next: y.dropTargets
    });
    i.current = y, M && l.dragUpdate({
      current: i.current
    });
  }
  function u(y) {
    var M = In(y), C = ta(y.target) ? na({
      x: M.clientX,
      y: M.clientY
    }) : y.target, T = r({
      target: C,
      input: M,
      source: n.payload,
      current: i.current.dropTargets
    });
    T.length && (y.preventDefault(), go({
      event: y,
      current: T
    })), a({
      dropTargets: T,
      input: M
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
        Hp({
          dragLeave: M
        }) && (a({
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
          input: In(M)
        }, !i.current.dropTargets.length) {
          d();
          return;
        }
        M.preventDefault(), go({
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
          input: In(M)
        }, d();
      }
    }].concat(ra(jp({
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
    nativeSetDragImage: Vp(t)
  });
}
function go(e) {
  var t, n = e.event, r = e.current, o = (t = r[0]) === null || t === void 0 ? void 0 : t.dropEffect;
  o != null && n.dataTransfer && (n.dataTransfer.dropEffect = o);
}
function Np(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = In(t);
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
  start: $p
}, Ho = /* @__PURE__ */ new Map();
function Wp(e) {
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
function Up(e) {
  var t = Wp(e);
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
      Vn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ii(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function ho(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = zp(e)) || t) {
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
function zp(e, t) {
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
    var M = Kr(sa(y.element, {
      attribute: o,
      value: "true"
    }), i(y));
    return Wt(M);
  }
  function a(y) {
    var M, C, T, F, I = y.source, L = y.target, E = y.input, $ = y.result, W = $ === void 0 ? [] : $;
    if (L == null)
      return W;
    if (!(L instanceof Element))
      return L instanceof Node ? a({
        source: I,
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
      source: I,
      element: k.element
    };
    if (k.canDrop && !k.canDrop(H))
      return a({
        source: I,
        target: k.element.parentElement,
        input: E,
        result: W
      });
    var G = (M = (C = k.getData) === null || C === void 0 ? void 0 : C.call(k, H)) !== null && M !== void 0 ? M : {}, de = (T = (F = k.getDropEffect) === null || F === void 0 ? void 0 : F.call(k, H)) !== null && T !== void 0 ? T : n, se = {
      data: G,
      element: k.element,
      dropEffect: de,
      // we are collecting _actual_ drop targets, so these are
      // being applied _not_ due to stickiness
      isActiveDueToStickiness: !1
    };
    return a({
      source: I,
      target: k.element.parentElement,
      input: E,
      // Using bubble ordering. Same ordering as `event.getPath()`
      result: [].concat(ra(W), [se])
    });
  }
  function u(y) {
    var M = y.eventName, C = y.payload, T = ho(C.location.current.dropTargets), F;
    try {
      for (T.s(); !(F = T.n()).done; ) {
        var I, L = F.value, E = r.get(L.element), $ = xt(xt({}, C), {}, {
          self: L
        });
        E == null || (I = E[M]) === null || I === void 0 || I.call(
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
    onDropTargetChange: function(M) {
      var C = M.payload, T = new Set(C.location.current.dropTargets.map(function(X) {
        return X.element;
      })), F = /* @__PURE__ */ new Set(), I = ho(C.location.previous.dropTargets), L;
      try {
        for (I.s(); !(L = I.n()).done; ) {
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
        I.e(X);
      } finally {
        I.f();
      }
      var G = ho(C.location.current.dropTargets), de;
      try {
        for (G.s(); !(de = G.n()).done; ) {
          var se, ve, Te = de.value;
          if (!F.has(Te.element)) {
            var Me = xt(xt({}, C), {}, {
              self: Te
            }), te = r.get(Te.element);
            te == null || (se = te.onDropTargetChange) === null || se === void 0 || se.call(te, Me), te == null || (ve = te.onDragEnter) === null || ve === void 0 || ve.call(te, Me);
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
    var M = y.source, C = y.target, T = y.input, F = y.current, I = a({
      source: M,
      target: C,
      input: T
    });
    if (I.length >= F.length)
      return I;
    for (var L = vo(F), E = vo(I), $ = [], W = 0; W < L.length; W++) {
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
        source: M,
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
function Gp(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = Yp(e)) || t) {
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
function Yp(e, t) {
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
function Xp(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ci(Object(n), !0).forEach(function(r) {
      Vn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ci(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Jp() {
  var e = /* @__PURE__ */ new Set(), t = null;
  function n(s) {
    t && (!s.canMonitor || s.canMonitor(t.canMonitorArgs)) && t.active.add(s);
  }
  function r(s) {
    var i = Xp({}, s);
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
      var a = Gp(e), u;
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
        var M = y[w];
        if (t.active.has(M)) {
          var C;
          (C = M[i]) === null || C === void 0 || C.call(M, l);
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
function Zp(e) {
  var t = e.typeKey, n = e.mount, r = e.dispatchEventToSource, o = e.onPostDispatch, s = e.defaultDropEffect, i = Jp(), l = qp({
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
    return Up({
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
var Qp = Wt(function() {
  return navigator.userAgent.toLocaleLowerCase().includes("android");
}), eg = "pdnd:android-fallback", ui = "text/plain", tg = "text/uri-list", ng = "application/vnd.pdnd", br = /* @__PURE__ */ new WeakMap();
function rg(e) {
  return br.set(e.element, e), function() {
    br.delete(e.element);
  };
}
var fi = Ep(), ia = Zp({
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
              var w = In(r), y = {
                element: h.element,
                dragHandle: (o = h.dragHandle) !== null && o !== void 0 ? o : null,
                input: w
              };
              if (h.canDrag && !h.canDrag(y)) {
                r.preventDefault();
                return;
              }
              if (h.dragHandle) {
                var M = na({
                  x: w.clientX,
                  y: w.clientY
                });
                if (!h.dragHandle.contains(M)) {
                  r.preventDefault();
                  return;
                }
              }
              var C = (s = (i = h.getInitialDataForExternal) === null || i === void 0 ? void 0 : i.call(h, y)) !== null && s !== void 0 ? s : null;
              if (C)
                for (var T = 0, F = Object.entries(C); T < F.length; T++) {
                  var I = Ql(F[T], 2), L = I[0], E = I[1];
                  r.dataTransfer.setData(L, E ?? "");
                }
              Qp() && !r.dataTransfer.types.includes(ui) && !r.dataTransfer.types.includes(tg) && r.dataTransfer.setData(ui, eg), r.dataTransfer.setData(ng, "");
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
}), og = ia.dropTarget;
function sg(e) {
  var t = Kr(
    // making the draggable register the adapter rather than drop targets
    // this is because you *must* have a draggable element to start a drag
    // but you _might_ not have any drop targets immediately
    // (You might create drop targets async)
    ia.registerUsage(),
    rg(e),
    sa(e.element, {
      attribute: "draggable",
      value: "true"
    })
  );
  return Wt(t);
}
function ig(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
    if (t.indexOf(r) !== -1) continue;
    n[r] = e[r];
  }
  return n;
}
function lg(e, t) {
  if (e == null) return {};
  var n, r, o = ig(e, t);
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
function ag() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : la, t = null;
  return function(n) {
    return t && e(t.value, n) || (t = {
      value: n
    }), t.value;
  };
}
var cg = ["block"];
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
      Vn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : di(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function ug(e) {
  return {
    x: (e.right + e.left) / 2,
    y: (e.bottom + e.top) / 2
  };
}
function mo(e) {
  var t = e.client, n = e.borderBox, r = n.height / 4;
  return t.y <= n.top + r ? "reorder-above" : t.y >= n.bottom - r ? "reorder-below" : "make-child";
}
function fg(e) {
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
  var u = ug(l);
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
var dg = ag(aa);
function pg(e) {
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
function gg(e, t) {
  var n = t.block, r = lg(t, cg), o = fg(r), s = pg({
    desired: o,
    block: n
  }), i = dg(s);
  return pi(pi({}, e), {}, Vn({}, ca, i));
}
function gi(e) {
  var t;
  return (t = e[ca]) !== null && t !== void 0 ? t : null;
}
var ca = Symbol("tree-item-instruction");
const hg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ef5350" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m6 10h-4v8a4 4 0 1 1-4-4 3.96 3.96 0 0 1 2 .555V8h6Z"/></svg>', vg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#ff7043" d="M2 2a1 1 0 0 0-1 1v10c0 .554.446 1 1 1h12c.554 0 1-.446 1-1V3a1 1 0 0 0-1-1zm0 3h12v8H2zm1 2 2 2-2 2 1 1 3-3-3-3zm5 3.5V12h5v-1.5z"/></svg>', mg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#7e57c2" d="M20 18h-2v-2h-2v2c0 .193 0 .703 1.254 1.033A3.345 3.345 0 0 1 20 22h2v2h2v-2c0-.388-.562-.851-1.254-1.034C20.356 20.34 20 18.84 20 18m-3.254 2.966C14.356 20.34 14 18.84 14 18h-2v-2h-2v8h2v-2h4v2h2v-2c0-.388-.562-.851-1.254-1.034"/><path fill="#7e57c2" d="M24 4H4v20a4 4 0 0 0 4 4h16.16A3.84 3.84 0 0 0 28 24.16V8a4 4 0 0 0-4-4m2 14h-2v-2h-2v2c0 .193 0 .703 1.254 1.033A3.345 3.345 0 0 1 26 22v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1 2-2h2a2 2 0 0 1 2 2Z"/></svg>', yg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ffca28" d="M16 24c-5.525 0-10-.9-10-2v4c0 1.1 4.475 2 10 2s10-.9 10-2v-4c0 1.1-4.475 2-10 2m0-8c-5.525 0-10-.9-10-2v4c0 1.1 4.475 2 10 2s10-.9 10-2v-4c0 1.1-4.475 2-10 2m0-12C10.477 4 6 4.895 6 6v4c0 1.1 4.475 2 10 2s10-.9 10-2V6c0-1.105-4.477-2-10-2"/></svg>', wg = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/><path fill="#42a5f5" d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5z"/></svg>', bg = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m8.668 6h3.6641l-3.6641-3.668v3.668m-4.668-4.668h5.332l4 4v8c0 0.73828-0.59375 1.3359-1.332 1.3359h-8c-0.73828 0-1.332-0.59766-1.332-1.3359v-10.664c0-0.74219 0.59375-1.3359 1.332-1.3359m3.332 1.3359h-3.332v10.664h8v-6h-4.668z" fill="#90a4ae" /></svg>', _g = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m6.922 3.768-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232" fill="#90a4ae" /></svg>', xg = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.483 6H4.721a1 1 0 0 0-.949.684L2 12V5h12a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232l-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h11l2.403-5.606A1 1 0 0 0 14.483 6" fill="#90a4ae" /></svg>', Sg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#e65100" d="m4 4 2 22 10 2 10-2 2-22Zm19.72 7H11.28l.29 3h11.86l-.802 9.335L15.99 25l-6.635-1.646L8.93 19h3.02l.19 2 3.86.77 3.84-.77.29-4H8.84L8 8h16Z"/></svg>', Rg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#26a69a" d="M8.5 6h4l-4-4zM3.875 1H9.5l4 4v8.6c0 .773-.616 1.4-1.375 1.4h-8.25c-.76 0-1.375-.627-1.375-1.4V2.4c0-.777.612-1.4 1.375-1.4M4 13.6h8V8l-2.625 2.8L8 9.4zm1.25-7.7c-.76 0-1.375.627-1.375 1.4s.616 1.4 1.375 1.4c.76 0 1.375-.627 1.375-1.4S6.009 5.9 5.25 5.9"/></svg>', Cg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#ffca28" d="M2 2v12h12V2zm6 6h1v4a1.003 1.003 0 0 1-1 1H7a1.003 1.003 0 0 1-1-1v-1h1v1h1zm3 0h2v1h-2v1h1a1.003 1.003 0 0 1 1 1v1a1.003 1.003 0 0 1-1 1h-2v-1h2v-1h-1a1.003 1.003 0 0 1-1-1V9a1.003 1.003 0 0 1 1-1"/></svg>', Ig = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path fill="#f9a825" d="M560-160v-80h120q17 0 28.5-11.5T720-280v-80q0-38 22-69t58-44v-14q-36-13-58-44t-22-69v-80q0-17-11.5-28.5T680-720H560v-80h120q50 0 85 35t35 85v80q0 17 11.5 28.5T840-560h40v160h-40q-17 0-28.5 11.5T800-360v80q0 50-35 85t-85 35zm-280 0q-50 0-85-35t-35-85v-80q0-17-11.5-28.5T120-400H80v-160h40q17 0 28.5-11.5T160-600v-80q0-50 35-85t85-35h120v80H280q-17 0-28.5 11.5T240-680v80q0 38-22 69t-58 44v14q36 13 58 44t22 69v80q0 17 11.5 28.5T280-240h120v80z"/></svg>', Mg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#42a5f5" d="m14 10-4 3.5L6 10H4v12h4v-6l2 2 2-2v6h4V10zm12 6v-6h-4v6h-4l6 8 6-8z"/></svg>', Eg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ef5350" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m4.93 10.44c.41.9.93 1.64 1.53 2.15l.41.32c-.87.16-2.07.44-3.34.93l-.11.04.5-1.04c.45-.87.78-1.66 1.01-2.4m6.48 3.81c.18-.18.27-.41.28-.66.03-.2-.02-.39-.12-.55-.29-.47-1.04-.69-2.28-.69l-1.29.07-.87-.58c-.63-.52-1.2-1.43-1.6-2.56l.04-.14c.33-1.33.64-2.94-.02-3.6a.85.85 0 0 0-.61-.24h-.24c-.37 0-.7.39-.79.77-.37 1.33-.15 2.06.22 3.27v.01c-.25.88-.57 1.9-1.08 2.93l-.96 1.8-.89.49c-1.2.75-1.77 1.59-1.88 2.12-.04.19-.02.36.05.54l.03.05.48.31.44.11c.81 0 1.73-.95 2.97-3.07l.18-.07c1.03-.33 2.31-.56 4.03-.75 1.03.51 2.24.74 3 .74.44 0 .74-.11.91-.3m-.41-.71.09.11c-.01.1-.04.11-.09.13h-.04l-.19.02c-.46 0-1.17-.19-1.9-.51.09-.1.13-.1.23-.1 1.4 0 1.8.25 1.9.35M7.83 17c-.65 1.19-1.24 1.85-1.69 2 .05-.38.5-1.04 1.21-1.69zm3.02-6.91c-.23-.9-.24-1.63-.07-2.05l.07-.12.15.05c.17.24.19.56.09 1.1l-.03.16-.16.82z"/></svg>', Ag = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#e64a19" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zM8 11v2h1v6H8v1h4v-1h-1v-2h2a3 3 0 0 0 3-3 3 3 0 0 0-3-3zm5 2a1 1 0 0 1 1 1 1 1 0 0 1-1 1h-2v-2z"/></svg>', Og = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#0288d1" d="M9.86 2A2.86 2.86 0 0 0 7 4.86v1.68h4.29c.39 0 .71.57.71.96H4.86A2.86 2.86 0 0 0 2 10.36v3.781a2.86 2.86 0 0 0 2.86 2.86h1.18v-2.68a2.85 2.85 0 0 1 2.85-2.86h5.25c1.58 0 2.86-1.271 2.86-2.851V4.86A2.86 2.86 0 0 0 14.14 2zm-.72 1.61c.4 0 .72.12.72.71s-.32.891-.72.891c-.39 0-.71-.3-.71-.89s.32-.711.71-.711"/><path fill="#fdd835" d="M17.959 7v2.68a2.85 2.85 0 0 1-2.85 2.859H9.86A2.85 2.85 0 0 0 7 15.389v3.75a2.86 2.86 0 0 0 2.86 2.86h4.28A2.86 2.86 0 0 0 17 19.14v-1.68h-4.291c-.39 0-.709-.57-.709-.96h7.14A2.86 2.86 0 0 0 22 13.64V9.86A2.86 2.86 0 0 0 19.14 7zM8.32 11.513l-.004.004.038-.004zm6.54 7.276c.39 0 .71.3.71.89a.71.71 0 0 1-.71.71c-.4 0-.72-.12-.72-.71s.32-.89.72-.89"/></svg>', Pg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#8bc34a" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zm4 7.5h-4v2h1l-2 1.67L10 13h1v-2H7v2h1l3 2.5L8 18H7v2h4v-2h-1l2-1.67L14 18h-1v2h4v-2h-1l-3-2.5 3-2.5h1z"/></svg>', Tg = '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 16 16"><path fill="#0288d1" d="M2 2v12h12V2zm4 6h3v1H8v4H7V9H6zm5 0h2v1h-2v1h1a1.003 1.003 0 0 1 1 1v1a1.003 1.003 0 0 1-1 1h-2v-1h2v-1h-1a1.003 1.003 0 0 1-1-1V9a1.003 1.003 0 0 1 1-1"/></svg>', Dg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ff9800" d="m24 6 2 6h-4l-2-6h-3l2 6h-4l-2-6h-3l2 6H8L6 6H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3V6Z"/></svg>', kg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#01579b" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zM7 13l1.5 7h2l1.5-3 1.5 3h2l1.5-7h1v-2h-4v2h1l-.9 4.2L13 15h-2l-1.1 2.2L9 13h1v-2H6v2z"/></svg>', Fg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#8bc34a" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m.12 13.5 3.74 3.74 1.42-1.41-2.33-2.33 2.33-2.33-1.42-1.41zm11.16 0-3.74-3.74-1.42 1.41 2.33 2.33-2.33 2.33 1.42 1.41z"/></svg>', Hg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ff5252" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2m12 16v-2H9v2zm-4-4v-2H6v2z"/></svg>', jg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#afb42b" d="M14 17h-2v-2h-2v-2h2v2h2m0-6h-2v2h2v2h-2v-2h-2V9h2V7h-2V5h2v2h2m5-4H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2"/></svg>', Lg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Kg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Vg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Bg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, $g = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Ng = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Wg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Ug = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, zg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Gg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Yg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Xg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Jg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Zg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Qg = ["aria-label"], eh = {
  key: 0,
  class: "pnl-tst-tsep",
  "aria-hidden": "true"
}, th = {
  key: 1,
  class: "pnl-tst-search"
}, nh = ["innerHTML"], rh = ["value", "aria-label", "placeholder"], oh = ["aria-label", "aria-keyshortcuts", "aria-disabled", "title", "tabindex", "onClick", "onFocus"], sh = ["innerHTML"], ih = {
  key: 1,
  class: "pnl-tst-empty"
}, lh = ["aria-label", "aria-colcount", "aria-rowcount"], ah = {
  key: 0,
  class: "pnl-tst-head",
  role: "rowgroup"
}, ch = {
  class: "pnl-tst-hrow",
  role: "row",
  "aria-rowindex": 1
}, uh = ["aria-colindex"], fh = {
  class: "pnl-tst-body",
  role: "rowgroup"
}, dh = ["aria-level", "aria-posinset", "aria-setsize", "aria-rowindex", "aria-expanded", "aria-selected", "tabindex", "onClick", "onFocus"], ph = ["aria-colindex"], gh = ["onClick"], hh = {
  key: 1,
  class: "pnl-tst-twisty pnl-tst-twisty--leaf",
  "aria-hidden": "true"
}, vh = ["checked", ".indeterminate", "aria-label", "onClick"], mh = ["innerHTML"], yh = ["value", "aria-label", "onKeydown", "onBlur"], wh = {
  key: 2,
  class: "pnl-tst-value"
}, bh = {
  key: 3,
  class: "pnl-tst-modal"
}, _h = {
  id: "pnl-tst-confirm-message",
  class: "pnl-tst-dialog-message"
}, xh = { class: "pnl-tst-dialog-actions" }, Sh = "title", sr = "search", vn = "|", mn = "pnl-tst-row", Rh = 500, Ch = {
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
      rowExpandingFeature: zd,
      rowSelectionFeature: sp,
      coreRowModel: Vl(),
      expandedRowModel: ip()
    }, r = Y(() => (t.state.columns || []).length > 0), o = Y(() => {
      const c = t.state.columns || [];
      return c.length === 0 ? [{ id: Sh, header: "", accessorFn: (f) => f.title }] : c.map((f) => {
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
      audio: hg,
      console: vg,
      css: mg,
      database: yg,
      document: wg,
      file: bg,
      folder: _g,
      "folder-open": xg,
      html: Sg,
      image: Rg,
      javascript: Cg,
      json: Ig,
      markdown: Mg,
      pdf: Eg,
      powerpoint: Ag,
      python: Og,
      table: Pg,
      typescript: Tg,
      video: Dg,
      word: kg,
      xml: Fg,
      yaml: Hg,
      zip: jg
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
    const w = Y(() => t.state.options.select_mode ?? "none"), y = Y(() => w.value !== "none"), M = Y(() => w.value === "hierarchy"), C = Y(
      () => y.value && t.state.options.show_checkboxes !== !1
    ), T = /* @__PURE__ */ be(i(t.state.selectedKeys)), F = up({
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
      enableSubRowSelection: M,
      state: Y(() => ({ expanded: s.value, rowSelection: T.value })),
      onExpandedChange: (c) => {
        s.value = typeof c == "function" ? c(s.value) : c;
      },
      onRowSelectionChange: (c) => {
        T.value = typeof c == "function" ? c(T.value) : c;
      }
    });
    function I(c) {
      if (c.getIsSelected()) return "all";
      if (!M.value || c.subRows.length === 0) return "none";
      const f = c.subRows.map(I);
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
    }), G = Y(() => t.state.options.indent_px ?? 16), de = Y(() => t.state.options.aria_label ?? "Tree table"), se = Y(() => E.value ? "No matches" : "No data"), ve = Y(() => r.value ? 2 : 1), Te = Y(() => k.value.length + (r.value ? 1 : 0)), Me = Y(() => {
      const c = /* @__PURE__ */ new Map();
      for (const f of k.value) {
        const v = f.parentId ?? "", b = c.get(v) ?? [];
        b.push(f.id), c.set(v, b);
      }
      return c;
    });
    function te(c) {
      return Me.value.get(c.parentId ?? "") ?? [];
    }
    function X(c) {
      return te(c).indexOf(c.id) + 1;
    }
    function ne(c) {
      return te(c).length;
    }
    function ke(c) {
      return E.value ? (Me.value.get(c.id) ?? []).length > 0 : c.getCanExpand();
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
    const mt = /* @__PURE__ */ be(null), yt = /* @__PURE__ */ be(!0), Ut = /* @__PURE__ */ new Map();
    function Ke(c) {
      mt.value = c, yt.value = !0;
    }
    function zt(c, f) {
      f ? Ut.set(c, f) : Ut.delete(c);
    }
    const wt = Y(() => {
      const c = k.value;
      return c.length === 0 ? null : c.some((f) => f.id === mt.value) ? mt.value : c[0].id;
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
      V && g.value === null && (g.value = wt.value), Fe(b.id), V && R(b, !1);
    }
    function p(c) {
      const f = k.value;
      if (f.length === 0) return;
      const v = Math.max(
        0,
        f.findIndex((z) => z.id === wt.value)
      ), b = f[v];
      if (c.ctrlKey || c.metaKey) {
        const z = {
          a: "select-all",
          f: sr,
          z: c.shiftKey ? "redo" : "undo"
        }[c.key.toLowerCase()];
        if (z && Et(z)) {
          c.preventDefault(), we(z);
          return;
        }
      }
      if (c.altKey) {
        const z = {
          ArrowUp: "move-up",
          ArrowDown: "move-down",
          ArrowLeft: "outdent",
          ArrowRight: "indent"
        }[c.key];
        if (z && Et(z)) {
          c.preventDefault(), we(z);
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
      const [z, he] = b <= V ? [b, V] : [V, b];
      for (let Be = z; Be <= he; Be += 1)
        v[Be].toggleSelected(!0, { selectChildren: !1 });
    }
    const S = Y(() => t.state.options.toggle_on_click === !0);
    function _(c) {
      const f = l(T.value);
      return f.length === 1 && f[0] === c.id;
    }
    function P() {
      T.value = {}, g.value = null, yt.value = !1;
    }
    function O() {
      l(T.value).length === 0 && (yt.value = !1);
    }
    _e(
      () => l(T.value).length > 0,
      (c) => {
        c && (yt.value = !0);
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
      return I(c) === "all";
    }
    function D(c) {
      return I(c) === "some";
    }
    function j(c) {
      Ke(c.id), c.toggleSelected(void 0, { selectChildren: !1 }), O();
    }
    function B(c) {
      Ke(c.id), c.toggleSelected(!K(c), {
        selectChildren: M.value,
        deselectParents: M.value
      }), O();
    }
    function q(c) {
      B(c), Fe(c.id);
    }
    const J = {
      "new-folder": { icon: Ng, label: "New folder", keys: "Insert", node: {} },
      "new-file": {
        icon: $g,
        label: "New file",
        keys: "Shift+Insert",
        node: { allow_children: !1 }
      },
      rename: { icon: zg, label: "Rename", keys: "F2" },
      delete: { icon: Jg, label: "Delete", keys: "Delete" },
      undo: { icon: Zg, label: "Undo", keys: "Control+Z" },
      redo: { icon: qg, label: "Redo", keys: "Control+Shift+Z" },
      "move-up": { icon: Kg, label: "Move up", keys: "Alt+ArrowUp" },
      "move-down": { icon: Lg, label: "Move down", keys: "Alt+ArrowDown" },
      outdent: { icon: Wg, label: "Outdent", keys: "Alt+ArrowLeft" },
      indent: { icon: Ug, label: "Indent", keys: "Alt+ArrowRight" },
      "expand-all": { icon: Vg, label: "Expand all" },
      "collapse-all": { icon: Bg, label: "Collapse all" },
      "select-all": { icon: Xg, label: "Select all", keys: "Control+A" },
      "clear-selection": { icon: Yg, label: "Clear selection", keys: "Escape" }
    }, Z = [
      "undo",
      "redo",
      vn,
      "new-folder",
      "new-file",
      "rename",
      "delete",
      vn,
      "move-up",
      "move-down",
      "outdent",
      "indent",
      vn,
      "expand-all",
      "collapse-all",
      vn,
      "select-all",
      "clear-selection",
      sr
    ], ce = Y(() => {
      const c = t.state.options.toolbar, f = c === !0 ? Z : Array.isArray(c) ? c : [], v = [];
      return f.forEach((b, V) => {
        const z = typeof b == "string" ? {} : b || {}, he = typeof b == "string" ? b : z.id, Be = `${he}#${V}`;
        if (he === vn || he === sr) {
          v.push({ uid: Be, id: he });
          return;
        }
        const pn = J[he];
        if (!pn) return;
        const vs = z.label ?? pn.label;
        v.push({
          uid: Be,
          id: he,
          label: vs,
          icon: u(z.icon) ?? pn.icon,
          keys: pn.keys,
          node: { title: vs, ...pn.node ?? {}, ...z.node ?? {} }
        });
      }), v;
    }), me = Y(() => ce.value.length > 0), Ve = Y(() => t.state.options.toolbar_label ?? "Tree actions"), He = Y(() => t.state.options.search_label ?? "Search");
    function bt(c) {
      return ce.value.find((f) => f.id === c) ?? null;
    }
    function Et(c) {
      return bt(c) !== null;
    }
    function we(c) {
      const f = bt(c);
      f && us(f);
    }
    const pe = Y(() => k.value.find((c) => c.id === wt.value) ?? null);
    function Bn(c) {
      return k.value.filter((f) => (f.parentId ?? "") === (c.parentId ?? ""));
    }
    function cn() {
      const c = pe.value;
      if (!c) return [];
      const f = ds(c), v = c.parentId ?? "";
      return f.every((V) => {
        var z;
        return (((z = fn(V)) == null ? void 0 : z.parentId) ?? "") === v;
      }) ? f : [c.id];
    }
    function os() {
      const c = pe.value;
      if (!c) return [];
      if (!y.value || !c.getIsSelected()) return [c.id];
      const f = k.value.filter((v) => v.getIsSelected()).map((v) => v.id);
      return f.length > 0 ? f : [c.id];
    }
    function qt(c) {
      const f = pe.value;
      if (!f) return null;
      const v = new Set(cn()), b = Bn(f), V = b.map((he, Be) => v.has(he.id) ? Be : -1).filter((he) => he >= 0);
      if (V.length === 0) return null;
      let z = (c < 0 ? Math.min(...V) : Math.max(...V)) + c;
      for (; z >= 0 && z < b.length && v.has(b[z].id); ) z += c;
      return b[z] ?? null;
    }
    let ot = null;
    _e(
      () => t.state.source,
      () => {
        const c = ot;
        if (ot = null, !!c) {
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
      f && (Fe(f.id), y.value && (T.value = {}, g.value = f.id, f.toggleSelected(!0, { selectChildren: !1 })), Et("rename") && St(() => Wn(f.id, !0)));
    }
    const Gt = /* @__PURE__ */ be(null), $n = /* @__PURE__ */ be(""), un = /* @__PURE__ */ be(null), st = /* @__PURE__ */ be(null), $r = /* @__PURE__ */ be(null), Nr = /* @__PURE__ */ be(null), fa = Y(() => t.state.options.extension_warning !== !1);
    function ss(c) {
      const f = String(c ?? ""), v = f.lastIndexOf(".");
      return v < 0 ? "" : f.slice(v + 1).toLowerCase();
    }
    function da(c, f) {
      return fa.value && c.allow_children === !1 && ss(f) !== ss(c.title ?? "");
    }
    let Nn = null;
    function Wn(c, f = !1) {
      const v = fn(c);
      v && (Nn = f ? c : null, $n.value = v.original.title ?? "", Gt.value = c, t.setEditingKey(c), St(() => {
        var b, V;
        (b = un.value) == null || b.focus(), (V = un.value) == null || V.select();
      }));
    }
    function Un() {
      Nn = null, st.value = null, Gt.value = null, t.setEditingKey("");
    }
    function is(c) {
      if (st.value || Gt.value !== c.id) return;
      const f = $n.value.trim(), v = f.length > 0 && f !== (c.original.title ?? "");
      if (v && Nn !== c.id && da(c.original, f)) {
        st.value = { key: c.id, title: f, previous: c.original.title ?? c.id }, St(() => {
          var b;
          return (b = Nr.value) == null ? void 0 : b.focus();
        });
        return;
      }
      if (Un(), !v) {
        Fe(c.id);
        return;
      }
      ot = { key: c.id }, t.emitEvent("rename", { key: c.id, title: f });
    }
    function ls() {
      const { key: c, title: f } = st.value;
      st.value = null, Un(), ot = { key: c }, t.emitEvent("rename", { key: c, title: f });
    }
    function as() {
      st.value = null, St(() => {
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
      const f = Nn === c.id;
      if (Un(), !f) {
        Fe(c.id);
        return;
      }
      ot = { index: k.value.findIndex((v) => v.id === c.id) }, t.emitEvent("delete", { key: c.id, keys: [c.id] });
    }
    function ha(c, f) {
      f.key === "Enter" ? (f.preventDefault(), is(c)) : f.key === "Escape" && (f.preventDefault(), ga(c));
    }
    _e(
      () => t.state.editingKey,
      (c) => {
        (c || "") !== (Gt.value || "") && (c ? Wn(c) : Un());
      }
    ), So(() => {
      t.state.editingKey && Wn(t.state.editingKey);
    });
    function zn(c, f) {
      const v = pe.value;
      !v || !c || (ot = { key: v.id }, t.emitEvent("move", {
        key: v.id,
        keys: cn(),
        position: f,
        anchorKey: c.id
      }));
    }
    function va(c) {
      const f = pe.value, v = f ? f.original.allow_children === !1 ? "after" : "child" : null;
      f && v === "child" && !E.value && f.toggleExpanded(!0), ot = { added: new Set(F.getCoreRowModel().flatRows.map((b) => b.id)) }, t.emitEvent("add", { anchorKey: (f == null ? void 0 : f.id) ?? null, position: v, node: c.node });
    }
    function ma() {
      var f;
      const c = os();
      c.length !== 0 && (ot = { index: k.value.findIndex((v) => {
        var b;
        return v.id === ((b = pe.value) == null ? void 0 : b.id);
      }) }, t.emitEvent("delete", { key: ((f = pe.value) == null ? void 0 : f.id) ?? null, keys: c }));
    }
    function ya(c) {
      ot = { index: k.value.findIndex((f) => {
        var v;
        return f.id === ((v = pe.value) == null ? void 0 : v.id);
      }) }, t.emitEvent(c, {});
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
        case "undo":
          return t.state.canUndo === !0;
        case "redo":
          return t.state.canRedo === !0;
        case "move-up":
          return qt(-1) !== null;
        case "move-down":
          return qt(1) !== null;
        case "indent": {
          const v = qt(-1);
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
    function wa(c) {
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
            Wn(pe.value.id);
            break;
          case "delete":
            ma();
            break;
          case "undo":
          case "redo":
            ya(c.id);
            break;
          case "move-up":
            zn(qt(-1), "before");
            break;
          case "move-down":
            zn(qt(1), "after");
            break;
          case "indent": {
            const z = qt(-1);
            z && !E.value && z.toggleExpanded(!0), zn(z, "child");
            break;
          }
          case "outdent":
            zn(fn((f = pe.value) == null ? void 0 : f.parentId), "after");
            break;
          case "expand-all":
            F.toggleAllRowsExpanded(!0);
            break;
          case "collapse-all":
            F.toggleAllRowsExpanded(!1);
            break;
          case "select-all":
            T.value = Object.fromEntries(k.value.map((z) => [z.id, !0])), g.value = ((v = k.value[0]) == null ? void 0 : v.id) ?? null;
            break;
          case "clear-selection":
            P();
            break;
          case sr:
            (b = Wr.value) == null || b.focus(), (V = Wr.value) == null || V.select();
            break;
        }
    }
    const Wr = /* @__PURE__ */ be(null), Ur = Y(() => ce.value.filter((c) => c.id in J)), qn = /* @__PURE__ */ be(null), zr = /* @__PURE__ */ new Map(), fs = Y(() => {
      const c = Ur.value;
      return c.length === 0 ? null : c.some((f) => f.uid === qn.value) ? qn.value : c[0].uid;
    });
    function ba(c, f) {
      f ? zr.set(c, f) : zr.delete(c);
    }
    function Gn(c) {
      const f = Ur.value;
      if (f.length === 0) return;
      const v = f[Math.max(0, Math.min(c, f.length - 1))].uid;
      qn.value = v, St(() => {
        var b;
        return (b = zr.get(v)) == null ? void 0 : b.focus();
      });
    }
    function _a(c) {
      const f = Ur.value, v = Math.max(
        0,
        f.findIndex((b) => b.uid === fs.value)
      );
      switch (c.key) {
        case "ArrowRight":
          c.preventDefault(), Gn(v + 1);
          break;
        case "ArrowLeft":
          c.preventDefault(), Gn(v - 1);
          break;
        case "Home":
          c.preventDefault(), Gn(0);
          break;
        case "End":
          c.preventDefault(), Gn(f.length - 1);
          break;
      }
    }
    const xa = ["reorder-above", "reorder-below", "make-child", "reparent"], qr = Y(() => t.state.options.enable_dnd === !0), Gr = /* @__PURE__ */ be([]), Yn = /* @__PURE__ */ be(null);
    function fn(c) {
      return k.value.find((f) => f.id === c) ?? null;
    }
    function Sa(c, f) {
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
    function Ra(c, f) {
      return Sa(c, f) ? xa : c.original.allow_children === !1 ? ["make-child"] : [];
    }
    function Ca(c) {
      if (ke(c) && Ge(c)) return "expanded";
      const f = te(c);
      return f[f.length - 1] === c.id ? "last-in-group" : "standard";
    }
    let Yr = null, dn = null;
    function Xr() {
      dn && clearTimeout(dn), dn = null, Yr = null;
    }
    function Ia(c, f) {
      if (Yr === c || (Xr(), !f || f.type === "instruction-blocked")) return;
      const v = fn(c);
      !v || !v.getCanExpand() || v.getIsExpanded() || (Yr = c, dn = setTimeout(() => {
        dn = null;
        const b = fn(c);
        b && b.getCanExpand() && !b.getIsExpanded() && b.toggleExpanded(!0);
      }, Rh));
    }
    function Jr() {
      Yn.value = null, Xr();
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
    function Xn(c) {
      for (const f of k.value) {
        const v = Ut.get(f.id);
        if (!v) continue;
        const b = v.getBoundingClientRect();
        if (c.clientX >= b.left && c.clientX < b.right && c.clientY >= b.top && c.clientY < b.bottom)
          return { row: f, element: v, rect: b };
      }
      return null;
    }
    function Ea(c, f) {
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
      !c || !qr.value || (_t = Kr(
        sg({
          element: c,
          // Anything outside a row (the header, the empty space below the last row)
          // is not a drag handle, and returning false cancels the native drag.
          canDrag: ({ input: f }) => {
            const v = Xn(f);
            return v !== null && !Ea(v, f);
          },
          getInitialData: ({ input: f }) => {
            const v = Xn(f);
            return v ? { type: mn, key: v.row.id, keys: ds(v.row) } : { type: mn, key: null, keys: [] };
          },
          onGenerateDragPreview: ({ location: f, nativeSetDragImage: v }) => {
            const b = f.current.input, V = Xn(b);
            !V || !v || v(V.element, b.clientX - V.rect.left, b.clientY - V.rect.top);
          },
          onDragStart: ({ source: f }) => {
            Gr.value = f.data.keys ?? [];
          },
          onDrop: () => {
            Gr.value = [], Jr();
          }
        }),
        og({
          element: c,
          canDrop: ({ source: f }) => f.data.type === mn,
          getData: ({ input: f, source: v }) => {
            const b = Xn(f);
            if (!b) return { type: mn, key: null };
            const V = { type: mn, key: b.row.id };
            return gg(V, {
              element: b.element,
              input: f,
              currentLevel: b.row.depth,
              indentPerLevel: G.value,
              mode: Ca(b.row),
              block: Ra(b.row, v.data.keys ?? [])
            });
          },
          onDrag: ({ self: f }) => {
            const v = f.data.key, b = gi(f.data);
            Yn.value = v && b ? { key: v, instruction: b } : null, Ia(v ?? null, b);
          },
          onDragLeave: Jr,
          onDrop: ({ self: f, source: v }) => {
            Jr();
            const b = f.data.key, V = gi(f.data);
            if (!b || !V || V.type === "instruction-blocked") return;
            const z = v.data.keys ?? [];
            z.includes(b) || t.emitEvent("move", {
              key: v.data.key,
              keys: z,
              targetKey: b,
              instruction: V.type,
              desiredLevel: V.desiredLevel ?? V.currentLevel
            });
          }
        })
      ));
    }
    So(gs), _e(qr, gs), Ji(() => {
      Xr(), _t == null || _t();
    });
    function Zr(c) {
      var f;
      return ((f = Yn.value) == null ? void 0 : f.key) === c.id ? Yn.value.instruction : null;
    }
    function Aa(c) {
      const f = Zr(c);
      return {
        "pnl-tst-row--draggable": qr.value,
        "pnl-tst-row--dragging": Gr.value.includes(c.id),
        "pnl-tst-row--blocked": (f == null ? void 0 : f.type) === "instruction-blocked",
        "pnl-tst-row--child-target": (f == null ? void 0 : f.type) === "make-child"
      };
    }
    function hs(c) {
      const f = Zr(c);
      return f ? f.type === "reorder-above" ? "pnl-tst-dropline--above" : f.type === "reorder-below" || f.type === "reparent" ? "pnl-tst-dropline--below" : null : null;
    }
    function Oa(c) {
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
        (ie(!0), ue(Oe, null, er(ce.value, (v) => (ie(), ue(Oe, {
          key: v.uid
        }, [
          v.id === "|" ? (ie(), ue("span", eh)) : v.id === "search" ? (ie(), ue("label", th, [
            Se("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: Ht(Gg)
            }, null, 8, nh),
            Se("input", {
              ref_for: !0,
              ref: (b) => Wr.value = b,
              type: "search",
              value: $.value,
              "aria-label": He.value,
              placeholder: He.value,
              onInput: f[0] || (f[0] = (b) => W(b.target.value))
            }, null, 40, rh)
          ])) : (ie(), ue("button", {
            key: 2,
            ref_for: !0,
            ref: (b) => ba(v.uid, b),
            type: "button",
            class: "pnl-tst-tbtn",
            "aria-label": v.label,
            "aria-keyshortcuts": v.keys,
            "aria-disabled": !cs(v),
            title: wa(v),
            tabindex: v.uid === fs.value ? 0 : -1,
            onClick: (b) => us(v),
            onFocus: (b) => qn.value = v.uid,
            onKeydown: _a
          }, [
            Se("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: v.icon
            }, null, 8, sh)
          ], 40, oh))
        ], 64))), 128))
      ], 8, Qg)) : Pt("", !0),
      k.value.length === 0 ? (ie(), ue("div", ih, Xt(se.value), 1)) : (ie(), ue("div", {
        key: 2,
        class: "pnl-tst-grid",
        role: "treegrid",
        "aria-label": de.value,
        "aria-colcount": H.value.length,
        "aria-rowcount": Te.value,
        onKeydown: p
      }, [
        r.value ? (ie(), ue("div", ah, [
          Se("div", ch, [
            (ie(!0), ue(Oe, null, er(H.value, (v, b) => (ie(), ue("div", {
              key: v.id,
              class: "pnl-tst-hcell",
              role: "columnheader",
              "aria-colindex": b + 1,
              style: en(Ne(v.column.columnDef))
            }, Xt(v.column.columnDef.header), 13, uh))), 128))
          ])
        ])) : Pt("", !0),
        Se("div", fh, [
          (ie(!0), ue(Oe, null, er(k.value, (v, b) => (ie(), ue("div", {
            key: v.id,
            ref_for: !0,
            ref: (V) => zt(v.id, V),
            class: Dt(["pnl-tst-row", [
              Aa(v),
              {
                "pnl-tst-row--active": yt.value && v.id === mt.value,
                "pnl-tst-row--quiet": !yt.value && v.id === mt.value
              }
            ]]),
            role: "row",
            "aria-level": v.depth + 1,
            "aria-posinset": X(v),
            "aria-setsize": ne(v),
            "aria-rowindex": b + ve.value,
            "aria-expanded": ke(v) ? Ge(v) : void 0,
            "aria-selected": y.value ? v.getIsSelected() : void 0,
            tabindex: v.id === wt.value ? 0 : -1,
            onClick: (V) => A(v, V),
            onFocus: (V) => Ke(v.id)
          }, [
            hs(v) ? (ie(), ue("span", {
              key: 0,
              class: Dt(["pnl-tst-dropline", hs(v)]),
              style: en(Oa(v)),
              "aria-hidden": "true"
            }, null, 6)) : Pt("", !0),
            (ie(!0), ue(Oe, null, er(v.getAllCells(), (V, z) => (ie(), ue("div", {
              key: V.id,
              class: Dt(["pnl-tst-cell", { "pnl-tst-cell--tree": z === 0 }]),
              role: "gridcell",
              "aria-colindex": z + 1,
              style: en(
                z === 0 ? Le(v, V.column.columnDef) : Ne(V.column.columnDef)
              )
            }, [
              z === 0 ? (ie(), ue(Oe, { key: 0 }, [
                ke(v) ? (ie(), ue("span", {
                  key: 0,
                  class: Dt(["pnl-tst-twisty", { "pnl-tst-twisty--open": Ge(v) }]),
                  "aria-hidden": "true",
                  onClick: nr((he) => x(v), ["stop"])
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
                ])], 10, gh)) : (ie(), ue("span", hh)),
                C.value ? (ie(), ue("input", {
                  key: 2,
                  class: "pnl-tst-check",
                  type: "checkbox",
                  tabindex: "-1",
                  checked: K(v),
                  ".indeterminate": D(v),
                  "aria-label": `Select ${v.original.title ?? v.id}`,
                  onClick: nr((he) => q(v), ["stop"])
                }, null, 40, vh)) : Pt("", !0),
                d(v) ? (ie(), ue("span", {
                  key: 3,
                  class: "pnl-tst-icon",
                  "aria-hidden": "true",
                  innerHTML: d(v)
                }, null, 8, mh)) : Pt("", !0)
              ], 64)) : Pt("", !0),
              z === 0 && Gt.value === v.id ? (ie(), ue("input", {
                key: 1,
                ref_for: !0,
                ref: (he) => un.value = he,
                class: "pnl-tst-edit",
                type: "text",
                value: $n.value,
                "aria-label": `Rename ${v.original.title ?? v.id}`,
                onInput: f[1] || (f[1] = (he) => $n.value = he.target.value),
                onClick: f[2] || (f[2] = nr(() => {
                }, ["stop"])),
                onKeydown: nr((he) => ha(v, he), ["stop"]),
                onBlur: (he) => is(v)
              }, null, 40, yh)) : (ie(), ue("span", wh, Xt(V.getValue()), 1))
            ], 14, ph))), 128))
          ], 42, dh))), 128))
        ])
      ], 40, lh)),
      st.value ? (ie(), ue("div", bh, [
        Se("div", {
          class: "pnl-tst-dialog",
          role: "alertdialog",
          "aria-modal": "true",
          "aria-label": "Rename",
          "aria-describedby": "pnl-tst-confirm-message",
          onKeydown: pa
        }, [
          Se("p", _h, " Rename " + Xt(st.value.previous) + " to " + Xt(st.value.title) + "? If you change a file name extension, the file might become unusable. ", 1),
          Se("div", xh, [
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
function Ih({ model: e, el: t }) {
  t.style.display = "block", t.style.width = "100%", t.style.height = "100%";
  const n = document.createElement("div");
  n.className = "pnl-tst-root", n.style.height = "100%", t.append(n);
  const r = /* @__PURE__ */ Mr({
    source: e.get("source") || [],
    columns: e.get("columns") || [],
    options: e.get("options") || {},
    icons: e.get("icons") || {},
    filterText: e.get("filter_text") || "",
    editingKey: e.get("editing_key") || "",
    expandedKeys: e.get("expanded_keys") || [],
    selectedKeys: e.get("selected_keys") || [],
    // Python owns the history as it owns the tree. The toolbar asks for a step and
    // reads these to know whether there is one, rather than counting its own.
    canUndo: e.get("can_undo") || !1,
    canRedo: e.get("can_redo") || !1
  }), o = 16, s = [];
  let i = 0;
  const l = (C, T) => {
    i += 1, s.push({ seq: i, event_name: C, event_params: T }), s.length > o && s.shift(), e.set("_event_data", { events: [...s], timestamp: Date.now() }), e.save_changes();
  }, a = (C, T) => C.length === T.length && C.every((F, I) => F === T[I]), u = (C) => (T) => {
    const F = [...e.get(C) || []].sort();
    a(F, T) || (e.set(C, T), e.save_changes());
  }, d = u("expanded_keys"), h = u("selected_keys"), M = Ju(Ch, {
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
  return M.mount(n), e.on("change:source", () => {
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
  }), e.on("change:can_undo", () => {
    r.canUndo = e.get("can_undo") || !1;
  }), e.on("change:can_redo", () => {
    r.canRedo = e.get("can_redo") || !1;
  }), () => {
    M.unmount();
  };
}
export {
  Ih as render
};

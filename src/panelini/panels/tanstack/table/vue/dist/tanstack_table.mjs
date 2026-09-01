/**
* @vue/shared v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function Ko(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const ae = {}, en = [], rt = () => {
}, vi = () => !1, _r = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), xr = (e) => e.startsWith("onUpdate:"), Ie = Object.assign, Vo = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Ha = Object.prototype.hasOwnProperty, ee = (e, t) => Ha.call(e, t), N = Array.isArray, It = (e) => Fn(e) === "[object Map]", ur = (e) => Fn(e) === "[object Set]", ys = (e) => Fn(e) === "[object Date]", U = (e) => typeof e == "function", ge = (e) => typeof e == "string", ot = (e) => typeof e == "symbol", re = (e) => e !== null && typeof e == "object", mi = (e) => (re(e) || U(e)) && U(e.then) && U(e.catch), yi = Object.prototype.toString, Fn = (e) => yi.call(e), ja = (e) => Fn(e).slice(8, -1), wi = (e) => Fn(e) === "[object Object]", Bo = (e) => ge(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, bn = /* @__PURE__ */ Ko(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Sr = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, La = /-\w/g, We = Sr(
  (e) => e.replace(La, (t) => t.slice(1).toUpperCase())
), Ka = /\B([A-Z])/g, $t = Sr(
  (e) => e.replace(Ka, "-$1").toLowerCase()
), bi = Sr((e) => e.charAt(0).toUpperCase() + e.slice(1)), to = Sr(
  (e) => e ? `on${bi(e)}` : ""
), tt = (e, t) => !Object.is(e, t), no = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, _i = (e, t, n, r = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: r,
    value: n
  });
}, Va = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let ws;
const Rr = () => ws || (ws = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function tn(e) {
  if (N(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], o = ge(r) ? Wa(r) : tn(r);
      if (o)
        for (const s in o)
          t[s] = o[s];
    }
    return t;
  } else if (ge(e) || re(e))
    return e;
}
const Ba = /;(?![^(]*\))/g, $a = /:([^]+)/, Na = /\/\*[^]*?\*\//g;
function Wa(e) {
  const t = {};
  return e.replace(Na, "").split(Ba).forEach((n) => {
    if (n) {
      const r = n.split($a);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function kt(e) {
  let t = "";
  if (ge(e))
    t = e;
  else if (N(e))
    for (let n = 0; n < e.length; n++) {
      const r = kt(e[n]);
      r && (t += r + " ");
    }
  else if (re(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Ua = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", za = /* @__PURE__ */ Ko(Ua);
function xi(e) {
  return !!e || e === "";
}
function qa(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let r = 0; n && r < e.length; r++)
    n = Cr(e[r], t[r]);
  return n;
}
function bs(e, t) {
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
  let n = ys(e), r = ys(t);
  if (n || r)
    return n && r ? e.getTime() === t.getTime() : !1;
  if (n = ot(e), r = ot(t), n || r)
    return e === t;
  if (n = N(e), r = N(t), n || r)
    return n && r ? qa(e, t) : !1;
  if (n = re(e), r = re(t), n || r) {
    if (!n || !r)
      return !1;
    if (n = It(e), r = It(t), n || r || (n = ur(e), r = ur(t), n || r))
      return n && r ? bs(e, t) : !1;
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
const Si = (e) => !!(e && e.__v_isRef === !0), Jt = (e) => ge(e) ? e : e == null ? "" : N(e) || re(e) && (e.toString === yi || !U(e.toString)) ? Si(e) ? Jt(e.value) : JSON.stringify(e, Ri, 2) : String(e), Ri = (e, t) => Si(t) ? Ri(e, t.value) : It(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [r, o], s) => (n[ro(r, s) + " =>"] = o, n),
    {}
  )
} : ur(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => ro(n))
} : ot(t) ? ro(t) : re(t) && !N(t) && !wi(t) ? String(t) : t, ro = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    ot(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let ye;
class Ga {
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
function Ci() {
  return ye;
}
function Ya(e, t = !1) {
  ye && ye.cleanups.push(e);
}
let le;
const oo = /* @__PURE__ */ new WeakSet();
class Ii {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, ye && (ye.active ? ye.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, oo.has(this) && (oo.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ei(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, _s(this), Ai(this);
    const t = le, n = Ue;
    le = this, Ue = !0;
    try {
      return this.fn();
    } finally {
      Oi(this), le = t, Ue = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Wo(t);
      this.deps = this.depsTail = void 0, _s(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? oo.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    bo(this) && this.run();
  }
  get dirty() {
    return bo(this);
  }
}
let Mi = 0, _n, xn;
function Ei(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = xn, xn = e;
    return;
  }
  e.next = _n, _n = e;
}
function $o() {
  Mi++;
}
function No() {
  if (--Mi > 0)
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
function Ai(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Oi(e) {
  let t, n = e.depsTail, r = n;
  for (; r; ) {
    const o = r.prevDep;
    r.version === -1 ? (r === n && (n = o), Wo(r), Xa(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = o;
  }
  e.deps = t, e.depsTail = n;
}
function bo(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Pi(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Pi(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Mn) || (e.globalVersion = Mn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !bo(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = le, r = Ue;
  le = e, Ue = !0;
  try {
    Ai(e);
    const o = e.fn(e._value);
    (t.version === 0 || tt(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    le = n, Ue = r, Oi(e), e.flags &= -3;
  }
}
function Wo(e, t = !1) {
  const { dep: n, prevSub: r, nextSub: o } = e;
  if (r && (r.nextSub = o, e.prevSub = void 0), o && (o.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
    n.computed.flags &= -5;
    for (let s = n.computed.deps; s; s = s.nextDep)
      Wo(s, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Xa(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let Ue = !0;
const Ti = [];
function ft() {
  Ti.push(Ue), Ue = !1;
}
function dt() {
  const e = Ti.pop();
  Ue = e === void 0 ? !0 : e;
}
function _s(e) {
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
class Ja {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Uo {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!le || !Ue || le === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== le)
      n = this.activeLink = new Ja(le, this), le.deps ? (n.prevDep = le.depsTail, le.depsTail.nextDep = n, le.depsTail = n) : le.deps = le.depsTail = n, ki(n);
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
    $o();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      No();
    }
  }
}
function ki(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let r = t.deps; r; r = r.nextDep)
        ki(r);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const _o = /* @__PURE__ */ new WeakMap(), Dt = /* @__PURE__ */ Symbol(
  ""
), xo = /* @__PURE__ */ Symbol(
  ""
), En = /* @__PURE__ */ Symbol(
  ""
);
function Re(e, t, n) {
  if (Ue && le) {
    let r = _o.get(e);
    r || _o.set(e, r = /* @__PURE__ */ new Map());
    let o = r.get(n);
    o || (r.set(n, o = new Uo()), o.map = r, o.key = n), o.track();
  }
}
function ct(e, t, n, r, o, s) {
  const i = _o.get(e);
  if (!i) {
    Mn++;
    return;
  }
  const l = (a) => {
    a && a.trigger();
  };
  if ($o(), t === "clear")
    i.forEach(l);
  else {
    const a = N(e), f = a && Bo(n);
    if (a && n === "length") {
      const d = Number(r);
      i.forEach((v, b) => {
        (b === "length" || b === En || !ot(b) && b >= d) && l(v);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && l(i.get(n)), f && l(i.get(En)), t) {
        case "add":
          a ? f && l(i.get("length")) : (l(i.get(Dt)), It(e) && l(i.get(xo)));
          break;
        case "delete":
          a || (l(i.get(Dt)), It(e) && l(i.get(xo)));
          break;
        case "set":
          It(e) && l(i.get(Dt));
          break;
      }
  }
  No();
}
function Yt(e) {
  const t = /* @__PURE__ */ Q(e);
  return t === e ? t : (Re(t, "iterate", En), /* @__PURE__ */ $e(e) ? t : t.map(ze));
}
function Ir(e) {
  return Re(e = /* @__PURE__ */ Q(e), "iterate", En), e;
}
function Qe(e, t) {
  return /* @__PURE__ */ pt(e) ? on(/* @__PURE__ */ Ft(e) ? ze(t) : t) : ze(t);
}
const Za = {
  __proto__: null,
  [Symbol.iterator]() {
    return so(this, Symbol.iterator, (e) => Qe(this, e));
  },
  concat(...e) {
    return Yt(this).concat(
      ...e.map((t) => N(t) ? Yt(t) : t)
    );
  },
  entries() {
    return so(this, "entries", (e) => (e[1] = Qe(this, e[1]), e));
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
      (n) => n.map((r) => Qe(this, r)),
      arguments
    );
  },
  find(e, t) {
    return it(
      this,
      "find",
      e,
      t,
      (n) => Qe(this, n),
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
      (n) => Qe(this, n),
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
    return io(this, "includes", e);
  },
  indexOf(...e) {
    return io(this, "indexOf", e);
  },
  join(e) {
    return Yt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return io(this, "lastIndexOf", e);
  },
  map(e, t) {
    return it(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return hn(this, "pop");
  },
  push(...e) {
    return hn(this, "push", e);
  },
  reduce(e, ...t) {
    return xs(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return xs(this, "reduceRight", e, t);
  },
  shift() {
    return hn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return it(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return hn(this, "splice", e);
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
    return hn(this, "unshift", e);
  },
  values() {
    return so(this, "values", (e) => Qe(this, e));
  }
};
function so(e, t, n) {
  const r = Ir(e), o = r[t]();
  return r !== e && !/* @__PURE__ */ $e(e) && (o._next = o.next, o.next = () => {
    const s = o._next();
    return s.done || (s.value = n(s.value)), s;
  }), o;
}
const Qa = Array.prototype;
function it(e, t, n, r, o, s) {
  const i = Ir(e), l = i !== e && !/* @__PURE__ */ $e(e), a = i[t];
  if (a !== Qa[t]) {
    const v = a.apply(e, s);
    return l ? ze(v) : v;
  }
  let f = n;
  i !== e && (l ? f = function(v, b) {
    return n.call(this, Qe(e, v), b, e);
  } : n.length > 2 && (f = function(v, b) {
    return n.call(this, v, b, e);
  }));
  const d = a.call(i, f, r);
  return l && o ? o(d) : d;
}
function xs(e, t, n, r) {
  const o = Ir(e), s = o !== e && !/* @__PURE__ */ $e(e);
  let i = n, l = !1;
  o !== e && (s ? (l = r.length === 0, i = function(f, d, v) {
    return l && (l = !1, f = Qe(e, f)), n.call(this, f, Qe(e, d), v, e);
  }) : n.length > 3 && (i = function(f, d, v) {
    return n.call(this, f, d, v, e);
  }));
  const a = o[t](i, ...r);
  return l ? Qe(e, a) : a;
}
function io(e, t, n) {
  const r = /* @__PURE__ */ Q(e);
  Re(r, "iterate", En);
  const o = r[t](...n);
  return (o === -1 || o === !1) && /* @__PURE__ */ Go(n[0]) ? (n[0] = /* @__PURE__ */ Q(n[0]), r[t](...n)) : o;
}
function hn(e, t, n = []) {
  ft(), $o();
  const r = (/* @__PURE__ */ Q(e))[t].apply(e, n);
  return No(), dt(), r;
}
const ec = /* @__PURE__ */ Ko("__proto__,__v_isRef,__isVue"), Di = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(ot)
);
function tc(e) {
  ot(e) || (e = String(e));
  const t = /* @__PURE__ */ Q(this);
  return Re(t, "has", e), t.hasOwnProperty(e);
}
class Fi {
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
      return r === (o ? s ? fc : Ki : s ? Li : ji).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const i = N(t);
    if (!o) {
      let a;
      if (i && (a = Za[n]))
        return a;
      if (n === "hasOwnProperty")
        return tc;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ Ce(t) ? t : r
    );
    if ((ot(n) ? Di.has(n) : ec(n)) || (o || Re(t, "get", n), s))
      return l;
    if (/* @__PURE__ */ Ce(l)) {
      const a = i && Bo(n) ? l : l.value;
      return o && re(a) ? /* @__PURE__ */ Ro(a) : a;
    }
    return re(l) ? o ? /* @__PURE__ */ Ro(l) : /* @__PURE__ */ Mr(l) : l;
  }
}
class Hi extends Fi {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, o) {
    let s = t[n];
    const i = N(t) && Bo(n);
    if (!this._isShallow) {
      const f = /* @__PURE__ */ pt(s);
      if (!/* @__PURE__ */ $e(r) && !/* @__PURE__ */ pt(r) && (s = /* @__PURE__ */ Q(s), r = /* @__PURE__ */ Q(r)), !i && /* @__PURE__ */ Ce(s) && !/* @__PURE__ */ Ce(r))
        return f || (s.value = r), !0;
    }
    const l = i ? Number(n) < t.length : ee(t, n), a = Reflect.set(
      t,
      n,
      r,
      /* @__PURE__ */ Ce(t) ? t : o
    );
    return t === /* @__PURE__ */ Q(o) && a && (l ? tt(r, s) && ct(t, "set", n, r) : ct(t, "add", n, r)), a;
  }
  deleteProperty(t, n) {
    const r = ee(t, n);
    t[n];
    const o = Reflect.deleteProperty(t, n);
    return o && r && ct(t, "delete", n, void 0), o;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!ot(n) || !Di.has(n)) && Re(t, "has", n), r;
  }
  ownKeys(t) {
    return Re(
      t,
      "iterate",
      N(t) ? "length" : Dt
    ), Reflect.ownKeys(t);
  }
}
class nc extends Fi {
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
const rc = /* @__PURE__ */ new Hi(), oc = /* @__PURE__ */ new nc(), sc = /* @__PURE__ */ new Hi(!0);
const So = (e) => e, Jn = (e) => Reflect.getPrototypeOf(e);
function ic(e, t, n) {
  return function(...r) {
    const o = this.__v_raw, s = /* @__PURE__ */ Q(o), i = It(s), l = e === "entries" || e === Symbol.iterator && i, a = e === "keys" && i, f = o[e](...r), d = n ? So : t ? on : ze;
    return !t && Re(
      s,
      "iterate",
      a ? xo : Dt
    ), Ie(
      // inheriting all iterator properties
      Object.create(f),
      {
        // iterator protocol
        next() {
          const { value: v, done: b } = f.next();
          return b ? { value: v, done: b } : {
            value: l ? [d(v[0]), d(v[1])] : d(v),
            done: b
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
function lc(e, t) {
  const n = {
    get(o) {
      const s = this.__v_raw, i = /* @__PURE__ */ Q(s), l = /* @__PURE__ */ Q(o);
      e || (tt(o, l) && Re(i, "get", o), Re(i, "get", l));
      const { has: a } = Jn(i), f = t ? So : e ? on : ze;
      if (a.call(i, o))
        return f(s.get(o));
      if (a.call(i, l))
        return f(s.get(l));
      s !== i && s.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && Re(/* @__PURE__ */ Q(o), "iterate", Dt), o.size;
    },
    has(o) {
      const s = this.__v_raw, i = /* @__PURE__ */ Q(s), l = /* @__PURE__ */ Q(o);
      return e || (tt(o, l) && Re(i, "has", o), Re(i, "has", l)), o === l ? s.has(o) : s.has(o) || s.has(l);
    },
    forEach(o, s) {
      const i = this, l = i.__v_raw, a = /* @__PURE__ */ Q(l), f = t ? So : e ? on : ze;
      return !e && Re(a, "iterate", Dt), l.forEach((d, v) => o.call(s, f(d), f(v), i));
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
        return i.has.call(s, a) || tt(o, a) && i.has.call(s, o) || tt(l, a) && i.has.call(s, l) || (s.add(a), ct(s, "add", a, a)), this;
      },
      set(o, s) {
        !t && !/* @__PURE__ */ $e(s) && !/* @__PURE__ */ pt(s) && (s = /* @__PURE__ */ Q(s));
        const i = /* @__PURE__ */ Q(this), { has: l, get: a } = Jn(i);
        let f = l.call(i, o);
        f || (o = /* @__PURE__ */ Q(o), f = l.call(i, o));
        const d = a.call(i, o);
        return i.set(o, s), f ? tt(s, d) && ct(i, "set", o, s) : ct(i, "add", o, s), this;
      },
      delete(o) {
        const s = /* @__PURE__ */ Q(this), { has: i, get: l } = Jn(s);
        let a = i.call(s, o);
        a || (o = /* @__PURE__ */ Q(o), a = i.call(s, o)), l && l.call(s, o);
        const f = s.delete(o);
        return a && ct(s, "delete", o, void 0), f;
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
    n[o] = ic(o, e, t);
  }), n;
}
function zo(e, t) {
  const n = lc(e, t);
  return (r, o, s) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(
    ee(n, o) && o in r ? n : r,
    o,
    s
  );
}
const ac = {
  get: /* @__PURE__ */ zo(!1, !1)
}, cc = {
  get: /* @__PURE__ */ zo(!1, !0)
}, uc = {
  get: /* @__PURE__ */ zo(!0, !1)
};
const ji = /* @__PURE__ */ new WeakMap(), Li = /* @__PURE__ */ new WeakMap(), Ki = /* @__PURE__ */ new WeakMap(), fc = /* @__PURE__ */ new WeakMap();
function dc(e) {
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
  return /* @__PURE__ */ pt(e) ? e : qo(
    e,
    !1,
    rc,
    ac,
    ji
  );
}
// @__NO_SIDE_EFFECTS__
function pc(e) {
  return qo(
    e,
    !1,
    sc,
    cc,
    Li
  );
}
// @__NO_SIDE_EFFECTS__
function Ro(e) {
  return qo(
    e,
    !0,
    oc,
    uc,
    Ki
  );
}
function qo(e, t, n, r, o) {
  if (!re(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const s = o.get(e);
  if (s)
    return s;
  const i = dc(ja(e));
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
function Go(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function Q(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ Q(t) : e;
}
function gc(e) {
  return !ee(e, "__v_skip") && Object.isExtensible(e) && _i(e, "__v_skip", !0), e;
}
const ze = (e) => re(e) ? /* @__PURE__ */ Mr(e) : e, on = (e) => re(e) ? /* @__PURE__ */ Ro(e) : e;
// @__NO_SIDE_EFFECTS__
function Ce(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function be(e) {
  return Vi(e, !1);
}
// @__NO_SIDE_EFFECTS__
function hc(e) {
  return Vi(e, !0);
}
function Vi(e, t) {
  return /* @__PURE__ */ Ce(e) ? e : new vc(e, t);
}
class vc {
  constructor(t, n) {
    this.dep = new Uo(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ Q(t), this._value = n ? t : ze(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, r = this.__v_isShallow || /* @__PURE__ */ $e(t) || /* @__PURE__ */ pt(t);
    t = r ? t : /* @__PURE__ */ Q(t), tt(t, n) && (this._rawValue = t, this._value = r ? t : ze(t), this.dep.trigger());
  }
}
function Ht(e) {
  return /* @__PURE__ */ Ce(e) ? e.value : e;
}
const mc = {
  get: (e, t, n) => t === "__v_raw" ? e : Ht(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return /* @__PURE__ */ Ce(o) && !/* @__PURE__ */ Ce(n) ? (o.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function Bi(e) {
  return /* @__PURE__ */ Ft(e) ? e : new Proxy(e, mc);
}
class yc {
  constructor(t, n, r) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Uo(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Mn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    le !== this)
      return Ei(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Pi(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function wc(e, t, n = !1) {
  let r, o;
  return U(e) ? r = e : (r = e.get, o = e.set), new yc(r, o, n);
}
const Qn = {}, fr = /* @__PURE__ */ new WeakMap();
let Tt;
function bc(e, t = !1, n = Tt) {
  if (n) {
    let r = fr.get(n);
    r || fr.set(n, r = []), r.push(e);
  }
}
function _c(e, t, n = ae) {
  const { immediate: r, deep: o, once: s, scheduler: i, augmentJob: l, call: a } = n, f = (E) => o ? E : /* @__PURE__ */ $e(E) || o === !1 || o === 0 ? Ct(E, 1) : Ct(E);
  let d, v, b, y, M = !1, C = !1;
  if (/* @__PURE__ */ Ce(e) ? (v = () => e.value, M = /* @__PURE__ */ $e(e)) : /* @__PURE__ */ Ft(e) ? (v = () => f(e), M = !0) : N(e) ? (C = !0, M = e.some((E) => /* @__PURE__ */ Ft(E) || /* @__PURE__ */ $e(E)), v = () => e.map((E) => {
    if (/* @__PURE__ */ Ce(E))
      return E.value;
    if (/* @__PURE__ */ Ft(E))
      return f(E);
    if (U(E))
      return a ? a(E, 2) : E();
  })) : U(e) ? t ? v = a ? () => a(e, 2) : e : v = () => {
    if (b) {
      ft();
      try {
        b();
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
  } : v = rt, t && o) {
    const E = v, $ = o === !0 ? 1 / 0 : o;
    v = () => Ct(E(), $);
  }
  const T = Ci(), F = () => {
    d.stop(), T && T.active && Vo(T.effects, d);
  };
  if (s && t) {
    const E = t;
    t = (...$) => {
      const W = E(...$);
      return F(), W;
    };
  }
  let I = C ? new Array(e.length).fill(Qn) : Qn;
  const K = (E) => {
    if (!(!(d.flags & 1) || !d.dirty && !E))
      if (t) {
        const $ = d.run();
        if (E || o || M || (C ? $.some((W, de) => tt(W, I[de])) : tt($, I))) {
          b && b();
          const W = Tt;
          Tt = d;
          try {
            const de = [
              $,
              // pass undefined as the old value when it's changed for the first time
              I === Qn ? void 0 : C && I[0] === Qn ? [] : I,
              y
            ];
            I = $, a ? a(t, 3, de) : (
              // @ts-expect-error
              t(...de)
            );
          } finally {
            Tt = W;
          }
        }
      } else
        d.run();
  };
  return l && l(K), d = new Ii(v), d.scheduler = i ? () => i(K, !1) : K, y = (E) => bc(E, !1, d), b = d.onStop = () => {
    const E = fr.get(d);
    if (E) {
      if (a)
        a(E, 4);
      else
        for (const $ of E) $();
      fr.delete(d);
    }
  }, t ? r ? K(!0) : I = d.run() : i ? i(K.bind(null, !0), !0) : d.run(), F.pause = d.pause.bind(d), F.resume = d.resume.bind(d), F.stop = F, F;
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
  else if (wi(e)) {
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
    return o && mi(o) && o.catch((s) => {
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
    const a = t.proxy, f = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const d = l.ec;
      if (d) {
        for (let v = 0; v < d.length; v++)
          if (d[v](e, a, f) === !1)
            return;
      }
      l = l.parent;
    }
    if (s) {
      ft(), Hn(s, null, 10, [
        e,
        a,
        f
      ]), dt();
      return;
    }
  }
  xc(e, n, o, r, i);
}
function xc(e, t, n, r = !0, o = !1) {
  if (o)
    throw e;
  console.error(e);
}
const Ae = [];
let Ze = -1;
const nn = [];
let Rt = null, Zt = 0;
const $i = /* @__PURE__ */ Promise.resolve();
let dr = null;
function St(e) {
  const t = dr || $i;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Sc(e) {
  let t = Ze + 1, n = Ae.length;
  for (; t < n; ) {
    const r = t + n >>> 1, o = Ae[r], s = An(o);
    s < e || s === e && o.flags & 2 ? t = r + 1 : n = r;
  }
  return t;
}
function Yo(e) {
  if (!(e.flags & 1)) {
    const t = An(e), n = Ae[Ae.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= An(n) ? Ae.push(e) : Ae.splice(Sc(t), 0, e), e.flags |= 1, Ni();
  }
}
function Ni() {
  dr || (dr = $i.then(Ui));
}
function Rc(e) {
  if (!N(e))
    Rt && e.id === -1 ? Rt.splice(Zt + 1, 0, e) : e.flags & 1 || (nn.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      nn.push(e[t]);
  Ni();
}
function Ss(e, t, n = Ze + 1) {
  for (; n < Ae.length; n++) {
    const r = Ae[n];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid)
        continue;
      Ae.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function Wi(e) {
  if (nn.length) {
    const t = [...new Set(nn)].sort(
      (n, r) => An(n) - An(r)
    );
    if (nn.length = 0, Rt) {
      for (let n = 0; n < t.length; n++)
        Rt.push(t[n]);
      return;
    }
    for (Rt = t, Zt = 0; Zt < Rt.length; Zt++) {
      const n = Rt[Zt];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    Rt = null, Zt = 0;
  }
}
const An = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Ui(e) {
  try {
    for (Ze = 0; Ze < Ae.length; Ze++) {
      const t = Ae[Ze];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Hn(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Ze < Ae.length; Ze++) {
      const t = Ae[Ze];
      t && (t.flags &= -2);
    }
    Ze = -1, Ae.length = 0, Wi(), dr = null, (Ae.length || nn.length) && Ui();
  }
}
let nt = null, zi = null;
function pr(e) {
  const t = nt;
  return nt = e, zi = e && e.type.__scopeId || null, t;
}
function Cc(e, t = nt, n) {
  if (!t || e._n)
    return e;
  const r = (...o) => {
    r._d && Ds(-1);
    const s = pr(t), i = jt.length;
    let l;
    try {
      l = e(...o);
    } finally {
      for (let a = jt.length; a > i; a--) ml();
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
function Ic(e, t) {
  if (Pe) {
    let n = Pe.provides;
    const r = Pe.parent && Pe.parent.provides;
    r === n && (n = Pe.provides = Object.create(r)), n[e] = t;
  }
}
function ir(e, t, n = !1) {
  const r = xu();
  if (r || rn) {
    let o = rn ? rn._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && U(t) ? t.call(r && r.proxy) : t;
  }
}
const Mc = /* @__PURE__ */ Symbol.for("v-scx"), Ec = () => ir(Mc);
function _e(e, t, n) {
  return qi(e, t, n);
}
function qi(e, t, n = ae) {
  const { immediate: r, deep: o, flush: s, once: i } = n, l = Ie({}, n), a = t && r || !t && s !== "post";
  let f;
  if (Tn) {
    if (s === "sync") {
      const y = Ec();
      f = y.__watcherHandles || (y.__watcherHandles = []);
    } else if (!a) {
      const y = () => {
      };
      return y.stop = rt, y.resume = rt, y.pause = rt, y;
    }
  }
  const d = Pe;
  l.call = (y, M, C) => qe(y, d, M, C);
  let v = !1;
  s === "post" ? l.scheduler = (y) => {
    De(y, d && d.suspense);
  } : s !== "sync" && (v = !0, l.scheduler = (y, M) => {
    M ? y() : Yo(y);
  }), l.augmentJob = (y) => {
    t && (y.flags |= 4), v && (y.flags |= 2, d && (y.id = d.uid, y.i = d));
  };
  const b = _c(e, t, l);
  return Tn && (f ? f.push(b) : a && b()), b;
}
function Ac(e, t, n) {
  const r = this.proxy, o = ge(e) ? e.includes(".") ? Gi(r, e) : () => r[e] : e.bind(r, r);
  let s;
  U(t) ? s = t : (s = t.handler, n = t);
  const i = jn(this), l = qi(o, s.bind(r), n);
  return i(), l;
}
function Gi(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++)
      r = r[n[o]];
    return r;
  };
}
const Oc = /* @__PURE__ */ Symbol("_vte"), Ar = (e) => e.__isTeleport, lo = /* @__PURE__ */ Symbol("_leaveCb");
function Pc(e) {
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
function Yi(e) {
  if (!Jo(e))
    return Ar(e.type) && e.children ? Pc(e.children) : e;
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
function Xo(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    Xo(
      Ar(n.type) && Yi(n) || n,
      t
    );
  } else e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Xi(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Rs(e, t) {
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
  const s = r.shapeFlag & 4 ? es(r.component) : r.el, i = o ? null : s, { i: l, r: a } = e, f = t && t.r, d = l.refs === ae ? l.refs = {} : l.refs, v = l.setupState, b = /* @__PURE__ */ Q(v), y = v === ae ? vi : (C) => Rs(d, C) ? !1 : ee(b, C), M = (C, T) => !(T && Rs(d, T));
  if (f != null && f !== a) {
    if (Cs(t), ge(f))
      d[f] = null, y(f) && (v[f] = null);
    else if (/* @__PURE__ */ Ce(f)) {
      const C = t;
      M(f, C.k) && (f.value = null), C.k && (d[C.k] = null);
    }
  }
  if (U(a))
    Hn(a, l, 12, [i, d]);
  else {
    const C = ge(a), T = /* @__PURE__ */ Ce(a);
    if (C || T) {
      const F = () => {
        if (e.f) {
          const I = C ? y(a) ? v[a] : d[a] : M() || !e.k ? a.value : d[e.k];
          if (o)
            N(I) && Vo(I, s);
          else if (N(I))
            I.includes(s) || I.push(s);
          else if (C)
            d[a] = [s], y(a) && (v[a] = d[a]);
          else {
            const K = [s];
            M(a, e.k) && (a.value = K), e.k && (d[e.k] = K);
          }
        } else C ? (d[a] = i, y(a) && (v[a] = i)) : T && (M(a, e.k) && (a.value = i), e.k && (d[e.k] = i));
      };
      if (i) {
        const I = () => {
          F(), gr.delete(e);
        };
        I.id = -1, gr.set(e, I), De(I, n);
      } else
        Cs(e), F();
    }
  }
}
function Cs(e) {
  const t = gr.get(e);
  t && (t.flags |= 8, gr.delete(e));
}
Rr().requestIdleCallback;
Rr().cancelIdleCallback;
const Rn = (e) => !!e.type.__asyncLoader, Jo = (e) => e.type.__isKeepAlive;
function Tc(e, t) {
  Ji(e, "a", t);
}
function kc(e, t) {
  Ji(e, "da", t);
}
function Ji(e, t, n = Pe) {
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
      Jo(o.parent.vnode) && Dc(r, t, n, o), o = o.parent;
  }
}
function Dc(e, t, n, r) {
  const o = Or(
    t,
    e,
    r,
    !0
    /* prepend */
  );
  Qi(() => {
    Vo(r[t], o);
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
}, Fc = vt("bm"), Co = vt("m"), Hc = vt(
  "bu"
), jc = vt("u"), Zi = vt(
  "bum"
), Qi = vt("um"), Lc = vt(
  "sp"
), Kc = vt("rtg"), Vc = vt("rtc");
function Bc(e, t = Pe) {
  Or("ec", e, t);
}
const $c = /* @__PURE__ */ Symbol.for("v-ndc");
function er(e, t, n, r) {
  let o;
  const s = n, i = N(e);
  if (i || ge(e)) {
    const l = i && /* @__PURE__ */ Ft(e);
    let a = !1, f = !1;
    l && (a = !/* @__PURE__ */ $e(e), f = /* @__PURE__ */ pt(e), e = Ir(e)), o = new Array(e.length);
    for (let d = 0, v = e.length; d < v; d++)
      o[d] = t(
        a ? f ? on(ze(e[d])) : ze(e[d]) : e[d],
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
      for (let a = 0, f = l.length; a < f; a++) {
        const d = l[a];
        o[a] = t(e[d], d, a, s);
      }
    }
  else
    o = [];
  return o;
}
const Io = (e) => e ? _l(e) ? es(e) : Io(e.parent) : null, Cn = (
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
    $parent: (e) => Io(e.parent),
    $root: (e) => Io(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => tl(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Yo(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = St.bind(e.proxy)),
    $watch: (e) => Ac.bind(e)
  })
), ao = (e, t) => e !== ae && !e.__isScriptSetup && ee(e, t), Nc = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: r, data: o, props: s, accessCache: i, type: l, appContext: a } = e;
    if (t[0] !== "$") {
      const b = i[t];
      if (b !== void 0)
        switch (b) {
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
        if (ao(r, t))
          return i[t] = 1, r[t];
        if (o !== ae && ee(o, t))
          return i[t] = 2, o[t];
        if (ee(s, t))
          return i[t] = 3, s[t];
        if (n !== ae && ee(n, t))
          return i[t] = 4, n[t];
        Mo && (i[t] = 0);
      }
    }
    const f = Cn[t];
    let d, v;
    if (f)
      return t === "$attrs" && Re(e.attrs, "get", ""), f(e);
    if (
      // css module (injected by vue-loader)
      (d = l.__cssModules) && (d = d[t])
    )
      return d;
    if (n !== ae && ee(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      v = a.config.globalProperties, ee(v, t)
    )
      return v[t];
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: o, ctx: s } = e;
    return ao(o, t) ? (o[t] = n, !0) : r !== ae && ee(r, t) ? (r[t] = n, !0) : ee(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (s[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: o, props: s, type: i }
  }, l) {
    let a;
    return !!(n[l] || e !== ae && l[0] !== "$" && ee(e, l) || ao(t, l) || ee(s, l) || ee(r, l) || ee(Cn, l) || ee(o.config.globalProperties, l) || (a = i.__cssModules) && a[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : ee(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function Is(e) {
  return N(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let Mo = !0;
function Wc(e) {
  const t = tl(e), n = e.proxy, r = e.ctx;
  Mo = !1, t.beforeCreate && Ms(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: s,
    methods: i,
    watch: l,
    provide: a,
    inject: f,
    // lifecycle
    created: d,
    beforeMount: v,
    mounted: b,
    beforeUpdate: y,
    updated: M,
    activated: C,
    deactivated: T,
    beforeDestroy: F,
    beforeUnmount: I,
    destroyed: K,
    unmounted: E,
    render: $,
    renderTracked: W,
    renderTriggered: de,
    errorCaptured: D,
    serverPrefetch: j,
    // public API
    expose: G,
    inheritAttrs: pe,
    // assets
    components: se,
    directives: ve,
    filters: Te
  } = t;
  if (f && Uc(f, r, null), i)
    for (const X in i) {
      const ne = i[X];
      U(ne) && (r[X] = ne.bind(n));
    }
  if (o) {
    const X = o.call(n, n);
    re(X) && (e.data = /* @__PURE__ */ Mr(X));
  }
  if (Mo = !0, s)
    for (const X in s) {
      const ne = s[X], Fe = U(ne) ? ne.bind(n, n) : U(ne.get) ? ne.get.bind(n, n) : rt, Ge = !U(ne) && U(ne.set) ? ne.set.bind(n) : rt, Ne = Y({
        get: Fe,
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
      el(l[X], r, n, X);
  if (a) {
    const X = U(a) ? a.call(n) : a;
    Reflect.ownKeys(X).forEach((ne) => {
      Ic(ne, X[ne]);
    });
  }
  d && Ms(d, e, "c");
  function te(X, ne) {
    N(ne) ? ne.forEach((Fe) => X(Fe.bind(n))) : ne && X(ne.bind(n));
  }
  if (te(Fc, v), te(Co, b), te(Hc, y), te(jc, M), te(Tc, C), te(kc, T), te(Bc, D), te(Vc, W), te(Kc, de), te(Zi, I), te(Qi, E), te(Lc, j), N(G))
    if (G.length) {
      const X = e.exposed || (e.exposed = {});
      G.forEach((ne) => {
        Object.defineProperty(X, ne, {
          get: () => n[ne],
          set: (Fe) => n[ne] = Fe,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  $ && e.render === rt && (e.render = $), pe != null && (e.inheritAttrs = pe), se && (e.components = se), ve && (e.directives = ve), j && Xi(e);
}
function Uc(e, t, n = rt) {
  N(e) && (e = Eo(e));
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
  qe(
    N(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function el(e, t, n, r) {
  let o = r.includes(".") ? Gi(n, r) : () => n[r];
  if (ge(e)) {
    const s = t[e];
    U(s) && _e(o, s);
  } else if (U(e))
    _e(o, e.bind(n));
  else if (re(e))
    if (N(e))
      e.forEach((s) => el(s, t, n, r));
    else {
      const s = U(e.handler) ? e.handler.bind(n) : t[e.handler];
      U(s) && _e(o, s, e);
    }
}
function tl(e) {
  const t = e.type, { mixins: n, extends: r } = t, {
    mixins: o,
    optionsCache: s,
    config: { optionMergeStrategies: i }
  } = e.appContext, l = s.get(t);
  let a;
  return l ? a = l : !o.length && !n && !r ? a = t : (a = {}, o.length && o.forEach(
    (f) => hr(a, f, i, !0)
  ), hr(a, t, i)), re(t) && s.set(t, a), a;
}
function hr(e, t, n, r = !1) {
  const { mixins: o, extends: s } = t;
  s && hr(e, s, n, !0), o && o.forEach(
    (i) => hr(e, i, n, !0)
  );
  for (const i in t)
    if (!(r && i === "expose")) {
      const l = zc[i] || n && n[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const zc = {
  data: Es,
  props: As,
  emits: As,
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
  watch: Gc,
  // provide / inject
  provide: Es,
  inject: qc
};
function Es(e, t) {
  return t ? e ? function() {
    return Ie(
      U(e) ? e.call(this, this) : e,
      U(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function qc(e, t) {
  return yn(Eo(e), Eo(t));
}
function Eo(e) {
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
function As(e, t) {
  return e ? N(e) && N(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Ie(
    /* @__PURE__ */ Object.create(null),
    Is(e),
    Is(t ?? {})
  ) : t;
}
function Gc(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Ie(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = Ee(e[r], t[r]);
  return n;
}
function nl() {
  return {
    app: null,
    config: {
      isNativeTag: vi,
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
let Yc = 0;
function Xc(e, t) {
  return function(r, o = null) {
    U(r) || (r = Ie({}, r)), o != null && !re(o) && (o = null);
    const s = nl(), i = /* @__PURE__ */ new WeakSet(), l = [];
    let a = !1;
    const f = s.app = {
      _uid: Yc++,
      _component: r,
      _props: o,
      _container: null,
      _context: s,
      _instance: null,
      version: Eu,
      get config() {
        return s.config;
      },
      set config(d) {
      },
      use(d, ...v) {
        return i.has(d) || (d && U(d.install) ? (i.add(d), d.install(f, ...v)) : U(d) && (i.add(d), d(f, ...v))), f;
      },
      mixin(d) {
        return s.mixins.includes(d) || s.mixins.push(d), f;
      },
      component(d, v) {
        return v ? (s.components[d] = v, f) : s.components[d];
      },
      directive(d, v) {
        return v ? (s.directives[d] = v, f) : s.directives[d];
      },
      mount(d, v, b) {
        if (!a) {
          const y = f._ceVNode || ut(r, o);
          return y.appContext = s, b === !0 ? b = "svg" : b === !1 && (b = void 0), e(y, d, b), a = !0, f._container = d, d.__vue_app__ = f, es(y.component);
        }
      },
      onUnmount(d) {
        l.push(d);
      },
      unmount() {
        a && (qe(
          l,
          f._instance,
          16
        ), e(null, f._container), delete f._container.__vue_app__);
      },
      provide(d, v) {
        return s.provides[d] = v, f;
      },
      runWithContext(d) {
        const v = rn;
        rn = f;
        try {
          return d();
        } finally {
          rn = v;
        }
      }
    };
    return f;
  };
}
let rn = null;
const Jc = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${We(t)}Modifiers`] || e[`${$t(t)}Modifiers`];
function Zc(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || ae;
  let o = n;
  const s = t.startsWith("update:"), i = s && Jc(r, t.slice(7));
  i && (i.trim && (o = n.map((d) => ge(d) ? d.trim() : d)), i.number && (o = o.map(Va)));
  let l, a = r[l = to(t)] || // also try camelCase event handler (#2249)
  r[l = to(We(t))];
  !a && s && (a = r[l = to($t(t))]), a && qe(
    a,
    e,
    6,
    o
  );
  const f = r[l + "Once"];
  if (f) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, qe(
      f,
      e,
      6,
      o
    );
  }
}
const Qc = /* @__PURE__ */ new WeakMap();
function rl(e, t, n = !1) {
  const r = n ? Qc : t.emitsCache, o = r.get(e);
  if (o !== void 0)
    return o;
  const s = e.emits;
  let i = {}, l = !1;
  if (!U(e)) {
    const a = (f) => {
      const d = rl(f, t, !0);
      d && (l = !0, Ie(i, d));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !s && !l ? (re(e) && r.set(e, null), null) : (N(s) ? s.forEach((a) => i[a] = null) : Ie(i, s), re(e) && r.set(e, i), i);
}
function Pr(e, t) {
  return !e || !_r(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), ee(e, t[0].toLowerCase() + t.slice(1)) || ee(e, $t(t)) || ee(e, t));
}
function Os(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: o,
    propsOptions: [s],
    slots: i,
    attrs: l,
    emit: a,
    render: f,
    renderCache: d,
    props: v,
    data: b,
    setupState: y,
    ctx: M,
    inheritAttrs: C
  } = e, T = pr(e);
  let F, I;
  try {
    if (n.shapeFlag & 4) {
      const E = o || r, $ = E;
      F = et(
        f.call(
          $,
          E,
          d,
          v,
          y,
          b,
          M
        )
      ), I = l;
    } else {
      const E = t;
      F = et(
        E.length > 1 ? E(
          v,
          { attrs: l, slots: i, emit: a }
        ) : E(
          v,
          null
        )
      ), I = t.props ? l : eu(l);
    }
  } catch (E) {
    jt.length = 0, Er(E, e, 1), F = ut(gt);
  }
  let K = F;
  if (I && C !== !1) {
    const E = Object.keys(I), { shapeFlag: $ } = K;
    E.length && $ & 7 && (s && E.some(xr) && (I = tu(
      I,
      s
    )), K = sn(K, I, !1, !0));
  }
  if (n.dirs && (K = sn(K, null, !1, !0), K.dirs = K.dirs ? K.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const E = Ar(K.type) && Yi(K) || K;
    Xo(E, n.transition);
  }
  return F = K, pr(T), F;
}
const eu = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || _r(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, tu = (e, t) => {
  const n = {};
  for (const r in e)
    (!xr(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
  return n;
};
function nu(e, t, n) {
  const { props: r, children: o, component: s } = e, { props: i, children: l, patchFlag: a } = t, f = s.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return r ? Ps(r, i, f) : !!i;
    if (a & 8) {
      const d = t.dynamicProps;
      for (let v = 0; v < d.length; v++) {
        const b = d[v];
        if (ol(i, r, b) && !Pr(f, b))
          return !0;
      }
    }
  } else
    return (o || l) && (!l || !l.$stable) ? !0 : r === i ? !1 : r ? i ? Ps(r, i, f) : !0 : !!i;
  return !1;
}
function Ps(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < r.length; o++) {
    const s = r[o];
    if (ol(t, e, s) && !Pr(n, s))
      return !0;
  }
  return !1;
}
function ol(e, t, n) {
  const r = e[n], o = t[n];
  return n === "style" && re(r) && re(o) ? !Cr(r, o) : r !== o;
}
function ru({ vnode: e, parent: t, suspense: n }, r) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.suspense.vnode.el = o.el = r, e = o), o === e)
      (e = t.vnode).el = r, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = r);
}
const sl = {}, il = () => Object.create(sl), ll = (e) => Object.getPrototypeOf(e) === sl;
function ou(e, t, n, r = !1) {
  const o = {}, s = il();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), al(e, t, o, s);
  for (const i in e.propsOptions[0])
    i in o || (o[i] = void 0);
  n ? e.props = r ? o : /* @__PURE__ */ pc(o) : e.type.props ? e.props = o : e.props = s, e.attrs = s;
}
function su(e, t, n, r) {
  const {
    props: o,
    attrs: s,
    vnode: { patchFlag: i }
  } = e, l = /* @__PURE__ */ Q(o), [a] = e.propsOptions;
  let f = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (r || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const d = e.vnode.dynamicProps;
      for (let v = 0; v < d.length; v++) {
        let b = d[v];
        if (Pr(e.emitsOptions, b))
          continue;
        const y = t[b];
        if (a)
          if (ee(s, b))
            y !== s[b] && (s[b] = y, f = !0);
          else {
            const M = We(b);
            o[M] = Ao(
              a,
              l,
              M,
              y,
              e,
              !1
            );
          }
        else
          y !== s[b] && (s[b] = y, f = !0);
      }
    }
  } else {
    al(e, t, o, s) && (f = !0);
    let d;
    for (const v in l)
      (!t || // for camelCase
      !ee(t, v) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((d = $t(v)) === v || !ee(t, d))) && (a ? n && // for camelCase
      (n[v] !== void 0 || // for kebab-case
      n[d] !== void 0) && (o[v] = Ao(
        a,
        l,
        v,
        void 0,
        e,
        !0
      )) : delete o[v]);
    if (s !== l)
      for (const v in s)
        (!t || !ee(t, v)) && (delete s[v], f = !0);
  }
  f && ct(e.attrs, "set", "");
}
function al(e, t, n, r) {
  const [o, s] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let a in t) {
      if (bn(a))
        continue;
      const f = t[a];
      let d;
      o && ee(o, d = We(a)) ? !s || !s.includes(d) ? n[d] = f : (l || (l = {}))[d] = f : Pr(e.emitsOptions, a) || (!(a in r) || f !== r[a]) && (r[a] = f, i = !0);
    }
  if (s) {
    const a = /* @__PURE__ */ Q(n), f = l || ae;
    for (let d = 0; d < s.length; d++) {
      const v = s[d];
      n[v] = Ao(
        o,
        a,
        v,
        f[v],
        e,
        !ee(f, v)
      );
    }
  }
  return i;
}
function Ao(e, t, n, r, o, s) {
  const i = e[n];
  if (i != null) {
    const l = ee(i, "default");
    if (l && r === void 0) {
      const a = i.default;
      if (i.type !== Function && !i.skipFactory && U(a)) {
        const { propsDefaults: f } = o;
        if (n in f)
          r = f[n];
        else {
          const d = jn(o);
          r = f[n] = a.call(
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
const iu = /* @__PURE__ */ new WeakMap();
function cl(e, t, n = !1) {
  const r = n ? iu : t.propsCache, o = r.get(e);
  if (o)
    return o;
  const s = e.props, i = {}, l = [];
  let a = !1;
  if (!U(e)) {
    const d = (v) => {
      a = !0;
      const [b, y] = cl(v, t, !0);
      Ie(i, b), y && l.push(...y);
    };
    !n && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  if (!s && !a)
    return re(e) && r.set(e, en), en;
  if (N(s))
    for (let d = 0; d < s.length; d++) {
      const v = We(s[d]);
      Ts(v) && (i[v] = ae);
    }
  else if (s)
    for (const d in s) {
      const v = We(d);
      if (Ts(v)) {
        const b = s[d], y = i[v] = N(b) || U(b) ? { type: b } : Ie({}, b), M = y.type;
        let C = !1, T = !0;
        if (N(M))
          for (let F = 0; F < M.length; ++F) {
            const I = M[F], K = U(I) && I.name;
            if (K === "Boolean") {
              C = !0;
              break;
            } else K === "String" && (T = !1);
          }
        else
          C = U(M) && M.name === "Boolean";
        y[
          0
          /* shouldCast */
        ] = C, y[
          1
          /* shouldCastTrue */
        ] = T, (C || ee(y, "default")) && l.push(v);
      }
    }
  const f = [i, l];
  return re(e) && r.set(e, f), f;
}
function Ts(e) {
  return e[0] !== "$" && !bn(e);
}
const Zo = (e) => e === "_" || e === "_ctx" || e === "$stable", Qo = (e) => N(e) ? e.map(et) : [et(e)], lu = (e, t, n) => {
  if (t._n)
    return t;
  const r = Cc((...o) => Qo(t(...o)), n);
  return r._c = !1, r;
}, ul = (e, t, n) => {
  const r = e._ctx;
  for (const o in e) {
    if (Zo(o)) continue;
    const s = e[o];
    if (U(s))
      t[o] = lu(o, s, r);
    else if (s != null) {
      const i = Qo(s);
      t[o] = () => i;
    }
  }
}, fl = (e, t) => {
  const n = Qo(t);
  e.slots.default = () => n;
}, dl = (e, t, n) => {
  for (const r in t)
    (n || !Zo(r)) && (e[r] = t[r]);
}, au = (e, t, n) => {
  const r = e.slots = il();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (dl(r, t, n), n && _i(r, "_", o, !0)) : ul(t, r);
  } else t && fl(e, t);
}, cu = (e, t, n) => {
  const { vnode: r, slots: o } = e;
  let s = !0, i = ae;
  if (r.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? s = !1 : dl(o, t, n) : (s = !t.$stable, ul(t, o)), i = t;
  } else t && (fl(e, t), i = { default: 1 });
  if (s)
    for (const l in o)
      !Zo(l) && i[l] == null && delete o[l];
}, De = gu;
function uu(e) {
  return fu(e);
}
function fu(e, t) {
  const n = Rr();
  n.__VUE__ = !0;
  const {
    insert: r,
    remove: o,
    patchProp: s,
    createElement: i,
    createText: l,
    createComment: a,
    setText: f,
    setElementText: d,
    parentNode: v,
    nextSibling: b,
    setScopeId: y = rt,
    insertStaticContent: M
  } = e, C = (p, g, m, R = null, S = null, _ = null, P = void 0, O = null, A = !!g.dynamicChildren) => {
    if (p === g)
      return;
    p && !vn(p, g) && (R = zt(p), Le(p, S, _, !0), p = null), g.patchFlag === -2 && (A = !1, g.dynamicChildren = null);
    const { type: x, ref: V, shapeFlag: k } = g;
    switch (x) {
      case Tr:
        T(p, g, m, R);
        break;
      case gt:
        F(p, g, m, R);
        break;
      case uo:
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
        k & 1 ? $(
          p,
          g,
          m,
          R,
          S,
          _,
          P,
          O,
          A
        ) : k & 6 ? ve(
          p,
          g,
          m,
          R,
          S,
          _,
          P,
          O,
          A
        ) : (k & 64 || k & 128) && x.process(
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
    V != null && S ? Sn(V, p && p.ref, _, g || p, !g) : V == null && p && p.ref != null && Sn(p.ref, null, _, p, !0);
  }, T = (p, g, m, R) => {
    if (p == null)
      r(
        g.el = l(g.children),
        m,
        R
      );
    else {
      const S = g.el = p.el;
      g.children !== p.children && f(S, g.children);
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
  }, K = ({ el: p, anchor: g }, m, R) => {
    let S;
    for (; p && p !== g; )
      S = b(p), r(p, m, R), p = S;
    r(g, m, R);
  }, E = ({ el: p, anchor: g }) => {
    let m;
    for (; p && p !== g; )
      m = b(p), o(p), p = m;
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
        x && x._beginPatch(), j(
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
    const { props: V, shapeFlag: k, transition: L, dirs: B } = p;
    if (A = p.el = i(
      p.type,
      _,
      V && V.is,
      V
    ), k & 8 ? d(A, p.children) : k & 16 && D(
      p.children,
      A,
      null,
      R,
      S,
      co(p, _),
      P,
      O
    ), B && At(p, null, R, "created"), de(A, p, p.scopeId, P, R), V) {
      for (const J in V)
        J !== "value" && !bn(J) && s(A, J, null, V[J], _, R);
      "value" in V && s(A, "value", null, V.value, _), (x = V.onVnodeBeforeMount) && Je(x, R, p);
    }
    B && At(p, null, R, "beforeMount");
    const q = du(S, L);
    q && L.beforeEnter(A), r(A, g, m), ((x = V && V.onVnodeMounted) || q || B) && De(() => {
      try {
        x && Je(x, R, p), q && L.enter(A), B && At(p, null, R, "mounted");
      } finally {
      }
    }, S);
  }, de = (p, g, m, R, S) => {
    if (m && y(p, m), R)
      for (let _ = 0; _ < R.length; _++)
        y(p, R[_]);
    if (S) {
      let _ = S.subTree;
      if (g === _ || vl(_.type) && (_.ssContent === g || _.ssFallback === g)) {
        const P = S.vnode;
        de(
          p,
          P,
          P.scopeId,
          P.slotScopeIds,
          S.parent
        );
      }
    }
  }, D = (p, g, m, R, S, _, P, O, A = 0) => {
    for (let x = A; x < p.length; x++) {
      const V = p[x] = O ? at(p[x]) : et(p[x]);
      C(
        null,
        V,
        g,
        m,
        R,
        S,
        _,
        P,
        O
      );
    }
  }, j = (p, g, m, R, S, _, P) => {
    const O = g.el = p.el;
    let { patchFlag: A, dynamicChildren: x, dirs: V } = g;
    A |= p.patchFlag & 16;
    const k = p.props || ae, L = g.props || ae;
    let B;
    if (m && Ot(m, !1), (B = L.onVnodeBeforeUpdate) && Je(B, m, g, p), V && At(g, p, m, "beforeUpdate"), m && Ot(m, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    x && (!p.dynamicChildren || p.dynamicChildren.length !== x.length) && (A = 0, P = !1, x = null), (k.innerHTML && L.innerHTML == null || k.textContent && L.textContent == null) && d(O, ""), x ? G(
      p.dynamicChildren,
      x,
      O,
      m,
      R,
      co(g, S),
      _
    ) : P || ne(
      p,
      g,
      O,
      null,
      m,
      R,
      co(g, S),
      _,
      !1
    ), A > 0) {
      if (A & 16)
        pe(O, k, L, m, S);
      else if (A & 2 && k.class !== L.class && s(O, "class", null, L.class, S), A & 4 && s(O, "style", k.style, L.style, S), A & 8) {
        const q = g.dynamicProps;
        for (let J = 0; J < q.length; J++) {
          const Z = q[J], ce = k[Z], me = L[Z];
          (me !== ce || Z === "value") && s(O, Z, ce, me, S, m);
        }
      }
      A & 1 && p.children !== g.children && d(O, g.children);
    } else !P && x == null && pe(O, k, L, m, S);
    ((B = L.onVnodeUpdated) || V) && De(() => {
      B && Je(B, m, g, p), V && At(g, p, m, "updated");
    }, R);
  }, G = (p, g, m, R, S, _, P) => {
    for (let O = 0; O < g.length; O++) {
      const A = p[O], x = g[O], V = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        A.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (A.type === Oe || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !vn(A, x) || // - In the case of a component, it could contain anything.
        A.shapeFlag & 198) ? v(A.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          m
        )
      );
      C(
        A,
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
  }, pe = (p, g, m, R, S) => {
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
    const x = g.el = p ? p.el : l(""), V = g.anchor = p ? p.anchor : l("");
    let { patchFlag: k, dynamicChildren: L, slotScopeIds: B } = g;
    B && (O = O ? O.concat(B) : B), p == null ? (r(x, m, R), r(V, m, R), D(
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
      O,
      A
    )) : k > 0 && k & 64 && L && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    p.dynamicChildren && p.dynamicChildren.length === L.length ? (G(
      p.dynamicChildren,
      L,
      m,
      S,
      _,
      P,
      O
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (g.key != null || S && g === S.subTree) && pl(
      p,
      g,
      !0
      /* shallow */
    )) : ne(
      p,
      g,
      m,
      V,
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
    const O = p.component = _u(
      p,
      R,
      S
    );
    if (Jo(p) && (O.ctx.renderer = Ye), Su(O, !1, P), O.asyncDep) {
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
    if (nu(p, g, m))
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
        let { next: k, bu: L, u: B, parent: q, vnode: J } = p;
        {
          const He = gl(p);
          if (He) {
            k && (k.el = J.el, X(p, k, P)), He.asyncDep.then(() => {
              De(() => {
                p.isUnmounted || x();
              }, S);
            });
            return;
          }
        }
        let Z = k, ce;
        Ot(p, !1), k ? (k.el = J.el, X(p, k, P)) : k = J, L && no(L), (ce = k.props && k.props.onVnodeBeforeUpdate) && Je(ce, q, k, J), Ot(p, !0);
        const me = Os(p), Ve = p.subTree;
        p.subTree = me, C(
          Ve,
          me,
          // parent may have changed if it's in a teleport
          v(Ve.el),
          // anchor may have changed if it's in a fragment
          zt(Ve),
          p,
          S,
          _
        ), k.el = me.el, Z === null && ru(p, me.el), B && De(B, S), (ce = k.props && k.props.onVnodeUpdated) && De(
          () => Je(ce, q, k, J),
          S
        );
      } else {
        let k;
        const { el: L, props: B } = g, { bm: q, m: J, parent: Z, root: ce, type: me } = p, Ve = Rn(g);
        Ot(p, !1), q && no(q), !Ve && (k = B && B.onVnodeBeforeMount) && Je(k, Z, g), Ot(p, !0);
        {
          ce.ce && ce.ce._hasShadowRoot() && ce.ce._injectChildStyle(
            me,
            p.parent ? p.parent.type : void 0
          );
          const He = p.subTree = Os(p);
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
        if (J && De(J, S), !Ve && (k = B && B.onVnodeMounted)) {
          const He = g;
          De(
            () => Je(k, Z, He),
            S
          );
        }
        (g.shapeFlag & 256 || Z && Rn(Z.vnode) && Z.vnode.shapeFlag & 256) && p.a && De(p.a, S), p.isMounted = !0, g = m = R = null;
      }
    };
    p.scope.on();
    const A = p.effect = new Ii(O);
    p.scope.off();
    const x = p.update = A.run.bind(A), V = p.job = A.runIfDirty.bind(A);
    V.i = p, V.id = p.uid, A.scheduler = () => Yo(V), Ot(p, !0), x();
  }, X = (p, g, m) => {
    g.component = p;
    const R = p.vnode.props;
    p.vnode = g, p.next = null, su(p, g.props, R, m), cu(p, g.children, m), ft(), Ss(p), dt();
  }, ne = (p, g, m, R, S, _, P, O, A = !1) => {
    const x = p && p.children, V = p ? p.shapeFlag : 0, k = g.children, { patchFlag: L, shapeFlag: B } = g;
    if (L > 0) {
      if (L & 128) {
        Ge(
          x,
          k,
          m,
          R,
          S,
          _,
          P,
          O,
          A
        );
        return;
      } else if (L & 256) {
        Fe(
          x,
          k,
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
    B & 8 ? (V & 16 && Ke(x, S, _), k !== x && d(m, k)) : V & 16 ? B & 16 ? Ge(
      x,
      k,
      m,
      R,
      S,
      _,
      P,
      O,
      A
    ) : Ke(x, S, _, !0) : (V & 8 && d(m, ""), B & 16 && D(
      k,
      m,
      R,
      S,
      _,
      P,
      O,
      A
    ));
  }, Fe = (p, g, m, R, S, _, P, O, A) => {
    p = p || en, g = g || en;
    const x = p.length, V = g.length, k = Math.min(x, V);
    let L;
    for (L = 0; L < k; L++) {
      const B = g[L] = A ? at(g[L]) : et(g[L]);
      C(
        p[L],
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
    x > V ? Ke(
      p,
      S,
      _,
      !0,
      !1,
      k
    ) : D(
      g,
      m,
      R,
      S,
      _,
      P,
      O,
      A,
      k
    );
  }, Ge = (p, g, m, R, S, _, P, O, A) => {
    let x = 0;
    const V = g.length;
    let k = p.length - 1, L = V - 1;
    for (; x <= k && x <= L; ) {
      const B = p[x], q = g[x] = A ? at(g[x]) : et(g[x]);
      if (vn(B, q))
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
    for (; x <= k && x <= L; ) {
      const B = p[k], q = g[L] = A ? at(g[L]) : et(g[L]);
      if (vn(B, q))
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
      k--, L--;
    }
    if (x > k) {
      if (x <= L) {
        const B = L + 1, q = B < V ? g[B].el : R;
        for (; x <= L; )
          C(
            null,
            g[x] = A ? at(g[x]) : et(g[x]),
            m,
            q,
            S,
            _,
            P,
            O,
            A
          ), x++;
      }
    } else if (x > L)
      for (; x <= k; )
        Le(p[x], S, _, !0), x++;
    else {
      const B = x, q = x, J = /* @__PURE__ */ new Map();
      for (x = q; x <= L; x++) {
        const we = g[x] = A ? at(g[x]) : et(g[x]);
        we.key != null && J.set(we.key, x);
      }
      let Z, ce = 0;
      const me = L - q + 1;
      let Ve = !1, He = 0;
      const bt = new Array(me);
      for (x = 0; x < me; x++) bt[x] = 0;
      for (x = B; x <= k; x++) {
        const we = p[x];
        if (ce >= me) {
          Le(we, S, _, !0);
          continue;
        }
        let ue;
        if (we.key != null)
          ue = J.get(we.key);
        else
          for (Z = q; Z <= L; Z++)
            if (bt[Z - q] === 0 && vn(we, g[Z])) {
              ue = Z;
              break;
            }
        ue === void 0 ? Le(we, S, _, !0) : (bt[ue - q] = x + 1, ue >= He ? He = ue : Ve = !0, C(
          we,
          g[ue],
          m,
          null,
          S,
          _,
          P,
          O,
          A
        ), ce++);
      }
      const Et = Ve ? pu(bt) : en;
      for (Z = Et.length - 1, x = me - 1; x >= 0; x--) {
        const we = q + x, ue = g[we], Bn = g[we + 1], un = we + 1 < V ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Bn.el || hl(Bn)
        ) : R;
        bt[x] === 0 ? C(
          null,
          ue,
          m,
          un,
          S,
          _,
          P,
          O,
          A
        ) : Ve && (Z < 0 || x !== Et[Z] ? Ne(ue, m, un, 2) : Z--);
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
      for (let k = 0; k < A.length; k++)
        Ne(A[k], g, m, R);
      r(p.anchor, g, m);
      return;
    }
    if (P === uo) {
      K(p, g, m);
      return;
    }
    if (R !== 2 && x & 1 && O)
      if (R === 0)
        O.persisted && !_[lo] ? r(_, g, m) : (O.beforeEnter(_), r(_, g, m), De(() => O.enter(_), S));
      else {
        const { leave: k, delayLeave: L, afterLeave: B } = O, q = () => {
          p.ctx.isUnmounted ? o(_) : r(_, g, m);
        }, J = () => {
          const Z = _._isLeaving || !!_[lo];
          _._isLeaving && _[lo](
            !0
            /* cancelled */
          ), O.persisted && !Z ? q() : k(_, () => {
            q(), B && B();
          });
        };
        L ? L(_, q, J) : J();
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
      shapeFlag: V,
      patchFlag: k,
      dirs: L,
      cacheIndex: B,
      memo: q
    } = p;
    if (k === -2 && (S = !1), O != null && (ft(), Sn(O, null, m, p, !0), dt()), B != null && (g.renderCache[B] = void 0), V & 256) {
      g.ctx.deactivate(p);
      return;
    }
    const J = V & 1 && L, Z = !Rn(p);
    let ce;
    if (Z && (ce = P && P.onVnodeBeforeUnmount) && Je(ce, g, p), V & 6)
      Ut(p.component, m, R);
    else {
      if (V & 128) {
        p.suspense.unmount(m, R);
        return;
      }
      J && At(p, null, g, "beforeUnmount"), V & 64 ? p.type.remove(
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
      (_ !== Oe || k > 0 && k & 64) ? Ke(
        x,
        g,
        m,
        !1,
        !0
      ) : (_ === Oe && k & 384 || !S && V & 16) && Ke(A, g, m), R && mt(p);
    }
    const me = q != null && B == null;
    (Z && (ce = P && P.onVnodeUnmounted) || J || me) && De(() => {
      ce && Je(ce, g, p), J && At(p, null, g, "unmounted"), me && (p.el = null);
    }, m);
  }, mt = (p) => {
    const { type: g, el: m, anchor: R, transition: S } = p;
    if (g === Oe) {
      yt(m, R);
      return;
    }
    if (g === uo) {
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
      m = b(p), o(p), p = m;
    o(g);
  }, Ut = (p, g, m) => {
    const { bum: R, scope: S, job: _, subTree: P, um: O, m: A, a: x } = p;
    ks(A), ks(x), R && no(R), S.stop(), _ && (_.flags |= 8, Le(P, p, g, m)), O && De(O, g), De(() => {
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
    const g = b(p.anchor || p.el), m = g && g[Oc];
    return m ? b(m) : g;
  };
  let wt = !1;
  const ke = (p, g, m) => {
    let R;
    p == null ? g._vnode && (Le(g._vnode, null, null, !0), R = g._vnode.component) : C(
      g._vnode || null,
      p,
      g,
      null,
      null,
      null,
      m
    ), g._vnode = p, wt || (wt = !0, Ss(R), Wi(), wt = !1);
  }, Ye = {
    p: C,
    um: Le,
    m: Ne,
    r: mt,
    mt: Te,
    mc: D,
    pc: ne,
    pbc: G,
    n: zt,
    o: e
  };
  return {
    render: ke,
    hydrate: void 0,
    createApp: Xc(ke)
  };
}
function co({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Ot({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function du(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function pl(e, t, n = !1) {
  const r = e.children, o = t.children;
  if (N(r) && N(o))
    for (let s = 0; s < r.length; s++) {
      const i = r[s];
      let l = o[s];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = o[s] = at(o[s]), l.el = i.el), !n && l.patchFlag !== -2 && pl(i, l)), l.type === Tr && (l.patchFlag === -1 && (l = o[s] = at(l)), l.el = i.el), l.type === gt && !l.el && (l.el = i.el);
    }
}
function pu(e) {
  const t = e.slice(), n = [0];
  let r, o, s, i, l;
  const a = e.length;
  for (r = 0; r < a; r++) {
    const f = e[r];
    if (f !== 0) {
      if (o = n[n.length - 1], e[o] < f) {
        t[r] = o, n.push(r);
        continue;
      }
      for (s = 0, i = n.length - 1; s < i; )
        l = s + i >> 1, e[n[l]] < f ? s = l + 1 : i = l;
      f < e[n[s]] && (s > 0 && (t[r] = n[s - 1]), n[s] = r);
    }
  }
  for (s = n.length, i = n[s - 1]; s-- > 0; )
    n[s] = i, i = t[i];
  return n;
}
function gl(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : gl(t);
}
function ks(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function hl(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? hl(t.subTree) : null;
}
const vl = (e) => e.__isSuspense;
function gu(e, t) {
  t && t.pendingBranch ? N(e) ? t.effects.push(...e) : t.effects.push(e) : Rc(e);
}
const Oe = /* @__PURE__ */ Symbol.for("v-fgt"), Tr = /* @__PURE__ */ Symbol.for("v-txt"), gt = /* @__PURE__ */ Symbol.for("v-cmt"), uo = /* @__PURE__ */ Symbol.for("v-stc"), jt = [];
let je = null;
function ie(e = !1) {
  jt.push(je = e ? null : []);
}
function ml() {
  jt.pop(), je = jt[jt.length - 1] || null;
}
let On = 1;
function Ds(e, t = !1) {
  On += e, e < 0 && je && t && (je.hasOnce = !0);
}
function yl(e) {
  return e.dynamicChildren = On > 0 ? je || en : null, ml(), On > 0 && je && je.push(e), e;
}
function fe(e, t, n, r, o, s) {
  return yl(
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
function hu(e, t, n, r, o) {
  return yl(
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
function wl(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function vn(e, t) {
  return e.type === t.type && e.key === t.key;
}
const bl = ({ key: e }) => e ?? null, lr = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? ge(e) || /* @__PURE__ */ Ce(e) || U(e) ? { i: nt, r: e, k: t, f: !!n } : e : null);
function Se(e, t = null, n = null, r = 0, o = null, s = e === Oe ? 0 : 1, i = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && bl(t),
    ref: t && lr(t),
    scopeId: zi,
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
    ctx: nt
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
const ut = vu;
function vu(e, t = null, n = null, r = 0, o = null, s = !1) {
  if ((!e || e === $c) && (e = gt), wl(e)) {
    const l = sn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && vr(l, n), On > 0 && !s && je && (l.shapeFlag & 6 ? je[je.indexOf(e)] = l : je.push(l)), l.patchFlag = -2, l;
  }
  if (Mu(e) && (e = e.__vccOpts), t) {
    t = mu(t);
    let { class: l, style: a } = t;
    l && !ge(l) && (t.class = kt(l)), re(a) && (/* @__PURE__ */ Go(a) && !N(a) && (a = Ie({}, a)), t.style = tn(a));
  }
  const i = ge(e) ? 1 : vl(e) ? 128 : Ar(e) ? 64 : re(e) ? 4 : U(e) ? 2 : 0;
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
function mu(e) {
  return e ? /* @__PURE__ */ Go(e) || ll(e) ? Ie({}, e) : e : null;
}
function sn(e, t, n = !1, r = !1) {
  const { props: o, ref: s, patchFlag: i, children: l, transition: a } = e, f = t ? yu(o || {}, t) : o, d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && bl(f),
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
    ssContent: e.ssContent && sn(e.ssContent),
    ssFallback: e.ssFallback && sn(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return a && r && Xo(
    d,
    a.clone(d)
  ), d;
}
function Oo(e = " ", t = 0) {
  return ut(Tr, null, e, t);
}
function Pt(e = "", t = !1) {
  return t ? (ie(), hu(gt, null, e)) : ut(gt, null, e);
}
function et(e) {
  return e == null || typeof e == "boolean" ? ut(gt) : N(e) ? ut(
    Oe,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : wl(e) ? at(e) : ut(Tr, null, String(e));
}
function at(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : sn(e);
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
      !o && !ll(t) ? t._ctx = nt : o === 3 && nt && (nt.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (U(t)) {
    if (r & 65) {
      vr(e, { default: t });
      return;
    }
    t = { default: t, _ctx: nt }, n = 32;
  } else
    t = String(t), r & 64 ? (n = 16, t = [Oo(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function yu(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === "class")
        t.class !== r.class && (t.class = kt([t.class, r.class]));
      else if (o === "style")
        t.style = tn([t.style, r.style]);
      else if (_r(o)) {
        const s = t[o], i = r[o];
        i && s !== i && !(N(s) && s.includes(i)) ? t[o] = s ? [].concat(s, i) : i : i == null && s == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !xr(o) && (t[o] = i);
      } else o !== "" && (t[o] = r[o]);
  }
  return t;
}
function Je(e, t, n, r = null) {
  qe(e, t, 7, [
    n,
    r
  ]);
}
const wu = nl();
let bu = 0;
function _u(e, t, n) {
  const r = e.type, o = (t ? t.appContext : e.appContext) || wu, s = {
    uid: bu++,
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
    scope: new Ga(
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
    propsOptions: cl(r, o),
    emitsOptions: rl(r, o),
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
  return s.ctx = { _: s }, s.root = t ? t.root : s, s.emit = Zc.bind(null, s), e.ce && e.ce(s), s;
}
let Pe = null;
const xu = () => Pe || nt;
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
}, Fs = () => {
  Pe && Pe.scope.off(), mr(null);
};
function _l(e) {
  return e.vnode.shapeFlag & 4;
}
let Tn = !1;
function Su(e, t = !1, n = !1) {
  t && Pn(t);
  const { props: r, children: o } = e.vnode, s = _l(e);
  ou(e, r, s, t), au(e, o, n || t);
  const i = s ? Ru(e, t) : void 0;
  return t && Pn(!1), i;
}
function Ru(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Nc);
  const { setup: r } = n;
  if (r) {
    ft();
    const o = e.setupContext = r.length > 1 ? Iu(e) : null, s = jn(e), i = Hn(
      r,
      e,
      0,
      [
        e.props,
        o
      ]
    ), l = mi(i);
    if (dt(), s(), (l || e.sp) && !Rn(e) && Xi(e), l) {
      if (i.then(Fs, Fs), t)
        return i.then((a) => {
          Pn(!0);
          try {
            Hs(e, a, t);
          } finally {
            Pn(!1);
          }
        }).catch((a) => {
          Er(a, e, 0);
        });
      e.asyncDep = i;
    } else
      Hs(e, i);
  } else
    xl(e);
}
function Hs(e, t, n) {
  U(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : re(t) && (e.setupState = Bi(t)), xl(e);
}
function xl(e, t, n) {
  const r = e.type;
  e.render || (e.render = r.render || rt);
  {
    const o = jn(e);
    ft();
    try {
      Wc(e);
    } finally {
      dt(), o();
    }
  }
}
const Cu = {
  get(e, t) {
    return Re(e, "get", ""), e[t];
  }
};
function Iu(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Cu),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function es(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Bi(gc(e.exposed)), {
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
function Mu(e) {
  return U(e) && "__vccOpts" in e;
}
const Y = (e, t) => /* @__PURE__ */ wc(e, t, Tn), Eu = "3.5.42";
/**
* @vue/runtime-dom v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Po;
const js = typeof window < "u" && window.trustedTypes;
if (js)
  try {
    Po = /* @__PURE__ */ js.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Sl = Po ? (e) => Po.createHTML(e) : (e) => e, Au = "http://www.w3.org/2000/svg", Ou = "http://www.w3.org/1998/Math/MathML", lt = typeof document < "u" ? document : null, Ls = lt && /* @__PURE__ */ lt.createElement("template"), Pu = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const o = t === "svg" ? lt.createElementNS(Au, e) : t === "mathml" ? lt.createElementNS(Ou, e) : n ? lt.createElement(e, { is: n }) : lt.createElement(e);
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
      Ls.innerHTML = Sl(
        r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e
      );
      const l = Ls.content;
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
}, Tu = /* @__PURE__ */ Symbol("_vtc");
function ku(e, t, n) {
  const r = e[Tu];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Ks = /* @__PURE__ */ Symbol("_vod"), Du = /* @__PURE__ */ Symbol("_vsh"), Fu = /* @__PURE__ */ Symbol(""), Hu = /(?:^|;)\s*display\s*:/;
function ju(e, t, n) {
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
      l != null ? Ku(
        e,
        i,
        !ge(t) && t ? t[i] : void 0,
        l
      ) || wn(r, i, l) : wn(r, i, "");
    }
  } else if (o) {
    if (t !== n) {
      const i = r[Fu];
      i && (n += ";" + i), r.cssText = n, s = Hu.test(n);
    }
  } else t && e.removeAttribute("style");
  Ks in e && (e[Ks] = s ? r.display : "", e[Du] && (r.display = "none"));
}
const tr = /\s*!important$/;
function wn(e, t, n) {
  if (N(n))
    n.forEach((r) => wn(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--"))
    tr.test(n) ? e.setProperty(t, n.replace(tr, ""), "important") : e.setProperty(t, n);
  else {
    const r = Lu(e, t);
    tr.test(n) ? e.setProperty(
      $t(r),
      n.replace(tr, ""),
      "important"
    ) : e[r] = n;
  }
}
const Vs = ["Webkit", "Moz", "ms"], fo = {};
function Lu(e, t) {
  const n = fo[t];
  if (n)
    return n;
  let r = We(t);
  if (r !== "filter" && r in e)
    return fo[t] = r;
  r = bi(r);
  for (let o = 0; o < Vs.length; o++) {
    const s = Vs[o] + r;
    if (s in e)
      return fo[t] = s;
  }
  return t;
}
function Ku(e, t, n, r) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && ge(r) && n === r;
}
const Bs = "http://www.w3.org/1999/xlink";
function $s(e, t, n, r, o, s = za(t)) {
  r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Bs, t.slice(6, t.length)) : e.setAttributeNS(Bs, t, n) : n == null || s && !xi(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    s ? "" : ot(n) ? String(n) : n
  );
}
function Ns(e, t, n, r, o) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Sl(n) : n);
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
    l === "boolean" ? n = xi(n) : n == null && l === "string" ? (n = "", i = !0) : l === "number" && (n = 0, i = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  i && e.removeAttribute(o || t);
}
function Vu(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function Bu(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const Ws = /* @__PURE__ */ Symbol("_vei");
function $u(e, t, n, r, o = null) {
  const s = e[Ws] || (e[Ws] = {}), i = s[t];
  if (r && i)
    i.value = r;
  else {
    const [l, a] = Uu(t);
    if (r) {
      const f = s[t] = Gu(
        r,
        o
      );
      Vu(e, l, f, a);
    } else i && (Bu(e, l, i, a), s[t] = void 0);
  }
}
const Nu = /(Once|Passive|Capture)$/, Wu = /^on:?(?:Once|Passive|Capture)$/;
function Uu(e) {
  let t, n;
  for (; (n = e.match(Nu)) && !Wu.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : $t(e.slice(2)), t];
}
let po = 0;
const zu = /* @__PURE__ */ Promise.resolve(), qu = () => po || (zu.then(() => po = 0), po = Date.now());
function Gu(e, t) {
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
        const f = i[a];
        f && qe(
          f,
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
  return n.value = e, n.attached = qu(), n;
}
const Us = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Yu = (e, t, n, r, o, s) => {
  const i = o === "svg";
  t === "class" ? ku(e, r, i) : t === "style" ? ju(e, n, r) : _r(t) ? xr(t) || $u(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Xu(e, t, r, i)) ? (Ns(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && $s(e, t, r, i, s, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Ju(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !ge(r))) ? Ns(e, We(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), $s(e, t, r, i));
};
function Xu(e, t, n, r) {
  if (r)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Us(t) && U(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return Us(t) && ge(n) ? !1 : t in e;
}
function Ju(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const r = We(t);
  return Array.isArray(n) ? n.some((o) => We(o) === r) : Object.keys(n).some((o) => We(o) === r);
}
const Zu = ["ctrl", "shift", "alt", "meta"], Qu = {
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
  exact: (e, t) => Zu.some((n) => e[`${n}Key`] && !t.includes(n))
}, nr = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), r = t.join(".");
  return n[r] || (n[r] = (o, ...s) => {
    for (let i = 0; i < t.length; i++) {
      const l = Qu[t[i]];
      if (l && l(o, t)) return;
    }
    return e(o, ...s);
  });
}, ef = /* @__PURE__ */ Ie({ patchProp: Yu }, Pu);
let zs;
function tf() {
  return zs || (zs = uu(ef));
}
const nf = (...e) => {
  const t = tf().createApp(...e), { mount: n } = t;
  return t.mount = (r) => {
    const o = of(r);
    if (!o) return;
    const s = t._component;
    !U(s) && !s.render && !s.template && (s.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const i = n(o, !1, rf(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), i;
  }, t;
};
function rf(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function of(e) {
  return ge(e) ? document.querySelector(e) : e;
}
function rr() {
  return !0;
}
const sf = Symbol("merge-proxy"), ar = Symbol("merge-proxy-sources"), lf = {
  get(e, t, n) {
    return t === sf ? n : t === ar ? e.sources : e.get(t);
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
function To(...e) {
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
  }, lf);
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
function Rl(e) {
  return typeof e == "function" ? e : (t) => {
    var n;
    return (n = e.next) == null ? void 0 : n.call(e, t);
  };
}
function af(e) {
  return Object.assign(e, {
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: _e(e, Rl(t), { flush: "sync" }) })
  });
}
function cf(e) {
  return Object.assign(e, {
    set: (t) => {
      e.value = typeof t == "function" ? t(e.value) : t;
    },
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: _e(e, Rl(t), { flush: "sync" }) })
  });
}
function uf() {
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
    createReadonlyAtom: (t, n) => af(Y(() => t())),
    createWritableAtom: (t, n) => cf(/* @__PURE__ */ hc(t)),
    untrack: (t) => t(),
    batch: (t) => t()
  };
}
function kr(e, t) {
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
function ff(e, t) {
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
function ln(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Cl(e, t) {
  return (n) => {
    var r;
    (((r = t.options.atoms) == null ? void 0 : r[e]) ?? t.baseAtoms[e]).set((o) => kr(n, o));
  };
}
function Gs(e) {
  if (typeof e != "object" || e === null) return !1;
  if (Array.isArray(e)) return !0;
  const t = Object.getPrototypeOf(e);
  return t === Object.prototype || t === null;
}
function Ys(e) {
  return Reflect.ownKeys(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
const df = 3;
function pf(e, t) {
  return Il(e, t, df);
}
function Il(e, t, n) {
  if (Object.is(e, t)) return !0;
  if (n <= 0 || !Gs(e) || !Gs(t) || (Array.isArray(e) || Array.isArray(t)) && (!Array.isArray(e) || !Array.isArray(t) || e.length !== t.length))
    return !1;
  const r = Ys(e), o = Ys(t);
  if (r.length !== o.length) return !1;
  const s = e, i = t;
  for (let l = 0; l < r.length; l++) {
    const a = r[l];
    if (!Object.prototype.propertyIsEnumerable.call(t, a) || !Il(s[a], i[a], n - 1)) return !1;
  }
  return !0;
}
function Dr(e, t, n, r = pf) {
  const o = `on${t.charAt(0).toUpperCase()}${t.slice(1)}Change`, s = e.options[o];
  s && s((i) => {
    const l = kr(n, i);
    return r(i, l) ? i : l;
  });
}
function gf(e, t) {
  const n = [], r = (o) => {
    o.forEach((s) => {
      n.push(s);
      const i = t(s);
      i.length && r(i);
    });
  };
  return r(e), n;
}
const hf = ({ fn: e, memoDeps: t, onAfterCompare: n, onAfterUpdate: r, onBeforeCompare: o, onBeforeUpdate: s }) => {
  let i = [], l;
  return (f) => {
    o == null || o();
    const d = t == null ? void 0 : t(f);
    let v = !d || d.length !== (i == null ? void 0 : i.length);
    if (!v && d) {
      for (let b = 0; b < d.length; b++) if (d[b] !== i[b]) {
        v = !0;
        break;
      }
    }
    return n == null || n(v), v && (i = d, s == null || s(), l = e(...d ?? []), r == null || r(l)), l;
  };
};
function vf(e) {
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
    const { schedule: a, untrack: f } = o._reactivity;
    a(() => f(() => r()));
  };
  return hf({
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
function an(e, t, n, r) {
  for (const [o, { fn: s, memoDeps: i }] of Object.entries(r)) {
    const { fnKey: l, fnName: a } = Ml(o);
    if (i) {
      const f = `_memo_${l}`;
      t[l] = function(...d) {
        if (!this[f]) {
          const v = this;
          this[f] = Fr({
            memoDeps: (b) => i(v, b),
            fn: (...b) => s(v, ...b),
            fnName: a,
            objectId: v.id,
            table: n,
            feature: e
          });
        }
        return this[f](...d);
      };
    } else t[l] = function(...f) {
      return s(this, ...f);
    };
  }
}
function xe(e, t, n, ...r) {
  var o;
  return ((o = e[t]) == null ? void 0 : o.call(e, ...r)) ?? n(e, ...r);
}
function mf(e) {
  return e.row.getValue(e.column.id);
}
function yf(e) {
  return e.getValue() ?? e.table.options.renderFallbackValue;
}
function wf(e) {
  return {
    table: e.table,
    column: e.column,
    row: e.row,
    cell: e,
    getValue: () => e.getValue(),
    renderValue: () => e.renderValue()
  };
}
const bf = { assignCellPrototype: (e, t) => {
  an("coreCellsFeature", e, t, {
    cell_getValue: { fn: (n) => mf(n) },
    cell_renderValue: { fn: (n) => yf(n) },
    cell_getContext: {
      fn: (n) => wf(n),
      memoDeps: (n) => [n]
    }
  });
} };
function _f(e) {
  var t, n;
  if (!e._headerPrototype) {
    e._headerPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignHeaderPrototype) == null || n.call(t, e._headerPrototype, e);
  }
  return e._headerPrototype;
}
function El(e, t, n) {
  const r = _f(e), o = Object.create(r);
  o.colSpan = 0, o.column = t, o.depth = n.depth, o.headerGroup = null, o.id = n.id ?? t.id, o.index = n.index, o.isPlaceholder = !!n.isPlaceholder, o.placeholderId = n.placeholderId, o.rowSpan = 0, o.subHeaders = [];
  const s = e._headerInstanceInitFns;
  for (let i = 0; i < s.length; i++) s[i](o);
  return o;
}
function xf() {
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
  return n.length ? n.some((o) => xe(o, "getIsVisible", Kt)) : (ln(t, e.id) ? t[e.id] : void 0) ?? !0;
}
function Sf(e) {
  return e.getAllLeafColumns().filter((t) => xe(t, "getIsVisible", Kt));
}
function Al(e, t = 1) {
  let n = t;
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    xe(o, "getIsVisible", Kt) && o.columns.length && (n = Math.max(n, Al(o.columns, t + 1)));
  }
  return n;
}
function Rf(e, t) {
  return String(t);
}
function Cf(e, t, n, r) {
  let o = e ?? "";
  return t && (o = o ? `${o}_${t}` : String(t)), n && (o = o ? `${o}_${n}` : n), r && (o = o ? `${o}_${r}` : r), o;
}
function If(e, t) {
  let n = 0;
  for (let r = 0; r < e.length; r++) e[r].column === t && n++;
  return n;
}
function Ol(e, t, n, r, o, s) {
  const i = {
    depth: t,
    id: Rf(r, t),
    headers: []
  }, l = [];
  for (let a = 0; a < e.length; a++) {
    if (!(a in e)) continue;
    const f = e[a], d = l[l.length - 1], v = f.column.depth === i.depth;
    let b, y = !1;
    if (v && f.column.parent ? b = f.column.parent : (b = f.column, y = !0), d && d.column === b) d.subHeaders.push(f);
    else {
      const M = El(n, b, {
        id: Cf(r, t, b.id, f.id),
        isPlaceholder: y,
        placeholderId: y ? String(If(l, b)) : void 0,
        depth: t,
        index: l.length
      });
      M.subHeaders.push(f), l.push(M);
    }
    i.headers.push(f), f.headerGroup = i;
  }
  for (let a = 0; a < s.length; a++) s[a](i);
  o.push(i), t > 0 && Ol(l, t - 1, n, r, o, s);
}
function Pl(e) {
  for (let t = 0; t < e.length; t++) {
    const n = e[t];
    if (!xe(n.column, "getIsVisible", Kt)) continue;
    let r = 0;
    if (n.subHeaders.length) {
      Pl(n.subHeaders);
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
function Xs(e, t, n, r) {
  var a;
  const o = Al(e), s = [], i = n._headerGroupInstanceInitFns, l = new Array(t.length);
  for (let f = 0; f < t.length; f++)
    f in t && (l[f] = El(n, t[f], {
      depth: o,
      index: f
    }));
  return Ol(l, o - 1, n, r, s, i), s.reverse(), Pl(((a = s[0]) == null ? void 0 : a.headers) ?? []), s;
}
function Mf(e) {
  var t, n;
  if (!e._columnPrototype) {
    e._columnPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignColumnPrototype) == null || n.call(t, e._columnPrototype, e);
  }
  return e._columnPrototype;
}
function Ef(e, t, n, r) {
  const o = {
    ...e.getDefaultColumnDef(),
    ...t
  }, s = o.accessorKey, i = s === void 0 ? void 0 : String(s), l = o.id ?? (i == null ? void 0 : i.replaceAll(".", "_")) ?? (typeof o.header == "string" ? o.header : void 0);
  let a;
  if (o.accessorFn) a = o.accessorFn;
  else if (s !== void 0) if (typeof s == "string" && s.includes(".")) {
    const b = s.split(".");
    a = (y) => {
      let M = y;
      for (let C = 0; C < b.length; C++) {
        const T = b[C];
        M = M == null ? void 0 : M[T];
      }
      return M;
    };
  } else a = (b) => b[o.accessorKey];
  if (!l)
    throw new Error();
  const f = Mf(e), d = Object.create(f);
  d.accessorFn = a, d.columnDef = o, d.columns = [], d.depth = n, d.id = `${String(l)}`, d.parent = r;
  const v = e._columnInstanceInitFns;
  for (let b = 0; b < v.length; b++) v[b](d);
  return d;
}
function Tl(e) {
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
    return Af(e, o);
  };
}
function Af(e, t) {
  var l;
  const n = ((l = e.atoms.grouping) == null ? void 0 : l.get()) ?? [], { groupedColumnMode: r } = e.options;
  if (!n.length || !r) return t;
  const o = t.filter((a) => !n.includes(a.id));
  if (r === "remove") return o;
  const s = /* @__PURE__ */ new Map();
  for (let a = 0; a < t.length; a++) {
    const f = t[a];
    s.set(f.id, f);
  }
  const i = [];
  for (let a = 0; a < n.length; a++) {
    const f = s.get(n[a]);
    f && i.push(f);
  }
  return [...i, ...o];
}
function Of(e) {
  return [e, ...e.columns.flatMap((t) => t.getFlatColumns())];
}
function Pf(e) {
  if (e.columns.length) {
    const t = e.columns.flatMap((n) => n.getLeafColumns());
    return xe(e.table, "getOrderColumns", Tl)(t);
  }
  return [e];
}
function Tf(e) {
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
function kl(e, t, n, r = 0) {
  const o = new Array(t.length);
  for (let s = 0; s < t.length; s++) {
    if (!(s in t)) continue;
    const i = t[s], l = Ef(e, i, r, n), a = i;
    l.columns = a.columns ? kl(e, a.columns, l, r + 1) : [], o[s] = l;
  }
  return o;
}
function kf(e) {
  return kl(e, e.options.columns);
}
function Df(e) {
  return e.getAllColumns().flatMap((t) => t.getFlatColumns());
}
function Ff(e) {
  const t = oe(), n = e.getAllFlatColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function Hf(e) {
  const t = e.getAllColumns().flatMap((n) => n.getLeafColumns());
  return xe(e, "getOrderColumns", Tl)(t);
}
function jf(e) {
  const t = oe(), n = e.getAllLeafColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function Lf(e, t) {
  return e.getAllFlatColumnsById()[t];
}
const Kf = {
  assignColumnPrototype: (e, t) => {
    an("coreColumnsFeature", e, t, {
      column_getFlatColumns: {
        fn: (n) => Of(n),
        memoDeps: (n) => [n.table.options.columns]
      },
      column_getLeafColumns: {
        fn: (n) => Pf(n),
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
        fn: () => Tf(e),
        memoDeps: () => [e.options.defaultColumn]
      },
      table_getAllColumns: {
        fn: () => kf(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumns: {
        fn: () => Df(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumnsById: {
        fn: () => Ff(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllLeafColumns: {
        fn: () => Hf(e),
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
        fn: () => jf(e),
        memoDeps: () => [e.getAllLeafColumns()]
      },
      table_getColumn: { fn: (t) => Lf(e, t) }
    });
  }
};
function Dl(e, t) {
  for (let n = 0; n < e.subHeaders.length; n++) Dl(e.subHeaders[n], t);
  t.push(e);
}
function Vf(e) {
  const t = [];
  return Dl(e, t), t;
}
function Bf(e) {
  return {
    column: e.column,
    header: e,
    table: e.column.table
  };
}
function $f(e) {
  var f;
  const { start: t, end: n } = ((f = e.atoms.columnPinning) == null ? void 0 : f.get()) ?? xf(), r = e.getAllColumns(), o = xe(e, "getVisibleLeafColumns", Sf);
  if (!t.length && !n.length) return Xs(r, o, e);
  const s = e.getAllLeafColumnsById(), i = [];
  for (let d = 0; d < t.length; d++) {
    const v = s[t[d]];
    v && xe(v, "getIsVisible", Kt) && i.push(v);
  }
  const l = [];
  for (let d = 0; d < n.length; d++) {
    const v = s[n[d]];
    v && xe(v, "getIsVisible", Kt) && l.push(v);
  }
  const a = o.filter((d) => !t.includes(d.id) && !n.includes(d.id));
  return Xs(r, [
    ...i,
    ...a,
    ...l
  ], e);
}
function Nf(e) {
  return [...e.getHeaderGroups()].reverse();
}
function Wf(e) {
  const t = e.getHeaderGroups(), n = [];
  for (let r = 0; r < t.length; r++) {
    const o = t[r].headers;
    for (let s = 0; s < o.length; s++) n.push(o[s]);
  }
  return n;
}
function Uf(e) {
  var r;
  const t = ((r = e.getHeaderGroups()[0]) == null ? void 0 : r.headers) ?? [], n = [];
  for (let o = 0; o < t.length; o++) {
    const s = t[o].getLeafHeaders();
    for (let i = 0; i < s.length; i++) n.push(s[i]);
  }
  return n;
}
const zf = {
  assignHeaderPrototype: (e, t) => {
    an("coreHeadersFeature", e, t, {
      header_getLeafHeaders: {
        fn: (n) => Vf(n),
        memoDeps: (n) => [n.column.table.options.columns]
      },
      header_getContext: {
        fn: (n) => Bf(n),
        memoDeps: (n) => [n.column.table.options.columns]
      }
    });
  },
  constructTableAPIs: (e) => {
    Nt("coreHeadersFeature", e, {
      table_getHeaderGroups: {
        fn: () => $f(e),
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
        fn: () => Nf(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getFlatHeaders: {
        fn: () => Wf(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getLeafHeaders: {
        fn: () => Uf(e),
        memoDeps: () => [e.getHeaderGroups()]
      }
    });
  }
};
function qf(e) {
  var t, n;
  if (!e._rowPrototype) {
    e._rowPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignRowPrototype) == null || n.call(t, e._rowPrototype, e);
  }
  return e._rowPrototype;
}
const Gf = (e, t, n, r, o, s, i) => {
  const l = qf(e), a = Object.create(l);
  a._displayIndexCache = -1, a._uniqueValuesCache = oe(), a._valuesCache = oe(), a.depth = o, a.id = t, a.index = r, a.original = n, a.parentId = i, a.subRows = [];
  const f = e._rowInstanceInitFns;
  for (let d = 0; d < f.length; d++) f[d](a);
  return a;
};
function Yf() {
  return [];
}
function Xf(e, t) {
  Dr(e, "cellSelection", Mt(e.initialState.cellSelection) ?? Yf());
}
function Jf(e) {
  e.atoms.cellSelection && (e.options.autoResetAll ?? e.options.autoResetCellSelection ?? !0) && e._reactivity.schedule(() => Xf(e));
}
function Zf() {
  return oe();
}
function Fl(e) {
  e.atoms.expanded && (e.options.autoResetAll ?? e.options.autoResetExpanded ?? !e.options.manualExpanding) && e._reactivity.schedule(() => jl(e));
}
function yr(e, t) {
  var n, r;
  (r = (n = e.options).onExpandedChange) == null || r.call(n, t);
}
function Hl(e, t) {
  var r;
  const n = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t ?? !Kl(e)) {
    if (n === !0 || !Ll(e)) return;
    yr(e, !0);
  } else {
    if (n !== !0 && !Object.keys(n).length) return;
    yr(e, oe());
  }
}
function jl(e, t) {
  const n = e.initialState.expanded;
  Dr(e, "expanded", t ? oe() : n === !0 ? !0 : Object.assign(oe(), Mt(n ?? {})));
}
function Ll(e) {
  return e.getPrePaginatedRowModel().flatRows.some((t) => Vt(t));
}
function Qf(e) {
  return (t) => {
    Hl(e);
  };
}
function ed(e) {
  var n;
  const t = ((n = e.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return t === !0 || Object.values(t).some(Boolean);
}
function Kl(e) {
  var r;
  const t = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t === !0) return !0;
  if (!Object.keys(t).length) return !1;
  const n = e.getRowModel().flatRows.filter((o) => Vt(o));
  return !(!n.length || n.some((o) => !Hr(o)));
}
function td(e) {
  var r;
  let t = 0;
  const n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return (n === !0 ? Object.values(e.getRowModel().rowsById).filter((o) => Vt(o)).map((o) => o.id) : Object.keys(n ?? {})).forEach((o) => {
    const s = o.split(".");
    t = Math.max(t, s.length);
  }), t;
}
function Vl(e, t) {
  var s;
  const n = ((s = e.table.atoms.expanded) == null ? void 0 : s.get()) ?? {}, r = n === !0 || ko(n, e.id), o = t ?? !r;
  o !== r && (o && !Vt(e) || yr(e.table, (i) => {
    const l = i === !0 ? !0 : ko(i, e.id);
    let a = oe();
    if (i === !0 ? Object.values(e.table.getRowModel().rowsById).forEach((f) => {
      Vt(f) && (a[f.id] = !0);
    }) : a = Object.assign(oe(), i), !l && o)
      return a[e.id] = !0, a;
    if (l && !o) {
      const f = oe(), d = Object.keys(a);
      for (let v = 0; v < d.length; v++) {
        const b = d[v];
        b !== e.id && a[b] && (f[b] = !0);
      }
      return f;
    }
    return i;
  }));
}
function Hr(e) {
  var n, r, o;
  const t = ((n = e.table.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return !!(((o = (r = e.table.options).getIsRowExpanded) == null ? void 0 : o.call(r, e)) ?? (t === !0 || ko(t, e.id)));
}
function ko(e, t) {
  return !!(e && e !== !0 && ln(e, t) && e[t]);
}
function Vt(e) {
  var t, n;
  return ((n = (t = e.table.options).getRowCanExpand) == null ? void 0 : n.call(t, e)) ?? ((e.table.options.enableExpanding ?? !0) && !!e.subRows.length);
}
function nd(e) {
  let t = !0, n = e;
  for (; t && n.parentId; )
    n = e.table.getRow(n.parentId, !0), t = Hr(n);
  return t;
}
function rd(e) {
  const t = Vt(e);
  return () => {
    t && Vl(e);
  };
}
const Do = 0;
function od(e) {
  var t, n;
  if (e.options.autoResetAll ?? e.options.autoResetPageIndex ?? !e.options.manualPagination) {
    if ((((n = (t = e.atoms.pagination) == null ? void 0 : t.get()) == null ? void 0 : n.pageIndex) ?? Do) === Do) return;
    ld(e);
  }
}
function sd(e, t) {
  Dr(e, "pagination", t);
}
function id(e, t) {
  sd(e, (n) => {
    let r = kr(t, n.pageIndex);
    const o = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
    return r = Math.max(0, Math.min(r, o)), {
      ...n,
      pageIndex: r
    };
  });
}
function ld(e, t) {
  id(e, Do);
}
function ad(e, t) {
  Dr(e, "sorting", t);
}
function cd(e, t) {
  ad(e, Mt(e.initialState.sorting ?? []));
}
function ud(e) {
  e.atoms.sorting && (e.options.autoResetAll ?? e.options.autoResetSorting ?? !1) && cd(e);
}
function Bl() {
  return (e) => Fr({
    feature: "coreRowModelsFeature",
    table: e,
    fnName: "table.getCoreRowModel",
    memoDeps: () => [e.options.data],
    fn: () => fd(e, e.options.data),
    onAfterUpdate: vf(() => {
      Fl(e), od(e), ud(e), Jf(e);
    })
  });
}
function $l(e, t, n, r = 0, o) {
  var i;
  const s = [];
  for (let l = 0; l < n.length; l++) {
    const a = n[l], f = Gf(e, e.getRowId(a, l, o), a, l, r, void 0, o == null ? void 0 : o.id);
    t.flatRows.push(f), t.rowsById[f.id] = f, s.push(f), e.options.getSubRows && (f.originalSubRows = e.options.getSubRows(a, l), (i = f.originalSubRows) != null && i.length && (f.subRows = $l(e, t, f.originalSubRows, r + 1, f)));
  }
  return s;
}
function fd(e, t) {
  const n = {
    rows: [],
    flatRows: [],
    rowsById: oe()
  };
  return n.rows = $l(e, n, t), n;
}
function dd(e) {
  var t, n;
  return e._rowModels.coreRowModel || (e._rowModels.coreRowModel = ((n = (t = e.options.features).coreRowModel) == null ? void 0 : n.call(t, e)) ?? Bl()(e)), e._rowModels.coreRowModel();
}
function pd(e) {
  return e.getCoreRowModel();
}
function gd(e) {
  var t, n;
  return e._rowModels.filteredRowModel || (e._rowModels.filteredRowModel = (n = (t = e.options.features).filteredRowModel) == null ? void 0 : n.call(t, e)), e.options.manualFiltering || !e._rowModels.filteredRowModel ? e.getPreFilteredRowModel() : e._rowModels.filteredRowModel();
}
function hd(e) {
  return e.getFilteredRowModel();
}
function vd(e) {
  var t, n;
  return e._rowModels.groupedRowModel || (e._rowModels.groupedRowModel = (n = (t = e.options.features).groupedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualGrouping || !e._rowModels.groupedRowModel ? e.getPreGroupedRowModel() : e._rowModels.groupedRowModel();
}
function md(e) {
  return e.getGroupedRowModel();
}
function yd(e) {
  var t, n;
  return e._rowModels.sortedRowModel || (e._rowModels.sortedRowModel = (n = (t = e.options.features).sortedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualSorting || !e._rowModels.sortedRowModel ? e.getPreSortedRowModel() : e._rowModels.sortedRowModel();
}
function wd(e) {
  return e.getSortedRowModel();
}
function bd(e) {
  var t, n;
  return e._rowModels.expandedRowModel || (e._rowModels.expandedRowModel = (n = (t = e.options.features).expandedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualExpanding || !e._rowModels.expandedRowModel ? e.getPreExpandedRowModel() : e._rowModels.expandedRowModel();
}
function _d(e) {
  return e.getExpandedRowModel();
}
function xd(e) {
  var t, n;
  return e._rowModels.paginatedRowModel || (e._rowModels.paginatedRowModel = (n = (t = e.options.features).paginatedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualPagination || !e._rowModels.paginatedRowModel ? e.getPrePaginatedRowModel() : e._rowModels.paginatedRowModel();
}
function Sd(e) {
  return e.getPaginatedRowModel();
}
const Rd = { constructTableAPIs: (e) => {
  Nt("coreRowModelsFeature", e, {
    table_getCoreRowModel: { fn: () => dd(e) },
    table_getPreFilteredRowModel: { fn: () => pd(e) },
    table_getFilteredRowModel: { fn: () => gd(e) },
    table_getPreGroupedRowModel: { fn: () => hd(e) },
    table_getGroupedRowModel: { fn: () => vd(e) },
    table_getPreSortedRowModel: { fn: () => md(e) },
    table_getSortedRowModel: { fn: () => yd(e) },
    table_getPreExpandedRowModel: { fn: () => wd(e) },
    table_getExpandedRowModel: { fn: () => bd(e) },
    table_getPrePaginatedRowModel: { fn: () => _d(e) },
    table_getPaginatedRowModel: { fn: () => xd(e) },
    table_getRowModel: { fn: () => Sd(e) }
  });
} };
function Cd(e) {
  var t, n;
  if (!e._cellPrototype) {
    e._cellPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignCellPrototype) == null || n.call(t, e._cellPrototype, e);
  }
  return e._cellPrototype;
}
function Id(e, t, n) {
  const r = Cd(n), o = Object.create(r);
  o.column = e, o.id = `${t.id}_${e.id}`, o.row = t;
  const s = n._cellInstanceInitFns;
  for (let i = 0; i < s.length; i++) s[i](o);
  return o;
}
function Md(e) {
  const t = e.table.getRowsInDisplayOrder(), n = e._displayIndexCache;
  return t[n] === e ? n : -1;
}
function Ed(e) {
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
function Ad(e, t) {
  if (ln(e._valuesCache, t)) return e._valuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return e._valuesCache[t] = n.accessorFn(e.original, e.index), e._valuesCache[t];
}
function Od(e, t) {
  if (ln(e._uniqueValuesCache, t)) return e._uniqueValuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return n.columnDef.getUniqueValues ? (e._uniqueValuesCache[t] = n.columnDef.getUniqueValues(e.original, e.index), e._uniqueValuesCache[t]) : (e._uniqueValuesCache[t] = [e.getValue(t)], e._uniqueValuesCache[t]);
}
function Pd(e, t) {
  return e.getValue(t) ?? e.table.options.renderFallbackValue;
}
function Td(e) {
  return gf(e.subRows, (t) => t.subRows);
}
function kd(e) {
  const t = e.getCoreRowModel().flatRows;
  let n = 0;
  for (let r = 0; r < t.length; r++) n = Math.max(n, t[r].depth);
  return n;
}
function Dd(e) {
  if (e.parentId)
    return e.table.getCoreRowModel().rowsById[e.parentId] ?? e.table.getRow(e.parentId, !0);
}
function Fd(e) {
  const t = [];
  let n = e;
  for (; ; ) {
    const r = n.getParentRow();
    if (!r) break;
    t.push(r), n = r;
  }
  return t.reverse();
}
function Hd(e) {
  const t = e.table.getAllLeafColumns();
  let n = e._cellsCache;
  n || (n = e._cellsCache = /* @__PURE__ */ new WeakMap());
  const r = new Array(t.length);
  for (let o = 0; o < t.length; o++) {
    const s = t[o];
    let i = n.get(s);
    i || (i = Id(s, e, e.table), n.set(s, i)), r[o] = i;
  }
  return r;
}
function jd(e) {
  const t = oe(), n = e.getAllCells();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.column.id] = o;
  }
  return t;
}
function Ld(e, t, n, r) {
  var o, s;
  return ((s = (o = t.options).getRowId) == null ? void 0 : s.call(o, e, n, r)) ?? (r ? `${r.id}.${n}` : String(n));
}
function Kd(e, t, n) {
  let r = (n ? e.getPrePaginatedRowModel() : e.getRowModel()).rowsById[t];
  if (!r && (r = e.getCoreRowModel().rowsById[t], !r))
    throw new Error();
  return r;
}
const Vd = {
  assignRowPrototype: (e, t) => {
    an("coreRowsFeature", e, t, {
      row_getDisplayIndex: { fn: (n) => Md(n) },
      row_getAllCellsByColumnId: {
        fn: (n) => jd(n),
        memoDeps: (n) => [n.getAllCells()]
      },
      row_getAllCells: {
        fn: (n) => Hd(n),
        memoDeps: (n) => [n.table.getAllLeafColumns()]
      },
      row_getLeafRows: {
        fn: (n) => Td(n),
        memoDeps: (n) => [n.subRows]
      },
      row_getParentRow: { fn: (n) => Dd(n) },
      row_getParentRows: { fn: (n) => Fd(n) },
      row_getUniqueValues: { fn: (n, r) => Od(n, r) },
      row_getValue: { fn: (n, r) => Ad(n, r) },
      row_renderValue: { fn: (n, r) => Pd(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    Nt("coreRowsFeature", e, {
      table_getRowsInDisplayOrder: {
        fn: () => Ed(e),
        memoDeps: () => {
          var t;
          return [
            e.getPrePaginatedRowModel().rows,
            e.options.paginateExpandedRows,
            e.options.paginateExpandedRows === !1 ? (t = e.atoms.expanded) == null ? void 0 : t.get() : void 0
          ];
        }
      },
      table_getRowId: { fn: (t, n, r) => Ld(t, e, n, r) },
      table_getRow: { fn: (t, n) => Kd(e, t, n) },
      table_getMaxSubRowDepth: {
        fn: () => kd(e),
        memoDeps: () => [e.getCoreRowModel()]
      }
    });
  }
};
function Nl(e, t, n = (r, o) => r === o) {
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
function Bd(e, t, n = (r, o) => r === o) {
  e._reactivity.batch(() => {
    var r, o;
    Nl(e, t, n), (o = (r = e._reactivity).commit) == null || o.call(r);
  });
}
function $d(e) {
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
function Nd(e, t) {
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
function Wd(e, t, n) {
  const r = Nd(e, kr(t, e.options));
  e.optionsStore ? e.optionsStore.set(() => r) : e.options = r, Bd(e, r.state ?? null);
}
const Ud = { constructTableAPIs: (e) => {
  Nt("coreTablesFeature", e, {
    table_reset: { fn: () => $d(e) },
    table_setOptions: { fn: (t) => Wd(e, t) }
  });
} }, zd = {
  coreCellsFeature: bf,
  coreColumnsFeature: Kf,
  coreHeadersFeature: zf,
  coreRowModelsFeature: Rd,
  coreRowsFeature: Vd,
  coreTablesFeature: Ud
};
function qd(e) {
  const t = e;
  return Object.defineProperty(e, "state", { get() {
    return e.get();
  } }), "set" in e && (t.setState = e.set.bind(e)), t;
}
function Gd(e, t) {
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
  const n = Js(e);
  if (n.length !== Js(t).length) return !1;
  for (let r = 0; r < n.length; r++) if (!Object.prototype.hasOwnProperty.call(t, n[r]) || !Object.is(e[n[r]], t[n[r]])) return !1;
  return !0;
}
function Js(e) {
  return Object.keys(e).concat(Object.getOwnPropertySymbols(e));
}
function Yd(e, t = {}) {
  return Object.values(e).forEach((n) => {
    var r;
    t = ((r = n.getInitialState) == null ? void 0 : r.call(n, t)) ?? t;
  }), Mt(t);
}
function Xd(e) {
  var W, de;
  const t = e.features.coreReactivityFeature, { aggregationFns: n, columnMeta: r, coreRowModel: o, expandedRowModel: s, facetedMinMaxValues: i, facetedRowModel: l, facetedUniqueValues: a, filterFns: f, filterMeta: d, filteredRowModel: v, groupedRowModel: b, paginatedRowModel: y, sortFns: M, sortedRowModel: C, tableMeta: T, ...F } = e.features, I = {
    _cellInstanceInitFns: [],
    _columnInstanceInitFns: [],
    _features: {
      ...zd,
      ...F
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
  }, K = Object.values(I._features), E = {
    ...K.reduce((D, j) => {
      var G;
      return Object.assign(D, (G = j.getDefaultTableOptions) == null ? void 0 : G.call(j, I));
    }, {}),
    ...e
  };
  if (t.wrapExternalAtoms && E.atoms) for (const [D, j] of Object.entries(E.atoms)) {
    const G = j, pe = t.createWritableAtom(G.get(), { debugName: `externalAtom/${D}` });
    E.atoms[D] = pe;
    let se = !1;
    const ve = G.subscribe((Me) => {
      se || pe.set(Me);
    }), Te = pe.subscribe((Me) => {
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
    set(D) {
      I.optionsStore.set(() => D);
    }
  })) : I.options = E, I.initialState = Yd(I._features, I.options.initialState);
  const $ = Object.keys(I.initialState);
  for (let D = 0; D < $.length; D++) {
    const j = $[D];
    I.baseAtoms[j] = t.createWritableAtom(I.initialState[j], { debugName: `table/baseAtoms/${j}` }), I.atoms[j] = t.createReadonlyAtom(() => {
      var Te;
      const G = I.options, pe = (Te = G.atoms) == null ? void 0 : Te[j], se = pe ? pe.get() : I.baseAtoms[j].get();
      if (pe) return se;
      const ve = G.state;
      if (ve && ln(ve, j)) {
        const Me = ve[j];
        return Me === void 0 ? I.initialState[j] : Me;
      }
      return se;
    }, { debugName: `table/atoms/${j}` });
  }
  Nl(I), I.store = qd(t.createReadonlyAtom(() => {
    const D = {};
    for (let j = 0; j < $.length; j++) {
      const G = $[j];
      D[G] = I.atoms[G].get();
    }
    return D;
  }, {
    compare: Gd,
    debugName: "table/store"
  }));
  for (let D = 0; D < K.length; D++) {
    const j = K[D];
    (W = j.initTableInstanceData) == null || W.call(j, I), j.initCellInstanceData && I._cellInstanceInitFns.push(j.initCellInstanceData.bind(j)), j.initColumnInstanceData && I._columnInstanceInitFns.push(j.initColumnInstanceData.bind(j)), j.initHeaderGroupInstanceData && I._headerGroupInstanceInitFns.push(j.initHeaderGroupInstanceData.bind(j)), j.initHeaderInstanceData && I._headerInstanceInitFns.push(j.initHeaderInstanceData.bind(j)), j.initRowInstanceData && I._rowInstanceInitFns.push(j.initRowInstanceData.bind(j)), (de = j.constructTableAPIs) == null || de.call(j, I);
  }
  return I;
}
const Jd = {
  getInitialState: (e) => ({
    expanded: Zf(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onExpandedChange: Cl("expanded", e),
    paginateExpandedRows: !0
  }),
  assignRowPrototype: (e, t) => {
    an("rowExpandingFeature", e, t, {
      row_toggleExpanded: { fn: (n, r) => Vl(n, r) },
      row_getIsExpanded: { fn: (n) => Hr(n) },
      row_getCanExpand: { fn: (n) => Vt(n) },
      row_getIsAllParentsExpanded: { fn: (n) => nd(n) },
      row_getToggleExpandedHandler: { fn: (n) => rd(n) }
    });
  },
  constructTableAPIs: (e) => {
    Nt("rowExpandingFeature", e, {
      table_autoResetExpanded: { fn: () => Fl(e) },
      table_setExpanded: { fn: (t) => yr(e, t) },
      table_toggleAllRowsExpanded: { fn: (t) => Hl(e, t) },
      table_resetExpanded: { fn: (t) => jl(e, t) },
      table_getCanSomeRowsExpand: { fn: () => Ll(e) },
      table_getToggleAllRowsExpandedHandler: { fn: () => Qf(e) },
      table_getIsSomeRowsExpanded: { fn: () => ed(e) },
      table_getIsAllRowsExpanded: { fn: () => Kl(e) },
      table_getExpandedDepth: { fn: () => td(e) }
    });
  }
};
function Zd() {
  return oe();
}
function cn(e, t) {
  var n, r;
  (r = (n = e.options).onRowSelectionChange) == null || r.call(n, t);
}
function Qd(e, t) {
  e._lastSelectedRowId = null, cn(e, t ? oe() : Object.assign(oe(), Mt(e.initialState.rowSelection ?? {})));
}
function Wl(e, t, n) {
  e._lastSelectedRowId = null, cn(e, (r) => {
    if (t = typeof t < "u" ? t : !xe(e, "getIsAllRowsSelected", ql), n != null && n.deselectAll && !t) return oe();
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
function Ul(e, t, n) {
  e._lastSelectedRowId = null, cn(e, (r) => {
    const o = typeof t < "u" ? t : !xe(e, "getIsAllPageRowsSelected", Gl);
    if (n != null && n.deselectAll && !o) return oe();
    const s = Object.assign(oe(), r);
    return e.getRowModel().rows.forEach((i) => {
      Lr(s, i.id, o, !0, e, !0);
    }), s;
  });
}
function ep(e) {
  return e.getCoreRowModel();
}
function tp(e) {
  const t = e.getCoreRowModel();
  return xe(e, "getIsSomeRowsSelected", jr) ? rs(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: oe()
  };
}
function np(e) {
  const t = e.getFilteredRowModel();
  return xe(e, "getIsSomeRowsSelected", jr) ? rs(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: oe()
  };
}
function rp(e) {
  const t = e.getSortedRowModel();
  return xe(e, "getIsSomeRowsSelected", jr) ? rs(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: oe()
  };
}
function zl(e) {
  var t;
  return Object.keys(((t = e.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function ql(e) {
  var o;
  const t = e.getFilteredRowModel().flatRows, n = ((o = e.atoms.rowSelection) == null ? void 0 : o.get()) ?? {};
  let r = !!(t.length && Object.keys(n).length);
  if (r) {
    const s = /* @__PURE__ */ new Map();
    t.some((i) => !Ln(i, n) && wr(i, s)) && (r = !1);
  }
  return r;
}
function Gl(e) {
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
  return xe(e, "getSelectedRowIds", zl).length > 0;
}
function op(e) {
  return e.getPaginatedRowModel().flatRows.filter((t) => ht(t)).some((t) => ts(t) || xe(t, "getIsSomeSelected", Xl));
}
function sp(e) {
  return (t) => {
    Wl(e, t.target.checked);
  };
}
function ip(e) {
  return (t) => {
    Ul(e, t.target.checked);
  };
}
function Yl(e, t, n) {
  const r = ts(e);
  cn(e.table, (o) => {
    t = typeof t < "u" ? t : !r;
    const s = Object.assign(oe(), o);
    return Lr(s, e.id, t, ((n == null ? void 0 : n.selectChildren) ?? !0) && Lt(e), e.table), !t && (n != null && n.deselectParents) && Jl(s, e), s;
  });
}
function ts(e) {
  var t;
  return Ln(e, ((t = e.table.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function Xl(e) {
  return os(e) === "some";
}
function lp(e) {
  return os(e) === "all";
}
function ht(e) {
  const t = e.table.options;
  return typeof t.enableRowSelection == "function" ? t.enableRowSelection(e) : t.enableRowSelection ?? !0;
}
function ns(e) {
  const t = e.table.options;
  return typeof t.enableSubRowSelection == "function" ? t.enableSubRowSelection(e) : t.enableSubRowSelection ?? !0;
}
function Lt(e) {
  const t = e.table.options;
  return typeof t.enableMultiRowSelection == "function" ? t.enableMultiRowSelection(e) : t.enableMultiRowSelection ?? !0;
}
function ap(e, t) {
  const n = ht(e);
  return (r) => {
    var a, f;
    if (!n) return;
    const o = r, s = e.table, i = o.target.checked, l = s._lastSelectedRowId;
    (!(s.options.enableRowRangeSelection !== !1 && l !== null && Lt(e) && (((f = (a = s.options).isRowRangeSelectionEvent) == null ? void 0 : f.call(a, r)) ?? !1)) || !cp(e, l, i, t)) && Yl(e, i, t), s._lastSelectedRowId = e.id;
  };
}
function cp(e, t, n, r) {
  const o = (r == null ? void 0 : r.selectChildren) ?? !0, s = e.table, i = s.getRowsInDisplayOrder(), l = s.getPrePaginatedRowModel().rowsById[t] ?? s.getCoreRowModel().rowsById[t];
  if (!l) return !1;
  const a = l.getDisplayIndex(), f = e.getDisplayIndex(), d = i[a], v = i[f];
  if (a < 0 || f < 0 || a >= i.length || f >= i.length || (d == null ? void 0 : d.id) !== l.id || (v == null ? void 0 : v.id) !== e.id || !Lt(l) || !Lt(e)) return !1;
  const b = Math.min(a, f), y = Math.max(a, f);
  return cn(s, (M) => {
    const C = Object.assign(oe(), M);
    for (let T = b; T <= y; T++) {
      const F = i[T];
      !ht(F) || !Lt(F) || (Lr(C, F.id, n, o, s), !n && (r != null && r.deselectParents) && Jl(C, F));
    }
    return C;
  }), !0;
}
function Lr(e, t, n, r, o, s) {
  const i = o.getRow(t, !0);
  n ? (Lt(i) || Object.keys(e).forEach((l) => delete e[l]), ht(i) && (e[t] = !0)) : (!s || ht(i)) && delete e[t], r && i.subRows.length && ns(i) && i.subRows.forEach((l) => Lr(e, l.id, n, r, o, s));
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
    const f = t.get(a);
    if (f !== void 0) {
      l = f;
      break;
    }
    i.push(a);
    const d = s[a] ?? n.getRow(a, !0);
    if (!ns(d)) {
      l = !1;
      break;
    }
    a = d.parentId;
  }
  return i.forEach((f) => t.set(f, l)), l;
}
function Jl(e, t) {
  const n = t.table.getCoreRowModel().rowsById;
  let r = t.parentId;
  for (; r !== void 0; )
    delete e[r], r = (n[r] ?? t.table.getRow(r, !0)).parentId;
}
function Zl(e, t, n, r) {
  const o = [];
  for (let s = 0; s < e.length; s++) {
    const i = e[s], l = Ln(i, t);
    if (l && (n.push(i), r[i.id] = i), i.subRows.length) {
      const a = Zl(i.subRows, t, n, r);
      if (l) {
        const f = Object.create(Object.getPrototypeOf(i));
        ff(f, i), f.subRows = a, o.push(f);
      }
    } else l && o.push(i);
  }
  return o;
}
function rs(e, t) {
  var s;
  const n = [], r = oe(), o = ((s = t.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  return {
    rows: Zl(e.rows, o, n, r),
    flatRows: n,
    rowsById: r
  };
}
function Ln(e, t) {
  return !!(ln(t, e.id) && t[e.id]);
}
function os(e) {
  var s;
  if (!e.subRows.length) return !1;
  const t = ((s = e.table.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  let n = !1, r = !0, o = !1;
  for (let i = 0; i < e.subRows.length; i++) {
    const l = e.subRows[i];
    if (n && !r) break;
    if (ht(l) && (o = !0, Ln(l, t) ? n = !0 : r = !1), l.subRows.length) {
      const a = os(l);
      a === "all" ? (n = !0, o = !0) : a === "some" ? (n = !0, r = !1, o = !0) : r = !1;
    }
  }
  return o ? r ? "all" : n ? "some" : !1 : !1;
}
const up = {
  initTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  resetTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  getInitialState: (e) => ({
    rowSelection: Zd(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onRowSelectionChange: Cl("rowSelection", e),
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
    an("rowSelectionFeature", e, t, {
      row_toggleSelected: { fn: (n, r, o) => Yl(n, r, o) },
      row_getIsSelected: { fn: (n) => ts(n) },
      row_getIsSomeSelected: {
        fn: (n) => Xl(n),
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
        fn: (n) => lp(n),
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
      row_getCanSelectSubRows: { fn: (n) => ns(n) },
      row_getCanMultiSelect: { fn: (n) => Lt(n) },
      row_getToggleSelectedHandler: { fn: (n, r) => ap(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    Nt("rowSelectionFeature", e, {
      table_setRowSelection: { fn: (t) => cn(e, t) },
      table_resetRowSelection: { fn: (t) => Qd(e, t) },
      table_toggleAllRowsSelected: { fn: (t, n) => Wl(e, t, n) },
      table_toggleAllPageRowsSelected: { fn: (t, n) => Ul(e, t, n) },
      table_getPreSelectedRowModel: { fn: () => ep(e) },
      table_getSelectedRowModel: {
        fn: () => tp(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getCoreRowModel()];
        }
      },
      table_getFilteredSelectedRowModel: {
        fn: () => np(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getFilteredRowModel()];
        }
      },
      table_getGroupedSelectedRowModel: {
        fn: () => rp(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getSortedRowModel()];
        }
      },
      table_getSelectedRowIds: {
        fn: () => zl(e),
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
        fn: () => Gl(e),
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
        fn: () => op(e),
        memoDeps: () => {
          var t;
          return [
            (t = e.atoms.rowSelection) == null ? void 0 : t.get(),
            e.getPaginatedRowModel(),
            e.options.enableRowSelection
          ];
        }
      },
      table_getToggleAllRowsSelectedHandler: { fn: () => sp(e) },
      table_getToggleAllPageRowsSelectedHandler: { fn: () => ip(e) }
    });
  }
};
function fp() {
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
      fn: () => dp(t)
    });
  };
}
function dp(e) {
  var r;
  const t = e.getPreExpandedRowModel(), n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return !t.rows.length || n !== !0 && !Object.keys(n ?? {}).length || !e.options.paginateExpandedRows && !e.options.manualPagination ? t : pp(t);
}
function pp(e) {
  const t = [], n = (r) => {
    t.push(r), r.subRows.length && Hr(r) && r.subRows.forEach(n);
  };
  return e.rows.forEach(n), {
    rows: t,
    flatRows: e.flatRows,
    rowsById: e.rowsById
  };
}
function Zs(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = Ht(e[n]);
  return To(e, t);
}
function gp(e) {
  return Object.keys(e).map((t) => Ht(e[t]));
}
function hp(e) {
  const t = (l, a) => {
    l.setOptions((f) => qs(f, Zs(a)));
  }, n = uf(), r = To(e, { features: {
    coreReactivityFeature: n,
    ...Ht(e.features) ?? {}
  } }), o = To(Zs(r), { mergeOptions: (l, a) => qs(l, a) }), s = Xd(o), i = s;
  return Ci() && Ya(() => {
    var l;
    return (l = n.unmount) == null ? void 0 : l.call(n);
  }), _e(() => gp(r), () => {
    t(s, r);
  }, { immediate: !0 }), _e(() => {
    const l = Ht(e.state), a = Ht(e.atoms);
    if (!l) return [];
    const f = [];
    for (const d of Object.keys(i.initialState))
      !(d in l) || (a == null ? void 0 : a[d]) !== void 0 || f.push(l[d]);
    return f;
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
function vp(e) {
  if (Array.isArray(e)) return e;
}
function mp(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r, o, s, i, l = [], a = !0, f = !1;
    try {
      if (s = (n = n.call(e)).next, t !== 0) for (; !(a = (r = s.call(n)).done) && (l.push(r.value), l.length !== t); a = !0) ;
    } catch (d) {
      f = !0, o = d;
    } finally {
      try {
        if (!a && n.return != null && (i = n.return(), Object(i) !== i)) return;
      } finally {
        if (f) throw o;
      }
    }
    return l;
  }
}
function Fo(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Ql(e, t) {
  if (e) {
    if (typeof e == "string") return Fo(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Fo(e, t) : void 0;
  }
}
function yp() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ea(e, t) {
  return vp(e) || mp(e, t) || Ql(e, t) || yp();
}
var Qs = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Bt = {}, Kn = {};
Object.defineProperty(Kn, "__esModule", { value: !0 });
Kn.bind = void 0;
function wp(e, t) {
  var n = t.type, r = t.listener, o = t.options;
  return e.addEventListener(n, r, o), function() {
    e.removeEventListener(n, r, o);
  };
}
Kn.bind = wp;
var Vr = {}, Qt = Qs && Qs.__assign || function() {
  return Qt = Object.assign || function(e) {
    for (var t, n = 1, r = arguments.length; n < r; n++) {
      t = arguments[n];
      for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    }
    return e;
  }, Qt.apply(this, arguments);
};
Object.defineProperty(Vr, "__esModule", { value: !0 });
Vr.bindAll = void 0;
var bp = Kn;
function ei(e) {
  if (!(typeof e > "u"))
    return typeof e == "boolean" ? {
      capture: e
    } : e;
}
function _p(e, t) {
  if (t == null)
    return e;
  var n = Qt(Qt({}, e), { options: Qt(Qt({}, ei(t)), ei(e.options)) });
  return n;
}
function xp(e, t, n) {
  var r = t.map(function(o) {
    var s = _p(o, n);
    return (0, bp.bind)(e, s);
  });
  return function() {
    r.forEach(function(s) {
      return s();
    });
  };
}
Vr.bindAll = xp;
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
var ta = "data-pdnd-honey-pot";
function na(e) {
  return e instanceof Element && e.hasAttribute(ta);
}
function ra(e) {
  var t = document.elementsFromPoint(e.x, e.y), n = ea(t, 2), r = n[0], o = n[1];
  return r ? na(r) ? o ?? null : r : null;
}
function kn(e) {
  "@babel/helpers - typeof";
  return kn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, kn(e);
}
function Sp(e, t) {
  if (kn(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (kn(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Rp(e) {
  var t = Sp(e, "string");
  return kn(t) == "symbol" ? t : t + "";
}
function Vn(e, t, n) {
  return (t = Rp(t)) in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var Cp = 2147483647, Ip = {
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
var go = Wt(function() {
  return typeof HTMLElement < "u" && typeof HTMLElement.prototype.showPopover == "function";
});
function ti(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function ni(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ti(Object(n), !0).forEach(function(r) {
      Vn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ti(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
var Dn = 2, ri = Dn / 2;
function Mp(e) {
  return {
    x: Math.floor(e.x),
    y: Math.floor(e.y)
  };
}
function Ep(e) {
  return {
    x: e.x - ri,
    y: e.y - ri
  };
}
function Ap(e) {
  return {
    x: Math.max(e.x, 0),
    y: Math.max(e.y, 0)
  };
}
function Op(e) {
  return {
    x: Math.min(e.x, window.innerWidth - Dn),
    y: Math.min(e.y, window.innerHeight - Dn)
  };
}
function oi(e) {
  var t = e.client, n = Op(Ap(Ep(Mp(t))));
  return DOMRect.fromRect({
    x: n.x,
    y: n.y,
    width: Dn,
    height: Dn
  });
}
function si(e) {
  var t = e.clientRect;
  return {
    left: "".concat(t.left, "px"),
    top: "".concat(t.top, "px"),
    width: "".concat(t.width, "px"),
    height: "".concat(t.height, "px")
  };
}
function Pp(e) {
  var t = e.client, n = e.clientRect;
  return (
    // is within horizontal bounds
    t.x >= n.x && t.x <= n.x + n.width && // is within vertical bounds
    t.y >= n.y && t.y <= n.y + n.height
  );
}
function Tp(e) {
  var t = e.initial, n = document.createElement("div");
  n.setAttribute(ta, "true"), go() && n.setAttribute("popover", "manual");
  var r = oi({
    client: t
  });
  Object.assign(n.style, ni(ni({
    position: "fixed"
  }, go() ? (
    // needs to come first as it has 'inset: unset' which
    // needs to be overridden by our top / left values
    Ip
  ) : {
    // Fallback: using maximum possible z-index so that this element
    // will always be on top of other positioned content.
    zIndex: Cp
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
  }, si({
    clientRect: r
  }))), document.body.appendChild(n), go() && n.showPopover();
  var o = Bt.bind(window, {
    type: "pointermove",
    listener: function(i) {
      var l = {
        x: i.clientX,
        y: i.clientY
      };
      r = oi({
        client: l
      }), Object.assign(n.style, si({
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
    if (o(), Pp({
      client: l,
      clientRect: r
    })) {
      n.remove();
      return;
    }
    function a() {
      f(), n.remove();
    }
    var f = Bt.bindAll(window, [
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
function kp() {
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
        var a = l.location.initial.input, f = e ?? {
          x: a.clientX,
          y: a.clientY
        };
        r = Tp({
          initial: f
        });
      }
      if (i === "onDrop") {
        var d, v = l.location.current.input;
        (d = r) === null || d === void 0 || d({
          current: {
            x: v.clientX,
            y: v.clientY
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
function Dp(e) {
  if (Array.isArray(e)) return Fo(e);
}
function Fp(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function Hp() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function oa(e) {
  return Dp(e) || Fp(e) || Ql(e) || Hp();
}
var jp = Wt(function() {
  return navigator.userAgent.includes("Firefox");
}), ss = Wt(function() {
  var t = navigator, n = t.userAgent;
  return n.includes("AppleWebKit") && !n.includes("Chrome");
});
function Lp(e) {
  return "nodeName" in e;
}
function Kp(e) {
  return Lp(e) && e.ownerDocument !== document;
}
var Ho = {
  isLeavingWindow: Symbol("leaving"),
  isEnteringWindow: Symbol("entering")
};
(function() {
  if (typeof window > "u" || !ss())
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
        !n.isOverWindow && n.enterCount === 0 && (s[Ho.isEnteringWindow] = !0), n.isOverWindow = !0, n.enterCount++;
      }
    }, {
      type: "dragleave",
      listener: function(s) {
        n.enterCount--, n.isOverWindow && n.enterCount === 0 && (s[Ho.isLeavingWindow] = !0, n.isOverWindow = !1);
      }
    }],
    // using `capture: true` so that adding event listeners
    // in bubble phase will have the correct symbols
    {
      capture: !0
    }
  );
})();
function Vp(e) {
  var t = e.dragLeave;
  return ss() ? t.hasOwnProperty(Ho.isLeavingWindow) : !1;
}
function Bp(e) {
  var t = e.dragLeave, n = t.type, r = t.relatedTarget;
  return n !== "dragleave" ? !1 : ss() ? Vp({
    dragLeave: t
  }) : r == null ? !0 : jp() ? Kp(r) : r instanceof HTMLIFrameElement;
}
function $p(e) {
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
var Np = function(t) {
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
}, ho = Np(function(e) {
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
function Wp(e) {
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
      var f = a.nativeSetDragImage, d = {
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
      var f = a.current;
      or.flush(), ho.cancel(), s({
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
    drag: function(a) {
      var f = a.current;
      ho(function() {
        or.flush();
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
    drop: function(a) {
      var f = a.current, d = a.updatedSourcePayload;
      or.flush(), ho.cancel(), s({
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
var jo = {
  isActive: !1
};
function sa() {
  return !jo.isActive;
}
function Up(e) {
  return e.dataTransfer ? e.dataTransfer.setDragImage.bind(e.dataTransfer) : null;
}
function zp(e) {
  var t = e.current, n = e.next;
  if (t.length !== n.length)
    return !0;
  for (var r = 0; r < t.length; r++)
    if (t[r].element !== n[r].element)
      return !0;
  return !1;
}
function qp(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = e.dispatchEvent;
  if (!sa())
    return;
  var s = Gp({
    event: t,
    dragType: n,
    getDropTargetsOver: r
  });
  jo.isActive = !0;
  var i = {
    current: s
  };
  vo({
    event: t,
    current: s.dropTargets
  });
  var l = Wp({
    source: n.payload,
    dispatchEvent: o,
    initial: s
  });
  function a(y) {
    var M = zp({
      current: i.current.dropTargets,
      next: y.dropTargets
    });
    i.current = y, M && l.dragUpdate({
      current: i.current
    });
  }
  function f(y) {
    var M = In(y), C = na(y.target) ? ra({
      x: M.clientX,
      y: M.clientY
    }) : y.target, T = r({
      target: C,
      input: M,
      source: n.payload,
      current: i.current.dropTargets
    });
    T.length && (y.preventDefault(), vo({
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
    }), v();
  }
  function v() {
    jo.isActive = !1, b();
  }
  var b = Bt.bindAll(
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
        f(M), l.drag({
          current: i.current
        });
      }
    }, {
      type: "dragenter",
      listener: f
    }, {
      type: "dragleave",
      listener: function(M) {
        Bp({
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
        M.preventDefault(), vo({
          event: M,
          current: i.current.dropTargets
        }), l.drop({
          current: i.current,
          // When dropping something native, we need to extract the latest
          // `.items` from the "drop" event as it is now accessible
          updatedSourcePayload: n.type === "external" ? n.getDropPayload(M) : null
        }), v();
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
    }].concat(oa($p({
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
    nativeSetDragImage: Up(t)
  });
}
function vo(e) {
  var t, n = e.event, r = e.current, o = (t = r[0]) === null || t === void 0 ? void 0 : t.dropEffect;
  o != null && n.dataTransfer && (n.dataTransfer.dropEffect = o);
}
function Gp(e) {
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
var ii = {
  canStart: sa,
  start: qp
}, Lo = /* @__PURE__ */ new Map();
function Yp(e) {
  var t = e.typeKey, n = e.mount, r = Lo.get(t);
  if (r)
    return r.usageCount++, r;
  var o = {
    typeKey: t,
    unmount: n(),
    usageCount: 1
  };
  return Lo.set(t, o), o;
}
function Xp(e) {
  var t = Yp(e);
  return function() {
    t.usageCount--, !(t.usageCount > 0) && (t.unmount(), Lo.delete(e.typeKey));
  };
}
function ia(e, t) {
  var n = t.attribute, r = t.value;
  return e.setAttribute(n, r), function() {
    return e.removeAttribute(n);
  };
}
function li(e, t) {
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
    t % 2 ? li(Object(n), !0).forEach(function(r) {
      Vn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : li(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function mo(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = Jp(e)) || t) {
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
  var s, i = !0, l = !1;
  return { s: function() {
    n = n.call(e);
  }, n: function() {
    var f = n.next();
    return i = f.done, f;
  }, e: function(f) {
    l = !0, s = f;
  }, f: function() {
    try {
      i || n.return == null || n.return();
    } finally {
      if (l) throw s;
    }
  } };
}
function Jp(e, t) {
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
function yo(e) {
  return e.slice(0).reverse();
}
function Zp(e) {
  var t = e.typeKey, n = e.defaultDropEffect, r = /* @__PURE__ */ new WeakMap(), o = "data-drop-target-for-".concat(t), s = "[".concat(o, "]");
  function i(y) {
    return r.set(y.element, y), function() {
      return r.delete(y.element);
    };
  }
  function l(y) {
    var M = Kr(ia(y.element, {
      attribute: o,
      value: "true"
    }), i(y));
    return Wt(M);
  }
  function a(y) {
    var M, C, T, F, I = y.source, K = y.target, E = y.input, $ = y.result, W = $ === void 0 ? [] : $;
    if (K == null)
      return W;
    if (!(K instanceof Element))
      return K instanceof Node ? a({
        source: I,
        target: K.parentElement,
        input: E,
        result: W
      }) : W;
    var de = K.closest(s);
    if (de == null)
      return W;
    var D = r.get(de);
    if (D == null)
      return W;
    var j = {
      input: E,
      source: I,
      element: D.element
    };
    if (D.canDrop && !D.canDrop(j))
      return a({
        source: I,
        target: D.element.parentElement,
        input: E,
        result: W
      });
    var G = (M = (C = D.getData) === null || C === void 0 ? void 0 : C.call(D, j)) !== null && M !== void 0 ? M : {}, pe = (T = (F = D.getDropEffect) === null || F === void 0 ? void 0 : F.call(D, j)) !== null && T !== void 0 ? T : n, se = {
      data: G,
      element: D.element,
      dropEffect: pe,
      // we are collecting _actual_ drop targets, so these are
      // being applied _not_ due to stickiness
      isActiveDueToStickiness: !1
    };
    return a({
      source: I,
      target: D.element.parentElement,
      input: E,
      // Using bubble ordering. Same ordering as `event.getPath()`
      result: [].concat(oa(W), [se])
    });
  }
  function f(y) {
    var M = y.eventName, C = y.payload, T = mo(C.location.current.dropTargets), F;
    try {
      for (T.s(); !(F = T.n()).done; ) {
        var I, K = F.value, E = r.get(K.element), $ = xt(xt({}, C), {}, {
          self: K
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
    onGenerateDragPreview: f,
    onDrag: f,
    onDragStart: f,
    onDrop: f,
    onDropTargetChange: function(M) {
      var C = M.payload, T = new Set(C.location.current.dropTargets.map(function(X) {
        return X.element;
      })), F = /* @__PURE__ */ new Set(), I = mo(C.location.previous.dropTargets), K;
      try {
        for (I.s(); !(K = I.n()).done; ) {
          var E, $ = K.value;
          F.add($.element);
          var W = r.get($.element), de = T.has($.element), D = xt(xt({}, C), {}, {
            self: $
          });
          if (W == null || (E = W.onDropTargetChange) === null || E === void 0 || E.call(W, D), !de) {
            var j;
            W == null || (j = W.onDragLeave) === null || j === void 0 || j.call(W, D);
          }
        }
      } catch (X) {
        I.e(X);
      } finally {
        I.f();
      }
      var G = mo(C.location.current.dropTargets), pe;
      try {
        for (G.s(); !(pe = G.n()).done; ) {
          var se, ve, Te = pe.value;
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
  function v(y) {
    d[y.eventName](y);
  }
  function b(y) {
    var M = y.source, C = y.target, T = y.input, F = y.current, I = a({
      source: M,
      target: C,
      input: T
    });
    if (I.length >= F.length)
      return I;
    for (var K = yo(F), E = yo(I), $ = [], W = 0; W < K.length; W++) {
      var de, D = K[W], j = E[W];
      if (j != null) {
        $.push(j);
        continue;
      }
      var G = $[W - 1], pe = K[W - 1];
      if ((G == null ? void 0 : G.element) !== (pe == null ? void 0 : pe.element))
        break;
      var se = r.get(D.element);
      if (!se)
        break;
      var ve = {
        input: T,
        source: M,
        element: se.element
      };
      if (se.canDrop && !se.canDrop(ve) || !((de = se.getIsSticky) !== null && de !== void 0 && de.call(se, ve)))
        break;
      $.push(xt(xt({}, D), {}, {
        // making it clear to consumers this drop target is active due to stickiness
        isActiveDueToStickiness: !0
      }));
    }
    return yo($);
  }
  return {
    dropTargetForConsumers: l,
    getIsOver: b,
    dispatchEvent: v
  };
}
function Qp(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = eg(e)) || t) {
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
  var s, i = !0, l = !1;
  return { s: function() {
    n = n.call(e);
  }, n: function() {
    var f = n.next();
    return i = f.done, f;
  }, e: function(f) {
    l = !0, s = f;
  }, f: function() {
    try {
      i || n.return == null || n.return();
    } finally {
      if (l) throw s;
    }
  } };
}
function eg(e, t) {
  if (e) {
    if (typeof e == "string") return ci(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? ci(e, t) : void 0;
  }
}
function ci(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function ui(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function tg(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ui(Object(n), !0).forEach(function(r) {
      Vn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ui(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function ng() {
  var e = /* @__PURE__ */ new Set(), t = null;
  function n(s) {
    t && (!s.canMonitor || s.canMonitor(t.canMonitorArgs)) && t.active.add(s);
  }
  function r(s) {
    var i = tg({}, s);
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
      var a = Qp(e), f;
      try {
        for (a.s(); !(f = a.n()).done; ) {
          var d = f.value;
          n(d);
        }
      } catch (T) {
        a.e(T);
      } finally {
        a.f();
      }
    }
    if (t) {
      for (var v = Array.from(t.active), b = 0, y = v; b < y.length; b++) {
        var M = y[b];
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
function rg(e) {
  var t = e.typeKey, n = e.mount, r = e.dispatchEventToSource, o = e.onPostDispatch, s = e.defaultDropEffect, i = ng(), l = Zp({
    typeKey: t,
    defaultDropEffect: s
  });
  function a(v) {
    r == null || r(v), l.dispatchEvent(v), i.dispatchEvent(v), o == null || o(v);
  }
  function f(v) {
    var b = v.event, y = v.dragType;
    ii.start({
      event: b,
      dragType: y,
      getDropTargetsOver: l.getIsOver,
      dispatchEvent: a
    });
  }
  function d() {
    function v() {
      var b = {
        canStart: ii.canStart,
        start: f
      };
      return n(b);
    }
    return Xp({
      typeKey: t,
      mount: v
    });
  }
  return {
    registerUsage: d,
    dropTarget: l.dropTargetForConsumers,
    monitor: i.monitorForConsumers
  };
}
var og = Wt(function() {
  return navigator.userAgent.toLocaleLowerCase().includes("android");
}), sg = "pdnd:android-fallback", fi = "text/plain", ig = "text/uri-list", lg = "application/vnd.pdnd", br = /* @__PURE__ */ new WeakMap();
function ag(e) {
  return br.set(e.element, e), function() {
    br.delete(e.element);
  };
}
var di = kp(), la = rg({
  typeKey: "element",
  defaultDropEffect: "move",
  mount: function(t) {
    return Kr(di.bindEvents(), Bt.bind(document, {
      type: "dragstart",
      listener: function(r) {
        var o, s, i, l, a, f;
        if (t.canStart(r) && !r.defaultPrevented && r.dataTransfer) {
          var d = r.target;
          if (d instanceof HTMLElement) {
            var v = br.get(d);
            if (v) {
              var b = In(r), y = {
                element: v.element,
                dragHandle: (o = v.dragHandle) !== null && o !== void 0 ? o : null,
                input: b
              };
              if (v.canDrag && !v.canDrag(y)) {
                r.preventDefault();
                return;
              }
              if (v.dragHandle) {
                var M = ra({
                  x: b.clientX,
                  y: b.clientY
                });
                if (!v.dragHandle.contains(M)) {
                  r.preventDefault();
                  return;
                }
              }
              var C = (s = (i = v.getInitialDataForExternal) === null || i === void 0 ? void 0 : i.call(v, y)) !== null && s !== void 0 ? s : null;
              if (C)
                for (var T = 0, F = Object.entries(C); T < F.length; T++) {
                  var I = ea(F[T], 2), K = I[0], E = I[1];
                  r.dataTransfer.setData(K, E ?? "");
                }
              og() && !r.dataTransfer.types.includes(fi) && !r.dataTransfer.types.includes(ig) && r.dataTransfer.setData(fi, sg), r.dataTransfer.setData(lg, "");
              var $ = {
                element: v.element,
                dragHandle: (l = v.dragHandle) !== null && l !== void 0 ? l : null,
                data: (a = (f = v.getInitialData) === null || f === void 0 ? void 0 : f.call(v, y)) !== null && a !== void 0 ? a : {}
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
  onPostDispatch: di.getOnPostDispatch()
}), cg = la.dropTarget;
function ug(e) {
  var t = Kr(
    // making the draggable register the adapter rather than drop targets
    // this is because you *must* have a draggable element to start a drag
    // but you _might_ not have any drop targets immediately
    // (You might create drop targets async)
    la.registerUsage(),
    ag(e),
    ia(e.element, {
      attribute: "draggable",
      value: "true"
    })
  );
  return Wt(t);
}
function fg(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
    if (t.indexOf(r) !== -1) continue;
    n[r] = e[r];
  }
  return n;
}
function dg(e, t) {
  if (e == null) return {};
  var n, r, o = fg(e, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    for (r = 0; r < s.length; r++) n = s[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (o[n] = e[n]);
  }
  return o;
}
function aa(e, t) {
  var n = Object.keys(e), r = Object.keys(t);
  return n.length !== r.length ? !1 : n.every(function(o) {
    return Object.is(e[o], t[o]);
  });
}
function pg() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : aa, t = null;
  return function(n) {
    return t && e(t.value, n) || (t = {
      value: n
    }), t.value;
  };
}
var gg = ["block"];
function pi(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function gi(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? pi(Object(n), !0).forEach(function(r) {
      Vn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : pi(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function hg(e) {
  return {
    x: (e.right + e.left) / 2,
    y: (e.bottom + e.top) / 2
  };
}
function wo(e) {
  var t = e.client, n = e.borderBox, r = n.height / 4;
  return t.y <= n.top + r ? "reorder-above" : t.y >= n.bottom - r ? "reorder-below" : "make-child";
}
function vg(e) {
  var t = e.element, n = e.input, r = e.currentLevel, o = e.indentPerLevel, s = e.mode, i = {
    x: n.clientX,
    y: n.clientY
  }, l = t.getBoundingClientRect();
  if (s === "standard") {
    var a = wo({
      borderBox: l,
      client: i
    });
    return {
      type: a,
      indentPerLevel: o,
      currentLevel: r
    };
  }
  var f = hg(l);
  if (s === "expanded") {
    var d = wo({
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
  var v = o * r;
  if (i.x < l.left + v) {
    if (i.y < f.y)
      return {
        type: "reorder-above",
        indentPerLevel: o,
        currentLevel: r
      };
    var b = (i.x - l.left) / o, y = Math.max(Math.floor(b), 0);
    return {
      type: "reparent",
      desiredLevel: y,
      indentPerLevel: o,
      currentLevel: r
    };
  }
  return {
    type: wo({
      borderBox: l,
      client: i
    }),
    indentPerLevel: o,
    currentLevel: r
  };
}
function ca(e, t) {
  return e.type !== t.type ? !1 : e.type === "instruction-blocked" && t.type === "instruction-blocked" ? ca(e.desired, t.desired) : aa(e, t);
}
var mg = pg(ca);
function yg(e) {
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
function wg(e, t) {
  var n = t.block, r = dg(t, gg), o = vg(r), s = yg({
    desired: o,
    block: n
  }), i = mg(s);
  return gi(gi({}, e), {}, Vn({}, ua, i));
}
function hi(e) {
  var t;
  return (t = e[ua]) !== null && t !== void 0 ? t : null;
}
var ua = Symbol("tree-item-instruction");
const bg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ef5350" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m6 10h-4v8a4 4 0 1 1-4-4 3.96 3.96 0 0 1 2 .555V8h6Z"/></svg>', _g = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#ff7043" d="M2 2a1 1 0 0 0-1 1v10c0 .554.446 1 1 1h12c.554 0 1-.446 1-1V3a1 1 0 0 0-1-1zm0 3h12v8H2zm1 2 2 2-2 2 1 1 3-3-3-3zm5 3.5V12h5v-1.5z"/></svg>', xg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#7e57c2" d="M20 18h-2v-2h-2v2c0 .193 0 .703 1.254 1.033A3.345 3.345 0 0 1 20 22h2v2h2v-2c0-.388-.562-.851-1.254-1.034C20.356 20.34 20 18.84 20 18m-3.254 2.966C14.356 20.34 14 18.84 14 18h-2v-2h-2v8h2v-2h4v2h2v-2c0-.388-.562-.851-1.254-1.034"/><path fill="#7e57c2" d="M24 4H4v20a4 4 0 0 0 4 4h16.16A3.84 3.84 0 0 0 28 24.16V8a4 4 0 0 0-4-4m2 14h-2v-2h-2v2c0 .193 0 .703 1.254 1.033A3.345 3.345 0 0 1 26 22v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1 2-2h2a2 2 0 0 1 2 2Z"/></svg>', Sg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ffca28" d="M16 24c-5.525 0-10-.9-10-2v4c0 1.1 4.475 2 10 2s10-.9 10-2v-4c0 1.1-4.475 2-10 2m0-8c-5.525 0-10-.9-10-2v4c0 1.1 4.475 2 10 2s10-.9 10-2v-4c0 1.1-4.475 2-10 2m0-12C10.477 4 6 4.895 6 6v4c0 1.1 4.475 2 10 2s10-.9 10-2V6c0-1.105-4.477-2-10-2"/></svg>', Rg = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/><path fill="#42a5f5" d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5z"/></svg>', Cg = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m8.668 6h3.6641l-3.6641-3.668v3.668m-4.668-4.668h5.332l4 4v8c0 0.73828-0.59375 1.3359-1.332 1.3359h-8c-0.73828 0-1.332-0.59766-1.332-1.3359v-10.664c0-0.74219 0.59375-1.3359 1.332-1.3359m3.332 1.3359h-3.332v10.664h8v-6h-4.668z" fill="#90a4ae" /></svg>', Ig = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m6.922 3.768-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232" fill="#90a4ae" /></svg>', Mg = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.483 6H4.721a1 1 0 0 0-.949.684L2 12V5h12a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232l-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h11l2.403-5.606A1 1 0 0 0 14.483 6" fill="#90a4ae" /></svg>', Eg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#e65100" d="m4 4 2 22 10 2 10-2 2-22Zm19.72 7H11.28l.29 3h11.86l-.802 9.335L15.99 25l-6.635-1.646L8.93 19h3.02l.19 2 3.86.77 3.84-.77.29-4H8.84L8 8h16Z"/></svg>', Ag = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#26a69a" d="M8.5 6h4l-4-4zM3.875 1H9.5l4 4v8.6c0 .773-.616 1.4-1.375 1.4h-8.25c-.76 0-1.375-.627-1.375-1.4V2.4c0-.777.612-1.4 1.375-1.4M4 13.6h8V8l-2.625 2.8L8 9.4zm1.25-7.7c-.76 0-1.375.627-1.375 1.4s.616 1.4 1.375 1.4c.76 0 1.375-.627 1.375-1.4S6.009 5.9 5.25 5.9"/></svg>', Og = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#ffca28" d="M2 2v12h12V2zm6 6h1v4a1.003 1.003 0 0 1-1 1H7a1.003 1.003 0 0 1-1-1v-1h1v1h1zm3 0h2v1h-2v1h1a1.003 1.003 0 0 1 1 1v1a1.003 1.003 0 0 1-1 1h-2v-1h2v-1h-1a1.003 1.003 0 0 1-1-1V9a1.003 1.003 0 0 1 1-1"/></svg>', Pg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path fill="#f9a825" d="M560-160v-80h120q17 0 28.5-11.5T720-280v-80q0-38 22-69t58-44v-14q-36-13-58-44t-22-69v-80q0-17-11.5-28.5T680-720H560v-80h120q50 0 85 35t35 85v80q0 17 11.5 28.5T840-560h40v160h-40q-17 0-28.5 11.5T800-360v80q0 50-35 85t-85 35zm-280 0q-50 0-85-35t-35-85v-80q0-17-11.5-28.5T120-400H80v-160h40q17 0 28.5-11.5T160-600v-80q0-50 35-85t85-35h120v80H280q-17 0-28.5 11.5T240-680v80q0 38-22 69t-58 44v14q36 13 58 44t22 69v80q0 17 11.5 28.5T280-240h120v80z"/></svg>', Tg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#42a5f5" d="m14 10-4 3.5L6 10H4v12h4v-6l2 2 2-2v6h4V10zm12 6v-6h-4v6h-4l6 8 6-8z"/></svg>', kg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ef5350" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m4.93 10.44c.41.9.93 1.64 1.53 2.15l.41.32c-.87.16-2.07.44-3.34.93l-.11.04.5-1.04c.45-.87.78-1.66 1.01-2.4m6.48 3.81c.18-.18.27-.41.28-.66.03-.2-.02-.39-.12-.55-.29-.47-1.04-.69-2.28-.69l-1.29.07-.87-.58c-.63-.52-1.2-1.43-1.6-2.56l.04-.14c.33-1.33.64-2.94-.02-3.6a.85.85 0 0 0-.61-.24h-.24c-.37 0-.7.39-.79.77-.37 1.33-.15 2.06.22 3.27v.01c-.25.88-.57 1.9-1.08 2.93l-.96 1.8-.89.49c-1.2.75-1.77 1.59-1.88 2.12-.04.19-.02.36.05.54l.03.05.48.31.44.11c.81 0 1.73-.95 2.97-3.07l.18-.07c1.03-.33 2.31-.56 4.03-.75 1.03.51 2.24.74 3 .74.44 0 .74-.11.91-.3m-.41-.71.09.11c-.01.1-.04.11-.09.13h-.04l-.19.02c-.46 0-1.17-.19-1.9-.51.09-.1.13-.1.23-.1 1.4 0 1.8.25 1.9.35M7.83 17c-.65 1.19-1.24 1.85-1.69 2 .05-.38.5-1.04 1.21-1.69zm3.02-6.91c-.23-.9-.24-1.63-.07-2.05l.07-.12.15.05c.17.24.19.56.09 1.1l-.03.16-.16.82z"/></svg>', Dg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#e64a19" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zM8 11v2h1v6H8v1h4v-1h-1v-2h2a3 3 0 0 0 3-3 3 3 0 0 0-3-3zm5 2a1 1 0 0 1 1 1 1 1 0 0 1-1 1h-2v-2z"/></svg>', Fg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#0288d1" d="M9.86 2A2.86 2.86 0 0 0 7 4.86v1.68h4.29c.39 0 .71.57.71.96H4.86A2.86 2.86 0 0 0 2 10.36v3.781a2.86 2.86 0 0 0 2.86 2.86h1.18v-2.68a2.85 2.85 0 0 1 2.85-2.86h5.25c1.58 0 2.86-1.271 2.86-2.851V4.86A2.86 2.86 0 0 0 14.14 2zm-.72 1.61c.4 0 .72.12.72.71s-.32.891-.72.891c-.39 0-.71-.3-.71-.89s.32-.711.71-.711"/><path fill="#fdd835" d="M17.959 7v2.68a2.85 2.85 0 0 1-2.85 2.859H9.86A2.85 2.85 0 0 0 7 15.389v3.75a2.86 2.86 0 0 0 2.86 2.86h4.28A2.86 2.86 0 0 0 17 19.14v-1.68h-4.291c-.39 0-.709-.57-.709-.96h7.14A2.86 2.86 0 0 0 22 13.64V9.86A2.86 2.86 0 0 0 19.14 7zM8.32 11.513l-.004.004.038-.004zm6.54 7.276c.39 0 .71.3.71.89a.71.71 0 0 1-.71.71c-.4 0-.72-.12-.72-.71s.32-.89.72-.89"/></svg>', Hg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#8bc34a" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zm4 7.5h-4v2h1l-2 1.67L10 13h1v-2H7v2h1l3 2.5L8 18H7v2h4v-2h-1l2-1.67L14 18h-1v2h4v-2h-1l-3-2.5 3-2.5h1z"/></svg>', jg = '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 16 16"><path fill="#0288d1" d="M2 2v12h12V2zm4 6h3v1H8v4H7V9H6zm5 0h2v1h-2v1h1a1.003 1.003 0 0 1 1 1v1a1.003 1.003 0 0 1-1 1h-2v-1h2v-1h-1a1.003 1.003 0 0 1-1-1V9a1.003 1.003 0 0 1 1-1"/></svg>', Lg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ff9800" d="m24 6 2 6h-4l-2-6h-3l2 6h-4l-2-6h-3l2 6H8L6 6H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3V6Z"/></svg>', Kg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#01579b" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zM7 13l1.5 7h2l1.5-3 1.5 3h2l1.5-7h1v-2h-4v2h1l-.9 4.2L13 15h-2l-1.1 2.2L9 13h1v-2H6v2z"/></svg>', Vg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#8bc34a" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m.12 13.5 3.74 3.74 1.42-1.41-2.33-2.33 2.33-2.33-1.42-1.41zm11.16 0-3.74-3.74-1.42 1.41 2.33 2.33-2.33 2.33 1.42 1.41z"/></svg>', Bg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ff5252" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2m12 16v-2H9v2zm-4-4v-2H6v2z"/></svg>', $g = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#afb42b" d="M14 17h-2v-2h-2v-2h2v2h2m0-6h-2v2h2v2h-2v-2h-2V9h2V7h-2V5h2v2h2m5-4H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2"/></svg>', Ng = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Wg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Ug = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, zg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, qg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Gg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Yg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Xg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Jg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Zg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Qg = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, eh = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, th = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, nh = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, rh = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, oh = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, sh = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, ih = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, lh = ["aria-label"], ah = {
  key: 0,
  class: "pnl-tst-tsep",
  "aria-hidden": "true"
}, ch = {
  key: 1,
  class: "pnl-tst-search"
}, uh = ["innerHTML"], fh = ["value", "aria-label", "placeholder"], dh = ["aria-label", "aria-keyshortcuts", "aria-disabled", "title", "tabindex", "onClick", "onFocus"], ph = ["innerHTML"], gh = {
  key: 1,
  class: "pnl-tst-empty"
}, hh = ["aria-label", "aria-colcount", "aria-rowcount"], vh = {
  key: 0,
  class: "pnl-tst-head",
  role: "rowgroup"
}, mh = {
  class: "pnl-tst-hrow",
  role: "row",
  "aria-rowindex": 1
}, yh = ["aria-colindex"], wh = {
  class: "pnl-tst-body",
  role: "rowgroup"
}, bh = ["aria-level", "aria-posinset", "aria-setsize", "aria-rowindex", "aria-expanded", "aria-selected", "tabindex", "onClick", "onFocus"], _h = ["aria-colindex"], xh = ["onClick"], Sh = {
  key: 1,
  class: "pnl-tst-twisty pnl-tst-twisty--leaf",
  "aria-hidden": "true"
}, Rh = ["checked", ".indeterminate", "aria-label", "onClick"], Ch = ["innerHTML"], Ih = ["value", "aria-label", "onKeydown", "onBlur"], Mh = {
  key: 2,
  class: "pnl-tst-value"
}, Eh = {
  key: 3,
  class: "pnl-tst-modal"
}, Ah = {
  id: "pnl-tst-confirm-message",
  class: "pnl-tst-dialog-message"
}, Oh = { class: "pnl-tst-dialog-actions" }, Ph = "title", sr = "search", Xt = "|", mn = "pnl-tst-row", Th = 500, kh = {
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
      rowExpandingFeature: Jd,
      rowSelectionFeature: up,
      coreRowModel: Bl(),
      expandedRowModel: fp()
    }, r = Y(() => (t.state.columns || []).length > 0), o = Y(() => {
      const c = t.state.columns || [];
      return c.length === 0 ? [{ id: Ph, header: "", accessorFn: (u) => u.title }] : c.map((u) => {
        const h = u.field ?? u.id;
        return {
          id: u.id,
          header: u.header ?? u.id,
          accessorFn: (w) => w[h],
          meta: { width: u.width }
        };
      });
    }), s = /* @__PURE__ */ be(i(t.state.expandedKeys));
    function i(c) {
      const u = {};
      for (const h of c || []) u[h] = !0;
      return u;
    }
    function l(c) {
      return c === !0 ? F.getCoreRowModel().flatRows.filter((u) => u.subRows.length > 0).map((u) => u.id).sort() : Object.keys(c).filter((u) => c[u]).sort();
    }
    const a = {
      audio: bg,
      console: _g,
      css: xg,
      database: Sg,
      document: Rg,
      file: Cg,
      folder: Ig,
      "folder-open": Mg,
      html: Eg,
      image: Ag,
      javascript: Og,
      json: Pg,
      markdown: Tg,
      pdf: kg,
      powerpoint: Dg,
      python: Fg,
      table: Hg,
      typescript: jg,
      video: Lg,
      word: Kg,
      xml: Vg,
      yaml: Bg,
      zip: $g
    };
    function f(c) {
      return c ? { ...a, ...t.state.icons || {} }[c] ?? null : null;
    }
    function d(c) {
      const u = c.original.icon;
      return u ? (Ge(c) ? f(`${u}-open`) : null) ?? f(u) : null;
    }
    function v(c, u) {
      return c.length !== u.length ? !1 : c.every((h, w) => h === u[w]);
    }
    const b = Y(() => t.state.options.select_mode ?? "none"), y = Y(() => b.value !== "none"), M = Y(() => b.value === "hierarchy"), C = Y(
      () => y.value && t.state.options.show_checkboxes !== !1
    ), T = /* @__PURE__ */ be(i(t.state.selectedKeys)), F = hp({
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
      enableMultiRowSelection: Y(() => b.value !== "single"),
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
      const u = c.subRows.map(I);
      return u.every((h) => h === "all") ? "all" : u.some((h) => h !== "none") ? "some" : "none";
    }
    _e(() => l(T.value), t.setSelectedKeys, { flush: "post" }), _e(() => l(s.value), t.setExpandedKeys, { flush: "post" }), _e(
      () => t.state.expandedKeys,
      (c) => {
        v(l(s.value), [...c || []].sort()) || (s.value = i(c));
      }
    ), _e(
      () => t.state.selectedKeys,
      (c) => {
        v(l(T.value), [...c || []].sort()) || (T.value = i(c));
      }
    ), _e(
      () => [t.state.options.expand_all, t.state.source],
      ([c]) => {
        c && F.toggleAllRowsExpanded(!0);
      },
      { immediate: !0 }
    );
    const K = Y(() => (t.state.filterText ?? "").trim().toLowerCase()), E = Y(() => K.value.length > 0), $ = /* @__PURE__ */ be(t.state.filterText ?? "");
    _e(
      () => t.state.filterText,
      (c) => {
        $.value = c ?? "";
      }
    );
    function W(c) {
      $.value = c, t.setFilterText(c);
    }
    function de(c) {
      return c.getAllCells().some((u) => String(u.getValue() ?? "").toLowerCase().includes(K.value));
    }
    const D = Y(() => {
      if (!E.value) return F.getRowModel().rows;
      const c = /* @__PURE__ */ new Set();
      for (const u of F.getCoreRowModel().flatRows)
        if (de(u)) {
          c.add(u.id);
          for (let h = u.getParentRow(); h; h = h.getParentRow()) c.add(h.id);
        }
      return F.getCoreRowModel().flatRows.filter((u) => c.has(u.id));
    }), j = Y(() => {
      var c;
      return ((c = F.getHeaderGroups()[0]) == null ? void 0 : c.headers) ?? [];
    }), G = Y(() => t.state.options.indent_px ?? 16), pe = Y(() => t.state.options.aria_label ?? "Tree table"), se = Y(() => E.value ? "No matches" : "No data"), ve = Y(() => r.value ? 2 : 1), Te = Y(() => D.value.length + (r.value ? 1 : 0)), Me = Y(() => {
      const c = /* @__PURE__ */ new Map();
      for (const u of D.value) {
        const h = u.parentId ?? "", w = c.get(h) ?? [];
        w.push(u.id), c.set(h, w);
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
    function Fe(c) {
      return E.value ? (Me.value.get(c.id) ?? []).length > 0 : c.getCanExpand();
    }
    function Ge(c) {
      return E.value ? Fe(c) : c.getIsExpanded();
    }
    function Ne(c) {
      var h;
      const u = (h = c.meta) == null ? void 0 : h.width;
      return u ? { flex: `0 0 ${u}px` } : { flex: "1 1 0" };
    }
    function Le(c, u) {
      return { ...Ne(u), paddingInlineStart: `${c.depth * G.value}px` };
    }
    const mt = /* @__PURE__ */ be(null), yt = /* @__PURE__ */ be(!0), Ut = /* @__PURE__ */ new Map();
    function Ke(c) {
      mt.value = c, yt.value = !0;
    }
    function zt(c, u) {
      u ? Ut.set(c, u) : Ut.delete(c);
    }
    const wt = Y(() => {
      const c = D.value;
      return c.length === 0 ? null : c.some((u) => u.id === mt.value) ? mt.value : c[0].id;
    });
    function ke(c) {
      c != null && (Ke(c), St(() => {
        var u;
        return (u = Ut.get(c)) == null ? void 0 : u.focus();
      }));
    }
    function Ye(c) {
      const u = D.value;
      u.length !== 0 && ke(u[Math.max(0, Math.min(c, u.length - 1))].id);
    }
    function Br(c, u) {
      const h = D.value;
      if (h.length === 0) return;
      const w = h[Math.max(0, Math.min(c, h.length - 1))], H = (u == null ? void 0 : u.shiftKey) && y.value && b.value !== "single";
      H && g.value === null && (g.value = wt.value), ke(w.id), H && R(w, !1);
    }
    function p(c) {
      const u = D.value;
      if (u.length === 0) return;
      const h = Math.max(
        0,
        u.findIndex((z) => z.id === wt.value)
      ), w = u[h];
      if (c.ctrlKey || c.metaKey) {
        const z = {
          a: "select-all",
          c: "copy",
          f: sr,
          v: "paste",
          x: "cut",
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
      const H = {
        Insert: c.shiftKey ? "new-file" : "new-folder",
        F2: "rename",
        Delete: "delete",
        Escape: "clear-selection"
      }[c.key];
      if (H && Et(H)) {
        c.preventDefault(), we(H);
        return;
      }
      switch (c.key) {
        case "ArrowDown":
          c.preventDefault(), Br(h + 1, c);
          break;
        case "ArrowUp":
          c.preventDefault(), Br(h - 1, c);
          break;
        case "ArrowRight":
          if (c.preventDefault(), !Fe(w)) break;
          Ge(w) ? Ye(h + 1) : (w.toggleExpanded(!0), ke(w.id));
          break;
        case "ArrowLeft":
          c.preventDefault(), !E.value && w.getCanExpand() && w.getIsExpanded() ? (w.toggleExpanded(!1), ke(w.id)) : w.parentId && ke(w.parentId);
          break;
        case "Home":
          c.preventDefault(), Ye(0);
          break;
        case "End":
          c.preventDefault(), Ye(u.length - 1);
          break;
        case "Enter":
          c.preventDefault(), t.emitEvent("activate", { key: w.id });
          break;
        case " ":
          if (!y.value) break;
          c.preventDefault(), B(w);
          break;
      }
    }
    const g = /* @__PURE__ */ be(null);
    function m(c) {
      g.value = c.id, T.value = {}, c.toggleSelected(!0, { selectChildren: !1 });
    }
    function R(c, u) {
      const h = D.value, w = h.findIndex((Be) => Be.id === g.value), H = h.findIndex((Be) => Be.id === c.id);
      if (H === -1) return;
      if (w === -1) {
        m(c);
        return;
      }
      u || (T.value = {});
      const [z, he] = w <= H ? [w, H] : [H, w];
      for (let Be = z; Be <= he; Be += 1)
        h[Be].toggleSelected(!0, { selectChildren: !1 });
    }
    const S = Y(() => t.state.options.toggle_on_click === !0);
    function _(c) {
      const u = l(T.value);
      return u.length === 1 && u[0] === c.id;
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
    function A(c, u) {
      Ke(c.id);
      const h = !!(u != null && u.shiftKey || u != null && u.ctrlKey || u != null && u.metaKey);
      y.value && !h && S.value && _(c) ? P() : y.value && b.value !== "single" ? u != null && u.shiftKey ? R(c, u.ctrlKey || u.metaKey) : u != null && u.ctrlKey || u != null && u.metaKey ? (g.value = c.id, L(c)) : m(c) : y.value && m(c), t.emitEvent("activate", { key: c.id });
    }
    function x(c) {
      Ke(c.id), !E.value && c.toggleExpanded();
    }
    function V(c) {
      return I(c) === "all";
    }
    function k(c) {
      return I(c) === "some";
    }
    function L(c) {
      Ke(c.id), c.toggleSelected(void 0, { selectChildren: !1 }), O();
    }
    function B(c) {
      Ke(c.id), c.toggleSelected(!V(c), {
        selectChildren: M.value,
        deselectParents: M.value
      }), O();
    }
    function q(c) {
      B(c), ke(c.id);
    }
    const J = {
      "new-folder": { icon: Xg, label: "New folder", keys: "Insert", node: {} },
      "new-file": {
        icon: Yg,
        label: "New file",
        keys: "Shift+Insert",
        node: { allow_children: !1 }
      },
      rename: { icon: Qg, label: "Rename", keys: "F2" },
      delete: { icon: sh, label: "Delete", keys: "Delete" },
      undo: { icon: ih, label: "Undo", keys: "Control+Z" },
      redo: { icon: eh, label: "Redo", keys: "Control+Shift+Z" },
      cut: { icon: th, label: "Cut", keys: "Control+X" },
      copy: { icon: Gg, label: "Copy", keys: "Control+C" },
      paste: { icon: qg, label: "Paste", keys: "Control+V" },
      "move-up": { icon: Wg, label: "Move up", keys: "Alt+ArrowUp" },
      "move-down": { icon: Ng, label: "Move down", keys: "Alt+ArrowDown" },
      outdent: { icon: Jg, label: "Outdent", keys: "Alt+ArrowLeft" },
      indent: { icon: Zg, label: "Indent", keys: "Alt+ArrowRight" },
      "expand-all": { icon: Ug, label: "Expand all" },
      "collapse-all": { icon: zg, label: "Collapse all" },
      "select-all": { icon: oh, label: "Select all", keys: "Control+A" },
      "clear-selection": { icon: rh, label: "Clear selection", keys: "Escape" }
    }, Z = [
      "undo",
      "redo",
      Xt,
      "new-folder",
      "new-file",
      "rename",
      "delete",
      Xt,
      "cut",
      "copy",
      "paste",
      Xt,
      "move-up",
      "move-down",
      "outdent",
      "indent",
      Xt,
      "expand-all",
      "collapse-all",
      Xt,
      "select-all",
      "clear-selection",
      sr
    ], ce = Y(() => {
      const c = t.state.options.toolbar, u = c === !0 ? Z : Array.isArray(c) ? c : [], h = [];
      return u.forEach((w, H) => {
        const z = typeof w == "string" ? {} : w || {}, he = typeof w == "string" ? w : z.id, Be = `${he}#${H}`;
        if (he === Xt || he === sr) {
          h.push({ uid: Be, id: he });
          return;
        }
        const gn = J[he];
        if (!gn) return;
        const ms = z.label ?? gn.label;
        h.push({
          uid: Be,
          id: he,
          label: ms,
          icon: f(z.icon) ?? gn.icon,
          keys: gn.keys,
          node: { title: ms, ...gn.node ?? {}, ...z.node ?? {} }
        });
      }), h;
    }), me = Y(() => ce.value.length > 0), Ve = Y(() => t.state.options.toolbar_label ?? "Tree actions"), He = Y(() => t.state.options.search_label ?? "Search");
    function bt(c) {
      return ce.value.find((u) => u.id === c) ?? null;
    }
    function Et(c) {
      return bt(c) !== null;
    }
    function we(c) {
      const u = bt(c);
      u && fs(u);
    }
    const ue = Y(() => D.value.find((c) => c.id === wt.value) ?? null);
    function Bn(c) {
      return D.value.filter((u) => (u.parentId ?? "") === (c.parentId ?? ""));
    }
    function un() {
      const c = ue.value;
      if (!c) return [];
      const u = ps(c), h = c.parentId ?? "";
      return u.every((H) => {
        var z;
        return (((z = dn(H)) == null ? void 0 : z.parentId) ?? "") === h;
      }) ? u : [c.id];
    }
    function $r() {
      const c = ue.value;
      if (!c) return [];
      if (!y.value || !c.getIsSelected()) return [c.id];
      const u = D.value.filter((h) => h.getIsSelected()).map((h) => h.id);
      return u.length > 0 ? u : [c.id];
    }
    const Nr = Y(() => {
      var c;
      return ((c = t.state.clipboard) == null ? void 0 : c.keys) ?? [];
    }), fa = Y(() => {
      var u;
      const c = new Set(((u = t.state.clipboard) == null ? void 0 : u.mode) === "cut" ? Nr.value : []);
      return c.size === 0 || D.value.forEach((h) => {
        h.parentId && c.has(h.parentId) && c.add(h.id);
      }), c;
    });
    function qt(c) {
      const u = ue.value;
      if (!u) return null;
      const h = new Set(un()), w = Bn(u), H = w.map((he, Be) => h.has(he.id) ? Be : -1).filter((he) => he >= 0);
      if (H.length === 0) return null;
      let z = (c < 0 ? Math.min(...H) : Math.max(...H)) + c;
      for (; z >= 0 && z < w.length && h.has(w[z].id); ) z += c;
      return w[z] ?? null;
    }
    let Xe = null;
    _e(
      () => t.state.source,
      () => {
        const c = Xe;
        if (Xe = null, !!c) {
          if (c.key !== void 0) {
            ke(c.key);
            return;
          }
          St(() => {
            c.index !== void 0 ? Ye(c.index) : c.pasted !== void 0 ? pa(c.pasted) : da(c.added);
          });
        }
      }
    );
    function da(c) {
      const u = F.getCoreRowModel().flatRows.find((h) => !c.has(h.id));
      u && (ke(u.id), y.value && (T.value = {}, g.value = u.id, u.toggleSelected(!0, { selectChildren: !1 })), Et("rename") && St(() => Wn(u.id, !0)));
    }
    function pa(c) {
      const u = F.getCoreRowModel().flatRows.filter((H) => !c.has(H.id)), h = new Set(u.map((H) => H.id)), w = u.filter((H) => !h.has(H.parentId ?? ""));
      w.length !== 0 && (ke(w[0].id), y.value && (T.value = {}, g.value = w[0].id, w.forEach((H) => H.toggleSelected(!0, { selectChildren: !1 }))));
    }
    const Gt = /* @__PURE__ */ be(null), $n = /* @__PURE__ */ be(""), fn = /* @__PURE__ */ be(null), st = /* @__PURE__ */ be(null), Wr = /* @__PURE__ */ be(null), Ur = /* @__PURE__ */ be(null), ga = Y(() => t.state.options.extension_warning !== !1);
    function is(c) {
      const u = String(c ?? ""), h = u.lastIndexOf(".");
      return h < 0 ? "" : u.slice(h + 1).toLowerCase();
    }
    function ha(c, u) {
      return ga.value && c.allow_children === !1 && is(u) !== is(c.title ?? "");
    }
    let Nn = null;
    function Wn(c, u = !1) {
      const h = dn(c);
      h && (Nn = u ? c : null, $n.value = h.original.title ?? "", Gt.value = c, t.setEditingKey(c), St(() => {
        var w, H;
        (w = fn.value) == null || w.focus(), (H = fn.value) == null || H.select();
      }));
    }
    function Un() {
      Nn = null, st.value = null, Gt.value = null, t.setEditingKey("");
    }
    function ls(c) {
      if (st.value || Gt.value !== c.id) return;
      const u = $n.value.trim(), h = u.length > 0 && u !== (c.original.title ?? "");
      if (h && Nn !== c.id && ha(c.original, u)) {
        st.value = { key: c.id, title: u, previous: c.original.title ?? c.id }, St(() => {
          var w;
          return (w = Ur.value) == null ? void 0 : w.focus();
        });
        return;
      }
      if (Un(), !h) {
        ke(c.id);
        return;
      }
      Xe = { key: c.id }, t.emitEvent("rename", { key: c.id, title: u });
    }
    function as() {
      const { key: c, title: u } = st.value;
      st.value = null, Un(), Xe = { key: c }, t.emitEvent("rename", { key: c, title: u });
    }
    function cs() {
      st.value = null, St(() => {
        var c, u;
        (c = fn.value) == null || c.focus(), (u = fn.value) == null || u.select();
      });
    }
    function va(c) {
      var w;
      const u = c.key;
      if (u === "Escape" || u === "n" || u === "N") {
        c.preventDefault(), cs();
        return;
      }
      if (u === "y" || u === "Y") {
        c.preventDefault(), as();
        return;
      }
      if (u !== "Tab" && u !== "ArrowLeft" && u !== "ArrowRight") return;
      c.preventDefault(), (w = (c.target === Wr.value ? Ur : Wr).value) == null || w.focus();
    }
    function ma(c) {
      if (Gt.value !== c.id) return;
      const u = Nn === c.id;
      if (Un(), !u) {
        ke(c.id);
        return;
      }
      Xe = { index: D.value.findIndex((h) => h.id === c.id) }, t.emitEvent("delete", { key: c.id, keys: [c.id] });
    }
    function ya(c, u) {
      u.key === "Enter" ? (u.preventDefault(), ls(c)) : u.key === "Escape" && (u.preventDefault(), ma(c));
    }
    _e(
      () => t.state.editingKey,
      (c) => {
        (c || "") !== (Gt.value || "") && (c ? Wn(c) : Un());
      }
    ), Co(() => {
      t.state.editingKey && Wn(t.state.editingKey);
    });
    function zn(c, u) {
      const h = ue.value;
      !h || !c || (Xe = { key: h.id }, t.emitEvent("move", {
        key: h.id,
        keys: un(),
        position: u,
        anchorKey: c.id
      }));
    }
    function wa(c) {
      const u = ue.value, h = u ? u.original.allow_children === !1 ? "after" : "child" : null;
      u && h === "child" && !E.value && u.toggleExpanded(!0), Xe = { added: new Set(F.getCoreRowModel().flatRows.map((w) => w.id)) }, t.emitEvent("add", { anchorKey: (u == null ? void 0 : u.id) ?? null, position: h, node: c.node });
    }
    function ba() {
      var u;
      const c = $r();
      c.length !== 0 && (Xe = { index: D.value.findIndex((h) => {
        var w;
        return h.id === ((w = ue.value) == null ? void 0 : w.id);
      }) }, t.emitEvent("delete", { key: ((u = ue.value) == null ? void 0 : u.id) ?? null, keys: c }));
    }
    function _a(c) {
      Xe = { index: D.value.findIndex((u) => {
        var h;
        return u.id === ((h = ue.value) == null ? void 0 : h.id);
      }) }, t.emitEvent(c, {});
    }
    function xa(c) {
      var h;
      const u = $r();
      u.length !== 0 && t.emitEvent(c, { key: ((h = ue.value) == null ? void 0 : h.id) ?? null, keys: u });
    }
    function Sa() {
      var w;
      const c = ue.value, u = c ? c.original.allow_children === !1 ? "after" : "child" : null;
      c && u === "child" && !E.value && c.toggleExpanded(!0);
      const h = Nr.value;
      Xe = ((w = t.state.clipboard) == null ? void 0 : w.mode) === "cut" ? { key: h[0] } : { pasted: new Set(F.getCoreRowModel().flatRows.map((H) => H.id)) }, t.emitEvent("paste", { anchorKey: (c == null ? void 0 : c.id) ?? null, position: u });
    }
    function us(c) {
      var u;
      switch (c.id) {
        case "new-folder":
        case "new-file":
          return !0;
        case "rename":
          return ue.value !== null;
        case "delete":
        case "cut":
        case "copy":
          return $r().length > 0;
        case "paste":
          return Nr.value.length > 0;
        case "undo":
          return t.state.canUndo === !0;
        case "redo":
          return t.state.canRedo === !0;
        case "move-up":
          return qt(-1) !== null;
        case "move-down":
          return qt(1) !== null;
        case "indent": {
          const h = qt(-1);
          return h !== null && h.original.allow_children !== !1;
        }
        case "outdent":
          return !!((u = ue.value) != null && u.parentId);
        case "expand-all":
        case "collapse-all":
          return D.value.length > 0 && !E.value;
        case "select-all":
          return D.value.length > 0 && y.value && b.value !== "single";
        case "clear-selection":
          return y.value && l(T.value).length > 0;
        default:
          return !0;
      }
    }
    function Ra(c) {
      return c.keys ? `${c.label} (${c.keys.replace("Control", "Ctrl")})` : c.label;
    }
    function fs(c) {
      var u, h, w, H;
      if (us(c))
        switch (c.id) {
          case "new-folder":
          case "new-file":
            wa(c);
            break;
          case "rename":
            Wn(ue.value.id);
            break;
          case "delete":
            ba();
            break;
          case "undo":
          case "redo":
            _a(c.id);
            break;
          case "cut":
          case "copy":
            xa(c.id);
            break;
          case "paste":
            Sa();
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
            zn(dn((u = ue.value) == null ? void 0 : u.parentId), "after");
            break;
          case "expand-all":
            F.toggleAllRowsExpanded(!0);
            break;
          case "collapse-all":
            F.toggleAllRowsExpanded(!1);
            break;
          case "select-all":
            T.value = Object.fromEntries(D.value.map((z) => [z.id, !0])), g.value = ((h = D.value[0]) == null ? void 0 : h.id) ?? null;
            break;
          case "clear-selection":
            P();
            break;
          case sr:
            (w = zr.value) == null || w.focus(), (H = zr.value) == null || H.select();
            break;
        }
    }
    const zr = /* @__PURE__ */ be(null), qr = Y(() => ce.value.filter((c) => c.id in J)), qn = /* @__PURE__ */ be(null), Gr = /* @__PURE__ */ new Map(), ds = Y(() => {
      const c = qr.value;
      return c.length === 0 ? null : c.some((u) => u.uid === qn.value) ? qn.value : c[0].uid;
    });
    function Ca(c, u) {
      u ? Gr.set(c, u) : Gr.delete(c);
    }
    function Gn(c) {
      const u = qr.value;
      if (u.length === 0) return;
      const h = u[Math.max(0, Math.min(c, u.length - 1))].uid;
      qn.value = h, St(() => {
        var w;
        return (w = Gr.get(h)) == null ? void 0 : w.focus();
      });
    }
    function Ia(c) {
      const u = qr.value, h = Math.max(
        0,
        u.findIndex((w) => w.uid === ds.value)
      );
      switch (c.key) {
        case "ArrowRight":
          c.preventDefault(), Gn(h + 1);
          break;
        case "ArrowLeft":
          c.preventDefault(), Gn(h - 1);
          break;
        case "Home":
          c.preventDefault(), Gn(0);
          break;
        case "End":
          c.preventDefault(), Gn(u.length - 1);
          break;
      }
    }
    const Ma = ["reorder-above", "reorder-below", "make-child", "reparent"], Yr = Y(() => t.state.options.enable_dnd === !0), Xr = /* @__PURE__ */ be([]), Yn = /* @__PURE__ */ be(null);
    function dn(c) {
      return D.value.find((u) => u.id === c) ?? null;
    }
    function Ea(c, u) {
      let h = c;
      for (; h; ) {
        if (u.includes(h.id)) return !0;
        h = h.getParentRow();
      }
      return !1;
    }
    function ps(c) {
      if (!y.value || !c.getIsSelected()) return [c.id];
      const u = /* @__PURE__ */ new Set();
      for (let w = c.getParentRow(); w; w = w.getParentRow()) u.add(w.id);
      const h = D.value.filter((w) => w.getIsSelected() && !u.has(w.id)).map((w) => w.id);
      return h.length > 1 ? h : [c.id];
    }
    function Aa(c, u) {
      return Ea(c, u) ? Ma : c.original.allow_children === !1 ? ["make-child"] : [];
    }
    function Oa(c) {
      if (Fe(c) && Ge(c)) return "expanded";
      const u = te(c);
      return u[u.length - 1] === c.id ? "last-in-group" : "standard";
    }
    let Jr = null, pn = null;
    function Zr() {
      pn && clearTimeout(pn), pn = null, Jr = null;
    }
    function Pa(c, u) {
      if (Jr === c || (Zr(), !u || u.type === "instruction-blocked")) return;
      const h = dn(c);
      !h || !h.getCanExpand() || h.getIsExpanded() || (Jr = c, pn = setTimeout(() => {
        pn = null;
        const w = dn(c);
        w && w.getCanExpand() && !w.getIsExpanded() && w.toggleExpanded(!0);
      }, Th));
    }
    function Qr() {
      Yn.value = null, Zr();
    }
    const gs = /* @__PURE__ */ be(null);
    function Ta() {
      let c = gs.value;
      if (!c) return null;
      let u = c.getRootNode();
      for (; u.host; )
        c = u.host, u = c.getRootNode();
      return c;
    }
    function Xn(c) {
      for (const u of D.value) {
        const h = Ut.get(u.id);
        if (!h) continue;
        const w = h.getBoundingClientRect();
        if (c.clientX >= w.left && c.clientX < w.right && c.clientY >= w.top && c.clientY < w.bottom)
          return { row: u, element: h, rect: w };
      }
      return null;
    }
    function ka(c, u) {
      const h = ".pnl-tst-check, .pnl-tst-twisty, .pnl-tst-edit";
      for (const w of c.element.querySelectorAll(h)) {
        const H = w.getBoundingClientRect();
        if (u.clientX >= H.left && u.clientX < H.right && u.clientY >= H.top && u.clientY < H.bottom)
          return !0;
      }
      return !1;
    }
    let _t = null;
    function hs() {
      _t == null || _t(), _t = null;
      const c = Ta();
      !c || !Yr.value || (_t = Kr(
        ug({
          element: c,
          // Anything outside a row (the header, the empty space below the last row)
          // is not a drag handle, and returning false cancels the native drag.
          canDrag: ({ input: u }) => {
            const h = Xn(u);
            return h !== null && !ka(h, u);
          },
          getInitialData: ({ input: u }) => {
            const h = Xn(u);
            return h ? { type: mn, key: h.row.id, keys: ps(h.row) } : { type: mn, key: null, keys: [] };
          },
          onGenerateDragPreview: ({ location: u, nativeSetDragImage: h }) => {
            const w = u.current.input, H = Xn(w);
            !H || !h || h(H.element, w.clientX - H.rect.left, w.clientY - H.rect.top);
          },
          onDragStart: ({ source: u }) => {
            Xr.value = u.data.keys ?? [];
          },
          onDrop: () => {
            Xr.value = [], Qr();
          }
        }),
        cg({
          element: c,
          canDrop: ({ source: u }) => u.data.type === mn,
          getData: ({ input: u, source: h }) => {
            const w = Xn(u);
            if (!w) return { type: mn, key: null };
            const H = { type: mn, key: w.row.id };
            return wg(H, {
              element: w.element,
              input: u,
              currentLevel: w.row.depth,
              indentPerLevel: G.value,
              mode: Oa(w.row),
              block: Aa(w.row, h.data.keys ?? [])
            });
          },
          onDrag: ({ self: u }) => {
            const h = u.data.key, w = hi(u.data);
            Yn.value = h && w ? { key: h, instruction: w } : null, Pa(h ?? null, w);
          },
          onDragLeave: Qr,
          onDrop: ({ self: u, source: h }) => {
            Qr();
            const w = u.data.key, H = hi(u.data);
            if (!w || !H || H.type === "instruction-blocked") return;
            const z = h.data.keys ?? [];
            z.includes(w) || t.emitEvent("move", {
              key: h.data.key,
              keys: z,
              targetKey: w,
              instruction: H.type,
              desiredLevel: H.desiredLevel ?? H.currentLevel
            });
          }
        })
      ));
    }
    Co(hs), _e(Yr, hs), Zi(() => {
      Zr(), _t == null || _t();
    });
    function eo(c) {
      var u;
      return ((u = Yn.value) == null ? void 0 : u.key) === c.id ? Yn.value.instruction : null;
    }
    function Da(c) {
      const u = eo(c);
      return {
        "pnl-tst-row--draggable": Yr.value,
        "pnl-tst-row--dragging": Xr.value.includes(c.id),
        "pnl-tst-row--blocked": (u == null ? void 0 : u.type) === "instruction-blocked",
        "pnl-tst-row--child-target": (u == null ? void 0 : u.type) === "make-child"
      };
    }
    function vs(c) {
      const u = eo(c);
      return u ? u.type === "reorder-above" ? "pnl-tst-dropline--above" : u.type === "reorder-below" || u.type === "reparent" ? "pnl-tst-dropline--below" : null : null;
    }
    function Fa(c) {
      const u = eo(c);
      return u ? { insetInlineStart: `${(u.type === "reparent" ? u.desiredLevel : u.currentLevel) * u.indentPerLevel}px` } : null;
    }
    return (c, u) => (ie(), fe("div", {
      ref_key: "rootElement",
      ref: gs,
      class: "pnl-tst"
    }, [
      me.value ? (ie(), fe("div", {
        key: 0,
        class: "pnl-tst-toolbar",
        role: "toolbar",
        "aria-orientation": "horizontal",
        "aria-label": Ve.value
      }, [
        (ie(!0), fe(Oe, null, er(ce.value, (h) => (ie(), fe(Oe, {
          key: h.uid
        }, [
          h.id === "|" ? (ie(), fe("span", ah)) : h.id === "search" ? (ie(), fe("label", ch, [
            Se("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: Ht(nh)
            }, null, 8, uh),
            Se("input", {
              ref_for: !0,
              ref: (w) => zr.value = w,
              type: "search",
              value: $.value,
              "aria-label": He.value,
              placeholder: He.value,
              onInput: u[0] || (u[0] = (w) => W(w.target.value))
            }, null, 40, fh)
          ])) : (ie(), fe("button", {
            key: 2,
            ref_for: !0,
            ref: (w) => Ca(h.uid, w),
            type: "button",
            class: "pnl-tst-tbtn",
            "aria-label": h.label,
            "aria-keyshortcuts": h.keys,
            "aria-disabled": !us(h),
            title: Ra(h),
            tabindex: h.uid === ds.value ? 0 : -1,
            onClick: (w) => fs(h),
            onFocus: (w) => qn.value = h.uid,
            onKeydown: Ia
          }, [
            Se("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: h.icon
            }, null, 8, ph)
          ], 40, dh))
        ], 64))), 128))
      ], 8, lh)) : Pt("", !0),
      D.value.length === 0 ? (ie(), fe("div", gh, Jt(se.value), 1)) : (ie(), fe("div", {
        key: 2,
        class: "pnl-tst-grid",
        role: "treegrid",
        "aria-label": pe.value,
        "aria-colcount": j.value.length,
        "aria-rowcount": Te.value,
        onKeydown: p
      }, [
        r.value ? (ie(), fe("div", vh, [
          Se("div", mh, [
            (ie(!0), fe(Oe, null, er(j.value, (h, w) => (ie(), fe("div", {
              key: h.id,
              class: "pnl-tst-hcell",
              role: "columnheader",
              "aria-colindex": w + 1,
              style: tn(Ne(h.column.columnDef))
            }, Jt(h.column.columnDef.header), 13, yh))), 128))
          ])
        ])) : Pt("", !0),
        Se("div", wh, [
          (ie(!0), fe(Oe, null, er(D.value, (h, w) => (ie(), fe("div", {
            key: h.id,
            ref_for: !0,
            ref: (H) => zt(h.id, H),
            class: kt(["pnl-tst-row", [
              Da(h),
              {
                "pnl-tst-row--active": yt.value && h.id === mt.value,
                "pnl-tst-row--quiet": !yt.value && h.id === mt.value,
                "pnl-tst-row--cut": fa.value.has(h.id)
              }
            ]]),
            role: "row",
            "aria-level": h.depth + 1,
            "aria-posinset": X(h),
            "aria-setsize": ne(h),
            "aria-rowindex": w + ve.value,
            "aria-expanded": Fe(h) ? Ge(h) : void 0,
            "aria-selected": y.value ? h.getIsSelected() : void 0,
            tabindex: h.id === wt.value ? 0 : -1,
            onClick: (H) => A(h, H),
            onFocus: (H) => Ke(h.id)
          }, [
            vs(h) ? (ie(), fe("span", {
              key: 0,
              class: kt(["pnl-tst-dropline", vs(h)]),
              style: tn(Fa(h)),
              "aria-hidden": "true"
            }, null, 6)) : Pt("", !0),
            (ie(!0), fe(Oe, null, er(h.getAllCells(), (H, z) => (ie(), fe("div", {
              key: H.id,
              class: kt(["pnl-tst-cell", { "pnl-tst-cell--tree": z === 0 }]),
              role: "gridcell",
              "aria-colindex": z + 1,
              style: tn(
                z === 0 ? Le(h, H.column.columnDef) : Ne(H.column.columnDef)
              )
            }, [
              z === 0 ? (ie(), fe(Oe, { key: 0 }, [
                Fe(h) ? (ie(), fe("span", {
                  key: 0,
                  class: kt(["pnl-tst-twisty", { "pnl-tst-twisty--open": Ge(h) }]),
                  "aria-hidden": "true",
                  onClick: nr((he) => x(h), ["stop"])
                }, [...u[3] || (u[3] = [
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
                ])], 10, xh)) : (ie(), fe("span", Sh)),
                C.value ? (ie(), fe("input", {
                  key: 2,
                  class: "pnl-tst-check",
                  type: "checkbox",
                  tabindex: "-1",
                  checked: V(h),
                  ".indeterminate": k(h),
                  "aria-label": `Select ${h.original.title ?? h.id}`,
                  onClick: nr((he) => q(h), ["stop"])
                }, null, 40, Rh)) : Pt("", !0),
                d(h) ? (ie(), fe("span", {
                  key: 3,
                  class: "pnl-tst-icon",
                  "aria-hidden": "true",
                  innerHTML: d(h)
                }, null, 8, Ch)) : Pt("", !0)
              ], 64)) : Pt("", !0),
              z === 0 && Gt.value === h.id ? (ie(), fe("input", {
                key: 1,
                ref_for: !0,
                ref: (he) => fn.value = he,
                class: "pnl-tst-edit",
                type: "text",
                value: $n.value,
                "aria-label": `Rename ${h.original.title ?? h.id}`,
                onInput: u[1] || (u[1] = (he) => $n.value = he.target.value),
                onClick: u[2] || (u[2] = nr(() => {
                }, ["stop"])),
                onKeydown: nr((he) => ya(h, he), ["stop"]),
                onBlur: (he) => ls(h)
              }, null, 40, Ih)) : (ie(), fe("span", Mh, Jt(H.getValue()), 1))
            ], 14, _h))), 128))
          ], 42, bh))), 128))
        ])
      ], 40, hh)),
      st.value ? (ie(), fe("div", Eh, [
        Se("div", {
          class: "pnl-tst-dialog",
          role: "alertdialog",
          "aria-modal": "true",
          "aria-label": "Rename",
          "aria-describedby": "pnl-tst-confirm-message",
          onKeydown: va
        }, [
          Se("p", Ah, " Rename " + Jt(st.value.previous) + " to " + Jt(st.value.title) + "? If you change a file name extension, the file might become unusable. ", 1),
          Se("div", Oh, [
            Se("button", {
              ref_key: "confirmYesButton",
              ref: Wr,
              type: "button",
              class: "pnl-tst-dbtn",
              "aria-keyshortcuts": "Y",
              onClick: as
            }, [...u[4] || (u[4] = [
              Se("span", { class: "pnl-tst-dkey" }, "Y", -1),
              Oo("es ", -1)
            ])], 512),
            Se("button", {
              ref_key: "confirmNoButton",
              ref: Ur,
              type: "button",
              class: "pnl-tst-dbtn",
              "aria-keyshortcuts": "N",
              onClick: cs
            }, [...u[5] || (u[5] = [
              Se("span", { class: "pnl-tst-dkey" }, "N", -1),
              Oo("o ", -1)
            ])], 512)
          ])
        ], 32)
      ])) : Pt("", !0)
    ], 512));
  }
};
function Dh({ model: e, el: t }) {
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
    canRedo: e.get("can_redo") || !1,
    // Python holds the clipboard for the same reason it holds the tree: the keys
    // in it have to mean something there. The toolbar reads it to enable paste
    // and the grid reads it to fade the rows waiting to be moved.
    clipboard: e.get("clipboard") || {}
  }), o = 16, s = [];
  let i = 0;
  const l = (C, T) => {
    i += 1, s.push({ seq: i, event_name: C, event_params: T }), s.length > o && s.shift(), e.set("_event_data", { events: [...s], timestamp: Date.now() }), e.save_changes();
  }, a = (C, T) => C.length === T.length && C.every((F, I) => F === T[I]), f = (C) => (T) => {
    const F = [...e.get(C) || []].sort();
    a(F, T) || (e.set(C, T), e.save_changes());
  }, d = f("expanded_keys"), v = f("selected_keys"), M = nf(kh, {
    state: r,
    emitEvent: l,
    setExpandedKeys: d,
    setSelectedKeys: v,
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
  }), e.on("change:clipboard", () => {
    r.clipboard = e.get("clipboard") || {};
  }), () => {
    M.unmount();
  };
}
export {
  Dh as render
};

/**
* @vue/shared v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function Js(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const ve = {}, En = [], ft = () => {
}, ia = () => !1, bo = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), _o = (e) => e.startsWith("onUpdate:"), Pe = Object.assign, Qs = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Pf = Object.prototype.hasOwnProperty, ce = (e, t) => Pf.call(e, t), G = Array.isArray, Kt = (e) => xr(e) === "[object Map]", io = (e) => xr(e) === "[object Set]", rl = (e) => xr(e) === "[object Date]", X = (e) => typeof e == "function", Se = (e) => typeof e == "string", dt = (e) => typeof e == "symbol", ge = (e) => e !== null && typeof e == "object", la = (e) => (ge(e) || X(e)) && X(e.then) && X(e.catch), aa = Object.prototype.toString, xr = (e) => aa.call(e), Df = (e) => xr(e).slice(8, -1), ua = (e) => xr(e) === "[object Object]", ei = (e) => Se(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, ir = /* @__PURE__ */ Js(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), So = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, kf = /-\w/g, Qe = So(
  (e) => e.replace(kf, (t) => t.slice(1).toUpperCase())
), Tf = /\B([A-Z])/g, sn = So(
  (e) => e.replace(Tf, "-$1").toLowerCase()
), ca = So((e) => e.charAt(0).toUpperCase() + e.slice(1)), ds = So(
  (e) => e ? `on${ca(e)}` : ""
), ut = (e, t) => !Object.is(e, t), gs = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, fa = (e, t, n, r = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: r,
    value: n
  });
}, Ff = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let ol;
const xo = () => ol || (ol = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function it(e) {
  if (G(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], o = Se(r) ? zf(r) : it(r);
      if (o)
        for (const s in o)
          t[s] = o[s];
    }
    return t;
  } else if (Se(e) || ge(e))
    return e;
}
const Hf = /;(?![^(]*\))/g, Lf = /:([^]+)/, jf = /\/\*[^]*?\*\//g;
function zf(e) {
  const t = {};
  return e.replace(jf, "").split(Hf).forEach((n) => {
    if (n) {
      const r = n.split(Lf);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function Je(e) {
  let t = "";
  if (Se(e))
    t = e;
  else if (G(e))
    for (let n = 0; n < e.length; n++) {
      const r = Je(e[n]);
      r && (t += r + " ");
    }
  else if (ge(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Kf = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Vf = /* @__PURE__ */ Js(Kf);
function da(e) {
  return !!e || e === "";
}
function Bf(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let r = 0; n && r < e.length; r++)
    n = Ro(e[r], t[r]);
  return n;
}
function sl(e, t) {
  if (e.size !== t.size) return !1;
  const n = Array.from(t), r = new Uint8Array(n.length);
  for (const o of e) {
    let s = -1;
    for (let l = 0; l < n.length; l++)
      if (!r[l] && Ro(o, n[l])) {
        s = l;
        break;
      }
    if (s < 0) return !1;
    r[s] = 1;
  }
  return !0;
}
function Ro(e, t) {
  if (e === t) return !0;
  let n = rl(e), r = rl(t);
  if (n || r)
    return n && r ? e.getTime() === t.getTime() : !1;
  if (n = dt(e), r = dt(t), n || r)
    return e === t;
  if (n = G(e), r = G(t), n || r)
    return n && r ? Bf(e, t) : !1;
  if (n = ge(e), r = ge(t), n || r) {
    if (!n || !r)
      return !1;
    if (n = Kt(e), r = Kt(t), n || r || (n = io(e), r = io(t), n || r))
      return n && r ? sl(e, t) : !1;
    const o = Object.keys(e).length, s = Object.keys(t).length;
    if (o !== s)
      return !1;
    for (const l in e) {
      const a = e.hasOwnProperty(l), c = t.hasOwnProperty(l);
      if (a && !c || !a && c || !Ro(e[l], t[l]))
        return !1;
    }
  }
  return String(e) === String(t);
}
const ga = (e) => !!(e && e.__v_isRef === !0), Lt = (e) => Se(e) ? e : e == null ? "" : G(e) || ge(e) && (e.toString === aa || !X(e.toString)) ? ga(e) ? Lt(e.value) : JSON.stringify(e, pa, 2) : String(e), pa = (e, t) => ga(t) ? pa(e, t.value) : Kt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [r, o], s) => (n[ps(r, s) + " =>"] = o, n),
    {}
  )
} : io(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => ps(n))
} : dt(t) ? ps(t) : ge(t) && !G(t) && !ua(t) ? String(t) : t, ps = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    dt(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Me;
class Nf {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && Me && (Me.active ? (this.parent = Me, this.index = (Me.scopes || (Me.scopes = [])).push(
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
      const n = Me;
      try {
        return Me = this, t();
      } finally {
        Me = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Me, Me = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (Me === this)
        Me = this.prevScope;
      else {
        let t = Me;
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
function ha() {
  return Me;
}
function $f(e, t = !1) {
  Me && Me.cleanups.push(e);
}
let he;
const hs = /* @__PURE__ */ new WeakSet();
class va {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Me && (Me.active ? Me.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, hs.has(this) && (hs.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || ya(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, il(this), wa(this);
    const t = he, n = et;
    he = this, et = !0;
    try {
      return this.fn();
    } finally {
      ba(this), he = t, et = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        ri(t);
      this.deps = this.depsTail = void 0, il(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? hs.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Ds(this) && this.run();
  }
  get dirty() {
    return Ds(this);
  }
}
let ma = 0, lr, ar;
function ya(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = ar, ar = e;
    return;
  }
  e.next = lr, lr = e;
}
function ti() {
  ma++;
}
function ni() {
  if (--ma > 0)
    return;
  if (ar) {
    let t = ar;
    for (ar = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; lr; ) {
    let t = lr;
    for (lr = void 0; t; ) {
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
function wa(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function ba(e) {
  let t, n = e.depsTail, r = n;
  for (; r; ) {
    const o = r.prevDep;
    r.version === -1 ? (r === n && (n = o), ri(r), Wf(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = o;
  }
  e.deps = t, e.depsTail = n;
}
function Ds(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (_a(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function _a(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === pr) || (e.globalVersion = pr, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Ds(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = he, r = et;
  he = e, et = !0;
  try {
    wa(e);
    const o = e.fn(e._value);
    (t.version === 0 || ut(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    he = n, et = r, ba(e), e.flags &= -3;
  }
}
function ri(e, t = !1) {
  const { dep: n, prevSub: r, nextSub: o } = e;
  if (r && (r.nextSub = o, e.prevSub = void 0), o && (o.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
    n.computed.flags &= -5;
    for (let s = n.computed.deps; s; s = s.nextDep)
      ri(s, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Wf(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let et = !0;
const Sa = [];
function Ct() {
  Sa.push(et), et = !1;
}
function Mt() {
  const e = Sa.pop();
  et = e === void 0 ? !0 : e;
}
function il(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = he;
    he = void 0;
    try {
      t();
    } finally {
      he = n;
    }
  }
}
let pr = 0;
class Uf {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class oi {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!he || !et || he === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== he)
      n = this.activeLink = new Uf(he, this), he.deps ? (n.prevDep = he.depsTail, he.depsTail.nextDep = n, he.depsTail = n) : he.deps = he.depsTail = n, xa(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const r = n.nextDep;
      r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = he.depsTail, n.nextDep = void 0, he.depsTail.nextDep = n, he.depsTail = n, he.deps === n && (he.deps = r);
    }
    return n;
  }
  trigger(t) {
    this.version++, pr++, this.notify(t);
  }
  notify(t) {
    ti();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      ni();
    }
  }
}
function xa(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let r = t.deps; r; r = r.nextDep)
        xa(r);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const ks = /* @__PURE__ */ new WeakMap(), Jt = /* @__PURE__ */ Symbol(
  ""
), Ts = /* @__PURE__ */ Symbol(
  ""
), hr = /* @__PURE__ */ Symbol(
  ""
);
function Ae(e, t, n) {
  if (et && he) {
    let r = ks.get(e);
    r || ks.set(e, r = /* @__PURE__ */ new Map());
    let o = r.get(n);
    o || (r.set(n, o = new oi()), o.map = r, o.key = n), o.track();
  }
}
function xt(e, t, n, r, o, s) {
  const l = ks.get(e);
  if (!l) {
    pr++;
    return;
  }
  const a = (c) => {
    c && c.trigger();
  };
  if (ti(), t === "clear")
    l.forEach(a);
  else {
    const c = G(e), d = c && ei(n);
    if (c && n === "length") {
      const g = Number(r);
      l.forEach((h, y) => {
        (y === "length" || y === hr || !dt(y) && y >= g) && a(h);
      });
    } else
      switch ((n !== void 0 || l.has(void 0)) && a(l.get(n)), d && a(l.get(hr)), t) {
        case "add":
          c ? d && a(l.get("length")) : (a(l.get(Jt)), Kt(e) && a(l.get(Ts)));
          break;
        case "delete":
          c || (a(l.get(Jt)), Kt(e) && a(l.get(Ts)));
          break;
        case "set":
          Kt(e) && a(l.get(Jt));
          break;
      }
  }
  ni();
}
function Rn(e) {
  const t = /* @__PURE__ */ ue(e);
  return t === e ? t : (Ae(t, "iterate", hr), /* @__PURE__ */ Ge(e) ? t : t.map(tt));
}
function Co(e) {
  return Ae(e = /* @__PURE__ */ ue(e), "iterate", hr), e;
}
function lt(e, t) {
  return /* @__PURE__ */ It(e) ? Dn(/* @__PURE__ */ Qt(e) ? tt(t) : t) : tt(t);
}
const qf = {
  __proto__: null,
  [Symbol.iterator]() {
    return vs(this, Symbol.iterator, (e) => lt(this, e));
  },
  concat(...e) {
    return Rn(this).concat(
      ...e.map((t) => G(t) ? Rn(t) : t)
    );
  },
  entries() {
    return vs(this, "entries", (e) => (e[1] = lt(this, e[1]), e));
  },
  every(e, t) {
    return bt(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return bt(
      this,
      "filter",
      e,
      t,
      (n) => n.map((r) => lt(this, r)),
      arguments
    );
  },
  find(e, t) {
    return bt(
      this,
      "find",
      e,
      t,
      (n) => lt(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return bt(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return bt(
      this,
      "findLast",
      e,
      t,
      (n) => lt(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return bt(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return bt(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return ms(this, "includes", e);
  },
  indexOf(...e) {
    return ms(this, "indexOf", e);
  },
  join(e) {
    return Rn(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return ms(this, "lastIndexOf", e);
  },
  map(e, t) {
    return bt(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Qn(this, "pop");
  },
  push(...e) {
    return Qn(this, "push", e);
  },
  reduce(e, ...t) {
    return ll(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return ll(this, "reduceRight", e, t);
  },
  shift() {
    return Qn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return bt(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Qn(this, "splice", e);
  },
  toReversed() {
    return Rn(this).toReversed();
  },
  toSorted(e) {
    return Rn(this).toSorted(e);
  },
  toSpliced(...e) {
    return Rn(this).toSpliced(...e);
  },
  unshift(...e) {
    return Qn(this, "unshift", e);
  },
  values() {
    return vs(this, "values", (e) => lt(this, e));
  }
};
function vs(e, t, n) {
  const r = Co(e), o = r[t]();
  return r !== e && !/* @__PURE__ */ Ge(e) && (o._next = o.next, o.next = () => {
    const s = o._next();
    return s.done || (s.value = n(s.value)), s;
  }), o;
}
const Gf = Array.prototype;
function bt(e, t, n, r, o, s) {
  const l = Co(e), a = l !== e && !/* @__PURE__ */ Ge(e), c = l[t];
  if (c !== Gf[t]) {
    const h = c.apply(e, s);
    return a ? tt(h) : h;
  }
  let d = n;
  l !== e && (a ? d = function(h, y) {
    return n.call(this, lt(e, h), y, e);
  } : n.length > 2 && (d = function(h, y) {
    return n.call(this, h, y, e);
  }));
  const g = c.call(l, d, r);
  return a && o ? o(g) : g;
}
function ll(e, t, n, r) {
  const o = Co(e), s = o !== e && !/* @__PURE__ */ Ge(e);
  let l = n, a = !1;
  o !== e && (s ? (a = r.length === 0, l = function(d, g, h) {
    return a && (a = !1, d = lt(e, d)), n.call(this, d, lt(e, g), h, e);
  }) : n.length > 3 && (l = function(d, g, h) {
    return n.call(this, d, g, h, e);
  }));
  const c = o[t](l, ...r);
  return a ? lt(e, c) : c;
}
function ms(e, t, n) {
  const r = /* @__PURE__ */ ue(e);
  Ae(r, "iterate", hr);
  const o = r[t](...n);
  return (o === -1 || o === !1) && /* @__PURE__ */ li(n[0]) ? (n[0] = /* @__PURE__ */ ue(n[0]), r[t](...n)) : o;
}
function Qn(e, t, n = []) {
  Ct(), ti();
  const r = (/* @__PURE__ */ ue(e))[t].apply(e, n);
  return ni(), Mt(), r;
}
const Xf = /* @__PURE__ */ Js("__proto__,__v_isRef,__isVue"), Ra = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(dt)
);
function Yf(e) {
  dt(e) || (e = String(e));
  const t = /* @__PURE__ */ ue(this);
  return Ae(t, "has", e), t.hasOwnProperty(e);
}
class Ca {
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
      return r === (o ? s ? id : Aa : s ? Ea : Ia).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const l = G(t);
    if (!o) {
      let c;
      if (l && (c = qf[n]))
        return c;
      if (n === "hasOwnProperty")
        return Yf;
    }
    const a = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ Oe(t) ? t : r
    );
    if ((dt(n) ? Ra.has(n) : Xf(n)) || (o || Ae(t, "get", n), s))
      return a;
    if (/* @__PURE__ */ Oe(a)) {
      const c = l && ei(n) ? a : a.value;
      return o && ge(c) ? /* @__PURE__ */ Hs(c) : c;
    }
    return ge(a) ? o ? /* @__PURE__ */ Hs(a) : /* @__PURE__ */ Mo(a) : a;
  }
}
class Ma extends Ca {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, o) {
    let s = t[n];
    const l = G(t) && ei(n);
    if (!this._isShallow) {
      const d = /* @__PURE__ */ It(s);
      if (!/* @__PURE__ */ Ge(r) && !/* @__PURE__ */ It(r) && (s = /* @__PURE__ */ ue(s), r = /* @__PURE__ */ ue(r)), !l && /* @__PURE__ */ Oe(s) && !/* @__PURE__ */ Oe(r))
        return d || (s.value = r), !0;
    }
    const a = l ? Number(n) < t.length : ce(t, n), c = Reflect.set(
      t,
      n,
      r,
      /* @__PURE__ */ Oe(t) ? t : o
    );
    return t === /* @__PURE__ */ ue(o) && c && (a ? ut(r, s) && xt(t, "set", n, r) : xt(t, "add", n, r)), c;
  }
  deleteProperty(t, n) {
    const r = ce(t, n);
    t[n];
    const o = Reflect.deleteProperty(t, n);
    return o && r && xt(t, "delete", n, void 0), o;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!dt(n) || !Ra.has(n)) && Ae(t, "has", n), r;
  }
  ownKeys(t) {
    return Ae(
      t,
      "iterate",
      G(t) ? "length" : Jt
    ), Reflect.ownKeys(t);
  }
}
class Zf extends Ca {
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
const Jf = /* @__PURE__ */ new Ma(), Qf = /* @__PURE__ */ new Zf(), ed = /* @__PURE__ */ new Ma(!0);
const Fs = (e) => e, Ur = (e) => Reflect.getPrototypeOf(e);
function td(e, t, n) {
  return function(...r) {
    const o = this.__v_raw, s = /* @__PURE__ */ ue(o), l = Kt(s), a = e === "entries" || e === Symbol.iterator && l, c = e === "keys" && l, d = o[e](...r), g = n ? Fs : t ? Dn : tt;
    return !t && Ae(
      s,
      "iterate",
      c ? Ts : Jt
    ), Pe(
      // inheriting all iterator properties
      Object.create(d),
      {
        // iterator protocol
        next() {
          const { value: h, done: y } = d.next();
          return y ? { value: h, done: y } : {
            value: a ? [g(h[0]), g(h[1])] : g(h),
            done: y
          };
        }
      }
    );
  };
}
function qr(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function nd(e, t) {
  const n = {
    get(o) {
      const s = this.__v_raw, l = /* @__PURE__ */ ue(s), a = /* @__PURE__ */ ue(o);
      e || (ut(o, a) && Ae(l, "get", o), Ae(l, "get", a));
      const { has: c } = Ur(l), d = t ? Fs : e ? Dn : tt;
      if (c.call(l, o))
        return d(s.get(o));
      if (c.call(l, a))
        return d(s.get(a));
      s !== l && s.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && Ae(/* @__PURE__ */ ue(o), "iterate", Jt), o.size;
    },
    has(o) {
      const s = this.__v_raw, l = /* @__PURE__ */ ue(s), a = /* @__PURE__ */ ue(o);
      return e || (ut(o, a) && Ae(l, "has", o), Ae(l, "has", a)), o === a ? s.has(o) : s.has(o) || s.has(a);
    },
    forEach(o, s) {
      const l = this, a = l.__v_raw, c = /* @__PURE__ */ ue(a), d = t ? Fs : e ? Dn : tt;
      return !e && Ae(c, "iterate", Jt), a.forEach((g, h) => o.call(s, d(g), d(h), l));
    }
  };
  return Pe(
    n,
    e ? {
      add: qr("add"),
      set: qr("set"),
      delete: qr("delete"),
      clear: qr("clear")
    } : {
      add(o) {
        const s = /* @__PURE__ */ ue(this), l = Ur(s), a = /* @__PURE__ */ ue(o), c = !t && !/* @__PURE__ */ Ge(o) && !/* @__PURE__ */ It(o) ? a : o;
        return l.has.call(s, c) || ut(o, c) && l.has.call(s, o) || ut(a, c) && l.has.call(s, a) || (s.add(c), xt(s, "add", c, c)), this;
      },
      set(o, s) {
        !t && !/* @__PURE__ */ Ge(s) && !/* @__PURE__ */ It(s) && (s = /* @__PURE__ */ ue(s));
        const l = /* @__PURE__ */ ue(this), { has: a, get: c } = Ur(l);
        let d = a.call(l, o);
        d || (o = /* @__PURE__ */ ue(o), d = a.call(l, o));
        const g = c.call(l, o);
        return l.set(o, s), d ? ut(s, g) && xt(l, "set", o, s) : xt(l, "add", o, s), this;
      },
      delete(o) {
        const s = /* @__PURE__ */ ue(this), { has: l, get: a } = Ur(s);
        let c = l.call(s, o);
        c || (o = /* @__PURE__ */ ue(o), c = l.call(s, o)), a && a.call(s, o);
        const d = s.delete(o);
        return c && xt(s, "delete", o, void 0), d;
      },
      clear() {
        const o = /* @__PURE__ */ ue(this), s = o.size !== 0, l = o.clear();
        return s && xt(
          o,
          "clear",
          void 0,
          void 0
        ), l;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((o) => {
    n[o] = td(o, e, t);
  }), n;
}
function si(e, t) {
  const n = nd(e, t);
  return (r, o, s) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(
    ce(n, o) && o in r ? n : r,
    o,
    s
  );
}
const rd = {
  get: /* @__PURE__ */ si(!1, !1)
}, od = {
  get: /* @__PURE__ */ si(!1, !0)
}, sd = {
  get: /* @__PURE__ */ si(!0, !1)
};
const Ia = /* @__PURE__ */ new WeakMap(), Ea = /* @__PURE__ */ new WeakMap(), Aa = /* @__PURE__ */ new WeakMap(), id = /* @__PURE__ */ new WeakMap();
function ld(e) {
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
function Mo(e) {
  return /* @__PURE__ */ It(e) ? e : ii(
    e,
    !1,
    Jf,
    rd,
    Ia
  );
}
// @__NO_SIDE_EFFECTS__
function ad(e) {
  return ii(
    e,
    !1,
    ed,
    od,
    Ea
  );
}
// @__NO_SIDE_EFFECTS__
function Hs(e) {
  return ii(
    e,
    !0,
    Qf,
    sd,
    Aa
  );
}
function ii(e, t, n, r, o) {
  if (!ge(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const s = o.get(e);
  if (s)
    return s;
  const l = ld(Df(e));
  if (l === 0)
    return e;
  const a = new Proxy(
    e,
    l === 2 ? r : n
  );
  return o.set(e, a), a;
}
// @__NO_SIDE_EFFECTS__
function Qt(e) {
  return /* @__PURE__ */ It(e) ? /* @__PURE__ */ Qt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function It(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Ge(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function li(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function ue(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ ue(t) : e;
}
function ud(e) {
  return !ce(e, "__v_skip") && Object.isExtensible(e) && fa(e, "__v_skip", !0), e;
}
const tt = (e) => ge(e) ? /* @__PURE__ */ Mo(e) : e, Dn = (e) => ge(e) ? /* @__PURE__ */ Hs(e) : e;
// @__NO_SIDE_EFFECTS__
function Oe(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function J(e) {
  return Oa(e, !1);
}
// @__NO_SIDE_EFFECTS__
function cd(e) {
  return Oa(e, !0);
}
function Oa(e, t) {
  return /* @__PURE__ */ Oe(e) ? e : new fd(e, t);
}
class fd {
  constructor(t, n) {
    this.dep = new oi(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ ue(t), this._value = n ? t : tt(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, r = this.__v_isShallow || /* @__PURE__ */ Ge(t) || /* @__PURE__ */ It(t);
    t = r ? t : /* @__PURE__ */ ue(t), ut(t, n) && (this._rawValue = t, this._value = r ? t : tt(t), this.dep.trigger());
  }
}
function en(e) {
  return /* @__PURE__ */ Oe(e) ? e.value : e;
}
const dd = {
  get: (e, t, n) => t === "__v_raw" ? e : en(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return /* @__PURE__ */ Oe(o) && !/* @__PURE__ */ Oe(n) ? (o.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function Pa(e) {
  return /* @__PURE__ */ Qt(e) ? e : new Proxy(e, dd);
}
class gd {
  constructor(t, n, r) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new oi(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = pr - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    he !== this)
      return ya(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return _a(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function pd(e, t, n = !1) {
  let r, o;
  return X(e) ? r = e : (r = e.get, o = e.set), new gd(r, o, n);
}
const Gr = {}, lo = /* @__PURE__ */ new WeakMap();
let Zt;
function hd(e, t = !1, n = Zt) {
  if (n) {
    let r = lo.get(n);
    r || lo.set(n, r = []), r.push(e);
  }
}
function vd(e, t, n = ve) {
  const { immediate: r, deep: o, once: s, scheduler: l, augmentJob: a, call: c } = n, d = (_) => o ? _ : /* @__PURE__ */ Ge(_) || o === !1 || o === 0 ? zt(_, 1) : zt(_);
  let g, h, y, w, O = !1, R = !1;
  if (/* @__PURE__ */ Oe(e) ? (h = () => e.value, O = /* @__PURE__ */ Ge(e)) : /* @__PURE__ */ Qt(e) ? (h = () => d(e), O = !0) : G(e) ? (R = !0, O = e.some((_) => /* @__PURE__ */ Qt(_) || /* @__PURE__ */ Ge(_)), h = () => e.map((_) => {
    if (/* @__PURE__ */ Oe(_))
      return _.value;
    if (/* @__PURE__ */ Qt(_))
      return d(_);
    if (X(_))
      return c ? c(_, 2) : _();
  })) : X(e) ? t ? h = c ? () => c(e, 2) : e : h = () => {
    if (y) {
      Ct();
      try {
        y();
      } finally {
        Mt();
      }
    }
    const _ = Zt;
    Zt = g;
    try {
      return c ? c(e, 3, [w]) : e(w);
    } finally {
      Zt = _;
    }
  } : h = ft, t && o) {
    const _ = h, D = o === !0 ? 1 / 0 : o;
    h = () => zt(_(), D);
  }
  const A = ha(), j = () => {
    g.stop(), A && A.active && Qs(A.effects, g);
  };
  if (s && t) {
    const _ = t;
    t = (...D) => {
      const L = _(...D);
      return j(), L;
    };
  }
  let I = R ? new Array(e.length).fill(Gr) : Gr;
  const K = (_) => {
    if (!(!(g.flags & 1) || !g.dirty && !_))
      if (t) {
        const D = g.run();
        if (_ || o || O || (R ? D.some((L, B) => ut(L, I[B])) : ut(D, I))) {
          y && y();
          const L = Zt;
          Zt = g;
          try {
            const B = [
              D,
              // pass undefined as the old value when it's changed for the first time
              I === Gr ? void 0 : R && I[0] === Gr ? [] : I,
              w
            ];
            I = D, c ? c(t, 3, B) : (
              // @ts-expect-error
              t(...B)
            );
          } finally {
            Zt = L;
          }
        }
      } else
        g.run();
  };
  return a && a(K), g = new va(h), g.scheduler = l ? () => l(K, !1) : K, w = (_) => hd(_, !1, g), y = g.onStop = () => {
    const _ = lo.get(g);
    if (_) {
      if (c)
        c(_, 4);
      else
        for (const D of _) D();
      lo.delete(g);
    }
  }, t ? r ? K(!0) : I = g.run() : l ? l(K.bind(null, !0), !0) : g.run(), j.pause = g.pause.bind(g), j.resume = g.resume.bind(g), j.stop = j, j;
}
function zt(e, t = 1 / 0, n) {
  if (t <= 0 || !ge(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ Oe(e))
    zt(e.value, t, n);
  else if (G(e))
    for (let r = 0; r < e.length; r++)
      zt(e[r], t, n);
  else if (io(e) || Kt(e))
    e.forEach((r) => {
      zt(r, t, n);
    });
  else if (ua(e)) {
    for (const r in e)
      zt(e[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, r) && zt(e[r], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Rr(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (o) {
    Io(o, t, n);
  }
}
function nt(e, t, n, r) {
  if (X(e)) {
    const o = Rr(e, t, n, r);
    return o && la(o) && o.catch((s) => {
      Io(s, t, n);
    }), o;
  }
  if (G(e)) {
    const o = [];
    for (let s = 0; s < e.length; s++)
      o.push(nt(e[s], t, n, r));
    return o;
  }
}
function Io(e, t, n, r = !0) {
  const o = t ? t.vnode : null, { errorHandler: s, throwUnhandledErrorInProduction: l } = t && t.appContext.config || ve;
  if (t) {
    let a = t.parent;
    const c = t.proxy, d = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; a; ) {
      const g = a.ec;
      if (g) {
        for (let h = 0; h < g.length; h++)
          if (g[h](e, c, d) === !1)
            return;
      }
      a = a.parent;
    }
    if (s) {
      Ct(), Rr(s, null, 10, [
        e,
        c,
        d
      ]), Mt();
      return;
    }
  }
  md(e, n, o, r, l);
}
function md(e, t, n, r = !0, o = !1) {
  if (o)
    throw e;
  console.error(e);
}
const ke = [];
let st = -1;
const An = [];
let jt = null, Mn = 0;
const Da = /* @__PURE__ */ Promise.resolve();
let ao = null;
function Le(e) {
  const t = ao || Da;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function yd(e) {
  let t = st + 1, n = ke.length;
  for (; t < n; ) {
    const r = t + n >>> 1, o = ke[r], s = vr(o);
    s < e || s === e && o.flags & 2 ? t = r + 1 : n = r;
  }
  return t;
}
function ai(e) {
  if (!(e.flags & 1)) {
    const t = vr(e), n = ke[ke.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= vr(n) ? ke.push(e) : ke.splice(yd(t), 0, e), e.flags |= 1, ka();
  }
}
function ka() {
  ao || (ao = Da.then(Fa));
}
function wd(e) {
  if (!G(e))
    jt && e.id === -1 ? jt.splice(Mn + 1, 0, e) : e.flags & 1 || (An.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      An.push(e[t]);
  ka();
}
function al(e, t, n = st + 1) {
  for (; n < ke.length; n++) {
    const r = ke[n];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid)
        continue;
      ke.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function Ta(e) {
  if (An.length) {
    const t = [...new Set(An)].sort(
      (n, r) => vr(n) - vr(r)
    );
    if (An.length = 0, jt) {
      for (let n = 0; n < t.length; n++)
        jt.push(t[n]);
      return;
    }
    for (jt = t, Mn = 0; Mn < jt.length; Mn++) {
      const n = jt[Mn];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    jt = null, Mn = 0;
  }
}
const vr = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Fa(e) {
  try {
    for (st = 0; st < ke.length; st++) {
      const t = ke[st];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Rr(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; st < ke.length; st++) {
      const t = ke[st];
      t && (t.flags &= -2);
    }
    st = -1, ke.length = 0, Ta(), ao = null, (ke.length || An.length) && Fa();
  }
}
let ct = null, Ha = null;
function uo(e) {
  const t = ct;
  return ct = e, Ha = e && e.type.__scopeId || null, t;
}
function bd(e, t = ct, n) {
  if (!t || e._n)
    return e;
  const r = (...o) => {
    r._d && wl(-1);
    const s = uo(t), l = tn.length;
    let a;
    try {
      a = e(...o);
    } finally {
      for (let c = tn.length; c > l; c--) iu();
      uo(s), r._d && wl(1);
    }
    return a;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function Gt(e, t, n, r) {
  const o = e.dirs, s = t && t.dirs;
  for (let l = 0; l < o.length; l++) {
    const a = o[l];
    s && (a.oldValue = s[l].value);
    let c = a.dir[r];
    c && (Ct(), nt(c, n, 8, [
      e.el,
      a,
      e,
      t
    ]), Mt());
  }
}
function _d(e, t) {
  if (Te) {
    let n = Te.provides;
    const r = Te.parent && Te.parent.provides;
    r === n && (n = Te.provides = Object.create(r)), n[e] = t;
  }
}
function to(e, t, n = !1) {
  const r = mg();
  if (r || On) {
    let o = On ? On._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && X(t) ? t.call(r && r.proxy) : t;
  }
}
const Sd = /* @__PURE__ */ Symbol.for("v-scx"), xd = () => to(Sd);
function ye(e, t, n) {
  return La(e, t, n);
}
function La(e, t, n = ve) {
  const { immediate: r, deep: o, flush: s, once: l } = n, a = Pe({}, n), c = t && r || !t && s !== "post";
  let d;
  if (wr) {
    if (s === "sync") {
      const w = xd();
      d = w.__watcherHandles || (w.__watcherHandles = []);
    } else if (!c) {
      const w = () => {
      };
      return w.stop = ft, w.resume = ft, w.pause = ft, w;
    }
  }
  const g = Te;
  a.call = (w, O, R) => nt(w, g, O, R);
  let h = !1;
  s === "post" ? a.scheduler = (w) => {
    je(w, g && g.suspense);
  } : s !== "sync" && (h = !0, a.scheduler = (w, O) => {
    O ? w() : ai(w);
  }), a.augmentJob = (w) => {
    t && (w.flags |= 4), h && (w.flags |= 2, g && (w.id = g.uid, w.i = g));
  };
  const y = vd(e, t, a);
  return wr && (d ? d.push(y) : c && y()), y;
}
function Rd(e, t, n) {
  const r = this.proxy, o = Se(e) ? e.includes(".") ? ja(r, e) : () => r[e] : e.bind(r, r);
  let s;
  X(t) ? s = t : (s = t.handler, n = t);
  const l = Cr(this), a = La(o, s.bind(r), n);
  return l(), a;
}
function ja(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++)
      r = r[n[o]];
    return r;
  };
}
const Cd = /* @__PURE__ */ Symbol("_vte"), Eo = (e) => e.__isTeleport, ys = /* @__PURE__ */ Symbol("_leaveCb");
function Md(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== Et) {
        t = n;
        break;
      }
  }
  return t;
}
function za(e) {
  if (!ci(e))
    return Eo(e.type) && e.children ? Md(e.children) : e;
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
function ui(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    ui(
      Eo(n.type) && za(n) || n,
      t
    );
  } else e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Ka(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function ul(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const co = /* @__PURE__ */ new WeakMap();
function ur(e, t, n, r, o = !1) {
  if (G(e)) {
    e.forEach(
      (R, A) => ur(
        R,
        t && (G(t) ? t[A] : t),
        n,
        r,
        o
      )
    );
    return;
  }
  if (cr(r) && !o) {
    r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && ur(e, t, n, r.component.subTree);
    return;
  }
  const s = r.shapeFlag & 4 ? gi(r.component) : r.el, l = o ? null : s, { i: a, r: c } = e, d = t && t.r, g = a.refs === ve ? a.refs = {} : a.refs, h = a.setupState, y = /* @__PURE__ */ ue(h), w = h === ve ? ia : (R) => ul(g, R) ? !1 : ce(y, R), O = (R, A) => !(A && ul(g, A));
  if (d != null && d !== c) {
    if (cl(t), Se(d))
      g[d] = null, w(d) && (h[d] = null);
    else if (/* @__PURE__ */ Oe(d)) {
      const R = t;
      O(d, R.k) && (d.value = null), R.k && (g[R.k] = null);
    }
  }
  if (X(c))
    Rr(c, a, 12, [l, g]);
  else {
    const R = Se(c), A = /* @__PURE__ */ Oe(c);
    if (R || A) {
      const j = () => {
        if (e.f) {
          const I = R ? w(c) ? h[c] : g[c] : O() || !e.k ? c.value : g[e.k];
          if (o)
            G(I) && Qs(I, s);
          else if (G(I))
            I.includes(s) || I.push(s);
          else if (R)
            g[c] = [s], w(c) && (h[c] = g[c]);
          else {
            const K = [s];
            O(c, e.k) && (c.value = K), e.k && (g[e.k] = K);
          }
        } else R ? (g[c] = l, w(c) && (h[c] = l)) : A && (O(c, e.k) && (c.value = l), e.k && (g[e.k] = l));
      };
      if (l) {
        const I = () => {
          j(), co.delete(e);
        };
        I.id = -1, co.set(e, I), je(I, n);
      } else
        cl(e), j();
    }
  }
}
function cl(e) {
  const t = co.get(e);
  t && (t.flags |= 8, co.delete(e));
}
xo().requestIdleCallback;
xo().cancelIdleCallback;
const cr = (e) => !!e.type.__asyncLoader, ci = (e) => e.type.__isKeepAlive;
function Id(e, t) {
  Va(e, "a", t);
}
function Ed(e, t) {
  Va(e, "da", t);
}
function Va(e, t, n = Te) {
  const r = e.__wdc || (e.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (Ao(t, r, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      ci(o.parent.vnode) && Ad(r, t, n, o), o = o.parent;
  }
}
function Ad(e, t, n, r) {
  const o = Ao(
    t,
    e,
    r,
    !0
    /* prepend */
  );
  Ba(() => {
    Qs(r[t], o);
  }, n);
}
function Ao(e, t, n = Te, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), s = t.__weh || (t.__weh = (...l) => {
      Ct();
      const a = Cr(n), c = nt(t, n, e, l);
      return a(), Mt(), c;
    });
    return r ? o.unshift(s) : o.push(s), s;
  }
}
const Ot = (e) => (t, n = Te) => {
  (!wr || e === "sp") && Ao(e, (...r) => t(...r), n);
}, Od = Ot("bm"), no = Ot("m"), Pd = Ot(
  "bu"
), Dd = Ot("u"), rr = Ot(
  "bum"
), Ba = Ot("um"), kd = Ot(
  "sp"
), Td = Ot("rtg"), Fd = Ot("rtc");
function Hd(e, t = Te) {
  Ao("ec", e, t);
}
const Ld = /* @__PURE__ */ Symbol.for("v-ndc");
function er(e, t, n, r) {
  let o;
  const s = n, l = G(e);
  if (l || Se(e)) {
    const a = l && /* @__PURE__ */ Qt(e);
    let c = !1, d = !1;
    a && (c = !/* @__PURE__ */ Ge(e), d = /* @__PURE__ */ It(e), e = Co(e)), o = new Array(e.length);
    for (let g = 0, h = e.length; g < h; g++)
      o[g] = t(
        c ? d ? Dn(tt(e[g])) : tt(e[g]) : e[g],
        g,
        void 0,
        s
      );
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let a = 0; a < e; a++)
      o[a] = t(a + 1, a, void 0, s);
  } else if (ge(e))
    if (e[Symbol.iterator])
      o = Array.from(
        e,
        (a, c) => t(a, c, void 0, s)
      );
    else {
      const a = Object.keys(e);
      o = new Array(a.length);
      for (let c = 0, d = a.length; c < d; c++) {
        const g = a[c];
        o[c] = t(e[g], g, c, s);
      }
    }
  else
    o = [];
  return o;
}
const Ls = (e) => e ? cu(e) ? gi(e) : Ls(e.parent) : null, fr = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Pe(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Ls(e.parent),
    $root: (e) => Ls(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => $a(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      ai(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Le.bind(e.proxy)),
    $watch: (e) => Rd.bind(e)
  })
), ws = (e, t) => e !== ve && !e.__isScriptSetup && ce(e, t), jd = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: r, data: o, props: s, accessCache: l, type: a, appContext: c } = e;
    if (t[0] !== "$") {
      const y = l[t];
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
        if (ws(r, t))
          return l[t] = 1, r[t];
        if (o !== ve && ce(o, t))
          return l[t] = 2, o[t];
        if (ce(s, t))
          return l[t] = 3, s[t];
        if (n !== ve && ce(n, t))
          return l[t] = 4, n[t];
        js && (l[t] = 0);
      }
    }
    const d = fr[t];
    let g, h;
    if (d)
      return t === "$attrs" && Ae(e.attrs, "get", ""), d(e);
    if (
      // css module (injected by vue-loader)
      (g = a.__cssModules) && (g = g[t])
    )
      return g;
    if (n !== ve && ce(n, t))
      return l[t] = 4, n[t];
    if (
      // global properties
      h = c.config.globalProperties, ce(h, t)
    )
      return h[t];
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: o, ctx: s } = e;
    return ws(o, t) ? (o[t] = n, !0) : r !== ve && ce(r, t) ? (r[t] = n, !0) : ce(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (s[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: o, props: s, type: l }
  }, a) {
    let c;
    return !!(n[a] || e !== ve && a[0] !== "$" && ce(e, a) || ws(t, a) || ce(s, a) || ce(r, a) || ce(fr, a) || ce(o.config.globalProperties, a) || (c = l.__cssModules) && c[a]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : ce(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function fl(e) {
  return G(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let js = !0;
function zd(e) {
  const t = $a(e), n = e.proxy, r = e.ctx;
  js = !1, t.beforeCreate && dl(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: s,
    methods: l,
    watch: a,
    provide: c,
    inject: d,
    // lifecycle
    created: g,
    beforeMount: h,
    mounted: y,
    beforeUpdate: w,
    updated: O,
    activated: R,
    deactivated: A,
    beforeDestroy: j,
    beforeUnmount: I,
    destroyed: K,
    unmounted: _,
    render: D,
    renderTracked: L,
    renderTriggered: B,
    errorCaptured: N,
    serverPrefetch: H,
    // public API
    expose: U,
    inheritAttrs: Q,
    // assets
    components: ie,
    directives: _e,
    filters: Re
  } = t;
  if (d && Kd(d, r, null), l)
    for (const ee in l) {
      const se = l[ee];
      X(se) && (r[ee] = se.bind(n));
    }
  if (o) {
    const ee = o.call(n, n);
    ge(ee) && (e.data = /* @__PURE__ */ Mo(ee));
  }
  if (js = !0, s)
    for (const ee in s) {
      const se = s[ee], we = X(se) ? se.bind(n, n) : X(se.get) ? se.get.bind(n, n) : ft, Pt = !X(se) && X(se.set) ? se.set.bind(n) : ft, ze = W({
        get: we,
        set: Pt
      });
      Object.defineProperty(r, ee, {
        enumerable: !0,
        configurable: !0,
        get: () => ze.value,
        set: (Ke) => ze.value = Ke
      });
    }
  if (a)
    for (const ee in a)
      Na(a[ee], r, n, ee);
  if (c) {
    const ee = X(c) ? c.call(n) : c;
    Reflect.ownKeys(ee).forEach((se) => {
      _d(se, ee[se]);
    });
  }
  g && dl(g, e, "c");
  function le(ee, se) {
    G(se) ? se.forEach((we) => ee(we.bind(n))) : se && ee(se.bind(n));
  }
  if (le(Od, h), le(no, y), le(Pd, w), le(Dd, O), le(Id, R), le(Ed, A), le(Hd, N), le(Fd, L), le(Td, B), le(rr, I), le(Ba, _), le(kd, H), G(U))
    if (U.length) {
      const ee = e.exposed || (e.exposed = {});
      U.forEach((se) => {
        Object.defineProperty(ee, se, {
          get: () => n[se],
          set: (we) => n[se] = we,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  D && e.render === ft && (e.render = D), Q != null && (e.inheritAttrs = Q), ie && (e.components = ie), _e && (e.directives = _e), H && Ka(e);
}
function Kd(e, t, n = ft) {
  G(e) && (e = zs(e));
  for (const r in e) {
    const o = e[r];
    let s;
    ge(o) ? "default" in o ? s = to(
      o.from || r,
      o.default,
      !0
    ) : s = to(o.from || r) : s = to(o), /* @__PURE__ */ Oe(s) ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (l) => s.value = l
    }) : t[r] = s;
  }
}
function dl(e, t, n) {
  nt(
    G(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Na(e, t, n, r) {
  let o = r.includes(".") ? ja(n, r) : () => n[r];
  if (Se(e)) {
    const s = t[e];
    X(s) && ye(o, s);
  } else if (X(e))
    ye(o, e.bind(n));
  else if (ge(e))
    if (G(e))
      e.forEach((s) => Na(s, t, n, r));
    else {
      const s = X(e.handler) ? e.handler.bind(n) : t[e.handler];
      X(s) && ye(o, s, e);
    }
}
function $a(e) {
  const t = e.type, { mixins: n, extends: r } = t, {
    mixins: o,
    optionsCache: s,
    config: { optionMergeStrategies: l }
  } = e.appContext, a = s.get(t);
  let c;
  return a ? c = a : !o.length && !n && !r ? c = t : (c = {}, o.length && o.forEach(
    (d) => fo(c, d, l, !0)
  ), fo(c, t, l)), ge(t) && s.set(t, c), c;
}
function fo(e, t, n, r = !1) {
  const { mixins: o, extends: s } = t;
  s && fo(e, s, n, !0), o && o.forEach(
    (l) => fo(e, l, n, !0)
  );
  for (const l in t)
    if (!(r && l === "expose")) {
      const a = Vd[l] || n && n[l];
      e[l] = a ? a(e[l], t[l]) : t[l];
    }
  return e;
}
const Vd = {
  data: gl,
  props: pl,
  emits: pl,
  // objects
  methods: or,
  computed: or,
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
  components: or,
  directives: or,
  // watch
  watch: Nd,
  // provide / inject
  provide: gl,
  inject: Bd
};
function gl(e, t) {
  return t ? e ? function() {
    return Pe(
      X(e) ? e.call(this, this) : e,
      X(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Bd(e, t) {
  return or(zs(e), zs(t));
}
function zs(e) {
  if (G(e)) {
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
function or(e, t) {
  return e ? Pe(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function pl(e, t) {
  return e ? G(e) && G(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Pe(
    /* @__PURE__ */ Object.create(null),
    fl(e),
    fl(t ?? {})
  ) : t;
}
function Nd(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Pe(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = De(e[r], t[r]);
  return n;
}
function Wa() {
  return {
    app: null,
    config: {
      isNativeTag: ia,
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
let $d = 0;
function Wd(e, t) {
  return function(r, o = null) {
    X(r) || (r = Pe({}, r)), o != null && !ge(o) && (o = null);
    const s = Wa(), l = /* @__PURE__ */ new WeakSet(), a = [];
    let c = !1;
    const d = s.app = {
      _uid: $d++,
      _component: r,
      _props: o,
      _container: null,
      _context: s,
      _instance: null,
      version: xg,
      get config() {
        return s.config;
      },
      set config(g) {
      },
      use(g, ...h) {
        return l.has(g) || (g && X(g.install) ? (l.add(g), g.install(d, ...h)) : X(g) && (l.add(g), g(d, ...h))), d;
      },
      mixin(g) {
        return s.mixins.includes(g) || s.mixins.push(g), d;
      },
      component(g, h) {
        return h ? (s.components[g] = h, d) : s.components[g];
      },
      directive(g, h) {
        return h ? (s.directives[g] = h, d) : s.directives[g];
      },
      mount(g, h, y) {
        if (!c) {
          const w = d._ceVNode || Rt(r, o);
          return w.appContext = s, y === !0 ? y = "svg" : y === !1 && (y = void 0), e(w, g, y), c = !0, d._container = g, g.__vue_app__ = d, gi(w.component);
        }
      },
      onUnmount(g) {
        a.push(g);
      },
      unmount() {
        c && (nt(
          a,
          d._instance,
          16
        ), e(null, d._container), delete d._container.__vue_app__);
      },
      provide(g, h) {
        return s.provides[g] = h, d;
      },
      runWithContext(g) {
        const h = On;
        On = d;
        try {
          return g();
        } finally {
          On = h;
        }
      }
    };
    return d;
  };
}
let On = null;
const Ud = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Qe(t)}Modifiers`] || e[`${sn(t)}Modifiers`];
function qd(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || ve;
  let o = n;
  const s = t.startsWith("update:"), l = s && Ud(r, t.slice(7));
  l && (l.trim && (o = n.map((g) => Se(g) ? g.trim() : g)), l.number && (o = o.map(Ff)));
  let a, c = r[a = ds(t)] || // also try camelCase event handler (#2249)
  r[a = ds(Qe(t))];
  !c && s && (c = r[a = ds(sn(t))]), c && nt(
    c,
    e,
    6,
    o
  );
  const d = r[a + "Once"];
  if (d) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[a])
      return;
    e.emitted[a] = !0, nt(
      d,
      e,
      6,
      o
    );
  }
}
const Gd = /* @__PURE__ */ new WeakMap();
function Ua(e, t, n = !1) {
  const r = n ? Gd : t.emitsCache, o = r.get(e);
  if (o !== void 0)
    return o;
  const s = e.emits;
  let l = {}, a = !1;
  if (!X(e)) {
    const c = (d) => {
      const g = Ua(d, t, !0);
      g && (a = !0, Pe(l, g));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !s && !a ? (ge(e) && r.set(e, null), null) : (G(s) ? s.forEach((c) => l[c] = null) : Pe(l, s), ge(e) && r.set(e, l), l);
}
function Oo(e, t) {
  return !e || !bo(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), ce(e, t[0].toLowerCase() + t.slice(1)) || ce(e, sn(t)) || ce(e, t));
}
function hl(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: o,
    propsOptions: [s],
    slots: l,
    attrs: a,
    emit: c,
    render: d,
    renderCache: g,
    props: h,
    data: y,
    setupState: w,
    ctx: O,
    inheritAttrs: R
  } = e, A = uo(e);
  let j, I;
  try {
    if (n.shapeFlag & 4) {
      const _ = o || r, D = _;
      j = at(
        d.call(
          D,
          _,
          g,
          h,
          w,
          y,
          O
        )
      ), I = a;
    } else {
      const _ = t;
      j = at(
        _.length > 1 ? _(
          h,
          { attrs: a, slots: l, emit: c }
        ) : _(
          h,
          null
        )
      ), I = t.props ? a : Xd(a);
    }
  } catch (_) {
    tn.length = 0, Io(_, e, 1), j = Rt(Et);
  }
  let K = j;
  if (I && R !== !1) {
    const _ = Object.keys(I), { shapeFlag: D } = K;
    _.length && D & 7 && (s && _.some(_o) && (I = Yd(
      I,
      s
    )), K = kn(K, I, !1, !0));
  }
  if (n.dirs && (K = kn(K, null, !1, !0), K.dirs = K.dirs ? K.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const _ = Eo(K.type) && za(K) || K;
    ui(_, n.transition);
  }
  return j = K, uo(A), j;
}
const Xd = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || bo(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Yd = (e, t) => {
  const n = {};
  for (const r in e)
    (!_o(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
  return n;
};
function Zd(e, t, n) {
  const { props: r, children: o, component: s } = e, { props: l, children: a, patchFlag: c } = t, d = s.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return r ? vl(r, l, d) : !!l;
    if (c & 8) {
      const g = t.dynamicProps;
      for (let h = 0; h < g.length; h++) {
        const y = g[h];
        if (qa(l, r, y) && !Oo(d, y))
          return !0;
      }
    }
  } else
    return (o || a) && (!a || !a.$stable) ? !0 : r === l ? !1 : r ? l ? vl(r, l, d) : !0 : !!l;
  return !1;
}
function vl(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < r.length; o++) {
    const s = r[o];
    if (qa(t, e, s) && !Oo(n, s))
      return !0;
  }
  return !1;
}
function qa(e, t, n) {
  const r = e[n], o = t[n];
  return n === "style" && ge(r) && ge(o) ? !Ro(r, o) : r !== o;
}
function Jd({ vnode: e, parent: t, suspense: n }, r) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.suspense.vnode.el = o.el = r, e = o), o === e)
      (e = t.vnode).el = r, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = r);
}
const Ga = {}, Xa = () => Object.create(Ga), Ya = (e) => Object.getPrototypeOf(e) === Ga;
function Qd(e, t, n, r = !1) {
  const o = {}, s = Xa();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Za(e, t, o, s);
  for (const l in e.propsOptions[0])
    l in o || (o[l] = void 0);
  n ? e.props = r ? o : /* @__PURE__ */ ad(o) : e.type.props ? e.props = o : e.props = s, e.attrs = s;
}
function eg(e, t, n, r) {
  const {
    props: o,
    attrs: s,
    vnode: { patchFlag: l }
  } = e, a = /* @__PURE__ */ ue(o), [c] = e.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (r || l > 0) && !(l & 16)
  ) {
    if (l & 8) {
      const g = e.vnode.dynamicProps;
      for (let h = 0; h < g.length; h++) {
        let y = g[h];
        if (Oo(e.emitsOptions, y))
          continue;
        const w = t[y];
        if (c)
          if (ce(s, y))
            w !== s[y] && (s[y] = w, d = !0);
          else {
            const O = Qe(y);
            o[O] = Ks(
              c,
              a,
              O,
              w,
              e,
              !1
            );
          }
        else
          w !== s[y] && (s[y] = w, d = !0);
      }
    }
  } else {
    Za(e, t, o, s) && (d = !0);
    let g;
    for (const h in a)
      (!t || // for camelCase
      !ce(t, h) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((g = sn(h)) === h || !ce(t, g))) && (c ? n && // for camelCase
      (n[h] !== void 0 || // for kebab-case
      n[g] !== void 0) && (o[h] = Ks(
        c,
        a,
        h,
        void 0,
        e,
        !0
      )) : delete o[h]);
    if (s !== a)
      for (const h in s)
        (!t || !ce(t, h)) && (delete s[h], d = !0);
  }
  d && xt(e.attrs, "set", "");
}
function Za(e, t, n, r) {
  const [o, s] = e.propsOptions;
  let l = !1, a;
  if (t)
    for (let c in t) {
      if (ir(c))
        continue;
      const d = t[c];
      let g;
      o && ce(o, g = Qe(c)) ? !s || !s.includes(g) ? n[g] = d : (a || (a = {}))[g] = d : Oo(e.emitsOptions, c) || (!(c in r) || d !== r[c]) && (r[c] = d, l = !0);
    }
  if (s) {
    const c = /* @__PURE__ */ ue(n), d = a || ve;
    for (let g = 0; g < s.length; g++) {
      const h = s[g];
      n[h] = Ks(
        o,
        c,
        h,
        d[h],
        e,
        !ce(d, h)
      );
    }
  }
  return l;
}
function Ks(e, t, n, r, o, s) {
  const l = e[n];
  if (l != null) {
    const a = ce(l, "default");
    if (a && r === void 0) {
      const c = l.default;
      if (l.type !== Function && !l.skipFactory && X(c)) {
        const { propsDefaults: d } = o;
        if (n in d)
          r = d[n];
        else {
          const g = Cr(o);
          r = d[n] = c.call(
            null,
            t
          ), g();
        }
      } else
        r = c;
      o.ce && o.ce._setProp(n, r);
    }
    l[
      0
      /* shouldCast */
    ] && (s && !a ? r = !1 : l[
      1
      /* shouldCastTrue */
    ] && (r === "" || r === sn(n)) && (r = !0));
  }
  return r;
}
const tg = /* @__PURE__ */ new WeakMap();
function Ja(e, t, n = !1) {
  const r = n ? tg : t.propsCache, o = r.get(e);
  if (o)
    return o;
  const s = e.props, l = {}, a = [];
  let c = !1;
  if (!X(e)) {
    const g = (h) => {
      c = !0;
      const [y, w] = Ja(h, t, !0);
      Pe(l, y), w && a.push(...w);
    };
    !n && t.mixins.length && t.mixins.forEach(g), e.extends && g(e.extends), e.mixins && e.mixins.forEach(g);
  }
  if (!s && !c)
    return ge(e) && r.set(e, En), En;
  if (G(s))
    for (let g = 0; g < s.length; g++) {
      const h = Qe(s[g]);
      ml(h) && (l[h] = ve);
    }
  else if (s)
    for (const g in s) {
      const h = Qe(g);
      if (ml(h)) {
        const y = s[g], w = l[h] = G(y) || X(y) ? { type: y } : Pe({}, y), O = w.type;
        let R = !1, A = !0;
        if (G(O))
          for (let j = 0; j < O.length; ++j) {
            const I = O[j], K = X(I) && I.name;
            if (K === "Boolean") {
              R = !0;
              break;
            } else K === "String" && (A = !1);
          }
        else
          R = X(O) && O.name === "Boolean";
        w[
          0
          /* shouldCast */
        ] = R, w[
          1
          /* shouldCastTrue */
        ] = A, (R || ce(w, "default")) && a.push(h);
      }
    }
  const d = [l, a];
  return ge(e) && r.set(e, d), d;
}
function ml(e) {
  return e[0] !== "$" && !ir(e);
}
const fi = (e) => e === "_" || e === "_ctx" || e === "$stable", di = (e) => G(e) ? e.map(at) : [at(e)], ng = (e, t, n) => {
  if (t._n)
    return t;
  const r = bd((...o) => di(t(...o)), n);
  return r._c = !1, r;
}, Qa = (e, t, n) => {
  const r = e._ctx;
  for (const o in e) {
    if (fi(o)) continue;
    const s = e[o];
    if (X(s))
      t[o] = ng(o, s, r);
    else if (s != null) {
      const l = di(s);
      t[o] = () => l;
    }
  }
}, eu = (e, t) => {
  const n = di(t);
  e.slots.default = () => n;
}, tu = (e, t, n) => {
  for (const r in t)
    (n || !fi(r)) && (e[r] = t[r]);
}, rg = (e, t, n) => {
  const r = e.slots = Xa();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (tu(r, t, n), n && fa(r, "_", o, !0)) : Qa(t, r);
  } else t && eu(e, t);
}, og = (e, t, n) => {
  const { vnode: r, slots: o } = e;
  let s = !0, l = ve;
  if (r.shapeFlag & 32) {
    const a = t._;
    a ? n && a === 1 ? s = !1 : tu(o, t, n) : (s = !t.$stable, Qa(t, o)), l = t;
  } else t && (eu(e, t), l = { default: 1 });
  if (s)
    for (const a in o)
      !fi(a) && l[a] == null && delete o[a];
}, je = ug;
function sg(e) {
  return ig(e);
}
function ig(e, t) {
  const n = xo();
  n.__VUE__ = !0;
  const {
    insert: r,
    remove: o,
    patchProp: s,
    createElement: l,
    createText: a,
    createComment: c,
    setText: d,
    setElementText: g,
    parentNode: h,
    nextSibling: y,
    setScopeId: w = ft,
    insertStaticContent: O
  } = e, R = (p, m, b, M = null, x = null, S = null, T = void 0, k = null, P = !!m.dynamicChildren) => {
    if (p === m)
      return;
    p && !tr(p, m) && (M = dn(p), Ke(p, x, S, !0), p = null), m.patchFlag === -2 && (P = !1, m.dynamicChildren = null);
    const { type: C, ref: $, shapeFlag: F } = m;
    switch (C) {
      case Po:
        A(p, m, b, M);
        break;
      case Et:
        j(p, m, b, M);
        break;
      case _s:
        p == null && I(m, b, M, T);
        break;
      case Ee:
        ie(
          p,
          m,
          b,
          M,
          x,
          S,
          T,
          k,
          P
        );
        break;
      default:
        F & 1 ? D(
          p,
          m,
          b,
          M,
          x,
          S,
          T,
          k,
          P
        ) : F & 6 ? _e(
          p,
          m,
          b,
          M,
          x,
          S,
          T,
          k,
          P
        ) : (F & 64 || F & 128) && C.process(
          p,
          m,
          b,
          M,
          x,
          S,
          T,
          k,
          P,
          ht
        );
    }
    $ != null && x ? ur($, p && p.ref, S, m || p, !m) : $ == null && p && p.ref != null && ur(p.ref, null, S, p, !0);
  }, A = (p, m, b, M) => {
    if (p == null)
      r(
        m.el = a(m.children),
        b,
        M
      );
    else {
      const x = m.el = p.el;
      m.children !== p.children && d(x, m.children);
    }
  }, j = (p, m, b, M) => {
    p == null ? r(
      m.el = c(m.children || ""),
      b,
      M
    ) : m.el = p.el;
  }, I = (p, m, b, M) => {
    [p.el, p.anchor] = O(
      p.children,
      m,
      b,
      M,
      p.el,
      p.anchor
    );
  }, K = ({ el: p, anchor: m }, b, M) => {
    let x;
    for (; p && p !== m; )
      x = y(p), r(p, b, M), p = x;
    r(m, b, M);
  }, _ = ({ el: p, anchor: m }) => {
    let b;
    for (; p && p !== m; )
      b = y(p), o(p), p = b;
    o(m);
  }, D = (p, m, b, M, x, S, T, k, P) => {
    if (m.type === "svg" ? T = "svg" : m.type === "math" && (T = "mathml"), p == null)
      L(
        m,
        b,
        M,
        x,
        S,
        T,
        k,
        P
      );
    else {
      const C = p.el && p.el._isVueCE ? p.el : null;
      try {
        C && C._beginPatch(), H(
          p,
          m,
          x,
          S,
          T,
          k,
          P
        );
      } finally {
        C && C._endPatch();
      }
    }
  }, L = (p, m, b, M, x, S, T, k) => {
    let P, C;
    const { props: $, shapeFlag: F, transition: V, dirs: q } = p;
    if (P = p.el = l(
      p.type,
      S,
      $ && $.is,
      $
    ), F & 8 ? g(P, p.children) : F & 16 && N(
      p.children,
      P,
      null,
      M,
      x,
      bs(p, S),
      T,
      k
    ), q && Gt(p, null, M, "created"), B(P, p, p.scopeId, T, M), $) {
      for (const fe in $)
        fe !== "value" && !ir(fe) && s(P, fe, null, $[fe], S, M);
      "value" in $ && s(P, "value", null, $.value, S), (C = $.onVnodeBeforeMount) && ot(C, M, p);
    }
    q && Gt(p, null, M, "beforeMount");
    const Z = lg(x, V);
    Z && V.beforeEnter(P), r(P, m, b), ((C = $ && $.onVnodeMounted) || Z || q) && je(() => {
      try {
        C && ot(C, M, p), Z && V.enter(P), q && Gt(p, null, M, "mounted");
      } finally {
      }
    }, x);
  }, B = (p, m, b, M, x) => {
    if (b && w(p, b), M)
      for (let S = 0; S < M.length; S++)
        w(p, M[S]);
    if (x) {
      let S = x.subTree;
      if (m === S || su(S.type) && (S.ssContent === m || S.ssFallback === m)) {
        const T = x.vnode;
        B(
          p,
          T,
          T.scopeId,
          T.slotScopeIds,
          x.parent
        );
      }
    }
  }, N = (p, m, b, M, x, S, T, k, P = 0) => {
    for (let C = P; C < p.length; C++) {
      const $ = p[C] = k ? St(p[C]) : at(p[C]);
      R(
        null,
        $,
        m,
        b,
        M,
        x,
        S,
        T,
        k
      );
    }
  }, H = (p, m, b, M, x, S, T) => {
    const k = m.el = p.el;
    let { patchFlag: P, dynamicChildren: C, dirs: $ } = m;
    P |= p.patchFlag & 16;
    const F = p.props || ve, V = m.props || ve;
    let q;
    if (b && Xt(b, !1), (q = V.onVnodeBeforeUpdate) && ot(q, b, m, p), $ && Gt(m, p, b, "beforeUpdate"), b && Xt(b, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    C && (!p.dynamicChildren || p.dynamicChildren.length !== C.length) && (P = 0, T = !1, C = null), (F.innerHTML && V.innerHTML == null || F.textContent && V.textContent == null) && g(k, ""), C ? U(
      p.dynamicChildren,
      C,
      k,
      b,
      M,
      bs(m, x),
      S
    ) : T || se(
      p,
      m,
      k,
      null,
      b,
      M,
      bs(m, x),
      S,
      !1
    ), P > 0) {
      if (P & 16)
        Q(k, F, V, b, x);
      else if (P & 2 && F.class !== V.class && s(k, "class", null, V.class, x), P & 4 && s(k, "style", F.style, V.style, x), P & 8) {
        const Z = m.dynamicProps;
        for (let fe = 0; fe < Z.length; fe++) {
          const ne = Z[fe], be = F[ne], xe = V[ne];
          (xe !== be || ne === "value") && s(k, ne, be, xe, x, b);
        }
      }
      P & 1 && p.children !== m.children && g(k, m.children);
    } else !T && C == null && Q(k, F, V, b, x);
    ((q = V.onVnodeUpdated) || $) && je(() => {
      q && ot(q, b, m, p), $ && Gt(m, p, b, "updated");
    }, M);
  }, U = (p, m, b, M, x, S, T) => {
    for (let k = 0; k < m.length; k++) {
      const P = p[k], C = m[k], $ = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        P.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (P.type === Ee || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !tr(P, C) || // - In the case of a component, it could contain anything.
        P.shapeFlag & 198) ? h(P.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          b
        )
      );
      R(
        P,
        C,
        $,
        null,
        M,
        x,
        S,
        T,
        !0
      );
    }
  }, Q = (p, m, b, M, x) => {
    if (m !== b) {
      if (m !== ve)
        for (const S in m)
          !ir(S) && !(S in b) && s(
            p,
            S,
            m[S],
            null,
            x,
            M
          );
      for (const S in b) {
        if (ir(S)) continue;
        const T = b[S], k = m[S];
        T !== k && S !== "value" && s(p, S, k, T, x, M);
      }
      "value" in b && s(p, "value", m.value, b.value, x);
    }
  }, ie = (p, m, b, M, x, S, T, k, P) => {
    const C = m.el = p ? p.el : a(""), $ = m.anchor = p ? p.anchor : a("");
    let { patchFlag: F, dynamicChildren: V, slotScopeIds: q } = m;
    q && (k = k ? k.concat(q) : q), p == null ? (r(C, b, M), r($, b, M), N(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      m.children || [],
      b,
      $,
      x,
      S,
      T,
      k,
      P
    )) : F > 0 && F & 64 && V && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    p.dynamicChildren && p.dynamicChildren.length === V.length ? (U(
      p.dynamicChildren,
      V,
      b,
      x,
      S,
      T,
      k
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (m.key != null || x && m === x.subTree) && nu(
      p,
      m,
      !0
      /* shallow */
    )) : se(
      p,
      m,
      b,
      $,
      x,
      S,
      T,
      k,
      P
    );
  }, _e = (p, m, b, M, x, S, T, k, P) => {
    m.slotScopeIds = k, p == null ? m.shapeFlag & 512 ? x.ctx.activate(
      m,
      b,
      M,
      T,
      P
    ) : Re(
      m,
      b,
      M,
      x,
      S,
      T,
      P
    ) : pe(p, m, P);
  }, Re = (p, m, b, M, x, S, T) => {
    const k = p.component = vg(
      p,
      M,
      x
    );
    if (ci(p) && (k.ctx.renderer = ht), yg(k, !1, T), k.asyncDep) {
      if (x && x.registerDep(k, le, T), !p.el) {
        const P = k.subTree = Rt(Et);
        j(null, P, m, b), p.placeholder = P.el;
      }
    } else
      le(
        k,
        p,
        m,
        b,
        x,
        S,
        T
      );
  }, pe = (p, m, b) => {
    const M = m.component = p.component;
    if (Zd(p, m, b))
      if (M.asyncDep && !M.asyncResolved) {
        ee(M, m, b);
        return;
      } else
        M.next = m, M.update();
    else
      m.el = p.el, M.vnode = m;
  }, le = (p, m, b, M, x, S, T) => {
    const k = () => {
      if (p.isMounted) {
        let { next: F, bu: V, u: q, parent: Z, vnode: fe } = p;
        {
          const Ne = ru(p);
          if (Ne) {
            F && (F.el = fe.el, ee(p, F, T)), Ne.asyncDep.then(() => {
              je(() => {
                p.isUnmounted || C();
              }, x);
            });
            return;
          }
        }
        let ne = F, be;
        Xt(p, !1), F ? (F.el = fe.el, ee(p, F, T)) : F = fe, V && gs(V), (be = F.props && F.props.onVnodeBeforeUpdate) && ot(be, Z, F, fe), Xt(p, !0);
        const xe = hl(p), Be = p.subTree;
        p.subTree = xe, R(
          Be,
          xe,
          // parent may have changed if it's in a teleport
          h(Be.el),
          // anchor may have changed if it's in a fragment
          dn(Be),
          p,
          x,
          S
        ), F.el = xe.el, ne === null && Jd(p, xe.el), q && je(q, x), (be = F.props && F.props.onVnodeUpdated) && je(
          () => ot(be, Z, F, fe),
          x
        );
      } else {
        let F;
        const { el: V, props: q } = m, { bm: Z, m: fe, parent: ne, root: be, type: xe } = p, Be = cr(m);
        Xt(p, !1), Z && gs(Z), !Be && (F = q && q.onVnodeBeforeMount) && ot(F, ne, m), Xt(p, !0);
        {
          be.ce && be.ce._hasShadowRoot() && be.ce._injectChildStyle(
            xe,
            p.parent ? p.parent.type : void 0
          );
          const Ne = p.subTree = hl(p);
          R(
            null,
            Ne,
            b,
            M,
            p,
            x,
            S
          ), m.el = Ne.el;
        }
        if (fe && je(fe, x), !Be && (F = q && q.onVnodeMounted)) {
          const Ne = m;
          je(
            () => ot(F, ne, Ne),
            x
          );
        }
        (m.shapeFlag & 256 || ne && cr(ne.vnode) && ne.vnode.shapeFlag & 256) && p.a && je(p.a, x), p.isMounted = !0, m = b = M = null;
      }
    };
    p.scope.on();
    const P = p.effect = new va(k);
    p.scope.off();
    const C = p.update = P.run.bind(P), $ = p.job = P.runIfDirty.bind(P);
    $.i = p, $.id = p.uid, P.scheduler = () => ai($), Xt(p, !0), C();
  }, ee = (p, m, b) => {
    m.component = p;
    const M = p.vnode.props;
    p.vnode = m, p.next = null, eg(p, m.props, M, b), og(p, m.children, b), Ct(), al(p), Mt();
  }, se = (p, m, b, M, x, S, T, k, P = !1) => {
    const C = p && p.children, $ = p ? p.shapeFlag : 0, F = m.children, { patchFlag: V, shapeFlag: q } = m;
    if (V > 0) {
      if (V & 128) {
        Pt(
          C,
          F,
          b,
          M,
          x,
          S,
          T,
          k,
          P
        );
        return;
      } else if (V & 256) {
        we(
          C,
          F,
          b,
          M,
          x,
          S,
          T,
          k,
          P
        );
        return;
      }
    }
    q & 8 ? ($ & 16 && Vt(C, x, S), F !== C && g(b, F)) : $ & 16 ? q & 16 ? Pt(
      C,
      F,
      b,
      M,
      x,
      S,
      T,
      k,
      P
    ) : Vt(C, x, S, !0) : ($ & 8 && g(b, ""), q & 16 && N(
      F,
      b,
      M,
      x,
      S,
      T,
      k,
      P
    ));
  }, we = (p, m, b, M, x, S, T, k, P) => {
    p = p || En, m = m || En;
    const C = p.length, $ = m.length, F = Math.min(C, $);
    let V;
    for (V = 0; V < F; V++) {
      const q = m[V] = P ? St(m[V]) : at(m[V]);
      R(
        p[V],
        q,
        b,
        null,
        x,
        S,
        T,
        k,
        P
      );
    }
    C > $ ? Vt(
      p,
      x,
      S,
      !0,
      !1,
      F
    ) : N(
      m,
      b,
      M,
      x,
      S,
      T,
      k,
      P,
      F
    );
  }, Pt = (p, m, b, M, x, S, T, k, P) => {
    let C = 0;
    const $ = m.length;
    let F = p.length - 1, V = $ - 1;
    for (; C <= F && C <= V; ) {
      const q = p[C], Z = m[C] = P ? St(m[C]) : at(m[C]);
      if (tr(q, Z))
        R(
          q,
          Z,
          b,
          null,
          x,
          S,
          T,
          k,
          P
        );
      else
        break;
      C++;
    }
    for (; C <= F && C <= V; ) {
      const q = p[F], Z = m[V] = P ? St(m[V]) : at(m[V]);
      if (tr(q, Z))
        R(
          q,
          Z,
          b,
          null,
          x,
          S,
          T,
          k,
          P
        );
      else
        break;
      F--, V--;
    }
    if (C > F) {
      if (C <= V) {
        const q = V + 1, Z = q < $ ? m[q].el : M;
        for (; C <= V; )
          R(
            null,
            m[C] = P ? St(m[C]) : at(m[C]),
            b,
            Z,
            x,
            S,
            T,
            k,
            P
          ), C++;
      }
    } else if (C > V)
      for (; C <= F; )
        Ke(p[C], x, S, !0), C++;
    else {
      const q = C, Z = C, fe = /* @__PURE__ */ new Map();
      for (C = Z; C <= V; C++) {
        const Ie = m[C] = P ? St(m[C]) : at(m[C]);
        Ie.key != null && fe.set(Ie.key, C);
      }
      let ne, be = 0;
      const xe = V - Z + 1;
      let Be = !1, Ne = 0;
      const Bt = new Array(xe);
      for (C = 0; C < xe; C++) Bt[C] = 0;
      for (C = q; C <= F; C++) {
        const Ie = p[C];
        if (be >= xe) {
          Ke(Ie, x, S, !0);
          continue;
        }
        let Ue;
        if (Ie.key != null)
          Ue = fe.get(Ie.key);
        else
          for (ne = Z; ne <= V; ne++)
            if (Bt[ne - Z] === 0 && tr(Ie, m[ne])) {
              Ue = ne;
              break;
            }
        Ue === void 0 ? Ke(Ie, x, S, !0) : (Bt[Ue - Z] = C + 1, Ue >= Ne ? Ne = Ue : Be = !0, R(
          Ie,
          m[Ue],
          b,
          null,
          x,
          S,
          T,
          k,
          P
        ), be++);
      }
      const Hn = Be ? ag(Bt) : En;
      for (ne = Hn.length - 1, C = xe - 1; C >= 0; C--) {
        const Ie = Z + C, Ue = m[Ie], Pr = m[Ie + 1], Nt = Ie + 1 < $ ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Pr.el || ou(Pr)
        ) : M;
        Bt[C] === 0 ? R(
          null,
          Ue,
          b,
          Nt,
          x,
          S,
          T,
          k,
          P
        ) : Be && (ne < 0 || C !== Hn[ne] ? ze(Ue, b, Nt, 2) : ne--);
      }
    }
  }, ze = (p, m, b, M, x = null) => {
    const { el: S, type: T, transition: k, children: P, shapeFlag: C } = p;
    if (C & 6) {
      ze(p.component.subTree, m, b, M);
      return;
    }
    if (C & 128) {
      p.suspense.move(m, b, M);
      return;
    }
    if (C & 64) {
      T.move(p, m, b, ht);
      return;
    }
    if (T === Ee) {
      r(S, m, b);
      for (let F = 0; F < P.length; F++)
        ze(P[F], m, b, M);
      r(p.anchor, m, b);
      return;
    }
    if (T === _s) {
      K(p, m, b);
      return;
    }
    if (M !== 2 && C & 1 && k)
      if (M === 0)
        k.persisted && !S[ys] ? r(S, m, b) : (k.beforeEnter(S), r(S, m, b), je(() => k.enter(S), x));
      else {
        const { leave: F, delayLeave: V, afterLeave: q } = k, Z = () => {
          p.ctx.isUnmounted ? o(S) : r(S, m, b);
        }, fe = () => {
          const ne = S._isLeaving || !!S[ys];
          S._isLeaving && S[ys](
            !0
            /* cancelled */
          ), k.persisted && !ne ? Z() : F(S, () => {
            Z(), q && q();
          });
        };
        V ? V(S, Z, fe) : fe();
      }
    else
      r(S, m, b);
  }, Ke = (p, m, b, M = !1, x = !1) => {
    const {
      type: S,
      props: T,
      ref: k,
      children: P,
      dynamicChildren: C,
      shapeFlag: $,
      patchFlag: F,
      dirs: V,
      cacheIndex: q,
      memo: Z
    } = p;
    if (F === -2 && (x = !1), k != null && (Ct(), ur(k, null, b, p, !0), Mt()), q != null && (m.renderCache[q] = void 0), $ & 256) {
      m.ctx.deactivate(p);
      return;
    }
    const fe = $ & 1 && V, ne = !cr(p);
    let be;
    if (ne && (be = T && T.onVnodeBeforeUnmount) && ot(be, m, p), $ & 6)
      fn(p.component, b, M);
    else {
      if ($ & 128) {
        p.suspense.unmount(b, M);
        return;
      }
      fe && Gt(p, null, m, "beforeUnmount"), $ & 64 ? p.type.remove(
        p,
        m,
        b,
        ht,
        M
      ) : C && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !C.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (S !== Ee || F > 0 && F & 64) ? Vt(
        C,
        m,
        b,
        !1,
        !0
      ) : (S === Ee && F & 384 || !x && $ & 16) && Vt(P, m, b), M && Ve(p);
    }
    const xe = Z != null && q == null;
    (ne && (be = T && T.onVnodeUnmounted) || fe || xe) && je(() => {
      be && ot(be, m, p), fe && Gt(p, null, m, "unmounted"), xe && (p.el = null);
    }, b);
  }, Ve = (p) => {
    const { type: m, el: b, anchor: M, transition: x } = p;
    if (m === Ee) {
      Dt(b, M);
      return;
    }
    if (m === _s) {
      _(p);
      return;
    }
    const S = () => {
      o(b), x && !x.persisted && x.afterLeave && x.afterLeave();
    };
    if (p.shapeFlag & 1 && x && !x.persisted) {
      const { leave: T, delayLeave: k } = x, P = () => T(b, S);
      k ? k(p.el, S, P) : P();
    } else
      S();
  }, Dt = (p, m) => {
    let b;
    for (; p !== m; )
      b = y(p), o(p), p = b;
    o(m);
  }, fn = (p, m, b) => {
    const { bum: M, scope: x, job: S, subTree: T, um: k, m: P, a: C } = p;
    yl(P), yl(C), M && gs(M), x.stop(), S && (S.flags |= 8, Ke(T, p, m, b)), k && je(k, m), je(() => {
      p.isUnmounted = !0;
    }, m);
  }, Vt = (p, m, b, M = !1, x = !1, S = 0) => {
    for (let T = S; T < p.length; T++)
      Ke(p[T], m, b, M, x);
  }, dn = (p) => {
    if (p.shapeFlag & 6)
      return dn(p.component.subTree);
    if (p.shapeFlag & 128)
      return p.suspense.next();
    const m = y(p.anchor || p.el), b = m && m[Cd];
    return b ? y(b) : m;
  };
  let ae = !1;
  const We = (p, m, b) => {
    let M;
    p == null ? m._vnode && (Ke(m._vnode, null, null, !0), M = m._vnode.component) : R(
      m._vnode || null,
      p,
      m,
      null,
      null,
      null,
      b
    ), m._vnode = p, ae || (ae = !0, al(M), Ta(), ae = !1);
  }, ht = {
    p: R,
    um: Ke,
    m: ze,
    r: Ve,
    mt: Re,
    mc: N,
    pc: se,
    pbc: U,
    n: dn,
    o: e
  };
  return {
    render: We,
    hydrate: void 0,
    createApp: Wd(We)
  };
}
function bs({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Xt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function lg(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function nu(e, t, n = !1) {
  const r = e.children, o = t.children;
  if (G(r) && G(o))
    for (let s = 0; s < r.length; s++) {
      const l = r[s];
      let a = o[s];
      a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = o[s] = St(o[s]), a.el = l.el), !n && a.patchFlag !== -2 && nu(l, a)), a.type === Po && (a.patchFlag === -1 && (a = o[s] = St(a)), a.el = l.el), a.type === Et && !a.el && (a.el = l.el);
    }
}
function ag(e) {
  const t = e.slice(), n = [0];
  let r, o, s, l, a;
  const c = e.length;
  for (r = 0; r < c; r++) {
    const d = e[r];
    if (d !== 0) {
      if (o = n[n.length - 1], e[o] < d) {
        t[r] = o, n.push(r);
        continue;
      }
      for (s = 0, l = n.length - 1; s < l; )
        a = s + l >> 1, e[n[a]] < d ? s = a + 1 : l = a;
      d < e[n[s]] && (s > 0 && (t[r] = n[s - 1]), n[s] = r);
    }
  }
  for (s = n.length, l = n[s - 1]; s-- > 0; )
    n[s] = l, l = t[l];
  return n;
}
function ru(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : ru(t);
}
function yl(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function ou(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? ou(t.subTree) : null;
}
const su = (e) => e.__isSuspense;
function ug(e, t) {
  t && t.pendingBranch ? G(e) ? t.effects.push(...e) : t.effects.push(e) : wd(e);
}
const Ee = /* @__PURE__ */ Symbol.for("v-fgt"), Po = /* @__PURE__ */ Symbol.for("v-txt"), Et = /* @__PURE__ */ Symbol.for("v-cmt"), _s = /* @__PURE__ */ Symbol.for("v-stc"), tn = [];
let $e = null;
function re(e = !1) {
  tn.push($e = e ? null : []);
}
function iu() {
  tn.pop(), $e = tn[tn.length - 1] || null;
}
let mr = 1;
function wl(e, t = !1) {
  mr += e, e < 0 && $e && t && ($e.hasOnce = !0);
}
function lu(e) {
  return e.dynamicChildren = mr > 0 ? $e || En : null, iu(), mr > 0 && $e && $e.push(e), e;
}
function oe(e, t, n, r, o, s) {
  return lu(
    Ce(
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
function cg(e, t, n, r, o) {
  return lu(
    Rt(
      e,
      t,
      n,
      r,
      o,
      !0
    )
  );
}
function au(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function tr(e, t) {
  return e.type === t.type && e.key === t.key;
}
const uu = ({ key: e }) => e ?? null, ro = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? Se(e) || /* @__PURE__ */ Oe(e) || X(e) ? { i: ct, r: e, k: t, f: !!n } : e : null);
function Ce(e, t = null, n = null, r = 0, o = null, s = e === Ee ? 0 : 1, l = !1, a = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && uu(t),
    ref: t && ro(t),
    scopeId: Ha,
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
    ctx: ct
  };
  return a ? (go(c, n), s & 128 && e.normalize(c)) : n && (c.shapeFlag |= Se(n) ? 8 : 16), mr > 0 && // avoid a block node from tracking itself
  !l && // has current parent block
  $e && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && $e.push(c), c;
}
const Rt = fg;
function fg(e, t = null, n = null, r = 0, o = null, s = !1) {
  if ((!e || e === Ld) && (e = Et), au(e)) {
    const a = kn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && go(a, n), mr > 0 && !s && $e && (a.shapeFlag & 6 ? $e[$e.indexOf(e)] = a : $e.push(a)), a.patchFlag = -2, a;
  }
  if (Sg(e) && (e = e.__vccOpts), t) {
    t = dg(t);
    let { class: a, style: c } = t;
    a && !Se(a) && (t.class = Je(a)), ge(c) && (/* @__PURE__ */ li(c) && !G(c) && (c = Pe({}, c)), t.style = it(c));
  }
  const l = Se(e) ? 1 : su(e) ? 128 : Eo(e) ? 64 : ge(e) ? 4 : X(e) ? 2 : 0;
  return Ce(
    e,
    t,
    n,
    r,
    o,
    l,
    s,
    !0
  );
}
function dg(e) {
  return e ? /* @__PURE__ */ li(e) || Ya(e) ? Pe({}, e) : e : null;
}
function kn(e, t, n = !1, r = !1) {
  const { props: o, ref: s, patchFlag: l, children: a, transition: c } = e, d = t ? gg(o || {}, t) : o, g = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && uu(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && s ? G(s) ? s.concat(ro(t)) : [s, ro(t)] : ro(t)
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
    patchFlag: t && e.type !== Ee ? l === -1 ? 16 : l | 16 : l,
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
    ssContent: e.ssContent && kn(e.ssContent),
    ssFallback: e.ssFallback && kn(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && r && ui(
    g,
    c.clone(g)
  ), g;
}
function Vs(e = " ", t = 0) {
  return Rt(Po, null, e, t);
}
function Ze(e = "", t = !1) {
  return t ? (re(), cg(Et, null, e)) : Rt(Et, null, e);
}
function at(e) {
  return e == null || typeof e == "boolean" ? Rt(Et) : G(e) ? Rt(
    Ee,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : au(e) ? St(e) : Rt(Po, null, String(e));
}
function St(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : kn(e);
}
function go(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (G(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), go(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !Ya(t) ? t._ctx = ct : o === 3 && ct && (ct.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (X(t)) {
    if (r & 65) {
      go(e, { default: t });
      return;
    }
    t = { default: t, _ctx: ct }, n = 32;
  } else
    t = String(t), r & 64 ? (n = 16, t = [Vs(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function gg(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === "class")
        t.class !== r.class && (t.class = Je([t.class, r.class]));
      else if (o === "style")
        t.style = it([t.style, r.style]);
      else if (bo(o)) {
        const s = t[o], l = r[o];
        l && s !== l && !(G(s) && s.includes(l)) ? t[o] = s ? [].concat(s, l) : l : l == null && s == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !_o(o) && (t[o] = l);
      } else o !== "" && (t[o] = r[o]);
  }
  return t;
}
function ot(e, t, n, r = null) {
  nt(e, t, 7, [
    n,
    r
  ]);
}
const pg = Wa();
let hg = 0;
function vg(e, t, n) {
  const r = e.type, o = (t ? t.appContext : e.appContext) || pg, s = {
    uid: hg++,
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
    scope: new Nf(
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
    propsOptions: Ja(r, o),
    emitsOptions: Ua(r, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: ve,
    // inheritAttrs
    inheritAttrs: r.inheritAttrs,
    // state
    ctx: ve,
    data: ve,
    props: ve,
    attrs: ve,
    slots: ve,
    refs: ve,
    setupState: ve,
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
  return s.ctx = { _: s }, s.root = t ? t.root : s, s.emit = qd.bind(null, s), e.ce && e.ce(s), s;
}
let Te = null;
const mg = () => Te || ct;
let po, yr;
{
  const e = xo(), t = (n, r) => {
    let o;
    return (o = e[n]) || (o = e[n] = []), o.push(r), (s) => {
      o.length > 1 ? o.forEach((l) => l(s)) : o[0](s);
    };
  };
  po = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Te = n
  ), yr = t(
    "__VUE_SSR_SETTERS__",
    (n) => wr = n
  );
}
const Cr = (e) => {
  const t = Te;
  return po(e), e.scope.on(), () => {
    e.scope.off(), po(t);
  };
}, bl = () => {
  Te && Te.scope.off(), po(null);
};
function cu(e) {
  return e.vnode.shapeFlag & 4;
}
let wr = !1;
function yg(e, t = !1, n = !1) {
  t && yr(t);
  const { props: r, children: o } = e.vnode, s = cu(e);
  Qd(e, r, s, t), rg(e, o, n || t);
  const l = s ? wg(e, t) : void 0;
  return t && yr(!1), l;
}
function wg(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, jd);
  const { setup: r } = n;
  if (r) {
    Ct();
    const o = e.setupContext = r.length > 1 ? _g(e) : null, s = Cr(e), l = Rr(
      r,
      e,
      0,
      [
        e.props,
        o
      ]
    ), a = la(l);
    if (Mt(), s(), (a || e.sp) && !cr(e) && Ka(e), a) {
      if (l.then(bl, bl), t)
        return l.then((c) => {
          yr(!0);
          try {
            _l(e, c, t);
          } finally {
            yr(!1);
          }
        }).catch((c) => {
          Io(c, e, 0);
        });
      e.asyncDep = l;
    } else
      _l(e, l);
  } else
    fu(e);
}
function _l(e, t, n) {
  X(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ge(t) && (e.setupState = Pa(t)), fu(e);
}
function fu(e, t, n) {
  const r = e.type;
  e.render || (e.render = r.render || ft);
  {
    const o = Cr(e);
    Ct();
    try {
      zd(e);
    } finally {
      Mt(), o();
    }
  }
}
const bg = {
  get(e, t) {
    return Ae(e, "get", ""), e[t];
  }
};
function _g(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, bg),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function gi(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Pa(ud(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in fr)
        return fr[n](e);
    },
    has(t, n) {
      return n in t || n in fr;
    }
  })) : e.proxy;
}
function Sg(e) {
  return X(e) && "__vccOpts" in e;
}
const W = (e, t) => /* @__PURE__ */ pd(e, t, wr), xg = "3.5.42";
/**
* @vue/runtime-dom v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Bs;
const Sl = typeof window < "u" && window.trustedTypes;
if (Sl)
  try {
    Bs = /* @__PURE__ */ Sl.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const du = Bs ? (e) => Bs.createHTML(e) : (e) => e, Rg = "http://www.w3.org/2000/svg", Cg = "http://www.w3.org/1998/Math/MathML", _t = typeof document < "u" ? document : null, xl = _t && /* @__PURE__ */ _t.createElement("template"), Mg = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const o = t === "svg" ? _t.createElementNS(Rg, e) : t === "mathml" ? _t.createElementNS(Cg, e) : n ? _t.createElement(e, { is: n }) : _t.createElement(e);
    return e === "select" && r && r.multiple != null && o.setAttribute("multiple", r.multiple), o;
  },
  createText: (e) => _t.createTextNode(e),
  createComment: (e) => _t.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => _t.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, r, o, s) {
    const l = n ? n.previousSibling : t.lastChild;
    if (o && (o === s || o.nextSibling))
      for (; t.insertBefore(o.cloneNode(!0), n), !(o === s || !(o = o.nextSibling)); )
        ;
    else {
      xl.innerHTML = du(
        r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e
      );
      const a = xl.content;
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
      l ? l.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, Ig = /* @__PURE__ */ Symbol("_vtc");
function Eg(e, t, n) {
  const r = e[Ig];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Rl = /* @__PURE__ */ Symbol("_vod"), Ag = /* @__PURE__ */ Symbol("_vsh"), Og = /* @__PURE__ */ Symbol(""), Pg = /(?:^|;)\s*display\s*:/;
function Dg(e, t, n) {
  const r = e.style, o = Se(n);
  let s = !1;
  if (n && !o) {
    if (t)
      if (Se(t))
        for (const l of t.split(";")) {
          const a = l.slice(0, l.indexOf(":")).trim();
          n[a] == null && sr(r, a, "");
        }
      else
        for (const l in t)
          n[l] == null && sr(r, l, "");
    for (const l in n) {
      l === "display" && (s = !0);
      const a = n[l];
      a != null ? Tg(
        e,
        l,
        !Se(t) && t ? t[l] : void 0,
        a
      ) || sr(r, l, a) : sr(r, l, "");
    }
  } else if (o) {
    if (t !== n) {
      const l = r[Og];
      l && (n += ";" + l), r.cssText = n, s = Pg.test(n);
    }
  } else t && e.removeAttribute("style");
  Rl in e && (e[Rl] = s ? r.display : "", e[Ag] && (r.display = "none"));
}
const Xr = /\s*!important$/;
function sr(e, t, n) {
  if (G(n))
    n.forEach((r) => sr(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--"))
    Xr.test(n) ? e.setProperty(t, n.replace(Xr, ""), "important") : e.setProperty(t, n);
  else {
    const r = kg(e, t);
    Xr.test(n) ? e.setProperty(
      sn(r),
      n.replace(Xr, ""),
      "important"
    ) : e[r] = n;
  }
}
const Cl = ["Webkit", "Moz", "ms"], Ss = {};
function kg(e, t) {
  const n = Ss[t];
  if (n)
    return n;
  let r = Qe(t);
  if (r !== "filter" && r in e)
    return Ss[t] = r;
  r = ca(r);
  for (let o = 0; o < Cl.length; o++) {
    const s = Cl[o] + r;
    if (s in e)
      return Ss[t] = s;
  }
  return t;
}
function Tg(e, t, n, r) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && Se(r) && n === r;
}
const Ml = "http://www.w3.org/1999/xlink";
function Il(e, t, n, r, o, s = Vf(t)) {
  r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Ml, t.slice(6, t.length)) : e.setAttributeNS(Ml, t, n) : n == null || s && !da(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    s ? "" : dt(n) ? String(n) : n
  );
}
function El(e, t, n, r, o) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? du(n) : n);
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
  let l = !1;
  if (n === "" || n == null) {
    const a = typeof e[t];
    a === "boolean" ? n = da(n) : n == null && a === "string" ? (n = "", l = !0) : a === "number" && (n = 0, l = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  l && e.removeAttribute(o || t);
}
function Fg(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function Hg(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const Al = /* @__PURE__ */ Symbol("_vei");
function Lg(e, t, n, r, o = null) {
  const s = e[Al] || (e[Al] = {}), l = s[t];
  if (r && l)
    l.value = r;
  else {
    const [a, c] = Kg(t);
    if (r) {
      const d = s[t] = Ng(
        r,
        o
      );
      Fg(e, a, d, c);
    } else l && (Hg(e, a, l, c), s[t] = void 0);
  }
}
const jg = /(Once|Passive|Capture)$/, zg = /^on:?(?:Once|Passive|Capture)$/;
function Kg(e) {
  let t, n;
  for (; (n = e.match(jg)) && !zg.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : sn(e.slice(2)), t];
}
let xs = 0;
const Vg = /* @__PURE__ */ Promise.resolve(), Bg = () => xs || (Vg.then(() => xs = 0), xs = Date.now());
function Ng(e, t) {
  const n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    const o = n.value;
    if (G(o)) {
      const s = r.stopImmediatePropagation;
      r.stopImmediatePropagation = () => {
        s.call(r), r._stopped = !0;
      };
      const l = o.slice(), a = [r];
      for (let c = 0; c < l.length && !r._stopped; c++) {
        const d = l[c];
        d && nt(
          d,
          t,
          5,
          a
        );
      }
    } else
      nt(
        o,
        t,
        5,
        [r]
      );
  };
  return n.value = e, n.attached = Bg(), n;
}
const Ol = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, $g = (e, t, n, r, o, s) => {
  const l = o === "svg";
  t === "class" ? Eg(e, r, l) : t === "style" ? Dg(e, n, r) : bo(t) ? _o(t) || Lg(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Wg(e, t, r, l)) ? (El(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Il(e, t, r, l, s, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Ug(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !Se(r))) ? El(e, Qe(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), Il(e, t, r, l));
};
function Wg(e, t, n, r) {
  if (r)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Ol(t) && X(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return Ol(t) && Se(n) ? !1 : t in e;
}
function Ug(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const r = Qe(t);
  return Array.isArray(n) ? n.some((o) => Qe(o) === r) : Object.keys(n).some((o) => Qe(o) === r);
}
const qg = ["ctrl", "shift", "alt", "meta"], Gg = {
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
  exact: (e, t) => qg.some((n) => e[`${n}Key`] && !t.includes(n))
}, Yt = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), r = t.join(".");
  return n[r] || (n[r] = (o, ...s) => {
    for (let l = 0; l < t.length; l++) {
      const a = Gg[t[l]];
      if (a && a(o, t)) return;
    }
    return e(o, ...s);
  });
}, Xg = /* @__PURE__ */ Pe({ patchProp: $g }, Mg);
let Pl;
function Yg() {
  return Pl || (Pl = sg(Xg));
}
const Zg = (...e) => {
  const t = Yg().createApp(...e), { mount: n } = t;
  return t.mount = (r) => {
    const o = Qg(r);
    if (!o) return;
    const s = t._component;
    !X(s) && !s.render && !s.template && (s.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const l = n(o, !1, Jg(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), l;
  }, t;
};
function Jg(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Qg(e) {
  return Se(e) ? document.querySelector(e) : e;
}
function Yr() {
  return !0;
}
const ep = Symbol("merge-proxy"), oo = Symbol("merge-proxy-sources"), tp = {
  get(e, t, n) {
    return t === ep ? n : t === oo ? e.sources : e.get(t);
  },
  has(e, t) {
    return e.has(t);
  },
  set: Yr,
  deleteProperty: Yr,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: Yr,
      deleteProperty: Yr
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function so(e) {
  return e && typeof e == "object" && "value" in e ? e.value : e;
}
function Ns(...e) {
  const t = e.flatMap((n) => typeof n == "object" && n !== null && oo in n && Array.isArray(n[oo]) ? n[oo] : [n]);
  return new Proxy({
    sources: t,
    get(n) {
      for (let r = t.length - 1; r >= 0; r--) {
        const o = so(t[r])[n];
        if (o !== void 0) return o;
      }
    },
    has(n) {
      for (let r = t.length - 1; r >= 0; r--) if (n in so(t[r])) return !0;
      return !1;
    },
    keys() {
      const n = [];
      for (const r of t) n.push(...Object.keys(so(r)));
      return [...Array.from(new Set(n))];
    }
  }, tp);
}
function Dl(...e) {
  const t = {};
  for (let n of e)
    if (n = so(n), !!n)
      for (const r of Reflect.ownKeys(n)) {
        const o = n[r];
        o !== void 0 && (t[r] = o);
      }
  return t;
}
function gu(e) {
  return typeof e == "function" ? e : (t) => {
    var n;
    return (n = e.next) == null ? void 0 : n.call(e, t);
  };
}
function np(e) {
  return Object.assign(e, {
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: ye(e, gu(t), { flush: "sync" }) })
  });
}
function rp(e) {
  return Object.assign(e, {
    set: (t) => {
      e.value = typeof t == "function" ? t(e.value) : t;
    },
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: ye(e, gu(t), { flush: "sync" }) })
  });
}
function op() {
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
    createReadonlyAtom: (t, n) => np(W(() => t())),
    createWritableAtom: (t, n) => rp(/* @__PURE__ */ cd(t)),
    untrack: (t) => t(),
    batch: (t) => t()
  };
}
function Do(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function gt(e) {
  if (Array.isArray(e)) return e.map(gt);
  if (e && typeof e == "object") {
    const t = Object.getPrototypeOf(e);
    if (t !== Object.prototype && t !== null) return e;
    const n = t === null ? te() : {}, r = Object.keys(e);
    for (let o = 0; o < r.length; o++) {
      const s = r[o];
      Object.defineProperty(n, s, {
        configurable: !0,
        enumerable: !0,
        value: gt(e[s]),
        writable: !0
      });
    }
    return n;
  }
  return e;
}
function pu(e, t) {
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
function ln(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Mr(e, t) {
  return (n) => {
    var r;
    (((r = t.options.atoms) == null ? void 0 : r[e]) ?? t.baseAtoms[e]).set((o) => Do(n, o));
  };
}
function kl(e) {
  if (typeof e != "object" || e === null) return !1;
  if (Array.isArray(e)) return !0;
  const t = Object.getPrototypeOf(e);
  return t === Object.prototype || t === null;
}
function Tl(e) {
  return Reflect.ownKeys(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
const sp = 3;
function ip(e, t) {
  return hu(e, t, sp);
}
function hu(e, t, n) {
  if (Object.is(e, t)) return !0;
  if (n <= 0 || !kl(e) || !kl(t) || (Array.isArray(e) || Array.isArray(t)) && (!Array.isArray(e) || !Array.isArray(t) || e.length !== t.length))
    return !1;
  const r = Tl(e), o = Tl(t);
  if (r.length !== o.length) return !1;
  const s = e, l = t;
  for (let a = 0; a < r.length; a++) {
    const c = r[a];
    if (!Object.prototype.propertyIsEnumerable.call(t, c) || !hu(s[c], l[c], n - 1)) return !1;
  }
  return !0;
}
function ko(e, t, n, r = ip) {
  const o = `on${t.charAt(0).toUpperCase()}${t.slice(1)}Change`, s = e.options[o];
  s && s((l) => {
    const a = Do(n, l);
    return r(l, a) ? l : a;
  });
}
function lp(e) {
  return e instanceof Function;
}
function ap(e, t) {
  const n = [], r = (o) => {
    o.forEach((s) => {
      n.push(s);
      const l = t(s);
      l.length && r(l);
    });
  };
  return r(e), n;
}
const up = ({ fn: e, memoDeps: t, onAfterCompare: n, onAfterUpdate: r, onBeforeCompare: o, onBeforeUpdate: s }) => {
  let l = [], a;
  return (d) => {
    o == null || o();
    const g = t == null ? void 0 : t(d);
    let h = !g || g.length !== (l == null ? void 0 : l.length);
    if (!h && g) {
      for (let y = 0; y < g.length; y++) if (g[y] !== l[y]) {
        h = !0;
        break;
      }
    }
    return n == null || n(h), h && (l = g, s == null || s(), a = e(...g ?? []), r == null || r(a)), a;
  };
};
function vu(e) {
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
  const l = () => {
    if (!r) return;
    const { schedule: c, untrack: d } = o._reactivity;
    c(() => d(() => r()));
  };
  return up({
    ...s,
    ...{ onAfterUpdate: () => {
      l();
    } }
  });
}
function mu(e, t = "_") {
  const [n, r] = e.split(t);
  return {
    fnKey: r,
    fnName: `${n}.${r}`,
    parentName: n
  };
}
function pt(e, t, n) {
  for (const [r, { fn: o, memoDeps: s }] of Object.entries(n)) {
    const { fnKey: l, fnName: a } = mu(r);
    t[l] = s ? Ir({
      memoDeps: s,
      fn: o,
      fnName: a,
      table: t,
      feature: e
    }) : o;
  }
}
function rt(e, t, n, r) {
  for (const [o, { fn: s, memoDeps: l }] of Object.entries(r)) {
    const { fnKey: a, fnName: c } = mu(o);
    if (l) {
      const d = `_memo_${a}`;
      t[a] = function(...g) {
        if (!this[d]) {
          const h = this;
          this[d] = Ir({
            memoDeps: (y) => l(h, y),
            fn: (...y) => s(h, ...y),
            fnName: c,
            objectId: h.id,
            table: n,
            feature: e
          });
        }
        return this[d](...g);
      };
    } else t[a] = function(...d) {
      return s(this, ...d);
    };
  }
}
function Y(e, t, n, ...r) {
  var o;
  return ((o = e[t]) == null ? void 0 : o.call(e, ...r)) ?? n(e, ...r);
}
function cp(e) {
  return e.row.getValue(e.column.id);
}
function fp(e) {
  return e.getValue() ?? e.table.options.renderFallbackValue;
}
function dp(e) {
  return {
    table: e.table,
    column: e.column,
    row: e.row,
    cell: e,
    getValue: () => e.getValue(),
    renderValue: () => e.renderValue()
  };
}
const gp = { assignCellPrototype: (e, t) => {
  rt("coreCellsFeature", e, t, {
    cell_getValue: { fn: (n) => cp(n) },
    cell_renderValue: { fn: (n) => fp(n) },
    cell_getContext: {
      fn: (n) => dp(n),
      memoDeps: (n) => [n]
    }
  });
} };
function pp(e) {
  var t, n;
  if (!e._headerPrototype) {
    e._headerPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignHeaderPrototype) == null || n.call(t, e._headerPrototype, e);
  }
  return e._headerPrototype;
}
function yu(e, t, n) {
  const r = pp(e), o = Object.create(r);
  o.colSpan = 0, o.column = t, o.depth = n.depth, o.headerGroup = null, o.id = n.id ?? t.id, o.index = n.index, o.isPlaceholder = !!n.isPlaceholder, o.placeholderId = n.placeholderId, o.rowSpan = 0, o.subHeaders = [];
  const s = e._headerInstanceInitFns;
  for (let l = 0; l < s.length; l++) s[l](o);
  return o;
}
function an() {
  return {
    start: [],
    end: []
  };
}
function hp(e) {
  var s;
  const t = e.getAllColumns(), n = e.getAllLeafColumnsById(), { start: r } = ((s = e.atoms.columnPinning) == null ? void 0 : s.get()) ?? an(), o = [];
  for (let l = 0; l < r.length; l++) {
    const a = n[r[l]];
    a && Y(a, "getIsVisible", Xe) && o.push(a);
  }
  return br(t, o, e, "start");
}
function vp(e) {
  var s;
  const t = e.getAllColumns(), n = e.getAllLeafColumnsById(), { end: r } = ((s = e.atoms.columnPinning) == null ? void 0 : s.get()) ?? an(), o = [];
  for (let l = 0; l < r.length; l++) {
    const a = n[r[l]];
    a && Y(a, "getIsVisible", Xe) && o.push(a);
  }
  return br(t, o, e, "end");
}
function mp(e) {
  var s;
  const t = e.getAllColumns();
  let n = Y(e, "getVisibleLeafColumns", pi);
  const { start: r, end: o } = ((s = e.atoms.columnPinning) == null ? void 0 : s.get()) ?? an();
  if (r.length || o.length) {
    const l = [...r, ...o];
    n = n.filter((a) => !l.includes(a.id));
  }
  return br(t, n, e, "center");
}
function yp(e) {
  var o;
  const { start: t } = ((o = e.atoms.columnPinning) == null ? void 0 : o.get()) ?? an(), n = e.getAllLeafColumnsById(), r = [];
  for (let s = 0; s < t.length; s++) {
    const l = n[t[s]];
    l && r.push(l);
  }
  return r;
}
function wp(e) {
  var o;
  const { end: t } = ((o = e.atoms.columnPinning) == null ? void 0 : o.get()) ?? an(), n = e.getAllLeafColumnsById(), r = [];
  for (let s = 0; s < t.length; s++) {
    const l = n[t[s]];
    l && r.push(l);
  }
  return r;
}
function bp(e) {
  var o;
  const { start: t, end: n } = ((o = e.atoms.columnPinning) == null ? void 0 : o.get()) ?? an();
  if (!t.length && !n.length) return e.getAllLeafColumns();
  const r = [...t, ...n];
  return e.getAllLeafColumns().filter((s) => !r.includes(s.id));
}
function _p(e) {
  return Y(e, "getStartLeafColumns", yp).filter((t) => Y(t, "getIsVisible", Xe));
}
function Sp(e) {
  return Y(e, "getEndLeafColumns", wp).filter((t) => Y(t, "getIsVisible", Xe));
}
function xp(e) {
  return Y(e, "getCenterLeafColumns", bp).filter((t) => Y(t, "getIsVisible", Xe));
}
function Zr(e, t) {
  return t ? t === "start" ? Y(e, "getStartVisibleLeafColumns", _p) : t === "end" ? Y(e, "getEndVisibleLeafColumns", Sp) : Y(e, "getCenterVisibleLeafColumns", xp) : Y(e, "getVisibleLeafColumns", pi);
}
function Xe(e) {
  var r;
  const t = (r = e.table.atoms.columnVisibility) == null ? void 0 : r.get();
  if (!t) return !0;
  const n = e.columns;
  return n.length ? n.some((o) => Y(o, "getIsVisible", Xe)) : (ln(t, e.id) ? t[e.id] : void 0) ?? !0;
}
function pi(e) {
  return e.getAllLeafColumns().filter((t) => Y(t, "getIsVisible", Xe));
}
function wu(e, t = 1) {
  let n = t;
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    Y(o, "getIsVisible", Xe) && o.columns.length && (n = Math.max(n, wu(o.columns, t + 1)));
  }
  return n;
}
function Rp(e, t) {
  return e ? `${e}_${t}` : String(t);
}
function Cp(e, t, n, r) {
  let o = e ?? "";
  return t && (o = o ? `${o}_${t}` : String(t)), n && (o = o ? `${o}_${n}` : n), r && (o = o ? `${o}_${r}` : r), o;
}
function Mp(e, t) {
  let n = 0;
  for (let r = 0; r < e.length; r++) e[r].column === t && n++;
  return n;
}
function bu(e, t, n, r, o, s) {
  const l = {
    depth: t,
    id: Rp(r, t),
    headers: []
  }, a = [];
  for (let c = 0; c < e.length; c++) {
    if (!(c in e)) continue;
    const d = e[c], g = a[a.length - 1], h = d.column.depth === l.depth;
    let y, w = !1;
    if (h && d.column.parent ? y = d.column.parent : (y = d.column, w = !0), g && g.column === y) g.subHeaders.push(d);
    else {
      const O = yu(n, y, {
        id: Cp(r, t, y.id, d.id),
        isPlaceholder: w,
        placeholderId: w ? String(Mp(a, y)) : void 0,
        depth: t,
        index: a.length
      });
      O.subHeaders.push(d), a.push(O);
    }
    l.headers.push(d), d.headerGroup = l;
  }
  for (let c = 0; c < s.length; c++) s[c](l);
  o.push(l), t > 0 && bu(a, t - 1, n, r, o, s);
}
function _u(e) {
  for (let t = 0; t < e.length; t++) {
    const n = e[t];
    if (!Y(n.column, "getIsVisible", Xe)) continue;
    let r = 0;
    if (n.subHeaders.length) {
      _u(n.subHeaders);
      for (let o = 0; o < n.subHeaders.length; o++) {
        const s = n.subHeaders[o];
        Y(s.column, "getIsVisible", Xe) && (r += s.colSpan);
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
function br(e, t, n, r) {
  var c;
  const o = wu(e), s = [], l = n._headerGroupInstanceInitFns, a = new Array(t.length);
  for (let d = 0; d < t.length; d++)
    d in t && (a[d] = yu(n, t[d], {
      depth: o,
      index: d
    }));
  return bu(a, o - 1, n, r, s, l), s.reverse(), _u(((c = s[0]) == null ? void 0 : c.headers) ?? []), s;
}
function Ip(e) {
  var t, n;
  if (!e._columnPrototype) {
    e._columnPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignColumnPrototype) == null || n.call(t, e._columnPrototype, e);
  }
  return e._columnPrototype;
}
function Ep(e, t, n, r) {
  const o = {
    ...e.getDefaultColumnDef(),
    ...t
  }, s = o.accessorKey, l = s === void 0 ? void 0 : String(s), a = o.id ?? (l == null ? void 0 : l.replaceAll(".", "_")) ?? (typeof o.header == "string" ? o.header : void 0);
  let c;
  if (o.accessorFn) c = o.accessorFn;
  else if (s !== void 0) if (typeof s == "string" && s.includes(".")) {
    const y = s.split(".");
    c = (w) => {
      let O = w;
      for (let R = 0; R < y.length; R++) {
        const A = y[R];
        O = O == null ? void 0 : O[A];
      }
      return O;
    };
  } else c = (y) => y[o.accessorKey];
  if (!a)
    throw new Error();
  const d = Ip(e), g = Object.create(d);
  g.accessorFn = c, g.columnDef = o, g.columns = [], g.depth = n, g.id = `${String(a)}`, g.parent = r;
  const h = e._columnInstanceInitFns;
  for (let y = 0; y < h.length; y++) h[y](g);
  return g;
}
function Su(e) {
  var n;
  const t = (n = e.atoms.columnOrder) == null ? void 0 : n.get();
  return (r) => {
    let o = [];
    if (!(t != null && t.length)) o = r;
    else {
      const s = /* @__PURE__ */ new Map();
      for (let l = 0; l < r.length; l++) {
        const a = r[l];
        s.set(a.id, a);
      }
      for (let l = 0; l < t.length; l++) {
        const a = t[l], c = s.get(a);
        c && (o.push(c), s.delete(a));
      }
      for (let l = 0; l < r.length; l++) {
        const a = r[l];
        s.has(a.id) && o.push(a);
      }
    }
    return Ap(e, o);
  };
}
function Ap(e, t) {
  var a;
  const n = ((a = e.atoms.grouping) == null ? void 0 : a.get()) ?? [], { groupedColumnMode: r } = e.options;
  if (!n.length || !r) return t;
  const o = t.filter((c) => !n.includes(c.id));
  if (r === "remove") return o;
  const s = /* @__PURE__ */ new Map();
  for (let c = 0; c < t.length; c++) {
    const d = t[c];
    s.set(d.id, d);
  }
  const l = [];
  for (let c = 0; c < n.length; c++) {
    const d = s.get(n[c]);
    d && l.push(d);
  }
  return [...l, ...o];
}
function Op(e) {
  return [e, ...e.columns.flatMap((t) => t.getFlatColumns())];
}
function Pp(e) {
  if (e.columns.length) {
    const t = e.columns.flatMap((n) => n.getLeafColumns());
    return Y(e.table, "getOrderColumns", Su)(t);
  }
  return [e];
}
function Dp(e) {
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
function xu(e, t, n, r = 0) {
  const o = new Array(t.length);
  for (let s = 0; s < t.length; s++) {
    if (!(s in t)) continue;
    const l = t[s], a = Ep(e, l, r, n), c = l;
    a.columns = c.columns ? xu(e, c.columns, a, r + 1) : [], o[s] = a;
  }
  return o;
}
function kp(e) {
  return xu(e, e.options.columns);
}
function Tp(e) {
  return e.getAllColumns().flatMap((t) => t.getFlatColumns());
}
function Fp(e) {
  const t = te(), n = e.getAllFlatColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function Hp(e) {
  const t = e.getAllColumns().flatMap((n) => n.getLeafColumns());
  return Y(e, "getOrderColumns", Su)(t);
}
function Lp(e) {
  const t = te(), n = e.getAllLeafColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function jp(e, t) {
  return e.getAllFlatColumnsById()[t];
}
const zp = {
  assignColumnPrototype: (e, t) => {
    rt("coreColumnsFeature", e, t, {
      column_getFlatColumns: {
        fn: (n) => Op(n),
        memoDeps: (n) => [n.table.options.columns]
      },
      column_getLeafColumns: {
        fn: (n) => Pp(n),
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
    pt("coreColumnsFeature", e, {
      table_getDefaultColumnDef: {
        fn: () => Dp(e),
        memoDeps: () => [e.options.defaultColumn]
      },
      table_getAllColumns: {
        fn: () => kp(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumns: {
        fn: () => Tp(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumnsById: {
        fn: () => Fp(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllLeafColumns: {
        fn: () => Hp(e),
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
        fn: () => Lp(e),
        memoDeps: () => [e.getAllLeafColumns()]
      },
      table_getColumn: { fn: (t) => jp(e, t) }
    });
  }
};
function Ru(e, t) {
  for (let n = 0; n < e.subHeaders.length; n++) Ru(e.subHeaders[n], t);
  t.push(e);
}
function Kp(e) {
  const t = [];
  return Ru(e, t), t;
}
function Vp(e) {
  return {
    column: e.column,
    header: e,
    table: e.column.table
  };
}
function Bp(e) {
  var d;
  const { start: t, end: n } = ((d = e.atoms.columnPinning) == null ? void 0 : d.get()) ?? an(), r = e.getAllColumns(), o = Y(e, "getVisibleLeafColumns", pi);
  if (!t.length && !n.length) return br(r, o, e);
  const s = e.getAllLeafColumnsById(), l = [];
  for (let g = 0; g < t.length; g++) {
    const h = s[t[g]];
    h && Y(h, "getIsVisible", Xe) && l.push(h);
  }
  const a = [];
  for (let g = 0; g < n.length; g++) {
    const h = s[n[g]];
    h && Y(h, "getIsVisible", Xe) && a.push(h);
  }
  const c = o.filter((g) => !t.includes(g.id) && !n.includes(g.id));
  return br(r, [
    ...l,
    ...c,
    ...a
  ], e);
}
function Np(e) {
  return [...e.getHeaderGroups()].reverse();
}
function $p(e) {
  const t = e.getHeaderGroups(), n = [];
  for (let r = 0; r < t.length; r++) {
    const o = t[r].headers;
    for (let s = 0; s < o.length; s++) n.push(o[s]);
  }
  return n;
}
function Wp(e) {
  var r;
  const t = ((r = e.getHeaderGroups()[0]) == null ? void 0 : r.headers) ?? [], n = [];
  for (let o = 0; o < t.length; o++) {
    const s = t[o].getLeafHeaders();
    for (let l = 0; l < s.length; l++) n.push(s[l]);
  }
  return n;
}
const Up = {
  assignHeaderPrototype: (e, t) => {
    rt("coreHeadersFeature", e, t, {
      header_getLeafHeaders: {
        fn: (n) => Kp(n),
        memoDeps: (n) => [n.column.table.options.columns]
      },
      header_getContext: {
        fn: (n) => Vp(n),
        memoDeps: (n) => [n.column.table.options.columns]
      }
    });
  },
  constructTableAPIs: (e) => {
    pt("coreHeadersFeature", e, {
      table_getHeaderGroups: {
        fn: () => Bp(e),
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
        fn: () => Np(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getFlatHeaders: {
        fn: () => $p(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getLeafHeaders: {
        fn: () => Wp(e),
        memoDeps: () => [e.getHeaderGroups()]
      }
    });
  }
};
function qp(e) {
  var t, n;
  if (!e._rowPrototype) {
    e._rowPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignRowPrototype) == null || n.call(t, e._rowPrototype, e);
  }
  return e._rowPrototype;
}
const Gp = (e, t, n, r, o, s, l) => {
  const a = qp(e), c = Object.create(a);
  c._displayIndexCache = -1, c._uniqueValuesCache = te(), c._valuesCache = te(), c.depth = o, c.id = t, c.index = r, c.original = n, c.parentId = l, c.subRows = [];
  const d = e._rowInstanceInitFns;
  for (let g = 0; g < d.length; g++) d[g](c);
  return c;
}, Xp = /([0-9]+)/gm;
function Tn(e) {
  const t = Object.assign((n, r, o) => {
    let s = n.getValue(o), l = r.getValue(o);
    const a = t.resolveDataValue;
    return a && (s = a(s), l = a(l)), t.sort(s, l, n, r, o);
  }, e);
  return t;
}
const Yp = Tn({
  resolveDataValue: (e) => To(e).toLowerCase(),
  sort: (e, t) => Mu(e, t)
});
Tn({
  resolveDataValue: (e) => To(e),
  sort: (e, t) => Mu(e, t)
});
const Zp = Tn({
  resolveDataValue: (e) => To(e).toLowerCase(),
  sort: (e, t) => hi(e, t)
});
Tn({
  resolveDataValue: (e) => To(e),
  sort: (e, t) => hi(e, t)
});
Tn({
  resolveDataValue: (e) => Jp(e),
  sort: (e, t) => e > t ? 1 : e < t ? -1 : 0
});
const Cu = Tn({ sort: (e, t) => hi(e, t) });
function hi(e, t) {
  return e === t ? 0 : e > t ? 1 : -1;
}
function Jp(e) {
  return e instanceof Date ? e.getTime() : e;
}
function To(e) {
  return typeof e == "number" ? isNaN(e) || e === 1 / 0 || e === -1 / 0 ? "" : String(e) : typeof e == "string" ? e : "";
}
function Mu(e, t) {
  let n = 0, r = 0;
  const o = e.length, s = t.length;
  for (; n < o && r < s; ) {
    const l = ho(e.charCodeAt(n)), a = ho(t.charCodeAt(r)), c = $s(e, n, l), d = $s(t, r, a);
    if (!l && !a) {
      const h = Qp(e, n, c, t, r, d);
      if (h) return h;
      n = c, r = d;
      continue;
    }
    if (l !== a) return l ? 1 : -1;
    const g = eh(e, n, c, t, r, d);
    if (g) return g;
    n = c, r = d;
  }
  return Hl(e, n) - Hl(t, r);
}
function ho(e) {
  return e >= 48 && e <= 57;
}
function $s(e, t, n) {
  let r = t + 1;
  for (; r < e.length && ho(e.charCodeAt(r)) === n; ) r++;
  return r;
}
function Qp(e, t, n, r, o, s) {
  const l = n - t, a = s - o, c = l < a ? l : a;
  for (let d = 0; d < c; d++) {
    const g = e.charCodeAt(t + d), h = r.charCodeAt(o + d);
    if (g > h) return 1;
    if (h > g) return -1;
  }
  return l > a ? 1 : a > l ? -1 : 0;
}
function eh(e, t, n, r, o, s) {
  let l = t;
  for (; l < n && e.charCodeAt(l) === 48; ) l++;
  let a = o;
  for (; a < s && r.charCodeAt(a) === 48; ) a++;
  const c = n - l, d = s - a;
  if (c === 0 && d === 0) return 0;
  if (c <= 15 && d <= 15) {
    const y = Fl(e, l, n), w = Fl(r, a, s);
    return y > w ? 1 : w > y ? -1 : 0;
  }
  const g = parseInt(e.slice(t, n), 10), h = parseInt(r.slice(o, s), 10);
  return g > h ? 1 : h > g ? -1 : 0;
}
function Fl(e, t, n) {
  let r = 0;
  for (let o = t; o < n; o++) r = r * 10 + e.charCodeAt(o) - 48;
  return r;
}
function Hl(e, t) {
  let n = 0, r = t;
  for (; r < e.length; )
    n++, r = $s(e, r, ho(e.charCodeAt(r)));
  return n;
}
function th() {
  return [];
}
function nh(e, t) {
  ko(e, "cellSelection", gt(e.initialState.cellSelection) ?? th());
}
function rh(e) {
  e.atoms.cellSelection && (e.options.autoResetAll ?? e.options.autoResetCellSelection ?? !0) && e._reactivity.schedule(() => nh(e));
}
function oh() {
  return te();
}
function Iu(e) {
  e.atoms.expanded && (e.options.autoResetAll ?? e.options.autoResetExpanded ?? !e.options.manualExpanding) && e._reactivity.schedule(() => Au(e));
}
function vo(e, t) {
  var n, r;
  (r = (n = e.options).onExpandedChange) == null || r.call(n, t);
}
function Eu(e, t) {
  var r;
  const n = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t ?? !Pu(e)) {
    if (n === !0 || !Ou(e)) return;
    vo(e, !0);
  } else {
    if (n !== !0 && !Object.keys(n).length) return;
    vo(e, te());
  }
}
function Au(e, t) {
  const n = e.initialState.expanded;
  ko(e, "expanded", t ? te() : n === !0 ? !0 : Object.assign(te(), gt(n ?? {})));
}
function Ou(e) {
  return e.getPrePaginatedRowModel().flatRows.some((t) => rn(t));
}
function sh(e) {
  return (t) => {
    Eu(e);
  };
}
function ih(e) {
  var n;
  const t = ((n = e.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return t === !0 || Object.values(t).some(Boolean);
}
function Pu(e) {
  var r;
  const t = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t === !0) return !0;
  if (!Object.keys(t).length) return !1;
  const n = e.getRowModel().flatRows.filter((o) => rn(o));
  return !(!n.length || n.some((o) => !Fo(o)));
}
function lh(e) {
  var r;
  let t = 0;
  const n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return (n === !0 ? Object.values(e.getRowModel().rowsById).filter((o) => rn(o)).map((o) => o.id) : Object.keys(n ?? {})).forEach((o) => {
    const s = o.split(".");
    t = Math.max(t, s.length);
  }), t;
}
function Du(e, t) {
  var s;
  const n = ((s = e.table.atoms.expanded) == null ? void 0 : s.get()) ?? {}, r = n === !0 || Ws(n, e.id), o = t ?? !r;
  o !== r && (o && !rn(e) || vo(e.table, (l) => {
    const a = l === !0 ? !0 : Ws(l, e.id);
    let c = te();
    if (l === !0 ? Object.values(e.table.getRowModel().rowsById).forEach((d) => {
      rn(d) && (c[d.id] = !0);
    }) : c = Object.assign(te(), l), !a && o)
      return c[e.id] = !0, c;
    if (a && !o) {
      const d = te(), g = Object.keys(c);
      for (let h = 0; h < g.length; h++) {
        const y = g[h];
        y !== e.id && c[y] && (d[y] = !0);
      }
      return d;
    }
    return l;
  }));
}
function Fo(e) {
  var n, r, o;
  const t = ((n = e.table.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return !!(((o = (r = e.table.options).getIsRowExpanded) == null ? void 0 : o.call(r, e)) ?? (t === !0 || Ws(t, e.id)));
}
function Ws(e, t) {
  return !!(e && e !== !0 && ln(e, t) && e[t]);
}
function rn(e) {
  var t, n;
  return ((n = (t = e.table.options).getRowCanExpand) == null ? void 0 : n.call(t, e)) ?? ((e.table.options.enableExpanding ?? !0) && !!e.subRows.length);
}
function ah(e) {
  let t = !0, n = e;
  for (; t && n.parentId; )
    n = e.table.getRow(n.parentId, !0), t = Fo(n);
  return t;
}
function uh(e) {
  const t = rn(e);
  return () => {
    t && Du(e);
  };
}
const Us = 0;
function ku(e) {
  var t, n;
  if (e.options.autoResetAll ?? e.options.autoResetPageIndex ?? !e.options.manualPagination) {
    if ((((n = (t = e.atoms.pagination) == null ? void 0 : t.get()) == null ? void 0 : n.pageIndex) ?? Us) === Us) return;
    dh(e);
  }
}
function ch(e, t) {
  ko(e, "pagination", t);
}
function fh(e, t) {
  ch(e, (n) => {
    let r = Do(t, n.pageIndex);
    const o = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
    return r = Math.max(0, Math.min(r, o)), {
      ...n,
      pageIndex: r
    };
  });
}
function dh(e, t) {
  fh(e, Us);
}
function gh() {
  return [];
}
function Ho(e, t) {
  ko(e, "sorting", t);
}
function Tu(e, t) {
  Ho(e, t ? [] : gt(e.initialState.sorting ?? []));
}
function ph(e) {
  e.atoms.sorting && (e.options.autoResetAll ?? e.options.autoResetSorting ?? !1) && Tu(e);
}
function Fu(e) {
  const t = e.table._rowModelFns.sortFns, n = e.table.getFilteredRowModel().flatRows.slice(0, 10);
  let r, o = !1;
  for (let s = 0; s < n.length; s++) {
    const l = n[s].getValue(e.id);
    if (Object.prototype.toString.call(l) === "[object Date]") {
      r = "datetime";
      break;
    }
    if (typeof l == "string" && (o = !0, l.split(Xp).length > 1)) {
      r = "alphanumeric";
      break;
    }
  }
  if (!r && o && (r = "text"), r) {
    let s = t == null ? void 0 : t[r];
    if (s || r === "alphanumeric" && (s = t == null ? void 0 : t.text), s) return s;
  }
  return Cu;
}
function Hu(e) {
  const t = e.table.getFilteredRowModel().flatRows.slice(0, 10);
  for (let n = 0; n < t.length; n++) {
    const r = t[n].getValue(e.id);
    if (r != null)
      return typeof r == "string" ? "asc" : "desc";
  }
  return "desc";
}
function Lu(e) {
  const t = e.table._rowModelFns.sortFns;
  return lp(e.columnDef.sortFn) ? e.columnDef.sortFn : e.columnDef.sortFn === "auto" ? Fu(e) : (t == null ? void 0 : t[e.columnDef.sortFn]) ?? Cu;
}
function ju(e, t, n) {
  const r = Ku(e, n && mo(e)), o = typeof t < "u";
  Ho(e.table, (s) => {
    const l = s.findIndex((y) => y.id === e.id), a = l === -1 ? void 0 : s[l];
    let c = [], d;
    const g = o ? t : r === "desc", h = !!(s.length && mo(e) && n);
    return h ? a ? d = "toggle" : d = "add" : a ? d = "toggle" : d = "replace", d === "toggle" && (o || r || (d = "remove")), d === "add" ? (c = [...s, {
      id: e.id,
      desc: g
    }], c.splice(0, c.length - (e.table.options.maxMultiSortColCount ?? Number.MAX_SAFE_INTEGER))) : d === "toggle" ? c = h ? s.map((y) => y.id === e.id ? {
      ...y,
      desc: g
    } : y) : [{
      id: e.id,
      desc: g
    }] : d === "remove" ? c = h ? s.filter((y) => y.id !== e.id) : [] : c = [{
      id: e.id,
      desc: g
    }], c;
  });
}
function zu(e) {
  return e.columnDef.sortDescFirst ?? e.table.options.sortDescFirst ?? Hu(e) === "desc" ? "desc" : "asc";
}
function Ku(e, t) {
  const n = zu(e), r = Vu(e);
  return r ? r !== n && (e.table.options.enableSortingRemoval ?? !0) && (!t || (e.table.options.enableMultiRemove ?? !0)) ? !1 : r === "desc" ? "asc" : "desc" : n;
}
function vi(e) {
  return (e.columnDef.enableSorting ?? !0) && (e.table.options.enableSorting ?? !0) && !!e.accessorFn;
}
function mo(e) {
  return e.columnDef.enableMultiSort ?? e.table.options.enableMultiSort ?? !!e.accessorFn;
}
function Vu(e) {
  var n, r;
  const t = (r = (n = e.table.atoms.sorting) == null ? void 0 : n.get()) == null ? void 0 : r.find((o) => o.id === e.id);
  return t ? t.desc ? "desc" : "asc" : !1;
}
function hh(e) {
  var t, n;
  return ((n = (t = e.table.atoms.sorting) == null ? void 0 : t.get()) == null ? void 0 : n.findIndex((r) => r.id === e.id)) ?? -1;
}
function vh(e) {
  Ho(e.table, (t) => t.length ? t.filter((n) => n.id !== e.id) : []);
}
function mh(e) {
  const t = vi(e);
  return (n) => {
    var r, o;
    t && ju(e, void 0, mo(e) ? (o = (r = e.table.options).isMultiSortEvent) == null ? void 0 : o.call(r, n) : !1);
  };
}
function Bu() {
  return (e) => Ir({
    feature: "coreRowModelsFeature",
    table: e,
    fnName: "table.getCoreRowModel",
    memoDeps: () => [e.options.data],
    fn: () => yh(e, e.options.data),
    onAfterUpdate: vu(() => {
      Iu(e), ku(e), ph(e), rh(e);
    })
  });
}
function Nu(e, t, n, r = 0, o) {
  var l;
  const s = [];
  for (let a = 0; a < n.length; a++) {
    const c = n[a], d = Gp(e, e.getRowId(c, a, o), c, a, r, void 0, o == null ? void 0 : o.id);
    t.flatRows.push(d), t.rowsById[d.id] = d, s.push(d), e.options.getSubRows && (d.originalSubRows = e.options.getSubRows(c, a), (l = d.originalSubRows) != null && l.length && (d.subRows = Nu(e, t, d.originalSubRows, r + 1, d)));
  }
  return s;
}
function yh(e, t) {
  const n = {
    rows: [],
    flatRows: [],
    rowsById: te()
  };
  return n.rows = Nu(e, n, t), n;
}
function wh(e) {
  var t, n;
  return e._rowModels.coreRowModel || (e._rowModels.coreRowModel = ((n = (t = e.options.features).coreRowModel) == null ? void 0 : n.call(t, e)) ?? Bu()(e)), e._rowModels.coreRowModel();
}
function bh(e) {
  return e.getCoreRowModel();
}
function _h(e) {
  var t, n;
  return e._rowModels.filteredRowModel || (e._rowModels.filteredRowModel = (n = (t = e.options.features).filteredRowModel) == null ? void 0 : n.call(t, e)), e.options.manualFiltering || !e._rowModels.filteredRowModel ? e.getPreFilteredRowModel() : e._rowModels.filteredRowModel();
}
function Sh(e) {
  return e.getFilteredRowModel();
}
function xh(e) {
  var t, n;
  return e._rowModels.groupedRowModel || (e._rowModels.groupedRowModel = (n = (t = e.options.features).groupedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualGrouping || !e._rowModels.groupedRowModel ? e.getPreGroupedRowModel() : e._rowModels.groupedRowModel();
}
function Rh(e) {
  return e.getGroupedRowModel();
}
function Ch(e) {
  var t, n;
  return e._rowModels.sortedRowModel || (e._rowModels.sortedRowModel = (n = (t = e.options.features).sortedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualSorting || !e._rowModels.sortedRowModel ? e.getPreSortedRowModel() : e._rowModels.sortedRowModel();
}
function Mh(e) {
  return e.getSortedRowModel();
}
function Ih(e) {
  var t, n;
  return e._rowModels.expandedRowModel || (e._rowModels.expandedRowModel = (n = (t = e.options.features).expandedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualExpanding || !e._rowModels.expandedRowModel ? e.getPreExpandedRowModel() : e._rowModels.expandedRowModel();
}
function Eh(e) {
  return e.getExpandedRowModel();
}
function Ah(e) {
  var t, n;
  return e._rowModels.paginatedRowModel || (e._rowModels.paginatedRowModel = (n = (t = e.options.features).paginatedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualPagination || !e._rowModels.paginatedRowModel ? e.getPrePaginatedRowModel() : e._rowModels.paginatedRowModel();
}
function Oh(e) {
  return e.getPaginatedRowModel();
}
const Ph = { constructTableAPIs: (e) => {
  pt("coreRowModelsFeature", e, {
    table_getCoreRowModel: { fn: () => wh(e) },
    table_getPreFilteredRowModel: { fn: () => bh(e) },
    table_getFilteredRowModel: { fn: () => _h(e) },
    table_getPreGroupedRowModel: { fn: () => Sh(e) },
    table_getGroupedRowModel: { fn: () => xh(e) },
    table_getPreSortedRowModel: { fn: () => Rh(e) },
    table_getSortedRowModel: { fn: () => Ch(e) },
    table_getPreExpandedRowModel: { fn: () => Mh(e) },
    table_getExpandedRowModel: { fn: () => Ih(e) },
    table_getPrePaginatedRowModel: { fn: () => Eh(e) },
    table_getPaginatedRowModel: { fn: () => Ah(e) },
    table_getRowModel: { fn: () => Oh(e) }
  });
} };
function Dh(e) {
  var t, n;
  if (!e._cellPrototype) {
    e._cellPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignCellPrototype) == null || n.call(t, e._cellPrototype, e);
  }
  return e._cellPrototype;
}
function kh(e, t, n) {
  const r = Dh(n), o = Object.create(r);
  o.column = e, o.id = `${t.id}_${e.id}`, o.row = t;
  const s = n._cellInstanceInitFns;
  for (let l = 0; l < s.length; l++) s[l](o);
  return o;
}
function Th(e) {
  const t = e.table.getRowsInDisplayOrder(), n = e._displayIndexCache;
  return t[n] === e ? n : -1;
}
function Fh(e) {
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
function Hh(e, t) {
  if (ln(e._valuesCache, t)) return e._valuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return e._valuesCache[t] = n.accessorFn(e.original, e.index), e._valuesCache[t];
}
function Lh(e, t) {
  if (ln(e._uniqueValuesCache, t)) return e._uniqueValuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return n.columnDef.getUniqueValues ? (e._uniqueValuesCache[t] = n.columnDef.getUniqueValues(e.original, e.index), e._uniqueValuesCache[t]) : (e._uniqueValuesCache[t] = [e.getValue(t)], e._uniqueValuesCache[t]);
}
function jh(e, t) {
  return e.getValue(t) ?? e.table.options.renderFallbackValue;
}
function zh(e) {
  return ap(e.subRows, (t) => t.subRows);
}
function Kh(e) {
  const t = e.getCoreRowModel().flatRows;
  let n = 0;
  for (let r = 0; r < t.length; r++) n = Math.max(n, t[r].depth);
  return n;
}
function Vh(e) {
  if (e.parentId)
    return e.table.getCoreRowModel().rowsById[e.parentId] ?? e.table.getRow(e.parentId, !0);
}
function Bh(e) {
  const t = [];
  let n = e;
  for (; ; ) {
    const r = n.getParentRow();
    if (!r) break;
    t.push(r), n = r;
  }
  return t.reverse();
}
function Nh(e) {
  const t = e.table.getAllLeafColumns();
  let n = e._cellsCache;
  n || (n = e._cellsCache = /* @__PURE__ */ new WeakMap());
  const r = new Array(t.length);
  for (let o = 0; o < t.length; o++) {
    const s = t[o];
    let l = n.get(s);
    l || (l = kh(s, e, e.table), n.set(s, l)), r[o] = l;
  }
  return r;
}
function $h(e) {
  const t = te(), n = e.getAllCells();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.column.id] = o;
  }
  return t;
}
function Wh(e, t, n, r) {
  var o, s;
  return ((s = (o = t.options).getRowId) == null ? void 0 : s.call(o, e, n, r)) ?? (r ? `${r.id}.${n}` : String(n));
}
function Uh(e, t, n) {
  let r = (n ? e.getPrePaginatedRowModel() : e.getRowModel()).rowsById[t];
  if (!r && (r = e.getCoreRowModel().rowsById[t], !r))
    throw new Error();
  return r;
}
const qh = {
  assignRowPrototype: (e, t) => {
    rt("coreRowsFeature", e, t, {
      row_getDisplayIndex: { fn: (n) => Th(n) },
      row_getAllCellsByColumnId: {
        fn: (n) => $h(n),
        memoDeps: (n) => [n.getAllCells()]
      },
      row_getAllCells: {
        fn: (n) => Nh(n),
        memoDeps: (n) => [n.table.getAllLeafColumns()]
      },
      row_getLeafRows: {
        fn: (n) => zh(n),
        memoDeps: (n) => [n.subRows]
      },
      row_getParentRow: { fn: (n) => Vh(n) },
      row_getParentRows: { fn: (n) => Bh(n) },
      row_getUniqueValues: { fn: (n, r) => Lh(n, r) },
      row_getValue: { fn: (n, r) => Hh(n, r) },
      row_renderValue: { fn: (n, r) => jh(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    pt("coreRowsFeature", e, {
      table_getRowsInDisplayOrder: {
        fn: () => Fh(e),
        memoDeps: () => {
          var t;
          return [
            e.getPrePaginatedRowModel().rows,
            e.options.paginateExpandedRows,
            e.options.paginateExpandedRows === !1 ? (t = e.atoms.expanded) == null ? void 0 : t.get() : void 0
          ];
        }
      },
      table_getRowId: { fn: (t, n, r) => Wh(t, e, n, r) },
      table_getRow: { fn: (t, n) => Uh(e, t, n) },
      table_getMaxSubRowDepth: {
        fn: () => Kh(e),
        memoDeps: () => [e.getCoreRowModel()]
      }
    });
  }
};
function $u(e, t, n = (r, o) => r === o) {
  const r = t === void 0 ? e.options.state : t;
  e._reactivity.batch(() => {
    if (r) for (const o in r) {
      const s = e.baseAtoms[o];
      if (!s) continue;
      const l = r[o], a = l === void 0 ? e.initialState[o] : l;
      n(e._reactivity.untrack(() => s.get()), a) || s.set(() => a);
    }
  });
}
function Gh(e, t, n = (r, o) => r === o) {
  e._reactivity.batch(() => {
    var r, o;
    $u(e, t, n), (o = (r = e._reactivity).commit) == null || o.call(r);
  });
}
function Xh(e) {
  var r, o;
  const t = gt(e.initialState);
  e._reactivity.batch(() => {
    const s = Object.keys(t);
    for (let l = 0; l < s.length; l++) {
      const a = s[l];
      e.baseAtoms[a].set(t[a]);
    }
  });
  const n = Object.values(e._features);
  for (let s = 0; s < n.length; s++) (o = (r = n[s]).resetTableInstanceData) == null || o.call(r, e);
}
function Yh(e, t) {
  const { features: n, atoms: r, initialState: o } = e.options;
  if (!e.options.mergeOptions) return {
    ...e.options,
    ...t,
    features: n,
    atoms: r,
    initialState: o
  };
  const s = e.options.mergeOptions(e.options, t), l = { ...Object.getOwnPropertyDescriptors(s) };
  return Object.defineProperties(Object.create(Object.getPrototypeOf(s)), {
    ...l,
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
function Zh(e, t, n) {
  const r = Yh(e, Do(t, e.options));
  e.optionsStore ? e.optionsStore.set(() => r) : e.options = r, Gh(e, r.state ?? null);
}
const Jh = { constructTableAPIs: (e) => {
  pt("coreTablesFeature", e, {
    table_reset: { fn: () => Xh(e) },
    table_setOptions: { fn: (t) => Zh(e, t) }
  });
} }, Qh = {
  coreCellsFeature: gp,
  coreColumnsFeature: zp,
  coreHeadersFeature: Up,
  coreRowModelsFeature: Ph,
  coreRowsFeature: qh,
  coreTablesFeature: Jh
};
function ev(e) {
  const t = e;
  return Object.defineProperty(e, "state", { get() {
    return e.get();
  } }), "set" in e && (t.setState = e.set.bind(e)), t;
}
function tv(e, t) {
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
  const n = Ll(e);
  if (n.length !== Ll(t).length) return !1;
  for (let r = 0; r < n.length; r++) if (!Object.prototype.hasOwnProperty.call(t, n[r]) || !Object.is(e[n[r]], t[n[r]])) return !1;
  return !0;
}
function Ll(e) {
  return Object.keys(e).concat(Object.getOwnPropertySymbols(e));
}
function nv(e, t = {}) {
  return Object.values(e).forEach((n) => {
    var r;
    t = ((r = n.getInitialState) == null ? void 0 : r.call(n, t)) ?? t;
  }), gt(t);
}
function rv(e) {
  var L, B;
  const t = e.features.coreReactivityFeature, { aggregationFns: n, columnMeta: r, coreRowModel: o, expandedRowModel: s, facetedMinMaxValues: l, facetedRowModel: a, facetedUniqueValues: c, filterFns: d, filterMeta: g, filteredRowModel: h, groupedRowModel: y, paginatedRowModel: w, sortFns: O, sortedRowModel: R, tableMeta: A, ...j } = e.features, I = {
    _cellInstanceInitFns: [],
    _columnInstanceInitFns: [],
    _features: {
      ...Qh,
      ...j
    },
    _headerGroupInstanceInitFns: [],
    _headerInstanceInitFns: [],
    _reactivity: t,
    _rowInstanceInitFns: [],
    _rowModelFns: {
      aggregationFns: n,
      filterFns: d,
      sortFns: O
    },
    _rowModels: {},
    atoms: {},
    baseAtoms: {}
  }, K = Object.values(I._features), _ = {
    ...K.reduce((N, H) => {
      var U;
      return Object.assign(N, (U = H.getDefaultTableOptions) == null ? void 0 : U.call(H, I));
    }, {}),
    ...e
  };
  if (t.wrapExternalAtoms && _.atoms) for (const [N, H] of Object.entries(_.atoms)) {
    const U = H, Q = t.createWritableAtom(U.get(), { debugName: `externalAtom/${N}` });
    _.atoms[N] = Q;
    let ie = !1;
    const _e = U.subscribe((pe) => {
      ie || Q.set(pe);
    }), Re = Q.subscribe((pe) => {
      ie = !0, U.set(pe), ie = !1;
    });
    t.addSubscription(_e), t.addSubscription(Re);
  }
  t.createOptionsStore ? (I.optionsStore = t.createWritableAtom(_, { debugName: "table/optionsStore" }), Object.defineProperty(I, "options", {
    configurable: !0,
    enumerable: !0,
    get() {
      return I.optionsStore.get();
    },
    set(N) {
      I.optionsStore.set(() => N);
    }
  })) : I.options = _, I.initialState = nv(I._features, I.options.initialState);
  const D = Object.keys(I.initialState);
  for (let N = 0; N < D.length; N++) {
    const H = D[N];
    I.baseAtoms[H] = t.createWritableAtom(I.initialState[H], { debugName: `table/baseAtoms/${H}` }), I.atoms[H] = t.createReadonlyAtom(() => {
      var Re;
      const U = I.options, Q = (Re = U.atoms) == null ? void 0 : Re[H], ie = Q ? Q.get() : I.baseAtoms[H].get();
      if (Q) return ie;
      const _e = U.state;
      if (_e && ln(_e, H)) {
        const pe = _e[H];
        return pe === void 0 ? I.initialState[H] : pe;
      }
      return ie;
    }, { debugName: `table/atoms/${H}` });
  }
  $u(I), I.store = ev(t.createReadonlyAtom(() => {
    const N = {};
    for (let H = 0; H < D.length; H++) {
      const U = D[H];
      N[U] = I.atoms[U].get();
    }
    return N;
  }, {
    compare: tv,
    debugName: "table/store"
  }));
  for (let N = 0; N < K.length; N++) {
    const H = K[N];
    (L = H.initTableInstanceData) == null || L.call(H, I), H.initCellInstanceData && I._cellInstanceInitFns.push(H.initCellInstanceData.bind(H)), H.initColumnInstanceData && I._columnInstanceInitFns.push(H.initColumnInstanceData.bind(H)), H.initHeaderGroupInstanceData && I._headerGroupInstanceInitFns.push(H.initHeaderGroupInstanceData.bind(H)), H.initHeaderInstanceData && I._headerInstanceInitFns.push(H.initHeaderInstanceData.bind(H)), H.initRowInstanceData && I._rowInstanceInitFns.push(H.initRowInstanceData.bind(H)), (B = H.constructTableAPIs) == null || B.call(H, I);
  }
  return I;
}
function ov() {
  return te();
}
function Wu() {
  return {
    size: 150,
    minSize: 20,
    maxSize: Number.MAX_SAFE_INTEGER
  };
}
function Lo(e) {
  var o;
  const t = Wu(), n = (o = e.table.atoms.columnSizing) == null ? void 0 : o.get(), r = n && ln(n, e.id) ? n[e.id] : void 0;
  return Math.min(Math.max(e.columnDef.minSize ?? t.minSize, r ?? e.columnDef.size ?? t.size), e.columnDef.maxSize ?? t.maxSize);
}
function Jr(e) {
  const t = te(), n = te(), r = new Array(e.length);
  let o = 0;
  for (let l = 0; l < e.length; l++) {
    const a = e[l], c = Y(a, "getSize", Lo);
    r[l] = c, t[a.id] = o, o += c;
  }
  let s = 0;
  for (let l = e.length - 1; l >= 0; l--)
    n[e[l].id] = s, s += r[l];
  return {
    starts: t,
    afters: n
  };
}
function mi(e) {
  return {
    all: Jr(Zr(e)),
    center: Jr(Zr(e, "center")),
    start: Jr(Zr(e, "start")),
    end: Jr(Zr(e, "end"))
  };
}
function Uu(e) {
  return e === "start" ? "start" : e === "end" ? "end" : e === "center" ? "center" : "all";
}
function sv(e, t) {
  return Y(e.table, "getColumnOffsets", mi)[Uu(t)].starts[e.id] ?? 0;
}
function iv(e, t) {
  return Y(e.table, "getColumnOffsets", mi)[Uu(t)].afters[e.id] ?? 0;
}
function lv(e) {
  jo(e.table, (t) => {
    const n = te(), r = Object.keys(t);
    for (let o = 0; o < r.length; o++) {
      const s = r[o];
      s !== e.id && (n[s] = t[s]);
    }
    return n;
  });
}
function qu(e) {
  if (!e.subHeaders.length) return Lo(e.column);
  let t = 0;
  for (let n = 0; n < e.subHeaders.length; n++) t += qu(e.subHeaders[n]);
  return t;
}
function un(e) {
  return qu(e);
}
function Gu(e) {
  var t;
  if (e.index > 0) {
    const n = (t = e.headerGroup) == null ? void 0 : t.headers[e.index - 1];
    if (n) return Y(n, "getStart", Gu) + Y(n, "getSize", un);
  }
  return 0;
}
function jo(e, t) {
  var n, r;
  (r = (n = e.options).onColumnSizingChange) == null || r.call(n, t);
}
function av(e, t) {
  jo(e, t ? te() : Object.assign(te(), gt(e.initialState.columnSizing ?? {})));
}
function uv(e) {
  var t;
  return ((t = e.getHeaderGroups()[0]) == null ? void 0 : t.headers.reduce((n, r) => n + un(r), 0)) ?? 0;
}
function cv(e) {
  var t;
  return ((t = Y(e, "getStartHeaderGroups", hp)[0]) == null ? void 0 : t.headers.reduce((n, r) => n + un(r), 0)) ?? 0;
}
function fv(e) {
  var t;
  return ((t = Y(e, "getCenterHeaderGroups", mp)[0]) == null ? void 0 : t.headers.reduce((n, r) => n + un(r), 0)) ?? 0;
}
function dv(e) {
  var t;
  return ((t = Y(e, "getEndHeaderGroups", vp)[0]) == null ? void 0 : t.headers.reduce((n, r) => n + un(r), 0)) ?? 0;
}
function qs() {
  return {
    startOffset: null,
    startSize: null,
    deltaOffset: null,
    deltaPercentage: null,
    isResizingColumn: !1,
    columnSizingStart: []
  };
}
function Xu(e) {
  return (e.columnDef.enableResizing ?? !0) && (e.table.options.enableColumnResizing ?? !0);
}
function gv(e) {
  var t, n;
  return ((n = (t = e.table.atoms.columnResizing) == null ? void 0 : t.get()) == null ? void 0 : n.isResizingColumn) === e.id;
}
function pv(e, t) {
  const n = e.table.getColumn(e.column.id), r = Xu(n);
  return (o) => {
    if (!r || Rs(o) && o.touches.length > 1)
      return;
    const s = un(e), l = e.getLeafHeaders().map((D) => [D.column.id, Lo(D.column)]), a = Rs(o) ? Math.round(o.touches[0].clientX) : o.clientX, c = te(), d = (D, L) => {
      if (typeof L != "number") return;
      const B = n.table, N = B.options.columnResizeMode === "onChange" || D === "end";
      B._reactivity.batch(() => {
        dr(B, (H) => {
          const U = B.options.columnResizeDirection === "rtl" ? -1 : 1, Q = (L - (H.startOffset ?? 0)) * U, ie = H.startSize ?? 0, _e = Math.max(ie > 0 ? Q / ie : 0, -0.999999);
          if (N) {
            const Re = H.columnSizingStart;
            for (let pe = 0; pe < Re.length; pe++) {
              const le = Re[pe], ee = le[1];
              c[le[0]] = Math.round(Math.max(ee > 0 ? ee + ee * _e : Q / Re.length, 0) * 100) / 100;
            }
          }
          return {
            ...H,
            deltaOffset: Q,
            deltaPercentage: _e
          };
        }), N && jo(B, (H) => Object.assign(te(), H, c));
      });
    };
    let g = null, h = !1, y;
    const w = () => {
      h ? (h = !1, d("move", y), g = requestAnimationFrame(w)) : g = null;
    }, O = (D) => {
      if (y = D, typeof requestAnimationFrame != "function") {
        d("move", D);
        return;
      }
      if (g !== null) {
        h = !0;
        return;
      }
      d("move", D), g = requestAnimationFrame(w);
    }, R = (D) => {
      g !== null && (cancelAnimationFrame(g), g = null, h = !1), n.table._reactivity.batch(() => {
        d("end", D ?? y), dr(n.table, (L) => ({
          ...L,
          isResizingColumn: !1,
          startOffset: null,
          startSize: null,
          deltaOffset: null,
          deltaPercentage: null,
          columnSizingStart: []
        }));
      });
    }, A = t || (typeof document < "u" ? document : null), j = {
      moveHandler: (D) => O(D.clientX),
      upHandler: (D) => {
        A == null || A.removeEventListener("mousemove", j.moveHandler), A == null || A.removeEventListener("mouseup", j.upHandler), R(D.clientX);
      }
    }, I = {
      moveHandler: (D) => (D.cancelable && (D.preventDefault(), D.stopPropagation()), O(D.touches[0].clientX), !1),
      upHandler: (D) => {
        var L;
        K(), D.cancelable && (D.preventDefault(), D.stopPropagation()), R((L = D.touches[0]) == null ? void 0 : L.clientX);
      },
      cancelHandler: () => {
        K(), R();
      }
    }, K = () => {
      A == null || A.removeEventListener("touchmove", I.moveHandler), A == null || A.removeEventListener("touchend", I.upHandler), A == null || A.removeEventListener("touchcancel", I.cancelHandler);
    }, _ = vv() ? { passive: !1 } : !1;
    Rs(o) ? (A == null || A.addEventListener("touchmove", I.moveHandler, _), A == null || A.addEventListener("touchend", I.upHandler, _), A == null || A.addEventListener("touchcancel", I.cancelHandler, _)) : (A == null || A.addEventListener("mousemove", j.moveHandler, _), A == null || A.addEventListener("mouseup", j.upHandler, _)), dr(n.table, (D) => ({
      ...D,
      startOffset: a,
      startSize: s,
      deltaOffset: 0,
      deltaPercentage: 0,
      columnSizingStart: l,
      isResizingColumn: n.id
    }));
  };
}
function dr(e, t) {
  var n, r;
  (r = (n = e.options).onColumnResizingChange) == null || r.call(n, t);
}
function hv(e, t) {
  dr(e, t ? qs() : gt(e.initialState.columnResizing ?? qs()));
}
let Qr = null;
function vv() {
  if (typeof Qr == "boolean") return Qr;
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
  return Qr = e, Qr;
}
function Rs(e) {
  return e.type === "touchstart";
}
const mv = {
  getInitialState: (e) => ({
    columnResizing: qs(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    columnResizeMode: "onEnd",
    columnResizeDirection: "ltr",
    onColumnResizingChange: Mr("columnResizing", e)
  }),
  assignColumnPrototype: (e, t) => {
    rt("columnResizingFeature", e, t, {
      column_getCanResize: { fn: (n) => Xu(n) },
      column_getIsResizing: { fn: (n) => gv(n) }
    });
  },
  assignHeaderPrototype: (e, t) => {
    rt("columnResizingFeature", e, t, { header_getResizeHandler: { fn: (n, r) => pv(n, r) } });
  },
  constructTableAPIs: (e) => {
    pt("columnResizingFeature", e, {
      table_setColumnResizing: { fn: (t) => dr(e, t) },
      table_resetHeaderSizeInfo: { fn: (t) => hv(e, t) }
    });
  }
}, yv = {
  getInitialState: (e) => ({
    columnSizing: ov(),
    ...e
  }),
  getDefaultColumnDef: () => Wu(),
  getDefaultTableOptions: (e) => ({ onColumnSizingChange: Mr("columnSizing", e) }),
  assignColumnPrototype: (e, t) => {
    rt("columnSizingFeature", e, t, {
      column_getSize: {
        fn: (n) => Lo(n),
        memoDeps: (n) => {
          var r, o;
          return [t.options.columns, (o = (r = t.atoms.columnSizing) == null ? void 0 : r.get()) == null ? void 0 : o[n.id]];
        }
      },
      column_getStart: { fn: (n, r) => sv(n, r) },
      column_getAfter: { fn: (n, r) => iv(n, r) },
      column_resetSize: { fn: (n) => lv(n) }
    });
  },
  assignHeaderPrototype: (e, t) => {
    rt("columnSizingFeature", e, t, {
      header_getSize: {
        fn: (n) => un(n),
        memoDeps: (n) => {
          var r, o, s;
          return [t.options.columns, n.column.columns.length > 0 ? (r = t.atoms.columnSizing) == null ? void 0 : r.get() : (s = (o = t.atoms.columnSizing) == null ? void 0 : o.get()) == null ? void 0 : s[n.column.id]];
        }
      },
      header_getStart: {
        fn: (n) => Gu(n),
        memoDeps: () => {
          var n, r, o, s, l;
          return [
            t.options.columns,
            (n = t.atoms.columnSizing) == null ? void 0 : n.get(),
            (r = t.atoms.columnOrder) == null ? void 0 : r.get(),
            (o = t.atoms.columnPinning) == null ? void 0 : o.get(),
            (s = t.atoms.columnVisibility) == null ? void 0 : s.get(),
            (l = t.atoms.grouping) == null ? void 0 : l.get(),
            t.options.groupedColumnMode
          ];
        }
      }
    });
  },
  constructTableAPIs: (e) => {
    pt("columnSizingFeature", e, {
      table_getColumnOffsets: {
        fn: () => mi(e),
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
      table_setColumnSizing: { fn: (t) => jo(e, t) },
      table_resetColumnSizing: { fn: (t) => av(e, t) },
      table_getTotalSize: {
        fn: () => uv(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.columnSizing) == null ? void 0 : t.get(), e.getHeaderGroups()];
        }
      },
      table_getStartTotalSize: {
        fn: () => cv(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.columnSizing) == null ? void 0 : t.get(), e.getHeaderGroups()];
        }
      },
      table_getCenterTotalSize: {
        fn: () => fv(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.columnSizing) == null ? void 0 : t.get(), e.getHeaderGroups()];
        }
      },
      table_getEndTotalSize: {
        fn: () => dv(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.columnSizing) == null ? void 0 : t.get(), e.getHeaderGroups()];
        }
      }
    });
  }
}, wv = {
  getInitialState: (e) => ({
    expanded: oh(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onExpandedChange: Mr("expanded", e),
    paginateExpandedRows: !0
  }),
  assignRowPrototype: (e, t) => {
    rt("rowExpandingFeature", e, t, {
      row_toggleExpanded: { fn: (n, r) => Du(n, r) },
      row_getIsExpanded: { fn: (n) => Fo(n) },
      row_getCanExpand: { fn: (n) => rn(n) },
      row_getIsAllParentsExpanded: { fn: (n) => ah(n) },
      row_getToggleExpandedHandler: { fn: (n) => uh(n) }
    });
  },
  constructTableAPIs: (e) => {
    pt("rowExpandingFeature", e, {
      table_autoResetExpanded: { fn: () => Iu(e) },
      table_setExpanded: { fn: (t) => vo(e, t) },
      table_toggleAllRowsExpanded: { fn: (t) => Eu(e, t) },
      table_resetExpanded: { fn: (t) => Au(e, t) },
      table_getCanSomeRowsExpand: { fn: () => Ou(e) },
      table_getToggleAllRowsExpandedHandler: { fn: () => sh(e) },
      table_getIsSomeRowsExpanded: { fn: () => ih(e) },
      table_getIsAllRowsExpanded: { fn: () => Pu(e) },
      table_getExpandedDepth: { fn: () => lh(e) }
    });
  }
};
function bv() {
  return te();
}
function Fn(e, t) {
  var n, r;
  (r = (n = e.options).onRowSelectionChange) == null || r.call(n, t);
}
function _v(e, t) {
  e._lastSelectedRowId = null, Fn(e, t ? te() : Object.assign(te(), gt(e.initialState.rowSelection ?? {})));
}
function Yu(e, t, n) {
  e._lastSelectedRowId = null, Fn(e, (r) => {
    if (t = typeof t < "u" ? t : !Y(e, "getIsAllRowsSelected", Qu), n != null && n.deselectAll && !t) return te();
    const o = Object.assign(te(), r), s = e.getPreGroupedRowModel().flatRows;
    if (t) {
      const l = /* @__PURE__ */ new Map();
      s.forEach((a) => {
        yo(a, l) && (o[a.id] = !0);
      });
    } else s.forEach((l) => {
      At(l) && delete o[l.id];
    });
    return o;
  });
}
function Zu(e, t, n) {
  e._lastSelectedRowId = null, Fn(e, (r) => {
    const o = typeof t < "u" ? t : !Y(e, "getIsAllPageRowsSelected", ec);
    if (n != null && n.deselectAll && !o) return te();
    const s = Object.assign(te(), r);
    return e.getRowModel().rows.forEach((l) => {
      Ko(s, l.id, o, !0, e, !0);
    }), s;
  });
}
function Sv(e) {
  return e.getCoreRowModel();
}
function xv(e) {
  const t = e.getCoreRowModel();
  return Y(e, "getIsSomeRowsSelected", zo) ? bi(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: te()
  };
}
function Rv(e) {
  const t = e.getFilteredRowModel();
  return Y(e, "getIsSomeRowsSelected", zo) ? bi(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: te()
  };
}
function Cv(e) {
  const t = e.getSortedRowModel();
  return Y(e, "getIsSomeRowsSelected", zo) ? bi(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: te()
  };
}
function Ju(e) {
  var t;
  return Object.keys(((t = e.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function Qu(e) {
  var o;
  const t = e.getFilteredRowModel().flatRows, n = ((o = e.atoms.rowSelection) == null ? void 0 : o.get()) ?? {};
  let r = !!(t.length && Object.keys(n).length);
  if (r) {
    const s = /* @__PURE__ */ new Map();
    t.some((l) => !Er(l, n) && yo(l, s)) && (r = !1);
  }
  return r;
}
function ec(e) {
  var s;
  const t = e.getPaginatedRowModel().flatRows, n = ((s = e.atoms.rowSelection) == null ? void 0 : s.get()) ?? {}, r = /* @__PURE__ */ new Map();
  let o = !1;
  for (let l = 0; l < t.length; l++) {
    const a = t[l];
    if (Er(a, n))
      !o && yo(a, r) && (o = !0);
    else if (yo(a, r)) return !1;
  }
  return o;
}
function zo(e) {
  return Y(e, "getSelectedRowIds", Ju).length > 0;
}
function Mv(e) {
  return e.getPaginatedRowModel().flatRows.filter((t) => At(t)).some((t) => yi(t) || Y(t, "getIsSomeSelected", nc));
}
function Iv(e) {
  return (t) => {
    Yu(e, t.target.checked);
  };
}
function Ev(e) {
  return (t) => {
    Zu(e, t.target.checked);
  };
}
function tc(e, t, n) {
  const r = yi(e);
  Fn(e.table, (o) => {
    t = typeof t < "u" ? t : !r;
    const s = Object.assign(te(), o);
    return Ko(s, e.id, t, ((n == null ? void 0 : n.selectChildren) ?? !0) && nn(e), e.table), !t && (n != null && n.deselectParents) && rc(s, e), s;
  });
}
function yi(e) {
  var t;
  return Er(e, ((t = e.table.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function nc(e) {
  return _i(e) === "some";
}
function Av(e) {
  return _i(e) === "all";
}
function At(e) {
  const t = e.table.options;
  return typeof t.enableRowSelection == "function" ? t.enableRowSelection(e) : t.enableRowSelection ?? !0;
}
function wi(e) {
  const t = e.table.options;
  return typeof t.enableSubRowSelection == "function" ? t.enableSubRowSelection(e) : t.enableSubRowSelection ?? !0;
}
function nn(e) {
  const t = e.table.options;
  return typeof t.enableMultiRowSelection == "function" ? t.enableMultiRowSelection(e) : t.enableMultiRowSelection ?? !0;
}
function Ov(e, t) {
  const n = At(e);
  return (r) => {
    var c, d;
    if (!n) return;
    const o = r, s = e.table, l = o.target.checked, a = s._lastSelectedRowId;
    (!(s.options.enableRowRangeSelection !== !1 && a !== null && nn(e) && (((d = (c = s.options).isRowRangeSelectionEvent) == null ? void 0 : d.call(c, r)) ?? !1)) || !Pv(e, a, l, t)) && tc(e, l, t), s._lastSelectedRowId = e.id;
  };
}
function Pv(e, t, n, r) {
  const o = (r == null ? void 0 : r.selectChildren) ?? !0, s = e.table, l = s.getRowsInDisplayOrder(), a = s.getPrePaginatedRowModel().rowsById[t] ?? s.getCoreRowModel().rowsById[t];
  if (!a) return !1;
  const c = a.getDisplayIndex(), d = e.getDisplayIndex(), g = l[c], h = l[d];
  if (c < 0 || d < 0 || c >= l.length || d >= l.length || (g == null ? void 0 : g.id) !== a.id || (h == null ? void 0 : h.id) !== e.id || !nn(a) || !nn(e)) return !1;
  const y = Math.min(c, d), w = Math.max(c, d);
  return Fn(s, (O) => {
    const R = Object.assign(te(), O);
    for (let A = y; A <= w; A++) {
      const j = l[A];
      !At(j) || !nn(j) || (Ko(R, j.id, n, o, s), !n && (r != null && r.deselectParents) && rc(R, j));
    }
    return R;
  }), !0;
}
function Ko(e, t, n, r, o, s) {
  const l = o.getRow(t, !0);
  n ? (nn(l) || Object.keys(e).forEach((a) => delete e[a]), At(l) && (e[t] = !0)) : (!s || At(l)) && delete e[t], r && l.subRows.length && wi(l) && l.subRows.forEach((a) => Ko(e, a.id, n, r, o, s));
}
function yo(e, t) {
  if (!At(e)) return !1;
  const n = e.table;
  if (n.options.enableSubRowSelection === !0) return !0;
  const r = e.parentId;
  if (r === void 0) return !0;
  const o = t.get(r);
  if (o !== void 0) return o;
  const s = n.getCoreRowModel().rowsById, l = [];
  let a = !0, c = r;
  for (; c !== void 0; ) {
    const d = t.get(c);
    if (d !== void 0) {
      a = d;
      break;
    }
    l.push(c);
    const g = s[c] ?? n.getRow(c, !0);
    if (!wi(g)) {
      a = !1;
      break;
    }
    c = g.parentId;
  }
  return l.forEach((d) => t.set(d, a)), a;
}
function rc(e, t) {
  const n = t.table.getCoreRowModel().rowsById;
  let r = t.parentId;
  for (; r !== void 0; )
    delete e[r], r = (n[r] ?? t.table.getRow(r, !0)).parentId;
}
function oc(e, t, n, r) {
  const o = [];
  for (let s = 0; s < e.length; s++) {
    const l = e[s], a = Er(l, t);
    if (a && (n.push(l), r[l.id] = l), l.subRows.length) {
      const c = oc(l.subRows, t, n, r);
      if (a) {
        const d = Object.create(Object.getPrototypeOf(l));
        pu(d, l), d.subRows = c, o.push(d);
      }
    } else a && o.push(l);
  }
  return o;
}
function bi(e, t) {
  var s;
  const n = [], r = te(), o = ((s = t.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  return {
    rows: oc(e.rows, o, n, r),
    flatRows: n,
    rowsById: r
  };
}
function Er(e, t) {
  return !!(ln(t, e.id) && t[e.id]);
}
function _i(e) {
  var s;
  if (!e.subRows.length) return !1;
  const t = ((s = e.table.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  let n = !1, r = !0, o = !1;
  for (let l = 0; l < e.subRows.length; l++) {
    const a = e.subRows[l];
    if (n && !r) break;
    if (At(a) && (o = !0, Er(a, t) ? n = !0 : r = !1), a.subRows.length) {
      const c = _i(a);
      c === "all" ? (n = !0, o = !0) : c === "some" ? (n = !0, r = !1, o = !0) : r = !1;
    }
  }
  return o ? r ? "all" : n ? "some" : !1 : !1;
}
const Dv = {
  initTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  resetTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  getInitialState: (e) => ({
    rowSelection: bv(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onRowSelectionChange: Mr("rowSelection", e),
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
    rt("rowSelectionFeature", e, t, {
      row_toggleSelected: { fn: (n, r, o) => tc(n, r, o) },
      row_getIsSelected: { fn: (n) => yi(n) },
      row_getIsSomeSelected: {
        fn: (n) => nc(n),
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
        fn: (n) => Av(n),
        memoDeps: (n) => {
          var r;
          return [
            n.subRows,
            (r = n.table.atoms.rowSelection) == null ? void 0 : r.get(),
            n.table.options.enableRowSelection
          ];
        }
      },
      row_getCanSelect: { fn: (n) => At(n) },
      row_getCanSelectSubRows: { fn: (n) => wi(n) },
      row_getCanMultiSelect: { fn: (n) => nn(n) },
      row_getToggleSelectedHandler: { fn: (n, r) => Ov(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    pt("rowSelectionFeature", e, {
      table_setRowSelection: { fn: (t) => Fn(e, t) },
      table_resetRowSelection: { fn: (t) => _v(e, t) },
      table_toggleAllRowsSelected: { fn: (t, n) => Yu(e, t, n) },
      table_toggleAllPageRowsSelected: { fn: (t, n) => Zu(e, t, n) },
      table_getPreSelectedRowModel: { fn: () => Sv(e) },
      table_getSelectedRowModel: {
        fn: () => xv(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getCoreRowModel()];
        }
      },
      table_getFilteredSelectedRowModel: {
        fn: () => Rv(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getFilteredRowModel()];
        }
      },
      table_getGroupedSelectedRowModel: {
        fn: () => Cv(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getSortedRowModel()];
        }
      },
      table_getSelectedRowIds: {
        fn: () => Ju(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get()];
        }
      },
      table_getIsAllRowsSelected: {
        fn: () => Qu(e),
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
        fn: () => ec(e),
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
        fn: () => zo(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get()];
        }
      },
      table_getIsSomePageRowsSelected: {
        fn: () => Mv(e),
        memoDeps: () => {
          var t;
          return [
            (t = e.atoms.rowSelection) == null ? void 0 : t.get(),
            e.getPaginatedRowModel(),
            e.options.enableRowSelection
          ];
        }
      },
      table_getToggleAllRowsSelectedHandler: { fn: () => Iv(e) },
      table_getToggleAllPageRowsSelectedHandler: { fn: () => Ev(e) }
    });
  }
}, kv = {
  getInitialState(e) {
    return {
      sorting: gh(),
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
      onSortingChange: Mr("sorting", e),
      isMultiSortEvent: (t) => t.shiftKey
    };
  },
  assignColumnPrototype(e, t) {
    rt("rowSortingFeature", e, t, {
      column_getAutoSortFn: { fn: (n) => Fu(n) },
      column_getAutoSortDir: { fn: (n) => Hu(n) },
      column_getSortFn: { fn: (n) => Lu(n) },
      column_toggleSorting: { fn: (n, r, o) => ju(n, r, o) },
      column_getFirstSortDir: { fn: (n) => zu(n) },
      column_getNextSortingOrder: { fn: (n, r) => Ku(n, r) },
      column_getCanSort: { fn: (n) => vi(n) },
      column_getCanMultiSort: { fn: (n) => mo(n) },
      column_getIsSorted: { fn: (n) => Vu(n) },
      column_getSortIndex: { fn: (n) => hh(n) },
      column_clearSorting: { fn: (n) => vh(n) },
      column_getToggleSortingHandler: { fn: (n) => mh(n) }
    });
  },
  constructTableAPIs(e) {
    pt("rowSortingFeature", e, {
      table_setSorting: { fn: (t) => Ho(e, t) },
      table_resetSorting: { fn: (t) => Tu(e, t) }
    });
  }
};
function Tv() {
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
      fn: () => Fv(t)
    });
  };
}
function Fv(e) {
  var r;
  const t = e.getPreExpandedRowModel(), n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return !t.rows.length || n !== !0 && !Object.keys(n ?? {}).length || !e.options.paginateExpandedRows && !e.options.manualPagination ? t : Hv(t);
}
function Hv(e) {
  const t = [], n = (r) => {
    t.push(r), r.subRows.length && Fo(r) && r.subRows.forEach(n);
  };
  return e.rows.forEach(n), {
    rows: t,
    flatRows: e.flatRows,
    rowsById: e.rowsById
  };
}
function Lv() {
  return (e) => {
    const t = e;
    return Ir({
      feature: "rowSortingFeature",
      table: t,
      fnName: "table.getSortedRowModel",
      memoDeps: () => {
        var n;
        return [(n = t.atoms.sorting) == null ? void 0 : n.get(), t.getPreSortedRowModel()];
      },
      fn: () => jv(t),
      onAfterUpdate: vu(() => ku(t))
    });
  };
}
function jv(e) {
  var c;
  const t = e.getPreSortedRowModel(), n = (c = e.atoms.sorting) == null ? void 0 : c.get();
  if (!t.rows.length || !(n != null && n.length)) return t;
  const r = [], o = n.filter((d) => {
    const g = e.getColumn(d.id);
    return g ? vi(g) : !1;
  });
  if (!o.length) return t;
  const s = [];
  for (let d = 0; d < o.length; d++) {
    const g = o[d], h = e.getColumn(g.id);
    h && s.push({
      id: g.id,
      desc: g.desc,
      sortUndefined: h.columnDef.sortUndefined,
      invertSorting: h.columnDef.invertSorting,
      sortFn: Lu(h)
    });
  }
  const l = (d, g) => {
    for (let h = 0; h < s.length; h++) {
      const y = s[h], w = y.sortUndefined, O = y.desc;
      let R = 0;
      if (w) {
        const A = d.getValue(y.id), j = g.getValue(y.id), I = A === void 0, K = j === void 0;
        if (I && K) continue;
        if (I || K) {
          if (w === "first") return I ? -1 : 1;
          if (w === "last") return I ? 1 : -1;
          R = I ? w : -w;
        }
      }
      if (R === 0 && (R = y.sortFn(d, g, y.id)), R !== 0)
        return O && (R *= -1), y.invertSorting && (R *= -1), R;
    }
    return d.index - g.index;
  }, a = (d) => {
    const g = d.slice();
    g.sort(l);
    let h = !1;
    for (let y = 0; y < g.length; y++) {
      const w = g[y];
      w !== d[y] && (h = !0);
      const O = r.length;
      if (r.push(w), w.subRows.length) {
        const R = a(w.subRows);
        if (R.changed) {
          const A = Object.create(Object.getPrototypeOf(w));
          pu(A, w), A.subRows = R.rows, g[y] = A, r[O] = A, h = !0;
        }
      }
    }
    return {
      rows: g,
      changed: h
    };
  };
  return {
    rows: a(t.rows).rows,
    flatRows: r,
    rowsById: t.rowsById
  };
}
function jl(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = en(e[n]);
  return Ns(e, t);
}
function zv(e) {
  return Object.keys(e).map((t) => en(e[t]));
}
function Kv(e) {
  const t = (a, c) => {
    a.setOptions((d) => Dl(d, jl(c)));
  }, n = op(), r = Ns(e, { features: {
    coreReactivityFeature: n,
    ...en(e.features) ?? {}
  } }), o = Ns(jl(r), { mergeOptions: (a, c) => Dl(a, c) }), s = rv(o), l = s;
  return ha() && $f(() => {
    var a;
    return (a = n.unmount) == null ? void 0 : a.call(n);
  }), ye(() => zv(r), () => {
    t(s, r);
  }, { immediate: !0 }), ye(() => {
    const a = en(e.state), c = en(e.atoms);
    if (!a) return [];
    const d = [];
    for (const g of Object.keys(l.initialState))
      !(g in a) || (c == null ? void 0 : c[g]) !== void 0 || d.push(a[g]);
    return d;
  }, (a) => {
    a.length > 0 && t(s, r);
  }, { immediate: !0 }), l.Subscribe = (a) => a.children(l.atoms), l;
}
function _r(e) {
  "@babel/helpers - typeof";
  return _r = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, _r(e);
}
function Vv(e, t) {
  if (_r(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (_r(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Bv(e) {
  var t = Vv(e, "string");
  return _r(t) == "symbol" ? t : t + "";
}
function Ar(e, t, n) {
  return (t = Bv(t)) in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function Nv(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
    if (t.indexOf(r) !== -1) continue;
    n[r] = e[r];
  }
  return n;
}
function $v(e, t) {
  if (e == null) return {};
  var n, r, o = Nv(e, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    for (r = 0; r < s.length; r++) n = s[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (o[n] = e[n]);
  }
  return o;
}
function sc(e, t) {
  var n = Object.keys(e), r = Object.keys(t);
  return n.length !== r.length ? !1 : n.every(function(o) {
    return Object.is(e[o], t[o]);
  });
}
function Wv() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : sc, t = null;
  return function(n) {
    return t && e(t.value, n) || (t = {
      value: n
    }), t.value;
  };
}
var Uv = ["block"];
function zl(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Kl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? zl(Object(n), !0).forEach(function(r) {
      Ar(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : zl(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function qv(e) {
  return {
    x: (e.right + e.left) / 2,
    y: (e.bottom + e.top) / 2
  };
}
function Cs(e) {
  var t = e.client, n = e.borderBox, r = n.height / 4;
  return t.y <= n.top + r ? "reorder-above" : t.y >= n.bottom - r ? "reorder-below" : "make-child";
}
function Gv(e) {
  var t = e.element, n = e.input, r = e.currentLevel, o = e.indentPerLevel, s = e.mode, l = {
    x: n.clientX,
    y: n.clientY
  }, a = t.getBoundingClientRect();
  if (s === "standard") {
    var c = Cs({
      borderBox: a,
      client: l
    });
    return {
      type: c,
      indentPerLevel: o,
      currentLevel: r
    };
  }
  var d = qv(a);
  if (s === "expanded") {
    var g = Cs({
      borderBox: a,
      client: l
    });
    return {
      // Use the "standard" hitbox for "reorder above",
      // The rest of the item is "make-child"
      type: g === "reorder-above" ? g : "make-child",
      indentPerLevel: o,
      currentLevel: r
    };
  }
  var h = o * r;
  if (l.x < a.left + h) {
    if (l.y < d.y)
      return {
        type: "reorder-above",
        indentPerLevel: o,
        currentLevel: r
      };
    var y = (l.x - a.left) / o, w = Math.max(Math.floor(y), 0);
    return {
      type: "reparent",
      desiredLevel: w,
      indentPerLevel: o,
      currentLevel: r
    };
  }
  return {
    type: Cs({
      borderBox: a,
      client: l
    }),
    indentPerLevel: o,
    currentLevel: r
  };
}
function ic(e, t) {
  return e.type !== t.type ? !1 : e.type === "instruction-blocked" && t.type === "instruction-blocked" ? ic(e.desired, t.desired) : sc(e, t);
}
var Xv = Wv(ic);
function Yv(e) {
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
function Zv(e, t) {
  var n = t.block, r = $v(t, Uv), o = Gv(r), s = Yv({
    desired: o,
    block: n
  }), l = Xv(s);
  return Kl(Kl({}, e), {}, Ar({}, lc, l));
}
function Vl(e) {
  var t;
  return (t = e[lc]) !== null && t !== void 0 ? t : null;
}
var lc = Symbol("tree-item-instruction");
function Vo() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return function() {
    t.forEach(function(o) {
      return o();
    });
  };
}
function Jv(e) {
  if (Array.isArray(e)) return e;
}
function Qv(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r, o, s, l, a = [], c = !0, d = !1;
    try {
      if (s = (n = n.call(e)).next, t !== 0) for (; !(c = (r = s.call(n)).done) && (a.push(r.value), a.length !== t); c = !0) ;
    } catch (g) {
      d = !0, o = g;
    } finally {
      try {
        if (!c && n.return != null && (l = n.return(), Object(l) !== l)) return;
      } finally {
        if (d) throw o;
      }
    }
    return a;
  }
}
function Gs(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function ac(e, t) {
  if (e) {
    if (typeof e == "string") return Gs(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Gs(e, t) : void 0;
  }
}
function em() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function uc(e, t) {
  return Jv(e) || Qv(e, t) || ac(e, t) || em();
}
var Bl = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, on = {}, Or = {};
Object.defineProperty(Or, "__esModule", { value: !0 });
Or.bind = void 0;
function tm(e, t) {
  var n = t.type, r = t.listener, o = t.options;
  return e.addEventListener(n, r, o), function() {
    e.removeEventListener(n, r, o);
  };
}
Or.bind = tm;
var Bo = {}, In = Bl && Bl.__assign || function() {
  return In = Object.assign || function(e) {
    for (var t, n = 1, r = arguments.length; n < r; n++) {
      t = arguments[n];
      for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    }
    return e;
  }, In.apply(this, arguments);
};
Object.defineProperty(Bo, "__esModule", { value: !0 });
Bo.bindAll = void 0;
var nm = Or;
function Nl(e) {
  if (!(typeof e > "u"))
    return typeof e == "boolean" ? {
      capture: e
    } : e;
}
function rm(e, t) {
  if (t == null)
    return e;
  var n = In(In({}, e), { options: In(In({}, Nl(t)), Nl(e.options)) });
  return n;
}
function om(e, t, n) {
  var r = t.map(function(o) {
    var s = rm(o, n);
    return (0, nm.bind)(e, s);
  });
  return function() {
    r.forEach(function(s) {
      return s();
    });
  };
}
Bo.bindAll = om;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.bindAll = e.bind = void 0;
  var t = Or;
  Object.defineProperty(e, "bind", { enumerable: !0, get: function() {
    return t.bind;
  } });
  var n = Bo;
  Object.defineProperty(e, "bindAll", { enumerable: !0, get: function() {
    return n.bindAll;
  } });
})(on);
var cc = "data-pdnd-honey-pot";
function fc(e) {
  return e instanceof Element && e.hasAttribute(cc);
}
function dc(e) {
  var t = document.elementsFromPoint(e.x, e.y), n = uc(t, 2), r = n[0], o = n[1];
  return r ? fc(r) ? o ?? null : r : null;
}
var sm = 2147483647, im = {
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
function cn(e) {
  var t = null;
  return function() {
    if (!t) {
      for (var r = arguments.length, o = new Array(r), s = 0; s < r; s++)
        o[s] = arguments[s];
      var l = e.apply(this, o);
      t = {
        result: l
      };
    }
    return t.result;
  };
}
var Ms = cn(function() {
  return typeof HTMLElement < "u" && typeof HTMLElement.prototype.showPopover == "function";
});
function $l(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Wl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? $l(Object(n), !0).forEach(function(r) {
      Ar(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : $l(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
var Sr = 2, Ul = Sr / 2;
function lm(e) {
  return {
    x: Math.floor(e.x),
    y: Math.floor(e.y)
  };
}
function am(e) {
  return {
    x: e.x - Ul,
    y: e.y - Ul
  };
}
function um(e) {
  return {
    x: Math.max(e.x, 0),
    y: Math.max(e.y, 0)
  };
}
function cm(e) {
  return {
    x: Math.min(e.x, window.innerWidth - Sr),
    y: Math.min(e.y, window.innerHeight - Sr)
  };
}
function ql(e) {
  var t = e.client, n = cm(um(am(lm(t))));
  return DOMRect.fromRect({
    x: n.x,
    y: n.y,
    width: Sr,
    height: Sr
  });
}
function Gl(e) {
  var t = e.clientRect;
  return {
    left: "".concat(t.left, "px"),
    top: "".concat(t.top, "px"),
    width: "".concat(t.width, "px"),
    height: "".concat(t.height, "px")
  };
}
function fm(e) {
  var t = e.client, n = e.clientRect;
  return (
    // is within horizontal bounds
    t.x >= n.x && t.x <= n.x + n.width && // is within vertical bounds
    t.y >= n.y && t.y <= n.y + n.height
  );
}
function dm(e) {
  var t = e.initial, n = document.createElement("div");
  n.setAttribute(cc, "true"), Ms() && n.setAttribute("popover", "manual");
  var r = ql({
    client: t
  });
  Object.assign(n.style, Wl(Wl({
    position: "fixed"
  }, Ms() ? (
    // needs to come first as it has 'inset: unset' which
    // needs to be overridden by our top / left values
    im
  ) : {
    // Fallback: using maximum possible z-index so that this element
    // will always be on top of other positioned content.
    zIndex: sm
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
  }, Gl({
    clientRect: r
  }))), document.body.appendChild(n), Ms() && n.showPopover();
  var o = on.bind(window, {
    type: "pointermove",
    listener: function(l) {
      var a = {
        x: l.clientX,
        y: l.clientY
      };
      r = ql({
        client: a
      }), Object.assign(n.style, Gl({
        clientRect: r
      }));
    },
    // using capture so we are less likely to be impacted by event stopping
    options: {
      capture: !0
    }
  });
  return function(l) {
    var a = l.current;
    if (o(), fm({
      client: a,
      clientRect: r
    })) {
      n.remove();
      return;
    }
    function c() {
      d(), n.remove();
    }
    var d = on.bindAll(window, [
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
function gm() {
  var e = null;
  function t() {
    return e = null, on.bind(window, {
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
      var l = s.eventName, a = s.payload;
      if (l === "onDragStart") {
        var c = a.location.initial.input, d = e ?? {
          x: c.clientX,
          y: c.clientY
        };
        r = dm({
          initial: d
        });
      }
      if (l === "onDrop") {
        var g, h = a.location.current.input;
        (g = r) === null || g === void 0 || g({
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
function pm(e) {
  if (Array.isArray(e)) return Gs(e);
}
function hm(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function vm() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function gc(e) {
  return pm(e) || hm(e) || ac(e) || vm();
}
var mm = cn(function() {
  return navigator.userAgent.includes("Firefox");
}), Si = cn(function() {
  var t = navigator, n = t.userAgent;
  return n.includes("AppleWebKit") && !n.includes("Chrome");
});
function ym(e) {
  return "nodeName" in e;
}
function wm(e) {
  return ym(e) && e.ownerDocument !== document;
}
var Xs = {
  isLeavingWindow: Symbol("leaving"),
  isEnteringWindow: Symbol("entering")
};
(function() {
  if (typeof window > "u" || !Si())
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
  on.bindAll(
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
        !n.isOverWindow && n.enterCount === 0 && (s[Xs.isEnteringWindow] = !0), n.isOverWindow = !0, n.enterCount++;
      }
    }, {
      type: "dragleave",
      listener: function(s) {
        n.enterCount--, n.isOverWindow && n.enterCount === 0 && (s[Xs.isLeavingWindow] = !0, n.isOverWindow = !1);
      }
    }],
    // using `capture: true` so that adding event listeners
    // in bubble phase will have the correct symbols
    {
      capture: !0
    }
  );
})();
function bm(e) {
  var t = e.dragLeave;
  return Si() ? t.hasOwnProperty(Xs.isLeavingWindow) : !1;
}
function _m(e) {
  var t = e.dragLeave, n = t.type, r = t.relatedTarget;
  return n !== "dragleave" ? !1 : Si() ? bm({
    dragLeave: t
  }) : r == null ? !0 : mm() ? wm(r) : r instanceof HTMLIFrameElement;
}
function Sm(e) {
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
function gr(e) {
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
var xm = function(t) {
  var n = [], r = null, o = function() {
    for (var l = arguments.length, a = new Array(l), c = 0; c < l; c++)
      a[c] = arguments[c];
    n = a, !r && (r = requestAnimationFrame(function() {
      r = null, t.apply(void 0, n);
    }));
  };
  return o.cancel = function() {
    r && (cancelAnimationFrame(r), r = null);
  }, o;
}, Is = xm(function(e) {
  return e();
}), eo = /* @__PURE__ */ function() {
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
function Rm(e) {
  var t = e.source, n = e.initial, r = e.dispatchEvent, o = {
    dropTargets: []
  };
  function s(a) {
    r(a), o = {
      dropTargets: a.payload.location.current.dropTargets
    };
  }
  var l = {
    start: function(c) {
      var d = c.nativeSetDragImage, g = {
        current: n,
        previous: o,
        initial: n
      };
      s({
        eventName: "onGenerateDragPreview",
        payload: {
          source: t,
          location: g,
          nativeSetDragImage: d
        }
      }), eo.schedule(function() {
        s({
          eventName: "onDragStart",
          payload: {
            source: t,
            location: g
          }
        });
      });
    },
    dragUpdate: function(c) {
      var d = c.current;
      eo.flush(), Is.cancel(), s({
        eventName: "onDropTargetChange",
        payload: {
          source: t,
          location: {
            initial: n,
            previous: o,
            current: d
          }
        }
      });
    },
    drag: function(c) {
      var d = c.current;
      Is(function() {
        eo.flush();
        var g = {
          initial: n,
          previous: o,
          current: d
        };
        s({
          eventName: "onDrag",
          payload: {
            source: t,
            location: g
          }
        });
      });
    },
    drop: function(c) {
      var d = c.current, g = c.updatedSourcePayload;
      eo.flush(), Is.cancel(), s({
        eventName: "onDrop",
        payload: {
          source: g ?? t,
          location: {
            current: d,
            previous: o,
            initial: n
          }
        }
      });
    }
  };
  return l;
}
var Ys = {
  isActive: !1
};
function pc() {
  return !Ys.isActive;
}
function Cm(e) {
  return e.dataTransfer ? e.dataTransfer.setDragImage.bind(e.dataTransfer) : null;
}
function Mm(e) {
  var t = e.current, n = e.next;
  if (t.length !== n.length)
    return !0;
  for (var r = 0; r < t.length; r++)
    if (t[r].element !== n[r].element)
      return !0;
  return !1;
}
function Im(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = e.dispatchEvent;
  if (!pc())
    return;
  var s = Em({
    event: t,
    dragType: n,
    getDropTargetsOver: r
  });
  Ys.isActive = !0;
  var l = {
    current: s
  };
  Es({
    event: t,
    current: s.dropTargets
  });
  var a = Rm({
    source: n.payload,
    dispatchEvent: o,
    initial: s
  });
  function c(w) {
    var O = Mm({
      current: l.current.dropTargets,
      next: w.dropTargets
    });
    l.current = w, O && a.dragUpdate({
      current: l.current
    });
  }
  function d(w) {
    var O = gr(w), R = fc(w.target) ? dc({
      x: O.clientX,
      y: O.clientY
    }) : w.target, A = r({
      target: R,
      input: O,
      source: n.payload,
      current: l.current.dropTargets
    });
    A.length && (w.preventDefault(), Es({
      event: w,
      current: A
    })), c({
      dropTargets: A,
      input: O
    });
  }
  function g() {
    l.current.dropTargets.length && c({
      dropTargets: [],
      input: l.current.input
    }), a.drop({
      current: l.current,
      updatedSourcePayload: null
    }), h();
  }
  function h() {
    Ys.isActive = !1, y();
  }
  var y = on.bindAll(
    window,
    [{
      // 👋 Note: we are repurposing the `dragover` event as our `drag` event
      // this is because firefox does not publish pointer coordinates during
      // a `drag` event, but does for every other type of drag event
      // `dragover` fires on all elements that are being dragged over
      // Because we are binding to `window` - our `dragover` is effectively the same as a `drag`
      // 🦊😤
      type: "dragover",
      listener: function(O) {
        d(O), a.drag({
          current: l.current
        });
      }
    }, {
      type: "dragenter",
      listener: d
    }, {
      type: "dragleave",
      listener: function(O) {
        _m({
          dragLeave: O
        }) && (c({
          input: l.current.input,
          dropTargets: []
        }), n.startedFrom === "external" && g());
      }
    }, {
      // A "drop" can only happen if the browser allowed the drop
      type: "drop",
      listener: function(O) {
        if (l.current = {
          dropTargets: l.current.dropTargets,
          input: gr(O)
        }, !l.current.dropTargets.length) {
          g();
          return;
        }
        O.preventDefault(), Es({
          event: O,
          current: l.current.dropTargets
        }), a.drop({
          current: l.current,
          // When dropping something native, we need to extract the latest
          // `.items` from the "drop" event as it is now accessible
          updatedSourcePayload: n.type === "external" ? n.getDropPayload(O) : null
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
      listener: function(O) {
        l.current = {
          dropTargets: l.current.dropTargets,
          input: gr(O)
        }, g();
      }
    }].concat(gc(Sm({
      onDragEnd: g
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
    nativeSetDragImage: Cm(t)
  });
}
function Es(e) {
  var t, n = e.event, r = e.current, o = (t = r[0]) === null || t === void 0 ? void 0 : t.dropEffect;
  o != null && n.dataTransfer && (n.dataTransfer.dropEffect = o);
}
function Em(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = gr(t);
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
var Xl = {
  canStart: pc,
  start: Im
}, Zs = /* @__PURE__ */ new Map();
function Am(e) {
  var t = e.typeKey, n = e.mount, r = Zs.get(t);
  if (r)
    return r.usageCount++, r;
  var o = {
    typeKey: t,
    unmount: n(),
    usageCount: 1
  };
  return Zs.set(t, o), o;
}
function Om(e) {
  var t = Am(e);
  return function() {
    t.usageCount--, !(t.usageCount > 0) && (t.unmount(), Zs.delete(e.typeKey));
  };
}
function hc(e, t) {
  var n = t.attribute, r = t.value;
  return e.setAttribute(n, r), function() {
    return e.removeAttribute(n);
  };
}
function Yl(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Ft(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Yl(Object(n), !0).forEach(function(r) {
      Ar(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Yl(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function As(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = Pm(e)) || t) {
      n && (e = n);
      var r = 0, o = function() {
      };
      return { s: o, n: function() {
        return r >= e.length ? { done: !0 } : { done: !1, value: e[r++] };
      }, e: function(d) {
        throw d;
      }, f: o };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var s, l = !0, a = !1;
  return { s: function() {
    n = n.call(e);
  }, n: function() {
    var d = n.next();
    return l = d.done, d;
  }, e: function(d) {
    a = !0, s = d;
  }, f: function() {
    try {
      l || n.return == null || n.return();
    } finally {
      if (a) throw s;
    }
  } };
}
function Pm(e, t) {
  if (e) {
    if (typeof e == "string") return Zl(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Zl(e, t) : void 0;
  }
}
function Zl(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Os(e) {
  return e.slice(0).reverse();
}
function Dm(e) {
  var t = e.typeKey, n = e.defaultDropEffect, r = /* @__PURE__ */ new WeakMap(), o = "data-drop-target-for-".concat(t), s = "[".concat(o, "]");
  function l(w) {
    return r.set(w.element, w), function() {
      return r.delete(w.element);
    };
  }
  function a(w) {
    var O = Vo(hc(w.element, {
      attribute: o,
      value: "true"
    }), l(w));
    return cn(O);
  }
  function c(w) {
    var O, R, A, j, I = w.source, K = w.target, _ = w.input, D = w.result, L = D === void 0 ? [] : D;
    if (K == null)
      return L;
    if (!(K instanceof Element))
      return K instanceof Node ? c({
        source: I,
        target: K.parentElement,
        input: _,
        result: L
      }) : L;
    var B = K.closest(s);
    if (B == null)
      return L;
    var N = r.get(B);
    if (N == null)
      return L;
    var H = {
      input: _,
      source: I,
      element: N.element
    };
    if (N.canDrop && !N.canDrop(H))
      return c({
        source: I,
        target: N.element.parentElement,
        input: _,
        result: L
      });
    var U = (O = (R = N.getData) === null || R === void 0 ? void 0 : R.call(N, H)) !== null && O !== void 0 ? O : {}, Q = (A = (j = N.getDropEffect) === null || j === void 0 ? void 0 : j.call(N, H)) !== null && A !== void 0 ? A : n, ie = {
      data: U,
      element: N.element,
      dropEffect: Q,
      // we are collecting _actual_ drop targets, so these are
      // being applied _not_ due to stickiness
      isActiveDueToStickiness: !1
    };
    return c({
      source: I,
      target: N.element.parentElement,
      input: _,
      // Using bubble ordering. Same ordering as `event.getPath()`
      result: [].concat(gc(L), [ie])
    });
  }
  function d(w) {
    var O = w.eventName, R = w.payload, A = As(R.location.current.dropTargets), j;
    try {
      for (A.s(); !(j = A.n()).done; ) {
        var I, K = j.value, _ = r.get(K.element), D = Ft(Ft({}, R), {}, {
          self: K
        });
        _ == null || (I = _[O]) === null || I === void 0 || I.call(
          _,
          // I cannot seem to get the types right here.
          // TS doesn't seem to like that one event can need `nativeSetDragImage`
          // @ts-expect-error
          D
        );
      }
    } catch (L) {
      A.e(L);
    } finally {
      A.f();
    }
  }
  var g = {
    onGenerateDragPreview: d,
    onDrag: d,
    onDragStart: d,
    onDrop: d,
    onDropTargetChange: function(O) {
      var R = O.payload, A = new Set(R.location.current.dropTargets.map(function(ee) {
        return ee.element;
      })), j = /* @__PURE__ */ new Set(), I = As(R.location.previous.dropTargets), K;
      try {
        for (I.s(); !(K = I.n()).done; ) {
          var _, D = K.value;
          j.add(D.element);
          var L = r.get(D.element), B = A.has(D.element), N = Ft(Ft({}, R), {}, {
            self: D
          });
          if (L == null || (_ = L.onDropTargetChange) === null || _ === void 0 || _.call(L, N), !B) {
            var H;
            L == null || (H = L.onDragLeave) === null || H === void 0 || H.call(L, N);
          }
        }
      } catch (ee) {
        I.e(ee);
      } finally {
        I.f();
      }
      var U = As(R.location.current.dropTargets), Q;
      try {
        for (U.s(); !(Q = U.n()).done; ) {
          var ie, _e, Re = Q.value;
          if (!j.has(Re.element)) {
            var pe = Ft(Ft({}, R), {}, {
              self: Re
            }), le = r.get(Re.element);
            le == null || (ie = le.onDropTargetChange) === null || ie === void 0 || ie.call(le, pe), le == null || (_e = le.onDragEnter) === null || _e === void 0 || _e.call(le, pe);
          }
        }
      } catch (ee) {
        U.e(ee);
      } finally {
        U.f();
      }
    }
  };
  function h(w) {
    g[w.eventName](w);
  }
  function y(w) {
    var O = w.source, R = w.target, A = w.input, j = w.current, I = c({
      source: O,
      target: R,
      input: A
    });
    if (I.length >= j.length)
      return I;
    for (var K = Os(j), _ = Os(I), D = [], L = 0; L < K.length; L++) {
      var B, N = K[L], H = _[L];
      if (H != null) {
        D.push(H);
        continue;
      }
      var U = D[L - 1], Q = K[L - 1];
      if ((U == null ? void 0 : U.element) !== (Q == null ? void 0 : Q.element))
        break;
      var ie = r.get(N.element);
      if (!ie)
        break;
      var _e = {
        input: A,
        source: O,
        element: ie.element
      };
      if (ie.canDrop && !ie.canDrop(_e) || !((B = ie.getIsSticky) !== null && B !== void 0 && B.call(ie, _e)))
        break;
      D.push(Ft(Ft({}, N), {}, {
        // making it clear to consumers this drop target is active due to stickiness
        isActiveDueToStickiness: !0
      }));
    }
    return Os(D);
  }
  return {
    dropTargetForConsumers: a,
    getIsOver: y,
    dispatchEvent: h
  };
}
function km(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = Tm(e)) || t) {
      n && (e = n);
      var r = 0, o = function() {
      };
      return { s: o, n: function() {
        return r >= e.length ? { done: !0 } : { done: !1, value: e[r++] };
      }, e: function(d) {
        throw d;
      }, f: o };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var s, l = !0, a = !1;
  return { s: function() {
    n = n.call(e);
  }, n: function() {
    var d = n.next();
    return l = d.done, d;
  }, e: function(d) {
    a = !0, s = d;
  }, f: function() {
    try {
      l || n.return == null || n.return();
    } finally {
      if (a) throw s;
    }
  } };
}
function Tm(e, t) {
  if (e) {
    if (typeof e == "string") return Jl(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Jl(e, t) : void 0;
  }
}
function Jl(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Ql(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Fm(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ql(Object(n), !0).forEach(function(r) {
      Ar(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ql(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Hm() {
  var e = /* @__PURE__ */ new Set(), t = null;
  function n(s) {
    t && (!s.canMonitor || s.canMonitor(t.canMonitorArgs)) && t.active.add(s);
  }
  function r(s) {
    var l = Fm({}, s);
    e.add(l), n(l);
    function a() {
      e.delete(l), t && t.active.delete(l);
    }
    return cn(a);
  }
  function o(s) {
    var l = s.eventName, a = s.payload;
    if (l === "onGenerateDragPreview") {
      t = {
        canMonitorArgs: {
          initial: a.location.initial,
          source: a.source
        },
        active: /* @__PURE__ */ new Set()
      };
      var c = km(e), d;
      try {
        for (c.s(); !(d = c.n()).done; ) {
          var g = d.value;
          n(g);
        }
      } catch (A) {
        c.e(A);
      } finally {
        c.f();
      }
    }
    if (t) {
      for (var h = Array.from(t.active), y = 0, w = h; y < w.length; y++) {
        var O = w[y];
        if (t.active.has(O)) {
          var R;
          (R = O[l]) === null || R === void 0 || R.call(O, a);
        }
      }
      l === "onDrop" && (t.active.clear(), t = null);
    }
  }
  return {
    dispatchEvent: o,
    monitorForConsumers: r
  };
}
function Lm(e) {
  var t = e.typeKey, n = e.mount, r = e.dispatchEventToSource, o = e.onPostDispatch, s = e.defaultDropEffect, l = Hm(), a = Dm({
    typeKey: t,
    defaultDropEffect: s
  });
  function c(h) {
    r == null || r(h), a.dispatchEvent(h), l.dispatchEvent(h), o == null || o(h);
  }
  function d(h) {
    var y = h.event, w = h.dragType;
    Xl.start({
      event: y,
      dragType: w,
      getDropTargetsOver: a.getIsOver,
      dispatchEvent: c
    });
  }
  function g() {
    function h() {
      var y = {
        canStart: Xl.canStart,
        start: d
      };
      return n(y);
    }
    return Om({
      typeKey: t,
      mount: h
    });
  }
  return {
    registerUsage: g,
    dropTarget: a.dropTargetForConsumers,
    monitor: l.monitorForConsumers
  };
}
var jm = cn(function() {
  return navigator.userAgent.toLocaleLowerCase().includes("android");
}), zm = "pdnd:android-fallback", ea = "text/plain", Km = "text/uri-list", Vm = "application/vnd.pdnd", wo = /* @__PURE__ */ new WeakMap();
function Bm(e) {
  return wo.set(e.element, e), function() {
    wo.delete(e.element);
  };
}
var ta = gm(), vc = Lm({
  typeKey: "element",
  defaultDropEffect: "move",
  mount: function(t) {
    return Vo(ta.bindEvents(), on.bind(document, {
      type: "dragstart",
      listener: function(r) {
        var o, s, l, a, c, d;
        if (t.canStart(r) && !r.defaultPrevented && r.dataTransfer) {
          var g = r.target;
          if (g instanceof HTMLElement) {
            var h = wo.get(g);
            if (h) {
              var y = gr(r), w = {
                element: h.element,
                dragHandle: (o = h.dragHandle) !== null && o !== void 0 ? o : null,
                input: y
              };
              if (h.canDrag && !h.canDrag(w)) {
                r.preventDefault();
                return;
              }
              if (h.dragHandle) {
                var O = dc({
                  x: y.clientX,
                  y: y.clientY
                });
                if (!h.dragHandle.contains(O)) {
                  r.preventDefault();
                  return;
                }
              }
              var R = (s = (l = h.getInitialDataForExternal) === null || l === void 0 ? void 0 : l.call(h, w)) !== null && s !== void 0 ? s : null;
              if (R)
                for (var A = 0, j = Object.entries(R); A < j.length; A++) {
                  var I = uc(j[A], 2), K = I[0], _ = I[1];
                  r.dataTransfer.setData(K, _ ?? "");
                }
              jm() && !r.dataTransfer.types.includes(ea) && !r.dataTransfer.types.includes(Km) && r.dataTransfer.setData(ea, zm), r.dataTransfer.setData(Vm, "");
              var D = {
                element: h.element,
                dragHandle: (a = h.dragHandle) !== null && a !== void 0 ? a : null,
                data: (c = (d = h.getInitialData) === null || d === void 0 ? void 0 : d.call(h, w)) !== null && c !== void 0 ? c : {}
              }, L = {
                type: "element",
                payload: D,
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
    (n = wo.get(s.source.element)) === null || n === void 0 || (r = n[o]) === null || r === void 0 || r.call(
      n,
      // I cannot seem to get the types right here.
      // TS doesn't seem to like that one event can need `nativeSetDragImage`
      // @ts-expect-error
      s
    );
  },
  onPostDispatch: ta.getOnPostDispatch()
}), Nm = vc.dropTarget;
function $m(e) {
  var t = Vo(
    // making the draggable register the adapter rather than drop targets
    // this is because you *must* have a draggable element to start a drag
    // but you _might_ not have any drop targets immediately
    // (You might create drop targets async)
    vc.registerUsage(),
    Bm(e),
    hc(e.element, {
      attribute: "draggable",
      value: "true"
    })
  );
  return cn(t);
}
const Ps = /* @__PURE__ */ new Map(), Pn = "pnl-tst-row";
function Wm(e, t) {
  return Vo(
    $m({
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
        return { type: Pn, group: "", sourceId: "", key: null, keys: [] };
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
    Nm({
      element: e,
      // Position is deliberately not consulted here. pdnd settles `canDrop` when
      // the pointer enters the element, and the element is the whole layout, so an
      // answer given from the pointer's first position would stand for the rest of
      // the drag. Which pane the pointer is over, and whether that pane accepts
      // the drag at all, is decided in `getData`, which runs on every move.
      canDrop: ({ source: n }) => n.data.type === Pn,
      getData: ({ input: n, source: r }) => {
        for (const o of t.panes) {
          const s = o.dropData(n, r.data);
          if (s) return s;
        }
        return { type: Pn, key: null, paneId: "" };
      },
      onDrag: ({ self: n }) => {
        const r = n.data.key, o = Vl(n.data);
        for (const s of t.panes)
          s.id() === n.data.paneId && r && o ? s.showDrop(r, o) : s.clearDrop();
      },
      onDragLeave: () => {
        for (const n of t.panes) n.clearDrop();
      },
      onDrop: ({ self: n, source: r, location: o }) => {
        for (const c of t.panes) c.clearDrop();
        const s = t.panes.find((c) => c.id() === n.data.paneId), l = n.data.key, a = Vl(n.data);
        !s || !l || !a || a.type === "instruction-blocked" || s.drop(r.data, l, a, o.current.input);
      }
    })
  );
}
function Um(e, t) {
  let n = Ps.get(e);
  return n || (n = { panes: [] }, n.cleanup = Wm(e, n), Ps.set(e, n)), n.panes.push(t), () => {
    var r;
    n.panes = n.panes.filter((o) => o !== t), !(n.panes.length > 0) && ((r = n.cleanup) == null || r.call(n), Ps.delete(e));
  };
}
const qm = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ef5350" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m6 10h-4v8a4 4 0 1 1-4-4 3.96 3.96 0 0 1 2 .555V8h6Z"/></svg>', Gm = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#ff7043" d="M2 2a1 1 0 0 0-1 1v10c0 .554.446 1 1 1h12c.554 0 1-.446 1-1V3a1 1 0 0 0-1-1zm0 3h12v8H2zm1 2 2 2-2 2 1 1 3-3-3-3zm5 3.5V12h5v-1.5z"/></svg>', Xm = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#7e57c2" d="M20 18h-2v-2h-2v2c0 .193 0 .703 1.254 1.033A3.345 3.345 0 0 1 20 22h2v2h2v-2c0-.388-.562-.851-1.254-1.034C20.356 20.34 20 18.84 20 18m-3.254 2.966C14.356 20.34 14 18.84 14 18h-2v-2h-2v8h2v-2h4v2h2v-2c0-.388-.562-.851-1.254-1.034"/><path fill="#7e57c2" d="M24 4H4v20a4 4 0 0 0 4 4h16.16A3.84 3.84 0 0 0 28 24.16V8a4 4 0 0 0-4-4m2 14h-2v-2h-2v2c0 .193 0 .703 1.254 1.033A3.345 3.345 0 0 1 26 22v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1 2-2h2a2 2 0 0 1 2 2Z"/></svg>', Ym = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ffca28" d="M16 24c-5.525 0-10-.9-10-2v4c0 1.1 4.475 2 10 2s10-.9 10-2v-4c0 1.1-4.475 2-10 2m0-8c-5.525 0-10-.9-10-2v4c0 1.1 4.475 2 10 2s10-.9 10-2v-4c0 1.1-4.475 2-10 2m0-12C10.477 4 6 4.895 6 6v4c0 1.1 4.475 2 10 2s10-.9 10-2V6c0-1.105-4.477-2-10-2"/></svg>', Zm = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/><path fill="#42a5f5" d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5z"/></svg>', Jm = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m8.668 6h3.6641l-3.6641-3.668v3.668m-4.668-4.668h5.332l4 4v8c0 0.73828-0.59375 1.3359-1.332 1.3359h-8c-0.73828 0-1.332-0.59766-1.332-1.3359v-10.664c0-0.74219 0.59375-1.3359 1.332-1.3359m3.332 1.3359h-3.332v10.664h8v-6h-4.668z" fill="#90a4ae" /></svg>', Qm = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m6.922 3.768-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232" fill="#90a4ae" /></svg>', e0 = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.483 6H4.721a1 1 0 0 0-.949.684L2 12V5h12a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232l-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h11l2.403-5.606A1 1 0 0 0 14.483 6" fill="#90a4ae" /></svg>', t0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#e65100" d="m4 4 2 22 10 2 10-2 2-22Zm19.72 7H11.28l.29 3h11.86l-.802 9.335L15.99 25l-6.635-1.646L8.93 19h3.02l.19 2 3.86.77 3.84-.77.29-4H8.84L8 8h16Z"/></svg>', n0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#26a69a" d="M8.5 6h4l-4-4zM3.875 1H9.5l4 4v8.6c0 .773-.616 1.4-1.375 1.4h-8.25c-.76 0-1.375-.627-1.375-1.4V2.4c0-.777.612-1.4 1.375-1.4M4 13.6h8V8l-2.625 2.8L8 9.4zm1.25-7.7c-.76 0-1.375.627-1.375 1.4s.616 1.4 1.375 1.4c.76 0 1.375-.627 1.375-1.4S6.009 5.9 5.25 5.9"/></svg>', r0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#ffca28" d="M2 2v12h12V2zm6 6h1v4a1.003 1.003 0 0 1-1 1H7a1.003 1.003 0 0 1-1-1v-1h1v1h1zm3 0h2v1h-2v1h1a1.003 1.003 0 0 1 1 1v1a1.003 1.003 0 0 1-1 1h-2v-1h2v-1h-1a1.003 1.003 0 0 1-1-1V9a1.003 1.003 0 0 1 1-1"/></svg>', o0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path fill="#f9a825" d="M560-160v-80h120q17 0 28.5-11.5T720-280v-80q0-38 22-69t58-44v-14q-36-13-58-44t-22-69v-80q0-17-11.5-28.5T680-720H560v-80h120q50 0 85 35t35 85v80q0 17 11.5 28.5T840-560h40v160h-40q-17 0-28.5 11.5T800-360v80q0 50-35 85t-85 35zm-280 0q-50 0-85-35t-35-85v-80q0-17-11.5-28.5T120-400H80v-160h40q17 0 28.5-11.5T160-600v-80q0-50 35-85t85-35h120v80H280q-17 0-28.5 11.5T240-680v80q0 38-22 69t-58 44v14q36 13 58 44t22 69v80q0 17 11.5 28.5T280-240h120v80z"/></svg>', s0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#42a5f5" d="m14 10-4 3.5L6 10H4v12h4v-6l2 2 2-2v6h4V10zm12 6v-6h-4v6h-4l6 8 6-8z"/></svg>', i0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ef5350" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m4.93 10.44c.41.9.93 1.64 1.53 2.15l.41.32c-.87.16-2.07.44-3.34.93l-.11.04.5-1.04c.45-.87.78-1.66 1.01-2.4m6.48 3.81c.18-.18.27-.41.28-.66.03-.2-.02-.39-.12-.55-.29-.47-1.04-.69-2.28-.69l-1.29.07-.87-.58c-.63-.52-1.2-1.43-1.6-2.56l.04-.14c.33-1.33.64-2.94-.02-3.6a.85.85 0 0 0-.61-.24h-.24c-.37 0-.7.39-.79.77-.37 1.33-.15 2.06.22 3.27v.01c-.25.88-.57 1.9-1.08 2.93l-.96 1.8-.89.49c-1.2.75-1.77 1.59-1.88 2.12-.04.19-.02.36.05.54l.03.05.48.31.44.11c.81 0 1.73-.95 2.97-3.07l.18-.07c1.03-.33 2.31-.56 4.03-.75 1.03.51 2.24.74 3 .74.44 0 .74-.11.91-.3m-.41-.71.09.11c-.01.1-.04.11-.09.13h-.04l-.19.02c-.46 0-1.17-.19-1.9-.51.09-.1.13-.1.23-.1 1.4 0 1.8.25 1.9.35M7.83 17c-.65 1.19-1.24 1.85-1.69 2 .05-.38.5-1.04 1.21-1.69zm3.02-6.91c-.23-.9-.24-1.63-.07-2.05l.07-.12.15.05c.17.24.19.56.09 1.1l-.03.16-.16.82z"/></svg>', l0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#e64a19" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zM8 11v2h1v6H8v1h4v-1h-1v-2h2a3 3 0 0 0 3-3 3 3 0 0 0-3-3zm5 2a1 1 0 0 1 1 1 1 1 0 0 1-1 1h-2v-2z"/></svg>', a0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#0288d1" d="M9.86 2A2.86 2.86 0 0 0 7 4.86v1.68h4.29c.39 0 .71.57.71.96H4.86A2.86 2.86 0 0 0 2 10.36v3.781a2.86 2.86 0 0 0 2.86 2.86h1.18v-2.68a2.85 2.85 0 0 1 2.85-2.86h5.25c1.58 0 2.86-1.271 2.86-2.851V4.86A2.86 2.86 0 0 0 14.14 2zm-.72 1.61c.4 0 .72.12.72.71s-.32.891-.72.891c-.39 0-.71-.3-.71-.89s.32-.711.71-.711"/><path fill="#fdd835" d="M17.959 7v2.68a2.85 2.85 0 0 1-2.85 2.859H9.86A2.85 2.85 0 0 0 7 15.389v3.75a2.86 2.86 0 0 0 2.86 2.86h4.28A2.86 2.86 0 0 0 17 19.14v-1.68h-4.291c-.39 0-.709-.57-.709-.96h7.14A2.86 2.86 0 0 0 22 13.64V9.86A2.86 2.86 0 0 0 19.14 7zM8.32 11.513l-.004.004.038-.004zm6.54 7.276c.39 0 .71.3.71.89a.71.71 0 0 1-.71.71c-.4 0-.72-.12-.72-.71s.32-.89.72-.89"/></svg>', u0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#8bc34a" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zm4 7.5h-4v2h1l-2 1.67L10 13h1v-2H7v2h1l3 2.5L8 18H7v2h4v-2h-1l2-1.67L14 18h-1v2h4v-2h-1l-3-2.5 3-2.5h1z"/></svg>', c0 = '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 16 16"><path fill="#0288d1" d="M2 2v12h12V2zm4 6h3v1H8v4H7V9H6zm5 0h2v1h-2v1h1a1.003 1.003 0 0 1 1 1v1a1.003 1.003 0 0 1-1 1h-2v-1h2v-1h-1a1.003 1.003 0 0 1-1-1V9a1.003 1.003 0 0 1 1-1"/></svg>', f0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ff9800" d="m24 6 2 6h-4l-2-6h-3l2 6h-4l-2-6h-3l2 6H8L6 6H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3V6Z"/></svg>', d0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#01579b" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zM7 13l1.5 7h2l1.5-3 1.5 3h2l1.5-7h1v-2h-4v2h1l-.9 4.2L13 15h-2l-1.1 2.2L9 13h1v-2H6v2z"/></svg>', g0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#8bc34a" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m.12 13.5 3.74 3.74 1.42-1.41-2.33-2.33 2.33-2.33-1.42-1.41zm11.16 0-3.74-3.74-1.42 1.41 2.33 2.33-2.33 2.33 1.42 1.41z"/></svg>', p0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ff5252" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2m12 16v-2H9v2zm-4-4v-2H6v2z"/></svg>', h0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#afb42b" d="M14 17h-2v-2h-2v-2h2v2h2m0-6h-2v2h2v2h-2v-2h-2V9h2V7h-2V5h2v2h2m5-4H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2"/></svg>', na = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, ra = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, v0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, m0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, y0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, w0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, b0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, _0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, S0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, x0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, R0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, C0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, M0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, I0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, E0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, A0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, O0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, P0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, D0 = ["aria-label"], k0 = {
  key: 0,
  class: "pnl-tst-tsep",
  "aria-hidden": "true"
}, T0 = {
  key: 1,
  class: "pnl-tst-search"
}, F0 = ["innerHTML"], H0 = ["value", "aria-label", "placeholder"], L0 = ["aria-label", "aria-keyshortcuts", "aria-disabled", "title", "tabindex", "onClick", "onFocus"], j0 = ["innerHTML"], z0 = {
  key: 1,
  class: "pnl-tst-empty"
}, K0 = ["aria-label", "aria-colcount", "aria-rowcount"], V0 = {
  class: "pnl-tst-hrow",
  role: "row",
  "aria-rowindex": 1
}, B0 = ["aria-colindex", "aria-sort", "aria-keyshortcuts", "tabindex", "onClick", "onFocus", "onKeydown"], N0 = { class: "pnl-tst-hlabel" }, $0 = ["innerHTML"], W0 = ["onDblclick", "onMousedown", "onTouchstart"], U0 = ["aria-level", "aria-posinset", "aria-setsize", "aria-rowindex", "aria-expanded", "aria-busy", "aria-selected", "aria-haspopup", "tabindex", "onClick", "onContextmenu", "onFocus"], q0 = ["aria-colindex", "onDblclick"], G0 = ["onClick"], X0 = {
  key: 1,
  class: "pnl-tst-twisty pnl-tst-twisty--leaf",
  "aria-hidden": "true"
}, Y0 = ["checked", ".indeterminate", "aria-label", "onClick"], Z0 = ["innerHTML"], J0 = ["value", "aria-label", "aria-invalid", "onKeydown", "onBlur"], Q0 = {
  key: 2,
  class: "pnl-tst-value"
}, ey = {
  key: 3,
  class: "pnl-tst-modal"
}, ty = {
  id: "pnl-tst-confirm-message",
  class: "pnl-tst-dialog-message"
}, ny = { class: "pnl-tst-dialog-actions" }, ry = ["aria-label"], oy = {
  key: 0,
  class: "pnl-tst-msep",
  role: "separator"
}, sy = ["aria-keyshortcuts", "aria-disabled", "tabindex", "onClick", "onFocus"], iy = ["innerHTML"], ly = { class: "pnl-tst-mlabel" }, ay = {
  key: 0,
  class: "pnl-tst-mkeys",
  "aria-hidden": "true"
}, uy = "title", cy = 200, oa = 16, sa = 6, fy = 40, nr = "search", Ht = "|", Cn = 4, dy = 500, gy = {
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
    // Two-way sync of the row the inline editor is open on.
    setEditingKey: { type: Function, required: !0 },
    // Two-way sync of the column it is open on, "" for the tree column.
    setEditingColumn: { type: Function, required: !0 },
    // Two-way sync of the sort, as a list of {id, desc}.
    setSorting: { type: Function, required: !0 },
    // Two-way sync of the resized column widths, as a map of column id to pixels.
    setColumnWidths: { type: Function, required: !0 }
  },
  setup(e) {
    var el;
    const t = e, n = {
      columnSizingFeature: yv,
      columnResizingFeature: mv,
      rowExpandingFeature: wv,
      rowSelectionFeature: Dv,
      rowSortingFeature: kv,
      coreRowModel: Bu(),
      expandedRowModel: Tv(),
      sortedRowModel: Lv(),
      sortFns: { alphanumeric: Yp, text: Zp }
    }, r = W(() => (t.state.columns || []).length > 0), o = W(() => r.value && t.state.options.sortable !== !1), s = W(() => t.state.options.sort_folders_first === !0), l = W(() => r.value && t.state.options.resizable !== !1), a = W(
      () => (t.state.columns || []).slice(1).filter((i) => i.editable === !0)
    ), c = W(() => a.value.map((i) => String(i.id)));
    function d(i) {
      return a.value.find((u) => String(u.id) === i) ?? null;
    }
    const g = W(() => {
      const i = t.state.columns || [];
      return i.length === 0 ? [{ id: uy, header: "", accessorFn: (u) => u.title }] : i.map((u) => {
        const f = u.field ?? u.id;
        return {
          id: u.id,
          header: u.header ?? u.id,
          // Through the type registry, because a type may carry a column value just as
          // it carries an icon, and because Python reads the same fields the same way
          // when it decides what a search reaches inside a pruned branch.
          accessorFn: (v) => y(v, f),
          enableSorting: u.sortable !== !1,
          enableResizing: u.resizable !== !1,
          // Written only where Python actually declared one, so the rest fall back to
          // TanStack's own defaults (150 wide, no narrower than 20) rather than to a
          // second set of numbers kept here.
          ...h("size", u.width),
          ...h("minSize", u.min_width),
          ...h("maxSize", u.max_width),
          // Only set when asked for, so an ordinary table keeps TanStack's own
          // detection of what a column holds rather than routing through ours.
          ...s.value ? { sortFn: O } : {}
        };
      });
    });
    function h(i, u) {
      return typeof u == "number" && Number.isFinite(u) ? { [i]: u } : {};
    }
    function y(i, u) {
      const f = i == null ? void 0 : i[u];
      if (f !== void 0) return f;
      const v = (t.state.types || {})[i == null ? void 0 : i.type];
      return v && typeof v == "object" ? v[u] : void 0;
    }
    function w(i) {
      return i.subRows.length > 0 || y(i.original, "allow_children") !== !1;
    }
    function O(i, u, f) {
      const v = w(i);
      if (v !== w(u)) {
        const E = Q.value.some((z) => z.id === f && z.desc);
        return (v ? -1 : 1) * (E ? -1 : 1);
      }
      return we.getColumn(f).getAutoSortFn()(i, u, f);
    }
    const R = /* @__PURE__ */ J(A(t.state.expandedKeys));
    function A(i) {
      const u = {};
      for (const f of i || []) u[f] = !0;
      return u;
    }
    function j(i) {
      return i === !0 ? we.getCoreRowModel().flatRows.filter((u) => u.subRows.length > 0).map((u) => u.id).sort() : Object.keys(i).filter((u) => i[u]).sort();
    }
    const I = {
      audio: qm,
      console: Gm,
      css: Xm,
      database: Ym,
      document: Zm,
      file: Jm,
      folder: Qm,
      "folder-open": e0,
      html: t0,
      image: n0,
      javascript: r0,
      json: o0,
      markdown: s0,
      pdf: i0,
      powerpoint: l0,
      python: a0,
      table: u0,
      typescript: c0,
      video: f0,
      word: d0,
      xml: g0,
      yaml: p0,
      zip: h0
    };
    function K(i) {
      return i ? { ...I, ...t.state.icons || {} }[i] ?? null : null;
    }
    function _(i) {
      const u = y(i.original, "icon");
      return u ? (Ln(i) ? K(`${u}-open`) : null) ?? K(u) : null;
    }
    function D(i, u) {
      return i.length !== u.length ? !1 : i.every((f, v) => f === u[v]);
    }
    const L = W(() => t.state.options.select_mode ?? "none"), B = W(() => L.value !== "none"), N = W(() => L.value === "hierarchy"), H = W(
      () => B.value && t.state.options.show_checkboxes !== !1
    ), U = /* @__PURE__ */ J(A(t.state.selectedKeys)), Q = /* @__PURE__ */ J(ie(t.state.sorting));
    function ie(i) {
      return (i || []).filter((u) => u && u.id).map((u) => ({ id: String(u.id), desc: u.desc === !0 }));
    }
    function _e(i, u) {
      return i.length === u.length && i.every((f, v) => f.id === u[v].id && f.desc === u[v].desc);
    }
    const Re = W(() => o.value && Q.value.length > 0), pe = /* @__PURE__ */ J(le(t.state.columnWidths));
    function le(i) {
      const u = {};
      for (const [f, v] of Object.entries(i || {})) {
        const E = Math.round(Number(v));
        Number.isFinite(E) && E > 0 && (u[f] = E);
      }
      return u;
    }
    function ee(i, u) {
      const f = Object.keys(i);
      return f.length === Object.keys(u).length && f.every((v) => i[v] === u[v]);
    }
    const se = /* @__PURE__ */ J(null), we = Kv({
      features: n,
      data: W(() => t.state.view || []),
      columns: g,
      getRowId: (i) => i.key,
      getSubRows: (i) => i.children,
      // TanStack resets `expanded` whenever `data` changes. Python rewrites the
      // whole tree after every move, so leaving that on would collapse the tree on
      // each drop and push an empty `expanded_keys` back. Expansion is owned here.
      autoResetExpanded: !1,
      // The same bargain for the sort: a tree Python rewrote is not a user asking
      // for a different order, and dropping the sort on every move would undo the
      // one thing the header was pressed for.
      autoResetSorting: !1,
      enableRowSelection: B,
      enableMultiRowSelection: W(() => L.value !== "single"),
      enableSubRowSelection: N,
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
      enableColumnResizing: l,
      // The columns follow the pointer rather than a guide line that commits on
      // release. It costs a render per frame of the drag, which is what a table with
      // every row in the DOM can afford today and what P15 has to look at again.
      columnResizeMode: "onChange",
      state: W(() => ({
        expanded: R.value,
        rowSelection: U.value,
        sorting: Q.value,
        columnSizing: pe.value
      })),
      onExpandedChange: (i) => {
        R.value = typeof i == "function" ? i(R.value) : i;
      },
      onRowSelectionChange: (i) => {
        U.value = typeof i == "function" ? i(U.value) : i;
      },
      onSortingChange: (i) => {
        Q.value = ie(typeof i == "function" ? i(Q.value) : i);
      },
      onColumnSizingChange: (i) => {
        pe.value = le(
          typeof i == "function" ? i(pe.value) : i
        );
      }
    });
    function Pt(i) {
      if (i.getIsSelected()) return "all";
      if (!N.value || i.subRows.length === 0) return "none";
      const u = i.subRows.map(Pt);
      return u.every((f) => f === "all") ? "all" : u.some((f) => f !== "none") ? "some" : "none";
    }
    ye(() => j(U.value), t.setSelectedKeys, { flush: "post" }), ye(() => j(R.value), t.setExpandedKeys, { flush: "post" }), ye(
      () => t.state.expandedKeys,
      (i) => {
        D(j(R.value), [...i || []].sort()) || (R.value = A(i));
      }
    ), ye(
      () => t.state.selectedKeys,
      (i) => {
        D(j(U.value), [...i || []].sort()) || (U.value = A(i));
      }
    ), ye(() => Q.value, t.setSorting, { flush: "post" }), ye(
      () => t.state.sorting,
      (i) => {
        const u = ie(i);
        _e(Q.value, u) || (Q.value = u);
      }
    ), ye(
      () => [pe.value, se.value],
      ([i, u]) => {
        u || t.setColumnWidths(i);
      },
      { flush: "post" }
    ), ye(
      () => t.state.columnWidths,
      (i) => {
        const u = le(i);
        ee(pe.value, u) || (pe.value = u);
      }
    ), ye(
      () => [t.state.options.expand_all, t.state.view],
      ([i]) => {
        i && we.toggleAllRowsExpanded(!0);
      },
      { immediate: !0 }
    );
    const ze = /* @__PURE__ */ J(t.state.filterText ?? ""), Ke = W(() => ze.value.trim().toLowerCase()), Ve = W(() => Ke.value.length > 0);
    let Dt = null, fn = t.state.filterText ?? "";
    ye(
      () => t.state.filterText,
      (i) => {
        const u = i ?? "";
        u !== fn && (fn = u, ze.value = u);
      }
    );
    function Vt(i) {
      ze.value = i, Dt !== null && clearTimeout(Dt), Dt = setTimeout(() => {
        Dt = null, fn = ze.value, t.setFilterText(fn);
      }, cy);
    }
    rr(() => {
      Dt !== null && clearTimeout(Dt);
    });
    function dn(i) {
      return i.getAllCells().some((u) => String(u.getValue() ?? "").toLowerCase().includes(Ke.value));
    }
    const ae = W(() => {
      if (!Ve.value) return we.getRowModel().rows;
      const i = we.getSortedRowModel().flatRows, u = /* @__PURE__ */ new Set();
      for (const f of i)
        if (dn(f)) {
          u.add(f.id);
          for (let v = f.getParentRow(); v; v = v.getParentRow()) u.add(v.id);
        }
      return i.filter((f) => u.has(f.id));
    }), We = W(() => {
      var i;
      return ((i = we.getHeaderGroups()[0]) == null ? void 0 : i.headers) ?? [];
    }), ht = W(() => t.state.options.indent_px ?? 16), xi = W(() => t.state.options.aria_label ?? "Tree table"), p = W(() => Ve.value ? "No matches" : "No data"), m = W(() => r.value ? 2 : 1), b = W(() => ae.value.length + (r.value ? 1 : 0)), M = /* @__PURE__ */ J(!1), x = /* @__PURE__ */ J(null), S = /* @__PURE__ */ new Map();
    function T(i, u) {
      u ? S.set(i, u) : S.delete(i);
    }
    const k = W(() => {
      const i = We.value;
      return i.length === 0 ? null : i.some((f) => f.column.id === x.value) ? x.value : i[0].column.id;
    });
    function P(i) {
      const u = We.value;
      if (u.length === 0) return;
      const f = u[Math.max(0, Math.min(i, u.length - 1))];
      M.value = !0, x.value = f.column.id, Le(() => {
        var v;
        return (v = S.get(f.column.id)) == null ? void 0 : v.focus();
      });
    }
    function C() {
      const i = We.value;
      P(i.findIndex((u) => u.column.id === k.value));
    }
    function $() {
      M.value = !1, Uo(vn.value);
    }
    function F(i) {
      return o.value && i.column.getCanSort();
    }
    function V(i) {
      if (!F(i)) return;
      const u = i.column.getIsSorted();
      return u === "asc" ? "ascending" : u === "desc" ? "descending" : "none";
    }
    function q(i) {
      if (!F(i)) return null;
      const u = i.column.getIsSorted();
      return u ? u === "asc" ? ra : na : null;
    }
    function Z(i) {
      F(i) && i.column.toggleSorting();
    }
    function fe(i) {
      P(We.value.indexOf(i)), Z(i);
    }
    function ne(i) {
      return l.value && i.column.getCanResize();
    }
    function be(i) {
      var v;
      const u = i.column.id;
      if (u in pe.value) return null;
      const f = Math.round(((v = S.get(u)) == null ? void 0 : v.getBoundingClientRect().width) ?? 0);
      return f <= 0 || f === i.column.getSize() ? null : (pe.value = { ...pe.value, [u]: f }, f);
    }
    async function xe(i, u) {
      if (!ne(i)) return;
      u.stopPropagation(), be(i) !== null && await Le(), i.getResizeHandler()(u), se.value = i.column.id;
      const f = () => {
        se.value = null;
      };
      for (const v of ["mouseup", "touchend", "touchcancel"])
        document.addEventListener(v, f, { once: !0 });
    }
    function Be(i, u) {
      if (!ne(i)) return;
      const f = i.column, v = f.columnDef.minSize ?? 20, E = f.columnDef.maxSize ?? Number.MAX_SAFE_INTEGER, z = be(i) ?? f.getSize(), me = Math.min(Math.max(Math.round(z + u), v), E);
      we.setColumnSizing((de) => ({ ...de, [f.id]: me }));
    }
    function Ne(i) {
      ne(i) && i.column.resetSize();
    }
    function Bt(i, u) {
      const f = We.value, v = Math.max(
        0,
        f.findIndex((E) => E.column.id === k.value)
      );
      if (u.altKey) {
        switch (u.key) {
          case "ArrowLeft":
            Be(i, -oa);
            break;
          case "ArrowRight":
            Be(i, oa);
            break;
          case "Home":
            Ne(i);
            break;
          default:
            return;
        }
        u.preventDefault(), u.stopPropagation();
        return;
      }
      switch (u.key) {
        case "ArrowLeft":
          P(v - 1);
          break;
        case "ArrowRight":
          P(v + 1);
          break;
        case "Home":
          P(0);
          break;
        case "End":
          P(f.length - 1);
          break;
        case "ArrowDown":
          $();
          break;
        case "Enter":
        case " ":
          Z(i);
          break;
        default:
          return;
      }
      u.preventDefault(), u.stopPropagation();
    }
    const Hn = W(() => {
      const i = /* @__PURE__ */ new Map();
      for (const u of ae.value) {
        const f = u.parentId ?? "", v = i.get(f) ?? [];
        v.push(u.id), i.set(f, v);
      }
      return i;
    });
    function Ie(i) {
      return Hn.value.get(i.parentId ?? "") ?? [];
    }
    function Ue(i) {
      return Ie(i).indexOf(i.id) + 1;
    }
    function Pr(i) {
      return Ie(i).length;
    }
    function Nt(i) {
      return y(i.original, "lazy") === !0;
    }
    function gn(i) {
      return Ve.value ? (Hn.value.get(i.id) ?? []).length > 0 : i.getCanExpand() || Nt(i);
    }
    function Ln(i) {
      return Ve.value ? gn(i) : i.getIsExpanded();
    }
    const $t = /* @__PURE__ */ J(/* @__PURE__ */ new Set());
    function No(i) {
      return $t.value.has(i.id) && Nt(i);
    }
    function Wt(i, u) {
      if (u && Nt(i) && !$t.value.has(i.id) && ($t.value = new Set($t.value).add(i.id), t.emitEvent("lazy_load", { key: i.id })), !Nt(i) || !u || R.value === !0) {
        i.toggleExpanded(u);
        return;
      }
      R.value = { ...R.value, [i.id]: !0 };
    }
    ye(ae, (i) => {
      if ($t.value.size === 0) return;
      const u = new Set(i.filter((f) => No(f)).map((f) => f.id));
      u.size !== $t.value.size && ($t.value = u);
    });
    const mc = W(() => {
      if (!r.value) return {};
      const i = { "--pnl-tst-total": `${we.getTotalSize()}px` };
      return We.value.forEach((u, f) => {
        i[`--pnl-tst-w${f}`] = `${u.column.getSize()}px`;
      }), i;
    }), yc = W(() => {
      const i = We.value[0];
      return i ? i.column.id in pe.value : !1;
    });
    function $o(i) {
      return r.value ? i === 0 && !yc.value ? { flex: "1 0 var(--pnl-tst-w0)" } : { flex: `0 0 var(--pnl-tst-w${i})` } : { flex: "1 1 0" };
    }
    function wc(i) {
      return { ...$o(0), paddingInlineStart: `${i.depth * ht.value}px` };
    }
    const jn = /* @__PURE__ */ J(null), Ri = /* @__PURE__ */ J(null), Dr = /* @__PURE__ */ J(0), kr = /* @__PURE__ */ J(null), zn = /* @__PURE__ */ J(0), kt = /* @__PURE__ */ J(28);
    function Wo() {
      var f;
      const i = jn.value;
      if (!i) return;
      const u = Number.parseFloat(getComputedStyle(i).getPropertyValue("--pnl-tst-row-height"));
      Number.isFinite(u) && u > 0 && (kt.value = u), zn.value = ((f = Ri.value) == null ? void 0 : f.offsetHeight) ?? 0, kr.value = i.clientHeight, Dr.value = i.scrollTop;
    }
    const Ci = W(() => {
      const i = ae.value.length;
      if (kr.value === null) return { start: 0, end: Math.min(i, fy) };
      const u = Math.max(0, Dr.value - zn.value), f = Math.max(0, Math.floor(u / kt.value) - sa), v = Math.ceil(kr.value / kt.value) + sa * 2 + 1;
      return { start: f, end: Math.min(i, f + v) };
    }), Mi = W(() => {
      const i = ae.value, { start: u, end: f } = Ci.value, v = i.findIndex((z) => z.id === vn.value), E = [];
      v >= 0 && v < u && E.push({ row: i[v], index: v, held: !0 });
      for (let z = u; z < f; z += 1)
        E.push({ row: i[z], index: z, held: !1 });
      return v >= f && E.push({ row: i[v], index: v, held: !0 }), E;
    });
    function bc(i) {
      return { position: "absolute", top: `${i * kt.value}px`, left: "0" };
    }
    const _c = W(() => ({
      height: `${ae.value.length * kt.value}px`,
      paddingTop: `${Ci.value.start * kt.value}px`
    }));
    function Sc(i) {
      Dr.value = i.currentTarget.scrollTop;
    }
    function xc(i) {
      const u = jn.value;
      if (!u || kr.value === null) return;
      const f = ae.value.findIndex((z) => z.id === i);
      if (f < 0) return;
      const v = f * kt.value + zn.value, E = v + kt.value;
      v < u.scrollTop + zn.value ? u.scrollTop = v - zn.value : E > u.scrollTop + u.clientHeight && (u.scrollTop = E - u.clientHeight), Dr.value = u.scrollTop;
    }
    function Uo(i, u = void 0) {
      i != null && (xc(i), Le(() => {
        var f;
        return (f = Kn.get(i)) == null ? void 0 : f.focus(u);
      }));
    }
    let vt = null;
    no(() => {
      Wo(), typeof ResizeObserver == "function" && (vt = new ResizeObserver(() => Wo()), jn.value && vt.observe(jn.value));
    }), rr(() => {
      vt == null || vt.disconnect(), vt = null;
    });
    function Rc(i) {
      jn.value = i ?? null, vt && (vt.disconnect(), i && (vt.observe(i), Le(Wo)));
    }
    const pn = /* @__PURE__ */ J(null), hn = /* @__PURE__ */ J(!0), Kn = /* @__PURE__ */ new Map();
    function Ut(i) {
      pn.value = i, hn.value = !0, M.value = !1;
    }
    function Cc(i, u) {
      u ? Kn.set(i, u) : Kn.delete(i);
    }
    const vn = W(() => {
      const i = ae.value;
      return i.length === 0 ? null : i.some((u) => u.id === pn.value) ? pn.value : i[0].id;
    });
    function Fe(i) {
      i != null && (Ut(i), Uo(i));
    }
    function Tr(i) {
      const u = ae.value;
      u.length !== 0 && Fe(u[Math.max(0, Math.min(i, u.length - 1))].id);
    }
    function Ii(i, u) {
      const f = ae.value;
      if (f.length === 0) return;
      const v = f[Math.max(0, Math.min(i, f.length - 1))], E = (u == null ? void 0 : u.shiftKey) && B.value && L.value !== "single";
      E && mt.value === null && (mt.value = vn.value), Fe(v.id), E && Ei(v, !1);
    }
    function Mc(i) {
      const u = ae.value;
      if (u.length === 0) return;
      const f = Math.max(
        0,
        u.findIndex((z) => z.id === vn.value)
      ), v = u[f];
      if (i.ctrlKey || i.metaKey) {
        const z = {
          a: "select-all",
          c: "copy",
          f: nr,
          v: "paste",
          x: "cut",
          z: i.shiftKey ? "redo" : "undo"
        }[i.key.toLowerCase()];
        if (z && Vn(z)) {
          i.preventDefault(), Xo(z);
          return;
        }
      }
      if (i.altKey) {
        const z = {
          ArrowUp: "move-up",
          ArrowDown: "move-down",
          ArrowLeft: "outdent",
          ArrowRight: "indent"
        }[i.key];
        if (z && Vn(z)) {
          i.preventDefault(), Xo(z);
          return;
        }
      }
      if (Br.value && (i.key === "ContextMenu" || i.key === "F10" && i.shiftKey)) {
        i.preventDefault(), hf(v);
        return;
      }
      const E = {
        Insert: i.shiftKey ? "new-file" : "new-folder",
        F2: "rename",
        Delete: "delete",
        Escape: "clear-selection"
      }[i.key];
      if (E && Vn(E)) {
        i.preventDefault(), Xo(E);
        return;
      }
      switch (i.key) {
        case "ArrowDown":
          i.preventDefault(), Ii(f + 1, i);
          break;
        case "ArrowUp":
          i.preventDefault(), f === 0 && r.value && !i.shiftKey ? C() : Ii(f - 1, i);
          break;
        case "ArrowRight":
          if (i.preventDefault(), !gn(v)) break;
          Ln(v) ? Tr(f + 1) : (Wt(v, !0), Fe(v.id));
          break;
        case "ArrowLeft":
          i.preventDefault(), !Ve.value && gn(v) && v.getIsExpanded() ? (Wt(v, !1), Fe(v.id)) : v.parentId && Fe(v.parentId);
          break;
        case "Home":
          i.preventDefault(), Tr(0);
          break;
        case "End":
          i.preventDefault(), Tr(u.length - 1);
          break;
        case "F2":
          if (c.value.length === 0) break;
          i.preventDefault(), qt(v.id, c.value[0]);
          break;
        case "Enter":
          i.preventDefault(), c.value.length > 0 ? qt(v.id, c.value[0]) : t.emitEvent("activate", { key: v.id });
          break;
        case " ":
          if (!B.value) break;
          i.preventDefault(), Di(v);
          break;
      }
    }
    const mt = /* @__PURE__ */ J(null);
    function Fr(i) {
      mt.value = i.id, U.value = {}, i.toggleSelected(!0, { selectChildren: !1 });
    }
    function Ei(i, u) {
      const f = ae.value, v = f.findIndex((de) => de.id === mt.value), E = f.findIndex((de) => de.id === i.id);
      if (E === -1) return;
      if (v === -1) {
        Fr(i);
        return;
      }
      u || (U.value = {});
      const [z, me] = v <= E ? [v, E] : [E, v];
      for (let de = z; de <= me; de += 1)
        f[de].toggleSelected(!0, { selectChildren: !1 });
    }
    const Ic = W(() => t.state.options.toggle_on_click === !0);
    function Ec(i) {
      const u = j(U.value);
      return u.length === 1 && u[0] === i.id;
    }
    function Ai() {
      U.value = {}, mt.value = null, hn.value = !1;
    }
    function Oi() {
      j(U.value).length === 0 && (hn.value = !1);
    }
    ye(
      () => j(U.value).length > 0,
      (i) => {
        i && (hn.value = !0);
      }
    );
    function Ac(i, u) {
      Ut(i.id);
      const f = !!(u != null && u.shiftKey || u != null && u.ctrlKey || u != null && u.metaKey);
      B.value && !f && Ic.value && Ec(i) ? Ai() : B.value && L.value !== "single" ? u != null && u.shiftKey ? Ei(i, u.ctrlKey || u.metaKey) : u != null && u.ctrlKey || u != null && u.metaKey ? (mt.value = i.id, Dc(i)) : Fr(i) : B.value && Fr(i), t.emitEvent("activate", { key: i.id });
    }
    function Oc(i) {
      Ut(i.id), !Ve.value && Wt(i, !i.getIsExpanded());
    }
    function Pi(i) {
      return Pt(i) === "all";
    }
    function Pc(i) {
      return Pt(i) === "some";
    }
    function Dc(i) {
      Ut(i.id), i.toggleSelected(void 0, { selectChildren: !1 }), Oi();
    }
    function Di(i) {
      Ut(i.id), i.toggleSelected(!Pi(i), {
        selectChildren: N.value,
        deselectParents: N.value
      }), Oi();
    }
    function kc(i) {
      Di(i), Fe(i.id);
    }
    const qo = {
      "new-folder": { icon: _0, label: "New folder", keys: "Insert", node: {} },
      "new-file": {
        icon: b0,
        label: "New file",
        keys: "Shift+Insert",
        node: { allow_children: !1 }
      },
      rename: { icon: R0, label: "Rename", keys: "F2" },
      delete: { icon: O0, label: "Delete", keys: "Delete" },
      undo: { icon: P0, label: "Undo", keys: "Control+Z" },
      redo: { icon: C0, label: "Redo", keys: "Control+Shift+Z" },
      cut: { icon: M0, label: "Cut", keys: "Control+X" },
      copy: { icon: w0, label: "Copy", keys: "Control+C" },
      paste: { icon: y0, label: "Paste", keys: "Control+V" },
      "move-up": { icon: ra, label: "Move up", keys: "Alt+ArrowUp" },
      "move-down": { icon: na, label: "Move down", keys: "Alt+ArrowDown" },
      outdent: { icon: S0, label: "Outdent", keys: "Alt+ArrowLeft" },
      indent: { icon: x0, label: "Indent", keys: "Alt+ArrowRight" },
      "expand-all": { icon: v0, label: "Expand all" },
      "collapse-all": { icon: m0, label: "Collapse all" },
      "select-all": { icon: A0, label: "Select all", keys: "Control+A" },
      "clear-selection": { icon: E0, label: "Clear selection", keys: "Escape" }
    }, Tc = [
      "undo",
      "redo",
      Ht,
      "new-folder",
      "new-file",
      "rename",
      "delete",
      Ht,
      "cut",
      "copy",
      "paste",
      Ht,
      "move-up",
      "move-down",
      "outdent",
      "indent",
      Ht,
      "expand-all",
      "collapse-all",
      Ht,
      "select-all",
      "clear-selection",
      nr
    ], Fc = [
      "new-folder",
      "new-file",
      Ht,
      "rename",
      "delete",
      Ht,
      "cut",
      "copy",
      "paste"
    ];
    function ki(i, u) {
      const f = i === !0 ? u : Array.isArray(i) ? i : [], v = [];
      return f.forEach((E, z) => {
        const me = typeof E == "string" ? {} : E || {}, de = typeof E == "string" ? E : me.id, tl = `${de}#${z}`;
        if (de === Ht || de === nr) {
          v.push({ uid: tl, id: de });
          return;
        }
        const Jn = qo[de];
        if (!Jn) return;
        const nl = me.label ?? Jn.label;
        v.push({
          uid: tl,
          id: de,
          label: nl,
          icon: K(me.icon) ?? Jn.icon,
          keys: Jn.keys,
          node: { title: nl, ...Jn.node ?? {}, ...me.node ?? {} }
        });
      }), v;
    }
    const Hr = W(() => ki(t.state.options.toolbar, Tc)), Go = W(
      () => ki(t.state.options.menu, Fc).filter((i) => i.id !== nr)
    ), Hc = W(() => Hr.value.length > 0), Lc = W(() => t.state.options.toolbar_label ?? "Tree actions"), Ti = W(() => t.state.options.search_label ?? "Search");
    function Fi(i) {
      return Hr.value.find((u) => u.id === i) ?? Go.value.find((u) => u.id === i) ?? null;
    }
    function Vn(i) {
      return Fi(i) !== null;
    }
    function Xo(i) {
      const u = Fi(i);
      u && ts(u);
    }
    const He = W(() => ae.value.find((i) => i.id === vn.value) ?? null);
    function jc(i) {
      return ae.value.filter((u) => (u.parentId ?? "") === (i.parentId ?? ""));
    }
    function Hi() {
      const i = He.value;
      if (!i) return [];
      const u = Yi(i), f = i.parentId ?? "";
      return u.every((E) => {
        var z;
        return (((z = xn(E)) == null ? void 0 : z.parentId) ?? "") === f;
      }) ? u : [i.id];
    }
    function Yo() {
      const i = He.value;
      if (!i) return [];
      if (!B.value || !i.getIsSelected()) return [i.id];
      const u = ae.value.filter((f) => f.getIsSelected()).map((f) => f.id);
      return u.length > 0 ? u : [i.id];
    }
    const Zo = W(() => {
      var i;
      return ((i = t.state.clipboard) == null ? void 0 : i.keys) ?? [];
    }), zc = W(() => {
      var u;
      const i = new Set(((u = t.state.clipboard) == null ? void 0 : u.mode) === "cut" ? Zo.value : []);
      return i.size === 0 || ae.value.forEach((f) => {
        f.parentId && i.has(f.parentId) && i.add(f.id);
      }), i;
    });
    function Bn(i) {
      const u = He.value;
      if (!u) return null;
      const f = new Set(Hi()), v = jc(u), E = v.map((me, de) => f.has(me.id) ? de : -1).filter((me) => me >= 0);
      if (E.length === 0) return null;
      let z = (i < 0 ? Math.min(...E) : Math.max(...E)) + i;
      for (; z >= 0 && z < v.length && f.has(v[z].id); ) z += i;
      return v[z] ?? null;
    }
    let qe = null;
    ye(
      () => t.state.view,
      () => {
        const i = qe;
        if (qe = null, !!i) {
          if (i.editor) {
            Le(() => {
              var u;
              return (u = yn.value) == null ? void 0 : u.focus();
            });
            return;
          }
          if (i.key !== void 0) {
            Fe(i.key);
            return;
          }
          Le(() => {
            i.index !== void 0 ? Tr(i.index) : i.pasted !== void 0 ? Vc(i.pasted) : Kc(i.added);
          });
        }
      }
    );
    function Kc(i) {
      const u = we.getCoreRowModel().flatRows.find((f) => !i.has(f.id));
      u && (Fe(u.id), B.value && (U.value = {}, mt.value = u.id, u.toggleSelected(!0, { selectChildren: !1 })), Vn("rename") && Le(() => $n(u.id, !0)));
    }
    function Vc(i) {
      const u = we.getCoreRowModel().flatRows.filter((E) => !i.has(E.id)), f = new Set(u.map((E) => E.id)), v = u.filter((E) => !f.has(E.parentId ?? ""));
      v.length !== 0 && (Fe(v[0].id), B.value && (U.value = {}, mt.value = v[0].id, v.forEach((E) => E.toggleSelected(!0, { selectChildren: !1 }))));
    }
    const yt = /* @__PURE__ */ J(null), Ye = /* @__PURE__ */ J(""), mn = /* @__PURE__ */ J(""), yn = /* @__PURE__ */ J(null), wn = /* @__PURE__ */ J(!1), wt = /* @__PURE__ */ J(null), Jo = /* @__PURE__ */ J(null), Qo = /* @__PURE__ */ J(null), Bc = W(() => t.state.options.extension_warning !== !1);
    function Li(i) {
      const u = String(i ?? ""), f = u.lastIndexOf(".");
      return f < 0 ? "" : u.slice(f + 1).toLowerCase();
    }
    function Nc(i, u) {
      return Bc.value && y(i, "allow_children") === !1 && Li(u) !== Li(i.title ?? "");
    }
    let Nn = null;
    function $n(i, u = !1) {
      const f = xn(i);
      f && (Nn = u ? i : null, ji(i, "", f.original.title ?? ""));
    }
    function qt(i, u) {
      const f = xn(i), v = d(u);
      if (!f || !v) return;
      Nn = null;
      const E = v.field ?? v.id, z = y(f.original, E);
      ji(i, u, z == null ? "" : String(z));
    }
    function ji(i, u, f) {
      wn.value = !1, mn.value = f, yt.value = i, Ye.value = u, t.setEditingKey(i), t.setEditingColumn(u), Le(() => {
        var v, E;
        (v = yn.value) == null || v.focus(), (E = yn.value) == null || E.select();
      });
    }
    function Wn() {
      Nn = null, wt.value = null, yt.value = null, Ye.value = "", wn.value = !1, t.setEditingKey(""), t.setEditingColumn("");
    }
    function zi(i, u) {
      return i === 0 ? "" : String(u.column.id);
    }
    function $c(i, u, f) {
      return yt.value === i.id && Ye.value === zi(u, f);
    }
    function Ki(i, u) {
      return i > 0 && c.value.includes(String(u.column.id));
    }
    function Wc(i, u, f) {
      Ki(u, f) && qt(i.id, String(f.column.id));
    }
    function Uc(i, u, f) {
      const v = i.original.title ?? i.id;
      if (u === 0) return `Rename ${v}`;
      const E = d(String(f.column.id));
      return `${(E == null ? void 0 : E.header) ?? f.column.id} of ${v}`;
    }
    function qc(i) {
      mn.value = i, wn.value = !1;
    }
    function Gc(i, u = null) {
      if (wt.value || yt.value !== i.id || Ye.value !== "") return;
      const f = mn.value.trim(), v = f.length > 0 && f !== (i.original.title ?? "");
      if (v && Nn !== i.id && Nc(i.original, f)) {
        wt.value = { key: i.id, title: f, previous: i.original.title ?? i.id }, Le(() => {
          var E;
          return (E = Qo.value) == null ? void 0 : E.focus();
        });
        return;
      }
      if (Vi(i, u), !v) {
        u === null && Fe(i.id);
        return;
      }
      qe = u === null ? { key: i.id } : { editor: !0 }, t.emitEvent("rename", { key: i.id, title: f });
    }
    function Xc(i, u, f = null) {
      if (yt.value !== i.id || Ye.value !== u) return;
      const v = mn.value, E = v !== Yc(i, u);
      if (Vi(i, f), !E) {
        f === null && Fe(i.id);
        return;
      }
      qe = f === null ? { key: i.id } : { editor: !0 }, t.emitEvent("edit", { key: i.id, column: u, value: v });
    }
    function Yc(i, u) {
      const f = d(u), v = y(i.original, (f == null ? void 0 : f.field) ?? u);
      return v == null ? "" : String(v);
    }
    function Vi(i, u) {
      u === null ? Wn() : u === "" ? $n(i.id) : qt(i.id, u);
    }
    function es(i, u = null) {
      Ye.value === "" ? Gc(i, u) : Xc(i, Ye.value, u);
    }
    function Zc(i, u, f) {
      yt.value === i.id && Ye.value === zi(u, f) && es(i);
    }
    function Bi() {
      const { key: i, title: u } = wt.value;
      wt.value = null, Wn(), qe = { key: i }, t.emitEvent("rename", { key: i, title: u });
    }
    function Ni() {
      wt.value = null, Le(() => {
        var i, u;
        (i = yn.value) == null || i.focus(), (u = yn.value) == null || u.select();
      });
    }
    function Jc(i) {
      var v;
      const u = i.key;
      if (u === "Escape" || u === "n" || u === "N") {
        i.preventDefault(), Ni();
        return;
      }
      if (u === "y" || u === "Y") {
        i.preventDefault(), Bi();
        return;
      }
      if (u !== "Tab" && u !== "ArrowLeft" && u !== "ArrowRight") return;
      i.preventDefault(), (v = (i.target === Jo.value ? Qo : Jo).value) == null || v.focus();
    }
    function Qc(i) {
      if (yt.value !== i.id) return;
      const u = Nn === i.id;
      if (Wn(), !u) {
        Fe(i.id);
        return;
      }
      qe = { index: ae.value.findIndex((f) => f.id === i.id) }, t.emitEvent("delete", { key: i.id, keys: [i.id] });
    }
    function ef() {
      return [...Vn("rename") ? [""] : [], ...c.value];
    }
    function tf(i, u) {
      const f = ef(), v = f.indexOf(i);
      if (v < 0) return null;
      const E = f[v + u];
      return E === void 0 ? null : E;
    }
    function nf(i, u) {
      if (u.key === "Enter")
        u.preventDefault(), es(i);
      else if (u.key === "Escape")
        u.preventDefault(), Ye.value === "" ? Qc(i) : (Wn(), Fe(i.id));
      else if (u.key === "Tab") {
        const f = tf(Ye.value, u.shiftKey ? -1 : 1);
        if (f === null) return;
        u.preventDefault(), es(i, f);
      }
    }
    ye(
      () => [t.state.editingKey || "", t.state.editingColumn || ""],
      ([i, u]) => {
        i === (yt.value || "") && u === Ye.value || (i ? u ? qt(i, u) : $n(i) : Wn());
      }
    );
    let $i = ((el = t.state.editError) == null ? void 0 : el.seq) ?? 0;
    ye(
      () => t.state.editError,
      (i) => {
        const u = (i == null ? void 0 : i.seq) ?? 0;
        if (!(i != null && i.key) || u === $i) return;
        $i = u;
        const f = String(i.column || "");
        d(f) && (qt(i.key, f), yt.value === i.key && (mn.value = i.value === void 0 || i.value === null ? "" : String(i.value), wn.value = !0));
      }
    ), no(() => {
      t.state.editingKey && (t.state.editingColumn ? qt(t.state.editingKey, t.state.editingColumn) : $n(t.state.editingKey));
    });
    function Lr(i, u) {
      const f = He.value;
      !f || !i || (qe = { key: f.id }, t.emitEvent("move", {
        key: f.id,
        keys: Hi(),
        position: u,
        anchorKey: i.id
      }));
    }
    function rf(i) {
      const u = He.value, f = u ? y(u.original, "allow_children") === !1 ? "after" : "child" : null;
      u && f === "child" && !Ve.value && Wt(u, !0), qe = { added: new Set(we.getCoreRowModel().flatRows.map((v) => v.id)) }, t.emitEvent("add", { anchorKey: (u == null ? void 0 : u.id) ?? null, position: f, node: i.node });
    }
    function of() {
      var u;
      const i = Yo();
      i.length !== 0 && (qe = { index: ae.value.findIndex((f) => {
        var v;
        return f.id === ((v = He.value) == null ? void 0 : v.id);
      }) }, t.emitEvent("delete", { key: ((u = He.value) == null ? void 0 : u.id) ?? null, keys: i }));
    }
    function sf(i) {
      qe = { index: ae.value.findIndex((u) => {
        var f;
        return u.id === ((f = He.value) == null ? void 0 : f.id);
      }) }, t.emitEvent(i, {});
    }
    function lf(i) {
      var f;
      const u = Yo();
      u.length !== 0 && t.emitEvent(i, { key: ((f = He.value) == null ? void 0 : f.id) ?? null, keys: u });
    }
    function af() {
      var v;
      const i = He.value, u = i ? y(i.original, "allow_children") === !1 ? "after" : "child" : null;
      i && u === "child" && !Ve.value && Wt(i, !0);
      const f = Zo.value;
      qe = ((v = t.state.clipboard) == null ? void 0 : v.mode) === "cut" ? { key: f[0] } : { pasted: new Set(we.getCoreRowModel().flatRows.map((E) => E.id)) }, t.emitEvent("paste", { anchorKey: (i == null ? void 0 : i.id) ?? null, position: u });
    }
    function Un(i) {
      var u;
      switch (i.id) {
        case "new-folder":
        case "new-file":
          return !0;
        case "rename":
          return He.value !== null;
        case "delete":
        case "cut":
        case "copy":
          return Yo().length > 0;
        case "paste":
          return Zo.value.length > 0;
        case "undo":
          return t.state.canUndo === !0;
        case "redo":
          return t.state.canRedo === !0;
        case "move-up":
        case "move-down":
          return !Re.value && Bn(i.id === "move-up" ? -1 : 1) !== null;
        case "indent": {
          const f = Bn(-1);
          return f !== null && y(f.original, "allow_children") !== !1;
        }
        case "outdent":
          return !!((u = He.value) != null && u.parentId);
        case "expand-all":
        case "collapse-all":
          return ae.value.length > 0 && !Ve.value;
        case "select-all":
          return ae.value.length > 0 && B.value && L.value !== "single";
        case "clear-selection":
          return B.value && j(U.value).length > 0;
        default:
          return !0;
      }
    }
    function Wi(i) {
      return i.keys ? i.keys.replace("Control", "Ctrl") : "";
    }
    function uf(i) {
      return i.keys ? `${i.label} (${Wi(i)})` : i.label;
    }
    function ts(i) {
      var u, f, v, E;
      if (Un(i))
        switch (i.id) {
          case "new-folder":
          case "new-file":
            rf(i);
            break;
          case "rename":
            $n(He.value.id);
            break;
          case "delete":
            of();
            break;
          case "undo":
          case "redo":
            sf(i.id);
            break;
          case "cut":
          case "copy":
            lf(i.id);
            break;
          case "paste":
            af();
            break;
          case "move-up":
            Lr(Bn(-1), "before");
            break;
          case "move-down":
            Lr(Bn(1), "after");
            break;
          case "indent": {
            const z = Bn(-1);
            z && !Ve.value && Wt(z, !0), Lr(z, "child");
            break;
          }
          case "outdent":
            Lr(xn((u = He.value) == null ? void 0 : u.parentId), "after");
            break;
          case "expand-all":
            we.toggleAllRowsExpanded(!0);
            break;
          case "collapse-all":
            we.toggleAllRowsExpanded(!1);
            break;
          case "select-all":
            U.value = Object.fromEntries(ae.value.map((z) => [z.id, !0])), mt.value = ((f = ae.value[0]) == null ? void 0 : f.id) ?? null;
            break;
          case "clear-selection":
            Ai();
            break;
          case nr:
            (v = ns.value) == null || v.focus(), (E = ns.value) == null || E.select();
            break;
        }
    }
    const ns = /* @__PURE__ */ J(null), rs = W(() => Hr.value.filter((i) => i.id in qo)), jr = /* @__PURE__ */ J(null), os = /* @__PURE__ */ new Map(), Ui = W(() => {
      const i = rs.value;
      return i.length === 0 ? null : i.some((u) => u.uid === jr.value) ? jr.value : i[0].uid;
    });
    function cf(i, u) {
      u ? os.set(i, u) : os.delete(i);
    }
    function zr(i) {
      const u = rs.value;
      if (u.length === 0) return;
      const f = u[Math.max(0, Math.min(i, u.length - 1))].uid;
      jr.value = f, Le(() => {
        var v;
        return (v = os.get(f)) == null ? void 0 : v.focus();
      });
    }
    function ff(i) {
      const u = rs.value, f = Math.max(
        0,
        u.findIndex((v) => v.uid === Ui.value)
      );
      switch (i.key) {
        case "ArrowRight":
          i.preventDefault(), zr(f + 1);
          break;
        case "ArrowLeft":
          i.preventDefault(), zr(f - 1);
          break;
        case "Home":
          i.preventDefault(), zr(0);
          break;
        case "End":
          i.preventDefault(), zr(u.length - 1);
          break;
      }
    }
    const qn = /* @__PURE__ */ J(!1), Kr = /* @__PURE__ */ J(null), Gn = /* @__PURE__ */ J({ left: 0, top: 0 }), Vr = /* @__PURE__ */ J(null), bn = /* @__PURE__ */ J(0), ss = /* @__PURE__ */ new Map(), Xn = W(() => Go.value.filter((i) => i.id in qo)), Br = W(() => Xn.value.length > 0), df = W(() => t.state.options.menu_label ?? "Row actions");
    function gf(i, u) {
      u ? ss.set(i, u) : ss.delete(i);
    }
    function qi(i) {
      return Xn.value.findIndex((u) => u.uid === i.uid);
    }
    function Gi(i, u, f) {
      if (!Br.value) return;
      pn.value !== i.id && Ut(i.id), Kr.value = i.id, Gn.value = { left: u, top: f };
      const v = Xn.value.findIndex((E) => Un(E));
      bn.value = Math.max(0, v), qn.value = !0, Le(vf);
    }
    function pf(i, u) {
      Br.value && (u.preventDefault(), B.value && !i.getIsSelected() && Fr(i), Gi(i, u.clientX, u.clientY));
    }
    function hf(i) {
      var f;
      const u = (f = Kn.get(i.id)) == null ? void 0 : f.getBoundingClientRect();
      Gi(i, u ? u.left + ht.value : Cn, u ? u.bottom : Cn);
    }
    function vf() {
      const i = Vr.value;
      if (!i) return;
      const u = i.getBoundingClientRect();
      let { left: f, top: v } = Gn.value;
      f + u.width > window.innerWidth - Cn && (f = Math.max(Cn, f - u.width)), v + u.height > window.innerHeight - Cn && (v = Math.max(Cn, v - u.height)), Gn.value = { left: f, top: v }, Yn(bn.value);
    }
    function Yn(i) {
      const u = Xn.value;
      if (u.length === 0) return;
      const f = Math.max(0, Math.min(i, u.length - 1));
      bn.value = f, Le(() => {
        var v;
        return (v = ss.get(u[f].uid)) == null ? void 0 : v.focus();
      });
    }
    function Nr(i = !0, u = void 0) {
      if (!qn.value) return;
      const f = Kr.value;
      qn.value = !1, Kr.value = null, i && f != null && Uo(f, u);
    }
    function mf(i) {
      if (!Un(i)) return;
      const u = Kr.value;
      Nr(!1), Fe(u), ts(i);
    }
    function yf(i) {
      const u = bn.value;
      switch (i.key) {
        case "ArrowDown":
          i.preventDefault(), Yn(u + 1);
          break;
        case "ArrowUp":
          i.preventDefault(), Yn(u - 1);
          break;
        case "Home":
          i.preventDefault(), Yn(0);
          break;
        case "End":
          i.preventDefault(), Yn(Xn.value.length - 1);
          break;
        case "Escape":
        case "Tab":
          i.preventDefault(), Nr();
          break;
      }
    }
    function is(i) {
      Vr.value && i.composedPath().includes(Vr.value) || Nr(!1);
    }
    function _n() {
      Nr(!0, { preventScroll: !0 });
    }
    ye(qn, (i) => {
      i ? (document.addEventListener("pointerdown", is, !0), window.addEventListener("resize", _n), window.addEventListener("scroll", _n, !0)) : (document.removeEventListener("pointerdown", is, !0), window.removeEventListener("resize", _n), window.removeEventListener("scroll", _n, !0));
    }), rr(() => {
      document.removeEventListener("pointerdown", is, !0), window.removeEventListener("resize", _n), window.removeEventListener("scroll", _n, !0);
    });
    const wf = ["reorder-above", "reorder-below", "make-child", "reparent"], ls = W(() => t.state.options.enable_dnd === !0), as = W(() => String(t.state.options.transfer_group || "")), Sn = W(() => String(t.state.tableId || "")), Xi = /* @__PURE__ */ J([]), $r = /* @__PURE__ */ J(null);
    function xn(i) {
      return ae.value.find((u) => u.id === i) ?? null;
    }
    function bf(i, u) {
      let f = i;
      for (; f; ) {
        if (u.includes(f.id)) return !0;
        f = f.getParentRow();
      }
      return !1;
    }
    function Yi(i) {
      if (!B.value || !i.getIsSelected()) return [i.id];
      const u = /* @__PURE__ */ new Set();
      for (let v = i.getParentRow(); v; v = v.getParentRow()) u.add(v.id);
      const f = ae.value.filter((v) => v.getIsSelected() && !u.has(v.id)).map((v) => v.id);
      return f.length > 1 ? f : [i.id];
    }
    function _f(i, u, f) {
      if (!f && bf(i, u)) return wf;
      const v = Re.value ? ["reorder-above", "reorder-below"] : [];
      return y(i.original, "allow_children") === !1 && v.push("make-child"), v;
    }
    function Sf(i) {
      if (gn(i) && Ln(i)) return "expanded";
      const u = Ie(i);
      return u[u.length - 1] === i.id ? "last-in-group" : "standard";
    }
    let us = null, Zn = null;
    function cs() {
      Zn && clearTimeout(Zn), Zn = null, us = null;
    }
    function xf(i, u) {
      if (us === i || (cs(), !u || u.type === "instruction-blocked")) return;
      const f = xn(i);
      !f || !f.getCanExpand() || f.getIsExpanded() || (us = i, Zn = setTimeout(() => {
        Zn = null;
        const v = xn(i);
        v && v.getCanExpand() && !v.getIsExpanded() && Wt(v, !0);
      }, dy));
    }
    function Rf() {
      $r.value = null, cs();
    }
    const Zi = /* @__PURE__ */ J(null);
    function Cf() {
      let i = Zi.value;
      if (!i) return null;
      let u = i.getRootNode();
      for (; u.host; )
        i = u.host, u = i.getRootNode();
      return i;
    }
    function Wr(i) {
      for (const { row: u } of Mi.value) {
        const f = Kn.get(u.id);
        if (!f) continue;
        const v = f.getBoundingClientRect();
        if (i.clientX >= v.left && i.clientX < v.right && i.clientY >= v.top && i.clientY < v.bottom)
          return { row: u, element: f, rect: v };
      }
      return null;
    }
    function Mf(i, u) {
      const f = ".pnl-tst-check, .pnl-tst-twisty, .pnl-tst-edit";
      for (const v of i.element.querySelectorAll(f)) {
        const E = v.getBoundingClientRect();
        if (u.clientX >= E.left && u.clientX < E.right && u.clientY >= E.top && u.clientY < E.bottom)
          return !0;
      }
      return !1;
    }
    const If = {
      id: () => Sn.value,
      // Anything outside a row (the header, the empty space below the last row) is
      // not a drag handle, and neither is a row control.
      canDragFrom(i) {
        const u = Wr(i);
        return u !== null && !Mf(u, i);
      },
      dragData(i) {
        const u = Wr(i);
        return u ? {
          type: Pn,
          group: as.value,
          sourceId: Sn.value,
          key: u.row.id,
          keys: Yi(u.row)
        } : null;
      },
      // The registered element is the host, so the default preview would be a
      // snapshot of the whole layout. Point it at the row being dragged, offset so
      // the preview stays under the cursor where it was grabbed.
      preview(i, u) {
        const f = Wr(i);
        return f ? (u(f.element, i.clientX - f.rect.left, i.clientY - f.rect.top), !0) : !1;
      },
      setDragging(i) {
        Xi.value = i;
      },
      // Our own rows always. Another pane's only when both name the same group, so a
      // table that opted into nothing shows no drop state at all rather than
      // accepting a drag Python is bound to reject.
      dropData(i, u) {
        const f = Wr(i);
        if (!f) return null;
        const v = u.sourceId !== Sn.value;
        if (v && !(as.value && u.group === as.value))
          return { type: Pn, key: null, paneId: Sn.value };
        const E = { type: Pn, key: f.row.id, paneId: Sn.value };
        return Zv(E, {
          element: f.element,
          input: i,
          currentLevel: f.row.depth,
          indentPerLevel: ht.value,
          mode: Sf(f.row),
          block: _f(f.row, u.keys ?? [], v)
        });
      },
      showDrop(i, u) {
        $r.value = { key: i, instruction: u }, xf(i, u);
      },
      clearDrop: Rf,
      drop(i, u, f, v) {
        const E = i.keys ?? [];
        if (E.length === 0) return;
        const z = {
          targetKey: u,
          instruction: f.type,
          desiredLevel: f.desiredLevel ?? f.currentLevel
        };
        if (i.sourceId === Sn.value) {
          if (E.includes(u)) return;
          t.emitEvent("move", { key: i.key, keys: E, ...z });
          return;
        }
        qe = { pasted: new Set(we.getCoreRowModel().flatRows.map((me) => me.id)) }, t.emitEvent("transfer", {
          keys: E,
          sourceId: i.sourceId,
          copy: !!(v != null && v.ctrlKey || v != null && v.altKey),
          ...z
        });
      }
    };
    let Tt = null;
    function Ji() {
      Tt == null || Tt(), Tt = null;
      const i = Cf();
      !i || !ls.value || (Tt = Um(i, If));
    }
    no(Ji), ye(ls, Ji), rr(() => {
      cs(), Tt == null || Tt();
    });
    function fs(i) {
      var u;
      return ((u = $r.value) == null ? void 0 : u.key) === i.id ? $r.value.instruction : null;
    }
    function Ef(i) {
      const u = y(i.original, "class");
      return typeof u == "string" ? u : null;
    }
    function Af(i) {
      const u = fs(i);
      return {
        "pnl-tst-row--draggable": ls.value,
        "pnl-tst-row--dragging": Xi.value.includes(i.id),
        "pnl-tst-row--blocked": (u == null ? void 0 : u.type) === "instruction-blocked",
        "pnl-tst-row--child-target": (u == null ? void 0 : u.type) === "make-child"
      };
    }
    function Qi(i) {
      const u = fs(i);
      return u ? u.type === "reorder-above" ? "pnl-tst-dropline--above" : u.type === "reorder-below" || u.type === "reparent" ? "pnl-tst-dropline--below" : null : null;
    }
    function Of(i) {
      const u = fs(i);
      return u ? { insetInlineStart: `${(u.type === "reparent" ? u.desiredLevel : u.currentLevel) * u.indentPerLevel}px` } : null;
    }
    return (i, u) => (re(), oe("div", {
      ref_key: "rootElement",
      ref: Zi,
      class: "pnl-tst"
    }, [
      Hc.value ? (re(), oe("div", {
        key: 0,
        class: "pnl-tst-toolbar",
        role: "toolbar",
        "aria-orientation": "horizontal",
        "aria-label": Lc.value
      }, [
        (re(!0), oe(Ee, null, er(Hr.value, (f) => (re(), oe(Ee, {
          key: f.uid
        }, [
          f.id === "|" ? (re(), oe("span", k0)) : f.id === "search" ? (re(), oe("label", T0, [
            Ce("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: en(I0)
            }, null, 8, F0),
            Ce("input", {
              ref_for: !0,
              ref: (v) => ns.value = v,
              type: "search",
              value: ze.value,
              "aria-label": Ti.value,
              placeholder: Ti.value,
              onInput: u[0] || (u[0] = (v) => Vt(v.target.value))
            }, null, 40, H0)
          ])) : (re(), oe("button", {
            key: 2,
            ref_for: !0,
            ref: (v) => cf(f.uid, v),
            type: "button",
            class: "pnl-tst-tbtn",
            "aria-label": f.label,
            "aria-keyshortcuts": f.keys,
            "aria-disabled": !Un(f),
            title: uf(f),
            tabindex: f.uid === Ui.value ? 0 : -1,
            onClick: (v) => ts(f),
            onFocus: (v) => jr.value = f.uid,
            onKeydown: ff
          }, [
            Ce("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: f.icon
            }, null, 8, j0)
          ], 40, L0))
        ], 64))), 128))
      ], 8, D0)) : Ze("", !0),
      ae.value.length === 0 ? (re(), oe("div", z0, Lt(p.value), 1)) : (re(), oe("div", {
        key: 2,
        ref: Rc,
        class: Je(["pnl-tst-grid", { "pnl-tst-grid--resizing": se.value !== null }]),
        role: "treegrid",
        "aria-label": xi.value,
        "aria-colcount": We.value.length,
        "aria-rowcount": b.value,
        style: it(mc.value),
        onKeydown: Mc,
        onScroll: Sc
      }, [
        r.value ? (re(), oe("div", {
          key: 0,
          ref_key: "headElement",
          ref: Ri,
          class: "pnl-tst-head",
          role: "rowgroup"
        }, [
          Ce("div", V0, [
            (re(!0), oe(Ee, null, er(We.value, (f, v) => (re(), oe("div", {
              key: f.id,
              ref_for: !0,
              ref: (E) => T(f.column.id, E),
              class: Je(["pnl-tst-hcell", { "pnl-tst-hcell--sortable": F(f) }]),
              role: "columnheader",
              "aria-colindex": v + 1,
              "aria-sort": V(f),
              "aria-keyshortcuts": ne(f) ? "Alt+ArrowLeft Alt+ArrowRight Alt+Home" : void 0,
              tabindex: M.value && f.column.id === k.value ? 0 : -1,
              style: it($o(v)),
              onClick: (E) => fe(f),
              onFocus: (E) => x.value = f.column.id,
              onKeydown: (E) => Bt(f, E)
            }, [
              Ce("span", N0, Lt(f.column.columnDef.header), 1),
              q(f) ? (re(), oe("span", {
                key: 0,
                class: "pnl-tst-sortind",
                "aria-hidden": "true",
                innerHTML: q(f)
              }, null, 8, $0)) : Ze("", !0),
              ne(f) ? (re(), oe("span", {
                key: 1,
                class: Je(["pnl-tst-resize", { "pnl-tst-resize--active": se.value === f.column.id }]),
                "aria-hidden": "true",
                onClick: u[1] || (u[1] = Yt(() => {
                }, ["stop"])),
                onDblclick: Yt((E) => Ne(f), ["stop"]),
                onMousedown: (E) => xe(f, E),
                onTouchstart: (E) => xe(f, E)
              }, null, 42, W0)) : Ze("", !0)
            ], 46, B0))), 128))
          ])
        ], 512)) : Ze("", !0),
        Ce("div", {
          class: "pnl-tst-body",
          role: "rowgroup",
          style: it(_c.value)
        }, [
          (re(!0), oe(Ee, null, er(Mi.value, ({ row: f, index: v, held: E }) => (re(), oe("div", {
            key: f.id,
            ref_for: !0,
            ref: (z) => Cc(f.id, z),
            class: Je(["pnl-tst-row", [
              Af(f),
              Ef(f),
              {
                "pnl-tst-row--active": hn.value && f.id === pn.value,
                "pnl-tst-row--quiet": !hn.value && f.id === pn.value,
                "pnl-tst-row--cut": zc.value.has(f.id)
              }
            ]]),
            style: it(E ? bc(v) : void 0),
            role: "row",
            "aria-level": f.depth + 1,
            "aria-posinset": Ue(f),
            "aria-setsize": Pr(f),
            "aria-rowindex": v + m.value,
            "aria-expanded": gn(f) ? Ln(f) : void 0,
            "aria-busy": No(f) ? "true" : void 0,
            "aria-selected": B.value ? f.getIsSelected() : void 0,
            "aria-haspopup": Br.value ? "menu" : void 0,
            tabindex: !M.value && f.id === vn.value ? 0 : -1,
            onClick: (z) => Ac(f, z),
            onContextmenu: (z) => pf(f, z),
            onFocus: (z) => Ut(f.id)
          }, [
            Qi(f) ? (re(), oe("span", {
              key: 0,
              class: Je(["pnl-tst-dropline", Qi(f)]),
              style: it(Of(f)),
              "aria-hidden": "true"
            }, null, 6)) : Ze("", !0),
            (re(!0), oe(Ee, null, er(f.getAllCells(), (z, me) => (re(), oe("div", {
              key: z.id,
              class: Je(["pnl-tst-cell", {
                "pnl-tst-cell--tree": me === 0,
                "pnl-tst-cell--editable": Ki(me, z)
              }]),
              role: "gridcell",
              "aria-colindex": me + 1,
              style: it(me === 0 ? wc(f) : $o(me)),
              onDblclick: (de) => Wc(f, me, z)
            }, [
              me === 0 ? (re(), oe(Ee, { key: 0 }, [
                gn(f) ? (re(), oe("span", {
                  key: 0,
                  class: Je(["pnl-tst-twisty", {
                    "pnl-tst-twisty--open": Ln(f),
                    "pnl-tst-twisty--busy": No(f)
                  }]),
                  "aria-hidden": "true",
                  onClick: Yt((de) => Oc(f), ["stop"])
                }, [...u[5] || (u[5] = [
                  Ce("svg", {
                    viewBox: "0 0 16 16",
                    width: "12",
                    height: "12",
                    focusable: "false"
                  }, [
                    Ce("path", {
                      d: "M6 3.5 10.5 8 6 12.5",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "1.6"
                    })
                  ], -1)
                ])], 10, G0)) : (re(), oe("span", X0)),
                H.value ? (re(), oe("input", {
                  key: 2,
                  class: "pnl-tst-check",
                  type: "checkbox",
                  tabindex: "-1",
                  checked: Pi(f),
                  ".indeterminate": Pc(f),
                  "aria-label": `Select ${f.original.title ?? f.id}`,
                  onClick: Yt((de) => kc(f), ["stop"])
                }, null, 40, Y0)) : Ze("", !0),
                _(f) ? (re(), oe("span", {
                  key: 3,
                  class: "pnl-tst-icon",
                  "aria-hidden": "true",
                  innerHTML: _(f)
                }, null, 8, Z0)) : Ze("", !0)
              ], 64)) : Ze("", !0),
              $c(f, me, z) ? (re(), oe("input", {
                key: 1,
                ref_for: !0,
                ref: (de) => yn.value = de,
                class: Je(["pnl-tst-edit", { "pnl-tst-edit--invalid": wn.value }]),
                type: "text",
                value: mn.value,
                "aria-label": Uc(f, me, z),
                "aria-invalid": wn.value ? "true" : void 0,
                onInput: u[2] || (u[2] = (de) => qc(de.target.value)),
                onClick: u[3] || (u[3] = Yt(() => {
                }, ["stop"])),
                onDblclick: u[4] || (u[4] = Yt(() => {
                }, ["stop"])),
                onKeydown: Yt((de) => nf(f, de), ["stop"]),
                onBlur: (de) => Zc(f, me, z)
              }, null, 42, J0)) : (re(), oe("span", Q0, Lt(z.getValue()), 1))
            ], 46, q0))), 128))
          ], 46, U0))), 128))
        ], 4)
      ], 46, K0)),
      wt.value ? (re(), oe("div", ey, [
        Ce("div", {
          class: "pnl-tst-dialog",
          role: "alertdialog",
          "aria-modal": "true",
          "aria-label": "Rename",
          "aria-describedby": "pnl-tst-confirm-message",
          onKeydown: Jc
        }, [
          Ce("p", ty, " Rename " + Lt(wt.value.previous) + " to " + Lt(wt.value.title) + "? If you change a file name extension, the file might become unusable. ", 1),
          Ce("div", ny, [
            Ce("button", {
              ref_key: "confirmYesButton",
              ref: Jo,
              type: "button",
              class: "pnl-tst-dbtn",
              "aria-keyshortcuts": "Y",
              onClick: Bi
            }, [...u[6] || (u[6] = [
              Ce("span", { class: "pnl-tst-dkey" }, "Y", -1),
              Vs("es ", -1)
            ])], 512),
            Ce("button", {
              ref_key: "confirmNoButton",
              ref: Qo,
              type: "button",
              class: "pnl-tst-dbtn",
              "aria-keyshortcuts": "N",
              onClick: Ni
            }, [...u[7] || (u[7] = [
              Ce("span", { class: "pnl-tst-dkey" }, "N", -1),
              Vs("o ", -1)
            ])], 512)
          ])
        ], 32)
      ])) : Ze("", !0),
      qn.value ? (re(), oe("div", {
        key: 4,
        ref_key: "menuElement",
        ref: Vr,
        class: "pnl-tst-menu",
        role: "menu",
        "aria-orientation": "vertical",
        "aria-label": df.value,
        style: it({ left: `${Gn.value.left}px`, top: `${Gn.value.top}px` }),
        onKeydown: yf
      }, [
        (re(!0), oe(Ee, null, er(Go.value, (f) => (re(), oe(Ee, {
          key: f.uid
        }, [
          f.id === "|" ? (re(), oe("div", oy)) : (re(), oe("button", {
            key: 1,
            ref_for: !0,
            ref: (v) => gf(f.uid, v),
            type: "button",
            class: "pnl-tst-mitem",
            role: "menuitem",
            "aria-keyshortcuts": f.keys,
            "aria-disabled": !Un(f),
            tabindex: qi(f) === bn.value ? 0 : -1,
            onClick: (v) => mf(f),
            onFocus: (v) => bn.value = qi(f)
          }, [
            Ce("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: f.icon
            }, null, 8, iy),
            Ce("span", ly, Lt(f.label), 1),
            f.keys ? (re(), oe("span", ay, Lt(Wi(f)), 1)) : Ze("", !0)
          ], 40, sy))
        ], 64))), 128))
      ], 44, ry)) : Ze("", !0)
    ], 512));
  }
};
function py({ model: e, el: t }) {
  t.style.display = "block", t.style.width = "100%", t.style.height = "100%";
  const n = document.createElement("div");
  n.className = "pnl-tst-root", n.style.height = "100%", t.append(n);
  const r = /* @__PURE__ */ Mo({
    // What this side holds, which is the whole tree unless `options.prune` asked
    // Python to send the opened branches only. The tree Python owns is not on the
    // wire at all, so there is nothing here to mistake for it.
    view: e.get("_view") || [],
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
    // The other half of the editor's address: a key names a row, this names which
    // of its cells, and "" means the tree column, which is the title.
    editingColumn: e.get("editing_column") || "",
    // The last edit Python refused. A refusal changes no tree, so nothing else
    // would ever reach this side to say the value did not land.
    editError: e.get("_edit_error") || {},
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
  let l = 0;
  const a = (_, D) => {
    l += 1, s.push({ seq: l, event_name: _, event_params: D }), s.length > o && s.shift(), e.set("_event_data", { events: [...s], timestamp: Date.now() }), e.save_changes();
  }, c = (_, D) => _.length === D.length && _.every((L, B) => L === D[B]), d = (_) => (D) => {
    const L = [...e.get(_) || []].sort();
    c(L, D) || (e.set(_, D), e.save_changes());
  }, g = d("expanded_keys"), h = d("selected_keys"), y = (_) => {
    (e.get("filter_text") || "") !== _ && (e.set("filter_text", _), e.save_changes());
  }, w = (_) => {
    (e.get("editing_key") || "") !== _ && (e.set("editing_key", _), e.save_changes());
  }, O = (_) => {
    (e.get("editing_column") || "") !== _ && (e.set("editing_column", _), e.save_changes());
  }, R = (_, D) => _.length === D.length && _.every((L, B) => L.id === D[B].id && !!L.desc == !!D[B].desc), A = (_) => {
    R(e.get("sorting") || [], _) || (e.set("sorting", _), e.save_changes());
  }, j = (_, D) => {
    const L = Object.keys(_);
    return L.length === Object.keys(D).length && L.every((B) => _[B] === D[B]);
  }, K = Zg(gy, {
    state: r,
    emitEvent: a,
    setExpandedKeys: g,
    setSelectedKeys: h,
    setFilterText: y,
    setEditingKey: w,
    setEditingColumn: O,
    setSorting: A,
    setColumnWidths: (_) => {
      j(e.get("column_widths") || {}, _) || (e.set("column_widths", _), e.save_changes());
    }
  });
  return K.mount(n), e.on("change:_view", () => {
    r.view = e.get("_view") || [];
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
  }), e.on("change:editing_column", () => {
    r.editingColumn = e.get("editing_column") || "";
  }), e.on("change:_edit_error", () => {
    r.editError = e.get("_edit_error") || {};
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
    K.unmount();
  };
}
export {
  py as render
};

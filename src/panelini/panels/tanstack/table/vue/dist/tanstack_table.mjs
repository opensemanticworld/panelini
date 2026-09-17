/**
* @vue/shared v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function ps(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const ye = {}, Dn = [], pt = () => {
}, Oa = () => !1, Ao = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Do = (e) => e.startsWith("onUpdate:"), Te = Object.assign, hs = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, cd = Object.prototype.hasOwnProperty, ce = (e, t) => cd.call(e, t), G = Array.isArray, Wt = (e) => Ir(e) === "[object Map]", ho = (e) => Ir(e) === "[object Set]", Cl = (e) => Ir(e) === "[object Date]", Z = (e) => typeof e == "function", Se = (e) => typeof e == "string", ht = (e) => typeof e == "symbol", pe = (e) => e !== null && typeof e == "object", Pa = (e) => (pe(e) || Z(e)) && Z(e.then) && Z(e.catch), Ta = Object.prototype.toString, Ir = (e) => Ta.call(e), fd = (e) => Ir(e).slice(8, -1), Fa = (e) => Ir(e) === "[object Object]", vs = (e) => Se(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, fr = /* @__PURE__ */ ps(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), ko = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, dd = /-\w/g, tt = ko(
  (e) => e.replace(dd, (t) => t.slice(1).toUpperCase())
), gd = /\B([A-Z])/g, cn = ko(
  (e) => e.replace(gd, "-$1").toLowerCase()
), Ha = ko((e) => e.charAt(0).toUpperCase() + e.slice(1)), Mi = ko(
  (e) => e ? `on${Ha(e)}` : ""
), dt = (e, t) => !Object.is(e, t), Ei = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, La = (e, t, n, r = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: r,
    value: n
  });
}, pd = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Ml;
const Oo = () => Ml || (Ml = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function ut(e) {
  if (G(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], o = Se(r) ? yd(r) : ut(r);
      if (o)
        for (const s in o)
          t[s] = o[s];
    }
    return t;
  } else if (Se(e) || pe(e))
    return e;
}
const hd = /;(?![^(]*\))/g, vd = /:([^]+)/, md = /\/\*[^]*?\*\//g;
function yd(e) {
  const t = {};
  return e.replace(md, "").split(hd).forEach((n) => {
    if (n) {
      const r = n.split(vd);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function Ue(e) {
  let t = "";
  if (Se(e))
    t = e;
  else if (G(e))
    for (let n = 0; n < e.length; n++) {
      const r = Ue(e[n]);
      r && (t += r + " ");
    }
  else if (pe(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const wd = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", bd = /* @__PURE__ */ ps(wd);
function ja(e) {
  return !!e || e === "";
}
function _d(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let r = 0; n && r < e.length; r++)
    n = Po(e[r], t[r]);
  return n;
}
function El(e, t) {
  if (e.size !== t.size) return !1;
  const n = Array.from(t), r = new Uint8Array(n.length);
  for (const o of e) {
    let s = -1;
    for (let l = 0; l < n.length; l++)
      if (!r[l] && Po(o, n[l])) {
        s = l;
        break;
      }
    if (s < 0) return !1;
    r[s] = 1;
  }
  return !0;
}
function Po(e, t) {
  if (e === t) return !0;
  let n = Cl(e), r = Cl(t);
  if (n || r)
    return n && r ? e.getTime() === t.getTime() : !1;
  if (n = ht(e), r = ht(t), n || r)
    return e === t;
  if (n = G(e), r = G(t), n || r)
    return n && r ? _d(e, t) : !1;
  if (n = pe(e), r = pe(t), n || r) {
    if (!n || !r)
      return !1;
    if (n = Wt(e), r = Wt(t), n || r || (n = ho(e), r = ho(t), n || r))
      return n && r ? El(e, t) : !1;
    const o = Object.keys(e).length, s = Object.keys(t).length;
    if (o !== s)
      return !1;
    for (const l in e) {
      const u = e.hasOwnProperty(l), c = t.hasOwnProperty(l);
      if (u && !c || !u && c || !Po(e[l], t[l]))
        return !1;
    }
  }
  return String(e) === String(t);
}
const za = (e) => !!(e && e.__v_isRef === !0), Rt = (e) => Se(e) ? e : e == null ? "" : G(e) || pe(e) && (e.toString === Ta || !Z(e.toString)) ? za(e) ? Rt(e.value) : JSON.stringify(e, Ka, 2) : String(e), Ka = (e, t) => za(t) ? Ka(e, t.value) : Wt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [r, o], s) => (n[Ii(r, s) + " =>"] = o, n),
    {}
  )
} : ho(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Ii(n))
} : ht(t) ? Ii(t) : pe(t) && !G(t) && !Fa(t) ? String(t) : t, Ii = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    ht(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Ie;
class Sd {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && Ie && (Ie.active ? (this.parent = Ie, this.index = (Ie.scopes || (Ie.scopes = [])).push(
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
      const n = Ie;
      try {
        return Ie = this, t();
      } finally {
        Ie = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Ie, Ie = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (Ie === this)
        Ie = this.prevScope;
      else {
        let t = Ie;
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
function Va() {
  return Ie;
}
function xd(e, t = !1) {
  Ie && Ie.cleanups.push(e);
}
let me;
const Ai = /* @__PURE__ */ new WeakSet();
class Ba {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Ie && (Ie.active ? Ie.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Ai.has(this) && (Ai.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || $a(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Il(this), Wa(this);
    const t = me, n = nt;
    me = this, nt = !0;
    try {
      return this.fn();
    } finally {
      Ua(this), me = t, nt = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        ws(t);
      this.deps = this.depsTail = void 0, Il(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Ai.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Ui(this) && this.run();
  }
  get dirty() {
    return Ui(this);
  }
}
let Na = 0, dr, gr;
function $a(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = gr, gr = e;
    return;
  }
  e.next = dr, dr = e;
}
function ms() {
  Na++;
}
function ys() {
  if (--Na > 0)
    return;
  if (gr) {
    let t = gr;
    for (gr = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; dr; ) {
    let t = dr;
    for (dr = void 0; t; ) {
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
function Wa(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Ua(e) {
  let t, n = e.depsTail, r = n;
  for (; r; ) {
    const o = r.prevDep;
    r.version === -1 ? (r === n && (n = o), ws(r), Rd(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = o;
  }
  e.deps = t, e.depsTail = n;
}
function Ui(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (qa(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function qa(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === wr) || (e.globalVersion = wr, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Ui(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = me, r = nt;
  me = e, nt = !0;
  try {
    Wa(e);
    const o = e.fn(e._value);
    (t.version === 0 || dt(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    me = n, nt = r, Ua(e), e.flags &= -3;
  }
}
function ws(e, t = !1) {
  const { dep: n, prevSub: r, nextSub: o } = e;
  if (r && (r.nextSub = o, e.prevSub = void 0), o && (o.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
    n.computed.flags &= -5;
    for (let s = n.computed.deps; s; s = s.nextDep)
      ws(s, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Rd(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let nt = !0;
const Ga = [];
function At() {
  Ga.push(nt), nt = !1;
}
function Dt() {
  const e = Ga.pop();
  nt = e === void 0 ? !0 : e;
}
function Il(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = me;
    me = void 0;
    try {
      t();
    } finally {
      me = n;
    }
  }
}
let wr = 0;
class Cd {
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
    if (!me || !nt || me === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== me)
      n = this.activeLink = new Cd(me, this), me.deps ? (n.prevDep = me.depsTail, me.depsTail.nextDep = n, me.depsTail = n) : me.deps = me.depsTail = n, Xa(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const r = n.nextDep;
      r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = me.depsTail, n.nextDep = void 0, me.depsTail.nextDep = n, me.depsTail = n, me.deps === n && (me.deps = r);
    }
    return n;
  }
  trigger(t) {
    this.version++, wr++, this.notify(t);
  }
  notify(t) {
    ms();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      ys();
    }
  }
}
function Xa(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let r = t.deps; r; r = r.nextDep)
        Xa(r);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const qi = /* @__PURE__ */ new WeakMap(), rn = /* @__PURE__ */ Symbol(
  ""
), Gi = /* @__PURE__ */ Symbol(
  ""
), br = /* @__PURE__ */ Symbol(
  ""
);
function Oe(e, t, n) {
  if (nt && me) {
    let r = qi.get(e);
    r || qi.set(e, r = /* @__PURE__ */ new Map());
    let o = r.get(n);
    o || (r.set(n, o = new bs()), o.map = r, o.key = n), o.track();
  }
}
function Et(e, t, n, r, o, s) {
  const l = qi.get(e);
  if (!l) {
    wr++;
    return;
  }
  const u = (c) => {
    c && c.trigger();
  };
  if (ms(), t === "clear")
    l.forEach(u);
  else {
    const c = G(e), d = c && vs(n);
    if (c && n === "length") {
      const g = Number(r);
      l.forEach((v, y) => {
        (y === "length" || y === br || !ht(y) && y >= g) && u(v);
      });
    } else
      switch ((n !== void 0 || l.has(void 0)) && u(l.get(n)), d && u(l.get(br)), t) {
        case "add":
          c ? d && u(l.get("length")) : (u(l.get(rn)), Wt(e) && u(l.get(Gi)));
          break;
        case "delete":
          c || (u(l.get(rn)), Wt(e) && u(l.get(Gi)));
          break;
        case "set":
          Wt(e) && u(l.get(rn));
          break;
      }
  }
  ys();
}
function Cn(e) {
  const t = /* @__PURE__ */ ue(e);
  return t === e ? t : (Oe(t, "iterate", br), /* @__PURE__ */ Ye(e) ? t : t.map(rt));
}
function To(e) {
  return Oe(e = /* @__PURE__ */ ue(e), "iterate", br), e;
}
function ct(e, t) {
  return /* @__PURE__ */ kt(e) ? Tn(/* @__PURE__ */ on(e) ? rt(t) : t) : rt(t);
}
const Md = {
  __proto__: null,
  [Symbol.iterator]() {
    return Di(this, Symbol.iterator, (e) => ct(this, e));
  },
  concat(...e) {
    return Cn(this).concat(
      ...e.map((t) => G(t) ? Cn(t) : t)
    );
  },
  entries() {
    return Di(this, "entries", (e) => (e[1] = ct(this, e[1]), e));
  },
  every(e, t) {
    return St(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return St(
      this,
      "filter",
      e,
      t,
      (n) => n.map((r) => ct(this, r)),
      arguments
    );
  },
  find(e, t) {
    return St(
      this,
      "find",
      e,
      t,
      (n) => ct(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return St(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return St(
      this,
      "findLast",
      e,
      t,
      (n) => ct(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return St(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return St(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return ki(this, "includes", e);
  },
  indexOf(...e) {
    return ki(this, "indexOf", e);
  },
  join(e) {
    return Cn(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return ki(this, "lastIndexOf", e);
  },
  map(e, t) {
    return St(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return ir(this, "pop");
  },
  push(...e) {
    return ir(this, "push", e);
  },
  reduce(e, ...t) {
    return Al(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Al(this, "reduceRight", e, t);
  },
  shift() {
    return ir(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return St(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return ir(this, "splice", e);
  },
  toReversed() {
    return Cn(this).toReversed();
  },
  toSorted(e) {
    return Cn(this).toSorted(e);
  },
  toSpliced(...e) {
    return Cn(this).toSpliced(...e);
  },
  unshift(...e) {
    return ir(this, "unshift", e);
  },
  values() {
    return Di(this, "values", (e) => ct(this, e));
  }
};
function Di(e, t, n) {
  const r = To(e), o = r[t]();
  return r !== e && !/* @__PURE__ */ Ye(e) && (o._next = o.next, o.next = () => {
    const s = o._next();
    return s.done || (s.value = n(s.value)), s;
  }), o;
}
const Ed = Array.prototype;
function St(e, t, n, r, o, s) {
  const l = To(e), u = l !== e && !/* @__PURE__ */ Ye(e), c = l[t];
  if (c !== Ed[t]) {
    const v = c.apply(e, s);
    return u ? rt(v) : v;
  }
  let d = n;
  l !== e && (u ? d = function(v, y) {
    return n.call(this, ct(e, v), y, e);
  } : n.length > 2 && (d = function(v, y) {
    return n.call(this, v, y, e);
  }));
  const g = c.call(l, d, r);
  return u && o ? o(g) : g;
}
function Al(e, t, n, r) {
  const o = To(e), s = o !== e && !/* @__PURE__ */ Ye(e);
  let l = n, u = !1;
  o !== e && (s ? (u = r.length === 0, l = function(d, g, v) {
    return u && (u = !1, d = ct(e, d)), n.call(this, d, ct(e, g), v, e);
  }) : n.length > 3 && (l = function(d, g, v) {
    return n.call(this, d, g, v, e);
  }));
  const c = o[t](l, ...r);
  return u ? ct(e, c) : c;
}
function ki(e, t, n) {
  const r = /* @__PURE__ */ ue(e);
  Oe(r, "iterate", br);
  const o = r[t](...n);
  return (o === -1 || o === !1) && /* @__PURE__ */ xs(n[0]) ? (n[0] = /* @__PURE__ */ ue(n[0]), r[t](...n)) : o;
}
function ir(e, t, n = []) {
  At(), ms();
  const r = (/* @__PURE__ */ ue(e))[t].apply(e, n);
  return ys(), Dt(), r;
}
const Id = /* @__PURE__ */ ps("__proto__,__v_isRef,__isVue"), Ya = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(ht)
);
function Ad(e) {
  ht(e) || (e = String(e));
  const t = /* @__PURE__ */ ue(this);
  return Oe(t, "has", e), t.hasOwnProperty(e);
}
class Za {
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
      return r === (o ? s ? zd : tu : s ? eu : Qa).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const l = G(t);
    if (!o) {
      let c;
      if (l && (c = Md[n]))
        return c;
      if (n === "hasOwnProperty")
        return Ad;
    }
    const u = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ Pe(t) ? t : r
    );
    if ((ht(n) ? Ya.has(n) : Id(n)) || (o || Oe(t, "get", n), s))
      return u;
    if (/* @__PURE__ */ Pe(u)) {
      const c = l && vs(n) ? u : u.value;
      return o && pe(c) ? /* @__PURE__ */ Yi(c) : c;
    }
    return pe(u) ? o ? /* @__PURE__ */ Yi(u) : /* @__PURE__ */ Fo(u) : u;
  }
}
class Ja extends Za {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, o) {
    let s = t[n];
    const l = G(t) && vs(n);
    if (!this._isShallow) {
      const d = /* @__PURE__ */ kt(s);
      if (!/* @__PURE__ */ Ye(r) && !/* @__PURE__ */ kt(r) && (s = /* @__PURE__ */ ue(s), r = /* @__PURE__ */ ue(r)), !l && /* @__PURE__ */ Pe(s) && !/* @__PURE__ */ Pe(r))
        return d || (s.value = r), !0;
    }
    const u = l ? Number(n) < t.length : ce(t, n), c = Reflect.set(
      t,
      n,
      r,
      /* @__PURE__ */ Pe(t) ? t : o
    );
    return t === /* @__PURE__ */ ue(o) && c && (u ? dt(r, s) && Et(t, "set", n, r) : Et(t, "add", n, r)), c;
  }
  deleteProperty(t, n) {
    const r = ce(t, n);
    t[n];
    const o = Reflect.deleteProperty(t, n);
    return o && r && Et(t, "delete", n, void 0), o;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!ht(n) || !Ya.has(n)) && Oe(t, "has", n), r;
  }
  ownKeys(t) {
    return Oe(
      t,
      "iterate",
      G(t) ? "length" : rn
    ), Reflect.ownKeys(t);
  }
}
class Dd extends Za {
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
const kd = /* @__PURE__ */ new Ja(), Od = /* @__PURE__ */ new Dd(), Pd = /* @__PURE__ */ new Ja(!0);
const Xi = (e) => e, eo = (e) => Reflect.getPrototypeOf(e);
function Td(e, t, n) {
  return function(...r) {
    const o = this.__v_raw, s = /* @__PURE__ */ ue(o), l = Wt(s), u = e === "entries" || e === Symbol.iterator && l, c = e === "keys" && l, d = o[e](...r), g = n ? Xi : t ? Tn : rt;
    return !t && Oe(
      s,
      "iterate",
      c ? Gi : rn
    ), Te(
      // inheriting all iterator properties
      Object.create(d),
      {
        // iterator protocol
        next() {
          const { value: v, done: y } = d.next();
          return y ? { value: v, done: y } : {
            value: u ? [g(v[0]), g(v[1])] : g(v),
            done: y
          };
        }
      }
    );
  };
}
function to(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Fd(e, t) {
  const n = {
    get(o) {
      const s = this.__v_raw, l = /* @__PURE__ */ ue(s), u = /* @__PURE__ */ ue(o);
      e || (dt(o, u) && Oe(l, "get", o), Oe(l, "get", u));
      const { has: c } = eo(l), d = t ? Xi : e ? Tn : rt;
      if (c.call(l, o))
        return d(s.get(o));
      if (c.call(l, u))
        return d(s.get(u));
      s !== l && s.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && Oe(/* @__PURE__ */ ue(o), "iterate", rn), o.size;
    },
    has(o) {
      const s = this.__v_raw, l = /* @__PURE__ */ ue(s), u = /* @__PURE__ */ ue(o);
      return e || (dt(o, u) && Oe(l, "has", o), Oe(l, "has", u)), o === u ? s.has(o) : s.has(o) || s.has(u);
    },
    forEach(o, s) {
      const l = this, u = l.__v_raw, c = /* @__PURE__ */ ue(u), d = t ? Xi : e ? Tn : rt;
      return !e && Oe(c, "iterate", rn), u.forEach((g, v) => o.call(s, d(g), d(v), l));
    }
  };
  return Te(
    n,
    e ? {
      add: to("add"),
      set: to("set"),
      delete: to("delete"),
      clear: to("clear")
    } : {
      add(o) {
        const s = /* @__PURE__ */ ue(this), l = eo(s), u = /* @__PURE__ */ ue(o), c = !t && !/* @__PURE__ */ Ye(o) && !/* @__PURE__ */ kt(o) ? u : o;
        return l.has.call(s, c) || dt(o, c) && l.has.call(s, o) || dt(u, c) && l.has.call(s, u) || (s.add(c), Et(s, "add", c, c)), this;
      },
      set(o, s) {
        !t && !/* @__PURE__ */ Ye(s) && !/* @__PURE__ */ kt(s) && (s = /* @__PURE__ */ ue(s));
        const l = /* @__PURE__ */ ue(this), { has: u, get: c } = eo(l);
        let d = u.call(l, o);
        d || (o = /* @__PURE__ */ ue(o), d = u.call(l, o));
        const g = c.call(l, o);
        return l.set(o, s), d ? dt(s, g) && Et(l, "set", o, s) : Et(l, "add", o, s), this;
      },
      delete(o) {
        const s = /* @__PURE__ */ ue(this), { has: l, get: u } = eo(s);
        let c = l.call(s, o);
        c || (o = /* @__PURE__ */ ue(o), c = l.call(s, o)), u && u.call(s, o);
        const d = s.delete(o);
        return c && Et(s, "delete", o, void 0), d;
      },
      clear() {
        const o = /* @__PURE__ */ ue(this), s = o.size !== 0, l = o.clear();
        return s && Et(
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
    n[o] = Td(o, e, t);
  }), n;
}
function _s(e, t) {
  const n = Fd(e, t);
  return (r, o, s) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(
    ce(n, o) && o in r ? n : r,
    o,
    s
  );
}
const Hd = {
  get: /* @__PURE__ */ _s(!1, !1)
}, Ld = {
  get: /* @__PURE__ */ _s(!1, !0)
}, jd = {
  get: /* @__PURE__ */ _s(!0, !1)
};
const Qa = /* @__PURE__ */ new WeakMap(), eu = /* @__PURE__ */ new WeakMap(), tu = /* @__PURE__ */ new WeakMap(), zd = /* @__PURE__ */ new WeakMap();
function Kd(e) {
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
function Fo(e) {
  return /* @__PURE__ */ kt(e) ? e : Ss(
    e,
    !1,
    kd,
    Hd,
    Qa
  );
}
// @__NO_SIDE_EFFECTS__
function Vd(e) {
  return Ss(
    e,
    !1,
    Pd,
    Ld,
    eu
  );
}
// @__NO_SIDE_EFFECTS__
function Yi(e) {
  return Ss(
    e,
    !0,
    Od,
    jd,
    tu
  );
}
function Ss(e, t, n, r, o) {
  if (!pe(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const s = o.get(e);
  if (s)
    return s;
  const l = Kd(fd(e));
  if (l === 0)
    return e;
  const u = new Proxy(
    e,
    l === 2 ? r : n
  );
  return o.set(e, u), u;
}
// @__NO_SIDE_EFFECTS__
function on(e) {
  return /* @__PURE__ */ kt(e) ? /* @__PURE__ */ on(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function kt(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Ye(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function xs(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function ue(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ ue(t) : e;
}
function Bd(e) {
  return !ce(e, "__v_skip") && Object.isExtensible(e) && La(e, "__v_skip", !0), e;
}
const rt = (e) => pe(e) ? /* @__PURE__ */ Fo(e) : e, Tn = (e) => pe(e) ? /* @__PURE__ */ Yi(e) : e;
// @__NO_SIDE_EFFECTS__
function Pe(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function re(e) {
  return nu(e, !1);
}
// @__NO_SIDE_EFFECTS__
function Nd(e) {
  return nu(e, !0);
}
function nu(e, t) {
  return /* @__PURE__ */ Pe(e) ? e : new $d(e, t);
}
class $d {
  constructor(t, n) {
    this.dep = new bs(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ ue(t), this._value = n ? t : rt(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, r = this.__v_isShallow || /* @__PURE__ */ Ye(t) || /* @__PURE__ */ kt(t);
    t = r ? t : /* @__PURE__ */ ue(t), dt(t, n) && (this._rawValue = t, this._value = r ? t : rt(t), this.dep.trigger());
  }
}
function sn(e) {
  return /* @__PURE__ */ Pe(e) ? e.value : e;
}
const Wd = {
  get: (e, t, n) => t === "__v_raw" ? e : sn(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return /* @__PURE__ */ Pe(o) && !/* @__PURE__ */ Pe(n) ? (o.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function ru(e) {
  return /* @__PURE__ */ on(e) ? e : new Proxy(e, Wd);
}
class Ud {
  constructor(t, n, r) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new bs(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = wr - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    me !== this)
      return $a(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return qa(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function qd(e, t, n = !1) {
  let r, o;
  return Z(e) ? r = e : (r = e.get, o = e.set), new Ud(r, o, n);
}
const no = {}, vo = /* @__PURE__ */ new WeakMap();
let nn;
function Gd(e, t = !1, n = nn) {
  if (n) {
    let r = vo.get(n);
    r || vo.set(n, r = []), r.push(e);
  }
}
function Xd(e, t, n = ye) {
  const { immediate: r, deep: o, once: s, scheduler: l, augmentJob: u, call: c } = n, d = (_) => o ? _ : /* @__PURE__ */ Ye(_) || o === !1 || o === 0 ? $t(_, 1) : $t(_);
  let g, v, y, w, D = !1, R = !1;
  if (/* @__PURE__ */ Pe(e) ? (v = () => e.value, D = /* @__PURE__ */ Ye(e)) : /* @__PURE__ */ on(e) ? (v = () => d(e), D = !0) : G(e) ? (R = !0, D = e.some((_) => /* @__PURE__ */ on(_) || /* @__PURE__ */ Ye(_)), v = () => e.map((_) => {
    if (/* @__PURE__ */ Pe(_))
      return _.value;
    if (/* @__PURE__ */ on(_))
      return d(_);
    if (Z(_))
      return c ? c(_, 2) : _();
  })) : Z(e) ? t ? v = c ? () => c(e, 2) : e : v = () => {
    if (y) {
      At();
      try {
        y();
      } finally {
        Dt();
      }
    }
    const _ = nn;
    nn = g;
    try {
      return c ? c(e, 3, [w]) : e(w);
    } finally {
      nn = _;
    }
  } : v = pt, t && o) {
    const _ = v, O = o === !0 ? 1 / 0 : o;
    v = () => $t(_(), O);
  }
  const A = Va(), K = () => {
    g.stop(), A && A.active && hs(A.effects, g);
  };
  if (s && t) {
    const _ = t;
    t = (...O) => {
      const z = _(...O);
      return K(), z;
    };
  }
  let x = R ? new Array(e.length).fill(no) : no;
  const j = (_) => {
    if (!(!(g.flags & 1) || !g.dirty && !_))
      if (t) {
        const O = g.run();
        if (_ || o || D || (R ? O.some((z, J) => dt(z, x[J])) : dt(O, x))) {
          y && y();
          const z = nn;
          nn = g;
          try {
            const J = [
              O,
              // pass undefined as the old value when it's changed for the first time
              x === no ? void 0 : R && x[0] === no ? [] : x,
              w
            ];
            x = O, c ? c(t, 3, J) : (
              // @ts-expect-error
              t(...J)
            );
          } finally {
            nn = z;
          }
        }
      } else
        g.run();
  };
  return u && u(j), g = new Ba(v), g.scheduler = l ? () => l(j, !1) : j, w = (_) => Gd(_, !1, g), y = g.onStop = () => {
    const _ = vo.get(g);
    if (_) {
      if (c)
        c(_, 4);
      else
        for (const O of _) O();
      vo.delete(g);
    }
  }, t ? r ? j(!0) : x = g.run() : l ? l(j.bind(null, !0), !0) : g.run(), K.pause = g.pause.bind(g), K.resume = g.resume.bind(g), K.stop = K, K;
}
function $t(e, t = 1 / 0, n) {
  if (t <= 0 || !pe(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ Pe(e))
    $t(e.value, t, n);
  else if (G(e))
    for (let r = 0; r < e.length; r++)
      $t(e[r], t, n);
  else if (ho(e) || Wt(e))
    e.forEach((r) => {
      $t(r, t, n);
    });
  else if (Fa(e)) {
    for (const r in e)
      $t(e[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, r) && $t(e[r], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Ar(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (o) {
    Ho(o, t, n);
  }
}
function ot(e, t, n, r) {
  if (Z(e)) {
    const o = Ar(e, t, n, r);
    return o && Pa(o) && o.catch((s) => {
      Ho(s, t, n);
    }), o;
  }
  if (G(e)) {
    const o = [];
    for (let s = 0; s < e.length; s++)
      o.push(ot(e[s], t, n, r));
    return o;
  }
}
function Ho(e, t, n, r = !0) {
  const o = t ? t.vnode : null, { errorHandler: s, throwUnhandledErrorInProduction: l } = t && t.appContext.config || ye;
  if (t) {
    let u = t.parent;
    const c = t.proxy, d = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; u; ) {
      const g = u.ec;
      if (g) {
        for (let v = 0; v < g.length; v++)
          if (g[v](e, c, d) === !1)
            return;
      }
      u = u.parent;
    }
    if (s) {
      At(), Ar(s, null, 10, [
        e,
        c,
        d
      ]), Dt();
      return;
    }
  }
  Yd(e, n, o, r, l);
}
function Yd(e, t, n, r = !0, o = !1) {
  if (o)
    throw e;
  console.error(e);
}
const Le = [];
let at = -1;
const kn = [];
let Nt = null, In = 0;
const ou = /* @__PURE__ */ Promise.resolve();
let mo = null;
function Ve(e) {
  const t = mo || ou;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Zd(e) {
  let t = at + 1, n = Le.length;
  for (; t < n; ) {
    const r = t + n >>> 1, o = Le[r], s = _r(o);
    s < e || s === e && o.flags & 2 ? t = r + 1 : n = r;
  }
  return t;
}
function Rs(e) {
  if (!(e.flags & 1)) {
    const t = _r(e), n = Le[Le.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= _r(n) ? Le.push(e) : Le.splice(Zd(t), 0, e), e.flags |= 1, iu();
  }
}
function iu() {
  mo || (mo = ou.then(lu));
}
function Jd(e) {
  if (!G(e))
    Nt && e.id === -1 ? Nt.splice(In + 1, 0, e) : e.flags & 1 || (kn.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      kn.push(e[t]);
  iu();
}
function Dl(e, t, n = at + 1) {
  for (; n < Le.length; n++) {
    const r = Le[n];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid)
        continue;
      Le.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function su(e) {
  if (kn.length) {
    const t = [...new Set(kn)].sort(
      (n, r) => _r(n) - _r(r)
    );
    if (kn.length = 0, Nt) {
      for (let n = 0; n < t.length; n++)
        Nt.push(t[n]);
      return;
    }
    for (Nt = t, In = 0; In < Nt.length; In++) {
      const n = Nt[In];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    Nt = null, In = 0;
  }
}
const _r = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function lu(e) {
  try {
    for (at = 0; at < Le.length; at++) {
      const t = Le[at];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Ar(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; at < Le.length; at++) {
      const t = Le[at];
      t && (t.flags &= -2);
    }
    at = -1, Le.length = 0, su(), mo = null, (Le.length || kn.length) && lu();
  }
}
let gt = null, au = null;
function yo(e) {
  const t = gt;
  return gt = e, au = e && e.type.__scopeId || null, t;
}
function Qd(e, t = gt, n) {
  if (!t || e._n)
    return e;
  const r = (...o) => {
    r._d && Vl(-1);
    const s = yo(t), l = ln.length;
    let u;
    try {
      u = e(...o);
    } finally {
      for (let c = ln.length; c > l; c--) Ou();
      yo(s), r._d && Vl(1);
    }
    return u;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function Qt(e, t, n, r) {
  const o = e.dirs, s = t && t.dirs;
  for (let l = 0; l < o.length; l++) {
    const u = o[l];
    s && (u.oldValue = s[l].value);
    let c = u.dir[r];
    c && (At(), ot(c, n, 8, [
      e.el,
      u,
      e,
      t
    ]), Dt());
  }
}
function eg(e, t) {
  if (je) {
    let n = je.provides;
    const r = je.parent && je.parent.provides;
    r === n && (n = je.provides = Object.create(r)), n[e] = t;
  }
}
function uo(e, t, n = !1) {
  const r = Yg();
  if (r || On) {
    let o = On ? On._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && Z(t) ? t.call(r && r.proxy) : t;
  }
}
const tg = /* @__PURE__ */ Symbol.for("v-scx"), ng = () => uo(tg);
function be(e, t, n) {
  return uu(e, t, n);
}
function uu(e, t, n = ye) {
  const { immediate: r, deep: o, flush: s, once: l } = n, u = Te({}, n), c = t && r || !t && s !== "post";
  let d;
  if (Rr) {
    if (s === "sync") {
      const w = ng();
      d = w.__watcherHandles || (w.__watcherHandles = []);
    } else if (!c) {
      const w = () => {
      };
      return w.stop = pt, w.resume = pt, w.pause = pt, w;
    }
  }
  const g = je;
  u.call = (w, D, R) => ot(w, g, D, R);
  let v = !1;
  s === "post" ? u.scheduler = (w) => {
    Be(w, g && g.suspense);
  } : s !== "sync" && (v = !0, u.scheduler = (w, D) => {
    D ? w() : Rs(w);
  }), u.augmentJob = (w) => {
    t && (w.flags |= 4), v && (w.flags |= 2, g && (w.id = g.uid, w.i = g));
  };
  const y = Xd(e, t, u);
  return Rr && (d ? d.push(y) : c && y()), y;
}
function rg(e, t, n) {
  const r = this.proxy, o = Se(e) ? e.includes(".") ? cu(r, e) : () => r[e] : e.bind(r, r);
  let s;
  Z(t) ? s = t : (s = t.handler, n = t);
  const l = Dr(this), u = uu(o, s.bind(r), n);
  return l(), u;
}
function cu(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++)
      r = r[n[o]];
    return r;
  };
}
const og = /* @__PURE__ */ Symbol("_vte"), Lo = (e) => e.__isTeleport, Oi = /* @__PURE__ */ Symbol("_leaveCb");
function ig(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== Ot) {
        t = n;
        break;
      }
  }
  return t;
}
function fu(e) {
  if (!Ms(e))
    return Lo(e.type) && e.children ? ig(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16)
      return n[0];
    if (t & 32 && Z(n.default))
      return n.default();
  }
}
function Cs(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    Cs(
      Lo(n.type) && fu(n) || n,
      t
    );
  } else e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function du(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function kl(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const wo = /* @__PURE__ */ new WeakMap();
function pr(e, t, n, r, o = !1) {
  if (G(e)) {
    e.forEach(
      (R, A) => pr(
        R,
        t && (G(t) ? t[A] : t),
        n,
        r,
        o
      )
    );
    return;
  }
  if (hr(r) && !o) {
    r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && pr(e, t, n, r.component.subTree);
    return;
  }
  const s = r.shapeFlag & 4 ? As(r.component) : r.el, l = o ? null : s, { i: u, r: c } = e, d = t && t.r, g = u.refs === ye ? u.refs = {} : u.refs, v = u.setupState, y = /* @__PURE__ */ ue(v), w = v === ye ? Oa : (R) => kl(g, R) ? !1 : ce(y, R), D = (R, A) => !(A && kl(g, A));
  if (d != null && d !== c) {
    if (Ol(t), Se(d))
      g[d] = null, w(d) && (v[d] = null);
    else if (/* @__PURE__ */ Pe(d)) {
      const R = t;
      D(d, R.k) && (d.value = null), R.k && (g[R.k] = null);
    }
  }
  if (Z(c))
    Ar(c, u, 12, [l, g]);
  else {
    const R = Se(c), A = /* @__PURE__ */ Pe(c);
    if (R || A) {
      const K = () => {
        if (e.f) {
          const x = R ? w(c) ? v[c] : g[c] : D() || !e.k ? c.value : g[e.k];
          if (o)
            G(x) && hs(x, s);
          else if (G(x))
            x.includes(s) || x.push(s);
          else if (R)
            g[c] = [s], w(c) && (v[c] = g[c]);
          else {
            const j = [s];
            D(c, e.k) && (c.value = j), e.k && (g[e.k] = j);
          }
        } else R ? (g[c] = l, w(c) && (v[c] = l)) : A && (D(c, e.k) && (c.value = l), e.k && (g[e.k] = l));
      };
      if (l) {
        const x = () => {
          K(), wo.delete(e);
        };
        x.id = -1, wo.set(e, x), Be(x, n);
      } else
        Ol(e), K();
    }
  }
}
function Ol(e) {
  const t = wo.get(e);
  t && (t.flags |= 8, wo.delete(e));
}
Oo().requestIdleCallback;
Oo().cancelIdleCallback;
const hr = (e) => !!e.type.__asyncLoader, Ms = (e) => e.type.__isKeepAlive;
function sg(e, t) {
  gu(e, "a", t);
}
function lg(e, t) {
  gu(e, "da", t);
}
function gu(e, t, n = je) {
  const r = e.__wdc || (e.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (jo(t, r, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      Ms(o.parent.vnode) && ag(r, t, n, o), o = o.parent;
  }
}
function ag(e, t, n, r) {
  const o = jo(
    t,
    e,
    r,
    !0
    /* prepend */
  );
  pu(() => {
    hs(r[t], o);
  }, n);
}
function jo(e, t, n = je, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), s = t.__weh || (t.__weh = (...l) => {
      At();
      const u = Dr(n), c = ot(t, n, e, l);
      return u(), Dt(), c;
    });
    return r ? o.unshift(s) : o.push(s), s;
  }
}
const Tt = (e) => (t, n = je) => {
  (!Rr || e === "sp") && jo(e, (...r) => t(...r), n);
}, ug = Tt("bm"), co = Tt("m"), cg = Tt(
  "bu"
), fg = Tt("u"), lr = Tt(
  "bum"
), pu = Tt("um"), dg = Tt(
  "sp"
), gg = Tt("rtg"), pg = Tt("rtc");
function hg(e, t = je) {
  jo("ec", e, t);
}
const vg = /* @__PURE__ */ Symbol.for("v-ndc");
function en(e, t, n, r) {
  let o;
  const s = n, l = G(e);
  if (l || Se(e)) {
    const u = l && /* @__PURE__ */ on(e);
    let c = !1, d = !1;
    u && (c = !/* @__PURE__ */ Ye(e), d = /* @__PURE__ */ kt(e), e = To(e)), o = new Array(e.length);
    for (let g = 0, v = e.length; g < v; g++)
      o[g] = t(
        c ? d ? Tn(rt(e[g])) : rt(e[g]) : e[g],
        g,
        void 0,
        s
      );
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let u = 0; u < e; u++)
      o[u] = t(u + 1, u, void 0, s);
  } else if (pe(e))
    if (e[Symbol.iterator])
      o = Array.from(
        e,
        (u, c) => t(u, c, void 0, s)
      );
    else {
      const u = Object.keys(e);
      o = new Array(u.length);
      for (let c = 0, d = u.length; c < d; c++) {
        const g = u[c];
        o[c] = t(e[g], g, c, s);
      }
    }
  else
    o = [];
  return o;
}
const Zi = (e) => e ? Hu(e) ? As(e) : Zi(e.parent) : null, vr = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Te(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Zi(e.parent),
    $root: (e) => Zi(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => vu(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Rs(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Ve.bind(e.proxy)),
    $watch: (e) => rg.bind(e)
  })
), Pi = (e, t) => e !== ye && !e.__isScriptSetup && ce(e, t), mg = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: r, data: o, props: s, accessCache: l, type: u, appContext: c } = e;
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
        if (Pi(r, t))
          return l[t] = 1, r[t];
        if (o !== ye && ce(o, t))
          return l[t] = 2, o[t];
        if (ce(s, t))
          return l[t] = 3, s[t];
        if (n !== ye && ce(n, t))
          return l[t] = 4, n[t];
        Ji && (l[t] = 0);
      }
    }
    const d = vr[t];
    let g, v;
    if (d)
      return t === "$attrs" && Oe(e.attrs, "get", ""), d(e);
    if (
      // css module (injected by vue-loader)
      (g = u.__cssModules) && (g = g[t])
    )
      return g;
    if (n !== ye && ce(n, t))
      return l[t] = 4, n[t];
    if (
      // global properties
      v = c.config.globalProperties, ce(v, t)
    )
      return v[t];
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: o, ctx: s } = e;
    return Pi(o, t) ? (o[t] = n, !0) : r !== ye && ce(r, t) ? (r[t] = n, !0) : ce(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (s[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: o, props: s, type: l }
  }, u) {
    let c;
    return !!(n[u] || e !== ye && u[0] !== "$" && ce(e, u) || Pi(t, u) || ce(s, u) || ce(r, u) || ce(vr, u) || ce(o.config.globalProperties, u) || (c = l.__cssModules) && c[u]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : ce(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function Pl(e) {
  return G(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let Ji = !0;
function yg(e) {
  const t = vu(e), n = e.proxy, r = e.ctx;
  Ji = !1, t.beforeCreate && Tl(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: s,
    methods: l,
    watch: u,
    provide: c,
    inject: d,
    // lifecycle
    created: g,
    beforeMount: v,
    mounted: y,
    beforeUpdate: w,
    updated: D,
    activated: R,
    deactivated: A,
    beforeDestroy: K,
    beforeUnmount: x,
    destroyed: j,
    unmounted: _,
    render: O,
    renderTracked: z,
    renderTriggered: J,
    errorCaptured: W,
    serverPrefetch: L,
    // public API
    expose: U,
    inheritAttrs: se,
    // assets
    components: fe,
    directives: te,
    filters: we
  } = t;
  if (d && wg(d, r, null), l)
    for (const oe in l) {
      const ne = l[oe];
      Z(ne) && (r[oe] = ne.bind(n));
    }
  if (o) {
    const oe = o.call(n, n);
    pe(oe) && (e.data = /* @__PURE__ */ Fo(oe));
  }
  if (Ji = !0, s)
    for (const oe in s) {
      const ne = s[oe], Je = Z(ne) ? ne.bind(n, n) : Z(ne.get) ? ne.get.bind(n, n) : pt, hn = !Z(ne) && Z(ne.set) ? ne.set.bind(n) : pt, Ne = V({
        get: Je,
        set: hn
      });
      Object.defineProperty(r, oe, {
        enumerable: !0,
        configurable: !0,
        get: () => Ne.value,
        set: (he) => Ne.value = he
      });
    }
  if (u)
    for (const oe in u)
      hu(u[oe], r, n, oe);
  if (c) {
    const oe = Z(c) ? c.call(n) : c;
    Reflect.ownKeys(oe).forEach((ne) => {
      eg(ne, oe[ne]);
    });
  }
  g && Tl(g, e, "c");
  function de(oe, ne) {
    G(ne) ? ne.forEach((Je) => oe(Je.bind(n))) : ne && oe(ne.bind(n));
  }
  if (de(ug, v), de(co, y), de(cg, w), de(fg, D), de(sg, R), de(lg, A), de(hg, W), de(pg, z), de(gg, J), de(lr, x), de(pu, _), de(dg, L), G(U))
    if (U.length) {
      const oe = e.exposed || (e.exposed = {});
      U.forEach((ne) => {
        Object.defineProperty(oe, ne, {
          get: () => n[ne],
          set: (Je) => n[ne] = Je,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  O && e.render === pt && (e.render = O), se != null && (e.inheritAttrs = se), fe && (e.components = fe), te && (e.directives = te), L && du(e);
}
function wg(e, t, n = pt) {
  G(e) && (e = Qi(e));
  for (const r in e) {
    const o = e[r];
    let s;
    pe(o) ? "default" in o ? s = uo(
      o.from || r,
      o.default,
      !0
    ) : s = uo(o.from || r) : s = uo(o), /* @__PURE__ */ Pe(s) ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (l) => s.value = l
    }) : t[r] = s;
  }
}
function Tl(e, t, n) {
  ot(
    G(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function hu(e, t, n, r) {
  let o = r.includes(".") ? cu(n, r) : () => n[r];
  if (Se(e)) {
    const s = t[e];
    Z(s) && be(o, s);
  } else if (Z(e))
    be(o, e.bind(n));
  else if (pe(e))
    if (G(e))
      e.forEach((s) => hu(s, t, n, r));
    else {
      const s = Z(e.handler) ? e.handler.bind(n) : t[e.handler];
      Z(s) && be(o, s, e);
    }
}
function vu(e) {
  const t = e.type, { mixins: n, extends: r } = t, {
    mixins: o,
    optionsCache: s,
    config: { optionMergeStrategies: l }
  } = e.appContext, u = s.get(t);
  let c;
  return u ? c = u : !o.length && !n && !r ? c = t : (c = {}, o.length && o.forEach(
    (d) => bo(c, d, l, !0)
  ), bo(c, t, l)), pe(t) && s.set(t, c), c;
}
function bo(e, t, n, r = !1) {
  const { mixins: o, extends: s } = t;
  s && bo(e, s, n, !0), o && o.forEach(
    (l) => bo(e, l, n, !0)
  );
  for (const l in t)
    if (!(r && l === "expose")) {
      const u = bg[l] || n && n[l];
      e[l] = u ? u(e[l], t[l]) : t[l];
    }
  return e;
}
const bg = {
  data: Fl,
  props: Hl,
  emits: Hl,
  // objects
  methods: ar,
  computed: ar,
  // lifecycle
  beforeCreate: He,
  created: He,
  beforeMount: He,
  mounted: He,
  beforeUpdate: He,
  updated: He,
  beforeDestroy: He,
  beforeUnmount: He,
  destroyed: He,
  unmounted: He,
  activated: He,
  deactivated: He,
  errorCaptured: He,
  serverPrefetch: He,
  // assets
  components: ar,
  directives: ar,
  // watch
  watch: Sg,
  // provide / inject
  provide: Fl,
  inject: _g
};
function Fl(e, t) {
  return t ? e ? function() {
    return Te(
      Z(e) ? e.call(this, this) : e,
      Z(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function _g(e, t) {
  return ar(Qi(e), Qi(t));
}
function Qi(e) {
  if (G(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function He(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function ar(e, t) {
  return e ? Te(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Hl(e, t) {
  return e ? G(e) && G(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Te(
    /* @__PURE__ */ Object.create(null),
    Pl(e),
    Pl(t ?? {})
  ) : t;
}
function Sg(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Te(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = He(e[r], t[r]);
  return n;
}
function mu() {
  return {
    app: null,
    config: {
      isNativeTag: Oa,
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
let xg = 0;
function Rg(e, t) {
  return function(r, o = null) {
    Z(r) || (r = Te({}, r)), o != null && !pe(o) && (o = null);
    const s = mu(), l = /* @__PURE__ */ new WeakSet(), u = [];
    let c = !1;
    const d = s.app = {
      _uid: xg++,
      _component: r,
      _props: o,
      _container: null,
      _context: s,
      _instance: null,
      version: np,
      get config() {
        return s.config;
      },
      set config(g) {
      },
      use(g, ...v) {
        return l.has(g) || (g && Z(g.install) ? (l.add(g), g.install(d, ...v)) : Z(g) && (l.add(g), g(d, ...v))), d;
      },
      mixin(g) {
        return s.mixins.includes(g) || s.mixins.push(g), d;
      },
      component(g, v) {
        return v ? (s.components[g] = v, d) : s.components[g];
      },
      directive(g, v) {
        return v ? (s.directives[g] = v, d) : s.directives[g];
      },
      mount(g, v, y) {
        if (!c) {
          const w = d._ceVNode || It(r, o);
          return w.appContext = s, y === !0 ? y = "svg" : y === !1 && (y = void 0), e(w, g, y), c = !0, d._container = g, g.__vue_app__ = d, As(w.component);
        }
      },
      onUnmount(g) {
        u.push(g);
      },
      unmount() {
        c && (ot(
          u,
          d._instance,
          16
        ), e(null, d._container), delete d._container.__vue_app__);
      },
      provide(g, v) {
        return s.provides[g] = v, d;
      },
      runWithContext(g) {
        const v = On;
        On = d;
        try {
          return g();
        } finally {
          On = v;
        }
      }
    };
    return d;
  };
}
let On = null;
const Cg = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${tt(t)}Modifiers`] || e[`${cn(t)}Modifiers`];
function Mg(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || ye;
  let o = n;
  const s = t.startsWith("update:"), l = s && Cg(r, t.slice(7));
  l && (l.trim && (o = n.map((g) => Se(g) ? g.trim() : g)), l.number && (o = o.map(pd)));
  let u, c = r[u = Mi(t)] || // also try camelCase event handler (#2249)
  r[u = Mi(tt(t))];
  !c && s && (c = r[u = Mi(cn(t))]), c && ot(
    c,
    e,
    6,
    o
  );
  const d = r[u + "Once"];
  if (d) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[u])
      return;
    e.emitted[u] = !0, ot(
      d,
      e,
      6,
      o
    );
  }
}
const Eg = /* @__PURE__ */ new WeakMap();
function yu(e, t, n = !1) {
  const r = n ? Eg : t.emitsCache, o = r.get(e);
  if (o !== void 0)
    return o;
  const s = e.emits;
  let l = {}, u = !1;
  if (!Z(e)) {
    const c = (d) => {
      const g = yu(d, t, !0);
      g && (u = !0, Te(l, g));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !s && !u ? (pe(e) && r.set(e, null), null) : (G(s) ? s.forEach((c) => l[c] = null) : Te(l, s), pe(e) && r.set(e, l), l);
}
function zo(e, t) {
  return !e || !Ao(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), ce(e, t[0].toLowerCase() + t.slice(1)) || ce(e, cn(t)) || ce(e, t));
}
function Ll(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: o,
    propsOptions: [s],
    slots: l,
    attrs: u,
    emit: c,
    render: d,
    renderCache: g,
    props: v,
    data: y,
    setupState: w,
    ctx: D,
    inheritAttrs: R
  } = e, A = yo(e);
  let K, x;
  try {
    if (n.shapeFlag & 4) {
      const _ = o || r, O = _;
      K = ft(
        d.call(
          O,
          _,
          g,
          v,
          w,
          y,
          D
        )
      ), x = u;
    } else {
      const _ = t;
      K = ft(
        _.length > 1 ? _(
          v,
          { attrs: u, slots: l, emit: c }
        ) : _(
          v,
          null
        )
      ), x = t.props ? u : Ig(u);
    }
  } catch (_) {
    ln.length = 0, Ho(_, e, 1), K = It(Ot);
  }
  let j = K;
  if (x && R !== !1) {
    const _ = Object.keys(x), { shapeFlag: O } = j;
    _.length && O & 7 && (s && _.some(Do) && (x = Ag(
      x,
      s
    )), j = Fn(j, x, !1, !0));
  }
  if (n.dirs && (j = Fn(j, null, !1, !0), j.dirs = j.dirs ? j.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const _ = Lo(j.type) && fu(j) || j;
    Cs(_, n.transition);
  }
  return K = j, yo(A), K;
}
const Ig = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Ao(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Ag = (e, t) => {
  const n = {};
  for (const r in e)
    (!Do(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
  return n;
};
function Dg(e, t, n) {
  const { props: r, children: o, component: s } = e, { props: l, children: u, patchFlag: c } = t, d = s.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return r ? jl(r, l, d) : !!l;
    if (c & 8) {
      const g = t.dynamicProps;
      for (let v = 0; v < g.length; v++) {
        const y = g[v];
        if (wu(l, r, y) && !zo(d, y))
          return !0;
      }
    }
  } else
    return (o || u) && (!u || !u.$stable) ? !0 : r === l ? !1 : r ? l ? jl(r, l, d) : !0 : !!l;
  return !1;
}
function jl(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < r.length; o++) {
    const s = r[o];
    if (wu(t, e, s) && !zo(n, s))
      return !0;
  }
  return !1;
}
function wu(e, t, n) {
  const r = e[n], o = t[n];
  return n === "style" && pe(r) && pe(o) ? !Po(r, o) : r !== o;
}
function kg({ vnode: e, parent: t, suspense: n }, r) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.suspense.vnode.el = o.el = r, e = o), o === e)
      (e = t.vnode).el = r, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = r);
}
const bu = {}, _u = () => Object.create(bu), Su = (e) => Object.getPrototypeOf(e) === bu;
function Og(e, t, n, r = !1) {
  const o = {}, s = _u();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), xu(e, t, o, s);
  for (const l in e.propsOptions[0])
    l in o || (o[l] = void 0);
  n ? e.props = r ? o : /* @__PURE__ */ Vd(o) : e.type.props ? e.props = o : e.props = s, e.attrs = s;
}
function Pg(e, t, n, r) {
  const {
    props: o,
    attrs: s,
    vnode: { patchFlag: l }
  } = e, u = /* @__PURE__ */ ue(o), [c] = e.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (r || l > 0) && !(l & 16)
  ) {
    if (l & 8) {
      const g = e.vnode.dynamicProps;
      for (let v = 0; v < g.length; v++) {
        let y = g[v];
        if (zo(e.emitsOptions, y))
          continue;
        const w = t[y];
        if (c)
          if (ce(s, y))
            w !== s[y] && (s[y] = w, d = !0);
          else {
            const D = tt(y);
            o[D] = es(
              c,
              u,
              D,
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
    xu(e, t, o, s) && (d = !0);
    let g;
    for (const v in u)
      (!t || // for camelCase
      !ce(t, v) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((g = cn(v)) === v || !ce(t, g))) && (c ? n && // for camelCase
      (n[v] !== void 0 || // for kebab-case
      n[g] !== void 0) && (o[v] = es(
        c,
        u,
        v,
        void 0,
        e,
        !0
      )) : delete o[v]);
    if (s !== u)
      for (const v in s)
        (!t || !ce(t, v)) && (delete s[v], d = !0);
  }
  d && Et(e.attrs, "set", "");
}
function xu(e, t, n, r) {
  const [o, s] = e.propsOptions;
  let l = !1, u;
  if (t)
    for (let c in t) {
      if (fr(c))
        continue;
      const d = t[c];
      let g;
      o && ce(o, g = tt(c)) ? !s || !s.includes(g) ? n[g] = d : (u || (u = {}))[g] = d : zo(e.emitsOptions, c) || (!(c in r) || d !== r[c]) && (r[c] = d, l = !0);
    }
  if (s) {
    const c = /* @__PURE__ */ ue(n), d = u || ye;
    for (let g = 0; g < s.length; g++) {
      const v = s[g];
      n[v] = es(
        o,
        c,
        v,
        d[v],
        e,
        !ce(d, v)
      );
    }
  }
  return l;
}
function es(e, t, n, r, o, s) {
  const l = e[n];
  if (l != null) {
    const u = ce(l, "default");
    if (u && r === void 0) {
      const c = l.default;
      if (l.type !== Function && !l.skipFactory && Z(c)) {
        const { propsDefaults: d } = o;
        if (n in d)
          r = d[n];
        else {
          const g = Dr(o);
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
    ] && (s && !u ? r = !1 : l[
      1
      /* shouldCastTrue */
    ] && (r === "" || r === cn(n)) && (r = !0));
  }
  return r;
}
const Tg = /* @__PURE__ */ new WeakMap();
function Ru(e, t, n = !1) {
  const r = n ? Tg : t.propsCache, o = r.get(e);
  if (o)
    return o;
  const s = e.props, l = {}, u = [];
  let c = !1;
  if (!Z(e)) {
    const g = (v) => {
      c = !0;
      const [y, w] = Ru(v, t, !0);
      Te(l, y), w && u.push(...w);
    };
    !n && t.mixins.length && t.mixins.forEach(g), e.extends && g(e.extends), e.mixins && e.mixins.forEach(g);
  }
  if (!s && !c)
    return pe(e) && r.set(e, Dn), Dn;
  if (G(s))
    for (let g = 0; g < s.length; g++) {
      const v = tt(s[g]);
      zl(v) && (l[v] = ye);
    }
  else if (s)
    for (const g in s) {
      const v = tt(g);
      if (zl(v)) {
        const y = s[g], w = l[v] = G(y) || Z(y) ? { type: y } : Te({}, y), D = w.type;
        let R = !1, A = !0;
        if (G(D))
          for (let K = 0; K < D.length; ++K) {
            const x = D[K], j = Z(x) && x.name;
            if (j === "Boolean") {
              R = !0;
              break;
            } else j === "String" && (A = !1);
          }
        else
          R = Z(D) && D.name === "Boolean";
        w[
          0
          /* shouldCast */
        ] = R, w[
          1
          /* shouldCastTrue */
        ] = A, (R || ce(w, "default")) && u.push(v);
      }
    }
  const d = [l, u];
  return pe(e) && r.set(e, d), d;
}
function zl(e) {
  return e[0] !== "$" && !fr(e);
}
const Es = (e) => e === "_" || e === "_ctx" || e === "$stable", Is = (e) => G(e) ? e.map(ft) : [ft(e)], Fg = (e, t, n) => {
  if (t._n)
    return t;
  const r = Qd((...o) => Is(t(...o)), n);
  return r._c = !1, r;
}, Cu = (e, t, n) => {
  const r = e._ctx;
  for (const o in e) {
    if (Es(o)) continue;
    const s = e[o];
    if (Z(s))
      t[o] = Fg(o, s, r);
    else if (s != null) {
      const l = Is(s);
      t[o] = () => l;
    }
  }
}, Mu = (e, t) => {
  const n = Is(t);
  e.slots.default = () => n;
}, Eu = (e, t, n) => {
  for (const r in t)
    (n || !Es(r)) && (e[r] = t[r]);
}, Hg = (e, t, n) => {
  const r = e.slots = _u();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (Eu(r, t, n), n && La(r, "_", o, !0)) : Cu(t, r);
  } else t && Mu(e, t);
}, Lg = (e, t, n) => {
  const { vnode: r, slots: o } = e;
  let s = !0, l = ye;
  if (r.shapeFlag & 32) {
    const u = t._;
    u ? n && u === 1 ? s = !1 : Eu(o, t, n) : (s = !t.$stable, Cu(t, o)), l = t;
  } else t && (Mu(e, t), l = { default: 1 });
  if (s)
    for (const u in o)
      !Es(u) && l[u] == null && delete o[u];
}, Be = Bg;
function jg(e) {
  return zg(e);
}
function zg(e, t) {
  const n = Oo();
  n.__VUE__ = !0;
  const {
    insert: r,
    remove: o,
    patchProp: s,
    createElement: l,
    createText: u,
    createComment: c,
    setText: d,
    setElementText: g,
    parentNode: v,
    nextSibling: y,
    setScopeId: w = pt,
    insertStaticContent: D
  } = e, R = (p, m, b, I = null, E = null, C = null, T = void 0, P = null, k = !!m.dynamicChildren) => {
    if (p === m)
      return;
    p && !sr(p, m) && (I = Qe(p), he(p, E, C, !0), p = null), m.patchFlag === -2 && (k = !1, m.dynamicChildren = null);
    const { type: M, ref: N, shapeFlag: F } = m;
    switch (M) {
      case Ko:
        A(p, m, b, I);
        break;
      case Ot:
        K(p, m, b, I);
        break;
      case Fi:
        p == null && x(m, b, I, T);
        break;
      case Me:
        fe(
          p,
          m,
          b,
          I,
          E,
          C,
          T,
          P,
          k
        );
        break;
      default:
        F & 1 ? O(
          p,
          m,
          b,
          I,
          E,
          C,
          T,
          P,
          k
        ) : F & 6 ? te(
          p,
          m,
          b,
          I,
          E,
          C,
          T,
          P,
          k
        ) : (F & 64 || F & 128) && M.process(
          p,
          m,
          b,
          I,
          E,
          C,
          T,
          P,
          k,
          qt
        );
    }
    N != null && E ? pr(N, p && p.ref, C, m || p, !m) : N == null && p && p.ref != null && pr(p.ref, null, C, p, !0);
  }, A = (p, m, b, I) => {
    if (p == null)
      r(
        m.el = u(m.children),
        b,
        I
      );
    else {
      const E = m.el = p.el;
      m.children !== p.children && d(E, m.children);
    }
  }, K = (p, m, b, I) => {
    p == null ? r(
      m.el = c(m.children || ""),
      b,
      I
    ) : m.el = p.el;
  }, x = (p, m, b, I) => {
    [p.el, p.anchor] = D(
      p.children,
      m,
      b,
      I,
      p.el,
      p.anchor
    );
  }, j = ({ el: p, anchor: m }, b, I) => {
    let E;
    for (; p && p !== m; )
      E = y(p), r(p, b, I), p = E;
    r(m, b, I);
  }, _ = ({ el: p, anchor: m }) => {
    let b;
    for (; p && p !== m; )
      b = y(p), o(p), p = b;
    o(m);
  }, O = (p, m, b, I, E, C, T, P, k) => {
    if (m.type === "svg" ? T = "svg" : m.type === "math" && (T = "mathml"), p == null)
      z(
        m,
        b,
        I,
        E,
        C,
        T,
        P,
        k
      );
    else {
      const M = p.el && p.el._isVueCE ? p.el : null;
      try {
        M && M._beginPatch(), L(
          p,
          m,
          E,
          C,
          T,
          P,
          k
        );
      } finally {
        M && M._endPatch();
      }
    }
  }, z = (p, m, b, I, E, C, T, P) => {
    let k, M;
    const { props: N, shapeFlag: F, transition: B, dirs: q } = p;
    if (k = p.el = l(
      p.type,
      C,
      N && N.is,
      N
    ), F & 8 ? g(k, p.children) : F & 16 && W(
      p.children,
      k,
      null,
      I,
      E,
      Ti(p, C),
      T,
      P
    ), q && Qt(p, null, I, "created"), J(k, p, p.scopeId, T, I), N) {
      for (const ge in N)
        ge !== "value" && !fr(ge) && s(k, ge, null, N[ge], C, I);
      "value" in N && s(k, "value", null, N.value, C), (M = N.onVnodeBeforeMount) && lt(M, I, p);
    }
    q && Qt(p, null, I, "beforeMount");
    const Q = Kg(E, B);
    Q && B.beforeEnter(k), r(k, m, b), ((M = N && N.onVnodeMounted) || Q || q) && Be(() => {
      try {
        M && lt(M, I, p), Q && B.enter(k), q && Qt(p, null, I, "mounted");
      } finally {
      }
    }, E);
  }, J = (p, m, b, I, E) => {
    if (b && w(p, b), I)
      for (let C = 0; C < I.length; C++)
        w(p, I[C]);
    if (E) {
      let C = E.subTree;
      if (m === C || ku(C.type) && (C.ssContent === m || C.ssFallback === m)) {
        const T = E.vnode;
        J(
          p,
          T,
          T.scopeId,
          T.slotScopeIds,
          E.parent
        );
      }
    }
  }, W = (p, m, b, I, E, C, T, P, k = 0) => {
    for (let M = k; M < p.length; M++) {
      const N = p[M] = P ? Mt(p[M]) : ft(p[M]);
      R(
        null,
        N,
        m,
        b,
        I,
        E,
        C,
        T,
        P
      );
    }
  }, L = (p, m, b, I, E, C, T) => {
    const P = m.el = p.el;
    let { patchFlag: k, dynamicChildren: M, dirs: N } = m;
    k |= p.patchFlag & 16;
    const F = p.props || ye, B = m.props || ye;
    let q;
    if (b && tn(b, !1), (q = B.onVnodeBeforeUpdate) && lt(q, b, m, p), N && Qt(m, p, b, "beforeUpdate"), b && tn(b, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    M && (!p.dynamicChildren || p.dynamicChildren.length !== M.length) && (k = 0, T = !1, M = null), (F.innerHTML && B.innerHTML == null || F.textContent && B.textContent == null) && g(P, ""), M ? U(
      p.dynamicChildren,
      M,
      P,
      b,
      I,
      Ti(m, E),
      C
    ) : T || ne(
      p,
      m,
      P,
      null,
      b,
      I,
      Ti(m, E),
      C,
      !1
    ), k > 0) {
      if (k & 16)
        se(P, F, B, b, E);
      else if (k & 2 && F.class !== B.class && s(P, "class", null, B.class, E), k & 4 && s(P, "style", F.style, B.style, E), k & 8) {
        const Q = m.dynamicProps;
        for (let ge = 0; ge < Q.length; ge++) {
          const le = Q[ge], _e = F[le], Ee = B[le];
          (Ee !== _e || le === "value") && s(P, le, _e, Ee, E, b);
        }
      }
      k & 1 && p.children !== m.children && g(P, m.children);
    } else !T && M == null && se(P, F, B, b, E);
    ((q = B.onVnodeUpdated) || N) && Be(() => {
      q && lt(q, b, m, p), N && Qt(m, p, b, "updated");
    }, I);
  }, U = (p, m, b, I, E, C, T) => {
    for (let P = 0; P < m.length; P++) {
      const k = p[P], M = m[P], N = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        k.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (k.type === Me || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !sr(k, M) || // - In the case of a component, it could contain anything.
        k.shapeFlag & 198) ? v(k.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          b
        )
      );
      R(
        k,
        M,
        N,
        null,
        I,
        E,
        C,
        T,
        !0
      );
    }
  }, se = (p, m, b, I, E) => {
    if (m !== b) {
      if (m !== ye)
        for (const C in m)
          !fr(C) && !(C in b) && s(
            p,
            C,
            m[C],
            null,
            E,
            I
          );
      for (const C in b) {
        if (fr(C)) continue;
        const T = b[C], P = m[C];
        T !== P && C !== "value" && s(p, C, P, T, E, I);
      }
      "value" in b && s(p, "value", m.value, b.value, E);
    }
  }, fe = (p, m, b, I, E, C, T, P, k) => {
    const M = m.el = p ? p.el : u(""), N = m.anchor = p ? p.anchor : u("");
    let { patchFlag: F, dynamicChildren: B, slotScopeIds: q } = m;
    q && (P = P ? P.concat(q) : q), p == null ? (r(M, b, I), r(N, b, I), W(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      m.children || [],
      b,
      N,
      E,
      C,
      T,
      P,
      k
    )) : F > 0 && F & 64 && B && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    p.dynamicChildren && p.dynamicChildren.length === B.length ? (U(
      p.dynamicChildren,
      B,
      b,
      E,
      C,
      T,
      P
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (m.key != null || E && m === E.subTree) && Iu(
      p,
      m,
      !0
      /* shallow */
    )) : ne(
      p,
      m,
      b,
      N,
      E,
      C,
      T,
      P,
      k
    );
  }, te = (p, m, b, I, E, C, T, P, k) => {
    m.slotScopeIds = P, p == null ? m.shapeFlag & 512 ? E.ctx.activate(
      m,
      b,
      I,
      T,
      k
    ) : we(
      m,
      b,
      I,
      E,
      C,
      T,
      k
    ) : xe(p, m, k);
  }, we = (p, m, b, I, E, C, T) => {
    const P = p.component = Xg(
      p,
      I,
      E
    );
    if (Ms(p) && (P.ctx.renderer = qt), Zg(P, !1, T), P.asyncDep) {
      if (E && E.registerDep(P, de, T), !p.el) {
        const k = P.subTree = It(Ot);
        K(null, k, m, b), p.placeholder = k.el;
      }
    } else
      de(
        P,
        p,
        m,
        b,
        E,
        C,
        T
      );
  }, xe = (p, m, b) => {
    const I = m.component = p.component;
    if (Dg(p, m, b))
      if (I.asyncDep && !I.asyncResolved) {
        oe(I, m, b);
        return;
      } else
        I.next = m, I.update();
    else
      m.el = p.el, I.vnode = m;
  }, de = (p, m, b, I, E, C, T) => {
    const P = () => {
      if (p.isMounted) {
        let { next: F, bu: B, u: q, parent: Q, vnode: ge } = p;
        {
          const $e = Au(p);
          if ($e) {
            F && (F.el = ge.el, oe(p, F, T)), $e.asyncDep.then(() => {
              Be(() => {
                p.isUnmounted || M();
              }, E);
            });
            return;
          }
        }
        let le = F, _e;
        tn(p, !1), F ? (F.el = ge.el, oe(p, F, T)) : F = ge, B && Ei(B), (_e = F.props && F.props.onVnodeBeforeUpdate) && lt(_e, Q, F, ge), tn(p, !0);
        const Ee = Ll(p), De = p.subTree;
        p.subTree = Ee, R(
          De,
          Ee,
          // parent may have changed if it's in a teleport
          v(De.el),
          // anchor may have changed if it's in a fragment
          Qe(De),
          p,
          E,
          C
        ), F.el = Ee.el, le === null && kg(p, Ee.el), q && Be(q, E), (_e = F.props && F.props.onVnodeUpdated) && Be(
          () => lt(_e, Q, F, ge),
          E
        );
      } else {
        let F;
        const { el: B, props: q } = m, { bm: Q, m: ge, parent: le, root: _e, type: Ee } = p, De = hr(m);
        tn(p, !1), Q && Ei(Q), !De && (F = q && q.onVnodeBeforeMount) && lt(F, le, m), tn(p, !0);
        {
          _e.ce && _e.ce._hasShadowRoot() && _e.ce._injectChildStyle(
            Ee,
            p.parent ? p.parent.type : void 0
          );
          const $e = p.subTree = Ll(p);
          R(
            null,
            $e,
            b,
            I,
            p,
            E,
            C
          ), m.el = $e.el;
        }
        if (ge && Be(ge, E), !De && (F = q && q.onVnodeMounted)) {
          const $e = m;
          Be(
            () => lt(F, le, $e),
            E
          );
        }
        (m.shapeFlag & 256 || le && hr(le.vnode) && le.vnode.shapeFlag & 256) && p.a && Be(p.a, E), p.isMounted = !0, m = b = I = null;
      }
    };
    p.scope.on();
    const k = p.effect = new Ba(P);
    p.scope.off();
    const M = p.update = k.run.bind(k), N = p.job = k.runIfDirty.bind(k);
    N.i = p, N.id = p.uid, k.scheduler = () => Rs(N), tn(p, !0), M();
  }, oe = (p, m, b) => {
    m.component = p;
    const I = p.vnode.props;
    p.vnode = m, p.next = null, Pg(p, m.props, I, b), Lg(p, m.children, b), At(), Dl(p), Dt();
  }, ne = (p, m, b, I, E, C, T, P, k = !1) => {
    const M = p && p.children, N = p ? p.shapeFlag : 0, F = m.children, { patchFlag: B, shapeFlag: q } = m;
    if (B > 0) {
      if (B & 128) {
        hn(
          M,
          F,
          b,
          I,
          E,
          C,
          T,
          P,
          k
        );
        return;
      } else if (B & 256) {
        Je(
          M,
          F,
          b,
          I,
          E,
          C,
          T,
          P,
          k
        );
        return;
      }
    }
    q & 8 ? (N & 16 && Ae(M, E, C), F !== M && g(b, F)) : N & 16 ? q & 16 ? hn(
      M,
      F,
      b,
      I,
      E,
      C,
      T,
      P,
      k
    ) : Ae(M, E, C, !0) : (N & 8 && g(b, ""), q & 16 && W(
      F,
      b,
      I,
      E,
      C,
      T,
      P,
      k
    ));
  }, Je = (p, m, b, I, E, C, T, P, k) => {
    p = p || Dn, m = m || Dn;
    const M = p.length, N = m.length, F = Math.min(M, N);
    let B;
    for (B = 0; B < F; B++) {
      const q = m[B] = k ? Mt(m[B]) : ft(m[B]);
      R(
        p[B],
        q,
        b,
        null,
        E,
        C,
        T,
        P,
        k
      );
    }
    M > N ? Ae(
      p,
      E,
      C,
      !0,
      !1,
      F
    ) : W(
      m,
      b,
      I,
      E,
      C,
      T,
      P,
      k,
      F
    );
  }, hn = (p, m, b, I, E, C, T, P, k) => {
    let M = 0;
    const N = m.length;
    let F = p.length - 1, B = N - 1;
    for (; M <= F && M <= B; ) {
      const q = p[M], Q = m[M] = k ? Mt(m[M]) : ft(m[M]);
      if (sr(q, Q))
        R(
          q,
          Q,
          b,
          null,
          E,
          C,
          T,
          P,
          k
        );
      else
        break;
      M++;
    }
    for (; M <= F && M <= B; ) {
      const q = p[F], Q = m[B] = k ? Mt(m[B]) : ft(m[B]);
      if (sr(q, Q))
        R(
          q,
          Q,
          b,
          null,
          E,
          C,
          T,
          P,
          k
        );
      else
        break;
      F--, B--;
    }
    if (M > F) {
      if (M <= B) {
        const q = B + 1, Q = q < N ? m[q].el : I;
        for (; M <= B; )
          R(
            null,
            m[M] = k ? Mt(m[M]) : ft(m[M]),
            b,
            Q,
            E,
            C,
            T,
            P,
            k
          ), M++;
      }
    } else if (M > B)
      for (; M <= F; )
        he(p[M], E, C, !0), M++;
    else {
      const q = M, Q = M, ge = /* @__PURE__ */ new Map();
      for (M = Q; M <= B; M++) {
        const ke = m[M] = k ? Mt(m[M]) : ft(m[M]);
        ke.key != null && ge.set(ke.key, M);
      }
      let le, _e = 0;
      const Ee = B - Q + 1;
      let De = !1, $e = 0;
      const Ht = new Array(Ee);
      for (M = 0; M < Ee; M++) Ht[M] = 0;
      for (M = q; M <= F; M++) {
        const ke = p[M];
        if (_e >= Ee) {
          he(ke, E, C, !0);
          continue;
        }
        let Ge;
        if (ke.key != null)
          Ge = ge.get(ke.key);
        else
          for (le = Q; le <= B; le++)
            if (Ht[le - Q] === 0 && sr(ke, m[le])) {
              Ge = le;
              break;
            }
        Ge === void 0 ? he(ke, E, C, !0) : (Ht[Ge - Q] = M + 1, Ge >= $e ? $e = Ge : De = !0, R(
          ke,
          m[Ge],
          b,
          null,
          E,
          C,
          T,
          P,
          k
        ), _e++);
      }
      const jn = De ? Vg(Ht) : Dn;
      for (le = jn.length - 1, M = Ee - 1; M >= 0; M--) {
        const ke = Q + M, Ge = m[ke], zn = m[ke + 1], mn = ke + 1 < N ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          zn.el || Du(zn)
        ) : I;
        Ht[M] === 0 ? R(
          null,
          Ge,
          b,
          mn,
          E,
          C,
          T,
          P,
          k
        ) : De && (le < 0 || M !== jn[le] ? Ne(Ge, b, mn, 2) : le--);
      }
    }
  }, Ne = (p, m, b, I, E = null) => {
    const { el: C, type: T, transition: P, children: k, shapeFlag: M } = p;
    if (M & 6) {
      Ne(p.component.subTree, m, b, I);
      return;
    }
    if (M & 128) {
      p.suspense.move(m, b, I);
      return;
    }
    if (M & 64) {
      T.move(p, m, b, qt);
      return;
    }
    if (T === Me) {
      r(C, m, b);
      for (let F = 0; F < k.length; F++)
        Ne(k[F], m, b, I);
      r(p.anchor, m, b);
      return;
    }
    if (T === Fi) {
      j(p, m, b);
      return;
    }
    if (I !== 2 && M & 1 && P)
      if (I === 0)
        P.persisted && !C[Oi] ? r(C, m, b) : (P.beforeEnter(C), r(C, m, b), Be(() => P.enter(C), E));
      else {
        const { leave: F, delayLeave: B, afterLeave: q } = P, Q = () => {
          p.ctx.isUnmounted ? o(C) : r(C, m, b);
        }, ge = () => {
          const le = C._isLeaving || !!C[Oi];
          C._isLeaving && C[Oi](
            !0
            /* cancelled */
          ), P.persisted && !le ? Q() : F(C, () => {
            Q(), q && q();
          });
        };
        B ? B(C, Q, ge) : ge();
      }
    else
      r(C, m, b);
  }, he = (p, m, b, I = !1, E = !1) => {
    const {
      type: C,
      props: T,
      ref: P,
      children: k,
      dynamicChildren: M,
      shapeFlag: N,
      patchFlag: F,
      dirs: B,
      cacheIndex: q,
      memo: Q
    } = p;
    if (F === -2 && (E = !1), P != null && (At(), pr(P, null, b, p, !0), Dt()), q != null && (m.renderCache[q] = void 0), N & 256) {
      m.ctx.deactivate(p);
      return;
    }
    const ge = N & 1 && B, le = !hr(p);
    let _e;
    if (le && (_e = T && T.onVnodeBeforeUnmount) && lt(_e, m, p), N & 6)
      Lr(p.component, b, I);
    else {
      if (N & 128) {
        p.suspense.unmount(b, I);
        return;
      }
      ge && Qt(p, null, m, "beforeUnmount"), N & 64 ? p.type.remove(
        p,
        m,
        b,
        qt,
        I
      ) : M && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !M.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (C !== Me || F > 0 && F & 64) ? Ae(
        M,
        m,
        b,
        !1,
        !0
      ) : (C === Me && F & 384 || !E && N & 16) && Ae(k, m, b), I && vn(p);
    }
    const Ee = Q != null && q == null;
    (le && (_e = T && T.onVnodeUnmounted) || ge || Ee) && Be(() => {
      _e && lt(_e, m, p), ge && Qt(p, null, m, "unmounted"), Ee && (p.el = null);
    }, b);
  }, vn = (p) => {
    const { type: m, el: b, anchor: I, transition: E } = p;
    if (m === Me) {
      Ut(b, I);
      return;
    }
    if (m === Fi) {
      _(p);
      return;
    }
    const C = () => {
      o(b), E && !E.persisted && E.afterLeave && E.afterLeave();
    };
    if (p.shapeFlag & 1 && E && !E.persisted) {
      const { leave: T, delayLeave: P } = E, k = () => T(b, C);
      P ? P(p.el, C, k) : k();
    } else
      C();
  }, Ut = (p, m) => {
    let b;
    for (; p !== m; )
      b = y(p), o(p), p = b;
    o(m);
  }, Lr = (p, m, b) => {
    const { bum: I, scope: E, job: C, subTree: T, um: P, m: k, a: M } = p;
    Kl(k), Kl(M), I && Ei(I), E.stop(), C && (C.flags |= 8, he(T, p, m, b)), P && Be(P, m), Be(() => {
      p.isUnmounted = !0;
    }, m);
  }, Ae = (p, m, b, I = !1, E = !1, C = 0) => {
    for (let T = C; T < p.length; T++)
      he(p[T], m, b, I, E);
  }, Qe = (p) => {
    if (p.shapeFlag & 6)
      return Qe(p.component.subTree);
    if (p.shapeFlag & 128)
      return p.suspense.next();
    const m = y(p.anchor || p.el), b = m && m[og];
    return b ? y(b) : m;
  };
  let Ft = !1;
  const jr = (p, m, b) => {
    let I;
    p == null ? m._vnode && (he(m._vnode, null, null, !0), I = m._vnode.component) : R(
      m._vnode || null,
      p,
      m,
      null,
      null,
      null,
      b
    ), m._vnode = p, Ft || (Ft = !0, Dl(I), su(), Ft = !1);
  }, qt = {
    p: R,
    um: he,
    m: Ne,
    r: vn,
    mt: we,
    mc: W,
    pc: ne,
    pbc: U,
    n: Qe,
    o: e
  };
  return {
    render: jr,
    hydrate: void 0,
    createApp: Rg(jr)
  };
}
function Ti({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function tn({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Kg(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Iu(e, t, n = !1) {
  const r = e.children, o = t.children;
  if (G(r) && G(o))
    for (let s = 0; s < r.length; s++) {
      const l = r[s];
      let u = o[s];
      u.shapeFlag & 1 && !u.dynamicChildren && ((u.patchFlag <= 0 || u.patchFlag === 32) && (u = o[s] = Mt(o[s]), u.el = l.el), !n && u.patchFlag !== -2 && Iu(l, u)), u.type === Ko && (u.patchFlag === -1 && (u = o[s] = Mt(u)), u.el = l.el), u.type === Ot && !u.el && (u.el = l.el);
    }
}
function Vg(e) {
  const t = e.slice(), n = [0];
  let r, o, s, l, u;
  const c = e.length;
  for (r = 0; r < c; r++) {
    const d = e[r];
    if (d !== 0) {
      if (o = n[n.length - 1], e[o] < d) {
        t[r] = o, n.push(r);
        continue;
      }
      for (s = 0, l = n.length - 1; s < l; )
        u = s + l >> 1, e[n[u]] < d ? s = u + 1 : l = u;
      d < e[n[s]] && (s > 0 && (t[r] = n[s - 1]), n[s] = r);
    }
  }
  for (s = n.length, l = n[s - 1]; s-- > 0; )
    n[s] = l, l = t[l];
  return n;
}
function Au(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Au(t);
}
function Kl(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function Du(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? Du(t.subTree) : null;
}
const ku = (e) => e.__isSuspense;
function Bg(e, t) {
  t && t.pendingBranch ? G(e) ? t.effects.push(...e) : t.effects.push(e) : Jd(e);
}
const Me = /* @__PURE__ */ Symbol.for("v-fgt"), Ko = /* @__PURE__ */ Symbol.for("v-txt"), Ot = /* @__PURE__ */ Symbol.for("v-cmt"), Fi = /* @__PURE__ */ Symbol.for("v-stc"), ln = [];
let qe = null;
function X(e = !1) {
  ln.push(qe = e ? null : []);
}
function Ou() {
  ln.pop(), qe = ln[ln.length - 1] || null;
}
let Sr = 1;
function Vl(e, t = !1) {
  Sr += e, e < 0 && qe && t && (qe.hasOnce = !0);
}
function Pu(e) {
  return e.dynamicChildren = Sr > 0 ? qe || Dn : null, Ou(), Sr > 0 && qe && qe.push(e), e;
}
function Y(e, t, n, r, o, s) {
  return Pu(
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
function Ng(e, t, n, r, o) {
  return Pu(
    It(
      e,
      t,
      n,
      r,
      o,
      !0
    )
  );
}
function Tu(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function sr(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Fu = ({ key: e }) => e ?? null, fo = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? Se(e) || /* @__PURE__ */ Pe(e) || Z(e) ? { i: gt, r: e, k: t, f: !!n } : e : null);
function Ce(e, t = null, n = null, r = 0, o = null, s = e === Me ? 0 : 1, l = !1, u = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Fu(t),
    ref: t && fo(t),
    scopeId: au,
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
    ctx: gt
  };
  return u ? (_o(c, n), s & 128 && e.normalize(c)) : n && (c.shapeFlag |= Se(n) ? 8 : 16), Sr > 0 && // avoid a block node from tracking itself
  !l && // has current parent block
  qe && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && qe.push(c), c;
}
const It = $g;
function $g(e, t = null, n = null, r = 0, o = null, s = !1) {
  if ((!e || e === vg) && (e = Ot), Tu(e)) {
    const u = Fn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && _o(u, n), Sr > 0 && !s && qe && (u.shapeFlag & 6 ? qe[qe.indexOf(e)] = u : qe.push(u)), u.patchFlag = -2, u;
  }
  if (tp(e) && (e = e.__vccOpts), t) {
    t = Wg(t);
    let { class: u, style: c } = t;
    u && !Se(u) && (t.class = Ue(u)), pe(c) && (/* @__PURE__ */ xs(c) && !G(c) && (c = Te({}, c)), t.style = ut(c));
  }
  const l = Se(e) ? 1 : ku(e) ? 128 : Lo(e) ? 64 : pe(e) ? 4 : Z(e) ? 2 : 0;
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
function Wg(e) {
  return e ? /* @__PURE__ */ xs(e) || Su(e) ? Te({}, e) : e : null;
}
function Fn(e, t, n = !1, r = !1) {
  const { props: o, ref: s, patchFlag: l, children: u, transition: c } = e, d = t ? Ug(o || {}, t) : o, g = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && Fu(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && s ? G(s) ? s.concat(fo(t)) : [s, fo(t)] : fo(t)
    ) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: u,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Me ? l === -1 ? 16 : l | 16 : l,
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
    ssContent: e.ssContent && Fn(e.ssContent),
    ssFallback: e.ssFallback && Fn(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && r && Cs(
    g,
    c.clone(g)
  ), g;
}
function ts(e = " ", t = 0) {
  return It(Ko, null, e, t);
}
function Xe(e = "", t = !1) {
  return t ? (X(), Ng(Ot, null, e)) : It(Ot, null, e);
}
function ft(e) {
  return e == null || typeof e == "boolean" ? It(Ot) : G(e) ? It(
    Me,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Tu(e) ? Mt(e) : It(Ko, null, String(e));
}
function Mt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Fn(e);
}
function _o(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (G(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), _o(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !Su(t) ? t._ctx = gt : o === 3 && gt && (gt.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (Z(t)) {
    if (r & 65) {
      _o(e, { default: t });
      return;
    }
    t = { default: t, _ctx: gt }, n = 32;
  } else
    t = String(t), r & 64 ? (n = 16, t = [ts(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function Ug(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === "class")
        t.class !== r.class && (t.class = Ue([t.class, r.class]));
      else if (o === "style")
        t.style = ut([t.style, r.style]);
      else if (Ao(o)) {
        const s = t[o], l = r[o];
        l && s !== l && !(G(s) && s.includes(l)) ? t[o] = s ? [].concat(s, l) : l : l == null && s == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !Do(o) && (t[o] = l);
      } else o !== "" && (t[o] = r[o]);
  }
  return t;
}
function lt(e, t, n, r = null) {
  ot(e, t, 7, [
    n,
    r
  ]);
}
const qg = mu();
let Gg = 0;
function Xg(e, t, n) {
  const r = e.type, o = (t ? t.appContext : e.appContext) || qg, s = {
    uid: Gg++,
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
    scope: new Sd(
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
    propsOptions: Ru(r, o),
    emitsOptions: yu(r, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: ye,
    // inheritAttrs
    inheritAttrs: r.inheritAttrs,
    // state
    ctx: ye,
    data: ye,
    props: ye,
    attrs: ye,
    slots: ye,
    refs: ye,
    setupState: ye,
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
  return s.ctx = { _: s }, s.root = t ? t.root : s, s.emit = Mg.bind(null, s), e.ce && e.ce(s), s;
}
let je = null;
const Yg = () => je || gt;
let So, xr;
{
  const e = Oo(), t = (n, r) => {
    let o;
    return (o = e[n]) || (o = e[n] = []), o.push(r), (s) => {
      o.length > 1 ? o.forEach((l) => l(s)) : o[0](s);
    };
  };
  So = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => je = n
  ), xr = t(
    "__VUE_SSR_SETTERS__",
    (n) => Rr = n
  );
}
const Dr = (e) => {
  const t = je;
  return So(e), e.scope.on(), () => {
    e.scope.off(), So(t);
  };
}, Bl = () => {
  je && je.scope.off(), So(null);
};
function Hu(e) {
  return e.vnode.shapeFlag & 4;
}
let Rr = !1;
function Zg(e, t = !1, n = !1) {
  t && xr(t);
  const { props: r, children: o } = e.vnode, s = Hu(e);
  Og(e, r, s, t), Hg(e, o, n || t);
  const l = s ? Jg(e, t) : void 0;
  return t && xr(!1), l;
}
function Jg(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, mg);
  const { setup: r } = n;
  if (r) {
    At();
    const o = e.setupContext = r.length > 1 ? ep(e) : null, s = Dr(e), l = Ar(
      r,
      e,
      0,
      [
        e.props,
        o
      ]
    ), u = Pa(l);
    if (Dt(), s(), (u || e.sp) && !hr(e) && du(e), u) {
      if (l.then(Bl, Bl), t)
        return l.then((c) => {
          xr(!0);
          try {
            Nl(e, c, t);
          } finally {
            xr(!1);
          }
        }).catch((c) => {
          Ho(c, e, 0);
        });
      e.asyncDep = l;
    } else
      Nl(e, l);
  } else
    Lu(e);
}
function Nl(e, t, n) {
  Z(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : pe(t) && (e.setupState = ru(t)), Lu(e);
}
function Lu(e, t, n) {
  const r = e.type;
  e.render || (e.render = r.render || pt);
  {
    const o = Dr(e);
    At();
    try {
      yg(e);
    } finally {
      Dt(), o();
    }
  }
}
const Qg = {
  get(e, t) {
    return Oe(e, "get", ""), e[t];
  }
};
function ep(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Qg),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function As(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(ru(Bd(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in vr)
        return vr[n](e);
    },
    has(t, n) {
      return n in t || n in vr;
    }
  })) : e.proxy;
}
function tp(e) {
  return Z(e) && "__vccOpts" in e;
}
const V = (e, t) => /* @__PURE__ */ qd(e, t, Rr), np = "3.5.42";
/**
* @vue/runtime-dom v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let ns;
const $l = typeof window < "u" && window.trustedTypes;
if ($l)
  try {
    ns = /* @__PURE__ */ $l.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const ju = ns ? (e) => ns.createHTML(e) : (e) => e, rp = "http://www.w3.org/2000/svg", op = "http://www.w3.org/1998/Math/MathML", Ct = typeof document < "u" ? document : null, Wl = Ct && /* @__PURE__ */ Ct.createElement("template"), ip = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const o = t === "svg" ? Ct.createElementNS(rp, e) : t === "mathml" ? Ct.createElementNS(op, e) : n ? Ct.createElement(e, { is: n }) : Ct.createElement(e);
    return e === "select" && r && r.multiple != null && o.setAttribute("multiple", r.multiple), o;
  },
  createText: (e) => Ct.createTextNode(e),
  createComment: (e) => Ct.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Ct.querySelector(e),
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
      Wl.innerHTML = ju(
        r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e
      );
      const u = Wl.content;
      if (r === "svg" || r === "mathml") {
        const c = u.firstChild;
        for (; c.firstChild; )
          u.appendChild(c.firstChild);
        u.removeChild(c);
      }
      t.insertBefore(u, n);
    }
    return [
      // first
      l ? l.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, sp = /* @__PURE__ */ Symbol("_vtc");
function lp(e, t, n) {
  const r = e[sp];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Ul = /* @__PURE__ */ Symbol("_vod"), ap = /* @__PURE__ */ Symbol("_vsh"), up = /* @__PURE__ */ Symbol(""), cp = /(?:^|;)\s*display\s*:/;
function fp(e, t, n) {
  const r = e.style, o = Se(n);
  let s = !1;
  if (n && !o) {
    if (t)
      if (Se(t))
        for (const l of t.split(";")) {
          const u = l.slice(0, l.indexOf(":")).trim();
          n[u] == null && ur(r, u, "");
        }
      else
        for (const l in t)
          n[l] == null && ur(r, l, "");
    for (const l in n) {
      l === "display" && (s = !0);
      const u = n[l];
      u != null ? gp(
        e,
        l,
        !Se(t) && t ? t[l] : void 0,
        u
      ) || ur(r, l, u) : ur(r, l, "");
    }
  } else if (o) {
    if (t !== n) {
      const l = r[up];
      l && (n += ";" + l), r.cssText = n, s = cp.test(n);
    }
  } else t && e.removeAttribute("style");
  Ul in e && (e[Ul] = s ? r.display : "", e[ap] && (r.display = "none"));
}
const ro = /\s*!important$/;
function ur(e, t, n) {
  if (G(n))
    n.forEach((r) => ur(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--"))
    ro.test(n) ? e.setProperty(t, n.replace(ro, ""), "important") : e.setProperty(t, n);
  else {
    const r = dp(e, t);
    ro.test(n) ? e.setProperty(
      cn(r),
      n.replace(ro, ""),
      "important"
    ) : e[r] = n;
  }
}
const ql = ["Webkit", "Moz", "ms"], Hi = {};
function dp(e, t) {
  const n = Hi[t];
  if (n)
    return n;
  let r = tt(t);
  if (r !== "filter" && r in e)
    return Hi[t] = r;
  r = Ha(r);
  for (let o = 0; o < ql.length; o++) {
    const s = ql[o] + r;
    if (s in e)
      return Hi[t] = s;
  }
  return t;
}
function gp(e, t, n, r) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && Se(r) && n === r;
}
const Gl = "http://www.w3.org/1999/xlink";
function Xl(e, t, n, r, o, s = bd(t)) {
  r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Gl, t.slice(6, t.length)) : e.setAttributeNS(Gl, t, n) : n == null || s && !ja(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    s ? "" : ht(n) ? String(n) : n
  );
}
function Yl(e, t, n, r, o) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? ju(n) : n);
    return;
  }
  const s = e.tagName;
  if (t === "value" && s !== "PROGRESS" && // custom elements may use _value internally
  !s.includes("-")) {
    const u = s === "OPTION" ? e.getAttribute("value") || "" : e.value, c = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (u !== c || !("_value" in e)) && (e.value = c), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let l = !1;
  if (n === "" || n == null) {
    const u = typeof e[t];
    u === "boolean" ? n = ja(n) : n == null && u === "string" ? (n = "", l = !0) : u === "number" && (n = 0, l = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  l && e.removeAttribute(o || t);
}
function pp(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function hp(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const Zl = /* @__PURE__ */ Symbol("_vei");
function vp(e, t, n, r, o = null) {
  const s = e[Zl] || (e[Zl] = {}), l = s[t];
  if (r && l)
    l.value = r;
  else {
    const [u, c] = wp(t);
    if (r) {
      const d = s[t] = Sp(
        r,
        o
      );
      pp(e, u, d, c);
    } else l && (hp(e, u, l, c), s[t] = void 0);
  }
}
const mp = /(Once|Passive|Capture)$/, yp = /^on:?(?:Once|Passive|Capture)$/;
function wp(e) {
  let t, n;
  for (; (n = e.match(mp)) && !yp.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : cn(e.slice(2)), t];
}
let Li = 0;
const bp = /* @__PURE__ */ Promise.resolve(), _p = () => Li || (bp.then(() => Li = 0), Li = Date.now());
function Sp(e, t) {
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
      const l = o.slice(), u = [r];
      for (let c = 0; c < l.length && !r._stopped; c++) {
        const d = l[c];
        d && ot(
          d,
          t,
          5,
          u
        );
      }
    } else
      ot(
        o,
        t,
        5,
        [r]
      );
  };
  return n.value = e, n.attached = _p(), n;
}
const Jl = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, xp = (e, t, n, r, o, s) => {
  const l = o === "svg";
  t === "class" ? lp(e, r, l) : t === "style" ? fp(e, n, r) : Ao(t) ? Do(t) || vp(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Rp(e, t, r, l)) ? (Yl(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Xl(e, t, r, l, s, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Cp(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !Se(r))) ? Yl(e, tt(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), Xl(e, t, r, l));
};
function Rp(e, t, n, r) {
  if (r)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Jl(t) && Z(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return Jl(t) && Se(n) ? !1 : t in e;
}
function Cp(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const r = tt(t);
  return Array.isArray(n) ? n.some((o) => tt(o) === r) : Object.keys(n).some((o) => tt(o) === r);
}
const Mp = ["ctrl", "shift", "alt", "meta"], Ep = {
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
  exact: (e, t) => Mp.some((n) => e[`${n}Key`] && !t.includes(n))
}, Fe = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), r = t.join(".");
  return n[r] || (n[r] = (o, ...s) => {
    for (let l = 0; l < t.length; l++) {
      const u = Ep[t[l]];
      if (u && u(o, t)) return;
    }
    return e(o, ...s);
  });
}, Ip = /* @__PURE__ */ Te({ patchProp: xp }, ip);
let Ql;
function Ap() {
  return Ql || (Ql = jg(Ip));
}
const Dp = (...e) => {
  const t = Ap().createApp(...e), { mount: n } = t;
  return t.mount = (r) => {
    const o = Op(r);
    if (!o) return;
    const s = t._component;
    !Z(s) && !s.render && !s.template && (s.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const l = n(o, !1, kp(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), l;
  }, t;
};
function kp(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Op(e) {
  return Se(e) ? document.querySelector(e) : e;
}
function oo() {
  return !0;
}
const Pp = Symbol("merge-proxy"), go = Symbol("merge-proxy-sources"), Tp = {
  get(e, t, n) {
    return t === Pp ? n : t === go ? e.sources : e.get(t);
  },
  has(e, t) {
    return e.has(t);
  },
  set: oo,
  deleteProperty: oo,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: oo,
      deleteProperty: oo
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function po(e) {
  return e && typeof e == "object" && "value" in e ? e.value : e;
}
function rs(...e) {
  const t = e.flatMap((n) => typeof n == "object" && n !== null && go in n && Array.isArray(n[go]) ? n[go] : [n]);
  return new Proxy({
    sources: t,
    get(n) {
      for (let r = t.length - 1; r >= 0; r--) {
        const o = po(t[r])[n];
        if (o !== void 0) return o;
      }
    },
    has(n) {
      for (let r = t.length - 1; r >= 0; r--) if (n in po(t[r])) return !0;
      return !1;
    },
    keys() {
      const n = [];
      for (const r of t) n.push(...Object.keys(po(r)));
      return [...Array.from(new Set(n))];
    }
  }, Tp);
}
function ea(...e) {
  const t = {};
  for (let n of e)
    if (n = po(n), !!n)
      for (const r of Reflect.ownKeys(n)) {
        const o = n[r];
        o !== void 0 && (t[r] = o);
      }
  return t;
}
function zu(e) {
  return typeof e == "function" ? e : (t) => {
    var n;
    return (n = e.next) == null ? void 0 : n.call(e, t);
  };
}
function Fp(e) {
  return Object.assign(e, {
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: be(e, zu(t), { flush: "sync" }) })
  });
}
function Hp(e) {
  return Object.assign(e, {
    set: (t) => {
      e.value = typeof t == "function" ? t(e.value) : t;
    },
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: be(e, zu(t), { flush: "sync" }) })
  });
}
function Lp() {
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
    createReadonlyAtom: (t, n) => Fp(V(() => t())),
    createWritableAtom: (t, n) => Hp(/* @__PURE__ */ Nd(t)),
    untrack: (t) => t(),
    batch: (t) => t()
  };
}
function Vo(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function vt(e) {
  if (Array.isArray(e)) return e.map(vt);
  if (e && typeof e == "object") {
    const t = Object.getPrototypeOf(e);
    if (t !== Object.prototype && t !== null) return e;
    const n = t === null ? ie() : {}, r = Object.keys(e);
    for (let o = 0; o < r.length; o++) {
      const s = r[o];
      Object.defineProperty(n, s, {
        configurable: !0,
        enumerable: !0,
        value: vt(e[s]),
        writable: !0
      });
    }
    return n;
  }
  return e;
}
function Ku(e, t) {
  const n = Object.keys(t), r = e;
  for (let o = 0; o < n.length; o++) {
    const s = n[o];
    !s.startsWith("_memo_") && s !== "_cellsCache" && (r[s] = t[s]);
  }
  return e;
}
function ie() {
  return /* @__PURE__ */ Object.create(null);
}
function fn(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function kr(e, t) {
  return (n) => {
    var r;
    (((r = t.options.atoms) == null ? void 0 : r[e]) ?? t.baseAtoms[e]).set((o) => Vo(n, o));
  };
}
function ta(e) {
  if (typeof e != "object" || e === null) return !1;
  if (Array.isArray(e)) return !0;
  const t = Object.getPrototypeOf(e);
  return t === Object.prototype || t === null;
}
function na(e) {
  return Reflect.ownKeys(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
const jp = 3;
function zp(e, t) {
  return Vu(e, t, jp);
}
function Vu(e, t, n) {
  if (Object.is(e, t)) return !0;
  if (n <= 0 || !ta(e) || !ta(t) || (Array.isArray(e) || Array.isArray(t)) && (!Array.isArray(e) || !Array.isArray(t) || e.length !== t.length))
    return !1;
  const r = na(e), o = na(t);
  if (r.length !== o.length) return !1;
  const s = e, l = t;
  for (let u = 0; u < r.length; u++) {
    const c = r[u];
    if (!Object.prototype.propertyIsEnumerable.call(t, c) || !Vu(s[c], l[c], n - 1)) return !1;
  }
  return !0;
}
function Bo(e, t, n, r = zp) {
  const o = `on${t.charAt(0).toUpperCase()}${t.slice(1)}Change`, s = e.options[o];
  s && s((l) => {
    const u = Vo(n, l);
    return r(l, u) ? l : u;
  });
}
function Kp(e) {
  return e instanceof Function;
}
function Vp(e, t) {
  const n = [], r = (o) => {
    o.forEach((s) => {
      n.push(s);
      const l = t(s);
      l.length && r(l);
    });
  };
  return r(e), n;
}
const Bp = ({ fn: e, memoDeps: t, onAfterCompare: n, onAfterUpdate: r, onBeforeCompare: o, onBeforeUpdate: s }) => {
  let l = [], u;
  return (d) => {
    o == null || o();
    const g = t == null ? void 0 : t(d);
    let v = !g || g.length !== (l == null ? void 0 : l.length);
    if (!v && g) {
      for (let y = 0; y < g.length; y++) if (g[y] !== l[y]) {
        v = !0;
        break;
      }
    }
    return n == null || n(v), v && (l = g, s == null || s(), u = e(...g ?? []), r == null || r(u)), u;
  };
};
function Bu(e) {
  let t = !1;
  return () => {
    if (!t) {
      t = !0;
      return;
    }
    e();
  };
}
function Or({ feature: e, fnName: t, objectId: n, onAfterUpdate: r, table: o, ...s }) {
  const l = () => {
    if (!r) return;
    const { schedule: c, untrack: d } = o._reactivity;
    c(() => d(() => r()));
  };
  return Bp({
    ...s,
    ...{ onAfterUpdate: () => {
      l();
    } }
  });
}
function Nu(e, t = "_") {
  const [n, r] = e.split(t);
  return {
    fnKey: r,
    fnName: `${n}.${r}`,
    parentName: n
  };
}
function mt(e, t, n) {
  for (const [r, { fn: o, memoDeps: s }] of Object.entries(n)) {
    const { fnKey: l, fnName: u } = Nu(r);
    t[l] = s ? Or({
      memoDeps: s,
      fn: o,
      fnName: u,
      table: t,
      feature: e
    }) : o;
  }
}
function it(e, t, n, r) {
  for (const [o, { fn: s, memoDeps: l }] of Object.entries(r)) {
    const { fnKey: u, fnName: c } = Nu(o);
    if (l) {
      const d = `_memo_${u}`;
      t[u] = function(...g) {
        if (!this[d]) {
          const v = this;
          this[d] = Or({
            memoDeps: (y) => l(v, y),
            fn: (...y) => s(v, ...y),
            fnName: c,
            objectId: v.id,
            table: n,
            feature: e
          });
        }
        return this[d](...g);
      };
    } else t[u] = function(...d) {
      return s(this, ...d);
    };
  }
}
function ee(e, t, n, ...r) {
  var o;
  return ((o = e[t]) == null ? void 0 : o.call(e, ...r)) ?? n(e, ...r);
}
function Np(e) {
  return e.row.getValue(e.column.id);
}
function $p(e) {
  return e.getValue() ?? e.table.options.renderFallbackValue;
}
function Wp(e) {
  return {
    table: e.table,
    column: e.column,
    row: e.row,
    cell: e,
    getValue: () => e.getValue(),
    renderValue: () => e.renderValue()
  };
}
const Up = { assignCellPrototype: (e, t) => {
  it("coreCellsFeature", e, t, {
    cell_getValue: { fn: (n) => Np(n) },
    cell_renderValue: { fn: (n) => $p(n) },
    cell_getContext: {
      fn: (n) => Wp(n),
      memoDeps: (n) => [n]
    }
  });
} };
function qp(e) {
  var t, n;
  if (!e._headerPrototype) {
    e._headerPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignHeaderPrototype) == null || n.call(t, e._headerPrototype, e);
  }
  return e._headerPrototype;
}
function $u(e, t, n) {
  const r = qp(e), o = Object.create(r);
  o.colSpan = 0, o.column = t, o.depth = n.depth, o.headerGroup = null, o.id = n.id ?? t.id, o.index = n.index, o.isPlaceholder = !!n.isPlaceholder, o.placeholderId = n.placeholderId, o.rowSpan = 0, o.subHeaders = [];
  const s = e._headerInstanceInitFns;
  for (let l = 0; l < s.length; l++) s[l](o);
  return o;
}
function dn() {
  return {
    start: [],
    end: []
  };
}
function Gp(e) {
  var s;
  const t = e.getAllColumns(), n = e.getAllLeafColumnsById(), { start: r } = ((s = e.atoms.columnPinning) == null ? void 0 : s.get()) ?? dn(), o = [];
  for (let l = 0; l < r.length; l++) {
    const u = n[r[l]];
    u && ee(u, "getIsVisible", Ze) && o.push(u);
  }
  return Cr(t, o, e, "start");
}
function Xp(e) {
  var s;
  const t = e.getAllColumns(), n = e.getAllLeafColumnsById(), { end: r } = ((s = e.atoms.columnPinning) == null ? void 0 : s.get()) ?? dn(), o = [];
  for (let l = 0; l < r.length; l++) {
    const u = n[r[l]];
    u && ee(u, "getIsVisible", Ze) && o.push(u);
  }
  return Cr(t, o, e, "end");
}
function Yp(e) {
  var s;
  const t = e.getAllColumns();
  let n = ee(e, "getVisibleLeafColumns", Ds);
  const { start: r, end: o } = ((s = e.atoms.columnPinning) == null ? void 0 : s.get()) ?? dn();
  if (r.length || o.length) {
    const l = [...r, ...o];
    n = n.filter((u) => !l.includes(u.id));
  }
  return Cr(t, n, e, "center");
}
function Zp(e) {
  var o;
  const { start: t } = ((o = e.atoms.columnPinning) == null ? void 0 : o.get()) ?? dn(), n = e.getAllLeafColumnsById(), r = [];
  for (let s = 0; s < t.length; s++) {
    const l = n[t[s]];
    l && r.push(l);
  }
  return r;
}
function Jp(e) {
  var o;
  const { end: t } = ((o = e.atoms.columnPinning) == null ? void 0 : o.get()) ?? dn(), n = e.getAllLeafColumnsById(), r = [];
  for (let s = 0; s < t.length; s++) {
    const l = n[t[s]];
    l && r.push(l);
  }
  return r;
}
function Qp(e) {
  var o;
  const { start: t, end: n } = ((o = e.atoms.columnPinning) == null ? void 0 : o.get()) ?? dn();
  if (!t.length && !n.length) return e.getAllLeafColumns();
  const r = [...t, ...n];
  return e.getAllLeafColumns().filter((s) => !r.includes(s.id));
}
function eh(e) {
  return ee(e, "getStartLeafColumns", Zp).filter((t) => ee(t, "getIsVisible", Ze));
}
function th(e) {
  return ee(e, "getEndLeafColumns", Jp).filter((t) => ee(t, "getIsVisible", Ze));
}
function nh(e) {
  return ee(e, "getCenterLeafColumns", Qp).filter((t) => ee(t, "getIsVisible", Ze));
}
function io(e, t) {
  return t ? t === "start" ? ee(e, "getStartVisibleLeafColumns", eh) : t === "end" ? ee(e, "getEndVisibleLeafColumns", th) : ee(e, "getCenterVisibleLeafColumns", nh) : ee(e, "getVisibleLeafColumns", Ds);
}
function Ze(e) {
  var r;
  const t = (r = e.table.atoms.columnVisibility) == null ? void 0 : r.get();
  if (!t) return !0;
  const n = e.columns;
  return n.length ? n.some((o) => ee(o, "getIsVisible", Ze)) : (fn(t, e.id) ? t[e.id] : void 0) ?? !0;
}
function Ds(e) {
  return e.getAllLeafColumns().filter((t) => ee(t, "getIsVisible", Ze));
}
function Wu(e, t = 1) {
  let n = t;
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    ee(o, "getIsVisible", Ze) && o.columns.length && (n = Math.max(n, Wu(o.columns, t + 1)));
  }
  return n;
}
function rh(e, t) {
  return e ? `${e}_${t}` : String(t);
}
function oh(e, t, n, r) {
  let o = e ?? "";
  return t && (o = o ? `${o}_${t}` : String(t)), n && (o = o ? `${o}_${n}` : n), r && (o = o ? `${o}_${r}` : r), o;
}
function ih(e, t) {
  let n = 0;
  for (let r = 0; r < e.length; r++) e[r].column === t && n++;
  return n;
}
function Uu(e, t, n, r, o, s) {
  const l = {
    depth: t,
    id: rh(r, t),
    headers: []
  }, u = [];
  for (let c = 0; c < e.length; c++) {
    if (!(c in e)) continue;
    const d = e[c], g = u[u.length - 1], v = d.column.depth === l.depth;
    let y, w = !1;
    if (v && d.column.parent ? y = d.column.parent : (y = d.column, w = !0), g && g.column === y) g.subHeaders.push(d);
    else {
      const D = $u(n, y, {
        id: oh(r, t, y.id, d.id),
        isPlaceholder: w,
        placeholderId: w ? String(ih(u, y)) : void 0,
        depth: t,
        index: u.length
      });
      D.subHeaders.push(d), u.push(D);
    }
    l.headers.push(d), d.headerGroup = l;
  }
  for (let c = 0; c < s.length; c++) s[c](l);
  o.push(l), t > 0 && Uu(u, t - 1, n, r, o, s);
}
function qu(e) {
  for (let t = 0; t < e.length; t++) {
    const n = e[t];
    if (!ee(n.column, "getIsVisible", Ze)) continue;
    let r = 0;
    if (n.subHeaders.length) {
      qu(n.subHeaders);
      for (let o = 0; o < n.subHeaders.length; o++) {
        const s = n.subHeaders[o];
        ee(s.column, "getIsVisible", Ze) && (r += s.colSpan);
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
function Cr(e, t, n, r) {
  var c;
  const o = Wu(e), s = [], l = n._headerGroupInstanceInitFns, u = new Array(t.length);
  for (let d = 0; d < t.length; d++)
    d in t && (u[d] = $u(n, t[d], {
      depth: o,
      index: d
    }));
  return Uu(u, o - 1, n, r, s, l), s.reverse(), qu(((c = s[0]) == null ? void 0 : c.headers) ?? []), s;
}
function sh(e) {
  var t, n;
  if (!e._columnPrototype) {
    e._columnPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignColumnPrototype) == null || n.call(t, e._columnPrototype, e);
  }
  return e._columnPrototype;
}
function lh(e, t, n, r) {
  const o = {
    ...e.getDefaultColumnDef(),
    ...t
  }, s = o.accessorKey, l = s === void 0 ? void 0 : String(s), u = o.id ?? (l == null ? void 0 : l.replaceAll(".", "_")) ?? (typeof o.header == "string" ? o.header : void 0);
  let c;
  if (o.accessorFn) c = o.accessorFn;
  else if (s !== void 0) if (typeof s == "string" && s.includes(".")) {
    const y = s.split(".");
    c = (w) => {
      let D = w;
      for (let R = 0; R < y.length; R++) {
        const A = y[R];
        D = D == null ? void 0 : D[A];
      }
      return D;
    };
  } else c = (y) => y[o.accessorKey];
  if (!u)
    throw new Error();
  const d = sh(e), g = Object.create(d);
  g.accessorFn = c, g.columnDef = o, g.columns = [], g.depth = n, g.id = `${String(u)}`, g.parent = r;
  const v = e._columnInstanceInitFns;
  for (let y = 0; y < v.length; y++) v[y](g);
  return g;
}
function Gu(e) {
  var n;
  const t = (n = e.atoms.columnOrder) == null ? void 0 : n.get();
  return (r) => {
    let o = [];
    if (!(t != null && t.length)) o = r;
    else {
      const s = /* @__PURE__ */ new Map();
      for (let l = 0; l < r.length; l++) {
        const u = r[l];
        s.set(u.id, u);
      }
      for (let l = 0; l < t.length; l++) {
        const u = t[l], c = s.get(u);
        c && (o.push(c), s.delete(u));
      }
      for (let l = 0; l < r.length; l++) {
        const u = r[l];
        s.has(u.id) && o.push(u);
      }
    }
    return ah(e, o);
  };
}
function ah(e, t) {
  var u;
  const n = ((u = e.atoms.grouping) == null ? void 0 : u.get()) ?? [], { groupedColumnMode: r } = e.options;
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
function uh(e) {
  return [e, ...e.columns.flatMap((t) => t.getFlatColumns())];
}
function ch(e) {
  if (e.columns.length) {
    const t = e.columns.flatMap((n) => n.getLeafColumns());
    return ee(e.table, "getOrderColumns", Gu)(t);
  }
  return [e];
}
function fh(e) {
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
function Xu(e, t, n, r = 0) {
  const o = new Array(t.length);
  for (let s = 0; s < t.length; s++) {
    if (!(s in t)) continue;
    const l = t[s], u = lh(e, l, r, n), c = l;
    u.columns = c.columns ? Xu(e, c.columns, u, r + 1) : [], o[s] = u;
  }
  return o;
}
function dh(e) {
  return Xu(e, e.options.columns);
}
function gh(e) {
  return e.getAllColumns().flatMap((t) => t.getFlatColumns());
}
function ph(e) {
  const t = ie(), n = e.getAllFlatColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function hh(e) {
  const t = e.getAllColumns().flatMap((n) => n.getLeafColumns());
  return ee(e, "getOrderColumns", Gu)(t);
}
function vh(e) {
  const t = ie(), n = e.getAllLeafColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function mh(e, t) {
  return e.getAllFlatColumnsById()[t];
}
const yh = {
  assignColumnPrototype: (e, t) => {
    it("coreColumnsFeature", e, t, {
      column_getFlatColumns: {
        fn: (n) => uh(n),
        memoDeps: (n) => [n.table.options.columns]
      },
      column_getLeafColumns: {
        fn: (n) => ch(n),
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
    mt("coreColumnsFeature", e, {
      table_getDefaultColumnDef: {
        fn: () => fh(e),
        memoDeps: () => [e.options.defaultColumn]
      },
      table_getAllColumns: {
        fn: () => dh(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumns: {
        fn: () => gh(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumnsById: {
        fn: () => ph(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllLeafColumns: {
        fn: () => hh(e),
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
        fn: () => vh(e),
        memoDeps: () => [e.getAllLeafColumns()]
      },
      table_getColumn: { fn: (t) => mh(e, t) }
    });
  }
};
function Yu(e, t) {
  for (let n = 0; n < e.subHeaders.length; n++) Yu(e.subHeaders[n], t);
  t.push(e);
}
function wh(e) {
  const t = [];
  return Yu(e, t), t;
}
function bh(e) {
  return {
    column: e.column,
    header: e,
    table: e.column.table
  };
}
function _h(e) {
  var d;
  const { start: t, end: n } = ((d = e.atoms.columnPinning) == null ? void 0 : d.get()) ?? dn(), r = e.getAllColumns(), o = ee(e, "getVisibleLeafColumns", Ds);
  if (!t.length && !n.length) return Cr(r, o, e);
  const s = e.getAllLeafColumnsById(), l = [];
  for (let g = 0; g < t.length; g++) {
    const v = s[t[g]];
    v && ee(v, "getIsVisible", Ze) && l.push(v);
  }
  const u = [];
  for (let g = 0; g < n.length; g++) {
    const v = s[n[g]];
    v && ee(v, "getIsVisible", Ze) && u.push(v);
  }
  const c = o.filter((g) => !t.includes(g.id) && !n.includes(g.id));
  return Cr(r, [
    ...l,
    ...c,
    ...u
  ], e);
}
function Sh(e) {
  return [...e.getHeaderGroups()].reverse();
}
function xh(e) {
  const t = e.getHeaderGroups(), n = [];
  for (let r = 0; r < t.length; r++) {
    const o = t[r].headers;
    for (let s = 0; s < o.length; s++) n.push(o[s]);
  }
  return n;
}
function Rh(e) {
  var r;
  const t = ((r = e.getHeaderGroups()[0]) == null ? void 0 : r.headers) ?? [], n = [];
  for (let o = 0; o < t.length; o++) {
    const s = t[o].getLeafHeaders();
    for (let l = 0; l < s.length; l++) n.push(s[l]);
  }
  return n;
}
const Ch = {
  assignHeaderPrototype: (e, t) => {
    it("coreHeadersFeature", e, t, {
      header_getLeafHeaders: {
        fn: (n) => wh(n),
        memoDeps: (n) => [n.column.table.options.columns]
      },
      header_getContext: {
        fn: (n) => bh(n),
        memoDeps: (n) => [n.column.table.options.columns]
      }
    });
  },
  constructTableAPIs: (e) => {
    mt("coreHeadersFeature", e, {
      table_getHeaderGroups: {
        fn: () => _h(e),
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
        fn: () => Sh(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getFlatHeaders: {
        fn: () => xh(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getLeafHeaders: {
        fn: () => Rh(e),
        memoDeps: () => [e.getHeaderGroups()]
      }
    });
  }
};
function Mh(e) {
  var t, n;
  if (!e._rowPrototype) {
    e._rowPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignRowPrototype) == null || n.call(t, e._rowPrototype, e);
  }
  return e._rowPrototype;
}
const Eh = (e, t, n, r, o, s, l) => {
  const u = Mh(e), c = Object.create(u);
  c._displayIndexCache = -1, c._uniqueValuesCache = ie(), c._valuesCache = ie(), c.depth = o, c.id = t, c.index = r, c.original = n, c.parentId = l, c.subRows = [];
  const d = e._rowInstanceInitFns;
  for (let g = 0; g < d.length; g++) d[g](c);
  return c;
}, Ih = /([0-9]+)/gm;
function Hn(e) {
  const t = Object.assign((n, r, o) => {
    let s = n.getValue(o), l = r.getValue(o);
    const u = t.resolveDataValue;
    return u && (s = u(s), l = u(l)), t.sort(s, l, n, r, o);
  }, e);
  return t;
}
const Ah = Hn({
  resolveDataValue: (e) => No(e).toLowerCase(),
  sort: (e, t) => Ju(e, t)
});
Hn({
  resolveDataValue: (e) => No(e),
  sort: (e, t) => Ju(e, t)
});
const Dh = Hn({
  resolveDataValue: (e) => No(e).toLowerCase(),
  sort: (e, t) => ks(e, t)
});
Hn({
  resolveDataValue: (e) => No(e),
  sort: (e, t) => ks(e, t)
});
Hn({
  resolveDataValue: (e) => kh(e),
  sort: (e, t) => e > t ? 1 : e < t ? -1 : 0
});
const Zu = Hn({ sort: (e, t) => ks(e, t) });
function ks(e, t) {
  return e === t ? 0 : e > t ? 1 : -1;
}
function kh(e) {
  return e instanceof Date ? e.getTime() : e;
}
function No(e) {
  return typeof e == "number" ? isNaN(e) || e === 1 / 0 || e === -1 / 0 ? "" : String(e) : typeof e == "string" ? e : "";
}
function Ju(e, t) {
  let n = 0, r = 0;
  const o = e.length, s = t.length;
  for (; n < o && r < s; ) {
    const l = xo(e.charCodeAt(n)), u = xo(t.charCodeAt(r)), c = os(e, n, l), d = os(t, r, u);
    if (!l && !u) {
      const v = Oh(e, n, c, t, r, d);
      if (v) return v;
      n = c, r = d;
      continue;
    }
    if (l !== u) return l ? 1 : -1;
    const g = Ph(e, n, c, t, r, d);
    if (g) return g;
    n = c, r = d;
  }
  return oa(e, n) - oa(t, r);
}
function xo(e) {
  return e >= 48 && e <= 57;
}
function os(e, t, n) {
  let r = t + 1;
  for (; r < e.length && xo(e.charCodeAt(r)) === n; ) r++;
  return r;
}
function Oh(e, t, n, r, o, s) {
  const l = n - t, u = s - o, c = l < u ? l : u;
  for (let d = 0; d < c; d++) {
    const g = e.charCodeAt(t + d), v = r.charCodeAt(o + d);
    if (g > v) return 1;
    if (v > g) return -1;
  }
  return l > u ? 1 : u > l ? -1 : 0;
}
function Ph(e, t, n, r, o, s) {
  let l = t;
  for (; l < n && e.charCodeAt(l) === 48; ) l++;
  let u = o;
  for (; u < s && r.charCodeAt(u) === 48; ) u++;
  const c = n - l, d = s - u;
  if (c === 0 && d === 0) return 0;
  if (c <= 15 && d <= 15) {
    const y = ra(e, l, n), w = ra(r, u, s);
    return y > w ? 1 : w > y ? -1 : 0;
  }
  const g = parseInt(e.slice(t, n), 10), v = parseInt(r.slice(o, s), 10);
  return g > v ? 1 : v > g ? -1 : 0;
}
function ra(e, t, n) {
  let r = 0;
  for (let o = t; o < n; o++) r = r * 10 + e.charCodeAt(o) - 48;
  return r;
}
function oa(e, t) {
  let n = 0, r = t;
  for (; r < e.length; )
    n++, r = os(e, r, xo(e.charCodeAt(r)));
  return n;
}
function Th() {
  return [];
}
function Fh(e, t) {
  Bo(e, "cellSelection", vt(e.initialState.cellSelection) ?? Th());
}
function Hh(e) {
  e.atoms.cellSelection && (e.options.autoResetAll ?? e.options.autoResetCellSelection ?? !0) && e._reactivity.schedule(() => Fh(e));
}
function Lh() {
  return ie();
}
function Qu(e) {
  e.atoms.expanded && (e.options.autoResetAll ?? e.options.autoResetExpanded ?? !e.options.manualExpanding) && e._reactivity.schedule(() => tc(e));
}
function Ro(e, t) {
  var n, r;
  (r = (n = e.options).onExpandedChange) == null || r.call(n, t);
}
function ec(e, t) {
  var r;
  const n = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t ?? !rc(e)) {
    if (n === !0 || !nc(e)) return;
    Ro(e, !0);
  } else {
    if (n !== !0 && !Object.keys(n).length) return;
    Ro(e, ie());
  }
}
function tc(e, t) {
  const n = e.initialState.expanded;
  Bo(e, "expanded", t ? ie() : n === !0 ? !0 : Object.assign(ie(), vt(n ?? {})));
}
function nc(e) {
  return e.getPrePaginatedRowModel().flatRows.some((t) => un(t));
}
function jh(e) {
  return (t) => {
    ec(e);
  };
}
function zh(e) {
  var n;
  const t = ((n = e.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return t === !0 || Object.values(t).some(Boolean);
}
function rc(e) {
  var r;
  const t = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t === !0) return !0;
  if (!Object.keys(t).length) return !1;
  const n = e.getRowModel().flatRows.filter((o) => un(o));
  return !(!n.length || n.some((o) => !$o(o)));
}
function Kh(e) {
  var r;
  let t = 0;
  const n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return (n === !0 ? Object.values(e.getRowModel().rowsById).filter((o) => un(o)).map((o) => o.id) : Object.keys(n ?? {})).forEach((o) => {
    const s = o.split(".");
    t = Math.max(t, s.length);
  }), t;
}
function oc(e, t) {
  var s;
  const n = ((s = e.table.atoms.expanded) == null ? void 0 : s.get()) ?? {}, r = n === !0 || is(n, e.id), o = t ?? !r;
  o !== r && (o && !un(e) || Ro(e.table, (l) => {
    const u = l === !0 ? !0 : is(l, e.id);
    let c = ie();
    if (l === !0 ? Object.values(e.table.getRowModel().rowsById).forEach((d) => {
      un(d) && (c[d.id] = !0);
    }) : c = Object.assign(ie(), l), !u && o)
      return c[e.id] = !0, c;
    if (u && !o) {
      const d = ie(), g = Object.keys(c);
      for (let v = 0; v < g.length; v++) {
        const y = g[v];
        y !== e.id && c[y] && (d[y] = !0);
      }
      return d;
    }
    return l;
  }));
}
function $o(e) {
  var n, r, o;
  const t = ((n = e.table.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return !!(((o = (r = e.table.options).getIsRowExpanded) == null ? void 0 : o.call(r, e)) ?? (t === !0 || is(t, e.id)));
}
function is(e, t) {
  return !!(e && e !== !0 && fn(e, t) && e[t]);
}
function un(e) {
  var t, n;
  return ((n = (t = e.table.options).getRowCanExpand) == null ? void 0 : n.call(t, e)) ?? ((e.table.options.enableExpanding ?? !0) && !!e.subRows.length);
}
function Vh(e) {
  let t = !0, n = e;
  for (; t && n.parentId; )
    n = e.table.getRow(n.parentId, !0), t = $o(n);
  return t;
}
function Bh(e) {
  const t = un(e);
  return () => {
    t && oc(e);
  };
}
const ss = 0;
function ic(e) {
  var t, n;
  if (e.options.autoResetAll ?? e.options.autoResetPageIndex ?? !e.options.manualPagination) {
    if ((((n = (t = e.atoms.pagination) == null ? void 0 : t.get()) == null ? void 0 : n.pageIndex) ?? ss) === ss) return;
    Wh(e);
  }
}
function Nh(e, t) {
  Bo(e, "pagination", t);
}
function $h(e, t) {
  Nh(e, (n) => {
    let r = Vo(t, n.pageIndex);
    const o = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
    return r = Math.max(0, Math.min(r, o)), {
      ...n,
      pageIndex: r
    };
  });
}
function Wh(e, t) {
  $h(e, ss);
}
function Uh() {
  return [];
}
function Wo(e, t) {
  Bo(e, "sorting", t);
}
function sc(e, t) {
  Wo(e, t ? [] : vt(e.initialState.sorting ?? []));
}
function qh(e) {
  e.atoms.sorting && (e.options.autoResetAll ?? e.options.autoResetSorting ?? !1) && sc(e);
}
function lc(e) {
  const t = e.table._rowModelFns.sortFns, n = e.table.getFilteredRowModel().flatRows.slice(0, 10);
  let r, o = !1;
  for (let s = 0; s < n.length; s++) {
    const l = n[s].getValue(e.id);
    if (Object.prototype.toString.call(l) === "[object Date]") {
      r = "datetime";
      break;
    }
    if (typeof l == "string" && (o = !0, l.split(Ih).length > 1)) {
      r = "alphanumeric";
      break;
    }
  }
  if (!r && o && (r = "text"), r) {
    let s = t == null ? void 0 : t[r];
    if (s || r === "alphanumeric" && (s = t == null ? void 0 : t.text), s) return s;
  }
  return Zu;
}
function ac(e) {
  const t = e.table.getFilteredRowModel().flatRows.slice(0, 10);
  for (let n = 0; n < t.length; n++) {
    const r = t[n].getValue(e.id);
    if (r != null)
      return typeof r == "string" ? "asc" : "desc";
  }
  return "desc";
}
function uc(e) {
  const t = e.table._rowModelFns.sortFns;
  return Kp(e.columnDef.sortFn) ? e.columnDef.sortFn : e.columnDef.sortFn === "auto" ? lc(e) : (t == null ? void 0 : t[e.columnDef.sortFn]) ?? Zu;
}
function cc(e, t, n) {
  const r = dc(e, n && Co(e)), o = typeof t < "u";
  Wo(e.table, (s) => {
    const l = s.findIndex((y) => y.id === e.id), u = l === -1 ? void 0 : s[l];
    let c = [], d;
    const g = o ? t : r === "desc", v = !!(s.length && Co(e) && n);
    return v ? u ? d = "toggle" : d = "add" : u ? d = "toggle" : d = "replace", d === "toggle" && (o || r || (d = "remove")), d === "add" ? (c = [...s, {
      id: e.id,
      desc: g
    }], c.splice(0, c.length - (e.table.options.maxMultiSortColCount ?? Number.MAX_SAFE_INTEGER))) : d === "toggle" ? c = v ? s.map((y) => y.id === e.id ? {
      ...y,
      desc: g
    } : y) : [{
      id: e.id,
      desc: g
    }] : d === "remove" ? c = v ? s.filter((y) => y.id !== e.id) : [] : c = [{
      id: e.id,
      desc: g
    }], c;
  });
}
function fc(e) {
  return e.columnDef.sortDescFirst ?? e.table.options.sortDescFirst ?? ac(e) === "desc" ? "desc" : "asc";
}
function dc(e, t) {
  const n = fc(e), r = gc(e);
  return r ? r !== n && (e.table.options.enableSortingRemoval ?? !0) && (!t || (e.table.options.enableMultiRemove ?? !0)) ? !1 : r === "desc" ? "asc" : "desc" : n;
}
function Os(e) {
  return (e.columnDef.enableSorting ?? !0) && (e.table.options.enableSorting ?? !0) && !!e.accessorFn;
}
function Co(e) {
  return e.columnDef.enableMultiSort ?? e.table.options.enableMultiSort ?? !!e.accessorFn;
}
function gc(e) {
  var n, r;
  const t = (r = (n = e.table.atoms.sorting) == null ? void 0 : n.get()) == null ? void 0 : r.find((o) => o.id === e.id);
  return t ? t.desc ? "desc" : "asc" : !1;
}
function Gh(e) {
  var t, n;
  return ((n = (t = e.table.atoms.sorting) == null ? void 0 : t.get()) == null ? void 0 : n.findIndex((r) => r.id === e.id)) ?? -1;
}
function Xh(e) {
  Wo(e.table, (t) => t.length ? t.filter((n) => n.id !== e.id) : []);
}
function Yh(e) {
  const t = Os(e);
  return (n) => {
    var r, o;
    t && cc(e, void 0, Co(e) ? (o = (r = e.table.options).isMultiSortEvent) == null ? void 0 : o.call(r, n) : !1);
  };
}
function pc() {
  return (e) => Or({
    feature: "coreRowModelsFeature",
    table: e,
    fnName: "table.getCoreRowModel",
    memoDeps: () => [e.options.data],
    fn: () => Zh(e, e.options.data),
    onAfterUpdate: Bu(() => {
      Qu(e), ic(e), qh(e), Hh(e);
    })
  });
}
function hc(e, t, n, r = 0, o) {
  var l;
  const s = [];
  for (let u = 0; u < n.length; u++) {
    const c = n[u], d = Eh(e, e.getRowId(c, u, o), c, u, r, void 0, o == null ? void 0 : o.id);
    t.flatRows.push(d), t.rowsById[d.id] = d, s.push(d), e.options.getSubRows && (d.originalSubRows = e.options.getSubRows(c, u), (l = d.originalSubRows) != null && l.length && (d.subRows = hc(e, t, d.originalSubRows, r + 1, d)));
  }
  return s;
}
function Zh(e, t) {
  const n = {
    rows: [],
    flatRows: [],
    rowsById: ie()
  };
  return n.rows = hc(e, n, t), n;
}
function Jh(e) {
  var t, n;
  return e._rowModels.coreRowModel || (e._rowModels.coreRowModel = ((n = (t = e.options.features).coreRowModel) == null ? void 0 : n.call(t, e)) ?? pc()(e)), e._rowModels.coreRowModel();
}
function Qh(e) {
  return e.getCoreRowModel();
}
function ev(e) {
  var t, n;
  return e._rowModels.filteredRowModel || (e._rowModels.filteredRowModel = (n = (t = e.options.features).filteredRowModel) == null ? void 0 : n.call(t, e)), e.options.manualFiltering || !e._rowModels.filteredRowModel ? e.getPreFilteredRowModel() : e._rowModels.filteredRowModel();
}
function tv(e) {
  return e.getFilteredRowModel();
}
function nv(e) {
  var t, n;
  return e._rowModels.groupedRowModel || (e._rowModels.groupedRowModel = (n = (t = e.options.features).groupedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualGrouping || !e._rowModels.groupedRowModel ? e.getPreGroupedRowModel() : e._rowModels.groupedRowModel();
}
function rv(e) {
  return e.getGroupedRowModel();
}
function ov(e) {
  var t, n;
  return e._rowModels.sortedRowModel || (e._rowModels.sortedRowModel = (n = (t = e.options.features).sortedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualSorting || !e._rowModels.sortedRowModel ? e.getPreSortedRowModel() : e._rowModels.sortedRowModel();
}
function iv(e) {
  return e.getSortedRowModel();
}
function sv(e) {
  var t, n;
  return e._rowModels.expandedRowModel || (e._rowModels.expandedRowModel = (n = (t = e.options.features).expandedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualExpanding || !e._rowModels.expandedRowModel ? e.getPreExpandedRowModel() : e._rowModels.expandedRowModel();
}
function lv(e) {
  return e.getExpandedRowModel();
}
function av(e) {
  var t, n;
  return e._rowModels.paginatedRowModel || (e._rowModels.paginatedRowModel = (n = (t = e.options.features).paginatedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualPagination || !e._rowModels.paginatedRowModel ? e.getPrePaginatedRowModel() : e._rowModels.paginatedRowModel();
}
function uv(e) {
  return e.getPaginatedRowModel();
}
const cv = { constructTableAPIs: (e) => {
  mt("coreRowModelsFeature", e, {
    table_getCoreRowModel: { fn: () => Jh(e) },
    table_getPreFilteredRowModel: { fn: () => Qh(e) },
    table_getFilteredRowModel: { fn: () => ev(e) },
    table_getPreGroupedRowModel: { fn: () => tv(e) },
    table_getGroupedRowModel: { fn: () => nv(e) },
    table_getPreSortedRowModel: { fn: () => rv(e) },
    table_getSortedRowModel: { fn: () => ov(e) },
    table_getPreExpandedRowModel: { fn: () => iv(e) },
    table_getExpandedRowModel: { fn: () => sv(e) },
    table_getPrePaginatedRowModel: { fn: () => lv(e) },
    table_getPaginatedRowModel: { fn: () => av(e) },
    table_getRowModel: { fn: () => uv(e) }
  });
} };
function fv(e) {
  var t, n;
  if (!e._cellPrototype) {
    e._cellPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignCellPrototype) == null || n.call(t, e._cellPrototype, e);
  }
  return e._cellPrototype;
}
function dv(e, t, n) {
  const r = fv(n), o = Object.create(r);
  o.column = e, o.id = `${t.id}_${e.id}`, o.row = t;
  const s = n._cellInstanceInitFns;
  for (let l = 0; l < s.length; l++) s[l](o);
  return o;
}
function gv(e) {
  const t = e.table.getRowsInDisplayOrder(), n = e._displayIndexCache;
  return t[n] === e ? n : -1;
}
function pv(e) {
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
function hv(e, t) {
  if (fn(e._valuesCache, t)) return e._valuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return e._valuesCache[t] = n.accessorFn(e.original, e.index), e._valuesCache[t];
}
function vv(e, t) {
  if (fn(e._uniqueValuesCache, t)) return e._uniqueValuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return n.columnDef.getUniqueValues ? (e._uniqueValuesCache[t] = n.columnDef.getUniqueValues(e.original, e.index), e._uniqueValuesCache[t]) : (e._uniqueValuesCache[t] = [e.getValue(t)], e._uniqueValuesCache[t]);
}
function mv(e, t) {
  return e.getValue(t) ?? e.table.options.renderFallbackValue;
}
function yv(e) {
  return Vp(e.subRows, (t) => t.subRows);
}
function wv(e) {
  const t = e.getCoreRowModel().flatRows;
  let n = 0;
  for (let r = 0; r < t.length; r++) n = Math.max(n, t[r].depth);
  return n;
}
function bv(e) {
  if (e.parentId)
    return e.table.getCoreRowModel().rowsById[e.parentId] ?? e.table.getRow(e.parentId, !0);
}
function _v(e) {
  const t = [];
  let n = e;
  for (; ; ) {
    const r = n.getParentRow();
    if (!r) break;
    t.push(r), n = r;
  }
  return t.reverse();
}
function Sv(e) {
  const t = e.table.getAllLeafColumns();
  let n = e._cellsCache;
  n || (n = e._cellsCache = /* @__PURE__ */ new WeakMap());
  const r = new Array(t.length);
  for (let o = 0; o < t.length; o++) {
    const s = t[o];
    let l = n.get(s);
    l || (l = dv(s, e, e.table), n.set(s, l)), r[o] = l;
  }
  return r;
}
function xv(e) {
  const t = ie(), n = e.getAllCells();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.column.id] = o;
  }
  return t;
}
function Rv(e, t, n, r) {
  var o, s;
  return ((s = (o = t.options).getRowId) == null ? void 0 : s.call(o, e, n, r)) ?? (r ? `${r.id}.${n}` : String(n));
}
function Cv(e, t, n) {
  let r = (n ? e.getPrePaginatedRowModel() : e.getRowModel()).rowsById[t];
  if (!r && (r = e.getCoreRowModel().rowsById[t], !r))
    throw new Error();
  return r;
}
const Mv = {
  assignRowPrototype: (e, t) => {
    it("coreRowsFeature", e, t, {
      row_getDisplayIndex: { fn: (n) => gv(n) },
      row_getAllCellsByColumnId: {
        fn: (n) => xv(n),
        memoDeps: (n) => [n.getAllCells()]
      },
      row_getAllCells: {
        fn: (n) => Sv(n),
        memoDeps: (n) => [n.table.getAllLeafColumns()]
      },
      row_getLeafRows: {
        fn: (n) => yv(n),
        memoDeps: (n) => [n.subRows]
      },
      row_getParentRow: { fn: (n) => bv(n) },
      row_getParentRows: { fn: (n) => _v(n) },
      row_getUniqueValues: { fn: (n, r) => vv(n, r) },
      row_getValue: { fn: (n, r) => hv(n, r) },
      row_renderValue: { fn: (n, r) => mv(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    mt("coreRowsFeature", e, {
      table_getRowsInDisplayOrder: {
        fn: () => pv(e),
        memoDeps: () => {
          var t;
          return [
            e.getPrePaginatedRowModel().rows,
            e.options.paginateExpandedRows,
            e.options.paginateExpandedRows === !1 ? (t = e.atoms.expanded) == null ? void 0 : t.get() : void 0
          ];
        }
      },
      table_getRowId: { fn: (t, n, r) => Rv(t, e, n, r) },
      table_getRow: { fn: (t, n) => Cv(e, t, n) },
      table_getMaxSubRowDepth: {
        fn: () => wv(e),
        memoDeps: () => [e.getCoreRowModel()]
      }
    });
  }
};
function vc(e, t, n = (r, o) => r === o) {
  const r = t === void 0 ? e.options.state : t;
  e._reactivity.batch(() => {
    if (r) for (const o in r) {
      const s = e.baseAtoms[o];
      if (!s) continue;
      const l = r[o], u = l === void 0 ? e.initialState[o] : l;
      n(e._reactivity.untrack(() => s.get()), u) || s.set(() => u);
    }
  });
}
function Ev(e, t, n = (r, o) => r === o) {
  e._reactivity.batch(() => {
    var r, o;
    vc(e, t, n), (o = (r = e._reactivity).commit) == null || o.call(r);
  });
}
function Iv(e) {
  var r, o;
  const t = vt(e.initialState);
  e._reactivity.batch(() => {
    const s = Object.keys(t);
    for (let l = 0; l < s.length; l++) {
      const u = s[l];
      e.baseAtoms[u].set(t[u]);
    }
  });
  const n = Object.values(e._features);
  for (let s = 0; s < n.length; s++) (o = (r = n[s]).resetTableInstanceData) == null || o.call(r, e);
}
function Av(e, t) {
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
function Dv(e, t, n) {
  const r = Av(e, Vo(t, e.options));
  e.optionsStore ? e.optionsStore.set(() => r) : e.options = r, Ev(e, r.state ?? null);
}
const kv = { constructTableAPIs: (e) => {
  mt("coreTablesFeature", e, {
    table_reset: { fn: () => Iv(e) },
    table_setOptions: { fn: (t) => Dv(e, t) }
  });
} }, Ov = {
  coreCellsFeature: Up,
  coreColumnsFeature: yh,
  coreHeadersFeature: Ch,
  coreRowModelsFeature: cv,
  coreRowsFeature: Mv,
  coreTablesFeature: kv
};
function Pv(e) {
  const t = e;
  return Object.defineProperty(e, "state", { get() {
    return e.get();
  } }), "set" in e && (t.setState = e.set.bind(e)), t;
}
function Tv(e, t) {
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
  const n = ia(e);
  if (n.length !== ia(t).length) return !1;
  for (let r = 0; r < n.length; r++) if (!Object.prototype.hasOwnProperty.call(t, n[r]) || !Object.is(e[n[r]], t[n[r]])) return !1;
  return !0;
}
function ia(e) {
  return Object.keys(e).concat(Object.getOwnPropertySymbols(e));
}
function Fv(e, t = {}) {
  return Object.values(e).forEach((n) => {
    var r;
    t = ((r = n.getInitialState) == null ? void 0 : r.call(n, t)) ?? t;
  }), vt(t);
}
function Hv(e) {
  var z, J;
  const t = e.features.coreReactivityFeature, { aggregationFns: n, columnMeta: r, coreRowModel: o, expandedRowModel: s, facetedMinMaxValues: l, facetedRowModel: u, facetedUniqueValues: c, filterFns: d, filterMeta: g, filteredRowModel: v, groupedRowModel: y, paginatedRowModel: w, sortFns: D, sortedRowModel: R, tableMeta: A, ...K } = e.features, x = {
    _cellInstanceInitFns: [],
    _columnInstanceInitFns: [],
    _features: {
      ...Ov,
      ...K
    },
    _headerGroupInstanceInitFns: [],
    _headerInstanceInitFns: [],
    _reactivity: t,
    _rowInstanceInitFns: [],
    _rowModelFns: {
      aggregationFns: n,
      filterFns: d,
      sortFns: D
    },
    _rowModels: {},
    atoms: {},
    baseAtoms: {}
  }, j = Object.values(x._features), _ = {
    ...j.reduce((W, L) => {
      var U;
      return Object.assign(W, (U = L.getDefaultTableOptions) == null ? void 0 : U.call(L, x));
    }, {}),
    ...e
  };
  if (t.wrapExternalAtoms && _.atoms) for (const [W, L] of Object.entries(_.atoms)) {
    const U = L, se = t.createWritableAtom(U.get(), { debugName: `externalAtom/${W}` });
    _.atoms[W] = se;
    let fe = !1;
    const te = U.subscribe((xe) => {
      fe || se.set(xe);
    }), we = se.subscribe((xe) => {
      fe = !0, U.set(xe), fe = !1;
    });
    t.addSubscription(te), t.addSubscription(we);
  }
  t.createOptionsStore ? (x.optionsStore = t.createWritableAtom(_, { debugName: "table/optionsStore" }), Object.defineProperty(x, "options", {
    configurable: !0,
    enumerable: !0,
    get() {
      return x.optionsStore.get();
    },
    set(W) {
      x.optionsStore.set(() => W);
    }
  })) : x.options = _, x.initialState = Fv(x._features, x.options.initialState);
  const O = Object.keys(x.initialState);
  for (let W = 0; W < O.length; W++) {
    const L = O[W];
    x.baseAtoms[L] = t.createWritableAtom(x.initialState[L], { debugName: `table/baseAtoms/${L}` }), x.atoms[L] = t.createReadonlyAtom(() => {
      var we;
      const U = x.options, se = (we = U.atoms) == null ? void 0 : we[L], fe = se ? se.get() : x.baseAtoms[L].get();
      if (se) return fe;
      const te = U.state;
      if (te && fn(te, L)) {
        const xe = te[L];
        return xe === void 0 ? x.initialState[L] : xe;
      }
      return fe;
    }, { debugName: `table/atoms/${L}` });
  }
  vc(x), x.store = Pv(t.createReadonlyAtom(() => {
    const W = {};
    for (let L = 0; L < O.length; L++) {
      const U = O[L];
      W[U] = x.atoms[U].get();
    }
    return W;
  }, {
    compare: Tv,
    debugName: "table/store"
  }));
  for (let W = 0; W < j.length; W++) {
    const L = j[W];
    (z = L.initTableInstanceData) == null || z.call(L, x), L.initCellInstanceData && x._cellInstanceInitFns.push(L.initCellInstanceData.bind(L)), L.initColumnInstanceData && x._columnInstanceInitFns.push(L.initColumnInstanceData.bind(L)), L.initHeaderGroupInstanceData && x._headerGroupInstanceInitFns.push(L.initHeaderGroupInstanceData.bind(L)), L.initHeaderInstanceData && x._headerInstanceInitFns.push(L.initHeaderInstanceData.bind(L)), L.initRowInstanceData && x._rowInstanceInitFns.push(L.initRowInstanceData.bind(L)), (J = L.constructTableAPIs) == null || J.call(L, x);
  }
  return x;
}
function Lv() {
  return ie();
}
function mc() {
  return {
    size: 150,
    minSize: 20,
    maxSize: Number.MAX_SAFE_INTEGER
  };
}
function Uo(e) {
  var o;
  const t = mc(), n = (o = e.table.atoms.columnSizing) == null ? void 0 : o.get(), r = n && fn(n, e.id) ? n[e.id] : void 0;
  return Math.min(Math.max(e.columnDef.minSize ?? t.minSize, r ?? e.columnDef.size ?? t.size), e.columnDef.maxSize ?? t.maxSize);
}
function so(e) {
  const t = ie(), n = ie(), r = new Array(e.length);
  let o = 0;
  for (let l = 0; l < e.length; l++) {
    const u = e[l], c = ee(u, "getSize", Uo);
    r[l] = c, t[u.id] = o, o += c;
  }
  let s = 0;
  for (let l = e.length - 1; l >= 0; l--)
    n[e[l].id] = s, s += r[l];
  return {
    starts: t,
    afters: n
  };
}
function Ps(e) {
  return {
    all: so(io(e)),
    center: so(io(e, "center")),
    start: so(io(e, "start")),
    end: so(io(e, "end"))
  };
}
function yc(e) {
  return e === "start" ? "start" : e === "end" ? "end" : e === "center" ? "center" : "all";
}
function jv(e, t) {
  return ee(e.table, "getColumnOffsets", Ps)[yc(t)].starts[e.id] ?? 0;
}
function zv(e, t) {
  return ee(e.table, "getColumnOffsets", Ps)[yc(t)].afters[e.id] ?? 0;
}
function Kv(e) {
  qo(e.table, (t) => {
    const n = ie(), r = Object.keys(t);
    for (let o = 0; o < r.length; o++) {
      const s = r[o];
      s !== e.id && (n[s] = t[s]);
    }
    return n;
  });
}
function wc(e) {
  if (!e.subHeaders.length) return Uo(e.column);
  let t = 0;
  for (let n = 0; n < e.subHeaders.length; n++) t += wc(e.subHeaders[n]);
  return t;
}
function gn(e) {
  return wc(e);
}
function bc(e) {
  var t;
  if (e.index > 0) {
    const n = (t = e.headerGroup) == null ? void 0 : t.headers[e.index - 1];
    if (n) return ee(n, "getStart", bc) + ee(n, "getSize", gn);
  }
  return 0;
}
function qo(e, t) {
  var n, r;
  (r = (n = e.options).onColumnSizingChange) == null || r.call(n, t);
}
function Vv(e, t) {
  qo(e, t ? ie() : Object.assign(ie(), vt(e.initialState.columnSizing ?? {})));
}
function Bv(e) {
  var t;
  return ((t = e.getHeaderGroups()[0]) == null ? void 0 : t.headers.reduce((n, r) => n + gn(r), 0)) ?? 0;
}
function Nv(e) {
  var t;
  return ((t = ee(e, "getStartHeaderGroups", Gp)[0]) == null ? void 0 : t.headers.reduce((n, r) => n + gn(r), 0)) ?? 0;
}
function $v(e) {
  var t;
  return ((t = ee(e, "getCenterHeaderGroups", Yp)[0]) == null ? void 0 : t.headers.reduce((n, r) => n + gn(r), 0)) ?? 0;
}
function Wv(e) {
  var t;
  return ((t = ee(e, "getEndHeaderGroups", Xp)[0]) == null ? void 0 : t.headers.reduce((n, r) => n + gn(r), 0)) ?? 0;
}
function ls() {
  return {
    startOffset: null,
    startSize: null,
    deltaOffset: null,
    deltaPercentage: null,
    isResizingColumn: !1,
    columnSizingStart: []
  };
}
function _c(e) {
  return (e.columnDef.enableResizing ?? !0) && (e.table.options.enableColumnResizing ?? !0);
}
function Uv(e) {
  var t, n;
  return ((n = (t = e.table.atoms.columnResizing) == null ? void 0 : t.get()) == null ? void 0 : n.isResizingColumn) === e.id;
}
function qv(e, t) {
  const n = e.table.getColumn(e.column.id), r = _c(n);
  return (o) => {
    if (!r || ji(o) && o.touches.length > 1)
      return;
    const s = gn(e), l = e.getLeafHeaders().map((O) => [O.column.id, Uo(O.column)]), u = ji(o) ? Math.round(o.touches[0].clientX) : o.clientX, c = ie(), d = (O, z) => {
      if (typeof z != "number") return;
      const J = n.table, W = J.options.columnResizeMode === "onChange" || O === "end";
      J._reactivity.batch(() => {
        mr(J, (L) => {
          const U = J.options.columnResizeDirection === "rtl" ? -1 : 1, se = (z - (L.startOffset ?? 0)) * U, fe = L.startSize ?? 0, te = Math.max(fe > 0 ? se / fe : 0, -0.999999);
          if (W) {
            const we = L.columnSizingStart;
            for (let xe = 0; xe < we.length; xe++) {
              const de = we[xe], oe = de[1];
              c[de[0]] = Math.round(Math.max(oe > 0 ? oe + oe * te : se / we.length, 0) * 100) / 100;
            }
          }
          return {
            ...L,
            deltaOffset: se,
            deltaPercentage: te
          };
        }), W && qo(J, (L) => Object.assign(ie(), L, c));
      });
    };
    let g = null, v = !1, y;
    const w = () => {
      v ? (v = !1, d("move", y), g = requestAnimationFrame(w)) : g = null;
    }, D = (O) => {
      if (y = O, typeof requestAnimationFrame != "function") {
        d("move", O);
        return;
      }
      if (g !== null) {
        v = !0;
        return;
      }
      d("move", O), g = requestAnimationFrame(w);
    }, R = (O) => {
      g !== null && (cancelAnimationFrame(g), g = null, v = !1), n.table._reactivity.batch(() => {
        d("end", O ?? y), mr(n.table, (z) => ({
          ...z,
          isResizingColumn: !1,
          startOffset: null,
          startSize: null,
          deltaOffset: null,
          deltaPercentage: null,
          columnSizingStart: []
        }));
      });
    }, A = t || (typeof document < "u" ? document : null), K = {
      moveHandler: (O) => D(O.clientX),
      upHandler: (O) => {
        A == null || A.removeEventListener("mousemove", K.moveHandler), A == null || A.removeEventListener("mouseup", K.upHandler), R(O.clientX);
      }
    }, x = {
      moveHandler: (O) => (O.cancelable && (O.preventDefault(), O.stopPropagation()), D(O.touches[0].clientX), !1),
      upHandler: (O) => {
        var z;
        j(), O.cancelable && (O.preventDefault(), O.stopPropagation()), R((z = O.touches[0]) == null ? void 0 : z.clientX);
      },
      cancelHandler: () => {
        j(), R();
      }
    }, j = () => {
      A == null || A.removeEventListener("touchmove", x.moveHandler), A == null || A.removeEventListener("touchend", x.upHandler), A == null || A.removeEventListener("touchcancel", x.cancelHandler);
    }, _ = Xv() ? { passive: !1 } : !1;
    ji(o) ? (A == null || A.addEventListener("touchmove", x.moveHandler, _), A == null || A.addEventListener("touchend", x.upHandler, _), A == null || A.addEventListener("touchcancel", x.cancelHandler, _)) : (A == null || A.addEventListener("mousemove", K.moveHandler, _), A == null || A.addEventListener("mouseup", K.upHandler, _)), mr(n.table, (O) => ({
      ...O,
      startOffset: u,
      startSize: s,
      deltaOffset: 0,
      deltaPercentage: 0,
      columnSizingStart: l,
      isResizingColumn: n.id
    }));
  };
}
function mr(e, t) {
  var n, r;
  (r = (n = e.options).onColumnResizingChange) == null || r.call(n, t);
}
function Gv(e, t) {
  mr(e, t ? ls() : vt(e.initialState.columnResizing ?? ls()));
}
let lo = null;
function Xv() {
  if (typeof lo == "boolean") return lo;
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
  return lo = e, lo;
}
function ji(e) {
  return e.type === "touchstart";
}
const Yv = {
  getInitialState: (e) => ({
    columnResizing: ls(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    columnResizeMode: "onEnd",
    columnResizeDirection: "ltr",
    onColumnResizingChange: kr("columnResizing", e)
  }),
  assignColumnPrototype: (e, t) => {
    it("columnResizingFeature", e, t, {
      column_getCanResize: { fn: (n) => _c(n) },
      column_getIsResizing: { fn: (n) => Uv(n) }
    });
  },
  assignHeaderPrototype: (e, t) => {
    it("columnResizingFeature", e, t, { header_getResizeHandler: { fn: (n, r) => qv(n, r) } });
  },
  constructTableAPIs: (e) => {
    mt("columnResizingFeature", e, {
      table_setColumnResizing: { fn: (t) => mr(e, t) },
      table_resetHeaderSizeInfo: { fn: (t) => Gv(e, t) }
    });
  }
}, Zv = {
  getInitialState: (e) => ({
    columnSizing: Lv(),
    ...e
  }),
  getDefaultColumnDef: () => mc(),
  getDefaultTableOptions: (e) => ({ onColumnSizingChange: kr("columnSizing", e) }),
  assignColumnPrototype: (e, t) => {
    it("columnSizingFeature", e, t, {
      column_getSize: {
        fn: (n) => Uo(n),
        memoDeps: (n) => {
          var r, o;
          return [t.options.columns, (o = (r = t.atoms.columnSizing) == null ? void 0 : r.get()) == null ? void 0 : o[n.id]];
        }
      },
      column_getStart: { fn: (n, r) => jv(n, r) },
      column_getAfter: { fn: (n, r) => zv(n, r) },
      column_resetSize: { fn: (n) => Kv(n) }
    });
  },
  assignHeaderPrototype: (e, t) => {
    it("columnSizingFeature", e, t, {
      header_getSize: {
        fn: (n) => gn(n),
        memoDeps: (n) => {
          var r, o, s;
          return [t.options.columns, n.column.columns.length > 0 ? (r = t.atoms.columnSizing) == null ? void 0 : r.get() : (s = (o = t.atoms.columnSizing) == null ? void 0 : o.get()) == null ? void 0 : s[n.column.id]];
        }
      },
      header_getStart: {
        fn: (n) => bc(n),
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
    mt("columnSizingFeature", e, {
      table_getColumnOffsets: {
        fn: () => Ps(e),
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
      table_setColumnSizing: { fn: (t) => qo(e, t) },
      table_resetColumnSizing: { fn: (t) => Vv(e, t) },
      table_getTotalSize: {
        fn: () => Bv(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.columnSizing) == null ? void 0 : t.get(), e.getHeaderGroups()];
        }
      },
      table_getStartTotalSize: {
        fn: () => Nv(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.columnSizing) == null ? void 0 : t.get(), e.getHeaderGroups()];
        }
      },
      table_getCenterTotalSize: {
        fn: () => $v(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.columnSizing) == null ? void 0 : t.get(), e.getHeaderGroups()];
        }
      },
      table_getEndTotalSize: {
        fn: () => Wv(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.columnSizing) == null ? void 0 : t.get(), e.getHeaderGroups()];
        }
      }
    });
  }
}, Jv = {
  getInitialState: (e) => ({
    expanded: Lh(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onExpandedChange: kr("expanded", e),
    paginateExpandedRows: !0
  }),
  assignRowPrototype: (e, t) => {
    it("rowExpandingFeature", e, t, {
      row_toggleExpanded: { fn: (n, r) => oc(n, r) },
      row_getIsExpanded: { fn: (n) => $o(n) },
      row_getCanExpand: { fn: (n) => un(n) },
      row_getIsAllParentsExpanded: { fn: (n) => Vh(n) },
      row_getToggleExpandedHandler: { fn: (n) => Bh(n) }
    });
  },
  constructTableAPIs: (e) => {
    mt("rowExpandingFeature", e, {
      table_autoResetExpanded: { fn: () => Qu(e) },
      table_setExpanded: { fn: (t) => Ro(e, t) },
      table_toggleAllRowsExpanded: { fn: (t) => ec(e, t) },
      table_resetExpanded: { fn: (t) => tc(e, t) },
      table_getCanSomeRowsExpand: { fn: () => nc(e) },
      table_getToggleAllRowsExpandedHandler: { fn: () => jh(e) },
      table_getIsSomeRowsExpanded: { fn: () => zh(e) },
      table_getIsAllRowsExpanded: { fn: () => rc(e) },
      table_getExpandedDepth: { fn: () => Kh(e) }
    });
  }
};
function Qv() {
  return ie();
}
function Ln(e, t) {
  var n, r;
  (r = (n = e.options).onRowSelectionChange) == null || r.call(n, t);
}
function em(e, t) {
  e._lastSelectedRowId = null, Ln(e, t ? ie() : Object.assign(ie(), vt(e.initialState.rowSelection ?? {})));
}
function Sc(e, t, n) {
  e._lastSelectedRowId = null, Ln(e, (r) => {
    if (t = typeof t < "u" ? t : !ee(e, "getIsAllRowsSelected", Cc), n != null && n.deselectAll && !t) return ie();
    const o = Object.assign(ie(), r), s = e.getPreGroupedRowModel().flatRows;
    if (t) {
      const l = /* @__PURE__ */ new Map();
      s.forEach((u) => {
        Mo(u, l) && (o[u.id] = !0);
      });
    } else s.forEach((l) => {
      Pt(l) && delete o[l.id];
    });
    return o;
  });
}
function xc(e, t, n) {
  e._lastSelectedRowId = null, Ln(e, (r) => {
    const o = typeof t < "u" ? t : !ee(e, "getIsAllPageRowsSelected", Mc);
    if (n != null && n.deselectAll && !o) return ie();
    const s = Object.assign(ie(), r);
    return e.getRowModel().rows.forEach((l) => {
      Xo(s, l.id, o, !0, e, !0);
    }), s;
  });
}
function tm(e) {
  return e.getCoreRowModel();
}
function nm(e) {
  const t = e.getCoreRowModel();
  return ee(e, "getIsSomeRowsSelected", Go) ? Hs(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: ie()
  };
}
function rm(e) {
  const t = e.getFilteredRowModel();
  return ee(e, "getIsSomeRowsSelected", Go) ? Hs(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: ie()
  };
}
function om(e) {
  const t = e.getSortedRowModel();
  return ee(e, "getIsSomeRowsSelected", Go) ? Hs(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: ie()
  };
}
function Rc(e) {
  var t;
  return Object.keys(((t = e.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function Cc(e) {
  var o;
  const t = e.getFilteredRowModel().flatRows, n = ((o = e.atoms.rowSelection) == null ? void 0 : o.get()) ?? {};
  let r = !!(t.length && Object.keys(n).length);
  if (r) {
    const s = /* @__PURE__ */ new Map();
    t.some((l) => !Pr(l, n) && Mo(l, s)) && (r = !1);
  }
  return r;
}
function Mc(e) {
  var s;
  const t = e.getPaginatedRowModel().flatRows, n = ((s = e.atoms.rowSelection) == null ? void 0 : s.get()) ?? {}, r = /* @__PURE__ */ new Map();
  let o = !1;
  for (let l = 0; l < t.length; l++) {
    const u = t[l];
    if (Pr(u, n))
      !o && Mo(u, r) && (o = !0);
    else if (Mo(u, r)) return !1;
  }
  return o;
}
function Go(e) {
  return ee(e, "getSelectedRowIds", Rc).length > 0;
}
function im(e) {
  return e.getPaginatedRowModel().flatRows.filter((t) => Pt(t)).some((t) => Ts(t) || ee(t, "getIsSomeSelected", Ic));
}
function sm(e) {
  return (t) => {
    Sc(e, t.target.checked);
  };
}
function lm(e) {
  return (t) => {
    xc(e, t.target.checked);
  };
}
function Ec(e, t, n) {
  const r = Ts(e);
  Ln(e.table, (o) => {
    t = typeof t < "u" ? t : !r;
    const s = Object.assign(ie(), o);
    return Xo(s, e.id, t, ((n == null ? void 0 : n.selectChildren) ?? !0) && an(e), e.table), !t && (n != null && n.deselectParents) && Ac(s, e), s;
  });
}
function Ts(e) {
  var t;
  return Pr(e, ((t = e.table.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function Ic(e) {
  return Ls(e) === "some";
}
function am(e) {
  return Ls(e) === "all";
}
function Pt(e) {
  const t = e.table.options;
  return typeof t.enableRowSelection == "function" ? t.enableRowSelection(e) : t.enableRowSelection ?? !0;
}
function Fs(e) {
  const t = e.table.options;
  return typeof t.enableSubRowSelection == "function" ? t.enableSubRowSelection(e) : t.enableSubRowSelection ?? !0;
}
function an(e) {
  const t = e.table.options;
  return typeof t.enableMultiRowSelection == "function" ? t.enableMultiRowSelection(e) : t.enableMultiRowSelection ?? !0;
}
function um(e, t) {
  const n = Pt(e);
  return (r) => {
    var c, d;
    if (!n) return;
    const o = r, s = e.table, l = o.target.checked, u = s._lastSelectedRowId;
    (!(s.options.enableRowRangeSelection !== !1 && u !== null && an(e) && (((d = (c = s.options).isRowRangeSelectionEvent) == null ? void 0 : d.call(c, r)) ?? !1)) || !cm(e, u, l, t)) && Ec(e, l, t), s._lastSelectedRowId = e.id;
  };
}
function cm(e, t, n, r) {
  const o = (r == null ? void 0 : r.selectChildren) ?? !0, s = e.table, l = s.getRowsInDisplayOrder(), u = s.getPrePaginatedRowModel().rowsById[t] ?? s.getCoreRowModel().rowsById[t];
  if (!u) return !1;
  const c = u.getDisplayIndex(), d = e.getDisplayIndex(), g = l[c], v = l[d];
  if (c < 0 || d < 0 || c >= l.length || d >= l.length || (g == null ? void 0 : g.id) !== u.id || (v == null ? void 0 : v.id) !== e.id || !an(u) || !an(e)) return !1;
  const y = Math.min(c, d), w = Math.max(c, d);
  return Ln(s, (D) => {
    const R = Object.assign(ie(), D);
    for (let A = y; A <= w; A++) {
      const K = l[A];
      !Pt(K) || !an(K) || (Xo(R, K.id, n, o, s), !n && (r != null && r.deselectParents) && Ac(R, K));
    }
    return R;
  }), !0;
}
function Xo(e, t, n, r, o, s) {
  const l = o.getRow(t, !0);
  n ? (an(l) || Object.keys(e).forEach((u) => delete e[u]), Pt(l) && (e[t] = !0)) : (!s || Pt(l)) && delete e[t], r && l.subRows.length && Fs(l) && l.subRows.forEach((u) => Xo(e, u.id, n, r, o, s));
}
function Mo(e, t) {
  if (!Pt(e)) return !1;
  const n = e.table;
  if (n.options.enableSubRowSelection === !0) return !0;
  const r = e.parentId;
  if (r === void 0) return !0;
  const o = t.get(r);
  if (o !== void 0) return o;
  const s = n.getCoreRowModel().rowsById, l = [];
  let u = !0, c = r;
  for (; c !== void 0; ) {
    const d = t.get(c);
    if (d !== void 0) {
      u = d;
      break;
    }
    l.push(c);
    const g = s[c] ?? n.getRow(c, !0);
    if (!Fs(g)) {
      u = !1;
      break;
    }
    c = g.parentId;
  }
  return l.forEach((d) => t.set(d, u)), u;
}
function Ac(e, t) {
  const n = t.table.getCoreRowModel().rowsById;
  let r = t.parentId;
  for (; r !== void 0; )
    delete e[r], r = (n[r] ?? t.table.getRow(r, !0)).parentId;
}
function Dc(e, t, n, r) {
  const o = [];
  for (let s = 0; s < e.length; s++) {
    const l = e[s], u = Pr(l, t);
    if (u && (n.push(l), r[l.id] = l), l.subRows.length) {
      const c = Dc(l.subRows, t, n, r);
      if (u) {
        const d = Object.create(Object.getPrototypeOf(l));
        Ku(d, l), d.subRows = c, o.push(d);
      }
    } else u && o.push(l);
  }
  return o;
}
function Hs(e, t) {
  var s;
  const n = [], r = ie(), o = ((s = t.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  return {
    rows: Dc(e.rows, o, n, r),
    flatRows: n,
    rowsById: r
  };
}
function Pr(e, t) {
  return !!(fn(t, e.id) && t[e.id]);
}
function Ls(e) {
  var s;
  if (!e.subRows.length) return !1;
  const t = ((s = e.table.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  let n = !1, r = !0, o = !1;
  for (let l = 0; l < e.subRows.length; l++) {
    const u = e.subRows[l];
    if (n && !r) break;
    if (Pt(u) && (o = !0, Pr(u, t) ? n = !0 : r = !1), u.subRows.length) {
      const c = Ls(u);
      c === "all" ? (n = !0, o = !0) : c === "some" ? (n = !0, r = !1, o = !0) : r = !1;
    }
  }
  return o ? r ? "all" : n ? "some" : !1 : !1;
}
const fm = {
  initTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  resetTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  getInitialState: (e) => ({
    rowSelection: Qv(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onRowSelectionChange: kr("rowSelection", e),
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
    it("rowSelectionFeature", e, t, {
      row_toggleSelected: { fn: (n, r, o) => Ec(n, r, o) },
      row_getIsSelected: { fn: (n) => Ts(n) },
      row_getIsSomeSelected: {
        fn: (n) => Ic(n),
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
        fn: (n) => am(n),
        memoDeps: (n) => {
          var r;
          return [
            n.subRows,
            (r = n.table.atoms.rowSelection) == null ? void 0 : r.get(),
            n.table.options.enableRowSelection
          ];
        }
      },
      row_getCanSelect: { fn: (n) => Pt(n) },
      row_getCanSelectSubRows: { fn: (n) => Fs(n) },
      row_getCanMultiSelect: { fn: (n) => an(n) },
      row_getToggleSelectedHandler: { fn: (n, r) => um(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    mt("rowSelectionFeature", e, {
      table_setRowSelection: { fn: (t) => Ln(e, t) },
      table_resetRowSelection: { fn: (t) => em(e, t) },
      table_toggleAllRowsSelected: { fn: (t, n) => Sc(e, t, n) },
      table_toggleAllPageRowsSelected: { fn: (t, n) => xc(e, t, n) },
      table_getPreSelectedRowModel: { fn: () => tm(e) },
      table_getSelectedRowModel: {
        fn: () => nm(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getCoreRowModel()];
        }
      },
      table_getFilteredSelectedRowModel: {
        fn: () => rm(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getFilteredRowModel()];
        }
      },
      table_getGroupedSelectedRowModel: {
        fn: () => om(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getSortedRowModel()];
        }
      },
      table_getSelectedRowIds: {
        fn: () => Rc(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get()];
        }
      },
      table_getIsAllRowsSelected: {
        fn: () => Cc(e),
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
        fn: () => Mc(e),
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
        fn: () => Go(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get()];
        }
      },
      table_getIsSomePageRowsSelected: {
        fn: () => im(e),
        memoDeps: () => {
          var t;
          return [
            (t = e.atoms.rowSelection) == null ? void 0 : t.get(),
            e.getPaginatedRowModel(),
            e.options.enableRowSelection
          ];
        }
      },
      table_getToggleAllRowsSelectedHandler: { fn: () => sm(e) },
      table_getToggleAllPageRowsSelectedHandler: { fn: () => lm(e) }
    });
  }
}, dm = {
  getInitialState(e) {
    return {
      sorting: Uh(),
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
      onSortingChange: kr("sorting", e),
      isMultiSortEvent: (t) => t.shiftKey
    };
  },
  assignColumnPrototype(e, t) {
    it("rowSortingFeature", e, t, {
      column_getAutoSortFn: { fn: (n) => lc(n) },
      column_getAutoSortDir: { fn: (n) => ac(n) },
      column_getSortFn: { fn: (n) => uc(n) },
      column_toggleSorting: { fn: (n, r, o) => cc(n, r, o) },
      column_getFirstSortDir: { fn: (n) => fc(n) },
      column_getNextSortingOrder: { fn: (n, r) => dc(n, r) },
      column_getCanSort: { fn: (n) => Os(n) },
      column_getCanMultiSort: { fn: (n) => Co(n) },
      column_getIsSorted: { fn: (n) => gc(n) },
      column_getSortIndex: { fn: (n) => Gh(n) },
      column_clearSorting: { fn: (n) => Xh(n) },
      column_getToggleSortingHandler: { fn: (n) => Yh(n) }
    });
  },
  constructTableAPIs(e) {
    mt("rowSortingFeature", e, {
      table_setSorting: { fn: (t) => Wo(e, t) },
      table_resetSorting: { fn: (t) => sc(e, t) }
    });
  }
};
function gm() {
  return (e) => {
    const t = e;
    return Or({
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
      fn: () => pm(t)
    });
  };
}
function pm(e) {
  var r;
  const t = e.getPreExpandedRowModel(), n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return !t.rows.length || n !== !0 && !Object.keys(n ?? {}).length || !e.options.paginateExpandedRows && !e.options.manualPagination ? t : hm(t);
}
function hm(e) {
  const t = [], n = (r) => {
    t.push(r), r.subRows.length && $o(r) && r.subRows.forEach(n);
  };
  return e.rows.forEach(n), {
    rows: t,
    flatRows: e.flatRows,
    rowsById: e.rowsById
  };
}
function vm() {
  return (e) => {
    const t = e;
    return Or({
      feature: "rowSortingFeature",
      table: t,
      fnName: "table.getSortedRowModel",
      memoDeps: () => {
        var n;
        return [(n = t.atoms.sorting) == null ? void 0 : n.get(), t.getPreSortedRowModel()];
      },
      fn: () => mm(t),
      onAfterUpdate: Bu(() => ic(t))
    });
  };
}
function mm(e) {
  var c;
  const t = e.getPreSortedRowModel(), n = (c = e.atoms.sorting) == null ? void 0 : c.get();
  if (!t.rows.length || !(n != null && n.length)) return t;
  const r = [], o = n.filter((d) => {
    const g = e.getColumn(d.id);
    return g ? Os(g) : !1;
  });
  if (!o.length) return t;
  const s = [];
  for (let d = 0; d < o.length; d++) {
    const g = o[d], v = e.getColumn(g.id);
    v && s.push({
      id: g.id,
      desc: g.desc,
      sortUndefined: v.columnDef.sortUndefined,
      invertSorting: v.columnDef.invertSorting,
      sortFn: uc(v)
    });
  }
  const l = (d, g) => {
    for (let v = 0; v < s.length; v++) {
      const y = s[v], w = y.sortUndefined, D = y.desc;
      let R = 0;
      if (w) {
        const A = d.getValue(y.id), K = g.getValue(y.id), x = A === void 0, j = K === void 0;
        if (x && j) continue;
        if (x || j) {
          if (w === "first") return x ? -1 : 1;
          if (w === "last") return x ? 1 : -1;
          R = x ? w : -w;
        }
      }
      if (R === 0 && (R = y.sortFn(d, g, y.id)), R !== 0)
        return D && (R *= -1), y.invertSorting && (R *= -1), R;
    }
    return d.index - g.index;
  }, u = (d) => {
    const g = d.slice();
    g.sort(l);
    let v = !1;
    for (let y = 0; y < g.length; y++) {
      const w = g[y];
      w !== d[y] && (v = !0);
      const D = r.length;
      if (r.push(w), w.subRows.length) {
        const R = u(w.subRows);
        if (R.changed) {
          const A = Object.create(Object.getPrototypeOf(w));
          Ku(A, w), A.subRows = R.rows, g[y] = A, r[D] = A, v = !0;
        }
      }
    }
    return {
      rows: g,
      changed: v
    };
  };
  return {
    rows: u(t.rows).rows,
    flatRows: r,
    rowsById: t.rowsById
  };
}
function sa(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = sn(e[n]);
  return rs(e, t);
}
function ym(e) {
  return Object.keys(e).map((t) => sn(e[t]));
}
function wm(e) {
  const t = (u, c) => {
    u.setOptions((d) => ea(d, sa(c)));
  }, n = Lp(), r = rs(e, { features: {
    coreReactivityFeature: n,
    ...sn(e.features) ?? {}
  } }), o = rs(sa(r), { mergeOptions: (u, c) => ea(u, c) }), s = Hv(o), l = s;
  return Va() && xd(() => {
    var u;
    return (u = n.unmount) == null ? void 0 : u.call(n);
  }), be(() => ym(r), () => {
    t(s, r);
  }, { immediate: !0 }), be(() => {
    const u = sn(e.state), c = sn(e.atoms);
    if (!u) return [];
    const d = [];
    for (const g of Object.keys(l.initialState))
      !(g in u) || (c == null ? void 0 : c[g]) !== void 0 || d.push(u[g]);
    return d;
  }, (u) => {
    u.length > 0 && t(s, r);
  }, { immediate: !0 }), l.Subscribe = (u) => u.children(l.atoms), l;
}
function Mr(e) {
  "@babel/helpers - typeof";
  return Mr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Mr(e);
}
function bm(e, t) {
  if (Mr(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Mr(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function _m(e) {
  var t = bm(e, "string");
  return Mr(t) == "symbol" ? t : t + "";
}
function Tr(e, t, n) {
  return (t = _m(t)) in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function Sm(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
    if (t.indexOf(r) !== -1) continue;
    n[r] = e[r];
  }
  return n;
}
function xm(e, t) {
  if (e == null) return {};
  var n, r, o = Sm(e, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    for (r = 0; r < s.length; r++) n = s[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (o[n] = e[n]);
  }
  return o;
}
function kc(e, t) {
  var n = Object.keys(e), r = Object.keys(t);
  return n.length !== r.length ? !1 : n.every(function(o) {
    return Object.is(e[o], t[o]);
  });
}
function Rm() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : kc, t = null;
  return function(n) {
    return t && e(t.value, n) || (t = {
      value: n
    }), t.value;
  };
}
var Cm = ["block"];
function la(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function aa(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? la(Object(n), !0).forEach(function(r) {
      Tr(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : la(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Mm(e) {
  return {
    x: (e.right + e.left) / 2,
    y: (e.bottom + e.top) / 2
  };
}
function zi(e) {
  var t = e.client, n = e.borderBox, r = n.height / 4;
  return t.y <= n.top + r ? "reorder-above" : t.y >= n.bottom - r ? "reorder-below" : "make-child";
}
function Em(e) {
  var t = e.element, n = e.input, r = e.currentLevel, o = e.indentPerLevel, s = e.mode, l = {
    x: n.clientX,
    y: n.clientY
  }, u = t.getBoundingClientRect();
  if (s === "standard") {
    var c = zi({
      borderBox: u,
      client: l
    });
    return {
      type: c,
      indentPerLevel: o,
      currentLevel: r
    };
  }
  var d = Mm(u);
  if (s === "expanded") {
    var g = zi({
      borderBox: u,
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
  var v = o * r;
  if (l.x < u.left + v) {
    if (l.y < d.y)
      return {
        type: "reorder-above",
        indentPerLevel: o,
        currentLevel: r
      };
    var y = (l.x - u.left) / o, w = Math.max(Math.floor(y), 0);
    return {
      type: "reparent",
      desiredLevel: w,
      indentPerLevel: o,
      currentLevel: r
    };
  }
  return {
    type: zi({
      borderBox: u,
      client: l
    }),
    indentPerLevel: o,
    currentLevel: r
  };
}
function Oc(e, t) {
  return e.type !== t.type ? !1 : e.type === "instruction-blocked" && t.type === "instruction-blocked" ? Oc(e.desired, t.desired) : kc(e, t);
}
var Im = Rm(Oc);
function Am(e) {
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
function ua(e, t) {
  var n = t.block, r = xm(t, Cm), o = Em(r), s = Am({
    desired: o,
    block: n
  }), l = Im(s);
  return aa(aa({}, e), {}, Tr({}, Pc, l));
}
function Dm(e) {
  var t;
  return (t = e[Pc]) !== null && t !== void 0 ? t : null;
}
var Pc = Symbol("tree-item-instruction");
function as(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function km(e) {
  if (Array.isArray(e)) return as(e);
}
function Om(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function Tc(e, t) {
  if (e) {
    if (typeof e == "string") return as(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? as(e, t) : void 0;
  }
}
function Pm() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Yo(e) {
  return km(e) || Om(e) || Tc(e) || Pm();
}
var ca = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, st = {}, Fr = {};
Object.defineProperty(Fr, "__esModule", { value: !0 });
Fr.bind = void 0;
function Tm(e, t) {
  var n = t.type, r = t.listener, o = t.options;
  return e.addEventListener(n, r, o), function() {
    e.removeEventListener(n, r, o);
  };
}
Fr.bind = Tm;
var Zo = {}, An = ca && ca.__assign || function() {
  return An = Object.assign || function(e) {
    for (var t, n = 1, r = arguments.length; n < r; n++) {
      t = arguments[n];
      for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    }
    return e;
  }, An.apply(this, arguments);
};
Object.defineProperty(Zo, "__esModule", { value: !0 });
Zo.bindAll = void 0;
var Fm = Fr;
function fa(e) {
  if (!(typeof e > "u"))
    return typeof e == "boolean" ? {
      capture: e
    } : e;
}
function Hm(e, t) {
  if (t == null)
    return e;
  var n = An(An({}, e), { options: An(An({}, fa(t)), fa(e.options)) });
  return n;
}
function Lm(e, t, n) {
  var r = t.map(function(o) {
    var s = Hm(o, n);
    return (0, Fm.bind)(e, s);
  });
  return function() {
    r.forEach(function(s) {
      return s();
    });
  };
}
Zo.bindAll = Lm;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.bindAll = e.bind = void 0;
  var t = Fr;
  Object.defineProperty(e, "bind", { enumerable: !0, get: function() {
    return t.bind;
  } });
  var n = Zo;
  Object.defineProperty(e, "bindAll", { enumerable: !0, get: function() {
    return n.bindAll;
  } });
})(st);
function jm(e) {
  if (Array.isArray(e)) return e;
}
function zm(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r, o, s, l, u = [], c = !0, d = !1;
    try {
      if (s = (n = n.call(e)).next, t !== 0) for (; !(c = (r = s.call(n)).done) && (u.push(r.value), u.length !== t); c = !0) ;
    } catch (g) {
      d = !0, o = g;
    } finally {
      try {
        if (!c && n.return != null && (l = n.return(), Object(l) !== l)) return;
      } finally {
        if (d) throw o;
      }
    }
    return u;
  }
}
function Km() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Fc(e, t) {
  return jm(e) || zm(e, t) || Tc(e, t) || Km();
}
var Hc = "data-pdnd-honey-pot";
function Lc(e) {
  return e instanceof Element && e.hasAttribute(Hc);
}
function jc(e) {
  var t = document.elementsFromPoint(e.x, e.y), n = Fc(t, 2), r = n[0], o = n[1];
  return r ? Lc(r) ? o ?? null : r : null;
}
function pn(e) {
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
var zc = pn(function() {
  return navigator.userAgent.includes("Firefox");
}), Hr = pn(function() {
  var t = navigator, n = t.userAgent;
  return n.includes("AppleWebKit") && !n.includes("Chrome");
});
function Vm(e) {
  return "nodeName" in e;
}
function Kc(e) {
  return Vm(e) && e.ownerDocument !== document;
}
var Eo = {
  isLeavingWindow: Symbol("leaving"),
  isEnteringWindow: Symbol("entering")
};
(function() {
  if (typeof window > "u" || !Hr())
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
  st.bindAll(
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
        !n.isOverWindow && n.enterCount === 0 && (s[Eo.isEnteringWindow] = !0), n.isOverWindow = !0, n.enterCount++;
      }
    }, {
      type: "dragleave",
      listener: function(s) {
        n.enterCount--, n.isOverWindow && n.enterCount === 0 && (s[Eo.isLeavingWindow] = !0, n.isOverWindow = !1);
      }
    }],
    // using `capture: true` so that adding event listeners
    // in bubble phase will have the correct symbols
    {
      capture: !0
    }
  );
})();
function Bm(e) {
  var t = e.dragLeave;
  return Hr() ? t.hasOwnProperty(Eo.isLeavingWindow) : !1;
}
function Nm(e) {
  var t = e.dragLeave, n = t.type, r = t.relatedTarget;
  return n !== "dragleave" ? !1 : Hr() ? Bm({
    dragLeave: t
  }) : r == null ? !0 : zc() ? Kc(r) : r instanceof HTMLIFrameElement;
}
function js(e) {
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
function yr(e) {
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
var $m = function(t) {
  var n = [], r = null, o = function() {
    for (var l = arguments.length, u = new Array(l), c = 0; c < l; c++)
      u[c] = arguments[c];
    n = u, !r && (r = requestAnimationFrame(function() {
      r = null, t.apply(void 0, n);
    }));
  };
  return o.cancel = function() {
    r && (cancelAnimationFrame(r), r = null);
  }, o;
}, Ki = $m(function(e) {
  return e();
}), ao = /* @__PURE__ */ function() {
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
function Wm(e) {
  var t = e.source, n = e.initial, r = e.dispatchEvent, o = {
    dropTargets: []
  };
  function s(u) {
    r(u), o = {
      dropTargets: u.payload.location.current.dropTargets
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
      }), ao.schedule(function() {
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
      ao.flush(), Ki.cancel(), s({
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
      Ki(function() {
        ao.flush();
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
      ao.flush(), Ki.cancel(), s({
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
var us = {
  isActive: !1
};
function Vc() {
  return !us.isActive;
}
function Um(e) {
  return e.dataTransfer ? e.dataTransfer.setDragImage.bind(e.dataTransfer) : null;
}
function qm(e) {
  var t = e.current, n = e.next;
  if (t.length !== n.length)
    return !0;
  for (var r = 0; r < t.length; r++)
    if (t[r].element !== n[r].element)
      return !0;
  return !1;
}
function Gm(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = e.dispatchEvent;
  if (!Vc())
    return;
  var s = Xm({
    event: t,
    dragType: n,
    getDropTargetsOver: r
  });
  us.isActive = !0;
  var l = {
    current: s
  };
  Vi({
    event: t,
    current: s.dropTargets
  });
  var u = Wm({
    source: n.payload,
    dispatchEvent: o,
    initial: s
  });
  function c(w) {
    var D = qm({
      current: l.current.dropTargets,
      next: w.dropTargets
    });
    l.current = w, D && u.dragUpdate({
      current: l.current
    });
  }
  function d(w) {
    var D = yr(w), R = Lc(w.target) ? jc({
      x: D.clientX,
      y: D.clientY
    }) : w.target, A = r({
      target: R,
      input: D,
      source: n.payload,
      current: l.current.dropTargets
    });
    A.length && (w.preventDefault(), Vi({
      event: w,
      current: A
    })), c({
      dropTargets: A,
      input: D
    });
  }
  function g() {
    l.current.dropTargets.length && c({
      dropTargets: [],
      input: l.current.input
    }), u.drop({
      current: l.current,
      updatedSourcePayload: null
    }), v();
  }
  function v() {
    us.isActive = !1, y();
  }
  var y = st.bindAll(
    window,
    [{
      // 👋 Note: we are repurposing the `dragover` event as our `drag` event
      // this is because firefox does not publish pointer coordinates during
      // a `drag` event, but does for every other type of drag event
      // `dragover` fires on all elements that are being dragged over
      // Because we are binding to `window` - our `dragover` is effectively the same as a `drag`
      // 🦊😤
      type: "dragover",
      listener: function(D) {
        d(D), u.drag({
          current: l.current
        });
      }
    }, {
      type: "dragenter",
      listener: d
    }, {
      type: "dragleave",
      listener: function(D) {
        Nm({
          dragLeave: D
        }) && (c({
          input: l.current.input,
          dropTargets: []
        }), n.startedFrom === "external" && g());
      }
    }, {
      // A "drop" can only happen if the browser allowed the drop
      type: "drop",
      listener: function(D) {
        if (l.current = {
          dropTargets: l.current.dropTargets,
          input: yr(D)
        }, !l.current.dropTargets.length) {
          g();
          return;
        }
        D.preventDefault(), Vi({
          event: D,
          current: l.current.dropTargets
        }), u.drop({
          current: l.current,
          // When dropping something native, we need to extract the latest
          // `.items` from the "drop" event as it is now accessible
          updatedSourcePayload: n.type === "external" ? n.getDropPayload(D) : null
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
      listener: function(D) {
        l.current = {
          dropTargets: l.current.dropTargets,
          input: yr(D)
        }, g();
      }
    }].concat(Yo(js({
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
  u.start({
    nativeSetDragImage: Um(t)
  });
}
function Vi(e) {
  var t, n = e.event, r = e.current, o = (t = r[0]) === null || t === void 0 ? void 0 : t.dropEffect;
  o != null && n.dataTransfer && (n.dataTransfer.dropEffect = o);
}
function Xm(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = yr(t);
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
var da = {
  canStart: Vc,
  start: Gm
}, cs = /* @__PURE__ */ new Map();
function Ym(e) {
  var t = e.typeKey, n = e.mount, r = cs.get(t);
  if (r)
    return r.usageCount++, r;
  var o = {
    typeKey: t,
    unmount: n(),
    usageCount: 1
  };
  return cs.set(t, o), o;
}
function Zm(e) {
  var t = Ym(e);
  return function() {
    t.usageCount--, !(t.usageCount > 0) && (t.unmount(), cs.delete(e.typeKey));
  };
}
function Jo() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return function() {
    t.forEach(function(o) {
      return o();
    });
  };
}
function Bc(e, t) {
  var n = t.attribute, r = t.value;
  return e.setAttribute(n, r), function() {
    return e.removeAttribute(n);
  };
}
function ga(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Bt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ga(Object(n), !0).forEach(function(r) {
      Tr(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ga(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Bi(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = Jm(e)) || t) {
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
  var s, l = !0, u = !1;
  return { s: function() {
    n = n.call(e);
  }, n: function() {
    var d = n.next();
    return l = d.done, d;
  }, e: function(d) {
    u = !0, s = d;
  }, f: function() {
    try {
      l || n.return == null || n.return();
    } finally {
      if (u) throw s;
    }
  } };
}
function Jm(e, t) {
  if (e) {
    if (typeof e == "string") return pa(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? pa(e, t) : void 0;
  }
}
function pa(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Ni(e) {
  return e.slice(0).reverse();
}
function Qm(e) {
  var t = e.typeKey, n = e.defaultDropEffect, r = /* @__PURE__ */ new WeakMap(), o = "data-drop-target-for-".concat(t), s = "[".concat(o, "]");
  function l(w) {
    return r.set(w.element, w), function() {
      return r.delete(w.element);
    };
  }
  function u(w) {
    var D = Jo(Bc(w.element, {
      attribute: o,
      value: "true"
    }), l(w));
    return pn(D);
  }
  function c(w) {
    var D, R, A, K, x = w.source, j = w.target, _ = w.input, O = w.result, z = O === void 0 ? [] : O;
    if (j == null)
      return z;
    if (!(j instanceof Element))
      return j instanceof Node ? c({
        source: x,
        target: j.parentElement,
        input: _,
        result: z
      }) : z;
    var J = j.closest(s);
    if (J == null)
      return z;
    var W = r.get(J);
    if (W == null)
      return z;
    var L = {
      input: _,
      source: x,
      element: W.element
    };
    if (W.canDrop && !W.canDrop(L))
      return c({
        source: x,
        target: W.element.parentElement,
        input: _,
        result: z
      });
    var U = (D = (R = W.getData) === null || R === void 0 ? void 0 : R.call(W, L)) !== null && D !== void 0 ? D : {}, se = (A = (K = W.getDropEffect) === null || K === void 0 ? void 0 : K.call(W, L)) !== null && A !== void 0 ? A : n, fe = {
      data: U,
      element: W.element,
      dropEffect: se,
      // we are collecting _actual_ drop targets, so these are
      // being applied _not_ due to stickiness
      isActiveDueToStickiness: !1
    };
    return c({
      source: x,
      target: W.element.parentElement,
      input: _,
      // Using bubble ordering. Same ordering as `event.getPath()`
      result: [].concat(Yo(z), [fe])
    });
  }
  function d(w) {
    var D = w.eventName, R = w.payload, A = Bi(R.location.current.dropTargets), K;
    try {
      for (A.s(); !(K = A.n()).done; ) {
        var x, j = K.value, _ = r.get(j.element), O = Bt(Bt({}, R), {}, {
          self: j
        });
        _ == null || (x = _[D]) === null || x === void 0 || x.call(
          _,
          // I cannot seem to get the types right here.
          // TS doesn't seem to like that one event can need `nativeSetDragImage`
          // @ts-expect-error
          O
        );
      }
    } catch (z) {
      A.e(z);
    } finally {
      A.f();
    }
  }
  var g = {
    onGenerateDragPreview: d,
    onDrag: d,
    onDragStart: d,
    onDrop: d,
    onDropTargetChange: function(D) {
      var R = D.payload, A = new Set(R.location.current.dropTargets.map(function(oe) {
        return oe.element;
      })), K = /* @__PURE__ */ new Set(), x = Bi(R.location.previous.dropTargets), j;
      try {
        for (x.s(); !(j = x.n()).done; ) {
          var _, O = j.value;
          K.add(O.element);
          var z = r.get(O.element), J = A.has(O.element), W = Bt(Bt({}, R), {}, {
            self: O
          });
          if (z == null || (_ = z.onDropTargetChange) === null || _ === void 0 || _.call(z, W), !J) {
            var L;
            z == null || (L = z.onDragLeave) === null || L === void 0 || L.call(z, W);
          }
        }
      } catch (oe) {
        x.e(oe);
      } finally {
        x.f();
      }
      var U = Bi(R.location.current.dropTargets), se;
      try {
        for (U.s(); !(se = U.n()).done; ) {
          var fe, te, we = se.value;
          if (!K.has(we.element)) {
            var xe = Bt(Bt({}, R), {}, {
              self: we
            }), de = r.get(we.element);
            de == null || (fe = de.onDropTargetChange) === null || fe === void 0 || fe.call(de, xe), de == null || (te = de.onDragEnter) === null || te === void 0 || te.call(de, xe);
          }
        }
      } catch (oe) {
        U.e(oe);
      } finally {
        U.f();
      }
    }
  };
  function v(w) {
    g[w.eventName](w);
  }
  function y(w) {
    var D = w.source, R = w.target, A = w.input, K = w.current, x = c({
      source: D,
      target: R,
      input: A
    });
    if (x.length >= K.length)
      return x;
    for (var j = Ni(K), _ = Ni(x), O = [], z = 0; z < j.length; z++) {
      var J, W = j[z], L = _[z];
      if (L != null) {
        O.push(L);
        continue;
      }
      var U = O[z - 1], se = j[z - 1];
      if ((U == null ? void 0 : U.element) !== (se == null ? void 0 : se.element))
        break;
      var fe = r.get(W.element);
      if (!fe)
        break;
      var te = {
        input: A,
        source: D,
        element: fe.element
      };
      if (fe.canDrop && !fe.canDrop(te) || !((J = fe.getIsSticky) !== null && J !== void 0 && J.call(fe, te)))
        break;
      O.push(Bt(Bt({}, W), {}, {
        // making it clear to consumers this drop target is active due to stickiness
        isActiveDueToStickiness: !0
      }));
    }
    return Ni(O);
  }
  return {
    dropTargetForConsumers: u,
    getIsOver: y,
    dispatchEvent: v
  };
}
function e0(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = t0(e)) || t) {
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
  var s, l = !0, u = !1;
  return { s: function() {
    n = n.call(e);
  }, n: function() {
    var d = n.next();
    return l = d.done, d;
  }, e: function(d) {
    u = !0, s = d;
  }, f: function() {
    try {
      l || n.return == null || n.return();
    } finally {
      if (u) throw s;
    }
  } };
}
function t0(e, t) {
  if (e) {
    if (typeof e == "string") return ha(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? ha(e, t) : void 0;
  }
}
function ha(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function va(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function n0(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? va(Object(n), !0).forEach(function(r) {
      Tr(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : va(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function r0() {
  var e = /* @__PURE__ */ new Set(), t = null;
  function n(s) {
    t && (!s.canMonitor || s.canMonitor(t.canMonitorArgs)) && t.active.add(s);
  }
  function r(s) {
    var l = n0({}, s);
    e.add(l), n(l);
    function u() {
      e.delete(l), t && t.active.delete(l);
    }
    return pn(u);
  }
  function o(s) {
    var l = s.eventName, u = s.payload;
    if (l === "onGenerateDragPreview") {
      t = {
        canMonitorArgs: {
          initial: u.location.initial,
          source: u.source
        },
        active: /* @__PURE__ */ new Set()
      };
      var c = e0(e), d;
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
      for (var v = Array.from(t.active), y = 0, w = v; y < w.length; y++) {
        var D = w[y];
        if (t.active.has(D)) {
          var R;
          (R = D[l]) === null || R === void 0 || R.call(D, u);
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
function Nc(e) {
  var t = e.typeKey, n = e.mount, r = e.dispatchEventToSource, o = e.onPostDispatch, s = e.defaultDropEffect, l = r0(), u = Qm({
    typeKey: t,
    defaultDropEffect: s
  });
  function c(v) {
    r == null || r(v), u.dispatchEvent(v), l.dispatchEvent(v), o == null || o(v);
  }
  function d(v) {
    var y = v.event, w = v.dragType;
    da.start({
      event: y,
      dragType: w,
      getDropTargetsOver: u.getIsOver,
      dispatchEvent: c
    });
  }
  function g() {
    function v() {
      var y = {
        canStart: da.canStart,
        start: d
      };
      return n(y);
    }
    return Zm({
      typeKey: t,
      mount: v
    });
  }
  return {
    registerUsage: g,
    dropTarget: u.dropTargetForConsumers,
    monitor: l.monitorForConsumers
  };
}
function o0(e) {
  var t = e.dragEnter;
  return Hr() ? t.hasOwnProperty(Eo.isEnteringWindow) : !1;
}
function i0(e) {
  var t = e.dragEnter, n = t.type, r = t.relatedTarget;
  return n !== "dragenter" ? !1 : Hr() ? o0({
    dragEnter: t
  }) : r == null ? !0 : zc() ? Kc(r) : r instanceof HTMLIFrameElement;
}
var s0 = pn(function() {
  return navigator.userAgent.toLocaleLowerCase().includes("android");
}), $c = "pdnd:android-fallback", fs = "text/plain", Wc = "application/vnd.pdnd";
function zs(e) {
  var t = e.type, n = e.value;
  return !(t === Wc || t === fs && n === $c);
}
function l0(e) {
  return Array.from(e.items).filter(function(t) {
    return t.kind === "file" || zs({
      type: t.type,
      value: e.getData(t.type)
    });
  });
}
function a0(e) {
  return Array.from(e.types).filter(function(t) {
    return zs({
      type: t,
      value: e.getData(t)
    });
  });
}
var ds = !1, Ks = Nc({
  typeKey: "external",
  // for external drags, we are generally making a copy of something that is being dragged
  defaultDropEffect: "copy",
  mount: function(t) {
    return st.bind(window, {
      type: "dragenter",
      listener: function(r) {
        if (!ds && r.dataTransfer && t.canStart(r) && i0({
          dragEnter: r
        })) {
          var o = a0(r.dataTransfer);
          if (o.length) {
            var s = {
              types: o,
              items: [],
              getStringData: function() {
                return null;
              }
            };
            t.start({
              event: r,
              dragType: {
                type: "external",
                startedFrom: "external",
                payload: s,
                getDropPayload: function(u) {
                  if (!u.dataTransfer)
                    return s;
                  var c = l0(u.dataTransfer), d = u.dataTransfer.getData.bind(u.dataTransfer);
                  return {
                    types: o,
                    items: c,
                    // return `null` if there is no result, otherwise string
                    getStringData: function(v) {
                      if (!o.includes(v))
                        return null;
                      var y = d(v);
                      return zs({
                        type: v,
                        value: y
                      }) ? y : null;
                    }
                  };
                }
              }
            });
          }
        }
      }
    });
  }
});
(function() {
  if (typeof window > "u")
    return;
  Ks.registerUsage();
  var t = {
    type: "idle"
  }, n = t;
  function r() {
    n.type === "dragging" && (ds = !1, n.cleanup(), n = t);
  }
  function o() {
    return st.bindAll(
      window,
      [{
        type: "dragend",
        listener: r
      }].concat(Yo(js({
        onDragEnd: r
      }))),
      // we want to make sure we get all the events,
      // and this helps avoid not seeing events when folks stop
      // them later on the event path
      {
        capture: !0
      }
    );
  }
  st.bind(window, {
    type: "dragstart",
    listener: function() {
      n.type === "idle" && (ds = !0, n = {
        type: "dragging",
        cleanup: o()
      });
    },
    // binding in the capture phase so these listeners are called
    // before our listeners in the adapters `mount` function
    options: {
      capture: !0
    }
  });
})();
function u0(e) {
  return Ks.dropTarget(e);
}
function c0(e) {
  return Ks.monitor(e);
}
var f0 = 2147483647, d0 = {
  inset: "unset",
  border: "none",
  padding: 0,
  margin: 0,
  overflow: "visible",
  color: "inherit",
  background: "transparent",
  width: "auto",
  height: "auto"
}, $i = pn(function() {
  return typeof HTMLElement < "u" && typeof HTMLElement.prototype.showPopover == "function";
});
function ma(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function ya(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ma(Object(n), !0).forEach(function(r) {
      Tr(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ma(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
var Er = 2, wa = Er / 2;
function g0(e) {
  return {
    x: Math.floor(e.x),
    y: Math.floor(e.y)
  };
}
function p0(e) {
  return {
    x: e.x - wa,
    y: e.y - wa
  };
}
function h0(e) {
  return {
    x: Math.max(e.x, 0),
    y: Math.max(e.y, 0)
  };
}
function v0(e) {
  return {
    x: Math.min(e.x, window.innerWidth - Er),
    y: Math.min(e.y, window.innerHeight - Er)
  };
}
function ba(e) {
  var t = e.client, n = v0(h0(p0(g0(t))));
  return DOMRect.fromRect({
    x: n.x,
    y: n.y,
    width: Er,
    height: Er
  });
}
function _a(e) {
  var t = e.clientRect;
  return {
    left: "".concat(t.left, "px"),
    top: "".concat(t.top, "px"),
    width: "".concat(t.width, "px"),
    height: "".concat(t.height, "px")
  };
}
function m0(e) {
  var t = e.client, n = e.clientRect;
  return (
    // is within horizontal bounds
    t.x >= n.x && t.x <= n.x + n.width && // is within vertical bounds
    t.y >= n.y && t.y <= n.y + n.height
  );
}
function y0(e) {
  var t = e.initial, n = document.createElement("div");
  n.setAttribute(Hc, "true"), $i() && n.setAttribute("popover", "manual");
  var r = ba({
    client: t
  });
  Object.assign(n.style, ya(ya({
    position: "fixed"
  }, $i() ? (
    // needs to come first as it has 'inset: unset' which
    // needs to be overridden by our top / left values
    d0
  ) : {
    // Fallback: using maximum possible z-index so that this element
    // will always be on top of other positioned content.
    zIndex: f0
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
  }, _a({
    clientRect: r
  }))), document.body.appendChild(n), $i() && n.showPopover();
  var o = st.bind(window, {
    type: "pointermove",
    listener: function(l) {
      var u = {
        x: l.clientX,
        y: l.clientY
      };
      r = ba({
        client: u
      }), Object.assign(n.style, _a({
        clientRect: r
      }));
    },
    // using capture so we are less likely to be impacted by event stopping
    options: {
      capture: !0
    }
  });
  return function(l) {
    var u = l.current;
    if (o(), m0({
      client: u,
      clientRect: r
    })) {
      n.remove();
      return;
    }
    function c() {
      d(), n.remove();
    }
    var d = st.bindAll(window, [
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
function w0() {
  var e = null;
  function t() {
    return e = null, st.bind(window, {
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
      var l = s.eventName, u = s.payload;
      if (l === "onDragStart") {
        var c = u.location.initial.input, d = e ?? {
          x: c.clientX,
          y: c.clientY
        };
        r = y0({
          initial: d
        });
      }
      if (l === "onDrop") {
        var g, v = u.location.current.input;
        (g = r) === null || g === void 0 || g({
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
var b0 = "text/uri-list", Io = /* @__PURE__ */ new WeakMap();
function _0(e) {
  return Io.set(e.element, e), function() {
    Io.delete(e.element);
  };
}
var Sa = w0(), Uc = Nc({
  typeKey: "element",
  defaultDropEffect: "move",
  mount: function(t) {
    return Jo(Sa.bindEvents(), st.bind(document, {
      type: "dragstart",
      listener: function(r) {
        var o, s, l, u, c, d;
        if (t.canStart(r) && !r.defaultPrevented && r.dataTransfer) {
          var g = r.target;
          if (g instanceof HTMLElement) {
            var v = Io.get(g);
            if (v) {
              var y = yr(r), w = {
                element: v.element,
                dragHandle: (o = v.dragHandle) !== null && o !== void 0 ? o : null,
                input: y
              };
              if (v.canDrag && !v.canDrag(w)) {
                r.preventDefault();
                return;
              }
              if (v.dragHandle) {
                var D = jc({
                  x: y.clientX,
                  y: y.clientY
                });
                if (!v.dragHandle.contains(D)) {
                  r.preventDefault();
                  return;
                }
              }
              var R = (s = (l = v.getInitialDataForExternal) === null || l === void 0 ? void 0 : l.call(v, w)) !== null && s !== void 0 ? s : null;
              if (R)
                for (var A = 0, K = Object.entries(R); A < K.length; A++) {
                  var x = Fc(K[A], 2), j = x[0], _ = x[1];
                  r.dataTransfer.setData(j, _ ?? "");
                }
              s0() && !r.dataTransfer.types.includes(fs) && !r.dataTransfer.types.includes(b0) && r.dataTransfer.setData(fs, $c), r.dataTransfer.setData(Wc, "");
              var O = {
                element: v.element,
                dragHandle: (u = v.dragHandle) !== null && u !== void 0 ? u : null,
                data: (c = (d = v.getInitialData) === null || d === void 0 ? void 0 : d.call(v, w)) !== null && c !== void 0 ? c : {}
              }, z = {
                type: "element",
                payload: O,
                startedFrom: "internal"
              };
              t.start({
                event: r,
                dragType: z
              });
            }
          }
        }
      }
    }));
  },
  dispatchEventToSource: function(t) {
    var n, r, o = t.eventName, s = t.payload;
    (n = Io.get(s.source.element)) === null || n === void 0 || (r = n[o]) === null || r === void 0 || r.call(
      n,
      // I cannot seem to get the types right here.
      // TS doesn't seem to like that one event can need `nativeSetDragImage`
      // @ts-expect-error
      s
    );
  },
  onPostDispatch: Sa.getOnPostDispatch()
}), S0 = Uc.dropTarget;
function x0(e) {
  var t = Jo(
    // making the draggable register the adapter rather than drop targets
    // this is because you *must* have a draggable element to start a drag
    // but you _might_ not have any drop targets immediately
    // (You might create drop targets async)
    Uc.registerUsage(),
    _0(e),
    Bc(e.element, {
      attribute: "draggable",
      value: "true"
    })
  );
  return pn(t);
}
function xa(e) {
  e.defaultPrevented || (e.dataTransfer && (e.dataTransfer.dropEffect = "move"), e.preventDefault());
}
var gs = null;
function R0() {
  cr(), gs = st.bindAll(
    window,
    [{
      type: "dragover",
      listener: xa
    }, {
      type: "dragenter",
      listener: xa
    }, {
      type: "drop",
      listener: function(t) {
        t.preventDefault(), cr();
      }
    }, {
      type: "dragend",
      listener: cr
    }].concat(Yo(js({
      onDragEnd: cr
    }))),
    // being clear that these are added in the bubble phase
    {
      capture: !1
    }
  );
}
function cr() {
  var e;
  (e = gs) === null || e === void 0 || e(), gs = null;
}
function C0() {
  var e;
  if (((e = window.event) === null || e === void 0 ? void 0 : e.type) === "drop") {
    var t;
    (t = window.event) === null || t === void 0 || t.preventDefault();
  }
  cr();
}
var Ra = {
  start: R0,
  stop: C0
};
function Ca(e) {
  var t = e.source;
  return t.types.includes("Files");
}
function M0(e) {
  var t = e.source;
  return t.items.filter(function(n) {
    return n.kind === "file";
  }).map(function(n) {
    return n.getAsFile();
  }).filter(function(n) {
    return n != null;
  });
}
const Wi = /* @__PURE__ */ new Map(), Pn = "pnl-tst-row", qc = "pnl-tst-file";
function Gc(e, t) {
  const n = Dm(t);
  if (!t.key || !n) return null;
  const r = e.panes.find((o) => o.id() === t.paneId);
  return r ? { pane: r, key: t.key, instruction: n } : null;
}
function Ma(e, t) {
  const n = Gc(e, t);
  return n && n.instruction.type !== "instruction-blocked" ? n : null;
}
function Ea(e, t) {
  const n = Gc(e, t);
  for (const r of e.panes)
    n && r === n.pane ? r.showDrop(n.key, n.instruction) : r.clearDrop();
}
function E0(e, t) {
  return Jo(
    x0({
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
    S0({
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
      onDrag: ({ self: n }) => Ea(t, n.data),
      onDragLeave: () => {
        for (const n of t.panes) n.clearDrop();
      },
      onDrop: ({ self: n, source: r, location: o }) => {
        for (const l of t.panes) l.clearDrop();
        const s = Ma(t, n.data);
        s == null || s.pane.drop(r.data, s.key, s.instruction, o.current.input);
      }
    }),
    // Files dragged in from the desktop. A third registration rather than a
    // branch inside the second, because the two adapters carry different payloads
    // and pdnd keeps them apart on purpose: an external drag has no source
    // element, no preview to generate and no drag start inside the window.
    u0({
      element: e,
      // Text, links and HTML dragged in are somebody else's business. Files are
      // the only external kind this panel has anything to say about, and the same
      // reasoning as above applies: which pane, and whether it takes files at
      // all, is decided in `getData` because that runs on every move.
      canDrop: ({ source: n }) => Ca({ source: n }),
      getData: ({ input: n }) => {
        for (const r of t.panes) {
          const o = r.externalDropData(n);
          if (o) return o;
        }
        return { type: qc, key: null, paneId: "" };
      },
      onDrag: ({ self: n }) => Ea(t, n.data),
      onDragLeave: () => {
        for (const n of t.panes) n.clearDrop();
      },
      onDrop: ({ self: n, source: r }) => {
        for (const s of t.panes) s.clearDrop();
        const o = Ma(t, n.data);
        o == null || o.pane.dropFiles(M0({ source: r }), o.key, o.instruction);
      }
    }),
    // A file dropped anywhere the panel does not claim makes the browser navigate
    // to it, which throws the Panel session away without asking. pdnd blocks that
    // for the rest of the drag, and only while a table on the page is one that
    // would have taken the file: a page that opted into nothing keeps whatever
    // behaviour it had.
    c0({
      canMonitor: ({ source: n }) => Ca({ source: n }),
      onDragStart: () => {
        t.panes.some((n) => n.acceptsFiles()) && Ra.start();
      },
      onDrop: () => Ra.stop()
    })
  );
}
function I0(e, t) {
  let n = Wi.get(e);
  return n || (n = { panes: [] }, n.cleanup = E0(e, n), Wi.set(e, n)), n.panes.push(t), () => {
    var r;
    n.panes = n.panes.filter((o) => o !== t), !(n.panes.length > 0) && ((r = n.cleanup) == null || r.call(n), Wi.delete(e));
  };
}
const A0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ef5350" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m6 10h-4v8a4 4 0 1 1-4-4 3.96 3.96 0 0 1 2 .555V8h6Z"/></svg>', D0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#ff7043" d="M2 2a1 1 0 0 0-1 1v10c0 .554.446 1 1 1h12c.554 0 1-.446 1-1V3a1 1 0 0 0-1-1zm0 3h12v8H2zm1 2 2 2-2 2 1 1 3-3-3-3zm5 3.5V12h5v-1.5z"/></svg>', k0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#7e57c2" d="M20 18h-2v-2h-2v2c0 .193 0 .703 1.254 1.033A3.345 3.345 0 0 1 20 22h2v2h2v-2c0-.388-.562-.851-1.254-1.034C20.356 20.34 20 18.84 20 18m-3.254 2.966C14.356 20.34 14 18.84 14 18h-2v-2h-2v8h2v-2h4v2h2v-2c0-.388-.562-.851-1.254-1.034"/><path fill="#7e57c2" d="M24 4H4v20a4 4 0 0 0 4 4h16.16A3.84 3.84 0 0 0 28 24.16V8a4 4 0 0 0-4-4m2 14h-2v-2h-2v2c0 .193 0 .703 1.254 1.033A3.345 3.345 0 0 1 26 22v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1 2-2h2a2 2 0 0 1 2 2Z"/></svg>', O0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ffca28" d="M16 24c-5.525 0-10-.9-10-2v4c0 1.1 4.475 2 10 2s10-.9 10-2v-4c0 1.1-4.475 2-10 2m0-8c-5.525 0-10-.9-10-2v4c0 1.1 4.475 2 10 2s10-.9 10-2v-4c0 1.1-4.475 2-10 2m0-12C10.477 4 6 4.895 6 6v4c0 1.1 4.475 2 10 2s10-.9 10-2V6c0-1.105-4.477-2-10-2"/></svg>', P0 = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/><path fill="#42a5f5" d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5z"/></svg>', T0 = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m8.668 6h3.6641l-3.6641-3.668v3.668m-4.668-4.668h5.332l4 4v8c0 0.73828-0.59375 1.3359-1.332 1.3359h-8c-0.73828 0-1.332-0.59766-1.332-1.3359v-10.664c0-0.74219 0.59375-1.3359 1.332-1.3359m3.332 1.3359h-3.332v10.664h8v-6h-4.668z" fill="#90a4ae" /></svg>', F0 = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m6.922 3.768-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232" fill="#90a4ae" /></svg>', H0 = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.483 6H4.721a1 1 0 0 0-.949.684L2 12V5h12a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232l-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h11l2.403-5.606A1 1 0 0 0 14.483 6" fill="#90a4ae" /></svg>', L0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#e65100" d="m4 4 2 22 10 2 10-2 2-22Zm19.72 7H11.28l.29 3h11.86l-.802 9.335L15.99 25l-6.635-1.646L8.93 19h3.02l.19 2 3.86.77 3.84-.77.29-4H8.84L8 8h16Z"/></svg>', j0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#26a69a" d="M8.5 6h4l-4-4zM3.875 1H9.5l4 4v8.6c0 .773-.616 1.4-1.375 1.4h-8.25c-.76 0-1.375-.627-1.375-1.4V2.4c0-.777.612-1.4 1.375-1.4M4 13.6h8V8l-2.625 2.8L8 9.4zm1.25-7.7c-.76 0-1.375.627-1.375 1.4s.616 1.4 1.375 1.4c.76 0 1.375-.627 1.375-1.4S6.009 5.9 5.25 5.9"/></svg>', z0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#ffca28" d="M2 2v12h12V2zm6 6h1v4a1.003 1.003 0 0 1-1 1H7a1.003 1.003 0 0 1-1-1v-1h1v1h1zm3 0h2v1h-2v1h1a1.003 1.003 0 0 1 1 1v1a1.003 1.003 0 0 1-1 1h-2v-1h2v-1h-1a1.003 1.003 0 0 1-1-1V9a1.003 1.003 0 0 1 1-1"/></svg>', K0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path fill="#f9a825" d="M560-160v-80h120q17 0 28.5-11.5T720-280v-80q0-38 22-69t58-44v-14q-36-13-58-44t-22-69v-80q0-17-11.5-28.5T680-720H560v-80h120q50 0 85 35t35 85v80q0 17 11.5 28.5T840-560h40v160h-40q-17 0-28.5 11.5T800-360v80q0 50-35 85t-85 35zm-280 0q-50 0-85-35t-35-85v-80q0-17-11.5-28.5T120-400H80v-160h40q17 0 28.5-11.5T160-600v-80q0-50 35-85t85-35h120v80H280q-17 0-28.5 11.5T240-680v80q0 38-22 69t-58 44v14q36 13 58 44t22 69v80q0 17 11.5 28.5T280-240h120v80z"/></svg>', V0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#42a5f5" d="m14 10-4 3.5L6 10H4v12h4v-6l2 2 2-2v6h4V10zm12 6v-6h-4v6h-4l6 8 6-8z"/></svg>', B0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ef5350" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m4.93 10.44c.41.9.93 1.64 1.53 2.15l.41.32c-.87.16-2.07.44-3.34.93l-.11.04.5-1.04c.45-.87.78-1.66 1.01-2.4m6.48 3.81c.18-.18.27-.41.28-.66.03-.2-.02-.39-.12-.55-.29-.47-1.04-.69-2.28-.69l-1.29.07-.87-.58c-.63-.52-1.2-1.43-1.6-2.56l.04-.14c.33-1.33.64-2.94-.02-3.6a.85.85 0 0 0-.61-.24h-.24c-.37 0-.7.39-.79.77-.37 1.33-.15 2.06.22 3.27v.01c-.25.88-.57 1.9-1.08 2.93l-.96 1.8-.89.49c-1.2.75-1.77 1.59-1.88 2.12-.04.19-.02.36.05.54l.03.05.48.31.44.11c.81 0 1.73-.95 2.97-3.07l.18-.07c1.03-.33 2.31-.56 4.03-.75 1.03.51 2.24.74 3 .74.44 0 .74-.11.91-.3m-.41-.71.09.11c-.01.1-.04.11-.09.13h-.04l-.19.02c-.46 0-1.17-.19-1.9-.51.09-.1.13-.1.23-.1 1.4 0 1.8.25 1.9.35M7.83 17c-.65 1.19-1.24 1.85-1.69 2 .05-.38.5-1.04 1.21-1.69zm3.02-6.91c-.23-.9-.24-1.63-.07-2.05l.07-.12.15.05c.17.24.19.56.09 1.1l-.03.16-.16.82z"/></svg>', N0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#e64a19" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zM8 11v2h1v6H8v1h4v-1h-1v-2h2a3 3 0 0 0 3-3 3 3 0 0 0-3-3zm5 2a1 1 0 0 1 1 1 1 1 0 0 1-1 1h-2v-2z"/></svg>', $0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#0288d1" d="M9.86 2A2.86 2.86 0 0 0 7 4.86v1.68h4.29c.39 0 .71.57.71.96H4.86A2.86 2.86 0 0 0 2 10.36v3.781a2.86 2.86 0 0 0 2.86 2.86h1.18v-2.68a2.85 2.85 0 0 1 2.85-2.86h5.25c1.58 0 2.86-1.271 2.86-2.851V4.86A2.86 2.86 0 0 0 14.14 2zm-.72 1.61c.4 0 .72.12.72.71s-.32.891-.72.891c-.39 0-.71-.3-.71-.89s.32-.711.71-.711"/><path fill="#fdd835" d="M17.959 7v2.68a2.85 2.85 0 0 1-2.85 2.859H9.86A2.85 2.85 0 0 0 7 15.389v3.75a2.86 2.86 0 0 0 2.86 2.86h4.28A2.86 2.86 0 0 0 17 19.14v-1.68h-4.291c-.39 0-.709-.57-.709-.96h7.14A2.86 2.86 0 0 0 22 13.64V9.86A2.86 2.86 0 0 0 19.14 7zM8.32 11.513l-.004.004.038-.004zm6.54 7.276c.39 0 .71.3.71.89a.71.71 0 0 1-.71.71c-.4 0-.72-.12-.72-.71s.32-.89.72-.89"/></svg>', W0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#8bc34a" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zm4 7.5h-4v2h1l-2 1.67L10 13h1v-2H7v2h1l3 2.5L8 18H7v2h4v-2h-1l2-1.67L14 18h-1v2h4v-2h-1l-3-2.5 3-2.5h1z"/></svg>', U0 = '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 16 16"><path fill="#0288d1" d="M2 2v12h12V2zm4 6h3v1H8v4H7V9H6zm5 0h2v1h-2v1h1a1.003 1.003 0 0 1 1 1v1a1.003 1.003 0 0 1-1 1h-2v-1h2v-1h-1a1.003 1.003 0 0 1-1-1V9a1.003 1.003 0 0 1 1-1"/></svg>', q0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ff9800" d="m24 6 2 6h-4l-2-6h-3l2 6h-4l-2-6h-3l2 6H8L6 6H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3V6Z"/></svg>', G0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#01579b" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zM7 13l1.5 7h2l1.5-3 1.5 3h2l1.5-7h1v-2h-4v2h1l-.9 4.2L13 15h-2l-1.1 2.2L9 13h1v-2H6v2z"/></svg>', X0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#8bc34a" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m.12 13.5 3.74 3.74 1.42-1.41-2.33-2.33 2.33-2.33-1.42-1.41zm11.16 0-3.74-3.74-1.42 1.41 2.33 2.33-2.33 2.33 1.42 1.41z"/></svg>', Y0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ff5252" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2m12 16v-2H9v2zm-4-4v-2H6v2z"/></svg>', Z0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#afb42b" d="M14 17h-2v-2h-2v-2h2v2h2m0-6h-2v2h2v2h-2v-2h-2V9h2V7h-2V5h2v2h2m5-4H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2"/></svg>', Ia = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Aa = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, J0 = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Q0 = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, ey = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, ty = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, ny = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, ry = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, oy = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, iy = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, sy = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, ly = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, ay = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, uy = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, cy = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, fy = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, dy = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, gy = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, py = ["aria-label"], hy = {
  key: 0,
  class: "pnl-tst-tsep",
  "aria-hidden": "true"
}, vy = {
  key: 1,
  class: "pnl-tst-search"
}, my = ["innerHTML"], yy = ["value", "aria-label", "placeholder"], wy = ["aria-label", "aria-keyshortcuts", "aria-disabled", "title", "tabindex", "onClick", "onFocus"], by = ["innerHTML"], _y = {
  key: 1,
  class: "pnl-tst-empty"
}, Sy = ["aria-label", "aria-colcount", "aria-rowcount"], xy = {
  class: "pnl-tst-hrow",
  role: "row",
  "aria-rowindex": 1
}, Ry = ["aria-colindex", "aria-sort", "aria-keyshortcuts", "tabindex", "onClick", "onFocus", "onKeydown"], Cy = { class: "pnl-tst-hlabel" }, My = ["innerHTML"], Ey = ["onDblclick", "onMousedown", "onTouchstart"], Iy = ["aria-level", "aria-posinset", "aria-setsize", "aria-rowindex", "aria-expanded", "aria-busy", "aria-selected", "aria-haspopup", "tabindex", "onClick", "onContextmenu", "onFocus"], Ay = ["aria-colindex", "onDblclick"], Dy = ["onClick"], ky = {
  key: 1,
  class: "pnl-tst-twisty pnl-tst-twisty--leaf",
  "aria-hidden": "true"
}, Oy = ["checked", ".indeterminate", "aria-label", "onClick"], Py = ["innerHTML"], Ty = ["value", "aria-label", "aria-invalid", "onChange", "onKeydown", "onBlur"], Fy = ["value"], Hy = ["checked", "aria-label", "aria-invalid", "onChange", "onKeydown", "onBlur"], Ly = ["type", "step", "min", "max", "value", "aria-label", "aria-invalid", "onKeydown", "onBlur"], jy = {
  key: 2,
  class: "pnl-tst-value"
}, zy = {
  key: 3,
  class: "pnl-tst-rbtns"
}, Ky = ["aria-label", "title", "onClick"], Vy = ["innerHTML"], By = {
  key: 3,
  class: "pnl-tst-modal"
}, Ny = {
  id: "pnl-tst-confirm-message",
  class: "pnl-tst-dialog-message"
}, $y = { class: "pnl-tst-dialog-actions" }, Wy = ["aria-label"], Uy = {
  key: 0,
  class: "pnl-tst-msep",
  role: "separator"
}, qy = ["aria-keyshortcuts", "aria-disabled", "tabindex", "onClick", "onFocus"], Gy = ["innerHTML"], Xy = { class: "pnl-tst-mlabel" }, Yy = {
  key: 0,
  class: "pnl-tst-mkeys",
  "aria-hidden": "true"
}, Zy = "title", Jy = 200, Da = 16, ka = 6, Qy = 40, Mn = "search", xt = "|", En = 4, ew = 500, tw = 5e6, nw = {
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
    var xl;
    const t = e, n = {
      columnSizingFeature: Zv,
      columnResizingFeature: Yv,
      rowExpandingFeature: Jv,
      rowSelectionFeature: fm,
      rowSortingFeature: dm,
      coreRowModel: pc(),
      expandedRowModel: gm(),
      sortedRowModel: vm(),
      sortFns: { alphanumeric: Ah, text: Dh }
    }, r = V(() => (t.state.columns || []).length > 0), o = V(() => r.value && t.state.options.sortable !== !1), s = V(() => t.state.options.sort_folders_first === !0), l = V(() => r.value && t.state.options.resizable !== !1), u = V(
      () => (t.state.columns || []).slice(1).filter((i) => i.editable === !0)
    ), c = V(() => u.value.map((i) => String(i.id)));
    function d(i) {
      return u.value.find((a) => String(a.id) === i) ?? null;
    }
    function g(i) {
      var a;
      return String(((a = d(i)) == null ? void 0 : a.editor) || "text");
    }
    function v(i) {
      var a;
      return (((a = d(i)) == null ? void 0 : a.choices) || []).map((f) => String(f));
    }
    function y(i, a) {
      var h;
      const f = (h = d(i)) == null ? void 0 : h[a];
      return f ?? void 0;
    }
    const w = V(() => {
      const i = t.state.columns || [];
      return i.length === 0 ? [{ id: Zy, header: "", accessorFn: (a) => a.title }] : i.map((a) => {
        const f = a.field ?? a.id;
        return {
          id: a.id,
          header: a.header ?? a.id,
          // Through the type registry, because a type may carry a column value just as
          // it carries an icon, and because Python reads the same fields the same way
          // when it decides what a search reaches inside a pruned branch.
          accessorFn: (h) => R(h, f),
          enableSorting: a.sortable !== !1,
          enableResizing: a.resizable !== !1,
          // Written only where Python actually declared one, so the rest fall back to
          // TanStack's own defaults (150 wide, no narrower than 20) rather than to a
          // second set of numbers kept here.
          ...D("size", a.width),
          ...D("minSize", a.min_width),
          ...D("maxSize", a.max_width),
          // Only set when asked for, so an ordinary table keeps TanStack's own
          // detection of what a column holds rather than routing through ours.
          ...s.value ? { sortFn: K } : {}
        };
      });
    });
    function D(i, a) {
      return typeof a == "number" && Number.isFinite(a) ? { [i]: a } : {};
    }
    function R(i, a) {
      const f = i == null ? void 0 : i[a];
      if (f !== void 0) return f;
      const h = (t.state.types || {})[i == null ? void 0 : i.type];
      return h && typeof h == "object" ? h[a] : void 0;
    }
    function A(i) {
      return i.subRows.length > 0 || R(i.original, "allow_children") !== !1;
    }
    function K(i, a, f) {
      const h = A(i);
      if (h !== A(a)) {
        const S = we.value.some((H) => H.id === f && H.desc);
        return (h ? -1 : 1) * (S ? -1 : 1);
      }
      return he.getColumn(f).getAutoSortFn()(i, a, f);
    }
    const x = /* @__PURE__ */ re(j(t.state.expandedKeys));
    function j(i) {
      const a = {};
      for (const f of i || []) a[f] = !0;
      return a;
    }
    function _(i) {
      return i === !0 ? he.getCoreRowModel().flatRows.filter((a) => a.subRows.length > 0).map((a) => a.id).sort() : Object.keys(i).filter((a) => i[a]).sort();
    }
    const O = {
      audio: A0,
      console: D0,
      css: k0,
      database: O0,
      document: P0,
      file: T0,
      folder: F0,
      "folder-open": H0,
      html: L0,
      image: j0,
      javascript: z0,
      json: K0,
      markdown: V0,
      pdf: B0,
      powerpoint: N0,
      python: $0,
      table: W0,
      typescript: U0,
      video: q0,
      word: G0,
      xml: X0,
      yaml: Y0,
      zip: Z0
    };
    function z(i) {
      return i ? { ...O, ...t.state.icons || {} }[i] ?? null : null;
    }
    function J(i) {
      const a = R(i.original, "icon");
      return a ? (Kn(i) ? z(`${a}-open`) : null) ?? z(a) : null;
    }
    function W(i, a) {
      return i.length !== a.length ? !1 : i.every((f, h) => f === a[h]);
    }
    const L = V(() => t.state.options.select_mode ?? "none"), U = V(() => L.value !== "none"), se = V(() => L.value === "hierarchy"), fe = V(
      () => U.value && t.state.options.show_checkboxes !== !1
    ), te = /* @__PURE__ */ re(j(t.state.selectedKeys)), we = /* @__PURE__ */ re(xe(t.state.sorting));
    function xe(i) {
      return (i || []).filter((a) => a && a.id).map((a) => ({ id: String(a.id), desc: a.desc === !0 }));
    }
    function de(i, a) {
      return i.length === a.length && i.every((f, h) => f.id === a[h].id && f.desc === a[h].desc);
    }
    const oe = V(() => o.value && we.value.length > 0), ne = /* @__PURE__ */ re(Je(t.state.columnWidths));
    function Je(i) {
      const a = {};
      for (const [f, h] of Object.entries(i || {})) {
        const S = Math.round(Number(h));
        Number.isFinite(S) && S > 0 && (a[f] = S);
      }
      return a;
    }
    function hn(i, a) {
      const f = Object.keys(i);
      return f.length === Object.keys(a).length && f.every((h) => i[h] === a[h]);
    }
    const Ne = /* @__PURE__ */ re(null), he = wm({
      features: n,
      data: V(() => t.state.view || []),
      columns: w,
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
      enableRowSelection: U,
      enableMultiRowSelection: V(() => L.value !== "single"),
      enableSubRowSelection: se,
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
      state: V(() => ({
        expanded: x.value,
        rowSelection: te.value,
        sorting: we.value,
        columnSizing: ne.value
      })),
      onExpandedChange: (i) => {
        x.value = typeof i == "function" ? i(x.value) : i;
      },
      onRowSelectionChange: (i) => {
        te.value = typeof i == "function" ? i(te.value) : i;
      },
      onSortingChange: (i) => {
        we.value = xe(typeof i == "function" ? i(we.value) : i);
      },
      onColumnSizingChange: (i) => {
        ne.value = Je(
          typeof i == "function" ? i(ne.value) : i
        );
      }
    });
    function vn(i) {
      if (i.getIsSelected()) return "all";
      if (!se.value || i.subRows.length === 0) return "none";
      const a = i.subRows.map(vn);
      return a.every((f) => f === "all") ? "all" : a.some((f) => f !== "none") ? "some" : "none";
    }
    be(() => _(te.value), t.setSelectedKeys, { flush: "post" }), be(() => _(x.value), t.setExpandedKeys, { flush: "post" }), be(
      () => t.state.expandedKeys,
      (i) => {
        W(_(x.value), [...i || []].sort()) || (x.value = j(i));
      }
    ), be(
      () => t.state.selectedKeys,
      (i) => {
        W(_(te.value), [...i || []].sort()) || (te.value = j(i));
      }
    ), be(() => we.value, t.setSorting, { flush: "post" }), be(
      () => t.state.sorting,
      (i) => {
        const a = xe(i);
        de(we.value, a) || (we.value = a);
      }
    ), be(
      () => [ne.value, Ne.value],
      ([i, a]) => {
        a || t.setColumnWidths(i);
      },
      { flush: "post" }
    ), be(
      () => t.state.columnWidths,
      (i) => {
        const a = Je(i);
        hn(ne.value, a) || (ne.value = a);
      }
    ), be(
      () => [t.state.options.expand_all, t.state.view],
      ([i]) => {
        i && he.toggleAllRowsExpanded(!0);
      },
      { immediate: !0 }
    );
    const Ut = /* @__PURE__ */ re(t.state.filterText ?? ""), Lr = V(() => Ut.value.trim().toLowerCase()), Ae = V(() => Lr.value.length > 0);
    let Qe = null, Ft = t.state.filterText ?? "";
    be(
      () => t.state.filterText,
      (i) => {
        const a = i ?? "";
        a !== Ft && (Ft = a, Ut.value = a);
      }
    );
    function jr(i) {
      Ut.value = i, Qe !== null && clearTimeout(Qe), Qe = setTimeout(() => {
        Qe = null, Ft = Ut.value, t.setFilterText(Ft);
      }, Jy);
    }
    lr(() => {
      Qe !== null && clearTimeout(Qe);
    });
    function qt(i) {
      return i.getAllCells().some((a) => String(a.getValue() ?? "").toLowerCase().includes(Lr.value));
    }
    const ve = V(() => {
      if (!Ae.value) return he.getRowModel().rows;
      const i = he.getSortedRowModel().flatRows, a = /* @__PURE__ */ new Set();
      for (const f of i)
        if (qt(f)) {
          a.add(f.id);
          for (let h = f.getParentRow(); h; h = h.getParentRow()) a.add(h.id);
        }
      return i.filter((f) => a.has(f.id));
    }), p = V(() => {
      var i;
      return ((i = he.getHeaderGroups()[0]) == null ? void 0 : i.headers) ?? [];
    }), m = V(() => t.state.options.indent_px ?? 16), b = V(() => t.state.options.aria_label ?? "Tree table"), I = V(() => Ae.value ? "No matches" : "No data"), E = V(() => r.value ? 2 : 1), C = V(() => ve.value.length + (r.value ? 1 : 0)), T = /* @__PURE__ */ re(!1), P = /* @__PURE__ */ re(null), k = /* @__PURE__ */ new Map();
    function M(i, a) {
      a ? k.set(i, a) : k.delete(i);
    }
    const N = V(() => {
      const i = p.value;
      return i.length === 0 ? null : i.some((f) => f.column.id === P.value) ? P.value : i[0].column.id;
    });
    function F(i) {
      const a = p.value;
      if (a.length === 0) return;
      const f = a[Math.max(0, Math.min(i, a.length - 1))];
      T.value = !0, P.value = f.column.id, Ve(() => {
        var h;
        return (h = k.get(f.column.id)) == null ? void 0 : h.focus();
      });
    }
    function B() {
      const i = p.value;
      F(i.findIndex((a) => a.column.id === N.value));
    }
    function q() {
      T.value = !1, ni(_n.value);
    }
    function Q(i) {
      return o.value && i.column.getCanSort();
    }
    function ge(i) {
      if (!Q(i)) return;
      const a = i.column.getIsSorted();
      return a === "asc" ? "ascending" : a === "desc" ? "descending" : "none";
    }
    function le(i) {
      if (!Q(i)) return null;
      const a = i.column.getIsSorted();
      return a ? a === "asc" ? Aa : Ia : null;
    }
    function _e(i) {
      Q(i) && i.column.toggleSorting();
    }
    function Ee(i) {
      F(p.value.indexOf(i)), _e(i);
    }
    function De(i) {
      return l.value && i.column.getCanResize();
    }
    function $e(i) {
      var h;
      const a = i.column.id;
      if (a in ne.value) return null;
      const f = Math.round(((h = k.get(a)) == null ? void 0 : h.getBoundingClientRect().width) ?? 0);
      return f <= 0 || f === i.column.getSize() ? null : (ne.value = { ...ne.value, [a]: f }, f);
    }
    async function Ht(i, a) {
      if (!De(i)) return;
      a.stopPropagation(), $e(i) !== null && await Ve(), i.getResizeHandler()(a), Ne.value = i.column.id;
      const f = () => {
        Ne.value = null;
      };
      for (const h of ["mouseup", "touchend", "touchcancel"])
        document.addEventListener(h, f, { once: !0 });
    }
    function jn(i, a) {
      if (!De(i)) return;
      const f = i.column, h = f.columnDef.minSize ?? 20, S = f.columnDef.maxSize ?? Number.MAX_SAFE_INTEGER, H = $e(i) ?? f.getSize(), ae = Math.min(Math.max(Math.round(H + a), h), S);
      he.setColumnSizing(($) => ({ ...$, [f.id]: ae }));
    }
    function ke(i) {
      De(i) && i.column.resetSize();
    }
    function Ge(i, a) {
      const f = p.value, h = Math.max(
        0,
        f.findIndex((S) => S.column.id === N.value)
      );
      if (a.altKey) {
        switch (a.key) {
          case "ArrowLeft":
            jn(i, -Da);
            break;
          case "ArrowRight":
            jn(i, Da);
            break;
          case "Home":
            ke(i);
            break;
          default:
            return;
        }
        a.preventDefault(), a.stopPropagation();
        return;
      }
      switch (a.key) {
        case "ArrowLeft":
          F(h - 1);
          break;
        case "ArrowRight":
          F(h + 1);
          break;
        case "Home":
          F(0);
          break;
        case "End":
          F(f.length - 1);
          break;
        case "ArrowDown":
          q();
          break;
        case "Enter":
        case " ":
          _e(i);
          break;
        default:
          return;
      }
      a.preventDefault(), a.stopPropagation();
    }
    const zn = V(() => {
      const i = /* @__PURE__ */ new Map();
      for (const a of ve.value) {
        const f = a.parentId ?? "", h = i.get(f) ?? [];
        h.push(a.id), i.set(f, h);
      }
      return i;
    });
    function mn(i) {
      return zn.value.get(i.parentId ?? "") ?? [];
    }
    function Xc(i) {
      return mn(i).indexOf(i.id) + 1;
    }
    function Yc(i) {
      return mn(i).length;
    }
    function zr(i) {
      return R(i.original, "lazy") === !0;
    }
    function yn(i) {
      return Ae.value ? (zn.value.get(i.id) ?? []).length > 0 : i.getCanExpand() || zr(i);
    }
    function Kn(i) {
      return Ae.value ? yn(i) : i.getIsExpanded();
    }
    const Gt = /* @__PURE__ */ re(/* @__PURE__ */ new Set());
    function Qo(i) {
      return Gt.value.has(i.id) && zr(i);
    }
    function Xt(i, a) {
      if (a && zr(i) && !Gt.value.has(i.id) && (Gt.value = new Set(Gt.value).add(i.id), t.emitEvent("lazy_load", { key: i.id })), !zr(i) || !a || x.value === !0) {
        i.toggleExpanded(a);
        return;
      }
      x.value = { ...x.value, [i.id]: !0 };
    }
    be(ve, (i) => {
      if (Gt.value.size === 0) return;
      const a = new Set(i.filter((f) => Qo(f)).map((f) => f.id));
      a.size !== Gt.value.size && (Gt.value = a);
    });
    const Zc = V(() => {
      if (!r.value) return {};
      const i = { "--pnl-tst-total": `${he.getTotalSize()}px` };
      return p.value.forEach((a, f) => {
        i[`--pnl-tst-w${f}`] = `${a.column.getSize()}px`;
      }), i;
    }), Jc = V(() => {
      const i = p.value[0];
      return i ? i.column.id in ne.value : !1;
    });
    function ei(i) {
      return r.value ? i === 0 && !Jc.value ? { flex: "1 0 var(--pnl-tst-w0)" } : { flex: `0 0 var(--pnl-tst-w${i})` } : { flex: "1 1 0" };
    }
    function Qc(i) {
      return { ...ei(0), paddingInlineStart: `${i.depth * m.value}px` };
    }
    const Vn = /* @__PURE__ */ re(null), Vs = /* @__PURE__ */ re(null), Kr = /* @__PURE__ */ re(0), Vr = /* @__PURE__ */ re(null), Bn = /* @__PURE__ */ re(0), Lt = /* @__PURE__ */ re(28);
    function ti() {
      var f;
      const i = Vn.value;
      if (!i) return;
      const a = Number.parseFloat(getComputedStyle(i).getPropertyValue("--pnl-tst-row-height"));
      Number.isFinite(a) && a > 0 && (Lt.value = a), Bn.value = ((f = Vs.value) == null ? void 0 : f.offsetHeight) ?? 0, Vr.value = i.clientHeight, Kr.value = i.scrollTop;
    }
    const Bs = V(() => {
      const i = ve.value.length;
      if (Vr.value === null) return { start: 0, end: Math.min(i, Qy) };
      const a = Math.max(0, Kr.value - Bn.value), f = Math.max(0, Math.floor(a / Lt.value) - ka), h = Math.ceil(Vr.value / Lt.value) + ka * 2 + 1;
      return { start: f, end: Math.min(i, f + h) };
    }), Ns = V(() => {
      const i = ve.value, { start: a, end: f } = Bs.value, h = i.findIndex((H) => H.id === _n.value), S = [];
      h >= 0 && h < a && S.push({ row: i[h], index: h, held: !0 });
      for (let H = a; H < f; H += 1)
        S.push({ row: i[H], index: H, held: !1 });
      return h >= f && S.push({ row: i[h], index: h, held: !0 }), S;
    });
    function ef(i) {
      return { position: "absolute", top: `${i * Lt.value}px`, left: "0" };
    }
    const tf = V(() => ({
      height: `${ve.value.length * Lt.value}px`,
      paddingTop: `${Bs.value.start * Lt.value}px`
    }));
    function nf(i) {
      Kr.value = i.currentTarget.scrollTop;
    }
    function rf(i) {
      const a = Vn.value;
      if (!a || Vr.value === null) return;
      const f = ve.value.findIndex((H) => H.id === i);
      if (f < 0) return;
      const h = f * Lt.value + Bn.value, S = h + Lt.value;
      h < a.scrollTop + Bn.value ? a.scrollTop = h - Bn.value : S > a.scrollTop + a.clientHeight && (a.scrollTop = S - a.clientHeight), Kr.value = a.scrollTop;
    }
    function ni(i, a = void 0) {
      i != null && (rf(i), Ve(() => {
        var f;
        return (f = Nn.get(i)) == null ? void 0 : f.focus(a);
      }));
    }
    let yt = null;
    co(() => {
      ti(), typeof ResizeObserver == "function" && (yt = new ResizeObserver(() => ti()), Vn.value && yt.observe(Vn.value));
    }), lr(() => {
      yt == null || yt.disconnect(), yt = null;
    });
    function of(i) {
      Vn.value = i ?? null, yt && (yt.disconnect(), i && (yt.observe(i), Ve(ti)));
    }
    const wn = /* @__PURE__ */ re(null), bn = /* @__PURE__ */ re(!0), Nn = /* @__PURE__ */ new Map();
    function jt(i) {
      wn.value = i, bn.value = !0, T.value = !1;
    }
    function sf(i, a) {
      a ? Nn.set(i, a) : Nn.delete(i);
    }
    const _n = V(() => {
      const i = ve.value;
      return i.length === 0 ? null : i.some((a) => a.id === wn.value) ? wn.value : i[0].id;
    });
    function ze(i) {
      i != null && (jt(i), ni(i));
    }
    function Br(i) {
      const a = ve.value;
      a.length !== 0 && ze(a[Math.max(0, Math.min(i, a.length - 1))].id);
    }
    function $s(i, a) {
      const f = ve.value;
      if (f.length === 0) return;
      const h = f[Math.max(0, Math.min(i, f.length - 1))], S = (a == null ? void 0 : a.shiftKey) && U.value && L.value !== "single";
      S && wt.value === null && (wt.value = _n.value), ze(h.id), S && Ws(h, !1);
    }
    function lf(i) {
      const a = ve.value;
      if (a.length === 0) return;
      const f = Math.max(
        0,
        a.findIndex((H) => H.id === _n.value)
      ), h = a[f];
      if (i.ctrlKey || i.metaKey) {
        const H = {
          a: "select-all",
          c: "copy",
          f: Mn,
          v: "paste",
          x: "cut",
          z: i.shiftKey ? "redo" : "undo"
        }[i.key.toLowerCase()];
        if (H && Wn(H)) {
          i.preventDefault(), li(H);
          return;
        }
      }
      if (i.altKey) {
        const H = {
          ArrowUp: "move-up",
          ArrowDown: "move-down",
          ArrowLeft: "outdent",
          ArrowRight: "indent"
        }[i.key];
        if (H && Wn(H)) {
          i.preventDefault(), li(H);
          return;
        }
      }
      if (Zr.value && (i.key === "ContextMenu" || i.key === "F10" && i.shiftKey)) {
        i.preventDefault(), $f(h);
        return;
      }
      const S = {
        Insert: i.shiftKey ? "new-file" : "new-folder",
        F2: "rename",
        Delete: "delete",
        Escape: "clear-selection"
      }[i.key];
      if (S && Wn(S)) {
        i.preventDefault(), li(S);
        return;
      }
      switch (i.key) {
        case "ArrowDown":
          i.preventDefault(), $s(f + 1, i);
          break;
        case "ArrowUp":
          i.preventDefault(), f === 0 && r.value && !i.shiftKey ? B() : $s(f - 1, i);
          break;
        case "ArrowRight":
          if (i.preventDefault(), !yn(h)) break;
          Kn(h) ? Br(f + 1) : (Xt(h, !0), ze(h.id));
          break;
        case "ArrowLeft":
          i.preventDefault(), !Ae.value && yn(h) && h.getIsExpanded() ? (Xt(h, !1), ze(h.id)) : h.parentId && ze(h.parentId);
          break;
        case "Home":
          i.preventDefault(), Br(0);
          break;
        case "End":
          i.preventDefault(), Br(a.length - 1);
          break;
        case "F2":
          if (c.value.length === 0) break;
          i.preventDefault(), Yt(h.id, c.value[0]);
          break;
        case "Enter":
          i.preventDefault(), c.value.length > 0 ? Yt(h.id, c.value[0]) : t.emitEvent("activate", { key: h.id });
          break;
        case " ":
          if (!U.value) break;
          i.preventDefault(), Xs(h);
          break;
      }
    }
    const wt = /* @__PURE__ */ re(null);
    function $n(i) {
      wt.value = i.id, te.value = {}, i.toggleSelected(!0, { selectChildren: !1 });
    }
    function Ws(i, a) {
      const f = ve.value, h = f.findIndex(($) => $.id === wt.value), S = f.findIndex(($) => $.id === i.id);
      if (S === -1) return;
      if (h === -1) {
        $n(i);
        return;
      }
      a || (te.value = {});
      const [H, ae] = h <= S ? [h, S] : [S, h];
      for (let $ = H; $ <= ae; $ += 1)
        f[$].toggleSelected(!0, { selectChildren: !1 });
    }
    const af = V(() => t.state.options.toggle_on_click === !0);
    function uf(i) {
      const a = _(te.value);
      return a.length === 1 && a[0] === i.id;
    }
    function Us() {
      te.value = {}, wt.value = null, bn.value = !1;
    }
    function qs() {
      _(te.value).length === 0 && (bn.value = !1);
    }
    be(
      () => _(te.value).length > 0,
      (i) => {
        i && (bn.value = !0);
      }
    );
    function cf(i, a) {
      jt(i.id);
      const f = !!(a != null && a.shiftKey || a != null && a.ctrlKey || a != null && a.metaKey);
      U.value && !f && af.value && uf(i) ? Us() : U.value && L.value !== "single" ? a != null && a.shiftKey ? Ws(i, a.ctrlKey || a.metaKey) : a != null && a.ctrlKey || a != null && a.metaKey ? (wt.value = i.id, gf(i)) : $n(i) : U.value && $n(i), t.emitEvent("activate", { key: i.id });
    }
    function ff(i) {
      jt(i.id), !Ae.value && Xt(i, !i.getIsExpanded());
    }
    function Gs(i) {
      return vn(i) === "all";
    }
    function df(i) {
      return vn(i) === "some";
    }
    function gf(i) {
      jt(i.id), i.toggleSelected(void 0, { selectChildren: !1 }), qs();
    }
    function Xs(i) {
      jt(i.id), i.toggleSelected(!Gs(i), {
        selectChildren: se.value,
        deselectParents: se.value
      }), qs();
    }
    function pf(i) {
      Xs(i), ze(i.id);
    }
    const ri = {
      "new-folder": { icon: ry, label: "New folder", keys: "Insert", node: {} },
      "new-file": {
        icon: ny,
        label: "New file",
        keys: "Shift+Insert",
        node: { allow_children: !1 }
      },
      rename: { icon: sy, label: "Rename", keys: "F2" },
      delete: { icon: dy, label: "Delete", keys: "Delete" },
      undo: { icon: gy, label: "Undo", keys: "Control+Z" },
      redo: { icon: ly, label: "Redo", keys: "Control+Shift+Z" },
      cut: { icon: ay, label: "Cut", keys: "Control+X" },
      copy: { icon: ty, label: "Copy", keys: "Control+C" },
      paste: { icon: ey, label: "Paste", keys: "Control+V" },
      "move-up": { icon: Aa, label: "Move up", keys: "Alt+ArrowUp" },
      "move-down": { icon: Ia, label: "Move down", keys: "Alt+ArrowDown" },
      outdent: { icon: oy, label: "Outdent", keys: "Alt+ArrowLeft" },
      indent: { icon: iy, label: "Indent", keys: "Alt+ArrowRight" },
      "expand-all": { icon: J0, label: "Expand all" },
      "collapse-all": { icon: Q0, label: "Collapse all" },
      "select-all": { icon: fy, label: "Select all", keys: "Control+A" },
      "clear-selection": { icon: cy, label: "Clear selection", keys: "Escape" }
    }, hf = [
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
      Mn
    ], vf = [
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
    function oi(i, a) {
      const f = i === !0 ? a : Array.isArray(i) ? i : [], h = [];
      return f.forEach((S, H) => {
        const ae = typeof S == "string" ? {} : S || {}, $ = typeof S == "string" ? S : ae.id, Ci = `${$}#${H}`;
        if ($ === xt || $ === Mn) {
          h.push({ uid: Ci, id: $ });
          return;
        }
        const or = ri[$];
        if (!or) return;
        const Rl = ae.label ?? or.label;
        h.push({
          uid: Ci,
          id: $,
          label: Rl,
          icon: z(ae.icon) ?? or.icon,
          keys: or.keys,
          node: { title: Rl, ...or.node ?? {}, ...ae.node ?? {} }
        });
      }), h;
    }
    const Nr = V(() => oi(t.state.options.toolbar, hf)), ii = V(
      () => oi(t.state.options.menu, vf).filter((i) => i.id !== Mn)
    ), si = V(
      () => oi(t.state.options.row_actions, []).filter(
        (i) => i.id !== Mn && i.id !== xt
      )
    ), mf = V(() => Nr.value.length > 0), yf = V(() => t.state.options.toolbar_label ?? "Tree actions"), Ys = V(() => t.state.options.search_label ?? "Search");
    function Zs(i) {
      return Nr.value.find((a) => a.id === i) ?? ii.value.find((a) => a.id === i) ?? si.value.find((a) => a.id === i) ?? null;
    }
    function Wn(i) {
      return Zs(i) !== null;
    }
    function li(i) {
      const a = Zs(i);
      a && Ur(a);
    }
    const Ke = V(() => ve.value.find((i) => i.id === _n.value) ?? null);
    function wf(i) {
      return ve.value.filter((a) => (a.parentId ?? "") === (i.parentId ?? ""));
    }
    function Js() {
      const i = Ke.value;
      if (!i) return [];
      const a = ml(i), f = i.parentId ?? "";
      return a.every((S) => {
        var H;
        return (((H = Rn(S)) == null ? void 0 : H.parentId) ?? "") === f;
      }) ? a : [i.id];
    }
    function ai() {
      const i = Ke.value;
      if (!i) return [];
      if (!U.value || !i.getIsSelected()) return [i.id];
      const a = ve.value.filter((f) => f.getIsSelected()).map((f) => f.id);
      return a.length > 0 ? a : [i.id];
    }
    const ui = V(() => {
      var i;
      return ((i = t.state.clipboard) == null ? void 0 : i.keys) ?? [];
    }), bf = V(() => {
      var a;
      const i = new Set(((a = t.state.clipboard) == null ? void 0 : a.mode) === "cut" ? ui.value : []);
      return i.size === 0 || ve.value.forEach((f) => {
        f.parentId && i.has(f.parentId) && i.add(f.id);
      }), i;
    });
    function Un(i) {
      const a = Ke.value;
      if (!a) return null;
      const f = new Set(Js()), h = wf(a), S = h.map((ae, $) => f.has(ae.id) ? $ : -1).filter((ae) => ae >= 0);
      if (S.length === 0) return null;
      let H = (i < 0 ? Math.min(...S) : Math.max(...S)) + i;
      for (; H >= 0 && H < h.length && f.has(h[H].id); ) H += i;
      return h[H] ?? null;
    }
    let We = null;
    be(
      () => t.state.view,
      () => {
        const i = We;
        if (We = null, !!i) {
          if (i.editor) {
            Ve(() => {
              var a;
              return (a = Kt.value) == null ? void 0 : a.focus();
            });
            return;
          }
          if (i.key !== void 0) {
            ze(i.key);
            return;
          }
          Ve(() => {
            i.index !== void 0 ? Br(i.index) : i.pasted !== void 0 ? Sf(i.pasted) : _f(i.added);
          });
        }
      }
    );
    function _f(i) {
      const a = he.getCoreRowModel().flatRows.find((f) => !i.has(f.id));
      a && (ze(a.id), U.value && (te.value = {}, wt.value = a.id, a.toggleSelected(!0, { selectChildren: !1 })), Wn("rename") && Ve(() => Gn(a.id, !0)));
    }
    function Sf(i) {
      const a = he.getCoreRowModel().flatRows.filter((S) => !i.has(S.id)), f = new Set(a.map((S) => S.id)), h = a.filter((S) => !f.has(S.parentId ?? ""));
      h.length !== 0 && (ze(h[0].id), U.value && (te.value = {}, wt.value = h[0].id, h.forEach((S) => S.toggleSelected(!0, { selectChildren: !1 }))));
    }
    const bt = /* @__PURE__ */ re(null), Re = /* @__PURE__ */ re(""), zt = /* @__PURE__ */ re(""), Kt = /* @__PURE__ */ re(null), $r = /* @__PURE__ */ re(!1), et = /* @__PURE__ */ re(!1), _t = /* @__PURE__ */ re(null), ci = /* @__PURE__ */ re(null), fi = /* @__PURE__ */ re(null), xf = V(() => t.state.options.extension_warning !== !1);
    function Qs(i) {
      const a = String(i ?? ""), f = a.lastIndexOf(".");
      return f < 0 ? "" : a.slice(f + 1).toLowerCase();
    }
    function Rf(i, a) {
      return xf.value && R(i, "allow_children") === !1 && Qs(a) !== Qs(i.title ?? "");
    }
    let qn = null;
    function Gn(i, a = !1) {
      const f = Rn(i);
      f && (qn = a ? i : null, el(i, "", f.original.title ?? ""));
    }
    function Yt(i, a) {
      const f = Rn(i), h = d(a);
      if (!f || !h) return;
      qn = null;
      const S = sl(f, a);
      $r.value = S === !0, el(i, a, S === !0 || S === !1 ? "" : S);
    }
    function el(i, a, f) {
      et.value = !1, zt.value = f, bt.value = i, Re.value = a, t.setEditingKey(i), t.setEditingColumn(a), Ve(() => {
        var h, S, H;
        (h = Kt.value) == null || h.focus(), (H = (S = Kt.value) == null ? void 0 : S.select) == null || H.call(S);
      });
    }
    function Xn() {
      qn = null, _t.value = null, bt.value = null, Re.value = "", et.value = !1, t.setEditingKey(""), t.setEditingColumn("");
    }
    function tl(i, a) {
      return i === 0 ? "" : String(a.column.id);
    }
    function nl(i, a, f) {
      return bt.value === i.id && Re.value === tl(a, f);
    }
    function rl(i, a) {
      return i > 0 && c.value.includes(String(a.column.id));
    }
    function Cf(i, a, f) {
      rl(a, f) && Yt(i.id, String(f.column.id));
    }
    function di(i, a, f) {
      const h = i.original.title ?? i.id;
      if (a === 0) return `Rename ${h}`;
      const S = d(String(f.column.id));
      return `${(S == null ? void 0 : S.header) ?? f.column.id} of ${h}`;
    }
    function Mf(i) {
      zt.value = i, et.value = !1;
    }
    function ol(i, a, f) {
      et.value = !1, g(a) === "checkbox" ? $r.value = f === !0 : zt.value = String(f), il(i, a);
    }
    function Ef(i, a = null) {
      if (_t.value || bt.value !== i.id || Re.value !== "") return;
      const f = zt.value.trim(), h = f.length > 0 && f !== (i.original.title ?? "");
      if (h && qn !== i.id && Rf(i.original, f)) {
        _t.value = { key: i.id, title: f, previous: i.original.title ?? i.id }, Ve(() => {
          var S;
          return (S = fi.value) == null ? void 0 : S.focus();
        });
        return;
      }
      if (ll(i, a), !h) {
        a === null && ze(i.id);
        return;
      }
      We = a === null ? { key: i.id } : { editor: !0 }, t.emitEvent("rename", { key: i.id, title: f });
    }
    function il(i, a, f = null) {
      if (bt.value !== i.id || Re.value !== a) return;
      const h = g(a) === "checkbox" ? $r.value : zt.value, S = h !== sl(i, a);
      if (ll(i, f), !S) {
        f === null && ze(i.id);
        return;
      }
      We = f === null ? { key: i.id } : { editor: !0 }, t.emitEvent("edit", { key: i.id, column: a, value: h });
    }
    function sl(i, a) {
      const f = d(a), h = R(i.original, (f == null ? void 0 : f.field) ?? a);
      return g(a) === "checkbox" ? h === !0 : h == null ? "" : String(h);
    }
    function ll(i, a) {
      a === null ? Xn() : a === "" ? Gn(i.id) : Yt(i.id, a);
    }
    function gi(i, a = null) {
      Re.value === "" ? Ef(i, a) : il(i, Re.value, a);
    }
    function pi(i, a, f) {
      bt.value === i.id && Re.value === tl(a, f) && gi(i);
    }
    function al() {
      const { key: i, title: a } = _t.value;
      _t.value = null, Xn(), We = { key: i }, t.emitEvent("rename", { key: i, title: a });
    }
    function ul() {
      _t.value = null, Ve(() => {
        var i, a;
        (i = Kt.value) == null || i.focus(), (a = Kt.value) == null || a.select();
      });
    }
    function If(i) {
      var h;
      const a = i.key;
      if (a === "Escape" || a === "n" || a === "N") {
        i.preventDefault(), ul();
        return;
      }
      if (a === "y" || a === "Y") {
        i.preventDefault(), al();
        return;
      }
      if (a !== "Tab" && a !== "ArrowLeft" && a !== "ArrowRight") return;
      i.preventDefault(), (h = (i.target === ci.value ? fi : ci).value) == null || h.focus();
    }
    function Af(i) {
      if (bt.value !== i.id) return;
      const a = qn === i.id;
      if (Xn(), !a) {
        ze(i.id);
        return;
      }
      We = { index: ve.value.findIndex((f) => f.id === i.id) }, t.emitEvent("delete", { key: i.id, keys: [i.id] });
    }
    function Df() {
      return [...Wn("rename") ? [""] : [], ...c.value];
    }
    function kf(i, a) {
      const f = Df(), h = f.indexOf(i);
      if (h < 0) return null;
      const S = f[h + a];
      return S === void 0 ? null : S;
    }
    function hi(i, a) {
      if (a.key === "Enter")
        a.preventDefault(), gi(i);
      else if (a.key === "Escape")
        a.preventDefault(), Re.value === "" ? Af(i) : (Xn(), ze(i.id));
      else if (a.key === "Tab") {
        const f = kf(Re.value, a.shiftKey ? -1 : 1);
        if (f === null) return;
        a.preventDefault(), gi(i, f);
      }
    }
    be(
      () => [t.state.editingKey || "", t.state.editingColumn || ""],
      ([i, a]) => {
        i === (bt.value || "") && a === Re.value || (i ? a ? Yt(i, a) : Gn(i) : Xn());
      }
    );
    let cl = ((xl = t.state.editError) == null ? void 0 : xl.seq) ?? 0;
    be(
      () => t.state.editError,
      (i) => {
        const a = (i == null ? void 0 : i.seq) ?? 0;
        if (!(i != null && i.key) || a === cl) return;
        cl = a;
        const f = String(i.column || "");
        d(f) && (Yt(i.key, f), bt.value === i.key && (zt.value = i.value === void 0 || i.value === null ? "" : String(i.value), et.value = !0));
      }
    ), co(() => {
      t.state.editingKey && (t.state.editingColumn ? Yt(t.state.editingKey, t.state.editingColumn) : Gn(t.state.editingKey));
    });
    function Wr(i, a) {
      const f = Ke.value;
      !f || !i || (We = { key: f.id }, t.emitEvent("move", {
        key: f.id,
        keys: Js(),
        position: a,
        anchorKey: i.id
      }));
    }
    function Of(i) {
      const a = Ke.value, f = a ? R(a.original, "allow_children") === !1 ? "after" : "child" : null;
      a && f === "child" && !Ae.value && Xt(a, !0), We = { added: new Set(he.getCoreRowModel().flatRows.map((h) => h.id)) }, t.emitEvent("add", { anchorKey: (a == null ? void 0 : a.id) ?? null, position: f, node: i.node });
    }
    function Pf() {
      var a;
      const i = ai();
      i.length !== 0 && (We = { index: ve.value.findIndex((f) => {
        var h;
        return f.id === ((h = Ke.value) == null ? void 0 : h.id);
      }) }, t.emitEvent("delete", { key: ((a = Ke.value) == null ? void 0 : a.id) ?? null, keys: i }));
    }
    function Tf(i) {
      We = { index: ve.value.findIndex((a) => {
        var f;
        return a.id === ((f = Ke.value) == null ? void 0 : f.id);
      }) }, t.emitEvent(i, {});
    }
    function Ff(i) {
      var f;
      const a = ai();
      a.length !== 0 && t.emitEvent(i, { key: ((f = Ke.value) == null ? void 0 : f.id) ?? null, keys: a });
    }
    function Hf() {
      var h;
      const i = Ke.value, a = i ? R(i.original, "allow_children") === !1 ? "after" : "child" : null;
      i && a === "child" && !Ae.value && Xt(i, !0);
      const f = ui.value;
      We = ((h = t.state.clipboard) == null ? void 0 : h.mode) === "cut" ? { key: f[0] } : { pasted: new Set(he.getCoreRowModel().flatRows.map((S) => S.id)) }, t.emitEvent("paste", { anchorKey: (i == null ? void 0 : i.id) ?? null, position: a });
    }
    function Yn(i) {
      var a;
      switch (i.id) {
        case "new-folder":
        case "new-file":
          return !0;
        case "rename":
          return Ke.value !== null;
        case "delete":
        case "cut":
        case "copy":
          return ai().length > 0;
        case "paste":
          return ui.value.length > 0;
        case "undo":
          return t.state.canUndo === !0;
        case "redo":
          return t.state.canRedo === !0;
        case "move-up":
        case "move-down":
          return !oe.value && Un(i.id === "move-up" ? -1 : 1) !== null;
        case "indent": {
          const f = Un(-1);
          return f !== null && R(f.original, "allow_children") !== !1;
        }
        case "outdent":
          return !!((a = Ke.value) != null && a.parentId);
        case "expand-all":
        case "collapse-all":
          return ve.value.length > 0 && !Ae.value;
        case "select-all":
          return ve.value.length > 0 && U.value && L.value !== "single";
        case "clear-selection":
          return U.value && _(te.value).length > 0;
        default:
          return !0;
      }
    }
    function fl(i) {
      return i.keys ? i.keys.replace("Control", "Ctrl") : "";
    }
    function Lf(i) {
      return i.keys ? `${i.label} (${fl(i)})` : i.label;
    }
    function Ur(i) {
      var a, f, h, S;
      if (Yn(i))
        switch (i.id) {
          case "new-folder":
          case "new-file":
            Of(i);
            break;
          case "rename":
            Gn(Ke.value.id);
            break;
          case "delete":
            Pf();
            break;
          case "undo":
          case "redo":
            Tf(i.id);
            break;
          case "cut":
          case "copy":
            Ff(i.id);
            break;
          case "paste":
            Hf();
            break;
          case "move-up":
            Wr(Un(-1), "before");
            break;
          case "move-down":
            Wr(Un(1), "after");
            break;
          case "indent": {
            const H = Un(-1);
            H && !Ae.value && Xt(H, !0), Wr(H, "child");
            break;
          }
          case "outdent":
            Wr(Rn((a = Ke.value) == null ? void 0 : a.parentId), "after");
            break;
          case "expand-all":
            he.toggleAllRowsExpanded(!0);
            break;
          case "collapse-all":
            he.toggleAllRowsExpanded(!1);
            break;
          case "select-all":
            te.value = Object.fromEntries(ve.value.map((H) => [H.id, !0])), wt.value = ((f = ve.value[0]) == null ? void 0 : f.id) ?? null;
            break;
          case "clear-selection":
            Us();
            break;
          case Mn:
            (h = vi.value) == null || h.focus(), (S = vi.value) == null || S.select();
            break;
        }
    }
    const vi = /* @__PURE__ */ re(null), mi = V(() => Nr.value.filter((i) => i.id in ri)), qr = /* @__PURE__ */ re(null), yi = /* @__PURE__ */ new Map(), dl = V(() => {
      const i = mi.value;
      return i.length === 0 ? null : i.some((a) => a.uid === qr.value) ? qr.value : i[0].uid;
    });
    function jf(i, a) {
      a ? yi.set(i, a) : yi.delete(i);
    }
    function Gr(i) {
      const a = mi.value;
      if (a.length === 0) return;
      const f = a[Math.max(0, Math.min(i, a.length - 1))].uid;
      qr.value = f, Ve(() => {
        var h;
        return (h = yi.get(f)) == null ? void 0 : h.focus();
      });
    }
    function zf(i) {
      const a = mi.value, f = Math.max(
        0,
        a.findIndex((h) => h.uid === dl.value)
      );
      switch (i.key) {
        case "ArrowRight":
          i.preventDefault(), Gr(f + 1);
          break;
        case "ArrowLeft":
          i.preventDefault(), Gr(f - 1);
          break;
        case "Home":
          i.preventDefault(), Gr(0);
          break;
        case "End":
          i.preventDefault(), Gr(a.length - 1);
          break;
      }
    }
    const Zn = /* @__PURE__ */ re(!1), Xr = /* @__PURE__ */ re(null), Jn = /* @__PURE__ */ re({ left: 0, top: 0 }), Yr = /* @__PURE__ */ re(null), Sn = /* @__PURE__ */ re(0), wi = /* @__PURE__ */ new Map(), Qn = V(() => ii.value.filter((i) => i.id in ri)), Zr = V(() => Qn.value.length > 0), Kf = V(() => t.state.options.menu_label ?? "Row actions");
    function Vf(i, a) {
      a ? wi.set(i, a) : wi.delete(i);
    }
    function gl(i) {
      return Qn.value.findIndex((a) => a.uid === i.uid);
    }
    function pl(i, a, f) {
      if (!Zr.value) return;
      wn.value !== i.id && jt(i.id), Xr.value = i.id, Jn.value = { left: a, top: f };
      const h = Qn.value.findIndex((S) => Yn(S));
      Sn.value = Math.max(0, h), Zn.value = !0, Ve(Wf);
    }
    function Bf(i, a) {
      Zr.value && (a.preventDefault(), U.value && !i.getIsSelected() && $n(i), pl(i, a.clientX, a.clientY));
    }
    function Nf(i, a) {
      U.value && !i.getIsSelected() && $n(i), jt(i.id), Ur(a);
    }
    function $f(i) {
      var f;
      const a = (f = Nn.get(i.id)) == null ? void 0 : f.getBoundingClientRect();
      pl(i, a ? a.left + m.value : En, a ? a.bottom : En);
    }
    function Wf() {
      const i = Yr.value;
      if (!i) return;
      const a = i.getBoundingClientRect();
      let { left: f, top: h } = Jn.value;
      f + a.width > window.innerWidth - En && (f = Math.max(En, f - a.width)), h + a.height > window.innerHeight - En && (h = Math.max(En, h - a.height)), Jn.value = { left: f, top: h }, er(Sn.value);
    }
    function er(i) {
      const a = Qn.value;
      if (a.length === 0) return;
      const f = Math.max(0, Math.min(i, a.length - 1));
      Sn.value = f, Ve(() => {
        var h;
        return (h = wi.get(a[f].uid)) == null ? void 0 : h.focus();
      });
    }
    function Jr(i = !0, a = void 0) {
      if (!Zn.value) return;
      const f = Xr.value;
      Zn.value = !1, Xr.value = null, i && f != null && ni(f, a);
    }
    function Uf(i) {
      if (!Yn(i)) return;
      const a = Xr.value;
      Jr(!1), ze(a), Ur(i);
    }
    function qf(i) {
      const a = Sn.value;
      switch (i.key) {
        case "ArrowDown":
          i.preventDefault(), er(a + 1);
          break;
        case "ArrowUp":
          i.preventDefault(), er(a - 1);
          break;
        case "Home":
          i.preventDefault(), er(0);
          break;
        case "End":
          i.preventDefault(), er(Qn.value.length - 1);
          break;
        case "Escape":
        case "Tab":
          i.preventDefault(), Jr();
          break;
      }
    }
    function bi(i) {
      Yr.value && i.composedPath().includes(Yr.value) || Jr(!1);
    }
    function xn() {
      Jr(!0, { preventScroll: !0 });
    }
    be(Zn, (i) => {
      i ? (document.addEventListener("pointerdown", bi, !0), window.addEventListener("resize", xn), window.addEventListener("scroll", xn, !0)) : (document.removeEventListener("pointerdown", bi, !0), window.removeEventListener("resize", xn), window.removeEventListener("scroll", xn, !0));
    }), lr(() => {
      document.removeEventListener("pointerdown", bi, !0), window.removeEventListener("resize", xn), window.removeEventListener("scroll", xn, !0);
    });
    const Gf = ["reorder-above", "reorder-below", "make-child", "reparent"], Zt = V(() => t.state.options.enable_dnd === !0), _i = V(() => String(t.state.options.transfer_group || "")), Jt = V(() => String(t.state.tableId || "")), Xf = ["meta", "content"], hl = V(() => {
      const i = t.state.options.drop_files;
      return i === !0 ? "meta" : Xf.includes(i) ? i : "none";
    }), tr = V(() => hl.value !== "none"), Yf = V(() => (t.state.options.drop_accept || []).map((i) => String(i).toLowerCase())), Zf = V(() => {
      const i = Number(t.state.options.drop_max_bytes);
      return Number.isFinite(i) && i > 0 ? i : tw;
    }), vl = /* @__PURE__ */ re([]), Qr = /* @__PURE__ */ re(null);
    function Rn(i) {
      return ve.value.find((a) => a.id === i) ?? null;
    }
    function Jf(i, a) {
      let f = i;
      for (; f; ) {
        if (a.includes(f.id)) return !0;
        f = f.getParentRow();
      }
      return !1;
    }
    function ml(i) {
      if (!U.value || !i.getIsSelected()) return [i.id];
      const a = /* @__PURE__ */ new Set();
      for (let h = i.getParentRow(); h; h = h.getParentRow()) a.add(h.id);
      const f = ve.value.filter((h) => h.getIsSelected() && !a.has(h.id)).map((h) => h.id);
      return f.length > 1 ? f : [i.id];
    }
    function yl(i, a, f) {
      if (!f && Jf(i, a)) return Gf;
      const h = oe.value ? ["reorder-above", "reorder-below"] : [];
      return R(i.original, "allow_children") === !1 && h.push("make-child"), h;
    }
    function wl(i) {
      if (yn(i) && Kn(i)) return "expanded";
      const a = mn(i);
      return a[a.length - 1] === i.id ? "last-in-group" : "standard";
    }
    let Si = null, nr = null;
    function xi() {
      nr && clearTimeout(nr), nr = null, Si = null;
    }
    function Qf(i, a) {
      if (Si === i || (xi(), !a || a.type === "instruction-blocked")) return;
      const f = Rn(i);
      !f || !f.getCanExpand() || f.getIsExpanded() || (Si = i, nr = setTimeout(() => {
        nr = null;
        const h = Rn(i);
        h && h.getCanExpand() && !h.getIsExpanded() && Xt(h, !0);
      }, ew));
    }
    function ed() {
      Qr.value = null, xi();
    }
    function td(i, a) {
      const f = Yf.value;
      if (f.length === 0) return !0;
      const h = String(i || "").toLowerCase(), S = String(a || "").toLowerCase();
      return f.some((H) => H.startsWith(".") ? S.endsWith(H) : H.endsWith("/*") ? h.startsWith(H.slice(0, -1)) : h === H);
    }
    async function nd(i) {
      const a = new Uint8Array(await i.arrayBuffer()), f = 32768;
      let h = "";
      for (let S = 0; S < a.length; S += f)
        h += String.fromCharCode(...a.subarray(S, S + f));
      return btoa(h);
    }
    async function rd(i) {
      const a = {
        name: String(i.name || ""),
        size: Number(i.size || 0),
        mime: String(i.type || ""),
        last_modified: Number(i.lastModified || 0)
      }, f = td(a.mime, a.name) && a.size <= Zf.value;
      return hl.value === "content" && f && (a.content = await nd(i)), a;
    }
    const bl = /* @__PURE__ */ re(null);
    function od() {
      let i = bl.value;
      if (!i) return null;
      let a = i.getRootNode();
      for (; a.host; )
        i = a.host, a = i.getRootNode();
      return i;
    }
    function rr(i) {
      for (const { row: a } of Ns.value) {
        const f = Nn.get(a.id);
        if (!f) continue;
        const h = f.getBoundingClientRect();
        if (i.clientX >= h.left && i.clientX < h.right && i.clientY >= h.top && i.clientY < h.bottom)
          return { row: a, element: f, rect: h };
      }
      return null;
    }
    function id(i, a) {
      const f = ".pnl-tst-check, .pnl-tst-twisty, .pnl-tst-rbtn, .pnl-tst-edit";
      for (const h of i.element.querySelectorAll(f)) {
        const S = h.getBoundingClientRect();
        if (a.clientX >= S.left && a.clientX < S.right && a.clientY >= S.top && a.clientY < S.bottom)
          return !0;
      }
      return !1;
    }
    const sd = {
      id: () => Jt.value,
      acceptsFiles: () => tr.value,
      // Anything outside a row (the header, the empty space below the last row) is
      // not a drag handle, and neither is a row control. Nor is any row at all in a
      // table that joined the host for file drops alone.
      canDragFrom(i) {
        if (!Zt.value) return !1;
        const a = rr(i);
        return a !== null && !id(a, i);
      },
      dragData(i) {
        if (!Zt.value) return null;
        const a = rr(i);
        return a ? {
          type: Pn,
          group: _i.value,
          sourceId: Jt.value,
          key: a.row.id,
          keys: ml(a.row)
        } : null;
      },
      // The registered element is the host, so the default preview would be a
      // snapshot of the whole layout. Point it at the row being dragged, offset so
      // the preview stays under the cursor where it was grabbed.
      preview(i, a) {
        if (!Zt.value) return !1;
        const f = rr(i);
        return f ? (a(f.element, i.clientX - f.rect.left, i.clientY - f.rect.top), !0) : !1;
      },
      setDragging(i) {
        vl.value = i;
      },
      // Our own rows always. Another pane's only when both name the same group, so a
      // table that opted into nothing shows no drop state at all rather than
      // accepting a drag Python is bound to reject.
      dropData(i, a) {
        if (!Zt.value) return null;
        const f = rr(i);
        if (!f) return null;
        const h = a.sourceId !== Jt.value;
        if (h && !(_i.value && a.group === _i.value))
          return { type: Pn, key: null, paneId: Jt.value };
        const S = { type: Pn, key: f.row.id, paneId: Jt.value };
        return ua(S, {
          element: f.element,
          input: i,
          currentLevel: f.row.depth,
          indentPerLevel: m.value,
          mode: wl(f.row),
          block: yl(f.row, a.keys ?? [], h)
        });
      },
      // A file lands through the hitbox a node lands through, with an empty key list:
      // a file is not a row in this tree, so nothing is being dropped onto itself and
      // the only rules left are the ones about the target. That is the same case a
      // drag from the other pane is, which is why `foreign` is already an argument.
      //
      // The indicator says a file is arriving and never which file. pdnd hands every
      // in-flight external callback `items: []` on purpose and only fills the payload
      // in `getDropPayload`, so nothing about the files exists until the drop. What
      // `drop_accept` covers is therefore decided in `describeFile`, where the names
      // and the sizes are real, and in Python, which decides for good.
      externalDropData(i) {
        if (!tr.value) return null;
        const a = rr(i);
        if (!a) return null;
        const f = { type: qc, key: a.row.id, paneId: Jt.value };
        return ua(f, {
          element: a.element,
          input: i,
          currentLevel: a.row.depth,
          indentPerLevel: m.value,
          mode: wl(a.row),
          block: yl(a.row, [], !0)
        });
      },
      // Reading the bytes is asynchronous, so the intent is emitted after the drop
      // has already finished as far as the browser is concerned. Nothing waits on it:
      // the rows arrive when Python has written them, exactly as they do for a
      // transfer, and the tree is untouched until then.
      async dropFiles(i, a, f) {
        if (!tr.value || i.length === 0) return;
        const h = await Promise.all(i.map(rd));
        We = { pasted: new Set(he.getCoreRowModel().flatRows.map((S) => S.id)) }, t.emitEvent("drop_files", {
          files: h,
          targetKey: a,
          instruction: f.type,
          desiredLevel: f.desiredLevel ?? f.currentLevel
        });
      },
      showDrop(i, a) {
        Qr.value = { key: i, instruction: a }, Qf(i, a);
      },
      clearDrop: ed,
      drop(i, a, f, h) {
        const S = i.keys ?? [];
        if (S.length === 0) return;
        const H = {
          targetKey: a,
          instruction: f.type,
          desiredLevel: f.desiredLevel ?? f.currentLevel
        };
        if (i.sourceId === Jt.value) {
          if (S.includes(a)) return;
          t.emitEvent("move", {
            key: i.key,
            keys: S,
            ...H,
            copy: !!(h != null && h.ctrlKey || h != null && h.altKey)
          });
          return;
        }
        We = { pasted: new Set(he.getCoreRowModel().flatRows.map((ae) => ae.id)) }, t.emitEvent("transfer", {
          keys: S,
          sourceId: i.sourceId,
          copy: !!(h != null && h.ctrlKey || h != null && h.altKey),
          ...H
        });
      }
    };
    let Vt = null;
    function _l() {
      Vt == null || Vt(), Vt = null;
      const i = od();
      !i || !(Zt.value || tr.value) || (Vt = I0(i, sd));
    }
    co(_l), be([Zt, tr], _l), lr(() => {
      xi(), Vt == null || Vt();
    });
    function Ri(i) {
      var a;
      return ((a = Qr.value) == null ? void 0 : a.key) === i.id ? Qr.value.instruction : null;
    }
    function ld(i) {
      const a = R(i.original, "class");
      return typeof a == "string" ? a : null;
    }
    function ad(i) {
      const a = Ri(i);
      return {
        "pnl-tst-row--draggable": Zt.value,
        "pnl-tst-row--dragging": vl.value.includes(i.id),
        "pnl-tst-row--blocked": (a == null ? void 0 : a.type) === "instruction-blocked",
        "pnl-tst-row--child-target": (a == null ? void 0 : a.type) === "make-child"
      };
    }
    function Sl(i) {
      const a = Ri(i);
      return a ? a.type === "reorder-above" ? "pnl-tst-dropline--above" : a.type === "reorder-below" || a.type === "reparent" ? "pnl-tst-dropline--below" : null : null;
    }
    function ud(i) {
      const a = Ri(i);
      return a ? { insetInlineStart: `${(a.type === "reparent" ? a.desiredLevel : a.currentLevel) * a.indentPerLevel}px` } : null;
    }
    return (i, a) => (X(), Y("div", {
      ref_key: "rootElement",
      ref: bl,
      class: "pnl-tst"
    }, [
      mf.value ? (X(), Y("div", {
        key: 0,
        class: "pnl-tst-toolbar",
        role: "toolbar",
        "aria-orientation": "horizontal",
        "aria-label": yf.value
      }, [
        (X(!0), Y(Me, null, en(Nr.value, (f) => (X(), Y(Me, {
          key: f.uid
        }, [
          f.id === "|" ? (X(), Y("span", hy)) : f.id === "search" ? (X(), Y("label", vy, [
            Ce("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: sn(uy)
            }, null, 8, my),
            Ce("input", {
              ref_for: !0,
              ref: (h) => vi.value = h,
              type: "search",
              value: Ut.value,
              "aria-label": Ys.value,
              placeholder: Ys.value,
              onInput: a[0] || (a[0] = (h) => jr(h.target.value))
            }, null, 40, yy)
          ])) : (X(), Y("button", {
            key: 2,
            ref_for: !0,
            ref: (h) => jf(f.uid, h),
            type: "button",
            class: "pnl-tst-tbtn",
            "aria-label": f.label,
            "aria-keyshortcuts": f.keys,
            "aria-disabled": !Yn(f),
            title: Lf(f),
            tabindex: f.uid === dl.value ? 0 : -1,
            onClick: (h) => Ur(f),
            onFocus: (h) => qr.value = f.uid,
            onKeydown: zf
          }, [
            Ce("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: f.icon
            }, null, 8, by)
          ], 40, wy))
        ], 64))), 128))
      ], 8, py)) : Xe("", !0),
      ve.value.length === 0 ? (X(), Y("div", _y, Rt(I.value), 1)) : (X(), Y("div", {
        key: 2,
        ref: of,
        class: Ue(["pnl-tst-grid", { "pnl-tst-grid--resizing": Ne.value !== null }]),
        role: "treegrid",
        "aria-label": b.value,
        "aria-colcount": p.value.length,
        "aria-rowcount": C.value,
        style: ut(Zc.value),
        onKeydown: lf,
        onScroll: nf
      }, [
        r.value ? (X(), Y("div", {
          key: 0,
          ref_key: "headElement",
          ref: Vs,
          class: "pnl-tst-head",
          role: "rowgroup"
        }, [
          Ce("div", xy, [
            (X(!0), Y(Me, null, en(p.value, (f, h) => (X(), Y("div", {
              key: f.id,
              ref_for: !0,
              ref: (S) => M(f.column.id, S),
              class: Ue(["pnl-tst-hcell", { "pnl-tst-hcell--sortable": Q(f) }]),
              role: "columnheader",
              "aria-colindex": h + 1,
              "aria-sort": ge(f),
              "aria-keyshortcuts": De(f) ? "Alt+ArrowLeft Alt+ArrowRight Alt+Home" : void 0,
              tabindex: T.value && f.column.id === N.value ? 0 : -1,
              style: ut(ei(h)),
              onClick: (S) => Ee(f),
              onFocus: (S) => P.value = f.column.id,
              onKeydown: (S) => Ge(f, S)
            }, [
              Ce("span", Cy, Rt(f.column.columnDef.header), 1),
              le(f) ? (X(), Y("span", {
                key: 0,
                class: "pnl-tst-sortind",
                "aria-hidden": "true",
                innerHTML: le(f)
              }, null, 8, My)) : Xe("", !0),
              De(f) ? (X(), Y("span", {
                key: 1,
                class: Ue(["pnl-tst-resize", { "pnl-tst-resize--active": Ne.value === f.column.id }]),
                "aria-hidden": "true",
                onClick: a[1] || (a[1] = Fe(() => {
                }, ["stop"])),
                onDblclick: Fe((S) => ke(f), ["stop"]),
                onMousedown: (S) => Ht(f, S),
                onTouchstart: (S) => Ht(f, S)
              }, null, 42, Ey)) : Xe("", !0)
            ], 46, Ry))), 128))
          ])
        ], 512)) : Xe("", !0),
        Ce("div", {
          class: "pnl-tst-body",
          role: "rowgroup",
          style: ut(tf.value)
        }, [
          (X(!0), Y(Me, null, en(Ns.value, ({ row: f, index: h, held: S }) => (X(), Y("div", {
            key: f.id,
            ref_for: !0,
            ref: (H) => sf(f.id, H),
            class: Ue(["pnl-tst-row", [
              ad(f),
              ld(f),
              {
                "pnl-tst-row--active": bn.value && f.id === wn.value,
                "pnl-tst-row--quiet": !bn.value && f.id === wn.value,
                "pnl-tst-row--cut": bf.value.has(f.id)
              }
            ]]),
            style: ut(S ? ef(h) : void 0),
            role: "row",
            "aria-level": f.depth + 1,
            "aria-posinset": Xc(f),
            "aria-setsize": Yc(f),
            "aria-rowindex": h + E.value,
            "aria-expanded": yn(f) ? Kn(f) : void 0,
            "aria-busy": Qo(f) ? "true" : void 0,
            "aria-selected": U.value ? f.getIsSelected() : void 0,
            "aria-haspopup": Zr.value ? "menu" : void 0,
            tabindex: !T.value && f.id === _n.value ? 0 : -1,
            onClick: (H) => cf(f, H),
            onContextmenu: (H) => Bf(f, H),
            onFocus: (H) => jt(f.id)
          }, [
            Sl(f) ? (X(), Y("span", {
              key: 0,
              class: Ue(["pnl-tst-dropline", Sl(f)]),
              style: ut(ud(f)),
              "aria-hidden": "true"
            }, null, 6)) : Xe("", !0),
            (X(!0), Y(Me, null, en(f.getAllCells(), (H, ae) => (X(), Y("div", {
              key: H.id,
              class: Ue(["pnl-tst-cell", {
                "pnl-tst-cell--tree": ae === 0,
                "pnl-tst-cell--editable": rl(ae, H)
              }]),
              role: "gridcell",
              "aria-colindex": ae + 1,
              style: ut(ae === 0 ? Qc(f) : ei(ae)),
              onDblclick: ($) => Cf(f, ae, H)
            }, [
              ae === 0 ? (X(), Y(Me, { key: 0 }, [
                yn(f) ? (X(), Y("span", {
                  key: 0,
                  class: Ue(["pnl-tst-twisty", {
                    "pnl-tst-twisty--open": Kn(f),
                    "pnl-tst-twisty--busy": Qo(f)
                  }]),
                  "aria-hidden": "true",
                  onClick: Fe(($) => ff(f), ["stop"])
                }, [...a[10] || (a[10] = [
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
                ])], 10, Dy)) : (X(), Y("span", ky)),
                fe.value ? (X(), Y("input", {
                  key: 2,
                  class: "pnl-tst-check",
                  type: "checkbox",
                  tabindex: "-1",
                  checked: Gs(f),
                  ".indeterminate": df(f),
                  "aria-label": `Select ${f.original.title ?? f.id}`,
                  onClick: Fe(($) => pf(f), ["stop"])
                }, null, 40, Oy)) : Xe("", !0),
                J(f) ? (X(), Y("span", {
                  key: 3,
                  class: "pnl-tst-icon",
                  "aria-hidden": "true",
                  innerHTML: J(f)
                }, null, 8, Py)) : Xe("", !0)
              ], 64)) : Xe("", !0),
              nl(f, ae, H) ? (X(), Y(Me, { key: 1 }, [
                g(Re.value) === "select" ? (X(), Y("select", {
                  key: 0,
                  ref_for: !0,
                  ref: ($) => Kt.value = $,
                  class: Ue(["pnl-tst-edit pnl-tst-edit--select", { "pnl-tst-edit--invalid": et.value }]),
                  value: zt.value,
                  "aria-label": di(f, ae, H),
                  "aria-invalid": et.value ? "true" : void 0,
                  onChange: ($) => ol(f, Re.value, $.target.value),
                  onClick: a[2] || (a[2] = Fe(() => {
                  }, ["stop"])),
                  onDblclick: a[3] || (a[3] = Fe(() => {
                  }, ["stop"])),
                  onKeydown: Fe(($) => hi(f, $), ["stop"]),
                  onBlur: ($) => pi(f, ae, H)
                }, [
                  (X(!0), Y(Me, null, en(v(Re.value), ($) => (X(), Y("option", {
                    key: $,
                    value: $
                  }, Rt($), 9, Fy))), 128))
                ], 42, Ty)) : g(Re.value) === "checkbox" ? (X(), Y("input", {
                  key: 1,
                  ref_for: !0,
                  ref: ($) => Kt.value = $,
                  class: Ue(["pnl-tst-edit pnl-tst-edit--check", { "pnl-tst-edit--invalid": et.value }]),
                  type: "checkbox",
                  checked: $r.value,
                  "aria-label": di(f, ae, H),
                  "aria-invalid": et.value ? "true" : void 0,
                  onChange: ($) => ol(f, Re.value, $.target.checked),
                  onClick: a[4] || (a[4] = Fe(() => {
                  }, ["stop"])),
                  onDblclick: a[5] || (a[5] = Fe(() => {
                  }, ["stop"])),
                  onKeydown: Fe(($) => hi(f, $), ["stop"]),
                  onBlur: ($) => pi(f, ae, H)
                }, null, 42, Hy)) : (X(), Y("input", {
                  key: 2,
                  ref_for: !0,
                  ref: ($) => Kt.value = $,
                  class: Ue(["pnl-tst-edit", { "pnl-tst-edit--invalid": et.value }]),
                  type: g(Re.value) === "number" ? "number" : "text",
                  step: y(Re.value, "step"),
                  min: y(Re.value, "min"),
                  max: y(Re.value, "max"),
                  value: zt.value,
                  "aria-label": di(f, ae, H),
                  "aria-invalid": et.value ? "true" : void 0,
                  onInput: a[6] || (a[6] = ($) => Mf($.target.value)),
                  onClick: a[7] || (a[7] = Fe(() => {
                  }, ["stop"])),
                  onDblclick: a[8] || (a[8] = Fe(() => {
                  }, ["stop"])),
                  onKeydown: Fe(($) => hi(f, $), ["stop"]),
                  onBlur: ($) => pi(f, ae, H)
                }, null, 42, Ly))
              ], 64)) : (X(), Y("span", jy, Rt(H.getValue()), 1)),
              si.value.length > 0 && ae === p.value.length - 1 && !nl(f, ae, H) ? (X(), Y("span", zy, [
                (X(!0), Y(Me, null, en(si.value, ($) => (X(), Y("button", {
                  key: $.uid,
                  type: "button",
                  class: "pnl-tst-rbtn",
                  tabindex: "-1",
                  "aria-label": `${$.label} ${f.original.title ?? f.id}`,
                  title: $.label,
                  onClick: Fe((Ci) => Nf(f, $), ["stop"]),
                  onDblclick: a[9] || (a[9] = Fe(() => {
                  }, ["stop"]))
                }, [
                  Ce("span", {
                    class: "pnl-tst-icon",
                    "aria-hidden": "true",
                    innerHTML: $.icon
                  }, null, 8, Vy)
                ], 40, Ky))), 128))
              ])) : Xe("", !0)
            ], 46, Ay))), 128))
          ], 46, Iy))), 128))
        ], 4)
      ], 46, Sy)),
      _t.value ? (X(), Y("div", By, [
        Ce("div", {
          class: "pnl-tst-dialog",
          role: "alertdialog",
          "aria-modal": "true",
          "aria-label": "Rename",
          "aria-describedby": "pnl-tst-confirm-message",
          onKeydown: If
        }, [
          Ce("p", Ny, " Rename " + Rt(_t.value.previous) + " to " + Rt(_t.value.title) + "? If you change a file name extension, the file might become unusable. ", 1),
          Ce("div", $y, [
            Ce("button", {
              ref_key: "confirmYesButton",
              ref: ci,
              type: "button",
              class: "pnl-tst-dbtn",
              "aria-keyshortcuts": "Y",
              onClick: al
            }, [...a[11] || (a[11] = [
              Ce("span", { class: "pnl-tst-dkey" }, "Y", -1),
              ts("es ", -1)
            ])], 512),
            Ce("button", {
              ref_key: "confirmNoButton",
              ref: fi,
              type: "button",
              class: "pnl-tst-dbtn",
              "aria-keyshortcuts": "N",
              onClick: ul
            }, [...a[12] || (a[12] = [
              Ce("span", { class: "pnl-tst-dkey" }, "N", -1),
              ts("o ", -1)
            ])], 512)
          ])
        ], 32)
      ])) : Xe("", !0),
      Zn.value ? (X(), Y("div", {
        key: 4,
        ref_key: "menuElement",
        ref: Yr,
        class: "pnl-tst-menu",
        role: "menu",
        "aria-orientation": "vertical",
        "aria-label": Kf.value,
        style: ut({ left: `${Jn.value.left}px`, top: `${Jn.value.top}px` }),
        onKeydown: qf
      }, [
        (X(!0), Y(Me, null, en(ii.value, (f) => (X(), Y(Me, {
          key: f.uid
        }, [
          f.id === "|" ? (X(), Y("div", Uy)) : (X(), Y("button", {
            key: 1,
            ref_for: !0,
            ref: (h) => Vf(f.uid, h),
            type: "button",
            class: "pnl-tst-mitem",
            role: "menuitem",
            "aria-keyshortcuts": f.keys,
            "aria-disabled": !Yn(f),
            tabindex: gl(f) === Sn.value ? 0 : -1,
            onClick: (h) => Uf(f),
            onFocus: (h) => Sn.value = gl(f)
          }, [
            Ce("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: f.icon
            }, null, 8, Gy),
            Ce("span", Xy, Rt(f.label), 1),
            f.keys ? (X(), Y("span", Yy, Rt(fl(f)), 1)) : Xe("", !0)
          ], 40, qy))
        ], 64))), 128))
      ], 44, Wy)) : Xe("", !0)
    ], 512));
  }
};
function rw({ model: e, el: t }) {
  t.style.display = "block", t.style.width = "100%", t.style.height = "100%";
  const n = document.createElement("div");
  n.className = "pnl-tst-root", n.style.height = "100%", t.append(n);
  const r = /* @__PURE__ */ Fo({
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
  const u = (_, O) => {
    l += 1, s.push({ seq: l, event_name: _, event_params: O }), s.length > o && s.shift(), e.set("_event_data", { events: [...s], timestamp: Date.now() }), e.save_changes();
  }, c = (_, O) => _.length === O.length && _.every((z, J) => z === O[J]), d = (_) => (O) => {
    const z = [...e.get(_) || []].sort();
    c(z, O) || (e.set(_, O), e.save_changes());
  }, g = d("expanded_keys"), v = d("selected_keys"), y = (_) => {
    (e.get("filter_text") || "") !== _ && (e.set("filter_text", _), e.save_changes());
  }, w = (_) => {
    (e.get("editing_key") || "") !== _ && (e.set("editing_key", _), e.save_changes());
  }, D = (_) => {
    (e.get("editing_column") || "") !== _ && (e.set("editing_column", _), e.save_changes());
  }, R = (_, O) => _.length === O.length && _.every((z, J) => z.id === O[J].id && !!z.desc == !!O[J].desc), A = (_) => {
    R(e.get("sorting") || [], _) || (e.set("sorting", _), e.save_changes());
  }, K = (_, O) => {
    const z = Object.keys(_);
    return z.length === Object.keys(O).length && z.every((J) => _[J] === O[J]);
  }, j = Dp(nw, {
    state: r,
    emitEvent: u,
    setExpandedKeys: g,
    setSelectedKeys: v,
    setFilterText: y,
    setEditingKey: w,
    setEditingColumn: D,
    setSorting: A,
    setColumnWidths: (_) => {
      K(e.get("column_widths") || {}, _) || (e.set("column_widths", _), e.save_changes());
    }
  });
  return j.mount(n), e.on("change:_view", () => {
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
    j.unmount();
  };
}
export {
  rw as render
};

/**
* @vue/shared v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function fs(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const ye = {}, An = [], pt = () => {
}, Da = () => !1, Io = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Ao = (e) => e.startsWith("onUpdate:"), Te = Object.assign, ds = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, ad = Object.prototype.hasOwnProperty, ue = (e, t) => ad.call(e, t), G = Array.isArray, $t = (e) => Er(e) === "[object Map]", po = (e) => Er(e) === "[object Set]", xl = (e) => Er(e) === "[object Date]", X = (e) => typeof e == "function", Se = (e) => typeof e == "string", ht = (e) => typeof e == "symbol", pe = (e) => e !== null && typeof e == "object", Oa = (e) => (pe(e) || X(e)) && X(e.then) && X(e.catch), ka = Object.prototype.toString, Er = (e) => ka.call(e), ud = (e) => Er(e).slice(8, -1), Pa = (e) => Er(e) === "[object Object]", gs = (e) => Se(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, cr = /* @__PURE__ */ fs(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Do = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, cd = /-\w/g, tt = Do(
  (e) => e.replace(cd, (t) => t.slice(1).toUpperCase())
), fd = /\B([A-Z])/g, un = Do(
  (e) => e.replace(fd, "-$1").toLowerCase()
), Ta = Do((e) => e.charAt(0).toUpperCase() + e.slice(1)), xi = Do(
  (e) => e ? `on${Ta(e)}` : ""
), dt = (e, t) => !Object.is(e, t), Ri = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Fa = (e, t, n, r = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: r,
    value: n
  });
}, dd = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Rl;
const Oo = () => Rl || (Rl = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function ut(e) {
  if (G(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], o = Se(r) ? vd(r) : ut(r);
      if (o)
        for (const i in o)
          t[i] = o[i];
    }
    return t;
  } else if (Se(e) || pe(e))
    return e;
}
const gd = /;(?![^(]*\))/g, pd = /:([^]+)/, hd = /\/\*[^]*?\*\//g;
function vd(e) {
  const t = {};
  return e.replace(hd, "").split(gd).forEach((n) => {
    if (n) {
      const r = n.split(pd);
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
const md = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", yd = /* @__PURE__ */ fs(md);
function Ha(e) {
  return !!e || e === "";
}
function wd(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let r = 0; n && r < e.length; r++)
    n = ko(e[r], t[r]);
  return n;
}
function Cl(e, t) {
  if (e.size !== t.size) return !1;
  const n = Array.from(t), r = new Uint8Array(n.length);
  for (const o of e) {
    let i = -1;
    for (let l = 0; l < n.length; l++)
      if (!r[l] && ko(o, n[l])) {
        i = l;
        break;
      }
    if (i < 0) return !1;
    r[i] = 1;
  }
  return !0;
}
function ko(e, t) {
  if (e === t) return !0;
  let n = xl(e), r = xl(t);
  if (n || r)
    return n && r ? e.getTime() === t.getTime() : !1;
  if (n = ht(e), r = ht(t), n || r)
    return e === t;
  if (n = G(e), r = G(t), n || r)
    return n && r ? wd(e, t) : !1;
  if (n = pe(e), r = pe(t), n || r) {
    if (!n || !r)
      return !1;
    if (n = $t(e), r = $t(t), n || r || (n = po(e), r = po(t), n || r))
      return n && r ? Cl(e, t) : !1;
    const o = Object.keys(e).length, i = Object.keys(t).length;
    if (o !== i)
      return !1;
    for (const l in e) {
      const u = e.hasOwnProperty(l), c = t.hasOwnProperty(l);
      if (u && !c || !u && c || !ko(e[l], t[l]))
        return !1;
    }
  }
  return String(e) === String(t);
}
const La = (e) => !!(e && e.__v_isRef === !0), xt = (e) => Se(e) ? e : e == null ? "" : G(e) || pe(e) && (e.toString === ka || !X(e.toString)) ? La(e) ? xt(e.value) : JSON.stringify(e, ja, 2) : String(e), ja = (e, t) => La(t) ? ja(e, t.value) : $t(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [r, o], i) => (n[Ci(r, i) + " =>"] = o, n),
    {}
  )
} : po(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Ci(n))
} : ht(t) ? Ci(t) : pe(t) && !G(t) && !Pa(t) ? String(t) : t, Ci = (e, t = "") => {
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
let Ee;
class bd {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && Ee && (Ee.active ? (this.parent = Ee, this.index = (Ee.scopes || (Ee.scopes = [])).push(
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
      const n = Ee;
      try {
        return Ee = this, t();
      } finally {
        Ee = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Ee, Ee = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (Ee === this)
        Ee = this.prevScope;
      else {
        let t = Ee;
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
function za() {
  return Ee;
}
function _d(e, t = !1) {
  Ee && Ee.cleanups.push(e);
}
let me;
const Mi = /* @__PURE__ */ new WeakSet();
class Ka {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Ee && (Ee.active ? Ee.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Mi.has(this) && (Mi.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ba(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Ml(this), Na(this);
    const t = me, n = nt;
    me = this, nt = !0;
    try {
      return this.fn();
    } finally {
      $a(this), me = t, nt = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        vs(t);
      this.deps = this.depsTail = void 0, Ml(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Mi.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Ni(this) && this.run();
  }
  get dirty() {
    return Ni(this);
  }
}
let Va = 0, fr, dr;
function Ba(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = dr, dr = e;
    return;
  }
  e.next = fr, fr = e;
}
function ps() {
  Va++;
}
function hs() {
  if (--Va > 0)
    return;
  if (dr) {
    let t = dr;
    for (dr = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; fr; ) {
    let t = fr;
    for (fr = void 0; t; ) {
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
function Na(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function $a(e) {
  let t, n = e.depsTail, r = n;
  for (; r; ) {
    const o = r.prevDep;
    r.version === -1 ? (r === n && (n = o), vs(r), Sd(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = o;
  }
  e.deps = t, e.depsTail = n;
}
function Ni(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Wa(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Wa(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === yr) || (e.globalVersion = yr, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Ni(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = me, r = nt;
  me = e, nt = !0;
  try {
    Na(e);
    const o = e.fn(e._value);
    (t.version === 0 || dt(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    me = n, nt = r, $a(e), e.flags &= -3;
  }
}
function vs(e, t = !1) {
  const { dep: n, prevSub: r, nextSub: o } = e;
  if (r && (r.nextSub = o, e.prevSub = void 0), o && (o.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
    n.computed.flags &= -5;
    for (let i = n.computed.deps; i; i = i.nextDep)
      vs(i, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Sd(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let nt = !0;
const Ua = [];
function It() {
  Ua.push(nt), nt = !1;
}
function At() {
  const e = Ua.pop();
  nt = e === void 0 ? !0 : e;
}
function Ml(e) {
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
let yr = 0;
class xd {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class ms {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!me || !nt || me === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== me)
      n = this.activeLink = new xd(me, this), me.deps ? (n.prevDep = me.depsTail, me.depsTail.nextDep = n, me.depsTail = n) : me.deps = me.depsTail = n, qa(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const r = n.nextDep;
      r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = me.depsTail, n.nextDep = void 0, me.depsTail.nextDep = n, me.depsTail = n, me.deps === n && (me.deps = r);
    }
    return n;
  }
  trigger(t) {
    this.version++, yr++, this.notify(t);
  }
  notify(t) {
    ps();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      hs();
    }
  }
}
function qa(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let r = t.deps; r; r = r.nextDep)
        qa(r);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const $i = /* @__PURE__ */ new WeakMap(), nn = /* @__PURE__ */ Symbol(
  ""
), Wi = /* @__PURE__ */ Symbol(
  ""
), wr = /* @__PURE__ */ Symbol(
  ""
);
function ke(e, t, n) {
  if (nt && me) {
    let r = $i.get(e);
    r || $i.set(e, r = /* @__PURE__ */ new Map());
    let o = r.get(n);
    o || (r.set(n, o = new ms()), o.map = r, o.key = n), o.track();
  }
}
function Mt(e, t, n, r, o, i) {
  const l = $i.get(e);
  if (!l) {
    yr++;
    return;
  }
  const u = (c) => {
    c && c.trigger();
  };
  if (ps(), t === "clear")
    l.forEach(u);
  else {
    const c = G(e), d = c && gs(n);
    if (c && n === "length") {
      const g = Number(r);
      l.forEach((h, y) => {
        (y === "length" || y === wr || !ht(y) && y >= g) && u(h);
      });
    } else
      switch ((n !== void 0 || l.has(void 0)) && u(l.get(n)), d && u(l.get(wr)), t) {
        case "add":
          c ? d && u(l.get("length")) : (u(l.get(nn)), $t(e) && u(l.get(Wi)));
          break;
        case "delete":
          c || (u(l.get(nn)), $t(e) && u(l.get(Wi)));
          break;
        case "set":
          $t(e) && u(l.get(nn));
          break;
      }
  }
  hs();
}
function Rn(e) {
  const t = /* @__PURE__ */ ae(e);
  return t === e ? t : (ke(t, "iterate", wr), /* @__PURE__ */ Xe(e) ? t : t.map(rt));
}
function Po(e) {
  return ke(e = /* @__PURE__ */ ae(e), "iterate", wr), e;
}
function ct(e, t) {
  return /* @__PURE__ */ Dt(e) ? Pn(/* @__PURE__ */ rn(e) ? rt(t) : t) : rt(t);
}
const Rd = {
  __proto__: null,
  [Symbol.iterator]() {
    return Ei(this, Symbol.iterator, (e) => ct(this, e));
  },
  concat(...e) {
    return Rn(this).concat(
      ...e.map((t) => G(t) ? Rn(t) : t)
    );
  },
  entries() {
    return Ei(this, "entries", (e) => (e[1] = ct(this, e[1]), e));
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
    return Ii(this, "includes", e);
  },
  indexOf(...e) {
    return Ii(this, "indexOf", e);
  },
  join(e) {
    return Rn(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Ii(this, "lastIndexOf", e);
  },
  map(e, t) {
    return St(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return rr(this, "pop");
  },
  push(...e) {
    return rr(this, "push", e);
  },
  reduce(e, ...t) {
    return El(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return El(this, "reduceRight", e, t);
  },
  shift() {
    return rr(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return St(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return rr(this, "splice", e);
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
    return rr(this, "unshift", e);
  },
  values() {
    return Ei(this, "values", (e) => ct(this, e));
  }
};
function Ei(e, t, n) {
  const r = Po(e), o = r[t]();
  return r !== e && !/* @__PURE__ */ Xe(e) && (o._next = o.next, o.next = () => {
    const i = o._next();
    return i.done || (i.value = n(i.value)), i;
  }), o;
}
const Cd = Array.prototype;
function St(e, t, n, r, o, i) {
  const l = Po(e), u = l !== e && !/* @__PURE__ */ Xe(e), c = l[t];
  if (c !== Cd[t]) {
    const h = c.apply(e, i);
    return u ? rt(h) : h;
  }
  let d = n;
  l !== e && (u ? d = function(h, y) {
    return n.call(this, ct(e, h), y, e);
  } : n.length > 2 && (d = function(h, y) {
    return n.call(this, h, y, e);
  }));
  const g = c.call(l, d, r);
  return u && o ? o(g) : g;
}
function El(e, t, n, r) {
  const o = Po(e), i = o !== e && !/* @__PURE__ */ Xe(e);
  let l = n, u = !1;
  o !== e && (i ? (u = r.length === 0, l = function(d, g, h) {
    return u && (u = !1, d = ct(e, d)), n.call(this, d, ct(e, g), h, e);
  }) : n.length > 3 && (l = function(d, g, h) {
    return n.call(this, d, g, h, e);
  }));
  const c = o[t](l, ...r);
  return u ? ct(e, c) : c;
}
function Ii(e, t, n) {
  const r = /* @__PURE__ */ ae(e);
  ke(r, "iterate", wr);
  const o = r[t](...n);
  return (o === -1 || o === !1) && /* @__PURE__ */ bs(n[0]) ? (n[0] = /* @__PURE__ */ ae(n[0]), r[t](...n)) : o;
}
function rr(e, t, n = []) {
  It(), ps();
  const r = (/* @__PURE__ */ ae(e))[t].apply(e, n);
  return hs(), At(), r;
}
const Md = /* @__PURE__ */ fs("__proto__,__v_isRef,__isVue"), Ga = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(ht)
);
function Ed(e) {
  ht(e) || (e = String(e));
  const t = /* @__PURE__ */ ae(this);
  return ke(t, "has", e), t.hasOwnProperty(e);
}
class Xa {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, r) {
    if (n === "__v_skip") return t.__v_skip;
    const o = this._isReadonly, i = this._isShallow;
    if (n === "__v_isReactive")
      return !o;
    if (n === "__v_isReadonly")
      return o;
    if (n === "__v_isShallow")
      return i;
    if (n === "__v_raw")
      return r === (o ? i ? Ld : Qa : i ? Ja : Za).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const l = G(t);
    if (!o) {
      let c;
      if (l && (c = Rd[n]))
        return c;
      if (n === "hasOwnProperty")
        return Ed;
    }
    const u = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ Pe(t) ? t : r
    );
    if ((ht(n) ? Ga.has(n) : Md(n)) || (o || ke(t, "get", n), i))
      return u;
    if (/* @__PURE__ */ Pe(u)) {
      const c = l && gs(n) ? u : u.value;
      return o && pe(c) ? /* @__PURE__ */ qi(c) : c;
    }
    return pe(u) ? o ? /* @__PURE__ */ qi(u) : /* @__PURE__ */ To(u) : u;
  }
}
class Ya extends Xa {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, o) {
    let i = t[n];
    const l = G(t) && gs(n);
    if (!this._isShallow) {
      const d = /* @__PURE__ */ Dt(i);
      if (!/* @__PURE__ */ Xe(r) && !/* @__PURE__ */ Dt(r) && (i = /* @__PURE__ */ ae(i), r = /* @__PURE__ */ ae(r)), !l && /* @__PURE__ */ Pe(i) && !/* @__PURE__ */ Pe(r))
        return d || (i.value = r), !0;
    }
    const u = l ? Number(n) < t.length : ue(t, n), c = Reflect.set(
      t,
      n,
      r,
      /* @__PURE__ */ Pe(t) ? t : o
    );
    return t === /* @__PURE__ */ ae(o) && c && (u ? dt(r, i) && Mt(t, "set", n, r) : Mt(t, "add", n, r)), c;
  }
  deleteProperty(t, n) {
    const r = ue(t, n);
    t[n];
    const o = Reflect.deleteProperty(t, n);
    return o && r && Mt(t, "delete", n, void 0), o;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!ht(n) || !Ga.has(n)) && ke(t, "has", n), r;
  }
  ownKeys(t) {
    return ke(
      t,
      "iterate",
      G(t) ? "length" : nn
    ), Reflect.ownKeys(t);
  }
}
class Id extends Xa {
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
const Ad = /* @__PURE__ */ new Ya(), Dd = /* @__PURE__ */ new Id(), Od = /* @__PURE__ */ new Ya(!0);
const Ui = (e) => e, Qr = (e) => Reflect.getPrototypeOf(e);
function kd(e, t, n) {
  return function(...r) {
    const o = this.__v_raw, i = /* @__PURE__ */ ae(o), l = $t(i), u = e === "entries" || e === Symbol.iterator && l, c = e === "keys" && l, d = o[e](...r), g = n ? Ui : t ? Pn : rt;
    return !t && ke(
      i,
      "iterate",
      c ? Wi : nn
    ), Te(
      // inheriting all iterator properties
      Object.create(d),
      {
        // iterator protocol
        next() {
          const { value: h, done: y } = d.next();
          return y ? { value: h, done: y } : {
            value: u ? [g(h[0]), g(h[1])] : g(h),
            done: y
          };
        }
      }
    );
  };
}
function eo(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Pd(e, t) {
  const n = {
    get(o) {
      const i = this.__v_raw, l = /* @__PURE__ */ ae(i), u = /* @__PURE__ */ ae(o);
      e || (dt(o, u) && ke(l, "get", o), ke(l, "get", u));
      const { has: c } = Qr(l), d = t ? Ui : e ? Pn : rt;
      if (c.call(l, o))
        return d(i.get(o));
      if (c.call(l, u))
        return d(i.get(u));
      i !== l && i.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && ke(/* @__PURE__ */ ae(o), "iterate", nn), o.size;
    },
    has(o) {
      const i = this.__v_raw, l = /* @__PURE__ */ ae(i), u = /* @__PURE__ */ ae(o);
      return e || (dt(o, u) && ke(l, "has", o), ke(l, "has", u)), o === u ? i.has(o) : i.has(o) || i.has(u);
    },
    forEach(o, i) {
      const l = this, u = l.__v_raw, c = /* @__PURE__ */ ae(u), d = t ? Ui : e ? Pn : rt;
      return !e && ke(c, "iterate", nn), u.forEach((g, h) => o.call(i, d(g), d(h), l));
    }
  };
  return Te(
    n,
    e ? {
      add: eo("add"),
      set: eo("set"),
      delete: eo("delete"),
      clear: eo("clear")
    } : {
      add(o) {
        const i = /* @__PURE__ */ ae(this), l = Qr(i), u = /* @__PURE__ */ ae(o), c = !t && !/* @__PURE__ */ Xe(o) && !/* @__PURE__ */ Dt(o) ? u : o;
        return l.has.call(i, c) || dt(o, c) && l.has.call(i, o) || dt(u, c) && l.has.call(i, u) || (i.add(c), Mt(i, "add", c, c)), this;
      },
      set(o, i) {
        !t && !/* @__PURE__ */ Xe(i) && !/* @__PURE__ */ Dt(i) && (i = /* @__PURE__ */ ae(i));
        const l = /* @__PURE__ */ ae(this), { has: u, get: c } = Qr(l);
        let d = u.call(l, o);
        d || (o = /* @__PURE__ */ ae(o), d = u.call(l, o));
        const g = c.call(l, o);
        return l.set(o, i), d ? dt(i, g) && Mt(l, "set", o, i) : Mt(l, "add", o, i), this;
      },
      delete(o) {
        const i = /* @__PURE__ */ ae(this), { has: l, get: u } = Qr(i);
        let c = l.call(i, o);
        c || (o = /* @__PURE__ */ ae(o), c = l.call(i, o)), u && u.call(i, o);
        const d = i.delete(o);
        return c && Mt(i, "delete", o, void 0), d;
      },
      clear() {
        const o = /* @__PURE__ */ ae(this), i = o.size !== 0, l = o.clear();
        return i && Mt(
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
    n[o] = kd(o, e, t);
  }), n;
}
function ys(e, t) {
  const n = Pd(e, t);
  return (r, o, i) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(
    ue(n, o) && o in r ? n : r,
    o,
    i
  );
}
const Td = {
  get: /* @__PURE__ */ ys(!1, !1)
}, Fd = {
  get: /* @__PURE__ */ ys(!1, !0)
}, Hd = {
  get: /* @__PURE__ */ ys(!0, !1)
};
const Za = /* @__PURE__ */ new WeakMap(), Ja = /* @__PURE__ */ new WeakMap(), Qa = /* @__PURE__ */ new WeakMap(), Ld = /* @__PURE__ */ new WeakMap();
function jd(e) {
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
function To(e) {
  return /* @__PURE__ */ Dt(e) ? e : ws(
    e,
    !1,
    Ad,
    Td,
    Za
  );
}
// @__NO_SIDE_EFFECTS__
function zd(e) {
  return ws(
    e,
    !1,
    Od,
    Fd,
    Ja
  );
}
// @__NO_SIDE_EFFECTS__
function qi(e) {
  return ws(
    e,
    !0,
    Dd,
    Hd,
    Qa
  );
}
function ws(e, t, n, r, o) {
  if (!pe(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const i = o.get(e);
  if (i)
    return i;
  const l = jd(ud(e));
  if (l === 0)
    return e;
  const u = new Proxy(
    e,
    l === 2 ? r : n
  );
  return o.set(e, u), u;
}
// @__NO_SIDE_EFFECTS__
function rn(e) {
  return /* @__PURE__ */ Dt(e) ? /* @__PURE__ */ rn(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Dt(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Xe(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function bs(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function ae(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ ae(t) : e;
}
function Kd(e) {
  return !ue(e, "__v_skip") && Object.isExtensible(e) && Fa(e, "__v_skip", !0), e;
}
const rt = (e) => pe(e) ? /* @__PURE__ */ To(e) : e, Pn = (e) => pe(e) ? /* @__PURE__ */ qi(e) : e;
// @__NO_SIDE_EFFECTS__
function Pe(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function re(e) {
  return eu(e, !1);
}
// @__NO_SIDE_EFFECTS__
function Vd(e) {
  return eu(e, !0);
}
function eu(e, t) {
  return /* @__PURE__ */ Pe(e) ? e : new Bd(e, t);
}
class Bd {
  constructor(t, n) {
    this.dep = new ms(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ ae(t), this._value = n ? t : rt(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, r = this.__v_isShallow || /* @__PURE__ */ Xe(t) || /* @__PURE__ */ Dt(t);
    t = r ? t : /* @__PURE__ */ ae(t), dt(t, n) && (this._rawValue = t, this._value = r ? t : rt(t), this.dep.trigger());
  }
}
function on(e) {
  return /* @__PURE__ */ Pe(e) ? e.value : e;
}
const Nd = {
  get: (e, t, n) => t === "__v_raw" ? e : on(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return /* @__PURE__ */ Pe(o) && !/* @__PURE__ */ Pe(n) ? (o.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function tu(e) {
  return /* @__PURE__ */ rn(e) ? e : new Proxy(e, Nd);
}
class $d {
  constructor(t, n, r) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new ms(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = yr - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    me !== this)
      return Ba(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Wa(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function Wd(e, t, n = !1) {
  let r, o;
  return X(e) ? r = e : (r = e.get, o = e.set), new $d(r, o, n);
}
const to = {}, ho = /* @__PURE__ */ new WeakMap();
let tn;
function Ud(e, t = !1, n = tn) {
  if (n) {
    let r = ho.get(n);
    r || ho.set(n, r = []), r.push(e);
  }
}
function qd(e, t, n = ye) {
  const { immediate: r, deep: o, once: i, scheduler: l, augmentJob: u, call: c } = n, d = (_) => o ? _ : /* @__PURE__ */ Xe(_) || o === !1 || o === 0 ? Nt(_, 1) : Nt(_);
  let g, h, y, w, D = !1, R = !1;
  if (/* @__PURE__ */ Pe(e) ? (h = () => e.value, D = /* @__PURE__ */ Xe(e)) : /* @__PURE__ */ rn(e) ? (h = () => d(e), D = !0) : G(e) ? (R = !0, D = e.some((_) => /* @__PURE__ */ rn(_) || /* @__PURE__ */ Xe(_)), h = () => e.map((_) => {
    if (/* @__PURE__ */ Pe(_))
      return _.value;
    if (/* @__PURE__ */ rn(_))
      return d(_);
    if (X(_))
      return c ? c(_, 2) : _();
  })) : X(e) ? t ? h = c ? () => c(e, 2) : e : h = () => {
    if (y) {
      It();
      try {
        y();
      } finally {
        At();
      }
    }
    const _ = tn;
    tn = g;
    try {
      return c ? c(e, 3, [w]) : e(w);
    } finally {
      tn = _;
    }
  } : h = pt, t && o) {
    const _ = h, k = o === !0 ? 1 / 0 : o;
    h = () => Nt(_(), k);
  }
  const A = za(), K = () => {
    g.stop(), A && A.active && ds(A.effects, g);
  };
  if (i && t) {
    const _ = t;
    t = (...k) => {
      const z = _(...k);
      return K(), z;
    };
  }
  let x = R ? new Array(e.length).fill(to) : to;
  const j = (_) => {
    if (!(!(g.flags & 1) || !g.dirty && !_))
      if (t) {
        const k = g.run();
        if (_ || o || D || (R ? k.some((z, Y) => dt(z, x[Y])) : dt(k, x))) {
          y && y();
          const z = tn;
          tn = g;
          try {
            const Y = [
              k,
              // pass undefined as the old value when it's changed for the first time
              x === to ? void 0 : R && x[0] === to ? [] : x,
              w
            ];
            x = k, c ? c(t, 3, Y) : (
              // @ts-expect-error
              t(...Y)
            );
          } finally {
            tn = z;
          }
        }
      } else
        g.run();
  };
  return u && u(j), g = new Ka(h), g.scheduler = l ? () => l(j, !1) : j, w = (_) => Ud(_, !1, g), y = g.onStop = () => {
    const _ = ho.get(g);
    if (_) {
      if (c)
        c(_, 4);
      else
        for (const k of _) k();
      ho.delete(g);
    }
  }, t ? r ? j(!0) : x = g.run() : l ? l(j.bind(null, !0), !0) : g.run(), K.pause = g.pause.bind(g), K.resume = g.resume.bind(g), K.stop = K, K;
}
function Nt(e, t = 1 / 0, n) {
  if (t <= 0 || !pe(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ Pe(e))
    Nt(e.value, t, n);
  else if (G(e))
    for (let r = 0; r < e.length; r++)
      Nt(e[r], t, n);
  else if (po(e) || $t(e))
    e.forEach((r) => {
      Nt(r, t, n);
    });
  else if (Pa(e)) {
    for (const r in e)
      Nt(e[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, r) && Nt(e[r], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Ir(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (o) {
    Fo(o, t, n);
  }
}
function ot(e, t, n, r) {
  if (X(e)) {
    const o = Ir(e, t, n, r);
    return o && Oa(o) && o.catch((i) => {
      Fo(i, t, n);
    }), o;
  }
  if (G(e)) {
    const o = [];
    for (let i = 0; i < e.length; i++)
      o.push(ot(e[i], t, n, r));
    return o;
  }
}
function Fo(e, t, n, r = !0) {
  const o = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: l } = t && t.appContext.config || ye;
  if (t) {
    let u = t.parent;
    const c = t.proxy, d = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; u; ) {
      const g = u.ec;
      if (g) {
        for (let h = 0; h < g.length; h++)
          if (g[h](e, c, d) === !1)
            return;
      }
      u = u.parent;
    }
    if (i) {
      It(), Ir(i, null, 10, [
        e,
        c,
        d
      ]), At();
      return;
    }
  }
  Gd(e, n, o, r, l);
}
function Gd(e, t, n, r = !0, o = !1) {
  if (o)
    throw e;
  console.error(e);
}
const He = [];
let at = -1;
const Dn = [];
let Bt = null, En = 0;
const nu = /* @__PURE__ */ Promise.resolve();
let vo = null;
function Ke(e) {
  const t = vo || nu;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Xd(e) {
  let t = at + 1, n = He.length;
  for (; t < n; ) {
    const r = t + n >>> 1, o = He[r], i = br(o);
    i < e || i === e && o.flags & 2 ? t = r + 1 : n = r;
  }
  return t;
}
function _s(e) {
  if (!(e.flags & 1)) {
    const t = br(e), n = He[He.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= br(n) ? He.push(e) : He.splice(Xd(t), 0, e), e.flags |= 1, ru();
  }
}
function ru() {
  vo || (vo = nu.then(iu));
}
function Yd(e) {
  if (!G(e))
    Bt && e.id === -1 ? Bt.splice(En + 1, 0, e) : e.flags & 1 || (Dn.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      Dn.push(e[t]);
  ru();
}
function Il(e, t, n = at + 1) {
  for (; n < He.length; n++) {
    const r = He[n];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid)
        continue;
      He.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function ou(e) {
  if (Dn.length) {
    const t = [...new Set(Dn)].sort(
      (n, r) => br(n) - br(r)
    );
    if (Dn.length = 0, Bt) {
      for (let n = 0; n < t.length; n++)
        Bt.push(t[n]);
      return;
    }
    for (Bt = t, En = 0; En < Bt.length; En++) {
      const n = Bt[En];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    Bt = null, En = 0;
  }
}
const br = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function iu(e) {
  try {
    for (at = 0; at < He.length; at++) {
      const t = He[at];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Ir(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; at < He.length; at++) {
      const t = He[at];
      t && (t.flags &= -2);
    }
    at = -1, He.length = 0, ou(), vo = null, (He.length || Dn.length) && iu();
  }
}
let gt = null, su = null;
function mo(e) {
  const t = gt;
  return gt = e, su = e && e.type.__scopeId || null, t;
}
function Zd(e, t = gt, n) {
  if (!t || e._n)
    return e;
  const r = (...o) => {
    r._d && zl(-1);
    const i = mo(t), l = sn.length;
    let u;
    try {
      u = e(...o);
    } finally {
      for (let c = sn.length; c > l; c--) Du();
      mo(i), r._d && zl(1);
    }
    return u;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function Qt(e, t, n, r) {
  const o = e.dirs, i = t && t.dirs;
  for (let l = 0; l < o.length; l++) {
    const u = o[l];
    i && (u.oldValue = i[l].value);
    let c = u.dir[r];
    c && (It(), ot(c, n, 8, [
      e.el,
      u,
      e,
      t
    ]), At());
  }
}
function Jd(e, t) {
  if (Le) {
    let n = Le.provides;
    const r = Le.parent && Le.parent.provides;
    r === n && (n = Le.provides = Object.create(r)), n[e] = t;
  }
}
function ao(e, t, n = !1) {
  const r = Gg();
  if (r || On) {
    let o = On ? On._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && X(t) ? t.call(r && r.proxy) : t;
  }
}
const Qd = /* @__PURE__ */ Symbol.for("v-scx"), eg = () => ao(Qd);
function be(e, t, n) {
  return lu(e, t, n);
}
function lu(e, t, n = ye) {
  const { immediate: r, deep: o, flush: i, once: l } = n, u = Te({}, n), c = t && r || !t && i !== "post";
  let d;
  if (xr) {
    if (i === "sync") {
      const w = eg();
      d = w.__watcherHandles || (w.__watcherHandles = []);
    } else if (!c) {
      const w = () => {
      };
      return w.stop = pt, w.resume = pt, w.pause = pt, w;
    }
  }
  const g = Le;
  u.call = (w, D, R) => ot(w, g, D, R);
  let h = !1;
  i === "post" ? u.scheduler = (w) => {
    Ve(w, g && g.suspense);
  } : i !== "sync" && (h = !0, u.scheduler = (w, D) => {
    D ? w() : _s(w);
  }), u.augmentJob = (w) => {
    t && (w.flags |= 4), h && (w.flags |= 2, g && (w.id = g.uid, w.i = g));
  };
  const y = qd(e, t, u);
  return xr && (d ? d.push(y) : c && y()), y;
}
function tg(e, t, n) {
  const r = this.proxy, o = Se(e) ? e.includes(".") ? au(r, e) : () => r[e] : e.bind(r, r);
  let i;
  X(t) ? i = t : (i = t.handler, n = t);
  const l = Ar(this), u = lu(o, i.bind(r), n);
  return l(), u;
}
function au(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++)
      r = r[n[o]];
    return r;
  };
}
const ng = /* @__PURE__ */ Symbol("_vte"), Ho = (e) => e.__isTeleport, Ai = /* @__PURE__ */ Symbol("_leaveCb");
function rg(e) {
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
function uu(e) {
  if (!xs(e))
    return Ho(e.type) && e.children ? rg(e.children) : e;
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
function Ss(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    Ss(
      Ho(n.type) && uu(n) || n,
      t
    );
  } else e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function cu(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Al(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const yo = /* @__PURE__ */ new WeakMap();
function gr(e, t, n, r, o = !1) {
  if (G(e)) {
    e.forEach(
      (R, A) => gr(
        R,
        t && (G(t) ? t[A] : t),
        n,
        r,
        o
      )
    );
    return;
  }
  if (pr(r) && !o) {
    r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && gr(e, t, n, r.component.subTree);
    return;
  }
  const i = r.shapeFlag & 4 ? Ms(r.component) : r.el, l = o ? null : i, { i: u, r: c } = e, d = t && t.r, g = u.refs === ye ? u.refs = {} : u.refs, h = u.setupState, y = /* @__PURE__ */ ae(h), w = h === ye ? Da : (R) => Al(g, R) ? !1 : ue(y, R), D = (R, A) => !(A && Al(g, A));
  if (d != null && d !== c) {
    if (Dl(t), Se(d))
      g[d] = null, w(d) && (h[d] = null);
    else if (/* @__PURE__ */ Pe(d)) {
      const R = t;
      D(d, R.k) && (d.value = null), R.k && (g[R.k] = null);
    }
  }
  if (X(c))
    Ir(c, u, 12, [l, g]);
  else {
    const R = Se(c), A = /* @__PURE__ */ Pe(c);
    if (R || A) {
      const K = () => {
        if (e.f) {
          const x = R ? w(c) ? h[c] : g[c] : D() || !e.k ? c.value : g[e.k];
          if (o)
            G(x) && ds(x, i);
          else if (G(x))
            x.includes(i) || x.push(i);
          else if (R)
            g[c] = [i], w(c) && (h[c] = g[c]);
          else {
            const j = [i];
            D(c, e.k) && (c.value = j), e.k && (g[e.k] = j);
          }
        } else R ? (g[c] = l, w(c) && (h[c] = l)) : A && (D(c, e.k) && (c.value = l), e.k && (g[e.k] = l));
      };
      if (l) {
        const x = () => {
          K(), yo.delete(e);
        };
        x.id = -1, yo.set(e, x), Ve(x, n);
      } else
        Dl(e), K();
    }
  }
}
function Dl(e) {
  const t = yo.get(e);
  t && (t.flags |= 8, yo.delete(e));
}
Oo().requestIdleCallback;
Oo().cancelIdleCallback;
const pr = (e) => !!e.type.__asyncLoader, xs = (e) => e.type.__isKeepAlive;
function og(e, t) {
  fu(e, "a", t);
}
function ig(e, t) {
  fu(e, "da", t);
}
function fu(e, t, n = Le) {
  const r = e.__wdc || (e.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (Lo(t, r, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      xs(o.parent.vnode) && sg(r, t, n, o), o = o.parent;
  }
}
function sg(e, t, n, r) {
  const o = Lo(
    t,
    e,
    r,
    !0
    /* prepend */
  );
  du(() => {
    ds(r[t], o);
  }, n);
}
function Lo(e, t, n = Le, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...l) => {
      It();
      const u = Ar(n), c = ot(t, n, e, l);
      return u(), At(), c;
    });
    return r ? o.unshift(i) : o.push(i), i;
  }
}
const Pt = (e) => (t, n = Le) => {
  (!xr || e === "sp") && Lo(e, (...r) => t(...r), n);
}, lg = Pt("bm"), uo = Pt("m"), ag = Pt(
  "bu"
), ug = Pt("u"), sr = Pt(
  "bum"
), du = Pt("um"), cg = Pt(
  "sp"
), fg = Pt("rtg"), dg = Pt("rtc");
function gg(e, t = Le) {
  Lo("ec", e, t);
}
const pg = /* @__PURE__ */ Symbol.for("v-ndc");
function Cn(e, t, n, r) {
  let o;
  const i = n, l = G(e);
  if (l || Se(e)) {
    const u = l && /* @__PURE__ */ rn(e);
    let c = !1, d = !1;
    u && (c = !/* @__PURE__ */ Xe(e), d = /* @__PURE__ */ Dt(e), e = Po(e)), o = new Array(e.length);
    for (let g = 0, h = e.length; g < h; g++)
      o[g] = t(
        c ? d ? Pn(rt(e[g])) : rt(e[g]) : e[g],
        g,
        void 0,
        i
      );
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let u = 0; u < e; u++)
      o[u] = t(u + 1, u, void 0, i);
  } else if (pe(e))
    if (e[Symbol.iterator])
      o = Array.from(
        e,
        (u, c) => t(u, c, void 0, i)
      );
    else {
      const u = Object.keys(e);
      o = new Array(u.length);
      for (let c = 0, d = u.length; c < d; c++) {
        const g = u[c];
        o[c] = t(e[g], g, c, i);
      }
    }
  else
    o = [];
  return o;
}
const Gi = (e) => e ? Tu(e) ? Ms(e) : Gi(e.parent) : null, hr = (
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
    $parent: (e) => Gi(e.parent),
    $root: (e) => Gi(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => pu(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      _s(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Ke.bind(e.proxy)),
    $watch: (e) => tg.bind(e)
  })
), Di = (e, t) => e !== ye && !e.__isScriptSetup && ue(e, t), hg = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: r, data: o, props: i, accessCache: l, type: u, appContext: c } = e;
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
            return i[t];
        }
      else {
        if (Di(r, t))
          return l[t] = 1, r[t];
        if (o !== ye && ue(o, t))
          return l[t] = 2, o[t];
        if (ue(i, t))
          return l[t] = 3, i[t];
        if (n !== ye && ue(n, t))
          return l[t] = 4, n[t];
        Xi && (l[t] = 0);
      }
    }
    const d = hr[t];
    let g, h;
    if (d)
      return t === "$attrs" && ke(e.attrs, "get", ""), d(e);
    if (
      // css module (injected by vue-loader)
      (g = u.__cssModules) && (g = g[t])
    )
      return g;
    if (n !== ye && ue(n, t))
      return l[t] = 4, n[t];
    if (
      // global properties
      h = c.config.globalProperties, ue(h, t)
    )
      return h[t];
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: o, ctx: i } = e;
    return Di(o, t) ? (o[t] = n, !0) : r !== ye && ue(r, t) ? (r[t] = n, !0) : ue(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: o, props: i, type: l }
  }, u) {
    let c;
    return !!(n[u] || e !== ye && u[0] !== "$" && ue(e, u) || Di(t, u) || ue(i, u) || ue(r, u) || ue(hr, u) || ue(o.config.globalProperties, u) || (c = l.__cssModules) && c[u]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : ue(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function Ol(e) {
  return G(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let Xi = !0;
function vg(e) {
  const t = pu(e), n = e.proxy, r = e.ctx;
  Xi = !1, t.beforeCreate && kl(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: i,
    methods: l,
    watch: u,
    provide: c,
    inject: d,
    // lifecycle
    created: g,
    beforeMount: h,
    mounted: y,
    beforeUpdate: w,
    updated: D,
    activated: R,
    deactivated: A,
    beforeDestroy: K,
    beforeUnmount: x,
    destroyed: j,
    unmounted: _,
    render: k,
    renderTracked: z,
    renderTriggered: Y,
    errorCaptured: $,
    serverPrefetch: L,
    // public API
    expose: W,
    inheritAttrs: se,
    // assets
    components: ce,
    directives: te,
    filters: we
  } = t;
  if (d && mg(d, r, null), l)
    for (const oe in l) {
      const ne = l[oe];
      X(ne) && (r[oe] = ne.bind(n));
    }
  if (o) {
    const oe = o.call(n, n);
    pe(oe) && (e.data = /* @__PURE__ */ To(oe));
  }
  if (Xi = !0, i)
    for (const oe in i) {
      const ne = i[oe], Ze = X(ne) ? ne.bind(n, n) : X(ne.get) ? ne.get.bind(n, n) : pt, pn = !X(ne) && X(ne.set) ? ne.set.bind(n) : pt, Be = V({
        get: Ze,
        set: pn
      });
      Object.defineProperty(r, oe, {
        enumerable: !0,
        configurable: !0,
        get: () => Be.value,
        set: (he) => Be.value = he
      });
    }
  if (u)
    for (const oe in u)
      gu(u[oe], r, n, oe);
  if (c) {
    const oe = X(c) ? c.call(n) : c;
    Reflect.ownKeys(oe).forEach((ne) => {
      Jd(ne, oe[ne]);
    });
  }
  g && kl(g, e, "c");
  function fe(oe, ne) {
    G(ne) ? ne.forEach((Ze) => oe(Ze.bind(n))) : ne && oe(ne.bind(n));
  }
  if (fe(lg, h), fe(uo, y), fe(ag, w), fe(ug, D), fe(og, R), fe(ig, A), fe(gg, $), fe(dg, z), fe(fg, Y), fe(sr, x), fe(du, _), fe(cg, L), G(W))
    if (W.length) {
      const oe = e.exposed || (e.exposed = {});
      W.forEach((ne) => {
        Object.defineProperty(oe, ne, {
          get: () => n[ne],
          set: (Ze) => n[ne] = Ze,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  k && e.render === pt && (e.render = k), se != null && (e.inheritAttrs = se), ce && (e.components = ce), te && (e.directives = te), L && cu(e);
}
function mg(e, t, n = pt) {
  G(e) && (e = Yi(e));
  for (const r in e) {
    const o = e[r];
    let i;
    pe(o) ? "default" in o ? i = ao(
      o.from || r,
      o.default,
      !0
    ) : i = ao(o.from || r) : i = ao(o), /* @__PURE__ */ Pe(i) ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (l) => i.value = l
    }) : t[r] = i;
  }
}
function kl(e, t, n) {
  ot(
    G(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function gu(e, t, n, r) {
  let o = r.includes(".") ? au(n, r) : () => n[r];
  if (Se(e)) {
    const i = t[e];
    X(i) && be(o, i);
  } else if (X(e))
    be(o, e.bind(n));
  else if (pe(e))
    if (G(e))
      e.forEach((i) => gu(i, t, n, r));
    else {
      const i = X(e.handler) ? e.handler.bind(n) : t[e.handler];
      X(i) && be(o, i, e);
    }
}
function pu(e) {
  const t = e.type, { mixins: n, extends: r } = t, {
    mixins: o,
    optionsCache: i,
    config: { optionMergeStrategies: l }
  } = e.appContext, u = i.get(t);
  let c;
  return u ? c = u : !o.length && !n && !r ? c = t : (c = {}, o.length && o.forEach(
    (d) => wo(c, d, l, !0)
  ), wo(c, t, l)), pe(t) && i.set(t, c), c;
}
function wo(e, t, n, r = !1) {
  const { mixins: o, extends: i } = t;
  i && wo(e, i, n, !0), o && o.forEach(
    (l) => wo(e, l, n, !0)
  );
  for (const l in t)
    if (!(r && l === "expose")) {
      const u = yg[l] || n && n[l];
      e[l] = u ? u(e[l], t[l]) : t[l];
    }
  return e;
}
const yg = {
  data: Pl,
  props: Tl,
  emits: Tl,
  // objects
  methods: lr,
  computed: lr,
  // lifecycle
  beforeCreate: Fe,
  created: Fe,
  beforeMount: Fe,
  mounted: Fe,
  beforeUpdate: Fe,
  updated: Fe,
  beforeDestroy: Fe,
  beforeUnmount: Fe,
  destroyed: Fe,
  unmounted: Fe,
  activated: Fe,
  deactivated: Fe,
  errorCaptured: Fe,
  serverPrefetch: Fe,
  // assets
  components: lr,
  directives: lr,
  // watch
  watch: bg,
  // provide / inject
  provide: Pl,
  inject: wg
};
function Pl(e, t) {
  return t ? e ? function() {
    return Te(
      X(e) ? e.call(this, this) : e,
      X(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function wg(e, t) {
  return lr(Yi(e), Yi(t));
}
function Yi(e) {
  if (G(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Fe(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function lr(e, t) {
  return e ? Te(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Tl(e, t) {
  return e ? G(e) && G(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Te(
    /* @__PURE__ */ Object.create(null),
    Ol(e),
    Ol(t ?? {})
  ) : t;
}
function bg(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Te(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = Fe(e[r], t[r]);
  return n;
}
function hu() {
  return {
    app: null,
    config: {
      isNativeTag: Da,
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
let _g = 0;
function Sg(e, t) {
  return function(r, o = null) {
    X(r) || (r = Te({}, r)), o != null && !pe(o) && (o = null);
    const i = hu(), l = /* @__PURE__ */ new WeakSet(), u = [];
    let c = !1;
    const d = i.app = {
      _uid: _g++,
      _component: r,
      _props: o,
      _container: null,
      _context: i,
      _instance: null,
      version: ep,
      get config() {
        return i.config;
      },
      set config(g) {
      },
      use(g, ...h) {
        return l.has(g) || (g && X(g.install) ? (l.add(g), g.install(d, ...h)) : X(g) && (l.add(g), g(d, ...h))), d;
      },
      mixin(g) {
        return i.mixins.includes(g) || i.mixins.push(g), d;
      },
      component(g, h) {
        return h ? (i.components[g] = h, d) : i.components[g];
      },
      directive(g, h) {
        return h ? (i.directives[g] = h, d) : i.directives[g];
      },
      mount(g, h, y) {
        if (!c) {
          const w = d._ceVNode || Et(r, o);
          return w.appContext = i, y === !0 ? y = "svg" : y === !1 && (y = void 0), e(w, g, y), c = !0, d._container = g, g.__vue_app__ = d, Ms(w.component);
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
      provide(g, h) {
        return i.provides[g] = h, d;
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
const xg = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${tt(t)}Modifiers`] || e[`${un(t)}Modifiers`];
function Rg(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || ye;
  let o = n;
  const i = t.startsWith("update:"), l = i && xg(r, t.slice(7));
  l && (l.trim && (o = n.map((g) => Se(g) ? g.trim() : g)), l.number && (o = o.map(dd)));
  let u, c = r[u = xi(t)] || // also try camelCase event handler (#2249)
  r[u = xi(tt(t))];
  !c && i && (c = r[u = xi(un(t))]), c && ot(
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
const Cg = /* @__PURE__ */ new WeakMap();
function vu(e, t, n = !1) {
  const r = n ? Cg : t.emitsCache, o = r.get(e);
  if (o !== void 0)
    return o;
  const i = e.emits;
  let l = {}, u = !1;
  if (!X(e)) {
    const c = (d) => {
      const g = vu(d, t, !0);
      g && (u = !0, Te(l, g));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !i && !u ? (pe(e) && r.set(e, null), null) : (G(i) ? i.forEach((c) => l[c] = null) : Te(l, i), pe(e) && r.set(e, l), l);
}
function jo(e, t) {
  return !e || !Io(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), ue(e, t[0].toLowerCase() + t.slice(1)) || ue(e, un(t)) || ue(e, t));
}
function Fl(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: o,
    propsOptions: [i],
    slots: l,
    attrs: u,
    emit: c,
    render: d,
    renderCache: g,
    props: h,
    data: y,
    setupState: w,
    ctx: D,
    inheritAttrs: R
  } = e, A = mo(e);
  let K, x;
  try {
    if (n.shapeFlag & 4) {
      const _ = o || r, k = _;
      K = ft(
        d.call(
          k,
          _,
          g,
          h,
          w,
          y,
          D
        )
      ), x = u;
    } else {
      const _ = t;
      K = ft(
        _.length > 1 ? _(
          h,
          { attrs: u, slots: l, emit: c }
        ) : _(
          h,
          null
        )
      ), x = t.props ? u : Mg(u);
    }
  } catch (_) {
    sn.length = 0, Fo(_, e, 1), K = Et(Ot);
  }
  let j = K;
  if (x && R !== !1) {
    const _ = Object.keys(x), { shapeFlag: k } = j;
    _.length && k & 7 && (i && _.some(Ao) && (x = Eg(
      x,
      i
    )), j = Tn(j, x, !1, !0));
  }
  if (n.dirs && (j = Tn(j, null, !1, !0), j.dirs = j.dirs ? j.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const _ = Ho(j.type) && uu(j) || j;
    Ss(_, n.transition);
  }
  return K = j, mo(A), K;
}
const Mg = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Io(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Eg = (e, t) => {
  const n = {};
  for (const r in e)
    (!Ao(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
  return n;
};
function Ig(e, t, n) {
  const { props: r, children: o, component: i } = e, { props: l, children: u, patchFlag: c } = t, d = i.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return r ? Hl(r, l, d) : !!l;
    if (c & 8) {
      const g = t.dynamicProps;
      for (let h = 0; h < g.length; h++) {
        const y = g[h];
        if (mu(l, r, y) && !jo(d, y))
          return !0;
      }
    }
  } else
    return (o || u) && (!u || !u.$stable) ? !0 : r === l ? !1 : r ? l ? Hl(r, l, d) : !0 : !!l;
  return !1;
}
function Hl(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < r.length; o++) {
    const i = r[o];
    if (mu(t, e, i) && !jo(n, i))
      return !0;
  }
  return !1;
}
function mu(e, t, n) {
  const r = e[n], o = t[n];
  return n === "style" && pe(r) && pe(o) ? !ko(r, o) : r !== o;
}
function Ag({ vnode: e, parent: t, suspense: n }, r) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.suspense.vnode.el = o.el = r, e = o), o === e)
      (e = t.vnode).el = r, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = r);
}
const yu = {}, wu = () => Object.create(yu), bu = (e) => Object.getPrototypeOf(e) === yu;
function Dg(e, t, n, r = !1) {
  const o = {}, i = wu();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), _u(e, t, o, i);
  for (const l in e.propsOptions[0])
    l in o || (o[l] = void 0);
  n ? e.props = r ? o : /* @__PURE__ */ zd(o) : e.type.props ? e.props = o : e.props = i, e.attrs = i;
}
function Og(e, t, n, r) {
  const {
    props: o,
    attrs: i,
    vnode: { patchFlag: l }
  } = e, u = /* @__PURE__ */ ae(o), [c] = e.propsOptions;
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
        if (jo(e.emitsOptions, y))
          continue;
        const w = t[y];
        if (c)
          if (ue(i, y))
            w !== i[y] && (i[y] = w, d = !0);
          else {
            const D = tt(y);
            o[D] = Zi(
              c,
              u,
              D,
              w,
              e,
              !1
            );
          }
        else
          w !== i[y] && (i[y] = w, d = !0);
      }
    }
  } else {
    _u(e, t, o, i) && (d = !0);
    let g;
    for (const h in u)
      (!t || // for camelCase
      !ue(t, h) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((g = un(h)) === h || !ue(t, g))) && (c ? n && // for camelCase
      (n[h] !== void 0 || // for kebab-case
      n[g] !== void 0) && (o[h] = Zi(
        c,
        u,
        h,
        void 0,
        e,
        !0
      )) : delete o[h]);
    if (i !== u)
      for (const h in i)
        (!t || !ue(t, h)) && (delete i[h], d = !0);
  }
  d && Mt(e.attrs, "set", "");
}
function _u(e, t, n, r) {
  const [o, i] = e.propsOptions;
  let l = !1, u;
  if (t)
    for (let c in t) {
      if (cr(c))
        continue;
      const d = t[c];
      let g;
      o && ue(o, g = tt(c)) ? !i || !i.includes(g) ? n[g] = d : (u || (u = {}))[g] = d : jo(e.emitsOptions, c) || (!(c in r) || d !== r[c]) && (r[c] = d, l = !0);
    }
  if (i) {
    const c = /* @__PURE__ */ ae(n), d = u || ye;
    for (let g = 0; g < i.length; g++) {
      const h = i[g];
      n[h] = Zi(
        o,
        c,
        h,
        d[h],
        e,
        !ue(d, h)
      );
    }
  }
  return l;
}
function Zi(e, t, n, r, o, i) {
  const l = e[n];
  if (l != null) {
    const u = ue(l, "default");
    if (u && r === void 0) {
      const c = l.default;
      if (l.type !== Function && !l.skipFactory && X(c)) {
        const { propsDefaults: d } = o;
        if (n in d)
          r = d[n];
        else {
          const g = Ar(o);
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
    ] && (i && !u ? r = !1 : l[
      1
      /* shouldCastTrue */
    ] && (r === "" || r === un(n)) && (r = !0));
  }
  return r;
}
const kg = /* @__PURE__ */ new WeakMap();
function Su(e, t, n = !1) {
  const r = n ? kg : t.propsCache, o = r.get(e);
  if (o)
    return o;
  const i = e.props, l = {}, u = [];
  let c = !1;
  if (!X(e)) {
    const g = (h) => {
      c = !0;
      const [y, w] = Su(h, t, !0);
      Te(l, y), w && u.push(...w);
    };
    !n && t.mixins.length && t.mixins.forEach(g), e.extends && g(e.extends), e.mixins && e.mixins.forEach(g);
  }
  if (!i && !c)
    return pe(e) && r.set(e, An), An;
  if (G(i))
    for (let g = 0; g < i.length; g++) {
      const h = tt(i[g]);
      Ll(h) && (l[h] = ye);
    }
  else if (i)
    for (const g in i) {
      const h = tt(g);
      if (Ll(h)) {
        const y = i[g], w = l[h] = G(y) || X(y) ? { type: y } : Te({}, y), D = w.type;
        let R = !1, A = !0;
        if (G(D))
          for (let K = 0; K < D.length; ++K) {
            const x = D[K], j = X(x) && x.name;
            if (j === "Boolean") {
              R = !0;
              break;
            } else j === "String" && (A = !1);
          }
        else
          R = X(D) && D.name === "Boolean";
        w[
          0
          /* shouldCast */
        ] = R, w[
          1
          /* shouldCastTrue */
        ] = A, (R || ue(w, "default")) && u.push(h);
      }
    }
  const d = [l, u];
  return pe(e) && r.set(e, d), d;
}
function Ll(e) {
  return e[0] !== "$" && !cr(e);
}
const Rs = (e) => e === "_" || e === "_ctx" || e === "$stable", Cs = (e) => G(e) ? e.map(ft) : [ft(e)], Pg = (e, t, n) => {
  if (t._n)
    return t;
  const r = Zd((...o) => Cs(t(...o)), n);
  return r._c = !1, r;
}, xu = (e, t, n) => {
  const r = e._ctx;
  for (const o in e) {
    if (Rs(o)) continue;
    const i = e[o];
    if (X(i))
      t[o] = Pg(o, i, r);
    else if (i != null) {
      const l = Cs(i);
      t[o] = () => l;
    }
  }
}, Ru = (e, t) => {
  const n = Cs(t);
  e.slots.default = () => n;
}, Cu = (e, t, n) => {
  for (const r in t)
    (n || !Rs(r)) && (e[r] = t[r]);
}, Tg = (e, t, n) => {
  const r = e.slots = wu();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (Cu(r, t, n), n && Fa(r, "_", o, !0)) : xu(t, r);
  } else t && Ru(e, t);
}, Fg = (e, t, n) => {
  const { vnode: r, slots: o } = e;
  let i = !0, l = ye;
  if (r.shapeFlag & 32) {
    const u = t._;
    u ? n && u === 1 ? i = !1 : Cu(o, t, n) : (i = !t.$stable, xu(t, o)), l = t;
  } else t && (Ru(e, t), l = { default: 1 });
  if (i)
    for (const u in o)
      !Rs(u) && l[u] == null && delete o[u];
}, Ve = Kg;
function Hg(e) {
  return Lg(e);
}
function Lg(e, t) {
  const n = Oo();
  n.__VUE__ = !0;
  const {
    insert: r,
    remove: o,
    patchProp: i,
    createElement: l,
    createText: u,
    createComment: c,
    setText: d,
    setElementText: g,
    parentNode: h,
    nextSibling: y,
    setScopeId: w = pt,
    insertStaticContent: D
  } = e, R = (p, m, b, I = null, E = null, C = null, T = void 0, P = null, O = !!m.dynamicChildren) => {
    if (p === m)
      return;
    p && !or(p, m) && (I = Je(p), he(p, E, C, !0), p = null), m.patchFlag === -2 && (O = !1, m.dynamicChildren = null);
    const { type: M, ref: N, shapeFlag: F } = m;
    switch (M) {
      case zo:
        A(p, m, b, I);
        break;
      case Ot:
        K(p, m, b, I);
        break;
      case ki:
        p == null && x(m, b, I, T);
        break;
      case Ie:
        ce(
          p,
          m,
          b,
          I,
          E,
          C,
          T,
          P,
          O
        );
        break;
      default:
        F & 1 ? k(
          p,
          m,
          b,
          I,
          E,
          C,
          T,
          P,
          O
        ) : F & 6 ? te(
          p,
          m,
          b,
          I,
          E,
          C,
          T,
          P,
          O
        ) : (F & 64 || F & 128) && M.process(
          p,
          m,
          b,
          I,
          E,
          C,
          T,
          P,
          O,
          Ut
        );
    }
    N != null && E ? gr(N, p && p.ref, C, m || p, !m) : N == null && p && p.ref != null && gr(p.ref, null, C, p, !0);
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
  }, k = (p, m, b, I, E, C, T, P, O) => {
    if (m.type === "svg" ? T = "svg" : m.type === "math" && (T = "mathml"), p == null)
      z(
        m,
        b,
        I,
        E,
        C,
        T,
        P,
        O
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
          O
        );
      } finally {
        M && M._endPatch();
      }
    }
  }, z = (p, m, b, I, E, C, T, P) => {
    let O, M;
    const { props: N, shapeFlag: F, transition: B, dirs: U } = p;
    if (O = p.el = l(
      p.type,
      C,
      N && N.is,
      N
    ), F & 8 ? g(O, p.children) : F & 16 && $(
      p.children,
      O,
      null,
      I,
      E,
      Oi(p, C),
      T,
      P
    ), U && Qt(p, null, I, "created"), Y(O, p, p.scopeId, T, I), N) {
      for (const de in N)
        de !== "value" && !cr(de) && i(O, de, null, N[de], C, I);
      "value" in N && i(O, "value", null, N.value, C), (M = N.onVnodeBeforeMount) && lt(M, I, p);
    }
    U && Qt(p, null, I, "beforeMount");
    const J = jg(E, B);
    J && B.beforeEnter(O), r(O, m, b), ((M = N && N.onVnodeMounted) || J || U) && Ve(() => {
      try {
        M && lt(M, I, p), J && B.enter(O), U && Qt(p, null, I, "mounted");
      } finally {
      }
    }, E);
  }, Y = (p, m, b, I, E) => {
    if (b && w(p, b), I)
      for (let C = 0; C < I.length; C++)
        w(p, I[C]);
    if (E) {
      let C = E.subTree;
      if (m === C || Au(C.type) && (C.ssContent === m || C.ssFallback === m)) {
        const T = E.vnode;
        Y(
          p,
          T,
          T.scopeId,
          T.slotScopeIds,
          E.parent
        );
      }
    }
  }, $ = (p, m, b, I, E, C, T, P, O = 0) => {
    for (let M = O; M < p.length; M++) {
      const N = p[M] = P ? Ct(p[M]) : ft(p[M]);
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
    let { patchFlag: O, dynamicChildren: M, dirs: N } = m;
    O |= p.patchFlag & 16;
    const F = p.props || ye, B = m.props || ye;
    let U;
    if (b && en(b, !1), (U = B.onVnodeBeforeUpdate) && lt(U, b, m, p), N && Qt(m, p, b, "beforeUpdate"), b && en(b, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    M && (!p.dynamicChildren || p.dynamicChildren.length !== M.length) && (O = 0, T = !1, M = null), (F.innerHTML && B.innerHTML == null || F.textContent && B.textContent == null) && g(P, ""), M ? W(
      p.dynamicChildren,
      M,
      P,
      b,
      I,
      Oi(m, E),
      C
    ) : T || ne(
      p,
      m,
      P,
      null,
      b,
      I,
      Oi(m, E),
      C,
      !1
    ), O > 0) {
      if (O & 16)
        se(P, F, B, b, E);
      else if (O & 2 && F.class !== B.class && i(P, "class", null, B.class, E), O & 4 && i(P, "style", F.style, B.style, E), O & 8) {
        const J = m.dynamicProps;
        for (let de = 0; de < J.length; de++) {
          const le = J[de], _e = F[le], Ce = B[le];
          (Ce !== _e || le === "value") && i(P, le, _e, Ce, E, b);
        }
      }
      O & 1 && p.children !== m.children && g(P, m.children);
    } else !T && M == null && se(P, F, B, b, E);
    ((U = B.onVnodeUpdated) || N) && Ve(() => {
      U && lt(U, b, m, p), N && Qt(m, p, b, "updated");
    }, I);
  }, W = (p, m, b, I, E, C, T) => {
    for (let P = 0; P < m.length; P++) {
      const O = p[P], M = m[P], N = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        O.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (O.type === Ie || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !or(O, M) || // - In the case of a component, it could contain anything.
        O.shapeFlag & 198) ? h(O.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          b
        )
      );
      R(
        O,
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
          !cr(C) && !(C in b) && i(
            p,
            C,
            m[C],
            null,
            E,
            I
          );
      for (const C in b) {
        if (cr(C)) continue;
        const T = b[C], P = m[C];
        T !== P && C !== "value" && i(p, C, P, T, E, I);
      }
      "value" in b && i(p, "value", m.value, b.value, E);
    }
  }, ce = (p, m, b, I, E, C, T, P, O) => {
    const M = m.el = p ? p.el : u(""), N = m.anchor = p ? p.anchor : u("");
    let { patchFlag: F, dynamicChildren: B, slotScopeIds: U } = m;
    U && (P = P ? P.concat(U) : U), p == null ? (r(M, b, I), r(N, b, I), $(
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
      O
    )) : F > 0 && F & 64 && B && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    p.dynamicChildren && p.dynamicChildren.length === B.length ? (W(
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
    (m.key != null || E && m === E.subTree) && Mu(
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
      O
    );
  }, te = (p, m, b, I, E, C, T, P, O) => {
    m.slotScopeIds = P, p == null ? m.shapeFlag & 512 ? E.ctx.activate(
      m,
      b,
      I,
      T,
      O
    ) : we(
      m,
      b,
      I,
      E,
      C,
      T,
      O
    ) : xe(p, m, O);
  }, we = (p, m, b, I, E, C, T) => {
    const P = p.component = qg(
      p,
      I,
      E
    );
    if (xs(p) && (P.ctx.renderer = Ut), Xg(P, !1, T), P.asyncDep) {
      if (E && E.registerDep(P, fe, T), !p.el) {
        const O = P.subTree = Et(Ot);
        K(null, O, m, b), p.placeholder = O.el;
      }
    } else
      fe(
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
    if (Ig(p, m, b))
      if (I.asyncDep && !I.asyncResolved) {
        oe(I, m, b);
        return;
      } else
        I.next = m, I.update();
    else
      m.el = p.el, I.vnode = m;
  }, fe = (p, m, b, I, E, C, T) => {
    const P = () => {
      if (p.isMounted) {
        let { next: F, bu: B, u: U, parent: J, vnode: de } = p;
        {
          const Ne = Eu(p);
          if (Ne) {
            F && (F.el = de.el, oe(p, F, T)), Ne.asyncDep.then(() => {
              Ve(() => {
                p.isUnmounted || M();
              }, E);
            });
            return;
          }
        }
        let le = F, _e;
        en(p, !1), F ? (F.el = de.el, oe(p, F, T)) : F = de, B && Ri(B), (_e = F.props && F.props.onVnodeBeforeUpdate) && lt(_e, J, F, de), en(p, !0);
        const Ce = Fl(p), De = p.subTree;
        p.subTree = Ce, R(
          De,
          Ce,
          // parent may have changed if it's in a teleport
          h(De.el),
          // anchor may have changed if it's in a fragment
          Je(De),
          p,
          E,
          C
        ), F.el = Ce.el, le === null && Ag(p, Ce.el), U && Ve(U, E), (_e = F.props && F.props.onVnodeUpdated) && Ve(
          () => lt(_e, J, F, de),
          E
        );
      } else {
        let F;
        const { el: B, props: U } = m, { bm: J, m: de, parent: le, root: _e, type: Ce } = p, De = pr(m);
        en(p, !1), J && Ri(J), !De && (F = U && U.onVnodeBeforeMount) && lt(F, le, m), en(p, !0);
        {
          _e.ce && _e.ce._hasShadowRoot() && _e.ce._injectChildStyle(
            Ce,
            p.parent ? p.parent.type : void 0
          );
          const Ne = p.subTree = Fl(p);
          R(
            null,
            Ne,
            b,
            I,
            p,
            E,
            C
          ), m.el = Ne.el;
        }
        if (de && Ve(de, E), !De && (F = U && U.onVnodeMounted)) {
          const Ne = m;
          Ve(
            () => lt(F, le, Ne),
            E
          );
        }
        (m.shapeFlag & 256 || le && pr(le.vnode) && le.vnode.shapeFlag & 256) && p.a && Ve(p.a, E), p.isMounted = !0, m = b = I = null;
      }
    };
    p.scope.on();
    const O = p.effect = new Ka(P);
    p.scope.off();
    const M = p.update = O.run.bind(O), N = p.job = O.runIfDirty.bind(O);
    N.i = p, N.id = p.uid, O.scheduler = () => _s(N), en(p, !0), M();
  }, oe = (p, m, b) => {
    m.component = p;
    const I = p.vnode.props;
    p.vnode = m, p.next = null, Og(p, m.props, I, b), Fg(p, m.children, b), It(), Il(p), At();
  }, ne = (p, m, b, I, E, C, T, P, O = !1) => {
    const M = p && p.children, N = p ? p.shapeFlag : 0, F = m.children, { patchFlag: B, shapeFlag: U } = m;
    if (B > 0) {
      if (B & 128) {
        pn(
          M,
          F,
          b,
          I,
          E,
          C,
          T,
          P,
          O
        );
        return;
      } else if (B & 256) {
        Ze(
          M,
          F,
          b,
          I,
          E,
          C,
          T,
          P,
          O
        );
        return;
      }
    }
    U & 8 ? (N & 16 && Ae(M, E, C), F !== M && g(b, F)) : N & 16 ? U & 16 ? pn(
      M,
      F,
      b,
      I,
      E,
      C,
      T,
      P,
      O
    ) : Ae(M, E, C, !0) : (N & 8 && g(b, ""), U & 16 && $(
      F,
      b,
      I,
      E,
      C,
      T,
      P,
      O
    ));
  }, Ze = (p, m, b, I, E, C, T, P, O) => {
    p = p || An, m = m || An;
    const M = p.length, N = m.length, F = Math.min(M, N);
    let B;
    for (B = 0; B < F; B++) {
      const U = m[B] = O ? Ct(m[B]) : ft(m[B]);
      R(
        p[B],
        U,
        b,
        null,
        E,
        C,
        T,
        P,
        O
      );
    }
    M > N ? Ae(
      p,
      E,
      C,
      !0,
      !1,
      F
    ) : $(
      m,
      b,
      I,
      E,
      C,
      T,
      P,
      O,
      F
    );
  }, pn = (p, m, b, I, E, C, T, P, O) => {
    let M = 0;
    const N = m.length;
    let F = p.length - 1, B = N - 1;
    for (; M <= F && M <= B; ) {
      const U = p[M], J = m[M] = O ? Ct(m[M]) : ft(m[M]);
      if (or(U, J))
        R(
          U,
          J,
          b,
          null,
          E,
          C,
          T,
          P,
          O
        );
      else
        break;
      M++;
    }
    for (; M <= F && M <= B; ) {
      const U = p[F], J = m[B] = O ? Ct(m[B]) : ft(m[B]);
      if (or(U, J))
        R(
          U,
          J,
          b,
          null,
          E,
          C,
          T,
          P,
          O
        );
      else
        break;
      F--, B--;
    }
    if (M > F) {
      if (M <= B) {
        const U = B + 1, J = U < N ? m[U].el : I;
        for (; M <= B; )
          R(
            null,
            m[M] = O ? Ct(m[M]) : ft(m[M]),
            b,
            J,
            E,
            C,
            T,
            P,
            O
          ), M++;
      }
    } else if (M > B)
      for (; M <= F; )
        he(p[M], E, C, !0), M++;
    else {
      const U = M, J = M, de = /* @__PURE__ */ new Map();
      for (M = J; M <= B; M++) {
        const Oe = m[M] = O ? Ct(m[M]) : ft(m[M]);
        Oe.key != null && de.set(Oe.key, M);
      }
      let le, _e = 0;
      const Ce = B - J + 1;
      let De = !1, Ne = 0;
      const Ft = new Array(Ce);
      for (M = 0; M < Ce; M++) Ft[M] = 0;
      for (M = U; M <= F; M++) {
        const Oe = p[M];
        if (_e >= Ce) {
          he(Oe, E, C, !0);
          continue;
        }
        let Ge;
        if (Oe.key != null)
          Ge = de.get(Oe.key);
        else
          for (le = J; le <= B; le++)
            if (Ft[le - J] === 0 && or(Oe, m[le])) {
              Ge = le;
              break;
            }
        Ge === void 0 ? he(Oe, E, C, !0) : (Ft[Ge - J] = M + 1, Ge >= Ne ? Ne = Ge : De = !0, R(
          Oe,
          m[Ge],
          b,
          null,
          E,
          C,
          T,
          P,
          O
        ), _e++);
      }
      const Ln = De ? zg(Ft) : An;
      for (le = Ln.length - 1, M = Ce - 1; M >= 0; M--) {
        const Oe = J + M, Ge = m[Oe], jn = m[Oe + 1], vn = Oe + 1 < N ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          jn.el || Iu(jn)
        ) : I;
        Ft[M] === 0 ? R(
          null,
          Ge,
          b,
          vn,
          E,
          C,
          T,
          P,
          O
        ) : De && (le < 0 || M !== Ln[le] ? Be(Ge, b, vn, 2) : le--);
      }
    }
  }, Be = (p, m, b, I, E = null) => {
    const { el: C, type: T, transition: P, children: O, shapeFlag: M } = p;
    if (M & 6) {
      Be(p.component.subTree, m, b, I);
      return;
    }
    if (M & 128) {
      p.suspense.move(m, b, I);
      return;
    }
    if (M & 64) {
      T.move(p, m, b, Ut);
      return;
    }
    if (T === Ie) {
      r(C, m, b);
      for (let F = 0; F < O.length; F++)
        Be(O[F], m, b, I);
      r(p.anchor, m, b);
      return;
    }
    if (T === ki) {
      j(p, m, b);
      return;
    }
    if (I !== 2 && M & 1 && P)
      if (I === 0)
        P.persisted && !C[Ai] ? r(C, m, b) : (P.beforeEnter(C), r(C, m, b), Ve(() => P.enter(C), E));
      else {
        const { leave: F, delayLeave: B, afterLeave: U } = P, J = () => {
          p.ctx.isUnmounted ? o(C) : r(C, m, b);
        }, de = () => {
          const le = C._isLeaving || !!C[Ai];
          C._isLeaving && C[Ai](
            !0
            /* cancelled */
          ), P.persisted && !le ? J() : F(C, () => {
            J(), U && U();
          });
        };
        B ? B(C, J, de) : de();
      }
    else
      r(C, m, b);
  }, he = (p, m, b, I = !1, E = !1) => {
    const {
      type: C,
      props: T,
      ref: P,
      children: O,
      dynamicChildren: M,
      shapeFlag: N,
      patchFlag: F,
      dirs: B,
      cacheIndex: U,
      memo: J
    } = p;
    if (F === -2 && (E = !1), P != null && (It(), gr(P, null, b, p, !0), At()), U != null && (m.renderCache[U] = void 0), N & 256) {
      m.ctx.deactivate(p);
      return;
    }
    const de = N & 1 && B, le = !pr(p);
    let _e;
    if (le && (_e = T && T.onVnodeBeforeUnmount) && lt(_e, m, p), N & 6)
      Hr(p.component, b, I);
    else {
      if (N & 128) {
        p.suspense.unmount(b, I);
        return;
      }
      de && Qt(p, null, m, "beforeUnmount"), N & 64 ? p.type.remove(
        p,
        m,
        b,
        Ut,
        I
      ) : M && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !M.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (C !== Ie || F > 0 && F & 64) ? Ae(
        M,
        m,
        b,
        !1,
        !0
      ) : (C === Ie && F & 384 || !E && N & 16) && Ae(O, m, b), I && hn(p);
    }
    const Ce = J != null && U == null;
    (le && (_e = T && T.onVnodeUnmounted) || de || Ce) && Ve(() => {
      _e && lt(_e, m, p), de && Qt(p, null, m, "unmounted"), Ce && (p.el = null);
    }, b);
  }, hn = (p) => {
    const { type: m, el: b, anchor: I, transition: E } = p;
    if (m === Ie) {
      Wt(b, I);
      return;
    }
    if (m === ki) {
      _(p);
      return;
    }
    const C = () => {
      o(b), E && !E.persisted && E.afterLeave && E.afterLeave();
    };
    if (p.shapeFlag & 1 && E && !E.persisted) {
      const { leave: T, delayLeave: P } = E, O = () => T(b, C);
      P ? P(p.el, C, O) : O();
    } else
      C();
  }, Wt = (p, m) => {
    let b;
    for (; p !== m; )
      b = y(p), o(p), p = b;
    o(m);
  }, Hr = (p, m, b) => {
    const { bum: I, scope: E, job: C, subTree: T, um: P, m: O, a: M } = p;
    jl(O), jl(M), I && Ri(I), E.stop(), C && (C.flags |= 8, he(T, p, m, b)), P && Ve(P, m), Ve(() => {
      p.isUnmounted = !0;
    }, m);
  }, Ae = (p, m, b, I = !1, E = !1, C = 0) => {
    for (let T = C; T < p.length; T++)
      he(p[T], m, b, I, E);
  }, Je = (p) => {
    if (p.shapeFlag & 6)
      return Je(p.component.subTree);
    if (p.shapeFlag & 128)
      return p.suspense.next();
    const m = y(p.anchor || p.el), b = m && m[ng];
    return b ? y(b) : m;
  };
  let Tt = !1;
  const Lr = (p, m, b) => {
    let I;
    p == null ? m._vnode && (he(m._vnode, null, null, !0), I = m._vnode.component) : R(
      m._vnode || null,
      p,
      m,
      null,
      null,
      null,
      b
    ), m._vnode = p, Tt || (Tt = !0, Il(I), ou(), Tt = !1);
  }, Ut = {
    p: R,
    um: he,
    m: Be,
    r: hn,
    mt: we,
    mc: $,
    pc: ne,
    pbc: W,
    n: Je,
    o: e
  };
  return {
    render: Lr,
    hydrate: void 0,
    createApp: Sg(Lr)
  };
}
function Oi({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function en({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function jg(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Mu(e, t, n = !1) {
  const r = e.children, o = t.children;
  if (G(r) && G(o))
    for (let i = 0; i < r.length; i++) {
      const l = r[i];
      let u = o[i];
      u.shapeFlag & 1 && !u.dynamicChildren && ((u.patchFlag <= 0 || u.patchFlag === 32) && (u = o[i] = Ct(o[i]), u.el = l.el), !n && u.patchFlag !== -2 && Mu(l, u)), u.type === zo && (u.patchFlag === -1 && (u = o[i] = Ct(u)), u.el = l.el), u.type === Ot && !u.el && (u.el = l.el);
    }
}
function zg(e) {
  const t = e.slice(), n = [0];
  let r, o, i, l, u;
  const c = e.length;
  for (r = 0; r < c; r++) {
    const d = e[r];
    if (d !== 0) {
      if (o = n[n.length - 1], e[o] < d) {
        t[r] = o, n.push(r);
        continue;
      }
      for (i = 0, l = n.length - 1; i < l; )
        u = i + l >> 1, e[n[u]] < d ? i = u + 1 : l = u;
      d < e[n[i]] && (i > 0 && (t[r] = n[i - 1]), n[i] = r);
    }
  }
  for (i = n.length, l = n[i - 1]; i-- > 0; )
    n[i] = l, l = t[l];
  return n;
}
function Eu(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Eu(t);
}
function jl(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function Iu(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? Iu(t.subTree) : null;
}
const Au = (e) => e.__isSuspense;
function Kg(e, t) {
  t && t.pendingBranch ? G(e) ? t.effects.push(...e) : t.effects.push(e) : Yd(e);
}
const Ie = /* @__PURE__ */ Symbol.for("v-fgt"), zo = /* @__PURE__ */ Symbol.for("v-txt"), Ot = /* @__PURE__ */ Symbol.for("v-cmt"), ki = /* @__PURE__ */ Symbol.for("v-stc"), sn = [];
let qe = null;
function Z(e = !1) {
  sn.push(qe = e ? null : []);
}
function Du() {
  sn.pop(), qe = sn[sn.length - 1] || null;
}
let _r = 1;
function zl(e, t = !1) {
  _r += e, e < 0 && qe && t && (qe.hasOnce = !0);
}
function Ou(e) {
  return e.dynamicChildren = _r > 0 ? qe || An : null, Du(), _r > 0 && qe && qe.push(e), e;
}
function Q(e, t, n, r, o, i) {
  return Ou(
    Me(
      e,
      t,
      n,
      r,
      o,
      i,
      !0
    )
  );
}
function Vg(e, t, n, r, o) {
  return Ou(
    Et(
      e,
      t,
      n,
      r,
      o,
      !0
    )
  );
}
function ku(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function or(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Pu = ({ key: e }) => e ?? null, co = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? Se(e) || /* @__PURE__ */ Pe(e) || X(e) ? { i: gt, r: e, k: t, f: !!n } : e : null);
function Me(e, t = null, n = null, r = 0, o = null, i = e === Ie ? 0 : 1, l = !1, u = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Pu(t),
    ref: t && co(t),
    scopeId: su,
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
    shapeFlag: i,
    patchFlag: r,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: gt
  };
  return u ? (bo(c, n), i & 128 && e.normalize(c)) : n && (c.shapeFlag |= Se(n) ? 8 : 16), _r > 0 && // avoid a block node from tracking itself
  !l && // has current parent block
  qe && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && qe.push(c), c;
}
const Et = Bg;
function Bg(e, t = null, n = null, r = 0, o = null, i = !1) {
  if ((!e || e === pg) && (e = Ot), ku(e)) {
    const u = Tn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && bo(u, n), _r > 0 && !i && qe && (u.shapeFlag & 6 ? qe[qe.indexOf(e)] = u : qe.push(u)), u.patchFlag = -2, u;
  }
  if (Qg(e) && (e = e.__vccOpts), t) {
    t = Ng(t);
    let { class: u, style: c } = t;
    u && !Se(u) && (t.class = Ue(u)), pe(c) && (/* @__PURE__ */ bs(c) && !G(c) && (c = Te({}, c)), t.style = ut(c));
  }
  const l = Se(e) ? 1 : Au(e) ? 128 : Ho(e) ? 64 : pe(e) ? 4 : X(e) ? 2 : 0;
  return Me(
    e,
    t,
    n,
    r,
    o,
    l,
    i,
    !0
  );
}
function Ng(e) {
  return e ? /* @__PURE__ */ bs(e) || bu(e) ? Te({}, e) : e : null;
}
function Tn(e, t, n = !1, r = !1) {
  const { props: o, ref: i, patchFlag: l, children: u, transition: c } = e, d = t ? $g(o || {}, t) : o, g = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && Pu(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? G(i) ? i.concat(co(t)) : [i, co(t)] : co(t)
    ) : i,
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
    patchFlag: t && e.type !== Ie ? l === -1 ? 16 : l | 16 : l,
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
    ssContent: e.ssContent && Tn(e.ssContent),
    ssFallback: e.ssFallback && Tn(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && r && Ss(
    g,
    c.clone(g)
  ), g;
}
function Ji(e = " ", t = 0) {
  return Et(zo, null, e, t);
}
function et(e = "", t = !1) {
  return t ? (Z(), Vg(Ot, null, e)) : Et(Ot, null, e);
}
function ft(e) {
  return e == null || typeof e == "boolean" ? Et(Ot) : G(e) ? Et(
    Ie,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : ku(e) ? Ct(e) : Et(zo, null, String(e));
}
function Ct(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Tn(e);
}
function bo(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (G(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), bo(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !bu(t) ? t._ctx = gt : o === 3 && gt && (gt.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (X(t)) {
    if (r & 65) {
      bo(e, { default: t });
      return;
    }
    t = { default: t, _ctx: gt }, n = 32;
  } else
    t = String(t), r & 64 ? (n = 16, t = [Ji(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function $g(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === "class")
        t.class !== r.class && (t.class = Ue([t.class, r.class]));
      else if (o === "style")
        t.style = ut([t.style, r.style]);
      else if (Io(o)) {
        const i = t[o], l = r[o];
        l && i !== l && !(G(i) && i.includes(l)) ? t[o] = i ? [].concat(i, l) : l : l == null && i == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !Ao(o) && (t[o] = l);
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
const Wg = hu();
let Ug = 0;
function qg(e, t, n) {
  const r = e.type, o = (t ? t.appContext : e.appContext) || Wg, i = {
    uid: Ug++,
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
    scope: new bd(
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
    propsOptions: Su(r, o),
    emitsOptions: vu(r, o),
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
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = Rg.bind(null, i), e.ce && e.ce(i), i;
}
let Le = null;
const Gg = () => Le || gt;
let _o, Sr;
{
  const e = Oo(), t = (n, r) => {
    let o;
    return (o = e[n]) || (o = e[n] = []), o.push(r), (i) => {
      o.length > 1 ? o.forEach((l) => l(i)) : o[0](i);
    };
  };
  _o = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Le = n
  ), Sr = t(
    "__VUE_SSR_SETTERS__",
    (n) => xr = n
  );
}
const Ar = (e) => {
  const t = Le;
  return _o(e), e.scope.on(), () => {
    e.scope.off(), _o(t);
  };
}, Kl = () => {
  Le && Le.scope.off(), _o(null);
};
function Tu(e) {
  return e.vnode.shapeFlag & 4;
}
let xr = !1;
function Xg(e, t = !1, n = !1) {
  t && Sr(t);
  const { props: r, children: o } = e.vnode, i = Tu(e);
  Dg(e, r, i, t), Tg(e, o, n || t);
  const l = i ? Yg(e, t) : void 0;
  return t && Sr(!1), l;
}
function Yg(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, hg);
  const { setup: r } = n;
  if (r) {
    It();
    const o = e.setupContext = r.length > 1 ? Jg(e) : null, i = Ar(e), l = Ir(
      r,
      e,
      0,
      [
        e.props,
        o
      ]
    ), u = Oa(l);
    if (At(), i(), (u || e.sp) && !pr(e) && cu(e), u) {
      if (l.then(Kl, Kl), t)
        return l.then((c) => {
          Sr(!0);
          try {
            Vl(e, c, t);
          } finally {
            Sr(!1);
          }
        }).catch((c) => {
          Fo(c, e, 0);
        });
      e.asyncDep = l;
    } else
      Vl(e, l);
  } else
    Fu(e);
}
function Vl(e, t, n) {
  X(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : pe(t) && (e.setupState = tu(t)), Fu(e);
}
function Fu(e, t, n) {
  const r = e.type;
  e.render || (e.render = r.render || pt);
  {
    const o = Ar(e);
    It();
    try {
      vg(e);
    } finally {
      At(), o();
    }
  }
}
const Zg = {
  get(e, t) {
    return ke(e, "get", ""), e[t];
  }
};
function Jg(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Zg),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Ms(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(tu(Kd(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in hr)
        return hr[n](e);
    },
    has(t, n) {
      return n in t || n in hr;
    }
  })) : e.proxy;
}
function Qg(e) {
  return X(e) && "__vccOpts" in e;
}
const V = (e, t) => /* @__PURE__ */ Wd(e, t, xr), ep = "3.5.42";
/**
* @vue/runtime-dom v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Qi;
const Bl = typeof window < "u" && window.trustedTypes;
if (Bl)
  try {
    Qi = /* @__PURE__ */ Bl.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Hu = Qi ? (e) => Qi.createHTML(e) : (e) => e, tp = "http://www.w3.org/2000/svg", np = "http://www.w3.org/1998/Math/MathML", Rt = typeof document < "u" ? document : null, Nl = Rt && /* @__PURE__ */ Rt.createElement("template"), rp = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const o = t === "svg" ? Rt.createElementNS(tp, e) : t === "mathml" ? Rt.createElementNS(np, e) : n ? Rt.createElement(e, { is: n }) : Rt.createElement(e);
    return e === "select" && r && r.multiple != null && o.setAttribute("multiple", r.multiple), o;
  },
  createText: (e) => Rt.createTextNode(e),
  createComment: (e) => Rt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Rt.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, r, o, i) {
    const l = n ? n.previousSibling : t.lastChild;
    if (o && (o === i || o.nextSibling))
      for (; t.insertBefore(o.cloneNode(!0), n), !(o === i || !(o = o.nextSibling)); )
        ;
    else {
      Nl.innerHTML = Hu(
        r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e
      );
      const u = Nl.content;
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
}, op = /* @__PURE__ */ Symbol("_vtc");
function ip(e, t, n) {
  const r = e[op];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const $l = /* @__PURE__ */ Symbol("_vod"), sp = /* @__PURE__ */ Symbol("_vsh"), lp = /* @__PURE__ */ Symbol(""), ap = /(?:^|;)\s*display\s*:/;
function up(e, t, n) {
  const r = e.style, o = Se(n);
  let i = !1;
  if (n && !o) {
    if (t)
      if (Se(t))
        for (const l of t.split(";")) {
          const u = l.slice(0, l.indexOf(":")).trim();
          n[u] == null && ar(r, u, "");
        }
      else
        for (const l in t)
          n[l] == null && ar(r, l, "");
    for (const l in n) {
      l === "display" && (i = !0);
      const u = n[l];
      u != null ? fp(
        e,
        l,
        !Se(t) && t ? t[l] : void 0,
        u
      ) || ar(r, l, u) : ar(r, l, "");
    }
  } else if (o) {
    if (t !== n) {
      const l = r[lp];
      l && (n += ";" + l), r.cssText = n, i = ap.test(n);
    }
  } else t && e.removeAttribute("style");
  $l in e && (e[$l] = i ? r.display : "", e[sp] && (r.display = "none"));
}
const no = /\s*!important$/;
function ar(e, t, n) {
  if (G(n))
    n.forEach((r) => ar(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--"))
    no.test(n) ? e.setProperty(t, n.replace(no, ""), "important") : e.setProperty(t, n);
  else {
    const r = cp(e, t);
    no.test(n) ? e.setProperty(
      un(r),
      n.replace(no, ""),
      "important"
    ) : e[r] = n;
  }
}
const Wl = ["Webkit", "Moz", "ms"], Pi = {};
function cp(e, t) {
  const n = Pi[t];
  if (n)
    return n;
  let r = tt(t);
  if (r !== "filter" && r in e)
    return Pi[t] = r;
  r = Ta(r);
  for (let o = 0; o < Wl.length; o++) {
    const i = Wl[o] + r;
    if (i in e)
      return Pi[t] = i;
  }
  return t;
}
function fp(e, t, n, r) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && Se(r) && n === r;
}
const Ul = "http://www.w3.org/1999/xlink";
function ql(e, t, n, r, o, i = yd(t)) {
  r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Ul, t.slice(6, t.length)) : e.setAttributeNS(Ul, t, n) : n == null || i && !Ha(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    i ? "" : ht(n) ? String(n) : n
  );
}
function Gl(e, t, n, r, o) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Hu(n) : n);
    return;
  }
  const i = e.tagName;
  if (t === "value" && i !== "PROGRESS" && // custom elements may use _value internally
  !i.includes("-")) {
    const u = i === "OPTION" ? e.getAttribute("value") || "" : e.value, c = n == null ? (
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
    u === "boolean" ? n = Ha(n) : n == null && u === "string" ? (n = "", l = !0) : u === "number" && (n = 0, l = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  l && e.removeAttribute(o || t);
}
function dp(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function gp(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const Xl = /* @__PURE__ */ Symbol("_vei");
function pp(e, t, n, r, o = null) {
  const i = e[Xl] || (e[Xl] = {}), l = i[t];
  if (r && l)
    l.value = r;
  else {
    const [u, c] = mp(t);
    if (r) {
      const d = i[t] = bp(
        r,
        o
      );
      dp(e, u, d, c);
    } else l && (gp(e, u, l, c), i[t] = void 0);
  }
}
const hp = /(Once|Passive|Capture)$/, vp = /^on:?(?:Once|Passive|Capture)$/;
function mp(e) {
  let t, n;
  for (; (n = e.match(hp)) && !vp.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : un(e.slice(2)), t];
}
let Ti = 0;
const yp = /* @__PURE__ */ Promise.resolve(), wp = () => Ti || (yp.then(() => Ti = 0), Ti = Date.now());
function bp(e, t) {
  const n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    const o = n.value;
    if (G(o)) {
      const i = r.stopImmediatePropagation;
      r.stopImmediatePropagation = () => {
        i.call(r), r._stopped = !0;
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
  return n.value = e, n.attached = wp(), n;
}
const Yl = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, _p = (e, t, n, r, o, i) => {
  const l = o === "svg";
  t === "class" ? ip(e, r, l) : t === "style" ? up(e, n, r) : Io(t) ? Ao(t) || pp(e, t, n, r, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Sp(e, t, r, l)) ? (Gl(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && ql(e, t, r, l, i, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (xp(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !Se(r))) ? Gl(e, tt(t), r, i, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), ql(e, t, r, l));
};
function Sp(e, t, n, r) {
  if (r)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Yl(t) && X(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return Yl(t) && Se(n) ? !1 : t in e;
}
function xp(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const r = tt(t);
  return Array.isArray(n) ? n.some((o) => tt(o) === r) : Object.keys(n).some((o) => tt(o) === r);
}
const Rp = ["ctrl", "shift", "alt", "meta"], Cp = {
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
  exact: (e, t) => Rp.some((n) => e[`${n}Key`] && !t.includes(n))
}, We = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), r = t.join(".");
  return n[r] || (n[r] = (o, ...i) => {
    for (let l = 0; l < t.length; l++) {
      const u = Cp[t[l]];
      if (u && u(o, t)) return;
    }
    return e(o, ...i);
  });
}, Mp = /* @__PURE__ */ Te({ patchProp: _p }, rp);
let Zl;
function Ep() {
  return Zl || (Zl = Hg(Mp));
}
const Ip = (...e) => {
  const t = Ep().createApp(...e), { mount: n } = t;
  return t.mount = (r) => {
    const o = Dp(r);
    if (!o) return;
    const i = t._component;
    !X(i) && !i.render && !i.template && (i.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const l = n(o, !1, Ap(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), l;
  }, t;
};
function Ap(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Dp(e) {
  return Se(e) ? document.querySelector(e) : e;
}
function ro() {
  return !0;
}
const Op = Symbol("merge-proxy"), fo = Symbol("merge-proxy-sources"), kp = {
  get(e, t, n) {
    return t === Op ? n : t === fo ? e.sources : e.get(t);
  },
  has(e, t) {
    return e.has(t);
  },
  set: ro,
  deleteProperty: ro,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: ro,
      deleteProperty: ro
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function go(e) {
  return e && typeof e == "object" && "value" in e ? e.value : e;
}
function es(...e) {
  const t = e.flatMap((n) => typeof n == "object" && n !== null && fo in n && Array.isArray(n[fo]) ? n[fo] : [n]);
  return new Proxy({
    sources: t,
    get(n) {
      for (let r = t.length - 1; r >= 0; r--) {
        const o = go(t[r])[n];
        if (o !== void 0) return o;
      }
    },
    has(n) {
      for (let r = t.length - 1; r >= 0; r--) if (n in go(t[r])) return !0;
      return !1;
    },
    keys() {
      const n = [];
      for (const r of t) n.push(...Object.keys(go(r)));
      return [...Array.from(new Set(n))];
    }
  }, kp);
}
function Jl(...e) {
  const t = {};
  for (let n of e)
    if (n = go(n), !!n)
      for (const r of Reflect.ownKeys(n)) {
        const o = n[r];
        o !== void 0 && (t[r] = o);
      }
  return t;
}
function Lu(e) {
  return typeof e == "function" ? e : (t) => {
    var n;
    return (n = e.next) == null ? void 0 : n.call(e, t);
  };
}
function Pp(e) {
  return Object.assign(e, {
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: be(e, Lu(t), { flush: "sync" }) })
  });
}
function Tp(e) {
  return Object.assign(e, {
    set: (t) => {
      e.value = typeof t == "function" ? t(e.value) : t;
    },
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: be(e, Lu(t), { flush: "sync" }) })
  });
}
function Fp() {
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
    createReadonlyAtom: (t, n) => Pp(V(() => t())),
    createWritableAtom: (t, n) => Tp(/* @__PURE__ */ Vd(t)),
    untrack: (t) => t(),
    batch: (t) => t()
  };
}
function Ko(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function vt(e) {
  if (Array.isArray(e)) return e.map(vt);
  if (e && typeof e == "object") {
    const t = Object.getPrototypeOf(e);
    if (t !== Object.prototype && t !== null) return e;
    const n = t === null ? ie() : {}, r = Object.keys(e);
    for (let o = 0; o < r.length; o++) {
      const i = r[o];
      Object.defineProperty(n, i, {
        configurable: !0,
        enumerable: !0,
        value: vt(e[i]),
        writable: !0
      });
    }
    return n;
  }
  return e;
}
function ju(e, t) {
  const n = Object.keys(t), r = e;
  for (let o = 0; o < n.length; o++) {
    const i = n[o];
    !i.startsWith("_memo_") && i !== "_cellsCache" && (r[i] = t[i]);
  }
  return e;
}
function ie() {
  return /* @__PURE__ */ Object.create(null);
}
function cn(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Dr(e, t) {
  return (n) => {
    var r;
    (((r = t.options.atoms) == null ? void 0 : r[e]) ?? t.baseAtoms[e]).set((o) => Ko(n, o));
  };
}
function Ql(e) {
  if (typeof e != "object" || e === null) return !1;
  if (Array.isArray(e)) return !0;
  const t = Object.getPrototypeOf(e);
  return t === Object.prototype || t === null;
}
function ea(e) {
  return Reflect.ownKeys(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
const Hp = 3;
function Lp(e, t) {
  return zu(e, t, Hp);
}
function zu(e, t, n) {
  if (Object.is(e, t)) return !0;
  if (n <= 0 || !Ql(e) || !Ql(t) || (Array.isArray(e) || Array.isArray(t)) && (!Array.isArray(e) || !Array.isArray(t) || e.length !== t.length))
    return !1;
  const r = ea(e), o = ea(t);
  if (r.length !== o.length) return !1;
  const i = e, l = t;
  for (let u = 0; u < r.length; u++) {
    const c = r[u];
    if (!Object.prototype.propertyIsEnumerable.call(t, c) || !zu(i[c], l[c], n - 1)) return !1;
  }
  return !0;
}
function Vo(e, t, n, r = Lp) {
  const o = `on${t.charAt(0).toUpperCase()}${t.slice(1)}Change`, i = e.options[o];
  i && i((l) => {
    const u = Ko(n, l);
    return r(l, u) ? l : u;
  });
}
function jp(e) {
  return e instanceof Function;
}
function zp(e, t) {
  const n = [], r = (o) => {
    o.forEach((i) => {
      n.push(i);
      const l = t(i);
      l.length && r(l);
    });
  };
  return r(e), n;
}
const Kp = ({ fn: e, memoDeps: t, onAfterCompare: n, onAfterUpdate: r, onBeforeCompare: o, onBeforeUpdate: i }) => {
  let l = [], u;
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
    return n == null || n(h), h && (l = g, i == null || i(), u = e(...g ?? []), r == null || r(u)), u;
  };
};
function Ku(e) {
  let t = !1;
  return () => {
    if (!t) {
      t = !0;
      return;
    }
    e();
  };
}
function Or({ feature: e, fnName: t, objectId: n, onAfterUpdate: r, table: o, ...i }) {
  const l = () => {
    if (!r) return;
    const { schedule: c, untrack: d } = o._reactivity;
    c(() => d(() => r()));
  };
  return Kp({
    ...i,
    ...{ onAfterUpdate: () => {
      l();
    } }
  });
}
function Vu(e, t = "_") {
  const [n, r] = e.split(t);
  return {
    fnKey: r,
    fnName: `${n}.${r}`,
    parentName: n
  };
}
function mt(e, t, n) {
  for (const [r, { fn: o, memoDeps: i }] of Object.entries(n)) {
    const { fnKey: l, fnName: u } = Vu(r);
    t[l] = i ? Or({
      memoDeps: i,
      fn: o,
      fnName: u,
      table: t,
      feature: e
    }) : o;
  }
}
function it(e, t, n, r) {
  for (const [o, { fn: i, memoDeps: l }] of Object.entries(r)) {
    const { fnKey: u, fnName: c } = Vu(o);
    if (l) {
      const d = `_memo_${u}`;
      t[u] = function(...g) {
        if (!this[d]) {
          const h = this;
          this[d] = Or({
            memoDeps: (y) => l(h, y),
            fn: (...y) => i(h, ...y),
            fnName: c,
            objectId: h.id,
            table: n,
            feature: e
          });
        }
        return this[d](...g);
      };
    } else t[u] = function(...d) {
      return i(this, ...d);
    };
  }
}
function ee(e, t, n, ...r) {
  var o;
  return ((o = e[t]) == null ? void 0 : o.call(e, ...r)) ?? n(e, ...r);
}
function Vp(e) {
  return e.row.getValue(e.column.id);
}
function Bp(e) {
  return e.getValue() ?? e.table.options.renderFallbackValue;
}
function Np(e) {
  return {
    table: e.table,
    column: e.column,
    row: e.row,
    cell: e,
    getValue: () => e.getValue(),
    renderValue: () => e.renderValue()
  };
}
const $p = { assignCellPrototype: (e, t) => {
  it("coreCellsFeature", e, t, {
    cell_getValue: { fn: (n) => Vp(n) },
    cell_renderValue: { fn: (n) => Bp(n) },
    cell_getContext: {
      fn: (n) => Np(n),
      memoDeps: (n) => [n]
    }
  });
} };
function Wp(e) {
  var t, n;
  if (!e._headerPrototype) {
    e._headerPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignHeaderPrototype) == null || n.call(t, e._headerPrototype, e);
  }
  return e._headerPrototype;
}
function Bu(e, t, n) {
  const r = Wp(e), o = Object.create(r);
  o.colSpan = 0, o.column = t, o.depth = n.depth, o.headerGroup = null, o.id = n.id ?? t.id, o.index = n.index, o.isPlaceholder = !!n.isPlaceholder, o.placeholderId = n.placeholderId, o.rowSpan = 0, o.subHeaders = [];
  const i = e._headerInstanceInitFns;
  for (let l = 0; l < i.length; l++) i[l](o);
  return o;
}
function fn() {
  return {
    start: [],
    end: []
  };
}
function Up(e) {
  var i;
  const t = e.getAllColumns(), n = e.getAllLeafColumnsById(), { start: r } = ((i = e.atoms.columnPinning) == null ? void 0 : i.get()) ?? fn(), o = [];
  for (let l = 0; l < r.length; l++) {
    const u = n[r[l]];
    u && ee(u, "getIsVisible", Ye) && o.push(u);
  }
  return Rr(t, o, e, "start");
}
function qp(e) {
  var i;
  const t = e.getAllColumns(), n = e.getAllLeafColumnsById(), { end: r } = ((i = e.atoms.columnPinning) == null ? void 0 : i.get()) ?? fn(), o = [];
  for (let l = 0; l < r.length; l++) {
    const u = n[r[l]];
    u && ee(u, "getIsVisible", Ye) && o.push(u);
  }
  return Rr(t, o, e, "end");
}
function Gp(e) {
  var i;
  const t = e.getAllColumns();
  let n = ee(e, "getVisibleLeafColumns", Es);
  const { start: r, end: o } = ((i = e.atoms.columnPinning) == null ? void 0 : i.get()) ?? fn();
  if (r.length || o.length) {
    const l = [...r, ...o];
    n = n.filter((u) => !l.includes(u.id));
  }
  return Rr(t, n, e, "center");
}
function Xp(e) {
  var o;
  const { start: t } = ((o = e.atoms.columnPinning) == null ? void 0 : o.get()) ?? fn(), n = e.getAllLeafColumnsById(), r = [];
  for (let i = 0; i < t.length; i++) {
    const l = n[t[i]];
    l && r.push(l);
  }
  return r;
}
function Yp(e) {
  var o;
  const { end: t } = ((o = e.atoms.columnPinning) == null ? void 0 : o.get()) ?? fn(), n = e.getAllLeafColumnsById(), r = [];
  for (let i = 0; i < t.length; i++) {
    const l = n[t[i]];
    l && r.push(l);
  }
  return r;
}
function Zp(e) {
  var o;
  const { start: t, end: n } = ((o = e.atoms.columnPinning) == null ? void 0 : o.get()) ?? fn();
  if (!t.length && !n.length) return e.getAllLeafColumns();
  const r = [...t, ...n];
  return e.getAllLeafColumns().filter((i) => !r.includes(i.id));
}
function Jp(e) {
  return ee(e, "getStartLeafColumns", Xp).filter((t) => ee(t, "getIsVisible", Ye));
}
function Qp(e) {
  return ee(e, "getEndLeafColumns", Yp).filter((t) => ee(t, "getIsVisible", Ye));
}
function eh(e) {
  return ee(e, "getCenterLeafColumns", Zp).filter((t) => ee(t, "getIsVisible", Ye));
}
function oo(e, t) {
  return t ? t === "start" ? ee(e, "getStartVisibleLeafColumns", Jp) : t === "end" ? ee(e, "getEndVisibleLeafColumns", Qp) : ee(e, "getCenterVisibleLeafColumns", eh) : ee(e, "getVisibleLeafColumns", Es);
}
function Ye(e) {
  var r;
  const t = (r = e.table.atoms.columnVisibility) == null ? void 0 : r.get();
  if (!t) return !0;
  const n = e.columns;
  return n.length ? n.some((o) => ee(o, "getIsVisible", Ye)) : (cn(t, e.id) ? t[e.id] : void 0) ?? !0;
}
function Es(e) {
  return e.getAllLeafColumns().filter((t) => ee(t, "getIsVisible", Ye));
}
function Nu(e, t = 1) {
  let n = t;
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    ee(o, "getIsVisible", Ye) && o.columns.length && (n = Math.max(n, Nu(o.columns, t + 1)));
  }
  return n;
}
function th(e, t) {
  return e ? `${e}_${t}` : String(t);
}
function nh(e, t, n, r) {
  let o = e ?? "";
  return t && (o = o ? `${o}_${t}` : String(t)), n && (o = o ? `${o}_${n}` : n), r && (o = o ? `${o}_${r}` : r), o;
}
function rh(e, t) {
  let n = 0;
  for (let r = 0; r < e.length; r++) e[r].column === t && n++;
  return n;
}
function $u(e, t, n, r, o, i) {
  const l = {
    depth: t,
    id: th(r, t),
    headers: []
  }, u = [];
  for (let c = 0; c < e.length; c++) {
    if (!(c in e)) continue;
    const d = e[c], g = u[u.length - 1], h = d.column.depth === l.depth;
    let y, w = !1;
    if (h && d.column.parent ? y = d.column.parent : (y = d.column, w = !0), g && g.column === y) g.subHeaders.push(d);
    else {
      const D = Bu(n, y, {
        id: nh(r, t, y.id, d.id),
        isPlaceholder: w,
        placeholderId: w ? String(rh(u, y)) : void 0,
        depth: t,
        index: u.length
      });
      D.subHeaders.push(d), u.push(D);
    }
    l.headers.push(d), d.headerGroup = l;
  }
  for (let c = 0; c < i.length; c++) i[c](l);
  o.push(l), t > 0 && $u(u, t - 1, n, r, o, i);
}
function Wu(e) {
  for (let t = 0; t < e.length; t++) {
    const n = e[t];
    if (!ee(n.column, "getIsVisible", Ye)) continue;
    let r = 0;
    if (n.subHeaders.length) {
      Wu(n.subHeaders);
      for (let o = 0; o < n.subHeaders.length; o++) {
        const i = n.subHeaders[o];
        ee(i.column, "getIsVisible", Ye) && (r += i.colSpan);
      }
    } else r = 1;
    if (n.colSpan = r, n.isPlaceholder && n.subHeaders.length === 1 && n.subHeaders[0].column === n.column) {
      let o = 1, i = n.subHeaders[0];
      for (; i; )
        i.rowSpan = 0, o++, i = i.subHeaders.length === 1 && i.subHeaders[0].column === n.column ? i.subHeaders[0] : void 0;
      n.rowSpan = o;
    } else n.rowSpan = 1;
  }
}
function Rr(e, t, n, r) {
  var c;
  const o = Nu(e), i = [], l = n._headerGroupInstanceInitFns, u = new Array(t.length);
  for (let d = 0; d < t.length; d++)
    d in t && (u[d] = Bu(n, t[d], {
      depth: o,
      index: d
    }));
  return $u(u, o - 1, n, r, i, l), i.reverse(), Wu(((c = i[0]) == null ? void 0 : c.headers) ?? []), i;
}
function oh(e) {
  var t, n;
  if (!e._columnPrototype) {
    e._columnPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignColumnPrototype) == null || n.call(t, e._columnPrototype, e);
  }
  return e._columnPrototype;
}
function ih(e, t, n, r) {
  const o = {
    ...e.getDefaultColumnDef(),
    ...t
  }, i = o.accessorKey, l = i === void 0 ? void 0 : String(i), u = o.id ?? (l == null ? void 0 : l.replaceAll(".", "_")) ?? (typeof o.header == "string" ? o.header : void 0);
  let c;
  if (o.accessorFn) c = o.accessorFn;
  else if (i !== void 0) if (typeof i == "string" && i.includes(".")) {
    const y = i.split(".");
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
  const d = oh(e), g = Object.create(d);
  g.accessorFn = c, g.columnDef = o, g.columns = [], g.depth = n, g.id = `${String(u)}`, g.parent = r;
  const h = e._columnInstanceInitFns;
  for (let y = 0; y < h.length; y++) h[y](g);
  return g;
}
function Uu(e) {
  var n;
  const t = (n = e.atoms.columnOrder) == null ? void 0 : n.get();
  return (r) => {
    let o = [];
    if (!(t != null && t.length)) o = r;
    else {
      const i = /* @__PURE__ */ new Map();
      for (let l = 0; l < r.length; l++) {
        const u = r[l];
        i.set(u.id, u);
      }
      for (let l = 0; l < t.length; l++) {
        const u = t[l], c = i.get(u);
        c && (o.push(c), i.delete(u));
      }
      for (let l = 0; l < r.length; l++) {
        const u = r[l];
        i.has(u.id) && o.push(u);
      }
    }
    return sh(e, o);
  };
}
function sh(e, t) {
  var u;
  const n = ((u = e.atoms.grouping) == null ? void 0 : u.get()) ?? [], { groupedColumnMode: r } = e.options;
  if (!n.length || !r) return t;
  const o = t.filter((c) => !n.includes(c.id));
  if (r === "remove") return o;
  const i = /* @__PURE__ */ new Map();
  for (let c = 0; c < t.length; c++) {
    const d = t[c];
    i.set(d.id, d);
  }
  const l = [];
  for (let c = 0; c < n.length; c++) {
    const d = i.get(n[c]);
    d && l.push(d);
  }
  return [...l, ...o];
}
function lh(e) {
  return [e, ...e.columns.flatMap((t) => t.getFlatColumns())];
}
function ah(e) {
  if (e.columns.length) {
    const t = e.columns.flatMap((n) => n.getLeafColumns());
    return ee(e.table, "getOrderColumns", Uu)(t);
  }
  return [e];
}
function uh(e) {
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
function qu(e, t, n, r = 0) {
  const o = new Array(t.length);
  for (let i = 0; i < t.length; i++) {
    if (!(i in t)) continue;
    const l = t[i], u = ih(e, l, r, n), c = l;
    u.columns = c.columns ? qu(e, c.columns, u, r + 1) : [], o[i] = u;
  }
  return o;
}
function ch(e) {
  return qu(e, e.options.columns);
}
function fh(e) {
  return e.getAllColumns().flatMap((t) => t.getFlatColumns());
}
function dh(e) {
  const t = ie(), n = e.getAllFlatColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function gh(e) {
  const t = e.getAllColumns().flatMap((n) => n.getLeafColumns());
  return ee(e, "getOrderColumns", Uu)(t);
}
function ph(e) {
  const t = ie(), n = e.getAllLeafColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function hh(e, t) {
  return e.getAllFlatColumnsById()[t];
}
const vh = {
  assignColumnPrototype: (e, t) => {
    it("coreColumnsFeature", e, t, {
      column_getFlatColumns: {
        fn: (n) => lh(n),
        memoDeps: (n) => [n.table.options.columns]
      },
      column_getLeafColumns: {
        fn: (n) => ah(n),
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
        fn: () => uh(e),
        memoDeps: () => [e.options.defaultColumn]
      },
      table_getAllColumns: {
        fn: () => ch(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumns: {
        fn: () => fh(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumnsById: {
        fn: () => dh(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllLeafColumns: {
        fn: () => gh(e),
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
        fn: () => ph(e),
        memoDeps: () => [e.getAllLeafColumns()]
      },
      table_getColumn: { fn: (t) => hh(e, t) }
    });
  }
};
function Gu(e, t) {
  for (let n = 0; n < e.subHeaders.length; n++) Gu(e.subHeaders[n], t);
  t.push(e);
}
function mh(e) {
  const t = [];
  return Gu(e, t), t;
}
function yh(e) {
  return {
    column: e.column,
    header: e,
    table: e.column.table
  };
}
function wh(e) {
  var d;
  const { start: t, end: n } = ((d = e.atoms.columnPinning) == null ? void 0 : d.get()) ?? fn(), r = e.getAllColumns(), o = ee(e, "getVisibleLeafColumns", Es);
  if (!t.length && !n.length) return Rr(r, o, e);
  const i = e.getAllLeafColumnsById(), l = [];
  for (let g = 0; g < t.length; g++) {
    const h = i[t[g]];
    h && ee(h, "getIsVisible", Ye) && l.push(h);
  }
  const u = [];
  for (let g = 0; g < n.length; g++) {
    const h = i[n[g]];
    h && ee(h, "getIsVisible", Ye) && u.push(h);
  }
  const c = o.filter((g) => !t.includes(g.id) && !n.includes(g.id));
  return Rr(r, [
    ...l,
    ...c,
    ...u
  ], e);
}
function bh(e) {
  return [...e.getHeaderGroups()].reverse();
}
function _h(e) {
  const t = e.getHeaderGroups(), n = [];
  for (let r = 0; r < t.length; r++) {
    const o = t[r].headers;
    for (let i = 0; i < o.length; i++) n.push(o[i]);
  }
  return n;
}
function Sh(e) {
  var r;
  const t = ((r = e.getHeaderGroups()[0]) == null ? void 0 : r.headers) ?? [], n = [];
  for (let o = 0; o < t.length; o++) {
    const i = t[o].getLeafHeaders();
    for (let l = 0; l < i.length; l++) n.push(i[l]);
  }
  return n;
}
const xh = {
  assignHeaderPrototype: (e, t) => {
    it("coreHeadersFeature", e, t, {
      header_getLeafHeaders: {
        fn: (n) => mh(n),
        memoDeps: (n) => [n.column.table.options.columns]
      },
      header_getContext: {
        fn: (n) => yh(n),
        memoDeps: (n) => [n.column.table.options.columns]
      }
    });
  },
  constructTableAPIs: (e) => {
    mt("coreHeadersFeature", e, {
      table_getHeaderGroups: {
        fn: () => wh(e),
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
        fn: () => bh(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getFlatHeaders: {
        fn: () => _h(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getLeafHeaders: {
        fn: () => Sh(e),
        memoDeps: () => [e.getHeaderGroups()]
      }
    });
  }
};
function Rh(e) {
  var t, n;
  if (!e._rowPrototype) {
    e._rowPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignRowPrototype) == null || n.call(t, e._rowPrototype, e);
  }
  return e._rowPrototype;
}
const Ch = (e, t, n, r, o, i, l) => {
  const u = Rh(e), c = Object.create(u);
  c._displayIndexCache = -1, c._uniqueValuesCache = ie(), c._valuesCache = ie(), c.depth = o, c.id = t, c.index = r, c.original = n, c.parentId = l, c.subRows = [];
  const d = e._rowInstanceInitFns;
  for (let g = 0; g < d.length; g++) d[g](c);
  return c;
}, Mh = /([0-9]+)/gm;
function Fn(e) {
  const t = Object.assign((n, r, o) => {
    let i = n.getValue(o), l = r.getValue(o);
    const u = t.resolveDataValue;
    return u && (i = u(i), l = u(l)), t.sort(i, l, n, r, o);
  }, e);
  return t;
}
const Eh = Fn({
  resolveDataValue: (e) => Bo(e).toLowerCase(),
  sort: (e, t) => Yu(e, t)
});
Fn({
  resolveDataValue: (e) => Bo(e),
  sort: (e, t) => Yu(e, t)
});
const Ih = Fn({
  resolveDataValue: (e) => Bo(e).toLowerCase(),
  sort: (e, t) => Is(e, t)
});
Fn({
  resolveDataValue: (e) => Bo(e),
  sort: (e, t) => Is(e, t)
});
Fn({
  resolveDataValue: (e) => Ah(e),
  sort: (e, t) => e > t ? 1 : e < t ? -1 : 0
});
const Xu = Fn({ sort: (e, t) => Is(e, t) });
function Is(e, t) {
  return e === t ? 0 : e > t ? 1 : -1;
}
function Ah(e) {
  return e instanceof Date ? e.getTime() : e;
}
function Bo(e) {
  return typeof e == "number" ? isNaN(e) || e === 1 / 0 || e === -1 / 0 ? "" : String(e) : typeof e == "string" ? e : "";
}
function Yu(e, t) {
  let n = 0, r = 0;
  const o = e.length, i = t.length;
  for (; n < o && r < i; ) {
    const l = So(e.charCodeAt(n)), u = So(t.charCodeAt(r)), c = ts(e, n, l), d = ts(t, r, u);
    if (!l && !u) {
      const h = Dh(e, n, c, t, r, d);
      if (h) return h;
      n = c, r = d;
      continue;
    }
    if (l !== u) return l ? 1 : -1;
    const g = Oh(e, n, c, t, r, d);
    if (g) return g;
    n = c, r = d;
  }
  return na(e, n) - na(t, r);
}
function So(e) {
  return e >= 48 && e <= 57;
}
function ts(e, t, n) {
  let r = t + 1;
  for (; r < e.length && So(e.charCodeAt(r)) === n; ) r++;
  return r;
}
function Dh(e, t, n, r, o, i) {
  const l = n - t, u = i - o, c = l < u ? l : u;
  for (let d = 0; d < c; d++) {
    const g = e.charCodeAt(t + d), h = r.charCodeAt(o + d);
    if (g > h) return 1;
    if (h > g) return -1;
  }
  return l > u ? 1 : u > l ? -1 : 0;
}
function Oh(e, t, n, r, o, i) {
  let l = t;
  for (; l < n && e.charCodeAt(l) === 48; ) l++;
  let u = o;
  for (; u < i && r.charCodeAt(u) === 48; ) u++;
  const c = n - l, d = i - u;
  if (c === 0 && d === 0) return 0;
  if (c <= 15 && d <= 15) {
    const y = ta(e, l, n), w = ta(r, u, i);
    return y > w ? 1 : w > y ? -1 : 0;
  }
  const g = parseInt(e.slice(t, n), 10), h = parseInt(r.slice(o, i), 10);
  return g > h ? 1 : h > g ? -1 : 0;
}
function ta(e, t, n) {
  let r = 0;
  for (let o = t; o < n; o++) r = r * 10 + e.charCodeAt(o) - 48;
  return r;
}
function na(e, t) {
  let n = 0, r = t;
  for (; r < e.length; )
    n++, r = ts(e, r, So(e.charCodeAt(r)));
  return n;
}
function kh() {
  return [];
}
function Ph(e, t) {
  Vo(e, "cellSelection", vt(e.initialState.cellSelection) ?? kh());
}
function Th(e) {
  e.atoms.cellSelection && (e.options.autoResetAll ?? e.options.autoResetCellSelection ?? !0) && e._reactivity.schedule(() => Ph(e));
}
function Fh() {
  return ie();
}
function Zu(e) {
  e.atoms.expanded && (e.options.autoResetAll ?? e.options.autoResetExpanded ?? !e.options.manualExpanding) && e._reactivity.schedule(() => Qu(e));
}
function xo(e, t) {
  var n, r;
  (r = (n = e.options).onExpandedChange) == null || r.call(n, t);
}
function Ju(e, t) {
  var r;
  const n = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t ?? !tc(e)) {
    if (n === !0 || !ec(e)) return;
    xo(e, !0);
  } else {
    if (n !== !0 && !Object.keys(n).length) return;
    xo(e, ie());
  }
}
function Qu(e, t) {
  const n = e.initialState.expanded;
  Vo(e, "expanded", t ? ie() : n === !0 ? !0 : Object.assign(ie(), vt(n ?? {})));
}
function ec(e) {
  return e.getPrePaginatedRowModel().flatRows.some((t) => an(t));
}
function Hh(e) {
  return (t) => {
    Ju(e);
  };
}
function Lh(e) {
  var n;
  const t = ((n = e.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return t === !0 || Object.values(t).some(Boolean);
}
function tc(e) {
  var r;
  const t = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t === !0) return !0;
  if (!Object.keys(t).length) return !1;
  const n = e.getRowModel().flatRows.filter((o) => an(o));
  return !(!n.length || n.some((o) => !No(o)));
}
function jh(e) {
  var r;
  let t = 0;
  const n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return (n === !0 ? Object.values(e.getRowModel().rowsById).filter((o) => an(o)).map((o) => o.id) : Object.keys(n ?? {})).forEach((o) => {
    const i = o.split(".");
    t = Math.max(t, i.length);
  }), t;
}
function nc(e, t) {
  var i;
  const n = ((i = e.table.atoms.expanded) == null ? void 0 : i.get()) ?? {}, r = n === !0 || ns(n, e.id), o = t ?? !r;
  o !== r && (o && !an(e) || xo(e.table, (l) => {
    const u = l === !0 ? !0 : ns(l, e.id);
    let c = ie();
    if (l === !0 ? Object.values(e.table.getRowModel().rowsById).forEach((d) => {
      an(d) && (c[d.id] = !0);
    }) : c = Object.assign(ie(), l), !u && o)
      return c[e.id] = !0, c;
    if (u && !o) {
      const d = ie(), g = Object.keys(c);
      for (let h = 0; h < g.length; h++) {
        const y = g[h];
        y !== e.id && c[y] && (d[y] = !0);
      }
      return d;
    }
    return l;
  }));
}
function No(e) {
  var n, r, o;
  const t = ((n = e.table.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return !!(((o = (r = e.table.options).getIsRowExpanded) == null ? void 0 : o.call(r, e)) ?? (t === !0 || ns(t, e.id)));
}
function ns(e, t) {
  return !!(e && e !== !0 && cn(e, t) && e[t]);
}
function an(e) {
  var t, n;
  return ((n = (t = e.table.options).getRowCanExpand) == null ? void 0 : n.call(t, e)) ?? ((e.table.options.enableExpanding ?? !0) && !!e.subRows.length);
}
function zh(e) {
  let t = !0, n = e;
  for (; t && n.parentId; )
    n = e.table.getRow(n.parentId, !0), t = No(n);
  return t;
}
function Kh(e) {
  const t = an(e);
  return () => {
    t && nc(e);
  };
}
const rs = 0;
function rc(e) {
  var t, n;
  if (e.options.autoResetAll ?? e.options.autoResetPageIndex ?? !e.options.manualPagination) {
    if ((((n = (t = e.atoms.pagination) == null ? void 0 : t.get()) == null ? void 0 : n.pageIndex) ?? rs) === rs) return;
    Nh(e);
  }
}
function Vh(e, t) {
  Vo(e, "pagination", t);
}
function Bh(e, t) {
  Vh(e, (n) => {
    let r = Ko(t, n.pageIndex);
    const o = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
    return r = Math.max(0, Math.min(r, o)), {
      ...n,
      pageIndex: r
    };
  });
}
function Nh(e, t) {
  Bh(e, rs);
}
function $h() {
  return [];
}
function $o(e, t) {
  Vo(e, "sorting", t);
}
function oc(e, t) {
  $o(e, t ? [] : vt(e.initialState.sorting ?? []));
}
function Wh(e) {
  e.atoms.sorting && (e.options.autoResetAll ?? e.options.autoResetSorting ?? !1) && oc(e);
}
function ic(e) {
  const t = e.table._rowModelFns.sortFns, n = e.table.getFilteredRowModel().flatRows.slice(0, 10);
  let r, o = !1;
  for (let i = 0; i < n.length; i++) {
    const l = n[i].getValue(e.id);
    if (Object.prototype.toString.call(l) === "[object Date]") {
      r = "datetime";
      break;
    }
    if (typeof l == "string" && (o = !0, l.split(Mh).length > 1)) {
      r = "alphanumeric";
      break;
    }
  }
  if (!r && o && (r = "text"), r) {
    let i = t == null ? void 0 : t[r];
    if (i || r === "alphanumeric" && (i = t == null ? void 0 : t.text), i) return i;
  }
  return Xu;
}
function sc(e) {
  const t = e.table.getFilteredRowModel().flatRows.slice(0, 10);
  for (let n = 0; n < t.length; n++) {
    const r = t[n].getValue(e.id);
    if (r != null)
      return typeof r == "string" ? "asc" : "desc";
  }
  return "desc";
}
function lc(e) {
  const t = e.table._rowModelFns.sortFns;
  return jp(e.columnDef.sortFn) ? e.columnDef.sortFn : e.columnDef.sortFn === "auto" ? ic(e) : (t == null ? void 0 : t[e.columnDef.sortFn]) ?? Xu;
}
function ac(e, t, n) {
  const r = cc(e, n && Ro(e)), o = typeof t < "u";
  $o(e.table, (i) => {
    const l = i.findIndex((y) => y.id === e.id), u = l === -1 ? void 0 : i[l];
    let c = [], d;
    const g = o ? t : r === "desc", h = !!(i.length && Ro(e) && n);
    return h ? u ? d = "toggle" : d = "add" : u ? d = "toggle" : d = "replace", d === "toggle" && (o || r || (d = "remove")), d === "add" ? (c = [...i, {
      id: e.id,
      desc: g
    }], c.splice(0, c.length - (e.table.options.maxMultiSortColCount ?? Number.MAX_SAFE_INTEGER))) : d === "toggle" ? c = h ? i.map((y) => y.id === e.id ? {
      ...y,
      desc: g
    } : y) : [{
      id: e.id,
      desc: g
    }] : d === "remove" ? c = h ? i.filter((y) => y.id !== e.id) : [] : c = [{
      id: e.id,
      desc: g
    }], c;
  });
}
function uc(e) {
  return e.columnDef.sortDescFirst ?? e.table.options.sortDescFirst ?? sc(e) === "desc" ? "desc" : "asc";
}
function cc(e, t) {
  const n = uc(e), r = fc(e);
  return r ? r !== n && (e.table.options.enableSortingRemoval ?? !0) && (!t || (e.table.options.enableMultiRemove ?? !0)) ? !1 : r === "desc" ? "asc" : "desc" : n;
}
function As(e) {
  return (e.columnDef.enableSorting ?? !0) && (e.table.options.enableSorting ?? !0) && !!e.accessorFn;
}
function Ro(e) {
  return e.columnDef.enableMultiSort ?? e.table.options.enableMultiSort ?? !!e.accessorFn;
}
function fc(e) {
  var n, r;
  const t = (r = (n = e.table.atoms.sorting) == null ? void 0 : n.get()) == null ? void 0 : r.find((o) => o.id === e.id);
  return t ? t.desc ? "desc" : "asc" : !1;
}
function Uh(e) {
  var t, n;
  return ((n = (t = e.table.atoms.sorting) == null ? void 0 : t.get()) == null ? void 0 : n.findIndex((r) => r.id === e.id)) ?? -1;
}
function qh(e) {
  $o(e.table, (t) => t.length ? t.filter((n) => n.id !== e.id) : []);
}
function Gh(e) {
  const t = As(e);
  return (n) => {
    var r, o;
    t && ac(e, void 0, Ro(e) ? (o = (r = e.table.options).isMultiSortEvent) == null ? void 0 : o.call(r, n) : !1);
  };
}
function dc() {
  return (e) => Or({
    feature: "coreRowModelsFeature",
    table: e,
    fnName: "table.getCoreRowModel",
    memoDeps: () => [e.options.data],
    fn: () => Xh(e, e.options.data),
    onAfterUpdate: Ku(() => {
      Zu(e), rc(e), Wh(e), Th(e);
    })
  });
}
function gc(e, t, n, r = 0, o) {
  var l;
  const i = [];
  for (let u = 0; u < n.length; u++) {
    const c = n[u], d = Ch(e, e.getRowId(c, u, o), c, u, r, void 0, o == null ? void 0 : o.id);
    t.flatRows.push(d), t.rowsById[d.id] = d, i.push(d), e.options.getSubRows && (d.originalSubRows = e.options.getSubRows(c, u), (l = d.originalSubRows) != null && l.length && (d.subRows = gc(e, t, d.originalSubRows, r + 1, d)));
  }
  return i;
}
function Xh(e, t) {
  const n = {
    rows: [],
    flatRows: [],
    rowsById: ie()
  };
  return n.rows = gc(e, n, t), n;
}
function Yh(e) {
  var t, n;
  return e._rowModels.coreRowModel || (e._rowModels.coreRowModel = ((n = (t = e.options.features).coreRowModel) == null ? void 0 : n.call(t, e)) ?? dc()(e)), e._rowModels.coreRowModel();
}
function Zh(e) {
  return e.getCoreRowModel();
}
function Jh(e) {
  var t, n;
  return e._rowModels.filteredRowModel || (e._rowModels.filteredRowModel = (n = (t = e.options.features).filteredRowModel) == null ? void 0 : n.call(t, e)), e.options.manualFiltering || !e._rowModels.filteredRowModel ? e.getPreFilteredRowModel() : e._rowModels.filteredRowModel();
}
function Qh(e) {
  return e.getFilteredRowModel();
}
function ev(e) {
  var t, n;
  return e._rowModels.groupedRowModel || (e._rowModels.groupedRowModel = (n = (t = e.options.features).groupedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualGrouping || !e._rowModels.groupedRowModel ? e.getPreGroupedRowModel() : e._rowModels.groupedRowModel();
}
function tv(e) {
  return e.getGroupedRowModel();
}
function nv(e) {
  var t, n;
  return e._rowModels.sortedRowModel || (e._rowModels.sortedRowModel = (n = (t = e.options.features).sortedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualSorting || !e._rowModels.sortedRowModel ? e.getPreSortedRowModel() : e._rowModels.sortedRowModel();
}
function rv(e) {
  return e.getSortedRowModel();
}
function ov(e) {
  var t, n;
  return e._rowModels.expandedRowModel || (e._rowModels.expandedRowModel = (n = (t = e.options.features).expandedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualExpanding || !e._rowModels.expandedRowModel ? e.getPreExpandedRowModel() : e._rowModels.expandedRowModel();
}
function iv(e) {
  return e.getExpandedRowModel();
}
function sv(e) {
  var t, n;
  return e._rowModels.paginatedRowModel || (e._rowModels.paginatedRowModel = (n = (t = e.options.features).paginatedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualPagination || !e._rowModels.paginatedRowModel ? e.getPrePaginatedRowModel() : e._rowModels.paginatedRowModel();
}
function lv(e) {
  return e.getPaginatedRowModel();
}
const av = { constructTableAPIs: (e) => {
  mt("coreRowModelsFeature", e, {
    table_getCoreRowModel: { fn: () => Yh(e) },
    table_getPreFilteredRowModel: { fn: () => Zh(e) },
    table_getFilteredRowModel: { fn: () => Jh(e) },
    table_getPreGroupedRowModel: { fn: () => Qh(e) },
    table_getGroupedRowModel: { fn: () => ev(e) },
    table_getPreSortedRowModel: { fn: () => tv(e) },
    table_getSortedRowModel: { fn: () => nv(e) },
    table_getPreExpandedRowModel: { fn: () => rv(e) },
    table_getExpandedRowModel: { fn: () => ov(e) },
    table_getPrePaginatedRowModel: { fn: () => iv(e) },
    table_getPaginatedRowModel: { fn: () => sv(e) },
    table_getRowModel: { fn: () => lv(e) }
  });
} };
function uv(e) {
  var t, n;
  if (!e._cellPrototype) {
    e._cellPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignCellPrototype) == null || n.call(t, e._cellPrototype, e);
  }
  return e._cellPrototype;
}
function cv(e, t, n) {
  const r = uv(n), o = Object.create(r);
  o.column = e, o.id = `${t.id}_${e.id}`, o.row = t;
  const i = n._cellInstanceInitFns;
  for (let l = 0; l < i.length; l++) i[l](o);
  return o;
}
function fv(e) {
  const t = e.table.getRowsInDisplayOrder(), n = e._displayIndexCache;
  return t[n] === e ? n : -1;
}
function dv(e) {
  const t = e.getPrePaginatedRowModel().rows;
  if (e.options.paginateExpandedRows === !1) {
    const n = [], r = (o) => {
      var i;
      o._displayIndexCache = n.length, n.push(o), o.subRows.length && ((i = o.getIsExpanded) != null && i.call(o)) && o.subRows.forEach(r);
    };
    return t.forEach(r), n;
  }
  for (let n = 0; n < t.length; n++) t[n]._displayIndexCache = n;
  return t;
}
function gv(e, t) {
  if (cn(e._valuesCache, t)) return e._valuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return e._valuesCache[t] = n.accessorFn(e.original, e.index), e._valuesCache[t];
}
function pv(e, t) {
  if (cn(e._uniqueValuesCache, t)) return e._uniqueValuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return n.columnDef.getUniqueValues ? (e._uniqueValuesCache[t] = n.columnDef.getUniqueValues(e.original, e.index), e._uniqueValuesCache[t]) : (e._uniqueValuesCache[t] = [e.getValue(t)], e._uniqueValuesCache[t]);
}
function hv(e, t) {
  return e.getValue(t) ?? e.table.options.renderFallbackValue;
}
function vv(e) {
  return zp(e.subRows, (t) => t.subRows);
}
function mv(e) {
  const t = e.getCoreRowModel().flatRows;
  let n = 0;
  for (let r = 0; r < t.length; r++) n = Math.max(n, t[r].depth);
  return n;
}
function yv(e) {
  if (e.parentId)
    return e.table.getCoreRowModel().rowsById[e.parentId] ?? e.table.getRow(e.parentId, !0);
}
function wv(e) {
  const t = [];
  let n = e;
  for (; ; ) {
    const r = n.getParentRow();
    if (!r) break;
    t.push(r), n = r;
  }
  return t.reverse();
}
function bv(e) {
  const t = e.table.getAllLeafColumns();
  let n = e._cellsCache;
  n || (n = e._cellsCache = /* @__PURE__ */ new WeakMap());
  const r = new Array(t.length);
  for (let o = 0; o < t.length; o++) {
    const i = t[o];
    let l = n.get(i);
    l || (l = cv(i, e, e.table), n.set(i, l)), r[o] = l;
  }
  return r;
}
function _v(e) {
  const t = ie(), n = e.getAllCells();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.column.id] = o;
  }
  return t;
}
function Sv(e, t, n, r) {
  var o, i;
  return ((i = (o = t.options).getRowId) == null ? void 0 : i.call(o, e, n, r)) ?? (r ? `${r.id}.${n}` : String(n));
}
function xv(e, t, n) {
  let r = (n ? e.getPrePaginatedRowModel() : e.getRowModel()).rowsById[t];
  if (!r && (r = e.getCoreRowModel().rowsById[t], !r))
    throw new Error();
  return r;
}
const Rv = {
  assignRowPrototype: (e, t) => {
    it("coreRowsFeature", e, t, {
      row_getDisplayIndex: { fn: (n) => fv(n) },
      row_getAllCellsByColumnId: {
        fn: (n) => _v(n),
        memoDeps: (n) => [n.getAllCells()]
      },
      row_getAllCells: {
        fn: (n) => bv(n),
        memoDeps: (n) => [n.table.getAllLeafColumns()]
      },
      row_getLeafRows: {
        fn: (n) => vv(n),
        memoDeps: (n) => [n.subRows]
      },
      row_getParentRow: { fn: (n) => yv(n) },
      row_getParentRows: { fn: (n) => wv(n) },
      row_getUniqueValues: { fn: (n, r) => pv(n, r) },
      row_getValue: { fn: (n, r) => gv(n, r) },
      row_renderValue: { fn: (n, r) => hv(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    mt("coreRowsFeature", e, {
      table_getRowsInDisplayOrder: {
        fn: () => dv(e),
        memoDeps: () => {
          var t;
          return [
            e.getPrePaginatedRowModel().rows,
            e.options.paginateExpandedRows,
            e.options.paginateExpandedRows === !1 ? (t = e.atoms.expanded) == null ? void 0 : t.get() : void 0
          ];
        }
      },
      table_getRowId: { fn: (t, n, r) => Sv(t, e, n, r) },
      table_getRow: { fn: (t, n) => xv(e, t, n) },
      table_getMaxSubRowDepth: {
        fn: () => mv(e),
        memoDeps: () => [e.getCoreRowModel()]
      }
    });
  }
};
function pc(e, t, n = (r, o) => r === o) {
  const r = t === void 0 ? e.options.state : t;
  e._reactivity.batch(() => {
    if (r) for (const o in r) {
      const i = e.baseAtoms[o];
      if (!i) continue;
      const l = r[o], u = l === void 0 ? e.initialState[o] : l;
      n(e._reactivity.untrack(() => i.get()), u) || i.set(() => u);
    }
  });
}
function Cv(e, t, n = (r, o) => r === o) {
  e._reactivity.batch(() => {
    var r, o;
    pc(e, t, n), (o = (r = e._reactivity).commit) == null || o.call(r);
  });
}
function Mv(e) {
  var r, o;
  const t = vt(e.initialState);
  e._reactivity.batch(() => {
    const i = Object.keys(t);
    for (let l = 0; l < i.length; l++) {
      const u = i[l];
      e.baseAtoms[u].set(t[u]);
    }
  });
  const n = Object.values(e._features);
  for (let i = 0; i < n.length; i++) (o = (r = n[i]).resetTableInstanceData) == null || o.call(r, e);
}
function Ev(e, t) {
  const { features: n, atoms: r, initialState: o } = e.options;
  if (!e.options.mergeOptions) return {
    ...e.options,
    ...t,
    features: n,
    atoms: r,
    initialState: o
  };
  const i = e.options.mergeOptions(e.options, t), l = { ...Object.getOwnPropertyDescriptors(i) };
  return Object.defineProperties(Object.create(Object.getPrototypeOf(i)), {
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
function Iv(e, t, n) {
  const r = Ev(e, Ko(t, e.options));
  e.optionsStore ? e.optionsStore.set(() => r) : e.options = r, Cv(e, r.state ?? null);
}
const Av = { constructTableAPIs: (e) => {
  mt("coreTablesFeature", e, {
    table_reset: { fn: () => Mv(e) },
    table_setOptions: { fn: (t) => Iv(e, t) }
  });
} }, Dv = {
  coreCellsFeature: $p,
  coreColumnsFeature: vh,
  coreHeadersFeature: xh,
  coreRowModelsFeature: av,
  coreRowsFeature: Rv,
  coreTablesFeature: Av
};
function Ov(e) {
  const t = e;
  return Object.defineProperty(e, "state", { get() {
    return e.get();
  } }), "set" in e && (t.setState = e.set.bind(e)), t;
}
function kv(e, t) {
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
  const n = ra(e);
  if (n.length !== ra(t).length) return !1;
  for (let r = 0; r < n.length; r++) if (!Object.prototype.hasOwnProperty.call(t, n[r]) || !Object.is(e[n[r]], t[n[r]])) return !1;
  return !0;
}
function ra(e) {
  return Object.keys(e).concat(Object.getOwnPropertySymbols(e));
}
function Pv(e, t = {}) {
  return Object.values(e).forEach((n) => {
    var r;
    t = ((r = n.getInitialState) == null ? void 0 : r.call(n, t)) ?? t;
  }), vt(t);
}
function Tv(e) {
  var z, Y;
  const t = e.features.coreReactivityFeature, { aggregationFns: n, columnMeta: r, coreRowModel: o, expandedRowModel: i, facetedMinMaxValues: l, facetedRowModel: u, facetedUniqueValues: c, filterFns: d, filterMeta: g, filteredRowModel: h, groupedRowModel: y, paginatedRowModel: w, sortFns: D, sortedRowModel: R, tableMeta: A, ...K } = e.features, x = {
    _cellInstanceInitFns: [],
    _columnInstanceInitFns: [],
    _features: {
      ...Dv,
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
    ...j.reduce(($, L) => {
      var W;
      return Object.assign($, (W = L.getDefaultTableOptions) == null ? void 0 : W.call(L, x));
    }, {}),
    ...e
  };
  if (t.wrapExternalAtoms && _.atoms) for (const [$, L] of Object.entries(_.atoms)) {
    const W = L, se = t.createWritableAtom(W.get(), { debugName: `externalAtom/${$}` });
    _.atoms[$] = se;
    let ce = !1;
    const te = W.subscribe((xe) => {
      ce || se.set(xe);
    }), we = se.subscribe((xe) => {
      ce = !0, W.set(xe), ce = !1;
    });
    t.addSubscription(te), t.addSubscription(we);
  }
  t.createOptionsStore ? (x.optionsStore = t.createWritableAtom(_, { debugName: "table/optionsStore" }), Object.defineProperty(x, "options", {
    configurable: !0,
    enumerable: !0,
    get() {
      return x.optionsStore.get();
    },
    set($) {
      x.optionsStore.set(() => $);
    }
  })) : x.options = _, x.initialState = Pv(x._features, x.options.initialState);
  const k = Object.keys(x.initialState);
  for (let $ = 0; $ < k.length; $++) {
    const L = k[$];
    x.baseAtoms[L] = t.createWritableAtom(x.initialState[L], { debugName: `table/baseAtoms/${L}` }), x.atoms[L] = t.createReadonlyAtom(() => {
      var we;
      const W = x.options, se = (we = W.atoms) == null ? void 0 : we[L], ce = se ? se.get() : x.baseAtoms[L].get();
      if (se) return ce;
      const te = W.state;
      if (te && cn(te, L)) {
        const xe = te[L];
        return xe === void 0 ? x.initialState[L] : xe;
      }
      return ce;
    }, { debugName: `table/atoms/${L}` });
  }
  pc(x), x.store = Ov(t.createReadonlyAtom(() => {
    const $ = {};
    for (let L = 0; L < k.length; L++) {
      const W = k[L];
      $[W] = x.atoms[W].get();
    }
    return $;
  }, {
    compare: kv,
    debugName: "table/store"
  }));
  for (let $ = 0; $ < j.length; $++) {
    const L = j[$];
    (z = L.initTableInstanceData) == null || z.call(L, x), L.initCellInstanceData && x._cellInstanceInitFns.push(L.initCellInstanceData.bind(L)), L.initColumnInstanceData && x._columnInstanceInitFns.push(L.initColumnInstanceData.bind(L)), L.initHeaderGroupInstanceData && x._headerGroupInstanceInitFns.push(L.initHeaderGroupInstanceData.bind(L)), L.initHeaderInstanceData && x._headerInstanceInitFns.push(L.initHeaderInstanceData.bind(L)), L.initRowInstanceData && x._rowInstanceInitFns.push(L.initRowInstanceData.bind(L)), (Y = L.constructTableAPIs) == null || Y.call(L, x);
  }
  return x;
}
function Fv() {
  return ie();
}
function hc() {
  return {
    size: 150,
    minSize: 20,
    maxSize: Number.MAX_SAFE_INTEGER
  };
}
function Wo(e) {
  var o;
  const t = hc(), n = (o = e.table.atoms.columnSizing) == null ? void 0 : o.get(), r = n && cn(n, e.id) ? n[e.id] : void 0;
  return Math.min(Math.max(e.columnDef.minSize ?? t.minSize, r ?? e.columnDef.size ?? t.size), e.columnDef.maxSize ?? t.maxSize);
}
function io(e) {
  const t = ie(), n = ie(), r = new Array(e.length);
  let o = 0;
  for (let l = 0; l < e.length; l++) {
    const u = e[l], c = ee(u, "getSize", Wo);
    r[l] = c, t[u.id] = o, o += c;
  }
  let i = 0;
  for (let l = e.length - 1; l >= 0; l--)
    n[e[l].id] = i, i += r[l];
  return {
    starts: t,
    afters: n
  };
}
function Ds(e) {
  return {
    all: io(oo(e)),
    center: io(oo(e, "center")),
    start: io(oo(e, "start")),
    end: io(oo(e, "end"))
  };
}
function vc(e) {
  return e === "start" ? "start" : e === "end" ? "end" : e === "center" ? "center" : "all";
}
function Hv(e, t) {
  return ee(e.table, "getColumnOffsets", Ds)[vc(t)].starts[e.id] ?? 0;
}
function Lv(e, t) {
  return ee(e.table, "getColumnOffsets", Ds)[vc(t)].afters[e.id] ?? 0;
}
function jv(e) {
  Uo(e.table, (t) => {
    const n = ie(), r = Object.keys(t);
    for (let o = 0; o < r.length; o++) {
      const i = r[o];
      i !== e.id && (n[i] = t[i]);
    }
    return n;
  });
}
function mc(e) {
  if (!e.subHeaders.length) return Wo(e.column);
  let t = 0;
  for (let n = 0; n < e.subHeaders.length; n++) t += mc(e.subHeaders[n]);
  return t;
}
function dn(e) {
  return mc(e);
}
function yc(e) {
  var t;
  if (e.index > 0) {
    const n = (t = e.headerGroup) == null ? void 0 : t.headers[e.index - 1];
    if (n) return ee(n, "getStart", yc) + ee(n, "getSize", dn);
  }
  return 0;
}
function Uo(e, t) {
  var n, r;
  (r = (n = e.options).onColumnSizingChange) == null || r.call(n, t);
}
function zv(e, t) {
  Uo(e, t ? ie() : Object.assign(ie(), vt(e.initialState.columnSizing ?? {})));
}
function Kv(e) {
  var t;
  return ((t = e.getHeaderGroups()[0]) == null ? void 0 : t.headers.reduce((n, r) => n + dn(r), 0)) ?? 0;
}
function Vv(e) {
  var t;
  return ((t = ee(e, "getStartHeaderGroups", Up)[0]) == null ? void 0 : t.headers.reduce((n, r) => n + dn(r), 0)) ?? 0;
}
function Bv(e) {
  var t;
  return ((t = ee(e, "getCenterHeaderGroups", Gp)[0]) == null ? void 0 : t.headers.reduce((n, r) => n + dn(r), 0)) ?? 0;
}
function Nv(e) {
  var t;
  return ((t = ee(e, "getEndHeaderGroups", qp)[0]) == null ? void 0 : t.headers.reduce((n, r) => n + dn(r), 0)) ?? 0;
}
function os() {
  return {
    startOffset: null,
    startSize: null,
    deltaOffset: null,
    deltaPercentage: null,
    isResizingColumn: !1,
    columnSizingStart: []
  };
}
function wc(e) {
  return (e.columnDef.enableResizing ?? !0) && (e.table.options.enableColumnResizing ?? !0);
}
function $v(e) {
  var t, n;
  return ((n = (t = e.table.atoms.columnResizing) == null ? void 0 : t.get()) == null ? void 0 : n.isResizingColumn) === e.id;
}
function Wv(e, t) {
  const n = e.table.getColumn(e.column.id), r = wc(n);
  return (o) => {
    if (!r || Fi(o) && o.touches.length > 1)
      return;
    const i = dn(e), l = e.getLeafHeaders().map((k) => [k.column.id, Wo(k.column)]), u = Fi(o) ? Math.round(o.touches[0].clientX) : o.clientX, c = ie(), d = (k, z) => {
      if (typeof z != "number") return;
      const Y = n.table, $ = Y.options.columnResizeMode === "onChange" || k === "end";
      Y._reactivity.batch(() => {
        vr(Y, (L) => {
          const W = Y.options.columnResizeDirection === "rtl" ? -1 : 1, se = (z - (L.startOffset ?? 0)) * W, ce = L.startSize ?? 0, te = Math.max(ce > 0 ? se / ce : 0, -0.999999);
          if ($) {
            const we = L.columnSizingStart;
            for (let xe = 0; xe < we.length; xe++) {
              const fe = we[xe], oe = fe[1];
              c[fe[0]] = Math.round(Math.max(oe > 0 ? oe + oe * te : se / we.length, 0) * 100) / 100;
            }
          }
          return {
            ...L,
            deltaOffset: se,
            deltaPercentage: te
          };
        }), $ && Uo(Y, (L) => Object.assign(ie(), L, c));
      });
    };
    let g = null, h = !1, y;
    const w = () => {
      h ? (h = !1, d("move", y), g = requestAnimationFrame(w)) : g = null;
    }, D = (k) => {
      if (y = k, typeof requestAnimationFrame != "function") {
        d("move", k);
        return;
      }
      if (g !== null) {
        h = !0;
        return;
      }
      d("move", k), g = requestAnimationFrame(w);
    }, R = (k) => {
      g !== null && (cancelAnimationFrame(g), g = null, h = !1), n.table._reactivity.batch(() => {
        d("end", k ?? y), vr(n.table, (z) => ({
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
      moveHandler: (k) => D(k.clientX),
      upHandler: (k) => {
        A == null || A.removeEventListener("mousemove", K.moveHandler), A == null || A.removeEventListener("mouseup", K.upHandler), R(k.clientX);
      }
    }, x = {
      moveHandler: (k) => (k.cancelable && (k.preventDefault(), k.stopPropagation()), D(k.touches[0].clientX), !1),
      upHandler: (k) => {
        var z;
        j(), k.cancelable && (k.preventDefault(), k.stopPropagation()), R((z = k.touches[0]) == null ? void 0 : z.clientX);
      },
      cancelHandler: () => {
        j(), R();
      }
    }, j = () => {
      A == null || A.removeEventListener("touchmove", x.moveHandler), A == null || A.removeEventListener("touchend", x.upHandler), A == null || A.removeEventListener("touchcancel", x.cancelHandler);
    }, _ = qv() ? { passive: !1 } : !1;
    Fi(o) ? (A == null || A.addEventListener("touchmove", x.moveHandler, _), A == null || A.addEventListener("touchend", x.upHandler, _), A == null || A.addEventListener("touchcancel", x.cancelHandler, _)) : (A == null || A.addEventListener("mousemove", K.moveHandler, _), A == null || A.addEventListener("mouseup", K.upHandler, _)), vr(n.table, (k) => ({
      ...k,
      startOffset: u,
      startSize: i,
      deltaOffset: 0,
      deltaPercentage: 0,
      columnSizingStart: l,
      isResizingColumn: n.id
    }));
  };
}
function vr(e, t) {
  var n, r;
  (r = (n = e.options).onColumnResizingChange) == null || r.call(n, t);
}
function Uv(e, t) {
  vr(e, t ? os() : vt(e.initialState.columnResizing ?? os()));
}
let so = null;
function qv() {
  if (typeof so == "boolean") return so;
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
  return so = e, so;
}
function Fi(e) {
  return e.type === "touchstart";
}
const Gv = {
  getInitialState: (e) => ({
    columnResizing: os(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    columnResizeMode: "onEnd",
    columnResizeDirection: "ltr",
    onColumnResizingChange: Dr("columnResizing", e)
  }),
  assignColumnPrototype: (e, t) => {
    it("columnResizingFeature", e, t, {
      column_getCanResize: { fn: (n) => wc(n) },
      column_getIsResizing: { fn: (n) => $v(n) }
    });
  },
  assignHeaderPrototype: (e, t) => {
    it("columnResizingFeature", e, t, { header_getResizeHandler: { fn: (n, r) => Wv(n, r) } });
  },
  constructTableAPIs: (e) => {
    mt("columnResizingFeature", e, {
      table_setColumnResizing: { fn: (t) => vr(e, t) },
      table_resetHeaderSizeInfo: { fn: (t) => Uv(e, t) }
    });
  }
}, Xv = {
  getInitialState: (e) => ({
    columnSizing: Fv(),
    ...e
  }),
  getDefaultColumnDef: () => hc(),
  getDefaultTableOptions: (e) => ({ onColumnSizingChange: Dr("columnSizing", e) }),
  assignColumnPrototype: (e, t) => {
    it("columnSizingFeature", e, t, {
      column_getSize: {
        fn: (n) => Wo(n),
        memoDeps: (n) => {
          var r, o;
          return [t.options.columns, (o = (r = t.atoms.columnSizing) == null ? void 0 : r.get()) == null ? void 0 : o[n.id]];
        }
      },
      column_getStart: { fn: (n, r) => Hv(n, r) },
      column_getAfter: { fn: (n, r) => Lv(n, r) },
      column_resetSize: { fn: (n) => jv(n) }
    });
  },
  assignHeaderPrototype: (e, t) => {
    it("columnSizingFeature", e, t, {
      header_getSize: {
        fn: (n) => dn(n),
        memoDeps: (n) => {
          var r, o, i;
          return [t.options.columns, n.column.columns.length > 0 ? (r = t.atoms.columnSizing) == null ? void 0 : r.get() : (i = (o = t.atoms.columnSizing) == null ? void 0 : o.get()) == null ? void 0 : i[n.column.id]];
        }
      },
      header_getStart: {
        fn: (n) => yc(n),
        memoDeps: () => {
          var n, r, o, i, l;
          return [
            t.options.columns,
            (n = t.atoms.columnSizing) == null ? void 0 : n.get(),
            (r = t.atoms.columnOrder) == null ? void 0 : r.get(),
            (o = t.atoms.columnPinning) == null ? void 0 : o.get(),
            (i = t.atoms.columnVisibility) == null ? void 0 : i.get(),
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
        fn: () => Ds(e),
        memoDeps: () => {
          var t, n, r, o, i;
          return [
            e.options.columns,
            (t = e.atoms.columnSizing) == null ? void 0 : t.get(),
            (n = e.atoms.columnOrder) == null ? void 0 : n.get(),
            (r = e.atoms.columnPinning) == null ? void 0 : r.get(),
            (o = e.atoms.columnVisibility) == null ? void 0 : o.get(),
            (i = e.atoms.grouping) == null ? void 0 : i.get(),
            e.options.groupedColumnMode
          ];
        }
      },
      table_setColumnSizing: { fn: (t) => Uo(e, t) },
      table_resetColumnSizing: { fn: (t) => zv(e, t) },
      table_getTotalSize: {
        fn: () => Kv(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.columnSizing) == null ? void 0 : t.get(), e.getHeaderGroups()];
        }
      },
      table_getStartTotalSize: {
        fn: () => Vv(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.columnSizing) == null ? void 0 : t.get(), e.getHeaderGroups()];
        }
      },
      table_getCenterTotalSize: {
        fn: () => Bv(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.columnSizing) == null ? void 0 : t.get(), e.getHeaderGroups()];
        }
      },
      table_getEndTotalSize: {
        fn: () => Nv(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.columnSizing) == null ? void 0 : t.get(), e.getHeaderGroups()];
        }
      }
    });
  }
}, Yv = {
  getInitialState: (e) => ({
    expanded: Fh(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onExpandedChange: Dr("expanded", e),
    paginateExpandedRows: !0
  }),
  assignRowPrototype: (e, t) => {
    it("rowExpandingFeature", e, t, {
      row_toggleExpanded: { fn: (n, r) => nc(n, r) },
      row_getIsExpanded: { fn: (n) => No(n) },
      row_getCanExpand: { fn: (n) => an(n) },
      row_getIsAllParentsExpanded: { fn: (n) => zh(n) },
      row_getToggleExpandedHandler: { fn: (n) => Kh(n) }
    });
  },
  constructTableAPIs: (e) => {
    mt("rowExpandingFeature", e, {
      table_autoResetExpanded: { fn: () => Zu(e) },
      table_setExpanded: { fn: (t) => xo(e, t) },
      table_toggleAllRowsExpanded: { fn: (t) => Ju(e, t) },
      table_resetExpanded: { fn: (t) => Qu(e, t) },
      table_getCanSomeRowsExpand: { fn: () => ec(e) },
      table_getToggleAllRowsExpandedHandler: { fn: () => Hh(e) },
      table_getIsSomeRowsExpanded: { fn: () => Lh(e) },
      table_getIsAllRowsExpanded: { fn: () => tc(e) },
      table_getExpandedDepth: { fn: () => jh(e) }
    });
  }
};
function Zv() {
  return ie();
}
function Hn(e, t) {
  var n, r;
  (r = (n = e.options).onRowSelectionChange) == null || r.call(n, t);
}
function Jv(e, t) {
  e._lastSelectedRowId = null, Hn(e, t ? ie() : Object.assign(ie(), vt(e.initialState.rowSelection ?? {})));
}
function bc(e, t, n) {
  e._lastSelectedRowId = null, Hn(e, (r) => {
    if (t = typeof t < "u" ? t : !ee(e, "getIsAllRowsSelected", xc), n != null && n.deselectAll && !t) return ie();
    const o = Object.assign(ie(), r), i = e.getPreGroupedRowModel().flatRows;
    if (t) {
      const l = /* @__PURE__ */ new Map();
      i.forEach((u) => {
        Co(u, l) && (o[u.id] = !0);
      });
    } else i.forEach((l) => {
      kt(l) && delete o[l.id];
    });
    return o;
  });
}
function _c(e, t, n) {
  e._lastSelectedRowId = null, Hn(e, (r) => {
    const o = typeof t < "u" ? t : !ee(e, "getIsAllPageRowsSelected", Rc);
    if (n != null && n.deselectAll && !o) return ie();
    const i = Object.assign(ie(), r);
    return e.getRowModel().rows.forEach((l) => {
      Go(i, l.id, o, !0, e, !0);
    }), i;
  });
}
function Qv(e) {
  return e.getCoreRowModel();
}
function em(e) {
  const t = e.getCoreRowModel();
  return ee(e, "getIsSomeRowsSelected", qo) ? Ps(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: ie()
  };
}
function tm(e) {
  const t = e.getFilteredRowModel();
  return ee(e, "getIsSomeRowsSelected", qo) ? Ps(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: ie()
  };
}
function nm(e) {
  const t = e.getSortedRowModel();
  return ee(e, "getIsSomeRowsSelected", qo) ? Ps(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: ie()
  };
}
function Sc(e) {
  var t;
  return Object.keys(((t = e.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function xc(e) {
  var o;
  const t = e.getFilteredRowModel().flatRows, n = ((o = e.atoms.rowSelection) == null ? void 0 : o.get()) ?? {};
  let r = !!(t.length && Object.keys(n).length);
  if (r) {
    const i = /* @__PURE__ */ new Map();
    t.some((l) => !kr(l, n) && Co(l, i)) && (r = !1);
  }
  return r;
}
function Rc(e) {
  var i;
  const t = e.getPaginatedRowModel().flatRows, n = ((i = e.atoms.rowSelection) == null ? void 0 : i.get()) ?? {}, r = /* @__PURE__ */ new Map();
  let o = !1;
  for (let l = 0; l < t.length; l++) {
    const u = t[l];
    if (kr(u, n))
      !o && Co(u, r) && (o = !0);
    else if (Co(u, r)) return !1;
  }
  return o;
}
function qo(e) {
  return ee(e, "getSelectedRowIds", Sc).length > 0;
}
function rm(e) {
  return e.getPaginatedRowModel().flatRows.filter((t) => kt(t)).some((t) => Os(t) || ee(t, "getIsSomeSelected", Mc));
}
function om(e) {
  return (t) => {
    bc(e, t.target.checked);
  };
}
function im(e) {
  return (t) => {
    _c(e, t.target.checked);
  };
}
function Cc(e, t, n) {
  const r = Os(e);
  Hn(e.table, (o) => {
    t = typeof t < "u" ? t : !r;
    const i = Object.assign(ie(), o);
    return Go(i, e.id, t, ((n == null ? void 0 : n.selectChildren) ?? !0) && ln(e), e.table), !t && (n != null && n.deselectParents) && Ec(i, e), i;
  });
}
function Os(e) {
  var t;
  return kr(e, ((t = e.table.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function Mc(e) {
  return Ts(e) === "some";
}
function sm(e) {
  return Ts(e) === "all";
}
function kt(e) {
  const t = e.table.options;
  return typeof t.enableRowSelection == "function" ? t.enableRowSelection(e) : t.enableRowSelection ?? !0;
}
function ks(e) {
  const t = e.table.options;
  return typeof t.enableSubRowSelection == "function" ? t.enableSubRowSelection(e) : t.enableSubRowSelection ?? !0;
}
function ln(e) {
  const t = e.table.options;
  return typeof t.enableMultiRowSelection == "function" ? t.enableMultiRowSelection(e) : t.enableMultiRowSelection ?? !0;
}
function lm(e, t) {
  const n = kt(e);
  return (r) => {
    var c, d;
    if (!n) return;
    const o = r, i = e.table, l = o.target.checked, u = i._lastSelectedRowId;
    (!(i.options.enableRowRangeSelection !== !1 && u !== null && ln(e) && (((d = (c = i.options).isRowRangeSelectionEvent) == null ? void 0 : d.call(c, r)) ?? !1)) || !am(e, u, l, t)) && Cc(e, l, t), i._lastSelectedRowId = e.id;
  };
}
function am(e, t, n, r) {
  const o = (r == null ? void 0 : r.selectChildren) ?? !0, i = e.table, l = i.getRowsInDisplayOrder(), u = i.getPrePaginatedRowModel().rowsById[t] ?? i.getCoreRowModel().rowsById[t];
  if (!u) return !1;
  const c = u.getDisplayIndex(), d = e.getDisplayIndex(), g = l[c], h = l[d];
  if (c < 0 || d < 0 || c >= l.length || d >= l.length || (g == null ? void 0 : g.id) !== u.id || (h == null ? void 0 : h.id) !== e.id || !ln(u) || !ln(e)) return !1;
  const y = Math.min(c, d), w = Math.max(c, d);
  return Hn(i, (D) => {
    const R = Object.assign(ie(), D);
    for (let A = y; A <= w; A++) {
      const K = l[A];
      !kt(K) || !ln(K) || (Go(R, K.id, n, o, i), !n && (r != null && r.deselectParents) && Ec(R, K));
    }
    return R;
  }), !0;
}
function Go(e, t, n, r, o, i) {
  const l = o.getRow(t, !0);
  n ? (ln(l) || Object.keys(e).forEach((u) => delete e[u]), kt(l) && (e[t] = !0)) : (!i || kt(l)) && delete e[t], r && l.subRows.length && ks(l) && l.subRows.forEach((u) => Go(e, u.id, n, r, o, i));
}
function Co(e, t) {
  if (!kt(e)) return !1;
  const n = e.table;
  if (n.options.enableSubRowSelection === !0) return !0;
  const r = e.parentId;
  if (r === void 0) return !0;
  const o = t.get(r);
  if (o !== void 0) return o;
  const i = n.getCoreRowModel().rowsById, l = [];
  let u = !0, c = r;
  for (; c !== void 0; ) {
    const d = t.get(c);
    if (d !== void 0) {
      u = d;
      break;
    }
    l.push(c);
    const g = i[c] ?? n.getRow(c, !0);
    if (!ks(g)) {
      u = !1;
      break;
    }
    c = g.parentId;
  }
  return l.forEach((d) => t.set(d, u)), u;
}
function Ec(e, t) {
  const n = t.table.getCoreRowModel().rowsById;
  let r = t.parentId;
  for (; r !== void 0; )
    delete e[r], r = (n[r] ?? t.table.getRow(r, !0)).parentId;
}
function Ic(e, t, n, r) {
  const o = [];
  for (let i = 0; i < e.length; i++) {
    const l = e[i], u = kr(l, t);
    if (u && (n.push(l), r[l.id] = l), l.subRows.length) {
      const c = Ic(l.subRows, t, n, r);
      if (u) {
        const d = Object.create(Object.getPrototypeOf(l));
        ju(d, l), d.subRows = c, o.push(d);
      }
    } else u && o.push(l);
  }
  return o;
}
function Ps(e, t) {
  var i;
  const n = [], r = ie(), o = ((i = t.atoms.rowSelection) == null ? void 0 : i.get()) ?? {};
  return {
    rows: Ic(e.rows, o, n, r),
    flatRows: n,
    rowsById: r
  };
}
function kr(e, t) {
  return !!(cn(t, e.id) && t[e.id]);
}
function Ts(e) {
  var i;
  if (!e.subRows.length) return !1;
  const t = ((i = e.table.atoms.rowSelection) == null ? void 0 : i.get()) ?? {};
  let n = !1, r = !0, o = !1;
  for (let l = 0; l < e.subRows.length; l++) {
    const u = e.subRows[l];
    if (n && !r) break;
    if (kt(u) && (o = !0, kr(u, t) ? n = !0 : r = !1), u.subRows.length) {
      const c = Ts(u);
      c === "all" ? (n = !0, o = !0) : c === "some" ? (n = !0, r = !1, o = !0) : r = !1;
    }
  }
  return o ? r ? "all" : n ? "some" : !1 : !1;
}
const um = {
  initTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  resetTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  getInitialState: (e) => ({
    rowSelection: Zv(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onRowSelectionChange: Dr("rowSelection", e),
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
      row_toggleSelected: { fn: (n, r, o) => Cc(n, r, o) },
      row_getIsSelected: { fn: (n) => Os(n) },
      row_getIsSomeSelected: {
        fn: (n) => Mc(n),
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
        fn: (n) => sm(n),
        memoDeps: (n) => {
          var r;
          return [
            n.subRows,
            (r = n.table.atoms.rowSelection) == null ? void 0 : r.get(),
            n.table.options.enableRowSelection
          ];
        }
      },
      row_getCanSelect: { fn: (n) => kt(n) },
      row_getCanSelectSubRows: { fn: (n) => ks(n) },
      row_getCanMultiSelect: { fn: (n) => ln(n) },
      row_getToggleSelectedHandler: { fn: (n, r) => lm(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    mt("rowSelectionFeature", e, {
      table_setRowSelection: { fn: (t) => Hn(e, t) },
      table_resetRowSelection: { fn: (t) => Jv(e, t) },
      table_toggleAllRowsSelected: { fn: (t, n) => bc(e, t, n) },
      table_toggleAllPageRowsSelected: { fn: (t, n) => _c(e, t, n) },
      table_getPreSelectedRowModel: { fn: () => Qv(e) },
      table_getSelectedRowModel: {
        fn: () => em(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getCoreRowModel()];
        }
      },
      table_getFilteredSelectedRowModel: {
        fn: () => tm(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getFilteredRowModel()];
        }
      },
      table_getGroupedSelectedRowModel: {
        fn: () => nm(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getSortedRowModel()];
        }
      },
      table_getSelectedRowIds: {
        fn: () => Sc(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get()];
        }
      },
      table_getIsAllRowsSelected: {
        fn: () => xc(e),
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
        fn: () => Rc(e),
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
        fn: () => qo(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get()];
        }
      },
      table_getIsSomePageRowsSelected: {
        fn: () => rm(e),
        memoDeps: () => {
          var t;
          return [
            (t = e.atoms.rowSelection) == null ? void 0 : t.get(),
            e.getPaginatedRowModel(),
            e.options.enableRowSelection
          ];
        }
      },
      table_getToggleAllRowsSelectedHandler: { fn: () => om(e) },
      table_getToggleAllPageRowsSelectedHandler: { fn: () => im(e) }
    });
  }
}, cm = {
  getInitialState(e) {
    return {
      sorting: $h(),
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
      onSortingChange: Dr("sorting", e),
      isMultiSortEvent: (t) => t.shiftKey
    };
  },
  assignColumnPrototype(e, t) {
    it("rowSortingFeature", e, t, {
      column_getAutoSortFn: { fn: (n) => ic(n) },
      column_getAutoSortDir: { fn: (n) => sc(n) },
      column_getSortFn: { fn: (n) => lc(n) },
      column_toggleSorting: { fn: (n, r, o) => ac(n, r, o) },
      column_getFirstSortDir: { fn: (n) => uc(n) },
      column_getNextSortingOrder: { fn: (n, r) => cc(n, r) },
      column_getCanSort: { fn: (n) => As(n) },
      column_getCanMultiSort: { fn: (n) => Ro(n) },
      column_getIsSorted: { fn: (n) => fc(n) },
      column_getSortIndex: { fn: (n) => Uh(n) },
      column_clearSorting: { fn: (n) => qh(n) },
      column_getToggleSortingHandler: { fn: (n) => Gh(n) }
    });
  },
  constructTableAPIs(e) {
    mt("rowSortingFeature", e, {
      table_setSorting: { fn: (t) => $o(e, t) },
      table_resetSorting: { fn: (t) => oc(e, t) }
    });
  }
};
function fm() {
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
      fn: () => dm(t)
    });
  };
}
function dm(e) {
  var r;
  const t = e.getPreExpandedRowModel(), n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return !t.rows.length || n !== !0 && !Object.keys(n ?? {}).length || !e.options.paginateExpandedRows && !e.options.manualPagination ? t : gm(t);
}
function gm(e) {
  const t = [], n = (r) => {
    t.push(r), r.subRows.length && No(r) && r.subRows.forEach(n);
  };
  return e.rows.forEach(n), {
    rows: t,
    flatRows: e.flatRows,
    rowsById: e.rowsById
  };
}
function pm() {
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
      fn: () => hm(t),
      onAfterUpdate: Ku(() => rc(t))
    });
  };
}
function hm(e) {
  var c;
  const t = e.getPreSortedRowModel(), n = (c = e.atoms.sorting) == null ? void 0 : c.get();
  if (!t.rows.length || !(n != null && n.length)) return t;
  const r = [], o = n.filter((d) => {
    const g = e.getColumn(d.id);
    return g ? As(g) : !1;
  });
  if (!o.length) return t;
  const i = [];
  for (let d = 0; d < o.length; d++) {
    const g = o[d], h = e.getColumn(g.id);
    h && i.push({
      id: g.id,
      desc: g.desc,
      sortUndefined: h.columnDef.sortUndefined,
      invertSorting: h.columnDef.invertSorting,
      sortFn: lc(h)
    });
  }
  const l = (d, g) => {
    for (let h = 0; h < i.length; h++) {
      const y = i[h], w = y.sortUndefined, D = y.desc;
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
    let h = !1;
    for (let y = 0; y < g.length; y++) {
      const w = g[y];
      w !== d[y] && (h = !0);
      const D = r.length;
      if (r.push(w), w.subRows.length) {
        const R = u(w.subRows);
        if (R.changed) {
          const A = Object.create(Object.getPrototypeOf(w));
          ju(A, w), A.subRows = R.rows, g[y] = A, r[D] = A, h = !0;
        }
      }
    }
    return {
      rows: g,
      changed: h
    };
  };
  return {
    rows: u(t.rows).rows,
    flatRows: r,
    rowsById: t.rowsById
  };
}
function oa(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = on(e[n]);
  return es(e, t);
}
function vm(e) {
  return Object.keys(e).map((t) => on(e[t]));
}
function mm(e) {
  const t = (u, c) => {
    u.setOptions((d) => Jl(d, oa(c)));
  }, n = Fp(), r = es(e, { features: {
    coreReactivityFeature: n,
    ...on(e.features) ?? {}
  } }), o = es(oa(r), { mergeOptions: (u, c) => Jl(u, c) }), i = Tv(o), l = i;
  return za() && _d(() => {
    var u;
    return (u = n.unmount) == null ? void 0 : u.call(n);
  }), be(() => vm(r), () => {
    t(i, r);
  }, { immediate: !0 }), be(() => {
    const u = on(e.state), c = on(e.atoms);
    if (!u) return [];
    const d = [];
    for (const g of Object.keys(l.initialState))
      !(g in u) || (c == null ? void 0 : c[g]) !== void 0 || d.push(u[g]);
    return d;
  }, (u) => {
    u.length > 0 && t(i, r);
  }, { immediate: !0 }), l.Subscribe = (u) => u.children(l.atoms), l;
}
function Cr(e) {
  "@babel/helpers - typeof";
  return Cr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Cr(e);
}
function ym(e, t) {
  if (Cr(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Cr(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function wm(e) {
  var t = ym(e, "string");
  return Cr(t) == "symbol" ? t : t + "";
}
function Pr(e, t, n) {
  return (t = wm(t)) in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function bm(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
    if (t.indexOf(r) !== -1) continue;
    n[r] = e[r];
  }
  return n;
}
function _m(e, t) {
  if (e == null) return {};
  var n, r, o = bm(e, t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (o[n] = e[n]);
  }
  return o;
}
function Ac(e, t) {
  var n = Object.keys(e), r = Object.keys(t);
  return n.length !== r.length ? !1 : n.every(function(o) {
    return Object.is(e[o], t[o]);
  });
}
function Sm() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Ac, t = null;
  return function(n) {
    return t && e(t.value, n) || (t = {
      value: n
    }), t.value;
  };
}
var xm = ["block"];
function ia(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function sa(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ia(Object(n), !0).forEach(function(r) {
      Pr(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ia(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Rm(e) {
  return {
    x: (e.right + e.left) / 2,
    y: (e.bottom + e.top) / 2
  };
}
function Hi(e) {
  var t = e.client, n = e.borderBox, r = n.height / 4;
  return t.y <= n.top + r ? "reorder-above" : t.y >= n.bottom - r ? "reorder-below" : "make-child";
}
function Cm(e) {
  var t = e.element, n = e.input, r = e.currentLevel, o = e.indentPerLevel, i = e.mode, l = {
    x: n.clientX,
    y: n.clientY
  }, u = t.getBoundingClientRect();
  if (i === "standard") {
    var c = Hi({
      borderBox: u,
      client: l
    });
    return {
      type: c,
      indentPerLevel: o,
      currentLevel: r
    };
  }
  var d = Rm(u);
  if (i === "expanded") {
    var g = Hi({
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
  var h = o * r;
  if (l.x < u.left + h) {
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
    type: Hi({
      borderBox: u,
      client: l
    }),
    indentPerLevel: o,
    currentLevel: r
  };
}
function Dc(e, t) {
  return e.type !== t.type ? !1 : e.type === "instruction-blocked" && t.type === "instruction-blocked" ? Dc(e.desired, t.desired) : Ac(e, t);
}
var Mm = Sm(Dc);
function Em(e) {
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
function la(e, t) {
  var n = t.block, r = _m(t, xm), o = Cm(r), i = Em({
    desired: o,
    block: n
  }), l = Mm(i);
  return sa(sa({}, e), {}, Pr({}, Oc, l));
}
function Im(e) {
  var t;
  return (t = e[Oc]) !== null && t !== void 0 ? t : null;
}
var Oc = Symbol("tree-item-instruction");
function is(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Am(e) {
  if (Array.isArray(e)) return is(e);
}
function Dm(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function kc(e, t) {
  if (e) {
    if (typeof e == "string") return is(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? is(e, t) : void 0;
  }
}
function Om() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Xo(e) {
  return Am(e) || Dm(e) || kc(e) || Om();
}
var aa = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, st = {}, Tr = {};
Object.defineProperty(Tr, "__esModule", { value: !0 });
Tr.bind = void 0;
function km(e, t) {
  var n = t.type, r = t.listener, o = t.options;
  return e.addEventListener(n, r, o), function() {
    e.removeEventListener(n, r, o);
  };
}
Tr.bind = km;
var Yo = {}, In = aa && aa.__assign || function() {
  return In = Object.assign || function(e) {
    for (var t, n = 1, r = arguments.length; n < r; n++) {
      t = arguments[n];
      for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    }
    return e;
  }, In.apply(this, arguments);
};
Object.defineProperty(Yo, "__esModule", { value: !0 });
Yo.bindAll = void 0;
var Pm = Tr;
function ua(e) {
  if (!(typeof e > "u"))
    return typeof e == "boolean" ? {
      capture: e
    } : e;
}
function Tm(e, t) {
  if (t == null)
    return e;
  var n = In(In({}, e), { options: In(In({}, ua(t)), ua(e.options)) });
  return n;
}
function Fm(e, t, n) {
  var r = t.map(function(o) {
    var i = Tm(o, n);
    return (0, Pm.bind)(e, i);
  });
  return function() {
    r.forEach(function(i) {
      return i();
    });
  };
}
Yo.bindAll = Fm;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.bindAll = e.bind = void 0;
  var t = Tr;
  Object.defineProperty(e, "bind", { enumerable: !0, get: function() {
    return t.bind;
  } });
  var n = Yo;
  Object.defineProperty(e, "bindAll", { enumerable: !0, get: function() {
    return n.bindAll;
  } });
})(st);
function Hm(e) {
  if (Array.isArray(e)) return e;
}
function Lm(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r, o, i, l, u = [], c = !0, d = !1;
    try {
      if (i = (n = n.call(e)).next, t !== 0) for (; !(c = (r = i.call(n)).done) && (u.push(r.value), u.length !== t); c = !0) ;
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
function jm() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Pc(e, t) {
  return Hm(e) || Lm(e, t) || kc(e, t) || jm();
}
var Tc = "data-pdnd-honey-pot";
function Fc(e) {
  return e instanceof Element && e.hasAttribute(Tc);
}
function Hc(e) {
  var t = document.elementsFromPoint(e.x, e.y), n = Pc(t, 2), r = n[0], o = n[1];
  return r ? Fc(r) ? o ?? null : r : null;
}
function gn(e) {
  var t = null;
  return function() {
    if (!t) {
      for (var r = arguments.length, o = new Array(r), i = 0; i < r; i++)
        o[i] = arguments[i];
      var l = e.apply(this, o);
      t = {
        result: l
      };
    }
    return t.result;
  };
}
var Lc = gn(function() {
  return navigator.userAgent.includes("Firefox");
}), Fr = gn(function() {
  var t = navigator, n = t.userAgent;
  return n.includes("AppleWebKit") && !n.includes("Chrome");
});
function zm(e) {
  return "nodeName" in e;
}
function jc(e) {
  return zm(e) && e.ownerDocument !== document;
}
var Mo = {
  isLeavingWindow: Symbol("leaving"),
  isEnteringWindow: Symbol("entering")
};
(function() {
  if (typeof window > "u" || !Fr())
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
      listener: function(i) {
        !n.isOverWindow && n.enterCount === 0 && (i[Mo.isEnteringWindow] = !0), n.isOverWindow = !0, n.enterCount++;
      }
    }, {
      type: "dragleave",
      listener: function(i) {
        n.enterCount--, n.isOverWindow && n.enterCount === 0 && (i[Mo.isLeavingWindow] = !0, n.isOverWindow = !1);
      }
    }],
    // using `capture: true` so that adding event listeners
    // in bubble phase will have the correct symbols
    {
      capture: !0
    }
  );
})();
function Km(e) {
  var t = e.dragLeave;
  return Fr() ? t.hasOwnProperty(Mo.isLeavingWindow) : !1;
}
function Vm(e) {
  var t = e.dragLeave, n = t.type, r = t.relatedTarget;
  return n !== "dragleave" ? !1 : Fr() ? Km({
    dragLeave: t
  }) : r == null ? !0 : Lc() ? jc(r) : r instanceof HTMLIFrameElement;
}
function Fs(e) {
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
function mr(e) {
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
var Bm = function(t) {
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
}, Li = Bm(function(e) {
  return e();
}), lo = /* @__PURE__ */ function() {
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
function Nm(e) {
  var t = e.source, n = e.initial, r = e.dispatchEvent, o = {
    dropTargets: []
  };
  function i(u) {
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
      i({
        eventName: "onGenerateDragPreview",
        payload: {
          source: t,
          location: g,
          nativeSetDragImage: d
        }
      }), lo.schedule(function() {
        i({
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
      lo.flush(), Li.cancel(), i({
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
      Li(function() {
        lo.flush();
        var g = {
          initial: n,
          previous: o,
          current: d
        };
        i({
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
      lo.flush(), Li.cancel(), i({
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
var ss = {
  isActive: !1
};
function zc() {
  return !ss.isActive;
}
function $m(e) {
  return e.dataTransfer ? e.dataTransfer.setDragImage.bind(e.dataTransfer) : null;
}
function Wm(e) {
  var t = e.current, n = e.next;
  if (t.length !== n.length)
    return !0;
  for (var r = 0; r < t.length; r++)
    if (t[r].element !== n[r].element)
      return !0;
  return !1;
}
function Um(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = e.dispatchEvent;
  if (!zc())
    return;
  var i = qm({
    event: t,
    dragType: n,
    getDropTargetsOver: r
  });
  ss.isActive = !0;
  var l = {
    current: i
  };
  ji({
    event: t,
    current: i.dropTargets
  });
  var u = Nm({
    source: n.payload,
    dispatchEvent: o,
    initial: i
  });
  function c(w) {
    var D = Wm({
      current: l.current.dropTargets,
      next: w.dropTargets
    });
    l.current = w, D && u.dragUpdate({
      current: l.current
    });
  }
  function d(w) {
    var D = mr(w), R = Fc(w.target) ? Hc({
      x: D.clientX,
      y: D.clientY
    }) : w.target, A = r({
      target: R,
      input: D,
      source: n.payload,
      current: l.current.dropTargets
    });
    A.length && (w.preventDefault(), ji({
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
    }), h();
  }
  function h() {
    ss.isActive = !1, y();
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
        Vm({
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
          input: mr(D)
        }, !l.current.dropTargets.length) {
          g();
          return;
        }
        D.preventDefault(), ji({
          event: D,
          current: l.current.dropTargets
        }), u.drop({
          current: l.current,
          // When dropping something native, we need to extract the latest
          // `.items` from the "drop" event as it is now accessible
          updatedSourcePayload: n.type === "external" ? n.getDropPayload(D) : null
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
      listener: function(D) {
        l.current = {
          dropTargets: l.current.dropTargets,
          input: mr(D)
        }, g();
      }
    }].concat(Xo(Fs({
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
    nativeSetDragImage: $m(t)
  });
}
function ji(e) {
  var t, n = e.event, r = e.current, o = (t = r[0]) === null || t === void 0 ? void 0 : t.dropEffect;
  o != null && n.dataTransfer && (n.dataTransfer.dropEffect = o);
}
function qm(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = mr(t);
  if (n.startedFrom === "external")
    return {
      input: o,
      dropTargets: []
    };
  var i = r({
    input: o,
    source: n.payload,
    target: t.target,
    current: []
  });
  return {
    input: o,
    dropTargets: i
  };
}
var ca = {
  canStart: zc,
  start: Um
}, ls = /* @__PURE__ */ new Map();
function Gm(e) {
  var t = e.typeKey, n = e.mount, r = ls.get(t);
  if (r)
    return r.usageCount++, r;
  var o = {
    typeKey: t,
    unmount: n(),
    usageCount: 1
  };
  return ls.set(t, o), o;
}
function Xm(e) {
  var t = Gm(e);
  return function() {
    t.usageCount--, !(t.usageCount > 0) && (t.unmount(), ls.delete(e.typeKey));
  };
}
function Zo() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return function() {
    t.forEach(function(o) {
      return o();
    });
  };
}
function Kc(e, t) {
  var n = t.attribute, r = t.value;
  return e.setAttribute(n, r), function() {
    return e.removeAttribute(n);
  };
}
function fa(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Kt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? fa(Object(n), !0).forEach(function(r) {
      Pr(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : fa(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function zi(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = Ym(e)) || t) {
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
  var i, l = !0, u = !1;
  return { s: function() {
    n = n.call(e);
  }, n: function() {
    var d = n.next();
    return l = d.done, d;
  }, e: function(d) {
    u = !0, i = d;
  }, f: function() {
    try {
      l || n.return == null || n.return();
    } finally {
      if (u) throw i;
    }
  } };
}
function Ym(e, t) {
  if (e) {
    if (typeof e == "string") return da(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? da(e, t) : void 0;
  }
}
function da(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Ki(e) {
  return e.slice(0).reverse();
}
function Zm(e) {
  var t = e.typeKey, n = e.defaultDropEffect, r = /* @__PURE__ */ new WeakMap(), o = "data-drop-target-for-".concat(t), i = "[".concat(o, "]");
  function l(w) {
    return r.set(w.element, w), function() {
      return r.delete(w.element);
    };
  }
  function u(w) {
    var D = Zo(Kc(w.element, {
      attribute: o,
      value: "true"
    }), l(w));
    return gn(D);
  }
  function c(w) {
    var D, R, A, K, x = w.source, j = w.target, _ = w.input, k = w.result, z = k === void 0 ? [] : k;
    if (j == null)
      return z;
    if (!(j instanceof Element))
      return j instanceof Node ? c({
        source: x,
        target: j.parentElement,
        input: _,
        result: z
      }) : z;
    var Y = j.closest(i);
    if (Y == null)
      return z;
    var $ = r.get(Y);
    if ($ == null)
      return z;
    var L = {
      input: _,
      source: x,
      element: $.element
    };
    if ($.canDrop && !$.canDrop(L))
      return c({
        source: x,
        target: $.element.parentElement,
        input: _,
        result: z
      });
    var W = (D = (R = $.getData) === null || R === void 0 ? void 0 : R.call($, L)) !== null && D !== void 0 ? D : {}, se = (A = (K = $.getDropEffect) === null || K === void 0 ? void 0 : K.call($, L)) !== null && A !== void 0 ? A : n, ce = {
      data: W,
      element: $.element,
      dropEffect: se,
      // we are collecting _actual_ drop targets, so these are
      // being applied _not_ due to stickiness
      isActiveDueToStickiness: !1
    };
    return c({
      source: x,
      target: $.element.parentElement,
      input: _,
      // Using bubble ordering. Same ordering as `event.getPath()`
      result: [].concat(Xo(z), [ce])
    });
  }
  function d(w) {
    var D = w.eventName, R = w.payload, A = zi(R.location.current.dropTargets), K;
    try {
      for (A.s(); !(K = A.n()).done; ) {
        var x, j = K.value, _ = r.get(j.element), k = Kt(Kt({}, R), {}, {
          self: j
        });
        _ == null || (x = _[D]) === null || x === void 0 || x.call(
          _,
          // I cannot seem to get the types right here.
          // TS doesn't seem to like that one event can need `nativeSetDragImage`
          // @ts-expect-error
          k
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
      })), K = /* @__PURE__ */ new Set(), x = zi(R.location.previous.dropTargets), j;
      try {
        for (x.s(); !(j = x.n()).done; ) {
          var _, k = j.value;
          K.add(k.element);
          var z = r.get(k.element), Y = A.has(k.element), $ = Kt(Kt({}, R), {}, {
            self: k
          });
          if (z == null || (_ = z.onDropTargetChange) === null || _ === void 0 || _.call(z, $), !Y) {
            var L;
            z == null || (L = z.onDragLeave) === null || L === void 0 || L.call(z, $);
          }
        }
      } catch (oe) {
        x.e(oe);
      } finally {
        x.f();
      }
      var W = zi(R.location.current.dropTargets), se;
      try {
        for (W.s(); !(se = W.n()).done; ) {
          var ce, te, we = se.value;
          if (!K.has(we.element)) {
            var xe = Kt(Kt({}, R), {}, {
              self: we
            }), fe = r.get(we.element);
            fe == null || (ce = fe.onDropTargetChange) === null || ce === void 0 || ce.call(fe, xe), fe == null || (te = fe.onDragEnter) === null || te === void 0 || te.call(fe, xe);
          }
        }
      } catch (oe) {
        W.e(oe);
      } finally {
        W.f();
      }
    }
  };
  function h(w) {
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
    for (var j = Ki(K), _ = Ki(x), k = [], z = 0; z < j.length; z++) {
      var Y, $ = j[z], L = _[z];
      if (L != null) {
        k.push(L);
        continue;
      }
      var W = k[z - 1], se = j[z - 1];
      if ((W == null ? void 0 : W.element) !== (se == null ? void 0 : se.element))
        break;
      var ce = r.get($.element);
      if (!ce)
        break;
      var te = {
        input: A,
        source: D,
        element: ce.element
      };
      if (ce.canDrop && !ce.canDrop(te) || !((Y = ce.getIsSticky) !== null && Y !== void 0 && Y.call(ce, te)))
        break;
      k.push(Kt(Kt({}, $), {}, {
        // making it clear to consumers this drop target is active due to stickiness
        isActiveDueToStickiness: !0
      }));
    }
    return Ki(k);
  }
  return {
    dropTargetForConsumers: u,
    getIsOver: y,
    dispatchEvent: h
  };
}
function Jm(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = Qm(e)) || t) {
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
  var i, l = !0, u = !1;
  return { s: function() {
    n = n.call(e);
  }, n: function() {
    var d = n.next();
    return l = d.done, d;
  }, e: function(d) {
    u = !0, i = d;
  }, f: function() {
    try {
      l || n.return == null || n.return();
    } finally {
      if (u) throw i;
    }
  } };
}
function Qm(e, t) {
  if (e) {
    if (typeof e == "string") return ga(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? ga(e, t) : void 0;
  }
}
function ga(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function pa(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function e0(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? pa(Object(n), !0).forEach(function(r) {
      Pr(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : pa(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function t0() {
  var e = /* @__PURE__ */ new Set(), t = null;
  function n(i) {
    t && (!i.canMonitor || i.canMonitor(t.canMonitorArgs)) && t.active.add(i);
  }
  function r(i) {
    var l = e0({}, i);
    e.add(l), n(l);
    function u() {
      e.delete(l), t && t.active.delete(l);
    }
    return gn(u);
  }
  function o(i) {
    var l = i.eventName, u = i.payload;
    if (l === "onGenerateDragPreview") {
      t = {
        canMonitorArgs: {
          initial: u.location.initial,
          source: u.source
        },
        active: /* @__PURE__ */ new Set()
      };
      var c = Jm(e), d;
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
function Vc(e) {
  var t = e.typeKey, n = e.mount, r = e.dispatchEventToSource, o = e.onPostDispatch, i = e.defaultDropEffect, l = t0(), u = Zm({
    typeKey: t,
    defaultDropEffect: i
  });
  function c(h) {
    r == null || r(h), u.dispatchEvent(h), l.dispatchEvent(h), o == null || o(h);
  }
  function d(h) {
    var y = h.event, w = h.dragType;
    ca.start({
      event: y,
      dragType: w,
      getDropTargetsOver: u.getIsOver,
      dispatchEvent: c
    });
  }
  function g() {
    function h() {
      var y = {
        canStart: ca.canStart,
        start: d
      };
      return n(y);
    }
    return Xm({
      typeKey: t,
      mount: h
    });
  }
  return {
    registerUsage: g,
    dropTarget: u.dropTargetForConsumers,
    monitor: l.monitorForConsumers
  };
}
function n0(e) {
  var t = e.dragEnter;
  return Fr() ? t.hasOwnProperty(Mo.isEnteringWindow) : !1;
}
function r0(e) {
  var t = e.dragEnter, n = t.type, r = t.relatedTarget;
  return n !== "dragenter" ? !1 : Fr() ? n0({
    dragEnter: t
  }) : r == null ? !0 : Lc() ? jc(r) : r instanceof HTMLIFrameElement;
}
var o0 = gn(function() {
  return navigator.userAgent.toLocaleLowerCase().includes("android");
}), Bc = "pdnd:android-fallback", as = "text/plain", Nc = "application/vnd.pdnd";
function Hs(e) {
  var t = e.type, n = e.value;
  return !(t === Nc || t === as && n === Bc);
}
function i0(e) {
  return Array.from(e.items).filter(function(t) {
    return t.kind === "file" || Hs({
      type: t.type,
      value: e.getData(t.type)
    });
  });
}
function s0(e) {
  return Array.from(e.types).filter(function(t) {
    return Hs({
      type: t,
      value: e.getData(t)
    });
  });
}
var us = !1, Ls = Vc({
  typeKey: "external",
  // for external drags, we are generally making a copy of something that is being dragged
  defaultDropEffect: "copy",
  mount: function(t) {
    return st.bind(window, {
      type: "dragenter",
      listener: function(r) {
        if (!us && r.dataTransfer && t.canStart(r) && r0({
          dragEnter: r
        })) {
          var o = s0(r.dataTransfer);
          if (o.length) {
            var i = {
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
                payload: i,
                getDropPayload: function(u) {
                  if (!u.dataTransfer)
                    return i;
                  var c = i0(u.dataTransfer), d = u.dataTransfer.getData.bind(u.dataTransfer);
                  return {
                    types: o,
                    items: c,
                    // return `null` if there is no result, otherwise string
                    getStringData: function(h) {
                      if (!o.includes(h))
                        return null;
                      var y = d(h);
                      return Hs({
                        type: h,
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
  Ls.registerUsage();
  var t = {
    type: "idle"
  }, n = t;
  function r() {
    n.type === "dragging" && (us = !1, n.cleanup(), n = t);
  }
  function o() {
    return st.bindAll(
      window,
      [{
        type: "dragend",
        listener: r
      }].concat(Xo(Fs({
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
      n.type === "idle" && (us = !0, n = {
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
function l0(e) {
  return Ls.dropTarget(e);
}
function a0(e) {
  return Ls.monitor(e);
}
var u0 = 2147483647, c0 = {
  inset: "unset",
  border: "none",
  padding: 0,
  margin: 0,
  overflow: "visible",
  color: "inherit",
  background: "transparent",
  width: "auto",
  height: "auto"
}, Vi = gn(function() {
  return typeof HTMLElement < "u" && typeof HTMLElement.prototype.showPopover == "function";
});
function ha(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function va(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ha(Object(n), !0).forEach(function(r) {
      Pr(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ha(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
var Mr = 2, ma = Mr / 2;
function f0(e) {
  return {
    x: Math.floor(e.x),
    y: Math.floor(e.y)
  };
}
function d0(e) {
  return {
    x: e.x - ma,
    y: e.y - ma
  };
}
function g0(e) {
  return {
    x: Math.max(e.x, 0),
    y: Math.max(e.y, 0)
  };
}
function p0(e) {
  return {
    x: Math.min(e.x, window.innerWidth - Mr),
    y: Math.min(e.y, window.innerHeight - Mr)
  };
}
function ya(e) {
  var t = e.client, n = p0(g0(d0(f0(t))));
  return DOMRect.fromRect({
    x: n.x,
    y: n.y,
    width: Mr,
    height: Mr
  });
}
function wa(e) {
  var t = e.clientRect;
  return {
    left: "".concat(t.left, "px"),
    top: "".concat(t.top, "px"),
    width: "".concat(t.width, "px"),
    height: "".concat(t.height, "px")
  };
}
function h0(e) {
  var t = e.client, n = e.clientRect;
  return (
    // is within horizontal bounds
    t.x >= n.x && t.x <= n.x + n.width && // is within vertical bounds
    t.y >= n.y && t.y <= n.y + n.height
  );
}
function v0(e) {
  var t = e.initial, n = document.createElement("div");
  n.setAttribute(Tc, "true"), Vi() && n.setAttribute("popover", "manual");
  var r = ya({
    client: t
  });
  Object.assign(n.style, va(va({
    position: "fixed"
  }, Vi() ? (
    // needs to come first as it has 'inset: unset' which
    // needs to be overridden by our top / left values
    c0
  ) : {
    // Fallback: using maximum possible z-index so that this element
    // will always be on top of other positioned content.
    zIndex: u0
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
  }, wa({
    clientRect: r
  }))), document.body.appendChild(n), Vi() && n.showPopover();
  var o = st.bind(window, {
    type: "pointermove",
    listener: function(l) {
      var u = {
        x: l.clientX,
        y: l.clientY
      };
      r = ya({
        client: u
      }), Object.assign(n.style, wa({
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
    if (o(), h0({
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
function m0() {
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
    return function(i) {
      var l = i.eventName, u = i.payload;
      if (l === "onDragStart") {
        var c = u.location.initial.input, d = e ?? {
          x: c.clientX,
          y: c.clientY
        };
        r = v0({
          initial: d
        });
      }
      if (l === "onDrop") {
        var g, h = u.location.current.input;
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
var y0 = "text/uri-list", Eo = /* @__PURE__ */ new WeakMap();
function w0(e) {
  return Eo.set(e.element, e), function() {
    Eo.delete(e.element);
  };
}
var ba = m0(), $c = Vc({
  typeKey: "element",
  defaultDropEffect: "move",
  mount: function(t) {
    return Zo(ba.bindEvents(), st.bind(document, {
      type: "dragstart",
      listener: function(r) {
        var o, i, l, u, c, d;
        if (t.canStart(r) && !r.defaultPrevented && r.dataTransfer) {
          var g = r.target;
          if (g instanceof HTMLElement) {
            var h = Eo.get(g);
            if (h) {
              var y = mr(r), w = {
                element: h.element,
                dragHandle: (o = h.dragHandle) !== null && o !== void 0 ? o : null,
                input: y
              };
              if (h.canDrag && !h.canDrag(w)) {
                r.preventDefault();
                return;
              }
              if (h.dragHandle) {
                var D = Hc({
                  x: y.clientX,
                  y: y.clientY
                });
                if (!h.dragHandle.contains(D)) {
                  r.preventDefault();
                  return;
                }
              }
              var R = (i = (l = h.getInitialDataForExternal) === null || l === void 0 ? void 0 : l.call(h, w)) !== null && i !== void 0 ? i : null;
              if (R)
                for (var A = 0, K = Object.entries(R); A < K.length; A++) {
                  var x = Pc(K[A], 2), j = x[0], _ = x[1];
                  r.dataTransfer.setData(j, _ ?? "");
                }
              o0() && !r.dataTransfer.types.includes(as) && !r.dataTransfer.types.includes(y0) && r.dataTransfer.setData(as, Bc), r.dataTransfer.setData(Nc, "");
              var k = {
                element: h.element,
                dragHandle: (u = h.dragHandle) !== null && u !== void 0 ? u : null,
                data: (c = (d = h.getInitialData) === null || d === void 0 ? void 0 : d.call(h, w)) !== null && c !== void 0 ? c : {}
              }, z = {
                type: "element",
                payload: k,
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
    var n, r, o = t.eventName, i = t.payload;
    (n = Eo.get(i.source.element)) === null || n === void 0 || (r = n[o]) === null || r === void 0 || r.call(
      n,
      // I cannot seem to get the types right here.
      // TS doesn't seem to like that one event can need `nativeSetDragImage`
      // @ts-expect-error
      i
    );
  },
  onPostDispatch: ba.getOnPostDispatch()
}), b0 = $c.dropTarget;
function _0(e) {
  var t = Zo(
    // making the draggable register the adapter rather than drop targets
    // this is because you *must* have a draggable element to start a drag
    // but you _might_ not have any drop targets immediately
    // (You might create drop targets async)
    $c.registerUsage(),
    w0(e),
    Kc(e.element, {
      attribute: "draggable",
      value: "true"
    })
  );
  return gn(t);
}
function _a(e) {
  e.defaultPrevented || (e.dataTransfer && (e.dataTransfer.dropEffect = "move"), e.preventDefault());
}
var cs = null;
function S0() {
  ur(), cs = st.bindAll(
    window,
    [{
      type: "dragover",
      listener: _a
    }, {
      type: "dragenter",
      listener: _a
    }, {
      type: "drop",
      listener: function(t) {
        t.preventDefault(), ur();
      }
    }, {
      type: "dragend",
      listener: ur
    }].concat(Xo(Fs({
      onDragEnd: ur
    }))),
    // being clear that these are added in the bubble phase
    {
      capture: !1
    }
  );
}
function ur() {
  var e;
  (e = cs) === null || e === void 0 || e(), cs = null;
}
function x0() {
  var e;
  if (((e = window.event) === null || e === void 0 ? void 0 : e.type) === "drop") {
    var t;
    (t = window.event) === null || t === void 0 || t.preventDefault();
  }
  ur();
}
var Sa = {
  start: S0,
  stop: x0
};
function xa(e) {
  var t = e.source;
  return t.types.includes("Files");
}
function R0(e) {
  var t = e.source;
  return t.items.filter(function(n) {
    return n.kind === "file";
  }).map(function(n) {
    return n.getAsFile();
  }).filter(function(n) {
    return n != null;
  });
}
const Bi = /* @__PURE__ */ new Map(), kn = "pnl-tst-row", Wc = "pnl-tst-file";
function Uc(e, t) {
  const n = Im(t);
  if (!t.key || !n) return null;
  const r = e.panes.find((o) => o.id() === t.paneId);
  return r ? { pane: r, key: t.key, instruction: n } : null;
}
function Ra(e, t) {
  const n = Uc(e, t);
  return n && n.instruction.type !== "instruction-blocked" ? n : null;
}
function Ca(e, t) {
  const n = Uc(e, t);
  for (const r of e.panes)
    n && r === n.pane ? r.showDrop(n.key, n.instruction) : r.clearDrop();
}
function C0(e, t) {
  return Zo(
    _0({
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
        return { type: kn, group: "", sourceId: "", key: null, keys: [] };
      },
      onGenerateDragPreview: ({ location: n, nativeSetDragImage: r }) => {
        if (!r) return;
        const o = n.current.input;
        for (const i of t.panes)
          if (i.preview(o, r)) return;
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
    b0({
      element: e,
      // Position is deliberately not consulted here. pdnd settles `canDrop` when
      // the pointer enters the element, and the element is the whole layout, so an
      // answer given from the pointer's first position would stand for the rest of
      // the drag. Which pane the pointer is over, and whether that pane accepts
      // the drag at all, is decided in `getData`, which runs on every move.
      canDrop: ({ source: n }) => n.data.type === kn,
      getData: ({ input: n, source: r }) => {
        for (const o of t.panes) {
          const i = o.dropData(n, r.data);
          if (i) return i;
        }
        return { type: kn, key: null, paneId: "" };
      },
      onDrag: ({ self: n }) => Ca(t, n.data),
      onDragLeave: () => {
        for (const n of t.panes) n.clearDrop();
      },
      onDrop: ({ self: n, source: r, location: o }) => {
        for (const l of t.panes) l.clearDrop();
        const i = Ra(t, n.data);
        i == null || i.pane.drop(r.data, i.key, i.instruction, o.current.input);
      }
    }),
    // Files dragged in from the desktop. A third registration rather than a
    // branch inside the second, because the two adapters carry different payloads
    // and pdnd keeps them apart on purpose: an external drag has no source
    // element, no preview to generate and no drag start inside the window.
    l0({
      element: e,
      // Text, links and HTML dragged in are somebody else's business. Files are
      // the only external kind this panel has anything to say about, and the same
      // reasoning as above applies: which pane, and whether it takes files at
      // all, is decided in `getData` because that runs on every move.
      canDrop: ({ source: n }) => xa({ source: n }),
      getData: ({ input: n }) => {
        for (const r of t.panes) {
          const o = r.externalDropData(n);
          if (o) return o;
        }
        return { type: Wc, key: null, paneId: "" };
      },
      onDrag: ({ self: n }) => Ca(t, n.data),
      onDragLeave: () => {
        for (const n of t.panes) n.clearDrop();
      },
      onDrop: ({ self: n, source: r }) => {
        for (const i of t.panes) i.clearDrop();
        const o = Ra(t, n.data);
        o == null || o.pane.dropFiles(R0({ source: r }), o.key, o.instruction);
      }
    }),
    // A file dropped anywhere the panel does not claim makes the browser navigate
    // to it, which throws the Panel session away without asking. pdnd blocks that
    // for the rest of the drag, and only while a table on the page is one that
    // would have taken the file: a page that opted into nothing keeps whatever
    // behaviour it had.
    a0({
      canMonitor: ({ source: n }) => xa({ source: n }),
      onDragStart: () => {
        t.panes.some((n) => n.acceptsFiles()) && Sa.start();
      },
      onDrop: () => Sa.stop()
    })
  );
}
function M0(e, t) {
  let n = Bi.get(e);
  return n || (n = { panes: [] }, n.cleanup = C0(e, n), Bi.set(e, n)), n.panes.push(t), () => {
    var r;
    n.panes = n.panes.filter((o) => o !== t), !(n.panes.length > 0) && ((r = n.cleanup) == null || r.call(n), Bi.delete(e));
  };
}
const E0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ef5350" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m6 10h-4v8a4 4 0 1 1-4-4 3.96 3.96 0 0 1 2 .555V8h6Z"/></svg>', I0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#ff7043" d="M2 2a1 1 0 0 0-1 1v10c0 .554.446 1 1 1h12c.554 0 1-.446 1-1V3a1 1 0 0 0-1-1zm0 3h12v8H2zm1 2 2 2-2 2 1 1 3-3-3-3zm5 3.5V12h5v-1.5z"/></svg>', A0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#7e57c2" d="M20 18h-2v-2h-2v2c0 .193 0 .703 1.254 1.033A3.345 3.345 0 0 1 20 22h2v2h2v-2c0-.388-.562-.851-1.254-1.034C20.356 20.34 20 18.84 20 18m-3.254 2.966C14.356 20.34 14 18.84 14 18h-2v-2h-2v8h2v-2h4v2h2v-2c0-.388-.562-.851-1.254-1.034"/><path fill="#7e57c2" d="M24 4H4v20a4 4 0 0 0 4 4h16.16A3.84 3.84 0 0 0 28 24.16V8a4 4 0 0 0-4-4m2 14h-2v-2h-2v2c0 .193 0 .703 1.254 1.033A3.345 3.345 0 0 1 26 22v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1 2-2h2a2 2 0 0 1 2 2Z"/></svg>', D0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ffca28" d="M16 24c-5.525 0-10-.9-10-2v4c0 1.1 4.475 2 10 2s10-.9 10-2v-4c0 1.1-4.475 2-10 2m0-8c-5.525 0-10-.9-10-2v4c0 1.1 4.475 2 10 2s10-.9 10-2v-4c0 1.1-4.475 2-10 2m0-12C10.477 4 6 4.895 6 6v4c0 1.1 4.475 2 10 2s10-.9 10-2V6c0-1.105-4.477-2-10-2"/></svg>', O0 = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/><path fill="#42a5f5" d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5z"/></svg>', k0 = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m8.668 6h3.6641l-3.6641-3.668v3.668m-4.668-4.668h5.332l4 4v8c0 0.73828-0.59375 1.3359-1.332 1.3359h-8c-0.73828 0-1.332-0.59766-1.332-1.3359v-10.664c0-0.74219 0.59375-1.3359 1.332-1.3359m3.332 1.3359h-3.332v10.664h8v-6h-4.668z" fill="#90a4ae" /></svg>', P0 = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m6.922 3.768-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232" fill="#90a4ae" /></svg>', T0 = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.483 6H4.721a1 1 0 0 0-.949.684L2 12V5h12a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232l-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h11l2.403-5.606A1 1 0 0 0 14.483 6" fill="#90a4ae" /></svg>', F0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#e65100" d="m4 4 2 22 10 2 10-2 2-22Zm19.72 7H11.28l.29 3h11.86l-.802 9.335L15.99 25l-6.635-1.646L8.93 19h3.02l.19 2 3.86.77 3.84-.77.29-4H8.84L8 8h16Z"/></svg>', H0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#26a69a" d="M8.5 6h4l-4-4zM3.875 1H9.5l4 4v8.6c0 .773-.616 1.4-1.375 1.4h-8.25c-.76 0-1.375-.627-1.375-1.4V2.4c0-.777.612-1.4 1.375-1.4M4 13.6h8V8l-2.625 2.8L8 9.4zm1.25-7.7c-.76 0-1.375.627-1.375 1.4s.616 1.4 1.375 1.4c.76 0 1.375-.627 1.375-1.4S6.009 5.9 5.25 5.9"/></svg>', L0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#ffca28" d="M2 2v12h12V2zm6 6h1v4a1.003 1.003 0 0 1-1 1H7a1.003 1.003 0 0 1-1-1v-1h1v1h1zm3 0h2v1h-2v1h1a1.003 1.003 0 0 1 1 1v1a1.003 1.003 0 0 1-1 1h-2v-1h2v-1h-1a1.003 1.003 0 0 1-1-1V9a1.003 1.003 0 0 1 1-1"/></svg>', j0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path fill="#f9a825" d="M560-160v-80h120q17 0 28.5-11.5T720-280v-80q0-38 22-69t58-44v-14q-36-13-58-44t-22-69v-80q0-17-11.5-28.5T680-720H560v-80h120q50 0 85 35t35 85v80q0 17 11.5 28.5T840-560h40v160h-40q-17 0-28.5 11.5T800-360v80q0 50-35 85t-85 35zm-280 0q-50 0-85-35t-35-85v-80q0-17-11.5-28.5T120-400H80v-160h40q17 0 28.5-11.5T160-600v-80q0-50 35-85t85-35h120v80H280q-17 0-28.5 11.5T240-680v80q0 38-22 69t-58 44v14q36 13 58 44t22 69v80q0 17 11.5 28.5T280-240h120v80z"/></svg>', z0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#42a5f5" d="m14 10-4 3.5L6 10H4v12h4v-6l2 2 2-2v6h4V10zm12 6v-6h-4v6h-4l6 8 6-8z"/></svg>', K0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ef5350" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m4.93 10.44c.41.9.93 1.64 1.53 2.15l.41.32c-.87.16-2.07.44-3.34.93l-.11.04.5-1.04c.45-.87.78-1.66 1.01-2.4m6.48 3.81c.18-.18.27-.41.28-.66.03-.2-.02-.39-.12-.55-.29-.47-1.04-.69-2.28-.69l-1.29.07-.87-.58c-.63-.52-1.2-1.43-1.6-2.56l.04-.14c.33-1.33.64-2.94-.02-3.6a.85.85 0 0 0-.61-.24h-.24c-.37 0-.7.39-.79.77-.37 1.33-.15 2.06.22 3.27v.01c-.25.88-.57 1.9-1.08 2.93l-.96 1.8-.89.49c-1.2.75-1.77 1.59-1.88 2.12-.04.19-.02.36.05.54l.03.05.48.31.44.11c.81 0 1.73-.95 2.97-3.07l.18-.07c1.03-.33 2.31-.56 4.03-.75 1.03.51 2.24.74 3 .74.44 0 .74-.11.91-.3m-.41-.71.09.11c-.01.1-.04.11-.09.13h-.04l-.19.02c-.46 0-1.17-.19-1.9-.51.09-.1.13-.1.23-.1 1.4 0 1.8.25 1.9.35M7.83 17c-.65 1.19-1.24 1.85-1.69 2 .05-.38.5-1.04 1.21-1.69zm3.02-6.91c-.23-.9-.24-1.63-.07-2.05l.07-.12.15.05c.17.24.19.56.09 1.1l-.03.16-.16.82z"/></svg>', V0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#e64a19" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zM8 11v2h1v6H8v1h4v-1h-1v-2h2a3 3 0 0 0 3-3 3 3 0 0 0-3-3zm5 2a1 1 0 0 1 1 1 1 1 0 0 1-1 1h-2v-2z"/></svg>', B0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#0288d1" d="M9.86 2A2.86 2.86 0 0 0 7 4.86v1.68h4.29c.39 0 .71.57.71.96H4.86A2.86 2.86 0 0 0 2 10.36v3.781a2.86 2.86 0 0 0 2.86 2.86h1.18v-2.68a2.85 2.85 0 0 1 2.85-2.86h5.25c1.58 0 2.86-1.271 2.86-2.851V4.86A2.86 2.86 0 0 0 14.14 2zm-.72 1.61c.4 0 .72.12.72.71s-.32.891-.72.891c-.39 0-.71-.3-.71-.89s.32-.711.71-.711"/><path fill="#fdd835" d="M17.959 7v2.68a2.85 2.85 0 0 1-2.85 2.859H9.86A2.85 2.85 0 0 0 7 15.389v3.75a2.86 2.86 0 0 0 2.86 2.86h4.28A2.86 2.86 0 0 0 17 19.14v-1.68h-4.291c-.39 0-.709-.57-.709-.96h7.14A2.86 2.86 0 0 0 22 13.64V9.86A2.86 2.86 0 0 0 19.14 7zM8.32 11.513l-.004.004.038-.004zm6.54 7.276c.39 0 .71.3.71.89a.71.71 0 0 1-.71.71c-.4 0-.72-.12-.72-.71s.32-.89.72-.89"/></svg>', N0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#8bc34a" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zm4 7.5h-4v2h1l-2 1.67L10 13h1v-2H7v2h1l3 2.5L8 18H7v2h4v-2h-1l2-1.67L14 18h-1v2h4v-2h-1l-3-2.5 3-2.5h1z"/></svg>', $0 = '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 16 16"><path fill="#0288d1" d="M2 2v12h12V2zm4 6h3v1H8v4H7V9H6zm5 0h2v1h-2v1h1a1.003 1.003 0 0 1 1 1v1a1.003 1.003 0 0 1-1 1h-2v-1h2v-1h-1a1.003 1.003 0 0 1-1-1V9a1.003 1.003 0 0 1 1-1"/></svg>', W0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ff9800" d="m24 6 2 6h-4l-2-6h-3l2 6h-4l-2-6h-3l2 6H8L6 6H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3V6Z"/></svg>', U0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#01579b" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zM7 13l1.5 7h2l1.5-3 1.5 3h2l1.5-7h1v-2h-4v2h1l-.9 4.2L13 15h-2l-1.1 2.2L9 13h1v-2H6v2z"/></svg>', q0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#8bc34a" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m.12 13.5 3.74 3.74 1.42-1.41-2.33-2.33 2.33-2.33-1.42-1.41zm11.16 0-3.74-3.74-1.42 1.41 2.33 2.33-2.33 2.33 1.42 1.41z"/></svg>', G0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ff5252" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2m12 16v-2H9v2zm-4-4v-2H6v2z"/></svg>', X0 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#afb42b" d="M14 17h-2v-2h-2v-2h2v2h2m0-6h-2v2h2v2h-2v-2h-2V9h2V7h-2V5h2v2h2m5-4H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2"/></svg>', Ma = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, Ea = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, Y0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, Z0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, J0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, Q0 = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, ey = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, ty = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, ny = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, ry = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, oy = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, iy = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, sy = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, ly = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, ay = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, uy = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, cy = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, fy = `<!-- @license lucide-static v1.39.0 - ISC -->
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
`, dy = ["aria-label"], gy = {
  key: 0,
  class: "pnl-tst-tsep",
  "aria-hidden": "true"
}, py = {
  key: 1,
  class: "pnl-tst-search"
}, hy = ["innerHTML"], vy = ["value", "aria-label", "placeholder"], my = ["aria-label", "aria-keyshortcuts", "aria-disabled", "title", "tabindex", "onClick", "onFocus"], yy = ["innerHTML"], wy = {
  key: 1,
  class: "pnl-tst-empty"
}, by = ["aria-label", "aria-colcount", "aria-rowcount"], _y = {
  class: "pnl-tst-hrow",
  role: "row",
  "aria-rowindex": 1
}, Sy = ["aria-colindex", "aria-sort", "aria-keyshortcuts", "tabindex", "onClick", "onFocus", "onKeydown"], xy = { class: "pnl-tst-hlabel" }, Ry = ["innerHTML"], Cy = ["onDblclick", "onMousedown", "onTouchstart"], My = ["aria-level", "aria-posinset", "aria-setsize", "aria-rowindex", "aria-expanded", "aria-busy", "aria-selected", "aria-haspopup", "tabindex", "onClick", "onContextmenu", "onFocus"], Ey = ["aria-colindex", "onDblclick"], Iy = ["onClick"], Ay = {
  key: 1,
  class: "pnl-tst-twisty pnl-tst-twisty--leaf",
  "aria-hidden": "true"
}, Dy = ["checked", ".indeterminate", "aria-label", "onClick"], Oy = ["innerHTML"], ky = ["value", "aria-label", "aria-invalid", "onChange", "onKeydown", "onBlur"], Py = ["value"], Ty = ["checked", "aria-label", "aria-invalid", "onChange", "onKeydown", "onBlur"], Fy = ["type", "step", "min", "max", "value", "aria-label", "aria-invalid", "onKeydown", "onBlur"], Hy = {
  key: 2,
  class: "pnl-tst-value"
}, Ly = {
  key: 3,
  class: "pnl-tst-modal"
}, jy = {
  id: "pnl-tst-confirm-message",
  class: "pnl-tst-dialog-message"
}, zy = { class: "pnl-tst-dialog-actions" }, Ky = ["aria-label"], Vy = {
  key: 0,
  class: "pnl-tst-msep",
  role: "separator"
}, By = ["aria-keyshortcuts", "aria-disabled", "tabindex", "onClick", "onFocus"], Ny = ["innerHTML"], $y = { class: "pnl-tst-mlabel" }, Wy = {
  key: 0,
  class: "pnl-tst-mkeys",
  "aria-hidden": "true"
}, Uy = "title", qy = 200, Ia = 16, Aa = 6, Gy = 40, ir = "search", Vt = "|", Mn = 4, Xy = 500, Yy = 5e6, Zy = {
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
    var bl;
    const t = e, n = {
      columnSizingFeature: Xv,
      columnResizingFeature: Gv,
      rowExpandingFeature: Yv,
      rowSelectionFeature: um,
      rowSortingFeature: cm,
      coreRowModel: dc(),
      expandedRowModel: fm(),
      sortedRowModel: pm(),
      sortFns: { alphanumeric: Eh, text: Ih }
    }, r = V(() => (t.state.columns || []).length > 0), o = V(() => r.value && t.state.options.sortable !== !1), i = V(() => t.state.options.sort_folders_first === !0), l = V(() => r.value && t.state.options.resizable !== !1), u = V(
      () => (t.state.columns || []).slice(1).filter((s) => s.editable === !0)
    ), c = V(() => u.value.map((s) => String(s.id)));
    function d(s) {
      return u.value.find((a) => String(a.id) === s) ?? null;
    }
    function g(s) {
      var a;
      return String(((a = d(s)) == null ? void 0 : a.editor) || "text");
    }
    function h(s) {
      var a;
      return (((a = d(s)) == null ? void 0 : a.choices) || []).map((f) => String(f));
    }
    function y(s, a) {
      var v;
      const f = (v = d(s)) == null ? void 0 : v[a];
      return f ?? void 0;
    }
    const w = V(() => {
      const s = t.state.columns || [];
      return s.length === 0 ? [{ id: Uy, header: "", accessorFn: (a) => a.title }] : s.map((a) => {
        const f = a.field ?? a.id;
        return {
          id: a.id,
          header: a.header ?? a.id,
          // Through the type registry, because a type may carry a column value just as
          // it carries an icon, and because Python reads the same fields the same way
          // when it decides what a search reaches inside a pruned branch.
          accessorFn: (v) => R(v, f),
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
          ...i.value ? { sortFn: K } : {}
        };
      });
    });
    function D(s, a) {
      return typeof a == "number" && Number.isFinite(a) ? { [s]: a } : {};
    }
    function R(s, a) {
      const f = s == null ? void 0 : s[a];
      if (f !== void 0) return f;
      const v = (t.state.types || {})[s == null ? void 0 : s.type];
      return v && typeof v == "object" ? v[a] : void 0;
    }
    function A(s) {
      return s.subRows.length > 0 || R(s.original, "allow_children") !== !1;
    }
    function K(s, a, f) {
      const v = A(s);
      if (v !== A(a)) {
        const S = we.value.some((H) => H.id === f && H.desc);
        return (v ? -1 : 1) * (S ? -1 : 1);
      }
      return he.getColumn(f).getAutoSortFn()(s, a, f);
    }
    const x = /* @__PURE__ */ re(j(t.state.expandedKeys));
    function j(s) {
      const a = {};
      for (const f of s || []) a[f] = !0;
      return a;
    }
    function _(s) {
      return s === !0 ? he.getCoreRowModel().flatRows.filter((a) => a.subRows.length > 0).map((a) => a.id).sort() : Object.keys(s).filter((a) => s[a]).sort();
    }
    const k = {
      audio: E0,
      console: I0,
      css: A0,
      database: D0,
      document: O0,
      file: k0,
      folder: P0,
      "folder-open": T0,
      html: F0,
      image: H0,
      javascript: L0,
      json: j0,
      markdown: z0,
      pdf: K0,
      powerpoint: V0,
      python: B0,
      table: N0,
      typescript: $0,
      video: W0,
      word: U0,
      xml: q0,
      yaml: G0,
      zip: X0
    };
    function z(s) {
      return s ? { ...k, ...t.state.icons || {} }[s] ?? null : null;
    }
    function Y(s) {
      const a = R(s.original, "icon");
      return a ? (zn(s) ? z(`${a}-open`) : null) ?? z(a) : null;
    }
    function $(s, a) {
      return s.length !== a.length ? !1 : s.every((f, v) => f === a[v]);
    }
    const L = V(() => t.state.options.select_mode ?? "none"), W = V(() => L.value !== "none"), se = V(() => L.value === "hierarchy"), ce = V(
      () => W.value && t.state.options.show_checkboxes !== !1
    ), te = /* @__PURE__ */ re(j(t.state.selectedKeys)), we = /* @__PURE__ */ re(xe(t.state.sorting));
    function xe(s) {
      return (s || []).filter((a) => a && a.id).map((a) => ({ id: String(a.id), desc: a.desc === !0 }));
    }
    function fe(s, a) {
      return s.length === a.length && s.every((f, v) => f.id === a[v].id && f.desc === a[v].desc);
    }
    const oe = V(() => o.value && we.value.length > 0), ne = /* @__PURE__ */ re(Ze(t.state.columnWidths));
    function Ze(s) {
      const a = {};
      for (const [f, v] of Object.entries(s || {})) {
        const S = Math.round(Number(v));
        Number.isFinite(S) && S > 0 && (a[f] = S);
      }
      return a;
    }
    function pn(s, a) {
      const f = Object.keys(s);
      return f.length === Object.keys(a).length && f.every((v) => s[v] === a[v]);
    }
    const Be = /* @__PURE__ */ re(null), he = mm({
      features: n,
      data: V(() => t.state.view || []),
      columns: w,
      getRowId: (s) => s.key,
      getSubRows: (s) => s.children,
      // TanStack resets `expanded` whenever `data` changes. Python rewrites the
      // whole tree after every move, so leaving that on would collapse the tree on
      // each drop and push an empty `expanded_keys` back. Expansion is owned here.
      autoResetExpanded: !1,
      // The same bargain for the sort: a tree Python rewrote is not a user asking
      // for a different order, and dropping the sort on every move would undo the
      // one thing the header was pressed for.
      autoResetSorting: !1,
      enableRowSelection: W,
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
      onExpandedChange: (s) => {
        x.value = typeof s == "function" ? s(x.value) : s;
      },
      onRowSelectionChange: (s) => {
        te.value = typeof s == "function" ? s(te.value) : s;
      },
      onSortingChange: (s) => {
        we.value = xe(typeof s == "function" ? s(we.value) : s);
      },
      onColumnSizingChange: (s) => {
        ne.value = Ze(
          typeof s == "function" ? s(ne.value) : s
        );
      }
    });
    function hn(s) {
      if (s.getIsSelected()) return "all";
      if (!se.value || s.subRows.length === 0) return "none";
      const a = s.subRows.map(hn);
      return a.every((f) => f === "all") ? "all" : a.some((f) => f !== "none") ? "some" : "none";
    }
    be(() => _(te.value), t.setSelectedKeys, { flush: "post" }), be(() => _(x.value), t.setExpandedKeys, { flush: "post" }), be(
      () => t.state.expandedKeys,
      (s) => {
        $(_(x.value), [...s || []].sort()) || (x.value = j(s));
      }
    ), be(
      () => t.state.selectedKeys,
      (s) => {
        $(_(te.value), [...s || []].sort()) || (te.value = j(s));
      }
    ), be(() => we.value, t.setSorting, { flush: "post" }), be(
      () => t.state.sorting,
      (s) => {
        const a = xe(s);
        fe(we.value, a) || (we.value = a);
      }
    ), be(
      () => [ne.value, Be.value],
      ([s, a]) => {
        a || t.setColumnWidths(s);
      },
      { flush: "post" }
    ), be(
      () => t.state.columnWidths,
      (s) => {
        const a = Ze(s);
        pn(ne.value, a) || (ne.value = a);
      }
    ), be(
      () => [t.state.options.expand_all, t.state.view],
      ([s]) => {
        s && he.toggleAllRowsExpanded(!0);
      },
      { immediate: !0 }
    );
    const Wt = /* @__PURE__ */ re(t.state.filterText ?? ""), Hr = V(() => Wt.value.trim().toLowerCase()), Ae = V(() => Hr.value.length > 0);
    let Je = null, Tt = t.state.filterText ?? "";
    be(
      () => t.state.filterText,
      (s) => {
        const a = s ?? "";
        a !== Tt && (Tt = a, Wt.value = a);
      }
    );
    function Lr(s) {
      Wt.value = s, Je !== null && clearTimeout(Je), Je = setTimeout(() => {
        Je = null, Tt = Wt.value, t.setFilterText(Tt);
      }, qy);
    }
    sr(() => {
      Je !== null && clearTimeout(Je);
    });
    function Ut(s) {
      return s.getAllCells().some((a) => String(a.getValue() ?? "").toLowerCase().includes(Hr.value));
    }
    const ve = V(() => {
      if (!Ae.value) return he.getRowModel().rows;
      const s = he.getSortedRowModel().flatRows, a = /* @__PURE__ */ new Set();
      for (const f of s)
        if (Ut(f)) {
          a.add(f.id);
          for (let v = f.getParentRow(); v; v = v.getParentRow()) a.add(v.id);
        }
      return s.filter((f) => a.has(f.id));
    }), p = V(() => {
      var s;
      return ((s = he.getHeaderGroups()[0]) == null ? void 0 : s.headers) ?? [];
    }), m = V(() => t.state.options.indent_px ?? 16), b = V(() => t.state.options.aria_label ?? "Tree table"), I = V(() => Ae.value ? "No matches" : "No data"), E = V(() => r.value ? 2 : 1), C = V(() => ve.value.length + (r.value ? 1 : 0)), T = /* @__PURE__ */ re(!1), P = /* @__PURE__ */ re(null), O = /* @__PURE__ */ new Map();
    function M(s, a) {
      a ? O.set(s, a) : O.delete(s);
    }
    const N = V(() => {
      const s = p.value;
      return s.length === 0 ? null : s.some((f) => f.column.id === P.value) ? P.value : s[0].column.id;
    });
    function F(s) {
      const a = p.value;
      if (a.length === 0) return;
      const f = a[Math.max(0, Math.min(s, a.length - 1))];
      T.value = !0, P.value = f.column.id, Ke(() => {
        var v;
        return (v = O.get(f.column.id)) == null ? void 0 : v.focus();
      });
    }
    function B() {
      const s = p.value;
      F(s.findIndex((a) => a.column.id === N.value));
    }
    function U() {
      T.value = !1, ti(bn.value);
    }
    function J(s) {
      return o.value && s.column.getCanSort();
    }
    function de(s) {
      if (!J(s)) return;
      const a = s.column.getIsSorted();
      return a === "asc" ? "ascending" : a === "desc" ? "descending" : "none";
    }
    function le(s) {
      if (!J(s)) return null;
      const a = s.column.getIsSorted();
      return a ? a === "asc" ? Ea : Ma : null;
    }
    function _e(s) {
      J(s) && s.column.toggleSorting();
    }
    function Ce(s) {
      F(p.value.indexOf(s)), _e(s);
    }
    function De(s) {
      return l.value && s.column.getCanResize();
    }
    function Ne(s) {
      var v;
      const a = s.column.id;
      if (a in ne.value) return null;
      const f = Math.round(((v = O.get(a)) == null ? void 0 : v.getBoundingClientRect().width) ?? 0);
      return f <= 0 || f === s.column.getSize() ? null : (ne.value = { ...ne.value, [a]: f }, f);
    }
    async function Ft(s, a) {
      if (!De(s)) return;
      a.stopPropagation(), Ne(s) !== null && await Ke(), s.getResizeHandler()(a), Be.value = s.column.id;
      const f = () => {
        Be.value = null;
      };
      for (const v of ["mouseup", "touchend", "touchcancel"])
        document.addEventListener(v, f, { once: !0 });
    }
    function Ln(s, a) {
      if (!De(s)) return;
      const f = s.column, v = f.columnDef.minSize ?? 20, S = f.columnDef.maxSize ?? Number.MAX_SAFE_INTEGER, H = Ne(s) ?? f.getSize(), ge = Math.min(Math.max(Math.round(H + a), v), S);
      he.setColumnSizing((q) => ({ ...q, [f.id]: ge }));
    }
    function Oe(s) {
      De(s) && s.column.resetSize();
    }
    function Ge(s, a) {
      const f = p.value, v = Math.max(
        0,
        f.findIndex((S) => S.column.id === N.value)
      );
      if (a.altKey) {
        switch (a.key) {
          case "ArrowLeft":
            Ln(s, -Ia);
            break;
          case "ArrowRight":
            Ln(s, Ia);
            break;
          case "Home":
            Oe(s);
            break;
          default:
            return;
        }
        a.preventDefault(), a.stopPropagation();
        return;
      }
      switch (a.key) {
        case "ArrowLeft":
          F(v - 1);
          break;
        case "ArrowRight":
          F(v + 1);
          break;
        case "Home":
          F(0);
          break;
        case "End":
          F(f.length - 1);
          break;
        case "ArrowDown":
          U();
          break;
        case "Enter":
        case " ":
          _e(s);
          break;
        default:
          return;
      }
      a.preventDefault(), a.stopPropagation();
    }
    const jn = V(() => {
      const s = /* @__PURE__ */ new Map();
      for (const a of ve.value) {
        const f = a.parentId ?? "", v = s.get(f) ?? [];
        v.push(a.id), s.set(f, v);
      }
      return s;
    });
    function vn(s) {
      return jn.value.get(s.parentId ?? "") ?? [];
    }
    function qc(s) {
      return vn(s).indexOf(s.id) + 1;
    }
    function Gc(s) {
      return vn(s).length;
    }
    function jr(s) {
      return R(s.original, "lazy") === !0;
    }
    function mn(s) {
      return Ae.value ? (jn.value.get(s.id) ?? []).length > 0 : s.getCanExpand() || jr(s);
    }
    function zn(s) {
      return Ae.value ? mn(s) : s.getIsExpanded();
    }
    const qt = /* @__PURE__ */ re(/* @__PURE__ */ new Set());
    function Jo(s) {
      return qt.value.has(s.id) && jr(s);
    }
    function Gt(s, a) {
      if (a && jr(s) && !qt.value.has(s.id) && (qt.value = new Set(qt.value).add(s.id), t.emitEvent("lazy_load", { key: s.id })), !jr(s) || !a || x.value === !0) {
        s.toggleExpanded(a);
        return;
      }
      x.value = { ...x.value, [s.id]: !0 };
    }
    be(ve, (s) => {
      if (qt.value.size === 0) return;
      const a = new Set(s.filter((f) => Jo(f)).map((f) => f.id));
      a.size !== qt.value.size && (qt.value = a);
    });
    const Xc = V(() => {
      if (!r.value) return {};
      const s = { "--pnl-tst-total": `${he.getTotalSize()}px` };
      return p.value.forEach((a, f) => {
        s[`--pnl-tst-w${f}`] = `${a.column.getSize()}px`;
      }), s;
    }), Yc = V(() => {
      const s = p.value[0];
      return s ? s.column.id in ne.value : !1;
    });
    function Qo(s) {
      return r.value ? s === 0 && !Yc.value ? { flex: "1 0 var(--pnl-tst-w0)" } : { flex: `0 0 var(--pnl-tst-w${s})` } : { flex: "1 1 0" };
    }
    function Zc(s) {
      return { ...Qo(0), paddingInlineStart: `${s.depth * m.value}px` };
    }
    const Kn = /* @__PURE__ */ re(null), js = /* @__PURE__ */ re(null), zr = /* @__PURE__ */ re(0), Kr = /* @__PURE__ */ re(null), Vn = /* @__PURE__ */ re(0), Ht = /* @__PURE__ */ re(28);
    function ei() {
      var f;
      const s = Kn.value;
      if (!s) return;
      const a = Number.parseFloat(getComputedStyle(s).getPropertyValue("--pnl-tst-row-height"));
      Number.isFinite(a) && a > 0 && (Ht.value = a), Vn.value = ((f = js.value) == null ? void 0 : f.offsetHeight) ?? 0, Kr.value = s.clientHeight, zr.value = s.scrollTop;
    }
    const zs = V(() => {
      const s = ve.value.length;
      if (Kr.value === null) return { start: 0, end: Math.min(s, Gy) };
      const a = Math.max(0, zr.value - Vn.value), f = Math.max(0, Math.floor(a / Ht.value) - Aa), v = Math.ceil(Kr.value / Ht.value) + Aa * 2 + 1;
      return { start: f, end: Math.min(s, f + v) };
    }), Ks = V(() => {
      const s = ve.value, { start: a, end: f } = zs.value, v = s.findIndex((H) => H.id === bn.value), S = [];
      v >= 0 && v < a && S.push({ row: s[v], index: v, held: !0 });
      for (let H = a; H < f; H += 1)
        S.push({ row: s[H], index: H, held: !1 });
      return v >= f && S.push({ row: s[v], index: v, held: !0 }), S;
    });
    function Jc(s) {
      return { position: "absolute", top: `${s * Ht.value}px`, left: "0" };
    }
    const Qc = V(() => ({
      height: `${ve.value.length * Ht.value}px`,
      paddingTop: `${zs.value.start * Ht.value}px`
    }));
    function ef(s) {
      zr.value = s.currentTarget.scrollTop;
    }
    function tf(s) {
      const a = Kn.value;
      if (!a || Kr.value === null) return;
      const f = ve.value.findIndex((H) => H.id === s);
      if (f < 0) return;
      const v = f * Ht.value + Vn.value, S = v + Ht.value;
      v < a.scrollTop + Vn.value ? a.scrollTop = v - Vn.value : S > a.scrollTop + a.clientHeight && (a.scrollTop = S - a.clientHeight), zr.value = a.scrollTop;
    }
    function ti(s, a = void 0) {
      s != null && (tf(s), Ke(() => {
        var f;
        return (f = Bn.get(s)) == null ? void 0 : f.focus(a);
      }));
    }
    let yt = null;
    uo(() => {
      ei(), typeof ResizeObserver == "function" && (yt = new ResizeObserver(() => ei()), Kn.value && yt.observe(Kn.value));
    }), sr(() => {
      yt == null || yt.disconnect(), yt = null;
    });
    function nf(s) {
      Kn.value = s ?? null, yt && (yt.disconnect(), s && (yt.observe(s), Ke(ei)));
    }
    const yn = /* @__PURE__ */ re(null), wn = /* @__PURE__ */ re(!0), Bn = /* @__PURE__ */ new Map();
    function Xt(s) {
      yn.value = s, wn.value = !0, T.value = !1;
    }
    function rf(s, a) {
      a ? Bn.set(s, a) : Bn.delete(s);
    }
    const bn = V(() => {
      const s = ve.value;
      return s.length === 0 ? null : s.some((a) => a.id === yn.value) ? yn.value : s[0].id;
    });
    function je(s) {
      s != null && (Xt(s), ti(s));
    }
    function Vr(s) {
      const a = ve.value;
      a.length !== 0 && je(a[Math.max(0, Math.min(s, a.length - 1))].id);
    }
    function Vs(s, a) {
      const f = ve.value;
      if (f.length === 0) return;
      const v = f[Math.max(0, Math.min(s, f.length - 1))], S = (a == null ? void 0 : a.shiftKey) && W.value && L.value !== "single";
      S && wt.value === null && (wt.value = bn.value), je(v.id), S && Bs(v, !1);
    }
    function of(s) {
      const a = ve.value;
      if (a.length === 0) return;
      const f = Math.max(
        0,
        a.findIndex((H) => H.id === bn.value)
      ), v = a[f];
      if (s.ctrlKey || s.metaKey) {
        const H = {
          a: "select-all",
          c: "copy",
          f: ir,
          v: "paste",
          x: "cut",
          z: s.shiftKey ? "redo" : "undo"
        }[s.key.toLowerCase()];
        if (H && Nn(H)) {
          s.preventDefault(), oi(H);
          return;
        }
      }
      if (s.altKey) {
        const H = {
          ArrowUp: "move-up",
          ArrowDown: "move-down",
          ArrowLeft: "outdent",
          ArrowRight: "indent"
        }[s.key];
        if (H && Nn(H)) {
          s.preventDefault(), oi(H);
          return;
        }
      }
      if (Yr.value && (s.key === "ContextMenu" || s.key === "F10" && s.shiftKey)) {
        s.preventDefault(), Bf(v);
        return;
      }
      const S = {
        Insert: s.shiftKey ? "new-file" : "new-folder",
        F2: "rename",
        Delete: "delete",
        Escape: "clear-selection"
      }[s.key];
      if (S && Nn(S)) {
        s.preventDefault(), oi(S);
        return;
      }
      switch (s.key) {
        case "ArrowDown":
          s.preventDefault(), Vs(f + 1, s);
          break;
        case "ArrowUp":
          s.preventDefault(), f === 0 && r.value && !s.shiftKey ? B() : Vs(f - 1, s);
          break;
        case "ArrowRight":
          if (s.preventDefault(), !mn(v)) break;
          zn(v) ? Vr(f + 1) : (Gt(v, !0), je(v.id));
          break;
        case "ArrowLeft":
          s.preventDefault(), !Ae.value && mn(v) && v.getIsExpanded() ? (Gt(v, !1), je(v.id)) : v.parentId && je(v.parentId);
          break;
        case "Home":
          s.preventDefault(), Vr(0);
          break;
        case "End":
          s.preventDefault(), Vr(a.length - 1);
          break;
        case "F2":
          if (c.value.length === 0) break;
          s.preventDefault(), Yt(v.id, c.value[0]);
          break;
        case "Enter":
          s.preventDefault(), c.value.length > 0 ? Yt(v.id, c.value[0]) : t.emitEvent("activate", { key: v.id });
          break;
        case " ":
          if (!W.value) break;
          s.preventDefault(), Us(v);
          break;
      }
    }
    const wt = /* @__PURE__ */ re(null);
    function Br(s) {
      wt.value = s.id, te.value = {}, s.toggleSelected(!0, { selectChildren: !1 });
    }
    function Bs(s, a) {
      const f = ve.value, v = f.findIndex((q) => q.id === wt.value), S = f.findIndex((q) => q.id === s.id);
      if (S === -1) return;
      if (v === -1) {
        Br(s);
        return;
      }
      a || (te.value = {});
      const [H, ge] = v <= S ? [v, S] : [S, v];
      for (let q = H; q <= ge; q += 1)
        f[q].toggleSelected(!0, { selectChildren: !1 });
    }
    const sf = V(() => t.state.options.toggle_on_click === !0);
    function lf(s) {
      const a = _(te.value);
      return a.length === 1 && a[0] === s.id;
    }
    function Ns() {
      te.value = {}, wt.value = null, wn.value = !1;
    }
    function $s() {
      _(te.value).length === 0 && (wn.value = !1);
    }
    be(
      () => _(te.value).length > 0,
      (s) => {
        s && (wn.value = !0);
      }
    );
    function af(s, a) {
      Xt(s.id);
      const f = !!(a != null && a.shiftKey || a != null && a.ctrlKey || a != null && a.metaKey);
      W.value && !f && sf.value && lf(s) ? Ns() : W.value && L.value !== "single" ? a != null && a.shiftKey ? Bs(s, a.ctrlKey || a.metaKey) : a != null && a.ctrlKey || a != null && a.metaKey ? (wt.value = s.id, ff(s)) : Br(s) : W.value && Br(s), t.emitEvent("activate", { key: s.id });
    }
    function uf(s) {
      Xt(s.id), !Ae.value && Gt(s, !s.getIsExpanded());
    }
    function Ws(s) {
      return hn(s) === "all";
    }
    function cf(s) {
      return hn(s) === "some";
    }
    function ff(s) {
      Xt(s.id), s.toggleSelected(void 0, { selectChildren: !1 }), $s();
    }
    function Us(s) {
      Xt(s.id), s.toggleSelected(!Ws(s), {
        selectChildren: se.value,
        deselectParents: se.value
      }), $s();
    }
    function df(s) {
      Us(s), je(s.id);
    }
    const ni = {
      "new-folder": { icon: ty, label: "New folder", keys: "Insert", node: {} },
      "new-file": {
        icon: ey,
        label: "New file",
        keys: "Shift+Insert",
        node: { allow_children: !1 }
      },
      rename: { icon: oy, label: "Rename", keys: "F2" },
      delete: { icon: cy, label: "Delete", keys: "Delete" },
      undo: { icon: fy, label: "Undo", keys: "Control+Z" },
      redo: { icon: iy, label: "Redo", keys: "Control+Shift+Z" },
      cut: { icon: sy, label: "Cut", keys: "Control+X" },
      copy: { icon: Q0, label: "Copy", keys: "Control+C" },
      paste: { icon: J0, label: "Paste", keys: "Control+V" },
      "move-up": { icon: Ea, label: "Move up", keys: "Alt+ArrowUp" },
      "move-down": { icon: Ma, label: "Move down", keys: "Alt+ArrowDown" },
      outdent: { icon: ny, label: "Outdent", keys: "Alt+ArrowLeft" },
      indent: { icon: ry, label: "Indent", keys: "Alt+ArrowRight" },
      "expand-all": { icon: Y0, label: "Expand all" },
      "collapse-all": { icon: Z0, label: "Collapse all" },
      "select-all": { icon: uy, label: "Select all", keys: "Control+A" },
      "clear-selection": { icon: ay, label: "Clear selection", keys: "Escape" }
    }, gf = [
      "undo",
      "redo",
      Vt,
      "new-folder",
      "new-file",
      "rename",
      "delete",
      Vt,
      "cut",
      "copy",
      "paste",
      Vt,
      "move-up",
      "move-down",
      "outdent",
      "indent",
      Vt,
      "expand-all",
      "collapse-all",
      Vt,
      "select-all",
      "clear-selection",
      ir
    ], pf = [
      "new-folder",
      "new-file",
      Vt,
      "rename",
      "delete",
      Vt,
      "cut",
      "copy",
      "paste"
    ];
    function qs(s, a) {
      const f = s === !0 ? a : Array.isArray(s) ? s : [], v = [];
      return f.forEach((S, H) => {
        const ge = typeof S == "string" ? {} : S || {}, q = typeof S == "string" ? S : ge.id, _l = `${q}#${H}`;
        if (q === Vt || q === ir) {
          v.push({ uid: _l, id: q });
          return;
        }
        const nr = ni[q];
        if (!nr) return;
        const Sl = ge.label ?? nr.label;
        v.push({
          uid: _l,
          id: q,
          label: Sl,
          icon: z(ge.icon) ?? nr.icon,
          keys: nr.keys,
          node: { title: Sl, ...nr.node ?? {}, ...ge.node ?? {} }
        });
      }), v;
    }
    const Nr = V(() => qs(t.state.options.toolbar, gf)), ri = V(
      () => qs(t.state.options.menu, pf).filter((s) => s.id !== ir)
    ), hf = V(() => Nr.value.length > 0), vf = V(() => t.state.options.toolbar_label ?? "Tree actions"), Gs = V(() => t.state.options.search_label ?? "Search");
    function Xs(s) {
      return Nr.value.find((a) => a.id === s) ?? ri.value.find((a) => a.id === s) ?? null;
    }
    function Nn(s) {
      return Xs(s) !== null;
    }
    function oi(s) {
      const a = Xs(s);
      a && gi(a);
    }
    const ze = V(() => ve.value.find((s) => s.id === bn.value) ?? null);
    function mf(s) {
      return ve.value.filter((a) => (a.parentId ?? "") === (s.parentId ?? ""));
    }
    function Ys() {
      const s = ze.value;
      if (!s) return [];
      const a = pl(s), f = s.parentId ?? "";
      return a.every((S) => {
        var H;
        return (((H = xn(S)) == null ? void 0 : H.parentId) ?? "") === f;
      }) ? a : [s.id];
    }
    function ii() {
      const s = ze.value;
      if (!s) return [];
      if (!W.value || !s.getIsSelected()) return [s.id];
      const a = ve.value.filter((f) => f.getIsSelected()).map((f) => f.id);
      return a.length > 0 ? a : [s.id];
    }
    const si = V(() => {
      var s;
      return ((s = t.state.clipboard) == null ? void 0 : s.keys) ?? [];
    }), yf = V(() => {
      var a;
      const s = new Set(((a = t.state.clipboard) == null ? void 0 : a.mode) === "cut" ? si.value : []);
      return s.size === 0 || ve.value.forEach((f) => {
        f.parentId && s.has(f.parentId) && s.add(f.id);
      }), s;
    });
    function $n(s) {
      const a = ze.value;
      if (!a) return null;
      const f = new Set(Ys()), v = mf(a), S = v.map((ge, q) => f.has(ge.id) ? q : -1).filter((ge) => ge >= 0);
      if (S.length === 0) return null;
      let H = (s < 0 ? Math.min(...S) : Math.max(...S)) + s;
      for (; H >= 0 && H < v.length && f.has(v[H].id); ) H += s;
      return v[H] ?? null;
    }
    let $e = null;
    be(
      () => t.state.view,
      () => {
        const s = $e;
        if ($e = null, !!s) {
          if (s.editor) {
            Ke(() => {
              var a;
              return (a = jt.value) == null ? void 0 : a.focus();
            });
            return;
          }
          if (s.key !== void 0) {
            je(s.key);
            return;
          }
          Ke(() => {
            s.index !== void 0 ? Vr(s.index) : s.pasted !== void 0 ? bf(s.pasted) : wf(s.added);
          });
        }
      }
    );
    function wf(s) {
      const a = he.getCoreRowModel().flatRows.find((f) => !s.has(f.id));
      a && (je(a.id), W.value && (te.value = {}, wt.value = a.id, a.toggleSelected(!0, { selectChildren: !1 })), Nn("rename") && Ke(() => Un(a.id, !0)));
    }
    function bf(s) {
      const a = he.getCoreRowModel().flatRows.filter((S) => !s.has(S.id)), f = new Set(a.map((S) => S.id)), v = a.filter((S) => !f.has(S.parentId ?? ""));
      v.length !== 0 && (je(v[0].id), W.value && (te.value = {}, wt.value = v[0].id, v.forEach((S) => S.toggleSelected(!0, { selectChildren: !1 }))));
    }
    const bt = /* @__PURE__ */ re(null), Re = /* @__PURE__ */ re(""), Lt = /* @__PURE__ */ re(""), jt = /* @__PURE__ */ re(null), $r = /* @__PURE__ */ re(!1), Qe = /* @__PURE__ */ re(!1), _t = /* @__PURE__ */ re(null), li = /* @__PURE__ */ re(null), ai = /* @__PURE__ */ re(null), _f = V(() => t.state.options.extension_warning !== !1);
    function Zs(s) {
      const a = String(s ?? ""), f = a.lastIndexOf(".");
      return f < 0 ? "" : a.slice(f + 1).toLowerCase();
    }
    function Sf(s, a) {
      return _f.value && R(s, "allow_children") === !1 && Zs(a) !== Zs(s.title ?? "");
    }
    let Wn = null;
    function Un(s, a = !1) {
      const f = xn(s);
      f && (Wn = a ? s : null, Js(s, "", f.original.title ?? ""));
    }
    function Yt(s, a) {
      const f = xn(s), v = d(a);
      if (!f || !v) return;
      Wn = null;
      const S = rl(f, a);
      $r.value = S === !0, Js(s, a, S === !0 || S === !1 ? "" : S);
    }
    function Js(s, a, f) {
      Qe.value = !1, Lt.value = f, bt.value = s, Re.value = a, t.setEditingKey(s), t.setEditingColumn(a), Ke(() => {
        var v, S, H;
        (v = jt.value) == null || v.focus(), (H = (S = jt.value) == null ? void 0 : S.select) == null || H.call(S);
      });
    }
    function qn() {
      Wn = null, _t.value = null, bt.value = null, Re.value = "", Qe.value = !1, t.setEditingKey(""), t.setEditingColumn("");
    }
    function Qs(s, a) {
      return s === 0 ? "" : String(a.column.id);
    }
    function xf(s, a, f) {
      return bt.value === s.id && Re.value === Qs(a, f);
    }
    function el(s, a) {
      return s > 0 && c.value.includes(String(a.column.id));
    }
    function Rf(s, a, f) {
      el(a, f) && Yt(s.id, String(f.column.id));
    }
    function ui(s, a, f) {
      const v = s.original.title ?? s.id;
      if (a === 0) return `Rename ${v}`;
      const S = d(String(f.column.id));
      return `${(S == null ? void 0 : S.header) ?? f.column.id} of ${v}`;
    }
    function Cf(s) {
      Lt.value = s, Qe.value = !1;
    }
    function tl(s, a, f) {
      Qe.value = !1, g(a) === "checkbox" ? $r.value = f === !0 : Lt.value = String(f), nl(s, a);
    }
    function Mf(s, a = null) {
      if (_t.value || bt.value !== s.id || Re.value !== "") return;
      const f = Lt.value.trim(), v = f.length > 0 && f !== (s.original.title ?? "");
      if (v && Wn !== s.id && Sf(s.original, f)) {
        _t.value = { key: s.id, title: f, previous: s.original.title ?? s.id }, Ke(() => {
          var S;
          return (S = ai.value) == null ? void 0 : S.focus();
        });
        return;
      }
      if (ol(s, a), !v) {
        a === null && je(s.id);
        return;
      }
      $e = a === null ? { key: s.id } : { editor: !0 }, t.emitEvent("rename", { key: s.id, title: f });
    }
    function nl(s, a, f = null) {
      if (bt.value !== s.id || Re.value !== a) return;
      const v = g(a) === "checkbox" ? $r.value : Lt.value, S = v !== rl(s, a);
      if (ol(s, f), !S) {
        f === null && je(s.id);
        return;
      }
      $e = f === null ? { key: s.id } : { editor: !0 }, t.emitEvent("edit", { key: s.id, column: a, value: v });
    }
    function rl(s, a) {
      const f = d(a), v = R(s.original, (f == null ? void 0 : f.field) ?? a);
      return g(a) === "checkbox" ? v === !0 : v == null ? "" : String(v);
    }
    function ol(s, a) {
      a === null ? qn() : a === "" ? Un(s.id) : Yt(s.id, a);
    }
    function ci(s, a = null) {
      Re.value === "" ? Mf(s, a) : nl(s, Re.value, a);
    }
    function fi(s, a, f) {
      bt.value === s.id && Re.value === Qs(a, f) && ci(s);
    }
    function il() {
      const { key: s, title: a } = _t.value;
      _t.value = null, qn(), $e = { key: s }, t.emitEvent("rename", { key: s, title: a });
    }
    function sl() {
      _t.value = null, Ke(() => {
        var s, a;
        (s = jt.value) == null || s.focus(), (a = jt.value) == null || a.select();
      });
    }
    function Ef(s) {
      var v;
      const a = s.key;
      if (a === "Escape" || a === "n" || a === "N") {
        s.preventDefault(), sl();
        return;
      }
      if (a === "y" || a === "Y") {
        s.preventDefault(), il();
        return;
      }
      if (a !== "Tab" && a !== "ArrowLeft" && a !== "ArrowRight") return;
      s.preventDefault(), (v = (s.target === li.value ? ai : li).value) == null || v.focus();
    }
    function If(s) {
      if (bt.value !== s.id) return;
      const a = Wn === s.id;
      if (qn(), !a) {
        je(s.id);
        return;
      }
      $e = { index: ve.value.findIndex((f) => f.id === s.id) }, t.emitEvent("delete", { key: s.id, keys: [s.id] });
    }
    function Af() {
      return [...Nn("rename") ? [""] : [], ...c.value];
    }
    function Df(s, a) {
      const f = Af(), v = f.indexOf(s);
      if (v < 0) return null;
      const S = f[v + a];
      return S === void 0 ? null : S;
    }
    function di(s, a) {
      if (a.key === "Enter")
        a.preventDefault(), ci(s);
      else if (a.key === "Escape")
        a.preventDefault(), Re.value === "" ? If(s) : (qn(), je(s.id));
      else if (a.key === "Tab") {
        const f = Df(Re.value, a.shiftKey ? -1 : 1);
        if (f === null) return;
        a.preventDefault(), ci(s, f);
      }
    }
    be(
      () => [t.state.editingKey || "", t.state.editingColumn || ""],
      ([s, a]) => {
        s === (bt.value || "") && a === Re.value || (s ? a ? Yt(s, a) : Un(s) : qn());
      }
    );
    let ll = ((bl = t.state.editError) == null ? void 0 : bl.seq) ?? 0;
    be(
      () => t.state.editError,
      (s) => {
        const a = (s == null ? void 0 : s.seq) ?? 0;
        if (!(s != null && s.key) || a === ll) return;
        ll = a;
        const f = String(s.column || "");
        d(f) && (Yt(s.key, f), bt.value === s.key && (Lt.value = s.value === void 0 || s.value === null ? "" : String(s.value), Qe.value = !0));
      }
    ), uo(() => {
      t.state.editingKey && (t.state.editingColumn ? Yt(t.state.editingKey, t.state.editingColumn) : Un(t.state.editingKey));
    });
    function Wr(s, a) {
      const f = ze.value;
      !f || !s || ($e = { key: f.id }, t.emitEvent("move", {
        key: f.id,
        keys: Ys(),
        position: a,
        anchorKey: s.id
      }));
    }
    function Of(s) {
      const a = ze.value, f = a ? R(a.original, "allow_children") === !1 ? "after" : "child" : null;
      a && f === "child" && !Ae.value && Gt(a, !0), $e = { added: new Set(he.getCoreRowModel().flatRows.map((v) => v.id)) }, t.emitEvent("add", { anchorKey: (a == null ? void 0 : a.id) ?? null, position: f, node: s.node });
    }
    function kf() {
      var a;
      const s = ii();
      s.length !== 0 && ($e = { index: ve.value.findIndex((f) => {
        var v;
        return f.id === ((v = ze.value) == null ? void 0 : v.id);
      }) }, t.emitEvent("delete", { key: ((a = ze.value) == null ? void 0 : a.id) ?? null, keys: s }));
    }
    function Pf(s) {
      $e = { index: ve.value.findIndex((a) => {
        var f;
        return a.id === ((f = ze.value) == null ? void 0 : f.id);
      }) }, t.emitEvent(s, {});
    }
    function Tf(s) {
      var f;
      const a = ii();
      a.length !== 0 && t.emitEvent(s, { key: ((f = ze.value) == null ? void 0 : f.id) ?? null, keys: a });
    }
    function Ff() {
      var v;
      const s = ze.value, a = s ? R(s.original, "allow_children") === !1 ? "after" : "child" : null;
      s && a === "child" && !Ae.value && Gt(s, !0);
      const f = si.value;
      $e = ((v = t.state.clipboard) == null ? void 0 : v.mode) === "cut" ? { key: f[0] } : { pasted: new Set(he.getCoreRowModel().flatRows.map((S) => S.id)) }, t.emitEvent("paste", { anchorKey: (s == null ? void 0 : s.id) ?? null, position: a });
    }
    function Gn(s) {
      var a;
      switch (s.id) {
        case "new-folder":
        case "new-file":
          return !0;
        case "rename":
          return ze.value !== null;
        case "delete":
        case "cut":
        case "copy":
          return ii().length > 0;
        case "paste":
          return si.value.length > 0;
        case "undo":
          return t.state.canUndo === !0;
        case "redo":
          return t.state.canRedo === !0;
        case "move-up":
        case "move-down":
          return !oe.value && $n(s.id === "move-up" ? -1 : 1) !== null;
        case "indent": {
          const f = $n(-1);
          return f !== null && R(f.original, "allow_children") !== !1;
        }
        case "outdent":
          return !!((a = ze.value) != null && a.parentId);
        case "expand-all":
        case "collapse-all":
          return ve.value.length > 0 && !Ae.value;
        case "select-all":
          return ve.value.length > 0 && W.value && L.value !== "single";
        case "clear-selection":
          return W.value && _(te.value).length > 0;
        default:
          return !0;
      }
    }
    function al(s) {
      return s.keys ? s.keys.replace("Control", "Ctrl") : "";
    }
    function Hf(s) {
      return s.keys ? `${s.label} (${al(s)})` : s.label;
    }
    function gi(s) {
      var a, f, v, S;
      if (Gn(s))
        switch (s.id) {
          case "new-folder":
          case "new-file":
            Of(s);
            break;
          case "rename":
            Un(ze.value.id);
            break;
          case "delete":
            kf();
            break;
          case "undo":
          case "redo":
            Pf(s.id);
            break;
          case "cut":
          case "copy":
            Tf(s.id);
            break;
          case "paste":
            Ff();
            break;
          case "move-up":
            Wr($n(-1), "before");
            break;
          case "move-down":
            Wr($n(1), "after");
            break;
          case "indent": {
            const H = $n(-1);
            H && !Ae.value && Gt(H, !0), Wr(H, "child");
            break;
          }
          case "outdent":
            Wr(xn((a = ze.value) == null ? void 0 : a.parentId), "after");
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
            Ns();
            break;
          case ir:
            (v = pi.value) == null || v.focus(), (S = pi.value) == null || S.select();
            break;
        }
    }
    const pi = /* @__PURE__ */ re(null), hi = V(() => Nr.value.filter((s) => s.id in ni)), Ur = /* @__PURE__ */ re(null), vi = /* @__PURE__ */ new Map(), ul = V(() => {
      const s = hi.value;
      return s.length === 0 ? null : s.some((a) => a.uid === Ur.value) ? Ur.value : s[0].uid;
    });
    function Lf(s, a) {
      a ? vi.set(s, a) : vi.delete(s);
    }
    function qr(s) {
      const a = hi.value;
      if (a.length === 0) return;
      const f = a[Math.max(0, Math.min(s, a.length - 1))].uid;
      Ur.value = f, Ke(() => {
        var v;
        return (v = vi.get(f)) == null ? void 0 : v.focus();
      });
    }
    function jf(s) {
      const a = hi.value, f = Math.max(
        0,
        a.findIndex((v) => v.uid === ul.value)
      );
      switch (s.key) {
        case "ArrowRight":
          s.preventDefault(), qr(f + 1);
          break;
        case "ArrowLeft":
          s.preventDefault(), qr(f - 1);
          break;
        case "Home":
          s.preventDefault(), qr(0);
          break;
        case "End":
          s.preventDefault(), qr(a.length - 1);
          break;
      }
    }
    const Xn = /* @__PURE__ */ re(!1), Gr = /* @__PURE__ */ re(null), Yn = /* @__PURE__ */ re({ left: 0, top: 0 }), Xr = /* @__PURE__ */ re(null), _n = /* @__PURE__ */ re(0), mi = /* @__PURE__ */ new Map(), Zn = V(() => ri.value.filter((s) => s.id in ni)), Yr = V(() => Zn.value.length > 0), zf = V(() => t.state.options.menu_label ?? "Row actions");
    function Kf(s, a) {
      a ? mi.set(s, a) : mi.delete(s);
    }
    function cl(s) {
      return Zn.value.findIndex((a) => a.uid === s.uid);
    }
    function fl(s, a, f) {
      if (!Yr.value) return;
      yn.value !== s.id && Xt(s.id), Gr.value = s.id, Yn.value = { left: a, top: f };
      const v = Zn.value.findIndex((S) => Gn(S));
      _n.value = Math.max(0, v), Xn.value = !0, Ke(Nf);
    }
    function Vf(s, a) {
      Yr.value && (a.preventDefault(), W.value && !s.getIsSelected() && Br(s), fl(s, a.clientX, a.clientY));
    }
    function Bf(s) {
      var f;
      const a = (f = Bn.get(s.id)) == null ? void 0 : f.getBoundingClientRect();
      fl(s, a ? a.left + m.value : Mn, a ? a.bottom : Mn);
    }
    function Nf() {
      const s = Xr.value;
      if (!s) return;
      const a = s.getBoundingClientRect();
      let { left: f, top: v } = Yn.value;
      f + a.width > window.innerWidth - Mn && (f = Math.max(Mn, f - a.width)), v + a.height > window.innerHeight - Mn && (v = Math.max(Mn, v - a.height)), Yn.value = { left: f, top: v }, Jn(_n.value);
    }
    function Jn(s) {
      const a = Zn.value;
      if (a.length === 0) return;
      const f = Math.max(0, Math.min(s, a.length - 1));
      _n.value = f, Ke(() => {
        var v;
        return (v = mi.get(a[f].uid)) == null ? void 0 : v.focus();
      });
    }
    function Zr(s = !0, a = void 0) {
      if (!Xn.value) return;
      const f = Gr.value;
      Xn.value = !1, Gr.value = null, s && f != null && ti(f, a);
    }
    function $f(s) {
      if (!Gn(s)) return;
      const a = Gr.value;
      Zr(!1), je(a), gi(s);
    }
    function Wf(s) {
      const a = _n.value;
      switch (s.key) {
        case "ArrowDown":
          s.preventDefault(), Jn(a + 1);
          break;
        case "ArrowUp":
          s.preventDefault(), Jn(a - 1);
          break;
        case "Home":
          s.preventDefault(), Jn(0);
          break;
        case "End":
          s.preventDefault(), Jn(Zn.value.length - 1);
          break;
        case "Escape":
        case "Tab":
          s.preventDefault(), Zr();
          break;
      }
    }
    function yi(s) {
      Xr.value && s.composedPath().includes(Xr.value) || Zr(!1);
    }
    function Sn() {
      Zr(!0, { preventScroll: !0 });
    }
    be(Xn, (s) => {
      s ? (document.addEventListener("pointerdown", yi, !0), window.addEventListener("resize", Sn), window.addEventListener("scroll", Sn, !0)) : (document.removeEventListener("pointerdown", yi, !0), window.removeEventListener("resize", Sn), window.removeEventListener("scroll", Sn, !0));
    }), sr(() => {
      document.removeEventListener("pointerdown", yi, !0), window.removeEventListener("resize", Sn), window.removeEventListener("scroll", Sn, !0);
    });
    const Uf = ["reorder-above", "reorder-below", "make-child", "reparent"], Zt = V(() => t.state.options.enable_dnd === !0), wi = V(() => String(t.state.options.transfer_group || "")), Jt = V(() => String(t.state.tableId || "")), qf = ["meta", "content"], dl = V(() => {
      const s = t.state.options.drop_files;
      return s === !0 ? "meta" : qf.includes(s) ? s : "none";
    }), Qn = V(() => dl.value !== "none"), Gf = V(() => (t.state.options.drop_accept || []).map((s) => String(s).toLowerCase())), Xf = V(() => {
      const s = Number(t.state.options.drop_max_bytes);
      return Number.isFinite(s) && s > 0 ? s : Yy;
    }), gl = /* @__PURE__ */ re([]), Jr = /* @__PURE__ */ re(null);
    function xn(s) {
      return ve.value.find((a) => a.id === s) ?? null;
    }
    function Yf(s, a) {
      let f = s;
      for (; f; ) {
        if (a.includes(f.id)) return !0;
        f = f.getParentRow();
      }
      return !1;
    }
    function pl(s) {
      if (!W.value || !s.getIsSelected()) return [s.id];
      const a = /* @__PURE__ */ new Set();
      for (let v = s.getParentRow(); v; v = v.getParentRow()) a.add(v.id);
      const f = ve.value.filter((v) => v.getIsSelected() && !a.has(v.id)).map((v) => v.id);
      return f.length > 1 ? f : [s.id];
    }
    function hl(s, a, f) {
      if (!f && Yf(s, a)) return Uf;
      const v = oe.value ? ["reorder-above", "reorder-below"] : [];
      return R(s.original, "allow_children") === !1 && v.push("make-child"), v;
    }
    function vl(s) {
      if (mn(s) && zn(s)) return "expanded";
      const a = vn(s);
      return a[a.length - 1] === s.id ? "last-in-group" : "standard";
    }
    let bi = null, er = null;
    function _i() {
      er && clearTimeout(er), er = null, bi = null;
    }
    function Zf(s, a) {
      if (bi === s || (_i(), !a || a.type === "instruction-blocked")) return;
      const f = xn(s);
      !f || !f.getCanExpand() || f.getIsExpanded() || (bi = s, er = setTimeout(() => {
        er = null;
        const v = xn(s);
        v && v.getCanExpand() && !v.getIsExpanded() && Gt(v, !0);
      }, Xy));
    }
    function Jf() {
      Jr.value = null, _i();
    }
    function Qf(s, a) {
      const f = Gf.value;
      if (f.length === 0) return !0;
      const v = String(s || "").toLowerCase(), S = String(a || "").toLowerCase();
      return f.some((H) => H.startsWith(".") ? S.endsWith(H) : H.endsWith("/*") ? v.startsWith(H.slice(0, -1)) : v === H);
    }
    async function ed(s) {
      const a = new Uint8Array(await s.arrayBuffer()), f = 32768;
      let v = "";
      for (let S = 0; S < a.length; S += f)
        v += String.fromCharCode(...a.subarray(S, S + f));
      return btoa(v);
    }
    async function td(s) {
      const a = {
        name: String(s.name || ""),
        size: Number(s.size || 0),
        mime: String(s.type || ""),
        last_modified: Number(s.lastModified || 0)
      }, f = Qf(a.mime, a.name) && a.size <= Xf.value;
      return dl.value === "content" && f && (a.content = await ed(s)), a;
    }
    const ml = /* @__PURE__ */ re(null);
    function nd() {
      let s = ml.value;
      if (!s) return null;
      let a = s.getRootNode();
      for (; a.host; )
        s = a.host, a = s.getRootNode();
      return s;
    }
    function tr(s) {
      for (const { row: a } of Ks.value) {
        const f = Bn.get(a.id);
        if (!f) continue;
        const v = f.getBoundingClientRect();
        if (s.clientX >= v.left && s.clientX < v.right && s.clientY >= v.top && s.clientY < v.bottom)
          return { row: a, element: f, rect: v };
      }
      return null;
    }
    function rd(s, a) {
      const f = ".pnl-tst-check, .pnl-tst-twisty, .pnl-tst-edit";
      for (const v of s.element.querySelectorAll(f)) {
        const S = v.getBoundingClientRect();
        if (a.clientX >= S.left && a.clientX < S.right && a.clientY >= S.top && a.clientY < S.bottom)
          return !0;
      }
      return !1;
    }
    const od = {
      id: () => Jt.value,
      acceptsFiles: () => Qn.value,
      // Anything outside a row (the header, the empty space below the last row) is
      // not a drag handle, and neither is a row control. Nor is any row at all in a
      // table that joined the host for file drops alone.
      canDragFrom(s) {
        if (!Zt.value) return !1;
        const a = tr(s);
        return a !== null && !rd(a, s);
      },
      dragData(s) {
        if (!Zt.value) return null;
        const a = tr(s);
        return a ? {
          type: kn,
          group: wi.value,
          sourceId: Jt.value,
          key: a.row.id,
          keys: pl(a.row)
        } : null;
      },
      // The registered element is the host, so the default preview would be a
      // snapshot of the whole layout. Point it at the row being dragged, offset so
      // the preview stays under the cursor where it was grabbed.
      preview(s, a) {
        if (!Zt.value) return !1;
        const f = tr(s);
        return f ? (a(f.element, s.clientX - f.rect.left, s.clientY - f.rect.top), !0) : !1;
      },
      setDragging(s) {
        gl.value = s;
      },
      // Our own rows always. Another pane's only when both name the same group, so a
      // table that opted into nothing shows no drop state at all rather than
      // accepting a drag Python is bound to reject.
      dropData(s, a) {
        if (!Zt.value) return null;
        const f = tr(s);
        if (!f) return null;
        const v = a.sourceId !== Jt.value;
        if (v && !(wi.value && a.group === wi.value))
          return { type: kn, key: null, paneId: Jt.value };
        const S = { type: kn, key: f.row.id, paneId: Jt.value };
        return la(S, {
          element: f.element,
          input: s,
          currentLevel: f.row.depth,
          indentPerLevel: m.value,
          mode: vl(f.row),
          block: hl(f.row, a.keys ?? [], v)
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
      externalDropData(s) {
        if (!Qn.value) return null;
        const a = tr(s);
        if (!a) return null;
        const f = { type: Wc, key: a.row.id, paneId: Jt.value };
        return la(f, {
          element: a.element,
          input: s,
          currentLevel: a.row.depth,
          indentPerLevel: m.value,
          mode: vl(a.row),
          block: hl(a.row, [], !0)
        });
      },
      // Reading the bytes is asynchronous, so the intent is emitted after the drop
      // has already finished as far as the browser is concerned. Nothing waits on it:
      // the rows arrive when Python has written them, exactly as they do for a
      // transfer, and the tree is untouched until then.
      async dropFiles(s, a, f) {
        if (!Qn.value || s.length === 0) return;
        const v = await Promise.all(s.map(td));
        $e = { pasted: new Set(he.getCoreRowModel().flatRows.map((S) => S.id)) }, t.emitEvent("drop_files", {
          files: v,
          targetKey: a,
          instruction: f.type,
          desiredLevel: f.desiredLevel ?? f.currentLevel
        });
      },
      showDrop(s, a) {
        Jr.value = { key: s, instruction: a }, Zf(s, a);
      },
      clearDrop: Jf,
      drop(s, a, f, v) {
        const S = s.keys ?? [];
        if (S.length === 0) return;
        const H = {
          targetKey: a,
          instruction: f.type,
          desiredLevel: f.desiredLevel ?? f.currentLevel
        };
        if (s.sourceId === Jt.value) {
          if (S.includes(a)) return;
          t.emitEvent("move", { key: s.key, keys: S, ...H });
          return;
        }
        $e = { pasted: new Set(he.getCoreRowModel().flatRows.map((ge) => ge.id)) }, t.emitEvent("transfer", {
          keys: S,
          sourceId: s.sourceId,
          copy: !!(v != null && v.ctrlKey || v != null && v.altKey),
          ...H
        });
      }
    };
    let zt = null;
    function yl() {
      zt == null || zt(), zt = null;
      const s = nd();
      !s || !(Zt.value || Qn.value) || (zt = M0(s, od));
    }
    uo(yl), be([Zt, Qn], yl), sr(() => {
      _i(), zt == null || zt();
    });
    function Si(s) {
      var a;
      return ((a = Jr.value) == null ? void 0 : a.key) === s.id ? Jr.value.instruction : null;
    }
    function id(s) {
      const a = R(s.original, "class");
      return typeof a == "string" ? a : null;
    }
    function sd(s) {
      const a = Si(s);
      return {
        "pnl-tst-row--draggable": Zt.value,
        "pnl-tst-row--dragging": gl.value.includes(s.id),
        "pnl-tst-row--blocked": (a == null ? void 0 : a.type) === "instruction-blocked",
        "pnl-tst-row--child-target": (a == null ? void 0 : a.type) === "make-child"
      };
    }
    function wl(s) {
      const a = Si(s);
      return a ? a.type === "reorder-above" ? "pnl-tst-dropline--above" : a.type === "reorder-below" || a.type === "reparent" ? "pnl-tst-dropline--below" : null : null;
    }
    function ld(s) {
      const a = Si(s);
      return a ? { insetInlineStart: `${(a.type === "reparent" ? a.desiredLevel : a.currentLevel) * a.indentPerLevel}px` } : null;
    }
    return (s, a) => (Z(), Q("div", {
      ref_key: "rootElement",
      ref: ml,
      class: "pnl-tst"
    }, [
      hf.value ? (Z(), Q("div", {
        key: 0,
        class: "pnl-tst-toolbar",
        role: "toolbar",
        "aria-orientation": "horizontal",
        "aria-label": vf.value
      }, [
        (Z(!0), Q(Ie, null, Cn(Nr.value, (f) => (Z(), Q(Ie, {
          key: f.uid
        }, [
          f.id === "|" ? (Z(), Q("span", gy)) : f.id === "search" ? (Z(), Q("label", py, [
            Me("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: on(ly)
            }, null, 8, hy),
            Me("input", {
              ref_for: !0,
              ref: (v) => pi.value = v,
              type: "search",
              value: Wt.value,
              "aria-label": Gs.value,
              placeholder: Gs.value,
              onInput: a[0] || (a[0] = (v) => Lr(v.target.value))
            }, null, 40, vy)
          ])) : (Z(), Q("button", {
            key: 2,
            ref_for: !0,
            ref: (v) => Lf(f.uid, v),
            type: "button",
            class: "pnl-tst-tbtn",
            "aria-label": f.label,
            "aria-keyshortcuts": f.keys,
            "aria-disabled": !Gn(f),
            title: Hf(f),
            tabindex: f.uid === ul.value ? 0 : -1,
            onClick: (v) => gi(f),
            onFocus: (v) => Ur.value = f.uid,
            onKeydown: jf
          }, [
            Me("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: f.icon
            }, null, 8, yy)
          ], 40, my))
        ], 64))), 128))
      ], 8, dy)) : et("", !0),
      ve.value.length === 0 ? (Z(), Q("div", wy, xt(I.value), 1)) : (Z(), Q("div", {
        key: 2,
        ref: nf,
        class: Ue(["pnl-tst-grid", { "pnl-tst-grid--resizing": Be.value !== null }]),
        role: "treegrid",
        "aria-label": b.value,
        "aria-colcount": p.value.length,
        "aria-rowcount": C.value,
        style: ut(Xc.value),
        onKeydown: of,
        onScroll: ef
      }, [
        r.value ? (Z(), Q("div", {
          key: 0,
          ref_key: "headElement",
          ref: js,
          class: "pnl-tst-head",
          role: "rowgroup"
        }, [
          Me("div", _y, [
            (Z(!0), Q(Ie, null, Cn(p.value, (f, v) => (Z(), Q("div", {
              key: f.id,
              ref_for: !0,
              ref: (S) => M(f.column.id, S),
              class: Ue(["pnl-tst-hcell", { "pnl-tst-hcell--sortable": J(f) }]),
              role: "columnheader",
              "aria-colindex": v + 1,
              "aria-sort": de(f),
              "aria-keyshortcuts": De(f) ? "Alt+ArrowLeft Alt+ArrowRight Alt+Home" : void 0,
              tabindex: T.value && f.column.id === N.value ? 0 : -1,
              style: ut(Qo(v)),
              onClick: (S) => Ce(f),
              onFocus: (S) => P.value = f.column.id,
              onKeydown: (S) => Ge(f, S)
            }, [
              Me("span", xy, xt(f.column.columnDef.header), 1),
              le(f) ? (Z(), Q("span", {
                key: 0,
                class: "pnl-tst-sortind",
                "aria-hidden": "true",
                innerHTML: le(f)
              }, null, 8, Ry)) : et("", !0),
              De(f) ? (Z(), Q("span", {
                key: 1,
                class: Ue(["pnl-tst-resize", { "pnl-tst-resize--active": Be.value === f.column.id }]),
                "aria-hidden": "true",
                onClick: a[1] || (a[1] = We(() => {
                }, ["stop"])),
                onDblclick: We((S) => Oe(f), ["stop"]),
                onMousedown: (S) => Ft(f, S),
                onTouchstart: (S) => Ft(f, S)
              }, null, 42, Cy)) : et("", !0)
            ], 46, Sy))), 128))
          ])
        ], 512)) : et("", !0),
        Me("div", {
          class: "pnl-tst-body",
          role: "rowgroup",
          style: ut(Qc.value)
        }, [
          (Z(!0), Q(Ie, null, Cn(Ks.value, ({ row: f, index: v, held: S }) => (Z(), Q("div", {
            key: f.id,
            ref_for: !0,
            ref: (H) => rf(f.id, H),
            class: Ue(["pnl-tst-row", [
              sd(f),
              id(f),
              {
                "pnl-tst-row--active": wn.value && f.id === yn.value,
                "pnl-tst-row--quiet": !wn.value && f.id === yn.value,
                "pnl-tst-row--cut": yf.value.has(f.id)
              }
            ]]),
            style: ut(S ? Jc(v) : void 0),
            role: "row",
            "aria-level": f.depth + 1,
            "aria-posinset": qc(f),
            "aria-setsize": Gc(f),
            "aria-rowindex": v + E.value,
            "aria-expanded": mn(f) ? zn(f) : void 0,
            "aria-busy": Jo(f) ? "true" : void 0,
            "aria-selected": W.value ? f.getIsSelected() : void 0,
            "aria-haspopup": Yr.value ? "menu" : void 0,
            tabindex: !T.value && f.id === bn.value ? 0 : -1,
            onClick: (H) => af(f, H),
            onContextmenu: (H) => Vf(f, H),
            onFocus: (H) => Xt(f.id)
          }, [
            wl(f) ? (Z(), Q("span", {
              key: 0,
              class: Ue(["pnl-tst-dropline", wl(f)]),
              style: ut(ld(f)),
              "aria-hidden": "true"
            }, null, 6)) : et("", !0),
            (Z(!0), Q(Ie, null, Cn(f.getAllCells(), (H, ge) => (Z(), Q("div", {
              key: H.id,
              class: Ue(["pnl-tst-cell", {
                "pnl-tst-cell--tree": ge === 0,
                "pnl-tst-cell--editable": el(ge, H)
              }]),
              role: "gridcell",
              "aria-colindex": ge + 1,
              style: ut(ge === 0 ? Zc(f) : Qo(ge)),
              onDblclick: (q) => Rf(f, ge, H)
            }, [
              ge === 0 ? (Z(), Q(Ie, { key: 0 }, [
                mn(f) ? (Z(), Q("span", {
                  key: 0,
                  class: Ue(["pnl-tst-twisty", {
                    "pnl-tst-twisty--open": zn(f),
                    "pnl-tst-twisty--busy": Jo(f)
                  }]),
                  "aria-hidden": "true",
                  onClick: We((q) => uf(f), ["stop"])
                }, [...a[9] || (a[9] = [
                  Me("svg", {
                    viewBox: "0 0 16 16",
                    width: "12",
                    height: "12",
                    focusable: "false"
                  }, [
                    Me("path", {
                      d: "M6 3.5 10.5 8 6 12.5",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "1.6"
                    })
                  ], -1)
                ])], 10, Iy)) : (Z(), Q("span", Ay)),
                ce.value ? (Z(), Q("input", {
                  key: 2,
                  class: "pnl-tst-check",
                  type: "checkbox",
                  tabindex: "-1",
                  checked: Ws(f),
                  ".indeterminate": cf(f),
                  "aria-label": `Select ${f.original.title ?? f.id}`,
                  onClick: We((q) => df(f), ["stop"])
                }, null, 40, Dy)) : et("", !0),
                Y(f) ? (Z(), Q("span", {
                  key: 3,
                  class: "pnl-tst-icon",
                  "aria-hidden": "true",
                  innerHTML: Y(f)
                }, null, 8, Oy)) : et("", !0)
              ], 64)) : et("", !0),
              xf(f, ge, H) ? (Z(), Q(Ie, { key: 1 }, [
                g(Re.value) === "select" ? (Z(), Q("select", {
                  key: 0,
                  ref_for: !0,
                  ref: (q) => jt.value = q,
                  class: Ue(["pnl-tst-edit pnl-tst-edit--select", { "pnl-tst-edit--invalid": Qe.value }]),
                  value: Lt.value,
                  "aria-label": ui(f, ge, H),
                  "aria-invalid": Qe.value ? "true" : void 0,
                  onChange: (q) => tl(f, Re.value, q.target.value),
                  onClick: a[2] || (a[2] = We(() => {
                  }, ["stop"])),
                  onDblclick: a[3] || (a[3] = We(() => {
                  }, ["stop"])),
                  onKeydown: We((q) => di(f, q), ["stop"]),
                  onBlur: (q) => fi(f, ge, H)
                }, [
                  (Z(!0), Q(Ie, null, Cn(h(Re.value), (q) => (Z(), Q("option", {
                    key: q,
                    value: q
                  }, xt(q), 9, Py))), 128))
                ], 42, ky)) : g(Re.value) === "checkbox" ? (Z(), Q("input", {
                  key: 1,
                  ref_for: !0,
                  ref: (q) => jt.value = q,
                  class: Ue(["pnl-tst-edit pnl-tst-edit--check", { "pnl-tst-edit--invalid": Qe.value }]),
                  type: "checkbox",
                  checked: $r.value,
                  "aria-label": ui(f, ge, H),
                  "aria-invalid": Qe.value ? "true" : void 0,
                  onChange: (q) => tl(f, Re.value, q.target.checked),
                  onClick: a[4] || (a[4] = We(() => {
                  }, ["stop"])),
                  onDblclick: a[5] || (a[5] = We(() => {
                  }, ["stop"])),
                  onKeydown: We((q) => di(f, q), ["stop"]),
                  onBlur: (q) => fi(f, ge, H)
                }, null, 42, Ty)) : (Z(), Q("input", {
                  key: 2,
                  ref_for: !0,
                  ref: (q) => jt.value = q,
                  class: Ue(["pnl-tst-edit", { "pnl-tst-edit--invalid": Qe.value }]),
                  type: g(Re.value) === "number" ? "number" : "text",
                  step: y(Re.value, "step"),
                  min: y(Re.value, "min"),
                  max: y(Re.value, "max"),
                  value: Lt.value,
                  "aria-label": ui(f, ge, H),
                  "aria-invalid": Qe.value ? "true" : void 0,
                  onInput: a[6] || (a[6] = (q) => Cf(q.target.value)),
                  onClick: a[7] || (a[7] = We(() => {
                  }, ["stop"])),
                  onDblclick: a[8] || (a[8] = We(() => {
                  }, ["stop"])),
                  onKeydown: We((q) => di(f, q), ["stop"]),
                  onBlur: (q) => fi(f, ge, H)
                }, null, 42, Fy))
              ], 64)) : (Z(), Q("span", Hy, xt(H.getValue()), 1))
            ], 46, Ey))), 128))
          ], 46, My))), 128))
        ], 4)
      ], 46, by)),
      _t.value ? (Z(), Q("div", Ly, [
        Me("div", {
          class: "pnl-tst-dialog",
          role: "alertdialog",
          "aria-modal": "true",
          "aria-label": "Rename",
          "aria-describedby": "pnl-tst-confirm-message",
          onKeydown: Ef
        }, [
          Me("p", jy, " Rename " + xt(_t.value.previous) + " to " + xt(_t.value.title) + "? If you change a file name extension, the file might become unusable. ", 1),
          Me("div", zy, [
            Me("button", {
              ref_key: "confirmYesButton",
              ref: li,
              type: "button",
              class: "pnl-tst-dbtn",
              "aria-keyshortcuts": "Y",
              onClick: il
            }, [...a[10] || (a[10] = [
              Me("span", { class: "pnl-tst-dkey" }, "Y", -1),
              Ji("es ", -1)
            ])], 512),
            Me("button", {
              ref_key: "confirmNoButton",
              ref: ai,
              type: "button",
              class: "pnl-tst-dbtn",
              "aria-keyshortcuts": "N",
              onClick: sl
            }, [...a[11] || (a[11] = [
              Me("span", { class: "pnl-tst-dkey" }, "N", -1),
              Ji("o ", -1)
            ])], 512)
          ])
        ], 32)
      ])) : et("", !0),
      Xn.value ? (Z(), Q("div", {
        key: 4,
        ref_key: "menuElement",
        ref: Xr,
        class: "pnl-tst-menu",
        role: "menu",
        "aria-orientation": "vertical",
        "aria-label": zf.value,
        style: ut({ left: `${Yn.value.left}px`, top: `${Yn.value.top}px` }),
        onKeydown: Wf
      }, [
        (Z(!0), Q(Ie, null, Cn(ri.value, (f) => (Z(), Q(Ie, {
          key: f.uid
        }, [
          f.id === "|" ? (Z(), Q("div", Vy)) : (Z(), Q("button", {
            key: 1,
            ref_for: !0,
            ref: (v) => Kf(f.uid, v),
            type: "button",
            class: "pnl-tst-mitem",
            role: "menuitem",
            "aria-keyshortcuts": f.keys,
            "aria-disabled": !Gn(f),
            tabindex: cl(f) === _n.value ? 0 : -1,
            onClick: (v) => $f(f),
            onFocus: (v) => _n.value = cl(f)
          }, [
            Me("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: f.icon
            }, null, 8, Ny),
            Me("span", $y, xt(f.label), 1),
            f.keys ? (Z(), Q("span", Wy, xt(al(f)), 1)) : et("", !0)
          ], 40, By))
        ], 64))), 128))
      ], 44, Ky)) : et("", !0)
    ], 512));
  }
};
function Jy({ model: e, el: t }) {
  t.style.display = "block", t.style.width = "100%", t.style.height = "100%";
  const n = document.createElement("div");
  n.className = "pnl-tst-root", n.style.height = "100%", t.append(n);
  const r = /* @__PURE__ */ To({
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
  }), o = 16, i = [];
  let l = 0;
  const u = (_, k) => {
    l += 1, i.push({ seq: l, event_name: _, event_params: k }), i.length > o && i.shift(), e.set("_event_data", { events: [...i], timestamp: Date.now() }), e.save_changes();
  }, c = (_, k) => _.length === k.length && _.every((z, Y) => z === k[Y]), d = (_) => (k) => {
    const z = [...e.get(_) || []].sort();
    c(z, k) || (e.set(_, k), e.save_changes());
  }, g = d("expanded_keys"), h = d("selected_keys"), y = (_) => {
    (e.get("filter_text") || "") !== _ && (e.set("filter_text", _), e.save_changes());
  }, w = (_) => {
    (e.get("editing_key") || "") !== _ && (e.set("editing_key", _), e.save_changes());
  }, D = (_) => {
    (e.get("editing_column") || "") !== _ && (e.set("editing_column", _), e.save_changes());
  }, R = (_, k) => _.length === k.length && _.every((z, Y) => z.id === k[Y].id && !!z.desc == !!k[Y].desc), A = (_) => {
    R(e.get("sorting") || [], _) || (e.set("sorting", _), e.save_changes());
  }, K = (_, k) => {
    const z = Object.keys(_);
    return z.length === Object.keys(k).length && z.every((Y) => _[Y] === k[Y]);
  }, j = Ip(Zy, {
    state: r,
    emitEvent: u,
    setExpandedKeys: g,
    setSelectedKeys: h,
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
  Jy as render
};

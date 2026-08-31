/**
* @vue/shared v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function eo(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const se = {}, Bt = [], qe = () => {
}, xs = () => !1, Jn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Zn = (e) => e.startsWith("onUpdate:"), be = Object.assign, to = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Sl = Object.prototype.hasOwnProperty, ee = (e, t) => Sl.call(e, t), B = Array.isArray, ht = (e) => xn(e) === "[object Map]", $n = (e) => xn(e) === "[object Set]", Ro = (e) => xn(e) === "[object Date]", W = (e) => typeof e == "function", ue = (e) => typeof e == "string", ze = (e) => typeof e == "symbol", te = (e) => e !== null && typeof e == "object", Rs = (e) => (te(e) || W(e)) && W(e.then) && W(e.catch), Cs = Object.prototype.toString, xn = (e) => Cs.call(e), xl = (e) => xn(e).slice(8, -1), Ms = (e) => xn(e) === "[object Object]", no = (e) => ue(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, cn = /* @__PURE__ */ eo(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Qn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Rl = /-\w/g, ke = Qn(
  (e) => e.replace(Rl, (t) => t.slice(1).toUpperCase())
), Cl = /\B([A-Z])/g, Dt = Qn(
  (e) => e.replace(Cl, "-$1").toLowerCase()
), Os = Qn((e) => e.charAt(0).toUpperCase() + e.slice(1)), vr = Qn(
  (e) => e ? `on${Os(e)}` : ""
), Ue = (e, t) => !Object.is(e, t), wr = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Ps = (e, t, n, r = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: r,
    value: n
  });
}, Ml = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Co;
const er = () => Co || (Co = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Wt(e) {
  if (B(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], o = ue(r) ? Il(r) : Wt(r);
      if (o)
        for (const s in o)
          t[s] = o[s];
    }
    return t;
  } else if (ue(e) || te(e))
    return e;
}
const Ol = /;(?![^(]*\))/g, Pl = /:([^]+)/, El = /\/\*[^]*?\*\//g;
function Il(e) {
  const t = {};
  return e.replace(El, "").split(Ol).forEach((n) => {
    if (n) {
      const r = n.split(Pl);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function Ct(e) {
  let t = "";
  if (ue(e))
    t = e;
  else if (B(e))
    for (let n = 0; n < e.length; n++) {
      const r = Ct(e[n]);
      r && (t += r + " ");
    }
  else if (te(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Al = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Tl = /* @__PURE__ */ eo(Al);
function Es(e) {
  return !!e || e === "";
}
function Dl(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let r = 0; n && r < e.length; r++)
    n = tr(e[r], t[r]);
  return n;
}
function Mo(e, t) {
  if (e.size !== t.size) return !1;
  const n = Array.from(t), r = new Uint8Array(n.length);
  for (const o of e) {
    let s = -1;
    for (let i = 0; i < n.length; i++)
      if (!r[i] && tr(o, n[i])) {
        s = i;
        break;
      }
    if (s < 0) return !1;
    r[s] = 1;
  }
  return !0;
}
function tr(e, t) {
  if (e === t) return !0;
  let n = Ro(e), r = Ro(t);
  if (n || r)
    return n && r ? e.getTime() === t.getTime() : !1;
  if (n = ze(e), r = ze(t), n || r)
    return e === t;
  if (n = B(e), r = B(t), n || r)
    return n && r ? Dl(e, t) : !1;
  if (n = te(e), r = te(t), n || r) {
    if (!n || !r)
      return !1;
    if (n = ht(e), r = ht(t), n || r || (n = $n(e), r = $n(t), n || r))
      return n && r ? Mo(e, t) : !1;
    const o = Object.keys(e).length, s = Object.keys(t).length;
    if (o !== s)
      return !1;
    for (const i in e) {
      const l = e.hasOwnProperty(i), c = t.hasOwnProperty(i);
      if (l && !c || !l && c || !tr(e[i], t[i]))
        return !1;
    }
  }
  return String(e) === String(t);
}
const Is = (e) => !!(e && e.__v_isRef === !0), jn = (e) => ue(e) ? e : e == null ? "" : B(e) || te(e) && (e.toString === Cs || !W(e.toString)) ? Is(e) ? jn(e.value) : JSON.stringify(e, As, 2) : String(e), As = (e, t) => Is(t) ? As(e, t.value) : ht(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [r, o], s) => (n[br(r, s) + " =>"] = o, n),
    {}
  )
} : $n(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => br(n))
} : ze(t) ? br(t) : te(t) && !B(t) && !Ms(t) ? String(t) : t, br = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    ze(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let ge;
class Fl {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && ge && (ge.active ? (this.parent = ge, this.index = (ge.scopes || (ge.scopes = [])).push(
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
      const n = ge;
      try {
        return ge = this, t();
      } finally {
        ge = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = ge, ge = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (ge === this)
        ge = this.prevScope;
      else {
        let t = ge;
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
function Ts() {
  return ge;
}
function jl(e, t = !1) {
  ge && ge.cleanups.push(e);
}
let oe;
const _r = /* @__PURE__ */ new WeakSet();
class Ds {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, ge && (ge.active ? ge.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, _r.has(this) && (_r.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || js(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Oo(this), Hs(this);
    const t = oe, n = Le;
    oe = this, Le = !0;
    try {
      return this.fn();
    } finally {
      ks(this), oe = t, Le = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        so(t);
      this.deps = this.depsTail = void 0, Oo(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? _r.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    kr(this) && this.run();
  }
  get dirty() {
    return kr(this);
  }
}
let Fs = 0, an, un;
function js(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = un, un = e;
    return;
  }
  e.next = an, an = e;
}
function ro() {
  Fs++;
}
function oo() {
  if (--Fs > 0)
    return;
  if (un) {
    let t = un;
    for (un = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; an; ) {
    let t = an;
    for (an = void 0; t; ) {
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
function Hs(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function ks(e) {
  let t, n = e.depsTail, r = n;
  for (; r; ) {
    const o = r.prevDep;
    r.version === -1 ? (r === n && (n = o), so(r), Hl(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = o;
  }
  e.deps = t, e.depsTail = n;
}
function kr(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Ls(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Ls(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === hn) || (e.globalVersion = hn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !kr(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = oe, r = Le;
  oe = e, Le = !0;
  try {
    Hs(e);
    const o = e.fn(e._value);
    (t.version === 0 || Ue(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    oe = n, Le = r, ks(e), e.flags &= -3;
  }
}
function so(e, t = !1) {
  const { dep: n, prevSub: r, nextSub: o } = e;
  if (r && (r.nextSub = o, e.prevSub = void 0), o && (o.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
    n.computed.flags &= -5;
    for (let s = n.computed.deps; s; s = s.nextDep)
      so(s, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Hl(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let Le = !0;
const Ks = [];
function rt() {
  Ks.push(Le), Le = !1;
}
function ot() {
  const e = Ks.pop();
  Le = e === void 0 ? !0 : e;
}
function Oo(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = oe;
    oe = void 0;
    try {
      t();
    } finally {
      oe = n;
    }
  }
}
let hn = 0;
class kl {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class io {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!oe || !Le || oe === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== oe)
      n = this.activeLink = new kl(oe, this), oe.deps ? (n.prevDep = oe.depsTail, oe.depsTail.nextDep = n, oe.depsTail = n) : oe.deps = oe.depsTail = n, $s(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const r = n.nextDep;
      r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = oe.depsTail, n.nextDep = void 0, oe.depsTail.nextDep = n, oe.depsTail = n, oe.deps === n && (oe.deps = r);
    }
    return n;
  }
  trigger(t) {
    this.version++, hn++, this.notify(t);
  }
  notify(t) {
    ro();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      oo();
    }
  }
}
function $s(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let r = t.deps; r; r = r.nextDep)
        $s(r);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const Lr = /* @__PURE__ */ new WeakMap(), Mt = /* @__PURE__ */ Symbol(
  ""
), Kr = /* @__PURE__ */ Symbol(
  ""
), mn = /* @__PURE__ */ Symbol(
  ""
);
function ve(e, t, n) {
  if (Le && oe) {
    let r = Lr.get(e);
    r || Lr.set(e, r = /* @__PURE__ */ new Map());
    let o = r.get(n);
    o || (r.set(n, o = new io()), o.map = r, o.key = n), o.track();
  }
}
function tt(e, t, n, r, o, s) {
  const i = Lr.get(e);
  if (!i) {
    hn++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if (ro(), t === "clear")
    i.forEach(l);
  else {
    const c = B(e), a = c && no(n);
    if (c && n === "length") {
      const u = Number(r);
      i.forEach((p, y) => {
        (y === "length" || y === mn || !ze(y) && y >= u) && l(p);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && l(i.get(n)), a && l(i.get(mn)), t) {
        case "add":
          c ? a && l(i.get("length")) : (l(i.get(Mt)), ht(e) && l(i.get(Kr)));
          break;
        case "delete":
          c || (l(i.get(Mt)), ht(e) && l(i.get(Kr)));
          break;
        case "set":
          ht(e) && l(i.get(Mt));
          break;
      }
  }
  oo();
}
function $t(e) {
  const t = /* @__PURE__ */ Q(e);
  return t === e ? t : (ve(t, "iterate", mn), /* @__PURE__ */ He(e) ? t : t.map(Ke));
}
function nr(e) {
  return ve(e = /* @__PURE__ */ Q(e), "iterate", mn), e;
}
function Be(e, t) {
  return /* @__PURE__ */ st(e) ? zt(/* @__PURE__ */ Ot(e) ? Ke(t) : t) : Ke(t);
}
const Ll = {
  __proto__: null,
  [Symbol.iterator]() {
    return Sr(this, Symbol.iterator, (e) => Be(this, e));
  },
  concat(...e) {
    return $t(this).concat(
      ...e.map((t) => B(t) ? $t(t) : t)
    );
  },
  entries() {
    return Sr(this, "entries", (e) => (e[1] = Be(this, e[1]), e));
  },
  every(e, t) {
    return Ze(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Ze(
      this,
      "filter",
      e,
      t,
      (n) => n.map((r) => Be(this, r)),
      arguments
    );
  },
  find(e, t) {
    return Ze(
      this,
      "find",
      e,
      t,
      (n) => Be(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return Ze(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Ze(
      this,
      "findLast",
      e,
      t,
      (n) => Be(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return Ze(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Ze(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return xr(this, "includes", e);
  },
  indexOf(...e) {
    return xr(this, "indexOf", e);
  },
  join(e) {
    return $t(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return xr(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Ze(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return tn(this, "pop");
  },
  push(...e) {
    return tn(this, "push", e);
  },
  reduce(e, ...t) {
    return Po(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Po(this, "reduceRight", e, t);
  },
  shift() {
    return tn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Ze(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return tn(this, "splice", e);
  },
  toReversed() {
    return $t(this).toReversed();
  },
  toSorted(e) {
    return $t(this).toSorted(e);
  },
  toSpliced(...e) {
    return $t(this).toSpliced(...e);
  },
  unshift(...e) {
    return tn(this, "unshift", e);
  },
  values() {
    return Sr(this, "values", (e) => Be(this, e));
  }
};
function Sr(e, t, n) {
  const r = nr(e), o = r[t]();
  return r !== e && !/* @__PURE__ */ He(e) && (o._next = o.next, o.next = () => {
    const s = o._next();
    return s.done || (s.value = n(s.value)), s;
  }), o;
}
const Kl = Array.prototype;
function Ze(e, t, n, r, o, s) {
  const i = nr(e), l = i !== e && !/* @__PURE__ */ He(e), c = i[t];
  if (c !== Kl[t]) {
    const p = c.apply(e, s);
    return l ? Ke(p) : p;
  }
  let a = n;
  i !== e && (l ? a = function(p, y) {
    return n.call(this, Be(e, p), y, e);
  } : n.length > 2 && (a = function(p, y) {
    return n.call(this, p, y, e);
  }));
  const u = c.call(i, a, r);
  return l && o ? o(u) : u;
}
function Po(e, t, n, r) {
  const o = nr(e), s = o !== e && !/* @__PURE__ */ He(e);
  let i = n, l = !1;
  o !== e && (s ? (l = r.length === 0, i = function(a, u, p) {
    return l && (l = !1, a = Be(e, a)), n.call(this, a, Be(e, u), p, e);
  }) : n.length > 3 && (i = function(a, u, p) {
    return n.call(this, a, u, p, e);
  }));
  const c = o[t](i, ...r);
  return l ? Be(e, c) : c;
}
function xr(e, t, n) {
  const r = /* @__PURE__ */ Q(e);
  ve(r, "iterate", mn);
  const o = r[t](...n);
  return (o === -1 || o === !1) && /* @__PURE__ */ ao(n[0]) ? (n[0] = /* @__PURE__ */ Q(n[0]), r[t](...n)) : o;
}
function tn(e, t, n = []) {
  rt(), ro();
  const r = (/* @__PURE__ */ Q(e))[t].apply(e, n);
  return oo(), ot(), r;
}
const $l = /* @__PURE__ */ eo("__proto__,__v_isRef,__isVue"), Vs = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(ze)
);
function Vl(e) {
  ze(e) || (e = String(e));
  const t = /* @__PURE__ */ Q(this);
  return ve(t, "has", e), t.hasOwnProperty(e);
}
class Ns {
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
      return r === (o ? s ? Jl : Gs : s ? Us : Ws).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const i = B(t);
    if (!o) {
      let c;
      if (i && (c = Ll[n]))
        return c;
      if (n === "hasOwnProperty")
        return Vl;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ we(t) ? t : r
    );
    if ((ze(n) ? Vs.has(n) : $l(n)) || (o || ve(t, "get", n), s))
      return l;
    if (/* @__PURE__ */ we(l)) {
      const c = i && no(n) ? l : l.value;
      return o && te(c) ? /* @__PURE__ */ Vr(c) : c;
    }
    return te(l) ? o ? /* @__PURE__ */ Vr(l) : /* @__PURE__ */ rr(l) : l;
  }
}
class Bs extends Ns {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, o) {
    let s = t[n];
    const i = B(t) && no(n);
    if (!this._isShallow) {
      const a = /* @__PURE__ */ st(s);
      if (!/* @__PURE__ */ He(r) && !/* @__PURE__ */ st(r) && (s = /* @__PURE__ */ Q(s), r = /* @__PURE__ */ Q(r)), !i && /* @__PURE__ */ we(s) && !/* @__PURE__ */ we(r))
        return a || (s.value = r), !0;
    }
    const l = i ? Number(n) < t.length : ee(t, n), c = Reflect.set(
      t,
      n,
      r,
      /* @__PURE__ */ we(t) ? t : o
    );
    return t === /* @__PURE__ */ Q(o) && c && (l ? Ue(r, s) && tt(t, "set", n, r) : tt(t, "add", n, r)), c;
  }
  deleteProperty(t, n) {
    const r = ee(t, n);
    t[n];
    const o = Reflect.deleteProperty(t, n);
    return o && r && tt(t, "delete", n, void 0), o;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!ze(n) || !Vs.has(n)) && ve(t, "has", n), r;
  }
  ownKeys(t) {
    return ve(
      t,
      "iterate",
      B(t) ? "length" : Mt
    ), Reflect.ownKeys(t);
  }
}
class Nl extends Ns {
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
const Bl = /* @__PURE__ */ new Bs(), Wl = /* @__PURE__ */ new Nl(), Ul = /* @__PURE__ */ new Bs(!0);
const $r = (e) => e, En = (e) => Reflect.getPrototypeOf(e);
function Gl(e, t, n) {
  return function(...r) {
    const o = this.__v_raw, s = /* @__PURE__ */ Q(o), i = ht(s), l = e === "entries" || e === Symbol.iterator && i, c = e === "keys" && i, a = o[e](...r), u = n ? $r : t ? zt : Ke;
    return !t && ve(
      s,
      "iterate",
      c ? Kr : Mt
    ), be(
      // inheriting all iterator properties
      Object.create(a),
      {
        // iterator protocol
        next() {
          const { value: p, done: y } = a.next();
          return y ? { value: p, done: y } : {
            value: l ? [u(p[0]), u(p[1])] : u(p),
            done: y
          };
        }
      }
    );
  };
}
function In(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function ql(e, t) {
  const n = {
    get(o) {
      const s = this.__v_raw, i = /* @__PURE__ */ Q(s), l = /* @__PURE__ */ Q(o);
      e || (Ue(o, l) && ve(i, "get", o), ve(i, "get", l));
      const { has: c } = En(i), a = t ? $r : e ? zt : Ke;
      if (c.call(i, o))
        return a(s.get(o));
      if (c.call(i, l))
        return a(s.get(l));
      s !== i && s.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && ve(/* @__PURE__ */ Q(o), "iterate", Mt), o.size;
    },
    has(o) {
      const s = this.__v_raw, i = /* @__PURE__ */ Q(s), l = /* @__PURE__ */ Q(o);
      return e || (Ue(o, l) && ve(i, "has", o), ve(i, "has", l)), o === l ? s.has(o) : s.has(o) || s.has(l);
    },
    forEach(o, s) {
      const i = this, l = i.__v_raw, c = /* @__PURE__ */ Q(l), a = t ? $r : e ? zt : Ke;
      return !e && ve(c, "iterate", Mt), l.forEach((u, p) => o.call(s, a(u), a(p), i));
    }
  };
  return be(
    n,
    e ? {
      add: In("add"),
      set: In("set"),
      delete: In("delete"),
      clear: In("clear")
    } : {
      add(o) {
        const s = /* @__PURE__ */ Q(this), i = En(s), l = /* @__PURE__ */ Q(o), c = !t && !/* @__PURE__ */ He(o) && !/* @__PURE__ */ st(o) ? l : o;
        return i.has.call(s, c) || Ue(o, c) && i.has.call(s, o) || Ue(l, c) && i.has.call(s, l) || (s.add(c), tt(s, "add", c, c)), this;
      },
      set(o, s) {
        !t && !/* @__PURE__ */ He(s) && !/* @__PURE__ */ st(s) && (s = /* @__PURE__ */ Q(s));
        const i = /* @__PURE__ */ Q(this), { has: l, get: c } = En(i);
        let a = l.call(i, o);
        a || (o = /* @__PURE__ */ Q(o), a = l.call(i, o));
        const u = c.call(i, o);
        return i.set(o, s), a ? Ue(s, u) && tt(i, "set", o, s) : tt(i, "add", o, s), this;
      },
      delete(o) {
        const s = /* @__PURE__ */ Q(this), { has: i, get: l } = En(s);
        let c = i.call(s, o);
        c || (o = /* @__PURE__ */ Q(o), c = i.call(s, o)), l && l.call(s, o);
        const a = s.delete(o);
        return c && tt(s, "delete", o, void 0), a;
      },
      clear() {
        const o = /* @__PURE__ */ Q(this), s = o.size !== 0, i = o.clear();
        return s && tt(
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
    n[o] = Gl(o, e, t);
  }), n;
}
function lo(e, t) {
  const n = ql(e, t);
  return (r, o, s) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(
    ee(n, o) && o in r ? n : r,
    o,
    s
  );
}
const zl = {
  get: /* @__PURE__ */ lo(!1, !1)
}, Yl = {
  get: /* @__PURE__ */ lo(!1, !0)
}, Xl = {
  get: /* @__PURE__ */ lo(!0, !1)
};
const Ws = /* @__PURE__ */ new WeakMap(), Us = /* @__PURE__ */ new WeakMap(), Gs = /* @__PURE__ */ new WeakMap(), Jl = /* @__PURE__ */ new WeakMap();
function Zl(e) {
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
function rr(e) {
  return /* @__PURE__ */ st(e) ? e : co(
    e,
    !1,
    Bl,
    zl,
    Ws
  );
}
// @__NO_SIDE_EFFECTS__
function Ql(e) {
  return co(
    e,
    !1,
    Ul,
    Yl,
    Us
  );
}
// @__NO_SIDE_EFFECTS__
function Vr(e) {
  return co(
    e,
    !0,
    Wl,
    Xl,
    Gs
  );
}
function co(e, t, n, r, o) {
  if (!te(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const s = o.get(e);
  if (s)
    return s;
  const i = Zl(xl(e));
  if (i === 0)
    return e;
  const l = new Proxy(
    e,
    i === 2 ? r : n
  );
  return o.set(e, l), l;
}
// @__NO_SIDE_EFFECTS__
function Ot(e) {
  return /* @__PURE__ */ st(e) ? /* @__PURE__ */ Ot(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function st(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function He(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function ao(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function Q(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ Q(t) : e;
}
function ec(e) {
  return !ee(e, "__v_skip") && Object.isExtensible(e) && Ps(e, "__v_skip", !0), e;
}
const Ke = (e) => te(e) ? /* @__PURE__ */ rr(e) : e, zt = (e) => te(e) ? /* @__PURE__ */ Vr(e) : e;
// @__NO_SIDE_EFFECTS__
function we(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function bt(e) {
  return qs(e, !1);
}
// @__NO_SIDE_EFFECTS__
function tc(e) {
  return qs(e, !0);
}
function qs(e, t) {
  return /* @__PURE__ */ we(e) ? e : new nc(e, t);
}
class nc {
  constructor(t, n) {
    this.dep = new io(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ Q(t), this._value = n ? t : Ke(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, r = this.__v_isShallow || /* @__PURE__ */ He(t) || /* @__PURE__ */ st(t);
    t = r ? t : /* @__PURE__ */ Q(t), Ue(t, n) && (this._rawValue = t, this._value = r ? t : Ke(t), this.dep.trigger());
  }
}
function Ut(e) {
  return /* @__PURE__ */ we(e) ? e.value : e;
}
const rc = {
  get: (e, t, n) => t === "__v_raw" ? e : Ut(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return /* @__PURE__ */ we(o) && !/* @__PURE__ */ we(n) ? (o.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function zs(e) {
  return /* @__PURE__ */ Ot(e) ? e : new Proxy(e, rc);
}
class oc {
  constructor(t, n, r) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new io(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = hn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    oe !== this)
      return js(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Ls(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function sc(e, t, n = !1) {
  let r, o;
  return W(e) ? r = e : (r = e.get, o = e.set), new oc(r, o, n);
}
const An = {}, Vn = /* @__PURE__ */ new WeakMap();
let xt;
function ic(e, t = !1, n = xt) {
  if (n) {
    let r = Vn.get(n);
    r || Vn.set(n, r = []), r.push(e);
  }
}
function lc(e, t, n = se) {
  const { immediate: r, deep: o, once: s, scheduler: i, augmentJob: l, call: c } = n, a = (E) => o ? E : /* @__PURE__ */ He(E) || o === !1 || o === 0 ? gt(E, 1) : gt(E);
  let u, p, y, v, P = !1, C = !1;
  if (/* @__PURE__ */ we(e) ? (p = () => e.value, P = /* @__PURE__ */ He(e)) : /* @__PURE__ */ Ot(e) ? (p = () => a(e), P = !0) : B(e) ? (C = !0, P = e.some((E) => /* @__PURE__ */ Ot(E) || /* @__PURE__ */ He(E)), p = () => e.map((E) => {
    if (/* @__PURE__ */ we(E))
      return E.value;
    if (/* @__PURE__ */ Ot(E))
      return a(E);
    if (W(E))
      return c ? c(E, 2) : E();
  })) : W(e) ? t ? p = c ? () => c(e, 2) : e : p = () => {
    if (y) {
      rt();
      try {
        y();
      } finally {
        ot();
      }
    }
    const E = xt;
    xt = u;
    try {
      return c ? c(e, 3, [v]) : e(v);
    } finally {
      xt = E;
    }
  } : p = qe, t && o) {
    const E = p, k = o === !0 ? 1 / 0 : o;
    p = () => gt(E(), k);
  }
  const F = Ts(), K = () => {
    u.stop(), F && F.active && to(F.effects, u);
  };
  if (s && t) {
    const E = t;
    t = (...k) => {
      const N = E(...k);
      return K(), N;
    };
  }
  let M = C ? new Array(e.length).fill(An) : An;
  const j = (E) => {
    if (!(!(u.flags & 1) || !u.dirty && !E))
      if (t) {
        const k = u.run();
        if (E || o || P || (C ? k.some((N, ie) => Ue(N, M[ie])) : Ue(k, M))) {
          y && y();
          const N = xt;
          xt = u;
          try {
            const ie = [
              k,
              // pass undefined as the old value when it's changed for the first time
              M === An ? void 0 : C && M[0] === An ? [] : M,
              v
            ];
            M = k, c ? c(t, 3, ie) : (
              // @ts-expect-error
              t(...ie)
            );
          } finally {
            xt = N;
          }
        }
      } else
        u.run();
  };
  return l && l(j), u = new Ds(p), u.scheduler = i ? () => i(j, !1) : j, v = (E) => ic(E, !1, u), y = u.onStop = () => {
    const E = Vn.get(u);
    if (E) {
      if (c)
        c(E, 4);
      else
        for (const k of E) k();
      Vn.delete(u);
    }
  }, t ? r ? j(!0) : M = u.run() : i ? i(j.bind(null, !0), !0) : u.run(), K.pause = u.pause.bind(u), K.resume = u.resume.bind(u), K.stop = K, K;
}
function gt(e, t = 1 / 0, n) {
  if (t <= 0 || !te(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ we(e))
    gt(e.value, t, n);
  else if (B(e))
    for (let r = 0; r < e.length; r++)
      gt(e[r], t, n);
  else if ($n(e) || ht(e))
    e.forEach((r) => {
      gt(r, t, n);
    });
  else if (Ms(e)) {
    for (const r in e)
      gt(e[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, r) && gt(e[r], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Rn(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (o) {
    or(o, t, n);
  }
}
function $e(e, t, n, r) {
  if (W(e)) {
    const o = Rn(e, t, n, r);
    return o && Rs(o) && o.catch((s) => {
      or(s, t, n);
    }), o;
  }
  if (B(e)) {
    const o = [];
    for (let s = 0; s < e.length; s++)
      o.push($e(e[s], t, n, r));
    return o;
  }
}
function or(e, t, n, r = !0) {
  const o = t ? t.vnode : null, { errorHandler: s, throwUnhandledErrorInProduction: i } = t && t.appContext.config || se;
  if (t) {
    let l = t.parent;
    const c = t.proxy, a = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const u = l.ec;
      if (u) {
        for (let p = 0; p < u.length; p++)
          if (u[p](e, c, a) === !1)
            return;
      }
      l = l.parent;
    }
    if (s) {
      rt(), Rn(s, null, 10, [
        e,
        c,
        a
      ]), ot();
      return;
    }
  }
  cc(e, n, o, r, i);
}
function cc(e, t, n, r = !0, o = !1) {
  if (o)
    throw e;
  console.error(e);
}
const xe = [];
let Ne = -1;
const Gt = [];
let pt = null, Vt = 0;
const Ys = /* @__PURE__ */ Promise.resolve();
let Nn = null;
function Xs(e) {
  const t = Nn || Ys;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function ac(e) {
  let t = Ne + 1, n = xe.length;
  for (; t < n; ) {
    const r = t + n >>> 1, o = xe[r], s = yn(o);
    s < e || s === e && o.flags & 2 ? t = r + 1 : n = r;
  }
  return t;
}
function uo(e) {
  if (!(e.flags & 1)) {
    const t = yn(e), n = xe[xe.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= yn(n) ? xe.push(e) : xe.splice(ac(t), 0, e), e.flags |= 1, Js();
  }
}
function Js() {
  Nn || (Nn = Ys.then(Qs));
}
function uc(e) {
  if (!B(e))
    pt && e.id === -1 ? pt.splice(Vt + 1, 0, e) : e.flags & 1 || (Gt.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      Gt.push(e[t]);
  Js();
}
function Eo(e, t, n = Ne + 1) {
  for (; n < xe.length; n++) {
    const r = xe[n];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid)
        continue;
      xe.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function Zs(e) {
  if (Gt.length) {
    const t = [...new Set(Gt)].sort(
      (n, r) => yn(n) - yn(r)
    );
    if (Gt.length = 0, pt) {
      for (let n = 0; n < t.length; n++)
        pt.push(t[n]);
      return;
    }
    for (pt = t, Vt = 0; Vt < pt.length; Vt++) {
      const n = pt[Vt];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    pt = null, Vt = 0;
  }
}
const yn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Qs(e) {
  try {
    for (Ne = 0; Ne < xe.length; Ne++) {
      const t = xe[Ne];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Rn(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Ne < xe.length; Ne++) {
      const t = xe[Ne];
      t && (t.flags &= -2);
    }
    Ne = -1, xe.length = 0, Zs(), Nn = null, (xe.length || Gt.length) && Qs();
  }
}
let Ge = null, ei = null;
function Bn(e) {
  const t = Ge;
  return Ge = e, ei = e && e.type.__scopeId || null, t;
}
function fc(e, t = Ge, n) {
  if (!t || e._n)
    return e;
  const r = (...o) => {
    r._d && $o(-1);
    const s = Bn(t), i = Pt.length;
    let l;
    try {
      l = e(...o);
    } finally {
      for (let c = Pt.length; c > i; c--) Mi();
      Bn(s), r._d && $o(1);
    }
    return l;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function _t(e, t, n, r) {
  const o = e.dirs, s = t && t.dirs;
  for (let i = 0; i < o.length; i++) {
    const l = o[i];
    s && (l.oldValue = s[i].value);
    let c = l.dir[r];
    c && (rt(), $e(c, n, 8, [
      e.el,
      l,
      e,
      t
    ]), ot());
  }
}
function dc(e, t) {
  if (Re) {
    let n = Re.provides;
    const r = Re.parent && Re.parent.provides;
    r === n && (n = Re.provides = Object.create(r)), n[e] = t;
  }
}
function Hn(e, t, n = !1) {
  const r = aa();
  if (r || qt) {
    let o = qt ? qt._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && W(t) ? t.call(r && r.proxy) : t;
  }
}
const pc = /* @__PURE__ */ Symbol.for("v-scx"), gc = () => Hn(pc);
function Ae(e, t, n) {
  return ti(e, t, n);
}
function ti(e, t, n = se) {
  const { immediate: r, deep: o, flush: s, once: i } = n, l = be({}, n), c = t && r || !t && s !== "post";
  let a;
  if (bn) {
    if (s === "sync") {
      const v = gc();
      a = v.__watcherHandles || (v.__watcherHandles = []);
    } else if (!c) {
      const v = () => {
      };
      return v.stop = qe, v.resume = qe, v.pause = qe, v;
    }
  }
  const u = Re;
  l.call = (v, P, C) => $e(v, u, P, C);
  let p = !1;
  s === "post" ? l.scheduler = (v) => {
    Ee(v, u && u.suspense);
  } : s !== "sync" && (p = !0, l.scheduler = (v, P) => {
    P ? v() : uo(v);
  }), l.augmentJob = (v) => {
    t && (v.flags |= 4), p && (v.flags |= 2, u && (v.id = u.uid, v.i = u));
  };
  const y = lc(e, t, l);
  return bn && (a ? a.push(y) : c && y()), y;
}
function hc(e, t, n) {
  const r = this.proxy, o = ue(e) ? e.includes(".") ? ni(r, e) : () => r[e] : e.bind(r, r);
  let s;
  W(t) ? s = t : (s = t.handler, n = t);
  const i = Cn(this), l = ti(o, s.bind(r), n);
  return i(), l;
}
function ni(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++)
      r = r[n[o]];
    return r;
  };
}
const mc = /* @__PURE__ */ Symbol("_vte"), sr = (e) => e.__isTeleport, Rr = /* @__PURE__ */ Symbol("_leaveCb");
function yc(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== it) {
        t = n;
        break;
      }
  }
  return t;
}
function ri(e) {
  if (!po(e))
    return sr(e.type) && e.children ? yc(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16)
      return n[0];
    if (t & 32 && W(n.default))
      return n.default();
  }
}
function fo(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    fo(
      sr(n.type) && ri(n) || n,
      t
    );
  } else e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function oi(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Io(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const Wn = /* @__PURE__ */ new WeakMap();
function fn(e, t, n, r, o = !1) {
  if (B(e)) {
    e.forEach(
      (C, F) => fn(
        C,
        t && (B(t) ? t[F] : t),
        n,
        r,
        o
      )
    );
    return;
  }
  if (dn(r) && !o) {
    r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && fn(e, t, n, r.component.subTree);
    return;
  }
  const s = r.shapeFlag & 4 ? mo(r.component) : r.el, i = o ? null : s, { i: l, r: c } = e, a = t && t.r, u = l.refs === se ? l.refs = {} : l.refs, p = l.setupState, y = /* @__PURE__ */ Q(p), v = p === se ? xs : (C) => Io(u, C) ? !1 : ee(y, C), P = (C, F) => !(F && Io(u, F));
  if (a != null && a !== c) {
    if (Ao(t), ue(a))
      u[a] = null, v(a) && (p[a] = null);
    else if (/* @__PURE__ */ we(a)) {
      const C = t;
      P(a, C.k) && (a.value = null), C.k && (u[C.k] = null);
    }
  }
  if (W(c))
    Rn(c, l, 12, [i, u]);
  else {
    const C = ue(c), F = /* @__PURE__ */ we(c);
    if (C || F) {
      const K = () => {
        if (e.f) {
          const M = C ? v(c) ? p[c] : u[c] : P() || !e.k ? c.value : u[e.k];
          if (o)
            B(M) && to(M, s);
          else if (B(M))
            M.includes(s) || M.push(s);
          else if (C)
            u[c] = [s], v(c) && (p[c] = u[c]);
          else {
            const j = [s];
            P(c, e.k) && (c.value = j), e.k && (u[e.k] = j);
          }
        } else C ? (u[c] = i, v(c) && (p[c] = i)) : F && (P(c, e.k) && (c.value = i), e.k && (u[e.k] = i));
      };
      if (i) {
        const M = () => {
          K(), Wn.delete(e);
        };
        M.id = -1, Wn.set(e, M), Ee(M, n);
      } else
        Ao(e), K();
    }
  }
}
function Ao(e) {
  const t = Wn.get(e);
  t && (t.flags |= 8, Wn.delete(e));
}
er().requestIdleCallback;
er().cancelIdleCallback;
const dn = (e) => !!e.type.__asyncLoader, po = (e) => e.type.__isKeepAlive;
function vc(e, t) {
  si(e, "a", t);
}
function wc(e, t) {
  si(e, "da", t);
}
function si(e, t, n = Re) {
  const r = e.__wdc || (e.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (ir(t, r, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      po(o.parent.vnode) && bc(r, t, n, o), o = o.parent;
  }
}
function bc(e, t, n, r) {
  const o = ir(
    t,
    e,
    r,
    !0
    /* prepend */
  );
  ci(() => {
    to(r[t], o);
  }, n);
}
function ir(e, t, n = Re, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), s = t.__weh || (t.__weh = (...i) => {
      rt();
      const l = Cn(n), c = $e(t, n, e, i);
      return l(), ot(), c;
    });
    return r ? o.unshift(s) : o.push(s), s;
  }
}
const ct = (e) => (t, n = Re) => {
  (!bn || e === "sp") && ir(e, (...r) => t(...r), n);
}, _c = ct("bm"), ii = ct("m"), Sc = ct(
  "bu"
), xc = ct("u"), li = ct(
  "bum"
), ci = ct("um"), Rc = ct(
  "sp"
), Cc = ct("rtg"), Mc = ct("rtc");
function Oc(e, t = Re) {
  ir("ec", e, t);
}
const Pc = /* @__PURE__ */ Symbol.for("v-ndc");
function Cr(e, t, n, r) {
  let o;
  const s = n, i = B(e);
  if (i || ue(e)) {
    const l = i && /* @__PURE__ */ Ot(e);
    let c = !1, a = !1;
    l && (c = !/* @__PURE__ */ He(e), a = /* @__PURE__ */ st(e), e = nr(e)), o = new Array(e.length);
    for (let u = 0, p = e.length; u < p; u++)
      o[u] = t(
        c ? a ? zt(Ke(e[u])) : Ke(e[u]) : e[u],
        u,
        void 0,
        s
      );
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let l = 0; l < e; l++)
      o[l] = t(l + 1, l, void 0, s);
  } else if (te(e))
    if (e[Symbol.iterator])
      o = Array.from(
        e,
        (l, c) => t(l, c, void 0, s)
      );
    else {
      const l = Object.keys(e);
      o = new Array(l.length);
      for (let c = 0, a = l.length; c < a; c++) {
        const u = l[c];
        o[c] = t(e[u], u, c, s);
      }
    }
  else
    o = [];
  return o;
}
const Nr = (e) => e ? Ii(e) ? mo(e) : Nr(e.parent) : null, pn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ be(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Nr(e.parent),
    $root: (e) => Nr(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => ui(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      uo(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Xs.bind(e.proxy)),
    $watch: (e) => hc.bind(e)
  })
), Mr = (e, t) => e !== se && !e.__isScriptSetup && ee(e, t), Ec = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: r, data: o, props: s, accessCache: i, type: l, appContext: c } = e;
    if (t[0] !== "$") {
      const y = i[t];
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
        if (Mr(r, t))
          return i[t] = 1, r[t];
        if (o !== se && ee(o, t))
          return i[t] = 2, o[t];
        if (ee(s, t))
          return i[t] = 3, s[t];
        if (n !== se && ee(n, t))
          return i[t] = 4, n[t];
        Br && (i[t] = 0);
      }
    }
    const a = pn[t];
    let u, p;
    if (a)
      return t === "$attrs" && ve(e.attrs, "get", ""), a(e);
    if (
      // css module (injected by vue-loader)
      (u = l.__cssModules) && (u = u[t])
    )
      return u;
    if (n !== se && ee(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      p = c.config.globalProperties, ee(p, t)
    )
      return p[t];
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: o, ctx: s } = e;
    return Mr(o, t) ? (o[t] = n, !0) : r !== se && ee(r, t) ? (r[t] = n, !0) : ee(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (s[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: o, props: s, type: i }
  }, l) {
    let c;
    return !!(n[l] || e !== se && l[0] !== "$" && ee(e, l) || Mr(t, l) || ee(s, l) || ee(r, l) || ee(pn, l) || ee(o.config.globalProperties, l) || (c = i.__cssModules) && c[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : ee(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function To(e) {
  return B(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let Br = !0;
function Ic(e) {
  const t = ui(e), n = e.proxy, r = e.ctx;
  Br = !1, t.beforeCreate && Do(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: s,
    methods: i,
    watch: l,
    provide: c,
    inject: a,
    // lifecycle
    created: u,
    beforeMount: p,
    mounted: y,
    beforeUpdate: v,
    updated: P,
    activated: C,
    deactivated: F,
    beforeDestroy: K,
    beforeUnmount: M,
    destroyed: j,
    unmounted: E,
    render: k,
    renderTracked: N,
    renderTriggered: ie,
    errorCaptured: V,
    serverPrefetch: D,
    // public API
    expose: z,
    inheritAttrs: le,
    // assets
    components: ne,
    directives: fe,
    filters: Ce
  } = t;
  if (a && Ac(a, r, null), i)
    for (const U in i) {
      const Z = i[U];
      W(Z) && (r[U] = Z.bind(n));
    }
  if (o) {
    const U = o.call(n, n);
    te(U) && (e.data = /* @__PURE__ */ rr(U));
  }
  if (Br = !0, s)
    for (const U in s) {
      const Z = s[U], Ye = W(Z) ? Z.bind(n, n) : W(Z.get) ? Z.get.bind(n, n) : qe, Oe = !W(Z) && W(Z.set) ? Z.set.bind(n) : qe, Fe = ae({
        get: Ye,
        set: Oe
      });
      Object.defineProperty(r, U, {
        enumerable: !0,
        configurable: !0,
        get: () => Fe.value,
        set: (je) => Fe.value = je
      });
    }
  if (l)
    for (const U in l)
      ai(l[U], r, n, U);
  if (c) {
    const U = W(c) ? c.call(n) : c;
    Reflect.ownKeys(U).forEach((Z) => {
      dc(Z, U[Z]);
    });
  }
  u && Do(u, e, "c");
  function J(U, Z) {
    B(Z) ? Z.forEach((Ye) => U(Ye.bind(n))) : Z && U(Z.bind(n));
  }
  if (J(_c, p), J(ii, y), J(Sc, v), J(xc, P), J(vc, C), J(wc, F), J(Oc, V), J(Mc, N), J(Cc, ie), J(li, M), J(ci, E), J(Rc, D), B(z))
    if (z.length) {
      const U = e.exposed || (e.exposed = {});
      z.forEach((Z) => {
        Object.defineProperty(U, Z, {
          get: () => n[Z],
          set: (Ye) => n[Z] = Ye,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  k && e.render === qe && (e.render = k), le != null && (e.inheritAttrs = le), ne && (e.components = ne), fe && (e.directives = fe), D && oi(e);
}
function Ac(e, t, n = qe) {
  B(e) && (e = Wr(e));
  for (const r in e) {
    const o = e[r];
    let s;
    te(o) ? "default" in o ? s = Hn(
      o.from || r,
      o.default,
      !0
    ) : s = Hn(o.from || r) : s = Hn(o), /* @__PURE__ */ we(s) ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (i) => s.value = i
    }) : t[r] = s;
  }
}
function Do(e, t, n) {
  $e(
    B(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function ai(e, t, n, r) {
  let o = r.includes(".") ? ni(n, r) : () => n[r];
  if (ue(e)) {
    const s = t[e];
    W(s) && Ae(o, s);
  } else if (W(e))
    Ae(o, e.bind(n));
  else if (te(e))
    if (B(e))
      e.forEach((s) => ai(s, t, n, r));
    else {
      const s = W(e.handler) ? e.handler.bind(n) : t[e.handler];
      W(s) && Ae(o, s, e);
    }
}
function ui(e) {
  const t = e.type, { mixins: n, extends: r } = t, {
    mixins: o,
    optionsCache: s,
    config: { optionMergeStrategies: i }
  } = e.appContext, l = s.get(t);
  let c;
  return l ? c = l : !o.length && !n && !r ? c = t : (c = {}, o.length && o.forEach(
    (a) => Un(c, a, i, !0)
  ), Un(c, t, i)), te(t) && s.set(t, c), c;
}
function Un(e, t, n, r = !1) {
  const { mixins: o, extends: s } = t;
  s && Un(e, s, n, !0), o && o.forEach(
    (i) => Un(e, i, n, !0)
  );
  for (const i in t)
    if (!(r && i === "expose")) {
      const l = Tc[i] || n && n[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const Tc = {
  data: Fo,
  props: jo,
  emits: jo,
  // objects
  methods: sn,
  computed: sn,
  // lifecycle
  beforeCreate: Se,
  created: Se,
  beforeMount: Se,
  mounted: Se,
  beforeUpdate: Se,
  updated: Se,
  beforeDestroy: Se,
  beforeUnmount: Se,
  destroyed: Se,
  unmounted: Se,
  activated: Se,
  deactivated: Se,
  errorCaptured: Se,
  serverPrefetch: Se,
  // assets
  components: sn,
  directives: sn,
  // watch
  watch: Fc,
  // provide / inject
  provide: Fo,
  inject: Dc
};
function Fo(e, t) {
  return t ? e ? function() {
    return be(
      W(e) ? e.call(this, this) : e,
      W(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Dc(e, t) {
  return sn(Wr(e), Wr(t));
}
function Wr(e) {
  if (B(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Se(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function sn(e, t) {
  return e ? be(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function jo(e, t) {
  return e ? B(e) && B(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : be(
    /* @__PURE__ */ Object.create(null),
    To(e),
    To(t ?? {})
  ) : t;
}
function Fc(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = be(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = Se(e[r], t[r]);
  return n;
}
function fi() {
  return {
    app: null,
    config: {
      isNativeTag: xs,
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
let jc = 0;
function Hc(e, t) {
  return function(r, o = null) {
    W(r) || (r = be({}, r)), o != null && !te(o) && (o = null);
    const s = fi(), i = /* @__PURE__ */ new WeakSet(), l = [];
    let c = !1;
    const a = s.app = {
      _uid: jc++,
      _component: r,
      _props: o,
      _container: null,
      _context: s,
      _instance: null,
      version: ha,
      get config() {
        return s.config;
      },
      set config(u) {
      },
      use(u, ...p) {
        return i.has(u) || (u && W(u.install) ? (i.add(u), u.install(a, ...p)) : W(u) && (i.add(u), u(a, ...p))), a;
      },
      mixin(u) {
        return s.mixins.includes(u) || s.mixins.push(u), a;
      },
      component(u, p) {
        return p ? (s.components[u] = p, a) : s.components[u];
      },
      directive(u, p) {
        return p ? (s.directives[u] = p, a) : s.directives[u];
      },
      mount(u, p, y) {
        if (!c) {
          const v = a._ceVNode || nt(r, o);
          return v.appContext = s, y === !0 ? y = "svg" : y === !1 && (y = void 0), e(v, u, y), c = !0, a._container = u, u.__vue_app__ = a, mo(v.component);
        }
      },
      onUnmount(u) {
        l.push(u);
      },
      unmount() {
        c && ($e(
          l,
          a._instance,
          16
        ), e(null, a._container), delete a._container.__vue_app__);
      },
      provide(u, p) {
        return s.provides[u] = p, a;
      },
      runWithContext(u) {
        const p = qt;
        qt = a;
        try {
          return u();
        } finally {
          qt = p;
        }
      }
    };
    return a;
  };
}
let qt = null;
const kc = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${ke(t)}Modifiers`] || e[`${Dt(t)}Modifiers`];
function Lc(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || se;
  let o = n;
  const s = t.startsWith("update:"), i = s && kc(r, t.slice(7));
  i && (i.trim && (o = n.map((u) => ue(u) ? u.trim() : u)), i.number && (o = o.map(Ml)));
  let l, c = r[l = vr(t)] || // also try camelCase event handler (#2249)
  r[l = vr(ke(t))];
  !c && s && (c = r[l = vr(Dt(t))]), c && $e(
    c,
    e,
    6,
    o
  );
  const a = r[l + "Once"];
  if (a) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, $e(
      a,
      e,
      6,
      o
    );
  }
}
const Kc = /* @__PURE__ */ new WeakMap();
function di(e, t, n = !1) {
  const r = n ? Kc : t.emitsCache, o = r.get(e);
  if (o !== void 0)
    return o;
  const s = e.emits;
  let i = {}, l = !1;
  if (!W(e)) {
    const c = (a) => {
      const u = di(a, t, !0);
      u && (l = !0, be(i, u));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !s && !l ? (te(e) && r.set(e, null), null) : (B(s) ? s.forEach((c) => i[c] = null) : be(i, s), te(e) && r.set(e, i), i);
}
function lr(e, t) {
  return !e || !Jn(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), ee(e, t[0].toLowerCase() + t.slice(1)) || ee(e, Dt(t)) || ee(e, t));
}
function Ho(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: o,
    propsOptions: [s],
    slots: i,
    attrs: l,
    emit: c,
    render: a,
    renderCache: u,
    props: p,
    data: y,
    setupState: v,
    ctx: P,
    inheritAttrs: C
  } = e, F = Bn(e);
  let K, M;
  try {
    if (n.shapeFlag & 4) {
      const E = o || r, k = E;
      K = We(
        a.call(
          k,
          E,
          u,
          p,
          v,
          y,
          P
        )
      ), M = l;
    } else {
      const E = t;
      K = We(
        E.length > 1 ? E(
          p,
          { attrs: l, slots: i, emit: c }
        ) : E(
          p,
          null
        )
      ), M = t.props ? l : $c(l);
    }
  } catch (E) {
    Pt.length = 0, or(E, e, 1), K = nt(it);
  }
  let j = K;
  if (M && C !== !1) {
    const E = Object.keys(M), { shapeFlag: k } = j;
    E.length && k & 7 && (s && E.some(Zn) && (M = Vc(
      M,
      s
    )), j = Yt(j, M, !1, !0));
  }
  if (n.dirs && (j = Yt(j, null, !1, !0), j.dirs = j.dirs ? j.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const E = sr(j.type) && ri(j) || j;
    fo(E, n.transition);
  }
  return K = j, Bn(F), K;
}
const $c = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Jn(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Vc = (e, t) => {
  const n = {};
  for (const r in e)
    (!Zn(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
  return n;
};
function Nc(e, t, n) {
  const { props: r, children: o, component: s } = e, { props: i, children: l, patchFlag: c } = t, a = s.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return r ? ko(r, i, a) : !!i;
    if (c & 8) {
      const u = t.dynamicProps;
      for (let p = 0; p < u.length; p++) {
        const y = u[p];
        if (pi(i, r, y) && !lr(a, y))
          return !0;
      }
    }
  } else
    return (o || l) && (!l || !l.$stable) ? !0 : r === i ? !1 : r ? i ? ko(r, i, a) : !0 : !!i;
  return !1;
}
function ko(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < r.length; o++) {
    const s = r[o];
    if (pi(t, e, s) && !lr(n, s))
      return !0;
  }
  return !1;
}
function pi(e, t, n) {
  const r = e[n], o = t[n];
  return n === "style" && te(r) && te(o) ? !tr(r, o) : r !== o;
}
function Bc({ vnode: e, parent: t, suspense: n }, r) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.suspense.vnode.el = o.el = r, e = o), o === e)
      (e = t.vnode).el = r, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = r);
}
const gi = {}, hi = () => Object.create(gi), mi = (e) => Object.getPrototypeOf(e) === gi;
function Wc(e, t, n, r = !1) {
  const o = {}, s = hi();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), yi(e, t, o, s);
  for (const i in e.propsOptions[0])
    i in o || (o[i] = void 0);
  n ? e.props = r ? o : /* @__PURE__ */ Ql(o) : e.type.props ? e.props = o : e.props = s, e.attrs = s;
}
function Uc(e, t, n, r) {
  const {
    props: o,
    attrs: s,
    vnode: { patchFlag: i }
  } = e, l = /* @__PURE__ */ Q(o), [c] = e.propsOptions;
  let a = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (r || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const u = e.vnode.dynamicProps;
      for (let p = 0; p < u.length; p++) {
        let y = u[p];
        if (lr(e.emitsOptions, y))
          continue;
        const v = t[y];
        if (c)
          if (ee(s, y))
            v !== s[y] && (s[y] = v, a = !0);
          else {
            const P = ke(y);
            o[P] = Ur(
              c,
              l,
              P,
              v,
              e,
              !1
            );
          }
        else
          v !== s[y] && (s[y] = v, a = !0);
      }
    }
  } else {
    yi(e, t, o, s) && (a = !0);
    let u;
    for (const p in l)
      (!t || // for camelCase
      !ee(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((u = Dt(p)) === p || !ee(t, u))) && (c ? n && // for camelCase
      (n[p] !== void 0 || // for kebab-case
      n[u] !== void 0) && (o[p] = Ur(
        c,
        l,
        p,
        void 0,
        e,
        !0
      )) : delete o[p]);
    if (s !== l)
      for (const p in s)
        (!t || !ee(t, p)) && (delete s[p], a = !0);
  }
  a && tt(e.attrs, "set", "");
}
function yi(e, t, n, r) {
  const [o, s] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let c in t) {
      if (cn(c))
        continue;
      const a = t[c];
      let u;
      o && ee(o, u = ke(c)) ? !s || !s.includes(u) ? n[u] = a : (l || (l = {}))[u] = a : lr(e.emitsOptions, c) || (!(c in r) || a !== r[c]) && (r[c] = a, i = !0);
    }
  if (s) {
    const c = /* @__PURE__ */ Q(n), a = l || se;
    for (let u = 0; u < s.length; u++) {
      const p = s[u];
      n[p] = Ur(
        o,
        c,
        p,
        a[p],
        e,
        !ee(a, p)
      );
    }
  }
  return i;
}
function Ur(e, t, n, r, o, s) {
  const i = e[n];
  if (i != null) {
    const l = ee(i, "default");
    if (l && r === void 0) {
      const c = i.default;
      if (i.type !== Function && !i.skipFactory && W(c)) {
        const { propsDefaults: a } = o;
        if (n in a)
          r = a[n];
        else {
          const u = Cn(o);
          r = a[n] = c.call(
            null,
            t
          ), u();
        }
      } else
        r = c;
      o.ce && o.ce._setProp(n, r);
    }
    i[
      0
      /* shouldCast */
    ] && (s && !l ? r = !1 : i[
      1
      /* shouldCastTrue */
    ] && (r === "" || r === Dt(n)) && (r = !0));
  }
  return r;
}
const Gc = /* @__PURE__ */ new WeakMap();
function vi(e, t, n = !1) {
  const r = n ? Gc : t.propsCache, o = r.get(e);
  if (o)
    return o;
  const s = e.props, i = {}, l = [];
  let c = !1;
  if (!W(e)) {
    const u = (p) => {
      c = !0;
      const [y, v] = vi(p, t, !0);
      be(i, y), v && l.push(...v);
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  if (!s && !c)
    return te(e) && r.set(e, Bt), Bt;
  if (B(s))
    for (let u = 0; u < s.length; u++) {
      const p = ke(s[u]);
      Lo(p) && (i[p] = se);
    }
  else if (s)
    for (const u in s) {
      const p = ke(u);
      if (Lo(p)) {
        const y = s[u], v = i[p] = B(y) || W(y) ? { type: y } : be({}, y), P = v.type;
        let C = !1, F = !0;
        if (B(P))
          for (let K = 0; K < P.length; ++K) {
            const M = P[K], j = W(M) && M.name;
            if (j === "Boolean") {
              C = !0;
              break;
            } else j === "String" && (F = !1);
          }
        else
          C = W(P) && P.name === "Boolean";
        v[
          0
          /* shouldCast */
        ] = C, v[
          1
          /* shouldCastTrue */
        ] = F, (C || ee(v, "default")) && l.push(p);
      }
    }
  const a = [i, l];
  return te(e) && r.set(e, a), a;
}
function Lo(e) {
  return e[0] !== "$" && !cn(e);
}
const go = (e) => e === "_" || e === "_ctx" || e === "$stable", ho = (e) => B(e) ? e.map(We) : [We(e)], qc = (e, t, n) => {
  if (t._n)
    return t;
  const r = fc((...o) => ho(t(...o)), n);
  return r._c = !1, r;
}, wi = (e, t, n) => {
  const r = e._ctx;
  for (const o in e) {
    if (go(o)) continue;
    const s = e[o];
    if (W(s))
      t[o] = qc(o, s, r);
    else if (s != null) {
      const i = ho(s);
      t[o] = () => i;
    }
  }
}, bi = (e, t) => {
  const n = ho(t);
  e.slots.default = () => n;
}, _i = (e, t, n) => {
  for (const r in t)
    (n || !go(r)) && (e[r] = t[r]);
}, zc = (e, t, n) => {
  const r = e.slots = hi();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (_i(r, t, n), n && Ps(r, "_", o, !0)) : wi(t, r);
  } else t && bi(e, t);
}, Yc = (e, t, n) => {
  const { vnode: r, slots: o } = e;
  let s = !0, i = se;
  if (r.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? s = !1 : _i(o, t, n) : (s = !t.$stable, wi(t, o)), i = t;
  } else t && (bi(e, t), i = { default: 1 });
  if (s)
    for (const l in o)
      !go(l) && i[l] == null && delete o[l];
}, Ee = ea;
function Xc(e) {
  return Jc(e);
}
function Jc(e, t) {
  const n = er();
  n.__VUE__ = !0;
  const {
    insert: r,
    remove: o,
    patchProp: s,
    createElement: i,
    createText: l,
    createComment: c,
    setText: a,
    setElementText: u,
    parentNode: p,
    nextSibling: y,
    setScopeId: v = qe,
    insertStaticContent: P
  } = e, C = (f, d, m, x = null, S = null, _ = null, I = void 0, O = null, R = !!d.dynamicChildren) => {
    if (f === d)
      return;
    f && !nn(f, d) && (x = kt(f), je(f, S, _, !0), f = null), d.patchFlag === -2 && (R = !1, d.dynamicChildren = null);
    const { type: b, ref: L, shapeFlag: T } = d;
    switch (b) {
      case cr:
        F(f, d, m, x);
        break;
      case it:
        K(f, d, m, x);
        break;
      case Pr:
        f == null && M(d, m, x, I);
        break;
      case Te:
        ne(
          f,
          d,
          m,
          x,
          S,
          _,
          I,
          O,
          R
        );
        break;
      default:
        T & 1 ? k(
          f,
          d,
          m,
          x,
          S,
          _,
          I,
          O,
          R
        ) : T & 6 ? fe(
          f,
          d,
          m,
          x,
          S,
          _,
          I,
          O,
          R
        ) : (T & 64 || T & 128) && b.process(
          f,
          d,
          m,
          x,
          S,
          _,
          I,
          O,
          R,
          ft
        );
    }
    L != null && S ? fn(L, f && f.ref, _, d || f, !d) : L == null && f && f.ref != null && fn(f.ref, null, _, f, !0);
  }, F = (f, d, m, x) => {
    if (f == null)
      r(
        d.el = l(d.children),
        m,
        x
      );
    else {
      const S = d.el = f.el;
      d.children !== f.children && a(S, d.children);
    }
  }, K = (f, d, m, x) => {
    f == null ? r(
      d.el = c(d.children || ""),
      m,
      x
    ) : d.el = f.el;
  }, M = (f, d, m, x) => {
    [f.el, f.anchor] = P(
      f.children,
      d,
      m,
      x,
      f.el,
      f.anchor
    );
  }, j = ({ el: f, anchor: d }, m, x) => {
    let S;
    for (; f && f !== d; )
      S = y(f), r(f, m, x), f = S;
    r(d, m, x);
  }, E = ({ el: f, anchor: d }) => {
    let m;
    for (; f && f !== d; )
      m = y(f), o(f), f = m;
    o(d);
  }, k = (f, d, m, x, S, _, I, O, R) => {
    if (d.type === "svg" ? I = "svg" : d.type === "math" && (I = "mathml"), f == null)
      N(
        d,
        m,
        x,
        S,
        _,
        I,
        O,
        R
      );
    else {
      const b = f.el && f.el._isVueCE ? f.el : null;
      try {
        b && b._beginPatch(), D(
          f,
          d,
          S,
          _,
          I,
          O,
          R
        );
      } finally {
        b && b._endPatch();
      }
    }
  }, N = (f, d, m, x, S, _, I, O) => {
    let R, b;
    const { props: L, shapeFlag: T, transition: H, dirs: $ } = f;
    if (R = f.el = i(
      f.type,
      _,
      L && L.is,
      L
    ), T & 8 ? u(R, f.children) : T & 16 && V(
      f.children,
      R,
      null,
      x,
      S,
      Or(f, _),
      I,
      O
    ), $ && _t(f, null, x, "created"), ie(R, f, f.scopeId, I, x), L) {
      for (const X in L)
        X !== "value" && !cn(X) && s(R, X, null, L[X], _, x);
      "value" in L && s(R, "value", null, L.value, _), (b = L.onVnodeBeforeMount) && Ve(b, x, f);
    }
    $ && _t(f, null, x, "beforeMount");
    const G = Zc(S, H);
    G && H.beforeEnter(R), r(R, d, m), ((b = L && L.onVnodeMounted) || G || $) && Ee(() => {
      try {
        b && Ve(b, x, f), G && H.enter(R), $ && _t(f, null, x, "mounted");
      } finally {
      }
    }, S);
  }, ie = (f, d, m, x, S) => {
    if (m && v(f, m), x)
      for (let _ = 0; _ < x.length; _++)
        v(f, x[_]);
    if (S) {
      let _ = S.subTree;
      if (d === _ || Ci(_.type) && (_.ssContent === d || _.ssFallback === d)) {
        const I = S.vnode;
        ie(
          f,
          I,
          I.scopeId,
          I.slotScopeIds,
          S.parent
        );
      }
    }
  }, V = (f, d, m, x, S, _, I, O, R = 0) => {
    for (let b = R; b < f.length; b++) {
      const L = f[b] = O ? et(f[b]) : We(f[b]);
      C(
        null,
        L,
        d,
        m,
        x,
        S,
        _,
        I,
        O
      );
    }
  }, D = (f, d, m, x, S, _, I) => {
    const O = d.el = f.el;
    let { patchFlag: R, dynamicChildren: b, dirs: L } = d;
    R |= f.patchFlag & 16;
    const T = f.props || se, H = d.props || se;
    let $;
    if (m && St(m, !1), ($ = H.onVnodeBeforeUpdate) && Ve($, m, d, f), L && _t(d, f, m, "beforeUpdate"), m && St(m, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    b && (!f.dynamicChildren || f.dynamicChildren.length !== b.length) && (R = 0, I = !1, b = null), (T.innerHTML && H.innerHTML == null || T.textContent && H.textContent == null) && u(O, ""), b ? z(
      f.dynamicChildren,
      b,
      O,
      m,
      x,
      Or(d, S),
      _
    ) : I || Z(
      f,
      d,
      O,
      null,
      m,
      x,
      Or(d, S),
      _,
      !1
    ), R > 0) {
      if (R & 16)
        le(O, T, H, m, S);
      else if (R & 2 && T.class !== H.class && s(O, "class", null, H.class, S), R & 4 && s(O, "style", T.style, H.style, S), R & 8) {
        const G = d.dynamicProps;
        for (let X = 0; X < G.length; X++) {
          const q = G[X], ce = T[q], de = H[q];
          (de !== ce || q === "value") && s(O, q, ce, de, S, m);
        }
      }
      R & 1 && f.children !== d.children && u(O, d.children);
    } else !I && b == null && le(O, T, H, m, S);
    (($ = H.onVnodeUpdated) || L) && Ee(() => {
      $ && Ve($, m, d, f), L && _t(d, f, m, "updated");
    }, x);
  }, z = (f, d, m, x, S, _, I) => {
    for (let O = 0; O < d.length; O++) {
      const R = f[O], b = d[O], L = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        R.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (R.type === Te || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !nn(R, b) || // - In the case of a component, it could contain anything.
        R.shapeFlag & 198) ? p(R.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          m
        )
      );
      C(
        R,
        b,
        L,
        null,
        x,
        S,
        _,
        I,
        !0
      );
    }
  }, le = (f, d, m, x, S) => {
    if (d !== m) {
      if (d !== se)
        for (const _ in d)
          !cn(_) && !(_ in m) && s(
            f,
            _,
            d[_],
            null,
            S,
            x
          );
      for (const _ in m) {
        if (cn(_)) continue;
        const I = m[_], O = d[_];
        I !== O && _ !== "value" && s(f, _, O, I, S, x);
      }
      "value" in m && s(f, "value", d.value, m.value, S);
    }
  }, ne = (f, d, m, x, S, _, I, O, R) => {
    const b = d.el = f ? f.el : l(""), L = d.anchor = f ? f.anchor : l("");
    let { patchFlag: T, dynamicChildren: H, slotScopeIds: $ } = d;
    $ && (O = O ? O.concat($) : $), f == null ? (r(b, m, x), r(L, m, x), V(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      d.children || [],
      m,
      L,
      S,
      _,
      I,
      O,
      R
    )) : T > 0 && T & 64 && H && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    f.dynamicChildren && f.dynamicChildren.length === H.length ? (z(
      f.dynamicChildren,
      H,
      m,
      S,
      _,
      I,
      O
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (d.key != null || S && d === S.subTree) && Si(
      f,
      d,
      !0
      /* shallow */
    )) : Z(
      f,
      d,
      m,
      L,
      S,
      _,
      I,
      O,
      R
    );
  }, fe = (f, d, m, x, S, _, I, O, R) => {
    d.slotScopeIds = O, f == null ? d.shapeFlag & 512 ? S.ctx.activate(
      d,
      m,
      x,
      I,
      R
    ) : Ce(
      d,
      m,
      x,
      S,
      _,
      I,
      R
    ) : Me(f, d, R);
  }, Ce = (f, d, m, x, S, _, I) => {
    const O = f.component = ca(
      f,
      x,
      S
    );
    if (po(f) && (O.ctx.renderer = ft), ua(O, !1, I), O.asyncDep) {
      if (S && S.registerDep(O, J, I), !f.el) {
        const R = O.subTree = nt(it);
        K(null, R, d, m), f.placeholder = R.el;
      }
    } else
      J(
        O,
        f,
        d,
        m,
        S,
        _,
        I
      );
  }, Me = (f, d, m) => {
    const x = d.component = f.component;
    if (Nc(f, d, m))
      if (x.asyncDep && !x.asyncResolved) {
        U(x, d, m);
        return;
      } else
        x.next = d, x.update();
    else
      d.el = f.el, x.vnode = d;
  }, J = (f, d, m, x, S, _, I) => {
    const O = () => {
      if (f.isMounted) {
        let { next: T, bu: H, u: $, parent: G, vnode: X } = f;
        {
          const Ie = xi(f);
          if (Ie) {
            T && (T.el = X.el, U(f, T, I)), Ie.asyncDep.then(() => {
              Ee(() => {
                f.isUnmounted || b();
              }, S);
            });
            return;
          }
        }
        let q = T, ce;
        St(f, !1), T ? (T.el = X.el, U(f, T, I)) : T = X, H && wr(H), (ce = T.props && T.props.onVnodeBeforeUpdate) && Ve(ce, G, T, X), St(f, !0);
        const de = Ho(f), Pe = f.subTree;
        f.subTree = de, C(
          Pe,
          de,
          // parent may have changed if it's in a teleport
          p(Pe.el),
          // anchor may have changed if it's in a fragment
          kt(Pe),
          f,
          S,
          _
        ), T.el = de.el, q === null && Bc(f, de.el), $ && Ee($, S), (ce = T.props && T.props.onVnodeUpdated) && Ee(
          () => Ve(ce, G, T, X),
          S
        );
      } else {
        let T;
        const { el: H, props: $ } = d, { bm: G, m: X, parent: q, root: ce, type: de } = f, Pe = dn(d);
        St(f, !1), G && wr(G), !Pe && (T = $ && $.onVnodeBeforeMount) && Ve(T, q, d), St(f, !0);
        {
          ce.ce && ce.ce._hasShadowRoot() && ce.ce._injectChildStyle(
            de,
            f.parent ? f.parent.type : void 0
          );
          const Ie = f.subTree = Ho(f);
          C(
            null,
            Ie,
            m,
            x,
            f,
            S,
            _
          ), d.el = Ie.el;
        }
        if (X && Ee(X, S), !Pe && (T = $ && $.onVnodeMounted)) {
          const Ie = d;
          Ee(
            () => Ve(T, q, Ie),
            S
          );
        }
        (d.shapeFlag & 256 || q && dn(q.vnode) && q.vnode.shapeFlag & 256) && f.a && Ee(f.a, S), f.isMounted = !0, d = m = x = null;
      }
    };
    f.scope.on();
    const R = f.effect = new Ds(O);
    f.scope.off();
    const b = f.update = R.run.bind(R), L = f.job = R.runIfDirty.bind(R);
    L.i = f, L.id = f.uid, R.scheduler = () => uo(L), St(f, !0), b();
  }, U = (f, d, m) => {
    d.component = f;
    const x = f.vnode.props;
    f.vnode = d, f.next = null, Uc(f, d.props, x, m), Yc(f, d.children, m), rt(), Eo(f), ot();
  }, Z = (f, d, m, x, S, _, I, O, R = !1) => {
    const b = f && f.children, L = f ? f.shapeFlag : 0, T = d.children, { patchFlag: H, shapeFlag: $ } = d;
    if (H > 0) {
      if (H & 128) {
        Oe(
          b,
          T,
          m,
          x,
          S,
          _,
          I,
          O,
          R
        );
        return;
      } else if (H & 256) {
        Ye(
          b,
          T,
          m,
          x,
          S,
          _,
          I,
          O,
          R
        );
        return;
      }
    }
    $ & 8 ? (L & 16 && ut(b, S, _), T !== b && u(m, T)) : L & 16 ? $ & 16 ? Oe(
      b,
      T,
      m,
      x,
      S,
      _,
      I,
      O,
      R
    ) : ut(b, S, _, !0) : (L & 8 && u(m, ""), $ & 16 && V(
      T,
      m,
      x,
      S,
      _,
      I,
      O,
      R
    ));
  }, Ye = (f, d, m, x, S, _, I, O, R) => {
    f = f || Bt, d = d || Bt;
    const b = f.length, L = d.length, T = Math.min(b, L);
    let H;
    for (H = 0; H < T; H++) {
      const $ = d[H] = R ? et(d[H]) : We(d[H]);
      C(
        f[H],
        $,
        m,
        null,
        S,
        _,
        I,
        O,
        R
      );
    }
    b > L ? ut(
      f,
      S,
      _,
      !0,
      !1,
      T
    ) : V(
      d,
      m,
      x,
      S,
      _,
      I,
      O,
      R,
      T
    );
  }, Oe = (f, d, m, x, S, _, I, O, R) => {
    let b = 0;
    const L = d.length;
    let T = f.length - 1, H = L - 1;
    for (; b <= T && b <= H; ) {
      const $ = f[b], G = d[b] = R ? et(d[b]) : We(d[b]);
      if (nn($, G))
        C(
          $,
          G,
          m,
          null,
          S,
          _,
          I,
          O,
          R
        );
      else
        break;
      b++;
    }
    for (; b <= T && b <= H; ) {
      const $ = f[T], G = d[H] = R ? et(d[H]) : We(d[H]);
      if (nn($, G))
        C(
          $,
          G,
          m,
          null,
          S,
          _,
          I,
          O,
          R
        );
      else
        break;
      T--, H--;
    }
    if (b > T) {
      if (b <= H) {
        const $ = H + 1, G = $ < L ? d[$].el : x;
        for (; b <= H; )
          C(
            null,
            d[b] = R ? et(d[b]) : We(d[b]),
            m,
            G,
            S,
            _,
            I,
            O,
            R
          ), b++;
      }
    } else if (b > H)
      for (; b <= T; )
        je(f[b], S, _, !0), b++;
    else {
      const $ = b, G = b, X = /* @__PURE__ */ new Map();
      for (b = G; b <= H; b++) {
        const _e = d[b] = R ? et(d[b]) : We(d[b]);
        _e.key != null && X.set(_e.key, b);
      }
      let q, ce = 0;
      const de = H - G + 1;
      let Pe = !1, Ie = 0;
      const yt = new Array(de);
      for (b = 0; b < de; b++) yt[b] = 0;
      for (b = $; b <= T; b++) {
        const _e = f[b];
        if (ce >= de) {
          je(_e, S, _, !0);
          continue;
        }
        let pe;
        if (_e.key != null)
          pe = X.get(_e.key);
        else
          for (q = G; q <= H; q++)
            if (yt[q - G] === 0 && nn(_e, d[q])) {
              pe = q;
              break;
            }
        pe === void 0 ? je(_e, S, _, !0) : (yt[pe - G] = b + 1, pe >= Ie ? Ie = pe : Pe = !0, C(
          _e,
          d[pe],
          m,
          null,
          S,
          _,
          I,
          O,
          R
        ), ce++);
      }
      const vt = Pe ? Qc(yt) : Bt;
      for (q = vt.length - 1, b = de - 1; b >= 0; b--) {
        const _e = G + b, pe = d[_e], en = d[_e + 1], Kt = _e + 1 < L ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          en.el || Ri(en)
        ) : x;
        yt[b] === 0 ? C(
          null,
          pe,
          m,
          Kt,
          S,
          _,
          I,
          O,
          R
        ) : Pe && (q < 0 || b !== vt[q] ? Fe(pe, m, Kt, 2) : q--);
      }
    }
  }, Fe = (f, d, m, x, S = null) => {
    const { el: _, type: I, transition: O, children: R, shapeFlag: b } = f;
    if (b & 6) {
      Fe(f.component.subTree, d, m, x);
      return;
    }
    if (b & 128) {
      f.suspense.move(d, m, x);
      return;
    }
    if (b & 64) {
      I.move(f, d, m, ft);
      return;
    }
    if (I === Te) {
      r(_, d, m);
      for (let T = 0; T < R.length; T++)
        Fe(R[T], d, m, x);
      r(f.anchor, d, m);
      return;
    }
    if (I === Pr) {
      j(f, d, m);
      return;
    }
    if (x !== 2 && b & 1 && O)
      if (x === 0)
        O.persisted && !_[Rr] ? r(_, d, m) : (O.beforeEnter(_), r(_, d, m), Ee(() => O.enter(_), S));
      else {
        const { leave: T, delayLeave: H, afterLeave: $ } = O, G = () => {
          f.ctx.isUnmounted ? o(_) : r(_, d, m);
        }, X = () => {
          const q = _._isLeaving || !!_[Rr];
          _._isLeaving && _[Rr](
            !0
            /* cancelled */
          ), O.persisted && !q ? G() : T(_, () => {
            G(), $ && $();
          });
        };
        H ? H(_, G, X) : X();
      }
    else
      r(_, d, m);
  }, je = (f, d, m, x = !1, S = !1) => {
    const {
      type: _,
      props: I,
      ref: O,
      children: R,
      dynamicChildren: b,
      shapeFlag: L,
      patchFlag: T,
      dirs: H,
      cacheIndex: $,
      memo: G
    } = f;
    if (T === -2 && (S = !1), O != null && (rt(), fn(O, null, m, f, !0), ot()), $ != null && (d.renderCache[$] = void 0), L & 256) {
      d.ctx.deactivate(f);
      return;
    }
    const X = L & 1 && H, q = !dn(f);
    let ce;
    if (q && (ce = I && I.onVnodeBeforeUnmount) && Ve(ce, d, f), L & 6)
      Qt(f.component, m, x);
    else {
      if (L & 128) {
        f.suspense.unmount(m, x);
        return;
      }
      X && _t(f, null, d, "beforeUnmount"), L & 64 ? f.type.remove(
        f,
        d,
        m,
        ft,
        x
      ) : b && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !b.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (_ !== Te || T > 0 && T & 64) ? ut(
        b,
        d,
        m,
        !1,
        !0
      ) : (_ === Te && T & 384 || !S && L & 16) && ut(R, d, m), x && Ht(f);
    }
    const de = G != null && $ == null;
    (q && (ce = I && I.onVnodeUnmounted) || X || de) && Ee(() => {
      ce && Ve(ce, d, f), X && _t(f, null, d, "unmounted"), de && (f.el = null);
    }, m);
  }, Ht = (f) => {
    const { type: d, el: m, anchor: x, transition: S } = f;
    if (d === Te) {
      at(m, x);
      return;
    }
    if (d === Pr) {
      E(f);
      return;
    }
    const _ = () => {
      o(m), S && !S.persisted && S.afterLeave && S.afterLeave();
    };
    if (f.shapeFlag & 1 && S && !S.persisted) {
      const { leave: I, delayLeave: O } = S, R = () => I(m, _);
      O ? O(f.el, _, R) : R();
    } else
      _();
  }, at = (f, d) => {
    let m;
    for (; f !== d; )
      m = y(f), o(f), f = m;
    o(d);
  }, Qt = (f, d, m) => {
    const { bum: x, scope: S, job: _, subTree: I, um: O, m: R, a: b } = f;
    Ko(R), Ko(b), x && wr(x), S.stop(), _ && (_.flags |= 8, je(I, f, d, m)), O && Ee(O, d), Ee(() => {
      f.isUnmounted = !0;
    }, d);
  }, ut = (f, d, m, x = !1, S = !1, _ = 0) => {
    for (let I = _; I < f.length; I++)
      je(f[I], d, m, x, S);
  }, kt = (f) => {
    if (f.shapeFlag & 6)
      return kt(f.component.subTree);
    if (f.shapeFlag & 128)
      return f.suspense.next();
    const d = y(f.anchor || f.el), m = d && d[mc];
    return m ? y(m) : d;
  };
  let Xe = !1;
  const Lt = (f, d, m) => {
    let x;
    f == null ? d._vnode && (je(d._vnode, null, null, !0), x = d._vnode.component) : C(
      d._vnode || null,
      f,
      d,
      null,
      null,
      null,
      m
    ), d._vnode = f, Xe || (Xe = !0, Eo(x), Zs(), Xe = !1);
  }, ft = {
    p: C,
    um: je,
    m: Fe,
    r: Ht,
    mt: Ce,
    mc: V,
    pc: Z,
    pbc: z,
    n: kt,
    o: e
  };
  return {
    render: Lt,
    hydrate: void 0,
    createApp: Hc(Lt)
  };
}
function Or({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function St({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Zc(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Si(e, t, n = !1) {
  const r = e.children, o = t.children;
  if (B(r) && B(o))
    for (let s = 0; s < r.length; s++) {
      const i = r[s];
      let l = o[s];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = o[s] = et(o[s]), l.el = i.el), !n && l.patchFlag !== -2 && Si(i, l)), l.type === cr && (l.patchFlag === -1 && (l = o[s] = et(l)), l.el = i.el), l.type === it && !l.el && (l.el = i.el);
    }
}
function Qc(e) {
  const t = e.slice(), n = [0];
  let r, o, s, i, l;
  const c = e.length;
  for (r = 0; r < c; r++) {
    const a = e[r];
    if (a !== 0) {
      if (o = n[n.length - 1], e[o] < a) {
        t[r] = o, n.push(r);
        continue;
      }
      for (s = 0, i = n.length - 1; s < i; )
        l = s + i >> 1, e[n[l]] < a ? s = l + 1 : i = l;
      a < e[n[s]] && (s > 0 && (t[r] = n[s - 1]), n[s] = r);
    }
  }
  for (s = n.length, i = n[s - 1]; s-- > 0; )
    n[s] = i, i = t[i];
  return n;
}
function xi(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : xi(t);
}
function Ko(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function Ri(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? Ri(t.subTree) : null;
}
const Ci = (e) => e.__isSuspense;
function ea(e, t) {
  t && t.pendingBranch ? B(e) ? t.effects.push(...e) : t.effects.push(e) : uc(e);
}
const Te = /* @__PURE__ */ Symbol.for("v-fgt"), cr = /* @__PURE__ */ Symbol.for("v-txt"), it = /* @__PURE__ */ Symbol.for("v-cmt"), Pr = /* @__PURE__ */ Symbol.for("v-stc"), Pt = [];
let De = null;
function he(e = !1) {
  Pt.push(De = e ? null : []);
}
function Mi() {
  Pt.pop(), De = Pt[Pt.length - 1] || null;
}
let vn = 1;
function $o(e, t = !1) {
  vn += e, e < 0 && De && t && (De.hasOnce = !0);
}
function Oi(e) {
  return e.dynamicChildren = vn > 0 ? De || Bt : null, Mi(), vn > 0 && De && De.push(e), e;
}
function ye(e, t, n, r, o, s) {
  return Oi(
    Rt(
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
function ta(e, t, n, r, o) {
  return Oi(
    nt(
      e,
      t,
      n,
      r,
      o,
      !0
    )
  );
}
function Pi(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function nn(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Ei = ({ key: e }) => e ?? null, kn = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? ue(e) || /* @__PURE__ */ we(e) || W(e) ? { i: Ge, r: e, k: t, f: !!n } : e : null);
function Rt(e, t = null, n = null, r = 0, o = null, s = e === Te ? 0 : 1, i = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Ei(t),
    ref: t && kn(t),
    scopeId: ei,
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
    ctx: Ge
  };
  return l ? (Gn(c, n), s & 128 && e.normalize(c)) : n && (c.shapeFlag |= ue(n) ? 8 : 16), vn > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  De && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && De.push(c), c;
}
const nt = na;
function na(e, t = null, n = null, r = 0, o = null, s = !1) {
  if ((!e || e === Pc) && (e = it), Pi(e)) {
    const l = Yt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Gn(l, n), vn > 0 && !s && De && (l.shapeFlag & 6 ? De[De.indexOf(e)] = l : De.push(l)), l.patchFlag = -2, l;
  }
  if (ga(e) && (e = e.__vccOpts), t) {
    t = ra(t);
    let { class: l, style: c } = t;
    l && !ue(l) && (t.class = Ct(l)), te(c) && (/* @__PURE__ */ ao(c) && !B(c) && (c = be({}, c)), t.style = Wt(c));
  }
  const i = ue(e) ? 1 : Ci(e) ? 128 : sr(e) ? 64 : te(e) ? 4 : W(e) ? 2 : 0;
  return Rt(
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
function ra(e) {
  return e ? /* @__PURE__ */ ao(e) || mi(e) ? be({}, e) : e : null;
}
function Yt(e, t, n = !1, r = !1) {
  const { props: o, ref: s, patchFlag: i, children: l, transition: c } = e, a = t ? sa(o || {}, t) : o, u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: a,
    key: a && Ei(a),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && s ? B(s) ? s.concat(kn(t)) : [s, kn(t)] : kn(t)
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
    patchFlag: t && e.type !== Te ? i === -1 ? 16 : i | 16 : i,
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
    ssContent: e.ssContent && Yt(e.ssContent),
    ssFallback: e.ssFallback && Yt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && r && fo(
    u,
    c.clone(u)
  ), u;
}
function oa(e = " ", t = 0) {
  return nt(cr, null, e, t);
}
function rn(e = "", t = !1) {
  return t ? (he(), ta(it, null, e)) : nt(it, null, e);
}
function We(e) {
  return e == null || typeof e == "boolean" ? nt(it) : B(e) ? nt(
    Te,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Pi(e) ? et(e) : nt(cr, null, String(e));
}
function et(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Yt(e);
}
function Gn(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (B(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), Gn(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !mi(t) ? t._ctx = Ge : o === 3 && Ge && (Ge.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (W(t)) {
    if (r & 65) {
      Gn(e, { default: t });
      return;
    }
    t = { default: t, _ctx: Ge }, n = 32;
  } else
    t = String(t), r & 64 ? (n = 16, t = [oa(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function sa(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === "class")
        t.class !== r.class && (t.class = Ct([t.class, r.class]));
      else if (o === "style")
        t.style = Wt([t.style, r.style]);
      else if (Jn(o)) {
        const s = t[o], i = r[o];
        i && s !== i && !(B(s) && s.includes(i)) ? t[o] = s ? [].concat(s, i) : i : i == null && s == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !Zn(o) && (t[o] = i);
      } else o !== "" && (t[o] = r[o]);
  }
  return t;
}
function Ve(e, t, n, r = null) {
  $e(e, t, 7, [
    n,
    r
  ]);
}
const ia = fi();
let la = 0;
function ca(e, t, n) {
  const r = e.type, o = (t ? t.appContext : e.appContext) || ia, s = {
    uid: la++,
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
    scope: new Fl(
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
    propsOptions: vi(r, o),
    emitsOptions: di(r, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: se,
    // inheritAttrs
    inheritAttrs: r.inheritAttrs,
    // state
    ctx: se,
    data: se,
    props: se,
    attrs: se,
    slots: se,
    refs: se,
    setupState: se,
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
  return s.ctx = { _: s }, s.root = t ? t.root : s, s.emit = Lc.bind(null, s), e.ce && e.ce(s), s;
}
let Re = null;
const aa = () => Re || Ge;
let qn, wn;
{
  const e = er(), t = (n, r) => {
    let o;
    return (o = e[n]) || (o = e[n] = []), o.push(r), (s) => {
      o.length > 1 ? o.forEach((i) => i(s)) : o[0](s);
    };
  };
  qn = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Re = n
  ), wn = t(
    "__VUE_SSR_SETTERS__",
    (n) => bn = n
  );
}
const Cn = (e) => {
  const t = Re;
  return qn(e), e.scope.on(), () => {
    e.scope.off(), qn(t);
  };
}, Vo = () => {
  Re && Re.scope.off(), qn(null);
};
function Ii(e) {
  return e.vnode.shapeFlag & 4;
}
let bn = !1;
function ua(e, t = !1, n = !1) {
  t && wn(t);
  const { props: r, children: o } = e.vnode, s = Ii(e);
  Wc(e, r, s, t), zc(e, o, n || t);
  const i = s ? fa(e, t) : void 0;
  return t && wn(!1), i;
}
function fa(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Ec);
  const { setup: r } = n;
  if (r) {
    rt();
    const o = e.setupContext = r.length > 1 ? pa(e) : null, s = Cn(e), i = Rn(
      r,
      e,
      0,
      [
        e.props,
        o
      ]
    ), l = Rs(i);
    if (ot(), s(), (l || e.sp) && !dn(e) && oi(e), l) {
      if (i.then(Vo, Vo), t)
        return i.then((c) => {
          wn(!0);
          try {
            No(e, c, t);
          } finally {
            wn(!1);
          }
        }).catch((c) => {
          or(c, e, 0);
        });
      e.asyncDep = i;
    } else
      No(e, i);
  } else
    Ai(e);
}
function No(e, t, n) {
  W(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : te(t) && (e.setupState = zs(t)), Ai(e);
}
function Ai(e, t, n) {
  const r = e.type;
  e.render || (e.render = r.render || qe);
  {
    const o = Cn(e);
    rt();
    try {
      Ic(e);
    } finally {
      ot(), o();
    }
  }
}
const da = {
  get(e, t) {
    return ve(e, "get", ""), e[t];
  }
};
function pa(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, da),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function mo(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(zs(ec(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in pn)
        return pn[n](e);
    },
    has(t, n) {
      return n in t || n in pn;
    }
  })) : e.proxy;
}
function ga(e) {
  return W(e) && "__vccOpts" in e;
}
const ae = (e, t) => /* @__PURE__ */ sc(e, t, bn), ha = "3.5.42";
/**
* @vue/runtime-dom v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Gr;
const Bo = typeof window < "u" && window.trustedTypes;
if (Bo)
  try {
    Gr = /* @__PURE__ */ Bo.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Ti = Gr ? (e) => Gr.createHTML(e) : (e) => e, ma = "http://www.w3.org/2000/svg", ya = "http://www.w3.org/1998/Math/MathML", Qe = typeof document < "u" ? document : null, Wo = Qe && /* @__PURE__ */ Qe.createElement("template"), va = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const o = t === "svg" ? Qe.createElementNS(ma, e) : t === "mathml" ? Qe.createElementNS(ya, e) : n ? Qe.createElement(e, { is: n }) : Qe.createElement(e);
    return e === "select" && r && r.multiple != null && o.setAttribute("multiple", r.multiple), o;
  },
  createText: (e) => Qe.createTextNode(e),
  createComment: (e) => Qe.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Qe.querySelector(e),
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
      Wo.innerHTML = Ti(
        r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e
      );
      const l = Wo.content;
      if (r === "svg" || r === "mathml") {
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
}, wa = /* @__PURE__ */ Symbol("_vtc");
function ba(e, t, n) {
  const r = e[wa];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Uo = /* @__PURE__ */ Symbol("_vod"), _a = /* @__PURE__ */ Symbol("_vsh"), Sa = /* @__PURE__ */ Symbol(""), xa = /(?:^|;)\s*display\s*:/;
function Ra(e, t, n) {
  const r = e.style, o = ue(n);
  let s = !1;
  if (n && !o) {
    if (t)
      if (ue(t))
        for (const i of t.split(";")) {
          const l = i.slice(0, i.indexOf(":")).trim();
          n[l] == null && ln(r, l, "");
        }
      else
        for (const i in t)
          n[i] == null && ln(r, i, "");
    for (const i in n) {
      i === "display" && (s = !0);
      const l = n[i];
      l != null ? Ma(
        e,
        i,
        !ue(t) && t ? t[i] : void 0,
        l
      ) || ln(r, i, l) : ln(r, i, "");
    }
  } else if (o) {
    if (t !== n) {
      const i = r[Sa];
      i && (n += ";" + i), r.cssText = n, s = xa.test(n);
    }
  } else t && e.removeAttribute("style");
  Uo in e && (e[Uo] = s ? r.display : "", e[_a] && (r.display = "none"));
}
const Tn = /\s*!important$/;
function ln(e, t, n) {
  if (B(n))
    n.forEach((r) => ln(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--"))
    Tn.test(n) ? e.setProperty(t, n.replace(Tn, ""), "important") : e.setProperty(t, n);
  else {
    const r = Ca(e, t);
    Tn.test(n) ? e.setProperty(
      Dt(r),
      n.replace(Tn, ""),
      "important"
    ) : e[r] = n;
  }
}
const Go = ["Webkit", "Moz", "ms"], Er = {};
function Ca(e, t) {
  const n = Er[t];
  if (n)
    return n;
  let r = ke(t);
  if (r !== "filter" && r in e)
    return Er[t] = r;
  r = Os(r);
  for (let o = 0; o < Go.length; o++) {
    const s = Go[o] + r;
    if (s in e)
      return Er[t] = s;
  }
  return t;
}
function Ma(e, t, n, r) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && ue(r) && n === r;
}
const qo = "http://www.w3.org/1999/xlink";
function zo(e, t, n, r, o, s = Tl(t)) {
  r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(qo, t.slice(6, t.length)) : e.setAttributeNS(qo, t, n) : n == null || s && !Es(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    s ? "" : ze(n) ? String(n) : n
  );
}
function Yo(e, t, n, r, o) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Ti(n) : n);
    return;
  }
  const s = e.tagName;
  if (t === "value" && s !== "PROGRESS" && // custom elements may use _value internally
  !s.includes("-")) {
    const l = s === "OPTION" ? e.getAttribute("value") || "" : e.value, c = n == null ? (
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
    l === "boolean" ? n = Es(n) : n == null && l === "string" ? (n = "", i = !0) : l === "number" && (n = 0, i = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  i && e.removeAttribute(o || t);
}
function Oa(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function Pa(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const Xo = /* @__PURE__ */ Symbol("_vei");
function Ea(e, t, n, r, o = null) {
  const s = e[Xo] || (e[Xo] = {}), i = s[t];
  if (r && i)
    i.value = r;
  else {
    const [l, c] = Ta(t);
    if (r) {
      const a = s[t] = ja(
        r,
        o
      );
      Oa(e, l, a, c);
    } else i && (Pa(e, l, i, c), s[t] = void 0);
  }
}
const Ia = /(Once|Passive|Capture)$/, Aa = /^on:?(?:Once|Passive|Capture)$/;
function Ta(e) {
  let t, n;
  for (; (n = e.match(Ia)) && !Aa.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : Dt(e.slice(2)), t];
}
let Ir = 0;
const Da = /* @__PURE__ */ Promise.resolve(), Fa = () => Ir || (Da.then(() => Ir = 0), Ir = Date.now());
function ja(e, t) {
  const n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    const o = n.value;
    if (B(o)) {
      const s = r.stopImmediatePropagation;
      r.stopImmediatePropagation = () => {
        s.call(r), r._stopped = !0;
      };
      const i = o.slice(), l = [r];
      for (let c = 0; c < i.length && !r._stopped; c++) {
        const a = i[c];
        a && $e(
          a,
          t,
          5,
          l
        );
      }
    } else
      $e(
        o,
        t,
        5,
        [r]
      );
  };
  return n.value = e, n.attached = Fa(), n;
}
const Jo = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Ha = (e, t, n, r, o, s) => {
  const i = o === "svg";
  t === "class" ? ba(e, r, i) : t === "style" ? Ra(e, n, r) : Jn(t) ? Zn(t) || Ea(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : ka(e, t, r, i)) ? (Yo(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && zo(e, t, r, i, s, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (La(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !ue(r))) ? Yo(e, ke(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), zo(e, t, r, i));
};
function ka(e, t, n, r) {
  if (r)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Jo(t) && W(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return Jo(t) && ue(n) ? !1 : t in e;
}
function La(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const r = ke(t);
  return Array.isArray(n) ? n.some((o) => ke(o) === r) : Object.keys(n).some((o) => ke(o) === r);
}
const Ka = ["ctrl", "shift", "alt", "meta"], $a = {
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
  exact: (e, t) => Ka.some((n) => e[`${n}Key`] && !t.includes(n))
}, Zo = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), r = t.join(".");
  return n[r] || (n[r] = (o, ...s) => {
    for (let i = 0; i < t.length; i++) {
      const l = $a[t[i]];
      if (l && l(o, t)) return;
    }
    return e(o, ...s);
  });
}, Va = /* @__PURE__ */ be({ patchProp: Ha }, va);
let Qo;
function Na() {
  return Qo || (Qo = Xc(Va));
}
const Ba = (...e) => {
  const t = Na().createApp(...e), { mount: n } = t;
  return t.mount = (r) => {
    const o = Ua(r);
    if (!o) return;
    const s = t._component;
    !W(s) && !s.render && !s.template && (s.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const i = n(o, !1, Wa(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), i;
  }, t;
};
function Wa(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Ua(e) {
  return ue(e) ? document.querySelector(e) : e;
}
function Dn() {
  return !0;
}
const Ga = Symbol("merge-proxy"), Ln = Symbol("merge-proxy-sources"), qa = {
  get(e, t, n) {
    return t === Ga ? n : t === Ln ? e.sources : e.get(t);
  },
  has(e, t) {
    return e.has(t);
  },
  set: Dn,
  deleteProperty: Dn,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: Dn,
      deleteProperty: Dn
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function Kn(e) {
  return e && typeof e == "object" && "value" in e ? e.value : e;
}
function qr(...e) {
  const t = e.flatMap((n) => typeof n == "object" && n !== null && Ln in n && Array.isArray(n[Ln]) ? n[Ln] : [n]);
  return new Proxy({
    sources: t,
    get(n) {
      for (let r = t.length - 1; r >= 0; r--) {
        const o = Kn(t[r])[n];
        if (o !== void 0) return o;
      }
    },
    has(n) {
      for (let r = t.length - 1; r >= 0; r--) if (n in Kn(t[r])) return !0;
      return !1;
    },
    keys() {
      const n = [];
      for (const r of t) n.push(...Object.keys(Kn(r)));
      return [...Array.from(new Set(n))];
    }
  }, qa);
}
function es(...e) {
  const t = {};
  for (let n of e)
    if (n = Kn(n), !!n)
      for (const r of Reflect.ownKeys(n)) {
        const o = n[r];
        o !== void 0 && (t[r] = o);
      }
  return t;
}
function Di(e) {
  return typeof e == "function" ? e : (t) => {
    var n;
    return (n = e.next) == null ? void 0 : n.call(e, t);
  };
}
function za(e) {
  return Object.assign(e, {
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: Ae(e, Di(t), { flush: "sync" }) })
  });
}
function Ya(e) {
  return Object.assign(e, {
    set: (t) => {
      e.value = typeof t == "function" ? t(e.value) : t;
    },
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: Ae(e, Di(t), { flush: "sync" }) })
  });
}
function Xa() {
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
    createReadonlyAtom: (t, n) => za(ae(() => t())),
    createWritableAtom: (t, n) => Ya(/* @__PURE__ */ tc(t)),
    untrack: (t) => t(),
    batch: (t) => t()
  };
}
function ar(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function mt(e) {
  if (Array.isArray(e)) return e.map(mt);
  if (e && typeof e == "object") {
    const t = Object.getPrototypeOf(e);
    if (t !== Object.prototype && t !== null) return e;
    const n = t === null ? re() : {}, r = Object.keys(e);
    for (let o = 0; o < r.length; o++) {
      const s = r[o];
      Object.defineProperty(n, s, {
        configurable: !0,
        enumerable: !0,
        value: mt(e[s]),
        writable: !0
      });
    }
    return n;
  }
  return e;
}
function Ja(e, t) {
  const n = Object.keys(t), r = e;
  for (let o = 0; o < n.length; o++) {
    const s = n[o];
    !s.startsWith("_memo_") && s !== "_cellsCache" && (r[s] = t[s]);
  }
  return e;
}
function re() {
  return /* @__PURE__ */ Object.create(null);
}
function Xt(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Fi(e, t) {
  return (n) => {
    var r;
    (((r = t.options.atoms) == null ? void 0 : r[e]) ?? t.baseAtoms[e]).set((o) => ar(n, o));
  };
}
function ts(e) {
  if (typeof e != "object" || e === null) return !1;
  if (Array.isArray(e)) return !0;
  const t = Object.getPrototypeOf(e);
  return t === Object.prototype || t === null;
}
function ns(e) {
  return Reflect.ownKeys(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
const Za = 3;
function Qa(e, t) {
  return ji(e, t, Za);
}
function ji(e, t, n) {
  if (Object.is(e, t)) return !0;
  if (n <= 0 || !ts(e) || !ts(t) || (Array.isArray(e) || Array.isArray(t)) && (!Array.isArray(e) || !Array.isArray(t) || e.length !== t.length))
    return !1;
  const r = ns(e), o = ns(t);
  if (r.length !== o.length) return !1;
  const s = e, i = t;
  for (let l = 0; l < r.length; l++) {
    const c = r[l];
    if (!Object.prototype.propertyIsEnumerable.call(t, c) || !ji(s[c], i[c], n - 1)) return !1;
  }
  return !0;
}
function ur(e, t, n, r = Qa) {
  const o = `on${t.charAt(0).toUpperCase()}${t.slice(1)}Change`, s = e.options[o];
  s && s((i) => {
    const l = ar(n, i);
    return r(i, l) ? i : l;
  });
}
function eu(e, t) {
  const n = [], r = (o) => {
    o.forEach((s) => {
      n.push(s);
      const i = t(s);
      i.length && r(i);
    });
  };
  return r(e), n;
}
const tu = ({ fn: e, memoDeps: t, onAfterCompare: n, onAfterUpdate: r, onBeforeCompare: o, onBeforeUpdate: s }) => {
  let i = [], l;
  return (a) => {
    o == null || o();
    const u = t == null ? void 0 : t(a);
    let p = !u || u.length !== (i == null ? void 0 : i.length);
    if (!p && u) {
      for (let y = 0; y < u.length; y++) if (u[y] !== i[y]) {
        p = !0;
        break;
      }
    }
    return n == null || n(p), p && (i = u, s == null || s(), l = e(...u ?? []), r == null || r(l)), l;
  };
};
function nu(e) {
  let t = !1;
  return () => {
    if (!t) {
      t = !0;
      return;
    }
    e();
  };
}
function fr({ feature: e, fnName: t, objectId: n, onAfterUpdate: r, table: o, ...s }) {
  const i = () => {
    if (!r) return;
    const { schedule: c, untrack: a } = o._reactivity;
    c(() => a(() => r()));
  };
  return tu({
    ...s,
    ...{ onAfterUpdate: () => {
      i();
    } }
  });
}
function Hi(e, t = "_") {
  const [n, r] = e.split(t);
  return {
    fnKey: r,
    fnName: `${n}.${r}`,
    parentName: n
  };
}
function Ft(e, t, n) {
  for (const [r, { fn: o, memoDeps: s }] of Object.entries(n)) {
    const { fnKey: i, fnName: l } = Hi(r);
    t[i] = s ? fr({
      memoDeps: s,
      fn: o,
      fnName: l,
      table: t,
      feature: e
    }) : o;
  }
}
function Jt(e, t, n, r) {
  for (const [o, { fn: s, memoDeps: i }] of Object.entries(r)) {
    const { fnKey: l, fnName: c } = Hi(o);
    if (i) {
      const a = `_memo_${l}`;
      t[l] = function(...u) {
        if (!this[a]) {
          const p = this;
          this[a] = fr({
            memoDeps: (y) => i(p, y),
            fn: (...y) => s(p, ...y),
            fnName: c,
            objectId: p.id,
            table: n,
            feature: e
          });
        }
        return this[a](...u);
      };
    } else t[l] = function(...a) {
      return s(this, ...a);
    };
  }
}
function me(e, t, n, ...r) {
  var o;
  return ((o = e[t]) == null ? void 0 : o.call(e, ...r)) ?? n(e, ...r);
}
function ru(e) {
  return e.row.getValue(e.column.id);
}
function ou(e) {
  return e.getValue() ?? e.table.options.renderFallbackValue;
}
function su(e) {
  return {
    table: e.table,
    column: e.column,
    row: e.row,
    cell: e,
    getValue: () => e.getValue(),
    renderValue: () => e.renderValue()
  };
}
const iu = { assignCellPrototype: (e, t) => {
  Jt("coreCellsFeature", e, t, {
    cell_getValue: { fn: (n) => ru(n) },
    cell_renderValue: { fn: (n) => ou(n) },
    cell_getContext: {
      fn: (n) => su(n),
      memoDeps: (n) => [n]
    }
  });
} };
function lu(e) {
  var t, n;
  if (!e._headerPrototype) {
    e._headerPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignHeaderPrototype) == null || n.call(t, e._headerPrototype, e);
  }
  return e._headerPrototype;
}
function ki(e, t, n) {
  const r = lu(e), o = Object.create(r);
  o.colSpan = 0, o.column = t, o.depth = n.depth, o.headerGroup = null, o.id = n.id ?? t.id, o.index = n.index, o.isPlaceholder = !!n.isPlaceholder, o.placeholderId = n.placeholderId, o.rowSpan = 0, o.subHeaders = [];
  const s = e._headerInstanceInitFns;
  for (let i = 0; i < s.length; i++) s[i](o);
  return o;
}
function cu() {
  return {
    start: [],
    end: []
  };
}
function It(e) {
  var r;
  const t = (r = e.table.atoms.columnVisibility) == null ? void 0 : r.get();
  if (!t) return !0;
  const n = e.columns;
  return n.length ? n.some((o) => me(o, "getIsVisible", It)) : (Xt(t, e.id) ? t[e.id] : void 0) ?? !0;
}
function au(e) {
  return e.getAllLeafColumns().filter((t) => me(t, "getIsVisible", It));
}
function Li(e, t = 1) {
  let n = t;
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    me(o, "getIsVisible", It) && o.columns.length && (n = Math.max(n, Li(o.columns, t + 1)));
  }
  return n;
}
function uu(e, t) {
  return String(t);
}
function fu(e, t, n, r) {
  let o = e ?? "";
  return t && (o = o ? `${o}_${t}` : String(t)), n && (o = o ? `${o}_${n}` : n), r && (o = o ? `${o}_${r}` : r), o;
}
function du(e, t) {
  let n = 0;
  for (let r = 0; r < e.length; r++) e[r].column === t && n++;
  return n;
}
function Ki(e, t, n, r, o, s) {
  const i = {
    depth: t,
    id: uu(r, t),
    headers: []
  }, l = [];
  for (let c = 0; c < e.length; c++) {
    if (!(c in e)) continue;
    const a = e[c], u = l[l.length - 1], p = a.column.depth === i.depth;
    let y, v = !1;
    if (p && a.column.parent ? y = a.column.parent : (y = a.column, v = !0), u && u.column === y) u.subHeaders.push(a);
    else {
      const P = ki(n, y, {
        id: fu(r, t, y.id, a.id),
        isPlaceholder: v,
        placeholderId: v ? String(du(l, y)) : void 0,
        depth: t,
        index: l.length
      });
      P.subHeaders.push(a), l.push(P);
    }
    i.headers.push(a), a.headerGroup = i;
  }
  for (let c = 0; c < s.length; c++) s[c](i);
  o.push(i), t > 0 && Ki(l, t - 1, n, r, o, s);
}
function $i(e) {
  for (let t = 0; t < e.length; t++) {
    const n = e[t];
    if (!me(n.column, "getIsVisible", It)) continue;
    let r = 0;
    if (n.subHeaders.length) {
      $i(n.subHeaders);
      for (let o = 0; o < n.subHeaders.length; o++) {
        const s = n.subHeaders[o];
        me(s.column, "getIsVisible", It) && (r += s.colSpan);
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
function rs(e, t, n, r) {
  var c;
  const o = Li(e), s = [], i = n._headerGroupInstanceInitFns, l = new Array(t.length);
  for (let a = 0; a < t.length; a++)
    a in t && (l[a] = ki(n, t[a], {
      depth: o,
      index: a
    }));
  return Ki(l, o - 1, n, r, s, i), s.reverse(), $i(((c = s[0]) == null ? void 0 : c.headers) ?? []), s;
}
function pu(e) {
  var t, n;
  if (!e._columnPrototype) {
    e._columnPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignColumnPrototype) == null || n.call(t, e._columnPrototype, e);
  }
  return e._columnPrototype;
}
function gu(e, t, n, r) {
  const o = {
    ...e.getDefaultColumnDef(),
    ...t
  }, s = o.accessorKey, i = s === void 0 ? void 0 : String(s), l = o.id ?? (i == null ? void 0 : i.replaceAll(".", "_")) ?? (typeof o.header == "string" ? o.header : void 0);
  let c;
  if (o.accessorFn) c = o.accessorFn;
  else if (s !== void 0) if (typeof s == "string" && s.includes(".")) {
    const y = s.split(".");
    c = (v) => {
      let P = v;
      for (let C = 0; C < y.length; C++) {
        const F = y[C];
        P = P == null ? void 0 : P[F];
      }
      return P;
    };
  } else c = (y) => y[o.accessorKey];
  if (!l)
    throw new Error();
  const a = pu(e), u = Object.create(a);
  u.accessorFn = c, u.columnDef = o, u.columns = [], u.depth = n, u.id = `${String(l)}`, u.parent = r;
  const p = e._columnInstanceInitFns;
  for (let y = 0; y < p.length; y++) p[y](u);
  return u;
}
function Vi(e) {
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
        const l = t[i], c = s.get(l);
        c && (o.push(c), s.delete(l));
      }
      for (let i = 0; i < r.length; i++) {
        const l = r[i];
        s.has(l.id) && o.push(l);
      }
    }
    return hu(e, o);
  };
}
function hu(e, t) {
  var l;
  const n = ((l = e.atoms.grouping) == null ? void 0 : l.get()) ?? [], { groupedColumnMode: r } = e.options;
  if (!n.length || !r) return t;
  const o = t.filter((c) => !n.includes(c.id));
  if (r === "remove") return o;
  const s = /* @__PURE__ */ new Map();
  for (let c = 0; c < t.length; c++) {
    const a = t[c];
    s.set(a.id, a);
  }
  const i = [];
  for (let c = 0; c < n.length; c++) {
    const a = s.get(n[c]);
    a && i.push(a);
  }
  return [...i, ...o];
}
function mu(e) {
  return [e, ...e.columns.flatMap((t) => t.getFlatColumns())];
}
function yu(e) {
  if (e.columns.length) {
    const t = e.columns.flatMap((n) => n.getLeafColumns());
    return me(e.table, "getOrderColumns", Vi)(t);
  }
  return [e];
}
function vu(e) {
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
function Ni(e, t, n, r = 0) {
  const o = new Array(t.length);
  for (let s = 0; s < t.length; s++) {
    if (!(s in t)) continue;
    const i = t[s], l = gu(e, i, r, n), c = i;
    l.columns = c.columns ? Ni(e, c.columns, l, r + 1) : [], o[s] = l;
  }
  return o;
}
function wu(e) {
  return Ni(e, e.options.columns);
}
function bu(e) {
  return e.getAllColumns().flatMap((t) => t.getFlatColumns());
}
function _u(e) {
  const t = re(), n = e.getAllFlatColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function Su(e) {
  const t = e.getAllColumns().flatMap((n) => n.getLeafColumns());
  return me(e, "getOrderColumns", Vi)(t);
}
function xu(e) {
  const t = re(), n = e.getAllLeafColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function Ru(e, t) {
  return e.getAllFlatColumnsById()[t];
}
const Cu = {
  assignColumnPrototype: (e, t) => {
    Jt("coreColumnsFeature", e, t, {
      column_getFlatColumns: {
        fn: (n) => mu(n),
        memoDeps: (n) => [n.table.options.columns]
      },
      column_getLeafColumns: {
        fn: (n) => yu(n),
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
    Ft("coreColumnsFeature", e, {
      table_getDefaultColumnDef: {
        fn: () => vu(e),
        memoDeps: () => [e.options.defaultColumn]
      },
      table_getAllColumns: {
        fn: () => wu(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumns: {
        fn: () => bu(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumnsById: {
        fn: () => _u(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllLeafColumns: {
        fn: () => Su(e),
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
        fn: () => xu(e),
        memoDeps: () => [e.getAllLeafColumns()]
      },
      table_getColumn: { fn: (t) => Ru(e, t) }
    });
  }
};
function Bi(e, t) {
  for (let n = 0; n < e.subHeaders.length; n++) Bi(e.subHeaders[n], t);
  t.push(e);
}
function Mu(e) {
  const t = [];
  return Bi(e, t), t;
}
function Ou(e) {
  return {
    column: e.column,
    header: e,
    table: e.column.table
  };
}
function Pu(e) {
  var a;
  const { start: t, end: n } = ((a = e.atoms.columnPinning) == null ? void 0 : a.get()) ?? cu(), r = e.getAllColumns(), o = me(e, "getVisibleLeafColumns", au);
  if (!t.length && !n.length) return rs(r, o, e);
  const s = e.getAllLeafColumnsById(), i = [];
  for (let u = 0; u < t.length; u++) {
    const p = s[t[u]];
    p && me(p, "getIsVisible", It) && i.push(p);
  }
  const l = [];
  for (let u = 0; u < n.length; u++) {
    const p = s[n[u]];
    p && me(p, "getIsVisible", It) && l.push(p);
  }
  const c = o.filter((u) => !t.includes(u.id) && !n.includes(u.id));
  return rs(r, [
    ...i,
    ...c,
    ...l
  ], e);
}
function Eu(e) {
  return [...e.getHeaderGroups()].reverse();
}
function Iu(e) {
  const t = e.getHeaderGroups(), n = [];
  for (let r = 0; r < t.length; r++) {
    const o = t[r].headers;
    for (let s = 0; s < o.length; s++) n.push(o[s]);
  }
  return n;
}
function Au(e) {
  var r;
  const t = ((r = e.getHeaderGroups()[0]) == null ? void 0 : r.headers) ?? [], n = [];
  for (let o = 0; o < t.length; o++) {
    const s = t[o].getLeafHeaders();
    for (let i = 0; i < s.length; i++) n.push(s[i]);
  }
  return n;
}
const Tu = {
  assignHeaderPrototype: (e, t) => {
    Jt("coreHeadersFeature", e, t, {
      header_getLeafHeaders: {
        fn: (n) => Mu(n),
        memoDeps: (n) => [n.column.table.options.columns]
      },
      header_getContext: {
        fn: (n) => Ou(n),
        memoDeps: (n) => [n.column.table.options.columns]
      }
    });
  },
  constructTableAPIs: (e) => {
    Ft("coreHeadersFeature", e, {
      table_getHeaderGroups: {
        fn: () => Pu(e),
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
        fn: () => Eu(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getFlatHeaders: {
        fn: () => Iu(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getLeafHeaders: {
        fn: () => Au(e),
        memoDeps: () => [e.getHeaderGroups()]
      }
    });
  }
};
function Du(e) {
  var t, n;
  if (!e._rowPrototype) {
    e._rowPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignRowPrototype) == null || n.call(t, e._rowPrototype, e);
  }
  return e._rowPrototype;
}
const Fu = (e, t, n, r, o, s, i) => {
  const l = Du(e), c = Object.create(l);
  c._displayIndexCache = -1, c._uniqueValuesCache = re(), c._valuesCache = re(), c.depth = o, c.id = t, c.index = r, c.original = n, c.parentId = i, c.subRows = [];
  const a = e._rowInstanceInitFns;
  for (let u = 0; u < a.length; u++) a[u](c);
  return c;
};
function ju() {
  return [];
}
function Hu(e, t) {
  ur(e, "cellSelection", mt(e.initialState.cellSelection) ?? ju());
}
function ku(e) {
  e.atoms.cellSelection && (e.options.autoResetAll ?? e.options.autoResetCellSelection ?? !0) && e._reactivity.schedule(() => Hu(e));
}
function Lu() {
  return re();
}
function Wi(e) {
  e.atoms.expanded && (e.options.autoResetAll ?? e.options.autoResetExpanded ?? !e.options.manualExpanding) && e._reactivity.schedule(() => Gi(e));
}
function zn(e, t) {
  var n, r;
  (r = (n = e.options).onExpandedChange) == null || r.call(n, t);
}
function Ui(e, t) {
  var r;
  const n = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t ?? !zi(e)) {
    if (n === !0 || !qi(e)) return;
    zn(e, !0);
  } else {
    if (n !== !0 && !Object.keys(n).length) return;
    zn(e, re());
  }
}
function Gi(e, t) {
  const n = e.initialState.expanded;
  ur(e, "expanded", t ? re() : n === !0 ? !0 : Object.assign(re(), mt(n ?? {})));
}
function qi(e) {
  return e.getPrePaginatedRowModel().flatRows.some((t) => At(t));
}
function Ku(e) {
  return (t) => {
    Ui(e);
  };
}
function $u(e) {
  var n;
  const t = ((n = e.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return t === !0 || Object.values(t).some(Boolean);
}
function zi(e) {
  var r;
  const t = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t === !0) return !0;
  if (!Object.keys(t).length) return !1;
  const n = e.getRowModel().flatRows.filter((o) => At(o));
  return !(!n.length || n.some((o) => !dr(o)));
}
function Vu(e) {
  var r;
  let t = 0;
  const n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return (n === !0 ? Object.values(e.getRowModel().rowsById).filter((o) => At(o)).map((o) => o.id) : Object.keys(n ?? {})).forEach((o) => {
    const s = o.split(".");
    t = Math.max(t, s.length);
  }), t;
}
function Yi(e, t) {
  var s;
  const n = ((s = e.table.atoms.expanded) == null ? void 0 : s.get()) ?? {}, r = n === !0 || zr(n, e.id), o = t ?? !r;
  o !== r && (o && !At(e) || zn(e.table, (i) => {
    const l = i === !0 ? !0 : zr(i, e.id);
    let c = re();
    if (i === !0 ? Object.values(e.table.getRowModel().rowsById).forEach((a) => {
      At(a) && (c[a.id] = !0);
    }) : c = Object.assign(re(), i), !l && o)
      return c[e.id] = !0, c;
    if (l && !o) {
      const a = re(), u = Object.keys(c);
      for (let p = 0; p < u.length; p++) {
        const y = u[p];
        y !== e.id && c[y] && (a[y] = !0);
      }
      return a;
    }
    return i;
  }));
}
function dr(e) {
  var n, r, o;
  const t = ((n = e.table.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return !!(((o = (r = e.table.options).getIsRowExpanded) == null ? void 0 : o.call(r, e)) ?? (t === !0 || zr(t, e.id)));
}
function zr(e, t) {
  return !!(e && e !== !0 && Xt(e, t) && e[t]);
}
function At(e) {
  var t, n;
  return ((n = (t = e.table.options).getRowCanExpand) == null ? void 0 : n.call(t, e)) ?? ((e.table.options.enableExpanding ?? !0) && !!e.subRows.length);
}
function Nu(e) {
  let t = !0, n = e;
  for (; t && n.parentId; )
    n = e.table.getRow(n.parentId, !0), t = dr(n);
  return t;
}
function Bu(e) {
  const t = At(e);
  return () => {
    t && Yi(e);
  };
}
const Yr = 0;
function Wu(e) {
  var t, n;
  if (e.options.autoResetAll ?? e.options.autoResetPageIndex ?? !e.options.manualPagination) {
    if ((((n = (t = e.atoms.pagination) == null ? void 0 : t.get()) == null ? void 0 : n.pageIndex) ?? Yr) === Yr) return;
    qu(e);
  }
}
function Uu(e, t) {
  ur(e, "pagination", t);
}
function Gu(e, t) {
  Uu(e, (n) => {
    let r = ar(t, n.pageIndex);
    const o = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
    return r = Math.max(0, Math.min(r, o)), {
      ...n,
      pageIndex: r
    };
  });
}
function qu(e, t) {
  Gu(e, Yr);
}
function zu(e, t) {
  ur(e, "sorting", t);
}
function Yu(e, t) {
  zu(e, mt(e.initialState.sorting ?? []));
}
function Xu(e) {
  e.atoms.sorting && (e.options.autoResetAll ?? e.options.autoResetSorting ?? !1) && Yu(e);
}
function Xi() {
  return (e) => fr({
    feature: "coreRowModelsFeature",
    table: e,
    fnName: "table.getCoreRowModel",
    memoDeps: () => [e.options.data],
    fn: () => Ju(e, e.options.data),
    onAfterUpdate: nu(() => {
      Wi(e), Wu(e), Xu(e), ku(e);
    })
  });
}
function Ji(e, t, n, r = 0, o) {
  var i;
  const s = [];
  for (let l = 0; l < n.length; l++) {
    const c = n[l], a = Fu(e, e.getRowId(c, l, o), c, l, r, void 0, o == null ? void 0 : o.id);
    t.flatRows.push(a), t.rowsById[a.id] = a, s.push(a), e.options.getSubRows && (a.originalSubRows = e.options.getSubRows(c, l), (i = a.originalSubRows) != null && i.length && (a.subRows = Ji(e, t, a.originalSubRows, r + 1, a)));
  }
  return s;
}
function Ju(e, t) {
  const n = {
    rows: [],
    flatRows: [],
    rowsById: re()
  };
  return n.rows = Ji(e, n, t), n;
}
function Zu(e) {
  var t, n;
  return e._rowModels.coreRowModel || (e._rowModels.coreRowModel = ((n = (t = e.options.features).coreRowModel) == null ? void 0 : n.call(t, e)) ?? Xi()(e)), e._rowModels.coreRowModel();
}
function Qu(e) {
  return e.getCoreRowModel();
}
function ef(e) {
  var t, n;
  return e._rowModels.filteredRowModel || (e._rowModels.filteredRowModel = (n = (t = e.options.features).filteredRowModel) == null ? void 0 : n.call(t, e)), e.options.manualFiltering || !e._rowModels.filteredRowModel ? e.getPreFilteredRowModel() : e._rowModels.filteredRowModel();
}
function tf(e) {
  return e.getFilteredRowModel();
}
function nf(e) {
  var t, n;
  return e._rowModels.groupedRowModel || (e._rowModels.groupedRowModel = (n = (t = e.options.features).groupedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualGrouping || !e._rowModels.groupedRowModel ? e.getPreGroupedRowModel() : e._rowModels.groupedRowModel();
}
function rf(e) {
  return e.getGroupedRowModel();
}
function of(e) {
  var t, n;
  return e._rowModels.sortedRowModel || (e._rowModels.sortedRowModel = (n = (t = e.options.features).sortedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualSorting || !e._rowModels.sortedRowModel ? e.getPreSortedRowModel() : e._rowModels.sortedRowModel();
}
function sf(e) {
  return e.getSortedRowModel();
}
function lf(e) {
  var t, n;
  return e._rowModels.expandedRowModel || (e._rowModels.expandedRowModel = (n = (t = e.options.features).expandedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualExpanding || !e._rowModels.expandedRowModel ? e.getPreExpandedRowModel() : e._rowModels.expandedRowModel();
}
function cf(e) {
  return e.getExpandedRowModel();
}
function af(e) {
  var t, n;
  return e._rowModels.paginatedRowModel || (e._rowModels.paginatedRowModel = (n = (t = e.options.features).paginatedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualPagination || !e._rowModels.paginatedRowModel ? e.getPrePaginatedRowModel() : e._rowModels.paginatedRowModel();
}
function uf(e) {
  return e.getPaginatedRowModel();
}
const ff = { constructTableAPIs: (e) => {
  Ft("coreRowModelsFeature", e, {
    table_getCoreRowModel: { fn: () => Zu(e) },
    table_getPreFilteredRowModel: { fn: () => Qu(e) },
    table_getFilteredRowModel: { fn: () => ef(e) },
    table_getPreGroupedRowModel: { fn: () => tf(e) },
    table_getGroupedRowModel: { fn: () => nf(e) },
    table_getPreSortedRowModel: { fn: () => rf(e) },
    table_getSortedRowModel: { fn: () => of(e) },
    table_getPreExpandedRowModel: { fn: () => sf(e) },
    table_getExpandedRowModel: { fn: () => lf(e) },
    table_getPrePaginatedRowModel: { fn: () => cf(e) },
    table_getPaginatedRowModel: { fn: () => af(e) },
    table_getRowModel: { fn: () => uf(e) }
  });
} };
function df(e) {
  var t, n;
  if (!e._cellPrototype) {
    e._cellPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignCellPrototype) == null || n.call(t, e._cellPrototype, e);
  }
  return e._cellPrototype;
}
function pf(e, t, n) {
  const r = df(n), o = Object.create(r);
  o.column = e, o.id = `${t.id}_${e.id}`, o.row = t;
  const s = n._cellInstanceInitFns;
  for (let i = 0; i < s.length; i++) s[i](o);
  return o;
}
function gf(e) {
  const t = e.table.getRowsInDisplayOrder(), n = e._displayIndexCache;
  return t[n] === e ? n : -1;
}
function hf(e) {
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
function mf(e, t) {
  if (Xt(e._valuesCache, t)) return e._valuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return e._valuesCache[t] = n.accessorFn(e.original, e.index), e._valuesCache[t];
}
function yf(e, t) {
  if (Xt(e._uniqueValuesCache, t)) return e._uniqueValuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return n.columnDef.getUniqueValues ? (e._uniqueValuesCache[t] = n.columnDef.getUniqueValues(e.original, e.index), e._uniqueValuesCache[t]) : (e._uniqueValuesCache[t] = [e.getValue(t)], e._uniqueValuesCache[t]);
}
function vf(e, t) {
  return e.getValue(t) ?? e.table.options.renderFallbackValue;
}
function wf(e) {
  return eu(e.subRows, (t) => t.subRows);
}
function bf(e) {
  const t = e.getCoreRowModel().flatRows;
  let n = 0;
  for (let r = 0; r < t.length; r++) n = Math.max(n, t[r].depth);
  return n;
}
function _f(e) {
  if (e.parentId)
    return e.table.getCoreRowModel().rowsById[e.parentId] ?? e.table.getRow(e.parentId, !0);
}
function Sf(e) {
  const t = [];
  let n = e;
  for (; ; ) {
    const r = n.getParentRow();
    if (!r) break;
    t.push(r), n = r;
  }
  return t.reverse();
}
function xf(e) {
  const t = e.table.getAllLeafColumns();
  let n = e._cellsCache;
  n || (n = e._cellsCache = /* @__PURE__ */ new WeakMap());
  const r = new Array(t.length);
  for (let o = 0; o < t.length; o++) {
    const s = t[o];
    let i = n.get(s);
    i || (i = pf(s, e, e.table), n.set(s, i)), r[o] = i;
  }
  return r;
}
function Rf(e) {
  const t = re(), n = e.getAllCells();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.column.id] = o;
  }
  return t;
}
function Cf(e, t, n, r) {
  var o, s;
  return ((s = (o = t.options).getRowId) == null ? void 0 : s.call(o, e, n, r)) ?? (r ? `${r.id}.${n}` : String(n));
}
function Mf(e, t, n) {
  let r = (n ? e.getPrePaginatedRowModel() : e.getRowModel()).rowsById[t];
  if (!r && (r = e.getCoreRowModel().rowsById[t], !r))
    throw new Error();
  return r;
}
const Of = {
  assignRowPrototype: (e, t) => {
    Jt("coreRowsFeature", e, t, {
      row_getDisplayIndex: { fn: (n) => gf(n) },
      row_getAllCellsByColumnId: {
        fn: (n) => Rf(n),
        memoDeps: (n) => [n.getAllCells()]
      },
      row_getAllCells: {
        fn: (n) => xf(n),
        memoDeps: (n) => [n.table.getAllLeafColumns()]
      },
      row_getLeafRows: {
        fn: (n) => wf(n),
        memoDeps: (n) => [n.subRows]
      },
      row_getParentRow: { fn: (n) => _f(n) },
      row_getParentRows: { fn: (n) => Sf(n) },
      row_getUniqueValues: { fn: (n, r) => yf(n, r) },
      row_getValue: { fn: (n, r) => mf(n, r) },
      row_renderValue: { fn: (n, r) => vf(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    Ft("coreRowsFeature", e, {
      table_getRowsInDisplayOrder: {
        fn: () => hf(e),
        memoDeps: () => {
          var t;
          return [
            e.getPrePaginatedRowModel().rows,
            e.options.paginateExpandedRows,
            e.options.paginateExpandedRows === !1 ? (t = e.atoms.expanded) == null ? void 0 : t.get() : void 0
          ];
        }
      },
      table_getRowId: { fn: (t, n, r) => Cf(t, e, n, r) },
      table_getRow: { fn: (t, n) => Mf(e, t, n) },
      table_getMaxSubRowDepth: {
        fn: () => bf(e),
        memoDeps: () => [e.getCoreRowModel()]
      }
    });
  }
};
function Zi(e, t, n = (r, o) => r === o) {
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
function Pf(e, t, n = (r, o) => r === o) {
  e._reactivity.batch(() => {
    var r, o;
    Zi(e, t, n), (o = (r = e._reactivity).commit) == null || o.call(r);
  });
}
function Ef(e) {
  var r, o;
  const t = mt(e.initialState);
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
function If(e, t) {
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
function Af(e, t, n) {
  const r = If(e, ar(t, e.options));
  e.optionsStore ? e.optionsStore.set(() => r) : e.options = r, Pf(e, r.state ?? null);
}
const Tf = { constructTableAPIs: (e) => {
  Ft("coreTablesFeature", e, {
    table_reset: { fn: () => Ef(e) },
    table_setOptions: { fn: (t) => Af(e, t) }
  });
} }, Df = {
  coreCellsFeature: iu,
  coreColumnsFeature: Cu,
  coreHeadersFeature: Tu,
  coreRowModelsFeature: ff,
  coreRowsFeature: Of,
  coreTablesFeature: Tf
};
function Ff(e) {
  const t = e;
  return Object.defineProperty(e, "state", { get() {
    return e.get();
  } }), "set" in e && (t.setState = e.set.bind(e)), t;
}
function jf(e, t) {
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
  const n = os(e);
  if (n.length !== os(t).length) return !1;
  for (let r = 0; r < n.length; r++) if (!Object.prototype.hasOwnProperty.call(t, n[r]) || !Object.is(e[n[r]], t[n[r]])) return !1;
  return !0;
}
function os(e) {
  return Object.keys(e).concat(Object.getOwnPropertySymbols(e));
}
function Hf(e, t = {}) {
  return Object.values(e).forEach((n) => {
    var r;
    t = ((r = n.getInitialState) == null ? void 0 : r.call(n, t)) ?? t;
  }), mt(t);
}
function kf(e) {
  var N, ie;
  const t = e.features.coreReactivityFeature, { aggregationFns: n, columnMeta: r, coreRowModel: o, expandedRowModel: s, facetedMinMaxValues: i, facetedRowModel: l, facetedUniqueValues: c, filterFns: a, filterMeta: u, filteredRowModel: p, groupedRowModel: y, paginatedRowModel: v, sortFns: P, sortedRowModel: C, tableMeta: F, ...K } = e.features, M = {
    _cellInstanceInitFns: [],
    _columnInstanceInitFns: [],
    _features: {
      ...Df,
      ...K
    },
    _headerGroupInstanceInitFns: [],
    _headerInstanceInitFns: [],
    _reactivity: t,
    _rowInstanceInitFns: [],
    _rowModelFns: {
      aggregationFns: n,
      filterFns: a,
      sortFns: P
    },
    _rowModels: {},
    atoms: {},
    baseAtoms: {}
  }, j = Object.values(M._features), E = {
    ...j.reduce((V, D) => {
      var z;
      return Object.assign(V, (z = D.getDefaultTableOptions) == null ? void 0 : z.call(D, M));
    }, {}),
    ...e
  };
  if (t.wrapExternalAtoms && E.atoms) for (const [V, D] of Object.entries(E.atoms)) {
    const z = D, le = t.createWritableAtom(z.get(), { debugName: `externalAtom/${V}` });
    E.atoms[V] = le;
    let ne = !1;
    const fe = z.subscribe((Me) => {
      ne || le.set(Me);
    }), Ce = le.subscribe((Me) => {
      ne = !0, z.set(Me), ne = !1;
    });
    t.addSubscription(fe), t.addSubscription(Ce);
  }
  t.createOptionsStore ? (M.optionsStore = t.createWritableAtom(E, { debugName: "table/optionsStore" }), Object.defineProperty(M, "options", {
    configurable: !0,
    enumerable: !0,
    get() {
      return M.optionsStore.get();
    },
    set(V) {
      M.optionsStore.set(() => V);
    }
  })) : M.options = E, M.initialState = Hf(M._features, M.options.initialState);
  const k = Object.keys(M.initialState);
  for (let V = 0; V < k.length; V++) {
    const D = k[V];
    M.baseAtoms[D] = t.createWritableAtom(M.initialState[D], { debugName: `table/baseAtoms/${D}` }), M.atoms[D] = t.createReadonlyAtom(() => {
      var Ce;
      const z = M.options, le = (Ce = z.atoms) == null ? void 0 : Ce[D], ne = le ? le.get() : M.baseAtoms[D].get();
      if (le) return ne;
      const fe = z.state;
      if (fe && Xt(fe, D)) {
        const Me = fe[D];
        return Me === void 0 ? M.initialState[D] : Me;
      }
      return ne;
    }, { debugName: `table/atoms/${D}` });
  }
  Zi(M), M.store = Ff(t.createReadonlyAtom(() => {
    const V = {};
    for (let D = 0; D < k.length; D++) {
      const z = k[D];
      V[z] = M.atoms[z].get();
    }
    return V;
  }, {
    compare: jf,
    debugName: "table/store"
  }));
  for (let V = 0; V < j.length; V++) {
    const D = j[V];
    (N = D.initTableInstanceData) == null || N.call(D, M), D.initCellInstanceData && M._cellInstanceInitFns.push(D.initCellInstanceData.bind(D)), D.initColumnInstanceData && M._columnInstanceInitFns.push(D.initColumnInstanceData.bind(D)), D.initHeaderGroupInstanceData && M._headerGroupInstanceInitFns.push(D.initHeaderGroupInstanceData.bind(D)), D.initHeaderInstanceData && M._headerInstanceInitFns.push(D.initHeaderInstanceData.bind(D)), D.initRowInstanceData && M._rowInstanceInitFns.push(D.initRowInstanceData.bind(D)), (ie = D.constructTableAPIs) == null || ie.call(D, M);
  }
  return M;
}
const Lf = {
  getInitialState: (e) => ({
    expanded: Lu(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onExpandedChange: Fi("expanded", e),
    paginateExpandedRows: !0
  }),
  assignRowPrototype: (e, t) => {
    Jt("rowExpandingFeature", e, t, {
      row_toggleExpanded: { fn: (n, r) => Yi(n, r) },
      row_getIsExpanded: { fn: (n) => dr(n) },
      row_getCanExpand: { fn: (n) => At(n) },
      row_getIsAllParentsExpanded: { fn: (n) => Nu(n) },
      row_getToggleExpandedHandler: { fn: (n) => Bu(n) }
    });
  },
  constructTableAPIs: (e) => {
    Ft("rowExpandingFeature", e, {
      table_autoResetExpanded: { fn: () => Wi(e) },
      table_setExpanded: { fn: (t) => zn(e, t) },
      table_toggleAllRowsExpanded: { fn: (t) => Ui(e, t) },
      table_resetExpanded: { fn: (t) => Gi(e, t) },
      table_getCanSomeRowsExpand: { fn: () => qi(e) },
      table_getToggleAllRowsExpandedHandler: { fn: () => Ku(e) },
      table_getIsSomeRowsExpanded: { fn: () => $u(e) },
      table_getIsAllRowsExpanded: { fn: () => zi(e) },
      table_getExpandedDepth: { fn: () => Vu(e) }
    });
  }
};
function Kf() {
  return re();
}
function Zt(e, t) {
  var n, r;
  (r = (n = e.options).onRowSelectionChange) == null || r.call(n, t);
}
function $f(e, t) {
  e._lastSelectedRowId = null, Zt(e, t ? re() : Object.assign(re(), mt(e.initialState.rowSelection ?? {})));
}
function Qi(e, t, n) {
  e._lastSelectedRowId = null, Zt(e, (r) => {
    if (t = typeof t < "u" ? t : !me(e, "getIsAllRowsSelected", nl), n != null && n.deselectAll && !t) return re();
    const o = Object.assign(re(), r), s = e.getPreGroupedRowModel().flatRows;
    if (t) {
      const i = /* @__PURE__ */ new Map();
      s.forEach((l) => {
        Yn(l, i) && (o[l.id] = !0);
      });
    } else s.forEach((i) => {
      lt(i) && delete o[i.id];
    });
    return o;
  });
}
function el(e, t, n) {
  e._lastSelectedRowId = null, Zt(e, (r) => {
    const o = typeof t < "u" ? t : !me(e, "getIsAllPageRowsSelected", rl);
    if (n != null && n.deselectAll && !o) return re();
    const s = Object.assign(re(), r);
    return e.getRowModel().rows.forEach((i) => {
      gr(s, i.id, o, !0, e, !0);
    }), s;
  });
}
function Vf(e) {
  return e.getCoreRowModel();
}
function Nf(e) {
  const t = e.getCoreRowModel();
  return me(e, "getIsSomeRowsSelected", pr) ? wo(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: re()
  };
}
function Bf(e) {
  const t = e.getFilteredRowModel();
  return me(e, "getIsSomeRowsSelected", pr) ? wo(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: re()
  };
}
function Wf(e) {
  const t = e.getSortedRowModel();
  return me(e, "getIsSomeRowsSelected", pr) ? wo(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: re()
  };
}
function tl(e) {
  var t;
  return Object.keys(((t = e.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function nl(e) {
  var o;
  const t = e.getFilteredRowModel().flatRows, n = ((o = e.atoms.rowSelection) == null ? void 0 : o.get()) ?? {};
  let r = !!(t.length && Object.keys(n).length);
  if (r) {
    const s = /* @__PURE__ */ new Map();
    t.some((i) => !Mn(i, n) && Yn(i, s)) && (r = !1);
  }
  return r;
}
function rl(e) {
  var s;
  const t = e.getPaginatedRowModel().flatRows, n = ((s = e.atoms.rowSelection) == null ? void 0 : s.get()) ?? {}, r = /* @__PURE__ */ new Map();
  let o = !1;
  for (let i = 0; i < t.length; i++) {
    const l = t[i];
    if (Mn(l, n))
      !o && Yn(l, r) && (o = !0);
    else if (Yn(l, r)) return !1;
  }
  return o;
}
function pr(e) {
  return me(e, "getSelectedRowIds", tl).length > 0;
}
function Uf(e) {
  return e.getPaginatedRowModel().flatRows.filter((t) => lt(t)).some((t) => yo(t) || me(t, "getIsSomeSelected", sl));
}
function Gf(e) {
  return (t) => {
    Qi(e, t.target.checked);
  };
}
function qf(e) {
  return (t) => {
    el(e, t.target.checked);
  };
}
function ol(e, t, n) {
  const r = yo(e);
  Zt(e.table, (o) => {
    t = typeof t < "u" ? t : !r;
    const s = Object.assign(re(), o);
    return gr(s, e.id, t, ((n == null ? void 0 : n.selectChildren) ?? !0) && Et(e), e.table), !t && (n != null && n.deselectParents) && il(s, e), s;
  });
}
function yo(e) {
  var t;
  return Mn(e, ((t = e.table.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function sl(e) {
  return bo(e) === "some";
}
function zf(e) {
  return bo(e) === "all";
}
function lt(e) {
  const t = e.table.options;
  return typeof t.enableRowSelection == "function" ? t.enableRowSelection(e) : t.enableRowSelection ?? !0;
}
function vo(e) {
  const t = e.table.options;
  return typeof t.enableSubRowSelection == "function" ? t.enableSubRowSelection(e) : t.enableSubRowSelection ?? !0;
}
function Et(e) {
  const t = e.table.options;
  return typeof t.enableMultiRowSelection == "function" ? t.enableMultiRowSelection(e) : t.enableMultiRowSelection ?? !0;
}
function Yf(e, t) {
  const n = lt(e);
  return (r) => {
    var c, a;
    if (!n) return;
    const o = r, s = e.table, i = o.target.checked, l = s._lastSelectedRowId;
    (!(s.options.enableRowRangeSelection !== !1 && l !== null && Et(e) && (((a = (c = s.options).isRowRangeSelectionEvent) == null ? void 0 : a.call(c, r)) ?? !1)) || !Xf(e, l, i, t)) && ol(e, i, t), s._lastSelectedRowId = e.id;
  };
}
function Xf(e, t, n, r) {
  const o = (r == null ? void 0 : r.selectChildren) ?? !0, s = e.table, i = s.getRowsInDisplayOrder(), l = s.getPrePaginatedRowModel().rowsById[t] ?? s.getCoreRowModel().rowsById[t];
  if (!l) return !1;
  const c = l.getDisplayIndex(), a = e.getDisplayIndex(), u = i[c], p = i[a];
  if (c < 0 || a < 0 || c >= i.length || a >= i.length || (u == null ? void 0 : u.id) !== l.id || (p == null ? void 0 : p.id) !== e.id || !Et(l) || !Et(e)) return !1;
  const y = Math.min(c, a), v = Math.max(c, a);
  return Zt(s, (P) => {
    const C = Object.assign(re(), P);
    for (let F = y; F <= v; F++) {
      const K = i[F];
      !lt(K) || !Et(K) || (gr(C, K.id, n, o, s), !n && (r != null && r.deselectParents) && il(C, K));
    }
    return C;
  }), !0;
}
function gr(e, t, n, r, o, s) {
  const i = o.getRow(t, !0);
  n ? (Et(i) || Object.keys(e).forEach((l) => delete e[l]), lt(i) && (e[t] = !0)) : (!s || lt(i)) && delete e[t], r && i.subRows.length && vo(i) && i.subRows.forEach((l) => gr(e, l.id, n, r, o, s));
}
function Yn(e, t) {
  if (!lt(e)) return !1;
  const n = e.table;
  if (n.options.enableSubRowSelection === !0) return !0;
  const r = e.parentId;
  if (r === void 0) return !0;
  const o = t.get(r);
  if (o !== void 0) return o;
  const s = n.getCoreRowModel().rowsById, i = [];
  let l = !0, c = r;
  for (; c !== void 0; ) {
    const a = t.get(c);
    if (a !== void 0) {
      l = a;
      break;
    }
    i.push(c);
    const u = s[c] ?? n.getRow(c, !0);
    if (!vo(u)) {
      l = !1;
      break;
    }
    c = u.parentId;
  }
  return i.forEach((a) => t.set(a, l)), l;
}
function il(e, t) {
  const n = t.table.getCoreRowModel().rowsById;
  let r = t.parentId;
  for (; r !== void 0; )
    delete e[r], r = (n[r] ?? t.table.getRow(r, !0)).parentId;
}
function ll(e, t, n, r) {
  const o = [];
  for (let s = 0; s < e.length; s++) {
    const i = e[s], l = Mn(i, t);
    if (l && (n.push(i), r[i.id] = i), i.subRows.length) {
      const c = ll(i.subRows, t, n, r);
      if (l) {
        const a = Object.create(Object.getPrototypeOf(i));
        Ja(a, i), a.subRows = c, o.push(a);
      }
    } else l && o.push(i);
  }
  return o;
}
function wo(e, t) {
  var s;
  const n = [], r = re(), o = ((s = t.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  return {
    rows: ll(e.rows, o, n, r),
    flatRows: n,
    rowsById: r
  };
}
function Mn(e, t) {
  return !!(Xt(t, e.id) && t[e.id]);
}
function bo(e) {
  var s;
  if (!e.subRows.length) return !1;
  const t = ((s = e.table.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  let n = !1, r = !0, o = !1;
  for (let i = 0; i < e.subRows.length; i++) {
    const l = e.subRows[i];
    if (n && !r) break;
    if (lt(l) && (o = !0, Mn(l, t) ? n = !0 : r = !1), l.subRows.length) {
      const c = bo(l);
      c === "all" ? (n = !0, o = !0) : c === "some" ? (n = !0, r = !1, o = !0) : r = !1;
    }
  }
  return o ? r ? "all" : n ? "some" : !1 : !1;
}
const Jf = {
  initTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  resetTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  getInitialState: (e) => ({
    rowSelection: Kf(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onRowSelectionChange: Fi("rowSelection", e),
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
    Jt("rowSelectionFeature", e, t, {
      row_toggleSelected: { fn: (n, r, o) => ol(n, r, o) },
      row_getIsSelected: { fn: (n) => yo(n) },
      row_getIsSomeSelected: {
        fn: (n) => sl(n),
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
        fn: (n) => zf(n),
        memoDeps: (n) => {
          var r;
          return [
            n.subRows,
            (r = n.table.atoms.rowSelection) == null ? void 0 : r.get(),
            n.table.options.enableRowSelection
          ];
        }
      },
      row_getCanSelect: { fn: (n) => lt(n) },
      row_getCanSelectSubRows: { fn: (n) => vo(n) },
      row_getCanMultiSelect: { fn: (n) => Et(n) },
      row_getToggleSelectedHandler: { fn: (n, r) => Yf(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    Ft("rowSelectionFeature", e, {
      table_setRowSelection: { fn: (t) => Zt(e, t) },
      table_resetRowSelection: { fn: (t) => $f(e, t) },
      table_toggleAllRowsSelected: { fn: (t, n) => Qi(e, t, n) },
      table_toggleAllPageRowsSelected: { fn: (t, n) => el(e, t, n) },
      table_getPreSelectedRowModel: { fn: () => Vf(e) },
      table_getSelectedRowModel: {
        fn: () => Nf(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getCoreRowModel()];
        }
      },
      table_getFilteredSelectedRowModel: {
        fn: () => Bf(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getFilteredRowModel()];
        }
      },
      table_getGroupedSelectedRowModel: {
        fn: () => Wf(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getSortedRowModel()];
        }
      },
      table_getSelectedRowIds: {
        fn: () => tl(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get()];
        }
      },
      table_getIsAllRowsSelected: {
        fn: () => nl(e),
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
        fn: () => rl(e),
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
        fn: () => pr(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get()];
        }
      },
      table_getIsSomePageRowsSelected: {
        fn: () => Uf(e),
        memoDeps: () => {
          var t;
          return [
            (t = e.atoms.rowSelection) == null ? void 0 : t.get(),
            e.getPaginatedRowModel(),
            e.options.enableRowSelection
          ];
        }
      },
      table_getToggleAllRowsSelectedHandler: { fn: () => Gf(e) },
      table_getToggleAllPageRowsSelectedHandler: { fn: () => qf(e) }
    });
  }
};
function Zf() {
  return (e) => {
    const t = e;
    return fr({
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
      fn: () => Qf(t)
    });
  };
}
function Qf(e) {
  var r;
  const t = e.getPreExpandedRowModel(), n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return !t.rows.length || n !== !0 && !Object.keys(n ?? {}).length || !e.options.paginateExpandedRows && !e.options.manualPagination ? t : ed(t);
}
function ed(e) {
  const t = [], n = (r) => {
    t.push(r), r.subRows.length && dr(r) && r.subRows.forEach(n);
  };
  return e.rows.forEach(n), {
    rows: t,
    flatRows: e.flatRows,
    rowsById: e.rowsById
  };
}
function ss(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = Ut(e[n]);
  return qr(e, t);
}
function td(e) {
  return Object.keys(e).map((t) => Ut(e[t]));
}
function nd(e) {
  const t = (l, c) => {
    l.setOptions((a) => es(a, ss(c)));
  }, n = Xa(), r = qr(e, { features: {
    coreReactivityFeature: n,
    ...Ut(e.features) ?? {}
  } }), o = qr(ss(r), { mergeOptions: (l, c) => es(l, c) }), s = kf(o), i = s;
  return Ts() && jl(() => {
    var l;
    return (l = n.unmount) == null ? void 0 : l.call(n);
  }), Ae(() => td(r), () => {
    t(s, r);
  }, { immediate: !0 }), Ae(() => {
    const l = Ut(e.state), c = Ut(e.atoms);
    if (!l) return [];
    const a = [];
    for (const u of Object.keys(i.initialState))
      !(u in l) || (c == null ? void 0 : c[u]) !== void 0 || a.push(l[u]);
    return a;
  }, (l) => {
    l.length > 0 && t(s, r);
  }, { immediate: !0 }), i.Subscribe = (l) => l.children(i.atoms), i;
}
function hr() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return function() {
    t.forEach(function(o) {
      return o();
    });
  };
}
function rd(e) {
  if (Array.isArray(e)) return e;
}
function od(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r, o, s, i, l = [], c = !0, a = !1;
    try {
      if (s = (n = n.call(e)).next, t !== 0) for (; !(c = (r = s.call(n)).done) && (l.push(r.value), l.length !== t); c = !0) ;
    } catch (u) {
      a = !0, o = u;
    } finally {
      try {
        if (!c && n.return != null && (i = n.return(), Object(i) !== i)) return;
      } finally {
        if (a) throw o;
      }
    }
    return l;
  }
}
function Xr(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function cl(e, t) {
  if (e) {
    if (typeof e == "string") return Xr(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Xr(e, t) : void 0;
  }
}
function sd() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function al(e, t) {
  return rd(e) || od(e, t) || cl(e, t) || sd();
}
var is = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Tt = {}, On = {};
Object.defineProperty(On, "__esModule", { value: !0 });
On.bind = void 0;
function id(e, t) {
  var n = t.type, r = t.listener, o = t.options;
  return e.addEventListener(n, r, o), function() {
    e.removeEventListener(n, r, o);
  };
}
On.bind = id;
var mr = {}, Nt = is && is.__assign || function() {
  return Nt = Object.assign || function(e) {
    for (var t, n = 1, r = arguments.length; n < r; n++) {
      t = arguments[n];
      for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    }
    return e;
  }, Nt.apply(this, arguments);
};
Object.defineProperty(mr, "__esModule", { value: !0 });
mr.bindAll = void 0;
var ld = On;
function ls(e) {
  if (!(typeof e > "u"))
    return typeof e == "boolean" ? {
      capture: e
    } : e;
}
function cd(e, t) {
  if (t == null)
    return e;
  var n = Nt(Nt({}, e), { options: Nt(Nt({}, ls(t)), ls(e.options)) });
  return n;
}
function ad(e, t, n) {
  var r = t.map(function(o) {
    var s = cd(o, n);
    return (0, ld.bind)(e, s);
  });
  return function() {
    r.forEach(function(s) {
      return s();
    });
  };
}
mr.bindAll = ad;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.bindAll = e.bind = void 0;
  var t = On;
  Object.defineProperty(e, "bind", { enumerable: !0, get: function() {
    return t.bind;
  } });
  var n = mr;
  Object.defineProperty(e, "bindAll", { enumerable: !0, get: function() {
    return n.bindAll;
  } });
})(Tt);
var ul = "data-pdnd-honey-pot";
function fl(e) {
  return e instanceof Element && e.hasAttribute(ul);
}
function dl(e) {
  var t = document.elementsFromPoint(e.x, e.y), n = al(t, 2), r = n[0], o = n[1];
  return r ? fl(r) ? o ?? null : r : null;
}
function _n(e) {
  "@babel/helpers - typeof";
  return _n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, _n(e);
}
function ud(e, t) {
  if (_n(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (_n(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function fd(e) {
  var t = ud(e, "string");
  return _n(t) == "symbol" ? t : t + "";
}
function Pn(e, t, n) {
  return (t = fd(t)) in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var dd = 2147483647, pd = {
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
function jt(e) {
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
var Ar = jt(function() {
  return typeof HTMLElement < "u" && typeof HTMLElement.prototype.showPopover == "function";
});
function cs(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function as(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? cs(Object(n), !0).forEach(function(r) {
      Pn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : cs(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
var Sn = 2, us = Sn / 2;
function gd(e) {
  return {
    x: Math.floor(e.x),
    y: Math.floor(e.y)
  };
}
function hd(e) {
  return {
    x: e.x - us,
    y: e.y - us
  };
}
function md(e) {
  return {
    x: Math.max(e.x, 0),
    y: Math.max(e.y, 0)
  };
}
function yd(e) {
  return {
    x: Math.min(e.x, window.innerWidth - Sn),
    y: Math.min(e.y, window.innerHeight - Sn)
  };
}
function fs(e) {
  var t = e.client, n = yd(md(hd(gd(t))));
  return DOMRect.fromRect({
    x: n.x,
    y: n.y,
    width: Sn,
    height: Sn
  });
}
function ds(e) {
  var t = e.clientRect;
  return {
    left: "".concat(t.left, "px"),
    top: "".concat(t.top, "px"),
    width: "".concat(t.width, "px"),
    height: "".concat(t.height, "px")
  };
}
function vd(e) {
  var t = e.client, n = e.clientRect;
  return (
    // is within horizontal bounds
    t.x >= n.x && t.x <= n.x + n.width && // is within vertical bounds
    t.y >= n.y && t.y <= n.y + n.height
  );
}
function wd(e) {
  var t = e.initial, n = document.createElement("div");
  n.setAttribute(ul, "true"), Ar() && n.setAttribute("popover", "manual");
  var r = fs({
    client: t
  });
  Object.assign(n.style, as(as({
    position: "fixed"
  }, Ar() ? (
    // needs to come first as it has 'inset: unset' which
    // needs to be overridden by our top / left values
    pd
  ) : {
    // Fallback: using maximum possible z-index so that this element
    // will always be on top of other positioned content.
    zIndex: dd
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
  }, ds({
    clientRect: r
  }))), document.body.appendChild(n), Ar() && n.showPopover();
  var o = Tt.bind(window, {
    type: "pointermove",
    listener: function(i) {
      var l = {
        x: i.clientX,
        y: i.clientY
      };
      r = fs({
        client: l
      }), Object.assign(n.style, ds({
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
    if (o(), vd({
      client: l,
      clientRect: r
    })) {
      n.remove();
      return;
    }
    function c() {
      a(), n.remove();
    }
    var a = Tt.bindAll(window, [
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
function bd() {
  var e = null;
  function t() {
    return e = null, Tt.bind(window, {
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
        var c = l.location.initial.input, a = e ?? {
          x: c.clientX,
          y: c.clientY
        };
        r = wd({
          initial: a
        });
      }
      if (i === "onDrop") {
        var u, p = l.location.current.input;
        (u = r) === null || u === void 0 || u({
          current: {
            x: p.clientX,
            y: p.clientY
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
function _d(e) {
  if (Array.isArray(e)) return Xr(e);
}
function Sd(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function xd() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function pl(e) {
  return _d(e) || Sd(e) || cl(e) || xd();
}
var Rd = jt(function() {
  return navigator.userAgent.includes("Firefox");
}), _o = jt(function() {
  var t = navigator, n = t.userAgent;
  return n.includes("AppleWebKit") && !n.includes("Chrome");
});
function Cd(e) {
  return "nodeName" in e;
}
function Md(e) {
  return Cd(e) && e.ownerDocument !== document;
}
var Jr = {
  isLeavingWindow: Symbol("leaving"),
  isEnteringWindow: Symbol("entering")
};
(function() {
  if (typeof window > "u" || !_o())
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
  Tt.bindAll(
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
        !n.isOverWindow && n.enterCount === 0 && (s[Jr.isEnteringWindow] = !0), n.isOverWindow = !0, n.enterCount++;
      }
    }, {
      type: "dragleave",
      listener: function(s) {
        n.enterCount--, n.isOverWindow && n.enterCount === 0 && (s[Jr.isLeavingWindow] = !0, n.isOverWindow = !1);
      }
    }],
    // using `capture: true` so that adding event listeners
    // in bubble phase will have the correct symbols
    {
      capture: !0
    }
  );
})();
function Od(e) {
  var t = e.dragLeave;
  return _o() ? t.hasOwnProperty(Jr.isLeavingWindow) : !1;
}
function Pd(e) {
  var t = e.dragLeave, n = t.type, r = t.relatedTarget;
  return n !== "dragleave" ? !1 : _o() ? Od({
    dragLeave: t
  }) : r == null ? !0 : Rd() ? Md(r) : r instanceof HTMLIFrameElement;
}
function Ed(e) {
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
function gn(e) {
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
var Id = function(t) {
  var n = [], r = null, o = function() {
    for (var i = arguments.length, l = new Array(i), c = 0; c < i; c++)
      l[c] = arguments[c];
    n = l, !r && (r = requestAnimationFrame(function() {
      r = null, t.apply(void 0, n);
    }));
  };
  return o.cancel = function() {
    r && (cancelAnimationFrame(r), r = null);
  }, o;
}, Tr = Id(function(e) {
  return e();
}), Fn = /* @__PURE__ */ function() {
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
function Ad(e) {
  var t = e.source, n = e.initial, r = e.dispatchEvent, o = {
    dropTargets: []
  };
  function s(l) {
    r(l), o = {
      dropTargets: l.payload.location.current.dropTargets
    };
  }
  var i = {
    start: function(c) {
      var a = c.nativeSetDragImage, u = {
        current: n,
        previous: o,
        initial: n
      };
      s({
        eventName: "onGenerateDragPreview",
        payload: {
          source: t,
          location: u,
          nativeSetDragImage: a
        }
      }), Fn.schedule(function() {
        s({
          eventName: "onDragStart",
          payload: {
            source: t,
            location: u
          }
        });
      });
    },
    dragUpdate: function(c) {
      var a = c.current;
      Fn.flush(), Tr.cancel(), s({
        eventName: "onDropTargetChange",
        payload: {
          source: t,
          location: {
            initial: n,
            previous: o,
            current: a
          }
        }
      });
    },
    drag: function(c) {
      var a = c.current;
      Tr(function() {
        Fn.flush();
        var u = {
          initial: n,
          previous: o,
          current: a
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
    drop: function(c) {
      var a = c.current, u = c.updatedSourcePayload;
      Fn.flush(), Tr.cancel(), s({
        eventName: "onDrop",
        payload: {
          source: u ?? t,
          location: {
            current: a,
            previous: o,
            initial: n
          }
        }
      });
    }
  };
  return i;
}
var Zr = {
  isActive: !1
};
function gl() {
  return !Zr.isActive;
}
function Td(e) {
  return e.dataTransfer ? e.dataTransfer.setDragImage.bind(e.dataTransfer) : null;
}
function Dd(e) {
  var t = e.current, n = e.next;
  if (t.length !== n.length)
    return !0;
  for (var r = 0; r < t.length; r++)
    if (t[r].element !== n[r].element)
      return !0;
  return !1;
}
function Fd(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = e.dispatchEvent;
  if (!gl())
    return;
  var s = jd({
    event: t,
    dragType: n,
    getDropTargetsOver: r
  });
  Zr.isActive = !0;
  var i = {
    current: s
  };
  Dr({
    event: t,
    current: s.dropTargets
  });
  var l = Ad({
    source: n.payload,
    dispatchEvent: o,
    initial: s
  });
  function c(v) {
    var P = Dd({
      current: i.current.dropTargets,
      next: v.dropTargets
    });
    i.current = v, P && l.dragUpdate({
      current: i.current
    });
  }
  function a(v) {
    var P = gn(v), C = fl(v.target) ? dl({
      x: P.clientX,
      y: P.clientY
    }) : v.target, F = r({
      target: C,
      input: P,
      source: n.payload,
      current: i.current.dropTargets
    });
    F.length && (v.preventDefault(), Dr({
      event: v,
      current: F
    })), c({
      dropTargets: F,
      input: P
    });
  }
  function u() {
    i.current.dropTargets.length && c({
      dropTargets: [],
      input: i.current.input
    }), l.drop({
      current: i.current,
      updatedSourcePayload: null
    }), p();
  }
  function p() {
    Zr.isActive = !1, y();
  }
  var y = Tt.bindAll(
    window,
    [{
      // 👋 Note: we are repurposing the `dragover` event as our `drag` event
      // this is because firefox does not publish pointer coordinates during
      // a `drag` event, but does for every other type of drag event
      // `dragover` fires on all elements that are being dragged over
      // Because we are binding to `window` - our `dragover` is effectively the same as a `drag`
      // 🦊😤
      type: "dragover",
      listener: function(P) {
        a(P), l.drag({
          current: i.current
        });
      }
    }, {
      type: "dragenter",
      listener: a
    }, {
      type: "dragleave",
      listener: function(P) {
        Pd({
          dragLeave: P
        }) && (c({
          input: i.current.input,
          dropTargets: []
        }), n.startedFrom === "external" && u());
      }
    }, {
      // A "drop" can only happen if the browser allowed the drop
      type: "drop",
      listener: function(P) {
        if (i.current = {
          dropTargets: i.current.dropTargets,
          input: gn(P)
        }, !i.current.dropTargets.length) {
          u();
          return;
        }
        P.preventDefault(), Dr({
          event: P,
          current: i.current.dropTargets
        }), l.drop({
          current: i.current,
          // When dropping something native, we need to extract the latest
          // `.items` from the "drop" event as it is now accessible
          updatedSourcePayload: n.type === "external" ? n.getDropPayload(P) : null
        }), p();
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
      listener: function(P) {
        i.current = {
          dropTargets: i.current.dropTargets,
          input: gn(P)
        }, u();
      }
    }].concat(pl(Ed({
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
    nativeSetDragImage: Td(t)
  });
}
function Dr(e) {
  var t, n = e.event, r = e.current, o = (t = r[0]) === null || t === void 0 ? void 0 : t.dropEffect;
  o != null && n.dataTransfer && (n.dataTransfer.dropEffect = o);
}
function jd(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = gn(t);
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
var ps = {
  canStart: gl,
  start: Fd
}, Qr = /* @__PURE__ */ new Map();
function Hd(e) {
  var t = e.typeKey, n = e.mount, r = Qr.get(t);
  if (r)
    return r.usageCount++, r;
  var o = {
    typeKey: t,
    unmount: n(),
    usageCount: 1
  };
  return Qr.set(t, o), o;
}
function kd(e) {
  var t = Hd(e);
  return function() {
    t.usageCount--, !(t.usageCount > 0) && (t.unmount(), Qr.delete(e.typeKey));
  };
}
function hl(e, t) {
  var n = t.attribute, r = t.value;
  return e.setAttribute(n, r), function() {
    return e.removeAttribute(n);
  };
}
function gs(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function dt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? gs(Object(n), !0).forEach(function(r) {
      Pn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : gs(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Fr(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = Ld(e)) || t) {
      n && (e = n);
      var r = 0, o = function() {
      };
      return { s: o, n: function() {
        return r >= e.length ? { done: !0 } : { done: !1, value: e[r++] };
      }, e: function(a) {
        throw a;
      }, f: o };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var s, i = !0, l = !1;
  return { s: function() {
    n = n.call(e);
  }, n: function() {
    var a = n.next();
    return i = a.done, a;
  }, e: function(a) {
    l = !0, s = a;
  }, f: function() {
    try {
      i || n.return == null || n.return();
    } finally {
      if (l) throw s;
    }
  } };
}
function Ld(e, t) {
  if (e) {
    if (typeof e == "string") return hs(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? hs(e, t) : void 0;
  }
}
function hs(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function jr(e) {
  return e.slice(0).reverse();
}
function Kd(e) {
  var t = e.typeKey, n = e.defaultDropEffect, r = /* @__PURE__ */ new WeakMap(), o = "data-drop-target-for-".concat(t), s = "[".concat(o, "]");
  function i(v) {
    return r.set(v.element, v), function() {
      return r.delete(v.element);
    };
  }
  function l(v) {
    var P = hr(hl(v.element, {
      attribute: o,
      value: "true"
    }), i(v));
    return jt(P);
  }
  function c(v) {
    var P, C, F, K, M = v.source, j = v.target, E = v.input, k = v.result, N = k === void 0 ? [] : k;
    if (j == null)
      return N;
    if (!(j instanceof Element))
      return j instanceof Node ? c({
        source: M,
        target: j.parentElement,
        input: E,
        result: N
      }) : N;
    var ie = j.closest(s);
    if (ie == null)
      return N;
    var V = r.get(ie);
    if (V == null)
      return N;
    var D = {
      input: E,
      source: M,
      element: V.element
    };
    if (V.canDrop && !V.canDrop(D))
      return c({
        source: M,
        target: V.element.parentElement,
        input: E,
        result: N
      });
    var z = (P = (C = V.getData) === null || C === void 0 ? void 0 : C.call(V, D)) !== null && P !== void 0 ? P : {}, le = (F = (K = V.getDropEffect) === null || K === void 0 ? void 0 : K.call(V, D)) !== null && F !== void 0 ? F : n, ne = {
      data: z,
      element: V.element,
      dropEffect: le,
      // we are collecting _actual_ drop targets, so these are
      // being applied _not_ due to stickiness
      isActiveDueToStickiness: !1
    };
    return c({
      source: M,
      target: V.element.parentElement,
      input: E,
      // Using bubble ordering. Same ordering as `event.getPath()`
      result: [].concat(pl(N), [ne])
    });
  }
  function a(v) {
    var P = v.eventName, C = v.payload, F = Fr(C.location.current.dropTargets), K;
    try {
      for (F.s(); !(K = F.n()).done; ) {
        var M, j = K.value, E = r.get(j.element), k = dt(dt({}, C), {}, {
          self: j
        });
        E == null || (M = E[P]) === null || M === void 0 || M.call(
          E,
          // I cannot seem to get the types right here.
          // TS doesn't seem to like that one event can need `nativeSetDragImage`
          // @ts-expect-error
          k
        );
      }
    } catch (N) {
      F.e(N);
    } finally {
      F.f();
    }
  }
  var u = {
    onGenerateDragPreview: a,
    onDrag: a,
    onDragStart: a,
    onDrop: a,
    onDropTargetChange: function(P) {
      var C = P.payload, F = new Set(C.location.current.dropTargets.map(function(U) {
        return U.element;
      })), K = /* @__PURE__ */ new Set(), M = Fr(C.location.previous.dropTargets), j;
      try {
        for (M.s(); !(j = M.n()).done; ) {
          var E, k = j.value;
          K.add(k.element);
          var N = r.get(k.element), ie = F.has(k.element), V = dt(dt({}, C), {}, {
            self: k
          });
          if (N == null || (E = N.onDropTargetChange) === null || E === void 0 || E.call(N, V), !ie) {
            var D;
            N == null || (D = N.onDragLeave) === null || D === void 0 || D.call(N, V);
          }
        }
      } catch (U) {
        M.e(U);
      } finally {
        M.f();
      }
      var z = Fr(C.location.current.dropTargets), le;
      try {
        for (z.s(); !(le = z.n()).done; ) {
          var ne, fe, Ce = le.value;
          if (!K.has(Ce.element)) {
            var Me = dt(dt({}, C), {}, {
              self: Ce
            }), J = r.get(Ce.element);
            J == null || (ne = J.onDropTargetChange) === null || ne === void 0 || ne.call(J, Me), J == null || (fe = J.onDragEnter) === null || fe === void 0 || fe.call(J, Me);
          }
        }
      } catch (U) {
        z.e(U);
      } finally {
        z.f();
      }
    }
  };
  function p(v) {
    u[v.eventName](v);
  }
  function y(v) {
    var P = v.source, C = v.target, F = v.input, K = v.current, M = c({
      source: P,
      target: C,
      input: F
    });
    if (M.length >= K.length)
      return M;
    for (var j = jr(K), E = jr(M), k = [], N = 0; N < j.length; N++) {
      var ie, V = j[N], D = E[N];
      if (D != null) {
        k.push(D);
        continue;
      }
      var z = k[N - 1], le = j[N - 1];
      if ((z == null ? void 0 : z.element) !== (le == null ? void 0 : le.element))
        break;
      var ne = r.get(V.element);
      if (!ne)
        break;
      var fe = {
        input: F,
        source: P,
        element: ne.element
      };
      if (ne.canDrop && !ne.canDrop(fe) || !((ie = ne.getIsSticky) !== null && ie !== void 0 && ie.call(ne, fe)))
        break;
      k.push(dt(dt({}, V), {}, {
        // making it clear to consumers this drop target is active due to stickiness
        isActiveDueToStickiness: !0
      }));
    }
    return jr(k);
  }
  return {
    dropTargetForConsumers: l,
    getIsOver: y,
    dispatchEvent: p
  };
}
function $d(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = Vd(e)) || t) {
      n && (e = n);
      var r = 0, o = function() {
      };
      return { s: o, n: function() {
        return r >= e.length ? { done: !0 } : { done: !1, value: e[r++] };
      }, e: function(a) {
        throw a;
      }, f: o };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var s, i = !0, l = !1;
  return { s: function() {
    n = n.call(e);
  }, n: function() {
    var a = n.next();
    return i = a.done, a;
  }, e: function(a) {
    l = !0, s = a;
  }, f: function() {
    try {
      i || n.return == null || n.return();
    } finally {
      if (l) throw s;
    }
  } };
}
function Vd(e, t) {
  if (e) {
    if (typeof e == "string") return ms(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? ms(e, t) : void 0;
  }
}
function ms(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function ys(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Nd(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ys(Object(n), !0).forEach(function(r) {
      Pn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ys(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Bd() {
  var e = /* @__PURE__ */ new Set(), t = null;
  function n(s) {
    t && (!s.canMonitor || s.canMonitor(t.canMonitorArgs)) && t.active.add(s);
  }
  function r(s) {
    var i = Nd({}, s);
    e.add(i), n(i);
    function l() {
      e.delete(i), t && t.active.delete(i);
    }
    return jt(l);
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
      var c = $d(e), a;
      try {
        for (c.s(); !(a = c.n()).done; ) {
          var u = a.value;
          n(u);
        }
      } catch (F) {
        c.e(F);
      } finally {
        c.f();
      }
    }
    if (t) {
      for (var p = Array.from(t.active), y = 0, v = p; y < v.length; y++) {
        var P = v[y];
        if (t.active.has(P)) {
          var C;
          (C = P[i]) === null || C === void 0 || C.call(P, l);
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
function Wd(e) {
  var t = e.typeKey, n = e.mount, r = e.dispatchEventToSource, o = e.onPostDispatch, s = e.defaultDropEffect, i = Bd(), l = Kd({
    typeKey: t,
    defaultDropEffect: s
  });
  function c(p) {
    r == null || r(p), l.dispatchEvent(p), i.dispatchEvent(p), o == null || o(p);
  }
  function a(p) {
    var y = p.event, v = p.dragType;
    ps.start({
      event: y,
      dragType: v,
      getDropTargetsOver: l.getIsOver,
      dispatchEvent: c
    });
  }
  function u() {
    function p() {
      var y = {
        canStart: ps.canStart,
        start: a
      };
      return n(y);
    }
    return kd({
      typeKey: t,
      mount: p
    });
  }
  return {
    registerUsage: u,
    dropTarget: l.dropTargetForConsumers,
    monitor: i.monitorForConsumers
  };
}
var Ud = jt(function() {
  return navigator.userAgent.toLocaleLowerCase().includes("android");
}), Gd = "pdnd:android-fallback", vs = "text/plain", qd = "text/uri-list", zd = "application/vnd.pdnd", Xn = /* @__PURE__ */ new WeakMap();
function Yd(e) {
  return Xn.set(e.element, e), function() {
    Xn.delete(e.element);
  };
}
var ws = bd(), ml = Wd({
  typeKey: "element",
  defaultDropEffect: "move",
  mount: function(t) {
    return hr(ws.bindEvents(), Tt.bind(document, {
      type: "dragstart",
      listener: function(r) {
        var o, s, i, l, c, a;
        if (t.canStart(r) && !r.defaultPrevented && r.dataTransfer) {
          var u = r.target;
          if (u instanceof HTMLElement) {
            var p = Xn.get(u);
            if (p) {
              var y = gn(r), v = {
                element: p.element,
                dragHandle: (o = p.dragHandle) !== null && o !== void 0 ? o : null,
                input: y
              };
              if (p.canDrag && !p.canDrag(v)) {
                r.preventDefault();
                return;
              }
              if (p.dragHandle) {
                var P = dl({
                  x: y.clientX,
                  y: y.clientY
                });
                if (!p.dragHandle.contains(P)) {
                  r.preventDefault();
                  return;
                }
              }
              var C = (s = (i = p.getInitialDataForExternal) === null || i === void 0 ? void 0 : i.call(p, v)) !== null && s !== void 0 ? s : null;
              if (C)
                for (var F = 0, K = Object.entries(C); F < K.length; F++) {
                  var M = al(K[F], 2), j = M[0], E = M[1];
                  r.dataTransfer.setData(j, E ?? "");
                }
              Ud() && !r.dataTransfer.types.includes(vs) && !r.dataTransfer.types.includes(qd) && r.dataTransfer.setData(vs, Gd), r.dataTransfer.setData(zd, "");
              var k = {
                element: p.element,
                dragHandle: (l = p.dragHandle) !== null && l !== void 0 ? l : null,
                data: (c = (a = p.getInitialData) === null || a === void 0 ? void 0 : a.call(p, v)) !== null && c !== void 0 ? c : {}
              }, N = {
                type: "element",
                payload: k,
                startedFrom: "internal"
              };
              t.start({
                event: r,
                dragType: N
              });
            }
          }
        }
      }
    }));
  },
  dispatchEventToSource: function(t) {
    var n, r, o = t.eventName, s = t.payload;
    (n = Xn.get(s.source.element)) === null || n === void 0 || (r = n[o]) === null || r === void 0 || r.call(
      n,
      // I cannot seem to get the types right here.
      // TS doesn't seem to like that one event can need `nativeSetDragImage`
      // @ts-expect-error
      s
    );
  },
  onPostDispatch: ws.getOnPostDispatch()
}), Xd = ml.dropTarget;
function Jd(e) {
  var t = hr(
    // making the draggable register the adapter rather than drop targets
    // this is because you *must* have a draggable element to start a drag
    // but you _might_ not have any drop targets immediately
    // (You might create drop targets async)
    ml.registerUsage(),
    Yd(e),
    hl(e.element, {
      attribute: "draggable",
      value: "true"
    })
  );
  return jt(t);
}
function Zd(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
    if (t.indexOf(r) !== -1) continue;
    n[r] = e[r];
  }
  return n;
}
function Qd(e, t) {
  if (e == null) return {};
  var n, r, o = Zd(e, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    for (r = 0; r < s.length; r++) n = s[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (o[n] = e[n]);
  }
  return o;
}
function yl(e, t) {
  var n = Object.keys(e), r = Object.keys(t);
  return n.length !== r.length ? !1 : n.every(function(o) {
    return Object.is(e[o], t[o]);
  });
}
function ep() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : yl, t = null;
  return function(n) {
    return t && e(t.value, n) || (t = {
      value: n
    }), t.value;
  };
}
var tp = ["block"];
function bs(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function _s(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? bs(Object(n), !0).forEach(function(r) {
      Pn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : bs(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function np(e) {
  return {
    x: (e.right + e.left) / 2,
    y: (e.bottom + e.top) / 2
  };
}
function Hr(e) {
  var t = e.client, n = e.borderBox, r = n.height / 4;
  return t.y <= n.top + r ? "reorder-above" : t.y >= n.bottom - r ? "reorder-below" : "make-child";
}
function rp(e) {
  var t = e.element, n = e.input, r = e.currentLevel, o = e.indentPerLevel, s = e.mode, i = {
    x: n.clientX,
    y: n.clientY
  }, l = t.getBoundingClientRect();
  if (s === "standard") {
    var c = Hr({
      borderBox: l,
      client: i
    });
    return {
      type: c,
      indentPerLevel: o,
      currentLevel: r
    };
  }
  var a = np(l);
  if (s === "expanded") {
    var u = Hr({
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
  var p = o * r;
  if (i.x < l.left + p) {
    if (i.y < a.y)
      return {
        type: "reorder-above",
        indentPerLevel: o,
        currentLevel: r
      };
    var y = (i.x - l.left) / o, v = Math.max(Math.floor(y), 0);
    return {
      type: "reparent",
      desiredLevel: v,
      indentPerLevel: o,
      currentLevel: r
    };
  }
  return {
    type: Hr({
      borderBox: l,
      client: i
    }),
    indentPerLevel: o,
    currentLevel: r
  };
}
function vl(e, t) {
  return e.type !== t.type ? !1 : e.type === "instruction-blocked" && t.type === "instruction-blocked" ? vl(e.desired, t.desired) : yl(e, t);
}
var op = ep(vl);
function sp(e) {
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
function ip(e, t) {
  var n = t.block, r = Qd(t, tp), o = rp(r), s = sp({
    desired: o,
    block: n
  }), i = op(s);
  return _s(_s({}, e), {}, Pn({}, wl, i));
}
function Ss(e) {
  var t;
  return (t = e[wl]) !== null && t !== void 0 ? t : null;
}
var wl = Symbol("tree-item-instruction");
const lp = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/><path fill="#42a5f5" d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5z"/></svg>', cp = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m8.668 6h3.6641l-3.6641-3.668v3.668m-4.668-4.668h5.332l4 4v8c0 0.73828-0.59375 1.3359-1.332 1.3359h-8c-0.73828 0-1.332-0.59766-1.332-1.3359v-10.664c0-0.74219 0.59375-1.3359 1.332-1.3359m3.332 1.3359h-3.332v10.664h8v-6h-4.668z" fill="#90a4ae" /></svg>', ap = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m6.922 3.768-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232" fill="#90a4ae" /></svg>', up = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.483 6H4.721a1 1 0 0 0-.949.684L2 12V5h12a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232l-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h11l2.403-5.606A1 1 0 0 0 14.483 6" fill="#90a4ae" /></svg>', fp = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#26a69a" d="M8.5 6h4l-4-4zM3.875 1H9.5l4 4v8.6c0 .773-.616 1.4-1.375 1.4h-8.25c-.76 0-1.375-.627-1.375-1.4V2.4c0-.777.612-1.4 1.375-1.4M4 13.6h8V8l-2.625 2.8L8 9.4zm1.25-7.7c-.76 0-1.375.627-1.375 1.4s.616 1.4 1.375 1.4c.76 0 1.375-.627 1.375-1.4S6.009 5.9 5.25 5.9"/></svg>', dp = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#42a5f5" d="m14 10-4 3.5L6 10H4v12h4v-6l2 2 2-2v6h4V10zm12 6v-6h-4v6h-4l6 8 6-8z"/></svg>', pp = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ef5350" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m4.93 10.44c.41.9.93 1.64 1.53 2.15l.41.32c-.87.16-2.07.44-3.34.93l-.11.04.5-1.04c.45-.87.78-1.66 1.01-2.4m6.48 3.81c.18-.18.27-.41.28-.66.03-.2-.02-.39-.12-.55-.29-.47-1.04-.69-2.28-.69l-1.29.07-.87-.58c-.63-.52-1.2-1.43-1.6-2.56l.04-.14c.33-1.33.64-2.94-.02-3.6a.85.85 0 0 0-.61-.24h-.24c-.37 0-.7.39-.79.77-.37 1.33-.15 2.06.22 3.27v.01c-.25.88-.57 1.9-1.08 2.93l-.96 1.8-.89.49c-1.2.75-1.77 1.59-1.88 2.12-.04.19-.02.36.05.54l.03.05.48.31.44.11c.81 0 1.73-.95 2.97-3.07l.18-.07c1.03-.33 2.31-.56 4.03-.75 1.03.51 2.24.74 3 .74.44 0 .74-.11.91-.3m-.41-.71.09.11c-.01.1-.04.11-.09.13h-.04l-.19.02c-.46 0-1.17-.19-1.9-.51.09-.1.13-.1.23-.1 1.4 0 1.8.25 1.9.35M7.83 17c-.65 1.19-1.24 1.85-1.69 2 .05-.38.5-1.04 1.21-1.69zm3.02-6.91c-.23-.9-.24-1.63-.07-2.05l.07-.12.15.05c.17.24.19.56.09 1.1l-.03.16-.16.82z"/></svg>', gp = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#0288d1" d="M9.86 2A2.86 2.86 0 0 0 7 4.86v1.68h4.29c.39 0 .71.57.71.96H4.86A2.86 2.86 0 0 0 2 10.36v3.781a2.86 2.86 0 0 0 2.86 2.86h1.18v-2.68a2.85 2.85 0 0 1 2.85-2.86h5.25c1.58 0 2.86-1.271 2.86-2.851V4.86A2.86 2.86 0 0 0 14.14 2zm-.72 1.61c.4 0 .72.12.72.71s-.32.891-.72.891c-.39 0-.71-.3-.71-.89s.32-.711.71-.711"/><path fill="#fdd835" d="M17.959 7v2.68a2.85 2.85 0 0 1-2.85 2.859H9.86A2.85 2.85 0 0 0 7 15.389v3.75a2.86 2.86 0 0 0 2.86 2.86h4.28A2.86 2.86 0 0 0 17 19.14v-1.68h-4.291c-.39 0-.709-.57-.709-.96h7.14A2.86 2.86 0 0 0 22 13.64V9.86A2.86 2.86 0 0 0 19.14 7zM8.32 11.513l-.004.004.038-.004zm6.54 7.276c.39 0 .71.3.71.89a.71.71 0 0 1-.71.71c-.4 0-.72-.12-.72-.71s.32-.89.72-.89"/></svg>', hp = {
  key: 0,
  class: "pnl-tst-empty"
}, mp = ["aria-label", "aria-colcount", "aria-rowcount"], yp = {
  key: 0,
  class: "pnl-tst-head",
  role: "rowgroup"
}, vp = {
  class: "pnl-tst-hrow",
  role: "row",
  "aria-rowindex": 1
}, wp = ["aria-colindex"], bp = {
  class: "pnl-tst-body",
  role: "rowgroup"
}, _p = ["aria-level", "aria-posinset", "aria-setsize", "aria-rowindex", "aria-expanded", "aria-selected", "tabindex", "onClick", "onFocus"], Sp = ["aria-colindex"], xp = ["onClick"], Rp = {
  key: 1,
  class: "pnl-tst-twisty pnl-tst-twisty--leaf",
  "aria-hidden": "true"
}, Cp = ["checked", ".indeterminate", "aria-label", "onClick"], Mp = ["innerHTML"], Op = { class: "pnl-tst-value" }, Pp = "title", on = "pnl-tst-row", Ep = 500, Ip = {
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
      rowExpandingFeature: Lf,
      rowSelectionFeature: Jf,
      coreRowModel: Xi(),
      expandedRowModel: Zf()
    }, r = ae(() => (t.state.columns || []).length > 0), o = ae(() => {
      const g = t.state.columns || [];
      return g.length === 0 ? [{ id: Pp, header: "", accessorFn: (h) => h.title }] : g.map((h) => {
        const w = h.field ?? h.id;
        return {
          id: h.id,
          header: h.header ?? h.id,
          accessorFn: (A) => A[w],
          meta: { width: h.width }
        };
      });
    }), s = /* @__PURE__ */ bt(i(t.state.expandedKeys));
    function i(g) {
      const h = {};
      for (const w of g || []) h[w] = !0;
      return h;
    }
    function l(g) {
      return g === !0 ? F.getCoreRowModel().flatRows.filter((h) => h.subRows.length > 0).map((h) => h.id).sort() : Object.keys(g).filter((h) => g[h]).sort();
    }
    const c = {
      document: lp,
      file: cp,
      folder: ap,
      "folder-open": up,
      image: fp,
      markdown: dp,
      pdf: pp,
      python: gp
    };
    function a(g) {
      const h = g.original.icon;
      if (!h) return null;
      const w = { ...c, ...t.state.icons || {} };
      return U(g) && w[`${h}-open`] ? w[`${h}-open`] : w[h] ?? null;
    }
    function u(g, h) {
      return g.length !== h.length ? !1 : g.every((w, A) => w === h[A]);
    }
    const p = ae(() => t.state.options.select_mode ?? "none"), y = ae(() => p.value !== "none"), v = ae(() => p.value === "hierarchy"), P = ae(
      () => y.value && t.state.options.show_checkboxes !== !1
    ), C = /* @__PURE__ */ bt(i(t.state.selectedKeys)), F = nd({
      features: n,
      data: ae(() => t.state.source || []),
      columns: o,
      getRowId: (g) => g.key,
      getSubRows: (g) => g.children,
      // TanStack resets `expanded` whenever `data` changes. Python rewrites the
      // whole tree after every move, so leaving that on would collapse the tree on
      // each drop and push an empty `expanded_keys` back. Expansion is owned here.
      autoResetExpanded: !1,
      enableRowSelection: y,
      enableMultiRowSelection: ae(() => p.value !== "single"),
      enableSubRowSelection: v,
      state: ae(() => ({ expanded: s.value, rowSelection: C.value })),
      onExpandedChange: (g) => {
        s.value = typeof g == "function" ? g(s.value) : g;
      },
      onRowSelectionChange: (g) => {
        C.value = typeof g == "function" ? g(C.value) : g;
      }
    });
    function K(g) {
      if (g.getIsSelected()) return "all";
      if (!v.value || g.subRows.length === 0) return "none";
      const h = g.subRows.map(K);
      return h.every((w) => w === "all") ? "all" : h.some((w) => w !== "none") ? "some" : "none";
    }
    Ae(() => l(C.value), t.setSelectedKeys, { flush: "post" }), Ae(() => l(s.value), t.setExpandedKeys, { flush: "post" }), Ae(
      () => t.state.expandedKeys,
      (g) => {
        u(l(s.value), [...g || []].sort()) || (s.value = i(g));
      }
    ), Ae(
      () => t.state.selectedKeys,
      (g) => {
        u(l(C.value), [...g || []].sort()) || (C.value = i(g));
      }
    ), Ae(
      () => [t.state.options.expand_all, t.state.source],
      ([g]) => {
        g && F.toggleAllRowsExpanded(!0);
      },
      { immediate: !0 }
    );
    const M = ae(() => (t.state.filterText ?? "").trim().toLowerCase()), j = ae(() => M.value.length > 0);
    function E(g) {
      return g.getAllCells().some((h) => String(h.getValue() ?? "").toLowerCase().includes(M.value));
    }
    const k = ae(() => {
      if (!j.value) return F.getRowModel().rows;
      const g = /* @__PURE__ */ new Set();
      for (const h of F.getCoreRowModel().flatRows)
        if (E(h)) {
          g.add(h.id);
          for (let w = h.getParentRow(); w; w = w.getParentRow()) g.add(w.id);
        }
      return F.getCoreRowModel().flatRows.filter((h) => g.has(h.id));
    }), N = ae(() => {
      var g;
      return ((g = F.getHeaderGroups()[0]) == null ? void 0 : g.headers) ?? [];
    }), ie = ae(() => t.state.options.indent_px ?? 16), V = ae(() => t.state.options.aria_label ?? "Tree table"), D = ae(() => j.value ? "No matches" : "No data"), z = ae(() => r.value ? 2 : 1), le = ae(() => k.value.length + (r.value ? 1 : 0)), ne = ae(() => {
      const g = /* @__PURE__ */ new Map();
      for (const h of k.value) {
        const w = h.parentId ?? "", A = g.get(w) ?? [];
        A.push(h.id), g.set(w, A);
      }
      return g;
    });
    function fe(g) {
      return ne.value.get(g.parentId ?? "") ?? [];
    }
    function Ce(g) {
      return fe(g).indexOf(g.id) + 1;
    }
    function Me(g) {
      return fe(g).length;
    }
    function J(g) {
      return j.value ? (ne.value.get(g.id) ?? []).length > 0 : g.getCanExpand();
    }
    function U(g) {
      return j.value ? J(g) : g.getIsExpanded();
    }
    function Z(g) {
      var w;
      const h = (w = g.meta) == null ? void 0 : w.width;
      return h ? { flex: `0 0 ${h}px` } : { flex: "1 1 0" };
    }
    function Ye(g, h) {
      return { ...Z(h), paddingInlineStart: `${g.depth * ie.value}px` };
    }
    const Oe = /* @__PURE__ */ bt(null), Fe = /* @__PURE__ */ new Map();
    function je(g, h) {
      h ? Fe.set(g, h) : Fe.delete(g);
    }
    const Ht = ae(() => {
      const g = k.value;
      return g.length === 0 ? null : g.some((h) => h.id === Oe.value) ? Oe.value : g[0].id;
    });
    function at(g) {
      g != null && (Oe.value = g, Xs(() => {
        var h;
        return (h = Fe.get(g)) == null ? void 0 : h.focus();
      }));
    }
    function Qt(g) {
      const h = k.value;
      h.length !== 0 && at(h[Math.max(0, Math.min(g, h.length - 1))].id);
    }
    function ut(g, h) {
      const w = k.value;
      if (w.length === 0) return;
      const A = w[Math.max(0, Math.min(g, w.length - 1))], Y = (h == null ? void 0 : h.shiftKey) && y.value && p.value !== "single";
      Y && Xe.value === null && (Xe.value = Ht.value), at(A.id), Y && ft(A, !1);
    }
    function kt(g) {
      const h = k.value;
      if (h.length === 0) return;
      const w = Math.max(
        0,
        h.findIndex((Y) => Y.id === Ht.value)
      ), A = h[w];
      switch (g.key) {
        case "ArrowDown":
          g.preventDefault(), ut(w + 1, g);
          break;
        case "ArrowUp":
          g.preventDefault(), ut(w - 1, g);
          break;
        case "ArrowRight":
          if (g.preventDefault(), !J(A)) break;
          U(A) ? Qt(w + 1) : (A.toggleExpanded(!0), at(A.id));
          break;
        case "ArrowLeft":
          g.preventDefault(), !j.value && A.getCanExpand() && A.getIsExpanded() ? (A.toggleExpanded(!1), at(A.id)) : A.parentId && at(A.parentId);
          break;
        case "Home":
          g.preventDefault(), Qt(0);
          break;
        case "End":
          g.preventDefault(), Qt(h.length - 1);
          break;
        case "Enter":
          g.preventDefault(), t.emitEvent("activate", { key: A.id });
          break;
        case " ":
          if (!y.value) break;
          g.preventDefault(), S(A);
          break;
      }
    }
    const Xe = /* @__PURE__ */ bt(null);
    function Lt(g) {
      Xe.value = g.id, C.value = {}, g.toggleSelected(!0, { selectChildren: !1 });
    }
    function ft(g, h) {
      const w = k.value, A = w.findIndex((wt) => wt.id === Xe.value), Y = w.findIndex((wt) => wt.id === g.id);
      if (Y === -1) return;
      if (A === -1) {
        Lt(g);
        return;
      }
      h || (C.value = {});
      const [Je, yr] = A <= Y ? [A, Y] : [Y, A];
      for (let wt = Je; wt <= yr; wt += 1)
        w[wt].toggleSelected(!0, { selectChildren: !1 });
    }
    function So(g, h) {
      Oe.value = g.id, y.value && p.value !== "single" ? h != null && h.shiftKey ? ft(g, h.ctrlKey || h.metaKey) : h != null && h.ctrlKey || h != null && h.metaKey ? (Xe.value = g.id, x(g)) : Lt(g) : y.value && Lt(g), t.emitEvent("activate", { key: g.id });
    }
    function f(g) {
      Oe.value = g.id, !j.value && g.toggleExpanded();
    }
    function d(g) {
      return K(g) === "all";
    }
    function m(g) {
      return K(g) === "some";
    }
    function x(g) {
      Oe.value = g.id, g.toggleSelected(void 0, { selectChildren: !1 });
    }
    function S(g) {
      Oe.value = g.id, g.toggleSelected(!d(g), {
        selectChildren: v.value,
        deselectParents: v.value
      });
    }
    function _(g) {
      S(g), at(g.id);
    }
    const I = ["reorder-above", "reorder-below", "make-child", "reparent"], O = ae(() => t.state.options.enable_dnd === !0), R = /* @__PURE__ */ bt([]), b = /* @__PURE__ */ bt(null);
    function L(g) {
      return k.value.find((h) => h.id === g) ?? null;
    }
    function T(g, h) {
      let w = g;
      for (; w; ) {
        if (h.includes(w.id)) return !0;
        w = w.getParentRow();
      }
      return !1;
    }
    function H(g) {
      if (!y.value || !g.getIsSelected()) return [g.id];
      const h = /* @__PURE__ */ new Set();
      for (let A = g.getParentRow(); A; A = A.getParentRow()) h.add(A.id);
      const w = k.value.filter((A) => A.getIsSelected() && !h.has(A.id)).map((A) => A.id);
      return w.length > 1 ? w : [g.id];
    }
    function $(g, h) {
      return T(g, h) ? I : g.original.allow_children === !1 ? ["make-child"] : [];
    }
    function G(g) {
      if (J(g) && U(g)) return "expanded";
      const h = fe(g);
      return h[h.length - 1] === g.id ? "last-in-group" : "standard";
    }
    let X = null, q = null;
    function ce() {
      q && clearTimeout(q), q = null, X = null;
    }
    function de(g, h) {
      if (X === g || (ce(), !h || h.type === "instruction-blocked")) return;
      const w = L(g);
      !w || !w.getCanExpand() || w.getIsExpanded() || (X = g, q = setTimeout(() => {
        q = null;
        const A = L(g);
        A && A.getCanExpand() && !A.getIsExpanded() && A.toggleExpanded(!0);
      }, Ep));
    }
    function Pe() {
      b.value = null, ce();
    }
    const Ie = /* @__PURE__ */ bt(null);
    function yt() {
      let g = Ie.value;
      if (!g) return null;
      let h = g.getRootNode();
      for (; h.host; )
        g = h.host, h = g.getRootNode();
      return g;
    }
    function vt(g) {
      for (const h of k.value) {
        const w = Fe.get(h.id);
        if (!w) continue;
        const A = w.getBoundingClientRect();
        if (g.clientX >= A.left && g.clientX < A.right && g.clientY >= A.top && g.clientY < A.bottom)
          return { row: h, element: w, rect: A };
      }
      return null;
    }
    function _e(g, h) {
      for (const w of g.element.querySelectorAll(".pnl-tst-check, .pnl-tst-twisty")) {
        const A = w.getBoundingClientRect();
        if (h.clientX >= A.left && h.clientX < A.right && h.clientY >= A.top && h.clientY < A.bottom)
          return !0;
      }
      return !1;
    }
    let pe = null;
    function en() {
      pe == null || pe(), pe = null;
      const g = yt();
      !g || !O.value || (pe = hr(
        Jd({
          element: g,
          // Anything outside a row (the header, the empty space below the last row)
          // is not a drag handle, and returning false cancels the native drag.
          canDrag: ({ input: h }) => {
            const w = vt(h);
            return w !== null && !_e(w, h);
          },
          getInitialData: ({ input: h }) => {
            const w = vt(h);
            return w ? { type: on, key: w.row.id, keys: H(w.row) } : { type: on, key: null, keys: [] };
          },
          onGenerateDragPreview: ({ location: h, nativeSetDragImage: w }) => {
            const A = h.current.input, Y = vt(A);
            !Y || !w || w(Y.element, A.clientX - Y.rect.left, A.clientY - Y.rect.top);
          },
          onDragStart: ({ source: h }) => {
            R.value = h.data.keys ?? [];
          },
          onDrop: () => {
            R.value = [], Pe();
          }
        }),
        Xd({
          element: g,
          canDrop: ({ source: h }) => h.data.type === on,
          getData: ({ input: h, source: w }) => {
            const A = vt(h);
            if (!A) return { type: on, key: null };
            const Y = { type: on, key: A.row.id };
            return ip(Y, {
              element: A.element,
              input: h,
              currentLevel: A.row.depth,
              indentPerLevel: ie.value,
              mode: G(A.row),
              block: $(A.row, w.data.keys ?? [])
            });
          },
          onDrag: ({ self: h }) => {
            const w = h.data.key, A = Ss(h.data);
            b.value = w && A ? { key: w, instruction: A } : null, de(w ?? null, A);
          },
          onDragLeave: Pe,
          onDrop: ({ self: h, source: w }) => {
            Pe();
            const A = h.data.key, Y = Ss(h.data);
            if (!A || !Y || Y.type === "instruction-blocked") return;
            const Je = w.data.keys ?? [];
            Je.includes(A) || t.emitEvent("move", {
              key: w.data.key,
              keys: Je,
              targetKey: A,
              instruction: Y.type,
              desiredLevel: Y.desiredLevel ?? Y.currentLevel
            });
          }
        })
      ));
    }
    ii(en), Ae(O, en), li(() => {
      ce(), pe == null || pe();
    });
    function Kt(g) {
      var h;
      return ((h = b.value) == null ? void 0 : h.key) === g.id ? b.value.instruction : null;
    }
    function bl(g) {
      const h = Kt(g);
      return {
        "pnl-tst-row--draggable": O.value,
        "pnl-tst-row--dragging": R.value.includes(g.id),
        "pnl-tst-row--blocked": (h == null ? void 0 : h.type) === "instruction-blocked",
        "pnl-tst-row--child-target": (h == null ? void 0 : h.type) === "make-child"
      };
    }
    function xo(g) {
      const h = Kt(g);
      return h ? h.type === "reorder-above" ? "pnl-tst-dropline--above" : h.type === "reorder-below" || h.type === "reparent" ? "pnl-tst-dropline--below" : null : null;
    }
    function _l(g) {
      const h = Kt(g);
      return h ? { insetInlineStart: `${(h.type === "reparent" ? h.desiredLevel : h.currentLevel) * h.indentPerLevel}px` } : null;
    }
    return (g, h) => (he(), ye("div", {
      ref_key: "rootElement",
      ref: Ie,
      class: "pnl-tst"
    }, [
      k.value.length === 0 ? (he(), ye("div", hp, jn(D.value), 1)) : (he(), ye("div", {
        key: 1,
        class: "pnl-tst-grid",
        role: "treegrid",
        "aria-label": V.value,
        "aria-colcount": N.value.length,
        "aria-rowcount": le.value,
        onKeydown: kt
      }, [
        r.value ? (he(), ye("div", yp, [
          Rt("div", vp, [
            (he(!0), ye(Te, null, Cr(N.value, (w, A) => (he(), ye("div", {
              key: w.id,
              class: "pnl-tst-hcell",
              role: "columnheader",
              "aria-colindex": A + 1,
              style: Wt(Z(w.column.columnDef))
            }, jn(w.column.columnDef.header), 13, wp))), 128))
          ])
        ])) : rn("", !0),
        Rt("div", bp, [
          (he(!0), ye(Te, null, Cr(k.value, (w, A) => (he(), ye("div", {
            key: w.id,
            ref_for: !0,
            ref: (Y) => je(w.id, Y),
            class: Ct(["pnl-tst-row", [bl(w), { "pnl-tst-row--active": w.id === Oe.value }]]),
            role: "row",
            "aria-level": w.depth + 1,
            "aria-posinset": Ce(w),
            "aria-setsize": Me(w),
            "aria-rowindex": A + z.value,
            "aria-expanded": J(w) ? U(w) : void 0,
            "aria-selected": y.value ? w.getIsSelected() : void 0,
            tabindex: w.id === Ht.value ? 0 : -1,
            onClick: (Y) => So(w, Y),
            onFocus: (Y) => Oe.value = w.id
          }, [
            xo(w) ? (he(), ye("span", {
              key: 0,
              class: Ct(["pnl-tst-dropline", xo(w)]),
              style: Wt(_l(w)),
              "aria-hidden": "true"
            }, null, 6)) : rn("", !0),
            (he(!0), ye(Te, null, Cr(w.getAllCells(), (Y, Je) => (he(), ye("div", {
              key: Y.id,
              class: Ct(["pnl-tst-cell", { "pnl-tst-cell--tree": Je === 0 }]),
              role: "gridcell",
              "aria-colindex": Je + 1,
              style: Wt(
                Je === 0 ? Ye(w, Y.column.columnDef) : Z(Y.column.columnDef)
              )
            }, [
              Je === 0 ? (he(), ye(Te, { key: 0 }, [
                J(w) ? (he(), ye("span", {
                  key: 0,
                  class: Ct(["pnl-tst-twisty", { "pnl-tst-twisty--open": U(w) }]),
                  "aria-hidden": "true",
                  onClick: Zo((yr) => f(w), ["stop"])
                }, [...h[0] || (h[0] = [
                  Rt("svg", {
                    viewBox: "0 0 16 16",
                    width: "12",
                    height: "12",
                    focusable: "false"
                  }, [
                    Rt("path", {
                      d: "M6 3.5 10.5 8 6 12.5",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "1.6"
                    })
                  ], -1)
                ])], 10, xp)) : (he(), ye("span", Rp)),
                P.value ? (he(), ye("input", {
                  key: 2,
                  class: "pnl-tst-check",
                  type: "checkbox",
                  tabindex: "-1",
                  checked: d(w),
                  ".indeterminate": m(w),
                  "aria-label": `Select ${w.original.title ?? w.id}`,
                  onClick: Zo((yr) => _(w), ["stop"])
                }, null, 40, Cp)) : rn("", !0),
                a(w) ? (he(), ye("span", {
                  key: 3,
                  class: "pnl-tst-icon",
                  "aria-hidden": "true",
                  innerHTML: a(w)
                }, null, 8, Mp)) : rn("", !0)
              ], 64)) : rn("", !0),
              Rt("span", Op, jn(Y.getValue()), 1)
            ], 14, Sp))), 128))
          ], 42, _p))), 128))
        ])
      ], 40, mp))
    ], 512));
  }
};
function Ap({ model: e, el: t }) {
  t.style.display = "block", t.style.width = "100%", t.style.height = "100%";
  const n = document.createElement("div");
  n.className = "pnl-tst-root", n.style.height = "100%", t.append(n);
  const r = /* @__PURE__ */ rr({
    source: e.get("source") || [],
    columns: e.get("columns") || [],
    options: e.get("options") || {},
    icons: e.get("icons") || {},
    filterText: e.get("filter_text") || "",
    expandedKeys: e.get("expanded_keys") || [],
    selectedKeys: e.get("selected_keys") || []
  }), o = (u, p) => {
    e.set("_event_data", {
      event_name: u,
      event_params: p,
      timestamp: Date.now()
    }), e.save_changes();
  }, s = (u, p) => u.length === p.length && u.every((y, v) => y === p[v]), i = (u) => (p) => {
    const y = [...e.get(u) || []].sort();
    s(y, p) || (e.set(u, p), e.save_changes());
  }, l = i("expanded_keys"), c = i("selected_keys"), a = Ba(Ip, { state: r, emitEvent: o, setExpandedKeys: l, setSelectedKeys: c });
  return a.mount(n), e.on("change:source", () => {
    r.source = e.get("source") || [];
  }), e.on("change:columns", () => {
    r.columns = e.get("columns") || [];
  }), e.on("change:options", () => {
    r.options = e.get("options") || {};
  }), e.on("change:icons", () => {
    r.icons = e.get("icons") || {};
  }), e.on("change:filter_text", () => {
    r.filterText = e.get("filter_text") || "";
  }), e.on("change:expanded_keys", () => {
    r.expandedKeys = e.get("expanded_keys") || [];
  }), e.on("change:selected_keys", () => {
    r.selectedKeys = e.get("selected_keys") || [];
  }), () => {
    a.unmount();
  };
}
export {
  Ap as render
};

/**
* @vue/shared v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function Ds(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const he = {}, gn = [], at = () => {
}, Ol = () => !1, to = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), no = (e) => e.startsWith("onUpdate:"), De = Object.assign, ks = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Fu = Object.prototype.hasOwnProperty, fe = (e, t) => Fu.call(e, t), W = Array.isArray, Ft = (e) => rr(e) === "[object Map]", Br = (e) => rr(e) === "[object Set]", Ei = (e) => rr(e) === "[object Date]", q = (e) => typeof e == "function", _e = (e) => typeof e == "string", ct = (e) => typeof e == "symbol", de = (e) => e !== null && typeof e == "object", Pl = (e) => (de(e) || q(e)) && q(e.then) && q(e.catch), Dl = Object.prototype.toString, rr = (e) => Dl.call(e), Hu = (e) => rr(e).slice(8, -1), kl = (e) => rr(e) === "[object Object]", Ts = (e) => _e(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Kn = /* @__PURE__ */ Ds(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), ro = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Lu = /-\w/g, Ge = ro(
  (e) => e.replace(Lu, (t) => t.slice(1).toUpperCase())
), ju = /\B([A-Z])/g, Xt = ro(
  (e) => e.replace(ju, "-$1").toLowerCase()
), Tl = ro((e) => e.charAt(0).toUpperCase() + e.slice(1)), $o = ro(
  (e) => e ? `on${Tl(e)}` : ""
), it = (e, t) => !Object.is(e, t), Wo = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Fl = (e, t, n, r = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: r,
    value: n
  });
}, zu = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Ai;
const oo = () => Ai || (Ai = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function kt(e) {
  if (W(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], o = _e(r) ? Nu(r) : kt(r);
      if (o)
        for (const s in o)
          t[s] = o[s];
    }
    return t;
  } else if (_e(e) || de(e))
    return e;
}
const Ku = /;(?![^(]*\))/g, Vu = /:([^]+)/, Bu = /\/\*[^]*?\*\//g;
function Nu(e) {
  const t = {};
  return e.replace(Bu, "").split(Ku).forEach((n) => {
    if (n) {
      const r = n.split(Vu);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function rt(e) {
  let t = "";
  if (_e(e))
    t = e;
  else if (W(e))
    for (let n = 0; n < e.length; n++) {
      const r = rt(e[n]);
      r && (t += r + " ");
    }
  else if (de(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const $u = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Wu = /* @__PURE__ */ Ds($u);
function Hl(e) {
  return !!e || e === "";
}
function Uu(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let r = 0; n && r < e.length; r++)
    n = so(e[r], t[r]);
  return n;
}
function Oi(e, t) {
  if (e.size !== t.size) return !1;
  const n = Array.from(t), r = new Uint8Array(n.length);
  for (const o of e) {
    let s = -1;
    for (let i = 0; i < n.length; i++)
      if (!r[i] && so(o, n[i])) {
        s = i;
        break;
      }
    if (s < 0) return !1;
    r[s] = 1;
  }
  return !0;
}
function so(e, t) {
  if (e === t) return !0;
  let n = Ei(e), r = Ei(t);
  if (n || r)
    return n && r ? e.getTime() === t.getTime() : !1;
  if (n = ct(e), r = ct(t), n || r)
    return e === t;
  if (n = W(e), r = W(t), n || r)
    return n && r ? Uu(e, t) : !1;
  if (n = de(e), r = de(t), n || r) {
    if (!n || !r)
      return !1;
    if (n = Ft(e), r = Ft(t), n || r || (n = Br(e), r = Br(t), n || r))
      return n && r ? Oi(e, t) : !1;
    const o = Object.keys(e).length, s = Object.keys(t).length;
    if (o !== s)
      return !1;
    for (const i in e) {
      const a = e.hasOwnProperty(i), c = t.hasOwnProperty(i);
      if (a && !c || !a && c || !so(e[i], t[i]))
        return !1;
    }
  }
  return String(e) === String(t);
}
const Ll = (e) => !!(e && e.__v_isRef === !0), Pt = (e) => _e(e) ? e : e == null ? "" : W(e) || de(e) && (e.toString === Dl || !q(e.toString)) ? Ll(e) ? Pt(e.value) : JSON.stringify(e, jl, 2) : String(e), jl = (e, t) => Ll(t) ? jl(e, t.value) : Ft(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [r, o], s) => (n[Uo(r, s) + " =>"] = o, n),
    {}
  )
} : Br(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Uo(n))
} : ct(t) ? Uo(t) : de(t) && !W(t) && !kl(t) ? String(t) : t, Uo = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    ct(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Re;
class qu {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && Re && (Re.active ? (this.parent = Re, this.index = (Re.scopes || (Re.scopes = [])).push(
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
      const n = Re;
      try {
        return Re = this, t();
      } finally {
        Re = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Re, Re = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (Re === this)
        Re = this.prevScope;
      else {
        let t = Re;
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
function zl() {
  return Re;
}
function Gu(e, t = !1) {
  Re && Re.cleanups.push(e);
}
let pe;
const qo = /* @__PURE__ */ new WeakSet();
class Kl {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Re && (Re.active ? Re.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, qo.has(this) && (qo.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Bl(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Pi(this), Nl(this);
    const t = pe, n = Xe;
    pe = this, Xe = !0;
    try {
      return this.fn();
    } finally {
      $l(this), pe = t, Xe = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Ls(t);
      this.deps = this.depsTail = void 0, Pi(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? qo.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    us(this) && this.run();
  }
  get dirty() {
    return us(this);
  }
}
let Vl = 0, Vn, Bn;
function Bl(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Bn, Bn = e;
    return;
  }
  e.next = Vn, Vn = e;
}
function Fs() {
  Vl++;
}
function Hs() {
  if (--Vl > 0)
    return;
  if (Bn) {
    let t = Bn;
    for (Bn = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; Vn; ) {
    let t = Vn;
    for (Vn = void 0; t; ) {
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
function Nl(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function $l(e) {
  let t, n = e.depsTail, r = n;
  for (; r; ) {
    const o = r.prevDep;
    r.version === -1 ? (r === n && (n = o), Ls(r), Xu(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = o;
  }
  e.deps = t, e.depsTail = n;
}
function us(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Wl(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Wl(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Gn) || (e.globalVersion = Gn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !us(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = pe, r = Xe;
  pe = e, Xe = !0;
  try {
    Nl(e);
    const o = e.fn(e._value);
    (t.version === 0 || it(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    pe = n, Xe = r, $l(e), e.flags &= -3;
  }
}
function Ls(e, t = !1) {
  const { dep: n, prevSub: r, nextSub: o } = e;
  if (r && (r.nextSub = o, e.prevSub = void 0), o && (o.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
    n.computed.flags &= -5;
    for (let s = n.computed.deps; s; s = s.nextDep)
      Ls(s, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Xu(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let Xe = !0;
const Ul = [];
function _t() {
  Ul.push(Xe), Xe = !1;
}
function St() {
  const e = Ul.pop();
  Xe = e === void 0 ? !0 : e;
}
function Pi(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = pe;
    pe = void 0;
    try {
      t();
    } finally {
      pe = n;
    }
  }
}
let Gn = 0;
class Yu {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class js {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!pe || !Xe || pe === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== pe)
      n = this.activeLink = new Yu(pe, this), pe.deps ? (n.prevDep = pe.depsTail, pe.depsTail.nextDep = n, pe.depsTail = n) : pe.deps = pe.depsTail = n, ql(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const r = n.nextDep;
      r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = pe.depsTail, n.nextDep = void 0, pe.depsTail.nextDep = n, pe.depsTail = n, pe.deps === n && (pe.deps = r);
    }
    return n;
  }
  trigger(t) {
    this.version++, Gn++, this.notify(t);
  }
  notify(t) {
    Fs();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Hs();
    }
  }
}
function ql(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let r = t.deps; r; r = r.nextDep)
        ql(r);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const fs = /* @__PURE__ */ new WeakMap(), Bt = /* @__PURE__ */ Symbol(
  ""
), ds = /* @__PURE__ */ Symbol(
  ""
), Xn = /* @__PURE__ */ Symbol(
  ""
);
function Oe(e, t, n) {
  if (Xe && pe) {
    let r = fs.get(e);
    r || fs.set(e, r = /* @__PURE__ */ new Map());
    let o = r.get(n);
    o || (r.set(n, o = new js()), o.map = r, o.key = n), o.track();
  }
}
function yt(e, t, n, r, o, s) {
  const i = fs.get(e);
  if (!i) {
    Gn++;
    return;
  }
  const a = (c) => {
    c && c.trigger();
  };
  if (Fs(), t === "clear")
    i.forEach(a);
  else {
    const c = W(e), f = c && Ts(n);
    if (c && n === "length") {
      const d = Number(r);
      i.forEach((h, w) => {
        (w === "length" || w === Xn || !ct(w) && w >= d) && a(h);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && a(i.get(n)), f && a(i.get(Xn)), t) {
        case "add":
          c ? f && a(i.get("length")) : (a(i.get(Bt)), Ft(e) && a(i.get(ds)));
          break;
        case "delete":
          c || (a(i.get(Bt)), Ft(e) && a(i.get(ds)));
          break;
        case "set":
          Ft(e) && a(i.get(Bt));
          break;
      }
  }
  Hs();
}
function an(e) {
  const t = /* @__PURE__ */ ue(e);
  return t === e ? t : (Oe(t, "iterate", Xn), /* @__PURE__ */ Be(e) ? t : t.map(Ye));
}
function io(e) {
  return Oe(e = /* @__PURE__ */ ue(e), "iterate", Xn), e;
}
function ot(e, t) {
  return /* @__PURE__ */ xt(e) ? vn(/* @__PURE__ */ Nt(e) ? Ye(t) : t) : Ye(t);
}
const Zu = {
  __proto__: null,
  [Symbol.iterator]() {
    return Go(this, Symbol.iterator, (e) => ot(this, e));
  },
  concat(...e) {
    return an(this).concat(
      ...e.map((t) => W(t) ? an(t) : t)
    );
  },
  entries() {
    return Go(this, "entries", (e) => (e[1] = ot(this, e[1]), e));
  },
  every(e, t) {
    return mt(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return mt(
      this,
      "filter",
      e,
      t,
      (n) => n.map((r) => ot(this, r)),
      arguments
    );
  },
  find(e, t) {
    return mt(
      this,
      "find",
      e,
      t,
      (n) => ot(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return mt(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return mt(
      this,
      "findLast",
      e,
      t,
      (n) => ot(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return mt(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return mt(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Xo(this, "includes", e);
  },
  indexOf(...e) {
    return Xo(this, "indexOf", e);
  },
  join(e) {
    return an(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Xo(this, "lastIndexOf", e);
  },
  map(e, t) {
    return mt(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Tn(this, "pop");
  },
  push(...e) {
    return Tn(this, "push", e);
  },
  reduce(e, ...t) {
    return Di(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Di(this, "reduceRight", e, t);
  },
  shift() {
    return Tn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return mt(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Tn(this, "splice", e);
  },
  toReversed() {
    return an(this).toReversed();
  },
  toSorted(e) {
    return an(this).toSorted(e);
  },
  toSpliced(...e) {
    return an(this).toSpliced(...e);
  },
  unshift(...e) {
    return Tn(this, "unshift", e);
  },
  values() {
    return Go(this, "values", (e) => ot(this, e));
  }
};
function Go(e, t, n) {
  const r = io(e), o = r[t]();
  return r !== e && !/* @__PURE__ */ Be(e) && (o._next = o.next, o.next = () => {
    const s = o._next();
    return s.done || (s.value = n(s.value)), s;
  }), o;
}
const Ju = Array.prototype;
function mt(e, t, n, r, o, s) {
  const i = io(e), a = i !== e && !/* @__PURE__ */ Be(e), c = i[t];
  if (c !== Ju[t]) {
    const h = c.apply(e, s);
    return a ? Ye(h) : h;
  }
  let f = n;
  i !== e && (a ? f = function(h, w) {
    return n.call(this, ot(e, h), w, e);
  } : n.length > 2 && (f = function(h, w) {
    return n.call(this, h, w, e);
  }));
  const d = c.call(i, f, r);
  return a && o ? o(d) : d;
}
function Di(e, t, n, r) {
  const o = io(e), s = o !== e && !/* @__PURE__ */ Be(e);
  let i = n, a = !1;
  o !== e && (s ? (a = r.length === 0, i = function(f, d, h) {
    return a && (a = !1, f = ot(e, f)), n.call(this, f, ot(e, d), h, e);
  }) : n.length > 3 && (i = function(f, d, h) {
    return n.call(this, f, d, h, e);
  }));
  const c = o[t](i, ...r);
  return a ? ot(e, c) : c;
}
function Xo(e, t, n) {
  const r = /* @__PURE__ */ ue(e);
  Oe(r, "iterate", Xn);
  const o = r[t](...n);
  return (o === -1 || o === !1) && /* @__PURE__ */ Vs(n[0]) ? (n[0] = /* @__PURE__ */ ue(n[0]), r[t](...n)) : o;
}
function Tn(e, t, n = []) {
  _t(), Fs();
  const r = (/* @__PURE__ */ ue(e))[t].apply(e, n);
  return Hs(), St(), r;
}
const Qu = /* @__PURE__ */ Ds("__proto__,__v_isRef,__isVue"), Gl = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(ct)
);
function ef(e) {
  ct(e) || (e = String(e));
  const t = /* @__PURE__ */ ue(this);
  return Oe(t, "has", e), t.hasOwnProperty(e);
}
class Xl {
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
      return r === (o ? s ? ff : Ql : s ? Jl : Zl).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const i = W(t);
    if (!o) {
      let c;
      if (i && (c = Zu[n]))
        return c;
      if (n === "hasOwnProperty")
        return ef;
    }
    const a = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ Pe(t) ? t : r
    );
    if ((ct(n) ? Gl.has(n) : Qu(n)) || (o || Oe(t, "get", n), s))
      return a;
    if (/* @__PURE__ */ Pe(a)) {
      const c = i && Ts(n) ? a : a.value;
      return o && de(c) ? /* @__PURE__ */ ps(c) : c;
    }
    return de(a) ? o ? /* @__PURE__ */ ps(a) : /* @__PURE__ */ lo(a) : a;
  }
}
class Yl extends Xl {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, o) {
    let s = t[n];
    const i = W(t) && Ts(n);
    if (!this._isShallow) {
      const f = /* @__PURE__ */ xt(s);
      if (!/* @__PURE__ */ Be(r) && !/* @__PURE__ */ xt(r) && (s = /* @__PURE__ */ ue(s), r = /* @__PURE__ */ ue(r)), !i && /* @__PURE__ */ Pe(s) && !/* @__PURE__ */ Pe(r))
        return f || (s.value = r), !0;
    }
    const a = i ? Number(n) < t.length : fe(t, n), c = Reflect.set(
      t,
      n,
      r,
      /* @__PURE__ */ Pe(t) ? t : o
    );
    return t === /* @__PURE__ */ ue(o) && c && (a ? it(r, s) && yt(t, "set", n, r) : yt(t, "add", n, r)), c;
  }
  deleteProperty(t, n) {
    const r = fe(t, n);
    t[n];
    const o = Reflect.deleteProperty(t, n);
    return o && r && yt(t, "delete", n, void 0), o;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!ct(n) || !Gl.has(n)) && Oe(t, "has", n), r;
  }
  ownKeys(t) {
    return Oe(
      t,
      "iterate",
      W(t) ? "length" : Bt
    ), Reflect.ownKeys(t);
  }
}
class tf extends Xl {
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
const nf = /* @__PURE__ */ new Yl(), rf = /* @__PURE__ */ new tf(), of = /* @__PURE__ */ new Yl(!0);
const gs = (e) => e, Ar = (e) => Reflect.getPrototypeOf(e);
function sf(e, t, n) {
  return function(...r) {
    const o = this.__v_raw, s = /* @__PURE__ */ ue(o), i = Ft(s), a = e === "entries" || e === Symbol.iterator && i, c = e === "keys" && i, f = o[e](...r), d = n ? gs : t ? vn : Ye;
    return !t && Oe(
      s,
      "iterate",
      c ? ds : Bt
    ), De(
      // inheriting all iterator properties
      Object.create(f),
      {
        // iterator protocol
        next() {
          const { value: h, done: w } = f.next();
          return w ? { value: h, done: w } : {
            value: a ? [d(h[0]), d(h[1])] : d(h),
            done: w
          };
        }
      }
    );
  };
}
function Or(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function lf(e, t) {
  const n = {
    get(o) {
      const s = this.__v_raw, i = /* @__PURE__ */ ue(s), a = /* @__PURE__ */ ue(o);
      e || (it(o, a) && Oe(i, "get", o), Oe(i, "get", a));
      const { has: c } = Ar(i), f = t ? gs : e ? vn : Ye;
      if (c.call(i, o))
        return f(s.get(o));
      if (c.call(i, a))
        return f(s.get(a));
      s !== i && s.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && Oe(/* @__PURE__ */ ue(o), "iterate", Bt), o.size;
    },
    has(o) {
      const s = this.__v_raw, i = /* @__PURE__ */ ue(s), a = /* @__PURE__ */ ue(o);
      return e || (it(o, a) && Oe(i, "has", o), Oe(i, "has", a)), o === a ? s.has(o) : s.has(o) || s.has(a);
    },
    forEach(o, s) {
      const i = this, a = i.__v_raw, c = /* @__PURE__ */ ue(a), f = t ? gs : e ? vn : Ye;
      return !e && Oe(c, "iterate", Bt), a.forEach((d, h) => o.call(s, f(d), f(h), i));
    }
  };
  return De(
    n,
    e ? {
      add: Or("add"),
      set: Or("set"),
      delete: Or("delete"),
      clear: Or("clear")
    } : {
      add(o) {
        const s = /* @__PURE__ */ ue(this), i = Ar(s), a = /* @__PURE__ */ ue(o), c = !t && !/* @__PURE__ */ Be(o) && !/* @__PURE__ */ xt(o) ? a : o;
        return i.has.call(s, c) || it(o, c) && i.has.call(s, o) || it(a, c) && i.has.call(s, a) || (s.add(c), yt(s, "add", c, c)), this;
      },
      set(o, s) {
        !t && !/* @__PURE__ */ Be(s) && !/* @__PURE__ */ xt(s) && (s = /* @__PURE__ */ ue(s));
        const i = /* @__PURE__ */ ue(this), { has: a, get: c } = Ar(i);
        let f = a.call(i, o);
        f || (o = /* @__PURE__ */ ue(o), f = a.call(i, o));
        const d = c.call(i, o);
        return i.set(o, s), f ? it(s, d) && yt(i, "set", o, s) : yt(i, "add", o, s), this;
      },
      delete(o) {
        const s = /* @__PURE__ */ ue(this), { has: i, get: a } = Ar(s);
        let c = i.call(s, o);
        c || (o = /* @__PURE__ */ ue(o), c = i.call(s, o)), a && a.call(s, o);
        const f = s.delete(o);
        return c && yt(s, "delete", o, void 0), f;
      },
      clear() {
        const o = /* @__PURE__ */ ue(this), s = o.size !== 0, i = o.clear();
        return s && yt(
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
    n[o] = sf(o, e, t);
  }), n;
}
function zs(e, t) {
  const n = lf(e, t);
  return (r, o, s) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(
    fe(n, o) && o in r ? n : r,
    o,
    s
  );
}
const af = {
  get: /* @__PURE__ */ zs(!1, !1)
}, cf = {
  get: /* @__PURE__ */ zs(!1, !0)
}, uf = {
  get: /* @__PURE__ */ zs(!0, !1)
};
const Zl = /* @__PURE__ */ new WeakMap(), Jl = /* @__PURE__ */ new WeakMap(), Ql = /* @__PURE__ */ new WeakMap(), ff = /* @__PURE__ */ new WeakMap();
function df(e) {
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
function lo(e) {
  return /* @__PURE__ */ xt(e) ? e : Ks(
    e,
    !1,
    nf,
    af,
    Zl
  );
}
// @__NO_SIDE_EFFECTS__
function gf(e) {
  return Ks(
    e,
    !1,
    of,
    cf,
    Jl
  );
}
// @__NO_SIDE_EFFECTS__
function ps(e) {
  return Ks(
    e,
    !0,
    rf,
    uf,
    Ql
  );
}
function Ks(e, t, n, r, o) {
  if (!de(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const s = o.get(e);
  if (s)
    return s;
  const i = df(Hu(e));
  if (i === 0)
    return e;
  const a = new Proxy(
    e,
    i === 2 ? r : n
  );
  return o.set(e, a), a;
}
// @__NO_SIDE_EFFECTS__
function Nt(e) {
  return /* @__PURE__ */ xt(e) ? /* @__PURE__ */ Nt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function xt(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Be(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Vs(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function ue(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ ue(t) : e;
}
function pf(e) {
  return !fe(e, "__v_skip") && Object.isExtensible(e) && Fl(e, "__v_skip", !0), e;
}
const Ye = (e) => de(e) ? /* @__PURE__ */ lo(e) : e, vn = (e) => de(e) ? /* @__PURE__ */ ps(e) : e;
// @__NO_SIDE_EFFECTS__
function Pe(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function ge(e) {
  return ea(e, !1);
}
// @__NO_SIDE_EFFECTS__
function hf(e) {
  return ea(e, !0);
}
function ea(e, t) {
  return /* @__PURE__ */ Pe(e) ? e : new mf(e, t);
}
class mf {
  constructor(t, n) {
    this.dep = new js(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ ue(t), this._value = n ? t : Ye(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, r = this.__v_isShallow || /* @__PURE__ */ Be(t) || /* @__PURE__ */ xt(t);
    t = r ? t : /* @__PURE__ */ ue(t), it(t, n) && (this._rawValue = t, this._value = r ? t : Ye(t), this.dep.trigger());
  }
}
function $t(e) {
  return /* @__PURE__ */ Pe(e) ? e.value : e;
}
const vf = {
  get: (e, t, n) => t === "__v_raw" ? e : $t(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return /* @__PURE__ */ Pe(o) && !/* @__PURE__ */ Pe(n) ? (o.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function ta(e) {
  return /* @__PURE__ */ Nt(e) ? e : new Proxy(e, vf);
}
class wf {
  constructor(t, n, r) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new js(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Gn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    pe !== this)
      return Bl(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Wl(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function yf(e, t, n = !1) {
  let r, o;
  return q(e) ? r = e : (r = e.get, o = e.set), new wf(r, o, n);
}
const Pr = {}, Nr = /* @__PURE__ */ new WeakMap();
let Vt;
function bf(e, t = !1, n = Vt) {
  if (n) {
    let r = Nr.get(n);
    r || Nr.set(n, r = []), r.push(e);
  }
}
function _f(e, t, n = he) {
  const { immediate: r, deep: o, once: s, scheduler: i, augmentJob: a, call: c } = n, f = (C) => o ? C : /* @__PURE__ */ Be(C) || o === !1 || o === 0 ? Tt(C, 1) : Tt(C);
  let d, h, w, y, O = !1, M = !1;
  if (/* @__PURE__ */ Pe(e) ? (h = () => e.value, O = /* @__PURE__ */ Be(e)) : /* @__PURE__ */ Nt(e) ? (h = () => f(e), O = !0) : W(e) ? (M = !0, O = e.some((C) => /* @__PURE__ */ Nt(C) || /* @__PURE__ */ Be(C)), h = () => e.map((C) => {
    if (/* @__PURE__ */ Pe(C))
      return C.value;
    if (/* @__PURE__ */ Nt(C))
      return f(C);
    if (q(C))
      return c ? c(C, 2) : C();
  })) : q(e) ? t ? h = c ? () => c(e, 2) : e : h = () => {
    if (w) {
      _t();
      try {
        w();
      } finally {
        St();
      }
    }
    const C = Vt;
    Vt = d;
    try {
      return c ? c(e, 3, [y]) : e(y);
    } finally {
      Vt = C;
    }
  } : h = at, t && o) {
    const C = h, T = o === !0 ? 1 / 0 : o;
    h = () => Tt(C(), T);
  }
  const A = zl(), z = () => {
    d.stop(), A && A.active && ks(A.effects, d);
  };
  if (s && t) {
    const C = t;
    t = (...T) => {
      const H = C(...T);
      return z(), H;
    };
  }
  let S = M ? new Array(e.length).fill(Pr) : Pr;
  const I = (C) => {
    if (!(!(d.flags & 1) || !d.dirty && !C))
      if (t) {
        const T = d.run();
        if (C || o || O || (M ? T.some((H, X) => it(H, S[X])) : it(T, S))) {
          w && w();
          const H = Vt;
          Vt = d;
          try {
            const X = [
              T,
              // pass undefined as the old value when it's changed for the first time
              S === Pr ? void 0 : M && S[0] === Pr ? [] : S,
              y
            ];
            S = T, c ? c(t, 3, X) : (
              // @ts-expect-error
              t(...X)
            );
          } finally {
            Vt = H;
          }
        }
      } else
        d.run();
  };
  return a && a(I), d = new Kl(h), d.scheduler = i ? () => i(I, !1) : I, y = (C) => bf(C, !1, d), w = d.onStop = () => {
    const C = Nr.get(d);
    if (C) {
      if (c)
        c(C, 4);
      else
        for (const T of C) T();
      Nr.delete(d);
    }
  }, t ? r ? I(!0) : S = d.run() : i ? i(I.bind(null, !0), !0) : d.run(), z.pause = d.pause.bind(d), z.resume = d.resume.bind(d), z.stop = z, z;
}
function Tt(e, t = 1 / 0, n) {
  if (t <= 0 || !de(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ Pe(e))
    Tt(e.value, t, n);
  else if (W(e))
    for (let r = 0; r < e.length; r++)
      Tt(e[r], t, n);
  else if (Br(e) || Ft(e))
    e.forEach((r) => {
      Tt(r, t, n);
    });
  else if (kl(e)) {
    for (const r in e)
      Tt(e[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, r) && Tt(e[r], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function or(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (o) {
    ao(o, t, n);
  }
}
function Ze(e, t, n, r) {
  if (q(e)) {
    const o = or(e, t, n, r);
    return o && Pl(o) && o.catch((s) => {
      ao(s, t, n);
    }), o;
  }
  if (W(e)) {
    const o = [];
    for (let s = 0; s < e.length; s++)
      o.push(Ze(e[s], t, n, r));
    return o;
  }
}
function ao(e, t, n, r = !0) {
  const o = t ? t.vnode : null, { errorHandler: s, throwUnhandledErrorInProduction: i } = t && t.appContext.config || he;
  if (t) {
    let a = t.parent;
    const c = t.proxy, f = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; a; ) {
      const d = a.ec;
      if (d) {
        for (let h = 0; h < d.length; h++)
          if (d[h](e, c, f) === !1)
            return;
      }
      a = a.parent;
    }
    if (s) {
      _t(), or(s, null, 10, [
        e,
        c,
        f
      ]), St();
      return;
    }
  }
  Sf(e, n, o, r, i);
}
function Sf(e, t, n, r = !0, o = !1) {
  if (o)
    throw e;
  console.error(e);
}
const Fe = [];
let nt = -1;
const pn = [];
let Dt = null, fn = 0;
const na = /* @__PURE__ */ Promise.resolve();
let $r = null;
function ze(e) {
  const t = $r || na;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function xf(e) {
  let t = nt + 1, n = Fe.length;
  for (; t < n; ) {
    const r = t + n >>> 1, o = Fe[r], s = Yn(o);
    s < e || s === e && o.flags & 2 ? t = r + 1 : n = r;
  }
  return t;
}
function Bs(e) {
  if (!(e.flags & 1)) {
    const t = Yn(e), n = Fe[Fe.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Yn(n) ? Fe.push(e) : Fe.splice(xf(t), 0, e), e.flags |= 1, ra();
  }
}
function ra() {
  $r || ($r = na.then(sa));
}
function Rf(e) {
  if (!W(e))
    Dt && e.id === -1 ? Dt.splice(fn + 1, 0, e) : e.flags & 1 || (pn.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      pn.push(e[t]);
  ra();
}
function ki(e, t, n = nt + 1) {
  for (; n < Fe.length; n++) {
    const r = Fe[n];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid)
        continue;
      Fe.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function oa(e) {
  if (pn.length) {
    const t = [...new Set(pn)].sort(
      (n, r) => Yn(n) - Yn(r)
    );
    if (pn.length = 0, Dt) {
      for (let n = 0; n < t.length; n++)
        Dt.push(t[n]);
      return;
    }
    for (Dt = t, fn = 0; fn < Dt.length; fn++) {
      const n = Dt[fn];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    Dt = null, fn = 0;
  }
}
const Yn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function sa(e) {
  try {
    for (nt = 0; nt < Fe.length; nt++) {
      const t = Fe[nt];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), or(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; nt < Fe.length; nt++) {
      const t = Fe[nt];
      t && (t.flags &= -2);
    }
    nt = -1, Fe.length = 0, oa(), $r = null, (Fe.length || pn.length) && sa();
  }
}
let lt = null, ia = null;
function Wr(e) {
  const t = lt;
  return lt = e, ia = e && e.type.__scopeId || null, t;
}
function Cf(e, t = lt, n) {
  if (!t || e._n)
    return e;
  const r = (...o) => {
    r._d && $i(-1);
    const s = Wr(t), i = Wt.length;
    let a;
    try {
      a = e(...o);
    } finally {
      for (let c = Wt.length; c > i; c--) Oa();
      Wr(s), r._d && $i(1);
    }
    return a;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function zt(e, t, n, r) {
  const o = e.dirs, s = t && t.dirs;
  for (let i = 0; i < o.length; i++) {
    const a = o[i];
    s && (a.oldValue = s[i].value);
    let c = a.dir[r];
    c && (_t(), Ze(c, n, 8, [
      e.el,
      a,
      e,
      t
    ]), St());
  }
}
function If(e, t) {
  if (He) {
    let n = He.provides;
    const r = He.parent && He.parent.provides;
    r === n && (n = He.provides = Object.create(r)), n[e] = t;
  }
}
function jr(e, t, n = !1) {
  const r = Sd();
  if (r || hn) {
    let o = hn ? hn._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && q(t) ? t.call(r && r.proxy) : t;
  }
}
const Mf = /* @__PURE__ */ Symbol.for("v-scx"), Ef = () => jr(Mf);
function be(e, t, n) {
  return la(e, t, n);
}
function la(e, t, n = he) {
  const { immediate: r, deep: o, flush: s, once: i } = n, a = De({}, n), c = t && r || !t && s !== "post";
  let f;
  if (Qn) {
    if (s === "sync") {
      const y = Ef();
      f = y.__watcherHandles || (y.__watcherHandles = []);
    } else if (!c) {
      const y = () => {
      };
      return y.stop = at, y.resume = at, y.pause = at, y;
    }
  }
  const d = He;
  a.call = (y, O, M) => Ze(y, d, O, M);
  let h = !1;
  s === "post" ? a.scheduler = (y) => {
    je(y, d && d.suspense);
  } : s !== "sync" && (h = !0, a.scheduler = (y, O) => {
    O ? y() : Bs(y);
  }), a.augmentJob = (y) => {
    t && (y.flags |= 4), h && (y.flags |= 2, d && (y.id = d.uid, y.i = d));
  };
  const w = _f(e, t, a);
  return Qn && (f ? f.push(w) : c && w()), w;
}
function Af(e, t, n) {
  const r = this.proxy, o = _e(e) ? e.includes(".") ? aa(r, e) : () => r[e] : e.bind(r, r);
  let s;
  q(t) ? s = t : (s = t.handler, n = t);
  const i = sr(this), a = la(o, s.bind(r), n);
  return i(), a;
}
function aa(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++)
      r = r[n[o]];
    return r;
  };
}
const Of = /* @__PURE__ */ Symbol("_vte"), co = (e) => e.__isTeleport, Yo = /* @__PURE__ */ Symbol("_leaveCb");
function Pf(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== Rt) {
        t = n;
        break;
      }
  }
  return t;
}
function ca(e) {
  if (!$s(e))
    return co(e.type) && e.children ? Pf(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16)
      return n[0];
    if (t & 32 && q(n.default))
      return n.default();
  }
}
function Ns(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    Ns(
      co(n.type) && ca(n) || n,
      t
    );
  } else e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function ua(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Ti(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const Ur = /* @__PURE__ */ new WeakMap();
function Nn(e, t, n, r, o = !1) {
  if (W(e)) {
    e.forEach(
      (M, A) => Nn(
        M,
        t && (W(t) ? t[A] : t),
        n,
        r,
        o
      )
    );
    return;
  }
  if ($n(r) && !o) {
    r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && Nn(e, t, n, r.component.subTree);
    return;
  }
  const s = r.shapeFlag & 4 ? qs(r.component) : r.el, i = o ? null : s, { i: a, r: c } = e, f = t && t.r, d = a.refs === he ? a.refs = {} : a.refs, h = a.setupState, w = /* @__PURE__ */ ue(h), y = h === he ? Ol : (M) => Ti(d, M) ? !1 : fe(w, M), O = (M, A) => !(A && Ti(d, A));
  if (f != null && f !== c) {
    if (Fi(t), _e(f))
      d[f] = null, y(f) && (h[f] = null);
    else if (/* @__PURE__ */ Pe(f)) {
      const M = t;
      O(f, M.k) && (f.value = null), M.k && (d[M.k] = null);
    }
  }
  if (q(c))
    or(c, a, 12, [i, d]);
  else {
    const M = _e(c), A = /* @__PURE__ */ Pe(c);
    if (M || A) {
      const z = () => {
        if (e.f) {
          const S = M ? y(c) ? h[c] : d[c] : O() || !e.k ? c.value : d[e.k];
          if (o)
            W(S) && ks(S, s);
          else if (W(S))
            S.includes(s) || S.push(s);
          else if (M)
            d[c] = [s], y(c) && (h[c] = d[c]);
          else {
            const I = [s];
            O(c, e.k) && (c.value = I), e.k && (d[e.k] = I);
          }
        } else M ? (d[c] = i, y(c) && (h[c] = i)) : A && (O(c, e.k) && (c.value = i), e.k && (d[e.k] = i));
      };
      if (i) {
        const S = () => {
          z(), Ur.delete(e);
        };
        S.id = -1, Ur.set(e, S), je(S, n);
      } else
        Fi(e), z();
    }
  }
}
function Fi(e) {
  const t = Ur.get(e);
  t && (t.flags |= 8, Ur.delete(e));
}
oo().requestIdleCallback;
oo().cancelIdleCallback;
const $n = (e) => !!e.type.__asyncLoader, $s = (e) => e.type.__isKeepAlive;
function Df(e, t) {
  fa(e, "a", t);
}
function kf(e, t) {
  fa(e, "da", t);
}
function fa(e, t, n = He) {
  const r = e.__wdc || (e.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (uo(t, r, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      $s(o.parent.vnode) && Tf(r, t, n, o), o = o.parent;
  }
}
function Tf(e, t, n, r) {
  const o = uo(
    t,
    e,
    r,
    !0
    /* prepend */
  );
  da(() => {
    ks(r[t], o);
  }, n);
}
function uo(e, t, n = He, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), s = t.__weh || (t.__weh = (...i) => {
      _t();
      const a = sr(n), c = Ze(t, n, e, i);
      return a(), St(), c;
    });
    return r ? o.unshift(s) : o.push(s), s;
  }
}
const It = (e) => (t, n = He) => {
  (!Qn || e === "sp") && uo(e, (...r) => t(...r), n);
}, Ff = It("bm"), hs = It("m"), Hf = It(
  "bu"
), Lf = It("u"), ms = It(
  "bum"
), da = It("um"), jf = It(
  "sp"
), zf = It("rtg"), Kf = It("rtc");
function Vf(e, t = He) {
  uo("ec", e, t);
}
const Bf = /* @__PURE__ */ Symbol.for("v-ndc");
function Fn(e, t, n, r) {
  let o;
  const s = n, i = W(e);
  if (i || _e(e)) {
    const a = i && /* @__PURE__ */ Nt(e);
    let c = !1, f = !1;
    a && (c = !/* @__PURE__ */ Be(e), f = /* @__PURE__ */ xt(e), e = io(e)), o = new Array(e.length);
    for (let d = 0, h = e.length; d < h; d++)
      o[d] = t(
        c ? f ? vn(Ye(e[d])) : Ye(e[d]) : e[d],
        d,
        void 0,
        s
      );
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let a = 0; a < e; a++)
      o[a] = t(a + 1, a, void 0, s);
  } else if (de(e))
    if (e[Symbol.iterator])
      o = Array.from(
        e,
        (a, c) => t(a, c, void 0, s)
      );
    else {
      const a = Object.keys(e);
      o = new Array(a.length);
      for (let c = 0, f = a.length; c < f; c++) {
        const d = a[c];
        o[c] = t(e[d], d, c, s);
      }
    }
  else
    o = [];
  return o;
}
const vs = (e) => e ? Ta(e) ? qs(e) : vs(e.parent) : null, Wn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ De(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => vs(e.parent),
    $root: (e) => vs(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => pa(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Bs(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = ze.bind(e.proxy)),
    $watch: (e) => Af.bind(e)
  })
), Zo = (e, t) => e !== he && !e.__isScriptSetup && fe(e, t), Nf = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: r, data: o, props: s, accessCache: i, type: a, appContext: c } = e;
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
        if (Zo(r, t))
          return i[t] = 1, r[t];
        if (o !== he && fe(o, t))
          return i[t] = 2, o[t];
        if (fe(s, t))
          return i[t] = 3, s[t];
        if (n !== he && fe(n, t))
          return i[t] = 4, n[t];
        ws && (i[t] = 0);
      }
    }
    const f = Wn[t];
    let d, h;
    if (f)
      return t === "$attrs" && Oe(e.attrs, "get", ""), f(e);
    if (
      // css module (injected by vue-loader)
      (d = a.__cssModules) && (d = d[t])
    )
      return d;
    if (n !== he && fe(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      h = c.config.globalProperties, fe(h, t)
    )
      return h[t];
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: o, ctx: s } = e;
    return Zo(o, t) ? (o[t] = n, !0) : r !== he && fe(r, t) ? (r[t] = n, !0) : fe(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (s[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: o, props: s, type: i }
  }, a) {
    let c;
    return !!(n[a] || e !== he && a[0] !== "$" && fe(e, a) || Zo(t, a) || fe(s, a) || fe(r, a) || fe(Wn, a) || fe(o.config.globalProperties, a) || (c = i.__cssModules) && c[a]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : fe(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function Hi(e) {
  return W(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let ws = !0;
function $f(e) {
  const t = pa(e), n = e.proxy, r = e.ctx;
  ws = !1, t.beforeCreate && Li(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: s,
    methods: i,
    watch: a,
    provide: c,
    inject: f,
    // lifecycle
    created: d,
    beforeMount: h,
    mounted: w,
    beforeUpdate: y,
    updated: O,
    activated: M,
    deactivated: A,
    beforeDestroy: z,
    beforeUnmount: S,
    destroyed: I,
    unmounted: C,
    render: T,
    renderTracked: H,
    renderTriggered: X,
    errorCaptured: B,
    serverPrefetch: j,
    // public API
    expose: Z,
    inheritAttrs: re,
    // assets
    components: le,
    directives: ve,
    filters: we
  } = t;
  if (f && Wf(f, r, null), i)
    for (const J in i) {
      const Y = i[J];
      q(Y) && (r[J] = Y.bind(n));
    }
  if (o) {
    const J = o.call(n, n);
    de(J) && (e.data = /* @__PURE__ */ lo(J));
  }
  if (ws = !0, s)
    for (const J in s) {
      const Y = s[J], $e = q(Y) ? Y.bind(n, n) : q(Y.get) ? Y.get.bind(n, n) : at, en = !q(Y) && q(Y.set) ? Y.set.bind(n) : at, dt = $({
        get: $e,
        set: en
      });
      Object.defineProperty(r, J, {
        enumerable: !0,
        configurable: !0,
        get: () => dt.value,
        set: (te) => dt.value = te
      });
    }
  if (a)
    for (const J in a)
      ga(a[J], r, n, J);
  if (c) {
    const J = q(c) ? c.call(n) : c;
    Reflect.ownKeys(J).forEach((Y) => {
      If(Y, J[Y]);
    });
  }
  d && Li(d, e, "c");
  function ae(J, Y) {
    W(Y) ? Y.forEach(($e) => J($e.bind(n))) : Y && J(Y.bind(n));
  }
  if (ae(Ff, h), ae(hs, w), ae(Hf, y), ae(Lf, O), ae(Df, M), ae(kf, A), ae(Vf, B), ae(Kf, H), ae(zf, X), ae(ms, S), ae(da, C), ae(jf, j), W(Z))
    if (Z.length) {
      const J = e.exposed || (e.exposed = {});
      Z.forEach((Y) => {
        Object.defineProperty(J, Y, {
          get: () => n[Y],
          set: ($e) => n[Y] = $e,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  T && e.render === at && (e.render = T), re != null && (e.inheritAttrs = re), le && (e.components = le), ve && (e.directives = ve), j && ua(e);
}
function Wf(e, t, n = at) {
  W(e) && (e = ys(e));
  for (const r in e) {
    const o = e[r];
    let s;
    de(o) ? "default" in o ? s = jr(
      o.from || r,
      o.default,
      !0
    ) : s = jr(o.from || r) : s = jr(o), /* @__PURE__ */ Pe(s) ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (i) => s.value = i
    }) : t[r] = s;
  }
}
function Li(e, t, n) {
  Ze(
    W(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function ga(e, t, n, r) {
  let o = r.includes(".") ? aa(n, r) : () => n[r];
  if (_e(e)) {
    const s = t[e];
    q(s) && be(o, s);
  } else if (q(e))
    be(o, e.bind(n));
  else if (de(e))
    if (W(e))
      e.forEach((s) => ga(s, t, n, r));
    else {
      const s = q(e.handler) ? e.handler.bind(n) : t[e.handler];
      q(s) && be(o, s, e);
    }
}
function pa(e) {
  const t = e.type, { mixins: n, extends: r } = t, {
    mixins: o,
    optionsCache: s,
    config: { optionMergeStrategies: i }
  } = e.appContext, a = s.get(t);
  let c;
  return a ? c = a : !o.length && !n && !r ? c = t : (c = {}, o.length && o.forEach(
    (f) => qr(c, f, i, !0)
  ), qr(c, t, i)), de(t) && s.set(t, c), c;
}
function qr(e, t, n, r = !1) {
  const { mixins: o, extends: s } = t;
  s && qr(e, s, n, !0), o && o.forEach(
    (i) => qr(e, i, n, !0)
  );
  for (const i in t)
    if (!(r && i === "expose")) {
      const a = Uf[i] || n && n[i];
      e[i] = a ? a(e[i], t[i]) : t[i];
    }
  return e;
}
const Uf = {
  data: ji,
  props: zi,
  emits: zi,
  // objects
  methods: jn,
  computed: jn,
  // lifecycle
  beforeCreate: Te,
  created: Te,
  beforeMount: Te,
  mounted: Te,
  beforeUpdate: Te,
  updated: Te,
  beforeDestroy: Te,
  beforeUnmount: Te,
  destroyed: Te,
  unmounted: Te,
  activated: Te,
  deactivated: Te,
  errorCaptured: Te,
  serverPrefetch: Te,
  // assets
  components: jn,
  directives: jn,
  // watch
  watch: Gf,
  // provide / inject
  provide: ji,
  inject: qf
};
function ji(e, t) {
  return t ? e ? function() {
    return De(
      q(e) ? e.call(this, this) : e,
      q(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function qf(e, t) {
  return jn(ys(e), ys(t));
}
function ys(e) {
  if (W(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Te(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function jn(e, t) {
  return e ? De(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function zi(e, t) {
  return e ? W(e) && W(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : De(
    /* @__PURE__ */ Object.create(null),
    Hi(e),
    Hi(t ?? {})
  ) : t;
}
function Gf(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = De(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = Te(e[r], t[r]);
  return n;
}
function ha() {
  return {
    app: null,
    config: {
      isNativeTag: Ol,
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
let Xf = 0;
function Yf(e, t) {
  return function(r, o = null) {
    q(r) || (r = De({}, r)), o != null && !de(o) && (o = null);
    const s = ha(), i = /* @__PURE__ */ new WeakSet(), a = [];
    let c = !1;
    const f = s.app = {
      _uid: Xf++,
      _component: r,
      _props: o,
      _container: null,
      _context: s,
      _instance: null,
      version: Ed,
      get config() {
        return s.config;
      },
      set config(d) {
      },
      use(d, ...h) {
        return i.has(d) || (d && q(d.install) ? (i.add(d), d.install(f, ...h)) : q(d) && (i.add(d), d(f, ...h))), f;
      },
      mixin(d) {
        return s.mixins.includes(d) || s.mixins.push(d), f;
      },
      component(d, h) {
        return h ? (s.components[d] = h, f) : s.components[d];
      },
      directive(d, h) {
        return h ? (s.directives[d] = h, f) : s.directives[d];
      },
      mount(d, h, w) {
        if (!c) {
          const y = f._ceVNode || bt(r, o);
          return y.appContext = s, w === !0 ? w = "svg" : w === !1 && (w = void 0), e(y, d, w), c = !0, f._container = d, d.__vue_app__ = f, qs(y.component);
        }
      },
      onUnmount(d) {
        a.push(d);
      },
      unmount() {
        c && (Ze(
          a,
          f._instance,
          16
        ), e(null, f._container), delete f._container.__vue_app__);
      },
      provide(d, h) {
        return s.provides[d] = h, f;
      },
      runWithContext(d) {
        const h = hn;
        hn = f;
        try {
          return d();
        } finally {
          hn = h;
        }
      }
    };
    return f;
  };
}
let hn = null;
const Zf = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Ge(t)}Modifiers`] || e[`${Xt(t)}Modifiers`];
function Jf(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || he;
  let o = n;
  const s = t.startsWith("update:"), i = s && Zf(r, t.slice(7));
  i && (i.trim && (o = n.map((d) => _e(d) ? d.trim() : d)), i.number && (o = o.map(zu)));
  let a, c = r[a = $o(t)] || // also try camelCase event handler (#2249)
  r[a = $o(Ge(t))];
  !c && s && (c = r[a = $o(Xt(t))]), c && Ze(
    c,
    e,
    6,
    o
  );
  const f = r[a + "Once"];
  if (f) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[a])
      return;
    e.emitted[a] = !0, Ze(
      f,
      e,
      6,
      o
    );
  }
}
const Qf = /* @__PURE__ */ new WeakMap();
function ma(e, t, n = !1) {
  const r = n ? Qf : t.emitsCache, o = r.get(e);
  if (o !== void 0)
    return o;
  const s = e.emits;
  let i = {}, a = !1;
  if (!q(e)) {
    const c = (f) => {
      const d = ma(f, t, !0);
      d && (a = !0, De(i, d));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !s && !a ? (de(e) && r.set(e, null), null) : (W(s) ? s.forEach((c) => i[c] = null) : De(i, s), de(e) && r.set(e, i), i);
}
function fo(e, t) {
  return !e || !to(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), fe(e, t[0].toLowerCase() + t.slice(1)) || fe(e, Xt(t)) || fe(e, t));
}
function Ki(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: o,
    propsOptions: [s],
    slots: i,
    attrs: a,
    emit: c,
    render: f,
    renderCache: d,
    props: h,
    data: w,
    setupState: y,
    ctx: O,
    inheritAttrs: M
  } = e, A = Wr(e);
  let z, S;
  try {
    if (n.shapeFlag & 4) {
      const C = o || r, T = C;
      z = st(
        f.call(
          T,
          C,
          d,
          h,
          y,
          w,
          O
        )
      ), S = a;
    } else {
      const C = t;
      z = st(
        C.length > 1 ? C(
          h,
          { attrs: a, slots: i, emit: c }
        ) : C(
          h,
          null
        )
      ), S = t.props ? a : ed(a);
    }
  } catch (C) {
    Wt.length = 0, ao(C, e, 1), z = bt(Rt);
  }
  let I = z;
  if (S && M !== !1) {
    const C = Object.keys(S), { shapeFlag: T } = I;
    C.length && T & 7 && (s && C.some(no) && (S = td(
      S,
      s
    )), I = wn(I, S, !1, !0));
  }
  if (n.dirs && (I = wn(I, null, !1, !0), I.dirs = I.dirs ? I.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const C = co(I.type) && ca(I) || I;
    Ns(C, n.transition);
  }
  return z = I, Wr(A), z;
}
const ed = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || to(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, td = (e, t) => {
  const n = {};
  for (const r in e)
    (!no(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
  return n;
};
function nd(e, t, n) {
  const { props: r, children: o, component: s } = e, { props: i, children: a, patchFlag: c } = t, f = s.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return r ? Vi(r, i, f) : !!i;
    if (c & 8) {
      const d = t.dynamicProps;
      for (let h = 0; h < d.length; h++) {
        const w = d[h];
        if (va(i, r, w) && !fo(f, w))
          return !0;
      }
    }
  } else
    return (o || a) && (!a || !a.$stable) ? !0 : r === i ? !1 : r ? i ? Vi(r, i, f) : !0 : !!i;
  return !1;
}
function Vi(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < r.length; o++) {
    const s = r[o];
    if (va(t, e, s) && !fo(n, s))
      return !0;
  }
  return !1;
}
function va(e, t, n) {
  const r = e[n], o = t[n];
  return n === "style" && de(r) && de(o) ? !so(r, o) : r !== o;
}
function rd({ vnode: e, parent: t, suspense: n }, r) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.suspense.vnode.el = o.el = r, e = o), o === e)
      (e = t.vnode).el = r, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = r);
}
const wa = {}, ya = () => Object.create(wa), ba = (e) => Object.getPrototypeOf(e) === wa;
function od(e, t, n, r = !1) {
  const o = {}, s = ya();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), _a(e, t, o, s);
  for (const i in e.propsOptions[0])
    i in o || (o[i] = void 0);
  n ? e.props = r ? o : /* @__PURE__ */ gf(o) : e.type.props ? e.props = o : e.props = s, e.attrs = s;
}
function sd(e, t, n, r) {
  const {
    props: o,
    attrs: s,
    vnode: { patchFlag: i }
  } = e, a = /* @__PURE__ */ ue(o), [c] = e.propsOptions;
  let f = !1;
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
        if (fo(e.emitsOptions, w))
          continue;
        const y = t[w];
        if (c)
          if (fe(s, w))
            y !== s[w] && (s[w] = y, f = !0);
          else {
            const O = Ge(w);
            o[O] = bs(
              c,
              a,
              O,
              y,
              e,
              !1
            );
          }
        else
          y !== s[w] && (s[w] = y, f = !0);
      }
    }
  } else {
    _a(e, t, o, s) && (f = !0);
    let d;
    for (const h in a)
      (!t || // for camelCase
      !fe(t, h) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((d = Xt(h)) === h || !fe(t, d))) && (c ? n && // for camelCase
      (n[h] !== void 0 || // for kebab-case
      n[d] !== void 0) && (o[h] = bs(
        c,
        a,
        h,
        void 0,
        e,
        !0
      )) : delete o[h]);
    if (s !== a)
      for (const h in s)
        (!t || !fe(t, h)) && (delete s[h], f = !0);
  }
  f && yt(e.attrs, "set", "");
}
function _a(e, t, n, r) {
  const [o, s] = e.propsOptions;
  let i = !1, a;
  if (t)
    for (let c in t) {
      if (Kn(c))
        continue;
      const f = t[c];
      let d;
      o && fe(o, d = Ge(c)) ? !s || !s.includes(d) ? n[d] = f : (a || (a = {}))[d] = f : fo(e.emitsOptions, c) || (!(c in r) || f !== r[c]) && (r[c] = f, i = !0);
    }
  if (s) {
    const c = /* @__PURE__ */ ue(n), f = a || he;
    for (let d = 0; d < s.length; d++) {
      const h = s[d];
      n[h] = bs(
        o,
        c,
        h,
        f[h],
        e,
        !fe(f, h)
      );
    }
  }
  return i;
}
function bs(e, t, n, r, o, s) {
  const i = e[n];
  if (i != null) {
    const a = fe(i, "default");
    if (a && r === void 0) {
      const c = i.default;
      if (i.type !== Function && !i.skipFactory && q(c)) {
        const { propsDefaults: f } = o;
        if (n in f)
          r = f[n];
        else {
          const d = sr(o);
          r = f[n] = c.call(
            null,
            t
          ), d();
        }
      } else
        r = c;
      o.ce && o.ce._setProp(n, r);
    }
    i[
      0
      /* shouldCast */
    ] && (s && !a ? r = !1 : i[
      1
      /* shouldCastTrue */
    ] && (r === "" || r === Xt(n)) && (r = !0));
  }
  return r;
}
const id = /* @__PURE__ */ new WeakMap();
function Sa(e, t, n = !1) {
  const r = n ? id : t.propsCache, o = r.get(e);
  if (o)
    return o;
  const s = e.props, i = {}, a = [];
  let c = !1;
  if (!q(e)) {
    const d = (h) => {
      c = !0;
      const [w, y] = Sa(h, t, !0);
      De(i, w), y && a.push(...y);
    };
    !n && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  if (!s && !c)
    return de(e) && r.set(e, gn), gn;
  if (W(s))
    for (let d = 0; d < s.length; d++) {
      const h = Ge(s[d]);
      Bi(h) && (i[h] = he);
    }
  else if (s)
    for (const d in s) {
      const h = Ge(d);
      if (Bi(h)) {
        const w = s[d], y = i[h] = W(w) || q(w) ? { type: w } : De({}, w), O = y.type;
        let M = !1, A = !0;
        if (W(O))
          for (let z = 0; z < O.length; ++z) {
            const S = O[z], I = q(S) && S.name;
            if (I === "Boolean") {
              M = !0;
              break;
            } else I === "String" && (A = !1);
          }
        else
          M = q(O) && O.name === "Boolean";
        y[
          0
          /* shouldCast */
        ] = M, y[
          1
          /* shouldCastTrue */
        ] = A, (M || fe(y, "default")) && a.push(h);
      }
    }
  const f = [i, a];
  return de(e) && r.set(e, f), f;
}
function Bi(e) {
  return e[0] !== "$" && !Kn(e);
}
const Ws = (e) => e === "_" || e === "_ctx" || e === "$stable", Us = (e) => W(e) ? e.map(st) : [st(e)], ld = (e, t, n) => {
  if (t._n)
    return t;
  const r = Cf((...o) => Us(t(...o)), n);
  return r._c = !1, r;
}, xa = (e, t, n) => {
  const r = e._ctx;
  for (const o in e) {
    if (Ws(o)) continue;
    const s = e[o];
    if (q(s))
      t[o] = ld(o, s, r);
    else if (s != null) {
      const i = Us(s);
      t[o] = () => i;
    }
  }
}, Ra = (e, t) => {
  const n = Us(t);
  e.slots.default = () => n;
}, Ca = (e, t, n) => {
  for (const r in t)
    (n || !Ws(r)) && (e[r] = t[r]);
}, ad = (e, t, n) => {
  const r = e.slots = ya();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (Ca(r, t, n), n && Fl(r, "_", o, !0)) : xa(t, r);
  } else t && Ra(e, t);
}, cd = (e, t, n) => {
  const { vnode: r, slots: o } = e;
  let s = !0, i = he;
  if (r.shapeFlag & 32) {
    const a = t._;
    a ? n && a === 1 ? s = !1 : Ca(o, t, n) : (s = !t.$stable, xa(t, o)), i = t;
  } else t && (Ra(e, t), i = { default: 1 });
  if (s)
    for (const a in o)
      !Ws(a) && i[a] == null && delete o[a];
}, je = pd;
function ud(e) {
  return fd(e);
}
function fd(e, t) {
  const n = oo();
  n.__VUE__ = !0;
  const {
    insert: r,
    remove: o,
    patchProp: s,
    createElement: i,
    createText: a,
    createComment: c,
    setText: f,
    setElementText: d,
    parentNode: h,
    nextSibling: w,
    setScopeId: y = at,
    insertStaticContent: O
  } = e, M = (p, m, b, E = null, R = null, _ = null, F = void 0, k = null, P = !!m.dynamicChildren) => {
    if (p === m)
      return;
    p && !Hn(p, m) && (E = tn(p), te(p, R, _, !0), p = null), m.patchFlag === -2 && (P = !1, m.dynamicChildren = null);
    const { type: x, ref: K, shapeFlag: L } = m;
    switch (x) {
      case go:
        A(p, m, b, E);
        break;
      case Rt:
        z(p, m, b, E);
        break;
      case Qo:
        p == null && S(m, b, E, F);
        break;
      case Ie:
        le(
          p,
          m,
          b,
          E,
          R,
          _,
          F,
          k,
          P
        );
        break;
      default:
        L & 1 ? T(
          p,
          m,
          b,
          E,
          R,
          _,
          F,
          k,
          P
        ) : L & 6 ? ve(
          p,
          m,
          b,
          E,
          R,
          _,
          F,
          k,
          P
        ) : (L & 64 || L & 128) && x.process(
          p,
          m,
          b,
          E,
          R,
          _,
          F,
          k,
          P,
          Qe
        );
    }
    K != null && R ? Nn(K, p && p.ref, _, m || p, !m) : K == null && p && p.ref != null && Nn(p.ref, null, _, p, !0);
  }, A = (p, m, b, E) => {
    if (p == null)
      r(
        m.el = a(m.children),
        b,
        E
      );
    else {
      const R = m.el = p.el;
      m.children !== p.children && f(R, m.children);
    }
  }, z = (p, m, b, E) => {
    p == null ? r(
      m.el = c(m.children || ""),
      b,
      E
    ) : m.el = p.el;
  }, S = (p, m, b, E) => {
    [p.el, p.anchor] = O(
      p.children,
      m,
      b,
      E,
      p.el,
      p.anchor
    );
  }, I = ({ el: p, anchor: m }, b, E) => {
    let R;
    for (; p && p !== m; )
      R = w(p), r(p, b, E), p = R;
    r(m, b, E);
  }, C = ({ el: p, anchor: m }) => {
    let b;
    for (; p && p !== m; )
      b = w(p), o(p), p = b;
    o(m);
  }, T = (p, m, b, E, R, _, F, k, P) => {
    if (m.type === "svg" ? F = "svg" : m.type === "math" && (F = "mathml"), p == null)
      H(
        m,
        b,
        E,
        R,
        _,
        F,
        k,
        P
      );
    else {
      const x = p.el && p.el._isVueCE ? p.el : null;
      try {
        x && x._beginPatch(), j(
          p,
          m,
          R,
          _,
          F,
          k,
          P
        );
      } finally {
        x && x._endPatch();
      }
    }
  }, H = (p, m, b, E, R, _, F, k) => {
    let P, x;
    const { props: K, shapeFlag: L, transition: V, dirs: N } = p;
    if (P = p.el = i(
      p.type,
      _,
      K && K.is,
      K
    ), L & 8 ? d(P, p.children) : L & 16 && B(
      p.children,
      P,
      null,
      E,
      R,
      Jo(p, _),
      F,
      k
    ), N && zt(p, null, E, "created"), X(P, p, p.scopeId, F, E), K) {
      for (const ce in K)
        ce !== "value" && !Kn(ce) && s(P, ce, null, K[ce], _, E);
      "value" in K && s(P, "value", null, K.value, _), (x = K.onVnodeBeforeMount) && tt(x, E, p);
    }
    N && zt(p, null, E, "beforeMount");
    const Q = dd(R, V);
    Q && V.beforeEnter(P), r(P, m, b), ((x = K && K.onVnodeMounted) || Q || N) && je(() => {
      try {
        x && tt(x, E, p), Q && V.enter(P), N && zt(p, null, E, "mounted");
      } finally {
      }
    }, R);
  }, X = (p, m, b, E, R) => {
    if (b && y(p, b), E)
      for (let _ = 0; _ < E.length; _++)
        y(p, E[_]);
    if (R) {
      let _ = R.subTree;
      if (m === _ || Aa(_.type) && (_.ssContent === m || _.ssFallback === m)) {
        const F = R.vnode;
        X(
          p,
          F,
          F.scopeId,
          F.slotScopeIds,
          R.parent
        );
      }
    }
  }, B = (p, m, b, E, R, _, F, k, P = 0) => {
    for (let x = P; x < p.length; x++) {
      const K = p[x] = k ? wt(p[x]) : st(p[x]);
      M(
        null,
        K,
        m,
        b,
        E,
        R,
        _,
        F,
        k
      );
    }
  }, j = (p, m, b, E, R, _, F) => {
    const k = m.el = p.el;
    let { patchFlag: P, dynamicChildren: x, dirs: K } = m;
    P |= p.patchFlag & 16;
    const L = p.props || he, V = m.props || he;
    let N;
    if (b && Kt(b, !1), (N = V.onVnodeBeforeUpdate) && tt(N, b, m, p), K && zt(m, p, b, "beforeUpdate"), b && Kt(b, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    x && (!p.dynamicChildren || p.dynamicChildren.length !== x.length) && (P = 0, F = !1, x = null), (L.innerHTML && V.innerHTML == null || L.textContent && V.textContent == null) && d(k, ""), x ? Z(
      p.dynamicChildren,
      x,
      k,
      b,
      E,
      Jo(m, R),
      _
    ) : F || Y(
      p,
      m,
      k,
      null,
      b,
      E,
      Jo(m, R),
      _,
      !1
    ), P > 0) {
      if (P & 16)
        re(k, L, V, b, R);
      else if (P & 2 && L.class !== V.class && s(k, "class", null, V.class, R), P & 4 && s(k, "style", L.style, V.style, R), P & 8) {
        const Q = m.dynamicProps;
        for (let ce = 0; ce < Q.length; ce++) {
          const ie = Q[ce], ye = L[ie], Se = V[ie];
          (Se !== ye || ie === "value") && s(k, ie, ye, Se, R, b);
        }
      }
      P & 1 && p.children !== m.children && d(k, m.children);
    } else !F && x == null && re(k, L, V, b, R);
    ((N = V.onVnodeUpdated) || K) && je(() => {
      N && tt(N, b, m, p), K && zt(m, p, b, "updated");
    }, E);
  }, Z = (p, m, b, E, R, _, F) => {
    for (let k = 0; k < m.length; k++) {
      const P = p[k], x = m[k], K = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        P.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (P.type === Ie || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Hn(P, x) || // - In the case of a component, it could contain anything.
        P.shapeFlag & 198) ? h(P.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          b
        )
      );
      M(
        P,
        x,
        K,
        null,
        E,
        R,
        _,
        F,
        !0
      );
    }
  }, re = (p, m, b, E, R) => {
    if (m !== b) {
      if (m !== he)
        for (const _ in m)
          !Kn(_) && !(_ in b) && s(
            p,
            _,
            m[_],
            null,
            R,
            E
          );
      for (const _ in b) {
        if (Kn(_)) continue;
        const F = b[_], k = m[_];
        F !== k && _ !== "value" && s(p, _, k, F, R, E);
      }
      "value" in b && s(p, "value", m.value, b.value, R);
    }
  }, le = (p, m, b, E, R, _, F, k, P) => {
    const x = m.el = p ? p.el : a(""), K = m.anchor = p ? p.anchor : a("");
    let { patchFlag: L, dynamicChildren: V, slotScopeIds: N } = m;
    N && (k = k ? k.concat(N) : N), p == null ? (r(x, b, E), r(K, b, E), B(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      m.children || [],
      b,
      K,
      R,
      _,
      F,
      k,
      P
    )) : L > 0 && L & 64 && V && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    p.dynamicChildren && p.dynamicChildren.length === V.length ? (Z(
      p.dynamicChildren,
      V,
      b,
      R,
      _,
      F,
      k
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (m.key != null || R && m === R.subTree) && Ia(
      p,
      m,
      !0
      /* shallow */
    )) : Y(
      p,
      m,
      b,
      K,
      R,
      _,
      F,
      k,
      P
    );
  }, ve = (p, m, b, E, R, _, F, k, P) => {
    m.slotScopeIds = k, p == null ? m.shapeFlag & 512 ? R.ctx.activate(
      m,
      b,
      E,
      F,
      P
    ) : we(
      m,
      b,
      E,
      R,
      _,
      F,
      P
    ) : se(p, m, P);
  }, we = (p, m, b, E, R, _, F) => {
    const k = p.component = _d(
      p,
      E,
      R
    );
    if ($s(p) && (k.ctx.renderer = Qe), xd(k, !1, F), k.asyncDep) {
      if (R && R.registerDep(k, ae, F), !p.el) {
        const P = k.subTree = bt(Rt);
        z(null, P, m, b), p.placeholder = P.el;
      }
    } else
      ae(
        k,
        p,
        m,
        b,
        R,
        _,
        F
      );
  }, se = (p, m, b) => {
    const E = m.component = p.component;
    if (nd(p, m, b))
      if (E.asyncDep && !E.asyncResolved) {
        J(E, m, b);
        return;
      } else
        E.next = m, E.update();
    else
      m.el = p.el, E.vnode = m;
  }, ae = (p, m, b, E, R, _, F) => {
    const k = () => {
      if (p.isMounted) {
        let { next: L, bu: V, u: N, parent: Q, vnode: ce } = p;
        {
          const Ee = Ma(p);
          if (Ee) {
            L && (L.el = ce.el, J(p, L, F)), Ee.asyncDep.then(() => {
              je(() => {
                p.isUnmounted || x();
              }, R);
            });
            return;
          }
        }
        let ie = L, ye;
        Kt(p, !1), L ? (L.el = ce.el, J(p, L, F)) : L = ce, V && Wo(V), (ye = L.props && L.props.onVnodeBeforeUpdate) && tt(ye, Q, L, ce), Kt(p, !0);
        const Se = Ki(p), Me = p.subTree;
        p.subTree = Se, M(
          Me,
          Se,
          // parent may have changed if it's in a teleport
          h(Me.el),
          // anchor may have changed if it's in a fragment
          tn(Me),
          p,
          R,
          _
        ), L.el = Se.el, ie === null && rd(p, Se.el), N && je(N, R), (ye = L.props && L.props.onVnodeUpdated) && je(
          () => tt(ye, Q, L, ce),
          R
        );
      } else {
        let L;
        const { el: V, props: N } = m, { bm: Q, m: ce, parent: ie, root: ye, type: Se } = p, Me = $n(m);
        Kt(p, !1), Q && Wo(Q), !Me && (L = N && N.onVnodeBeforeMount) && tt(L, ie, m), Kt(p, !0);
        {
          ye.ce && ye.ce._hasShadowRoot() && ye.ce._injectChildStyle(
            Se,
            p.parent ? p.parent.type : void 0
          );
          const Ee = p.subTree = Ki(p);
          M(
            null,
            Ee,
            b,
            E,
            p,
            R,
            _
          ), m.el = Ee.el;
        }
        if (ce && je(ce, R), !Me && (L = N && N.onVnodeMounted)) {
          const Ee = m;
          je(
            () => tt(L, ie, Ee),
            R
          );
        }
        (m.shapeFlag & 256 || ie && $n(ie.vnode) && ie.vnode.shapeFlag & 256) && p.a && je(p.a, R), p.isMounted = !0, m = b = E = null;
      }
    };
    p.scope.on();
    const P = p.effect = new Kl(k);
    p.scope.off();
    const x = p.update = P.run.bind(P), K = p.job = P.runIfDirty.bind(P);
    K.i = p, K.id = p.uid, P.scheduler = () => Bs(K), Kt(p, !0), x();
  }, J = (p, m, b) => {
    m.component = p;
    const E = p.vnode.props;
    p.vnode = m, p.next = null, sd(p, m.props, E, b), cd(p, m.children, b), _t(), ki(p), St();
  }, Y = (p, m, b, E, R, _, F, k, P = !1) => {
    const x = p && p.children, K = p ? p.shapeFlag : 0, L = m.children, { patchFlag: V, shapeFlag: N } = m;
    if (V > 0) {
      if (V & 128) {
        en(
          x,
          L,
          b,
          E,
          R,
          _,
          F,
          k,
          P
        );
        return;
      } else if (V & 256) {
        $e(
          x,
          L,
          b,
          E,
          R,
          _,
          F,
          k,
          P
        );
        return;
      }
    }
    N & 8 ? (K & 16 && Ht(x, R, _), L !== x && d(b, L)) : K & 16 ? N & 16 ? en(
      x,
      L,
      b,
      E,
      R,
      _,
      F,
      k,
      P
    ) : Ht(x, R, _, !0) : (K & 8 && d(b, ""), N & 16 && B(
      L,
      b,
      E,
      R,
      _,
      F,
      k,
      P
    ));
  }, $e = (p, m, b, E, R, _, F, k, P) => {
    p = p || gn, m = m || gn;
    const x = p.length, K = m.length, L = Math.min(x, K);
    let V;
    for (V = 0; V < L; V++) {
      const N = m[V] = P ? wt(m[V]) : st(m[V]);
      M(
        p[V],
        N,
        b,
        null,
        R,
        _,
        F,
        k,
        P
      );
    }
    x > K ? Ht(
      p,
      R,
      _,
      !0,
      !1,
      L
    ) : B(
      m,
      b,
      E,
      R,
      _,
      F,
      k,
      P,
      L
    );
  }, en = (p, m, b, E, R, _, F, k, P) => {
    let x = 0;
    const K = m.length;
    let L = p.length - 1, V = K - 1;
    for (; x <= L && x <= V; ) {
      const N = p[x], Q = m[x] = P ? wt(m[x]) : st(m[x]);
      if (Hn(N, Q))
        M(
          N,
          Q,
          b,
          null,
          R,
          _,
          F,
          k,
          P
        );
      else
        break;
      x++;
    }
    for (; x <= L && x <= V; ) {
      const N = p[L], Q = m[V] = P ? wt(m[V]) : st(m[V]);
      if (Hn(N, Q))
        M(
          N,
          Q,
          b,
          null,
          R,
          _,
          F,
          k,
          P
        );
      else
        break;
      L--, V--;
    }
    if (x > L) {
      if (x <= V) {
        const N = V + 1, Q = N < K ? m[N].el : E;
        for (; x <= V; )
          M(
            null,
            m[x] = P ? wt(m[x]) : st(m[x]),
            b,
            Q,
            R,
            _,
            F,
            k,
            P
          ), x++;
      }
    } else if (x > V)
      for (; x <= L; )
        te(p[x], R, _, !0), x++;
    else {
      const N = x, Q = x, ce = /* @__PURE__ */ new Map();
      for (x = Q; x <= V; x++) {
        const ke = m[x] = P ? wt(m[x]) : st(m[x]);
        ke.key != null && ce.set(ke.key, x);
      }
      let ie, ye = 0;
      const Se = V - Q + 1;
      let Me = !1, Ee = 0;
      const Lt = new Array(Se);
      for (x = 0; x < Se; x++) Lt[x] = 0;
      for (x = N; x <= L; x++) {
        const ke = p[x];
        if (ye >= Se) {
          te(ke, R, _, !0);
          continue;
        }
        let Ce;
        if (ke.key != null)
          Ce = ce.get(ke.key);
        else
          for (ie = Q; ie <= V; ie++)
            if (Lt[ie - Q] === 0 && Hn(ke, m[ie])) {
              Ce = ie;
              break;
            }
        Ce === void 0 ? te(ke, R, _, !0) : (Lt[Ce - Q] = x + 1, Ce >= Ee ? Ee = Ce : Me = !0, M(
          ke,
          m[Ce],
          b,
          null,
          R,
          _,
          F,
          k,
          P
        ), ye++);
      }
      const nn = Me ? gd(Lt) : gn;
      for (ie = nn.length - 1, x = Se - 1; x >= 0; x--) {
        const ke = Q + x, Ce = m[ke], gt = m[ke + 1], et = ke + 1 < K ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          gt.el || Ea(gt)
        ) : E;
        Lt[x] === 0 ? M(
          null,
          Ce,
          b,
          et,
          R,
          _,
          F,
          k,
          P
        ) : Me && (ie < 0 || x !== nn[ie] ? dt(Ce, b, et, 2) : ie--);
      }
    }
  }, dt = (p, m, b, E, R = null) => {
    const { el: _, type: F, transition: k, children: P, shapeFlag: x } = p;
    if (x & 6) {
      dt(p.component.subTree, m, b, E);
      return;
    }
    if (x & 128) {
      p.suspense.move(m, b, E);
      return;
    }
    if (x & 64) {
      F.move(p, m, b, Qe);
      return;
    }
    if (F === Ie) {
      r(_, m, b);
      for (let L = 0; L < P.length; L++)
        dt(P[L], m, b, E);
      r(p.anchor, m, b);
      return;
    }
    if (F === Qo) {
      I(p, m, b);
      return;
    }
    if (E !== 2 && x & 1 && k)
      if (E === 0)
        k.persisted && !_[Yo] ? r(_, m, b) : (k.beforeEnter(_), r(_, m, b), je(() => k.enter(_), R));
      else {
        const { leave: L, delayLeave: V, afterLeave: N } = k, Q = () => {
          p.ctx.isUnmounted ? o(_) : r(_, m, b);
        }, ce = () => {
          const ie = _._isLeaving || !!_[Yo];
          _._isLeaving && _[Yo](
            !0
            /* cancelled */
          ), k.persisted && !ie ? Q() : L(_, () => {
            Q(), N && N();
          });
        };
        V ? V(_, Q, ce) : ce();
      }
    else
      r(_, m, b);
  }, te = (p, m, b, E = !1, R = !1) => {
    const {
      type: _,
      props: F,
      ref: k,
      children: P,
      dynamicChildren: x,
      shapeFlag: K,
      patchFlag: L,
      dirs: V,
      cacheIndex: N,
      memo: Q
    } = p;
    if (L === -2 && (R = !1), k != null && (_t(), Nn(k, null, b, p, !0), St()), N != null && (m.renderCache[N] = void 0), K & 256) {
      m.ctx.deactivate(p);
      return;
    }
    const ce = K & 1 && V, ie = !$n(p);
    let ye;
    if (ie && (ye = F && F.onVnodeBeforeUnmount) && tt(ye, m, p), K & 6)
      Co(p.component, b, E);
    else {
      if (K & 128) {
        p.suspense.unmount(b, E);
        return;
      }
      ce && zt(p, null, m, "beforeUnmount"), K & 64 ? p.type.remove(
        p,
        m,
        b,
        Qe,
        E
      ) : x && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !x.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (_ !== Ie || L > 0 && L & 64) ? Ht(
        x,
        m,
        b,
        !1,
        !0
      ) : (_ === Ie && L & 384 || !R && K & 16) && Ht(P, m, b), E && We(p);
    }
    const Se = Q != null && N == null;
    (ie && (ye = F && F.onVnodeUnmounted) || ce || Se) && je(() => {
      ye && tt(ye, m, p), ce && zt(p, null, m, "unmounted"), Se && (p.el = null);
    }, b);
  }, We = (p) => {
    const { type: m, el: b, anchor: E, transition: R } = p;
    if (m === Ie) {
      _n(b, E);
      return;
    }
    if (m === Qo) {
      C(p);
      return;
    }
    const _ = () => {
      o(b), R && !R.persisted && R.afterLeave && R.afterLeave();
    };
    if (p.shapeFlag & 1 && R && !R.persisted) {
      const { leave: F, delayLeave: k } = R, P = () => F(b, _);
      k ? k(p.el, _, P) : P();
    } else
      _();
  }, _n = (p, m) => {
    let b;
    for (; p !== m; )
      b = w(p), o(p), p = b;
    o(m);
  }, Co = (p, m, b) => {
    const { bum: E, scope: R, job: _, subTree: F, um: k, m: P, a: x } = p;
    Ni(P), Ni(x), E && Wo(E), R.stop(), _ && (_.flags |= 8, te(F, p, m, b)), k && je(k, m), je(() => {
      p.isUnmounted = !0;
    }, m);
  }, Ht = (p, m, b, E = !1, R = !1, _ = 0) => {
    for (let F = _; F < p.length; F++)
      te(p[F], m, b, E, R);
  }, tn = (p) => {
    if (p.shapeFlag & 6)
      return tn(p.component.subTree);
    if (p.shapeFlag & 128)
      return p.suspense.next();
    const m = w(p.anchor || p.el), b = m && m[Of];
    return b ? w(b) : m;
  };
  let Sn = !1;
  const Mt = (p, m, b) => {
    let E;
    p == null ? m._vnode && (te(m._vnode, null, null, !0), E = m._vnode.component) : M(
      m._vnode || null,
      p,
      m,
      null,
      null,
      null,
      b
    ), m._vnode = p, Sn || (Sn = !0, ki(E), oa(), Sn = !1);
  }, Qe = {
    p: M,
    um: te,
    m: dt,
    r: We,
    mt: we,
    mc: B,
    pc: Y,
    pbc: Z,
    n: tn,
    o: e
  };
  return {
    render: Mt,
    hydrate: void 0,
    createApp: Yf(Mt)
  };
}
function Jo({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Kt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function dd(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Ia(e, t, n = !1) {
  const r = e.children, o = t.children;
  if (W(r) && W(o))
    for (let s = 0; s < r.length; s++) {
      const i = r[s];
      let a = o[s];
      a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = o[s] = wt(o[s]), a.el = i.el), !n && a.patchFlag !== -2 && Ia(i, a)), a.type === go && (a.patchFlag === -1 && (a = o[s] = wt(a)), a.el = i.el), a.type === Rt && !a.el && (a.el = i.el);
    }
}
function gd(e) {
  const t = e.slice(), n = [0];
  let r, o, s, i, a;
  const c = e.length;
  for (r = 0; r < c; r++) {
    const f = e[r];
    if (f !== 0) {
      if (o = n[n.length - 1], e[o] < f) {
        t[r] = o, n.push(r);
        continue;
      }
      for (s = 0, i = n.length - 1; s < i; )
        a = s + i >> 1, e[n[a]] < f ? s = a + 1 : i = a;
      f < e[n[s]] && (s > 0 && (t[r] = n[s - 1]), n[s] = r);
    }
  }
  for (s = n.length, i = n[s - 1]; s-- > 0; )
    n[s] = i, i = t[i];
  return n;
}
function Ma(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Ma(t);
}
function Ni(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function Ea(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? Ea(t.subTree) : null;
}
const Aa = (e) => e.__isSuspense;
function pd(e, t) {
  t && t.pendingBranch ? W(e) ? t.effects.push(...e) : t.effects.push(e) : Rf(e);
}
const Ie = /* @__PURE__ */ Symbol.for("v-fgt"), go = /* @__PURE__ */ Symbol.for("v-txt"), Rt = /* @__PURE__ */ Symbol.for("v-cmt"), Qo = /* @__PURE__ */ Symbol.for("v-stc"), Wt = [];
let Ke = null;
function ne(e = !1) {
  Wt.push(Ke = e ? null : []);
}
function Oa() {
  Wt.pop(), Ke = Wt[Wt.length - 1] || null;
}
let Zn = 1;
function $i(e, t = !1) {
  Zn += e, e < 0 && Ke && t && (Ke.hasOnce = !0);
}
function Pa(e) {
  return e.dynamicChildren = Zn > 0 ? Ke || gn : null, Oa(), Zn > 0 && Ke && Ke.push(e), e;
}
function oe(e, t, n, r, o, s) {
  return Pa(
    xe(
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
function hd(e, t, n, r, o) {
  return Pa(
    bt(
      e,
      t,
      n,
      r,
      o,
      !0
    )
  );
}
function Da(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Hn(e, t) {
  return e.type === t.type && e.key === t.key;
}
const ka = ({ key: e }) => e ?? null, zr = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? _e(e) || /* @__PURE__ */ Pe(e) || q(e) ? { i: lt, r: e, k: t, f: !!n } : e : null);
function xe(e, t = null, n = null, r = 0, o = null, s = e === Ie ? 0 : 1, i = !1, a = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && ka(t),
    ref: t && zr(t),
    scopeId: ia,
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
    ctx: lt
  };
  return a ? (Gr(c, n), s & 128 && e.normalize(c)) : n && (c.shapeFlag |= _e(n) ? 8 : 16), Zn > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  Ke && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && Ke.push(c), c;
}
const bt = md;
function md(e, t = null, n = null, r = 0, o = null, s = !1) {
  if ((!e || e === Bf) && (e = Rt), Da(e)) {
    const a = wn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Gr(a, n), Zn > 0 && !s && Ke && (a.shapeFlag & 6 ? Ke[Ke.indexOf(e)] = a : Ke.push(a)), a.patchFlag = -2, a;
  }
  if (Md(e) && (e = e.__vccOpts), t) {
    t = vd(t);
    let { class: a, style: c } = t;
    a && !_e(a) && (t.class = rt(a)), de(c) && (/* @__PURE__ */ Vs(c) && !W(c) && (c = De({}, c)), t.style = kt(c));
  }
  const i = _e(e) ? 1 : Aa(e) ? 128 : co(e) ? 64 : de(e) ? 4 : q(e) ? 2 : 0;
  return xe(
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
function vd(e) {
  return e ? /* @__PURE__ */ Vs(e) || ba(e) ? De({}, e) : e : null;
}
function wn(e, t, n = !1, r = !1) {
  const { props: o, ref: s, patchFlag: i, children: a, transition: c } = e, f = t ? wd(o || {}, t) : o, d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && ka(f),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && s ? W(s) ? s.concat(zr(t)) : [s, zr(t)] : zr(t)
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
    patchFlag: t && e.type !== Ie ? i === -1 ? 16 : i | 16 : i,
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
    ssContent: e.ssContent && wn(e.ssContent),
    ssFallback: e.ssFallback && wn(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && r && Ns(
    d,
    c.clone(d)
  ), d;
}
function _s(e = " ", t = 0) {
  return bt(go, null, e, t);
}
function qe(e = "", t = !1) {
  return t ? (ne(), hd(Rt, null, e)) : bt(Rt, null, e);
}
function st(e) {
  return e == null || typeof e == "boolean" ? bt(Rt) : W(e) ? bt(
    Ie,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Da(e) ? wt(e) : bt(go, null, String(e));
}
function wt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : wn(e);
}
function Gr(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (W(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), Gr(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !ba(t) ? t._ctx = lt : o === 3 && lt && (lt.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (q(t)) {
    if (r & 65) {
      Gr(e, { default: t });
      return;
    }
    t = { default: t, _ctx: lt }, n = 32;
  } else
    t = String(t), r & 64 ? (n = 16, t = [_s(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function wd(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === "class")
        t.class !== r.class && (t.class = rt([t.class, r.class]));
      else if (o === "style")
        t.style = kt([t.style, r.style]);
      else if (to(o)) {
        const s = t[o], i = r[o];
        i && s !== i && !(W(s) && s.includes(i)) ? t[o] = s ? [].concat(s, i) : i : i == null && s == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !no(o) && (t[o] = i);
      } else o !== "" && (t[o] = r[o]);
  }
  return t;
}
function tt(e, t, n, r = null) {
  Ze(e, t, 7, [
    n,
    r
  ]);
}
const yd = ha();
let bd = 0;
function _d(e, t, n) {
  const r = e.type, o = (t ? t.appContext : e.appContext) || yd, s = {
    uid: bd++,
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
    scope: new qu(
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
    propsOptions: Sa(r, o),
    emitsOptions: ma(r, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: he,
    // inheritAttrs
    inheritAttrs: r.inheritAttrs,
    // state
    ctx: he,
    data: he,
    props: he,
    attrs: he,
    slots: he,
    refs: he,
    setupState: he,
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
  return s.ctx = { _: s }, s.root = t ? t.root : s, s.emit = Jf.bind(null, s), e.ce && e.ce(s), s;
}
let He = null;
const Sd = () => He || lt;
let Xr, Jn;
{
  const e = oo(), t = (n, r) => {
    let o;
    return (o = e[n]) || (o = e[n] = []), o.push(r), (s) => {
      o.length > 1 ? o.forEach((i) => i(s)) : o[0](s);
    };
  };
  Xr = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => He = n
  ), Jn = t(
    "__VUE_SSR_SETTERS__",
    (n) => Qn = n
  );
}
const sr = (e) => {
  const t = He;
  return Xr(e), e.scope.on(), () => {
    e.scope.off(), Xr(t);
  };
}, Wi = () => {
  He && He.scope.off(), Xr(null);
};
function Ta(e) {
  return e.vnode.shapeFlag & 4;
}
let Qn = !1;
function xd(e, t = !1, n = !1) {
  t && Jn(t);
  const { props: r, children: o } = e.vnode, s = Ta(e);
  od(e, r, s, t), ad(e, o, n || t);
  const i = s ? Rd(e, t) : void 0;
  return t && Jn(!1), i;
}
function Rd(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Nf);
  const { setup: r } = n;
  if (r) {
    _t();
    const o = e.setupContext = r.length > 1 ? Id(e) : null, s = sr(e), i = or(
      r,
      e,
      0,
      [
        e.props,
        o
      ]
    ), a = Pl(i);
    if (St(), s(), (a || e.sp) && !$n(e) && ua(e), a) {
      if (i.then(Wi, Wi), t)
        return i.then((c) => {
          Jn(!0);
          try {
            Ui(e, c, t);
          } finally {
            Jn(!1);
          }
        }).catch((c) => {
          ao(c, e, 0);
        });
      e.asyncDep = i;
    } else
      Ui(e, i);
  } else
    Fa(e);
}
function Ui(e, t, n) {
  q(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : de(t) && (e.setupState = ta(t)), Fa(e);
}
function Fa(e, t, n) {
  const r = e.type;
  e.render || (e.render = r.render || at);
  {
    const o = sr(e);
    _t();
    try {
      $f(e);
    } finally {
      St(), o();
    }
  }
}
const Cd = {
  get(e, t) {
    return Oe(e, "get", ""), e[t];
  }
};
function Id(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Cd),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function qs(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(ta(pf(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in Wn)
        return Wn[n](e);
    },
    has(t, n) {
      return n in t || n in Wn;
    }
  })) : e.proxy;
}
function Md(e) {
  return q(e) && "__vccOpts" in e;
}
const $ = (e, t) => /* @__PURE__ */ yf(e, t, Qn), Ed = "3.5.42";
/**
* @vue/runtime-dom v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Ss;
const qi = typeof window < "u" && window.trustedTypes;
if (qi)
  try {
    Ss = /* @__PURE__ */ qi.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Ha = Ss ? (e) => Ss.createHTML(e) : (e) => e, Ad = "http://www.w3.org/2000/svg", Od = "http://www.w3.org/1998/Math/MathML", vt = typeof document < "u" ? document : null, Gi = vt && /* @__PURE__ */ vt.createElement("template"), Pd = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const o = t === "svg" ? vt.createElementNS(Ad, e) : t === "mathml" ? vt.createElementNS(Od, e) : n ? vt.createElement(e, { is: n }) : vt.createElement(e);
    return e === "select" && r && r.multiple != null && o.setAttribute("multiple", r.multiple), o;
  },
  createText: (e) => vt.createTextNode(e),
  createComment: (e) => vt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => vt.querySelector(e),
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
      Gi.innerHTML = Ha(
        r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e
      );
      const a = Gi.content;
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
      i ? i.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, Dd = /* @__PURE__ */ Symbol("_vtc");
function kd(e, t, n) {
  const r = e[Dd];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Xi = /* @__PURE__ */ Symbol("_vod"), Td = /* @__PURE__ */ Symbol("_vsh"), Fd = /* @__PURE__ */ Symbol(""), Hd = /(?:^|;)\s*display\s*:/;
function Ld(e, t, n) {
  const r = e.style, o = _e(n);
  let s = !1;
  if (n && !o) {
    if (t)
      if (_e(t))
        for (const i of t.split(";")) {
          const a = i.slice(0, i.indexOf(":")).trim();
          n[a] == null && zn(r, a, "");
        }
      else
        for (const i in t)
          n[i] == null && zn(r, i, "");
    for (const i in n) {
      i === "display" && (s = !0);
      const a = n[i];
      a != null ? zd(
        e,
        i,
        !_e(t) && t ? t[i] : void 0,
        a
      ) || zn(r, i, a) : zn(r, i, "");
    }
  } else if (o) {
    if (t !== n) {
      const i = r[Fd];
      i && (n += ";" + i), r.cssText = n, s = Hd.test(n);
    }
  } else t && e.removeAttribute("style");
  Xi in e && (e[Xi] = s ? r.display : "", e[Td] && (r.display = "none"));
}
const Dr = /\s*!important$/;
function zn(e, t, n) {
  if (W(n))
    n.forEach((r) => zn(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--"))
    Dr.test(n) ? e.setProperty(t, n.replace(Dr, ""), "important") : e.setProperty(t, n);
  else {
    const r = jd(e, t);
    Dr.test(n) ? e.setProperty(
      Xt(r),
      n.replace(Dr, ""),
      "important"
    ) : e[r] = n;
  }
}
const Yi = ["Webkit", "Moz", "ms"], es = {};
function jd(e, t) {
  const n = es[t];
  if (n)
    return n;
  let r = Ge(t);
  if (r !== "filter" && r in e)
    return es[t] = r;
  r = Tl(r);
  for (let o = 0; o < Yi.length; o++) {
    const s = Yi[o] + r;
    if (s in e)
      return es[t] = s;
  }
  return t;
}
function zd(e, t, n, r) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && _e(r) && n === r;
}
const Zi = "http://www.w3.org/1999/xlink";
function Ji(e, t, n, r, o, s = Wu(t)) {
  r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Zi, t.slice(6, t.length)) : e.setAttributeNS(Zi, t, n) : n == null || s && !Hl(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    s ? "" : ct(n) ? String(n) : n
  );
}
function Qi(e, t, n, r, o) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Ha(n) : n);
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
  let i = !1;
  if (n === "" || n == null) {
    const a = typeof e[t];
    a === "boolean" ? n = Hl(n) : n == null && a === "string" ? (n = "", i = !0) : a === "number" && (n = 0, i = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  i && e.removeAttribute(o || t);
}
function Kd(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function Vd(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const el = /* @__PURE__ */ Symbol("_vei");
function Bd(e, t, n, r, o = null) {
  const s = e[el] || (e[el] = {}), i = s[t];
  if (r && i)
    i.value = r;
  else {
    const [a, c] = Wd(t);
    if (r) {
      const f = s[t] = Gd(
        r,
        o
      );
      Kd(e, a, f, c);
    } else i && (Vd(e, a, i, c), s[t] = void 0);
  }
}
const Nd = /(Once|Passive|Capture)$/, $d = /^on:?(?:Once|Passive|Capture)$/;
function Wd(e) {
  let t, n;
  for (; (n = e.match(Nd)) && !$d.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : Xt(e.slice(2)), t];
}
let ts = 0;
const Ud = /* @__PURE__ */ Promise.resolve(), qd = () => ts || (Ud.then(() => ts = 0), ts = Date.now());
function Gd(e, t) {
  const n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    const o = n.value;
    if (W(o)) {
      const s = r.stopImmediatePropagation;
      r.stopImmediatePropagation = () => {
        s.call(r), r._stopped = !0;
      };
      const i = o.slice(), a = [r];
      for (let c = 0; c < i.length && !r._stopped; c++) {
        const f = i[c];
        f && Ze(
          f,
          t,
          5,
          a
        );
      }
    } else
      Ze(
        o,
        t,
        5,
        [r]
      );
  };
  return n.value = e, n.attached = qd(), n;
}
const tl = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Xd = (e, t, n, r, o, s) => {
  const i = o === "svg";
  t === "class" ? kd(e, r, i) : t === "style" ? Ld(e, n, r) : to(t) ? no(t) || Bd(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Yd(e, t, r, i)) ? (Qi(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Ji(e, t, r, i, s, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Zd(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !_e(r))) ? Qi(e, Ge(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), Ji(e, t, r, i));
};
function Yd(e, t, n, r) {
  if (r)
    return !!(t === "innerHTML" || t === "textContent" || t in e && tl(t) && q(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return tl(t) && _e(n) ? !1 : t in e;
}
function Zd(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const r = Ge(t);
  return Array.isArray(n) ? n.some((o) => Ge(o) === r) : Object.keys(n).some((o) => Ge(o) === r);
}
const Jd = ["ctrl", "shift", "alt", "meta"], Qd = {
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
  exact: (e, t) => Jd.some((n) => e[`${n}Key`] && !t.includes(n))
}, cn = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), r = t.join(".");
  return n[r] || (n[r] = (o, ...s) => {
    for (let i = 0; i < t.length; i++) {
      const a = Qd[t[i]];
      if (a && a(o, t)) return;
    }
    return e(o, ...s);
  });
}, eg = /* @__PURE__ */ De({ patchProp: Xd }, Pd);
let nl;
function tg() {
  return nl || (nl = ud(eg));
}
const ng = (...e) => {
  const t = tg().createApp(...e), { mount: n } = t;
  return t.mount = (r) => {
    const o = og(r);
    if (!o) return;
    const s = t._component;
    !q(s) && !s.render && !s.template && (s.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const i = n(o, !1, rg(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), i;
  }, t;
};
function rg(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function og(e) {
  return _e(e) ? document.querySelector(e) : e;
}
function kr() {
  return !0;
}
const sg = Symbol("merge-proxy"), Kr = Symbol("merge-proxy-sources"), ig = {
  get(e, t, n) {
    return t === sg ? n : t === Kr ? e.sources : e.get(t);
  },
  has(e, t) {
    return e.has(t);
  },
  set: kr,
  deleteProperty: kr,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: kr,
      deleteProperty: kr
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function Vr(e) {
  return e && typeof e == "object" && "value" in e ? e.value : e;
}
function xs(...e) {
  const t = e.flatMap((n) => typeof n == "object" && n !== null && Kr in n && Array.isArray(n[Kr]) ? n[Kr] : [n]);
  return new Proxy({
    sources: t,
    get(n) {
      for (let r = t.length - 1; r >= 0; r--) {
        const o = Vr(t[r])[n];
        if (o !== void 0) return o;
      }
    },
    has(n) {
      for (let r = t.length - 1; r >= 0; r--) if (n in Vr(t[r])) return !0;
      return !1;
    },
    keys() {
      const n = [];
      for (const r of t) n.push(...Object.keys(Vr(r)));
      return [...Array.from(new Set(n))];
    }
  }, ig);
}
function rl(...e) {
  const t = {};
  for (let n of e)
    if (n = Vr(n), !!n)
      for (const r of Reflect.ownKeys(n)) {
        const o = n[r];
        o !== void 0 && (t[r] = o);
      }
  return t;
}
function La(e) {
  return typeof e == "function" ? e : (t) => {
    var n;
    return (n = e.next) == null ? void 0 : n.call(e, t);
  };
}
function lg(e) {
  return Object.assign(e, {
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: be(e, La(t), { flush: "sync" }) })
  });
}
function ag(e) {
  return Object.assign(e, {
    set: (t) => {
      e.value = typeof t == "function" ? t(e.value) : t;
    },
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: be(e, La(t), { flush: "sync" }) })
  });
}
function cg() {
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
    createReadonlyAtom: (t, n) => lg($(() => t())),
    createWritableAtom: (t, n) => ag(/* @__PURE__ */ hf(t)),
    untrack: (t) => t(),
    batch: (t) => t()
  };
}
function po(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function ut(e) {
  if (Array.isArray(e)) return e.map(ut);
  if (e && typeof e == "object") {
    const t = Object.getPrototypeOf(e);
    if (t !== Object.prototype && t !== null) return e;
    const n = t === null ? ee() : {}, r = Object.keys(e);
    for (let o = 0; o < r.length; o++) {
      const s = r[o];
      Object.defineProperty(n, s, {
        configurable: !0,
        enumerable: !0,
        value: ut(e[s]),
        writable: !0
      });
    }
    return n;
  }
  return e;
}
function ja(e, t) {
  const n = Object.keys(t), r = e;
  for (let o = 0; o < n.length; o++) {
    const s = n[o];
    !s.startsWith("_memo_") && s !== "_cellsCache" && (r[s] = t[s]);
  }
  return e;
}
function ee() {
  return /* @__PURE__ */ Object.create(null);
}
function Yt(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function ir(e, t) {
  return (n) => {
    var r;
    (((r = t.options.atoms) == null ? void 0 : r[e]) ?? t.baseAtoms[e]).set((o) => po(n, o));
  };
}
function ol(e) {
  if (typeof e != "object" || e === null) return !1;
  if (Array.isArray(e)) return !0;
  const t = Object.getPrototypeOf(e);
  return t === Object.prototype || t === null;
}
function sl(e) {
  return Reflect.ownKeys(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
const ug = 3;
function fg(e, t) {
  return za(e, t, ug);
}
function za(e, t, n) {
  if (Object.is(e, t)) return !0;
  if (n <= 0 || !ol(e) || !ol(t) || (Array.isArray(e) || Array.isArray(t)) && (!Array.isArray(e) || !Array.isArray(t) || e.length !== t.length))
    return !1;
  const r = sl(e), o = sl(t);
  if (r.length !== o.length) return !1;
  const s = e, i = t;
  for (let a = 0; a < r.length; a++) {
    const c = r[a];
    if (!Object.prototype.propertyIsEnumerable.call(t, c) || !za(s[c], i[c], n - 1)) return !1;
  }
  return !0;
}
function ho(e, t, n, r = fg) {
  const o = `on${t.charAt(0).toUpperCase()}${t.slice(1)}Change`, s = e.options[o];
  s && s((i) => {
    const a = po(n, i);
    return r(i, a) ? i : a;
  });
}
function dg(e) {
  return e instanceof Function;
}
function gg(e, t) {
  const n = [], r = (o) => {
    o.forEach((s) => {
      n.push(s);
      const i = t(s);
      i.length && r(i);
    });
  };
  return r(e), n;
}
const pg = ({ fn: e, memoDeps: t, onAfterCompare: n, onAfterUpdate: r, onBeforeCompare: o, onBeforeUpdate: s }) => {
  let i = [], a;
  return (f) => {
    o == null || o();
    const d = t == null ? void 0 : t(f);
    let h = !d || d.length !== (i == null ? void 0 : i.length);
    if (!h && d) {
      for (let w = 0; w < d.length; w++) if (d[w] !== i[w]) {
        h = !0;
        break;
      }
    }
    return n == null || n(h), h && (i = d, s == null || s(), a = e(...d ?? []), r == null || r(a)), a;
  };
};
function Ka(e) {
  let t = !1;
  return () => {
    if (!t) {
      t = !0;
      return;
    }
    e();
  };
}
function lr({ feature: e, fnName: t, objectId: n, onAfterUpdate: r, table: o, ...s }) {
  const i = () => {
    if (!r) return;
    const { schedule: c, untrack: f } = o._reactivity;
    c(() => f(() => r()));
  };
  return pg({
    ...s,
    ...{ onAfterUpdate: () => {
      i();
    } }
  });
}
function Va(e, t = "_") {
  const [n, r] = e.split(t);
  return {
    fnKey: r,
    fnName: `${n}.${r}`,
    parentName: n
  };
}
function ft(e, t, n) {
  for (const [r, { fn: o, memoDeps: s }] of Object.entries(n)) {
    const { fnKey: i, fnName: a } = Va(r);
    t[i] = s ? lr({
      memoDeps: s,
      fn: o,
      fnName: a,
      table: t,
      feature: e
    }) : o;
  }
}
function Je(e, t, n, r) {
  for (const [o, { fn: s, memoDeps: i }] of Object.entries(r)) {
    const { fnKey: a, fnName: c } = Va(o);
    if (i) {
      const f = `_memo_${a}`;
      t[a] = function(...d) {
        if (!this[f]) {
          const h = this;
          this[f] = lr({
            memoDeps: (w) => i(h, w),
            fn: (...w) => s(h, ...w),
            fnName: c,
            objectId: h.id,
            table: n,
            feature: e
          });
        }
        return this[f](...d);
      };
    } else t[a] = function(...f) {
      return s(this, ...f);
    };
  }
}
function G(e, t, n, ...r) {
  var o;
  return ((o = e[t]) == null ? void 0 : o.call(e, ...r)) ?? n(e, ...r);
}
function hg(e) {
  return e.row.getValue(e.column.id);
}
function mg(e) {
  return e.getValue() ?? e.table.options.renderFallbackValue;
}
function vg(e) {
  return {
    table: e.table,
    column: e.column,
    row: e.row,
    cell: e,
    getValue: () => e.getValue(),
    renderValue: () => e.renderValue()
  };
}
const wg = { assignCellPrototype: (e, t) => {
  Je("coreCellsFeature", e, t, {
    cell_getValue: { fn: (n) => hg(n) },
    cell_renderValue: { fn: (n) => mg(n) },
    cell_getContext: {
      fn: (n) => vg(n),
      memoDeps: (n) => [n]
    }
  });
} };
function yg(e) {
  var t, n;
  if (!e._headerPrototype) {
    e._headerPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignHeaderPrototype) == null || n.call(t, e._headerPrototype, e);
  }
  return e._headerPrototype;
}
function Ba(e, t, n) {
  const r = yg(e), o = Object.create(r);
  o.colSpan = 0, o.column = t, o.depth = n.depth, o.headerGroup = null, o.id = n.id ?? t.id, o.index = n.index, o.isPlaceholder = !!n.isPlaceholder, o.placeholderId = n.placeholderId, o.rowSpan = 0, o.subHeaders = [];
  const s = e._headerInstanceInitFns;
  for (let i = 0; i < s.length; i++) s[i](o);
  return o;
}
function Zt() {
  return {
    start: [],
    end: []
  };
}
function bg(e) {
  var s;
  const t = e.getAllColumns(), n = e.getAllLeafColumnsById(), { start: r } = ((s = e.atoms.columnPinning) == null ? void 0 : s.get()) ?? Zt(), o = [];
  for (let i = 0; i < r.length; i++) {
    const a = n[r[i]];
    a && G(a, "getIsVisible", Ne) && o.push(a);
  }
  return er(t, o, e, "start");
}
function _g(e) {
  var s;
  const t = e.getAllColumns(), n = e.getAllLeafColumnsById(), { end: r } = ((s = e.atoms.columnPinning) == null ? void 0 : s.get()) ?? Zt(), o = [];
  for (let i = 0; i < r.length; i++) {
    const a = n[r[i]];
    a && G(a, "getIsVisible", Ne) && o.push(a);
  }
  return er(t, o, e, "end");
}
function Sg(e) {
  var s;
  const t = e.getAllColumns();
  let n = G(e, "getVisibleLeafColumns", Gs);
  const { start: r, end: o } = ((s = e.atoms.columnPinning) == null ? void 0 : s.get()) ?? Zt();
  if (r.length || o.length) {
    const i = [...r, ...o];
    n = n.filter((a) => !i.includes(a.id));
  }
  return er(t, n, e, "center");
}
function xg(e) {
  var o;
  const { start: t } = ((o = e.atoms.columnPinning) == null ? void 0 : o.get()) ?? Zt(), n = e.getAllLeafColumnsById(), r = [];
  for (let s = 0; s < t.length; s++) {
    const i = n[t[s]];
    i && r.push(i);
  }
  return r;
}
function Rg(e) {
  var o;
  const { end: t } = ((o = e.atoms.columnPinning) == null ? void 0 : o.get()) ?? Zt(), n = e.getAllLeafColumnsById(), r = [];
  for (let s = 0; s < t.length; s++) {
    const i = n[t[s]];
    i && r.push(i);
  }
  return r;
}
function Cg(e) {
  var o;
  const { start: t, end: n } = ((o = e.atoms.columnPinning) == null ? void 0 : o.get()) ?? Zt();
  if (!t.length && !n.length) return e.getAllLeafColumns();
  const r = [...t, ...n];
  return e.getAllLeafColumns().filter((s) => !r.includes(s.id));
}
function Ig(e) {
  return G(e, "getStartLeafColumns", xg).filter((t) => G(t, "getIsVisible", Ne));
}
function Mg(e) {
  return G(e, "getEndLeafColumns", Rg).filter((t) => G(t, "getIsVisible", Ne));
}
function Eg(e) {
  return G(e, "getCenterLeafColumns", Cg).filter((t) => G(t, "getIsVisible", Ne));
}
function Tr(e, t) {
  return t ? t === "start" ? G(e, "getStartVisibleLeafColumns", Ig) : t === "end" ? G(e, "getEndVisibleLeafColumns", Mg) : G(e, "getCenterVisibleLeafColumns", Eg) : G(e, "getVisibleLeafColumns", Gs);
}
function Ne(e) {
  var r;
  const t = (r = e.table.atoms.columnVisibility) == null ? void 0 : r.get();
  if (!t) return !0;
  const n = e.columns;
  return n.length ? n.some((o) => G(o, "getIsVisible", Ne)) : (Yt(t, e.id) ? t[e.id] : void 0) ?? !0;
}
function Gs(e) {
  return e.getAllLeafColumns().filter((t) => G(t, "getIsVisible", Ne));
}
function Na(e, t = 1) {
  let n = t;
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    G(o, "getIsVisible", Ne) && o.columns.length && (n = Math.max(n, Na(o.columns, t + 1)));
  }
  return n;
}
function Ag(e, t) {
  return e ? `${e}_${t}` : String(t);
}
function Og(e, t, n, r) {
  let o = e ?? "";
  return t && (o = o ? `${o}_${t}` : String(t)), n && (o = o ? `${o}_${n}` : n), r && (o = o ? `${o}_${r}` : r), o;
}
function Pg(e, t) {
  let n = 0;
  for (let r = 0; r < e.length; r++) e[r].column === t && n++;
  return n;
}
function $a(e, t, n, r, o, s) {
  const i = {
    depth: t,
    id: Ag(r, t),
    headers: []
  }, a = [];
  for (let c = 0; c < e.length; c++) {
    if (!(c in e)) continue;
    const f = e[c], d = a[a.length - 1], h = f.column.depth === i.depth;
    let w, y = !1;
    if (h && f.column.parent ? w = f.column.parent : (w = f.column, y = !0), d && d.column === w) d.subHeaders.push(f);
    else {
      const O = Ba(n, w, {
        id: Og(r, t, w.id, f.id),
        isPlaceholder: y,
        placeholderId: y ? String(Pg(a, w)) : void 0,
        depth: t,
        index: a.length
      });
      O.subHeaders.push(f), a.push(O);
    }
    i.headers.push(f), f.headerGroup = i;
  }
  for (let c = 0; c < s.length; c++) s[c](i);
  o.push(i), t > 0 && $a(a, t - 1, n, r, o, s);
}
function Wa(e) {
  for (let t = 0; t < e.length; t++) {
    const n = e[t];
    if (!G(n.column, "getIsVisible", Ne)) continue;
    let r = 0;
    if (n.subHeaders.length) {
      Wa(n.subHeaders);
      for (let o = 0; o < n.subHeaders.length; o++) {
        const s = n.subHeaders[o];
        G(s.column, "getIsVisible", Ne) && (r += s.colSpan);
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
function er(e, t, n, r) {
  var c;
  const o = Na(e), s = [], i = n._headerGroupInstanceInitFns, a = new Array(t.length);
  for (let f = 0; f < t.length; f++)
    f in t && (a[f] = Ba(n, t[f], {
      depth: o,
      index: f
    }));
  return $a(a, o - 1, n, r, s, i), s.reverse(), Wa(((c = s[0]) == null ? void 0 : c.headers) ?? []), s;
}
function Dg(e) {
  var t, n;
  if (!e._columnPrototype) {
    e._columnPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignColumnPrototype) == null || n.call(t, e._columnPrototype, e);
  }
  return e._columnPrototype;
}
function kg(e, t, n, r) {
  const o = {
    ...e.getDefaultColumnDef(),
    ...t
  }, s = o.accessorKey, i = s === void 0 ? void 0 : String(s), a = o.id ?? (i == null ? void 0 : i.replaceAll(".", "_")) ?? (typeof o.header == "string" ? o.header : void 0);
  let c;
  if (o.accessorFn) c = o.accessorFn;
  else if (s !== void 0) if (typeof s == "string" && s.includes(".")) {
    const w = s.split(".");
    c = (y) => {
      let O = y;
      for (let M = 0; M < w.length; M++) {
        const A = w[M];
        O = O == null ? void 0 : O[A];
      }
      return O;
    };
  } else c = (w) => w[o.accessorKey];
  if (!a)
    throw new Error();
  const f = Dg(e), d = Object.create(f);
  d.accessorFn = c, d.columnDef = o, d.columns = [], d.depth = n, d.id = `${String(a)}`, d.parent = r;
  const h = e._columnInstanceInitFns;
  for (let w = 0; w < h.length; w++) h[w](d);
  return d;
}
function Ua(e) {
  var n;
  const t = (n = e.atoms.columnOrder) == null ? void 0 : n.get();
  return (r) => {
    let o = [];
    if (!(t != null && t.length)) o = r;
    else {
      const s = /* @__PURE__ */ new Map();
      for (let i = 0; i < r.length; i++) {
        const a = r[i];
        s.set(a.id, a);
      }
      for (let i = 0; i < t.length; i++) {
        const a = t[i], c = s.get(a);
        c && (o.push(c), s.delete(a));
      }
      for (let i = 0; i < r.length; i++) {
        const a = r[i];
        s.has(a.id) && o.push(a);
      }
    }
    return Tg(e, o);
  };
}
function Tg(e, t) {
  var a;
  const n = ((a = e.atoms.grouping) == null ? void 0 : a.get()) ?? [], { groupedColumnMode: r } = e.options;
  if (!n.length || !r) return t;
  const o = t.filter((c) => !n.includes(c.id));
  if (r === "remove") return o;
  const s = /* @__PURE__ */ new Map();
  for (let c = 0; c < t.length; c++) {
    const f = t[c];
    s.set(f.id, f);
  }
  const i = [];
  for (let c = 0; c < n.length; c++) {
    const f = s.get(n[c]);
    f && i.push(f);
  }
  return [...i, ...o];
}
function Fg(e) {
  return [e, ...e.columns.flatMap((t) => t.getFlatColumns())];
}
function Hg(e) {
  if (e.columns.length) {
    const t = e.columns.flatMap((n) => n.getLeafColumns());
    return G(e.table, "getOrderColumns", Ua)(t);
  }
  return [e];
}
function Lg(e) {
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
function qa(e, t, n, r = 0) {
  const o = new Array(t.length);
  for (let s = 0; s < t.length; s++) {
    if (!(s in t)) continue;
    const i = t[s], a = kg(e, i, r, n), c = i;
    a.columns = c.columns ? qa(e, c.columns, a, r + 1) : [], o[s] = a;
  }
  return o;
}
function jg(e) {
  return qa(e, e.options.columns);
}
function zg(e) {
  return e.getAllColumns().flatMap((t) => t.getFlatColumns());
}
function Kg(e) {
  const t = ee(), n = e.getAllFlatColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function Vg(e) {
  const t = e.getAllColumns().flatMap((n) => n.getLeafColumns());
  return G(e, "getOrderColumns", Ua)(t);
}
function Bg(e) {
  const t = ee(), n = e.getAllLeafColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function Ng(e, t) {
  return e.getAllFlatColumnsById()[t];
}
const $g = {
  assignColumnPrototype: (e, t) => {
    Je("coreColumnsFeature", e, t, {
      column_getFlatColumns: {
        fn: (n) => Fg(n),
        memoDeps: (n) => [n.table.options.columns]
      },
      column_getLeafColumns: {
        fn: (n) => Hg(n),
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
    ft("coreColumnsFeature", e, {
      table_getDefaultColumnDef: {
        fn: () => Lg(e),
        memoDeps: () => [e.options.defaultColumn]
      },
      table_getAllColumns: {
        fn: () => jg(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumns: {
        fn: () => zg(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumnsById: {
        fn: () => Kg(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllLeafColumns: {
        fn: () => Vg(e),
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
        fn: () => Bg(e),
        memoDeps: () => [e.getAllLeafColumns()]
      },
      table_getColumn: { fn: (t) => Ng(e, t) }
    });
  }
};
function Ga(e, t) {
  for (let n = 0; n < e.subHeaders.length; n++) Ga(e.subHeaders[n], t);
  t.push(e);
}
function Wg(e) {
  const t = [];
  return Ga(e, t), t;
}
function Ug(e) {
  return {
    column: e.column,
    header: e,
    table: e.column.table
  };
}
function qg(e) {
  var f;
  const { start: t, end: n } = ((f = e.atoms.columnPinning) == null ? void 0 : f.get()) ?? Zt(), r = e.getAllColumns(), o = G(e, "getVisibleLeafColumns", Gs);
  if (!t.length && !n.length) return er(r, o, e);
  const s = e.getAllLeafColumnsById(), i = [];
  for (let d = 0; d < t.length; d++) {
    const h = s[t[d]];
    h && G(h, "getIsVisible", Ne) && i.push(h);
  }
  const a = [];
  for (let d = 0; d < n.length; d++) {
    const h = s[n[d]];
    h && G(h, "getIsVisible", Ne) && a.push(h);
  }
  const c = o.filter((d) => !t.includes(d.id) && !n.includes(d.id));
  return er(r, [
    ...i,
    ...c,
    ...a
  ], e);
}
function Gg(e) {
  return [...e.getHeaderGroups()].reverse();
}
function Xg(e) {
  const t = e.getHeaderGroups(), n = [];
  for (let r = 0; r < t.length; r++) {
    const o = t[r].headers;
    for (let s = 0; s < o.length; s++) n.push(o[s]);
  }
  return n;
}
function Yg(e) {
  var r;
  const t = ((r = e.getHeaderGroups()[0]) == null ? void 0 : r.headers) ?? [], n = [];
  for (let o = 0; o < t.length; o++) {
    const s = t[o].getLeafHeaders();
    for (let i = 0; i < s.length; i++) n.push(s[i]);
  }
  return n;
}
const Zg = {
  assignHeaderPrototype: (e, t) => {
    Je("coreHeadersFeature", e, t, {
      header_getLeafHeaders: {
        fn: (n) => Wg(n),
        memoDeps: (n) => [n.column.table.options.columns]
      },
      header_getContext: {
        fn: (n) => Ug(n),
        memoDeps: (n) => [n.column.table.options.columns]
      }
    });
  },
  constructTableAPIs: (e) => {
    ft("coreHeadersFeature", e, {
      table_getHeaderGroups: {
        fn: () => qg(e),
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
        fn: () => Gg(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getFlatHeaders: {
        fn: () => Xg(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getLeafHeaders: {
        fn: () => Yg(e),
        memoDeps: () => [e.getHeaderGroups()]
      }
    });
  }
};
function Jg(e) {
  var t, n;
  if (!e._rowPrototype) {
    e._rowPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignRowPrototype) == null || n.call(t, e._rowPrototype, e);
  }
  return e._rowPrototype;
}
const Qg = (e, t, n, r, o, s, i) => {
  const a = Jg(e), c = Object.create(a);
  c._displayIndexCache = -1, c._uniqueValuesCache = ee(), c._valuesCache = ee(), c.depth = o, c.id = t, c.index = r, c.original = n, c.parentId = i, c.subRows = [];
  const f = e._rowInstanceInitFns;
  for (let d = 0; d < f.length; d++) f[d](c);
  return c;
}, ep = /([0-9]+)/gm;
function yn(e) {
  const t = Object.assign((n, r, o) => {
    let s = n.getValue(o), i = r.getValue(o);
    const a = t.resolveDataValue;
    return a && (s = a(s), i = a(i)), t.sort(s, i, n, r, o);
  }, e);
  return t;
}
const tp = yn({
  resolveDataValue: (e) => mo(e).toLowerCase(),
  sort: (e, t) => Ya(e, t)
});
yn({
  resolveDataValue: (e) => mo(e),
  sort: (e, t) => Ya(e, t)
});
const np = yn({
  resolveDataValue: (e) => mo(e).toLowerCase(),
  sort: (e, t) => Xs(e, t)
});
yn({
  resolveDataValue: (e) => mo(e),
  sort: (e, t) => Xs(e, t)
});
yn({
  resolveDataValue: (e) => rp(e),
  sort: (e, t) => e > t ? 1 : e < t ? -1 : 0
});
const Xa = yn({ sort: (e, t) => Xs(e, t) });
function Xs(e, t) {
  return e === t ? 0 : e > t ? 1 : -1;
}
function rp(e) {
  return e instanceof Date ? e.getTime() : e;
}
function mo(e) {
  return typeof e == "number" ? isNaN(e) || e === 1 / 0 || e === -1 / 0 ? "" : String(e) : typeof e == "string" ? e : "";
}
function Ya(e, t) {
  let n = 0, r = 0;
  const o = e.length, s = t.length;
  for (; n < o && r < s; ) {
    const i = Yr(e.charCodeAt(n)), a = Yr(t.charCodeAt(r)), c = Rs(e, n, i), f = Rs(t, r, a);
    if (!i && !a) {
      const h = op(e, n, c, t, r, f);
      if (h) return h;
      n = c, r = f;
      continue;
    }
    if (i !== a) return i ? 1 : -1;
    const d = sp(e, n, c, t, r, f);
    if (d) return d;
    n = c, r = f;
  }
  return ll(e, n) - ll(t, r);
}
function Yr(e) {
  return e >= 48 && e <= 57;
}
function Rs(e, t, n) {
  let r = t + 1;
  for (; r < e.length && Yr(e.charCodeAt(r)) === n; ) r++;
  return r;
}
function op(e, t, n, r, o, s) {
  const i = n - t, a = s - o, c = i < a ? i : a;
  for (let f = 0; f < c; f++) {
    const d = e.charCodeAt(t + f), h = r.charCodeAt(o + f);
    if (d > h) return 1;
    if (h > d) return -1;
  }
  return i > a ? 1 : a > i ? -1 : 0;
}
function sp(e, t, n, r, o, s) {
  let i = t;
  for (; i < n && e.charCodeAt(i) === 48; ) i++;
  let a = o;
  for (; a < s && r.charCodeAt(a) === 48; ) a++;
  const c = n - i, f = s - a;
  if (c === 0 && f === 0) return 0;
  if (c <= 15 && f <= 15) {
    const w = il(e, i, n), y = il(r, a, s);
    return w > y ? 1 : y > w ? -1 : 0;
  }
  const d = parseInt(e.slice(t, n), 10), h = parseInt(r.slice(o, s), 10);
  return d > h ? 1 : h > d ? -1 : 0;
}
function il(e, t, n) {
  let r = 0;
  for (let o = t; o < n; o++) r = r * 10 + e.charCodeAt(o) - 48;
  return r;
}
function ll(e, t) {
  let n = 0, r = t;
  for (; r < e.length; )
    n++, r = Rs(e, r, Yr(e.charCodeAt(r)));
  return n;
}
function ip() {
  return [];
}
function lp(e, t) {
  ho(e, "cellSelection", ut(e.initialState.cellSelection) ?? ip());
}
function ap(e) {
  e.atoms.cellSelection && (e.options.autoResetAll ?? e.options.autoResetCellSelection ?? !0) && e._reactivity.schedule(() => lp(e));
}
function cp() {
  return ee();
}
function Za(e) {
  e.atoms.expanded && (e.options.autoResetAll ?? e.options.autoResetExpanded ?? !e.options.manualExpanding) && e._reactivity.schedule(() => Qa(e));
}
function Zr(e, t) {
  var n, r;
  (r = (n = e.options).onExpandedChange) == null || r.call(n, t);
}
function Ja(e, t) {
  var r;
  const n = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t ?? !tc(e)) {
    if (n === !0 || !ec(e)) return;
    Zr(e, !0);
  } else {
    if (n !== !0 && !Object.keys(n).length) return;
    Zr(e, ee());
  }
}
function Qa(e, t) {
  const n = e.initialState.expanded;
  ho(e, "expanded", t ? ee() : n === !0 ? !0 : Object.assign(ee(), ut(n ?? {})));
}
function ec(e) {
  return e.getPrePaginatedRowModel().flatRows.some((t) => qt(t));
}
function up(e) {
  return (t) => {
    Ja(e);
  };
}
function fp(e) {
  var n;
  const t = ((n = e.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return t === !0 || Object.values(t).some(Boolean);
}
function tc(e) {
  var r;
  const t = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t === !0) return !0;
  if (!Object.keys(t).length) return !1;
  const n = e.getRowModel().flatRows.filter((o) => qt(o));
  return !(!n.length || n.some((o) => !vo(o)));
}
function dp(e) {
  var r;
  let t = 0;
  const n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return (n === !0 ? Object.values(e.getRowModel().rowsById).filter((o) => qt(o)).map((o) => o.id) : Object.keys(n ?? {})).forEach((o) => {
    const s = o.split(".");
    t = Math.max(t, s.length);
  }), t;
}
function nc(e, t) {
  var s;
  const n = ((s = e.table.atoms.expanded) == null ? void 0 : s.get()) ?? {}, r = n === !0 || Cs(n, e.id), o = t ?? !r;
  o !== r && (o && !qt(e) || Zr(e.table, (i) => {
    const a = i === !0 ? !0 : Cs(i, e.id);
    let c = ee();
    if (i === !0 ? Object.values(e.table.getRowModel().rowsById).forEach((f) => {
      qt(f) && (c[f.id] = !0);
    }) : c = Object.assign(ee(), i), !a && o)
      return c[e.id] = !0, c;
    if (a && !o) {
      const f = ee(), d = Object.keys(c);
      for (let h = 0; h < d.length; h++) {
        const w = d[h];
        w !== e.id && c[w] && (f[w] = !0);
      }
      return f;
    }
    return i;
  }));
}
function vo(e) {
  var n, r, o;
  const t = ((n = e.table.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return !!(((o = (r = e.table.options).getIsRowExpanded) == null ? void 0 : o.call(r, e)) ?? (t === !0 || Cs(t, e.id)));
}
function Cs(e, t) {
  return !!(e && e !== !0 && Yt(e, t) && e[t]);
}
function qt(e) {
  var t, n;
  return ((n = (t = e.table.options).getRowCanExpand) == null ? void 0 : n.call(t, e)) ?? ((e.table.options.enableExpanding ?? !0) && !!e.subRows.length);
}
function gp(e) {
  let t = !0, n = e;
  for (; t && n.parentId; )
    n = e.table.getRow(n.parentId, !0), t = vo(n);
  return t;
}
function pp(e) {
  const t = qt(e);
  return () => {
    t && nc(e);
  };
}
const Is = 0;
function rc(e) {
  var t, n;
  if (e.options.autoResetAll ?? e.options.autoResetPageIndex ?? !e.options.manualPagination) {
    if ((((n = (t = e.atoms.pagination) == null ? void 0 : t.get()) == null ? void 0 : n.pageIndex) ?? Is) === Is) return;
    vp(e);
  }
}
function hp(e, t) {
  ho(e, "pagination", t);
}
function mp(e, t) {
  hp(e, (n) => {
    let r = po(t, n.pageIndex);
    const o = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
    return r = Math.max(0, Math.min(r, o)), {
      ...n,
      pageIndex: r
    };
  });
}
function vp(e, t) {
  mp(e, Is);
}
function wp() {
  return [];
}
function wo(e, t) {
  ho(e, "sorting", t);
}
function oc(e, t) {
  wo(e, t ? [] : ut(e.initialState.sorting ?? []));
}
function yp(e) {
  e.atoms.sorting && (e.options.autoResetAll ?? e.options.autoResetSorting ?? !1) && oc(e);
}
function sc(e) {
  const t = e.table._rowModelFns.sortFns, n = e.table.getFilteredRowModel().flatRows.slice(0, 10);
  let r, o = !1;
  for (let s = 0; s < n.length; s++) {
    const i = n[s].getValue(e.id);
    if (Object.prototype.toString.call(i) === "[object Date]") {
      r = "datetime";
      break;
    }
    if (typeof i == "string" && (o = !0, i.split(ep).length > 1)) {
      r = "alphanumeric";
      break;
    }
  }
  if (!r && o && (r = "text"), r) {
    let s = t == null ? void 0 : t[r];
    if (s || r === "alphanumeric" && (s = t == null ? void 0 : t.text), s) return s;
  }
  return Xa;
}
function ic(e) {
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
  return dg(e.columnDef.sortFn) ? e.columnDef.sortFn : e.columnDef.sortFn === "auto" ? sc(e) : (t == null ? void 0 : t[e.columnDef.sortFn]) ?? Xa;
}
function ac(e, t, n) {
  const r = uc(e, n && Jr(e)), o = typeof t < "u";
  wo(e.table, (s) => {
    const i = s.findIndex((w) => w.id === e.id), a = i === -1 ? void 0 : s[i];
    let c = [], f;
    const d = o ? t : r === "desc", h = !!(s.length && Jr(e) && n);
    return h ? a ? f = "toggle" : f = "add" : a ? f = "toggle" : f = "replace", f === "toggle" && (o || r || (f = "remove")), f === "add" ? (c = [...s, {
      id: e.id,
      desc: d
    }], c.splice(0, c.length - (e.table.options.maxMultiSortColCount ?? Number.MAX_SAFE_INTEGER))) : f === "toggle" ? c = h ? s.map((w) => w.id === e.id ? {
      ...w,
      desc: d
    } : w) : [{
      id: e.id,
      desc: d
    }] : f === "remove" ? c = h ? s.filter((w) => w.id !== e.id) : [] : c = [{
      id: e.id,
      desc: d
    }], c;
  });
}
function cc(e) {
  return e.columnDef.sortDescFirst ?? e.table.options.sortDescFirst ?? ic(e) === "desc" ? "desc" : "asc";
}
function uc(e, t) {
  const n = cc(e), r = fc(e);
  return r ? r !== n && (e.table.options.enableSortingRemoval ?? !0) && (!t || (e.table.options.enableMultiRemove ?? !0)) ? !1 : r === "desc" ? "asc" : "desc" : n;
}
function Ys(e) {
  return (e.columnDef.enableSorting ?? !0) && (e.table.options.enableSorting ?? !0) && !!e.accessorFn;
}
function Jr(e) {
  return e.columnDef.enableMultiSort ?? e.table.options.enableMultiSort ?? !!e.accessorFn;
}
function fc(e) {
  var n, r;
  const t = (r = (n = e.table.atoms.sorting) == null ? void 0 : n.get()) == null ? void 0 : r.find((o) => o.id === e.id);
  return t ? t.desc ? "desc" : "asc" : !1;
}
function bp(e) {
  var t, n;
  return ((n = (t = e.table.atoms.sorting) == null ? void 0 : t.get()) == null ? void 0 : n.findIndex((r) => r.id === e.id)) ?? -1;
}
function _p(e) {
  wo(e.table, (t) => t.length ? t.filter((n) => n.id !== e.id) : []);
}
function Sp(e) {
  const t = Ys(e);
  return (n) => {
    var r, o;
    t && ac(e, void 0, Jr(e) ? (o = (r = e.table.options).isMultiSortEvent) == null ? void 0 : o.call(r, n) : !1);
  };
}
function dc() {
  return (e) => lr({
    feature: "coreRowModelsFeature",
    table: e,
    fnName: "table.getCoreRowModel",
    memoDeps: () => [e.options.data],
    fn: () => xp(e, e.options.data),
    onAfterUpdate: Ka(() => {
      Za(e), rc(e), yp(e), ap(e);
    })
  });
}
function gc(e, t, n, r = 0, o) {
  var i;
  const s = [];
  for (let a = 0; a < n.length; a++) {
    const c = n[a], f = Qg(e, e.getRowId(c, a, o), c, a, r, void 0, o == null ? void 0 : o.id);
    t.flatRows.push(f), t.rowsById[f.id] = f, s.push(f), e.options.getSubRows && (f.originalSubRows = e.options.getSubRows(c, a), (i = f.originalSubRows) != null && i.length && (f.subRows = gc(e, t, f.originalSubRows, r + 1, f)));
  }
  return s;
}
function xp(e, t) {
  const n = {
    rows: [],
    flatRows: [],
    rowsById: ee()
  };
  return n.rows = gc(e, n, t), n;
}
function Rp(e) {
  var t, n;
  return e._rowModels.coreRowModel || (e._rowModels.coreRowModel = ((n = (t = e.options.features).coreRowModel) == null ? void 0 : n.call(t, e)) ?? dc()(e)), e._rowModels.coreRowModel();
}
function Cp(e) {
  return e.getCoreRowModel();
}
function Ip(e) {
  var t, n;
  return e._rowModels.filteredRowModel || (e._rowModels.filteredRowModel = (n = (t = e.options.features).filteredRowModel) == null ? void 0 : n.call(t, e)), e.options.manualFiltering || !e._rowModels.filteredRowModel ? e.getPreFilteredRowModel() : e._rowModels.filteredRowModel();
}
function Mp(e) {
  return e.getFilteredRowModel();
}
function Ep(e) {
  var t, n;
  return e._rowModels.groupedRowModel || (e._rowModels.groupedRowModel = (n = (t = e.options.features).groupedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualGrouping || !e._rowModels.groupedRowModel ? e.getPreGroupedRowModel() : e._rowModels.groupedRowModel();
}
function Ap(e) {
  return e.getGroupedRowModel();
}
function Op(e) {
  var t, n;
  return e._rowModels.sortedRowModel || (e._rowModels.sortedRowModel = (n = (t = e.options.features).sortedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualSorting || !e._rowModels.sortedRowModel ? e.getPreSortedRowModel() : e._rowModels.sortedRowModel();
}
function Pp(e) {
  return e.getSortedRowModel();
}
function Dp(e) {
  var t, n;
  return e._rowModels.expandedRowModel || (e._rowModels.expandedRowModel = (n = (t = e.options.features).expandedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualExpanding || !e._rowModels.expandedRowModel ? e.getPreExpandedRowModel() : e._rowModels.expandedRowModel();
}
function kp(e) {
  return e.getExpandedRowModel();
}
function Tp(e) {
  var t, n;
  return e._rowModels.paginatedRowModel || (e._rowModels.paginatedRowModel = (n = (t = e.options.features).paginatedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualPagination || !e._rowModels.paginatedRowModel ? e.getPrePaginatedRowModel() : e._rowModels.paginatedRowModel();
}
function Fp(e) {
  return e.getPaginatedRowModel();
}
const Hp = { constructTableAPIs: (e) => {
  ft("coreRowModelsFeature", e, {
    table_getCoreRowModel: { fn: () => Rp(e) },
    table_getPreFilteredRowModel: { fn: () => Cp(e) },
    table_getFilteredRowModel: { fn: () => Ip(e) },
    table_getPreGroupedRowModel: { fn: () => Mp(e) },
    table_getGroupedRowModel: { fn: () => Ep(e) },
    table_getPreSortedRowModel: { fn: () => Ap(e) },
    table_getSortedRowModel: { fn: () => Op(e) },
    table_getPreExpandedRowModel: { fn: () => Pp(e) },
    table_getExpandedRowModel: { fn: () => Dp(e) },
    table_getPrePaginatedRowModel: { fn: () => kp(e) },
    table_getPaginatedRowModel: { fn: () => Tp(e) },
    table_getRowModel: { fn: () => Fp(e) }
  });
} };
function Lp(e) {
  var t, n;
  if (!e._cellPrototype) {
    e._cellPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignCellPrototype) == null || n.call(t, e._cellPrototype, e);
  }
  return e._cellPrototype;
}
function jp(e, t, n) {
  const r = Lp(n), o = Object.create(r);
  o.column = e, o.id = `${t.id}_${e.id}`, o.row = t;
  const s = n._cellInstanceInitFns;
  for (let i = 0; i < s.length; i++) s[i](o);
  return o;
}
function zp(e) {
  const t = e.table.getRowsInDisplayOrder(), n = e._displayIndexCache;
  return t[n] === e ? n : -1;
}
function Kp(e) {
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
function Vp(e, t) {
  if (Yt(e._valuesCache, t)) return e._valuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return e._valuesCache[t] = n.accessorFn(e.original, e.index), e._valuesCache[t];
}
function Bp(e, t) {
  if (Yt(e._uniqueValuesCache, t)) return e._uniqueValuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return n.columnDef.getUniqueValues ? (e._uniqueValuesCache[t] = n.columnDef.getUniqueValues(e.original, e.index), e._uniqueValuesCache[t]) : (e._uniqueValuesCache[t] = [e.getValue(t)], e._uniqueValuesCache[t]);
}
function Np(e, t) {
  return e.getValue(t) ?? e.table.options.renderFallbackValue;
}
function $p(e) {
  return gg(e.subRows, (t) => t.subRows);
}
function Wp(e) {
  const t = e.getCoreRowModel().flatRows;
  let n = 0;
  for (let r = 0; r < t.length; r++) n = Math.max(n, t[r].depth);
  return n;
}
function Up(e) {
  if (e.parentId)
    return e.table.getCoreRowModel().rowsById[e.parentId] ?? e.table.getRow(e.parentId, !0);
}
function qp(e) {
  const t = [];
  let n = e;
  for (; ; ) {
    const r = n.getParentRow();
    if (!r) break;
    t.push(r), n = r;
  }
  return t.reverse();
}
function Gp(e) {
  const t = e.table.getAllLeafColumns();
  let n = e._cellsCache;
  n || (n = e._cellsCache = /* @__PURE__ */ new WeakMap());
  const r = new Array(t.length);
  for (let o = 0; o < t.length; o++) {
    const s = t[o];
    let i = n.get(s);
    i || (i = jp(s, e, e.table), n.set(s, i)), r[o] = i;
  }
  return r;
}
function Xp(e) {
  const t = ee(), n = e.getAllCells();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.column.id] = o;
  }
  return t;
}
function Yp(e, t, n, r) {
  var o, s;
  return ((s = (o = t.options).getRowId) == null ? void 0 : s.call(o, e, n, r)) ?? (r ? `${r.id}.${n}` : String(n));
}
function Zp(e, t, n) {
  let r = (n ? e.getPrePaginatedRowModel() : e.getRowModel()).rowsById[t];
  if (!r && (r = e.getCoreRowModel().rowsById[t], !r))
    throw new Error();
  return r;
}
const Jp = {
  assignRowPrototype: (e, t) => {
    Je("coreRowsFeature", e, t, {
      row_getDisplayIndex: { fn: (n) => zp(n) },
      row_getAllCellsByColumnId: {
        fn: (n) => Xp(n),
        memoDeps: (n) => [n.getAllCells()]
      },
      row_getAllCells: {
        fn: (n) => Gp(n),
        memoDeps: (n) => [n.table.getAllLeafColumns()]
      },
      row_getLeafRows: {
        fn: (n) => $p(n),
        memoDeps: (n) => [n.subRows]
      },
      row_getParentRow: { fn: (n) => Up(n) },
      row_getParentRows: { fn: (n) => qp(n) },
      row_getUniqueValues: { fn: (n, r) => Bp(n, r) },
      row_getValue: { fn: (n, r) => Vp(n, r) },
      row_renderValue: { fn: (n, r) => Np(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    ft("coreRowsFeature", e, {
      table_getRowsInDisplayOrder: {
        fn: () => Kp(e),
        memoDeps: () => {
          var t;
          return [
            e.getPrePaginatedRowModel().rows,
            e.options.paginateExpandedRows,
            e.options.paginateExpandedRows === !1 ? (t = e.atoms.expanded) == null ? void 0 : t.get() : void 0
          ];
        }
      },
      table_getRowId: { fn: (t, n, r) => Yp(t, e, n, r) },
      table_getRow: { fn: (t, n) => Zp(e, t, n) },
      table_getMaxSubRowDepth: {
        fn: () => Wp(e),
        memoDeps: () => [e.getCoreRowModel()]
      }
    });
  }
};
function pc(e, t, n = (r, o) => r === o) {
  const r = t === void 0 ? e.options.state : t;
  e._reactivity.batch(() => {
    if (r) for (const o in r) {
      const s = e.baseAtoms[o];
      if (!s) continue;
      const i = r[o], a = i === void 0 ? e.initialState[o] : i;
      n(e._reactivity.untrack(() => s.get()), a) || s.set(() => a);
    }
  });
}
function Qp(e, t, n = (r, o) => r === o) {
  e._reactivity.batch(() => {
    var r, o;
    pc(e, t, n), (o = (r = e._reactivity).commit) == null || o.call(r);
  });
}
function eh(e) {
  var r, o;
  const t = ut(e.initialState);
  e._reactivity.batch(() => {
    const s = Object.keys(t);
    for (let i = 0; i < s.length; i++) {
      const a = s[i];
      e.baseAtoms[a].set(t[a]);
    }
  });
  const n = Object.values(e._features);
  for (let s = 0; s < n.length; s++) (o = (r = n[s]).resetTableInstanceData) == null || o.call(r, e);
}
function th(e, t) {
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
function nh(e, t, n) {
  const r = th(e, po(t, e.options));
  e.optionsStore ? e.optionsStore.set(() => r) : e.options = r, Qp(e, r.state ?? null);
}
const rh = { constructTableAPIs: (e) => {
  ft("coreTablesFeature", e, {
    table_reset: { fn: () => eh(e) },
    table_setOptions: { fn: (t) => nh(e, t) }
  });
} }, oh = {
  coreCellsFeature: wg,
  coreColumnsFeature: $g,
  coreHeadersFeature: Zg,
  coreRowModelsFeature: Hp,
  coreRowsFeature: Jp,
  coreTablesFeature: rh
};
function sh(e) {
  const t = e;
  return Object.defineProperty(e, "state", { get() {
    return e.get();
  } }), "set" in e && (t.setState = e.set.bind(e)), t;
}
function ih(e, t) {
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
  const n = al(e);
  if (n.length !== al(t).length) return !1;
  for (let r = 0; r < n.length; r++) if (!Object.prototype.hasOwnProperty.call(t, n[r]) || !Object.is(e[n[r]], t[n[r]])) return !1;
  return !0;
}
function al(e) {
  return Object.keys(e).concat(Object.getOwnPropertySymbols(e));
}
function lh(e, t = {}) {
  return Object.values(e).forEach((n) => {
    var r;
    t = ((r = n.getInitialState) == null ? void 0 : r.call(n, t)) ?? t;
  }), ut(t);
}
function ah(e) {
  var H, X;
  const t = e.features.coreReactivityFeature, { aggregationFns: n, columnMeta: r, coreRowModel: o, expandedRowModel: s, facetedMinMaxValues: i, facetedRowModel: a, facetedUniqueValues: c, filterFns: f, filterMeta: d, filteredRowModel: h, groupedRowModel: w, paginatedRowModel: y, sortFns: O, sortedRowModel: M, tableMeta: A, ...z } = e.features, S = {
    _cellInstanceInitFns: [],
    _columnInstanceInitFns: [],
    _features: {
      ...oh,
      ...z
    },
    _headerGroupInstanceInitFns: [],
    _headerInstanceInitFns: [],
    _reactivity: t,
    _rowInstanceInitFns: [],
    _rowModelFns: {
      aggregationFns: n,
      filterFns: f,
      sortFns: O
    },
    _rowModels: {},
    atoms: {},
    baseAtoms: {}
  }, I = Object.values(S._features), C = {
    ...I.reduce((B, j) => {
      var Z;
      return Object.assign(B, (Z = j.getDefaultTableOptions) == null ? void 0 : Z.call(j, S));
    }, {}),
    ...e
  };
  if (t.wrapExternalAtoms && C.atoms) for (const [B, j] of Object.entries(C.atoms)) {
    const Z = j, re = t.createWritableAtom(Z.get(), { debugName: `externalAtom/${B}` });
    C.atoms[B] = re;
    let le = !1;
    const ve = Z.subscribe((se) => {
      le || re.set(se);
    }), we = re.subscribe((se) => {
      le = !0, Z.set(se), le = !1;
    });
    t.addSubscription(ve), t.addSubscription(we);
  }
  t.createOptionsStore ? (S.optionsStore = t.createWritableAtom(C, { debugName: "table/optionsStore" }), Object.defineProperty(S, "options", {
    configurable: !0,
    enumerable: !0,
    get() {
      return S.optionsStore.get();
    },
    set(B) {
      S.optionsStore.set(() => B);
    }
  })) : S.options = C, S.initialState = lh(S._features, S.options.initialState);
  const T = Object.keys(S.initialState);
  for (let B = 0; B < T.length; B++) {
    const j = T[B];
    S.baseAtoms[j] = t.createWritableAtom(S.initialState[j], { debugName: `table/baseAtoms/${j}` }), S.atoms[j] = t.createReadonlyAtom(() => {
      var we;
      const Z = S.options, re = (we = Z.atoms) == null ? void 0 : we[j], le = re ? re.get() : S.baseAtoms[j].get();
      if (re) return le;
      const ve = Z.state;
      if (ve && Yt(ve, j)) {
        const se = ve[j];
        return se === void 0 ? S.initialState[j] : se;
      }
      return le;
    }, { debugName: `table/atoms/${j}` });
  }
  pc(S), S.store = sh(t.createReadonlyAtom(() => {
    const B = {};
    for (let j = 0; j < T.length; j++) {
      const Z = T[j];
      B[Z] = S.atoms[Z].get();
    }
    return B;
  }, {
    compare: ih,
    debugName: "table/store"
  }));
  for (let B = 0; B < I.length; B++) {
    const j = I[B];
    (H = j.initTableInstanceData) == null || H.call(j, S), j.initCellInstanceData && S._cellInstanceInitFns.push(j.initCellInstanceData.bind(j)), j.initColumnInstanceData && S._columnInstanceInitFns.push(j.initColumnInstanceData.bind(j)), j.initHeaderGroupInstanceData && S._headerGroupInstanceInitFns.push(j.initHeaderGroupInstanceData.bind(j)), j.initHeaderInstanceData && S._headerInstanceInitFns.push(j.initHeaderInstanceData.bind(j)), j.initRowInstanceData && S._rowInstanceInitFns.push(j.initRowInstanceData.bind(j)), (X = j.constructTableAPIs) == null || X.call(j, S);
  }
  return S;
}
function ch() {
  return ee();
}
function hc() {
  return {
    size: 150,
    minSize: 20,
    maxSize: Number.MAX_SAFE_INTEGER
  };
}
function yo(e) {
  var o;
  const t = hc(), n = (o = e.table.atoms.columnSizing) == null ? void 0 : o.get(), r = n && Yt(n, e.id) ? n[e.id] : void 0;
  return Math.min(Math.max(e.columnDef.minSize ?? t.minSize, r ?? e.columnDef.size ?? t.size), e.columnDef.maxSize ?? t.maxSize);
}
function Fr(e) {
  const t = ee(), n = ee(), r = new Array(e.length);
  let o = 0;
  for (let i = 0; i < e.length; i++) {
    const a = e[i], c = G(a, "getSize", yo);
    r[i] = c, t[a.id] = o, o += c;
  }
  let s = 0;
  for (let i = e.length - 1; i >= 0; i--)
    n[e[i].id] = s, s += r[i];
  return {
    starts: t,
    afters: n
  };
}
function Zs(e) {
  return {
    all: Fr(Tr(e)),
    center: Fr(Tr(e, "center")),
    start: Fr(Tr(e, "start")),
    end: Fr(Tr(e, "end"))
  };
}
function mc(e) {
  return e === "start" ? "start" : e === "end" ? "end" : e === "center" ? "center" : "all";
}
function uh(e, t) {
  return G(e.table, "getColumnOffsets", Zs)[mc(t)].starts[e.id] ?? 0;
}
function fh(e, t) {
  return G(e.table, "getColumnOffsets", Zs)[mc(t)].afters[e.id] ?? 0;
}
function dh(e) {
  bo(e.table, (t) => {
    const n = ee(), r = Object.keys(t);
    for (let o = 0; o < r.length; o++) {
      const s = r[o];
      s !== e.id && (n[s] = t[s]);
    }
    return n;
  });
}
function vc(e) {
  if (!e.subHeaders.length) return yo(e.column);
  let t = 0;
  for (let n = 0; n < e.subHeaders.length; n++) t += vc(e.subHeaders[n]);
  return t;
}
function Jt(e) {
  return vc(e);
}
function wc(e) {
  var t;
  if (e.index > 0) {
    const n = (t = e.headerGroup) == null ? void 0 : t.headers[e.index - 1];
    if (n) return G(n, "getStart", wc) + G(n, "getSize", Jt);
  }
  return 0;
}
function bo(e, t) {
  var n, r;
  (r = (n = e.options).onColumnSizingChange) == null || r.call(n, t);
}
function gh(e, t) {
  bo(e, t ? ee() : Object.assign(ee(), ut(e.initialState.columnSizing ?? {})));
}
function ph(e) {
  var t;
  return ((t = e.getHeaderGroups()[0]) == null ? void 0 : t.headers.reduce((n, r) => n + Jt(r), 0)) ?? 0;
}
function hh(e) {
  var t;
  return ((t = G(e, "getStartHeaderGroups", bg)[0]) == null ? void 0 : t.headers.reduce((n, r) => n + Jt(r), 0)) ?? 0;
}
function mh(e) {
  var t;
  return ((t = G(e, "getCenterHeaderGroups", Sg)[0]) == null ? void 0 : t.headers.reduce((n, r) => n + Jt(r), 0)) ?? 0;
}
function vh(e) {
  var t;
  return ((t = G(e, "getEndHeaderGroups", _g)[0]) == null ? void 0 : t.headers.reduce((n, r) => n + Jt(r), 0)) ?? 0;
}
function Ms() {
  return {
    startOffset: null,
    startSize: null,
    deltaOffset: null,
    deltaPercentage: null,
    isResizingColumn: !1,
    columnSizingStart: []
  };
}
function yc(e) {
  return (e.columnDef.enableResizing ?? !0) && (e.table.options.enableColumnResizing ?? !0);
}
function wh(e) {
  var t, n;
  return ((n = (t = e.table.atoms.columnResizing) == null ? void 0 : t.get()) == null ? void 0 : n.isResizingColumn) === e.id;
}
function yh(e, t) {
  const n = e.table.getColumn(e.column.id), r = yc(n);
  return (o) => {
    if (!r || ns(o) && o.touches.length > 1)
      return;
    const s = Jt(e), i = e.getLeafHeaders().map((T) => [T.column.id, yo(T.column)]), a = ns(o) ? Math.round(o.touches[0].clientX) : o.clientX, c = ee(), f = (T, H) => {
      if (typeof H != "number") return;
      const X = n.table, B = X.options.columnResizeMode === "onChange" || T === "end";
      X._reactivity.batch(() => {
        Un(X, (j) => {
          const Z = X.options.columnResizeDirection === "rtl" ? -1 : 1, re = (H - (j.startOffset ?? 0)) * Z, le = j.startSize ?? 0, ve = Math.max(le > 0 ? re / le : 0, -0.999999);
          if (B) {
            const we = j.columnSizingStart;
            for (let se = 0; se < we.length; se++) {
              const ae = we[se], J = ae[1];
              c[ae[0]] = Math.round(Math.max(J > 0 ? J + J * ve : re / we.length, 0) * 100) / 100;
            }
          }
          return {
            ...j,
            deltaOffset: re,
            deltaPercentage: ve
          };
        }), B && bo(X, (j) => Object.assign(ee(), j, c));
      });
    };
    let d = null, h = !1, w;
    const y = () => {
      h ? (h = !1, f("move", w), d = requestAnimationFrame(y)) : d = null;
    }, O = (T) => {
      if (w = T, typeof requestAnimationFrame != "function") {
        f("move", T);
        return;
      }
      if (d !== null) {
        h = !0;
        return;
      }
      f("move", T), d = requestAnimationFrame(y);
    }, M = (T) => {
      d !== null && (cancelAnimationFrame(d), d = null, h = !1), n.table._reactivity.batch(() => {
        f("end", T ?? w), Un(n.table, (H) => ({
          ...H,
          isResizingColumn: !1,
          startOffset: null,
          startSize: null,
          deltaOffset: null,
          deltaPercentage: null,
          columnSizingStart: []
        }));
      });
    }, A = t || (typeof document < "u" ? document : null), z = {
      moveHandler: (T) => O(T.clientX),
      upHandler: (T) => {
        A == null || A.removeEventListener("mousemove", z.moveHandler), A == null || A.removeEventListener("mouseup", z.upHandler), M(T.clientX);
      }
    }, S = {
      moveHandler: (T) => (T.cancelable && (T.preventDefault(), T.stopPropagation()), O(T.touches[0].clientX), !1),
      upHandler: (T) => {
        var H;
        I(), T.cancelable && (T.preventDefault(), T.stopPropagation()), M((H = T.touches[0]) == null ? void 0 : H.clientX);
      },
      cancelHandler: () => {
        I(), M();
      }
    }, I = () => {
      A == null || A.removeEventListener("touchmove", S.moveHandler), A == null || A.removeEventListener("touchend", S.upHandler), A == null || A.removeEventListener("touchcancel", S.cancelHandler);
    }, C = _h() ? { passive: !1 } : !1;
    ns(o) ? (A == null || A.addEventListener("touchmove", S.moveHandler, C), A == null || A.addEventListener("touchend", S.upHandler, C), A == null || A.addEventListener("touchcancel", S.cancelHandler, C)) : (A == null || A.addEventListener("mousemove", z.moveHandler, C), A == null || A.addEventListener("mouseup", z.upHandler, C)), Un(n.table, (T) => ({
      ...T,
      startOffset: a,
      startSize: s,
      deltaOffset: 0,
      deltaPercentage: 0,
      columnSizingStart: i,
      isResizingColumn: n.id
    }));
  };
}
function Un(e, t) {
  var n, r;
  (r = (n = e.options).onColumnResizingChange) == null || r.call(n, t);
}
function bh(e, t) {
  Un(e, t ? Ms() : ut(e.initialState.columnResizing ?? Ms()));
}
let Hr = null;
function _h() {
  if (typeof Hr == "boolean") return Hr;
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
  return Hr = e, Hr;
}
function ns(e) {
  return e.type === "touchstart";
}
const Sh = {
  getInitialState: (e) => ({
    columnResizing: Ms(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    columnResizeMode: "onEnd",
    columnResizeDirection: "ltr",
    onColumnResizingChange: ir("columnResizing", e)
  }),
  assignColumnPrototype: (e, t) => {
    Je("columnResizingFeature", e, t, {
      column_getCanResize: { fn: (n) => yc(n) },
      column_getIsResizing: { fn: (n) => wh(n) }
    });
  },
  assignHeaderPrototype: (e, t) => {
    Je("columnResizingFeature", e, t, { header_getResizeHandler: { fn: (n, r) => yh(n, r) } });
  },
  constructTableAPIs: (e) => {
    ft("columnResizingFeature", e, {
      table_setColumnResizing: { fn: (t) => Un(e, t) },
      table_resetHeaderSizeInfo: { fn: (t) => bh(e, t) }
    });
  }
}, xh = {
  getInitialState: (e) => ({
    columnSizing: ch(),
    ...e
  }),
  getDefaultColumnDef: () => hc(),
  getDefaultTableOptions: (e) => ({ onColumnSizingChange: ir("columnSizing", e) }),
  assignColumnPrototype: (e, t) => {
    Je("columnSizingFeature", e, t, {
      column_getSize: {
        fn: (n) => yo(n),
        memoDeps: (n) => {
          var r, o;
          return [t.options.columns, (o = (r = t.atoms.columnSizing) == null ? void 0 : r.get()) == null ? void 0 : o[n.id]];
        }
      },
      column_getStart: { fn: (n, r) => uh(n, r) },
      column_getAfter: { fn: (n, r) => fh(n, r) },
      column_resetSize: { fn: (n) => dh(n) }
    });
  },
  assignHeaderPrototype: (e, t) => {
    Je("columnSizingFeature", e, t, {
      header_getSize: {
        fn: (n) => Jt(n),
        memoDeps: (n) => {
          var r, o, s;
          return [t.options.columns, n.column.columns.length > 0 ? (r = t.atoms.columnSizing) == null ? void 0 : r.get() : (s = (o = t.atoms.columnSizing) == null ? void 0 : o.get()) == null ? void 0 : s[n.column.id]];
        }
      },
      header_getStart: {
        fn: (n) => wc(n),
        memoDeps: () => {
          var n, r, o, s, i;
          return [
            t.options.columns,
            (n = t.atoms.columnSizing) == null ? void 0 : n.get(),
            (r = t.atoms.columnOrder) == null ? void 0 : r.get(),
            (o = t.atoms.columnPinning) == null ? void 0 : o.get(),
            (s = t.atoms.columnVisibility) == null ? void 0 : s.get(),
            (i = t.atoms.grouping) == null ? void 0 : i.get(),
            t.options.groupedColumnMode
          ];
        }
      }
    });
  },
  constructTableAPIs: (e) => {
    ft("columnSizingFeature", e, {
      table_getColumnOffsets: {
        fn: () => Zs(e),
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
      table_setColumnSizing: { fn: (t) => bo(e, t) },
      table_resetColumnSizing: { fn: (t) => gh(e, t) },
      table_getTotalSize: {
        fn: () => ph(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.columnSizing) == null ? void 0 : t.get(), e.getHeaderGroups()];
        }
      },
      table_getStartTotalSize: {
        fn: () => hh(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.columnSizing) == null ? void 0 : t.get(), e.getHeaderGroups()];
        }
      },
      table_getCenterTotalSize: {
        fn: () => mh(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.columnSizing) == null ? void 0 : t.get(), e.getHeaderGroups()];
        }
      },
      table_getEndTotalSize: {
        fn: () => vh(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.columnSizing) == null ? void 0 : t.get(), e.getHeaderGroups()];
        }
      }
    });
  }
}, Rh = {
  getInitialState: (e) => ({
    expanded: cp(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onExpandedChange: ir("expanded", e),
    paginateExpandedRows: !0
  }),
  assignRowPrototype: (e, t) => {
    Je("rowExpandingFeature", e, t, {
      row_toggleExpanded: { fn: (n, r) => nc(n, r) },
      row_getIsExpanded: { fn: (n) => vo(n) },
      row_getCanExpand: { fn: (n) => qt(n) },
      row_getIsAllParentsExpanded: { fn: (n) => gp(n) },
      row_getToggleExpandedHandler: { fn: (n) => pp(n) }
    });
  },
  constructTableAPIs: (e) => {
    ft("rowExpandingFeature", e, {
      table_autoResetExpanded: { fn: () => Za(e) },
      table_setExpanded: { fn: (t) => Zr(e, t) },
      table_toggleAllRowsExpanded: { fn: (t) => Ja(e, t) },
      table_resetExpanded: { fn: (t) => Qa(e, t) },
      table_getCanSomeRowsExpand: { fn: () => ec(e) },
      table_getToggleAllRowsExpandedHandler: { fn: () => up(e) },
      table_getIsSomeRowsExpanded: { fn: () => fp(e) },
      table_getIsAllRowsExpanded: { fn: () => tc(e) },
      table_getExpandedDepth: { fn: () => dp(e) }
    });
  }
};
function Ch() {
  return ee();
}
function bn(e, t) {
  var n, r;
  (r = (n = e.options).onRowSelectionChange) == null || r.call(n, t);
}
function Ih(e, t) {
  e._lastSelectedRowId = null, bn(e, t ? ee() : Object.assign(ee(), ut(e.initialState.rowSelection ?? {})));
}
function bc(e, t, n) {
  e._lastSelectedRowId = null, bn(e, (r) => {
    if (t = typeof t < "u" ? t : !G(e, "getIsAllRowsSelected", xc), n != null && n.deselectAll && !t) return ee();
    const o = Object.assign(ee(), r), s = e.getPreGroupedRowModel().flatRows;
    if (t) {
      const i = /* @__PURE__ */ new Map();
      s.forEach((a) => {
        Qr(a, i) && (o[a.id] = !0);
      });
    } else s.forEach((i) => {
      Ct(i) && delete o[i.id];
    });
    return o;
  });
}
function _c(e, t, n) {
  e._lastSelectedRowId = null, bn(e, (r) => {
    const o = typeof t < "u" ? t : !G(e, "getIsAllPageRowsSelected", Rc);
    if (n != null && n.deselectAll && !o) return ee();
    const s = Object.assign(ee(), r);
    return e.getRowModel().rows.forEach((i) => {
      So(s, i.id, o, !0, e, !0);
    }), s;
  });
}
function Mh(e) {
  return e.getCoreRowModel();
}
function Eh(e) {
  const t = e.getCoreRowModel();
  return G(e, "getIsSomeRowsSelected", _o) ? ei(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: ee()
  };
}
function Ah(e) {
  const t = e.getFilteredRowModel();
  return G(e, "getIsSomeRowsSelected", _o) ? ei(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: ee()
  };
}
function Oh(e) {
  const t = e.getSortedRowModel();
  return G(e, "getIsSomeRowsSelected", _o) ? ei(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: ee()
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
    const s = /* @__PURE__ */ new Map();
    t.some((i) => !ar(i, n) && Qr(i, s)) && (r = !1);
  }
  return r;
}
function Rc(e) {
  var s;
  const t = e.getPaginatedRowModel().flatRows, n = ((s = e.atoms.rowSelection) == null ? void 0 : s.get()) ?? {}, r = /* @__PURE__ */ new Map();
  let o = !1;
  for (let i = 0; i < t.length; i++) {
    const a = t[i];
    if (ar(a, n))
      !o && Qr(a, r) && (o = !0);
    else if (Qr(a, r)) return !1;
  }
  return o;
}
function _o(e) {
  return G(e, "getSelectedRowIds", Sc).length > 0;
}
function Ph(e) {
  return e.getPaginatedRowModel().flatRows.filter((t) => Ct(t)).some((t) => Js(t) || G(t, "getIsSomeSelected", Ic));
}
function Dh(e) {
  return (t) => {
    bc(e, t.target.checked);
  };
}
function kh(e) {
  return (t) => {
    _c(e, t.target.checked);
  };
}
function Cc(e, t, n) {
  const r = Js(e);
  bn(e.table, (o) => {
    t = typeof t < "u" ? t : !r;
    const s = Object.assign(ee(), o);
    return So(s, e.id, t, ((n == null ? void 0 : n.selectChildren) ?? !0) && Ut(e), e.table), !t && (n != null && n.deselectParents) && Mc(s, e), s;
  });
}
function Js(e) {
  var t;
  return ar(e, ((t = e.table.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function Ic(e) {
  return ti(e) === "some";
}
function Th(e) {
  return ti(e) === "all";
}
function Ct(e) {
  const t = e.table.options;
  return typeof t.enableRowSelection == "function" ? t.enableRowSelection(e) : t.enableRowSelection ?? !0;
}
function Qs(e) {
  const t = e.table.options;
  return typeof t.enableSubRowSelection == "function" ? t.enableSubRowSelection(e) : t.enableSubRowSelection ?? !0;
}
function Ut(e) {
  const t = e.table.options;
  return typeof t.enableMultiRowSelection == "function" ? t.enableMultiRowSelection(e) : t.enableMultiRowSelection ?? !0;
}
function Fh(e, t) {
  const n = Ct(e);
  return (r) => {
    var c, f;
    if (!n) return;
    const o = r, s = e.table, i = o.target.checked, a = s._lastSelectedRowId;
    (!(s.options.enableRowRangeSelection !== !1 && a !== null && Ut(e) && (((f = (c = s.options).isRowRangeSelectionEvent) == null ? void 0 : f.call(c, r)) ?? !1)) || !Hh(e, a, i, t)) && Cc(e, i, t), s._lastSelectedRowId = e.id;
  };
}
function Hh(e, t, n, r) {
  const o = (r == null ? void 0 : r.selectChildren) ?? !0, s = e.table, i = s.getRowsInDisplayOrder(), a = s.getPrePaginatedRowModel().rowsById[t] ?? s.getCoreRowModel().rowsById[t];
  if (!a) return !1;
  const c = a.getDisplayIndex(), f = e.getDisplayIndex(), d = i[c], h = i[f];
  if (c < 0 || f < 0 || c >= i.length || f >= i.length || (d == null ? void 0 : d.id) !== a.id || (h == null ? void 0 : h.id) !== e.id || !Ut(a) || !Ut(e)) return !1;
  const w = Math.min(c, f), y = Math.max(c, f);
  return bn(s, (O) => {
    const M = Object.assign(ee(), O);
    for (let A = w; A <= y; A++) {
      const z = i[A];
      !Ct(z) || !Ut(z) || (So(M, z.id, n, o, s), !n && (r != null && r.deselectParents) && Mc(M, z));
    }
    return M;
  }), !0;
}
function So(e, t, n, r, o, s) {
  const i = o.getRow(t, !0);
  n ? (Ut(i) || Object.keys(e).forEach((a) => delete e[a]), Ct(i) && (e[t] = !0)) : (!s || Ct(i)) && delete e[t], r && i.subRows.length && Qs(i) && i.subRows.forEach((a) => So(e, a.id, n, r, o, s));
}
function Qr(e, t) {
  if (!Ct(e)) return !1;
  const n = e.table;
  if (n.options.enableSubRowSelection === !0) return !0;
  const r = e.parentId;
  if (r === void 0) return !0;
  const o = t.get(r);
  if (o !== void 0) return o;
  const s = n.getCoreRowModel().rowsById, i = [];
  let a = !0, c = r;
  for (; c !== void 0; ) {
    const f = t.get(c);
    if (f !== void 0) {
      a = f;
      break;
    }
    i.push(c);
    const d = s[c] ?? n.getRow(c, !0);
    if (!Qs(d)) {
      a = !1;
      break;
    }
    c = d.parentId;
  }
  return i.forEach((f) => t.set(f, a)), a;
}
function Mc(e, t) {
  const n = t.table.getCoreRowModel().rowsById;
  let r = t.parentId;
  for (; r !== void 0; )
    delete e[r], r = (n[r] ?? t.table.getRow(r, !0)).parentId;
}
function Ec(e, t, n, r) {
  const o = [];
  for (let s = 0; s < e.length; s++) {
    const i = e[s], a = ar(i, t);
    if (a && (n.push(i), r[i.id] = i), i.subRows.length) {
      const c = Ec(i.subRows, t, n, r);
      if (a) {
        const f = Object.create(Object.getPrototypeOf(i));
        ja(f, i), f.subRows = c, o.push(f);
      }
    } else a && o.push(i);
  }
  return o;
}
function ei(e, t) {
  var s;
  const n = [], r = ee(), o = ((s = t.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  return {
    rows: Ec(e.rows, o, n, r),
    flatRows: n,
    rowsById: r
  };
}
function ar(e, t) {
  return !!(Yt(t, e.id) && t[e.id]);
}
function ti(e) {
  var s;
  if (!e.subRows.length) return !1;
  const t = ((s = e.table.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  let n = !1, r = !0, o = !1;
  for (let i = 0; i < e.subRows.length; i++) {
    const a = e.subRows[i];
    if (n && !r) break;
    if (Ct(a) && (o = !0, ar(a, t) ? n = !0 : r = !1), a.subRows.length) {
      const c = ti(a);
      c === "all" ? (n = !0, o = !0) : c === "some" ? (n = !0, r = !1, o = !0) : r = !1;
    }
  }
  return o ? r ? "all" : n ? "some" : !1 : !1;
}
const Lh = {
  initTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  resetTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  getInitialState: (e) => ({
    rowSelection: Ch(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onRowSelectionChange: ir("rowSelection", e),
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
    Je("rowSelectionFeature", e, t, {
      row_toggleSelected: { fn: (n, r, o) => Cc(n, r, o) },
      row_getIsSelected: { fn: (n) => Js(n) },
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
        fn: (n) => Th(n),
        memoDeps: (n) => {
          var r;
          return [
            n.subRows,
            (r = n.table.atoms.rowSelection) == null ? void 0 : r.get(),
            n.table.options.enableRowSelection
          ];
        }
      },
      row_getCanSelect: { fn: (n) => Ct(n) },
      row_getCanSelectSubRows: { fn: (n) => Qs(n) },
      row_getCanMultiSelect: { fn: (n) => Ut(n) },
      row_getToggleSelectedHandler: { fn: (n, r) => Fh(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    ft("rowSelectionFeature", e, {
      table_setRowSelection: { fn: (t) => bn(e, t) },
      table_resetRowSelection: { fn: (t) => Ih(e, t) },
      table_toggleAllRowsSelected: { fn: (t, n) => bc(e, t, n) },
      table_toggleAllPageRowsSelected: { fn: (t, n) => _c(e, t, n) },
      table_getPreSelectedRowModel: { fn: () => Mh(e) },
      table_getSelectedRowModel: {
        fn: () => Eh(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getCoreRowModel()];
        }
      },
      table_getFilteredSelectedRowModel: {
        fn: () => Ah(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getFilteredRowModel()];
        }
      },
      table_getGroupedSelectedRowModel: {
        fn: () => Oh(e),
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
        fn: () => _o(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get()];
        }
      },
      table_getIsSomePageRowsSelected: {
        fn: () => Ph(e),
        memoDeps: () => {
          var t;
          return [
            (t = e.atoms.rowSelection) == null ? void 0 : t.get(),
            e.getPaginatedRowModel(),
            e.options.enableRowSelection
          ];
        }
      },
      table_getToggleAllRowsSelectedHandler: { fn: () => Dh(e) },
      table_getToggleAllPageRowsSelectedHandler: { fn: () => kh(e) }
    });
  }
}, jh = {
  getInitialState(e) {
    return {
      sorting: wp(),
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
      onSortingChange: ir("sorting", e),
      isMultiSortEvent: (t) => t.shiftKey
    };
  },
  assignColumnPrototype(e, t) {
    Je("rowSortingFeature", e, t, {
      column_getAutoSortFn: { fn: (n) => sc(n) },
      column_getAutoSortDir: { fn: (n) => ic(n) },
      column_getSortFn: { fn: (n) => lc(n) },
      column_toggleSorting: { fn: (n, r, o) => ac(n, r, o) },
      column_getFirstSortDir: { fn: (n) => cc(n) },
      column_getNextSortingOrder: { fn: (n, r) => uc(n, r) },
      column_getCanSort: { fn: (n) => Ys(n) },
      column_getCanMultiSort: { fn: (n) => Jr(n) },
      column_getIsSorted: { fn: (n) => fc(n) },
      column_getSortIndex: { fn: (n) => bp(n) },
      column_clearSorting: { fn: (n) => _p(n) },
      column_getToggleSortingHandler: { fn: (n) => Sp(n) }
    });
  },
  constructTableAPIs(e) {
    ft("rowSortingFeature", e, {
      table_setSorting: { fn: (t) => wo(e, t) },
      table_resetSorting: { fn: (t) => oc(e, t) }
    });
  }
};
function zh() {
  return (e) => {
    const t = e;
    return lr({
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
      fn: () => Kh(t)
    });
  };
}
function Kh(e) {
  var r;
  const t = e.getPreExpandedRowModel(), n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return !t.rows.length || n !== !0 && !Object.keys(n ?? {}).length || !e.options.paginateExpandedRows && !e.options.manualPagination ? t : Vh(t);
}
function Vh(e) {
  const t = [], n = (r) => {
    t.push(r), r.subRows.length && vo(r) && r.subRows.forEach(n);
  };
  return e.rows.forEach(n), {
    rows: t,
    flatRows: e.flatRows,
    rowsById: e.rowsById
  };
}
function Bh() {
  return (e) => {
    const t = e;
    return lr({
      feature: "rowSortingFeature",
      table: t,
      fnName: "table.getSortedRowModel",
      memoDeps: () => {
        var n;
        return [(n = t.atoms.sorting) == null ? void 0 : n.get(), t.getPreSortedRowModel()];
      },
      fn: () => Nh(t),
      onAfterUpdate: Ka(() => rc(t))
    });
  };
}
function Nh(e) {
  var c;
  const t = e.getPreSortedRowModel(), n = (c = e.atoms.sorting) == null ? void 0 : c.get();
  if (!t.rows.length || !(n != null && n.length)) return t;
  const r = [], o = n.filter((f) => {
    const d = e.getColumn(f.id);
    return d ? Ys(d) : !1;
  });
  if (!o.length) return t;
  const s = [];
  for (let f = 0; f < o.length; f++) {
    const d = o[f], h = e.getColumn(d.id);
    h && s.push({
      id: d.id,
      desc: d.desc,
      sortUndefined: h.columnDef.sortUndefined,
      invertSorting: h.columnDef.invertSorting,
      sortFn: lc(h)
    });
  }
  const i = (f, d) => {
    for (let h = 0; h < s.length; h++) {
      const w = s[h], y = w.sortUndefined, O = w.desc;
      let M = 0;
      if (y) {
        const A = f.getValue(w.id), z = d.getValue(w.id), S = A === void 0, I = z === void 0;
        if (S && I) continue;
        if (S || I) {
          if (y === "first") return S ? -1 : 1;
          if (y === "last") return S ? 1 : -1;
          M = S ? y : -y;
        }
      }
      if (M === 0 && (M = w.sortFn(f, d, w.id)), M !== 0)
        return O && (M *= -1), w.invertSorting && (M *= -1), M;
    }
    return f.index - d.index;
  }, a = (f) => {
    const d = f.slice();
    d.sort(i);
    let h = !1;
    for (let w = 0; w < d.length; w++) {
      const y = d[w];
      y !== f[w] && (h = !0);
      const O = r.length;
      if (r.push(y), y.subRows.length) {
        const M = a(y.subRows);
        if (M.changed) {
          const A = Object.create(Object.getPrototypeOf(y));
          ja(A, y), A.subRows = M.rows, d[w] = A, r[O] = A, h = !0;
        }
      }
    }
    return {
      rows: d,
      changed: h
    };
  };
  return {
    rows: a(t.rows).rows,
    flatRows: r,
    rowsById: t.rowsById
  };
}
function cl(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = $t(e[n]);
  return xs(e, t);
}
function $h(e) {
  return Object.keys(e).map((t) => $t(e[t]));
}
function Wh(e) {
  const t = (a, c) => {
    a.setOptions((f) => rl(f, cl(c)));
  }, n = cg(), r = xs(e, { features: {
    coreReactivityFeature: n,
    ...$t(e.features) ?? {}
  } }), o = xs(cl(r), { mergeOptions: (a, c) => rl(a, c) }), s = ah(o), i = s;
  return zl() && Gu(() => {
    var a;
    return (a = n.unmount) == null ? void 0 : a.call(n);
  }), be(() => $h(r), () => {
    t(s, r);
  }, { immediate: !0 }), be(() => {
    const a = $t(e.state), c = $t(e.atoms);
    if (!a) return [];
    const f = [];
    for (const d of Object.keys(i.initialState))
      !(d in a) || (c == null ? void 0 : c[d]) !== void 0 || f.push(a[d]);
    return f;
  }, (a) => {
    a.length > 0 && t(s, r);
  }, { immediate: !0 }), i.Subscribe = (a) => a.children(i.atoms), i;
}
function tr(e) {
  "@babel/helpers - typeof";
  return tr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, tr(e);
}
function Uh(e, t) {
  if (tr(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (tr(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function qh(e) {
  var t = Uh(e, "string");
  return tr(t) == "symbol" ? t : t + "";
}
function cr(e, t, n) {
  return (t = qh(t)) in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function Gh(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
    if (t.indexOf(r) !== -1) continue;
    n[r] = e[r];
  }
  return n;
}
function Xh(e, t) {
  if (e == null) return {};
  var n, r, o = Gh(e, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    for (r = 0; r < s.length; r++) n = s[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (o[n] = e[n]);
  }
  return o;
}
function Ac(e, t) {
  var n = Object.keys(e), r = Object.keys(t);
  return n.length !== r.length ? !1 : n.every(function(o) {
    return Object.is(e[o], t[o]);
  });
}
function Yh() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Ac, t = null;
  return function(n) {
    return t && e(t.value, n) || (t = {
      value: n
    }), t.value;
  };
}
var Zh = ["block"];
function ul(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function fl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ul(Object(n), !0).forEach(function(r) {
      cr(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ul(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Jh(e) {
  return {
    x: (e.right + e.left) / 2,
    y: (e.bottom + e.top) / 2
  };
}
function rs(e) {
  var t = e.client, n = e.borderBox, r = n.height / 4;
  return t.y <= n.top + r ? "reorder-above" : t.y >= n.bottom - r ? "reorder-below" : "make-child";
}
function Qh(e) {
  var t = e.element, n = e.input, r = e.currentLevel, o = e.indentPerLevel, s = e.mode, i = {
    x: n.clientX,
    y: n.clientY
  }, a = t.getBoundingClientRect();
  if (s === "standard") {
    var c = rs({
      borderBox: a,
      client: i
    });
    return {
      type: c,
      indentPerLevel: o,
      currentLevel: r
    };
  }
  var f = Jh(a);
  if (s === "expanded") {
    var d = rs({
      borderBox: a,
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
  if (i.x < a.left + h) {
    if (i.y < f.y)
      return {
        type: "reorder-above",
        indentPerLevel: o,
        currentLevel: r
      };
    var w = (i.x - a.left) / o, y = Math.max(Math.floor(w), 0);
    return {
      type: "reparent",
      desiredLevel: y,
      indentPerLevel: o,
      currentLevel: r
    };
  }
  return {
    type: rs({
      borderBox: a,
      client: i
    }),
    indentPerLevel: o,
    currentLevel: r
  };
}
function Oc(e, t) {
  return e.type !== t.type ? !1 : e.type === "instruction-blocked" && t.type === "instruction-blocked" ? Oc(e.desired, t.desired) : Ac(e, t);
}
var em = Yh(Oc);
function tm(e) {
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
function nm(e, t) {
  var n = t.block, r = Xh(t, Zh), o = Qh(r), s = tm({
    desired: o,
    block: n
  }), i = em(s);
  return fl(fl({}, e), {}, cr({}, Pc, i));
}
function dl(e) {
  var t;
  return (t = e[Pc]) !== null && t !== void 0 ? t : null;
}
var Pc = Symbol("tree-item-instruction");
function xo() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return function() {
    t.forEach(function(o) {
      return o();
    });
  };
}
function rm(e) {
  if (Array.isArray(e)) return e;
}
function om(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r, o, s, i, a = [], c = !0, f = !1;
    try {
      if (s = (n = n.call(e)).next, t !== 0) for (; !(c = (r = s.call(n)).done) && (a.push(r.value), a.length !== t); c = !0) ;
    } catch (d) {
      f = !0, o = d;
    } finally {
      try {
        if (!c && n.return != null && (i = n.return(), Object(i) !== i)) return;
      } finally {
        if (f) throw o;
      }
    }
    return a;
  }
}
function Es(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Dc(e, t) {
  if (e) {
    if (typeof e == "string") return Es(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Es(e, t) : void 0;
  }
}
function sm() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function kc(e, t) {
  return rm(e) || om(e, t) || Dc(e, t) || sm();
}
var gl = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Gt = {}, ur = {};
Object.defineProperty(ur, "__esModule", { value: !0 });
ur.bind = void 0;
function im(e, t) {
  var n = t.type, r = t.listener, o = t.options;
  return e.addEventListener(n, r, o), function() {
    e.removeEventListener(n, r, o);
  };
}
ur.bind = im;
var Ro = {}, dn = gl && gl.__assign || function() {
  return dn = Object.assign || function(e) {
    for (var t, n = 1, r = arguments.length; n < r; n++) {
      t = arguments[n];
      for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    }
    return e;
  }, dn.apply(this, arguments);
};
Object.defineProperty(Ro, "__esModule", { value: !0 });
Ro.bindAll = void 0;
var lm = ur;
function pl(e) {
  if (!(typeof e > "u"))
    return typeof e == "boolean" ? {
      capture: e
    } : e;
}
function am(e, t) {
  if (t == null)
    return e;
  var n = dn(dn({}, e), { options: dn(dn({}, pl(t)), pl(e.options)) });
  return n;
}
function cm(e, t, n) {
  var r = t.map(function(o) {
    var s = am(o, n);
    return (0, lm.bind)(e, s);
  });
  return function() {
    r.forEach(function(s) {
      return s();
    });
  };
}
Ro.bindAll = cm;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.bindAll = e.bind = void 0;
  var t = ur;
  Object.defineProperty(e, "bind", { enumerable: !0, get: function() {
    return t.bind;
  } });
  var n = Ro;
  Object.defineProperty(e, "bindAll", { enumerable: !0, get: function() {
    return n.bindAll;
  } });
})(Gt);
var Tc = "data-pdnd-honey-pot";
function Fc(e) {
  return e instanceof Element && e.hasAttribute(Tc);
}
function Hc(e) {
  var t = document.elementsFromPoint(e.x, e.y), n = kc(t, 2), r = n[0], o = n[1];
  return r ? Fc(r) ? o ?? null : r : null;
}
var um = 2147483647, fm = {
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
function Qt(e) {
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
var os = Qt(function() {
  return typeof HTMLElement < "u" && typeof HTMLElement.prototype.showPopover == "function";
});
function hl(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function ml(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? hl(Object(n), !0).forEach(function(r) {
      cr(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : hl(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
var nr = 2, vl = nr / 2;
function dm(e) {
  return {
    x: Math.floor(e.x),
    y: Math.floor(e.y)
  };
}
function gm(e) {
  return {
    x: e.x - vl,
    y: e.y - vl
  };
}
function pm(e) {
  return {
    x: Math.max(e.x, 0),
    y: Math.max(e.y, 0)
  };
}
function hm(e) {
  return {
    x: Math.min(e.x, window.innerWidth - nr),
    y: Math.min(e.y, window.innerHeight - nr)
  };
}
function wl(e) {
  var t = e.client, n = hm(pm(gm(dm(t))));
  return DOMRect.fromRect({
    x: n.x,
    y: n.y,
    width: nr,
    height: nr
  });
}
function yl(e) {
  var t = e.clientRect;
  return {
    left: "".concat(t.left, "px"),
    top: "".concat(t.top, "px"),
    width: "".concat(t.width, "px"),
    height: "".concat(t.height, "px")
  };
}
function mm(e) {
  var t = e.client, n = e.clientRect;
  return (
    // is within horizontal bounds
    t.x >= n.x && t.x <= n.x + n.width && // is within vertical bounds
    t.y >= n.y && t.y <= n.y + n.height
  );
}
function vm(e) {
  var t = e.initial, n = document.createElement("div");
  n.setAttribute(Tc, "true"), os() && n.setAttribute("popover", "manual");
  var r = wl({
    client: t
  });
  Object.assign(n.style, ml(ml({
    position: "fixed"
  }, os() ? (
    // needs to come first as it has 'inset: unset' which
    // needs to be overridden by our top / left values
    fm
  ) : {
    // Fallback: using maximum possible z-index so that this element
    // will always be on top of other positioned content.
    zIndex: um
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
  }, yl({
    clientRect: r
  }))), document.body.appendChild(n), os() && n.showPopover();
  var o = Gt.bind(window, {
    type: "pointermove",
    listener: function(i) {
      var a = {
        x: i.clientX,
        y: i.clientY
      };
      r = wl({
        client: a
      }), Object.assign(n.style, yl({
        clientRect: r
      }));
    },
    // using capture so we are less likely to be impacted by event stopping
    options: {
      capture: !0
    }
  });
  return function(i) {
    var a = i.current;
    if (o(), mm({
      client: a,
      clientRect: r
    })) {
      n.remove();
      return;
    }
    function c() {
      f(), n.remove();
    }
    var f = Gt.bindAll(window, [
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
function wm() {
  var e = null;
  function t() {
    return e = null, Gt.bind(window, {
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
      var i = s.eventName, a = s.payload;
      if (i === "onDragStart") {
        var c = a.location.initial.input, f = e ?? {
          x: c.clientX,
          y: c.clientY
        };
        r = vm({
          initial: f
        });
      }
      if (i === "onDrop") {
        var d, h = a.location.current.input;
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
function ym(e) {
  if (Array.isArray(e)) return Es(e);
}
function bm(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function _m() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Lc(e) {
  return ym(e) || bm(e) || Dc(e) || _m();
}
var Sm = Qt(function() {
  return navigator.userAgent.includes("Firefox");
}), ni = Qt(function() {
  var t = navigator, n = t.userAgent;
  return n.includes("AppleWebKit") && !n.includes("Chrome");
});
function xm(e) {
  return "nodeName" in e;
}
function Rm(e) {
  return xm(e) && e.ownerDocument !== document;
}
var As = {
  isLeavingWindow: Symbol("leaving"),
  isEnteringWindow: Symbol("entering")
};
(function() {
  if (typeof window > "u" || !ni())
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
  Gt.bindAll(
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
        !n.isOverWindow && n.enterCount === 0 && (s[As.isEnteringWindow] = !0), n.isOverWindow = !0, n.enterCount++;
      }
    }, {
      type: "dragleave",
      listener: function(s) {
        n.enterCount--, n.isOverWindow && n.enterCount === 0 && (s[As.isLeavingWindow] = !0, n.isOverWindow = !1);
      }
    }],
    // using `capture: true` so that adding event listeners
    // in bubble phase will have the correct symbols
    {
      capture: !0
    }
  );
})();
function Cm(e) {
  var t = e.dragLeave;
  return ni() ? t.hasOwnProperty(As.isLeavingWindow) : !1;
}
function Im(e) {
  var t = e.dragLeave, n = t.type, r = t.relatedTarget;
  return n !== "dragleave" ? !1 : ni() ? Cm({
    dragLeave: t
  }) : r == null ? !0 : Sm() ? Rm(r) : r instanceof HTMLIFrameElement;
}
function Mm(e) {
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
function qn(e) {
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
var Em = function(t) {
  var n = [], r = null, o = function() {
    for (var i = arguments.length, a = new Array(i), c = 0; c < i; c++)
      a[c] = arguments[c];
    n = a, !r && (r = requestAnimationFrame(function() {
      r = null, t.apply(void 0, n);
    }));
  };
  return o.cancel = function() {
    r && (cancelAnimationFrame(r), r = null);
  }, o;
}, ss = Em(function(e) {
  return e();
}), Lr = /* @__PURE__ */ function() {
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
function Am(e) {
  var t = e.source, n = e.initial, r = e.dispatchEvent, o = {
    dropTargets: []
  };
  function s(a) {
    r(a), o = {
      dropTargets: a.payload.location.current.dropTargets
    };
  }
  var i = {
    start: function(c) {
      var f = c.nativeSetDragImage, d = {
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
      }), Lr.schedule(function() {
        s({
          eventName: "onDragStart",
          payload: {
            source: t,
            location: d
          }
        });
      });
    },
    dragUpdate: function(c) {
      var f = c.current;
      Lr.flush(), ss.cancel(), s({
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
    drag: function(c) {
      var f = c.current;
      ss(function() {
        Lr.flush();
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
    drop: function(c) {
      var f = c.current, d = c.updatedSourcePayload;
      Lr.flush(), ss.cancel(), s({
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
var Os = {
  isActive: !1
};
function jc() {
  return !Os.isActive;
}
function Om(e) {
  return e.dataTransfer ? e.dataTransfer.setDragImage.bind(e.dataTransfer) : null;
}
function Pm(e) {
  var t = e.current, n = e.next;
  if (t.length !== n.length)
    return !0;
  for (var r = 0; r < t.length; r++)
    if (t[r].element !== n[r].element)
      return !0;
  return !1;
}
function Dm(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = e.dispatchEvent;
  if (!jc())
    return;
  var s = km({
    event: t,
    dragType: n,
    getDropTargetsOver: r
  });
  Os.isActive = !0;
  var i = {
    current: s
  };
  is({
    event: t,
    current: s.dropTargets
  });
  var a = Am({
    source: n.payload,
    dispatchEvent: o,
    initial: s
  });
  function c(y) {
    var O = Pm({
      current: i.current.dropTargets,
      next: y.dropTargets
    });
    i.current = y, O && a.dragUpdate({
      current: i.current
    });
  }
  function f(y) {
    var O = qn(y), M = Fc(y.target) ? Hc({
      x: O.clientX,
      y: O.clientY
    }) : y.target, A = r({
      target: M,
      input: O,
      source: n.payload,
      current: i.current.dropTargets
    });
    A.length && (y.preventDefault(), is({
      event: y,
      current: A
    })), c({
      dropTargets: A,
      input: O
    });
  }
  function d() {
    i.current.dropTargets.length && c({
      dropTargets: [],
      input: i.current.input
    }), a.drop({
      current: i.current,
      updatedSourcePayload: null
    }), h();
  }
  function h() {
    Os.isActive = !1, w();
  }
  var w = Gt.bindAll(
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
        f(O), a.drag({
          current: i.current
        });
      }
    }, {
      type: "dragenter",
      listener: f
    }, {
      type: "dragleave",
      listener: function(O) {
        Im({
          dragLeave: O
        }) && (c({
          input: i.current.input,
          dropTargets: []
        }), n.startedFrom === "external" && d());
      }
    }, {
      // A "drop" can only happen if the browser allowed the drop
      type: "drop",
      listener: function(O) {
        if (i.current = {
          dropTargets: i.current.dropTargets,
          input: qn(O)
        }, !i.current.dropTargets.length) {
          d();
          return;
        }
        O.preventDefault(), is({
          event: O,
          current: i.current.dropTargets
        }), a.drop({
          current: i.current,
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
        i.current = {
          dropTargets: i.current.dropTargets,
          input: qn(O)
        }, d();
      }
    }].concat(Lc(Mm({
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
  a.start({
    nativeSetDragImage: Om(t)
  });
}
function is(e) {
  var t, n = e.event, r = e.current, o = (t = r[0]) === null || t === void 0 ? void 0 : t.dropEffect;
  o != null && n.dataTransfer && (n.dataTransfer.dropEffect = o);
}
function km(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = qn(t);
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
var bl = {
  canStart: jc,
  start: Dm
}, Ps = /* @__PURE__ */ new Map();
function Tm(e) {
  var t = e.typeKey, n = e.mount, r = Ps.get(t);
  if (r)
    return r.usageCount++, r;
  var o = {
    typeKey: t,
    unmount: n(),
    usageCount: 1
  };
  return Ps.set(t, o), o;
}
function Fm(e) {
  var t = Tm(e);
  return function() {
    t.usageCount--, !(t.usageCount > 0) && (t.unmount(), Ps.delete(e.typeKey));
  };
}
function zc(e, t) {
  var n = t.attribute, r = t.value;
  return e.setAttribute(n, r), function() {
    return e.removeAttribute(n);
  };
}
function _l(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function At(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? _l(Object(n), !0).forEach(function(r) {
      cr(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : _l(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function ls(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = Hm(e)) || t) {
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
  var s, i = !0, a = !1;
  return { s: function() {
    n = n.call(e);
  }, n: function() {
    var f = n.next();
    return i = f.done, f;
  }, e: function(f) {
    a = !0, s = f;
  }, f: function() {
    try {
      i || n.return == null || n.return();
    } finally {
      if (a) throw s;
    }
  } };
}
function Hm(e, t) {
  if (e) {
    if (typeof e == "string") return Sl(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Sl(e, t) : void 0;
  }
}
function Sl(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function as(e) {
  return e.slice(0).reverse();
}
function Lm(e) {
  var t = e.typeKey, n = e.defaultDropEffect, r = /* @__PURE__ */ new WeakMap(), o = "data-drop-target-for-".concat(t), s = "[".concat(o, "]");
  function i(y) {
    return r.set(y.element, y), function() {
      return r.delete(y.element);
    };
  }
  function a(y) {
    var O = xo(zc(y.element, {
      attribute: o,
      value: "true"
    }), i(y));
    return Qt(O);
  }
  function c(y) {
    var O, M, A, z, S = y.source, I = y.target, C = y.input, T = y.result, H = T === void 0 ? [] : T;
    if (I == null)
      return H;
    if (!(I instanceof Element))
      return I instanceof Node ? c({
        source: S,
        target: I.parentElement,
        input: C,
        result: H
      }) : H;
    var X = I.closest(s);
    if (X == null)
      return H;
    var B = r.get(X);
    if (B == null)
      return H;
    var j = {
      input: C,
      source: S,
      element: B.element
    };
    if (B.canDrop && !B.canDrop(j))
      return c({
        source: S,
        target: B.element.parentElement,
        input: C,
        result: H
      });
    var Z = (O = (M = B.getData) === null || M === void 0 ? void 0 : M.call(B, j)) !== null && O !== void 0 ? O : {}, re = (A = (z = B.getDropEffect) === null || z === void 0 ? void 0 : z.call(B, j)) !== null && A !== void 0 ? A : n, le = {
      data: Z,
      element: B.element,
      dropEffect: re,
      // we are collecting _actual_ drop targets, so these are
      // being applied _not_ due to stickiness
      isActiveDueToStickiness: !1
    };
    return c({
      source: S,
      target: B.element.parentElement,
      input: C,
      // Using bubble ordering. Same ordering as `event.getPath()`
      result: [].concat(Lc(H), [le])
    });
  }
  function f(y) {
    var O = y.eventName, M = y.payload, A = ls(M.location.current.dropTargets), z;
    try {
      for (A.s(); !(z = A.n()).done; ) {
        var S, I = z.value, C = r.get(I.element), T = At(At({}, M), {}, {
          self: I
        });
        C == null || (S = C[O]) === null || S === void 0 || S.call(
          C,
          // I cannot seem to get the types right here.
          // TS doesn't seem to like that one event can need `nativeSetDragImage`
          // @ts-expect-error
          T
        );
      }
    } catch (H) {
      A.e(H);
    } finally {
      A.f();
    }
  }
  var d = {
    onGenerateDragPreview: f,
    onDrag: f,
    onDragStart: f,
    onDrop: f,
    onDropTargetChange: function(O) {
      var M = O.payload, A = new Set(M.location.current.dropTargets.map(function(J) {
        return J.element;
      })), z = /* @__PURE__ */ new Set(), S = ls(M.location.previous.dropTargets), I;
      try {
        for (S.s(); !(I = S.n()).done; ) {
          var C, T = I.value;
          z.add(T.element);
          var H = r.get(T.element), X = A.has(T.element), B = At(At({}, M), {}, {
            self: T
          });
          if (H == null || (C = H.onDropTargetChange) === null || C === void 0 || C.call(H, B), !X) {
            var j;
            H == null || (j = H.onDragLeave) === null || j === void 0 || j.call(H, B);
          }
        }
      } catch (J) {
        S.e(J);
      } finally {
        S.f();
      }
      var Z = ls(M.location.current.dropTargets), re;
      try {
        for (Z.s(); !(re = Z.n()).done; ) {
          var le, ve, we = re.value;
          if (!z.has(we.element)) {
            var se = At(At({}, M), {}, {
              self: we
            }), ae = r.get(we.element);
            ae == null || (le = ae.onDropTargetChange) === null || le === void 0 || le.call(ae, se), ae == null || (ve = ae.onDragEnter) === null || ve === void 0 || ve.call(ae, se);
          }
        }
      } catch (J) {
        Z.e(J);
      } finally {
        Z.f();
      }
    }
  };
  function h(y) {
    d[y.eventName](y);
  }
  function w(y) {
    var O = y.source, M = y.target, A = y.input, z = y.current, S = c({
      source: O,
      target: M,
      input: A
    });
    if (S.length >= z.length)
      return S;
    for (var I = as(z), C = as(S), T = [], H = 0; H < I.length; H++) {
      var X, B = I[H], j = C[H];
      if (j != null) {
        T.push(j);
        continue;
      }
      var Z = T[H - 1], re = I[H - 1];
      if ((Z == null ? void 0 : Z.element) !== (re == null ? void 0 : re.element))
        break;
      var le = r.get(B.element);
      if (!le)
        break;
      var ve = {
        input: A,
        source: O,
        element: le.element
      };
      if (le.canDrop && !le.canDrop(ve) || !((X = le.getIsSticky) !== null && X !== void 0 && X.call(le, ve)))
        break;
      T.push(At(At({}, B), {}, {
        // making it clear to consumers this drop target is active due to stickiness
        isActiveDueToStickiness: !0
      }));
    }
    return as(T);
  }
  return {
    dropTargetForConsumers: a,
    getIsOver: w,
    dispatchEvent: h
  };
}
function jm(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = zm(e)) || t) {
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
  var s, i = !0, a = !1;
  return { s: function() {
    n = n.call(e);
  }, n: function() {
    var f = n.next();
    return i = f.done, f;
  }, e: function(f) {
    a = !0, s = f;
  }, f: function() {
    try {
      i || n.return == null || n.return();
    } finally {
      if (a) throw s;
    }
  } };
}
function zm(e, t) {
  if (e) {
    if (typeof e == "string") return xl(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? xl(e, t) : void 0;
  }
}
function xl(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Rl(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Km(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Rl(Object(n), !0).forEach(function(r) {
      cr(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Rl(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Vm() {
  var e = /* @__PURE__ */ new Set(), t = null;
  function n(s) {
    t && (!s.canMonitor || s.canMonitor(t.canMonitorArgs)) && t.active.add(s);
  }
  function r(s) {
    var i = Km({}, s);
    e.add(i), n(i);
    function a() {
      e.delete(i), t && t.active.delete(i);
    }
    return Qt(a);
  }
  function o(s) {
    var i = s.eventName, a = s.payload;
    if (i === "onGenerateDragPreview") {
      t = {
        canMonitorArgs: {
          initial: a.location.initial,
          source: a.source
        },
        active: /* @__PURE__ */ new Set()
      };
      var c = jm(e), f;
      try {
        for (c.s(); !(f = c.n()).done; ) {
          var d = f.value;
          n(d);
        }
      } catch (A) {
        c.e(A);
      } finally {
        c.f();
      }
    }
    if (t) {
      for (var h = Array.from(t.active), w = 0, y = h; w < y.length; w++) {
        var O = y[w];
        if (t.active.has(O)) {
          var M;
          (M = O[i]) === null || M === void 0 || M.call(O, a);
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
function Bm(e) {
  var t = e.typeKey, n = e.mount, r = e.dispatchEventToSource, o = e.onPostDispatch, s = e.defaultDropEffect, i = Vm(), a = Lm({
    typeKey: t,
    defaultDropEffect: s
  });
  function c(h) {
    r == null || r(h), a.dispatchEvent(h), i.dispatchEvent(h), o == null || o(h);
  }
  function f(h) {
    var w = h.event, y = h.dragType;
    bl.start({
      event: w,
      dragType: y,
      getDropTargetsOver: a.getIsOver,
      dispatchEvent: c
    });
  }
  function d() {
    function h() {
      var w = {
        canStart: bl.canStart,
        start: f
      };
      return n(w);
    }
    return Fm({
      typeKey: t,
      mount: h
    });
  }
  return {
    registerUsage: d,
    dropTarget: a.dropTargetForConsumers,
    monitor: i.monitorForConsumers
  };
}
var Nm = Qt(function() {
  return navigator.userAgent.toLocaleLowerCase().includes("android");
}), $m = "pdnd:android-fallback", Cl = "text/plain", Wm = "text/uri-list", Um = "application/vnd.pdnd", eo = /* @__PURE__ */ new WeakMap();
function qm(e) {
  return eo.set(e.element, e), function() {
    eo.delete(e.element);
  };
}
var Il = wm(), Kc = Bm({
  typeKey: "element",
  defaultDropEffect: "move",
  mount: function(t) {
    return xo(Il.bindEvents(), Gt.bind(document, {
      type: "dragstart",
      listener: function(r) {
        var o, s, i, a, c, f;
        if (t.canStart(r) && !r.defaultPrevented && r.dataTransfer) {
          var d = r.target;
          if (d instanceof HTMLElement) {
            var h = eo.get(d);
            if (h) {
              var w = qn(r), y = {
                element: h.element,
                dragHandle: (o = h.dragHandle) !== null && o !== void 0 ? o : null,
                input: w
              };
              if (h.canDrag && !h.canDrag(y)) {
                r.preventDefault();
                return;
              }
              if (h.dragHandle) {
                var O = Hc({
                  x: w.clientX,
                  y: w.clientY
                });
                if (!h.dragHandle.contains(O)) {
                  r.preventDefault();
                  return;
                }
              }
              var M = (s = (i = h.getInitialDataForExternal) === null || i === void 0 ? void 0 : i.call(h, y)) !== null && s !== void 0 ? s : null;
              if (M)
                for (var A = 0, z = Object.entries(M); A < z.length; A++) {
                  var S = kc(z[A], 2), I = S[0], C = S[1];
                  r.dataTransfer.setData(I, C ?? "");
                }
              Nm() && !r.dataTransfer.types.includes(Cl) && !r.dataTransfer.types.includes(Wm) && r.dataTransfer.setData(Cl, $m), r.dataTransfer.setData(Um, "");
              var T = {
                element: h.element,
                dragHandle: (a = h.dragHandle) !== null && a !== void 0 ? a : null,
                data: (c = (f = h.getInitialData) === null || f === void 0 ? void 0 : f.call(h, y)) !== null && c !== void 0 ? c : {}
              }, H = {
                type: "element",
                payload: T,
                startedFrom: "internal"
              };
              t.start({
                event: r,
                dragType: H
              });
            }
          }
        }
      }
    }));
  },
  dispatchEventToSource: function(t) {
    var n, r, o = t.eventName, s = t.payload;
    (n = eo.get(s.source.element)) === null || n === void 0 || (r = n[o]) === null || r === void 0 || r.call(
      n,
      // I cannot seem to get the types right here.
      // TS doesn't seem to like that one event can need `nativeSetDragImage`
      // @ts-expect-error
      s
    );
  },
  onPostDispatch: Il.getOnPostDispatch()
}), Gm = Kc.dropTarget;
function Xm(e) {
  var t = xo(
    // making the draggable register the adapter rather than drop targets
    // this is because you *must* have a draggable element to start a drag
    // but you _might_ not have any drop targets immediately
    // (You might create drop targets async)
    Kc.registerUsage(),
    qm(e),
    zc(e.element, {
      attribute: "draggable",
      value: "true"
    })
  );
  return Qt(t);
}
const cs = /* @__PURE__ */ new Map(), mn = "pnl-tst-row";
function Ym(e, t) {
  return xo(
    Xm({
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
        return { type: mn, group: "", sourceId: "", key: null, keys: [] };
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
    Gm({
      element: e,
      // Position is deliberately not consulted here. pdnd settles `canDrop` when
      // the pointer enters the element, and the element is the whole layout, so an
      // answer given from the pointer's first position would stand for the rest of
      // the drag. Which pane the pointer is over, and whether that pane accepts
      // the drag at all, is decided in `getData`, which runs on every move.
      canDrop: ({ source: n }) => n.data.type === mn,
      getData: ({ input: n, source: r }) => {
        for (const o of t.panes) {
          const s = o.dropData(n, r.data);
          if (s) return s;
        }
        return { type: mn, key: null, paneId: "" };
      },
      onDrag: ({ self: n }) => {
        const r = n.data.key, o = dl(n.data);
        for (const s of t.panes)
          s.id() === n.data.paneId && r && o ? s.showDrop(r, o) : s.clearDrop();
      },
      onDragLeave: () => {
        for (const n of t.panes) n.clearDrop();
      },
      onDrop: ({ self: n, source: r, location: o }) => {
        for (const c of t.panes) c.clearDrop();
        const s = t.panes.find((c) => c.id() === n.data.paneId), i = n.data.key, a = dl(n.data);
        !s || !i || !a || a.type === "instruction-blocked" || s.drop(r.data, i, a, o.current.input);
      }
    })
  );
}
function Zm(e, t) {
  let n = cs.get(e);
  return n || (n = { panes: [] }, n.cleanup = Ym(e, n), cs.set(e, n)), n.panes.push(t), () => {
    var r;
    n.panes = n.panes.filter((o) => o !== t), !(n.panes.length > 0) && ((r = n.cleanup) == null || r.call(n), cs.delete(e));
  };
}
const Jm = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ef5350" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m6 10h-4v8a4 4 0 1 1-4-4 3.96 3.96 0 0 1 2 .555V8h6Z"/></svg>', Qm = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#ff7043" d="M2 2a1 1 0 0 0-1 1v10c0 .554.446 1 1 1h12c.554 0 1-.446 1-1V3a1 1 0 0 0-1-1zm0 3h12v8H2zm1 2 2 2-2 2 1 1 3-3-3-3zm5 3.5V12h5v-1.5z"/></svg>', ev = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#7e57c2" d="M20 18h-2v-2h-2v2c0 .193 0 .703 1.254 1.033A3.345 3.345 0 0 1 20 22h2v2h2v-2c0-.388-.562-.851-1.254-1.034C20.356 20.34 20 18.84 20 18m-3.254 2.966C14.356 20.34 14 18.84 14 18h-2v-2h-2v8h2v-2h4v2h2v-2c0-.388-.562-.851-1.254-1.034"/><path fill="#7e57c2" d="M24 4H4v20a4 4 0 0 0 4 4h16.16A3.84 3.84 0 0 0 28 24.16V8a4 4 0 0 0-4-4m2 14h-2v-2h-2v2c0 .193 0 .703 1.254 1.033A3.345 3.345 0 0 1 26 22v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1 2-2h2a2 2 0 0 1 2 2Z"/></svg>', tv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ffca28" d="M16 24c-5.525 0-10-.9-10-2v4c0 1.1 4.475 2 10 2s10-.9 10-2v-4c0 1.1-4.475 2-10 2m0-8c-5.525 0-10-.9-10-2v4c0 1.1 4.475 2 10 2s10-.9 10-2v-4c0 1.1-4.475 2-10 2m0-12C10.477 4 6 4.895 6 6v4c0 1.1 4.475 2 10 2s10-.9 10-2V6c0-1.105-4.477-2-10-2"/></svg>', nv = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/><path fill="#42a5f5" d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5z"/></svg>', rv = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m8.668 6h3.6641l-3.6641-3.668v3.668m-4.668-4.668h5.332l4 4v8c0 0.73828-0.59375 1.3359-1.332 1.3359h-8c-0.73828 0-1.332-0.59766-1.332-1.3359v-10.664c0-0.74219 0.59375-1.3359 1.332-1.3359m3.332 1.3359h-3.332v10.664h8v-6h-4.668z" fill="#90a4ae" /></svg>', ov = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m6.922 3.768-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232" fill="#90a4ae" /></svg>', sv = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.483 6H4.721a1 1 0 0 0-.949.684L2 12V5h12a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232l-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h11l2.403-5.606A1 1 0 0 0 14.483 6" fill="#90a4ae" /></svg>', iv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#e65100" d="m4 4 2 22 10 2 10-2 2-22Zm19.72 7H11.28l.29 3h11.86l-.802 9.335L15.99 25l-6.635-1.646L8.93 19h3.02l.19 2 3.86.77 3.84-.77.29-4H8.84L8 8h16Z"/></svg>', lv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#26a69a" d="M8.5 6h4l-4-4zM3.875 1H9.5l4 4v8.6c0 .773-.616 1.4-1.375 1.4h-8.25c-.76 0-1.375-.627-1.375-1.4V2.4c0-.777.612-1.4 1.375-1.4M4 13.6h8V8l-2.625 2.8L8 9.4zm1.25-7.7c-.76 0-1.375.627-1.375 1.4s.616 1.4 1.375 1.4c.76 0 1.375-.627 1.375-1.4S6.009 5.9 5.25 5.9"/></svg>', av = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#ffca28" d="M2 2v12h12V2zm6 6h1v4a1.003 1.003 0 0 1-1 1H7a1.003 1.003 0 0 1-1-1v-1h1v1h1zm3 0h2v1h-2v1h1a1.003 1.003 0 0 1 1 1v1a1.003 1.003 0 0 1-1 1h-2v-1h2v-1h-1a1.003 1.003 0 0 1-1-1V9a1.003 1.003 0 0 1 1-1"/></svg>', cv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path fill="#f9a825" d="M560-160v-80h120q17 0 28.5-11.5T720-280v-80q0-38 22-69t58-44v-14q-36-13-58-44t-22-69v-80q0-17-11.5-28.5T680-720H560v-80h120q50 0 85 35t35 85v80q0 17 11.5 28.5T840-560h40v160h-40q-17 0-28.5 11.5T800-360v80q0 50-35 85t-85 35zm-280 0q-50 0-85-35t-35-85v-80q0-17-11.5-28.5T120-400H80v-160h40q17 0 28.5-11.5T160-600v-80q0-50 35-85t85-35h120v80H280q-17 0-28.5 11.5T240-680v80q0 38-22 69t-58 44v14q36 13 58 44t22 69v80q0 17 11.5 28.5T280-240h120v80z"/></svg>', uv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#42a5f5" d="m14 10-4 3.5L6 10H4v12h4v-6l2 2 2-2v6h4V10zm12 6v-6h-4v6h-4l6 8 6-8z"/></svg>', fv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ef5350" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m4.93 10.44c.41.9.93 1.64 1.53 2.15l.41.32c-.87.16-2.07.44-3.34.93l-.11.04.5-1.04c.45-.87.78-1.66 1.01-2.4m6.48 3.81c.18-.18.27-.41.28-.66.03-.2-.02-.39-.12-.55-.29-.47-1.04-.69-2.28-.69l-1.29.07-.87-.58c-.63-.52-1.2-1.43-1.6-2.56l.04-.14c.33-1.33.64-2.94-.02-3.6a.85.85 0 0 0-.61-.24h-.24c-.37 0-.7.39-.79.77-.37 1.33-.15 2.06.22 3.27v.01c-.25.88-.57 1.9-1.08 2.93l-.96 1.8-.89.49c-1.2.75-1.77 1.59-1.88 2.12-.04.19-.02.36.05.54l.03.05.48.31.44.11c.81 0 1.73-.95 2.97-3.07l.18-.07c1.03-.33 2.31-.56 4.03-.75 1.03.51 2.24.74 3 .74.44 0 .74-.11.91-.3m-.41-.71.09.11c-.01.1-.04.11-.09.13h-.04l-.19.02c-.46 0-1.17-.19-1.9-.51.09-.1.13-.1.23-.1 1.4 0 1.8.25 1.9.35M7.83 17c-.65 1.19-1.24 1.85-1.69 2 .05-.38.5-1.04 1.21-1.69zm3.02-6.91c-.23-.9-.24-1.63-.07-2.05l.07-.12.15.05c.17.24.19.56.09 1.1l-.03.16-.16.82z"/></svg>', dv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#e64a19" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zM8 11v2h1v6H8v1h4v-1h-1v-2h2a3 3 0 0 0 3-3 3 3 0 0 0-3-3zm5 2a1 1 0 0 1 1 1 1 1 0 0 1-1 1h-2v-2z"/></svg>', gv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#0288d1" d="M9.86 2A2.86 2.86 0 0 0 7 4.86v1.68h4.29c.39 0 .71.57.71.96H4.86A2.86 2.86 0 0 0 2 10.36v3.781a2.86 2.86 0 0 0 2.86 2.86h1.18v-2.68a2.85 2.85 0 0 1 2.85-2.86h5.25c1.58 0 2.86-1.271 2.86-2.851V4.86A2.86 2.86 0 0 0 14.14 2zm-.72 1.61c.4 0 .72.12.72.71s-.32.891-.72.891c-.39 0-.71-.3-.71-.89s.32-.711.71-.711"/><path fill="#fdd835" d="M17.959 7v2.68a2.85 2.85 0 0 1-2.85 2.859H9.86A2.85 2.85 0 0 0 7 15.389v3.75a2.86 2.86 0 0 0 2.86 2.86h4.28A2.86 2.86 0 0 0 17 19.14v-1.68h-4.291c-.39 0-.709-.57-.709-.96h7.14A2.86 2.86 0 0 0 22 13.64V9.86A2.86 2.86 0 0 0 19.14 7zM8.32 11.513l-.004.004.038-.004zm6.54 7.276c.39 0 .71.3.71.89a.71.71 0 0 1-.71.71c-.4 0-.72-.12-.72-.71s.32-.89.72-.89"/></svg>', pv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#8bc34a" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zm4 7.5h-4v2h1l-2 1.67L10 13h1v-2H7v2h1l3 2.5L8 18H7v2h4v-2h-1l2-1.67L14 18h-1v2h4v-2h-1l-3-2.5 3-2.5h1z"/></svg>', hv = '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 16 16"><path fill="#0288d1" d="M2 2v12h12V2zm4 6h3v1H8v4H7V9H6zm5 0h2v1h-2v1h1a1.003 1.003 0 0 1 1 1v1a1.003 1.003 0 0 1-1 1h-2v-1h2v-1h-1a1.003 1.003 0 0 1-1-1V9a1.003 1.003 0 0 1 1-1"/></svg>', mv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ff9800" d="m24 6 2 6h-4l-2-6h-3l2 6h-4l-2-6h-3l2 6H8L6 6H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3V6Z"/></svg>', vv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#01579b" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zM7 13l1.5 7h2l1.5-3 1.5 3h2l1.5-7h1v-2h-4v2h1l-.9 4.2L13 15h-2l-1.1 2.2L9 13h1v-2H6v2z"/></svg>', wv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#8bc34a" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m.12 13.5 3.74 3.74 1.42-1.41-2.33-2.33 2.33-2.33-1.42-1.41zm11.16 0-3.74-3.74-1.42 1.41 2.33 2.33-2.33 2.33 1.42 1.41z"/></svg>', yv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ff5252" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2m12 16v-2H9v2zm-4-4v-2H6v2z"/></svg>', bv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#afb42b" d="M14 17h-2v-2h-2v-2h2v2h2m0-6h-2v2h2v2h-2v-2h-2V9h2V7h-2V5h2v2h2m5-4H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2"/></svg>', Ml = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, El = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, _v = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Sv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, xv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Rv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Cv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Iv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Mv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Ev = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Av = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Ov = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Pv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Dv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, kv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Tv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Fv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Hv = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Lv = ["aria-label"], jv = {
  key: 0,
  class: "pnl-tst-tsep",
  "aria-hidden": "true"
}, zv = {
  key: 1,
  class: "pnl-tst-search"
}, Kv = ["innerHTML"], Vv = ["value", "aria-label", "placeholder"], Bv = ["aria-label", "aria-keyshortcuts", "aria-disabled", "title", "tabindex", "onClick", "onFocus"], Nv = ["innerHTML"], $v = {
  key: 1,
  class: "pnl-tst-empty"
}, Wv = ["aria-label", "aria-colcount", "aria-rowcount"], Uv = {
  key: 0,
  class: "pnl-tst-head",
  role: "rowgroup"
}, qv = {
  class: "pnl-tst-hrow",
  role: "row",
  "aria-rowindex": 1
}, Gv = ["aria-colindex", "aria-sort", "aria-keyshortcuts", "tabindex", "onClick", "onFocus", "onKeydown"], Xv = { class: "pnl-tst-hlabel" }, Yv = ["innerHTML"], Zv = ["onDblclick", "onMousedown", "onTouchstart"], Jv = {
  class: "pnl-tst-body",
  role: "rowgroup"
}, Qv = ["aria-level", "aria-posinset", "aria-setsize", "aria-rowindex", "aria-expanded", "aria-selected", "aria-haspopup", "tabindex", "onClick", "onContextmenu", "onFocus"], e0 = ["aria-colindex"], t0 = ["onClick"], n0 = {
  key: 1,
  class: "pnl-tst-twisty pnl-tst-twisty--leaf",
  "aria-hidden": "true"
}, r0 = ["checked", ".indeterminate", "aria-label", "onClick"], o0 = ["innerHTML"], s0 = ["value", "aria-label", "onKeydown", "onBlur"], i0 = {
  key: 2,
  class: "pnl-tst-value"
}, l0 = {
  key: 3,
  class: "pnl-tst-modal"
}, a0 = {
  id: "pnl-tst-confirm-message",
  class: "pnl-tst-dialog-message"
}, c0 = { class: "pnl-tst-dialog-actions" }, u0 = ["aria-label"], f0 = {
  key: 0,
  class: "pnl-tst-msep",
  role: "separator"
}, d0 = ["aria-keyshortcuts", "aria-disabled", "tabindex", "onClick", "onFocus"], g0 = ["innerHTML"], p0 = { class: "pnl-tst-mlabel" }, h0 = {
  key: 0,
  class: "pnl-tst-mkeys",
  "aria-hidden": "true"
}, m0 = "title", Al = 16, Ln = "search", Ot = "|", un = 4, v0 = 500, w0 = {
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
    setEditingKey: { type: Function, required: !0 },
    // Two-way sync of the sort, as a list of {id, desc}.
    setSorting: { type: Function, required: !0 },
    // Two-way sync of the resized column widths, as a map of column id to pixels.
    setColumnWidths: { type: Function, required: !0 }
  },
  setup(e) {
    const t = e, n = {
      columnSizingFeature: xh,
      columnResizingFeature: Sh,
      rowExpandingFeature: Rh,
      rowSelectionFeature: Lh,
      rowSortingFeature: jh,
      coreRowModel: dc(),
      expandedRowModel: zh(),
      sortedRowModel: Bh(),
      sortFns: { alphanumeric: tp, text: np }
    }, r = $(() => (t.state.columns || []).length > 0), o = $(() => r.value && t.state.options.sortable !== !1), s = $(() => t.state.options.sort_folders_first === !0), i = $(() => r.value && t.state.options.resizable !== !1), a = $(() => {
      const l = t.state.columns || [];
      return l.length === 0 ? [{ id: m0, header: "", accessorFn: (u) => u.title }] : l.map((u) => {
        const g = u.field ?? u.id;
        return {
          id: u.id,
          header: u.header ?? u.id,
          accessorFn: (v) => v[g],
          enableSorting: u.sortable !== !1,
          enableResizing: u.resizable !== !1,
          // Written only where Python actually declared one, so the rest fall back to
          // TanStack's own defaults (150 wide, no narrower than 20) rather than to a
          // second set of numbers kept here.
          ...c("size", u.width),
          ...c("minSize", u.min_width),
          ...c("maxSize", u.max_width),
          // Only set when asked for, so an ordinary table keeps TanStack's own
          // detection of what a column holds rather than routing through ours.
          ...s.value ? { sortFn: d } : {}
        };
      });
    });
    function c(l, u) {
      return typeof u == "number" && Number.isFinite(u) ? { [l]: u } : {};
    }
    function f(l) {
      return l.subRows.length > 0 || l.original.allow_children !== !1;
    }
    function d(l, u, g) {
      const v = f(l);
      if (v !== f(u)) {
        const D = X.value.some((U) => U.id === g && U.desc);
        return (v ? -1 : 1) * (D ? -1 : 1);
      }
      return se.getColumn(g).getAutoSortFn()(l, u, g);
    }
    const h = /* @__PURE__ */ ge(w(t.state.expandedKeys));
    function w(l) {
      const u = {};
      for (const g of l || []) u[g] = !0;
      return u;
    }
    function y(l) {
      return l === !0 ? se.getCoreRowModel().flatRows.filter((u) => u.subRows.length > 0).map((u) => u.id).sort() : Object.keys(l).filter((u) => l[u]).sort();
    }
    const O = {
      audio: Jm,
      console: Qm,
      css: ev,
      database: tv,
      document: nv,
      file: rv,
      folder: ov,
      "folder-open": sv,
      html: iv,
      image: lv,
      javascript: av,
      json: cv,
      markdown: uv,
      pdf: fv,
      powerpoint: dv,
      python: gv,
      table: pv,
      typescript: hv,
      video: mv,
      word: vv,
      xml: wv,
      yaml: yv,
      zip: bv
    };
    function M(l) {
      return l ? { ...O, ...t.state.icons || {} }[l] ?? null : null;
    }
    function A(l) {
      const u = l.original.icon;
      return u ? (Ee(l) ? M(`${u}-open`) : null) ?? M(u) : null;
    }
    function z(l, u) {
      return l.length !== u.length ? !1 : l.every((g, v) => g === u[v]);
    }
    const S = $(() => t.state.options.select_mode ?? "none"), I = $(() => S.value !== "none"), C = $(() => S.value === "hierarchy"), T = $(
      () => I.value && t.state.options.show_checkboxes !== !1
    ), H = /* @__PURE__ */ ge(w(t.state.selectedKeys)), X = /* @__PURE__ */ ge(B(t.state.sorting));
    function B(l) {
      return (l || []).filter((u) => u && u.id).map((u) => ({ id: String(u.id), desc: u.desc === !0 }));
    }
    function j(l, u) {
      return l.length === u.length && l.every((g, v) => g.id === u[v].id && g.desc === u[v].desc);
    }
    const Z = $(() => o.value && X.value.length > 0), re = /* @__PURE__ */ ge(le(t.state.columnWidths));
    function le(l) {
      const u = {};
      for (const [g, v] of Object.entries(l || {})) {
        const D = Math.round(Number(v));
        Number.isFinite(D) && D > 0 && (u[g] = D);
      }
      return u;
    }
    function ve(l, u) {
      const g = Object.keys(l);
      return g.length === Object.keys(u).length && g.every((v) => l[v] === u[v]);
    }
    const we = /* @__PURE__ */ ge(null), se = Wh({
      features: n,
      data: $(() => t.state.source || []),
      columns: a,
      getRowId: (l) => l.key,
      getSubRows: (l) => l.children,
      // TanStack resets `expanded` whenever `data` changes. Python rewrites the
      // whole tree after every move, so leaving that on would collapse the tree on
      // each drop and push an empty `expanded_keys` back. Expansion is owned here.
      autoResetExpanded: !1,
      // The same bargain for the sort: a tree Python rewrote is not a user asking
      // for a different order, and dropping the sort on every move would undo the
      // one thing the header was pressed for.
      autoResetSorting: !1,
      enableRowSelection: I,
      enableMultiRowSelection: $(() => S.value !== "single"),
      enableSubRowSelection: C,
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
      enableColumnResizing: i,
      // The columns follow the pointer rather than a guide line that commits on
      // release. It costs a render per frame of the drag, which is what a table with
      // every row in the DOM can afford today and what P15 has to look at again.
      columnResizeMode: "onChange",
      state: $(() => ({
        expanded: h.value,
        rowSelection: H.value,
        sorting: X.value,
        columnSizing: re.value
      })),
      onExpandedChange: (l) => {
        h.value = typeof l == "function" ? l(h.value) : l;
      },
      onRowSelectionChange: (l) => {
        H.value = typeof l == "function" ? l(H.value) : l;
      },
      onSortingChange: (l) => {
        X.value = B(typeof l == "function" ? l(X.value) : l);
      },
      onColumnSizingChange: (l) => {
        re.value = le(
          typeof l == "function" ? l(re.value) : l
        );
      }
    });
    function ae(l) {
      if (l.getIsSelected()) return "all";
      if (!C.value || l.subRows.length === 0) return "none";
      const u = l.subRows.map(ae);
      return u.every((g) => g === "all") ? "all" : u.some((g) => g !== "none") ? "some" : "none";
    }
    be(() => y(H.value), t.setSelectedKeys, { flush: "post" }), be(() => y(h.value), t.setExpandedKeys, { flush: "post" }), be(
      () => t.state.expandedKeys,
      (l) => {
        z(y(h.value), [...l || []].sort()) || (h.value = w(l));
      }
    ), be(
      () => t.state.selectedKeys,
      (l) => {
        z(y(H.value), [...l || []].sort()) || (H.value = w(l));
      }
    ), be(() => X.value, t.setSorting, { flush: "post" }), be(
      () => t.state.sorting,
      (l) => {
        const u = B(l);
        j(X.value, u) || (X.value = u);
      }
    ), be(
      () => [re.value, we.value],
      ([l, u]) => {
        u || t.setColumnWidths(l);
      },
      { flush: "post" }
    ), be(
      () => t.state.columnWidths,
      (l) => {
        const u = le(l);
        ve(re.value, u) || (re.value = u);
      }
    ), be(
      () => [t.state.options.expand_all, t.state.source],
      ([l]) => {
        l && se.toggleAllRowsExpanded(!0);
      },
      { immediate: !0 }
    );
    const J = $(() => (t.state.filterText ?? "").trim().toLowerCase()), Y = $(() => J.value.length > 0), $e = /* @__PURE__ */ ge(t.state.filterText ?? "");
    be(
      () => t.state.filterText,
      (l) => {
        $e.value = l ?? "";
      }
    );
    function en(l) {
      $e.value = l, t.setFilterText(l);
    }
    function dt(l) {
      return l.getAllCells().some((u) => String(u.getValue() ?? "").toLowerCase().includes(J.value));
    }
    const te = $(() => {
      if (!Y.value) return se.getRowModel().rows;
      const l = se.getSortedRowModel().flatRows, u = /* @__PURE__ */ new Set();
      for (const g of l)
        if (dt(g)) {
          u.add(g.id);
          for (let v = g.getParentRow(); v; v = v.getParentRow()) u.add(v.id);
        }
      return l.filter((g) => u.has(g.id));
    }), We = $(() => {
      var l;
      return ((l = se.getHeaderGroups()[0]) == null ? void 0 : l.headers) ?? [];
    }), _n = $(() => t.state.options.indent_px ?? 16), Co = $(() => t.state.options.aria_label ?? "Tree table"), Ht = $(() => Y.value ? "No matches" : "No data"), tn = $(() => r.value ? 2 : 1), Sn = $(() => te.value.length + (r.value ? 1 : 0)), Mt = /* @__PURE__ */ ge(!1), Qe = /* @__PURE__ */ ge(null), fr = /* @__PURE__ */ new Map();
    function p(l, u) {
      u ? fr.set(l, u) : fr.delete(l);
    }
    const m = $(() => {
      const l = We.value;
      return l.length === 0 ? null : l.some((g) => g.column.id === Qe.value) ? Qe.value : l[0].column.id;
    });
    function b(l) {
      const u = We.value;
      if (u.length === 0) return;
      const g = u[Math.max(0, Math.min(l, u.length - 1))];
      Mt.value = !0, Qe.value = g.column.id, ze(() => {
        var v;
        return (v = fr.get(g.column.id)) == null ? void 0 : v.focus();
      });
    }
    function E() {
      const l = We.value;
      b(l.findIndex((u) => u.column.id === m.value));
    }
    function R() {
      Mt.value = !1, ze(() => {
        var l;
        return (l = et.get(xn.value)) == null ? void 0 : l.focus();
      });
    }
    function _(l) {
      return o.value && l.column.getCanSort();
    }
    function F(l) {
      if (!_(l)) return;
      const u = l.column.getIsSorted();
      return u === "asc" ? "ascending" : u === "desc" ? "descending" : "none";
    }
    function k(l) {
      if (!_(l)) return null;
      const u = l.column.getIsSorted();
      return u ? u === "asc" ? El : Ml : null;
    }
    function P(l) {
      _(l) && l.column.toggleSorting();
    }
    function x(l) {
      b(We.value.indexOf(l)), P(l);
    }
    function K(l) {
      return i.value && l.column.getCanResize();
    }
    function L(l, u) {
      if (!K(l)) return;
      u.stopPropagation(), l.getResizeHandler()(u), we.value = l.column.id;
      const g = () => {
        we.value = null;
      };
      for (const v of ["mouseup", "touchend", "touchcancel"])
        document.addEventListener(v, g, { once: !0 });
    }
    function V(l, u) {
      if (!K(l)) return;
      const g = l.column, v = g.columnDef.minSize ?? 20, D = g.columnDef.maxSize ?? Number.MAX_SAFE_INTEGER, U = Math.min(Math.max(Math.round(g.getSize() + u), v), D);
      se.setColumnSizing((me) => ({ ...me, [g.id]: U }));
    }
    function N(l) {
      K(l) && l.column.resetSize();
    }
    function Q(l, u) {
      const g = We.value, v = Math.max(
        0,
        g.findIndex((D) => D.column.id === m.value)
      );
      if (u.altKey) {
        switch (u.key) {
          case "ArrowLeft":
            V(l, -Al);
            break;
          case "ArrowRight":
            V(l, Al);
            break;
          case "Home":
            N(l);
            break;
          default:
            return;
        }
        u.preventDefault(), u.stopPropagation();
        return;
      }
      switch (u.key) {
        case "ArrowLeft":
          b(v - 1);
          break;
        case "ArrowRight":
          b(v + 1);
          break;
        case "Home":
          b(0);
          break;
        case "End":
          b(g.length - 1);
          break;
        case "ArrowDown":
          R();
          break;
        case "Enter":
        case " ":
          P(l);
          break;
        default:
          return;
      }
      u.preventDefault(), u.stopPropagation();
    }
    const ce = $(() => {
      const l = /* @__PURE__ */ new Map();
      for (const u of te.value) {
        const g = u.parentId ?? "", v = l.get(g) ?? [];
        v.push(u.id), l.set(g, v);
      }
      return l;
    });
    function ie(l) {
      return ce.value.get(l.parentId ?? "") ?? [];
    }
    function ye(l) {
      return ie(l).indexOf(l.id) + 1;
    }
    function Se(l) {
      return ie(l).length;
    }
    function Me(l) {
      return Y.value ? (ce.value.get(l.id) ?? []).length > 0 : l.getCanExpand();
    }
    function Ee(l) {
      return Y.value ? Me(l) : l.getIsExpanded();
    }
    const Lt = $(() => {
      if (!r.value) return {};
      const l = { "--pnl-tst-total": `${se.getTotalSize()}px` };
      return We.value.forEach((u, g) => {
        l[`--pnl-tst-w${g}`] = `${u.column.getSize()}px`;
      }), l;
    });
    function nn(l) {
      return r.value ? l === 0 ? { flex: "1 0 var(--pnl-tst-w0)" } : { flex: `0 0 var(--pnl-tst-w${l})` } : { flex: "1 1 0" };
    }
    function ke(l) {
      return { ...nn(0), paddingInlineStart: `${l.depth * _n.value}px` };
    }
    const Ce = /* @__PURE__ */ ge(null), gt = /* @__PURE__ */ ge(!0), et = /* @__PURE__ */ new Map();
    function jt(l) {
      Ce.value = l, gt.value = !0, Mt.value = !1;
    }
    function Vc(l, u) {
      u ? et.set(l, u) : et.delete(l);
    }
    const xn = $(() => {
      const l = te.value;
      return l.length === 0 ? null : l.some((u) => u.id === Ce.value) ? Ce.value : l[0].id;
    });
    function Ve(l) {
      l != null && (jt(l), ze(() => {
        var u;
        return (u = et.get(l)) == null ? void 0 : u.focus();
      }));
    }
    function dr(l) {
      const u = te.value;
      u.length !== 0 && Ve(u[Math.max(0, Math.min(l, u.length - 1))].id);
    }
    function ri(l, u) {
      const g = te.value;
      if (g.length === 0) return;
      const v = g[Math.max(0, Math.min(l, g.length - 1))], D = (u == null ? void 0 : u.shiftKey) && I.value && S.value !== "single";
      D && pt.value === null && (pt.value = xn.value), Ve(v.id), D && oi(v, !1);
    }
    function Bc(l) {
      const u = te.value;
      if (u.length === 0) return;
      const g = Math.max(
        0,
        u.findIndex((U) => U.id === xn.value)
      ), v = u[g];
      if (l.ctrlKey || l.metaKey) {
        const U = {
          a: "select-all",
          c: "copy",
          f: Ln,
          v: "paste",
          x: "cut",
          z: l.shiftKey ? "redo" : "undo"
        }[l.key.toLowerCase()];
        if (U && hr(U)) {
          l.preventDefault(), Eo(U);
          return;
        }
      }
      if (l.altKey) {
        const U = {
          ArrowUp: "move-up",
          ArrowDown: "move-down",
          ArrowLeft: "outdent",
          ArrowRight: "indent"
        }[l.key];
        if (U && hr(U)) {
          l.preventDefault(), Eo(U);
          return;
        }
      }
      if (Cr.value && (l.key === "ContextMenu" || l.key === "F10" && l.shiftKey)) {
        l.preventDefault(), bu(v);
        return;
      }
      const D = {
        Insert: l.shiftKey ? "new-file" : "new-folder",
        F2: "rename",
        Delete: "delete",
        Escape: "clear-selection"
      }[l.key];
      if (D && hr(D)) {
        l.preventDefault(), Eo(D);
        return;
      }
      switch (l.key) {
        case "ArrowDown":
          l.preventDefault(), ri(g + 1, l);
          break;
        case "ArrowUp":
          l.preventDefault(), g === 0 && r.value && !l.shiftKey ? E() : ri(g - 1, l);
          break;
        case "ArrowRight":
          if (l.preventDefault(), !Me(v)) break;
          Ee(v) ? dr(g + 1) : (v.toggleExpanded(!0), Ve(v.id));
          break;
        case "ArrowLeft":
          l.preventDefault(), !Y.value && v.getCanExpand() && v.getIsExpanded() ? (v.toggleExpanded(!1), Ve(v.id)) : v.parentId && Ve(v.parentId);
          break;
        case "Home":
          l.preventDefault(), dr(0);
          break;
        case "End":
          l.preventDefault(), dr(u.length - 1);
          break;
        case "Enter":
          l.preventDefault(), t.emitEvent("activate", { key: v.id });
          break;
        case " ":
          if (!I.value) break;
          l.preventDefault(), ai(v);
          break;
      }
    }
    const pt = /* @__PURE__ */ ge(null);
    function gr(l) {
      pt.value = l.id, H.value = {}, l.toggleSelected(!0, { selectChildren: !1 });
    }
    function oi(l, u) {
      const g = te.value, v = g.findIndex((Ae) => Ae.id === pt.value), D = g.findIndex((Ae) => Ae.id === l.id);
      if (D === -1) return;
      if (v === -1) {
        gr(l);
        return;
      }
      u || (H.value = {});
      const [U, me] = v <= D ? [v, D] : [D, v];
      for (let Ae = U; Ae <= me; Ae += 1)
        g[Ae].toggleSelected(!0, { selectChildren: !1 });
    }
    const Nc = $(() => t.state.options.toggle_on_click === !0);
    function $c(l) {
      const u = y(H.value);
      return u.length === 1 && u[0] === l.id;
    }
    function si() {
      H.value = {}, pt.value = null, gt.value = !1;
    }
    function ii() {
      y(H.value).length === 0 && (gt.value = !1);
    }
    be(
      () => y(H.value).length > 0,
      (l) => {
        l && (gt.value = !0);
      }
    );
    function Wc(l, u) {
      jt(l.id);
      const g = !!(u != null && u.shiftKey || u != null && u.ctrlKey || u != null && u.metaKey);
      I.value && !g && Nc.value && $c(l) ? si() : I.value && S.value !== "single" ? u != null && u.shiftKey ? oi(l, u.ctrlKey || u.metaKey) : u != null && u.ctrlKey || u != null && u.metaKey ? (pt.value = l.id, Gc(l)) : gr(l) : I.value && gr(l), t.emitEvent("activate", { key: l.id });
    }
    function Uc(l) {
      jt(l.id), !Y.value && l.toggleExpanded();
    }
    function li(l) {
      return ae(l) === "all";
    }
    function qc(l) {
      return ae(l) === "some";
    }
    function Gc(l) {
      jt(l.id), l.toggleSelected(void 0, { selectChildren: !1 }), ii();
    }
    function ai(l) {
      jt(l.id), l.toggleSelected(!li(l), {
        selectChildren: C.value,
        deselectParents: C.value
      }), ii();
    }
    function Xc(l) {
      ai(l), Ve(l.id);
    }
    const Io = {
      "new-folder": { icon: Iv, label: "New folder", keys: "Insert", node: {} },
      "new-file": {
        icon: Cv,
        label: "New file",
        keys: "Shift+Insert",
        node: { allow_children: !1 }
      },
      rename: { icon: Av, label: "Rename", keys: "F2" },
      delete: { icon: Fv, label: "Delete", keys: "Delete" },
      undo: { icon: Hv, label: "Undo", keys: "Control+Z" },
      redo: { icon: Ov, label: "Redo", keys: "Control+Shift+Z" },
      cut: { icon: Pv, label: "Cut", keys: "Control+X" },
      copy: { icon: Rv, label: "Copy", keys: "Control+C" },
      paste: { icon: xv, label: "Paste", keys: "Control+V" },
      "move-up": { icon: El, label: "Move up", keys: "Alt+ArrowUp" },
      "move-down": { icon: Ml, label: "Move down", keys: "Alt+ArrowDown" },
      outdent: { icon: Mv, label: "Outdent", keys: "Alt+ArrowLeft" },
      indent: { icon: Ev, label: "Indent", keys: "Alt+ArrowRight" },
      "expand-all": { icon: _v, label: "Expand all" },
      "collapse-all": { icon: Sv, label: "Collapse all" },
      "select-all": { icon: Tv, label: "Select all", keys: "Control+A" },
      "clear-selection": { icon: kv, label: "Clear selection", keys: "Escape" }
    }, Yc = [
      "undo",
      "redo",
      Ot,
      "new-folder",
      "new-file",
      "rename",
      "delete",
      Ot,
      "cut",
      "copy",
      "paste",
      Ot,
      "move-up",
      "move-down",
      "outdent",
      "indent",
      Ot,
      "expand-all",
      "collapse-all",
      Ot,
      "select-all",
      "clear-selection",
      Ln
    ], Zc = [
      "new-folder",
      "new-file",
      Ot,
      "rename",
      "delete",
      Ot,
      "cut",
      "copy",
      "paste"
    ];
    function ci(l, u) {
      const g = l === !0 ? u : Array.isArray(l) ? l : [], v = [];
      return g.forEach((D, U) => {
        const me = typeof D == "string" ? {} : D || {}, Ae = typeof D == "string" ? D : me.id, Ii = `${Ae}#${U}`;
        if (Ae === Ot || Ae === Ln) {
          v.push({ uid: Ii, id: Ae });
          return;
        }
        const kn = Io[Ae];
        if (!kn) return;
        const Mi = me.label ?? kn.label;
        v.push({
          uid: Ii,
          id: Ae,
          label: Mi,
          icon: M(me.icon) ?? kn.icon,
          keys: kn.keys,
          node: { title: Mi, ...kn.node ?? {}, ...me.node ?? {} }
        });
      }), v;
    }
    const pr = $(() => ci(t.state.options.toolbar, Yc)), Mo = $(
      () => ci(t.state.options.menu, Zc).filter((l) => l.id !== Ln)
    ), Jc = $(() => pr.value.length > 0), Qc = $(() => t.state.options.toolbar_label ?? "Tree actions"), ui = $(() => t.state.options.search_label ?? "Search");
    function fi(l) {
      return pr.value.find((u) => u.id === l) ?? Mo.value.find((u) => u.id === l) ?? null;
    }
    function hr(l) {
      return fi(l) !== null;
    }
    function Eo(l) {
      const u = fi(l);
      u && ko(u);
    }
    const Le = $(() => te.value.find((l) => l.id === xn.value) ?? null);
    function eu(l) {
      return te.value.filter((u) => (u.parentId ?? "") === (l.parentId ?? ""));
    }
    function di() {
      const l = Le.value;
      if (!l) return [];
      const u = Si(l), g = l.parentId ?? "";
      return u.every((D) => {
        var U;
        return (((U = Pn(D)) == null ? void 0 : U.parentId) ?? "") === g;
      }) ? u : [l.id];
    }
    function Ao() {
      const l = Le.value;
      if (!l) return [];
      if (!I.value || !l.getIsSelected()) return [l.id];
      const u = te.value.filter((g) => g.getIsSelected()).map((g) => g.id);
      return u.length > 0 ? u : [l.id];
    }
    const Oo = $(() => {
      var l;
      return ((l = t.state.clipboard) == null ? void 0 : l.keys) ?? [];
    }), tu = $(() => {
      var u;
      const l = new Set(((u = t.state.clipboard) == null ? void 0 : u.mode) === "cut" ? Oo.value : []);
      return l.size === 0 || te.value.forEach((g) => {
        g.parentId && l.has(g.parentId) && l.add(g.id);
      }), l;
    });
    function Rn(l) {
      const u = Le.value;
      if (!u) return null;
      const g = new Set(di()), v = eu(u), D = v.map((me, Ae) => g.has(me.id) ? Ae : -1).filter((me) => me >= 0);
      if (D.length === 0) return null;
      let U = (l < 0 ? Math.min(...D) : Math.max(...D)) + l;
      for (; U >= 0 && U < v.length && g.has(v[U].id); ) U += l;
      return v[U] ?? null;
    }
    let Ue = null;
    be(
      () => t.state.source,
      () => {
        const l = Ue;
        if (Ue = null, !!l) {
          if (l.key !== void 0) {
            Ve(l.key);
            return;
          }
          ze(() => {
            l.index !== void 0 ? dr(l.index) : l.pasted !== void 0 ? ru(l.pasted) : nu(l.added);
          });
        }
      }
    );
    function nu(l) {
      const u = se.getCoreRowModel().flatRows.find((g) => !l.has(g.id));
      u && (Ve(u.id), I.value && (H.value = {}, pt.value = u.id, u.toggleSelected(!0, { selectChildren: !1 })), hr("rename") && ze(() => wr(u.id, !0)));
    }
    function ru(l) {
      const u = se.getCoreRowModel().flatRows.filter((D) => !l.has(D.id)), g = new Set(u.map((D) => D.id)), v = u.filter((D) => !g.has(D.parentId ?? ""));
      v.length !== 0 && (Ve(v[0].id), I.value && (H.value = {}, pt.value = v[0].id, v.forEach((D) => D.toggleSelected(!0, { selectChildren: !1 }))));
    }
    const rn = /* @__PURE__ */ ge(null), mr = /* @__PURE__ */ ge(""), Cn = /* @__PURE__ */ ge(null), ht = /* @__PURE__ */ ge(null), Po = /* @__PURE__ */ ge(null), Do = /* @__PURE__ */ ge(null), ou = $(() => t.state.options.extension_warning !== !1);
    function gi(l) {
      const u = String(l ?? ""), g = u.lastIndexOf(".");
      return g < 0 ? "" : u.slice(g + 1).toLowerCase();
    }
    function su(l, u) {
      return ou.value && l.allow_children === !1 && gi(u) !== gi(l.title ?? "");
    }
    let vr = null;
    function wr(l, u = !1) {
      const g = Pn(l);
      g && (vr = u ? l : null, mr.value = g.original.title ?? "", rn.value = l, t.setEditingKey(l), ze(() => {
        var v, D;
        (v = Cn.value) == null || v.focus(), (D = Cn.value) == null || D.select();
      }));
    }
    function yr() {
      vr = null, ht.value = null, rn.value = null, t.setEditingKey("");
    }
    function pi(l) {
      if (ht.value || rn.value !== l.id) return;
      const u = mr.value.trim(), g = u.length > 0 && u !== (l.original.title ?? "");
      if (g && vr !== l.id && su(l.original, u)) {
        ht.value = { key: l.id, title: u, previous: l.original.title ?? l.id }, ze(() => {
          var v;
          return (v = Do.value) == null ? void 0 : v.focus();
        });
        return;
      }
      if (yr(), !g) {
        Ve(l.id);
        return;
      }
      Ue = { key: l.id }, t.emitEvent("rename", { key: l.id, title: u });
    }
    function hi() {
      const { key: l, title: u } = ht.value;
      ht.value = null, yr(), Ue = { key: l }, t.emitEvent("rename", { key: l, title: u });
    }
    function mi() {
      ht.value = null, ze(() => {
        var l, u;
        (l = Cn.value) == null || l.focus(), (u = Cn.value) == null || u.select();
      });
    }
    function iu(l) {
      var v;
      const u = l.key;
      if (u === "Escape" || u === "n" || u === "N") {
        l.preventDefault(), mi();
        return;
      }
      if (u === "y" || u === "Y") {
        l.preventDefault(), hi();
        return;
      }
      if (u !== "Tab" && u !== "ArrowLeft" && u !== "ArrowRight") return;
      l.preventDefault(), (v = (l.target === Po.value ? Do : Po).value) == null || v.focus();
    }
    function lu(l) {
      if (rn.value !== l.id) return;
      const u = vr === l.id;
      if (yr(), !u) {
        Ve(l.id);
        return;
      }
      Ue = { index: te.value.findIndex((g) => g.id === l.id) }, t.emitEvent("delete", { key: l.id, keys: [l.id] });
    }
    function au(l, u) {
      u.key === "Enter" ? (u.preventDefault(), pi(l)) : u.key === "Escape" && (u.preventDefault(), lu(l));
    }
    be(
      () => t.state.editingKey,
      (l) => {
        (l || "") !== (rn.value || "") && (l ? wr(l) : yr());
      }
    ), hs(() => {
      t.state.editingKey && wr(t.state.editingKey);
    });
    function br(l, u) {
      const g = Le.value;
      !g || !l || (Ue = { key: g.id }, t.emitEvent("move", {
        key: g.id,
        keys: di(),
        position: u,
        anchorKey: l.id
      }));
    }
    function cu(l) {
      const u = Le.value, g = u ? u.original.allow_children === !1 ? "after" : "child" : null;
      u && g === "child" && !Y.value && u.toggleExpanded(!0), Ue = { added: new Set(se.getCoreRowModel().flatRows.map((v) => v.id)) }, t.emitEvent("add", { anchorKey: (u == null ? void 0 : u.id) ?? null, position: g, node: l.node });
    }
    function uu() {
      var u;
      const l = Ao();
      l.length !== 0 && (Ue = { index: te.value.findIndex((g) => {
        var v;
        return g.id === ((v = Le.value) == null ? void 0 : v.id);
      }) }, t.emitEvent("delete", { key: ((u = Le.value) == null ? void 0 : u.id) ?? null, keys: l }));
    }
    function fu(l) {
      Ue = { index: te.value.findIndex((u) => {
        var g;
        return u.id === ((g = Le.value) == null ? void 0 : g.id);
      }) }, t.emitEvent(l, {});
    }
    function du(l) {
      var g;
      const u = Ao();
      u.length !== 0 && t.emitEvent(l, { key: ((g = Le.value) == null ? void 0 : g.id) ?? null, keys: u });
    }
    function gu() {
      var v;
      const l = Le.value, u = l ? l.original.allow_children === !1 ? "after" : "child" : null;
      l && u === "child" && !Y.value && l.toggleExpanded(!0);
      const g = Oo.value;
      Ue = ((v = t.state.clipboard) == null ? void 0 : v.mode) === "cut" ? { key: g[0] } : { pasted: new Set(se.getCoreRowModel().flatRows.map((D) => D.id)) }, t.emitEvent("paste", { anchorKey: (l == null ? void 0 : l.id) ?? null, position: u });
    }
    function In(l) {
      var u;
      switch (l.id) {
        case "new-folder":
        case "new-file":
          return !0;
        case "rename":
          return Le.value !== null;
        case "delete":
        case "cut":
        case "copy":
          return Ao().length > 0;
        case "paste":
          return Oo.value.length > 0;
        case "undo":
          return t.state.canUndo === !0;
        case "redo":
          return t.state.canRedo === !0;
        case "move-up":
        case "move-down":
          return !Z.value && Rn(l.id === "move-up" ? -1 : 1) !== null;
        case "indent": {
          const g = Rn(-1);
          return g !== null && g.original.allow_children !== !1;
        }
        case "outdent":
          return !!((u = Le.value) != null && u.parentId);
        case "expand-all":
        case "collapse-all":
          return te.value.length > 0 && !Y.value;
        case "select-all":
          return te.value.length > 0 && I.value && S.value !== "single";
        case "clear-selection":
          return I.value && y(H.value).length > 0;
        default:
          return !0;
      }
    }
    function vi(l) {
      return l.keys ? l.keys.replace("Control", "Ctrl") : "";
    }
    function pu(l) {
      return l.keys ? `${l.label} (${vi(l)})` : l.label;
    }
    function ko(l) {
      var u, g, v, D;
      if (In(l))
        switch (l.id) {
          case "new-folder":
          case "new-file":
            cu(l);
            break;
          case "rename":
            wr(Le.value.id);
            break;
          case "delete":
            uu();
            break;
          case "undo":
          case "redo":
            fu(l.id);
            break;
          case "cut":
          case "copy":
            du(l.id);
            break;
          case "paste":
            gu();
            break;
          case "move-up":
            br(Rn(-1), "before");
            break;
          case "move-down":
            br(Rn(1), "after");
            break;
          case "indent": {
            const U = Rn(-1);
            U && !Y.value && U.toggleExpanded(!0), br(U, "child");
            break;
          }
          case "outdent":
            br(Pn((u = Le.value) == null ? void 0 : u.parentId), "after");
            break;
          case "expand-all":
            se.toggleAllRowsExpanded(!0);
            break;
          case "collapse-all":
            se.toggleAllRowsExpanded(!1);
            break;
          case "select-all":
            H.value = Object.fromEntries(te.value.map((U) => [U.id, !0])), pt.value = ((g = te.value[0]) == null ? void 0 : g.id) ?? null;
            break;
          case "clear-selection":
            si();
            break;
          case Ln:
            (v = To.value) == null || v.focus(), (D = To.value) == null || D.select();
            break;
        }
    }
    const To = /* @__PURE__ */ ge(null), Fo = $(() => pr.value.filter((l) => l.id in Io)), _r = /* @__PURE__ */ ge(null), Ho = /* @__PURE__ */ new Map(), wi = $(() => {
      const l = Fo.value;
      return l.length === 0 ? null : l.some((u) => u.uid === _r.value) ? _r.value : l[0].uid;
    });
    function hu(l, u) {
      u ? Ho.set(l, u) : Ho.delete(l);
    }
    function Sr(l) {
      const u = Fo.value;
      if (u.length === 0) return;
      const g = u[Math.max(0, Math.min(l, u.length - 1))].uid;
      _r.value = g, ze(() => {
        var v;
        return (v = Ho.get(g)) == null ? void 0 : v.focus();
      });
    }
    function mu(l) {
      const u = Fo.value, g = Math.max(
        0,
        u.findIndex((v) => v.uid === wi.value)
      );
      switch (l.key) {
        case "ArrowRight":
          l.preventDefault(), Sr(g + 1);
          break;
        case "ArrowLeft":
          l.preventDefault(), Sr(g - 1);
          break;
        case "Home":
          l.preventDefault(), Sr(0);
          break;
        case "End":
          l.preventDefault(), Sr(u.length - 1);
          break;
      }
    }
    const Mn = /* @__PURE__ */ ge(!1), xr = /* @__PURE__ */ ge(null), En = /* @__PURE__ */ ge({ left: 0, top: 0 }), Rr = /* @__PURE__ */ ge(null), on = /* @__PURE__ */ ge(0), Lo = /* @__PURE__ */ new Map(), An = $(() => Mo.value.filter((l) => l.id in Io)), Cr = $(() => An.value.length > 0), vu = $(() => t.state.options.menu_label ?? "Row actions");
    function wu(l, u) {
      u ? Lo.set(l, u) : Lo.delete(l);
    }
    function yi(l) {
      return An.value.findIndex((u) => u.uid === l.uid);
    }
    function bi(l, u, g) {
      if (!Cr.value) return;
      Ce.value !== l.id && jt(l.id), xr.value = l.id, En.value = { left: u, top: g };
      const v = An.value.findIndex((D) => In(D));
      on.value = Math.max(0, v), Mn.value = !0, ze(_u);
    }
    function yu(l, u) {
      Cr.value && (u.preventDefault(), I.value && !l.getIsSelected() && gr(l), bi(l, u.clientX, u.clientY));
    }
    function bu(l) {
      var g;
      const u = (g = et.get(l.id)) == null ? void 0 : g.getBoundingClientRect();
      bi(l, u ? u.left + _n.value : un, u ? u.bottom : un);
    }
    function _u() {
      const l = Rr.value;
      if (!l) return;
      const u = l.getBoundingClientRect();
      let { left: g, top: v } = En.value;
      g + u.width > window.innerWidth - un && (g = Math.max(un, g - u.width)), v + u.height > window.innerHeight - un && (v = Math.max(un, v - u.height)), En.value = { left: g, top: v }, On(on.value);
    }
    function On(l) {
      const u = An.value;
      if (u.length === 0) return;
      const g = Math.max(0, Math.min(l, u.length - 1));
      on.value = g, ze(() => {
        var v;
        return (v = Lo.get(u[g].uid)) == null ? void 0 : v.focus();
      });
    }
    function Ir(l = !0, u = void 0) {
      if (!Mn.value) return;
      const g = xr.value;
      Mn.value = !1, xr.value = null, l && g != null && ze(() => {
        var v;
        return (v = et.get(g)) == null ? void 0 : v.focus(u);
      });
    }
    function Su(l) {
      if (!In(l)) return;
      const u = xr.value;
      Ir(!1), Ve(u), ko(l);
    }
    function xu(l) {
      const u = on.value;
      switch (l.key) {
        case "ArrowDown":
          l.preventDefault(), On(u + 1);
          break;
        case "ArrowUp":
          l.preventDefault(), On(u - 1);
          break;
        case "Home":
          l.preventDefault(), On(0);
          break;
        case "End":
          l.preventDefault(), On(An.value.length - 1);
          break;
        case "Escape":
        case "Tab":
          l.preventDefault(), Ir();
          break;
      }
    }
    function jo(l) {
      Rr.value && l.composedPath().includes(Rr.value) || Ir(!1);
    }
    function sn() {
      Ir(!0, { preventScroll: !0 });
    }
    be(Mn, (l) => {
      l ? (document.addEventListener("pointerdown", jo, !0), window.addEventListener("resize", sn), window.addEventListener("scroll", sn, !0)) : (document.removeEventListener("pointerdown", jo, !0), window.removeEventListener("resize", sn), window.removeEventListener("scroll", sn, !0));
    }), ms(() => {
      document.removeEventListener("pointerdown", jo, !0), window.removeEventListener("resize", sn), window.removeEventListener("scroll", sn, !0);
    });
    const Ru = ["reorder-above", "reorder-below", "make-child", "reparent"], zo = $(() => t.state.options.enable_dnd === !0), Ko = $(() => String(t.state.options.transfer_group || "")), ln = $(() => String(t.state.tableId || "")), _i = /* @__PURE__ */ ge([]), Mr = /* @__PURE__ */ ge(null);
    function Pn(l) {
      return te.value.find((u) => u.id === l) ?? null;
    }
    function Cu(l, u) {
      let g = l;
      for (; g; ) {
        if (u.includes(g.id)) return !0;
        g = g.getParentRow();
      }
      return !1;
    }
    function Si(l) {
      if (!I.value || !l.getIsSelected()) return [l.id];
      const u = /* @__PURE__ */ new Set();
      for (let v = l.getParentRow(); v; v = v.getParentRow()) u.add(v.id);
      const g = te.value.filter((v) => v.getIsSelected() && !u.has(v.id)).map((v) => v.id);
      return g.length > 1 ? g : [l.id];
    }
    function Iu(l, u, g) {
      if (!g && Cu(l, u)) return Ru;
      const v = Z.value ? ["reorder-above", "reorder-below"] : [];
      return l.original.allow_children === !1 && v.push("make-child"), v;
    }
    function Mu(l) {
      if (Me(l) && Ee(l)) return "expanded";
      const u = ie(l);
      return u[u.length - 1] === l.id ? "last-in-group" : "standard";
    }
    let Vo = null, Dn = null;
    function Bo() {
      Dn && clearTimeout(Dn), Dn = null, Vo = null;
    }
    function Eu(l, u) {
      if (Vo === l || (Bo(), !u || u.type === "instruction-blocked")) return;
      const g = Pn(l);
      !g || !g.getCanExpand() || g.getIsExpanded() || (Vo = l, Dn = setTimeout(() => {
        Dn = null;
        const v = Pn(l);
        v && v.getCanExpand() && !v.getIsExpanded() && v.toggleExpanded(!0);
      }, v0));
    }
    function Au() {
      Mr.value = null, Bo();
    }
    const xi = /* @__PURE__ */ ge(null);
    function Ou() {
      let l = xi.value;
      if (!l) return null;
      let u = l.getRootNode();
      for (; u.host; )
        l = u.host, u = l.getRootNode();
      return l;
    }
    function Er(l) {
      for (const u of te.value) {
        const g = et.get(u.id);
        if (!g) continue;
        const v = g.getBoundingClientRect();
        if (l.clientX >= v.left && l.clientX < v.right && l.clientY >= v.top && l.clientY < v.bottom)
          return { row: u, element: g, rect: v };
      }
      return null;
    }
    function Pu(l, u) {
      const g = ".pnl-tst-check, .pnl-tst-twisty, .pnl-tst-edit";
      for (const v of l.element.querySelectorAll(g)) {
        const D = v.getBoundingClientRect();
        if (u.clientX >= D.left && u.clientX < D.right && u.clientY >= D.top && u.clientY < D.bottom)
          return !0;
      }
      return !1;
    }
    const Du = {
      id: () => ln.value,
      // Anything outside a row (the header, the empty space below the last row) is
      // not a drag handle, and neither is a row control.
      canDragFrom(l) {
        const u = Er(l);
        return u !== null && !Pu(u, l);
      },
      dragData(l) {
        const u = Er(l);
        return u ? {
          type: mn,
          group: Ko.value,
          sourceId: ln.value,
          key: u.row.id,
          keys: Si(u.row)
        } : null;
      },
      // The registered element is the host, so the default preview would be a
      // snapshot of the whole layout. Point it at the row being dragged, offset so
      // the preview stays under the cursor where it was grabbed.
      preview(l, u) {
        const g = Er(l);
        return g ? (u(g.element, l.clientX - g.rect.left, l.clientY - g.rect.top), !0) : !1;
      },
      setDragging(l) {
        _i.value = l;
      },
      // Our own rows always. Another pane's only when both name the same group, so a
      // table that opted into nothing shows no drop state at all rather than
      // accepting a drag Python is bound to reject.
      dropData(l, u) {
        const g = Er(l);
        if (!g) return null;
        const v = u.sourceId !== ln.value;
        if (v && !(Ko.value && u.group === Ko.value))
          return { type: mn, key: null, paneId: ln.value };
        const D = { type: mn, key: g.row.id, paneId: ln.value };
        return nm(D, {
          element: g.element,
          input: l,
          currentLevel: g.row.depth,
          indentPerLevel: _n.value,
          mode: Mu(g.row),
          block: Iu(g.row, u.keys ?? [], v)
        });
      },
      showDrop(l, u) {
        Mr.value = { key: l, instruction: u }, Eu(l, u);
      },
      clearDrop: Au,
      drop(l, u, g, v) {
        const D = l.keys ?? [];
        if (D.length === 0) return;
        const U = {
          targetKey: u,
          instruction: g.type,
          desiredLevel: g.desiredLevel ?? g.currentLevel
        };
        if (l.sourceId === ln.value) {
          if (D.includes(u)) return;
          t.emitEvent("move", { key: l.key, keys: D, ...U });
          return;
        }
        Ue = { pasted: new Set(se.getCoreRowModel().flatRows.map((me) => me.id)) }, t.emitEvent("transfer", {
          keys: D,
          sourceId: l.sourceId,
          copy: !!(v != null && v.ctrlKey || v != null && v.altKey),
          ...U
        });
      }
    };
    let Et = null;
    function Ri() {
      Et == null || Et(), Et = null;
      const l = Ou();
      !l || !zo.value || (Et = Zm(l, Du));
    }
    hs(Ri), be(zo, Ri), ms(() => {
      Bo(), Et == null || Et();
    });
    function No(l) {
      var u;
      return ((u = Mr.value) == null ? void 0 : u.key) === l.id ? Mr.value.instruction : null;
    }
    function ku(l) {
      const u = No(l);
      return {
        "pnl-tst-row--draggable": zo.value,
        "pnl-tst-row--dragging": _i.value.includes(l.id),
        "pnl-tst-row--blocked": (u == null ? void 0 : u.type) === "instruction-blocked",
        "pnl-tst-row--child-target": (u == null ? void 0 : u.type) === "make-child"
      };
    }
    function Ci(l) {
      const u = No(l);
      return u ? u.type === "reorder-above" ? "pnl-tst-dropline--above" : u.type === "reorder-below" || u.type === "reparent" ? "pnl-tst-dropline--below" : null : null;
    }
    function Tu(l) {
      const u = No(l);
      return u ? { insetInlineStart: `${(u.type === "reparent" ? u.desiredLevel : u.currentLevel) * u.indentPerLevel}px` } : null;
    }
    return (l, u) => (ne(), oe("div", {
      ref_key: "rootElement",
      ref: xi,
      class: "pnl-tst"
    }, [
      Jc.value ? (ne(), oe("div", {
        key: 0,
        class: "pnl-tst-toolbar",
        role: "toolbar",
        "aria-orientation": "horizontal",
        "aria-label": Qc.value
      }, [
        (ne(!0), oe(Ie, null, Fn(pr.value, (g) => (ne(), oe(Ie, {
          key: g.uid
        }, [
          g.id === "|" ? (ne(), oe("span", jv)) : g.id === "search" ? (ne(), oe("label", zv, [
            xe("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: $t(Dv)
            }, null, 8, Kv),
            xe("input", {
              ref_for: !0,
              ref: (v) => To.value = v,
              type: "search",
              value: $e.value,
              "aria-label": ui.value,
              placeholder: ui.value,
              onInput: u[0] || (u[0] = (v) => en(v.target.value))
            }, null, 40, Vv)
          ])) : (ne(), oe("button", {
            key: 2,
            ref_for: !0,
            ref: (v) => hu(g.uid, v),
            type: "button",
            class: "pnl-tst-tbtn",
            "aria-label": g.label,
            "aria-keyshortcuts": g.keys,
            "aria-disabled": !In(g),
            title: pu(g),
            tabindex: g.uid === wi.value ? 0 : -1,
            onClick: (v) => ko(g),
            onFocus: (v) => _r.value = g.uid,
            onKeydown: mu
          }, [
            xe("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: g.icon
            }, null, 8, Nv)
          ], 40, Bv))
        ], 64))), 128))
      ], 8, Lv)) : qe("", !0),
      te.value.length === 0 ? (ne(), oe("div", $v, Pt(Ht.value), 1)) : (ne(), oe("div", {
        key: 2,
        class: rt(["pnl-tst-grid", { "pnl-tst-grid--resizing": we.value !== null }]),
        role: "treegrid",
        "aria-label": Co.value,
        "aria-colcount": We.value.length,
        "aria-rowcount": Sn.value,
        style: kt(Lt.value),
        onKeydown: Bc
      }, [
        r.value ? (ne(), oe("div", Uv, [
          xe("div", qv, [
            (ne(!0), oe(Ie, null, Fn(We.value, (g, v) => (ne(), oe("div", {
              key: g.id,
              ref_for: !0,
              ref: (D) => p(g.column.id, D),
              class: rt(["pnl-tst-hcell", { "pnl-tst-hcell--sortable": _(g) }]),
              role: "columnheader",
              "aria-colindex": v + 1,
              "aria-sort": F(g),
              "aria-keyshortcuts": K(g) ? "Alt+ArrowLeft Alt+ArrowRight Alt+Home" : void 0,
              tabindex: Mt.value && g.column.id === m.value ? 0 : -1,
              style: kt(nn(v)),
              onClick: (D) => x(g),
              onFocus: (D) => Qe.value = g.column.id,
              onKeydown: (D) => Q(g, D)
            }, [
              xe("span", Xv, Pt(g.column.columnDef.header), 1),
              k(g) ? (ne(), oe("span", {
                key: 0,
                class: "pnl-tst-sortind",
                "aria-hidden": "true",
                innerHTML: k(g)
              }, null, 8, Yv)) : qe("", !0),
              K(g) ? (ne(), oe("span", {
                key: 1,
                class: rt(["pnl-tst-resize", { "pnl-tst-resize--active": we.value === g.column.id }]),
                "aria-hidden": "true",
                onClick: u[1] || (u[1] = cn(() => {
                }, ["stop"])),
                onDblclick: cn((D) => N(g), ["stop"]),
                onMousedown: (D) => L(g, D),
                onTouchstart: (D) => L(g, D)
              }, null, 42, Zv)) : qe("", !0)
            ], 46, Gv))), 128))
          ])
        ])) : qe("", !0),
        xe("div", Jv, [
          (ne(!0), oe(Ie, null, Fn(te.value, (g, v) => (ne(), oe("div", {
            key: g.id,
            ref_for: !0,
            ref: (D) => Vc(g.id, D),
            class: rt(["pnl-tst-row", [
              ku(g),
              {
                "pnl-tst-row--active": gt.value && g.id === Ce.value,
                "pnl-tst-row--quiet": !gt.value && g.id === Ce.value,
                "pnl-tst-row--cut": tu.value.has(g.id)
              }
            ]]),
            role: "row",
            "aria-level": g.depth + 1,
            "aria-posinset": ye(g),
            "aria-setsize": Se(g),
            "aria-rowindex": v + tn.value,
            "aria-expanded": Me(g) ? Ee(g) : void 0,
            "aria-selected": I.value ? g.getIsSelected() : void 0,
            "aria-haspopup": Cr.value ? "menu" : void 0,
            tabindex: !Mt.value && g.id === xn.value ? 0 : -1,
            onClick: (D) => Wc(g, D),
            onContextmenu: (D) => yu(g, D),
            onFocus: (D) => jt(g.id)
          }, [
            Ci(g) ? (ne(), oe("span", {
              key: 0,
              class: rt(["pnl-tst-dropline", Ci(g)]),
              style: kt(Tu(g)),
              "aria-hidden": "true"
            }, null, 6)) : qe("", !0),
            (ne(!0), oe(Ie, null, Fn(g.getAllCells(), (D, U) => (ne(), oe("div", {
              key: D.id,
              class: rt(["pnl-tst-cell", { "pnl-tst-cell--tree": U === 0 }]),
              role: "gridcell",
              "aria-colindex": U + 1,
              style: kt(U === 0 ? ke(g) : nn(U))
            }, [
              U === 0 ? (ne(), oe(Ie, { key: 0 }, [
                Me(g) ? (ne(), oe("span", {
                  key: 0,
                  class: rt(["pnl-tst-twisty", { "pnl-tst-twisty--open": Ee(g) }]),
                  "aria-hidden": "true",
                  onClick: cn((me) => Uc(g), ["stop"])
                }, [...u[4] || (u[4] = [
                  xe("svg", {
                    viewBox: "0 0 16 16",
                    width: "12",
                    height: "12",
                    focusable: "false"
                  }, [
                    xe("path", {
                      d: "M6 3.5 10.5 8 6 12.5",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "1.6"
                    })
                  ], -1)
                ])], 10, t0)) : (ne(), oe("span", n0)),
                T.value ? (ne(), oe("input", {
                  key: 2,
                  class: "pnl-tst-check",
                  type: "checkbox",
                  tabindex: "-1",
                  checked: li(g),
                  ".indeterminate": qc(g),
                  "aria-label": `Select ${g.original.title ?? g.id}`,
                  onClick: cn((me) => Xc(g), ["stop"])
                }, null, 40, r0)) : qe("", !0),
                A(g) ? (ne(), oe("span", {
                  key: 3,
                  class: "pnl-tst-icon",
                  "aria-hidden": "true",
                  innerHTML: A(g)
                }, null, 8, o0)) : qe("", !0)
              ], 64)) : qe("", !0),
              U === 0 && rn.value === g.id ? (ne(), oe("input", {
                key: 1,
                ref_for: !0,
                ref: (me) => Cn.value = me,
                class: "pnl-tst-edit",
                type: "text",
                value: mr.value,
                "aria-label": `Rename ${g.original.title ?? g.id}`,
                onInput: u[2] || (u[2] = (me) => mr.value = me.target.value),
                onClick: u[3] || (u[3] = cn(() => {
                }, ["stop"])),
                onKeydown: cn((me) => au(g, me), ["stop"]),
                onBlur: (me) => pi(g)
              }, null, 40, s0)) : (ne(), oe("span", i0, Pt(D.getValue()), 1))
            ], 14, e0))), 128))
          ], 42, Qv))), 128))
        ])
      ], 46, Wv)),
      ht.value ? (ne(), oe("div", l0, [
        xe("div", {
          class: "pnl-tst-dialog",
          role: "alertdialog",
          "aria-modal": "true",
          "aria-label": "Rename",
          "aria-describedby": "pnl-tst-confirm-message",
          onKeydown: iu
        }, [
          xe("p", a0, " Rename " + Pt(ht.value.previous) + " to " + Pt(ht.value.title) + "? If you change a file name extension, the file might become unusable. ", 1),
          xe("div", c0, [
            xe("button", {
              ref_key: "confirmYesButton",
              ref: Po,
              type: "button",
              class: "pnl-tst-dbtn",
              "aria-keyshortcuts": "Y",
              onClick: hi
            }, [...u[5] || (u[5] = [
              xe("span", { class: "pnl-tst-dkey" }, "Y", -1),
              _s("es ", -1)
            ])], 512),
            xe("button", {
              ref_key: "confirmNoButton",
              ref: Do,
              type: "button",
              class: "pnl-tst-dbtn",
              "aria-keyshortcuts": "N",
              onClick: mi
            }, [...u[6] || (u[6] = [
              xe("span", { class: "pnl-tst-dkey" }, "N", -1),
              _s("o ", -1)
            ])], 512)
          ])
        ], 32)
      ])) : qe("", !0),
      Mn.value ? (ne(), oe("div", {
        key: 4,
        ref_key: "menuElement",
        ref: Rr,
        class: "pnl-tst-menu",
        role: "menu",
        "aria-orientation": "vertical",
        "aria-label": vu.value,
        style: kt({ left: `${En.value.left}px`, top: `${En.value.top}px` }),
        onKeydown: xu
      }, [
        (ne(!0), oe(Ie, null, Fn(Mo.value, (g) => (ne(), oe(Ie, {
          key: g.uid
        }, [
          g.id === "|" ? (ne(), oe("div", f0)) : (ne(), oe("button", {
            key: 1,
            ref_for: !0,
            ref: (v) => wu(g.uid, v),
            type: "button",
            class: "pnl-tst-mitem",
            role: "menuitem",
            "aria-keyshortcuts": g.keys,
            "aria-disabled": !In(g),
            tabindex: yi(g) === on.value ? 0 : -1,
            onClick: (v) => Su(g),
            onFocus: (v) => on.value = yi(g)
          }, [
            xe("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: g.icon
            }, null, 8, g0),
            xe("span", p0, Pt(g.label), 1),
            g.keys ? (ne(), oe("span", h0, Pt(vi(g)), 1)) : qe("", !0)
          ], 40, d0))
        ], 64))), 128))
      ], 44, u0)) : qe("", !0)
    ], 512));
  }
};
function y0({ model: e, el: t }) {
  t.style.display = "block", t.style.width = "100%", t.style.height = "100%";
  const n = document.createElement("div");
  n.className = "pnl-tst-root", n.style.height = "100%", t.append(n);
  const r = /* @__PURE__ */ lo({
    source: e.get("source") || [],
    columns: e.get("columns") || [],
    options: e.get("options") || {},
    icons: e.get("icons") || {},
    filterText: e.get("filter_text") || "",
    editingKey: e.get("editing_key") || "",
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
  let i = 0;
  const a = (I, C) => {
    i += 1, s.push({ seq: i, event_name: I, event_params: C }), s.length > o && s.shift(), e.set("_event_data", { events: [...s], timestamp: Date.now() }), e.save_changes();
  }, c = (I, C) => I.length === C.length && I.every((T, H) => T === C[H]), f = (I) => (C) => {
    const T = [...e.get(I) || []].sort();
    c(T, C) || (e.set(I, C), e.save_changes());
  }, d = f("expanded_keys"), h = f("selected_keys"), w = (I) => {
    (e.get("filter_text") || "") !== I && (e.set("filter_text", I), e.save_changes());
  }, y = (I) => {
    (e.get("editing_key") || "") !== I && (e.set("editing_key", I), e.save_changes());
  }, O = (I, C) => I.length === C.length && I.every((T, H) => T.id === C[H].id && !!T.desc == !!C[H].desc), M = (I) => {
    O(e.get("sorting") || [], I) || (e.set("sorting", I), e.save_changes());
  }, A = (I, C) => {
    const T = Object.keys(I);
    return T.length === Object.keys(C).length && T.every((H) => I[H] === C[H]);
  }, S = ng(w0, {
    state: r,
    emitEvent: a,
    setExpandedKeys: d,
    setSelectedKeys: h,
    setFilterText: w,
    setEditingKey: y,
    setSorting: M,
    setColumnWidths: (I) => {
      A(e.get("column_widths") || {}, I) || (e.set("column_widths", I), e.save_changes());
    }
  });
  return S.mount(n), e.on("change:source", () => {
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
    S.unmount();
  };
}
export {
  y0 as render
};

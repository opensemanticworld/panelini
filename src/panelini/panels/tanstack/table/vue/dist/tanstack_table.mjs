/**
* @vue/shared v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function rs(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const ce = {}, ln = [], st = () => {
}, Hi = () => !1, Dr = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Fr = (e) => e.startsWith("onUpdate:"), Ie = Object.assign, os = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, cc = Object.prototype.hasOwnProperty, ne = (e, t) => cc.call(e, t), N = Array.isArray, Ot = (e) => zn(e) === "[object Map]", Sr = (e) => zn(e) === "[object Set]", Ls = (e) => zn(e) === "[object Date]", W = (e) => typeof e == "function", ge = (e) => typeof e == "string", it = (e) => typeof e == "symbol", se = (e) => e !== null && typeof e == "object", ji = (e) => (se(e) || W(e)) && W(e.then) && W(e.catch), Li = Object.prototype.toString, zn = (e) => Li.call(e), uc = (e) => zn(e).slice(8, -1), Ki = (e) => zn(e) === "[object Object]", ss = (e) => ge(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Pn = /* @__PURE__ */ rs(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Hr = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, fc = /-\w/g, ze = Hr(
  (e) => e.replace(fc, (t) => t.slice(1).toUpperCase())
), dc = /\B([A-Z])/g, qt = Hr(
  (e) => e.replace(dc, "-$1").toLowerCase()
), Vi = Hr((e) => e.charAt(0).toUpperCase() + e.slice(1)), yo = Hr(
  (e) => e ? `on${Vi(e)}` : ""
), rt = (e, t) => !Object.is(e, t), bo = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Bi = (e, t, n, r = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: r,
    value: n
  });
}, pc = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Ks;
const jr = () => Ks || (Ks = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function jt(e) {
  if (N(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], o = ge(r) ? mc(r) : jt(r);
      if (o)
        for (const s in o)
          t[s] = o[s];
    }
    return t;
  } else if (ge(e) || se(e))
    return e;
}
const gc = /;(?![^(]*\))/g, hc = /:([^]+)/, vc = /\/\*[^]*?\*\//g;
function mc(e) {
  const t = {};
  return e.replace(vc, "").split(gc).forEach((n) => {
    if (n) {
      const r = n.split(hc);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function Lt(e) {
  let t = "";
  if (ge(e))
    t = e;
  else if (N(e))
    for (let n = 0; n < e.length; n++) {
      const r = Lt(e[n]);
      r && (t += r + " ");
    }
  else if (se(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const wc = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", yc = /* @__PURE__ */ rs(wc);
function $i(e) {
  return !!e || e === "";
}
function bc(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let r = 0; n && r < e.length; r++)
    n = Lr(e[r], t[r]);
  return n;
}
function Vs(e, t) {
  if (e.size !== t.size) return !1;
  const n = Array.from(t), r = new Uint8Array(n.length);
  for (const o of e) {
    let s = -1;
    for (let i = 0; i < n.length; i++)
      if (!r[i] && Lr(o, n[i])) {
        s = i;
        break;
      }
    if (s < 0) return !1;
    r[s] = 1;
  }
  return !0;
}
function Lr(e, t) {
  if (e === t) return !0;
  let n = Ls(e), r = Ls(t);
  if (n || r)
    return n && r ? e.getTime() === t.getTime() : !1;
  if (n = it(e), r = it(t), n || r)
    return e === t;
  if (n = N(e), r = N(t), n || r)
    return n && r ? bc(e, t) : !1;
  if (n = se(e), r = se(t), n || r) {
    if (!n || !r)
      return !1;
    if (n = Ot(e), r = Ot(t), n || r || (n = Sr(e), r = Sr(t), n || r))
      return n && r ? Vs(e, t) : !1;
    const o = Object.keys(e).length, s = Object.keys(t).length;
    if (o !== s)
      return !1;
    for (const i in e) {
      const l = e.hasOwnProperty(i), c = t.hasOwnProperty(i);
      if (l && !c || !l && c || !Lr(e[i], t[i]))
        return !1;
    }
  }
  return String(e) === String(t);
}
const Ni = (e) => !!(e && e.__v_isRef === !0), It = (e) => ge(e) ? e : e == null ? "" : N(e) || se(e) && (e.toString === Li || !W(e.toString)) ? Ni(e) ? It(e.value) : JSON.stringify(e, Ui, 2) : String(e), Ui = (e, t) => Ni(t) ? Ui(e, t.value) : Ot(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [r, o], s) => (n[_o(r, s) + " =>"] = o, n),
    {}
  )
} : Sr(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => _o(n))
} : it(t) ? _o(t) : se(t) && !N(t) && !Ki(t) ? String(t) : t, _o = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    it(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let we;
class _c {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && we && (we.active ? (this.parent = we, this.index = (we.scopes || (we.scopes = [])).push(
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
      const n = we;
      try {
        return we = this, t();
      } finally {
        we = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = we, we = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (we === this)
        we = this.prevScope;
      else {
        let t = we;
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
function Wi() {
  return we;
}
function xc(e, t = !1) {
  we && we.cleanups.push(e);
}
let ae;
const xo = /* @__PURE__ */ new WeakSet();
class zi {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, we && (we.active ? we.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, xo.has(this) && (xo.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Gi(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Bs(this), Yi(this);
    const t = ae, n = qe;
    ae = this, qe = !0;
    try {
      return this.fn();
    } finally {
      Xi(this), ae = t, qe = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        as(t);
      this.deps = this.depsTail = void 0, Bs(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? xo.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    jo(this) && this.run();
  }
  get dirty() {
    return jo(this);
  }
}
let qi = 0, kn, Tn;
function Gi(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Tn, Tn = e;
    return;
  }
  e.next = kn, kn = e;
}
function is() {
  qi++;
}
function ls() {
  if (--qi > 0)
    return;
  if (Tn) {
    let t = Tn;
    for (Tn = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; kn; ) {
    let t = kn;
    for (kn = void 0; t; ) {
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
function Yi(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Xi(e) {
  let t, n = e.depsTail, r = n;
  for (; r; ) {
    const o = r.prevDep;
    r.version === -1 ? (r === n && (n = o), as(r), Sc(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = o;
  }
  e.deps = t, e.depsTail = n;
}
function jo(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Ji(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Ji(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Ln) || (e.globalVersion = Ln, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !jo(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = ae, r = qe;
  ae = e, qe = !0;
  try {
    Yi(e);
    const o = e.fn(e._value);
    (t.version === 0 || rt(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    ae = n, qe = r, Xi(e), e.flags &= -3;
  }
}
function as(e, t = !1) {
  const { dep: n, prevSub: r, nextSub: o } = e;
  if (r && (r.nextSub = o, e.prevSub = void 0), o && (o.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
    n.computed.flags &= -5;
    for (let s = n.computed.deps; s; s = s.nextDep)
      as(s, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Sc(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let qe = !0;
const Zi = [];
function ht() {
  Zi.push(qe), qe = !1;
}
function vt() {
  const e = Zi.pop();
  qe = e === void 0 ? !0 : e;
}
function Bs(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = ae;
    ae = void 0;
    try {
      t();
    } finally {
      ae = n;
    }
  }
}
let Ln = 0;
class Rc {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class cs {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!ae || !qe || ae === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== ae)
      n = this.activeLink = new Rc(ae, this), ae.deps ? (n.prevDep = ae.depsTail, ae.depsTail.nextDep = n, ae.depsTail = n) : ae.deps = ae.depsTail = n, Qi(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const r = n.nextDep;
      r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = ae.depsTail, n.nextDep = void 0, ae.depsTail.nextDep = n, ae.depsTail = n, ae.deps === n && (ae.deps = r);
    }
    return n;
  }
  trigger(t) {
    this.version++, Ln++, this.notify(t);
  }
  notify(t) {
    is();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      ls();
    }
  }
}
function Qi(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let r = t.deps; r; r = r.nextDep)
        Qi(r);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const Lo = /* @__PURE__ */ new WeakMap(), Kt = /* @__PURE__ */ Symbol(
  ""
), Ko = /* @__PURE__ */ Symbol(
  ""
), Kn = /* @__PURE__ */ Symbol(
  ""
);
function Ce(e, t, n) {
  if (qe && ae) {
    let r = Lo.get(e);
    r || Lo.set(e, r = /* @__PURE__ */ new Map());
    let o = r.get(n);
    o || (r.set(n, o = new cs()), o.map = r, o.key = n), o.track();
  }
}
function pt(e, t, n, r, o, s) {
  const i = Lo.get(e);
  if (!i) {
    Ln++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if (is(), t === "clear")
    i.forEach(l);
  else {
    const c = N(e), f = c && ss(n);
    if (c && n === "length") {
      const d = Number(r);
      i.forEach((v, b) => {
        (b === "length" || b === Kn || !it(b) && b >= d) && l(v);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && l(i.get(n)), f && l(i.get(Kn)), t) {
        case "add":
          c ? f && l(i.get("length")) : (l(i.get(Kt)), Ot(e) && l(i.get(Ko)));
          break;
        case "delete":
          c || (l(i.get(Kt)), Ot(e) && l(i.get(Ko)));
          break;
        case "set":
          Ot(e) && l(i.get(Kt));
          break;
      }
  }
  ls();
}
function nn(e) {
  const t = /* @__PURE__ */ te(e);
  return t === e ? t : (Ce(t, "iterate", Kn), /* @__PURE__ */ Ne(e) ? t : t.map(Ge));
}
function Kr(e) {
  return Ce(e = /* @__PURE__ */ te(e), "iterate", Kn), e;
}
function tt(e, t) {
  return /* @__PURE__ */ mt(e) ? un(/* @__PURE__ */ Vt(e) ? Ge(t) : t) : Ge(t);
}
const Cc = {
  __proto__: null,
  [Symbol.iterator]() {
    return So(this, Symbol.iterator, (e) => tt(this, e));
  },
  concat(...e) {
    return nn(this).concat(
      ...e.map((t) => N(t) ? nn(t) : t)
    );
  },
  entries() {
    return So(this, "entries", (e) => (e[1] = tt(this, e[1]), e));
  },
  every(e, t) {
    return ct(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return ct(
      this,
      "filter",
      e,
      t,
      (n) => n.map((r) => tt(this, r)),
      arguments
    );
  },
  find(e, t) {
    return ct(
      this,
      "find",
      e,
      t,
      (n) => tt(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return ct(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return ct(
      this,
      "findLast",
      e,
      t,
      (n) => tt(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return ct(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return ct(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Ro(this, "includes", e);
  },
  indexOf(...e) {
    return Ro(this, "indexOf", e);
  },
  join(e) {
    return nn(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Ro(this, "lastIndexOf", e);
  },
  map(e, t) {
    return ct(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Rn(this, "pop");
  },
  push(...e) {
    return Rn(this, "push", e);
  },
  reduce(e, ...t) {
    return $s(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return $s(this, "reduceRight", e, t);
  },
  shift() {
    return Rn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return ct(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Rn(this, "splice", e);
  },
  toReversed() {
    return nn(this).toReversed();
  },
  toSorted(e) {
    return nn(this).toSorted(e);
  },
  toSpliced(...e) {
    return nn(this).toSpliced(...e);
  },
  unshift(...e) {
    return Rn(this, "unshift", e);
  },
  values() {
    return So(this, "values", (e) => tt(this, e));
  }
};
function So(e, t, n) {
  const r = Kr(e), o = r[t]();
  return r !== e && !/* @__PURE__ */ Ne(e) && (o._next = o.next, o.next = () => {
    const s = o._next();
    return s.done || (s.value = n(s.value)), s;
  }), o;
}
const Mc = Array.prototype;
function ct(e, t, n, r, o, s) {
  const i = Kr(e), l = i !== e && !/* @__PURE__ */ Ne(e), c = i[t];
  if (c !== Mc[t]) {
    const v = c.apply(e, s);
    return l ? Ge(v) : v;
  }
  let f = n;
  i !== e && (l ? f = function(v, b) {
    return n.call(this, tt(e, v), b, e);
  } : n.length > 2 && (f = function(v, b) {
    return n.call(this, v, b, e);
  }));
  const d = c.call(i, f, r);
  return l && o ? o(d) : d;
}
function $s(e, t, n, r) {
  const o = Kr(e), s = o !== e && !/* @__PURE__ */ Ne(e);
  let i = n, l = !1;
  o !== e && (s ? (l = r.length === 0, i = function(f, d, v) {
    return l && (l = !1, f = tt(e, f)), n.call(this, f, tt(e, d), v, e);
  }) : n.length > 3 && (i = function(f, d, v) {
    return n.call(this, f, d, v, e);
  }));
  const c = o[t](i, ...r);
  return l ? tt(e, c) : c;
}
function Ro(e, t, n) {
  const r = /* @__PURE__ */ te(e);
  Ce(r, "iterate", Kn);
  const o = r[t](...n);
  return (o === -1 || o === !1) && /* @__PURE__ */ ds(n[0]) ? (n[0] = /* @__PURE__ */ te(n[0]), r[t](...n)) : o;
}
function Rn(e, t, n = []) {
  ht(), is();
  const r = (/* @__PURE__ */ te(e))[t].apply(e, n);
  return ls(), vt(), r;
}
const Ic = /* @__PURE__ */ rs("__proto__,__v_isRef,__isVue"), el = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(it)
);
function Ec(e) {
  it(e) || (e = String(e));
  const t = /* @__PURE__ */ te(this);
  return Ce(t, "has", e), t.hasOwnProperty(e);
}
class tl {
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
      return r === (o ? s ? Lc : sl : s ? ol : rl).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const i = N(t);
    if (!o) {
      let c;
      if (i && (c = Cc[n]))
        return c;
      if (n === "hasOwnProperty")
        return Ec;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ Me(t) ? t : r
    );
    if ((it(n) ? el.has(n) : Ic(n)) || (o || Ce(t, "get", n), s))
      return l;
    if (/* @__PURE__ */ Me(l)) {
      const c = i && ss(n) ? l : l.value;
      return o && se(c) ? /* @__PURE__ */ Bo(c) : c;
    }
    return se(l) ? o ? /* @__PURE__ */ Bo(l) : /* @__PURE__ */ Vr(l) : l;
  }
}
class nl extends tl {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, o) {
    let s = t[n];
    const i = N(t) && ss(n);
    if (!this._isShallow) {
      const f = /* @__PURE__ */ mt(s);
      if (!/* @__PURE__ */ Ne(r) && !/* @__PURE__ */ mt(r) && (s = /* @__PURE__ */ te(s), r = /* @__PURE__ */ te(r)), !i && /* @__PURE__ */ Me(s) && !/* @__PURE__ */ Me(r))
        return f || (s.value = r), !0;
    }
    const l = i ? Number(n) < t.length : ne(t, n), c = Reflect.set(
      t,
      n,
      r,
      /* @__PURE__ */ Me(t) ? t : o
    );
    return t === /* @__PURE__ */ te(o) && c && (l ? rt(r, s) && pt(t, "set", n, r) : pt(t, "add", n, r)), c;
  }
  deleteProperty(t, n) {
    const r = ne(t, n);
    t[n];
    const o = Reflect.deleteProperty(t, n);
    return o && r && pt(t, "delete", n, void 0), o;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!it(n) || !el.has(n)) && Ce(t, "has", n), r;
  }
  ownKeys(t) {
    return Ce(
      t,
      "iterate",
      N(t) ? "length" : Kt
    ), Reflect.ownKeys(t);
  }
}
class Ac extends tl {
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
const Oc = /* @__PURE__ */ new nl(), Pc = /* @__PURE__ */ new Ac(), kc = /* @__PURE__ */ new nl(!0);
const Vo = (e) => e, dr = (e) => Reflect.getPrototypeOf(e);
function Tc(e, t, n) {
  return function(...r) {
    const o = this.__v_raw, s = /* @__PURE__ */ te(o), i = Ot(s), l = e === "entries" || e === Symbol.iterator && i, c = e === "keys" && i, f = o[e](...r), d = n ? Vo : t ? un : Ge;
    return !t && Ce(
      s,
      "iterate",
      c ? Ko : Kt
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
function pr(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Dc(e, t) {
  const n = {
    get(o) {
      const s = this.__v_raw, i = /* @__PURE__ */ te(s), l = /* @__PURE__ */ te(o);
      e || (rt(o, l) && Ce(i, "get", o), Ce(i, "get", l));
      const { has: c } = dr(i), f = t ? Vo : e ? un : Ge;
      if (c.call(i, o))
        return f(s.get(o));
      if (c.call(i, l))
        return f(s.get(l));
      s !== i && s.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && Ce(/* @__PURE__ */ te(o), "iterate", Kt), o.size;
    },
    has(o) {
      const s = this.__v_raw, i = /* @__PURE__ */ te(s), l = /* @__PURE__ */ te(o);
      return e || (rt(o, l) && Ce(i, "has", o), Ce(i, "has", l)), o === l ? s.has(o) : s.has(o) || s.has(l);
    },
    forEach(o, s) {
      const i = this, l = i.__v_raw, c = /* @__PURE__ */ te(l), f = t ? Vo : e ? un : Ge;
      return !e && Ce(c, "iterate", Kt), l.forEach((d, v) => o.call(s, f(d), f(v), i));
    }
  };
  return Ie(
    n,
    e ? {
      add: pr("add"),
      set: pr("set"),
      delete: pr("delete"),
      clear: pr("clear")
    } : {
      add(o) {
        const s = /* @__PURE__ */ te(this), i = dr(s), l = /* @__PURE__ */ te(o), c = !t && !/* @__PURE__ */ Ne(o) && !/* @__PURE__ */ mt(o) ? l : o;
        return i.has.call(s, c) || rt(o, c) && i.has.call(s, o) || rt(l, c) && i.has.call(s, l) || (s.add(c), pt(s, "add", c, c)), this;
      },
      set(o, s) {
        !t && !/* @__PURE__ */ Ne(s) && !/* @__PURE__ */ mt(s) && (s = /* @__PURE__ */ te(s));
        const i = /* @__PURE__ */ te(this), { has: l, get: c } = dr(i);
        let f = l.call(i, o);
        f || (o = /* @__PURE__ */ te(o), f = l.call(i, o));
        const d = c.call(i, o);
        return i.set(o, s), f ? rt(s, d) && pt(i, "set", o, s) : pt(i, "add", o, s), this;
      },
      delete(o) {
        const s = /* @__PURE__ */ te(this), { has: i, get: l } = dr(s);
        let c = i.call(s, o);
        c || (o = /* @__PURE__ */ te(o), c = i.call(s, o)), l && l.call(s, o);
        const f = s.delete(o);
        return c && pt(s, "delete", o, void 0), f;
      },
      clear() {
        const o = /* @__PURE__ */ te(this), s = o.size !== 0, i = o.clear();
        return s && pt(
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
    n[o] = Tc(o, e, t);
  }), n;
}
function us(e, t) {
  const n = Dc(e, t);
  return (r, o, s) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(
    ne(n, o) && o in r ? n : r,
    o,
    s
  );
}
const Fc = {
  get: /* @__PURE__ */ us(!1, !1)
}, Hc = {
  get: /* @__PURE__ */ us(!1, !0)
}, jc = {
  get: /* @__PURE__ */ us(!0, !1)
};
const rl = /* @__PURE__ */ new WeakMap(), ol = /* @__PURE__ */ new WeakMap(), sl = /* @__PURE__ */ new WeakMap(), Lc = /* @__PURE__ */ new WeakMap();
function Kc(e) {
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
function Vr(e) {
  return /* @__PURE__ */ mt(e) ? e : fs(
    e,
    !1,
    Oc,
    Fc,
    rl
  );
}
// @__NO_SIDE_EFFECTS__
function Vc(e) {
  return fs(
    e,
    !1,
    kc,
    Hc,
    ol
  );
}
// @__NO_SIDE_EFFECTS__
function Bo(e) {
  return fs(
    e,
    !0,
    Pc,
    jc,
    sl
  );
}
function fs(e, t, n, r, o) {
  if (!se(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const s = o.get(e);
  if (s)
    return s;
  const i = Kc(uc(e));
  if (i === 0)
    return e;
  const l = new Proxy(
    e,
    i === 2 ? r : n
  );
  return o.set(e, l), l;
}
// @__NO_SIDE_EFFECTS__
function Vt(e) {
  return /* @__PURE__ */ mt(e) ? /* @__PURE__ */ Vt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function mt(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Ne(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function ds(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function te(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ te(t) : e;
}
function Bc(e) {
  return !ne(e, "__v_skip") && Object.isExtensible(e) && Bi(e, "__v_skip", !0), e;
}
const Ge = (e) => se(e) ? /* @__PURE__ */ Vr(e) : e, un = (e) => se(e) ? /* @__PURE__ */ Bo(e) : e;
// @__NO_SIDE_EFFECTS__
function Me(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function pe(e) {
  return il(e, !1);
}
// @__NO_SIDE_EFFECTS__
function $c(e) {
  return il(e, !0);
}
function il(e, t) {
  return /* @__PURE__ */ Me(e) ? e : new Nc(e, t);
}
class Nc {
  constructor(t, n) {
    this.dep = new cs(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ te(t), this._value = n ? t : Ge(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, r = this.__v_isShallow || /* @__PURE__ */ Ne(t) || /* @__PURE__ */ mt(t);
    t = r ? t : /* @__PURE__ */ te(t), rt(t, n) && (this._rawValue = t, this._value = r ? t : Ge(t), this.dep.trigger());
  }
}
function Bt(e) {
  return /* @__PURE__ */ Me(e) ? e.value : e;
}
const Uc = {
  get: (e, t, n) => t === "__v_raw" ? e : Bt(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return /* @__PURE__ */ Me(o) && !/* @__PURE__ */ Me(n) ? (o.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function ll(e) {
  return /* @__PURE__ */ Vt(e) ? e : new Proxy(e, Uc);
}
class Wc {
  constructor(t, n, r) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new cs(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Ln - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    ae !== this)
      return Gi(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Ji(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function zc(e, t, n = !1) {
  let r, o;
  return W(e) ? r = e : (r = e.get, o = e.set), new Wc(r, o, n);
}
const gr = {}, Rr = /* @__PURE__ */ new WeakMap();
let Ht;
function qc(e, t = !1, n = Ht) {
  if (n) {
    let r = Rr.get(n);
    r || Rr.set(n, r = []), r.push(e);
  }
}
function Gc(e, t, n = ce) {
  const { immediate: r, deep: o, once: s, scheduler: i, augmentJob: l, call: c } = n, f = (E) => o ? E : /* @__PURE__ */ Ne(E) || o === !1 || o === 0 ? At(E, 1) : At(E);
  let d, v, b, y, I = !1, C = !1;
  if (/* @__PURE__ */ Me(e) ? (v = () => e.value, I = /* @__PURE__ */ Ne(e)) : /* @__PURE__ */ Vt(e) ? (v = () => f(e), I = !0) : N(e) ? (C = !0, I = e.some((E) => /* @__PURE__ */ Vt(E) || /* @__PURE__ */ Ne(E)), v = () => e.map((E) => {
    if (/* @__PURE__ */ Me(E))
      return E.value;
    if (/* @__PURE__ */ Vt(E))
      return f(E);
    if (W(E))
      return c ? c(E, 2) : E();
  })) : W(e) ? t ? v = c ? () => c(e, 2) : e : v = () => {
    if (b) {
      ht();
      try {
        b();
      } finally {
        vt();
      }
    }
    const E = Ht;
    Ht = d;
    try {
      return c ? c(e, 3, [y]) : e(y);
    } finally {
      Ht = E;
    }
  } : v = st, t && o) {
    const E = v, $ = o === !0 ? 1 / 0 : o;
    v = () => At(E(), $);
  }
  const k = Wi(), H = () => {
    d.stop(), k && k.active && os(k.effects, d);
  };
  if (s && t) {
    const E = t;
    t = (...$) => {
      const U = E(...$);
      return H(), U;
    };
  }
  let M = C ? new Array(e.length).fill(gr) : gr;
  const K = (E) => {
    if (!(!(d.flags & 1) || !d.dirty && !E))
      if (t) {
        const $ = d.run();
        if (E || o || I || (C ? $.some((U, ue) => rt(U, M[ue])) : rt($, M))) {
          b && b();
          const U = Ht;
          Ht = d;
          try {
            const ue = [
              $,
              // pass undefined as the old value when it's changed for the first time
              M === gr ? void 0 : C && M[0] === gr ? [] : M,
              y
            ];
            M = $, c ? c(t, 3, ue) : (
              // @ts-expect-error
              t(...ue)
            );
          } finally {
            Ht = U;
          }
        }
      } else
        d.run();
  };
  return l && l(K), d = new zi(v), d.scheduler = i ? () => i(K, !1) : K, y = (E) => qc(E, !1, d), b = d.onStop = () => {
    const E = Rr.get(d);
    if (E) {
      if (c)
        c(E, 4);
      else
        for (const $ of E) $();
      Rr.delete(d);
    }
  }, t ? r ? K(!0) : M = d.run() : i ? i(K.bind(null, !0), !0) : d.run(), H.pause = d.pause.bind(d), H.resume = d.resume.bind(d), H.stop = H, H;
}
function At(e, t = 1 / 0, n) {
  if (t <= 0 || !se(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ Me(e))
    At(e.value, t, n);
  else if (N(e))
    for (let r = 0; r < e.length; r++)
      At(e[r], t, n);
  else if (Sr(e) || Ot(e))
    e.forEach((r) => {
      At(r, t, n);
    });
  else if (Ki(e)) {
    for (const r in e)
      At(e[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, r) && At(e[r], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function qn(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (o) {
    Br(o, t, n);
  }
}
function Ye(e, t, n, r) {
  if (W(e)) {
    const o = qn(e, t, n, r);
    return o && ji(o) && o.catch((s) => {
      Br(s, t, n);
    }), o;
  }
  if (N(e)) {
    const o = [];
    for (let s = 0; s < e.length; s++)
      o.push(Ye(e[s], t, n, r));
    return o;
  }
}
function Br(e, t, n, r = !0) {
  const o = t ? t.vnode : null, { errorHandler: s, throwUnhandledErrorInProduction: i } = t && t.appContext.config || ce;
  if (t) {
    let l = t.parent;
    const c = t.proxy, f = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const d = l.ec;
      if (d) {
        for (let v = 0; v < d.length; v++)
          if (d[v](e, c, f) === !1)
            return;
      }
      l = l.parent;
    }
    if (s) {
      ht(), qn(s, null, 10, [
        e,
        c,
        f
      ]), vt();
      return;
    }
  }
  Yc(e, n, o, r, i);
}
function Yc(e, t, n, r = !0, o = !1) {
  if (o)
    throw e;
  console.error(e);
}
const ke = [];
let et = -1;
const an = [];
let Et = null, on = 0;
const al = /* @__PURE__ */ Promise.resolve();
let Cr = null;
function We(e) {
  const t = Cr || al;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Xc(e) {
  let t = et + 1, n = ke.length;
  for (; t < n; ) {
    const r = t + n >>> 1, o = ke[r], s = Vn(o);
    s < e || s === e && o.flags & 2 ? t = r + 1 : n = r;
  }
  return t;
}
function ps(e) {
  if (!(e.flags & 1)) {
    const t = Vn(e), n = ke[ke.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Vn(n) ? ke.push(e) : ke.splice(Xc(t), 0, e), e.flags |= 1, cl();
  }
}
function cl() {
  Cr || (Cr = al.then(fl));
}
function Jc(e) {
  if (!N(e))
    Et && e.id === -1 ? Et.splice(on + 1, 0, e) : e.flags & 1 || (an.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      an.push(e[t]);
  cl();
}
function Ns(e, t, n = et + 1) {
  for (; n < ke.length; n++) {
    const r = ke[n];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid)
        continue;
      ke.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function ul(e) {
  if (an.length) {
    const t = [...new Set(an)].sort(
      (n, r) => Vn(n) - Vn(r)
    );
    if (an.length = 0, Et) {
      for (let n = 0; n < t.length; n++)
        Et.push(t[n]);
      return;
    }
    for (Et = t, on = 0; on < Et.length; on++) {
      const n = Et[on];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    Et = null, on = 0;
  }
}
const Vn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function fl(e) {
  try {
    for (et = 0; et < ke.length; et++) {
      const t = ke[et];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), qn(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; et < ke.length; et++) {
      const t = ke[et];
      t && (t.flags &= -2);
    }
    et = -1, ke.length = 0, ul(), Cr = null, (ke.length || an.length) && fl();
  }
}
let ot = null, dl = null;
function Mr(e) {
  const t = ot;
  return ot = e, dl = e && e.type.__scopeId || null, t;
}
function Zc(e, t = ot, n) {
  if (!t || e._n)
    return e;
  const r = (...o) => {
    r._d && ei(-1);
    const s = Mr(t), i = $t.length;
    let l;
    try {
      l = e(...o);
    } finally {
      for (let c = $t.length; c > i; c--) Hl();
      Mr(s), r._d && ei(1);
    }
    return l;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function Dt(e, t, n, r) {
  const o = e.dirs, s = t && t.dirs;
  for (let i = 0; i < o.length; i++) {
    const l = o[i];
    s && (l.oldValue = s[i].value);
    let c = l.dir[r];
    c && (ht(), Ye(c, n, 8, [
      e.el,
      l,
      e,
      t
    ]), vt());
  }
}
function Qc(e, t) {
  if (Te) {
    let n = Te.provides;
    const r = Te.parent && Te.parent.provides;
    r === n && (n = Te.provides = Object.create(r)), n[e] = t;
  }
}
function yr(e, t, n = !1) {
  const r = Yu();
  if (r || cn) {
    let o = cn ? cn._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && W(t) ? t.call(r && r.proxy) : t;
  }
}
const eu = /* @__PURE__ */ Symbol.for("v-scx"), tu = () => yr(eu);
function be(e, t, n) {
  return pl(e, t, n);
}
function pl(e, t, n = ce) {
  const { immediate: r, deep: o, flush: s, once: i } = n, l = Ie({}, n), c = t && r || !t && s !== "post";
  let f;
  if (Nn) {
    if (s === "sync") {
      const y = tu();
      f = y.__watcherHandles || (y.__watcherHandles = []);
    } else if (!c) {
      const y = () => {
      };
      return y.stop = st, y.resume = st, y.pause = st, y;
    }
  }
  const d = Te;
  l.call = (y, I, C) => Ye(y, d, I, C);
  let v = !1;
  s === "post" ? l.scheduler = (y) => {
    je(y, d && d.suspense);
  } : s !== "sync" && (v = !0, l.scheduler = (y, I) => {
    I ? y() : ps(y);
  }), l.augmentJob = (y) => {
    t && (y.flags |= 4), v && (y.flags |= 2, d && (y.id = d.uid, y.i = d));
  };
  const b = Gc(e, t, l);
  return Nn && (f ? f.push(b) : c && b()), b;
}
function nu(e, t, n) {
  const r = this.proxy, o = ge(e) ? e.includes(".") ? gl(r, e) : () => r[e] : e.bind(r, r);
  let s;
  W(t) ? s = t : (s = t.handler, n = t);
  const i = Gn(this), l = pl(o, s.bind(r), n);
  return i(), l;
}
function gl(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++)
      r = r[n[o]];
    return r;
  };
}
const ru = /* @__PURE__ */ Symbol("_vte"), $r = (e) => e.__isTeleport, Co = /* @__PURE__ */ Symbol("_leaveCb");
function ou(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== wt) {
        t = n;
        break;
      }
  }
  return t;
}
function hl(e) {
  if (!hs(e))
    return $r(e.type) && e.children ? ou(e.children) : e;
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
function gs(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    gs(
      $r(n.type) && hl(n) || n,
      t
    );
  } else e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function vl(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Us(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const Ir = /* @__PURE__ */ new WeakMap();
function Dn(e, t, n, r, o = !1) {
  if (N(e)) {
    e.forEach(
      (C, k) => Dn(
        C,
        t && (N(t) ? t[k] : t),
        n,
        r,
        o
      )
    );
    return;
  }
  if (Fn(r) && !o) {
    r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && Dn(e, t, n, r.component.subTree);
    return;
  }
  const s = r.shapeFlag & 4 ? ws(r.component) : r.el, i = o ? null : s, { i: l, r: c } = e, f = t && t.r, d = l.refs === ce ? l.refs = {} : l.refs, v = l.setupState, b = /* @__PURE__ */ te(v), y = v === ce ? Hi : (C) => Us(d, C) ? !1 : ne(b, C), I = (C, k) => !(k && Us(d, k));
  if (f != null && f !== c) {
    if (Ws(t), ge(f))
      d[f] = null, y(f) && (v[f] = null);
    else if (/* @__PURE__ */ Me(f)) {
      const C = t;
      I(f, C.k) && (f.value = null), C.k && (d[C.k] = null);
    }
  }
  if (W(c))
    qn(c, l, 12, [i, d]);
  else {
    const C = ge(c), k = /* @__PURE__ */ Me(c);
    if (C || k) {
      const H = () => {
        if (e.f) {
          const M = C ? y(c) ? v[c] : d[c] : I() || !e.k ? c.value : d[e.k];
          if (o)
            N(M) && os(M, s);
          else if (N(M))
            M.includes(s) || M.push(s);
          else if (C)
            d[c] = [s], y(c) && (v[c] = d[c]);
          else {
            const K = [s];
            I(c, e.k) && (c.value = K), e.k && (d[e.k] = K);
          }
        } else C ? (d[c] = i, y(c) && (v[c] = i)) : k && (I(c, e.k) && (c.value = i), e.k && (d[e.k] = i));
      };
      if (i) {
        const M = () => {
          H(), Ir.delete(e);
        };
        M.id = -1, Ir.set(e, M), je(M, n);
      } else
        Ws(e), H();
    }
  }
}
function Ws(e) {
  const t = Ir.get(e);
  t && (t.flags |= 8, Ir.delete(e));
}
jr().requestIdleCallback;
jr().cancelIdleCallback;
const Fn = (e) => !!e.type.__asyncLoader, hs = (e) => e.type.__isKeepAlive;
function su(e, t) {
  ml(e, "a", t);
}
function iu(e, t) {
  ml(e, "da", t);
}
function ml(e, t, n = Te) {
  const r = e.__wdc || (e.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (Nr(t, r, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      hs(o.parent.vnode) && lu(r, t, n, o), o = o.parent;
  }
}
function lu(e, t, n, r) {
  const o = Nr(
    t,
    e,
    r,
    !0
    /* prepend */
  );
  wl(() => {
    os(r[t], o);
  }, n);
}
function Nr(e, t, n = Te, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), s = t.__weh || (t.__weh = (...i) => {
      ht();
      const l = Gn(n), c = Ye(t, n, e, i);
      return l(), vt(), c;
    });
    return r ? o.unshift(s) : o.push(s), s;
  }
}
const bt = (e) => (t, n = Te) => {
  (!Nn || e === "sp") && Nr(e, (...r) => t(...r), n);
}, au = bt("bm"), $o = bt("m"), cu = bt(
  "bu"
), uu = bt("u"), No = bt(
  "bum"
), wl = bt("um"), fu = bt(
  "sp"
), du = bt("rtg"), pu = bt("rtc");
function gu(e, t = Te) {
  Nr("ec", e, t);
}
const hu = /* @__PURE__ */ Symbol.for("v-ndc");
function Cn(e, t, n, r) {
  let o;
  const s = n, i = N(e);
  if (i || ge(e)) {
    const l = i && /* @__PURE__ */ Vt(e);
    let c = !1, f = !1;
    l && (c = !/* @__PURE__ */ Ne(e), f = /* @__PURE__ */ mt(e), e = Kr(e)), o = new Array(e.length);
    for (let d = 0, v = e.length; d < v; d++)
      o[d] = t(
        c ? f ? un(Ge(e[d])) : Ge(e[d]) : e[d],
        d,
        void 0,
        s
      );
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let l = 0; l < e; l++)
      o[l] = t(l + 1, l, void 0, s);
  } else if (se(e))
    if (e[Symbol.iterator])
      o = Array.from(
        e,
        (l, c) => t(l, c, void 0, s)
      );
    else {
      const l = Object.keys(e);
      o = new Array(l.length);
      for (let c = 0, f = l.length; c < f; c++) {
        const d = l[c];
        o[c] = t(e[d], d, c, s);
      }
    }
  else
    o = [];
  return o;
}
const Uo = (e) => e ? Vl(e) ? ws(e) : Uo(e.parent) : null, Hn = (
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
    $parent: (e) => Uo(e.parent),
    $root: (e) => Uo(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => bl(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      ps(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = We.bind(e.proxy)),
    $watch: (e) => nu.bind(e)
  })
), Mo = (e, t) => e !== ce && !e.__isScriptSetup && ne(e, t), vu = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: r, data: o, props: s, accessCache: i, type: l, appContext: c } = e;
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
        if (Mo(r, t))
          return i[t] = 1, r[t];
        if (o !== ce && ne(o, t))
          return i[t] = 2, o[t];
        if (ne(s, t))
          return i[t] = 3, s[t];
        if (n !== ce && ne(n, t))
          return i[t] = 4, n[t];
        Wo && (i[t] = 0);
      }
    }
    const f = Hn[t];
    let d, v;
    if (f)
      return t === "$attrs" && Ce(e.attrs, "get", ""), f(e);
    if (
      // css module (injected by vue-loader)
      (d = l.__cssModules) && (d = d[t])
    )
      return d;
    if (n !== ce && ne(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      v = c.config.globalProperties, ne(v, t)
    )
      return v[t];
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: o, ctx: s } = e;
    return Mo(o, t) ? (o[t] = n, !0) : r !== ce && ne(r, t) ? (r[t] = n, !0) : ne(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (s[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: o, props: s, type: i }
  }, l) {
    let c;
    return !!(n[l] || e !== ce && l[0] !== "$" && ne(e, l) || Mo(t, l) || ne(s, l) || ne(r, l) || ne(Hn, l) || ne(o.config.globalProperties, l) || (c = i.__cssModules) && c[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : ne(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function zs(e) {
  return N(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let Wo = !0;
function mu(e) {
  const t = bl(e), n = e.proxy, r = e.ctx;
  Wo = !1, t.beforeCreate && qs(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: s,
    methods: i,
    watch: l,
    provide: c,
    inject: f,
    // lifecycle
    created: d,
    beforeMount: v,
    mounted: b,
    beforeUpdate: y,
    updated: I,
    activated: C,
    deactivated: k,
    beforeDestroy: H,
    beforeUnmount: M,
    destroyed: K,
    unmounted: E,
    render: $,
    renderTracked: U,
    renderTriggered: ue,
    errorCaptured: F,
    serverPrefetch: j,
    // public API
    expose: G,
    inheritAttrs: fe,
    // assets
    components: le,
    directives: ve,
    filters: De
  } = t;
  if (f && wu(f, r, null), i)
    for (const J in i) {
      const oe = i[J];
      W(oe) && (r[J] = oe.bind(n));
    }
  if (o) {
    const J = o.call(n, n);
    se(J) && (e.data = /* @__PURE__ */ Vr(J));
  }
  if (Wo = !0, s)
    for (const J in s) {
      const oe = s[J], Le = W(oe) ? oe.bind(n, n) : W(oe.get) ? oe.get.bind(n, n) : st, Xe = !W(oe) && W(oe.set) ? oe.set.bind(n) : st, Ue = z({
        get: Le,
        set: Xe
      });
      Object.defineProperty(r, J, {
        enumerable: !0,
        configurable: !0,
        get: () => Ue.value,
        set: ($e) => Ue.value = $e
      });
    }
  if (l)
    for (const J in l)
      yl(l[J], r, n, J);
  if (c) {
    const J = W(c) ? c.call(n) : c;
    Reflect.ownKeys(J).forEach((oe) => {
      Qc(oe, J[oe]);
    });
  }
  d && qs(d, e, "c");
  function re(J, oe) {
    N(oe) ? oe.forEach((Le) => J(Le.bind(n))) : oe && J(oe.bind(n));
  }
  if (re(au, v), re($o, b), re(cu, y), re(uu, I), re(su, C), re(iu, k), re(gu, F), re(pu, U), re(du, ue), re(No, M), re(wl, E), re(fu, j), N(G))
    if (G.length) {
      const J = e.exposed || (e.exposed = {});
      G.forEach((oe) => {
        Object.defineProperty(J, oe, {
          get: () => n[oe],
          set: (Le) => n[oe] = Le,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  $ && e.render === st && (e.render = $), fe != null && (e.inheritAttrs = fe), le && (e.components = le), ve && (e.directives = ve), j && vl(e);
}
function wu(e, t, n = st) {
  N(e) && (e = zo(e));
  for (const r in e) {
    const o = e[r];
    let s;
    se(o) ? "default" in o ? s = yr(
      o.from || r,
      o.default,
      !0
    ) : s = yr(o.from || r) : s = yr(o), /* @__PURE__ */ Me(s) ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (i) => s.value = i
    }) : t[r] = s;
  }
}
function qs(e, t, n) {
  Ye(
    N(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function yl(e, t, n, r) {
  let o = r.includes(".") ? gl(n, r) : () => n[r];
  if (ge(e)) {
    const s = t[e];
    W(s) && be(o, s);
  } else if (W(e))
    be(o, e.bind(n));
  else if (se(e))
    if (N(e))
      e.forEach((s) => yl(s, t, n, r));
    else {
      const s = W(e.handler) ? e.handler.bind(n) : t[e.handler];
      W(s) && be(o, s, e);
    }
}
function bl(e) {
  const t = e.type, { mixins: n, extends: r } = t, {
    mixins: o,
    optionsCache: s,
    config: { optionMergeStrategies: i }
  } = e.appContext, l = s.get(t);
  let c;
  return l ? c = l : !o.length && !n && !r ? c = t : (c = {}, o.length && o.forEach(
    (f) => Er(c, f, i, !0)
  ), Er(c, t, i)), se(t) && s.set(t, c), c;
}
function Er(e, t, n, r = !1) {
  const { mixins: o, extends: s } = t;
  s && Er(e, s, n, !0), o && o.forEach(
    (i) => Er(e, i, n, !0)
  );
  for (const i in t)
    if (!(r && i === "expose")) {
      const l = yu[i] || n && n[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const yu = {
  data: Gs,
  props: Ys,
  emits: Ys,
  // objects
  methods: An,
  computed: An,
  // lifecycle
  beforeCreate: Pe,
  created: Pe,
  beforeMount: Pe,
  mounted: Pe,
  beforeUpdate: Pe,
  updated: Pe,
  beforeDestroy: Pe,
  beforeUnmount: Pe,
  destroyed: Pe,
  unmounted: Pe,
  activated: Pe,
  deactivated: Pe,
  errorCaptured: Pe,
  serverPrefetch: Pe,
  // assets
  components: An,
  directives: An,
  // watch
  watch: _u,
  // provide / inject
  provide: Gs,
  inject: bu
};
function Gs(e, t) {
  return t ? e ? function() {
    return Ie(
      W(e) ? e.call(this, this) : e,
      W(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function bu(e, t) {
  return An(zo(e), zo(t));
}
function zo(e) {
  if (N(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Pe(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function An(e, t) {
  return e ? Ie(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Ys(e, t) {
  return e ? N(e) && N(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Ie(
    /* @__PURE__ */ Object.create(null),
    zs(e),
    zs(t ?? {})
  ) : t;
}
function _u(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Ie(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = Pe(e[r], t[r]);
  return n;
}
function _l() {
  return {
    app: null,
    config: {
      isNativeTag: Hi,
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
let xu = 0;
function Su(e, t) {
  return function(r, o = null) {
    W(r) || (r = Ie({}, r)), o != null && !se(o) && (o = null);
    const s = _l(), i = /* @__PURE__ */ new WeakSet(), l = [];
    let c = !1;
    const f = s.app = {
      _uid: xu++,
      _component: r,
      _props: o,
      _container: null,
      _context: s,
      _instance: null,
      version: tf,
      get config() {
        return s.config;
      },
      set config(d) {
      },
      use(d, ...v) {
        return i.has(d) || (d && W(d.install) ? (i.add(d), d.install(f, ...v)) : W(d) && (i.add(d), d(f, ...v))), f;
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
        if (!c) {
          const y = f._ceVNode || gt(r, o);
          return y.appContext = s, b === !0 ? b = "svg" : b === !1 && (b = void 0), e(y, d, b), c = !0, f._container = d, d.__vue_app__ = f, ws(y.component);
        }
      },
      onUnmount(d) {
        l.push(d);
      },
      unmount() {
        c && (Ye(
          l,
          f._instance,
          16
        ), e(null, f._container), delete f._container.__vue_app__);
      },
      provide(d, v) {
        return s.provides[d] = v, f;
      },
      runWithContext(d) {
        const v = cn;
        cn = f;
        try {
          return d();
        } finally {
          cn = v;
        }
      }
    };
    return f;
  };
}
let cn = null;
const Ru = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${ze(t)}Modifiers`] || e[`${qt(t)}Modifiers`];
function Cu(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || ce;
  let o = n;
  const s = t.startsWith("update:"), i = s && Ru(r, t.slice(7));
  i && (i.trim && (o = n.map((d) => ge(d) ? d.trim() : d)), i.number && (o = o.map(pc)));
  let l, c = r[l = yo(t)] || // also try camelCase event handler (#2249)
  r[l = yo(ze(t))];
  !c && s && (c = r[l = yo(qt(t))]), c && Ye(
    c,
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
    e.emitted[l] = !0, Ye(
      f,
      e,
      6,
      o
    );
  }
}
const Mu = /* @__PURE__ */ new WeakMap();
function xl(e, t, n = !1) {
  const r = n ? Mu : t.emitsCache, o = r.get(e);
  if (o !== void 0)
    return o;
  const s = e.emits;
  let i = {}, l = !1;
  if (!W(e)) {
    const c = (f) => {
      const d = xl(f, t, !0);
      d && (l = !0, Ie(i, d));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !s && !l ? (se(e) && r.set(e, null), null) : (N(s) ? s.forEach((c) => i[c] = null) : Ie(i, s), se(e) && r.set(e, i), i);
}
function Ur(e, t) {
  return !e || !Dr(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), ne(e, t[0].toLowerCase() + t.slice(1)) || ne(e, qt(t)) || ne(e, t));
}
function Xs(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: o,
    propsOptions: [s],
    slots: i,
    attrs: l,
    emit: c,
    render: f,
    renderCache: d,
    props: v,
    data: b,
    setupState: y,
    ctx: I,
    inheritAttrs: C
  } = e, k = Mr(e);
  let H, M;
  try {
    if (n.shapeFlag & 4) {
      const E = o || r, $ = E;
      H = nt(
        f.call(
          $,
          E,
          d,
          v,
          y,
          b,
          I
        )
      ), M = l;
    } else {
      const E = t;
      H = nt(
        E.length > 1 ? E(
          v,
          { attrs: l, slots: i, emit: c }
        ) : E(
          v,
          null
        )
      ), M = t.props ? l : Iu(l);
    }
  } catch (E) {
    $t.length = 0, Br(E, e, 1), H = gt(wt);
  }
  let K = H;
  if (M && C !== !1) {
    const E = Object.keys(M), { shapeFlag: $ } = K;
    E.length && $ & 7 && (s && E.some(Fr) && (M = Eu(
      M,
      s
    )), K = fn(K, M, !1, !0));
  }
  if (n.dirs && (K = fn(K, null, !1, !0), K.dirs = K.dirs ? K.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const E = $r(K.type) && hl(K) || K;
    gs(E, n.transition);
  }
  return H = K, Mr(k), H;
}
const Iu = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Dr(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Eu = (e, t) => {
  const n = {};
  for (const r in e)
    (!Fr(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
  return n;
};
function Au(e, t, n) {
  const { props: r, children: o, component: s } = e, { props: i, children: l, patchFlag: c } = t, f = s.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return r ? Js(r, i, f) : !!i;
    if (c & 8) {
      const d = t.dynamicProps;
      for (let v = 0; v < d.length; v++) {
        const b = d[v];
        if (Sl(i, r, b) && !Ur(f, b))
          return !0;
      }
    }
  } else
    return (o || l) && (!l || !l.$stable) ? !0 : r === i ? !1 : r ? i ? Js(r, i, f) : !0 : !!i;
  return !1;
}
function Js(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < r.length; o++) {
    const s = r[o];
    if (Sl(t, e, s) && !Ur(n, s))
      return !0;
  }
  return !1;
}
function Sl(e, t, n) {
  const r = e[n], o = t[n];
  return n === "style" && se(r) && se(o) ? !Lr(r, o) : r !== o;
}
function Ou({ vnode: e, parent: t, suspense: n }, r) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.suspense.vnode.el = o.el = r, e = o), o === e)
      (e = t.vnode).el = r, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = r);
}
const Rl = {}, Cl = () => Object.create(Rl), Ml = (e) => Object.getPrototypeOf(e) === Rl;
function Pu(e, t, n, r = !1) {
  const o = {}, s = Cl();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Il(e, t, o, s);
  for (const i in e.propsOptions[0])
    i in o || (o[i] = void 0);
  n ? e.props = r ? o : /* @__PURE__ */ Vc(o) : e.type.props ? e.props = o : e.props = s, e.attrs = s;
}
function ku(e, t, n, r) {
  const {
    props: o,
    attrs: s,
    vnode: { patchFlag: i }
  } = e, l = /* @__PURE__ */ te(o), [c] = e.propsOptions;
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
        if (Ur(e.emitsOptions, b))
          continue;
        const y = t[b];
        if (c)
          if (ne(s, b))
            y !== s[b] && (s[b] = y, f = !0);
          else {
            const I = ze(b);
            o[I] = qo(
              c,
              l,
              I,
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
    Il(e, t, o, s) && (f = !0);
    let d;
    for (const v in l)
      (!t || // for camelCase
      !ne(t, v) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((d = qt(v)) === v || !ne(t, d))) && (c ? n && // for camelCase
      (n[v] !== void 0 || // for kebab-case
      n[d] !== void 0) && (o[v] = qo(
        c,
        l,
        v,
        void 0,
        e,
        !0
      )) : delete o[v]);
    if (s !== l)
      for (const v in s)
        (!t || !ne(t, v)) && (delete s[v], f = !0);
  }
  f && pt(e.attrs, "set", "");
}
function Il(e, t, n, r) {
  const [o, s] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let c in t) {
      if (Pn(c))
        continue;
      const f = t[c];
      let d;
      o && ne(o, d = ze(c)) ? !s || !s.includes(d) ? n[d] = f : (l || (l = {}))[d] = f : Ur(e.emitsOptions, c) || (!(c in r) || f !== r[c]) && (r[c] = f, i = !0);
    }
  if (s) {
    const c = /* @__PURE__ */ te(n), f = l || ce;
    for (let d = 0; d < s.length; d++) {
      const v = s[d];
      n[v] = qo(
        o,
        c,
        v,
        f[v],
        e,
        !ne(f, v)
      );
    }
  }
  return i;
}
function qo(e, t, n, r, o, s) {
  const i = e[n];
  if (i != null) {
    const l = ne(i, "default");
    if (l && r === void 0) {
      const c = i.default;
      if (i.type !== Function && !i.skipFactory && W(c)) {
        const { propsDefaults: f } = o;
        if (n in f)
          r = f[n];
        else {
          const d = Gn(o);
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
    ] && (s && !l ? r = !1 : i[
      1
      /* shouldCastTrue */
    ] && (r === "" || r === qt(n)) && (r = !0));
  }
  return r;
}
const Tu = /* @__PURE__ */ new WeakMap();
function El(e, t, n = !1) {
  const r = n ? Tu : t.propsCache, o = r.get(e);
  if (o)
    return o;
  const s = e.props, i = {}, l = [];
  let c = !1;
  if (!W(e)) {
    const d = (v) => {
      c = !0;
      const [b, y] = El(v, t, !0);
      Ie(i, b), y && l.push(...y);
    };
    !n && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  if (!s && !c)
    return se(e) && r.set(e, ln), ln;
  if (N(s))
    for (let d = 0; d < s.length; d++) {
      const v = ze(s[d]);
      Zs(v) && (i[v] = ce);
    }
  else if (s)
    for (const d in s) {
      const v = ze(d);
      if (Zs(v)) {
        const b = s[d], y = i[v] = N(b) || W(b) ? { type: b } : Ie({}, b), I = y.type;
        let C = !1, k = !0;
        if (N(I))
          for (let H = 0; H < I.length; ++H) {
            const M = I[H], K = W(M) && M.name;
            if (K === "Boolean") {
              C = !0;
              break;
            } else K === "String" && (k = !1);
          }
        else
          C = W(I) && I.name === "Boolean";
        y[
          0
          /* shouldCast */
        ] = C, y[
          1
          /* shouldCastTrue */
        ] = k, (C || ne(y, "default")) && l.push(v);
      }
    }
  const f = [i, l];
  return se(e) && r.set(e, f), f;
}
function Zs(e) {
  return e[0] !== "$" && !Pn(e);
}
const vs = (e) => e === "_" || e === "_ctx" || e === "$stable", ms = (e) => N(e) ? e.map(nt) : [nt(e)], Du = (e, t, n) => {
  if (t._n)
    return t;
  const r = Zc((...o) => ms(t(...o)), n);
  return r._c = !1, r;
}, Al = (e, t, n) => {
  const r = e._ctx;
  for (const o in e) {
    if (vs(o)) continue;
    const s = e[o];
    if (W(s))
      t[o] = Du(o, s, r);
    else if (s != null) {
      const i = ms(s);
      t[o] = () => i;
    }
  }
}, Ol = (e, t) => {
  const n = ms(t);
  e.slots.default = () => n;
}, Pl = (e, t, n) => {
  for (const r in t)
    (n || !vs(r)) && (e[r] = t[r]);
}, Fu = (e, t, n) => {
  const r = e.slots = Cl();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (Pl(r, t, n), n && Bi(r, "_", o, !0)) : Al(t, r);
  } else t && Ol(e, t);
}, Hu = (e, t, n) => {
  const { vnode: r, slots: o } = e;
  let s = !0, i = ce;
  if (r.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? s = !1 : Pl(o, t, n) : (s = !t.$stable, Al(t, o)), i = t;
  } else t && (Ol(e, t), i = { default: 1 });
  if (s)
    for (const l in o)
      !vs(l) && i[l] == null && delete o[l];
}, je = Bu;
function ju(e) {
  return Lu(e);
}
function Lu(e, t) {
  const n = jr();
  n.__VUE__ = !0;
  const {
    insert: r,
    remove: o,
    patchProp: s,
    createElement: i,
    createText: l,
    createComment: c,
    setText: f,
    setElementText: d,
    parentNode: v,
    nextSibling: b,
    setScopeId: y = st,
    insertStaticContent: I
  } = e, C = (p, h, w, R = null, S = null, _ = null, P = void 0, O = null, A = !!h.dynamicChildren) => {
    if (p === h)
      return;
    p && !Mn(p, h) && (R = Xt(p), $e(p, S, _, !0), p = null), h.patchFlag === -2 && (A = !1, h.dynamicChildren = null);
    const { type: x, ref: V, shapeFlag: T } = h;
    switch (x) {
      case Wr:
        k(p, h, w, R);
        break;
      case wt:
        H(p, h, w, R);
        break;
      case Eo:
        p == null && M(h, w, R, P);
        break;
      case _e:
        le(
          p,
          h,
          w,
          R,
          S,
          _,
          P,
          O,
          A
        );
        break;
      default:
        T & 1 ? $(
          p,
          h,
          w,
          R,
          S,
          _,
          P,
          O,
          A
        ) : T & 6 ? ve(
          p,
          h,
          w,
          R,
          S,
          _,
          P,
          O,
          A
        ) : (T & 64 || T & 128) && x.process(
          p,
          h,
          w,
          R,
          S,
          _,
          P,
          O,
          A,
          Je
        );
    }
    V != null && S ? Dn(V, p && p.ref, _, h || p, !h) : V == null && p && p.ref != null && Dn(p.ref, null, _, p, !0);
  }, k = (p, h, w, R) => {
    if (p == null)
      r(
        h.el = l(h.children),
        w,
        R
      );
    else {
      const S = h.el = p.el;
      h.children !== p.children && f(S, h.children);
    }
  }, H = (p, h, w, R) => {
    p == null ? r(
      h.el = c(h.children || ""),
      w,
      R
    ) : h.el = p.el;
  }, M = (p, h, w, R) => {
    [p.el, p.anchor] = I(
      p.children,
      h,
      w,
      R,
      p.el,
      p.anchor
    );
  }, K = ({ el: p, anchor: h }, w, R) => {
    let S;
    for (; p && p !== h; )
      S = b(p), r(p, w, R), p = S;
    r(h, w, R);
  }, E = ({ el: p, anchor: h }) => {
    let w;
    for (; p && p !== h; )
      w = b(p), o(p), p = w;
    o(h);
  }, $ = (p, h, w, R, S, _, P, O, A) => {
    if (h.type === "svg" ? P = "svg" : h.type === "math" && (P = "mathml"), p == null)
      U(
        h,
        w,
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
          h,
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
  }, U = (p, h, w, R, S, _, P, O) => {
    let A, x;
    const { props: V, shapeFlag: T, transition: L, dirs: B } = p;
    if (A = p.el = i(
      p.type,
      _,
      V && V.is,
      V
    ), T & 8 ? d(A, p.children) : T & 16 && F(
      p.children,
      A,
      null,
      R,
      S,
      Io(p, _),
      P,
      O
    ), B && Dt(p, null, R, "created"), ue(A, p, p.scopeId, P, R), V) {
      for (const Z in V)
        Z !== "value" && !Pn(Z) && s(A, Z, null, V[Z], _, R);
      "value" in V && s(A, "value", null, V.value, _), (x = V.onVnodeBeforeMount) && Qe(x, R, p);
    }
    B && Dt(p, null, R, "beforeMount");
    const Y = Ku(S, L);
    Y && L.beforeEnter(A), r(A, h, w), ((x = V && V.onVnodeMounted) || Y || B) && je(() => {
      try {
        x && Qe(x, R, p), Y && L.enter(A), B && Dt(p, null, R, "mounted");
      } finally {
      }
    }, S);
  }, ue = (p, h, w, R, S) => {
    if (w && y(p, w), R)
      for (let _ = 0; _ < R.length; _++)
        y(p, R[_]);
    if (S) {
      let _ = S.subTree;
      if (h === _ || Fl(_.type) && (_.ssContent === h || _.ssFallback === h)) {
        const P = S.vnode;
        ue(
          p,
          P,
          P.scopeId,
          P.slotScopeIds,
          S.parent
        );
      }
    }
  }, F = (p, h, w, R, S, _, P, O, A = 0) => {
    for (let x = A; x < p.length; x++) {
      const V = p[x] = O ? dt(p[x]) : nt(p[x]);
      C(
        null,
        V,
        h,
        w,
        R,
        S,
        _,
        P,
        O
      );
    }
  }, j = (p, h, w, R, S, _, P) => {
    const O = h.el = p.el;
    let { patchFlag: A, dynamicChildren: x, dirs: V } = h;
    A |= p.patchFlag & 16;
    const T = p.props || ce, L = h.props || ce;
    let B;
    if (w && Ft(w, !1), (B = L.onVnodeBeforeUpdate) && Qe(B, w, h, p), V && Dt(h, p, w, "beforeUpdate"), w && Ft(w, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    x && (!p.dynamicChildren || p.dynamicChildren.length !== x.length) && (A = 0, P = !1, x = null), (T.innerHTML && L.innerHTML == null || T.textContent && L.textContent == null) && d(O, ""), x ? G(
      p.dynamicChildren,
      x,
      O,
      w,
      R,
      Io(h, S),
      _
    ) : P || oe(
      p,
      h,
      O,
      null,
      w,
      R,
      Io(h, S),
      _,
      !1
    ), A > 0) {
      if (A & 16)
        fe(O, T, L, w, S);
      else if (A & 2 && T.class !== L.class && s(O, "class", null, L.class, S), A & 4 && s(O, "style", T.style, L.style, S), A & 8) {
        const Y = h.dynamicProps;
        for (let Z = 0; Z < Y.length; Z++) {
          const ee = Y[Z], de = T[ee], he = L[ee];
          (he !== de || ee === "value") && s(O, ee, de, he, S, w);
        }
      }
      A & 1 && p.children !== h.children && d(O, h.children);
    } else !P && x == null && fe(O, T, L, w, S);
    ((B = L.onVnodeUpdated) || V) && je(() => {
      B && Qe(B, w, h, p), V && Dt(h, p, w, "updated");
    }, R);
  }, G = (p, h, w, R, S, _, P) => {
    for (let O = 0; O < h.length; O++) {
      const A = p[O], x = h[O], V = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        A.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (A.type === _e || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Mn(A, x) || // - In the case of a component, it could contain anything.
        A.shapeFlag & 198) ? v(A.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          w
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
  }, fe = (p, h, w, R, S) => {
    if (h !== w) {
      if (h !== ce)
        for (const _ in h)
          !Pn(_) && !(_ in w) && s(
            p,
            _,
            h[_],
            null,
            S,
            R
          );
      for (const _ in w) {
        if (Pn(_)) continue;
        const P = w[_], O = h[_];
        P !== O && _ !== "value" && s(p, _, O, P, S, R);
      }
      "value" in w && s(p, "value", h.value, w.value, S);
    }
  }, le = (p, h, w, R, S, _, P, O, A) => {
    const x = h.el = p ? p.el : l(""), V = h.anchor = p ? p.anchor : l("");
    let { patchFlag: T, dynamicChildren: L, slotScopeIds: B } = h;
    B && (O = O ? O.concat(B) : B), p == null ? (r(x, w, R), r(V, w, R), F(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      h.children || [],
      w,
      V,
      S,
      _,
      P,
      O,
      A
    )) : T > 0 && T & 64 && L && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    p.dynamicChildren && p.dynamicChildren.length === L.length ? (G(
      p.dynamicChildren,
      L,
      w,
      S,
      _,
      P,
      O
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (h.key != null || S && h === S.subTree) && kl(
      p,
      h,
      !0
      /* shallow */
    )) : oe(
      p,
      h,
      w,
      V,
      S,
      _,
      P,
      O,
      A
    );
  }, ve = (p, h, w, R, S, _, P, O, A) => {
    h.slotScopeIds = O, p == null ? h.shapeFlag & 512 ? S.ctx.activate(
      h,
      w,
      R,
      P,
      A
    ) : De(
      h,
      w,
      R,
      S,
      _,
      P,
      A
    ) : Ee(p, h, A);
  }, De = (p, h, w, R, S, _, P) => {
    const O = p.component = Gu(
      p,
      R,
      S
    );
    if (hs(p) && (O.ctx.renderer = Je), Xu(O, !1, P), O.asyncDep) {
      if (S && S.registerDep(O, re, P), !p.el) {
        const A = O.subTree = gt(wt);
        H(null, A, h, w), p.placeholder = A.el;
      }
    } else
      re(
        O,
        p,
        h,
        w,
        S,
        _,
        P
      );
  }, Ee = (p, h, w) => {
    const R = h.component = p.component;
    if (Au(p, h, w))
      if (R.asyncDep && !R.asyncResolved) {
        J(R, h, w);
        return;
      } else
        R.next = h, R.update();
    else
      h.el = p.el, R.vnode = h;
  }, re = (p, h, w, R, S, _, P) => {
    const O = () => {
      if (p.isMounted) {
        let { next: T, bu: L, u: B, parent: Y, vnode: Z } = p;
        {
          const Fe = Tl(p);
          if (Fe) {
            T && (T.el = Z.el, J(p, T, P)), Fe.asyncDep.then(() => {
              je(() => {
                p.isUnmounted || x();
              }, S);
            });
            return;
          }
        }
        let ee = T, de;
        Ft(p, !1), T ? (T.el = Z.el, J(p, T, P)) : T = Z, L && bo(L), (de = T.props && T.props.onVnodeBeforeUpdate) && Qe(de, Y, T, Z), Ft(p, !0);
        const he = Xs(p), Oe = p.subTree;
        p.subTree = he, C(
          Oe,
          he,
          // parent may have changed if it's in a teleport
          v(Oe.el),
          // anchor may have changed if it's in a fragment
          Xt(Oe),
          p,
          S,
          _
        ), T.el = he.el, ee === null && Ou(p, he.el), B && je(B, S), (de = T.props && T.props.onVnodeUpdated) && je(
          () => Qe(de, Y, T, Z),
          S
        );
      } else {
        let T;
        const { el: L, props: B } = h, { bm: Y, m: Z, parent: ee, root: de, type: he } = p, Oe = Fn(h);
        Ft(p, !1), Y && bo(Y), !Oe && (T = B && B.onVnodeBeforeMount) && Qe(T, ee, h), Ft(p, !0);
        {
          de.ce && de.ce._hasShadowRoot() && de.ce._injectChildStyle(
            he,
            p.parent ? p.parent.type : void 0
          );
          const Fe = p.subTree = Xs(p);
          C(
            null,
            Fe,
            w,
            R,
            p,
            S,
            _
          ), h.el = Fe.el;
        }
        if (Z && je(Z, S), !Oe && (T = B && B.onVnodeMounted)) {
          const Fe = h;
          je(
            () => Qe(T, ee, Fe),
            S
          );
        }
        (h.shapeFlag & 256 || ee && Fn(ee.vnode) && ee.vnode.shapeFlag & 256) && p.a && je(p.a, S), p.isMounted = !0, h = w = R = null;
      }
    };
    p.scope.on();
    const A = p.effect = new zi(O);
    p.scope.off();
    const x = p.update = A.run.bind(A), V = p.job = A.runIfDirty.bind(A);
    V.i = p, V.id = p.uid, A.scheduler = () => ps(V), Ft(p, !0), x();
  }, J = (p, h, w) => {
    h.component = p;
    const R = p.vnode.props;
    p.vnode = h, p.next = null, ku(p, h.props, R, w), Hu(p, h.children, w), ht(), Ns(p), vt();
  }, oe = (p, h, w, R, S, _, P, O, A = !1) => {
    const x = p && p.children, V = p ? p.shapeFlag : 0, T = h.children, { patchFlag: L, shapeFlag: B } = h;
    if (L > 0) {
      if (L & 128) {
        Xe(
          x,
          T,
          w,
          R,
          S,
          _,
          P,
          O,
          A
        );
        return;
      } else if (L & 256) {
        Le(
          x,
          T,
          w,
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
    B & 8 ? (V & 16 && Ke(x, S, _), T !== x && d(w, T)) : V & 16 ? B & 16 ? Xe(
      x,
      T,
      w,
      R,
      S,
      _,
      P,
      O,
      A
    ) : Ke(x, S, _, !0) : (V & 8 && d(w, ""), B & 16 && F(
      T,
      w,
      R,
      S,
      _,
      P,
      O,
      A
    ));
  }, Le = (p, h, w, R, S, _, P, O, A) => {
    p = p || ln, h = h || ln;
    const x = p.length, V = h.length, T = Math.min(x, V);
    let L;
    for (L = 0; L < T; L++) {
      const B = h[L] = A ? dt(h[L]) : nt(h[L]);
      C(
        p[L],
        B,
        w,
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
      T
    ) : F(
      h,
      w,
      R,
      S,
      _,
      P,
      O,
      A,
      T
    );
  }, Xe = (p, h, w, R, S, _, P, O, A) => {
    let x = 0;
    const V = h.length;
    let T = p.length - 1, L = V - 1;
    for (; x <= T && x <= L; ) {
      const B = p[x], Y = h[x] = A ? dt(h[x]) : nt(h[x]);
      if (Mn(B, Y))
        C(
          B,
          Y,
          w,
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
    for (; x <= T && x <= L; ) {
      const B = p[T], Y = h[L] = A ? dt(h[L]) : nt(h[L]);
      if (Mn(B, Y))
        C(
          B,
          Y,
          w,
          null,
          S,
          _,
          P,
          O,
          A
        );
      else
        break;
      T--, L--;
    }
    if (x > T) {
      if (x <= L) {
        const B = L + 1, Y = B < V ? h[B].el : R;
        for (; x <= L; )
          C(
            null,
            h[x] = A ? dt(h[x]) : nt(h[x]),
            w,
            Y,
            S,
            _,
            P,
            O,
            A
          ), x++;
      }
    } else if (x > L)
      for (; x <= T; )
        $e(p[x], S, _, !0), x++;
    else {
      const B = x, Y = x, Z = /* @__PURE__ */ new Map();
      for (x = Y; x <= L; x++) {
        const Se = h[x] = A ? dt(h[x]) : nt(h[x]);
        Se.key != null && Z.set(Se.key, x);
      }
      let ee, de = 0;
      const he = L - Y + 1;
      let Oe = !1, Fe = 0;
      const kt = new Array(he);
      for (x = 0; x < he; x++) kt[x] = 0;
      for (x = B; x <= T; x++) {
        const Se = p[x];
        if (de >= he) {
          $e(Se, S, _, !0);
          continue;
        }
        let Ve;
        if (Se.key != null)
          Ve = Z.get(Se.key);
        else
          for (ee = Y; ee <= L; ee++)
            if (kt[ee - Y] === 0 && Mn(Se, h[ee])) {
              Ve = ee;
              break;
            }
        Ve === void 0 ? $e(Se, S, _, !0) : (kt[Ve - Y] = x + 1, Ve >= Fe ? Fe = Ve : Oe = !0, C(
          Se,
          h[Ve],
          w,
          null,
          S,
          _,
          P,
          O,
          A
        ), de++);
      }
      const Zn = Oe ? Vu(kt) : ln;
      for (ee = Zn.length - 1, x = he - 1; x >= 0; x--) {
        const Se = Y + x, Ve = h[Se], Tt = h[Se + 1], Jt = Se + 1 < V ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Tt.el || Dl(Tt)
        ) : R;
        kt[x] === 0 ? C(
          null,
          Ve,
          w,
          Jt,
          S,
          _,
          P,
          O,
          A
        ) : Oe && (ee < 0 || x !== Zn[ee] ? Ue(Ve, w, Jt, 2) : ee--);
      }
    }
  }, Ue = (p, h, w, R, S = null) => {
    const { el: _, type: P, transition: O, children: A, shapeFlag: x } = p;
    if (x & 6) {
      Ue(p.component.subTree, h, w, R);
      return;
    }
    if (x & 128) {
      p.suspense.move(h, w, R);
      return;
    }
    if (x & 64) {
      P.move(p, h, w, Je);
      return;
    }
    if (P === _e) {
      r(_, h, w);
      for (let T = 0; T < A.length; T++)
        Ue(A[T], h, w, R);
      r(p.anchor, h, w);
      return;
    }
    if (P === Eo) {
      K(p, h, w);
      return;
    }
    if (R !== 2 && x & 1 && O)
      if (R === 0)
        O.persisted && !_[Co] ? r(_, h, w) : (O.beforeEnter(_), r(_, h, w), je(() => O.enter(_), S));
      else {
        const { leave: T, delayLeave: L, afterLeave: B } = O, Y = () => {
          p.ctx.isUnmounted ? o(_) : r(_, h, w);
        }, Z = () => {
          const ee = _._isLeaving || !!_[Co];
          _._isLeaving && _[Co](
            !0
            /* cancelled */
          ), O.persisted && !ee ? Y() : T(_, () => {
            Y(), B && B();
          });
        };
        L ? L(_, Y, Z) : Z();
      }
    else
      r(_, h, w);
  }, $e = (p, h, w, R = !1, S = !1) => {
    const {
      type: _,
      props: P,
      ref: O,
      children: A,
      dynamicChildren: x,
      shapeFlag: V,
      patchFlag: T,
      dirs: L,
      cacheIndex: B,
      memo: Y
    } = p;
    if (T === -2 && (S = !1), O != null && (ht(), Dn(O, null, w, p, !0), vt()), B != null && (h.renderCache[B] = void 0), V & 256) {
      h.ctx.deactivate(p);
      return;
    }
    const Z = V & 1 && L, ee = !Fn(p);
    let de;
    if (ee && (de = P && P.onVnodeBeforeUnmount) && Qe(de, h, p), V & 6)
      xt(p.component, w, R);
    else {
      if (V & 128) {
        p.suspense.unmount(w, R);
        return;
      }
      Z && Dt(p, null, h, "beforeUnmount"), V & 64 ? p.type.remove(
        p,
        h,
        w,
        Je,
        R
      ) : x && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !x.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (_ !== _e || T > 0 && T & 64) ? Ke(
        x,
        h,
        w,
        !1,
        !0
      ) : (_ === _e && T & 384 || !S && V & 16) && Ke(A, h, w), R && lt(p);
    }
    const he = Y != null && B == null;
    (ee && (de = P && P.onVnodeUnmounted) || Z || he) && je(() => {
      de && Qe(de, h, p), Z && Dt(p, null, h, "unmounted"), he && (p.el = null);
    }, w);
  }, lt = (p) => {
    const { type: h, el: w, anchor: R, transition: S } = p;
    if (h === _e) {
      _t(w, R);
      return;
    }
    if (h === Eo) {
      E(p);
      return;
    }
    const _ = () => {
      o(w), S && !S.persisted && S.afterLeave && S.afterLeave();
    };
    if (p.shapeFlag & 1 && S && !S.persisted) {
      const { leave: P, delayLeave: O } = S, A = () => P(w, _);
      O ? O(p.el, _, A) : A();
    } else
      _();
  }, _t = (p, h) => {
    let w;
    for (; p !== h; )
      w = b(p), o(p), p = w;
    o(h);
  }, xt = (p, h, w) => {
    const { bum: R, scope: S, job: _, subTree: P, um: O, m: A, a: x } = p;
    Qs(A), Qs(x), R && bo(R), S.stop(), _ && (_.flags |= 8, $e(P, p, h, w)), O && je(O, h), je(() => {
      p.isUnmounted = !0;
    }, h);
  }, Ke = (p, h, w, R = !1, S = !1, _ = 0) => {
    for (let P = _; P < p.length; P++)
      $e(p[P], h, w, R, S);
  }, Xt = (p) => {
    if (p.shapeFlag & 6)
      return Xt(p.component.subTree);
    if (p.shapeFlag & 128)
      return p.suspense.next();
    const h = b(p.anchor || p.el), w = h && h[ru];
    return w ? b(w) : h;
  };
  let St = !1;
  const Ae = (p, h, w) => {
    let R;
    p == null ? h._vnode && ($e(h._vnode, null, null, !0), R = h._vnode.component) : C(
      h._vnode || null,
      p,
      h,
      null,
      null,
      null,
      w
    ), h._vnode = p, St || (St = !0, Ns(R), ul(), St = !1);
  }, Je = {
    p: C,
    um: $e,
    m: Ue,
    r: lt,
    mt: De,
    mc: F,
    pc: oe,
    pbc: G,
    n: Xt,
    o: e
  };
  return {
    render: Ae,
    hydrate: void 0,
    createApp: Su(Ae)
  };
}
function Io({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Ft({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Ku(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function kl(e, t, n = !1) {
  const r = e.children, o = t.children;
  if (N(r) && N(o))
    for (let s = 0; s < r.length; s++) {
      const i = r[s];
      let l = o[s];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = o[s] = dt(o[s]), l.el = i.el), !n && l.patchFlag !== -2 && kl(i, l)), l.type === Wr && (l.patchFlag === -1 && (l = o[s] = dt(l)), l.el = i.el), l.type === wt && !l.el && (l.el = i.el);
    }
}
function Vu(e) {
  const t = e.slice(), n = [0];
  let r, o, s, i, l;
  const c = e.length;
  for (r = 0; r < c; r++) {
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
function Tl(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Tl(t);
}
function Qs(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function Dl(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? Dl(t.subTree) : null;
}
const Fl = (e) => e.__isSuspense;
function Bu(e, t) {
  t && t.pendingBranch ? N(e) ? t.effects.push(...e) : t.effects.push(e) : Jc(e);
}
const _e = /* @__PURE__ */ Symbol.for("v-fgt"), Wr = /* @__PURE__ */ Symbol.for("v-txt"), wt = /* @__PURE__ */ Symbol.for("v-cmt"), Eo = /* @__PURE__ */ Symbol.for("v-stc"), $t = [];
let Be = null;
function X(e = !1) {
  $t.push(Be = e ? null : []);
}
function Hl() {
  $t.pop(), Be = $t[$t.length - 1] || null;
}
let Bn = 1;
function ei(e, t = !1) {
  Bn += e, e < 0 && Be && t && (Be.hasOnce = !0);
}
function jl(e) {
  return e.dynamicChildren = Bn > 0 ? Be || ln : null, Hl(), Bn > 0 && Be && Be.push(e), e;
}
function Q(e, t, n, r, o, s) {
  return jl(
    ye(
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
function $u(e, t, n, r, o) {
  return jl(
    gt(
      e,
      t,
      n,
      r,
      o,
      !0
    )
  );
}
function Ll(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Mn(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Kl = ({ key: e }) => e ?? null, br = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? ge(e) || /* @__PURE__ */ Me(e) || W(e) ? { i: ot, r: e, k: t, f: !!n } : e : null);
function ye(e, t = null, n = null, r = 0, o = null, s = e === _e ? 0 : 1, i = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Kl(t),
    ref: t && br(t),
    scopeId: dl,
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
    ctx: ot
  };
  return l ? (Ar(c, n), s & 128 && e.normalize(c)) : n && (c.shapeFlag |= ge(n) ? 8 : 16), Bn > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  Be && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && Be.push(c), c;
}
const gt = Nu;
function Nu(e, t = null, n = null, r = 0, o = null, s = !1) {
  if ((!e || e === hu) && (e = wt), Ll(e)) {
    const l = fn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Ar(l, n), Bn > 0 && !s && Be && (l.shapeFlag & 6 ? Be[Be.indexOf(e)] = l : Be.push(l)), l.patchFlag = -2, l;
  }
  if (ef(e) && (e = e.__vccOpts), t) {
    t = Uu(t);
    let { class: l, style: c } = t;
    l && !ge(l) && (t.class = Lt(l)), se(c) && (/* @__PURE__ */ ds(c) && !N(c) && (c = Ie({}, c)), t.style = jt(c));
  }
  const i = ge(e) ? 1 : Fl(e) ? 128 : $r(e) ? 64 : se(e) ? 4 : W(e) ? 2 : 0;
  return ye(
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
function Uu(e) {
  return e ? /* @__PURE__ */ ds(e) || Ml(e) ? Ie({}, e) : e : null;
}
function fn(e, t, n = !1, r = !1) {
  const { props: o, ref: s, patchFlag: i, children: l, transition: c } = e, f = t ? Wu(o || {}, t) : o, d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && Kl(f),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && s ? N(s) ? s.concat(br(t)) : [s, br(t)] : br(t)
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
    patchFlag: t && e.type !== _e ? i === -1 ? 16 : i | 16 : i,
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
    ssContent: e.ssContent && fn(e.ssContent),
    ssFallback: e.ssFallback && fn(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && r && gs(
    d,
    c.clone(d)
  ), d;
}
function Go(e = " ", t = 0) {
  return gt(Wr, null, e, t);
}
function ut(e = "", t = !1) {
  return t ? (X(), $u(wt, null, e)) : gt(wt, null, e);
}
function nt(e) {
  return e == null || typeof e == "boolean" ? gt(wt) : N(e) ? gt(
    _e,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Ll(e) ? dt(e) : gt(Wr, null, String(e));
}
function dt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : fn(e);
}
function Ar(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (N(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), Ar(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !Ml(t) ? t._ctx = ot : o === 3 && ot && (ot.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (W(t)) {
    if (r & 65) {
      Ar(e, { default: t });
      return;
    }
    t = { default: t, _ctx: ot }, n = 32;
  } else
    t = String(t), r & 64 ? (n = 16, t = [Go(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function Wu(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === "class")
        t.class !== r.class && (t.class = Lt([t.class, r.class]));
      else if (o === "style")
        t.style = jt([t.style, r.style]);
      else if (Dr(o)) {
        const s = t[o], i = r[o];
        i && s !== i && !(N(s) && s.includes(i)) ? t[o] = s ? [].concat(s, i) : i : i == null && s == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !Fr(o) && (t[o] = i);
      } else o !== "" && (t[o] = r[o]);
  }
  return t;
}
function Qe(e, t, n, r = null) {
  Ye(e, t, 7, [
    n,
    r
  ]);
}
const zu = _l();
let qu = 0;
function Gu(e, t, n) {
  const r = e.type, o = (t ? t.appContext : e.appContext) || zu, s = {
    uid: qu++,
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
    scope: new _c(
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
    propsOptions: El(r, o),
    emitsOptions: xl(r, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: ce,
    // inheritAttrs
    inheritAttrs: r.inheritAttrs,
    // state
    ctx: ce,
    data: ce,
    props: ce,
    attrs: ce,
    slots: ce,
    refs: ce,
    setupState: ce,
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
  return s.ctx = { _: s }, s.root = t ? t.root : s, s.emit = Cu.bind(null, s), e.ce && e.ce(s), s;
}
let Te = null;
const Yu = () => Te || ot;
let Or, $n;
{
  const e = jr(), t = (n, r) => {
    let o;
    return (o = e[n]) || (o = e[n] = []), o.push(r), (s) => {
      o.length > 1 ? o.forEach((i) => i(s)) : o[0](s);
    };
  };
  Or = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Te = n
  ), $n = t(
    "__VUE_SSR_SETTERS__",
    (n) => Nn = n
  );
}
const Gn = (e) => {
  const t = Te;
  return Or(e), e.scope.on(), () => {
    e.scope.off(), Or(t);
  };
}, ti = () => {
  Te && Te.scope.off(), Or(null);
};
function Vl(e) {
  return e.vnode.shapeFlag & 4;
}
let Nn = !1;
function Xu(e, t = !1, n = !1) {
  t && $n(t);
  const { props: r, children: o } = e.vnode, s = Vl(e);
  Pu(e, r, s, t), Fu(e, o, n || t);
  const i = s ? Ju(e, t) : void 0;
  return t && $n(!1), i;
}
function Ju(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, vu);
  const { setup: r } = n;
  if (r) {
    ht();
    const o = e.setupContext = r.length > 1 ? Qu(e) : null, s = Gn(e), i = qn(
      r,
      e,
      0,
      [
        e.props,
        o
      ]
    ), l = ji(i);
    if (vt(), s(), (l || e.sp) && !Fn(e) && vl(e), l) {
      if (i.then(ti, ti), t)
        return i.then((c) => {
          $n(!0);
          try {
            ni(e, c, t);
          } finally {
            $n(!1);
          }
        }).catch((c) => {
          Br(c, e, 0);
        });
      e.asyncDep = i;
    } else
      ni(e, i);
  } else
    Bl(e);
}
function ni(e, t, n) {
  W(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : se(t) && (e.setupState = ll(t)), Bl(e);
}
function Bl(e, t, n) {
  const r = e.type;
  e.render || (e.render = r.render || st);
  {
    const o = Gn(e);
    ht();
    try {
      mu(e);
    } finally {
      vt(), o();
    }
  }
}
const Zu = {
  get(e, t) {
    return Ce(e, "get", ""), e[t];
  }
};
function Qu(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Zu),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function ws(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(ll(Bc(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in Hn)
        return Hn[n](e);
    },
    has(t, n) {
      return n in t || n in Hn;
    }
  })) : e.proxy;
}
function ef(e) {
  return W(e) && "__vccOpts" in e;
}
const z = (e, t) => /* @__PURE__ */ zc(e, t, Nn), tf = "3.5.42";
/**
* @vue/runtime-dom v3.5.42
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Yo;
const ri = typeof window < "u" && window.trustedTypes;
if (ri)
  try {
    Yo = /* @__PURE__ */ ri.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const $l = Yo ? (e) => Yo.createHTML(e) : (e) => e, nf = "http://www.w3.org/2000/svg", rf = "http://www.w3.org/1998/Math/MathML", ft = typeof document < "u" ? document : null, oi = ft && /* @__PURE__ */ ft.createElement("template"), of = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const o = t === "svg" ? ft.createElementNS(nf, e) : t === "mathml" ? ft.createElementNS(rf, e) : n ? ft.createElement(e, { is: n }) : ft.createElement(e);
    return e === "select" && r && r.multiple != null && o.setAttribute("multiple", r.multiple), o;
  },
  createText: (e) => ft.createTextNode(e),
  createComment: (e) => ft.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => ft.querySelector(e),
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
      oi.innerHTML = $l(
        r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e
      );
      const l = oi.content;
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
}, sf = /* @__PURE__ */ Symbol("_vtc");
function lf(e, t, n) {
  const r = e[sf];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const si = /* @__PURE__ */ Symbol("_vod"), af = /* @__PURE__ */ Symbol("_vsh"), cf = /* @__PURE__ */ Symbol(""), uf = /(?:^|;)\s*display\s*:/;
function ff(e, t, n) {
  const r = e.style, o = ge(n);
  let s = !1;
  if (n && !o) {
    if (t)
      if (ge(t))
        for (const i of t.split(";")) {
          const l = i.slice(0, i.indexOf(":")).trim();
          n[l] == null && On(r, l, "");
        }
      else
        for (const i in t)
          n[i] == null && On(r, i, "");
    for (const i in n) {
      i === "display" && (s = !0);
      const l = n[i];
      l != null ? pf(
        e,
        i,
        !ge(t) && t ? t[i] : void 0,
        l
      ) || On(r, i, l) : On(r, i, "");
    }
  } else if (o) {
    if (t !== n) {
      const i = r[cf];
      i && (n += ";" + i), r.cssText = n, s = uf.test(n);
    }
  } else t && e.removeAttribute("style");
  si in e && (e[si] = s ? r.display : "", e[af] && (r.display = "none"));
}
const hr = /\s*!important$/;
function On(e, t, n) {
  if (N(n))
    n.forEach((r) => On(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--"))
    hr.test(n) ? e.setProperty(t, n.replace(hr, ""), "important") : e.setProperty(t, n);
  else {
    const r = df(e, t);
    hr.test(n) ? e.setProperty(
      qt(r),
      n.replace(hr, ""),
      "important"
    ) : e[r] = n;
  }
}
const ii = ["Webkit", "Moz", "ms"], Ao = {};
function df(e, t) {
  const n = Ao[t];
  if (n)
    return n;
  let r = ze(t);
  if (r !== "filter" && r in e)
    return Ao[t] = r;
  r = Vi(r);
  for (let o = 0; o < ii.length; o++) {
    const s = ii[o] + r;
    if (s in e)
      return Ao[t] = s;
  }
  return t;
}
function pf(e, t, n, r) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && ge(r) && n === r;
}
const li = "http://www.w3.org/1999/xlink";
function ai(e, t, n, r, o, s = yc(t)) {
  r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(li, t.slice(6, t.length)) : e.setAttributeNS(li, t, n) : n == null || s && !$i(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    s ? "" : it(n) ? String(n) : n
  );
}
function ci(e, t, n, r, o) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? $l(n) : n);
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
    l === "boolean" ? n = $i(n) : n == null && l === "string" ? (n = "", i = !0) : l === "number" && (n = 0, i = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  i && e.removeAttribute(o || t);
}
function gf(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function hf(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const ui = /* @__PURE__ */ Symbol("_vei");
function vf(e, t, n, r, o = null) {
  const s = e[ui] || (e[ui] = {}), i = s[t];
  if (r && i)
    i.value = r;
  else {
    const [l, c] = yf(t);
    if (r) {
      const f = s[t] = xf(
        r,
        o
      );
      gf(e, l, f, c);
    } else i && (hf(e, l, i, c), s[t] = void 0);
  }
}
const mf = /(Once|Passive|Capture)$/, wf = /^on:?(?:Once|Passive|Capture)$/;
function yf(e) {
  let t, n;
  for (; (n = e.match(mf)) && !wf.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : qt(e.slice(2)), t];
}
let Oo = 0;
const bf = /* @__PURE__ */ Promise.resolve(), _f = () => Oo || (bf.then(() => Oo = 0), Oo = Date.now());
function xf(e, t) {
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
      for (let c = 0; c < i.length && !r._stopped; c++) {
        const f = i[c];
        f && Ye(
          f,
          t,
          5,
          l
        );
      }
    } else
      Ye(
        o,
        t,
        5,
        [r]
      );
  };
  return n.value = e, n.attached = _f(), n;
}
const fi = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Sf = (e, t, n, r, o, s) => {
  const i = o === "svg";
  t === "class" ? lf(e, r, i) : t === "style" ? ff(e, n, r) : Dr(t) ? Fr(t) || vf(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Rf(e, t, r, i)) ? (ci(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && ai(e, t, r, i, s, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Cf(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !ge(r))) ? ci(e, ze(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), ai(e, t, r, i));
};
function Rf(e, t, n, r) {
  if (r)
    return !!(t === "innerHTML" || t === "textContent" || t in e && fi(t) && W(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return fi(t) && ge(n) ? !1 : t in e;
}
function Cf(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const r = ze(t);
  return Array.isArray(n) ? n.some((o) => ze(o) === r) : Object.keys(n).some((o) => ze(o) === r);
}
const Mf = ["ctrl", "shift", "alt", "meta"], If = {
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
  exact: (e, t) => Mf.some((n) => e[`${n}Key`] && !t.includes(n))
}, vr = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), r = t.join(".");
  return n[r] || (n[r] = (o, ...s) => {
    for (let i = 0; i < t.length; i++) {
      const l = If[t[i]];
      if (l && l(o, t)) return;
    }
    return e(o, ...s);
  });
}, Ef = /* @__PURE__ */ Ie({ patchProp: Sf }, of);
let di;
function Af() {
  return di || (di = ju(Ef));
}
const Of = (...e) => {
  const t = Af().createApp(...e), { mount: n } = t;
  return t.mount = (r) => {
    const o = kf(r);
    if (!o) return;
    const s = t._component;
    !W(s) && !s.render && !s.template && (s.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const i = n(o, !1, Pf(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), i;
  }, t;
};
function Pf(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function kf(e) {
  return ge(e) ? document.querySelector(e) : e;
}
function mr() {
  return !0;
}
const Tf = Symbol("merge-proxy"), _r = Symbol("merge-proxy-sources"), Df = {
  get(e, t, n) {
    return t === Tf ? n : t === _r ? e.sources : e.get(t);
  },
  has(e, t) {
    return e.has(t);
  },
  set: mr,
  deleteProperty: mr,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: mr,
      deleteProperty: mr
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function xr(e) {
  return e && typeof e == "object" && "value" in e ? e.value : e;
}
function Xo(...e) {
  const t = e.flatMap((n) => typeof n == "object" && n !== null && _r in n && Array.isArray(n[_r]) ? n[_r] : [n]);
  return new Proxy({
    sources: t,
    get(n) {
      for (let r = t.length - 1; r >= 0; r--) {
        const o = xr(t[r])[n];
        if (o !== void 0) return o;
      }
    },
    has(n) {
      for (let r = t.length - 1; r >= 0; r--) if (n in xr(t[r])) return !0;
      return !1;
    },
    keys() {
      const n = [];
      for (const r of t) n.push(...Object.keys(xr(r)));
      return [...Array.from(new Set(n))];
    }
  }, Df);
}
function pi(...e) {
  const t = {};
  for (let n of e)
    if (n = xr(n), !!n)
      for (const r of Reflect.ownKeys(n)) {
        const o = n[r];
        o !== void 0 && (t[r] = o);
      }
  return t;
}
function Nl(e) {
  return typeof e == "function" ? e : (t) => {
    var n;
    return (n = e.next) == null ? void 0 : n.call(e, t);
  };
}
function Ff(e) {
  return Object.assign(e, {
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: be(e, Nl(t), { flush: "sync" }) })
  });
}
function Hf(e) {
  return Object.assign(e, {
    set: (t) => {
      e.value = typeof t == "function" ? t(e.value) : t;
    },
    get: () => e.value,
    subscribe: (t) => ({ unsubscribe: be(e, Nl(t), { flush: "sync" }) })
  });
}
function jf() {
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
    createReadonlyAtom: (t, n) => Ff(z(() => t())),
    createWritableAtom: (t, n) => Hf(/* @__PURE__ */ $c(t)),
    untrack: (t) => t(),
    batch: (t) => t()
  };
}
function zr(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Pt(e) {
  if (Array.isArray(e)) return e.map(Pt);
  if (e && typeof e == "object") {
    const t = Object.getPrototypeOf(e);
    if (t !== Object.prototype && t !== null) return e;
    const n = t === null ? ie() : {}, r = Object.keys(e);
    for (let o = 0; o < r.length; o++) {
      const s = r[o];
      Object.defineProperty(n, s, {
        configurable: !0,
        enumerable: !0,
        value: Pt(e[s]),
        writable: !0
      });
    }
    return n;
  }
  return e;
}
function Lf(e, t) {
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
function dn(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Ul(e, t) {
  return (n) => {
    var r;
    (((r = t.options.atoms) == null ? void 0 : r[e]) ?? t.baseAtoms[e]).set((o) => zr(n, o));
  };
}
function gi(e) {
  if (typeof e != "object" || e === null) return !1;
  if (Array.isArray(e)) return !0;
  const t = Object.getPrototypeOf(e);
  return t === Object.prototype || t === null;
}
function hi(e) {
  return Reflect.ownKeys(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
const Kf = 3;
function Vf(e, t) {
  return Wl(e, t, Kf);
}
function Wl(e, t, n) {
  if (Object.is(e, t)) return !0;
  if (n <= 0 || !gi(e) || !gi(t) || (Array.isArray(e) || Array.isArray(t)) && (!Array.isArray(e) || !Array.isArray(t) || e.length !== t.length))
    return !1;
  const r = hi(e), o = hi(t);
  if (r.length !== o.length) return !1;
  const s = e, i = t;
  for (let l = 0; l < r.length; l++) {
    const c = r[l];
    if (!Object.prototype.propertyIsEnumerable.call(t, c) || !Wl(s[c], i[c], n - 1)) return !1;
  }
  return !0;
}
function qr(e, t, n, r = Vf) {
  const o = `on${t.charAt(0).toUpperCase()}${t.slice(1)}Change`, s = e.options[o];
  s && s((i) => {
    const l = zr(n, i);
    return r(i, l) ? i : l;
  });
}
function Bf(e, t) {
  const n = [], r = (o) => {
    o.forEach((s) => {
      n.push(s);
      const i = t(s);
      i.length && r(i);
    });
  };
  return r(e), n;
}
const $f = ({ fn: e, memoDeps: t, onAfterCompare: n, onAfterUpdate: r, onBeforeCompare: o, onBeforeUpdate: s }) => {
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
function Nf(e) {
  let t = !1;
  return () => {
    if (!t) {
      t = !0;
      return;
    }
    e();
  };
}
function Gr({ feature: e, fnName: t, objectId: n, onAfterUpdate: r, table: o, ...s }) {
  const i = () => {
    if (!r) return;
    const { schedule: c, untrack: f } = o._reactivity;
    c(() => f(() => r()));
  };
  return $f({
    ...s,
    ...{ onAfterUpdate: () => {
      i();
    } }
  });
}
function zl(e, t = "_") {
  const [n, r] = e.split(t);
  return {
    fnKey: r,
    fnName: `${n}.${r}`,
    parentName: n
  };
}
function Gt(e, t, n) {
  for (const [r, { fn: o, memoDeps: s }] of Object.entries(n)) {
    const { fnKey: i, fnName: l } = zl(r);
    t[i] = s ? Gr({
      memoDeps: s,
      fn: o,
      fnName: l,
      table: t,
      feature: e
    }) : o;
  }
}
function pn(e, t, n, r) {
  for (const [o, { fn: s, memoDeps: i }] of Object.entries(r)) {
    const { fnKey: l, fnName: c } = zl(o);
    if (i) {
      const f = `_memo_${l}`;
      t[l] = function(...d) {
        if (!this[f]) {
          const v = this;
          this[f] = Gr({
            memoDeps: (b) => i(v, b),
            fn: (...b) => s(v, ...b),
            fnName: c,
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
function Uf(e) {
  return e.row.getValue(e.column.id);
}
function Wf(e) {
  return e.getValue() ?? e.table.options.renderFallbackValue;
}
function zf(e) {
  return {
    table: e.table,
    column: e.column,
    row: e.row,
    cell: e,
    getValue: () => e.getValue(),
    renderValue: () => e.renderValue()
  };
}
const qf = { assignCellPrototype: (e, t) => {
  pn("coreCellsFeature", e, t, {
    cell_getValue: { fn: (n) => Uf(n) },
    cell_renderValue: { fn: (n) => Wf(n) },
    cell_getContext: {
      fn: (n) => zf(n),
      memoDeps: (n) => [n]
    }
  });
} };
function Gf(e) {
  var t, n;
  if (!e._headerPrototype) {
    e._headerPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignHeaderPrototype) == null || n.call(t, e._headerPrototype, e);
  }
  return e._headerPrototype;
}
function ql(e, t, n) {
  const r = Gf(e), o = Object.create(r);
  o.colSpan = 0, o.column = t, o.depth = n.depth, o.headerGroup = null, o.id = n.id ?? t.id, o.index = n.index, o.isPlaceholder = !!n.isPlaceholder, o.placeholderId = n.placeholderId, o.rowSpan = 0, o.subHeaders = [];
  const s = e._headerInstanceInitFns;
  for (let i = 0; i < s.length; i++) s[i](o);
  return o;
}
function Yf() {
  return {
    start: [],
    end: []
  };
}
function Ut(e) {
  var r;
  const t = (r = e.table.atoms.columnVisibility) == null ? void 0 : r.get();
  if (!t) return !0;
  const n = e.columns;
  return n.length ? n.some((o) => xe(o, "getIsVisible", Ut)) : (dn(t, e.id) ? t[e.id] : void 0) ?? !0;
}
function Xf(e) {
  return e.getAllLeafColumns().filter((t) => xe(t, "getIsVisible", Ut));
}
function Gl(e, t = 1) {
  let n = t;
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    xe(o, "getIsVisible", Ut) && o.columns.length && (n = Math.max(n, Gl(o.columns, t + 1)));
  }
  return n;
}
function Jf(e, t) {
  return String(t);
}
function Zf(e, t, n, r) {
  let o = e ?? "";
  return t && (o = o ? `${o}_${t}` : String(t)), n && (o = o ? `${o}_${n}` : n), r && (o = o ? `${o}_${r}` : r), o;
}
function Qf(e, t) {
  let n = 0;
  for (let r = 0; r < e.length; r++) e[r].column === t && n++;
  return n;
}
function Yl(e, t, n, r, o, s) {
  const i = {
    depth: t,
    id: Jf(r, t),
    headers: []
  }, l = [];
  for (let c = 0; c < e.length; c++) {
    if (!(c in e)) continue;
    const f = e[c], d = l[l.length - 1], v = f.column.depth === i.depth;
    let b, y = !1;
    if (v && f.column.parent ? b = f.column.parent : (b = f.column, y = !0), d && d.column === b) d.subHeaders.push(f);
    else {
      const I = ql(n, b, {
        id: Zf(r, t, b.id, f.id),
        isPlaceholder: y,
        placeholderId: y ? String(Qf(l, b)) : void 0,
        depth: t,
        index: l.length
      });
      I.subHeaders.push(f), l.push(I);
    }
    i.headers.push(f), f.headerGroup = i;
  }
  for (let c = 0; c < s.length; c++) s[c](i);
  o.push(i), t > 0 && Yl(l, t - 1, n, r, o, s);
}
function Xl(e) {
  for (let t = 0; t < e.length; t++) {
    const n = e[t];
    if (!xe(n.column, "getIsVisible", Ut)) continue;
    let r = 0;
    if (n.subHeaders.length) {
      Xl(n.subHeaders);
      for (let o = 0; o < n.subHeaders.length; o++) {
        const s = n.subHeaders[o];
        xe(s.column, "getIsVisible", Ut) && (r += s.colSpan);
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
function vi(e, t, n, r) {
  var c;
  const o = Gl(e), s = [], i = n._headerGroupInstanceInitFns, l = new Array(t.length);
  for (let f = 0; f < t.length; f++)
    f in t && (l[f] = ql(n, t[f], {
      depth: o,
      index: f
    }));
  return Yl(l, o - 1, n, r, s, i), s.reverse(), Xl(((c = s[0]) == null ? void 0 : c.headers) ?? []), s;
}
function ed(e) {
  var t, n;
  if (!e._columnPrototype) {
    e._columnPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignColumnPrototype) == null || n.call(t, e._columnPrototype, e);
  }
  return e._columnPrototype;
}
function td(e, t, n, r) {
  const o = {
    ...e.getDefaultColumnDef(),
    ...t
  }, s = o.accessorKey, i = s === void 0 ? void 0 : String(s), l = o.id ?? (i == null ? void 0 : i.replaceAll(".", "_")) ?? (typeof o.header == "string" ? o.header : void 0);
  let c;
  if (o.accessorFn) c = o.accessorFn;
  else if (s !== void 0) if (typeof s == "string" && s.includes(".")) {
    const b = s.split(".");
    c = (y) => {
      let I = y;
      for (let C = 0; C < b.length; C++) {
        const k = b[C];
        I = I == null ? void 0 : I[k];
      }
      return I;
    };
  } else c = (b) => b[o.accessorKey];
  if (!l)
    throw new Error();
  const f = ed(e), d = Object.create(f);
  d.accessorFn = c, d.columnDef = o, d.columns = [], d.depth = n, d.id = `${String(l)}`, d.parent = r;
  const v = e._columnInstanceInitFns;
  for (let b = 0; b < v.length; b++) v[b](d);
  return d;
}
function Jl(e) {
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
    return nd(e, o);
  };
}
function nd(e, t) {
  var l;
  const n = ((l = e.atoms.grouping) == null ? void 0 : l.get()) ?? [], { groupedColumnMode: r } = e.options;
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
function rd(e) {
  return [e, ...e.columns.flatMap((t) => t.getFlatColumns())];
}
function od(e) {
  if (e.columns.length) {
    const t = e.columns.flatMap((n) => n.getLeafColumns());
    return xe(e.table, "getOrderColumns", Jl)(t);
  }
  return [e];
}
function sd(e) {
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
function Zl(e, t, n, r = 0) {
  const o = new Array(t.length);
  for (let s = 0; s < t.length; s++) {
    if (!(s in t)) continue;
    const i = t[s], l = td(e, i, r, n), c = i;
    l.columns = c.columns ? Zl(e, c.columns, l, r + 1) : [], o[s] = l;
  }
  return o;
}
function id(e) {
  return Zl(e, e.options.columns);
}
function ld(e) {
  return e.getAllColumns().flatMap((t) => t.getFlatColumns());
}
function ad(e) {
  const t = ie(), n = e.getAllFlatColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function cd(e) {
  const t = e.getAllColumns().flatMap((n) => n.getLeafColumns());
  return xe(e, "getOrderColumns", Jl)(t);
}
function ud(e) {
  const t = ie(), n = e.getAllLeafColumns();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.id] = o;
  }
  return t;
}
function fd(e, t) {
  return e.getAllFlatColumnsById()[t];
}
const dd = {
  assignColumnPrototype: (e, t) => {
    pn("coreColumnsFeature", e, t, {
      column_getFlatColumns: {
        fn: (n) => rd(n),
        memoDeps: (n) => [n.table.options.columns]
      },
      column_getLeafColumns: {
        fn: (n) => od(n),
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
    Gt("coreColumnsFeature", e, {
      table_getDefaultColumnDef: {
        fn: () => sd(e),
        memoDeps: () => [e.options.defaultColumn]
      },
      table_getAllColumns: {
        fn: () => id(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumns: {
        fn: () => ld(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllFlatColumnsById: {
        fn: () => ad(e),
        memoDeps: () => [e.options.columns]
      },
      table_getAllLeafColumns: {
        fn: () => cd(e),
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
        fn: () => ud(e),
        memoDeps: () => [e.getAllLeafColumns()]
      },
      table_getColumn: { fn: (t) => fd(e, t) }
    });
  }
};
function Ql(e, t) {
  for (let n = 0; n < e.subHeaders.length; n++) Ql(e.subHeaders[n], t);
  t.push(e);
}
function pd(e) {
  const t = [];
  return Ql(e, t), t;
}
function gd(e) {
  return {
    column: e.column,
    header: e,
    table: e.column.table
  };
}
function hd(e) {
  var f;
  const { start: t, end: n } = ((f = e.atoms.columnPinning) == null ? void 0 : f.get()) ?? Yf(), r = e.getAllColumns(), o = xe(e, "getVisibleLeafColumns", Xf);
  if (!t.length && !n.length) return vi(r, o, e);
  const s = e.getAllLeafColumnsById(), i = [];
  for (let d = 0; d < t.length; d++) {
    const v = s[t[d]];
    v && xe(v, "getIsVisible", Ut) && i.push(v);
  }
  const l = [];
  for (let d = 0; d < n.length; d++) {
    const v = s[n[d]];
    v && xe(v, "getIsVisible", Ut) && l.push(v);
  }
  const c = o.filter((d) => !t.includes(d.id) && !n.includes(d.id));
  return vi(r, [
    ...i,
    ...c,
    ...l
  ], e);
}
function vd(e) {
  return [...e.getHeaderGroups()].reverse();
}
function md(e) {
  const t = e.getHeaderGroups(), n = [];
  for (let r = 0; r < t.length; r++) {
    const o = t[r].headers;
    for (let s = 0; s < o.length; s++) n.push(o[s]);
  }
  return n;
}
function wd(e) {
  var r;
  const t = ((r = e.getHeaderGroups()[0]) == null ? void 0 : r.headers) ?? [], n = [];
  for (let o = 0; o < t.length; o++) {
    const s = t[o].getLeafHeaders();
    for (let i = 0; i < s.length; i++) n.push(s[i]);
  }
  return n;
}
const yd = {
  assignHeaderPrototype: (e, t) => {
    pn("coreHeadersFeature", e, t, {
      header_getLeafHeaders: {
        fn: (n) => pd(n),
        memoDeps: (n) => [n.column.table.options.columns]
      },
      header_getContext: {
        fn: (n) => gd(n),
        memoDeps: (n) => [n.column.table.options.columns]
      }
    });
  },
  constructTableAPIs: (e) => {
    Gt("coreHeadersFeature", e, {
      table_getHeaderGroups: {
        fn: () => hd(e),
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
        fn: () => vd(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getFlatHeaders: {
        fn: () => md(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getLeafHeaders: {
        fn: () => wd(e),
        memoDeps: () => [e.getHeaderGroups()]
      }
    });
  }
};
function bd(e) {
  var t, n;
  if (!e._rowPrototype) {
    e._rowPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignRowPrototype) == null || n.call(t, e._rowPrototype, e);
  }
  return e._rowPrototype;
}
const _d = (e, t, n, r, o, s, i) => {
  const l = bd(e), c = Object.create(l);
  c._displayIndexCache = -1, c._uniqueValuesCache = ie(), c._valuesCache = ie(), c.depth = o, c.id = t, c.index = r, c.original = n, c.parentId = i, c.subRows = [];
  const f = e._rowInstanceInitFns;
  for (let d = 0; d < f.length; d++) f[d](c);
  return c;
};
function xd() {
  return [];
}
function Sd(e, t) {
  qr(e, "cellSelection", Pt(e.initialState.cellSelection) ?? xd());
}
function Rd(e) {
  e.atoms.cellSelection && (e.options.autoResetAll ?? e.options.autoResetCellSelection ?? !0) && e._reactivity.schedule(() => Sd(e));
}
function Cd() {
  return ie();
}
function ea(e) {
  e.atoms.expanded && (e.options.autoResetAll ?? e.options.autoResetExpanded ?? !e.options.manualExpanding) && e._reactivity.schedule(() => na(e));
}
function Pr(e, t) {
  var n, r;
  (r = (n = e.options).onExpandedChange) == null || r.call(n, t);
}
function ta(e, t) {
  var r;
  const n = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t ?? !oa(e)) {
    if (n === !0 || !ra(e)) return;
    Pr(e, !0);
  } else {
    if (n !== !0 && !Object.keys(n).length) return;
    Pr(e, ie());
  }
}
function na(e, t) {
  const n = e.initialState.expanded;
  qr(e, "expanded", t ? ie() : n === !0 ? !0 : Object.assign(ie(), Pt(n ?? {})));
}
function ra(e) {
  return e.getPrePaginatedRowModel().flatRows.some((t) => Wt(t));
}
function Md(e) {
  return (t) => {
    ta(e);
  };
}
function Id(e) {
  var n;
  const t = ((n = e.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return t === !0 || Object.values(t).some(Boolean);
}
function oa(e) {
  var r;
  const t = ((r = e.atoms.expanded) == null ? void 0 : r.get()) ?? {};
  if (t === !0) return !0;
  if (!Object.keys(t).length) return !1;
  const n = e.getRowModel().flatRows.filter((o) => Wt(o));
  return !(!n.length || n.some((o) => !Yr(o)));
}
function Ed(e) {
  var r;
  let t = 0;
  const n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return (n === !0 ? Object.values(e.getRowModel().rowsById).filter((o) => Wt(o)).map((o) => o.id) : Object.keys(n ?? {})).forEach((o) => {
    const s = o.split(".");
    t = Math.max(t, s.length);
  }), t;
}
function sa(e, t) {
  var s;
  const n = ((s = e.table.atoms.expanded) == null ? void 0 : s.get()) ?? {}, r = n === !0 || Jo(n, e.id), o = t ?? !r;
  o !== r && (o && !Wt(e) || Pr(e.table, (i) => {
    const l = i === !0 ? !0 : Jo(i, e.id);
    let c = ie();
    if (i === !0 ? Object.values(e.table.getRowModel().rowsById).forEach((f) => {
      Wt(f) && (c[f.id] = !0);
    }) : c = Object.assign(ie(), i), !l && o)
      return c[e.id] = !0, c;
    if (l && !o) {
      const f = ie(), d = Object.keys(c);
      for (let v = 0; v < d.length; v++) {
        const b = d[v];
        b !== e.id && c[b] && (f[b] = !0);
      }
      return f;
    }
    return i;
  }));
}
function Yr(e) {
  var n, r, o;
  const t = ((n = e.table.atoms.expanded) == null ? void 0 : n.get()) ?? {};
  return !!(((o = (r = e.table.options).getIsRowExpanded) == null ? void 0 : o.call(r, e)) ?? (t === !0 || Jo(t, e.id)));
}
function Jo(e, t) {
  return !!(e && e !== !0 && dn(e, t) && e[t]);
}
function Wt(e) {
  var t, n;
  return ((n = (t = e.table.options).getRowCanExpand) == null ? void 0 : n.call(t, e)) ?? ((e.table.options.enableExpanding ?? !0) && !!e.subRows.length);
}
function Ad(e) {
  let t = !0, n = e;
  for (; t && n.parentId; )
    n = e.table.getRow(n.parentId, !0), t = Yr(n);
  return t;
}
function Od(e) {
  const t = Wt(e);
  return () => {
    t && sa(e);
  };
}
const Zo = 0;
function Pd(e) {
  var t, n;
  if (e.options.autoResetAll ?? e.options.autoResetPageIndex ?? !e.options.manualPagination) {
    if ((((n = (t = e.atoms.pagination) == null ? void 0 : t.get()) == null ? void 0 : n.pageIndex) ?? Zo) === Zo) return;
    Dd(e);
  }
}
function kd(e, t) {
  qr(e, "pagination", t);
}
function Td(e, t) {
  kd(e, (n) => {
    let r = zr(t, n.pageIndex);
    const o = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
    return r = Math.max(0, Math.min(r, o)), {
      ...n,
      pageIndex: r
    };
  });
}
function Dd(e, t) {
  Td(e, Zo);
}
function Fd(e, t) {
  qr(e, "sorting", t);
}
function Hd(e, t) {
  Fd(e, Pt(e.initialState.sorting ?? []));
}
function jd(e) {
  e.atoms.sorting && (e.options.autoResetAll ?? e.options.autoResetSorting ?? !1) && Hd(e);
}
function ia() {
  return (e) => Gr({
    feature: "coreRowModelsFeature",
    table: e,
    fnName: "table.getCoreRowModel",
    memoDeps: () => [e.options.data],
    fn: () => Ld(e, e.options.data),
    onAfterUpdate: Nf(() => {
      ea(e), Pd(e), jd(e), Rd(e);
    })
  });
}
function la(e, t, n, r = 0, o) {
  var i;
  const s = [];
  for (let l = 0; l < n.length; l++) {
    const c = n[l], f = _d(e, e.getRowId(c, l, o), c, l, r, void 0, o == null ? void 0 : o.id);
    t.flatRows.push(f), t.rowsById[f.id] = f, s.push(f), e.options.getSubRows && (f.originalSubRows = e.options.getSubRows(c, l), (i = f.originalSubRows) != null && i.length && (f.subRows = la(e, t, f.originalSubRows, r + 1, f)));
  }
  return s;
}
function Ld(e, t) {
  const n = {
    rows: [],
    flatRows: [],
    rowsById: ie()
  };
  return n.rows = la(e, n, t), n;
}
function Kd(e) {
  var t, n;
  return e._rowModels.coreRowModel || (e._rowModels.coreRowModel = ((n = (t = e.options.features).coreRowModel) == null ? void 0 : n.call(t, e)) ?? ia()(e)), e._rowModels.coreRowModel();
}
function Vd(e) {
  return e.getCoreRowModel();
}
function Bd(e) {
  var t, n;
  return e._rowModels.filteredRowModel || (e._rowModels.filteredRowModel = (n = (t = e.options.features).filteredRowModel) == null ? void 0 : n.call(t, e)), e.options.manualFiltering || !e._rowModels.filteredRowModel ? e.getPreFilteredRowModel() : e._rowModels.filteredRowModel();
}
function $d(e) {
  return e.getFilteredRowModel();
}
function Nd(e) {
  var t, n;
  return e._rowModels.groupedRowModel || (e._rowModels.groupedRowModel = (n = (t = e.options.features).groupedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualGrouping || !e._rowModels.groupedRowModel ? e.getPreGroupedRowModel() : e._rowModels.groupedRowModel();
}
function Ud(e) {
  return e.getGroupedRowModel();
}
function Wd(e) {
  var t, n;
  return e._rowModels.sortedRowModel || (e._rowModels.sortedRowModel = (n = (t = e.options.features).sortedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualSorting || !e._rowModels.sortedRowModel ? e.getPreSortedRowModel() : e._rowModels.sortedRowModel();
}
function zd(e) {
  return e.getSortedRowModel();
}
function qd(e) {
  var t, n;
  return e._rowModels.expandedRowModel || (e._rowModels.expandedRowModel = (n = (t = e.options.features).expandedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualExpanding || !e._rowModels.expandedRowModel ? e.getPreExpandedRowModel() : e._rowModels.expandedRowModel();
}
function Gd(e) {
  return e.getExpandedRowModel();
}
function Yd(e) {
  var t, n;
  return e._rowModels.paginatedRowModel || (e._rowModels.paginatedRowModel = (n = (t = e.options.features).paginatedRowModel) == null ? void 0 : n.call(t, e)), e.options.manualPagination || !e._rowModels.paginatedRowModel ? e.getPrePaginatedRowModel() : e._rowModels.paginatedRowModel();
}
function Xd(e) {
  return e.getPaginatedRowModel();
}
const Jd = { constructTableAPIs: (e) => {
  Gt("coreRowModelsFeature", e, {
    table_getCoreRowModel: { fn: () => Kd(e) },
    table_getPreFilteredRowModel: { fn: () => Vd(e) },
    table_getFilteredRowModel: { fn: () => Bd(e) },
    table_getPreGroupedRowModel: { fn: () => $d(e) },
    table_getGroupedRowModel: { fn: () => Nd(e) },
    table_getPreSortedRowModel: { fn: () => Ud(e) },
    table_getSortedRowModel: { fn: () => Wd(e) },
    table_getPreExpandedRowModel: { fn: () => zd(e) },
    table_getExpandedRowModel: { fn: () => qd(e) },
    table_getPrePaginatedRowModel: { fn: () => Gd(e) },
    table_getPaginatedRowModel: { fn: () => Yd(e) },
    table_getRowModel: { fn: () => Xd(e) }
  });
} };
function Zd(e) {
  var t, n;
  if (!e._cellPrototype) {
    e._cellPrototype = { table: e };
    const r = Object.values(e._features);
    for (let o = 0; o < r.length; o++) (n = (t = r[o]).assignCellPrototype) == null || n.call(t, e._cellPrototype, e);
  }
  return e._cellPrototype;
}
function Qd(e, t, n) {
  const r = Zd(n), o = Object.create(r);
  o.column = e, o.id = `${t.id}_${e.id}`, o.row = t;
  const s = n._cellInstanceInitFns;
  for (let i = 0; i < s.length; i++) s[i](o);
  return o;
}
function ep(e) {
  const t = e.table.getRowsInDisplayOrder(), n = e._displayIndexCache;
  return t[n] === e ? n : -1;
}
function tp(e) {
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
function np(e, t) {
  if (dn(e._valuesCache, t)) return e._valuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return e._valuesCache[t] = n.accessorFn(e.original, e.index), e._valuesCache[t];
}
function rp(e, t) {
  if (dn(e._uniqueValuesCache, t)) return e._uniqueValuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return n.columnDef.getUniqueValues ? (e._uniqueValuesCache[t] = n.columnDef.getUniqueValues(e.original, e.index), e._uniqueValuesCache[t]) : (e._uniqueValuesCache[t] = [e.getValue(t)], e._uniqueValuesCache[t]);
}
function op(e, t) {
  return e.getValue(t) ?? e.table.options.renderFallbackValue;
}
function sp(e) {
  return Bf(e.subRows, (t) => t.subRows);
}
function ip(e) {
  const t = e.getCoreRowModel().flatRows;
  let n = 0;
  for (let r = 0; r < t.length; r++) n = Math.max(n, t[r].depth);
  return n;
}
function lp(e) {
  if (e.parentId)
    return e.table.getCoreRowModel().rowsById[e.parentId] ?? e.table.getRow(e.parentId, !0);
}
function ap(e) {
  const t = [];
  let n = e;
  for (; ; ) {
    const r = n.getParentRow();
    if (!r) break;
    t.push(r), n = r;
  }
  return t.reverse();
}
function cp(e) {
  const t = e.table.getAllLeafColumns();
  let n = e._cellsCache;
  n || (n = e._cellsCache = /* @__PURE__ */ new WeakMap());
  const r = new Array(t.length);
  for (let o = 0; o < t.length; o++) {
    const s = t[o];
    let i = n.get(s);
    i || (i = Qd(s, e, e.table), n.set(s, i)), r[o] = i;
  }
  return r;
}
function up(e) {
  const t = ie(), n = e.getAllCells();
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    t[o.column.id] = o;
  }
  return t;
}
function fp(e, t, n, r) {
  var o, s;
  return ((s = (o = t.options).getRowId) == null ? void 0 : s.call(o, e, n, r)) ?? (r ? `${r.id}.${n}` : String(n));
}
function dp(e, t, n) {
  let r = (n ? e.getPrePaginatedRowModel() : e.getRowModel()).rowsById[t];
  if (!r && (r = e.getCoreRowModel().rowsById[t], !r))
    throw new Error();
  return r;
}
const pp = {
  assignRowPrototype: (e, t) => {
    pn("coreRowsFeature", e, t, {
      row_getDisplayIndex: { fn: (n) => ep(n) },
      row_getAllCellsByColumnId: {
        fn: (n) => up(n),
        memoDeps: (n) => [n.getAllCells()]
      },
      row_getAllCells: {
        fn: (n) => cp(n),
        memoDeps: (n) => [n.table.getAllLeafColumns()]
      },
      row_getLeafRows: {
        fn: (n) => sp(n),
        memoDeps: (n) => [n.subRows]
      },
      row_getParentRow: { fn: (n) => lp(n) },
      row_getParentRows: { fn: (n) => ap(n) },
      row_getUniqueValues: { fn: (n, r) => rp(n, r) },
      row_getValue: { fn: (n, r) => np(n, r) },
      row_renderValue: { fn: (n, r) => op(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    Gt("coreRowsFeature", e, {
      table_getRowsInDisplayOrder: {
        fn: () => tp(e),
        memoDeps: () => {
          var t;
          return [
            e.getPrePaginatedRowModel().rows,
            e.options.paginateExpandedRows,
            e.options.paginateExpandedRows === !1 ? (t = e.atoms.expanded) == null ? void 0 : t.get() : void 0
          ];
        }
      },
      table_getRowId: { fn: (t, n, r) => fp(t, e, n, r) },
      table_getRow: { fn: (t, n) => dp(e, t, n) },
      table_getMaxSubRowDepth: {
        fn: () => ip(e),
        memoDeps: () => [e.getCoreRowModel()]
      }
    });
  }
};
function aa(e, t, n = (r, o) => r === o) {
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
function gp(e, t, n = (r, o) => r === o) {
  e._reactivity.batch(() => {
    var r, o;
    aa(e, t, n), (o = (r = e._reactivity).commit) == null || o.call(r);
  });
}
function hp(e) {
  var r, o;
  const t = Pt(e.initialState);
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
function vp(e, t) {
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
function mp(e, t, n) {
  const r = vp(e, zr(t, e.options));
  e.optionsStore ? e.optionsStore.set(() => r) : e.options = r, gp(e, r.state ?? null);
}
const wp = { constructTableAPIs: (e) => {
  Gt("coreTablesFeature", e, {
    table_reset: { fn: () => hp(e) },
    table_setOptions: { fn: (t) => mp(e, t) }
  });
} }, yp = {
  coreCellsFeature: qf,
  coreColumnsFeature: dd,
  coreHeadersFeature: yd,
  coreRowModelsFeature: Jd,
  coreRowsFeature: pp,
  coreTablesFeature: wp
};
function bp(e) {
  const t = e;
  return Object.defineProperty(e, "state", { get() {
    return e.get();
  } }), "set" in e && (t.setState = e.set.bind(e)), t;
}
function _p(e, t) {
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
  const n = mi(e);
  if (n.length !== mi(t).length) return !1;
  for (let r = 0; r < n.length; r++) if (!Object.prototype.hasOwnProperty.call(t, n[r]) || !Object.is(e[n[r]], t[n[r]])) return !1;
  return !0;
}
function mi(e) {
  return Object.keys(e).concat(Object.getOwnPropertySymbols(e));
}
function xp(e, t = {}) {
  return Object.values(e).forEach((n) => {
    var r;
    t = ((r = n.getInitialState) == null ? void 0 : r.call(n, t)) ?? t;
  }), Pt(t);
}
function Sp(e) {
  var U, ue;
  const t = e.features.coreReactivityFeature, { aggregationFns: n, columnMeta: r, coreRowModel: o, expandedRowModel: s, facetedMinMaxValues: i, facetedRowModel: l, facetedUniqueValues: c, filterFns: f, filterMeta: d, filteredRowModel: v, groupedRowModel: b, paginatedRowModel: y, sortFns: I, sortedRowModel: C, tableMeta: k, ...H } = e.features, M = {
    _cellInstanceInitFns: [],
    _columnInstanceInitFns: [],
    _features: {
      ...yp,
      ...H
    },
    _headerGroupInstanceInitFns: [],
    _headerInstanceInitFns: [],
    _reactivity: t,
    _rowInstanceInitFns: [],
    _rowModelFns: {
      aggregationFns: n,
      filterFns: f,
      sortFns: I
    },
    _rowModels: {},
    atoms: {},
    baseAtoms: {}
  }, K = Object.values(M._features), E = {
    ...K.reduce((F, j) => {
      var G;
      return Object.assign(F, (G = j.getDefaultTableOptions) == null ? void 0 : G.call(j, M));
    }, {}),
    ...e
  };
  if (t.wrapExternalAtoms && E.atoms) for (const [F, j] of Object.entries(E.atoms)) {
    const G = j, fe = t.createWritableAtom(G.get(), { debugName: `externalAtom/${F}` });
    E.atoms[F] = fe;
    let le = !1;
    const ve = G.subscribe((Ee) => {
      le || fe.set(Ee);
    }), De = fe.subscribe((Ee) => {
      le = !0, G.set(Ee), le = !1;
    });
    t.addSubscription(ve), t.addSubscription(De);
  }
  t.createOptionsStore ? (M.optionsStore = t.createWritableAtom(E, { debugName: "table/optionsStore" }), Object.defineProperty(M, "options", {
    configurable: !0,
    enumerable: !0,
    get() {
      return M.optionsStore.get();
    },
    set(F) {
      M.optionsStore.set(() => F);
    }
  })) : M.options = E, M.initialState = xp(M._features, M.options.initialState);
  const $ = Object.keys(M.initialState);
  for (let F = 0; F < $.length; F++) {
    const j = $[F];
    M.baseAtoms[j] = t.createWritableAtom(M.initialState[j], { debugName: `table/baseAtoms/${j}` }), M.atoms[j] = t.createReadonlyAtom(() => {
      var De;
      const G = M.options, fe = (De = G.atoms) == null ? void 0 : De[j], le = fe ? fe.get() : M.baseAtoms[j].get();
      if (fe) return le;
      const ve = G.state;
      if (ve && dn(ve, j)) {
        const Ee = ve[j];
        return Ee === void 0 ? M.initialState[j] : Ee;
      }
      return le;
    }, { debugName: `table/atoms/${j}` });
  }
  aa(M), M.store = bp(t.createReadonlyAtom(() => {
    const F = {};
    for (let j = 0; j < $.length; j++) {
      const G = $[j];
      F[G] = M.atoms[G].get();
    }
    return F;
  }, {
    compare: _p,
    debugName: "table/store"
  }));
  for (let F = 0; F < K.length; F++) {
    const j = K[F];
    (U = j.initTableInstanceData) == null || U.call(j, M), j.initCellInstanceData && M._cellInstanceInitFns.push(j.initCellInstanceData.bind(j)), j.initColumnInstanceData && M._columnInstanceInitFns.push(j.initColumnInstanceData.bind(j)), j.initHeaderGroupInstanceData && M._headerGroupInstanceInitFns.push(j.initHeaderGroupInstanceData.bind(j)), j.initHeaderInstanceData && M._headerInstanceInitFns.push(j.initHeaderInstanceData.bind(j)), j.initRowInstanceData && M._rowInstanceInitFns.push(j.initRowInstanceData.bind(j)), (ue = j.constructTableAPIs) == null || ue.call(j, M);
  }
  return M;
}
const Rp = {
  getInitialState: (e) => ({
    expanded: Cd(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onExpandedChange: Ul("expanded", e),
    paginateExpandedRows: !0
  }),
  assignRowPrototype: (e, t) => {
    pn("rowExpandingFeature", e, t, {
      row_toggleExpanded: { fn: (n, r) => sa(n, r) },
      row_getIsExpanded: { fn: (n) => Yr(n) },
      row_getCanExpand: { fn: (n) => Wt(n) },
      row_getIsAllParentsExpanded: { fn: (n) => Ad(n) },
      row_getToggleExpandedHandler: { fn: (n) => Od(n) }
    });
  },
  constructTableAPIs: (e) => {
    Gt("rowExpandingFeature", e, {
      table_autoResetExpanded: { fn: () => ea(e) },
      table_setExpanded: { fn: (t) => Pr(e, t) },
      table_toggleAllRowsExpanded: { fn: (t) => ta(e, t) },
      table_resetExpanded: { fn: (t) => na(e, t) },
      table_getCanSomeRowsExpand: { fn: () => ra(e) },
      table_getToggleAllRowsExpandedHandler: { fn: () => Md(e) },
      table_getIsSomeRowsExpanded: { fn: () => Id(e) },
      table_getIsAllRowsExpanded: { fn: () => oa(e) },
      table_getExpandedDepth: { fn: () => Ed(e) }
    });
  }
};
function Cp() {
  return ie();
}
function gn(e, t) {
  var n, r;
  (r = (n = e.options).onRowSelectionChange) == null || r.call(n, t);
}
function Mp(e, t) {
  e._lastSelectedRowId = null, gn(e, t ? ie() : Object.assign(ie(), Pt(e.initialState.rowSelection ?? {})));
}
function ca(e, t, n) {
  e._lastSelectedRowId = null, gn(e, (r) => {
    if (t = typeof t < "u" ? t : !xe(e, "getIsAllRowsSelected", da), n != null && n.deselectAll && !t) return ie();
    const o = Object.assign(ie(), r), s = e.getPreGroupedRowModel().flatRows;
    if (t) {
      const i = /* @__PURE__ */ new Map();
      s.forEach((l) => {
        kr(l, i) && (o[l.id] = !0);
      });
    } else s.forEach((i) => {
      yt(i) && delete o[i.id];
    });
    return o;
  });
}
function ua(e, t, n) {
  e._lastSelectedRowId = null, gn(e, (r) => {
    const o = typeof t < "u" ? t : !xe(e, "getIsAllPageRowsSelected", pa);
    if (n != null && n.deselectAll && !o) return ie();
    const s = Object.assign(ie(), r);
    return e.getRowModel().rows.forEach((i) => {
      Jr(s, i.id, o, !0, e, !0);
    }), s;
  });
}
function Ip(e) {
  return e.getCoreRowModel();
}
function Ep(e) {
  const t = e.getCoreRowModel();
  return xe(e, "getIsSomeRowsSelected", Xr) ? _s(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: ie()
  };
}
function Ap(e) {
  const t = e.getFilteredRowModel();
  return xe(e, "getIsSomeRowsSelected", Xr) ? _s(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: ie()
  };
}
function Op(e) {
  const t = e.getSortedRowModel();
  return xe(e, "getIsSomeRowsSelected", Xr) ? _s(t, e) : {
    rows: [],
    flatRows: [],
    rowsById: ie()
  };
}
function fa(e) {
  var t;
  return Object.keys(((t = e.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function da(e) {
  var o;
  const t = e.getFilteredRowModel().flatRows, n = ((o = e.atoms.rowSelection) == null ? void 0 : o.get()) ?? {};
  let r = !!(t.length && Object.keys(n).length);
  if (r) {
    const s = /* @__PURE__ */ new Map();
    t.some((i) => !Yn(i, n) && kr(i, s)) && (r = !1);
  }
  return r;
}
function pa(e) {
  var s;
  const t = e.getPaginatedRowModel().flatRows, n = ((s = e.atoms.rowSelection) == null ? void 0 : s.get()) ?? {}, r = /* @__PURE__ */ new Map();
  let o = !1;
  for (let i = 0; i < t.length; i++) {
    const l = t[i];
    if (Yn(l, n))
      !o && kr(l, r) && (o = !0);
    else if (kr(l, r)) return !1;
  }
  return o;
}
function Xr(e) {
  return xe(e, "getSelectedRowIds", fa).length > 0;
}
function Pp(e) {
  return e.getPaginatedRowModel().flatRows.filter((t) => yt(t)).some((t) => ys(t) || xe(t, "getIsSomeSelected", ha));
}
function kp(e) {
  return (t) => {
    ca(e, t.target.checked);
  };
}
function Tp(e) {
  return (t) => {
    ua(e, t.target.checked);
  };
}
function ga(e, t, n) {
  const r = ys(e);
  gn(e.table, (o) => {
    t = typeof t < "u" ? t : !r;
    const s = Object.assign(ie(), o);
    return Jr(s, e.id, t, ((n == null ? void 0 : n.selectChildren) ?? !0) && Nt(e), e.table), !t && (n != null && n.deselectParents) && va(s, e), s;
  });
}
function ys(e) {
  var t;
  return Yn(e, ((t = e.table.atoms.rowSelection) == null ? void 0 : t.get()) ?? {});
}
function ha(e) {
  return xs(e) === "some";
}
function Dp(e) {
  return xs(e) === "all";
}
function yt(e) {
  const t = e.table.options;
  return typeof t.enableRowSelection == "function" ? t.enableRowSelection(e) : t.enableRowSelection ?? !0;
}
function bs(e) {
  const t = e.table.options;
  return typeof t.enableSubRowSelection == "function" ? t.enableSubRowSelection(e) : t.enableSubRowSelection ?? !0;
}
function Nt(e) {
  const t = e.table.options;
  return typeof t.enableMultiRowSelection == "function" ? t.enableMultiRowSelection(e) : t.enableMultiRowSelection ?? !0;
}
function Fp(e, t) {
  const n = yt(e);
  return (r) => {
    var c, f;
    if (!n) return;
    const o = r, s = e.table, i = o.target.checked, l = s._lastSelectedRowId;
    (!(s.options.enableRowRangeSelection !== !1 && l !== null && Nt(e) && (((f = (c = s.options).isRowRangeSelectionEvent) == null ? void 0 : f.call(c, r)) ?? !1)) || !Hp(e, l, i, t)) && ga(e, i, t), s._lastSelectedRowId = e.id;
  };
}
function Hp(e, t, n, r) {
  const o = (r == null ? void 0 : r.selectChildren) ?? !0, s = e.table, i = s.getRowsInDisplayOrder(), l = s.getPrePaginatedRowModel().rowsById[t] ?? s.getCoreRowModel().rowsById[t];
  if (!l) return !1;
  const c = l.getDisplayIndex(), f = e.getDisplayIndex(), d = i[c], v = i[f];
  if (c < 0 || f < 0 || c >= i.length || f >= i.length || (d == null ? void 0 : d.id) !== l.id || (v == null ? void 0 : v.id) !== e.id || !Nt(l) || !Nt(e)) return !1;
  const b = Math.min(c, f), y = Math.max(c, f);
  return gn(s, (I) => {
    const C = Object.assign(ie(), I);
    for (let k = b; k <= y; k++) {
      const H = i[k];
      !yt(H) || !Nt(H) || (Jr(C, H.id, n, o, s), !n && (r != null && r.deselectParents) && va(C, H));
    }
    return C;
  }), !0;
}
function Jr(e, t, n, r, o, s) {
  const i = o.getRow(t, !0);
  n ? (Nt(i) || Object.keys(e).forEach((l) => delete e[l]), yt(i) && (e[t] = !0)) : (!s || yt(i)) && delete e[t], r && i.subRows.length && bs(i) && i.subRows.forEach((l) => Jr(e, l.id, n, r, o, s));
}
function kr(e, t) {
  if (!yt(e)) return !1;
  const n = e.table;
  if (n.options.enableSubRowSelection === !0) return !0;
  const r = e.parentId;
  if (r === void 0) return !0;
  const o = t.get(r);
  if (o !== void 0) return o;
  const s = n.getCoreRowModel().rowsById, i = [];
  let l = !0, c = r;
  for (; c !== void 0; ) {
    const f = t.get(c);
    if (f !== void 0) {
      l = f;
      break;
    }
    i.push(c);
    const d = s[c] ?? n.getRow(c, !0);
    if (!bs(d)) {
      l = !1;
      break;
    }
    c = d.parentId;
  }
  return i.forEach((f) => t.set(f, l)), l;
}
function va(e, t) {
  const n = t.table.getCoreRowModel().rowsById;
  let r = t.parentId;
  for (; r !== void 0; )
    delete e[r], r = (n[r] ?? t.table.getRow(r, !0)).parentId;
}
function ma(e, t, n, r) {
  const o = [];
  for (let s = 0; s < e.length; s++) {
    const i = e[s], l = Yn(i, t);
    if (l && (n.push(i), r[i.id] = i), i.subRows.length) {
      const c = ma(i.subRows, t, n, r);
      if (l) {
        const f = Object.create(Object.getPrototypeOf(i));
        Lf(f, i), f.subRows = c, o.push(f);
      }
    } else l && o.push(i);
  }
  return o;
}
function _s(e, t) {
  var s;
  const n = [], r = ie(), o = ((s = t.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  return {
    rows: ma(e.rows, o, n, r),
    flatRows: n,
    rowsById: r
  };
}
function Yn(e, t) {
  return !!(dn(t, e.id) && t[e.id]);
}
function xs(e) {
  var s;
  if (!e.subRows.length) return !1;
  const t = ((s = e.table.atoms.rowSelection) == null ? void 0 : s.get()) ?? {};
  let n = !1, r = !0, o = !1;
  for (let i = 0; i < e.subRows.length; i++) {
    const l = e.subRows[i];
    if (n && !r) break;
    if (yt(l) && (o = !0, Yn(l, t) ? n = !0 : r = !1), l.subRows.length) {
      const c = xs(l);
      c === "all" ? (n = !0, o = !0) : c === "some" ? (n = !0, r = !1, o = !0) : r = !1;
    }
  }
  return o ? r ? "all" : n ? "some" : !1 : !1;
}
const jp = {
  initTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  resetTableInstanceData: (e) => {
    e._lastSelectedRowId = null;
  },
  getInitialState: (e) => ({
    rowSelection: Cp(),
    ...e
  }),
  getDefaultTableOptions: (e) => ({
    onRowSelectionChange: Ul("rowSelection", e),
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
    pn("rowSelectionFeature", e, t, {
      row_toggleSelected: { fn: (n, r, o) => ga(n, r, o) },
      row_getIsSelected: { fn: (n) => ys(n) },
      row_getIsSomeSelected: {
        fn: (n) => ha(n),
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
        fn: (n) => Dp(n),
        memoDeps: (n) => {
          var r;
          return [
            n.subRows,
            (r = n.table.atoms.rowSelection) == null ? void 0 : r.get(),
            n.table.options.enableRowSelection
          ];
        }
      },
      row_getCanSelect: { fn: (n) => yt(n) },
      row_getCanSelectSubRows: { fn: (n) => bs(n) },
      row_getCanMultiSelect: { fn: (n) => Nt(n) },
      row_getToggleSelectedHandler: { fn: (n, r) => Fp(n, r) }
    });
  },
  constructTableAPIs: (e) => {
    Gt("rowSelectionFeature", e, {
      table_setRowSelection: { fn: (t) => gn(e, t) },
      table_resetRowSelection: { fn: (t) => Mp(e, t) },
      table_toggleAllRowsSelected: { fn: (t, n) => ca(e, t, n) },
      table_toggleAllPageRowsSelected: { fn: (t, n) => ua(e, t, n) },
      table_getPreSelectedRowModel: { fn: () => Ip(e) },
      table_getSelectedRowModel: {
        fn: () => Ep(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getCoreRowModel()];
        }
      },
      table_getFilteredSelectedRowModel: {
        fn: () => Ap(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getFilteredRowModel()];
        }
      },
      table_getGroupedSelectedRowModel: {
        fn: () => Op(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get(), e.getSortedRowModel()];
        }
      },
      table_getSelectedRowIds: {
        fn: () => fa(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get()];
        }
      },
      table_getIsAllRowsSelected: {
        fn: () => da(e),
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
        fn: () => pa(e),
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
        fn: () => Xr(e),
        memoDeps: () => {
          var t;
          return [(t = e.atoms.rowSelection) == null ? void 0 : t.get()];
        }
      },
      table_getIsSomePageRowsSelected: {
        fn: () => Pp(e),
        memoDeps: () => {
          var t;
          return [
            (t = e.atoms.rowSelection) == null ? void 0 : t.get(),
            e.getPaginatedRowModel(),
            e.options.enableRowSelection
          ];
        }
      },
      table_getToggleAllRowsSelectedHandler: { fn: () => kp(e) },
      table_getToggleAllPageRowsSelectedHandler: { fn: () => Tp(e) }
    });
  }
};
function Lp() {
  return (e) => {
    const t = e;
    return Gr({
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
      fn: () => Kp(t)
    });
  };
}
function Kp(e) {
  var r;
  const t = e.getPreExpandedRowModel(), n = (r = e.atoms.expanded) == null ? void 0 : r.get();
  return !t.rows.length || n !== !0 && !Object.keys(n ?? {}).length || !e.options.paginateExpandedRows && !e.options.manualPagination ? t : Vp(t);
}
function Vp(e) {
  const t = [], n = (r) => {
    t.push(r), r.subRows.length && Yr(r) && r.subRows.forEach(n);
  };
  return e.rows.forEach(n), {
    rows: t,
    flatRows: e.flatRows,
    rowsById: e.rowsById
  };
}
function wi(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = Bt(e[n]);
  return Xo(e, t);
}
function Bp(e) {
  return Object.keys(e).map((t) => Bt(e[t]));
}
function $p(e) {
  const t = (l, c) => {
    l.setOptions((f) => pi(f, wi(c)));
  }, n = jf(), r = Xo(e, { features: {
    coreReactivityFeature: n,
    ...Bt(e.features) ?? {}
  } }), o = Xo(wi(r), { mergeOptions: (l, c) => pi(l, c) }), s = Sp(o), i = s;
  return Wi() && xc(() => {
    var l;
    return (l = n.unmount) == null ? void 0 : l.call(n);
  }), be(() => Bp(r), () => {
    t(s, r);
  }, { immediate: !0 }), be(() => {
    const l = Bt(e.state), c = Bt(e.atoms);
    if (!l) return [];
    const f = [];
    for (const d of Object.keys(i.initialState))
      !(d in l) || (c == null ? void 0 : c[d]) !== void 0 || f.push(l[d]);
    return f;
  }, (l) => {
    l.length > 0 && t(s, r);
  }, { immediate: !0 }), i.Subscribe = (l) => l.children(i.atoms), i;
}
function Zr() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return function() {
    t.forEach(function(o) {
      return o();
    });
  };
}
function Np(e) {
  if (Array.isArray(e)) return e;
}
function Up(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r, o, s, i, l = [], c = !0, f = !1;
    try {
      if (s = (n = n.call(e)).next, t !== 0) for (; !(c = (r = s.call(n)).done) && (l.push(r.value), l.length !== t); c = !0) ;
    } catch (d) {
      f = !0, o = d;
    } finally {
      try {
        if (!c && n.return != null && (i = n.return(), Object(i) !== i)) return;
      } finally {
        if (f) throw o;
      }
    }
    return l;
  }
}
function Qo(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function wa(e, t) {
  if (e) {
    if (typeof e == "string") return Qo(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Qo(e, t) : void 0;
  }
}
function Wp() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ya(e, t) {
  return Np(e) || Up(e, t) || wa(e, t) || Wp();
}
var yi = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, zt = {}, Xn = {};
Object.defineProperty(Xn, "__esModule", { value: !0 });
Xn.bind = void 0;
function zp(e, t) {
  var n = t.type, r = t.listener, o = t.options;
  return e.addEventListener(n, r, o), function() {
    e.removeEventListener(n, r, o);
  };
}
Xn.bind = zp;
var Qr = {}, sn = yi && yi.__assign || function() {
  return sn = Object.assign || function(e) {
    for (var t, n = 1, r = arguments.length; n < r; n++) {
      t = arguments[n];
      for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    }
    return e;
  }, sn.apply(this, arguments);
};
Object.defineProperty(Qr, "__esModule", { value: !0 });
Qr.bindAll = void 0;
var qp = Xn;
function bi(e) {
  if (!(typeof e > "u"))
    return typeof e == "boolean" ? {
      capture: e
    } : e;
}
function Gp(e, t) {
  if (t == null)
    return e;
  var n = sn(sn({}, e), { options: sn(sn({}, bi(t)), bi(e.options)) });
  return n;
}
function Yp(e, t, n) {
  var r = t.map(function(o) {
    var s = Gp(o, n);
    return (0, qp.bind)(e, s);
  });
  return function() {
    r.forEach(function(s) {
      return s();
    });
  };
}
Qr.bindAll = Yp;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.bindAll = e.bind = void 0;
  var t = Xn;
  Object.defineProperty(e, "bind", { enumerable: !0, get: function() {
    return t.bind;
  } });
  var n = Qr;
  Object.defineProperty(e, "bindAll", { enumerable: !0, get: function() {
    return n.bindAll;
  } });
})(zt);
var ba = "data-pdnd-honey-pot";
function _a(e) {
  return e instanceof Element && e.hasAttribute(ba);
}
function xa(e) {
  var t = document.elementsFromPoint(e.x, e.y), n = ya(t, 2), r = n[0], o = n[1];
  return r ? _a(r) ? o ?? null : r : null;
}
function Un(e) {
  "@babel/helpers - typeof";
  return Un = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Un(e);
}
function Xp(e, t) {
  if (Un(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (Un(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Jp(e) {
  var t = Xp(e, "string");
  return Un(t) == "symbol" ? t : t + "";
}
function Jn(e, t, n) {
  return (t = Jp(t)) in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var Zp = 2147483647, Qp = {
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
function Yt(e) {
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
var Po = Yt(function() {
  return typeof HTMLElement < "u" && typeof HTMLElement.prototype.showPopover == "function";
});
function _i(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function xi(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? _i(Object(n), !0).forEach(function(r) {
      Jn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : _i(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
var Wn = 2, Si = Wn / 2;
function eg(e) {
  return {
    x: Math.floor(e.x),
    y: Math.floor(e.y)
  };
}
function tg(e) {
  return {
    x: e.x - Si,
    y: e.y - Si
  };
}
function ng(e) {
  return {
    x: Math.max(e.x, 0),
    y: Math.max(e.y, 0)
  };
}
function rg(e) {
  return {
    x: Math.min(e.x, window.innerWidth - Wn),
    y: Math.min(e.y, window.innerHeight - Wn)
  };
}
function Ri(e) {
  var t = e.client, n = rg(ng(tg(eg(t))));
  return DOMRect.fromRect({
    x: n.x,
    y: n.y,
    width: Wn,
    height: Wn
  });
}
function Ci(e) {
  var t = e.clientRect;
  return {
    left: "".concat(t.left, "px"),
    top: "".concat(t.top, "px"),
    width: "".concat(t.width, "px"),
    height: "".concat(t.height, "px")
  };
}
function og(e) {
  var t = e.client, n = e.clientRect;
  return (
    // is within horizontal bounds
    t.x >= n.x && t.x <= n.x + n.width && // is within vertical bounds
    t.y >= n.y && t.y <= n.y + n.height
  );
}
function sg(e) {
  var t = e.initial, n = document.createElement("div");
  n.setAttribute(ba, "true"), Po() && n.setAttribute("popover", "manual");
  var r = Ri({
    client: t
  });
  Object.assign(n.style, xi(xi({
    position: "fixed"
  }, Po() ? (
    // needs to come first as it has 'inset: unset' which
    // needs to be overridden by our top / left values
    Qp
  ) : {
    // Fallback: using maximum possible z-index so that this element
    // will always be on top of other positioned content.
    zIndex: Zp
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
  }, Ci({
    clientRect: r
  }))), document.body.appendChild(n), Po() && n.showPopover();
  var o = zt.bind(window, {
    type: "pointermove",
    listener: function(i) {
      var l = {
        x: i.clientX,
        y: i.clientY
      };
      r = Ri({
        client: l
      }), Object.assign(n.style, Ci({
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
    if (o(), og({
      client: l,
      clientRect: r
    })) {
      n.remove();
      return;
    }
    function c() {
      f(), n.remove();
    }
    var f = zt.bindAll(window, [
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
function ig() {
  var e = null;
  function t() {
    return e = null, zt.bind(window, {
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
        var c = l.location.initial.input, f = e ?? {
          x: c.clientX,
          y: c.clientY
        };
        r = sg({
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
function lg(e) {
  if (Array.isArray(e)) return Qo(e);
}
function ag(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function cg() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Sa(e) {
  return lg(e) || ag(e) || wa(e) || cg();
}
var ug = Yt(function() {
  return navigator.userAgent.includes("Firefox");
}), Ss = Yt(function() {
  var t = navigator, n = t.userAgent;
  return n.includes("AppleWebKit") && !n.includes("Chrome");
});
function fg(e) {
  return "nodeName" in e;
}
function dg(e) {
  return fg(e) && e.ownerDocument !== document;
}
var es = {
  isLeavingWindow: Symbol("leaving"),
  isEnteringWindow: Symbol("entering")
};
(function() {
  if (typeof window > "u" || !Ss())
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
  zt.bindAll(
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
        !n.isOverWindow && n.enterCount === 0 && (s[es.isEnteringWindow] = !0), n.isOverWindow = !0, n.enterCount++;
      }
    }, {
      type: "dragleave",
      listener: function(s) {
        n.enterCount--, n.isOverWindow && n.enterCount === 0 && (s[es.isLeavingWindow] = !0, n.isOverWindow = !1);
      }
    }],
    // using `capture: true` so that adding event listeners
    // in bubble phase will have the correct symbols
    {
      capture: !0
    }
  );
})();
function pg(e) {
  var t = e.dragLeave;
  return Ss() ? t.hasOwnProperty(es.isLeavingWindow) : !1;
}
function gg(e) {
  var t = e.dragLeave, n = t.type, r = t.relatedTarget;
  return n !== "dragleave" ? !1 : Ss() ? pg({
    dragLeave: t
  }) : r == null ? !0 : ug() ? dg(r) : r instanceof HTMLIFrameElement;
}
function hg(e) {
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
function jn(e) {
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
var vg = function(t) {
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
}, ko = vg(function(e) {
  return e();
}), wr = /* @__PURE__ */ function() {
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
function mg(e) {
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
      }), wr.schedule(function() {
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
      wr.flush(), ko.cancel(), s({
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
      ko(function() {
        wr.flush();
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
      wr.flush(), ko.cancel(), s({
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
var ts = {
  isActive: !1
};
function Ra() {
  return !ts.isActive;
}
function wg(e) {
  return e.dataTransfer ? e.dataTransfer.setDragImage.bind(e.dataTransfer) : null;
}
function yg(e) {
  var t = e.current, n = e.next;
  if (t.length !== n.length)
    return !0;
  for (var r = 0; r < t.length; r++)
    if (t[r].element !== n[r].element)
      return !0;
  return !1;
}
function bg(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = e.dispatchEvent;
  if (!Ra())
    return;
  var s = _g({
    event: t,
    dragType: n,
    getDropTargetsOver: r
  });
  ts.isActive = !0;
  var i = {
    current: s
  };
  To({
    event: t,
    current: s.dropTargets
  });
  var l = mg({
    source: n.payload,
    dispatchEvent: o,
    initial: s
  });
  function c(y) {
    var I = yg({
      current: i.current.dropTargets,
      next: y.dropTargets
    });
    i.current = y, I && l.dragUpdate({
      current: i.current
    });
  }
  function f(y) {
    var I = jn(y), C = _a(y.target) ? xa({
      x: I.clientX,
      y: I.clientY
    }) : y.target, k = r({
      target: C,
      input: I,
      source: n.payload,
      current: i.current.dropTargets
    });
    k.length && (y.preventDefault(), To({
      event: y,
      current: k
    })), c({
      dropTargets: k,
      input: I
    });
  }
  function d() {
    i.current.dropTargets.length && c({
      dropTargets: [],
      input: i.current.input
    }), l.drop({
      current: i.current,
      updatedSourcePayload: null
    }), v();
  }
  function v() {
    ts.isActive = !1, b();
  }
  var b = zt.bindAll(
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
        f(I), l.drag({
          current: i.current
        });
      }
    }, {
      type: "dragenter",
      listener: f
    }, {
      type: "dragleave",
      listener: function(I) {
        gg({
          dragLeave: I
        }) && (c({
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
          input: jn(I)
        }, !i.current.dropTargets.length) {
          d();
          return;
        }
        I.preventDefault(), To({
          event: I,
          current: i.current.dropTargets
        }), l.drop({
          current: i.current,
          // When dropping something native, we need to extract the latest
          // `.items` from the "drop" event as it is now accessible
          updatedSourcePayload: n.type === "external" ? n.getDropPayload(I) : null
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
      listener: function(I) {
        i.current = {
          dropTargets: i.current.dropTargets,
          input: jn(I)
        }, d();
      }
    }].concat(Sa(hg({
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
    nativeSetDragImage: wg(t)
  });
}
function To(e) {
  var t, n = e.event, r = e.current, o = (t = r[0]) === null || t === void 0 ? void 0 : t.dropEffect;
  o != null && n.dataTransfer && (n.dataTransfer.dropEffect = o);
}
function _g(e) {
  var t = e.event, n = e.dragType, r = e.getDropTargetsOver, o = jn(t);
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
var Mi = {
  canStart: Ra,
  start: bg
}, ns = /* @__PURE__ */ new Map();
function xg(e) {
  var t = e.typeKey, n = e.mount, r = ns.get(t);
  if (r)
    return r.usageCount++, r;
  var o = {
    typeKey: t,
    unmount: n(),
    usageCount: 1
  };
  return ns.set(t, o), o;
}
function Sg(e) {
  var t = xg(e);
  return function() {
    t.usageCount--, !(t.usageCount > 0) && (t.unmount(), ns.delete(e.typeKey));
  };
}
function Ca(e, t) {
  var n = t.attribute, r = t.value;
  return e.setAttribute(n, r), function() {
    return e.removeAttribute(n);
  };
}
function Ii(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Ct(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ii(Object(n), !0).forEach(function(r) {
      Jn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ii(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Do(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = Rg(e)) || t) {
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
function Rg(e, t) {
  if (e) {
    if (typeof e == "string") return Ei(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Ei(e, t) : void 0;
  }
}
function Ei(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Fo(e) {
  return e.slice(0).reverse();
}
function Cg(e) {
  var t = e.typeKey, n = e.defaultDropEffect, r = /* @__PURE__ */ new WeakMap(), o = "data-drop-target-for-".concat(t), s = "[".concat(o, "]");
  function i(y) {
    return r.set(y.element, y), function() {
      return r.delete(y.element);
    };
  }
  function l(y) {
    var I = Zr(Ca(y.element, {
      attribute: o,
      value: "true"
    }), i(y));
    return Yt(I);
  }
  function c(y) {
    var I, C, k, H, M = y.source, K = y.target, E = y.input, $ = y.result, U = $ === void 0 ? [] : $;
    if (K == null)
      return U;
    if (!(K instanceof Element))
      return K instanceof Node ? c({
        source: M,
        target: K.parentElement,
        input: E,
        result: U
      }) : U;
    var ue = K.closest(s);
    if (ue == null)
      return U;
    var F = r.get(ue);
    if (F == null)
      return U;
    var j = {
      input: E,
      source: M,
      element: F.element
    };
    if (F.canDrop && !F.canDrop(j))
      return c({
        source: M,
        target: F.element.parentElement,
        input: E,
        result: U
      });
    var G = (I = (C = F.getData) === null || C === void 0 ? void 0 : C.call(F, j)) !== null && I !== void 0 ? I : {}, fe = (k = (H = F.getDropEffect) === null || H === void 0 ? void 0 : H.call(F, j)) !== null && k !== void 0 ? k : n, le = {
      data: G,
      element: F.element,
      dropEffect: fe,
      // we are collecting _actual_ drop targets, so these are
      // being applied _not_ due to stickiness
      isActiveDueToStickiness: !1
    };
    return c({
      source: M,
      target: F.element.parentElement,
      input: E,
      // Using bubble ordering. Same ordering as `event.getPath()`
      result: [].concat(Sa(U), [le])
    });
  }
  function f(y) {
    var I = y.eventName, C = y.payload, k = Do(C.location.current.dropTargets), H;
    try {
      for (k.s(); !(H = k.n()).done; ) {
        var M, K = H.value, E = r.get(K.element), $ = Ct(Ct({}, C), {}, {
          self: K
        });
        E == null || (M = E[I]) === null || M === void 0 || M.call(
          E,
          // I cannot seem to get the types right here.
          // TS doesn't seem to like that one event can need `nativeSetDragImage`
          // @ts-expect-error
          $
        );
      }
    } catch (U) {
      k.e(U);
    } finally {
      k.f();
    }
  }
  var d = {
    onGenerateDragPreview: f,
    onDrag: f,
    onDragStart: f,
    onDrop: f,
    onDropTargetChange: function(I) {
      var C = I.payload, k = new Set(C.location.current.dropTargets.map(function(J) {
        return J.element;
      })), H = /* @__PURE__ */ new Set(), M = Do(C.location.previous.dropTargets), K;
      try {
        for (M.s(); !(K = M.n()).done; ) {
          var E, $ = K.value;
          H.add($.element);
          var U = r.get($.element), ue = k.has($.element), F = Ct(Ct({}, C), {}, {
            self: $
          });
          if (U == null || (E = U.onDropTargetChange) === null || E === void 0 || E.call(U, F), !ue) {
            var j;
            U == null || (j = U.onDragLeave) === null || j === void 0 || j.call(U, F);
          }
        }
      } catch (J) {
        M.e(J);
      } finally {
        M.f();
      }
      var G = Do(C.location.current.dropTargets), fe;
      try {
        for (G.s(); !(fe = G.n()).done; ) {
          var le, ve, De = fe.value;
          if (!H.has(De.element)) {
            var Ee = Ct(Ct({}, C), {}, {
              self: De
            }), re = r.get(De.element);
            re == null || (le = re.onDropTargetChange) === null || le === void 0 || le.call(re, Ee), re == null || (ve = re.onDragEnter) === null || ve === void 0 || ve.call(re, Ee);
          }
        }
      } catch (J) {
        G.e(J);
      } finally {
        G.f();
      }
    }
  };
  function v(y) {
    d[y.eventName](y);
  }
  function b(y) {
    var I = y.source, C = y.target, k = y.input, H = y.current, M = c({
      source: I,
      target: C,
      input: k
    });
    if (M.length >= H.length)
      return M;
    for (var K = Fo(H), E = Fo(M), $ = [], U = 0; U < K.length; U++) {
      var ue, F = K[U], j = E[U];
      if (j != null) {
        $.push(j);
        continue;
      }
      var G = $[U - 1], fe = K[U - 1];
      if ((G == null ? void 0 : G.element) !== (fe == null ? void 0 : fe.element))
        break;
      var le = r.get(F.element);
      if (!le)
        break;
      var ve = {
        input: k,
        source: I,
        element: le.element
      };
      if (le.canDrop && !le.canDrop(ve) || !((ue = le.getIsSticky) !== null && ue !== void 0 && ue.call(le, ve)))
        break;
      $.push(Ct(Ct({}, F), {}, {
        // making it clear to consumers this drop target is active due to stickiness
        isActiveDueToStickiness: !0
      }));
    }
    return Fo($);
  }
  return {
    dropTargetForConsumers: l,
    getIsOver: b,
    dispatchEvent: v
  };
}
function Mg(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = Ig(e)) || t) {
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
function Ig(e, t) {
  if (e) {
    if (typeof e == "string") return Ai(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Ai(e, t) : void 0;
  }
}
function Ai(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Oi(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Eg(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Oi(Object(n), !0).forEach(function(r) {
      Jn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Oi(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Ag() {
  var e = /* @__PURE__ */ new Set(), t = null;
  function n(s) {
    t && (!s.canMonitor || s.canMonitor(t.canMonitorArgs)) && t.active.add(s);
  }
  function r(s) {
    var i = Eg({}, s);
    e.add(i), n(i);
    function l() {
      e.delete(i), t && t.active.delete(i);
    }
    return Yt(l);
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
      var c = Mg(e), f;
      try {
        for (c.s(); !(f = c.n()).done; ) {
          var d = f.value;
          n(d);
        }
      } catch (k) {
        c.e(k);
      } finally {
        c.f();
      }
    }
    if (t) {
      for (var v = Array.from(t.active), b = 0, y = v; b < y.length; b++) {
        var I = y[b];
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
function Og(e) {
  var t = e.typeKey, n = e.mount, r = e.dispatchEventToSource, o = e.onPostDispatch, s = e.defaultDropEffect, i = Ag(), l = Cg({
    typeKey: t,
    defaultDropEffect: s
  });
  function c(v) {
    r == null || r(v), l.dispatchEvent(v), i.dispatchEvent(v), o == null || o(v);
  }
  function f(v) {
    var b = v.event, y = v.dragType;
    Mi.start({
      event: b,
      dragType: y,
      getDropTargetsOver: l.getIsOver,
      dispatchEvent: c
    });
  }
  function d() {
    function v() {
      var b = {
        canStart: Mi.canStart,
        start: f
      };
      return n(b);
    }
    return Sg({
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
var Pg = Yt(function() {
  return navigator.userAgent.toLocaleLowerCase().includes("android");
}), kg = "pdnd:android-fallback", Pi = "text/plain", Tg = "text/uri-list", Dg = "application/vnd.pdnd", Tr = /* @__PURE__ */ new WeakMap();
function Fg(e) {
  return Tr.set(e.element, e), function() {
    Tr.delete(e.element);
  };
}
var ki = ig(), Ma = Og({
  typeKey: "element",
  defaultDropEffect: "move",
  mount: function(t) {
    return Zr(ki.bindEvents(), zt.bind(document, {
      type: "dragstart",
      listener: function(r) {
        var o, s, i, l, c, f;
        if (t.canStart(r) && !r.defaultPrevented && r.dataTransfer) {
          var d = r.target;
          if (d instanceof HTMLElement) {
            var v = Tr.get(d);
            if (v) {
              var b = jn(r), y = {
                element: v.element,
                dragHandle: (o = v.dragHandle) !== null && o !== void 0 ? o : null,
                input: b
              };
              if (v.canDrag && !v.canDrag(y)) {
                r.preventDefault();
                return;
              }
              if (v.dragHandle) {
                var I = xa({
                  x: b.clientX,
                  y: b.clientY
                });
                if (!v.dragHandle.contains(I)) {
                  r.preventDefault();
                  return;
                }
              }
              var C = (s = (i = v.getInitialDataForExternal) === null || i === void 0 ? void 0 : i.call(v, y)) !== null && s !== void 0 ? s : null;
              if (C)
                for (var k = 0, H = Object.entries(C); k < H.length; k++) {
                  var M = ya(H[k], 2), K = M[0], E = M[1];
                  r.dataTransfer.setData(K, E ?? "");
                }
              Pg() && !r.dataTransfer.types.includes(Pi) && !r.dataTransfer.types.includes(Tg) && r.dataTransfer.setData(Pi, kg), r.dataTransfer.setData(Dg, "");
              var $ = {
                element: v.element,
                dragHandle: (l = v.dragHandle) !== null && l !== void 0 ? l : null,
                data: (c = (f = v.getInitialData) === null || f === void 0 ? void 0 : f.call(v, y)) !== null && c !== void 0 ? c : {}
              }, U = {
                type: "element",
                payload: $,
                startedFrom: "internal"
              };
              t.start({
                event: r,
                dragType: U
              });
            }
          }
        }
      }
    }));
  },
  dispatchEventToSource: function(t) {
    var n, r, o = t.eventName, s = t.payload;
    (n = Tr.get(s.source.element)) === null || n === void 0 || (r = n[o]) === null || r === void 0 || r.call(
      n,
      // I cannot seem to get the types right here.
      // TS doesn't seem to like that one event can need `nativeSetDragImage`
      // @ts-expect-error
      s
    );
  },
  onPostDispatch: ki.getOnPostDispatch()
}), Hg = Ma.dropTarget;
function jg(e) {
  var t = Zr(
    // making the draggable register the adapter rather than drop targets
    // this is because you *must* have a draggable element to start a drag
    // but you _might_ not have any drop targets immediately
    // (You might create drop targets async)
    Ma.registerUsage(),
    Fg(e),
    Ca(e.element, {
      attribute: "draggable",
      value: "true"
    })
  );
  return Yt(t);
}
function Lg(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
    if (t.indexOf(r) !== -1) continue;
    n[r] = e[r];
  }
  return n;
}
function Kg(e, t) {
  if (e == null) return {};
  var n, r, o = Lg(e, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    for (r = 0; r < s.length; r++) n = s[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (o[n] = e[n]);
  }
  return o;
}
function Ia(e, t) {
  var n = Object.keys(e), r = Object.keys(t);
  return n.length !== r.length ? !1 : n.every(function(o) {
    return Object.is(e[o], t[o]);
  });
}
function Vg() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Ia, t = null;
  return function(n) {
    return t && e(t.value, n) || (t = {
      value: n
    }), t.value;
  };
}
var Bg = ["block"];
function Ti(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Di(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ti(Object(n), !0).forEach(function(r) {
      Jn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ti(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function $g(e) {
  return {
    x: (e.right + e.left) / 2,
    y: (e.bottom + e.top) / 2
  };
}
function Ho(e) {
  var t = e.client, n = e.borderBox, r = n.height / 4;
  return t.y <= n.top + r ? "reorder-above" : t.y >= n.bottom - r ? "reorder-below" : "make-child";
}
function Ng(e) {
  var t = e.element, n = e.input, r = e.currentLevel, o = e.indentPerLevel, s = e.mode, i = {
    x: n.clientX,
    y: n.clientY
  }, l = t.getBoundingClientRect();
  if (s === "standard") {
    var c = Ho({
      borderBox: l,
      client: i
    });
    return {
      type: c,
      indentPerLevel: o,
      currentLevel: r
    };
  }
  var f = $g(l);
  if (s === "expanded") {
    var d = Ho({
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
    type: Ho({
      borderBox: l,
      client: i
    }),
    indentPerLevel: o,
    currentLevel: r
  };
}
function Ea(e, t) {
  return e.type !== t.type ? !1 : e.type === "instruction-blocked" && t.type === "instruction-blocked" ? Ea(e.desired, t.desired) : Ia(e, t);
}
var Ug = Vg(Ea);
function Wg(e) {
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
function zg(e, t) {
  var n = t.block, r = Kg(t, Bg), o = Ng(r), s = Wg({
    desired: o,
    block: n
  }), i = Ug(s);
  return Di(Di({}, e), {}, Jn({}, Aa, i));
}
function Fi(e) {
  var t;
  return (t = e[Aa]) !== null && t !== void 0 ? t : null;
}
var Aa = Symbol("tree-item-instruction");
const qg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ef5350" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m6 10h-4v8a4 4 0 1 1-4-4 3.96 3.96 0 0 1 2 .555V8h6Z"/></svg>', Gg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#ff7043" d="M2 2a1 1 0 0 0-1 1v10c0 .554.446 1 1 1h12c.554 0 1-.446 1-1V3a1 1 0 0 0-1-1zm0 3h12v8H2zm1 2 2 2-2 2 1 1 3-3-3-3zm5 3.5V12h5v-1.5z"/></svg>', Yg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#7e57c2" d="M20 18h-2v-2h-2v2c0 .193 0 .703 1.254 1.033A3.345 3.345 0 0 1 20 22h2v2h2v-2c0-.388-.562-.851-1.254-1.034C20.356 20.34 20 18.84 20 18m-3.254 2.966C14.356 20.34 14 18.84 14 18h-2v-2h-2v8h2v-2h4v2h2v-2c0-.388-.562-.851-1.254-1.034"/><path fill="#7e57c2" d="M24 4H4v20a4 4 0 0 0 4 4h16.16A3.84 3.84 0 0 0 28 24.16V8a4 4 0 0 0-4-4m2 14h-2v-2h-2v2c0 .193 0 .703 1.254 1.033A3.345 3.345 0 0 1 26 22v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1 2-2h2a2 2 0 0 1 2 2Z"/></svg>', Xg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ffca28" d="M16 24c-5.525 0-10-.9-10-2v4c0 1.1 4.475 2 10 2s10-.9 10-2v-4c0 1.1-4.475 2-10 2m0-8c-5.525 0-10-.9-10-2v4c0 1.1 4.475 2 10 2s10-.9 10-2v-4c0 1.1-4.475 2-10 2m0-12C10.477 4 6 4.895 6 6v4c0 1.1 4.475 2 10 2s10-.9 10-2V6c0-1.105-4.477-2-10-2"/></svg>', Jg = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/><path fill="#42a5f5" d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5z"/></svg>', Zg = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m8.668 6h3.6641l-3.6641-3.668v3.668m-4.668-4.668h5.332l4 4v8c0 0.73828-0.59375 1.3359-1.332 1.3359h-8c-0.73828 0-1.332-0.59766-1.332-1.3359v-10.664c0-0.74219 0.59375-1.3359 1.332-1.3359m3.332 1.3359h-3.332v10.664h8v-6h-4.668z" fill="#90a4ae" /></svg>', Qg = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m6.922 3.768-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232" fill="#90a4ae" /></svg>', eh = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.483 6H4.721a1 1 0 0 0-.949.684L2 12V5h12a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232l-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h11l2.403-5.606A1 1 0 0 0 14.483 6" fill="#90a4ae" /></svg>', th = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#e65100" d="m4 4 2 22 10 2 10-2 2-22Zm19.72 7H11.28l.29 3h11.86l-.802 9.335L15.99 25l-6.635-1.646L8.93 19h3.02l.19 2 3.86.77 3.84-.77.29-4H8.84L8 8h16Z"/></svg>', nh = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#26a69a" d="M8.5 6h4l-4-4zM3.875 1H9.5l4 4v8.6c0 .773-.616 1.4-1.375 1.4h-8.25c-.76 0-1.375-.627-1.375-1.4V2.4c0-.777.612-1.4 1.375-1.4M4 13.6h8V8l-2.625 2.8L8 9.4zm1.25-7.7c-.76 0-1.375.627-1.375 1.4s.616 1.4 1.375 1.4c.76 0 1.375-.627 1.375-1.4S6.009 5.9 5.25 5.9"/></svg>', rh = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#ffca28" d="M2 2v12h12V2zm6 6h1v4a1.003 1.003 0 0 1-1 1H7a1.003 1.003 0 0 1-1-1v-1h1v1h1zm3 0h2v1h-2v1h1a1.003 1.003 0 0 1 1 1v1a1.003 1.003 0 0 1-1 1h-2v-1h2v-1h-1a1.003 1.003 0 0 1-1-1V9a1.003 1.003 0 0 1 1-1"/></svg>', oh = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path fill="#f9a825" d="M560-160v-80h120q17 0 28.5-11.5T720-280v-80q0-38 22-69t58-44v-14q-36-13-58-44t-22-69v-80q0-17-11.5-28.5T680-720H560v-80h120q50 0 85 35t35 85v80q0 17 11.5 28.5T840-560h40v160h-40q-17 0-28.5 11.5T800-360v80q0 50-35 85t-85 35zm-280 0q-50 0-85-35t-35-85v-80q0-17-11.5-28.5T120-400H80v-160h40q17 0 28.5-11.5T160-600v-80q0-50 35-85t85-35h120v80H280q-17 0-28.5 11.5T240-680v80q0 38-22 69t-58 44v14q36 13 58 44t22 69v80q0 17 11.5 28.5T280-240h120v80z"/></svg>', sh = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#42a5f5" d="m14 10-4 3.5L6 10H4v12h4v-6l2 2 2-2v6h4V10zm12 6v-6h-4v6h-4l6 8 6-8z"/></svg>', ih = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ef5350" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m4.93 10.44c.41.9.93 1.64 1.53 2.15l.41.32c-.87.16-2.07.44-3.34.93l-.11.04.5-1.04c.45-.87.78-1.66 1.01-2.4m6.48 3.81c.18-.18.27-.41.28-.66.03-.2-.02-.39-.12-.55-.29-.47-1.04-.69-2.28-.69l-1.29.07-.87-.58c-.63-.52-1.2-1.43-1.6-2.56l.04-.14c.33-1.33.64-2.94-.02-3.6a.85.85 0 0 0-.61-.24h-.24c-.37 0-.7.39-.79.77-.37 1.33-.15 2.06.22 3.27v.01c-.25.88-.57 1.9-1.08 2.93l-.96 1.8-.89.49c-1.2.75-1.77 1.59-1.88 2.12-.04.19-.02.36.05.54l.03.05.48.31.44.11c.81 0 1.73-.95 2.97-3.07l.18-.07c1.03-.33 2.31-.56 4.03-.75 1.03.51 2.24.74 3 .74.44 0 .74-.11.91-.3m-.41-.71.09.11c-.01.1-.04.11-.09.13h-.04l-.19.02c-.46 0-1.17-.19-1.9-.51.09-.1.13-.1.23-.1 1.4 0 1.8.25 1.9.35M7.83 17c-.65 1.19-1.24 1.85-1.69 2 .05-.38.5-1.04 1.21-1.69zm3.02-6.91c-.23-.9-.24-1.63-.07-2.05l.07-.12.15.05c.17.24.19.56.09 1.1l-.03.16-.16.82z"/></svg>', lh = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#e64a19" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zM8 11v2h1v6H8v1h4v-1h-1v-2h2a3 3 0 0 0 3-3 3 3 0 0 0-3-3zm5 2a1 1 0 0 1 1 1 1 1 0 0 1-1 1h-2v-2z"/></svg>', ah = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#0288d1" d="M9.86 2A2.86 2.86 0 0 0 7 4.86v1.68h4.29c.39 0 .71.57.71.96H4.86A2.86 2.86 0 0 0 2 10.36v3.781a2.86 2.86 0 0 0 2.86 2.86h1.18v-2.68a2.85 2.85 0 0 1 2.85-2.86h5.25c1.58 0 2.86-1.271 2.86-2.851V4.86A2.86 2.86 0 0 0 14.14 2zm-.72 1.61c.4 0 .72.12.72.71s-.32.891-.72.891c-.39 0-.71-.3-.71-.89s.32-.711.71-.711"/><path fill="#fdd835" d="M17.959 7v2.68a2.85 2.85 0 0 1-2.85 2.859H9.86A2.85 2.85 0 0 0 7 15.389v3.75a2.86 2.86 0 0 0 2.86 2.86h4.28A2.86 2.86 0 0 0 17 19.14v-1.68h-4.291c-.39 0-.709-.57-.709-.96h7.14A2.86 2.86 0 0 0 22 13.64V9.86A2.86 2.86 0 0 0 19.14 7zM8.32 11.513l-.004.004.038-.004zm6.54 7.276c.39 0 .71.3.71.89a.71.71 0 0 1-.71.71c-.4 0-.72-.12-.72-.71s.32-.89.72-.89"/></svg>', ch = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#8bc34a" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zm4 7.5h-4v2h1l-2 1.67L10 13h1v-2H7v2h1l3 2.5L8 18H7v2h4v-2h-1l2-1.67L14 18h-1v2h4v-2h-1l-3-2.5 3-2.5h1z"/></svg>', uh = '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 16 16"><path fill="#0288d1" d="M2 2v12h12V2zm4 6h3v1H8v4H7V9H6zm5 0h2v1h-2v1h1a1.003 1.003 0 0 1 1 1v1a1.003 1.003 0 0 1-1 1h-2v-1h2v-1h-1a1.003 1.003 0 0 1-1-1V9a1.003 1.003 0 0 1 1-1"/></svg>', fh = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ff9800" d="m24 6 2 6h-4l-2-6h-3l2 6h-4l-2-6h-3l2 6H8L6 6H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3V6Z"/></svg>', dh = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#01579b" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m7 1.5V9h5.5zM7 13l1.5 7h2l1.5-3 1.5 3h2l1.5-7h1v-2h-4v2h1l-.9 4.2L13 15h-2l-1.1 2.2L9 13h1v-2H6v2z"/></svg>', ph = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#8bc34a" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m.12 13.5 3.74 3.74 1.42-1.41-2.33-2.33 2.33-2.33-1.42-1.41zm11.16 0-3.74-3.74-1.42 1.41 2.33 2.33-2.33 2.33 1.42 1.41z"/></svg>', gh = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ff5252" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2m12 16v-2H9v2zm-4-4v-2H6v2z"/></svg>', hh = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#afb42b" d="M14 17h-2v-2h-2v-2h2v2h2m0-6h-2v2h2v2h-2v-2h-2V9h2V7h-2V5h2v2h2m5-4H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2"/></svg>', vh = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, mh = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, wh = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, yh = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, bh = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, _h = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, xh = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Sh = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Rh = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Ch = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Mh = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Ih = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Eh = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Ah = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Oh = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Ph = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, kh = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Th = `<!-- @license lucide-static v1.38.0 - ISC -->
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
`, Dh = ["aria-label"], Fh = {
  key: 0,
  class: "pnl-tst-tsep",
  "aria-hidden": "true"
}, Hh = {
  key: 1,
  class: "pnl-tst-search"
}, jh = ["innerHTML"], Lh = ["value", "aria-label", "placeholder"], Kh = ["aria-label", "aria-keyshortcuts", "aria-disabled", "title", "tabindex", "onClick", "onFocus"], Vh = ["innerHTML"], Bh = {
  key: 1,
  class: "pnl-tst-empty"
}, $h = ["aria-label", "aria-colcount", "aria-rowcount"], Nh = {
  key: 0,
  class: "pnl-tst-head",
  role: "rowgroup"
}, Uh = {
  class: "pnl-tst-hrow",
  role: "row",
  "aria-rowindex": 1
}, Wh = ["aria-colindex"], zh = {
  class: "pnl-tst-body",
  role: "rowgroup"
}, qh = ["aria-level", "aria-posinset", "aria-setsize", "aria-rowindex", "aria-expanded", "aria-selected", "aria-haspopup", "tabindex", "onClick", "onContextmenu", "onFocus"], Gh = ["aria-colindex"], Yh = ["onClick"], Xh = {
  key: 1,
  class: "pnl-tst-twisty pnl-tst-twisty--leaf",
  "aria-hidden": "true"
}, Jh = ["checked", ".indeterminate", "aria-label", "onClick"], Zh = ["innerHTML"], Qh = ["value", "aria-label", "onKeydown", "onBlur"], ev = {
  key: 2,
  class: "pnl-tst-value"
}, tv = {
  key: 3,
  class: "pnl-tst-modal"
}, nv = {
  id: "pnl-tst-confirm-message",
  class: "pnl-tst-dialog-message"
}, rv = { class: "pnl-tst-dialog-actions" }, ov = ["aria-label"], sv = {
  key: 0,
  class: "pnl-tst-msep",
  role: "separator"
}, iv = ["aria-keyshortcuts", "aria-disabled", "tabindex", "onClick", "onFocus"], lv = ["innerHTML"], av = { class: "pnl-tst-mlabel" }, cv = {
  key: 0,
  class: "pnl-tst-mkeys",
  "aria-hidden": "true"
}, uv = "title", In = "search", Mt = "|", rn = 4, En = "pnl-tst-row", fv = 500, dv = {
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
      rowExpandingFeature: Rp,
      rowSelectionFeature: jp,
      coreRowModel: ia(),
      expandedRowModel: Lp()
    }, r = z(() => (t.state.columns || []).length > 0), o = z(() => {
      const a = t.state.columns || [];
      return a.length === 0 ? [{ id: uv, header: "", accessorFn: (u) => u.title }] : a.map((u) => {
        const g = u.field ?? u.id;
        return {
          id: u.id,
          header: u.header ?? u.id,
          accessorFn: (m) => m[g],
          meta: { width: u.width }
        };
      });
    }), s = /* @__PURE__ */ pe(i(t.state.expandedKeys));
    function i(a) {
      const u = {};
      for (const g of a || []) u[g] = !0;
      return u;
    }
    function l(a) {
      return a === !0 ? H.getCoreRowModel().flatRows.filter((u) => u.subRows.length > 0).map((u) => u.id).sort() : Object.keys(a).filter((u) => a[u]).sort();
    }
    const c = {
      audio: qg,
      console: Gg,
      css: Yg,
      database: Xg,
      document: Jg,
      file: Zg,
      folder: Qg,
      "folder-open": eh,
      html: th,
      image: nh,
      javascript: rh,
      json: oh,
      markdown: sh,
      pdf: ih,
      powerpoint: lh,
      python: ah,
      table: ch,
      typescript: uh,
      video: fh,
      word: dh,
      xml: ph,
      yaml: gh,
      zip: hh
    };
    function f(a) {
      return a ? { ...c, ...t.state.icons || {} }[a] ?? null : null;
    }
    function d(a) {
      const u = a.original.icon;
      return u ? (Xe(a) ? f(`${u}-open`) : null) ?? f(u) : null;
    }
    function v(a, u) {
      return a.length !== u.length ? !1 : a.every((g, m) => g === u[m]);
    }
    const b = z(() => t.state.options.select_mode ?? "none"), y = z(() => b.value !== "none"), I = z(() => b.value === "hierarchy"), C = z(
      () => y.value && t.state.options.show_checkboxes !== !1
    ), k = /* @__PURE__ */ pe(i(t.state.selectedKeys)), H = $p({
      features: n,
      data: z(() => t.state.source || []),
      columns: o,
      getRowId: (a) => a.key,
      getSubRows: (a) => a.children,
      // TanStack resets `expanded` whenever `data` changes. Python rewrites the
      // whole tree after every move, so leaving that on would collapse the tree on
      // each drop and push an empty `expanded_keys` back. Expansion is owned here.
      autoResetExpanded: !1,
      enableRowSelection: y,
      enableMultiRowSelection: z(() => b.value !== "single"),
      enableSubRowSelection: I,
      state: z(() => ({ expanded: s.value, rowSelection: k.value })),
      onExpandedChange: (a) => {
        s.value = typeof a == "function" ? a(s.value) : a;
      },
      onRowSelectionChange: (a) => {
        k.value = typeof a == "function" ? a(k.value) : a;
      }
    });
    function M(a) {
      if (a.getIsSelected()) return "all";
      if (!I.value || a.subRows.length === 0) return "none";
      const u = a.subRows.map(M);
      return u.every((g) => g === "all") ? "all" : u.some((g) => g !== "none") ? "some" : "none";
    }
    be(() => l(k.value), t.setSelectedKeys, { flush: "post" }), be(() => l(s.value), t.setExpandedKeys, { flush: "post" }), be(
      () => t.state.expandedKeys,
      (a) => {
        v(l(s.value), [...a || []].sort()) || (s.value = i(a));
      }
    ), be(
      () => t.state.selectedKeys,
      (a) => {
        v(l(k.value), [...a || []].sort()) || (k.value = i(a));
      }
    ), be(
      () => [t.state.options.expand_all, t.state.source],
      ([a]) => {
        a && H.toggleAllRowsExpanded(!0);
      },
      { immediate: !0 }
    );
    const K = z(() => (t.state.filterText ?? "").trim().toLowerCase()), E = z(() => K.value.length > 0), $ = /* @__PURE__ */ pe(t.state.filterText ?? "");
    be(
      () => t.state.filterText,
      (a) => {
        $.value = a ?? "";
      }
    );
    function U(a) {
      $.value = a, t.setFilterText(a);
    }
    function ue(a) {
      return a.getAllCells().some((u) => String(u.getValue() ?? "").toLowerCase().includes(K.value));
    }
    const F = z(() => {
      if (!E.value) return H.getRowModel().rows;
      const a = /* @__PURE__ */ new Set();
      for (const u of H.getCoreRowModel().flatRows)
        if (ue(u)) {
          a.add(u.id);
          for (let g = u.getParentRow(); g; g = g.getParentRow()) a.add(g.id);
        }
      return H.getCoreRowModel().flatRows.filter((u) => a.has(u.id));
    }), j = z(() => {
      var a;
      return ((a = H.getHeaderGroups()[0]) == null ? void 0 : a.headers) ?? [];
    }), G = z(() => t.state.options.indent_px ?? 16), fe = z(() => t.state.options.aria_label ?? "Tree table"), le = z(() => E.value ? "No matches" : "No data"), ve = z(() => r.value ? 2 : 1), De = z(() => F.value.length + (r.value ? 1 : 0)), Ee = z(() => {
      const a = /* @__PURE__ */ new Map();
      for (const u of F.value) {
        const g = u.parentId ?? "", m = a.get(g) ?? [];
        m.push(u.id), a.set(g, m);
      }
      return a;
    });
    function re(a) {
      return Ee.value.get(a.parentId ?? "") ?? [];
    }
    function J(a) {
      return re(a).indexOf(a.id) + 1;
    }
    function oe(a) {
      return re(a).length;
    }
    function Le(a) {
      return E.value ? (Ee.value.get(a.id) ?? []).length > 0 : a.getCanExpand();
    }
    function Xe(a) {
      return E.value ? Le(a) : a.getIsExpanded();
    }
    function Ue(a) {
      var g;
      const u = (g = a.meta) == null ? void 0 : g.width;
      return u ? { flex: `0 0 ${u}px` } : { flex: "1 1 0" };
    }
    function $e(a, u) {
      return { ...Ue(u), paddingInlineStart: `${a.depth * G.value}px` };
    }
    const lt = /* @__PURE__ */ pe(null), _t = /* @__PURE__ */ pe(!0), xt = /* @__PURE__ */ new Map();
    function Ke(a) {
      lt.value = a, _t.value = !0;
    }
    function Xt(a, u) {
      u ? xt.set(a, u) : xt.delete(a);
    }
    const St = z(() => {
      const a = F.value;
      return a.length === 0 ? null : a.some((u) => u.id === lt.value) ? lt.value : a[0].id;
    });
    function Ae(a) {
      a != null && (Ke(a), We(() => {
        var u;
        return (u = xt.get(a)) == null ? void 0 : u.focus();
      }));
    }
    function Je(a) {
      const u = F.value;
      u.length !== 0 && Ae(u[Math.max(0, Math.min(a, u.length - 1))].id);
    }
    function eo(a, u) {
      const g = F.value;
      if (g.length === 0) return;
      const m = g[Math.max(0, Math.min(a, g.length - 1))], D = (u == null ? void 0 : u.shiftKey) && y.value && b.value !== "single";
      D && h.value === null && (h.value = St.value), Ae(m.id), D && R(m, !1);
    }
    function p(a) {
      const u = F.value;
      if (u.length === 0) return;
      const g = Math.max(
        0,
        u.findIndex((q) => q.id === St.value)
      ), m = u[g];
      if (a.ctrlKey || a.metaKey) {
        const q = {
          a: "select-all",
          c: "copy",
          f: In,
          v: "paste",
          x: "cut",
          z: a.shiftKey ? "redo" : "undo"
        }[a.key.toLowerCase()];
        if (q && Tt(q)) {
          a.preventDefault(), Jt(q);
          return;
        }
      }
      if (a.altKey) {
        const q = {
          ArrowUp: "move-up",
          ArrowDown: "move-down",
          ArrowLeft: "outdent",
          ArrowRight: "indent"
        }[a.key];
        if (q && Tt(q)) {
          a.preventDefault(), Jt(q);
          return;
        }
      }
      if (ar.value && (a.key === "ContextMenu" || a.key === "F10" && a.shiftKey)) {
        a.preventDefault(), Xa(m);
        return;
      }
      const D = {
        Insert: a.shiftKey ? "new-file" : "new-folder",
        F2: "rename",
        Delete: "delete",
        Escape: "clear-selection"
      }[a.key];
      if (D && Tt(D)) {
        a.preventDefault(), Jt(D);
        return;
      }
      switch (a.key) {
        case "ArrowDown":
          a.preventDefault(), eo(g + 1, a);
          break;
        case "ArrowUp":
          a.preventDefault(), eo(g - 1, a);
          break;
        case "ArrowRight":
          if (a.preventDefault(), !Le(m)) break;
          Xe(m) ? Je(g + 1) : (m.toggleExpanded(!0), Ae(m.id));
          break;
        case "ArrowLeft":
          a.preventDefault(), !E.value && m.getCanExpand() && m.getIsExpanded() ? (m.toggleExpanded(!1), Ae(m.id)) : m.parentId && Ae(m.parentId);
          break;
        case "Home":
          a.preventDefault(), Je(0);
          break;
        case "End":
          a.preventDefault(), Je(u.length - 1);
          break;
        case "Enter":
          a.preventDefault(), t.emitEvent("activate", { key: m.id });
          break;
        case " ":
          if (!y.value) break;
          a.preventDefault(), B(m);
          break;
      }
    }
    const h = /* @__PURE__ */ pe(null);
    function w(a) {
      h.value = a.id, k.value = {}, a.toggleSelected(!0, { selectChildren: !1 });
    }
    function R(a, u) {
      const g = F.value, m = g.findIndex((Re) => Re.id === h.value), D = g.findIndex((Re) => Re.id === a.id);
      if (D === -1) return;
      if (m === -1) {
        w(a);
        return;
      }
      u || (k.value = {});
      const [q, me] = m <= D ? [m, D] : [D, m];
      for (let Re = q; Re <= me; Re += 1)
        g[Re].toggleSelected(!0, { selectChildren: !1 });
    }
    const S = z(() => t.state.options.toggle_on_click === !0);
    function _(a) {
      const u = l(k.value);
      return u.length === 1 && u[0] === a.id;
    }
    function P() {
      k.value = {}, h.value = null, _t.value = !1;
    }
    function O() {
      l(k.value).length === 0 && (_t.value = !1);
    }
    be(
      () => l(k.value).length > 0,
      (a) => {
        a && (_t.value = !0);
      }
    );
    function A(a, u) {
      Ke(a.id);
      const g = !!(u != null && u.shiftKey || u != null && u.ctrlKey || u != null && u.metaKey);
      y.value && !g && S.value && _(a) ? P() : y.value && b.value !== "single" ? u != null && u.shiftKey ? R(a, u.ctrlKey || u.metaKey) : u != null && u.ctrlKey || u != null && u.metaKey ? (h.value = a.id, L(a)) : w(a) : y.value && w(a), t.emitEvent("activate", { key: a.id }), g || uo(a, (u == null ? void 0 : u.clientX) ?? 0, (u == null ? void 0 : u.clientY) ?? 0);
    }
    function x(a) {
      Ke(a.id), !E.value && a.toggleExpanded();
    }
    function V(a) {
      return M(a) === "all";
    }
    function T(a) {
      return M(a) === "some";
    }
    function L(a) {
      Ke(a.id), a.toggleSelected(void 0, { selectChildren: !1 }), O();
    }
    function B(a) {
      Ke(a.id), a.toggleSelected(!V(a), {
        selectChildren: I.value,
        deselectParents: I.value
      }), O();
    }
    function Y(a) {
      B(a), Ae(a.id);
    }
    const Z = {
      "new-folder": { icon: Sh, label: "New folder", keys: "Insert", node: {} },
      "new-file": {
        icon: xh,
        label: "New file",
        keys: "Shift+Insert",
        node: { allow_children: !1 }
      },
      rename: { icon: Mh, label: "Rename", keys: "F2" },
      delete: { icon: kh, label: "Delete", keys: "Delete" },
      undo: { icon: Th, label: "Undo", keys: "Control+Z" },
      redo: { icon: Ih, label: "Redo", keys: "Control+Shift+Z" },
      cut: { icon: Eh, label: "Cut", keys: "Control+X" },
      copy: { icon: _h, label: "Copy", keys: "Control+C" },
      paste: { icon: bh, label: "Paste", keys: "Control+V" },
      "move-up": { icon: mh, label: "Move up", keys: "Alt+ArrowUp" },
      "move-down": { icon: vh, label: "Move down", keys: "Alt+ArrowDown" },
      outdent: { icon: Rh, label: "Outdent", keys: "Alt+ArrowLeft" },
      indent: { icon: Ch, label: "Indent", keys: "Alt+ArrowRight" },
      "expand-all": { icon: wh, label: "Expand all" },
      "collapse-all": { icon: yh, label: "Collapse all" },
      "select-all": { icon: Ph, label: "Select all", keys: "Control+A" },
      "clear-selection": { icon: Oh, label: "Clear selection", keys: "Escape" }
    }, ee = [
      "undo",
      "redo",
      Mt,
      "new-folder",
      "new-file",
      "rename",
      "delete",
      Mt,
      "cut",
      "copy",
      "paste",
      Mt,
      "move-up",
      "move-down",
      "outdent",
      "indent",
      Mt,
      "expand-all",
      "collapse-all",
      Mt,
      "select-all",
      "clear-selection",
      In
    ], de = [
      "new-folder",
      "new-file",
      Mt,
      "rename",
      "delete",
      Mt,
      "cut",
      "copy",
      "paste"
    ];
    function he(a, u) {
      const g = a === !0 ? u : Array.isArray(a) ? a : [], m = [];
      return g.forEach((D, q) => {
        const me = typeof D == "string" ? {} : D || {}, Re = typeof D == "string" ? D : me.id, Hs = `${Re}#${q}`;
        if (Re === Mt || Re === In) {
          m.push({ uid: Hs, id: Re });
          return;
        }
        const Sn = Z[Re];
        if (!Sn) return;
        const js = me.label ?? Sn.label;
        m.push({
          uid: Hs,
          id: Re,
          label: js,
          icon: f(me.icon) ?? Sn.icon,
          keys: Sn.keys,
          node: { title: js, ...Sn.node ?? {}, ...me.node ?? {} }
        });
      }), m;
    }
    const Oe = z(() => he(t.state.options.toolbar, ee)), Fe = z(
      () => he(t.state.options.menu, de).filter((a) => a.id !== In)
    ), kt = z(() => Oe.value.length > 0), Zn = z(() => t.state.options.toolbar_label ?? "Tree actions"), Se = z(() => t.state.options.search_label ?? "Search");
    function Ve(a) {
      return Oe.value.find((u) => u.id === a) ?? Fe.value.find((u) => u.id === a) ?? null;
    }
    function Tt(a) {
      return Ve(a) !== null;
    }
    function Jt(a) {
      const u = Ve(a);
      u && so(u);
    }
    const He = z(() => F.value.find((a) => a.id === St.value) ?? null);
    function Oa(a) {
      return F.value.filter((u) => (u.parentId ?? "") === (a.parentId ?? ""));
    }
    function Rs() {
      const a = He.value;
      if (!a) return [];
      const u = ks(a), g = a.parentId ?? "";
      return u.every((D) => {
        var q;
        return (((q = _n(D)) == null ? void 0 : q.parentId) ?? "") === g;
      }) ? u : [a.id];
    }
    function to() {
      const a = He.value;
      if (!a) return [];
      if (!y.value || !a.getIsSelected()) return [a.id];
      const u = F.value.filter((g) => g.getIsSelected()).map((g) => g.id);
      return u.length > 0 ? u : [a.id];
    }
    const no = z(() => {
      var a;
      return ((a = t.state.clipboard) == null ? void 0 : a.keys) ?? [];
    }), Pa = z(() => {
      var u;
      const a = new Set(((u = t.state.clipboard) == null ? void 0 : u.mode) === "cut" ? no.value : []);
      return a.size === 0 || F.value.forEach((g) => {
        g.parentId && a.has(g.parentId) && a.add(g.id);
      }), a;
    });
    function Zt(a) {
      const u = He.value;
      if (!u) return null;
      const g = new Set(Rs()), m = Oa(u), D = m.map((me, Re) => g.has(me.id) ? Re : -1).filter((me) => me >= 0);
      if (D.length === 0) return null;
      let q = (a < 0 ? Math.min(...D) : Math.max(...D)) + a;
      for (; q >= 0 && q < m.length && g.has(m[q].id); ) q += a;
      return m[q] ?? null;
    }
    let Ze = null;
    be(
      () => t.state.source,
      () => {
        const a = Ze;
        if (Ze = null, !!a) {
          if (a.key !== void 0) {
            Ae(a.key);
            return;
          }
          We(() => {
            a.index !== void 0 ? Je(a.index) : a.pasted !== void 0 ? Ta(a.pasted) : ka(a.added);
          });
        }
      }
    );
    function ka(a) {
      const u = H.getCoreRowModel().flatRows.find((g) => !a.has(g.id));
      u && (Ae(u.id), y.value && (k.value = {}, h.value = u.id, u.toggleSelected(!0, { selectChildren: !1 })), Tt("rename") && We(() => tr(u.id, !0)));
    }
    function Ta(a) {
      const u = H.getCoreRowModel().flatRows.filter((D) => !a.has(D.id)), g = new Set(u.map((D) => D.id)), m = u.filter((D) => !g.has(D.parentId ?? ""));
      m.length !== 0 && (Ae(m[0].id), y.value && (k.value = {}, h.value = m[0].id, m.forEach((D) => D.toggleSelected(!0, { selectChildren: !1 }))));
    }
    const Qt = /* @__PURE__ */ pe(null), Qn = /* @__PURE__ */ pe(""), hn = /* @__PURE__ */ pe(null), at = /* @__PURE__ */ pe(null), ro = /* @__PURE__ */ pe(null), oo = /* @__PURE__ */ pe(null), Da = z(() => t.state.options.extension_warning !== !1);
    function Cs(a) {
      const u = String(a ?? ""), g = u.lastIndexOf(".");
      return g < 0 ? "" : u.slice(g + 1).toLowerCase();
    }
    function Fa(a, u) {
      return Da.value && a.allow_children === !1 && Cs(u) !== Cs(a.title ?? "");
    }
    let er = null;
    function tr(a, u = !1) {
      const g = _n(a);
      g && (er = u ? a : null, Qn.value = g.original.title ?? "", Qt.value = a, t.setEditingKey(a), We(() => {
        var m, D;
        (m = hn.value) == null || m.focus(), (D = hn.value) == null || D.select();
      }));
    }
    function nr() {
      er = null, at.value = null, Qt.value = null, t.setEditingKey("");
    }
    function Ms(a) {
      if (at.value || Qt.value !== a.id) return;
      const u = Qn.value.trim(), g = u.length > 0 && u !== (a.original.title ?? "");
      if (g && er !== a.id && Fa(a.original, u)) {
        at.value = { key: a.id, title: u, previous: a.original.title ?? a.id }, We(() => {
          var m;
          return (m = oo.value) == null ? void 0 : m.focus();
        });
        return;
      }
      if (nr(), !g) {
        Ae(a.id);
        return;
      }
      Ze = { key: a.id }, t.emitEvent("rename", { key: a.id, title: u });
    }
    function Is() {
      const { key: a, title: u } = at.value;
      at.value = null, nr(), Ze = { key: a }, t.emitEvent("rename", { key: a, title: u });
    }
    function Es() {
      at.value = null, We(() => {
        var a, u;
        (a = hn.value) == null || a.focus(), (u = hn.value) == null || u.select();
      });
    }
    function Ha(a) {
      var m;
      const u = a.key;
      if (u === "Escape" || u === "n" || u === "N") {
        a.preventDefault(), Es();
        return;
      }
      if (u === "y" || u === "Y") {
        a.preventDefault(), Is();
        return;
      }
      if (u !== "Tab" && u !== "ArrowLeft" && u !== "ArrowRight") return;
      a.preventDefault(), (m = (a.target === ro.value ? oo : ro).value) == null || m.focus();
    }
    function ja(a) {
      if (Qt.value !== a.id) return;
      const u = er === a.id;
      if (nr(), !u) {
        Ae(a.id);
        return;
      }
      Ze = { index: F.value.findIndex((g) => g.id === a.id) }, t.emitEvent("delete", { key: a.id, keys: [a.id] });
    }
    function La(a, u) {
      u.key === "Enter" ? (u.preventDefault(), Ms(a)) : u.key === "Escape" && (u.preventDefault(), ja(a));
    }
    be(
      () => t.state.editingKey,
      (a) => {
        (a || "") !== (Qt.value || "") && (a ? tr(a) : nr());
      }
    ), $o(() => {
      t.state.editingKey && tr(t.state.editingKey);
    });
    function rr(a, u) {
      const g = He.value;
      !g || !a || (Ze = { key: g.id }, t.emitEvent("move", {
        key: g.id,
        keys: Rs(),
        position: u,
        anchorKey: a.id
      }));
    }
    function Ka(a) {
      const u = He.value, g = u ? u.original.allow_children === !1 ? "after" : "child" : null;
      u && g === "child" && !E.value && u.toggleExpanded(!0), Ze = { added: new Set(H.getCoreRowModel().flatRows.map((m) => m.id)) }, t.emitEvent("add", { anchorKey: (u == null ? void 0 : u.id) ?? null, position: g, node: a.node });
    }
    function Va() {
      var u;
      const a = to();
      a.length !== 0 && (Ze = { index: F.value.findIndex((g) => {
        var m;
        return g.id === ((m = He.value) == null ? void 0 : m.id);
      }) }, t.emitEvent("delete", { key: ((u = He.value) == null ? void 0 : u.id) ?? null, keys: a }));
    }
    function Ba(a) {
      Ze = { index: F.value.findIndex((u) => {
        var g;
        return u.id === ((g = He.value) == null ? void 0 : g.id);
      }) }, t.emitEvent(a, {});
    }
    function $a(a) {
      var g;
      const u = to();
      u.length !== 0 && t.emitEvent(a, { key: ((g = He.value) == null ? void 0 : g.id) ?? null, keys: u });
    }
    function Na() {
      var m;
      const a = He.value, u = a ? a.original.allow_children === !1 ? "after" : "child" : null;
      a && u === "child" && !E.value && a.toggleExpanded(!0);
      const g = no.value;
      Ze = ((m = t.state.clipboard) == null ? void 0 : m.mode) === "cut" ? { key: g[0] } : { pasted: new Set(H.getCoreRowModel().flatRows.map((D) => D.id)) }, t.emitEvent("paste", { anchorKey: (a == null ? void 0 : a.id) ?? null, position: u });
    }
    function vn(a) {
      var u;
      switch (a.id) {
        case "new-folder":
        case "new-file":
          return !0;
        case "rename":
          return He.value !== null;
        case "delete":
        case "cut":
        case "copy":
          return to().length > 0;
        case "paste":
          return no.value.length > 0;
        case "undo":
          return t.state.canUndo === !0;
        case "redo":
          return t.state.canRedo === !0;
        case "move-up":
          return Zt(-1) !== null;
        case "move-down":
          return Zt(1) !== null;
        case "indent": {
          const g = Zt(-1);
          return g !== null && g.original.allow_children !== !1;
        }
        case "outdent":
          return !!((u = He.value) != null && u.parentId);
        case "expand-all":
        case "collapse-all":
          return F.value.length > 0 && !E.value;
        case "select-all":
          return F.value.length > 0 && y.value && b.value !== "single";
        case "clear-selection":
          return y.value && l(k.value).length > 0;
        default:
          return !0;
      }
    }
    function As(a) {
      return a.keys ? a.keys.replace("Control", "Ctrl") : "";
    }
    function Ua(a) {
      return a.keys ? `${a.label} (${As(a)})` : a.label;
    }
    function so(a) {
      var u, g, m, D;
      if (vn(a))
        switch (a.id) {
          case "new-folder":
          case "new-file":
            Ka(a);
            break;
          case "rename":
            tr(He.value.id);
            break;
          case "delete":
            Va();
            break;
          case "undo":
          case "redo":
            Ba(a.id);
            break;
          case "cut":
          case "copy":
            $a(a.id);
            break;
          case "paste":
            Na();
            break;
          case "move-up":
            rr(Zt(-1), "before");
            break;
          case "move-down":
            rr(Zt(1), "after");
            break;
          case "indent": {
            const q = Zt(-1);
            q && !E.value && q.toggleExpanded(!0), rr(q, "child");
            break;
          }
          case "outdent":
            rr(_n((u = He.value) == null ? void 0 : u.parentId), "after");
            break;
          case "expand-all":
            H.toggleAllRowsExpanded(!0);
            break;
          case "collapse-all":
            H.toggleAllRowsExpanded(!1);
            break;
          case "select-all":
            k.value = Object.fromEntries(F.value.map((q) => [q.id, !0])), h.value = ((g = F.value[0]) == null ? void 0 : g.id) ?? null;
            break;
          case "clear-selection":
            P();
            break;
          case In:
            (m = io.value) == null || m.focus(), (D = io.value) == null || D.select();
            break;
        }
    }
    const io = /* @__PURE__ */ pe(null), lo = z(() => Oe.value.filter((a) => a.id in Z)), or = /* @__PURE__ */ pe(null), ao = /* @__PURE__ */ new Map(), Os = z(() => {
      const a = lo.value;
      return a.length === 0 ? null : a.some((u) => u.uid === or.value) ? or.value : a[0].uid;
    });
    function Wa(a, u) {
      u ? ao.set(a, u) : ao.delete(a);
    }
    function sr(a) {
      const u = lo.value;
      if (u.length === 0) return;
      const g = u[Math.max(0, Math.min(a, u.length - 1))].uid;
      or.value = g, We(() => {
        var m;
        return (m = ao.get(g)) == null ? void 0 : m.focus();
      });
    }
    function za(a) {
      const u = lo.value, g = Math.max(
        0,
        u.findIndex((m) => m.uid === Os.value)
      );
      switch (a.key) {
        case "ArrowRight":
          a.preventDefault(), sr(g + 1);
          break;
        case "ArrowLeft":
          a.preventDefault(), sr(g - 1);
          break;
        case "Home":
          a.preventDefault(), sr(0);
          break;
        case "End":
          a.preventDefault(), sr(u.length - 1);
          break;
      }
    }
    const mn = /* @__PURE__ */ pe(!1), ir = /* @__PURE__ */ pe(null), wn = /* @__PURE__ */ pe({ left: 0, top: 0 }), lr = /* @__PURE__ */ pe(null), en = /* @__PURE__ */ pe(0), co = /* @__PURE__ */ new Map(), yn = z(() => Fe.value.filter((a) => a.id in Z)), ar = z(() => yn.value.length > 0), qa = z(() => t.state.options.menu_label ?? "Row actions");
    function Ga(a, u) {
      u ? co.set(a, u) : co.delete(a);
    }
    function Ps(a) {
      return yn.value.findIndex((u) => u.uid === a.uid);
    }
    function uo(a, u, g) {
      if (!ar.value) return;
      lt.value !== a.id && Ke(a.id), ir.value = a.id, wn.value = { left: u, top: g };
      const m = yn.value.findIndex((D) => vn(D));
      en.value = Math.max(0, m), mn.value = !0, We(Ja);
    }
    function Ya(a, u) {
      ar.value && (u.preventDefault(), y.value && !a.getIsSelected() && w(a), uo(a, u.clientX, u.clientY));
    }
    function Xa(a) {
      var g;
      const u = (g = xt.get(a.id)) == null ? void 0 : g.getBoundingClientRect();
      uo(a, u ? u.left + G.value : rn, u ? u.bottom : rn);
    }
    function Ja() {
      const a = lr.value;
      if (!a) return;
      const u = a.getBoundingClientRect();
      let { left: g, top: m } = wn.value;
      g + u.width > window.innerWidth - rn && (g = Math.max(rn, g - u.width)), m + u.height > window.innerHeight - rn && (m = Math.max(rn, m - u.height)), wn.value = { left: g, top: m }, bn(en.value);
    }
    function bn(a) {
      const u = yn.value;
      if (u.length === 0) return;
      const g = Math.max(0, Math.min(a, u.length - 1));
      en.value = g, We(() => {
        var m;
        return (m = co.get(u[g].uid)) == null ? void 0 : m.focus();
      });
    }
    function cr(a = !0, u = void 0) {
      if (!mn.value) return;
      const g = ir.value;
      mn.value = !1, ir.value = null, a && g != null && We(() => {
        var m;
        return (m = xt.get(g)) == null ? void 0 : m.focus(u);
      });
    }
    function Za(a) {
      if (!vn(a)) return;
      const u = ir.value;
      cr(!1), Ae(u), so(a);
    }
    function Qa(a) {
      const u = en.value;
      switch (a.key) {
        case "ArrowDown":
          a.preventDefault(), bn(u + 1);
          break;
        case "ArrowUp":
          a.preventDefault(), bn(u - 1);
          break;
        case "Home":
          a.preventDefault(), bn(0);
          break;
        case "End":
          a.preventDefault(), bn(yn.value.length - 1);
          break;
        case "Escape":
        case "Tab":
          a.preventDefault(), cr();
          break;
      }
    }
    function fo(a) {
      lr.value && a.composedPath().includes(lr.value) || cr(!1);
    }
    function tn() {
      cr(!0, { preventScroll: !0 });
    }
    be(mn, (a) => {
      a ? (document.addEventListener("pointerdown", fo, !0), window.addEventListener("resize", tn), window.addEventListener("scroll", tn, !0)) : (document.removeEventListener("pointerdown", fo, !0), window.removeEventListener("resize", tn), window.removeEventListener("scroll", tn, !0));
    }), No(() => {
      document.removeEventListener("pointerdown", fo, !0), window.removeEventListener("resize", tn), window.removeEventListener("scroll", tn, !0);
    });
    const ec = ["reorder-above", "reorder-below", "make-child", "reparent"], po = z(() => t.state.options.enable_dnd === !0), go = /* @__PURE__ */ pe([]), ur = /* @__PURE__ */ pe(null);
    function _n(a) {
      return F.value.find((u) => u.id === a) ?? null;
    }
    function tc(a, u) {
      let g = a;
      for (; g; ) {
        if (u.includes(g.id)) return !0;
        g = g.getParentRow();
      }
      return !1;
    }
    function ks(a) {
      if (!y.value || !a.getIsSelected()) return [a.id];
      const u = /* @__PURE__ */ new Set();
      for (let m = a.getParentRow(); m; m = m.getParentRow()) u.add(m.id);
      const g = F.value.filter((m) => m.getIsSelected() && !u.has(m.id)).map((m) => m.id);
      return g.length > 1 ? g : [a.id];
    }
    function nc(a, u) {
      return tc(a, u) ? ec : a.original.allow_children === !1 ? ["make-child"] : [];
    }
    function rc(a) {
      if (Le(a) && Xe(a)) return "expanded";
      const u = re(a);
      return u[u.length - 1] === a.id ? "last-in-group" : "standard";
    }
    let ho = null, xn = null;
    function vo() {
      xn && clearTimeout(xn), xn = null, ho = null;
    }
    function oc(a, u) {
      if (ho === a || (vo(), !u || u.type === "instruction-blocked")) return;
      const g = _n(a);
      !g || !g.getCanExpand() || g.getIsExpanded() || (ho = a, xn = setTimeout(() => {
        xn = null;
        const m = _n(a);
        m && m.getCanExpand() && !m.getIsExpanded() && m.toggleExpanded(!0);
      }, fv));
    }
    function mo() {
      ur.value = null, vo();
    }
    const Ts = /* @__PURE__ */ pe(null);
    function sc() {
      let a = Ts.value;
      if (!a) return null;
      let u = a.getRootNode();
      for (; u.host; )
        a = u.host, u = a.getRootNode();
      return a;
    }
    function fr(a) {
      for (const u of F.value) {
        const g = xt.get(u.id);
        if (!g) continue;
        const m = g.getBoundingClientRect();
        if (a.clientX >= m.left && a.clientX < m.right && a.clientY >= m.top && a.clientY < m.bottom)
          return { row: u, element: g, rect: m };
      }
      return null;
    }
    function ic(a, u) {
      const g = ".pnl-tst-check, .pnl-tst-twisty, .pnl-tst-edit";
      for (const m of a.element.querySelectorAll(g)) {
        const D = m.getBoundingClientRect();
        if (u.clientX >= D.left && u.clientX < D.right && u.clientY >= D.top && u.clientY < D.bottom)
          return !0;
      }
      return !1;
    }
    let Rt = null;
    function Ds() {
      Rt == null || Rt(), Rt = null;
      const a = sc();
      !a || !po.value || (Rt = Zr(
        jg({
          element: a,
          // Anything outside a row (the header, the empty space below the last row)
          // is not a drag handle, and returning false cancels the native drag.
          canDrag: ({ input: u }) => {
            const g = fr(u);
            return g !== null && !ic(g, u);
          },
          getInitialData: ({ input: u }) => {
            const g = fr(u);
            return g ? { type: En, key: g.row.id, keys: ks(g.row) } : { type: En, key: null, keys: [] };
          },
          onGenerateDragPreview: ({ location: u, nativeSetDragImage: g }) => {
            const m = u.current.input, D = fr(m);
            !D || !g || g(D.element, m.clientX - D.rect.left, m.clientY - D.rect.top);
          },
          onDragStart: ({ source: u }) => {
            go.value = u.data.keys ?? [];
          },
          onDrop: () => {
            go.value = [], mo();
          }
        }),
        Hg({
          element: a,
          canDrop: ({ source: u }) => u.data.type === En,
          getData: ({ input: u, source: g }) => {
            const m = fr(u);
            if (!m) return { type: En, key: null };
            const D = { type: En, key: m.row.id };
            return zg(D, {
              element: m.element,
              input: u,
              currentLevel: m.row.depth,
              indentPerLevel: G.value,
              mode: rc(m.row),
              block: nc(m.row, g.data.keys ?? [])
            });
          },
          onDrag: ({ self: u }) => {
            const g = u.data.key, m = Fi(u.data);
            ur.value = g && m ? { key: g, instruction: m } : null, oc(g ?? null, m);
          },
          onDragLeave: mo,
          onDrop: ({ self: u, source: g }) => {
            mo();
            const m = u.data.key, D = Fi(u.data);
            if (!m || !D || D.type === "instruction-blocked") return;
            const q = g.data.keys ?? [];
            q.includes(m) || t.emitEvent("move", {
              key: g.data.key,
              keys: q,
              targetKey: m,
              instruction: D.type,
              desiredLevel: D.desiredLevel ?? D.currentLevel
            });
          }
        })
      ));
    }
    $o(Ds), be(po, Ds), No(() => {
      vo(), Rt == null || Rt();
    });
    function wo(a) {
      var u;
      return ((u = ur.value) == null ? void 0 : u.key) === a.id ? ur.value.instruction : null;
    }
    function lc(a) {
      const u = wo(a);
      return {
        "pnl-tst-row--draggable": po.value,
        "pnl-tst-row--dragging": go.value.includes(a.id),
        "pnl-tst-row--blocked": (u == null ? void 0 : u.type) === "instruction-blocked",
        "pnl-tst-row--child-target": (u == null ? void 0 : u.type) === "make-child"
      };
    }
    function Fs(a) {
      const u = wo(a);
      return u ? u.type === "reorder-above" ? "pnl-tst-dropline--above" : u.type === "reorder-below" || u.type === "reparent" ? "pnl-tst-dropline--below" : null : null;
    }
    function ac(a) {
      const u = wo(a);
      return u ? { insetInlineStart: `${(u.type === "reparent" ? u.desiredLevel : u.currentLevel) * u.indentPerLevel}px` } : null;
    }
    return (a, u) => (X(), Q("div", {
      ref_key: "rootElement",
      ref: Ts,
      class: "pnl-tst"
    }, [
      kt.value ? (X(), Q("div", {
        key: 0,
        class: "pnl-tst-toolbar",
        role: "toolbar",
        "aria-orientation": "horizontal",
        "aria-label": Zn.value
      }, [
        (X(!0), Q(_e, null, Cn(Oe.value, (g) => (X(), Q(_e, {
          key: g.uid
        }, [
          g.id === "|" ? (X(), Q("span", Fh)) : g.id === "search" ? (X(), Q("label", Hh, [
            ye("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: Bt(Ah)
            }, null, 8, jh),
            ye("input", {
              ref_for: !0,
              ref: (m) => io.value = m,
              type: "search",
              value: $.value,
              "aria-label": Se.value,
              placeholder: Se.value,
              onInput: u[0] || (u[0] = (m) => U(m.target.value))
            }, null, 40, Lh)
          ])) : (X(), Q("button", {
            key: 2,
            ref_for: !0,
            ref: (m) => Wa(g.uid, m),
            type: "button",
            class: "pnl-tst-tbtn",
            "aria-label": g.label,
            "aria-keyshortcuts": g.keys,
            "aria-disabled": !vn(g),
            title: Ua(g),
            tabindex: g.uid === Os.value ? 0 : -1,
            onClick: (m) => so(g),
            onFocus: (m) => or.value = g.uid,
            onKeydown: za
          }, [
            ye("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: g.icon
            }, null, 8, Vh)
          ], 40, Kh))
        ], 64))), 128))
      ], 8, Dh)) : ut("", !0),
      F.value.length === 0 ? (X(), Q("div", Bh, It(le.value), 1)) : (X(), Q("div", {
        key: 2,
        class: "pnl-tst-grid",
        role: "treegrid",
        "aria-label": fe.value,
        "aria-colcount": j.value.length,
        "aria-rowcount": De.value,
        onKeydown: p
      }, [
        r.value ? (X(), Q("div", Nh, [
          ye("div", Uh, [
            (X(!0), Q(_e, null, Cn(j.value, (g, m) => (X(), Q("div", {
              key: g.id,
              class: "pnl-tst-hcell",
              role: "columnheader",
              "aria-colindex": m + 1,
              style: jt(Ue(g.column.columnDef))
            }, It(g.column.columnDef.header), 13, Wh))), 128))
          ])
        ])) : ut("", !0),
        ye("div", zh, [
          (X(!0), Q(_e, null, Cn(F.value, (g, m) => (X(), Q("div", {
            key: g.id,
            ref_for: !0,
            ref: (D) => Xt(g.id, D),
            class: Lt(["pnl-tst-row", [
              lc(g),
              {
                "pnl-tst-row--active": _t.value && g.id === lt.value,
                "pnl-tst-row--quiet": !_t.value && g.id === lt.value,
                "pnl-tst-row--cut": Pa.value.has(g.id)
              }
            ]]),
            role: "row",
            "aria-level": g.depth + 1,
            "aria-posinset": J(g),
            "aria-setsize": oe(g),
            "aria-rowindex": m + ve.value,
            "aria-expanded": Le(g) ? Xe(g) : void 0,
            "aria-selected": y.value ? g.getIsSelected() : void 0,
            "aria-haspopup": ar.value ? "menu" : void 0,
            tabindex: g.id === St.value ? 0 : -1,
            onClick: (D) => A(g, D),
            onContextmenu: (D) => Ya(g, D),
            onFocus: (D) => Ke(g.id)
          }, [
            Fs(g) ? (X(), Q("span", {
              key: 0,
              class: Lt(["pnl-tst-dropline", Fs(g)]),
              style: jt(ac(g)),
              "aria-hidden": "true"
            }, null, 6)) : ut("", !0),
            (X(!0), Q(_e, null, Cn(g.getAllCells(), (D, q) => (X(), Q("div", {
              key: D.id,
              class: Lt(["pnl-tst-cell", { "pnl-tst-cell--tree": q === 0 }]),
              role: "gridcell",
              "aria-colindex": q + 1,
              style: jt(
                q === 0 ? $e(g, D.column.columnDef) : Ue(D.column.columnDef)
              )
            }, [
              q === 0 ? (X(), Q(_e, { key: 0 }, [
                Le(g) ? (X(), Q("span", {
                  key: 0,
                  class: Lt(["pnl-tst-twisty", { "pnl-tst-twisty--open": Xe(g) }]),
                  "aria-hidden": "true",
                  onClick: vr((me) => x(g), ["stop"])
                }, [...u[3] || (u[3] = [
                  ye("svg", {
                    viewBox: "0 0 16 16",
                    width: "12",
                    height: "12",
                    focusable: "false"
                  }, [
                    ye("path", {
                      d: "M6 3.5 10.5 8 6 12.5",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "1.6"
                    })
                  ], -1)
                ])], 10, Yh)) : (X(), Q("span", Xh)),
                C.value ? (X(), Q("input", {
                  key: 2,
                  class: "pnl-tst-check",
                  type: "checkbox",
                  tabindex: "-1",
                  checked: V(g),
                  ".indeterminate": T(g),
                  "aria-label": `Select ${g.original.title ?? g.id}`,
                  onClick: vr((me) => Y(g), ["stop"])
                }, null, 40, Jh)) : ut("", !0),
                d(g) ? (X(), Q("span", {
                  key: 3,
                  class: "pnl-tst-icon",
                  "aria-hidden": "true",
                  innerHTML: d(g)
                }, null, 8, Zh)) : ut("", !0)
              ], 64)) : ut("", !0),
              q === 0 && Qt.value === g.id ? (X(), Q("input", {
                key: 1,
                ref_for: !0,
                ref: (me) => hn.value = me,
                class: "pnl-tst-edit",
                type: "text",
                value: Qn.value,
                "aria-label": `Rename ${g.original.title ?? g.id}`,
                onInput: u[1] || (u[1] = (me) => Qn.value = me.target.value),
                onClick: u[2] || (u[2] = vr(() => {
                }, ["stop"])),
                onKeydown: vr((me) => La(g, me), ["stop"]),
                onBlur: (me) => Ms(g)
              }, null, 40, Qh)) : (X(), Q("span", ev, It(D.getValue()), 1))
            ], 14, Gh))), 128))
          ], 42, qh))), 128))
        ])
      ], 40, $h)),
      at.value ? (X(), Q("div", tv, [
        ye("div", {
          class: "pnl-tst-dialog",
          role: "alertdialog",
          "aria-modal": "true",
          "aria-label": "Rename",
          "aria-describedby": "pnl-tst-confirm-message",
          onKeydown: Ha
        }, [
          ye("p", nv, " Rename " + It(at.value.previous) + " to " + It(at.value.title) + "? If you change a file name extension, the file might become unusable. ", 1),
          ye("div", rv, [
            ye("button", {
              ref_key: "confirmYesButton",
              ref: ro,
              type: "button",
              class: "pnl-tst-dbtn",
              "aria-keyshortcuts": "Y",
              onClick: Is
            }, [...u[4] || (u[4] = [
              ye("span", { class: "pnl-tst-dkey" }, "Y", -1),
              Go("es ", -1)
            ])], 512),
            ye("button", {
              ref_key: "confirmNoButton",
              ref: oo,
              type: "button",
              class: "pnl-tst-dbtn",
              "aria-keyshortcuts": "N",
              onClick: Es
            }, [...u[5] || (u[5] = [
              ye("span", { class: "pnl-tst-dkey" }, "N", -1),
              Go("o ", -1)
            ])], 512)
          ])
        ], 32)
      ])) : ut("", !0),
      mn.value ? (X(), Q("div", {
        key: 4,
        ref_key: "menuElement",
        ref: lr,
        class: "pnl-tst-menu",
        role: "menu",
        "aria-orientation": "vertical",
        "aria-label": qa.value,
        style: jt({ left: `${wn.value.left}px`, top: `${wn.value.top}px` }),
        onKeydown: Qa
      }, [
        (X(!0), Q(_e, null, Cn(Fe.value, (g) => (X(), Q(_e, {
          key: g.uid
        }, [
          g.id === "|" ? (X(), Q("div", sv)) : (X(), Q("button", {
            key: 1,
            ref_for: !0,
            ref: (m) => Ga(g.uid, m),
            type: "button",
            class: "pnl-tst-mitem",
            role: "menuitem",
            "aria-keyshortcuts": g.keys,
            "aria-disabled": !vn(g),
            tabindex: Ps(g) === en.value ? 0 : -1,
            onClick: (m) => Za(g),
            onFocus: (m) => en.value = Ps(g)
          }, [
            ye("span", {
              class: "pnl-tst-icon",
              "aria-hidden": "true",
              innerHTML: g.icon
            }, null, 8, lv),
            ye("span", av, It(g.label), 1),
            g.keys ? (X(), Q("span", cv, It(As(g)), 1)) : ut("", !0)
          ], 40, iv))
        ], 64))), 128))
      ], 44, ov)) : ut("", !0)
    ], 512));
  }
};
function pv({ model: e, el: t }) {
  t.style.display = "block", t.style.width = "100%", t.style.height = "100%";
  const n = document.createElement("div");
  n.className = "pnl-tst-root", n.style.height = "100%", t.append(n);
  const r = /* @__PURE__ */ Vr({
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
  const l = (C, k) => {
    i += 1, s.push({ seq: i, event_name: C, event_params: k }), s.length > o && s.shift(), e.set("_event_data", { events: [...s], timestamp: Date.now() }), e.save_changes();
  }, c = (C, k) => C.length === k.length && C.every((H, M) => H === k[M]), f = (C) => (k) => {
    const H = [...e.get(C) || []].sort();
    c(H, k) || (e.set(C, k), e.save_changes());
  }, d = f("expanded_keys"), v = f("selected_keys"), I = Of(dv, {
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
  }), e.on("change:can_undo", () => {
    r.canUndo = e.get("can_undo") || !1;
  }), e.on("change:can_redo", () => {
    r.canRedo = e.get("can_redo") || !1;
  }), e.on("change:clipboard", () => {
    r.clipboard = e.get("clipboard") || {};
  }), () => {
    I.unmount();
  };
}
export {
  pv as render
};
